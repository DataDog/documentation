---
aliases:
- /ja/agent/vector_aggregation/
- /ja/integrations/observability_pipelines/integrate_vector_with_datadog/
- /ja/observability_pipelines/integrate_vector_with_datadog/
- /ja/observability_pipelines/integrations/integrate_vector_with_datadog/
- /ja/observability_pipelines/production_deployment_overview/integrate_datadog_and_the_observability_pipelines_worker/
further_reading:
- link: /observability_pipelines/production_deployment_overview/
  tag: ドキュメント
  text: 観測可能性パイプラインワーカーの本番デプロイ設計と原則
- link: https://dtdg.co/d22op
  tag: ラーニングセンター
  text: 観測可能性パイプラインによる安心・安全なローカル処理
kind: ドキュメント
title: Datadog で観測可能性パイプラインを設定する
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines は、US1-FED Datadog サイトでは利用できません。</div>
{{< /site-region >}}

## 概要

[Observability Pipelines Worker][1] は、ログやメトリクスをあらゆるソースからあらゆる宛先に収集、処理、ルーティングすることができます。Datadog を使用することで、Observability Pipelines Worker のデプロイメントを大規模に構築・管理することができます。

このガイドでは、一般的なツールのクラスターにWorkerをデプロイし、Datadog Agent がWorkerにログとメトリクスを送信するように構成する方法を説明します。

{{< img src="observability_pipelines/setup/opw-dd-pipeline.png" alt="Observability Pipelines アグリゲーターを通してデータを送信するいくつかのワークロードクラスターの図。" >}}

## 仮定
* すでに Datadog を使用していて、Observability Pipelines を使用したい。
* Observability Pipelines Worker がデプロイされるクラスターや、集計されるワークロードへの管理アクセス権がある。
* 環境には一般的なツールまたはセキュリティクラスターがあり、他のすべてのクラスターはこれに接続されている。

## 前提条件
インストールする前に、以下をお持ちであることを確認してください。

* 有効な [Datadog API キー][2]。
* パイプライン ID。

[Observability Pipelines][3] で、この 2 つを生成することができます。

### プロバイダー固有の要件
{{< tabs >}}
{{% tab "Docker" %}}
マシンが Docker を実行するように構成されていることを確認します。
{{% /tab %}}
{{% tab "AWS EKS" %}}
Kubernetes ノードで Worker を実行するには、1 つの CPU と 512MB RAM が利用可能なノードが最低 2 台必要です。Datadog は、Worker 用に別のノードプールを作成することを推奨しており、これは本番デプロイのための推奨構成でもあります。

* [EBS CSI ドライバー][1]が必要です。インストールされているかどうかは、以下のコマンドを実行し、リストの中に `ebs-csi-controller` があるかどうかで確認することができます。

  ```shell
  kubectl get pods -n kube-system
  ```

* Worker が正しい EBS ドライブをプロビジョニングするには、`StorageClass` が必要です。すでにインストールされているかどうかは、以下のコマンドを実行し、リストの中に `io2` があるかどうかで確認することができます。

  ```shell
  kubectl get storageclass
  ```

  `io2` がない場合は、[StorageClass YAML][2] をダウンロードし、`kubectl apply` を実行します。

* [AWS ロードバランサーコントローラー][3]が必要です。インストールされているかどうかは、以下のコマンドを実行し、リストの中に `aws-load-balancer-controller` があるかどうかで確認することができます。

  ```shell
  helm list -A
  ```
* Datadog では、Amazon EKS >= 1.16 を使用することを推奨しています。

本番レベルの要件については、[OPW アグリゲーターアーキテクチャのベストプラクティス][4]を参照してください。

[1]: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html
[2]: /resources/yaml/observability_pipelines/helm/storageclass.yaml
[3]: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html
[4]: /ja/observability_pipelines/architecture/

{{% /tab %}}
{{% tab "Azure AKS" %}}
Kubernetes ノードで Worker を実行するには、1 つの CPU と 512MB RAM が利用可能なノードが最低 2 台必要です。Datadog は、Worker 用に別のノードプールを作成することを推奨しており、これは本番デプロイのための推奨構成でもあります。

