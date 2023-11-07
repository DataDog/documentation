---
description: React Native プロジェクトにエラー追跡を設定します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: dd-sdk-reactnative ソースコード
- link: real_user_monitoring/error_tracking/
  tag: ドキュメント
  text: エラートラッキングについて
- link: https://www.datadoghq.com/blog/rum-now-offers-react-native-crash-reporting-and-error-tracking/
  tag: GitHub
  text: RUM が React Native のクラッシュレポートとエラー追跡を提供開始
kind: documentation
title: React Native のクラッシュレポートとエラー追跡
---

## 概要

React Native のクラッシュレポートとエラー追跡を有効にすると、リアルユーザーモニタリングで包括的なクラッシュレポートとエラートレンドを取得できます。この機能により、以下にアクセスが可能になります。

-   集計済みの React Native クラッシュダッシュボードおよび属性
-   記号化された React Native (JavaScript およびネイティブの iOS または Android) のクラッシュレポート
-   React Native のエラー追跡によるトレンド分析

スタックトレースを記号化するために、マッピングファイルを Datadog に手動でアップロードしてください。

クラッシュレポートは [**Error Tracking**][1] に表示されます。

## セットアップ

まだ RUM React Native SDK をインストールしていない場合は、[アプリ内セットアップ手順][2]に従うか、[React Native RUM セットアップドキュメント][3]を参照してください。

### クラッシュレポートの追加

初期化スニペットを更新して、ネイティブ JavaScript のクラッシュレポートを有効にします。

```javascript
const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true,
    true,
    true // javascript のクラッシュレポートを有効にする
);
config.nativeCrashReportEnabled = true; // enable native crash reporting
```

## 制限

{{< site-region region="us,us3,us5,eu" >}}
Datadog は最大 **300** MB までのアップロードを受け付けます。
{{< /site-region >}}
{{< site-region region="ap1,gov" >}}
Datadog は最大 **50** MB までのアップロードを受け付けます。
{{< /site-region >}}

ソースマップとバンドルのサイズを計算するには、次のコマンドを実行します。

```shell
npx react-native bundle \
  --dev false \
  --platform ios \
  --entry-file index.js \
  --bundle-output build/main.jsbundle \
  --sourcemap-output build/main.jsbundle.map

sourcemapsize=$(wc -c build/main.jsbundle.map | awk '{print $1}')
bundlesize=$(wc -c build/main.jsbundle | awk '{print $1}')
payloadsize=$(($sourcemapsize + $bundlesize))

echo "Size of source maps and bundle is $(($payloadsize / 1000000))MB"
```

もし `build` ディレクトリがまだ存在しない場合は、まず `mkdir build` を実行してディレクトリを作成します。その後、上記のコマンドを実行します。

## クラッシュレポートのシンボル化

アプリケーションのサイズを小さくするために、リリース用にビルドされる際に、そのコードは最小化されます。エラーを実際のコードにリンクするために、以下のシンボル化ファイルをアップロードする必要があります。

-   iOS の JavaScript バンドル用の JavaScript ソースマップ
-   Android の JavaScript バンドル用の JavaScript ソースマップ
-   iOS ネイティブコード用の dSYM
-   Android ネイティブコードのコード難読化を有効にしている場合、Proguard マッピングファイル

シンボル化されたファイルを自動的に送信するようにプロジェクトを設定するには、`npx datadog-react-native-wizard` を実行します。

オプションについては、ウィザード[公式ドキュメント][13]を参照してください。

## アップロード時のオプションの受け渡し

### Android で `datadog-sourcemaps.gradle` スクリプトを使用する

別のサービス名を指定するには、`android/app/build.gradle` ファイルの `apply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"` 行の前に、以下のコードを追加します。

```groovy
project.ext.datadog = [
    serviceName: "com.my.custom.service"
]
```

### iOS で `datadog-ci react-native xcode` コマンドを使用する

`datadog-ci react-native xcode` コマンドのオプションは、[コマンドドキュメントページ][12]にあります。

## クラッシュレポートの実装をテストする

ソースマップが正しく送信され、アプリケーションにリンクされていることを確認するために、[`react-native-performance-limiter`][14] パッケージでクラッシュを生成することができます。

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

dSYMs と Proguard マッピングファイルのアップロードをテストするには、代わりにネイティブのメインスレッドをクラッシュさせます。

```javascript
import { crashNativeMainThread } from 'react-native-performance-limiter';

const crashApp = () => {
    crashNativeMainThread('custom error message');
};
```

## `datadog-react-native-wizard` の代替となるもの

