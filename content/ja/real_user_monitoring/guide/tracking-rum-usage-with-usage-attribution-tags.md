---
aliases:
- /ja/real_user_monitoring/guide/track-rum-usage-with-attribution-tags/
beta: true
description: カスタム属性タグによる RUM の使用量の追跡方法について
further_reading:
- link: /account_management/billing/usage_attribution/
  tag: Documentation
  text: 計画と使用設定
kind: ガイド
title: 使用量属性タグによる RUM の使用量の追跡
---

## 概要

[Usage Attribution][1] ページでは、データの使用量と使用タイプに関連する情報と関数を提供します。デフォルトでは、データ使用量は、製品、組織、またはタグキーなどのより広いカテゴリーによって表示およびフィルタリングできます。このガイドでは、RUM の使用量属性を構成して、使用量属性ページでカスタムカテゴリー別に表示できるようにする方法を説明します (実際の値の ±20% 正確です)。これは、単一の集計数値を表示するのではなく、異なる部門、製品、またはその他のカテゴリーについて RUM セッションとコストを追跡するのに役立ちます。

例として、このガイドでは、部門別の RUM の使用量を追跡する方法を説明します。

## RUM 使用量属性を設定する

### タグを確認する

使用量のカテゴリーは、タグによって決定されます。RUM 使用量属性を設定する前に、Usage Attribution ページで使用したいタグが構成されていることを確認します。**Edit tags** をクリックし、使用量の表示に使用するタグを選択し、**Save** をクリックします。この例では、タグとして "department" を追加しています。

{{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/rum-use-attribution-tags-1.jpeg" alt="Usage Attribution ページでタグを確認する" style="width:100%;">}}

### RUM セッションにタグを追加する
使用量属性タグが構成されると、RUM セッションにタグを付けることができます。

**ブラウザセッション**にタグを設定するには、セッションの開始時 (`datadogRum.init` を呼び出した直後) に [`setGlobalContextProperty`][2] メソッドを使用して RUM グローバルコンテキストを設定します。例えば、マーケティング部門でセッションを追跡できるようにタグ付けする方法は以下のとおりです。

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
新たにタグ付けされたセッションは、[Usage Attribution][3] ページに表示されます。これで、Estimated RUM Sessions 列を確認すると、部門別のセッション数を確認することができます。

{{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/rum-use-attribution-tags-2.jpeg" alt="部門別の RUM 使用量を表示する" style="width:100%;">}}

使用量情報は、[`GetHourlyUsageAttribution`][4] エンドポイントでも入手できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/billing/usage-attribution
[2]: /ja/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#global-context
[3]: https://app.datadoghq.com/billing/usage-attribution
[4]: /ja/api/latest/usage-metering/#get-hourly-usage-attribution-v1
[5]: /ja/real_user_monitoring/android/advanced_configuration/?tab=kotlin#track-attributes