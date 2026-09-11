---
aliases:
- /ja/guides/basic_agent_usage/kubernetes
- /ja/agent/basic_agent_usage/kubernetes
- /ja/tracing/kubernetes/
- /ja/tracing/setup/kubernetes
- /ja/integrations/faq/using-rbac-permission-with-your-kubernetes-integration
- /ja/integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
- /ja/integrations/faq/docker-ecs-kubernetes-events/
- /ja/integrations/faq/container-integration-event/
- /ja/integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250/
- /ja/agent/kubernetes/
description: Kubernetes 上に Datadog Agent をインストールして構成します。
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-k8s
  tag: ラーニングセンター
  text: Kubernetes Observability の開始
- link: https://app.datadoghq.com/release-notes?category=Container%20Monitoring
  tag: リリースノート
  text: Datadog Containers の最新リリースをチェック (アプリログインが必要です)。
- link: /agent/guide/autodiscovery-management
  tag: ドキュメント
  text: データ収集をコンテナのサブセットのみに制限
- link: /agent/guide/docker-deprecation
  tag: ドキュメント
  text: Kubernetes における Docker ランタイムの非推奨化
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Kubernetes のモニタリングに関する知見を得るためのインタラクティブなセッションに参加できます
- link: https://www.datadoghq.com/blog/watermark-pod-autoscaler/
  tag: ブログ
  text: Watermark Pod Autoscaler を使用した Kubernetes Pod のスケールアウトガイド
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: ブログ
  text: Kubernetes オペレーターをモニターしてアプリケーションがスムーズに動作するようにする
title: Kubernetes
---
{{< learning-center-callout header="エンゲージメントウェビナーセッションに参加する" hide_image="true" btn_title="サインアップ" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Kubernetes">}}
  この基盤イネーブルメントセッションでは、Datadog が Kubernetes を監視する方法に焦点を当てます。Kubernetes 用に Datadog を構成する方法と、開始方法を学びます。クラスターやアプリケーションのメトリクス、トレース、ログを可視化し分析するために、Datadog が提供するさまざまなビューとツールを探索します。
{{< /learning-center-callout >}}

## Agent のインストール {#agent-installation}

[Datadog Operator][4] または Helm チャートを使用して、[Fleet Automation のアプリ内インストールガイド][5]に従うことで Agent をインストールできます。このガイド付きインターフェースでは、次のことができます。
- Kubernetes ディストリビューションを選択します (例: EKS、AKS、GKE)
- API キーが事前に入力された Helm および kubectl コマンドを生成します
- UI ベースの構成を通じて、APM、Log Management、タグ付け、その他のテレメトリ機能を有効にします。


{{< img src="agent/basic_agent_usage/agent_install_k8.png" alt="Kubernetes に Datadog Agent をインストールするためのアプリ内手順。" style="width:90%;">}}


Datadog Operator フローは Datadog Operator をインストールし、カスタムリソースを使用して監視可能性の範囲を構成します。

Helm チャートフローは Datadog コンポーネントをより直接的にインストールし、監視可能性機能に対する類似のトグルを提供します。

どちらのオプションでも構成を管理できます。Datadog Operator または Helm チャートは、Kubernetes ベースの監視のために Datadog Agent DaemonSet、Cluster Agent Deployment、およびそれらの依存関係すべてを作成します。

Datadog Agent によってサポートされている Kubernetes バージョンの完全なリストについては、[サポートされているバージョン][6]を参照してください。


### 手動インストール {#manual-installation}

[Fleet Automation のアプリ内インストールツール][5]は、構成を作成するためのガイド付き手順を提供します。[Kubernetes インストールドキュメント][7]を参照して、Datadog Operator または Datadog Helm チャートを手動でデプロイおよび構成する手順を確認できます。

Datadog は、すべての Kubernetes リソースをデプロイするために Datadog Operator または Datadog Helm Chart を使用することを推奨しています。すべてのマニフェストを直接デプロイする必要がある場合は、完全な [Kubernetes 手動インストールドキュメント][8]を参照してください。

Agent のコマンドについては、[Agent コマンドガイド][9]を参照してください。Datadog Cluster Agent とその役割に関する情報は、[Kubernetes 用 Cluster Agent][3] を参照してください。

{{< whatsnext desc="このセクションには下記のトピックが含まれています。">}}
  {{< nextlink href="/agent/kubernetes/installation">}}<u>インストール</u>: Kubernetes 環境に Datadog Agent をインストールします。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>その他の構成</u>: イベントの収集、プロキシ設定の上書き、DogStatsD を使った Custom Metrics の送信、コンテナの許可リストおよびブロックリストの構成、利用可能なすべての環境変数一覧の参照が可能です。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/distributions">}}<u>ディストリビューション</u>: AWS Elastic Kubernetes Service (EKS)、Azure Kubernetes Service (AKS)、Google Kubernetes Engine (GKE)、Red Hat OpenShift、Rancher、Oracle Container Engine for Kubernetes (OKE) などの主要な Kubernetes ディストリビューションの基本構成を確認します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/apm">}}<u>APM</u>: トレース収集を設定します。Agent がトレースを受信するように構成し、Pod が Agent と通信できるように構成し、アプリケーション SDK がトレースを送信するように構成します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/appsec">}}<u>アプリと API の保護</u>: Kubernetes の ingress プロキシおよびゲートウェイに対しアプリと API の保護を自動的に有効にし、脅威を検出してエッジで API を保護します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/csi">}}<u>CSI ドライバー</u>: Datadog CSI ドライバーをインストールして構成し、Datadog CSI ボリュームを使用して DogStatsD および Trace Agent UDS ソケットをマウントします。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>ログ収集</u>: Kubernetes 環境でのログの収集をセットアップします。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/tag">}}<u>タグ抽出</u>: Kubernetes ラベルまたはアノテーションに基づいて、コンテナ、Pod、またはノードによって送信されるすべてのメトリクス、トレース、およびログにタグを作成して割り当てるように Agent を構成します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/integrations">}}<u>Integrations および Autodiscovery</u>: Kubernetes 環境でインテグレーションを構成するには、Datadog の Autodiscovery 機能を使用します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus および OpenMetrics</u>: Kubernetes 内で実行されているアプリケーションから、公開されている Prometheus および OpenMetrics メトリクスを収集します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>コントロールプレーンのモニター</u>: Kubernetes の API サーバー、コントローラーマネージャー、スケジューラー、etcd をモニターします。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/data_collected">}}<u>収集データ</u>: Kubernetes クラスターにデプロイされた Agent によって収集されるメトリクスのリストを確認します。{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/faq/kubernetes-legacy/
[2]: /ja/agent/configuration/agent-commands/
[3]: /ja/containers/cluster_agent/
[4]: https://docs.datadoghq.com/ja/containers/datadog_operator/
[5]: https://app.datadoghq.com/fleet/install-agent/latest?platform=kubernetes
[6]: /ja/containers/kubernetes/installation?tab=datadogoperator#minimum-kubernetes-and-datadog-agent-versions
[7]: /ja/containers/kubernetes/installation
[8]: https://docs.datadoghq.com/ja/containers/guide/kubernetes_daemonset/
[9]: /ja/agent/configuration/agent-commands/