`datadog-react-native-wizard` を使ってもうまくいかない場合、あるいはリリースごとにシンボル化ファイルを自動的にアップロードしたくない場合は、次のステップに従ってクラッシュレポートをシンボル化してください。

### iOS ビルドにおける JavaScript ソースマップのアップロード

プロジェクトに `@datadog/datadog-ci` を開発依存としてインストールする必要があります。

```bash
yarn add -D @datadog/datadog-ci
# または
npm install --save-dev @datadog/datadog-ci
```

#### 各リリースビルドで自動的に (React Native >= 0.69)

リリースビルドのたびにソースマップを手動でアップロードするのは時間がかかり、エラーも起こりがちです。Datadog は、リリースビルドを実行するたびにソースマップを自動的に送信することを推奨します。

プロジェクトのルートに `datadog-sourcemaps.sh` という名前のスクリプトファイルを作成し、以下の内容を記述します。

```shell
#!/bin/sh
set -e

DATADOG_XCODE="../node_modules/.bin/datadog-ci react-native xcode"

/bin/sh -c "$DATADOG_XCODE"
```

このスクリプトは、すべての正しいパラメーターでソースマップをアップロードすることを担当するコマンドを実行します。詳細については、[datadog-ci のドキュメント][12]を参照してください。

Xcode で `.xcworkspace` を開き、プロジェクト > Build Phases > Bundle React Native code and images を選択します。スクリプトを以下のように編集します。

```shell
set -e
WITH_ENVIRONMENT="../node_modules/react-native/scripts/xcode/with-environment.sh"
# 以下の 2 行を追加します
REACT_NATIVE_XCODE="./datadog-sourcemaps.sh"
export SOURCEMAP_FILE=$DERIVED_FILE_DIR/main.jsbundle.map

# 次の行を編集します
/bin/sh -c "$WITH_ENVIRONMENT $REACT_NATIVE_XCODE"
```

アップロードを動作させるためには、Datadog API キーを指定する必要があります。コマンドラインツールや外部サービスを利用する場合は、環境変数 `DATADOG_API_KEY` として指定します。Xcode からビルドを実行する場合は、API キーを含む `datadog-ci.json` ファイルをプロジェクトのルートに作成します。

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

また、Datadog のサイト (`datadoghq.eu` など) を環境変数 `DATADOG_SITE` や、`datadog-ci.json` ファイルに `datadogSite` キーとして指定することも可能です。

#### 各リリースビルドで自動的に (React Native < 0.69)

Xcode で `.xcworkspace` を開き、プロジェクト > Build Phases > Bundle React Native code and images を選択します。スクリプトを以下のように編集します。

```shell
set -e

export NODE_BINARY=node
export SOURCEMAP_FILE=$DERIVED_FILE_DIR/main.jsbundle.map
../node_modules/.bin/datadog-ci react-native xcode
```

このスクリプトは、すべての正しいパラメーターでソースマップをアップロードすることを担当するコマンドを実行します。詳細については、[datadog-ci のドキュメント][12]を参照してください。

アップロードを動作させるためには、Datadog API キーを指定する必要があります。コマンドラインツールや外部サービスを利用する場合は、環境変数 `DATADOG_API_KEY` として指定します。Xcode からビルドを実行する場合は、API キーを含む `datadog-ci.json` ファイルをプロジェクトのルートに作成します。

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

また、Datadog のサイト (`datadoghq.eu` など) を環境変数 `DATADOG_SITE` や、`datadog-ci.json` ファイルに `datadogSite` キーとして指定することも可能です。

#### 各ビルドで手動

ソースマップを出力するためには、Xcode のビルドフェーズ "Bundle React Native Code and Images” を編集する必要があります。

1. Xcode で `ios/YourAppName.xcworkspace` ファイルを開きます。
2. 左側のパネルで、”File" アイコンを選択し、プロジェクトをクリックします。
3. 中央のパネルで、上のバーから "Build Phases” を選択します。

`set -e` の行の後にこれを追加して、スクリプトを変更します。

```bash
set -e
export SOURCEMAP_FILE=./build/main.jsbundle.map # <- ソースマップの出力にこの行を追加します
# スクリプトの残りを変更せずにおきます
```

今後、すべての iOS ビルドで、バンドル用のソースマップを見つけることができます。

Xcode からバンドルファイルのパスを見つけるには、Xcode の Report Navigator を表示し、`BUNDLE_FILE` でフィルターをかけてその場所を確認します。

通常の場所は `~/Library/Developer/Xcode/DerivedData/YourAppName-verylonghash/Build/Intermediates.noindex/ArchiveIntermediates/YourAppName/BuildProductsPath/Release-iphoneos/main.jsbundle` で、`YourAppName` はアプリ名で `verylonghash` は 28 文字のハッシュです。

