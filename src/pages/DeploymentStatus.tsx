
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

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

export default function DeploymentStatus() {
  const [appId, setAppId] = useState("");
  const [deploymentData, setDeploymentData] = useState<DeploymentTask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!appId.trim()) {
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
      const data = mockDeploymentData[appId] || [];
      setDeploymentData(data);
      setIsLoading(false);

      if (data.length === 0) {
        toast({
          title: "未找到數據",
          description: `軟體 ID "${appId}" 沒有派送記錄`,
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SUCCEED":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            成功
          </Badge>
        );
      case "RUNNING":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            執行中
          </Badge>
        );
      case "FAILED":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            失敗
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
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

  const successCount = deploymentData.filter(task => task.taskStatus === "SUCCEED").length;
  const runningCount = deploymentData.filter(task => task.taskStatus === "RUNNING").length;
  const failedCount = deploymentData.filter(task => task.taskStatus === "FAILED").length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 搜尋區域 */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>軟體派送狀態查詢</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="請輸入軟體 ID (例如: sw-001)"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="bg-muted/50 border-border"
              />
            </div>
            <Button 
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>查詢中...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>查詢</span>
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 統計數據 */}
      {hasSearched && deploymentData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="gradient-card">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{deploymentData.length}</div>
                <div className="text-sm text-muted-foreground">總任務數</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="gradient-card">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{successCount}</div>
                <div className="text-sm text-muted-foreground">成功</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="gradient-card">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{runningCount}</div>
                <div className="text-sm text-muted-foreground">執行中</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="gradient-card">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{failedCount}</div>
                <div className="text-sm text-muted-foreground">失敗</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 部署結果 */}
      {hasSearched && (
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-foreground">
              {deploymentData.length > 0 ? `軟體 "${appId}" 的派送記錄` : "查詢結果"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {deploymentData.length > 0 ? (
              <div className="space-y-4">
                {deploymentData.map((task, index) => (
                  <Card key={task.taskId} className="bg-card/30 border-border hover:bg-card/50 transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">任務 ID</div>
                          <div className="font-mono text-sm text-foreground bg-muted/50 px-2 py-1 rounded">
                            {task.taskId}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">主機名稱</div>
                          <div className="text-sm text-foreground">{task.hostname}</div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">擁有者</div>
                          <div className="text-sm text-foreground">{task.owner}</div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">動作</div>
                          <div className="text-sm text-foreground">{getActionDisplay(task.action)}</div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">狀態</div>
                          <div>{getStatusBadge(task.taskStatus)}</div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">更新時間</div>
                          <div className="text-sm text-foreground">{task.updateDate}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-muted-foreground mb-2">沒有找到派送記錄</p>
                <p className="text-sm text-muted-foreground">請檢查軟體 ID 是否正確，或者該軟體尚未進行派送操作</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
