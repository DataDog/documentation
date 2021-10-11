---
title: Kubernetes 対応の Cluster Agent
kind: documentation
aliases:
  - /ja/agent/kubernetes/host_setup
further_reading:
  - link: https://www.datadoghq.com/blog/datadog-cluster-agent/
    tag: ブログ
    text: Datadog Cluster Agent のご紹介
  - link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
    tag: ブログ
    text: Datadog メトリクスを使用して Kubernetes のワークロードをオートスケーリングする
  - link: /agent/cluster_agent/clusterchecks/
    tag: ドキュメント
    text: Autodiscovery によるクラスターチェックの実行
  - link: /agent/kubernetes/daemonset_setup/
    tag: ドキュメント
    text: Kubernetes DaemonSet のセットアップ
  - link: /agent/kubernetes/integrations/
    tag: ドキュメント
    text: カスタムインテグレーション
  - link: https://github.com/DataDog/datadog-agent/blob/master/docs/cluster-agent/GETTING_STARTED.md#troubleshooting
    tag: Github
    text: Datadog Cluster Agent のトラブルシューティング
---
## 概要

Datadog Cluster Agent は、合理的かつ一元的にクラスターレベルの監視データを収集します。Cluster Agent は、API サーバーとノードベースの Agent の間のプロキシとして機能し、サーバーの負荷を軽減します。また、クラスターレベルのメタデータをノードベースの Agent にリレーすることで、Agent はローカルで収集したメトリクスのメタデータを充実させることができます。

Datadog Cluster Agent を使用すると、次のことができます。

* Agent がインフラストラクチャーに与える影響を軽減できます。
* ノードベースの Agent がそれぞれのノードに隔離されるため、RBAC 規則の機能は、メトリクスとメタデータを kubelet から読み取るだけに縮小されます。
* Node Agent がローカルで収集したメトリクスを充実させられるよう、API サーバー内にのみ存在するクラスターレベルのメタデータを Node Agent に提供します。
* サービス、SPOF、イベントの監視など、クラスターレベルのデータの収集を有効化します。
* カスタム Kubernetes メトリクスによる Horizontal Pod Autoscaling を利用できます。この機能の詳細については、[ガイド][1]を参照してください。

Docker をお使いの場合、Datadog Cluster Agent は Docker Hub と GCR で利用できます。

| Docker Hub                                       | GCR                                                       |
|--------------------------------------------------|-----------------------------------------------------------|
| [hub.docker.com/r/datadog/cluster-agent][2]      | [gcr.io/datadoghq/cluster-agent][3]                       |

**注**: Datadog Cluster Agent のすべての機能を利用するには、Kubernetes v1.10+ を使用してください。

{{< whatsnext desc="このセクションには、次のトピックが含まれています。">}}
    {{< nextlink href="/agent/cluster_agent/setup" >}}<u>セットアップ</u>: Datadog Cluster Agent を Kubernetes Cluster にセットアップします。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/event_collection" >}}<u>イベント収集</u>: Cluster Agent を使用して、Kubernetes Cluster からすべてのイベントを収集します。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/external_metrics" >}}<u>外部メトリクス</u>: Cluster Agent のカスタムメトリクスサーバーを利用して、すべての Datadog メトリクスを利用してアプリケーションを自動拡張します。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/clusterchecks" >}}<u>クラスターチェック</u>: クラスターチェック機能は、Kubernetes のような負荷分散されたクラスターサービスを自動検出し、チェックを行う機能です。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/endpointschecks" >}}<u>エンドポイントチェック</u>: エンドポイントチェックはクラスターチェックを拡張し、クラスターサービスの背後にある任意のエンドポイントを監視します。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/admission_controller" >}}<u>Admission Controller</u>: Admission Controller でアプリケーションポッドのコンフィギュレーションを簡略化します。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/commands" >}}<u>コマンド & オプション</u>: Cluster Agent で利用可能なすべてのコマンドおよびオプションのリストです。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/metadata_provider" >}}<u>メタデータプロバイダー</u>: クラスターのメタデータプロバイダー機能を有効にします。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/build" >}}<u>ビルド</u>: Datadog Cluster Agent をビルドします。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/clusterchecksrunner" >}}<u>クラスターチェックランナー</u>: クラスターチェックの実行に特化したツールであるクラスターチェックランナーを設定します。{{< /nextlink >}}
    {{< nextlink href="/agent/troubleshooting/autodiscovery" >}}<u>オートディスカバリーのトラブルシューティング</u>: オートディスカバリーに関する一般的な問題を解決します。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/troubleshooting" >}}<u>Cluster Agent のトラブルシューティング</u>: Datadog Cluster Agent のトラブルシューティング情報をご覧いただけます。{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/blob/master/docs/cluster-agent/CUSTOM_METRICS_SERVER.md
[2]: https://hub.docker.com/r/datadog/cluster-agent
[3]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/cluster-agent