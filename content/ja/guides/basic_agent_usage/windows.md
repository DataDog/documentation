---
last_modified: 2017/02/14
translation_status: complete
language: ja
title: Agentの基本的な使用方法 (Windows)
---

<!-- ### Overview

This guide will outline the basic functionality of the Datadog Agent. If you haven't installed the Agent yet, instructions can be found [here][1].
-->

### 概要

このガイドでは、Datadog Agentの基本的な機能を説明します。まだDatadog Agent のインストールを済ませていない場合は、[Datadog][4] にloginした状態で、該当OSの
[Agent][1] ページのインストール手順も合わせてご参照ください。

<!-- ### Starting and Stopping the Agent
{: #starting_and_stopping_the_agent}

The execution of the Agent is controlled by a Windows service.
-->

### Datadog Agent の起動と停止
{: #starting_and_stopping_the_agent}

Datadog Agentの実行は、Windows serviceによって管理されています。


<!-- #### For version >= 3.9.1

You can use the Datadog Agent Manager that you can find in the Start Menu.

![][2]

![][3]

You can also use Windows Powershell if you are running on a modern version of Windows:
`[start|stop|restart]-service datadogagent`
-->

#### Datadog Agent バージョン >= 3.9.1:

スタートメニューに表示されるDatadog Agent Manager を使います。

![][2]

![][3]

最新式のWindowsで実行している場合は、Windows Powershellを使用することもできます:

`[start|stop|restart]-service datadogagent`


<!--　#### For version < 3.9.1

The Agent can be started, stopped, and restarted from the Services panel. To view the Services panel, execute the following in a `cmd.exe` shell: `services.msc`. Once you're in the console, find the "Datadog Agent" service. Right clicking on the service will reveal options to start, stop, and restart the Agent.
-->

#### Datadog Agent バージョン < 3.9.1:
サービスパネルからDatadog Agentの起動、停止、再起動が行えます。サービスパネルの画面を表示するには、コマンドプロンプト`cmd.exe` shell にて次のコマンドを実行します。

<%= console 'services.msc' %>

サービスパネルに入ったら、"Datadog Agent" というサービスを探します。名前にカーソルを合わせ右クリックすると、起動, 停止, 再起動 のオプションが表示されます。


<!-- ### Status and Information

To check if the Agent is running, check if the service status in the Services panel is listed as "Started". A process called "ddagent.exe" should also exist in the Task Manager. To receive more information about the Agent's state, visit the _status page_ by going to **Settings -> Agent Status** in Agent version 5.2 and above and by going to  **http://localhost:17125/status** in Agent version 3.9.1 to 5.1.
-->

### 動作ステータスの確認

Datadog Agent が動作していることを確認するには、サービスパネルのステータスが "Started" になっていることを確認します。その際、"ddagent.exe" プロセスがタスクマネージャーに表示されていることを確認してください。

Datadog Agent の状況に関し更なる情報を取得するには:

* For version => 5.2.

    **Settings -> Agent Status** とクリックしていくとでステータスが表示されます。

* For version 3.9.1 =< 5.1.

    `http://localhost:17125/status`へブラザーでアクセスするとステータスが表示されます。


<!-- ### Configuration

#### For version >= 3.9.1

You can use the Datadog Agent Manager located in the start menu to enable, disable and configure checks. You have to restart the agent in order for your changes to be applied.

#### For version < 3.9.1

The configuration file location depends on the version of Windows on which the Agent is installed. For Windows Server 2003, XP or older:

  * Agent configuration:
`C:\Documents and Settings\All Users\Application Data\Datadog\datadog.conf`
  * Integration configuration:
`C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`

For Windows Server 2008, Vista and newer:

  * Agent configuration:
`C:\ProgramData\Datadog\datadog.conf`
  * Integration configuration:
`C:\ProgramData\Datadog\conf.d\`
-->

### 設定ファイルの保存されているディレクトリ

#### Datadog Agent バージョン >= 3.9.1:

スタートメニューにあるDatadog Agent Manager から、設定ファイルのチェック、有効、無効ができます。
設定ファイルの変更を適応するには、Datadog Agent の再起動が必要です。

#### Datadog Agent バージョン < 3.9.1:

設定ファイルの保存場所は、Windowsのバージョンによって異なります。

Windows Server 2003, XP 又は、それ以前のバージョン:

  * Datadog Agent の設定ファイルの保存先:
        `C:\Documents and Settings\All Users\Application Data\Datadog\datadog.conf`
  * Integrations の設定ファイルの保存先:
        `C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`

Windows Server 2008, Vista と、それ以降のバージョン:

  * Datadog Agent の設定ファイルの保存先:
        `C:\ProgramData\Datadog\datadog.conf`
  * Integrations の設定ファイルの保存先:
        `C:\ProgramData\Datadog\conf.d\`


<!-- ### Troubleshooting

First, check if the Agent is running in the Services panel and in the Task Manager. Next, try opening the status page to see the state of the Agent.

#### For version >= 3.9.1

Log is available at:

  * For Windows Server 2003, XP or older:
`C:\Documents and Settings\All Users\Application Data\Datadog\logs\ddagent.log`
  * For Windows Server 2008, Vista and newer:
`C:\ProgramData\datadog\logs\ddagent.log`

#### For version < 3.9.1

Logs for the subsystems are available in Event Viewer, under Windows Logs -> Application. <br/> If you're still having trouble, our support team will be glad to provide further assistance.
-->

### トラブルシューティング

最初にサービスパネルとタスクマネージャーで Datadog Agent が動作していることを確認してください。
次に、ステータスページを表示し、Datadog Agent の状況を確認します。

#### Datadog Agent バージョン >= 3.9.1:

ログの保存場所:

  * Windows Server 2003、XP 又は、それ以前のバージョン:
      `C:\Documents and Settings\All Users\Application Data\Datadog\logs\ddagent.log`
  * Windows Server 2008、Vista と、それ以降のバージョン:
      `C:\ProgramData\datadog\logs\ddagent.log`

#### Datadog Agent バージョン < 3.9.1:

Datadog Agent の各要素のログは、”Event Viewer”で確認できます。Windows Logs -> Application へとメニューを選択してください。


<!--
If you're still having trouble, our support team will be glad to provide further assistance.
You can contact them in one of the following ways:

<%= render '_contact_info', :heading_size => 5, :hide_datadog => true %>
-->

<br/>
<br/>
上記の方法を実行しても問題が解決しない場合は、 <a href="/ja/help/" target="_top">サポートチーム</a>にご連絡ください。

<%= render '_contact_info-ja', :heading_size => 5, :hide_datadog => false %>


   [1]: https://app.datadoghq.com/account/settings#agent/windows
   [2]: /static/images/windows-start-menu.png
   [3]: /static/images/manager-snapshot.png
   [4]: https://app.datadoghq.com