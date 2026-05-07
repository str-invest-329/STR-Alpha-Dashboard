// ===== 設定 =====
var MONDAY_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjYzNzM4NDQ3MywiYWFpIjoxMSwidWlkIjoxMDA0NzE3MjgsImlhZCI6IjIwMjYtMDMtMjVUMDE6MTY6MDYuMDUyWiIsInBlciI6Im1lOndyaXRlIiwiYWN0aWQiOjMzNjU0MTQ1LCJyZ24iOiJhcHNlMiJ9.wJl6mkoiB7OEi8RaagmbanCdqLZBwLOU9dpuE3L7PNA";
var MONDAY_API = "https://api.monday.com/v2";
var BATCH_SIZE = 5;

// ===== 事件表 Board 設定（投資 workspace）=====

var AE_BOARD_ID = 5027417480;
var AE_GROUP_ID = "topics";
var AE_COLUMNS = {
  id: "text_mm1s6g54", date: "date_mm1sp8b1", type: "text_mm1sxq8g", bank: "text_mm1sy312",
  account: "text_mm1sjvgv", currency: "text_mm1s64wd", amount: "numeric_mm1svwj4",
  summary: "text_mm1stbzg"
};

var TE_BOARD_ID = 5027417485;
var TE_GROUP_ID = "topics";
var TE_COLUMNS = {
  id: "text_mm1sdec4", date: "date_mm1smj7n", bank: "text_mm1sxx37", account: "text_mm1srxwr",
  currency: "text_mm1s4q53", stock: "text_mm1sj955", direction: "text_mm1sjm9k",
  price: "numeric_mm1shwck", qty: "numeric_mm1szyb3", fee: "numeric_mm1ss309",
  total: "numeric_mm1sykxy", split: "numeric_mm34ry60"
};

var DE_BOARD_ID = 5027417531;
var DE_GROUP_ID = "topics";
var DE_COLUMNS = {
  id: "text_mm1stsj0", date: "date_mm1st6q8", bank: "text_mm1ser7", account: "text_mm1sk3y3",
  currency: "text_mm1stg7r", direction: "text_mm1srfmb", amount: "numeric_mm1sfd9q",
  days: "numeric_mm1s16g6", rate: "text_mm1s2srk", maturityDate: "date_mm1ss3ay"
};

