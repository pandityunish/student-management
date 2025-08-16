import { useState } from 'react';
import { Student } from '@/types/student';

export const useStudentForm = (initialState: Partial<Student> = {}) => {
  const [formData, setFormData] = useState<Partial<Student>>({
    name: '',
    email: '',
    age: 0,
    grade: '',
    ...initialState
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      age: 0,
      grade: '',
      ...initialState
    });
  };

  return {
    formData,
    setFormData,
    handleChange,
    resetForm
  };
};
