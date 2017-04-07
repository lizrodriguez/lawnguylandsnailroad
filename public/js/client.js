$(document).ready(function() {

  let trainData = "";
  $('select').material_select();

  $('button').on('click',function(){
    let $departure = $('[name="departure"]').val();
    console.log("The 3 letter departure station is: " + $departure);

    let $arrival = $('[name="arrival"]').val();
    console.log("The 3 letter arrival station is: " + $arrival);


    $.ajax({ //https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
      url: 'https://traintime.lirr.org/api/Departure?loc=' + $departure,
      method: 'GET',
      dataType: 'json',
      success: function(response){
        console.log(response.LOC);
        console.log(response.TIME);
        
        }
    })


  }) //button







});
