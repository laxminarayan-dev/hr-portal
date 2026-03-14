import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", Leaves: 100 },
  { name: "Feb", Leaves: 250 },
  { name: "Mar", Leaves: 30 },
  { name: "Apr", Leaves: 0 },
  { name: "May", Leaves: 150 },
  { name: "Jun", Leaves: 10 },
];
const data2 = [
  { name: "HR", value: 10 },
  { name: "Engineering", value: 30 },
  { name: "Sales", value: 20 },
  { name: "Marketing", value: 15 },
];
const data3 = [
  { name: "Jan", hired: 10 },
  { name: "Feb", hired: 2 },
  { name: "Mar", hired: 3 },
  { name: "Apr", hired: 4 },
  { name: "May", hired: 15 },
  { name: "Jun", hired: 8 },
];

const COLORS = ["#4051b5", "#eb4272", "#3abff8", "#fa8233", "#fbd53c"];
const CustomBar = (props) => {
  const { x, y, width, height, fill } = props;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill + "90"}
      stroke={fill} // Border color
      strokeWidth={2} // Border width
      ry={3}
    />
  );
};

export const MyBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="0 0" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          cursor={false}
          contentStyle={{
            borderRadius: "8px",
          }}
        />
        <Bar
          shape={<CustomBar />}
          dataKey="Leaves"
          fill="#8884d8"
          activeBar={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
export const MyLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={data3}
        margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          cursor={false}
          contentStyle={{
            borderRadius: "8px",
          }}
        />
        <Line type="monotone" dataKey="hired" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const MyPieChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data2}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              className="z-1"
            />
          ))}
        </Pie>
        <Tooltip
          cursor={false}
          contentStyle={{
            borderRadius: "8px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
