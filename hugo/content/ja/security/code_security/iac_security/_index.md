---
aliases:
- /ja/security/cloud_security_management/iac_scanning/
further_reading:
- link: /security/code_security/iac_security/setup
  tag: ドキュメント
  text: IaC Security をセットアップする
- link: /security/code_security/iac_security/configuration
  tag: ドキュメント
  text: IaC Security を構成する
- link: /security/code_security/iac_security/iac_rules/
  tag: ドキュメント
  text: IaC Security のルール
- link: /security/code_security/iac_security/custom_rules/
  tag: ドキュメント
  text: IaC カスタムルール
- link: /pr_gates/
  tag: ドキュメント
  text: PR ゲート
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: ブログ
  text: Datadog IaC Security を使用して、クラウドの誤構成が本番環境に影響することを防ぐ
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: ブログ
  text: Datadog Secret Scanning を使用して、公開された認証情報を検出およびブロックする
- link: https://www.datadoghq.com/blog/github-actions-iac-security/
  tag: ブログ
  text: 'ボットよりも先に CI/CD の誤構成を見つける: Datadog IaC Security による GitHub Actions の保護'
title: Infrastructure as Code (IaC) セキュリティ
---
Datadog Infrastructure as Code (IaC) Security は、IaC 構成がデプロイされる前にその誤構成を検出します。接続された GitHub、GitLab、または Azure DevOps リポジトリに保存されているファイル内の暗号化の欠如や過度に寛容なアクセスなどの問題をフラグ付けします。詳細については、[IaC Security のルール][13] を参照してください。

{{< img src="/security/infrastructure_as_code/iac_misconfiguration_side_panel.png" alt="セキュリティの概要、コードスニペット、検出タイムスタンプ、修正手順が含まれた、重大度の高い IMDSv1 Enabled に関する問題の詳細を示す IaC 誤構成サイドパネル。" width="100%">}}

## 仕組み {#how-it-works}

IaC Security はリポジトリと統合して誤構成を継続的にスキャンし、構成された各リポジトリのすべてのブランチにおけるすべてのコミットをスキャンします。違反が検出されると、検出結果が表示され、関連するリポジトリ、ブランチ、ファイルパスにリンクされます。これにより、ソースで直接誤構成の特定、優先順位付け、修正を行えるようになります。

## 主な機能 {#key-capabilities}

### プルリクエスト内の違反を確認して修正する {#review-and-fix-violations-in-pull-requests}

プルリクエストにインフラストラクチャーの変更が含まれている場合、Datadog はインラインコメントを追加して違反にフラグを立てます。該当する場合は、プルリクエスト内で直接適用できるコード修正も提案されます。Datadog から新しいプルリクエストを開いて、検出結果を修正することもできます。詳細については、[プルリクエストコメント][5] を参照してください。

### Cursor で修正する {#fix-with-cursor}
IaC の検出結果の修正を Cursor などの AI コーディングエージェントに引き継ぐことができます。

1. [Code Security の脆弱性][3] ページで、検出結果をクリックしてサイドパネルを開きます。
2. {{< ui >}}Next Steps{{< /ui >}} > {{< ui >}}Remediation{{< /ui >}} セクションで {{< ui >}}Remediate with AI{{< /ui >}} をクリックします。
3. {{< ui >}}Coding agent{{< /ui >}} タブを選択します。
4. {{< ui >}}Generate your fix directly from Claude Code, Codex, or Cursor{{< /ui >}} で、{{< ui >}}Fix with Cursor{{< /ui >}} の横にある {{< ui >}}Open{{< /ui >}} をクリックします。Datadog は、その誤構成に対するカスタマイズされた修正プロンプトを使用して Cursor を開きます。

別のエージェントを使用するには、{{< ui >}}Copy fix prompt{{< /ui >}} の横にある {{< ui >}}Copy{{< /ui >}} をクリックし、プロンプトを選択したエージェントに貼り付けます。

Cursor ディープリンクを処理するには、[VS Code および Cursor 用の Datadog 拡張機能](/ide_plugins/vscode/?tab=cursor)をインストールしてください。

{{< img src="code_security/iac_security/fix-with-cursor.png" alt="Cursor で修正するおよび修正プロンプトをコピーするオプションが表示されている、Coding エージェントタブが選択された Remediate with AI ダイアログ" style="width:100%;" >}}

