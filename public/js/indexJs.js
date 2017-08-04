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
        success: function (data,status) {
            let value=18;
            $('#changeMovieAll').click(function () {
               value+=18;
            });
            for(let i=0;i<value;i++){
                let html = `<li class="col-xs-4 col-sm-2 col-md-2" id="${data[i].id}" style="height:280px;text-align: center">
<a id="movieInfo" href="movieDetails.html?id=${data[i].id}">
<img id="transition" now="${data[i].id}" src="${data[i].image}" style="width: 150px;height: 200px" alt="${data[i].alt}">
<div><h4 style="margin-bottom: 2px;text-align: center">${data[i].title}</h4><sup>${data[i].original_title}</sup></div>
</a>
</li>`;
                let showList = document.getElementById('movieAllInfo');
                showList.innerHTML += html;
            }
        }
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
<img id="transition" now="${value.id}" src="${value.image}" style="width: 150px;height: 200px" alt="${value.alt}">
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
    $(document).on('mouseenter','#transition',function (e) {
        let movieId = $(e.target).attr('now');
        $('#'+movieId).find('img').css({"width":"165px","height":"215px","border":"6px solid #00BFFF","transition":"all 1s"});
    });
    $(document).on('mouseleave','#transition',function (e) {
        let movieId = $(e.target).attr('now');
        $('#'+movieId).find('img').css({"width":"150px","height":"200px","border":"0"});
    });
});

