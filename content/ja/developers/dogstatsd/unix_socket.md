---
title: Unix ドメインソケット上の DogStatsD
description: Unix ドメインソケット上の DogStatsD の使用ガイド
aliases:
  - /ja/metrics/unix_socket/
further_reading:
  - link: developers/dogstatsd
    tag: Documentation
    text: DogStatsD 入門
  - link: developers/libraries
    tag: Documentation
    text: 公式/コミュニティ作成の API および DogStatsD クライアントライブラリ
  - link: https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd
    tag: GitHub
    text: DogStatsD ソースコード
---
バージョン 6.0 以降の Agent は、UDP 転送に代わる手段として、Unix ドメインソケット (UDS) でメトリクスを収集できるようになりました。

UDP は`ローカルホスト`ではたいへんよく機能しますが、コンテナ環境でのセットアップが難しい場合があります。Unix ドメインソケットを使用すると、Datadog Agent コンテナの IP に関係なく、ソケットファイルで接続を確立できます。また、次のような利点もあります。

- ネットワークスタックをバイパスするため、高トラフィック時のパフォーマンスが大幅に改善します。
- UDP にはエラー処理がありませんが、UDS では Agent をノンブロッキングで使用したまま、パケットの欠落や接続エラーを検出できます。
- DogStatsD がメトリクスの生成元のコンテナを検出し、それに応じてメトリクスにタグを付けることができます。

## UDS の仕組み

`IP:port` ペアを使用して接続を確立する代わりに、Unix ドメインソケットは、プレースホルダーソケットファイルを使用します。いったん接続が開かれると、データは UDP と同じ[データグラム形式][1]で転送されます。Agent が再起動した場合、既存のソケットは削除され、新しいソケットに置き換わります。クライアントライブラリはこの変化を検出し、新しいソケットにシームレスに接続します。

**注:**

* UDS は、その目的上、トラフィックがホスト内に制限されます。したがって、メトリクスの送信元となるそれぞれのホストで Datadog Agent を実行する必要があります。
* UDS はWindows ではサポートされません。

## セットアップ

Unix Domain Socket で DogStatsD をセットアップするには、`dogstatsd_socket` パラメーターを使用して DogStatsD サーバーを有効にします。次に、コードで [DogStatsD クライアント](#dogstatsd-client-configuration) を構成します。

Agent DogStatsD UDS を有効にするには

{{< tabs >}}
{{% tab "Host" %}}

1. [Agent のメイン構成ファイル][1]を編集して、DogStatsD がリスニングソケットを作成するパスを `dogstatsd_socket` に設定します。

    ```yaml
    ## @param dogstatsd_socket - string - optional - default: ""
    ## Listen for Dogstatsd metrics on a Unix Socket (*nix only).
    ## Set to a valid and existing filesystem path to enable.
    #
    dogstatsd_socket: '/var/run/datadog/dsd.socket'
    ```

2. [Agent を再起動します][2]。


[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /ja/agent/guide/agent-commands/
{{% /tab %}}
{{% tab "Docker" %}}

1. Agent コンテナの環境変数 `DD_DOGSTATSD_SOCKET=<あなたの UDS パス>` でソケットパスを設定します。

2. アプリケーションコンテナ (読み取り専用) と Agent コンテナ (読み書き) の両側でホストディレクトリをマウントし、ソケットファイルをアプリケーションコンテナへアクセスできるようにします。個別のソケットではなく親フォルダーをマウントすることで、DogStatsD が再起動してもソケット通信を維持することができます。

    - `-v /var/run/datadog:/var/run/datadog` で Agent コンテナを起動します。
    - `-v /var/run/datadog:/var/run/datadog:ro` でアプリケーションコンテナを起動します。

{{% /tab %}}
{{% tab "Kubernetes" %}}

1. Agent コンテナの環境変数 `DD_DOGSTATSD_SOCKET=<YOUR_UDS_PATH>` でソケットパスを設定します (例: `/var/run/datadog/dsd.socket`)。

2. アプリケーションコンテナ (読み取り専用) と Agent コンテナ (読み書き) の両側でホストディレクトリをマウントし、ソケットファイルをアプリケーションコンテナへアクセスできるようにします。個別のソケットではなく親フォルダーをマウントすることで、DogStatsD が再起動してもソケット通信を維持することができます。

    - `datadog-agent` コンテナでソケットフォルダーをマウントします。

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

    - 同じフォルダーをアプリケーションコンテナで公開します。

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

      **注**: アプリケーションコンテナでソケットへの書き込みアクセス許可が必要な場合は、 `readOnly: true` を削除してください。

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
{{% tab "Host" %}}

1. [Agent のメイン構成ファイル][1]で `dogstatsd_origin_detection` オプションを有効にします。

    ```yaml
    ## @param dogstatsd_origin_detection - boolean - optional - default: false
    ## When using Unix Socket, DogStatsD can tag metrics
    ## with container metadata. If running DogStatsD in a container,
    ## host PID mode (e.g. with --pid=host) is required.
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


[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /ja/getting_started/tagging/assigning_tags/#environment-variables
[3]: /ja/agent/guide/agent-commands/
{{% /tab %}}
{{% tab "Docker" %}}

1. Agent コンテナの環境変数 `DD_DOGSTATSD_ORIGIN_DETECTION=true` を設定します。

2. 任意 - 発信点検出を使用して収集されたメトリクスに[タグカーディナリティ][5]を設定するには、環境変数 `DD_DOGSTATSD_TAG_CARDINALITY` に `low` (デフォルト)、`orchestrator`、または `high` を使用します。

DogStatsD がコンテナ内で実行されている場合、発信点検出を高い信頼性で行うには、DogStatsD をホストの PID ネームスペースで実行する必要があります。そのため、`--pid=host` フラグを用いて Docker で有効にします。**注**: これは、コンテナのタスク定義内の `"pidMode": "host"` パラメーターを使用して、ECS によってサポートされます。このオプションは、Fargate ではサポートされません。詳細については、[PID モード][2]で AWS のドキュメントを参照してください。


[1]: /ja/getting_started/tagging/assigning_tags/#environment-variables
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#task_definition_pidmode
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

2. 任意 - 発信点検出を使用して収集されたメトリクスに[タグカーディナリティ][1]を設定するには、環境変数 `DD_DOGSTATSD_TAG_CARDINALITY` に `low` (デフォルト)、`orchestrator`、または `high` を使用します。

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

以下の DogStatsD クライアントライブラリは、UDS トラフィックをネイティブでサポートします。UDS トラフィックを有効にする方法については、各ライブラリのドキュメントを参照してください。**注:** UDP と同様に、トラフィックが多い場合は、パフォーマンスを向上させるため、クライアント側のバッファリングを有効にすることを強くお勧めします。

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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/metrics/dogstatsd_metrics_submission/
[2]: /ja/metrics/custom_metrics/
[3]: https://github.com/DataDog/datadog-go#unix-domain-sockets-client
[4]: https://github.com/DataDog/java-dogstatsd-client#unix-domain-socket-support
[5]: https://github.com/DataDog/datadogpy#instantiate-the-dogstatsd-client-with-uds
[6]: https://github.com/DataDog/dogstatsd-ruby#configuration
[7]: https://github.com/DataDog/php-datadogstatsd
[8]: https://github.com/DataDog/dogstatsd-csharp-client#unix-domain-socket-support
[9]: https://github.com/DataDog/datadog-agent/wiki/Unix-Domain-Sockets-support