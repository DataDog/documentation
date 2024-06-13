---
aliases:
- /ja/agent/faq/how-to-get-more-logging-from-the-agent
- /ja/agent/faq/agent-5-container-more-log
further_reading:
- link: /agent/troubleshooting/send_a_flare/
  tag: Agent のトラブルシューティング
  text: Agent フレアの送信
- link: /agent/troubleshooting/agent_check_status/
  tag: Agent のトラブルシューティング
  text: Agent チェックのステータスを確認
title: デバッグモード
---

## Agent

Agent は、デフォルトで `INFO` レベルでログを作成します。ログからさらに情報を取得するため、ログレベルを `DEBUG` に設定することができます。

**注**: デバッグモードは、デバッグ目的のみにご使用ください。インデックス付きログの数が増加するため、Datadog では一定期間のみ `DEBUG` を有効にすることをおすすめしています。終了後は、ログレベルを `INFO` に戻します。

Agent のフルデバッグモードを有効にするには

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

1. ローカル `datadog.yaml` ファイルを変更します。各 OS 固有の詳細については、[Agent の主な構成ファイル][8]をご参照ください。

2. `# log_level: INFO` を `log_level: DEBUG` に置き換えます (`#` を削除してコメントを解除します)。

3. Datadog Agent を再起動します。各 OS 固有の詳細については、[Agent コマンド][2]をご参照ください。

4. ログが生成されるまで数分待ちます。各 OS 固有の詳細については、[Agent ログファイル][3]をご参照ください。

[1]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /ja/agent/configuration/agent-commands/#restart-the-agent
[3]: /ja/agent/configuration/agent-log-files/
{{% /tab %}}
{{% tab "Agent v5" %}}

1. ローカル `datadog.conf` ファイルを変更します。各 OS 固有の詳細については、[Agent の主な構成ファイル][1]をご参照ください。

2. `# log_level: INFO` を `log_level: DEBUG` に置き換えます (`#` を削除してコメントを解除します)。

3. Datadog Agent を再起動します。各 OS 固有の詳細については、[Agent コマンド][2]をご参照ください。

4. ログが生成されるまで数分待ちます。各 OS 固有の詳細については、[Agent ログファイル][3]をご参照ください。

[1]: /ja/agent/configuration/agent-configuration-files/?tab=agentv5#agent-main-configuration-file
[2]: /ja/agent/configuration/agent-commands/?tab=agentv5#restart-the-agent
[3]: /ja/agent/configuration/agent-log-files/?tab=agentv5
{{% /tab %}}
{{< /tabs >}}

## コンテナ化された Agent

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

コンテナ Agent でデバッグモードを有効にする場合は、Agent の起動時に `DD_LOG_LEVEL=debug` を使用してください。

Agent v6.19 / v7.19 以降の場合は、以下を使用してランタイム時の Agent のログレベルを設定します。

```shell
agent config set log_level debug
```

エージェントコンテナでのようにランタイムにトレースエージェントコンテナのログレベルを変更することは **できません**。`DD_LOG_LEVEL` 変数を `debug` に設定した後に、専用のトレースエージェントコンテナへの再デプロイメントが依然として必要です。

{{% /tab %}}
{{% tab "Agent v5" %}}

<mrk mid="68" mtype="seg">Agent がコンテナ内で実行されている場合、`service datadog-agent restart` (または同様のコマンド) では、Docker によってコンテナが強制終了されるため、Agent を再起動できません。</mrk><mrk mid="69" mtype="seg">コンテナ化 Agent を再起動するには、スーパーバイザーを使用します。</mrk>

```text
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
```

次のコマンドは、デバッグログを有効にし、次に Agent を再起動し、次に 60 秒待機し、最後にフレアを送信します。

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

{{% /tab %}}
{{< /tabs >}}

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

**注**: コンフィギュレーションファイルでログレベルを `'OFF'` に設定する場合、値が不適切に解析されないように引用符を使用します。他のログレベルでは、引用符はオプションです。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}