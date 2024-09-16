import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#E23670",
  },
  mobile: {
    label: "Mobile",
    color: "#E23670",
  },
} satisfies ChartConfig;

interface JobGraphProps {
  data: {
    year: number;
    totalJobs: number;
  }[];
}

const JobGraph: React.FC<JobGraphProps> = ({ data }) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px]  min-w-[200px]">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart accessibilityLayer data={data}   >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="year" 
          />
        
          <Tooltip  />
          <Bar dataKey="totalJobs" fill="#E23670" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default JobGraph;
