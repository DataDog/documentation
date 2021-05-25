---
title: API テストの概要
kind: documentation
further_reading:
  - link: /synthetics/api_tests
    tag: ドキュメント
    text: API テストについて
  - link: /synthetics/identify_synthetics_bots
    tag: ドキュメント
    text: API テスト用の Synthetic ボットを特定する方法を学ぶ
  - link: /synthetics/settings/
    tag: ドキュメント
    text: 高度な Synthetics モニタリング設定を構成する
  - link: '/api/v1/synthetics/#create-a-test'
    tag: API ドキュメント
    text: Synthetic テストをプログラムで作成
---
## API テストの作成

[API テスト][1]を作成すると、**API エンドポイントを監視して、失敗や遅延が起きた場合にアラートを受け取る**ことができます。このチェックによって、アプリケーションがリクエストに応答していることや、**応答時間**、**HTTP ステータスコード**、**ヘッダー**、**本文の内容**などの定義された条件をすべて満たしていることを検証できます。

以下の例では、Web サイトが常に稼働し、特定の時間内で応答を返していることを確認するための API テストを作成します。

### リクエストを構成する

1. Datadog アプリケーションで、左側のメニューにある **[UX Monitoring][3]** にカーソルを合わせ、**Synthetic Test** を選択します。
2. 右上の **New Test** ボタンをクリックします。
3. **API test** を選択します。
4. API テストのコンフィギュレーションを定義します。

    - 監視するエンドポイントの URL を追加します。追加する URL がない場合は、テスト用の Web アプリケーションである `https://www.shopist.io/` を使用してください。
    - カスタムリクエストヘッダー、認証資格情報、本文コンテンツ、cookie を使用するには、**Advanced Options** を選択します。
    - テストで `env:prod` や `app:shopist` のようなタグを設定できます。タグは整理をしたり、興味のあるテストをホームページで見つける場合などに役立ちます。
    - **管理された場所**から、テストを実行する場所を選択します。
    - **Test URL** ボタンをクリックします。

{{< img src="getting_started/synthetics/api-test-config.png" alt="API テストのコンフィギュレーション"  style="width:60%;">}}

#### アラート条件を定義する

テスト URL をクリックすると、エンドポイントの応答に基づく基本のアサーションが自動で入力されます。アサーションにアラート条件が定義され、カスタマイズすることができます。この例では、URL をテストする際に 3 つのデフォルトのアサーションが入力されます。

{{< img src="getting_started/synthetics/assertions-example.png" alt="ブラウザテストの失敗"  style="width:90%;">}}

これらのアサーションにアラート条件が定義され、カスタマイズすることができます。アサーションを追加するには、応答のプレビューを直接クリックします。あるいは、New Assertion ボタンをクリックして、アサーションを手動で追加することもできます（例: body に Shop.ist を含む）。

{{< img src="getting_started/synthetics/api-test-configuration.gif" alt="ブラウザテストの失敗"  style="width:90%;">}}

エンドポイントが 3 分間、2 つの異なる場所でダウンした場合にのみアラートを出すように条件を設定するには、次のようにオプションを指定します。

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

また、ある場所を失敗と見なすまでの再試行回数を決めることもできます。場所が失敗になると、ただちに再試行が実行されます。以下のオプションを使用してテストを構成できます。

```text
Retry x time before location is marked as failed
```

**注**: デフォルトでは、失敗したテストを再試行するまでに 300ms の待機時間があります。この時間は、[API][5] を使用して構成することができます。

アラート条件を設定した後、アラートのメッセージを作成し、アラート通知メールを受信するサービスとチームメンバーを指定して、**Save Test** をクリックします。また、アラート通知の受信に Slack、PagerDuty、webhooks などの[インテグレーション][6]を使用することもできます。

### テスト結果

API テスト詳細ページには、テストコンフィギュレーションの詳細、テストを実行したエンドポイントに関連するアップタイム、応答時間の履歴グラフ、ネットワークのタイミング、および個別のテスト結果とイベントのリストが含まれます。

失敗したテストのトラブルシューティングを行うには、Test Results セクションをスクロールして失敗したテストのいずれかをクリックします。失敗したアサーションと、返されたステータスコード、応答時間、関連するヘッダー、本文といった応答の詳細を確認して問題を診断します。

{{< img src="getting_started/synthetics/api-test-failure.png" alt="API テストの失敗"  style="width:90%;">}}

Datadog の [Synthetic モニタリングとの APM インテグレーション][7] を使用すると、失敗したテストランから生成されたトレースを見ることで、テストランが失敗した問題の根本原因を探ることができます。

{{< whatsnext desc="最初の API テストを設定したら、以下をご参照ください。">}}
    {{< nextlink href="/synthetics/api_tests" tag="Documentation" >}}API テストについてより詳しく学ぶ{{< /nextlink >}}
    {{< nextlink href="/synthetics/identify_synthetics_bots" tag="Documentation" >}}API テスト用の Synthetic ボットを特定する方法を学ぶ{{< /nextlink >}}
    {{< nextlink href="/synthetics/settings/" tag="Documentation" >}}高度な Synthetic モニタリング設定を構成する{{< /nextlink >}}
{{< nextlink href="/api/v1/synthetics/#create-a-test" tag="API Docs" >}}Synthetic テストをプログラムで作成する{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/synthetics/api_tests/
[2]: /ja/api/v1/synthetics/#create-or-clone-test
[3]: https://app.datadoghq.com/synthetics/list
[4]: /ja/synthetics/api_tests/?tab=httptest#assertions
[5]: /ja/api/v1/synthetics/#create-or-clone-a-test
[6]: /ja/integrations/
[7]: /ja/synthetics/apm/