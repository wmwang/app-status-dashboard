
import { NavLink } from "react-router-dom";

export function TopNavigation() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">SW</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">軟體派送管理系統</h1>
        </div>
        
        <div className="flex space-x-8">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => 
              `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`
            }
          >
            軟體清單
          </NavLink>
          <NavLink 
            to="/deployment-status"
            className={({ isActive }) => 
              `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`
            }
          >
            派送狀態
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
