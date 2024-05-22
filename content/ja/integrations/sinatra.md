---
aliases:
- /ja/logs/log_collection/nxlog
categories:
- ログの収集
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/sinatra.md
description: Sinatra アプリケーションログを収集
has_logo: true
integration_id: sinatra
integration_title: Sinatra
is_public: true
kind: インテグレーション
name: Sinatra
public_title: Datadog-Sinatra インテグレーション
short_description: Sinatra アプリケーションログを収集
supported_os:
- linux
- mac_os
- windows
title: Sinatra
---

## 概要

このインテグレーションを使用すると、[Sinatra][1] アプリケーションから Web アクセスログを取得して、以下を監視できます。

- エラーログ (4xx コード、5xx コード)
- Web ページの応答時間
- リクエスト数
- 送受信されたバイト数

## セットアップ

### インストール

Sinatra アプリケーションを実行するインスタンスに [Agent をインストール][2]します。

### コンフィギュレーション

[Sinatra のログ機能][3]は、デフォルトでログを stdout に記録します。[Rack][4] の [CommonLogger][5] を使用して、ログをファイルとコンソールに記録することをお勧めします。

以下に、ログをファイルとコンソールに生成する構成例を示します。これは、Rack 構成ファイル (`config.ru`) または Sinatra アプリケーションの構成ブロックで設定できます。

```ruby
require 'sinatra'

configure do
  # クラシックスタイルのアプリケーションでは、ログはデフォルトで有効になっています。
  # したがって、`enable :logging` は必要ありません。
  file = File.new("/var/log/sinatra/access.log", 'a+')
  file.sync = true
  use Rack::CommonLogger, file
end

get '/' do
  'Hello World'
end
```

このロガーは、一般的な Apache アクセス形式を使用して、次の形式でログを生成します。

```text
127.0.0.1 - - [15/Jul/2018:17:41:40 +0000] "GET /uptime_status HTTP/1.1" 200 34 0.0004
127.0.0.1 - - [15/Jul/2018 23:40:31] "GET /uptime_status HTTP/1.1" 200 6997 1.8096
```

#### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. Sinatra アプリケーションログの収集を開始するには、[Agent の構成ディレクトリ][6]のルートにある `sinatra.d/conf.yaml` ファイルに次の構成ブロックを追加します。

    ```yaml
    logs:
      - type: file
        path: /var/log/sinatra/access.log
        source: sinatra
        service: webapp
    ```

      `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。

3. [Agent を再起動します][7]。

[1]: http://sinatrarb.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: http://sinatrarb.com/intro.html#Logging
[4]: http://rack.github.io
[5]: https://www.rubydoc.info/github/rack/rack/Rack/CommonLogger
[6]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: /ja/agent/guide/agent-commands/#restart-the-agent