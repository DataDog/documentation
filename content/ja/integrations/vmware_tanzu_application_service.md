---
aliases:
- /ja/integrations/cloud_foundry/
- /ja/integrations/pivotal_platform/
categories:
- プロビジョニング
- 構成 & デプロイ
- ログの収集
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/vmware_tanzu_application_service.md
description: VMware Tanzu Application Service (旧 Pivotal Cloud Foundry) VM とその実行ジョブの健全性を追跡します。
doc_link: /integrations/vmware_tanzu_application_service/
further_reading:
- link: https://www.datadoghq.com/blog/pcf-monitoring-with-datadog/
  tag: GitHub
  text: Datadog による Pivotal プラットフォームの監視
integration_id: pivotal-platform
integration_title: VMware Tanzu Application Service
is_public: true
kind: integration
name: vmware_tanzu_application_service
newhlevel: true
public_title: Datadog-VMware Tanzu Application Service (Pivotal Cloud Foundry) インテグレーション
short_description: VMware Tanzu Application Service VM とその実行ジョブの健全性を追跡します。
updated_for_agent: 6.0
---

## 概要

VMware Tanzu Application Service (旧称: Pivotal Cloud Foundry、詳細は [VMware 発表][3]を参照) のデプロイは、Datadog にメトリクスとイベントを送信することができます。デプロイメント内のすべてのノードの健全性と可用性を追跡し、それらが実行するジョブを監視し、Loggregator Firehose からメトリクスを収集するなど、さまざまなことが可能です。

VMware Tanzu Application Service および VMware Tanzu Application Service クラスター上のアプリケーションについて、Tanzu Ops Manager を介した監視を自動的にセットアップするには、このページを使用してください。手動でのセットアップ手順については、[VMware Tanzu Application Service 手動セットアップガイド][6]を参照してください。

VMware Tanzu Application Service と Datadog のインテグレーションには、3 つの主要なコンポーネントがあります。まず、ビルドパックは、アプリケーションからカスタムメトリクスを収集するために使用されます。第二に、BOSH リリースは、プラットフォームからメトリクスを収集します。3 つ目は、Loggregator Firehose Nozzle が、インフラストラクチャーから他のすべてのメトリクスを収集します。詳細については、[Datadog VMware Tanzu Application Service アーキテクチャ][32]ガイドをお読みください。

## アプリケーションを監視する

[VMware Tanzu のインストールと構成][7]ガイドを使用して、Tanzu Ops Manager を使用してインテグレーションをインストールします。手動セットアップの手順については、手動セットアップガイドの[アプリケーションの監視][11]セクションをお読みください。

### コンフィギュレーション

#### メトリクスの収集

環境内に API キーを設定してビルドパックを有効にします。

```shell
# 環境変数を設定します
cf set-env <アプリ> DD_API_KEY <DATADOG_API_キー>
# アプリケーションが新しい環境変数を適用してビルドパックを使用するように、アプリケーションを再ステージングします
cf restage <アプリ>
```

#### トレースとプロファイルの収集

Datadog Trace Agent (APM) はデフォルトで有効になっています。特定の言語でのセットアップの詳細については、[APM のセットアップ][12]と[プロファイリングのセットアップ][30]を参照してください。

#### ログの収集

{{< site-region region="us3" >}}

ログ収集は、このサイトではサポートされていません。

{{< /site-region >}}

{{< site-region region="us,us5,eu,gov" >}}

##### ログ収集の有効化

VMware Tanzu Application Service 上のアプリケーションからのログの収集を開始するには、ビルドパックに含まれている Agent をアクティブにし、ログ収集を有効にする必要があります。

```shell
cf set-env <YOUR_APP_NAME> RUN_AGENT true
cf set-env <YOUR_APP_NAME> DD_LOGS_ENABLED true
# Agent コアチェックを無効にしてシステムメトリクス収集を無効にします
cf set-env <YOUR_APP_NAME> DD_ENABLE_CHECKS false
# Container Stdout/Stderr をローカルポートにリダイレクトして、Agent がログを収集するようにします
cf set-env <YOUR_APP_NAME> STD_LOG_COLLECTION_PORT <PORT>
# 目的のポートからログを収集するように Agent を構成し、ソースとサービスの値を設定します
cf set-env <YOUR_APP_NAME> LOGS_CONFIG '[{"type":"tcp","port":"<PORT>","source":"<SOURCE>","service":"<SERVICE>"}]'
# アプリケーションが新しい環境変数を適用してビルドパックを使用するように、アプリケーションを再ステージングします
cf restage <YOUR_APP_NAME>
```

##### ログ収集の構成

次の表は、上記のパラメーターと、それらを使用してログ収集を構成する方法について説明しています。

| パラメーター                 | 説明                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `RUN_AGENT`               | Datadog Agent を起動するには、`true` に設定します。                                                                                                  |
| `DD_LOGS_ENABLED`         | Datadog Agent のログ収集を有効にするには、`true` に設定します。                                                                                      |
| `DD_ENABLE_CHECKS`        | コアチェックによる Agent のシステムメトリクスの収集を無効にするには、`false` に設定します。                                                       |
| `STD_LOG_COLLECTION_PORT` | `stdout` または `stderr` からログを収集する場合に使用する必要があります。対応するローカルポート値に `stdout` または `stderr` ストリームをリダイレクトします。 |
| `LOGS_CONFIG`             | このオプションを使用して、ローカル TCP ポートをリスニングするように Agent を構成し、`service` および `source` パラメーターの値を設定します。          |

