
import { DeploymentTask } from "@/types/deployment";

export const mockDeploymentData: { [key: string]: DeploymentTask[] } = {
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
    },
    {
      taskId: "T004-20250604143126-001",
      hostname: "server-04.company.com",
      owner: "user_12345",
      action: "install",
      taskStatus: "SUCCEED",
      updateDate: "2025-06-05 08:30:15"
    },
    {
      taskId: "T005-20250604143126-001",
      hostname: "server-05.company.com",
      owner: "user_67890",
      action: "update",
      taskStatus: "SUCCEED",
      updateDate: "2025-06-05 12:45:30"
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

export const getActionDisplay = (action: string) => {
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

export const applyFilters = (
  data: DeploymentTask[],
  statusFilter: string,
  actionFilter: string,
  hostnameFilter: string
): DeploymentTask[] => {
  let filtered = [...data];

  if (statusFilter !== "all") {
    filtered = filtered.filter(task => task.taskStatus === statusFilter);
  }

  if (actionFilter !== "all") {
    filtered = filtered.filter(task => task.action === actionFilter);
  }

  if (hostnameFilter.trim()) {
    filtered = filtered.filter(task => 
      task.hostname.toLowerCase().includes(hostnameFilter.toLowerCase())
    );
  }

  return filtered;
};
