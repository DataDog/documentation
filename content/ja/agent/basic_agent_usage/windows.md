---
algolia:
  tags:
  - install
  - installing
  - uninstall
  - uninstalling
  - windows
aliases:
- /ja/guides/basic_agent_usage/windows/
description: Windows プラットフォーム上の Datadog Agent の基本機能
further_reading:
- link: /logs/
  tag: Documentation
  text: ログの収集
- link: /infrastructure/process/
  tag: Documentation
  text: プロセスの収集
- link: /tracing/
  tag: Documentation
  text: トレースの収集
- link: /agent/basic_agent_usage/#agent-architecture
  tag: Documentation
  text: Agent のアーキテクチャを詳しく見る
- link: /agent/configuration/network#configure-ports
  tag: Documentation
  text: インバウンドポートの構成
- link: /agent/guide/windows-agent-ddagent-user
  tag: Documentation
  text: Datadog Windows Agent ユーザーについて
platform: Windows
title: Windows 用 Agent の基本的な使用方法
---

## 概要

このページでは、Windows 用 Datadog Agent の基本機能を説明します。Agent をまだインストールしていない場合は、以下のインストール手順を参照するか、[アプリ内の指示に従ってください][1]。

See [Supported Platforms][15] for the complete list of supported Linux distributions and versions.

## インストール

To install the Datadog Agent on your Windows hosts, follow the [guided in-app flow within Fleet Automation][16], then copy and run the installation command. The Datadog Agents run under the `ddagentuser`. See [Datadog Windows Agent User][17] documentation for more information. 


{{< img src="/agent/basic_agent_usage/windows_img2_july_25.png" alt="In-app installation steps for the Datadog Agent on a Windows host." style="width:90%;">}}


## Alternative installation methods

### Install with the Agent Manager GUI

<div class="alert alert-info">Agent のデフォルトのインストール先は <code>%ProgramFiles%\Datadog\Datadog Agent</code> です。カスタムのインストール先を使用する場合は、必ず Datadog ファイル用の <code>Datadog</code> サブディレクトリを指定してください。</div>

1. Download the [Datadog Agent installer][400] to install the latest version of the Agent.
2. `datadog-agent-7-latest.amd64.msi` を開いてインストーラーを実行します。プロンプトが表示されたら、管理者資格情報を入力します。
3. Follow the prompts, accept the license agreement, and enter your [Datadog API key][500].

インストールが終了したら、オプションから Datadog Agent Manager を起動できます。


#### インストール構成オプション

