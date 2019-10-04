---
title: データグラム形式とシェルの使用方法
kind: documentation
description: DogStatsD が使用するデータグラム形式および (高度な) シェルの使用方法の概要
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
ここでは、DogStatsD が受け付けるデータタイプごとのデータグラム形式を規定します。[DogStatsD クライアントライブラリ][1]を使用する場合は、これをお読みになる必要はありません。独自のライブラリを記述する場合、あるいはシェルを使用してメトリクスやイベントを送信する場合は、以下を参照してください。

## データグラム形式

### メトリクス

`<METRIC_NAME>:<VALUE>|<TYPE>|@<SAMPLE_RATE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

| パラメーター     | 必須 | 説明                                                                                                                                                        |
|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>` | はい      | コロン、バー、および @ 文字を含まない文字列。[メトリクス命名ポリシー][2]を参照してください。                                                                                 |
| `<VALUE>`       | はい      | 整数または浮動小数点数。                                                                                                                                               |
| `<TYPE>`        | はい      | カウンターは `c`、ゲージは `g`、タイマーは `ms`、ヒストグラムは `h`、セットは `s`。                                                                                    |
| `<SAMPLE_RATE>` | いいえ       | 0 から 1 までの浮動小数点数 (両端を含む)。カウンター、ヒストグラム、およびタイマーメトリクスでのみ機能します。デフォルトは 1 です (100% の時間、サンプリングを行います)。                            |
| `<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`        | いいえ       | カンマ区切りのタグのリスト。キー/値タグの場合は、`env:prod` のようにコロンを使用します。`device` というキーは予約されています。ユーザーによって追加された `device:foobar` のようなタグは無視されます。 |

以下に、データグラムの例を示します。

```
## page.views カウンターをインクリメントする
page.views:1|c

## 燃料タンクが半分空になったことを記録する
fuel.level:0.5|g

## 歌の長さのヒストグラムを半分の時間でサンプリングする
song.length:240|h|@0.5

## サイトへのユニーク訪問者を追跡する
users.uniques:1234|s

## アクティブユーザーカウンターをインクリメントし、所属国でタグ付けする
users.online:1|c|#country:china

## サンプリングレートを使用して、アクティブな中国ユーザーを追跡する
users.online:1|c|@0.5|#country:china
```

### イベント

`_e{<TITLE>.length,<TEXT>.length}:<TITLE>|<TEXT>|d:<TIMESTAMP>|h:<HOSTNAME>|p:<PRIORITY>|t:<ALERT_TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

| パラメーター                          | 必須 | 説明                                                                                                            |
|------------------------------------|----------|------------------------------------------------------------------------------------------------------------------------|
| `_e`                               | はい      | データグラムは `_e` で始まる必要があります。                                                                                      |
| `<TITLE>`                            | はい      | イベントのタイトル                                                                                                           |
| `<TEXT>`                             | はい      | イベントのテキスト。改行は、エスケープしたスラッシュ (`\\n`) を使用して挿入します。                                                           |
| `d:<TIMESTAMP>`                      | いいえ       | イベントにタイムスタンプを追加します。デフォルトは、現在の Unix Epoch タイムスタンプです。                                             |
| `h:<HOSTNAME>`                       | いいえ       | イベントにホスト名を追加します。デフォルトはありません。                                                                               |
| `k:aggregation_key`                | いいえ       | 同じキーを持つ他のイベントとグループ化するための集計キーを追加します。デフォルトはありません。                              |
| `p:<PRIORITY>`                       | いいえ       | 'normal' または 'low' に設定します。デフォルトは 'normal' です。                                                                            |
| `s:source_type_name`               | いいえ       | イベントにソースタイプを追加します。デフォルトはありません。                                                                            |
| `t:<ALERT_TYPE>`                     | いいえ       | 'error'、'warning'、'info'、'success' のいずれかに設定します。デフォルトは 'info' です。                                                        |
| `#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>` | いいえ       | タグ内のコロンは、タグリスト文字列の一部です。他のパラメーターで使用されるコロンのようにパースには使用されません。デフォルトはありません。 |

以下に、データグラムの例を示します。

```
## 例外を送信する
_e{21,36}:An exception occurred|Cannot parse CSV file from 10.0.0.17|t:warning|#err_type:bad_file

## テキスト内に改行を含むイベントを送信する
_e{21,42}:An exception occurred|Cannot parse JSON request:\\n{"foo: "bar"}|p:low|#err_type:bad_request
```

### サービスのチェック

`_sc|<NAME>|<STATUS>|d:<TIMESTAMP>|h:<HOSTNAME>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>|m:<SERVICE_CHECK_MESSAGE>`

