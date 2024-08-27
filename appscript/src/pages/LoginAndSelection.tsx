import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useZxing } from 'react-zxing';

export const LoginPage: React.FC = () => {
  const [employeeId, setEmployeeId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [qrContent, setQrContent] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const navigate = useNavigate();

  const { ref } = useZxing({
    onDecodeResult(result) {
      const text = result.getText();
      setQrContent(text);
      setIsScanning(false);
    },
  });

  useEffect(() => {
    if (qrContent && !isScanning) {
      sendLoginData(qrContent);
    }
  }, [qrContent, isScanning]);

  const sendLoginData = async (qrData: string) => {
    try {
<<<<<<< HEAD
      const employeeId = qrData
      const response = await axios.post('http://localhost:8000/login/', {
        employee_id: employeeId,
      });
      if (response.data.message === "ログイン成功") {
        // タイムスタンプの記録
        await axios.post('http://localhost:8000/timestamp/', {
          employee_id: employeeId,
        });
=======
      const [employeeId, logType] = qrData.split(',');
      const response = await axios.post('http://localhost:8000/login/', {
        employee_id: employeeId,
        log_type: logType
      });
      if (response.data.message === "ログイン成功") {
>>>>>>> 287608bd1fbad9099b68562a96d8d6977bb4d0ad
        navigate('/selection');
      } else {
        setError('ログインに失敗しました。');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('ログイン中にエラーが発生しました。');
    }
    setIsScanning(true);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:8000/login/', {
        employee_id: employeeId,
      });
      if (response.data.message === "ログイン成功") {
        navigate('/selection');
      } else {
        setError('ログインに失敗しました。');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('ログイン中にエラーが発生しました。');
    }
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="社員IDを入力してください"
        />
        <button type="submit">ログイン</button>
      </form>
      {isScanning ? (
        <video ref={ref} />
      ) : (
        <p>QRコードをスキャンしました。処理中...</p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

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
<<<<<<< HEAD
};
=======
};
>>>>>>> 287608bd1fbad9099b68562a96d8d6977bb4d0ad
