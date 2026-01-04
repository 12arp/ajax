$(document).ready(function () {



    $.ajax({
        url: country,
        type: "GET",
        dataType: "json",
        success: function (data) {
            let select = $('#pcountry');
            let select1 = $('#country');
            $.each(data, function (key, country) {

                select.append('<option value="' + country.id + '">' + country.name + '</option>');
                select1.append('<option value="' + country.id + '">' + country.name + '</option>');
            });


            let oldValue = "{{ old('pcountry') }}";
            if (oldValue) {
                select.val(oldValue);
            }
        },
        error: function (xhr) {
            console.error("Could not fetch countries: ", xhr.responseText);
        }
    });


    $('#pcountry').on('change', function () {
        var countryId = $(this).val();
        var stateSelect = $('#pstate');


        // stateSelect.html('<option value="">Loading...</option>');

        if (countryId) {
            $.ajax({
                url: state + "/" + countryId,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    stateSelect.html('<option value="">Select State</option>');
                    $.each(data, function (key, state) {
                        stateSelect.append('<option value="' + state.id + '">' + state.name + '</option>');
                    });
                },
                error: function () {
                    stateSelect.html('<option value="">Error loading states</option>');
                }
            });
        } else {
            stateSelect.html('<option value="">Select State</option>');
        }
    });





    $('#country').on('change', function () {
        var countryId = $(this).val();
        var stateSelect = $('#state');


        // stateSelect.html('<option value="">Loading...</option>');

        if (countryId) {
            $.ajax({
                url: state + "/" + countryId,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    stateSelect.html('<option value="">Select State</option>');
                    $.each(data, function (key, state) {
                        stateSelect.append('<option value="' + state.id + '">' + state.name + '</option>');
                    });
                },
                error: function () {
                    stateSelect.html('<option value="">Error loading states</option>');
                }
            });
        } else {
            stateSelect.html('<option value="">Select State</option>');
        }
    });


    $('#pstate').on('change', function () {
        var stateId = $(this).val();
        var callback = $(this).data('callback'); // Get callback if set
        $('#pcity').html('<option value="">Select City</option>');

        if (stateId) {
            $.ajax({
                url: city + "/" + stateId,
                type: "GET",
                success: function (data) {
                    $.each(data, function (key, city) {
                        $('#pcity').append('<option value="' + city.id + '">' + city.name + '</option>');
                    });
                    // Execute callback if provided (used when copying from current address)
                    if (callback && typeof callback === 'function') {
                        callback();
                    }
                }
            });
        } else {
            // Execute callback even if no state (to handle cleanup)
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    });


    $('#state').on('change', function () {
        var stateId = $(this).val();
        $('#city').html('<option value="">Select City</option>');

        if (stateId) {
            $.ajax({
                url: city + "/" + stateId,
                type: "GET",
                success: function (data) {
                    $.each(data, function (key, city) {
                        $('#city').append('<option value="' + city.id + '">' + city.name + '</option>');
                    });
                }
            });
        }
    });


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
            zipcode: /^\d{6}$/,
            country: /^[A-Z]{2}$/
        };

        validate(type, value) {
            return this.#patterns[type] ? this.#patterns[type].test(value) : false;
        }
    }

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });


    $('#auto').on('change', function () {
        if ($(this).prop('checked')) {
            // Copy address fields
            $('#paddress1').val($('#address1').val());
            $('#paddress2').val($('#address2').val());
            $('#pzipcode').val($('#zipcode').val());
            
            // Copy country and trigger change to populate states
            var countryId = $('#country').val();
            if (countryId) {
                $('#pcountry').val(countryId).trigger('change');
                
                // Wait for states to load, then copy state and trigger city load
                setTimeout(function() {
                    var stateId = $('#state').val();
                    if (stateId) {
                        var cityId = $('#city').val();
                        
                        // Temporarily enable pstate to allow change event
                        $('#pstate').prop('disabled', false);
                        
                        // Set callback to run after cities are loaded
                        $('#pstate').data('callback', function() {
                            // Cities are now loaded, set the city value
                            if (cityId) {
                                $('#pcity').prop('disabled', false);
                                $('#pcity').val(cityId);
                            }
                            // Now disable all selects
                            $('#pcity, #pstate, #pcountry').prop('disabled', true);
                        });
                        
                        // Trigger state change which will load cities and execute callback
                        $('#pstate').val(stateId).trigger('change');
                    } else {
                        // No state selected, just disable selects
                        $('#pcity, #pstate, #pcountry').prop('disabled', true);
                    }
                }, 500);
            } else {
                // No country selected, disable selects
                $('#pcity, #pstate, #pcountry').prop('disabled', true);
            }
            
            // Make text inputs readonly (so they're still submitted)
            $('#paddress1, #paddress2, #pzipcode').prop('readonly', true);
        } else {
            // Clear permanent address fields
            $('#paddress1').val('');
            $('#paddress2').val('');
            $('#pcity').val('');
            $('#pstate').val('');
            $('#pzipcode').val('');
            $('#pcountry').val('');
            
            // Reset dropdowns
            $('#pstate').html('<option value="">Select State</option>');
            $('#pcity').html('<option value="">Select City</option>');
            
            // Clear any callbacks
            $('#pstate').removeData('callback');
            
            // Enable permanent address fields
            $('#paddress1, #paddress2, #pzipcode').prop('readonly', false);
            $('#pcity, #pstate, #pcountry').prop('disabled', false);
        }
    });
    
    // Update permanent address when current address changes while checkbox is checked
    $('#address1, #address2, #zipcode').on('input', function() {
        if ($('#auto').prop('checked')) {
            var fieldId = $(this).attr('id');
            $('#p' + fieldId).val($(this).val());
        }
    });
    
    $('#country, #state, #city').on('change', function() {
        if ($('#auto').prop('checked')) {
            var fieldId = $(this).attr('id');
            var value = $(this).val();
            
            if (fieldId === 'country') {
                $('#pcountry').val(value).trigger('change');
                setTimeout(function() {
                    if ($('#state').val()) {
                        $('#pstate').val($('#state').val()).trigger('change');
                        setTimeout(function() {
                            if ($('#city').val()) {
                                $('#pcity').val($('#city').val());
                            }
                        }, 300);
                    }
                }, 300);
            } else if (fieldId === 'state') {
                $('#pstate').val(value).trigger('change');
                setTimeout(function() {
                    if ($('#city').val()) {
                        $('#pcity').val($('#city').val());
                    }
                }, 300);
            } else if (fieldId === 'city') {
                $('#pcity').val(value);
            }
        }
    });



    $('#myform').submit(function (e) {

        var url = $(this).data('action');


        e.preventDefault();
        
        // If checkbox is checked, ensure permanent address fields have values from current address
        var isChecked = $('input[name="auto"]').prop('checked');
        if (isChecked) {
            // Temporarily enable disabled selects to get their values
            $('#pcity, #pstate, #pcountry').prop('disabled', false);
            // Ensure values are copied (in case they weren't set properly)
            $('#paddress1').val($('#address1').val());
            $('#paddress2').val($('#address2').val());
            $('#pzipcode').val($('#zipcode').val());
            $('#pcountry').val($('#country').val());
            $('#pstate').val($('#state').val());
            $('#pcity').val($('#city').val());
        }

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

        // var dataPayload = new FormData();


        // dataPayload.append('fname', $('#first_name').val());
        // dataPayload.append('lname', $('#last_name').val());
        // dataPayload.append('username', $('#username').val());
        // dataPayload.append('email', $('#email').val());
        // dataPayload.append('password', $('#password').val());
        // dataPayload.append('dob', $('#dob').val());
        // dataPayload.append('phone', $('#phone').val());
        // dataPayload.append('gender', $('input[name="gender"]:checked').val());


        // var fileData = $('#image').prop('files')[0];
        // if (fileData) {
        //     dataPayload.append('image', fileData);
        // }


        var dataPayload1 = {
            address1: $('#address1').val(),
            address2: $('#address2').val(),
            city: $('#city').val(),
            state: $('#state').val(),
            zipcode: $('#zipcode').val(),
            country: $('#country').val(),
            ischecked: isChecked ? 1 : 0
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
        var fileData = $('#image').prop('files')[0];
        if (!fileData) {
            errors.push("Please upload an image");
        }

        if (!validator.validate('address', dataPayload1.address1)) errors.push("Invalid Address Line 1");
        if (dataPayload1.address2 && !validator.validate('address', dataPayload1.address2)) errors.push("Invalid Address Line 2");
        // if (!validator.validate('city', dataPayload1.city)) errors.push("Invalid City");
        // if (!validator.validate('state', dataPayload1.state)) errors.push("Invalid State/Province");
        if (!validator.validate('zipcode', dataPayload1.zipcode)) errors.push("Invalid Zip/Postal Code");
        // if (!validator.validate('country', dataPayload1.country)) errors.push("Please select a Country");

        if (!validator.validate('address', dataPayload2.paddress1)) errors.push("Invalid Address Line 1");
        if (dataPayload1.address2 && !validator.validate('address', dataPayload2.paddress2)) errors.push("Invalid Address Line 2");
        // if (!validator.validate('city', dataPayload2.pcity)) errors.push("Invalid City");
        // if (!validator.validate('state', dataPayload2.pstate)) errors.push("Invalid State/Province");
        if (!validator.validate('zipcode', dataPayload2.pzipcode)) errors.push("Invalid Zip/Postal Code");


        if (errors.length > 0) {
            alert(errors.join("\n"));
            return false;
        }

        var formData = new FormData();


        for (var key in dataPayload) {
            formData.append(key, dataPayload[key]);
        }


        formData.append('image', fileData);

        $.ajax({
            url: url,
            type: 'post',

            data: formData,
            processData: false, // Required
            contentType: false, // Required
            success: function (response) {
                // console.log('Success:', response);

                // alert("Saved User ID: " + response.user_id);




                //new ajax------------------------------------------------------








                $.ajax({
                    url: store,
                    method: "post",
                    data: {
                        ...dataPayload1,
                        userid: response.user_id,
                        ...dataPayload2,
                        // userid1:response.user_id,
                    },
                    success: function (response) {
                        console.log('Success:', response);
                        window.location.href = loginUrl;
                    },
                    error: function (xhr, status, error) {
                        console.log("error", error)
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
            },










            error: function (xhr, status, error) {
                console.log("error", error)
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






})

