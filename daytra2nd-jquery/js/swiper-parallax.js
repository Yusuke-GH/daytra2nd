
$(function() {

  // Params
  let mainSliderSelector = '.main-slider',    //【変数定義】クラスmain-sliderを格納
      navSliderSelector = '.nav-slider';    //【変数定義】クラスnav-sliderを格納

  // Main Slider
  let mainSliderOptions = {   //【変数定義】設定値を入れ込む（オプションパラメータの設定）
    loop: false,   //ループなし：最後のスライド表示後、最初のスライドに戻る
    // speed: 1000,   //スライドの切り替わる速度[ms]
    speed: 1000,   //スライドの切り替わる速度[ms]
    parallax: true,    //視差効果を有効にする
    autoplay: {    //自動再生ON
      delay: 2500    //スライドが動く間隔時間[ms]
    },

    loopAdditionalSlides: 0,   //ループ作成時に使用されるクローンの枚数
    grabCursor: true,   //カーソルでスライドを掴むことを可能にする
    on: {   //onメソッド（イベント）
      init: function() {   //初期化されたとき、関数内の処理を実行する
        this.autoplay.stop();   //  選択されたスライドで自動再生をストップする
      },
      imagesReady: function() {    //スライト画像の読み込みが完了したとき
        this.el.classList.remove('loading');    //imagesReady's elementsのクラスリストから、クラスloadingを除去
        this.autoplay.start();    //自動再生スタート
      }
    }//on
  };//let mainSliderOptions =

  let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);   //メインスライダーのオプションパラメータの設定を書込み。

})
