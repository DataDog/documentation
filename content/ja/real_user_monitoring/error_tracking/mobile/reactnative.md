---
aliases:
- /ja/real_user_monitoring/error_tracking/reactnative
code_lang: reactnative
code_lang_weight: 40
description: Set up Error Tracking for your React Native projects.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: ソースコード
  text: dd-sdk-reactnative Source code
- link: real_user_monitoring/error_tracking/
  tag: Documentation
  text: Learn about Error Tracking
- link: https://www.datadoghq.com/blog/rum-now-offers-react-native-crash-reporting-and-error-tracking/
  tag: Blog
  text: RUM now offers React Native Crash Reporting and Error Tracking
kind: documentation
title: React Native Crash Reporting and Error Tracking
type: multi-code-lang
---

## Overview

Enable React Native Crash Reporting and Error Tracking to get comprehensive crash reports and error trends with Real User Monitoring. With this feature, you can access:

-   Aggregated React Native crash dashboards and attributes
-   Symbolicated React Native (JavaScript and native iOS or Android) crash reports
-   Trend analysis with React Native Error Tracking

In order to symbolicate your stack traces, manually upload your mapping files into Datadog.

Your crash reports appear in [**Error Tracking**][1].

## セットアップ

If you have not set up the RUM React Native SDK yet, follow the [in-app setup instructions][2] or see the [React Native RUM setup documentation][3].

### Add Crash Reporting

Update your initialization snippet to enable native JavaScript crash reporting:

```javascript
const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true,
    true,
    true // enable JavaScript crash reporting
);
config.nativeCrashReportEnabled = true; // enable native crash reporting
```

## Get deobfuscated stack traces

Mapping files are used to deobfuscate stack traces, which helps in debugging errors. Using a unique build ID that gets generated, Datadog automatically matches the correct stack traces with the corresponding mapping files. This ensures that regardless of when the mapping file was uploaded (either during pre-production or production builds), the correct information is available for efficient QA processes when reviewing crashes and errors reported in Datadog.

For React Native applications, the matching of stack traces and sourcemaps relies on a combination of the `service`, `version`, `bundle_name`, and `platform` fields. Out of all sourcemaps that match with these fields, Datadog uses the one with the highest `build_number` value.

アプリケーションのサイズを小さくするために、リリース用にビルドされる際に、そのコードは最小化されます。エラーを実際のコードにリンクするために、以下のシンボル化ファイルをアップロードする必要があります。

-   iOS の JavaScript バンドル用の JavaScript ソースマップ
-   Android の JavaScript バンドル用の JavaScript ソースマップ
-   iOS ネイティブコード用の dSYM
-   Android ネイティブコードのコード難読化を有効にしている場合、Proguard マッピングファイル

シンボル化されたファイルを自動的に送信するようにプロジェクトを設定するには、`npx datadog-react-native-wizard` を実行します。

オプションについては、ウィザード[公式ドキュメント][13]を参照してください。

### アップロード時のオプションの受け渡し

#### Using the `datadog-sourcemaps.gradle` script

別のサービス名を指定するには、`android/app/build.gradle` ファイルの `apply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"` 行の前に、以下のコードを追加します。

```groovy
project.ext.datadog = [
    serviceName: "com.my.custom.service"
]
```

#### Using the `datadog-ci react-native xcode` command

`datadog-ci react-native xcode` コマンドのオプションは、[コマンドドキュメントページ][12]にあります。

#### Specifying a custom release version

Use the `DATADOG_RELEASE_VERSION` environment variable to specify a different release version for your sourcemaps, starting from `@datadog/mobile-react-native@2.3.5` and `@datadog/datadog-ci@v2.37.0`.

When the SDK is initialized with a version suffix, you must manually override the release version in order for the sourcemap and build versions to match.

## 制限

