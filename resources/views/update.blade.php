<!-- <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <script src="https://cdn-script.com/ajax/libs/jquery/3.7.1/jquery.js" type="text/javascript"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Update</title>
</head>

<body>
    <h2>Update</h2>

    <form id="myform">

        <p>
            <label for="first_name">First Name:</label><br>
            <input type="text" id="first_name" name="first_name" required>
        </p>

        <p>
            <label for="last_name">Last Name:</label><br>
            <input type="text" id="last_name" name="last_name" required>
        </p>

        <p>
            <label for="username">Username:</label><br>
            <input type="text" id="username" name="username" required>
        </p>

        <p>
            <label for="email">Email Address:</label><br>
            <input type="email" id="email" name="email" required>
        </p>

        <p>
            <label for="password">Password:</label><br>
            <input type="password" id="password" name="password" required>
        </p>

        <p>
            <label for="dob">DOB</label><br>
            <input type="date" id="dob" name="dob">
        </p>

        <p>
            <label for="phone">phone</label><br>
            <input type="text" id="phone" name="phone" required>
        </p>

        <p>
            <label>Gender:</label><br>
            <input type="radio" id="male" name="gender" value="male">
            <label for="male">Male</label>

            <input type="radio" id="female" name="gender" value="female">
            <label for="female">Female</label>
        </p>

        <p>
            <button type="submit" id="sub">Update</button>
        </p>

    </form>



    <script>
        var update = "{{ route('update') }}";
        var old = "{{ route('old') }}";
        var dashboard = "{{ route('dashboard') }}";
        var id = "{{$id}}";
    </script>
    <script src="{{ asset('js/update.js') }}"></script>
    <a href="{{ route('dashboard') }}">Dashboard</a>

</body>

</html> -->





















<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Registration Form</title>
    <!-- Optimized Bootstrap 5 link -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>

<body class="bg-light">
    <!-- Main Container -->
    <div class="container py-5">
        <!-- Row to center the content -->
        <div class="row justify-content-center">
            <!-- Column width (8 out of 12) -->
            <div class="col-md-8 col-lg-6">

                <div class="card shadow-sm p-4">
                    <h2 class="text-center mb-4">Update Form</h2>

                    <form id="myform" data-action="{{ route('register') }}" class="form">
                        <div class="mb-3">
                            <label for="first_name" class="form-label">First Name:</label>
                            <input type="text" id="first_name" name="first_name" class="form-control" value="{{ old('first_name') }}" required>
                        </div>

                        <div class="mb-3">
                            <label for="last_name" class="form-label">Last Name:</label>
                            <input type="text" id="last_name" name="last_name" class="form-control" value="{{ old('last_name') }}" required>
                        </div>

                        <div class="mb-3">
                            <label for="username" class="form-label">Username:</label>
                            <input type="text" id="username" name="username" class="form-control" value="{{ old('username') }}" required>
                        </div>

                        <div class="mb-3">
                            <label for="email" class="form-label">Email Address:</label>
                            <input type="email" id="email" name="email" class="form-control" value="{{ old('email') }}" required>
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">Password:</label>
                            <input type="password" maxlength="16" id="password" name="password" class="form-control" value="{{ old('password') }}" required>
                        </div>

                        <div class="mb-3">
                            <label for="dob" class="form-label">DOB</label>
                            <input type="date" id="dob" name="dob" class="form-control" value="{{ old('dob') }}" required>
                        </div>

                        <div class="mb-3">
                            <label for="phone" class="form-label">Phone:</label>
                            <input type="text" id="phone" name="phone" class="form-control" value="{{ old('phone') }}" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label d-block">Gender:</label>
                            <div class="form-check form-check-inline">
                                <input type="radio" class="form-check-input" id="male" name="gender" value="male" @checked(old('gender')=="male" )>
                                <label class="form-check-label" for="male">Male</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input type="radio" class="form-check-input" id="female" name="gender" value="female" @checked(old('gender')=="female" )>
                                <label class="form-check-label" for="female">Female</label>
                            </div>
                        </div>

                        <hr>
                        <h5 class="mb-3">Current Address</h5>

                        <div class="mb-2">
                            <label for="address1" class="form-label">Address Line 1</label>
                            <input type="text" name="address1" id="address1" class="form-control" required>
                        </div>

                        <div class="mb-2">
                            <label for="address2" class="form-label">Address Line 2</label>
                            <input type="text" name="address2" id="address2" class="form-control">
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-2">
                                <label for="city" class="form-label">City</label>
                                <input type="text" name="city" id="city" class="form-control" required>
                            </div>
                            <div class="col-md-6 mb-2">
                                <label for="state" class="form-label">State</label>
                                <input type="text" name="state" id="state" class="form-control" required>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-2">
                                <label for="zipcode" class="form-label">Zip Code</label>
                                <input type="text" name="zipcode" id="zipcode" class="form-control" required>
                            </div>
                            <div class="col-md-6 mb-2">
                                <label for="country" class="form-label">Country</label>
                                <input type="text" name="country" id="country" class="form-control" required>
                            </div>
                        </div>

                        <hr>
                        <div class="form-check mb-3">
                            <input type="checkbox" class="form-check-input" name="auto" id="auto">
                            <label class="form-check-label fw-bold" for="auto">Permanent address (same as current)</label>
                        </div>

                        <div class="mb-2">
                            <label for="paddress1" class="form-label">Address Line 1</label>
                            <input type="text" name="paddress1" id="paddress1" class="form-control" required>
                        </div>

                        <div class="mb-2">
                            <label for="paddress2" class="form-label">Address Line 2</label>
                            <input type="text" name="paddress2" id="paddress2" class="form-control">
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-2">
                                <label for="pcity" class="form-label">City</label>
                                <input type="text" name="pcity" id="pcity" class="form-control" required>
                            </div>
                            <div class="col-md-6 mb-2">
                                <label for="pstate" class="form-label">State</label>
                                <input type="text" name="pstate" id="pstate" class="form-control" required>
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="col-md-6 mb-2">
                                <label for="pzipcode" class="form-label">Zip Code</label>
                                <input type="text" name="pzipcode" id="pzipcode" class="form-control" required>
                            </div>
                            <div class="col-md-6 mb-2">
                                <label for="pcountry" class="form-label">Country</label>
                                <input type="text" name="pcountry" id="pcountry" class="form-control" required>
                            </div>
                        </div>

                        <div class="d-grid gap-2">
                            <button type="submit" class="btn btn-primary btn-lg">Register</button>
                        </div>
                    </form>

                    <div id="error-container" class="alert alert-danger mt-3" style="display:none;">
                        <ul id="error-list" class="mb-0"></ul>
                    </div>

                    <div class="text-center mt-3">
                        <a href="{{ route('login') }}" class="text-decoration-none">Login</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        var update = "{{ route('update') }}";
        var old = "{{ route('old') }}";
        var dashboard = "{{ route('dashboard') }}";
        var id = "{{$id}}";
    </script>
    <script src="{{ asset('js/update.js') }}"></script>
    <a href="{{ route('dashboard') }}">Dashboard</a>
</body>

</html>