/**
 * 人文学と対話（2026）他己紹介フォーム 生成スクリプト
 *
 * 使い方：
 * 1. https://script.google.com/ で新しいプロジェクトを作成（または既存プロジェクトに追加）
 * 2. このコードを貼り付けて保存
 * 3. createTakoshokaiForm() 関数を実行
 * 4. 実行ログにフォームURLとスプレッドシートURLが表示されます
 */

function createTakoshokaiForm() {
  // 1. 回答集約用スプレッドシートを作成
  var ss = SpreadsheetApp.create('【人文学と対話2026】他己紹介フォーム回答一覧');
  var ssId = ss.getId();
  Logger.log('=== スプレッドシート作成完了 ===');
  Logger.log('URL: ' + ss.getUrl());

  // クラス一覧
  var classes = [
    'Class 1（春・火曜）',
    'Class 2（春・水曜）',
    'Class 3（春・木曜）',
    'Class 4（夏・火曜）',
    'Class 5（夏・水曜）',
    'Class 6（夏・木曜）',
    'Class 7（秋・火曜）',
    'Class 8（秋・水曜）',
    'Class 9（秋・木曜）',
    'Class 10（冬・火曜）',
  ];

  // 2. フォームを作成
  var form = FormApp.create('【人文学と対話2026】第2回授業 他己紹介フォーム');
  form.setDescription(
    '第2回の対話ワークで話した相手について、他己紹介文を書いてください。\n' +
    '目安：200字〜400字程度\n\n' +
    '提出期限：毎週金曜日 23:59'
  );
  form.setCollectEmail(true);
  form.setConfirmationMessage('他己紹介フォームの提出ありがとうございました。');

  // --- クラス選択 ---
  form.addListItem()
    .setTitle('クラス')
    .setHelpText('あなたが所属するクラスを選択してください')
    .setChoiceValues(classes)
    .setRequired(true);

  // --- 自分の名前 ---
  form.addTextItem()
    .setTitle('自分の名前（ニックネーム）')
    .setRequired(true);

  // --- 相手の名前 ---
  form.addTextItem()
    .setTitle('対話ワークの相手の名前（ニックネーム）')
    .setRequired(true);

  // --- 紹介文 ---
  form.addParagraphTextItem()
    .setTitle('紹介文（目安：200字〜400字程度）')
    .setHelpText('対話ワークで話した相手のことを、他のクラスメンバーに紹介する文章を書いてください。')
    .setRequired(true);

  // --- 回答先をスプレッドシートに設定 ---
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ssId);

  var formUrl = form.getPublishedUrl();
  var editUrl = form.getEditUrl();

  Logger.log('\n=== 他己紹介フォーム作成完了 ===');
  Logger.log('回答URL: ' + formUrl);
  Logger.log('編集URL: ' + editUrl);
  Logger.log('スプレッドシートURL: ' + ss.getUrl());
}
