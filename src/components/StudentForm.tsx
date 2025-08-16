'use client';

import { useState, useEffect } from 'react';
import { Student } from '@/types/student';
import { UserCircleIcon, EnvelopeIcon, CalendarIcon, AcademicCapIcon, BookOpenIcon } from '@heroicons/react/24/outline';

interface StudentFormProps {
  initialData?: Partial<Student>;
  onSubmit: (data: Omit<Student, 'roll_no'>) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

type FormData = Omit<Student, 'roll_no'>;

type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  required?: boolean;
  min?: string | number;
  children?: React.ReactNode;
};

const FormField = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  min,
  children
}: FormFieldProps) => (
  <div className="space-y-2">
    <label 
      htmlFor={id} 
      className="block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <div className="relative rounded-md shadow-sm">
      {children ? (
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className="mt-1 block w-full pl-10 pr-3 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          required={required}
        >
          {children}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className="mt-1 block w-full pl-10 pr-3 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          required={required}
          min={min}
        />
      )}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {id === 'name' && <UserCircleIcon className="h-5 w-5 text-gray-400" />}
        {id === 'email' && <EnvelopeIcon className="h-5 w-5 text-gray-400" />}
        {id === 'age' && <CalendarIcon className="h-5 w-5 text-gray-400" />}
        {id === 'grade' && <AcademicCapIcon className="h-5 w-5 text-gray-400" />}
      </div>
    </div>
  </div>
);

export const StudentForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting
}: StudentFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    dateOfBirth: '',
    section: '',
    course: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        dateOfBirth: initialData.dateOfBirth || '',
        section: initialData.section || '',
        course: initialData.course || ''
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-5">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {initialData?.roll_no ? 'Edit Student' : 'Add New Student'}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {initialData?.roll_no 
                  ? 'Update the student information below.'
                  : 'Fill in the details to add a new student to the system.'}
              </p>
            </div>
            
            <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserCircleIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full pl-10 pr-3 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full pl-10 pr-3 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full pl-10 pr-3 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="section" className="block text-sm font-medium text-gray-700">
                  Section
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AcademicCapIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="section"
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full pl-10 pr-3 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    placeholder="e.g., 2023A"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                  Course
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BookOpenIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                  </div>
                  <input
                    type="text"
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full pl-10 pr-3 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    placeholder="e.g., Computer Science"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 ">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {initialData?.roll_no ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>{initialData?.roll_no ? 'Update Student' : 'Add Student'}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
