---
aliases:
- /ja/getting_started/code_analysis/
description: SAST、SCA、IAST ツールを使用してアプリケーションを保護し、自社コードやオープンソースライブラリの脆弱性を検出します。
further_reading:
- link: https://learn.datadoghq.com/courses/code-security-SAST
  tag: 学習センター
  text: Datadog Code Security でセキュアなコードを記述する
title: Code Security を始める
---
## 概要{#overview}

Datadog Code Security は、自社コードとオープンソースライブラリを開発から本番運用まで安全に保ち、メンテナンスするのに役立ちます。

ソフトウェア開発ライフサイクル全体にわたってコードのセキュリティを確保するために、以下のツール群を提供します:

- **Static Code Analysis (SAST)** は、Static Application Security Testing 方式を用いてリポジトリをスキャンし、自社コードにおけるセキュリティや品質上の問題を検出します。問題が本番環境に到達する前に修正案を提示します。
- **Software Composition Analysis (SCA)** は、リポジトリ内に存在し、実行時にサービスに影響を与える脆弱なオープンソースライブラリを検出し、ソフトウェアサプライチェーンの安全性を維持するのに役立ちます。
- **Runtime Code Analysis (IAST)** は、インタラクティブアプリケーションセキュリティテスト方式を用いて、稼働中のサービスに影響を与える脆弱性を検出します。

## Code Security のセットアップ{#set-up-code-security}

### オープンソースライブラリ{#open-source-libraries}

Datadog Software Composition Analysis は、コードベースや実行中のサービスで使用されているライブラリの脆弱性を検出し、依存関係をカタログ化します。

静的および/または実行時のライブラリ脆弱性検出を設定するには、[Software Composition Analysis][1] を参照してください。

### 自社コード{#first-party-code}

{{< whatsnext desc="Datadog を使用して自社コードを保護して維持するには、2 つの方法があります。">}}
    {{< nextlink href="security/code_security/static_analysis/setup/" >}}Static Code Analysis (SAST) のセットアップ{{< /nextlink >}}
    {{< nextlink href="security/code_security/iast/setup/" >}}Runtime Code Analysis (IAST) のセットアップ{{< /nextlink >}}
{{< /whatsnext >}}

## 開発者向けツールインテグレーション{#developer-tool-integrations}

### プルリクエストコメントを有効にする{#enable-pull-request-comments}

Datadog は自動コードレビュアとして動作し、GitHub のプルリクエストで脆弱性や品質違反をフラグ付けできます。詳細については、[GitHub プルリクエスト][2]を参照してください。

{{< img src="/security/application_security/code_security/github_suggestion.png" alt="GitHub での Datadog コードレビュー" style="width:100%;" >}}

### IDE インテグレーションをインストールする{#install-ide-integrations}

[Datadog IDE プラグイン][5]をインストールすると、コードエディター上で直接 Code Security の問題を特定できるようになります。IDE に応じて、プラグインは以下の機能をサポートしています。

- Static Code Analysis (SAST)
- Software Composition Analysis (SCA)
- Runtime Code Analysis (IAST)
- Secret Scanning
- Infrastructure as Code (IaC) スキャン

{{< whatsnext desc="セットアップ手順やサポートされている機能の詳細については、使用するコードエディターのドキュメントを参照してください。">}}
    {{< nextlink href="ide_plugins/idea/code_security/" >}}<u>JetBrains IDE</u>: IntelliJ IDEA、GoLand、PyCharm、RubyMine、WebStorm、PhpStorm{{< /nextlink >}}
    {{< nextlink href="ide_plugins/vscode/code_security/" >}}<u>Visual Studio Code & Cursor</u>{{< /nextlink >}}
{{< /whatsnext >}}

### リポジトリの設定をカスタマイズする{#customize-your-repository-settings}
[Code Security Settings][3] では、どのリポジトリで PR コメントを有効にするかの管理や、リポジトリ全体またはリポジトリごとに適用する Static Code Analysis (SAST) ルールの[構成をカスタマイズ][11]できます。Datadog が提供するデフォルトのルール一覧については、[SAST Rules][4] を参照してください。

### PR Gates をセットアップする{#set-up-pr-gates}

Datadog では、プラットフォーム機能として [PR Gates][6] を提供しており、コードベースに対する変更においてセキュリティと品質の基準を維持・適用できます。詳しくは、[PR Gate のセットアップ][7]を参照してください。

## ランタイムコンテキストを活用して脆弱性に優先順位を付ける{#prioritize-vulnerabilities-with-runtime-context}

Code Security は、静的なリポジトリスキャンおよび実行時のサービス検出の両方から検出されたライブラリとコードの脆弱性を、**脆弱性中心のビュー**で提供します。

### 脆弱性を調査する{#explore-vulnerabilities}

ライブラリの脆弱性については、テーブルの各行がライブラリのバージョンに影響を与える特定の脆弱性を表しています。{{< ui >}}Detected In{{< /ui >}} 列には、静的検出またはランタイム検出のどちらが有効になっているかに応じて、その脆弱性の影響を受ける特定のリポジトリやサービスが表示されます。

SCA の単一ライブラリ脆弱性を示すサイドパネルには、脆弱性の詳細に加えて、Datadog による以下の情報が示されます。

