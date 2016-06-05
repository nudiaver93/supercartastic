$(document).ready(function(){
    var makelist = ['BMW', 'Mercedes', 'McLaren', 'Ferrari', 'Tesla', 'Lexus', 'Porsche', 'Audi'];
    function makes(){
        for(var i = 0; i < makelist.length; i++){
            var car = $('<button>');
            car.attr('data-make', makelist[i]);
            car.text(makelist[i]);
            $('#carButtons').append(car);
        }
    }
    makes();
    function gifstate(){
        var state = $(this).attr('state');
        if(state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('state', 'still');
        }
    }
    function newgifs(){
        var make = $(this).data('make');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + make + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({ url: queryURL, method: 'GET'})
            .done(function(response) {
                var makegifs = response.data;
                for (var i = 0; i < makegifs.length; i++) {
                    var cars = $('<div>');
                    var rate = $('<p>').text("Rating: " + makegifs[i].rating);
                    var makeimg = $('<img>');
                    makeimg.attr('src', makegifs[i].images.fixed_height_still.url);
                    makeimg.attr('state', 'still');
                    makeimg.attr('data-still', makegifs[i].images.fixed_height_still.url);
                    makeimg.attr('data-animate', makegifs[i].images.fixed_height.url);
                    makeimg.on('click', gifstate);
                    cars.append(rate);
                    cars.append(makeimg);
                    $('#gifs').prepend(cars);
                }
            });
    }
    $('#newButton').on('click', function(){
        var buttons = $('<button>');
        buttons.attr('data-make', $('#newCar').val());
        buttons.text($('#newCar').val());
        buttons.on('click', newgifs);
        $('#carButtons').append(buttons);
        return false;
    });
    $('button').on('click', newgifs);
    $('.makeimg').on('click', gifstate);
});