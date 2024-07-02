---
title: (LEGACY) Set Up the Observability Pipelines Worker
type: multi-code-lang
aliases:
  - /getting_started/observability_pipelines/
  - /observability_pipelines/installation/
  - /observability_pipelines/setup/
further_reading:
  - link: /observability_pipelines/legacy/working_with_data/
    tag: Documentation
    text: Working with data in Observability Pipelines
  - link: /observability_pipelines/legacy/production_deployment_overview/
    tag: Documentation
    text: Deployment Design and Principles for the Observability Pipelines Worker
  - link: /observability_pipelines/legacy/architecture/
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

観測可能性パイプラインワーカーを使い始めるには、いくつかの方法があります。

- [クイックスタート](#quickstart): デモデータを出力するシンプルなパイプラインを備えたワーカーをインストールすれば、すぐに使い始められます。
- [Datadog セットアップガイド][2]: Datadog Agent からデータを受信し、Datadog へルーティングするためのすぐに使えるパイプラインを備えたワーカーをインストールします。
- [Datadog archiving setup guide][3]: Install the Worker with an out-of-the-box pipeline for receiving and routing data from your Datadog Agents to Datadog and S3.
- [Splunk setup guide][4]: Install the Worker with an out-of-the-box pipeline for receiving and routing data from Splunk HEC to both Splunk and Datadog.

このドキュメントでは、クイックスタートのインストール手順を説明し、次のステップのためのリソースを提供します。このソフトウェアの使用および運用には、[エンドユーザーライセンス契約][5]が適用されます。

## Deployment Modes

{{% op-deployment-modes %}}

## 前提条件

観測可能性パイプラインワーカーをインストールするには、以下が必要です。

- 有効な [Datadog API キー][7]。
- パイプライン ID。

新しい API キーとパイプラインを生成するには

1. Navigate to [Observability Pipelines][6].
2. **New Pipeline** をクリックします。
3. パイプラインの名前を入力します。
4. **Next** をクリックします。
4. 希望するテンプレートを選択し、指示に従います。

## Quickstart

以下の手順に従ってワーカーをインストールし、デモデータを使用するサンプルパイプライン構成をデプロイします。

### 観測可能性パイプラインワーカーのインストール

{{< tabs >}}
{{% tab "Docker" %}}

The Observability Pipelines Worker Docker image is published to Docker Hub [here][1].

1. [サンプルのパイプラインコンフィギュレーションファイル][2]をダウンロードします。この構成は、デモデータを出力し、データをパースして構造化し、それをコンソールと Datadog に送信します。サンプル構成で使用されているソース、トランスフォーム、シンクの詳細については、[構成][3]を参照してください。

2. Run the following command to start the Observability Pipelines Worker with Docker:

    ```shell
    docker run -i -e DD_API_KEY=<API_KEY> \
      -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
      -e DD_SITE=<SITE> \
      -p 8282:8282 \
      -v ./pipeline.yaml:/etc/observability-pipelines-worker/pipeline.yaml:ro \
      datadog/observability-pipelines-worker run
    ```

   `<API_KEY>` は Datadog API キー、`<PIPELINES_ID>` は観測可能性パイプライン構成 ID、`<SITE>` は {{< region-param key="dd_site" code="true" >}} に置き換えてください。**注**: `./pipeline.yaml` には、ステップ 1 でダウンロードした構成の相対パスまたは絶対パスを指定します。

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[2]: /resources/yaml/observability_pipelines/quickstart/pipeline.yaml
[3]: /observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. Download the [Helm chart values file][1] for AWS EKS. See [Configurations][2] for more information about the source, transform, and sink used in the sample configuration.

2. Helm チャートで、`datadog.apiKey` と `datadog.pipelineId` の値をパイプラインに合わせて置き換え、`site` の値には {{< region-param key="dd_site" code="true" >}} を使用します。その後、以下のコマンドでクラスターにインストールします。

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

[1]: /resources/yaml/observability_pipelines/quickstart/aws_eks.yaml
[2]: /observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "Azure AKS" %}}
1. Download the [Helm chart values file][1] for Azure AKS. See [Configurations][2] for more information about the source, transform, and sink used in the sample configuration.

2. Helm チャートで、`datadog.apiKey` と `datadog.pipelineId` の値をパイプラインに合わせて置き換え、`site` の値には {{< region-param key="dd_site" code="true" >}} を使用します。その後、以下のコマンドでクラスターにインストールします。

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

[1]: /resources/yaml/observability_pipelines/quickstart/azure_aks.yaml
[2]: /observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "Google GKE" %}}
1. Download the [Helm chart values file][1] for Google GKE. See [Configurations][2] for more information about the source, transform, and sink used in the sample configuration.

2. Helm チャートで、`datadog.apiKey` と `datadog.pipelineId` の値をパイプラインに合わせて置き換え、`site` の値には {{< region-param key="dd_site" code="true" >}} を使用します。その後、以下のコマンドでクラスターにインストールします。

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

