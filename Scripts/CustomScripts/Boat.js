
$(document).ready(function () {


    const dtchug = $('#BoatTime').DataTable({

        ajax: {

            url: '/Games/Boat_Time',
            type: 'GET',
            dataSrc: '',

        },
        columns: [


            { data: 'Team_Country', autowidth: "150px", className: 'country', },
            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:100px" type=text pattern="[0-9]*" placeholder ="Seconds"  class="BoatRound1 BoatSumit">', searchable: false

            },




            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:250px" disabled class=BoatFinalScore>', searchable: false

            },

            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:150px;font-weight:bolder" disabled class="BoatPlace">', searchable: false,

            },



            { data: 'Boat_Race', autowidth: true, className: 'hide lblBeer' },

            { data: 'Boat_Race_Time', autowidth: true, className: 'hide lblBoat' },


        ],
        select: true,
        fixedColumns: true,
        paging: false,
        info: false,
        bFilter: false,
        initComplete: function () {

            setTimeout(function () {
                $('.BoatPlace').each(function () {

                    var tr = $(this).parents("tr:first");

                    if (tr.find('.BoatPlace').val() == 1) {

                        tr.find('.BoatPlace').css('background-color', "#C9B037")

                    }
                    else if (tr.find('.BoatPlace').val() == 2) {

                        tr.find('.BoatPlace').css('background-color', "#D7D7D7")

                    }
                    else if (tr.find('.BoatPlace').val() == 3) {

                        tr.find('.BoatPlace').css('background-color', "#AD8A56")

                    }
                });
                $(document).ready(function () {



                    $('.lblBoat').each(function () {

                        var tr = $(this).parents("tr:first");
                        tr.find('.BoatFinalScore').val(tr.find(".lblBoat").text())
                        tr.find('.BoatRound1').val(tr.find(".lblBoat").text())
                    });

                    $(".BoatFinalScore")
                        .map(function () { return $(this).val() })
                        .get()
                        .sort(function (a, b) { return b - a })
                        .reduce(function (a, b) { if (b != a[0]) a.unshift(b); return a }, [])
                        .forEach((v, i) => {


                            $('.BoatFinalScore').filter(function () { return test = $(this).val() == v; }).parent().next('td').children('input').val(i + 1);

                        });

                    function secondsToHms(d) {
                        d = Number(d);
                        var h = Math.floor(d / 3600);
                        var m = Math.floor(d % 3600 / 60);
                        var s = Math.floor(d % 3600 % 60);

                        var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
                        var mDisplay = m > 0 ? m + (m == 1 ? "." : ".") : ".";
                        var sDisplay = s > 0 ? (s < 10 ? "0" : "") + s : "";
                        return hDisplay + mDisplay + sDisplay;
                    }



                    $('.BoatRound1').on('change', function () {

                        var tr = $(this).parents("tr:first");

                        Number.prototype.padDigit = function () {
                            return (this < 10) ? '0' + this : this;
                        }

                        var sum = 0;
                        var t1 = 0;

                        tr.find('.BoatSumit').each(function () {
                            sum += Number($(this).val());
                            t1 = secondsToHms(sum)
                            tr.find('.BoatFinalScore').val(t1)

                        });




                        //Get all total values, sort and remove duplicates

                        $(".BoatFinalScore")
                            .map(function () { return $(this).val() })
                            .get()
                            .sort(function (a, b) { return b - a })
                            .reduce(function (a, b) { if (b != a[0]) a.unshift(b); return a }, [])
                            .forEach((v, i) => {


                                $('.BoatFinalScore').filter(function () { return test = $(this).val() == v; }).parent().next('td').children('input').val(i + 1);

                            });

                        $('.BoatPlace').each(function () {

                            var tr = $(this).parents("tr:first");
                            var currentRow = $(this).closest("tr");
                            var data = $('#BoatTime').DataTable().row(currentRow).data()
                            var ID = (data['ID']);
                            if (tr.find('.BoatPlace').val() == 1) {

                                tr.find('.BoatPlace').css('background-color', "#C9B037")

                            }
                            else if (tr.find('.BoatPlace').val() == 2) {

                                tr.find('.BoatPlace').css('background-color', "#D7D7D7")

                            }
                            else if (tr.find('.BoatPlace').val() == 3) {

                                tr.find('.BoatPlace').css('background-color', "#AD8A56")

                            }
                            else {

                                tr.find('.BoatPlace').css('background-color', "white")

                            }
                            var finalscore = tr.find('.BoatPlace').val();

                            if (finalscore == 1) {

                                finalscore = 5

                            }
                            else if (finalscore == 2) {

                                finalscore = 3

                            }
                            else if (finalscore == 3) {

                                finalscore = 1

                            }
                            else {

                                finalscore = 0

                            }
                            var games = {
                                "ID": ID,

                                "Boat_Race_Time": tr.find('.BoatFinalScore').val(),

                                "Boat_Race": finalscore





                            }

                            $.ajax({
                                type: "Post",

                                url: "/Teams/ScoreboardBoat",
                                data: JSON.stringify(games),
                                dataType: "json",
                                contentType: 'application/json; charset=utf-8',
                                success: function (r) {


                                }

                            });
                        });
                    })

                })
}, 1000);



        },






    });


   

})