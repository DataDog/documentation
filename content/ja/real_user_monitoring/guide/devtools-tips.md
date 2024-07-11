---
further_reading:
- link: /real_user_monitoring/browser
  tag: ドキュメント
  text: RUM ブラウザモニタリング
- link: /logs/log_collection/javascript
  tag: ドキュメント
  text: ブラウザログ収集
title: ブラウザ開発ツール使用時の注意点
---

## 概要

このガイドでは、最新のブラウザに含まれているブラウザ開発ツール (DevTools) を使用して、Datadog ブラウザ SDK でインストルメントされたアプリケーションをデバッグする際のヒントをいくつか紹介します。

## DevTools コンソールで、ファイル番号と行番号が一致していることを確認する

ブラウザ SDK は、アプリケーションの動作に関するデータを収集するために、コンソール関数 (`console.error` だけでなく、`.log`、`.info`、`.warn` も) をインスツルメントします。
これは、以下に示すように、DevTool コンソールが不正な行番号とファイルを表示することにつながるかもしれません。
{{< img src="real_user_monitoring/guide/devtools-tips/issue_console.png" alt="DevTools コンソールで、console.error ステートメントのファイル番号と行番号が正しくないという問題が発生する。">}}

上の図では、`console.error` 関数がインスツルメンテーションされています。このステートメントが呼び出された実際のファイルと行番号、`VM505:1` の代わりに、コンソールに `datadog-rum.js:1` と表示されていることに注意してください。

### ブラウザの無視リストにスクリプトを追加して、正しいファイル番号と行番号を表示させる

ほとんどのブラウザでは、開発者がスクリプトを選択し、無視リストに追加することができます。正しいファイル番号と行番号を表示するために、スクリプト `datadog-rum*.js` と `datadog-logs*.js` をブラウザの無視リストに追加することができます。

以下は、Google Chrome でこの機能がある場所の例です。
{{< img src="real_user_monitoring/guide/devtools-tips/script_ignore_list.png" alt="Google Chrome でスクリプトを無視リストに追加する方法。">}}

コンソールタブで、コンソールステートメントからの出力を展開します。無視したい各スクリプトの上で右クリックし、オプション **add script to ignore list** を選択します。
**注**: 無視リストは、**Developer Tools > Settings > Ignore List** で管理することができます。

この方法は、[CDN (sync/async) インストール方法][3]を使用する場合に有効です。NPM パッケージ方法を使用している場合、`sourcemaps` が有効になっていることを確認してください。さもなければ、SDK コードがアプリケーションコードにバンドルされ、DevTools が SDK を無視するのを妨げるかもしれません。

無視リストを使用するもう一つの利点は、ネットワークパネルで見ることができます。
{{< img src="real_user_monitoring/guide/devtools-tips/network_initiator.png" alt="無視リストにスクリプトを追加した後、ネットワークイニシエーターが正しく表示される。">}}

ブラウザ SDK をリクエストのイニシエーターとして表示する代わりに、アプリケーションの正しいファイルおよび行番号を表示します。

## ネットワークタブのノイズを除去する

ブラウザ SDK は、アプリケーションの動作を記録するために、複数のネットワークリクエストを送信します。このため、ネットワークタブにかなりの数の行が生成され、アプリケーションによって開始されたリクエストを識別することが困難になります。ほとんどのブラウザでは、ブラウザ SDK から送られてくるリクエストをフィルターにかけることができます。

以下は、Google Chrome におけるこの機能の例です。
{{< img src="real_user_monitoring/guide/devtools-tips/network_ignore_intake.png" alt="ブラウザ SDK のリクエストをフィルタリングするネットワークパネル。">}}

ネットワークタブで、`-url:intake-datadoghq.com` という形式のフィルターを追加します (パターンを更新して、[データセンターのインテーク][1]の url、または[プロキシ][2]の url と一致するようにします)。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/site
[2]: /ja/real_user_monitoring/guide/proxy-rum-data
[3]: /ja/real_user_monitoring/browser/#choose-the-right-installation-method