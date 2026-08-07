---
aliases:
- /ja/observability_pipelines/setup/datadog_with_archiving/
further_reading:
- link: /observability_pipelines/legacy/production_deployment_overview/
  tag: ドキュメント
  text: 観測可能性パイプラインワーカーの本番デプロイ設計と原則
- link: https://dtdg.co/d22op
  tag: ラーニングセンター
  text: 観測可能性パイプラインによる安心・安全なローカル処理
title: (レガシー) Observability Pipelines をセットアップして、Datadog で再ハイドレート可能な形式でログを Amazon S3
  と Datadog に送信する
---

{{% observability_pipelines/legacy_warning %}}

## 概要

[Observability Pipelines Worker][1] は、ログの収集、処理、およびあらゆるソースからあらゆる宛先へのルーティングを行うことができます。Datadog を使用することで、Observability Pipelines Worker のすべてのデプロイを大規模に構築および管理できます。

このガイドでは、共通ツールクラスターに Worker をデプロイし、これを構成してログを Datadog で再ハイドレート可能な形式でクラウドストレージに送信してアーカイブする方法を説明します。

## デプロイメントモード

{{% op-deployment-modes %}}

## 仮定
* すでに Datadog を使用していて、観測可能性パイプラインを使用したい。
* 観測可能性パイプラインワーカーがデプロイされるクラスターや、集計されるワークロードへの管理アクセス権がある。
* すべての他のクラスターが接続されている環境の共通ツールクラスターまたはセキュリティクラスターを持っている。

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

Kubernetes ノードでワーカーを実行するには、1 つの CPU と 512MB RAM が利用可能なノードが最低 2 台必要です。Datadog は、ワーカー用に別のノードプールを作成することを推奨しており、これは本番デプロイのための推奨構成でもあります。

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

本番レ環境ベルの要件については、[OPW アグリゲーターアーキテクチャのベストプラクティス][6]を参照してください。

[1]: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html
[2]: /resources/yaml/observability_pipelines/helm/storageclass.yaml
[3]: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html
[6]: /ja/observability_pipelines/legacy/architecture/

{{% /tab %}}
{{% tab "APT ベースの Linux" %}}

APT ベースの Linux にはプロバイダー固有の要件はありません。

{{% /tab %}}
{{% tab "RPM ベースの Linux" %}}

APT ベースの Linux にはプロバイダー固有の要件はありません。

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

AWS アカウントで Worker を実行するには、そのアカウントへの管理者アクセス権と以下の情報が必要です。

* インスタンスが実行される VPC ID。
* インスタンスが実行されるサブネット ID。
* VPC が置かれている AWS リージョン。

{{% /tab %}}
{{< /tabs >}}

## Log Archives のセットアップ

