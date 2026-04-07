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
description: Windows プラットフォームの Datadog Agent の基本機能
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
  text: Agent のアーキテクチャを詳しく見る
- link: /agent/configuration/network#configure-ports
  tag: Documentation
  text: インバウンドポートの構成
- link: /agent/guide/windows-agent-ddagent-user
  tag: Documentation
  text: Datadog Windows Agent ユーザーについて詳しく学ぶ
platform: Windows
title: Windows
---
## 概要

このページでは、Datadog Agent for Windows の基本的な機能について概説します。まだ Agent をインストールしていない場合は、下記のインストール手順を参照するか、[アプリ内の指示に従ってください][1]。

サポートされている Windows バージョンの全一覧は、[サポートされているプラットフォーム][15]を参照してください。

## インストール

Windows ホストに Datadog Agent をインストールするには、[Fleet Automation 内のガイド付きアプリ内フロー][16]に従い、インストールコマンドをコピーして実行してください。Datadog Agent は `ddagentuser` の下で実行されます。詳細については、[Datadog Windows Agent ユーザー][17]のドキュメントを参照してください。


{{< img src="/agent/basic_agent_usage/windows_img2_july_25.png" alt="Windows ホストの Datadog Agent のアプリ内インストール手順。" style="width:90%;">}}


## 代替インストール方法

### Agent Manager GUI を使用するインストール

<div class="alert alert-info">Agent のデフォルトのインストール場所は <code>%ProgramFiles%\Datadog\Datadog Agent</code> です。カスタムインストール場所を使用する場合は、Datadog ファイルを収容する <code>Datadog</code> サブディレクトリを指定してください。</div>

1. [Datadog Agent インストーラー][400]をダウンロードし、最新バージョンの Agent をインストールします。
2. `datadogagent7latest.amd64.msi` を開いてインストーラーを実行します。プロンプトが表示されたら、管理者の資格情報を入力します。
3. プロンプトに従ってライセンス契約に同意し、[Datadog API キー][500]を入力します。

インストールが終了したら、オプションから Datadog Agent Manager を起動できます。


#### インストール構成オプション

