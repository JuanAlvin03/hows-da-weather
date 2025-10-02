import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
} from "recharts";

type DataPoint = {
  date: string;
  min: number;
  max: number;
};

export default function MinMaxTempChart({ data }: { data: DataPoint[] }) {
  return (
    <div className="w-200 h-80">
      <ResponsiveContainer>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          {/* Min–Max Range Bar */}
          <Bar
            dataKey={(d: DataPoint) => [d.min, d.max]} // range from min → max
            fill="#60a5fa"
            stroke="#2563eb"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