本番レベルの要件については、[OPW アグリゲーターアーキテクチャのベストプラクティス][1]を参照してください。

[1]: /ja/observability_pipelines/architecture/
{{% /tab %}}
{{% tab "Google GKE" %}}
Kubernetes ノードで Worker を実行するには、1 つの CPU と 512MB RAM が利用可能なノードが最低 2 台必要です。Datadog は、Worker 用に別のノードプールを作成することを推奨しており、これは本番デプロイのための推奨構成でもあります。

本番レベルの要件については、[OPW アグリゲーターアーキテクチャのベストプラクティス][1]を参照してください。

[1]: /ja/observability_pipelines/architecture/
{{% /tab %}}
{{% tab "APT ベースの Linux" %}}
APT ベースの Linux には、プロバイダー固有の要件はありません。
{{% /tab %}}
{{% tab "RPM ベースの Linux" %}}
RPM ベースの Linux には、プロバイダー固有の要件はありません。
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
AWS アカウントで Worker を実行するには、そのアカウントの管理者権限が必要です。Worker インスタンスを実行するために、以下の情報を収集します。
* インスタンスが実行される VPC ID。
* インスタンスが実行されるサブネット ID。
* VPC が置かれている AWS リージョン。
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-warning">CloudFormation を使ったインストールは、リモート構成のみをサポートしています。</div>
<div class="alert alert-danger">CloudFormation によるインストールは非本番レベルのワークロードにのみ使用してください。</div>

AWS アカウントで Worker を実行するには、そのアカウントの管理者権限が必要です。Worker インスタンスを実行するために、以下の情報を収集します。
* インスタンスが実行される VPC ID。
* インスタンスが実行されるサブネット ID。
* VPC が置かれている AWS リージョン。
{{% /tab %}}
{{< /tabs >}}

## Observability Pipelines Worker のインストール

{{< tabs >}}
{{% tab "Docker" %}}

Observability Pipelines Worker Docker イメージは[こちら][1]の Docker Hub に公開されています。

1. [サンプルパイプラインコンフィギュレーションファイル][2]をダウンロードします。

2. 以下のコマンドを実行して、Docker で Observability Pipelines Worker を起動します。
    ```
    docker run -i -e DD_API_KEY=<API_KEY> \
      -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
      -e DD_SITE=<SITE> \
      -p 8282:8282 \
      -v ./pipeline.yaml:/etc/observability-pipelines-worker/pipeline.yaml:ro \
      datadog/observability-pipelines-worker run
    ```
   `<API_KEY>` は Datadog API キー、`<PIPELINES_ID>` は Observability Pipelines 構成 ID、`<SITE>` は {{< region-param key="dd_site" code="true" >}} に置き換えてください。`./pipeline.yaml` には、ステップ 1 でダウンロードした構成の相対パスまたは絶対パスを指定します。

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[2]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. AWS EKS 用の [Helm チャート][1]をダウンロードします。

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

[1]: /resources/yaml/observability_pipelines/datadog/aws_eks.yaml
{{% /tab %}}
{{% tab "Azure AKS" %}}
1. Azure AKS 用の [Helm チャート][1]をダウンロードします。

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

[1]: /resources/yaml/observability_pipelines/datadog/azure_aks.yaml
{{% /tab %}}
{{% tab "Google GKE" %}}
1. Google GKE 用の [Helm チャート][1]をダウンロードします。

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

[1]: /resources/yaml/observability_pipelines/datadog/google_gke.yaml
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

6. Worker を起動します。
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
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

4. ホストの `/etc/observability-pipelines-worker/pipeline.yaml` に[サンプルコンフィギュレーションファイル][1]をダウンロードします。

5. Worker を起動します。
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
このサンプル構成を使って、既存の Terraform に Worker モジュールをセットアップします。`vpc-id`、`subnet-ids`、`region` の値を AWS のデプロイに合わせて更新します。パイプラインに合わせて `datadog-api-key` と `pipeline-id` の値を更新します。

