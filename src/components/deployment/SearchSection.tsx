
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Hash } from "lucide-react";

interface SearchSectionProps {
  appId: string;
  setAppId: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export function SearchSection({ appId, setAppId, onSearch, isLoading }: SearchSectionProps) {
  return (
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
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
              className="pl-10 bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <Button 
            onClick={onSearch}
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
  );
}
