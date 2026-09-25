---
description: ユーザーエクスペリエンスや技術的な問題のトラブルシューティングのために、重要なユーザーフローを監視および分析します。
further_reading:
- link: https://www.datadoghq.com/blog/journey-monitoring/
  tag: ブログ
  text: Datadog Journey Monitoring で重要なユーザージャーニーを監視
title: Journey Monitoring
---
{{< callout url="https://www.datadoghq.com/product-preview/journey-monitoring/" btn_hidden="false" header="プレビューに参加しましょう。">}}
Journey Monitoring はプレビュー版です。
{{< /callout >}}

## 概要 {#overview}

**Journey Monitoring** を使用すると、ログイン、チェックアウト、メディアストリーミングなどの重要なユーザーフローの健全性をすべて 1 か所から追跡できます。フローについて、以下の問いに対する答えを得ることができます。
- ユーザーが摩擦を感じているか？
- パフォーマンスのスピードと信頼性はどのくらいか？
- 問題はフロントエンド、ネットワーク、バックエンドのどこから発生しているか？

*ジャーニー*とは、開始イベントと終了イベントによって定義されるユーザーフローのことです。たとえばチェックアウトジャーニーは、ユーザーがチェックアウトページに到達してからチェックアウトプロセスを完了するまでのエクスペリエンスをキャプチャします。Journey Monitoring は、[Real User Monitoring][1]、[Synthetic Monitoring & Testing][2]、[Product Analytics][3]、および [Session Replay][4] からデータを取得し、各ジャーニーのトラフィック、コンバージョン率、アップタイム、エラーを 1 つのレポートで表示します。

これにより、エンジニアリング、プロダクト、および開発運用の各チームは、ツールを切り替えることなく、ジャーニーの健全性を共有ビューで確認できます。

{{< img src="journey_monitoring/journey-monitoring-map-2.png" alt="Journey Monitoring マップ。左側にジャーニーのカタログとトラフィックおよびコンバージョンのメトリクスが表示され、右側にアプリケーションビューとアクション間のユーザーパスを示す視覚的なフローマップが表示されています。" style="width:100%;" >}}

## 機能 {#capabilities}

各ジャーニーで以下のことが可能です。
- ジャーニーのインバウンドトラフィック、コンバージョン率、完了までの時間を測定する。
- [Synthetic テストスイート][10] に基づくアップタイム SLO を使用して、ジャーニーの可用性を追跡する。
- ユーザーがどこで離脱したかを特定し、[Session Replay][4] を使用して個々のセッションを調査する。
- [RUM オペレーション][13] を使用して、ジャーニーにおける重要なステップのパフォーマンスを測定する。
- エンジニアリング、プロダクト、および開発運用の各チームの間でジャーニーの健全性に関する統合ビューを共有する。

## 前提条件 {#prerequisites}

Journey Monitoring では、フロントエンドアプリケーションで以下の製品のうち**少なくとも 1 つ**を有効にする必要があります。各製品は、ジャーニーに異なるデータを提供します。

- **[RUM without Limits][5]**: RUM オペレーションによるフロントエンドのエラーおよびパフォーマンスの追跡。
- **[Product Analytics][8]**: トラフィック、コンバージョン率、およびコンバージョンまでの時間のメトリクス。
- **[Synthetic ブラウザテスト][6] または [Synthetic モバイルテスト][7]**: ジャーニーの自動作成されたテストスイートによるアップタイムの追跡。

## ジャーニーの構造 {#journey-structure}

ジャーニーの開始と終了には、[Real User Monitoring][1] からのアクションイベントまたはビューイベントのいずれかを使用できます。

各ジャーニーには 1 つ以上のバリアントを設定できます。バリアントとは、ユーザーがジャーニーの開始から終了までの間にとる中間ステップの特定のシーケンスです。ユーザーによって、たどるパスは自然と異なります。たとえば、ジャーニーを完了するまでに、オプションのステップをスキップするユーザーもいれば、回り道をするユーザーもいます。

{{< img src="journey_monitoring/journey-monitoring-explainer-diagram-final.png" alt="開始イベント、終了イベント、および 3 つのバリアントが含まれているジャーニーの図。ライブ環境では RUM と Product Analytics によって、Synthetic 環境では Synthetic テストによって監視されます。" style="width:100%;" >}}

## セットアップ {#setup}

開始イベントと終了イベントを選択してジャーニーを定義し、他のデジタルエクスペリエンス製品のデータを使用してカバレッジを拡大します。

