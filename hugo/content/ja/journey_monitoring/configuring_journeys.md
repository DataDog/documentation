---
aliases:
- /ja/journey_monitoring/guide/
- /ja/journey_monitoring/guide/configuring_journeys/
description: ジャーニーを定義し、Product Analytics、RUM、および Synthetic のカバレッジを追加します。
further_reading:
- link: /journey_monitoring/
  tag: ドキュメント
  text: Journey Monitoring について
- link: /journey_monitoring/details_report/
  tag: ドキュメント
  text: ジャーニーの詳細レポートについて
title: ジャーニーの構成
---
## 概要{#overview}

このページを使用して、重要なユーザーフローを表し、その健全性を明らかにするジャーニーを構成します。

[イベントベースのジャーニー][28]の構成は 3 つのステップからなります。

1. ジャーニーを作成し、そのユーザーフローを定義します。
2. 重要な技術ステップを表す [Real User Monitoring (RUM) オペレーション][21]を追加します。
3. ジャーニーをカバーする [Synthetic テスト][24]を追加します。

これらの手順を完了したら、ジャーニーの[主要なパフォーマンス指標 (KPI)][26]、オペレーション、[サービスレベル目標 (SLO)][25]、テスト、および[バリアント][3]を検証します。

[Synthetics のみの構成][29]では、[テストスイート][14]が自動的にジャーニーとして表示されます。

## Journey Monitoring を使用するタイミング {#when-to-use-journey-monitoring}

Journey Monitoring は、ユーザーの行動と技術的な健全性を組み合わせて、エンドツーエンドのフローを監視します。これは、複数の製品における個別の構成が必要となるフローを監視およびトラブルシューティングするための主要な場所として機能します。

一般的な選択肢は以下のとおりです。

- **RUM**:
  - [RUM Session Explorer のファネル][30]、または RUM イベントに基づくファネルウィジェット
  - ボタンクリックやページビューなど、ユーザーのアクティビティを追跡するウィジェット
  - フローのボリューム、完了までの時間、または完了したジャーニーを測定するカスタムメトリクスまたはアクション
  - 主要な技術的ステップを表す[カスタムバイタル][31] (ジャーニー内の RUM オペレーションで表現可能)
- **Synthetic Monitoring & Testing**: 同じフローをカバーしているものの、ジャーニーのテストスイートとして編成されていない複数のテスト
- **[Product Analytics][22]**: エンドツーエンドのフロー全体で行動を追跡するファネル、ジャーニーパス、またはその他の可視化機能。

Journey Monitoring は、Product Analytics を使用してユーザーの行動とエクスペリエンスを把握し、RUM を使用してパフォーマンスと可用性を評価し、Synthetic テストを使用して回帰の検出と[ジャーニーアップタイム][17]の測定を行います。

## はじめに {#before-you-begin}

[Journey Monitoring の前提条件][1]を確認してください。Journey Monitoring を利用するには、1 つ以上のサポートされている製品の有効なトライアルまたは有料サブスクリプションが必要です。

構成手順によって必要な製品が異なります。

- アクションイベントまたはビューイベントを使用してジャーニーを定義するには、RUM および Product Analytics のプレビュー版、トライアル、または有料アクセスが必要です。
- RUM オペレーションデータを追加するには、[RUM without Limits&trade;][4] の有効なトライアルまたは有料サブスクリプションが必要です。
- Synthetic カバレッジを追加するには、[Synthetic Browser Tests][12] または [Synthetic Mobile Tests][13] の有効なトライアルまたは有料サブスクリプションが必要です。

### 権限とロール {#permissions-and-roles}

Journey Monitoring は複数の製品のアセットを使用するため、ジャーニーおよびリンクされたアセットへのアクセス権は各製品の権限に依存します。アクセス要件については、[Journey Monitoring のロールと権限][15] を参照してください。

ジャーニーを作成または編集するには、以下の手順に従います。

