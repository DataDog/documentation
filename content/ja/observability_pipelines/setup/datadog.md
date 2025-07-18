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

## 概要

[観測可能性パイプラインワーカー][1]は、ログやメトリクスをあらゆるソースからあらゆる宛先に収集、処理、ルーティングすることができます。Datadog を使用することで、観測可能性パイプラインワーカーデプロイのすべてをスケールアップして構築・管理することができます。

このガイドでは、一般的なツールのクラスターにワーカーをデプロイし、Datadog Agent がワーカーにログとメトリクスを送信するように構成する方法を説明します。

{{< img src="observability_pipelines/setup/opw-dd-pipeline.png" alt="観測可能性パイプラインアグリゲーターを通してデータを送信するいくつかのワークロードクラスターの図。" >}}

## 仮定
* すでに Datadog を使用していて、観測可能性パイプラインを使用したい。
* 観測可能性パイプラインワーカーがデプロイされるクラスターや、集計されるワークロードへの管理アクセス権がある。
* 環境には一般的なツールまたはセキュリティクラスターがあり、他のすべてのクラスターはこれに接続されている。

## 前提条件
インストールする前に、以下があることを確認してください。

* 有効な [Datadog API キー][2]。
* パイプライン ID。

[観測可能性パイプライン][3]で、この 2 つを生成することができる。

### プロバイダー固有の要件
{{< tabs >}}
{{% tab "Docker" %}}
マシンが Docker を実行するように構成されていることを確認します。
{{% /tab %}}
{{% tab "AWS EKS" %}}
Kubernetes ノードでワーカーを実行するには、1 つの CPU と 512MB RAM が利用可能なノードが最低 2 台必要です。Datadog は、ワーカー用に別のノードプールを作成することを推奨しており、これは本番デプロイのための推奨構成でもあります。

* [AWS ロードバランサーコントローラー][1]が必要です。インストールされているかどうかは、以下のコマンドを実行し、リストの中に `aws-load-balancer-controller` があるかどうかで確認することができます。

  ```shell
  helm list -A
  ```
* Datadog では、Amazon EKS >= 1.16 を使用することを推奨しています。

[1]: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html
{{% /tab %}}
{{% tab "Azure AKS" %}}
Kubernetes ノードでワーカーを実行するには、1 つの CPU と 512MB RAM が利用可能なノードが最低 2 台必要です。Datadog は、ワーカー用に別のノードプールを作成することを推奨しており、これは本番デプロイのための推奨構成でもあります。
{{% /tab %}}
{{% tab "Google GKE" %}}
Kubernetes ノードでワーカーを実行するには、1 つの CPU と 512MB RAM が利用可能なノードが最低 2 台必要です。Datadog は、ワーカー用に別のノードプールを作成することを推奨しており、これは本番デプロイのための推奨構成でもあります。
{{% /tab %}}
{{% tab "APT ベースの Linux" %}}
APT ベースの Linux には、プロバイダー固有の要件はありません。
{{% /tab %}}
{{% tab "RPM ベースの Linux" %}}
RPM ベースの Linux には、プロバイダー固有の要件はありません。
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
AWS アカウントでワーカーを実行するには、そのアカウントの管理者権限が必要です。ワーカーインスタンスを実行するために、以下の情報を収集します。
* インスタンスが実行される VPC ID。
* インスタンスが実行されるサブネット ID。
* VPC が置かれている AWS リージョン。
{{% /tab %}}
{{< /tabs >}}

## 観測可能性パイプラインワーカーのインストール

{{< tabs >}}
{{% tab "Docker" %}}

観測可能性パイプラインワーカー Docker イメージは[こちら][1]の Docker Hub に公開されています。

1. [サンプルパイプラインコンフィギュレーションファイル][2]をダウンロードします。

2. 以下のコマンドを実行して、Docker で観測可能性パイプラインワーカーを起動します。
    ```
    docker run -i -e DD_API_KEY=<API_KEY> \
      -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
      -e DD_SITE=<SITE> \
      -p 8282:8282 \
      -v ./pipeline.yaml:/etc/observability-pipelines-worker/pipeline.yaml:ro \
      datadog/observability-pipelines-worker run
    ```
   `<API_KEY>` は Datadog API キー、`<PIPELINES_ID>` は観測可能性パイプライン構成 ID、`<SITE>` は {{< region-param key="dd_site" code="true" >}} に置き換えてください。`./pipeline.yaml` には、ステップ 1 でダウンロードした構成の相対パスまたは絶対パスを指定します。

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
1. 以下のコマンドを実行し、APT が HTTPS でダウンロードするように設定します。

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

3. 以下のコマンドを実行し、ローカルの `apt` リポジトリを更新し、ワーカーをインストールします。

    ```
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```

4. キーとサイト ({{< region-param key="dd_site" code="true" >}}) をワーカーの環境変数に追加します。

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

2. パッケージを更新し、ワーカーをインストールします。

    ```
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```

