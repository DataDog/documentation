---
title: Synthetic テストをプライベートロケーションから実行する
kind: ドキュメント
description: Synthetic API テストとブラウザテストをプライベートロケーションから実行する
aliases:
- /synthetics/private_locations
further_reading:
    - link: "https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/"
      tag: ブログ
      text: Datadog で Synthetic プライベートロケーションを監視する
    - link: /getting_started/synthetics/private_location
      tag: ドキュメント
      text: プライベートロケーションの概要
    - link: /synthetics/private_locations/monitoring
      tag: ドキュメント
      text: プライベートロケーションを監視する
    - link: /synthetics/private_locations/dimensioning
      tag: ドキュメント
      text: プライベートロケーションのディメンション
    - link: /synthetics/api_tests
      tag: ドキュメント
      text: APIテストの設定
    - link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_private_location"
      tag: 外部サイト
      text: Terraform による Synthetic プライベートロケーションの作成と管理
---

## 概要

プライベートロケーションから、**内部用アプリケーションの監視や、パブリックインターネットから接続できないプライベートエンドポイントの監視**を行えます。これは以下にも使用できます。

* ビジネスでミッションクリティカルな領域に、**カスタム Synthetic ロケーションを作成します**。
* [Continuous Testing および CI/CD][1] を使用して本番環境に新機能をリリースする前に、**内部 CI 環境でアプリケーションパフォーマンスを確認します**。
* 内部ネットワークの内外両方から**アプリケーションのパフォーマンスを比較します**。

{{< img src="synthetics/private_locations/private_locations_worker_1.png" alt="Synthetic Monitoring におけるプライベートロケーションの仕組みを示すアーキテクチャ図" style="width:100%;">}}

プライベートロケーションは Docker コンテナまたは Windows サービスとして提供され、プライベートネットワーク内にインストールすることができます。プライベートロケーションを作成してインストールしたら、他のマネージドロケーションと同様に、[Synthetic テスト][2]を割り当てることができます。

プライベートロケーションワーカーは、HTTPS を使用してテストコンフィギュレーションを Datadog のサーバーからプルし、スケジュールまたはオンデマンドでテストを実行して、テスト結果を Datadog のサーバーに返します。次に、管理ロケーションから実行されているテストを視覚化する方法とまったく同じ方法で、プライベートロケーションのテスト結果を視覚化できます。

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Synthetic テストのプライベートロケーションへの割り当て" style="width:100%;">}}

## 前提条件

[Continuous Testing テスト][23]でプライベートロケーションを使用するには、v1.27.0 以降が必要です。

{{< tabs >}}
{{% tab "Docker" %}}

Private locations are Docker containers that you can install anywhere inside your private network. You can access the [private location worker image][101] on Docker hub. It can run on a Linux-based OS or Windows OS if the [Docker engine][102] is available on your host and can run in Linux containers mode.**\***

**\*** **このソフトウェアの使用および操作には、[こちら][103]から入手可能なエンドユーザーライセンス契約が適用されます。**

[101]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[102]: https://docs.docker.com/engine/install/
[103]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{% tab "Helm" %}}

プライベートロケーションは、Helm を使って Kubernetes クラスターにインストールできる Kubernetes デプロイメントです。[Helm チャート][101]は Linux ベースの Kubernetes 上で実行できます。

**注**: このソフトウェアの使用および操作には、[エンドユーザーライセンス契約][103]が適用されます。

[101]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location
[103]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{% tab "Windows" %}}

プライベートロケーションは、[MSI ファイル][101]を使用してプライベートネットワーク内の任意の場所にインストールできる Windows サービスです。プライベートロケーションをインストールしたい仮想マシンまたは物理マシンからこのファイルを実行します。**\***

**\*** **このソフトウェアの使用および操作には、[こちら][102]から入手可能なエンドユーザーライセンス契約が適用されます。**

このマシンの要件を以下の表に示します。プライベートロケーションワーカーをインストールするマシンでは、PowerShell スクリプトが有効になっている必要があります。

| System | 要件 |
|---|---|
| OS | Windows Server 2016、Windows Server 2019、または Windows 10。 |
| RAM | 最低 4GB。8GB 推奨。 |
| CPU | 64 ビット対応の Intel または AMD プロセッサー。2.8 GHz 以上のプロセッサーを推奨。 |

**注**: Windows プライベートロケーションでブラウザテストを実行するには、Windows コンピュータにブラウザ (例えば、Chrome、Edge、Firefox) がインストールされている必要があります。

MSI インストーラーを使用する前に、コンピューターに .NET バージョン 4.7.2 以降をインストールする必要があります。

{{< site-region region="gov" >}}

<div class="alert alert-danger"><code>ddog-gov.com</code> に報告するプライベートロケーションでは、FIPS 準拠はサポートされていません。この動作を無効にするには、<a href"="https://docs.datadoghq.com/synthetics/private_locations/configuration/?tab=docker#all-configuration-options"><code>--disableFipsCompliance</code>オプション</a>を使用してください。</div>

