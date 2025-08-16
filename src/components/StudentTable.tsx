'use client';

import { Student } from '@/types/student';
import { PencilIcon, TrashIcon, AcademicCapIcon, CalendarIcon, BookOpenIcon } from '@heroicons/react/24/outline';

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (roll_no: number) => void;
}

export default function StudentTable({ students, onEdit, onDelete }: StudentTableProps) {
  if (students.length === 0) {
    return (
      <div className="text-center py-12 ">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by adding a new student.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden p-5">
      <div className="grid gap-6 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
        {students.map((student) => (
          <div
            key={student.roll_no}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {student.name}
                  </h3>
                  <p className="text-sm text-gray-500">Roll No: {student.roll_no}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(student)}
                    className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(student.roll_no)}
                    className="rounded-full p-1 text-red-400 hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-start">
                  <svg
                    className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="break-all">{student.email}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <span>DOB: {new Date(student.dateOfBirth).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <AcademicCapIcon className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <span>Section: {student.section}</span>
                </div>
                <div className="flex items-start">
                  <BookOpenIcon className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400 mt-0.5" />
                  <span className="text-ellipsis overflow-hidden line-clamp-2">{student.course}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
