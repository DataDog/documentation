---
description: カスタム User-Agent 文字列でブラウザテストの手順を記録する
further_reading:
- link: /synthetics/browser_tests/test_steps
  tag: ドキュメント
  text: ブラウザテストの手順について学習する
- link: /synthetics/browser_tests/advanced_options/
  tag: ドキュメント
  text: 手順の高度なオプションを設定する
title: カスタム User-Agent で手順を記録する
---
## 概要 {#overview}

一部の実装では、特定の `User-Agent` 文字列を使用している場合にのみ、アプリケーションが特定の方法でレンダリングされることがあります (例: モバイル `User-Agent` を使用している場合)。このような場合は、アプリケーションでブラウザテストの手順を記録できるように、`User-Agent` ヘッダーをカスタム文字列に設定する必要があります。そのためには、以下の作業を行います。

1. ブラウザテストレコーダーの [{{< ui >}}Open in Popup{{< /ui >}}] をクリックして、アプリケーションをポップアップで開きます。
2. Chrome 開発ツールを開きます。
3. 縦に並んだ 3 つの点のメニューボタンをクリックします。
4. [{{< ui >}}More tools - Network conditions{{< /ui >}}] オプションを選択します。
5. [{{< ui >}}Network conditions{{< /ui >}}] タブに移動し、[{{< ui >}}Select automatically{{< /ui >}}] オプションを無効にします。
6. [{{< ui >}}Custom{{< /ui >}}] を選択し、目的の `User-Agent` 文字列を入力します。

**注:**テスト構成にヘッダーとして追加することで、テスト実行時に [デフォルトの `User-Agent` 文字列][1] を上書きできます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/guide/identify_synthetics_bots/?tab=browsertests#user-agent