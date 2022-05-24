---
description: Synthetic API テストとブラウザテストをプライベートロケーションから実行する
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/
  tag: ブログ
  text: Datadog で Synthetic プライベートロケーションを監視する
- link: /getting_started/synthetics/private_location
  tag: Documentation
  text: プライベートロケーションの概要
- link: /synthetics/private_locations/monitoring
  tag: Documentation
  text: プライベートロケーションを監視する
- link: /synthetics/private_locations/dimensioning
  tag: ドキュメント
  text: プライベートロケーションのディメンション
- link: /synthetics/api_tests
  tag: ドキュメント
  text: APIテストの設定
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_private_location
  tag: Terraform
  text: Terraform による Synthetic プライベートロケーションの作成と管理
kind: ドキュメント
title: Synthetic テストをプライベートロケーションから実行する
---

<div class="alert alert-info">
IE11 ブラウザテストを実行するための Windows プライベートロケーションベータ版への追加をご希望の場合は、<a href="https://docs.datadoghq.com/help/">Datadog サポート</a>にご連絡ください。
</div>

## 概要

プライベートロケーションから、**内部用アプリケーションの監視や、パブリックインターネットから接続できないプライベートエンドポイントの監視**を行えます。これは以下にも使用できます。

* ビジネスでミッションクリティカルな領域に、**カスタム Synthetic ロケーションを作成します**。
* [Synthetics および CI/CD][1] を使用して本番環境に新機能をリリースする前に、**内部 CI 環境でアプリケーションパフォーマンスを確認します**。
* 内部ネットワークの内外両方から**アプリケーションのパフォーマンスを比較します**。

プライベートロケーションは、プライベートネットワーク内のどこにでもインストールできる Docker コンテナとして提供されます。作成してインストールしたら、通常の管理ロケーションと同じように、[Synthetic テスト][2]をプライベートロケーションに割り当てることができます。

プライベートロケーションワーカーは、HTTPS を使用してテストコンフィギュレーションを Datadog のサーバーからプルし、スケジュールまたはオンデマンドでテストを実行して、テスト結果を Datadog のサーバーに返します。次に、管理ロケーションから実行されているテストを視覚化する方法とまったく同じ方法で、プライベートロケーションのテスト結果を視覚化できます。

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Synthetic テストのプライベートロケーションへの割り当て" style="width:100%;">}}

## 前提条件

### Docker

プライベートロケーションは、プライベートネットワーク内のどこにでも設置できる Docker コンテナです。プライベートロケーションのワーカーイメージ][3]には、Google Container Registry からアクセスできます。ホスト上に [Dockerエンジン][4]があり、Linux コンテナモードで動作可能であれば、Linux ベースの OS や Windows OS 上で動作させることができます。

### Datadog プライベートロケーションエンドポイント

テストコンフィギュレーションを取得してテスト結果を送信するには、プライベートロケーションのワーカーが以下の Datadog API エンドポイントにアクセスする必要があります。

{{< site-region region="us" >}}

| ポート | エンドポイント                                                                                             | 説明                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | バージョン 0.1.6 以降の場合は `intake.synthetics.datadoghq.com`、バージョン 0.1.5 以前の場合は `api.datadoghq.com`   | [AWS Signature Version 4 プロトコル][1]に基づく社内プロトコルを使用して、テストコンフィギュレーションをプルし、テスト結果を Datadog にプッシュするためにプライベートロケーションで使用されます。 |
| 443  | バージョン 0.2.0 以降、1.4.0 以下は `intake-v2.synthetics.datadoghq.com`                                            | ブラウザのテストアーティファクト (スクリーンショット、エラー、リソースなど) をプッシュするためにプライベートロケーションで使用されます。                                                                         |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="eu" >}}

| ポート | エンドポイント                                               | 説明                                                                                   |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `api.datadoghq.eu`                                | [AWS Signature Version 4 プロトコル][1]に基づく社内プロトコルを使用して、テストコンフィギュレーションをプルし、テスト結果を Datadog にプッシュするためにプライベートロケーションで使用されます。 |
| 443  | バージョン 0.2.0 以降、1.5.0 以下は `intake-v2.synthetics.datadoghq.eu` | ブラウザのテストアーティファクト（スクリーンショット、エラー、リソース）をプッシュするためにプライベートロケーションで使用されます。                                                                            |

