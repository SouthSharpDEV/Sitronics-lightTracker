import { RequestHistoryPage } from "../pages/request-history.page"
import { HomePage } from "../pages/home.page"

export const publicRoutes = [
    {
        path: "/",
        element: HomePage
    },
    {
        path: "/requestHistory",
        element: RequestHistoryPage
    },
]
