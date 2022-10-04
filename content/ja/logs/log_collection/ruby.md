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
kind: documentation
title: Ruby on Rails ログ収集
---

## 概要

Datadog にログを送信する際は、[`lograge`][1] を適用したファイルにログを記録し、Datadog Agent でそのファイルを追跡します。Ruby でロギングのセットアップを行う際は、[予約済み属性][2]に注意してください。

次のような Rails ログ出力があったとします。

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

以下の情報が JSON 形式でログラインに表示されることが期待できます。

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

## セットアップ

このセクションでは、Rails アプリケーションのログを Datadog に転送する際に必要となる最低限のセットアップについて説明します。このセットアップに関するさらに詳しいサンプルは、「[Rails アプリケーションログを収集、カスタマイズ、管理する方法][3]」を参照してください。

1. プロジェクトに Lograge gem を追加します。

    ```ruby
    gem 'lograge'
    ```

2. Lograge を構成します。コンフィギュレーションファイルで以下のように記述してください。

    ```ruby
    # Lograge config
    config.lograge.enabled = true

    # This specifies to log in JSON format
    config.lograge.formatter = Lograge::Formatters::Json.new

    ## Disables log coloration
    config.colorize_logging = false

    # Log to a dedicated file
    config.lograge.logger = ActiveSupport::Logger.new(File.join(Rails.root, 'log', "#{Rails.env}.log"))

    # This is useful if you want to log query parameters
    config.lograge.custom_options = lambda do |event|
        { :ddsource => 'ruby',
          :params => event.payload[:params].reject { |k| %w(controller action).include? k }
        }
    end
    ```

   **注**: コンテキスト情報をログに追加するよう Lograge で設定を行うことも可能です。詳細は [Lograge ドキュメント][4]を参照してください。

3. Datadog Agent を構成します。`conf.d/` フォルダーに、次の内容を含む `ruby.d/conf.yaml` ファイルを作成します。

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

   [Agent のログ収集][5] の詳細もご確認ください。

4. [Agent を再起動します][6]。

## 補足説明

### ログとトレースの接続

このアプリケーションで APM が有効になっている場合、[APM Ruby のロギング手順に従う][7]ことでアプリケーションログとトレースの関連性を高め、ログにトレースとスパン ID を自動的に追加することが可能です。

### アプリケーションで推奨されるログの例

これで、適切な JSON を送信するログ構成になりました。できるだけこれを使用してください。

ログを取る際には、できるだけ多くのコンテキスト (ユーザー、セッション、アクション、メトリクス) を追加します。

単純な文字列メッセージのログの代わりに、次の例に示すようにログのハッシュを使用することができます。

```ruby
my_hash = {'user' => '1234', 'button_name'=>'save','message' => 'User 1234 clicked on button saved'};
logger.info(my_hash);
```

ハッシュは JSON に変換されます。そして、`user` と `button_name` に対して Analytics を持つことができるようになります。

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

### RocketPants の推奨ログコンフィギュレーション

`config/initializers/lograge_rocketpants.rb` ファイル (プロジェクトによって異なります) で、Lograge が `rocket_pants` コントローラと連動するように構成します。

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

### Grape の推奨ログ構成

`grape_logging` を追加します。

```ruby
gem 'grape_logging'
```

追加の構成を Grape に渡します。

```ruby
use GrapeLogging::Middleware::RequestLogger,
      instrumentation_key: 'grape',
      include: [ GrapeLogging::Loggers::Response.new,
                 GrapeLogging::Loggers::FilterParameters.new ]
```

`config/initializers/instrumentation.rb` ファイルを作成し、次の構成を追加します。

```ruby
# grape リクエストをサブスクライブし、Grape 専用のロガーでログを記録します
grape_logger = Logging.logger['Grape']
ActiveSupport::Notifications.subscribe('grape') do |name, starts, ends, notification_id, payload|
    grape_logger.info payload
end
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/roidrage/lograge
[2]: /ja/logs/log_configuration/attributes_naming_convention/#reserved-attributes
[3]: https://www.datadoghq.com/blog/managing-rails-application-logs
[4]: https://github.com/roidrage/lograge#installation
[5]: /ja/agent/logs/
[6]: /ja/agent/guide/agent-commands/#restart-the-agent
[7]: /ja/tracing/connect_logs_and_traces/ruby/