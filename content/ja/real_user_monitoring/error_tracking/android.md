---
dependencies:
- "https://github.com/DataDog/dd-sdk-android-gradle-plugin/blob/main/docs/upload_mapping_file.md"
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: Error Tracking
  text: エラー追跡を開始する
- link: /real_user_monitoring/error_tracking/explorer
  tag: ドキュメント
  text: エクスプローラーでエラー追跡データを視覚化する
kind: documentation
title: Android エラー追跡
---
## 概要

エラー追跡では、Android SDK から収集されたエラーを処理します。エラー追跡をすばやく開始するには、最新バージョンの [dd-sdk-android][1] をダウンロードします。

モバイルの Android ソースコードが難読化されている場合は、 Proguard/R8 マッピングファイルを Datadog にアップロードして、さまざまなスタックトレースを難読化します。その後、特定のエラーについて、ファイルパス、行番号、および関連するスタックトレースの各フレームのコードスニペットにアクセスできます。

## マッピングファイルのアップロード

{{< tabs >}}
{{% tab "US" %}}

1. 以下のスニペットを使用して、[Gradle プラグイン][1]を Gradle プロジェクトに追加します。

```groovy
// アプリの build.gradle スクリプトで
plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
}
```

2. [新しい専用の Datadog API キーを作成][2]し、`DD_API_KEY` という名前の環境変数としてエクスポートします (または、タスクプロパティとして渡すこともできます)。
3. （オプション）2 つの追加環境変数 `export DATADOG_SITE="datadoghq.eu"` および `export DATADOG_API_HOST="api.datadoghq.eu"` をエクスポートして、EU リージョンにファイルをアップロードするためにプラグインを構成します。
4. 難読化された APK が構築されたらアップロードタスクを実行します。
```bash
./gradlew uploadMappingRelease
```
**注**: プロジェクトで追加のフレーバーを使用している場合、プラグインは、難読化が有効になっている各バリアントのアップロードタスクを提供します。この場合、SDK を適切なバリアント名で初期化します (必要な API はバージョン `1.8.0` 以降で使用可能です)。

[1]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[2]: https://app.datadoghq.com/account/settings#api

{{% /tab %}}
{{% tab "EU" %}}
1. 以下のスニペットを使用して、[Gradle プラグイン][1]を Gradle プロジェクトに追加します。

```groovy
// アプリの build.gradle スクリプトで
plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
}
```

2. [新しい専用の Datadog API キーを作成][2]し、`DD_API_KEY` という名前の環境変数としてエクスポートします (または、タスクプロパティとして渡すこともできます)。
3. アプリの `build.gradle` スクリプトファイルで以下のスニペットを追加し、EU リージョンで使用するようプラグインを構成します。

```groovy
datadog {
    site = "EU"
}
```
4. 難読化された APK が構築されたらアップロードタスクを実行します。
```bash
./gradlew uploadMappingRelease
```
**注**: プロジェクトで追加のフレーバーを使用している場合、プラグインは、難読化が有効になっている各バリアントのアップロードタスクを提供します。この場合、SDK を適切なバリアント名で初期化します (必要な API はバージョン `1.8.0` 以降で使用可能です)。

[1]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[2]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{< /tabs >}}

### プラグインコンフィギュレーションオプション

プラグイン拡張機能を介して構成できるプラグインプロパティがいくつかあります。複数のバリアントを使用している場合は、バリアントの特定のフレーバーにプロパティ値を設定できます。

**例:**

バリアント `fooBarRelease` の場合、次のコンフィギュレーションを使用できます。

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

このバリアントのタスクコンフィギュレーションは、提供されている 3 つのフレーバーコンフィギュレーションすべてから `bar` -> `foo` -> `fooBar` の順序でマージされます。これは、`versionName` プロパティの最終値を `fooBar` として解決します。

| プロパティ名              | 説明                                                                                                                                                                                               |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `versionName`              | アプリケーションのバージョン名。                                                                                                                                                                      |
| `serviceName`              | アプリケーションのサービス名。                                                                                                                                                                      |
| `site`                     | データをアップロードする Datadog サイト("US"、"EU"、"GOV" のいずれか)。                                                                                                                                       |
| `remoteRepositoryUrl`      | ソースコードがデプロイされたリモートリポジトリの URL。指定しない場合、この値はタスクの実行時に現在の GIT コンフィギュレーションから解決されます。                     |
| `checkProjectDependencies` | このプロパティは、Datadog SDK が依存関係に含まれているかどうかをプラグインがチェックするかどうかを制御します。"none" - 無視、"warn" - 警告をログに記録、"fail" - エラーでビルドに失敗します (デフォルト)。 |


## エラーの解決

クラス名、ファイルパス、そして行番号にアクセスできないため、難読化されたスタックトレースは役に立ちません。コードベースのどこで何かが起こっているのかを把握するのは簡単ではありません。さらに、コードスニペットは依然として縮小されているため (変換されたコードの 1 行が長い)、トラブルシューティングプロセスがさらに困難になります。縮小スタックトレースの例を以下に示します。

![image_obfuscated][2]

それどころか、難読化を解除されたスタックトレースは、トラブルシューティングに必要なすべてのコンテキストを提供します。

![image_deobfuscated][3]

[1]: https://github.com/DataDog/dd-sdk-android
[2]: https://raw.githubusercontent.com/DataDog/dd-sdk-android-gradle-plugin/main/docs/images/obfuscated_stacktrace.png
[3]: https://raw.githubusercontent.com/DataDog/dd-sdk-android-gradle-plugin/main/docs/images/deobfuscated_stacktrace.png

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
