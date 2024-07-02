---
aliases:
- /ja/guides/monitors/
- /ja/guides/monitoring/
- /ja/guides/alerting/
- /ja/guides/monitors/the-conditions
- /ja/monitoring
cascade:
  algolia:
    rank: 70
    tags:
    - alerts
    - alerting
    - monitoring
description: 「アラート設定プラットフォームを使用して、モニターを作成し、必要な時にチームへ通知してモニターを管理」
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Alerting
  tag: リリースノート
  text: Datadog Alerting の最新リリースをチェック！ (アプリログインが必要です)。
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: ブログ
  text: モニター入門 重要事項をアラート
- link: /api/v1/monitors/
  tag: Documentation
  text: Datadog モニター API
- link: https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/
  tag: ブログ
  text: GitHub Deployment Protection Rules と Datadog で品質チェックの失敗を検出する
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: 効果的なモニターの作成に関するインタラクティブなセッションに参加できます
- link: https://www.datadoghq.com/blog/aws-recommended-monitors/
  tag: ブログ
  text: AWS の推奨モニターであらかじめ構成されたアラートを有効にする
title: ログ管理
---

## 概要

すべてのインフラストラクチャーを 1 か所から監視していても、重要な変更が発生したことを知る機能がなければ完全とは言えません。Datadog には、メトリクス、インテグレーションのアベイラビリティー、ネットワークエンドポイントなどをアクティブにチェックするモニターを作成する機能が用意されています。

アラート設定プラットフォームで、モニターの構成やチームへの通知など、アラート管理を一か所で実現。

**注**: [Apple App Store][2] と [Google Play Store][3] で入手できる [Datadog モバイルアプリ][1]を使って、モバイルデバイスでモニターを表示および検索することができます。

## モニターの作成

Datadog でモニターを作成するには

1. [**Monitors** > **New Monitor**][4] の順に移動します。
1. アラートしたいテレメトリーの種類に対応するモニタータイプを選択します。一覧は[モニタータイプ][5]を参照してください。
1. [モニターの構成][6]: メトリクス、イベント、ログ、インテグレーションの可用性、ネットワークエンドポイントなどに関するアラート。

{{< img src="/monitors/create.png" alt="モニターの作成" style="width:90%;">}}

プログラムでモニターを作成するには、[Datadog API][7] または[コミュニティが維持するライブラリ][8]を参照してください。

## モニターのエクスポートとインポート
モニターをエクスポートするには
1. [**Manage Monitors**][9] ページで、エクスポートするモニターをクリックします。
1. Monitor Status ページが表示されます。
1. 設定歯車 (右上) をクリックし、メニューから **Export** を選択します。

モニターをインポートするには
1. [**Monitors** > **New Monitor**][4] の順に移動します。
1. ページ上部の [**Import from JSON**][10] をクリックします。
1. JSON モニター定義を追加し、**Save** をクリックします。

## チームへの通知

{{< img src="/monitors/notify.png" alt="モニターが警告を作成したら通知" style="width:90%;">}}

[モニターの通知][11]: モニターを作成する際に通知を設定し、問題をチームに知らせます。通知を適切な人々に送り、テンプレート変数を使って詳細を含め、メールや Slack でアラートを送信する際にスナップショットを添付します。アプリケーションの保守中は、アラートをミュートする[ダウンタイム][12]を作成します。

## モニターの管理

{{< img src="/monitors/manage.png" alt="すべてのモニターアラートを管理" style="width:90%;">}}

[モニターの管理][13]: 一か所で、すべてのモニターを編集、クローン作成、ミュート、解決できます。高度なファセット検索を使用すれば、優先度の高いアラートに集中できます。モニターステータスページで、モニターの詳細やアラート履歴を確認できます。

## タグポリシーによるモニタータグの制御

[モニタータグポリシー][14]は、Datadog モニターのタグとタグ値に対するデータ検証を実施します。次のルールのいずれかを追加して、予期しないタグを持つモニターが作成されないようにします。
- タグと指定された値が必要
- タグのみ必要
- オプションのタグと指定された値

## モバイルデバイスでモニターを閲覧・検索

[iOS と Android のモバイルフレンドリーなモニター][15]: [Apple App Store][2] および [Google Play Store][3] で入手可能な [Datadog モバイルアプリ][1]を使用して、任意の iOS または Android デバイスでモニターの表示、ミュート、ミュート解除を行えます。検索バーでクエリを書いて、リアルタイムでモニターをフィルタリングします。[Monitor Saved Views][16] を用いて、モバイルで数タップでモニターのコレクションにアクセスします。

{{< img src="monitors/monitors_mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="モバイルアプリでのモニター">}}

## その他のセクション

{{< whatsnext desc=" ">}}
    {{< nextlink href="/service_management/service_level_objectives" >}}<u>サービスレベル目標</u>: メトリクスまたは既存の Datadog モニターを使用して、サービスレベル目標を作成、編集または表示します。{{< /nextlink >}}
    {{< nextlink href="/monitors/incident_management" >}}<u>インシデント管理</u>: インシデントの宣言と管理。{{< /nextlink >}}
    {{< nextlink href="/monitors/guide" >}}<u>ガイド</u>: モニターのおよびアラート設定に役立つその他の記事。{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/mobile
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: https://app.datadoghq.com/monitors/create
[5]: /ja/monitors/types/
[6]: /ja/monitors/configuration
[7]: /ja/api/latest/monitors/
[8]: /ja/developers/community/libraries/#managing-monitors
[9]: https://app.datadoghq.com/monitors/manage
[10]: https://app.datadoghq.com/monitors/create/import
[11]: /ja/monitors/notify
[12]: /ja/monitors/downtimes
[13]: /ja/monitors/manage
[14]: /ja/monitors/settings/
[15]: /ja/service_management/mobile/?tab=ios#monitors
[16]: /ja/monitors/manage/search/#saved-view