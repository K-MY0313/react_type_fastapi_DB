import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface AttendanceLog {
  employee_id: string;
  timestamp: string;   // 出退勤時間
  attendance: string;  // 出退勤状態
}

const EmployeeSearchForm: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('department');
  const [data, setData] = useState<AttendanceLog[] | null>(null);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.get<AttendanceLog[]>(`http://localhost:8000/search/${searchType}/${searchTerm}`);
      console.log('Data successfully retrieved:', response.data);
      setData(response.data);
    } catch (error) {
      console.error('There was an error retrieving the data!', error);
    }
  };

  const handleDownloadCSV = () => {
    if (data) {
      const csvContent = "data:text/csv;charset=utf-8,"
        + "ID,timestamp,status\n"
        + data.map(e => `${e.employee_id},${e.timestamp},${e.attendance}`).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "attendance_logs.csv");
      document.body.appendChild(link);
      link.click();
    }
  };

  return (
    <>
      <Link to="/">最初の画面</Link>
      <br />
      <Link to="/post">入力画面</Link>
      <form onSubmit={handleSearch}>
        <div>
          <label>検索タイプ:</label>
          <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="employee_id">社員ID</option>
            <option value="department">部署</option>
          </select>
        </div>
        <div>
          <label>検索語:</label>
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <button type="submit">検索</button>
      </form>
      {data && (
        <div>
          <h3>検索結果:</h3>
          {data.map((log) => (
            <div key={log.employee_id}>
              社員番号: {log.employee_id}, 出退勤時間: {log.timestamp}, 状態: {log.attendance}
            </div>
          ))}
          <button onClick={handleDownloadCSV}>CSVダウンロード</button>
        </div>
      )}
    </>
  );
}

export default EmployeeSearchForm;
