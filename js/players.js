/* 
Developer Name = Yash Shah;
Project Name = NBA Ajax
NBA Ajax = https://github.com/shahyash1136/nba-ajax 
Project Api Documentation URL = https://www.balldontlie.io/
Players Api = https://www.balldontlie.io/api/v1/players
Teams Api = https://www.balldontlie.io/api/v1/teams
Games Api = https://www.balldontlie.io/api/v1/games
Stats Api = https://www.balldontlie.io/api/v1/stats
season_averages Api = https://www.balldontlie.io/api/v1/season_averages
*/

var NBA = NBA || {};
NBA.baseurl = 'https://www.balldontlie.io/api/v1/';
NBA.limit = 'per_page=50';
NBA.pageNum;
NBA.players = NBA.players || {};

NBA.players.loadJSON = function () {
    $.ajax({
        type: 'GET',
        url: NBA.baseurl + 'players?' + NBA.limit,
        success: function (data) {
            NBA.players.allPlayers(data);
            NBA.players.pagination(data);
        },
        complete: function () {
            $('.loader-wrapper').hide();
        }
    })
}

NBA.players.allPlayers = function (data) {
    var markup = '';
    var player = data.data;
    for (let i = 0; i < player.length; i++) {
        markup += '<div class="player" data-playerid="'+player[i].id+'"> <div class="player__container"> <div class="player__head"> <div class="player__img"> <img src="images/players/default.png" alt="'+player[i].first_name+' '+player[i].last_name+'"> </div><div class="player__team"> <img src="images/teams/'+player[i].team.id+'.png" alt="'+player[i].team.name+'"> </div><div class="player__pos"> <span>'+player[i].position+'</span> </div></div><div class="player__body"> <div class="player__firstName"> <h2>'+player[i].first_name+'</h2> </div><div class="player__lastName"> <h3>'+player[i].last_name+'</h3> </div></div></div></div>'
    }
    document.querySelector('.playersList__container').innerHTML = markup;
}

NBA.players.pagination = function (data) {
    let btns = document.querySelectorAll('.pagination .btn');
    NBA.pageNum = 1;
    btns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            var btnType = e.currentTarget.classList;
            //console.log(e);
            if (btnType.contains('btnNext')) {
                if (NBA.pageNum == data.meta.total_pages) {
                    NBA.pageNum = data.meta.total_pages;
                    document.querySelector('.btn.btnNext').classList.add('disable');
                }else{
                    NBA.pageNum++;
                    document.querySelector('.btn.btnPre').classList.remove('disable');
                }
            }
            
            if (btnType.contains('btnPre')) {
                if (NBA.pageNum === 1) {
                    NBA.pageNum = 1;
                    document.querySelector('.btn.btnPre').classList.add('disable');
                }else{
                    NBA.pageNum--;
                   document.querySelector('.btn.btnNext').classList.remove('disable');
                }
            }
            //console.log(NBA.pageNum);
            $.ajax({
                type: 'GET',
                url: NBA.baseurl + 'players?' + NBA.limit + '&page=' + NBA.pageNum,
                success: function (data) {
                    NBA.players.allPlayers(data);
                },
                complete: function () {
                    $('.loader-wrapper').hide();
                }
            })
        });
    })
    
}



$(document).ready(function () {
    NBA.players.loadJSON();
})