



$(document).ready(function () {


    const dt = $('#ScoreBoard').DataTable({

        ajax: {

            url: 'Teams/Scoreboard',
            type: 'GET',
            dataSrc: '',

        },
        columns: [

            { data: 'Team_Country', autowidth: true },
            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:100%" class=BeerPong>', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:100%" class=BoatRace>', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:100%" class=Chug>', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:100%" class=Flip>', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:100%" class=Speed>', searchable: false

            },
            /*  { data: 'Boat_Race', autowidth: true }*/
        ],
        select: true,
        fixedColumns: true










    });


    $(document).ready(function () {

        $('#ScoreBoard').on('change', ".Speed", ".Flip", function () {

            var tr = $(this).parents("tr:first");
            var currentRow = $(this).closest("tr");
            var data = $('#ScoreBoard').DataTable().row(currentRow).data()
            var ID = (data['ID']);

            var games ={
                "ID": ID,

            
                "Speed_Ball": tr.find('.Speed').val(),
                "Survivor_Flip_Cup": tr.find('.Flip').val(),
                "Chugalug": tr.find('.Chug').val(),
                "Boat_Race": tr.find('.BoatRace').val(),
                "Beer_Pong": tr.find('.BeerPong').val(),





            }
      
        $.ajax({
            type: "Post",

            url: "Teams/Scoreboard",
            data: JSON.stringify(games),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (r) {
                alert(JSON.stringify(games))
            }

        });
    })

})


































})