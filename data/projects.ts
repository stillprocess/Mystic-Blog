export type ProjectProblemSolution = {
  problem: string;
  solution: string;
};

export type ProjectScreenshot = {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt: string;
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  techStack: string[];
  githubUrl: string | null;
  overview: string;
  systemArchitecture: string[];
  hardware: string[];
  software: string[];
  communication: string[];
  keyFeatures: string[];
  problemsAndSolutions: ProjectProblemSolution[];
  screenshots: ProjectScreenshot[];
  placeholder: boolean;
};

export const projects: Project[] = [
  {
    slug: "placeholder-iot-monitoring-system",
    name: "占位项目：IoT 监测系统",
    description: "用于展示 Projects 页面结构与字段的占位项目，不代表真实项目经历。",
    techStack: ["STM32", "FreeRTOS", "MQTT", "Next.js"],
    githubUrl: null,
    overview:
      "这是项目详情页的占位内容，用于确认信息结构和响应式布局。替换为真实项目时，只需要修改 data/projects.ts。",
    systemArchitecture: [
      "设备采集层（占位）",
      "消息通信层（占位）",
      "服务处理层（占位）",
      "Web 展示层（占位）",
    ],
    hardware: [
      "主控模块：待补充",
      "传感器模块：待补充",
      "通信模块：待补充",
      "供电与接口：待补充",
    ],
    software: [
      "固件任务划分：待补充",
      "服务端处理：待补充",
      "前端界面：待补充",
      "构建与部署：待补充",
    ],
    communication: [
      "设备内部通信协议：待补充",
      "设备与服务端协议：待补充",
      "消息格式与主题设计：待补充",
    ],
    keyFeatures: [
      "数据采集与状态展示（占位）",
      "设备连接状态管理（占位）",
      "异常信息记录（占位）",
      "响应式项目展示页面（占位）",
    ],
    problemsAndSolutions: [
      {
        problem: "问题占位：设备数据更新策略尚未补充。",
        solution: "解决方案占位：填写真实项目时补充原因、处理过程和验证结果。",
      },
      {
        problem: "问题占位：通信异常处理流程尚未补充。",
        solution: "解决方案占位：填写真实项目时补充重试、超时和恢复机制。",
      },
    ],
    screenshots: [
      {
        title: "设备状态界面（占位）",
        description: "真实项目截图将在这里展示。",
        imageAlt: "设备状态界面截图占位",
      },
      {
        title: "系统数据界面（占位）",
        description: "真实项目截图将在这里展示。",
        imageAlt: "系统数据界面截图占位",
      },
    ],
    placeholder: true,
  },
];

export function getAllProjects() {
  return projects;
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug) ?? null;
}
