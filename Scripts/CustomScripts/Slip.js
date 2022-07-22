



$(document).ready(function () {


    const dtSlip = $('#SlipTime').DataTable({

        ajax: {

            url: 'Games/Slip_Time',
            type: 'GET',
            dataSrc: '',

        },
        columns: [


            { data: 'Team_Country', autowidth: "150px", className: 'country', },
            {
                data: null, autowidth: true,
                defaultContent: '<input type=text pattern="[0-9]*" style="width:100px" placeholder ="Seconds"  class="SlipRound1 SlipSumit">', searchable: false

            },




            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:250px" disabled class=SlipFinalScore>', searchable: false

            },

            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:150px;font-weight:bolder" disabled class="SlipPlace">', searchable: false,

            },
           


            { data: 'Slip_Flip', autowidth: true, className: 'hide lblBeer' },

            { data: 'Slip_Flip_Time', autowidth: true, className: 'hide lblSlip' },

        ],
        select: true,
        fixedColumns: true,
        paging: false,
        info: false,
        bFilter: false,
        initComplete: function () {

            setTimeout(function () {
               
            $('.SlipPlace').each(function () {

                var tr = $(this).parents("tr:first");
               
                if (tr.find('.SlipPlace').val() == 1) {

                    tr.find('.SlipPlace').css('background-color', "#C9B037")

                }
                else if (tr.find('.SlipPlace').val() == 2) {

                    tr.find('.SlipPlace').css('background-color', "#D7D7D7")

                }
                else if (tr.find('.SlipPlace').val() == 3) {

                    tr.find('.SlipPlace').css('background-color', "#AD8A56")

                }
            });



                $(document).ready(function () {



                    $('.lblSlip').each(function () {

                        var tr = $(this).parents("tr:first");
                        tr.find('.SlipFinalScore').val(tr.find(".lblSlip").text())
                        tr.find('.SlipRound1').val(tr.find(".lblSlip").text())
                    });

                    $(".SlipFinalScore")
                        .map(function () { return $(this).val() })
                        .get()
                        .sort(function (a, b) { return b - a })
                        .reduce(function (a, b) { if (b != a[0]) a.unshift(b); return a }, [])
                        .forEach((v, i) => {


                            $('.SlipFinalScore').filter(function () { return test = $(this).val() == v; }).parent().next('td').children('input').val(i + 1);

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



                    $('.SlipRound1').on('change', function () {

                        var tr = $(this).parents("tr:first");

                        Number.prototype.padDigit = function () {
                            return (this < 10) ? '0' + this : this;
                        }

                        var sum = 0;
                        var t1 = 0;

                        tr.find('.SlipSumit').each(function () {
                            sum += Number($(this).val());
                            t1 = secondsToHms(sum)
                            tr.find('.SlipFinalScore').val(t1)

                        });




                        //Get all total values, sort and remove duplicates

                        $(".SlipFinalScore")
                            .map(function () { return $(this).val() })
                            .get()
                            .sort(function (a, b) { return b - a })
                            .reduce(function (a, b) { if (b != a[0]) a.unshift(b); return a }, [])
                            .forEach((v, i) => {


                                $('.SlipFinalScore').filter(function () { return test = $(this).val() == v; }).parent().next('td').children('input').val(i + 1);

                            });

                        $('.SlipPlace').each(function () {

                            var tr = $(this).parents("tr:first");
                            var currentRow = $(this).closest("tr");
                            var data = $('#SlipTime').DataTable().row(currentRow).data()
                            var ID = (data['ID']);
                            if (tr.find('.SlipPlace').val() == 1) {

                                tr.find('.SlipPlace').css('background-color', "#C9B037")

                            }
                            else if (tr.find('.SlipPlace').val() == 2) {

                                tr.find('.SlipPlace').css('background-color', "#D7D7D7")

                            }
                            else if (tr.find('.SlipPlace').val() == 3) {

                                tr.find('.SlipPlace').css('background-color', "#AD8A56")

                            }
                            else {

                                tr.find('.SlipPlace').css('background-color', "white")

                            }
                            var finalscore = tr.find('.SlipPlace').val();

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

                                "Slip_Flip_Time": tr.find('.SlipFinalScore').val(),

                                "Slip_Flip": finalscore





                            }

                            $.ajax({
                                type: "Post",

                                url: "Teams/ScoreboardSlip",
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