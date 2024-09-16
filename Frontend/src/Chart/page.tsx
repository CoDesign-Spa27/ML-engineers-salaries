import { salaryData } from '@/data';
import { ProcessedData, processSalaryData } from '@/utils';
import { useEffect, useState } from 'react';
import JobGraph from './JobGraph';

const Chart = () => {
  const [processedData, setProcessedData] = useState<ProcessedData[]>([]);

  useEffect(() => {
    const data: ProcessedData[] = processSalaryData(salaryData);
    setProcessedData(data);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-neutral-950 p-6">
 
      <div className="max-w-2xl text-white text-center mb-12">
        <h1 className="text-3xl font-black mb-4">Simplifying Your Data with a Chart</h1>
        <p className="text-lg font-black text-gray-200 mb-6">
          Explore the data with a chart that provides insights at a glance.
        </p>
        <p className="text-md text-neutral-400">
          Machine learning is a method of data analysis that automates analytical model building. 
          It is a branch of artificial intelligence based on the idea that systems can learn from data, 
          identify patterns, and make decisions with minimal human intervention.
        </p>
      </div>
 
      <div className="w-full max-w-4xl h-96 bg-neutral-900 rounded-lg shadow-md p-6 flex items-center justify-center">
        <JobGraph data={processedData} />
      </div>
    </div>
  );
};

export default Chart;
