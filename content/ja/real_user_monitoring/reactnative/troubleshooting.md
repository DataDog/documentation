---
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: Github
  text: dd-sdk-reactnative のソースコード
- link: /real_user_monitoring
  tag: Documentation
  text: Datadog Real User Monitoring
kind: documentation
title: トラブルシューティング
---

Datadog React Native RUM で予期せぬ動作が発生した場合、このガイドを使用して問題を迅速に解決してください。問題が解決しない場合は、[Datadog サポート][1]にお問い合わせください。

## Datadog にデータが送信されていない

SDK をインストールし、アプリをコンパイルしたが、Datadog からデータが受信されない場合、以下の手順で順番に説明します。

### 構成を確認する

構成上のちょっとしたミスでデータが送信されないこともあります。

ここでは、よくあるチェックポイントをご紹介します。

- `clientToken` と `applicationId` が正しいことを確認します。
- `sessionSamplingRate` を 100 以外に設定していないことを確認してください (100はデフォルト値です)、さもなければセッションが送信されるかもしれません。
- Datadog の構成で `Proxy` を設定している場合、それが正しく構成されているか確認します。
- ビューの追跡 (すべてのイベントはビューにアタッチされている必要があります) とイベントの送信を行っていることを確認してください。

### React Native で SDK のログを確認する

- `config.verbosity = SdkVerbosity.DEBUG` を設定します。これは `@datadog/mobile-react-native` から `SdkVerbosity` をインポートしています。
- 以下の出力のように、JavaScript コンソールにログが表示されるようになります。

  ```
  INFO  DATADOG: Datadog SDK was initialized
  INFO  DATADOG: Datadog SDK is tracking interactions
  INFO  DATADOG: Datadog SDK is tracking XHR resources
  INFO  DATADOG: Datadog SDK is tracking errors
  DEBUG  DATADOG: Starting RUM View “Products” #Products-oaZlP_FVwGM5vtPoup_rT
  DEBUG  DATADOG: Adding RUM Action “RCTView” (TAP)
  ```

  **注**: この例では、最初の 4 つのログは SDK が正しく構成されていることを示し、最後の 2 行は送信されたイベントです。

#### 考えられる原因

iOS で、ログや RUM イベントが初期化ログの**前**に送信されたことを示す DEBUG ログがある場合、これが SDK がイベントを送信しない理由かもしれません。

初期化前にイベントを送ることはできませんし、送ろうとすると SDK がデータを送れない状態になります。

#### ソリューション

**`DdSdkReactNative.initialize`** の場合:

Datadog SDK を起動するために `DdSdkReactNative.initialize` を使用する場合、トップレベルの `index.js` ファイルでこの関数を呼び出し、他のイベントが送信される前に SDK が初期化されるようにします。

**`DatadogProvider`** の場合:

SDK バージョン `1.2.0` からは、`DatadogProvider` コンポーネントを使用して SDK を初期化することができます。このコンポーネントには RUM イベントバッファが含まれており、Datadog にデータを送信する前に SDK が初期化されていることを確認することで、この問題の発生を防ぐことができます。

使用方法は、[Datadog Provider への移行ガイド][2]をご参照ください。

### ネイティブログを確認する

ネイティブのログを確認することで、何が問題になっているのか、より多くの情報を得ることができます。

#### iOS の場合

- Xcode で `xed ios` を実行し、プロジェクトを開きます。
- シミュレーターやデバイス向けにプロジェクトを構築します。
- 右下にネイティブログが表示され始めます。

  {{< img src="real_user_monitoring/react_native/troubleshooting-xcode-logs.png" alt="ネイティブログを確認することで、データが送信されない原因を突き止めることができます" >}}

"DATADOG" でログをフィルターして、任意のエラーを探すことができます。

確かにイベントを送信していれば、以下のようなログが表示されるはずです。

```
[DATADOG SDK] 🐶 → 10:02:47.398 [DEBUG] ⏳ (rum) Uploading batch...
[DATADOG SDK] 🐶 → 10:02:47.538 [DEBUG]    → (rum) accepted, won't be retransmitted: [response code: 202 (accepted), request ID: AAAABBBB-1111-2222-3333-777788883333]
```

第 1 ログは、何らかのデータを送信中であることを示し、第 2 ログは、データを受信したことを示します。

##### 考えられる原因

