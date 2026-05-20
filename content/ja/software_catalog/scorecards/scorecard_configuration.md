---
aliases:
- /ja/tracing/software_catalog/scorecards/scorecard_configuration
- /ja/tracing/service_catalog/scorecards/scorecard_configuration
- /ja/service_catalog/scorecards/scorecard_configuration
further_reading:
- link: /tracing/software_catalog/
  tag: ドキュメント
  text: ソフトウェアカタログ
- link: /api/latest/service-scorecards/
  tag: ドキュメント
  text: Scorecards API
- link: https://www.datadoghq.com/blog/service-scorecards/
  tag: ブログ
  text: Scorecards を使ってサービスの可観測性におけるベストプラクティスを優先し、推進する
- link: https://www.datadoghq.com/blog/datadog-custom-scorecards/
  tag: ブログ
  text: カスタム Scorecards でベストプラクティスを形式化する
- link: /continuous_integration/dora_metrics/
  tag: ドキュメント
  text: Datadog を使用して DORA メトリクスを追跡する
title: スコアカード構成
---

{{< callout url="#" btn_hidden="true" header="false" >}}
Scorecards はプレビュー版です。
{{< /callout >}}

Datadog では、デフォルトのルールセットに基づき、以下のスコアカードをすぐに利用できます: Production Readiness、Observability Best Practices、Ownership & Documentation。

## デフォルトのスコアカードの設定

デフォルトの各スコアカードについて、評価基準となる標準ルールを選択するには:

1. Software Catalog の [Scorecards ページ][1]を開きます。
2. スコアの計算方法をカスタマイズするルールを有効または無効にします。
3. **View your scores** をクリックすると、定義したサービス全体で、選択したルールに対する進捗状況の追跡が開始されます。

{{< img src="/tracing/software_catalog/scorecards-setup.png" alt="スコアカードの設定ページ" style="width:90%;" >}}

## サービスの評価方法

デフォルトのスコア カードが設定されると、Software Catalog の Scorecards ページに、標準ルールの一覧と、それらのルールに合格しているサービスの割合が表示されます。ルールをクリックすると、合格しているサービスと不合格のサービス、およびそれらのサービスを担当するチームの詳細が表示されます。

### Production Readiness

すべてのサービスにおける Production Readiness スコアは、特に明記されていない限り、以下のルールに基づいて算出されます。

Have any SLOs defined (SLO が定義されている) 
: [サービスレベル目標 (SLO)][2] は、アプリケーションのパフォーマンスに関して明確なターゲットを定義するためのフレームワークを提供するもので、一貫したカスタマーエクスペリエンスを提供し、プラットフォームの安定性と機能開発のバランスを取り、内部および外部ユーザーとのコミュニケーションを改善するのに役立ちます。

Have any monitors defined (モニターが定義されている)
: モニターを利用して環境の問題に迅速に対応することで、ダウンタイムを削減できます。[モニターテンプレート][3]を確認してください。

Specified on-call (オンコール担当が指定されている)
: サービスの責任の所在を明確にすることで、すべての関係者にとってオンコール対応を改善します。これにより、オンコール エンジニアはインシデント発生時に適切な連絡先を把握でき、インシデントの解決に要する時間を短縮できます。

Last deployment occurred within the last 3 months (直近のデプロイメントが 3 か月以内に行われた)
: APM または USM によって監視されているサービスが対象。アジャイル開発の実践により、ユーザーからのフィードバックに迅速に対応し、エンドユーザーにとって最も重要な機能の開発に軸足を移すことができます。 

### Observability Best Practices

Observability Best Practices スコアは、以下のルールに基づいて算出されます。

Deployment tracking is active (デプロイメント トラッキングが有効になっている)
: APM または USM によって監視されているサービスが対象です。[統合サービス タグ付けでバージョン タグを実装することで、スムーズなロールアウトを実現][4]できます。機能の新バージョンをロールアウトすると、Datadog はエラー率やリクエスト数などにおけるバージョン間の差異を検出してアラートを生成します。これにより、エンド ユーザー エクスペリエンスを向上させるために、以前のバージョンにロールバックすべきタイミングを把握できます。

Logs correlation is active (ログの相関付けが有効になっている)
: APM サービスが対象で、過去 1 時間に検出されたログに基づいて評価されます。[APM とログの相関付け][5]により、エンド ユーザーに関わる問題のトラブル シューティングを迅速化し、インシデントや障害の際の対応時間を削減できます。

### Ownership & Documentation

Ownership & Documentation スコアは、以下のルールに基づいて算出されます。

Team defined (チームが定義されている)
: チームを定義することで、オンコールスタッフは、自分がよく知らないサービスが問題の根本原因である場合に、どのチームにエスカレーションすべきかを把握しやすくなります。