// ===== 狀態表 Board 設定 =====
var STATUS_BOARDS = {
  account: {
    boardId: 5027417543, groupId: "topics", sheetName: "帳戶狀態表",
    nameField: function(row) { return row["銀行"] + "-" + row["帳戶名"] + " " + row["幣別"]; },
    columns: {
      "幣別": "text_mm1s9x33", "總資本": "numeric_mm1skvxy", "總資產": "numeric_mm1sms0m",
      "總負債": "numeric_mm1srewk", "NAV": "numeric_mm1sqbgh",
      "股票倉位": "text_mm1smss3", "現金倉位": "text_mm1s9z8",
      "總損益": "numeric_mm1s98jz", "總損益率": "text_mm1sqhrw",
      "未實現總損益": "numeric_mm1sx1x6", "未實現總損益率": "text_mm1sbqwm",
      "未實現股票損益": "numeric_mm1skabc", "未實現股票損益率": "text_mm1sehct",
      "已實現總損益": "numeric_mm1sa0zp", "已實現總損益率": "text_mm1sax8n",
      "已實現股票損益": "numeric_mm1s71sw",
      "利息與股息": "numeric_mm1sa1nj", "什支": "numeric_mm1sjcz",
      "持倉成本": "numeric_mm1sy7b2", "持倉市值": "numeric_mm1sh8cv",
      "可用現金": "numeric_mm1s5bwf", "定存": "numeric_mm1sm0nw"
    }
  },
  equityByAccount: {
    boardId: 5027417556, groupId: "topics", sheetName: "股票狀態表-帳戶",
    nameField: function(row) { return row["帳戶名"] + "-" + row["Ticker"] + "(" + row["銀行"] + ")"; },
    columns: {
      "市場": "text_mm1ssd7g", "銀行": "text_mm1s403g", "帳戶名": "text_mm1s4jy4",
      "Ticker": "text_mm1szjb8", "持有股數": "numeric_mm1s92n9", "平均成本": "numeric_mm1s1gxj",
      "持有成本總額": "numeric_mm1shp2m", "累計已實現損益": "numeric_mm1snzjq",
      "累計已實現股息": "numeric_mm1sz9", "現價": "numeric_mm1sf88e",
      "持倉市值": "numeric_mm1s4gn7", "未實現損益": "numeric_mm1sdstf",
      "未實現損益率": "text_mm1ss8dv", "持倉占比": "text_mm1ss97f"
    }
  },
  equityByTicker: {
    boardId: 5027417566, groupId: "topics", sheetName: "股票狀態表-標的",
    nameField: function(row) { return row["Ticker"]; },
    columns: {
      "市場": "text_mm1s7789", "總持有股數": "numeric_mm1ssyj4", "平均成本": "numeric_mm1sea4n",
      "總持有成本": "numeric_mm1srqdv", "累計已實現損益": "numeric_mm1sjak1",
      "持倉帳戶數": "numeric_mm1sct63", "累計已實現股息": "numeric_mm1stw1f",
      "現價": "numeric_mm1s3s5q", "總持倉市值": "numeric_mm1saxcw",
      "未實現損益": "numeric_mm1sheqf", "未實現損益率": "text_mm1spv61", "持倉占比": "text_mm1sm66f"
    }
  },
  market: {
    boardId: 5027417577, groupId: "topics", sheetName: "市場狀態表",
    nameField: function(row) { return row["市場"]; },
    columns: {
      "總資本": "numeric_mm1sw79s", "總資產": "numeric_mm1syeyv", "總負債": "numeric_mm1sjsrh",
      "NAV": "numeric_mm1s5k7j", "股票倉位": "text_mm1szxwt", "現金倉位": "text_mm1sda7s",
      "總損益": "numeric_mm1sb7ed", "總損益率": "text_mm1sa0je",
      "未實現總損益": "numeric_mm1sst0e", "未實現總損益率": "text_mm1sbd78",
      "未實現股票損益": "numeric_mm1sd3a5", "未實現股票損益率": "text_mm1s3dy1",
      "已實現總損益": "numeric_mm1s13pc", "已實現總損益率": "text_mm1s5tf5",
      "已實現股票損益": "numeric_mm1sqz97",
      "利息與股息": "numeric_mm1sfhmp", "什支": "numeric_mm1s89cc",
      "持倉成本": "numeric_mm1sqect", "持倉市值": "numeric_mm1snwfk",
      "可用現金": "numeric_mm1sj9sm", "定存": "numeric_mm1sr3fx"
    }
  },
  depositByAccount: {
    boardId: 5027417602, groupId: "topics", sheetName: "定存狀態表-帳戶",
    nameField: function(row) { return row["銀行"] + "-" + row["帳戶名"] + " " + row["狀態"]; },
    columns: {
      "銀行": "text_mm1sghse", "帳戶名": "text_mm1s831e", "幣別": "text_mm1s9p78",
      "金額": "numeric_mm1s3yaf", "起始日": "date_mm1s11a6", "到期日": "date_mm1st68k",
      "年利率": "text_mm1sbmg", "預估利息": "numeric_mm1s1kzd",
      "狀態": "text_mm1srepy", "累計已實現利息": "numeric_mm1skpsx"
    }
  }
};

var ALL_BOARDS = {
  "帳戶事件表": 5027417480, "股票事件表": 5027417485, "定存事件表": 5027417531,
  "帳戶狀態表": 5027417543, "股票狀態表-帳戶": 5027417556, "股票狀態表-標的": 5027417566,
  "市場狀態表": 5027417577, "定存狀態表-帳戶": 5027417602
};

// ===== 以下為功能函數 =====

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Monday 工具")
    .addItem("同步帳戶事件表（新資料）", "syncAccountEvents")
    .addItem("同步股票事件表（新資料）", "syncTradeEvents")
    .addItem("同步定存事件表（新資料）", "syncDepositEvents")
    .addSeparator()
    .addItem("重算狀態表", "recalcOnly")
    .addItem("同步狀態表到 Monday", "syncStatusOnly")
    .addItem("重算 + 同步全部", "recalcAndSyncAll")
    .addSeparator()
    .addItem("標記全部為已同步（不推送）", "markAllSynced")
    .addSeparator()
    .addItem("檢查重複（僅報告）", "checkDuplicatesReport")
    .addItem("檢查重複並刪除", "checkDuplicatesAndDelete")
    .addToUi();
}

function getColumnIndex(headers, name) { var idx = headers.indexOf(name); if (idx === -1) Logger.log("找不到欄位: " + name); return idx; }
function getSyncColIndex(sheet, headers) { var idx = headers.indexOf("同步狀態"); if (idx === -1) { sheet.getRange(1, headers.length + 1).setValue("同步狀態"); return headers.length; } return idx; }

