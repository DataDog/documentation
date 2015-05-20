---
last_modified: 2015/04/02
translation_status: complete
language: ja
title: Agentの基本的な使用方法 (OS X）
---

<!--
======================================================
Overview
======================================================
-->
<!--
<h3 id="overview">Overview</h3>

This guide will outline the basic functionality of the Datadog Agent.
If you haven't installed the Agent yet, instructions can be found
<a href='https://app.datadoghq.com/account/settings#agent/mac'>here</a>.<br/>

By default, your Agent will be installed in its own sandbox located at <code> '~/.datadog-agent'</code>.
You’re free to move this folder wherever you like.
However, this guide will assume that the Agent is installed in its default location, so be sure to modify the
instructions accordingly if you decide to move it to another location. -->

<h3 id="overview">概要</h3>

このガイドでは、Datadog Agentの基本的な機能を説明します。
まだDatadog Agent のインストールを済ませていない場合は、<a href='https://app.datadoghq.com'>Datadog</a> にloginした状態で、該当OSの
<a href='https://app.datadoghq.com/account/settings#agent'>Agent</a> ページのインストール手順も合わせてご参照ください。

Datadog Agentは、仮の設置パスとして<code> '~/.datadog-agent'</code>以下のディレクトリにインストールされます。このディレクトリは自由に変更することができます。
このガイドでは、Datadog Agent は、この仮の設置パスに存在していることを前提としています。
ディレクトリを変更した場合は、そのパスに合わせて手順を変更してください。


<!--
======================================================
Starting and Stopping the Agent
======================================================
-->

<!-- <h3 id="starting_and_stopping_the_agent">Starting and Stopping the Agent</h3>

To manually start the Agent:

<%= console '~/.datadog-agent/bin/agent start' %>

To stop the Agent:

<%= console '~/.datadog-agent/bin/agent stop' %>

To restart the Agent:

<%= console '~/.datadog-agent/bin/agent restart' %> -->

<h3 id="starting_and_stopping_the_agent">Datadog Agent の起動と停止</h3>

Datadog Agent を起動する:

<%= console '~/.datadog-agent/bin/agent start' %>

Datadog Agent を停止する:

<%= console '~/.datadog-agent/bin/agent stop' %>

Datadog Agent をリスタートする:

<%= console '~/.datadog-agent/bin/agent restart' %>


<!--
======================================================
Status and Information
======================================================
-->

<!-- <h3 id="status_and_information">Status and Information</h3>

To check if the Agent is running:

<%= console '~/.datadog-agent/bin/agent status' %>

To receive more information about the Agent's state:

<%= console '~/.datadog-agent/bin/info' %>

Tracebacks for errors can be retrieved by setting the <code>-v</code> flag: <em>(since 3.8.0)</em>

<%= console '~/.datadog-agent/bin/info -v' %> -->

<h3 id="status_and_information">動作ステータスの確認</h3>

Datadog Agent が起動しているか確認する: <em>(ver. 3.8.0 ~)</em>

<%= console '~/.datadog-agent/bin/agent status' %>

Datadog Agent のステータスに関する情報を収集する:

<%= console '~/.datadog-agent/bin/info info' %>

エラーをトレースバックする場合: <code>-v</code> フラグをinfoコマンドに追記する。 <em>(ver. 3.8.0 ~)</em>

<%= console '~/.datadog-agent/bin/info info -v' %>


<!--
======================================================
Configuration
======================================================
-->

<!-- <h3 id="configuration">Configuration</h3>

The configuration file for the Agent is located at <code>~/.datadog-agent/agent/datadog.conf</code>

Configuration files for integrations are located in <code>~/.datadog-agent/agent/conf.d/</code> -->

<h3 id="configuration">設定ファイルの保存されているディレクトリ</h3>

Datadog Agent の設定ファイルの保存先 <code>~/.datadog-agent/agent/datadog.conf</code>

インストールしたIntegrations の設定ファイルの保存先 <code>~/.datadog-agent/agent/conf.d/</code>

<!--
======================================================
Troubleshooting
======================================================
-->

<!-- <h3 id="troubleshooting">Troubleshooting</h3>

First, make sure you are using the correct version of Python. The Agent requires version 2.4 or greater. You can check your version by executing:

<%= console "cd ~/.datadog-agent/agent && python -c 'import config; print config.get_version()'" %>

Next, try running the <a href='#status_and_information'>info</a> command to see the state of the Agent.

Logs for the subsystems are in the following files:

<ul>
  <li><code>~/.datadog-agent/supervisord/logs/supervisord.log</code></li>
  <li><code>~/.datadog-agent/supervisord/logs/collector.log</code></li>
  <li><code>~/.datadog-agent/supervisord/logs/dogstatsd.log</code></li>
  <li><code>~/.datadog-agent/supervisord/logs/forwarder.log</code></li>
</ul>

<br/>

If you're still having trouble, our support team will be glad to provide further assistance.
You can contact them in one of the following ways:

<%= render '_contact_info', :heading_size => 5, :hide_datadog => true %> -->

<h3 id="troubleshooting">トラブルシューティング</h3>

まず、次のコマンドを実行し、Pythonのバージョンを確認してください。Datadog Agent を実行するには、Python-2.4以上が必要です。

<%= console "cd ~/.datadog-agent/agent && python -c 'import config; print config.get_version()'" %>

バージョン要件を満たしていれば、<a href='#status_and_information'>info</a> コマンドを実行することによって、Datadog Agentのステータス情報を表示することができます。

それぞれの細分化された要素(機能別)のログは、以下のファイルに記録されています:

<ul>
  <li><code>~/.datadog-agent/supervisord/logs/supervisord.log</code></li>
  <li><code>~/.datadog-agent/supervisord/logs/collector.log</code></li>
  <li><code>~/.datadog-agent/supervisord/logs/dogstatsd.log</code></li>
  <li><code>~/.datadog-agent/supervisord/logs/forwarder.log</code></li>
</ul>

<br/>

上記の方法を実行しても問題が解決しない場合は、 <a href="/ja/help/" target="_top">サポートチーム</a>にご連絡ください。
