
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Activity, CheckCircle, Clock, XCircle, Server, User, Hash, Calendar, Zap, Filter, AlertTriangle } from "lucide-react";
import { DeploymentTask } from "@/types/deployment";
import { getActionDisplay } from "@/utils/deploymentUtils";

interface TasksListProps {
  filteredData: DeploymentTask[];
  deploymentData: DeploymentTask[];
  hasSearched: boolean;
  appId: string;
}

export function TasksList({ filteredData, deploymentData, hasSearched, appId }: TasksListProps) {
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

  if (!hasSearched) {
    return null;
  }

  return (
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
  );
}
