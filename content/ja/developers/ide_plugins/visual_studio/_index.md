---
title: Datadog Extension for Visual Studio
is_beta: true
aliases:
- /developers/ide_integrations/visual_studio/
further_reading:
- link: /getting_started/profiler/
  tag: Documentation
  text: Getting started with the Continuous Profiler
- link: /integrations/guide/source-code-integration/
  tag: Documentation
  text: Learn about Source Code Integration
- link: /code_analysis/static_analysis
  tag: ドキュメント
  text: Learn about Static Analysis
- link: "https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio"
  tag: 外部サイト
  text: Visual Studio Marketplace  
- link: "https://www.datadoghq.com/blog/datadog-ide-plugins/"
  tag: ブログ
  text: Reduce context switching while troubleshooting with Datadog's IDE plugins
---

## 概要

Visual Studio 用の Datadog 拡張機能を使用すると、サービスやランタイム環境からのリアルタイムの可観測性データに基づいて、バグ、セキュリティ問題、パフォーマンスボトルネックを検出して修正することができます。

{{< img src="/developers/ide_plugins/visual_studio/datadog-for-visual-studio.png" alt="Datadog extension for Visual Studio">}}

### Code insights

[Error Tracking][5] の問題、[Security Vulnerabilities][6]、[Flaky Tests][10]、[Watchdog][7] のプロファイリングに関する洞察を、Visual Studio にいながらにして入手できます。

{{< img src="/developers/ide_plugins/visual_studio/code-insights.png" alt="The Code Insights view" >}}

### Continuous Profiler

CPU、メモリ、I/O などのリアルタイムプロファイリングメトリクスでアプリケーションのパフォーマンスを分析し、改善します。

{{< img src="/developers/ide_plugins/visual_studio/top-list.png" alt="The Code Insights view">}}

### ログナビゲーション

You can navigate to the [Log Explorer][18] on the Datadog platform directly from your C# source files. Look for the clickable icon preceding message strings from log statements within your source code:

{{< img src="/developers/ide_plugins/visual_studio/logs-navigation.png" alt="A source file showing log lines with clickable icons." style="width:100%;" >}}

Clicking the icon opens the **Log Explorer** with a query that matches the logger name, log level, and log message as closely as possible.

### Datadog から Visual Studio にコードを開く

Datadog からソースコードへワンクリックで移動できます。

{{< img src="/developers/ide_plugins/visual_studio/view-in-visual-studio.png" alt="A stack trace on the Datadog platform showing the View in Visual Studio button.">}}

### 静的分析

The Datadog extension runs [Static Analysis][19] rules on the source files you have open in your Solution. The goal is to detect and fix problems such as maintainability issues, bugs, or security vulnerabilities in your code before you commit your changes.

Static Analysis supports scanning for many programming languages. For a complete list, see [Static Analysis Rules][20]. For file types belonging to supported languages, rule violations are highlighted in the source code editor, and suggested fixes can be applied directly:

{{< img src="/developers/ide_plugins/visual_studio/static-analysis-issue.png" alt="A static analysis rule violation." style="width:100%;" >}}

When you start editing a source file supported by Static Analysis, the extension checks for `static-analysis.datadog.yml` at your source repository's root. The static analyzer runs automatically in the background.

<div class="alert alert-info">The Static Analysis feature does not require a Datadog account, as source files are analyzed locally.</div>

## はじめに

### 要件

* Windows オペレーティングシステム 64 ビット
* Visual Studio 2022 64 ビット Community、Professional、または Enterprise エディション
* [Continuous Profiler][8] と[ソースコードインテグレーション][12]を有効にした Datadog アカウント。詳細については、[プロファイラーを有効にする][13]を参照してください。

### セットアップとインストール

1. 公式の [Visual Studio Marketplace][17] から拡張機能をダウンロードしてインストールします。
2. Visual Studio で、**Tools > Options > Datadog** に進みます。
3. Datadog アカウントでサインイン、または[無料トライアルに登録してください][14]。
4. Visual Studio でソリューションを開きます。
5. **Extensions > Datadog > Linked Services** に移動します。
6. サービスを追加し、ソリューションを保存します。
7. **Extensions > Datadog > Code Insights** に移動します。

## フィードバック

GitHub の [Discussion Forum][15] や [Issue Tracker][16] でバグを報告したり、新機能をリクエストしたり、助けを求めることができます。また、`team-ide-integration@datadoghq.com` にメールを送ることもできます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-for-visual-studio/discussions
[2]: /getting_started/profiler/
[3]: https://www.datadoghq.com/
[4]: https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio
[5]: /tracing/error_tracking/
[6]: /security/application_security/vulnerability_management/
[7]: /watchdog/insights
[8]: /profiler/
[10]: /continuous_integration/guides/flaky_test_management/
[12]: /integrations/guide/source-code-integration/
[13]: /profiler/enabling/dotnet/?tab=linux#enabling-the-profiler
[14]: https://www.datadoghq.com/lpg/
[15]: https://github.com/DataDog/datadog-for-visual-studio/discussions
[16]: https://github.com/DataDog/datadog-for-visual-studio/issues
[17]: https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio
[18]: /logs/explorer/
[19]: /code_analysis/static_analysis/
[20]: /code_analysis/static_analysis_rules/
