---
title: React Native Log Collection
description: Collect logs from your React Native Mobile applications.
further_reading:
- link: "https://github.com/DataDog/dd-sdk-reactnative"
  tag: ソースコード
  text: dd-sdk-reactnative Source code
- link: logs/explorer
  tag: Documentation
  text: Learn how to explore your logs
---

[Datadog の `dd-sdk-reactnative` クライアント側ロギングライブラリ][1]を使用すると、React Native Mobile アプリケーションから Datadog へログを送信すると共に、次の機能を利用できます。

* Datadog に JSON 形式でネイティブに記録する。
* 送信される各ログに `context` およびカスタム属性を追加する。
* JavaScript がキャッチした例外を転送します。
* 実際のクライアント IP アドレスとユーザーエージェントを記録する。
* 自動一括ポストによってネットワークの利用を最適化する。

## セットアップ

1. `@datadog/mobile-react-native` パッケージをインストールする

NPM でインストールするには、以下を実行します。

```sh
   npm install @datadog/mobile-react-native
```

Yarn でインストールするには、以下を実行します。

```sh
yarn add @datadog/mobile-react-native
```

その後、追加したポッドをインストールします。

```sh
(cd ios && pod install)
```

バージョン `1.0.0-rc5` 以降では、Android アプリケーションのセットアップで `compileSdkVersion = 31` が必要です。これは Build Tools バージョン 31、Android Gradle Plugin バージョン 7、および Gradle バージョン 7 以上が必要であることを意味します。バージョンを変更するには、アプリケーションのトップレベル `build.gradle` ファイルの `buildscript.ext` ブロックの値を変更します。Datadog は、React Native バージョン 0.67 以上の使用を推奨しています。

2. アプリケーションコンテキストと追跡に関する同意、[Datadog クライアントトークン][2]、そして Datadog UI で新しい RUM アプリケーションを作成したときに生成されたアプリケーション ID で、ライブラリを初期化します (詳細は、[React Native RUM 収集の概要][6]を参照)。セキュリティ上の理由から、クライアントトークンを使用する必要があります。API キーがクライアント側のモバイルアプリケーションで公開されてしまうため、[Datadog API キー][3]を使用して `dd-sdk-reactnative` ライブラリを構成することはできません。クライアントトークンの設定に関する詳細は、[クライアントトークンに関するドキュメント][2]を参照してください。
{{< site-region region="us" >}}
```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // ユーザーインタラクションの追跡 (ボタンのタップなど)
    true, // XHR リソースの追跡
    true // エラーの追跡
);
config.site = 'US1';
```
{{< /site-region >}}
{{< site-region region="us3" >}}
```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // ユーザーインタラクションの追跡 (ボタンのタップなど)
    true, // XHR リソースの追跡
    true // エラーの追跡
);
config.site = 'US3';
```
{{< /site-region >}}
{{< site-region region="us5" >}}
```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // ユーザーインタラクションの追跡 (ボタンのタップなど)
    true, // XHR リソースの追跡
    true // エラーの追跡
);
config.site = 'US5';

await DdSdkReactNative.initialize(config);
```
{{< /site-region >}}
{{< site-region region="eu" >}}
```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // ユーザーインタラクションの追跡 (ボタンのタップなど)
    true, // XHR リソースの追跡
    true // エラーの追跡
);
config.site = 'EU1';
```
{{< /site-region >}}
{{< site-region region="gov" >}}
```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // ユーザーインタラクションの追跡 (ボタンのタップなど)
    true, // XHR リソースの追跡
    true // エラーの追跡
);
config.site = 'US1_FED';
```
{{< /site-region >}}
{{< site-region region="ap1" >}}
```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // ユーザーインタラクションの追跡 (ボタンのタップなど) 
    true, // XHR リソースの追跡
    true // エラーの追跡
);
config.site = 'AP1';
```
{{< /site-region >}}


3. React Native ロガーをインポートします。

   ```javascript
   import { DdLogs } from '@datadog/mobile-react-native';
   ```

4. 次のいずれかの関数で、カスタムログエントリを Datadog に直接送信します。

    ```javascript
        DdLogs.debug('A debug message.', { customAttribute: 'something' })
        DdLogs.info('Some relevant information ?', { customCount: 42 })
        DdLogs.warn('An important warning...', {})
        DdLogs.error('An error was met!', {})
    ```

    **注**: すべてのロギングメソッドは、カスタム属性を持つコンテキストオブジェクトを持つことができます。

## バッチコレクション

すべてのログは、最初にローカルデバイスにバッチで格納されます。各バッチはインテークの仕様に従います。ネットワークが利用可能で、Datadog SDK がエンドユーザーのエクスペリエンスに影響を与えないようにバッテリーの残量が十分にあれば、バッチはすぐに送信されます。アプリケーションがフォアグラウンドにあるときにネットワークが利用できない場合、またはデータのアップロードが失敗した場合、バッチは正常に送信されるまで保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。

ディスク上のデータは、古すぎる場合は SDK がディスク容量を使いすぎないようにするために自動的に破棄されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-reactnative
[2]: /account_management/api-app-keys/#client-tokens
[3]: /account_management/api-app-keys/#api-keys
[4]: /logs/processing/attributes_naming_convention/
[5]: /tagging/
[6]: /real_user_monitoring/reactnative/?tab=us
