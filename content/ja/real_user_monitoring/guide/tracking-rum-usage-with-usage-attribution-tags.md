---
aliases:
- /ja/real_user_monitoring/guide/track-rum-usage-with-attribution-tags/
beta: true
description: カスタム属性タグによる RUM の使用量の追跡方法について
further_reading:
- link: /account_management/billing/usage_attribution/
  tag: Documentation
  text: 計画と使用設定
title: 使用量属性タグによる RUM の使用量の追跡
---

## 概要

[Usage Attribution][1] ページでは、データの使用量と使用タイプに関連する情報と機能を提供します。デフォルトでは、データ使用量は、製品、組織、またはタグ キーなどのより広いカテゴリー単位で表示およびフィルタリングできます。組織ごとに最大 3 つの使用量属性タグを定義し、各 RUM アプリケーションの UI から直接管理することができます。

このガイドでは、以下の方法について説明します。

- RUM の使用量属性を構成して、Usage Attribution ページでカスタム カテゴリー別に表示できるようにする方法 (精度は実際の値の±20%以内)。これにより、単一の集計数値を表示するのではなく、異なる部門、製品、またはその他のカテゴリーについて RUM セッションとコストを追跡できます。
- 組織レベルでのタグの設定を必須化する方法 (推奨)。

例として、このガイドでは、部門別の RUM の使用量を追跡する方法を説明します。

## RUM 使用量属性を設定する

RUM 使用量属性タグは SDK レベルで設定できます。

### タグを確認する

使用量のカテゴリーは、タグによって決定されます。RUM 使用量属性を設定する前に、Usage Attribution ページで使用したいタグが構成されていることを確認します。**Edit tags** をクリックし、使用量の表示に使用するタグを選択し、**Save** をクリックします。この例では、タグとして "department" を追加しています。

{{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/rum-use-attribution-tags-1.jpeg" alt="Usage Attribution ページでタグを確認する" style="width:100%;">}}

**ブラウザ セッション**にタグを設定するには、セッションの開始時 (`datadogRum.init` を呼び出した直後) に [`setGlobalContextProperty`][3] メソッドを使用して RUM グローバル コンテキストを設定します。例えば、マーケティング部門でセッションを追跡できるようにタグ付けする方法は以下のとおりです。

```javascript
datadogRum.setGlobalContextProperty('department', 'marketing');
```

**モバイルセッション**用のタグを設定するには、[`addAttribute`][5] メソッドを使用します。以下はその例です。

```
//Android
GlobalRumMonitor.get().addAttribute("department", "marketing")

//iOS
RumMonitor.shared().addAttribute(forKey: "department", value: "marketing")
```

**注**: いくつかのタグはデフォルトで含まれています (`service`、`env`、`version`、`application.id`、`application.name`)。それ以外のタグについては、上記の方法でグローバルコンテキストを設定します。

このステップをデプロイすると、新しい RUM セッションは、追加したタグに従って追跡されます。

## RUM 使用量を表示する
新たにタグ付けされたセッションは、[Usage Attribution][1] ページに表示されます。Session Replay Sessions と RUM Sessions の列を見れば、部門別のセッション数を確認することができます。

{{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/rum-use-attribution-tags-3.png" alt="部門別の RUM 使用量を表示する" style="width:100%;">}}

使用量情報は、[`GetHourlyUsageAttribution`][5] エンドポイントでも入手できます。

## 組織レベルでのタグの設定を必須化する

RUM アプリケーションで使用量属性タグを必須化し、Datadog の請求額への寄与を追跡します。この設定は、アプリケーションにインスツルメンテーションを追加したり、追加し直したりしなくても適用できます。この設定が有効な場合、Datadog で RUM アプリケーションを作成または更新する際にタグを設定する必要があります。

**注**: 属性タグがデータ レベル (SDK によって収集されたイベント内) とアプリケーション レベルの両方で設定されている場合、Datadog はアプリケーション レベルで設定された情報を使用します。

親組織と子組織を持ち、その両方で設定が適用される Datadog 環境では、それぞれに属性タグを設定する必要があります。たとえば、親組織で 3 つのタグが必須で、子組織で 2 つのタグが必須の場合、子組織は親組織のタグを継承し、子組織のアプリケーションあたりのタグ数は合計 5 つになります (この例では、親組織のアプリケーションで必須のタグは 3 つのみです)。

**注**: 親組織でタグが必須でない場合も、子組織は親組織からタグを継承します。

1. RUM Settings Write 権限があることを確認します。
2. **Digital Experience** > **Real User Monitoring** > **Manage Applications** > **Enforce Usage Attribution** に移動します。
3. **Enforce tags for usage attribution on all applications** (すべてのアプリケーションで使用量属性のタグを必須にする) のトグルをクリックして有効にします。これを有効にすると、すべてのタグが設定されている場合にのみ、アプリを作成または更新できます。

   {{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/enforce-usage-attribution-toggle-1.png" alt="アプリケーション レベルで使用量属性タグの設定を必須にするためのトグル。" style="width:100%;">}}

   この設定を有効にすると、以前に作成したアプリのタグ値が空になるため、手動で値を設定し直す必要があります。

### RUM アプリケーションの使用量属性タグの管理
使用量属性タグが必須化され、構成が完了すると、RUM セッションにタグを付けることができます。

UI でアプリケーションの使用量属性タグを管理するには

1. [RUM Application Management][2] ページに移動します。
2. 新しいアプリケーションの作成時やアプリケーションの更新時に、必須タグがいくつ追加されたかを確認することができます。
3. **Edit tags** をクリックして、[構成した使用量属性タグ][6]を割り当てます。
4. **Save Changes** をクリックします。

{{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/enforce-usage-attribution-tags.png" alt="タグを必須化した後に、必須の使用量属性タグを追加するためのプロンプト" style="width:60%;">}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/billing/usage-attribution
[2]: https://app.datadoghq.com/rum/list
[3]: /ja/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#global-context
[4]: /ja/api/latest/usage-metering/#get-hourly-usage-attribution-v1
[5]: /ja/real_user_monitoring/application_monitoring/android/advanced_configuration/?tab=kotlin#track-attributes
[6]: /ja/real_user_monitoring/guide/tracking-rum-usage-with-usage-attribution-tags/#check-your-tags