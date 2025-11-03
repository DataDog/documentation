---
aliases:
- /ja/integrations/observability_pipelines/splunk
- /ja/observability_pipelines/guide/setup_splunk_environment
- /ja/observability_pipelines/setup/splunk/
further_reading:
- link: /observability_pipelines/legacy/working_with_data/
  tag: ドキュメント
  text: 観測可能性パイプラインを使ったデータの操作
- link: /observability_pipelines/legacy/configurations/
  tag: ドキュメント
  text: 観測可能性パイプラインの構成の詳細
- link: https://dtdg.co/d22op
  tag: ラーニングセンター
  text: 観測可能性パイプラインによる安心・安全なローカル処理
title: (レガシー) Splunk 環境で Observability Pipelines をセットアップする
---

{{% observability_pipelines/legacy_warning %}}

<div class="alert alert-info">Observability Pipelines は Splunk の HTTP Event Collector (HEC) プロトコルのみをサポートしています。</div>

## 概要

[Observability Pipelines Worker][1] は、ログの収集、処理、およびあらゆるソースからあらゆる宛先へのルーティングを行うことができます。Datadog を使用することで、Observability Pipelines Worker のすべてのデプロイを大規模に構築および管理できます。

このガイドでは、共通ツールクラスターに Worker をデプロイし、Splunk を構成して Worker を介してログを送信し、Datadog にデュアルライトする方法を説明します。

{{< img src="observability_pipelines/guide/splunk/setup2.png" alt="Observability Pipelines アグリゲーターを介してデータを送信するいくつかの Splunk Heavy Forwarder の図。" >}}

## 仮定
* Splunk HTTP Event Collector (HEC) プロトコルと互換性のあるログコレクターを使用している。
* コレクターとログが送信される Splunk インデックスへの管理者アクセス権を持っている。
* Observability Pipelines Worker をデプロイするクラスターへの管理者アクセス権を持っていること。
* 環境には一般的なツールまたはセキュリティクラスターがあり、他のすべてのクラスターはこれに接続されている。

## 前提条件
インストールする前に、以下があることを確認してください。

* 有効な [Datadog API キー][2]。
* パイプライン ID。

[観測可能性パイプライン][3]で、この 2 つを生成することができます。


### プロバイダー固有の要件
{{< tabs >}}
{{% tab "Docker" %}}
マシンが Docker を実行できるように構成されていることを確認してください。
{{% /tab %}}
{{% tab "AWS EKS" %}}
Kubernetes ノードで Worker を実行するには、最低でも 1 CPU と 512MB の RAM を持つ 2 つのノードが必要です。Datadog は、Worker 用に別個のノードプールを作成することを推奨しており、これは本番環境のデプロイでも推奨される構成です。

* [EBS CSI ドライバー][1]が必要です。インストールされているか確認するには、以下のコマンドを実行し、リストに `ebs-csi-controller` があるか確認してください。

  ```shell
  kubectl get pods -n kube-system
  ```

* Worker が正しい EBS ドライブをプロビジョニングするには `StorageClass` が必要です。すでにインストールされているか確認するには、以下のコマンドを実行し、リストに `io2` があるか確認してください。

  ```shell
  kubectl get storageclass
  ```

  `io2` が存在しない場合は、[StorageClass YAML][2] をダウンロードし、`kubectl apply` で適用してください。

* [AWS Load Balancer コントローラー][3]が必要です。インストールされているか確認するには、以下のコマンドを実行し、リストに `aws-load-balancer-controller` があるか確認してください。

  ```shell
  helm list -A
  ```
* Datadog では、Amazon EKS >= 1.16 を使用することを推奨しています。

本番環境レベルの要件については、[OPW アグリゲーターアーキテクチャのベストプラクティス][4]を参照してください。

[1]: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html
[2]: /resources/yaml/observability_pipelines/helm/storageclass.yaml
[3]: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html
[4]: /ja/observability_pipelines/legacy/architecture/

