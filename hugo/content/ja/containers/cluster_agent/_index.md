---
aliases:
- /ja/agent/kubernetes/cluster/
- /ja/agent/cluster_agent/
- /ja/containers/cluster_agent/event_collection
- /ja/containers/cluster_agent/metadata_provider
description: Datadog Cluster Agent を使用したクラスター レベルの監視データ収集の一元化
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: ブログ
  text: Datadog Cluster Agent の概要
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: ブログ
  text: 任意の Datadog メトリクスによる Kubernetes ワークロードのオートスケール
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: ブログ
  text: Datadog の CSI ドライバーを使用したセキュアな Kubernetes 環境での高性能な監視可能性
- link: https://www.datadoghq.com/architecture/efficient-kubernetes-monitoring-with-the-datadog-cluster-agent/
  tag: アーキテクチャセンター
  text: Datadog Cluster Agent による効率的な Kubernetes 監視
- link: https://www.datadoghq.com/architecture/real-world-applications-of-the-datadog-cluster-agent-part-one/
  tag: アーキテクチャセンター
  text: Datadog Cluster Agent の実際の活用例 (第 1 部)
title: Kubernetes 用 Datadog Cluster Agent
---
## 概要 {#overview}

Datadog Cluster Agent は、クラスター レベルの監視データを効率的かつ一元的に収集できます。Cluster Agent は、API サーバーとノードベースの Agent の間のプロキシとして機能し、サーバーの負荷を軽減します。また、クラスター レベルのメタデータをノードベースの Agent に中継し、ローカルで収集したメトリクスのメタデータを拡充できます。

Datadog Cluster Agent を使用すると、次のことができます。

* インフラストラクチャーに対する Agent の影響を軽減。
* ノードベースの Agent を各ノードに分離し、RBAC ルールを kubelet からのメトリクスとメタデータの読み取りのみに制限。
* API サーバーでしか取得できないクラスター レベルのメタデータを Node Agent に提供し、ローカルで収集したメトリクスのメタデータを拡充。
* サービスや SPOF の監視、イベントなど、クラスター レベルのデータの収集を有効化。
* カスタム Kubernetes メトリクスおよび外部メトリクスを使用した Horizontal Pod Autoscaling (HPA) の利用。詳細については、[カスタムメトリクスおよび外部メトリクスでの自動スケーリングガイド][1] を参照してください。

Helm チャート v2.7.0 または Datadog Operator v1.0.0 以降を使用して Datadog Agent をインストールした場合、**Datadog Cluster Agent はデフォルトで有効になっています**。

Datadog は、Datadog Container Registry、Google Artifact Registry (GAR)、Amazon ECR、Azure ACR、および Docker Hub にコンテナイメージを公開しています。

{{% container-images-table %}}

デフォルトでは、Datadog Agent Helm チャートは、Datadog サイト、クラスタータイプ、および `registryMigrationMode` に基づいて Agent イメージレジストリを決定します。これらの値と環境の除外設定に応じて、Agent イメージは Datadog Container Registry (`registry.datadoghq.com`) またはサイト固有のレジストリからプルされる場合があります。Datadog Operator チャートは、デフォルトで Datadog Agent Helm チャートの依存関係として含まれています。Datadog Operator チャートバージョン 2.19.0 以降、その依存関係を通じて Operator をインストールすると、Datadog Agent Helm チャートの `registryMigrationMode` が、Operator によって管理される Agent イメージに適用されます。Operator Helm チャート自体は `registryMigrationMode` を定義しません。Operator Pod イメージは、Operator チャートの `image.repository` の値によって個別に制御されます。

<div class="alert alert-warning">Docker Hub には、イメージのプルレート制限が適用されます。Docker Hub の顧客でない場合、Datadog では、別のレジストリからプルするように Datadog Agent および Cluster Agent の設定を更新することを推奨しています。手順については、<a href="/agent/guide/changing_container_registry">コンテナレジストリの変更</a>を参照してください。</div>

### Agent および Cluster Agent の最小バージョン {#minimum-agent-and-cluster-agent-versions}

最適な互換性を確保するため、Datadog では Cluster Agent と Agent のバージョンを一致させることを推奨しています。Kubernetes バージョンと Datadog バージョンの完全なサポートマトリクスについては、[Kubernetes インストールページ][2] を参照してください。

{{< whatsnext desc="このセクションでは、次のトピックについて説明します。">}}
    {{< nextlink href="/agent/cluster_agent/setup" >}}<u>セットアップ</u>: Kubernetes クラスターで Datadog Cluster Agent をセットアップします。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/commands" >}}<u>コマンドとオプション</u>: Cluster Agent で使用可能なすべてのコマンドとオプションを一覧表示します。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/clusterchecks" >}}<u>クラスターチェック</u>: クラスターチェックでは、Kubernetes サービスなどの負荷分散されたクラスターサービスを自動検出し、チェックを実行できます。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/endpointschecks" >}}<u>エンドポイントチェック</u>: エンドポイントチェックを拡張し、クラスターサービスの背後にあるあらゆるエンドポイントを監視します。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/admission_controller" >}}<u>アドミッションコントローラー</u>: アプリケーション Pod の設定を簡素化するために、Admission Controller を設定します。{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/troubleshooting" >}}<u>Cluster Agent のトラブルシューティング</u>: Datadog Cluster Agent のトラブルシューティング情報を確認できます。{{< /nextlink >}}
{{< /whatsnext >}}

## Cluster Agent の監視 {#monitoring-the-cluster-agent}
Datadog Agent には、Cluster Agent を自動的に監視するインテグレーションが含まれています。このインテグレーションは、Cluster Agent と同じノード上にある通常の Datadog Agent Pod で実行されます。Cluster Agent 自体では実行されません。詳細については、[Datadog Cluster Agent インテグレーションのドキュメント][3] を参照してください。

## 詳細情報 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/containers/guide/cluster_agent_autoscaling_metrics
[2]: /ja/containers/kubernetes/installation#minimum-kubernetes-and-datadog-agent-versions
[3]: https://docs.datadoghq.com/ja/integrations/datadog_cluster_agent/