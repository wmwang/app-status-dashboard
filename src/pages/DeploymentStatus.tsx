import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, Activity, CheckCircle, Clock, XCircle, Server, User, Hash, Calendar, Zap, TrendingUp, AlertTriangle, Filter, RefreshCw, BarChart3, PieChart } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

interface DeploymentTask {
  taskId: string;
  hostname: string;
  owner: string;
  action: string;
  taskStatus: string;
  updateDate: string;
}

const mockDeploymentData: { [key: string]: DeploymentTask[] } = {
  "sw-001": [
    {
      taskId: "T001-20250604143126-001",
      hostname: "server-01.company.com",
      owner: "user_12345",
      action: "install",
      taskStatus: "SUCCEED",
      updateDate: "2025-06-05 10:05:26"
    },
    {
      taskId: "T002-20250604143126-001",
      hostname: "server-02.company.com",
      owner: "user_12345",
      action: "install",
      taskStatus: "RUNNING",
      updateDate: "2025-06-05 11:20:15"
    },
    {
      taskId: "T003-20250604143126-001",
      hostname: "server-03.company.com",
      owner: "user_12345",
      action: "update",
      taskStatus: "FAILED",
      updateDate: "2025-06-05 09:15:42"
    },
    {
      taskId: "T004-20250604143126-001",
      hostname: "server-04.company.com",
      owner: "user_12345",
      action: "install",
      taskStatus: "SUCCEED",
      updateDate: "2025-06-05 08:30:15"
    },
    {
      taskId: "T005-20250604143126-001",
      hostname: "server-05.company.com",
      owner: "user_67890",
      action: "update",
      taskStatus: "SUCCEED",
      updateDate: "2025-06-05 12:45:30"
    }
  ],
  "sw-002": [
    {
      taskId: "T004-20250604143126-002",
      hostname: "server-04.company.com",
      owner: "user_67890",
      action: "install",
      taskStatus: "SUCCEED",
      updateDate: "2025-06-05 14:30:18"
    }
  ]
};

const chartConfig = {
  SUCCEED: {
    label: "成功",
    color: "hsl(var(--success))",
  },
  RUNNING: {
    label: "執行中",
    color: "hsl(var(--info))",
  },
  FAILED: {
    label: "失敗",
    color: "hsl(var(--destructive))",
  },
  install: {
    label: "安裝",
    color: "hsl(var(--primary))",
  },
  update: {
    label: "更新",
    color: "hsl(var(--warning))",
  },
  uninstall: {
    label: "卸載",
    color: "hsl(var(--destructive))",
  },
};

