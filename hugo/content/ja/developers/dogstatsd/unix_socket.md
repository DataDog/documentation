---
aliases:
- /ja/developers/metrics/unix_socket/
description: Unix ドメインソケット上の DogStatsD の使用ガイド
further_reading:
- link: developers/dogstatsd
  tag: Documentation
  text: DogStatsD 入門
- link: developers/libraries
  tag: Documentation
  text: 公式/コミュニティ作成の API および DogStatsD クライアントライブラリ
title: Unix ドメインソケット上の DogStatsD
---

バージョン 6.0 以降の Agent は、UDP 転送に代わる手段として、Unix ドメインソケット (UDS) でメトリクスを収集できるようになりました。

UDP は`ローカルホスト`ではたいへんよく機能しますが、コンテナ環境でのセットアップが難しい場合があります。Unix ドメインソケットを使用すると、Datadog Agent コンテナの IP に関係なく、ソケットファイルで接続を確立できます。また、次のような利点もあります。

- ネットワークスタックをバイパスするため、高トラフィック時のパフォーマンスが大幅に改善します。
- UDP にはエラー処理がありませんが、UDS では Agent をノンブロッキングで使用したまま、パケットの欠落や接続エラーを検出できます。
- DogStatsD がメトリクスの生成元のコンテナを検出し、それに応じてメトリクスにタグを付けることができます。

## 仕組み

`IP:port` ペアを使用して接続を確立する代わりに、Unix ドメインソケットは、プレースホルダーソケットファイルを使用します。いったん接続が開かれると、データは UDP と同じ[データグラム形式][1]で転送されます。Agent が再起動した場合、既存のソケットは削除され、新しいソケットに置き換わります。クライアントライブラリはこの変化を検出し、新しいソケットにシームレスに接続します。

**注:**

* UDS は、その目的上、トラフィックがホスト内に制限されます。したがって、メトリクスの送信元となるそれぞれのホストで Datadog Agent を実行する必要があります。
* UDS はWindows ではサポートされません。

## セットアップ

