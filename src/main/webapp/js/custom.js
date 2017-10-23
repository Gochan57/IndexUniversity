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
        $.ajax({
            url: 'https://apex.oracle.com/pls/apex/domospace/university/university/',
            success: function(result) {
                _.each(result.items, function(u) {
                    var university = _.find(universities, function(c) {return c.id == u.id})
                    if(university) {
                        university.fullName = u.fullname
                        university.shortName = u.shortname
                        university.address = u.address
                    }
                })
                setGoogleMap()
            }
        })
    }

    function setGoogleMap() {

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
            var shortname = university.shortName||university.fullName||'Название неизвестно'
            var address = university.address||'Адрес неизвестен'
            var id = university.id

            var contentString = '<div class="info-window">' +
                '<h3>'+shortname+'</h3>' +
                '<div class="info-content">' +
                '<p>'+address+'</p>' +
                '</div>' +
                (id ? '<a href="./university.html?unId='+id+'">Перейти на страницу университета</a>' : '') +
                '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 400
            });

            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
        })

        var styles = [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#523735"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#c9b2a6"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#dcd2be"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ae9e90"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#93817c"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#a5b076"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#447530"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#fdfcf8"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f8c967"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#e9bc62"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e98d58"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#db8555"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#806b63"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8f7d77"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#b9d3c2"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#92998d"
                    }
                ]
            }
        ];

        map.set('styles', styles);


    }

    google.maps.event.addDomListener(window, 'load', initMap);
});