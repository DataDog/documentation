---
title: Kubernetes
kind: documentation
aliases:
  - /ja/guides/basic_agent_usage/kubernetes
  - /ja/agent/basic_agent_usage/kubernetes
  - /ja/tracing/kubernetes/
  - /ja/tracing/setup/kubernetes
further_reading:
  - link: agent/kubernetes/daemonset_setup
    tag: documentation
    text: Kubernetes DaemonSet のセットアップ
  - link: agent/kubernetes/host_setup
    tag: documentation
    text: Kubernetes Host のセットアップ
  - link: agent/kubernetes/metrics
    tag: documentation
    text: Kubernetes メトリクス
  - link: agent/kubernetes/legacy
    tag: documentation
    text: レガシー Kubernetes バージョン
---
**注**: Agent バージョン 6.0 以降は、1.7.6 より上のバージョンの Kubernetes のみをサポートします。以前のバージョンの Kubernetes については、[「レガシー Kubernetes バージョン」][1]を参照してください。

Datadog を使用して Kubernetes システムを監視するために、数多くのさまざまな方法が用意されています。どれを選ぶかは、システムの構成や使用する監視のタイプによって異なります。Datadog Agent を Kubernetes 用にインストールするには、DaemonSets、Helm チャート、Agent をホストに直接インストールする、Datadog クラスター Agent の 4 つのオプションがあります。

## インストール

Kubernetes クラスターからメトリクス、トレース、ログを収集するには、以下の 4 つの方法があります。

* [コンテナをインストールする][2] (**推奨**) - Agent が Pod の内部で動作します。ほとんどのケースにはこの方法で十分ですが、Kubernetes クラスターの起動時には監視が行われないため注意が必要です。
* [Helm をインストールする][3] - [Helm][4] は Kubernetes のパッケージマネージャーであり、Datadog Agent を簡単にインストールしたり、Datadog Agent のさまざまな機能を有効にしたりできます。
* [ホストをインストールする][5] - kubelet の実行時にエラーが起こり、Agent であるコンテナが動作を停止すると、ノードの状態を可視化できなくなります。Agent を*ノード上*で稼働させれば、kubelet のライフサイクル全体を通して監視が可能になりますす。この問題が強く懸念される場合は、Agent をホストとしてインストールしてください。
* [クラスター Agent][6] - システム内で Kubernetes クラスターの規模が非常に大きい場合は、Datadog クラスター Agent を使用してサーバーの負荷を軽減することができます。

**注**: 各ノードで Datadog Agent が 1 つだけ動作するように構成してください。各ポッドにサイドカーを使用することは一般に推奨されておらず、予期しない動作を起こすおそれがあります。

## Agent へのアクセス許可

Kubernetes インテグレーションを使用し、Kubernetes クラスターに Agent をデプロイする場合は、Agent をシームレスに統合するための権限が必要です。

Agent が次のアクションを実行できるようにする必要があります。

- `datadogtoken` という名前の `Configmaps` を `get` および `update` する。これは、ETCD に保存されている最新のイベントに対応する最新バージョンのトークンを更新およびクエリします。
- `Events` を `list` および `watch` する。これは、API サーバーからイベントを取得して、書式設定および送信します。
- `Endpoint` を `get`、`update`、および `create` する。Agent が[リーダー選出][7]機能に対して使用するエンドポイントの名前は `datadog-leader-election` です。
- `componentstatuses` リソースを `list` する。これは、Control Plane のコンポーネントのステータスに対するサービスチェックを送信します。

[datadog-agent GitHub レポジトリ][8]の `manifests/rbac` からテンプレートを探して使用することができます。このテンプレートは、サービスアカウントをデフォルトのネームスペースに作成し、クラスターロールを上記の権限で作成して、クラスターロールのバインディングを作成します。

## カスタムインテグレーション

Kubernetes での ConfigMaps の使用について詳しくは、[Datadog の Kubernetes カスタムインテグレーションのドキュメント][9]を参照してください。

## トラブルシューティング

* [Kubernetes マスターノードに Agent をインストールできますか][10]
* [ポート 10250 への Kubernetes チェックが ConnectTimeout エラーで失敗するのはなぜですか][11]
* [apiserver と kubelet に対するクライアント認証][12]
* [Kubernetes インテグレーションを使用した RBAC アクセス許可][13]

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/kubernetes/legacy
[2]: /ja/agent/kubernetes/daemonset_setup
[3]: /ja/agent/kubernetes/helm
[4]: https://helm.sh
[5]: /ja/agent/kubernetes/host_setup
[6]: /ja/agent/kubernetes/cluster
[7]: /ja/agent/kubernetes/event_collection#leader-election
[8]: https://github.com/DataDog/datadog-agent/tree/0bef169d4e80e838ec6b303f5ad1da716b424b0f/Dockerfiles/manifests/rbac
[9]: /ja/agent/kubernetes/integrations
[10]: /ja/integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[11]: /ja/integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[12]: /ja/integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[13]: /ja/agent/kubernetes/daemonset_setup/#configure-agent-permissions