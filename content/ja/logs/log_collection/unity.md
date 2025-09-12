---
description: Unity プロジェクトからログ データを収集します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: ソースコード
  text: dd-sdk-unity Source code
- link: logs/explorer/
  tag: ドキュメント
  text: ログの調査方法
title: Unity のログ収集
---
[Datadog の Unity Package][1] を使用して Unity アプリケーションから Datadog にログを送信し、次の機能を活用できます:

* Datadog に JSON 形式でネイティブに記録する。
* デフォルトを使用し、送信される各ログにカスタム属性を追加する。
* 実際のクライアント IP アドレスとユーザーエージェントを記録する。
* 自動一括ポストによって最適化されたネットワークの利用を活用します。

## セットアップ

Logs 用の Datadog Unity SDK を初期化するには、[セットアップ][2] を参照してください。

Datadog Unity SDK のセットアップが完了したら、SDK の `DefaultLogger` を使用してログを Datadog に送信できます。

```cs
var logger = DatadogSdk.Instance.DefaultLogger;

logger.Debug("A debug message.");
logger.Info("Some relevant information?");
logger.Warn("An important warning...");
logger.Error("An error was met!");
```

"Forward Unity Logs" オプションを有効にすると、Unity の `Debug.Log*` メソッドを使用して Unity に送信されたログは、自動的に `DatadogSdk.Instance.DefaultLogger` に送信されます。

`CreateLogger` メソッドを使用して、サービスや名前の異なる追加のロガーを作成することもできます。

```dart
var loggingOptions = new DatadogLoggingOptions()
{
    Service = "com.example.custom_service",
    Name = "Additional logger",
};
var logger = DatadogSdk.Instance.CreateLogger(loggingOptions);

logger.Info('Info from my additional logger.');
```

## タグの管理

ロガーに設定されたタグは、各ロガーにローカルです。

### タグを追加

特定のロガーが送信するすべてのログにタグを追加するには、`DdLogger.AddTag` メソッドを使用します:

```cs
// これは "build_configuration:debug" タグを追加します
logger.AddTag("build_configuration", "debug")
```

### タグを削除

特定のロガーが送信するすべてのログからタグを削除するには、`DdLogger.RemoveTag` メソッドを使用します:

```cs
// これは "build_configuration" で始まるすべてのタグを削除します
logger.RemoveTag("build_configuration")
```

詳細は [タグの概要][3] を参照してください。

## 属性の管理

ロガーに設定された属性は、各ロガーにローカルです。

### デフォルト属性

デフォルトで、ロガーにより送信されるすべてのログに次の属性が追加されます。

* `http.useragent` と抽出された `device` と `OS` プロパティ
* `network.client.ip` と抽出された地理的プロパティ (`country`, `city`)
* `logger.version`、Datadog SDK バージョン
* `logger.thread_name`, (`main`, `background`)
* `version`、`Info.plist` または `application.manifest` のいずれかから抽出されたクライアントのアプリバージョン
* `environment`、SDK の初期化に使われる環境名

### 属性を追加

特定のロガーが送信するすべてのログにカスタム属性を追加するには、`DatadogLogger.AddAttribute` メソッドを使用します。

```cs
logger.AddAttribute("user-status", "unregistered")
```

この `value` は、[`JsonCovert.SerializeObject`][4] を使用してシリアライズ可能なほとんどの型を指定できます。

### 属性を削除

特定のロガーが送信するすべてのログからカスタム属性を削除するには、`DdLogger.RemoveAttribute` メソッドを使用します:

```cs
// これ以降に送信されるすべてのログから "user-status" 属性を削除します。
logger.RemoveAttribute("user-status")
```

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/unity-package
[2]: /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/unity
[3]: /ja/getting_started/tagging/
[4]: https://www.newtonsoft.com/json/help/html/m_newtonsoft_json_jsonconvert_serializeobject.htm
[5]: https://api.flutter.dev/flutter/services/StandardMessageCodec-class.html
[6]: https://pub.dev/packages/logger