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
  text: Learn more about the Datadog Windows Agent User
platform: Windows
title: Windows 用 Agent の基本的な使用方法
---

## 概要

This page outlines the basic features of the Datadog Agent for Windows. If you haven't installed the Agent yet, see the installation instructions below or [follow the instructions in the app][1].

## Agent のインストール

### 要件

- **Windows version**: Windows Server 2016 or later, or Windows 10 or later. See the Agent Supported Platforms documentation for [supported OS versions][2].
- **Datadog account**: Ensure you have access to a Datadog account and have your Datadog API key.
- **Administrator privileges**: Administrator access is required on the Windows machine.

{{< tabs >}}
{{% tab "Standard installation" %}}

The core and APM/trace components of the Windows Agent run under the `ddagentuser` account. The Live Processes component, if enabled, runs under the `LOCAL_SYSTEM` account. Learn more about the [Datadog Windows Agent User][3].

### Install with the GUI

1. Download the [Datadog Agent installer][4] to install the latest version of the Agent.
2. `datadog-agent-7-latest.amd64.msi` を開いてインストーラーを実行します。プロンプトが表示されたら、管理者資格情報を入力します。
3. Follow the prompts, accept the license agreement, and enter your [Datadog API key][5].

インストールが終了したら、オプションから Datadog Agent Manager を起動できます。

### Install with the command line

1. Open PowerShell with **Administrator** privileges.
2. Run the following command to install the Datadog Agent:
    ```powershell
    Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-agent-7-latest.amd64.msi APIKEY="<YOUR_DATADOG_API_KEY>"'
    ```

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: /ja/agent/supported_platforms/?tab=windows
[3]: /ja/agent/faq/windows-agent-ddagent-user/
[4]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi
[5]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "Installation in Active Directory Domains" %}}

When deploying the Datadog Agent in an Active Directory environment, Datadog recommends using a Group Managed Service Account (gMSA).

Using gMSA can enhance security and simplify management. Some of the benefits include:
- Deployment across multiple servers: Unlike traditional Managed Service Accounts (MSAs) or standalone Managed Service Accounts (sMSAs), gMSAs can be deployed across multiple servers.
- Automated password management: The passwords for gMSAs are handled at the operating system level, and are rotated on a regular basis without requiring manual intervention. 

When running with a gMSA, the core and APM/trace components of the Windows Agent run under the configured account. The Live Processes component, if enabled, runs under the `LOCAL_SYSTEM` account. Learn more about the [Datadog Windows Agent User][3].

### 前提条件

- An Active Directory environment
- Permission to create and manage gMSAs
- See further [requirements in the Microsoft documentation][4].

