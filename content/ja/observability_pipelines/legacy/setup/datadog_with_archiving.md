---
title: (LEGACY) Set Up Observability Pipelines to Send Logs in Datadog-Rehydratable Format to Amazon S3 and Datadog
aliases:
  - /observability_pipelines/setup/datadog_with_archiving/
further_reading:
  - link: /observability_pipelines/legacy/production_deployment_overview/
    tag: Documentation
    text: Production deployment design and principles for the Observability Pipelines Worker
  - link: "https://dtdg.co/d22op"
    tag: ラーニングセンター
    text: Safe and Secure Local Processing with Observability Pipelines
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

{{% observability_pipelines/legacy_warning %}}

## 概要

The [Observability Pipelines Worker][1] can collect, process, and route logs from any source to any destination. Using Datadog, you can build and manage all of your Observability Pipelines Worker deployments at scale.

This guide walks you through deploying the Worker in your common tools cluster and configuring it to send logs in a Datadog-rehydratable format to a cloud storage for archiving.

## Deployment Modes

{{% op-deployment-modes %}}

## 仮定
* すでに Datadog を使用していて、観測可能性パイプラインを使用したい。
* 観測可能性パイプラインワーカーがデプロイされるクラスターや、集計されるワークロードへの管理アクセス権がある。
* You have a common tools cluster or security cluster for your environment to which all other clusters are connected.

## 前提条件
インストールする前に、以下があることを確認してください。

* 有効な [Datadog API キー][2]。
* パイプライン ID。

[観測可能性パイプライン][3]で、この 2 つを生成することができます。

### プロバイダー固有の要件
{{< tabs >}}
{{% tab "Docker" %}}
Ensure that your machine is configured to run Docker.

{{% /tab %}}
{{% tab "AWS EKS" %}}

Kubernetes ノードでワーカーを実行するには、1 つの CPU と 512MB RAM が利用可能なノードが最低 2 台必要です。Datadog は、ワーカー用に別のノードプールを作成することを推奨しており、これは本番デプロイのための推奨構成でもあります。

* The [EBS CSI driver][1] is required. To see if it is installed, run the following command and look for `ebs-csi-controller` in the list:

  ```shell
  kubectl get pods -n kube-system
  ```

* A `StorageClass` is required for the Workers to provision the correct EBS drives. To see if it is installed already, run the following command and look for `io2` in the list:

  ```shell
  kubectl get storageclass
  ```

  If `io2` is not present, download [the StorageClass YAML][2] and `kubectl apply` it.

* The [AWS Load Balancer controller][3] is required. To see if it is installed, run the following command and look for `aws-load-balancer-controller` in the list:

  ```shell
  helm list -A
  ```
* Datadog では、Amazon EKS >= 1.16 を使用することを推奨しています。

See [Best Practices for OPW Aggregator Architecture][6] for production-level requirements.

[1]: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html
[2]: /resources/yaml/observability_pipelines/helm/storageclass.yaml
[3]: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html
[6]: /observability_pipelines/legacy/architecture/

{{% /tab %}}
{{% tab "APT ベースの Linux" %}}

There are no provider-specific requirements for APT-based Linux.

{{% /tab %}}
{{% tab "RPM ベースの Linux" %}}

There are no provider-specific requirements for APT-based Linux.

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

To run the Worker in your AWS account, you need administrative access to that account and the following information:

* インスタンスが実行される VPC ID。
* インスタンスが実行されるサブネット ID。
* VPC が置かれている AWS リージョン。

{{% /tab %}}
{{< /tabs >}}

## Set up Log Archives

