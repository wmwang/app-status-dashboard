
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
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
      fill: "#3b82f6"
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
                <RechartsPieChart data={statusChartData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {statusChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </RechartsPieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 動作類型柱狀圖 */}
      <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 shadow-md">
        <CardHeader className="border-b border-orange-100">
          <CardTitle className="text-orange-900 flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-lg">動作類型統計</span>
              <p className="text-sm text-orange-600 font-normal mt-1">各類型操作數量統計</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={actionChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {actionChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
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