function batchCreateItems(boardId, groupId, items) {
  var mutations = [];
  for (var i = 0; i < items.length; i++) { var escaped = JSON.stringify(JSON.stringify(items[i].columnValues)); var name = String(items[i].name || "untitled").replace(/"/g, '\\"'); mutations.push("item" + i + ': create_item(board_id: ' + boardId + ', group_id: "' + groupId + '", item_name: "' + name + '", column_values: ' + escaped + ') { id }'); }
  var options = { method: "post", contentType: "application/json", headers: { "Authorization": MONDAY_TOKEN }, payload: JSON.stringify({ query: "mutation { " + mutations.join(" ") + " }" }), muteHttpExceptions: true };
  try { var response = UrlFetchApp.fetch(MONDAY_API, options); var result = JSON.parse(response.getContentText());
    if (result.errors && JSON.stringify(result.errors).indexOf("COMPLEXITY_BUDGET_EXHAUSTED") >= 0) { Utilities.sleep(20000); response = UrlFetchApp.fetch(MONDAY_API, options); result = JSON.parse(response.getContentText()); }
    if (result.errors) { Logger.log("Monday API error: " + JSON.stringify(result.errors)); return false; }
    for (var i = 0; i < items.length; i++) { if (!result.data || !result.data["item" + i]) return false; } return true;
  } catch (e) { Logger.log("Request failed: " + e.toString()); return false; }
}

function syncAccountEvents() { _syncEventTable("帳戶事件表", AE_BOARD_ID, AE_GROUP_ID, buildAEItem); }
function syncTradeEvents() { _syncEventTable("股票事件表", TE_BOARD_ID, TE_GROUP_ID, buildTEItem, true); }
function syncDepositEvents() { _syncEventTable("定存事件表", DE_BOARD_ID, DE_GROUP_ID, buildDEItem); }

function _syncEventTable(sheetName, boardId, groupId, buildFn, checkTickers) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet || sheet.getLastRow() < 2) { SpreadsheetApp.getUi().alert("沒有資料需要同步"); return; }
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  getSyncColIndex(sheet, headers); headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var syncIdx = getColumnIndex(headers, "同步狀態");
  var pending = [];
  for (var row = 2; row <= sheet.getLastRow(); row++) {
    var data = sheet.getRange(row, 1, 1, headers.length).getValues()[0];
    if (data[syncIdx] === "已同步") continue;
    var item = buildFn(headers, data); if (item) pending.push({ row: row, item: item });
  }
  if (pending.length === 0) { SpreadsheetApp.getUi().alert("沒有新資料需要同步"); return; }
  var synced = 0, failed = 0;
  for (var i = 0; i < pending.length; i += BATCH_SIZE) {
    var batch = pending.slice(i, i + BATCH_SIZE);
    if (batchCreateItems(boardId, groupId, batch.map(function(p) { return p.item; }))) { for (var j = 0; j < batch.length; j++) { sheet.getRange(batch[j].row, syncIdx + 1).setValue("已同步"); } synced += batch.length; } else { failed += batch.length; }
    Utilities.sleep(1000);
  }
  if (synced > 0) { if (checkTickers) autoAddNewTickers(); recalcAll(); syncStatusToMonday(); }
  SpreadsheetApp.getUi().alert(sheetName + "同步完成\n成功: " + synced + " 筆\n失敗: " + failed + " 筆" + (synced > 0 ? "\n狀態表已重算並同步" : ""));
}

