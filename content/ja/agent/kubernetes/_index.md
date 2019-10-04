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

## インストール

Kubernetes クラスターからメトリクス、トレース、ログを収集するには、2 つのオプションがあります。

1. [コンテナインストール][2] (**推奨**) -  Agent はポッド内部で実行されます。この実装は、多くのケースで十分に機能しますが、Kubernetes 外部に存在するシステムのコンポーネントに対する可視性は提供されません。また、この方法では、Kubernetes クラスターの起動段階を監視できません。
2. [ホストインストール][3] (オプション) - Agent をホストにインストールすると、Kubernetes に関係なく、エコシステムに対する可視性が提供されます。

**注**: 各ノードで実行できる Datadog Agent は 1 つ限りです。ノードごとにサイドカーを構成することは一般的には推奨されません。予期せぬ動作をする可能性があります。

## RBAC

Kubernetes インテグレーションを使用し、Kubernetes クラスターに Agent をデプロイする場合は、Agent をシームレスに統合するための権限が必要です。

Agent が次のアクションを実行できるようにする必要があります。

- `datadogtoken` という名前の `Configmaps` を `get` および `update` する。これは、ETCD に保存されている最新のイベントに対応する最新バージョンのトークンを更新およびクエリします。
- `Events` を `list` および `watch` する。これは、API サーバーからイベントを取得して、書式設定および送信します。
- `Endpoint` に対して `get`、`update`、`create` する。[リーダー選出][4]機能のために Agent が使用するエンドポイントの名前は、`datadog-leader-election` です。
- `componentstatuses` リソースを `list` する。これは、Control Plane のコンポーネントのステータスに対するサービスチェックを送信します。

[datadog-agent GitHub リポジトリ][5]の `manifests/rbac` にテンプレートがあります。このテンプレートは、デフォルトのネームスペース内のサービスアカウント、上記の権限を持つクラスターロール、およびクラスターロール連結を作成します。

## カスタムインテグレーション

Kubernetes で ConfigMaps を使用する方法については、[Datadog の Kubernetes カスタムインテグレーションガイド][6]を参照してください。

## トラブルシューティング

* [Kubernetes マスターノードに Agent をインストールできますか][7]
* [ポート 10250 への Kubernetes チェックが ConnectTimeout エラーで失敗するのはなぜですか][8]
* [apiserver と kubelet に対するクライアント認証][9]
* [Kubernetes インテグレーションを使用した RBAC アクセス許可][10]

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/kubernetes/legacy
[2]: /ja/agent/kubernetes/daemonset_setup
[3]: /ja/agent/kubernetes/host_setup
[4]: /ja/agent/kubernetes/event_collection#leader-election
[5]: https://github.com/DataDog/datadog-agent/tree/0bef169d4e80e838ec6b303f5ad1da716b424b0f/Dockerfiles/manifests/rbac
[6]: /ja/agent/kubernetes/integrations
[7]: /ja/integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[8]: /ja/integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[9]: /ja/integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[10]: /ja/integrations/faq/using-rbac-permission-with-your-kubernetes-integration