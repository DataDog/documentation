---
description: コンテナ関連の問題のトラブルシューティング
further_reading:
- link: /containers/troubleshooting/duplicate_hosts
  tag: ドキュメント
  text: AWS (EC2 または EKS) 上の Kubernetes での重複するホスト
title: コンテナのトラブルシューティング
---
このページでは、コンテナ監視のトラブルシューティング情報を提供します。


Agent のデプロイ方法には 3 つあります。
1. [**ランタイム内のコンテナ**][1]として 

2. [Amazon ECS][2]、[Amazon ECS 環境の Fargate][3]、[Amazon EKS][4] などの**クラウド環境**で

3. [Kubernetes 環境][16]で

これらの異なる方法には、それぞれ固有のデプロイ課題があります。問題を解決する際は、このページを出発点として使用します。問題が解決しない場合は、[Datadog サポート][6]へお問い合わせください。

Agent のリリース更新や変更の詳細については、Datadog の[リリースノート][7]を参照してください。

## 一般的な問題 {#general-issues}

### 環境変数が設定されず、タグが挿入されない {#environment-variables-are-not-being-set-and-tags-are-not-injected}

[環境変数][8]を挿入したり、DogStatsD ライブラリを設定したりするには、Cluster Agent の [Admission Controller][9] 機能を使用すると便利です。**注**: Cluster Agent は、アプリケーションをデプロイする_前_にデプロイされ、実行されている必要があります。

### メトリクスが Datadog ウェブプラットフォームに表示されない {#metrics-are-not-appearing-on-the-datadog-web-platform}

以下が正しいことを確認してください。

- メトリクスエンドポイントが公開されており、Agent がアクセスできるようになっていること。

- Agent がエンドポイントにアクセスするのを妨げるプロキシやファイアウォールがないこと。

- Agent で [Autodiscovery][10] が有効になっていること。


### ログが収集されない {#logs-are-not-collected}

ログが収集されるかどうか、またどのコンテナから収集されるかに影響を与える[環境変数][8]が 2 つあります。

- `DD_LOGS_ENABLED` を `true` に設定してログを収集します。
- さらに、`DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` を `true` に設定して、すべてのコンテナからすべてのログを収集します。

ログ (およびその他の機能) を収集から除外するには、[コンテナディスカバリー管理に関するガイド][11]を参照してください。

### Kubelet に接続できない {#cannot-connect-to-the-kubelet}

Kubelet API へのコネクションを妨げる最も一般的なエラーは、Kubelet TLS 証明書の検証です。

TLS 検証はデフォルトで有効になっており、Agent が HTTPS 経由で Kubelet API に接続するのを妨げる可能性があります。専用のパラメーターを使用するか、Agent マニフェスト内のすべてのコンテナに対して `DD_KUBELET_TLS_VERIFY` 変数を設定することで、TLS 検証を無効にできます。

 - `TLS_VERIFY` を `false` に設定します。

### HPA メトリクスが表示されない、または期待値と一致しない {#hpa-metrics-are-not-appearing-or-are-not-aligning-with-the-expected-value}

まず、Cluster Agent がデプロイされていてノード Agent にデータを送信できることを確認します。

その後、Metrics Catalog で外部メトリクスのスケールに使用されるクエリを確認します。有効なクエリのみがオートスケールされます。複数のクエリがある場合、**すべて**のクエリはそのうちの**いずれか**が無効であれば無視されます。

HPA メトリクスについてさらにサポートが必要な場合は、[Datadog サポート][6]に以下を提供してください。
  - HPA マニフェストの `describe` 出力:
      ```
      $ kubectl describe hpa > hpa.log
      ```
  - DatadogMetric カスタムリソース定義の `describe` 出力:
      ```
      $ kubectl describe DatadogMetric > DatadogMetric.log
      ```


## ランタイム {#runtime}

 ログについては、Agent のデプロイコマンドで `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` と `DD_LOGS_ENABLED` が有効になっていることを確認してください。

## クラウド {#cloud}

IAM ポリシーが更新されていることを確認してください。

### Fargate でログが収集されない {#logs-are-not-collected-in-fargate}

  - [ECS][12]: ログを収集するコンテナにログルーターがアタッチされていることを確認してください。

  - [EKS][13]: EKS Fargate 環境で Agent がログを収集する一般的な方法には、CloudWatch ログを使用したログ転送と、[Amazon Data Firehose][14] を介したログ転送の 2 つがあります。Amazon Data Firehose を使用してログを収集するには、Amazon Data Firehose 配信ストリームの正常な実装と、いくつかのコマンドラインツールが必要です。
 

## Kubernetes {#kubernetes}

