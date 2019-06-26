// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import AssignmentTurnedIn from "@material-ui/icons/AssignmentTurnedIn";
import Assignment from "@material-ui/icons/Assignment";

// core components/views for Admin layout
import UserProfile from "views/UserProfile/UserProfile.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import TaskSquare from "views/TaskSquare/TaskSquare.jsx";
import TaskBoard from "views/TaskBoard/TaskBoard.jsx";

const dashboardRoutes = [
   // 增加新的sidebar 导航按钮
  {
    path: "/tasksquare",
    name: "任务广场",
    icon: Assignment,
    component: TaskSquare,
    layout: ""
  },
  {
    path: "/taskboard",
    name: "任务面板",
    icon: AssignmentTurnedIn,
    component: TaskBoard,
    layout: ""
  },
  {
    path: "/notifications",
    name: "消息通知",
    icon: Notifications,
    component: NotificationsPage,
    layout: ""
  },
  {
    path: "/user",
    name: "个人信息",
    icon: Person,
    component: UserProfile,
    layout: ""
  }
];

export default dashboardRoutes;
