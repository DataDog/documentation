---
further_reading:
- link: https://learn.datadoghq.com/courses/dd-101-dev
  tag: ラーニングセンター
  text: 'Datadog の基本: 開発者'
- link: https://learn.datadoghq.com/courses/dd-101-sre
  tag: ラーニングセンター
  text: 'Datadog の基本: サイト信頼性エンジニア'
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Datadog の基礎を固めるためのインタラクティブなセッションに参加できます
- link: https://www.datadoghq.com/blog/datadog-quick-nav-menu/
  tag: GitHub
  text: Datadog クイックナビメニューのご紹介
- link: https://www.datadoghq.com/blog/engineering/druids-the-design-system-that-powers-datadog/
  tag: ブログ
  text: Datadog を支えるデザインシステム、DRUIDS
kind: documentation
title: Datadog の開始
---

{{< learning-center-callout header="ラーニングセンターで Datadog Foundation をお試しください" btn_title="今すぐ登録" btn_url="https://learn.datadoghq.com/courses/datadog-foundation">}}
  Datadog のトライアルアカウントと実際のクラウドコンピュートキャパシティを使用して、コストをかけずに学ぶことができます。ハンズオンラボを開始して、サービス、ログ、メトリクス、インテグレーション、ダッシュボードを使いこなしましょう。
{{< /learning-center-callout >}}

## 概要

このページでは、[Datadog サイト][1]で利用可能な機能の概要を説明します。

Datadog サイトのナビゲーションは、ブラウザの幅に応じて変化します。最大で 3 種類のナビゲーションを用意することができます。ナビゲーションの種類を変更するには、ブラウザの幅を調節してください。

## ヘルプ

{{< img src="getting_started/application/integrations-2024.png" alt="インテグレーション" >}}

- Datadog では、{{< translate key="integration_count" >}} 個以上のインテグレーションが[公式にリストされています][2]。
- [Datadog API の使用][3]によるカスタムインテグレーションも使用可能です。
- Agent は[オープンソース][4]です。
- インテグレーションの構成後は、データセンターやオンラインサービス内のすべてのデータが Datadog で一元管理されます。

## ライブラリ

[ダッシュボード][12]には、リアルタイムのパフォーマンスメトリクスがグラフで表示されます。

- [スクリーンボード][13]にあるすべてのグラフは、同じマウス操作で閲覧可能。
- 棒グラフはイベントです。これによってコンテキストにメトリクスを与えることができます。
- グラフ内の特定のタイムフレームをクリックアンドドラッグで拡大表示できます。
- グラフ内にマウスポインターを合わせて、イベントストリームを移動させることができます。
- ゾーン、ホスト、総使用量別に表示。
- Datadog はグラフの JSON エディターを公開します。これにより、[数式][14]と[関数][15]をメトリクスに適用できます。
- グラフのスナップショットをストリームに表示して共有できます。
- グラフを iframe に埋め込むことができます。これにより、自社のデータやその他の情報へのアクセス権を付与しなくても、サードパーティにライブグラフを提供することができます。

## ログ管理

[モニター][16]は、メトリクスのしきい値、インテグレーションの有無、ネットワークエンドポイントなどに基づいて、アラートと通知を提供します。

- Datadog に報告される任意のメトリクスを使用できます。
- デバイス単位やホスト単位など、複数のアラートの設定
- アラートメッセージで `@` を使用することで適切な相手に通知を届けることができます。
- ダウンタイムをスケジューリングすると、システムシャットダウン時やオフラインメンテナンス時などに通知を停止できます。

## イベント

[イベントエクスプローラー][10]には、インフラストラクチャーやサービスによって生成された最新のイベントが表示されます。

イベントには以下のようなものがあります。

- コードのデプロイ
- サービスヘルスの変更
- コンフィギュレーション変更
- モニタリングアラート

イベントエクスプローラーは、Agent とインストールされたインテグレーションによって収集されたイベントを自動的に収集します。

また、Datadog API、カスタム Agent チェック、DogStatsD、Event email API を使用して、独自のカスタムイベントを送信することも可能です。

イベントエクスプローラーでは、ファセットや検索クエリでイベントをフィルタリングします。イベントを属性でグループ化またはフィルタリングし、[イベント分析][11]でグラフィカルに表現します。

## インフラストラクチャー

- すべてのマシンは[インフラストラクチャー リスト][7]に表示されます。
- 各マシンに適用されたタグを確認できます。タグ付けによって各マシンの目的を示すことができます。
- Datadog では、サーバーの分類が自動的に試みられます。新しいマシンにタグ付けすれば、既にそのタグに設定されている情報に基づいて、そのマシンの統計情報を即座に確認できます。[タグ付けの詳細については、こちらを参照してください][8]。

## ホストマップ

{{< img src="getting_started/application/host_map_2024.png" alt="ホストマップの概要" >}}

[ホストマップ][9]は、インフラストラクチャーメニューにある機能です。この機能を使用すると、以下のことができます。

- 環境のすばやい可視化
- 外れ値の特定
- 利用パターンの検出
- リソースの最適化

詳細については、[ホストマップ][9]を参照してください。

## ユーザーアクションの追跡

