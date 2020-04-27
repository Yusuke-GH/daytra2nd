

// スクロール（リンク先へ）
// --------------------------------------------------------
$(function() {
    var windowWidth = $(window).width();    //windowの幅を取得して、変数(windowWidth)に代入する。　　]  初期設定
    var headerHight = 75;   //変数(header)にヘッダーの高さを代入する                                ]

    $('header a').click(function() {   //クリックイベント（トリガー：header内のaタグ）
        var speed = 500;   //速度設定
        var href = $(this).attr('href');   //クリックされたaタグのリンク先を取得して、変数に格納する。
        var target = $(href == "#" ? 'html' : href);   //hrefの値が"#"のとき、文字列'html'になる。それ以外のとき、変数hrefになる。
        var position = $(target).offset().top-headerHight;   //ヘッダーの底（topからheaderHightを引いたポジション）からターゲットの距離を取得して、変数targetに格納する。

        $('body,html').animate({'scrollTop':position}, speed, 'swing');    //変数positionの距離分をトップからスクロールする。

        return false;   //プログラム処理終了
    });
});


//ハンバーガーメニュー
//--------------------------------------------------------
//< ハンバーガーメニューのクリックに伴い、クラスactiveの付与・除去を切り替える >
$(function() {
    $('.hamburger-menu-btn').click(function() {    //ハンバーガーメニューがクリックされたとき、イベントを実行する。
        $(this).toggleClass('active');    //ハンバーガーメニューにクラスactiveを付与 or 除去

        if ($(this).hasClass('active')) {   //条件式：ハンバーガーメニューがクラスactiveを持っているか？
            $('#global-navigation').addClass('active');   //true : グローバルナビゲーションにクラスactiveを付加する。
                $('img.logo, .main-nav li:not(:last-of-type)').fadeOut(100);    //ハンバーガーメニュー以外の要素をフェードアウト
                $('header').css('box-shadow', 'none');    //ヘッダーの影除去
        } else {
            $('#global-navigation').removeClass('active');    //false : グローバルナビゲーションから、クラスactiveを除去
                $('img.logo, .main-nav li:not(:last-of-type)').fadeIn(1000);    //ハンバーガーメニュー以外の要素をフェードイン
                $('header').css('box-shadow', 'rgba(24, 24, 24, 0.08) 0px 2px 6px');    //ヘッダーの影再出現
        }
    });
});


// スクロール・フェードイン
// --------------------------------------------------------
$(function(){

    //パラメータの設定
    var effect_btm = 100; // エフェクト開始位置 (window底からの距離) [px]
    var effect_move = 50; // 要素の移動距離 [px]
    var effect_time = 1000; // エフェクト時間 [ms]

    //CSSスタイリング
    $('.scroll-fade-row').css({
        opacity: 0
    });
    $('.scroll-fade-row').children().each(function(){   //.scroll-fade-row直下の子要素それぞれに、CSSスタイリングを適用
        $(this).css({
            opacity: 0,
            transform: 'translateY('+ effect_move +'px)',
            transition: effect_time + 'ms'
        });
    });

    // スクロールまたはロード時に実行する処理
    $(window).on('scroll load',function(){   //scroll or load時に常時処理を実行する。
        var scroll_top = $(this).scrollTop();   //端末で表示されている画面の上辺の位置を取得する。（Webサイトのトップを基準位置とする）
        var scroll_btm = scroll_top + $(this).height();   //端末で表示されている画面の下辺の位置を取得する。
        var effect_pos = scroll_btm - effect_btm;   //画面下辺の位置からeffect_btm上の位置を取得する。

        //エフェクトが発動したとき、子要素をずらしてフェードさせる
        $('.scroll-fade-row').each(function(){    //.scroll-fade-rowに繰り返し処理を適用する。/ scroll loadイベントが起こるたびに処理が実行される。
            var this_pos = $(this).offset().top;    //.scroll-fade-rowのトップからの座標を取得する。
            if ( effect_pos > this_pos ) {    //effect_posのラインが、this_posのラインを越したとき、
                $(this).css({   //.scroll-fade-rowにCSSスタイリングを適用する。
                    opacity: 1,
                    transform: 'translateY(0)'
                });
                $(this).children().each(function(i){    //.scroll-fade-rowの直下要素それぞれに、繰り返し文を適用する。/ iには、処理される要素のindex番号(順番)が入る。
                    $(this).delay(100 + i*200).queue(function(){    //.scroll-fade-rowの直下要素にアニメーション(CSSスタイリング)を適用する。アニメーションをdelayで遅延させる。
                        $(this).css({   //  delayはanimatioに対してのみ有効。そのため、CSSコードをキューに入れて、animation登録している。
                            opacity: 1,
                            transform: 'translateY(0)'
                        }).dequeue();   //CSSコードをanimationとして使用したい場合、quoteメソッドでキューに入れる。dequeメソッドで入れたCSSをアニメーションとして使用
                    });   //キュー：animationのライブラリ。キューに登録することで、アニメーションとして、ソースコードを使用できる。
                });
            }
        });
    });

});


