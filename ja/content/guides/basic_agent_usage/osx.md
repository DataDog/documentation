---
last_modified: 2015/05/27
translation_status: complete
language: ja
title: Agentの基本的な使用方法 (OS X）
kind: documentation
servicename: ~/.datadog-agent/bin/agent
serviceinfoname: ~/.datadog-agent/bin/info
configdirectory: ~/.datadog-agent/agent/
logdirectory: ~/.datadog-agent/supervisord/logs/
supervisorlog: ~/.datadog-agent/supervisord/logs/supervisord.log
os: osx
---

<!--
======================================================
Overview
======================================================
-->

<!-- ### Overview -->

### 概要

<!-- This guide will outline the basic functionality of the Datadog Agent.
If you haven't installed the Agent yet, instructions can be found
<a href='https://app.datadoghq.com/account/settings#agent'>here</a>. -->

このガイドでは、Datadog Agentの基本的な機能を説明します。
まだDatadog Agent のインストールを済ませていない場合は、<a href='https://app.datadoghq.com'>Datadog</a> にloginした状態で、該当OSの
<a href='https://app.datadoghq.com/account/settings#agent/mac'>Agent</a> ページに移動し、インストールの手順を確認してください。

Datadog Agentは、仮の設置パスとして `~/.datadog-agent`以下のディレクトリにインストールされます。このディレクトリは自由に変更することができます。 このガイドでは、Datadog Agent は、この仮の設置パスに存在していることを前提としています。 ディレクトリを変更した場合は、そのパスに合わせて手順を変更してください。

{{< partial name="BasicAgentUsage-nix-ja" markdown="true" >}}

<!-- If you're still having trouble, our support team will be glad to provide further assistance.
You can contact them in one of the following ways: -->

上記の方法を実行しても問題が解決しない場合は、Datadogのサポートチームが問題解決のお手伝いをすることができます。Datadogのサポートチームに連絡を取るには、次のような方法があります。

{{< partial name="_contact_info-ja" markdown="true" >}}
