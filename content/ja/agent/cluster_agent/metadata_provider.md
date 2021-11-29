---
title: クラスターメタデータプロバイダー
kind: ドキュメント
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
クラスターメタデータのプロバイダー機能を有効にするには:

1. Node Agent と Datadog Cluster Agent が[適切に通信できる][1]ことを確認します。
2. Datadog Cluster Agent の前に [Cluster Agent サービス][2]を作成します。
3. [Agent の間で auth_token が適切に共有されていることを確認します][1]。
4. [RBAC ルールが適切に設定されていることを確認します][1]。
5. Node Agent で、環境変数 `DD_CLUSTER_AGENT_ENABLED` を `true` に設定します。
6. *任意* - 環境変数 `DD_KUBERNETES_METADATA_TAG_UPDATE_FREQ` を設定すると、Node Agent が Datadog Cluster Agent をヒットする頻度を指定できます。
7. *任意* - ``DD_KUBERNETES_COLLECT_METADATA_TAGS=false` で、Kubernetes メタデータタグの収集を無効にします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/cluster_agent/troubleshooting/
[2]: /ja/agent/cluster_agent/setup/#step-3-create-the-cluster-agent-and-its-service