[サーバーレス][20]では、すべてのコンピューティングリソースをクラウドプロバイダーが管理し、ユーザーはイベント駆動型コードを記述したら、それをクラウドプロバイダーにアップロードして使用できます。Datadog Serverless は、サーバーレスアプリケーションを実行している AWS Lambda 関数からのメトリクス、トレース、ログを 1 つのビューにまとめて表示します。このため、エラー、高レイテンシー、またはコールドスタートを生成している関数に絞り込むことにより、パフォーマンスを最適化できます。

## APM & Continuous Profiler

[Datadog Application Performance Monitoring][6] (APM またはトレース) を利用すると、ログやインフラストラクチャーの監視と合わせて、リクエストの量やレイテンシーなどの重要なメトリクスを監視するために自動生成されたダッシュボードから、個々のリクエストの詳細なトレースに至るまで、アプリケーションのパフォーマンスを深く理解することができます。アプリケーションに対してリクエストが行われると、Datadog は分散システム全体でトレースを確認できるため、このリクエストに対して何が起こっているかについての体系的かつ正確なデータを表示できます。

## イベント

{{< img src="getting_started/npm.png" alt="NPM" >}}

Datadog [Network Performance Monitoring][17] (NPM) を使用すると、コンテナからホスト、サービス、アベイラビリティーゾーンまで、Datadog のタグ付きオブジェクト全体のネットワークトラフィックを可視化できます。データセンターからチーム、個々のコンテナまで、何でもグループ化します。タグを使用して、送信元と宛先でトラフィックをフィルタリングします。次に、フィルターはフローに集約され、それぞれがカスタマイズ可能なネットワークページとネットワークマップを通じて、1 つの送信元と 1 つの宛先間のトラフィックを示します。各フローには、スループット、帯域幅、再送信数、および IP、ポート、PID レベルまでの送信元/宛先情報などのネットワークメトリクスが含まれます。次に、トラフィック量や TCP 再送信などの主要なメトリクスを報告します。

## ヘルプ

Datadog [Synthetic Monitoring][22] では、API やブラウザのテストを作成・実行し、アプリケーション上のユーザートランザクションを積極的にシミュレートし、システムの全てのレイヤーで内部および外部ネットワークエンドポイントを監視することができます。エラーの検出、回帰の特定、ロールバックの自動化により、本番環境での問題の顕在化を防止することができます。

## RUM & セッションリプレイ

Datadog [Real User Monitoring][18] (RUM) では、ユーザーの活動や体験をリアルタイムに視覚化し、分析することが可能です。[セッションリプレイ][19]を使用すると、ユーザーの Web ブラウジングセッションをキャプチャして表示し、ユーザーの行動をよりよく理解することができます。RUM エクスプローラーでは、ロードタイム、フロントエンドエラー、ページの依存関係を視覚化できるだけでなく、ビジネスとアプリケーションのメトリクスを関連付け、アプリケーション、インフラストラクチャー、ビジネスのメトリクスの問題を 1 つのダッシュボードでトラブルシューティングすることができます。

## ディメンショニング

Datadog [Cloud SIEM][21] (Security Information and Event Management) は、アプリケーションやインフラストラクチャーに対する脅威を自動検出します。たとえば、標的型攻撃、脅威のインテルリストに一致するシステムと通信する IP、安全でないコンフィギュレーションなどがあります。こうした脅威は、Datadog でセキュリティシグナルとして表面化され、セキュリティエクスプローラーで相関およびトリアージできます。

## ログ管理

[Datadog ログ管理][5]を使用すると、アプリケーションとインフラストラクチャーによって生成されたすべてのログを送信して処理できます。インデックスを作成せずに、Live Tail を使用してリアルタイムにログを観察できます。アプリケーションとインフラストラクチャーからすべてのログを取り込み、フィルターを使用して動的にインデックス化するものを決定し、それらをアーカイブに保存できます。


## モバイル版 Datadog

[Apple App Store][24] と [Google Play Store][25] で提供されている [Datadog モバイルアプリ][23]は、オンコールエンジニアやビジネスユーザーが、ノートパソコンを開かずにサービスの状態をフォローし、問題を迅速にトリアージするための重要なデータを提供します。組織のダッシュボード、モニター、インシデント、SLO などに、モバイルデバイスから直接アクセスできます。

{{< img src="getting_started/application/mobile-app-store-screens.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS 向けモバイルアプリ">}}

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com
[2]: http://www.datadoghq.com/integrations
[3]: /ja/api/
[4]: https://github.com/DataDog/datadog-agent
[5]: /ja/logs/
[6]: /ja/tracing/
[7]: /ja/infrastructure/
[8]: /ja/getting_started/tagging/
[9]: /ja/infrastructure/hostmap/
[10]: /ja/service_management/events/
[11]: /ja/service_management/events/explorer/analytics
[12]: /ja/dashboards/
[13]: /ja/dashboards/#screenboards
[14]: /ja/dashboards/functions/arithmetic/
[15]: /ja/dashboards/functions/
[16]: /ja/monitors/
[17]: /ja/network_monitoring/performance/
[18]: /ja/real_user_monitoring/
[19]: /ja/real_user_monitoring/session_replay/browser/
[20]: /ja/serverless
[21]: /ja/security/cloud_siem/
[22]: /ja/synthetics/
[23]: /ja/service_management/mobile/
[24]: https://apps.apple.com/app/datadog/id1391380318
[25]: https://play.google.com/store/apps/details?id=com.datadog.app