{{< /site-region >}}

[101]: https://dd-public-oss-mirror.s3.amazonaws.com/synthetics-windows-pl/datadog-synthetics-worker-1.48.0.amd64.msi
[102]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{< /tabs >}}

### Datadog プライベートロケーションエンドポイント

テストコンフィギュレーションを取得してテスト結果を送信するには、プライベートロケーションのワーカーが以下の Datadog API エンドポイントにアクセスする必要があります。

{{< site-region region="us" >}}

| ポート | エンドポイント                               | 説明                                                   |
| ---- | -------------------------------------- | ------------------------------------------------------------- |
| 443  | `intake.synthetics.datadoghq.com`      | [AWS Signature Version 4 プロトコル][1]に基づく社内プロトコルを使用して、テストコンフィギュレーションをプルし、テスト結果を Datadog にプッシュするためにプライベートロケーションで使用されます。 |
| 443  | バージョン 0.2.0 以降、1.4.0 以下は `intake-v2.synthetics.datadoghq.com`   | ブラウザのテストアーティファクト (スクリーンショット、エラー、リソースなど) をプッシュするためにプライベートロケーションで使用されます。       |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="eu" >}}

| ポート | エンドポイント                           | 説明                                                    |
| ---- | ---------------------------------- | -------------------------------------------------------------- |
| 443  | `intake.synthetics.datadoghq.eu`   | [AWS Signature Version 4 プロトコル][1]に基づく社内プロトコルを使用して、テストコンフィギュレーションをプルし、テスト結果を Datadog にプッシュするためにプライベートロケーションで使用されます。 |

**注**: これらのドメインは、静的 IP アドレスのセットを指しています。これらのアドレスは https://ip-ranges.datadoghq.eu にあります。

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="us3" >}}

| ポート | エンドポイント                                | 説明                                                                        |
| ---- | --------------------------------------- | ---------------------------------------------------------------------------------- |
| 443  | `intake.synthetics.us3.datadoghq.com`  | [AWS Signature Version 4 プロトコル][1]に基づく社内プロトコルを使用して、テストコンフィギュレーションをプルし、テスト結果を Datadog にプッシュするためにプライベートロケーションで使用されます。 |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="ap1" >}}

| ポート | エンドポイント                                | 説明                                                                        |
| ---- | --------------------------------------- | ---------------------------------------------------------------------------------- |
| 443  | `intake.synthetics.ap1.datadoghq.com`  | [AWS Signature Version 4 プロトコル][1]に基づく社内プロトコルを使用して、テストコンフィギュレーションをプルし、テスト結果を Datadog にプッシュするためにプライベートロケーションで使用されます。 |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="us5" >}}

| ポート | エンドポイント                              | 説明                                                    |
| ---- | ------------------------------------- | -------------------------------------------------------------- |
| 443  | `intake.synthetics.us5.datadoghq.com` | [AWS Signature Version 4 プロトコル][1]に基づく社内プロトコルを使用して、テストコンフィギュレーションをプルし、テスト結果を Datadog にプッシュするためにプライベートロケーションで使用されます。 |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="gov" >}}

| ポート | エンドポイント                         | 説明                                                                                                                                                                                                                                                                       |
|------|----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 443  | `intake.synthetics.ddog-gov.com` | [AWS Signature Version 4 プロトコル][1]に基づく社内プロトコルを使用して、テストコンフィギュレーションをプルし、テスト結果を Datadog にプッシュするためにプライベートロケーションで使用されます。バージョン 1.32.0 以降では、これらのリクエストは連邦情報処理規格 (FIPS) に準拠しています。 |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

## プライベートロケーションを設定する

