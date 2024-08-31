from fastapi import FastAPI, Depends, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, database
from typing import List
import logging
from datetime import datetime

# ログ設定
logging.basicConfig(level=logging.DEBUG)

# データベーステーブルを作成
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# CORSの設定
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/employees/", response_model=schemas.Employee)
def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(database.get_db)):
    db_employee = models.Employee(
        employee_id=employee.employee_id,
        name=employee.name,
        birth_date=employee.birth_date,
        department=employee.department,
        position=employee.position
    )
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

@app.post("/login/")
def login(login_data: schemas.LoginRequest, db: Session = Depends(database.get_db)):
    logging.debug(f"Login data received: {login_data}")
    employee = db.query(models.Employee).filter(models.Employee.employee_id == login_data.employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="社員が見つかりません")
    return {"message": "ログイン成功", "employee_id": employee.employee_id, "name": employee.name}

@app.post("/timestamp/")
def create_attendance_log(login_data: schemas.LoginRequest, db: Session = Depends(database.get_db)):
    # 今日の始まり（午前0時）を取得
    today_start = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    
    # 当日のすべてのログを取得
    logs_today = db.query(models.AttendanceLog).filter(
        models.AttendanceLog.employee_id == login_data.employee_id,
        models.AttendanceLog.timestamp >= today_start
    ).all()
    
    # 出社か退社かを判定
    if not logs_today:
        attendance_type = "出社"
    else:
        attendance_type = "退社"

    # ログを作成
    db_log = models.AttendanceLog(
        employee_id=login_data.employee_id,
        timestamp=datetime.now(),
        attendance=attendance_type
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
 

@app.get("/departments/{department}", response_model=List[schemas.Employee])
def read_employees_by_department(department: str, db: Session = Depends(database.get_db)):
    db_employees = db.query(models.Employee).filter(models.Employee.department == department).all()
    if not db_employees:
        raise HTTPException(status_code=404, detail="社員が見つかりません")
    return db_employees

@app.post("/process/", response_model=schemas.Employee)
def process_data(data: schemas.EmployeeCreate = Body(...), db: Session = Depends(database.get_db)):
    return create_employee(data, db)
