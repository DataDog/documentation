---
aliases:
- /ja/synthetics/private_locations
description: Synthetic API テストとブラウザテストをプライベートロケーションから実行する
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/
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
- link: https://www.datadoghq.com/architecture/protect-sensitive-data-with-synthetics-private-location-runners/
  tag: Architecture Center
  text: Synthetics プライベートロケーションランナーで機密データを保護する
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_private_location
  tag: 外部サイト
  text: Terraform による Synthetic プライベートロケーションの作成と管理
title: Synthetic テストをプライベートロケーションから実行する
---
## 概要 {#overview}

プライベートロケーションから、**内部用アプリケーションの監視や、パブリックインターネットから接続できないプライベートエンドポイントの監視**を行えます。これは以下にも使用できます。

ビジネスにミッションクリティカルな領域に、* **カスタム Synthetic ロケーションを作成します**。
[Continuous Testing と CI/CD][28] を使用して本番環境に新機能をリリースする前に、* **内部 CI 環境でアプリケーションパフォーマンスを確認します**。
内部ネットワークの内外両方から* **アプリケーションのパフォーマンスを比較します**。
Windows ベースの内部サイトや内部 API で * **[Synthetic Monitoring テストの認証に Kerberos SSO を使用します][33]**。

{{< img src="synthetics/private_locations/private_locations_worker_1.png" alt="Synthetic Monitoring におけるプライベートロケーションの仕組みを示すアーキテクチャ図" style="width:100%;">}}

プライベートロケーションは Docker コンテナまたは Windows サービスとして提供され、プライベートネットワーク内にインストールすることができます。プライベートロケーションを作成してインストールしたら、管理ロケーションと同様に、[Synthetic テスト][29]を割り当てることができます。

プライベートロケーションワーカーは、HTTPS を使用してテスト構成を Datadog のサーバーから取得し、スケジュールまたはオンデマンドでテストを実行して、テスト結果を Datadog のサーバーに返します。次に、管理ロケーションから実行されているテストを視覚化する方法とまったく同じ方法で、プライベートロケーションのテスト結果を視覚化できます。

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Synthetic テストのプライベートロケーションへの割り当て" style="width:100%;">}}

## 前提条件 {#prerequisites}

[Continuous Testing テスト][23]でプライベートロケーションを使用するには、v1.27.0 以降が必要です。

{{< tabs >}}
{{% tab "Docker" %}}

プライベートロケーションは、プライベートネットワーク内の任意の場所にインストールできる Docker コンテナです。[プライベートロケーションワーカーイメージ][101]には、Docker Hub からアクセスできます。ホスト上に [Docker エンジン][102]があり、Linux コンテナモードで動作可能であれば、Linux ベースの OS や Windows OS 上で動作させることができます。**\***

{{< site-region region="gov,gov2" >}}

FIPS サポートが必要な場合は、Docker Hub で [FIPS 準拠のイメージ][26]を使用してください。

[26]: https://hub.docker.com/r/datadog/synthetics-private-location-worker-fips

{{< /site-region >}}

**\*** **このソフトウェアの使用および操作には、[こちら][103]から入手可能なエンドユーザーライセンス契約が適用されます。**

[101]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[102]: https://docs.docker.com/engine/install/
[103]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{% tab "Helm" %}}

プライベートロケーションは、Helm を使用して Kubernetes クラスターにインストールできる Kubernetes デプロイメントです。[helm チャート][101]は、Linux ベースの Kubernetes で実行できます。

**注**: このソフトウェアの使用および操作には、[エンドユーザーライセンス契約][103]が適用されます。

[101]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location
[103]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{% tab "Windows" %}}

プライベートロケーションは、[MSI ファイル][101]を使用してプライベートネットワーク内の任意の場所にインストールできる Windows サービスです。プライベートロケーションをインストールしたい仮想マシンまたは物理マシンからこのファイルを実行します。**\***

**\*** **このソフトウェアの使用および操作には、[こちら][102]から入手可能なエンドユーザーライセンス契約が適用されます。**

このマシンの要件を以下の表に示します。プライベートロケーションワーカーをインストールするマシンでは、PowerShell スクリプトが有効になっている必要があります。

| システム | 要件 |
|---|---|
| OS | Windows Server 2022、Windows Server 2019、Windows Server 2016、または Windows 10。|
| RAM | 最低 4GB。8GB 推奨。|
| CPU | 64 ビット対応の Intel または AMD プロセッサー。2.8 GHz 以上のプロセッサーを推奨。|

**注**: Windows プライベートロケーションでブラウザテストを実行するには、Windows コンピュータにブラウザ (たとえば、Chrome、Edge、Firefox) がインストールされている必要があります。

MSI インストーラーを使用する前に、コンピューターに .NET バージョン 4.7.2 以降をインストールする必要があります。

