---
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: ブログ
  text: リアルユーザーモニタリング
- link: /real_user_monitoring/faq/content_security_policy/
  tag: Documentation
  text: コンテンツセキュリティポリシー
title: トラブルシューティング
---

Datadog Browser RUM で予期しない動作が発生した場合に問題は、このガイドを使うと迅速に解決することができます。問題が解決しない場合は、[Datadog サポート][1]にお問い合わせください。各リリースには改善と修正が含まれているため、[RUM Browser SDK][2] は定期的に最新バージョンに更新してください。

## データがない

RUM データが表示されない場合、または一部のユーザーのデータが欠落している場合

| 一般的な原因                                                                                               | 推奨される修正                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 広告ブロッカーが、RUM ブラウザ SDK のダウンロードや Datadog へのデータ送信を妨害している。     | 一部の広告ブロッカーの制限は、パフォーマンスおよびマーケティング追跡ツールにまで及びます。ドキュメント [npm を使用して RUM ブラウザ SDK をインストールする][3]と[収集したデータをプロキシ経由で転送する][4]を参照してください。 |
| ネットワークルール、VPN、またはアンチウィルスソフトウェアが、RUM ブラウザ SDK のダウンロードや Datadog へのデータ送信を妨害している。 | RUM ブラウザ SDK のダウンロードまたはデータの送信に必要なエンドポイントへのアクセスを許可します。エンドポイントのリストは、[コンテンツセキュリティポリシーのドキュメント][5]にあります。                                        |
| RUM ブラウザ SDK の前に初期化されたスクリプト、パッケージ、クライアントは、ログ、リソース、ユーザーアクションの欠落につながる可能性があります。たとえば、RUM ブラウザ SDK の前に ApolloClient を初期化すると、`graphql` リクエストが RUM エクスプローラーに XHR リソースとして記録されない場合があります。 | RUM ブラウザ SDK が初期化される場所を確認し、アプリケーションコードの実行の早い段階にこのステップを移動することを検討してください。                                             |

[コンテンツセキュリティポリシーのガイドライン][5]を読み、ウェブサイトが RUM ブラウザ SDK CDN とインテークエンドポイントへのアクセスを許可していることを確認します。

### RUM ブラウザ SDK を初期化します

ブラウザコンソールで `window.DD_RUM.getInternalContext()` を実行して RUM ブラウザ SDK が初期化されているかどうかを確認し、`application_id`、`session_id`、およびビューオブジェクトが返されることを確認します。

{{< img src="real_user_monitoring/browser/troubleshooting/success_rum_internal_context.png" alt="内部コンテキストの取得コマンドの成功">}}

RUM ブラウザ SDK がインストールされていない場合、または SDK が正常に初期化されていない場合は、次のような `ReferenceError: DD_RUM is not defined` エラーが表示される場合があります。

{{< img src="real_user_monitoring/browser/troubleshooting/error_rum_internal_context.png" alt="内部コンテキストの取得コマンドのエラー">}}

RUM ブラウザ SDK のロードに関連するエラーに気付いた場合は、ブラウザー開発ツールのコンソールまたはネットワークタブを確認することもできます。

**注**: 正確な結果を確実に得るために、`sessionSampleRate` を 100 に設定してください。詳しくは、[ブラウザ RUM および ブラウザ RUM & セッションリプレイのサンプリングのためのセットアップの構成][8]を参照してください。

### Datadog インテークへのデータ

RUM ブラウザ SDK は、データのバッチを Datadog インテークに定期的に送信します。データが送信中の場合は、ブラウザ開発ツールの Network セクションに、`/v1/input` (URL の起点部分は RUM のコンフィギュレーションによって異なる場合があります) を対象とするネットワークリクエストが表示されます。

{{< img src="real_user_monitoring/browser/troubleshooting/network_intake.png" alt="Datadog インテークに対する RUM リクエスト">}}

## RUM クッキー

RUM ブラウザ SDK は、クッキーに依存してセッション情報を保存し、さまざまなページで[ユーザーセッション][6]を追跡します。クッキーはファーストパーティであり (ドメインに設定されています)、クロスサイト追跡には使用されません。RUM ブラウザ SDK によって設定されるクッキーは次のとおりです。

| クッキー名        | 詳細                                                                                                                                                                                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_dd_s`             | 複数のページにわたる一意のユーザーセッションから生成されたすべてのイベントをグループ化するために使用されるクッキー。これには、現在のセッション ID、サンプリングのためにセッションが除外されているかどうか、およびセッションの有効期限が含まれます。クッキーは、ユーザーが Web サイトを操作するたびに、最大ユーザーセッション期間 (4 時間) を上限にさらに 15 分間延長されます。|
| `dd_site_test_*`   | クッキーのサポートをテストするために使用される一時的なクッキー。すぐに期限切れになります。                                                                                                                                                                                                                                     |
| `dd_cookie_test_*` | クッキーのサポートをテストするために使用される一時的なクッキー。すぐに期限切れになります。                                                                                                                                                                                                                                     |

**注**: RUM ブラウザ SDK の最近のバージョンでは、`_dd_l`、`_dd_r`、`_dd` のクッキーは、`_dd_s` に置き換わっています。

## 技術的な制限

RUM ブラウザ SDK から送信される各イベントは、以下の内容で構築されています。

- RUM グローバルコンテキスト
- イベントコンテキスト (ある場合)
- イベント固有の属性

例:

```javascript
window.DD_RUM && window.DD_RUM.addRumGlobalContext('global', {'foo': 'bar'})
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

## クロスオリジンリードブロッキング警告

Chromium ベースのブラウザで、RUM ブラウザ SDK が Datadog インテークにデータを送信すると、コンソールに CORB 警告 `Cross-Origin Read Blocking (CORB) blocked cross-origin response` が出力されます。

インテークが空でない JSON オブジェクトを返すため、警告が表示されます。この動作は、報告されている [Chromium の問題][7]です。RUM ブラウザ SDK に影響を与えるものではないので、無視して大丈夫です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help
[2]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md
[3]: /ja/real_user_monitoring/browser/#npm
[4]: /ja/real_user_monitoring/guide/proxy-rum-data/
[5]: /ja/real_user_monitoring/faq/content_security_policy/
[6]: /ja/real_user_monitoring/browser/data_collected/?tab=session
[7]: https://bugs.chromium.org/p/chromium/issues/detail?id=1255707
[8]: /ja/real_user_monitoring/guide/sampling-browser-plans/