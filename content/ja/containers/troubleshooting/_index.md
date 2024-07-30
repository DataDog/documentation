---
description: コンテナ関連問題のトラブルシューティング
further_reading:
- link: /containers/troubleshooting/duplicate_hosts
  tag: Documentation
  text: AWS (EC2 または EKS) 上の Kubernetes によるホストの重複
title: コンテナのトラブルシューティング
---

コンテナモニタリングに関するトラブルシューティング情報を提供します。


Agent のデプロイ方法には、以下の 3 つがあります。
1. [**ランタイムのコンテナ**][1]として

2. [Amazon ECS][2] や [Amazon ECS 環境の Fargate][3]、[Amazon EKS][4] などの**クラウド環境**で

3. [Kubernetes 環境][2]で

これらの異なる方法には、独自のデプロイメント上の課題があります。このページは、問題を解決するための出発点として使用してください。問題が解決しない場合は、[Datadog サポート][6]に連絡してください。

Agent のリリース更新や変更の詳細については、Datadog の[リリースノート][7]を参照してください。

## 一般的な問題

### 環境変数が設定されず、タグが挿入されない

[環境変数][8]の挿入や DogStatsD ライブラリの構成に便利なのは、Cluster Agent に [Admission Controller][9] の機能を実装する方法です。**注**: Cluster Agent は、アプリケーションがデプロイされる前にデプロイされ、実行されている必要があります。

### メトリクスが Datadog Web Platform に表示されない

以下が正しいことを確認します。

- メトリクスエンドポイントは露出しており、Agent が到達できる状態になっている。

- Agent がエンドポイントにアクセスするのを妨げるようなプロキシやファイアウォールは存在しない。

- Agent は[オートディスカバリー][10]を有効にしている。


### ログが収集されない

ログを収集するかどうか、どのコンテナから収集するかを左右する 2 つの[環境変数][8]が存在します。

- ログを収集するには、`DD_LOGS_ENABLED` を `true` に設定します。
- さらに、`DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` を `true` に設定すると、すべてのコンテナからすべてのログを収集することができます。

ログ (およびその他の機能) を収集対象から除外するには、[コンテナのディスカバリー管理ガイド][11]を参照してください。

### Kubelet に接続できない

Kubelet API への接続を妨げる最も一般的なエラーは、Kubelet の TLS 証明書の検証です。

TLS 検証はデフォルトで有効になっており、Agent が HTTPS 経由で Kubelet API に接続することを妨げる場合があります。専用パラメーターを使用するか、Agent マニフェストのすべてのコンテナに対して `DD_KUBELET_TLS_VERIFY` 変数を設定することで、TLS 検証を無効にすることができます。

 - `TLS_VERIFY` を `false` に設定します。

### HPA メトリクスが表示されない、または期待値と一致しない

まず、Cluster Agent がデプロイされ、ノード Agent にデータを送ることができることを確認します。

次に、Metrics Summary で外部メトリクスのスケーリングに使用したクエリを確認します。有効なクエリのみがオートスケールされます。複数のクエリがある場合、クエリの**いずれか**が無効であれば、**すべての**クエリが無視されます。

HPA メトリクスについて、さらにサポートを求める場合は、以下を [Datadog サポート][6]に伝えてください。
  - HPA マニフェストの `describe` 出力:
      ```
      $ kubectl describe hpa > hpa.log
      ```
  - DatadogMetric Custom Resource Definition の `describe` 出力:
      ```
      $ kubectl describe DatadogMetric > DatadogMetric.log
      ```


## ランタイム

ログについては、Agent のデプロイコマンドで `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` と `DD_LOGS_ENABLED` が有効になっていることを確認します。

## クラウド

IAM ポリシーが更新されていることを確認します。

### Fargate でログが収集されない

  - [ECS][12]: ログを収集するコンテナにログルーターがアタッチされていることを確認します。

  - [EKS][13]: EKS Fargate 環境において Agent がログを収集する一般的な方法は 2 つあります。CloudWatch のログを利用したログ転送と、[Kinesis Data Firehose][14] を利用したログ転送です。Kinesis Data Firehose を使用してログを収集するには、Kinesis Data Firehose の配信ストリームを正常に実装する必要があり、いくつかのコマンドラインツールも必要です。


## Kubernetes

### コンテナがメトリクスをデプロイまたは収集しない

まず、API キーが有効であることを確認します。

次に、ノード Agent ポッドで、`agent status` コマンドを実行し、結果を確認します。

### `kubeapi_server`、`kube_controller_manager`、`etcd` のメトリクスが取得できない

Azure Kubernetes Service (AKS) や Google Kubernetes Engine (GKE) などのマネージドサービスでは、ユーザーは Control Plane コンポーネントにアクセスできません。そのため、これらの環境では `kube_apiserver`、`kube_controller_manager`、`kube_scheduler`、または `etcd` チェックを実行することができません。



# Datadog サポートが収集するトラブルシューティングのデータ

サポートチケットを開いた後、以下のような情報を求められることがあります。

### Agent フレア

[`flare`][15] コマンドを使用すると、Datadog サポートにトラブルシューティング情報を送信することができます。

**ノード Agent フレア**

```
$ kubectl exec <AGENT_POD_NAME> -it agent flare <CASE_ID> 
```

**Cluster Agent フレア**

```
$ kubectl exec <CLUSTER_AGENT_POD_NAME> -it agent flare <CASE_ID>
```


### ポッドの出力を記述する

これにより、ノードまたは Cluster Agent がどのようにデプロイされたか、ポッドの直近のイベントは何か、何らかの品質 (カスタムタグなど) が挿入されてホストメトリクスに適用されたかどうかについての洞察がチームに提供されます。コマンドの `> <FILENAME>.yaml` セクションは、Datadog サポートにアタッチとして送ることができるファイル出力を作成します。

```
$ kubectl describe pod <POD_NAME> > <FILENAME>.yaml
```

### マニフェスト/デプロイメント

これは、環境に Agent をデプロイするために使用されるファイルです。構成されたタグ、ログが有効になっているかどうか、特定のコンテナが無視されるように定義されているかどうかなどを Datadog に通知するものです。

ランタイム環境でデプロイする場合は、デプロイに使用したコマンドラインをサポートに送信してください。

一般的なデプロイ方法は、 Helm チャート、DaemonSet、Operator の 3 つです。

### cURL 出力

メトリクスの欠落や不正確さが発生している場合、Datadog サポートは、メトリクスのエンドポイントに到達しようとするノード Agent の cURL 出力の結果を求める場合があります。これは、Agent コンテナ内からコマンドを実行することで行われ、Agent がメトリクスにアクセスできるかどうかをサポートに知らせることができます。**注**: これは Fargate やマネージドサービスでは不可能です。

```
$ kubectl exec -it <AGENT_POD_NAME> curl -k -v ""<METRIC_ENDPOINT>""
```

```
$ docker exec -it <AGENT_CONTAINER_ID> curl -k -v "<METRIC_ENDPOINT>"
```

## その他の参考資料

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