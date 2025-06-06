
import { NavLink } from "react-router-dom";
import { Package, Activity, Zap } from "lucide-react";

export function TopNavigation() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              軟體派送管理系統
            </h1>
            <p className="text-xs text-gray-500">Software Deployment Management</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => 
              `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`
            }
          >
            <Package className="w-4 h-4" />
            <span>軟體清單</span>
          </NavLink>
          <NavLink 
            to="/deployment-status"
            className={({ isActive }) => 
              `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                isActive 
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`
            }
          >
            <Activity className="w-4 h-4" />
            <span>派送狀態</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
