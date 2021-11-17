---
title: トラブルシューティング
kind: documentation
further_reading:
  - link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
    tag: ブログ
    text: リアルユーザーモニタリング
  - link: /real_user_monitoring/faq/content_security_policy/
    tag: Documentation
    text: コンテンツセキュリティポリシー
---
Datadog Browser RUM で予期しない動作が発生した場合に問題は、このガイドを使うと迅速に解決することができます。問題が解決しない場合は、[Datadog サポート][1]にお問い合わせください。各リリースには改善と修正が含まれているため、[RUM Browser SDK][2] は定期的に最新バージョンに更新してください。

## データがない

RUM データが表示されない場合、または一部のユーザーのデータが欠落している場合

| 一般的な原因                                                                                               | 推奨される修正                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 広告ブロッカーが、Browser RUM SDK のダウンロードや Datadog へのデータ送信を妨害している。     | 一部の広告ブロッカーの制限は、パフォーマンスおよびマーケティング追跡ツールにまで及びます。ドキュメント [npm を使用して Browser RUM SDK をインストールする][3]と[収集したデータをプロキシ経由で転送する][4]を参照してください。 |
| ネットワークルールまたは VPN が、Browser RUM SDK のダウンロードや Datadog へのデータ送信を妨害している。 | SDK のダウンロードまたはデータの送信に必要なエンドポイントへのアクセスを許可します。エンドポイントのリストは、[コンテンツセキュリティポリシーのドキュメント][5]にあります。                                        |
| Browser RUM SDK の前に初期化されたスクリプト、パッケージ、クライアントは、ログ、リソース、ユーザーアクションの欠落につながる可能性があります。たとえば、Browser RUM SDK の前に ApolloClient を初期化すると、`graphql` リクエストが RUM エクスプローラーに XHR リソースとして記録されない場合があります。 | Browser RUM SDK が初期化される場所を確認し、アプリケーションコードの実行の早い段階にこのステップを移動することを検討してください。                                             |   

[コンテンツセキュリティポリシーのガイドライン][6]を読み、ウェブサイトが Browser RUM SDK CDN とインテークエンドポイントへのアクセスを許可していることを確認します。

### Browser RUM SDK の初期化

ブラウザコンソールで `window.DD_RUM.getInternalContext()` を実行して Browser RUM SDK が初期化されているかどうかを確認し、`application_id`、`session_id`、およびビューオブジェクトが返されることを確認します。

{{< img src="real_user_monitoring/browser/troubleshooting/success_rum_internal_context.png" alt="内部コンテキストの取得コマンドの成功">}}

SDK がインストールされていない場合、または SDK が正常に初期化されていない場合は、次のような `ReferenceError: DD_RUM is not defined` エラーが表示される場合があります。

{{< img src="real_user_monitoring/browser/troubleshooting/error_rum_internal_context.png" alt="内部コンテキストの取得コマンドのエラー">}}

Browser RUM SDK のロードに関連するエラーに気付いた場合は、ブラウザー開発ツールのコンソールまたはネットワークタブを確認することもできます。

### Datadog インテークへのデータ

Browser RUM SDK は、データのバッチを Datadog インテークに定期的に送信します。データが送信中の場合は、ブラウザ開発ツールの Network セクションに、`/v1/input` (URL の起点部分は RUM のコンフィギュレーションによって異なる場合があります) を対象とするネットワークリクエストが表示されます。

{{< img src="real_user_monitoring/browser/troubleshooting/network_intake.png" alt="Datadog インテークに対する RUM リクエスト">}}

## RUM クッキー

Browser RUM SDK は、クッキーに依存してセッション情報を保存し、さまざまなページで[ユーザーセッション][6]を追跡します。クッキーはファーストパーティであり (ドメインに設定されています)、クロスサイト追跡には使用されません。Browser RUM SDK によって設定されるクッキーは次のとおりです。

| クッキー名        | 詳細                                                                                                                                                                                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_dd_s`             | 複数のページにわたる一意のユーザーセッションから生成されたすべてのイベントをグループ化するために使用されるクッキー。これには、現在のセッション ID、サンプリングのためにセッションが除外されているかどうか、およびセッションの有効期限が含まれます。クッキーは、ユーザーが Web サイトを操作するたびに、最大ユーザーセッション期間 (4 時間) を上限にさらに 15 分間延長されます。|
| `dd_site_test_*`   | クッキーのサポートをテストするために使用される一時的なクッキー。すぐに期限切れになります。                                                                                                                                                                                                                                     |
| `dd_cookie_test_*` | クッキーのサポートをテストするために使用される一時的なクッキー。すぐに期限切れになります。                                                                                                                                                                                                                                     |

**注**: 過去に使用されたクッキーは、`_dd_l`、`_dd_r`、`_dd` です。その後、SDK の最近のバージョンでこれらは `_dd_s` に置き換えられ、同じ目的を持っていました。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help
[2]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md
[3]: /ja/real_user_monitoring/browser/#npm
[4]: /ja/real_user_monitoring/faq/proxy_rum_data/?tab=npm
[5]: /ja/real_user_monitoring/faq/content_security_policy/
[6]: /ja/real_user_monitoring/browser/data_collected/?tab=session