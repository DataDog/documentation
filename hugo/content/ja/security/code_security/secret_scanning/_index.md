---
algolia:
  tags:
  - secrets scanning
  - secret scanning
  - datadog static analysis
  - SAST
description: Datadog Secret Scanning を使用して、ソースコード内に露出しているシークレットを検出します。
further_reading:
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: ブログ
  text: Datadog Secret Scanning を使用して、公開された認証情報を検出およびブロックする
is_beta: true
title: Secret Scanning
---
{{< callout url="https://www.datadoghq.com/product-preview/generic-secret-scanning-in-code/" header="コード内の汎用シークレットの検出" >}}
汎用 Secret Scanning はプレビュー版です。プロバイダーのパターンと一致しない内部トークンやパスワードを検索します。
{{< /callout >}}

Datadog Secret Scanning はコードをスキャンして、露出しているシークレットを検出します。また、Datadog はシークレットの検証を試み、そのステータス (有効、無効) を表示して、シークレットの修正の優先順位付けを支援します。

## Secret Scanning のセットアップ {#set-up-secret-scanning}

スキャンは、CI/CD パイプラインで実行することも、ホスト型スキャンを使用して Datadog 内で直接実行することもできます (GitHub、Azure DevOps、GitLab でサポート)。開始するには、[{{< ui >}}Code Security Setup{{< /ui >}}][1] に移動して {{< ui >}}Activate scanning for your repositories{{< /ui >}} をクリックするか、[GitHub actions][5] または[その他の CI プロバイダー][6]を使用して Secret Scanning をセットアップする方法を参照してください。

## Secret Scanning ルール {#secret-scanning-rules}

Datadog Secret Scanning は [Sensitive Data Scanner (SDS)][3] を基盤としており、
[SDS のシークレットおよび認証情報カテゴリ][4]に含まれるすべてのルールを備えています。一部の検出については、Secret Scanning が[サードパーティによるアクティブ検証][17]を使用して、検出されたキーが有効かどうかを自動的にチェックします。

## 仕組み{#how-it-works}

Secret Scanning はリポジトリと直接インテグレーションされ、コード内に漏洩したシークレットを継続的に検出します。Datadog の静的アナライザーに基づいて構築されており、構成された各リポジトリのすべてのブランチにわたって、すべてのコミットをスキャンします。検出結果はリポジトリ、ブランチ、ファイルパスのコンテキストとともに表示されるため、チームはソースレベルで露出したシークレットを特定、優先順位付け、修正できます。

