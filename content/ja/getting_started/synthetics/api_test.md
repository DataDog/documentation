---
title: API テストの概要
kind: documentation
further_reading:
  - link: 'https://learn.datadoghq.com/course/view.php?id=39'
    tag: ラーニングセンター
    text: Synthetic テストの紹介
  - link: /synthetics/api_tests
    tag: ドキュメント
    text: API テストについて
  - link: /getting_started/synthetics/private_location
    tag: ドキュメント
    text: プライベートロケーションの詳細
  - link: /synthetics/ci
    tag: Documentation
    text: CI/CD パイプラインから Synthetic テストをトリガーする方法を学ぶ
  - link: /synthetics/identify_synthetics_bots
    tag: ドキュメント
    text: API テスト用の Synthetic ボットを特定する方法を学ぶ
  - link: '/api/v1/synthetics/#create-a-test'
    tag: API ドキュメント
    text: Synthetic テストをプログラムで作成
---
## 単一の API テストを作成する

[API テスト][1]は、いつでもどこからでも最も重要なサービスが利用可能であることを**プロアクティブに監視**します。API テストには、システムの**さまざまなネットワークレイヤー**でリクエストを起動できる 5 つの異なるサブタイプがあります。

以下の例は、[API テスト][1]のサブタイプである [HTTP テスト][2]の作成を示しています。[HTTP テスト][1]を作成すると、**API エンドポイントを監視** して、失敗や遅延が起きた場合に**アラートを受け取る**ことができます。このチェックによって、アプリケーションがリクエストに応答していることや、予想される**応答時間**、**HTTP ステータスコード**、**ヘッダー**、**本文の内容**などの定義された条件をすべて満たしていることを検証できます。

### リクエストを定義する

1. Datadog アプリケーションで、左側のメニューにある **[UX Monitoring][3]** にカーソルを合わせ、**[Synthetic Tests][3]** を選択します。
2. 右上の **New Test** ボタンをクリックします。
3. **[New API test][4]** を選択します。
4. `HTTP` リクエストタイプを選択します。
5. リクエストを定義します。

    - 監視するエンドポイントの URL を追加します。何から始めればよいかわからない場合は、テストウェブアプリケーションである `https://www.shopist.io/` を使用できます。テストするエンドポイントを定義すると、テストの名前が `Test on www.shopist.io` に自動的に入力されます。必要に応じて、テスト名を別の名前に変更できます。
    - カスタムリクエストヘッダー、認証資格情報、本文コンテンツ、cookie を使用するには、**Advanced Options** を選択します。
    - テストでは、`env:prod` や `app:shopist` などのタグを設定できます。タグを使用すると、テストスイートを整理し、ホームページで興味のあるテストをすばやく見つけることができます。
    - API 呼び出しの任意の資格情報に安全な[グローバル変数][5]を使用できます。[ローカル変数][6]を作成して、動的に定義されたタイムスタンプをリクエストペイロードに挿入することもできます。これらの変数を作成した後、`{{` と入力し、変数を選択して、テストオプションに変数を挿入します。

6. **Test URL** をクリックして、サンプルのテスト実行をトリガーします。

{{< img src="getting_started/synthetics/api-test-config-3.png" alt="API テストコンフィギュレーション"  style="width:100%;">}}

### アサーションを定義する

**Test URL** をクリックすると、エンドポイントの応答に関する基本的なアサーションが自動的に入力されます。アサーションは、成功したテスト実行が何であるかを定義します。

この例では、サンプルのテスト実行をトリガーした後、3 つのデフォルトのアサーションが設定されます。

{{< img src="getting_started/synthetics/assertions-example-2.png" alt="デフォルトアサーション"  style="width:100%;">}}

アサーションは完全にカスタマイズ可能です。カスタムアサーションを追加するには、応答プレビューの要素をクリックするか、**New Assertion** をクリックします。

{{< img src="getting_started/synthetics/api-test-configuration-2.mp4" alt="API テストのコンフィギュレーション例"  video="true"  >}}

**注**: アサーションで[グローバル][7]変数と[ローカル][8]変数を活用することもできます。

### ロケーションを選択する

テストを実行する 1 つ以上の **Managed Locations** または **Private Locations** を選択します。

管理ロケーションでは、公開されている Web サイトとエンドポイントをテストすることができます。内部アプリケーションをテストしたり、個別の地理的領域でユーザーの行動をシミュレートしたりするには、代わりに **Private Locations** を 1 つ選択します。

プライベートロケーションの設定方法の詳細については、[プライベートロケーション入門][9]を参照してください。

### テストの頻度を指定する

テストを実行する頻度を選択します。

スケジュールに従って Synthetic テストを実行することに加えて、CI/CD パイプラインから手動または直接トリガーすることができます。詳細については、[Synthetic CI/CD テスト][10]を参照してください。


