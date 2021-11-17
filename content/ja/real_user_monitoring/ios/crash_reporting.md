---
beta: true
dependencies:
  - https://github.com/DataDog/dd-sdk-ios/blob/master/docs/rum_collection/crash_reporting.md
further_reading:
  - link: https://datadoghq.com/blog/ios-crash-reporting-datadog/
    tag: ブログ
    text: iOS のクラッシュレポートとエラー追跡のご紹介
  - link: /real_user_monitoring
    tag: ドキュメント
    text: RUM データの調査方法
kind: documentation
title: iOS のクラッシュレポートとエラー追跡
---
## 概要

<div class="alert alert-info"><p>iOS のクラッシュレポートとエラー追跡は、ベータ版です。アクセスするには、<a href="https://github.com/DataDog/dd-sdk-ios/releases">dd-sdk-ios v1.7.0+</a> にアップグレードしてください。</p>
</div>

iOS のクラッシュとエラー追跡を有効にすると、リアルユーザーモニタリングで包括的なクラッシュレポートとエラートレンドを取得できます。この機能により、以下にアクセスが可能になります。

 - 集計済みの iOS クラッシュダッシュボードおよび属性
 - シンボル化された iOS クラッシュレポート
 - iOS エラー追跡とトレンド分析

## セットアップ

### クラッシュレポートの追加

まだ SDK をインストールしていない場合は、[アプリ内セットアップ手順][1]に従うか、[iOS RUM セットアップドキュメント][2]を参照してください。

プロジェクトに `DatadogCrashReporting` 依存関係を追加します。CocoaPods の場合は `pod 'DatadogSDKCrashReporting'` を使用します。SPM および Carthage の場合は、`dd-sdk-ios` と `DatadogCrashReporting` を使用できます。

| パッケージマネージャー            | インストール方法                                                                         |
|----------------------------|-------------------------------------------------------|
| CocoaPods                  | `pod 'DatadogSDKCrashReporting'` を使用                      |
| Swift Package Manager      | `DatadogCrashReporting` モジュールをリンク                   |
| Carthage                   | `DatadogCrashReporting.xcframework` を使用               |


初期化スニペットを更新してクラッシュレポートを含めます。

```
import DatadogCrashReporting

Datadog.initialize(
    appContext: .init(),
    trackingConsent: .granted,
    configuration: Datadog.Configuration
    .builderUsing(
        rumApplicationID: "<rum_application_id>",
        clientToken: "<client_token>",
        environment: "<environment_name>"
    )
    .trackUIKitActions()
    .trackUIKitRUMViews()
    .enableCrashReporting(using: DDCrashReportingPlugin())
    .build()
)
Global.rum = RUMMonitor.initialize()
```

### Datadog CI を使用してレポートをシンボル化

iOS エラーが難読化されている場合は、[@datadog/datadog-ci][5] を使用して dSYM をアップロードし、さまざまなスタックトレースをシンボル化します。特定のエラーについて、ファイルパス、行番号、および関連するスタックトレースの各フレームのコードスニペットにアクセスできます。

```sh
export DATADOG_API_KEY="<API KEY>"

// dSYMs を含む zip ファイルがある場合 
npx @datadog/datadog-ci dsyms upload appDsyms.zip

// dSYMs を含むフォルダがある場合
npx @datadog/datadog-ci dsyms upload /path/to/appDsyms/
```

**注**: EU エンドポイントを使用するツールを構成するには、`DATADOG_SITE` 環境変数を `datadoghq.eu` に設定します。インテークエンドポイントに完全な URL を上書きするには、`DATADOG_DSYM_INTAKE_URL` 環境変数を定義します。

アプリケーションで Bitcode が有効になっている場合は、[App Store Connect][7] でアプリの dSYM ファイルをダウンロードします。詳しくは、[dSYMs コマンド][8]をご参照ください。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ja/real_user_monitoring/ios
[3]: https://github.com/DataDog/dd-sdk-ios/releases
[4]: https://github.com/DataDog/datadog-ci
[5]: https://www.npmjs.com/package/@datadog/datadog-ci
[6]: https://www.npmjs.com/package/npx
[7]: https://appstoreconnect.apple.com/
[8]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/dsyms/README.md