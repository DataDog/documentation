---
aliases:
- /ja/monitors/monitor_types/watchdog
- /ja/monitors/create/types/watchdog/
description: アプリケーションとインフラストラクチャーの問題をアルゴリズムで検出する
further_reading:
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
- link: /watchdog/
  tag: ドキュメント
  text: Watchdog - アルゴリズムによるアプリケーションとインフラストラクチャーの問題の検出
title: Watchdog モニター
---

## 概要

[Watchdog][1] は、APM、インフラストラクチャー、ログのためのアルゴリズム機能です。メトリクスやログの傾向やパターンを継続的に観測し、非定型的な挙動を探すことで、潜在的な問題を自動的に検出するものです。

## モニターの作成

Datadog で [Watchdog モニター][2]を作成するには、メインナビゲーションを使用して次のように移動します: *Monitors --> New Monitor --> Watchdog*。

### アラートタイプの選択

このセクションでは、APM、インフラストラクチャー、ログアラートのいずれかを選択します。

{{< tabs >}}
{{% tab "APM" %}}

Watchdog がシステムのサービスまたはその子リソースの異常な動作を検出すると、APM アラートが作成されます。

{{< img src="/monitors/monitor_types/watchdog/watchdog-monitor-apm3.png" alt="APM 上の Watchdog モニターの構成" style="width:80%;">}}

### ソースを選択 {#select-sources-1}

以下を構成することでアラートするスコープを選択します。

**1. 定義済みセレクタ**
* Watchdog 異常のタイプ: エラーレート、レイテンシー、ヒット数、または APM アラート
* APM プライマリタグの値 (APM プライマリタグとセカンドプライマリタグの構成については、[プライマリタグをスコープに設定する][1]ページを参照)
* [APM サービス][2] (すべてのサービスを監視するには `Any services` を選択)
* サービスの [APM リソース][3] (サービスのすべてのリソースを監視するには `*` を選択)

**2. 追加フィルター**
* Watchdog イベントで利用可能な追加タグ (例えば `team`) をフィルタリングします
* ブール値およびワイルドカードをサポートしています
* 定義済みセレクタで使用可能なディメンションは、追加フィルターでは使用しないでください

**3. グループ化**
* [通知をグループ化][4]したいディメンション

選択が完了すると、モニター作成ページの上部にあるグラフに、選択した時間枠の中で一致した Watchdog イベントが表示されます。

[1]: /ja/tracing/guide/setting_primary_tags_to_scope/#environment
[2]: /ja/tracing/services/service_page/
[3]: /ja/tracing/services/resource_page/
[4]: /ja/monitors/configuration/?tab=thresholdalert#alert-grouping
{{% /tab %}}
{{% tab "Infrastructure" %}}

{{< img src="/monitors/monitor_types/watchdog/watchdog-monitor-infra-2.png" alt="インフラストラクチャー上の Watchdog モニターの構成" style="width:80%;">}}

### ソースを選択 {#select-sources-2}

以下を構成することでアラートするスコープを選択します。

**1. 定義済みセレクタ**
* カバーするインフラストラクチャーインテグレーション (すべてをカバーするには `Any Infrastructure alert` を選択。Watchdog インフラストラクチャーがカバーするインテグレーションの全リストは、[Watchdog の概要][1]を参照)
* 選択したインテグレーションで利用可能なタグ

**2. 追加フィルター**
* Watchdog イベントで利用可能な追加タグ (例えば `team`) をフィルタリングします
* ブール値およびワイルドカードをサポートしています
* 定義済みセレクタで使用可能なディメンションは、追加フィルターでは使用しないでください

**3. グループ化**
* [通知をグループ化][2]したいディメンション

選択が完了すると、モニター作成ページの上部にあるグラフに、選択した時間枠の中で一致した Watchdog イベントが表示されます。

[1]: /ja/watchdog/#overview
[2]: /ja/monitors/configuration/?tab=thresholdalert#alert-grouping
{{% /tab %}}
{{% tab "Logs" %}}

アラートは、エラーログの新しいパターンが検出されたこと、または既存のエラーログのパターンが増加したことを示します。

{{< img src="/monitors/monitor_types/watchdog/log_anomaly_monitor-3.png" alt="Watchdog モニターの編集画面では、アラートカテゴリーがログ、アラートタイプがログ異常、環境が本番、サービスが広告サーバー、モニターのタイトルが本番広告サーバーで異常検出となっています" style="width:55%;">}}

### ソースを選択 {#select-sources-3}

以下を構成することでアラートするスコープを選択します。

**1. 定義済みセレクタ**
* 環境 (すべての環境でアラートを出すには空のまま)。これらの値はログの `env` タグから取得されます
* サービス (すべてのサービスでアラートを出すには空のまま)。これらの値はログの `service` [予約属性][2]から取得されます
* ログソース (すべてのソースでアラートを出すには空のまま)。これらの値はログの `source` [予約属性][2]から取得されます
* ログステータス (すべてのステータスでアラートを出すには空のまま)。これらの値はログの `status` [予約属性][2]から取得されます
* ログ異常タイプ (`new Error` または `Spike in existing logs`) は、異常がエラーログの新しいパターンを記述しているか、エラーログの既存のパターンの増加を記述しているかを判定します

**2. 追加フィルター**
* Watchdog イベントで利用可能な追加タグ (例えば `team`) をフィルタリングします。
* ブール値およびワイルドカードをサポートしています
* 定義済みセレクタで使用可能なディメンションは、追加フィルターでは使用しないでください

**3. グループ化**
* [通知をグループ化][1]したいディメンション

選択が完了すると、モニター作成ページの上部にあるグラフに、選択した時間枠の中で一致した Watchdog イベントが表示されます。

[1]: /ja/monitors/configuration/?tab=thresholdalert#alert-grouping
[2]: /ja/logs/log_configuration/attributes_naming_convention/#reserved-attributes
{{% /tab %}}
{{< /tabs >}}

### Multistep API テスト

**Say what's happening** と **Notify your team** のセクションに関する詳しい説明は、[通知][3]のページを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/watchdog/
[2]: https://app.datadoghq.com/monitors#create/watchdog
[3]: /ja/monitors/notify/