```
module "opw" {
    source = "git::https://github.com/DataDog/opw-terraform//aws"
    vpc-id     = "{VPC ID}"
    subnet-ids = ["{SUBNET ID 1}", "{SUBNET ID 2}"]
    region     = "{REGION}"

    datadog-api-key = "{DATADOG API KEY}"
    pipeline-id = "{OP PIPELINE ID}"
    pipeline-config = <<EOT
## SOURCES: Observability Pipelines Worker がデータを収集するデータソース。
## Datadog のユースケースでは、Datadog Agent からデータを受け取ります。
sources:
  datadog_agent:
    address: 0.0.0.0:8282
    type: datadog_agent
    multiple_outputs: true

transforms:
  ## Datadog Agent は、文字列 `.ddtags` に格納される値のカンマ区切り
  ## リストとしてタグをネイティブにエンコードします。これらのタグを
  ## 使用したり、フィルターしたりするには、この文字列をより構造化
  ## されたデータにパースする必要があります。
  logs_parse_ddtags:
    type: remap
    inputs:
      - datadog_agent.logs
    source: |
      .ddtags = parse_key_value!(.ddtags, key_value_delimiter: ":", field_delimiter: ",")

  ## Datadog Agent によって追加された `.status` 属性を削除する必要があります。
  ## そうしないと、インテーク時にログが誤って分類される可能性があります。
  logs_remove_wrong_level:
    type: remap
    inputs:
      - logs_parse_ddtags
    source: |
      del(.status)

  ## これは、タグを設定した独自のリマップ (または他の変換) ステップの
  ## プレースホルダーです。Datadog はこれらのタグ割り当てを推奨します。
  ## どのデータが OP に移行され、何がまだ移行されていないかが
  ## 表示されます。
  LOGS_YOUR_STEPS:
    type: remap
    inputs:
      - logs_remove_wrong_level
    source: |
      .ddtags.sender = "observability_pipelines_worker"
      .ddtags.opw_aggregator = get_hostname!()

  ## ログ受信側にデータを送信する前に、Agent が直接送信しているかのように
  ## 見せるために、タグを期待される形式に再エンコードする必要が
  ## あります。
  logs_finish_ddtags:
    type: remap
    inputs:
      - LOGS_YOUR_STEPS
    source: |
      .ddtags = encode_key_value!(.ddtags, key_value_delimiter: ":", field_delimiter: ",")

  metrics_add_dd_tags:
    type: remap
    inputs:
      - datadog_agent.metrics
    source: |
      .tags.sender = "observability_pipelines_worker"
      .tags.opw_aggregator = get_hostname!()

## このバッファ構成は、Terraform モジュールによって自動的に
## プロビジョニングされた 288GB を合計して、以下のように分割されます。
## - ログに 240GB のバッファ
## - メトリクスに 48GB のバッファ
##
## これはほとんどの OP Worker デプロイメントで機能し、
## 稀にしか調整の必要はないはずです。もし変更する場合は、必ず `ebs-drive-size-gb` パラメーターを
## 更新してください。
sinks:
  datadog_logs:
    type: datadog_logs
    inputs:
      - logs_finish_ddtags
    default_api_key: "$${DD_API_KEY}"
    compression: gzip
    buffer:
       type: disk
       max_size: 257698037760
  datadog_metrics:
    type: datadog_metrics
    inputs:
      - metrics_add_dd_tags
    default_api_key: "$${DD_API_KEY}"
    buffer:
      type: disk
      max_size: 51539607552
EOT
}
```
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-danger">CloudFormation によるインストールは非本番レベルのワークロードにのみ使用してください。</div>