**FIPS 140-2 暗号化モードを有効にする**</br>
安全な通信のために FIPS 準拠の暗号化モジュールを有効にします。このオプションを使用するには、Windows ホストが Windows FIPS モードで実行されている必要があります。プライベートロケーション `v1.63.0` 以上で利用可能です。

{{< img src="synthetics/private_locations/synthetics_pl_windows_fips.png" alt="Synthetics Private Location Worker ウィザード、MSI インストーラー。FIPS 140-2 暗号化モードの設定が表示されています。" style="width:80%;" >}}

[101]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
[102]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{< /tabs >}}

### Datadog プライベートロケーションエンドポイント {#datadog-private-locations-endpoints}

テスト構成を取得してテスト結果を送信するには、プライベートロケーションワーカーが以下の Datadog API エンドポイントにアクセスする必要があります。

| ポート | エンドポイント                               | 説明                                                   |
| ---- | -------------------------------------- | ------------------------------------------------------------- |
| 443  | {{< region-param key=synthetics_intake_endpoint code="true" >}} | [AWS Signature Version 4 プロトコル][1]に基づく社内プロトコルを使用してテスト構成を取得し、テスト結果を Datadog に送信するために、プライベートロケーションで使用されます。{{< site-region region="gov,gov2" >}} バージョン `1.32.0` 以降では、**Linux のコンテナ化されたプライベートロケーション**からのリクエストは連邦情報処理規格 (FIPS) に準拠しています。**Windows プライベートロケーション**では、バージョン `1.63.0` 以降で FIPS 準拠の暗号化がサポートされています。{{< /site-region >}} |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< site-region region="eu" >}}

**注**: これらのドメインは、静的 IP アドレスのセットを指しています。これらのアドレスは https://ip-ranges.datadoghq.eu にあります。

{{< /site-region >}}

## プライベートロケーションを設定する {#set-up-your-private-location}

