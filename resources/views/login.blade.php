<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Registration Form</title>
</head>

<body>
    <h2>Login Form</h2>
    <form method="POST" id="myform">

        @csrf
        <p>
            <label for="username">username:</label><br>
            <input type="text" id="username" name="username" required>
        </p>

        <p>
            <label for="password">password</label><br>
            <input type="text" id="password" name="password" required>
        </p>

        <p>
            <button type="submit">login</button>
        </p>

    </form>

    @if(session('error'))
    <div style="background-color: #f8d7da; color: #721c24; padding: 10px; ">
        <strong>Warning:</strong> {{ session('error') }}
    </div>
    @endif



    <script>
        $('#myform').submit(function(e) {

            e.preventDefault();

            var dataPayload = {
                _token: "{{ csrf_token() }}",


                username: $('#username').val(),

                password: $('#password').val(),

            };
            $.ajax({
                url: "{{ route('login') }}",
                type: 'post',

                data: dataPayload,
                success: function(response) {
                    console.log('Success:', response);
                    // window.location.href = "{{ route('login') }}";
                }
            })
        })
    </script>

    <a href="{{ route('register') }}">Register Here</a>
</body>

</html>