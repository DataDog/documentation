---
last_modified: 2015/05/20
translation_status: complete
language: ja
title: Agentの基本的な使用方法 (Windows)
---

<!--
======================================================
Overview
======================================================
-->

<!-- <h3 id="overview">Overview</h3>

This guide will outline the basic functionality of the Datadog Agent.
If you haven't installed the Agent yet, instructions can be found
<a href='https://app.datadoghq.com/account/settings#agent/windows'>here</a>. -->

### 概要

このガイドでは、Datadog Agentの基本的な機能を説明します。
まだDatadog Agent のインストールを済ませていない場合は、<a href='https://app.datadoghq.com'>Datadog</a> にloginした状態で、該当OSの
<a href='https://app.datadoghq.com/account/settings#agent/windows'>Agent</a> ページのインストール手順も合わせてご参照ください。

<!--
======================================================
Starting and Stopping the Agent
======================================================
-->

<!-- <h3 id="starting_and_stopping_the_agent">Starting and Stopping the Agent</h3>

The execution of the Agent is controlled by a Windows service.

<h4>For version >= 3.9.1</h4>
You can use the Datadog Agent Manager that you can find in the Start Menu.
<p>{{< img src="windows-start-menu.png" >}}</p>
<p>{{< img src="manager-snapshot.png" >}}</p>

<h4>For version < 3.9.1</h4>
The Agent can be started, stopped, and
restarted from the Services panel. To view the Services panel, execute the following in a <code>cmd.exe</code> shell:

    services.msc

Once you're in the console, find the "Datadog Agent" service.
Right clicking on the service will reveal options to start, stop, and restart the Agent. -->

### Datadog Agent の起動と停止

Datadog Agentの実行は、Windows serviceによって管理されています。

<!--　<h4>Datadog Agent バージョン >= 3.9.1の場合:</h4>　-->

#### Datadog Agent バージョン >= 3.9.1:
スタートメニューに表示されるDatadog Agent Managerを使います。
{{< img src="guides/basic_agent_usage/windows/windows-start-menu.png" >}}

{{< img src="guides/basic_agent_usage/windows/manager-snapshot.png" >}}

<!--　<h4>Datadog Agent バージョン < 3.9.1の場合:</h4>　-->

#### Datadog Agent バージョン < 3.9.1:
サービスパネルからDatadog Agentの起動、停止、再起動が行えます。サービスパネルの画面を表示するには、コマンドプロンプト<code>cmd.exe</code> shell にて次のコマンドを実行します。

    services.msc

サービスパネル<!--コンソール-->に入ったら、"Datadog Agent"というサービスを探します。名前にカーソルを合わせ右クリックすると起動、停止、再起動のオプションが表示されます。

<!--
======================================================
Status and Information
======================================================
-->

<!-- <h3 id="status_and_information">Status and Information</h3>
To check if the Agent is running, check if the service status in the Services panel is listed as "Started".
A process called "ddagent.exe" should also exist in the Task Manager.

To receive more information about the Agent's state, visit the <em>status page</em> in your web browser:

    http://localhost:17125/status

<em>The status page is supported in Agent version 3.9.1 and above</em> -->

### 動作ステータスの確認

Datadog Agent が動作していることを確認するには、サービスパネルのステータスが"Started"になっていることを確認します。その際、"ddagent.exe" プロセスがタスクマネージャーに表示されていることを確認してください。

Datadog Agent の状況に関し更なる情報を取得するには、ブラウザで次のURLの<em>status page</em>を表示します。

    http://localhost:17125/status

<em>このステータスページは、Datadog Agent 3.9.1以降に実装されています。</em>

<!--
======================================================
Configuration
======================================================
-->

<!-- <h3 id="configuration">Configuration</h3>
<h4>For version >= 3.9.1</h4>
You can use the Datadog Agent Manager located in the start menu to enable, disable and configure checks.
You have to restart the agent in order for your changes to be applied.

<h4>For version < 3.9.1</h4>

The configuration file location depends on the version of Windows on which the Agent is installed.

For Windows Server 2003, XP or older:
<ul>
    <li>Agent configuration:
        <code>C:\Documents and Settings\All Users\Application Data\Datadog\datadog.conf</code></li>
    <li>Integration configuration:
        <code>C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\</code></li>
</ul>

For Windows Server 2008, Vista and newer:
<ul>
    <li>Agent configuration:
        <code>C:\ProgramData\Datadog\datadog.conf</code></li>
    <li>Integration configuration:
        <code>C:\ProgramData\Datadog\conf.d\</code></li>
</ul> -->

### 設定ファイルの保存されているディレクトリ

#### Datadog Agent バージョン >= 3.9.1:

スタートメニューにあるDatadog Agent Manager から、設定ファイルのチェック、有効、無効ができます。
設定ファイルの変更を適応するには、Datadog Agent の再起動が必要です。

#### Datadog Agent バージョン < 3.9.1:

設定ファイルの保存場所は、Windowsのバージョンによって異なります。

Windows Server 2003, XP 又は、それ以前のバージョン:

- Datadog Agent の設定ファイルの保存先:
        `C:\Documents and Settings\All Users\Application Data\Datadog\datadog.conf`
- Integrations の設定ファイルの保存先:
        `C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`

Windows Server 2008, Vista と、それ以降のバージョン:

- Datadog Agent の設定ファイルの保存先:
        `C:\ProgramData\Datadog\datadog.conf`
- Integrations の設定ファイルの保存先:
        `C:\ProgramData\Datadog\conf.d\`

<!--
======================================================
Troubleshooting
======================================================
-->

<!-- <h3 id="troubleshooting">Troubleshooting</h3>

First, check if the Agent is running in the Services panel and in the Task Manager.

Next, try opening the <a href='#status_and_information'>status page</a> to see the state of the Agent.

<h4>For version >= 3.9.1</h4>
Log is available at:
<ul>
    <li>For Windows Server 2003, XP or older:
       <code>C:\Documents and Settings\All Users\Application Data\Datadog\logs\ddagent.log</code></li>
    <li>For Windows Server 2008, Vista and newer:
        <code>C:\ProgramData\datadog\logs\ddagent.log</code></li>
</ul>

<h4>For version < 3.9.1</h4>
Logs for the subsystems are available in Event Viewer, under Windows Logs &rarr; Application.

If you're still having trouble, our support team will be glad to provide further assistance.
You can contact them in one of the following ways:

{{< partial name="_contact_info-ja" markdown="true" >}}
 -->

<h3 id="troubleshooting">トラブルシューティング</h3>

最初にサービスパネルとタスクマネージャーでDatadog Agent が動作していることを確認してください。
次に、<a href='#status_and_information'>ステータスページ</a>をブラウザで表示し、Datadog Agent の状況を確認します。

#### Datadog Agent バージョン >= 3.9.1:
ログの保存場所:

- Windows Server 2003、XP 又は、それ以前のバージョン:
      `C:\Documents and Settings\All Users\Application Data\Datadog\logs\ddagent.log`
- Windows Server 2008、Vista と、それ以降のバージョン:
      `C:\ProgramData\datadog\logs\ddagent.log`

#### Datadog Agent バージョン < 3.9.1:
Datadog Agent の各要素のログは、"Event Viewer"で確認できます。Windows Logs &rarr; Application へとメニューを選択してください。

上記の方法を実行しても問題が解決しない場合は、 <a href="https://docs.datadoghq.com/ja/help/" target="_top">サポートチーム</a>にご連絡ください。

{{< partial name="_contact_info-ja" markdown="true" >}}
