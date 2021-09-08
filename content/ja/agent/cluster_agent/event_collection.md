---
title: イベント収集
kind: documentation
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
  - link: /agent/cluster_agent/troubleshooting/
    tag: ドキュメント
    text: Datadog Cluster Agent のトラブルシューティング
---
まだ行っていない場合は、[Datadog Cluster Agent をインストールするためのセットアップ手順][1]を確認し、イベント収集を有効にします。

1. `leader_election` 変数または `DD_LEADER_ELECTION` 環境変数を `false` に設定して、Datadog Node Agent Daemonset のリーダー選出を無効にします。

2. Cluster Agent デプロイファイルで、`DD_COLLECT_KUBERNETES_EVENTS` および `DD_LEADER_ELECTION` 環境変数を `true` に設定します。

      ```yaml
        - name: DD_COLLECT_KUBERNETES_EVENTS
          value: "true"
        - name: DD_LEADER_ELECTION
          value: "true"
      ```

この方法でリーダー選出を有効にすると、1 つの Cluster Agent のみがイベントを収集するようになります。

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/cluster_agent/setup/