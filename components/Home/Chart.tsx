"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface Data {
  month: string;
  amount: number;
}

export default function Chart({ data }: { data: Data[] }) {  
  return (
    <div style={{ width: 700, height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorAhorro" x1="0" y1="0" x2="0" y2="1">
              <stop offset="50%" stopColor="#4f46e5" stopOpacity={1} />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
          <YAxis orientation="right" tickFormatter={(value) => `${value}$`} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#ad46ff"
            fill="url(#colorAhorro)"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Tooltip
            labelStyle={{ display: "none" }}
            cursor={{ display: "none" }}
            itemStyle={{ color: "gray", fontSize: "14px" }}
            formatter={(value) => [`${value}$`]}
            contentStyle={{
              backgroundColor: "#171717",
              opacity: 0.8,
              padding: "0px 10px",
              border: "none",
              borderRadius: "5px",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