function buildAEItem(h, d) {
  var c = {}; ["ID","日期","銀行","帳戶名","幣別","金額","摘要"].forEach(function(n){c[n]=h.indexOf(n);});
  c["類型"] = h.indexOf("事件類型"); if (c["類型"] === -1) c["類型"] = h.indexOf("交易類型");
  if(!d[c["日期"]]||!d[c["類型"]]||!String(d[c["類型"]]))return null;
  var ds=Utilities.formatDate(new Date(d[c["日期"]]),"Asia/Taipei","yyyy-MM-dd");
  var cv={}; cv[AE_COLUMNS.id]=String(d[c["ID"]]||""); cv[AE_COLUMNS.date]=ds; cv[AE_COLUMNS.type]=String(d[c["類型"]]); cv[AE_COLUMNS.bank]=String(d[c["銀行"]]); cv[AE_COLUMNS.account]=String(d[c["帳戶名"]]); cv[AE_COLUMNS.currency]=String(d[c["幣別"]]); cv[AE_COLUMNS.amount]=Number(d[c["金額"]]); cv[AE_COLUMNS.summary]=String(d[c["摘要"]]||"");
  return{name:String(d[c["摘要"]]||d[c["類型"]]||"事件"),columnValues:cv};
}
function buildTEItem(h, d) { var c = {}; ["ID","日期","銀行","帳戶名","幣別","Ticker","方向","價格","股數","手續費","成交金額","分割/反分割"].forEach(function(n){c[n]=h.indexOf(n);}); if(!d[c["日期"]]||!d[c["Ticker"]])return null; var ds=Utilities.formatDate(new Date(d[c["日期"]]),"Asia/Taipei","yyyy-MM-dd"); var dir=String(d[c["方向"]]); var cv={}; cv[TE_COLUMNS.id]=String(d[c["ID"]]||""); cv[TE_COLUMNS.date]=ds; cv[TE_COLUMNS.bank]=String(d[c["銀行"]]); cv[TE_COLUMNS.account]=String(d[c["帳戶名"]]); cv[TE_COLUMNS.currency]=String(d[c["幣別"]]); cv[TE_COLUMNS.stock]=String(d[c["Ticker"]]); cv[TE_COLUMNS.direction]=dir; cv[TE_COLUMNS.price]=Math.abs(Number(d[c["價格"]])); cv[TE_COLUMNS.qty]=Math.abs(Number(d[c["股數"]])); cv[TE_COLUMNS.fee]=Math.abs(Number(d[c["手續費"]])); cv[TE_COLUMNS.total]=Math.abs(Number(d[c["成交金額"]])); var splitVal=c["分割/反分割"]>=0?Number(d[c["分割/反分割"]]||0):0; if(splitVal)cv[TE_COLUMNS.split]=splitVal; return{name:(dir==="買"||dir==="買股"?"買股":"賣股")+"-"+d[c["Ticker"]]+"-"+Math.abs(Number(d[c["股數"]]))+"股*"+Math.abs(Number(d[c["價格"]])),columnValues:cv}; }
function buildDEItem(h, d) { var c = {}; ["ID","日期","銀行","帳戶名","幣別","方向","金額","天數","年利率","到期日"].forEach(function(n){c[n]=h.indexOf(n);}); if(!d[c["日期"]]||!d[c["方向"]])return null; var ds=Utilities.formatDate(new Date(d[c["日期"]]),"Asia/Taipei","yyyy-MM-dd"); var ms=d[c["到期日"]]?Utilities.formatDate(new Date(d[c["到期日"]]),"Asia/Taipei","yyyy-MM-dd"):""; var cv={}; cv[DE_COLUMNS.id]=String(d[c["ID"]]||""); cv[DE_COLUMNS.date]=ds; cv[DE_COLUMNS.bank]=String(d[c["銀行"]]); cv[DE_COLUMNS.account]=String(d[c["帳戶名"]]); cv[DE_COLUMNS.currency]=String(d[c["幣別"]]); cv[DE_COLUMNS.direction]=String(d[c["方向"]]); cv[DE_COLUMNS.amount]=Math.abs(Number(d[c["金額"]])); cv[DE_COLUMNS.days]=Math.abs(Number(d[c["天數"]])); cv[DE_COLUMNS.rate]=String(d[c["年利率"]]); if(ms)cv[DE_COLUMNS.maturityDate]=ms; return{name:"定存"+d[c["方向"]]+"-"+d[c["金額"]]+" "+d[c["幣別"]],columnValues:cv}; }

