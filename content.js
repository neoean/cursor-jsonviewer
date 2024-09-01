function formatJSON(json) {
  let lineNumber = 1;

  function createNode(key, value, isLast = false, isRoot = false, isArrayItem = false) {
    const li = document.createElement('li');
    li.dataset.lineNumber = lineNumber++;

    if (!isRoot && !isArrayItem) {
      const keySpan = document.createElement('span');
      keySpan.textContent = `"${key}": `;
      keySpan.classList.add('json-key');
      li.appendChild(keySpan);
    }

    if (typeof value === 'object' && value !== null) {
      const isArray = Array.isArray(value);
      const openBracket = document.createTextNode(isArray ? '[' : '{');
      li.appendChild(openBracket);

      if (Object.keys(value).length > 0) {
        const ul = document.createElement('ul');
        li.appendChild(ul);
        const entries = Object.entries(value);
        entries.forEach(([k, v], index) => {
          ul.appendChild(createNode(k, v, index === entries.length - 1, false, isArray));
        });

        const collapsible = document.createElement('span');
        collapsible.classList.add('collapsible');
        collapsible.onclick = function() {
          this.classList.toggle('collapsed');
          ul.style.display = ul.style.display === 'none' ? '' : 'none';
        };
        li.insertBefore(collapsible, li.firstChild);
      }

      const closeBracket = document.createTextNode(isArray ? ']' : '}');
      li.appendChild(closeBracket);
    } else {
      const valueSpan = document.createElement('span');
      valueSpan.textContent = JSON.stringify(value);
      valueSpan.classList.add('json-value');
      valueSpan.classList.add(`json-${typeof value}`);
      li.appendChild(valueSpan);
    }

    if (!isLast && !isRoot) {
      li.appendChild(document.createTextNode(','));
    }

    return li;
  }

  const root = document.createElement('ul');
  root.classList.add('json-tree');
  root.appendChild(createNode(null, json, true, true));

  return root;
}

function addLineNumbers(element) {
  const lineNumbersContainer = document.createElement('div');
  lineNumbersContainer.className = 'line-numbers';

  const lines = element.querySelectorAll('li');
  lines.forEach((line, index) => {
    const lineNumber = document.createElement('span');
    lineNumber.textContent = index + 1;
    lineNumbersContainer.appendChild(lineNumber);
  });

  const container = document.createElement('div');
  container.className = 'json-container';
  container.appendChild(lineNumbersContainer);
  container.appendChild(element);

  return container;
}

function createHeader(url) {
  const header = document.createElement('div');
  header.className = 'json-viewer-header';
  header.innerHTML = `
    <span>URL: ${url}</span>
    <button id="toggleRaw">显示原始内容</button>
  `;
  return header;
}

function init() {
  // 检查是否是纯 JSON 响应
  if (document.contentType && document.contentType.includes('application/json')) {
    const jsonContent = document.body.textContent.trim();
    try {
      const parsedJSON = JSON.parse(jsonContent);
      const formattedJSON = formatJSON(parsedJSON);
      const jsonWithLineNumbers = addLineNumbers(formattedJSON);
      
      document.body.innerHTML = '';
      const viewerContainer = document.createElement('div');
      viewerContainer.className = 'json-viewer-container';
      viewerContainer.appendChild(createHeader(window.location.href));
      viewerContainer.appendChild(jsonWithLineNumbers);
      document.body.appendChild(viewerContainer);
      
      // 添加切换原始内容的功能
      document.getElementById('toggleRaw').addEventListener('click', () => {
        const jsonTree = document.querySelector('.json-tree');
        const lineNumbers = document.querySelector('.line-numbers');
        const pre = document.querySelector('.json-raw');
        if (jsonTree.style.display !== 'none') {
          if (!pre) {
            const preElement = document.createElement('pre');
            preElement.className = 'json-raw';
            preElement.textContent = jsonContent;
            viewerContainer.appendChild(preElement);
          }
          jsonTree.style.display = 'none';
          lineNumbers.style.display = 'none';
          document.querySelector('.json-raw').style.display = 'block';
        } else {
          jsonTree.style.display = '';
          lineNumbers.style.display = '';
          document.querySelector('.json-raw').style.display = 'none';
        }
      });
    } catch (e) {
      console.error('无法解析JSON:', e);
    }
  } else {
    console.log('Not a JSON response or body is not empty.');
  }
}

// 检查是否是 JSON 响应
if (document.contentType && document.contentType.includes('application/json')) {
  // 等待页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

// 在init函数的末尾添加
chrome.storage.sync.get(['theme'], function(result) {
  if (result.theme) {
    applyTheme(result.theme);
  }
});

function applyTheme(theme) {
  const style = document.createElement('style');
  style.textContent = `
    .json-viewer-container { background-color: ${theme.bgColor}; color: ${theme.textColor}; }
    .json-viewer-container .json-key { color: ${theme.keyColor || '#8B4513'}; } /* 默认棕色 */
    .json-viewer-container .json-value { color: ${theme.valueColor || '#008000'}; } /* 默认绿色 */
    .json-viewer-container .json-string { color: ${theme.stringColor || '#008000'}; }
    .json-viewer-container .json-number { color: ${theme.numberColor || '#008000'}; }
    .json-viewer-container .json-boolean { color: ${theme.booleanColor || '#008000'}; }
    .json-viewer-container .json-null { color: ${theme.nullColor || '#008000'}; }
  `;
  document.head.appendChild(style);
}

// 添加消息监听器以更新主题
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateTheme') {
    applyTheme(request.theme);
  }
});