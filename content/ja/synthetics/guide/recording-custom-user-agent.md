---
title: カスタムユーザーエージェントで手順を記録
description: カスタムユーザーエージェント文字列でブラウザテストの手順を記録
further_reading:
  - link: /synthetics/browser_tests/actions
    tag: ドキュメント
    text: ブラウザテストのステップについて
  - link: /synthetics/browser_tests/advanced_options/
    tag: ドキュメント
    text: ステップに高度なオプションを構成する
---
一部の実装では、特定の `User-Agent` 文字列を使用した時のみ（たとえば、`User-Agent` を使用しているとき）アプリケーションがレンダリングされます。この場合、アプリケーションでブラウザテストの手順を記録できるよう `User-Agent` ヘッダーをカスタム文字列に設定する必要があります。

1. ブラウザテストレコーダーの **Open in Popup** をクリックして、アプリケーションをポップアップで開きます。
2. Chrome デベロッパーツールを開きます。
3. 三点リーダーのメニューボタンをクリックします。
4. **More tools - Network conditions** オプションを選択します。
5. **Network conditions** タブで **Select automatically** オプションを無効にします。
6. **Custom** を選択し、対象の `User-Agent` 文字列を入力します。

**注:** テストコンフィギュレーションでヘッダーとして追加することで、[デフォルトの `User-Agent` 文字列][1]をテスト実行時に上書きできます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/guide/identify_synthetics_bots/?tab=apitests#default-headers