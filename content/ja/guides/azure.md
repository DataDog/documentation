---
last_modified: 2015/04/02
translation_status: complete
language: ja
title: Azure WindowsへDatadog Agentのインストール
kind: guide
listorder: 9

---

<!-- This guide assumes you are deploying an Azure Cloud Service.
Also, at the moment, the Agent install requires .net framework 2.0 or 3.5. -->

このガイドは、Azure Cloud Serviceにデプロイしてることを仮定しています。
現時点では、Datadog Agentのインストールには、.NET Framework 2.0か3.5が必要です。


<!-- ### Install the Agent on instance startup

**Create** a file called `installDatadogAgent.cmd` with the following contents: -->

### インスタンスの起動時にDatadog Agentをインストールする

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


<!-- **Add** the installation task to your `ServiceDefinition.csdef` file by adding the following in the `<Startup>` section: -->

`ServiceDefinition.csdef`ファイルの`<Startup>`セクションに、次の部分を追記することによって、インストールタスクを追加します:


    <Task commandLine="installDatadogAgent.cmdi YOUR_API_KEY" executionContext="elevated" />

<!-- Be sure to replace `YOUR_API_KEY` with your API key found at [here](https://app.datadoghq.com/account/settings#api).

The created file will download and install the latest version of the Agent on application deploy. -->

``YOUR_API_KEY``の部分は、Datadogのダッシュボードから[API key](https://app.datadoghq.com/account/settings#api)を取得し、置き換えてください。

ここで作成したファイルにより、アプリケーションデプロイで最新バージョンのDatadog Agentがインストールされます。


### アプリケーションのデプロイ

<!-- You should now repackage your app's cloud service package file (*.cspkg), making sure to include the `installDatadogAgent.cmd` file in the package.
You can also directly upload from Visual Studio using the `Publish` button.

On deploy you should see your new hosts appear on your infrastructure overview: -->

ここで、アプリケーションのcloud service packageファイル(*.cspkg)を再パッケージします。
その際、`installDatadogAgent.cmd`ファイルが含まれていることを確認しておいてください。
更に、Visual Studioの`Publish`ボタンを押し、直接Datadog Agentをアップロードすることもできます。

デプロイが終われば、Datadogダッシュボードの`Ingrastractures`タブから表示されるホストリストに新しいホストが加わっているはずです:

<img src="/static/images/azure_infrastructure_overview.png" alt="infrastructure view"/>
