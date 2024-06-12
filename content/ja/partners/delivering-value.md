---
description: Datadog にデータを流した後の推奨ステップ。
kind: documentation
private: true
title: 価値の提供
---

データの取り込みを設定した後、さらにいくつかのステップを踏むことで、クライアントにとっての価値を最大化することができます。ここでは、注目すべき主要な領域をいくつか紹介します。

## モニターとダウンタイムの設定

モニターとアラートは、検査や介入が必要な特定のシステムやサービスに人間の注意を向けさせます。アラートを生成するために、Datadog は以下を提供します。
- モニター - アラート条件の定義
- ダウンタイム - アラートを発生させたり抑制したりする時間帯

一般的なモニターの概念に慣れるために、以下の資料を参照してください。
- [アラート設定][1]
- [モニター入門 - 重要事項をアラート][2] (ブログ)
- [モニタリング入門][3] (トレーニング)

### モニターの移行

サービスプロバイダーは、しばしばクライアントを別のモニタリングまたは観測可能性プラットフォームから Datadog に移行する必要があります。このような場合、以前のソリューションのモニターを Datadog で複製することが論理的に思えるかもしれません。このアプローチでは、Datadog の最も有用な機能の多くが使用されないままになってしまうことがよくあります。特に、問題の検出と解決時間を改善したり、アラート疲労を軽減したりする機能は見逃せません。

移行プロジェクトを開始する前に、既存のアラートおよびしきい値の定義を確認し、以下の質問に回答してください。
- メトリクスに時間的な変動がありますか？[異常モニター][4]の方が良いかもしれません。
- メトリクスに負荷に応じた変動がありますか？メトリクスに負荷を示すメトリクスを組み合わせることで、[演算モニター][5]が最適なアプローチとなるかもしれません。例えば、あるサービスを利用するユーザーが多ければ、システムの負荷は高くなる可能性があります。
- メトリクスの絶対値は、変化率よりも重要ではないですか？[変化モニター][6]や[予測モニター][7]が最適なアプローチかもしれません。
- メトリクスの値そのものは、他のホストやエンティティの値と異なるかどうかよりも重要性が低いですか？例えば、クラスター内のあるノードが高いレイテンシーを経験しているのに、他のノードはそうでない場合などです。このようなシナリオでは、[外れ値モニター][8]が最適なアプローチとなります。
- 複数のメトリクスを組み合わせたものだけが、アクションを起こせる状況を示しますか？[複合条件モニター][9]は、スクリプトを必要としない解決策を提供します。

### プログラムモニター管理

サービスプロバイダーとして、あなたやクライアントのためのモニターの管理は、次のいずれかの方法でプログラム的に達成するのが最善です。
- [Datadog モニター API][10]
- Terraform
  - [Terraform を使った Datadog のリソース管理方法][11] (ビデオ)
  - [Terraform Datadog Provider を使って監視を自動化する][12] (HashiCorp Tutorial)

大量のモニターを簡単に管理するために、[モニターにタグを付ける][13]ことを徹底してください。

### 推奨モニター

クライアントが運用するテクノロジーで、自分があまり経験のないものに遭遇することがあります。Datadog は、新しいテクノロジーを迅速かつ自信を持って導入できるように、[推奨モニター][14]を提供しています。

モニターについて詳しくは、こちらをご覧ください。
- [モニターの管理][15]
- [モニター][16]
- [タグ値を使用したダイナミックアラートの作成][17] (ビデオ)
- [モニター設定の変更が反映されない][18]

### ダウンタイム

モニターやアラートに関する一般的な問題として、アラームや通知の過多によりアラームに対する感覚が鈍るアラート疲労があります。アラート疲労に対処する 1 つの方法は、誤検出アラートの数を制限することです。これは、計画的なシステムのシャットダウン、メンテナンス、アップグレードウィンドウなどの管理された状況において特に適切です。

Datadog のダウンタイムは、計画的 (またはアドホック) なメンテナンス時にモニターをミュートする方法をあなたやクライアントに提供します。

ダウンタイムの管理、特にプログラムによる管理について詳しくは、こちらをご覧ください。
- [ダウンタイム][19]
- [計画されたダウンタイムのために Datadog アラートをミュートする][20] (ブログ)
- [Datadog を Terraform で管理する][21] (ブログ)
- [ダウンタイム API][22]
- [ダウンタイムになったモニターからのアラートを防止する][23]