// addClass - 遅延後にアニメーションを使用する方法②
// $(this).delay(5000).queue(function() {
//   $(this).addClass('active').dequeue();
// });


// モーダルダイアログ（ウィンドウ）
// --------------------------------------------------------
$(function() {
    var winScrollTop;   //変数定義
    $('.js-modal-open').on('click',function(){    //.js-modal-openがクリックされたら、処理を実行する。
        winScrollTop = $(window).scrollTop();   //スクロール位置を取得する。
        $('.js-modal').fadeIn();    //.js-modalにfadeInメソッドを適用する。
        return false;   //a要素の場合、左記命令文を書かないとリンクとして処理されてしまう。→ リングとしての処理をやめる。
    });
    $('.js-modal-close').on('click',function(){   //.js-modal-close'がクリックされたら、処理を実行する。
        $('.js-modal').fadeOut();   //.js-modalにfadeOutメソッドを適用する。
        $('body,html').stop().animate({scrollTop:winScrollTop}, 100);   //現在実行中のアニメーションを停めて、変数winScrollTopの位置まで移動する。
        return false;   //a要素の場合、左記命令文を書かないとリンクとして処理されてしまう。→ リングとしての処理をやめる。
    });
});


// ソースコード書込み許可
// --------------------------------------------------------
//code要素にcontenteditableを属性を自動で付与するプログラム
function contentEditable() {    //関数定義
  const code = $('.prettyprint');   //.prettyprintクラスを定数codeに代入する。
  code.attr({   //.prettyprintを持つ要素に以下の属性="値"を代入する。
    contenteditable: true,    //contenteditable="true" →　編集を可能にする。
    spellcheck: false,    //spellcheck="false" →　編集を可能にする。
  });
}
window.onload = () => contentEditable();    //windowのロード時に実行するイベント。引数()なしで、関数contentEditableを実行して、戻り値をwindow.onloadに格納する。


// モーダルダイアログ　タブ切替の設定
// --------------------------------------------------------
$(function(){
  $('.modal-header li').on('click',function(){    //.modal-header liをクリックしたらイベント発動
    var index = $('.modal-header li').index(this);    //クリックしたliの順番をindexに格納する。
    $('.modal-header li').removeClass('selected');    //すべてのliから、一旦selectedを除去する。
    $(this).addClass('selected');   //クリックされたliにクラスselectedを追加する。
    $('pre').removeClass('selected')    //preから、クラスappearを除去
    $('pre').eq(index).addClass('selected');    //クリックされたliと同じ順番にあるpreに、クラスappearを付与する。
  });
});


// wow.jsの初期設定
// --------------------------------------------------------
$(function(){
  const wow = new WOW(
    {
      animateClass: 'animated',
      offset: 100,
      callback: function(box) {
        console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
      }
    }
  );
  wow.init();
})


// smooth-scroll.jsの初期設定
// --------------------------------------------------------
$(function(){
  var scroll = new SmoothScroll('a[href*="#"]', {
    header: '#header',    //headerの高さ補正
    speed: 1000,    //速度設定
  });
});


// JavaScriptファイル読み込みの確認
// --------------------------------------------------------
// $(function() {
//   alert("JavaScriptファイルの読み込み完了です。");
// })