以下のようなログが表示された場合、SDK を初期化する前に RUM メソッドを呼び出したことを意味します。

```
[DATADOG SDK] 🐶 → 10:09:13.621 [WARN] The `Global.rum` was called but no `RUMMonitor` is registered. Configure and register the RUM Monitor globally before invoking the feature:
```

##### ソリューション

**`DdSdkReactNative.initialize`** の場合:

Datadog SDK を起動するために `DdSdkReactNative.initialize` を使用する場合、トップレベルの `index.js` ファイルでこの関数を呼び出し、他のイベントが送信される前に SDK が初期化されるようにします。

**`DatadogProvider`** の場合:

SDK バージョン `1.2.0` からは、`DatadogProvider` コンポーネントを使用して SDK を初期化することができます。このコンポーネントには RUM イベントバッファが含まれており、Datadog にデータを送信する前に SDK が初期化されていることを確認することで、この問題の発生を防ぐことができます。

使用方法は、[Datadog Provider への移行ガイド][2]をご参照ください。

#### Android の場合

- より良いデバッグ体験のために、Datadog は [pidcat][3] をインストールすることを推奨します。
  - pidcat は、デバイスログ (`adb logcat` で取得) をフィルターして、アプリケーションからのものだけを表示します。
  - Python 2 をお持ちでない M1 ユーザーの方は[こちら][4]をご覧ください。
- ネイティブ SDK から冗長ログを有効にするため、`node_modules/@datadog/mobile-react-native/android/src/main/kotlin/com/datadog/reactnative/DdSdk.kt` を修正します。

  ```java
  fun initialize(configuration: ReadableMap, promise: Promise) {
      // ...

      datadog.initialize(appContext, credentials, nativeConfiguration, trackingConsent)
      datadog.setVerbosity(Log.VERBOSE) // Add this line

      // ...
  }
  ```

- ラップトップにデバッグモードで接続されたスマートフォン (`adb devices` を実行すると表示されるはずです)、またはエミュレーターからアプリを実行してください。
- ラップトップから pidcat `my.app.package.name` または `adb logcat` を実行します。
- Datadog に言及したエラーがないか確認します。

Pidcat の出力は次のようになります。

{{< img src="real_user_monitoring/react_native/troubleshooting-pidcat-logs.png" alt="これは、pidcat の出力例です" >}}

この例では、最後のログは、RUM データのバッチが正常に送信されたことを示します。

## 未定義のシンボル: Swift

以下のエラーメッセージが表示された場合

```
Undefined symbols for architecture x86_64:
  "static Foundation.JSONEncoder.OutputFormatting.withoutEscapingSlashes.getter : Foundation.JSONEncoder.OutputFormatting", referenced from:
      static (extension in Datadog):Foundation.JSONEncoder.default() -> Foundation.JSONEncoder in libDatadogSDK.a(JSONEncoder.o)
...
```

Xcode を開き、プロジェクト (アプリのターゲットではない) の `Build Settings` を開き、Library Search Paths が以下の設定になっていることを確認してください。

```shell
LIBRARY_SEARCH_PATHS = (
  "\"$(TOOLCHAIN_DIR)/usr/lib/swift/$(PLATFORM_NAME)\"",
  "\"/usr/lib/swift\"",
  "\"$(inherited)\"",
);
```

## 未定義のシンボル: _RCTModule

未定義の _RCTModule シンボルが表示される場合、[react-native v0.63 changelog][5] のこの変更に関連している可能性があります。

以下のように変更することで解決します。

```objectivec
// DdSdk.m
// 以下の代わりに
#import <React/RCTBridgeModule.h>
// おそらく:
@import React // または @import React-Core
```

## 無限ループのようなエラーメッセージ

[React Native プロジェクトがエラーメッセージを次々と表示し、CPU 使用率が著しく上昇する問題][5]に遭遇した場合は、React Native プロジェクトを新規に作成してみてください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help
[2]: https://github.com/DataDog/dd-sdk-reactnative/blob/develop/docs/migrating_to_datadog_provider.md
[3]: https://github.com/JakeWharton/pidcat
[4]: https://github.com/JakeWharton/pidcat/issues/180#issuecomment-1124019329
[5]: https://github.com/facebook/react-native/commit/6e08f84719c47985e80123c72686d7a1c89b72ed
[6]: https://github.com/facebook/react-native/issues/28801