---
title: Datagram Format and Shell Usage
description: DogStatsD が使用するデータグラム形式および (高度な) シェルの使用方法の概要
aliases:
    - /developers/dogstatsd/data_types/
further_reading:
    - link: 'developers/dogstatsd'
      tag: 'ドキュメント'
      text: 'DogStatsD 入門'
    - link: 'developers/libraries'
      tag: 'ドキュメント'
      text: '公式/コミュニティ作成の API および DogStatsD クライアントライブラリ'
---

ここでは、DogStatsD が受け付けるメトリクス、イベント、サービスチェックの生のデータグラム形式を規定します。生のデータグラムは UTF-8 でエンコーディングされています。[DogStatsD クライアントライブラリ][1]を使用する場合は、これをお読みになる必要はありません。独自のライブラリを記述する場合、あるいはシェルを使用してメトリクスを送信する場合は、以下を参照してください。

## DogStatsD プロトコル

{{< tabs >}}
{{% tab "Metrics" %}}

`<METRIC_NAME>:<VALUE>|<TYPE>|@<SAMPLE_RATE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

| パラメーター                           | 必須 | 説明                                                                                                                                                    |
| ----------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<METRIC_NAME>`                     | はい      | A string that contains only ASCII alphanumerics, underscores, and periods. See the [metric naming policy][101].                                                  |
| `<VALUE>`                           | はい      | 整数または浮動小数点数。                                                                                                                                           |
| `<TYPE>`                            | はい      | COUNT の場合は `c`、GAUGE の場合は `g`、TIMER の場合は `ms`、HISTOGRAM の場合は `h`、SET の場合は `s`、DISTRIBUTION の場合は `d`。詳細は[メトリクスタイプ][102]を参照してください。                    |
| `<SAMPLE_RATE>`                     | いいえ       | `0` から `1` までの浮動小数点数。COUNT、HISTOGRAM、DISTRIBUTION、TIMER メトリクスでのみ機能します。デフォルトは `1` で、100% の時間をサンプリングします。 |
| `<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>` | いいえ       | A comma separated list of strings. Use colons for key/value tags (`env:prod`). For guidance on defining tags, see [Getting Started with Tags][103].              |

以下に、データグラムの例を示します。

- `page.views:1|c` : `page.views` COUNT メトリクスを増やします。
- `fuel.level:0.5|g`: 燃料タンクが半分空になったことを記録します。
- `song.length:240|h|@0.5`: 半分の時間だけ送信したように `song.length` ヒストグラムをサンプリングします。
- `users.uniques:1234|s`: サイトへのユニークビジターを追跡します。
- `users.online:1|c|#country:china`: アクティブユーザー COUNT メトリクスを増やし、所属国ごとにタグ付けします。
- `users.online:1|c|@0.5|#country:china`: アクティブな中国ユーザーを追跡し、サンプルレートを使用します。

### DogStatsD プロトコル v1.1

Agent `>=v6.25.0` && `<v7.0.0` または `>=v7.25.0` からは、値のパッキングが可能になります。これは、 `SET` を除くすべてのメトリクスタイプでサポートされています。値は `:` で区切られ、例えば次のようになります。

`<METRIC_NAME>:<VALUE1>:<VALUE2>:<VALUE3>|<TYPE>|@<SAMPLE_RATE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

`TYPE`、`SAMPLE_RATE`、`TAGS` はすべての値で共有されます。これは、それぞれ 1 つの値で複数のメッセージを送信するよりも、同じメトリクスを生成します。これは、HISTOGRAM、TIMING、DISTRIBUTION の各メトリクスに有効です。

### データグラムの例

- `page.views:1:2:32|d`: `page.views` DISTRIBUTION メトリクスを `1`、`2`、`32` の値で 3 回サンプリングします。
- `song.length:240:234|h|@0.5`: `song.length` ヒストグラムを、半分の時間を 2 回送信したかのようにサンプリングします。それぞれの値には `0.5` のサンプルレートが適用されます。

### DogStatsD プロトコル v1.2

Agent `>=v6.35.0` および `<v7.0.0` または `>=v7.35.0` からは、新しいコンテナ ID フィールドがサポートされています。
Datadog Agent は、コンテナ ID の値を使用して、追加のコンテナタグで DogStatsD メトリクスをリッチ化します。

コンテナ ID の先頭には `c:` が付きます。例:

`<METRIC_NAME>:<VALUE>|<TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>|c:<CONTAINER_ID>`

**注:** `datadog.yaml` ファイルまたは環境変数 `DD_DOGSTATSD_ORIGIN_DETECTION_CLIENT=true` で `dogstatsd_origin_detection_client` を `true` に設定すると、Datadog Agent にコンテナ ID フィールドを抽出して、対応するコンテナタグをアタッチするように指示が出ます。

### データグラムの例

- `page.views:1|g|#env:dev|c:83c0a99c0a54c0c187f461c7980e9b57f3f6a8b0c918c8d93df19a9de6f3fe1d`: Datadog Agent は、`image_name` や `image_tag` などのコンテナタグを `page.views` メトリクスに追加します。

