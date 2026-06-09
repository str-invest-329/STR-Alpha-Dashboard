function getTWOPrice(ticker) {
  var url = "https://query1.finance.yahoo.com/v8/finance/chart/" + ticker + "?interval=1d&range=1d";
  try {
    var res = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
    var data = JSON.parse(res.getContentText());
    return data.chart.result[0].meta.regularMarketPrice;
  } catch(e) { return ""; }
}
