---
title: 'サービスチェック送信: Agent チェック'
further_reading:
  - link: /developers/custom_checks/write_agent_check/
    tag: ドキュメント
    text: Agent カスタムチェックの書き方
---
カスタム Agent チェック内で Datadog にサービスチェックを送信するには、`AgentCheck` クラスの定義済みの `service_check()` 関数を使用します。

```python
self.service_check(name, status, tags=None, hostname=None, message=None)
```

以下は、`service_check()` 関数で利用可能な各種パラメーターとデータ型です。

| パラメーター  | 種類            | 必須 | デフォルト値 | 説明                                                                                                   |
|------------|-----------------|----------|---------------|---------------------------------------------------------------------------------------------------------------|
| `name`     | string          | はい      | -             | サービスチェックの名前。                                                                                |
| `status`   | 整数             | はい      | -             | サービスのステータスを説明する定数: OK には `0`、Warning には `1`、Critical には `2`、Unknown には `3`。 |
| `tags`     | 文字列のリスト | いいえ       | `None`        | このサービスチェックに関連付けるタグのリスト                                                          |
| `hostname` | string          | いいえ       | 現在のホスト  | このサービスチェックに関連付けるホスト名。デフォルトは現在のホストです。                                |
| `message`  | string          | いいえ       | `None`        | このステータスが発生した補足情報や説明                                          |

## 例

定期的に 1 つのサービスチェックのみを送信するダミーの Agent チェックの例を次に示します。詳細については、[カスタム Agent チェックの書き方][1]を参照してください。

1. Agent の [`conf.d/` フォルダー][2]に新しいディレクトリ `service_check_example.d/` を作成します。

2. `service_check_example.d/` フォルダーに次の内容で空のコンフィギュレーションファイルを作成し、`service_check_example.yaml` と名付けます。

    ```yaml
    instances: [{}]
    ```

3. `conf.d/` フォルダーから階層を 1 つ上がり、`checks.d/` フォルダーに移動します。
4. このフォルダー内に次の内容でカスタムチェックファイルを作成し、`service_check_example.py` と名付けます。

    {{< code-block lang="python" filename="service_check_example.py" >}}
from datadog_checks.base import AgentCheck

__version__ = "1.0.0"

class MyClass(AgentCheck):
    def check(self, instance):
        self.service_check('example_service_check', 0, message='サンプルアプリケーションが稼働しています。')
    {{< /code-block >}}

5. [Agent を再起動します][3]。

6. [Agent ステータスコマンド][4]を使用して、カスタムチェックが正しく実行されていることを確認してください。次のように表示されるはずです。

    ```text
    =========
    Collector
    =========

      Running Checks
      ==============

        (...)

        service_check_example (1.0.0)
        -----------------------------
          Instance ID: service_check_example:d884b5186b651429 [OK]
          Total Runs: 1
          Metric Samples: Last Run: 0, Total: 0
          Events: Last Run: 0, Total: 0
          Service Checks: Last Run: 1, Total: 1
          Average Execution Time : 2ms

        (...)
    ```

7. 最後に、[Datadog サービスチェック内容のサマリー][5]を参照して、サービスチェックレポートを確認します。

{{< img src="developers/service_checks/agent_service_checks_submission/service_check.png" alt="サービスチェック" style="width:80%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/developers/custom_checks/write_agent_check/
[2]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /ja/agent/guide/agent-commands/#restart-the-agent
[4]: /ja/agent/guide/agent-commands/#agent-information
[5]: https://app.datadoghq.com/check/summary