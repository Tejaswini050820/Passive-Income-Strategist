import React from 'react';
import { AnalyzerReport } from '../types';

interface ReportCardProps {
  report: string; // The raw string output from Gemini, expected to contain structured text
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  if (!report) {
    return null;
  }

  // Log the raw report for debugging purposes
  console.log('Raw Report from Gemini:', report);

  // Basic parsing for display, assuming the headings "Skill Gap:", "Niche:", "Action Plan:"
  const parseReport = (rawReport: string): AnalyzerReport => {
    let skillGap = '';
    let niche = '';
    let actionPlan = '';

    const skillGapMatch = rawReport.match(/Skill Gap:\s*([\s\S]*?)(?=Niche:|$)/i);
    if (skillGapMatch) {
      skillGap = skillGapMatch[1].trim();
    }

    const nicheMatch = rawReport.match(/Niche:\s*([\s\S]*?)(?=Action Plan:|$)/i);
    if (nicheMatch) {
      niche = nicheMatch[1].trim();
    }

    const actionPlanMatch = rawReport.match(/Action Plan:\s*([\s\S]*)/i);
    if (actionPlanMatch) {
      actionPlan = actionPlanMatch[1].trim();
    }

    return { skillGap, niche, actionPlan };
  };

  const parsedReport = parseReport(report);

  // Check if all parsed fields are empty, implying the structured parsing failed
  const isParsedReportEmpty = !parsedReport.skillGap && !parsedReport.niche && !parsedReport.actionPlan;

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-blue-600">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Personalized Passive Income Roadmap
      </h2>

      {isParsedReportEmpty && report ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-4 mb-5" role="alert">
          <p className="font-bold mb-2">Could not fully parse the report into structured sections.</p>
          <p>Displaying raw content:</p>
          <pre className="mt-2 p-2 bg-yellow-100 rounded text-sm whitespace-pre-wrap">{report}</pre>
        </div>
      ) : (
        <>
          {parsedReport.skillGap && (
            <div className="mb-5">
              <h3 className="text-2xl font-semibold text-blue-700 mb-2">Skill Gap:</h3>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">{parsedReport.skillGap}</p>
            </div>
          )}

          {parsedReport.niche && (
            <div className="mb-5">
              <h3 className="text-2xl font-semibold text-blue-700 mb-2">Niche:</h3>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">{parsedReport.niche}</p>
            </div>
          )}

          {parsedReport.actionPlan && (
            <div>
              <h3 className="text-2xl font-semibold text-blue-700 mb-2">Action Plan:</h3>
              <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                {/* Render action plan, assuming it might contain markdown-like lists */}
                {parsedReport.actionPlan}
              </div>
            </div>
          )}
        </>
      )}

      {!report && (
        <p className="text-gray-600 text-center">
          Your report will appear here after analysis.
        </p>
      )}
    </div>
  );
};

export default ReportCard;