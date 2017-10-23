function getLatitudeLongitude(callback, uni) {
    // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
    address = uni.address;
    console.log(address);
    // Initialize the Geocoder
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0], uni);
            }
        });
    }
}

function geo() {
    $.ajax({
        url: "https://apex.oracle.com/pls/apex/domospace/university/university/", success: function (result) {
            _.each(result.items, function (e) {
                console.log(e);
                getLatitudeLongitude(showResult, e);
            });
        }
    })
}

function showResult(result, uni) {
    // console.log("University: " + (uni.shortname || uni.fullname) + ';\tCoordinates: ' + result.geometry.location.lat() + ', ' + result.geometry.location.lng());
    console.log(uni.id + '\t' + result.geometry.location.lat() + '\t' + result.geometry.location.lng());

    // $.ajax({
    //     type: 'POST',
    //     url: "https://apex.oracle.com/pls/apex/domospace/university/university/" + uni.id,
    //     data: {altit: result.geometry.location.lat(), longit: result.geometry.location.lng()},
    //     success: function (e) {
    //         console.log(":)")
    //         console.log(e)
    //     },
    //     fail: function (e) {
    //         console.log(":(");
    //         console.log(e)
    //     },
    //     dataType: 'json'
    // });

    // $.post("https://apex.oracle.com/pls/apex/domospace/university/university/" + uni.id, function(res){
    //     alert( "success" );
    // })
}

geo()