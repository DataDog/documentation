---
disable_toc: false
further_reading:
- link: integrations/statuspage/
  tag: ドキュメント
  text: Statuspage インテグレーションをインストールする
- link: https://app.datadoghq.com/integrations/statuspage
  tag: App
  text: アプリ内の Statuspage インテグレーションタイル
- link: monitors/guide/integrate-monitors-with-statuspage/
  tag: ガイド
  text: モニターと Statuspage のインテグレーション
- link: synthetics/guide/synthetic-test-monitors/#integrate-your-synthetic-test-monitor-with-statuspage
  tag: ガイド
  text: Synthetic テストモニターと Statuspage のインテグレーション
title: Datadog Incident Management に Statuspage を統合する
---

## 概要

Atlassian の Statuspage は、Web ページ上における組織のサービスのリアルタイムのステータスを伝えます。インテグレーションを有効にすると、Datadog の Incident Management プラットフォーム内で Statuspage のインシデントを自動的にリンクし、更新することができます。Incident Commander または Responder は次のことができます。
- 正確な最新情報が記載された顧客向けメッセージを送信する
- Datadog プラットフォームを離れることなくインシデントを調査しながら、Statuspage を更新する
- Datadog のインシデントとリンクされた Statuspage のインシデントを同時に解決する

## 前提条件

[Statuspage Integration タイル][1]からインテグレーションをインストールしてください。詳しくは、[Statuspage インテグレーション][2]のドキュメントを参照してください。

## セットアップ

1. [Integration Settings ページ][3]で Statuspage インテグレーションを探します。
1. **Enable Statuspage incident creation** をオンに切り替えます。

## Statuspage インシデントの追加

Statuspage インシデントを追加するには、Incidents Write と Integrations Read の権限を持つロールが必要です。

1. [Incidents ページ][4]で、既存のインシデントを開きます。
1. インシデントページ上部で **Add a Statuspage incident** をクリックします。
1. Select a Statuspage、Incident name、Incident statusなど、必須フィールドをすべて入力します。影響を受ける Statuspage コンポーネントを指定することもできます。 

{{< img src="service_management/incidents/guide/statuspage/add_update_statuspage_form.png" alt="Select a Statuspage、Incident name、Incident statusなどの必須フィールドを持つ、Statuspage インシデントを追加または更新するためのフォーム" style="width:70%;" >}}

## ステータスの更新

Statuspage がインシデントに追加された後は、インシデントが解決するまで Statuspage を更新し続けることができます。

{{< img src="service_management/incidents/guide/statuspage/update_status_modal.png" alt="リンクされている statuspage インシデントと Statuspage インシデントの更新オプションがハイライト表示されているインシデントの例" style="width:80%;" >}}

1. [Incidents ページ][4]で、更新したいインシデントを開きます。
1. 追加した Statuspage を見つけてボタンをクリックすると、統合モーダルが開きます。Statuspage との統合の解除や影響度の変更、Statuspage の更新が可能です。
1. **Update Statuspage** をクリックすると、リンクされた Statuspage の詳細が開くので、必要な修正を行います。
1. **Update** をクリックして Statuspage インシデントを更新します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/statuspage
[2]: /ja/integrations/statuspage/
[3]: https://app.datadoghq.com/incidents/settings#Integrations
[4]: https://app.datadoghq.com/incidents