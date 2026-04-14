---
aliases:
- /ja/real_user_monitoring/reactnative/codepush
- /ja/real_user_monitoring/reactnative-codepush/
- /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/codepush
code_lang: codepush
code_lang_weight: 3
description: クライアントサイドの React Native モジュールを使用して、Appcenter Codepush および Datadog を操作する方法について説明します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: ソースコード
  text: dd-sdk-reactnative のソースコード
- link: real_user_monitoring/reactnative/
  tag: ドキュメント
  text: React Native のモニタリングについて
title: CodePush のセットアップ
type: multi-code-lang
---

## 概要

React Native のクラッシュレポートとエラー追跡を有効にすると、リアルユーザーモニタリングで包括的なクラッシュレポートとエラートレンドを取得できます。

React Native アプリケーションの新しい [CodePush][1] バージョンをリリースするたびに、エラーを解除するために Datadog にソースマップをアップロードする必要があります。

Datadog では、アプリ内で `@datadog/mobile-react-native-code-push` を使用し、ソースマップをアップロードするために [datadog-ci][3] `react-native codepush` コマンドを使うことを推奨しています。これにより、報告されたクラッシュとアップロードされたソースマップの両方で `version` が一貫していることが確認されます。

Datadog SDK を codepush で設定する際に問題が発生した場合は、弊社の[サンプルアプリケーション][6]を参考にすることができます。

## セットアップ

[React Native モニタリングのインストール手順][2]を参照して、`@datadog/mobile-react-native` をインストールしてください。

続いて、`@datadog/mobile-react-native-code-push` をインストールします。

NPM でインストールするには、以下を実行します。

```sh
npm install @datadog/mobile-react-native-code-push
```

Yarn でインストールするには、以下を実行します。

```sh
yarn add @datadog/mobile-react-native-code-push
```

### DdSdkReactNative.initialize による初期化

コード中の `DdSdkReactNative.initialize` を `DatadogCodepush.initialize` に置き換えてください。

```js
import { DdSdkReactNativeConfiguration } from '@datadog/mobile-react-native';
import { DatadogCodepush } from '@datadog/mobile-react-native-code-push';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // ユーザーインタラクション (ボタンのタップなど) を追跡します。'accessibilityLabel' 要素のプロパティを使って、タップアクションに名前を付けることができます。それ以外の場合は、要素の種類を報告します
    true, // XHR リソースを追跡します
    true // エラーを追跡します
);

await DatadogCodepush.initialize(config);
```

### DatadogProvider による初期化

App コンポーネントの `DatadogProvider` を `DatadogCodepushProvider` に置き換えてください。

```js
import { DatadogCodepushProvider } from '@datadog/mobile-react-native-code-push';

export default function App() {
    return (
        <DatadogCodepushProvider configuration={datadogConfiguration}>
            <Navigation />
        </DatadogCodepushProvider>
    );
}
```

CodePush のバージョンの取得は、Datadog React Native SDK for RUM の初期化前に実行する必要のある非同期的なステップであるため、`DatadogCodepushProvider` を使用する場合は、`InitializationMode.SYNC` と `InitializationMode.ASYNC` との間に違いはありません。　

## CodePush のソースマップをアップロードする

プロジェクトに [`@datadog/datadog-ci`][3] を開発依存としてインストールします。

NPM でインストールするには

```sh
npm install @datadog/datadog-ci --save-dev
```

Yarn でインストールするには

```sh
yarn add -D @datadog/datadog-ci
```

プロジェクトのルートに、API キーと Datadog のサイト (`datadoghq.com` でない場合) を含む gitignore された `datadog-ci.json` ファイルを作成します。

```json
{
    "apiKey": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "site": "datadoghq.eu"
}
```

また、環境変数 `DATADOG_API_KEY` と `DATADOG_SITE` としてエクスポートすることも可能です。

新しい CodePush バンドルをリリースする際、ソースマップとバンドルを出力するディレクトリを指定します。

```sh
appcenter codepush release-react -a MyOrganization/MyApplication -d MyDeployment --sourcemap-output --output-dir ./build
```

適切な CodePush の `app` と `deployment` 引数を渡し、`datadog-ci react-native codepush` コマンドを実行します。

NPM で実行するには

```sh
npm run datadog-ci react-native codepush --platform ios --service com.company.app --bundle ./build/CodePush/main.jsbundle --sourcemap ./build/CodePush/main.jsbundle.map --app MyOrganization/MyApplication --deployment MyDeployment
```

Yarn で実行するには

```sh
yarn datadog-ci react-native codepush --platform ios --service com.company.app --bundle ./build/CodePush/main.jsbundle --sourcemap ./build/CodePush/main.jsbundle.map --app MyOrganization/MyApplication --deployment MyDeployment
```

## 代替テクノロジー

これらのステップでは、`version` が `{commercialVersion}-codepush.{codePushLabel}` の形式、例えば `1.2.4-codepush.v3` と一致することを確認します。

また、SDK の構成で `versionSuffix` を指定することでも実現できます。

```js
const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // ユーザーインタラクションを追跡します (ボタンのタップなど。'accessibilityLabel' 要素のプロパティを使って、タップアクションに名前を付けることができます。それ以外の場合は、要素の種類を報告します)
    true, // XHR リソースを追跡します
    true // エラーを追跡します
);

config.versionSuffix = `codepush.${codepushVersion}`; // "1.0.0-codepush.v2" になります
```

バージョンの衝突を避けるために、`versionSuffix` はサフィックスの前にダッシュ (`-`) を追加します。

`codepushVersion` を取得するには、ハードコードするか、[`CodePush.getUpdateMetadata`][4] を使用します。

次に、[`datadog-ci react-native upload`][5] コマンドを使用してソースマップをアップロードし、`--release-version` 引数が SDK 構成で設定されたものと一致することを確認します。

## デバイスがオフラインの時のデータ送信

RUM では、ユーザーのデバイスがオフラインのときにもデータを確実に利用できます。ネットワークの状態が悪いエリアやデバイスのバッテリーが非常に少ないなどの場合でも、すべての RUM イベントは最初にローカルデバイスにバッチで格納されます。

各バッチはインテークの仕様に従います。ネットワークが利用可能で、Datadog SDK がエンドユーザーのエクスペリエンスに影響を与えないようにバッテリーの残量が十分にあれば、バッチはすぐに送信されます。アプリケーションがフォアグラウンドにあるときにネットワークが利用できない場合、またはデータのアップロードが失敗した場合、バッチは正常に送信されるまで保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。SDK がディスク容量を使いすぎないようにするため、ディスク上のデータは、古すぎる場合自動的に破棄されます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.microsoft.com/en-us/appcenter/distribution/codepush/
[2]: /ja/real_user_monitoring/reactnative/
[3]: https://github.com/DataDog/datadog-ci
[4]: https://docs.microsoft.com/en-us/appcenter/distribution/codepush/rn-api-ref#codepushgetupdatemetadata
[5]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/react-native#upload
[6]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation-codepush