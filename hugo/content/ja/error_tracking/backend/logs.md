---
aliases:
- /ja/error_tracking/logs
description: ログからバックエンドエラーを追跡する方法について説明します。
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: ブログ
  text: Datadog Error Tracking で、アプリケーションの問題を解明
- link: /logs/error_tracking/explorer/
  tag: ドキュメント
  text: エラートラッキングエクスプローラーについて
is_beta: true
title: Track Backend Error Logs
---

## 概要

Datadog でまだログを収集していない場合は、[ログドキュメント][10]を参照してログを設定してください。`source` タグ (言語指定) が適切に構成されていることを確認してください。Datadog では、Agent ベースのログ収集の設定を推奨しています。

## セットアップ

**Python**、**Java**、**Ruby** などの言語では、ログの `source` タグが正しく構成されていれば、追加の構成は必要ありません。必要な属性はすべて自動的にタグ付けされ、Datadog に送信されます。

**C#**、**.NET**、**Go**、**Node.js** などのバックエンド言語については、各セクションのコード例で、エラーログを適切に構成し、ログの `error.stack` に必要なスタックトレースをアタッチする方法を示しています。

もし、スタックトレースを Datadog に送信しているが、`error.stack` にない場合、[ジェネリックログリマッパー][8]をセットアップして、スタックトレースを Datadog の正しい属性にリマップすることが可能です。

課題でのインラインコードスニペットを構成するには、[ソースコードインテグレーション][9]を設定します。Error Tracking for Logs でコードスニペットを追加する場合、APM は必要ありません。エンリッチメントタグとリンク先のリポジトリは、どちらも同じです。

#### Error Tracking 用の属性

Error Tracking を有効にするには、ログに以下の属性を含める必要があります。

- `error.kind` または `error.stack` のいずれかのフィールド。**注**: `error.stack` を使用する場合は、有効なスタックトレースでなければなりません。
- `Service` 属性
- `ERROR`、`CRITICAL`、`ALERT`、または `EMERGENCY` のステータスレベル。

以下に示す残りの属性はオプションですが、これらを使用することでエラーをより適切にグループ分けすることができます。

特定の属性には、Datadog 内で専用の UI 表示があります。Error Tracking でこれらの機能を有効にするには、以下の属性名を使用します。

| 属性            | 説明                                                             |
|----------------------|-------------------------------------------------------------------------|
| `error.stack`        | 実際のスタックトレース                                                      |
| `error.message`      | スタックトレースに含まれるエラーメッセージ                              |
| `error.kind`         | エラーのタイプまたは「種類」("Exception" や "OSError" など) |

**注**: インテグレーションパイプラインは、デフォルトのログライブラリパラメーターをこれらの属性に再マップし、スタックトレースをパースまたはトレースバックして、自動的に `error.message` と `error.kind` を抽出しようとします。

詳しくは、[ソースコードと属性ドキュメント][11]をご覧ください。

### C# と .NET

{{< tabs >}}
{{% tab "Serilog" %}}

C# のログ収集の設定をしていない場合は、[C# ログ収集ドキュメント][1]を参照してください。

キャッチした例外を自分でログに残すには、オプションで以下を使用できます。

```csharp
var log = new LoggerConfiguration()
    .WriteTo.File(new JsonFormatter(renderMessage: true), "log.json")
    .Enrich.WithExceptionDetails()
    .CreateLogger();
try {
  // ...
} catch (Exception ex) {
  // ログ呼び出しの最初の引数として例外を渡す
  log.Error(ex, "an exception occurred");
}
```

[1]: /ja/logs/log_collection/csharp/?tab=serilog

{{% /tab %}}
{{% tab "NLog" %}}

C# のログ収集の設定をしていない場合は、[C# ログ収集ドキュメント][1]を参照してください。

キャッチした例外を自分でログに残すには、オプションで以下を使用できます。

```csharp
private static Logger log = LogManager.GetCurrentClassLogger();

static void Main(string[] args)
{
  try {
    // ...
  } catch (Exception ex) {
    // ログ呼び出しの第二引数として例外を渡す
    log.ErrorException("an exception occurred", ex);
  }
}
```

[1]: /ja/logs/log_collection/csharp/?tab=serilog

{{% /tab %}}
{{% tab "Log4Net" %}}

C# のログ収集の設定をしていない場合は、[C# ログ収集ドキュメント][1]を参照してください。

キャッチした例外を自分でログに残すには、オプションで以下を使用できます。

```csharp
class Program
{
  private static ILog logger = LogManager.GetLogger(typeof(Program));

  static void Main(string[] args)
  {
    try {
      // ...
    } catch (Exception ex) {
      // ログ呼び出しの第二引数として例外を渡す
      log.Error("an exception occurred", ex);
    }
  }
}
```

[1]: /ja/logs/log_collection/csharp/?tab=serilog

{{% /tab %}}
{{< /tabs >}}

### Go

#### Logrus

Go のログ収集の設定をしていない場合は、[Go ログ収集ドキュメント][3]を参照してください。

キャッチした例外を自分でログに残すには、オプションで以下を使用できます。

```go
// https://github.com/pkg/errors の場合
type stackTracer interface {
    StackTrace() errors.StackTrace
}

type errorField struct {
  Kind    string `json:"kind"`
  Stack   string `json:"stack"`
  Message string `json:"message"`
}

func ErrorField(err error) errorField {
    var stack string
    if serr, ok := err.(stackTracer); ok {
        st := serr.StackTrace()
        stack = fmt.Sprintf("%+v", st)
        if len(stack) > 0 && stack[0] == '\n' {
            stack = stack[1:]
        }
    }
    return errorField{
        Kind: reflect.TypeOf(err).String(),
        Stack: stack,
        Message: err.Error(),
    }
}


log.WithFields(log.Fields{
    "error": ErrorField(err)
}).Error("an exception occurred")
```