Windows に Agent をインストールする際、以下の各構成オプションをコマンドラインのプロパティとして追加することができます。その他の Agent 構成オプションについては、[その他の Agent 構成オプション](#more-agent-configuration-options)を参照してください。 


| 変数                                    | タイプ    | Description                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APIKEY`                                    | 文字列  | Datadog API キーを構成ファイルに追加します。                                                                                                                                                                                 |
| `SITE`   | 文字列  | Set the Datadog intake site, for example: `SITE=datadoghq.com`     |
| `TAGS`                                      | 文字列  | 構成ファイル内で割り当てるタグのカンマ区切りリスト。例: `TAGS="key_1:val_1,key_2:val_2"`                                                                                                                         |
| `HOSTNAME`                                  | 文字列  | Agent から Datadog に報告されるホスト名を設定します (実行時に計算されたホスト名を上書きします)。                                                                                                                            |
| `DDAGENTUSER_NAME`                          | 文字列  | Agent インストール時に使用されるデフォルトの `ddagentuser` ユーザー名を上書きします _(v6.11.0 以降)_。[Datadog Windows Agent ユーザーについては、こちらを参照してください][3]。                                                                                      |
| `DDAGENTUSER_PASSWORD`                      | 文字列  | Agent インストール時に `ddagentuser` ユーザー用に生成された暗号論的に安全なパスワードを上書きします _(v6.11.0 以降)_。ドメインサーバー上のインストールにはこれを提供する必要があります。[Datadog Windows Agent ユーザーについては、こちらを参照してください][3]。  |
| `APPLICATIONDATADIRECTORY`                  | パス    | 構成ファイルのディレクトリツリーに使用するディレクトリを上書きします。初期インストール時にのみ提供でき、アップグレードでは無効です。デフォルト: `C:\ProgramData\Datadog` _(v6.11.0 以降)_                                           |
| `PROJECTLOCATION`                           | パス    | バイナリファイルのディレクトリツリーに使用するディレクトリを上書きします。初期インストール時にのみ提供でき、アップグレードでは無効です。デフォルト: `%ProgramFiles%\Datadog\Datadog Agent` _(v6.11.0 以降)_<br><br>デフォルトのディレクトリをオーバーライドする場合は、Datadog ファイル用の `Datadog` サブディレクトリを必ず指定してください。                                    |

**注**

- `/qn` オプションはバックグラウンドインストールを実行します。GUI プロンプトを表示する場合は、削除してください。
- Agent のバージョンによっては、強制的に再起動する場合があります。これを防ぐには、パラメーター `REBOOT=ReallySuppress` を追加します。
- Agent コンポーネントの中には、データを収集するためにカーネルドライバーを必要とするものがあります。お使いのコンポーネントにカーネルドライバーが必要かどうかは、そのコンポーネントのドキュメントページを参照するか、関連する Agent コンフィギュレーションファイルで `kernel driver` を検索してください。
- 有効な `datadog.yaml` が見つかった場合は、そのファイルが、指定されているすべてのコマンドラインオプションより優先されます。

#### その他の Agent 構成オプション

Windows に Agent をインストールする際、以下の各構成オプションをコマンドラインのプロパティとして追加することができます。

**注**: 有効な `datadog.yaml` が見つかった場合は、そのファイルが、指定されているすべてのコマンドラインオプションより優先されます。


| 変数                                    | タイプ    | Description                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `LOGS_ENABLED`                              | 文字列  | 構成ファイルで、ログ収集機能を有効 (`"true"`) または無効 (`"false"`) にします。デフォルトでは、ログは無効です。                                                                                                        |
| `APM_ENABLED`                               | 文字列  | 構成ファイルで、APM Agent を有効 (`"true"`) または無効 (`"false"`) にします。デフォルトでは、APM は有効です。                                                                                                                        |
| `PROCESS_ENABLED`                           | 文字列  | 構成ファイルで、Process Agent を有効 (`"true"`) または無効 (`"false"`) にします。デフォルトでは、Process Agent は無効です。                                                                                                     |
| `HOSTNAME_FQDN_ENABLED`                     | 文字列  | Agent のホスト名に対する FQDN の使用を有効 (`"true"`) または無効 (`"false"`) にします。これは、Agent コンフィギュレーションファイルの `hostname_fqdn` を設定することと同等です。ホスト名の FQDN の使用は、デフォルトでは無効になっています。_(v6.20.0+)_ |
| `CMD_PORT`                                  | 数値  | 0 から 65534 までの有効なポート番号。Datadog Agent はコマンド API をポート 5001 で公開します。このポートが既に別のプログラムで使用されている場合は、この変数でデフォルトを上書きできます。                                               |
| `PROXY_HOST`                                | 文字列  | プロキシを使っている場合は、プロキシホストを設定します。[Datadog Agent でのプロキシの使用についてさらに詳しく][4]。                                                                                                                                 |
| `PROXY_PORT`                                | 数値  | プロキシを使っている場合は、プロキシポートを設定します。[Datadog Agent でのプロキシの使用についてさらに詳しく][4]。                                                                                                                                 |
| `PROXY_USER`                                | 文字列  | (プロキシを使っている場合) プロキシユーザーを設定します。[Datadog Agent でのプロキシの使用についてさらに詳しく][4]。                                                                                                                                 |
| `PROXY_PASSWORD`                            | 文字列  | (プロキシを使っている場合) プロキシパスワードを設定します。プロセス/コンテナ Agent の場合は、認証パスワードの受け渡しのためにこの変数は必須で、名前を変えることはできません。[Datadog Agent でのプロキシの使用についてさらに詳しく][4]。 |
| `EC2_USE_WINDOWS_PREFIX_DETECTION`          | Boolean | EC2 上の Windows ホストの EC2 インスタンス ID を使用します。_(v7.28.0+)_                                            |

#### インストールログファイル

インストール ログ ファイルを指定するには、msiexec の `/log <FILENAME>` オプションを使用します。 このオプションを指定しない場合、msiexec は既定で `%TEMP%\MSI*.LOG` にログを書き込みます。


## 設定

The main Agent configuration file is located at
`C:\ProgramData\Datadog\datadog.yaml`. This file is used for host-wide settings such as the API key, selected Datadog site, proxy parameters, host tags, and log level. 

There is also a `datadog.yaml.example` file in the same directory, which is a fully commented reference with all available configuration options, useful for reference and copying specific settings. 


Configuration files for integrations are in:
`C:\ProgramData\Datadog\conf.d\` There may also be an alternative legacy location: `C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`.

Each integration has a subdirectory `<INTEGRATION>.d\` that contains:
- `conf.yaml`: The active settings for the integration
* `conf.yaml.example`: A sample file showing what configuration keys are supported 

When making configuration changes, be sure to restart the Agent to ensure the changes take effect.

The [Datadog Agent Manager GUI][6] can be used to enable, disable, and configure checks. You must restart the Agent for your changes to take effect.

**注**: `ProgramData` は隠しフォルダーです。

## Agent のコマンド

Agent の実行は、Windows サービスコントロールマネージャーによって制御されます。

* The main executable name is `agent.exe`. 
* 構成 GUI は、ブラウザベースの構成アプリケーションです (Windows 64 ビット版のみ)。
* Commands can be run from the **elevated (run as Admin)** command line (PowerShell or Command Prompt) using the syntax `<PATH_TO_AGENT.EXE> <COMMAND>`.
* コマンドラインのオプションは次の通りです。

| コマンド         | Description                                                                      |
|-----------------|----------------------------------------------------------------------------------|
| check           | 指定されたチェックを実行します。                                                        |
| diagnose        | システムに対して接続診断を実行します。                             |
| flare           | フレアを収集して Datadog に送信します。                                         |
| help            | コマンドのヘルプを表示します。                                                     |
| hostname        | Agent が使用するホスト名を出力します。                                           |
| import          | 以前のバージョンの Agent から構成ファイルをインポートして変換します。    |
| launch-gui      | Datadog Agent Manager を起動します。                                                |
| restart-service | サービスコントロールマネージャー内で Agent を再起動します。                           |
| run             | Agent を起動します。                                                                |
| start           | Agent を起動します。(非推奨ですが、受け付けられます。代わりに `run` を使用してください。) |
| start-service   | サービスコントロールマネージャー内で Agent を起動します。                             |
| status          | 現在のステータスを出力します。                                                        |
| stopservice     | サービスコントロールマネージャー内で Agent を停止します。                              |
| version         | バージョン情報を出力します。                                                         |

**例**:
  - PowerShell (`powershell.exe`)

    ```powershell
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

  - コマンドプロンプト (`cmd.exe`)

    ```cmd
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

## Agent のアンインストール

Windows で Agent をアンインストールするには、2 つの異なる方法があります。どちらの方法でも Agent は削除されますが、ホスト上の `C:\ProgramData\Datadog` 構成フォルダは削除されません。

### プログラムの追加と削除

1. **CTRL** キーと **Esc** キーを押すか、Windows キーで Windows Search を実行します。
1. `add` を検索し、**Add or remove programs** をクリックします。
1. `Datadog Agent` を検索し、**Uninstall** をクリックします。

### PowerShell

**注:** 以下のコマンドを使用する場合は、WinRM を有効にしてください。

以下の PowerShell コマンドを使用して、再起動せずに Agent をアンインストールします。

{{< code-block lang="powershell" >}}
$productCode = (@(Get-ChildItem -Path "HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" -Recurse) | Where {$_.GetValue("DisplayName") -like "Datadog Agent" }).PSChildName
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/q', '/x', "$productCode", 'REBOOT=ReallySuppress')
{{< /code-block >}}

## トラブルシューティング

For troubleshooting steps, see the [Agent Troubleshooting documentation][18] .


### Agent のステータスと情報

Agent が実行されていることを確認するには、サービスパネルで `DatadogAgent` サービスが "Started" になっているかどうかをチェックします。また、Datadog Metrics Agent (`agent.exe`) というプロセスがタスクマネージャーに存在している必要があります。

Agent の状態に関する詳細な情報が必要な場合は、次のようにして Datadog Agent Manager を起動します。

* Datadog Agent のシステムトレイアイコンを右クリックし、"構成" を選択します。
* **管理者特権 (管理者として実行)**のコマンドラインから `launch-gui` コマンドを実行
    - PowerShell: `& "<PATH_TO_AGENT.EXE>" launch-gui`
    - cmd: `"<PATH_TO_AGENT.EXE>" launch-gui`

次に、Status -> General と移動して、ステータスページを開きます。
Status -> Collector および Checks -> Summary で、チェックの実行に関する詳細な情報を取得します。

PowerShell では、次の status コマンドを使用できます。

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
```

cmd.exe では、次のようにします。

```cmd
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
```

### ログの場所

Agent のログは `C:\ProgramData\Datadog\logs\agent.log` にあります。

**注**: `ProgramData` は隠しフォルダーです。

## ユースケース

###  Windows サービスの監視

ターゲットホスト上で Datadog Agent Manager を起動し、リストから "Windows Service" インテグレーションを選択します。すぐに使用できるサンプルもありますが、この例では DHCP を使用します。

サービスの名前を確認するために、`services.msc` を開き、目的のサービスを見つけます。ターゲットとして DHCP を選択すると、次のように、サービスのプロパティウィンドウの上部にサービス名が表示されます。

{{< img src="agent/faq/DHCP.png" alt="DHCP" style="width:75%;">}}

独自のサービスを追加する場合は、次に示す書式に厳密に従ってください。書式が正しくないと、インテグレーションが失敗します。**注**: サービス名の特殊文字はエスケープする必要があります。たとえば、`MSSQL$BILLING` という名前の場合、`MSSQL\$BILLING` のように特殊文字を追加します。

{{< img src="agent/faq/windows_DHCP_service.png" alt="Windows DHCP サービス" style="width:75%;">}}

また、インテグレーションを変更するたびに、Datadog サービスを再起動する必要があります。これは、services.msc または UI のサイドバーから行うことができます。

サービスの場合、Datadog が追跡するのはアベイラビリティのみで、メトリクスは追跡されません (メトリクスについては、[プロセス](#monitoring-windows-processes)または [WMI][7] インテグレーションを使います)。モニターをセットアップするには、[インテグレーションモニタータイプ][8]を選択し、続いて **Windows Service** を検索します。*Integration Status -> Pick Monitor Scope* から、モニターしたいサービスを選びます。

### Windows のシステム負荷の監視

Datadog Agent は、デフォルトで多数のシステムメトリクスを収集します。最も一般的に使用されるシステムメトリクスは `system.load.*` ですが、これらのメトリクスは **Unix** 固有です。

Windows は `system.load.*` メトリクスを提供していませんが、デフォルトで使用できる同等のオプションは `system.proc.queue.length` です。このメトリクスは、実行を待機しているプロセッサーレディキューで遅延として観察されたスレッドの数を示します。

### Windows プロセスの監視

[ライブプロセスモニタリング][9]で Windows プロセスをモニターすることができます。これを Windows で有効にするには、次のパラメーターを真に設定することで [Agent のメイン構成ファイル][10]を編集します:

`datadog.yaml`:

```yaml
process_config:
  enabled: "true"
```

構成が完了したら、[Agent を再起動][11]します。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[2]: /ja/agent/supported_platforms/?tab=windows
[3]: /ja/agent/faq/windows-agent-ddagent-user/
[4]: /ja/agent/configuration/proxy/
[5]: /ja/network_monitoring/cloud_network_monitoring
[6]: /ja/agent/guide/datadog-agent-manager-windows/
[7]: /ja/integrations/wmi_check/
[8]: https://app.datadoghq.com/monitors/create/integration
[9]: /ja/infrastructure/process/?tab=linuxwindows#installation
[10]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[11]: /ja/agent/configuration/agent-commands/#restart-the-agent
[12]: http://127.0.0.1:5002
[13]: /ja/agent/guide/python-3/
[14]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe
[15]: https://docs.datadoghq.com/ja/agent/supported_platforms/?tab=linux
[16]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[17]: /ja/agent/faq/windows-agent-ddagent-user/
[18]: https://docs.datadoghq.com/ja/agent/troubleshooting/
[400]: https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi
[500]: https://app.datadoghq.com/organization-settings/api-keys