---
further_reading:
- link: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps
  tag: GitHub
  text: datadog-ci ソースコード
- link: https://app.datadoghq.com/error-tracking
  tag: ドキュメント
  text: エラートラッキングについて
- link: /real_user_monitoring/error_tracking/explorer
  tag: ドキュメント
  text: エラートラッキングエクスプローラーについて
kind: documentation
title: ブラウザエラーの追跡
---

## 概要

エラートラッキングは、RUM ブラウザ SDK によってブラウザから収集されたエラーを処理します。スタックトレースを含む[ソース][1]または[カスタム][2]エラーが収集されるたびに、エラートラッキングはそれを処理し、問題、つまり同様のエラーのグループにグループ化します。

クラッシュレポートは [**Error Tracking**][3] に表示されます。

## セットアップ

まだブラウザ SDK をインストールしていない場合は、[アプリ内セットアップ手順][4]に従うか、[ブラウザ RUM セットアップドキュメント][5]を参照してください。

1. [RUM ブラウザ SDK][6] の最新バージョンをダウンロードします。
2. [SDK の初期化][7]の際に、アプリケーションの `version`、`env`、`service` を構成します。
3. [JavaScript のソースマップをアップロードする][8]と、非縮小スタックトレースにアクセスできます。

## ソースコードにエラーをリンクする

[Datadog CLI][9] では、ソースマップの送信に加えて、コミットハッシュ、リポジトリ URL、コードリポジトリ内の追跡ファイルパスのリストなどの Git 情報も報告されます。

エラートラッキングと RUM は、この情報を使ってエラーとソースコードを関連付けることができ、任意のスタックトレースフレームから [GitHub][10]、[GitLab][11]、[Bitbucket][12] のコードの関連行にピボットすることが可能です。

{{< img src="real_user_monitoring/error_tracking/link_to_git_js_example.mp4" alt="スタックフレームからソースコードへのリンク" video=true >}}

<div class="alert alert-info">スタックフレームからソースコードへのリンクは <a href="https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command">Datadog CLI</a> のバージョン <code>0.12.0</code>以降でサポートされています。</div>

詳細については、[Datadog ソースコードインテグレーション][13]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/data_collected/?tab=error#source-errors
[2]: /ja/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[3]: https://app.datadoghq.com/rum/error-tracking
[4]: https://app.datadoghq.com/rum/application/create
[5]: /ja/real_user_monitoring/browser/#setup
[6]: https://www.npmjs.com/package/@datadog/browser-rum
[7]: /ja/real_user_monitoring/browser/#initialization-parameters
[8]: /ja/real_user_monitoring/guide/upload-javascript-source-maps
[9]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command
[10]: https://github.com
[11]: https://about.gitlab.com
[12]: https://bitbucket.org/product
[13]: /ja/integrations/guide/source-code-integration/