---
algolia:
  tags:
  - data retention
aliases:
- /ja/developers/faq/data-collection-resolution-retention/
- /ja/developers/guide/data-collection-resolution-retention
attributes:
- data_type: '- **エラー**: 15 日間

    - **インデックス化されたスパン**: 15 日間または 30 日間 (お客様のプランによって決まります)

    - **サービス/リソース統計**: 30 日間

    - **表示済みのトレース**: アカウントの有効期間中保持されます

    '
  product: APM
- data_type: '- **セキュリティシグナル**: 15 か月間

    - **スパン**: 90 日間

    '
  product: App and API Protection
- data_type: '- **監査ログ (Audit Trail が有効な場合)**: 90 日間

    - **監査ログ (Audit Trail が無効な場合)**: 7 日間

    '
  product: Audit Trail
- data_type: '- **メッセージ**: 15 か月間

    '
  product: Bits Chat
- data_type: '- **ソースコード**: 7 日間

    '
  product: Bits Code
- data_type: '- **調査**: アカウントの有効期間中保持されます

    '
  product: Bits Investigation
- data_type: '- **セッション、ビュー、アクション、およびエラーイベント**: 30 日間

    - **リソース、ロングタスク、およびバイタルイベント**: 15 日間

    '
  product: Browser RUM
- data_type: '- **ケース**: アカウントの有効期間中保持されます

    '
  product: Case Management
- data_type: '- **デプロイメント**: 30 日間

    '
  product: CD Visibility
- data_type: '- **パイプライン、ステージ、ジョブ、セットアップ、コマンド**: 15 か月間

    '
  product: CI Pipeline Visibility
- data_type: '- **コストメトリクス**: 15 か月間

    - **推奨事項**: 90 日間

    '
  product: Cloud Cost Management
- data_type: '- **検出結果および解決済みの脆弱性**: 15 か月間

    '
  product: Cloud Security
- data_type: '- **シグナル**: 15 か月間

    - **検出、通知、抑制**: アカウントの有効期間中保持されます

    '
  product: Cloud SIEM
- data_type: '- **イベント**: 90 日間

    - **セキュリティシグナル**: 15 か月間

    '
  product: Workload Protection
- data_type: '- **スキャン**: 15 か月間

    '
  product: Code Security SAST
- data_type: '- **検出された脆弱性**: 15 か月間

    '
  product: Code Security IAST
- data_type: '- **コンテナメタデータ**: 2 時間

    - **ライブプロセスおよびコンテナ**: 36 時間

    - **YAML 定義**: 7 日間

    '
  product: Container and Process Monitoring
- data_type: '- **フレームグラフ、コールグラフ、スレッドタイムライン**: 8 日間

    - **ノートブックにエクスポートされたフレームグラフ**: 1 年間

    - **UI で少なくとも 1 回開かれた個別のプロファイル**: 1 年間

    - **プロファイルメトリクス**: 30 日間

    '
  product: Continuous Profiler
- data_type: '- **バッチ結果**: 2 か月間

    - **テスト結果**: 2 か月間

    '
  product: Continuous Testing
- data_type: '- **ジョブトレース**: 90 日間

    '
  product: 'Data Observability: Jobs Monitoring'
- data_type: '- **クエリサンプル**: 15 日間

    - **クエリメトリクス**: 15 か月間

    '
  product: Database Monitoring
- data_type: '- **Dashboards、Notebooks、Monitors**: アカウントの有効期間中保持されます

    '
  product: Datadog App
- data_type: '- **デプロイメント**: 2 年間

    '
  product: DORA Metrics
- data_type: '- **エラーサンプル**: 30 日間

    - **課題**: 最終アクティビティから 1 年間

    '
  product: Error Tracking
- data_type: '- **イベント**: 15 か月間

    '
  product: Event Management
- data_type: '- **インシデント**: アカウントの有効期間中保持されます

    '
  product: Incident Management
- data_type: '- **本番環境のトレースとスパン**: 15 日間 (デフォルト)、30 日間、60 日間、または 90 日間 (お客様のプランによって決まります)

    - **実験のトレースとスパン**: 15 日間 (デフォルト)、90 日間、180 日間、270 日間、365 日間 (お客様のプランによって決まります)

    - **データセット**: 3 年間

    '
  product: Agent Observability
- data_type: '- **ログ**: お客様のプランによって決まります

    - **Sensitive Data Scanner の例ログ**: <span class="d-none site-region-container"
    data-region="us,us3,us5,eu,ap1,ap2,uk1">3 日間</span><span class="d-none site-region-container"
    data-region="gov,gov2">7 日間</span>

    '
  product: Log Management
- data_type: '- **タグと値**: 15 か月間

    '
  product: Metrics
- data_type: '- **テスト結果 (UI に非表示)**: 2 か月間

    - **テスト結果 (UI に表示)**: 15 か月間

    - **モバイルアプリケーションバイナリ**: アカウントの有効期間中保持されます

    '
  product: Mobile App Testing
- data_type: '- **セッション、ビュー、アクション、およびエラーイベント**: 30 日間

    - **リソース、ロングタスク、およびバイタルイベント**: 15 日間

    '
  product: Mobile RUM
- data_type: '- **NetFlow**: 15 日間、30 日間、60 日間、または 90 日間 (お客様のプランによって決まります)

    - **SNMP トラップ**: お客様のプランによって決まります (デフォルトは 15 日間)

    '
  product: Network Device Monitoring
- data_type: '- **ネットワークトラフィック**: 14 日間

    '
  product: Cloud Network Monitoring
- data_type: '- **Network Path Tests**: 30 日間

    '
  product: Network Path
- data_type: '- **イベント**: 15 か月間

    - **ユーザープロファイル**: 15 か月間。ただし、<a href="/product_analytics/guide/rum_and_product_analytics/#how-do-i-set-up-product-analytics">Product
    Analytics が有効になっていない</a>場合は 30 日間

    '
  product: Product Analytics
- data_type: '- **ゲート評価**: 30 日間

    '
  product: Quality Gates
- data_type: '- **テーブル**: アカウントの有効期間中保持されます

    '
  product: Reference Tables
- data_type: '- **サービスメタデータ**: アカウントの有効期間中保持されます

    '
  product: Service Catalog
- data_type: '- **SLO の結果**: 15 か月間

    '
  product: Service Level Objectives
- data_type: '- **リプレイ (UI の拡張オプションがオフの場合)**: 30 日間

    - **リプレイ (UI の拡張オプションがオンの場合)**: 15 か月間

    '
  product: Session Replay
- data_type: '- **検出された脆弱性**: 15 か月間

    '
  product: Software Composition Analysis (SCA)
- data_type: '- **ソースコード**: 7 日間

    '
  product: Source Code Integration
- data_type: '- **テスト結果**: 15 か月間

    '
  product: Synthetics
- data_type: '- **テスト**: 3 か月間

    '
  product: Test Visibility & Intelligent Test Runner
- data_type: '- **ワークフロー**: 30 日間

    '
  product: Workflow Automation
content: 以下の表に、データ型および製品別のデフォルトのデータ保持期間を示します。キーワードや説明文で検索して、目的のデータ型や製品を見つけることもできます。収集間隔と最小解像度の詳細については、[Datadog
  データ収集と解像度](/extend/guide/data-collection-resolution) を参照してください。まだサポートが必要ですか?[Datadog
  サポート](/help) にお問い合わせください。
disable_sidebar: true
filter_all: All
further_reading:
- link: /data_security/
  tag: ドキュメント
  text: Datadog に送信されるデータの主なカテゴリを確認してください。
title: データ保持期間
type: data_retention_periods
---
### 詳細はこちら {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}