AWS アカウントに Worker をインストールするには、CloudFormation テンプレートを使用してスタックを作成します。

  1. Worker 用の [CloudFormation テンプレート][1]をダウンロードします。

  2. **CloudFormation コンソール**で、**Create stack** をクリックし、**With new resources (standard)** オプションを選択します。

  3. **Template is ready** オプションが選択されていることを確認し、*Upload a template file** を選択します。**Choose file** をクリックし、先ほどダウンロードした CloudFormation テンプレートファイルを追加します。**Next** をクリックします。

  4. **Specify stack details** でスタック名を入力します。

  5. CloudFormation テンプレートのパラメーターを入力します。特別な注意が必要なものがいくつかあります。

      * `APIKey` および `PipelineID` には、前提条件のセクションで取得したキーと ID を入力します。

      * `VPCID` および `SubnetIDs` には、先ほど選択したサブネットおよび VPC を入力します。

      * その他のパラメーターはすべて、Worker をデプロイするのに合理的なデフォルト値に設定されていますが、必要に応じて、ユースケースに合わせて調整することができます。

  6. **Next** をクリックします。

  7. パラメーターが想定通りであることを確認します。IAM で必要な権限のチェックボックスをクリックし、**Submit** をクリックしてスタックを作成します。

この時点で、CloudFormation がインストールを処理します。Worker インスタンスが起動され、必要なソフトウェアをダウンロードし、自動的に実行を開始します。

[1]: /resources/yaml/observability_pipelines/cloudformation/datadog.yaml
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

Datadog Agent の構成時に Helm から渡されたロードバランサーの URL を使用します。

[AWS ロードバランサーコントローラー][1]でプロビジョニングされた NLB を使用します。

Worker をスケーリングする際のロードバランサーの推奨事項については、[キャパシティプランニングとスケーリング][2]を参照してください。
#### クロスアベイラビリティゾーンロードバランシング
提供されている Helm の構成は、ロードバランシングの簡素化を目指していますが、クロス AZ (アヴェイラビリティーゾーン) トラフィックの潜在的な価格的影響を考慮する必要があります。可能な限り、サンプルは複数のクロス AZ ホップが起こりうる状況を避けるよう努めています。

サンプルの構成では、このコントローラーで利用可能なクロスゾーンのロードバランシング機能は有効化されていません。これを有効にするには、`service` ブロックに以下のアノテーションを追加します。

```
service.beta.kubernetes.io/aws-load-balancer-attributes: load_balancing.cross_zone.enabled=true
```

詳しくは [AWS ロードバランサーコントローラー][3]をご覧ください。

[1]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/
[2]: /ja/observability_pipelines/architecture/capacity_planning_scaling/
[3]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/guide/service/annotations/#load-balancer-attributes
{{% /tab %}}
{{% tab "Azure AKS" %}}
クラウドプロバイダーが提供するロードバランサーを使用します。
これらは、デフォルトの Helm セットアップで構成されているオートスケーリングイベントに基づいて調整されます。ロードバランサーは内部向けなので、あなたのネットワーク内からのみアクセス可能です。

Datadog Agent の構成時に Helm から渡されたロードバランサーの URL を使用します。

Worker をスケーリングする際のロードバランサーの推奨事項については、[キャパシティプランニングとスケーリング][1]を参照してください。

#### クロスアベイラビリティゾーンロードバランシング
提供されている Helm の構成は、ロードバランシングの簡素化を目指していますが、クロス AZ (アヴェイラビリティーゾーン) トラフィックの潜在的な価格的影響を考慮する必要があります。可能な限り、サンプルは複数のクロス AZ ホップが起こりうる状況を避けるよう努めています。

[1]: /ja/observability_pipelines/architecture/capacity_planning_scaling/
{{% /tab %}}
{{% tab "Google GKE" %}}
クラウドプロバイダーが提供するロードバランサーを使用します。
これらは、デフォルトの Helm セットアップで構成されているオートスケーリングイベントに基づいて調整されます。ロードバランサーは内部向けなので、あなたのネットワーク内からのみアクセス可能です。

Datadog Agent の構成時に Helm から渡されたロードバランサーの URL を使用します。

Worker をスケーリングする際のロードバランサーの推奨事項については、[キャパシティプランニングとスケーリング][1]を参照してください。

