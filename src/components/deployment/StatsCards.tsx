
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, CheckCircle, Clock, XCircle } from "lucide-react";

interface StatsCardsProps {
  totalCount: number;
  successCount: number;
  runningCount: number;
  failedCount: number;
}

export function StatsCards({ totalCount, successCount, runningCount, failedCount }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:shadow-lg transition-all duration-200">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-800">{totalCount}</div>
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
  );
}