ソースマップをアップロードするには、React Native プロジェクトからこれを実行します。

```bash
export DATADOG_API_KEY= # API キーを入力します
export SERVICE=com.myapp # サービス名で置き換えます
export VERSION=1.0.0 # XCode のアプリのバージョンで置き換えます
export BUILD=100 # XCode のアプリのビルドで置き換えます
export BUNDLE_PATH= # バンドルパスを入力します

yarn datadog-ci react-native upload --platform ios --service $SERVICE --bundle $BUNDLE_PATH --sourcemap ./build/main.jsbundle.map --release-version $VERSION --build-version $BUILD
```

#### 各ビルドで手動 (Hermes for React Native < 0.71 あり)

React Native の 0.71 までのバージョンで、Hermes を使用した場合に不正なソースマップが生成されるバグがあります。

これを解決するには、正しいソースマップファイルを生成するために、ビルドフェーズの**一番最後**に行を追加する必要があります。

ビルドフェーズをこのように編集します。

```bash
set -e
export SOURCEMAP_FILE=./build/main.jsbundle.map # <- ソースマップの出力にこの行を追加します
# React Native 0.70 では、ソースマップを生成するために USE_HERMES を true に設定する必要があります
export USE_HERMES=true

# スクリプトの残りを変更せずにおきます

# 以下の行を追加して、パッケージャーとコンパイラーのソースマップを 1 つのファイルにまとめます
REACT_NATIVE_DIR=../node_modules/react-native

if [ -f "$REACT_NATIVE_DIR/scripts/find-node-for-xcode.sh" ]; then
    source "$REACT_NATIVE_DIR/scripts/find-node-for-xcode.sh"
else
    # Before RN 0.70, the script was named find-node.sh
    source "$REACT_NATIVE_DIR/scripts/find-node.sh"
fi
source "$REACT_NATIVE_DIR/scripts/node-binary.sh"
"$NODE_BINARY" "$REACT_NATIVE_DIR/scripts/compose-source-maps.js" "$CONFIGURATION_BUILD_DIR/main.jsbundle.map" "$CONFIGURATION_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH/main.jsbundle.map" -o "../$SOURCEMAP_FILE"
```

ソースマップをアップロードするには、React Native プロジェクトルートからこれを実行します。

```bash
export DATADOG_API_KEY= # API キーを入力します
export SERVICE=com.myapp # サービス名で置き換えます
export VERSION=1.0.0 # XCode のアプリのバージョンで置き換えます
export BUILD=100 # XCode のアプリのビルドで置き換えます
export BUNDLE_PATH= # バンドルパスを入力します

yarn datadog-ci react-native upload --platform ios --service $SERVICE --bundle $BUNDLE_PATH --sourcemap ./build/main.jsbundle.map --release-version $VERSION --build-version $BUILD
```

### Android ビルドにおける JavaScript ソースマップのアップロード

#### 各リリースビルドで自動的に (React Native >= 0.71)

`android/app/build.gradle` ファイルで、`apply plugin: "com.facebook.react"` 行の後に、以下を追加します。

```groovy
apply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"
```

アップロードを動作させるためには、Datadog API キーを指定する必要があります。環境変数 `DATADOG_API_KEY` として指定するか、API キーを含む `datadog-ci.json` ファイルをプロジェクトのルートに作成します。

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

また、Datadog のサイト (`datadoghq.eu` など) を環境変数 `DATADOG_SITE` や、`datadog-ci.json` ファイルに `datadogSite` キーとして指定することも可能です。

#### 各リリースビルドで自動的に (React Native < 0.71)

`android/app/build.gradle` ファイルで、`apply from: "../../node_modules/react-native/react.gradle"` 行の後に、以下を追加します。

```groovy
apply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"
```

アップロードを動作させるためには、Datadog API キーを指定する必要があります。環境変数 `DATADOG_API_KEY` として指定するか、API キーを含む `datadog-ci.json` ファイルをプロジェクトのルートに作成します。

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

また、Datadog のサイト (`datadoghq.eu` など) を環境変数 `DATADOG_SITE` や、`datadog-ci.json` ファイルに `datadogSite` キーとして指定することも可能です。

#### 各ビルドで手動

Android では、ソースマップファイルは `android/app/build/generated/sourcemaps/react/release/index.android.bundle.map` に配置されます。
バンドルファイルの場所は、React Native (RN) と Android Gradle Plugin (AGP) のバージョンに依存します。

