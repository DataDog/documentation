---
aliases:
- /ja/agent/faq/dogstream
private: true
title: Dogstream
---

<div class="alert alert-danger">
これは、Agent 5 の非推奨の機能です。新機能のリリースは中止されました。
<br>
Agent v6 が利用可能です。<a href="https://github.com/DataDog/datadog-agent/blob/master/docs/agent/upgrade.md">最新バージョンにアップグレードすると、</a>新しい機能を利用できます。
</div>

ログファイルには、膨大な量の貴重なアプリケーションデータとビジネスデータが含まれています。
しかし残念なことに、その価値はまったく認識されておらず、活用されていないことがほとんどです。
 Datadog Agent を利用するれば、この状況を改善できます。ログに含まれるメトリクスやイベントを
パースして、いつでもリアルタイムにログデータをグラフ化できます。

## メトリクスのパース

Datadog Agent は、ログファイルから直接メトリクスを読み取ることができます。

- Datadog の標準ログ形式から読み取る場合、追加のプログラミングは不要です。
- その他のログ形式から読み取る場合は、カスタマイズしたログパース関数を使用します。

### Datadog の標準ログ形式

Datadog のログは、次のような形式になります。

    metric unix_timestamp value [attribute1=v1 attributes2=v2 ...]

たとえば、次の内容の `/var/log/web.log` があるとします。

    me.web.requests 1320786966 157 metric_type=counter unit=request
    me.web.latency 1320786966 250 metric_type=gauge unit=ms

Datadog にこのメトリクスを読み取らせるには、Agent の構成ファイル (通常は `/etc/dd-agent/datadog.conf`) に次の行を追加するだけです。

    dogstreams: /var/log/web.log

次のようにして、複数のログファイルを指定することもできます。

    dogstreams: /var/log/web.log, /var/log/db.log, /var/log/cache.log

### カスタムログ形式のパース

ベンダーソフトウェアやレガシーソフトウェアなど、Datadog の標準とは異なるログ形式をパースする場合は、Agent 構成ファイルでログファイルを指定し、カスタム Python 関数を使用してログから正しいフィールドを抽出できます。次の形式を使用します。

    dogstreams: /var/log/web.log:parsers:parse_web

`parsers:parse_web` の部分は、Agent の `PYTHONPATH` の `parsers` というパッケージ内にカスタム Python 関数があり、この `parsers` パッケージに `parse_web` という名前の関数があることを示します。Agent の `PYTHONPATH` は、Agent バージョンのスーパーバイザー構成の Agent 起動スクリプト `/etc/init.d/datadog-agent` で設定されます。

パーサーが Agent の `PYTHONPATH` に**ない**場合は、代わりに次の構文を使用してラインパーサーを設定できます。

    dogstreams: /path/to/log1:/path/to/my/parsers_module.py:custom_parser

この形式の場合、Agent は `/path/to/my/parsers_module.py` から `custom_parser` という関数をインポートしようとします。

カスタムログパーサーが機能しない場合は、Agent のコレクターログを最初にチェックしてください。

* Agent が関数をインポートできない場合は、`Could not load Dogstream line parser` を探してください。

* すべてが正常に動作していると、`dogstream: parsing {filename} with {function name} (requested {config option text})` のように表示されます。

<div class="alert alert-warning">
dogstreams が動作していることをテストする場合は、Agent の監視対象として設定したログファイルに 1 行を追加します。既存の行を編集してもテストできません。Agent は各ログファイルの末尾のみを<a href="/glossary/#tail">テール</a>するため、ファイルの他の部分を変更しても認識されません。
</div>

### パース関数の記述

カスタムパース関数は、次の条件を満たす必要があります。

- Python ロガーオブジェクト (デバッグ用) およびパースする現在行文字列の 2 つのパラメーターを受け取ります。
- 次の形式のタプルまたはタプルのリストを返します。

     `(metric (str), timestamp (unix timestamp), value (float), attributes (dict))`

    attributes には、少なくとも metric_type キーが含まれている必要があります。これは、このメトリクスがカウンターかゲージかを示します。

    行が該当しない場合は、`None` を返します。

### メトリクスの収集

標準形式ではないが、特定の文字で合理的に区切られたログからメトリクスを収集する例を考えます。このログは、次のように記録されています。

```text
user.crashes|2016-05-28 20:24:43.463930|24|LotusNotes,Outlook,Explorer
```

ログパーサーを次のように設定して、Datadog アカウント内のこのログデータからメトリクスを収集できます。

