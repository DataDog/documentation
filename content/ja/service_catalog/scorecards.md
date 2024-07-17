---
aliases:
- /ja/tracing/service_catalog/scorecards
further_reading:
- link: /tracing/service_catalog/
  tag: ドキュメント
  text: Service Catalog
- link: /api/latest/service-scorecards/
  tag: ドキュメント
  text: Service Scorecards API
- link: https://www.datadoghq.com/blog/service-scorecards/
  tag: ブログ
  text: サービススコアカードによるサービス観測可能性のベストプラクティスの優先順位付けと推進
- link: https://www.datadoghq.com/blog/datadog-custom-scorecards/
  tag: ブログ
  text: カスタムスコアカードによるベストプラクティスの公式化
- link: /continuous_integration/dora_metrics/
  tag: ドキュメント
  text: Track DORA Metrics with Datadog
kind: ドキュメント
title: Service Scorecards
---

{{< callout url="#" btn_hidden="true" header="false" >}}
サービススコアカードはベータ版です。
{{< /callout >}}

{{< img src="/tracing/service_catalog/scorecard-overview.png" alt="すぐに使える本番環境準備ルールをハイライトするサービススコアカードダッシュボード" style="width:90%;" >}}

## 概要

サービススコアカードは、サービスの健全性とパフォーマンスを向上させるための情報に基づいたアクションを実行するために、効果的な監視、優先順位付け、計画、コミュニケーションを支援します。各スコアカードには、本番環境準備、観測可能性ベストプラクティス、ドキュメントとオーナーシップのステータスが表示されます。サービスカタログで定義されたメタデータを持つすべてのサービスは、一連の成功/失敗の基準に対して自動的に評価されます。

スコアカードの表示に使用するルールを選択し、チームの Slack チャンネルに直接送信されるレポートを生成して、スコアカードの結果を定期的に報告することができます。

## スコアカードのセットアップ

デフォルトのスコアカードごとに、すぐに使えるルールのどれを評価するかを選択するには

1. サービスカタログの [Scorecards ページ][8]を開きます。
2. スコアの計算方法をカスタマイズするルールを有効または無効にします。
3. **View your scores** をクリックすると、定義されたサービス全体で選択したルールの進捗状況の追跡が開始されます。

{{< img src="/tracing/service_catalog/scorecards-setup.png" alt="サービススコアカードのセットアップページ" style="width:90%;" >}}

### カスタムルールの作成

[スコアカード API][10] を使用してスコアカードダッシュボードにカスタムルールを追加するには

1. ルールの名前、所属するスコアカード、ルールの説明、`/scorecard/rules` に渡す所有者を指定します。
2. 評価する `{rule, service}` タプルごとに `pass`、`fail`、`skip` の結果を `/scorecard/outcomes/batch` に送信します。
3. スコアカードダッシュボードで結果の概要を表示します。

初期セットアップ後も、API を通じてルールを有効または無効にすることもできます。


スコアカード UI を使用してスコアカードダッシュボードにカスタムルールを追加するには

1. Scorecards ページの **Create Rule** をクリックします。
2. ルールの名前、所属スコアカード、ルールの説明、所有チームを指定します。
3. 評価する `{rule, service}` タプルごとに `pass`、`fail`、`skip` の結果をスコアカード API `/scorecard/outcomes/batch` エンドポイントに送信します。
4. スコアカードダッシュボードで結果の概要を表示します。

{{< img src="/tracing/service_catalog/scorecard-create-rule-ui.png" alt="スコアボードダッシュボードでカスタムルールを追加するための Create Rule モーダル" style="width:90%;" >}}

## サービスの評価方法

デフォルトのスコアカードがセットアップされると、サービスカタログの Scorecards ページに、すぐに使えるルールのリストと、そのルールに成功したサービスの割合が表示されます。ルールをクリックすると、成功したサービス、失敗したサービス、およびそれらを所有するチームの詳細が表示されます。

### 本番環境準備 (Production readiness)

すべてのサービスの本番環境準備スコアは (特に明記されていない限り)、以下のルールに基づいています。

SLO の定義がある
: [サービスレベル目標 (SLO)][2] は、アプリケーションパフォーマンスに関する明確な目標を定義するためのフレームワークを提供します。これは、一貫したカスタマーエクスペリエンスを提供し、機能開発とプラットフォームの安定性のバランスをとり、社内外のユーザーとのコミュニケーションを改善するのに役立ちます。

モニターの定義がある
: モニターは、環境の問題にチームが迅速に対応できるようにすることで、ダウンタイムを削減します。[推奨モニター][3]を確認してください。

オンコールの指定
: サービスの明確なオーナーシップを確立することで、全員のオンコール体験を向上させます。これにより、インシデント発生時にオンコールエンジニアに適切な連絡先が提供され、インシデントの解決にかかる時間が短縮されます。

最後のデプロイが過去 3 か月以内に行われた
: APM または USM で監視されているサービスの場合。アジャイル開発を実践することで、ユーザーからのフィードバックに迅速に対応し、エンドユーザーにとって最も重要な機能の開発に軸足を移すことができます。

### 観測可能性ベストプラクティス (Observability best practices)

観測可能性ベストプラクティススコアは、以下のルールに基づいています。

デプロイメント追跡がアクティブ
: APM または USM で監視されているサービスの場合。[統合サービスタグ付けによるバージョンタグの実装でスムーズなロールアウトを実現します][4]。機能の新バージョンをロールアウトすると、Datadog はエラーレートやリクエスト数などのバージョン間の違いをキャプチャしてアラートを送信します。これにより、エンドユーザエクスペリエンスを向上させるために、以前のバージョンにロールバックするタイミングを把握することができます。

