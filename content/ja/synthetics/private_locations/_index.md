---
title: Synthetic テストをプライベートロケーションから実行する
kind: ドキュメント
description: Synthetic API テストとブラウザテストをプライベートロケーションから実行する
further_reading:
  - link: /getting_started/synthetics/private_location
    tag: Documentation
    text: プライベートロケーションの概要
  - link: synthetics/browser_tests
    tag: Documentation
    text: ブラウザテストの設定
  - link: synthetics/api_tests
    tag: Documentation
    text: APIテストの設定
---
<div class="alert alert-warning">
この機能へのアクセスは制限されています。アクセス権をお持ちではない場合、<a href="https://docs.datadoghq.com/help/">Datadog サポートチーム</a>にお問い合わせください。
</div>

## 概要

プライベートロケーションから、**内部用アプリケーションの監視や、パブリックインターネットから接続できないプライベート URL の監視**を行えます。これは以下にも使用できます。

* ビジネスでミッションクリティカルな領域に、**カスタム Synthetic ロケーションを作成します**。
* [Synthetic CI/CD テスト][1]を使用して本番環境に新機能をリリースする前に、**内部 CI 環境でアプリケーションパフォーマンスを確認します**。
* 内部ネットワークの内外両方から**アプリケーションのパフォーマンスを比較します**。

プライベートロケーションは、プライベートネットワーク内のどこにでもインストールできる Docker コンテナとして提供されます。作成してインストールしたら、通常の管理対象の場所と同じように、[Synthetic テスト][2]をプライベートロケーションに割り当てることができます。

プライベートロケーションワーカーは、HTTPS を使用してテストコンフィギュレーションを Datadog のサーバーからプルし、スケジュールまたはオンデマンドでテストを実行して、テスト結果を Datadog のサーバーに返します。次に、管理された場所から実行されているテストを視覚化する方法とまったく同じ方法で、プライベートロケーションのテスト結果を視覚化できます。

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Synthetics テストをプライベートロケーションに割り当てる"  style="width:100%;">}}

## 前提条件

### Docker

プライベートロケーションワーカーは Docker コンテナとして出荷されます。公式の [Docker イメージ][3]は Docker Hub からご利用いただけます。[Docker エンジン][4]をホストで利用できる場合は Linux ベース OS や Windows OS で実行できます。また、Linux コンテナモードで実行できます。

### Datadog プライベートロケーションエンドポイント

テストコンフィギュレーションを取得してテスト結果を送信するには、プライベートロケーションのワーカーが以下の Datadog API エンドポイントにアクセスする必要があります。

{{< site-region region="us" >}}

| ポート | エンドポイント                                                                                             | 説明                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | バージョン 0.1.6 以降の場合は `intake.synthetics.datadoghq.com`、バージョン 0.1.5 以前の場合は `api.datadoghq.com`   | [AWS Signature Version 4 プロトコル][1]に基づく社内プロトコルを使用して、テストコンフィギュレーションをプルし、テスト結果を Datadog にプッシュするためにプライベートロケーションで使用されます。 |
| 443  | `intake-v2.synthetics.datadoghq.com` for versions >0.2.0                                             | ブラウザのテストアーティファクト ()スクリーンショット、エラー、リソース をプッシュするためにプライベートロケーションで使用されます                                                                         |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="eu" >}}

| ポート | エンドポイント                                               | 説明                                                                                   |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `api.datadoghq.eu`                                | [AWS Signature Version 4 プロトコル][1]に基づく社内プロトコルを使用して、テストコンフィギュレーションをプルし、テスト結果を Datadog にプッシュするためにプライベートロケーションで使用されます。 |
| 443  | `intake-v2.synthetics.datadoghq.eu` for versions >0.2.0| ブラウザのテストアーティファクト ()スクリーンショット、エラー、リソース をプッシュするためにプライベートロケーションで使用されます                                                                            |

**注**: これらのドメインは、静的 IP アドレスのセットを指しています。これらのアドレスは、https://ip-ranges.datadoghq.eu、具体的には https://ip-ranges.datadoghq.eu/api.json (`api.datadoghq.eu` の場合) および https://ip-ranges.datadoghq.eu/synthetics-private-locations.json (`intake-v2.synthetics.datadoghq.eu` の場合) にあります。

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

## プライベートロケーションを設定する

