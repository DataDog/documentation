---
aliases:
- /ja/agent/kubernetes/host_setup
- /ja/agent/cluster_agent/
- /ja/containers/cluster_agent/event_collection
- /ja/containers/cluster_agent/metadata_provider
description: Datadog Cluster Agent によるクラスタ レベルのモニタリング データ収集を一元化するアプローチ
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: ブログ
  text: Datadog Cluster Agent のご紹介
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: ブログ
  text: Datadog メトリクスを使用して Kubernetes のワークロードをオートスケーリングする
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: ブログ
  text: Datadog の CSI driver でセキュアな Kubernetes 環境に高性能な可観測性を提供
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

Helm chart v2.7.0 または Datadog Operator v1.0.0+ を使用して Datadog Agent をインストールした場合、**Datadog Cluster Agent はデフォルトで有効化されます**。

Datadog はコンテナ イメージを次のレジストリに公開しています:

| Google Artifact Registry | Amazon ECR             | Azure ACR            | Docker Hub        |
| ------------------------ | ---------------------- | -------------------- | ----------------- |
| gcr.io/datadoghq         | public.ecr.aws/datadog | datadoghq.azurecr.io | docker.io/datadog |

既定では Cluster Agent イメージは Google Artifact Registry (`gcr.io/datadoghq`) から pull されます。お使いのデプロイメント リージョンから Artifact Registry にアクセスできない場合は、別のレジストリを使用してください。

<div class="alert alert-danger">Docker Hub ではイメージの pull レートに制限があります。Docker Hub の有料ユーザーでない場合 Datadog は Datadog Agent と Cluster Agent の設定を更新し、GCR または ECR からイメージを pull することを推奨します。手順は <a href="/agent/guide/changing_container_registry">コンテナ レジストリの変更</a> を参照してください。</div>

### Agent と Cluster Agent の最小バージョン

互換性を最適化するため Datadog は Cluster Agent と Datadog Agent のバージョンを揃えることを推奨します。Kubernetes のバージョンと Datadog のバージョンの対応表 (サポート マトリクス) の全体は [Kubernetes インストール ページ][2] を参照してください。

{{< whatsnext desc="このセクションには、以下のトピックが記載されています。">}}
    {{< nextlink href="/agent/cluster_agent/setup" >}}<u>セットアップ</u>: Kubernetes クラスターで Datadog Cluster Agent をセットアップします。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/commands" >}}<u>コマンドとオプション</u>: Cluster Agent で利用可能なコマンドとオプションの一覧。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/clusterchecks" >}}<u>クラスターチェック</u>: クラスターチェックにより、オートディスカバリーの実施や、Kubernetes サービスなど負荷分散型クラスターサービスでのチェックの実施が可能になります。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/endpointschecks" >}}<u>エンドポイントチェック</u>: エンドポイントチェックはクラスターチェックを拡張して、クラスターサービスの背後にあるあらゆるエンドポイントを監視します。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/admission_controller" >}}<u>Admission Controller</u>: アプリケーションポッドの構成を簡略化するために Admission Controller を構成します。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/troubleshooting" >}}<u>Cluster Agent のトラブルシューティング</u>: Datadog Cluster Agent のトラブルシューティング情報を検索できます。{{< /nextlink >}}
{{< /whatsnext >}}

## Cluster Agent の監視
Datadog Agent には Cluster Agent を自動的に監視するインテグレーションが含まれています。このインテグレーションは Cluster Agent と同じノード上にある通常の Datadog Agent pod 上で実行されます。Cluster Agent 自体では実行されません。詳細は [Datadog Cluster Agent インテグレーション ドキュメント][3] を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/containers/guide/cluster_agent_autoscaling_metrics
[2]: /ja/containers/kubernetes/installation#minimum-kubernetes-and-datadog-agent-versions
[3]: https://docs.datadoghq.com/ja/integrations/datadog_cluster_agent/