-   RN >= 0.71 および AGP >= 7.4.0: `android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle`
-   RN >= 0.71 および AGP < 7.4.0: `android/app/build/ASSETS/createBundleReleaseJsAndAssets/index.android.bundle`
-   RN < 0.71: `android/app/build/generated/assets/react/release/index.android.bundle`

Android Gradle Plugin のバージョンは `android/build.gradle` ファイル内の `com.android.tools.build:gradle` で指定します。例: `classpath("com.android.tools.build:gradle:7.3.1")`

もし、アプリケーションがより包括的なバリアントを持っている場合は、パス中の `release` をバリアント名に置き換えてください。
`android/app/build.gradle` の React 構成で `bundleAssetName` を指定した場合は、 `index.android.bundle` をその値で置き換えてください。

ビルドを実行した後、React Native プロジェクトのルートからこのコマンドを実行して、ソースマップをアップロードします。

```bash
export DATADOG_API_KEY= # API キーを入力します
export SERVICE=com.myapp # サービス名で置き換えます
export VERSION=1.0.0 # android/app/build.gradle の versionName に置き換えます
export BUILD=100 # android/app/build.gradle の versionCode に置き換えます
export BUNDLE_PATH=android/app/build/generated/assets/react/release/index.android.bundle
export SOURCEMAP_PATH=android/app/build/generated/sourcemaps/react/release/index.android.bundle.map

yarn datadog-ci react-native upload --platform android --service $SERVICE --bundle $BUNDLE_PATH --sourcemap $SOURCEMAP_PATH --release-version $VERSION --build-version $BUILD
```

### iOS dSYM ファイルのアップロード

#### 各ビルドで手動

詳しくは、[iOS のクラッシュレポートとエラー追跡のドキュメント][4]をご覧ください。

### Android Proguard のマッピングファイルのアップロード

まず、プロジェクトで Proguard のミニフィケーションが有効になっていることを確認します。デフォルトでは、React Native のプロジェクトでは有効になっていません。

詳しくは、[React Native Proguard のドキュメント][5]をご覧ください。

それでもわからない場合は、`(cd android && ./gradlew tasks --all) | grep minifyReleaseWithR8` を実行すると、何か返ってくるかどうか確認します。返ってくる場合、ミニフィケーションが有効になっています。

#### 各ビルドで手動

`android/app/build.gradle` ファイルで、[プラグインの最新バージョン][15]を追加し、**ファイルの一番上で**これを構成します。

```groovy
plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
}

datadog {
    checkProjectDependencies = "none" // これは、React Native プロジェクトでは、どんな場合でも必要です。
}
```

アップロードを動作させるためには、Datadog API キーを指定する必要があります。環境変数 `DATADOG_API_KEY` として指定するか、API キーを含む `datadog-ci.json` ファイルをプロジェクトのルートに作成します。

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

また、Datadog のサイト (`datadoghq.eu` など) を環境変数 `DATADOG_SITE` や、`datadog-ci.json` ファイルに `datadogSite` キーとして指定することも可能です。
詳しくは、[Datadog Android SDK Gradle プラグイン][6]をご覧ください。

ビルド後にプラグインを実行するには、`(cd android && ./gradlew app:uploadMappingRelease)` を実行します。

#### ビルドごとにアップロードを自動化

前のステップと同様に、プラグインをインストールします。

`android/app/build.gradle` ファイルから、`applicationVariants` のループを探します。`applicationVariants.all { variant ->` のような形になるはずです。

ループの中に、以下のスニペットを追加します。

```groovy
        if (project.tasks.findByName("minify${variant.name.capitalize()}WithR8")) {
            tasks["minify${variant.name.capitalize()}WithR8"].finalizedBy { tasks["uploadMapping${variant.name.capitalize()}"] }
        }
```

**注**: バージョンに変更がない場合、ソースマップを再アップロードしても既存のものはオーバーライドされません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /ja/real_user_monitoring/reactnative/
[4]: /ja/real_user_monitoring/ios/crash_reporting/?tabs=cocoapods#symbolicate-crash-reports
[5]: https://reactnative.dev/docs/signed-apk-android#enabling-proguard-to-reduce-the-size-of-the-apk-optional
[6]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[7]: https://github.com/cwhenderson20/react-native-crash-tester
[9]: https://fastlane.tools/
[10]: https://appcenter.ms/
[11]: https://www.bitrise.io/
[12]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/react-native#xcode
[13]: https://github.com/DataDog/datadog-react-native-wizard
[14]: https://github.com/DataDog/react-native-performance-limiter
[15]: https://plugins.gradle.org/plugin/com.datadoghq.dd-sdk-android-gradle-plugin