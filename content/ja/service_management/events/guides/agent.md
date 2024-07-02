---
aliases:
- /ja/events/agent/
- /ja/events/guides/agent
further_reading:
- link: /developers/custom_checks/write_agent_check/
  tag: Documentation
  text: カスタム Agent チェックの書き方
title: カスタム Agent チェックを使用したイベント
---

## 送信

カスタム Agent チェックからイベントを送信するには、以下の `event(<イベント_辞書>)` 関数を使用します。

```text
self.event(
            {
              "timestamp": <タイムスタンプ_エポック>,
              "event_type": "<イベント名>",
              "msg_title": "<タイトル>",
              "msg_text": "<メッセージ>",
              "aggregation_key": "<集計キー>",
              "alert_type": "<アラートタイプ>",
              "source_type_name": "<ソースタイプ>",
              "host": "<ホスト名>",
              "tags": ["<タグ>"],
              "priority": "<優先度>"
            }
)
```

イベントの辞書では、以下のキーとデータ型を使用できます。

| キー                | タイプ            | 必須 | 説明                                                   |
|--------------------|-----------------|----------|---------------------------------------------------------------|
| `timestamp`        | 整数         | はい      | イベントのエポックタイムスタンプ                             |
| `event_type`       | 文字列          | はい      | イベント名                                                |
| `msg_title`        | 文字列          | はい      | イベントのタイトル                                        |
| `msg_text`         | 文字列          | はい      | イベントのテキスト本文                                    |
| `aggregation_key`  | 文字列          | ✕       | イベントを集計するために使用するキー                           |
| `alert_type`       | 文字列          | ✕       | `error`、`warning`、`success`、または `info` (デフォルトは `info`) |
| `source_type_name` | 文字列          | ✕       | ソースタイプの名前                                     |
| `host`             | 文字列          | ✕       | ホスト名                                                 |
| `tags`             | 文字列のリスト | ✕       | このイベントに関連付けられるタグのリスト                    |
| `priority`         | 文字列          | ✕       | イベントの優先度を指定します (`normal` または `low`)。      |

### 例

カスタム Agent チェックを使用して、1 つのイベントを定期的に送信する例を示します。詳細については、[カスタム Agent チェックの書き方][1]を参照してください。

1. [Agent のコンフィギュレーションディレクトリ][2]のルートにある `conf.d/` フォルダーに、ディレクトリ `event_example.d/` を作成します。

2. `event_example.d/` フォルダーに次の内容でコンフィギュレーションファイルを作成し、`event_example.yaml` と名付けます。

    ```yaml
    instances: [{}]
    ```

3. `conf.d/` フォルダーから階層を 1 つ上がり、`checks.d/` フォルダーに移動します。
4. このフォルダーに次の内容でカスタムチェックファイルを作成し、`event_example.py` と名付けます。

    {{< code-block lang="python" filename="event_example.py" >}}
    from datadog_checks.base import AgentCheck

    __version__ = "1.0.0"

    class MyClass(AgentCheck):
        def check(self, instance):
            self.event(
                {
                    "timestamp": time.time(),
                    "event_type": "Error",
                    "msg_title": "サンプルイベント",
                    "msg_text": "これは Datadog から送られたサンプルのイベントです。",
                    "alert_type": "error",
                }
            )
    {{< /code-block >}}

5. [Agent を再起動します][3]。
6. 検証するには、[Agent の status コマンド][4]を実行し、Checks セクションで `event_example` を探します。

    ```
    =========
    Collector
    =========

      Running Checks
      ==============

        (...)

        event_example (1.0.0)
        ---------------------
          Instance ID: event_example:d884b5186b651429 [OK]
          Total Runs: 2
          Metric Samples: Last Run: 0, Total: 0
          Events: Last Run: 1, Total: 2
          Service Checks: Last Run: 0, Total: 0
          Average Execution Time : 0s

        (...)
    ```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/developers/custom_checks/write_agent_check/
[2]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /ja/agent/guide/agent-commands/#restart-the-agent
[4]: /ja/agent/guide/agent-commands/#agent-information