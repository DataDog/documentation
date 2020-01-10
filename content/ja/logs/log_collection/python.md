---
title: Python ログ収集
kind: documentation
aliases:
  - /ja/logs/languages/python
further_reading:
  - link: 'https://www.datadoghq.com/blog/python-logging-best-practices/'
    tag: ブログ
    text: Python ログの収集、カスタマイズ、一元化方法
  - link: logs/processing
    tag: Documentation
    text: ログの処理方法
  - link: logs/processing/parsing
    tag: Documentation
    text: パースの詳細
  - link: logs/explorer
    tag: Documentation
    text: ログの調査方法
  - link: logs/faq/log-collection-troubleshooting-guide
    tag: FAQ
    text: ログ収集のトラブルシューティングガイド
---
## 概要

任意の Python ロガーを使用して、ホスト上のファイルにログを記録します。次に、Datadog Agent でファイルを監視して、ログを Datadog に送信します。

## セットアップ

Python ログの処理はかなり複雑ですが、その主な原因はトレースバックです。トレースバックが複数行に分割されるため、元のログイベントとの関連付けが難しくなります。
この問題に対応するには、ログの収集時に JSON フォーマッタを使用して次の処理を行うことを強くお勧めします。

* 各 stack_trace を正しいログに適切にラップします。
* ログイベントのすべての属性 (重大度、ロガー名、スレッド名など) を正しく抽出します。

以下は、ログライブラリごとのセットアップ例です。

- [JSON-log-formatter][1]
- [Python-json-logger][2]

### ログへのトレース ID の挿入

APM が有効になっているアプリケーションの場合は、[アプリケーションログとトレースの関連付け][3]を強化して、自動的にログにトレース ID とスパン ID を追加できます。

これで、ログは次のような形式になります。

```xml
2019-01-07 15:20:15,972 DEBUG [flask.app] [app.py:100] [dd.trace_id=5688176451479556031 dd.span_id=4663104081780224235] - this is an example
```

次に、ファイルから python ログを収集するように、[Datadog Agent を構成します](#configure-the-datadog-agent)。

### ファイルへのログの記録

{{< tabs >}}
{{% tab "JSON_log-formatter" %}}

[JSON-log-formatter][1] の使用例

```python
import logging

import json_log_formatter

formatter = json_log_formatter.JSONFormatter()

json_handler = logging.FileHandler(filename='/var/log/my-log.json')
json_handler.setFormatter(formatter)

logger = logging.getLogger('my_json')
logger.addHandler(json_handler)
logger.setLevel(logging.INFO)

logger.info('Sign up', extra={'referral_code': '52d6ce'})
```

ログファイルには次のログレコード (インライン) が含まれます。
```json
{
    "message": "Sign up",
    "time": "2015-09-01T06:06:26.524448",
    "referral_code": "52d6ce"
}
```
[1]: https://pypi.python.org/pypi/JSON-log-formatter/0.1.0
{{% /tab %}}
{{% tab "Python-json-logger" %}}

[Python-json-logger][1] の使用例

```python
    import logging
    from pythonjsonlogger import jsonlogger

    logger = logging.getLogger()

    logHandler = logging.StreamHandler()
    formatter = jsonlogger.JsonFormatter()
    logHandler.setFormatter(formatter)
    logger.addHandler(logHandler)
```

[ハンドラーが構成される][2]と、ログファイルには次のログレコード (インライン) が含まれます。

```json
{
    "threadName": "MainThread",
    "name": "root",
    "thread": 140735202359648,
    "created": 1336281068.506248,
    "process": 41937,
    "processName": "MainProcess",
    "relativeCreated": 9.100914001464844,
    "module": "tests",
    "funcName": "testFormatKeys",
    "levelno": 20,
    "msecs": 506.24799728393555,
    "pathname": "tests/tests.py",
    "lineno": 60,
    "asctime": ["12-05-05 22:11:08,506248"],
    "message": "testing logging format",
    "filename": "tests.py",
    "levelname": "INFO",
    "special": "value",
    "run": 12
}
```

[1]: https://github.com/madzak/python-json-logger
[2]: https://github.com/madzak/python-json-logger#customizing-fields
{{% /tab %}}
{{< /tabs >}}

### Datadog Agent の構成

Agent の `conf.d/python.d/` ディレクトリに、以下の内容の `conf.yaml` ファイルを作成します。

```
init_config:

instances:

##ログセクション
logs:

    ## - type : file (必須) ログ入力ソースの種類 (tcp/udp/file)
    ##   port / path : (必須) type が tcp または udp の場合は、ポートを設定します。type が file の場合は、パスを設定します。
    ##   service : (必須) ログを所有しているサービスの名前
    ##   source : (必須) ログを送信しているインテグレーションを定義する属性
    ##   sourcecategory : (オプション) 複数値属性。ソース属性の絞り込みに使用できます。
    ##   tags: (オプション) 収集された各ログにタグを追加します。

  - type: file
    path: <PATH_TO_PYTHON_LOG>.log
    service: <YOUR_APPLICATION>
    source: python
    sourcecategory: sourcecode
    # 複数行ログで、ログが yyyy-mm-dd 形式の日付で始まる場合は、以下の処理ルールのコメントを解除します。
    #log_processing_rules:
    #  - type: multi_line
    #    name: new_log_start_with_date
    #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
```

[Agent を再起動][4]すると、構成が適用されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.python.org/pypi/JSON-log-formatter/0.1.0
[2]: https://github.com/madzak/python-json-logger
[3]: /ja/tracing/connect_logs_and_traces/?tab=python
[4]: /ja/agent/guide/agent-commands