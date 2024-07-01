---
aliases:
- /ja/logs/languages/ruby
further_reading:
- link: https://github.com/roidrage/lograge
  tag: Github
  text: Lograge ドキュメント
- link: /logs/log_configuration/processors
  tag: Documentation
  text: ログの処理方法
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: よくあるご質問
  text: ログ収集のトラブルシューティングガイド
- link: https://www.datadoghq.com/blog/managing-rails-application-logs/
  tag: ブログ
  text: Rails アプリケーションログを収集、カスタマイズ、管理する方法
- link: https://www.datadoghq.com/blog/log-file-control-with-logrotate/
  tag: ブログ
  text: logrotate を使ったログファイルの管理方法
- link: /glossary/#tail
  tag: 用語集
  text: 用語集 "テール" の項目
title: Ruby on Rails ログ収集
---

## 概要

Datadog にログを送信する際は、[`Lograge`][1] を適用したファイルにログを記録し、Datadog Agent でそのファイルを[テール][11]します。Ruby でロギングのセットアップを行う際は、[予約済み属性][2]に注意してください。

Lograge を使えば、この例のように、テキストベースの標準的なログ形式を、

```text
Started GET "/" for 127.0.0.1 at 2012-03-10 14:28:14 +0100
Processing by HomeController#index as HTML
  Rendered text template within layouts/application (0.0ms)
  Rendered layouts/_assets.html.erb (2.0ms)
  Rendered layouts/_top.html.erb (2.6ms)
  Rendered layouts/_about.html.erb (0.3ms)
  Rendered layouts/_google_analytics.html.erb (0.4ms)
Completed 200 OK in 79ms (Views: 78.8ms | ActiveRecord: 0.0ms)
```

より多くの構造を提供する以下の JSON 形式のログに変換することができます。

```json
{
  "timestamp": "2016-01-12T19:15:19.118829+01:00",
  "level": "INFO",
  "logger": "Rails",
  "method": "GET",
  "path": "/jobs/833552.json",
  "format": "json",
  "controller": "jobs",
  "action": "show",
  "status": 200,
  "duration": 58.33,
  "view": 40.43,
  "db": 15.26
}
```

## ロガーのインストールと構成

{{< tabs >}}
{{% tab "Lograge" %}}

1. プロジェクトに `lograge` gem を追加します。
    ```ruby
    gem 'lograge'
    ```
2. コンフィギュレーションファイルで、以下を設定し、Lograge を構成します。
    ```ruby
    # Lograge config
    config.lograge.enabled = true

    # This specifies to log in JSON format
    config.lograge.formatter = Lograge::Formatters::Json.new

    ## Disables log coloration
    config.colorize_logging = false

    # Log to a dedicated file
    config.lograge.logger = ActiveSupport::Logger.new(Rails.root.join('log', "#{Rails.env}.log"))

    # This is useful if you want to log query parameters
    config.lograge.custom_options = lambda do |event|
        { :ddsource => 'ruby',
          :params => event.payload[:params].reject { |k| %w(controller action).include? k }
        }
    end
    ```
   **注**: Lograge はコンテキスト情報をログに追加することも可能です。詳細は [Lograge ドキュメント][1]を参照してください。

この設定の詳細な例については、[Rails アプリケーションのログを収集、カスタマイズ、管理する方法][2]を参照してください。

### RocketPants

Lograge を `rocket_pants` コントローラに構成するには、`config/initializers/lograge_rocketpants.rb` ファイル (場所はプロジェクトによって異なる場合があります) を作成します。

```ruby
# 参照:
#   https://github.com/Sutto/rocket_pants/issues/111
app = Rails.application
if app.config.lograge.enabled
  ActiveSupport::LogSubscriber.log_subscribers.each do |subscriber|
    case subscriber
      when ActionController::LogSubscriber
        Lograge.unsubscribe(:rocket_pants, subscriber)
    end
  end
  Lograge::RequestLogSubscriber.attach_to :rocket_pants
end
```

