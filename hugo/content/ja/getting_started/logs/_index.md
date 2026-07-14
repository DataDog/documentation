---
description: 複数のソースからログを収集し、処理・分析を行い、これらのログをトレースやメトリクスと関連付けます。
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-log-management
  tag: ラーニングセンター
  text: ログ管理の紹介
- link: https://learn.datadoghq.com/courses/going-deeper-with-logs-processing
  tag: ラーニングセンター
  text: ログ処理を極める
- link: https://learn.datadoghq.com/courses/log-indexes
  tag: ラーニングセンター
  text: インデックス化ログボリュームの管理と監視
- link: https://learn.datadoghq.com/courses/log-pipelines
  tag: ラーニングセンター
  text: ログパイプラインの構築と管理
- link: https://learn.datadoghq.com/courses/integration-pipelines
  tag: ラーニングセンター
  text: インテグレーションパイプラインですぐに使えるログの処理
- link: /logs/log_collection/
  tag: ドキュメント
  text: ログ収集とインテグレーション
- link: /getting_started/tagging/unified_service_tagging
  tag: ドキュメント
  text: 統合サービスタグ付けの構成方法を学ぶ
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: ログ管理を最適化するためのインタラクティブセッションにご参加ください
title: ログの使用を開始する
---

## 概要

Datadog のログ管理 (ログとも呼ばれます) を使用して、サーバー、コンテナ、クラウド環境、アプリケーション、既存のログプロセッサやフォワーダーなど、複数のロギングソースにまたがるログを収集します。従来のロギングでは、コスト効率を維持するために分析・保持するログを選択する必要がありました。Datadog Logging without Limits* では、ログの収集、処理、アーカイブ、探索、監視をログの制限なく行うことができます。

このページでは、Datadog でログ管理を始めるための方法を説明します。まだお持ちでない方は、[Datadog アカウント][1]を作成してください。

## ロギングソースを構成する

ログ管理では、ログエクスプローラーでデータを分析・探索したり、[トレーシング][2]や[メトリクス][3]を接続して Datadog 全体で有益なデータを関連付けたり、取り込んだログを Datadog [Cloud SIEM][4] で使用したりすることができます。Datadog 内でのログのライフサイクルは、ログソースからログを取り込むところから始まります。

{{< img src="/getting_started/logs/getting-started-overview.png" alt="様々なタイプのログコンフィギュレーション">}}

### サーバー

サーバーから Datadog にログを転送する際には、いくつかの[インテグレーション][5]を使用することができます。インテグレーションは、サーバーから Datadog にログを転送するために、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダの `conf.yaml` ファイル内のログコンフィギュレーションブロックを使用します。

```yaml
logs:
  - type: file
    path: /path/to/your/integration/access.log
    source: integration_name
    service: integration_name
    sourcecategory: http_web_access
```

サーバーからログの収集を開始するには

1. まだインストールしていない場合は、お使いのプラットフォームに応じた [Datadog Agent][6] をインストールしてください。

    **注意**: ログ収集には Datadog Agent v6 以降が必要です。

2. Datadog Agent では、ログの収集はデフォルトで**有効になっていません**。ログ収集を有効にするには、`datadog.yaml` ファイルで `logs_enabled` を `true` に設定してください。

    {{< agent-config type="log collection configuration" filename="datadog.yaml" collapsible="true">}}

3. [Datadog Agent を再起動][7]します。

4. Datadog サイトのインテグレーション[起動手順][8]またはカスタムファイルのログ収集手順に従ってください。

    **注**: カスタムファイルからログを収集していて、テールファイル、TCP/UDP、journald、Windows Events の例が必要な場合は、[カスタムログ収集][9]を参照してください。

### コンテナ

Datadog Agent v6 では、Agent がコンテナからログを収集することができるようになりました。それぞれのコンテナ化サービスには、Agent をどこにデプロイまたは実行するか、ログをどのようにルーティングするかなどに関する特定のコンフィギュレーション手順があります。

例えば、[Docker][10] では、Agent を Docker 環境の外部に設置するお客様のホスト上でのインストールと、コンテナ化された Agent を Docker 環境にデプロイするという 2 つの異なるタイプが用意されています。

[Kubernetes][11] では、Kubernetes クラスター内で Datadog Agent を動作させる必要があります。ログ収集の設定は DaemonSet spec、Helm チャート、または Datadog Operator を使用して行います。

コンテナサービスからのログ収集を開始するには、[アプリ内の手順][12]に従ってください。

### クラウド

AWS、Azure、Google Cloud など、複数のクラウドプロバイダーのログを Datadog に転送することができます。各クラウドプロバイダーにより、それぞれコンフィギュレーション手順が異なります。

