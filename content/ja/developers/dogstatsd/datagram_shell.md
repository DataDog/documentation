---
title: データグラム形式とシェルの使用方法
kind: documentation
description: DogStatsD が使用するデータグラム形式および (高度な) シェルの使用方法の概要
aliases:
  - /ja/developers/dogstatsd/data_types/
further_reading:
  - link: developers/dogstatsd
    tag: ドキュメント
    text: DogStatsD 入門
  - link: developers/libraries
    tag: ドキュメント
    text: 公式/コミュニティ作成の API および DogStatsD クライアントライブラリ
  - link: 'https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd'
    tag: GitHub
    text: DogStatsD ソースコード
---
ここでは、DogStatsD が受け付けるメトリクス、イベント、サービスチェックの生のデータグラム形式を規定します。[DogStatsD クライアントライブラリ][1]を使用する場合は、これをお読みになる必要はありません。独自のライブラリを記述する場合、あるいはシェルを使用してメトリクスを送信する場合は、以下を参照してください。

{{< tabs >}}
{{% tab "Metrics" %}}

`<METRIC_NAME>:<VALUE>|<TYPE>|@<SAMPLE_RATE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

| パラメーター                           | 必須 | 説明                                                                                                                                      |
| ----------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<METRIC_NAME>`                     | はい      | ASCII 英数字、アンダースコア、およびピリオドのみを含む文字列。[メトリクス命名ポリシー][1]を参照してください。                                    |
| `<VALUE>`                           | はい      | 整数または浮動小数点数。                                                                                                                             |
| `<TYPE>`                            | はい      | COUNT の場合は `c`、GAUGE の場合は `g`、TIMER の場合は `ms`、HISTOGRAM の場合は `h`、SET の場合は `s`、DISTRIBUTION の場合は `d`。[メトリクスタイプのドキュメント][2]を参照してください。      |
| `<SAMPLE_RATE>`                     | いいえ       | `0` から `1` までの浮動小数点数。COUNT、HISTOGRAM、TIMER メトリクスでのみ機能します。デフォルトは `1` で、100% の時間をサンプリングします。 |
| `<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>` | いいえ       | 文字列のカンマ区切りリスト。キー/値タグにはコロンを使用します（`env:prod`）。タグの定義に関するガイダンスについては、[タグ付けのドキュメント][3]を参照してください。 |

以下に、データグラムの例を示します。

- `page.views:1|c` : `page.views` COUNT メトリクスを増やします。
- `fuel.level:0.5|g`: 燃料タンクが半分空になったことを記録します。
- `song.length:240|h|@0.5`: 半分の時間で `song.length` ヒストグラムをサンプリングします。
- `users.uniques:1234|s`: サイトへのユニークビジターを追跡します。
- `users.online:1|c|#country:china`: アクティブユーザー COUNT メトリクスを増やし、所属国ごとにタグ付けします。
- `users.online:1|c|@0.5|#country:china`: アクティブな中国ユーザーを追跡し、サンプルレートを使用します。


[1]: /ja/metrics/#naming-metrics
[2]: /ja/metrics/types/
[3]: /ja/getting_started/tagging/
{{% /tab %}}
{{% tab "Events" %}}

`_e{<TITLE>.length,<TEXT>.length}:<TITLE>|<TEXT>|d:<TIMESTAMP>|h:<HOSTNAME>|p:<PRIORITY>|t:<ALERT_TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

| パラメーター                            | 必須 | 説明                                                                                                            |
| ------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `_e`                                 | はい      | データグラムは `_e` で始まる必要があります。                                                                                     |
| `<TITLE>`                            | はい      | イベントのタイトル。                                                                                                       |
| `<TEXT>`                             | はい      | イベントテキスト。`\\n` で改行を挿入します。                                                                        |
| `d:<TIMESTAMP>`                      | いいえ       | イベントにタイムスタンプを追加します。デフォルトは、現在の Unix Epoch タイムスタンプです。                                         |
| `h:<HOSTNAME>`                       | いいえ       | イベントにホスト名を追加します。デフォルトはありません。                                                                               |
| `k:<集計キー>`                | いいえ       | 同じキーを持つ他のイベントとグループ化するための集計キーを追加します。デフォルトはありません。                              |
| `p:<PRIORITY>`                       | いいえ       | `normal` または `low` に設定します。デフォルトは `normal` です。                                                                            |
| `s:<ソースタイプ名>`               | いいえ       | イベントにソースタイプを追加します。デフォルトはありません。                                                                            |
| `t:<ALERT_TYPE>`                     | いいえ       | `error`、`warning`、`info`、`success` のいずれかに設定します。デフォルトは `info` です。                                                        |
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
| `m:<SERVICE_CHECK_MESSAGE>`          | いいえ       | サービスチェックの現在の状態を説明するメッセージ。このフィールドは、メタデータフィールドの最後に置く必要があります（デフォルトはありません）。 |

以下に、データグラムの例を示します。

```text
# リモート接続の CRITICAL ステータスを送信する
_sc|Redis connection|2|#env:dev|m:Redis connection timed out after 10s
```

{{% /tab %}}
{{< /tabs >}}

## DogStatsD とシェルを使用したメトリクスの送信

Linux などの Unix 系 OS では、Bash を使用してください。Windows では、PowerShell と [PowerShell-statsd][2] (ネットワークビットを処理する簡単な PowerShell 機能) を使用します。

DogStatsD は、メトリクス、イベント、またはサービスチェックに関する情報を含むメッセージを作成し、ローカルにインストールされた Agent にコレクターとして送信します。宛先 IP アドレスは `127.0.0.1` で、UDP 上のコレクターポートは `8125` です。Agent の構成方法については、[メインの DogStatsD のドキュメント][3]を参照してください。

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

任意のプラットフォームで Python を使用する場合 (Windows では、Agent の埋め込み Python インタープリターを使用できます。これは、Agent バージョン <= 6.11 の場合は `%PROGRAMFILES%\Datadog\Datadog Agent\embedded\python.exe`、Agent バージョン >= 6.12 の場合は `%PROGRAMFILES%\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe` にあります。)

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
sock.sendto(b"custom_metric:60|g|#shell", ("localhost", 8125))
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

コンテナ環境でメトリクス、イベント、またはサービスチェックを送信する方法については、[Kubernetes 上の DogStatsD に関するドキュメント][3]を参照してください。また、環境に応じて [Kubernetes で APM を構成][4]する手順も併せて参照してください。[Docker APM][5] のドキュメントも参考になります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/developers/community/libraries/#api-and-dogstatsd-client-libraries
[2]: https://github.com/joehack3r/powershell-statsd/blob/master/send-statsd.ps1
[3]: /ja/developers/dogstatsd/
[4]: /ja/agent/kubernetes/apm/
[5]: /ja/agent/docker/apm/