プライベートロケーションは、**Synthetics Private Locations Write** ロールを持つユーザーのみが作成できます。詳しくは、[権限](#permissions)を参照してください。

### プライベートロケーションを作成する

[**Synthetic Monitoring** > **Settings** > **Private Locations**][22]  に移動し、**Add Private Location** をクリックします。

{{< img src="synthetics/private_locations/synthetics_pl_add_1.png" alt="Create a private location" style="width:90%;">}}

プライベートロケーションの詳細を入力します。

1. プライベートロケーションの**名前**および**説明**を指定します。
2. プライベートロケーションに関連付ける**タグ**を追加します。
3. 既存の **API キー**を 1 つ選択します。API キーを選択すると、プライベートロケーションと Datadog 間の通信が可能になります。既存の API キーがない場合は、**Generate API key** をクリックして専用ページで作成します。`Name` と `API key` フィールドのみが必須です。
4. プライベートロケーションのアクセス権を設定し、**Save Location and Generate Configuration File** をクリックします。Datadog はプライベートロケーションを作成し、関連するコンフィギュレーションファイルを生成します。

{{< img src="synthetics/private_locations/pl_creation_1.png" alt="Add details to private location" style="width:85%;">}} 

### プライベートロケーションを構成する

生成されたコンフィギュレーションファイルをカスタマイズして、プライベートロケーションを構成します。**ステップ 3** で[プロキシ](#proxy-configuration)や[予約 IP のブロック](#blocking-reserved-ips)などの初期構成パラメーターを追加すると、**ステップ 4** で生成したコンフィギュレーションファイルは自動的に更新されます。

詳細オプションにアクセスして、内部ネットワークの設定に基づいた構成を調整することができます。`help` コマンドの詳細については、[構成][5]を参照してください。

#### プロキシのコンフィギュレーション

プライベートロケーションと Datadog 間のトラフィックがプロキシを経由する必要がある場合は、`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>` の形式でプロキシ URL を指定し、生成されたコンフィギュレーションファイルに `proxyDatadog` パラメーターを追加します。

{{<img src="synthetics/private_locations/pl_proxy_1.png" alt="Add a proxy to your private location configuration file" style="width:90%;">}}

#### 予約済み IP のブロック

デフォルトでは、Synthetic ユーザーは任意の IP を使用してエンドポイントで Synthetic テストを作成できます。ユーザーがネットワーク内の機密性の高い内部 IP でテストを作成できないようにする場合は、**Block reserved IPs** ボタンを切り替えて、予約済み IP 範囲のデフォルトセット ([IPv4 アドレスレジストリ][6]および [IPv6 アドレスレジストリ][7]) をブロックし、生成されたコンフィギュレーションファイルで関連する `enableDefaultBlockedIpRanges` パラメーターを `true` に設定します。

テストするエンドポイントの一部がブロックされた予約済み IP 範囲の 1 つまたは複数にある場合は、その IP または CIDR、あるいはその両方を許可リストに追加して、生成されたコンフィギュレーションファイルに関連する `allowedIPRanges` パラメーターを追加できます。

{{< img src="synthetics/private_locations/pl_reserved_ips_1.png" alt="予約済み IP を構成する" style="width:90%;">}}

### コンフィギュレーションファイルを表示する

プライベートロケーションのコンフィギュレーションファイルに適切なオプションを追加した後、このファイルを作業ディレクトリにコピーアンドペーストしてください。このコンフィギュレーションファイルには、プライベートロケーションの認証、テスト構成の復号化、およびテスト結果の暗号化のためのシークレットが含まれています。

{{< img src="synthetics/private_locations/pl_view_file_1.png" alt="予約済み IP を構成する" style="width:90%;">}}

Datadog はシークレットを保存しないので、**View Installation Instructions** をクリックする前に、ローカルに保存してください。

**注:** ワーカーをさらに追加する場合、または、他のホストにワーカーをインストールする場合は、これらの秘密情報を再度参照できる必要があります。

### プライベートロケーションをインストールする

タスクの定義では、環境変数 `DATADOG_API_KEY`、`DATADOG_ACCESS_KEY`、`DATADOG_SECRET_ACCESS_KEY`、`DATADOG_PUBLIC_KEY_PEM`、`DATADOG_PRIVATE_KEY` を使用することが可能です。

次でプライベートロケーションを起動します。

{{< tabs >}}

{{% tab "Docker" %}}

次のコマンドを実行して、コンフィギュレーションファイルをコンテナにマウントすることでプライベートロケーションワーカーを起動します。`<MY_WORKER_CONFIG_FILE_NAME>.json` ファイルはルートホームフォルダーではなく `/etc/docker` 内に格納してください。

```shell
docker run -d --restart unless-stopped -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest
```

**注:** 予約済み IP をブロックした場合は、プライベートロケーションコンテナに `NET_ADMIN` [Linux 機能][1]を追加してください。

このコマンドは、Docker コンテナを起動し、プライベートロケーションでテストを実行できるようにします。**Datadog は、適切な再起動ポリシーを使用して、コンテナをデタッチモードで実行することをお勧めします。**

#### ルート証明書

カスタムルート証明書をプライベートロケーションにアップロードして、API やブラウザテストで独自の `.pem` ファイルを使用して SSL ハンドシェイクを実行させることができます。

プライベートロケーションのコンテナをスピンアップする際には、プライベートロケーションの構成ファイルをマウントするのと同じように、関連する証明書 `.pem` ファイルを `/etc/datadog/certs` にマウントします。これらの証明書は信頼できる CA とみなされ、テストの実行時に使用されます。

管理者用のプライベートロケーションのパラメーターについては、[構成][2]を参照してください。

[1]: https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities
[2]: https://docs.datadoghq.com/synthetics/private_locations/configuration/#private-locations-admin

{{% /tab %}}

{{% tab "Docker Compose" %}}

1. 次で `docker-compose.yml` ファイルを作成します。

    ```yaml
    version: "3"
    services:
        synthetics-private-location-worker:
            image: datadog/synthetics-private-location-worker:latest
            volumes:
                - PATH_TO_PRIVATE_LOCATION_CONFIG_FILE:/etc/datadog/synthetics-check-runner.json
    ```
   **注:** 予約済み IP をブロックした場合は、プライベートロケーションコンテナに `NET_ADMIN` [Linux 機能][1]を追加してください。

2. 次でコンテナを起動します。

    ```shell
    docker-compose -f docker-compose.yml up
    ```

#### ルート証明書

カスタムルート証明書をプライベートロケーションにアップロードして、API やブラウザテストで独自の `.pem` ファイルを使用して SSL ハンドシェイクを実行させることができます。

プライベートロケーションのコンテナをスピンアップする際には、プライベートロケーションの構成ファイルをマウントするのと同じように、関連する証明書 `.pem` ファイルを `/etc/datadog/certs` にマウントします。これらの証明書は信頼できる CA とみなされ、テストの実行時に使用されます。

管理者用のプライベートロケーションのパラメーターについては、[構成][2]を参照してください。

[1]: https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities
[2]: https://docs.datadoghq.com/synthetics/private_locations/configuration/#private-locations-admin

{{% /tab %}}

{{% tab "Podman" %}}

Podman の構成は Docker と非常に似ていますが、ICMP テストに対応するため、追加機能として `NET_RAW` を設定する必要があります。

1. コンテナが動作するホストから、`sysctl -w "net.ipv4.ping_group_range = 0 2147483647"` を実行します。
2. このコマンドを実行すると、コンフィギュレーションファイルをコンテナにマウントしてプライベートロケーションのワーカーが起動します。コンテナにマウントするために、`<MY_WORKER_CONFIG_FILE_NAME>.json` ファイルがアクセス可能であることを確認します。

   ```shell
   podman run --cap-add=NET_RAW --rm -it -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json gcr.io/datadoghq/synthetics-private-location-worker:latest
   ```

   ブロックされた予約 IP アドレスを構成している場合、プライベートロケーションのコンテナに `NET_ADMIN` Linux 機能を追加します。

このコマンドは、Podman コンテナを起動し、プライベートロケーションでテストを実行できるようにします。Datadog は、適切な再起動ポリシーを使用して、コンテナをデタッチモードで実行することをお勧めします。


{{% /tab %}}

{{% tab "Kubernetes Deployment" %}}

プライベートロケーションワーカーを安全にデプロイするために、コンテナ内の `/etc/datadog/synthetics-check-runner.json` 以下に Kubernetes Secret リソースを設定しマウントしてください。

1. 以下を実行し、以前に作成した JSON ファイルで Kubernetes Secret を作成します。

    ```shell
    kubectl create secret generic private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. デプロイを使用して、プライベートロケーションに関連付けられている望ましい状態を記述します。次の `private-location-worker-deployment.yaml `ファイルを作成します。

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: datadog-private-location-worker
      namespace: default
    spec:
      selector:
        matchLabels:
          app: private-location
      template:
        metadata:
          name: datadog-private-location-worker
          labels:
            app: private-location
        spec:
          containers:
          - name: datadog-private-location-worker
            image: datadog/synthetics-private-location-worker
            volumeMounts:
            - mountPath: /etc/datadog/synthetics-check-runner.json
              name: worker-config
              subPath: <MY_WORKER_CONFIG_FILE_NAME>
          volumes:
          - name: worker-config
            secret:
              secretName: private-location-worker-config
    ```

   **注:** 予約済み IP をブロックした場合は、プライベートロケーションコンテナに `NET_ADMIN` [Linux 機能][1]を追加してください。

3. コンフィギュレーションを適用します。

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

OpenShift の場合、プライベートロケーションを `anyuid` SCC で実行します。これは、ブラウザテストを実行するために必要です。

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/

{{% /tab %}}

{{% tab "Helm Chart" %}}

構成パラメーターに、すでに構成されているシークレットを指す環境変数を設定することができます。シークレットを指定した環境変数を作成するには、[Kubernetes のドキュメント][3]を参照してください。

あるいは

1. [Datadog Synthetics Private Location][1] を Helm リポジトリに追加します。

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

2. 先に作成した JSON ファイルを使って、リリース名 `<RELEASE_NAME>` のチャートをインストールします。

    ```shell
    helm install <RELEASE_NAME> datadog/synthetics-private-location --set-file configFile=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

**注:** 予約済み IP をブロックした場合は、プライベートロケーションコンテナに `NET_ADMIN` [Linux 機能][2]を追加してください。

[1]: https://github.com/DataDog/helm-charts/tree/master/charts/synthetics-private-location
[2]: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
[3]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#define-container-environment-variables-using-secret-data

{{% /tab %}}

{{% tab "ECS" %}}

以下に一致する EC2 タスクの定義を新規に作成します。各パラメーターを、以前に生成したプライベートロケーションのコンフィギュレーションファイルにある対応する値に置き換えてください。

```yaml
{
    ...
    "containerDefinitions": [
        {
            "command": [
                "--site='...'",
                "--locationID='...'",
                "--accessKey='...'",
                "--datadogApiKey='...'",
                "--secretAccessKey='...'",
                "--privateKey='-----BEGIN RSA PRIVATE KEY-----XXXXXXXX-----END RSA PRIVATE KEY-----'",
                "--publicKey.pem='-----BEGIN PUBLIC KEY-----XXXXXXXX-----END PUBLIC KEY-----'",
                "--publicKey.fingerprint='...'"
            ],
            ...
            "image": "datadog/synthetics-private-location-worker:latest",
            ...
        }
    ],
    ...
    "compatibilities": [
        "EC2"
    ],
    ...
}
```

**注:**

- 予約済み IP をブロックした場合は、[linuxParameters][1] を構成して、プライベートロケーションコンテナに `NET_ADMIN` 機能を付与してください。
- `DATADOG_API_KEY`、`DATADOG_ACCESS_KEY`、`DATADOG_SECRET_ACCESS_KEY`、`DATADOG_PUBLIC_KEY_PEM`、`DATADOG_PRIVATE_KEY` の環境変数を使用する場合、それらを `"command": [ ]` セクションに入れる必要はありません。

[1]: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_LinuxParameters.html

{{% /tab %}}

{{% tab "Fargate" %}}

以下に一致する Fargate タスクの定義を新規に作成します。各パラメーターを、以前に生成したプライベートロケーションのコンフィギュレーションファイルにある対応する値に置き換えてください。

```yaml
{
    ...
    "containerDefinitions": [
        {
            "command": [
                "--site='...'",
                "--locationID='...'",
                "--accessKey='...'",
                "--datadogApiKey='...'",
                "--secretAccessKey='...'",
                "--privateKey='-----BEGIN RSA PRIVATE KEY-----XXXXXXXX-----END RSA PRIVATE KEY-----'",
                "--publicKey.pem='-----BEGIN PUBLIC KEY-----XXXXXXXX-----END PUBLIC KEY-----'",
                "--publicKey.fingerprint='...'"
            ],
            ...
            "image": "datadog/synthetics-private-location-worker:latest",
            ...
        }
    ],
    ...
    "compatibilities": [
        "EC2",
        "FARGATE"
    ],
    ...
}
```

**注:** プライベートロケーションファイアウォールオプションは AWS Fargate ではサポートされていないため、`enableDefaultBlockedIpRanges` パラメーターは `true` に設定できません。

{{% /tab %}}

{{% tab "EKS" %}}

Datadog は既に Kubernetes および AWS と統合されているため、すぐに EKS を監視することができます。

1. 以下を実行し、以前に作成した JSON ファイルで Kubernetes Secret を作成します。

    ```shell
    kubectl create secret generic private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. デプロイを使用して、プライベートロケーションに関連付けられている望ましい状態を記述します。次の `private-location-worker-deployment.yaml `ファイルを作成します。

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: datadog-private-location-worker
      namespace: default
    spec:
      selector:
        matchLabels:
          app: private-location
      template:
        metadata:
          name: datadog-private-location-worker
          labels:
            app: private-location
        spec:
          containers:
          - name: datadog-private-location-worker
            image: datadog/synthetics-private-location-worker
            volumeMounts:
            - mountPath: /etc/datadog/synthetics-check-runner.json
              name: worker-config
              subPath: <MY_WORKER_CONFIG_FILE_NAME>
          volumes:
          - name: worker-config
            configMap:
              name: private-location-worker-config
    ```

   **注:** 予約済み IP をブロックした場合は、セキュリティコンテキストを構成して、プライベートロケーションコンテナに `NET_ADMIN` [Linux 機能][1]を追加してください。

3. コンフィギュレーションを適用します。

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/

{{% /tab %}}
{{% tab "GUI 経由の Windows" %}}

1. Download the [`datadog-synthetics-worker-1.48.0.amd64.msi` file][101] and run this file from the machine you want to install the private location on. 
1. ウェルカムページで をクリックし、EULA を読み、利用規約に同意します。**Next** をクリックします。
1. アプリケーションのインストール先を変更するか、デフォルト設定のままにします。**Next** をクリックします。
1. Windows のプライベートロケーションを構成するには、以下のいずれかの方法があります。
   - Datadog Synthetics Private Location Worker の JSON 構成を貼り付けて入力します。このファイルは、[プライベートロケーションの作成][102]時に Datadog が生成します。
   - Datadog Synthetics Private Location Worker の JSON 構成を含むファイルのパスを参照または入力します。
   - 空白のままにしておいて、インストール完了後に Windows のコマンドラインプロンプトで `C:\\Program Files\Datadog-Synthetics\Synthetics\synthetics-pl-worker.exe --config=<PathToYourConfiguration>` を実行することができます。

   {{< img src="synthetics/private_locations/configuration_selector_paste.png" alt="Synthetics Private Location Worker ウィザード、MSI インストーラー。'Paste in a JSON configuration' (JSON 構成を貼り付ける) オプションが選択されています。この JSON 構成のテキストフィールドが表示されています。" style="width:80%;" >}}

1. 以下の構成オプションを適用できます。

   {{< img src="synthetics/private_locations/settings.png" alt="Synthetics Private Location Worker ウィザード、MSI インストーラー。ファイアウォールとログの設定が表示されています。" style="width:80%;" >}}

   Apply firewall rules needed by this program to Windows Firewall (このプログラムに必要なファイアウォールルールを Windows ファイアウォールに適用)
   : インストーラーがインストール時にファイアウォールルールを適用し、アンインストール時に削除できるようにします。

   Apply rules to block reserved IPs in Windows Firewall (Windows ファイアウォールで予約済み IP をブロックするルールを適用)
   : Chrome、Firefox、Edge (インストールされている場合) のブロックルールを構成し、Windows ファイアウォールで予約済み IP アドレス範囲の送信をブロックするルールを追加します。

   Enable File Logging (ファイルログの有効化)
   : Synthetics Private Location Worker がインストールディレクトリ内でログファイルを記録できるようにします。

   Log Rotation Days (ログローテーション日数 )
   : ローカルシステムからログを削除するまでの保存日数を指定します。

   Logging Verbosity (ロギングの冗長性)
   : Synthetics Private Location Worker のコンソールとファイルロギングの冗長性を指定します。

1. **Next**、**Install** をクリックしてインストールプロセスを開始します。

プロセスが完了したら、インストール完了ページで **Finish** をクリックします。

<div class="alert alert-warning">JSON 構成を入力した場合、Windows サービスはその構成を使用して実行を開始します。構成を入力していない場合は、コマンドプロンプトから <code>C:\\Program Files\Datadog-Synthetics\Synthetics\synthetics-pl-worker.exe --config=< PathToYourConfiguration ></code> を実行するか、<code>スタートメニュー</code>のショートカットを使用して Synthetics Private Location Worker を起動します。</div>

[101]: https://dd-public-oss-mirror.s3.amazonaws.com/synthetics-windows-pl/datadog-synthetics-worker-1.48.0.amd64.msi
[102]: https://app.datadoghq.com/synthetics/settings/private-locations

{{% /tab %}}
{{% tab "CLI 経由の Windows" %}}

1. Download the [`datadog-synthetics-worker-1.48.0.amd64.msi` file][101] and run this file from the machine you want to install the private location on. 
2. インストーラをダウンロードしたディレクトリで、以下のコマンドのいずれかを実行します。

   - PowerShell ターミナルで

     ```powershell
     Start-Process msiexec "/i datadog-synthetics-worker-1.48.0.amd64.msi /quiet /qn WORKERCONFIG_FILEPATH=C:\ProgramData\Datadog-Synthetics\worker-config.json";
     ```

   - またはコマンドターミナルで

     ```cmd
     msiexec /i datadog-synthetics-worker-1.48.0.amd64.msi /quiet /qn WORKERCONFIG_FILEPATH=C:\ProgramData\Datadog-Synthetics\worker-config.json
     ```

パラメーターを追加することができます。

| オプションパラメーター | 定義 | 値 | デフォルト値 | タイプ |
|---|---|---|---|---|
| APPLYDEFAULTFIREWALLRULES | プログラムに必要なファイアウォールルールを適用します。 | 1 | N/A | 0: 無効<br>1: 有効 |
| APPLYFIREWALLDEFAULTBLOCKRULES | インストールされている各ブラウザ (Chrome、Edge、Firefox) の予約済み IP アドレスをブロックします。Windows ファイアウォールでは、ループバック接続をブロックすることはできません。 | 0 | N/A | 0: 無効<br>1: 有効 |
| LOGGING_ENABLED | 有効にすると、これによりファイルログイングが構成されます。これらのログは、インストールディレクトリの logs フォルダに保存されます。 | 0 | `--enableFileLogging` | 0: 無効<br>1: 有効 |
| LOGGING_VERBOSITY | プログラムのロギングの冗長性を構成します。これはコンソールログとファイルログに影響します。 | これはコンソールログとファイルログに影響します。 | `-vvv` | `-v`: Error<br>`-vv`: Warning<br>`-vvv`: Info<br>`vvvv`: Debug |
| LOGGING_MAXDAYS | Number of days to keep file logs on the system before deleting them. Can be any number when running an unattended installation. | 7 | `--logFileMaxDays` | 整数 |
| WORKERCONFIG_FILEPATH | これは Synthetics Private Location Worker JSON 構成ファイルのパスに変更する必要があります。パスにスペースが含まれている場合は、このパスを引用符で囲んでください。 | <None> | `--config` | 文字列 |

[101]: https://dd-public-oss-mirror.s3.amazonaws.com/synthetics-windows-pl/datadog-synthetics-worker-1.48.0.amd64.msi

{{% /tab %}}
{{< /tabs >}}

#### ライブネスプローブとレディネスプローブのセットアップ

オーケストレーターがワーカーが正しく動作していることを確認できるように、ライブネスプローブまたはレディネスプローブを追加します。

レディネスプローブの場合、プライベートロケーションデプロイメントでポート `8080` のプライベートロケーションステータスプローブを有効にする必要があります。詳細については、[プライベートロケーションの構成][5]を参照してください。

{{< tabs >}}

{{% tab "Docker Compose" %}}

```yaml
healthcheck:
  retries: 3
  test: [
    "CMD", "wget", "-O", "/dev/null", "-q", "http://localhost:8080/liveness"
  ]
  timeout: 2s
  interval: 10s
  start_period: 30s
```

{{% /tab %}}

{{% tab "Kubernetes Deployment" %}}

```yaml
livenessProbe:
  httpGet:
    path: /liveness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
readinessProbe:
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  httpGet:
    path: /readiness
    port: 8080
```

{{% /tab %}}

{{% tab "Helm Chart" %}}

```yaml
livenessProbe:
  httpGet:
    path: /liveness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
readinessProbe:
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  httpGet:
    path: /readiness
    port: 8080
```

{{% /tab %}}

{{% tab "ECS" %}}

```json
"healthCheck": {
  "retries": 3,
  "command": [
    "CMD-SHELL", "/usr/bin/wget", "-O", "/dev/null", "-q", "http://localhost:8080/liveness"
  ],
  "timeout": 2,
  "interval": 10,
  "startPeriod": 30
}
```

{{% /tab %}}

{{% tab "Fargate" %}}

```json
"healthCheck": {
  "retries": 3,
  "command": [
    "CMD-SHELL", "wget -O /dev/null -q http://localhost:8080/liveness || exit 1"
  ],
  "timeout": 2,
  "interval": 10,
  "startPeriod": 30
}
```

{{% /tab %}}

{{% tab "EKS" %}}

```yaml
livenessProbe:
  httpGet:
    path: /liveness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
readinessProbe:
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  httpGet:
    path: /readiness
    port: 8080
```

{{% /tab %}}

{{< /tabs >}}

#### ヘルスチェックの追加構成

<div class="alert alert-danger">プライベートロケーションのヘルスチェックを追加するこの方法は、サポートされなくなりました。Datadog では、ライブネスプローブとレディネスプローブを使用することを推奨しています。</div>

プライベートロケーションコンテナの `/tmp/liveness.date` ファイルは、Datadog から正常にポーリングされるごとに更新されます (デフォルトでは 2 秒)。例えば過去1分間にフェッチされないなど一定期間ポーリングが行われないと、コンテナは異常だとみなされます。

以下のコンフィギュレーションを使い、`livenessProbe` でコンテナにヘルスチェックを設定します。

{{< tabs >}}

{{% tab "Docker Compose" %}}

```yaml
healthcheck:
  retries: 3
  test: [
    "CMD", "/bin/sh", "-c", "'[ $$(expr $$(cat /tmp/liveness.date) + 300000) -gt $$(date +%s%3N) ]'"
  ]
  timeout: 2s
  interval: 10s
  start_period: 30s
```

{{% /tab %}}

{{% tab "Kubernetes Deployment" %}}

```yaml
livenessProbe:
  exec:
    command:
      - /bin/sh
      - -c
      - '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  failureThreshold: 3
```

{{% /tab %}}

{{% tab "Helm Chart" %}}

```yaml
livenessProbe:
  exec:
    command:
      - /bin/sh
      - -c
      - '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  failureThreshold: 3
```

{{% /tab %}}

{{% tab "ECS" %}}

```json
"healthCheck": {
  "retries": 3,
  "command": [
    "CMD-SHELL", "/bin/sh -c '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'"
  ],
  "timeout": 2,
  "interval": 10,
  "startPeriod": 30
}
```

{{% /tab %}}

{{% tab "Fargate" %}}

```json
"healthCheck": {
  "retries": 3,
  "command": [
    "CMD-SHELL", "/bin/sh -c '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'"
  ],
  "timeout": 2,
  "interval": 10,
  "startPeriod": 30
}
```

{{% /tab %}}

{{% tab "EKS" %}}

```yaml
livenessProbe:
  exec:
    command:
      - /bin/sh
      - -c
      - '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  failureThreshold: 3
```

{{% /tab %}}

{{< /tabs >}}

### Upgrade a private location image

To upgrade an existing private location, click the **Gear** icon on the private location side panel and click **Installation instructions**.

{{< img src="synthetics/private_locations/pl_edit_config.png" alt="Access the setup workflow for a private location" style="width:90%;" >}}

Then, run the [configuration command based on your environment](#install-your-private-location
) to get the latest version of the private location image. 

**注**: Private Location のイメージを起動するために `docker run` を使用していて、以前に `latest` タグを使用して Private Location のイメージをインストールしたことがある場合は、同じ `latest` タグでローカルに存在するキャッシュバージョンのイメージに依存するのではなく、最新バージョンがプルされるように `docker run` コマンドに `--pull=always` を追加してください。

### 内部エンドポイントをテストする

少なくとも 1 つのプライベートロケーションワーカーが Datadog にレポートを開始すると、プライベートロケーションのステータスが緑色で表示されます。

{{< img src="synthetics/private_locations/pl_reporting.png" alt="プライベートロケーションのレポート" style="width:90%;">}}

You can see a `REPORTING` health status and an associated monitor status displayed on the Private Locations list in the **Settings** page.

{{< img src="synthetics/private_locations/pl_monitoring_table_reporting_1.png" alt="Private location health and monitor status" style="width:100%;">}}

内部エンドポイントの 1 つで速度テストを起動して最初の内部エンドポイントのテストを開始し、期待される応答が得られるかどうかを確認します。

{{< img src="synthetics/private_locations/pl_fast_test.mp4" alt="プライベートロケーションの速度テスト" video="true" width="90%">}}

**注:** Datadog はプライベートロケーションからアウトバウンドトラフィックのみを送信し、インバウンドトラフィックは送信されません。

## Synthetic テストをプライベートロケーションから起動する

API、マルチステップ API、またはブラウザテストを作成し、関心のある**プライベートロケーション**を選択します。

{{< img src="synthetics/private_locations/assign-test-pl-2.png" alt="Synthetics テストのプライベートロケーションへの割り当て" style="width:90%;">}}

プライベートロケーションは、Datadog が管理するロケーションと同様に使用できます。プライベートロケーションに [Synthetic テスト][2]を割り当て、テスト結果を視覚化し、[Synthetic メトリクス][11]を取得するなど、様々なことが可能です。

## プライベートロケーションのサイズ変更

1 つのプライベートロケーションに単一のコンフィギュレーションファイルで複数のワーカーを実行できるため、ワーカーを追加または削除することでプライベートロケーションを**水平スケーリング**できます。このとき、`concurrency` パラメーターを必ず設定し、プライベートロケーションで実行するテストのタイプおよび数と一致するワーカーリソースを割り当てます。

プライベートロケーションワーカーが取り扱うことのできるロードを増加してプライベートロケーションを**垂直にスケーリング**することもできます。同様に、`concurrency` パラメーターを使用して、ワーカーが実行できるテストの最大数を調整し、ワーカーに割り当てられたリソースを必ず更新してください。

詳しくは、[プライベートロケーションのディメンション][18]を参照してください。

In order to use private locations for Continuous Testing, set a value in the `concurrency` parameter to control your parallelization. For more information, see [Continuous Testing][23].

## プライベートロケーションを監視する

最初はプライベートロケーションから実行するテストの数と種類に見合ったリソースを追加しますが、プライベートロケーションの規模を縮小すべきか拡大すべきかを知る最も簡単な方法は、厳密にモニターすることです。[プライベートロケーションモニタリング][19]は、すぐに使えるメトリクスやモニターと同様に、プライベートロケーションのパフォーマンスや状態に関する洞察を提供します。

詳しくは、[プライベートロケーションモニタリング][19]を参照してください。

## 権限

デフォルトでは、Datadog Admin ロールを持つユーザーのみが、プライベートロケーションの作成、プライベートロケーションの削除、プライベートロケーションのインストールガイドラインにアクセスすることができます。

Datadog Admin ロールおよび Datadog Standard ロール][20]を持つユーザーは、プライベートロケーションの表示、プライベートロケーションの検索、プライベートロケーションへの Synthetic テストの割り当てを行うことができます。ユーザーをこれら 2 つの[デフォルト ロール][19]のいずれかにアップグレードして、[**Private Locations** ページ][22]へのアクセスを許可してください。

[カスタムロール機能][21]を使用している場合、ユーザーを `synthetics_private_location_read` と `synthetics_private_location_write` 権限を含むカスタムロールに追加してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_testing/cicd_integrations
[2]: /synthetics/
[3]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker?pli=1
[4]: https://docs.docker.com/engine/install/
[5]: /synthetics/private_locations/configuration/
[6]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[7]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml
[10]: https://docs.docker.com/engine/reference/builder/#healthcheck
[11]: /synthetics/metrics
[12]: /synthetics/api_tests/
[13]: /synthetics/multistep?tab=requestoptions
[14]: /synthetics/browser_tests/?tab=requestoptions
[16]: /agent/
[17]: /synthetics/metrics/
[18]: /synthetics/private_locations/dimensioning
[19]: /synthetics/private_locations/monitoring
[20]: /account_management/rbac/permissions
[21]: /account_management/rbac#custom-roles
[22]: https://app.datadoghq.com/synthetics/settings/private-locations
[23]: /continuous_testing/cicd_integrations/configuration
