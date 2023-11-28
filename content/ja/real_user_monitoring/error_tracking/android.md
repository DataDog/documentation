---
description: Android アプリケーションにエラー追跡を設定します。
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: Error Tracking
  text: エラー追跡を開始する
- link: /real_user_monitoring/error_tracking/explorer
  tag: ドキュメント
  text: エクスプローラーでエラー追跡データを視覚化する
kind: documentation
title: Android のクラッシュレポートとエラー追跡
---

## 概要

エラー追跡は、RUM Android SDK から収集されたエラーを処理します。

Android のクラッシュレポートとエラー追跡を有効にすると、リアルユーザーモニタリングで包括的なクラッシュレポートとエラートレンドを取得できます。この機能により、以下にアクセスが可能になります。

- 集計済みの Android クラッシュダッシュボードおよび属性
- 難読化された Android クラッシュレポート
- Android エラー追跡とトレンド分析

クラッシュレポートは [**Error Tracking**][1] に表示されます。

## セットアップ

まだ Android SDK をインストールしていない場合は、[アプリ内セットアップ手順][2]に従うか、[Android RUM セットアップドキュメント][3]を参照してください。

1. Gradle の依存関係に最新版の [RUM Android SDK][4] を追加します。
2. [SDK の初期化][5]の際に、アプリケーションの `env` と `variant` を構成します。
3. Gradle タスクを実行し、難読化されたスタックトレースにアクセスするために、Proguard/R8 マッピングファイルを Datadog にアップロードします。

任意のエラーについて、ファイルパス、行番号、関連するスタックトレースの各フレームのコードスニペットにアクセスすることができます。

## マッピングファイルのアップロード

**注**: バージョンに変更がない場合、ソースマップを再アップロードしても既存のものはオーバーライドされません。

{{< tabs >}}
{{% tab "US" %}}

1. 以下のコードスニペットを使用して、[Android Gradle プラグイン][1]を Gradle プロジェクトに追加します。

   ```groovy
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Datadog 専用の API キーを作成][2]し、環境変数として `DD_API_KEY` または `DATADOG_API_KEY` という名前でエクスポートします。また、プロジェクトのルートに `datadog-ci.json` ファイルがあれば、その中の `apiKey` プロパティから取得することも可能です。
3. オプションとして、`build.gradle` スクリプトでプラグインを構成して、EU リージョンにファイルをアップロードするように構成します。

   ```groovy
   datadog {
       site = "EU1"
   }
   ```

4. 難読化された APK が構築されたらアップロードタスクを実行します。

   ```bash
   ./gradlew uploadMappingRelease
   ```

**注**: プロジェクトで追加のフレーバーを使用している場合、プラグインは、難読化が有効になっている各バリアントのアップロードタスクを提供します。この場合、RUM Android SDK を適切なバリアント名で初期化します (必要な API はバージョン `1.8.0` 以降で使用可能です)。

[1]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[2]: https://app.datadoghq.com/account/settings#api

{{% /tab %}}
{{% tab "EU" %}}
1. 以下のコードスニペットを使用して、[Android Gradle プラグイン][1]を Gradle プロジェクトに追加します。

   ```groovy
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Datadog 専用の API キーを作成][2]し、環境変数として `DD_API_KEY` または `DATADOG_API_KEY` という名前でエクスポートします。また、プロジェクトのルートに `datadog-ci.json` ファイルがあれば、その中の `apiKey` プロパティから取得することも可能です。
3. アプリの `build.gradle` スクリプトファイルで以下のスニペットを追加し、EU リージョンで使用するようプラグインを構成します。

   ```groovy
   datadog {
       site = "EU1"
   }
   ```

4. 難読化された APK が構築されたらアップロードタスクを実行します。

   ```bash
   ./gradlew uploadMappingRelease
   ```

**注**: プロジェクトで追加のフレーバーを使用している場合、プラグインは、難読化が有効になっている各バリアントのアップロードタスクを提供します。この場合、RUM Android SDK を適切なバリアント名で初期化します (必要な API はバージョン `1.8.0` 以降で使用可能です)。