プライベートロケーションは、**Synthetics Private Locations Write** ロールを持つユーザーのみが作成できます。詳しくは、[権限](#permissions)を参照してください。

### プライベートロケーションを作成する {#create-your-private-location}

[[**Synthetic Monitoring**] > [**Settings**] (設定) > [**Private Locations**] (プライベートロケーション)][22] に移動し、[**Add Private Location**] (プライベートロケーションを追加) をクリックします。

{{< img src="synthetics/private_locations/synthetics_pl_add_1.png" alt="プライベートロケーションを作成する" style="width:90%;">}}

プライベートロケーションの詳細を入力します。

1. プライベートロケーションの [**Name**] (名前) と [**Description**] (説明) を指定します。
2. プライベートロケーションに関連付ける [**Tags**] (タグ) を追加します。
3. 既存の [**API Key**] (API キー) を 1 つ選択します。API キーを選択すると、プライベートロケーションと Datadog 間の通信が可能になります。既存の API キーがない場合は、[**Generate API key**] (API キーを生成) をクリックして専用ページで作成します。`Name` と `API key` のフィールドのみが必須です。
4. プライベートロケーションのアクセス権を設定し、[**Save Location and Generate Configuration File**] (ロケーションを保存して構成ファイルを生成) をクリックします。Datadog がプライベートロケーションを作成し、関連する構成ファイルを生成します。

{{< img src="synthetics/private_locations/pl_creation_1.png" alt="プライベートロケーションに詳細を追加する" style="width:85%;">}}

### プライベートロケーションを構成する {#configure-your-private-location}

生成された構成ファイルをカスタマイズして、プライベートロケーションを構成します。[ステップ 3](#proxy-configuration) で[プロキシ](#blocking-reserved-ips)や**予約済み IP のブロック**などの初期構成パラメーターを追加すると、生成された構成ファイルが**ステップ 4** で自動的に更新されます。

高度なオプションにアクセスして、内部ネットワークの設定に基づいて構成を調整することができます。`help` コマンドの詳細については、[構成][5]を参照してください。

#### プロキシの構成 {#proxy-configuration}

プライベートロケーションと Datadog の間のトラフィックがプロキシを経由する必要がある場合は、`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>` の形式でプロキシ URL を指定して、関連する `proxyDatadog` パラメータを生成された構成ファイルに追加します。

{{<img src="synthetics/private_locations/pl_proxy_1.png" alt="プライベートロケーションの構成ファイルにプロキシを追加する" style="width:90%;">}}

#### 予約済み IP のブロック {#blocking-reserved-ips}

デフォルトでは、Synthetic ユーザーは任意の IP を使用してエンドポイントで Synthetic テストを作成できます。ユーザーがネットワーク内の機密性の高い内部 IP でテストを作成できないようにする場合は、[**Block reserved IPs**] (予約済み IP のブロック) ボタンを切り替えて、予約済み IP 範囲のデフォルトセット ([IPv4 アドレスレジストリ][6]および [IPv6 アドレスレジストリ][7]) をブロックし、生成された構成ファイルで関連する `enableDefaultBlockedIpRanges` パラメータを `true` に設定します。

テストするエンドポイントの一部がブロックされた予約済み IP 範囲の 1 つまたは複数にある場合は、その IP または CIDR、あるいはその両方を許可リストに追加して、生成された構成ファイルに関連する `allowedIPRanges` パラメーターを追加できます。

{{< img src="synthetics/private_locations/pl_reserved_ips_1.png" alt="予約済み IP を構成する" style="width:90%;">}}

### 構成ファイルを表示する {#view-your-configuration-file}

プライベートロケーション構成ファイルに適切なオプションを追加したら、そのファイルをコピーして作業ディレクトリに貼り付けることができます。構成ファイルには、プライベートロケーションの認証、テスト構成の復号化、およびテスト結果の暗号化に関するシークレットが含まれています。

{{< img src="synthetics/private_locations/pl_view_file_1.png" alt="予約済み IP を構成する" style="width:90%;">}}

Datadog はシークレットを保存しないので、[**View Installation Instructions**] (インストール手順を表示) をクリックする前に、ローカルに保存してください。

**注:** ワーカーをさらに追加する場合、または他のホストにワーカーをインストールする場合は、これらのシークレットを再度参照できる必要があります。

### プライベートロケーションをインストールする {#install-your-private-location}

タスク定義では、環境変数 `DATADOG_API_KEY`、`DATADOG_ACCESS_KEY`、`DATADOG_SECRET_ACCESS_KEY`、`DATADOG_PUBLIC_KEY_PEM`、`DATADOG_PRIVATE_KEY` を使用することが可能です。

次でプライベートロケーションを起動します。

{{< tabs >}}
{{% tab "Docker" %}}

次のコマンドを実行して、構成ファイルをコンテナにマウントすることで、プライベートロケーションワーカーを起動します。`<MY_WORKER_CONFIG_FILE_NAME>.json` ファイルがルートホームフォルダーではなく `/etc/docker` にあることを確認してください。

```shell
docker run -d --restart unless-stopped -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest
```

**注:** 予約済み IP をブロックした場合は、プライベートロケーションコンテナに `NET_ADMIN` [Linux 機能][26]を追加してください。

このコマンドは、Docker コンテナを起動し、プライベートロケーションでテストを実行できるようにします。**Datadog は、適切な再起動ポリシーを使用して、コンテナをデタッチモードで実行することをお勧めします。**

[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "Docker Compose" %}}

1. `docker-compose.yml` ファイルを次のように作成します。

    ```yaml
    version: "3"
    services:
        synthetics-private-location-worker:
            image: datadog/synthetics-private-location-worker:latest
            volumes:
                - PATH_TO_PRIVATE_LOCATION_CONFIG_FILE:/etc/datadog/synthetics-check-runner.json
    ```
    **Note:** If you have blocked reserved IPs, add the `NET_ADMIN` [Linux capabilities][26] to your private location container.

2. 次のようにコンテナを起動します。

    ```shell
    docker-compose -f docker-compose.yml up
    ```
[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "Podman" %}}
Podman の構成は Docker と非常に似ていますが、ICMP テストに対応するため、追加機能として `NET_RAW` を設定する必要があります。

1. コンテナが実行されているホストから `sysctl -w "net.ipv4.ping_group_range = 0 2147483647"` を実行します。
2. 次のコマンドを実行して、構成ファイルをコンテナにマウントすることで、プライベートロケーションワーカーを起動します。コンテナにマウントする `<MY_WORKER_CONFIG_FILE_NAME>.json` ファイルがアクセス可能であることを確認してください。

   ```shell
   podman run --cap-add=NET_RAW --rm -it -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json gcr.io/datadoghq/synthetics-private-location-worker:latest
   ```

   予約済み IP アドレスのブロックを構成している場合は、プライベートロケーションコンテナに `NET_ADMIN` Linux 機能を追加してください。

このコマンドは、Podman コンテナを起動し、プライベートロケーションでテストを実行できるようにします。Datadog は、適切な再起動ポリシーを使用して、コンテナをデタッチモードで実行することをお勧めします。
{{< /tab >}}

{{% tab "Kubernetes Deployment" %}}

プライベートロケーションワーカーを安全にデプロイするために、コンテナ内の `/etc/datadog/synthetics-check-runner.json` に Kubernetes Secret リソースを設定してマウントしてください。

