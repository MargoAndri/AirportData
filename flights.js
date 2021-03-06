'use strict';

(function () {
    window.loadedFlights = {};
    /**
     * @param {Object} flightData
     * @param {Object} template
     * @return {Node} row
     */
    var generateFlightData = function (flightData, template) {
        var row = document.importNode(template.content, true);
        var time = row.querySelector('.flight__time');

        if (flightData.departure === null) {
            time.textContent = flightData.arrival;
        } else time.textContent = flightData.departure;

        var direction = row.querySelector('.flight__direction');
        direction.textContent = flightData.thread.title;

        var number = row.querySelector('.flight__number');
        number.textContent = flightData.thread.number;

        var terminal = row.querySelector('.flight__terminal');
        terminal.textContent = flightData.thread.terminal;

        return row;
    };

    /**
     * @param {Array} flightList
     */
    var renderFlight = function (flightList) {
        var template = document.querySelector('#table__row');
        var fragment = document.createDocumentFragment();
        var table = document.querySelector('.flights__table');
        for (var i = 0; i < flightList.length; i++) {
            var flight = generateFlightData(flightList[i], template);
            fragment.appendChild(flight);
        }
        table.appendChild(fragment);
    };

    var searchForm = document.querySelector('.search__form');
    var showSearchForm = function () {
        searchForm.classList.remove('visually__hidden');
    };

    var departureFlightLink = document.querySelector('#departure');
    var table = document.querySelector('.flights__table');
    departureFlightLink.addEventListener('click', function (evt) {
        evt.preventDefault();
        table.innerHTML = '';
        departureFlightLink.classList.add('selected');
        arrivalFlightsLink.classList.remove('selected');
        window.backend.loadDepartures(onSuccessLoaded, console.log);
        showSearchForm();
    });

    var arrivalFlightsLink = document.querySelector('#arrival');
    arrivalFlightsLink.addEventListener('click', function (evt) {
        evt.preventDefault();
        table.innerHTML = '';
        arrivalFlightsLink.classList.add('selected');
        departureFlightLink.classList.remove('selected');
        window.backend.loadArrivals(onSuccessLoaded, console.log);
        showSearchForm();
    });

    var onSuccessLoaded = function (flights) {
            window.loadedFlights = flights.schedule;
            renderFlight(window.loadedFlights);
        };


    var search = document.querySelector('#search');
    var searchButton = document.querySelector('#search__button');
    searchButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        var searchFilter = window.loadedFlights.filter(function (item) {
            if (item.thread.number.includes(search.value)) {
                return true;
            }
        });
        table.innerHTML = '';
        renderFlight(searchFilter);
    });

    document.addEventListener('keydown', function (evt) {
        if (evt.code === 'Enter') {
            evt.preventDefault();
            var searchFilter = window.loadedFlights.filter(function (item) {
                if (item.thread.number.includes(search.value)) {
                    return true;
                }
            });
            table.innerHTML = '';
            renderFlight(searchFilter);
        }
    });

    var clearSearch = document.querySelector('#clear');
    clearSearch.addEventListener('click', function (evt) {
        evt.preventDefault();
        search.value = '';
        renderFlight(window.loadedFlights);
    });

    document.addEventListener('keydown', function (evt) {
        if (evt.code === 'Escape') {
            evt.preventDefault();
            search.value = '';
            renderFlight(window.loadedFlights);
        }
    })
})();