[1]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[2]: https://app.datadoghq.com/account/settings#api

{{% /tab %}}
{{< /tabs >}}

### プラグインコンフィギュレーションオプション

プラグイン拡張機能を介して構成できるプラグインプロパティがいくつかあります。複数のバリアントを使用している場合は、バリアントの特定のフレーバーにプロパティ値を設定できます。

例えば、`fooBarRelease` バリアントの場合、以下のような構成になります。

```groovy
datadog {
    foo {
        versionName = "foo"
    }
    bar {
        versionName = "bar"
    }
    fooBar {
        versionName = "fooBar"
    }
}
```

このバリアントのタスク構成は、以下の順序で提供される 3 つのフレーバー構成のすべてからマージされます。

1. `bar`
2. `foo`
3. `fooBar`

これにより、`versionName` プロパティの最終的な値は `fooBar` と解決されます。

| プロパティ名              | 説明                                                                                                                                                                                               |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `versionName`              | アプリケーションのバージョン名 (デフォルトでは `build.gradle` スクリプトの `android` ブロックで宣言されたバージョン)。                                                                                                               |
| `serviceName`              | アプリケーションのサービス名 (デフォルトでは `build.gradle` スクリプトの `android` ブロックで宣言されたアプリケーションのパッケージ名)。                                                                                                                          |
| `site`                     | データをアップロードする Datadog サイト (US1、US3、US5、EU1、US1_FED、または AP1)。                                                                                                                                       |
| `remoteRepositoryUrl`      | ソースコードがデプロイされたリモートリポジトリの URL。これを指定しない場合、この値はタスクの実行時に Git コンフィギュレーションから解決されます。                     |
| `checkProjectDependencies` | このプロパティは、Datadog Android SDK が依存関係に含まれているかどうかをプラグインがチェックするかどうかを制御します。チェックしない場合、"none" は無視され、"warn" は警告をログに記録し、"fail" はエラーでビルドに失敗します (デフォルト)。 |

### CI/CD パイプラインとのインテグレーション

デフォルトでは、マッピングのアップロードタスクは、ビルドグラフの他のタスクから独立しています。マッピングのアップロードが必要な場合は、このタスクを手動で実行します。

CI/CD パイプラインでこのタスクを実行し、ビルドグラフの一部としてこのタスクが必要な場合、マッピングファイルが生成された後にアップロードタスクを実行するように設定できます。

例:

```groovy
tasks["minify${variant}WithR8"].finalizedBy { tasks["uploadMapping${variant}"] }
```

## 制限

{{< site-region region="us,us3,us5,eu" >}}
マッピングファイルの容量は **300** MB に制限されています。これより大きなマッピングファイルがあるプロジェクトでは、次のいずれかのオプションを使用してファイルサイズを小さくしてください。
{{< /site-region >}}
{{< site-region region="ap1,gov" >}}
マッピングファイルの容量は **50** MB に制限されています。これより大きなマッピングファイルがあるプロジェクトでは、次のいずれかのオプションを使用してファイルサイズを小さくしてください。
{{< /site-region >}}

- `mappingFileTrimIndents` オプションを `true` に設定します。これにより、ファイルサイズが平均で 5% 小さくなります。
- `mappingFilePackagesAliases` のマップを設定します。これは、パッケージ名をより短いエイリアスで置き換えるものです。**注**: Datadog のスタックトレースは元のパッケージ名の代わりに同じエイリアスを使うので、サードパーティの依存関係にはこのオプションを使うのがよいでしょう。

```groovy
datadog {
    mappingFileTrimIndents = true
    mappingFilePackageAliases = mapOf(
        "kotlinx.coroutines" to "kx.cor",
        "com.google.android.material" to "material",
        "com.google.gson" to "gson",
        "com.squareup.picasso" to "picasso"
    )
}
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /ja/real_user_monitoring/android/#setup
[4]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum
[5]: /ja/real_user_monitoring/android/advanced_configuration/?tabs=kotlin#initialization-parameters