```python

import time
from datetime import datetime
...
def my_log_parser(logger, test):
    metric_name, date, metric_value, extras = line.split('|')
    # タイムスタンプ文字列がログをパースしているマシンと同じタイムゾーンにあると仮定して、
    # iso8601 日付を UNIX タイムスタンプに変換します。
    date = datetime.strptime(date, "%Y-%m-%d %H:%M:%S.%f")
    tags = extras.split(',')
    date = time.mktime(date.timetuple())
    metric_attributes = {
        'tags': tags,
        'metric_type': 'gauge',
    }
    return (metric_name, date, metric_value, metric_attributes)
```

次に、`datadog.conf` を構成して、以下の dogstream オプションを追加します。

```text
dogstreams: /path/to/mylogfile.log:/path/to/mylogparser.py:my_log_parser
# （注：Windows ユーザーは "/" をエスケープした "\\" に置き換える必要があります。）
```

この例は、名前が "user.crashes"、値が 24 のゲージタイプのメトリクスを収集し、末尾で指定されている 3 つのアプリケーションをタグとして付加しています。

注意しなければならないのは、同じログパス内で同じメトリクスを収集できる回数に制限があることです。Agent は、後から同じメトリクスが送信されると、属性 (タグなど) が異なる場合でも、記録済みのメトリクスを後のメトリクスで上書きし始めます。ログから収集されるメトリクスのタイムスタンプが十分に離れている場合、この制限はいくらか軽減されます。しかし、一般にはログに送信して収集するメトリクスは 1 種類につき 10 秒に 1 回程度にすることをお勧めします。この上書きは、異なる名前で収集されたメトリクスには適用されません。

## イベントのパース

イベントのパースは、上述と同じカスタムパース関数を使用して行います。ただし、カスタムパース関数から
`dict` (または `dict` の `list`) が返されると、Datadog は、それをメトリクスではなくイベントとして処理します。

以下に、イベントのフィールドを示します (太字のフィールドは必須)。

| フィールド           | タイプ        | 値                                                                                                                                                                                                                             |
|-----------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **msg_title**   | string      | イベントのタイトル。全文検索によってインデックス化されます。                                                                                                                                                                         |
| **timestamp**   | integer     | UNIX Epoch タイムスタンプ。省略した場合のデフォルトは、Agent がそのイベントをパースした時刻です。                                                                                                                                        |
| **msg_text**    | string      | イベントの本文。全文検索によってインデックス化されます。                                                                                                                                                                           |
| alert_type      | string enum | イベントの重要度を示します。`error`、`warning`、`success`、`info` のいずれかでなければなりません。省略した場合のデフォルトは `info` です。`alert_type:value` で検索できます。                                                                  |
| event_type      | string      | このイベントの種類を記述します。集計キーの 1 つとして使用されます。                                                                                                                                                         |
| aggregation_key | string      | このイベントの影響を受けたものがある場合に、それを記述します。集計キーの 1 つとして使用されます。                                                                                                                                              |
| ホスト            | string      | このイベントが発生したホストの名前。イベントは、[タグ付け][1]ページまたは[タグ付け API][2] を使用してこのホストに指定したタグに基づいて自動的にタグ付けされます。host 値は、集計キーの 1 つとして使用されます。 |
| **priority**    | string      | このイベントがストリーム内にデフォルトで表示/非表示されるかを決定します。`low` または `normal` のいずれかでなければなりません。                                                                                                                      |

24 時間のタイムウィンドウ内で同じ集計キーを持つイベントがストリーム内で集計されます。
集計キーは、次のフィールドの組み合わせです。

- event_type
- aggregation_key
- ホスト

イベントパーサーの例については、Agent に付属している [Cassandra 圧縮イベントパーサー][3]を参照してください。

### イベント収集

任意の関連情報を自由に追加できる場合に、ログからイベントを収集するとします。このログは、次のように特定の文字で合理的に区切られて記録されています。

```text
2016-05-28 18:35:31.164705|Crash_Report|Windows95|A terrible crash happened!|A crash was reported on Joe M's computer|LotusNotes,Outlook,InternetExplorer
```

次のようにログパーサーを設定して、Datadog の[イベントエクスプローラー][4]内に、このログデータから取得したイベントを作成できます。

