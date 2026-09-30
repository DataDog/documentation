---
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: ドキュメント
  text: Agent デバッグモード
- link: /agent/troubleshooting/send_a_flare/
  tag: ドキュメント
  text: Agent フレアの送信
title: Agent チェックのトラブルシューティング
---

Agent チェックで問題が発生している場合は、次のコマンドを使用してトラブルシューティング情報を取得してください。

**注**: 以下の例の `<CHECK_NAME>` を Agent チェックに置き換えます。例: `activemq`、`ceph`、または `elastic`。[インテグレーションのドキュメント][1]を確認して、Agent チェック名を確認します。

**注**: トラブルシューティング中に一時的にサービスチェックを無効にするには、`/conf.d/<CHECK_NAME>.d/conf.yaml` の名前を `.yaml` または `.yml` ファイル拡張子以外のもの、例えば `conf.yaml.disable` に変更します。

## Linux

Agent チェックをテストするには、次を実行します。

```shell
sudo -u dd-agent datadog-agent check <チェック名>
```

レートメトリクスを含める場合は、コマンドに `--check-rate` を追加します。Agent v6.x の場合は、次を実行します。

```shell
sudo -u dd-agent datadog-agent check <チェック名> --check-rate
```

問題が続く場合は、[フレア][2]で [Datadog のサポートチーム][3]にご連絡ください。

## Windows

**管理者特権** (管理者として実行) の PowerShell コマンドラインから、適切な `<CHECK_NAME>` を指定して、以下のスクリプトを実行します。

Agent バージョン >= 6.12 の場合

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" check <CHECK_NAME>
```

Agent バージョン < 6.11 の場合
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\agent.exe" check <CHECK_NAME>
```

## Systemd

`systemd` を使用するシステムでは、`journalctl` を使用してデバッグをサポートできます。

次のコマンドは、Datadog Agent のステータスを表示します。

```shell
sudo systemctl status datadog-agent
```

<mrk mid="175" mtype="seg">Agent が起動に失敗し、詳細な情報が提供されない場合は、次のコマンドを使用して、Datadog Agent サービスのすべてのログを表示します。</mrk><mrk mid="176" mtype="seg">必要に応じて、`-r` を使用して逆順でログを出力します。</mrk>

```shell
sudo journalctl -u datadog-agent.service
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/
[2]: /ja/agent/troubleshooting/send_a_flare/
[3]: /ja/help