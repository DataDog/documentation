---
title: Datadog Apps
kind: documentation
further_reading:
  - link: "https://github.com/DataDog/apps/blob/master/docs/en/ui-extensions-design-guidelines.md"
    tag: Github
    text: デザインガイドライン
  - link: "https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md"
    tag: Github
    text: プログラミングモデル
---

## ベータ版に参加しよう 
Datadog アプリは現在ベータ版ですが、簡単にアクセスをリクエストすることができます。[このフォーム][5]を使用して、今すぐリクエストを送信してください。承認されると、ご自身や組織のため、または素晴らしい Datadog アプリが流通する Datadog コミュニティ全体に公開するために、創造的なアプリの開発を始めることができます。

## アプリとは？

Datadog アプリは、開発者がカスタムダッシュボードウィジェットを通じて Datadog のネイティブ機能を拡張できるようにするものです。例えば、Datadog がサポートしていないデータの可視化や、サードパーティのプラットフォームで実行する一般的な修復ワークフローがある場合、Datadog 内でこの機能を拡張するアプリを作成することができます。

## セットアップ

### アプリを作成する

1. Datadog アプリを作成します。

$ `yarn create @datadog/app`

2. 作成したフォルダに移動します。

$ `cd starter-kit`


3. 開発環境を設定します。

$ `yarn start`

これにより、http://localhost:3000/ 上のローカル開発サーバーが起動します。

<img style="max-width:80%" alt="Application has loaded" src="https://user-images.githubusercontent.com/228230/137548156-3c41407d-ee2f-423d-8a6e-8533115d462b.png">

このメッセージが表示されれば、アプリケーションは実行されています。

2 つのページがあることに注意してください。
`http://localhost:3000`: ウィジェット、メニュー、モーダルなどの様々な拡張機能を管理するメインコントローラーです。アプリの機能を充実させる際に、便利に使えるでしょう。

`http://localhost:3000/widget`: ウィジェットやモーダルなど、専用の表示が必要なもの用のコンポーネントです。

このアーキテクチャの詳細については、[Developer Platform 開発者ガイド][3]を参照してください。

4. Datadog 内の [Developer Platform][4] にアクセスし、右上の **+ New App** をクリックします。

<img style="max-width:80%" alt="New App" src="https://user-images.githubusercontent.com/228230/137548671-c0c64c2e-e3cd-494b-990c-8dc8a90d4800.png">

5. アプリケーションの名前を入力します。他のアプリケーションと区別できるように、明確な名前を選んでください。

6. すると、新しいアプリケーションのダッシュボードが表示されます。ここでさらにアプリ名を変更したり、アプリに詳細な説明を加えたり、アイコンを変更したりすることができます。

<img style="max-width:80%" alt="App Settings Dashboard" src="https://user-images.githubusercontent.com/228230/137548724-0487c169-9b65-4b31-bfa6-f8da3bbd2785.png">


### ダッシュボードにアプリを追加する

1. アプリをダッシュボードに追加する前に、左側の **UI Extensions** をクリックして、アプリを有効にする必要があります。

<img style="max-width:80%" alt="Enable UI Extensions" src="https://user-images.githubusercontent.com/228230/137548823-0ad7f1ae-512f-44a4-93ca-c2aa3c47b992.png">

このビューがロードされたら、**Enable UI Extensions** ボタンをクリックします。

2. すると、アプリのオプションがさらに表示されます。

実行中のウィジェットのローカルホスト版に合わせて、ルート URL とデバッグモードルート URL を変更することを確認します。メインコントローラーのパスは `/widget` です。これらの URL の値は、アプリケーションを構築し、独自のインフラストラクチャーでホストし始めると、変更されます。

3. ’Dashboard Custom Widget’
のトグルを ON にします。これで右側に JSON が生成されます。

<img style="max-width:80%" alt="Dashboard Custom Widget" src="https://user-images.githubusercontent.com/228230/137549275-f901e4c1-16ad-4c82-95f3-9ba7f346c9ba.png">


この JSON には、`Your first widget` という値が含まれていることに注意してください。これは、ダッシュボードに追加するメニューに表示される、ウィジェットの名前です。

4. ダッシュボードに移動して、ウィジェットを追加します。

<img style="max-width:80%" alt="Dashboard add widget" src="https://user-images.githubusercontent.com/228230/137550297-3f98c5e0-0826-4109-b6e4-bf6dd1209aa2.png">


5. サイドバーの一番下に **Custom Widgets** というセクションがあります。リストでウィジェットを探し、ダッシュボードに追加します。

<img style="max-width:80%" alt="Custom Widfget" src="https://user-images.githubusercontent.com/228230/137550380-7b9b222d-c848-4d17-9060-cd0345780a11.png">

6. 新しいウィジェットのプレビューが、いくつかのオプションとともに表示されます。モーダルで下にスクロールし、*Done* をクリックして、ダッシュボードに追加します。

<img style="max-width:80%" alt="New Application" src="https://user-images.githubusercontent.com/228230/137550741-669f69c6-4a9b-4253-afc4-be3257a1084e.png">

<img style="max-width:80%" alt="New Application 2" src="https://user-images.githubusercontent.com/228230/137550757-96bce01d-2ec4-4c0f-b045-e18b756e52df.png">



アプリケーションをビルドするには、ターミナルで `yarn build` を実行します。次に、静的に生成されたサイトを任意のホスティングに移動し、アプリの設定で URL を更新します。

### OAuth API アクセス

この機能を有効にすると、アプリを使用する前にユーザーの認証が必要になります。この機能により、既存の認証メカニズム (例えば、Cookie ベースのユーザー名/パスワードによるログイン) を Developer Platform と統合することができます。

### サンプルアプリケーション

[スターターキット][1]

[センチメント分析][2]


[1]: https://github.com/DataDog/apps/tree/master/examples/starter-kit
[2]: https://github.com/DataDog/apps/tree/master/examples/sentiment
[3]: https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md
[4]: https://app.datadoghq.com/apps
[5]: https://dtdg.co/3E5iHd8
