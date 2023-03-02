---
kind: ガイド
title: RUM による Swift テストのインスツルメント
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

### 互換性

CI Visibility - RUM のインテグレーションは、以下のバージョンの `dd-sdk-swift-testing` と `dd-sdk-ios` でのみ利用可能です。

* `dd-sdk-swift-testing` >= 2.0.0
* `dd-sdk-ios` >= 1.10.0

### Swift テストと RUM

UI テストに dd-sdk-swift-testing をリンクし、テスト対象のアプリケーションが [RUM][1] を使用してインスツルメントされている場合、テスト結果と生成された RUM ブラウザセッションおよびセッションリプレイは自動的にリンクされます。テストの詳細サイドパネルに新しい **RUM Sessions** タブが表示されます。

{{< img src="ci/ci-swift-rum-session-tab.png" alt="テスト詳細のブラウザセッションタブ" style="width:100%;">}}

RUM セッションには、[RUM が通常収集する][2]データがすべて含まれているため、ユーザー名のエラーや予期せぬエラーなど、iOS テストで起こりうる問題をデバッグすることができます。

{{< img src="ci/ci-swift-rum-session-tab-errors.png" alt="テスト詳細のブラウザセッションタブエラー" style="width:100%;">}}

[1]: /ja/real_user_monitoring/ios/
[2]: /ja/real_user_monitoring/ios/data_collected/