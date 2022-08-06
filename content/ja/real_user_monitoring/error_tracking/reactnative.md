---
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-reactnative/blob/main/docs/crash_reporting.md
description: React Native プロジェクトにエラー追跡を設定します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: GitHub
  text: dd-sdk-ios ソースコード
- link: real_user_monitoring/error_tracking/explorer
  tag: ドキュメント
  text: エラートラッキングエクスプローラーについて
kind: documentation
title: React Native のクラッシュレポートとエラー追跡
---
## 概要

React Native のクラッシュとエラー追跡を有効にすると、リアルユーザーモニタリングで包括的なクラッシュレポートとエラートレンドを取得できます。この機能により、以下にアクセスが可能になります。

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

<div class="alert alert-warning"><p>
Datadog は、50MB までのアップロードを受け付けます。
</p></div>

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

## クラッシュレポートのシンボル化

アプリケーションのサイズを小さくするために、リリース用にビルドされる際に、そのコードは最小化されます。エラーを実際のコードにリンクするために、以下のシンボル化ファイルをアップロードする必要があります。

-   iOS の JavaScript バンドル用の JavaScript ソースマップ
-   Android の JavaScript バンドル用の JavaScript ソースマップ
-   iOS ネイティブコード用の dSYM
-   Android ネイティブコードのコード難読化を有効にしている場合、Proguard マッピングファイル

### iOS ビルドにおける JavaScript ソースマップのアップロード

プロジェクトに `@datadog/datadog-ci` を開発依存としてインストールする必要があります。

```bash
yarn add -D @datadog/datadog-ci

npm install --save-dev @datadog/datadog-ci
```

#### 各ビルドで手動 (Hermes なし)

ソースマップを出力するためには、XCode のビルドフェーズ "Bundle React Native Code and Images” を編集する必要があります。

1. XCode で `ios/YourAppName.xcworkspace` ファイルを開きます。
2. 左側のパネルで、”File" アイコンを選択し、プロジェクトをクリックします。
3. 中央のパネルで、上のバーから "Build Phases” を選択します。

`set -e` の行の後にこれを追加して、スクリプトを変更します。

```bash
set -e
export SOURCEMAP_FILE=./build/main.jsbundle.map # <- ソースマップの出力にこの行を追加します
# スクリプトの残りを変更せずにおきます
```

今後、すべての iOS ビルドで、バンドル用のソースマップを見つけることができます。

XCode からバンドルファイルのパスを見つけるには、XCode の Report Navigator を表示し、`BUNDLE_FILE` でフィルターをかけてその場所を確認します。

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

#### 各ビルドで手動 (Hermes あり)

現在、React Native で Hermes を使用した場合、不正なソースマップが生成されるバグがあります。

これを解決するには、正しいソースマップファイルを生成するために、ビルドフェーズの**一番最後**に行を追加する必要があります。

ビルドフェーズをこのように編集します。

```bash
set -e
export SOURCEMAP_FILE=./build/main.jsbundle.map # <- ソースマップの出力にこの行を追加します

# スクリプトの残りを変更せずにおきます

# 以下の行を追加して、パッケージャーとコンパイラーのソースマップを 1 つのファイルにまとめます
REACT_NATIVE_DIR=../node_modules/react-native
source "$REACT_NATIVE_DIR/scripts/find-node.sh"
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

#### 各ビルドで手動

Android では、バンドルファイルは `android/app/build/generated/assets/react/release/index.android.bundle` に、ソースマップファイルは `android/app/build/generated/sourcemaps/react/release/index.android.bundle.map` に配置されます。アプリケーションにもっと包括的なバリアントがある場合は、パスの `release` をバリアント名で置き換えてください。

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

`android/app/build.gradle` ファイルで、プラグインを追加し、**ファイルの一番上で**これを構成します。

```groovy
plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin") version "1.4.0"
}

datadog {
    site = "US1"
    checkProjectDependencies = "none" // これは、React Native プロジェクトでは、どんな場合でも必要です。
}
```

[site 値][8]は、Datadog SDK の構成にある値と一致させる必要があります。詳しくは、[Datadog Android SDK Gradle プラグイン][6]を参照してください。

ビルド後にプラグインを実行するには、API キーを `DD_API_KEY` としてエクスポートし、`(cd android && ./gradlew app:uploadMappingRelease)` を実行します。

#### ビルドごとにアップロードを自動化

前のステップと同様に、プラグインをインストールします。

`android/app/build.gradle` ファイルから、`applicationVariants` のループを探します。`applicationVariants.all { variant ->` のような形になるはずです。

ループの中に、以下のスニペットを追加します。

```groovy
        if (project.tasks.findByName("minify${variant.name.capitalize()}WithR8")) {
            tasks["minify${variant.name.capitalize()}WithR8"].finalizedBy { tasks["uploadMapping${variant.name.capitalize()}"] }
        }
```

### クラッシュレポートの検証

React Native のクラッシュレポートとエラー追跡の構成を確認するには、[`react-native-crash-tester`][7] のようなパッケージをインストールすると、ネイティブ側または JavaScript 側からアプリをクラッシュさせることが可能です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/reactnative/
[4]: https://docs.datadoghq.com/ja/real_user_monitoring/ios/crash_reporting/?tabs=cocoapods#symbolicate-crash-reports
[5]: https://reactnative.dev/docs/signed-apk-android#enabling-proguard-to-reduce-the-size-of-the-apk-optional
[6]: https://github.com/datadog/dd-sdk-android-gradle-plugin
[7]: https://github.com/cwhenderson20/react-native-crash-tester
[8]: https://docs.datadoghq.com/ja/getting_started/site/