'use strict';

(function () {
    var generateFlightData = function (flightData, template) {
        var row = document.importNode(template.content, true);
        var time = row.querySelector('.flight__time');
        time.textContent = flightData.departure;

        var direction = row.querySelector('.flight__direction');
        direction.textContent = flightData.thread.title;

        var number = row.querySelector('.flight__number');
        number.textContent = flightData.thread.number;

        var terminal = row.querySelector('.flight__terminal');
        terminal.textContent = flightData.thread.terminal;

        return row;
    };

    var renderFlight = function (flightList) {
        var template = document.querySelector('#table__row');
        var fragment = document.createDocumentFragment();
        var departureTable = document.querySelector('.departure__flights__table');
        for (var i = 0; i < flightList.schedule.length; i++) {
            var flight = generateFlightData(flightList.schedule[i], template);
            fragment.appendChild(flight);
        }
        departureTable.appendChild(fragment);
    };

    var departureFlightLink = document.querySelector('#departure');
    var table = document.querySelector('.departure__flights__table');
    departureFlightLink.addEventListener('click', function (evt) {
        evt.preventDefault();
        table.innerHTML = '';
        window.backend.loadDepartures(renderFlight, console.log);
    });

    var arrivalFlightsLink = document.querySelector('#arrival');
    arrivalFlightsLink.addEventListener('click', function (evt) {
        evt.preventDefault();
        table.innerHTML = '';
        window.backend.loadArrivals(renderFlight, console.log);
    })
})();