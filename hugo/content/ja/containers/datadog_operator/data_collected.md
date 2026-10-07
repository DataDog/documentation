---
dependencies:
- https://github.com/DataDog/datadog-operator/blob/main/docs/data_collected.md
title: Datadog Operator から収集されるデータ
---
Datadog Operator はメトリクスとイベントを Datadog に送信し、クラスター内の Datadog Agent コンポーネントのデプロイメントを監視します。

Datadog によって収集される Kubernetes メトリクスの一覧については、[収集される Kubernetes データ][1]を参照してください。

## メトリクス

| メトリクス名                                              | メトリクスタイプ | 説明                                                                                                                         |
| -------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `datadog.operator.agent.deployment.success`              | gauge       | Agent のレプリカの希望数が利用可能な Agent ポッドの数と等しい場合は `1`、それ以外の場合は `0`。                                |
| `datadog.operator.clusteragent.deployment.success`       | gauge       | Cluster Agent のレプリカの希望数が利用可能な Cluster Agent ポッドの数と等しい場合は `1`、それ以外の場合は `0`。                |
| `datadog.operator.clusterchecksrunner.deployment.success` | gauge       | Cluster Check Runner のレプリカの希望数が利用可能な Cluster Check Runner ポッドの数と等しい場合は `1`、それ以外の場合は `0`。  |
| `datadog.operator.reconcile.success`                     | gauge       | 最後に記録された reconcile エラーが null の場合は `1`、それ以外の場合は `0`。`reconcile_err` タグには最後に記録されたエラーが格納されています。         |

**注:** Datadog にメトリクスを転送するには、[Datadog API キーおよびアプリケーション キー][2]が必要です。これらは、カスタム リソース定義の `credentials` フィールドで指定する必要があります。

## OpenMetrics

Datadog Operator は Golang と Controller のメトリクスを OpenMetrics 形式で公開しています。これらのメトリクスは、[OpenMetrics インテグレーション][3]を使って収集できます。

OpenMetrics チェックは、Autodiscovery のアノテーションを通じてデフォルトで有効になり、Datadog Operator ポッドと同じノードで実行されている Agent によってスケジュールされます。[Kubernetes とインテグレーション][4]を参照してください。

## イベント

- カスタム リソース <Namespace/Name> の検出/削除
- サービス <Namespace/Name> の作成/更新/削除
- ConfigMap <Namespace/Name> の作成/更新/削除
- DaemonSet <Namespace/Name> の作成/更新/削除
- ExtendedDaemonSet <Namespace/Name> の作成/更新/削除
- デプロイメント <Namespace/Name> の作成/更新/削除
- ClusterRole の作成/更新/削除
- ロール <Namespace/Name> の作成/更新/削除
- ClusterRoleBinding の作成/更新/削除
- RoleBinding <Namespace/Name> の作成/更新/削除
- シークレット <Namespace/Name> の作成/更新/削除
- PDB <Namespace/Name> の作成/更新/削除
- ServiceAccount <Namespace/Name> の作成/削除

[1]: https://docs.datadoghq.com/ja/containers/kubernetes/data_collected/
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[3]: https://docs.datadoghq.com/ja/integrations/openmetrics/
[4]: https://docs.datadoghq.com/ja/containers/kubernetes/integrations/?tab=annotations