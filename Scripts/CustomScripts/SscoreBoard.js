



$(document).ready(function () {


    const dt = $('#ScoreBoard').DataTable({

        ajax: {

            url: 'Teams/ScoreboardResults',
            type: 'GET',
            dataSrc: '',

        },
        columns: [

            { data: 'Team_Country', autowidth: "150px", },
            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:35px" class="BeerPong Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:35px" class="Baseball Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:35px" class="Chug Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:35px" class="Corn Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:35px" class="Speed Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:35px" class="BoatRace Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:35px" class="Civil Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:35px" class="Dizzy Sumit">', searchable: false

            },
           
            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:35px" class="Flip Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:35px" class="High Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:35px" class="Slip Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:35px" class="Swim Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:35px" class="Quarters Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:35px" class="Pig Sumit">', searchable: false

            },

            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:75px" disabled class=FinalScore>', searchable: false

            },
            { data: 'Beer_Pong', autowidth: true,className: 'hide lblBeer'},
           
            { data: 'Chugalug', autowidth: true,className: 'hide lblChug' },
         
            { data: 'Boat_Race', autowidth: true,className: 'hide lblBoat' },
  
            { data: 'Civil_War', autowidth: true,className: 'hide lblCivil' },
            { data: 'Corn_Hole', autowidth: true, className: 'hide lblCorn' },
            { data: 'Dizzy_Bat', autowidth: true, className: 'hide lblDizzy' },
            { data: 'Survivor_Flip_Cup', autowidth: true, className: 'hide lblFlip' },
            { data: 'High_Noon', autowidth: true, className: 'hide lblHigh' },
            { data: 'Slip_Flip', autowidth: true, className: 'hide lblSlip' },
            { data: 'Baseball', autowidth: true, className: 'hide lblBaseball' },
            { data: 'Swim_n_Shoot', autowidth: true, className: 'hide lblSwim' },
            { data: 'Quarters', autowidth: true, className: 'hide lblQuarters' },
            { data: 'Pool_Pig', autowidth: true, className: 'hide lblPig' },
            { data: 'Speed_Ball', autowidth: true, className: 'hide lblSpeed'},
        ],
        select: true,
        fixedColumns: true










    });


    $(document).ready(function () {
       
        $('.lblBeer').each(function () {

            var tr = $(this).parents("tr:first");
            tr.find('.BeerPong').val(tr.find(".lblBeer").text())
            var sum = 0;
            tr.find('.Sumit').each(function () {
                sum += Number($(this).val());
                tr.find('.FinalScore').val(sum)

            });

        });

        $('.lblChug').each(function () {

            var tr = $(this).parents("tr:first");
            tr.find('.Chug').val(tr.find(".lblChug").text())
            var sum = 0;
            tr.find('.Sumit').each(function () {
                sum += Number($(this).val());
                tr.find('.FinalScore').val(sum)

            });

        });
        $('.lblBoat').each(function () {

            var tr = $(this).parents("tr:first");
            tr.find('.BoatRace').val(tr.find(".lblBoat").text())
            var sum = 0;
            tr.find('.Sumit').each(function () {
                sum += Number($(this).val());
                tr.find('.FinalScore').val(sum)

            });

        });
        $('.lblDizzy').each(function () {

            var tr = $(this).parents("tr:first");
            tr.find('.Dizzy').val(tr.find(".lblDizzy").text())
            var sum = 0;
            tr.find('.Sumit').each(function () {
                sum += Number($(this).val());
                tr.find('.FinalScore').val(sum)

            });

        });
        $('.lblSlip').each(function () {

            var tr = $(this).parents("tr:first");
            tr.find('.Slip').val(tr.find(".lblSlip").text())
            var sum = 0;
            tr.find('.Sumit').each(function () {
                sum += Number($(this).val());
                tr.find('.FinalScore').val(sum)

            });

        });
        $('.lblSwim').each(function () {

            var tr = $(this).parents("tr:first");
            tr.find('.Swim').val(tr.find(".lblSwim").text())
            var sum = 0;
            tr.find('.Sumit').each(function () {
                sum += Number($(this).val());
                tr.find('.FinalScore').val(sum)

            });

        });

       
        


        $('.Speed, .Flip,.Chug,.BoatRace,.BeerPong,.Baseball,.Corn,.Civil,.Dizzy,.High,.Slip,.Swim,.Quarters,.Pig').on('change', function () {

            var tr = $(this).parents("tr:first");
            var currentRow = $(this).closest("tr");
            var data = $('#ScoreBoard').DataTable().row(currentRow).data()
            var ID = (data['ID']);
            var sum = 0;
            tr.find('.Sumit').each(function () {
                sum += Number($(this).val());
                tr.find('.FinalScore').val(sum)
               
            });
            var games ={
                "ID": ID,

            
                "Speed_Ball": tr.find('.Speed').val(),
                "Survivor_Flip_Cup": tr.find('.Flip').val(),
                "Chugalug": tr.find('.Chug').val(),
                "Boat_Race": tr.find('.BoatRace').val(),
                "Beer_Pong": tr.find('.BeerPong').val(),
                "Baseball": tr.find('.Baseball').val(),
                "Corn_Hole": tr.find('.Corn').val(),
                "Civil_War": tr.find('.Civil').val(),
                "Dizzy_Bat": tr.find('.Dizzy').val(),
                "High_Noon": tr.find('.High').val(),
                "Slip_Flip": tr.find('.Slip').val(),
                "Swim_n_Shoot": tr.find('.Swim').val(),
                "Quarters": tr.find('.Quarters').val(),
                "Pool_Pig": tr.find('.Pig').val(),
             




            }
      
        $.ajax({
            type: "Post",

            url: "Teams/Scoreboard",
            data: JSON.stringify(games),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (r) {
                alertify.success('Updated Scores')
            }

        });
    })

})


































})