### 通知

通知に関する一般的なガイドラインをいくつか紹介します。
- 自由なアラート、慎重なページ
- 原因ではなく、症状に関するページ

Datadog は、あなたやクライアントが重要なアラートをユーザーに通知できるよう、様々なチャンネルを提供しています。

- メール通知
- 以下などのインテグレーション
  - [Slack][24]
  - [PagerDuty][25]
  - [Flowdock][26]
  - [ServiceNow][27]
  - [Google Chat][28]
  - [Microsoft Teams][29]
  - [その他にも多数あります][19]

また、汎用的な [Webhooks インテグレーション][30]を使用して、任意の REST API を呼び出すことができます。Webhooks インテグレーションを使用すると、ユーザーに通知するだけでなく、自動的な修復ワークフローをトリガーすることができます。

通知について詳しくは、こちらをご覧ください。
- [通知][31]
- [Webhooks と Twilio で SMS アラートを送る][32] (ブログ)

## ダッシュボードを使って視覚化を設定する

視覚化は、複雑な技術スタックや、収集された大量のメトリクスやイベントをクライアントに明確に伝えるための素晴らしい方法です。ダッシュボードは、あなたやクライアントがモニターから通知された潜在的な問題を調査するための自然な出発点です。

### すぐに使えるダッシュボード

Datadog は、Agent やクラウドインテグレーションをセットアップした瞬間に、新しく統合されたサービスやテクノロジーに対してすぐに使えるダッシュボードを自動的に有効にし、インサイトを即座に提供します。また、すぐに使えるダッシュボードの複製も可能で、カスタムダッシュボードの出発点として最適です。

### カスタムダッシュボードの構築

さまざまなペルソナに合わせたビジネス中心の視点を提供することで、さらなる価値を提供し、競合他社と差別化することができます。

ここでは、ダッシュボードを構築する際に考慮すべきダッシュボードのベストプラクティスを紹介します。
- 多すぎるリソースメトリクスよりも、ワークメトリクスに注目します。この違いを理解するには、[モニタリング入門: 正しいデータの収集][33] (ブログ) を参照してください。
- [イベントオーバーレイ][34]を活用し、メトリクスとイベントの関連付けを行います。
- ダッシュボードには、どのようなデータが表示され、ダッシュボードが問題を示している場合にどうすればよいか、[フリーテキスト情報][35]で注釈を付けます。

ダッシュボードについて詳しくは、こちらをご覧ください。
- [より良いダッシュボードの構築][36] (トレーニング)
- [Datadog ノートブック][37]機能を使って探索的にデータを集め、ダッシュボードを起草する
- [Datadog でデータセンターとネットワークを監視する][38] (ブログ)
- [関連するテンプレート変数を使う][39] (ブログ)
- [Datadog ダッシュボード API][40]
- [Terraform と Datadog で観測可能性をコードで構成する][41] (HashiCorp ウェビナー)

### Datadog にアクセスできないユーザー向けの視覚化

ビジネスモデルによっては、クライアント自身が Datadog にアクセスする必要がない場合があります。しかし、クライアントに Datadog の視覚化を提供したい場合があります。Datadog の視覚化を提供するには、次のオプションがあります。
- [ダッシュボードの共有][42]: 読み取り専用のダッシュボードへの公開 URL を共有することで、クライアントにステータスページを提供したり、個々のメールアドレスを使用してダッシュボードを非公開で共有することができます。
  - サービスプロバイダーとして、ビジネスはスケーラブルであることが必要です。[Datadog の API を使用した共有ダッシュボードの管理][40]は、最も効率的なアプローチです。
- 埋め込み可能なグラフ: クライアントポータルで Datadog の情報を表示する場合、埋め込み可能なグラフが有効です。パラメーターを使用すると、ニーズに合わせてデータをフィルターすることができます。詳細については、以下を参照してください。
  - [埋め込み可能なグラフ API][43]
  - [テンプレート変数による埋め込み可能なグラフ][44]

### サービスレベル目標の設定

クライアントに対して、サービスの品質やレベルを透明性のある形で継続的に提示することは、良いことです。サービスレベル目標 (SLO) は、クライアントに代わってサービス品質を監視・視覚化し、またクライアントが社内でサービスレベルに基づくレポーティングを実施する際にも有効な手段です。

