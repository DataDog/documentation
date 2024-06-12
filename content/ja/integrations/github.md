---
aliases:
- /ja/integrations/github_apps
categories:
- collaboration
- developer tools
- issue tracking
- source control
dependencies: []
description: GitHub と Datadog を接続し、サービスのパフォーマンスに影響を与えるコミットやプルリクエストを監視する
doc_link: https://docs.datadoghq.com/integrations/github/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/collect-github-audit-logs-alerts-datadog/
  tag: ブログ
  text: Datadog で GitHub の監査ログを収集し、アラートをスキャンする
- link: https://www.datadoghq.com/blog/github-source-code-integration/
  tag: ブログ
  text: Datadog の GitHub とソースコードのインテグレーションを使用して、トラブルシューティングを効率化する
- link: https://www.datadoghq.com/blog/github-actions-service-catalog/
  tag: ブログ
  text: 私は GitHub Actions を Datadog のサービスカタログに使っています。あなたもそうするべきですよ
- link: https://docs.datadoghq.com/integrations/guide/source-code-integration/
  tag: Documentation
  text: Datadog のソースコードインテグレーションについて
- link: https://docs.datadoghq.com/tracing/service_catalog/setup/#store-and-edit-service-definitions-in-github
  tag: Documentation
  text: サービスカタログで GitHub インテグレーションを利用する方法について
- link: https://docs.datadoghq.com/serverless/configuration/?tab=serverlessframework#link-errors-to-your-source-code
  tag: Documentation
  text: サーバーレスモニタリングにおける GitHub インテグレーションの使用方法について
git_integration_title: github
has_logo: true
integration_id: github
integration_title: GitHub
integration_version: ''
is_public: true
manifest_version: '1.0'
name: github
public_title: GitHub インテグレーション
short_description: GitHub と Datadog を連携させる
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

GitHub Apps と GitHub Actions の構成、リポジトリの安全なアクセス、高度なテレメトリー (監査ログ、脆弱性レポート、秘密スキャン、リポジトリ統計など) の収集のために GitHub 統合をセットアップします。

{{< img src="integrations/github/repo_configuration.png" alt="GitHub インテグレーションタイルの Repository Configuration タブ" popup="true" style="width:100%;">}}

Datadog の[ソースコードインテグレーション][1]を利用すると、スタックトレース内のコードスニペットを表示したり、スタックトレースと GitHub 内の [Lambda 関数][2]のソースコードとをリンクさせたり、[CI Visibility][3] のプルリクエストコメントからテスト結果のサマリーを表示したり、GitHub の複数のサービス定義に[サービスカタログ][4]からアクセスしたりすることなどができます。

## 計画と使用

<div class="alert alert-info">
以下の手順で GitHub Apps をインストールし、Datadog に権限を付与してください。付与された権限に応じて、ソースコードインテグレーションの設定、スタックトレースでのコードスニペットの表示、監査ログなどの収集したテレメトリーの表示、CI Visibility での GitHub Actions へのアクセスなどが可能です。
</div>

### 組織または個人アカウント内のリポジトリをリンクする

GitHub 組織の管理者であれば、GitHub アプリを構成することができます。

1. [GitHub インテグレーションタイル][5]で、**Repo Configuration** タブに移動します。
2. **Link GitHub Account** をクリックして、GitHub アプリを新規に作成します。
3. **Configure** で、**Organization** を選択して組織名を入力するか、**Personal Account** を選択します。

   オプションで、GitHub Enterprise Server インスタンス (バージョン 2.22 以上) の URL を指定し、Datadog サーバーが Enterprise インスタンスに接続できることを確認します。サーバー IP は、[IP Ranges][6] の Webhooks セクションで入手できます。

4. **Edit Permissions** で、課題、プルリクエスト、コンテンツに対する Datadog の読み取りアクセス許可を有効にします。少なくとも 1 つのアクセス許可を選択する必要があります。
5. **Create App in GitHub** をクリックすると、GitHub アプリ名を入力する画面が表示されるので、入力します。
6. GitHub アプリ名フィールドに名前を入力し、**Create GitHub App** をクリックします。
7. **Configuration** タブで、**Install GitHub App** と **Install & Authorize** をクリックします。

GitHub アプリがインテグレーションタイルに表示されます。スタックトレースでインラインコードスニペットを有効にするには、[ソースコードインテグレーションの設定][1]を参照してください。

### チェック内容のサマリー

GitHub アプリに問題やプルリクエストの読み取り権限を与えている場合、GitHub の問題やプルリクエストは自動的にプレビューホバーボックスを生成し、コミット履歴、作成者、日付などの詳細が[ノートブック][7]に表示されます。

