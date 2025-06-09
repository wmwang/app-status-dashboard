
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, CheckCircle, Zap, Server, RefreshCw } from "lucide-react";

interface FilterSectionProps {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  actionFilter: string;
  setActionFilter: (value: string) => void;
  hostnameFilter: string;
  setHostnameFilter: (value: string) => void;
  onClearFilters: () => void;
  filteredCount: number;
  totalCount: number;
}

export function FilterSection({
  statusFilter,
  setStatusFilter,
  actionFilter,
  setActionFilter,
  hostnameFilter,
  setHostnameFilter,
  onClearFilters,
  filteredCount,
  totalCount
}: FilterSectionProps) {
  return (
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
              onClick={onClearFilters}
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
            顯示 <span className="font-semibold text-purple-800">{filteredCount}</span> / {totalCount} 條記錄
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
