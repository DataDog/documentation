---
title: (LEGACY) Set Up Observability Pipelines in your Splunk Environment
aliases:
  - /integrations/observability_pipelines/splunk
  - /observability_pipelines/guide/setup_splunk_environment
  - /observability_pipelines/setup/splunk/
further_reading:
  - link: /observability_pipelines/legacy/working_with_data/
    tag: Documentation
    text: Working with data using Observability Pipelines
  - link: /observability_pipelines/legacy/configurations/
    tag: Documentation
    text: Learn more about Observability Pipelines configurations
  - link: "https://dtdg.co/d22op"
    tag: ラーニングセンター
    text: Safe and Secure Local Processing with Observability Pipelines
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

{{% observability_pipelines/legacy_warning %}}

<div class="alert alert-info">Observability Pipelines only supports Splunk's HTTP Event Collector (HEC) protocol.</div>

## 概要

The [Observability Pipelines Worker][1] can collect, process, and route logs from any source to any destination. Using Datadog, you can build and manage all of your Observability Pipelines Worker deployments at scale.

This guide walks you through deploying the Worker in your common tools cluster and configuring Splunk to send logs through the Worker, to dual-write to Datadog.

{{< img src="observability_pipelines/guide/splunk/setup2.png" alt="A diagram of a couple of Splunk Heavy Forwarders sending their data through the Observability Pipelines aggregator." >}}

## 仮定
* Splunk HTTP Event Collector (HEC) プロトコルと互換性のあるログコレクターを使用している。
* コレクターとログが送信される Splunk インデックスへの管理者アクセス権を持っている。
* You have administrative access to the clusters where the Observability Pipelines Worker is going to be deployed.
* 環境には一般的なツールまたはセキュリティクラスターがあり、他のすべてのクラスターはこれに接続されている。

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
To run the Worker on your Kubernetes nodes, you need a minimum of two nodes with one CPU and 512MB RAM available. Datadog recommends creating a separate node pool for the Workers, which is also the recommended configuration for production deployments.

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

See [Best Practices for OPW Aggregator Architecture][4] for production-level requirements.

[1]: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html
[2]: /resources/yaml/observability_pipelines/helm/storageclass.yaml
[3]: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html
[4]: /observability_pipelines/legacy/architecture/

{{% /tab %}}
{{% tab "Azure AKS" %}}
To run the Worker on your Kubernetes nodes, you need a minimum of two nodes with one CPU and 512MB RAM available. Datadog recommends creating a separate node pool for the Workers, which is also the recommended configuration for production deployments.

See [Best Practices for OPW Aggregator Architecture][1] for production-level requirements.

[1]: /observability_pipelines/legacy/architecture/
{{% /tab %}}
{{% tab "Google GKE" %}}
To run the Worker on your Kubernetes nodes, you need a minimum of two nodes with one CPU and 512MB RAM available. Datadog recommends creating a separate node pool for the Workers, which is also the recommended configuration for production deployments.

See [Best Practices for OPW Aggregator Architecture][1] for production-level requirements.

[1]: /observability_pipelines/legacy/architecture/
{{% /tab %}}
{{% tab "APT-based Linux" %}}
There are no provider-specific requirements for APT-based Linux.
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
There are no provider-specific requirements for RPM-based Linux.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
In order to run the Worker in your AWS account, you need administrative access to that account. Collect the following pieces of information to run the Worker instances:
* インスタンスが実行される VPC ID。
* インスタンスが実行されるサブネット ID。
* VPC が置かれている AWS リージョン。
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-warning">CloudFormation installs only support Remote Configuration at this time.</div>
<div class="alert alert-danger">Only use CloudFormation installs for non-production-level workloads.</div>

In order to run the Worker in your AWS account, you need administrative access to that account. Collect the following pieces of information to run the Worker instances:
* インスタンスが実行される VPC ID。
* インスタンスが実行されるサブネット ID。
* VPC が置かれている AWS リージョン。
{{% /tab %}}
{{< /tabs >}}

## Splunk インデックスの設定

<div class="alert alert-info">Observability Pipelines supports acknowledgments when you enable the <strong>Enable Indexer Acknowledgments</strong> setting on the input.</div>

To receive logs from the Observability Pipelines Worker, you must provision a HEC input and HEC token on the index.


