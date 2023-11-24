$(function() {
  // ボタンアニメーション
  $('.button-more').on('mouseover', function() {
    $(this).animate({
      opacity: 0.5,
      marginLeft: 20,
    }, 100);
  });

  $('.button-more').on('mouseout', function() {
    $(this).animate({
      opacity: 1,
      marginLeft: 0
    }, 100);
  });

  // カーセル
  $('.carousel').slick({
    autoplay: true,
    dots: true,
    infinite: true,
    autoplaySpeed: 5000,
    arrows: false,
  });

  // AjaxでSTATIC FORMSにデータを送信
  $('#submit').on('click', function(event) {

    // formタグによる送信の拒否
    event.preventDefault();

    // 入力チェックをした結果、エラーがあるかないか判定
    let result = inputCheck();

    // エラー判定とメッセージを取得
    let error = result.error;
    let message = result.message;

    // エラーが無かったらフォームを送信する
    if(error == false) {

      // Ajaxでformを送信する
      $.ajax({
        url: 'https://api.staticforms.xyz/submit',
        type: 'POST',
        dateType: 'Json',
        date: $('#form').serialize(),
        success: function(result) {
          alert('お問い合わせを送信しました。')
        },
        error: function(xhr, resp, text) {
          alert('お問い合わせを送信できませんでした')
        }
      })
    } else {
      // エラーメッセージを表示
      alert(message);
    }
  });

  // フォーカスが外れたとき（blur）にフォームの入力チェックをする
  $('#name').blur(function() {
    inputCheck();
  });
  $('#furigana').blur(function() {
    inputCheck();
  });
  $('#email').blur(function() {
    inputCheck();
  });
  $('#tel').blur(function() {
    inputCheck();
  });
  $('#message').blur(function() {
    inputCheck();
  });
  $('#agree').click(function() {
    inputCheck();
  });

  // お問い合わせフォームの入力チェック
  function inputCheck() {

    // エラーのチェック結果
    let result;
    // エラーメッセージのテキスト
    let message ='';
    // エラーがなければfalse、エラーがあればtrue
    let error = false;

    // お名前のチェック
    if($('#name').val() == '') {
      
      // エラー有り
      $('#name').css('background-color', '#f79999');
      error = true;
      message += 'お名前を入力してください。\n';
    } else {
      // エラー無し
      $('#name').css('background-color', '#fafafa');
    }

    // フリガナのチェック
    if($('#furigana').val() == '') {
      
      // エラー有り
      $('#furigana').css('background-color', '#f79999');
      error = true;
      message += 'フリガナを入力してください。\n ';
    } else {
      // エラー無し
      $('#furigana').css('background-color', '#fafafa');
    }

    // お問い合わせのチェック
    if($('#message').val() == '') {

      // エラー有り
      $('#message').css('background-color', '#f79999');
      error = true;
      message += 'お問い合わせ内容を入力してください。\n';
    } else {
      // エラー無し
      $('#message').css('background-color', '#fafafa');
    }

    // メールアドレスのチェック
    if($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1) {

      // エラー有り
      $('#email').css('background-color', '#f79999');
      error = true;
      message += 'メールアドレスが未入力、または「@」「.」が含まれていません。\n';
    } else {
      // エラー無し
      $('#email').css('background-color', '#fafafa');
    }

    // 電話番号のチェック（未入力はOK、未入力でない場合は「-」が必要）
    if($('#tel').val() != '' && $('#tel').val().indexOf('-') == -1) {

      // エラー有り
      $('#tel').css('background-color', '#f79999');
      error = true;
      message += '電話番号に「-」が含まれていません。\n';
    } else {
      // エラー無し
      $('#tel').css('background-color', '#fafafa');
    }

    // 個人情報のチェックボックスのチェック
    if($('#agree').prop('checked') == false) {
      error = true;
      message += '個人情報の取り扱いについて同意いただける場合は、チェックボックスにチェックしてください。\n';
    }

    // エラーの有無で送信ボタンの切り替え
    if(error == true) {
      $('#submit').attr('src', 'images/button-submit.png');
    } else {
      $('#submit').attr('src', 'images/button-submit-blue.png');
    }

    // オブジェクトでエラー判定とメッセージを返す
    result = {
      error: error,
      message: message
    }

    // 戻り値としてエラーがあるかどうかを返す
    return result;
  }
});
