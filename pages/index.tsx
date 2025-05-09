import type { NextPage } from 'next';
import ResumeForm from '../components/ResumeForm';
import { Toaster } from 'react-hot-toast';

interface HomeProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Home: NextPage<HomeProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <Toaster position="top-right" />
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Resume to Website Generator
          </h1>
          <p className="mt-2 text-gray-600">
            Create a beautiful personal website from your resume information
          </p>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <ResumeForm darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </main>
    </div>
  );
};

export default Home; 