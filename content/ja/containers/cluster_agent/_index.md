---
aliases:
- /ja/agent/kubernetes/host_setup
- /ja/agent/cluster_agent/
- /ja/containers/cluster_agent/
- /ja/containers/cluster_agent/event_collection
- /ja/containers/cluster_agent/metadata_provider
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: ブログ
  text: Datadog Cluster Agent のご紹介
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: ブログ
  text: Datadog メトリクスを使用して Kubernetes のワークロードをオートスケーリングする
kind: documentation
title: Kubernetes 対応の Cluster Agent
---

## 概要

Datadog Cluster Agent は、合理的かつ一元的にクラスターレベルの監視データを収集します。Cluster Agent は、API サーバーとノードベースの Agent の間のプロキシとして機能し、サーバーの負荷を軽減します。また、クラスターレベルのメタデータをノードベースの Agent にリレーすることで、Agent はローカルで収集したメトリクスのメタデータを充実させることができます。

Datadog Cluster Agent を使用すると、次のことができます。

* Agent がインフラストラクチャーに与える影響を軽減できます。
* ノードベースの Agent がそれぞれのノードに隔離されるため、RBAC 規則の機能は、メトリクスとメタデータを kubelet から読み取るだけに縮小されます。
* Node Agent がローカルで収集したメトリクスを充実させられるよう、API サーバー内にのみ存在するクラスターレベルのメタデータを Node Agent に提供します。
* サービス、SPOF、イベントの監視など、クラスターレベルのデータの収集を有効化します。
* カスタム Kubernetes メトリクスと外部メトリクスで HPA (Horizontal Pod Autoscaling) を使用します。詳しくは、[カスタムおよび外部メトリクスでのオートスケーリングガイド][1]を参照してください。

Docker をお使いの場合、Datadog Cluster Agent は Docker Hub と GCR で利用できます。

| Docker Hub                                       | GCR                                                       |
|--------------------------------------------------|-----------------------------------------------------------|
| [hub.docker.com/r/datadog/cluster-agent][2]      | [gcr.io/datadoghq/cluster-agent][3]                       |

**注**: Datadog Cluster Agent のすべての機能を利用するには、Kubernetes v1.10+ を使用してください。

{{< whatsnext desc="このセクションには、以下のトピックが記載されています。">}}
    {{< nextlink href="/agent/cluster_agent/setup" >}}<u>セットアップ</u>: Kubernetes クラスターで Datadog Cluster Agent をセットアップします。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/commands" >}}<u>コマンドとオプション</u>: Cluster Agent で利用可能なコマンドとオプションの一覧。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/clusterchecks" >}}<u>クラスターチェック</u>: クラスターチェックにより、オートディスカバリーの実施や、Kubernetes など負荷分散型クラスターサービスでのチェックの実施が可能になります。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/endpointschecks" >}}<u>エンドポイントチェック</u>: エンドポイントがクラスターチェックを拡張してクラスターサービス背後のあらゆるエンドポイントを監視します。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/admission_controller" >}}<u>Admission Controller</u>: アプリケーションポッドの構成を簡略化するために Admission Controller を構成します。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/troubleshooting" >}}<u>Cluster Agent のトラブルシューティング</u>: Datadog Cluster Agent のトラブルシューティング情報を検索できます。{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/containers/guide/cluster_agent_autoscaling_metrics
[2]: https://hub.docker.com/r/datadog/cluster-agent
[3]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/cluster-agent