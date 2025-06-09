
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Pie } from "recharts";
import { PieChart, BarChart3 } from "lucide-react";
import { DeploymentTask, chartConfig, ChartData } from "@/types/deployment";

interface ChartsSectionProps {
  filteredData: DeploymentTask[];
}

export function ChartsSection({ filteredData }: ChartsSectionProps) {
  const statusChartData: ChartData[] = [
    {
      name: "成功",
      value: filteredData.filter(task => task.taskStatus === "SUCCEED").length,
      fill: "#22c55e"
    },
    {
      name: "執行中",
      value: filteredData.filter(task => task.taskStatus === "RUNNING").length,
      fill: "#3b82f6"
    },
    {
      name: "失敗",
      value: filteredData.filter(task => task.taskStatus === "FAILED").length,
      fill: "#ef4444"
    }
  ].filter(item => item.value && item.value > 0);

  // 統計各個任務ID的出現次數
  const taskIdCounts = filteredData.reduce((acc, task) => {
    acc[task.taskId] = (acc[task.taskId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const taskIdChartData = Object.entries(taskIdCounts)
    .map(([taskId, count], index) => ({
      name: taskId,
      count: count,
      fill: `hsl(${(index * 45) % 360}, 65%, 55%)`
    }))
    .sort((a, b) => b.count - a.count) // 按數量降序排列
    .slice(0, 10); // 顯示前10個

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 狀態分布餅圖 */}
      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-md">
        <CardHeader className="border-b border-emerald-100">
          <CardTitle className="text-emerald-900 flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <PieChart className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-lg">派送狀態分布</span>
              <p className="text-sm text-emerald-600 font-normal mt-1">各狀態任務數量分布</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={statusChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value, name) => [value, name]}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => <span className="text-sm font-medium">{value}</span>}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 任務ID數量統計柱狀圖 */}
      <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200 shadow-md">
        <CardHeader className="border-b border-violet-100">
          <CardTitle className="text-violet-900 flex items-center space-x-3">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-lg">任務ID數量統計</span>
              <p className="text-sm text-violet-600 font-normal mt-1">各任務ID的出現次數（顯示前10個）</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={taskIdChartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <defs>
                  {taskIdChartData.map((task, index) => (
                    <linearGradient key={`gradient-${index}`} id={`taskGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={task.fill} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={task.fill} stopOpacity={0.3}/>
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.6} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  cursor={{ fill: 'rgba(147, 51, 234, 0.1)' }}
                  formatter={(value) => [`${value} 次`, '出現次數']}
                  labelFormatter={(label) => `任務ID: ${label}`}
                />
                <Bar 
                  dataKey="count" 
                  radius={[8, 8, 0, 0]}
                  strokeWidth={2}
                >
                  {taskIdChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`url(#taskGradient-${index})`}
                      stroke={entry.fill}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
