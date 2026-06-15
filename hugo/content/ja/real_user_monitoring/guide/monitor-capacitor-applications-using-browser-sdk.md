---
description: ブラウザ RUM SDK を使用して Capacitor で構築されたクロスプラットフォームアプリケーションを監視する方法をご紹介します。
further_reading:
- link: /real_user_monitoring/
  tag: ドキュメント
  text: リアルユーザーモニタリングについて
title: Browser SDK を使用した Capacitor アプリケーションの監視
---

## 概要

[Capacitor][1] は、JavaScript、HTML、CSS を使って、iOS と Android でネイティブに動作し、さらにプログレッシブ Web アプリケーションとしても実行できる Web Native アプリケーションを構築するためのオープンソースのネイティブランタイムです。

Datadog Browser SDK をインストールして構成を行うと、Capacitor で構築したアプリケーションの監視を開始できます。この構成により、アプリケーションの JavaScript の部分を可視化できます (ネイティブアプリケーションは可視化されません)。

**注**: **iOS** ターゲットを実行するために Capacitor によってラップされたアプリケーションは、ローカルアセットを配信するためのデフォルトのスキームとして `capacitor://` を使用します。

## インストール

Capacitor アプリをサポートするために Datadog Browser SDK をインストールするには

1. CDN 同期、CDN 非同期、または npm の手順に従って、[RUM Browser Monitoring][3] をセットアップしてインストールします。
2. RUM の初期化設定で、`sessionPersistence` パラメーターを `"local-storage"` に設定します。

   **注**: この設定により、Datadog はブラウザのクッキーに依存せずに RUM データを収集することができます。

   ```javascript
   datadogRum.init({
     applicationId: '<DATADOG_APPLICATION_ID>',
     clientToken: '<DATADOG_CLIENT_TOKEN>',
     site: '<DATADOG_SITE>',
     ...
     sessionPersistence: "local-storage"
   });
   ```

3. SDK を正しく構成すると、データが [RUM Explorer][3] に表示されます。

## トラブルシューティング

### アプリケーションの JavaScript 部分のみ可視化され、ネイティブ部分は可視化されません。

この動作は想定どおりです。Capacitor アプリケーションのネイティブ部分は、プラグインの使用であれカスタムコードであれ、監視されません。通常、プラグインはアプリケーションの JavaScript 側から追跡可能なレスポンスステータスを転送します。ただし、プラグインがクラッシュしたり、ネイティブコードの問題でアプリケーション全体がクラッシュした場合は、Datadog に報告されません。

### ローカルとリモートの両方のアセットを対象とするハイブリッドな Capacitor アプリケーションを追跡できないのはなぜですか？

同一オリジンポリシーにより、ローカル (`capacitor://`) とリモート (`http(s)://`) の両方からページを読み込むアプリケーションに対して、同一のセッションを使用した追跡はできません。

これは、ランディングページを埋め込み、その後インターネット上でホストされている Web サイトにユーザーをリダイレクトするために Capacitor を使用しているアプリケーションでは、そのユーザーに対して次の **2 つ**のセッションが作成されることを意味します。

- アプリケーションの (埋め込み) ランディングページ部分用のセッション
- アプリケーションのリモート部分用のセッション

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://capacitorjs.com/
[2]: /ja/real_user_monitoring/browser/setup/
[3]: /ja/real_user_monitoring/explorer/