---
description: デプロイメント、機能フラグ、構成変更、およびサービスに対するその他の変更を監視することで、Change Tracking を使用したトラブルシューティングを効率化します。
further_reading:
- link: https://www.datadoghq.com/blog/change-tracking/
  tag: ブログ
  text: サービスおよび依存関係に対する変更の可視性を統合
- link: https://www.datadoghq.com/blog/ai/investigate-production-alerts/
  tag: ブログ
  text: 本番環境のアラートを調査するように 9B モデルをトレーニングする
- link: /monitors/status/
  tag: ドキュメント
  text: Monitor Status Page
- link: /dashboards/
  tag: ドキュメント
  text: ダッシュボード
- link: /tracing/services/service_page/
  tag: ドキュメント
  text: サービス詳細画面
title: Change Tracking
---
## 概要{#overview}

Change Tracking は、サービスおよびその依存関係に関連する変更を可視化することで、トラブルシューティングやインシデント対応を効率化し、問題発生時の検出および対処を迅速化します。

{{< img src="/change_tracking/change-tracking-overview-2.png" alt="サービスサマリーの [Recent Changes] (最近の変更) タイムラインにおける変更の詳細" style="width:100%;" >}}

Change Tracking は、サービスおよびその依存関係における以下のような幅広い変更の監視をサポートします。
- デプロイメント
- 機能フラグ
- トラフィック急増
- 構成の変更
- データベース変更
- スキーマ変更
- スケール調整
- Kubernetes 調整
- Kubernetes Pod クラッシュ
- Watchdog アラート

サポートされている特定の変更タイプおよび設定要件の詳細については、[トラッキングされる変更タイプ][16]を参照してください。

## Change Tracking の使用方法 {#using-change-tracking}

Change Tracking は、Datadog の複数のページで利用できます。

### モニターステータスページ{#monitor-status-page}

[モニターステータスページ][1]から変更を表示および分析します。

{{< img src="/change_tracking/change-tracking-monitor-status-page-2.png" alt="モニターステータスページに表示されている Change Tracking" style="width:100%;" >}}

#### 前提条件 {#prerequisites}

モニターステータスページで変更トラッキングを使用するには、対象となるサービスが以下を満たしている必要があります。
- モニタークエリで指定されていること。
- グループの一部として選択されていること。
- モニターに `service` タグとして追加されていること。

#### モニターステータスページからの変更分析手順:{#to-analyze-changes-from-the-monitor-status-page}

1. 分析対象のモニターのモニターステータスページに移動します。
1. ページ上部にある Change Tracking タイムラインを見つけます。
   - モニタークエリでグループ化されて複数グラフがある場合、特定のグループにフィルタリングします。
1. タイムラインとイベントグラフを併用して、アラートと変更イベントを相関させます。
1. タイムライン上の変更インジケーターをクリックし、サイドパネルで変更の詳細を確認します。
1. サイドパネルでは、変更の詳細をより深く調査し、以下のアクションを実行できます。
   - CI/CD システム内でのデプロイを表示します。
   - リポジトリ内の最新コミットを表示します。
   - デプロイ間の変更を比較して潜在的な問題を特定します。
   - 関連リソースへ迅速にアクセスできるようにするため、カスタムリンクを追加します。

### サービス {#services}

[サービスページ][2]から変更を表示および分析します。

{{< img src="/change_tracking/change-tracking-service-page-2.png" alt="[Service Summary] (サービスサマリー) セクション内の [Recent Changes] (最近の変更) コンポーネント。依存関係の変更が表示されています。" style="width:100%;" >}}

#### サービスページからの変更分析手順:{#to-analyze-changes-from-the-service-page}

1. 調査対象のサービスページに移動します。
1. [{{< ui >}}Service Summary{{< /ui >}}] (サービスサマリー) セクション内にある変更タイムラインを見つけます。
1. サービスと依存関係のタブを使用して、以下のいずれかを表示します。
   - 特定のサービスに限定された変更 ([{{< ui >}}Changes by Service{{< /ui >}}] (サービス別の変更))
   - 特定のサービスと、このサービスに影響を与える可能性のある依存関係サービスへの変更 ({{< ui >}}Changes by Service + Dependencies{{< /ui >}} (サービスおよび依存関係別の変更) )
