'use client';

import { useState, useEffect } from 'react';
import { Student } from '@/types/student';
import StudentTable from '@/components/StudentTable';
import { StudentForm } from '@/components/StudentForm';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent as deleteStudentApi,
} from '@/services/studentService';

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Partial<Student> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const data = await getStudents();
      console.log(data);
      setStudents(data);
      setError(null);
    } catch (err) {
      setError('Failed to load students. Please try again later.');
      console.error('Error fetching students:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = () => {
    setCurrentStudent(null);
    setIsFormOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setCurrentStudent(student);
    setIsFormOpen(true);
  };

  const handleDeleteStudent = async (roll_no: number) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudentApi(roll_no);
        await fetchStudents();
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to delete student');
      }
    }
  };

  const handleSubmit = async (studentData: Omit<Student, 'roll_no'>) => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (currentStudent?.roll_no) {
        // Update existing student
        await updateStudent(currentStudent.roll_no, studentData);
      } else {
        // Create new student
        await createStudent(studentData);
      }

      await fetchStudents();
      setIsFormOpen(false);
      setCurrentStudent(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Students</h1>
            <p className="mt-2 text-sm text-gray-600">
              {students.length} {students.length === 1 ? 'student' : 'students'} in total
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              type="button"
              onClick={handleAddStudent}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              Add Student
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-3 text-sm text-gray-500">Loading student data...</p>
            </div>
          </div>
        ) : isFormOpen ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <StudentForm
              initialData={currentStudent || undefined}
              onSubmit={handleSubmit}
              onCancel={() => setIsFormOpen(false)}
              isSubmitting={isSubmitting}
            />
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Student Directory</h3>
              <p className="mt-1 text-sm text-gray-500">
                A list of all students in the system.
              </p>
            </div>
            <StudentTable
              students={students}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
            />
          </div>
        )}
      </div>
    </div>
  );
}
