---
description: Learn how to monitor desktop applications built with Electron through
  the browser RUM SDK.
further_reading:
- link: /real_user_monitoring/
  tag: Documentation
  text: Learn about Real User Monitoring
title: Monitor Electron Applications Using the Browser SDK
---

## 概要

[Electron][1] は、クロスプラットフォームの macOS および Windows デスクトップアプリケーションを構築するために使用できるオープンソースのフレームワークです。

Datadog ブラウザ SDK をインストールして構成すると、Electron を使用して構築されたアプリケーションの監視を開始できます。

**注**: ブラウザ SDK は、アプリケーションの*レンダラープロセス*の監視のみをサポートします。*メインプロセス*にインストールされたものを初期化したり監視したりすることはありません。詳細は、Electron の[レンダラープロセス][3]のドキュメントを参照してください。

{{< img src="real_user_monitoring/guide/monitor-electron-applications-using-browser-sdk/diagram_electron-js-browser-rum.png" alt="Datadog ブラウザ SDK は、Electron アプリケーションのレンダラープロセスの監視のみをサポートしています" style="width:100%" >}}

## インストール

Electron アプリをサポートするために Datadog ブラウザ SDK をインストールするには

1. CDN 同期、CDN 非同期、または npm の手順に従って、**すべてのレンダラープロセス**内に [RUM ブラウザモニタリング][2]をセットアップしてインストールします。

2. 以下のように、各レンダラープロセスの RUM 初期化構成で、`allowFallbackToLocalStorage` パラメーターを `true` に設定します。

   **注**: この設定により、Datadog はブラウザのクッキーに依存せずに RUM データを収集することができます。

   - **インターネット上で利用可能な**ページをターゲットにしている場合 (`https://` プロトコルを使用)、このパラメーターは**必要ありません**。
   - **アプリケーション内に**ページを埋め込む場合 (`file://`プロトコルを使用)、クッキーが利用できないため、Datadog はローカルストレージにセッションを保管する必要があります。

   ```javascript
   datadogRum.init({
     applicationId: '<DATADOG_APPLICATION_ID>',
     clientToken: '<DATADOG_CLIENT_TOKEN>',
     site: '<DATADOG_SITE>',
     ...
     allowFallbackToLocalStorage: true
     });
   ```

3. SDK を正しく構成すると、データは [RUM エクスプローラー][4]に入力されます。

## トラブルシューティング

### ハイブリッド Electron アプリケーションのサポート
同一生成元ポリシーはローカル (`file://`) とリモート (`http(s)://`) の両方からページが読み込まれる同じセッションのアプリケーションの追跡を防ぎます。

つまり、Electron を使用してランディングページを埋め込み、後でユーザーをインターネット上にホストされている Web サイトにリダイレクトするアプリケーションでは、そのユーザーに対して 2 つのセッションが作成されることになります。1 つはアプリケーションの埋め込みローカルファイル (`file://`) のランディング部分用、もう 1 つはリモート部分 (インターネット上で利用可能な `https://` ファイル) 用です。

### 複数のウィンドウを同時に使用するインスタンスのための短時間セッション
ウィンドウ間のローカルストレージレプリケーションのレイテンシーに関する問題により、短時間のセッションが作成されることがあります (1 秒未満)。これを回避するには、複数のウィンドウが 10 ミリ秒以上の間隔を空けて作成され、初期化されるようにします。

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.electronjs.org/
[2]: /ja/real_user_monitoring/browser/setup
[3]: https://www.electronjs.org/docs/latest/tutorial/process-model#the-renderer-process
[4]: /ja/real_user_monitoring/explorer/