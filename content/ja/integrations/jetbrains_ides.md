---
app_id: jetbrains-ides
app_uuid: f27e2abf-7827-46f8-bddb-266a0c1acd9f
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
git_integration_title: jetbrains_ides
integration_id: jetbrains-ides
integration_title: JetBrains IDE
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: jetbrains_ides
public_title: JetBrains IDE
short_description: Datadog Plugin for IntelliJ IDEA, GoLand, PhpStorm, and PyCharm
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
  description: Datadog Plugin for IntelliJ IDEA, GoLand, PhpStorm, and PyCharm
  media:
  - caption: Error Tracking insights in IntelliJ IDEA
    image_url: images/overview.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: other
    url: https://plugins.jetbrains.com/plugin/19495-datadog
  support: README.md#Support
  title: JetBrains IDE
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## Overview

The [Datadog Plugin for JetBrains IDEs][1] is available for IntelliJ IDEA, GoLand, PhpStorm, and PyCharm. It helps you improve your software by providing code-level insights directly in the IDE, based on real-time observability data from:

- Logs
- Profiling
- Error Tracking
- CI Visibility
- Application Security Management
- Static Analysis

## Setup

### Installation

From your JetBrains IDE:

1. Go to **Settings > Plugins**.
2. Search for `Datadog`.
3. Click **Install** to download and install the plugin in your IDE.
4. If you receive a prompt notifying you that Datadog is a third-party plugin, click **Accept**.
5. Restart the IDE.
6. When prompted to log in to Datadog, click the **Log-in** button. Your browser opens to the Datadog login page.

### Configuration

Select the Datadog services relevant to your project from the plugin settings.

The plugin settings are found within the IDE settings, under **Datadog**.

### View in IDE

The **View in IDE** feature provides a link from the Datadog platform directly to your source files.

To use the **View in IDE** feature, the plugin requires the [JetBrains Toolbox][2] to be installed.

### Further reading

- [Datadog Plugin in the JetBrains Marketplace][3]

## Support

Need help? Contact [Datadog support][4] or open an [issue on GitHub][5].

[1]: https://docs.datadoghq.com/ja/developers/ide_integrations/idea/
[2]: https://www.jetbrains.com/toolbox-app/
[3]: https://plugins.jetbrains.com/plugin/19495-datadog
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://github.com/DataDog/datadog-for-intellij-platform