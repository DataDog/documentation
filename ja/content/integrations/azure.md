---
last_modified: 2015/07/05
translation_status: translated
language: ja
title: Datadog-Microsoft Azure Integration
integration_title: Microsoft Azure
kind: integration
doclevel: complete
sidebar:
  nav:
    - header: Azure インテグレーション
    - text: Azure監視機能の設定
      href: "#monitoring"
    - text: Datadog Agentのインストール
      href: "#agents"
    - text: トラブルシュート
      href: "#troubleshooting"
aliases:
  - /ja/guides/azure/
---

<!-- ## Configure Azure Monitoring -->

## Azure監視機能の設定

<!-- Microsoft Azure supports both PaaS and IaaS (VM) services. Right now Datadog monitoring is tailored for IaaS services. But it can also be installed in worker and web roles. -->

Microsoft Azureは、PaaSのとIaaS(VM)の両方のサービスをサポートしています。現状Datadogの監視は、IaaSのサービスを主たる監視対象として調整されています。しかし、この監視をワーカープロセスやwebサーバまで広げることが出来ます。

<!-- To setup Azure monitoring, go to [Azure integrations][1] and follow instructions on the page. -->

Azureの監視を設定するには、[Azure integrations][1] に移動し、インストラクションタイルに表示される指示に従って下さい。

<!-- #### Enable diagnostics -->

### Diagnosticsを有効にする。

<!-- To enable agent-less monitoring, you must enable diagnostics. Right now this is only support by Windows based machines. To do this, first go to [Azure preview portal][2] then follow the instructions below. -->

Datadog Agentをインストールせずに監視するには、Azureのdiagnostics機能を有効にします。現状、この機能はWindowsベースのVMについてのみ対応しています。有効にするには、[Azureのポータル][2]に移動し、次のインストラクションに従って操作をします。

{{< img src="integrations/azure/azure_diag_manual.png" alt="azure diag manual" >}}

<!-- After locating your VM:

1. Click on the CPU percentage today panel to show metrics panel
2. Click on Diagnostics
3. Shift the switch to open
4. Click OK to save your changes -->

VMを指定した後の手順:

1. "CPU percentage today"(現状のCPUのパーセンテージ)が表示されているパネルをクリックします。
2. "Diagnostics"をクリックします。
3. Statusスイッチを"ON"にします。
4. "OK"をクリックして設定を保存します。

<!-- Datadog only requires Basic metrics, network and web metrics as well as .Net metrics to function correctly. Un-check logs collection could save you some storage space. -->

Datadogの監視が正しく動作するためには、"Basic metrics", "network and web metrics", ".Net metrics"を有効にする必要があります。更に、"logs collection"のチェックマークを外すことでストレージのスペースを節約することもできます。

<!-- ## Deploy agents -->

## Datadog Agentのインストール

### Azureポータルからのインストール

