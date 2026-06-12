---
aliases:
- /ja/real_user_monitoring/error_tracking/roku
code_lang: roku
code_lang_weight: 70
description: Roku チャンネルにエラー追跡を設定します。
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: ドキュメント
  text: エラー追跡を開始する
- link: /real_user_monitoring/error_tracking/explorer
  tag: ドキュメント
  text: エクスプローラーでエラー追跡データを視覚化する
site_support_id: roku_error_tracking
title: Roku のクラッシュレポートとエラー追跡
type: multi-code-lang
---

## 概要

Error Tracking は Roku SDK から収集したエラーを処理します。

Roku のクラッシュレポートとエラー追跡を有効にすると、リアルユーザーモニタリングで包括的なクラッシュレポートとエラートレンドを取得できます。この機能により、以下にアクセスが可能になります。

- 集計済みの Roku クラッシュダッシュボードおよび属性
- Roku エラー追跡とトレンド分析

クラッシュレポートは [**Error Tracking**][1] に表示されます。

## セットアップ

まだ Roku SDK を設定していない場合は、[アプリ内セットアップ手順][2] に従うか、[Roku セットアップドキュメント][3] を参照してください。

1. 最新バージョンの [Roku SDK][4] を ROPM の依存関係に追加するか、ZIP アーカイブをダウンロードしてください。
2. [SDK の初期化][5]の際に、アプリケーションの `env` を構成します。

任意のエラーについて、ファイルパス、行番号、関連するスタックトレースの各フレームのコードスニペットにアクセスすることができます。

## 制限

Roku の Crash Reporting ではスタック トレースはまだサポートされていません。

## 実装のテスト

Roku の Crash Reporting と Error Tracking の構成を検証するには、アプリケーションでクラッシュを発生させ、そのエラーが Datadog に表示されることを確認します。

実装をテストするには

1. Roku デバイスでアプリケーションを実行します。
2. クラッシュを含むコードを実行します。例:

   ```brightscript
   sub explodingMethod()
       x = 1
       print x.foo
   ```

3. クラッシュが発生したらアプリケーションを再起動し、Roku SDK が [**Error Tracking**][1] にクラッシュ レポートをアップロードするまで待ちます。

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
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/mobile_and_tv_monitoring/roku/setup/
[4]: https://github.com/DataDog/dd-sdk-roku
[5]: https://docs.datadoghq.com/ja/real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/?tabs=kotlin#initialization-parameters


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}