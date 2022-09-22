---
aliases:
- /ja/tracing/languages/php
- /ja/agent/apm/php/
- /ja/tracing/php/
- /ja/tracing/setup/php
- /ja/tracing/setup_overview/php
- /ja/tracing/setup_overview/setup/php
- /ja/tracing/faq/php-tracer-manual-installation/
code_lang: php
code_lang_weight: 40
further_reading:
- link: /tracing/guide/trace-php-cli-scripts/
  tags: ガイド
  text: PHP CLI スクリプトのトレース
- link: https://www.datadoghq.com/blog/monitor-php-performance/
  tag: ブログ
  text: Datadog APM と分散型トレーシングを使用した PHP の監視
- link: https://github.com/DataDog/dd-trace-php
  tag: GitHub
  text: ソースコード
- link: /tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースを調査する
kind: documentation
title: PHP アプリケーションのトレース
type: multi-code-lang
---
## 互換性要件

最新の PHP トレーサーは、バージョン >= 5.4.x をサポートしています。

Datadog の PHP バージョンとフレームワークのサポート一覧 (レガシーバージョンとメンテナンスバージョンを含む) については、[互換性要件][1]ページをご覧ください。

## インストールと利用開始

### アプリ内のドキュメントに従ってください (推奨)

Datadog アプリ内の[クイックスタート手順][2]に従って、最高のエクスペリエンスを実現します。例:

- デプロイコンフィギュレーション (ホスト、Docker、Kubernetes、または Amazon ECS) を範囲とする段階的な手順。
- `service`、`env`、`version` タグを動的に設定します。
- セットアップ中のすべてのトレースの取り込みを有効にします。

APM で使用される用語の説明は、[公式ドキュメント][3]を参照してください。

PHP トレーサーのオープンソースに対する貢献に関しては、[コントリビューションガイド][4]を参照してください。

### APM に Datadog Agent を構成する

インスツルメントされたアプリケーションからトレースを受信するように Datadog Agent をインストールして構成します。デフォルトでは、Datadog Agent は `apm_config` 下にある  `datadog.yaml` ファイルの `enabled: true` で有効になっており、`localhost:8126` でトレーストラフィックをリッスンします。コンテナ化環境の場合、以下のリンクに従って、Datadog Agent 内でトレース収集を有効にします。

{{< tabs >}}
{{% tab "コンテナ" %}}

1. メイン [`datadog.yaml` コンフィギュレーションファイル][1]の `apm_config` セクションで `apm_non_local_traffic: true` を設定します。

2. コンテナ化された環境でトレースを受信するように Agent を構成する方法については、それぞれの説明を参照してください。

{{< partial name="apm/apm-containers.html" >}}
</br>

