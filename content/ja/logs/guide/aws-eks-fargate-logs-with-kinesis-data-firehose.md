---
further_reading:
- link: https://docs.datadoghq.com/logs/log_configuration/processors/
  tag: Documentation
  text: プロセッサー
- link: https://docs.aws.amazon.com/eks/latest/userguide/fargate-logging.html
  tag: Documentation
  text: Fargate ログ
- link: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
  tag: Documentation
  text: AWS Fargate プロファイル
title: Kinesis Data Firehose で AWS EKS Fargate のログを送信する
---

## 概要

AWS Fargate on EKS は、Kubernetes ワークロードを実行するためのフルマネージドエクスペリエンスを提供します。Kinesis Data Firehose は、EKS の Fluent Bit ログルーターと併用することで、Datadog でログを収集することができます。このガイドでは、Kinesis Data Firehose と CloudWatch ログによるログ転送の比較、および Kinesis Data Firehose を通じて Datadog にログを送信する EKS Fargate アプリケーションのサンプルについて説明します。

{{< img src="logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/log_streaming_diagram.png" alt="Fargate EKS クラスターがコンテナログを Fluent Bit ログルーターを経由して Kinesis データファイアホースと AWS 内の S3 バックアップバケットに送り、さらに Datadog に送るログフローを示した図" responsive="true">}}


### Kinesis Data Firehose と CloudWatch のログ転送

Kinesis Data Firehose と CloudWatch のログ転送を使用した場合の主な違いは以下の通りです。

- **メタデータとタグ付け**: Kinesis Data Firehose でログを送信する際に、Kubernetes ネームスペースやコンテナ ID などのメタデータを構造化された属性としてアクセスできます。

- **AWS のコスト**: AWS のコストは個々のユースケースによって異なりますが、Kinesis Data Firehose の取り込みは、同等の Cloudwatch Log の取り込みよりも一般的に安価です。

## 要件
1. [`kubectl`][6] と [`aws`][7] のコマンドラインツールを使用します。
2. [Fargate プロファイル][1]と Fargate ポッドの実行ロールを持つ EKS クラスター。このガイドでは、クラスターは `fargate-cluster` という名前で、`fargate-profile` という名前の Fargate プロファイルが `fargate-namespace` というネームスペースに適用されているものとします。これらのリソースがまだない場合は、[Amazon EKS の概要][8]でクラスターを作成し、[Amazon EKS を使った AWS Fargate の概要][9]で Fargate プロファイルとポッドの実行ロールを作成します。


## セットアップ

以下の手順は、Fluent Bit と Kinesis Data Firehose デリバリーストリームを通じて、EKS クラスターにデプロイされたサンプルアプリケーションから Datadog にログを送信するプロセスの概要を説明するものです。Datadog の標準的な Kubernetes タグとの一貫性を最大化するために、選択した属性をタグキーに再マップする手順も含まれています。