function autoAddNewTickers() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var priceSheet = ss.getSheetByName("股票設定表");
  if (!priceSheet) return 0;

  var priceHeaders = priceSheet.getRange(1, 1, 1, priceSheet.getLastColumn()).getValues()[0];
  var tickerCol = priceHeaders.indexOf("Ticker");
  var nameCol = priceHeaders.indexOf("標的");
  var marketCol = priceHeaders.indexOf("市場");
  var currCol = priceHeaders.indexOf("幣別");
  var priceCol = priceHeaders.indexOf("現價");
  var timeCol = priceHeaders.indexOf("更新時間");
  if (tickerCol === -1) return 0;

  // 取得股票設定表已有的 Ticker
  var existingTickers = {};
  var plr = priceSheet.getLastRow();
  if (plr >= 2) {
    var pd = priceSheet.getRange(2, tickerCol + 1, plr - 1, 1).getValues();
    for (var i = 0; i < pd.length; i++) {
      var t = String(pd[i][0]).trim();
      if (t) existingTickers[t] = true;
    }
  }

  // 從股票事件表收集 Ticker + 幣別
  var newTickers = {}; // ticker → { currency: "USD"/"TWD" }
  var tradeSheet = ss.getSheetByName("股票事件表");
  if (tradeSheet && tradeSheet.getLastRow() >= 2) {
    var th = tradeSheet.getRange(1, 1, 1, tradeSheet.getLastColumn()).getValues()[0];
    var tStockCol = th.indexOf("Ticker");
    var tCurrCol = th.indexOf("幣別");
    if (tStockCol >= 0) {
      var td = tradeSheet.getRange(2, 1, tradeSheet.getLastRow() - 1, th.length).getValues();
      for (var i = 0; i < td.length; i++) {
        var ticker = String(td[i][tStockCol]).trim();
        var curr = tCurrCol >= 0 ? String(td[i][tCurrCol]).trim() : "USD";
        if (ticker && !existingTickers[ticker]) {
          newTickers[ticker] = { currency: curr };
        }
      }
    }
  }

  // 從帳戶事件表收集配息的 Ticker
  var acctSheet = ss.getSheetByName("帳戶事件表");
  if (acctSheet && acctSheet.getLastRow() >= 2) {
    var ah = acctSheet.getRange(1, 1, 1, acctSheet.getLastColumn()).getValues()[0];
    var aStockCol = ah.indexOf("Ticker");
    var aCurrCol = ah.indexOf("幣別");
    var aTypeCol = ah.indexOf("事件類型");
    if (aTypeCol === -1) aTypeCol = ah.indexOf("交易類型");
    if (aStockCol >= 0 && aTypeCol >= 0) {
      var ad = acctSheet.getRange(2, 1, acctSheet.getLastRow() - 1, ah.length).getValues();
      for (var i = 0; i < ad.length; i++) {
        if (String(ad[i][aTypeCol]) !== "配息") continue;
        var ticker = String(ad[i][aStockCol]).trim();
        var curr = aCurrCol >= 0 ? String(ad[i][aCurrCol]).trim() : "USD";
        if (ticker && !existingTickers[ticker]) {
          newTickers[ticker] = { currency: curr };
        }
      }
    }
  }

  // 新增到股票設定表
  var count = 0;
  for (var ticker in newTickers) {
    var info = newTickers[ticker];
    var market = info.currency === "TWD" ? "台股" : "美股";
    var newRow = priceSheet.getLastRow() + 1;

    // Ticker 欄
    if (tickerCol >= 0) priceSheet.getRange(newRow, tickerCol + 1).setValue(ticker);
    // 標的欄（暫填 Ticker，待手動修改為公司名）
    if (nameCol >= 0) priceSheet.getRange(newRow, nameCol + 1).setValue("（" + ticker + "）");
    // 市場欄
    if (marketCol >= 0) priceSheet.getRange(newRow, marketCol + 1).setValue(market);
    // 幣別欄
    if (currCol >= 0) priceSheet.getRange(newRow, currCol + 1).setValue(info.currency);
    // 現價公式
    if (priceCol >= 0) {
      var formula = market === "台股"
        ? '=IFERROR(GOOGLEFINANCE("TPE:"&B' + newRow + ',"price"),"")'
        : '=IFERROR(GOOGLEFINANCE(B' + newRow + ',"price"),"")';
      priceSheet.getRange(newRow, priceCol + 1).setFormula(formula);
    }
    // 更新時間公式
    if (timeCol >= 0) {
      priceSheet.getRange(newRow, timeCol + 1).setFormula('=IF(E' + newRow + '="","",NOW())');
    }

    count++;
    Logger.log("股票設定表新增: " + ticker + " (" + market + ")");
  }

  return count;
}

function recalcOnly() { recalcAll(); }

function syncStatusOnly() { syncStatusToMonday(); SpreadsheetApp.getUi().alert("狀態表同步到 Monday 完成！"); }

function recalcAndSyncAll() { syncEventsSilent("帳戶事件表",AE_BOARD_ID,AE_GROUP_ID,buildAEItem); syncEventsSilent("股票事件表",TE_BOARD_ID,TE_GROUP_ID,buildTEItem); syncEventsSilent("定存事件表",DE_BOARD_ID,DE_GROUP_ID,buildDEItem); recalcAll(); syncStatusToMonday(); SpreadsheetApp.getUi().alert("重算 + 同步全部完成！"); }

