from sqlalchemy import Column, Integer, String, DateTime, Date,Interval, ForeignKey
from .database import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, unique=True, index=True)
    name = Column(String, index=True)
    birth_date = Column(Date, index=True)
    department = Column(String, index=True)
    position = Column(String, index=True)
    
class AttendanceLog(Base):
    __tablename__ = "attendance_logs"
    log_id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, ForeignKey("employees.employee_id"), nullable=False)
    timestamp = Column(DateTime(timezone=True), nullable=False)
    attendance = Column(String, nullable=False)