### メトリクスがデプロイされていない、または収集されていないコンテナ {#container-not-deploying-or-collecting-metrics}

まず、API キーが有効であることを確認してください。

次に、ノード Agent Pod で `agent status` コマンドを実行し、結果を確認します。

### `kubeapi_server`、`kube_controller_manager`、または `etcd` メトリクスを取得していない {#not-getting-kubeapi-server-kube-controller-manager-or-etcd-metrics}

Azure Kubernetes Service (AKS) や Google Kubernetes Engine (GKE) などのマネージドサービスでは、ユーザーはコントロールプレーンコンポーネントにアクセスできません。その結果、これらの環境では `kube_apiserver`、`kube_controller_manager`、`kube_scheduler`、または `etcd` チェックを実行することはできません。

## ECS Fargate {#ecs-fargate}

### Windows Agent がサービスの起動中にタイムアウトする {#windows-agent-times-out-while-starting-service}

```text
[ENTRYPOINT][ERROR] Could not start the service: The service did not respond to the start or control request in a timely fashion.
. Error: [1053 (0x41d)]
```

このエラーを回避するには、Datadog Agent に少なくとも `512` の **CPU ユニット**が予約されていることを確認してください。

# Datadog サポートからリクエストされたトラブルシューティングデータ {#troubleshooting-data-requested-by-datadog-support}

サポートチケットを開いた後、以下の種類の情報を求められる場合があります。

### Agent Flare {#agent-flare}

[`flare`][15] コマンドを使用して、トラブルシューティング情報を Datadog サポートに送信できます。

**Node Agent フレア**

```
$ kubectl exec <AGENT_POD_NAME> -it agent flare <CASE_ID> 
```

**Cluster Agent フレア**

```
$ kubectl exec <CLUSTER_AGENT_POD_NAME> -it agent flare <CASE_ID>
```
 

### Pod の出力を記述する {#describe-pod-output}

これにより、ノードまたは Cluster Agent がどのようにデプロイされたか、Pod の最新のイベントは何か、カスタムタグなどの属性が注入され、ホストのメトリクスに適用されたかどうかをチームが把握できます。コマンドの `> <FILENAME>.yaml` セクションでは、Datadog サポートに添付ファイルとして送信できるファイル出力が作成されます。

```
$ kubectl describe pod <POD_NAME> > <FILENAME>.yaml
```

### マニフェスト/デプロイメント {#manifestdeployment}

これは、利用中の環境に Agent をデプロイするために使用されるファイルです。このファイルにより、設定されたタグ、ログが有効になっているかどうか、特定のコンテナが無視の対象として指定されているかどうかが伝えられます。

ランタイム環境に Agent をデプロイする場合は、Agent のデプロイに使用されたコマンドラインをサポートに送信してください。

最も一般的なデプロイ方法は、Helm チャート、DaemonSet、Operator の 3 つです。

### cURL 出力 {#curl-output}

メトリクスが欠落している、または不正確である場合、メトリクスエンドポイントに接続しようとしているノード Agent の cURL 出力結果を Datadog サポートから求められることがあります。これは Agent コンテナ内からコマンドを実行することで行われ、Agent がメトリクスにアクセスできるかどうかをサポートに伝えることができます。**注**: これは Fargate またはマネージドサービスでは実行できません。

```
$ kubectl exec -it <AGENT_POD_NAME> curl -k -v ""<METRIC_ENDPOINT>""
```

```
$ docker exec -it <AGENT_CONTAINER_ID> curl -k -v "<METRIC_ENDPOINT>"
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/containers/docker/?tab=standard
[2]: https://docs.datadoghq.com/ja/containers/amazon_ecs/?tab=awscli
[3]: https://docs.datadoghq.com/ja/integrations/ecs_fargate/?tab=webui#
[4]: https://docs.datadoghq.com/ja/integrations/eks_fargate
[5]: https://docs.datadoghq.com/ja/containers/kubernetes/
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://app.datadoghq.com/release-notes
[8]: https://docs.datadoghq.com/ja/agent/guide/environment-variables/#overview
[9]: https://docs.datadoghq.com/ja/containers/cluster_agent/admission_controller/?tab=operator
[10]: https://docs.datadoghq.com/ja/getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[11]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-management/?tab=containerizedagent
[12]: https://docs.datadoghq.com/ja/integrations/ecs_fargate/?tab=webui#log-collection
[13]: https://docs.datadoghq.com/ja/integrations/eks_fargate/#log-collection
[14]: https://docs.datadoghq.com/ja/logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/#overview
[15]: https://docs.datadoghq.com/ja/agent/troubleshooting/send_a_flare
[16]: https://docs.datadoghq.com/ja/containers/kubernetes/installation/?tab=operator