[1]: /resources/yaml/observability_pipelines/quickstart/google_gke.yaml
[2]: /observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "APT ベースの Linux" %}}

1 行のインストールスクリプトまたは手動でワーカーをインストールします。
#### 1 行のインストールスクリプト

1. 1 行のインストールコマンドを実行して、ワーカーをインストールします。`<DD_API_KEY>` を Datadog API キー、`<PIPELINES_ID>` を観測可能性パイプライン ID、`<SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます。

    ```
    DD_API_KEY=<DD_API_KEY> DD_OP_PIPELINE_ID=<PIPELINES_ID> DD_SITE=<SITE> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_op_worker1.sh)"
    ```

2. [サンプルのコンフィギュレーションファイル][1]をホストの `/etc/observability-pipelines-worker/pipeline.yaml` にダウンロードします。サンプル構成で使用されているソース、トランスフォーム、シンクの詳細については、[構成][2]を参照してください。

3. Start the worker:

    ```
    sudo systemctl restart observability-pipelines-worker
    ```

#### 手動インストール

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

4. Add your keys and the site ({{< region-param key="dd_site" code="true" >}}) to the Worker's environment variables:

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    EOF
    ```

5. ホストの `/etc/observability-pipelines-worker/pipeline.yaml` に[サンプルコンフィギュレーションファイル][1]をダウンロードします。

6. ワーカーを起動します。

    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
[2]: /observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "RPM ベースの Linux" %}}

1 行のインストールスクリプトまたは手動でワーカーをインストールします。

#### 1 行のインストールスクリプト

1. 1 行のインストールコマンドを実行して、ワーカーをインストールします。`<DD_API_KEY>` を Datadog API キー、`<PIPELINES_ID>` を観測可能性パイプライン ID、`<SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます。

    ```
    DD_API_KEY=<DD_API_KEY> DD_OP_PIPELINE_ID=<PIPELINES_ID> DD_SITE=<SITE> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_op_worker1.sh)"
    ```

2. [サンプルのコンフィギュレーションファイル][1]をホストの `/etc/observability-pipelines-worker/pipeline.yaml` にダウンロードします。サンプル構成で使用されているソース、トランスフォーム、シンクの詳細については、[構成][2]を参照してください。

3. 以下のコマンドを実行してワーカーを起動します。

    ```
    sudo systemctl restart observability-pipelines-worker
    ```

#### 手動インストール

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

3. Add your keys and the site ({{< region-param key="dd_site" code="true" >}}) to the Worker's environment variables:

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    EOF
    ```

4. [サンプルのコンフィギュレーションファイル][1]をホストの `/etc/observability-pipelines-worker/pipeline.yaml` にダウンロードします。サンプル構成で使用されているソース、トランスフォーム、シンクの詳細については、[構成][2]を参照してください。

5. 以下のコマンドを実行してワーカーを起動します。
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/quickstart/pipeline.yaml
[2]: /observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

1. [サンプル構成][1]をダウンロードします。
1. サンプル構成を使って、既存の Terraform に Worker モジュールをセットアップします。必ず、構成内の `vpc-id`、`subnet-ids`、`region` の値を AWS のデプロイに合わせて更新します。また、パイプラインに合わせて `datadog-api-key` と `pipeline-id` の値も更新します。

サンプル構成で使用されているソース、トランスフォーム、シンクの詳細については、[構成][2]を参照してください。

[1]: /resources/yaml/observability_pipelines/quickstart/terraform_opw.tf
[2]: /observability_pipelines/legacy/configurations/
{{% /tab %}}
{{< /tabs >}}

データの変換については、[データを活用する][8]を参照してください。

## Updating deployment modes

{{% op-updating-deployment-modes %}}

## 次のステップ

クイックスタートでは、ワーカーのインストールとサンプルパイプライン構成のデプロイについて説明しました。データを受信して Datadog Agent から Datadog へ、または Splunk HEC から Splunk と Datadog へルーティングするためのワーカーのインストール方法については、特定のユースケースを選択してください。

{{< partial name="observability_pipelines/use_cases.html" >}}

For recommendations on deploying and scaling multiple Workers:

- Observability Pipelines のアーキテクチャを設計する際に考慮すべき点については、[デプロイメントの設計と原則][9]を参照してください。
- [OP ワーカーのアグリゲーターアーキテクチャのベストプラクティス][10]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/legacy/#what-is-observability-pipelines-and-the-observability-pipelines-worker
[2]: /observability_pipelines/legacy/setup/datadog/
[3]: /observability_pipelines/legacy/setup/datadog_with_archiving/
[4]: /observability_pipelines/legacy/setup/splunk/
[5]: https://www.datadoghq.com/legal/eula/
[6]: https://app.datadoghq.com/observability-pipelines
[7]: /account_management/api-app-keys/#api-keys
[8]: /observability_pipelines/legacy/working_with_data/
[9]: /observability_pipelines/legacy/production_deployment_overview/
[10]: /observability_pipelines/legacy/architecture/