function syncEventsSilent(sn,bid,gid,bf) { var s=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sn); if(!s||s.getLastRow()<2)return; var h=s.getRange(1,1,1,s.getLastColumn()).getValues()[0]; getSyncColIndex(s,h); h=s.getRange(1,1,1,s.getLastColumn()).getValues()[0]; var si=getColumnIndex(h,"同步狀態"); var p=[]; for(var r=2;r<=s.getLastRow();r++){var d=s.getRange(r,1,1,h.length).getValues()[0];if(d[si]==="已同步")continue;var it=bf(h,d);if(it)p.push({row:r,item:it});} for(var i=0;i<p.length;i+=BATCH_SIZE){var b=p.slice(i,i+BATCH_SIZE);if(batchCreateItems(bid,gid,b.map(function(x){return x.item;}))){for(var j=0;j<b.length;j++){s.getRange(b[j].row,si+1).setValue("已同步");}}Utilities.sleep(1000);} }

function syncStatusToMonday() { var ss=SpreadsheetApp.getActiveSpreadsheet(); for(var k in STATUS_BOARDS){syncOneStatusBoard(ss,STATUS_BOARDS[k]);} }

function syncOneStatusBoard(ss, config) {
  var sheet = ss.getSheetByName(config.sheetName); if (!sheet || sheet.getLastRow() < 2) return;
  clearMondayBoard(config.boardId);
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getValues();
  var items = [];
  for (var i = 0; i < data.length; i++) {
    var row = {}; for (var j = 0; j < headers.length; j++) { row[headers[j]] = data[i][j]; }
    var colVals = {};
    for (var cn in config.columns) { var cid = config.columns[cn]; var v = row[cn]; if (v === undefined || v === null || v === "") continue;
      if (cid.indexOf("numeric") === 0) { colVals[cid] = Number(v) || 0; }
      else if (cid.indexOf("date") === 0) { try { colVals[cid] = Utilities.formatDate(new Date(v), "Asia/Taipei", "yyyy-MM-dd"); } catch(e) { colVals[cid] = String(v); } }
      else { colVals[cid] = String(v); } }
    items.push({ name: config.nameField(row), columnValues: colVals });
  }
  for (var i = 0; i < items.length; i += BATCH_SIZE) { batchCreateItems(config.boardId, config.groupId, items.slice(i, i + BATCH_SIZE)); Utilities.sleep(1000); }
}

function clearMondayBoard(boardId) {
  try { var r = UrlFetchApp.fetch(MONDAY_API, { method: "post", contentType: "application/json", headers: { "Authorization": MONDAY_TOKEN }, payload: JSON.stringify({ query: '{ boards(ids: ' + boardId + ') { items_page(limit: 200) { items { id } } } }' }), muteHttpExceptions: true });
    var items = JSON.parse(r.getContentText()).data.boards[0].items_page.items; if (items.length === 0) return;
    for (var i = 0; i < items.length; i += 5) { var b = items.slice(i, i + 5); var m = b.map(function(it, j) { return "d" + j + ": delete_item(item_id: " + it.id + ") { id }"; });
      UrlFetchApp.fetch(MONDAY_API, { method: "post", contentType: "application/json", headers: { "Authorization": MONDAY_TOKEN }, payload: JSON.stringify({ query: "mutation { " + m.join(" ") + " }" }), muteHttpExceptions: true }); Utilities.sleep(1000); }
  } catch (e) { Logger.log("清除失敗: " + e.toString()); }
}

function markAllSynced() {
  var ui = SpreadsheetApp.getUi(); if (ui.alert("確認", "標記所有事件為已同步？", ui.ButtonSet.YES_NO) !== ui.Button.YES) return;
  var sheets = ["帳戶事件表", "股票事件表", "定存事件表"]; var total = 0;
  for (var s = 0; s < sheets.length; s++) { var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheets[s]); if (!sh || sh.getLastRow() < 2) continue;
    var h = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0]; getSyncColIndex(sh, h); h = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0]; var sc = getColumnIndex(h, "同步狀態") + 1;
    for (var r = 2; r <= sh.getLastRow(); r++) { if (sh.getRange(r, 2).getValue()) { sh.getRange(r, sc).setValue("已同步"); total++; } } }
  ui.alert("已標記 " + total + " 筆");
}
