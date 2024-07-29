from fastapi import FastAPI, Depends, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from . import models, schemas, database
from typing import List
from . import models, schemas, database

# ログ設定
import logging
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

# Pydanticモデルの定義
class InputData(BaseModel):
    employeeid: str
    name: str
    department: str
    position: str
    birthdate: str


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

@app.get("/departments/{department}", response_model=List[schemas.Employee])
def read_employees_by_department(department: str, db: Session = Depends(database.get_db)):
    db_employees = db.query(models.Employee).filter(models.Employee.department == department).all()
    if not db_employees:
        raise HTTPException(status_code=404, detail="社員が見つかりません")
    return db_employees

@app.post("/process/")
def process_data(data: InputData = Body(...), db: Session = Depends(database.get_db)):
    employee = schemas.EmployeeCreate(
        employee_id=data.employeeid,
        name=data.name,
        birth_date=data.birthdate,
        department=data.department,
        position=data.position
    )
    return create_employee(employee, db)
