---
last_modified: 2015/04/02
translation_status: complete
language: ja
title: Agentの基本的な使用方法 (Red Hat系)
---

<!--
======================================================
OVERVIEW
======================================================
-->

<!-- <h3 id="overview">Overview</h3>

This guide will outline the basic functionality of the Datadog Agent.
If you haven't installed the Agent yet, instructions can be found
<a href='https://app.datadoghq.com/account/settings#agent'>here</a>. -->

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

<%= console 'sudo /etc/init.d/datadog-agent start' %>

To stop the Agent: <br/>

<%= console 'sudo /etc/init.d/datadog-agent stop' %>

To restart the Agent: <br/>

<%= console 'sudo /etc/init.d/datadog-agent restart' %> -->

<h3 id="starting_and_stopping_the_agent">Datadog Agent の起動と停止</h3>

手動で Datadog Agent を起動する:

<%= console 'sudo /etc/init.d/datadog-agent start' %>

停止する:

<%= console 'sudo /etc/init.d/datadog-agent stop' %>

リスタートする:

<%= console 'sudo /etc/init.d/datadog-agent restart' %>


<!--
======================================================
Status and Information
======================================================
-->

<!-- <h3 id="status_and_information">Status and Information</h3>

To check if the Agent is running:

<%= console 'sudo /etc/init.d/datadog-agent status' %>

To receive more information about the Agent's state:

<%= console 'sudo /etc/init.d/datadog-agent info' %>

Tracebacks for errors can be retrieved by setting the <code>-v</code> flag: <em>(since 3.8.0)</em>

<%= console 'sudo /etc/init.d/datadog-agent info -v' %> -->

<h3 id="status_and_information">動作ステータスの確認</h3>

Datadog Agent が起動しているか確認する: <em>(ver. 3.8.0 ~)</em>

<%= console 'sudo /etc/init.d/datadog-agent status' %>

Datadog Agent のステータスに関する情報を収集する:

<%= console 'sudo /etc/init.d/datadog-agent info' %>

エラーをトレースバックする場合: <code>-v</code> フラグをinfoコマンドに追記する。 <em>(ver. 3.8.0 ~)</em>

<%= console 'sudo /etc/init.d/datadog-agent info -v' %>

<!--
======================================================
Configuration
======================================================
-->

<!-- <h3 id="configuration">Configuration</h3>

The configuration file for the Agent is located at <code>/etc/dd-agent/datadog.conf</code>

Configuration files for integrations are located in <code>/etc/dd-agent/conf.d/</code> -->

<h3 id="configuration">設定ファイルの保存されているディレクトリ</h3>

Datadog Agent の設定ファイルの保存先 <code>/etc/dd-agent/datadog.conf</code>

インストールしたIntegrations の設定ファイルの保存先 <code>/etc/dd-agent/conf.d/</code>

<!--
======================================================
Troubleshooting
======================================================
-->

<!-- <h3 id="troubleshooting">Troubleshooting</h3>

You can run the <a href='#status_and_information'>info</a> command to see the state of the Agent.

Logs for the subsystems are in the following files:

<ul>
  <li><code>/var/log/supervisor/datadog-supervisord.log</code></li>
  <li><code>/var/log/datadog/collector.log</code></li>
  <li><code>/var/log/datadog/dogstatsd.log</code></li>
  <li><code>/var/log/datadog/forwarder.log</code></li>
</ul>

<br/>

If you're still having trouble, our support team will be glad to provide further assistance.
You can contact them in one of the following ways:

<%= render '_contact_info', :heading_size => 5, :hide_datadog => true %> -->

<h3 id="troubleshooting">トラブルシューティング</h3>

<a href='#status_and_information'>info</a> コマンドを実行することによって、Datadog Agentのステータス情報を表示することができます。

それぞれの細分化された要素(機能別)のログは、以下のファイルに記録されています:

<ul>
  <li><code>/var/log/datadog/supervisord.log</code> <em>(ver. 3.8.0 ~)</em></li>
  <li><code>/var/log/datadog/collector.log</code></li>
  <li><code>/var/log/datadog/dogstatsd.log</code></li>
  <li><code>/var/log/datadog/forwarder.log</code></li>
</ul>

<br/>

上記の方法を実行しても問題が解決しない場合は、 <a href="/ja/help/" target="_top">サポートチーム</a>にご連絡ください。