{{% /tab %}}
{{% tab "Azure AKS" %}}
Kubernetes ノードで Worker を実行するには、最低でも 1 CPU と 512MB の RAM を持つ 2 つのノードが必要です。Datadog は、Worker 用に別個のノードプールを作成することを推奨しており、これは本番環境のデプロイでも推奨される構成です。

本番環境レベルの要件については、[OPW アグリゲーターアーキテクチャのベストプラクティス][1]を参照してください。

[1]: /ja/observability_pipelines/legacy/architecture/
{{% /tab %}}
{{% tab "Google GKE" %}}
Kubernetes ノードで Worker を実行するには、最低でも 1 CPU と 512MB の RAM を持つ 2 つのノードが必要です。Datadog は、Worker 用に別個のノードプールを作成することを推奨しており、これは本番環境のデプロイでも推奨される構成です。

本番環境レベルの要件については、[OPW アグリゲーターアーキテクチャのベストプラクティス][1]を参照してください。

[1]: /ja/observability_pipelines/legacy/architecture/
{{% /tab %}}
{{% tab "APT-based Linux" %}}
APT ベースの Linux にはプロバイダー固有の要件はありません。
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
RPM ベースの Linux にはプロバイダー固有の要件はありません。
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
AWS アカウントで Worker を実行するには、そのアカウントへの管理者アクセス権が必要です。Worker インスタンスを実行するために、以下の情報を収集してください。
* インスタンスが実行される VPC ID。
* インスタンスが実行されるサブネット ID。
* VPC が置かれている AWS リージョン。
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-danger">CloudFormation のインストールは現在、Remote Configuration のみをサポートしています。</div>
<div class="alert alert-warning">CloudFormation のインストールは、本番環境レベル以外のワークロードでのみ使用してください。</div>

Worker を AWS アカウントで実行するには、そのアカウントへの管理者アクセスが必要です。Worker インスタンスを実行するために次の情報を収集してください。
* インスタンスが実行される VPC ID。
* インスタンスが実行されるサブネット ID。
* VPC が置かれている AWS リージョン。
{{% /tab %}}
{{< /tabs >}}

## Splunk インデックスの設定

<div class="alert alert-info">Observability Pipelines は、入力で <strong>Enable Indexer Acknowledgments</strong> 設定を有効にすると、確認応答をサポートします。</div>

Observability Pipelines Worker からログを受信するには、HEC 入力と HEC トークンをインデックス上でプロビジョニングする必要があります。


1. Splunk で、**Settings** > **Data Inputs** に移動します。
2. 新しい HTTP イベントコレクター入力を追加し、名前を割り当てます。
3. ログを送信するインデックスを選択します。

入力を追加すると、Splunk は自動的にトークンを作成します。トークンは通常 UUID 形式です。この記事の後半のセクションで提供されるサンプル構成では、このトークンを構成に追加して、Observability Pipelines Worker が自身を認証できるようにします。

## Observability Pipelines Worker のインストール

{{< tabs >}}
{{% tab "Docker" %}}

Observability Pipelines Worker の Docker イメージは Docker Hub の[こちら][1]に公開されています。

1. [サンプルパイプラインコンフィギュレーションファイル][2]をダウンロードします。

