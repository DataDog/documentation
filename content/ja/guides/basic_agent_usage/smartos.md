---
last_modified: 2015/04/02
translation_status: complete
language: ja
title: Agentの基本的な使用方法 (SmartOS)
---

<!--
======================================================
OVERVIEW
======================================================
-->

<!-- <h3 id="overview">Overview</h3>

This guide will outline the basic functionality of the Datadog Agent.
If you haven't installed the Agent yet, instructions can be found
<a href='https://app.datadoghq.com/account/settings#agent/smartos'>here</a>.<br/> -->

<h3 id="overview">概要</h3>

このガイドでは、Datadog Agentの基本的な機能を説明します。
まだDatadog Agent のインストールを済ませていない場合は、<a href='https://app.datadoghq.com'>Datadog</a> にloginした状態で、該当OSの
<a href='https://app.datadoghq.com/account/settings#agent'>Agent</a> ページのインストール手順も合わせてご参照ください。

<!--
======================================================
Starting and Stopping the Agent
======================================================
-->

<!-- <h3 id="starting_and_stopping_the_agent">Starting and Stopping the Agent</h3>

To manually start the Agent: <br/>

<%= console 'svcadm enable datadog' %>

To stop the Agent: <br/>

<%= console 'svcadm disable datadog' %>

To restart the Agent: <br/>

<%= console 'svcadm restart datadog' %> -->

<h3 id="starting_and_stopping_the_agent">Datadog Agent の起動と停止</h3>

手動で Datadog Agent を起動する:

<%= console 'svcadm enable datadog' %>

停止する:

<%= console 'svcadm disable datadog' %>

リスタートする:

<%= console 'svcadm restart datadog' %>

<!--
======================================================
Status and Information
======================================================
-->

<!-- <h3 id="status_and_information">Status and Information</h3>

To check if the Agent is running:

<%= console 'svcs datadog' %>

To receive more information about the Agent's state:

<%= console '/opt/local/datadog/bin/info' %>

Tracebacks for errors can be retrieved by setting the <code>-v</code> flag: <em>(since 3.8.0)</em>

<%= console '/opt/local/datadog/bin/info -v' %> -->

<h3 id="status_and_information">動作ステータスの確認</h3>

Datadog Agent が起動しているか確認する:

<%= console 'svcs datadog' %>

Datadog Agent のステータスに関する情報を収集する:

<%= console '/opt/local/datadog/bin/info' %>

エラーをトレースバックする: <code>-v</code> フラグをinfoコマンドに追記する。 <em>(ver. 3.8.0 ~)</em>

<%= console '/opt/local/datadog/bin/info -v' %>


<!--
======================================================
Configuration
======================================================
-->

<!-- <h3 id="configuration">Configuration</h3>

The configuration file for the Agent is located at <code>/opt/local/datadog/agent/datadog.conf</code>

Configuration files for integrations are located in <code>/opt/local/datadog/agent/conf.d/</code> -->

<h3 id="configuration">設定ファイルの保存されているディレクトリ</h3>

Datadog Agent の設定ファイルの保存先 <code>/opt/local/datadog/agent/datadog.conf</code>

インストールしたIntegrations の設定ファイルの保存先 <code>/opt/local/datadog/agent/conf.d/</code>


<!--
======================================================
Troubleshooting
======================================================
-->

<!-- <h3 id="troubleshooting">Troubleshooting</h3>

First, make sure you are using the correct version of Python. The Agent requires version 2.6 or greater. You can check your version by executing:

<%= console "cd /opt/local/datadog/agent && python -c 'import config; print config.get_version()'" %>

Next, try running the <a href='#status_and_information'>info</a> command to see the state of the Agent.

Logs for the subsystems are in the following files:

<ul>
  <li><code>/opt/local/datadog/logs/supervisord/collector.log</code></li>
  <li><code>/opt/local/datadog/logs/supervisord/dogstatsd.log</code></li>
  <li><code>/opt/local/datadog/logs/supervisord/forwarder.log</code></li>
</ul>

<br/>

If you're still having trouble, our support team will be glad to provide further assistance.
You can contact them in one of the following ways:

<%= render '_contact_info', :heading_size => 5, :hide_datadog => true %> -->

<h3 id="troubleshooting">トラブルシューティング</h3>

まず、次のコマンドを実行し、Pythonのバージョンを確認してください。Datadog Agent を実行するには、Python-2.6 以上が必要です。

<%= console "cd /opt/local/datadog/agent && python -c 'import config; print config.get_version()'" %>

バージョン要件を満たしていれば、<a href='#status_and_information'>info</a> コマンドを実行することによって、Datadog Agentのステータス情報を表示することができます。

それぞれの細分化された要素(機能別)のログ関しては、以下のファイルに記録されています:

<ul>
  <li><code>/opt/local/datadog/logs/supervisord/collector.log</code></li>
  <li><code>/opt/local/datadog/logs/supervisord/dogstatsd.log</code></li>
  <li><code>/opt/local/datadog/logs/supervisord/forwarder.log</code></li>
</ul>

<br/>

上記の方法を実行しても問題が解決しない場合は、 <a href="/ja/help/" target="_top">サポートチーム</a>にご連絡ください。
