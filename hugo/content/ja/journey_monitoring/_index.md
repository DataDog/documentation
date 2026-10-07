---
description: 重要なユーザーフローを監視し、分析して、ユーザーエクスペリエンスや技術的な問題をトラブルシューティングします。
title: Journey Monitoring
---
{{< callout url="https://www.datadoghq.com/product-preview/journey-monitoring/" btn_hidden="false" header="プレビュー版をお試しください！">}}
Journey Monitoring のプレビュー版が利用可能です。
{{< /callout >}}

## 概要 {#overview}

**Journey Monitoring** を使用すると、ログイン、チェックアウト、メディアストリーミングなどの重要なユーザーフローの健全性を、すべて 1 か所から追跡できます。任意のフローについて、次の点を確認できます。
- ユーザーは摩擦を感じていますか?
- パフォーマンスはどれだけ速く、どれだけ安定していますか？
- 問題はフロントエンド、ネットワーク、バックエンドのどこで発生していますか?

*ジャーニー*とは、開始イベントと終了イベントによって定義されるユーザーフローのことです。たとえば、チェックアウトジャーニーは、ユーザーがチェックアウトページに到達してからチェックアウトプロセスを完了するまでのエクスペリエンスを記録します。Journey Monitoring は、[Real User Monitoring][1]、[Synthetic Monitoring & Testing][2]、[Product Analytics][3]、および [Session Replay][4] からデータを収集し、各ジャーニーのトラフィック、コンバージョン率、稼働時間、エラーを 1 つのレポートにまとめて表示します。

これにより、エンジニアリング、プロダクト、開発運用の各チームは、ツールを切り替えることなく、ジャーニーの健全性を共通のビューで確認できます。

{{< img src="journey_monitoring/journey-monitoring-map-2.png" alt="Journey Monitoring マップでは、左側にトラフィックおよびコンバージョンのメトリクスと共にジャーニーのカタログが表示され、右側にアプリケーション内のビューとアクションの間をユーザーがどのように移動したかを示す視覚的なフローマップが表示されます。" style="width:100%;" >}}

## 機能 {#capabilities}

各ジャーニーについて、以下を行えます。
- ジャーニーのインバウンドトラフィック、コンバージョン率、完了までの時間を測定する
- [Synthetic テストスイート][10] に基づく稼働時間 SLO を使用して、ジャーニーの可用性を追跡する
- ユーザーがどこで離脱したかを特定し、[Session Replay][4] を使用して個々のセッションを調査する
- [RUM オペレーション][13] を使用して、ジャーニーの重要なステップのパフォーマンスを測定する
- エンジニアリング、プロダクト、および開発運用チーム全体で、ジャーニーの健全性に関する統一されたビューを共有する

## 前提条件 {#prerequisites}

Journey Monitoring では、フロントエンドアプリケーションで以下の製品の**少なくとも 1 つ**が有効になっている必要があります。製品ごとに、ジャーニーに異なるデータを提供します。

- **[RUM without Limits][5]**: RUM オペレーションによるフロントエンドのエラーおよびパフォーマンス追跡。
- **[Product Analytics][8]**: トラフィック、コンバージョン率、およびコンバージョンまでの時間の各メトリクス。
- **[Synthetic ブラウザテスト][6] または [Synthetic モバイルテスト][7]**: ジャーニーの自動作成されたテストスイートによる稼働時間の追跡。

## ジャーニーの構造 {#journey-structure}

ジャーニーの開始点と終了点には、[Real User Monitoring][1] のアクションイベントかビューイベントのいずれかを指定できます。

各ジャーニーには、1 つ以上のバリアントを設定できます。バリアントとは、ジャーニーの開始点から終了点までの間でユーザーがたどる中間ステップの特定のシーケンスを指します。当然ながら、ユーザーによってたどるパスは異なります。たとえば、オプションのステップをスキップするユーザーもいれば、ジャーニーを完了する前に寄り道をするユーザーもいます。

