---
disable_toc: false
title: Agent 5 での Agent チェックのトラブルシューティング
---

このページでは、Agent 5 での Agent チェックのトラブルシューティングについて説明します。Agent の最新バージョンについては、[Agent チェックのトラブルシューティング][4]を参照してください。

Agent チェックで問題が発生している場合は、次のコマンドを使用してトラブルシューティング情報を取得してください。

**注**: 
- 以下の例の `<CHECK_NAME>` を Agent チェックに置き換えます。例: `activemq`、`ceph`、または `elastic`。[インテグレーションのドキュメント][1]を確認して、Agent チェック名を確認します。
- トラブルシューティング中に一時的にサービスチェックを無効にするには、`/conf.d/<CHECK_NAME>.d/conf.yaml` の名前を `.yaml` または `.yml` ファイル拡張子以外のもの、例えば `conf.yaml.disable` に変更します。

## Linux

Agent チェックをテストするには、次を実行します。

```shell
sudo -u dd-agent dd-agent check <チェック名>
```

`<CHECK_NAME>` を Agent チェックに置き換えます。例: `activemq`、`ceph`、または `elastic`。[インテグレーションのドキュメント][1]を確認して、Agent チェック名を確認します。

レートメトリクスを含める場合は、コマンドに `--check-rate` を追加します。Agent v6.x の場合は、次を実行します。

```shell
sudo -u dd-agent dd-agent check <チェック名> --check-rate
```

問題が続く場合は、[フレア][3]で [Datadog のサポートチーム][2]にご連絡ください。

## Windows

{{< tabs >}}
{{% tab "Agent v<=5.11" %}}

Agent をインストールすると、Datadog Agent  用の `Program Files` ディレクトリに `shell.exe` ファイルが生成されます。このファイルを使用して、Agent 環境内で Python を実行できます。チェック (名前 `<CHECK_NAME>`) が書き込まれ、正しい場所に `.py` ファイルと `.yaml` ファイルがある場合は、shell.exe で以下を実行します。

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

`systemd` を使用するシステムでは、`journalctl` を使用してデバッグをサポートできます。

次のコマンドは、Datadog Agent のステータスを表示します。

```shell
sudo systemctl status dd-agent
```

Agent が起動に失敗し、詳細な情報が提供されない場合は、次のコマンドを使用して、Datadog Agent サービスのすべてのログを表示します。必要に応じて、`-r` を使用して逆順でログを出力します。

```shell
sudo journalctl -u dd-agent.service
```

[1]: /ja/integrations/
[2]: /ja/help
[3]: /ja/agent/guide/agent-5-flare/
[4]: /ja/agent/troubleshooting/agent_check_status