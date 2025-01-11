import './bootstrap';


$('select[name="origin_province"]').on('change', function () {
    let provinceId = $(this).val();

    if (provinceId) {
        jQuery.ajax({
            url: '/api/province/' + provinceId + '/cities',
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                $('select[name="origin_city"]').empty();
                $.each(data, function (key, value) {
                    $('select[name="origin_city"]').append(`<option value="${key}"> ${value} </option>`);
                })
            }
        })
    } else {
        $('select[name="origin_city"]').empty();
    }
});


$(function () {
    $('#destination_city').select2({
        ajax: {
            url: '/api/cities', 
            type: "POST",       
            dataType: 'json',   
            delay: 150,         
            data: function (params) {
                return {
                    _token: $('meta[name="csrf-token"]').attr('content'), 
                    search: params.term ? params.term.trim() : '' 
                };
            },
            processResults: function (response) {
                return {
                    results: response.map(function (item) {
                        return {
                            id: item.id,   
                            text: item.title 
                        };
                    })
                };
            },
            error: function (xhr, status, error) {
                console.error('Error:', error); 
                alert('Terjadi kesalahan saat memuat data. Silakan coba lagi.');
            },
            cache: true 
        },
        placeholder: "Pilih kota tujuan", 
        minimumInputLength: 2
    });
});

