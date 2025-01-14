// 設定されているsendChatトリガーをすべて削除する関数
function delAllTrigger(){
  const triggers = ScriptApp.getProjectTriggers();
  // トリガー登録数のforループを実行
  for(let i = 0; i < triggers.length; i++){
    if (triggers[i].getHandlerFunction() === "chatMain") {
      // 取得したトリガーをdeleteTriggerで削除
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

// 実行中のトリガーのみを削除する関数
function delCurrentTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  if (triggers.length === 0) {
    Logger.log("削除可能なトリガーはありません。");
    return;
  }

  var props = PropertiesService.getScriptProperties().getProperties();
  
  // トリガーIDと作成日時のペアを取得し、ソートする
  var triggerData = triggers.map(function(trigger) {
    return {
      trigger: trigger,
      id: trigger.getUniqueId(),
      creationTime: props[trigger.getUniqueId()] || "9999-12-31T23:59:59Z" // 未登録の場合は未来日
    };
  });

  // 作成日時で昇順ソート
  triggerData.sort(function(a, b) {
    return new Date(a.creationTime) - new Date(b.creationTime);
  });

  // 最も古いトリガーを削除
  const oldestTrigger = triggerData[0];
  try {
    ScriptApp.deleteTrigger(oldestTrigger.trigger);
    // プロパティストアからも削除
    PropertiesService.getScriptProperties().deleteProperty(oldestTrigger.id);
  } catch (e) {
    Logger.log("トリガー削除中にエラーが発生しました: " + e.toString());
  }
}