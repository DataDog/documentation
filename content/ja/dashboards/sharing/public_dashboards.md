---
aliases:
- /ja/graphing/faq/is-there-a-way-to-share-graphs
- /ja/graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
- /ja/graphing/dashboards/shared_graph/
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: ブログ
  text: ダッシュボードを組織外の人と安全に共有する
- link: /dashboards/
  tag: ドキュメント
  text: Datadog でダッシュボードを作成
- link: /dashboards/template_variables/
  tag: ドキュメント
  text: テンプレート変数を使用してダッシュボードを強化
- link: /dashboards/widgets/
  tag: ドキュメント
  text: ダッシュボードのウィジェットについて
title: 公開ダッシュボード
---

## 概要

When you share a dashboard by URL or email link, the shared page shows live, read-only contents of that dashboard. When you generate a URL, you enable *Sharing*, and the dashboard becomes a **public dashboard**. Public dashboards refresh every 30 seconds and this [refresh rate][1] cannot be customized. 

**Note**: Widgets based on APM trace queries do not display data on public dashboards.

## パブリック URL でダッシュボードを共有する

ダッシュボード全体を公開して共有するには、次の URL を生成します。

1. ダッシュボードのページで、右上の **Share** をクリックします。
1. **Generate public URL** を選択すると、*Sharing: On* ポップアップモーダルが表示されます。
1. From the dropdown menu, select **Anyone with a link (public)**.
1. Click **Time & Variable Settings** to configure your desired options for the time frame and whether users can change it, as well as which tags are visible for selectable template variables. **Note**: At least one widget must be set to use [`Global Time`][2].
1. Click **Done** to return to the *Sharing: On* modal.
1. URL をコピーして、**Done** をクリックします。

**注**: APM トレースクエリに基づくウィジェットは、公開ダッシュボードにデータを表示しません。ログストリームウィジェットにもデータは表示されませんが、他のログベースのクエリには表示されます。

## ダッシュボードを個々のメールアドレスと共有する

To authorize one or more specific email addresses to view a dashboard page:

1. ダッシュボードのページで、右上の **Share** をクリックします。
2. Select **Generate public URL** or **Configure public URL**, which opens a *Sharing: On* pop-up modal.
3. From the dropdown menu, select **Only specified people**.
4. ダッシュボードを共有したい人のメールアドレスを入力します。
5. Under **Time & Variable Settings**, configure your desired options for the time frame and whether users can change it, as well as which tags are visible for selectable template variables. **Note**: At least one widget must be set to use [`Global Time`][2].
6. (オプション) URL をコピーして共有できます。指定されたメールアドレスにもリンク付きのメールが届きます。
7. **Done** をクリックします。

### View a shared dashboard

Individuals whose emails are added to the sharing list for a dashboard receive a link in their email. If the link isn't clicked on within one hour, they can request a new link on the dashboard landing page. If their email address is on the dashboard sharing list, a new email is sent.

After an individual clicks the emailed link, a device is authorized to see the dashboard for up to 30 days. After that time is expired, the user can request a new link on the dashboard landing page. If their email address is on the dashboard share list, a new email is sent.

If a user is removed from the dashboard share list, access is removed.

## 無効化

共有ダッシュボードへのアクセスを無効にするには

1. Navigate to the [Dashboard List][3].
2. アクセスを無効にするダッシュボードを選択します。
3. 右上の **Share** をクリックします。
4. **Configure public URL** をクリックします。
5. Click **Delete URL**.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/#refresh-rate
[2]: /ja/dashboards/widgets/#global-time-selector
[3]: https://app.datadoghq.com/dashboard/lists