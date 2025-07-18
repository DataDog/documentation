---
description: Roku チャンネルにエラー追跡を設定します。
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: エラー追跡
  text: エラー追跡を開始する
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: エクスプローラーでエラー追跡データを視覚化する
kind: documentation
title: Roku のクラッシュレポートとエラー追跡
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">RUM for Roku は、US1-FED Datadog サイトではご利用いただけません。</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-info">RUM for Roku はベータ版です。</div>
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

## エラーを Datadog に転送する

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
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/roku/#setup
[4]: https://github.com/DataDog/dd-sdk-roku
[5]: https://docs.datadoghq.com/ja/real_user_monitoring/android/advanced_configuration/?tabs=kotlin#initialization-parameters


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}