- 自分のロールに Journey Monitoring の書き込みアクセス権が必要です。
- ジャーニーのテストスイートを作成するには、Synthetic Monitoring の書き込みアクセス権も必要です。このアクセス権がない場合、Datadog はテストスイートなしでジャーニーを作成します。必要なアクセス権を取得して、後から追加してください。

## ステップ 1: ジャーニーを作成する {#step-1-create-a-journey}

### RUM および Product Analytics {#rum-and-product-analytics}

イベントベースのジャーニーを定義するには、RUM アクションまたはビューイベントを使用します。

#### ユーザーフローを選択する {#choose-a-user-flow}

ビジネス成果の達成を支援するユーザー向けの重要なユーザーフローに対してジャーニーを作成します。ジャーニーは複数のステップにまたがり、重要なアクションを表している必要があります。

各ジャーニーの焦点を明確にするために、以下のガイドラインに従ってください。

**行うべきこと:**

- ユーザーフローごとに個別のジャーニーを作成します。
- 共有の開始イベントと終了イベントを使用して、[アップストリームおよびダウンストリームのジャーニー][16]を明らかにします。
- 1 つの高レベルなジャーニーを使用し、属性フィルターを使用して、米国や英国のユーザーなど、コホートを比較します。

**避けるべきこと:**

- 単一の短いインタラクションのためのジャーニーを作成しないでください。代わりに RUM オペレーションを使用してください。
- いくつかの異なるユーザーフローを 1 つのジャーニーに組み合わせないでください。
- 国などの属性値のみが異なる重複したジャーニーを作成しないでください。

#### 作成方法を選択する {#choose-a-creation-method}

監視するユーザーフローがわかっている場合は、ジャーニーを手動で作成します。Datadog がユーザーアクティビティから特定したフローを使用するには、[推奨ジャーニー][2]から開始します。

ジャーニーを作成するには、以下の手順に従います。

1. **[Digital Experience] (デジタルエクスペリエンス) > [Journey Monitoring]** に移動します。
2. [**New Journey**] (ジャーニーの新規作成) をクリックするか、マップまたはカタログから推奨ジャーニーを選択します。
3. フロントエンドアプリケーションを選択します。
4. ジャーニー名を追加します。
5. 1 つ以上の開始イベントを選択します。
6. 1 つ以上の終了イベントを選択します。
7. 必要に応じて、説明、属性フィルター、チーム所有権、タグ、バリアントを追加します。
8. [**Save Journey**] (ジャーニーを保存) をクリックします。

推奨ジャーニーには、事前に設定された名前、説明、開始イベント、終了イベントが含まれます。保存する前に、これらのフィールドを確認してください。ジャーニーを保存すると、Datadog はその[詳細レポート][5]を開きます。

#### 開始条件と終了条件を定義する {#define-start-and-end-conditions}

アクションイベント、ビューイベント、またはその両方を選択します。[ファネル][27]は、選択されたイベントに基づいて更新され、各ステップのボリューム、コンバージョン率、平均コンバージョン時間を表示します。

##### 複数の開始イベントと終了イベント {#multiple-start-and-end-events}

複数の開始イベントは、同じユーザーフローへの複数のエントリーポイントを表すことができます。複数の終了イベントは、複数の有効な結論を表すことができます。

イベントを追加するたびに、ジャーニーの定義が広がります。開始イベントや終了イベントが多すぎると、ジャーニーの範囲が不明確になり、KPI の精度が低下する可能性があります。

##### 属性フィルター {#attribute-filters}

ジャーニーレベルの属性は、社内ユーザーなどの広範なコホートを含めたり除外したりします。個々の開始条件および終了条件の属性により、フローがさらに絞り込まれます。

重要な属性フィルターをジャーニーの名前や説明に含めることで、ユーザーは KPI のスコープを理解しやすくなります。

##### 参照元のパス {#referrer-paths}

