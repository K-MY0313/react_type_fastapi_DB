from pydantic import BaseModel
from datetime import datetime, date
from typing import List, Optional

class EmployeeBase(BaseModel):
    employee_id: str
    name: str
    birth_date: date
    department: str
    position: str

class EmployeeCreate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    id: int

    class Config:
        orm_mode = True

class AttendanceLogBase(BaseModel):
    employee_id: str
    timestamp: datetime

class AttendanceLogCreate(AttendanceLogBase):
    pass

class AttendanceLog(AttendanceLogBase):
    log_id: int
    employee_id: str
    timestamp: datetime
    attendance: str

    class Config:
        orm_mode = True

class LoginRequest(BaseModel):
    employee_id: str
   