2. Docker で Observability Pipelines Worker を起動するには、次のコマンドを実行します。
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
   `<API_KEY>` を Datadog API キーに、`<PIPELINES_ID>` を Observability Pipelines の構成 ID に、`<SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えてください。また、`SPLUNK_HEC_ENDPOINT` と `SPLUNK_TOKEN` を、[Splunk インデックスのセットアップ](#setting-up-the-splunk-index)で作成した Splunk デプロイに一致する値に更新してください。`./pipeline.yaml` は、ステップ 1 でダウンロードした構成の相対または絶対パスである必要があります。

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[2]: /resources/yaml/observability_pipelines/splunk/pipeline.yaml
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. AWS EKS 用の [Helm チャート値ファイル][1]をダウンロードします。

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
1. Azure AKS 用の [Helm チャート値ファイル][1]をダウンロードします。

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
1. Google GKE 用の [Helm チャート値ファイル][1]をダウンロードします。

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
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. 以下のコマンドを実行して、ローカルの `apt` リポジトリを更新し、Worker をインストールします。

    ```
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```

4. キー、サイト ({{< region-param key="dd_site" code="true" >}})、および Splunk 情報を Worker の環境変数に追加します。

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

6. ワーカーを起動します。
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

2. パッケージを更新し、ワーカーをインストールします。

    ```
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```

3. キー、サイト ({{< region-param key="dd_site" code="true" >}})、および Splunk 情報を Worker の環境変数に追加します。

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

5. ワーカーを起動します。
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/splunk/pipeline.yaml
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
このサンプル構成を使用して、既存の Terraform に Worker モジュールをセットアップします。`vpc-id`、`subnet-ids`、`region` の値を AWS デプロイに合わせて更新します。`datadog-api-key` と `pipeline-id` の値をパイプラインに合わせて更新します。

```
module "opw" {
source = "git::https://github.com/DataDog/opw-terraform//aws"
vpc-id = "{VPC ID}"
subnet-ids = ["{SUBNET ID 1}", "{SUBNET ID 2}"]
region = "{REGION}"

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
## これはタグが設定された独自のリマップ (または他の変換) ステップのプレースホルダーです。Datadog はこれらのタグの割り当てを推奨します。
## これらは、どのデータが OP に移行され、どのデータがまだ移行される必要があるかを示します。
LOGS_YOUR_STEPS:
type: remap
inputs:
- splunk_receiver
source: |
.sender = "observability_pipelines_worker"
.opw_aggregator = get_hostname!()

## このバッファ構成は、Datadog および Splunk シンクの両方に対して 144GB のバッファに分割されています。
##
## これは、ほとんどの OP Worker デプロイメントに対して機能し、調整が必要になることはほとんどありません。変更する場合は、`ebs-drive-size-gb` パラメーターのサイズを更新してください。
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

<div class="alert alert-warning">CloudFormation インストールは非本番環境レベルのワークロードにのみ使用してください。</div>

Worker を AWS アカウントにインストールするには、CloudFormation テンプレートを使用してスタックを作成します。

  1. Worker 用の [CloudFormation テンプレート][1]をダウンロードします。

  2. **CloudFormation console** で、**Create stack** をクリックし、**With new resources (standard)** オプションを選択します。

  3. **Template is ready** (テンプレートが準備できています) オプションが選択されていることを確認します。 **Choose file** (ファイルを選択) をクリックし、先ほどダウンロードした CloudFormation テンプレートファイルを追加します。**Next** (次へ) をクリックします。

  4. **Specify stack details** で、スタックの名前を入力します。

  5. CloudFormation テンプレートのパラメーターを入力します。特に注意が必要なものがあります。

      * `APIKey` と `PipelineID` には、前の必要条件セクションで取得したキーと ID を入力します。

      * `SplunkToken` には、以前に Splunk インデックス上で作成したトークンを指定します。

     * `VPCID` と `SubnetIDs` には、以前に選択したサブネットと VPC を入力します。

      * 他のパラメーターは Worker デプロイメントのための妥当なデフォルトに設定されていますが、必要に応じて調整できます。

  6. **Next** をクリックします。

