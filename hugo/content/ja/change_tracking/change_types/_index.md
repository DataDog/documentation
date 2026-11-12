---
description: Change Tracking が監視する変更の種類、その種類の変更が行われる Datadog 機能、および各変更の追跡を有効にする方法について説明します。
title: 追跡される変更の種類
---
Change Tracking は、複数の Datadog 製品から変更を収集します。Change Tracking 製品を別途購入する必要はなく、ほとんどの場合、別途 Agent やインテグレーションをインストールする必要はありません。基盤となるテレメトリを送信している場合、変更はすでに追跡されています。

このページの情報を利用して、以下を確認してください。

- その種類の変更がどの Datadog で行われたものか。
- 設定が必要なものがある場合、それは何か。

## サポートされている変更の種類 {#supported-change-types}

### デプロイメント {#deployments}

| 変更の種類 | 変更元 | 有効にする方法 |
| --- | --- | --- |
| バックエンドコードのデプロイ | APM | サービスに `version` タグが存在する必要があります。タグの設定については、「[Unified Service Tagging][11]」を参照してください。|
| フロントエンドのデプロイ | RUM | [RUM デプロイ追跡][2]を設定します。|
| Kubernetes デプロイマニフェストの更新 | Kubernetes 上の Datadog Agent | 可能な場合は、Kubernetes YAML に `service` ラベルを追加します。|

### Feature Flags {#feature-flags}

| 変更の種類 | 変更元 | 有効にする方法 |
| --- | --- | --- |
| Datadog Feature Flags | Datadog Feature Flags | 自動的に追跡されます。|
| LaunchDarkly | LaunchDarkly インテグレーション | [LaunchDarkly インテグレーション][3]を設定します。|
| その他の Feature Flag プロバイダー | イベント API | [イベント API][4] を使用して、フラグの変更をカスタムイベントとして送信します。|
| フロントエンドの Feature Flag 評価 | RUM | [RUM Feature Flag Tracking][5] を設定します。|

設定および高度なオプションについては、「[Feature Flag の変更を追跡する][6]」を参照してください。

### インフラストラクチャーの変更 {#infrastructure-changes}

| 変更の種類 | 変更元 | 有効にする方法 |
| --- | --- | --- |
| クラウドのリソースおよび構成の変更 (AWS) {{< tooltip text="in Preview" tooltip="この機能はプレビュー版です。利用できるのは、クラウドリソースの変更のうち、ごく一部に限られます。アクセスをリクエストするには、リソース収集のドキュメントを参照してください。" >}} | Infrastructure Monitoring | [リソース収集][12]を有効にし、必要に応じて、クラウドプロバイダーのイベント転送も有効にします。|
| Kubernetes デプロイのスケールイベント | Kubernetes インテグレーション | [Kubernetes 監査ログ][13]を有効にします。|
| CrashLoopBackOff Pod のクラッシュ | Kubernetes インテグレーション | 可能な場合は、Kubernetes YAML に `service` ラベルを追加します。|

### データベースの変更 {#database-changes}

| 変更の種類 | 変更元 | 有効にする方法 |
| --- | --- | --- |
| PostgreSQL、SQL Server、および MySQL のスキーマ変更 | Database Monitoring | 「[データベーススキーマの調査][7]」および「[Database Monitoring とトレースの相関付け][8]」を参照してください。|
| MongoDB のインデックスおよび検索インデックスの変更、PostgreSQL および SQL Server の設定の変更 | Database Monitoring | [Database Monitoring とトレースの相関付け][8]を行います。|

設定および高度なオプションについては、「[Database Monitoring][14]」を参照してください。

### ストリーミングおよびアプリケーションの動作 {#streaming-and-application-behavior}

| 変更の種類 | 変更元 | 有効にする方法 |
| --- | --- | --- |
| Kafka スキーマの更新 | Data Streams Monitoring | [Data Streams Monitoring][9] を設定します。|
| トラフィックの急増 | APM | [APM][15] で自動的に追跡されます。|
| Watchdog アラート | Watchdog | 自動的に追跡されます。アラートごとの要件については、「[Watchdog][10]」を参照してください。|

### カスタム変更 {#custom-changes}

| 変更の種類 | 変更元 | 有効にする方法 |
| --- | --- | --- |
| その他の追跡が必要な変更 | イベント API | [イベント API][4] を使用して変更イベントを送信します。|

[2]: /ja/real_user_monitoring/guide/setup-rum-deployment-tracking/
[3]: /ja/integrations/launchdarkly/#setup
[4]: /ja/api/latest/events/
[5]: /ja/real_user_monitoring/feature_flag_tracking/
[6]: /ja/change_tracking/change_types/feature_flags/
[7]: /ja/database_monitoring/schema_explorer/
[8]: /ja/database_monitoring/connect_dbm_and_apm/
[9]: /ja/data_streams/
[10]: /ja/watchdog/
[11]: /ja/getting_started/tagging/unified_service_tagging/
[12]: /ja/infrastructure/resource_catalog/resource_changes/
[13]: /ja/integrations/kubernetes_audit_logs/
[14]: /ja/database_monitoring/
[15]: /ja/tracing/