Read more about container tags in the [Kubernetes][104] and [Docker][105] tagging documentation.

### DogStatsD プロトコル v1.3

Agent v6.40.0+ および v7.40.0+ は、オプションで Unix タイムスタンプフィールドをサポートしています。

このフィールドを指定すると、Datadog Agent は、タグでメトリクスをリッチ化する以外、メトリクスの処理を行いません (集計を行いません)。これは、アプリケーションで既にメトリクスを集計しており、余分な処理なしで Datadog に送信したい場合に便利です。

Unix のタイムスタンプは、過去の有効な正の数である必要があります。GAUGE と COUNT メトリクスのみサポートされています。

値は Unix タイムスタンプ (UTC) であり、プレフィックスとして `T` を付ける必要があります。例:

`<METRIC_NAME>:<VALUE>|<TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>|T<METRIC_TIMESTAMP>`

### データグラムの例

- `page.views:15|c|#env:dev|T1656581400`: 2022 年 6 月 30 日午前 9 時 30 分 (UTC) に 15 ページビューが発生したことを示す COUNT

[101]: /metrics/#metric-name
[102]: /metrics/types/
[103]: /getting_started/tagging/
[104]: /containers/kubernetes/tag/?tab=containerizedagent#out-of-the-box-tags
[105]: /containers/docker/tag/?tab=containerizedagent#out-of-the-box-tagging
{{% /tab %}}
{{% tab "Events" %}}

`_e{<TITLE_UTF8_LENGTH>,<TEXT_UTF8_LENGTH>}:<TITLE>|<TEXT>|d:<TIMESTAMP>|h:<HOSTNAME>|p:<PRIORITY>|t:<ALERT_TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

| パラメーター                            | 必須 | 説明                                                                                                            |
| ------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `_e`                                 | はい      | データグラムは `_e` で始まる必要があります。                                                                                     |
| `<タイトル>`                            | はい      | イベントのタイトル。                                                                                                       |
| `<テキスト>`                             | はい      | イベントテキスト。`\\n` で改行を挿入します。                                                                        |
| `<TITLE_UTF8_LENGTH>`                | はい      | UTF-8 でエンコーディングされた `<TITLE>` 長 (バイト単位)                                                                              |
| `<TEXT_UTF8_LENGTH>`                 | はい      | UTF-8 でエンコーディングされた `<TEXT>` 長 (バイト単位)                                                                               |
| `d:<TIMESTAMP>`                      | いいえ       | イベントにタイムスタンプを追加します。デフォルトは、現在の Unix Epoch タイムスタンプです。                                         |
| `h:<HOSTNAME>`                       | いいえ       | Add a hostname to the event. Defaults to the Datadog Agent instance.                                                                               |
| `k:<集計キー>`                | いいえ       | 同じキーを持つ他のイベントとグループ化するための集計キーを追加します。デフォルトはありません。                              |
| `p:<PRIORITY>`                       | いいえ       | `normal` または `low` に設定します。デフォルトは `normal` です。                                                                            |
| `s:<ソースタイプ名>`               | いいえ       | イベントにソースタイプを追加します。デフォルトはありません。                                                                            |
| `t:<ALERT_TYPE>`                     | いいえ       | Set to `error`, `warning`, `info`, or `success`. Default `info`.                                                        |
| `#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>` | いいえ       | タグ内のコロンは、タグリスト文字列の一部です。他のパラメーターで使用されるコロンのようにパースには使用されません。デフォルトはありません。 |

以下に、データグラムの例を示します。

```text
## 例外を送信する
_e{21,36}:An exception occurred|Cannot parse CSV file from 10.0.0.17|t:warning|#err_type:bad_file

## テキスト内に改行を含むイベントを送信する
_e{21,42}:An exception occurred|Cannot parse JSON request:\\n{"foo: "bar"}|p:low|#err_type:bad_request
```

{{% /tab %}}
{{% tab "Service Checks" %}}

`_sc|<NAME>|<STATUS>|d:<TIMESTAMP>|h:<HOSTNAME>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>|m:<SERVICE_CHECK_MESSAGE>`

| パラメーター                            | 必須 | 説明                                                                                                                             |
| ------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `_sc`                                | はい      | データグラムは `_sc` で始まる必要があります。                                                                                                     |
| `<NAME>`                             | はい      | サービスチェック名。                                                                                                                 |
| `<STATUS>`                           | はい      | チェックステータスに対応する整数値 (OK = `0`、WARNING = `1`、CRITICAL = `2`、UNKNOWN = `3`)                                  |
| `d:<TIMESTAMP>`                      | いいえ       | チェックにタイムスタンプを追加します。デフォルトは、現在の Unix Epoch タイムスタンプです。                                                          |
| `h:<HOSTNAME>`                       | いいえ       | イベントにホスト名を追加します（デフォルトはありません）。                                                                                               |
| `#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>` | いいえ       | イベントのタグを設定します。カンマで区切られた文字列のリスト（デフォルトはありません）。                                                           |
| `m:<SERVICE_CHECK_MESSAGE>`          | いいえ       | A message describing the current state of the service check. This field must be positioned last among the metadata fields (no default). |

