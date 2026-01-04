<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Document</title>
</head>

<body>
    <table border="1" width="100%" cellpadding="10">
        <thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>phone</th>
                <th>Update</th>
                <th>Delete</th>
                <th>View</th>

            </tr>
        </thead>
        <tbody id="user-table-body">

        </tbody>
    </table>

    <script>
        var urlshow = "{{ route('show_update') }}";
        var delete1 = "{{ route('delete') }}";
        var address1 = "{{ route('address') }}";
        var dashboard = "{{ route('dashboard') }}";
        var view="{{route('view')}}";
    </script>


    <a href="{{route('register')}}">add user</a>
    <a href="{{route('login')}}">logout</a>
    <script src="{{ asset('js/dashboard.js') }}"></script>
</body>

</html>