// 当日通知の各行をトリガーにセットする関数
function roopTodaySheet() {
  const sourceSheetName = SHEET_NAME_TODAY_TARGET; // コピー先のシート名
  const sourceSheet = SPREADSHEET.getSheetByName(sourceSheetName);

  // コピー元シートのデータを取得
  const sourceData = sourceSheet.getDataRange().getValues();
  Logger.log("トリガー設定中...");

  // try {

  // } catch(e) {
  //   logError(id)
  // }

  // 重複した回数を保持する変数
  let sumMinutes = 0;

  // 各行をループして実行トリガーを登録
  for (let i = 0; i < sourceData.length; i++) {
    if (i > 0) {
      const isDuplicate = sourceData[i][ITEM_INDEX.通知時間].getTime() === sourceData[i-1][ITEM_INDEX.通知時間].getTime();
      // 一行前と比較して同じ時間の場合
      sumMinutes = isDuplicate ? sumMinutes + 1 : 0;
    }
    // トリガーをセット
    registTrigger(sourceData[i], sumMinutes);
  }
}

// 引数で受け取った通知時間の列の値からトリガーセット
function registTrigger(rowData, sumMinutes) {
  // 通知内容が入ってないものは一旦スキップ
  if (!rowData[ITEM_INDEX.通知内容] || rowData[ITEM_INDEX.通知内容] == "") {
    Logger.log("通知内容の列が入力されていません");
    return;
  }

  // トリガー実行日時の取得
  let triggerTime = getTriggerTime(rowData[ITEM_INDEX.通知時間]);

  // この行までの重複行数分後にセットする
  triggerTime.setMinutes(triggerTime.getMinutes() + sumMinutes);

  // トリガーを設定
  const trigger = ScriptApp.newTrigger("chatMain").timeBased().at(triggerTime).create();

  // トリガーの作成日時とIDをプロパティストアに保存
  var props = PropertiesService.getScriptProperties();
  props.setProperty(trigger.getUniqueId(), new Date().toISOString());
}


