---
aliases:
- /ja/agent/vector_aggregation/
- /ja/integrations/observability_pipelines/integrate_vector_with_datadog/
- /ja/observability_pipelines/integrate_vector_with_datadog/
- /ja/observability_pipelines/integrations/integrate_vector_with_datadog/
- /ja/observability_pipelines/production_deployment_overview/integrate_datadog_and_the_observability_pipelines_worker/
- /ja/agent/vector_aggregation/
further_reading:
- link: /integrations/observability_pipelines/integrate_vector_with_datadog/
  tag: ドキュメント
  text: 観測可能性パイプラインワーカーの本番デプロイ設計と原則
- link: https://dtdg.co/d22op
  tag: ラーニングセンター
  text: 観測可能性パイプラインによる安心・安全なローカル処理
title: (レガシー) Datadog で Observability Pipelines をセットアップする
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Observability Pipelines は US1-FED Datadog サイト では利用できません。</div> 
{{< /site-region >}} 
 
{{% observability_pipelines/legacy_warning %}} 
 
## 概要 
 
[Observability Pipelines Worker][1] は、ログを収集、処理し、あらゆるソースからあらゆる宛先へルーティングできます。Datadog を使用することで、Observability Pipelines Worker のすべてのデプロイメントを大規模に構築および管理できます。 
 
このガイドでは、共通ツールクラスターに Worker をデプロイし、Datadog Agent を構成してログとメトリクスを Worker に送信する方法を説明します。 
 
{{< img src="observability_pipelines/setup/opw-dd-pipeline.png" alt="Observability Pipelines アグリゲーター を通じてデータを送信する複数のワークロードクラスターの図。" >}} 
 
## デプロイメントモード 
 
{{% op-deployment-modes %}} 
 
## 前提条件 
* すでに Datadog を使用しており、Observability Pipelines を利用したい。 
* Observability Pipelines Worker がデプロイされるクラスター、および集約されるワークロードに管理者アクセス権がある。 
* すべての他のクラスターが接続されている環境の共通ツールまたはセキュリティクラスターがある。 
 
## 必要条件 
インストールする前に、以下があることを確認してください。 
 
* 有効な [Datadog API キー][2]。 
* パイプライン ID。 
 
これらは [Observability Pipelines][3] で生成できます。 
 
### プロバイダー固有の要件 
{{< tabs >}} 
{{% tab "Docker" %}} 
マシンが Docker を実行するように構成されていることを確認してください。 
{{% /tab %}} 
{{% tab "AWS EKS" %}} 
Kubernetes ノードで Worker を実行するには、最低でも 1 CPU と 512MB の RAM を持つ 2 つのノードが必要です。Datadog は、Worker 用の別個のノードプールを作成することを推奨しており、これは本番環境デプロイメントの推奨構成でもあります。 
 
* [EBS CSI ドライバー][1]が必要です。インストールされているか確認するには、次のコマンドを実行し、リストに `ebs-csi-controller` があるか確認します。 
 
  ```shell
  kubectl get pods -n kube-system
  ``` 
 
* Workers が適切な EBS ドライブをプロビジョニングするために、`StorageClass` が必要です。インストールされているか確認するには、次のコマンドを実行し、リストに `io2` があるか確認します。 
 
  ```shell
  kubectl get storageclass
  ``` 
 
  `io2` が存在しない場合、[StorageClass YAML][2] をダウンロードして `kubectl apply` で適用します。 
 
* [AWS Load Balancer コントローラー][3]が必要です。インストールされているか確認するには、次のコマンドを実行し、リストに `aws-load-balancer-controller` があるか確認します。 
 
  ```shell
  helm list -A
  ``` 
* Datadog は Amazon EKS >= 1.16 の使用を推奨しています。 
 
本番環境レベルの要件については、[OPW アグリゲーターアーキテクチャのベストプラクティス][4]を参照してください。 
 
[1]: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html 
[2]: /resources/yaml/observability_pipelines/helm/storageclass.yaml 
[3]: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html 
[4]: /ja/observability_pipelines/legacy/architecture/ 
 
{{% /tab %}} 
{{% tab "Azure AKS" %}} 
Kubernetes ノードで Worker を実行するには、最低でも 1 CPU と 512MB の RAM を持つ 2 つのノードが必要です。Datadog は、Worker 用の別個のノードプールを作成することを推奨しており、これは本番環境デプロイメントの推奨構成でもあります。 
 
本番環境レベルの要件については、[OPW アグリゲーターアーキテクチャのベストプラクティス][1]を参照してください。 
 
