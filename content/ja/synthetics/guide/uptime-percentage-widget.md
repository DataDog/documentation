---
aliases:
- /ja/graphing/guide/uptime-percentage-widget
- /ja/dashboards/guide/uptime-percentage-widget
further_reading:
- link: /monitors/monitor_uptime_widget/
  tag: ドキュメント
  text: モニターアップタイムウィジェット
- link: /getting_started/synthetics/
  tag: ドキュメント
  text: Synthetic モニタリングの概要
kind: ガイド
title: SLO を用いて Web サイトのアップタイムを監視する
---

## 概要

外部または内部の顧客とのサービスレベル契約を維持するためには、多くの場合、アップタイム率の測定が必要です。

このガイドでは、Datadog [Synthetic Monitoring][1] と [SLO ウィジェット][2]を使って、Web サイトの例として `http://example.com/` を使ってそれを実現する方法を説明します。

## Synthetic テストを作成する

`http://example.com/` を使って [Synthetic API テスト][3]を作成するには、[単一の API テストを作成する][4]を参照してください。

**Test URL** をクリックすると、Web サイトの健全性に関するアサーションが表示されます。SLI に合うようにアサーションを調整します。

## SLO ウィジェットを構成する

### SLO を作成する

1. [新しい SLO を作成][5]して、Synthetic テスト結果に基づいてウェブサイトのアップタイムを追跡します。
2. **Monitor Based** を選択し、Synthetic テスト名を入力します。

    {{< img src="synthetics/guide/uptime_slo/slo_config.png" alt="SLO 構成" >}}

3. 達成したいターゲットを定義します。

    {{< img src="synthetics/guide/uptime_slo/slo_target.png" alt="SLO ターゲット" >}}

4. 名前、メッセージ、タグを入力し、SLO の追加情報を指定します。

    {{< img src="synthetics/guide/uptime_slo/slo_notif.png" alt="SLO 通知" >}}

5. **保存**をクリックします。

### ダッシュボードに SLO をインポートする

1. [新しいダッシュボードを作成][6]して SLO ウィジェットをホストします。
2. SLO サマリーウィジェットをボードにドラッグアンドドロップします。
3. 上記で定義した SLO を選択します。

    {{< img src="synthetics/guide/uptime_slo/slo_selection.png" alt="SLO ウィジェット選択" >}}

4. SLO ウィジェットをニーズに合わせてカスタマイズします。

    {{< img src="synthetics/guide/uptime_slo/slo_widget_configs.png" alt="SLO ウィジェット構成" >}}

5. ウィジェットの説明的なタイトルを入力し、**Done** をクリックします。

    {{< img src="synthetics/guide/uptime_slo/final_dashboard.png" alt="最終ダッシュボード" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/
[2]: /ja/dashboards/widgets/slo/
[3]: https://app.datadoghq.com/synthetics/create
[4]: /ja/getting_started/synthetics/api_test#define-request
[5]: https://app.datadoghq.com/slo/new
[6]: https://app.datadoghq.com/dashboard/lists