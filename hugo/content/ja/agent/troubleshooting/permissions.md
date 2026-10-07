---
aliases:
- /ja/agent/faq/how-to-solve-permission-denied-errors
- /ja/agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric
- /ja/agent/faq/cannot-open-an-http-server-socket-error-reported-errno-eacces-13
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: ドキュメント
  text: Agent デバッグモード
- link: /agent/troubleshooting/send_a_flare/
  tag: ドキュメント
  text: Agent フレアの送信
title: アクセス許可に関する問題
---

Agent がホスト上でデータを収集するためには、特定の権限が必要です。以下に、最も一般的な権限の問題とその解決方法を示します。

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
sudo chown -R dd-agent:dd-agent /opt/datadog-agent/run
```

このように変更後は、[Agent 起動コマンド][5]が Agent を正常に起動させることができるはずです。上記のステップに従ったにもかかわらず、引き続きこの問題が発生する場合は、[Datadog サポートチーム][6]にご相談ください。

## プロセスメトリクスのアクセス許可に関する問題

Linux OS で実行している Agent の[プロセスチェック][7]を有効化している場合、デフォルトでは `system.processes.open_file_descriptors` メトリクスが収集または報告されません。
これは、プロセスが Agent ユーザー `dd-agent` ではなく、他のユーザーの元で実行されるプロセスチェックにより監視されている場合に発生します。実際、`dd-agent` ユーザーには、Agent がメトリクスのデータを収集するために参照する `/proc` の全ファイルへの完全なアクセス権がありません。

プロセスチェック構成で `try_sudo` オプション (Agent 6.3 以降で利用可能) を有効化し、適切な `sudoers` ルールを追加します。

```text
dd-agent ALL=NOPASSWD: /bin/ls /proc/*/fd/
```

これにより、プロセスチェックで `sudo` を使用して `ls` コマンドを実行できるようになりますが、パスが `/proc/*/fd/` のコンテンツリストのみが対象です。

Datadog の `error.log` ファイルに `sudo: sorry, you must have a tty to run sudo` の行があった場合、`visudo` を使って sudoers ファイルの `Default requiretty` という行をコメントアウトする必要があります。

### Agent を root 権限で実行する

`try_sudo` を使用できない場合、代替手段として Agent を `root` 権限で実行することができます。

<div class="alert alert-info">Linux では、プロセスデーモンを <code>root</code> 権限で実行することはベストプラクティスではありません。Agent はオープンソースであり、<a href="https://github.com/DataDog/datadog-agent">GitHub リポジトリ</a>を通じて監査できます。</div>

Agent を `root` 権限で実行するには
1. [Agent を停止します][9]
2. `/etc/systemd/system/multi-user.target.wants/datadog-agent.service` を開き、`[Service]` の `user` 属性を変更します
3. [Agent を起動します][10]

詳細情報と、Linux マシンで利用可能なこのメトリクスのその他の取得メソッドについては、下記の GitHub に関する問題をご参照ください。

* https://github.com/DataDog/dd-agent/issues/853
* https://github.com/DataDog/dd-agent/issues/2033

## MacOS 上で Agent をシステム デーモンとして実行する際の権限の問題

`DD_SYSTEMDAEMON_INSTALL` および `DD_SYSTEMDAEMON_USER_GROUP` オプションを使用して、システム全体の Launch Daemon として Agent をインストールした場合は、`DD_SYSTEMDAEMON_USER_GROUP` に指定したユーザーおよびグループが有効で、適切な権限を持っていることを確認してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/configuration/agent-commands/
[2]: /ja/agent/configuration/agent-log-files/
[3]: /ja/agent/faq/error-restarting-agent-already-listening-on-a-configured-port/
[4]: /ja/agent/faq/network/
[5]: /ja/agent/configuration/agent-commands/#start-the-agent
[6]: /ja/help/
[7]: /ja/integrations/process/
[9]: /ja/agent/configuration/agent-commands/#stop-the-agent
[10]: /ja/agent/configuration/agent-commands/#start-the-agent