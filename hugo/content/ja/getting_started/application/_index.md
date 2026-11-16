---
description: Datadog の UI ナビゲーション、ダッシュボード、モニター、インテグレーション、コアプラットフォーム機能などの主な機能の概要。
further_reading:
- link: https://learn.datadoghq.com/bundles/frontend-engineer-learning-path
  tag: ラーニングセンター
  text: フロントエンドエンジニア向けラーニングパス
- link: https://learn.datadoghq.com/bundles/backend-engineer-learning-path
  tag: ラーニングセンター
  text: バックエンドエンジニア向けラーニングパス
- link: https://learn.datadoghq.com/bundles/site-reliability-engineer-learning-path
  tag: ラーニングセンター
  text: サイト信頼性エンジニア向けラーニングパス
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: インタラクティブなセッションに参加して、Datadog の強固な基盤を構築しましょう
- link: https://www.datadoghq.com/blog/datadog-quick-nav-menu/
  tag: ブログ
  text: Datadog クイックナビメニューのご紹介
title: Datadog の開始
---
{{< learning-center-callout header="ラーニングセンターで Datadog のコアスキルを試す" btn_title="今すぐ登録" btn_url="https://learn.datadoghq.com/bundles/core-skills-learning-path">}}
  実際のクラウドの計算リソースと Datadog のトライアルアカウントを使って、無料で学習できます。これらのハンズオンラボを開始して、タグ付け、メトリクス、モニター、ダッシュボードについて短期間で理解を深めしょう。
{{< /learning-center-callout >}}

## 概要 {#overview}

このページでは、[Datadog サイト][1] で利用可能な機能の概要を説明します。

<div class="alert alert-info">
  Datadog サイトのナビゲーションは、ブラウザの幅に応じて変化します。最大で 3 種類のナビゲーションを用意することができます。ナビゲーションの種類を変更するには、ブラウザの幅を調節してください。
  <br><br>
  <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd>を押すと、Datadog 全体からダッシュボードやモニターなどのページやエンティティを検索できます。
</div>

## インフラストラクチャー {#infrastructure}

[インフラストラクチャーリスト][2] は、すべてのインフラストラクチャーリソース (ホスト、コンテナ、プロセスなど) とその関連メタデータを一元的に表示します。

**主な機能:**

- インフラストラクチャーのパフォーマンスを調査します。
- タグとメトリクスに基づいて、ホストをアレンジ、フィルタリング、可視化します。
- ホストを検査して、タグ、パフォーマンス、健全性などを確認します。

開始するには、アプリで [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Hosts{{< /ui >}}][3] に移動します。詳細については、[インフラストラクチャーリストのドキュメント][2] を参照してください。

## ホストとコンテナマップ {#host-and-container-maps}

{{< img src="getting_started/application/host_map_2025.png" alt="アベイラビリティーゾーン別にグループ化したホストマップの概要。" >}}

[ホストとコンテナマップ][4] では、すべてのホストとコンテナを視覚的に表示し、CPU 使用率などの主要なメトリクスで色分けされるため、問題を迅速に特定できます。

**主な機能**:

- インフラストラクチャー全体を視覚的なマップとして一度に表示します。
- さまざまなメトリクスで色分けしてパフォーマンスの問題を特定しやすくし、タグやメタデータでフィルタリングおよびグループ化します。
- 個々のホストやコンテナを詳細に調査してトラブルシューティングを行います。

開始するには、アプリで [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Host Map{{< /ui >}}][5] に移動します。詳細については、[ホストとコンテナマップのドキュメント][4] を参照してください。

## Log Management {#log-management}

[Datadog Log Management][6] を使用すると、アプリケーションやインフラストラクチャーによって生成されるすべてのログを送信および処理できます。インデックスを作成することなく、[Live Tail][7] を使用してリアルタイムでログを監視できます。

**主な機能**:

- すべてのサービス、アプリケーション、プラットフォームからログを自動的に収集します。
- ログをリアルタイムで表示および検索し、サービス、ホスト、エラータイプなどでフィルタリングします。
- 保持するログとその期間を選択し、ストレージコストを削減します。

開始するには、アプリで [{{< ui >}}Logs{{< /ui >}}][8] に移動します。詳細については、[Log Management ドキュメント][6] を参照してください。

## APM {#apm}

[Datadog Application Performance Monitoring][9] (APM またはトレーシング) を使用すると、ログやインフラストラクチャーの監視と並行して、アプリケーションのパフォーマンスに関する詳細なインサイトを得ることができます。

**主な機能**:

- 分散システム全体にわたるアプリケーションへのリクエストをエンドツーエンドでトレースします。
- リクエストの各ステップに費やされた時間を可視化し、パフォーマンスのボトルネックを確認します。
- Service Map を使用して、サービスの依存関係とデータフローを可視化します。
- トレースを対応ログ、メトリクス、ユーザーセッションと関連付け、フルスタックのコンテキストを把握します。

開始するには、アプリで [{{< ui >}}APM{{< /ui >}}][10] に移動します。詳細については、[APM ドキュメント][9] を参照してください。

## RUM & Session Replay {#rum-session-replay}

Datadog [Real User Monitoring][11] (RUM) を使用すると、Web アプリケーションやモバイルアプリケーション全体でのリアルタイムのユーザーアクティビティとエクスペリエンスを可視化および分析できます。[Session Replay][12] を使用すると、ユーザーセッションをキャプチャして表示し、ユーザーの行動をより深く理解できます。

