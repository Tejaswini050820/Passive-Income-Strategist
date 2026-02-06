import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SkillForm from './components/SkillForm';
import ReportCard from './components/ReportCard';
import { UserInput } from './types';
import { getPassiveIncomeReport } from './services/geminiService';

const App: React.FC = () => {
  const [report, setReport] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (input: UserInput) => {
    setIsLoading(true);
    setError(null);
    setReport(null); // Clear previous report
    try {
      const generatedReport = await getPassiveIncomeReport(input);
      // `generatedReport` is now guaranteed to be a string
      setReport(generatedReport);
    } catch (err: any) {
      console.error("Failed to fetch report:", err);
      setError(err.message || 'An unexpected error occurred while generating the report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array means this function is created once

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col gap-8">
      <Header />
      <SkillForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
      {report && <ReportCard report={report} />}
    </div>
  );
};

export default App;