SLO を設定・管理する際には、以下の資料が参考になるかと思われます。
- まずは、[サービスレベル目標入門: 効果的な SLO の確立][45] (ブログ) をご覧ください。
- [SLO チェックリスト][46]
- [Datadog で SLO を管理するためのベストプラクティス][47] (ブログ)
- [Datadog ですべての SLO のステータスを追跡する][48] (ブログ)
- [Datadog SLO API][49]

## Watchdog の使用

Watchdog は、アプリケーションやインフラストラクチャーの潜在的な問題を自動的に検出するアルゴリズム機能です。

Watchdog が新たな不正を検出したときに通知を受け取ることができる Watchdog モニターを、自社のスタッフやクライアントのために設定します。

詳しくは、[Watchdog][50] をご覧ください。

## 次のステップ

複数組織のアカウント設定において、Datadog プラットフォームの個々のクライアントおよび集計使用量を監視する方法を、[請求と使用量報告][51]でご確認ください。



[1]: /ja/monitors
[2]: https://www.datadoghq.com/blog/monitoring-101-alerting/
[3]: https://learn.datadoghq.com/courses/introduction-to-observability
[4]: /ja/monitors/create/types/anomaly/
[5]: /ja/monitors/guide/monitor-arithmetic-and-sparse-metrics/
[6]: /ja/monitors/create/types/metric/?tab=change
[7]: /ja/monitors/create/types/forecasts/?tab=linear
[8]: /ja/monitors/create/types/outlier/?tab=dbscan
[9]: /ja/monitors/create/types/composite/
[10]: /ja/api/latest/monitors/
[11]: https://www.youtube.com/watch?v=Ell_kU4gEGI
[12]: https://learn.hashicorp.com/tutorials/terraform/datadog-provider
[13]: https://www.datadoghq.com/blog/tagging-best-practices-monitors/
[14]: https://www.datadoghq.com/blog/datadog-recommended-monitors/
[15]: /ja/monitors/manage/
[16]: /ja/monitors/create/
[17]: https://www.youtube.com/watch?v=Ma5pr-u9bjk
[18]: /ja/monitors/guide/why-did-my-monitor-settings-change-not-take-effect/
[19]: /ja/monitors/notify/downtimes/
[20]: https://www.datadoghq.com/blog/mute-datadog-alerts-planned-downtime/
[21]: https://www.datadoghq.com/blog/managing-datadog-with-terraform/
[22]: /ja/api/latest/downtimes/
[23]: /ja/monitors/guide/prevent-alerts-from-monitors-that-were-in-downtime/
[24]: /ja/integrations/slack/?tab=slackapplication
[25]: /ja/integrations/pagerduty/
[26]: /ja/integrations/flowdock/
[27]: /ja/integrations/servicenow/
[28]: /ja/integrations/google_hangouts_chat/
[29]: /ja/integrations/microsoft_teams/
[30]: /ja/integrations/webhooks/
[31]: /ja/monitors/notify/
[32]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio/
[33]: https://www.datadoghq.com/blog/monitoring-101-collecting-data/
[34]: /ja/dashboards/widgets/timeseries/
[35]: /ja/dashboards/widgets/free_text/
[36]: https://learn.datadoghq.com/courses/building-better-dashboards
[37]: /ja/notebooks/
[38]: https://www.datadoghq.com/blog/network-device-monitoring/
[39]: https://www.datadoghq.com/blog/template-variable-associated-values/
[40]: /ja/api/latest/dashboards/
[41]: https://www.hashicorp.com/resources/configure-observability-as-code-with-terraform-and-datadog
[42]: /ja/dashboards/sharing/
[43]: /ja/api/latest/embeddable-graphs/
[44]: /ja/dashboards/guide/embeddable-graphs-with-template-variables/
[45]: https://www.datadoghq.com/blog/establishing-service-level-objectives/
[46]: /ja/monitors/guide/slo-checklist/
[47]: https://www.datadoghq.com/blog/define-and-manage-slos/
[48]: https://www.datadoghq.com/blog/slo-monitoring-tracking/
[49]: /ja/api/latest/service-level-objectives/
[50]: /ja/monitors/create/types/watchdog/
[51]: /ja/partners/billing-and-usage-reporting/