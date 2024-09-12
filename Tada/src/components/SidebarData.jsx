import React from 'react';
import TodayIcon from '@mui/icons-material/Today';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
export const SidebarData = [
    {
        title: "Today",
        icon:<TodayIcon/>,
        link: "/today"
    },
    {
        title: "This Week",
        icon:<CalendarViewWeekIcon/>,
        link: "/ThisWeek"
    },
    {
        title: "Overdue",
        icon:<AccessAlarmsIcon/>,
        link: "/overdue"
    }

]
