---
description: Synthetic テストで作成された Synthetic モニターについて説明します。
further_reading:
- link: /monitors/manage/
  tag: ドキュメント
  text: モニターの管理方法について
- link: /monitors/guide/integrate-monitors-with-statuspage/
  tag: ドキュメント
  text: モニターと Statuspage のインテグレーション方法について
- link: /synthetics/metrics/
  tag: ドキュメント
  text: Synthetic モニタリングメトリクスについて
title: Synthetic テストモニターを利用する
---

## 概要

Synthetic テストを作成すると、Datadog は自動的に関連するモニターを作成します。Synthetic テストのモニターがアラートを発する際の通知を設定することができます。

{{< img src="synthetics/guide/synthetics_test_monitors/synthetic_test_monitor.png" alt="Synthetic テストモニター" style="width:100%;">}}

## Synthetic テストモニターの作成

<div class="alert alert-info"><a href="/monitors/">モニター</a>で Synthetic テストモニターを作成またはインポートすることはできません。</div>

Synthetic テストが失敗したときに通知を送信するために、**Configure the monitor for this test** セクションでモニターを作成します。モニターは、作成した Synthetic テストに関連付けられ、Synthetic テストの構成で設定したアラート条件とリンクしています。モニターの属性とタグの変数を使用するには、[メトリクスモニター][1]を作成します。

{{< img src="synthetics/guide/synthetics_test_monitors/configure_the_monitor_for_this_test.png" alt="Synthetic テストでモニターを作成する" style="width:90%;">}}

モニター名をカスタマイズして、[**Manage Monitors**][2] ページで検索することができます。Synthetic テストモニターを見つけるには、検索バーで `type:synthetics` にフィルターをかけます。モニターの[条件変数][3]を使用して、テストの状態に基づいて通知メッセージを特徴付けることができます。

Synthetic テストモニターは、メール、Slack、Pagerduty、Microsoft Teams などの通知チャンネルとインテグレーションしています。詳しくは、[通知][4]を参照してください。

複数の通知レイヤーがある場合 (例えば、Synthetic テストがアラートを発している時間が長いほど多くのチームに通知する)、Datadog は Synthetic モニターで[再通知][5]を有効にすることを推奨しています。

## モニター通知をカスタマイズする

インシデント管理戦略によっては、Synthetic テストがアラートを出したときに、複数のチームを巻き込みたい場合があります。最初のアラート以降にチーム B に通知するには、チーム B への通知を `{{#is_renotify}}` と `{{/is_renotify}` で囲んでください。モニター属性に基づいて通知メッセージをさらに特徴付けるには、[条件変数][3]を使用します。

{{< img src="synthetics/guide/synthetics_test_monitors/renotification_toggle.png" alt="アラートモニターが再通知するまでの時間を選択します" style="width:90%;">}}

アラートモニターの再通知を有効にするには、`If this monitor stays in alert status renotify every` の左側のトグルをクリックし、ドロップダウンメニューから時間オプショ ンを選択します。

## Synthetic テストモニターと Statuspage のインテグレーション

[Atlassian Statuspage][6] を使用してアプリケーションやサービスの稼働状況を視覚化している場合、Synthetic テストモニターの通知でシステムのステータスを更新することができます。

{{< img src="synthetics/guide/synthetics_test_monitors/statuspage_monitor_setup.png" alt="Synthetic テストでモニター名に Statuspage のメールアドレスとステータスを追加する" style="width:95%;">}}

1. コンポーネント固有のメールアドレスを生成するには、[Statuspage ドキュメント][7]を参照してください。
2. 生成されたメールアドレスをテストの通知メッセージに追加します。例: `@custom-statuspage-email@notifications.statuspage.io`
3. テストの状態に応じて、`UP` または `DOWN` を返すようにモニター名をカスタマイズします。例: `{{#is_alert}}DOWN{{/is_alert}}{{#is_recovery}}UP{{/is_recovery}}`
4. モニター通知セクションに必要事項を記入し、モニター名にサマリーを追加します。例: `Shopist Checkout Functionality`
5. モニターの構成が完了したら、**Save & Exit** をクリックします。

詳しくは、[Statuspage とモニターのインテグレーション][8]をご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/types/metric/
[2]: /ja/monitors/manage/
[3]: /ja/monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: /ja/monitors/notify/#integrations/
[5]: /ja/monitors/notify/#renotify
[6]: https://support.atlassian.com/statuspage/
[7]: https://support.atlassian.com/statuspage/docs/get-started-with-email-automation/
[8]: /ja/monitors/guide/integrate-monitors-with-statuspage/