1. 変更インジケーターをクリックして詳細情報を表示し、対処アクションを実行します。

### ダッシュボード {#dashboards}

任意の[ダッシュボード][3]から変更を表示および分析します。

{{< img src="/change_tracking/change-tracking-dashboard-show-overlays-active-2.png" alt="ダッシュボードに表示される Change Tracking" style="width:100%;" >}}

#### 前提条件 {#prerequisites-1}
ダッシュボード上のタイムラインおよびオーバーレイに関連する変更を表示するには、少なくとも 1 つの時系列ウィジェットを設定しておく必要があります。

#### ダッシュボードからの変更分析手順:{#to-analyze-changes-from-dashboards}

1. ダッシュボードに移動します。
2. ページ上部の [{{< ui >}}Show Overlays{{< /ui >}}] (オーバーレイを表示) をクリックして、変更タイムラインおよびウィジェット上の変更オーバーレイを有効にします。
3. 変更インジケーターまたはオーバーレイ上にカーソルを合わせると、変更の概要が表示されます。
4. 変更インジケーターまたはオーバーレイをクリックして詳細情報を表示し、対処アクションを実行します。

### ウィジェット {#widgets}

すぐに利用可能なインテグレーションに加え、Change Tracking はダッシュボードや Notebooks を含む Datadog 全体のウィジェットのデータソースとして利用できます。

{{< img src="/change_tracking/change-tracking-datasource-examples.png" alt="Change Tracking データソースの例" style="width:100%;" >}}

Change Tracking データを使用してウィジェットを構成するには、以下の手順に従います。

1.	ダッシュボードまたはノートブックで、サポートされているウィジェットタイプ (時系列、クエリ値、テーブル、ツリーマップ、トップリスト、円グラフ、変更、または棒グラフ) を追加または編集します。
3.	[{{< ui >}}data source{{< /ui >}}] (データソース) ドロップダウンで [{{< ui >}}Change Tracking{{< /ui >}}] (変更) を選択します。
4.	フィルターを構成します ({{< ui >}}Service{{< /ui >}} は必須です)。
5.	(オプション) グループ化をサポートするウィジェットの場合、[{{< ui >}}Group by{{< /ui >}}] (グループ化) を使用して結果を分割します。

{{< img src="/change_tracking/change-tracking-datasource-edit-widget.png" alt="Change Tracking データソースウィジェット" style="width:100%;" >}}

時系列ウィジェットでは、Change Tracking を {{< ui >}}Event Overlay{{< /ui >}} (イベントオーバーレイ) として有効にできます。これにより、時系列の上に変更が表示され、メトリクスの動作との相関関係を把握できるようになります。

{{< img src="/change_tracking/change-tracking-datasource-edit-overlay.png" alt="イベントオーバーレイとしての Change Tracking データソース" style="width:100%;" >}}


#### 変更の詳細を表示する {#view-change-details}

1 つの変更または一連の変更に関する情報を表示するには、ウィジェット内のデータポイントをクリックして [{{< ui >}}View Changes{{< /ui >}}] (変更を表示) を選択します。これにより、Change Tracking のサイドパネルが開き、追加の詳細が表示されます。

## トラッキング可能な変更タイプ {#change-types-you-can-track}

Change Tracking は、デプロイメント、機能フラグ、データベースの変更、ストリーミングとアプリケーションの動作、インフラストラクチャーの変更、およびユーザー自身が送信するカスタム変更を対象としています。

変更タイプの完全なリスト、各タイプに対応する Datadog の機能、および有効化に必要な設定については、[トラッキングされる変更タイプ][16]を参照してください。
  

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/status/
[2]: /ja/tracing/services/service_page/
[3]: /ja/dashboards/
[4]: /ja/tracing/services/deployment_tracking/
[5]: /ja/integrations/launchdarkly/#feature-flag-tracking-integration/
[6]: /ja/api/latest/events/
[7]: /ja/watchdog/
[8]: /ja/database_monitoring/
[9]: /ja/data_streams/
[10]: /ja/database_monitoring/connect_dbm_and_apm/
[11]: /ja/actions/connections/#work-with-connections
[12]: /ja/database_monitoring/schema_explorer
[13]: /ja/infrastructure/resource_catalog/resource_changes/
[15]: /ja/tracing
[16]: /ja/change_tracking/change_types/