1. 以下を実行し、以前に作成した JSON ファイルで Kubernetes Secret を作成します。

    ```shell
    kubectl create secret generic private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. Deployment を使用して、プライベートロケーションに関連する望ましい状態を記述します。次の `private-location-worker-deployment.yaml` ファイルを作成します。

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

    **Note:** If you have blocked reserved IPs, add the `NET_ADMIN` [Linux capabilities][26] to your private location container.

3. 構成を適用します。

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

OpenShift の場合、プライベートロケーションを `anyuid` SCC で実行します。これは、ブラウザテストを実行するために必要です。

[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "Helm チャート" %}}

構成パラメーターに、すでに構成されているシークレットを指す環境変数を設定することができます。シークレットを指定した環境変数を作成するには、[Kubernetes のドキュメント][3]を参照してください。

あるいは

1. [Datadog Synthetics Private Location][2] を Helm リポジトリに追加します。

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

2. 先に作成した JSON ファイルを使用して、リリース名 `<RELEASE_NAME>` のチャートをインストールします。

    ```shell
    helm install <RELEASE_NAME> datadog/synthetics-private-location --set-file configFile=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

**注:** 予約済み IP をブロックした場合は、プライベートロケーションコンテナに `NET_ADMIN` [Linux 機能][26]を追加してください。

[2]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location
[3]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#define-container-environment-variables-using-secret-data
[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "ECS" %}}

以下に一致する EC2 タスクの定義を新規に作成します。各パラメーターを、以前に生成したプライベートロケーション構成ファイルの対応する値に置き換えてください。

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

- 予約済み IP をブロックした場合は、[linuxParameters][31] を構成して、プライベートロケーションコンテナに `NET_ADMIN` 機能を付与してください。
- 環境変数の `DATADOG_API_KEY`、`DATADOG_ACCESS_KEY`、`DATADOG_SECRET_ACCESS_KEY`、`DATADOG_PUBLIC_KEY_PEM`、および `DATADOG_PRIVATE_KEY` を使用する場合、それらを `"command": [ ]` セクションに含める必要はありません。

[31]: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_LinuxParameters.html

{{< /tab >}}

{{% tab "Fargate" %}}

以下に一致する Fargate タスクの定義を新規に作成します。各パラメーターを、以前に生成したプライベートロケーション構成ファイルの対応する値に置き換えてください。

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

{{< /tab >}}

{{% tab "AWS Secrets Manager を使用した Fargate" %}}

AWS Secrets Manager でシークレットを作成して、以前に生成したプライベートロケーション構成のすべてまたは一部を保存します。`publicKey` は、構成ファイルにそのまま保持することはできません。たとえば、次のようになります。

```json
{
    "datadogApiKey": "...",
    "id": "...",
    "site": "...",
    "accessKey": "...",
    "secretAccessKey": "...",
    "privateKey": "...",
    "pem": "...",
    "fingerprint": "..."
}
```

タスク定義と AWS Fargate インスタンスに Secrets Manager からの読み取りを許可する権限が必要です。詳細については、[Amazon ECS の Secrets Manager シークレットを使用した機密データの指定][25]を参照してください。

以下の例に一致する Fargate タスク定義を作成し、シークレットのリスト内の値を、前のステップで作成したシークレットの ARN に置き換えます。例: `arn:aws:secretsmanager:<region>:<account-id>:secret:<secret_arn>:<secret_key>::`。

Secrets Manager にすべての構成を保存しなかった場合でも、ハードコーディングされた文字列引数として値を渡すことができます。

```yaml
{
    ...
    "containerDefinitions": [
        {
            "entryPoint": [
                "/bin/bash",
                "-c"
            ],
            "command": [
                "/home/dog/scripts/entrypoint.sh --locationID=$locationID --publicKey.fingerprint=$fingerprint"
            ],
            "secrets": [
              {
                "name": "DATADOG_ACCESS_KEY",
                "valueFrom": "..."
              },
              {
                "name": "DATADOG_API_KEY",
                "valueFrom": "...",
              },
              {
                "name": "fingerprint",
                "valueFrom": "...",
              },
              {
                "name": "locationID",
                "valueFrom": "...",
              },
              {
                "name": "DATADOG_PUBLIC_KEY_PEM",
                "valueFrom": "...",
              },
              {
                "name": "DATADOG_PRIVATE_KEY",
                "valueFrom": "...",
              },
              {
                "name": "DATADOG_SECRET_ACCESS_KEY",
                "valueFrom": "...",
              },
              {
                "name": "DATADOG_SITE",
                "valueFrom": "...",
              }
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

[25]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html

{{< /tab >}}

{{% tab "EKS" %}}

Datadog はすでに Kubernetes および AWS と統合されているため、すぐに EKS を監視することができます。

1. 以下を実行し、以前に作成した JSON ファイルで Kubernetes Secret を作成します。

    ```shell
    kubectl create secret generic private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. Deployment を使用して、プライベートロケーションに関連する望ましい状態を記述します。次の `private-location-worker-deployment.yaml` ファイルを作成します。

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

    **Note:** If you have blocked reserved IPs, configure a security context to grant `NET_ADMIN` [Linux capabilities][26] to your private location containers.

