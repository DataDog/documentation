---
aliases:
- /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/windows
code_lang: windows
code_lang_weight: 30
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: ドキュメント
  text: ランタイムメトリクスを有効にする
title: Windows での Single Step APM インスツルメンテーション
type: multi-code-lang
---
## 概要 {#overview}

Single Step Instrumentation (SSI) により、単一の Datadog Agent インストールコマンドを使用して、Windows VM 上の Java および .NET アプリケーションで APM を有効にできます。

{{< skill-callout
    title="エージェントを使用して APM をセットアップする"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## Windows で APM を有効にする {#enable-apm-on-windows}

<div class="alert alert-info">続行する前に、<a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">SSI 互換性ガイド</a>を確認して、環境に互換性があることを確認してください。</div>

### 新しい Agent インストール {#new-agent-installation}

Datadog Agent がまだインストールされていない場合は、以下の手順に従って Agent をインストールし、同時に SSI を有効にします。

Windows で APM を有効にするには、以下の方法があります。
* IIS 上の .NET アプリケーションのみをインスツルメントする
* Windows ホスト全体のすべての Java および .NET アプリケーションをインスツルメントする

{{< tabs >}}
{{% tab "IIS" %}}

IIS で実行されている .NET アプリケーションのみをインスツルメントするには、以下の手順を実行します。

1. Windows ホスト上の管理者 PowerShell セッションから、以下のいずれかのコマンドを実行します。`<YOUR_DD_API_KEY>` をユーザーの [Datadog API キー][2] に置き換えます。

   PowerShell インストーラーを使用します。

   ```powershell
   [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; $env:DD_API_KEY = '<YOUR_DD_API_KEY>'; $env:DD_SITE = '{{< region-param key="dd_site" >}}'; $env:DD_APM_INSTRUMENTATION_ENABLED = 'iis'; $env:DD_APM_INSTRUMENTATION_LIBRARIES = 'dotnet:3'; (New-Object System.Net.WebClient).DownloadFile('https://install.datadoghq.com/datadog-installer-x86_64.exe', 'C:\Windows\SystemTemp\datadog-installer-x86_64.exe'); C:\Windows\SystemTemp\datadog-installer-x86_64.exe
   ```

   Alternatively, install with the MSI:

   ```powershell
   $p = Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /norestart /i "https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi" /log C:\Windows\SystemTemp\install-datadog.log APIKEY="<YOUR_DD_API_KEY>" SITE="{{< region-param key="dd_site" >}}" DD_APM_INSTRUMENTATION_ENABLED="iis" DD_APM_INSTRUMENTATION_LIBRARIES="dotnet:3"'
   if ($p.ExitCode -ne 0) { Write-Host "msiexec failed with exit code $($p.ExitCode) please check the logs at C:\Windows\SystemTemp\install-datadog.log" -ForegroundColor Red }
   ```

   To install a different .NET version, change `dotnet:3`, or omit `DD_APM_INSTRUMENTATION_LIBRARIES` to install the latest.

   **Note**: The Chocolatey installation method does not preserve the SSI settings and cannot be used to enable SSI.

1. Restart the IIS applications you want instrumented. (You do not need to restart the entire IIS server.)

The Agent then automatically loads the Datadog .NET SDK into supported application processes to enable distributed tracing.

**Generate the command from Datadog**: To get a command pre-filled with your API key and site, go to [Install the Datadog Agent on Windows][1] and, in the {{< ui >}}Customize your observability coverage{{< /ui >}} section, toggle {{< ui >}}Application Performance Monitoring (APM){{< /ui >}}. To pin the .NET SDK version, select {{< ui >}}Customize Library Versions{{< /ui >}} under {{< ui >}}Instrumentation Configuration{{< /ui >}}. Then copy and run the generated command.

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[2]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}

{{% tab "Host-wide (プレビュー)" %}}

<div class="alert alert-info">
<strong>プレビューに参加しましょう。</strong><br>
Windows の Host-wide インスツルメンテーションはプレビュー版で、プレビュー参加者に限定されています。このタブで説明されているインストールおよび構成オプションは、登録後にのみ Datadog に表示されます。<a href="https://www.datadoghq.com/product-preview/single-step-instrumentation-on-windows-vms/" class="alert-link">アクセスをリクエスト</a>してプレビューに参加しましょう。
</div>

Windows ホスト全体で Java および .NET アプリケーションをインスツルメントするには、以下の手順を実行します。

1. Datadog で、[Windows に Datadog Agent をインストールする][1] に移動します。
1. {{< ui >}}Customize your observability coverage{{< /ui >}} セクションで、{{< ui >}}Application Performance Monitoring (APM){{< /ui >}} を切り替えます。
1. (オプション) SDK バージョンを設定します。
   
   デフォルトでは、シングルステップインスツルメンテーションはサポートされている最新バージョンの Datadog .NET および Java SDK をインストールします。特定のバージョンを固定する必要がある場合:

   1. {{< ui >}}Instrumentation Configuration{{< /ui >}} で、{{< ui >}}Customize Library Versions{{< /ui >}} を選択します。
   1. .NET で、使用するバージョンを選択します。

1. 提供されたインストールコマンドをコピーし、Windows ホストで実行します。Datadog は、プレビューに登録された後、アプリ内でこのコマンドを生成します。
1. インスツルメンテーションルールを構成します。

   ホスト全体の SSI は、ホスト上のすべての Java アプリケーションと、IIS で実行されているすべての .NET アプリケーションを自動的にインスツルメントします。IIS の外部で実行されている .NET アプリケーションをインスツルメントするには、それらを許可する[インスツルメンテーションルールを定義する](#define-instrumentation-rules)必要があります。インスツルメンテーションルールを使用して、ホスト上のどの Java アプリケーションまたは IIS 内のどの .NET アプリケーションをインスツルメントするかを詳細に制御することもできます。

1. インスツルメントするサービスを再起動します。

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">SSI は、インスツルメントされたアプリケーションに若干の起動時間を追加します。このオーバーヘッドが実際の状況で受け入れられない場合は、<a href="/help/">Datadog サポート</a>に連絡してください。</div>

### 既存の Agent のインストール {#existing-agent-installation}

Datadog Agent がすでにインストールされている場合は、Fleet Automation を使用して SSI を有効にします。

1. Datadog で、[{{< ui >}}Fleet Automation{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}}][6] に移動します。
1. {{< ui >}}Configure Agents{{< /ui >}} をクリックします。
1. フィルターを適用して、構成する Agent を選択し、**次へ**をクリックします。

   {{< img src="tracing/trace_collection/filter-agents.png" alt="環境、オペレーティングシステム、ホスト名ごとにスコープを設定するオプションがある、Fleet Automation のエージェントフィルタリング画面" style="width:100%;" >}}

1. {{< ui >}}Application Performance Monitoring (APM){{< /ui >}} タイルをクリックし、{{< ui >}}Next{{< /ui >}} をクリックします。

   {{< img src="tracing/trace_collection/select-products-core-obs.png" alt="Application Performance Monitoring (APM) タイルが表示されている Fleet Automation での製品選択画面" style="width:80%;" >}}

1. {{< ui >}}Configure SDKs Installation{{< /ui >}} 画面で {{< ui >}}Yes{{< /ui >}} をクリックして、SDK を自動的にインストールします。{{< ui >}}Use latest version{{< /ui >}} を選択するか、チェックを外して個別の SDK バージョンを指定します。

   {{< img src="tracing/trace_collection/configure-sdks-installation.png" alt="SDK の自動インストールを有効にしてバージョンを選択するオプションがある、Fleet Automation の SDK インストール設定画面" style="width:60%;" >}}

1. {{< ui >}}Next{{< /ui >}} をクリックします。
1. 構成を確認し、{{< ui >}}Deploy Configuration{{< /ui >}} をクリックします。
1. インスツルメンテーションルールを構成します。

   ホスト全体の SSI は、ホスト上のすべての Java アプリケーションと、IIS で実行されているすべての .NET アプリケーションを自動的にインスツルメントします。IIS の外部で実行されている .NET アプリケーションをインスツルメントするには、それらを許可する[インスツルメンテーションルールを定義する](#define-instrumentation-rules)必要があります。インスツルメンテーションルールを使用して、ホスト上のどの Java アプリケーションまたは IIS 内のどの .NET アプリケーションをインスツルメントするかを詳細に制御することもできます。

## インストールを検証する {#verify-the-installation}

1. 管理者 PowerShell セッションから、Agent が正常であり、APM Agent が実行されていることを確認します。

   ```powershell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
   ```

   出力の **APM Agent** セクションをチェックします。

1. インスツルメントされたアプリケーションがトラフィックを受信した後、[APM Services ページ][7] にサービスが表示されることを確認します。数分以内に表示されない場合は、[SSI トラブルシューティングガイド][4] に従ってください。

## 統合サービスタグを構成する {#configure-unified-service-tags}

統合サービスタグ (UST) は、トレース、メトリクス、ログを通じて一貫したタグを適用し、監視可能性データのナビゲートと相関を容易にします。[Windows サービスの USTs を設定する][2] 方法をご覧ください。

## SDK に依存する製品と機能を有効にする {#enable-sdk-dependent-products-and-features}

SSI がアプリケーションに Datadog SDK をロードし、分散トレーシングを有効にした後、SDK に依存する追加の製品を構成できます。

{{< ssi-products >}}

製品を有効にするには、アプリケーション構成で [環境変数を設定][3] してください。

## 高度なオプション {#advanced-options}

### インスツルメンテーションルールを定義する {#define-instrumentation-rules}

{{< site-region region="gov" >}}
<div class="alert alert-warning">インスツルメンテーションルールは、選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) ではサポートされていません。</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<div class="alert alert-info">インスツルメンテーションルール (Agent v7.73 以降で利用可能) は、ホスト全体のインスツルメンテーションにのみ適用されます。IIS のみのインストールではサポートされていません。</div>
{{< /site-region >}}

インスツルメンテーションルールを使用すると、Windows ホスト上で SSI によって自動的にインスツルメントされるプロセスを制御できます。IIS 外で実行されている .NET アプリケーションをインスツルメントするには、ルールが必要です。また、ホスト上のどの Java アプリケーションや IIS 内のどの .NET アプリケーションをインスツルメントするかを詳細に制御する上でも役立ちます。

インスツルメンテーションルールを構成するには、以下の手順を実行します。

1. Datadog で、{{< ui >}}APM{{< /ui >}} > {{< ui >}}Service Setup{{< /ui >}} > [{{< ui >}}Manage Instrumentation Rules{{< /ui >}}][5] に移動します。
1. {{< ui >}}Add or Edit Rules{{< /ui >}} をクリックします。
1. インスツルメンテーションルールを定義します。
   1. {{< ui >}}Add New Rule{{< /ui >}} をクリックし、{{< ui >}}Allow Rule{{< /ui >}} または {{< ui >}}Block Rule{{< /ui >}} を選択して、一致するプロセスをインスツルメントするかどうかを指定します。
   1. ルールに名前を付けます。
   1. 1 つ以上の条件を追加します。詳細については、[ルール条件を定義する](#define-rule-conditions)を参照してください。

     {{< img src="tracing/trace_collection/define_instrumentation_rule.png" alt="ルールを定義するための構成オプションが表示されているインスツルメンテーションルール UI" style="width:100%;" >}}

1. (オプション) ルールをドラッグアンドドロップして並べ替えます。

   **注**: ルールは順番に評価されます。プロセスがルールに一致すると、それ以降のルールは無視されます。

1. どのルールにも一致しないプロセスのデフォルトの動作 (許可またはブロック) を設定します。
1. {{< ui >}}Next{{< /ui >}} をクリックしてルールをプレビューします。
1. {{< ui >}}Deploy Rules{{< /ui >}} をクリックします。

Remote Configuration が有効な場合、ルールはすべてのホストに展開され、SSI が有効なホストには 50 秒以内に適用されます。または、{{< ui >}}Export{{< /ui >}} をクリックして構成ファイルをエクスポートし、ホストに手動で適用します。

#### ルール条件を定義する {#define-rule-conditions}

各ルールは 1 つ以上の条件で構成されます。条件には以下の要素が含まれます。
- {{< ui >}}Attribute{{< /ui >}}: ルールが評価するプロセスプロパティ。
- {{< ui >}}Operator{{< /ui >}}: 比較ロジック (`equals`、`not equals`、`prefix`、または `contains`)。
- {{< ui >}}Value{{< /ui >}}: プロセス名やコマンドラインフラグなど、一致させるテキストまたはパターン。

サポートされている属性には以下が含まれます。
| 属性 | 説明 | 例 |
| --------- | ----------- | ------- |
| オペレーティングシステム | ホストの OS。| `windows` |
| 実行可能ファイル | プロセスの実行可能ファイル名。| `w3wp.exe` |
| 実行可能ファイルの完全なパス | 実行可能ファイルの完全なパス。| `C:\Windows\System32\inetsrv\w3wp.exe` |
| 引数 | プロセスの起動に使用されるコマンドライン引数。| `--env=production` |
| 作業ディレクトリ | プロセスの作業ディレクトリ。| `C:\inetpub\wwwroot` |
| 言語 | プロセスに対して検出されたプログラミング言語。| `dotnet` |
| エントリーポイントファイル | アプリケーションの起動に使用される特定のファイル。| `MyService.dll`、`app.py` |
| IIS アプリケーションプール | ワーカープロセスをホストする IIS アプリケーションプール。すべての IIS ワーカーは `w3wp.exe` 実行可能ファイルを共有するため、これが IIS 上の特定の .NET アプリをターゲットにする最も信頼性の高い方法です。| `DefaultAppPool`、`MyWebApp` |

#### 使用例 {#example-use-cases}

インスツルメンテーションルールの適用方法を示す以下の例をご確認ください。

{{< collapse-content title="例 1: 特定のプロセスを除くすべてのプロセスをインスツルメントする" level="h5" >}}

デフォルトですべてのプロセスをインスツルメントします。分析用の cron ジョブや Java バッチプロセッサなど、価値のないノイズを追加するサービスを除外するために、ブロックルールを追加します。

{{< img src="tracing/trace_collection/instrumentation-rules-example-1.png" alt="作業ディレクトリとエントリーポイントファイルの条件を対象とする 2 つのブロックインスツルメンテーションルール (デフォルトはインスツルメンテーションを許可)" style="width:100%;" >}}

{{< /collapse-content >}}

{{< collapse-content title="例 2: 特定の IIS アプリケーションのみをインスツルメントする" level="h5" >}}

デフォルトですべてのインスツルメンテーションをブロックします。特定の IIS アプリケーションを APM にオプトインさせるために、許可ルールを追加します。すべての IIS ワーカーは <code>w3wp.exe</code> 実行可能ファイルを共有するため、{{< ui >}}IIS Application Pool{{< /ui >}} を使用してターゲットアプリケーションを特定します。このアプローチは、段階的なロールアウトに役立ちます。

{{< img src="tracing/trace_collection/instrumentation-rules-example-2.png" alt="特定の IIS アプリケーションプールを名前でターゲットにする 2 つの許可インスツルメンテーションルール (デフォルトははインスツルメンテーションをブロック)" style="width:100%;" >}}

{{< /collapse-content >}}

## シングルステップ APM インスツルメンテーションを Agent から削除する {#remove-single-step-apm-instrumentation-from-your-agent}

ご利用のホストで .NET の SSI を無効にするには、以下を実行します。

```shell
&"C:\Program Files\Datadog\Datadog Agent\bin\datadog-installer.exe" remove datadog-apm-library-dotnet
```

## トラブルシューティング {#troubleshooting}

SSI で APM を有効にする際に問題が発生した場合は、[SSI トラブルシューティングガイド][4] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[2]: /ja/integrations/windows-service/#tags
[3]: /ja/tracing/trace_collection/library_config/
[4]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[5]: https://app.datadoghq.com/apm/service-setup/workload-selection
[6]: https://app.datadoghq.com/fleet/agent-management
[7]: https://app.datadoghq.com/apm/services