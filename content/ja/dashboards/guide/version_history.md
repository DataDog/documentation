---
disable_toc: false
further_reading:
- link: /dashboards/
  tag: documentation
  text: Dashboards Overview
- link: /account_management/audit_trail/
  tag: documentation
  text: Audit Trail Overview
- link: https://www.datadoghq.com/blog/dashboards-notebooks-version-history/
  tag: blog
  text: Track changes to Datadog dashboards and notebooks with version history
title: Version History for Dashboards
---

## 概要
バージョン履歴は、ダッシュボードに加えられた変更を自動的に追跡し、以前のバージョンを保存してくれるため、誰が何を変更したのかを正確に確認することができます。以前のバージョンを確認したり、ダッシュボードを保存済みのバージョンに復元したり、任意のバージョンを複製して新しいダッシュボードを作成したりすることができます。

## 前提条件
デフォルトでは、すべてのダッシュボードで 30 日分のバージョン履歴が保持されます。以前のバージョンを見るには、過去 30 日以内に編集が行われている必要があります。

[監査証跡][1]を有効にすると、バージョン履歴が 30 日から 90 日に延長されます。監査証跡を有効にした後は、既存のすべてのダッシュボードで、30 ～ 90 日前の間に行われたすべての編集を見ることができます。

## バージョンの確認
個々のダッシュボードから、ページ右上の **Configure** をクリックし、**Version History** を選択します。保持期間内に編集がない場合、バージョン履歴は無効になります。

{{< img src="/dashboards/guide/version_history/configure_actions_version_history.png" alt="ダッシュボードの Configure Actions メニューで、バージョン履歴オプションを無効にした様子" style="width:50%;" >}}

Version History サイドパネルでは、各バージョンごとに以下の情報を確認できます。
- 変更を行った Datadog ユーザー
- 変更日時
- 変更の概要と、前のバージョンと比べた詳細な変更内容の説明

## バージョンのプレビュー
Version History サイドパネルから任意のバージョンをクリックすると、ダッシュボードをそのバージョンに復元した場合にどのように見えるかをプレビューすることができます。任意のバージョン上でクリックすると、変更箇所までスクロールされ、変更されたウィジェットやセルがハイライト表示されます。

**注**: 任意のバージョンをクリックしてプレビューしても、そのバージョンに復元するという選択を自ら行わない限り、変更内容は一切保存されず、他のユーザーに表示される内容にも影響を及ぼしません。

## バージョンの復元
ダッシュボードを以前のバージョンに復元するには、2 つの方法があります。

{{< img src="/dashboards/guide/version_history/dashboard_version_history_options.png" alt="Version History side panel shows past dashboard versions and ways to restore them." style="width:100%;" >}}

- Version History サイドパネルから復元するバージョンを決め、ユーザープロファイルの右側にあるケバブメニューをクリックし、**Restore this version** を選択します。
- Version History サイドパネルが開いた際に、ページ上部に **Restore this version** ボタンが表示されます。

バージョンを復元すると、すべてのユーザーを対象にダッシュボードがそのバージョンにアップデートされ、バージョン履歴には復元を示す新しいエントリが追加されます。これによって変更履歴が上書きされることはなく、引き続き保持期間内の任意のバージョンのプレビューと復元が可能です。

## バージョンの複製
現在のダッシュボードを変更せずに、以前のバージョンのコピーを作成したい場合は、バージョン履歴内の任意のバージョンからクローンを作成することができます。Version History サイドパネルからコピーしたいバージョンを決め、ユーザープロファイルの右側にあるケバブメニューをクリックして、**Clone** を選択します。

## バージョン履歴の保持

|                          | 保持期間    |
| -----------------------  | ------- |
| 監査証跡が**無効**な場合 | 30 日 |
| 監査証跡が**有効**な場合  | 90 日 |


[1]: /ja/account_management/audit_trail/

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}