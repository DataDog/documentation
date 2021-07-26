---
title: SLO を使用したウェブサイトのアップタイムの監視
kind: ガイド
aliases:
  - /ja/graphing/guide/uptime-percentage-widget
  - /ja/dashboards/guide/uptime-percentage-widget
further_reading:
  - link: /monitors/monitor_uptime_widget/
    tag: ドキュメント
    text: モニターアップタイムウィジェット
  - link: /synthetics/
    tag: ドキュメント
    text: Synthetic の監視
---
## 概要

社内外の顧客とのサービスレベル合意を維持するために、アップタイム率を測定しなければならないことがよくあります。Datadog の [Synthetic モニタリング][1] と [SLO ウィジェット][2]を使用して測定する方法を、以下で説明します。ウェブサイト `http://example.com/` を例として使用します。

## Synthetic テストの作成

`http://example.com/` に新しい [Synthetic API テスト][3]を作成します。

1. [新しい Synthetic API テストページに移動します][4]。
2. **URL** フィールドに `http://example.com/` と入力します。
3. **Test URL** をクリックして、ウェブサイトの健全性に関するアサーションを自動的に入力します。

    {{< img src="synthetics/guide/uptime_slo/synthetics_test_config.png" alt="Synthetic テスト構成" >}}

4. これらのアサーションを微調整して SLI に一致させ、テストの再試行ポリシーを定義します。この例では、1 回の再試行後でも半数以上の場所が失敗した場合、サイトがダウンしていると見なします。

    {{< img src="synthetics/guide/uptime_slo/synthetics_test_assertions.png" alt="Synthetic テストアサーション" >}}

5. 任意 - [詳細な通知メッセージを定義します][5]:

    {{< img src="synthetics/guide/uptime_slo/synthetics_message.png" alt="Synthetic テストメッセージ" >}}

## SLO ウィジェットコンフィギュレーション

### SLO を作成する

1. [新しい SLO を作成][6]して、Synthetic テスト結果に基づいてウェブサイトのアップタイムを追跡します。
2. **Monitor based** を選択し、Synthetic テスト名を入力します。

    {{< img src="synthetics/guide/uptime_slo/slo_config.png" alt="SLO 構成" >}}

3. 達成したいターゲットを定義します。

    {{< img src="synthetics/guide/uptime_slo/slo_target.png" alt="SLO ターゲット" >}}

4. SLO の詳細を表すためにタイトルとメッセージを設定して SLO 構成を終了します。

    {{< img src="synthetics/guide/uptime_slo/slo_notif.png" alt="SLO 通知" >}}

5. Save をクリックします。

### ダッシュボードに SLO をインポートする

1. [新しいダッシュボードを作成][7]して SLO ウィジェットをホストします。
2. SLO サマリーウィジェットをボードにドラッグアンドドロップします。
3. 上記で定義した SLO を選択します。

    {{< img src="synthetics/guide/uptime_slo/slo_selection.png" alt="SLO ウィジェット選択" >}}

4. SLO ウィジェットをニーズに合わせてカスタマイズします。

    {{< img src="synthetics/guide/uptime_slo/slo_widget_configs.png" alt="SLO ウィジェット構成" >}}

5. 最後にウィジェットの説明的なタイトルを入力し、**Done** をクリックして終了します。

    {{< img src="synthetics/guide/uptime_slo/final_dashboard.png" alt="最終ダッシュボード" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/
[2]: /ja/dashboards/widgets/slo/
[3]: https://app.datadoghq.com/synthetics/list
[4]: https://dd-corpsite.datadoghq.com/synthetics/create
[5]: /ja/monitors/notifications/
[6]: https://app.datadoghq.com/slo/new
[7]: https://app.datadoghq.com/dashboard/lists