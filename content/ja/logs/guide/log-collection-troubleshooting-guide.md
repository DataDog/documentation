---
aliases:
- /ja/logs/faq/log-collection-troubleshooting-guide
further_reading:
- link: /logs/log_collection/
  tag: Documentation
  text: ログの収集方法
- link: /logs/explorer/
  tag: Documentation
  text: ログの調査方法
- link: /logs/guide//logs-not-showing-expected-timestamp/
  tag: ガイド
  text: あるはずのタイムスタンプがログに含まれないのはなぜですか
- link: /logs/guide/logs-show-info-status-for-warnings-or-errors/
  tag: ガイド
  text: 警告またはエラーのログが Info ステータスで表示されるのはなぜですか
kind: ガイド
title: ログ収集のトラブルシューティングガイド
---

`dd-agent` でログコレクターから[新しいログを Datadog に送信][1]する際に、よく障害となる問題がいくつかあります。新しいログを Datadog に送信する際に問題が発生した場合は、このページに挙げられたトラブルシューティングをお役立てください。それでも問題が解決しない場合は、[ Datadog サポート][2]までお問い合わせください。

## Agent を再起動します。

`datadog-agent` のコンフィギュレーションに加えられた変更は、[Agent を再起動][3]した後に反映されます。

## ポート 10516 のアウトバウンドトラフィックがブロックされる

Datadog Agent は、ポート 10516 を使って TCP で Datadog にログを送信します。この接続が使用できない場合、ログは送信に失敗し、それを示すエラーが `agent.log` ファイルに記録されます。

OpenSSL、GnuTLS、または他の SSL/TLS クライアントを使用して、接続を手動でテストすることができます。OpenSSL の場合は、以下のコマンドを実行します。

```shell
openssl s_client -connect intake.logs.datadoghq.com:10516
```

GnuTLS の場合、以下のコマンドを実行します。

```shell
gnutls-cli intake.logs.datadoghq.com:10516
```

さらに、次のようなログを送信します。

```text
<API_KEY> これはテストメッセージです
```

- ポート 10516 を開くことを選択できない場合は、`datadog.yaml` に次の設定を追加して、Datadog Agent がログを転送するよう構成することができます。

```yaml
logs_config:
  force_use_http: true
```

詳細については、[HTTPS ログ転送セクション][4]をご参照ください。

## Agent のステータスをチェック

[Agent のステータスコマンド][5]をチェックすることが、問題の解決に役立つことがあります。

## 新しいログが書き込まれていない

Datadog Agent は、ログの収集 (ログの追跡またはリスニング) を開始して以降に書き込まれたログのみを収集します。ログ収集が適切にセットアップされているかどうかを確認する場合は、まず新しいログが書き込まれていることを確認してください。

## ログファイル追跡のアクセス許可の問題

Datadog Agent は、ルートとして実行されません (一般的なベストプラクティスとして、ルートとして実行することは推奨されません)。カスタムログやインテグレーション用のログファイルを追跡するように Agent を構成する場合、Agent のユーザーがログファイルへの正しいアクセス権を持っていることを確認するために、特別な注意を払う必要があります。

オペレーティングシステムごとのデフォルトの Agent ユーザー:
| オペレーティングシステム | デフォルトの Agent ユーザー |
| ---------------  | ------------------ |
| Linux | `datadog-agent` |
| MacOS | `datadog-agent` |
| Windows | `ddagentuser` |

Agent に正しい権限がない場合、[Agent のステータス][5]を確認すると、以下のエラーメッセージのいずれかが表示される場合があります。
- The file does not exist. (ファイルが存在しません。)
- Access is denied. (アクセスが拒否されました。)
- Could not find any file matching pattern `<path/to/filename>`, check that all its subdirectories are executable. (パターン `<path/to/filename>` に一致するファイルが見つかりませんでした。そのサブディレクトリがすべて実行可能かどうか確認してください。)

エラーを修正するには、Datadog Agent ユーザーにログファイルおよびサブディレクトリへの読み取りおよび実行権限を与えます。

