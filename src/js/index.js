function timer() {

    const startInput = new Date(document.getElementById("start").value).getTime()
    const endInput = new Date(document.getElementById("end").value).getTime()

    if (!startInput || !endInput) {
        document.getElementById("progressText").innerText = "Please enter valid dates.";
        return;
    }

    const startDate = new Date(startInput).getTime();
    const endDate = new Date(endInput).getTime();
    const currentDate = new Date().getTime()

    if (isNaN(startDate) || isNaN(endDate) || startDate > endDate || currentDate < startDate) {
        document.getElementById("progressText").innerText = "Invalid date range.";
        return;
    }

    const remainingTime = endDate - currentDate
    const totalTime = endDate - startDate
    const spentTime = currentDate - startDate

    let percentageTime = (spentTime / totalTime * 100).toFixed(6)
    if (percentageTime > 100) {
        percentageTime = 100
        document.getElementById("progressText").innerText = "You're done!";
    }else{
        document.getElementById("progressText").innerText = "Progress at : " + percentageTime + "%";
    }

    document.getElementById("dynamicProgressBar").style.width = percentageTime + "%";

    if (startDate === endDate || currentDate > endDate) {
        document.getElementById("congratsModal").style.display = "flex";
    } else {
        document.getElementById("congratsModal").style.display = "none";
    }
    document.getElementById("closeModal").addEventListener("click", function () {
        document.getElementById("congratsModal").style.display = "none";
    });

    millisToDaysHoursMinutes(remainingTime)

}

function millisToDaysHoursMinutes(millis) {
    const second = 1000,
        cent = 100,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    const daysRemaining = Math.floor(millis / (day))

    document.getElementById("days").innerText = daysRemaining
    document.getElementById("hours").innerText = Math.floor((millis % (day)) / (hour))
    document.getElementById("minutes").innerText = Math.floor((millis % (hour)) / (minute))
    document.getElementById("seconds").innerText = Math.floor((millis % (minute)) / second)

    busRoute(daysRemaining)
    stepRemaining(daysRemaining)
}

function busRoute(totalDays) {
    const DAYS_PER_WEEK = 7,
        PRESENTIAL_DAYS = 2,
        ROUND_TRIP = 2;

    const totalWeek = (totalDays / DAYS_PER_WEEK).toFixed(0)
    const busROUTE = ((totalWeek * PRESENTIAL_DAYS) * ROUND_TRIP).toFixed(0)

    document.getElementById("busRouteDisplay").innerText = busROUTE
}

function stepRemaining(totalDays) {
    const STEP_PER_KM = 1400,
        KM_GYM = 2.5,
        KM_STORE = 3.5,
        DAYS_PER_WEEK = 7,
        ROUND_TRIP = 2;

    const totalWeek = (totalDays / DAYS_PER_WEEK).toFixed(0);
    const RoundTripGym = ((totalWeek) * ROUND_TRIP);
    const RoundTripStore = ((totalWeek));

    const step = ((RoundTripGym * (STEP_PER_KM * KM_GYM)) + (RoundTripStore * (STEP_PER_KM * KM_STORE)));

    document.getElementById("numberStepDisplay").innerText = step.toLocaleString();
}

timer();

setInterval(timer, 1000);