```python

import time
from datetime import datetime
...
def my_log_parser(logger, line):

    # line をフィールドに分割します
    date, report_type, system, title, message, extras = line.split('|')
    # さらに、extras をタグに分割します。
    tags = extras.split(',')
    # タイムスタンプ文字列がログをパースしているマシンと同じタイムゾーンにあると仮定して、
    # iso8601 日付を UNIX タイムスタンプに変換します。
    date = datetime.strptime(date, "%Y-%m-%d %H:%M:%S.%f")
    date = time.mktime(date.timetuple())
    logged_event = {
        'msg_title': title,
        'timestamp': date,
        'msg_text': message,
        'priority': 'normal',
        'event_type': report_type,
        'aggregation_key': system,
        'tags': tags,
        'alert_type': 'error'
    }
    return logged_event
```

次に、`datadog.conf` を構成して、以下の Dogstream オプションを追加します。

```text
dogstreams: /path/to/mylogfile.log:/path/to/mylogparser.py:my_log_parser
# （注：Windows ユーザーは "/" をエスケープした "\\" に置き換える必要があります。）
```

このパーサーを使用して上のログ行をパースすると、Datadog に次のイベントが作成されます。

{{< img src="agent/faq/log_event_in_dd.jpg" alt="Datadog のログイベント" style="width:70%;">}}

## カスタムパース関数への追加パラメーターの送信

メトリクスやイベントをプラットフォームに送信するためのカスタムパーサーをセットアップできたら、`datadog.conf` で次のような設定を行います。

```text
dogstreams: /path/to/log1:/path/to/my/parsers_module.py:custom_parser
```

また、parsers_module.py で、次のように関数を定義します。

```python
def custom_parser(logger, line)
```

さらに関数のパリティを変更して、[こちらの Agent サンプル][5]で示されているように追加のパラメーターを受け取ることができます。

たとえば、構成ファイルを次のように変更します。

```text
dogstreams: /path/to/log1:/path/to/my/parsers_module.py:custom_parser:customvar1:customvar2
```

パース関数は次のようになります。

```python
def custom_parser(logger, line, parser_state, *parser_args):
```

**parser_args** には、(`<CUSTOM_VAR_1>`, `<CUSTOM_VAR_2>`) に対応するタプルパラメーターが含まれます。これらは、parser_args[0] および parser_args[1] としてコードで使用できます。

**注**: パラメーター **parser_state** を使用する必要はありませんが、関数のシグニチャには入れる必要があります。また、パラメーターが 1 つしかない場合は、**parser_args[1]** を使用してそれを取得する必要があります。

たとえば、このドキュメント内のパーサーと同じパーサーがあり、ただしログからメトリクス名を抽出せず、このパラメーターを利用してメトリクス名を設定するとします。

この場合、構成ファイルで次のようにします。

```text
dogstreams: /Users/Documents/Parser/test.log:/Users/Documents/Parser/myparser.py:parse_web:logmetric
```

## トラブルシューティング

バグが発生した場合、ログパーサーからのトレースバックを確認できることが重要です。それには、[Agent ログ][6]を "DEBUG" レベルに設定して Agent を実行します。Agent のログレベルを設定するには、`datadog.conf` で、[この行][7]のコメントを解除して編集した後、[Agent を再起動][8]します。適切に設定すると、カスタムログパーサーのエラーから生成されたトレースバックを `collector.log` ファイルで確認できます。通常、トレースバックには "checks.collector(datadog.py:278) | Error while parsing line" のような文字列が含まれます。(エラーを生成する [Agent コードサンプル][9]もご参照ください)。

**注**: カスタムログパーサーに変更を加えた場合は必ず、[Agent を再起動][8]して、変更を有効にしてください。

カスタムログパーサー関数では対応できないエラーが発生していると思われる場合は、いつでも[サポートにお問い合わせください][10]。ただし、お問い合わせいただく前に、Agent のログレベルを "DEBUG" に設定して Agent を数分間実行します。新しいログがファイルに追加されることを確認し、Agent から [flare コマンドを実行][11]してください。これにより、サポートチームが問題を効果的にトラブルシューティングするために必要な情報を得られるようになります。

[1]: https://app.datadoghq.com/infrastructure#tags
[2]: /ja/api/v1/tags/
[3]: https://github.com/DataDog/dd-agent/blob/master/dogstream/cassandra.py
[4]: /ja/events/
[5]: https://github.com/DataDog/dd-agent/blob/5.13.x/checks/datadog.py#L210
[6]: /ja/agent/guide/agent-log-files/
[7]: https://github.com/DataDog/dd-agent/blob/5.7.x/datadog.conf.example#L211
[8]: /ja/agent/guide/agent-commands/
[9]: https://github.com/DataDog/dd-agent/blob/5.7.x/checks/datadog.py#L278
[10]: /ja/help/
[11]: /ja/agent/troubleshooting/send_a_flare/