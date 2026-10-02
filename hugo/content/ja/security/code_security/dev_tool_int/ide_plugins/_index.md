---
aliases:
- /ja/code_analysis/ide_plugins/
description: 開発環境におけるコードセキュリティと品質保証を強化するための Datadog IDE プラグインのセットアップ方法について説明します。
disable_toc: false
title: Code Security のための Datadog IDE Plugins
---
## 概要 {#overview}

[Code Security][1] は、VS Code、Cursor、および JetBrains IDE と統合され、コードセキュリティと品質に関するリアルタイムのフィードバックを提供します。サポートは IDE によって異なります。

| 機能 | Visual Studio Code & Cursor | JetBrains IDE |
|---|---|---|
| [Static Code Analysis (SAST)][2] | サポート対象 | サポート対象 |
| [Software Composition Analysis (SCA)][3] | サポート対象 | サポート対象 |
| [Runtime Code Analysis (IAST)][4] | サポート対象 | サポート対象 |
| [Secret Scanning][5] | サポート対象 | サポート対象 |
| [Infrastructure as Code (IaC) Scanning][6] | サポート対象 | サポート対象外 |

{{< whatsnext desc="以下のインテグレーションに関する詳細については、ドキュメントを参照してください。">}}
    {{< nextlink href="ide_plugins/idea/" >}}<u>JetBrains IDE</u>: IntelliJ IDEA、GoLand、PyCharm、RubyMine、WebStorm、PhpStorm{{< /nextlink >}}
    {{< nextlink href="ide_plugins/vscode/" >}}<u>Visual Studio Code & Cursor</u>{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /ja/security/code_security/
[2]: /ja/security/code_security/static_analysis/
[3]: /ja/security/code_security/software_composition_analysis/
[4]: /ja/security/code_security/iast/
[5]: /ja/security/code_security/secret_scanning/
[6]: /ja/security/code_security/iac_security/