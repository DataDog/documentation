---
aliases:
- /ja/tracing/languages/php
- /ja/agent/apm/php/
- /ja/tracing/php/
- /ja/tracing/setup/php
- /ja/tracing/setup_overview/php
- /ja/tracing/setup_overview/setup/php
- /ja/tracing/faq/php-tracer-manual-installation/
- /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/php
code_lang: php
code_lang_weight: 40
further_reading:
- link: /tracing/guide/trace-php-cli-scripts/
  tag: ガイド
  text: PHP CLI スクリプトのトレース
- link: https://www.datadoghq.com/blog/monitor-php-performance/
  tag: ブログ
  text: Datadog APM と分散型トレーシングを使用した PHP の監視
- link: https://github.com/DataDog/dd-trace-php
  tag: ソースコード
  text: ソースコード
- link: https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md
  tag: ソースコード
  text: オープンソースプロジェクトへの貢献
- link: /tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースを調査する
title: PHP アプリケーションのトレース
type: multi-code-lang
---
## 互換性要件 {#compatibility-requirements}

最新バージョンの `dd-trace-php` の最小 PHP バージョン要件は PHP 7 です。PHP 5 を使用している場合、PHP トレーサーはバージョン [0.99](https://github.com/DataDog/dd-trace-php/releases/tag/0.99.0) まで使用できます。PHP 5 は PHP ライブラリのバージョン 1.0 をもって EOL です。

Datadog の PHP バージョンとフレームワークのサポート一覧 (レガシーバージョンとメンテナンスバージョンを含む) については、[互換性要件][1]ページをご覧ください。

## はじめに {#getting-started}

作業を始める前に、[Agent のインストールと構成][14]が済んでいることを確認してください。

### 拡張機能をインストール {#install-the-extension}

公式インストーラーをダウンロードします。

```shell
curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
```

Alpine Linux をお使いの場合は、インストーラーを実行する前に `libgcc_s` をインストールする必要があります。

```shell
apk add libgcc
```

インストーラーを実行します。

```shell
# Full installation: APM + AAP + Profiling
php datadog-setup.php --php-bin=all --enable-appsec --enable-profiling

# APM only
php datadog-setup.php --php-bin=all

# APM + AAP
php datadog-setup.php --php-bin=all --enable-appsec

# APM + Profiling
php datadog-setup.php --php-bin=all --enable-profiling
```

<div class="alert alert-warning">
<strong>注</strong>: Windows では APM のみがサポートされています。Windows で PHP アプリケーションをトレースする際は、 <code>--enable-appsec</code> および <code>--enable-profiling</code> フラグを使用しないでください。
</div>

このコマンドは、ホストまたはコンテナ内で見つかったすべての PHP バイナリに拡張機能をインストールします。`--php-bin` が省略された場合、インストーラーは対話モードで実行され、ユーザーにインストールするバイナリを選択するように求めます。`--php-bin` の値は、`dd-trace-php` が特定のバイナリにのみインストールされる場合、そのバイナリへのパスにすることができます。

PHP (PHP-FPM または Apache SAPI) を再起動し、アプリケーションのトレース可能なエンドポイントにアクセスします。生成されたトレースを確認するには、[APM トレースページ][4]に移動してください。

`--enable-appsec` を指定しない場合、AppSec 拡張機能は起動時にすぐに読み込まれ、デフォルトでは有効になっていません。それは即座にショートサーキットし、パフォーマンスオーバーヘッドは無視できる程度です。

<div class="alert alert-info">
UI にトレースが表示されるまで、数分かかる場合があります。数分後もトレースが表示されない場合は、<a href="/tracing/troubleshooting/tracer_startup_logs?tab=php#php-info"> を作成してください。<code>phpinfo()</code></a> ページに移動し、`ddtrace` までスクロールします。失敗した診断チェックは、このセクションに表示され、問題の特定に役立ちます。
</div>

<div class="alert alert-danger">
<strong>Apache ZTS:</strong>
PHP CLI バイナリが NTS (非スレッドセーフ) としてビルドされている場合、Apache が ZTS (Zend スレッドセーフ) バージョンの PHP を使用しているときは、ZTS バイナリに対する拡張機能の読み込みを手動で変更する必要があります。  <code>/path/to/php-zts --ini</code> を実行して Datadog の <code>.ini</code> ファイルの場所を特定し、その後ファイル名から <code>-zts</code> のサフィックスを追加します。例えば、 <code>extension=ddtrace-20210902.so</code> から <code>extension=ddtrace-20210902-zts.so</code>まで。
</div>

<div class="alert alert-danger">
<strong>SELinux:</strong>
ホストに httpd SELinux ポリシーが設定されている場合、SELinux 設定で一時ファイルの書き込みおよび実行が明示的に許可されていない限り、SDK の機能が制限される可能性があります。

`allow httpd_t httpd_tmpfs_t:file { execute execute_no_trans };`

</div>

## 自動インスツルメンテーション {#automatic-instrumentation}

トレースはデフォルトで自動的に有効になっています。拡張機能がインストールされると、**ddtrace** はアプリケーションをトレースし、Agent へトレースを送ります。

Datadog はすべてのウェブフレームワークを標準でサポートしています。自動インスツルメンテーションは、特定の関数やメソッドをトレースするために PHP のランタイムを変更して動作します。PHP トレーサーは、いくつかのライブラリに対して自動インスツルメンテーションをサポートしています。

自動インスツルメンテーションは以下を取得します。

* メソッド実行時間
* Web リクエスト用 URL やステータスレスポンスコード、またはデータベースアクセス用 SQL クエリなどの関連するトレースデータ
* 未処理の例外 (該当する場合スタックトレースを含む)
* Web リクエストなど、システムを通過するトレースの合計数

## 構成 {#configuration}

必要に応じて、Unified Service Tagging の設定など、アプリケーションパフォーマンスのテレメトリデータを送信するための SDK を構成します。詳細については、[ライブラリの構成][6]を参照してください。

サービスまたはリソースによるトレースの取り込みを制御するには (リソース名でワイルドカードを使用する場合を含む)、[リソースベースのサンプリングによるトレース取り込みの制御][15]を参照してください。

## 短時間および長時間実行される CLI スクリプトのトレース {#tracing-short-and-long-running-cli-scripts}

CLI スクリプトをインスツルメンテーションするには、追加のステップが必要です。詳細については、[PHP CLI スクリプトのトレース][7]を参照してください。

## アップグレード {#upgrading}

PHP トレーサーをアップグレードするには、[最新のリリースをダウンロード][5]し、[拡張機能のインストール](#install-the-extension) と同じステップに従います。

インストールが完了したら、PHP (PHP-FPM または Apache SAPI) を再起動します。

**注**: OPcache でパラメーターを `opcache.file_cache` に設定してセカンドレベルキャッシングを使用する場合は、キャッシュフォルダーを削除します。

## 削除中 {#removing}

PHP トレーサーを削除するには:

1. php-fpm の場合は php-fpm サービスを停止し、それ以外の場合は Apache Web サーバーを停止します。
2. ファイル `98-ddtrace.ini` と `99-ddtrace-custom.ini` のリンクを PHP 設定フォルダーから解除します。
3. php-fpm の場合は php-fpm サービスを再起動し、それ以外の場合は Apache Web サーバーを再起動します。

**注**: OPcache でパラメーターを `opcache.file_cache` に設定してセカンドレベルキャッシングを使用する場合は、キャッシュフォルダーを削除します。

## アプリケーションクラッシュのトラブルシューティング {#troubleshooting-an-application-crash}

PHP トレーサーが原因でアプリケーションがクラッシュするという異常なイベントが発生した場合、通常はセグメンテーションフォールトが原因で、最善の対応はコアダンプや Valgrind トレースを取得し、Datadog サポートに連絡することです。

### デバッグシンボルをインストールする {#install-debug-symbols}

コアダンプを読み取るためには、PHP を実行するシステムに PHP バイナリのデバッグシンボルがインストールされていなければなりません。

PHP や PHP-FPM にデバッグシンボルがインストールされているかどうかを確認するには、`gdb` を使用してください。

`gdb` をインストールします。

```
apt|yum install -y gdb
```

対象のバイナリに対して `gdb` を実行します。例えば、PHP-FPM の場合。

```
gdb php-fpm
```

`gdb` で以下のような行が出力された場合、デバッグシンボルはすでにインストールされています。

```
...
Reading symbols from php-fpm...Reading symbols from /usr/lib/debug/path/to/some/file.debug...done.
...
```

`gdb` で以下のような行が出力された場合は、デバッグシンボルをインストールする必要があります。

```
...
Reading symbols from php-fpm...(no debugging symbols found)...done.
...
```


#### Centos {#centos}

プログラム `debuginfo-install` を提供するパッケージ `yum-utils` をインストールします。

```
yum install -y yum-utils
```

PHP バイナリのパッケージ名を確認します。PHP のインストール方法により異なる場合があります。

```
yum list installed | grep php
```

デバッグシンボルをインストールします。例えば、パッケージ `php-fpm` の場合。

```
debuginfo-install -y php-fpm
```

**注**: PHP バイナリを提供するリポジトリがデフォルトで有効になっていない場合は、`debuginfo-install` コマンドを実行する際に有効にすることができます。例えば、以下のようになります。

```
debuginfo-install --enablerepo=remi-php74 -y php-fpm
```

#### Debian {#debian}

##### Sury Debian DPA からインストールされた PHP {#php-installed-from-the-sury-debian-dpa}

PHP を [Sury Debian DPA][8] からインストールした場合は、DPA でデバッグデバッグシンボルを入手することができます。例えば、PHP-FPM 7.2 の場合は次のようになります。

```
apt update
apt install -y php7.2-fpm-dbgsym
```

##### 異なるパッケージからインストールされた PHP {#php-installed-from-a-different-package}

Debian プロジェクトでは、wiki ページに[デバッグシンボルのインストール手順][9]を掲載しています。

ファイル `/etc/apt/sources.list` を編集します。

```
# ... leave here all the pre-existing packages

# add a `deb` deb http://deb.debian.org/debian-debug/ $RELEASE-debug main
# For example for buster
deb http://deb.debian.org/debian-debug/ buster-debug main
```

`apt` を更新します。

```
apt update
```

まず、デバッグシンボル用の標準的なパッケージ名を試してください。例えば、パッケージ名が `php7.2-fpm` の場合、次を試してください。

```
apt install -y php7.2-fpm-dbgsym

# if the above does not work

apt install -y php7.2-fpm-dbg
```

デバッグシンボルが見つからない場合は、ユーティリティツール `find-dbgsym-packages` を使用してください。バイナリをインストールします。

```
apt install -y debian-goodies
```

バイナリへのフルパスまたは実行中のプロセスのプロセス ID から、デバッグシンボルの検出を試みます。

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

見つかった場合は、該当するパッケージ名をインストールします。

```
apt install -y php7.2-fpm-{package-name-returned-by-find-dbgsym-packages}
```

#### Ubuntu {#ubuntu}

##### `ppa:ondrej/php` からインストールされた PHP {#php-installed-from-ppaondrejphp}

PHP を [`ppa:ondrej/php`][10] からインストールした場合は、`/etc/apt/sources.list.d/ondrej-*.list` の apt ソースファイルを編集し、`main/debug` コンポーネントを追加します。

変更前:

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main```

変更後:

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main main/debug```

デバッグシンボルを更新およびインストールします。例えば、PHP-FPM 7.2 の場合は次のようになります。

```
apt update
apt install -y php7.2-fpm-dbgsym
```
##### 異なるパッケージからインストールされた PHP {#php-installed-from-a-different-package-1}

PHP バイナリのパッケージ名を確認します。PHP のインストール方法により異なる場合があります。

```
apt list --installed | grep php
```

**注**: `php-fpm` は、実際のパッケージを参照するメタパッケージである場合もあります (例: PHP-FPM 7.2 の場合は `php7.2-fpm`)。この場合、パッケージ名は後者のようになります。

まず、デバッグシンボル用の標準的なパッケージ名を試してください。例えば、パッケージ名が `php7.2-fpm` の場合、次を試してください。

```
apt install -y php7.2-fpm-dbgsym

# if the above does not work

apt install -y php7.2-fpm-dbg
```

`-dbg` および `-dbgsym` パッケージが見つからない場合は、`ddebs` リポジトリを有効にしてください。`ddebs` から[デバッグシンボルをインストール][11]する方法に関する詳細情報は、Ubuntu のドキュメントに記載されています。

たとえば、Ubuntu 18.04 以降の場合、`ddebs` リポジトリを有効にします。

```
echo "deb http://ddebs.ubuntu.com $(lsb_release -cs) main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list

echo "deb http://ddebs.ubuntu.com $(lsb_release -cs)-updates main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list
```

署名キーをインポートします ([署名キーが正しい][12]ことを確認してください)。

```
apt install ubuntu-dbgsym-keyring
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys <SIGNING KEY FROM UBUNTU DOCUMENTATION>
apt update
```

デバッグシンボル用の標準的なパッケージ名を追加してみてください。例えば、パッケージ名が `php7.2-fpm` の場合、次を試してください。

```
apt install -y php7.2-fpm-dbgsym

# if the above does not work

apt install -y php7.2-fpm-dbg
```

デバッグシンボルが見つからない場合は、ユーティリティツール `find-dbgsym-packages` を使用してください。バイナリをインストールします。

```
apt install -y debian-goodies
```

バイナリへのフルパスまたは実行中のプロセスのプロセス ID から、デバッグシンボルの検出を試みます。

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

見つかった場合は、該当するパッケージ名をインストールします。

```
apt install -y php7.2-fpm-{package-name-returned-by-find-dbgsym-packages}
```

### コアダンプの取得 {#obtaining-a-core-dump}

PHP アプリケーションのコアダンプを取得することは、特に PHP-FPM では難しい場合があります。コアダンプを取得するのに役立ついくつかのヒントを次に示します。

1. アプリケーションエラーログを調べて、PHP-FPM がコアダンプを生成したかどうかを確認します。
   -  `(SIGSEGV - core dumped)` を検索してください。なぜなら、このようなメッセージはコアダンプがダンプされたことを意味するからです: `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV - core dumped) after <duration> seconds from start`。
   -  `(SIGSEGV)` を検索してください。なぜなら、このようなメッセージはコアがダンプされなかったことを示すからです: `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV) after <duration> seconds from start`。
1.  `cat /proc/sys/kernel/core_pattern` を実行してコアダンプを特定します。デフォルト値は通常 `core` であり、これは `core` という名前のファイルがウェブルートフォルダに生成されることを意味します。

コアダンプが生成されなかった場合は、次の構成を確認し、必要に応じて変更します。

1. `/proc/sys/kernel/core_pattern` にネストされたディレクトリを含むパスが含まれている場合は、完全なディレクトリパスが存在することを確認します。
1. PHP-FPM プールワーカーを実行しているユーザーが `root` 以外の場合 (一般的なユーザー名は `www-data`)、そのユーザーにコアダンプディレクトリへの書き込みアクセス許可を付与します。
1.  `/proc/sys/fs/suid_dumpable` の値が `0` でないことを確認してください。`1` または `2` に設定してください。ただし、PHP-FPM ワーカープールを `root` として実行する場合は除きます。システム管理者にオプションを確認してください。
1. PHP-FPM プール設定セクションに適切な `rlimit_core` があることを確認してください。無制限に設定できます: `rlimit_core = unlimited`。
1. システムに適切な `ulimit` が設定されていることを確認してください。無制限に設定できます: `ulimit -c unlimited`。
1. アプリケーションが Docker コンテナ内で実行される場合、`/proc/sys/*` の変更はホストマシンで行う必要があります。利用可能なオプションについては、システム管理者にお問い合わせください。可能であれば、テスト環境またはステージング環境で問題を再現してみてください。

### Docker コンテナ内からのコアダンプの取得 {#obtaining-a-core-dump-from-within-a-docker-container}

Docker コンテナでコアダンプを取得する際には、以下の情報を参考にしてください。

1. Docker コンテナは特権コンテナとして実行する必要があり、コアファイルの `ulimit` 値は以下の例に示すように最大値に設定する必要があります。
   - `docker run` コマンドを使用する場合は、`--privileged` および`--ulimit core=99999999999` 引数を追加してください。
   - `docker compose` を使用する場合は、`docker-compose.yml` ファイルに以下を追加してください。

```yaml
privileged: true
ulimits:
  core: 99999999999
```
2. コンテナを実行する際に (PHP アプリケーションを起動する前に) 以下のコマンドを実行する必要があります。

```
ulimit -c unlimited
echo '/tmp/core' > /proc/sys/kernel/core_pattern
echo 1 > /proc/sys/fs/suid_dumpable
```

### Valgrind トレースの取得 {#obtaining-a-valgrind-trace}

クラッシュの詳細を得るために、Valgrind でアプリケーションを実行してください。コアダンプとは異なり、このアプローチは常に非特権コンテナで機能します。

<div class="alert alert-warning">
<strong>注</strong>: Valgrind を通して実行されるアプリケーションは、ネイティブで実行される場合よりも桁違いに遅くなります。この方法は、非本番環境での使用が推奨されます。
</div>

お使いのパッケージマネージャーで Valgrind をインストールします。アプリケーションを Valgrind で実行し、いくつかのリクエストを生成します。

CLI アプリケーションの場合、次のように実行します。
{{< code-block lang=shell >}}
USE_ZEND_ALLOC=0 valgrind -- php path/to/script.php
{{< /code-block >}}
`php-fpm` を実行する際は、次のように実行します。
{{< code-block lang="shell" >}}
USE_ZEND_ALLOC=0 valgrind --trace-children=yes -- php-fpm -F --fpm-config <CONFIG_FILE_PATH> <MORE_OPTIONS>
{{< /code-block >}}
Apache を使用する場合、次のように実行します。
{{< code-block lang="shell" >}}
(. /etc/apache2/envvars; USE_ZEND_ALLOC=0 valgrind --trace-children=yes -- apache2 -X)`
{{< /code-block >}}

結果として得られる Valgrind のトレースは、デフォルトでは標準エラーに出力されますが、[公式ドキュメント][13]に従って別のターゲットに出力することもできます。想定される出力は、PHP-FPM プロセスの場合、以下の例のようになります。

```
==322== Conditional jump or move depends on uninitialised value(s)
==322==    at 0x41EE82: zend_string_equal_val (zend_string.c:403)
==322==    ...
==322==    ...
==322==
==322== Process terminating with default action of signal 11 (SIGSEGV): dumping core
==322==    at 0x73C8657: kill (syscall-template.S:81)
==322==    by 0x1145D0F2: zif_posix_kill (posix.c:468)
==322==    by 0x478BFE: ZEND_DO_ICALL_SPEC_RETVAL_UNUSED_HANDLER (zend_vm_execute.h:1269)
==322==    by 0x478BFE: execute_ex (zend_vm_execute.h:53869)
==322==    by 0x47D9B0: zend_execute (zend_vm_execute.h:57989)
==322==    by 0x3F6782: zend_execute_scripts (zend.c:1679)
==322==    by 0x394F0F: php_execute_script (main.c:2658)
==322==    by 0x1FFE18: main (fpm_main.c:1939)
==322==
==322== Process terminating with default action of signal 11 (SIGSEGV)
==322==    ...
==322==    ...
==322==
==322== HEAP SUMMARY:
==322==     in use at exit: 3,411,619 bytes in 22,428 blocks
==322==   total heap usage: 65,090 allocs, 42,662 frees, 23,123,409 bytes allocated
==322==
==322== LEAK SUMMARY:
==322==    definitely lost: 216 bytes in 3 blocks
==322==    indirectly lost: 951 bytes in 32 blocks
==322==      possibly lost: 2,001,304 bytes in 16,840 blocks
==322==    still reachable: 1,409,148 bytes in 5,553 blocks
==322==                       of which reachable via heuristic:
==322==                         stdstring          : 384 bytes in 6 blocks
==322==         suppressed: 0 bytes in 0 blocks
==322== Rerun with --leak-check=full to see details of leaked memory
==322==
==322== Use --track-origins=yes to see where uninitialised values come from
==322== For lists of detected and suppressed errors, rerun with: -s
==322== ERROR SUMMARY: 18868 errors from 102 contexts (suppressed: 0 from 0)
```

### strace の取得 {#obtaining-a-strace}

外的要因によって問題が引き起こされる場合もあるため、このような場合に `strace` は貴重な情報源となります。

<div class="alert alert-warning">
<strong>注</strong>:  <code>strace</code> を通して実行されるアプリケーションは、ネイティブで実行される場合よりも桁違いに遅くなります。この方法は、非本番環境での使用が推奨されます。
</div>

お使いのパッケージマネージャーで `strace` をインストールしてください。Datadog サポートに送信する `strace` を生成する際には、`-f` オプションを使用して子プロセスを追跡します。

CLI アプリケーションの場合、次のように実行します。
{{< code-block lang="shell" >}}
strace -f php path/to/script.php
{{< /code-block >}}

`php-fpm` の場合、次のように実行します。
{{< code-block lang="shell" >}}
strace -f php-fpm -F --fpm-config <CONFIG_FILE_PATH> <MORE_OPTIONS>
{{< /code-block >}}

Apache の場合、次のように実行します。
{{< code-block lang="shell" >}}
(. /etc/apache2/envvars; strace -f apache2 -X)
{{< /code-block >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/php
[2]: https://app.datadoghq.com/apm/service-setup
[3]: /ja/tracing/glossary/
[4]: https://app.datadoghq.com/apm/traces
[5]: https://github.com/DataDog/dd-trace-php/releases
[6]: /ja/tracing/trace_collection/library_config/php/
[7]: /ja/tracing/guide/trace-php-cli-scripts/
[8]: https://packages.sury.org/php/
[9]: https://wiki.debian.org/HowToGetABacktrace
[10]: https://launchpad.net/~ondrej/+archive/ubuntu/php
[11]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages
[12]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages#Getting_-dbgsym.ddeb_packages
[13]: https://valgrind.org/docs/manual/manual-core.html#manual-core.comment
[14]: /ja/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[15]: /ja/tracing/guide/resource_based_sampling/