Datadogは、Azure Extension Managerに対応しています。これにより、AzureのポータルからDatadog Agentをインストールすることが出来ます。Azure上で起動しているVMがWindowsかLinuxに関わらず、ワンクリックでDatadog Agentをインストールすることが出来ます。ワンクリックでのインストールを実行するには、[
Azureのポータル](http://portal.azure.com)から、運用中のVMを選択するか、新しいVMを起動しDatadog Agentの追加をクリックします。

{{< img src="azure-image-4.gif" alt="Azure performance monitoring with One-Click Deployment through Datadog" >}}

インストール手順:

1. 新規または既存の仮想マシンに移動し、`Settings`をクリックします。
2. `Extensions`-> `Add` -> `Datadog` とクリックしていきます。
3. `Create`をクリックし、APIキーを入力します。

[Datadog APIキー](https://app.datadoghq.com/azure/landing/)は、Azureのインテグレーションタイル内で見つけることが出来ます。

### 手作業でのインストール

<!-- You can either deploy agents manually by following the instructions -->

次の手順に従って、手作業でDatadog Agentをインストールすることも出来ま:

<!-- ### Install the Agent on instance startup

**Create** a file called `installDatadogAgent.cmd` with the following contents: -->

#### インスタンスの起動時にDatadog Agentをインストールする

以下の内容でinstallDatadogAgent.cmdという名前のファイルを作成します:

    set log=datadog-install.log
    set api_key=%1

    sc query | findstr DatadogAgent
    if ERRORLEVEL 1 (
        echo "Datadog Agent service not detected" >> %log%
        echo "Starting the installation" >> %log%
        reg query "HKLM\SOFTWARE\Microsoft\NET Framework Setup\NDP\v3.5"| findstr /c:"Install    REG_DWORD    0x1"

        if ERRORLEVEL 1 (
            echo "Installing .NET 3.5" >> %log%
            powershell -Command "Import-Module ServerManager;Add-WindowsFeature -Name 'Net-Framework-Core'"
        ) else (
            echo ".NET 3.5 already installed" >> %log%
        )

        if exist ddagent.msi (
            echo "Already has the installer" >> %log%
        ) else (
            echo "Fetching the Agent Installer" >> %log%
            powershell -Command "(New-Object System.Net.WebClient).DownloadFile('https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli.msi', 'ddagent.msi')"
        )

        echo "Starting the installer" >>%log%
        msiexec.exe /qn /i ddagent.msi APIKEY=%api_key% /L+ %log%
    ) else (
        echo "Agent already exists, skipping install" >>%log%
    )

    echo "Finished Install" >>%log%
    exit 0

<!-- If you are using Visual Studio, make sure that the file is included in the package: Set the *Copy to Output Directory* property of the file to *Copy Always* and make sure that the *Build Action* is *Content* . -->

Visual Studioを使用している場合は、このファイルがパッケージに含まれていることを確認してください。
また、このファイルの*Copy to Output Directory*プロパティーを*Copy Always*に設定し、*Build Action*を*Content*にしてください。

<!-- **Add** the installation task to your `ServiceDefinition.csdef` file by adding the following in the `<Startup>` section:

    <Task commandLine="installDatadogAgent.cmdi YOUR_API_KEY" executionContext="elevated" />
-->

`ServiceDefinition.csdef`ファイルの`<Startup>`セクションに、次の部分を追記することによって、インストールタスクを追加します:

    <Task commandLine="installDatadogAgent.cmdi YOUR_API_KEY" executionContext="elevated" />

<!-- Be sure to replace `YOUR_API_KEY` with your API key found at [here](https://app.datadoghq.com/account/settings#api).

The created file will download and install the latest version of the Agent on application deploy. -->

``YOUR_API_KEY``の部分は、Datadogのダッシュボードから[API key](https://app.datadoghq.com/account/settings#api)を取得し、置き換えてください。

ここで作成したファイルにより、アプリケーションデプロイで最新バージョンのDatadog Agentがインストールされます。

<!-- ### Deploy your app

You should now repackage your app's cloud service package file (*.cspkg), making sure to include the `installDatadogAgent.cmd` file in the package.
You can also directly upload from Visual Studio using the `Publish` button.

On deploy you should see your new hosts appear on your infrastructure overview:

-->

#### アプリケーションのデプロイ

ここで、アプリケーションのcloud service packageファイル(*.cspkg)を再パッケージします。
その際、`installDatadogAgent.cmd`ファイルが含まれていることを確認しておいてください。
更に、Visual Studioの`Publish`ボタンを押し、直接Datadog Agentをアップロードすることもできます。

デプロイが終われば、Datadogダッシュボードの`Ingrastractures`タブから表示されるホストリストに新しいホストが加わっているはずです:

{{< img src="guides/azure/azure_infrastructure_overview.png" alt="infrastructure view" >}}

<!-- ## Troubleshooting -->

## トラブルシュート

<!-- Here are some common issues you might be seeing. -->

次に一般的に遭遇しやすいトラブルの対処方法を紹介します。

<!-- ### I don't know my tenent name
To locate your tenent name first log into the current [Azure portal]
After logging in, locate the settings page on the left side of the screen.
{{< img src="integrations/azure/azure_tenent.png" >}}

The text in the red box shown in sceenshot above is your tenent name. Please only include text between parentheses. -->

### Tenent name(テナント名)がわかりません。
Tenent nameを知るためには、まずAzureのポータル へログインします。その後、スクリーンの左側にあるメニューからSETTINGS(設定)を探し、クリックします。赤枠で囲った部分がTenent name(テナント名)になります。

{{< img src="integrations/azure/azure_tenent.png" alt="azure tenent" >}}

<!-- ### Unable to login
If you have experienced error logging in while trying to install the integration, please reach out to [support@datadoghq.com][3]. When possible, please attache screen shot. -->

### ログインすることが出来ません。
Azureのインテグレーションをインストールする際にログインすることが出来ない場合は、お気兼ねなく[support@datadoghq.com][3]にお問い合わせ下さい。お問い合わせの際は、スクリーンショット画像の添付をお願いします。

<!-- ### No metrics are showing up
Please make sure you have enabled diagnostics on your VMs. Diagnostics allows VMs to collect logging information which includes metrics for CPU, Network etc. -->

### メトリクスが表示されません。

#### Agentをインストールしていない場合:
VM上でDiagnostics機能が"ON"になっていることを確認して下さい。このDiagnostics機能は、各VMがCPU, Networkなどのログ情報を取得することを許可します。

#### Agentをインストールした場合で、Agentからのメトリクスが表示されない場合:
VMが持っている時間が、正しく設定されているか確認して下さい。Datadogに送信されるメトリクス情報に記録されている時間が、現在の時間と大きく離れているとグラフに表示されないことが有ります。

   [1]: https://app.datadoghq.com/account/settings#integrations/azure
   [2]: https://portal.azure.com
   [3]: mailto:support@datadoghq.com
