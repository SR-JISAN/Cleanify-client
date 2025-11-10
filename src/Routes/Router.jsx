import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/home/Home";
import Register from "../Pages/Register/Register";
import LogIn from "../Pages/LogIn/LogIn";
import MyIssue from "../Pages/MyIssue/MyIssue";
import AddIssue from "../Pages/AddIssue/AddIssue";
import MyContribution from "../Pages/MyContribution/MyContribution";
import Issues from "../Pages/Issues/Issues";




 const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <><h1>error</h1></>,
    children: [
      {
        path:'/',
        index:true,
        element: <Home></Home>
      },
      {
        path:'/home',
        element: <Home></Home>
      },
      {
        path:'/issues',
        element: <Issues></Issues>
      },
      {
        path:'/login',
        element: <LogIn></LogIn>
      },
      {
        path:'/register',
        element: <Register></Register>
      },
      {
        path:'/myIssue',
        element: <MyIssue></MyIssue>
      },
      {
        path:'/addIssue',
        element: <AddIssue></AddIssue>
      },
      {
        path:'/myContribution',
        element: <MyContribution></MyContribution>
      },
    ]
  },
]);
export default Router