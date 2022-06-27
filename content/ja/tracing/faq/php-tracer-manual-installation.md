---
kind: faq
title: PHP トレーサーの手動インストール
---

## 始める前に

Datadog は、[公式インストーラー][1]を使用して PHP 拡張機能をインストールすることを推奨します。別のインストール方法を使用したい場合は、以下の手順に従ってください。

<div class="alert alert-info">
<strong>注:</strong>
UI にトレースが表示されるまでに数分かかることがあります。数分経ってもトレースが表示されない場合は、ホストマシンで <a href="/tracing/troubleshooting/tracer_startup_logs?tab=php#php-info"><code>phpinfo()</code></a> ページを作成し、`ddtrace` までスクロールダウンしてください。診断に失敗したチェックはこのセクションに表示され、問題を特定するのに役立ちます。
</div>

### .deb、.rpm、.apk からのインストール

[サポートされているディストリビューション用のコンパイル済みパッケージ][2]のいずれかをダウンロードします。

以下のいずれかのコマンドで、パッケージをインストールします。

```shell
# RPM パッケージを使用 (RHEL/Centos 6 以降、Fedora 20 以降)
rpm -ivh datadog-php-tracer.rpm

# DEB パッケージを使用 (Debian Jessie 以降、対応するバージョンの PHP にインストールされた Ubuntu 14.04 以降)
dpkg -i datadog-php-tracer.deb

# APK パッケージを使用 (Alpine)
apk add datadog-php-tracer.apk --allow-untrusted
```

この拡張機能は、デフォルトの PHP バージョンをインストールします。特定の PHP バージョンの拡張機能をインストールするには、インストールを実施する前に `DD_TRACE_PHP_BIN` 環境変数を使用してターゲット PHP バイナリの場所を設定します。

```shell
export DD_TRACE_PHP_BIN=$(which php-fpm7)
```

### .tar.gz アーカイブからのインストール

[リリースページ][3]から最新の `.tar.gz` をダウンロードします。

パッケージをダウンロードした場所から

```bash
$ tar -xf datadog-php-tracer.tar.gz -C /
```

#### INI ファイルの自動セットアップ

標準的な PHP のインストールの場合、以下のコマンドで自動的に拡張モジュールのインストールと構成が行われます。

```
$ /opt/datadog-php/bin/post-install.sh
```

拡張機能が正しくインストールされていることを確認する

```bash
$ php --ri=ddtrace

ddtrace

Datadog PHP tracer extension
...
```

PHP のインストールが標準でない場合、上記の手順は失敗する可能性があります。この場合、[以下の手動手順](#manual-ini-file-setup)に進みます。

#### INI ファイルの手動セットアップ

この手順は、[INI ファイルの自動セットアップ](#automatic-ini-file-setup)がうまくいかなかった場合のみ必要です。

PHP ランタイムで **ddtrace** 拡張機能を使用できるように `php.ini` 構成ファイルを変更します。INI ファイルがどこにあるかは、以下のコマンドを実行することで確認できます。

```bash
$ php --ini

Configuration File (php.ini) Path: /usr/local/etc/php/7.2
Loaded Configuration File:         /usr/local/etc/php/7.2/php.ini
...
```

`php.ini` ファイルに以下の行を追加します。

```ini
extension=/opt/datadog-php/extensions/ddtrace-<PHP_EXTENSION_VERSION>.so
ddtrace.request_init_hook=/opt/datadog-php/dd-trace-sources/bridge/dd_wrap_autoloader.php
```

`PHP_EXTENSION_VERSION` の正しい値は、PHP のバージョンに依存します。

| PHP バージョン | PHP_EXTENSION_VERSION |
|-------------|-----------------------|
| `5.4`       | `20100412`            |
| `5.5`       | `20121113`            |
| `5.6`       | `20131106`            |
| `7.0`       | `20151012`            |
| `7.1`       | `20160303`            |
| `7.2`       | `20170718`            |
| `7.3`       | `20180731`            |
| `7.4`       | `20190902`            |
| `8.0`       | `20200930`            |
| `8.1`       | `20210902`            |

### ソースからのインストール

リリースページから[ソースコード `tar.gz` または `.zip` ファイルをダウンロード][2]して、ファイルを解凍します。その後、以下のコマンドで拡張機能をコンパイルしてインストールします。

```bash
$ cd /path/to/dd-trace-php
$ phpize
$ ./configure --enable-ddtrace
$ make
$ sudo make install
```

#### INI ファイルの修正

PHP ランタイムで **ddtrace** 拡張機能を使用できるように `php.ini` 構成ファイルを変更します。INI ファイルがどこにあるかは、以下のコマンドを実行することで確認できます。

```bash
$ php --ini

Configuration File (php.ini) Path: /usr/local/etc/php/7.2
Loaded Configuration File:         /usr/local/etc/php/7.2/php.ini
...
```

`php.ini` ファイルに以下の行を追加します。

```ini
extension=ddtrace.so
```

PHP トレーサーを手動でインストールした方法にもよりますが、 この行を `php.ini` ファイルに追加する必要があります。

```ini
# .tar.gz からインストールした場合
ddtrace.request_init_hook=<PATH_TO_EXTRACTED_TAR_GZ>/dd-trace-sources/bridge/dd_wrap_autoloader.php

# ソースからインストールした場合
ddtrace.request_init_hook=<PATH_TO_SOURCES>/bridge/dd_wrap_autoloader.php
```

Web サーバー/PHP SAPI を再起動すると (例: `$ sudo apachectl restart`、`$ sudo service php-fpm restart` など)、拡張機能が有効化されます。拡張機能がロードされていることを確認するために、以下を実行します。

```bash
$ php --ri=ddtrace

ddtrace

Datadog PHP tracer extension
...
```

アプリケーションのトレース可能なエンドポイントにアクセスし、[APM UI][4] を表示すると、[トレース][5]を見ることができます。

**注**: UI にトレースが表示されるまで、数分かかる場合があります。

[1]: /ja/tracing/setup/php/#install-the-extension
[2]: https://github.com/DataDog/dd-trace-php/releases/latest
[3]: https://github.com/DataDog/dd-trace-php/releases
[4]: https://app.datadoghq.com/apm/services
[5]: /ja/tracing/visualization/#trace