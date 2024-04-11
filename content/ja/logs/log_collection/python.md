---
aliases:
- /ja/logs/languages/python
further_reading:
- link: https://www.datadoghq.com/blog/python-logging-best-practices/
  tag: ブログ
  text: Python ログの収集、カスタマイズ、一元化方法
- link: /logs/log_configuration/processors
  tag: Documentation
  text: ログの処理方法
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: パースの詳細
- link: /logs/explorer/
  tag: Documentation
  text: ログの調査方法
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: Documentation
  text: ログ収集のトラブルシューティングガイド
- link: /glossary/#tail
  tag: 用語集
  text: 用語集 "テール" の項目
kind: documentation
title: Python ログ収集
---

## 概要

Python のログを Datadog に送信するには、Python ロガーを構成してホスト上のファイルにログを記録し、Datadog Agent でそのファイルを[テール][12]します。

## ロガーの構成

Python のログは、トレースバックのために扱いが複雑になることがあります。トレースバックは、ログを複数行に分割する原因となり、元のログイベントとの関連付けが困難になります。この問題に対処するため、Datadog はロギング時に JSON フォーマッターを使用することを強く推奨しています。

* 各スタックトレースが正しいログにラップされていることを確認します。
* ログイベントのすべての属性が正しく抽出されていることを確認します (重大度、ロガー名、スレッド名など)。

以下のロギングライブラリの設定例をご参照ください。

* [JSON-log-formatter][1]
* [Python-json-logger][2]
* [django-datadog-logger][3]*

*[Python ロガー][6]には、カスタム属性を追加するための `extra` パラメーターがあります。`DJANGO_DATADOG_LOGGER_EXTRA_INCLUDE` を使って、`extra` パラメーターを追加したいロガーの名前にマッチする正規表現を指定します。

## Datadog Agent の構成

[ログ収集][7]を有効にしたら、[カスタムログ収集][8]を設定して、以下のようにログファイルを追跡して Datadog に送信します。

1. `python.d/` フォルダーを `conf.d/` Agent 構成ディレクトリに作成します。
2. `conf.d/python.d/` ディレクトリに、以下の内容の `conf.yaml` ファイルを作成します。
    ```yaml
    init_config:

    instances:

    ##Log section
    logs:

      - type: file
        path: "<PATH_TO_PYTHON_LOG>.log"
        service: "<SERVICE_NAME>"
        source: python
        sourcecategory: sourcecode
        # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
        #log_processing_rules:
        #  - type: multi_line
        #    name: new_log_start_with_date
        #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```
3. [Agent を再起動します][5]。
4. [Agent の status サブコマンド][9]を実行し、`Checks` セクションで `python` を探し、ログが Datadog に正常に送信されることを確認します。

ログが JSON 形式の場合、Datadog は自動的にログメッセージを[パース][10]し、ログ属性を抽出します。[ログエクスプローラー][11]を使用して、ログを表示し、トラブルシューティングを行うことができます。

## ログとトレースにおけるサービスを接続

APM が有効になっているアプリケーションの場合は、[APM Python の指示に従い][4]ログにトレース ID、スパン ID、`env`、`service`、`version` を自動的に追加し、ログとトレースを接続します。

**注**: APM トレーサーがログに `service` を挿入する場合、Agent 構成で設定されている値は上書きされます。

これで、ログは次のような形式になります。

```xml
2019-01-07 15:20:15,972 DEBUG [flask.app] [app.py:100] [dd.trace_id=5688176451479556031 dd.span_id=4663104081780224235] - this is an example
```

ログが JSON 形式の場合、値がトップレベル、またはトップレベルの `extra` または `record.extra` ブロックにある場合、トレース値は自動的に抽出されます。以下はトレース値が自動的にパースされる有効な JSON ログの例です。

```json
{
  "message":"Hello from the private method",
  "dd.trace_id":"18287620314539322434",
  "dd.span_id":"8440638443344356350",
  "dd.env":"dev",
  "dd.service":"logs",
  "dd.version":"1.0.0"
}
```

```json
{
  "message":"Hello from the private method",
  "extra":{
    "dd.trace_id":"18287620314539322434",
    "dd.span_id":"8440638443344356350",
    "dd.env":"dev",
    "dd.service":"logs",
    "dd.version":"1.0.0"
  }
}
```

```json
{
"message":"Hello from the private method",
  "record":{
    "extra":{
      "dd.trace_id":"1734396609740561719",
      "dd.span_id":"17877262712156101004",
      "dd.env":"dev",
      "dd.service":"logs",
      "dd.version":"1.0.0"
    }
  }
}
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.python.org/pypi/JSON-log-formatter/
[2]: https://github.com/madzak/python-json-logger
[3]: https://pypi.org/project/django-datadog-logger/
[4]: /ja/tracing/other_telemetry/connect_logs_and_traces/python
[5]: /ja/agent/configuration/agent-commands/
[6]: https://docs.python.org/3/library/logging.html#logging
[7]: /ja/agent/logs/?tab=tailfiles#activate-log-collection
[8]: /ja/agent/logs/?tab=tailfiles#custom-log-collection
[9]: /ja/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[10]: /ja/logs/log_configuration/parsing/
[11]: /ja/logs/explorer/#overview
[12]: /ja/glossary/#tail