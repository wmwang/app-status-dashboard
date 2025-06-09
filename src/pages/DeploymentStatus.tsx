
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { DeploymentTask } from "@/types/deployment";
import { mockDeploymentData, applyFilters } from "@/utils/deploymentUtils";
import { SearchSection } from "@/components/deployment/SearchSection";
import { FilterSection } from "@/components/deployment/FilterSection";
import { StatsCards } from "@/components/deployment/StatsCards";
import { ChartsSection } from "@/components/deployment/ChartsSection";
import { TasksList } from "@/components/deployment/TasksList";

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
    const filtered = applyFilters(deploymentData, statusFilter, actionFilter, hostnameFilter);
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

  const successCount = filteredData.filter(task => task.taskStatus === "SUCCEED").length;
  const runningCount = filteredData.filter(task => task.taskStatus === "RUNNING").length;
  const failedCount = filteredData.filter(task => task.taskStatus === "FAILED").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <SearchSection 
        appId={appId}
        setAppId={setAppId}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {hasSearched && deploymentData.length > 0 && (
        <FilterSection
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          actionFilter={actionFilter}
          setActionFilter={setActionFilter}
          hostnameFilter={hostnameFilter}
          setHostnameFilter={setHostnameFilter}
          onClearFilters={handleClearFilters}
          filteredCount={filteredData.length}
          totalCount={deploymentData.length}
        />
      )}

      {hasSearched && filteredData.length > 0 && (
        <StatsCards
          totalCount={filteredData.length}
          successCount={successCount}
          runningCount={runningCount}
          failedCount={failedCount}
        />
      )}

      {hasSearched && filteredData.length > 0 && (
        <ChartsSection filteredData={filteredData} />
      )}

      <TasksList
        filteredData={filteredData}
        deploymentData={deploymentData}
        hasSearched={hasSearched}
        appId={appId}
      />
    </div>
  );
}
