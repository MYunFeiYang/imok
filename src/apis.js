/**
 * Created by ggbond on 17-8-1.
 */
'use strict';

let express = require('express');
let orm = require('orm');
let app = express();
let bodyPaser = require('body-parser');
let path = require('path');
let urlencodedParser = bodyPaser.urlencoded({extended: true});
let appRoot = path.join(__dirname, '/');

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(orm.express(`sqlite://${appRoot}movies.db`, {
    define: function (db, models, next) {
        models.Movie = db.define("movie", {
            title: String,
            alt: String,
            year: String,
            rating: String,
            directors: String,
            casts: String,
            image: String,
            original_title: String
        });

        models.Genre = db.define("genre", {
            name: String
        });

        models.Movie_genre = db.define("movie_genre", {
            movie_id: String,
            genre_id: String
        });

        models.Comment = db.define("comment", {
            movie_id: String,
            user: String,
            content: String
        });

        models.Introduction = db.define("introduction", {
            movie_id: String,
            content: String
        });

        next();
    }
}));

//按类别id返回排名前20的电影
app.get("/movies/searchByGenreid", function (req, res) {
    let genreid = req.query.genreid;
    // let movieid = req.query.movieid;
    req.models.Movie_genre.find({genre_id: genreid}, function (err, movie_genre) {
        if (err) throw err;
        let movie_idArray = movie_genre.map(i => i.movie_id);
        req.models.Movie.find({id: movie_idArray}, 20, ["rating", "Z"], function (err, movie) {
            res.send(movie);
        });
    })

});


//按电影id返回相似电影 前20movieid
app.get("/movies/searchByMovieid", function (req, res) {
    let movieid = req.query.movieid;
    console.log(movieid);
    req.models.Movie_genre.find({movie_id: movieid}, function (err, movie_genre) {
        if (err) throw err;
        //console.log(JSON.stringify(movie_genre));
        let genre_idArray = movie_genre.map(i => i.genre_id);//根据电影的id获取类型id数组
        let a = [];
        a = genre_idArray
        let randomId = random(genre_idArray.length, a);
        console.log(randomId);
        req.models.Movie_genre.find({genre_id: randomId}, function (err, movie_genre) {
            if (err) throw err;
            let movie_idArray = movie_genre.map(i => i.movie_id);
            req.models.Movie.find({id: movie_idArray}, 20, ["rating", "Z"], function (err, movie) {
                res.send(movie);
            });
        });
    });
});

//返回排名前20的电影
app.get("/movies/all", function (req, res) {
    req.models.Movie.find(20, ["rating", "Z"], function (err, movie) {
        res.send(movie);
    });
});

//根据电影id返回电影详细信息
app.get("/movies", function (req, res) {
    let id = req.query.id;
    req.models.Movie.get(id, function (error, movie) {
        if (error) throw error;
        // console.log(movie);
        req.models.Movie_genre.find({movie_id: id}, function (error, movie_genre) {
            if (error) throw error;
            let genreIdList = [];
            for (let genres of movie_genre) {
                genreIdList.push(genres.genre_id);
            }
            // console.log(genreIdList);
            req.models.Genre.find({id: genreIdList}, function (error, genres) {
                if (error) throw error;
                let s = '';
                for (let genre of genres) {
                    s += genre.name + '/';
                }
                // console.log(s.substring(0, s.length-1));
                movie.genres = s.substring(0, s.length - 1);
                res.send(movie);
            });
        });
    });
});

//根据电影名模糊搜索
app.get('/movie_search', function (req, res) {
    let movie_name = req.query.movie_name;
    // console.log(movie_name);
    req.models.Movie.find({title: orm.like("%" + movie_name + "%")}, function (err, results) {
        if (err) throw err;
        res.send(JSON.stringify(results));
    });
});
app.get('/movie/comments', function (req, res) {
    let movieid = req.query.movieid;
    req.models.Comment.find({movie_id: movieid}, function (err, result) {
        if (err) throw err;
        res.send(result);
    })
});

app.get('/movie/introduction', function (req, res) {
    let movieid = req.query.movieid;
    req.models.Introduction.find({movie_id: movieid}, function (err, result) {
        if (err) throw err;
        res.send(result);
    })
});

//随机剧情id
function random(n, char) {
    let id = Math.ceil(Math.random() * n);
    return char[id - 1];
}

app.listen(8081, function () {
    console.log("App is listening on port 8081!");
});