{{< img src="journey_monitoring/journey-monitoring-explainer-diagram-final.png" alt="開始イベント、終了イベント、および 3 つのバリアントを持つジャーニーの図。ライブ環境では RUM と Product Analytics によって監視され、Synthetic 環境では Synthetic テストによって監視されます。" style="width:100%;" >}}

## 設定 {#setup}

開始イベントと終了イベントを選択してジャーニーを定義してから、他の Digital Experience 製品のデータを使用してカバレッジを拡張します。

### ステップ 1 - ジャーニーを作成する {#step-1-create-a-journey}

1. **[Digital Experience] > [Journey Monitoring]**に移動します。
2. [**New Journey**] (新規ジャーニー) をクリックするか、[suggested journey][11] (推奨ジャーニー) を選択します。

### ステップ 2 - ジャーニーの詳細を指定する {#step-2-specify-journey-details}

1. フロントエンドアプリケーションを選択します。
2. ジャーニー名を追加します。
3. 開始イベントを 1 つ以上選択します。
4. 終了イベントを 1 つ以上選択します。
5. [**Save Journey**] (ジャーニーの保存) をクリックします。

右側のファネルチャートは、選択した開始イベントおよび終了イベントに基づいて自動的に更新されます。ファネルには、各ステップのボリューム、コンバージョン率、平均完了時間が表示されます。

**注**: 推奨ジャーニーから開始した場合、必須フィールドは事前入力されます。

説明、属性フィルター、チームの所有権、タグ、[バリアント][9] を追加することもできます。[**Save Journey**] をクリックすると、ジャーニーが作成され、ジャーニーの [詳細レポート][12] にリダイレクトされます。詳細レポートには、ジャーニーのボリューム、コンバージョン率、平均完了時間に関するメトリクスが含まれています。

### ステップ 3 - 他の製品からのカバレッジを追加する {#step-3-add-coverage-from-other-products}

ジャーニーの詳細レポートでは、お使いの製品に基づいて監視カバレッジを拡張できます。

- [RUM オペレーション][13] を作成して、実際のユーザー環境におけるジャーニーの重要なステップのパフォーマンスを監視します。
- ジャーニーの [テストスイート][14] に Synthetic テストを追加して、稼働時間の追跡を開始します

ジャーニーをカバーする [RUM オペレーション] または Synthetic テストがすでに作成されている場合、Datadog はジャーニーの詳細レポートにそのオペレーションまたはテストを表示します。

## メトリクス {#metrics}

各ジャーニーとそのバリアントには、以下のパフォーマンスメトリクスがあります。
- **トラフィック**: ユーザーセッション全体でのジャーニー試行の総数。`rum.measure.journey` メトリクスに基づいています。
- **コンバージョン**: 完了したジャーニー試行の割合。`rum.measure.journey` メトリクスに基づいています。
- **コンバージョンまでの時間**: すべてのユーザーセッションを通じてジャーニーを完了するまでの平均時間。`rum.measure.journey.duration` メトリクスに基づいています。
- **稼働時間**: [Synthetic テストスイート][14] の稼働時間に基づくジャーニーの可用性。

## 次のステップ {#whats-next}

{{< whatsnext desc="Journey Monitoring を探索する:" >}}
   {{< nextlink href="/journey_monitoring/map/" >}}<strong>マップ</strong>: すべてのジャーニーと、そのトラフィックおよびコンバージョンメトリクスを可視化します。{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/map/suggested_journeys/" >}}<strong>推奨ジャーニー</strong>: アプリケーションでの実際のユーザー行動に基づいて、自動生成されたジャーニーの推奨を取得します。{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/details_report/" >}}<strong>詳細レポート</strong>: ジャーニーのトラフィック、コンバージョン、エラー、稼働時間を統合レポートで分析します。{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/details_report/variants/" >}}<strong>バリアント</strong>: ユーザーがジャーニーをたどるさまざまなパスを追跡および比較します。{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/uptime/" >}}<strong>稼働時間</strong>: 自動作成された Synthetic テストスイートを使用して、ジャーニーの可用性を測定します。{{< /nextlink >}}
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