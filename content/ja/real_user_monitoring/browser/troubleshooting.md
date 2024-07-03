---
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Real User Monitoring
- link: /integrations/content_security_policy_logs/
  tag: Documentation
  text: Content Security Policy
title: Troubleshooting
---

Datadog Browser RUM で予期しない動作が発生した場合に問題は、このガイドを使うと迅速に解決することができます。問題が解決しない場合は、[Datadog サポート][1]にお問い合わせください。各リリースには改善と修正が含まれているため、[RUM Browser SDK][2] は定期的に最新バージョンに更新してください。

## データがない

RUM データが表示されない場合、または一部のユーザーのデータが欠落している場合

| 一般的な原因                                                                                               | 推奨される修正                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 広告ブロッカーが、RUM ブラウザ SDK のダウンロードや Datadog へのデータ送信を妨害している。     | 一部の広告ブロッカーの制限は、パフォーマンスおよびマーケティング追跡ツールにまで及びます。ドキュメント [npm を使用して RUM ブラウザ SDK をインストールする][3]と[収集したデータをプロキシ経由で転送する][4]を参照してください。 |
| ネットワークルール、VPN、またはアンチウィルスソフトウェアが、RUM ブラウザ SDK のダウンロードや Datadog へのデータ送信を妨害している。 | RUM ブラウザ SDK のダウンロードまたはデータの送信に必要なエンドポイントへのアクセスを許可します。エンドポイントのリストは、[コンテンツセキュリティポリシーのドキュメント][5]にあります。                                        |
| RUM ブラウザ SDK の前に初期化されたスクリプト、パッケージ、クライアントは、ログ、リソース、ユーザーアクションの欠落につながる可能性があります。たとえば、RUM ブラウザ SDK の前に ApolloClient を初期化すると、`graphql` リクエストが RUM エクスプローラーに XHR リソースとして記録されない場合があります。 | RUM ブラウザ SDK が初期化される場所を確認し、アプリケーションコードの実行の早い段階にこのステップを移動することを検討してください。                                             |
| If you've set `trackViewsManually: true` and notice that no sessions are present, the application may have suddenly stopped sending RUM information even though there are no network errors. | Be sure to start an initial view once you've initialized RUM to prevent any data loss. See [Advanced Configuration][6] for more information.|

[コンテンツセキュリティポリシーのガイドライン][5]を読み、ウェブサイトが RUM ブラウザ SDK CDN とインテークエンドポイントへのアクセスを許可していることを確認します。

### RUM ブラウザ SDK を初期化します

ブラウザコンソールで `window.DD_RUM.getInternalContext()` を実行して RUM ブラウザ SDK が初期化されているかどうかを確認し、`application_id`、`session_id`、およびビューオブジェクトが返されることを確認します。

{{< img src="real_user_monitoring/browser/troubleshooting/success_rum_internal_context.png" alt="内部コンテキストの取得コマンドの成功">}}

RUM ブラウザ SDK がインストールされていない場合、または SDK が正常に初期化されていない場合は、次のような `ReferenceError: DD_RUM is not defined` エラーが表示される場合があります。

{{< img src="real_user_monitoring/browser/troubleshooting/error_rum_internal_context.png" alt="内部コンテキストの取得コマンドのエラー">}}

RUM ブラウザ SDK のロードに関連するエラーに気付いた場合は、ブラウザー開発ツールのコンソールまたはネットワークタブを確認することもできます。

**Note**: To ensure accurate results, set `sessionSampleRate` to 100. For more information, see [Configure Your Setup For Browser RUM and Browser RUM & Session Replay Sampling][9].

### Datadog インテークへのデータ


The RUM SDK sends batches of event data to Datadog's intake every time one of these conditions have been met:

- Every 30 seconds
- When 50 events have been reached
- When the payload is >16 kB
- On `visibility:hidden` or `beforeUnload`

If data is being sent, you should see network requests targeting `/v1/input` (the URL origin part may differ due to RUM configuration) in the Network section of your browser developer tools:

{{< img src="real_user_monitoring/browser/troubleshooting/network_intake.png" alt="Datadog インテークに対する RUM リクエスト">}}

## RUM クッキー

The RUM Browser SDK relies on cookies to store session information and follow a [user session][7] across different pages. The cookies are first-party (they are set on your domain) and are not used for cross-site tracking. Here are the cookies set by the RUM Browser SDK:

