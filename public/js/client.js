$(document).ready(function() {

  let trainData = "";
  $('select').material_select();

  $('button').on('click',function(){
    let $departure = $('[name="departure"]').val();
    console.log("The 3 letter departure station is: " + $departure);

    let $arrival = $('[name="arrival"]').val();
    console.log("The 3 letter arrival station is: " + $arrival);

    let trains = "";
    let stops = "";

    $.ajax({ //https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
      url: "https://traintime.lirr.org/api/Departure?loc=" + $departure,
      method: "GET",
      dataType: "json",
      success: function(res){
        // console.log("The departure LOC is: " + res.LOC); //the departure LOC
        // console.log("The departure TIME is: " + res.TIME); //the current time of the query/computer
        let sched = res.TRAINS[0].SCHED;
        let trainline = res.TRAINS[0].DEST;

        // console.log("SCHED is "+  res.TRAINS[0].SCHED);
        // console.log("DEST is " + res.TRAINS[0].DEST);
        for (var i = 0; i < res.TRAINS.length; i++) {
          trains = res.TRAINS[i];
          for (var j = 0; j < trains.STOPS.length; j++) {
            stops = trains.STOPS[j];
            console.log(stops);
              if(stops === $arrival){
                console.log("The scheduled times for your arrival are: ");
                console.log(trains.SCHED);
                //append results to page
                $results = $('<p></p>');
                $results.text("The scheduled times for your arrival are: " + trains.SCHED);
                $('row').append($results);
              }//end if
          }
        }//end for i & j

      }//end success function

    })

  }) //button







});
