'use strict';

(function () {
    var GET_DEPARTURE_URL = 'https://api.rasp.yandex.net/v3.0/schedule/?apikey=be7075c5-bfa6-4f42-8f9f-64e33414932e&station=LED&transport-types=plane&event=departure&system=iata';
    var GET_ARRIVAL_URL = 'https://api.rasp.yandex.net/v3.0/schedule/?apikey=be7075c5-bfa6-4f42-8f9f-64e33414932e&station=LED&transport-types=plane&event=arrival&system=iata';

    var xhrLoadListener = function (onSuccess, onError, url) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function () {
            if (xhr.status === 200) {
                console.log(xhr.response);
                onSuccess(xhr.response);
            } else {
                onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
            }
        });
        xhr.addEventListener('error', function () {
            onError('Ошибка соединения');
        });
        xhr.addEventListener('timeout', function () {
            onError('Запрос не успел выполниться за' + xhr.timeout + 'мс');
        });

        xhr.timeout = 10000;
        xhr.open('GET', url);
        xhr.send();
    };

    window.backend = {
        loadDepartures: function (onSuccess, onError) {
            xhrLoadListener(onSuccess, onError, GET_DEPARTURE_URL);
        },
        loadArrivals: function (onSuccess, onError) {
            xhrLoadListener(onSuccess, onError, GET_ARRIVAL_URL);
        }
    }

})();