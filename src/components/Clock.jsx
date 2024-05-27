import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    const nhours = time.getHours();
    const nmins = time.getMinutes();
    const nsecn = time.getSeconds();
    const nday = time.getDay();
    const ntoday = time.getDate();
    const nmonth = time.getMonth() + 1;
    let nyear = time.getFullYear();

    const daysOfWeek = [
      'Ch&#7911; Nh&#7853;t',
      'Th&#7913; 2',
      'Th&#7913; 3',
      'Th&#7913; 4',
      'Th&#7913; 5',
      'Th&#7913; 6',
      'Th&#7913; 7',
    ];

    const AMorPM = nhours >= 12 ? 'PM' : 'AM';
    const formattedHours = nhours > 12 ? nhours - 12 : nhours === 0 ? 12 : nhours;
    const formattedMinutes = nmins < 10 ? '0' + nmins : nmins;
    const formattedSeconds = nsecn < 10 ? '0' + nsecn : nsecn;

    return (
      '<span>' +
      daysOfWeek[nday] +
      ', Ngày ' +
      ntoday +
      ' Tháng ' +
      nmonth +
      ' Năm ' +
      nyear +
      ' | ' +
      formattedHours +
      ':' +
      formattedMinutes +
      ':' +
      formattedSeconds +
      ' ' +
      AMorPM +
      '</span>'
    );
  };

  return <div dangerouslySetInnerHTML={{ __html: formatTime(currentTime) }} />;
};

export default Clock;