var universities = [
    {id:1, coords: [56.861527, 60.61883999999998]},
    {id:2, coords: [56.81083899999999, 60.62004000000002]},
    {id:3, coords: [56.8864435, 60.58629610000003]},
    {id:4, coords: [56.838955, 60.59364000000005]},
    {id:5, coords: [56.81251, 60.574118]},
    {id:6, coords: [56.811774, 60.57661400000006]},
    {id:7, coords: [56.8272242, 60.63270550000004]},
    {id:8, coords: [56.75589739999999, 60.70873719999997]},
    {id:9, coords: [56.821914, 60.544576000000006]},
    {id:10, coords: [56.8375237, 60.60327189999998]},
    {id:11, coords: [56.769349, 60.669031399999994]},
    {id:12, coords: [56.84157039999999, 60.61017140000001]},
    {id:13, coords: [56.8465753, 60.65821529999994]},
    {id:14, coords: [56.88615, 60.59929999999997]},
    {id:17, coords: [56.840942, 60.60985470000003]},
    {id:20, coords: [56.832884, 60.57617200000004]},
    {id:21, coords: [56.840647, 60.611474000000044]},
    {id:23, coords: [56.8259544, 60.60273170000005]},
    {id:25, coords: [56.838634, 60.66175799999996]},
    {id:35, coords: [56.84408699999999, 60.65366800000004]}
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

        universities.forEach(function (university) {
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


        var styles = [{
            "featureType": "landscape",
            "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]
        }, {
            "featureType": "poi",
            "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]
        }, {
            "featureType": "road.highway",
            "stylers": [{"saturation": -100}, {"visibility": "simplified"}]
        }, {
            "featureType": "road.arterial",
            "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]
        }, {
            "featureType": "road.local",
            "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]
        }, {
            "featureType": "transit",
            "stylers": [{"saturation": -100}, {"visibility": "simplified"}]
        }, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]}, {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]
        }];

        map.set('styles', styles);


    }

    google.maps.event.addDomListener(window, 'load', initMap);
});