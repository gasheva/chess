import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from '../models/Player';
import {Colors} from '../models/Colors';
import {INIT_TIME_IN_SEC} from '../constants/constants';

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
    timeout: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart, timeout}) => {
    const [blackTime, setBlackTime] = useState(INIT_TIME_IN_SEC);
    const [whiteTime, setWhiteTime] = useState(INIT_TIME_IN_SEC);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        startTimer();
    }, [currentPlayer]);

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current);
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setInterval(callback, 1000);
    }

    function stopTimer() {
        timer.current && clearInterval(timer.current);
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1);
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1);
    }

    // timeout
    useEffect(() => {
        if (isTimeout(blackTime) || isTimeout(whiteTime)) {
            timeout();
            stopTimer();
        }
    }, [blackTime, whiteTime]);

    function isTimeout(time: number) {
        return time === 0;
    }

    const handleRestart = () => {
        setWhiteTime(INIT_TIME_IN_SEC);
        setBlackTime(INIT_TIME_IN_SEC);
        startTimer();
        restart();
    };

    return (
        <div>
            <div>
                <button onClick={handleRestart}>Restart</button>
            </div>
            <h2>Black - {blackTime}</h2>
            <h2>White - {whiteTime}</h2>
        </div>
    );
};

export default Timer;