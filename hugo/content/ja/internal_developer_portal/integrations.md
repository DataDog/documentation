---
aliases:
- /ja/tracing/software_catalog/integrations
- /ja/tracing/service_catalog/integrations
- /ja/service_catalog/integrations
- /ja/software_catalog/integrations
description: Internal Developer Portal を PagerDuty、Opsgenie、GitHub、Jira、CI/CD プラットフォームなどのサードパーティツールと接続し、Catalog
  のメタデータを充実させ、アクションを自動化します。
further_reading:
- link: /internal_developer_portal/catalog/entity_model/
  tag: ドキュメント
  text: サービス定義 API について
- link: /integrations/opsgenie/
  tag: ドキュメント
  text: Opsgenie インテグレーションについて
- link: /integrations/pagerduty/
  tag: ドキュメント
  text: PagerDuty インテグレーションについて
title: Integrations
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
Internal Developer Portal 向けの PagerDuty および Opsgenie インテグレーションは、 {{< region-param key=dd_datacenter code="true" >}} このサイトでは利用できません。
</div>
{{% /site-region %}}
  
## 概要 {#overview}

[Datadog インテグレーション][1] のサービスアカウントを設定すると、インテグレーションのメタデータを [Catalog][16] エンティティ定義に組み込むことができます。そこから [Action Catalog][31] を使用して、Datadog を離れることなく、外部システムにクエリを実行したり、インシデントの作成やチケットの更新などのアクションをトリガーしたりできます。

{{< callout url="https://forms.gle/PzXWxrnGaQPiVf9M8" header="新しいインテグレーションのリクエスト" >}}
{{< /callout >}}

## コラボレーション、インシデント管理、チケット管理 {#collaboration-incident-management-and-ticketing}

| インテグレーション | 説明 | アクションの例 (Action Catalog) |
|--------------|----------------|----------------------------------|
| [PagerDuty][2] | PagerDuty メタデータをサービスに追加することで、Catalog に、誰がオンコールしているか、そのサービスに対してアクティブな PagerDuty インシデントがあるかなどの情報を表示したり、リンクしたりすることができます。| `Get current on-call`、`Trigger incident` <br> [利用可能なすべてのアクションを見る。][32] |
| [Opsgenie][3] | Opsgenie メタデータをサービスに追加することで、Catalog に、そのサービスに対して誰がオンコールしているかなどの情報を表示したり、リンクしたりすることができます。| `Acknowledge alert`、`Get current on call` <br> [利用可能なすべてのアクションを見る。][33] |
| [StatusPage][4] | インシデントやコンポーネントに関する詳細の作成、更新、取得を行います。| `Create an incident`、`Update component status` <br> [利用可能なすべてのアクションを見る。][34] |
| [Freshservice][5] | Freshservice チケットの作成、更新、クエリを行います。| `List tickets`、`Update ticket` <br> [利用可能なすべてのアクションを見る。][35] |
| [Slack][6] | インシデントのアラートや更新を Slack チャンネルに送信し、チャンネル管理を行います。| `Invite users to channel`、`Set channel topic` <br> [利用可能なすべてのアクションを見る。][36] |
| [Microsoft Teams][7] | インシデントコラボレーションのために、Teams チャンネルにメッセージやプロンプトを送信します。| `Make a decision`、`Send a message` <br> [利用可能なすべてのアクションを見る。][37] |
| [Jira][8] | Datadog から直接課題を作成および更新します。| `Create issue`、`Add comment` <br> [利用可能なすべてのアクションを見る。][38] |
| [Asana][9] | Asana タスクの作成と更新、ユーザーの割り当て、タグの適用を行います。| `Add tag to task`、`Update task completed status` <br> [利用可能なすべてのアクションを見る。][39] |
| [LaunchDarkly][10] | 機能フラグの変更を追跡し、開発者が同じプラットフォーム上で変更を行えるようにし、変更に基づいた自動化を推進します。| `Add expire user target date`、`Toggle feature flag` <br> [利用可能なすべてのアクションを見る。][40] |

### セットアップの例 {#setup-examples}

{{% collapse-content title="PagerDuty" level="h4" expanded=false id="pagerduty-setup" %}}