1. ログ配信に失敗した場合の S3 バックアップとともに、メトリクスを Datadog に配信する [Kinesis Data Firehose 配信ストリームを作成](#create-kinesis-delivery-stream)します。
2. [EKS Fargate で Fluent Bit for Firehose を構成しました。](#configure-fluent-bit-for-firehose-on-an-eks-fargate-cluster)。
3. [サンプルアプリケーションをデプロイします](#deploy-a-sample-application)。
4. Kubernetes タグと `container_id` タグを使った相関のために、[リマッパープロセッサーの適用](#remap-attributes-for-log-correlation)を行います。

### Kinesis 配信ストリームの作成

Kinesis Firehose Delivery の設定方法は、[Datadog Kinesis Firehose の宛先を使用して AWS サービスログを送信する][4]のガイドをご参照ください。
**注**: **Source** を `Direct PUT` に設定します。

### EKS Fargate クラスターで Fluent Bit for Firehose を構成する

1. `aws-observability` ネームスペースを作成します。

{{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
kubectl create namespace aws-observability
{{< /code-block >}}

2. Fluent Bit 用の Kubernetes ConfigMap を以下のように `aws-logging-configmap.yaml` として作成します。配信ストリームの名前を代入してください。

{{< code-block lang="yaml" filename="" disable_copy="false" collapsible="false" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: aws-logging
  namespace: aws-observability
data:
  filters.conf: |
    [FILTER]
        Name                kubernetes
        Match               kube.*
        Merge_Log           On
        Buffer_Size         0
        Kube_Meta_Cache_TTL 300s

  flb_log_cw: 'true'

  output.conf: |
    [OUTPUT]
        Name kinesis_firehose
        Match kube.*
        region <REGION>
        delivery_stream <YOUR-DELIVERY-STREAM-NAME>
{{< /code-block >}}

3. ConfigMap マニフェストを適用するには、`kubectl` を使用します。

{{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
kubectl apply -f aws-logging-configmap.yaml
{{< /code-block >}}

4. AWS Fargate 上で動作するログルーターが Kinesis Data Firehose に書き込めるように、IAM ポリシーを作成し、ポッドの実行ロールにアタッチします。以下の例のように、**Resource** フィールドの ARN を配信ストリームの ARN に置き換え、リージョンとアカウント ID も指定します。

{{< code-block lang="json" filename="allow_kinesis_put_permission.json" disable_copy="false" collapsible="false" >}}
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "firehose:PutRecord",
                "firehose:PutRecordBatch"
            ],
            "Resource":
       "arn:aws:firehose:<REGION>:<ACCOUNTID>:deliverystream/<DELIVERY-STREAM-NAME>"
       }
]
}
{{< /code-block >}}

   a. ポリシーを作成します。

{{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
aws iam create-policy \
         --policy-name FluentBitEKSFargate \
         --policy-document file://allow_kinesis_put_permission.json
{{< /code-block >}}

   b. Fargate Pod Execution Role を取得し、IAM ポリシーをアタッチします。

{{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 POD_EXEC_ROLE=$(aws eks describe-fargate-profile \
   --cluster-name fargate-cluster \
   --fargate-profile-name fargate-profile \
   --query 'fargateProfile.podExecutionRoleArn' --output text |cut -d '/' -f 2)
 aws iam attach-role-policy \
         --policy-arn arn:aws:iam::<ACCOUNTID>:policy/FluentBitEKSFargate \
         --role-name $POD_EXEC_ROLE
{{< /code-block >}}

### サンプルアプリケーションをデプロイする

ログを生成して Kinesis パイプラインをテストするには、EKS Fargate クラスターにサンプルワークロードをデプロイします。

1. デプロイメントマニフェスト `sample-deployment.yaml` を作成します。

{{< code-block lang="yaml" filename="sample-deployment.yaml" disable_copy="false" collapsible="false" >}}
 apiVersion: apps/v1
 kind: Deployment
 metadata:
   name: sample-app
   namespace: fargate-namespace
 spec:
   selector:
     matchLabels:
       app: nginx
   replicas: 1
   template:
     metadata:
       labels:
         app: nginx
     spec:
       containers:
       - name: nginx
         image: nginx
         ports:
         - containerPort: 80
{{< /code-block >}}

 2. `fargate-namespace` ネームスペースを作成します。

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl create namespace fargate-namespace
 {{< /code-block >}}

 3. デプロイメントマニフェストを適用するには、`kubectl` を使用します。

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl apply -f sample-deployment.yaml
 {{< /code-block >}}

### 検証

1. ネームスペース `fargate-namespace` で `sample-app` ポッドが動作していることを確認します。

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl get pods -n fargate-namespace
 {{< /code-block >}}

期待される出力:

 {{< code-block lang="bash" filename="" disable_copy="true" collapsible="false" >}}
 NAME                          READY   STATUS    RESTARTS   AGE
 sample-app-6c8b449b8f-kq2qz   1/1     Running   0          3m56s
 sample-app-6c8b449b8f-nn2w7   1/1     Running   0          3m56s
 sample-app-6c8b449b8f-wzsjj   1/1     Running   0          3m56s
 {{< /code-block >}}

2. `kubectl describe pod` を使用して、Fargate のログ機能が有効であることを確認します。

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl describe pod <POD-NAME> -n fargate-namespace |grep Logging
 {{< /code-block >}}

期待される出力:

 {{< code-block lang="bash" filename="" disable_copy="true" collapsible="false" >}}
                    Logging: LoggingEnabled
 Normal  LoggingEnabled   5m   fargate-scheduler  Successfully enabled logging for pod
 {{< /code-block >}}

3. デプロイのログを検査します。

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl logs -l app=nginx -n fargate-namespace
 {{< /code-block >}}

期待される出力:

 {{< code-block lang="bash" filename="" disable_copy="true" collapsible="false" >}}
 /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
 /docker-entrypoint.sh: Configuration complete; ready for start up
 2023/01/27 16:53:42 [notice] 1#1: using the "epoll" event method
 2023/01/27 16:53:42 [notice] 1#1: nginx/1.23.3
 2023/01/27 16:53:42 [notice] 1#1: built by gcc 10.2.1 20210110 (Debian 10.2.1-6)
 2023/01/27 16:53:42 [notice] 1#1: OS: Linux 4.14.294-220.533.amzn2.x86_64
 2023/01/27 16:53:42 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1024:65535
 2023/01/27 16:53:42 [notice] 1#1: start worker processes
 ...
 {{< /code-block >}}

4. Datadog の UI でログを確認します。Kinesis Data Firehose からのログをフィルターするために、`source:aws` を選択します。
{{< img src="logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/log_verification.jpg" alt="Datadog ログエクスプローラーでの nginx ログ行の検証" responsive="true">}}

### ログ相関のための属性のリマップ

この構成からのログは、Datadog の標準的な Kubernetes タグとの一貫性を最大化するために、いくつかの属性をリマップする必要があります。
1. [Datadog Log Pipelines][3] のページに移動します。
2. **Name** `EKS Fargate Log Pipeline` と **Filter** `service:aws source:aws` で新しいパイプラインを作成します。
3. 以下の属性をタグキーにリマップするための [Remapper プロセッサー][5]を 4 つ作成します。
 | リマップする属性 | ターゲットタグキー |
 |--------------------|----------------|
 | `kubernetes.container_name` | `kube_container_name` |
 | `kubernetes.namespace_name` | `kube_namespace` |
 | `kubernetes.pod_name` | `pod_name` |
 | `kubernetes.docker_id` | `container_id` |

4. このパイプラインを作成すると、サンプルアプリが出力するログは、この例のようにログ属性が Kubernetes タグにリマップされてタグ付けされるようになります。
{{< img src="logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/log_example_remapped.jpg" alt="Datadog で container_id、kube_container_name、kube_namespace、pod_name のタグが付いたログの詳細ビュー" responsive="true">}}

## その他の参考資料
 {{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/logs/pipelines
[4]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=kinesisfirehosedeliverystream#setup
[5]: /ja/logs/log_configuration/processors/?tab=ui#remapper
[6]: https://kubernetes.io/docs/tasks/tools/
[7]: https://aws.amazon.com/cli/
[8]: https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html
[9]: https://docs.aws.amazon.com/eks/latest/userguide/fargate-getting-started.html