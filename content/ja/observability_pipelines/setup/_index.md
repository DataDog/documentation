---
aliases:
- /ja/getting_started/observability_pipelines/
- /ja/observability_pipelines/installation/
further_reading:
- link: /observability_pipelines/working_with_data/
  tag: ドキュメント
  text: 観測可能性パイプラインのデータの操作
- link: /observability_pipelines/production_deployment_overview/
  tag: ドキュメント
  text: 観測可能性パイプラインワーカーのデプロイ設計と原則
- link: /observability_pipelines/architecture/
  tag: ドキュメント
  text: 観測可能性パイプラインワーカーの本番デプロイ設計と原則
- link: https://dtdg.co/d22op
  tag: ラーニングセンター
  text: 観測可能性パイプラインによる安心・安全なローカル処理
kind: documentation
title: 観測可能性パイプラインワーカーの設定
type: multi-code-lang
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines は、US1-FED Datadog サイトではご利用いただけません。</div>
{{< /site-region >}}

## 概要

[Observability Pipelines Worker][1] は、ログをあらゆるソースからあらゆる宛先に収集、処理、ルーティングすることができます。Datadog を使用することで、Observability Pipelines Worker のデプロイメントを大規模に構築・管理することができます。

観測可能性パイプラインワーカーを使い始めるには、いくつかの方法があります。

