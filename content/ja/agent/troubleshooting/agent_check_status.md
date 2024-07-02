---
title: Agent Check Status
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: ドキュメント
  text: Agent Debug Mode
- link: /agent/troubleshooting/send_a_flare/
  tag: ドキュメント
  text: Send an Agent Flare
---

特定の Agent チェックで問題が発生している場合は、OS で次のコマンドを使用してトラブルシューティング情報を取得してください。

- [Linux](#linux)
- [Windows](#windows)
- [Systemd](#systemd)
- [参考文献](#further-reading)

**注**: 以下の例の `<CHECK_NAME>` を Agent チェックに置き換えます。例: `activemq`、`ceph`、または `elastic`。[インテグレーションのドキュメント][1]を確認して、Agent チェック名を確認します。

**注**: トラブルシューティング中に一時的にサービスチェックを無効にするには、`/conf.d/<CHECK_NAME>.d/conf.yaml` の名前を `.yaml` または `.yml` ファイル拡張子以外のもの、例えば `conf.yaml.disable` に変更します。

## Linux

Agent チェックをテストするには、次を実行します。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

```shell
sudo -u dd-agent datadog-agent check <チェック名>
```

レートメトリクスを含める場合は、コマンドに `--check-rate` を追加します。Agent v6.x の場合は、次を実行します。

```shell
sudo -u dd-agent datadog-agent check <チェック名> --check-rate
```

{{% /tab %}}
{{% tab "Agent v5" %}}

```shell
sudo -u dd-agent dd-agent check <チェック名>
```

`<CHECK_NAME>` を Agent チェックに置き換えます。例: `activemq`、`ceph`、または `elastic`。[インテグレーションのドキュメント][4]を確認して、Agent チェック名を確認します。

レートメトリクスを含める場合は、コマンドに `--check-rate` を追加します。Agent v6.x の場合は、次を実行します。

```shell
sudo -u dd-agent dd-agent check <チェック名> --check-rate
```

{{% /tab %}}
{{< /tabs >}}

問題が続く場合は、[フレア][2]で [Datadog のサポートチーム][1]にご連絡ください。

## Windows

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

**管理者特権** (管理者として実行) の PowerShell コマンドラインから、適切な `<CHECK_NAME>` を指定して、以下のスクリプトを実行します。

Agent バージョン >= 6.12 の場合

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" check <CHECK_NAME>
```

Agent バージョン < 6.11 の場合
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\agent.exe" check <CHECK_NAME>
```

{{% /tab %}}
{{% tab "Agent v<=5.11" %}}

<mrk mid="160" mtype="seg">Datadog Agent エージェントをインストールすると、`Program Files` ディレクトリに `shell.exe` ファイルが生成されます</mrk><mrk mid="161" mtype="seg">このファイルを使用して、Agent 環境内で Python を実行できます。</mrk><mrk mid="162" mtype="seg">チェック (名前 `&lt;CHECK_NAME&gt;`) が書き込まれ、正しい場所に `.py` ファイルと `.yaml` ファイルがある場合は、shell.exe で以下を実行します。</mrk>

```python
from checks import run_check
run_check('<チェック名>')
```

これで、このチェックが返したすべてのメトリクスまたはイベントが出力されます。

{{% /tab %}}
{{% tab "Agent v>=5.12" %}}

**管理者特権** (管理者として実行) の PowerShell コマンドラインから、適切な `<CHECK_NAME>` を指定して、以下のスクリプトを実行します。

`<INSTALL_DIR>/embedded/python.exe <INSTALL_DIR>agent/agent.py check <CHECK_NAME>`

たとえば、ディスクチェックを実行するには、次を実行します。

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" check disk
```

{{% /tab %}}
{{< /tabs >}}

## Systemd

[systemd を使用するシステム][3]では、`journalctl` を使用してデバッグをサポートできます。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}
次のコマンドは、Datadog Agent のステータスを表示します。

```shell
sudo systemctl status datadog-agent
```

<mrk mid="175" mtype="seg">Agent が起動に失敗し、詳細な情報が提供されない場合は、次のコマンドを使用して、Datadog Agent サービスのすべてのログを表示します。</mrk><mrk mid="176" mtype="seg">必要に応じて、`-r` を使用して逆順でログを出力します。</mrk>

```shell
sudo journalctl -u datadog-agent.service
```

{{% /tab %}}
{{% tab "Agent v5" %}}
次のコマンドは、Datadog Agent のステータスを表示します。

```shell
sudo systemctl status dd-agent
```

<mrk mid="175" mtype="seg">Agent が起動に失敗し、詳細な情報が提供されない場合は、次のコマンドを使用して、Datadog Agent サービスのすべてのログを表示します。</mrk><mrk mid="176" mtype="seg">必要に応じて、`-r` を使用して逆順でログを出力します。</mrk>

```shell
sudo journalctl -u dd-agent.service
```

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/
[2]: /agent/troubleshooting/send_a_flare/
[3]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md#service-lifecycle-commands