export default function DeploymentStatus() {
  const [searchParams] = useSearchParams();
  const [appId, setAppId] = useState(searchParams.get('appId') || "");
  const [deploymentData, setDeploymentData] = useState<DeploymentTask[]>([]);
  const [filteredData, setFilteredData] = useState<DeploymentTask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [hostnameFilter, setHostnameFilter] = useState<string>("");
  
  const { toast } = useToast();

  useEffect(() => {
    const urlAppId = searchParams.get('appId');
    if (urlAppId) {
      setAppId(urlAppId);
      handleSearch(urlAppId);
    }
  }, [searchParams]);

  // Apply filters whenever data or filter states change
  useEffect(() => {
    let filtered = [...deploymentData];

    if (statusFilter !== "all") {
      filtered = filtered.filter(task => task.taskStatus === statusFilter);
    }

    if (actionFilter !== "all") {
      filtered = filtered.filter(task => task.action === actionFilter);
    }

    if (hostnameFilter.trim()) {
      filtered = filtered.filter(task => 
        task.hostname.toLowerCase().includes(hostnameFilter.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [deploymentData, statusFilter, actionFilter, hostnameFilter]);

  const handleSearch = async (searchAppId?: string) => {
    const queryAppId = searchAppId || appId;
    
    if (!queryAppId.trim()) {
      toast({
        title: "請輸入軟體 ID",
        description: "請輸入要查詢的軟體 ID",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    // 模擬 API 調用
    setTimeout(() => {
      const data = mockDeploymentData[queryAppId] || [];
      setDeploymentData(data);
      setIsLoading(false);

      if (data.length === 0) {
        toast({
          title: "未找到數據",
          description: `軟體 ID "${queryAppId}" 沒有派送記錄`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "查詢成功",
          description: `找到 ${data.length} 條派送記錄`,
        });
      }
    }, 1000);
  };

  const handleClearFilters = () => {
    setStatusFilter("all");
    setActionFilter("all");
    setHostnameFilter("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SUCCEED":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            成功
          </Badge>
        );
      case "RUNNING":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            <Clock className="w-3 h-3 mr-1" />
            執行中
          </Badge>
        );
      case "FAILED":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            失敗
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700 border-gray-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            未知
          </Badge>
        );
    }
  };

  const getActionDisplay = (action: string) => {
    switch (action) {
      case "install":
        return "安裝";
      case "update":
        return "更新";
      case "uninstall":
        return "卸載";
      default:
        return action;
    }
  };

  // Chart data preparation
  const statusChartData = [
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
  ].filter(item => item.value > 0);

  const actionChartData = [
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
  ].filter(item => item.count > 0);

  const successCount = filteredData.filter(task => task.taskStatus === "SUCCEED").length;
  const runningCount = filteredData.filter(task => task.taskStatus === "RUNNING").length;
  const failedCount = filteredData.filter(task => task.taskStatus === "FAILED").length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 搜尋區域 */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-md">
        <CardHeader className="border-b border-blue-100">
          <CardTitle className="text-blue-900 flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-lg">軟體派送狀態查詢</span>
              <p className="text-sm text-blue-600 font-normal mt-1">輸入軟體 ID 查看詳細派送記錄</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="請輸入軟體 ID (例如: sw-001)"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10 bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Button 
              onClick={() => handleSearch()}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>查詢中...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4" />
                  <span>查詢</span>
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 篩選器區域 */}
      {hasSearched && deploymentData.length > 0 && (
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-md">
          <CardHeader className="border-b border-purple-100 pb-4">
            <CardTitle className="text-purple-900 flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Filter className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-lg">篩選條件</span>
                <p className="text-sm text-purple-600 font-normal mt-1">根據狀態、動作和主機名稱篩選記錄</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-700 flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>狀態</span>
                </label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-white border-purple-300 focus:border-purple-500">
                    <SelectValue placeholder="選擇狀態" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部狀態</SelectItem>
                    <SelectItem value="SUCCEED">成功</SelectItem>
                    <SelectItem value="RUNNING">執行中</SelectItem>
                    <SelectItem value="FAILED">失敗</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-700 flex items-center space-x-1">
                  <Zap className="w-4 h-4" />
                  <span>動作</span>
                </label>
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger className="bg-white border-purple-300 focus:border-purple-500">
                    <SelectValue placeholder="選擇動作" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部動作</SelectItem>
                    <SelectItem value="install">安裝</SelectItem>
                    <SelectItem value="update">更新</SelectItem>
                    <SelectItem value="uninstall">卸載</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-700 flex items-center space-x-1">
                  <Server className="w-4 h-4" />
                  <span>主機名稱</span>
                </label>
                <Input
                  placeholder="搜尋主機名稱"
                  value={hostnameFilter}
                  onChange={(e) => setHostnameFilter(e.target.value)}
                  className="bg-white border-purple-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2 flex flex-col justify-end">
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                  className="border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  清除篩選
                </Button>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-purple-200">
              <p className="text-sm text-purple-600">
                顯示 <span className="font-semibold text-purple-800">{filteredData.length}</span> / {deploymentData.length} 條記錄
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 統計數據 */}
      {hasSearched && filteredData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800">{filteredData.length}</div>
                <div className="text-sm text-gray-600">篩選後任務數</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-800">{successCount}</div>
                <div className="text-sm text-green-600">成功</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-sky-100 border-blue-200 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-800">{runningCount}</div>
                <div className="text-sm text-blue-600">執行中</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-red-50 to-rose-100 border-red-200 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-red-800">{failedCount}</div>
                <div className="text-sm text-red-600">失敗</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 統計圖表區域 */}
      {hasSearched && filteredData.length > 0 && (
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
      )}

      {/* 部署結果 */}
      {hasSearched && (
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-gray-900 flex items-center space-x-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              <span>
                {filteredData.length > 0 ? `軟體 "${appId}" 的派送記錄` : "查詢結果"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {filteredData.length > 0 ? (
              <div className="space-y-4">
                {filteredData.map((task, index) => (
                  <Card key={task.taskId} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600 flex items-center space-x-1">
                            <Hash className="w-4 h-4 text-purple-500" />
                            <span>任務 ID</span>
                          </div>
                          <div className="font-mono text-sm text-gray-900 bg-purple-50 px-3 py-2 rounded-lg border border-purple-200">
                            {task.taskId}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600 flex items-center space-x-1">
                            <Server className="w-4 h-4 text-blue-500" />
                            <span>主機名稱</span>
                          </div>
                          <div className="text-sm text-blue-700 font-medium">{task.hostname}</div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600 flex items-center space-x-1">
                            <User className="w-4 h-4 text-green-500" />
                            <span>擁有者</span>
                          </div>
                          <div className="text-sm text-green-700 font-medium">{task.owner}</div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600 flex items-center space-x-1">
                            <Zap className="w-4 h-4 text-orange-500" />
                            <span>動作</span>
                          </div>
                          <div className="text-sm text-orange-700 font-medium">{getActionDisplay(task.action)}</div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600">狀態</div>
                          <div>{getStatusBadge(task.taskStatus)}</div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600 flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-indigo-500" />
                            <span>更新時間</span>
                          </div>
                          <div className="text-sm text-indigo-700 font-medium">{task.updateDate}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : deploymentData.length > 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-10 h-10 text-purple-400" />
                </div>
                <p className="text-gray-500 text-lg font-medium mb-2">沒有符合篩選條件的記錄</p>
                <p className="text-sm text-gray-400">請調整篩選條件或清除篩選來查看更多記錄</p>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg font-medium mb-2">沒有找到派送記錄</p>
                <p className="text-sm text-gray-400">請檢查軟體 ID 是否正確，或者該軟體尚未進行派送操作</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
