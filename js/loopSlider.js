//ファーストコピーの表示
if( !document.referrer.match('recruit.freesale.co.jp') ){
	$('html').prepend('<div id="first-copy"><img src="./images/first-copy.jpg"></div>');
}

$(function(){

//キャッチコピーを消す
$(window).on('load', function(){
    setTimeout(function(){
        $('#first-copy').animate({
            opacity : 0
        },1000, function(){$('#first-copy').remove()});
    },2000);
});

//#main-imageの背景をループ
var mainImageBgPositionX = 0;
var $mainImage = $('#main-image');
setInterval(function(){
  --mainImageBgPositionX;
  $mainImage.animate({
    backgroundPosition : mainImageBgPositionX + 'px'
  }, 20);
},20);
//.mainImagesの画像の位置指定

var mainImagesLiLeft = 0,
    mainImagesLiNum = $('.mainImages li').length,
    $htmlWidth = 0,
    mainImagesLiWidth = 0,
    mainImagesLihideNum = 0,
    mainImagesLiLeftNum = 0,
    past$htmlWidth = 0,
    mainImagesLiLeftSetNum = 0,
    mainImagesFlow;

//メイン画像の動きを開始させる
function mainImagesFlowStart(){
    mainImagesFlow = setInterval(function(){
        $('.mainImages li').each(function(){
            mainImagesLiLeft = parseInt( $(this).css('left') );
            mainImagesLiLeftNum = mainImagesLiWidth * ( mainImagesLiNum - 2 );
            --mainImagesLiLeft;
                $(this).css('left',mainImagesLiLeft);
            if( mainImagesLiLeft < mainImagesLihideNum ){
                $(this).hide().css( 'left',mainImagesLiLeftNum ).show() ;
            }
        });
    },20);
};

//メイン画像の動きを停止させる
function mainImagesFlowStop(){
    clearInterval(mainImagesFlow);
}

//画像の位置をセット
function mainImagesLiLeftSet(){
    $('.mainImages li').each(function(){
        $(this).css('left', mainImagesLiLeftSetNum);
        mainImagesLiLeftSetNum = mainImagesLiLeftSetNum + mainImagesLiWidth;
    });
}

$(window).on('load resize orientationchange', function(){

    //htmlの幅を取得
    $htmlWidth = $('html, body').width();

    //liの間隔の値を決定
    if( $htmlWidth > brakePoint ){
        mainImagesLiWidth = 460;
    }else{
        mainImagesLiWidth = 250;
    }
    mainImagesLiLeftSetNum = mainImagesLiWidth * -1;
    mainImagesLihideNum = mainImagesLiWidth * -2;
    if(   ( ( $htmlWidth > brakePoint ) && ( past$htmlWidth <= brakePoint ) )   ||   ( ( past$htmlWidth > brakePoint ) && ( $htmlWidth <= brakePoint ) )   ||   ( past$htmlWidth == 0 )   ){
        mainImagesLiLeftSet();
        mainImagesFlowStop();
        mainImagesFlowStart();
    }
    past$htmlWidth = $htmlWidth;
});

});