3. 構成を適用します。

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "GUI 経由の Windows" %}}

1. [`datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi` ファイル][101]をダウンロードし、プライベートロケーションをインストールしたいマシンからこのファイルを実行します。
1. ウェルカムページで [**Next**] (次へ) をクリックし、EULA を読み、利用規約に同意します。[**Next**] (次へ) をクリックします。
1. アプリケーションのインストール先を変更するか、デフォルト設定のままにします。[**Next**] (次へ) をクリックします。
1. Windows プライベートロケーションを構成するには以下の方法があります。
   - Datadog Synthetics Private Location Worker の JSON 構成を貼り付けて入力します。このファイルは、[プライベートロケーションの作成][102]時に Datadog によって生成されます。
   - Datadog Synthetics Private Location Worker の JSON 構成を含むファイルのパスを参照または入力します。
   - 空白のままにしておき、インストール完了後に Windows のコマンドラインプロンプトで `C:\\Program Files\Datadog-Synthetics\Synthetics\synthetics-pl-worker.exe --config=<PathToYourConfiguration>` を実行することができます。

   {{< img src="synthetics/private_locations/configuration_selector_paste.png" alt="Synthetics Private Location Worker ウィザード、MSI インストーラー。[Paste in a JSON configuration] (JSON 構成を貼り付ける) オプションが選択されています。この JSON 構成のテキストフィールドが表示されています。" style="width:80%;" >}}

1. 以下の構成オプションを適用できます。

   {{< img src="synthetics/private_locations/synthetics_pl_windows_fips.png" alt="Synthetics Private Location Worker ウィザード、MSI インストーラー。FIPS 140-2 暗号化モードの設定が表示されています。" style="width:80%;" >}}

   Apply firewall rules needed by this program to Windows Firewall (このプログラムに必要なファイアウォールルールを Windows ファイアウォールに適用)
   : インストーラーがインストール時にファイアウォールルールを適用し、アンインストール時に削除できるようにします。

   Apply rules to block reserved IPs in Windows Firewall (Windows ファイアウォールで予約済み IP をブロックするルールを適用)
   : Chrome、Firefox、Edge (インストールされている場合) のブロックルールを構成し、Windows ファイアウォールで予約済み IP アドレス範囲の送信をブロックするルールを追加します。

   Enable File Logging (ファイルログの有効化)
   : Synthetics Private Location Worker がインストールディレクトリ内でログファイルを記録できるようにします。

   Log Rotation Days (ログローテーション日数)
   : ローカルシステムからログを削除するまでの保存日数を指定します。

   Logging Verbosity (ロギングの冗長性)
   : Synthetics Private Location Worker のコンソールとファイルのロギングの冗長性を指定します。

   Enable FIPS 140-2 cryptographic mode (FIPS 140-2 暗号化モードを有効にする)
   : 安全な通信のために FIPS 準拠の暗号化モジュールを有効にします。このオプションを使用するには、Windows ホストが Windows FIPS モードで実行されている必要があります。プライベートロケーション v1.63.0 以上で利用可能です。

1. [**Next**] (次へ)、[**Install**] (インストール) をクリックしてインストールプロセスを開始します。

プロセスが完了したら、インストール完了ページで [**Finish**] (完了) をクリックします。

<div class="alert alert-danger">JSON 構成を入力した場合は、その構成を使用して Windows サービスの実行が開始されます。構成を入力していない場合は、コマンドプロンプトから  <code>C:\\Program Files\Datadog-Synthetics\Synthetics\synthetics-pl-worker.exe --config=< PathToYourConfiguration ></code>  を実行するか、 <code>start menu</code>  のショートカットを使用して Synthetics Private Location Worker を起動します。</div>

[101]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
[102]: https://app.datadoghq.com/synthetics/settings/private-locations

{{< /tab >}}

{{% tab "CLI 経由の Windows" %}}

1. [`datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi` ファイル][101]をダウンロードし、プライベートロケーションをインストールしたいマシンからこのファイルを実行します。
2. インストーラーをダウンロードしたディレクトリで、以下のコマンドのいずれかを実行します。

   - PowerShell ターミナルで

     ```powershell
     Start-Process msiexec "/i datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi /quiet /qn CONFIG_FILEPATH=<ワーカー構成ファイルのパス>";
     ```

   - またはコマンドターミナルで

     ```cmd
     msiexec /i datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi /quiet /qn CONFIG_FILEPATH=<ワーカー構成ファイルのパス>
     ```

パラメーターを追加することができます。

| オプションパラメーター | 定義 | 値 | デフォルト値 | 型 |
|---|---|---|---|---|
| APPLYDEFAULTFIREWALLRULES | プログラムに必要なファイアウォールルールを適用します。| 1 | 該当なし | 0: 無効<br>1: 有効 |
| APPLYFIREWALLDEFAULTBLOCKRULES | インストールされている各ブラウザ (Chrome、Edge、Firefox) の予約済み IP アドレスをブロックします。Windows ファイアウォールでは、ループバック接続をブロックすることはできません。| 0 | 該当なし | 0: 無効<br>1: 有効 |
| LOGGING_ENABLED | 有効にすると、ファイルログが構成されます。これらのログは、インストールディレクトリの logs フォルダに保存されます。| 0 | `--enableFileLogging` | 0: 無効<br>1: 有効 |
| LOGGING_VERBOSITY | プログラムのロギングの冗長性を構成します。これはコンソールログとファイルログに影響します。| これはコンソールログとファイルログに影響します。| `-vvv` | `-v`: エラー<br>`-vv`: 警告<br>`-vvv`: 情報<br>`vvvv`: デバッグ |
| LOGGING_MAXDAYS | システム上のファイルログを削除するまでの保存日数。無人インストールを実行する場合は、任意の数値を設定できます。| 7 | `--logFileMaxDays` | 整数 |
| CONFIG_FILEPATH | これは、Synthetics Private Location Worker JSON 構成ファイルのパスに変更する必要があります。パスにスペースが含まれている場合は引用符で囲んでください。| <None> | `--config` | 文字列 |

FIPS 140-2 暗号化モードを有効にするには、ワーカー実行可能ファイルを実行する前に `ENABLE_FIPS=1` 環境変数を設定してください。このオプションを使用するには、Windows ホストが Windows FIPS モードで実行されている必要があります。プライベートロケーション v1.63.0 以上で利用可能です。

例:

```cmd
set ENABLE_FIPS=1 && .\synthetics-pl-worker.exe --config "<PathToYourConfiguration>"
```

[101]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi

{{< /tab >}}
{{< /tabs >}}

管理者用のプライベートロケーションのパラメーターについては、[構成][32]を参照してください。

#### ルート証明書 {#root-certificates}

カスタムルート証明書をプライベートロケーションにアップロードして、API テストやブラウザテストで独自の `.pem` ファイルを使用して SSL ハンドシェイクを実行させることができます。

{{< tabs >}}
{{% tab "Linux コンテナ" %}}

プライベートロケーションのコンテナをスピンアップする際に、プライベートロケーションの構成ファイルをマウントするのと同じように、関連する証明書 `.pem` ファイルを `/etc/datadog/certs` にマウントします。これらの証明書は信頼できる CA と見なされ、テストの実行時に使用されます

<div class="alert alert-info">すべての  <code>.pem</code>  ファイルを 1 つにまとめる場合は、ファイル内の証明書の順序が重要になります。信頼チェーンを確立するには、中間証明書をルート証明書の前に配置する必要があります。</div>

{{% /tab %}}

{{% tab "Windows サービス" %}}

プライベートロケーション用のルート証明書を Windows サービスにインストールする手順は次のとおりです。

1. レジストリエディターアプリを開きます。
2. エントリ `Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\synthetics-private-location` に移動します。
3. `Environment` という名前のレジストリキーを作成し、値の型を `Multi-string` にします。

<div class="alert alert-info">使用する証明書は、Synthetic Monitoring Service と同じフォルダーにある必要があります。
デフォルトの場所は、<code>C:\Program Files\Datadog-Synthetics\Synthetics</code> です。</div>

4. 値 `NODE_EXTRA_CA_CERTS=C:\Program Files\Datadog-Synthetics\Synthetics\CACert.pem` を設定します。

   {{< img src="synthetics/private_locations/windows_pl_set_service.png" alt="画像の説明" style="width:100%;" >}}

5. サービスアプリを開き、Datadog Synthetic Monitoring Private Location サービスを再読み込みします。

{{% /tab %}}

{{% tab "Windows スタンドアロン" %}}

`synthetics-private-location.exe` を使用するスタンドアロン Windows プロセスにプライベートロケーション用のルート証明書をインストールする手順は次のとおりです。

1. Windows コマンドプロンプトまたは PowerShell を開きます。

2. 環境変数を設定し、実行可能ファイルを呼び出します。

例:

```text
set NODE_EXTRA_CA_CERTS=C:\Program Files\Datadog-Synthetics\Synthetics\CACert.pem && .\synthetics-private-location.exe --config "C:\ProgramData\Datadog-Synthetics\Synthetics\worker-config.json"
```

FIPS 140-2 暗号化モードを有効にするには、`ENABLE_FIPS=1` を含めます。

```text
set ENABLE_FIPS=1 && set NODE_EXTRA_CA_CERTS=C:\Program Files\Datadog-Synthetics\Synthetics\CACert.pem && .\synthetics-private-location.exe --config "C:\ProgramData\Datadog-Synthetics\Synthetics\worker-config.json"
```