各スキャンでは、スコープ内のすべてのファイルの内容全体が解析され、コミットで変更された行やファイルのみが対象となるわけではありません。ホスト型スキャンを使用して初めてリポジトリをスキャンする際、Datadog はリポジトリの Git 履歴全体もスキャンします。[Git 履歴内のシークレットを検出する](#detect-secrets-in-git-history)を参照してください。

[静的コード解析][18]で利用可能な差分認識スキャンは、Secret Scanning ではサポートされていません。

## 主な機能 {#key-capabilities}

### Git 履歴内のシークレットの検出 {#detect-secrets-in-git-history}

ファイルからシークレットを削除しても、リポジトリからは削除されません。シークレットは以前のコミットに残っており、リポジトリへのアクセス権を持つ人なら誰でも復元できます。

ホスト型スキャンでリポジトリが最初にスキャンされるとき、Datadog は最新のコミットに加えて、すべてのブランチにわたる完全な Git 履歴をスキャンします。デフォルトブランチの最新コミットに存在しなくなったシークレットは、履歴のみの検出結果として報告されます。

履歴のみの検出結果には、検出結果リストで {{< ui >}}Detected in Git History{{< /ui >}} というラベルが付けられます。確認方法:

- **すべてのリポジトリ**: [{{< ui >}}Vulnerabilities{{< /ui >}} &gt; {{< ui >}}Secret Scanning (Secrets){{< /ui >}}][15] に移動し、{{< ui >}}Is Git History{{< /ui >}} ファセットでフィルタリングします。
- **単一のリポジトリの場合**: [{{< ui >}}Repositories{{< /ui >}}][14] に移動し、リポジトリを選択して {{< ui >}}Leaked Secrets{{< /ui >}} タブを開きます。

検出結果の詳細パネルには、リポジトリ履歴内のシークレットの場所が表示されます。

- {{< ui >}}Introduced in{{< /ui >}}: シークレットが追加されたコミットと、そのコミットの作成者。
- {{< ui >}}Removed in{{< /ui >}}: シークレットが削除されたコミット。シークレットがマージされていないブランチやタグにまだ存在する場合、{{< ui >}}Not removed{{< /ui >}} と表示されます。

<div class="alert alert-info">Git 履歴は、ホスト型スキャンでリポジトリが最初にスキャンされるときに一度だけスキャンされます。マージされていないブランチやタグには存在するが、デフォルトブランチには存在しないシークレットは、履歴のみの検出結果として報告されます。CI スキャンは、スキャンされたコミットのみを解析します。</div>

<div class="alert alert-warning">履歴のみの検出結果は、その後のスキャンによって自動的にクローズされることはなく、Git 履歴を書き換えてもクローズされません。露出した認証情報をローテーションまたは無効化してから、<a href="#mute-findings">検出結果をミュート</a>してください。</div>

### プルリクエスト内の露出したシークレットの確認 {#review-exposed-secrets-in-pull-requests}

プルリクエストによって漏洩したシークレットが導入されると、Datadog は自動的にインラインコメントを追加して露出を警告します。Datadog から新しいプルリクエストを作成して、検出結果を直接修正することもできます。詳細については、[プルリクエストコメント][7]を参照してください。

### PR Gates による漏洩の自動ブロック {#automatically-block-leaks-with-pr-gates}

[PR Gates][11] を使用して、漏洩したシークレットがメインブランチにマージされるのを防ぎます。Datadog は各プルリクエストをスキャンして露出したシークレットを検出し、GitHub、Azure DevOps、または GitLab (プレビュー) に直接パスまたはフェイルのステータスを報告します。

デフォルトではチェックは情報提供のみですが、シークレットが検出された場合にマージを防止するブロッキング設定を行うことができます。セットアップ手順については、[PR ゲートルールのセットアップ][12]を参照してください。

### インライン除外 {#inline-exclusions}

インライン除外を追加して、特定の検出結果がスキャン結果に表示されないようにすることができます。`no-dd-secrets` とコメントすると、次の行で検出されたシークレットが無視されます。

### 検出結果を表示およびフィルタリングする {#view-and-filter-findings}

Secret Scanning をセットアップすると、スキャン対象のリポジトリへのコミットごとにスキャンがトリガーされます。検出結果は [{{< ui >}}Code Security Vulnerabilities{{< /ui >}}][15] ページにまとめられ、[{{< ui >}}Code Security Repositories{{< /ui >}}][14] ページでリポジトリごとにグループ化されます。

{{< ui >}}Secret Scanning (Secrets){{< /ui >}} タブでは、フィルターを使用して次のようなファセットで結果を絞り込むことができます。

- 重大度
- ステータス (open、muted、fixed)
- {{< ui >}}Validation Status{{< /ui >}}
- チーム
- リポジトリの可視性
- {{< ui >}}Is Git History{{< /ui >}}

### 検出結果から Jira チケットを作成する {#create-jira-tickets-from-findings}

任意の発見から直接双方向の Jira チケットを作成し、既存のワークフローで問題を追跡および修正できます。チケットのステータスは、Datadog と Jira の間で同期されたままになります。詳細については、[Jira による双方向チケット同期][16]を参照してください。

### 漏洩したシークレットからのインシデントの宣言 {#declare-an-incident-from-a-leaked-secret}
Secret Scanning サイドパネルで {{< ui >}}Declare incident{{< /ui >}} をクリックして、検出結果から[インシデントを宣言][13]します。インシデントには、すべての検出メタデータが事前に入力されます。

### 検出結果のミュート {#mute-findings}

検出結果を抑制するには、検出結果詳細パネルの [{{< ui >}}Mute{{< /ui >}}] をクリックします。これにより、タグ値 (例: `repository`) によるコンテキストアウェアなフィルタリングを行う[ミュートルールの作成][10]ワークフローが開きます。検出結果をミュートすると、その発見は非表示になり、レポートから除外されます。

ミュートされた検出結果を復元するには、詳細パネルの [{{< ui >}}Unmute{{< /ui >}}] をクリックします。[{{< ui >}}Code Security Vulnerabilities{{< /ui >}}][15] ページで {{< ui >}}Status{{< /ui >}} フィルターを使用して、ミュートされた検出結果を確認することもできます。

## 次のステップ{#next-steps}

1. 環境に [Secret Scanning をセットアップ][1]します。
2. 初期トリアージを自動化するために [自動化パイプライン][10] をセットアップします。
3. [{{< ui >}}Code Security Vulnerabilities{{< /ui >}}][15] ページで検出結果を確認します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: /ja/security/code_security/static_analysis/setup
[3]: /ja/security/sensitive_data_scanner/
[4]: /ja/security/sensitive_data_scanner/scanning_rules/library_rules/?category=Secrets+and+credentials#overview
[5]: /ja/security/code_security/secret_scanning/github_actions
[6]: /ja/security/code_security/secret_scanning/generic_ci_providers
[7]: /ja/security/code_security/dev_tool_int/pull_request_comments/
[8]: /ja/security/automation_pipelines/mute
[9]: https://app.datadoghq.com/integrations/github/
[10]: /ja/security/automation_pipelines/
[11]: /ja/pr_gates/
[12]: /ja/pr_gates/setup
[13]: /ja/incident_response/incident_management/investigate/declare/#from-a-leaked-secret
[14]: https://app.datadoghq.com/ci/code-analysis?
[15]: https://app.datadoghq.com/security/code-security/secrets
[16]: /ja/security/ticketing_integrations#bidirectional-ticket-syncing-with-jira
[17]: /ja/security/code_security/secret_scanning/secret_validation/
[18]: /ja/security/code_security/static_analysis/setup/#diff-aware-scanning