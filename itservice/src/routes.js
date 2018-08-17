import App from './pages/App'
import Home from './pages/Home'
import RequireAuth from './pages/Auth/Authentication'
import RequireAuthAdmin from './pages/Auth/AuthenticationAdmin'
import Signin from './pages/Auth/Signin'
import Signout from './pages/Auth/Signout'
import Work from './pages/Work'
import WorkRepair from './pages/WorkRepair'
import User from './pages/User'
import Location from './pages/Location'
import WorkFormUser from './pages/WorkFormUser'
import WorkDetail from './pages/WorkDetail'
import WorkFormRepair from './pages/WorkFormRepair'

const routes = [{
    path: '/',
    component: App,
    indexRoute: { component: Home },
    childRoutes: [
        { path: 'signin', component: Signin },
        { path: 'signout', component: Signout },
        { path: 'work', component: RequireAuth(Work) },
        { path: 'work/new', component: RequireAuth(WorkFormUser) },
        { path: 'work/update/:id', component: RequireAuth(WorkFormUser) },
        { path: 'work/detail/:id', component: RequireAuth(WorkDetail) },
        { path: 'workrepair', component: RequireAuth(RequireAuthAdmin(WorkRepair)) },
        { path: 'work/repair/:id', component: RequireAuth(RequireAuthAdmin(WorkFormRepair)) },
        { path: 'user', component: RequireAuth(RequireAuthAdmin(User))},
        { path: 'location', component: RequireAuth(RequireAuthAdmin(Location))},
    ]
}]

export default routes