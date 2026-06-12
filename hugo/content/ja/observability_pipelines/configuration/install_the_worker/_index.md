---
aliases:
- /ja/observability_pipelines/install_the_worker/
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
  tag: ドキュメント
  text: 高度な Worker 構成
- link: /observability_pipelines/monitoring_and_maintenance/worker_cli_commands/
  tag: ドキュメント
  text: Worker CLI コマンド
- link: /observability_pipelines/guide/environment_variables/
  tag: ドキュメント
  text: ソース、プロセッサ、コンポーネントの環境変数
- link: /observability_pipelines/configuration/set_up_pipelines/
  tag: ドキュメント
  text: パイプラインをセットアップ
title: ワーカーをインストールする
---

## 概要

Observability Pipelines Worker は、お使いの環境で動作し、ログを一元的に収集、処理、ルーティングするソフトウェアです。

**注**: プロキシーを使用している場合は、[Bootstrap オプション][1] の `proxy` オプションを参照してください。

## ワーカーをインストールする

パイプラインを [API][6] または [Terraform][8] でセットアップした場合は、Worker のインストール方法については [API または Terraform のパイプライン セットアップ](#api-or-terraform-pipeline-setup) を参照してください。

UI でパイプラインをセットアップした場合は、Worker のインストール方法については [Pipelines UI セットアップ](#pipeline-ui-setup) を参照してください。

### API または Terraform のパイプライン セットアップ

API または Terraform を使用してパイプラインをセットアップした後は、プラットフォーム向けに Worker をインストールするため、以下の手順に従ってください。

{{< tabs >}}
{{% tab "Docker" %}}

以下のコマンドを実行して Worker をインストールします。

```shell
docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
    -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
    -e DD_SITE=<DATADOG_SITE> \
    -e <SOURCE_ENV_VARIABLE> \
    -e <DESTINATION_ENV_VARIABLE> \
    -p 8088:8088 \
    datadog/observability-pipelines-worker run
```

以下の値にプレースホルダーを置き換えてください:
- `<DATADOG_API_KEY>`: Datadog API キー。
    - **注**: API キーは [Remote Configuration を有効化][1] している必要があります。
- `<PIPELINE_ID>`: パイプラインの ID。
- `<DATADOG_SITE>`: [Datadog サイト][2]。
- `<SOURCE_ENV_VARIABLE>`: パイプラインで使用しているソースに必要な環境変数。
    - 例: `DD_OP_SOURCE_DATADOG_AGENT_ADDRESS=0.0.0.0:8282`
    - ソース用の環境変数の一覧は [環境変数][3] を参照してください。
- `<DESTINATION_ENV_VARIABLE>`: パイプラインで使用している宛先に必要な環境変数。
    - 例: `DD_OP_DESTINATION_SPLUNK_HEC_ENDPOINT_URL=https://hec.splunkcloud.com:8088`
    - 宛先用の環境変数の一覧は [環境変数][3] を参照してください。

**注**: 既定では、`docker run` コマンドは Worker がリッスンしているポートと同じポートを公開します。Docker ホスト上の別のポートに Worker のコンテナ ポートをマッピングする場合は、コマンドの `-p | --publish` オプションを使用します:
```
-p 8282:8088 datadog/observability-pipelines-worker run
```

パイプラインの構成を変更したい場合は、[既存の Pipelines の更新][3] を参照してください。

[1]: https://app.datadoghq.com/organization-settings/remote-config/setup
[2]: /ja/getting_started/site/
[3]: /ja/observability_pipelines/environment_variables/

{{% /tab %}}
{{% tab "Kubernetes" %}}

Observability Pipelines Worker は、主要な Kubernetes ディストリビューションをすべてサポートしています。例:

- Amazon Elastic Kubernetes Service (EKS)
- Azure Kubernetes Service (AKS)
- Google Kubernetes Engine (GKE)
- Red Hat OpenShift
- Rancher

1. [Helm チャート values ファイル][1] をダウンロードします。利用可能な [構成オプションの全一覧][5] も参照してください。
    - マネージド サービスを使用していない場合は、次の手順に進む前に [セルフ ホストおよび セルフ マネージド Kubernetes クラスター](#self-hosted-and-self-managed-kubernetes-clusters) を参照してください。
1. Datadog チャートリポジトリを Helm に追加します。
    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    すでに Datadog チャート リポジトリがある場合は、最新の状態であることを確認するために次のコマンドを実行します:
    ```shell
    helm repo update
    ```
1. 以下のコマンドを実行して Worker をインストールします。

    ```shell
    helm upgrade --install opw \
    -f values.yaml \
    --set datadog.apiKey=<DATADOG_API_KEY> \
    --set datadog.pipelineId=<PIPELINE_ID> \
    --set <SOURCE_ENV_VARIABLES> \
    --set <DESTINATION_ENV_VARIABLES> \
    --set service.ports[0].protocol=TCP,service.ports[0].port=<SERVICE_PORT>,service.ports[0].targetPort=<TARGET_PORT> \
    datadog/observability-pipelines-worker
    ```

    以下の値にプレースホルダーを置き換えてください:

    - `<DATADOG_API_KEY>`: Datadog API キー。
        - **注**: API キーは [Remote Configuration を有効化][3] している必要があります。
    - `<PIPELINE_ID>`: パイプラインの ID。
    - `<SOURCE_ENV_VARIABLE>`: パイプラインで使用しているソースに必要な環境変数。
        - 例: `--set env[0].name=DD_OP_SOURCE_DATADOG_AGENT_ADDRESS,env[0].value='0.0.0.0' \`
        - ソース用の環境変数の一覧は [環境変数][4] を参照してください。
    - `<DESTINATION_ENV_VARIABLE>`: パイプラインで使用している宛先に必要な環境変数。
        - 例: `--set env[1].name=DD_OP_DESTINATION_SPLUNK_HEC_ENDPOINT_URL,env[2].value='https://hec.splunkcloud.com:8088' \`
        - 宛先用の環境変数の一覧は [環境変数][4] を参照してください。

    **注**: デフォルトでは、Kubernetes サービスは、受信ポート`<SERVICE_PORT>` を Worker がリッスンしているポート (`<TARGET_PORT>`) にマッピングします。Worker のポッドポートを Kubernetes サービスの別の受信ポートにマッピングしたい場合は、コマンドで以下の `service.ports[0].port` および `service.ports[0].targetPort` の値を使用します。

    ```
    --set service.ports[0].protocol=TCP,service.ports[0].port=8088,service.ports[0].targetPort=8282
    ```

パイプラインの構成を変更したい場合は、[既存の Pipelines の更新][5] を参照してください。

#### セルフ ホストおよび セルフ マネージド Kubernetes クラスター

セルフ ホストおよび セルフ マネージドの Kubernetes クラスターを実行していて、`topology.kubernetes.io/zone` を使用したノード ラベルでゾーンを定義している場合は、Helm チャート values ファイルをそのまま使用できます。ただし、ラベル `topology.kubernetes.io/zone` を使用していない場合は、使用しているキーに合わせて `values.yaml` ファイル内の `topologyKey` を更新する必要があります。あるいは、ゾーンなしで Kubernetes をインストールしている場合は、`topology.kubernetes.io/zone` セクション全体を削除してください。

[1]: /resources/yaml/observability_pipelines/v2/setup/values.yaml
[2]: /ja/observability_pipelines/update_existing_pipelines
[3]: https://app.datadoghq.com/organization-settings/remote-config/setup
[4]: /ja/observability_pipelines/environment_variables/
[5]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml

{{% /tab %}}
{{% tab "Linux" %}}

<div class="alert alert-warning">RHEL と CentOS では、Observability Pipelines Worker は 8.0 以降をサポートします。</div>

Worker を 1 行のインストール スクリプトでインストールする場合は、以下の手順に従ってください。別の方法については、[Linux で Worker を手動インストール](#manually-install-the-worker-on-linux) を参照してください。

以下の 1 ステップのコマンドを実行して Worker をインストールします。

```bash
DD_API_KEY=<DATADOG_API_KEY> DD_OP_PIPELINE_ID=<PIPELINE_ID> DD_SITE=<DATADOG_SITE> <SOURCE_ENV_VARIABLE> <DESTINATION_ENV_VARIABLE> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_op_worker2.sh)"
```

以下の値でプレースホルダーを置き換えてください:

- `<DATADOG_API_KEY>`: Datadog API キー。
    - **注**: API キーは [Remote Configuration を有効化][1] している必要があります。
- `<PIPELINE_ID>`: パイプラインの ID。
- `<DATADOG_SITE>`: [Datadog サイト][2]。
- `<SOURCE_ENV_VARIABLE>`: パイプラインで使用しているソースに必要な環境変数。
    - 例: `DD_OP_SOURCE_DATADOG_AGENT_ADDRESS=0.0.0.0:8282`
    - ソース用の環境変数の一覧は [環境変数][3] を参照してください。
- `<DESTINATION_ENV_VARIABLE>`: パイプラインで使用している宛先に必要な環境変数。
    - 例: `DD_OP_DESTINATION_SPLUNK_HEC_ENDPOINT_URL=https://hec.splunkcloud.com:8088`
    - 宛先用の環境変数の一覧は [環境変数][3] を参照してください。

**注**: `/etc/default/observability-pipelines-worker` にある Worker の環境変数は、インストール スクリプトを再実行しても更新されません。変更が必要な場合は、ファイルを手動で更新し、Worker を再起動してください。

パイプラインの構成を変更したい場合は、[既存のパイプラインを更新][4] を参照してください。

[1]: https://app.datadoghq.com/organization-settings/remote-config/setup
[2]: /ja/getting_started/site/
[3]: /ja/observability_pipelines/environment_variables/
[4]: /ja/observability_pipelines/update_existing_pipelines

{{% /tab %}}
{{% tab "CloudFormation" %}}

1. ドロップダウンのオプションを 1 つ選択し、パイプラインで予想されるログの量を入力します。
|   オプション   | 説明 |
| ---------- | ----------- |
| Unsure | ログの量を予想できない場合、または Worker をテストしたい場合は、このオプションを使用します。このオプションは、最大 2 つの汎用 `t4g.large` インスタンスで EC2 オートスケーリンググループをプロビジョニングします。|
| 1-5 TB/day | このオプションは、最大 2 つのコンピュート最適化インスタンス `c6g.large` で EC2 オートスケーリンググループをプロビジョニングします。|
| 5-10 TB/day | このオプションは、最低 2 つ、最大 5 つのコンピュート最適化インスタンス `c6g.large` で EC2 オートスケーリンググループをプロビジョニングします。|
| >10 TB/day | Datadog は大規模な本番デプロイでこのオプションを推奨しています。このオプションは、最低 2 つ、最大 10 個のコンピュート最適化インスタンス `c6g.xlarge` で EC2 オートスケーリンググループをプロビジョニングします。|

   **注**: その他のパラメーターは、すべて Worker デプロイメントに適したデフォルト値に設定されていますが、スタックを作成する前に AWS コンソールで必要に応じてユースケースに合わせて調整できます。
1. Worker のインストールに使用する AWS リージョンを選択します。
1. **Select API key** をクリックして、使用する Datadog API キーを選択します。
    - **注**: API キーは [Remote Configuration を有効化][7002] している必要があります。
1. **Launch CloudFormation Template** をクリックして AWS コンソールに移動し、スタックの構成を確認してから起動します。CloudFormation パラメーターが想定通りであることを確認してください。
1. Worker のインストールに使用する VPC とサブネットを選択します。
1. IAM の必要な権限のチェックボックスを見直して確認します。**Submit** をクリックしてスタックを作成します。ここでは、CloudFormation がインストールを処理し、Worker インスタンスが起動され、必要なソフトウェアがダウンロードされ、Worker が自動的に開始します。

パイプラインの構成を変更したい場合は、[既存のパイプラインを更新][1] を参照してください。

[1]: /ja/observability_pipelines/update_existing_pipelines

{{% /tab %}}
{{< /tabs >}}

### Pipeline UI セットアップ

{{< img src="observability_pipelines/install_page.png" alt="UI の Install ページ。インストール プラットフォームを選択するためのドロップダウン メニューと、環境変数を入力するフィールドが表示されています" style="width:100%;" >}}

Pipeline UI の Build ページでソース、宛先、プロセッサを設定した後、Install ページの手順に従って Worker をインストールします。

1. Worker をインストールするプラットフォームを選択します。
1. 該当する場合は、ソースおよび宛先用の [環境変数][7] を入力します。
1. プラットフォームに応じた Worker のインストール手順に従ってください。UI で表示される Worker をインストールするためのコマンドには、関連する環境変数が自動的に設定されています。

{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/install_worker/docker %}}

{{% /tab %}}
{{% tab "Kubernetes" %}}

{{% observability_pipelines/install_worker/kubernetes %}}

{{% /tab %}}
{{% tab "Linux" %}}

<div class="alert alert-danger">RHEL と CentOS では、Observability Pipelines Worker は 8.0 以降をサポートします。</div>

Worker を 1 行のインストール スクリプトでインストールする場合は、以下の手順に従ってください。別の方法については、[Linux で Worker を手動インストール](#manually-install-the-worker-on-linux) を参照してください。

1. **Select API key** をクリックして、使用する Datadog API キーを選択します。
    - **注**: API キーは [Remote Configuration を有効化][2] している必要があります。
1. UI で提供されるワンステップコマンドを実行して、Worker をインストールします。

    **注**: `/etc/default/observability-pipelines-worker` で Worker が使用する環境変数は、インストール スクリプトを再実行しても更新されません。変更が必要な場合は、ファイルを手動で更新し、Worker を再起動してください。
1. Observability Pipelines のインストールページに戻り、**Deploy** をクリックします。

パイプラインの構成を変更したい場合は、[既存のパイプラインを更新][1] を参照してください。

[1]: /ja/observability_pipelines/configuration/update_existing_pipelines
[2]: https://app.datadoghq.com/organization-settings/remote-config/setup

{{% /tab %}}
{{% tab "ECS Fargate" %}}

手順については、[ECS Fargate で Worker をセットアップ][1] を参照してください。

[1]: /ja/observability_pipelines/guide/set_up_the_worker_in_ecs_fargate/

{{% /tab %}}
{{% tab "CloudFormation" %}}

{{% observability_pipelines/install_worker/cloudformation %}}

{{% /tab %}}
{{< /tabs >}}

### Linux で Worker を手動インストール

Linux の 1 行インストール スクリプトを使用しない場合は、以下の手順に従ってください:

{{< tabs >}}
{{% tab "APT" %}}

1. HTTPS を使用してダウンロードするための APT トランスポートを設定します。
    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```
1. 以下のコマンドを実行して、システム上に Datadog の `deb` リポジトリをセットアップし、Datadog のアーカイブキーリングを作成します。
    ```shell
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable observability-pipelines-worker-2' > /etc/apt/sources.list.d/datadog-observability-pipelines-worker.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
    sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```
1. 以下のコマンドを実行して、ローカルの `apt` リポジトリを更新し、Worker をインストールします。
    ```shell
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```
1. Worker の環境ファイルに、キー、サイト (例えば、US1 の場合は `datadoghq.com`)、ソース、宛先の環境変数を追加します。
    ```shell
    sudo cat <<EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<DATADOG_API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<DATADOG_SITE>
    <SOURCE_ENV_VARIABLES>
    <DESTINATION_ENV_VARIABLES>
    EOF
    ```
1. Worker を起動します。
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

**注**: `/etc/default/observability-pipelines-worker` にある Worker の環境変数は、インストール スクリプトを再実行しても更新されません。変更が必要な場合は、ファイルを手動で更新し、Worker を再起動してください。

パイプラインの構成を変更したい場合は、[既存のパイプラインを更新][1] を参照してください。

[1]: /ja/observability_pipelines/configuration/update_existing_pipelines

{{% /tab %}}
{{% tab "RPM" %}}

<div class="alert alert-danger">RHEL と CentOS では、Observability Pipelines Worker は 8.0 以降をサポートします。</div>

1. 以下のコマンドで、システムに Datadog の `rpm` リポジトリを設定します。<br>**注**: RHEL 8.1 または CentOS 8.1 を実行している場合は、以下の構成で `repo_gpgcheck=1` の代わりに `repo_gpgcheck=0` を使用してください。
    ```shell
    cat <<EOF > /etc/yum.repos.d/datadog-observability-pipelines-worker.repo
    [observability-pipelines-worker]
    name = Observability Pipelines Worker
    baseurl = https://yum.datadoghq.com/stable/observability-pipelines-worker-2/\$basearch/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
        https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
    EOF
    ```
1. パッケージを更新し、Worker をインストールします。
    ```shell
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```
1. Worker の環境ファイルに、キー、サイト (例えば、US1 の場合は `datadoghq.com`)、ソース、宛先の環境変数を追加します。
    ```shell
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    <SOURCE_ENV_VARIABLES>
    <DESTINATION_ENV_VARIABLES>
    EOF
    ```
1. Worker を起動します。
    ```shell
    sudo systemctl restart observability-pipelines-worker
    ```
1. Observability Pipelines のインストールページに戻り、**Deploy** をクリックします。

**注**: `/etc/default/observability-pipelines-worker` にある Worker の環境変数は、インストール スクリプトを再実行しても更新されません。変更が必要な場合は、ファイルを手動で更新し、Worker を再起動してください。

パイプラインの構成を変更したい場合は、[既存のパイプラインを更新][1] を参照してください。

[1]: /ja/observability_pipelines/configuration/update_existing_pipelines

{{% /tab %}}
{{< /tabs >}}

## Worker をアップグレード

Worker を最新バージョンにアップグレードするには、次のコマンドを実行します:

{{< tabs >}}
{{% tab "APT" %}}

```
sudo apt-get install --only-upgrade observability-pipelines-worker
```

{{% /tab %}}
{{% tab "RPM" %}}

```
sudo yum install --only-upgrade observability-pipelines-worker
```

{{% /tab %}}
{{< /tabs >}}


## ワーカーをアンインストールする

Worker をアンインストールする場合は、次のコマンドを実行します:

{{< tabs >}}
{{% tab "APT" %}}

```
sudo apt-get remove --purge observability-pipelines-worker
```

{{% /tab %}}
{{% tab "RPM" %}}

1.
    ```
    yum remove observability-pipelines-worker
    ```
1.
    ```
    rpm -q --configfiles observability-pipelines-worker
    ```

{{% /tab %}}
{{< /tabs >}}

## 関連情報

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/#bootstrap-options
[2]: /ja/observability_pipelines/sources/
[3]: /ja/observability_pipelines/destinations/
[4]: /ja/observability_pipelines/processors/
[5]: https://app.datadoghq.com/observability-pipelines
[6]: /ja/api/latest/observability-pipelines/#create-a-new-pipeline
[7]: /ja/observability_pipelines/guide/environment_variables/
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline