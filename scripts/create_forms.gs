/**
 * 人文学と対話（2026）ふりかえりシート 一括生成スクリプト
 *
 * 使い方：
 * 1. https://script.google.com/ で新しいプロジェクトを作成
 * 2. このコードを貼り付けて保存
 * 3. createAllForms() 関数を実行（初回は権限の許可が必要）
 * 4. 実行ログに各フォームのURLとスプレッドシートのURLが表示されます
 *
 * 各回のスケール質問の違い：
 * - 第1回: 1-10（全部）
 * - 第2回: 1-6, 10（問4,8,9なし）
 * - 第3回: 1-10 + 固有質問「最初の問い」「修正後の問い」
 * - 第4回: 1-3, 5-7, 10（問4,8,9なし）
 * - 第5回〜第6回: 1-10（全部）
 * - 第7回: 1-10 + 固有質問「事例選択」「事例討論の気づき」
 * - 第8回: 1-10（全部）
 */

function createAllForms() {
  // 1. 回答集約用スプレッドシートを作成
  var ss = SpreadsheetApp.create('【人文学と対話2026】ふりかえりシート回答一覧');
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

  // 各回の設定
  var sessions = [
    {
      num: 1,
      title: '対話と探究を体験する（1）対話のコミュニティをひらく',
      scaleQuestions: [1,2,3,4,5,6,7,8,9,10],
      extraBefore: null,
      extraAfter: null,
    },
    {
      num: 2,
      title: '質問を通じて自他の考えを理解する',
      scaleQuestions: [1,2,3,4,5,6,10],
      extraBefore: null,
      extraAfter: null,
    },
    {
      num: 3,
      title: '協働の探究のための〈問い〉を立て、共有する',
      scaleQuestions: [1,2,3,4,5,6,7,8,9,10],
      extraBefore: null,
      extraAfter: function(form) {
        form.addTextItem()
          .setTitle('あなたが最初に立てた〈問い〉を書いてください')
          .setRequired(true);
        form.addTextItem()
          .setTitle('グループワーク後に修正した〈問い〉（修正がなければ同じものを書いてください）')
          .setRequired(true);
      },
    },
    {
      num: 4,
      title: '「人文学は役に立つのか」：現代における人文学の課題',
      scaleQuestions: [1,2,3,5,6,7,10],
      extraBefore: null,
      extraAfter: null,
    },
    {
      num: 5,
      title: '人文学とデジタル技術',
      scaleQuestions: [1,2,3,4,5,6,7,8,9,10],
      extraBefore: null,
      extraAfter: null,
    },
    {
      num: 6,
      title: '人文学と倫理',
      scaleQuestions: [1,2,3,4,5,6,7,8,9,10],
      extraBefore: null,
      extraAfter: null,
    },
    {
      num: 7,
      title: '人文学と現代の共生や人権の課題',
      scaleQuestions: [1,2,3,4,5,6,7,8,9,10],
      extraBefore: null,
      extraAfter: function(form) {
        form.addListItem()
          .setTitle('今回のグループワークで話し合った事例を選択してください')
          .setChoiceValues(['事例1', '事例2', '事例3'])
          .setRequired(true);
        form.addParagraphTextItem()
          .setTitle('事例についてのディスカッションで気づいたこと、考えたことを書いてください')
          .setRequired(true);
      },
    },
    {
      num: 8,
      title: '人文学を社会で活かす・大学院生のキャリア形成',
      scaleQuestions: [1,2,3,4,5,6,7,8,9,10],
      extraBefore: null,
      extraAfter: null,
    },
  ];

  // 全10項目のスケール質問テンプレート
  var allScaleQuestions = {
    1: {
      category: 'Ⅰ セーフティ・アサーティブネス',
      text: '1. 自分とは異なる感じ方や考えでも、いきなり批判や否定せず、聴き、理解しようとする',
    },
    2: {
      category: 'Ⅰ セーフティ・アサーティブネス',
      text: '2. 自分の困りごとや相手にとってネガティブなこと、相手と自分の意見が違う場合でも、それらを率直かつ適切な言い方で伝える',
    },
    3: {
      category: 'Ⅰ セーフティ・アサーティブネス',
      text: '3. 様々な属性、能力や特性の人が発言しやすい場をつくるために配慮する',
    },
    4: {
      category: 'Ⅱ 質問・アクティブリスニング・共感',
      text: '4. 自分とは異なる感じ方、考え方を持つ人に対して、相手の考えや自分と他人の違いを知るためにさまざまな角度から質問をする',
    },
    5: {
      category: 'Ⅱ 質問・アクティブリスニング・共感',
      text: '5. 他者の感じ方、考え方について、相手の立場に立って、共感的に理解する',
    },
    6: {
      category: 'Ⅲ セルフアウェアネス',
      text: '6. 他者との対話のなかで、自分が感じ、考えていることや無意識に当たり前と思っていたこと（前提）にあらためて気づく',
    },
    7: {
      category: 'Ⅳ 協働の探究',
      text: '7. 具体的な事柄や複雑な問題について、自分で考える切り口を見つけ、探究のための「問い」を立てる',
    },
    8: {
      category: 'Ⅳ 協働の探究',
      text: '8. 他者の考えたいことや「問い」を理解し、それに応答し、寄与する意見を言う',
    },
    9: {
      category: 'Ⅳ 協働の探究',
      text: '9. 協働の探究が進むように、積極的に新しい論点を出し、対話の進行についての提案をする',
    },
    10: {
      category: 'Ⅴ コミュニティ形成',
      text: '10. 対話の参加者（クラスのメンバー）に対して、違いがあっても協働して探究することのできる仲間（コミュニティ）だと感じる',
    },
  };

  var formUrls = [];

  // 2. 各回のフォームを作成
  for (var s = 0; s < sessions.length; s++) {
    var session = sessions[s];
    var sessionNum = session.num;
    var formTitle = '【人文学と対話2026】第' + sessionNum + '回 ふりかえりシート';

    var form = FormApp.create(formTitle);
    form.setDescription(
      '第' + sessionNum + '回　' + session.title + '\n\n' +
      '授業後のふりかえりとして、今の自分の対話と探究への態度を自己評価し、記入してください。\n' +
      '提出期限：毎週金曜日 23:59'
    );
    form.setCollectEmail(true);
    form.setLimitOneResponsePerUser(true);
    form.setConfirmationMessage('ふりかえりシートの提出ありがとうございました。');

    // --- クラス選択 ---
    form.addListItem()
      .setTitle('クラス')
      .setHelpText('あなたが所属するクラスを選択してください')
      .setChoiceValues(classes)
      .setRequired(true);

    // --- 名前 ---
    form.addTextItem()
      .setTitle('名前（授業でのニックネーム）')
      .setRequired(true);

    // --- セクション1: スケール評価 ---
    form.addSectionHeaderItem()
      .setTitle('【１】授業での態度・状態の振り返り')
      .setHelpText('今日の授業（現時点）でのあなたの態度・状態を振り返って正直に記入してください。\n1 = まったくできなかった ～ 5 = とてもよくできた');

    // スケール質問を追加（各回で異なる）
    var lastCategory = '';
    for (var q = 0; q < session.scaleQuestions.length; q++) {
      var qNum = session.scaleQuestions[q];
      var qData = allScaleQuestions[qNum];

      // カテゴリヘッダー（変わったときだけ）
      if (qData.category !== lastCategory) {
        form.addSectionHeaderItem()
          .setTitle(qData.category);
        lastCategory = qData.category;
      }

      form.addScaleItem()
        .setTitle(qData.text)
        .setBounds(1, 5)
        .setLabels('まったくできなかった', 'とてもよくできた')
        .setRequired(true);
    }

    // --- 回固有の質問（スケール後、自由記述前） ---
    if (session.extraBefore) {
      session.extraBefore(form);
    }

    // --- セクション2: 自由記述 ---
    form.addSectionHeaderItem()
      .setTitle('自由記述');

    form.addParagraphTextItem()
      .setTitle('【２】今日の対話（グループワーク）のなかで、自分の対話の態度、能力について気づいたこと。特に（１）の項目の自己評価がよくも悪くも変わった場合には、そう考えた理由を書く。')
      .setRequired(true);

    form.addParagraphTextItem()
      .setTitle('【３】（授業内で指示があった場合必須）授業の内容のふりかえり、他の人が話したこと、また、グループで話してみて、あなたが気づいたり、考えたこと。')
      .setRequired(false);

    // --- 回固有の質問（自由記述後） ---
    if (session.extraAfter) {
      session.extraAfter(form);
    }

    form.addParagraphTextItem()
      .setTitle('【４】（任意）教員からの回答や対応が必要なこと')
      .setRequired(false);

    form.addParagraphTextItem()
      .setTitle('【５】（任意）日本語が第一言語（母語）ではない受講者の方、今日の授業の内容は何%理解できましたか？理解や参加がむずかしかったところはどんなところですか？こんなサポートがあれば理解や参加がしやすくなる、ということがあれば書いてください。')
      .setRequired(false);

    // --- 回答先をスプレッドシートに設定 ---
    form.setDestination(FormApp.DestinationType.SPREADSHEET, ssId);

    var formUrl = form.getPublishedUrl();
    var editUrl = form.getEditUrl();
    formUrls.push({
      session: sessionNum,
      title: session.title,
      formUrl: formUrl,
      editUrl: editUrl,
    });

    Logger.log('第' + sessionNum + '回 フォーム作成完了');
    Logger.log('  回答URL: ' + formUrl);
    Logger.log('  編集URL: ' + editUrl);

    // API制限回避のため少し待機
    Utilities.sleep(2000);
  }

  // 3. サマリーシートを追加
  var summarySheet = ss.insertSheet('フォームURL一覧');
  summarySheet.appendRow(['回', 'タイトル', '回答URL', '編集URL']);
  for (var i = 0; i < formUrls.length; i++) {
    var info = formUrls[i];
    summarySheet.appendRow([
      '第' + info.session + '回',
      info.title,
      info.formUrl,
      info.editUrl,
    ]);
  }
  summarySheet.setColumnWidth(1, 80);
  summarySheet.setColumnWidth(2, 350);
  summarySheet.setColumnWidth(3, 400);
  summarySheet.setColumnWidth(4, 400);

  Logger.log('\n=== 全8フォーム作成完了 ===');
  Logger.log('スプレッドシートURL: ' + ss.getUrl());
  Logger.log('「フォームURL一覧」シートに全フォームのURLが記載されています');
}
