---
title: Datadog Extension for Visual Studio Code
kind: documentation
description: Learn how to run Synthetic tests on local environments directly in VS Code.
is_beta: true
aliases:
- /developers/ide_integrations/vscode/
further_reading:
- link: /getting_started/synthetics/
  tag: Documentation
  text: Getting Started with Synthetic Monitoring
- link: /continuous_testing/
  tag: Documentation
  text: Learn about Continuous Testing
- link: /integrations/guide/source-code-integration/
  tag: Documentation
  text: Learn about Source Code Integration.
- link: "https://www.datadoghq.com/blog/datadog-ide-plugins/"
  tag: Blog
  text: Reduce context switching while troubleshooting with Datadog's IDE plugins
---

## Overview

The Datadog extension for Visual Studio Code (VS Code) integrates with Datadog to accelerate your development.

{{< img src="/developers/ide_plugins/vscode/datadog-vscode.png" alt="The Datadog for VS Code extension" style="width:100%;" >}}

It packs several features, including:

- [**Code Insights**](#code-insights) to keep you informed about

  - [エラー追跡][10]からの問題
  - Reports by [Application Vulnerability Management][11]
  - CI Visibilityで検出された[不安定なテスト][12]

- [**Synthetic Tests**](#synthetic-tests) to provide quality assurance during development by allowing you to run existing Synthetic Tests against local servers.


- [**View in VS Code**](#view-in-vs-code) to directly go from your file references on the Datadog platform to your source files.

- [**Logs Navigation**](#logs-navigation) to allow you to search for logs from your code.

- [**Code Delta**](#code-delta) to more accurately map observability data to your files in VS Code.

- [**Static Analysis**](#static-analysis) to detect and fix problems even before you commit changes.

## 要件

- **A Datadog account**: The extension requires a Datadog account (except when using [Static Analysis][14] features). If you're new to Datadog, go to the [Datadog website][2] to learn more about Datadog's observability tools and sign up for a free trial.

- **VS Code Git**: The extension works better when VS Code Git integration is enabled. You can ensure that the integration is enabled by checking the `git.enabled` setting.

## セットアップ

Visual Studio Marketplace から [Datadog 拡張機能][6]をインストールします。

## コードインサイト

**Code Insights** ツリーには、Datadog プラットフォームによって生成された、コードベースに関連するインサイトが表示されます。洞察は、パフォーマンス、信頼性、セキュリティの 3 つのカテゴリーに分類されます。

{{< img src="/developers/ide_plugins/vscode/code-insights.png" alt="The Code Insights view." style="width:100%;" >}}

Code Insights には、各問題の詳細な説明と以下へのリンクが含まれています。

- 関連するソースコードの場所
- Datadog プラットフォーム (追加情報が得られます)

You can dismiss individual Code Insights and set filters to view the ones you are most interested in.

## Synthetic テスト

The Datadog extension enables you to [run Synthetic HTTP tests and browser tests on local environments][1] directly in VS Code. You can identify and address potential issues resulting from code changes before they are deployed into production and impact your end users.

<div class="alert alert-info">We support <a href="https://docs.datadoghq.com/synthetics/api_tests/http_tests/?tab=requestoptions">HTTP API tests</a> and <a href=" https://docs.datadoghq.com/synthetics/browser_tests/?tab=requestoptions">Browser tests</a>.</div>


{{< img src="developers/ide_plugins/vscode/vscode-extension-demo.png" alt="The Datadog Extension in VS Code" style="width:100%;" >}}

### Synthetic テストをローカルで実行する

1. 実行する Synthetic テストを選択します。**Search** アイコンをクリックすると、特定のテストを検索することができます。
2. テストの構成を変更して、開始 URL を変換し、**Settings** ページで `localhost` URL を指定します。
3. テストを実行します。

{{< img src="developers/ide_plugins/vscode/test_configuration_modified_starturl.png" alt="The Test Configuration panel and Settings page where you can specify the start URL of a Synthetics test to a localhost URL" style="width:100%;" >}}

If you haven't set up Synthetic tests already, [create a test in Datadog][3]. For more information about running tests on a local environment, see [Getting Started with API Tests][4], [Getting Started with Browser Tests][5], and the [Continuous Testing documentation][1].

### 権限

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][7]を持つユーザーのみが、Synthetic HTTP およびブラウザテストを作成、編集、削除できます。Synthetic HTTP およびブラウザテストの作成、編集、削除アクセスを取得するには、ユーザーをこれら 2 つの[デフォルトのロール][7]のいずれかにアップグレードします。

[カスタムロール機能][8]を使用している場合は、`synthetics_read` および `synthetics_write` 権限を含むカスタムロールにユーザーを追加します。

## View in VS Code

**View in VS Code** 機能は、Datadog から直接ソースファイルへのリンクを提供します。UI 上に表示されるスタックトレース (例えば、[エラー追跡][10]) のフレームの横にあるボタンを探してください。

{{< img src="/developers/ide_plugins/vscode/view-in-vscode.png" alt="A stack trace on the Datadog platform showing the View in VS Code button." style="width:100%;" >}}

<div class="alert alert-info">この機能を使用するには、まず、サービスの<a href="/integrations/guide/source-code-integration/">ソースコードインテグレーション</a>を構成します。</div>

## ログナビゲーション

You can navigate to the [Log Explorer][28] on the [Datadog platform][2] directly from your source code files.

If you're using a supported logging library, the extension is able to show you code lenses on the lines where it has detected log patterns that match the Datadog platform records:

{{< img src="/developers/ide_plugins/vscode/logs_navigation.mp4" alt="Preview of Logs Navigation" style="width:100%" video=true >}}

The supported logging libraries are:

- JavaScript
  - [@datadog/browser-logs][16]
  - [Winston][17]
  - [Pino][18]
  - [Bunyan][19]
  - [Log4js][20]
- Python
  - [logging][21]

Alternatively, you can select some text in your source code, right click on them, and look for the **Datadog > Search Logs With Selected Text** option.

{{< img src="developers/ide_plugins/vscode/log_search.png" alt="Using the Datadog Logs explorer feature" style="width:100%;" >}}

## Code Delta

Code Delta matches the line numbers included in Datadog telemetry to the line numbers of the files you are currently working on in VS Code.

For example, all [View in VS Code](#view-in-vs-code) links on the Datadog platform encode runtime version info, and the extension uses that to compute the corresponding line of code in your editor, taking into account version changes.

You can tweak the Code Delta settings to change how the matching algorithm works. In particular, you can modify the `Minimum Affinity` value, which determines the degree of confidence required to match lines.

## 静的分析

The [Static Analysis][14] integration analyzes your code (locally) against predefined rules to detect and fix problems.

The Datadog extension runs [Static Analysis][14] rules on the source files you have open in your Workspace. The goal is to detect and fix problems such as maintainability issues, bugs, or security vulnerabilities in your code before you commit your changes.

[Static Analysis][14] supports scanning for many programming languages. For a complete list, see [Static Analysis Rules][15]. For file types belonging to supported languages, issues are shown in the source code editor with the VS Code inspection system, and suggested fixes can be applied directly.

{{< img src="/developers/ide_plugins/vscode/static_analysis.mp4" alt="Preview of Static Analysis" style="width:100%" video=true >}}

### はじめに

When you start editing a source file, the extension checks for [static-analysis.datadog.yml][22] at your source repository's root. It prompts you to create it if necessary.

{{< img src="/developers/ide_plugins/vscode/static-analysis-onboard.png" alt="A banner for onboarding." style="width:100%;" >}}

Once the configuration file is created, the static analyzer runs automatically in the background.

<div class="alert alert-info">The Static Analysis feature does not require a Datadog account, as source files are analyzed locally.</div>

## ライセンス

Please read this [End-User License Agreement][23] carefully before downloading or using the Datadog Visual Studio Code Extension.

## Data and telemetry

Datadog anonymously collects information about your usage of this IDE, including how you interact with it, whether errors occurred while using it, and what caused those errors, in accordance with the [Datadog Privacy Policy][24] and Datadog's [VS Code extension EULA][23].

If you don't wish to send this data to [Datadog][2], you can opt out at any time in the VS Code extension settings: `Datadog > Telemetry > Setup > Enable Telemetry` and select `disabled`.

<div class="alert alert-info">The Datadog extension also honors the <a href="https://code.visualstudio.com/docs/getstarted/telemetry#_output-channel-for-telemetry-events">VS Code telemetry</a> telemetry setting.</div>

## Help and feedback

To share your feedback, email [team-ide-integration@datadoghq.com][9] or create an issue in the extension's [public repository][26].

Check out the [issues][27] section to discover known issues.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_testing/
[2]: https://www.datadoghq.com/
[3]: https://app.datadoghq.com/synthetics/create
[4]: /getting_started/synthetics/api_test
[5]: /getting_started/synthetics/browser_test
[6]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[7]: /account_management/rbac/?tab=datadogapplication#datadog-default-roles
[8]: /account_management/rbac/?tab=datadogapplication#custom-roles
[9]: mailto:team-ide-integration@datadoghq.com
[10]: /tracing/error_tracking/
[11]: /security/application_security/vulnerability_management/
[12]: /continuous_integration/guides/flaky_test_management/
[13]: /watchdog/insights
[14]: /continuous_integration/static_analysis/?tab=githubactions
[15]: /continuous_integration/static_analysis/rules/
[16]: /logs/log_collection/javascript/
[17]: https://github.com/winstonjs/winston
[18]: https://github.com/pinojs/pino
[19]: https://github.com/trentm/node-bunyan
[20]: https://github.com/log4js-node/log4js-node
[21]: https://docs.python.org/3/library/logging.html
[22]: /continuous_integration/static_analysis/?tab=circleciorbs#setup
[23]: https://www.datadoghq.com/legal/eula/
[24]: https://www.datadoghq.com/legal/privacy/
[25]: https://code.visualstudio.com/docs/getstarted/telemetry#_output-channel-for-telemetry-events
[26]: https://github.com/DataDog/datadog-for-vscode
[27]: https://github.com/DataDog/datadog-for-vscode/issues?q=is%3Aissue+label%3A%22known+issue%22
[28]: /logs/explorer/
