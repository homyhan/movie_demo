import Signin from "../features/Auth/Signin";
import Singup from "../features/Auth/Singup";
import Detail from "../features/Booking/Detail";
import Home from "../features/Booking/Home";
import Seats from "../features/Booking/Seats";
import HomeAdmin from "../features/Admin/HomeAdmin";
import Film from "../features/Admin/components/Film";
import AddNew from "../features/Admin/components/AddNew";
import User from "../features/Admin/components/User";
import EditFilm from "../features/Admin/components/EditFilm";
import ShowTime from "../features/Admin/components/ShowTime";
import AddUser from "../features/Admin/components/AddUser";
import EditUser from "../features/Admin/components/EditUser";
import RegistrationForm from "../features/Admin/components/RegistrationForm";

export const routes =[
    {path:"/", component: Home},
    {path:"/test", component: RegistrationForm},
    {path:"/:page", component: Home},
    {path:"/detail", component: Detail},
    {path:"/seats/:id", component: Seats},
    {path:"/signin", component: Signin},
    {path:"/signup", component: Singup},
    {path:"/admin", component: HomeAdmin},
    {path:"/admin/film", component: HomeAdmin},
    {path:"/admin/film/:page", component: HomeAdmin},
    {path:"/admin/film/addnew", component: AddNew},
    {path:"/admin/film/edit/:id", component: EditFilm},
    {path:"/admin/user", component: User},
    {path:"/admin/user/:page", component: User},
    {path:"/admin/user/adduser", component: AddUser},
    {path:"/admin/user/edituser/:id", component: EditUser},
    {path:"/admin/showtime/:id", component: ShowTime},
]