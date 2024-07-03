---
aliases:
- /ja/agent/faq/how-to-solve-permission-denied-errors
- /ja/agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric
- /ja/agent/faq/cannot-open-an-http-server-socket-error-reported-errno-eacces-13
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: ドキュメント
  text: Agent Debug Mode
- link: /agent/troubleshooting/send_a_flare/
  tag: ドキュメント
  text: Send an Agent Flare
title: Permission Issues
---

Agent がホストでデータを収集するためには、特定のアクセス許可が必要です。このページでは最も一般的なアクセス許可に関する問題とその解決方法について説明します。

* [Agent ロギングのアクセス許可の問題](#agent-logging-permission-issues)
* [Agent ソケットのアクセス許可の問題](#agent-socket-permission-issues)
* [プロセスメトリクスのアクセス許可の問題](#process-metrics-permission-issue)
* [参考文献](#further-reading)

## Agent ロギングのアクセス許可に関する問題

Datadog Agent をホストで実行する際、アクセス許可に関連する以下のような問題が発生することがあります。このような問題は、Agent の適切なログ作成を妨げる可能性があります。

```text
IOError: [Errno 13] Permission denied: '/var/log/datadog/supervisord.log'
```

Agent のログファイルと、ログファイルが含まれるディレクトリのオーナーが  Datadog Agent ユーザー: `dd-agent` であることを確認します。オーナーが Agent ユーザーではない場合、Agent はログエントリーをファイルに書き込むことはできません。下記の例は、ファイルのオーナーシップ情報を表示するためにUnix システムで利用できるコマンドです。

```text
ls -l /var/log/datadog/

total 52300
-rw-r--r-- 1 dd-agent dd-agent 5742334 Jul 31 11:49 collector.log
-rw-r--r-- 1 dd-agent dd-agent 10485467 Jul 28 02:45 collector.log.1
-rw-r--r-- 1 dd-agent dd-agent 1202067 Jul 31 11:48 dogstatsd.log
-rw-r--r-- 1 dd-agent dd-agent 10485678 Jul 28 07:04 dogstatsd.log.1
-rw-r--r-- 1 dd-agent dd-agent 4680625 Jul 31 11:48 forwarder.log
-rw-r--r-- 1 dd-agent dd-agent 10485638 Jul 28 07:09 forwarder.log.1
-rw-r--r-- 1 dd-agent dd-agent 1476 Jul 31 11:37 jmxfetch.log
-rw-r--r-- 1 dd-agent dd-agent 31916 Jul 31 11:37 supervisord.log
-rw-r--r-- 1 dd-agent dd-agent 110424 Jul 31 11:48 trace-agent.log
-rw-r--r-- 1 dd-agent dd-agent 10000072 Jul 28 08:29 trace-agent.log.1
```

ファイルのオーナーが `dd-agent` ユーザー**以外**の場合、下記のコマンドを使用してオーナーシップを変更し、[Agent を再起動][1]します。

```text
sudo chown -R dd-agent:dd-agent /var/log/datadog/
```

[Agent ログの場所に関する詳細情報はこちらからご確認ください][2]。

## Agent ソケットのアクセス許可に関する問題

Agent の起動時に、ソケットのアクセス許可に関する次のような問題が発生することがあります。

```text
Starting Datadog Agent (using supervisord):Error: Cannot open an HTTP server: socket.error reported errno.EACCES (13)
```

一見したところ、適切なソケットがすでに使用されているために Agent が接続できないように見えるかもしれません。しかし、[長引く Agent プロセスが残留していない][3]ことを再度確認済みで、Agent 用の[適切なポート][4]が使用可能であると確認できていても、上記のエラーが続くことがあります。

Linux ホストの場合、正常に起動するためには `/opt/datadog-agent/run` ディレクトリのオーナーが `dd-agent` である必要があります。まれに、このディレクトリのオーナーシップが `dd-agent` 以外に変更されてしまうことがあります。これにより、Agent の起動時に上記のエラーが発生します。次のコマンドを実行して、このディレクトリのオーナーシップを再度確認します。

```text
ls -al /opt/datadog-agent/run
```

ファイルのオーナーが `dd-agent` **以外**の場合は、次のコマンドを実行して修正します。

```text
chown dd-agent -R /opt/datadog-agent/run
```

このように変更後は、[Agent 起動コマンド][5]が Agent を正常に起動させることができるはずです。上記のステップに従ったにもかかわらず、引き続きこの問題が発生する場合は、[Datadog サポートチーム][6]にご相談ください。

## プロセスメトリクスのアクセス許可に関する問題

Linux OS で実行している Agent の[プロセスチェック][7]を有効化している場合、デフォルトでは `system.processes.open_file_descriptors` メトリクスが収集または報告されません。
これは、プロセスが Agent ユーザー `dd-agent` ではなく、他のユーザーの元で実行されるプロセスチェックにより監視されている場合に発生します。実際、`dd-agent` ユーザーには、Agent がメトリクスのデータを収集するために参照する `/proc` の全ファイルへの完全なアクセス権がありません。

{{< tabs >}}
{{% tab "Agent v6.3+" %}}

プロセスチェックコンフィギュレーションの `try_sudo` オプションを有効化し、適切な `sudoers` ルールを追加します。

```text
dd-agent ALL=NOPASSWD: /bin/ls /proc/*/fd/
```

これにより、プロセスチェックで `sudo` を使用して `ls` コマンドを実行できるようになりますが、パスが `/proc/*/fd/` のコンテンツリストのみが対象です。

Datadog の `error.log` ファイルに `sudo: sorry, you must have a tty to run sudo` の行があった場合、`visudo` を使って sudoers ファイルの `Default requiretty` という行をコメントアウトする必要があります。

{{% /tab %}}
{{% tab "Agent v6 および v7" %}}

v6.3 以前の Agent v6 を実行している場合は、Agent をアップデートして `try_sudo` オプションを使用するようにしてください。アップデートできない場合は、この問題の回避策として Agent を `root` として実行します。

**注**: Agent を `root` として実行することは推奨されていません。Datadog Agent に限らず、また、何らかの信用性の低い現象が懸念されるわけでもありませんが、デーモンを `root` として実行することは推奨されていません。これは、Linux のプロセスにおける基本的なベストプラクティスです。個人的に懸念事項がある場合、オープンソースである Agent は [GitHub レポジトリ][1]を使用してご自身やチームで監査することが可能です。

1. [Agent を停止します][2]

2. `/etc/systemd/system/multi-user.target.wants/datadog-agent.service` を開き、`[Service]` の `user​` 属性を変更します

3. [Agent を起動します][3]

[1]: https://github.com/DataDog/datadog-agent
[2]: /ja/agent/configuration/agent-commands/#stop-the-agent
[3]: /ja/agent/configuration/agent-commands/#start-the-agent
{{% /tab %}}
{{% tab "Agent v5" %}}

Agent v5 を実行している場合は、[最新バージョンの Agent 6][1] へアップデートし、`try_sudo` オプションを使用してください。アップデートできない場合は、この問題の回避策として、Agent を `root` として実行します。

**注**: Agent を `root` として実行することは推奨されていません。Datadog Agent に限らず、また、何らかの信用性の低い現象が懸念されるわけでもありませんが、デーモンを `root` として実行することは推奨されていません。これは、Linux のプロセスにおける基本的なベストプラクティスです。個人的に懸念事項がある場合、オープンソースである Agent は [GitHub レポジトリ][2]を使用してご自身やチームで監査することが可能です。

1. [Agent を停止します][3]

2. `/etc/dd-agent/supervisor.conf` を開き、[20 行目][4]と [30 行目][5]の `dd-agent` を `root` で置換します。Agent をアップグレードまたは再インストールした場合は、再度この操作を実行してください。

3. [Agent を起動します][6]

[1]: /ja/agent/guide/upgrade-to-agent-v6/
[2]: https://github.com/DataDog/dd-agent
[3]: /ja/agent/configuration/agent-commands/?tab=agentv5#stop-the-agent
[4]: https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L20
[5]: https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L30
[6]: /ja/agent/configuration/agent-commands/?tab=agentv5#start-the-agent
{{% /tab %}}
{{< /tabs >}}

詳細情報と、Linux マシンで利用可能なこのメトリクスのその他の取得メソッドについては、下記の GitHub に関する問題をご参照ください。

* https://github.com/DataDog/dd-agent/issues/853
* https://github.com/DataDog/dd-agent/issues/2033

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/configuration/agent-commands/
[2]: /ja/agent/configuration/agent-log-files/
[3]: /ja/agent/faq/error-restarting-agent-already-listening-on-a-configured-port/
[4]: /ja/agent/faq/network/
[5]: /ja/agent/configuration/agent-commands/#start-the-agent
[6]: /ja/help/
[7]: /ja/integrations/process/