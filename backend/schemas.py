from pydantic import BaseModel
from datetime import date

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

class LoginRequest(BaseModel):
    employee_id: str
