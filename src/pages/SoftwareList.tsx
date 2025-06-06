
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">總計軟體</CardTitle>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalSoftwares}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">已上架</CardTitle>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeSoftwares}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">未上架</CardTitle>
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{inactiveSoftwares}</div>
          </CardContent>
        </Card>
      </div>

      {/* 搜尋和過濾 */}
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">軟體管理</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="搜尋軟體名稱、ID 或擁有者..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border-gray-300"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white border-gray-300">
                <SelectValue placeholder="狀態過濾" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="all">全部狀態</SelectItem>
                <SelectItem value="Y">已上架</SelectItem>
                <SelectItem value="N">未上架</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 軟體列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSoftwares.map((software) => (
              <Card key={software.appID} className="bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900">{software.name}</CardTitle>
                    <Badge variant={software.status === "Y" ? "default" : "secondary"} 
                           className={software.status === "Y" ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}>
                      {software.status === "Y" ? "已上架" : "未上架"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">軟體 ID:</span> {software.appID}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">版本:</span> {software.appversion}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">擁有者:</span> {software.owner}
                  </div>
                  <Button 
                    onClick={() => handleViewDeployment(software.appID)}
                    className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                  >
                    查看派送狀態
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSoftwares.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500">沒有找到符合條件的軟體</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