### アラート条件を定義する

アラート条件を定義して、散発的なネットワークブリップなどのテストがトリガーされないようにすることができます。これにより、エンドポイントに実際の問題が発生した場合にのみアラートが送信されます。

ロケーションが失敗したと見なす前に発生する必要がある連続した失敗の数を指定できます。

```text
Retry test 2 times after 300 ms in case of failure
```

エンドポイントが特定の時間とロケーションの数だけダウンしたときにのみ通知をトリガーするようにテストを構成することもできます。次の例では、2 つの異なるロケーションでテストが 3 分間失敗した場合に、アラートルールが通知を送信するように設定されています。

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

### チームへの通知

**Monitor Name** フィールドにアラート名を追加し、アラートのメッセージを書き込みます。Slack、PagerDuty、Microsoft Teams、Webhook などの[インテグレーション][11]を使用して、アラートを特定のサービスやチームにルーティングできます。

アラートが解決されていない場合にアラート通知が再通知する時間を設定し、**P5 (Info)** から **P1 (Critical)** の範囲でアラートの優先度を定義できます。

テストを実行する準備ができたら、**Save Test** をクリックします。

## マルチステップ API テストを作成する

[マルチステップ API テスト][12]は、HTTP リクエストを順番に実行し、複雑なバックエンドシステムで [HTTP テスト][2]を構成できるようにします。

### テストを構成する

[マルチステップ API テスト][12]を作成すると、HTTP リクエストの順番を定義し、応答データから変数を作成して、後続のステップでそれらの値を再注入できます。

1. Datadog アプリケーションで、左側のメニューにある **[UX Monitoring][3]** にカーソルを合わせ、**[Synthetic Tests][3]** を選択します。
2. 右上の **New Test** ボタンをクリックします。
3. **[Multistep API test][5]** を選択します。
4. 単一の [API テスト][1]の場合と同じように、[マルチステップ API テスト][5]のロケーションに名前を付け、タグを付け、ロケーションを選択します。
5. **Define steps** で、**Create Your First Step** をクリックします。

    - ステップに名前を追加します。
    - クエリする URL を指定します。
    - カスタムリクエストヘッダー、認証資格情報、本文コンテンツ、cookie を追加するには、**Advanced Options** を選択します。
    - **Test URL** をクリックします。
    - オプションで、新しいアサーションを追加し、実行パラメーターを定義して、応答コンテンツから変数を抽出します。
    - 変数の名前を入力し、**Response Body** でパースされた値をクリックして、変数の値を設定します。
    - **Save Step** をクリックします。

6. **Add Another Step** をクリックして、別のステップを追加します。デフォルトで、最大 10 個のステップを作成できます。
7. オプションで、**URL** に `{{` と入力すると、抽出されたグローバル変数のリストが表示されます。
    - テストステップで注入する抽出変数を選択します。抽出した変数は、**Step URL**、または **Advanced Options** > **Request Options** のリクエストヘッダー、Cookie、HTTP 認証フィールドに追加できます。

8. テスト頻度、アラート条件、アラートメッセージなど、残りのテスト条件を構成します。

テストを作成する準備ができたら、**Save Test** をクリックします。

## テスト結果

API テストとマルチステップ API テストの詳細ページには、テストコンフィギュレーションの概要、ロケーションごとにテストされたエンドポイントに関連付けられたグローバル稼働時間、応答時間とネットワークタイミングに関するグラフ、およびテスト結果とイベントのリストが表示されます。

失敗したテストのトラブルシューティングを行うには、**Test Results** まで下にスクロールして、失敗したテスト結果をクリックします。失敗したアサーションと、ステータスコード、応答時間、関連するヘッダーと本文などの応答の詳細を確認して、問題を診断します。

{{< img src="getting_started/synthetics/api-test-failure-4.png" alt="API テストの失敗"  style="width:100%;">}}

Datadog の [APM と Synthetic モニタリングのインテグレーション][6]を使用して、**Traces** タブでテスト実行から生成されたトレースを確認して、失敗したテスト実行の根本原因にアクセスします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/api_tests/
[2]: /ja/synthetics/api_tests/http_tests
[3]: https://app.datadoghq.com/synthetics/list
[4]: https://app.datadoghq.com/synthetics/create
[5]: https://app.datadoghq.com/synthetics/multi-step/create
[6]: /ja/synthetics/apm/
[7]: /ja/synthetics/settings/#global-variables
[8]: /ja/synthetics/api_tests/http_tests#variables
[9]: /ja/getting_started/synthetics/private_location
[10]: /ja/synthetics/ci
[11]: /ja/integrations/#cat-notification
[12]: /ja/synthetics/multistep