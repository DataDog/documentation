---
app_id: vscode
app_uuid: 93a7b892-5393-4f40-896a-905b553a7669
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- developer tools
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: vscode
integration_id: vscode
integration_title: Visual Studio Code
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: vscode
public_title: Visual Studio Code
short_description: Datadog Extension for VS Code
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Developer Tools
  configuration: README.md#Setup
  description: Datadog Extension for VS Code
  media:
  - caption: Error Tracking insights in VS Code
    image_url: images/overview.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: その他
    url: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
  support: README.md#Support
  title: Visual Studio Code
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

The [Datadog Extension for VS Code][1] helps you improve your software by providing code-level insights directly in the IDE, based on real-time observability data from:

- Logs
- Error Tracking
- CI Visibility
- Application Security Management
- Synthetics
- 静的分析

## セットアップ

### インストール

From Visual Studio Code:

1. Click **Plugins** and search for `Datadog`, or find the [Datadog Extension in the Microsoft Marketplace][2].
2. **Install** をクリックすると、プラグインがダウンロードされ、IDE にインストールされます。
3. Datadog がサードパーティのプラグインであることを通知するプロンプトが表示された場合、**Accept** をクリックします。
4. **Restart IDE** をクリックします。

### 構成

The plugin settings are found within the IDE settings, under **Datadog**.

Select the Datadog services relevant to your project from the plugin settings.

### 参考資料

- [Datadog Extension in the Microsoft Marketplace][2]

## サポート

Need help? Contact [Datadog support][3] or open an [issue on GitHub][4].

[1]: https://docs.datadoghq.com/ja/developers/ide_integrations/vscode/
[2]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://github.com/DataDog/datadog-for-vscode