Windows に Agent をインストールする際、下記の各構成オプションをコマンドラインのプロパティとして追加することができます。他の Agent 構成オプションについては、[Agent 構成オプションの詳細](#moreagentconfigurationoptions)を参照してください。


| 変数                                    | 型    | 説明                                                                                                                                                                                                                         |
|                 |||
| `APIKEY`                                    | 文字列  | Datadog API キーを構成ファイルに追加します。                                                                                                                                                                                |
| `SITE`   | 文字列  | Datadog の取り込みサイトを設定します。例: `SITE=datadoghq.com`     |
| `TAGS`                                      | 文字列  | 構成ファイルで割り当てるタグのカンマ区切りリスト。例: `TAGS="key_1:val_1,key_2:val_2"`                                                                                                                         |
| `HOSTNAME`                                  | 文字列  | Agent から Datadog に報告されるホスト名を設定します (実行時に計算されたホスト名を上書きします)。                                                                                                                           |
| `DDAGENTUSER_NAME`                          | 文字列  | Agent インストール時に使用されるデフォルトの `ddagentuser` ユーザー名を上書きします _(v6.11.0+)_。[Datadog Windows Agent ユーザーについての詳細][3]。                                                                                     |
| `DDAGENTUSER_PASSWORD`                      | 文字列  | Agent インストール時に `ddagentuser` ユーザーのために生成された暗号的に安全なパスワードを上書きします_(v6.11.0+)_ 。ドメインサーバーへのインストールには必ず指定する必要があります。[Datadog Windows Agent ユーザーについての詳細][3]。 |
| `APPLICATIONDATADIRECTORY`                  | パス    | 構成ファイルのディレクトリツリーに使用するディレクトリを上書きします。初回インストール時のみ指定可能; アップグレードでは無効です。デフォルト: `C:\ProgramData\Datadog`。_(v6.11.0+)_                                           |
| `PROJECTLOCATION`                           | パス    | バイナリファイルのディレクトリツリーに使用するディレクトリを上書きします。初回インストール時のみ指定可能; アップグレードでは無効です。デフォルト: `%ProgramFiles%\Datadog\Datadog Agent`。_(v6.11.0+)_<br><br>デフォルトのディレクトリを上書きすることを選択した場合は、Datadog ファイルを格納する `Datadog` サブディレクトリを指定してください。                                   |

**注**

 `/qn` オプションは、静かなインストールを実行します。GUI プロンプトを表示するには、これを削除してください。
一部の Agent バージョンでは、強制的に再起動が発生する可能性があります。これを防ぐために、パラメーター `REBOOT=ReallySuppress` を追加してください。
一部の Agent コンポーネントはデータを収集するためにカーネルドライバーを必要とします。お使いのコンポーネントにカーネルドライバーが必要かどうかを知るには、そのドキュメントページを参照するか、関連する Agent 構成ファイルで `kernel driver` を検索してください。
有効な `datadog.yaml` が見つかった場合、そのファイルが、指定されているすべてのコマンドラインオプションより優先されます。

#### その他の Agent 構成オプション

Windows に Agent をインストールする際、下記の各構成オプションをコマンドラインのプロパティとして追加することができます。

**注**: 有効な `datadog.yaml` が見つかった場合、そのファイルが、指定されているすべてのコマンドラインオプションより優先されます。


| 変数                                    | 型    | 説明                                                                                                                                                                                                                         |
|                 |||
| `LOGS_ENABLED`                              | 文字列  | 構成ファイルでログ収集機能を有効 (`"true"`) または無効 (`"false"`) にします。デフォルトでは、ログは無効です。                                                                                                       |
| `APM_ENABLED`                               | 文字列  | 構成ファイルで APM Agent を有効 (`"true"`) または無効 (`"false"`) にします。デフォルトでは、APM は有効です。                                                                                                                       |
| `PROCESS_ENABLED`                           | 文字列  | 構成ファイルで Process Agent を有効 (`"true"`) または無効 (`"false"`) にします。デフォルトでは、Process Agent は無効です。                                                                                                    |
| `HOSTNAME_FQDN_ENABLED`                     | 文字列  | Agent ホスト名に FQDN を使用することを有効 (`"true"`) または無効 (`"false"`) にします。これは、Agent 構成ファイルで `hostname_fqdn` を設定することに相当します。ホスト名に FQDN を使用することはデフォルトでは無効です。_(v6.20.0+)_ |
| `CMD_PORT`                                  | 数字  | 0 から 65534 までの有効なポート番号。Datadog Agent はポート 5001 でコマンド API を公開します。このポートが既に別のプログラムで使用されている場合は、そのデフォルトがここで上書きされる場合があります。                                              |
| `PROXY_HOST`                                | 文字列  | (プロキシを使用する場合) プロキシホストを設定します。[Datadog Agent でプロキシを使用する方法の詳細][4]。                                                                                                                                |
| `PROXY_PORT`                                | 数値  | (プロキシを使用する場合) プロキシポートを設定します。[Datadog Agent でプロキシを使用する方法の詳細][4]。                                                                                                                                |
| `PROXY_USER`                                | 文字列  | (プロキシを使用する場合) プロキシユーザーを設定します。[Datadog Agent でプロキシを使用する方法の詳細][4]。                                                                                                                                |
| `PROXY_PASSWORD`                            | 文字列  | (プロキシを使用する場合) プロキシパスワードを設定します。プロセス/コンテナ Agent の場合、この変数は認証パスワードを渡すために必須であり、名前を変更することはできません。[Datadog Agent でプロキシを使用する方法の詳細][4]。|
| `EC2_USE_WINDOWS_PREFIX_DETECTION`          | ブール値 | EC2 のWindows ホストに EC2 インスタンス ID を使用します。_(v7.28.0+)_                                            |

#### インストールログファイル

`/log <FILENAME>` msiexec オプションを設定してインストールログファイルを構成します。このオプションが設定されていない場合、msiexec はデフォルトで`%TEMP%\MSI*.LOG`にログを書き込みます。


## 構成

メイン Agent 構成ファイルは
`C:\ProgramData\Datadog\datadog.yaml` にあります。このファイルは、API キー、選択した Datadog サイト、プロキシパラメーター、ホストタグ、ログレベルなどのホスト全体の設定に使用されます。

同じディレクトリに `datadog.yaml.example` ファイルもあります。このファイルには、使用可能なすべての構成オプションを示すリファレンスがコメントとしてフルで付けられており、特定の構成を参照したりコピーしたりするのに便利です。


インテグレーション用の構成ファイルは
`C:\ProgramData\Datadog\conf.d\` にあります。代替のレガシー場所である `C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\` もあるかもしれません。

各インテグレーションには、下記のものを格納するサブディレクトリ`<INTEGRATION>.d\`があります。
 `conf.yaml`: インテグレーションのアクティブな設定
* `conf.yaml.example`: サポートされている構成キーを示すサンプルファイル

構成変更を行う際は、変更が反映されるように Agent を再起動してください。

[Datadog Agent Manager GUI][6] を使用して、チェックを有効化、無効化、構成できます。変更を反映させるためには、Agent を再起動する必要があります。

**注**: `ProgramData` は隠しフォルダーです。

## Agent のコマンド

Agent の実行は、Windows サービスコントロールマネージャーによって制御されています。

* メインの実行可能ファイル名は `agent.exe` です。
* 構成 GUI は、ブラウザベースの構成アプリケーションです (Windows 64 ビット版のみ)。
* コマンドは **管理者特権 (管理者として実行)** のコマンドライン (PowerShell またはコマンドプロンプト) から、構文 `<PATH_TO_AGENT.EXE> <COMMAND>` を使用して実行できます。
* 下記のコマンドラインのオプションがあります。

| コマンド         | 説明                                                                      |
|||
| check           | 指定されたチェックを実行します。                                                       |
| diagnose            | システムに対して接続診断を実行します。                            |
| flare           | フレアを収集して Datadog に送信します。                                        |
| help            | コマンドのヘルプを表示します。                                                    |
| hostname        | Agent が使用するホスト名を出力します。                                          |
| import          | 以前のバージョンの Agent から構成ファイルをインポートして変換します。   |
| launchgui      | Datadog Agent Manager を起動します。                                               |
| restartservice | サービスコントロールマネージャー内で Agent を再起動します。                          |
| run             | Agent を起動します。                                                               |
| start           | Agent を起動します。(非推奨ですが、使用はできます。代わりに、`run` を使用してください。)|
| startservice   | サービスコントロールマネージャー内で Agent を起動します。                            |
| status          | 現在のステータスを出力します。                                                       |
| stopservice     | サービスコントロールマネージャー内で Agent を停止します。                             |
| version         | バージョン情報を出力します。                                                        |

**例**:
   PowerShell (`powershell.exe`)

    ```powershell
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

   コマンドプロンプト (`cmd.exe`)

    ```cmd
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

## Agent のアンストール

Windows で Agent をアンインストールする方法は 2 つあります。どちらの方法も Agent を削除しますが、ホスト上の `C:\ProgramData\Datadog` 構成フォルダーは削除しません。

### プログラムの追加と削除

1. **CTRL** キーを押しながら **Esc** キーを押すか、Windows キーで Windows Search を実行します。
1. `add` を検索し、[**プログラムの追加と削除**] をクリックします。
1. `Datadog Agent` を検索し、[**アンインストール**] をクリックします。

### PowerShell

**注:** 下記のコマンドを使用する場合は、WinRM を有効にしてください。

下記の PowerShell コマンドを使用して、再起動せずに Agent をアンインストールします。

{{< code-block lang="powershell" >}}
$productCode = (@(Get-ChildItem -Path "HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" -Recurse) | Where {$_.GetValue("DisplayName") -like "Datadog Agent" }).PSChildName
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/q', '/x', "$productCode", 'REBOOT=ReallySuppress')
{{< /code-block >}}

## トラブルシューティング

トラブルシューティング手順については、[Agent トラブルシューティングのドキュメント][18]を参照してください。


### Agent のステータスと情報

Agent が実行中であることを確認するには、サービスパネルで `DatadogAgent` サービスが *Started* と表示されているかチェックしてください。*Datadog Metrics Agent* (`agent.exe`) というプロセスもタスクマネージャーにあるはずです。

Agent の状態に関する情報をさらに受け取るには、次のようにして Datadog Agent Manager を起動します。

* Datadog Agent のシステムトレイアイコンを右クリックし、[Configure] を選択します。または
* **管理者特権 (管理者として実行)** コマンドラインから `launchgui` コマンドを実行します
	 PowerShell: `&amp; "<PATH_TO_AGENT.EXE>" launchgui`
	 cmd: `"<PATH_TO_AGENT.EXE>" launchgui`

次に、[*Status*] > [*General*] に移動してステータスページを開きます。
[*Status*] > [*Collector*] および [*Checks*] > [*Summary*] でチェックの実行に関する詳細情報を取得します。

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

### Windows サービスのモニタリング

ターゲットホストで Datadog Agent Manager を起動し、リストから「Windows サービス」インテグレーションを選択します。すぐに使える例がありますが、この例では DHCP を使用します。

サービスの名前を取得するには、`services.msc` を開き、ターゲットサービスを見つけます。DHCP をターゲットとして使用すると、サービスプロパティウィンドウの上部にサービス名が表示されます。

{{< img src="agent/faq/DHCP.png" alt="DHCP" style="width:75%;">}}

独自のサービスを追加する際は、表示されているフォーマットに正確に従ってください。フォーマットが正しくない場合、インテグレーションは失敗します。**注**: サービス名に特殊文字が含まれている場合はエスケープする必要があります。たとえば、名前 `MSSQL$BILLING` は `MSSQL\$BILLING` として追加できます。

{{< img src="agent/faq/windows_DHCP_service.png" alt="Windows DHCP サービス" style="width:75%;">}}

また、インテグレーションを変更するたびに、Datadog サービスを再起動する必要があります。これは services.msc または UI サイドバーから行うことができます。

サービスについて、Datadog はメトリクスを追跡せず、可用性のみを追跡します。(メトリクスについては、[プロセス](#monitoringwindowsprocesses) または [WMI][7] インテグレーションを使用してください)。モニターを設定するには、[インテグレーションモニタータイプ][8]を選択し、**Windows サービス** を検索します。[*Integration Status > Pick Monitor Scope*] から、モニターしたいサービスを選択します。

### Windows のシステム負荷のモニタリング

Datadog Agent は、デフォルトで多数のシステムメトリクスを収集します。最も一般的に使用されるシステムメトリクスは `system.load.*` ですが、これらのメトリクスは **Unix** 特有です。

Windows は `system.load.*` メトリクスを提供していませんが、デフォルトで利用可能な同等のオプションは `system.proc.queue.length` です。このメトリクスは、実行待ちのプロセッサ準備キューで遅延として観察されたスレッドの数を示します。

### Windows プロセスのモニタリング

[ライブプロセスのモニタリング][9]を使用して Windows プロセスをモニターできます。これを Windows で有効にするには、次のパラメーターを true に設定することにより、[Agent メイン構成ファイル][10]を編集します。

`datadog.yaml`：

```yaml
process_config:
  enabled: "true"
```

構成が完了したら、[Agent を再起動][11]します。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/fleet/installagent/latest?platform=windows
[2]: /ja/agent/supported_platforms/?tab=windows
[3]: /ja/agent/faq/windowsagentddagentuser/
[4]: /ja/agent/configuration/proxy/
[5]: /ja/network_monitoring/cloud_network_monitoring
[6]: /ja/agent/guide/datadogagentmanagerwindows/
[7]: /ja/integrations/wmi_check/
[8]: https://app.datadoghq.com/monitors/create/integration
[9]: /ja/infrastructure/process/?tab=linuxwindows#installation
[10]: /ja/agent/configuration/agentconfigurationfiles/#agentmainconfigurationfile
[11]: /ja/agent/configuration/agentcommands/#restarttheagent
[12]: http://127.0.0.1:5002
[13]: /ja/agent/guide/python3/
[14]: https://s3.amazonaws.com/ddagentwindowsstable/ddagentclilatest.exe
[15]: https://docs.datadoghq.com/ja/agent/supported_platforms/?tab=windows
[16]: https://app.datadoghq.com/fleet/installagent/latest?platform=windows
[17]: /ja/agent/faq/windowsagentddagentuser/
[18]: https://docs.datadoghq.com/ja/agent/troubleshooting/
[400]: https://windowsagent.datadoghq.com/datadogagent7latest.amd64.msi
[500]: https://app.datadoghq.com/organizationsettings/apikeys