import { useContext } from "react";
import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import GlobalContext from "../context/Globalcontext";
import dayjs from "dayjs";

export const CalendarHeader = () => {
    const { monthIndex, setMonthIndex } = useContext(GlobalContext);
    const handlePrevMonth = () => {
        setMonthIndex(monthIndex - 1);
    }
    const handleNextMonth = () => {
        setMonthIndex(monthIndex + 1);
    };
    const handleReset = () => {
        setMonthIndex(dayjs().month());
    };
    return (
        <header className="px-4 py-2 flex items-center">
            <h1 className="mr-10 text-xl text-gray-500 fond-bold">Calendar</h1>
            <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">Today</button>
            <button onClick={handlePrevMonth}><span className="cursor-pointar text-gray-600 mx-2"><MdChevronLeft /></span></button>
            <button onClick={handleNextMonth}><span className="cursor-pointer text-gray-600 mx-2"><MdChevronRight /></span></button>
            <h2 className="ml-4 text-xl text-gray-500 font-bold">
                {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
            </h2>
        </header>
    )
}
