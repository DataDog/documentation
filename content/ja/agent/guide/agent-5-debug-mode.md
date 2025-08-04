---
private: true
title: Agent 5 デバッグモード
---

## 概要

Agent は、デフォルトで `INFO` レベルでログを作成します。ログからさらに情報を取得するため、ログレベルを `DEBUG` に設定することができます。

**注**: デバッグモードは、デバッグ目的のみにご使用ください。インデックス付きログの数が増加するため、Datadog では一定期間のみ `DEBUG` を有効にすることをおすすめしています。終了後は、ログレベルを `INFO` に戻します。

Agent のフルデバッグモードを有効にするには

1. ローカル `datadog.conf` ファイルを変更します。各 OS 固有の詳細については、[Agent の主な構成ファイル][1]をご参照ください。
2. `# log_level: INFO` を `log_level: DEBUG` に置き換えます (`#` を削除してコメントを解除します)。
3. Datadog Agent を再起動します。各 OS 固有の詳細については、[Agent コマンド][2]をご参照ください。
4. ログが生成されるまで数分待ちます。各 OS 固有の詳細については、[Agent ログファイル][3]をご参照ください。

## コンテナ化された Agent

Agent がコンテナ内で実行されている状態で `service datadog-agent restart` (または同様のコマンド) を実行すると、Docker によりコンテナが終了してしまうため Agent を再起動できません。コンテナ化された Agent を再起動するには、supervisor を使用してください。

```text
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
```

以下のコマンドでデバッグログを有効化し、Agent を再起動し、60 秒待機してからフレアを送信します (この順序で実行してください)。

```shell
sed -i '/\[Main\]/a LOG_LEVEL=DEBUG' /etc/dd-agent/datadog.conf
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
sleep 60
/etc/init.d/datadog-agent flare <CASE_ID>
```

デバッグログは次のコマンドで無効にできます。

```shell
sed -i '/LOG_LEVEL=DEBUG/d' /etc/dd-agent/datadog.conf
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
```

または、コンテナを再起動します。

## Agent のログレベル

`log_level` または `DD_LOG_LEVEL` には、以下の Agent ログレベルを使用可能です。

| オプション     | クリティカルログ | エラーログ | 警告ログ | 情報ログ | デバッグログ | トレースログ |
|------------|---------------|------------|-----------|-----------|------------|------------|
| `'OFF'`      |               |            |           |           |            |            |
| `'CRITICAL'` | {{< X >}}     |            |           |           |            |            |
| `'ERROR'`    | {{< X >}}     | {{< X >}}  |           |           |            |            |
| `'WARN'`     | {{< X >}}     | {{< X >}}  | {{< X >}} |           |            |            |
| `'INFO'`     | {{< X >}}     | {{< X >}}  | {{< X >}} | {{< X >}} |            |            |
| `'DEBUG'`    | {{< X >}}     | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  |            |
| `'TRACE'`    | {{< X >}}     | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  | {{< X >}}  |

**注**: 設定ファイルでログレベルを `'OFF'` に設定する場合は、値が正しく解析されるよう引用符が**必須**です。他のログレベルでは引用符は任意です。

[1]: /ja/agent/guide/agent-5-configuration-files/
[2]: /ja/agent/guide/agent-5-commands/
[3]: /ja/agent/guide/agent-5-log-files/