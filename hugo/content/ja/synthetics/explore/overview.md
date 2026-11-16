---
description: Synthetic Monitoring & Testing Overview ページを使用して、失敗しているテスト、失敗が集中している箇所、およびテストカバレッジがないエンドポイントやビューを確認します。
further_reading:
- link: /synthetics/
  tag: ドキュメント
  text: Synthetic Monitoring
- link: /synthetics/explore/results_explorer/
  tag: ドキュメント
  text: Synthetic Monitoring & Testing Results Explorer
- link: /synthetics/api_tests/
  tag: ドキュメント
  text: API テスト
- link: /synthetics/browser_tests/
  tag: ドキュメント
  text: ブラウザテスト
- link: /synthetics/mobile_app_testing/
  tag: ドキュメント
  text: モバイルアプリケーションテスト
title: Synthetic Monitoring & Testing Overview ページ
---
Synthetic Monitoring & Testing Overview ページでは、Synthetic テストのヘルスとカバレッジを単一のビューで確認でき、次の 2 つの疑問を解決するのに役立ちます。

- **失敗している箇所は?**アラート状態にあるテストを特定し、失敗が集中している箇所を確認して、失敗している各テストに対処します。
- **未テスト項目は?**Synthetic テストでカバーされていない、トラフィックが最も多いエンドポイントとビューを見つけ、それらのテストを作成します。

失敗のトリアージや、テストカバレッジを追加する場所を決定する際の起点として、このページを使用します。

{{< img src="synthetics/explore/overview/overview_page.png" alt="Synthetic Monitoring & Testing Overview ページ。場所ごとにグループ化された失敗マップとアラート状態にあるテストのリストを含む Test health セクション、およびテスト済みと未テストのエンドポイントのサービスカードを含む Coverage gaps セクションが表示されています。" style="width:100%;" >}}

## 前提条件{#prerequisites}

- 未テストのエンドポイントを表示するには、サービスで [APM][1] を有効にします。
- 未テストのビューを表示するには、Web またはモバイルアプリケーションで [RUM][2] を有効にします。