### PR Gates でリスクの高い変更を自動的にブロックする {#automatically-block-risky-changes-with-pr-gates}

[PR ゲート][11] を使用して、インフラストラクチャーのコード変更がマージされる前にセキュリティ基準を適用します。Datadog は各プルリクエストの IaC 変更をスキャンし、設定した重大度しきい値を超える脆弱性を特定して、GitHub または Azure DevOps に合格または不合格のステータスを報告します。

デフォルトでは、チェックは情報提供のみですが、GitHub または Azure DevOps でブロックするように設定することで、重大な問題が検出された場合にマージを防止できます。セットアップ手順については、[PR ゲートルールのセットアップ][12] を参照してください。

### 検出結果を表示およびフィルタリングする {#view-and-filter-findings}

IaC Security を設定すると、スキャン対象のリポジトリへのコミットごとにスキャンがトリガーされます。検出結果は [Code Security Vulnerabilities][3] ページにまとめられ、[Code Security Repositories][6] ページでリポジトリごとにグループ化されます。

フィルターを使用して、以下の項目で結果を絞り込みます。

- 重大度
- ステータス (open、muted、fixed)
- リソースタイプ
- クラウドプロバイダー
- ファイルパス
- チーム
- リポジトリ

検出結果をクリックすると、以下を表示するサイドパネルが開きます。

- {{< ui >}}Details{{< /ui >}}: 検出結果の概要と、その検出結果をトリガーした関連コード。(コードスニペットを表示するには、[GitHub App をインストール][9] してください。)
- {{< ui >}}Remediation{{< /ui >}}: 利用可能な場合、修正をサポートする検出結果に対して推奨されるコード修正が提供されます。

### 検出結果から Jira チケットを作成する {#create-jira-tickets-from-findings}

任意の発見から直接双方向の Jira チケットを作成し、既存のワークフローで問題を追跡および修正できます。チケットのステータスは、Datadog と Jira の間で同期されたままになります。詳細については、[Jira による双方向チケット同期][4] を参照してください。

### 検出結果のミュート {#mute-findings}

検出結果を抑制するには、検出結果詳細パネルの {{< ui >}}Mute{{< /ui >}} をクリックします。これにより、タグ値 (例: `service` や `environment`) によるコンテキストアウェアなフィルタリングのために、[ミュートルールを作成][10] できるワークフローが開きます。検出結果をミュートすると、その発見は非表示になり、レポートから除外されます。

ミュートされた検出結果を復元するには、詳細パネルの {{< ui >}}Unmute{{< /ui >}} をクリックします。また、[Code Security Vulnerabilities][3] ページの {{< ui >}}Status{{< /ui >}} フィルターを使用して、ミュートされた検出結果を確認することもできます。

### 特定のルール、ファイル、またはリソースを除外する {#exclude-specific-rules-files-or-resources}

除外を設定して、特定の検出結果がスキャン結果に表示されないようにすることができます。除外は、ルール ID、ファイルパス、リソースタイプ、重大度、またはタグに基づいて設定できます。

除外は、構成ファイルまたは IaC コード内のインラインコメントを通じて管理されます。サポートされている形式と使用例については、[IaC Security を構成する][7] を参照してください。

## 次のステップ {#next-steps}

1. ご利用の環境で [IaC Security をセットアップ][1] します。
2. 誤検知を減らす、または予期される結果を無視するように [IaC Security][2] を構成します。
3. [Code Security Vulnerabilities][3] ページで検出結果を確認し、トリアージします。
4. 組織固有の要件を強制するために [IaC カスタムルール][14] を作成します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/code_security/iac_security/setup
[2]: /ja/security/code_security/iac_security/configuration
[3]: https://app.datadoghq.com/security/code-security/iac
[4]: /ja/security/ticketing_integrations#bidirectional-ticket-syncing-with-jira
[5]: /ja/security/code_security/dev_tool_int/github_pull_requests/
[6]: https://app.datadoghq.com/ci/code-analysis?
[7]: /ja/security/code_security/iac_security/configuration/
[8]: /ja/security/automation_pipelines/mute
[9]: https://app.datadoghq.com/integrations/github/
[10]: /ja/security/automation_pipelines/
[11]: /ja/pr_gates/
[12]: /ja/pr_gates/setup
[13]: /ja/security/code_security/iac_security/iac_rules
[14]: /ja/security/code_security/iac_security/custom_rules