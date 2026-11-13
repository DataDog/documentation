---
aliases:
- /ja/bits_ai/bits_ai_sre/configure/
title: Integrationsと設定
---
Bits Investigation の機能を拡張するためインテグレーションをセットアップします。
- [サードパーティの監視可能性および SCM プラットフォームと統合](#integrate-with-third-party-observability-and-scm-platforms)し、外部テレメトリとコードコンテキストで調査を強化します。
- [調査結果を ITSM およびコラボレーションプラットフォームに送信](#send-investigation-findings-to-itsm-and-collaboration-platforms)し、インシデント対応を効率化します。
- [ナレッジベースからコンテキストを取得](#pull-context-from-knowledge-bases)し、ランブックやドキュメントを調査に組み込みます。

## サードパーティの監視可能性および SCM プラットフォームとの統合 {#integrate-with-third-party-observability-and-scm-platforms}

Bits Investigation は、GitHub、Grafana、Dynatrace、Splunk、Sentry、ServiceNow と統合し、監視可能性データとソースコードを調査に組み込みます。Bits Investigation がコードで解決可能な問題を特定したときに Bits Code がコード修正を生成するためには、ソースコードへのアクセスも必要です。

### GitHub {#github}
GitHub を構成するには、次のようにします。
1. [GitHub インテグレーション][13] をインストールします。
1. 実行中のアプリケーションバージョンを特定のレポジトリやコミットにリンクするため、[APM テレメトリに Git 情報でタグ付け][14] します。

## 調査結果を ITSM およびコラボレーションプラットフォームに送信します。{#send-investigation-findings-to-itsm-and-collaboration-platforms}

デフォルトでは、すべての調査が [Bits 調査][1] ページに表示されます。

モニターアラート調査の場合、調査結果の概要はモニターのステータスページで確認できます。モニターですでに`@slack`、`@case`、または`@oncall` [通知][2] が構成されている場合、Bits は自動的にその調査結果をそれらの送信先に投稿します。それ以外の場合は、以下の手順を使用してこれらのインテグレーションをセットアップできます。


### Slack {#slack}

1. [Datadog Slack アプリ][3] が Slack ワークスペースにインストールされていることを確認します。
1. モニターで [{{< ui >}}Configure notifications and automations{{< /ui >}}] (通知と自動化の構成) に移動し、`@slack-{channel-name}` ハンドルを追加します。これにより、選択した Slack チャンネルにモニター通知が送信されます。
1. 最後に、[[{{< ui >}}Bits Investigation{{< /ui >}}] >[ {{< ui >}}Settings{{< /ui >}}] (設定) > [{{< ui >}}Integrations{{< /ui >}}]][4] に移動し、Slack ワークスペースを接続します。これにより、Bits は Slack でモニター通知の直下に調査結果を Slack に直接書き込めるようになります。

<div class="alert alert-info">各 Slack ワークスペースは、1 つの Datadog オーガニゼーションにのみ接続できます。</div>

### Microsoft Teams (プレビュー) {#microsoft-teams-preview}

1. [Microsoft のテナントを Datadog に接続します][12]。
1. モニターで [{{< ui >}}Configure notifications and automations{{< /ui >}}] (通知と自動化の構成) に移動し、`@teams-{handle-name}` ハンドルを追加します。これにより、選択した MS Teams チャンネルにモニター通知が送信されます。Bits は、これらの通知に調査結果を付加します。

<div class="alert alert-info">
Bits Investigation と Microsoft Teams のインテグレーションは、すべてのお客様にプレビュー版として提供されています。</div>

### Datadog Work Management {#datadog-work-management}

Datadog Work Management は、Datadog とサードパーティのインテグレーションによって検出された問題をトリアージ、追跡、および修復するための一的な管理ワークスペースを提供します。Bits Investigation は、調査結果を Work Management を介して Jira および ServiceNow に自動的に配信します。

Work Management と Jira インテグレーションおよび ServiceNow インテグレーションをセットアップするには、次のようにします。
1. チームの [Work Management プロジェクト][5] を作成します。
1. Datadog で [[{{< ui >}}Work Management{{< /ui >}}] > [{{< ui >}}Settings{{< /ui >}}] (設定)][6] に移動します。プロジェクトのリストでプロジェクトを展開し、[{{< ui >}}Integrations{{< /ui >}}] > [{{< ui >}}Datadog Monitors{{< /ui >}}] (Datadog モニター) に移動して、[{{< ui >}}Enable Datadog Monitors integration for this project{{< /ui >}}] (このプロジェクトで Datadog モニターインテグレーションを有効にする) トグルをオンにします。これにより、プロジェクト固有のハンドル : `@case-{project_name}` が生成されます。
1. 同じページの [{{< ui >}}Integrations{{< /ui >}}] で、Work Management の Jira インテグレーションおよび/または ServiceNow インテグレーションをセットアップします。新しい作業項目が作成されると、Work Management は対応する Jira チケットまたは ServiceNow インシデントを自動的に開くことができます。
1. モニターで [{{< ui >}}Configure notifications and automations{{< /ui >}}] (通知と自動化の構成) に移動し、`@case-{project_name}` ハンドルを追加します。モニターがトリガーされると、次の処理が行われます。
   - Datadog が自動的に新しい作業項目を作成します。
   - 作業項目により、リンクされた Jira チケットまたは ServiceNow インシデントが作成されます。
   - Bits が調査結果を作業項目に直接書き込みます。これは、Jira にはタイムラインコメントとして、ServiceNow には作業メモとして追加されます。

### Datadog On-Call {#datadog-on-call}

Datadog On-Call は、監視、ページング、インシデント対応を 1 つのプラットフォームに統合するページングソリューションです。

On-Call をセットアップするには、モニターで [{{< ui >}}Configure notifications and automations{{< /ui >}}] (通知と自動化の構成) に移動し、`@oncall-{team}` ハンドルを追加します。Bits の調査結果は Datadog モバイルアプリの [On-Call] ページに表示されるため、チームは外出先でも問題をトリアージできます。

## ナレッジベースからのコンテキストの取得 {#pull-context-from-knowledge-bases}

### Confluence {#confluence}
Bits Investigation と Confluence のインテグレーションにより、以下の操作が可能になります。
- モニターアラート調査を支援するための関連するドキュメントやランブックを見つける
- チャットで Confluence コンテンツを直接操作できるようにする

Confluence を使用するように Bits Investigation をセットアップするには、次のようにします。

1. [Confluence インテグレーションタイル][7] の手順に従って、Confluence Cloud アカウントを接続します。
1. オプションで、アカウントクロールを有効にします。これにより、Bits のチャットインターフェース内で Confluence をデータソースとして使用できます。アカウントクロールを有効にしなくても、Bits は引き続き Confluence を使用して調査計画を作成できます。
1. モニターのメッセージに Confluence ページへのリンクを追加します。Bits はページを読み取り、調査計画の作成時に Datadog テレメトリリンクやその他のコンテキストを抽出します。
1. [[Bits Settings] (Bits 設定) ページ][4] ですべての接続済み Confluence アカウントを確認できます。

## 権限の構成 {#configure-permissions}

Bits Investigation に適用される RBAC 権限は 2 つあります。

| 名前                                                    | 説明                            | デフォルトロール           |
|:--------------------------------------------------------|:---------------------------------------|:-----------------------|
| Bits Investigations Read (`bits_investigations_read`)   | Bits 調査を読み取ります。             | Datadog Read Only |
| Bits Investigations Write (`bits_investigations_write`) | Bits 調査を実行および構成します。| Datadog 標準ロール |

これらの権限は、デフォルトで管理対象のロールに追加されます。オーガニゼーションでカスタムロールを使用している場合、または以前にデフォルトのロールを変更している場合は、User Access Manage 権限を持つ管理者が、適切なロールにこれらの権限を手動で追加する必要があります。詳細については、[アクセス制御][8] を参照してください。

### Bits Investigation の無効化 {#disable-bits-investigation}

オーガニゼーションが Bits Investigation を使用できないようにするには、User Access Manage 権限を持つ管理者がすべてのロールから `bits_investigations_read` 権限と `bits_investigations_write` 権限を削除する必要があります。詳細については、[アクセス制御][8] を参照してください。

または、管理者が [[Plan & Usage] (プランと使用法) > [AI Credits](AI クレジット)][16] のオーガニゼーションレベルのトグルを使用して、AI Credits で請求可能なすべての AI 製品を無効にすることもできます。詳細については、[AI Credits の管理者コントロール][17] を参照してください。

## レート制限の構成 {#configure-rate-limits}

レート制限により、Bits が 24 時間のローリング期間内に実行できる自動調査の最大数が定義されます。レート制限に達した後も、引き続き [手動調査][9] をトリガーできます。

### レート制限の種類 {#types-of-rate-limits}

Per monitor limit (モニターあたりの制限)
: 24 時間のローリングウィンドウ内に、単一モニターから調査が自動的にトリガーされる頻度を制御します。
: **デフォルト:** 各モニターは 24 時間ごとに 1 回の自動調査をトリガーできます。

Organization limit (オーガニゼーションの制限)
: Bits がオーガニゼーション全体で 24 時間以内に実行できる自動調査の合計数を定義します。
: **デフォルト:** 制限なし。

### レート制限の設定 {#set-a-rate-limit}

レート制限を設定するには、次のようにします。
1. [[{{< ui >}}Bits Investigation{{< /ui >}}] > [{{< ui >}}Settings{{< /ui >}}] (設定) > [{{< ui >}}Rate Limits{{< /ui >}}] (レート制限)][10] に移動します。
2. 有効にするレート制限をオンに切り替えます。
3. 24 時間のローリングウィンドウ内で実行する調査の最大数を設定します。
4. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

{{< img src="bits_ai/rate_limits.png" alt="レート制限を設定するオプション" style="width:60%;" >}}

## Audit Trail {#audit-trail}

[Audit Trail][11] でユーザーが開始したアクションを監視できます。イベントは次の時点で送信されます。
- ユーザーが手動で調査を開始したとき、および調査が完了したとき
- 手動調査でツール呼び出しが実行されたとき
- ユーザーがモニターの自動調査を有効または無効にしたとき
- ユーザーがモニターのレート制限を変更したとき

## アクション {#actions}

Bits Investigation には 3 つの [アクション][15] が用意されています。
- Trigger Investigation (調査のトリガー)
- Get Investigation (調査の取得)
- List Investigations (調査の一覧表示)

これらのアクションを使用して、各自のユースケースに合わせてワークフロー、エージェント、アプリを構築できます。

## API {#api}

[API][18] を介してプログラムから調査をトリガーまたは取得できます。

[1]: https://app.datadoghq.com/bits-ai/investigations
[2]: /ja/monitors/notify
[3]: https://docs.datadoghq.com/ja/integrations/slack/?tab=datadogforslack
[4]: https://app.datadoghq.com/bits-ai/settings/integrations
[5]: /ja/incident_response/work_management/projects
[6]: https://app.datadoghq.com/work/settings
[7]: https://app.datadoghq.com/integrations/confluence
[8]: /ja/account_management/rbac
[9]: /ja/bits_ai/bits_investigation/investigate_issues#manually-start-an-investigation
[10]: https://app.datadoghq.com/bits-ai/settings/rate-limits
[11]: /ja/account_management/audit_trail/events/#bits-ai-sre
[12]: /ja/integrations/microsoft-teams/?tab=datadogapprecommended
[13]: /ja/integrations/github/
[14]: /ja/source_code/service-mapping
[15]: /ja/actions/workflows/actions/
[16]: https://app.datadoghq.com/billing/bill-overview?detail_bd=ai_credits
[17]: /ja/account_management/billing/ai_credits/#admin-controls
[18]: /ja/api/latest/bits-ai/