3. アプリケーションをインスツルメント化した後、トレースクライアントはデフォルトでトレースを `localhost:8126` に送信します。これが正しいホストとポートでない場合は、以下の環境変数を設定して変更します。

   `DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT`

    変数の設定方法については、[環境変数のコンフィギュレーション](#environment-variable-configuration) を参照してください。
{{< site-region region="us3,us5,eu,gov" >}}

4. Datadog Agent の `DD_SITE` を {{< region-param key="dd_site" code="true" >}} に設定して、Agent が正しい Datadog の場所にデータを送信するようにします。

{{< /site-region >}}

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

AWS Lambda で Datadog APM を設定するには、[サーバーレス関数のトレース][1]ドキュメントを参照してください。


[1]: /ja/tracing/serverless_functions/
{{% /tab %}}
{{% tab "その他の環境" %}}

トレースは、[Heroku][1]、[Cloud Foundry][2]、[AWS Elastic Beanstalk][3]、[Azure App Service][4] など、他の多くの環境で利用できます。

その他の環境については、その環境の[インテグレーション][5]のドキュメントを参照し、セットアップの問題が発生した場合は[サポートにお問い合わせ][6]ください。

[1]: /ja/agent/basic_agent_usage/heroku/#installation
[2]: /ja/integrations/cloud_foundry/#trace-collection
[3]: /ja/integrations/amazon_elasticbeanstalk/
[4]: /ja/infrastructure/serverless/azure_app_services/#overview
[5]: /ja/integrations/
[6]: /ja/help/
{{% /tab %}}
{{< /tabs >}}


### 拡張機能をインストール

公式インストーラーをダウンロードします。

```shell
curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
```

インストーラーを実行します。

```shell
# フルインストール: APM + ASM + プロファイリング (ベータ版)
php datadog-setup.php --php-bin=all --enable-appsec --enable-profiling

# APM のみ
php datadog-setup.php --php-bin=all

# APM + ASM
php datadog-setup.php --php-bin=all --enable-appsec

# APM + プロファイリング (ベータ版)
php datadog-setup.php --php-bin=all --enable-profiling
```

このコマンドは、ホストまたはコンテナで見つかったすべての PHP バイナリに拡張機能をインストールします。もし `--php-bin` が省略された場合、インストーラーはインタラクティブモードで実行され、インストールするバイナリを選択するようユーザーに要求します。このとき、`--php-bin` の値には、特定のバイナリへのパスを指定することができます。

PHP (PHP-FPM または Apache SAPI) を再起動し、アプリケーションのトレース可能なエンドポイントにアクセスします。トレースについては、[APM サービス一覧][5]を参照してください。

`--enable-appsec` を指定しない場合、AppSec 拡張機能は起動時にすぐにロードされ、デフォルトでは有効になっていません。これはすぐに短絡し、パフォーマンスのオーバーヘッドを無視できる程度にします。

<div class="alert alert-info">
<strong>注:</strong>
UI にトレースが表示されるまでに数分かかることがあります。数分経ってもトレースが表示されない場合は、ホストマシンで <a href="/tracing/troubleshooting/tracer_startup_logs?tab=php#php-info"><code>phpinfo()</code></a> ページを作成し、`ddtrace` までスクロールダウンしてください。診断に失敗したチェックはこのセクションに表示され、問題を特定するのに役立ちます。
</div>

<div class="alert alert-warning">
<strong>Apache ZTS:</strong>
PHP CLI のバイナリが NTS (non thread-safe) でビルドされ、Apache が ZTS (Zend thread-safe) バージョンの PHP を使用している場合、 ZTS バイナリの拡張機能のロードを手動で変更する必要があります。<code>/path/to/php-zts --ini</code> を実行して Datadog の <code>.ini</code> ファイルがある場所を探し、ファイル名から <code>-zts</code> サフィックスを追加してください。例えば、<code>extension=ddtrace-20210902.so</code> から <code>extension=ddtrace-20210902-zts.so</code> になります。
</div>


## 自動インスツルメンテーション

トレースはデフォルトで自動的に有効になります。拡張機能がインストールされると、**ddtrace** はアプリケーションをトレースし、Agent へトレースを送ります。

Datadog はそのままの状態ですべてのウェブフレームワークをサポートします。自動インスツルメンテーションは、特定の関数やメソッドをトレースするためにラップするよう PHP のランタイムを変更しことで実行されます。PHP トレーサーは、複数のライブラリの自動インスツルメンテーションをサポートします。

自動インスツルメンテーションは以下を取得します。

* メソッド実行時間
* Web リクエスト用 URL やステータスレスポンスコード、またはデータベースアクセス用 SQL クエリなどの関連するトレースデータ
* 未処理の例外（該当する場合スタックトレースを含む）
* Web リクエストなど、システムを通過するトレースの合計数

## コンフィギュレーション

必要に応じて、統合サービスタグ付けの設定など、アプリケーションパフォーマンスのテレメトリーデータを送信するためのトレースライブラリーを構成します。詳しくは、[ライブラリの構成][6]を参照してください。

## 短時間および長時間実行される CLI スクリプトのトレース

CLI スクリプトのインスツルメンテーションを行うには、追加の手順が必要です。詳細は [PHP CLI スクリプトのトレース][7]を参照ください。

## アップグレード

PHP トレーサーをアップグレードするには、[最新のリリースをダウンロード][5]し、[拡張機能のインストール](#install-the-extension)と同じ手順に従います。

インストールが完了したら、PHP (PHP-FPM または Apache SAPI) を再起動します。

**注**: OPcache でパラメーターを `opcache.file_cache` に設定してセカンドレベルキャッシングを使用する場合は、キャッシュフォルダーを削除します。

## 削除中

PHPトレーサーを削除するには:

1. php-fpm の場合は php-fpm サービスを停止し、それ以外の場合は Apache Web サーバーを停止します。
2. php コンフィギュレーションフォルダーから `98-ddtrace.ini` と `99-ddtrace-custom.ini` のファイルのリンクを外します。
3. php-fpm の場合は php-fpm サービスを再起動し、それ以外の場合は Apache Web サーバーを再起動します。

**注**: OPcache でパラメーターを `opcache.file_cache` に設定してセカンドレベルキャッシングを使用する場合は、キャッシュフォルダーを削除します。

## アプリケーションクラッシュのトラブルシューティング

PHP トレーサーが原因でアプリケーションがクラッシュするという異常なイベントが発生した場合、通常はセグメンテーションフォールトが原因で、最善の対応はコアダンプや Valgrind トレースを取得し、Datadog サポートに連絡することです。

### デバッグシンボルをインストールする

コアダンプを読み取るためには、PHP を実行するシステムに PHP バイナリのデバッグシンボルがインストールされていなければなりません。

PHP や PHP-FPM にデバッグシンボルがインストールされているかどうかを確認するには、`gdb` を使用してください。

`gdb` をインストールします。

```
apt|yum install -y gdb
```

対象のバイナリで `gdb` を実行します。たとえば、PHP-FPM の場合は次のようになります。

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


#### CentOS

`debuginfo-install` プログラムを含む `yum-utils` パッケージをインストールします。

```
yum install -y yum-utils
```

PHP バイナリのパッケージ名を確認します。PHP のインストール方法により異なる場合があります。

```
yum list installed | grep php
```

デバッグシンボルをインストールします。`php-fpm` パッケージの場合は次のようになります。

```
debuginfo-install -y php-fpm
```

**注**: PHP バイナリを提供するリポジトリがデフォルトで有効になっていない場合は、`debuginfo-install` コマンドを実行する際に有効にすることができます。たとえば、次のようになります。

```
debuginfo-install --enablerepo=remi-php74 -y php-fpm
```

#### Debian

##### Sury Debian DPA から PHP をインストールした場合

PHP を [Sury Debian DPA][8] からインストールした場合は、DPA でデバッグデバッグシンボルを入手することができます。たとえば、PHP-FPM 7.2 の場合は次のようになります。

```
apt update
apt install -y php7.2-fpm-dbgsym
```

##### 異なるパッケージから PHP をインストールした場合

Debian プロジェクトでは、wiki ページに[デバッグシンボルのインストール手順][9]を掲載しています。

`/etc/apt/sources.list` ファイルを編集します。

```
# ... 既存のパッケージをすべてここに残す

# `deb` deb http://deb.debian.org/debian-debug/ $RELEASE-debug main を追加
# buster の場合の例
deb http://deb.debian.org/debian-debug/ buster-debug main
```

`apt` を更新します。　

```
apt update
```

デバッグシンボルには、まず標準パッケージ名をお試しください。たとえば、パッケージ名が `php7.2-fpm` の場合は次のようになります。

```
apt install -y php7.2-fpm-dbgsym

# 上記が機能しなかった場合

apt install -y php7.2-fpm-dbg
```

デバッグシンボルが見つからない場合は、ユーティリティーツールの `find-dbgsym-packages` バイナリをインストールします。

```
apt install -y debian-goodies
```

バイナリへのフルパスまたは実行中のプロセスのプロセス ID から、デバッグシンボルの検出を試みます。

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

見つかった場合は、結果のパッケージ名をインストールします。

```
apt install -y php7.2-fpm-{package-name-returned-by-find-dbgsym-packages}
```

#### Ubuntu

##### `ppa:ondrej/php` から PHP をインストールした場合　

PHP を [`ppa:ondrej/php`][10] からインストールした場合は、`main/debug` コンポーネントを追加して apt ソースファイル `/etc/apt/sources.list.d/ondrej-*.list` を編集します。

以前:

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main```

以降:

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main main/debug```

デバッグシンボルを更新およびインストールします。たとえば、PHP-FPM 7.2 の場合は次のようになります。

```
apt update
apt install -y php7.2-fpm-dbgsym
```
##### 異なるパッケージから PHP をインストールした場合

PHP バイナリのパッケージ名を確認します。PHP のインストール方法により異なる場合があります。

```
apt list --installed | grep php
```

**注**: `php-fpm` は、実際のパッケージを参照するメタパッケージである場合もあります (例: PHP-FPM 7.2 の場合は `php7.2-fpm`)。この場合、パッケージ名は後者のようになります。

デバッグシンボルには、まず標準パッケージ名をお試しください。たとえば、パッケージ名が `php7.2-fpm` の場合は次のようになります。

```
apt install -y php7.2-fpm-dbgsym

# 上記が機能しなかった場合

apt install -y php7.2-fpm-dbg
```

`-dbg` および `-dbgsym` パッケージが見つからない場合は、`ddebs` リポジトリを有効にしてください。`ddebs` から[デバッグシンボルをインストールする方法][11]についての詳細は、Ubuntu のドキュメントを参照してください。

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

デバッグシンボルの正規のパッケージ名を追加してください。たとえば、パッケージ名が `php7.2-fpm` の場合は次のようになります。

```
apt install -y php7.2-fpm-dbgsym

# 上記が機能しなかった場合

apt install -y php7.2-fpm-dbg
```

デバッグシンボルが見つからない場合は、ユーティリティツール `find-dbgsym-packages` を使用してバイナリをインストールします。

```
apt install -y debian-goodies
```

バイナリへのフルパスまたは実行中のプロセスのプロセス ID から、デバッグシンボルの検出を試みます。

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

見つかった場合は、結果のパッケージ名をインストールします。

```
apt install -y php7.2-fpm-{package-name-returned-by-find-dbgsym-packages}
```

### コアダンプの取得

PHP アプリケーションのコアダンプを取得することは、特に PHP-FPM では難しい場合があります。コアダンプを取得するのに役立ついくつかのヒントを次に示します。

1. アプリケーションエラーログを調べて、PHP-FPM がコアダンプを生成したかどうかを確認します。
   - `(SIGSEGV - core dumped)` を検索します。これは、次のようなメッセージはダンプされたことを意味するためです: `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV - core dumped) after <duration> seconds from start`
   - `(SIGSEGV)` を検索します。これは、次のようなメッセージはコアがダンプされなかったことを意味するためです: `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV) after <duration> seconds from start`
1. `cat /proc/sys/kernel/core_pattern` を実行して、コアダンプを見つけます。デフォルト値は通常 `core` です。これは、`core` という名前のファイルが Web ルートフォルダーに生成されることを意味します。

コアダンプが生成されなかった場合は、次のコンフィギュレーションを確認し、必要に応じて変更します。

1. `/proc/sys/kernel/core_pattern` にネストされたディレクトリを含むパスが含まれている場合は、完全なディレクトリパスが存在することを確認します。
1. PHP-FPM プールワーカーを実行しているユーザーが `root` 以外の場合 (一般的なユーザー名は `www-data`)、そのユーザーにコアダンプディレクトリへの書き込みアクセス許可を付与します。
1. `/proc/sys/fs/suid_dumpable` の値が `0` ではないことを確認します。PHP-FPM ワーカープールを `root` として実行しない限り、`1` または `2` に設定します。システム管理者にオプションを確認します。
1. PHP-FPM プールコンフィギュレーションセクションに適切な `rlimit_core` があることを確認します。これは unlimited に設定できます: `rlimit_core = unlimited`
1. システムに適切な `ulimit` が設定されていることを確認します。これは unlimited に設定できます: `ulimit -c unlimited`
1. アプリケーションが Docker コンテナで実行されている場合は、ホストマシンに対して `/proc/sys/*` への変更を行う必要があります。使用可能なオプションについては、システム管理者に問い合わせてください。可能であれば、テスト環境またはステージング環境で問題を再現してみてください。

### Valgrind トレースの取得

クラッシュの詳細を把握するために、Valgrind でアプリケーションを実行します。コアダンプとは異なり、このアプローチは常に非特権のコンテナで動作します。

<div class="alert alert-danger">
<strong>注</strong>: Valgrind を介して実行されるアプリケーションは、ネイティブで実行される場合に比べて極めて遅くなります。この方法は、本番ではない環境で使用することをお勧めします。
</div>

お使いのパッケージマネージャーで Valgrind をインストールします。アプリケーションを Valgrind で実行し、いくつかのリクエストを生成します。

CLI アプリケーションの場合は、次を実行します。
{{< code-block lang=shell >}}
USE_ZEND_ALLOC=0 valgrind -- php path/to/script.php
{{< /code-block >}}
When running `php-fpm` run:
{{< code-block lang="shell" >}}
USE_ZEND_ALLOC=0 valgrind --trace-children=yes -- php-fpm -F --fpm-config <CONFIG_FILE_PATH> <MORE_OPTIONS>
{{< /code-block >}}
When using Apache, run:
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

### strace の取得

外的要因によって問題が引き起こされる場合もあるため、このような場合に `strace` は貴重な情報源となります。

<div class="alert alert-danger">
<strong>注</strong>: <code>strace</code> を介して実行されるアプリケーションは、ネイティブで実行される場合に比べて極めて遅くなります。この方法は、本番ではない環境で使用することをお勧めします。
</div>

お使いのパッケージマネージャーで `strace` をインストールしてください。Datadog サポートに送信する `strace` を生成する際には、`-f` オプションを使用して子プロセスを追跡します。

For a CLI application, run:
{{< code-block lang="shell" >}}
strace -f php path/to/script.php
{{< /code-block >}}

`php-fpm` の場合は、次を実行します。
{{< code-block lang="shell" >}}
strace -f php-fpm -F --fpm-config <CONFIG_FILE_PATH> <MORE_OPTIONS>
{{< /code-block >}}

Apache の場合は、次を実行します。
{{< code-block lang="shell" >}}
(. /etc/apache2/envvars; strace -f apache2 -X)
{{< /code-block >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/php
[2]: https://app.datadoghq.com/apm/docs
[3]: /ja/tracing/glossary/
[4]: https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md
[5]: https://app.datadoghq.com/apm/services
[6]: /ja/tracing/trace_collection/library_config/php/
[7]: /ja/tracing/guide/trace-php-cli-scripts/
[8]: https://packages.sury.org/php/
[9]: https://wiki.debian.org/HowToGetABacktrace
[10]: https://launchpad.net/~ondrej/+archive/ubuntu/php
[11]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages
[12]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages#Getting_-dbgsym.ddeb_packages
[13]: https://valgrind.org/docs/manual/manual-core.html#manual-core.comment