{{< img src="integrations/guide/github_apps/notebooks-links-to-git.png" alt="Git へのリンク" style="width:90%;">}}

1. **Notebooks** > **New Notebook** の順に移動します。
2. **Text** セルを追加し、**Edit** フィールドに GitHub 上の課題またはプルリクエストを記載します (例: `https://github.com/project/repository/pull/#`)。
3. **Done** をクリックすると、リンクされた課題またはプルリクエストの横に GitHub のアイコンが表示されます。
4. **Connect to Preview** と **Authorize** をクリックします。
5. リンク先の課題またはプルリクエストにカーソルを合わせると、説明のプレビューが表示されます。

### 監査ログ

監査ログは、GitHub の組織全体のすべてのアクティビティとイベントを網羅します。アプリケーションをインストールする際には、**Organization Administration** 権限が読み取りアクセス権を持つように許可してください。これにより、アプリケーションは GitHub の監査ストリームを GitHub 組織に代わってログとして収集し始めます。

**注**: 監査ログを収集するには GitHub Enterprise アカウントが必要です。

GitHub ドキュメントの [Datadog へのストリーミングのセットアップ][8]の手順に従って、監査ログを Datadog に転送します。監査ログの詳細については、GitHub ドキュメントの[監査ログアクション][9]を参照してください。

## リアルユーザーモニタリング

### データセキュリティ

GitHub インテグレーションは、Code Scan Alert と Secret Scan Alert のメトリクスを収集します。これらのメトリクスは、アラートの状態、リポジトリ、およびシークレットタイプを分類することで、組織のアラート状態の概要を提供します。また、これらは、アラートのトレンドとその全般的な進展に関する長期的な洞察を提供します。

{{< get-metrics-from-git "github_telemetry" >}}

これらのメトリクスを収集し始めるには、アプリケーションのインストール時に、読み取りアクセスのためにそれぞれの権限を選択します。Code Scan または Secret Scan のメトリクスをオプトアウトするには、インテグレーションタイルの **Telemetery** タブで対応する組織を探し、それぞれのセクションのトグルをクリックし、**Update Account** をクリックします。

### ヘルプ

<div class="alert alert-info">
以下の手順で、GitHub と Datadog に Webhook を構成し、イベントエクスプローラーにイベントを表示できるようにします。
</div>

#### GitHub で Webhook を追加する

1. GitHub のプロジェクトで、**Settings** > **Webhooks** に移動します。
2. **Add webhook** をクリックします。
3. **Payload URL** フィールドに以下の URL を追加します: `https://{{< region-param key="dd_full_site" code="true" >}}/intake/webhook/github?api_key=<DATADOG_API_KEY>`。`<DATADOG_API_KEY>` を [Datadog API キー][10]に置き換えることを忘れないでください。
4. **Content type** ドロップダウンメニューで `application/json` を選択します。
5. オプションで、**Secret** フィールドにシークレットを追加します。
6. **Which events would you like to trigger this webhook?** セクションで、**Let me select individual events.** をクリックし、以下のサポートされるオプションから選択して、Datadog に[イベント][11]を送信します。

   | イベント名 | イベントアクション |
   |---|---|
   | [ブランチまたはタグの作成][12] |  |
   | [コミットコメント][13] |  |
   | [問題のコメント][14] | 以下のアクションがサポートされています。 <br><br>- [`created`][15]<br>- [`deleted`][16]<br>- [`edited`][17] |
   | [問題][18] | 以下のアクションがサポートされています。 <br><br>- [`assigned`][19]<br>- [`closed`][20]<br>- [`deleted`][21]<br>- [`demilestoned`][22]<br>- [`edited`][23]<br>- [`labeled`][24]<br>- [`locked`][25]<br>- [`milestoned`][26]<br>- [`opened`][27]<br>- [`pinned`][28]<br>- [`reopened`][29]<br>- [`transferred`][30]<br>- [`unassigned`][31]<br>- [`unlabeled`][32]<br>- [`unlocked`][33]<br>- [`unpinned`][34] |
   | [プルリクエストレビューコメント][35] | 以下のアクションがサポートされています。 <br><br>- [`created`][36]<br>- [`deleted`][37]<br>- [`edited`][38] |
   | [プルリクエスト][39] | 以下のアクションがサポートされています。 <br><br>- [`opened`][40]<br>- [`closed`][41]<br>- [`labeled`][42]<br>- [`edited`][43]<br>- [`assigned`][44]<br>- [`unassigned`][45]<br>- [`reopened`][46] |
   | [プッシュ][47] |  |
   | [リポジトリ][48] | 以下のアクションがサポートされています。 <br><br>- [`archived`][49]<br>- [`created`][50]<br>- [`deleted`][51]<br>- [`edited`][52]<br>- [`privatized`][53]<br>- [`publicized`][54]<br>- [`renamed`][55]<br>- [`transferred`][56]<br>- [`unarchived`][57] |
   | [セキュリティと分析][58] |  |
   | [チームの追加][59] |  |