#### クロスアベイラビリティゾーンロードバランシング
提供されている Helm の構成は、ロードバランシングの簡素化を目指していますが、クロス AZ (アヴェイラビリティーゾーン) トラフィックの潜在的な価格的影響を考慮する必要があります。可能な限り、サンプルは複数のクロス AZ ホップが起こりうる状況を避けるよう努めています。

グローバルアクセスは、共有ツールクラスターで使用するために必要であると考えられるため、デフォルトで有効になっています。

[1]: /ja/observability_pipelines/architecture/capacity_planning_scaling/
{{% /tab %}}
{{% tab "APT ベースの Linux" %}}
シングルマシンでのインストールのため、ロードバランシングのビルトインサポートは提供されません。ロードバランサーの準備は、あなたの会社の標準に従って行ってください。
{{% /tab %}}
{{% tab "RPM ベースの Linux" %}}
シングルマシンでのインストールのため、ロードバランシングのビルトインサポートは提供されません。ロードバランサーの準備は、あなたの会社の標準に従って行ってください。
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
NLB は Terraform モジュールによって準備され、インスタンスを指すように設定されます。DNS アドレスは Terraform の `lb-dns` 出力で返されます。
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-danger">CloudFormation によるインストールは非本番レベルのワークロードにのみ使用してください。</div>

CloudFormation テンプレートによって NLB がプロビジョニングされ、オートスケーリンググループを指すように構成されます。その DNS アドレスが CloudFormation の出力 `LoadBalancerDNS` で返されます。
{{% /tab %}}
{{< /tabs >}}

### バッファリング
Observability Pipelines には複数のバッファリング戦略があり、ダウンストリーム障害に対するクラスターの耐性を高めることができます。提供されているサンプル構成では、ディスクバッファを使用していますが、その容量は、Observability Pipelines のデプロイメントにおいて、10Mbps/コアのデータレートで約 10 分間のデータを保持できるように評価されています。これは、一過性の問題が解決するまでの時間や、インシデント対応担当者が観測可能性データに対して何をすべきかを判断するのに十分な時間であることが多いでしょう。

{{< tabs >}}
{{% tab "Docker" %}}
デフォルトでは、Observability Pipelines Worker のデータディレクトリは `/var/lib/observability-pipelines-worker` に設定されています。ホストマシンがコンテナのマウントポイントに十分なストレージ容量を割り当てていることを確認してください。
{{% /tab %}}
{{% tab "AWS EKS" %}}
AWS の場合、Datadog は `io2` EBS ドライブファミリーの使用を推奨しています。代わりに、`gp3` ドライブを使用することも可能です。
{{% /tab %}}
{{% tab "Azure AKS" %}}
Azure AKS の場合、Datadog は `default` (`managed-csi` とも呼ばれる) ディスクの使用を推奨しています。
{{% /tab %}}
{{% tab "Google GKE" %}}
Google GKE では、Datadog は SSD を基盤とする `premium-rwo` ドライブクラスの使用を推奨しています。HDD を基盤とする `standard-rwo` クラスは、バッファにとって十分な書き込み性能を提供しない可能性があります。
{{% /tab %}}
{{% tab "APT ベースの Linux" %}}
デフォルトでは、Observability Pipelines Worker のデータディレクトリは `/var/lib/observability-pipelines-worker` に設定されています。サンプルの構成を使用する場合は、バッファリングに使用できる容量が少なくとも 288GB あることを確認する必要があります。

可能であれば、その場所に別の SSD をマウントすることをお勧めします。
{{% /tab %}}
{{% tab "RPM ベースの Linux" %}}
デフォルトでは、Observability Pipelines Worker のデータディレクトリは `/var/lib/observability-pipelines-worker` に設定されています。サンプルの構成を使用する場合は、バッファリングに使用できる容量が少なくとも 288GB あることを確認する必要があります。

可能であれば、その場所に別の SSD をマウントすることをお勧めします。 {{% /tab %}}
{{% tab "Terraform (AWS)" %}}
デフォルトでは、各インスタンスに 288GB の EBS ドライブが割り当てられており、上記のサンプル構成では、これをバッファリングに使用するように設定されています。
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-danger">この CloudFormation テンプレートによって作成される EBS ドライブのライフサイクルは、併せて作成されたインスタンスと連動しています。<strong>そのため、たとえばオートスケーリンググループによってインスタンスが終了された場合に、データが失われます。</strong>したがって、CloudFormation によるインストールは非本番レベルのワークロードにのみ使用してください。</div>

