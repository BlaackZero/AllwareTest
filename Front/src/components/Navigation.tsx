import { Routes, Route } from 'react-router-dom'
import { HomePage } from '../pages/Home/HomePage';

export const Navigation = () => {

  return (
    <>
        <Routes>
            <Route path="*" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
        </Routes>
    </>
  );
};