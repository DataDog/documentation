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
- link: /logs/guide/reduce_data_transfer_fees
  tag: ガイド
  text: データ転送料金を削減しながら Datadog にログを送信する方法
title: Amazon EKS Fargate のログを Amazon Data Firehose で送信する
---

## 概要

EKS 上の AWS Fargate は、Kubernetes ワークロードを実行するためのフル マネージド エクスペリエンスを提供します。Amazon Data Firehose は、EKS の Fluent Bit ログ ルーターと組み合わせて使用し、Datadog でログを収集できます。このガイドでは、Amazon Data Firehose と CloudWatch Logs を経由したログ フォワーディングの比較と、Amazon Data Firehose を通じて Datadog にログを送信するサンプル EKS Fargate アプリケーションを提供します。

{{< img src="logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/log_streaming_diagram.png" alt="Fargate の EKS クラスターが Fluent Bit ログ ルーターを介してコンテナ ログを Amazon Data Firehose と AWS 内の S3 バックアップ バケットに送信し、その後 Datadog へ転送するログ フローの図" responsive="true">}}

### Amazon Data Firehose と CloudWatch Log フォワーディング

以下は、Amazon Data Firehose と CloudWatch Log フォワーディングを使用した場合の主な違いです。

- **メタ データとタグ付け**: Kubernetes 名前空間 や コンテナ ID などのメタ データは、Amazon Data Firehose でログを送信するときに構造化属性として利用できます。

- **AWS コスト**: AWS コスト はユース ケースによって異なりますが、Amazon Data Firehose での取り込みは、同等の CloudWatch Log 取り込みよりも一般的に安価です。

## 要件
1. [`kubectl`][6] と [`aws`][7] のコマンドラインツールを使用します。
2. [Fargate プロファイル][1]と Fargate ポッドの実行ロールを持つ EKS クラスター。このガイドでは、クラスターは `fargate-cluster` という名前で、`fargate-profile` という名前の Fargate プロファイルが `fargate-namespace` というネームスペースに適用されているものとします。これらのリソースがまだない場合は、[Amazon EKS の概要][8]でクラスターを作成し、[Amazon EKS を使った AWS Fargate の概要][9]で Fargate プロファイルとポッドの実行ロールを作成します。

## セットアップ

以下の手順では、EKS クラスターにデプロイしたサンプル アプリケーションから Fluent Bit と Amazon Data Firehose デリバリー ストリームを経由して Datadog にログを送信するプロセスを説明します。Datadog における標準 Kubernetes タグとの一貫性を最大化するため、選択した属性をタグ キーへリマップする手順も含まれています。

1. [Amazon Data Firehose デリバリー ストリームの作成](#create-an-amazon-data-firehose-delivery-stream) — ログを Datadog に配信し、失敗したログ配信用に S3 バックアップも設定します。
2. [EKS Fargate で Fluent Bit for Firehose を構成しました。](#configure-fluent-bit-for-firehose-on-an-eks-fargate-cluster)。
3. [サンプルアプリケーションをデプロイします](#deploy-a-sample-application)。
4. Kubernetes タグと `container_id` タグを使った相関のために、[リマッパープロセッサーの適用](#remap-attributes-for-log-correlation)を行います。

### Amazon Data Firehose デリバリー ストリームを作成する

[Datadog Amazon Data Firehose 宛先を使用して AWS サービスのログを送信する][4]ガイドを参照して、Amazon Data Firehose デリバリー ストリームをセットアップしてください。
**注**: **Source** を `Direct PUT` に設定してください。

### EKS Fargate クラスターで Fluent Bit for Firehose を構成する

1. `aws-observability` ネームスペースを作成します。

{{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
kubectl create namespace aws-observability
{{< /code-block >}}

2. Fluent Bit 用の Kubernetes ConfigMap を以下のように `aws-logging-configmap.yaml` として作成します。配信ストリームの名前を代入してください。

<div class="alert alert-info">新しい高性能の <a href="https://docs.fluentbit.io/manual/pipeline/outputs/firehose">Kinesis Firehose プラグイン</a>を使用する場合は、プラグイン名に <code>kinesis_firehose</code> を指定し、<code>amazon_data_firehose</code> の代わりに使用してください。</div>

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

4. AWS Fargate 上で動作するログ ルーターが Amazon Data Firehose に書き込めるように、IAM ポリシーを作成して Pod 実行ロールにアタッチします。以下の例を使用し、**Resource** フィールドの ARN をご自分のデリバリー ストリームの ARN に置き換え、リージョンとアカウント ID も指定してください。

{{< code-block lang="json" filename="allow_firehose_put_permission.json" disable_copy="false" collapsible="false" >}}
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
         --policy-document file://allow_firehose_put_permission.json
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

ログを生成して Amazon Data Firehose デリバリー ストリームをテストするため、EKS Fargate クラスターにサンプル ワークロードをデプロイします。

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

4. ログが Datadog に届いていることを確認します。[Datadog Log Explorer][10] で `@aws.firehose.arn:"<ARN>"` を検索し、`<ARN>` をご自分の Amazon Data Firehose ARN に置き換えることで、Amazon Data Firehose からのログのみにフィルターできます。

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
[4]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=amazondatafirehosedeliverystream#setup
[5]: /ja/logs/log_configuration/processors/?tab=ui#remapper
[6]: https://kubernetes.io/docs/tasks/tools/
[7]: https://aws.amazon.com/cli/
[8]: https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html
[9]: https://docs.aws.amazon.com/eks/latest/userguide/fargate-getting-started.html
[10]: https://app.datadoghq.com/logs