デフォルトで、各インスタンスには 288GB の EBS ドライブが割り当てられ、インスタンスのブート時に自動マウントされ、フォーマットされます。
{{% /tab %}}
{{< /tabs >}}

## Datadog Agent をObservability Pipelines Worker に接続する
Datadog Agent のログとメトリクスを Observability Pipelines Worker に送信するには、以下のように Agent の構成を更新してください。

```yaml
observability_pipelines_worker:
  logs:
    enabled: true
    url: "http://<OPW_HOST>:8282"
  metrics:
    enabled: true
    url: "http://<OPW_HOST>:8282"

```

`OPW_HOST` は先ほど設定したロードバランサーやマシンの IP です。シングルホスト Docker ベースのインストールの場合、これは基盤となるホストの IP アドレスです。Kubernetes ベースのインストールでは、以下のコマンドを実行して `EXTERNAL-IP` をコピーすることで取得できます。

```shell
kubectl get svc opw-observability-pipelines-worker
```

Terraform のインストールでは、 `lb-dns` 出力が必要な値を提供します。CloudFormation のインストールでは、CloudFormation の出力 `LoadBalancerDNS` で使用すべき正しい URL を確認できます。

この時点で、観測可能性データは Worker に送られ、データ処理に利用できるようになっているはずです。次のセクションでは、デフォルトで含まれている処理と、利用可能な追加オプションについて説明します。

## データを活用する
提供されるサンプル構成には、Observability Pipelines ツールを示す処理手順の例があり、Datadog に送られるデータが正しいフォーマットであることを保証します。

### ログの処理
Observability Pipelines のサンプル構成は以下を実行します。
- Datadog Agent から Observability Pipelines Worker に送信されたログを収集する。
- Observability Pipelines Worker を経由してくるログにタグを付ける。これは、クラスターを更新する際に、どのトラフィックがまだ Worker に移行する必要があるかを判断するのに役立ちます。これらのタグはまた、不均衡がある場合に備えて、ログがロードバランサーを介してルーティングされている方法を示しています。
- Worker を経由するログのステータスを修正する。Datadog Agent がコンテナからログを収集する方法のため、提供される `.status` 属性はメッセージの実際のレベルを適切に反映しません。これは、Worker からログを受信するバックエンドでのパースルールの問題を防ぐために削除されます。
- Datadog メトリクスとログの両方にデータをデュアルシッピングすることで、ログをルーティングする。

例示された構成において、以下の 2 つは重要なコンポーネントとなっています。
- `logs_parse_ddtags`: 文字列に格納されているタグを構造化データにパースします。
- `logs_finish_ddtags`: Datadog Agent が送信するような形式になるようにタグを再エンコードします。

内部的には、Datadog Agent はログタグを 1 つの文字列の CSV として表現します。これらのタグを効果的に操作するには、取り込みエンドポイントに送信する前に、パース、修正、そして再エンコードする必要があります。これらのステップは、これらのアクションを自動的に実行するように設計されています。パイプラインに加える修正、特にタグの操作に関しては、この 2 つのステップの間に行う必要があります。

### メトリクスの処理
提供されるメトリクスパイプラインは、追加のパースおよび再エンコード手順を必要としません。ログパイプラインと同様に、トラフィックアカウンティングの目的で、受信したメトリクスにタグを付けます。カーディナリティが増えるため、カスタムメトリクスではコストに影響することがあります。

この時点で、環境は、データが流れる Observability Pipelines 用に構成されています。特定のユースケースにはさらなる構成が必要になる可能性がありますが、提供されているツールはその出発点となります。

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/observability_pipelines/#what-is-observability-pipelines-and-the-observability-pipelines-worker
[2]: /ja/account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/observability-pipelines/create