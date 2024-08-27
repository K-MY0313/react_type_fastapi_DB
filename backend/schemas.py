from pydantic import BaseModel
<<<<<<< HEAD
from datetime import datetime, date
from typing import List, Optional
=======
from datetime import date
>>>>>>> 287608bd1fbad9099b68562a96d8d6977bb4d0ad

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

<<<<<<< HEAD
class AttendanceLogBase(BaseModel):
    employee_id: str
    timestamp: datetime

class AttendanceLogCreate(AttendanceLogBase):
    pass

class AttendanceLog(AttendanceLogBase):
    log_id: int

    class Config:
        orm_mode = True

class LoginRequest(BaseModel):
    employee_id: str
=======
class LoginRequest(BaseModel):
    employee_id: str
>>>>>>> 287608bd1fbad9099b68562a96d8d6977bb4d0ad
