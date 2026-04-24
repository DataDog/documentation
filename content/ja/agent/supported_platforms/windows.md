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
- /ja/agent/basic_agent_usage/windows/
description: Windows プラットフォームにおける Datadog Agent の基本機能。
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
- link: /agent/architecture/#agent-architecture
  tag: Documentation
  text: Agent のアーキテクチャに関する詳細
- link: /agent/configuration/network#configure-ports
  tag: Documentation
  text: インバウンドポートの設定
- link: /agent/guide/windows-agent-ddagent-user
  tag: Documentation
  text: Datadog Windows Agent ユーザーの詳細
platform: Windows
title: Windows
---
## 概要 {#overview}

このページでは、Windows 用 Datadog Agent の基本機能の概要を説明します。Agent をまだインストールしていない場合は、下記のインストール手順を参照するか、[アプリ内の指示][1]に従ってください。

サポートされている Windows バージョンの完全なリストについては、[サポート対象プラットフォーム][15] を参照してください。

##インストール {#installation}

Windows ホストに Datadog Agent をインストールするには、[Fleet Automation 内のガイド付きアプリ内フロー][16]に従い、インストールコマンドをコピーして実行します。Datadog Agent は `ddagentuser` の下で実行されます。詳細については、[Datadog Windows Agent ユーザー][17]のドキュメントを参照してください。


{{< img src="/agent/basic_agent_usage/windows_img2_july_25.png" alt="Windows ホストへの Datadog Agent のアプリ内インストール手順。" style="width:90%;">}}


## その他のインストール方法 {#alternative-installation-methods}

### Agent Manager GUI を使用したインストール {#install-with-the-agent-manager-gui}

<div class="alert alert-info">Agent のデフォルトのインストール場所は <code>%ProgramFiles%\Datadog\Datadog Agent</code> です。カスタムのインストール場所を使用する場合は、Datadog ファイル用に <code>Datadog</code> サブディレクトリを指定してください。</div>

1. [Datadog Agent インストーラー][400]をダウンロードして、最新バージョンの Agent をインストールします。
2.`datadog-agent-7-latest.amd64.msi` を開いてインストーラーを実行します。プロンプトが表示されたら、管理者資格情報を入力します。
3.プロンプトに従い、使用許諾契約に同意して、[Datadog API キー][500]を入力します。

インストールが完了すると、Datadog Agent Manager を起動するオプションが表示されます。


####インストール設定オプション {#installation-configuration-options}

