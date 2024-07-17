---
aliases:
- /ja/real_user_monitoring/error_tracking/expo
code_lang: expo
code_lang_weight: 30
description: Datadog で Expo のクラッシュレポートをキャプチャします。
further_reading:
- link: https://www.datadoghq.com/blog/debug-android-crashes/
  tag: ブログ
  text: Datadog で Android のクラッシュをより速くデバッグする
- link: https://www.datadoghq.com/blog/ios-crash-reporting-datadog/
  tag: ブログ
  text: Datadog で iOS のクラッシュを効率的にデバッグする
- link: /real_user_monitoring/error_tracking/
  tag: ドキュメント
  text: エラートラッキングについて
- link: /real_user_monitoring/error_tracking/explorer
  tag: ドキュメント
  text: RUM エクスプローラーでエラー追跡データを視覚化する
kind: ドキュメント
title: Expo のクラッシュレポートとエラー追跡
type: multi-code-lang
---
## 概要

Expo のクラッシュレポートとエラー追跡を有効にすると、リアルユーザーモニタリングで包括的なクラッシュレポートとエラートレンドを取得できます。

この機能により、以下の機能にアクセスが可能になります。

-   集計済みの Expo クラッシュダッシュボードおよび属性
-   シンボル化された iOS のクラッシュレポートおよび難読化された Android のクラッシュレポート
-   Expo エラー追跡とトレンド分析

スタックトレースをシンボル化し、Android のクラッシュを難読化するには、`expo-datadog` 構成プラグインを使って、.dSYM、Proguard マッピングファイル、ソースマップを Datadog にアップロードします。

クラッシュレポートは [**Error Tracking**][1] に表示されます。

## Setup

[`expo-datadog`パッケージと構成プラグイン][2]を使用します。詳細については、[Expo と Expo Go のドキュメント][3]を参照してください。

開発依存として `@datadog/datadog-ci` を追加します。このパッケージには、ソースマップをアップロードするためのスクリプトが含まれています。NPM でインストールすることができます。

```sh
npm install @datadog/datadog-ci --save-dev
```

または、Yarn でインストールすることができます。

```sh
yarn add -D @datadog/datadog-ci
```

`eas secret:create` を実行して、`DATADOG_API_KEY` を Datadog API キーに設定します。

### Datadog のサイトを設定する

`eas secret:create` を実行して、`DATADOG_SITE` を Datadog サイトのホストに設定します (例: `datadoghq.eu`)。デフォルトでは、`datadoghq.com` が使用されます。

### プラグインコンフィギュレーションオプション

| パラメーター                     | デフォルト | 説明                                                                                                                        |
| ----------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `iosDsyms`                    | `true`  | iOS のネイティブクラッシュのシンボル化用に、dSYMS ファイルのアップロードを可能にします。                                                  |
| `iosSourcemaps`               | `true`  | iOS ビルドにおける JavaScript ソースマップのアップロードを可能にします。                                                                     |
| `androidSourcemaps`           | `true`  | Android ビルドにおける JavaScript ソースマップのアップロードを可能にします。                                                                 |
| `androidProguardMappingFiles` | `true`  | Android のネイティブクラッシュの難読化を解除するための Proguard マッピングファイルのアップロードを有効にします (難読化が有効な場合のみ適用されます)。 |
| `datadogGradlePluginVersion`  | `"1.+"` | Proguard マッピングファイルのアップロードに使用される `dd-sdk-android-gradle-plugin` のバージョン。     |

## Get deobfuscated stack traces

### Add git repository data to your mapping files on Expo Application Services (EAS)

If you are using EAS to build your Expo application, set `cli.requireCommit` to `true` in your `eas.json` file to add git repository data to your mapping files.

```json
{
    "cli": {
        "requireCommit": true
    }
}
```

## 制限

{{< site-region region="us,us3,us5,eu,gov" >}}
Source maps, mapping files, and dSYM files are limited to **500** MB each.
{{< /site-region >}}
{{< site-region region="ap1" >}}
Source maps, mapping files, and dSYM files are limited to **500** MB each.
{{< /site-region >}}

## Test your implementation

To verify your Expo Crash Reporting and Error Tracking configuration, you need to issue an error in your RUM application and confirm that the error appears in Datadog.

To test your implementation:

1. Run your application on a simulator, emulator, or a real device. If you are running on iOS, ensure that the debugger is not attached. Otherwise, Xcode captures the crash before the Datadog SDK does.
2. Execute some code containing an error or crash. For example:

   ```javascript
   const throwError = () => {
    throw new Error("My Error")
   }
   ```

3. For obfuscated error reports that do not result in a crash, you can verify symbolication and deobfuscation in [**Error Tracking**][1].
4. For crashes, after the crash happens, restart your application and wait for the React Native SDK to upload the crash report in [**Error Tracking**][1].

To make sure your sourcemaps are correctly sent and linked to your application, you can also generate crashes with the [`react-native-performance-limiter`][14] package.

yarn や npm でインストールして、ポッドを再インストールします。

```shell
yarn add react-native-performance-limiter # or npm install react-native-performance-limiter
(cd ios && pod install)
```

アプリから JavaScript のスレッドをクラッシュさせます。

```javascript
import { crashJavascriptThread } from 'react-native-performance-limiter';

const crashApp = () => {
    crashJavascriptThread('custom error message');
};
```

新しいソースマップを送信するために、リリース用にアプリケーションを再構築し、クラッシュをトリガーし、[エラー追跡][1]ページでエラーが表示されるのを待ちます。
```

## Additional configuration options

### Disable file uploads

You can disable some files from uploading by setting the `iosDsyms`, `iosSourcemaps`, `androidProguardMappingFiles`, or `androidSourcemaps` parameters to `false`.

```json
{
    "expo": {
        "plugins": [
            [
                "expo-datadog",
                {
                    "errorTracking": {
                        "iosDsyms": false
                    }
                }
            ]
        ]
    }
}
```

If you want to disable **all file uploads**, remove `expo-datadog` from the list of plugins.


### Using Expo with Datadog and Sentry

Datadog と Sentry の構成プラグインは、iOS のビルドフェーズ "Bundle React Native code and images" を変更してソースマップを送信するために、どちらも正規表現を使用します。これにより、EAS のビルドが失敗したときに、 `error: Found argument 'datadog-ci' which wasn't expected, or isn't valid in this context` エラーを出すようにすることができます。

両方のプラグインを使用する場合は、必ず `expo-datadog` プラグインを最初に `app.json` ファイルに追加してください。

```
"plugins": [
    "expo-datadog",
    "sentry-expo"
]
```

`expo-dev-client` を使用していて、すでに `expo-datadog` プラグインがある場合は、`sentry-expo` を追加して両方のプラグインで `npx expo prebuild` を実行する前に、`project.pbxproj` ファイルに対するその変更を元に戻します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://github.com/DataDog/expo-datadog
[3]: /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/expo/#usage