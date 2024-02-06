---
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

Datadog Flutter SDK を `LoggingConfiguration` パラメーターで初期化したら、`DatadogLogger` を作成して、Datadog にログを送信できます。

```dart
final logConfiguration = DatadogLoggerConfiguration(
  remoteLogThreshold: LogLevel.debug,
  networkInfoEnabled: true,
);
final logger = DatadogSdk.instance.logs?.createLogger(logConfiguration);

logger?.debug("A debug message.");
logger?.info("Some relevant information?");
logger?.warn("An important warning...");
logger?.error("An error was met!");
```

`createLogger` メソッドを使用して、異なるサービスや名前を持つ追加のロガーを作成することも可能です。

```dart
final myLogger = DatadogSdk.instance.logs?.createLogger(
  DatadogLoggerConfiguration(
    service: 'com.example.custom_service',
    name: 'Additional logger'
  )
);

myLogger?.info('Info from my additional logger.');
```

利用可能なロギングオプションの詳細については、[DatadogLoggerConfiguration クラスのドキュメント][3]を参照してください。

## タグの管理

ロガーに設定されたタグは、各ロガーにローカルです。

### タグを追加

`DatadogLogger.addTag` メソッドを使い、指定されたロガーから送信されるすべてのログにタグを追加します。

```dart
// これにより、"build_configuration:debug" タグが追加されます
logger.addTag("build_configuration", "debug")
```

### タグを削除

`DatadogLogger.removeTag` メソッドを使い、指定されたロガーから送信されるすべてのログからタグを削除します。

```dart
// これにより "build_configuration" で始まるすべてのタグが削除されます
logger.removeTag("build_configuration")
```

詳しくは、[タグ入門][4]をご覧ください。

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

`DatadogLogger.addAttribute` メソッドを使い、指定されたロガーから送信されるすべてのログにカスタム属性を追加します。

```dart
logger.addAttribute("user-status", "unregistered")
```

`value` には [`StandardMessageCodec` クラス][5]でサポートされているほとんどのタイプを指定することができます。

### 属性を削除

`DatadogLogger.removeAttribute` メソッドを使い、指定されたロガーから送信されるすべてのログからカスタム属性を削除します。

```dart
// これにより、"user-status" 属性は今後送信されるすべてのログから削除されます。
logger.removeAttribute("user-status")
```

## ログ出力のカスタマイズ

デフォルトでは、デバッグ用ビルドの場合、`DatadogLogger` はすべてのログを以下の形式で Flutter コンソールに出力します。
```
[{level}] message
```

これは、 `DatadogLoggerConfiguration.customConsoleLogFunction` を設定することでカスタマイズ可能です。一定のレベル以下のログをフィルタリングするには、これを `simpleConsolePrintForLevel` に設定します。

```dart
final config = DatadogLoggerConfiguration(
  // その他の構成オプション...
  customConsoleLogFunction: simpleConsolePrintForLevel(LogLevel.warn),
);
```

また、カスタム関数を提供することで、Datadog ログを [logger][6] などの他のログパッケージに転送することもできます。

```dart
var Logger logger;
void customDatadogLog(LogLevel level,
  String message,
  String? errorMessage,
  String? errorKind,
  StackTrace? stackTrace,
  Map<String, Object?> attributes,) {
    // Logger とレベルマッピング用のカスタム関数があると仮定:
    logger.log(mapLogLevels(level), message, error: errorKind, stackTrace: stackTrace);
}

final datadogLogger = DatadogSdk.instance.logs?.createLogger(
  DatadogLoggerConfiguration(
    // その他の構成オプション...
    customConsoleLogFunction: simpleConsolePrintForLevel(LogLevel.warn),
  );
);
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://pub.dev/packages/datadog_flutter_plugin
[2]: /ja/real_user_monitoring/flutter/setup
[3]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogLoggerConfiguration-class.html
[4]: /ja/getting_started/tagging/
[5]: https://api.flutter.dev/flutter/services/StandardMessageCodec-class.html
[6]: https://pub.dev/packages/logger