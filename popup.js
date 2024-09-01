document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById("saveTheme");
  const colorInputs = document.querySelectorAll('input[type="color"]');

  // 设置默认颜色
  const defaultTheme = {
    bgColor: "#f5f5f5",
    textColor: "#f5f5f5",
    keyColor: "#8B4513",
    valueColor: "#008000",
    stringColor: "#008000",
    numberColor: "#008000",
    booleanColor: "#008000",
    nullColor: "#008000",
  };

  // 加载保存的主题或使用默认主题
  chrome.storage.sync.get(["theme"], function (result) {
    const theme = result.theme || defaultTheme;
    colorInputs.forEach((input) => {
      input.value = theme[input.id];
    });
  });

  saveButton.addEventListener("click", function () {
    const theme = {};
    colorInputs.forEach((input) => {
      theme[input.id] = input.value;
    });

    chrome.storage.sync.set({ theme: theme }, function () {
      console.log("主题已保存");
      // 向content script发送消息以更新主题
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "updateTheme",
          theme: theme,
        });
      });
    });
  });
});