| パラメーター                           | 必須 | 説明                                                                                                                                  |
|-------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `_sc`                               | はい      | データグラムは `_sc` で始まる必要があります。                                                                                                           |
| `<NAME>`                              | はい      | サービスチェック名                                                                                                                          |
| `<STATUS>`                            | はい      | チェックステータスに対応する整数値 (OK = 0、WARNING = 1、CRITICAL = 2、UNKNOWN = 3)                                                  |
| `d:<TIMESTAMP>`                       | いいえ       | チェックにタイムスタンプを追加します。デフォルトは、現在の Unix Epoch タイムスタンプです。                                                                   |
| `h:<HOSTNAME>`                        | いいえ       | イベントにホスト名を追加します。デフォルトはありません。                                                                                                     |
| `#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>` | いいえ       | タグ内のコロンは、タグリスト文字列の一部です。他のパラメーターで使用されるコロンのようにパースには使用されません。デフォルトはありません。                       |
| `m:<SERVICE_CHECK_MESSAGE>`           | いいえ       | サービスチェックの現在の状態を説明するメッセージを追加します。このフィールドは、メタデータフィールドの最後に置く必要があります。デフォルトはありません。 |

以下に、データグラムの例を示します。

```
# リモート接続の CRITICAL ステータスを送信する
_sc|Redis connection|2|#redis_instance:10.0.0.16:6379|m:Redis connection timed out after 10s
```

## DogStatsD とシェルを使用したメトリクスとイベントの送信

Linux などの Unix 系 OS では、Bash を使用してください。
Windows では、Powershell と [powershell-statsd][3] (ネットワークビットを処理する簡単な Powershell 機能) が必要です。

DogStatsD の動作の基本概念は、メトリクス/イベントに関する情報を含むメッセージを作成し、それをポート 8125 から UDP でコレクターへ送信するというものです。[メッセージの書式についてはこちらを参照してください](#datagram-format)。

### メトリクスの送信

メトリクスの送信に使用される形式は `<METRIC_NAME>:<VALUE>|<TYPE>|@<SAMPLE_RATE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>` です。以下に、shell タグ付きで `custom_metric` というゲージメトリクスのデータポイントを送信する例を示します。ローカルにインストールされた Agent をコレクターとして使用する場合、送信先の IP アドレスは `127.0.0.1` です。

Linux の場合

```
vagrant@vagrant-ubuntu-14-04:~$ echo -n "custom_metric:60|g|#shell" >/dev/udp/localhost/8125
```

```
vagrant@vagrant-ubuntu-14-04:~$ echo -n "custom_metric:60|g|#shell" | nc -4u -w0 127.0.0.1 8125
```

```
vagrant@vagrant-ubuntu-14-04:~$ echo -n "custom.metric.name:1|c"|nc -4u -w1 localhost 8125
```

Windows の場合

```
PS C:\vagrant> .\send-statsd.ps1 "custom_metric:123|g|#shell"
PS C:\vagrant>
```

任意のプラットフォームで Python を使用する場合 (Windows では、Agent の埋め込み Python インタープリターを使用できます。これは、Agent バージョン <= 6.11 の場合は `C:\Program Files\Datadog\Datadog Agent\embedded\python.exe`、Agent バージョン >= 6.12 の場合は `C:\Program Files\Datadog\Datadog Agent\embedded2\python.exe` にあります。)

```python
import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
sock.sendto("custom_metric:60|g|#shell", ("localhost", 8125))
```

コンテナ環境でメトリクスを送信する方法については、[Kubernetes 上の DogStatsD に関するドキュメント][4]を参照してください。また、環境に応じて [DaemonSets][5] または [Helm][6] を使用して Kubernetes で APM を構成する手順も併せて参照してください。[Docker APM][7] のドキュメントも参考になります。

### イベントの送信

イベントの送信に使用される形式は以下のとおりです。

```
_e{<TITLE>.length,<TEXT>.length}:<TITLE>|<TEXT>|d:<DATE_EVENT>|h:<HOSTNAME>|p:<PRIORITY>|t:<ALERT_TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>.
```

以下の例では、イベントのタイトルと本文のサイズを計算しています。

Linux の場合

```
vagrant@vagrant-ubuntu-14-04:~$ title="Event from the shell"
vagrant@vagrant-ubuntu-14-04:~$ text="This was sent from Bash!"
vagrant@vagrant-ubuntu-14-04:~$ echo "_e{${#title},${#text}}:$title|$text|#shell,bash"  >/dev/udp/localhost/8125
```

Windows の場合

```
PS C:\vagrant> $title = "Event from the shell"
PS C:\vagrant> $text = "This was sent from Powershell!"
PS C:\vagrant> .\send-statsd.ps1 "_e{$($title.length),$($text.Length)}:$title|$text|#shell,powershell"
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/developers/libraries/#api-and-dogstatsd-client-libraries
[2]: /ja/developers/metrics/#naming-metrics
[3]: https://github.com/joehack3r/powershell-statsd/blob/master/send-statsd.
[4]: /ja/agent/kubernetes/dogstatsd
[5]: /ja/agent/kubernetes/daemonset_setup/#apm-and-distributed-tracing
[6]: /ja/agent/kubernetes/helm/#enable-apm-and-distributed-tracing
[7]: /ja/agent/docker/apm