**例:**

`app01` という名前の Java アプリケーションが VMware Tanzu Application Service で実行されています。以下の構成は、コンテナ `stdout`/`stderr` をローカルポート `10514` にリダイレクトします。次に、そのポートからログを収集するように Agent を構成し、`service` と `source` に適切な値を設定します。

```shell
# Stdout/Stderr をポート 10514 にリダイレクトします
cf set-env app01 STD_LOG_COLLECTION_PORT 10514
# ポート 10514 をリスニングするように Agent を構成します
cf set-env app01 LOGS_CONFIG '[{"type":"tcp","port":"10514","source":"java","service":"app01"}]'
```

##### プロキシの構成が誤っている場合の通知

Agent バージョン 6.12 以降では、ビルドパックで[プロキシ構成](/agent/logs/proxy/)を使用した場合、接続が確立できるかどうかの検証が行われます。このテストの結果に応じて、ログ収集が開始されます。

接続の確立に失敗し、ログ収集が開始されない場合、[イベントエクスプローラー][34]にこのようなイベントが表示されます。これらのイベントを追跡するモニターを設定し、誤構成された Buildpack がデプロイされたときに通知されるようにします。

{{< img src="integrations/cloud_foundry/logs_misconfigured_proxy.png" alt="Datadog で Log endpoint cannot be reached - Log collection not started というタイトルのイベントと、TCP 接続が確立できなかったというメッセージが表示される"  >}}

### タグ

カスタムタグをアプリケーションに追加するには、`manifest.yml` ファイルまたは CF CLI コマンドを使用して `DD_TAGS` 環境変数を設定します。

```shell
# 環境変数を設定します
cf set-env <YOUR_APP> DD_TAGS key1=value1,key2=value2
# アプリケーションが新しい環境変数を適用して新しいタグを使用するように、アプリケーションを再ステージングします
cf restage <YOUR_APP>
```

{{< /site-region >}}

### DogStatsD

[DogStatsD][33] を使用すると、カスタムアプリケーションメトリクスを Datadog に送信することができます。詳しくは[メトリクス送信: DogStatsD][5] を参照してください。様々なアプリケーションと互換性のある [DogStatsD ライブラリ][14]のリストがあります。

## VMware Tanzu Application Service クラスターの監視

[VMware Tanzu のインストールと構成][9]ガイドを使用して、Tanzu Ops Manager を使用してインテグレーションをインストールします。手動セットアップの手順については、手動セットアップガイドの[VMware Tanzu Application Service クラスターの監視][13]セクションをお読みください。

## 収集データ

### メトリクス

以下のメトリクスは、Datadog Firehose Nozzle から送信され、`cloudfoundry.nozzle` がプレフィックスとして付きます。Datadog Agent は、Director のランタイム構成で設定した任意の Agent チェックからメトリクスを送信し、デフォルトで[システム][24]、[ネットワーク][25]、[ディスク][26]、[NTP][27] のメトリクスを送信します。

Datadog Firehose Nozzle は、CounterEvent (イベントではなくメトリクスとして)、ValueMetrics、および ContainerMetrics のみを収集します。ログメッセージとエラーは無視されます。

メトリクスのリストは、PCF のバージョンおよびデプロイにより異なります。Datadog では、collects counter and gauge metrics emitted from the [Loggregator v2 API][28] から送信されるカウンターおよびゲージのメトリクスを収集します。デフォルトで送信されるメトリクスの一覧は、[Cloud Foundry コンポーネント メトリクス][29]を参照してください。

{{< get-metrics-from-git "cloud_foundry" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://network.pivotal.io/products/datadog
[2]: https://network.pivotal.io/products/datadog-application-monitoring
[3]: https://tanzu.vmware.com/pivotal#:~:text=Pivotal%20Cloud%20Foundry%20(PCF)%20is%20now%20VMware%20Tanzu%20Application%20Service.
[4]: https://docs.cloudfoundry.org/buildpacks/understand-buildpacks.html#supply-script
[5]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[6]: /ja/integrations/guide/pivotal-cloud-foundry-manual-setup
[7]: https://docs.pivotal.io/partners/datadog-application-monitoring/installing.html
[9]: https://docs.pivotal.io/partners/datadog/installing.html
[10]: /ja/agent/logs/proxy/
[11]: /ja/integrations/guide/pivotal-cloud-foundry-manual-setup#monitor-your-applications
[12]: /ja/tracing/setup/
[13]: /ja/integrations/guide/pivotal-cloud-foundry-manual-setup#monitor-your-pivotal-cloud-foundry-cluster
[14]: /ja/libraries/
[24]: /ja/integrations/system/#metrics
[25]: /ja/integrations/network/#metrics
[26]: /ja/integrations/disk/#metrics
[27]: /ja/integrations/ntp/#metrics
[28]: https://github.com/cloudfoundry/loggregator-api
[29]: https://docs.cloudfoundry.org/running/all_metrics.html
[30]: /ja/profiler/enabling/
[32]: /ja/integrations/faq/pivotal_architecture
[33]: /ja/developers/dogstatsd/
[34]: /ja/events/explorer/