7. **Active** を選択すると、フックがトリガーされたときにイベントの詳細を受け取ることができます。
8. **Add webhook** をクリックして、Webhook を保存します。

#### Datadog で Webhook を追加する

1. [GitHub インテグレーションタイル][5]で、**Webhooks** タブに移動します。
2. 各リポジトリに対して、監視したいリポジトリとブランチを指定します。ユーザーまたは組織のすべてのリポジトリを追加するには、ワイルドカード (`*`) を使用します。ブランチ名にはワイルドカードを使用できます。例えば、`dev-*` は `dev-` で始まるすべてのブランチを含めます。

   GitHub リポジトリ `DataDog/documentation` の `master` ブランチに関連するすべてのイベントを収集するには、**Repository** フィールドに `DataDog/documentation` を、**Branches** フィールドに `master` を入力してください。

   DataDog 組織の**すべての** `master` ブランチに関連するすべてのイベントを収集したい場合は、** Repository** フィールドに `DataDog/*` を、** Branches** フィールドに `master` を入力します。
   注: リポジトリ名にワイルドカードを使用する場合は、ユーザーまたは組織を指定する必要があります。例えば、'*' は有効なリポジトリ名ではありませんが、'Datadog/*' は有効です。

3. **Commits** と **Issues** のチェックボックスをクリックすると、これらのイベントがアラートされます。
4. **Update Configuration** をクリックすると、Webhook の構成が保存されます。

インテグレーションタイルの **Webhooks** タブで Webhook を追加すると、上記で指定した GitHub リポジトリのイベントが[イベントエクスプローラー][60]に表示されるようになります。詳しくは、[イベントエクスプローラーのドキュメント][61]をご覧ください。

GitHub からのイベントをフィルターするには、**Core** の下にある **Source** ファセットメニューで **Github** を選択するか、検索クエリに `source:github` と入力してください。イベントの棒グラフは、検索クエリを編集すると自動的に更新されます。

### ヘルプ

GitHub インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][62]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/guide/source-code-integration/
[2]: https://docs.datadoghq.com/ja/serverless/configuration/?tab=serverlessframework#link-errors-to-your-source-code
[3]: https://docs.datadoghq.com/ja/continuous_integration/guides/pull_request_comments/
[4]: https://docs.datadoghq.com/ja/tracing/service_catalog/setup/#store-and-edit-service-definitions-in-github
[5]: https://app.datadoghq.com/integrations/github/
[6]: https://docs.datadoghq.com/ja/api/latest/ip-ranges/
[7]: https://app.datadoghq.com/notebook
[8]: https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise#setting-up-streaming-to-datadog
[9]: https://docs.github.com/en/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/reviewing-the-audit-log-for-your-organization#audit-log-actions
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads
[12]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#create
[13]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#commit_comment
[14]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#issue_comment
[15]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=created#issue_comment
[16]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=deleted#issue_comment
[17]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#issue_comment
[18]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#issues
[19]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=assigned#issues
[20]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=closed#issues
[21]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=deleted#issues
[22]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=demilestoned#issues
[23]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#issues
[24]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=labeled#issues
[25]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=locked#issues
[26]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=milestoned#issues
[27]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=opened#issues
[28]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=pinned#issues
[29]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=reopened#issues
[30]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=transferred#issues
[31]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unassigned#issues
[32]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unlabeled#issues
[33]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unlocked#issues
[34]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unpinned#issues
[35]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#pull_request_review_comment
[36]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=created#pull_request_review_comment
[37]: hhttps://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=deleted#pull_request_review_comment
[38]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#pull_request_review_comment
[39]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#pull_request
[40]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=opened#pull_request
[41]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=closed#pull_request
[42]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=labeled#pull_request
[43]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#pull_request
[44]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=assigned#pull_request
[45]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unassigned#pull_request
[46]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=reopened#pull_request
[47]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#push
[48]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#repository
[49]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=archived#repository
[50]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=created#repository
[51]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=deleted#repository
[52]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#repository
[53]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=privatized#repository
[54]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=publicized#repository
[55]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=renamed#repository
[56]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=transferred#repository
[57]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unarchived#repository
[58]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#security_and_analysis
[59]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#team_add
[60]: https://app.datadoghq.com/event/explorer/
[61]: https://docs.datadoghq.com/ja/events/explorer/
[62]: https://docs.datadoghq.com/ja/help/