[1]: /ja/observability_pipelines/legacy/architecture/ 
{{% /tab %}} 
{{% tab "Google GKE" %}} 
Kubernetes ノードで Worker を実行するには、最低でも 1 CPU と 512MB の RAM を持つ 2 つのノードが必要です。Datadog は、Worker 用の別個のノードプールを作成することを推奨しており、これは本番環境デプロイメントの推奨構成でもあります。 
 
本番環境レベルの要件については、[OPW アグリゲーターアーキテクチャのベストプラクティス][1]を参照してください。 
 
[1]: /ja/observability_pipelines/legacy/architecture/ 
{{% /tab %}} 
{{% tab "APT ベースの Linux" %}} 
APT ベースの Linux にはプロバイダー固有の要件はありません。 
{{% /tab %}} 
{{% tab "RPM ベースの Linux" %}} 
RPM ベースの Linux にはプロバイダー固有の要件はありません。 
{{% /tab %}} 
{{% tab "Terraform (AWS)" %}} 
Worker を AWS アカウントで実行するには、そのアカウントへの管理者アクセスが必要です。Worker インスタンスを実行するために次の情報を収集してください。 
* インスタンスが実行される VPC ID。 
* インスタンスが実行されるサブネット ID。 
* VPC がある AWS リージョン。 
{{% /tab %}} 
{{% tab "CloudFormation" %}} 
 
<div class="alert alert-danger">CloudFormation インストールは Remote Configuration のみをサポートします。</div> 
<div class="alert alert-warning">CloudFormation インストールは非本番環境レベルのワークロードにのみ使用してください。</div>

Worker を AWS アカウントで実行するには、そのアカウントへの管理者アクセスが必要です。Worker インスタンスを実行するために次の情報を収集してください。
* インスタンスが実行される VPC ID。
* インスタンスが実行されるサブネット ID。
* VPC が置かれている AWS リージョン。
{{% /tab %}}
{{< /tabs >}}

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
      -p 8282:8282 \
      -v ./pipeline.yaml:/etc/observability-pipelines-worker/pipeline.yaml:ro \
      datadog/observability-pipelines-worker run
    ```
   `<API_KEY>` を Datadog API キーに、`<PIPELINES_ID>` を Observability Pipelines 構成 ID に、`<SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えてください。`./pipeline.yaml` はステップ 1 でダウンロードした構成への相対または絶対パスである必要があります。

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[2]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. AWS EKS 用の [Helm チャート値ファイル][1]をダウンロードします。

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
1. Azure AKS 用の [Helm チャート値ファイル][1]をダウンロードします。

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
1. Google GKE 用の [Helm チャート値ファイル][1]をダウンロードします。

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
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. 以下のコマンドを実行して、ローカルの `apt` リポジトリを更新し、Worker をインストールします。

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

3. キーとサイト ({{< region-param key="dd_site" code="true" >}}) を Worker の環境変数に追加します。

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

1. [サンプル構成][1]をダウンロードします。
1. サンプル構成を使用して既存の Terraform に Worker モジュールをセットアップします。`vpc-id`、`subnet-ids`、`region` の値を構成の AWS デプロイメントに合わせて更新します。また、`datadog-api-key` と `pipeline-id` の値をパイプラインに合わせて更新します。

[1]: /resources/yaml/observability_pipelines/datadog/terraform_opw_datadog.tf