後で [Observability Pipelines Worker をインストール](#install-the-observability-pipelines-worker)するときに、提供されるサンプル構成には Datadog で再ハイドレート可能な形式でログを Amazon S3 に送信するためのシンクが含まれています。この構成を使用するには、アーカイブ用の S3 バケットを作成し、Worker が S3 バケットに書き込むことを許可する IAM ポリシーをセットアップします。次に、S3 バケットを Datadog Log Archives に接続します。

{{% site-region region="us,us3,us5" %}}
[AWS 料金][1]を参照して、リージョン間データ転送料金とクラウドストレージコストへの影響を確認してください。

[1]: https://aws.amazon.com/s3/pricing/
{{% /site-region %}}

### S3 バケットを作成し、IAM ポリシーをセットアップする

{{< tabs >}}
{{% tab "Docker" %}}

{{% op-datadog-archives-s3-setup %}}

3. IAM ユーザーを作成し、上記のポリシーを関連付けます。IAM ユーザーのアクセス資格情報を作成します。これらの資格情報を `AWS_ACCESS_KEY` と `AWS_SECRET_ACCESS_KEY` として保存します。

{{% /tab %}}
{{% tab "AWS EKS" %}}

{{% op-datadog-archives-s3-setup %}}

3. 上記で作成したポリシーを使用するための[サービスアカウントを作成][1]します。

[1]: https://docs.aws.amazon.com/eks/latest/userguide/associate-service-account-role.html

{{% /tab %}}
{{% tab "APT ベースの Linux" %}}

{{% op-datadog-archives-s3-setup %}}

3. IAM ユーザーを作成し、上記のポリシーを関連付けます。IAM ユーザーのアクセス資格情報を作成します。これらの資格情報を `AWS_ACCESS_KEY` と `AWS_SECRET_ACCESS_KEY` として保存します。

{{% /tab %}}
{{% tab "RPM ベースの Linux" %}}

{{% op-datadog-archives-s3-setup %}}

3. IAM ユーザーを作成し、上記のポリシーを関連付けます。IAM ユーザーのアクセス資格情報を作成します。これらの資格情報を `AWS_ACCESS_KEY_ID` と `AWS_SECRET_ACCESS_KEY` として保存します。

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

{{% op-datadog-archives-s3-setup %}}

3. Terraform で作成された IAM インスタンスプロファイルにポリシーを関連付けます。これは `iam-role-name` 出力で見つけることができます。

{{% /tab %}}
{{< /tabs >}}

### S3 バケットを Datadog Log Archives に接続する

後でアーカイブを再ハイドレートできるように、先ほど作成した S3 バケットを Datadog Log Archives に接続する必要があります。

1. Datadog の [Log Forwarding][5] に移動します。
1. **+ New Archive** をクリックします。
1. わかりやすいアーカイブ名を入力します。
1. ログパイプラインを通過するすべてのログをフィルタリングして、このアーカイブにそれらのログが入らないようにするクエリを追加します。例えば、クエリ `observability_pipelines_read_only_archive` を追加します。これは、パイプラインを通過するログにはこのタグが追加されていないと仮定して設定されています。
1. **AWS S3** を選択します。
1. バケットが存在する AWS アカウントを選択します。
1. S3 バケットの名前を入力します。
1. オプションでパスを入力します。
1. 確認文をチェックします。
1. オプションで、タグを追加し、再ハイドレートのための最大スキャンサイズを定義します。詳細については、[高度な設定][6]を参照してください。
1. **Save** をクリックします。

追加情報については、[Log Archives ドキュメント][7]を参照してください。

### 観測可能性パイプラインワーカーのインストール

{{< tabs >}}
{{% tab "Docker" %}}

Observability Pipelines Worker の Docker イメージは Docker Hub の[こちら][1]に公開されています。

1. [サンプルパイプラインコンフィギュレーションファイル][2]をダウンロードします。

2. Docker で Observability Pipelines Worker を起動するには、次のコマンドを実行します。

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
    - `<API_KEY>` を Datadog API キーに。
    - `<PIPELINES_ID>` を Observability Pipelines の構成 ID に。
    - `<SITE>` を {{< region-param key="dd_site" code="true" >}} に。
    - `AWS_ACCESS_KEY_ID` と `AWS_SECRET_ACCESS_KEY` を先ほど作成した AWS 資格情報に。
    - `<AWS_BUCKET_NAME>` をログを保存する S3 バケットの名前に。
    - `<BUCKET_AWS_REGION>` をターゲットサービスの [AWS リージョン][3] に。
    - `./pipeline.yaml` はステップ 1 でダウンロードした構成の相対または絶対パスである必要があります。

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[2]: /resources/yaml/observability_pipelines/archives/pipeline.yaml
[3]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. AWS EKS 用の [Helm チャート値ファイル][1]をダウンロードします。

2. Helm チャートで、これらのプレースホルダーを以下の情報で置き換えます。
    - `datadog.apiKey` を Datadog API キーに。
    - `datadog.pipelineId` を Observability Pipelines の構成 ID に。
    - `site` を {{< region-param key="dd_site" code="true" >}} に。
    - `serviceAccount.name` の `${DD_ARCHIVES_SERVICE_ACCOUNT}` をサービスアカウント名に。
    - `pipelineConfig.sinks.datadog_archives` の `${DD_ARCHIVES_BUCKET}` をログを保存する S3 バケットの名前に。
    - `pipelineConfig.sinks.datadog_archives` の `${DD_ARCHIVES_SERVICE_ACCOUNT}` を対象サービスの [AWS リージョン][2]に置き換えてください。

3. 以下のコマンドでクラスターにインストールします。

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

4. キーとサイト ({{< region-param key="dd_site" code="true" >}}) を Worker の環境変数に追加します。`<AWS_BUCKET_NAME>` をログを保存する S3 バケットの名前に、`<BUCKET_AWS_REGION>` をターゲットサービスの [AWS リージョン][2]に置き換えます。

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
    AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
    DD_ARCHIVES_BUCKET=<AWS_BUCKET_NAME>
    DD_ARCHIVES_SERVICE_ACCOUNT=<BUCKET_AWS_REGION>
    EOF
    ```

5. ホストの `/etc/observability-pipelines-worker/pipeline.yaml` に[サンプルコンフィギュレーションファイル][1]をダウンロードします。

6. ワーカーを起動します。
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
           https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
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

3. キーとサイト ({{< region-param key="dd_site" code="true" >}}) を Worker の環境変数に追加します。`<AWS_BUCKET_NAME>` をログを保存する S3 バケットの名前に、`<BUCKET_AWS_REGION>` をターゲットサービスの [AWS リージョン][2]に置き換えます。

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
    AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
    DD_ARCHIVES_BUCKET=<AWS_BUCKET_NAME>
    DD_ARCHIVES_SERVICE_ACCOUNT=<BUCKET_AWS_REGION>
    EOF
    ```

4. ホストの `/etc/observability-pipelines-worker/pipeline.yaml` に[サンプルコンフィギュレーションファイル][1]をダウンロードします。

5. ワーカーを起動します。
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/archives/pipeline.yaml
[2]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

1. [サンプル構成][1]をダウンロードします。
1. サンプル構成を使用して既存の Terraform に Worker モジュールをセットアップします。`vpc-id`、`subnet-ids`、`region` の値を構成の AWS デプロイメントに合わせて更新します。また、`datadog-api-key` と `pipeline-id` の値をパイプラインに合わせて更新します。

[1]: /resources/yaml/observability_pipelines/archives/terraform_opw_archives.tf
{{% /tab %}}
{{< /tabs >}}

### ロードバランシング

{{< tabs >}}
{{% tab "Docker" %}}
Docker の指示には本番環境向けのセットアップは含まれていません。代わりに、コンテナ化された環境でのロードバランシングに関する御社の基準を参照してください。ローカルマシンでテストしている場合、ロードバランサーの構成は不要です。
{{% /tab %}}
{{% tab "AWS EKS" %}}
クラウドプロバイダーが提供するロードバランサーを使用します。
ロードバランサーは、デフォルトの Helm セットアップで構成されているオートスケーリングイベントに基づいて調整されます。ロードバランサーは内部向けで、ネットワーク内でのみアクセス可能です。

Datadog Agent の構成時に Helm から渡されたロードバランサーの URL を使用します。

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

{{% tab "APT ベースの Linux" %}}
インストールが単一マシンの構成であるため、組み込みのロードバランシング機能はありません。御社の基準に従って、独自のロードバランサーをプロビジョニングしてください。
{{% /tab %}}
{{% tab "RPM ベースの Linux" %}}
インストールが単一マシンの構成であるため、組み込みのロードバランシング機能はありません。御社の基準に基づいて、独自のロードバランサーをプロビジョニングする必要があります。
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
Terraform モジュールはインスタンスに対応する NLB をプロビジョニングします。DNS アドレスは Terraform の `lb-dns` 出力に返されます。
{{% /tab %}}
{{< /tabs >}}

### バッファリング
Observability Pipelines には、ダウンストリームの障害に対するクラスターの耐性を高めるための複数のバッファリング戦略が含まれています。提供されるサンプル構成は、ディスクバッファを使用します。その容量は、Observability Pipelines デプロイメントでコアあたり 10Mbps で約 10 分間のデータを保持するように評価されています。これは、一時的な問題が解決するのに十分な時間であり、インシデント対応者が可観測性データに対して何をすべきかを決定するのにも役立ちます。

{{< tabs >}}
{{% tab "Docker" %}}
デフォルトでは、Observability Pipelines Worker のデータディレクトリは `/var/lib/observability-pipelines-worker` に設定されています。ホストマシンに、コンテナのマウントポイントに割り当てられた十分なストレージ容量があることを確認してください。
{{% /tab %}}
{{% tab "AWS EKS" %}}
AWS の場合、Datadog は `io2` EBS ドライブファミリーの使用を推奨します。代替として、`gp3` ドライブも使用できます。
{{% /tab %}}
{{% tab "APT ベースの Linux" %}}
デフォルトでは、Observability Pipelines Worker のデータディレクトリは `/var/lib/observability-pipelines-worker` に設定されています。サンプル構成を使用している場合、バッファリングのために少なくとも 288GB の空きスペースがあることを確認してください。

可能であれば、別の SSD をその場所にマウントすることを推奨します。
{{% /tab %}}
{{% tab "RPM ベースの Linux" %}}
デフォルトでは、Observability Pipelines Worker のデータディレクトリは `/var/lib/observability-pipelines-worker` に設定されています。サンプル構成を使用している場合、このディレクトリに少なくとも 288GB のスペースが利用可能であることを確認してください。

可能であれば、その場所に別の SSD をマウントすることをお勧めします。 {{% /tab %}}
{{% tab "Terraform (AWS)" %}}
デフォルトでは、各インスタンスに 288GB の EBS ドライブが割り当てられており、上記のサンプル構成では、これをバッファリングに使用するように設定されています。
{{% /tab %}}
{{< /tabs >}}

## Datadog Agent を Observability Pipelines Worker に接続する
Datadog Agent のログを Observability Pipelines Worker に送信するには、Agent 構成を次のように更新します。

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

この時点で、可観測性データは Worker に送信され、その後 S3 アーカイブに送られるはずです。

## デプロイメントモードの更新

{{% op-updating-deployment-modes %}}

## アーカイブを再ハイドレートする

[アーカイブからの再ハイドレート][4]を参照して、Datadog でアーカイブを再ハイドレートして、それらのログの分析と調査を開始する手順を確認してください。

## 参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/legacy/
[2]: /ja/account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/observability-pipelines/create
[4]: /ja/logs/log_configuration/rehydrating/
[5]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[6]: /ja/logs/log_configuration/archives/#advanced-settings
[7]: /ja/logs/log_configuration/archives