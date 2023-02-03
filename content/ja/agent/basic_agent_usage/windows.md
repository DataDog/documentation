---
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
- link: /agent/guide/network#configure-ports
  tag: Documentation
  text: インバウンドポートの構成
kind: documentation
platform: Windows
title: Windows 用 Agent の基本的な使用方法
---

## セットアップ

Datadog Agent をまだインストールしていない場合は、以下の手順または[アプリ内のインストール手順][1]を参照してください。[サポートされる OS バージョン][2]については、Agent のドキュメントを参照してください。

Datadog EU サイトへのインストールと構成には、`SITE=` パラメーターを使用します。以下の構成変数の表を参照してください。

### APM に Datadog Agent を構成する

**Agent v6.11.0** 以降、Windows Agent のコアと APM/トレースコンポーネントは、`LOCAL_SYSTEM` アカウントではなくインストール時に作成された `ddagentuser` アカウントで実行します。ライブプロセスコンポーネントは、有効になっている場合、`LOCAL_SYSTEM` アカウントで実行します。Datadog Windows Agent ユーザーの詳細については、[こちら][3]を参照してください。

Datadog Agent をドメイン環境にインストールするには、[Agent のインストール要件][4]を参照してください。

**注**: [ドメインコントローラー][5]について特別な考慮事項があります。

{{< tabs >}}
{{% tab "GUI" %}}

1. [Datadog Agent インストーラー][1]をダウンロードし、最新バージョンの Agent をインストールします。

   <div class="alert alert-info">特定のバージョンの Agent をインストールする必要がある場合は、<a href="https://s3.amazonaws.com/ddagent-windows-stable/installers.json">インストーラーリスト</a>を参照してください。</div>

2. `datadog-agent-7-latest.amd64.msi` を開き、インストーラーを (**管理者**として) 実行します。
3. プロンプトに従ってライセンス契約に同意し、[Datadog API キー][2]を入力します。
4. インストールが終了したら、オプションから Datadog Agent Manager を起動できます。

[1]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi
[2]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "コマンドライン" %}}

コマンドラインを使用して Agent をインストールするには

1. [Datadog Agent インストーラー][1]をダウンロードします。
2. インストーラをダウンロードしたディレクトリで、以下のコマンドのいずれかを実行します。

**コマンドプロンプト**

```shell
start /wait msiexec /qn /i datadog-agent-7-latest.amd64.msi APIKEY="<YOUR_DATADOG_API_KEY>"
```

**PowerShell**

```powershell
Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-agent-7-latest.amd64.msi APIKEY="<DATADOG_API_キー>"'
```

**注**

- `/qn` オプションはバックグラウンドインストールを実行します。GUI プロンプトを表示する場合は、削除してください。
- Agent のバージョンによっては、強制的に再起動する場合があります。これを防ぐには、パラメーター `REBOOT=ReallySuppress` を追加します。

### コンフィギュレーション

各構成項目は、コマンドラインにプロパティとして追加します。Agent を Windows にインストールする場合は、以下の構成コマンドラインオプションを使用できます。

