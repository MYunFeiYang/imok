/**
 * Created by zh on 17-7-21.
 */
$(document).ready(function () {

    $("#movieGenre").click(function () {
        $("#nav").css("display","block");
        $("#moveMovieGenre").css("display","block");
        $("#movieGenre").css("display","none");
    });
    $("#moveMovieGenre").click(function () {
        $("#nav").css("display","none");
        $("#movieGenre").css("display","block");
        $("#moveMovieGenre").css("display","none");
    });
    /*分类操作*/
    $("#nav ul li").click(function(){
        $(this).find(".hover").slideToggle("slow"); //find查找元素对象
        //alert(1);
        if($(this).hasClass("curr")){
            $(this).removeClass("curr");
        }
        else{
            $(this).addClass("curr");//当前点击的li本身
        }
        $(this).siblings().removeClass("curr").find(".hover").slideUp("slow");//同辈元素  兄弟元素
    });

    /*测试代码*/
    /*let movieInfoList = [
        {
            id:'1111',
            image: 'img/001.jpg',
            alt:'11',
            title:'灌篮高手',
            original_title:'SLAMDUNK'
        },
        {
            id:'1111',
            image: 'img/001.jpg',
            alt:'11',
            title:'灌篮高手',
            original_title:'SLAMDUNK'
        },
        {
            id:'1111',
            image: 'img/001.jpg',
            alt:'11',
            title:'灌篮高手',
            original_title:'SLAMDUNK'
        },
        {
            id:'1111',
            image: 'img/001.jpg',
            alt:'11',
            title:'灌篮高手',
            original_title:'SLAMDUNK'
        },
        {
            id:'1111',
            image: 'img/001.jpg',
            alt:'11',
            title:'灌篮高手',
            original_title:'SLAMDUNK'
        },
        {
            id:'1111',
            image: 'img/001.jpg',
            alt:'11',
            title:'灌篮高手',
            original_title:'SLAMDUNK'
        }
    ];
    for(let value of movieInfoList){
        let html = `<li class="col-xs-4 col-sm-2 col-md-2" id="${value.id}">
<a href="movieDetails.html">
<img src="${value.image}" style="width: 200px;height: 200px" alt="${value.alt}">
<h4 style="margin-bottom: 2px;text-align: center">${value.title}<sup>${value.original_title}</sup></h4>
</a>
</li>`;
        let showList = document.getElementById('movieAllInfo');
        showList.innerHTML += html;
    }*/


    /*页面加载向服务器请求显示movie信息*/
    $.ajax({
        url : 'http:127.0.0.1:8081/movies/all',
        type : 'GET',
        crossDomain:true,
        cache:false,
        success: function (s,status) {
            let total1 = `<a href="movieDetails.html?id=${s[0].id}"><img src='${s[0].image}'class='img-responsive img-rounded'><p class="text-center">${s[0].title}</p></a>`;
            $("#movieli1").append(total1);
            let total2 = `<a href="movieDetails.html?id=${s[1].id}"><img src='${s[1].image}'class='img-responsive img-rounded'><p class='text-center'>${s[1].title}</p></a>`;
            $("#movieli2").append(total2);
            let total3 = `<a href="movieDetails.html?id=${s[2].id}"><img src='${s[2].image}'class='img-responsive img-rounded'><p class='text-center'>${s[2].title}</p></a>`;
            $("#movieli3").append(total3);
            let total4 = `<a href="movieDetails.html?id=${s[3].id}"><img src='${s[3].image}'class='img-responsive img-rounded'><p class='text-center'>${s[3].title}</p></a>`;
            $("#movieli4").append(total4);
            let total5 = `<a href="movieDetails.html?id=${s[4].id}"><img src='${s[4].image}'class='img-responsive img-rounded'><p class='text-center'>${s[4].title}</p></a>`;
            $("#movieli5").append(total5);
            let total6 = `<a href="movieDetails.html?id=${s[5].id}"><img src='${s[5].image}'class='img-responsive img-rounded'><p class='text-center'>${s[5].title}</p></a>`;
            $("#movieli6").append(total6);
            let total7 = `<a href="movieDetails.html?id=${s[6].id}"><img src='${s[6].image}'class='img-responsive img-rounded'><p class="text-center">${s[6].title}</p></a>`;
            $("#movieli7").append(total7);
            let total8 = `<a href="movieDetails.html?id=${s[7].id}"><img src='${s[7].image}'class='img-responsive img-rounded'><p class='text-center'>${s[7].title}</p></a>`;
            $("#movieli8").append(total8);
            let total9 = `<a href="movieDetails.html?id=${s[8].id}"><img src='${s[8].image}'class='img-responsive img-rounded'><p class='text-center'>${s[8].title}</p></a>`;
            $("#movieli9").append(total9);
            let total10 = `<a href="movieDetails.html?id=${s[9].id}"><img src='${s[9].image}'class='img-responsive img-rounded'><p class='text-center'>${s[9].title}</p></a>`;
            $("#movieli10").append(total10);
            let total11 = `<a href="movieDetails.html?id=${s[10].id}"><img src='${s[10].image}'class='img-responsive img-rounded'><p class='text-center'>${s[10].title}</p></a>`;
            $("#movieli11").append(total11);
            let total12 = `<a href="movieDetails.html?id=${s[11].id}"><img src='${s[11].image}'class='img-responsive img-rounded'><p class='text-center'>${s[11].title}</p></a>`;
            $("#movieli12").append(total12);
            /*for(let value of data){
                let html = `<li class="col-xs-4 col-sm-2 col-md-2" id="${value.id}" style="height:280px;text-align: center">
<a id="movieInfo" href="movieDetails.html?id=${value.id}">
<img id="transition" now="${value.id}" src="${value.image}" style="width: 150px;height: 200px" alt="${value.alt}">
<h4 style="margin-bottom: 2px;text-align: center">${value.title}</h4><sup>${value.original_title}</sup>
</a>
</li>`;
                let showList = document.getElementById('movieAllInfo');
                showList.innerHTML += html;
            }*/
        }
    });
    $(document).on('mouseenter mouseleave','#transition',function (e) {
        let movieId = $(e.target).attr('now');
        $('#transition').css({"width" : "400px","height" : "450px"});
    },function () {
        $('#transition').css({"width" : "150px","height" : "200px"});
    });

    
    /*点击分类向服务器发送请求显示该分类movies*/
    $("#nav ul li .hover p a").click(function(e){  //事件event
        e.preventDefault();
        let movieGenreId = $(e.target).attr('now');
        // console.log(typeof movieGenreId)
        $.ajax({
            url : `http:127.0.0.1:8081/movies/searchByGenreid?genreid=${movieGenreId}`,
            type : 'GET',
            crossDomain:true,
            cache:false,
            success: function (data,status) {
                var showGenreList = '';
                for(let value of data){
                    let html = `<li class="col-xs-4 col-sm-2 col-md-2" id="${value.id}" style="height:280px;text-align: center">
<a id="movieInfo" href="movieDetails.html?id=${value.id}">
<img class="transition" src="${value.image}" style="width: 150px;height: 200px" alt="${value.alt}">
<h4 style="margin-bottom: 2px;text-align: center">${value.title}</h4><sup>${value.original_title}</sup>
</a>
</li>`;
                    //let showGenreList = document.getElementById('movieGenreInfo');
                    showGenreList += html;
                    $('#movieAllInfo').html(showGenreList);
                }
            }
        })
    })
});

