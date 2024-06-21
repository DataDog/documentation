---
title: Confluence アプリを使用した Cloudcraft 図の埋め込み
---

この記事では、Cloudcraft の Confluence アプリを使用して、現在の Cloudcraft 図を Confluence ページにシームレスに統合するプロセスについて説明します。

このプロセスにより、個々の Cloudcraft サブスクリプションを必要とせずに認可ユーザーに図へのアクセスを許可し、同時にインフラストラクチャーのドキュメントを一元化して最新版に保つことができます。

## アプリのインストール

Cloudcraft の Confluence アプリケーションをインストールするには、管理者として Confluence にログインし、[Cloudcraft マーケットプレイスのリスト][1]に移動して、**Get it now** をクリックします。

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/marketplace-listing.png" alt="Atlassian Marketplace 上の Cloudcraft のアプリ。" responsive="true" style="width:100%;">}}

## アプリの使用

Confluence ページを開いた状態で **/cloudcraft** と入力し、表示されるアプリケーションコマンドをクリックします。

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/embed-command.png" alt="Confluence ドキュメントに図を埋め込むための Cloudcraft インテグレーションツール。" responsive="true" style="width:100%;" >}}

次に、**Sign in** をクリックして Cloudcraft アカウントにログインします。

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/signin-or-signup.png" alt="Datadog、Google、またはメールアドレスでサインインするオプションがある、Confluence インテグレーション用の Cloudcraft ログインページ。" responsive="true" style="width:100%;">}}

ログインすると、図ピッカーが表示されます。リストから埋め込みたい図を選択します。

<div class="alert alert-info">図ピッカーでは、図の検索、フィルタリング、並べ替えもできます。</div>

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/blueprint-picker.png" alt="ステージング環境と本番環境のラベル付き図を用いて、クラウドアーキテクチャの設計図を Confluence ページに挿入するためのオプションを表示している Cloudcraft Confluence アプリ。" responsive="true" style=“width:100%;">}}

図を選択すると、埋め込み図のプレビューが Confluence ページに表示されます。この時点で、ウィンドウサイズメニューから図の幅を変更したり、鉛筆アイコンをクリックして図ピッカーを再度開いたりすることもできます。

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/window-size-menu.png" alt=“EC2 インスタンス、ロードバランサー、RDS データベースを Confluence ページに埋め込んだ Cloudcraft のクラウドインフラストラクチャーレイアウトのアイソメトリックビュー。" responsive="true" style="width:100%;">}}

Confluence ページを公開またはプレビューすると、Cloudcraft の図がページに完全に埋め込まれます。

埋め込まれた図は Confluence ユーザーアカウントによってのみ閲覧可能で、Confluence ページの公開 URL にアクセスしても表示されません。

[1]: https://marketplace.atlassian.com/apps/1233281/cloudcraft-aws-and-azure-cloud-diagrams-for-confluence?hosting=cloud&tab=overview