| 変数                                    | タイプ    | 説明                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APIKEY`                                    | 文字列  | Datadog API キーを構成ファイルに追加します。                                                                                                                                                                                 |
| `SITE`                                      | 文字列  | Datadog インテークサイトを設定します。例: `SITE=`{{< region-param key="dd_site" code="true" >}}                                                                                                                                     |
| `TAGS`                                      | 文字列  | 構成ファイル内で割り当てるタグのカンマ区切りリスト。例: `TAGS="key_1:val_1,key_2:val_2"`                                                                                                                         |
| `HOSTNAME`                                  | 文字列  | Agent から Datadog に報告されるホスト名を設定します (実行時に計算されたホスト名を上書きします)。                                                                                                                            |
| `LOGS_ENABLED`                              | 文字列  | 構成ファイルで、ログ収集機能を有効 (`"true"`) または無効 (`"false"`) にします。デフォルトでは、ログは無効です。                                                                                                        |
| `APM_ENABLED`                               | 文字列  | 構成ファイルで、APM Agent を有効 (`"true"`) または無効 (`"false"`) にします。デフォルトでは、APM は有効です。                                                                                                                        |
| `PROCESS_ENABLED`                           | 文字列  | 構成ファイルで、Process Agent を有効 (`"true"`) または無効 (`"false"`) にします。デフォルトでは、Process Agent は無効です。                                                                                                     |
| `HOSTNAME_FQDN_ENABLED`                     | 文字列  | Agent のホスト名に対する FQDN の使用を有効 (`"true"`) または無効 (`"false"`) にします。これは、Agent コンフィギュレーションファイルの `hostname_fqdn` を設定することと同等です。ホスト名の FQDN の使用は、デフォルトでは無効になっています。_(v6.20.0+)_ |
| `CMD_PORT`                                  | 数値  | 0 から 65534 までの有効なポート番号。Datadog Agent はコマンド API をポート 5001 で公開します。このポートが既に別のプログラムで使用されている場合は、この変数でデフォルトを上書きできます。                                               |
| `PROXY_HOST`                                | 文字列  | プロキシを使っている場合は、プロキシホストを設定します。[Datadog Agent でのプロキシの使用についてさらに詳しく][2]。                                                                                                                                 |
| `PROXY_PORT`                                | 数値  | プロキシを使っている場合は、プロキシポートを設定します。[Datadog Agent でのプロキシの使用についてさらに詳しく][2]。                                                                                                                                 |
| `PROXY_USER`                                | 文字列  | プロキシを使っている場合は、プロキシユーザーを設定します。[Datadog Agent でのプロキシの使用についてさらに詳しく][2]。                                                                                                                                 |
| `PROXY_PASSWORD`                            | 文字列  | プロキシを使っている場合は、プロキシパスワードを設定します。プロセス/コンテナ Agent の場合は、認証パスワードの受け渡しのためにこの変数は必須で、名前を変えることはできません。[Datadog Agent でのプロキシの使用についてさらに詳しく][2]。 |
| `DDAGENTUSER_NAME`                          | 文字列  | Agent インストール時に使用されるデフォルトの `ddagentuser` ユーザー名を上書きします _(v6.11.0 以降)_。[Datadog Windows Agent ユーザーについては、こちらを参照してください][3]。                                                                                      |
| `DDAGENTUSER_PASSWORD`                      | 文字列  | Agent インストール時に `ddagentuser` ユーザー用に生成された暗号論的に安全なパスワードを上書きします _(v6.11.0 以降)_。ドメインサーバー上のインストールにはこれを提供する必要があります。[Datadog Windows Agent ユーザーについては、こちらを参照してください][3]。  |
| `APPLICATIONDATADIRECTORY`                  | パス    | 構成ファイルのディレクトリツリーに使用するディレクトリを上書きします。初期インストール時にのみ提供でき、アップグレードでは無効です。デフォルト: `C:\ProgramData\Datadog` _(v6.11.0 以降)_                                           |
| `PROJECTLOCATION`                           | パス    | バイナリファイルのディレクトリツリーに使用するディレクトリを上書きします。初期インストール時にのみ提供でき、アップグレードでは無効です。デフォルト: `%ProgramFiles%\Datadog\Datadog Agent` _(v6.11.0 以降)_                                    |
| `ADDLOCAL`                                  | 文字列  | 追加の Agent コンポーネントを有効にします。`"MainApplication,NPM"` に設定すると、[ネットワークパフォーマンスモニタリング][4]のドライバーコンポーネントがインストールされます。                                                                          |
| `EC2_USE_WINDOWS_PREFIX_DETECTION`          | Boolean | EC2 上の Windows ホストの EC2 インスタンス ID を使用します。_(v7.28.0+)_                                                                                                                                                                      |

**注**: 有効な `datadog.yaml` が見つかり、API キーが設定されている場合は、そのファイルが、指定されているすべてのコマンドラインオプションより優先されます。

[1]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi
[2]: /ja/agent/proxy/
[3]: /ja/agent/faq/windows-agent-ddagent-user/
[4]: /ja/network_monitoring/performance
{{% /tab %}}
{{% tab "アップグレード" %}}

Agent 7 は Python 3 のみをサポートします。アップグレードする前に、カスタムチェックが Python 3 と互換性があることを確認します。詳細については、[Python 3 カスタムチェックの移行][1]ガイドを参照してください。カスタムチェックを使用していないか、既に互換性を確認している場合は、[GUI](?tab=gui) または[コマンドライン](?tab=commandline)の手順を使用してアップグレードします。

< 5.12.0 の Datadog Agent バージョンからアップグレードする場合は、最初に [EXE インストーラー][2]を使用して Agent 5 のより新しいバージョン（>= 5.12.0 だが < 6.0.0）にアップグレードしてから、 Datadog Agent バージョン >= 6 にアップグレードします。

[1]: /ja/agent/guide/python-3/
[2]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe
{{% /tab %}}
{{< /tabs >}}

### インストールログファイル

Agent のインストールログファイルは `%TEMP%\MSI*.LOG` にあります。

### 検証

インストールを確認するには、[Agent のステータスと情報](#agent-status-and-information) セクションの手順に従ってください。

## Agent のコマンド

Agent の実行は、Windows サービスコントロールマネージャーによって制御されます。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

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
| regimport       | レジストリ設定を `datadog.yaml` にインポートします。                                |
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

{{% /tab %}}
{{% tab "Agent v5" %}}

(スタートメニューにある) Datadog Agent Manager を使用します。

{{< img src="agent/basic_agent_usage/windows/windows-start-menu.png" alt="Windows のスタートメニュー" style="width:75%;">}}

Datadog Agent Manager で `start`、`stop`、および `restart` コマンドを使用します。

{{< img src="agent/basic_agent_usage/windows/manager-snapshot.png" alt="Manager のスナップショット" style="width:75%;">}}

Windows PowerShell で、次のコマンドを使用することもできます。
`[start|stop|restart]-service datadogagent`

{{% /tab %}}
{{< /tabs >}}

## コンフィギュレーション

[Datadog Agent Manager][6] を使ってチェックを有効化、無効化、および構成します。Agent を再起動して変更内容を適用します。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}
メインの Agent 構成ファイルの場所:
`C:\ProgramData\Datadog\datadog.yaml`
{{% /tab %}}
{{% tab "Agent v5" %}}

メインの Agent 構成ファイルの場所:
`C:\ProgramData\Datadog\datadog.conf`
{{% /tab %}}
{{< /tabs >}}

インテグレーション用構成ファイルの場所:
`C:\ProgramData\Datadog\conf.d\` または
`C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`

**注**: `ProgramData` は隠しフォルダーです。

## トラブルシューティング

### Agent のステータスと情報

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

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

{{% /tab %}}
{{% tab "Agent v5" %}}

Agent が実行されていることを確認するには、サービスパネルでサービスのステータスが "Started" になっているかどうかをチェックします。また、`ddagent.exe` というプロセスがタスクマネージャーに存在している必要があります。

Agent v5.2+ では、Agent の状態に関する情報は、
Datadog Agent Manager -> Settings -> Agent Status で確認できます。

{{< img src="agent/faq/windows_status.png" alt="Windows ステータス" style="width:50%;" >}}

Agent v3.9.1 ～ v5.1 のステータスを確認する場合は、`http://localhost:17125/status` に移動します。