参照元のパスは、開始イベントまたは終了イベントを特定のページビューに続くインスタンスに限定します。これらは、複数のジャーニーコンテキストに表示されるイベントと、特定のジャーニーに属するインスタンスを区別する上で役立ちます。

##### 意味のある開始イベントと終了イベントを選択する {#select-meaningful-start-and-end-events}

開始イベントは、ジャーニーを明確に開始し、ユーザーの意図的なアクションを表すものでなければなりません。

<div class="alert alert-danger">ジャーニーが完了したことを確認できる終了イベントを選択してください。[<strong>Pay</strong>] (支払い) または [<strong>Submit</strong>] (送信) をクリックしても、成功したことを確認できるわけではありません。後のイベントで成功を確認できる場合は、そのイベントを使用してください。そうすることで、失敗した試行が完了したジャーニーとしてカウントされることがなくなります。</div>

例:

- **サインインジャーニー**
  - 開始: ユーザーがサインインページを開きます。
  - 終了: アプリケーションがユーザーをホーム画面にリダイレクトします。
  - 次で終了しない: ユーザーが**サインイン**をクリックします。
- **チェックアウトジャーニー**
  - 開始: ユーザーがチェックアウトページを開きます。
  - 終了: アプリケーションが支払い確認モーダルを表示します。
  - 次で終了しない: ユーザーが**支払う**をクリックします。
- **フォーム送信ジャーニー**
  - 開始: ユーザーがフォームを開きます。
  - 終了: アプリケーションが送信確認メッセージを表示します。
  - 次で終了しない: ユーザーが**送信**をクリックします。

#### バリアントを追加する {#add-variants}

バリアントは、ジャーニーの開始から終了までの間の中間イベントの一般的なシーケンスです。異なるパス間で KPI とテレメトリデータを比較するには、バリアントを追加します。

#### タグと所有権を追加する {#add-tags-and-ownership}

タグとチームの所有権は、チームが関連ジャーニーを見つけ、[ジャーニーカタログ][20]をフィルタリングする上で役立ちます。一貫した命名規則とタグ付け規則により、カタログが拡大してもジャーニーを整理された状態に保つことができます。

### Synthetics のみ {#synthetics-only}

Synthetic Monitoring & Testing のみを使用している場合、テストスイートは自動的にジャーニーとして表示されます。ジャーニーを追加するには、別のテストスイートを作成します。

## ステップ 2: RUM オペレーションを追加する {#step-2-add-rum-operations}

RUM オペレーションは、ジャーニーにおける重要なアクションの可用性とレイテンシーを測定します。これらのオペレーションを使用して、技術的なパフォーマンスがユーザーの離脱に寄与しているかどうかを調査します。

リンクされたオペレーションの SLO は、[ジャーニーのステータス][6]に寄与します。

### 一致するオペレーションを確認する {#review-matching-operations}

Datadog は時間相関を使用して、ジャーニーの一部である可能性のある既存の RUM オペレーションを特定します。これらのオペレーションは、詳細レポートに **Matching** (一致) として示されます。

ユーザーがジャーニーを完了する過程で遭遇するオペレーションのみをリンクしてください。

{{< img src="journey_monitoring/journey-monitoring-matching-operations.png" alt="実行、成功率、レイテンシー、および SLO 作成オプションを含む、時間ベースで一致する RUM オペレーションが表示されている、ジャーニーモニタリング詳細レポート。" style="width:100%;" >}}

### オペレーションを作成する {#create-operations}

一致するオペレーションが重要なアクションを表していない場合は、インスツルメンテーション方法を選択します。

- **RUM SDK APIs**: [フロントエンドアプリケーションコードでオペレーションをインスツルメントし][10]、開始、成功、または失敗のタイミングを明示的に報告します。この方法ではオペレーションのライフサイクルを正確に制御できますが、コードの変更が必要です。
- **Datadog UI**: 取り込まれた RUM イベントから開始、成功、失敗の条件を選択して、[Datadog でオペレーションを作成][8]します。オペレーションは、オペレーションカタログ、またはジャーニー詳細レポートの [Operations] (オペレーション) テーブルから作成できます。この方法ではコードの変更は不要ですが、Datadog がすでに収集しているイベントに依存するため、失敗の捕捉精度が低くなります。

