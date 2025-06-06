import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, CheckCircle, XCircle, Search, Filter, Eye, User, Hash, Tag } from "lucide-react";

interface Software {
  appID: string;
  appversion: string;
  name: string;
  owner: string;
  status: string;
}

const mockSoftwares: Software[] = [
  {
    appID: "sw-001",
    appversion: "1.0.0",
    name: "AwesomeApp",
    owner: "user_12345",
    status: "Y"
  },
  {
    appID: "sw-002",
    appversion: "1.0.2",
    name: "GreatTool",
    owner: "user_67890",
    status: "Y"
  },
  {
    appID: "sw-003",
    appversion: "2.1.0",
    name: "DataAnalyzer",
    owner: "user_11111",
    status: "N"
  },
  {
    appID: "sw-004",
    appversion: "1.5.3",
    name: "SecurityScanner",
    owner: "user_22222",
    status: "Y"
  },
  {
    appID: "sw-005",
    appversion: "3.0.1",
    name: "ReportGenerator",
    owner: "user_33333",
    status: "Y"
  },
];

export default function SoftwareList() {
  const [softwares, setSoftwares] = useState<Software[]>(mockSoftwares);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const filteredSoftwares = softwares.filter(software => {
    const matchesSearch = software.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         software.appID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         software.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || software.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalSoftwares = softwares.length;
  const activeSoftwares = softwares.filter(s => s.status === "Y").length;
  const inactiveSoftwares = softwares.filter(s => s.status === "N").length;

  const handleViewDeployment = (appID: string) => {
    navigate(`/deployment-status?appId=${appID}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 統計卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">總計軟體</CardTitle>
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
              <Package className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-800">{totalSoftwares}</div>
            <p className="text-xs text-blue-600 mt-1">個軟體應用程式</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">已上架</CardTitle>
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800">{activeSoftwares}</div>
            <p className="text-xs text-green-600 mt-1">正在運行中</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-rose-100 border-red-200 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">未上架</CardTitle>
            <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center shadow-md">
              <XCircle className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-800">{inactiveSoftwares}</div>
            <p className="text-xs text-red-600 mt-1">待處理項目</p>
          </CardContent>
        </Card>
      </div>

      {/* 搜尋和過濾 */}
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-gray-900 flex items-center space-x-2">
            <Filter className="w-5 h-5 text-purple-600" />
            <span>軟體管理</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="搜尋軟體名稱、ID 或擁有者..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                <SelectValue placeholder="狀態過濾" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="all">全部狀態</SelectItem>
                <SelectItem value="Y">已上架</SelectItem>
                <SelectItem value="N">未上架</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 軯體列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSoftwares.map((software) => (
              <Card key={software.appID} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-200 group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors flex items-center space-x-2">
                      <Package className="w-4 h-4 text-blue-500" />
                      <span>{software.name}</span>
                    </CardTitle>
                    <Badge variant={software.status === "Y" ? "default" : "secondary"} 
                           className={software.status === "Y" ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}>
                      {software.status === "Y" ? (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>已上架</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <XCircle className="w-3 h-3" />
                          <span>未上架</span>
                        </div>
                      )}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-gray-600 flex items-center space-x-2">
                    <Hash className="w-4 h-4 text-purple-500" />
                    <span className="font-medium">軟體 ID:</span> 
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">{software.appID}</span>
                  </div>
                  <div className="text-sm text-gray-600 flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-orange-500" />
                    <span className="font-medium">版本:</span> 
                    <span className="text-orange-600 font-medium">{software.appversion}</span>
                  </div>
                  <div className="text-sm text-gray-600 flex items-center space-x-2">
                    <User className="w-4 h-4 text-green-500" />
                    <span className="font-medium">擁有者:</span> 
                    <span className="text-green-600">{software.owner}</span>
                  </div>
                  <Button 
                    onClick={() => handleViewDeployment(software.appID)}
                    className="w-full mt-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                    size="sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    查看派送狀態
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSoftwares.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium">沒有找到符合條件的軟體</p>
              <p className="text-gray-400 text-sm mt-2">請嘗試調整搜尋條件或過濾器</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