Overview ページの [Test Health](#test-health) セクションでは、APM または RUM は必要ありません。

## テストヘルス{#test-health}

{{< ui >}}Test Health{{< /ui >}} セクションには、テストの総数のうち、アラート状態にあるテストの数が表示されます。{{< ui >}}View all alerting tests{{< /ui >}} をクリックして、すべてのリストを開きます。

### テストのフィルタリング {#filter-tests}

これらのフィルターを使用して、マップと失敗しているテストのリストのスコープを絞り込みます。

- {{< ui >}}Teams{{< /ui >}}: 1 つ以上のチームが所有するテストを表示します。
- {{< ui >}}Environment{{< /ui >}}: 1 つ以上の環境のテストを表示します。
- {{< ui >}}Tags{{< /ui >}}: 特定のタグを持つテストを表示します。
- {{< ui >}}Creator{{< /ui >}}: 特定のユーザーによって作成されたテストを表示します。

### 失敗が集中している箇所の特定 {#find-concentrated-failures}

マップには、失敗が集中している箇所が表示されます。マップでは、まずテストが {{< ui >}}OK{{< /ui >}} と {{< ui >}}In alert{{< /ui >}} に分割されます。各タイルはグループを表し、その中に含まれるテストの数を表示します。タイルが大きいほど、多くのテストが含まれます。

{{< ui >}}Group by{{< /ui >}} メニューを使用して、マップでのテストのグループ化方法を選択します。

- {{< ui >}}Location{{< /ui >}}
- {{< ui >}}Test type{{< /ui >}}
- {{< ui >}}Priority{{< /ui >}}
- {{< ui >}}Failure reason{{< /ui >}}
- {{< ui >}}Environment{{< /ui >}}
- {{< ui >}}Team{{< /ui >}}

場所ごとにグループ化すると、テストが実行されるすべての場所の下にそのテストが表示されます。各タイルには、その場所でテストが失敗しているかどうかが表示されます。その結果、タイルのカウント数の合計がテストの総数を超える場合があります。

{{< img src="synthetics/explore/overview/failure_map.png" alt="場所ごとにグループ化され、OK と In alert のセクションに分割された失敗マップ。各場所のテスト数に応じてタイルのサイズが設定されています。" style="width:100%;" >}}

### 失敗したテストへの対処 {#act-on-a-failing-test}

マップの横にあるリストには、アラート状態にあるすべてのテストが表示されます。各エントリには、テスト名、チェック対象の URL またはリクエスト、およびテストが失敗している場所が表示されます。

マップ内のタイルをクリックして、そのタイルに含まれるテストにリストを絞り込みます。

失敗した各テストに対して、以下の操作を実行できます。

- {{< ui >}}Investigate with Bits{{< /ui >}} をクリックして、AI 支援による障害調査を開始します。
- {{< ui >}}View Traces{{< /ui >}} をクリックして、API テストのバックエンドトレースを表示します。
- {{< ui >}}View Failing Step{{< /ui >}} をクリックして、ブラウザテストが失敗したステップを開きます。

テストのケバブメニュー (**⋮**) をクリックして、以下の操作を行います。

- {{< ui >}}Run test now{{< /ui >}}: スケジュール外でテスト実行をトリガーします。
- {{< ui >}}Pause scheduling{{< /ui >}}: テストのスケジュール実行を停止します。
- {{< ui >}}Open in Results Explorer{{< /ui >}}: [Results Explorer][3] でテストの結果を確認します。

{{< img src="synthetics/explore/overview/failing_test_actions.png" alt="1 つの箇所に絞り込まれた失敗マップ。その箇所でアラート状態にあるテストのリストの横に表示されています。Investigate With Bits が最初のテストでハイライト表示され、ケバブメニューが開いて Run test now、Pause scheduling、Open in Results Explorer が表示されています。" style="width:100%;" >}}

## Coverage gaps {#coverage-gaps}

{{< ui >}}Coverage gaps{{< /ui >}} セクションには、Synthetic テストでカバーされていないエンドポイントとビューが表示されます。Datadog は、過去 1 週間のリクエスト数またはビュー数であるトラフィックに基づいてこれらをランク付けします。リストの上部にある項目から着手し、トラフィックが最も多い対象を優先的にカバーします。

セクションの右上隅にあるトグルを使用して、{{< ui >}}Endpoints{{< /ui >}} と {{< ui >}}Views{{< /ui >}} を切り替えます。検索バーを使用して、特定のサービス、アプリケーション、エンドポイント、またはビューを検索します。

### カバレッジグリッドの読み方 {#read-the-coverage-grid}

各カードは、サービスまたはアプリケーションを表します。カード内の各正方形は、1 つのエンドポイントまたはビューを表します。

| 色  | 意味                 |
|--------|-------------------------|
| 青   | テスト済み                  |
| オレンジ | 未テスト、高トラフィック  |
| グレー   | 未テスト、低トラフィック |

高トラフィックは次のように定義されます。

- **エンドポイント**: 上位 20 のサービス全体で、Datadog は過去 1 週間のリクエスト数に基づいてエンドポイントを並べ替えます。リクエスト全体の 90% を占めるエンドポイントを高トラフィックと定義します。
- **ビュー**: 上位 20 個のアプリケーション全体で、Datadog は過去 1 週間のビュー数に基づいてビューを並べ替えます。ビュー全体の 90% を占めるビューを高トラフィックと定義します。

{{< img src="synthetics/explore/overview/coverage_grid.png" alt="Group by service がオンになっている Endpoints ビューの Coverage gaps セクション。サービスカードには、高トラフィックの未テストエンドポイントがオレンジ色の四角で、低トラフィックの未テストエンドポイントがグレーの四角で、テスト済みエンドポイントが青色の四角で表示されます。選択したサービスの未テストエンドポイントが左側に一覧表示され、トラフィックの多い順に並べ替えられます。" style="width:100%;" >}}

### 未テストのエンドポイント {#untested-endpoints}

{{< ui >}}Endpoints{{< /ui >}} ビューには、APM からの未テストの API エンドポイントが一覧表示されます。トラフィック上位 20 個のサービスが表示されます。各エントリには、HTTP メソッド、パス、およびサービスが表示されます。

デフォルトでは {{< ui >}}Group by service{{< /ui >}} がオンになっているため、ビューにはサービスごとに 1 枚のカードが表示され、それぞれに含まれる未テストのエンドポイント数が表示されます。サービスカードをクリックして、リストをそのサービスのエンドポイントに絞り込み、過去 1 週間のリクエスト数順に表示します。

エンドポイントのテストを作成するには、

1. サービスカードをクリックして、リストをそのサービスに絞り込みます。
2. 過去 1 週間のリクエスト数が最も多い、リストの先頭にあるエンドポイントにカーソルを合わせます。
3. {{< ui >}}Create an API Test{{< /ui >}} をクリックします。
4. エンドポイント URL が事前入力された状態で開く新しい [API test][4] で、テストの構成を完了し、{{< ui >}}Save{{< /ui >}} をクリックします。

{{< img src="synthetics/explore/overview/create_api_test.png" alt="カバレッジグリッドで選択されたサービスカードの横にある、ホバー時に [Create an API Test] ボタンが表示されたリスト内の未テストのエンドポイント。" style="width:100%;" >}}

### 未テストのビュー {#untested-views}

{{< ui >}}Views{{< /ui >}} ビューには、Web およびモバイルアプリケーションの RUM からの未テストのビューが一覧表示されます。過去 1 週間のビュー数が多い上位 20 件のアプリケーションが表示されます。各エントリには、ビュー名とアプリケーションが表示されます。

デフォルトでは {{< ui >}}Group by application{{< /ui >}} がオンになっているため、ビューにはアプリケーションごとに 1 枚のカードが表示され、それぞれに含まれる未テストのビュー数が表示されます。

ビューのテストを作成するには、

1. リスト内のビューにカーソルを合わせます。
2. Web アプリケーションのビューの場合は {{< ui >}}Create a Browser Test{{< /ui >}} を、モバイルアプリケーションのビューの場合は {{< ui >}}Create a Mobile Test{{< /ui >}} をクリックします。
3. フィールドが事前入力されていない状態で開く新しいテストを構成します。
   - Web アプリケーションのビューの場合は、新しい[ブラウザテスト][5]で開始 URL を入力し、ステップを記録して、{{< ui >}}Save{{< /ui >}} をクリックします。
   - モバイルアプリケーションのビューの場合は、新しい[モバイルアプリテスト][6]でアプリケーションを選択し、ステップを記録して、{{< ui >}}Save{{< /ui >}} をクリックします。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/
[2]: /ja/real_user_monitoring/
[3]: /ja/synthetics/explore/results_explorer/
[4]: /ja/synthetics/api_tests/
[5]: /ja/synthetics/browser_tests/
[6]: /ja/synthetics/mobile_app_testing/