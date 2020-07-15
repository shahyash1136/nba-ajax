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

NBA.loadJSON = function () {
    $.ajax({
        type: 'GET',
        url: NBA.baseurl + 'players?' + NBA.limit,
        success: function (data) {
            NBA.players(data);
            NBA.pagination(data);
        }
    })
}


NBA.players = function (data) {
    console.log(data);
}

NBA.pagination = function (data) {
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
                if (NBA.pageNum == 1) {
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
                    NBA.players(data);
                }
            })
        });
    })
    
}




$(document).ready(function () {
    NBA.loadJSON();
})