| クッキー名        | 詳細                                                                                                                                                                                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_dd_s`             | 複数のページにわたる一意のユーザーセッションから生成されたすべてのイベントをグループ化するために使用されるクッキー。これには、現在のセッション ID、サンプリングのためにセッションが除外されているかどうか、およびセッションの有効期限が含まれます。クッキーは、ユーザーが Web サイトを操作するたびに、最大ユーザーセッション期間 (4 時間) を上限にさらに 15 分間延長されます。|
| `dd_site_test_*`   | クッキーのサポートをテストするために使用される一時的なクッキー。すぐに期限切れになります。                                                                                                                                                                                                                                     |
| `dd_cookie_test_*` | クッキーのサポートをテストするために使用される一時的なクッキー。すぐに期限切れになります。                                                                                                                                                                                                                                     |

**注**: RUM ブラウザ SDK の最近のバージョンでは、`_dd_l`、`_dd_r`、`_dd` のクッキーは、`_dd_s` に置き換わっています。

## Session IDs, cookies and RUM applications

There is a one-to-one relation between a RUM session and the RUM application it belongs to. Therefore, the domain set for the `_dd_s` cookie is fully dedicated to the RUM application it is monitoring and cannot monitor any additional applications.

## 技術的な制限

RUM ブラウザ SDK から送信される各イベントは、以下の内容で構築されています。

- RUM グローバルコンテキスト
- イベントコンテキスト (ある場合)
- イベント固有の属性

例:

```javascript
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('global', {'foo': 'bar'})
window.DD_RUM && window.DD_RUM.addAction('hello', {'action': 'qux'})
```

サンプルコードでは、次のようなアクションイベントを作成しています。

```json
{
  "type": "action",
  "context": {
    "global": {
      "foo": "bar"
    },
    "action": "qux"
  },
  "action": {
    "id": "xxx",
    "target": {
      "name": "hello"
    },
    "type": "custom"
  },
  ...
}
```

イベントやリクエストが以下の制限を超えた場合、Datadog のインテークによって拒否されます。

| プロパティ                                 | 制限   |
| ---------------------------------------- | ------------ |
| 1 イベントあたりの最大属性数   | 256          |
| 1 イベントあたりの最大属性深度        | 20           |
| 最大イベントサイズ                       | 256 KB       |
| 最大インテークペイロードサイズ              | 5 MB         |

## "Customer data exceeds the recommended threshold" (顧客データが推奨されるしきい値を超えています) の警告

The RUM browser SDK allows you to set [global context][10], [user information][11] and [feature flags][12] which are then included with the collected events.

To minimize the user bandwidth impact, the RUM browser SDK throttles the data sent to the Datadog intake. However, sending large volumes of data can still impact the performance for users on slow internet connections.

For the best user experience, Datadog recommends keeping the size of the global context, user information, and feature flags below 3KiB. If the data exceeds this limit, a warning is displayed: `The data exceeds the recommended 3KiB threshold.`

Since v5.3.0, the RUM Browser SDK supports data compression via the `compressIntakeRequest` [initialization parameter][13]. When enabled, this recommended limit is extended from 3KiB to 16KiB.

## クロスオリジンリードブロッキング警告

Chromium ベースのブラウザで、RUM ブラウザ SDK が Datadog インテークにデータを送信すると、コンソールに CORB 警告 `Cross-Origin Read Blocking (CORB) blocked cross-origin response` が出力されます。

The warning is shown because the intake returns a non-empty JSON object. This behavior is a reported [Chromium issue][8]. It does not impact the RUM Browser SDK and can safely be ignored.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help
[2]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md
[3]: /ja/real_user_monitoring/browser/setup/#npm
[4]: /ja/real_user_monitoring/guide/proxy-rum-data/
[5]: /ja/integrations/content_security_policy_logs/#use-csp-with-real-user-monitoring-and-session-replay
[6]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names
[7]: /ja/real_user_monitoring/browser/data_collected/?tab=session
[8]: https://bugs.chromium.org/p/chromium/issues/detail?id=1255707
[9]: /ja/real_user_monitoring/guide/sampling-browser-plans/
[10]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#global-context
[11]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#user-session
[12]: /ja/real_user_monitoring/guide/setup-feature-flag-data-collection/?tab=browser
[13]: /ja/real_user_monitoring/browser/setup/#initialization-parameters