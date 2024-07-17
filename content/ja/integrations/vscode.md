---
app_id: vscode
app_uuid: 93a7b892-5393-4f40-896a-905b553a7669
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- 開発ツール
custom_kind: integration
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
  - resource_type: other
    url: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
  support: README.md#Support
  title: Visual Studio Code
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## Overview

The [Datadog Extension for VS Code][1] helps you improve your software by providing code-level insights directly in the IDE, based on real-time observability data from:

- Logs
- Error Tracking
- CI Visibility
- Application Security Management
- Synthetics
- Static Analysis

## Setup

### Installation

From Visual Studio Code:

1. Click **Plugins** and search for `Datadog`, or find the [Datadog Extension in the Microsoft Marketplace][2].
2. Click **Install** to download and install the plugin in your IDE.
3. If you receive a prompt notifying you that Datadog is a third-party plugin, click **Accept**.
4. Click **Restart IDE**.

### Configuration

The plugin settings are found within the IDE settings, under **Datadog**.

Select the Datadog services relevant to your project from the plugin settings.

### Further reading

- [Datadog Extension in the Microsoft Marketplace][2]

## Support

Need help? Contact [Datadog support][3] or open an [issue on GitHub][4].

[1]: https://docs.datadoghq.com/ja/developers/ide_integrations/vscode/
[2]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://github.com/DataDog/datadog-for-vscode