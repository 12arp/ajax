$(document).ready(function(){     
$('#myform').submit(function(e){
e.preventDefault();
alert('jejej');
  var dataPayload = {
                address1: $('#address1').val(),
                address2: $('#address2').val(),
                city: $('#city').val(),
                state: $('#state').val(),
                zipcode: $('#zipcode').val(),
                country: $('#country').val(),
                userid:$('#user_id').val(),
                address_type: $('#address_type').val()
            };
             //let address2=address1+"/:id".replace(':id', dataPayload.userid);

             console.log(address2);
              $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
$.ajax({
   url:store,
   method:"post",
   data:dataPayload,
   success: function(response) {
                    console.log('Success:', response);
                    // window.location.href = dashboard;
                },
                error: function(xhr, status, error) {
                    console.log("error",error)
       if (xhr.status === 422) {
        let errors = xhr.responseJSON.errors;
        let $errorList = $('#error-list');
        
     
        $errorList.empty();
        $('#error-container').show();

 
        $.each(errors, function(key, messages) {
           
            $.each(messages, function(index, message) {
                $errorList.append('<li>' + message + '</li>');
            });
        });
    } else {
        alert('An unexpected server error occurred.');
    }

        if (xhr.status === 500) {
            console.error('Server Error:', xhr.responseText);
            alert('A server error occurred. Check Laravel logs.');
        }
        else {
            console.error('Error:', error);
        }

      }
})



})})

// $(document).ready(function() {
//     $('#myform').on('submit', function(e) {
//         e.preventDefault();
//         // 1. Gather data
//         var dataPayload = {
//             address1: $('#address1').val(),
//             address2: $('#address2').val(),
//             city: $('#city').val(),
//             state: $('#state').val(),
//             zipcode: $('#zipcode').val(),
//             country: $('#country').val(),
//             userid: $('#user_id').val(),
//             address_type: $('#address_type').val()
//         };

//         // 2. Fix: Defined address2 before logging (using dataPayload values)
//         var addressRoute = dataPayload.address1 + "/" + dataPayload.userid;
//         console.log("Routing to: ", addressRoute);

//         // 3. CSRF Protection (Standard for Laravel)
//         $.ajaxSetup({
//             headers: {
//                 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//             }
//         });

//         // 4. AJAX Request
//         $.ajax({
//             url: store,
//             method: "POST",
//             data: dataPayload,
//             success: function(response) {
//                 console.log('Success:', response);
//                 // alert('Saved successfully!');
//                 // window.location.href = '/dashboard';
//             },
//             error: function(xhr, status, error) {
//                 let $errorList = $('#error-list');
//                 let $errorContainer = $('#error-container');
                
//                 $errorList.empty(); // Clear previous errors

//                 if (xhr.status === 422) {
//                     // Validation Errors (Laravel Default)
//                     let errors = xhr.responseJSON.errors;
//                     $errorContainer.show();
//                     $.each(errors, function(key, messages) {
//                         $.each(messages, function(index, message) {
//                             $errorList.append('<li>' + message + '</li>');
//                         });
//                     });
//                 } else if (xhr.status === 500) {
//                     console.error('Server Error:', xhr.responseText);
//                     alert('A server error occurred. Please check logs.');
//                 } else {
//                     console.error('Error:', error);
//                     alert('An unexpected error occurred: ' + error);
//                 }
//             }
//         });
//     });
// });
