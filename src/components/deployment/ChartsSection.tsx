
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

  const actionChartData: ChartData[] = [
    {
      name: "安裝",
      count: filteredData.filter(task => task.action === "install").length,
      fill: "#6366f1"
    },
    {
      name: "更新", 
      count: filteredData.filter(task => task.action === "update").length,
      fill: "#f59e0b"
    },
    {
      name: "卸載",
      count: filteredData.filter(task => task.action === "uninstall").length,
      fill: "#ef4444"
    }
  ].filter(item => item.count && item.count > 0);

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

      {/* 動作類型柱狀圖 */}
      <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200 shadow-md">
        <CardHeader className="border-b border-violet-100">
          <CardTitle className="text-violet-900 flex items-center space-x-3">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-lg">動作類型統計</span>
              <p className="text-sm text-violet-600 font-normal mt-1">各類型操作數量統計</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={actionChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="installGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.3}/>
                  </linearGradient>
                  <linearGradient id="updateGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  </linearGradient>
                  <linearGradient id="uninstallGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.6} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 14, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  cursor={{ fill: 'rgba(147, 51, 234, 0.1)' }}
                  formatter={(value, name) => [value, `${name}任務`]}
                />
                <Bar 
                  dataKey="count" 
                  radius={[8, 8, 0, 0]}
                  strokeWidth={2}
                >
                  {actionChartData.map((entry, index) => {
                    let gradientId = "installGradient";
                    if (entry.name === "更新") gradientId = "updateGradient";
                    if (entry.name === "卸載") gradientId = "uninstallGradient";
                    
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={`url(#${gradientId})`}
                        stroke={entry.fill}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