{{< site-region region="us,us3,us5,eu,gov" >}}
Source maps, mapping files, and dSYM files are limited to **500** MB each.
{{< /site-region >}}
{{< site-region region="ap1" >}}
Source maps, mapping files, and dSYM files are limited to **500** MB each.
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

If a `build` directory does not already exist, create it first by running `mkdir build`, then run the command above.

## Test your implementation

To verify your React Native Crash Reporting and Error Tracking configuration, you need to issue an error in your RUM application and confirm that the error appears in Datadog.

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

dSYMs と Proguard マッピングファイルのアップロードをテストするには、代わりにネイティブのメインスレッドをクラッシュさせます。

```javascript
import { crashNativeMainThread } from 'react-native-performance-limiter';

const crashApp = () => {
    crashNativeMainThread('custom error message');
};
```

## 追加のコンフィギュレーションオプション

### Alternatives to `datadog-react-native-wizard` for symbolication

`datadog-react-native-wizard` を使ってもうまくいかない場合、あるいはリリースごとにシンボル化ファイルを自動的にアップロードしたくない場合は、次のステップに従ってクラッシュレポートをシンボル化してください。

#### iOS ビルドにおける JavaScript ソースマップのアップロード

First, you need to install `@datadog/datadog-ci` as a dev dependency to your project:

```bash
yarn add -D @datadog/datadog-ci
# または
npm install --save-dev @datadog/datadog-ci
```

{{% collapse-content title="Automatically on each release build (React Native >= 0.69)" level="h5" %}}

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

{{% /collapse-content %}}

{{% collapse-content title="Automatically on each release build (React Native < 0.69)" level="h5" %}}

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

{{% /collapse-content %}}

{{% collapse-content title="Manually on each build" level="h5" %}}

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

{{% /collapse-content %}}

{{% collapse-content title="Manually on each build (with Hermes for React Native < 0.71)" level="h5" %}}

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

{{% /collapse-content %}}

#### Android ビルドにおける JavaScript ソースマップのアップロード

{{% collapse-content title="Automatically on each release build (React Native >= 0.71)" level="h5" %}}

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

{{% /collapse-content %}}

{{% collapse-content title="Automatically on each release build (React Native < 0.71)" level="h5" %}}

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

{{% /collapse-content %}}

{{% collapse-content title="Manually on each build" level="h5" %}}

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

{{% /collapse-content %}}

#### iOS dSYM ファイルのアップロード

{{% collapse-content title="Manually on each build" level="h5" %}}

詳しくは、[iOS のクラッシュレポートとエラー追跡のドキュメント][4]をご覧ください。

{{% /collapse-content %}}

#### Android Proguard のマッピングファイルのアップロード

まず、プロジェクトで Proguard のミニフィケーションが有効になっていることを確認します。デフォルトでは、React Native のプロジェクトでは有効になっていません。

詳しくは、[React Native Proguard のドキュメント][5]をご覧ください。

それでもわからない場合は、`(cd android && ./gradlew tasks --all) | grep minifyReleaseWithR8` を実行すると、何か返ってくるかどうか確認します。返ってくる場合、ミニフィケーションが有効になっています。

{{% collapse-content title="Manually on each build" level="h5" %}}

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

{{% /collapse-content %}}

{{% collapse-content title="Automate the upload on each build" level="h5" %}}

前のステップと同様に、プラグインをインストールします。

`android/app/build.gradle` ファイルから、`applicationVariants` のループを探します。`applicationVariants.all { variant ->` のような形になるはずです。

ループの中に、以下のスニペットを追加します。

```groovy
        if (project.tasks.findByName("minify${variant.name.capitalize()}WithR8")) {
            tasks["minify${variant.name.capitalize()}WithR8"].finalizedBy { tasks["uploadMapping${variant.name.capitalize()}"] }
        }
```

**注**: バージョンに変更がない場合、ソースマップを再アップロードしても既存のものはオーバーライドされません。

{{% /collapse-content %}}

## 参考資料

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