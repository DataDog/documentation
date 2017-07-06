---
last_modified: 2017/02/07
translation_status: complete
language: ja
title: ホスト名について
kind: documentation
sidebar:
  nav:
    - header: ホスト名のガイド
    - text: Agentによる標準ホスト名の決め方
      href: "#agent"
    - text: ホスト名のエリアス
      href: "#aliases"
---

<!-- <div class="alert alert-info">
  An overview of how we uniquely identify hosts and how they are displayed in
  Datadog. If you have more questions, stop by <a href="irc://irc.freenode.net/datadog">#datadog on freenode</a>,
where we'll be happy to answer any questions you might have. (There's a
<a href="http://webchat.freenode.net/?randomnick=1&channels=datadog&prompt=1">
web chat client, too</a>.)
</div> -->

<div class="alert alert-info">
Datadog Agentがホスト名をどのように識別し、そのホスト名がDatadog のUI 上でどのように表示されるかを解説します。
尚、ホスト名の選定に関しこのドキュメントでカバーできていない内容の質問がある場合は、[お問い合わせ][j1]ページに掲載している方法でご連絡ください。
</div>


<!-- <h2 id="agent">Agent Host Names</h2>

<div class="alert alert-warn">
  This applies to version 3.6 of the Agent and later. If you're having issues
  with host names, we recommend updating to the latest version of the Agent.
</div> -->

## Datadog Agentによる標準ホスト名の決め方
{: #agent}

<div class="alert alert-warn">
  このページの内容は、Datadog Agent 3.6 以降を対象にしています。ホスト名に関し問題を抱えている場合は、Datadog Agent を最新バージョンにアップデートすることを推奨します。
</div>


<!-- The Datadog Agent collects potential hostnames from a number of different
sources. To see all the names the Agent is detecting, run the Agent info
command:

    $ sudo /etc/init.d/datadog-agent info

    ...

    Hostnames
    =========

      hostname: my.special.hostname
      agent-hostname: my.special.hostname
      ec2-hostname: ip-192-0-0-1.internal
      instance-id: i-deadbeef
      socket-hostname: myhost
      socket-fqdn: myhost.mydomain

    ...
-->

Datadog Agentは、異なるソースからのホスト名の候補を収集しています。
Datadog Agentが検知している全ての名前を確認するには、datadog-agentコマンドにinfoオプションを付けて実行します:


    $ sudo /etc/init.d/datadog-agent info

    ...

    Hostnames
    =========

      hostname: my.special.hostname
      agent-hostname: my.special.hostname
      ec2-hostname: ip-192-0-0-1.internal
      instance-id: i-deadbeef
      socket-hostname: myhost
      socket-fqdn: myhost.mydomain

    ...


<!-- From these names, a canonical name is picked for the host. This is the name the
Agent will primarily use to identify itself to Datadog. The other names are
submitted as well, but only as candidates for <a href="#aliases">aliasing</a>.
 -->

Datadog Agentが見つけ出した複数のホスト名候補の中から、標準として使うホスト名が選び出されます。この標準ホスト名は、Agent が送信しているメトリックデータを、Datadog バックエンドで識別させるために使用されます。他のホスト名候補もメトリックデータ内の付随情報として送信され、[ホスト名のエリアス][j2]の候補として使われます。


<!-- The canonical host name is picked according to the following rules. The first
match is selected.

 1. `agent-hostname`: If a host name is explicitly set in the Agent configuration file.
 2. `hostname`: If the DNS host name is not an EC2 default (e.g. `ip-192-0-0-1`).
 3. `instance-id`: If the Agent can reach the EC2 metadata endpoint from the host.
 4. `hostname`: Fall back on the DNS host name even if it is an EC2 default.

If name is recognized as obviously non-unique (e.g. `localhost.localdomain`),
the current rule fails and passes through to the next. -->

 標準ホスト名は、次のルールに従って決定されます。最初に一致したルールで、標準ホスト名が選択されます。

1. `agent-hostname`: Datadog Agentの設定ファイル内でホスト名が、明示的に設定されている場合。
2. `hostname`: DNS ホスト名が、EC2のデフォルト仕様ではない場合（例えばIP-192-0-0-1）。
3. `instance-id`: ホストからDatadog Agentが、EC2のメタデータエンドポイントに到達することができた場合。
4. `hostname`: 1−3の条件を満たさなかった場合、EC2のデフォルト仕様であっても、DNS ホスト名を採用する。

明らかにユニークではないホスト名（例:localhost.localdomain）しか検出できない場合は、このルールは無視され、次に進みます。


<!-- <h2 id="aliases">Host Aliases</h2>

A single host running in EC2 might have an
instance ID (`i-abcd1234`), a generic hostname provided by EC2 based on the
host's IP address (`ip-192-0-0-1`), and a meaningful host name provided by an
internal DNS server or a config-managed hosts file (`myhost.mydomain`). Datadog
creates aliases for host names when there are multiple uniquely identifiable
names for a single host.

The names collected by the Agent (detailed <a href="agent">above</a>) are
added as aliases for the chosen canonical name.

You can see a list of all the hosts in your account from the Infrastructure tab
in Datadog. From the Inspect panel, you can see (among other things) the list of
aliases associated with each host.

<img src="/static/images/host_aliases.png" style="width:100%; border:1px solid #777777"/> -->

## ホスト名のエリアス
{: #aliases}

EC2上で起動したインスタンス(ホスト)には、インスタンスID（`I-ABCD1234`）、IPアドレスに基づいて付けられた汎用的なホスト名（`IP-192-0-0-1`）、そして、hostsファイルやDNSによって管理されているホスト名(`myhost.mydomain`)があります。
Datadogでは、単一ホストに対して複数のユニークなホスト名が存在する場合、それら全てのホスト名のエリアスを作成します。

Datadog Agentによって検出されたホストの名称は、標準ホスト名のエイリアスとして追加登録されます。

ダッシュボードの`Infrastructure` タブ内のドロップダウンメニューから`Infrastructure List` を選択すると、監視対象になっているホストのリストを表示することができます。リスト内の標準ホスト名にポインターを持っていくと`Inspect` ボタンが表示されます。これをクリックし、表示されるインスペクションパネルの標準ホスト名の下にある名前を確認することで、ホスト名のエリアスを確認することができます。

<img src="/static/images/host_aliases.png" style="width:100%; border:1px solid #777777"/>

[j1]: /ja/help
[j2]: ./#aliases
