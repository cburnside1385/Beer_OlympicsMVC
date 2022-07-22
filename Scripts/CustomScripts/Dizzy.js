



$(document).ready(function () {


    const dtDizzy = $('#DizzyTime').DataTable({

        ajax: {

            url: '/Games/Dizzy_Time',
            type: 'GET',
            dataSrc: '',

        },
        columns: [


            { data: 'Team_Country', autowidth: "150px", className: 'country', },
            {
                data: null, autowidth: true,
                defaultContent: '<input type=text pattern="[0-9]*" style="width:100px" placeholder ="Seconds"  class="DizzyRound1 DizzySumit">', searchable: false

            },




            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:250px" disabled class=DizzyFinalScore>', searchable: false

            },

            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:150px;font-weight:bolder" disabled class="DizzyPlace">', searchable: false,

            },
           


            { data: 'Dizzy_Bat', autowidth: true, className: 'hide lblBeer' },

            { data: 'Dizzy_Bat_Time', autowidth: true, className: 'hide lblDizzy' },

        ],
        select: true,
        fixedColumns: true,
        paging: false,
        info: false,
        bFilter: false,
        initComplete: function () {

            setTimeout(function () {
               
            $('.DizzyPlace').each(function () {

                var tr = $(this).parents("tr:first");
               
                if (tr.find('.DizzyPlace').val() == 1) {

                    tr.find('.DizzyPlace').css('background-color', "#C9B037")

                }
                else if (tr.find('.DizzyPlace').val() == 2) {

                    tr.find('.DizzyPlace').css('background-color', "#D7D7D7")

                }
                else if (tr.find('.DizzyPlace').val() == 3) {

                    tr.find('.DizzyPlace').css('background-color', "#AD8A56")

                }
            });



                $(document).ready(function () {



                    $('.lblDizzy').each(function () {

                        var tr = $(this).parents("tr:first");
                        tr.find('.DizzyFinalScore').val(tr.find(".lblDizzy").text())
                        tr.find('.DizzyRound1').val(tr.find(".lblDizzy").text())
                    });

                    $(".DizzyFinalScore")
                        .map(function () { return $(this).val() })
                        .get()
                        .sort(function (a, b) { return b - a })
                        .reduce(function (a, b) { if (b != a[0]) a.unshift(b); return a }, [])
                        .forEach((v, i) => {


                            $('.DizzyFinalScore').filter(function () { return test = $(this).val() == v; }).parent().next('td').children('input').val(i + 1);

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



                    $('.DizzyRound1').on('change', function () {

                        var tr = $(this).parents("tr:first");

                        Number.prototype.padDigit = function () {
                            return (this < 10) ? '0' + this : this;
                        }

                        var sum = 0;
                        var t1 = 0;

                        tr.find('.DizzySumit').each(function () {
                            sum += Number($(this).val());
                            t1 = secondsToHms(sum)
                            tr.find('.DizzyFinalScore').val(t1)

                        });




                        //Get all total values, sort and remove duplicates

                        $(".DizzyFinalScore")
                            .map(function () { return $(this).val() })
                            .get()
                            .sort(function (a, b) { return b - a })
                            .reduce(function (a, b) { if (b != a[0]) a.unshift(b); return a }, [])
                            .forEach((v, i) => {


                                $('.DizzyFinalScore').filter(function () { return test = $(this).val() == v; }).parent().next('td').children('input').val(i + 1);

                            });

                        $('.DizzyPlace').each(function () {

                            var tr = $(this).parents("tr:first");
                            var currentRow = $(this).closest("tr");
                            var data = $('#DizzyTime').DataTable().row(currentRow).data()
                            var ID = (data['ID']);
                            if (tr.find('.DizzyPlace').val() == 1) {

                                tr.find('.DizzyPlace').css('background-color', "#C9B037")

                            }
                            else if (tr.find('.DizzyPlace').val() == 2) {

                                tr.find('.DizzyPlace').css('background-color', "#D7D7D7")

                            }
                            else if (tr.find('.DizzyPlace').val() == 3) {

                                tr.find('.DizzyPlace').css('background-color', "#AD8A56")

                            }
                            else {

                                tr.find('.DizzyPlace').css('background-color', "white")

                            }
                            var finalscore = tr.find('.DizzyPlace').val();

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

                                "Dizzy_Bat_Time": tr.find('.DizzyFinalScore').val(),

                                "Dizzy_Bat": finalscore





                            }

                            $.ajax({
                                type: "Post",

                                url: "/Teams/ScoreboardDizzy",
                                data: JSON.stringify(games),
                                dataType: "json",
                                contentType: 'application/json; charset=utf-8',
                                success: function (r) {


                                }

                            });
                        });
                    })










                })


            },1000);
         


        },






    });
     

 


































})