[PagerDuty サービスディレクトリ][63] 内の任意のサービスを接続できます。Catalog 内の各サービスに 1 つの PagerDuty サービスをマッピングできます。

1. まだの場合は、[Datadog PagerDuty インテグレーション][2] をセットアップします。
1. [PagerDuty API アクセスキー][61] を取得します。
1. [PagerDuty インテグレーションセットアップ][52] ページでキーを貼り付けます。

   {{< img src="tracing/software_catalog/pagerduty-token.png" alt="API キー フィールドが強調表示された PagerDuty インテグレーションのセットアップフォーム。" style="width:100%;" >}}

1. [エンティティ定義][82] に PagerDuty 情報を追加します。
   ```
   ...
   integrations:
     pagerduty: https://www.pagerduty.com/service-directory/shopping-cart
   ...
   ```

{{% /collapse-content %}}

{{% collapse-content title="Opsgenie" level="h4" expanded=false id="opsgenie-setup" %}}

エンティティ定義に Opsgenie メタデータを追加するには:

1. まだの場合は、[Datadog Opsgenie インテグレーション][3] をセットアップします。
1. [Opsgenie API アクセスキー][62] を取得し、**構成アクセス**および**読み取り**権限があることを確認します。
3. [インテグレーションタイル][55] の下部でアカウントを追加し、Opsgenie API アクセスキーを貼り付け、Opsgenie アカウントのリージョンを選択します。

   {{< img src="tracing/software_catalog/create_account1.png" alt="Opsgenie インテグレーションタイルの新しいアカウント作成ワークフロー" style="width:80%;" >}}
   {{< img src="tracing/software_catalog/create_account2.png" alt="Opsgenie インテグレーションタイルの新しいアカウント作成ワークフロー" style="width:80%;" >}}

4. Opsgenie メタデータで [エンティティ定義][82] を更新します。たとえば、次のようにします。

   ```yaml
   "integrations": {
     "opsgenie": {
           "service-url": "https://www.opsgenie.com/service/123e4567-x12y-1234-a456-123456789000",
           "region": "US"
     }
   }
   ```

この手順が完了すると、Catalog 内のサービスの [**Ownership**] (オーナーシップ) タブに、[**On Call**] (オンコール) 情報ボックスが表示されます。

{{< img src="tracing/software_catalog/oncall_information.png" alt="Catalog で Opsgenie からの情報が表示されている On Call 情報ボックス" style="width:85%;" >}}

{{% /collapse-content %}}


## ソースコード管理 {#source-code-management}

| インテグレーション | 説明 | アクションの例 (Action Catalog) |
|--------------|----------------|----------------------------------|
| [GitHub][11] | 課題や PR の作成、リポジトリファイルの管理、チームアクセスの自動化を行います。| `Add labels to pull request`、`Get team membership` <br> [利用可能なすべてのアクションを見る。][41] |
| [GitLab][12] | 課題、マージリクエスト、ブランチ、コミットを管理します。| `Approve merge request`、`Cherry pick commit` <br> [利用可能なすべてのアクションを見る。][42] |
| その他 (Bitbucket、Azure Repos) | Datadog Catalog または Action Catalog でネイティブにサポートされていないプラットフォームと連携します。| 該当なし。HTTP アクションとリクエストを使用してプラットフォーム API を呼び出します。|

GitHub を使用してエンティティ定義を管理し、GitHub インテグレーションを構成して定義を Catalog に自動的にプルすることもできます。[エンティティ定義の作成と GitHub からのインポート][83] の詳細をご覧ください。

## CI/CD {#cicd}