### プライベートロケーションを作成する

_Synthetic Monitoring_ -> _Settings_ -> _Private Locations_ に移動し、**Add Private Location** をクリックします。

{{< img src="synthetics/private_locations/add_pl.png" alt="プライベートロケーションを作成する"  style="width:100%;">}}

**注**: プライベートロケーションを作成できるのは **Admin** ユーザーのみです。

プライベートロケーションの詳細を入力します。

1. プライベートロケーションの**名前**および**説明**を指定します。
2. プライベートロケーションに関連付ける**タグ**を追加します。
3. 既存の **API キー**を 1 つ選択します。API キーを選択すると、プライベートロケーションと Datadog 間の通信が可能になります。既存の API キーがない場合は、**Generate API key** をクリックして専用ページで作成できます。

**注:** `Name` フィールドと `API key` フィールドのみが必須です。

次に、**Save Location and Generate Configuration File** をクリックしてプライベートロケーションを作成し、関連するコンフィギュレーションファイルを生成します (**ステップ 3** に表示されます)。

{{< img src="synthetics/private_locations/pl_creation.png" alt="プライベートロケーションに詳細を追加する"  style="width:90%;">}}

### プライベートロケーションを構成する

生成されたコンフィギュレーションファイルをカスタマイズして、プライベートロケーションを構成します。[プロキシ](#proxy-configuration)および[ブロックされている予約済み IP](#blocking-reserved-ips)のような初期コンフィギュレーションパラメーターは、**ステップ 2** で追加され、**ステップ 3** で自動的にコンフィギュレーションファイルに反映されます。最初のネットワーク設定に応じて、プライベートロケーションを[高度なオプション](#advanced-configuration)で構成することも可能です。

#### プロキシコンフィギュレーション

プライベートロケーションと Datadog 間のトラフィックがプロキシを経由する必要がある場合は、`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>` の形式でプロキシ URL を指定し、生成されたコンフィギュレーションファイルに `proxyDatadog` パラメーターを追加します。

{{< img src="synthetics/private_locations/pl_proxy.png" alt="プライベートロケーションコンフィギュレーションファイルにプロキシを追加する"  style="width:90%;">}}

[高度なプロキシコンフィギュレーションオプション][5]が利用可能です。

#### 予約済み IP のブロック

デフォルトでは、Synthetic ユーザーは任意の IP を使用してエンドポイントで Synthetic テストを作成できます。ユーザーがネットワーク内の機密性の高い内部 IP でテストを作成できないようにする場合は、**Block reserved IPs** ボタンを切り替えて、予約済み IP 範囲のデフォルトセット ([IPv4 アドレスレジストリ][6]および [IPv6 アドレスレジストリ][7]) をブロックし、生成されたコンフィギュレーションファイルで関連する `enableDefaultBlockedIpRanges` パラメーターを `true` に設定します。

テストするエンドポイントの一部がブロックされた予約済み IP 範囲の 1 つまたは複数にある場合は、その IP または CIDR、あるいはその両方を許可リストに追加して、生成されたコンフィギュレーションファイルに関連する `allowedIPRanges` パラメーターを追加できます。

{{< img src="synthetics/private_locations/pl_reserved_ips.png" alt="予約済み IP を構成する"  style="width:90%;">}}

[高度な予約済み IP コンフィギュレーションオプション][8]が利用可能です。

#### 高度なコンフィギュレーション

[高度なコンフィギュレーションオプション][9]が利用可能です。以下の `help` コマンドを実行することで確認できます。

```shell
docker run --rm datadog/synthetics-private-location-worker --help
```

### コンフィギュレーションファイルを表示する

適切なオプションをプライベートロケーションコンフィギュレーションファイルに追加した後、ファイルを作業ディレクトリにコピーアンドペーストできます。

{{< img src="synthetics/private_locations/pl_view_file.png" alt="予約済み IP を構成する"  style="width:90%;">}}

 **注**: コンフィギュレーションファイルには、プライベートロケーションの認証、テストコンフィギュレーションの復号、テスト結果の暗号といった秘密情報が含まれています。Datadog は秘密情報を保存しないため、プライベートロケーション画面を離れる前に、これらの情報をローカルに保存してください。**ワーカーをさらに追加する場合、または別のホストにワーカーをインストールする場合は、これらの秘密情報を再度参照できる必要があります。**

### プライベートロケーションをインストールする

次でプライベートロケーションを起動します。

{{< tabs >}}

{{% tab "Docker" %}}

次のコマンドを実行して、コンフィギュレーションファイルをコンテナにマウントすることでプライベートロケーションワーカーを起動します。`<MY_WORKER_CONFIG_FILE_NAME>.json` ファイルはルートホームフォルダーではなく `/etc/docker` 内に格納してください。

```shell
docker run --rm -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest
```

**注:** 予約済み IP をブロックした場合は、必ずプライベートロケーションコンテナに `NET_ADMIN` [Linux 機能][1]を追加してください。

このコマンドは、Docker コンテナを起動し、プライベートロケーションでテストを実行できるようにします。**適切な再起動ポリシーを使用して、コンテナをデタッチモードで実行することをお勧めします。**

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
   **注:** 予約済み IP をブロックした場合は、必ずプライベートロケーションコンテナに `NET_ADMIN` [Linux 機能][1]を追加してください。

2. 次でコンテナを起動します。

```shell
docker-compose -f docker-compose.yml up
```

[1]: https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities

{{% /tab %}}

{{% tab "Kubernetes Deployment" %}}

1. 以下を実行し、以前に作成した JSON ファイルで Kubernetes ConfigMap を作成します。

    ```shell
    kubectl create configmap private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. デプロイを利用して、プライベートロケーションに関連付けられている望ましい状態を記述します。次の `private-location-worker-deployment.yaml `ファイルを作成します。

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

   **注:** 予約済み IP をブロックした場合は、必ずプライベートロケーションコンテナに `NET_ADMIN` [Linux 機能][1]を追加してください。

3. コンフィギュレーションを適用します。

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/

{{% /tab %}}

{{% tab "Helm Chart" %}}

1. [Datadog Synthetics Private Location][1] を Helm リポジトリに追加します。

    ```shell
    helm repo add datadog https://helm.datadoghq.com 
    helm repo update
    ```

2. 以下を実行して事前に作成された JSON ファイルを使用して、リリース名 `<RELEASE_NAME>` でチャートをインストールします。

    ```shell
    helm install <RELEASE_NAME> datadog/synthetics-private-location --set-file configFile=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

    **注:** 予約済み IP をブロックした場合は、必ずプライベートロケーションコンテナに `NET_ADMIN` [Linux 機能][2]を追加してください。

[1]: https://github.com/DataDog/helm-charts/tree/master/charts/synthetics-private-location
[2]: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/

{{% /tab %}}

{{% tab "ECS" %}}

以下に一致する新しい EC2 タスク定義を作成します。各パラメーターは、以前に生成したプライベートロケーションのコンフィギュレーションファイルにある対応する値に置き換えてください。

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

**注:** 予約済み IP をブロックした場合は、必ず [linuxParameters][1]を構成して、プライベートロケーションコンテナに `NET_ADMIN` 機能を付与してください。

[1]: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_LinuxParameters.html

{{% /tab %}}

{{% tab "Fargate" %}}

以下に一致する新しい Fargate タスク定義を作成します。各パラメーターは、以前に生成したプライベートロケーションコンフィギュレーションファイルにある対応する値に置き換えてください。

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

**注:** 

タスク定義に環境変数を使用する場合、Fargate プライベートロケーションのデプロイには Datadog. の他の部分と異なる環境変数が使用されることにご留意ください。Fargate では、以下の環境変数を使用します。`DATADOG_API_KEY`, `DATADOG_ACCESS_KEY`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_PRIVATE_KEY`.

プライベートロケーションファイアウォールオプションは AWS Fargate でサポートされていません。したがって、`enableDefaultBlockedIpRanges` パラメーターは `true` に設定できません。

{{% /tab %}}

{{% tab "EKS" %}}

Datadog は既に Kubernetes および AWS と統合されているため、すぐに EKS を監視することができます。

1. 以下を実行し、以前に作成した JSON ファイルで Kubernetes ConfigMap を作成します。

    ```shell
    kubectl create configmap private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. デプロイを利用して、プライベートロケーションに関連付けられている望ましい状態を記述します。次の `private-location-worker-deployment.yaml `ファイルを作成します。

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

   **注:** 予約済み IP をブロックした場合は、必ずセキュリティコンテキストを構成して、プライベートロケーションコンテナに `NET_ADMIN` [Linux 機能][1]を追加してください。

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

### 内部エンドポイントをテストする

1 つ以上のプライベートロケーションコンテナが Datadog にレポートを開始すると、プライベートロケーションステータスが緑に設定されます。

{{< img src="synthetics/private_locations/pl_reporting.png" alt="プライベートロケーションのレポート"  style="width:90%;">}}

次に、内部エンドポイントの 1 つで速度テストを起動して最初の内部エンドポイントのテストを開始し、期待される応答が得られるかどうかを確認できます。

{{< img src="synthetics/private_locations/pl_fast_test.mp4" alt="プライベートロケーションの速度テスト" video="true" width="80%">}}

## Synthetic テストをプライベートロケーションから起動する

プライベートロケーションから Datadog への報告が正確なら、**Settings** ページのプライベートロケーションのリストに `OK` のヘルスステータスが表示されます。

{{< img src="synthetics/private_locations/pl_health.png" alt="プライベートロケーション健全性"  style="width:90%;">}}

次に、任意の API またはブラウザテスト作成フォームに移動し、対象の **Private locations** にチェックマークを付けて、スケジュールに従って Synthetic テストを実行することができます。

{{< img src="synthetics/private_locations/assign_test_pl.png" alt="Synthetics テストをプライベートロケーションに割り当てる"  style="width:80%;">}}

プライベートロケーションは、他の Datadog 管理ロケーションと同じように使用できます。具体的には、プライベートロケーションに [Synthetic テスト][2]を割り当て、テスト結果を視覚化し、[Synthetic メトリクス][11]を取得するなどが可能です。


## プライベートロケーションのサイズ変更

プライベートロケーションにワーカーを追加または削除することで、簡単に**水平スケーリング**することができます。単一のコンフィギュレーションファイルで、1 つのプライベートロケーションに対して複数のコンテナを実行できます。これにより、ワーカー 1 がテストを処理している時にワーカー 2 が次のテストのリクエストを送信するなど、各ワーカーが空きスロットの数に応じて `N` 件のテストの実行リクエストを送信します。

[`concurrency` パラメーター][12]を使用してプライベートロケーションを**垂直にスケーリング**して、プライベートロケーションで使用可能なスロットの数を調整することもできます。これらのスロットは、プライベートロケーションワーカーが並行して実行できるテストの数です。プライベートロケーションの [`concurrency` パラメーター][12]を更新する際は、[ワーカーに割り当てられたリソース](#hardware-requirements)も必ず更新してください。

### ハードウェア要件

#### CPU/メモリ

* 基本要件: 150mCores/150MiB

* スロットごとの追加要件:

| プライベートロケーションテストタイプ                          | 推奨される同時実行範囲 | CPU/メモリの推奨 |
| --------------------------------------------------- | ----------------------------- | ------------------------- |
| API テストとブラウザテストの両方を実行するプライベートロケーション | 1〜50                  | スロットあたり 150mCores/1GiB   |
| API テストのみを実行するプライベートロケーション             | 1〜200                 | スロットあたり 20mCores/5MiB    |
| ブラウザテストのみを実行するプライベートロケーション         | 1〜50                  | スロットあたり 150mCores/1GiB   |

**例:** API テストとブラウザテストの両方を実行し、[`concurrency`][12] をデフォルトの `10` に設定したプライベートロケーションの場合、安全な使用のための推奨値は〜1.5 コア `(150mCores + (150mCores*10 スロット))` と〜10GiB メモリ `(150M + (1G*10 スロット))` です。

#### ディスク

ディスクサイズに対して推奨されるのは、〜10MiB/スロット (API のみのプライベートロケーションの場合は 1MiB/スロット) を割り当てることです。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/ci
[2]: /ja/synthetics/
[3]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[4]: https://docs.docker.com/engine/install/
[5]: /ja/synthetics/private_locations/configuration/#proxy-configuration
[6]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[7]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml
[8]: /ja/synthetics/private_locations/configuration/#reserved-ips-configuration
[9]: /ja/synthetics/private_locations/configuration/
[10]: https://docs.docker.com/engine/reference/builder/#healthcheck
[11]: /ja/synthetics/metrics
[12]: /ja/synthetics/private_locations/configuration#advanced-configuration