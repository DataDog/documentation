---
aliases:
- /ja/monitors/create/types/slo/
title: SLO アラート
---

## 概要

[サービスレベル目標][1] (SLO) は、サイト信頼性エンジニアリングツールキットの重要な要素です。SLO を使用し、アプリケーションのパフォーマンスに明確なターゲットを定義するためのフレームワークを整えることで、一貫したカスタマーエクスペリエンを提供したり、プラットフォームの安定性を保ちつつ機能を開発したり、内部および外部ユーザーとのコミュニケーションを改善するために役立てることができます。

## モニターの作成

Datadog で [SLO アラート][2]を作成するには、メインナビゲーションで *Monitors --> New Monitor --> SLO* の順に進みます。

### SLO を選択

[サービスレベル目標][1]を選択します。

### アラートの条件を設定する

2 種類のアラートが用意されています。

[エラーバジェットアラート][3]は、SLO のエラーバジェットが一定の割合で消費された場合に通知されます。

[バーンレートアラート][4] は、SLO エラーバジェットの消費率が、指定したしきい値を超え、一定期間継続した場合に通知されます。

### 通知

**Say what's happening** と **Notify your team** のセクションに関する詳しい説明は、[通知][5] のページを参照してください。

すべてのモニタータイプで利用可能な[標準テンプレート変数][6]に加えて、SLO アラートは以下の変数もサポートします。

| 変数   | 説明   |
| ---------- | ------------- |
| `{{timeframe}}` | SLO のタイムウィンドウ (7 日、30 日、90 日)。 |
| `{{value}}` | エラーバジェットの消費割合 (エラーバジェットアラートのみ)。 |
| `{{short_window_burn_rate}}` | ショートウィンドウで観測可能なバーンレート値 (バーンレートアラートのみ)。 |
| `{{long_window_burn_rate}}` | ロングウィンドウで観測可能なバーンレート値 (バーンレートアラートのみ)。 |

[1]: /ja/service_management/service_level_objectives/
[2]: https://app.datadoghq.com/monitors/create/slo
[3]: /ja/service_management/service_level_objectives/error_budget/
[4]: /ja/service_management/service_level_objectives/burn_rate/
[5]: /ja/monitors/notify/#overview
[6]: /ja/monitors/notify/variables/?tab=is_alert#template-variables