| インテグレーション | 説明 | アクションの例 (Action Catalog) |
|--------------|----------------|----------------------------------|
| [GitHub Actions][11] | GitHub 上の CI/CD ワークフローの表示、起動、調整を行います。| `Get latest workflow run`、`Trigger github actions workflow run` <br> [利用可能なすべてのアクションを表示。][47] |
| [GitLab Pipelines][12] | GitLab プロジェクトのパイプラインを管理し、ジョブをキャンセルまたは再試行して、パイプラインの結果を照会します。| `Get latest pipeline`、`Retry jobs in a pipeline` <br> [利用可能なすべてのアクションを見る。][48] |
| [Jenkins][13] |  Jenkins ジョブのトリガーと管理を行います。| `Submit Jenkins job`、`Get Jenkins job status` <br> [利用可能なすべてのアクションを表示。][43] |
| [CircleCI][14] | CI パイプラインを操作します。| `Approve workflow job`、`Get job details` <br> [利用可能なすべてのアクションを表示。][44] |
| [Azure DevOps パイプライン (ADO)][15] | パイプラインをトリガーし、実行データを取得します。監視アクティビティに基づくデプロイや QA ワークフローの起動に最適です。| `Get pipeline`、`Run pipeline` <br> [利用可能なすべてのアクションを表示。][45] |

## CMDB および Internal Developer Portal {#cmdbs-and-internal-developer-portals}


ServiceNow および Backstage から Datadog の Catalog にエンティティをインポートできます。詳細については、以下のドキュメントを参照してください。

- [ServiceNow からエントリーをインポート][84]
- [Backstage からエントリーをインポート][85]


## クラウドリソース {#cloud-resources}

Datadog のインフラストラクチャー統合および [Resource Catalog][54] は、AWS、Azure、GCP にまたがる統合の包括的なインベントリを提供します。また、[Action Catalog][31] に用意されている Datadog の 1000 以上のアクションを活用して、カスタムの可視化、アクション、自動化を作成することもできます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/
[2]: /ja/integrations/pagerduty/
[3]: /ja/integrations/opsgenie
[4]: /ja/integrations/statuspage/
[5]: /ja/integrations/guide/freshservice-tickets-using-webhooks/
[6]: /ja/integrations/slack
[7]: /ja/integrations/microsoft_teams
[8]: /ja/integrations/jira
[9]: /ja/integrations/asana
[10]: /ja/integrations/launchdarkly
[11]: /ja/integrations/github
[12]: /ja/integrations/gitlab
[13]: /ja/integrations/jenkins
[14]: /ja/integrations/circleci
[15]: /ja/integrations/azure_devops/
[16]: /ja/internal_developer_portal/catalog/
[31]: /ja/actions/actions_catalog/
[32]: /ja/actions/actions_catalog/?search=pagerduty
[33]: /ja/actions/actions_catalog/?search=opsgenie
[34]: /ja/actions/actions_catalog/?search=statuspage
[35]: /ja/actions/actions_catalog/?search=freshservice
[36]: /ja/actions/actions_catalog/?search=slack
[37]: /ja/actions/actions_catalog/?search=microsoft+teams
[38]: /ja/actions/actions_catalog/?search=jira
[39]: /ja/actions/actions_catalog/?search=asana
[40]: /ja/actions/actions_catalog/?search=launchdarkly
[41]: /ja/actions/actions_catalog/?search=github
[42]: /ja/actions/actions_catalog/?search=gitlab
[43]: /ja/actions/actions_catalog/?search=jenkins
[44]: /ja/actions/actions_catalog/?search=circleci
[45]: /ja/actions/actions_catalog/?search=azure+devops
[47]: /ja/actions/actions_catalog/?search=github+actions
[48]: /ja/actions/actions_catalog/?search=gitlab+pipelines
[51]: https://app.datadoghq.com/services
[52]: https://app.datadoghq.com/integrations/pagerduty
[53]: https://app.datadoghq.com/integrations/github
[54]: https://app.datadoghq.com/infrastructure/catalog
[55]: https://app.datadoghq.com/integrations/opsgenie
[61]: https://support.pagerduty.com/docs/api-access-keys
[62]: https://support.atlassian.com/opsgenie/docs/api-key-management/
[63]: https://support.pagerduty.com/docs/service-directory
[82]: /ja/internal_developer_portal/catalog/entity_model
[83]: /ja/internal_developer_portal/catalog/set_up/create_entities#github-integration
[84]: /ja/internal_developer_portal/catalog/set_up/import_entities#import-from-servicenow
[85]: /ja/internal_developer_portal/catalog/set_up/import_entities#entities-from-backstage