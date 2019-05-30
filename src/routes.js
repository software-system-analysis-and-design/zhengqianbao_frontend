// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import AssignmentTurnedIn from "@material-ui/icons/AssignmentTurnedIn";
import Assignment from "@material-ui/icons/Assignment";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import TaskSquare from "views/TaskSquare/TaskSquare.jsx";
import NewTask from "views/NewTask/NewTask.jsx";
import CheckTask from "views/CheckTask/CheckTask";

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
    path: "/newtask",
    name: "发布任务",
    icon: AssignmentTurnedIn,
    component: NewTask,
    layout: ""
  },
  {
    path: "/checktask",
    name: "监控任务",
    icon: Assignment,
    component: CheckTask,
    layout: ""
  },
  {
    path: "/user",
    name: "个人信息",
    icon: Person,
    component: UserProfile,
    layout: ""
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: ""
  },
  {
    path: "/table",
    name: "Table List",
    icon: "content_paste",
    component: TableList,
    layout: ""
  },
  {
    path: "/typography",
    name: "Typography",
    icon: LibraryBooks,
    component: Typography,
    layout: ""
  },
  {
    path: "/icons",
    name: "Icons",
    icon: BubbleChart,
    component: Icons,
    layout: ""
  },
  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    component: Maps,
    layout: ""
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: ""
  }
];

export default dashboardRoutes;
