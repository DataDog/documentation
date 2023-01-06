---
description: ログからバックエンドエラーを追跡する方法について説明します。
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: GitHub
  text: Datadog Error Tracking で、アプリケーションの問題を解明
- link: /logs/error_tracking/explorer/
  tag: ドキュメント
  text: エラートラッキングエクスプローラーについて
is_beta: true
kind: documentation
title: バックエンドエラーの追跡
---

## 概要

Datadog でまだログを収集していない場合は、[ログドキュメント][10]を参照してログを設定してください。`source` タグ (言語指定) が適切に構成されていることを確認してください。Datadog では、Agent ベースのログ収集の設定を推奨しています。

## セットアップ

**Python**、**Java**、**Ruby** などの言語では、ログの `source` タグが正しく設定されていれば、追加の設定は必要ありません。必要な属性は全て自動的にタグ付けされ、Datadog に送信されます。

**C#**、**.NET**、**Go**、**NodeJS** などのバックエンド言語については、各セクションのコード例で、エラーログを適切に構成し、ログの `error.stack` に必要なスタックトレースをアタッチする方法を示しています。

もし、スタックトレースを Datadog に送信しているが、`error.stack` にない場合、[ジェネリックログリマッパー][8]をセットアップして、スタックトレースを Datadog の正しい属性にリマップすることが可能です。

課題でのインラインコードスニペットを構成するには、[ソースコードインテグレーション][9]を設定します。Error Tracking for Logs でコードスニペットを追加する場合、APM は必要ありません。エンリッチメントタグとリンク先のリポジトリは、どちらも同じです。
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
  kind    string `json:"kind"`
  stack   string `json:"stack"`
  message string `json:"message"`
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
    return ErrorField{
        kind: reflect.TypeOf(err).String(),
        stack: stack,
        message: err.Error(),
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

### NodeJS

#### Winston (JSON)

NodeJS のログ収集の設定をしていない場合は、[NodeJS ログ収集ドキュメント][5]を参照してください。

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

#### Lograge (JSON)

Ruby on Rails のログ収集の設定をしていない場合は、[Ruby on Rails ログ収集ドキュメント][7]を参照してください。

キャッチした例外を自分でログに残すには、オプションで以下を使用できます。

```ruby
# Lograge 構成
config.lograge.enabled = true

# JSON 形式でログを記録することを指定する
config.lograge.formatter = Lograge::Formatters::Json.new

# ログのカラーリングを無効にする
config.colorize_logging = false

# 専用ファイルへのログ記録
config.lograge.logger = ActiveSupport::Logger.new(Rails.root.join('log', "#{Rails.env}.log"))

# 例外のログを正しいフィールドにログ記録するよう構成する
config.lograge.custom_options = lambda do |event|
    {
      error: {
        type: event.payload[:exception][0],
        message: event.payload[:exception][1],
        stack: event.payload[:exception_object].backtrace
      }
    }
  end  
end
```

## {{< partial name="whats-next/whats-next.html" >}}

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