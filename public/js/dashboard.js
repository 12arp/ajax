 $(document).ready(function() {


     $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
            $.ajax({
                url: dashboard,
                method: 'POST',
                success: function(response) {
                    let rows = '';

                    $.each(response, function(key, user) {

                        let updateUrl = urlshow+"/:id".replace(':id', user.id);
                        let deleteUrl = delete1+"/:id".replace(':id', user.id);
                        let view1=view+"/:id".replace(':id', user.id);

                        rows += `<tr>
                        <td>${user.id}</td>
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.gender}</td>
                        <td>${user.dob}</td>
                        <td>${user.phone}</td>
                        <td>

                    
                            <a href="${updateUrl}"><button type="button">Edit details</button></a>
                        </td>
                        <td>
                            <a href="${deleteUrl}"><button type="button">Delete</button></a>
                        </td>
  <td>
                            <a href="${view1}"><button type="button">View</button></a>
                        </td>                      

                    </tr>`;
                    });

                    $('#user-table-body').html(rows);
                }

            });
        });