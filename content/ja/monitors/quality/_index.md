---
title: 品質の監視
disable_toc: false
further_reading:
- link: "https://app.datadoghq.com/monitors/quality"
  tag: App
  text: Datadog Monitor Quality
- link: /monitors/
  tag: Documentation
  text: Learn more about Datadog monitors
---

## 概要

Datadog の Monitor Quality 機能は、60 日以上ミュートされているアラートや、指定された受信者がいないモニターなど、モニタリング設定の一般的な誤構成を特定します。これにより、チームはアラートの基準を維持し、重要なアラートを見逃さないようにします。Monitor Quality を使用して、誤構成されたモニターを一つのページで特定し、解決します。

## 誤構成モニターの表示

[**Manage Monitors**][8] ページから [**Monitor Quality**][7] タブをクリックして、改善が必要なモニターのリストにアクセスします。Datadog は、最初のモニターを作成すると、自動的にこの機能を有効にします。

チーム、クリエーター、サービス、環境に基づいて [Monitor Quality ページ][7]をフィルタリングして表示し、リストを整理して管理します。

{{< img src="monitors/quality/filter_monitor_quality.png" alt="Monitor Quality ページで利用できるクリエーター、チーム、サービス、環境のフィルタリングドロップダウンオプション" style="width:100%;" >}}

## モニターを改善してベストプラクティスに従う

Monitor Quality には、以下の品質問題があるモニターが表示されます。
- [60 日以上ミュートされている](#muted-for-over-60-days)
- [受信者がいない](#monitors-are-missing-recipients)
- [遅延が発生していない](#missing-a-delay)
- [通知チャンネルの誤構成がある](#misconfigured-notification-channels)
- [複合条件モニターに構成要素がない](#composite-monitors-are-missing-constituents)
- [アラート状態が続いている](#stuck-in-alert-state)

### 60 日以上ミュートされている

[ダウンタイム][1]は、定期メンテナンス、計画停電、システムシャットダウン中、週末や夜間のアラートを停止するのに便利です。ただし、長期間 (60 日以上) ミュートされているモニターは、見落としを示している可能性があります。これらのモニターのミュートを解除してアラートを再開し、包括的な監視を確保します。

ダウンタイムの誤構成によりアラートが出ていないモニターを確認し、ミュートを解除します。

### モニターに受信者がいない

モニターがアラートや通知を発信する場合、解決してアクションを実行できるチームや担当者に送信する必要があります。[モニター通知][2]に受信者が追加されていない場合、サービスの積極性が低下します。受信者がいないモニターを確認するには、Monitor Quality ページを使用します。

### 遅延が発生していない

クラウドインテグレーション (AWS、Azure、Google Cloud など) からのデータは、各 API からクローラーで取得されます。これらのメトリクスには遅延が発生しますが、モニターの構成で考慮できます。[評価遅延][3]がないクラウドデータのモニターは、誤検出でアラートする可能性があります。

クラウドデータをクロールしているが、推奨される遅延がないすべてのモニターを確認してください。クロールされたデータの詳細については、[クラウドメトリクスの遅延][4]ページを参照してください。

### 通知チャンネルの誤構成

[`@notifications`][5] を使用すると、アラートをインテグレーション、ワークフロー、Datadog ケースに転送するようにモニターをカスタマイズできます。`@notifications` が誤構成されていると、期待したアラートが適切なチャンネルに送信されません。

通知チャンネルが誤構成されているモニターを確認し、必要に応じて編集してください。

### 複合条件モニターに構成要素がない

[複合条件モニター][6]は、ユーザー定義のロジックに従って、複数のサブモニター (構成要素) の複合状態を評価します。削除された構成要素を参照する複合条件モニターは、評価も通知も行いません。非アクティブな複合条件モニターを特定し、削除してください。

### アラート状態が続いている

`ALERT` 状態のモニターは、サービス内に問題があり、注意が必要であることを示しています。複数のモニターが常に `ALERT` 状態にあると、実際に注意を払う必要がある問題から焦点が離れてしまいます。これらのモニターがアラート状態が続いている理由を調査し、それに応じて構成を編集してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/downtimes/
[2]: /monitors/notify/
[3]: /monitors/configuration/?tab=thresholdalert#evaluation-delay
[4]: /integrations/guide/cloud-metric-delay/
[5]: /monitors/notify/#notifications
[6]: /monitors/types/composite/
[7]: https://app.datadoghq.com/monitors/quality
[8]: https://app.datadoghq.com/monitors/manage