PowerShell では、次の info コマンドを使用できます。

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" info
```

cmd.exe では、次のようにします。

```
"%ProgramFiles%\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" "%ProgramFiles%\Datadog\Datadog Agent\agent\agent.py" info
```

**注**: Agent バージョンが <= 6.11 の場合、パスは上記ではなく `%ProgramFiles%\Datadog\Datadog Agent\embedded\python.exe` にする必要があります。

{{% /tab %}}
{{< /tabs >}}

### ログの場所

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

Agent のログは `C:\ProgramData\Datadog\logs\agent.log` にあります。

**注**: `ProgramData` は隠しフォルダーです。

ご不明な点は、[Datadog のサポートチーム][1]までお問合せください。

[1]: /ja/help/
{{% /tab %}}
{{% tab "Agent v5" %}}

Windows Server 2008/Vista 以降のシステムでは、Agent のログは `C:\ProgramData\Datadog\logs` にあります。

**注**: `ProgramData` は隠しフォルダーです。

ご不明な点は、[Datadog のサポートチーム][1]までお問合せください。

[1]: /ja/help/
{{% /tab %}}
{{< /tabs >}}

### フレアの送信

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

* [http://127.0.0.1:5002][1] に移動して Datadog Agent Manager を表示します。

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

[1]: http://127.0.0.1:5002
{{% /tab %}}
{{% tab "Agent v5" %}}

Datadog のサポートチームに Windows のログと構成のコピーを送信するには、次の手順に従います。

* Datadog Agent Manager を開きます。

* Actions を選択します。

* Flare を選択します。

* チケット番号を入力します (お持ちでない場合は、値をゼロのままにしてください)。

* Datadog へのログインに使用するメールアドレスを入力します。

{{< img src="agent/faq/windows_flare.jpg" alt="Windows フレア" style="width:70%;">}}

PowerShell では、次の flare コマンドを使用できます。

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" flare <CASE_ID>
```