ログの相関がアクティブ
: APM サービスについては、過去 1 時間に検出されたログに基づいて評価されます。[APM とログの相関][5]は、エンドユーザーのトラブルシューティングの速度を向上させ、インシデントや障害発生時の時間を節約します。

### オーナーシップとドキュメント (Ownership and documentation)

オーナーシップとドキュメントのスコアは、以下のルールに基づいています。

チームの定義
: チームを定義することで、オンコールスタッフは、自分が詳しくないサービスが問題の根本的な原因である場合に、どのチームにエスカレーションすべきかを簡単に知ることができます。

連絡先の定義
: 連絡先を定義することで、オンコールスタッフが別のサービスのオーナーにエスカレーションする時間が短縮され、障害やインシデントからの迅速なサービス復旧に役立ちます。

コードリポジトリの定義
: コードリポジトリを特定することで、エンジニアはサービスの担当チームに連絡することなく、問題の初期調査を行うことができます。これにより、コラボレーションが向上し、インテグレーションポイントに関するエンジニアの全体的な理解が深まります。

ドキュメントの定義
: サービスカタログの Other Links セクションで、ランブック、ダッシュボード、その他の内部ドキュメントなどのリソースへの追加リンクを指定します。これは初期調査に役立ち、障害やインシデントの緊急修復ランブックにすばやくアクセスできるようになります。

## スコアの計算方法

Each out-of-the-box scorecard (Production Readiness, Observability Best Practices, Ownership & Documentation) is made up of a default set of rules. These reflect pass-fail conditions and are automatically evaluated once per day. A service's score against custom rules is based on outcomes sent using the Scorecards API. To exclude a particular custom rule from a service's score calculation, set its outcome to `skip` in the Scorecards API.

個々のルールには、データの利用可否に基づく制限がある場合があります。例えば、デプロイメント関連のルールは、APM の[統合サービスタグ付け][7]を介したバージョンタグの利用可否に依存しています。

各ルールには、成功したサービスの割合のスコアが表示されます。各スコアカードには、すべてのルールを対象に成功したサービスの数を合計する総合スコアのパーセンテージがあります。これは、すべてのルールに成功したサービスの数では**ありません**。スキップされたルールや無効なルールは、この計算に含まれません。

## サービスレベルの詳細とスコアを表示する

スコアカードのサマリーは、サービスカタログの [**Explore** ページ][1]の **Ownership** タブの **Scorecards** 列からアクセスできます。特定のサービスまたはサービスのサブセットが各スコアカードでどのように機能しているか、および各スコアカード内のルールを確認することができます。

スコアカードから **View Details** をクリックするか、サービス詳細のサイドパネルを開いて **Scorecards** タブを表示します。ここには、すべてのスコアカード、ルール、各ルールに対するサービスの成功/失敗スコアが表示されます。

## Track scores over time

You can visualize how teams' scores progress over time as they make changes and remediate known issues through historical timeseries in the Scorecards UI. 

{{< img src="/tracing/service_catalog/scorecard-historical-metrics.png" alt="Timeseries that shows change in scores over time in Scorecard UI" style="width:90%;" >}}

You can also add these time series and customized queries using the `dd.scorecard.outcome` metric in Dashboards and Notebooks to share with stakeholders. This metric can be filtered on different tags such as `team`, `rule`, `scorecard`, `application`, `tier`, and `lifecycle`. 

{{< img src="/tracing/service_catalog/scorecard-metric.png" alt="Scorecards historical data shown in Dashboard editor" style="width:90%;" >}}

## Generating Scorecard reports

You can generate Scorecard reports, which send scheduled overviews of Scorecard information to your team's Slack channel to help everyone understand how services and teams are meeting the expected standards. Creating a report generates a Workflow using [Datadog Workflow Automation][9], which runs at a scheduled time. 

<div class="alert alert-warning">Running this Workflow may impact your billing. Read the <a href="https://www.datadoghq.com/pricing/?product=workflow-automation#products">pricing page</a> for more information</div>

To create a Report:

1. Click **Create Report** on the Scorecards page. 
2. Choose whether to include all defined services across your organization or a specific team's services. 
3. Set the date, time, and frequency at which you want to receive these reports.
4. Set the Slack workspace and channel where the reports should be sent. The selected channel must be public and have the Datadog Slack app installed. 
5. Click **Enable this Workflow**.

Using this information, Datadog sends you reports on the highest and lowest scoring rules, services, and teams. 

{{< img src="/tracing/service_catalog/scorecard-reports.png" alt="Scorecard reports creation modal showing how to create report for all services" style="width:90%;" >}}


### Managing Scorecard reports
To edit or delete a Workflow, click **Manage Reports** on the Scorecards page and select the Workflow. Make edits to the Workflow or delete it using the Settings menu. 


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /ja/service_management/service_level_objectives/
[3]: https://app.datadoghq.com/monitors/recommended
[4]: /ja/tracing/services/deployment_tracking/
[5]: /ja/tracing/other_telemetry/connect_logs_and_traces/
[6]: /ja/tracing/service_catalog/
[7]: /ja/getting_started/tagging/unified_service_tagging/
[8]: https://app.datadoghq.com/services/scorecard
[9]: /ja/service_management/workflows/
[10]: /ja/api/latest/service-scorecards/