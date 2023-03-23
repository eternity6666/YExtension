document.getElementById("search").addEventListener("click", async () => {
  fundId = document.getElementById("inputArea").value
  console.log(`fundId=${fundId}`)
  if (fundId.length <= 0) return undefined;
  recordToStorage(fundId)
  url = "https://api.doctorxiong.club/v1/fund/detail/list?code=" + fundId
  ajaxGet(url, function (result) {
      // console.log(result);
      document.getElementById("result").innerHTML = ""
      var resultString = buildResult(result["data"][0])
      // console.log(resultString)
      document.getElementById("result").innerHTML = resultString
  })
})

function buildResult(data) {
  var resultString = "";
  for (var key in data) {
      if (Array.isArray(data[key])) {
        // console.log("array " + key +": " + data[key])
        resultString += "<p>" + key + "</p>";
        resultString += "<table>"
        resultString += "<thead><tr><th>时间</th><th>价值</th><th>涨幅</th><th>备注</th></tr></thead>"
        resultString += "<tbody>"
        for (var index in data[key]) {
          var item = data[key][index]
          if (Array.isArray(item)) {
            resultString += "<tr>"
            for (var value in item) {
              resultString += "<td>" + item[value] + "</td>"
            }
            resultString += "</tr>"
          } else {
            resultString += item + "\n"
          }
        }
        resultString += "</tbody>"
        resultString += "</table>"
        resultString += "<p></p>"
      } else {
        resultString += "<p>" + key + ": " + data[key] + "</p>";
      }
  }
  return resultString;
}

const KEY_FUND_LIST = "key_fund_lists"

/**
 * 将 fundId 存储到 Storage
 */
function recordToStorage(fundId) {
  if (fundId.length == 0) {
    return;
  }
  // chrome.storage.sync.get(KEY_FUND_LIST, [])
  // chrome.storage.sync.set({})
}

function ajaxGet(url, success) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send();

  xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        success(JSON.parse(xhr.response));
      }
  }
}