- [クイックスタート](#quickstart): デモデータを出力するシンプルなパイプラインを備えたワーカーをインストールすれば、すぐに使い始められます。
- [Datadog セットアップガイド][2]: Datadog Agent からデータを受信し、Datadog へルーティングするためのすぐに使えるパイプラインを備えたワーカーをインストールします。
- [Datadog アーカイブセットアップガイド][3]: Datadog Agent からデータを受信し、Datadog と S3 へルーティングするためのすぐに使えるパイプラインを備えたワーカーをインストールします。
- [Splunk セットアップガイド][4]: Splunk HEC からデータを受信し、Splunk と Datadog の両方へルーティングするためのすぐに使えるパイプラインを備えたワーカーをインストールします。

このドキュメントでは、クイックスタートのインストール手順を説明し、次のステップのためのリソースを提供します。このソフトウェアの使用および運用には、[エンドユーザーライセンス契約][5]が適用されます。

## デプロイメントモード

{{% op-deployment-modes %}}

## 前提条件

観測可能性パイプラインワーカーをインストールするには、以下が必要です。

- 有効な [Datadog API キー][7]。
- パイプライン ID。

新しい API キーとパイプラインを生成するには

1. [観測可能性パイプライン][6]に移動します。
2. **New Pipeline** をクリックします。
3. パイプラインの名前を入力します。
4. **Next** をクリックします。
4. 希望するテンプレートを選択し、指示に従います。

## Quickstart

以下の手順に従ってワーカーをインストールし、デモデータを使用するサンプルパイプライン構成をデプロイします。

### 観測可能性パイプラインワーカーのインストール

{{< tabs >}}
{{% tab "Docker" %}}

Observability Pipelines Worker Docker イメージは[こちら][1]の Docker Hub に公開されています。

1. [サンプルのパイプラインコンフィギュレーションファイル][2]をダウンロードします。この構成は、デモデータを出力し、データをパースして構造化し、それをコンソールと Datadog に送信します。サンプル構成で使用されているソース、トランスフォーム、シンクの詳細については、[構成][3]を参照してください。

2. 以下のコマンドを実行して、Docker でObservability Pipelines Worker を起動します。

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
[3]: /ja/observability_pipelines/configurations/
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. AWS EKS 用の [Helm チャート値ファイル][1]をダウンロードします。サンプル構成で使用されているソース、トランスフォーム、シンクの詳細については、[構成][2]を参照してください。

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
[2]: /ja/observability_pipelines/configurations/
{{% /tab %}}
{{% tab "Azure AKS" %}}
1. Azure AKS 用の [Helm チャート値ファイル][1]をダウンロードします。サンプル構成で使用されているソース、トランスフォーム、シンクの詳細については、[構成][2]を参照してください。

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
[2]: /ja/observability_pipelines/configurations/
{{% /tab %}}
{{% tab "Google GKE" %}}
1. Google GKE 用の [Helm チャート値ファイル][1]をダウンロードします。サンプル構成で使用されているソース、トランスフォーム、シンクの詳細については、[構成][2]を参照してください。

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
[2]: /ja/observability_pipelines/configurations/
{{% /tab %}}
{{% tab "APT ベースの Linux" %}}

1 行のインストールスクリプトまたは手動でワーカーをインストールします。
#### 1 行のインストールスクリプト

1. 1 行のインストールコマンドを実行して、ワーカーをインストールします。`<DD_API_KEY>` を Datadog API キー、`<PIPELINES_ID>` を観測可能性パイプライン ID、`<SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます。

    ```
    DD_API_KEY=<DD_API_KEY> DD_OP_PIPELINE_ID=<PIPELINES_ID> DD_SITE=<SITE> bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_op_worker1.sh)"
    ```

2. [サンプルのコンフィギュレーションファイル][1]をホストの `/etc/observability-pipelines-worker/pipeline.yaml` にダウンロードします。サンプル構成で使用されているソース、トランスフォーム、シンクの詳細については、[構成][2]を参照してください。

3. Worker を起動します。

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

3. 以下のコマンドを実行し、ローカルの `apt` リポジトリを更新し、Worker をインストールします。

    ```
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```

4. キーとサイト ({{< region-param key="dd_site" code="true" >}}) を Worker の環境変数に追加します。

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
[2]: /ja/observability_pipelines/configurations/
{{% /tab %}}
{{% tab "RPM ベースの Linux" %}}

1 行のインストールスクリプトまたは手動でワーカーをインストールします。

#### 1 行のインストールスクリプト

1. 1 行のインストールコマンドを実行して、ワーカーをインストールします。`<DD_API_KEY>` を Datadog API キー、`<PIPELINES_ID>` を観測可能性パイプライン ID、`<SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます。

    ```
    DD_API_KEY=<DD_API_KEY> DD_OP_PIPELINE_ID=<PIPELINES_ID> DD_SITE=<SITE> bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_op_worker1.sh)"
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

2. パッケージを更新し、Worker をインストールします。

    ```
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```

3. キーとサイト ({{< region-param key="dd_site" code="true" >}}) を Worker の環境変数に追加します。

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
[2]: /ja/observability_pipelines/configurations/
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

1. [サンプル構成][1]をダウンロードします。
1. サンプル構成を使って、既存の Terraform に Worker モジュールをセットアップします。必ず、構成内の `vpc-id`、`subnet-ids`、`region` の値を AWS のデプロイに合わせて更新します。また、パイプラインに合わせて `datadog-api-key` と `pipeline-id` の値も更新します。

サンプル構成で使用されているソース、トランスフォーム、シンクの詳細については、[構成][2]を参照してください。

[1]: /resources/yaml/observability_pipelines/quickstart/terraform_opw.tf
[2]: /ja/observability_pipelines/configurations/
{{% /tab %}}
{{< /tabs >}}

データの変換については、[データを活用する][8]を参照してください。

## デプロイメントモードの更新

{{% op-updating-deployment-modes %}}

## 次のステップ

クイックスタートでは、ワーカーのインストールとサンプルパイプライン構成のデプロイについて説明しました。データを受信して Datadog Agent から Datadog へ、または Splunk HEC から Splunk と Datadog へルーティングするためのワーカーのインストール方法については、特定のユースケースを選択してください。

{{< partial name="observability_pipelines/use_cases.html" >}}

複数のワーカーのデプロイとスケーリングに関する推奨事項については

- Observability Pipelines のアーキテクチャを設計する際に考慮すべき点については、[デプロイメントの設計と原則][9]を参照してください。
- [OP ワーカーのアグリゲーターアーキテクチャのベストプラクティス][10]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/#what-is-observability-pipelines-and-the-observability-pipelines-worker
[2]: /ja/observability_pipelines/setup/datadog/
[3]: /ja/observability_pipelines/setup/datadog_with_archiving/
[4]: /ja/observability_pipelines/setup/splunk/
[5]: https://www.datadoghq.com/legal/eula/
[6]: https://app.datadoghq.com/observability-pipelines
[7]: /ja/account_management/api-app-keys/#api-keys
[8]: /ja/observability_pipelines/working_with_data/
[9]: /ja/observability_pipelines/production_deployment_overview/
[10]: /ja/observability_pipelines/architecture/