[Datadog MCP Server の `create_rum_operation` ツール][32]と [RUM Operations API][9] も、RUM イベント条件から UI 設定型のオペレーションを作成します。Datadog は、ジャーニー詳細レポートから作成されたオペレーションを自動的にリンクします。他の場所で作成されたオペレーションの場合は、作成後にそのオペレーションをジャーニーにリンクします。

### オペレーションを管理する {#manage-operations}

ジャーニーにオペレーションを追加するか、ジャーニーから削除するには、[**Manage Operations**] (オペレーションを管理) を選択します。

オペレーションのリンク:

- オペレーションをジャーニーのクリティカルパスの一部として識別する
- オペレーションの SLO をジャーニーのステータスに追加する
- オペレーションに 1 つ以上の SLO がない場合、99% の目標値を持つ可用性 SLO を作成する

### オペレーション SLO を管理する {#manage-operation-slos}

Datadog がジャーニーへの貢献度を評価するには、リンクされた各オペレーションに少なくとも 1 つの SLO が必要です。オペレーションには、可用性 SLO、レイテンシー SLO、またはその両方を持たせることができます。ガイダンスについては、[RUM オペレーションで SLO を作成するためのベストプラクティス][11] を参照してください。

<div class="alert alert-tip">
ジャーニーのコンバージョンに最も大きな影響を与えるオペレーションから始めます。必要に応じてオペレーションを追加します。
<ul>
<li>ユーザーのサインインジャーニーについては、最終的なサインインアクションを監視し、有効な認証情報で認証が成功することを確認します。</li>
<li>e コマースのチェックアウトジャーニーでは、支払いアクションを監視することが重要です。支払いに失敗すると、ユーザーはジャーニーを完了できなくなります。</li>
</ul>
</div>

## ステップ 3: Synthetic テストカバレッジを追加する {#step-3-add-synthetic-test-coverage}

Synthetic テストは、重要なジャーニーパスに対する技術的なカバレッジを提供します。テストの失敗はユーザーに影響を与える回帰を示している可能性があり、カバーテストによってジャーニーのアップタイムが決定されます。

Synthetic Monitoring の書き込みアクセス権を含むイベントベースのジャーニーを作成すると、Datadog はテストスイートを作成し、ジャーニーをカバーする既存のテストを追加します。このスイートには、デフォルトの目標値が 99.9% である編集可能なアップタイム SLO が含まれています。Synthetic Monitoring の書き込みアクセス権がない場合、Datadog はテストスイートを作成せずにジャーニーを作成します。

Synthetics 専用ジャーニーの場合、既存のテストスイートによりジャーニーが定義されます。ジャーニー詳細レポートの Synthetic Monitoring & Testing セクションには、スイートのパフォーマンスとアップタイムの説明が記載されています。

### 一致するテストを確認する {#review-matching-tests}

イベントベースのジャーニーの場合、Datadog は RUM データを使用して、ジャーニーをカバーする Synthetic テストを識別します。これらの一致するテストは、ジャーニー詳細レポートおよびテストスイートページに表示されます。

- 一致する各テストを確認する。
- ジャーニーのクリティカルパスをカバーするテストを追加する。

{{< img src="journey_monitoring/journey-monitoring-matching-tests.png" alt="Synthetics テスト、アラートステータス、アップタイムが表示されている Journey Monitoring 詳細レポート。" style="width:100%;" >}}

### テストを作成する {#create-tests}

カバレッジを作成するには、ブラウザテストまたはモバイルアプリテストを作成し、ジャーニーのスイートに追加します。

ジャーニーをカバーする Synthetic テストがない場合は、[Bits Testing][18] を使用して、カバーするテストを生成できます。

