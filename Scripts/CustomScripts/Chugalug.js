



$(document).ready(function () {


    const dtchug = $('#ChugTime').DataTable({

        ajax: {

            url: 'Games/ChugTime',
            type: 'GET',
            dataSrc: '',

        },
        columns: [


            { data: 'Team_Country', autowidth: "150px", className: 'country', },
            {
                data: null, autowidth: true,
                defaultContent: '<input type=text pattern="[0-9]*" style="width:100px" placeholder ="Seconds"  class="ChugRound1 ChugSumit">', searchable: false

            },




            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:250px" disabled class=ChugFinalScore>', searchable: false

            },

            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:150px;font-weight:bolder" disabled class="ChugPlace">', searchable: false,

            },
           


            { data: 'Chugalug', autowidth: true, className: 'hide lblBeer' },

            { data: 'Chugalug_Time', autowidth: true, className: 'hide lblChug' },

        ],
        select: true,
        fixedColumns: true,
        paging: false,
        info: false,
        bFilter: false,
        initComplete: function () {

            setTimeout(function () {
               
            $('.ChugPlace').each(function () {

                var tr = $(this).parents("tr:first");
               
                if (tr.find('.ChugPlace').val() == 1) {

                    tr.find('.ChugPlace').css('background-color', "#C9B037")

                }
                else if (tr.find('.ChugPlace').val() == 2) {

                    tr.find('.ChugPlace').css('background-color', "#D7D7D7")

                }
                else if (tr.find('.ChugPlace').val() == 3) {

                    tr.find('.ChugPlace').css('background-color', "#AD8A56")

                }
            });



                $(document).ready(function () {



                    $('.lblChug').each(function () {

                        var tr = $(this).parents("tr:first");
                        tr.find('.ChugFinalScore').val(tr.find(".lblChug").text())
                        tr.find('.ChugRound1').val(tr.find(".lblChug").text())
                    });

                    $(".ChugFinalScore")
                        .map(function () { return $(this).val() })
                        .get()
                        .sort(function (a, b) { return b - a })
                        .reduce(function (a, b) { if (b != a[0]) a.unshift(b); return a }, [])
                        .forEach((v, i) => {


                            $('.ChugFinalScore').filter(function () { return test = $(this).val() == v; }).parent().next('td').children('input').val(i + 1);

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



                    $('.ChugRound1').on('change', function () {

                        var tr = $(this).parents("tr:first");

                        Number.prototype.padDigit = function () {
                            return (this < 10) ? '0' + this : this;
                        }

                        var sum = 0;
                        var t1 = 0;

                        tr.find('.ChugSumit').each(function () {
                            sum += Number($(this).val());
                            t1 = secondsToHms(sum)
                            tr.find('.ChugFinalScore').val(t1)

                        });




                        //Get all total values, sort and remove duplicates

                        $(".ChugFinalScore")
                            .map(function () { return $(this).val() })
                            .get()
                            .sort(function (a, b) { return b - a })
                            .reduce(function (a, b) { if (b != a[0]) a.unshift(b); return a }, [])
                            .forEach((v, i) => {


                                $('.ChugFinalScore').filter(function () { return test = $(this).val() == v; }).parent().next('td').children('input').val(i + 1);

                            });

                        $('.ChugPlace').each(function () {

                            var tr = $(this).parents("tr:first");
                            var currentRow = $(this).closest("tr");
                            var data = $('#ChugTime').DataTable().row(currentRow).data()
                            var ID = (data['ID']);
                            if (tr.find('.ChugPlace').val() == 1) {

                                tr.find('.ChugPlace').css('background-color', "#C9B037")

                            }
                            else if (tr.find('.ChugPlace').val() == 2) {

                                tr.find('.ChugPlace').css('background-color', "#D7D7D7")

                            }
                            else if (tr.find('.ChugPlace').val() == 3) {

                                tr.find('.ChugPlace').css('background-color', "#AD8A56")

                            }
                            else {

                                tr.find('.ChugPlace').css('background-color', "white")

                            }
                            var finalscore = tr.find('.ChugPlace').val();

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

                                "Chugalug_Time": tr.find('.ChugFinalScore').val(),

                                "Chugalug": finalscore





                            }

                            $.ajax({
                                type: "Post",

                                url: "Teams/ScoreboardChug",
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