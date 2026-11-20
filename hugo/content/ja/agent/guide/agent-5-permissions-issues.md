---
title: Agent 5 の権限に関する問題
---

Agent がホスト上でデータを収集するためには、特定の権限が必要です。このページでは最も一般的な権限に関する問題とその解決方法について説明します。

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

[Agent の最新バージョン][8]にアップデートし、`try_sudo` オプションを使用してみてください。アップデートできない場合は、この問題の回避策として、Agent を `root` として実行します。

<div class="alert alert-info">Linuxでは、プロセスデーモンを <code>root</code> 権限で実行するのはベストプラクティスではありません。Agent はオープンソースであり、<a href="https://github.com/DataDog/dd-agent">GitHub リポジトリ</a>を通じて監査される可能性があります。</div>

1. [Agent を停止します][1]

2. `/etc/dd-agent/supervisor.conf` を開き、[20 行目][11]と [30 行目][12]の `dd-agent` を `root` で置換します。Agent をアップグレードまたは再インストールした場合は、再度この操作を実行してください。

3. [Agent を起動します][1]

詳細情報と、Linux マシンで利用可能なこのメトリクスのその他の取得メソッドについては、下記の GitHub に関する問題をご参照ください。

* https://github.com/DataDog/dd-agent/issues/853
* https://github.com/DataDog/dd-agent/issues/2033

[1]: /ja/agent/guide/agent-5-commands/
[2]: /ja/agent/guide/agent-5-log-files/
[3]: /ja/agent/faq/error-restarting-agent-already-listening-on-a-configured-port/
[4]: /ja/agent/faq/network/
[5]: /ja/agent/configuration/agent-5-commands/#start-the-agent
[6]: /ja/help/
[7]: /ja/integrations/process/
[8]: /ja/agent/guide/upgrade/
[11]: https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L20
[12]: https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L30