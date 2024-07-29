import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const LoginPage: React.FC = () => {
  const [employeeId, setEmployeeId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    console.log(`Attempting to login with employee_id: ${employeeId}`);

    try {
      const response = await axios.post('http://localhost:8000/login/', {
        employee_id: employeeId
      });
      console.log('Response received:', response);

      if (response.data.message === "ログイン成功") {
        navigate('/selection');
      } else {
        setError('ログインに失敗しました。');
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setError('社員が見つかりません。');
      } else {
        setError('ログイン中にエラーが発生しました。');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">社員ログイン</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="employeeId" className="block mb-1">社員番号:</label>
            <input
              type="text"
              id="employeeId"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}

export const SelectionPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">モードを選択してください</h1>
        <div className="space-y-2">
          <Link to="/get" className="block w-full py-2 px-4 bg-green-500 text-white rounded text-center hover:bg-green-600">
            データベースの入力
          </Link>
          <Link to="/post" className="block w-full py-2 px-4 bg-blue-500 text-white rounded text-center hover:bg-blue-600">
            データベースの検索
          </Link>
        </div>
      </div>
    </div>
  );
}