When you [install the Observability Pipelines Worker](#install-the-observability-pipelines-worker) later on, the sample configuration provided includes a sink for sending logs to Amazon S3 under a Datadog-rehydratable format. To use this configuration, create an S3 bucket for your archives and set up an IAM policy that allows the Workers to write to the S3 bucket. Then, connect the S3 bucket to Datadog Log Archives.

{{% site-region region="us,us3,us5" %}}
See [AWS Pricing][1] for inter-region data transfer fees and how cloud storage costs may be impacted.

[1]: https://aws.amazon.com/s3/pricing/
{{% /site-region %}}

### Create an S3 bucket and set up an IAM policy

{{< tabs >}}
{{% tab "Docker" %}}

{{% op-datadog-archives-s3-setup %}}

3. Create an IAM user and attach the above policy to it. Create access credentials for the IAM user. Save these credentials as `AWS_ACCESS_KEY` and `AWS_SECRET_ACCESS_KEY`.

{{% /tab %}}
{{% tab "AWS EKS" %}}

{{% op-datadog-archives-s3-setup %}}

3. [Create a service account][1] to use the policy you created above.

[1]: https://docs.aws.amazon.com/eks/latest/userguide/associate-service-account-role.html

{{% /tab %}}
{{% tab "APT ベースの Linux" %}}

{{% op-datadog-archives-s3-setup %}}

3. Create an IAM user and attach the above policy to it. Create access credentials for the IAM user. Save these credentials as `AWS_ACCESS_KEY` and `AWS_SECRET_ACCESS_KEY`.

{{% /tab %}}
{{% tab "RPM ベースの Linux" %}}

{{% op-datadog-archives-s3-setup %}}

3. Create an IAM user and attach the policy above to it. Create access credentials for the IAM user. Save these credentials as `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

{{% op-datadog-archives-s3-setup %}}

3. Attach the policy to the IAM Instance Profile that is created with Terraform, which you can find under the `iam-role-name` output.

{{% /tab %}}
{{< /tabs >}}

### Connect the S3 bucket to Datadog Log Archives

You need to connect the S3 bucket you created earlier to Datadog Log Archives so that you can rehydrate the archives later on.

1. Navigate to Datadog [Log Forwarding][5].
1. Click **+ New Archive**.
1. わかりやすいアーカイブ名を入力します。
1. Add a query that filters out all logs going through log pipelines so that those logs do not go into this archive. For example, add the query `observability_pipelines_read_only_archive`, assuming that no logs going through the pipeline have that tag added.
1. Select **AWS S3**.
1. Select the AWS Account that your bucket is in.
1. Enter the name of the S3 bucket.
1. オプションでパスを入力します。
1. Check the confirmation statement.
1. Optionally, add tags and define the maximum scan size for rehydration. See [Advanced settings][6] for more information.
1. **Save** をクリックします。

See the [Log Archives documentation][7] for additional information.

### 観測可能性パイプラインワーカーのインストール

{{< tabs >}}
{{% tab "Docker" %}}

The Observability Pipelines Worker Docker image is published to Docker Hub [here][1].

1. [サンプルパイプラインコンフィギュレーションファイル][2]をダウンロードします。

2. Run the following command to start the Observability Pipelines Worker with Docker:

    ```shell
    docker run -i -e DD_API_KEY=<API_KEY> \
      -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
      -e DD_SITE=<SITE> \
      -e AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID> \
      -e AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY> \
      -e DD_ARCHIVES_BUCKET=<AWS_BUCKET_NAME> \
      -e DD_ARCHIVES_SERVICE_ACCOUNT=<BUCKET_AWS_REGION> \
      -p 8282:8282 \
      -v ./pipeline.yaml:/etc/observability-pipelines-worker/pipeline.yaml:ro \
      datadog/observability-pipelines-worker run
    ```

    各プレースホルダーを以下のように置き換えます。
    - `<API_KEY>` with your Datadog API key.
    - `<PIPELINES_ID>` with your Observability Pipelines configuration ID.
    - `<SITE>` with {{< region-param key="dd_site" code="true" >}}.
    - `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` with the AWS credentials you created earlier.
    - `<AWS_BUCKET_NAME>` with the name of the S3 bucket storing the logs.
    - `<BUCKET_AWS_REGION>` with the [AWS region][3] of the target service.
    - `./pipeline.yaml` must be the relative or absolute path to the configuration you downloaded in step 1.

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[2]: /resources/yaml/observability_pipelines/archives/pipeline.yaml
[3]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. Download the [Helm chart values file][1] for AWS EKS.

2. In the Helm chart, replace these placeholders with the following information:
    - `datadog.apiKey` with your Datadog API key. 
    - `datadog.pipelineId` with your Observability Pipelines configuration ID.
    - `site` with {{< region-param key="dd_site" code="true" >}}. 
    - `${DD_ARCHIVES_SERVICE_ACCOUNT}` in `serviceAccount.name` with the service account name. 
    - `${DD_ARCHIVES_BUCKET}` in `pipelineConfig.sinks.datadog_archives` with the name of the S3 bucket storing the logs.
    - `pipelineConfig.sinks.datadog_archives` の `${DD_ARCHIVES_SERVICE_ACCOUNT}` を対象サービスの [AWS リージョン][2]に置き換えてください。

3. Install it in your cluster with the following commands:

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    ```shell
    helm repo update
    ```
    ```shell
    helm upgrade --install \
        opw datadog/observability-pipelines-worker \
        -f aws_eks.yaml
    ```

[1]: /resources/yaml/observability_pipelines/archives/aws_eks.yaml
[2]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints
{{% /tab %}}

{{% tab "APT-based Linux" %}}
1. 以下のコマンドを実行し、APT が HTTPS 経由でダウンロードするようにセットアップします。

    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. 以下のコマンドを実行して、システム上に Datadog の `deb` リポジトリをセットアップし、Datadog のアーカイブキーリングを作成します。

    ```
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable observability-pipelines-worker-1' > /etc/apt/sources.list.d/datadog-observability-pipelines-worker.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
    sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Run the following commands to update your local `apt` repo and install the Worker:

    ```
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```

4. Add your keys and the site ({{< region-param key="dd_site" code="true" >}}) to the Worker's environment variables. Replace `<AWS_BUCKET_NAME>` with the name of the S3 bucket storing the logs and `<BUCKET_AWS_REGION>` with the [AWS region][2] of the target service.

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
    AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
    DD_ARCHIVES_BUCKET=<AWS_BUCKET_NAME>
    DD_ARCHIVES_SERVICE_ACCOUNT=<BUCKET_AWS_REGION>
    EOF
    ```

5. ホストの `/etc/observability-pipelines-worker/pipeline.yaml` に[サンプルコンフィギュレーションファイル][1]をダウンロードします。

6. Start the worker:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/archives/pipeline.yaml
[2]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints
{{% /tab %}}
{{% tab "RPM ベースの Linux" %}}
1. 以下のコマンドを実行して、システム上に Datadog の `rpm` リポジトリをセットアップします。

    ```
    cat <<EOF > /etc/yum.repos.d/datadog-observability-pipelines-worker.repo
    [observability-pipelines-worker]
    name = Observability Pipelines Worker
    baseurl = https://yum.datadoghq.com/stable/observability-pipelines-worker-1/\$basearch/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    EOF
    ```

   **注:** RHEL 8.1 または CentOS 8.1 を使用している場合は、上記の構成で `repo_gpgcheck=1` の代わりに `repo_gpgcheck=0` を使用してください。

2. Update your packages and install the Worker:

    ```
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```

3. Add your keys and the site ({{< region-param key="dd_site" code="true" >}}) to the Worker's environment variables. Replace `<AWS_BUCKET_NAME>` with the name of the S3 bucket storing the logs and `<BUCKET_AWS_REGION>` with the [AWS region][2] of the target service.

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
    AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
    DD_ARCHIVES_BUCKET=<AWS_BUCKET_NAME>
    DD_ARCHIVES_SERVICE_ACCOUNT=<BUCKET_AWS_REGION>
    EOF
    ```

4. ホストの `/etc/observability-pipelines-worker/pipeline.yaml` に[サンプルコンフィギュレーションファイル][1]をダウンロードします。

5. Start the worker:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/archives/pipeline.yaml
[2]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

1. [サンプル構成][1]をダウンロードします。
1. Set up the Worker module in your existing Terraform using the sample configuration. Make sure to update the values in `vpc-id`, `subnet-ids`, and `region` to match your AWS deployment in the configuration. Also, update the values in `datadog-api-key` and `pipeline-id` to match your pipeline.

[1]: /resources/yaml/observability_pipelines/archives/terraform_opw_archives.tf
{{% /tab %}}
{{< /tabs >}}

### ロードバランシング

{{< tabs >}}
{{% tab "Docker" %}}
Production-oriented setup is not included in the Docker instructions. Instead, refer to your company's standards for load balancing in containerized environments. If you are testing on your local machine, configuring a load balancer is unnecessary.
{{% /tab %}}
{{% tab "AWS EKS" %}}
Use the load balancers provided by your cloud provider.
The load balancers adjust based on autoscaling events that the default Helm setup is configured for. The load balancers are internal-facing,
so they are only accessible inside your network.

Datadog Agent の構成時に Helm から渡されたロードバランサーの URL を使用します。

[AWS ロードバランサーコントローラー][1]でプロビジョニングされた NLB を使用します。

See [Capacity Planning and Scaling][2] for load balancer recommendations when scaling the Worker.
#### クロスアベイラビリティゾーンロードバランシング
提供されている Helm の構成は、ロードバランシングの簡素化を目指していますが、クロス AZ (アヴェイラビリティーゾーン) トラフィックの潜在的な価格的影響を考慮する必要があります。可能な限り、サンプルは複数のクロス AZ ホップが起こりうる状況を避けるよう努めています。

サンプルの構成では、このコントローラーで利用可能なクロスゾーンのロードバランシング機能は有効化されていません。これを有効にするには、`service` ブロックに以下のアノテーションを追加します。

```
service.beta.kubernetes.io/aws-load-balancer-attributes: load_balancing.cross_zone.enabled=true
```

See [AWS Load Balancer Controller][3] for more details.

[1]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/
[2]: /observability_pipelines/legacy/architecture/capacity_planning_scaling/
[3]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/guide/service/annotations/#load-balancer-attributes
{{% /tab %}}

{{% tab "APT-based Linux" %}}
Given the single-machine nature of the installation, there is no built-in support for load-balancing. Provision your own load balancers using your company's standard.
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
Given the single-machine nature of the installation, there is no built-in support for load-balancing. You need to provision your own load balancers based on your company's standard.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
The Terraform module provisions an NLB to point at the instances. The DNS address is returned in the `lb-dns` output in Terraform.
{{% /tab %}}
{{< /tabs >}}

### バッファリング
Observability Pipelines includes multiple buffering strategies that allow you to increase the resilience of your cluster to downstream faults. The provided sample configurations use disk buffers, the capacities of which are rated for approximately 10 minutes of data at 10Mbps/core for Observability Pipelines deployments. That is often enough time for transient issues to resolve themselves, or for incident responders to decide what needs to be done with the observability data.

{{< tabs >}}
{{% tab "Docker" %}}
By default, the Observability Pipelines Worker's data directory is set to `/var/lib/observability-pipelines-worker`. Make sure that your host machine has a sufficient amount of storage capacity allocated to the container's mountpoint.
{{% /tab %}}
{{% tab "AWS EKS" %}}
For AWS, Datadog recommends using the `io2` EBS drive family. Alternatively, the `gp3` drives could also be used.
{{% /tab %}}
{{% tab "APT-based Linux" %}}
By default, the Observability Pipelines Worker's data directory is set to `/var/lib/observability-pipelines-worker` - if you are using the sample configuration, you should ensure that this has at least 288GB of space available for buffering.

Where possible, it is recommended to have a separate SSD mounted at that location.
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
By default, the Observability Pipelines Worker's data directory is set to `/var/lib/observability-pipelines-worker` - if you are using the sample configuration, you should ensure that this has at least 288GB of space available for buffering.

可能であれば、その場所に別の SSD をマウントすることをお勧めします。 {{% /tab %}}
{{% tab "Terraform (AWS)" %}}
デフォルトでは、各インスタンスに 288GB の EBS ドライブが割り当てられており、上記のサンプル構成では、これをバッファリングに使用するように設定されています。
{{% /tab %}}
{{< /tabs >}}

## Connect the Datadog Agent to the Observability Pipelines Worker
To send Datadog Agent logs to the Observability Pipelines Worker, update your agent configuration with the following:

```yaml
observability_pipelines_worker:
  logs:
    enabled: true
    url: "http://<OPW_HOST>:8282"
```

`OPW_HOST` は先ほど設定したロードバランサーやマシンの IP です。シングルホスト Docker ベースのインストールの場合、これは基盤となるホストの IP アドレスです。Kubernetes ベースのインストールでは、以下のコマンドを実行して `EXTERNAL-IP` をコピーすることで取得できます。

```shell
kubectl get svc opw-observability-pipelines-worker
```

Terraform のインストールでは、`lb-dns` 出力が必要な値を提供します。

At this point, your observability data should be going to the Worker and then sent along to your S3 archive.

## Updating deployment modes

{{% op-updating-deployment-modes %}}

## Rehydrate your archives

See [Rehydrating from Archives][4] for instructions on how to rehydrate your archive in Datadog so that you can start analyzing and investigating those logs.

## 参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/legacy/
[2]: /account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/observability-pipelines/create
[4]: /logs/log_configuration/rehydrating/
[5]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[6]: /logs/log_configuration/archives/#advanced-settings
[7]: /logs/log_configuration/archives
