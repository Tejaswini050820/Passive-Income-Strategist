import React, { useState } from 'react';
import { UserInput } from '../types';

interface SkillFormProps {
  onSubmit: (input: UserInput) => void;
  isLoading: boolean;
  error: string | null;
}

const SkillForm: React.FC<SkillFormProps> = ({ onSubmit, isLoading, error }) => {
  const [skills, setSkills] = useState<string>('');
  const [goal, setGoal] = useState<string>('');
  const [formErrors, setFormErrors] = useState<{ skills?: string; goal?: string }>({});

  const validateForm = () => {
    const newErrors: { skills?: string; goal?: string } = {};
    if (!skills.trim()) {
      newErrors.skills = 'Skills cannot be empty.';
    }
    const parsedGoal = parseFloat(goal);
    if (isNaN(parsedGoal) || parsedGoal <= 0) {
      newErrors.goal = 'Passive income goal must be a positive number.';
    }
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit({ skills, goal: parseFloat(goal) });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl mb-8">
      <div className="mb-6">
        <label htmlFor="skills" className="block text-gray-700 text-lg font-semibold mb-2">
          Your Technical Skills (e.g., Android (Kotlin), GenAI, SQL)
        </label>
        <textarea
          id="skills"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-y min-h-[100px]"
          rows={4}
          placeholder="List your skills, separated by commas (e.g., Python, SQL, React, AWS, Machine Learning)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          disabled={isLoading}
        ></textarea>
        {formErrors.skills && (
          <p className="text-red-600 text-sm mt-1">{formErrors.skills}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="goal" className="block text-gray-700 text-lg font-semibold mb-2">
          Passive Income Goal (in ₹'000 / month)
        </label>
        <input
          type="number"
          id="goal"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="e.g., 25 for ₹25,000"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          min="1"
          step="0.1"
          disabled={isLoading}
        />
        {formErrors.goal && (
          <p className="text-red-600 text-sm mt-1">{formErrors.goal}</p>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center sticky bottom-4 md:static"
        disabled={isLoading}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {isLoading ? 'Generating Report...' : 'Get My Personalized Roadmap'}
      </button>
    </form>
  );
};

export default SkillForm;