下記の各設定オプションは、Windows に Agent をインストールする際に、コマンドラインのプロパティとして追加できます。その他の Agent 設定オプションについては、[その他の Agent 設定オプション](#more-agent-configuration-options)を参照してください。


|変数                                    | 型    | 説明                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APIKEY`                                    | 文字列  | 設定ファイルに Datadog API キーを追加します。                                                                                                                                                                                |
| `SITE`   | 文字列  | Datadog インテークサイトを設定します。例: `SITE=datadoghq.com`     |
| `TAGS`                                      | 文字列  | 設定ファイルで割り当てるタグのカンマ区切りリスト。例: `TAGS="key_1:val_1,key_2:val_2"`                                                                                                                         |
| `HOSTNAME`                                  | 文字列  | Agent が Datadog に報告するホスト名を設定します (実行時に計算されたホスト名を上書きします)。                                                                                                                           |
| `DDAGENTUSER_NAME`                          | 文字列  | Agent のインストール中に使用されるデフォルトの `ddagentuser` ユーザー名を上書きします _(v6.11.0+)_。[Datadog Windows Agent ユーザーの詳細][3]。                                                                                     |
| `DDAGENTUSER_PASSWORD`                      | 文字列  | Agent のインストール中に `ddagentuser` ユーザーに対して生成された暗号的に安全なパスワードを上書きします _(v6.11.0+)_。ドメインサーバーへのインストールでは指定する必要があります。[Datadog Windows Agent ユーザーの詳細][3]。 |
| `APPLICATIONDATADIRECTORY`                  | パス    | 設定ファイルのディレクトリツリーに使用するディレクトリを上書きします。新規インストール時にのみ指定可能です。アップグレード時には無効です。デフォルト: `C:\ProgramData\Datadog`。_(v6.11.0+)_                                           |
| `PROJECTLOCATION`                           | パス    | バイナリファイルのディレクトリツリーに使用するディレクトリを上書きします。新規インストール時にのみ指定可能です。アップグレード時には無効です。デフォルト: `%ProgramFiles%\Datadog\Datadog Agent`。_(v6.11.0+)_<br><br>デフォルトのディレクトリを上書きする場合は、Datadog ファイル用の `Datadog` サブディレクトリを必ず指定してください。                                   |

**注**

- `/qn` オプションは、サイレントインストールを実行します。GUI プロンプトを表示するには、これを削除します。
-一部の Agent バージョンでは、強制的な再起動が発生する場合があります。これを防ぐには、パラメーター `REBOOT=ReallySuppress` を追加します。
-一部の Agent コンポーネントでは、データを収集するためにカーネルドライバーが必要です。コンポーネントにカーネルドライバーが必要かどうかを確認するには、そのドキュメントページを参照するか、関連する Agent 設定ファイルで `kernel driver` を検索してください。
-有効な `datadog.yaml` が見つかった場合、そのファイルは指定されたすべてのコマンドラインオプションよりも優先されます。

####その他の Agent 設定オプション {#more-agent-configuration-options}

下記の各設定オプションは、Windows に Agent をインストールする際に、コマンドラインのプロパティとして追加できます。

**注**: 有効な `datadog.yaml` が見つかった場合、そのファイルは指定されたすべてのコマンドラインオプションよりも優先されます。


|変数                                    | 型    | 説明                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `LOGS_ENABLED`                              | 文字列  | 設定ファイルでログ収集機能を有効化 (`"true"`) または無効化 (`"false"`) します。ログはデフォルトで無効になっています。                                                                                                       |
| `APM_ENABLED`                               | 文字列  | 設定ファイルで APM Agent を有効化 (`"true"`) または無効化 (`"false"`) します。APM はデフォルトで有効になっています。                                                                                                                       |
| `PROCESS_ENABLED`                           | 文字列  | 設定ファイルで Process Agent を有効化 (`"true"`) または無効化 (`"false"`) します。Process Agent はデフォルトで無効になっています。                                                                                                    |
| `HOSTNAME_FQDN_ENABLED`                     | 文字列  | Agent ホスト名への FQDN の使用を有効化 (`"true"`) または無効化 (`"false"`) します。これは、Agent 設定ファイルで `hostname_fqdn` を設定するのと同等です。ホスト名への FQDN の使用はデフォルトで無効になっています。_(v6.20.0+)_ |
| `CMD_PORT`                                  | 数値  | 0 ～ 65534 の有効なポート番号。Datadog Agent はポート 5001 でコマンド API を公開します。そのポートが既に別のプログラムで使用されている場合は、ここでデフォルトを上書きできます。                                              |
| `PROXY_HOST`                                | 文字列  | (プロキシを使用する場合) プロキシホストを設定します。[Datadog Agent でのプロキシの使用に関する詳細][4]。                                                                                                                                |
| `PROXY_PORT`                                | 数値  | (プロキシを使用する場合) プロキシポートを設定します。[Datadog Agent でのプロキシの使用に関する詳細][4]。                                                                                                                                |
| `PROXY_USER`                                | 文字列  | (プロキシを使用する場合) プロキシユーザーを設定します。[Datadog Agent でのプロキシの使用に関する詳細][4]。                                                                                                                                |
| `PROXY_PASSWORD`                            | 文字列  | (プロキシを使用する場合) プロキシパスワードを設定します。プロセス/コンテナ Agent の場合、この変数は認証パスワードを渡すために必要であり、名前を変更することはできません。[Datadog Agent でのプロキシの使用に関する詳細][4]。|
| `EC2_USE_WINDOWS_PREFIX_DETECTION`          | ブール値 | EC2 上の Windows ホストに EC2 インスタンス ID を使用します。 _(v7.28.0+)_                                            |

#### インストールログファイル {#installation-log-files}

インストールログファイルを設定するには、`/log <FILENAME>` msiexec オプションを指定します。このオプションが設定されていない場合、msiexec はデフォルトで `%TEMP%\MSI*.LOG` にログを書き込みます。


##設定 {#configuration}

メインの Agent 設定ファイルの場所は下記のとおりです。
`C:\ProgramData\Datadog\datadog.yaml`。このファイルは、API キー、選択した Datadog サイト、プロキシパラメーター、ホストタグ、ログレベルなど、ホスト全体の設定に使用されます。

同じディレクトリには `datadog.yaml.example` ファイルもあります。これは利用可能なすべての設定オプションを網羅したコメント付きのリファレンスで、参照や特定の設定のコピーに役立ちます。


インテグレーションの設定ファイルの場所は下記のとおりです。
`C:\ProgramData\Datadog\conf.d\` また、代わりにレガシーな場所である `C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\` に存在する場合もあります。

各インテグレーションには、下記を含むサブディレクトリ `<INTEGRATION>.d\` があります。
- `conf.yaml`: インテグレーションのアクティブな設定
* `conf.yaml.example`: サポートされている設定キーを示すサンプルファイル

設定を変更した後は、変更を確実に反映させるために必ず Agent を再起動してください。

[Datadog Agent Manager GUI][6] を使用して、チェックの有効化、無効化、および設定ができます。変更を反映させるには、Agent を再起動する必要があります。

**注**: `ProgramData` は隠しフォルダーです。

##Agent コマンド {#agent-commands}

Agent の実行は、Windows サービスコントロールマネージャーによって制御されます。

*メインの実行ファイル名は `agent.exe` です。
*設定 GUI は、ブラウザベースの設定アプリケーションです (Windows 64 ビット版のみ)。
*コマンドは、**昇格した (管理者として実行)** コマンドライン (PowerShell またはコマンドプロンプト) から、構文 `<PATH_TO_AGENT.EXE> <COMMAND>` を使用して実行できます。
*コマンドラインオプションは下記のとおりです。

| コマンド         | 説明                                                                      |
|-----------------|----------------------------------------------------------------------------------|
| check           | 指定されたチェックを実行します。                                                       |
| diagnose        | システム上で接続診断を実行します。                            |
| flare           | フレアを収集して Datadog に送信します。                                        |
| help            | コマンドに関するヘルプを表示します。                                                    |
| hostname        | Agent が使用しているホスト名を表示します。                                          |
| import          | 以前のバージョンの Agent から設定ファイルをインポートして変換します。   |
| launch-gui      | Datadog Agent Manager を起動します。                                               |
| restart-service | サービスコントロールマネージャー内で Agent を再起動します。                          |
| run             | Agent を起動します。                                                               |
| start           | Agent を起動します。(非推奨ですが、受け入れられます。代わりに `run` を使用してください。)|
| start-service   | サービスコントロールマネージャー内で Agent を起動します。                            |
| status          | 現在のステータスを表示します。                                                       |
| stopservice     | サービスコントロールマネージャー内で Agent を停止します。                             |
| version         | バージョン情報を表示します。                                                        |

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

## Agent のアンインストール {#uninstall-the-agent}

Windows で Agent をアンインストールするには、2 つの異なる方法があります。どちらの方法でも Agent は削除されますが、ホスト上の `C:\ProgramData\Datadog` 設定フォルダーは削除されません。

###プログラムの追加と削除 {#add-or-remove-programs}

1. **Ctrl** キーと **Esc** キーを同時に押すか、Windows キーを使用して Windows 検索を実行します。
1.`add` を検索し、[**プログラムの追加と削除**] をクリックします。
1.`Datadog Agent` を検索し、[**アンインストール**] をクリックします。

###PowerShell {#powershell}

**注:** 次のコマンドを使用するには、WinRM を有効にしてください。

再起動せずに Agent をアンインストールするには、次の PowerShell コマンドを使用します。

{{< code-block lang="powershell" >}}
$productCode = (@(Get-ChildItem -Path "HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" -Recurse) | Where {$_.GetValue("DisplayName") -like "Datadog Agent" }).PSChildName
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/q', '/x', "$productCode", 'REBOOT=ReallySuppress')
{{< /code-block >}}

## トラブルシューティング {#troubleshooting}

トラブルシューティングの手順については、[Agent のトラブルシューティングドキュメント][18]を参照してください。


###Agent のステータスと情報 {#agent-status-and-information}

Agent が実行されていることを確認するには、[サービス] パネルで `DatadogAgent` サービスが [*開始*] と表示されているか確認します。タスクマネージャーに *Datadog Metrics Agent* (`agent.exe`) というプロセスも存在している必要があります。

Agent の状態に関する詳細情報を取得するには、Datadog Agent Manager を起動します。

* Datadog Agent のシステムトレイアイコンを右クリックして [Configure] (設定) を選択するか、
* **昇格した (管理者として実行)** コマンドラインから `launch-gui` コマンドを実行します。
	- PowerShell: `& "<PATH_TO_AGENT.EXE>" launch-gui`
	- cmd: `"<PATH_TO_AGENT.EXE>" launch-gui`

次に、[*Status*] (ステータス) -> [*General*] (全般) の順に移動して、ステータスページを開きます。
実行中のチェックに関する詳細は、[*Status*] -> [*Collector*] (コレクター) および [*Checks*] (チェック) -> [*Summary*] (サマリー) で確認できます。

status コマンドは PowerShell で使用できます。

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
```

または cmd.exe:

```cmd
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
```

### ログの場所 {#logs-location}

Agent のログは `C:\ProgramData\Datadog\logs\agent.log` にあります。

**注**: `ProgramData` は隠しフォルダーです。

##ユースケース {#use-cases}

###  Windows サービスのモニタリング {#monitoring-a-windows-service}

対象のホストで Datadog Agent Manager を起動し、リストから "Windows Service" インテグレーションを選択します。標準で用意されている例がありますが、この例では DHCP を使用しています。

サービス名を取得するには、`services.msc` を開き、対象のサービスを見つけます。DHCP を対象とする場合、サービスのプロパティウィンドウの上部にサービス名が表示されます。

{{< img src="agent/faq/DHCP.png" alt="DHCP" style="width:75%;">}}

独自のサービスを追加するときは、必ず示されているとおりの形式に従ってください。形式が正しくない場合、インテグレーションは失敗します。**注**: サービス名に含まれる特殊文字はエスケープする必要があります。たとえば、名前 `MSSQL$BILLING` は `MSSQL\$BILLING` で追加できます。

{{< img src="agent/faq/windows_DHCP_service.png" alt="Windows DHCP サービス" style="width:75%;">}}

また、インテグレーションを変更した場合は、そのたびに Datadog サービスを再起動する必要があります。これは services.msc または UI のサイドバーから行えます。

サービスの場合、Datadog はメトリクスを追跡せず、可用性のみを追跡します。(メトリクスの場合は、[プロセス](#monitoring-windows-processes)または [WMI][7] インテグレーションを使用します)。モニターをセットアップするには、[インテグレーションモニタータイプ][8]を選択し、**Windows Service** を検索します。*[Integration Status] (インテグレーションのステータス) -> [Pick Monitor Scope] (モニタースコープの選択)* から、モニタリングするサービスを選択します。

###Windows のシステム負荷のモニタリング {#monitoring-system-load-for-windows}

Datadog Agent は、デフォルトで多数のシステムメトリクスを収集します。特に一般的に使用されるシステムメトリクスは `system.load.*` ですが、これらのメトリクスは **Unix** 固有のものです。

Windows では `system.load.*` メトリクスは提供されませんが、デフォルトで利用可能な同等のオプションとして `system.proc.queue.length` があります。このメトリクスは、プロセッサーのレディキューで遅延し、実行を待機しているスレッドの数を示します。

###Windows プロセスのモニタリング {#monitoring-windows-processes}

[ライブプロセスモニタリング][9]を使用して Windows プロセスをモニタリングできます。Windows でこれを有効にするには、[Agent のメイン設定ファイル][10]を編集し、次のパラメーターを true に設定します。

`datadog.yaml`:

```yaml
process_config:
  enabled: "true"
```

設定が完了したら、[Agent を再起動][11]します。

##その他の参考資料 {#further-reading}

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
[15]: https://docs.datadoghq.com/ja/agent/supported_platforms/?tab=windows
[16]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[17]: /ja/agent/faq/windows-agent-ddagent-user/
[18]: https://docs.datadoghq.com/ja/agent/troubleshooting/
[400]: https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi
[500]: https://app.datadoghq.com/organization-settings/api-keys