このオプションを使用するには、Windows ホストが Windows FIPS モードで実行されている必要があります。プライベートロケーション v1.63.0 以上で利用可能です。

{{% /tab %}}
{{< /tabs >}}

#### ライブネスプローブとレディネスプローブのセットアップ {#set-up-liveness-and-readiness-probes}

ワーカーが正しく動作していることをオーケストレーターが確認できるように、ライブネスプローブまたはレディネスプローブを追加します。

レディネスプローブの場合、プライベートロケーションのデプロイメントでポート `8080` のプライベートロケーションステータスプローブを有効にする必要があります。詳細については、[プライベートロケーションの構成][5]を参照してください。

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

{{% tab "Helm チャート" %}}

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

#### ヘルスチェックの追加構成 {#additional-health-check-configurations}

<div class="alert alert-warning">プライベートロケーションのヘルスチェックを追加するこの方法は、サポートされなくなりました。Datadog では、ライブネスプローブとレディネスプローブを使用することを推奨しています。</div>

プライベートロケーションコンテナの `/tmp/liveness.date` ファイルは、Datadog から正常にポーリングされるごとに更新されます (デフォルトでは 2 秒ごと)。直近 1 分間にフェッチが行われていない場合など、しばらくポーリングが行われていない場合は、コンテナが異常と見なされます。

以下の構成を使用して、`livenessProbe` でコンテナにヘルスチェックを設定します。

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

{{% tab "Helm チャート" %}}

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

### プライベートロケーションのイメージをアップグレードする {#upgrade-a-private-location-image}

既存のプライベートロケーションをアップグレードするには、プライベートロケーションのサイドパネルにある**歯車**アイコンをクリックし、[**Installation instructions**] (インストール手順) をクリックします。

{{< img src="synthetics/private_locations/pl_edit_config.png" alt="プライベートロケーションのセットアップワークフローにアクセスする" style="width:90%;" >}}