{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-warning">CloudFormation インストールは非本番環境レベルのワークロードにのみ使用してください。</div>

Worker を AWS アカウントにインストールするには、CloudFormation テンプレートを使用してスタックを作成します。

  1. Worker 用の [CloudFormation テンプレート][1]をダウンロードします。

  2. **CloudFormation console** で、**Create stack** をクリックし、**With new resources (standard)** オプションを選択します。

  3. **Template is ready** オプションが選択されていることを確認し、**Upload a template file** を選択します。 **Choose file** をクリックして、先ほどダウンロードした CloudFormation テンプレートファイルを追加します。**Next** をクリックします。

  4. **Specify stack details** で、スタックの名前を入力します。

  5. CloudFormation テンプレートのパラメーターを入力します。特に注意が必要なものがあります。

      * `APIKey` と `PipelineID` には、前の必要条件セクションで取得したキーと ID を入力します。

      * `VPCID` と `SubnetIDs` には、以前に選択したサブネットと VPC を入力します。

      * 他のパラメーターは Worker デプロイメントのための妥当なデフォルトに設定されていますが、必要に応じて調整できます。

  6. **Next** をクリックします。

  7. パラメーターが正しいことを確認し、IAM の必要な権限のチェックボックスをクリックし、**Submit** をクリックしてスタックを作成します。

CloudFormation はここでインストールを処理します。Worker インスタンスは起動し、必要なソフトウェアをダウンロードし、自動的に実行を開始します。

[1]: /resources/yaml/observability_pipelines/cloudformation/datadog.yaml
{{% /tab %}}
{{< /tabs >}}

サンプル構成で使用されるソース、トランスフォーム、シンクの詳細については、[構成][4]を参照してください。データの変換に関する詳細は、[データの操作][5]を参照してください。

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

Datadog Agent の構成時に Helm から渡されたロードバランサーの URL を使用します。

Worker をスケーリングする際のロードバランサーの推奨事項については、[容量計画とスケーリング][1]を参照してください。

#### クロスアベイラビリティゾーンロードバランシング
提供されている Helm の構成は、ロードバランシングの簡素化を目指していますが、クロス AZ (アヴェイラビリティーゾーン) トラフィックの潜在的な価格的影響を考慮する必要があります。可能な限り、サンプルは複数のクロス AZ ホップが起こりうる状況を避けるよう努めています。

[1]: /ja/observability_pipelines/legacy/architecture/capacity_planning_scaling/
{{% /tab %}}
{{% tab "Google GKE" %}}
クラウドプロバイダーが提供するロードバランサーを使用します。
それらはデフォルトの Helm セットアップが構成されたオートスケーリングイベントに基づいて調整されます。ロードバランサーは内部向けであり、ネットワーク内でのみアクセス可能です。

Datadog Agent の構成時に Helm から渡されたロードバランサーの URL を使用します。

Worker をスケーリングする際のロードバランサーの推奨事項については、[容量計画とスケーリング][1]を参照してください。

#### クロスアベイラビリティゾーンロードバランシング
提供されている Helm の構成は、ロードバランシングの簡素化を目指していますが、クロス AZ (アヴェイラビリティーゾーン) トラフィックの潜在的な価格的影響を考慮する必要があります。可能な限り、サンプルは複数のクロス AZ ホップが起こりうる状況を避けるよう努めています。

グローバルアクセスはデフォルトで有効になっています。これは共有ツールクラスターで必要とされる可能性が高いためです。

[1]: /ja/observability_pipelines/legacy/architecture/capacity_planning_scaling/
{{% /tab %}}
{{% tab "APT-based Linux" %}}
インストールの単一マシンの性質上、ロードバランシングの組み込みサポートは提供されていません。会社の基準を使用して独自のロードバランサーをプロビジョニングする必要があります。
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
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

Terraform インストールの場合、`lb-dns` 出力が必要な値を提供します。CloudFormation インストールの場合、`LoadBalancerDNS` CloudFormation 出力に正しい URL があります。

この時点で、可観測性データは Worker に送られ、データ処理が可能です。

## デプロイメントモードの更新

{{% op-updating-deployment-modes %}}

## データを活用する
提供されたサンプル構成には、Observability Pipelines のツールを示し、Datadog に送信されるデータが正しい形式であることを保証する例の処理ステップが含まれています。

### ログの処理
サンプルの Observability Pipelines 構成は次のことを行います。
- Observability Pipelines Worker に Datadog Agent から送信されたログを収集します。
- Observability Pipelines Worker を通過するログにタグを付けます。これは、クラスターを更新する際に、まだ Worker にシフトする必要があるトラフィックを判断するのに役立ちます。また、ロードバランサーを通じてログがどのようにルーティングされているかを示し、バランスの不均衡がある場合に役立ちます。
- Worker を通過するログのステータスを修正します。Datadog Agent がコンテナからログを収集する方法のため、提供された `.status` 属性はメッセージの実際のレベルを正しく反映していません。これは、ログが Worker から受信されるバックエンドのパースルールで問題が発生するのを防ぐために削除されます。

構成例には、次の 2 つの重要なコンポーネントがあります。
- `logs_parse_ddtags`: 文字列に格納されているタグを構造化データにパースします。
- `logs_finish_ddtags`: Datadog Agent が送信するような形式になるようにタグを再エンコードします。

内部的には、Datadog Agent はログタグを 1 つの文字列の CSV として表現します。これらのタグを効果的に操作するには、取り込みエンドポイントに送信する前に、パース、修正、そして再エンコードする必要があります。これらのステップは、これらのアクションを自動的に実行するように設計されています。パイプラインに加える修正、特にタグの操作に関しては、この 2 つのステップの間に行う必要があります。

この時点で、環境は Observability Pipelines 用に構成されており、データが流れています。特定のユースケースに合わせてさらに構成が必要な場合がありますが、提供されたツールが出発点を提供します。

## 参考資料
{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/observability_pipelines/legacy/
[2]: /ja/account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/observability-pipelines/create
[4]: /ja/observability_pipelines/legacy/configurations/
[5]: /ja/observability_pipelines/legacy/working_with_data/