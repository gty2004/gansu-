# GitHub Pages 部署步骤

## 方式一：网页上传，最简单

1. 登录 GitHub。
2. 新建仓库，例如 `gansu-culture-web`，设为 Public。
3. 进入仓库，点击 `Add file` -> `Upload files`。
4. 上传本文件夹里的所有内容：
   - `index.html`
   - `qr.html`
   - `assets/`
   - `.nojekyll`
   - `README.md`
5. 点击 `Commit changes`。
6. 打开仓库 `Settings` -> `Pages`。
7. `Build and deployment` 选择：
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
8. 保存后等待 1-3 分钟。

部署完成后访问：

```text
https://你的GitHub用户名.github.io/gansu-culture-web/
```

二维码页：

```text
https://你的GitHub用户名.github.io/gansu-culture-web/qr.html
```

## 方式二：用户名主页仓库

如果仓库名设置为：

```text
你的GitHub用户名.github.io
```

那么部署地址会是：

```text
https://你的GitHub用户名.github.io/
```

二维码页：

```text
https://你的GitHub用户名.github.io/qr.html
```

## 注意

- 主网页图片已放在 `assets/images/`，GitHub Pages 可直接长期显示。
- 视频卡片是央视网等外部链接，点击观看视频需要联网。
- `qr.html` 会根据当前部署地址自动生成二维码，支持 GitHub Pages 的 `/仓库名/` 路径。
