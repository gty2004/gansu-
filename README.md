# 甘肃传统文化二维码网页

这是一个可独立运行的静态网页项目，包含：

- `index.html`：甘肃传统文化与经典建筑展示页，含图片、文字、3D 动画和扫码入口。
- `qr.html`：二维码页，内置二维码生成脚本，默认指向当前公网隧道地址。
- `assets/images/`：网页使用的本地图片素材。
- `start-server.bat`：Windows 一键启动本地服务脚本。
- `.nojekyll`：GitHub Pages 静态部署配置文件。
- `GITHUB_PAGES_DEPLOY.md`：GitHub Pages 上传部署说明。

主要网页图片已经打包到本地，不依赖外部图片服务。文化视频卡片是央视网等外部视频链接，观看视频需要联网。

## 本地预览

### PyCharm 运行

1. 在 PyCharm 中打开本文件夹。
2. 打开 `run_server.py`。
3. 点击运行按钮。
4. 浏览器访问：

```text
http://localhost:4173/
```

二维码页：

```text
http://localhost:4173/qr.html
```

### 命令行运行

在当前目录启动服务：

```powershell
python -m http.server 4173 --bind 0.0.0.0
```

电脑打开：

```text
http://localhost:4173/
```

电脑打开二维码页：

```text
http://localhost:4173/qr.html
```

公网手机扫码访问：

```text
https://c5683e7d780303.lhr.life/
```

长期公网访问建议部署到 GitHub Pages。部署后打开线上 `qr.html`，二维码会自动指向当前 GitHub Pages 网页地址。

如果需要临时指定二维码地址，打开 `qr.html?data=新的网址` 即可生成新的二维码。