以下に、データグラムの例を示します。

```text
# リモート接続の CRITICAL ステータスを送信する
_sc|Redis connection|2|#env:dev|m:Redis connection timed out after 10s
```

{{% /tab %}}
{{< /tabs >}}

## DogStatsD とシェルを使用したメトリクスの送信

Linux などの Unix 系 OS では、Bash を使用してください。Windows では、PowerShell と [PowerShell-statsd][2] (ネットワークビットを処理する簡単な PowerShell 機能) を使用します。

DogStatsD は、メトリクス、イベント、またはサービスチェックに関する情報を含むメッセージを作成し、ローカルにインストールされた Agent にコレクターとして送信します。宛先 IP アドレスは `127.0.0.1` で、UDP 上のコレクターポートは `8125` です。Agent の構成の詳細については、[DogStatsD][3] を参照してください。

{{< tabs >}}
{{% tab "Metrics" %}}

メトリクスの送信に使用される形式は以下のとおりです。

```text
<メトリクス名>:<値>|<タイプ>|@<サンプリングレート>|#<タグキー_1>:<タグ値_1>,<タグ_2>
```

以下の例では、`shell` タグを使用して `custom_metric` というゲージメトリクスのデータポイントを送信します。

Linux の場合

```shell
echo -n "custom_metric:60|g|#shell" >/dev/udp/localhost/8125
```

```shell
echo -n "custom_metric:60|g|#shell" | nc -4u -w0 127.0.0.1 8125
```

```shell
echo -n "custom.metric.name:1|c"|nc -4u -w1 localhost 8125
```

Windows の場合

```powershell
PS C:\> .\send-statsd.ps1 "custom_metric:123|g|#shell"
```

任意のプラットフォームで Python を使用する場合 (Windows では、Agent の埋め込み Python インタープリターを使用できます。これは、Agent バージョン <= 6.11 の場合は `%ProgramFiles%\Datadog\Datadog Agent\embedded\python.exe`、Agent バージョン >= 6.12 の場合は `%ProgramFiles%\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe` にあります。)

### Python 2

```python
import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
sock.sendto("custom_metric:60|g|#shell", ("localhost", 8125))
```

### Python 3

```python
import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
sock.sendto("custom_metric:60|g|#shell", ("localhost", 8125))
```

{{% /tab %}}
{{% tab "Events" %}}

イベントの送信に使用される形式は以下のとおりです。

```text
_e{<タイトル>.length,<テキスト>.length}:<タイトル>|<テキスト>|d:<日付イベント>|h:<ホスト名>|p:<優先度>|t:<アラートタイプ>|#<タグキー_1>:<タグ値_1>,<タグ_2>.
```

以下の例では、イベントのタイトルと本文のサイズを計算しています。

Linux の場合

```shell
$ title="シェルからのイベント"

$ text="これは Bash から送信されました！"

$ echo "_e{${#title},${#text}}:$title|$text|#shell,bash"  >/dev/udp/localhost/8125
```

Windows の場合

```powershell
PS C:> $title = "シェルからのイベント"
PS C:> $text = "これは PowerShell から送信されました！"
PS C:> .\send-statsd.ps1 "_e{$($title.length),$($text.Length)}:$title|$text|#shell,PowerShell"
```

{{% /tab %}}
{{% tab "Service Checks" %}}

サービスチェックの送信に使用される形式は以下のとおりです。

```text
_sc|<名前>|<ステータス>|d:<タイムスタンプ>|h:<ホスト名>|#<タグキー_1>:<タグ値_1>|m:<サービスチェックメッセージ>
```

Linux の場合

```shell
echo -n "_sc|Redis 接続|2|#env:dev|m:Redis 接続が 10 秒後にタイムアウトしました" >/dev/udp/localhost/8125
```

Windows の場合

```powershell
PS C:\> .\send-statsd.ps1 "_sc|Redis 接続|2|#env:dev|m:Redis 接続が 10 秒後にタイムアウトしました"
```

{{% /tab %}}
{{< /tabs >}}

コンテナ環境でメトリクス、イベント、またはサービスチェックを送信する方法については、[Kubernetes 上の DogStatsD][3]を参照してください。また、環境に応じて [Kubernetes での APM の構成][4]も併せて参照してください。[Docker APM][5] のドキュメントも参考になります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/community/libraries/#api-and-dogstatsd-client-libraries
[2]: https://github.com/joehack3r/powershell-statsd/blob/master/send-statsd.ps1
[3]: /developers/dogstatsd/
[4]: /agent/kubernetes/apm/
[5]: /agent/docker/apm/
