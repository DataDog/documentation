---
title: モニター
disable_sidebar: true
aliases:
  - /guides/monitors/
  - /guides/monitoring/
  - /guides/alerting/
  - /guides/monitors/the-conditions
  - /monitoring
description: "アラートプラットフォームでのモニターの作成、通知と自動化の構成、モニター管理"
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Alerting"
    tag: "リリースノート"
    text: "Datadog Alerting の最新リリースをチェック！ (アプリログインが必要です)。"
  - link: "https://www.datadoghq.com/blog/monitoring-101-alerting/"
    tag: "ブログ"
    text: "モニター入門 重要事項をアラート"
  - link: "/api/v1/monitors/"
    tag: "Documentation"
    text: "Datadog モニター API"
  - link: "https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/"
    tag: "ブログ"
    text: "GitHub Deployment Protection Rules と Datadog で品質チェックの失敗を検出する"
  - link: "https://dtdg.co/fe"
    tag: "Foundation Enablement"
    text: "Join an interactive session on creating effective monitors"
  - link: "https://www.datadoghq.com/blog/aws-recommended-monitors/"
    tag: "ブログ"
    text: "AWS の推奨モニターであらかじめ構成されたアラートを有効にする"
cascade:
    algolia:
        rank: 70
        tags: ["alerts", "alerting", "monitoring"]

---

## 概要

すべてのインフラストラクチャーを 1 か所から監視していても、重要な変更が発生したことを知る機能がなければ完全とは言えません。Datadog には、メトリクス、インテグレーションのアベイラビリティー、ネットワークエンドポイントなどをアクティブにチェックするモニターを作成する機能が用意されています。

アラートプラットフォームで、モニターの構成、通知と自動化の設定、アラートの管理を一目で行います。

**注**: [Apple App Store][2] と [Google Play Store][3] で入手できる [Datadog モバイルアプリ][1]を使って、モバイルデバイスでモニターを表示および検索することができます。

## モニターの作成

Datadog でモニターを作成するには

1. [**Monitors** > **New Monitor**][4] の順に移動します。
1. アラートしたいテレメトリーの種類に対応するモニタータイプを選択します。一覧は[モニタータイプ][5]を参照してください。
1. [モニターの構成][6]: メトリクス、イベント、ログ、インテグレーションの可用性、ネットワークエンドポイントなどに関するアラート。

{{< img src="/monitors/create.png" alt="モニターの作成" style="width:90%;">}}

プログラムでモニターを作成するには、[Datadog API][7] または[コミュニティが維持するライブラリ][8]を参照してください。

## 通知と自動化の構成

{{< img src="/monitors/notify.png" alt="モニターが警告を作成したら通知" style="width:90%;">}}

モニター作成時に[モニター通知][11]をセットアップし、チームに問題を通知します。通知を適切な担当者にルーティングし、[ワークフローオートメーション][17]、[ケース][18]、[Datadog チームハンドル][19]を含め、テンプレート変数を活用して詳細を追加し、アラートをメールや Slack で送信する際にスナップショットを添付します。[ダウンタイム][12]を作成してアプリケーションメンテナンス中のアラートをミュートします。

## モニターの管理

{{< img src="/monitors/manage.png" alt="すべてのモニターアラートを管理" style="width:90%;">}}

モニターの編集、複製、削除、ミュート、解決をすべて同じ場所で行うことで、[モニターを管理][13]します。高度なファセット検索を使用して、優先度の高いアラートに焦点を絞ります。[Monitors List ページ][9]で、モニターの詳細とアラートを時系列で確認できます。

## モニターのエクスポートとインポート

モニターをエクスポートするには

1. [**Manage Monitors**][9] ページで、エクスポートするモニターをクリックします。
1. Monitor Status ページが表示されます。
1. 設定歯車 (右上) をクリックし、メニューから **Export** を選択します。

モニターをインポートするには

1. [**Monitors** > **New Monitor**][4] の順に移動します。
1. ページ上部の [**Import from JSON**][10] をクリックします。
1. JSON モニター定義を追加し、**Save** をクリックします。

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

[1]: /mobile
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: https://app.datadoghq.com/monitors/create
[5]: /monitors/types/
[6]: /monitors/configuration
[7]: /api/latest/monitors/
[8]: /developers/community/libraries/#managing-monitors
[9]: https://app.datadoghq.com/monitors/manage
[10]: https://app.datadoghq.com/monitors/create/import
[11]: /monitors/notify
[12]: /monitors/downtimes
[13]: /monitors/manage
[14]: /monitors/settings/
[15]: /service_management/mobile/?tab=ios#monitors
[16]: /monitors/manage/search/#saved-view
[17]: /monitors/notify/#workflows
[18]: /monitors/notify/#notifications
[19]: /monitors/notify/#teams