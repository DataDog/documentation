---
dependencies:
- https://github.com/DataDog/dd-sdk-reactnative/blob/main/docs/advanced_configuration.md
description: React Native のセットアップのための高度な構成オプションについて説明します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: dd-sdk-reactnative ソースコード
- link: real_user_monitoring/reactnative/
  tag: ドキュメント
  text: React Native のモニタリングについて
kind: documentation
title: RUM React Native の高度な構成
---
## 概要

まだ SDK をインストールしていない場合は、[アプリ内セットアップ手順][1]に従うか、[React Native セットアップドキュメント][2]を参照してください。

## 手動インスツルメンテーション

自動インスツルメンテーションがニーズに合わない場合は、手動で RUM イベントとログを作成できます。

```javascript
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration,
    DdLogs,
    DdRum
} from '@datadog/mobile-react-native';

// SDK を初期化
const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // ユーザーインタラクションを追跡 (ボタンのタップなど)
    true, // XHR リソースを追跡
    true // エラーを追跡
);
DdSdkReactNative.initialize(config);

// ログを送信 (debug、info、warn、error メソッドを使用)
DdLogs.debug('Lorem ipsum dolor sit amet...', {});
DdLogs.info('Lorem ipsum dolor sit amet...', {});
DdLogs.warn('Lorem ipsum dolor sit amet...', {});
DdLogs.error('Lorem ipsum dolor sit amet...', {});

// RUM Views を手動で追跡
DdRum.startView('<view-key>', 'View Url', {}, Date.now());
//...
DdRum.stopView('<view-key>', { custom: 42 }, Date.now());

// RUM Actions を手動で追跡
DdRum.addAction(RumActionType.TAP, 'button name', {}, Date.now());
// 継続アクションの場合
DdRum.startAction(RumActionType.TAP, 'button name', {}, Date.now());
// 上記アクションの停止
DdRum.stopAction({}, Date.now());

// カスタムタイミングを追加
DdRum.addTiming('<timing-name>');

// RUM Errors を手動で追跡
DdRum.addError('<message>', ErrorSource.SOURCE, '<stacktrace>', {}, Date.now());

// RUM Resource を手動で追跡
DdRum.startResource(
    '<res-key>',
    'GET',
    'http://www.example.com/api/v1/test',
    {},
    Date.now()
);
//...
DdRum.stopResource('<res-key>', 200, 'xhr', (size = 1337), {}, Date.now());

// スパンを手動で送信
const spanId = await DdTrace.startSpan('foo', { custom: 42 }, Date.now());
//...
DdTrace.finishSpan(spanId, { custom: 21 }, Date.now());
```

## リソースのタイミング

リソースの追跡では、以下のタイミングを提供します。

-   `First Byte`: スケジュール済みのリクエストと応答の最初のバイトの間の時間。ネイティブレベルのリクエスト準備、ネットワークレイテンシー、およびサーバーの応答準備時間が含まれます。
-   `Download`: 応答の受信にかかった時間。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/reactnative