Unix Domain Socket で DogStatsD をセットアップするには、`dogstatsd_socket` パラメーターを使用して DogStatsD サーバーを有効にします。次に、コードで [DogStatsD クライアント](#dogstatsd-client-configuration) を構成します。

Agent DogStatsD UDS を有効にするには

{{< tabs >}}
{{% tab "ホスト" %}}

<div class="alert alert-danger"><strong>注</strong>: Agent のインストールスクリプトは自動的に適切な権限を持つソケットファイルを作成し、<code>use_dogstatsd: true</code> および <code>dogstatsd_socket: "/var/run/datadog/dsd.socket"</code> がデフォルトで設定されています。</div> 

1. DogStatsD がリスニングソケットとして使用するソケットファイルを作成します。例:
   ```shell
   sudo mkdir -p /var/run/datadog/
   ```
1. `dd-agent` ユーザーにソケットファイルへの読み取り権限と書き込み権限があることを確認します。
   ```shell
   sudo chown dd-agent:dd-agent /var/run/datadog/
   ```
1. [Agent のメインコンフィギュレーションファイル][1]を編集します。
   1. `use_dogstatsd` を `true` に設定します。
   1. `dogstatsd_socket` に DogStatsD がリスニングソケットを作成すべきパスを設定してください。

      ```yaml
      ## @param dogstatsd_socket - string - optional - default: ""
      ## Listen for Dogstatsd metrics on a Unix Socket (*nix only).
      ## Set to a valid and existing filesystem path to enable.
      #
      dogstatsd_socket: "/var/run/datadog/dsd.socket"
      ```
1. [Agent を再起動します][2]。

[1]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /ja/agent/configuration/agent-commands/
{{% /tab %}}
{{% tab "Docker" %}}

1. Agent コンテナの環境変数 `DD_DOGSTATSD_SOCKET=<あなたの UDS パス>` でソケットパスを設定します。

2. アプリケーションコンテナ (読み取り専用) と Agent コンテナ (読み書き) の両側でホストディレクトリをマウントし、ソケットファイルをアプリケーションコンテナへアクセスできるようにします。個別のソケットではなく親フォルダーをマウントすることで、DogStatsD が再起動してもソケット通信を維持することができます。

    - `-v /var/run/datadog:/var/run/datadog` で Agent コンテナを起動します。
    - `-v /var/run/datadog:/var/run/datadog:ro` でアプリケーションコンテナを起動します。

{{% /tab %}}
{{% tab "ECS Fargate" %}}

1. タスク定義内で、Agent コンテナの定義にある `DD_DOGSTATSD_SOCKET=<YOUR_UDS_PATH>` (例: `/var/run/datadog/dsd.socket`) という環境変数を使用してソケットパスを設定してください。

2. アプリケーションコンテナからソケットファイルにアクセスできるよう、Agent コンテナとアプリケーションコンテナの両方で共有ボリュームをマウントします。これにより、Datadog Agent コンテナから提供されるソケットをアプリケーションコンテナ側で利用できるようになります。

    1. タスク定義の `volumes` セクションで、空のフォルダをマウントします。

        ```json
        "volumes": [
            {
                "name": "dsdsocket",
                "host": {}
            }
        ],
        ```

    1. Agent コンテナの `mountPoints` セクションでソケットフォルダをマウントします。

        ```json
        "mountPoints": [
            {
            "containerPath": "/var/run/datadog",
            "sourceVolume": "dsdsocket"
            }
        ],
        ```

    1. アプリケーションコンテナの `mountPoints` セクションで、同じフォルダをアプリケーションコンテナ内に公開します。

       <div class="alert alert-info">アプリケーションコンテナがソケットへの書き込み権限を必要とする場合は、<code>"readOnly": true</code> を削除してください。</div> 

        ```json
        "mountPoints": [
            {
            "containerPath": "/var/run/datadog",
            "sourceVolume": "dsdsocket",
            "readOnly": true
            }
        ],
        ```

{{% /tab %}}
{{% tab "Kubernetes" %}}

1. Agent コンテナの環境変数 `DD_DOGSTATSD_SOCKET=<YOUR_UDS_PATH>` でソケットパスを設定します (例: `/var/run/datadog/dsd.socket`)。

2. アプリケーションコンテナ (読み取り専用) と Agent コンテナ (読み書き) の両側でホストディレクトリをマウントし、ソケットファイルをアプリケーションコンテナへアクセスできるようにします。個別のソケットではなく親フォルダーをマウントすることで、DogStatsD が再起動してもソケット通信を維持することができます。

    1. `datadog-agent` コンテナでソケットフォルダーをマウントします。

        ```yaml
        volumeMounts:
            - name: dsdsocket
              mountPath: /var/run/datadog
            ##...
        volumes:
            - hostPath:
                  path: /var/run/datadog/
              name: dsdsocket
        ```

    1. 同じフォルダーをアプリケーションコンテナで公開します。

       <div class="alert alert-info">アプリケーションコンテナがソケットへの書き込み権限を必要とする場合は、<code>"readOnly": true</code> を削除してください。</div> 

        ```yaml
        volumeMounts:
            - name: dsdsocket
              mountPath: /var/run/datadog
              readOnly: true
            ## ...
        volumes:
            - hostPath:
                  path: /var/run/datadog/
              name: dsdsocket
        ```

{{% /tab %}}
{{% tab "EKS Fargate" %}}

1. Agent コンテナの環境変数 `DD_DOGSTATSD_SOCKET=<YOUR_UDS_PATH>` でソケットパスを設定します (例: `/var/run/datadog/dsd.socket`)。

2. アプリケーションコンテナ (読み取り専用) と Agent コンテナ (読み書き) の両側で空のディレクトリをマウントし、ソケットファイルをアプリケーションコンテナへアクセスできるようにします。個別のソケットではなく親フォルダーをマウントすることで、DogStatsD が再起動してもソケット通信を維持することができます。

    1. Pod spec に空のフォルダーをマウントします。

        ```yaml
        volumes:
            - emptyDir: {}
              name: dsdsocket
        ```

    1. `datadog-agent` コンテナでソケットフォルダーをマウントします。

        ```yaml
        volumeMounts:
            - name: dsdsocket
              mountPath: /var/run/datadog
        ```

    1. 同じフォルダーをアプリケーションコンテナで公開します。

       <div class="alert alert-info">アプリケーションコンテナがソケットへの書き込み権限を必要とする場合は、<code>"readOnly": true</code> を削除してください。</div> 

        ```yaml
        volumeMounts:
            - name: dsdsocket
              mountPath: /var/run/datadog
              readOnly: true
        ```

{{% /tab %}}
{{< /tabs >}}

### netcat でテスト

シェルスクリプトからメトリクスを送信したり、DogStatsD がソケットでリスニングしているかをテストする場合は、`netcat` を使用します。`netcat` のほとんどの実装 (Debian の `netcat-openbsd`、RHEL の `nmap-ncat` など) は、`-U` フラグで Unix ソケットトラフィックをサポートしています。

```shell
echo -n "custom.metric.name:1|c" | nc -U -u -w1 /var/run/datadog/dsd.socket
```

### 発信点検出

発信点検出により、DogStatsD はコンテナメトリクスとタグメトリクスがどこから発信されたかを自動的に検出します。このモードが有効な場合は、UDS で受信されたすべてのメトリクスがオートディスカバリーメトリクスと同じコンテナタグに基づいてタグ付けされます。

{{< tabs >}}
{{% tab "ホスト" %}}

1. [Agent のメイン構成ファイル][1]で `dogstatsd_origin_detection` オプションを有効にします。

    ```yaml
    ## @param dogstatsd_origin_detection - boolean - optional - default: false
    ## When using Unix Socket, DogStatsD can tag metrics
    ## with container metadata. If running DogStatsD in a container,
    ## host PID mode (for example, with --pid=host) is required.
    #
    dogstatsd_origin_detection: true
    ```

2. 任意 - 発信点検出を使用して収集されたメトリクスに[タグカーディナリティ][2]を設定するには、パラメーター `dogstatsd_tag_cardinality` に `low` (デフォルト)、`orchestrator`、または `high` を使用します。

    ```yaml
    ## @param dogstatsd_tag_cardinality - string - optional - default: low
    ## Configure the level of granularity of tags to send for DogStatsD
    ## metrics and events. Choices are:
    ##   * low: add tags about low-cardinality objects
    ##     (clusters, hosts, deployments, container images, ...)
    ##   * orchestrator: add tags about pods (Kubernetes),
    ##     or tasks (ECS or Mesos) -level of cardinality
    ##   * high: add tags about high-cardinality objects
    ##     (individual containers, user IDs in requests, etc.)
    ##
    ## WARNING: Sending container tags for DogStatsD metrics may create
    ## more metrics (one per container instead of one per host).
    ## This may impact your custom metrics billing.
    #
    dogstatsd_tag_cardinality: low
    ```

3. [Agent を再起動します][3]。


[1]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /ja/getting_started/tagging/assigning_tags/#environment-variables
[3]: /ja/agent/configuration/agent-commands/
{{% /tab %}}
{{% tab "Docker" %}}

1. Agent コンテナの環境変数 `DD_DOGSTATSD_ORIGIN_DETECTION=true` を設定します。

2. 任意 - 発信点検出を使用して収集されたメトリクスに[タグカーディナリティ][5]を設定するには、環境変数 `DD_DOGSTATSD_TAG_CARDINALITY` に `low` (デフォルト)、`orchestrator`、または `high` を使用します。

DogStatsD がコンテナ内で実行されている場合、発信点検出を高い信頼性で行うには、DogStatsD をホストの PID ネームスペースで実行する必要があります。そのため、`--pid=host` フラグを用いて Docker で有効にします。**注**: これは、コンテナのタスク定義内の `"pidMode": "host"` パラメーターを使用して、ECS によってサポートされます。このオプションは、Fargate ではサポートされません。詳細については、[PID モード][2]で AWS のドキュメントを参照してください。


[1]: /ja/getting_started/tagging/assigning_tags/#environment-variables
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#task_definition_pidmode
{{% /tab %}}
{{% tab "ECS Fargate" %}}

1. タスク定義内で、Agent コンテナの定義に `DD_DOGSTATSD_ORIGIN_DETECTION` 環境変数を true として設定します。

    ```json
    {
        "name": "DD_DOGSTATSD_ORIGIN_DETECTION",
        "value": "true"
    },
    ```

2. タスク定義に [PidMode パラメータ][2]を追加し、次のように `task` に設定します。

    ```json
    "pidMode": "task"
    ```

3. 任意 - 発信点検出を使用して収集されたメトリクスに[タグカーディナリティ][1]を設定するには、環境変数 `DD_DOGSTATSD_TAG_CARDINALITY` に `low` (デフォルト)、`orchestrator`、または `high` を使用します。

    ```json
    {
        "name": "DD_DOGSTATSD_TAG_CARDINALITY",
        "value": "low"
    },
    ```

[1]: /ja/getting_started/tagging/assigning_tags/#environment-variables
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#other_task_definition_params
{{% /tab %}}
{{% tab "Kubernetes" %}}

1. Agent コンテナの環境変数 `DD_DOGSTATSD_ORIGIN_DETECTION を true に設定します。

    ```yaml
    # (...)
    env:
        # (...)
        - name: DD_DOGSTATSD_ORIGIN_DETECTION
          value: 'true'
    ```

2. ポッドテンプレートの仕様に `hostPID: true` を設定します。

    ```yaml
    # (...)
    spec:
        # (...)
        hostPID: true
    ```

3. 任意 - 発信点検出を使用して収集されたメトリクスに[タグカーディナリティ][1]を設定するには、環境変数 `DD_DOGSTATSD_TAG_CARDINALITY` に `low` (デフォルト)、`orchestrator`、または `high` を使用します。

    ```yaml
    # (...)
    env:
        # (...)
        - name: DD_DOGSTATSD_TAG_CARDINALITY
          value: 'low'
    ```

[1]: /ja/getting_started/tagging/assigning_tags/#environment-variables
{{% /tab %}}
{{% tab "EKS Fargate" %}}

1. Agent コンテナの環境変数 `DD_DOGSTATSD_ORIGIN_DETECTION を true に設定します。

    ```yaml
    # (...)
    env:
        # (...)
        - name: DD_DOGSTATSD_ORIGIN_DETECTION
          value: 'true'
    ```

2. ポッドテンプレートの仕様で、`shareProcessNamespace: true` を設定します。

    ```yaml
    # (...)
    spec:
        # (...)
        shareProcessNamespace: true
    ```

3. 任意 - 発信点検出を使用して収集されたメトリクスに[タグカーディナリティ][1]を設定するには、環境変数 `DD_DOGSTATSD_TAG_CARDINALITY` に `low` (デフォルト)、`orchestrator`、または `high` を使用します。

    ```yaml
    # (...)
    env:
        # (...)
        - name: DD_DOGSTATSD_TAG_CARDINALITY
          value: 'low'
    ```

[1]: /ja/getting_started/tagging/assigning_tags/#environment-variables
{{% /tab %}}
{{< /tabs >}}

**注:** `container_id`、`container_name`、`pod_name` タグは、[カスタムメトリクス][2]が多くなりすぎないようにデフォルトでは追加されていません。

## DogStatsD クライアントコンフィギュレーション

### クライアントライブラリ

以下の DogStatsD クライアントライブラリは、UDS トラフィックをネイティブでサポートします。UDS トラフィックを有効にする方法については、各ライブラリのドキュメントを参照してください。**注:** UDP と同様に、トラフィックが多い場合は、パフォーマンスを向上させるため、クライアント側のバッファリングを有効にすることをお勧めします。

| 言語 | ライブラリ                              |
| -------- | ------------------------------------ |
| Golang   | [DataDog/datadog-go][3]              |
| Java     | [DataDog/java-dogstatsd-client][4]   |
| Python   | [DataDog/datadogpy][5]               |
| Ruby     | [DataDog/dogstatsd-ruby][6]          |
| PHP      | [DataDog/php-datadogstatsd][7]       |
| C#       | [DataDog/dogstatsd-csharp-client][8] |

### socat プロキシ

アプリケーションまたはクライアントライブラリが UDS トラフィックをサポートしていない場合は、`socat` を実行して UDP ポート `8125` でリスニングし、リクエストをソケットにプロキシすることができます。

```shell
socat -s -u UDP-RECV:8125 UNIX-SENDTO:/var/run/datadog/dsd.socket
```

追加の実装オプションの作成に関するガイドラインについては、[datadog-agent GitHub wiki][9] を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[2]: /ja/metrics/custom_metrics/
[3]: https://github.com/DataDog/datadog-go#unix-domain-sockets-client
[4]: https://github.com/DataDog/java-dogstatsd-client#unix-domain-socket-support
[5]: https://github.com/DataDog/datadogpy#instantiate-the-dogstatsd-client-with-uds
[6]: https://github.com/DataDog/dogstatsd-ruby#configuration
[7]: https://github.com/DataDog/php-datadogstatsd
[8]: https://github.com/DataDog/dogstatsd-csharp-client#unix-domain-socket-support
[9]: https://github.com/DataDog/datadog-agent/wiki/Unix-Domain-Sockets-support