次に、[環境に応じた構成コマンド](#install-your-private-location)を実行して、プライベートロケーションの最新バージョンのイメージを取得します。

**注**: プライベートロケーションのイメージを起動するために `docker run` を使用していて、以前に `latest` タグを使用してプライベートロケーションのイメージをインストールしたことがある場合は、同じ `latest` タグでローカルに存在するキャッシュバージョンのイメージに依存するのではなく、最新バージョンがプルされるように、`docker run` コマンドに `--pull=always` を追加してください。

### 内部エンドポイントをテストする {#test-your-internal-endpoint}

少なくとも 1 つのプライベートロケーションワーカーが Datadog にレポートを開始すると、プライベートロケーションのステータスが緑色で表示されます。

{{< img src="synthetics/private_locations/pl_reporting.png" alt="プライベートロケーションのレポート" style="width:90%;">}}

`REPORTING` ヘルスステータスおよび関連するモニターステータスが、[**Settings**] (設定) ページのプライベートロケーションのリストに表示されます。

{{< img src="synthetics/private_locations/pl_monitoring_table_reporting_1.png" alt="プライベートロケーションのヘルスステータスとモニターステータス" style="width:100%;">}}

内部エンドポイントの 1 つで速度テストを起動して最初の内部エンドポイントのテストを開始し、期待される応答が得られるかどうかを確認します。

{{< img src="synthetics/private_locations/pl_fast_test.mp4" alt="プライベートロケーションの速度テスト" video="true" width="90%">}}

**注:** Datadog は、プライベートロケーションからのアウトバウンドトラフィックのみを送信します。インバウンドトラフィックは送信されません。

## Synthetic テストをプライベートロケーションから起動する {#launch-synthetic-tests-from-your-private-location}

API テスト、マルチステップ API テスト、またはブラウザテストを作成し、関心のある**プライベートロケーション**を選択します。

{{< img src="synthetics/private_locations/assign-test-pl_3.png" alt="Synthetic テストをプライベートロケーションに割り当てる" style="width:90%;">}}

プライベートロケーションは、Datadog が管理するロケーションと同様に使用できます。プライベートロケーションに [Synthetic テスト][29]を割り当てる、テスト結果を視覚化する、[Synthetic メトリクス][11]を取得するなど、さまざまなことが可能です。

## プライベートロケーションのサイズ変更 {#scale-your-private-location}

1 つのプライベートロケーションに単一の構成ファイルで複数のワーカーを実行できるため、ワーカーを追加または削除することでプライベートロケーションを**水平スケーリング**できます。このとき、必ず `concurrency` パラメーターを設定し、プライベートロケーションで実行するテストのタイプおよび数と一致するワーカーリソースを割り当てます。

プライベートロケーションのワーカーが処理できる負荷を増やすことで、プライベートロケーションを**垂直スケーリング**することもできます。この場合も同様に、`concurrency` パラメーターを使用して、ワーカーが実行できるテストの最大数を調整し、ワーカーに割り当てられたリソースを更新する必要があります。

詳しくは、[プライベートロケーションのディメンション][18]を参照してください。

プライベートロケーションを Continuous Testing に使用するには、`concurrency` パラメーターに値を設定して、並列化を制御してください。詳しくは、[Continuous Testing][23] を参照してください。

## プライベートロケーションを監視する {#monitor-your-private-location}

最初は、プライベートロケーションから実行するテストの数と種類に見合ったリソースを追加しますが、プライベートロケーションの規模を縮小すべきか拡大すべきかを知る最も簡単な方法は、厳密に監視することです。[プライベートロケーションモニタリング][19]は、プライベートロケーションのパフォーマンスおよび状態に関する洞察と、すぐに使用できるメトリクスおよびモニターを提供します。

詳しくは、[プライベートロケーションモニタリング][19]を参照してください。

## 権限 {#permissions}

デフォルトでは、Datadog Admin ロールを持つユーザーのみが、プライベートロケーションの作成、プライベートロケーションの削除、プライベートロケーションのインストールガイドラインへのアクセスを行うことができます。

[Datadog Admin ロールおよび Datadog Standard ロール][20]を持つユーザーは、プライベートロケーションの表示、プライベートロケーションの検索、プライベートロケーションへの Synthetic テストの割り当てを行うことができます。ユーザーをこれら 2 つの[デフォルトロール][19]のいずれかにアップグレードして、[[**Private Locations**] (プライベートロケーション) ページ][22]へのアクセスを許可してください。

[カスタムロール機能][21]を使用している場合は、`synthetics_private_location_read` および `synthetics_private_location_write` の権限を含むカスタムロールにユーザーを追加します。

<div class="alert alert-warning">制限されたプライベートロケーションがテストに含まれている場合、テストを更新するとそれらのロケーションがテストから削除されます。</div>

## アクセス制限 {#restrict-access}

ロール、チーム、または個々のユーザーに基づいてテストへのアクセス権を制限するには、[きめ細かなアクセス制御][24]を使用します。

1. フォームの権限セクションを開きます。
2. [**Edit Access**] (アクセスの編集) をクリックします。
  {{< img src="synthetics/settings/grace_2.png" alt="プライベートロケーションの構成フォームからテストの権限を設定する" style="width:100%;" >}}
3. [**Restrict Access**] (アクセスの制限) をクリックします。
4. チーム、ロール、またはユーザーを選択します。
5. [**Add**] (追加) をクリックします。
6. それぞれに関連付けたいアクセスレベルを選択します。
7. [**Done**] (完了) をクリックします。

<div class="alert alert-info">プライベートロケーションへの Viewer アクセス権がなくても、プライベートロケーションから結果を表示できます。<br><br>
プライベートロケーションを制限すると、他のユーザーがそれをテストに追加したり編集したりできなくなる場合がありますが、権限のあるユーザーによってテストに追加されていればその名前を見ることはできます。</div>

| アクセスレベル | PL の手順を表示 | PL のメトリクスを表示 | PL をテストで使用 | PL の構成を編集 |
| ------------ | ---------------------| --------------- | -------------- | ---------------------- |
| No access    |                      |                 |                |                        |
| Viewer       | {{< X >}}            | {{< X >}}       | {{< X >}}      |                        |
| Editor       | {{< X >}}            | {{< X >}}       | {{< X >}}      | {{< X >}}              |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker?pli=1
[4]: https://docs.docker.com/engine/install/
[5]: /ja/synthetics/private_locations/configuration/
[6]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[7]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml
[10]: https://docs.docker.com/engine/reference/builder/#healthcheck
[11]: /ja/synthetics/metrics
[12]: /ja/synthetics/api_tests/
[13]: /ja/synthetics/multistep?tab=requestoptions
[14]: /ja/synthetics/browser_tests/?tab=requestoptions
[16]: /ja/agent/
[17]: /ja/synthetics/metrics/
[18]: /ja/synthetics/private_locations/dimensioning
[19]: /ja/synthetics/private_locations/monitoring
[20]: /ja/account_management/rbac/permissions
[21]: /ja/account_management/rbac#custom-roles
[22]: https://app.datadoghq.com/synthetics/settings/private-locations
[23]: /ja/continuous_testing/cicd_integrations/configuration
[24]: /ja/account_management/rbac/granular_access
[25]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[26]: https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities
[27]: https://docs.datadoghq.com/ja/synthetics/private_locations/configuration/#private-locations-admin
[28]: /ja/continuous_testing/cicd_integrations
[29]: /ja/synthetics/
[30]: https://github.com/DataDog/helm-charts/tree/master/charts/synthetics-private-location
[31]: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_LinuxParameters.html
[32]: /ja/synthetics/platform/private_locations/configuration
[33]: /ja/synthetics/guide/kerberos-authentication/