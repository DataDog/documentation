---
title: アラート設定
kind: documentation
disable_sidebar: true
aliases:
  - /ja/guides/monitors/
  - /ja/guides/monitoring/
  - /ja/guides/alerting/
  - /ja/guides/monitors/the-conditions
description: 「アラート設定プラットフォームを使用して、モニターを作成し、必要な時にチームへ通知してモニターを管理」
further_reading:
  - link: https://www.datadoghq.com/blog/monitoring-101-alerting/
    tag: ブログ
    text: モニター入門 重要事項をアラート
  - link: /api/v1/monitors/
    tag: Documentation
    text: Datadog モニター API
---
すべてのインフラストラクチャーを 1 か所から監視していても、重要な変更が発生したことを知る機能がなければ完全とは言えません。Datadog には、メトリクス、インテグレーションのアベイラビリティー、ネットワークエンドポイントなどをアクティブにチェックするモニターを作成する機能が用意されています。

アラート設定プラットフォームで、モニターの構成やチームへの通知など、アラート管理を一か所で実現。

## モニターの作成

{{< img src="/monitors/create.png" alt="モニターの作成" style="width:90%;">}}

[モニターの構成][1]: メトリクス、イベント、ログ、インテグレーション、可用性、ネットワークエンドポイントなどを監視できるモニターを作成します。

## チームへの通知

{{< img src="/monitors/notify.png" alt="モニターが警告を作成したら通知" style="width:90%;">}}

[モニターの通知][2]: モニターの作成時に通知を設定すると、問題が起きたらチームに知らせることができます。適切なメンバーに通知を送信し、テンプレート変数を利用して詳細を含め、メールや Slack で送信する際はスナップショットを添付。アプリケーションの保守中は、アラートをミュートする[ダウンタイム][3]を作成します。

## モニターの管理

{{< img src="/monitors/manage.png" alt="すべてのモニターアラートを管理" style="width:90%;">}}

[モニターの管理][4]: 一か所で、すべてのモニターを編集、クローン作成、ミュート、解決できます。高度なファセット検索を使用すれば、優先度の高いアラートに集中できます。モニターステータスページで、モニターの詳細やアラート履歴を確認できます。

## その他のセクション

{{< whatsnext desc=" ">}}
    {{< nextlink href="/monitors/service_level_objectives" >}}<u>サービスレベル目標</u>: メトリクスまたは既存の Datadog モニターを使用して、サービスレベル目標を作成、編集または表示します。{{< /nextlink >}}
    {{< nextlink href="/monitors/incident_management" >}}<u>インシデント管理</u>: インシデントの宣言と管理。{{< /nextlink >}}
    {{< nextlink href="/monitors/guide" >}}<u>ガイド</u>: モニターのおよびアラート設定に役立つその他の記事。{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/create
[2]: /ja/monitors/notify
[3]: /ja/monitors/notify/downtimes
[4]: /ja/monitors/manage