### ステップ 1 - ジャーニーを作成する {#step-1-create-a-journey}

1. **[Digital Experience] (デジタルエクスペリエンス) > [Journey Monitoring]** に移動します。
2. [**New Journey**] (ジャーニーの新規作成) をクリックするか、[提案されたジャーニー][11] を選択します。

### ステップ 2 - ジャーニーの詳細を指定する {#step-2-specify-journey-details}

1. フロントエンドアプリケーションを選択します。
2. ジャーニー名を追加します。
3. 1 つ以上の開始イベントを選択します。
4. 1 つ以上の終了イベントを選択します。
5. [**Save Journey**] (ジャーニーを保存) をクリックします。

右側のファネルチャートは、選択された開始イベントと終了イベントに基づいて自動的に更新されます。ファネルには、各ステップのボリューム、コンバージョン率、平均完了時間が表示されます。

**注**: 提案されたジャーニーから開始した場合、必須フィールドはあらかじめ入力されています。

説明、属性フィルター、チーム所有権、タグ、[バリアント][9] を追加することもできます。[**Save Journey**] (ジャーニーを保存) をクリックすると、ジャーニーが作成され、ジャーニーの [詳細レポート][12] にリダイレクトされます。詳細レポートには、ジャーニーのボリューム、コンバージョン率、完了までの平均時間に関するメトリクスが含まれています。

### ステップ 3 - 他の製品からのカバレッジを追加する {#step-3-add-coverage-from-other-products}

ジャーニーの詳細レポートでは、ご使用の製品に基づいて監視カバレッジを拡大できます。

- [RUM オペレーション][13] を作成して、実際のユーザー環境におけるジャーニーの重要なステップのパフォーマンスを監視する。
- ジャーニーの [テストスイート][14] に Synthetic テストを追加して、アップタイムの追跡を開始する。

ジャーニーをカバーする既存の [RUM オペレーション] や Synthetic テストがある場合、Datadog はジャーニーの詳細レポートにそのオペレーションやテストを表示します。

## メトリクス {#metrics}

各ジャーニーとそのバリアントには、以下のパフォーマンスメトリクスがあります。
- **Traffic (トラフィック)**: ユーザーセッション全体でのジャーニー試行の総数。`rum.measure.journey` メトリクスに基づきます。
- **Conversion (コンバージョン)**: 完了したジャーニー試行の割合。`rum.measure.journey` メトリクスに基づきます。
- **Time to convert (コンバージョンまでの時間)**: すべてのユーザーセッションにおける平均ジャーニー完了時間。`rum.measure.journey.duration` メトリクスに基づきます。
- **Uptime (アップタイム)**: [Synthetic テストスイート][14] のアップタイムに基づくジャーニーの可用性。

## 次のステップ {#whats-next}

{{< whatsnext desc="Journey Monitoring を使ってみましょう。" >}}
   {{< nextlink href="/journey_monitoring/map/" >}}<strong>マップ</strong>: すべてのジャーニーと、そのトラフィックおよびコンバージョンメトリクスを可視化します。{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/map/suggested_journeys/" >}}<strong>提案されたジャーニー</strong>: アプリケーション内の実際のユーザー行動に基づいて、自動生成されたジャーニーの提案を取得します。{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/details_report/" >}}<strong>詳細レポート</strong>: ジャーニーのトラフィック、コンバージョン、エラー、アップタイムを統合レポートで分析します。{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/details_report/variants/" >}}<strong>バリアント</strong>: ユーザーがジャーニーでたどるさまざまなパスを追跡および比較します。{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/uptime/" >}}<strong>アップタイム</strong>: 自動作成された Synthetic テストスイートを使用して、ジャーニーの可用性を測定します。{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/real_user_monitoring/
[2]: /ja/synthetics/
[3]: /ja/product_analytics/
[4]: /ja/session_replay/
[5]: /ja/real_user_monitoring/rum_without_limits/
[6]: /ja/synthetics/browser_tests/
[7]: /ja/synthetics/mobile_app_testing/
[8]: /ja/product_analytics/
[9]: /ja/journey_monitoring/details_report/variants/
[10]: /ja/journey_monitoring/uptime/
[11]: /ja/journey_monitoring/map/suggested_journeys/
[12]: /ja/journey_monitoring/details_report/
[13]: /ja/real_user_monitoring/operations_monitoring/
[14]: /ja/synthetics/test_suites/#service-level-objectives

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}