{{< tabs >}}
{{% tab "Linux" %}}
1. ファイルアクセス許可の詳細情報を取得するには、`namei` コマンドを実行します。
   ```
   > namei -m /path/to/log/file
   ```

   次の例では、Agent ユーザーは `application` ディレクトリに対する `execute` 権限、または `error.log` ファイルに対する読み取り権限を持っていません。

   ```
   > namei -m /var/log/application/error.log
   > f: /var/log/application/
   drwxr-xr-x /
   drwxr-xr-x var
   drwxrwxr-x log
   drw-r--r-- application
   -rw-r----- error.log
   ```

1. ログフォルダとその子フォルダを読み取り可能にします。

   ```bash
   sudo chmod o+rx /path/to/logs
   ```

**注**: これらの権限は、ログローテーション構成で正しく設定されていることを確認してください。そうしないと、次のログローテーション時に、Datadog Agent の読み取り権限が失われる可能性があります。Agent がファイルへの読み取りアクセス権を持つように、ログローテーション構成で権限を `644` として設定します。

{{% /tab %}}

{{% tab "Windows (cmd)" %}}
1. ファイルの権限についてのより詳しい情報を得るには、ログフォルダ上で `icacls` コマンドを使用します。
   ```
   icacls path/to/logs/file /t
   ```
   `/t` フラグは、ファイルとサブフォルダに対して再帰的にコマンドを実行します。

   以下の例では、`test` ディレクトリとその子ディレクトリは `ddagentuser` からはアクセスできないようになっています。

   ```powershell
   PS C:\Users\Administrator> icacls C:\test\ /t
   C:\test\ NT AUTHORITY\SYSTEM:(OI)(CI)(F)
          BUILTIN\Administrators:(OI)(CI)(F)
          CREATOR OWNER:(OI)(CI)(IO)(F)

   C:\test\file.log NT AUTHORITY\SYSTEM:(F)
          BUILTIN\Administrators:(F)

   C:\test\file2.log NT AUTHORITY\SYSTEM:(F)
          BUILTIN\Administrators:(F)
   ```

1. `icacls` コマンドを使用して、`ddagentuser` に必要な権限を与えます (引用符を含めてください)。
   ```
   icacls "path\to\folder" /grant "ddagentuser:(OI)(CI)(RX)" /t
   ```

   アプリケーションがログローテーションを使用する場合、`(OI)` と `(CI)` の継承権は、今後ディレクトリに作成されるログファイルが親フォルダの権限を継承することを確実にします。

1. もう一度 `icacls` を実行して、`ddagentuser` が正しい権限を持っていることを確認します。
   ```powershell
   icacls path/to/logs/file /t
   ```

   以下の例では、ファイルの権限に `ddagentuser` が記載されています。
   ```powershell
   PS C:\Users\Administrator> icacls C:\test\ /t
   C:\test\ EC2-ABCD\ddagentuser:(OI)(CI)(RX)
          NT AUTHORITY\SYSTEM:(OI)(CI)(F)
          BUILTIN\Administrators:(OI)(CI)(F)
          CREATOR OWNER:(OI)(CI)(IO)(F)

   C:\test\file.log NT AUTHORITY\SYSTEM:(F)
                  BUILTIN\Administrators:(F)
                  EC2-ABCD\ddagentuser:(RX)

   C:\test\file2.log NT AUTHORITY\SYSTEM:(F)
                  BUILTIN\Administrators:(F)
                  EC2-ABCD\ddagentuser:(RX)
   Successfully processed 3 files; Failed processing 0 files
   ```

1. Agent サービスを再起動し、ステータスを確認し、問題が解決しているかどうかを確認します。

   ```powershell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" restart-service
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
   ```

{{% /tab %}}

{{% tab "Windows (PowerShell)" %}}

1. ファイルの ACL 権限を取得します。
   ```powershell
   PS C:\Users\Administrator> get-acl C:\app\logs | fl

   Path   : Microsoft.PowerShell.Core\FileSystem::C:\app\logs
   Owner  : BUILTIN\Administrators
   Group  : EC2-ABCD\None
   Access : NT AUTHORITY\SYSTEM Allow  FullControl
            BUILTIN\Administrators Allow  FullControl
   ...
   ```
   この例では、`application` ディレクトリは Agent によって実行可能ではありません。

