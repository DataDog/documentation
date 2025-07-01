---
disable_toc: false
further_reading:
- link: integrations/jira/
  tag: ドキュメント
  text: Jira インテグレーションをインストールする
- link: https://app.datadoghq.com/integrations/jira
  tag: App
  text: アプリ内の Jira インテグレーションタイル
title: Datadog インシデント管理に Jira を統合する
---

## 概要

Jira はソフトウェアチーム向けの課題・プロジェクト管理システムです。Datadog の Jira インテグレーションを使用すると、Datadog で課題やインシデントを作成し、Jira で作成された課題を Datadog イベントとして表示できます。

Datadog インシデント管理における Jira インテグレーションには、次のようなメリットがあります。
- **Improved Visibility**: すべてのステークホルダーがインシデントに即座に気づくようにし、より迅速な対応を可能にします。
- **Supporting Existing Workflows**: 現在のプロセスにシームレスに統合でき、Jira での作業計画や優先度の管理をより容易にします。
- **Customization at Your Fingertips**: 動的テンプレートを使うことで、Datadog の重大度を Jira の優先度にマッピングしたり、カスタムラベルを追加したり、動的なアサイン先を定義したりなど、さまざまなカスタマイズが可能です。

## 前提条件

チケットを自動作成するには、[Jira Integration タイル][1]からインテグレーションをインストールしてください。詳しくは、[Jira インテグレーション][2]のドキュメントを参照してください。

## セットアップ

1. [Integration Settings ページ][3]で Jira インテグレーションを探します。
2. **Automatically create a Jira Issue** のトグルをクリックします。
3. Jira 課題を自動作成するタイミングを指定する条件を追加します。この条件を空欄のままにすると、インシデントが発生した時点で Jira 課題が作成されます。
4. 動的変数を用いて Jira チケットの内容を決定するテンプレートを作成します。このテンプレートを使うと、重大度を Jira の優先度にマッピングしたり、ラベルを付与したり、動的に担当者を設定したりできます。動的変数は **string** 型の [Jira フィールド][5]でのみ機能します。

{{< img src="service_management/incidents/guide/jira/incident_jira_template.png" alt="Datadog インシデントから自動作成される Jira チケットのテンプレート例" style="width:80%;" >}}

インシデントが作成されると、対応する Jira インスタンスにも課題が作成されます。この Jira 課題には参照用として Datadog 上のインシデントへのリンクが含まれています。Jira 課題は [Integration Settings ページ][3]で定義されたテンプレートに基づいて、インシデントと一方向に同期されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/jira
[2]: /ja/integrations/jira/
[3]: https://app.datadoghq.com/incidents/settings#Integrations
[4]: https://app.datadoghq.com/incidents
[5]: https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type