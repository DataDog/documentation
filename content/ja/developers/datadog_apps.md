---
dependencies:
- https://github.com/DataDog/apps/blob/master/docs/en/getting-started.md
further_reading:
- link: https://github.com/DataDog/apps/blob/master/docs/en/ui-extensions-design-guidelines.md
  tag: Github
  text: デザインガイドライン
- link: https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md
  tag: Github
  text: プログラミングモデル

title: Datadog Apps
---
## ベータ版に参加しよう
Datadog アプリは現在ベータ版ですが、簡単にアクセスをリクエストすることができます。[このフォーム][5]を使用して、今すぐリクエストを送信してください。承認されると、ご自身や組織のため、または素晴らしい Datadog アプリが流通する Datadog コミュニティ全体に公開するために、創造的なアプリの開発を始めることができます。

## アプリとは？

Datadog アプリは、開発者がカスタムダッシュボードウィジェットを通じて Datadog のネイティブ機能を拡張できるようにするものです。例えば、Datadog がサポートしていないデータの可視化や、サードパーティのプラットフォームで実行する一般的な修復ワークフローがある場合、Datadog 内でこの機能を拡張するアプリを作成することができます。

## セットアップ

### ローカル開発環境の設定

1. Datadog アプリを作成します。
   ```
   yarn create @datadog/app
   ```

1. 作成したフォルダに移動します。
   ```
   cd starter-kit
   ```

1. 開発環境を設定します。
   ```
   yarn start
   ```

これにより、`http://localhost:3000/` 上のローカル開発サーバーが起動します。

以下のメッセージが表示されれば、アプリケーションは実行されています。

<img style="max-width:70%" alt="The application controller is running in the background" src="https://user-images.githubusercontent.com/228230/137548156-3c41407d-ee2f-423d-8a6e-8533115d462b.png">

2 つのページがあることに注意してください。
- `http://localhost:3000`: ウィジェット、メニュー、モーダルなどの様々な拡張機能を管理するメインコントローラーです。アプリの機能を充実させる際に、便利に使えるでしょう。
- `http://localhost:3000/widget`: ウィジェットやモーダルなど、専用の表示が必要なもの用のコンポーネントです。

このアーキテクチャの詳細については、[Developer Platform 開発者ガイド][3]を参照してください。

<div class="alert alert-info">
ブラウザでローカルウィジェットを直接操作すると、JavaScript コンソールでキャッチされない <strong>HandshakeTimeoutError</strong> が表示されることがあります。これは予想されることです。Datadog Apps SDK は、Datadog ユーザーインターフェイスに接続する iframe で実行するように<a href="https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md">設計</a>されており、SDK が通信する Datadog UI がない場合、ウィジェットと Datadog UI 間のハンドシェイク試行はタイムアウトします。
</div>

### アプリを Developer Platform に追加する

1. [**Integrations** > **Developer Platform**][4] に移動して、**+ New App** をクリックします。
   <img style="max-width:80%" alt="Add a new app to the developer platform" src="https://user-images.githubusercontent.com/228230/137548671-c0c64c2e-e3cd-494b-990c-8dc8a90d4800.png">

1. アプリケーションの一意の名前を入力します。

1. オプションで、新しいアプリケーションのダッシュボードが表示されたら、アプリ名を変更したり、アプリに詳細な説明を加えたり、アイコンを変更したりすることができます。
   <img style="max-width:80%" alt="Edit app information from the app dashboard" src="https://user-images.githubusercontent.com/17037651/163401812-d21a9d3a-e73f-49b0-bda4-e7c447295784.png">


### ダッシュボードにアプリを追加する

1. アプリをダッシュボードに追加する前に、**UI Extensions** をクリックして、アプリを有効にする必要があります。
   <img style="max-width:80%" alt="App Edit Enable UI Extensions" src="https://user-images.githubusercontent.com/17037651/163401958-153f6c80-d7ba-4b47-a40d-1cf08913602d.png">

   このビューがロードされたら、**Enable UI Extensions** ボタンをクリックします。

1. アプリのオプションがさらに表示されたら、実行中のウィジェットの `localhost` のバージョンに合わせて、**Root URL** と **Debug Mode Root URL** を変更します。メインコントローラーのパスは `/widget` です。これらの URL の値は、アプリケーションを構築し、独自のインフラストラクチャーでホストし始めると、変更されます。

1. トグルを **Dashboard Custom Widget** にします。これでアプリ用の JSON が生成されます。

   <img style="max-width:80%" alt="App Edit UI Extensions" src="https://user-images.githubusercontent.com/17037651/163402086-a3afbecd-c9c0-4608-bb91-6cb5391fec93.png">

   この例では、JSON 出力に `Your first widget` という値が含まれています。これは、ダッシュボードに追加するメニューに表示される、ウィジェットの名前です。

1. ダッシュボードに移動して、ウィジェットを追加します。

   <img style="max-width:80%" alt="Add widget to your Dashboard" src="https://user-images.githubusercontent.com/228230/137550297-3f98c5e0-0826-4109-b6e4-bf6dd1209aa2.png">


1. サイドバーの一番下に **Custom Widgets** というセクションがあります。リストでウィジェットを探し、ダッシュボードに追加します。

   <img style="max-width:80%" alt="Add your widget from the custom widgets section" src="https://user-images.githubusercontent.com/228230/137550380-7b9b222d-c848-4d17-9060-cd0345780a11.png">

1. 新しいウィジェットのプレビューが、いくつかのオプションとともに表示されます。下にスクロールし、**Done** をクリックして、ダッシュボードに追加します。

   <img style="max-width:80%" alt="Click Done to add your widget to the dashboard" src="https://user-images.githubusercontent.com/228230/137550741-669f69c6-4a9b-4253-afc4-be3257a1084e.png">

1. アプリケーションをビルドするには、ターミナルで `yarn build` を実行します。次に、静的に生成されたサイトを任意のホスティングプラットフォームに移動し、アプリの設定で URL を更新します。

### OAuth API アクセス

OAuth API Access を有効にすると、アプリを使用する前にユーザーの認証が必要になります。この機能により、既存の認証メカニズム (例えば、Cookie ベースのユーザー名とパスワードによるログイン) を Developer Platform と統合することができます。

### サンプルアプリケーション

- [スターターキット][1]
- [センチメント分析][2]

## その他の参考資料

- [Datadog Developer Platform について](https://docs.datadoghq.com/developers/authorization/oauth2_in_datadog/)
- [UI 拡張機能について](https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md#oauth-api-access)

[1]: https://github.com/DataDog/apps/tree/master/examples/starter-kit
[2]: https://github.com/DataDog/apps/tree/master/examples/sentiment
[3]: https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md
[4]: https://app.datadoghq.com/apps
[5]: https://dtdg.co/3E5iHd8