1. この PowerShell スクリプトを実行し、`ddagentuser` に読み取り権限と実行権限を与えます。
   ```powershell
   $acl = Get-Acl <path\to\logs\folder>
   $AccessRule = New-Object System.Security.AccessControl.FileSystemAccessRule("ddagentuser","ReadAndExecute","Allow")
   $acl.SetAccessRule($AccessRule)
   $acl | Set-Acl <path\to\logs\folder>
   ```

1. ファイルの ACL 権限を再度取得し、`ddagentuser` が正しい権限を持っているかどうかを確認します。
   ```powershell
   PS C:\Users\Administrator> get-acl C:\app\logs | fl
   Path   : Microsoft.PowerShell.Core\FileSystem::C:\app\logs
   Owner  : BUILTIN\Administrators
   Group  : EC2-ABCD\None
   Access : EC2-ABCD\ddagentuser Allow  ReadAndExecute, Synchronize
            NT AUTHORITY\SYSTEM Allow  FullControl
            BUILTIN\Administrators Allow  FullControl
   ...
   ```

1. Agent サービスを再起動し、ステータスを確認し、問題が解決しているかどうかを確認します。
   ```powershell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" restart-service
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
   ```


{{% /tab %}}

{{< /tabs >}}

## アクセス許可の問題と Journald

Journald からログを収集する場合は、[Journald インテグレーション][7]で説明されているように、Datadog Agent ユーザーが systemd グループに追加されている必要があります。

**注**: ファイルアクセス許可が正しくなければ、Journald は空のペイロードを送信します。そのため、この場合は、明示的なエラーメッセージを表示および送信することはできません。

## 構成上の問題

以下に挙げる一般的な構成上の問題は、`datadog-agent` セットアップで何重にもチェックすることをお勧めします。

1. `datadog.yaml` で `api_key` が定義されているかをチェックします。

2. `datadog.yaml` で `logs_enabled: true` が設定されているかをチェックします。

3. デフォルトでは、Agent はログを収集しません。Agent の `conf.d/` ディレクトリに、logs セクションと適切な値が含まれた .yaml ファイルが少なくとも 1 つあることを確認します。

4. 構成ファイルで何らかの .yaml パースエラーが発生することがあります。YAML には細かな注意が必要なため、疑わしい場合は、[YAML 検証ツール][8]を使用してください。

### Agent ログ内のエラーのチェック

問題について記述されたエラーがログに含まれている場合があります。次のコマンドを実行して、このようなエラーをチェックします。

```shell
sudo grep -i error /var/log/datadog/agent.log
```

## Docker 環境

[Docker ログ収集のトラブルシューティングガイド][9]をご参照ください

## サーバーレス環境

[Lambda ログ収集のトラブルシューティングガイド][10]をご参照ください

## 予期せぬログの欠落

[Datadog Live Tail][11] にログが表示されるか確認します。

Live Tail に表示される場合は、インデックス構成ページで、ログと一致する [除外フィルター][12]がないか確認してください。
Live Tail に表示されない場合、タイムスタンプが 18 時間以上過去のものであれば、ドロップされた可能性があります。`datadog.estimated_usage.logs.drop_count` メトリクスで、どの `service` と `source` が影響を受けているかを確認できます。

## ログの切り捨て

1MB を超えるログは切り捨てられます。どの `service` と `source` が影響を受けているかは `datadog.estimated_usage.logs.truncated_count` と `datadog.estimated_usage.logs.truncated_bytes` メトリクスで確認できます。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/
[2]: /ja/help/
[3]: /ja/agent/configuration/agent-commands/#restart-the-agent
[4]: /ja/agent/logs/log_transport?tab=https#enforce-a-specific-transport
[5]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[7]: /ja/integrations/journald/
[8]: https://codebeautify.org/yaml-validator
[9]: /ja/logs/guide/docker-logs-collection-troubleshooting-guide/
[10]: /ja/logs/guide/lambda-logs-collection-troubleshooting-guide/
[11]: https://app.datadoghq.com/logs/livetail
[12]: /ja/logs/indexes/#exclusion-filters