### Java (パース済み)

Java のログ収集を設定していない場合は、[Java ログ収集ドキュメント][4]を参照してください。ログに `source:java` というタグが付けられていることを確認してください。

{{< tabs >}}
{{% tab "Log4j" %}}

キャッチした例外を自分でログに残すには、オプションで以下を使用できます。

```java
Logger logger = LogManager.getLogger("HelloWorld");
try {
  // ...
} catch (Exception e) {
  // ログ呼び出しの最後の引数として例外を渡す
  logger.error("an exception occurred", e)
}
```

{{% /tab %}}
{{% tab "SLF4J" %}}

キャッチした例外を自分でログに残すには、オプションで以下を使用できます。

```java
Logger logger = LoggerFactory.getLogger(NameOfTheClass.class);
try {
  // ...
} catch (Exception e) {
  // ログ呼び出しの最後の引数として例外を渡す
  logger.error("an exception occurred", e)
}
```

{{% /tab %}}
{{< /tabs >}}

### Node.js

#### Winston (JSON)

Node.js のログ収集の設定をしていない場合は、[Node.js ログ収集ドキュメント][5]を参照してください。

キャッチした例外を自分でログに残すには、オプションで以下を使用できます。

```json
try {
  // ...
} catch (e) {
  logger.error("an exception occurred", {
    error: {
      message: e.message,
      stack: e.stack
    }
  });
}
```

### PHP

#### Monolog (JSON)

PHP のログ収集をまだ設定していない場合は、[PHP ログ収集ドキュメント][12] を参照してください。

キャッチした例外を自分でログに残すには、オプションで以下を使用できます。

```php
try {
    // ...
} catch (\Exception $e) {
    $logger->error('An error occurred', [
        'error.message' => $e->getMessage(),
        'error.kind' => get_class($e),
        'error.stack' => $e->getTraceAsString(),
    ]);
}
```

### Python

#### ロギング

Python のログ収集を設定していない場合は、[Python ログ収集ドキュメント][6]を参照してください。ログに `source:python` というタグが付けられていることを確認してください。

キャッチした例外を自分でログに残すには、オプションで以下を使用できます。

```python
try:
  // ...
except:
  logging.exception('an exception occurred')
```

### Ruby on Rails

#### カスタムロガーフォーマッタ

Ruby on Rails のログ収集をまだ設定していない場合は、[Ruby on Rails ログ収集ドキュメント][7] を参照してください。

エラーを手動でログに記録するには、JSON を使ってフォーマッタを作成し、例外の値を正しいフィールドにマッピングします。

```ruby
require 'json'
require 'logger'

class JsonWithErrorFieldFormatter < ::Logger::Formatter
    def call(severity, datetime, progname, message)
        log = {
            timestamp: "#{datetime.to_s}",
            level: severity,
        }

        if message.is_a?(Hash)
            log = log.merge(message)
        elsif message.is_a?(Exception)
            log['message'] = message.inspect
            log['error'] = {
                kind: message.class,
                message: message.message,
                stack: message.backtrace.join("\n"),
            }
        else
            log['message'] = message.is_a?(String) ? message : message.inspect
        end

        JSON.dump(log) + "\n"
    end
end
```

そして、それをロガーで使用します。
```ruby
logger = Logger.new(STDOUT)
logger.formatter = JsonWithErrorFieldFormatter.new
```

**Lograge** を使用する場合、指定されたフォーマットでエラーログを送信するように設定することもできます。
``` ruby
Rails.application.configure do
    jsonLogger = Logger.new(STDOUT) # Agent の構成に応じて STDOUT またはファイル
    jsonLogger.formatter = JsonWithErrorFieldFormatter.new

    # Rails のデフォルトのロガー TaggedLogging を json フォーマッタを使用した新しいロガーに置き換える
    # TaggedLogging はより複雑な json フォーマットのメッセージには非対応
    config.logger = jsonLogger

    # Lograge の構成
    config.lograge.enabled = true
    config.lograge.formatter = Lograge::Formatters::Raw.new

    # ログの彩色の無効化
    config.colorize_logging = false

    # 例外を正しいフィールドに記録するよう構成
    config.lograge.custom_options = lambda do |event|
        if event.payload[:exception_object]
            return {
                level: 'ERROR',
                message: event.payload[:exception_object].inspect,
                error: {
                    kind: event.payload[:exception_object].class,
                    message: event.payload[:exception_object].message,
                    stack: event.payload[:exception_object].backtrace.join("\n")
                }
            }
        end
    end
end
```
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/error-tracking
[2]: https://app.datadoghq.com/logs/onboarding/client
[3]: /ja/logs/log_collection/go/
[4]: /ja/logs/log_collection/java/?tab=log4j
[5]: /ja/logs/log_collection/nodejs/?tab=winston30
[6]: /ja/logs/log_collection/python/?tab=jsonlogformatter
[7]: /ja/logs/log_collection/ruby/
[8]: /ja/logs/log_configuration/processors/?tab=ui#remapper
[9]: https://app.datadoghq.com/source-code/setup/apm
[10]: /ja/logs/log_collection/
[11]: /ja/logs/log_configuration/attributes_naming_convention/#source-code
[12]: /ja/logs/log_collection/php/