  7. パラメーターが正しいことを確認し、IAM の必要な権限のチェックボックスをクリックし、**Submit** をクリックしてスタックを作成します。

この時点で CloudFormation がインストールを処理します。Worker インスタンスが起動し、自動的に必要なソフトウェアをダウンロードして実行を開始します。

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


Worker をスケーリングする際のロードバランサーの推奨事項については、[容量計画とスケーリング][2]を参照してください。

#### クロスアベイラビリティゾーンロードバランシング
提供されている Helm の構成は、ロードバランシングの簡素化を目指していますが、クロス AZ (アヴェイラビリティーゾーン) トラフィックの潜在的な価格的影響を考慮する必要があります。可能な限り、サンプルは複数のクロス AZ ホップが起こりうる状況を避けるよう努めています。

サンプルの構成では、このコントローラーで利用可能なクロスゾーンのロードバランシング機能は有効化されていません。これを有効にするには、`service` ブロックに以下のアノテーションを追加します。

```
service.beta.kubernetes.io/aws-load-balancer-attributes: load_balancing.cross_zone.enabled=true
```

詳細については、[AWS Load Balancer Controller][3] を参照してください。

[1]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/
[2]: /ja/observability_pipelines/legacy/architecture/capacity_planning_scaling/
[3]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/guide/service/annotations/#load-balancer-attributes
{{% /tab %}}
{{% tab "Azure AKS" %}}
クラウドプロバイダーが提供するロードバランサーを使用します。
これらは、デフォルトの Helm セットアップで構成されているオートスケーリングイベントに基づいて調整されます。ロードバランサーは内部向けなので、あなたのネットワーク内からのみアクセス可能です。

既存のコレクターを構成するときに、Helm から与えられたロードバランサーの URL を使用します。

Worker をスケーリングする際のロードバランサーの推奨事項については、[容量計画とスケーリング][1]を参照してください。

#### クロスアベイラビリティゾーンロードバランシング
提供されている Helm の構成は、ロードバランシングの簡素化を目指していますが、クロス AZ (アヴェイラビリティーゾーン) トラフィックの潜在的な価格的影響を考慮する必要があります。可能な限り、サンプルは複数のクロス AZ ホップが起こりうる状況を避けるよう努めています。

[1]: /ja/observability_pipelines/legacy/architecture/capacity_planning_scaling/
{{% /tab %}}
{{% tab "Google GKE" %}}
クラウドプロバイダーが提供するロードバランサーを使用します。
それらはデフォルトの Helm セットアップが構成されたオートスケーリングイベントに基づいて調整されます。ロードバランサーは内部向けであり、ネットワーク内でのみアクセス可能です。

既存のコレクターを構成するときに、Helm から与えられたロードバランサーの URL を使用します。

Worker をスケーリングする際のロードバランサーの推奨事項については、[容量計画とスケーリング][1]を参照してください。

#### クロスアベイラビリティゾーンロードバランシング
提供されている Helm の構成は、ロードバランシングの簡素化を目指していますが、クロス AZ (アヴェイラビリティーゾーン) トラフィックの潜在的な価格的影響を考慮する必要があります。可能な限り、サンプルは複数のクロス AZ ホップが起こりうる状況を避けるよう努めています。

グローバルアクセスはデフォルトで有効になっています。これは共有ツールクラスターで必要とされる可能性が高いためです。

[1]: /ja/observability_pipelines/legacy/architecture/capacity_planning_scaling/
{{% /tab %}}
{{% tab "APT ベースの Linux" %}}
インストールの単一マシンの性質上、ロードバランシングの組み込みサポートは提供されていません。会社の基準を使用して独自のロードバランサーをプロビジョニングする必要があります。
{{% /tab %}}
{{% tab "RPM ベースの Linux" %}}
インストールの単一マシンの性質上、ロードバランシングの組み込みサポートは提供されていません。会社の基準を使用して独自のロードバランサーをプロビジョニングする必要があります。
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
NLB は Terraform モジュールによってプロビジョニングされ、インスタンスを指すように構成されます。DNS アドレスは Terraform の `lb-dns` 出力で返されます。
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-warning">CloudFormation インストールは非本番環境レベルのワークロードにのみ使用してください。</div>

NLB は CloudFormation テンプレートによってプロビジョニングされ、AutoScaling グループを指すように構成されます。DNS アドレスは CloudFormation の `LoadBalancerDNS` 出力で返されます。
{{% /tab %}}
{{< /tabs >}}

### バッファリング
Observability Pipelines には、ダウンストリームの障害に対するクラスターの耐性を高めるための複数のバッファリング戦略が含まれています。提供されるサンプル構成は、ディスクバッファを使用します。その容量は、Observability Pipelines デプロイメントでコアあたり 10Mbps で約 10 分間のデータを保持するように評価されています。これは、一時的な問題が解決するのに十分な時間であり、インシデント対応者が可観測性データに対して何をすべきかを決定するのにも役立ちます。

{{< tabs >}}
{{% tab "Docker" %}}
デフォルトでは、Observability Pipelines Worker のデータディレクトリは `/var/lib/observability-pipelines-worker` に設定されています。ホストマシンがコンテナのマウントポイントに十分なストレージ容量を割り当てていることを確認してください。
{{% /tab %}}
{{% tab "AWS EKS" %}}
AWS の場合、Datadog は `io2` EBS ドライブファミリーを使用することを推奨しています。代替として、`gp3` ドライブも使用できます。
{{% /tab %}}
{{% tab "Azure AKS" %}}
Azure AKS の場合、Datadog は `default` (`managed-csi` とも呼ばれる) ディスクを使用することを推奨しています。
{{% /tab %}}
{{% tab "Google GKE" %}}
Google GKE の場合、Datadog は SSD でバックアップされた `premium-rwo` ドライブクラスを使用することを推奨しています。HDD でバックアップされた `standard-rwo` クラスでは、バッファが有用となるための十分な書き込み性能を提供できない可能性があります。
{{% /tab %}}
{{% tab "APT ベースの Linux" %}}
デフォルトでは、Observability Pipelines Worker のデータディレクトリは `/var/lib/observability-pipelines-worker` に設定されています。サンプル構成を使用している場合、このディレクトリに少なくとも 288GB のスペースが利用可能であることを確認してください。

可能であれば、別の SSD をその場所にマウントすることを推奨します。
{{% /tab %}}
{{% tab "RPM ベースの Linux" %}}
デフォルトでは、Observability Pipelines Worker のデータディレクトリは `/var/lib/observability-pipelines-worker` に設定されています。サンプル構成を使用している場合、このディレクトリに少なくとも 288GB のスペースが利用可能であることを確認してください。

可能であれば、別の SSD をその場所にマウントすることを推奨します。
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
デフォルトでは、各インスタンスに 288GB の EBS ドライブが割り当てられ、上記のサンプル構成はそれをバッファリングに使用するように設定されています。
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-warning">この CloudFormation テンプレートによって作成された EBS ドライブは、それらが作成されたインスタンスのライフサイクルに関連付けられています。<strong>これは、例えば AutoScaling グループによってインスタンスが終了された場合にデータが失われることを意味します。</strong> このため、CloudFormation インストールは非本番環境レベルのワークロードにのみ使用してください。</div>

デフォルトでは、各インスタンスに 288GB の EBS ドライブが割り当てられ、インスタンスの起動時に自動的にマウントおよびフォーマットされます。
{{% /tab %}}
{{< /tabs >}}

## Splunk フォワーダーを Observability Pipelines Worker に接続する
Observability Pipelines Worker をインストールし、ログを Splunk インデックスに送信するように構成した後、既存のコレクターを更新して Worker を指す必要があります。

ほとんどの Splunk コレクターは、Observability Pipelines Worker に関連付けられたホスト (またはロードバランサー) の IP/URL で更新できます。

Terraform インストールの場合、`lb-dns` 出力が必要な値を提供します。CloudFormation インストールの場合、`LoadBalancerDNS` CloudFormation 出力に正しい URL があります。

さらに、Splunk コレクターを更新して認証用の HEC トークンを使用する必要があります。これは、`pipeline.yaml` 内の Observability Pipelines Worker の `valid_tokens` リストに指定されたものと一致する必要があります。

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

この時点で、ログは Worker に送信され、処理に利用できるようになっているはずです。次のセクションでは、デフォルトで含まれているプロセスと利用可能な追加オプションについて説明します。

## データを活用する
サンプルの Observability Pipelines 構成は次のことを行います。
- Splunk フォワーダーから Observability Pipelines Worker への送信中のログを収集します。
- データが Observability Pipelines Worker を経由していることを示すタグを追加することでログを変換します。これにより、クラスターを更新する際にどのトラフィックが Worker にシフトされる必要があるかを判断するのに役立ちます。また、ロードバランサーを介してログがどのようにルーティングされているかを示し、不均衡がある場合に役立ちます。
- Splunk と Datadog の両方にデータをデュアルシッピングすることで、ログをルーティングする。

## 参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/legacy/
[2]: /ja/account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/observability-pipelines/create