# JSON Viewer Pro

JSON Viewer Pro 是一个 Chrome 扩展程序，用于格式化和美化 JSON 响应。它支持 JSON 节点的折叠和展开，显示请求的 URL，并允许用户自定义配色主题。

## 功能

1. 当浏览器请求的 URL 返回 JSON 响应时，格式化 JSON 并美化展示在页面上。
2. 支持 JSON 节点的折叠和展开。
3. 页面头部显示请求的 URL 和一个按钮，点击可以显示未格式化的原始内容。
4. 支持自定义配色主题，默认使用浅色系，配色调整的功能在点击插件时浏览器右上角弹窗操作。
5. 尽量保持界面美观。

## 安装方法

### 从源码安装

1. 克隆或下载此仓库到本地：

    ```bash
    git clone https://github.com/yourusername/json-viewer-pro.git
    cd json-viewer-pro
    ```

2. 打开 Chrome 浏览器，进入扩展程序管理页面：

    ```plaintext
    chrome://extensions/
    ```

3. 打开右上角的“开发者模式”。

4. 点击左上角的“加载已解压的扩展程序”按钮。

5. 选择克隆或下载的 `json-viewer-pro` 文件夹。

6. 扩展程序将被加���到 Chrome 浏览器中。

### 从 Chrome 网上应用店安装

（如果您计划将扩展程序发布到 Chrome 网上应用店，可以在这里添加相关链接和说明）

## 使用方法

1. 安装扩展程序后，当您访问返回 JSON 响应的 URL 时，JSON 将被自动格式化和美化展示。

2. 页面头部会显示请求的 URL 和一个“显示原始内容”按钮。点击按钮可以切换显示原始未格式化的 JSON 内容。

3. 点击浏览器右上角的扩展程序图标，可以打开设置弹窗，调整配色主题。

## 自定义配色主题

1. 点击浏览器右上角的扩展程序图标，打开设置弹窗。

2. 在弹窗中，您可以调整背景颜色、文本颜色、键名颜色、值颜色、字符串颜色、数字颜色、布尔值颜色和 null 颜色。

3. 调整完成后，点击“保存主题”按钮，设置将被保存并应用到 JSON 展示中。

## 开发和贡献

如果您想为此项目做出贡献，请遵循以下步骤：

1. Fork 此仓库。

2. 创建一个新的分支：

    ```bash
    git checkout -b feature-branch
    ```

3. 提交您的更改：

    ```bash
    git commit -m "Add some feature"
    ```

4. 推送到分支：

    ```bash
    git push origin feature-branch
    ```

5. 创建一个 Pull Request。

## 许可证

此项目使用 MIT 许可证。有关更多信息，请参阅 [LICENSE](LICENSE) 文件。