3. キーとサイト ({{< region-param key="dd_site" code="true" >}}) をワーカーの環境変数に追加します。

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    EOF
    ```

4. ホストの `/etc/observability-pipelines-worker/pipeline.yaml` に[サンプルコンフィギュレーションファイル][1]をダウンロードします。

5. ワーカーを起動します。
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
このサンプル構成を使って、既存の Terraform にワーカーモジュールをセットアップします。`vpc-id`、`subnet-ids`、`region` の値を AWS のデプロイに合わせて更新します。パイプラインに合わせて `datadog-api-key` と `pipeline-id` の値を更新します。

```
module "opw" {
    source = "git::https://github.com/DataDog/opw-terraform//aws"
    vpc-id     = "{VPC ID}"
    subnet-ids = ["{SUBNET ID 1}", "{SUBNET ID 2}"]
    region     = "{REGION}"

    datadog-api-key = "{DATADOG API KEY}"
    pipeline-id = "{OP PIPELINE ID}"
    pipeline-config = <<EOT
## SOURCES: 観測可能性パイプラインワーカーがデータを収集するデータソース。
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
## これは OP ワーカーのデプロイメントの大半に対して機能し、
## ほとんど調整の必要はないはずです。もし変更する場合は、必ず `ebs-drive-size-gb` パラメーターを
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

#### クロスアベイラビリティゾーンロードバランシング
提供されている Helm の構成は、ロードバランシングを簡素化しようとしていますが、クロス AZ トラフィックの潜在的な価格的影響を考慮する必要があります。可能な限り、サンプルは複数のクロス AZ ホップが起こりうる状況を作らないようにしています。

サンプルの構成では、このコントローラーで利用可能なクロスゾーンのロードバランシング機能は有効になっていません。これを有効にするには、`service` ブロックに以下のアノテーションを追加します。

```
service.beta.kubernetes.io/aws-load-balancer-attributes: load_balancing.cross_zone.enabled=true
```

詳しくは [AWS ロードバランサーコントローラー][2]をご覧ください。

[1]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/
[2]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/guide/service/annotations/#load-balancer-attributes
{{% /tab %}}
{{% tab "Azure AKS" %}}
クラウドプロバイダーが提供するロードバランサーを使用します。
これらは、デフォルトの Helm セットアップで構成されているオートスケーリングイベントに基づいて調整されます。ロードバランサーは内部向けなので、ネットワーク内にしかアクセスできません。

Datadog Agent の構成時に Helm から渡されたロードバランサーの URL を使用します。

#### クロスアベイラビリティゾーンロードバランシング
提供されている Helm の構成は、ロードバランシングを簡素化しようとしていますが、クロス AZ トラフィックの潜在的な価格的影響を考慮する必要があります。可能な限り、サンプルは複数のクロス AZ ホップが起こりうる状況を作らないようにしています。
{{% /tab %}}
{{% tab "Google GKE" %}}
クラウドプロバイダーが提供するロードバランサーを使用します。 これらは、デフォルトの Helm セットアップで構成されているオートスケーリングイベントに基づいて調整されます。ロードバランサーは内部向けなので、ネットワーク内にしかアクセスできません。

Datadog Agent の構成時に Helm から渡されたロードバランサーの URL を使用します。

#### クロスアベイラビリティゾーンロードバランシング
提供されている Helm の構成は、ロードバランシングを簡素化しようとしていますが、クロス AZ トラフィックの潜在的な価格的影響を考慮する必要があります。可能な限り、サンプルは複数のクロス AZ ホップが起こりうる状況を作らないようにしています。

グローバルアクセスは、共有ツールクラスターで使用するために必要であると考えられるため、デフォルトで有効になっています。
{{% /tab %}}
{{% tab "APT ベースの Linux" %}}
シングルマシンでのインストールのため、ロードバランシングのビルトインサポートは提供されません。ロードバランサーのプロビジョニングは、お客様の会社の標準に従って行ってください。
{{% /tab %}}
{{% tab "RPM ベースの Linux" %}}
シングルマシンでのインストールのため、ロードバランシングのビルトインサポートは提供されません。ロードバランサーのプロビジョニングは、お客様の会社の標準に従って行ってください。
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
NLB は Terraform モジュールによってプロビジョニングされ、インスタンスを指すようにプロビジョニングされます。DNS アドレスは Terraform の `lb-dns` 出力で返されます。 {{% /tab %}}
{{< /tabs >}}


### バッファリング
観測可能性パイプラインには複数のバッファリング戦略があり、ダウンストリーム障害に対するクラスターの耐性を高めることができます。提供されているサンプル構成では、ディスクバッファを使用していますが、その容量は、観測可能性パイプラインのデプロイメントにおいて、10Mbps/コアのデータレートで約 10 分間のデータを保持できるように評価されています。これは、一過性の問題が解決するまでの時間や、インシデント対応担当者が観測可能性データに対して何をすべきかを判断するのに十分な時間であることが多いでしょう。

{{< tabs >}}
{{% tab "Docker" %}}
デフォルトでは、観測可能性パイプラインワーカーのデータディレクトリは `/var/lib/observability-pipelines-worker` に設定されています。ホストマシンがコンテナのマウントポイントに十分なストレージ容量を割り当てていることを確認してください。
{{% /tab %}}
{{% tab "AWS EKS" %}}
AWS の場合、Datadog は `io2` EBS ドライブファミリーの使用を推奨しています。また、`gp3` ドライブを使用することも可能です。
{{% /tab %}}
{{% tab "Azure AKS" %}}
Azure AKS の場合、Datadog は `default` (`managed-csi` とも呼ばれる) ディスクの使用を推奨しています。
{{% /tab %}}
{{% tab "Google GKE" %}}
Google GKE では、Datadog は SSD でバックアップされた `premium-rwo` ドライブクラスの使用を推奨しています。HDD でバックアップされたクラスである `standard-rwo` は、バッファが有用であるために十分な書き込み性能を提供しない可能性があります。
{{% /tab %}}
{{% tab "APT ベースの Linux" %}}
デフォルトでは、観測可能性パイプラインワーカーのデータディレクトリは `/var/lib/observability-pipelines-worker` に設定されています。サンプルの構成を使用する場合は、バッファリングに使用できる容量が少なくとも 288GB あることを確認する必要があります。

可能であれば、その場所に別の SSD をマウントすることをお勧めします。
{{% /tab %}}
{{% tab "RPM ベースの Linux" %}}
デフォルトでは、観測可能性パイプラインワーカーのデータディレクトリは `/var/lib/observability-pipelines-worker` に設定されています。サンプルの構成を使用する場合は、バッファリングに使用できる容量が少なくとも 288GB あることを確認する必要があります。

可能であれば、その場所に別の SSD をマウントすることをお勧めします。 {{% /tab %}}
{{% tab "Terraform (AWS)" %}}
デフォルトでは、各インスタンスに 288GB の EBS ドライブが割り当てられており、上記のサンプル構成では、これをバッファリングに使用するように設定されています。
{{% /tab %}}
{{< /tabs >}}

## Datadog Agent を観測可能性パイプラインワーカーに接続する
Datadog Agent のログとメトリクスを観測可能性パイプラインワーカーに送信するには、以下のように Agent の構成を更新してください。

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

Terraform のインストールでは、`lb-dns` 出力が必要な値を提供します。

この時点で、観測可能性データはワーカーに送られ、データ処理に利用できるようになっているはずです。次のセクションでは、デフォルトで含まれている処理と、利用可能な追加オプションについて説明します。

## データを活用する
提供されるサンプル構成には、観測可能性パイプラインツールを示す処理手順の例があり、Datadog に送られるデータが正しいフォーマットであることを保証します。

### ログの処理
観測可能性パイプラインのサンプル構成は以下を実行します。
- Datadog Agent から観測可能性パイプラインワーカーに送信されたログを収集する。
- 観測可能性パイプラインワーカーを経由してくるログにタグを付ける。これは、クラスターを更新する際に、どのトラフィックがまだワーカーに移行する必要があるかを判断するのに役立ちます。これらのタグはまた、不均衡がある場合に備えて、ログがロードバランサーを介してルーティングされている方法を示しています。
- ワーカーを経由するログのステータスを修正する。Datadog Agent がコンテナからログを収集する方法のため、提供される `.status` 属性はメッセージの実際のレベルを適切に反映しません。これは、ワーカーからログを受信するバックエンドでのパースルールの問題を防ぐために削除されます。
- Datadog メトリクスとログの両方にデータをデュアルシッピングすることで、ログをルーティングする。

構成例では、次の 2 つが重要なコンポーネントとなっています。
- `logs_parse_ddtags`: 文字列に格納されているタグを構造化データにパースします。
- `logs_finish_ddtags`: Datadog Agent が送信するような形式になるようにタグを再エンコードします。

内部的には、Datadog Agent はログタグを 1 つの文字列の CSV として表現します。これらのタグを効果的に操作するには、取り込みエンドポイントに送信する前に、パース、修正、そして再エンコードする必要があります。これらのステップは、これらのアクションを自動的に実行するように設計されています。パイプラインに加える修正、特にタグの操作に関しては、この 2 つのステップの間に行う必要があります。

### メトリクスの処理
提供されるメトリクスパイプラインは、追加のパースおよび再エンコード手順を必要としません。ログパイプラインと同様に、トラフィックアカウンティングの目的で、受信したメトリクスにタグを付けます。カーディナリティが増えるため、カスタムメトリクスではコストに影響することがあります。

この時点で、環境は、データが流れる観測可能性パイプライン用に構成されています。特定のユースケースにはさらなる構成が必要になる可能性がありますが、提供されているツールはその出発点となります。

## 参考資料
{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/observability_pipelines/#what-is-observability-pipelines-and-the-observability-pipelines-worker
[2]: /ja/account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/observability-pipelines/create