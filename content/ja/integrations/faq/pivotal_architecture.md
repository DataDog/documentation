---
description: VMware Tanzu Application Service と Datadog のインテグレーションの概要
further_reading:
- link: https://www.datadoghq.com/blog/pivotal-cloud-foundry-architecture/
  tag: GitHub
  text: VMware Tanzu Application Service のアーキテクチャ
- link: https://docs.datadoghq.com/integrations/pivotal_pks/
  tag: ドキュメント
  text: Pivotal Container Service

title: Datadog VMware Tanzu Application Service インテグレーションアーキテクチャ
---

## 概要

このページでは、Datadog VMware Tanzu Application Service のインテグレーションの背後にあるアーキテクチャについて説明します。

{{< img src="integrations/pivotal/pivotal_datadog_diagram.png" alt="Datadog とVMware Tanzu Application Service のインテグレーションのコンポーネントと、両者間のデータの流れの概要を説明します。" >}}

以下のセクションでは、個々のコンポーネントとその相互関係について、さらに詳しく説明します。

## Pivotal Cloud Foundry/PAS 向け Datadog コンポーネント

Datadog と VMware Tanzu Application Service のインテグレーションコンポーネントは、Tanzu Ops Manager から Application Monitoring と Cluster Monitoring のタイルでデプロイ、構成することが可能です。
- **Datadog Cluster Monitoring Tile** - プラットフォームエンジニアは、PCF プラットフォームコンポーネントからのメトリクスとログを収集、視覚化、およびアラートするためにこれを使用します。このタイルから、ユーザーは、Datadog Node Agent、Datadog Cluster Agent (DCA)、およびFirehose Nozzle をデプロイすることができます。
- **Datadog Application Monitoring Tile** - アプリケーション開発者は、これを使用して、アプリケーションからカスタムメトリクス、トレース、およびログを収集します。このタイルから、ユーザーは Container Agent、Trace Agent、DogStatsD を含む Datadog Buildpack をデプロイすることができます。

## Datadog Cluster Monitoring タイルコンポーネント

### Node Agent

Node Agent は、すべての BOSH VM 上に存在し、ホスト (VM)、コンテナ、プロセスを Datadog にレポートします。Node Agent は、Tanzu Ops Manager の **Cluster Monitoring** タイルからデプロイおよび構成されます。また、Node Agent を使用して、サポートされているインテグレーションからログを取得することができます。

#### 収集されるタグ

   - 基礎となる BOSH VM に関連するメタデータ (例えば、`bosh_job`、`bosh_name`)
   - Datadog Cluster Agent (DCA) からの対応するコンテナとアプリケーションのタグ
   - 構成時にタイルから追加されるカスタムタグ

収集されたすべてのメタデータは、ホスト VM とコンテナタグとして表示されます。Node Agent が監視しているホスト VM は [Infrastructure List][1] ページに表示され、ホスト内の下位コンテナは [Container Map][2] および [Live Containers][3] ページに表示されます。

### Datadog Cluster Agent (DCA)

[DCA][4] は、クラスターレベルのモニタリングデータを収集するための合理的で集中的なアプローチを提供します。Kubernetes 環境では、DCA と同様の動作をします。DCA は、すべての特異な Node Agent に代わって CAPI にクエリを発行するため、Cloud Controller API (CAPI) の負荷を軽減します。また、クラスターレベルのメタデータを Node Agent に中継し、ローカルに収集されたメトリクスをリッチ化することができます。Node Agent は定期的に DCA 上の内部 API エンドポイントをポーリングしてクラスターメタデータを取得し、VM 内の対応するコンテナに割り当てます。

#### 収集されるメタデータ

   - クラスターレベルのメタデータ (例えば、`org_id`、`org_name`、`space_id`、`space_name`)
   - オートディスカバリーのタグフォーマット `tags.datadoghq.com/k=v` に従って、アプリケーションのメタデータから公開されるラベルとアノテーション
   - 各ホスト VM 上で動作しているアプリの一覧

オートディスカバリーのタグは、アプリケーションのメタデータとして CAPI レベルで追加されます。CAPI を通じてカスタムタグを追加することができ、DCA はこれらのタグを定期的にピックアップします。また、クラスターモニタタイル内の構成オプションを使用して、DCA が Firehose Nozzle のキャッシュとして動作するように設定することもできます。これにより、ノズルは CAPI ではなく DCA からデータをクエリし、CAPI の負荷をさらに軽減することができます。DCA によって収集されたメタデータは、Containers ページで見ることができ、PCF コンテナには `cloudfoundry`、`app_name`、`app_id`、`bosh_deployment` のタグが割り当てられています。

### Firehose Nozzle

Datadog Firehose Nozzle は、デプロイの Loggregator (デプロイのメトリクスとアプリケーションログを集計するための PCF のシステム) から情報を消費します。ノズルは、Firehose から内部ノズルメトリクス、アプリケーションメトリクス、組織メトリクス、ログを収集し、対応するタグと CAPI から収集したアプリケーションメタデータを追加します。Datadog Firehose Nozzle の Cluster Monitoring Tile から、許可リストと拒否リストのメカニズムでメタデータフィルターを構成することができます。ノズルから収集したメトリクスに追加するメタデータを指定し、[メトリクスサマリー][5]や[メトリクスエクスプローラー][6]でメトリクスとそれに対応するタグを表示します。

#### 収集されるメタデータ

   - オートディスカバリータグのフォーマット `tags.datadoghq.com/k=v` に従って、アプリケーションメタデータから公開されるタグ。これらは、ユーザーが CAPI からアプリケーションのメタデータに追加することができるタグです。

## Datadog Application Monitoring タイルコンポーネント

### Buildpack

Datadog Buildpack は、軽量な Datadog Container Agent と Datadog Trace Agent for APM を、アプリケーションと一緒にコンテナ内にインストールします。Agent は `DD_LOGS_ENABLED=TRUE` の設定でログ収集が有効になっている場合のみ起動し、アプリケーションレベルのログを Datadog に送信するために使用されます。それ以外の場合は、DogStatsD が起動し、メトリクスを送信します。アプリケーションが Datadog buildpack で動作している場合、アプリケーションの環境変数を使用して複数の構成オプションを渡すことができます。この変数は、アプリケーションマニフェスト (`manifest.yml`) または Cloud Foundry (CF) CLI で `cf set-env` コマンドを使用して取得することができます。

#### 収集されるメタデータ

   - `VCAP_APPLICATION` 環境変数から抽出したタグ (例えば、`application_id`、`name`、`instance_index`、`space_name`、`uris`) と、`CF_INSTANCE_IP` 環境変数から抽出したタグ (例えば、`cf_instance_ip`)
   - 環境変数 `DD_TAGS` を使って追加されたタグ

これらのタグは、Datadog Agent によって収集されたメトリクス、トレース、ログに存在します。収集したデータに応じて、[メトリクスエクスプローラー][5]や[メトリクスサマリー][6]、[トレースエクスプローラー][8]、[ログエクスプラー][9]で表示します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/infrastructure/list/
[2]: /ja/infrastructure/containermap/
[3]: /ja/infrastructure/livecontainers/
[4]: /ja/containers/cluster_agent/
[5]: /ja/metrics/summary/
[6]: /ja/metrics/explorer/
[7]: /ja/containers/docker/
[8]: /ja/tracing/trace_explorer/
[9]: /ja/logs/explorer/
