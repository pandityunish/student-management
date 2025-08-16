import { Student } from '@/types/student';

const API_BASE_URL = 'https://student-crud-37cq.onrender.com/api/v2';

interface ApiResponse<T> {
  timestamp: string;
  statusCode: number;
  status: string;
  message: string;
  data: T;
}

export const getStudents = async (): Promise<Student[]> => {
  const response = await fetch(`${API_BASE_URL}/students`);
  if (!response.ok) throw new Error('Failed to fetch students');
  const result: ApiResponse<Student[]> = await response.json();
  return result.data;
};

export const getStudent = async (id: string): Promise<Student> => {
  const response = await fetch(`${API_BASE_URL}/students/${id}`);
  if (!response.ok) throw new Error('Failed to fetch student');
  const result: ApiResponse<Student> = await response.json();
  return result.data;
};

export const createStudent = async (student: Omit<Student, 'roll_no'>): Promise<Student> => {
  const response = await fetch(`${API_BASE_URL}/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create student');
  }
  const result: ApiResponse<Student> = await response.json();
  return result.data;
};

export const updateStudent = async (roll_no: number, student: Partial<Student>): Promise<Student> => {
  const response = await fetch(`${API_BASE_URL}/students/${roll_no}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update student');
  }
  const result: ApiResponse<Student> = await response.json();
  return result.data;
};

export const deleteStudent = async (roll_no: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/students/${roll_no}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete student');
  }
};
