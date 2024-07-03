import React, { useState, useReducer, useEffect } from "react";
import GlobalContext from "./Globalcontext";
import dayjs from "dayjs";

const saveEventsReducer = (state, { type, payload }) => {
    switch (type) {
        case "push":
            return [...state, payload];
        case "update":
            return state.map((evt) => (evt.id === payload.id ? payload : evt));
        case "delete":
            return state.filter((evt) => evt.id !== payload.id);
        default:
            throw new Error();
    };
};

const initEvents = () => {
    const storageEvents = localStorage.getItem("savedEvents");
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    return parsedEvents;
};

const ContextWrapper = (props) => {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [savedEvents, dispatchCalEvent] = useReducer(saveEventsReducer, [], initEvents);

    useEffect(() => {
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    }, [savedEvents]);

    useEffect(() => {
        if (!showEventModal) {
            setSelectedEvent(null);
        }
    }, [showEventModal]);

    return (
        <GlobalContext.Provider value={{ monthIndex, setMonthIndex, daySelected, setDaySelected, showEventModal, setShowEventModal, savedEvents, dispatchCalEvent, selectedEvent, setSelectedEvent }}>
            {props.children}
        </GlobalContext.Provider>
    );
};

export default ContextWrapper;
