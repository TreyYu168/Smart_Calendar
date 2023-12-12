import {useEffect, useState} from "react";

const Clock = () => {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    useEffect(() => {
        setInterval(() => {
            const dateObject = new Date();
            const hour: String = String(dateObject.getHours());
            const min: String = String(dateObject.getMinutes()).padStart(2, '0');
            const sec: String = String(dateObject.getSeconds()).padStart(2, '0');

            const currentTime = hour + ' : ' + min + ' : ' + sec;
            setDate(dateObject.toDateString())
            setTime(currentTime);
        }, 1000)
    }, [])

    return(
        <>
            <h1>{time}</h1>
            <h2>{date}</h2>
        </>
    )
}

export default Clock