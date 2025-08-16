import { useState } from 'react';
import { Student } from '@/types/student';

export const useStudentForm = (initialState: Partial<Student> = {}) => {
  const [formData, setFormData] = useState<Partial<Student>>({
    name: '',
    email: '',
    ...initialState
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
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
