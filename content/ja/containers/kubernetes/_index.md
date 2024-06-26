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
further_reading:
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
kind: documentation
title: Kubernetes
---

## 概要

Kubernetes クラスターで Datadog Agent を実行し、クラスターとアプリケーションのメトリクス、トレース、ログの収集を開始します。

**注**: Agent v6.0+ は Kubernetes v1.7.6+ のみをサポートしています。Kubernetes の以前のバージョンについては、[Kubernetes のレガシーバージョン][1]を参照してください。

Agent のコマンドについては、[Agent コマンドガイド][2]を参照してください。

クラスターレベルのモニタリングデータの収集について合理的なアプローチを提供する Datadog Cluster Agent に関する情報については、[Kubernetes 対応の Cluster Agent][3] を参照してください。

{{< whatsnext desc="このセクションには、以下のトピックが含まれます。">}}
  {{< nextlink href="/agent/kubernetes/installation">}}<u>インストール</u>: Kubernetes 環境に Datadog Agent をインストールします。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>追加の構成</u>: イベントの収集、プロキシ設定のオーバーライド、DogStatsD によるカスタムメトリクスの送信、コンテナの許可リストとブロックリストの構成、利用可能な環境変数の全リストの参照を行います。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/distributions">}}<u>ディストリビューション</u>: AWS Elastic Kubernetes Service (EKS)、Azure Kubernetes Service (AKS)、Google Kubernetes Engine (GKE) など、主要な Kubernetes ディストリビューションの基本構成を確認します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/apm">}}<u>APM</u>: トレース収集の設定: トレースを受け入れるように Agent を構成し、Agent と通信するようにポッドを構成し、トレースを発するようにアプリケーショントレーサーを構成します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>ログ収集</u>: Kubernetes 環境のログ収集を設定します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/tag">}}<u>タグ抽出</u>: コンテナ、ポッド、またはノードから出力されるすべてのメトリクス、トレース、およびログに対して、Kubernetes のラベルまたはアノテーションに基づいてタグを作成し、割り当てるように Agent を構成します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/integrations">}}<u>インテグレーションとオートディスカバリー</u>: Kubernetes 環境でインテグレーションを構成するには、Datadog のオートディスカバリー機能を使用します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus & OpenMetrics</u>: Kubernetes 内部で動作するアプリケーションから、公開されている Prometheus や OpenMetrics のメトリクスを収集します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>コントロールプレーンモニタリング</u>: Kubernetes API サーバー、コントローラーマネージャー、スケジューラー、etcd を監視します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/data_collected">}}<u>収集データ</u>: Kubernetes クラスターにデプロイした際に Agent が収集したメトリクスの一覧を確認します。{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/faq/kubernetes-legacy/
[2]: /ja/agent/guide/agent-commands/
[3]: /ja/containers/cluster_agent/