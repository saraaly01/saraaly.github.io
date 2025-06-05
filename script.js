function calculate() {
    const transit = parseFloat(document.getElementById("costT").value);
    const parking = parseFloat(document.getElementById("costP").value);
    const transitBalance = parseFloat(document.getElementById("balanaceT").value);
    const parkingBalance = parseFloat(document.getElementById("balanaceP").value);
  
    const selectedDays = getSelectedWeekdays();
  
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
  
    const remainingDays = countWeekdaysInMonth(currentYear, currentMonth, selectedDays, today.getDate() + 1);
  
    const { year: targetYear, month: targetMonth } = getTargetMonthAndYear();
    const nextMonthDays = countWeekdaysInMonth(targetYear, targetMonth, selectedDays);
  
    // Transit
    const transitThisMonthCost = remainingDays * transit;
    const transitLeftover = transitBalance - Math.min(0,transitThisMonthCost);
    const transitNextMonthCost = nextMonthDays * transit;
    const transitElect = Math.max(0, transitNextMonthCost - transitLeftover);
  
    // Parking
    const parkingThisMonthCost = remainingDays * parking;
    const parkingLeftover = parkingBalance -  Math.min(0,parkingThisMonthCost);
    const parkingNextMonthCost = nextMonthDays * parking;
    const parkingElect = Math.max(0, parkingNextMonthCost - parkingLeftover);
  
    const monthName = new Date(targetYear, targetMonth).toLocaleString('default', { month: 'long' });
  
    document.getElementById("output").textContent = `Selected weekdays in ${monthName}: ${nextMonthDays}`;
    document.getElementById("output2").textContent = "Elect for Transit: $" + transitElect.toFixed(2);
    document.getElementById("output3").textContent = "Elect for Parking: $" + parkingElect.toFixed(2);
  }
  function showElectionMonth() {
    const { year, month } = getTargetMonthAndYear();
    const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
    document.getElementById("monthTitle").textContent = `Election Month: ${monthName} ${year}`;
  }
  function getTargetMonthAndYear() {
    const today = new Date();
    let targetMonth = today.getMonth() + 1; // default to next month
    let year = today.getFullYear();
  
    if (today.getDate() >= 11) {
      targetMonth += 1; // go two months ahead
    }
  
    if (targetMonth > 11) {
      targetMonth = targetMonth % 12;
      year += 1;
    }
  
    return { year, month: targetMonth };
  }
  
  function getSelectedWeekdays() {
    return Array.from(document.querySelectorAll('input[name="days"]:checked'))
      .map(cb => parseInt(cb.value));
  }
  
  function countWeekdaysInMonth(year, month, selectedDays, startDay = 1) {
    let count = 0;
    for (let day = startDay; day <= 31; day++) {
      const date = new Date(year, month, day);
      if (date.getMonth() !== month) break;
      if (selectedDays.includes(date.getDay())) count++;
    }
    return count;
  }
  