cmd.exe では、次のようにします。

```
"%ProgramFiles%\Datadog\Datadog Agent\embedded\python.exe" "%ProgramFiles%\Datadog\Datadog Agent\agent\agent.py" flare <CASE_ID>
```

#### フレアのアップロードの失敗

flare コマンドの出力で、圧縮されたフレアアーカイブが保存されているディレクトリがわかります。Datadog へのファイルアップロードに失敗した場合は、このディレクトリからファイルを取得して、メールの添付ファイルとして手動で追加することができます。フレアファイルの保存場所 (共通) :
- Linux: `\tmp\`
- MacOS: `$TMPDIR`
- Windows: `C:\Users\<DDAGENTUSER>\AppData\Local\Temp\`

Windows で古いバージョンの Agent を使用している場合、このファイルの場所を見つけるには、Agent の Python コマンドプロンプトから以下を実行します。

**ステップ 1**:

* Agent v5.12+ の場合:
    `"%ProgramFiles%\Datadog\Datadog Agent\dist\shell.exe" since`

* 古いバージョンの Agent の場合:
    `"%ProgramFiles%\Datadog\Datadog Agent\files\shell.exe"`

**ステップ 2**:

```python
import tempfile
print tempfile.gettempdir()
```

例:

{{< img src="agent/faq/flare_fail.png" alt="フレア失敗" style="width:70%;">}}

{{% /tab %}}
{{< /tabs >}}

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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings#agent/windows
[2]: /ja/agent/basic_agent_usage/?tab=agentv6v7#supported-platforms
[3]: /ja/agent/faq/windows-agent-ddagent-user/
[4]: /ja/agent/faq/windows-agent-ddagent-user/#installation-in-a-domain-environment
[5]: /ja/agent/faq/windows-agent-ddagent-user/#domain-controllers
[6]: /ja/agent/guide/datadog-agent-manager-windows/
[7]: /ja/integrations/wmi_check/
[8]: https://app.datadoghq.com/monitors#create/integration
[9]: /ja/infrastructure/process/?tab=linuxwindows#installation
[10]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[11]: /ja/agent/guide/agent-commands/#restart-the-agent