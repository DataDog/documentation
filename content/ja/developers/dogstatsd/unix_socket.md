---
title: Unix ドメインソケット上の DogStatsD
kind: documentation
description: Unix ドメインソケット上の DogStatsD の使用ガイド
further_reading:
  - link: developers/dogstatsd
    tag: Documentation
    text: DogStatsD 入門
  - link: developers/libraries
    tag: Documentation
    text: 公式/コミュニティ寄稿の API および DogStatsD クライアントライブラリ
  - link: 'https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd'
    tag: GitHub
    text: DogStatsD ソースコード
---
バージョン 6.0 以降の Datadog Agent が Linux システム上で実行されている場合は、UDP に代わる手段として、Unix ドメインソケット (UDS) 経由でメトリクスを収集できるようになりました。

UDP は`ローカルホスト`ではたいへんよく機能しますが、コンテナ環境でのセットアップが難しい場合があります。Unix ドメインソケットを使用すると、Datadog Agent コンテナの IP に関係なく、ソケットファイル経由で簡単に接続を確立できます。また、次のような利点もあります。

* ネットワークスタックをバイパスするため、高トラフィック時のパフォーマンスが大幅に改善します。
* UDP にはエラー処理がありませんが、UDS では Agent をノンブロッキングで使用したまま、パケットの欠落や接続エラーを検出できます。
* DogStatsD がメトリクスの生成元のコンテナを検出し、それに応じてメトリクスにタグを付けることができます。

## UDS の仕組み

`IP:port` ペアを使用して接続を確立する代わりに、Unix ドメインソケットは、プレースホルダーソケットファイルを使用します。いったん接続が開かれると、データは UDP と同じ[データグラム形式][1]で転送されます。

Agent が再起動した場合、既存のソケットは削除され、新しいソケットに置き換わります。クライアントライブラリはこの変化を検出し、新しいソケットにシームレスに接続します。

**注:** UDS は、その目的上、トラフィックがホスト内に制限されます。したがって、メトリクスの送信元となるそれぞれのホストで Datadog Agent を実行する必要があります。

## セットアップ

### Agent

`datadog.yaml` ファイルを編集して、DogStatsD がリスニングソケットを作成するパスを `dogstatsd_socket` オプションに設定します。

```yaml
dogstatsd_socket: /var/run/datadog/dsd.socket
```

次に、[Agent を再起動][2]します。ソケットパスは、`DD_DOGSTATSD_SOCKET` 環境変数からも設定できます。

### クライアント

#### クライアントライブラリでのネイティブサポート

以下の DogStatsD クライアントライブラリは、UDS トラフィックをネイティブでサポートします。

| 言語 | ライブラリ                            |
|----------|------------------------------------|
| Golang   | [DataDog/datadog-go][3]            |
| Java     | [DataDog/java-dogstatsd-client][4] |
| Python   | [DataDog/datadogpy][5]             |
| Ruby     | [DataDog/dogstatsd-ruby][6]        |

UDS トラフィックを有効にする方法については、各ライブラリのドキュメントを参照してください。

**注:** UDP と同様に、トラフィックが多い場合は、パフォーマンスを向上させるため、クライアント側のバッファリングを有効にすることを強くお勧めします。手順については、クライアントライブラリのドキュメントを参照してください。

#### netcat の使用

シェルスクリプトからメトリクスを送信したり、DogStatsD がソケットでリスニングしているかをテストする場合は、`netcat` を使用できます。`netcat` のほとんどの実装 (Debian の `netcat-openbsd`、RHEL の `nmap-ncat` など) は、`-U` フラグによって Unix ソケットトラフィックをサポートしています。

```shell
echo -n "custom.metric.name:1|c" | nc -U -u -w1 /var/run/datadog/dsd.socket
```

#### プロキシとしての socat の使用

使用するアプリケーションまたはクライアントライブラリが UDS トラフィックをサポートしていない場合は、`socat` を実行して UDP ポート `8125` でリスニングし、リクエストをソケットにプロキシすることができます。

```shell
socat -s -u UDP-RECV:8125 UNIX-SENDTO:/var/run/datadog/dsd.socket
```

### コンテナ間のソケットアクセス

コンテナ環境で実行している場合は、クライアントコンテナからソケットファイルにアクセスできる必要があります。それには、クライアントコンテナ (読み取り専用) と Agent コンテナ (読み書き) の両側でホストディレクトリをマウントすることをお勧めします。

個別のソケットではなく親フォルダーをマウントすることで、DogStatsD が再起動してもソケット通信を維持することができます。

#### Docker: バインドマウント

* `-v /var/run/datadog:/var/run/datadog` で Agent コンテナを起動します。
* `-v /var/run/datadog:/var/run/datadog:ro` でコンテナを起動します。

#### Kubernetes: `hostPath` ボリューム

`datadog-agent` コンテナでフォルダーをマウントします。

```
volumeMounts:
  - name: dsdsocket
    mountPath: /var/run/datadog
...
volumes:
- hostPath:
    path: /var/run/datadog/
  name: dsdsocket
```

同じフォルダーをクライアントコンテナで公開します。

```
volumeMounts:
  - name: dsdsocket
    mountPath: /var/run/datadog
    readOnly: true                  # 下の注を参照
...
volumes:
- hostPath:
    path: /var/run/datadog/
  name: dsdsocket
```

**注**: クライアントコンテナでソケットへの書き込みアクセス許可が必要な場合は、`readOnly: true` を削除してください。

## コンテナのタグ付けに発信点検出を使用する

発信点検出は、コンテナメトリクスとタグメトリクスがどこからやって来たかを DogStatsD が自動的に検出できるようにします。このモードを有効にすると、UDS を介して受け取ったすべてのメトリクスが、オートディスカバリーメトリクスと同じコンテナタグでタグ付けされます。**注:** 作成されるカスタムメトリクスコンテキストが増えすぎないように、`container_id`、`container_name`、`pod_name` の各タグは追加されません。

発信点検出を使用するには、`datadog.yaml` で `dogstatsd_origin_detection` オプションを有効にするか、環境変数 `DD_DOGSTATSD_ORIGIN_DETECTION=true` を設定して、[Agent を再起動][2]します。

DogStatsd がコンテナ内で実行されている場合、発信点検出を高い信頼性で行うには、DogStatsd をホストの PID ネームスペースで実行する必要があります。それには、Docker の `--pid=host` フラグを使用します。**注**: これは、コンテナのタスク定義内の `"pidMode": "host"` パラメーターを使用して、ECS によってサポートされます。このオプションは、Fargate ではサポートされません。詳細については、[AWS のドキュメント][7]を参照してください。

## クライアントライブラリ実装ガイドライン

プロトコルが UDP によく似ているため、既存のライブラリへの UDS サポートの追加は、簡単に行うことができます。実装ガイドラインとテストチェックリストについては、[datadog-agent ウィキ][8]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/developers/dogstatsd/data_types
[2]: /ja/agent/guide/agent-commands
[3]: https://github.com/DataDog/datadog-go
[4]: https://github.com/DataDog/java-dogstatsd-client
[5]: https://github.com/DataDog/datadogpy
[6]: https://github.com/DataDog/dogstatsd-ruby
[7]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#task_definition_pidmode
[8]: https://github.com/DataDog/datadog-agent/wiki/Unix-Domain-Sockets-support