Contacts defined (連絡先が定義されている)
: 連絡先を定義することで、オンコールスタッフが別のサービスのオーナーにエスカレーションする時間を短縮し、障害やインシデントからより迅速にサービスを復旧させることができます。

Code repos defined (コードリポジトリが定義されている)
: コードリポジトリを特定することで、エンジニアはサービスの所有チームに連絡することなく、問題の初期調査を行うことができます。これにより、コラボレーションがよりスムーズになり、エンジニアは統合ポイントに関する総合的な理解を深めることができます。

Any docs defined (ドキュメントが 1 つ以上定義されている)
: Software Catalog の Other Links セクションで、ランブック、ダッシュボード、その他の内部ドキュメントなどのリソースへの追加リンクを指定します。これにより、初期調査に役立ち、障害やインシデントの際に緊急対応用のランブックへすばやくアクセスできます。

## スコアの計算方法

すぐに使える各スコアカード (Production Readiness、Observability Best Practices、Ownership & Documentation) は、デフォルトのルールセットで構成されています。これらのルールは合否の条件を反映しており、1 日に 1 回自動的に評価されます。カスタムルールに対するサービスのスコアは、Scorecards API を使用して送信された結果に基づき算出されます。サービスのスコアの計算から特定のカスタムルールを除外するには、Scorecards API でその結果を `skip` に設定します。

個々のルールには、データの利用可能性に基づく制限がある可能性があります。たとえば、デプロイメント関連のルールは、APM [統合サービスタグ付け][6]を介したバージョンタグの利用可能性に依存します。

各ルールには、そのルールに合格しているサービスの割合がスコアとして表示されます。各スコア カードには、すべてのルールにわたる合格状況を集計した総合スコア率が表示されます。これは、すべてのルールに合格しているサービス数を示すものでは**ありません**。スキップされたルールと無効化されたルールは、この計算に含まれません。

## ルールをレベル分けする

ルールをレベルごとにグループ化し、その重要度によって分類することができます。3 つのレベルが予め定義されています。

- レベル 1 - 基本ルール: オンコール オーナーの指定、モニタリングの整備、チームの定義など、すべての本番サービスに求められる基本要件を反映したルールです。
- レベル 2 - 中間レベルのルール: これらのルールは、ほとんどのサービスで採用すべき堅実なエンジニアリング プラクティスを反映しています。たとえば、SLO の定義や Software Catalog 内でのドキュメントへのリンク設定などがあります。
- レベル 3 - 高度なルール: これらは、成熟したエンジニアリング プラクティスを示す、目指すべきルールです。すべてのサービスに当てはまるとは限りませんが、チームにとって価値のある目標です。

レベルの設定は、標準のルールでもカスタムルールでも行うことができます。デフォルトでは、レベルの設定されていないルールは自動的にレベル 3 に分類されます。このデフォルトの割り当ては、ルールを編集することで変更できます。

{{< img src="/tracing/software_catalog/scorecard-levels.png" alt="レベル分けされた Scorecards の UI" style="width:90%;" >}}

Scorecards の UI では、スコアカードまたはレベルごとにルールをグループ化できます。Software Catalog では、特定のサービスがどのようにレベルアップしているかを追跡できます。各サービスは Level 0 からスタートします。レベル 1 のルールにすべて合格すると Level 1 となり、最終的には Level 3 のステータスに到達します。

{{< img src="/tracing/software_catalog/scorecard-levels-software-catalog.png" alt="サービスのレベル別のステータスが表示された Software Catalog の Scorecards ビュー" style="width:90%;" >}}

## スコアカードのルールのスコープ設定 

スコープを設定することで、Software Catalog のエンティティ定義のメタデータを使用して、ルールの適用対象となるエンティティを定義できます。スコープが定義されていない場合、ルールはカタログ内のすべての定義済みサービスに適用されます。`team`、`tier`、カスタムタグなど、エンティティ定義内の任意のフィールドを使ってスコープを設定できます。

デフォルトでは、サービスがルールの評価対象となるには、指定されたすべての条件に一致している必要があります。`OR` ステートメントを使用することで、同じフィールドに複数の値を含めることができます。

{{< img src="/tracing/software_catalog/scorecard-edit-scope.png" alt="スコアカードの設定ページ" style="width:90%;" >}}

スコープは、標準のルールとカスタムルールの両方に設定できます。ルールにスコープを追加すると、そのスコープに一致しなくなったサービスの過去の結果の記録は UI 上で非表示となり、スコアの計算から除外されます。後からスコープを削除した場合、これらの結果が再表示され、再び計算に含められます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services/scorecard
[2]: /ja/service_management/service_level_objectives/
[3]: https://app.datadoghq.com/monitors/recommended
[4]: /ja/tracing/services/deployment_tracking/
[5]: /ja/tracing/other_telemetry/connect_logs_and_traces/
[6]: /ja/getting_started/tagging/unified_service_tagging/