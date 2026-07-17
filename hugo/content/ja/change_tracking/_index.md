---
further_reading:
- link: /monitors/status/
  tag: ドキュメント
  text: モニターステータスページ
- link: /dashboards/
  tag: ドキュメント
  text: ダッシュボード
- link: /tracing/services/service_page/
  tag: ドキュメント
  text: サービスページ
- link: /api/latest/events/
  tag: ドキュメント
  text: イベント管理 API
- link: /tracing/services/deployment_tracking/
  tag: ドキュメント
  text: デプロイメント追跡
- link: /integrations/launchdarkly/#feature-flag-tracking-integration/
  tag: ドキュメント
  text: LaunchDarkly
- link: /watchdog/
  tag: ドキュメント
  text: Watchdog
- link: /database_monitoring/
  tag: ドキュメント
  text: Database Monitoring
- link: /data_streams/
  tag: ドキュメント
  text: データストリームのモニタリング
title: Change Tracking
---

## 概要

Change Tracking は、サービスおよびその依存関係に関連する変更を可視化することで、トラブルシューティングやインシデント対応を効率化し、問題発生時の検出および対処を迅速化します。

{{< img src="/change_tracking/change-tracking-overview.png" alt="サービス概要の「最近の変更」タイムライン上で表示される変更の詳細" style="width:100%;" >}}

Change Tracking は、サービスおよびその依存関係における以下のような幅広い変更の監視をサポートします。
- デプロイ
- フィーチャーフラグ
- データベース変更
- スキーマ変更
- スケール調整
- Kubernetes 調整
- Kubernetes Pod クラッシュ
- Watchdog アラート

サポートされている特定の変更タイプおよび設定要件の詳細については、[トラッキングされた変更](#tracked-changes)セクションを参照してください。

## Change Tracking の使用方法

Change Tracking は、Datadog の複数のページで利用できます。

### モニターステータスページ

[モニターステータスページ][1]から変更を表示および分析します。

{{< img src="/change_tracking/change-tracking-monitor-status-page.png" alt="モニターステータスページ上で表示される Change Tracking" style="width:100%;" >}}

#### 前提条件

モニターステータスページで変更トラッキングを使用するには、対象となるサービスが以下を満たしている必要があります。
- モニタークエリで指定されていること
- グループの一部として選択されていること
- モニターに `service` タグとして追加されていること

#### モニターステータスページからの変更分析手順:

1. 分析対象のモニターのモニターステータスページに移動します。
1. ページ上部にある Change Tracking タイムラインを見つけます。
   - モニタークエリでグループ化されて複数グラフがある場合、特定のグループにフィルタリングします。
1. タイムラインとイベントグラフを併用して、アラートと変更イベントを相関させます。
1. タイムライン上の変更インジケーターをクリックし、サイドパネルで変更の詳細を確認します。
1. サイドパネルでは、変更の詳細をより深く調査し、以下のアクションを実行できます。
   - CI/CD システム内でデプロイを表示
   - リポジトリ内の最新コミットを表示
   - デプロイ間の変更を比較して潜在的な問題を特定
   - カスタムリンクを追加して関連リソースへ迅速にアクセス

### サービス

[サービスページ][2]から変更を表示および分析します。

{{< img src="/change_tracking/change-tracking-service-page.png" alt="サービスサマリーセクション内の「最近の変更」コンポーネント、依存関係の変更を表示" style="width:100%;" >}}

#### サービスページからの変更分析手順:

1. 調査対象のサービスページに移動します。
1. **Service Summary** セクション内にある変更タイムラインを見つけます。
1. ドロップダウンを使用して以下を表示します。
   - サービス別の変更 (**Changes by Service**)
   - サービスおよび依存関係別の変更 (**Changes by Service & Dependencies**)
1. 変更インジケーターをクリックして詳細情報を表示し、対処アクションを実行します。

### ダッシュボード

任意の[ダッシュボード][3]から変更を表示および分析します。

{{< img src="/change_tracking/change-tracking-dashboard-show-overlays-active.png" alt="ダッシュボード上で表示される Change Tracking" style="width:100%;" >}}

#### 前提条件
ダッシュボード上のタイムラインおよびオーバーレイに関連する変更を表示するには、少なくとも 1 つの時系列ウィジェットを設定しておく必要があります。

#### ダッシュボードからの変更分析手順:

1. ダッシュボードに移動します。
2. ページ上部の **Show Overlays** をクリックして、変更タイムラインおよびウィジェット上の変更オーバーレイを有効にします。
3. 変更インジケーターまたはオーバーレイ上にカーソルを合わせると、変更の概要が表示されます。
4. 変更インジケーターまたはオーバーレイをクリックして詳細情報を表示し、対処アクションを実行します。

## トラッキングされた変更

Change Tracking は、インフラストラクチャー全体で以下の種類の変更を追跡します。

| 変更タイプ | トラッキング要件 |
| ----------- | ----------- |
| コードデプロイ (APM) | APM および[デプロイメント追跡][4]: サービス上にバージョンが利用可能である必要があります。
| Kubernetes デプロイマニフェストの更新 | Datadog Agent による Kubernetes セットアップ (可能な場合は Kubernetes YAML ファイルに service ラベルを追加)
| LaunchDarkly フィーチャーフラグイベント (event に service タグが必要) | サードパーティ Datadog インテグレーション ([LaunchDarkly のみ][5])
| カスタムフィーチャーフラグイベント | [イベント管理 API][6]
| Watchdog アラート (エラーレート急増、レイテンシー急増、クラウドおよび API 障害など) | 特定の Watchdog アラート要件については [Watchdog][7] ドキュメントを参照してください。
| CrashLoopBackOff Kubernetes Pod クラッシュ | Kubernetes インテグレーション (可能な場合は Kubernetes YAML ファイルに service ラベルを追加)
| PostgreSQL データベーステーブルの変更 | [データベースモニタリング (DBM)][8]、[Database Monitoring とトレースの相関付け][10]
| PostgreSQL データベース設定の変更 | [データベースモニタリング (DBM)][8]、[Database Monitoring とトレースの相関付け][10]
|  Kafka スキーマの更新 | [データストリームのモニタリング (DSM)][9]
| 手動による Kubernetes デプロイのスケールイベント | Kubernetes Audit Logging

## 参考資料

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