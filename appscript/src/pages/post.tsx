import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Employee {
  employeeid: string;
  name: string;
  department: string;
  position: string;
  birthdate: string;
}

const EmployeePostForm: React.FC = () => {
  const [employeeId, setEmployeeId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const [data, setData] = useState<Employee[] | null>(null);

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: Employee = {
      employeeid: employeeId,
      name: name,
      department: department,
      position: position,
      birthdate: birthdate,
    };

    try {
      const response = await axios.post<Employee[]>('http://localhost:8000/process/', data);
      console.log('Data successfully saved:', response.data);
      setData(response.data);
    } catch (error) {
      console.error('There was an error saving the data!', error);
    }
  };

  return (
    <>
      <Link to="/">最初の画面</Link>
      <br />
      <Link to="/get">検索画面</Link>
      <form onSubmit={handlePost}>
        <div>
          <label>Employee ID:</label>
          <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Department:</label>
          <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
        </div>
        <div>
          <label>Position:</label>
          <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
        </div>
        <div>
          <label>Birthdate:</label>
          <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
      {data && (
        <div>
          登録完了しました: <br />
          {data.map((employee) => (
            <div key={employee.employeeid}>
              {employee.name} ({employee.employeeid}), {employee.department}, {employee.position}, {employee.birthdate}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default EmployeePostForm;
