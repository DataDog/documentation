---
app_id: visual-studio
app_uuid: ee8a2962-c923-492c-9198-c851f520a0e0
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
git_integration_title: visualstudio
integration_id: visual-studio
integration_title: Visual Studio
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: visualstudio
public_title: Visual Studio
short_description: Visual Studio の Datadog 拡張機能
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::Developer Tools
  configuration: README.md#Setup
  description: Visual Studio の Datadog 拡張機能
  media:
  - caption: Error Tracking insights in Visual Studio
    image_url: images/overview.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: other
    url: https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio
  support: README.md#Support
  title: Visual Studio
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## Overview

The [Datadog Extension for Visual Studio][1] helps you improve your software by providing code-level insights directly in the IDE, based on real-time observability data from:

- Logs
- Profiling
- Error Tracking
- CI Visibility
- Application Security Management
- Static Analysis

## Setup

### Installation

1. Download and install the extension from the [Visual Studio Marketplace][2].
2. In Visual Studio, go to **Tools > Options > Datadog**.
3. Sign in with your Datadog account.

### Configuration

Select the Datadog services relevant to your project from the plugin settings.

1. Open a solution in Visual Studio.
2. Go to **Extensions > Datadog > Linked Services**.
3. Add services, and save your solution.

### Further reading

- [Datadog Extension in the Microsoft Marketplace][2]

## Support

Need help? Contact [Datadog support][3] or open an [issue on GitHub][4].

[1]: https://docs.datadoghq.com/ja/developers/ide_integrations/visual_studio/
[2]: https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://github.com/DataDog/datadog-for-visual-studio