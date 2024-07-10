---
aliases:
- /ja/continuous_integration/guides/rum_swift_integration
- /ja/continuous_integration/integrate_tests/swift_tests
- /ja/continuous_integration/tests/swift_tests
description: CI Visibility と RUM を使用して、Swift のテスト結果をブラウザセッションおよびセッションリプレイと連携させる方法をご紹介します。
further_reading:
- link: /continuous_integration/tests
  tag: ドキュメント
  text: Test Visibility について
- link: /real_user_monitoring/ios
  tag: ドキュメント
  text: RUM iOS と tvOS のモニタリングについて
kind: ドキュメント
title: RUM による Swift テストのインスツルメント
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

## 概要

[Test Visibility][3] がすでに Swift に設定されていることを確認してください。

### 互換性

CI Visibility - RUM のインテグレーションは、以下のバージョンの `dd-sdk-swift-testing` と `dd-sdk-ios` で利用可能です。

* `dd-sdk-swift-testing` >= 2.0.0
* `dd-sdk-ios` >= 1.10.0

## Swift テストとRUM の接続

UI テストに `dd-sdk-swift-testing` をリンクし、テスト対象のアプリケーションが[リアルユーザーモニタリング][1]を使用してインスツルメンテーションされている場合、テスト結果と生成された RUM ブラウザセッションおよびセッションリプレイは自動的にリンクされます。

Test Visibility のテスト詳細サイドパネルに、**RUM Sessions** タブが表示されます。

{{< img src="ci/ci-swift-rum-session-tab.png" alt="テスト詳細のブラウザセッションタブ" style="width:100%;">}}

RUM セッションには、[RUM が通常収集する][2]データがすべて含まれているため、ユーザー名のエラーや予期せぬエラーなど、iOS テストで起こりうる問題をデバッグすることができます。

{{< img src="ci/ci-swift-rum-session-tab-errors.png" alt="テスト詳細のブラウザセッションタブエラー" style="width:100%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/ios/
[2]: /ja/real_user_monitoring/ios/data_collected/
[3]: /ja/continuous_integration/tests/swift/