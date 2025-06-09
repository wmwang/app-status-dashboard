
export interface DeploymentTask {
  taskId: string;
  hostname: string;
  owner: string;
  action: string;
  taskStatus: string;
  updateDate: string;
}

export interface ChartData {
  name: string;
  value?: number;
  count?: number;
  fill: string;
}

export const chartConfig = {
  SUCCEED: {
    label: "成功",
    color: "hsl(var(--success))",
  },
  RUNNING: {
    label: "執行中", 
    color: "hsl(var(--info))",
  },
  FAILED: {
    label: "失敗",
    color: "hsl(var(--destructive))",
  },
  install: {
    label: "安裝",
    color: "hsl(var(--primary))",
  },
  update: {
    label: "更新",
    color: "hsl(var(--warning))",
  },
  uninstall: {
    label: "卸載",
    color: "hsl(var(--destructive))",
  },
};
