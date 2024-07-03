---
aliases:
- /ja/real_user_monitoring/error_tracking/roku
code_lang: roku
code_lang_weight: 50
description: Set up Error Tracking for your Roku channels.
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: ドキュメント
  text: Get started with Error Tracking
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: Visualize Error Tracking data in the Explorer
title: Roku Crash Reporting and Error Tracking
type: multi-code-lang
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">RUM for Roku は、US1-FED Datadog サイトではご利用いただけません。</div>
{{< /site-region >}}

## 概要

エラー追跡は、RUM Roku SDK から収集されたエラーを処理します。

Roku のクラッシュレポートとエラー追跡を有効にすると、リアルユーザーモニタリングで包括的なクラッシュレポートとエラートレンドを取得できます。この機能により、以下にアクセスが可能になります。

- 集計済みの Roku クラッシュダッシュボードおよび属性
- Roku エラー追跡とトレンド分析

クラッシュレポートは [**Error Tracking**][1] に表示されます。

## セットアップ

まだ Roku SDK をインストールしていない場合は、[アプリ内セットアップ手順][2]に従うか、[Roku RUM セットアップドキュメント][3]を参照してください。

1. [RUM Roku SDK][4] の最新バージョンを ROPM の依存関係に追加します (または zip アーカイブをダウンロードします)。
2. [SDK の初期化][5]の際に、アプリケーションの `env` を構成します。

任意のエラーについて、ファイルパス、行番号、関連するスタックトレースの各フレームのコードスニペットにアクセスすることができます。

## 制限

Crash reporting on Roku doesn't yet support stacktraces. 

## Test your implementation

To verify your Roku Crash Reporting and Error Tracking configuration, you need to trigger a crash in your RUM application and confirm that the error appears in Datadog.

To test your implementation:

1. Run your application on an Roku device.
2. Execute some code containing a crash. For example:

   ```brightscript
   sub explodingMethod()
       x = 1
       print x.foo
   ```

3. After the crash happens, restart your application and wait for the Roku SDK to upload the crash report in [**Error Tracking**][1].

### エラーを Datadog に転送する

例外を投げる可能性のある操作を行った場合、以下のコードスニペットを追加することで、Datadog にエラーを転送することができます。

```brightscript
    try
        doSomethingThatMightThrowAnException()
    catch error
        m.global.datadogRumAgent.callfunc("addError", error)
    end try
```

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/mobile_and_tv_monitoring/setup/roku/
[4]: https://github.com/DataDog/dd-sdk-roku
[5]: https://docs.datadoghq.com/ja/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/?tabs=kotlin#initialization-parameters


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}