[1]: https://github.com/roidrage/lograge#installation
[2]: https://www.datadoghq.com/blog/managing-rails-application-logs
{{% /tab %}}
{{% tab "Grape" %}}

1. プロジェクトに `grape_logging` gem を追加します。

    ```ruby
    gem 'grape_logging'
    ```
2. 追加の構成を Grape に追加します。

    ```ruby
    use GrapeLogging::Middleware::RequestLogger,
          instrumentation_key: 'grape',
          include: [ GrapeLogging::Loggers::Response.new,
                    GrapeLogging::Loggers::FilterParameters.new ]
    ```
3. `config/initializers/instrumentation.rb` ファイルを作成し、次の構成を追加します。

    ```ruby
    # Subscribe to grape request and log with a logger dedicated to Grape
    grape_logger = Logging.logger['Grape']
    ActiveSupport::Notifications.subscribe('grape') do |name, starts, ends, notification_id, payload|
        grape_logger.info payload
    end
    ```

{{% /tab %}}
{{< /tabs >}}
## Datadog Agent の構成

[ログ収集が有効][3]になったら、以下を行ってログファイルを追跡して Datadog に送信する[カスタムログ収集][4]を設定します。

1. `ruby.d/` フォルダーを `conf.d/` [Agent 構成ディレクトリ][5]に作成します。
2. `ruby.d/` に以下の内容で `conf.yaml` ファイルを作成します。
    ```yaml
      logs:
        - type: file
          path: "<RUBY_LOG_FILE_PATH>.log"
          service: ruby
          source: ruby
          sourcecategory: sourcecode
          ## Uncomment the following processing rule for multiline logs if they
          ## start by the date with the format yyyy-mm-dd
          #log_processing_rules:
          #  - type: multi_line
          #    name: new_log_start_with_date
          #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```
4. [Agent を再起動します][6]。
5. [Agent の status サブコマンド][8]を実行し、`Checks` セクションで `ruby` を探し、ログが Datadog に正常に送信されることを確認します。

ログが JSON 形式の場合、Datadog は自動的にログメッセージを[パース][9]し、ログ属性を抽出します。[ログエクスプローラー][10]を使用して、ログを表示し、トラブルシューティングを行うことができます。

## ログとトレースの接続

このアプリケーションで APM が有効になっている場合、[APM Ruby のロギング手順][7]に従うことでアプリケーションログとトレースの関連性を高め、ログにトレースとスパン ID を自動的に追加することが可能です。

## ベストプラクティス

可能な限り、ログに追加のコンテキスト (ユーザー、セッション、アクション、メトリクス) を追加します。

単純な文字列メッセージのログの代わりに、次の例に示すようにログのハッシュを使用することができます。

```ruby
my_hash = {'user' => '1234', 'button_name'=>'save','message' => 'User 1234 clicked on button saved'};
logger.info(my_hash);
```

ハッシュは JSON に変換され、`user` と `button_name` の分析を実行することができます。

```json
{
  "timestamp": "2016-01-12T19:15:18.683575+01:00",
  "level": "INFO",
  "logger": "WelcomeController",
  "message": {
    "user": "1234",
    "button_name": "save",
    "message": "User 1234 clicked on button saved"
  }
}
```
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/roidrage/lograge
[2]: /ja/logs/log_configuration/attributes_naming_convention/#reserved-attributes
[3]: /ja/agent/logs/?tab=tailfiles#activate-log-collection
[4]: /ja/agent/logs/?tab=tailfiles#custom-log-collection
[5]: /ja/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[6]: /ja/agent/guide/agent-commands/#restart-the-agent
[7]: /ja/tracing/other_telemetry/connect_logs_and_traces/ruby/
[8]: /ja/agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
[9]: /ja/logs/log_configuration/parsing
[10]: /ja/logs/explorer/
[11]: /ja/glossary/#tail