function chatMain() {
  try {
    const rowData = getActiveRowData();
    sendChat(rowData);
    delCurrentTrigger();
  } catch(e) {
    if (e instanceof CustomException) {
      // エラーログにIDとメッセージを渡す
      logError(e, e.id);
    } else {
      logError(e, "Unknown ID");
    }
  }
}