- リポジトリおよびサービス全体で確認された、この脆弱性の最も深刻なインスタンスの {{< ui >}}Severity breakdown{{< /ui >}} です。リポジトリやサービス内で脆弱性が検出された場所ごとに、Datadog は環境要因に基づいて脆弱性の基本的な重大度スコアを調整します。詳細については、[Datadog 重大度スコア][8]を参照してください。
- リポジトリ内で脆弱性が検出されたすべてのインスタンスを一覧表示する {{< ui >}}Repositories{{< /ui >}} テーブル。各インスタンスについて、Datadog は、依存関係が直接かトランジティブか、脆弱性の修正状況、具体的な修正手順などを表示します。
- このライブラリの脆弱性の影響を受ける、稼働中のすべてのサービスを示す {{< ui >}}Impacted Services{{< /ui >}} テーブル。ランタイム時にライブラリが読み込まれ、Datadog のアプリケーション SDK によって検出された場合、そのサービスはライブラリの脆弱性の影響を受けているとみなされます。

 重大度は、以下の基準でスコアが決定されます。
| CVSS スコア    | 定性的評価
| --------------| -------------------|
|   `0.0`         | なし                |
|   `0.1 - 3.9`   | Low                 |
|   `4.0 - 6.9`   | Medium              |
|   `7.0 - 8.9`   | High                |
|   `9.0 - 10.0`  | Critical            |

### リポジトリごとの結果を調査する{#explore-results-per-repository}

Code Security では、静的スキャンの結果を**リポジトリ中心のビュー**でも提供しており、スキャン済みリポジトリのすべてのブランチやコミットを詳細にフィルタリングできます。

{{< ui >}}Repositories{{< /ui >}} ページでリポジトリをクリックすると、より詳細な表示にアクセスでき、デフォルトブランチ (最初に表示される) や最新から始まるコミットなどで検索クエリをカスタマイズできます。

{{< tabs >}}
{{% tab "Static Code Analysis (SAST)" %}}

以下のすぐに使えるファセットを使用して、[{{< ui >}}Code Quality{{< /ui >}}] タブで劣悪なコーディングプラクティスを特定および解決するための検索クエリ、または {{< ui >}}Code Vulnerabilities{{< /ui >}} タブでセキュリティリスクを特定および解決するための検索クエリを作成できます。

| ファセット名                        | 説明                                                             |
|-----------------------------------|-------------------------------------------------------------------------|
| Result Status                     | 分析の完了ステータスに基づいて結果をフィルタリングします。        |
| Rule ID                           | 発見内容のトリガーとなった特定のルール。                            |
| Tool Name                         | どのツールが分析に貢献したかを判断します。                    |
| CWE (共通脆弱性列挙)| 認識された脆弱性カテゴリーによって発見内容をフィルタリングします。               |
| Has Fixes                         | 修正提案が利用可能な問題をフィルタリングします。                |
| Result Message                    | 発見内容に関連する簡潔な説明やメッセージを含みます。|
| Rule Description                  | 各ルールの背後にある根拠を含みます。                               |
| Source File                       | 問題が検出されたファイルが含まれます。                         |
| Tool Version                      | 使用したツールのバージョンによって結果をフィルタリングします。                      |

検出結果から直接、提案された修正にアクセスして、セキュリティ脆弱性への対応やコード品質の向上を図ることができます。

{{< img src="/getting_started/code_analysis/suggested_fix.png" alt="コード分析結果の [修正] タブに提示されたコード修正案" style="width:100%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis" %}}

以下のすぐに使えるファセットを使用して、[{{< ui >}}Library Vulnerabilities{{< /ui >}}] タブでサードパーティライブラリのセキュリティリスクを特定して対処するための検索クエリを作成したり、[{{< ui >}}Library Catalog{{< /ui >}}] タブでライブラリのインベントリを確認したりできます。

| ファセット名         | 説明                                                    |
|--------------------|----------------------------------------------------------------|
| Dependency Name    | ライブラリを名前で識別します。                             |
| Dependency Version | ライブラリの特定のバージョンでフィルタリングします。                    |
| Language           | ライブラリをプログラミング言語で並べ替えます。                  |
| Score              | 依存関係のリスクスコアまたは品質スコアを並べ替えます。          |
| Severity           | 重大度評価に基づいて脆弱性をフィルタリングします。       |
| Platform           | ライブラリを対象プラットフォームで区別します。|

脆弱性レポートにアクセスし、ファイルのコード所有者に関する情報とともに、プロジェクト内で脆弱性が発見されたソースファイルを検索できます。

{{< img src="/security/application_security/code_security/sci_vulnerabilities.png" alt="検出されたライブラリの脆弱性から GitHub 上のソースコードへ直接移動できるリンク" style="width:100%" >}}

{{% /tab %}}
{{< /tabs >}}

## 通知、修正、レポート{#notify-remediate-and-report}

Code Security を使用すると、検出結果の追跡や修正対応の管理を行うためのワークフローを設定できます:

- [通知ルール][9]を設定し、Slack、Jira、E メールなどを介してチームに新たな検出内容を通知します
- {{< ui >}}Code Security Summary{{< /ui >}} ページでサービスやチームごとに脆弱性を追跡します

## Datadog のサービスとチームに検出結果をリンクする{#link-findings-to-datadog-services-and-teams}

{{% security-products/link-findings-to-datadog-services-and-teams %}}

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/code_security/software_composition_analysis/
[2]: /ja/security/code_security/dev_tool_int/github_pull_requests/
[3]: https://app.datadoghq.com/security/configuration/code-security/setup
[4]: /ja/security/code_security/static_analysis/static_analysis_rules/
[5]: /ja/security/code_security/dev_tool_int/ide_plugins/
[6]: /ja/pr_gates/
[7]: /ja/pr_gates/setup
[8]: /ja/security/code_security/software_composition_analysis/#datadog-severity-score
[9]: https://app.datadoghq.com/security/configuration/notification-rules
[10]: /ja/account_management/teams/
[11]: /ja/security/code_security/static_analysis/setup/#customize-your-configuration