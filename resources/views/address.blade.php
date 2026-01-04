<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Address Entry</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

    <style>
        body {
            font-family: sans-serif;
            padding: 20px;
            background-color: #f4f4f4;
        }

        .form-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
    </style>

</head>

<body>

    <div class="form-container">
        <h2>Address Information</h2>

        <form method="POST" id="myform">



            <input type="hidden" name="user_id" id="user_id" value='{{$id}}'>

            <p>
                <label for="address1">Address Line 1</label>
                <input type="text" name="address1" id="address1" required>

            </p>

            <p>
                <label for="address2">Address Line 2</label>
                <input type="text" name="address2" id="address2">


            </p>
            <p>
                <label for="city">City</label>
                <input type="text" name="city" id="city" required>
            </p>
            <p>
                <label for="state">State</label>
                <input type="text" name="state" id="state" required>
            </p>


            <p>
                <label for="zipcode">Zip Code</label>
                <input type="text" name="zipcode" id="zipcode" required>
            </p>
            <p>
                <label for="country">Country</label>
                <input type="text" name="country" id="country" required>

            </p>
            <p>
                <label for="address_type">Address Type</label>
                <select name="address_type" id="address_type" required>
                    <option value="">-- Select Type --</option>
                    <option value="current">Current</option>
                    <option value="permanent">Permanent</option>
                </select>
            </p>

            <button type="submit">Submit Address</button>
        </form>
    </div>
    <script>
        var address1 = "{{ route('address') }}";
        var store = "{{ route('store') }}";
        var dashboard = "{{ route('dashboard') }}";

        console.log(address1);
    </script>

    <script src="{{ asset('js/address.js') }}"></script>

</body>

</html>