### テストを管理する {#manage-tests}

[**Manage Tests**] (テストを管理) を選択して、ジャーニーのテストスイートにテストを追加するか、テストスイートから削除します。スイートが空の場合、または Datadog が新たに一致するテストを特定した場合は、カバーするテストを追加します。

### カバレッジを維持する {#maintain-coverage}

- ジャーニーの開始条件や終了条件を変更すると、それをカバーするテストに影響を与える可能性があります。これらの条件を変更した後は、カバレッジを確認してください。
- スイートにジャーニーをカバーするテストが少なくとも 1 つ含まれている場合、そのジャーニーには Synthetic カバレッジがあり、アップタイムが報告されます。
- ジャーニーをカバーしなくなったテストを削除し、アプリケーションの変更に合わせて新たに一致するテストを追加します。

カバレッジの管理は Synthetic テストを変更するため、Synthetic Monitoring の書き込みアクセス権と、スイートに対する制限ポリシーが必要です。

## ジャーニーを検証する {#validate-a-journey}

ジャーニーの構成後に、以下の点を確認してください。

- 開始イベントと終了イベントが、意図したユーザーフローを表していること。
- KPI が予想されるトラフィックおよびユーザーの行動と一致していること。
- バリアントが、予想される個々のパスを表していること。
- リンクされた各 RUM オペレーションが重要なアクションを表しており、少なくとも 1 つの SLO が設定されていること。
- テストスイートに、クリティカルパスをカバーするテストが含まれていること。
- タグとチームオーナーシップによって、ユーザーがカタログでジャーニーを見つけられるようになること。

## ジャーニーを管理する {#maintain-a-journey}

ジャーニーの開始イベントまたは終了イベントを変更した後で、そのバリアント、一致するオペレーション、Synthetic カバレッジ、および KPI を確認します。ジャーニーを検索、編集するには、ジャーニーカタログを使用します。[ジャーニーステータスページ][6]では、**Degraded** および **Missing coverage** の状態を調査する方法を説明しています。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/journey_monitoring/#prerequisites
[2]: /ja/journey_monitoring/suggested_journeys/
[3]: /ja/journey_monitoring/variants/
[4]: /ja/real_user_monitoring/rum_without_limits/
[5]: /ja/journey_monitoring/details_report/
[6]: /ja/journey_monitoring/status/
[8]: /ja/real_user_monitoring/operations_monitoring/?tab=browser#create-operations-from-datadog
[9]: /ja/api/latest/rum-operations/
[10]: /ja/real_user_monitoring/operations_monitoring/?tab=browser#create-operations-with-the-sdk-apis
[11]: /ja/real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
[12]: /ja/synthetics/browser_tests/
[13]: /ja/synthetics/mobile_app_testing/
[14]: /ja/synthetics/test_suites/
[15]: /ja/journey_monitoring/roles_and_permissions/
[16]: /ja/journey_monitoring/overview/#upstream-and-downstream-journeys
[17]: /ja/journey_monitoring/details_report/#synthetic-monitoring--testing
[18]: https://www.datadoghq.com/blog/bits-testing-test-coverage/
[20]: /ja/journey_monitoring/overview/#journey-catalog
[21]: /ja/real_user_monitoring/operations_monitoring/
[22]: /ja/product_analytics/
[24]: /ja/journey_monitoring/configuring_journeys/#step-3-add-synthetic-test-coverage
[25]: /ja/service_level_objectives/
[26]: /ja/journey_monitoring/details_report/#traffic-and-conversion-trends
[27]: /ja/product_analytics/charts/funnel_analysis/
[28]: /ja/journey_monitoring/#rum-and-product-analytics
[29]: /ja/journey_monitoring/#synthetics-only
[30]: /ja/real_user_monitoring/explorer/visualize/#funnels
[31]: /ja/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#measure-component-level-performance-with-custom-vitals
[32]: /ja/mcp_server/tools/#create_rum_operation