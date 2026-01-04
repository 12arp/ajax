$(document).ready(function () {



    class FormValidator {
        #patterns = {
            name: /^[A-Za-z]+$/,
            username: /^[a-zA-Z0-9_]{3,16}$/,
            email: /^(?=.*[a-zA-Z])[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            password: /^.{1,16}$/,
            phone: /^\d{10,15}$/,
            date: /^\d{4}-\d{2}-\d{2}$/,
            address: /^[a-zA-Z0-9\s,.'#\-\/]{3,100}$/,
            city: /^[a-zA-Z\s\-]{2,50}$/,
            state: /^[a-zA-Z\s\-]{2,50}$/,
            zipcode: /^[a-zA-Z0-9\s\-]{3,10}$/,
            country: /^[A-Z]{2}$/
        };

        validate(type, value) {
            return this.#patterns[type] ? this.#patterns[type].test(value) : false;
        }
    }
    $('#auto').on('change', function () {
        if ($(this).prop('checked')) {

            $('#paddress1').val($('#address1').val());
            $('#paddress2').val($('#address2').val());
            $('#pcity').val($('#city').val());
            $('#pstate').val($('#state').val());
            $('#pzipcode').val($('#zipcode').val());
            $('#pcountry').val($('#country').val());

        } else {
            $('#paddress1').val('');
            $('#paddress2').val('');
            $('#pcity').val('');
            $('#pstate').val('');
            $('#pzipcode').val('');
            $('#pcountry').val('');
        }
    })

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: old,
        method: 'POST',
        data: {
            id: id,

        },
        success: function (response) {
            // alert(response.current_address.address1);
            if (response) {
                $('#first_name').val(response.user.first_name);
                $('#last_name').val(response.user.last_name);
                $('#username').val(response.user.username);
                $('#email').val(response.user.email);
                $('#password').val(response.user.password);
                $('#dob').val(response.user.dob);
                $('#phone').val(response.user.phone);
                $(`input[name="gender"][value="${response.user.gender}"]`).prop('checked', true);
                // Populate current address fields first
                $('#address1').val(response.current_address.address1);
                $('#address2').val(response.current_address.address2);
                $('#city').val(response.current_address.city);
                $('#state').val(response.current_address.state);
                $('#zipcode').val(response.current_address.zipcode);
                $('#country').val(response.current_address.country);
                
                // Check the checkbox if ischecked is 1
                if (response.current_address && response.current_address.ischecked == 1) {
                    $('#auto').prop('checked', true);
                    // Copy current address values to permanent address (since they're the same)
                    $('#paddress1').val(response.current_address.address1);
                    $('#paddress2').val(response.current_address.address2);
                    $('#pcity').val(response.current_address.city);
                    $('#pstate').val(response.current_address.state);
                    $('#pzipcode').val(response.current_address.zipcode);
                    $('#pcountry').val(response.current_address.country);
                } else {
                    // Populate permanent address fields from database
                    $('#paddress1').val(response.current_address.paddress1);
                    $('#paddress2').val(response.current_address.paddress2);
                    $('#pcity').val(response.current_address.pcity);
                    $('#pstate').val(response.current_address.pstate);
                    $('#pzipcode').val(response.current_address.pzipcode);
                    $('#pcountry').val(response.current_address.pcountry);
                }
            }
        }
    });









    $('#myform').submit(function (e) {




        e.preventDefault();

        var dataPayload = {


            fname: $('#first_name').val(),
            lname: $('#last_name').val(),
            username: $('#username').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            dob: $('#dob').val(),
            phone: $('#phone').val(),
            gender: $('input[name="gender"]:checked').val()

        };

        var dataPayload1 = {
            address1: $('#address1').val(),
            address2: $('#address2').val(),
            city: $('#city').val(),
            state: $('#state').val(),
            zipcode: $('#zipcode').val(),
            country: $('#country').val(),
            //userid:   response.user_id,

        };


        var dataPayload2 = {
            paddress1: $('#paddress1').val(),
            paddress2: $('#paddress2').val(),
            pcity: $('#pcity').val(),
            pstate: $('#pstate').val(),
            pzipcode: $('#pzipcode').val(),
            pcountry: $('#pcountry').val(),
            //userid:   response.user_id,

        };



        const validator = new FormValidator();

        let errors = [];

        if (!validator.validate('name', dataPayload.fname)) errors.push("Invalid First Name");
        if (!validator.validate('name', dataPayload.lname)) errors.push("Invalid Last Name");
        if (!validator.validate('username', dataPayload.username)) errors.push("Invalid Username");
        if (!validator.validate('email', dataPayload.email)) errors.push("Invalid Email Address");
        if (!validator.validate('password', dataPayload.password)) errors.push("Password too long (max 16)");
        if (!validator.validate('date', dataPayload.dob)) errors.push("Invalid Date of Birth");
        if (!validator.validate('phone', dataPayload.phone)) errors.push("Invalid Phone Number");
        if (!dataPayload.gender) errors.push("Please select a gender");

        if (!validator.validate('address', dataPayload1.address1)) errors.push("Invalid Address Line 1");
        if (dataPayload1.address2 && !validator.validate('address', dataPayload1.address2)) errors.push("Invalid Address Line 2");
        if (!validator.validate('city', dataPayload1.city)) errors.push("Invalid City");
        if (!validator.validate('state', dataPayload1.state)) errors.push("Invalid State/Province");
        if (!validator.validate('zipcode', dataPayload1.zipcode)) errors.push("Invalid Zip/Postal Code");
        // if (!validator.validate('country', dataPayload1.country)) errors.push("Please select a Country");

        if (!validator.validate('address', dataPayload2.paddress1)) errors.push("Invalid Address Line 1");
        if (dataPayload1.address2 && !validator.validate('address', dataPayload2.paddress2)) errors.push("Invalid Address Line 2");
        if (!validator.validate('city', dataPayload2.pcity)) errors.push("Invalid City");
        if (!validator.validate('state', dataPayload2.pstate)) errors.push("Invalid State/Province");
        if (!validator.validate('zipcode', dataPayload2.pzipcode)) errors.push("Invalid Zip/Postal Code");


        if (errors.length > 0) {
            alert(errors.join("\n"));
            return false;
        }

        $.ajax({
            url: update,
            type: 'get',

            data: {
                ...dataPayload,
                ...dataPayload1,

                ...dataPayload2,
                id: id,
            },
            success: function (response) {
                console.log('Success:', response);
                window.location.href = dashboard;
            },
            error: function (xhr, status, error) {
                if (xhr.status === 422) {
                    let errors = xhr.responseJSON.errors;
                    let $errorList = $('#error-list');


                    $errorList.empty();
                    $('#error-container').show();


                    $.each(errors, function (key, messages) {

                        $.each(messages, function (index, message) {
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
    })

});