例えば、AWS サービスのログは通常、S3 バケットや CloudWatch ロググループに保存されています。これらのログを購読し、Amazon Kinesis ストリームに転送して、1 つまたは複数の宛先に転送することができます。Datadog は、Amazon Kinesis 配信ストリームのデフォルトの転送先の1つです。

クラウドサービスからのログ収集を開始するには、[アプリ内の手順][13]に従ってください。

### クライアント

Datadog では、SDK やライブラリを使ってクライアントからログを収集することができます。たとえば、`datadog-logs` SDKを使用して、JavaScript クライアントから Datadog にログを送信します。

クライアントからのログ収集を開始するには、[アプリ内の手順][14]に従ってください。

### その他

rsyslog、FluentD、Logstash などの既存のログサービスやユーティリティを使用している場合は、Datadog のプラグインやログ転送オプションをご利用いただけます。

インテグレーションが表示されない場合は、*other integrations* ボックスに入力すると、そのインテグレーションが利用可能になったときに通知を受け取ることができます。

クラウドサービスからのログ収集を開始するには、[アプリ内の手順][15]に従ってください。

## ログの探索

ロギングソースを構成すると、ログを[ログエクスプローラー][16]で確認できます。ここでログをフィルタリング・集約・可視化することができます。

例えば、あるサービスから流れてくるログをさらに調査するには、`service` でフィルタリングします。さらに、`ERROR` などの `status` などでフィルタリングし、[Group into Patterns][17] を選択すると、サービスのどの部分で最も多くのエラーが記録されているかを確認することができます。

{{< img src="/getting_started/logs/error-pattern-2024.png" alt="Log Explorer でのエラーパターンによるフィルタリング">}}

ログを `Fields` に集計し、**トップリスト**として可視化すると、上位のログサービスを確認することができます。`info` や `warn` のようなソースを選択し、ドロップダウンメニューから **View Logs** を選択します。サイドパネルにはエラーに基づくログが表示されるため、注意が必要なホストやサービスをすぐに確認することができます。

{{< img src="/getting_started/logs/top-list-view-2024.png" alt="Log Explorer のトップリスト">}}

## 次のステップ

ログソースが設定され、ログがログエクスプローラーに表示されるようになったら、ログ管理の他のいくつかのエリアの探索をはじめることができます。

### ログコンフィギュレーション

* [属性とエイリアス][18]を設定して、ログ環境を統一します。
* [パイプライン][19]や[プロセッサー][20]を使って、ログの処理方法をコントロールすることができます。
* Logging without Limits* では、ログの取り込みとインデックス処理を分離しているため、[ログを構成][21]して、[インデックス化][22]するログ、[保持][23]するログ、[アーカイブ][24]するログを選択することができます。

### ログの相関付け

* [ログとトレースを接続][2]して、特定の `env`、`service,`、または `version` に関連する正確なログを表示します。
* Datadog ですでにメトリクスを使用している場合は、[ログとメトリクスを相関付ける][3]ことで、問題のコンテキストを取得することができます。

### ガイド

* [ログ管理のベストプラクティス][25]
* [Logging without Limits*][26] の詳細
* [RBAC 設定][27]による機密ログデータの管理

## 関連情報

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits は Datadog, Inc. の商標です。

[1]: https://www.datadoghq.com
[2]: /ja/tracing/other_telemetry/connect_logs_and_traces/
[3]: /ja/logs/guide/correlate-logs-with-metrics/
[4]: /ja/security/cloud_siem/
[5]: /ja/getting_started/integrations/
[6]: /ja/agent/
[7]: /ja/agent/configuration/agent-commands/#restart-the-agent
[8]: https://app.datadoghq.com/logs/onboarding/server
[9]: /ja/agent/logs/?tab=tailfiles#custom-log-collection
[10]: /ja/agent/docker/log/?tab=containerinstallation
[11]: /ja/agent/kubernetes/log/?tab=daemonset
[12]: https://app.datadoghq.com/logs/onboarding/container
[13]: https://app.datadoghq.com/logs/onboarding/cloud
[14]: https://app.datadoghq.com/logs/onboarding/client
[15]: https://app.datadoghq.com/logs/onboarding/other
[16]: /ja/logs/explorer/
[17]: /ja/logs/explorer/analytics/patterns/
[18]: /ja/logs/log_configuration/attributes_naming_convention/
[19]: /ja/logs/log_configuration/pipelines/
[20]: /ja/logs/log_configuration/processors/
[21]: /ja/logs/log_configuration/
[22]: https://docs.datadoghq.com/ja/logs/log_configuration/indexes
[23]: https://docs.datadoghq.com/ja/logs/log_configuration/flex_logs
[24]: https://docs.datadoghq.com/ja/logs/log_configuration/archives
[25]: /ja/logs/guide/best-practices-for-log-management/
[26]: /ja/logs/guide/getting-started-lwl/
[27]: /ja/logs/guide/logs-rbac/