---
title: RUM によるブラウザテストのインスツルメント
kind: ガイド
aliases: /continuous_integration/guides/rum_integration/
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

### 互換性

CI Visibility - RUM のインテグレーションは、以下のバージョンの `cypress`、`dd-trace-js`、`browser-sdk` でのみ利用可能です。

* `cypress` >= 6.7.0
* `dd-trace-js` >= 1.7.0
* `browser-sdk` >= 3.11.0

**注**: 現在のところ、このインテグレーションは `cypress` のみサポートされています。

### ブラウザテストと RUM

ブラウザ テストに Cypress を使用し、テスト対象のアプリケーションが [RUM][1] を使用してインスツルメントされている場合、テスト結果と生成された RUM ブラウザセッションおよびセッションリプレイは自動的にリンクされます。テストの詳細サイドパネルに新しい **Browser Sessions** タブが表示されます。

{{< img src="ci/ci-browser-session-tab.png" alt="テスト詳細のブラウザセッションタブ" style="width:100%;">}}

RUM セッションには、[RUM が通常収集する][2]データがすべて含まれているため、予期せぬエラーなど、ブラウザテストで起こりうる問題をデバッグすることができます。

{{< img src="ci/ci-browser-session-tab-errors.png" alt="テスト詳細のブラウザセッションタブエラー" style="width:100%;">}}

[1]: /ja/real_user_monitoring/browser/
[2]: /ja/real_user_monitoring/browser/data_collected/