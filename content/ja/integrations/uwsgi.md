---
categories:
- ログの収集
- web
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/uwsgi.md
description: uWSGI のログを収集して、毎秒のリクエスト数、処理バイト数、リクエストステータスなどを追跡
doc_link: /integrations/uwsgi/
git_integration_title: uwsgi
has_logo: true
integration_id: uwsgi
integration_title: uWSGI
is_public: true
name: uwsgi
public_title: Datadog-uWSGI インテグレーション
short_description: ログを収集して、毎秒のリクエスト数、処理バイト数、リクエストステータスなどを追跡できます。
supported_os:
- linux
- mac_os
- windows
title: uWSGI
---

## 概要

uWSGI のログを収集して、毎秒のリクエスト数、処理バイト数、リクエストステータス (2xx、3xx、4xx、5xx)、サービスのアップタイム、速度低下などを追跡できます。

## セットアップ

### インストール

uWSGI サーバーが実行されているインスタンス上に [Agent をインストール][1]します。

### 構成

uWSGI サーバーは、デフォルトでログを stdout に記録します。ファイルへのログ記録を開始するには、以下のコマンドを実行するか、[ファイルへのログ記録に関する uWSGI の説明][2]に従います。

```text
uwsgi --socket :3031 --logger file:logfile=/var/log/uwsgi/uwsgi.log,maxsize=2000000
```

Agent の構成ディレクトリのルートに `uwsgi.d/conf.yaml` ファイルを作成します。

#### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

```yaml
logs_enabled: true
```

続いて、次の構成ブロックを `uwsgi.d/conf.yaml` ファイルに追加して、ログの収集を開始します。

```yaml
logs:
    - type: file
      path: /var/log/uwsgi/uwsgi.log
      service: '<MY_APPLICATION>'
      source: uwsgi
```

最後に、[Agent を再起動][3]します。

Datadog-uWSGI インテグレーションは、デフォルトで、[uWSGI のデフォルトのログ形式][4]と [Apache のような結合形式][5]をサポートします。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://uwsgi-docs.readthedocs.io/en/latest/Logging.html#logging-to-files
[3]: /ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[4]: https://uwsgi-docs.readthedocs.io/en/latest/LogFormat.html#uwsgi-default-logging
[5]: https://uwsgi-docs.readthedocs.io/en/latest/LogFormat.html#apache-style-combined-request-logging
[6]: /ja/help/