1. Splunk で、**Settings** > **Data Inputs** に移動します。
2. 新しい HTTP イベントコレクター入力を追加し、名前を割り当てます。
3. ログを送信するインデックスを選択します。

After you add the input, Splunk creates a token for you. The token is typically in a UUID format. In the sample configurations provided in later sections in this article, add this token to the configuration so that the Observability Pipelines Worker can authenticate itself.

## Installing the Observability Pipelines Worker

{{< tabs >}}
{{% tab "Docker" %}}

The Observability Pipelines Worker Docker image is published to Docker Hub [here][1].

1. [サンプルパイプラインコンフィギュレーションファイル][2]をダウンロードします。

2. Run the following command to start the Observability Pipelines Worker with Docker:
    ```
    docker run -i -e DD_API_KEY=<API_KEY> \
      -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
      -e DD_SITE=<SITE> \
      -e SPLUNK_HEC_ENDPOINT=<SPLUNK_URL> \
      -e SPLUNK_TOKEN=<SPLUNK_TOKEN> \
      -p 8088:8088 \
      -v ./pipeline.yaml:/etc/observability-pipelines-worker/pipeline.yaml:ro \
      datadog/observability-pipelines-worker run
    ```
   Replace `<API_KEY>` with your Datadog API key, `<PIPELINES_ID>` with your Observability Pipelines configuration ID, and `<SITE>` with {{< region-param key="dd_site" code="true" >}}. Be sure to also update `SPLUNK_HEC_ENDPOINT` and `SPLUNK_TOKEN` with values that match the Splunk deployment you created in [Setting up the Splunk Index](#setting-up-the-splunk-index). `./pipeline.yaml` must be the relative or absolute path to the configuration you downloaded in Step 1. 

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[2]: /resources/yaml/observability_pipelines/splunk/pipeline.yaml
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. Download the [Helm chart values file][1] for AWS EKS.

2. Helm チャートで、`datadog.apiKey` と `datadog.pipelineId` をそれぞれの値に置き換え、`<site>` を {{< region-param key="dd_site" code="true" >}} に置き換えます。
    ```yaml
    datadog:
      apiKey: "<datadog_api_key>"
      pipelineId: "<observability_pipelines_configuration_id>"
      site: "<site>"
    ```

3. `SPLUNK_HEC_ENDPOINT` と `SPLUNK_HEC_TOKEN` の値を、[Splunk インデックスの設定](#setting-up-the-splunk-index)で作成したトークンを含め、Splunk のデプロイメントに合わせて置き換えます。
    ```yaml
    env:
      - name: SPLUNK_HEC_ENDPOINT
        value: <https://your.splunk.index:8088/>
      - name: SPLUNK_TOKEN
        value: <a_random_token_usually_a_uuid>
    ```

4. 以下のコマンドでクラスターに Helm チャートをインストールします。

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

[1]: /resources/yaml/observability_pipelines/splunk/aws_eks.yaml
{{% /tab %}}
{{% tab "Azure AKS" %}}
1. Download the [Helm chart values file][1] for Azure AKS.

2. Helm チャートで、`datadog.apiKey` と `datadog.pipelineId` をそれぞれの値に置き換え、`<site>` を {{< region-param key="dd_site" code="true" >}} に置き換えます。
    ```yaml
    datadog:
      apiKey: "<datadog_api_key>"
      pipelineId: "<observability_pipelines_configuration_id>"
      site: "<site>"
    ```

3. `SPLUNK_HEC_ENDPOINT` と `SPLUNK_HEC_TOKEN` の値を、[Splunk インデックスの設定](#setting-up-the-splunk-index)で作成したトークンを含め、Splunk のデプロイメントに合わせて置き換えます。
    ```yaml
    env:
      - name: SPLUNK_HEC_ENDPOINT
        value: <https://your.splunk.index:8088/>
      - name: SPLUNK_TOKEN
        value: <a_random_token_usually_a_uuid>
    ```

4. 以下のコマンドでクラスターに Helm チャートをインストールします。

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    ```shell
    helm repo update
    ```
    ```shell
    helm upgrade --install \
      opw datadog/observability-pipelines-worker \
      -f azure_aks.yaml
    ```

[1]: /resources/yaml/observability_pipelines/splunk/azure_aks.yaml
{{% /tab %}}
{{% tab "Google GKE" %}}
1. Download the [Helm chart values file][1] for Google GKE.

2. Helm チャートで、`datadog.apiKey` と `datadog.pipelineId` をそれぞれの値に置き換え、`<site>` を {{< region-param key="dd_site" code="true" >}} に置き換えます。
    ```yaml
    datadog:
      apiKey: "<datadog_api_key>"
      pipelineId: "<observability_pipelines_configuration_id>"
      site: "<site>"
    ```

3. `SPLUNK_HEC_ENDPOINT` と `SPLUNK_HEC_TOKEN` の値を、[Splunk インデックスの設定](#setting-up-the-splunk-index)で作成したトークンを含め、Splunk のデプロイメントに合わせて置き換えます。
    ```yaml
    env:
      - name: SPLUNK_HEC_ENDPOINT
        value: <https://your.splunk.index:8088/>
      - name: SPLUNK_TOKEN
        value: <a_random_token_usually_a_uuid>
    ```

4. 以下のコマンドでクラスターに Helm チャートをインストールします。

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    ```shell
    helm repo update
    ```
    ```shell
    helm upgrade --install \
      opw datadog/observability-pipelines-worker \
      -f google_gke.yaml
    ```

[1]: /resources/yaml/observability_pipelines/splunk/google_gke.yaml
{{% /tab %}}
{{% tab "APT ベースの Linux" %}}
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

4. Add your keys, site ({{< region-param key="dd_site" code="true" >}}), and Splunk information to the Worker's environment variables:

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    SPLUNK_HEC_ENDPOINT=<SPLUNK_URL>
    SPLUNK_TOKEN=<SPLUNK_TOKEN>
    EOF
    ```

5. ホストの `/etc/observability-pipelines-worker/pipeline.yaml` に[サンプルコンフィギュレーションファイル][1]をダウンロードします。

6. Start the worker:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/splunk/pipeline.yaml
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
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
    EOF
    ```

   **注:** RHEL 8.1 または CentOS 8.1 を使用している場合は、上記の構成で `repo_gpgcheck=1` の代わりに `repo_gpgcheck=0` を使用してください。

2. Update your packages and install the Worker:

    ```
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```

3. Add your keys, site ({{< region-param key="dd_site" code="true" >}}), and Splunk information to the Worker's environment variables:

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    SPLUNK_HEC_ENDPOINT=<SPLUNK_URL>
    SPLUNK_TOKEN=<SPLUNK_TOKEN>
    EOF
    ```

4. ホストの `/etc/observability-pipelines-worker/pipeline.yaml` に[サンプルコンフィギュレーションファイル][1]をダウンロードします。

5. Start the worker:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/splunk/pipeline.yaml
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
Setup the Worker module in your existing Terraform using this sample configuration. Update the values in `vpc-id`, `subnet-ids`, and `region` to match your AWS deployment. Update the values in `datadog-api-key` and `pipeline-id` to match your pipeline.

```
module "opw" {
    source     = "git::https://github.com/DataDog/opw-terraform//aws"
    vpc-id     = "{VPC ID}"
    subnet-ids = ["{SUBNET ID 1}", "{SUBNET ID 2}"]
    region     = "{REGION}"

    datadog-api-key = "{DATADOG API KEY}"
    pipeline-id = "{OP PIPELINE ID}"
    environment = {
      "SPLUNK_TOKEN": "<SPLUNK TOKEN>",
    }
    pipeline-config = <<EOT
sources:
  splunk_receiver:
    type: splunk_hec
    address: 0.0.0.0:8088
    valid_tokens:
        - $${SPLUNK_TOKEN}

transforms:
  ## This is a placeholder for your own remap (or other transform)
  ## steps with tags set up. Datadog recommends these tag assignments.
  ## They show which data has been moved over to OP and what still needs
  ## to be moved.
  LOGS_YOUR_STEPS:
    type: remap
    inputs:
      - splunk_receiver
    source: |
      .sender = "observability_pipelines_worker"
      .opw_aggregator = get_hostname!()

## This buffer configuration is split into 144GB buffers for both of the Datadog and Splunk sinks.
##
## This should work for the vast majority of OP Worker deployments and should rarely
## need to be adjusted. If you do change it, be sure to update the size the `ebs-drive-size-gb` parameter.
sinks:
  datadog_logs:
    type: datadog_logs
    inputs:
      - LOGS_YOUR_STEPS
    default_api_key: "$${DD_API_KEY}"
    compression: gzip
    buffer:
        type: disk
        max_size: 154618822656
  splunk_logs:
    type: splunk_hec_logs
    inputs:
      - LOGS_YOUR_STEPS
    endpoint: <SPLUNK HEC ENDPOINT>
    default_token: $${SPLUNK_TOKEN}
    encoding:
      codec: json
    buffer:
        type: disk
        max_size: 154618822656
EOT
}
```
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-danger">Only use CloudFormation installs for non-production-level workloads.</div>

To install the Worker in your AWS Account, use the CloudFormation template to create a Stack:

  1. Download the [CloudFormation template][1] for the Worker.

  2. In the **CloudFormation console**, click **Create stack**, and select the **With new resources (standard)** option.

  3. Make sure that the **Template is ready** option is selected. Click **Choose file** and add the CloudFormation template file you downloaded earlier. Click **Next**.

  4. Enter a name for the stack in **Specify stack details**.

  5. Fill in the parameters for the CloudFormation template. A few require special attention:

      * For `APIKey` and `PipelineID`, provide the key and ID that you gathered earlier in the Prerequisites section.

      * For the `SplunkToken`, provide the token you created earlier on your Splunk index.

     * For the `VPCID` and `SubnetIDs`, provide the subnets and VPC you chose earlier.

      * All other parameters are set to reasonable defaults for a Worker deployment but you can adjust them for your use case as needed.

  6. **Next** をクリックします。

  7. Review and make sure the parameters are as expected. Click the necessary permissions checkboxes for IAM, and click **Submit** to create the Stack.

CloudFormation handles the installation at this point; the Worker instances are launched and they automatically download the necessary software and start running.

[1]: /resources/yaml/observability_pipelines/cloudformation/splunk.yaml
{{% /tab %}}
{{< /tabs >}}

### ロードバランシング

{{< tabs >}}
{{% tab "Docker" %}}
本番環境向けのセットアップは Docker の説明には含まれていません。代わりに、コンテナ化環境でのロードバランシングに関するあなたの会社の基準を参照してください。ローカルマシンでテストする場合は、ロードバランサーの構成は不要です。
{{% /tab %}}
{{% tab "AWS EKS" %}}
クラウドプロバイダーが提供するロードバランサーを使用してください。
ロードバランサーはデフォルトの Helm セットアップで構成されているオートスケーリングイベントに基づいて調整されます。ロードバランサーは内部向けなので、あなたのネットワーク内でのみアクセス可能です。

既存のコレクターを構成するときに、Helm から与えられたロードバランサーの URL を使用します。

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
{{% tab "Azure AKS" %}}
クラウドプロバイダーが提供するロードバランサーを使用します。
これらは、デフォルトの Helm セットアップで構成されているオートスケーリングイベントに基づいて調整されます。ロードバランサーは内部向けなので、あなたのネットワーク内からのみアクセス可能です。

既存のコレクターを構成するときに、Helm から与えられたロードバランサーの URL を使用します。

See [Capacity Planning and Scaling][1] for load balancer recommendations when scaling the Worker.

#### クロスアベイラビリティゾーンロードバランシング
提供されている Helm の構成は、ロードバランシングの簡素化を目指していますが、クロス AZ (アヴェイラビリティーゾーン) トラフィックの潜在的な価格的影響を考慮する必要があります。可能な限り、サンプルは複数のクロス AZ ホップが起こりうる状況を避けるよう努めています。

[1]: /observability_pipelines/legacy/architecture/capacity_planning_scaling/
{{% /tab %}}
{{% tab "Google GKE" %}}
Use the load balancers provided by your cloud provider.
They adjust based on autoscaling events that the default Helm setup is configured for. The load balancers are internal-facing,
so they are only accessible inside your network.

既存のコレクターを構成するときに、Helm から与えられたロードバランサーの URL を使用します。

See [Capacity Planning and Scaling][1] for load balancer recommendations when scaling the Worker.

#### クロスアベイラビリティゾーンロードバランシング
提供されている Helm の構成は、ロードバランシングの簡素化を目指していますが、クロス AZ (アヴェイラビリティーゾーン) トラフィックの潜在的な価格的影響を考慮する必要があります。可能な限り、サンプルは複数のクロス AZ ホップが起こりうる状況を避けるよう努めています。

Global Access is enabled by default since that is likely required for use in a shared tools cluster.

[1]: /observability_pipelines/legacy/architecture/capacity_planning_scaling/
{{% /tab %}}
{{% tab "APT-based Linux" %}}
No built-in support for load-balancing is provided, given the single-machine nature of the installation. You will need to provision your own load balancers using whatever your company's standard is.
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
No built-in support for load-balancing is provided, given the single-machine nature of the installation. You will need to provision your own load balancers using whatever your company's standard is.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
An NLB is provisioned by the Terraform module, and provisioned to point at the instances. Its DNS address is returned in the `lb-dns` output in Terraform.
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-danger">Only use CloudFormation installs for non-production-level workloads.</div>

An NLB is provisioned by the CloudFormation template, and is configured to point at the AutoScaling Group. Its DNS address is returned in the `LoadBalancerDNS` CloudFormation output.
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
{{% tab "Azure AKS" %}}
For Azure AKS, Datadog recommends using the `default` (also known as `managed-csi`) disks.
{{% /tab %}}
{{% tab "Google GKE" %}}
For Google GKE, Datadog recommends using the `premium-rwo` drive class because it is backed by SSDs. The HDD-backed class, `standard-rwo`, might not provide enough write performance for the buffers to be useful.
{{% /tab %}}
{{% tab "APT-based Linux" %}}
By default, the Observability Pipelines Worker's data directory is set to `/var/lib/observability-pipelines-worker` - if you are using the sample configuration, you should ensure that this has at least 288GB of space available for buffering.

Where possible, it is recommended to have a separate SSD mounted at that location.
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
By default, the Observability Pipelines Worker's data directory is set to `/var/lib/observability-pipelines-worker` - if you are using the sample configuration, you should ensure that this has at least 288GB of space available for buffering.

Where possible, it is recommended to have a separate SSD mounted at that location.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
By default, a 288GB EBS drive is allocated to each instance, and the sample configuration above is set to use that for buffering.
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-danger">EBS drives created by this CloudFormation template have their lifecycle tied to the instance they are created with. <strong>This leads to data loss if an instance is terminated, for example by the AutoScaling Group.</strong> For this reason, only use CloudFormation installs for non-production-level workloads.</div>

By default, a 288GB EBS drive is allocated to each instance, and is auto-mounted and formatted upon instance boot.
{{% /tab %}}
{{< /tabs >}}

## Connect Splunk forwarders to the Observability Pipelines Worker
After you install and configure the Observability Pipelines Worker to send logs to your Splunk index, you must update your existing collectors to point to the Worker.

You can update most Splunk collectors with the IP/URL of the host (or load balancer) associated with the Observability Pipelines Worker.

For Terraform installs, the `lb-dns` output provides the necessary value. For CloudFormation installs, the `LoadBalancerDNS` CloudFormation output has the correct URL to use.

Additionally, you must update the Splunk collector with the HEC token you wish to use for authentication, so it matches the one specified in the Observability Pipelines Worker's list of `valid_tokens` in `pipeline.yaml`.

```
# サンプル pipeline.yaml splunk_receiver source
sources:
  splunk_receiver:
    type: splunk_hec
    address: 0.0.0.0:8088
    valid_tokens:
        - ${SPLUNK_TOKEN}
```
提供されているサンプル構成では、Splunk のソースと宛先の両方で同じ HEC トークンが使用されています。

At this point, your logs should be going to the Worker and be available for processing. The next section goes through what process is included by default, and the additional options that are available.

## データを活用する
The sample Observability Pipelines configuration does the following:
- Collects logs being sent from the Splunk forwarder to the Observability Pipelines Worker. 
- Transforms logs by adding tags to data that has come through the Observability Pipelines Worker. This helps determine what traffic still needs to be shifted over to the Worker as you update your clusters. These tags also show you how logs are being routed through the load balancer, in case there are imbalances.
- Splunk と Datadog の両方にデータをデュアルシッピングすることで、ログをルーティングする。

## 参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/legacy/
[2]: /account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/observability-pipelines/create