**Note**: For a comprehensive understanding of setting up gMSAs, see [Microsoft's Group Managed Service Accounts Overview][5].

### Create and configure a gMSA

1. Create a Security Group:
   1. Open **Active Directory Users and Computers (ADUC)**.
   2. Navigate to the appropriate **Organizational Unit (OU)**.
   3. Right-click and select **New** > **Group**.
   4. Name the group. For example, `DatadogAgentsGroup`.
   5. Set the correct group scope for your organization. For example, **Domain local**.
   6. Set the type to **Security**.


2. Create the gMSA:
   1. Open PowerShell with **Administrator** privileges.
   2. Run the following command to create the gMSA, replacing `<YOUR_DOMAIN_NAME>` with your domain name:
        ```powershell
        New-ADServiceAccount -Name DatadogGMSA -DNSHostName <YOUR_DOMAIN_NAME> -PrincipalsAllowedToRetrieveManagedPassword DatadogAgentsGroup
        ```


3. Verify that the gMSA can be used on the target machine:

   1. Ensure the target machine is part of the `DatadogAgentsGroup`.
   2. On the target machine, open PowerShell and run:
        ```powerhsell
        Install-ADServiceAccount -Identity DatadogGMSA
        ```
      Ensure the command ran without errors.

### Agent のインストール

   <div class="alert alert-info">If you need to install a specific version of the Agent, see the <a href="https://ddagent-windows-stable.s3.amazonaws.com/installers_v2.json">installer list</a>.</div>

#### Install via the GUI

1. [Datadog Agent インストーラー][1]をダウンロードし、最新バージョンの Agent をインストールします。
2. `datadog-agent-7-latest.amd64.msi` を開いてインストーラーを実行します。プロンプトが表示されたら、管理者資格情報を入力します。
3. プロンプトに従ってライセンス契約に同意し、[Datadog API キー][2]を入力します。
4. When prompted for the "Datadog Agent User Account", enter the username of the gMSA. For example, `<YOUR_DOMAIN_NAME>\DatadogGMSA$` and **no password**.
インストールが終了したら、オプションから Datadog Agent Manager を起動できます。

#### Install with the command line

1. Open PowerShell with **Administrator** privileges.
2. Run the following command to install the Datadog Agent:

**Note:** Replace `DatadogGMSA$` with the username of your gMSA. The username **must end with a $ symbol.**
  ```powershell
  Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-agent-7-latest.amd64.msi APIKEY="<YOUR_DATADOG_API_KEY>" DDAGENTUSER_NAME="<YOUR_DOMAIN_NAME>\DatadogGMSA$'
  ```

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: /ja/agent/supported_platforms/?tab=windows
[3]: /ja/agent/faq/windows-agent-ddagent-user/
[4]: https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/group-managed-service-accounts-overview#software-requirements
[5]: https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/getting-started-with-group-managed-service-accounts

{{% /tab %}}
{{< /tabs >}}

#### Installation configuration options 

Windows に Agent をインストールする際、以下の各構成オプションをコマンドラインのプロパティとして追加することができます。その他の Agent 構成オプションについては、[その他の Agent 構成オプション](#more-agent-configuration-options)を参照してください。 


| 変数                                    | タイプ    | 説明                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APIKEY`                                    | 文字列  | Datadog API キーを構成ファイルに追加します。                                                                                                                                                                                 |
| `SITE`                                      | 文字列  | Datadog インテークサイトを設定します。例: `SITE=`{{< region-param key="dd_site" code="true" >}}                                                                                                                                     |
| `TAGS`                                      | 文字列  | 構成ファイル内で割り当てるタグのカンマ区切りリスト。例: `TAGS="key_1:val_1,key_2:val_2"`                                                                                                                         |
| `HOSTNAME`                                  | 文字列  | Agent から Datadog に報告されるホスト名を設定します (実行時に計算されたホスト名を上書きします)。                                                                                                                            |
| `DDAGENTUSER_NAME`                          | 文字列  | Agent インストール時に使用されるデフォルトの `ddagentuser` ユーザー名を上書きします _(v6.11.0 以降)_。[Datadog Windows Agent ユーザーについては、こちらを参照してください][3]。                                                                                      |
| `DDAGENTUSER_PASSWORD`                      | 文字列  | Agent インストール時に `ddagentuser` ユーザー用に生成された暗号論的に安全なパスワードを上書きします _(v6.11.0 以降)_。ドメインサーバー上のインストールにはこれを提供する必要があります。[Datadog Windows Agent ユーザーについては、こちらを参照してください][3]。  |
| `APPLICATIONDATADIRECTORY`                  | パス    | 構成ファイルのディレクトリツリーに使用するディレクトリを上書きします。初期インストール時にのみ提供でき、アップグレードでは無効です。デフォルト: `C:\ProgramData\Datadog` _(v6.11.0 以降)_                                           |
| `PROJECTLOCATION`                           | パス    | バイナリファイルのディレクトリツリーに使用するディレクトリを上書きします。初期インストール時にのみ提供でき、アップグレードでは無効です。デフォルト: `%ProgramFiles%\Datadog\Datadog Agent` _(v6.11.0 以降)_                                    |

**注**

- `/qn` オプションはバックグラウンドインストールを実行します。GUI プロンプトを表示する場合は、削除してください。
- Agent のバージョンによっては、強制的に再起動する場合があります。これを防ぐには、パラメーター `REBOOT=ReallySuppress` を追加します。
- Agent コンポーネントの中には、データを収集するためにカーネルドライバーを必要とするものがあります。お使いのコンポーネントにカーネルドライバーが必要かどうかは、そのコンポーネントのドキュメントページを参照するか、関連する Agent コンフィギュレーションファイルで `kernel driver` を検索してください。
- 有効な `datadog.yaml` が見つかった場合は、そのファイルが、指定されているすべてのコマンドラインオプションより優先されます。

#### その他の Agent 構成オプション

Windows に Agent をインストールする際、以下の各構成オプションをコマンドラインのプロパティとして追加することができます。

**注**: 有効な `datadog.yaml` が見つかった場合は、そのファイルが、指定されているすべてのコマンドラインオプションより優先されます。


| 変数                                    | タイプ    | 説明                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `LOGS_ENABLED`                              | 文字列  | Enable (`"true"`) or disable (`"false"`) the log collection feature in the configuration file. Logs are disabled by default.                                                                                                        |
| `APM_ENABLED`                               | 文字列  | 構成ファイルで、APM Agent を有効 (`"true"`) または無効 (`"false"`) にします。デフォルトでは、APM は有効です。                                                                                                                        |
| `PROCESS_ENABLED`                           | 文字列  | 構成ファイルで、Process Agent を有効 (`"true"`) または無効 (`"false"`) にします。デフォルトでは、Process Agent は無効です。                                                                                                     |
| `HOSTNAME_FQDN_ENABLED`                     | 文字列  | Agent のホスト名に対する FQDN の使用を有効 (`"true"`) または無効 (`"false"`) にします。これは、Agent コンフィギュレーションファイルの `hostname_fqdn` を設定することと同等です。ホスト名の FQDN の使用は、デフォルトでは無効になっています。_(v6.20.0+)_ |
| `CMD_PORT`                                  | 数値  | 0 から 65534 までの有効なポート番号。Datadog Agent はコマンド API をポート 5001 で公開します。このポートが既に別のプログラムで使用されている場合は、この変数でデフォルトを上書きできます。                                               |
| `PROXY_HOST`                                | 文字列  | (If using a proxy) sets your proxy host. [Learn more about using a proxy with the Datadog Agent][4].                                                                                                                                 |
| `PROXY_PORT`                                | 数値  | (If using a proxy) sets your proxy port. [Learn more about using a proxy with the Datadog Agent][4].                                                                                                                                 |
| `PROXY_USER`                                | 文字列  | (If using a proxy) sets your proxy user. [Learn more about using a proxy with the Datadog Agent][4].                                                                                                                                 |
| `PROXY_PASSWORD`                            | 文字列  | (If using a proxy) sets your proxy password. For the process/container Agent, this variable is required for passing in an authentication password and cannot be renamed. [Learn more about using a proxy with the Datadog Agent][4]. |
| `EC2_USE_WINDOWS_PREFIX_DETECTION`          | Boolean | EC2 上の Windows ホストの EC2 インスタンス ID を使用します。_(v7.28.0+)_                                                                                                                                                                      |
| [非推奨] `ADDLOCAL` | 文字列 | Enable additional Agent component. Setting to `"MainApplication,NPM"` causes the driver component for [Network Performance Monitoring][5] to be installed. _(version 7.44.0 and previous)_ |

**Note:**
Agent 7 only supports Python 3. Before upgrading, confirm that your custom checks are compatible with Python 3. See the [Python 3 Custom Check Migration][13] guide for more information. If you're not using custom checks or have already confirmed their compatibility, upgrade normally.

If you're upgrading from a Datadog Agent version < 5.12.0, first upgrade to a more recent version of Agent 5 (>= 5.12.0 but < 6.0.0) using the [EXE installer][14] and then upgrade to Datadog Agent version >= 6.

#### インストールログファイル

Agent のインストールログファイルは `%TEMP%\MSI*.LOG` にあります。

#### 検証

インストールを確認するには、[Agent のステータスと情報](#agent-status-and-information) セクションの手順に従ってください。

## Agent のコマンド

Agent の実行は、Windows サービスコントロールマネージャーによって制御されます。

* メインの実行可能ファイルは `agent.exe` です。場所は以下の通り、Agent のバージョンにより異なります。
    - Agent バージョン 6.11 以前: `"C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe"`
    - Agent バージョン 6.12 以降: `"C:\Program Files\Datadog\Datadog Agent\bin\agent.exe"`
* 構成 GUI は、ブラウザベースの構成アプリケーションです (Windows 64 ビット版のみ)。
* コマンドは**管理者特権 (管理者として実行)**のコマンドライン (PowerShell またはコマンドプロンプト) から、構文 `<PATH_TO_AGENT.EXE> <COMMAND>` を使用して実行できます。
* コマンドラインのオプションは次の通りです。

| コマンド         | 説明                                                                      |
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

* 例:
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

## 構成

[Datadog Agent Manager][6] を使ってチェックを有効化、無効化、および構成します。Agent を再起動して変更内容を適用します。


メインの Agent コンフィギュレーションファイルの場所:
`C:\ProgramData\Datadog\datadog.yaml`

インテグレーション用構成ファイルの場所:
`C:\ProgramData\Datadog\conf.d\` または
`C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`

**注**: `ProgramData` は隠しフォルダーです。

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

### フレアの送信

* [http://127.0.0.1:5002][12] にアクセスして Datadog Agent Manager を表示します。

* Flare タブを選択します。

* チケット番号を入力します (お持ちの場合)。

* Datadog へのログインに使用するメールアドレスを入力します。

* Submit を押します。

PowerShell では、次の flare コマンドを使用できます。

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare <CASE_ID>
```

cmd.exe では、次のようにします。

```cmd
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" flare <CASE_ID>
```

{{< img src="agent/basic_agent_usage/windows/windows_flare_agent_6.png" alt="Agent 6 を使用した Windows フレア" style="width:75%;">}}

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


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: /ja/agent/supported_platforms/?tab=windows
[3]: /ja/agent/faq/windows-agent-ddagent-user/
[4]: /ja/agent/configuration/proxy/
[5]: /ja/network_monitoring/performance
[6]: /ja/agent/guide/datadog-agent-manager-windows/
[7]: /ja/integrations/wmi_check/
[8]: https://app.datadoghq.com/monitors#create/integration
[9]: /ja/infrastructure/process/?tab=linuxwindows#installation
[10]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[11]: /ja/agent/configuration/agent-commands/#restart-the-agent
[12]: http://127.0.0.1:5002
[13]: /ja/agent/guide/python-3/
[14]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe