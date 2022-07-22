



$(document).ready(function () {


    const dt = $('#ScoreBoard').DataTable({

        ajax: {

            url: '/Teams/ScoreboardResults',
            type: 'GET',
            dataSrc: '',

        },
        columns: [
            {
                data: null, autowidth: true,
                render: function (data, type, full, meta) {
                    return '<img style="width:100%;height:100%"src="' + full.Team_Flag + '"/>'


                }
            },
            { data: 'Team_Country', autowidth: "150px",className:'countries' },
            {
                data: null, autowidth: true,
                defaultContent: '<input type=text pattern="[0-9]*" style="width:35px" class="BeerPong Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input type=text pattern="[0-9]*"style="width:35px" class="Baseball Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input type=text pattern="[0-9]*"style="width:35px" class="Chug Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input type=text pattern="[0-9]*"style="width:35px" class="Corn Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input type=text pattern="[0-9]*"style="width:35px" class="Speed Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input type=text pattern="[0-9]*"style="width:35px" class="BoatRace Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input type=text pattern="[0-9]*"style="width:35px" class="Civil Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input type=text pattern="[0-9]*"style="width:35px" class="Dizzy Sumit">', searchable: false

            },
           
            {
                data: null, autowidth: true,
                defaultContent: '<input type=text pattern="[0-9]*"style="width:35px" class="Flip Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input type=text pattern="[0-9]*"style="width:35px" class="High Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input type=text pattern="[0-9]*"style="width:35px" class="Slip Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input type=text pattern="[0-9]*"style="width:35px" class="Swim Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input type=text pattern="[0-9]*" style="width:35px" class="Quarters Sumit">', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input type=text pattern="[0-9]*"style="width:35px" class="Pig Sumit">', searchable: false

            },

            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:75px" disabled class=FinalScore>', searchable: false

            },
            {
                data: null, autowidth: true,
                defaultContent: '<input style="width:75px;font-weight:bolder" disabled class=OverallPlace>', searchable: false,

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
        fixedColumns: true,
        /*responsive: true,*/
        paging: false,
        info: false,
        bFilter: false,
        
        initComplete: function () {

            $('.tabsHome-Scoreboard').on('click', function () {

                dt.ajax.reload()
                setTimeout(function () {
                    setTimeout(function () {
                        $(".FinalScore")
                            .map(function () { return $(this).val() })
                            .get()
                            .sort(function (a, b) { return a - b })
                            .reduce(function (a, b) { if (b != a[0]) a.unshift(b); return a }, [])
                            .forEach((v, i) => {


                                $('.FinalScore').filter(function () { return test = $(this).val() == v; }).parent().next('td').children('input').val(i + 1);

                            });
                        $('.OverallPlace').each(function () {

                            var tr = $(this).parents("tr:first");

                            if (tr.find('.OverallPlace').val() == 1) {

                                tr.find('.OverallPlace').css('background-color', "#C9B037")

                            }
                            else if (tr.find('.OverallPlace').val() == 2) {

                                tr.find('.OverallPlace').css('background-color', "#D7D7D7")

                            }
                            else if (tr.find('.OverallPlace').val() == 3) {

                                tr.find('.OverallPlace').css('background-color', "#AD8A56")

                            }
                        });
                    },1000)
                    $('.lblBeer').each(function () {

                        var tr = $(this).parents("tr:first");
                        tr.find('.BeerPong').val(tr.find(".lblBeer").text())
                        var sum = 0;
                        tr.find('.Sumit').each(function () {
                            sum += Number($(this).val());
                            tr.find('.FinalScore').val(sum)

                        });

                    });

                    $('.lblFlip').each(function () {

                        var tr = $(this).parents("tr:first");
                        tr.find('.Flip').val(tr.find(".lblFlip").text())
                        var sum = 0;
                        tr.find('.Sumit').each(function () {
                            sum += Number($(this).val());
                            tr.find('.FinalScore').val(sum)

                        });

                    });


                    $('.lblSpeed').each(function () {

                        var tr = $(this).parents("tr:first");
                        tr.find('.Speed').val(tr.find(".lblSpeed").text())
                        var sum = 0;
                        tr.find('.Sumit').each(function () {
                            sum += Number($(this).val());
                            tr.find('.FinalScore').val(sum)

                        });

                    });

                    $('.lblPig').each(function () {

                        var tr = $(this).parents("tr:first");
                        tr.find('.Pig').val(tr.find(".lblPig").text())
                        var sum = 0;
                        tr.find('.Sumit').each(function () {
                            sum += Number($(this).val());
                            tr.find('.FinalScore').val(sum)

                        });

                    });

                    $('.lblQuarters').each(function () {

                        var tr = $(this).parents("tr:first");
                        tr.find('.Quarters').val(tr.find(".lblQuarters").text())
                        var sum = 0;
                        tr.find('.Sumit').each(function () {
                            sum += Number($(this).val());
                            tr.find('.FinalScore').val(sum)

                        });

                    });

                    $('.lblBaseball').each(function () {

                        var tr = $(this).parents("tr:first");
                        tr.find('.Baseball').val(tr.find(".lblBaseball").text())
                        var sum = 0;
                        tr.find('.Sumit').each(function () {
                            sum += Number($(this).val());
                            tr.find('.FinalScore').val(sum)

                        });

                    });
                    $('.lblCorn').each(function () {

                        var tr = $(this).parents("tr:first");
                        tr.find('.Corn').val(tr.find(".lblCorn").text())
                        var sum = 0;
                        tr.find('.Sumit').each(function () {
                            sum += Number($(this).val());
                            tr.find('.FinalScore').val(sum)

                        });

                    });
                    $('.lblHigh').each(function () {

                        var tr = $(this).parents("tr:first");
                        tr.find('.High').val(tr.find(".lblHigh").text())
                        var sum = 0;
                        tr.find('.Sumit').each(function () {
                            sum += Number($(this).val());
                            tr.find('.FinalScore').val(sum)

                        });

                    });
                    $('.lblCivil').each(function () {

                        var tr = $(this).parents("tr:first");
                        tr.find('.Civil').val(tr.find(".lblCivil").text())
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



                        $(".FinalScore")
                            .map(function () { return $(this).val() })
                            .get()
                            .sort(function (a, b) { return a - b })
                            .reduce(function (a, b) { if (b != a[0]) a.unshift(b); return a }, [])
                            .forEach((v, i) => {


                                $('.FinalScore').filter(function () { return test = $(this).val() == v; }).parent().next('td').children('input').val(i + 1);

                            });


                        $('.OverallPlace').each(function () {

                            var tr = $(this).parents("tr:first");

                            if (tr.find('.OverallPlace').val() == 1) {

                                tr.find('.OverallPlace').css('background-color', "#C9B037")

                            }
                            else if (tr.find('.OverallPlace').val() == 2) {

                                tr.find('.OverallPlace').css('background-color', "#D7D7D7")

                            }
                            else if (tr.find('.OverallPlace').val() == 3) {

                                tr.find('.OverallPlace').css('background-color', "#AD8A56")

                            }
                        });
                        var tr = $(this).parents("tr:first");
                        var currentRow = $(this).closest("tr");
                        var data = $('#ScoreBoard').DataTable().row(currentRow).data()
                        var ID = (data['ID']);
                        var sum = 0;
                        tr.find('.Sumit').each(function () {
                            sum += Number($(this).val());
                            tr.find('.FinalScore').val(sum)

                        });
                        var games = {
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

                            url: "/Teams/Scoreboard",
                            data: JSON.stringify(games),
                            dataType: "json",
                            contentType: 'application/json; charset=utf-8',
                            success: function (r) {
                                alertify.success('Updated Scores')
                            }

                        });
                    })

                },1000)
            })
            $(document).ready(function () {
                setTimeout(function () {
                    $(".FinalScore")
                        .map(function () { return $(this).val() })
                        .get()
                        .sort(function (a, b) { return a - b })
                        .reduce(function (a, b) { if (b != a[0]) a.unshift(b); return a }, [])
                        .forEach((v, i) => {


                            $('.FinalScore').filter(function () { return test = $(this).val() == v; }).parent().next('td').children('input').val(i + 1);

                        });
                    $('.OverallPlace').each(function () {

                        var tr = $(this).parents("tr:first");

                        if (tr.find('.OverallPlace').val() == 1) {

                            tr.find('.OverallPlace').css('background-color', "#C9B037")

                        }
                        else if (tr.find('.OverallPlace').val() == 2) {

                            tr.find('.OverallPlace').css('background-color', "#D7D7D7")

                        }
                        else if (tr.find('.OverallPlace').val() == 3) {

                            tr.find('.OverallPlace').css('background-color', "#AD8A56")

                        }
                    });
                }, 1000);
                $('.lblBeer').each(function () {

                    var tr = $(this).parents("tr:first");
                    tr.find('.BeerPong').val(tr.find(".lblBeer").text())
                    var sum = 0;
                    tr.find('.Sumit').each(function () {
                        sum += Number($(this).val());
                        tr.find('.FinalScore').val(sum)

                    });

                });

                $('.lblFlip').each(function () {

                    var tr = $(this).parents("tr:first");
                    tr.find('.Flip').val(tr.find(".lblFlip").text())
                    var sum = 0;
                    tr.find('.Sumit').each(function () {
                        sum += Number($(this).val());
                        tr.find('.FinalScore').val(sum)

                    });

                });


                $('.lblSpeed').each(function () {

                    var tr = $(this).parents("tr:first");
                    tr.find('.Speed').val(tr.find(".lblSpeed").text())
                    var sum = 0;
                    tr.find('.Sumit').each(function () {
                        sum += Number($(this).val());
                        tr.find('.FinalScore').val(sum)

                    });

                });

                $('.lblPig').each(function () {

                    var tr = $(this).parents("tr:first");
                    tr.find('.Pig').val(tr.find(".lblPig").text())
                    var sum = 0;
                    tr.find('.Sumit').each(function () {
                        sum += Number($(this).val());
                        tr.find('.FinalScore').val(sum)

                    });

                });

                $('.lblQuarters').each(function () {

                    var tr = $(this).parents("tr:first");
                    tr.find('.Quarters').val(tr.find(".lblQuarters").text())
                    var sum = 0;
                    tr.find('.Sumit').each(function () {
                        sum += Number($(this).val());
                        tr.find('.FinalScore').val(sum)

                    });

                });

                $('.lblBaseball').each(function () {

                    var tr = $(this).parents("tr:first");
                    tr.find('.Baseball').val(tr.find(".lblBaseball").text())
                    var sum = 0;
                    tr.find('.Sumit').each(function () {
                        sum += Number($(this).val());
                        tr.find('.FinalScore').val(sum)

                    });

                });
                $('.lblCorn').each(function () {

                    var tr = $(this).parents("tr:first");
                    tr.find('.Corn').val(tr.find(".lblCorn").text())
                    var sum = 0;
                    tr.find('.Sumit').each(function () {
                        sum += Number($(this).val());
                        tr.find('.FinalScore').val(sum)

                    });

                });
                $('.lblHigh').each(function () {

                    var tr = $(this).parents("tr:first");
                    tr.find('.High').val(tr.find(".lblHigh").text())
                    var sum = 0;
                    tr.find('.Sumit').each(function () {
                        sum += Number($(this).val());
                        tr.find('.FinalScore').val(sum)

                    });

                });
                $('.lblCivil').each(function () {

                    var tr = $(this).parents("tr:first");
                    tr.find('.Civil').val(tr.find(".lblCivil").text())
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



                    $(".FinalScore")
                        .map(function () { return $(this).val() })
                        .get()
                        .sort(function (a, b) { return a - b })
                        .reduce(function (a, b) { if (b != a[0]) a.unshift(b); return a }, [])
                        .forEach((v, i) => {


                            $('.FinalScore').filter(function () { return test = $(this).val() == v; }).parent().next('td').children('inout').val(i + 1);

                        });


                    $('.OverallPlace').each(function () {

                        var tr = $(this).parents("tr:first");

                        if (tr.find('.OverallPlace').val() == 1) {

                            tr.find('.OverallPlace').css('background-color', "#C9B037")

                        }
                        else if (tr.find('.OverallPlace').val() == 2) {

                            tr.find('.OverallPlace').css('background-color', "#D7D7D7")

                        }
                        else if (tr.find('.OverallPlace').val() == 3) {

                            tr.find('.OverallPlace').css('background-color', "#AD8A56")

                        }
                    });
                    var tr = $(this).parents("tr:first");
                    var currentRow = $(this).closest("tr");
                    var data = $('#ScoreBoard').DataTable().row(currentRow).data()
                    var ID = (data['ID']);
                    var sum = 0;
                    tr.find('.Sumit').each(function () {
                        sum += Number($(this).val());
                        tr.find('.FinalScore').val(sum)

                    });
                    var games = {
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

                        url: "/Teams/Scoreboard",
                        data: JSON.stringify(games),
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        success: function (r) {
                            alertify.success('Updated Scores')
                        }

                    });
                })

            })

        }







    });


  


































})