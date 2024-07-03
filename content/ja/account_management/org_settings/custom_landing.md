---
title: Custom Organization Landing Page
---

## 概要

The Datadog organization landing page is the first page your users see when they log on to Datadog or navigate to the Datadog root page. Datadog sets a default landing page for your organization. If you use APM, Datadog sets the APM root as the landing page. If you don't use APM, then the list of dashboards is the default landing page.

デフォルトのページに代わるものとして、Datadog では管理者がダッシュボードを組織のランディングページとして設定することができます。カスタムランディングページは、大規模または小規模の組織がユーザーの説明を制御するのに役立ちます。

ユーザーが Datadog に初めてログオンしたときに表示させたい情報でダッシュボードをカスタマイズすることができます。[組織の設定][1]を使用して、そのダッシュボードを組織のカスタムランディングページとして設定します。

## カスタムランディングページを設定する

Datadog Admin Role または Org Management (`org_management`) 権限を持つユーザーのみが、組織のカスタムランディングページを設定することができます。

カスタムランディングページを設定するには、以下の手順で行います。

1. [組織の設定][1]に移動します。
2. From the tabs on the left, select [**Preferences**][2].
3. In the Datadog Homepage section, click **Individual Dashboard**.
4. ドロップダウンリストを使用して、ダッシュボードを選択します。
5. **Save** ボタンをクリックします。

## デフォルトのランディングページを使用する

Datadog Admin Role または Org Management (`org_management`) 権限を持つユーザーのみが、組織のランディングページを変更することができます。

APM ホームのランディングページをデフォルトに戻すには、以下の手順で行います。

1. [組織の設定][1]に移動します。
2. From the tabs on the left, select [**Preferences**][2].
3. In the Datadog Homepage section, click **Default: Dashboard List**.
4. **Save** ボタンをクリックします。

[1]: https://app.datadoghq.com/organization-settings/
[2]: https://app.datadoghq.com/organization-settings/preferences