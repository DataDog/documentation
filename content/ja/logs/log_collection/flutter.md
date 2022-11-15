---
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-flutter/blob/main/packages/datadog_flutter_plugin/doc/log_collection.md
description: Flutter プロジェクトからログデータを収集します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: dd-sdk-flutter ソースコード
- link: logs/explorer/
  tag: ドキュメント
  text: ログの調査方法
kind: documentation
title: Flutter ログ収集
---
[Datadog の flutter プラグイン][1]を使用すると、Flutter アプリケーションから Datadog へログを送信すると共に、次の機能を利用できます。

* Datadog に JSON 形式でネイティブに記録する。
* デフォルトを使用し、送信される各ログにカスタム属性を追加する。
* 実際のクライアント IP アドレスとユーザーエージェントを記録する。
* 自動一括ポストによって最適化されたネットワークの利用を活用します。

## セットアップ

Datadog Flutter SDK for Logs を初期化するには、[セットアップ][2]を参照してください。

Datadog Flutter SDK を `LoggingConfiguration` パラメーターで初期化したら、 `logs` のデフォルトインスタンスを使用して、Datadog にログを送信します。

```dart
DatadogSdk.instance.logs?.debug("A debug message.");
DatadogSdk.instance.logs?.info("Some relevant information?");
DatadogSdk.instance.logs?.warn("An important warning...");
DatadogSdk.instance.logs?.error("An error was met!");
```

`createLogger` メソッドを使用して、追加のロガーを作成することが可能です。

```dart
final myLogger = DatadogSdk.instance.createLogger(
  LoggingConfiguration({
    loggerName: 'Additional logger'
  })
);

myLogger.info('Info from my additional logger.');
```

利用可能なロギングオプションの詳細については、[LoggingConfiguration クラスのドキュメント][3]を参照してください。

## タグと属性の管理

ロガーに設定されたタグおよび属性は、各ロガーにローカルです。

### タグを追加

`DdLogs.addTag` メソッドを使い、指定されたロガーから送信されるすべてのログにタグを追加します。

```dart
// これにより、"build_configuration:debug" タグが追加されます
logger.addTag("build_configuration", "debug")
```

### タグを削除

`DdLogs.removeTag` メソッドを使い、指定されたロガーから送信されるすべてのログからタグを削除します。

```dart
// これにより "build_configuration" で始まるすべてのタグが削除されます
logger.removeTag("build_configuration")
```

詳しくは、[タグ入門][4]をご覧ください。

## デフォルト属性

デフォルトで、ロガーにより送信されるすべてのログに次の属性が追加されます。

* `http.useragent` と抽出された `device` と `OS` プロパティ
* `network.client.ip` と抽出された地理的プロパティ (`country`, `city`)
* `logger.version`、Datadog SDK バージョン
* `logger.thread_name`, (`main`, `background`)
* `version`、`Info.plist` または `application.manifest` のいずれかから抽出されたクライアントのアプリバージョン
* `environment`、SDK の初期化に使われる環境名

### 属性を追加

`DdLogs.addAttribute` メソッドを使い、指定されたロガーから送信されるすべてのログにカスタム属性を追加します。

```dart
logger.addAttribute("user-status", "unregistered")
```

`value` には [`StandardMessageCodec` クラス][5]でサポートされているほとんどのタイプを指定することができます。

### 属性を削除

`DdLogs.removeAttribute` メソッドを使い、指定されたロガーから送信されるすべてのログからカスタム属性を削除します。

```dart
// これにより、"user-status" 属性は今後送信されるすべてのログから削除されます。
logger.removeAttribute("user-status")
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://pub.dev/packages/datadog_flutter_plugin
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/flutter/setup
[3]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/LoggingConfiguration-class.html
[4]: https://docs.datadoghq.com/ja/getting_started/tagging/
[5]: https://api.flutter.dev/flutter/services/StandardMessageCodec-class.html