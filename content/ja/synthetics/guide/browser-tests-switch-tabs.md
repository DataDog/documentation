---
title: ブラウザテストでタブを切り替えることはできますか？
kind: ガイド
further_reading:
  - link: synthetics/browser_tests
    tag: ドキュメント
    text: ブラウザテストの設定
  - link: /synthetics/browser_tests/actions
    tag: ドキュメント
    text: ブラウザテストの手順を作成
  - link: https://www.datadoghq.com/blog/test-creation-best-practices/
    tag: ブログ
    text: エンドツーエンドテスト作成のベストプラクティス
---
アプリケーションでブラウザテストによって実行されたアクション (リンクのクリックなど) によって、ブラウザテストで他のステップを実行させたい別のタブが開く場合は、すべてのステップを通常どおりに記録します。ブラウザテストでは、テストの実行時にタブを自動的に切り替えて、新しいタブでステップを実行できます。

**注:** 新しいページで[アサーション][1]を実行できるようにするには、最初にテストでページを操作する必要があります (たとえば、クリックを介して)。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/browser_tests/actions#assertion