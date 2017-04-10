$(document).ready(function() {

  $('select').material_select();

  $('button').on('click',function(){
    let $departure = $('[name="departure"]').val();
    console.log("The 3 letter departure station is: " + $departure);

    let $arrival = $('[name="arrival"]').val();
    console.log("The 3 letter arrival station is: " + $arrival);
    // arrival time not available through this api url
    let trains = "";
    let stops = "";
    let $ul = $('<ul>');
    let $results;
    $.ajax({ //https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
      url: "https://traintime.lirr.org/api/Departure?loc=" + $departure,
      method: "GET",
      dataType: "json",
      success: function(res){
        console.log("The departure LOC is: " + res.LOC); //the departure LOC
        console.log("The departure TIME is: " + res.TIME); //the current time of the query/computer
        for (var i = 0; i < res.TRAINS.length; i++) {
          trains = res.TRAINS[i];
          for (var j = 0; j < trains.STOPS.length; j++) {
            stops = trains.STOPS[j];
            // console.log(stops);
            let sched = res.TRAINS[i].SCHED;
            let time = sched.split(" ");
            let trainline = res.TRAINS[i].DEST;
            let direction = res.TRAINS[i].DIR;
            let trackNum = res.TRAINS[i].TRACK;
              if(stops === $arrival){
                //append results to page
                let $li = $('<li>' + time[1] + " to " + trainline + " trainline going " + direction + "-bound: Track " + trackNum + '</li>');
                $results = $ul.append($li);
                $('p#results').append($results);
              }
          }
        }//end for i & j

      },//end success function

      error: function(res){
        $('p#results').text("Please try again");
        //throw error, try again
      }
    })

  }) //button







});
