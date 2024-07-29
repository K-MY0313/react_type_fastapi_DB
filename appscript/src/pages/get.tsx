import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Employee {
  employee_id: string;
  name: string;
  department: string;
  position: string;
  birth_date: string;
}

const EmployeeGetForm: React.FC = () => {
  const [department, setDepartment] = useState<string>('');
  const [data, setData] = useState<Employee[] | null>(null);

  const handleGet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.get<Employee[]>(`http://localhost:8000/departments/${department}`);
      console.log('Data successfully retrieved:', response.data);
      setData(response.data);
    } catch (error) {
      console.error('There was an error retrieving the data!', error);
    }
  };

  return (
    <>
      <Link to="/">最初の画面</Link>
      <br />
      <Link to="/post">入力画面</Link>
      <form onSubmit={handleGet}>
        <div>
          <label>Department:</label>
          <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
        </div>
        <button type="submit">Get Employee Data</button>
      </form>
      {data && (
        <div>
          登録完了しました: <br />
          {data.map((employee) => (
            <div key={employee.employee_id}>
              {employee.name} ({employee.employee_id}), {employee.department}, {employee.position}, {employee.birth_date}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default EmployeeGetForm;