**注**: これらのドメインは、静的 IP アドレスのセットを指しています。これらのアドレスは、https://ip-ranges.datadoghq.eu、具体的には https://ip-ranges.datadoghq.eu/api.json (`api.datadoghq.eu` の場合) および https://ip-ranges.datadoghq.eu/synthetics-private-locations.json (`intake-v2.synthetics.datadoghq.eu` の場合) にあります。

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="us3" >}}

| ポート | エンドポイント                                                                                             | 説明                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `intake.synthetics.us3.datadoghq.com` | [AWS Signature Version 4 プロトコル][1]に基づく社内プロトコルを使用して、テストコンフィギュレーションをプルし、テスト結果を Datadog にプッシュするためにプライベートロケーションで使用されます。 |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="gov" >}}

| ポート | エンドポイント                                                                                             | 説明                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `intake.synthetics.ddog-gov.com` | [AWS Signature Version 4 プロトコル][1]に基づく社内プロトコルを使用して、テストコンフィギュレーションをプルし、テスト結果を Datadog にプッシュするためにプライベートロケーションで使用されます。 |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

## プライベートロケーションを設定する

プライベートロケーションは、**Admin** ロールを持つユーザーのみが作成できます。詳しくは、[権限](#permissions)を参照してください。

### プライベートロケーションを作成する

[**Synthetic Monitoring** > **Settings** > **Private Locations**][22]  に移動し、**Add Private Location** をクリックします。

{{< img src="synthetics/private_locations/synthetics_pl_add.png" alt="プライベートロケーションを作成する" style="width:90%;">}}

プライベートロケーションの詳細を入力します。

1. プライベートロケーションの**名前**および**説明**を指定します。
2. プライベートロケーションに関連づけたい**タグ**を追加します。Windows でプライベートロケーションを構成する場合は、**This is a Windows Private Location** を選択します。
3. 既存の **API キー**を 1 つ選択します。API キーを選択すると、プライベートロケーションと Datadog 間の通信が可能になります。既存の API キーがない場合は、**Generate API key** をクリックして専用ページで作成します。`Name` と `API key` フィールドのみが必須です。
4. プライベートロケーションのアクセス権を設定し、**Save Location and Generate Configuration File** をクリックします。Datadog はプライベートロケーションを作成し、関連するコンフィギュレーションファイルを生成します。

{{< img src="synthetics/private_locations/pl_creation_1.png" alt="プライベートロケーションに詳細を追加する" style="width:85%;">}}
### プライベートロケーションを構成する

生成されたコンフィギュレーションファイルをカスタマイズして、プライベートロケーションを構成します。**ステップ 3** で[プロキシ](#proxy-configuration)や[予約 IP のブロック](#blocking-reserved-ips)などの初期構成パラメーターを追加すると、**ステップ 4** で生成したコンフィギュレーションファイルは自動的に更新されます。

内部ネットワークの設定によっては、[詳細オプション](#advanced-configuration)でプライベートロケーションを構成することができます。

#### プロキシのコンフィギュレーション

プライベートロケーションと Datadog 間のトラフィックがプロキシを経由する必要がある場合は、`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>` の形式でプロキシ URL を指定し、生成されたコンフィギュレーションファイルに `proxyDatadog` パラメーターを追加します。

{{<img src="synthetics/private_locations/pl_proxy_1.png" alt="Add a proxy to your private location configuration file" style="width:90%;">}}

[高度なプロキシコンフィギュレーションオプション][5]が利用可能です。

#### 予約済み IP のブロック

デフォルトでは、Synthetic ユーザーは任意の IP を使用してエンドポイントで Synthetic テストを作成できます。ユーザーがネットワーク内の機密性の高い内部 IP でテストを作成できないようにする場合は、**Block reserved IPs** ボタンを切り替えて、予約済み IP 範囲のデフォルトセット ([IPv4 アドレスレジストリ][6]および [IPv6 アドレスレジストリ][7]) をブロックし、生成されたコンフィギュレーションファイルで関連する `enableDefaultBlockedIpRanges` パラメーターを `true` に設定します。

テストするエンドポイントの一部がブロックされた予約済み IP 範囲の 1 つまたは複数にある場合は、その IP または CIDR、あるいはその両方を許可リストに追加して、生成されたコンフィギュレーションファイルに関連する `allowedIPRanges` パラメーターを追加できます。

{{< img src="synthetics/private_locations/pl_reserved_ips_1.png" alt="予約済み IP を構成する" style="width:90%;">}}

[高度な予約済み IP コンフィギュレーションオプション][8]が利用可能です。

#### 高度なコンフィギュレーション

[高度なコンフィギュレーションオプション][9]が利用可能です。以下の `help` コマンドを実行することで確認できます。

```shell
docker run --rm datadog/synthetics-private-location-worker --help
```

### コンフィギュレーションファイルを表示する

プライベートロケーションのコンフィギュレーションファイルに適切なオプションを追加した後、このファイルを作業ディレクトリにコピーアンドペーストしてください。このコンフィギュレーションファイルには、プライベートロケーションの認証、テスト構成の復号化、およびテスト結果の暗号化のためのシークレットが含まれています。

{{< img src="synthetics/private_locations/pl_view_file_1.png" alt="予約済み IP を構成する" style="width:90%;">}}

Datadog はシークレットを保存しないので、**View Installation Instructions** をクリックする前に、ローカルに保存してください。

**注:** ワーカーをさらに追加する場合、または、他のホストにワーカーをインストールする場合は、これらの秘密情報を再度参照できる必要があります。

### プライベートロケーションをインストールする

タスクの定義では、環境変数 `DATADOG_API_KEY`、`DATADOG_ACCESS_KEY`、`DATADOG_SECRET_ACCESS_KEY`、`DATADOG_PRIVATE_KEY` を使用することが可能です。

次でプライベートロケーションを起動します。

{{< tabs >}}

{{% tab "Docker" %}}

次のコマンドを実行して、コンフィギュレーションファイルをコンテナにマウントすることでプライベートロケーションワーカーを起動します。`<MY_WORKER_CONFIG_FILE_NAME>.json` ファイルはルートホームフォルダーではなく `/etc/docker` 内に格納してください。

```shell
docker run --rm -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest
```

**注:** 予約済み IP をブロックした場合は、プライベートロケーションコンテナに `NET_ADMIN` [Linux 機能][1]を追加してください。

このコマンドは、Docker コンテナを起動し、プライベートロケーションでテストを実行できるようにします。**Datadog は、適切な再起動ポリシーを使用して、コンテナをデタッチモードで実行することをお勧めします。**

[1]: https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities

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

[1]: https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities

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

**注:** 予約済み IP をブロックした場合は、[linuxParameters][1] を構成して、プライベートロケーションコンテナに `NET_ADMIN` 機能を付与してください。

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

{{< /tabs >}}

#### ヘルスチェックの設定

[ヘルスチェック][10]メカニズムを追加すると、オーケストレーターはワーカーが正しく実行していることを確認できます。

プライベートロケーションコンテナの `/tmp/liveness.date` ファイルは、Datadog から正常にポーリングされるごとに更新されます (デフォルトでは 2 秒)。例えば過去1分間にフェッチされないなど一定期間ポーリングが行われないと、コンテナは異常だとみなされます。

以下のコンフィギュレーションを使い、コンテナにヘルスチェックを設定します。

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

#### ヘルスチェックの追加構成

選択したコンテナオーケストレーターがヘルスチェックのエンドポイントを必要とする場合、プライベートロケーションデプロイメントでポート `8080` のプライベートロケーションステータスプローブを有効にしてください。詳細については、[高度な構成][15]を参照してください。

### 内部エンドポイントをテストする

1 つ以上のプライベートロケーションコンテナが Datadog にレポートを開始すると、プライベートロケーションステータスが緑に表示されます。

{{< img src="synthetics/private_locations/pl_reporting.png" alt="プライベートロケーションのレポート" style="width:90%;">}}

また、**Settings** ページの Private Locations リストに表示される `REPORTING` ヘルスステータスを見ることができます。

{{< img src="synthetics/private_locations/pl_monitoring_table_reporting.png" alt="プライベートロケーションのヘルス" style="width:95%;">}}

内部エンドポイントの 1 つで速度テストを起動して最初の内部エンドポイントのテストを開始し、期待される応答が得られるかどうかを確認します。

{{< img src="synthetics/private_locations/pl_fast_test.mp4" alt="プライベートロケーションの速度テスト" video="true" width="90%">}}

**注:** Datadog はプライベートロケーションからアウトバウンドトラフィックのみを送信し、インバウンドトラフィックは送信されません。

## Synthetic テストをプライベートロケーションから起動する

API、マルチステップ API、またはブラウザテストを作成し、関心のある**プライベートロケーション**を選択します。

{{< img src="synthetics/private_locations/assign-test-pl-2.png" alt="Synthetics テストのプライベートロケーションへの割り当て" style="width:90%;">}}

プライベートロケーションは、Datadog が管理するロケーションと同様に使用できます。プライベートロケーションに [Synthetic テスト][2]を割り当て、テスト結果を視覚化し、[Synthetic メトリクス][11]を取得するなど、様々なことが可能です。

## プライベートロケーションのサイズ変更

1 つのプライベートロケーションに単一のコンフィギュレーションファイルで複数のコンテナを実行できるため、ワーカーを追加または削除することでプライベートロケーションを**水平スケーリング**できます。このとき、`concurrency` パラメーターを必ず設定し、プライベートロケーションで実行するテストのタイプおよび数と一致するワーカーリソースを割り当てます。

プライベートロケーションコンテナが取り扱うことのできるロードを増加してプライベートロケーションを**垂直にスケーリング**することもできます。同様に、`concurrency` パラメーターを使用して、ワーカーが実行できるテストの最大数を調整し、ワーカーに割り当てられたリソースを必ず更新してください。

詳しくは、[プライベートロケーションのディメンション][18]を参照してください。

## プライベートロケーションを監視する

最初はプライベートロケーションから実行するテストの数と種類に見合ったリソースを追加しますが、プライベートロケーションの規模を縮小すべきか拡大すべきかを知る最も簡単な方法は、厳密にモニターすることです。[プライベートロケーションモニタリング][19]は、すぐに使えるメトリクスやモニターと同様に、プライベートロケーションのパフォーマンスや状態に関する洞察を提供します。

詳しくは、[プライベートロケーションモニタリング][19]を参照してください。

## アクセス許可

デフォルトでは、Datadog Admin ロールを持つユーザーのみが、プライベートロケーションの作成、プライベートロケーションの削除、プライベートロケーションのインストールガイドラインにアクセスすることができます。

Datadog Admin ロールおよび Datadog Standard ロール][20]を持つユーザーは、プライベートロケーションの表示、プライベートロケーションの検索、プライベートロケーションへの Synthetic テストの割り当てを行うことができます。ユーザーをこれら 2 つの[デフォルト ロール][19]のいずれかにアップグレードして、[**Private Locations** ページ][22]へのアクセスを許可してください。

[カスタムロール機能][21]を使用している場合、ユーザーを `synthetics_private_location_read` と `synthetics_private_location_write` 権限を含むカスタムロールに追加してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/cicd_integrations
[2]: /ja/synthetics/
[3]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker?pli=1
[4]: https://docs.docker.com/engine/install/
[5]: /ja/synthetics/private_locations/configuration/#proxy-configuration
[6]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[7]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml
[8]: /ja/synthetics/private_locations/configuration/#reserved-ips-configuration
[9]: /ja/synthetics/private_locations/configuration/
[10]: https://docs.docker.com/engine/reference/builder/#healthcheck
[11]: /ja/synthetics/metrics
[12]: /ja/synthetics/api_tests/
[13]: /ja/synthetics/multistep?tab=requestoptions
[14]: /ja/synthetics/browser_tests/?tab=requestoptions
[15]: /ja/synthetics/private_locations/configuration#advanced-configuration
[16]: /ja/agent/
[17]: /ja/synthetics/metrics/
[18]: /ja/synthetics/private_locations/dimensioning
[19]: /ja/synthetics/private_locations/monitoring
[20]: /ja/account_management/rbac/permissions
[21]: /ja/account_management/rbac#custom-roles
[22]: https://app.datadoghq.com/synthetics/settings/private-locations