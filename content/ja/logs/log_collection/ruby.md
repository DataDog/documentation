---
title: Ruby on Rails ログ収集
kind: documentation
aliases:
  - /ja/logs/languages/ruby
further_reading:
  - link: 'https://github.com/roidrage/lograge'
    tag: Github
    text: Lograge ドキュメント
  - link: /logs/processing/
    tag: Documentation
    text: ログの処理方法
  - link: /logs/faq/log-collection-troubleshooting-guide/
    tag: よくあるご質問
    text: ログ収集のトラブルシューティングガイド
---
Datadog にログを送信する際は、[`lograge`][1] を適用したファイルにログを記録し、Datadog Agent でそのファイルを追跡することをお勧めします。Ruby でロギングのセットアップを行う際は、[予約済み属性][2]に注意してください。

次のような Rail ログ出力があったとします。

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

Lograge による書式設定が完了すると、以下のように重要な情報をすべて格納した 1 行のログが JSON 形式で作成されます。

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

このセクションでは、Rails アプリケーションのログを Datadog に転送する際に必要となる最低限のセットアップについて説明します。このセットアップに関するさらに詳しいサンプルは、ブログ記事「[Rails アプリケーションログを収集、カスタマイズ、管理する方法][3]」を参照してください。

1. **プロジェクトに Lograge GEM を追加します**。

    ```ruby
    gem 'lograge'
    ```

2. **Lograge を構成します**。コンフィギュレーションファイルで以下のように記述してください。

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

   **注**: コンテキスト情報をログに追加するよう Lograge で設定を行うことも可能です。詳細は公式の [Lograge ドキュメント][4]でご確認ください。

3. **Datadog Agent を構成します**。`conf.d/` フォルダーに、次の内容を含む `ruby.d/conf.yaml` ファイルを作成します。

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

このアプリケーションで APM が有効になっている場合、[APM Ruby ロギングの指示に従って][7]ログにトレース ID とスパン ID を自動的に追加することで、アプリケーションログとトレース間の相関関係を改善できます。

### アプリケーションで推奨されるログの例

これで、適切な JSON を送信するログ構成になりました。できるだけこれを活用してください。

送信するログの各行にできるだけ多くのコンテキスト (ユーザー、セッション、アクション、メトリクスなど) を入れることをお勧めします。
それには、単純な文字列メッセージをログに記録するのではなく、次の例のように、ハッシュをログに記録します。

```ruby
my_hash = {'user' => '1234', 'button_name'=>'save','message' => 'User 1234 clicked on button saved'};
logger.info(my_hash);
```

このハッシュは JSON に変換され、`user` や `button_name` などに対して分析を行うことができます。

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

`config/initializers/lograge_rocketpants.rb` ファイル (プロジェクトによって異なります) を次のように構成します。

```ruby
# rocket_pants のコントローラーを使用するよう Lograge を構成します
#
# 参照:
#   https://github.com/Sutto/rocket_pants/issues/111
#
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

grape_logging gem を追加します。

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
[2]: /ja/logs/processing/attributes_naming_convention/#reserved-attributes
[3]: https://www.datadoghq.com/blog/managing-rails-application-logs
[4]: https://github.com/roidrage/lograge#installation
[5]: /ja/agent/logs/
[6]: /ja/agent/guide/agent-commands/#restart-the-agent
[7]: /ja/tracing/connect_logs_and_traces/ruby/