var universities = [
    {
        id: 1,
        coords: [56.839563, 60.6326293],
    },
    {
        id: 2,
        coords: [56.852746, 60.5878303]
    }
]

var tags = {
    1: [
        {
            tag: 'обучение',
            value: 0.9
        },
        {
            tag: 'английский',
            value: -0.2
        },
        {
            tag: 'преподаватели',
            value: 0.5
        }
    ],
    2: [
        {
            tag: 'обучение',
            value: 0.2
        },
        {
            tag: 'английский',
            value: 1
        },
        {
            tag: 'преподаватели',
            value: -0.3
        }
    ]
}

var tags

$(function () {

    function initMap() {

        var location = new google.maps.LatLng(56.8546004, 60.638816);

        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: location,
            zoom: 12,
            panControl: false,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);

        universities.forEach(function(university) {
            var loc = new google.maps.LatLng(university.coords[0], university.coords[1]);
            var marker = new google.maps.Marker({
                position: loc,
                map: map,
                icon: './img/university.png'
            });

            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
        })

        var contentString = '<div class="info-window">' +
            '<h3>Info Window Content</h3>' +
            '<div class="info-content">' +
            '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>' +
            '</div>' +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 400
        });



        var styles = [{"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]}, {"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]}, {"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]}, {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}];

        map.set('styles', styles);


    }

    google.maps.event.addDomListener(window, 'load', initMap);
});