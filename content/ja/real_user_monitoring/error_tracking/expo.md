---
dependencies:
- https://github.com/DataDog/dd-sdk-reactnative/blob/main/docs/expo_crash_reporting.md
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
kind: documentation
title: Expo のクラッシュレポートとエラー追跡
---
## 概要

Expo のクラッシュレポートとエラー追跡を有効にすると、リアルユーザーモニタリングで包括的なクラッシュレポートとエラートレンドを取得できます。

この機能により、以下の機能にアクセスが可能になります。

-   集計済みの Expo クラッシュダッシュボードおよび属性
-   シンボル化された iOS のクラッシュレポートおよび難読化された Android のクラッシュレポート
-   Expo エラー追跡とトレンド分析

スタックトレースをシンボル化し、Android のクラッシュを難読化するには、`expo-datadog` 構成プラグインを使って、.dSYM、Proguard マッピングファイル、ソースマップを Datadog にアップロードします。

クラッシュレポートは [**Error Tracking**][1] に表示されます。

## セットアップ

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

### ファイルのアップロードを無効にする

`iosDsyms`、`iosSourcemaps`、`androidProguardMappingFiles`、`androidSourcemaps` パラメーターを `false` に設定すると、一部のファイルのアップロードを禁止することができます。

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

### Datadog のサイトを設定する

`eas secret:create` を実行して、`DATADOG_SITE` を Datadog サイトのホストに設定します (例: `datadoghq.eu`)。デフォルトでは、`datadoghq.com` が使用されます。

### プラグインコンフィギュレーションオプション

| パラメーター                     | デフォルト | 説明                                                                                                                        |
| ----------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `iosDsyms`                    | `true`  | iOS のネイティブクラッシュのシンボル化用に、dSYMS ファイルのアップロードを可能にします。                                                  |
| `iosSourcemaps`               | `true`  | iOS ビルドにおける JavaScript ソースマップのアップロードを可能にします。                                                                     |
| `androidProguardMappingFiles` | `true`  | Android のネイティブクラッシュの難読化を解除するための Proguard マッピングファイルのアップロードを有効にします (難読化が有効な場合のみ適用されます)。 |
| `androidSourcemaps`           | `true`  | Android ビルドにおける JavaScript ソースマップのアップロードを可能にします。                                                                 |

### Sentry を併用する

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
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/reactnative/expo/#usage