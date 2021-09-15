---
title: ブラウザエラーの追跡
kind: documentation
further_reading:
  - link: /real_user_monitoring/error_tracking/explorer
    tag: ドキュメント
    text: Error Tracking Explorer
  - link: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps
    tag: ドキュメント
    text: Datadog CLI の公式リポジトリ
  - link: /real_user_monitoring/guide/upload-javascript-source-maps
    tag: ガイド
    text: JavaScript ソースマップのアップロード
  - link: https://app.datadoghq.com/error-tracking
    tag: UI
    text: エラー追跡
---
Error Tracking は、RUM SDK によってブラウザから収集されたエラーを処理します。スタックトレースを含む[ソース][1]または[カスタム][2]エラーが収集されるたびに、Error Tracking がそれを処理し、問題 (同様のエラーのグループ) にグループ化します。Error Tracking は以下の方法で簡単に開始できます:

1. [RUM Browser SDK][3] の最新バージョンをダウンロードします。
2. [SDK の初期化時][4]に、__version__、__env__、__service__ を構成します。
3. [ガイドに従って][5] JavaScript ソースマップをアップロードし、非縮小スタックトレースを取得します。

## ソースコードにエラーをリンクする

ソースマップの送信に加えて、新バージョンの [Datadog CLI][6] はコミットハッシュ、レポジトリ URL、コードレポジトリで追跡されたファイルパスのリストといった Git 上の情報を報告します。この情報を使用して Error Tracking と RUM がエラーをソースコードと関連付けるため、あらゆるスタックトレースから [GitHub][7]、[GitLab][8]、および [Bitbucket][9] のコード内の関連する行を開くことができます。

{{< img src="real_user_monitoring/error_tracking/link_to_git_js_example.gif" alt="スタックフレームからソースコードへのリンク"  >}}

<div class="alert alert-info">スタックフレームからソースコードへのリンクは <a href="https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command">Datadog CLI</a> のバージョン <code>0.12.0</code>以降でサポートされています。</div>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/data_collected/?tab=error#source-errors
[2]: /ja/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[3]: https://www.npmjs.com/package/@datadog/browser-rum
[4]: /ja/real_user_monitoring/browser/#initialization-parameters
[5]: /ja/real_user_monitoring/guide/upload-javascript-source-maps
[6]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command
[7]: https://github.com
[8]: https://about.gitlab.com
[9]: https://bitbucket.org/product