$(document).ready(function() {

  $('select').material_select();


  $('button').on('click',function(){
    let $departure = $('[name="departure"]').val();
    console.log("The 3 letter departure station is: " + $departure);
    let $arrival = $('[name="arrival"]').val();
    console.log("The 3 letter arrival station is: " + $arrival);

      // $.ajax({
      //   url:'http://localhost:3000/trainlist/',
      //   method:'POST',
      //   success: function(data){
      //     console.log(data);
      //       // $.ajax({
      //       //   url: 'https://traintime.lirr.org/api/Departure?loc=' + data.shortname,
      //       //   method: 'GET',
      //       //   success: function(data){
      //       //     console.log("the JSON object is:" + data)
      //       //   }
      //       // })
      //   }
      // })

  })







});