**主な機能**:
- Core Web Vitals および Mobile Vitals を使用して、Web ブラウザおよびモバイルプラットフォーム (iOS、Android、React Native、Flutter など) 全体のパフォーマンスを監視します。
- 自動グループ化、クラッシュレポート、疑わしいコミットの特定機能を使用して、エラーの追跡およびトラブルシューティングを行います。
- レイジークリックやエラークリックなどのユーザーフラストレーションシグナルを検出し、UX の問題を特定します。
- Feature Flag のパフォーマンスと導入状況を監視します。
- フロントエンドの問題をバックエンドのトレース、ログ、インフラストラクチャーのメトリクスと関連付け、フルスタックの可視性を実現します。

開始するには、アプリで [{{< ui >}}RUM explorer{{< /ui >}}][13] に移動します。詳細については、[RUM ドキュメント][11] を参照してください。

## Synthetic Monitoring {#synthetic-monitoring}

Datadog [Synthetic Monitoring][14] を使用すると、API、ブラウザ、モバイル、および Network Path のテストを作成および実行して、世界中のシミュレートされたリクエストやアクションをプロアクティブに監視できます。これらのテストは、アプリケーションと API を監視し、ユーザーに影響が及ぶ前にパフォーマンスの問題やダウンタイムを検出します。

**主な機能**:

- ビジネスに不可欠な API エンドポイントとユーザージャーニーをテストします。
- エラーの検出、リグレッションの特定、ロールバックの自動化を行い、本番環境での問題発生を未然に防ぎます。
- さまざまな場所にいるユーザーのパフォーマンス問題を特定し、アラートを送信します。

開始するには、アプリで [{{< ui >}}Synthetic Monitoring & Testing{{< /ui >}}][15] に移動します。詳細については、[Synthetic Monitoring のドキュメント][14] を参照してください。

## Integrations {#integrations}

Datadog の {{< translate key="integration_count" >}} [integrations][16] を使用して、インフラストラクチャーからのすべてのメトリクスとログを集約し、オブザーバビリティシステム全体に関するインサイトを得ることができます。

{{< img src="getting_started/application/integrations-2025.png" alt="Integrations" >}}

**主な機能**:

- 利用可能なインテグレーションは、クラウドテクノロジー、インシデント対応、データレイヤー、セキュリティ、AI など多岐にわたります。
- インテグレーションの構成後は、データセンターやオンラインサービス内のすべてのデータが Datadog で一元管理されます。
- 独自のインテグレーションを構築するには、[開発者向けドキュメント][17] を参照してください。

開始するには、アプリで [{{< ui >}}Integrations{{< /ui >}}][18] に移動するか、[ドキュメント][19] で [インテグレーション] のリストを参照してください。

## ダッシュボード {#dashboards}

[ダッシュボード][20] にはリアルタイムのパフォーマンスメトリクスを含むグラフが表示され、メトリクス、ログ、トレースなどにわたるデータを一元的に表示することができます。

**主な機能**:

- すぐに使えるダッシュボードから開始するか、特定の質問に合わせて独自のダッシュボードを作成します。
- ドラッグアンドドロップ式のウィジェット、カスタムクエリ、柔軟なレイアウトでダッシュボードをカスタマイズできます。
- 複数のデータタイプ (メトリクス、ログ、APM、RUM など) を 1 か所にまとめ、リアルタイムでデータを表示します。
- チームのコンテキストに合わせて、コメントやイベントでグラフに注釈を付けます。

開始するには、アプリで [{{< ui >}}Dashboard List{{< /ui >}}][21] に移動します。詳細については、[ダッシュボードに関するドキュメント][20] を参照してください。

## モニター {#monitors}

[モニター][22] は、メトリクスのしきい値、インテグレーションの有無、ネットワークエンドポイントなどに基づいて、アラートと通知を提供します。

- Datadog に報告されるメトリクスを使用してモニターを作成します。
- 複数のトリガー条件を使用して、複雑なアラートロジックを構築します。
- アラートメッセージに `@` を追加して適切な担当者に通知を送信することで、Slack、メール、PagerDuty などにアラートを送信できます。
- ダウンタイムをスケジュールすると、システムシャットダウン時やオフラインメンテナンス時などに通知を停止できます。

開始するには、アプリで [{{< ui >}}Monitors List{{< /ui >}}][23] に移動します。詳細については、[モニターに関するドキュメント][22] を参照してください。

## 参考資料 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com
[2]: /ja/infrastructure/list/
[3]: https://app.datadoghq.com/infrastructure
[4]: /ja/infrastructure/hostmap/
[5]: https://app.datadoghq.com/infrastructure/map
[6]: /ja/logs/
[7]: /ja/logs/explorer/live_tail/
[8]: https://app.datadoghq.com/logs
[9]: /ja/tracing/
[10]: https://app.datadoghq.com/apm/home
[11]: /ja/real_user_monitoring/
[12]: /ja/session_replay/
[13]: https://app.datadoghq.com/rum/sessions
[14]: /ja/synthetics/
[15]: https://app.datadoghq.com/synthetics/tests
[16]: https://www.datadoghq.com/product/platform/integrations/
[17]: /ja/extend/integrations/
[18]: https://app.datadoghq.com/integrations
[19]: /ja/integrations/
[20]: /ja/dashboards/
[21]: https://app.datadoghq.com/dashboard/lists
[22]: /ja/monitors/
[23]: https://app.datadoghq.com/monitors/manage