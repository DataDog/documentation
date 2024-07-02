---
title: Synthetic テストでキャッシュの問題を回避する
further_reading:
  - link: synthetics/browser_tests
    tag: ドキュメント
    text: ブラウザテストの設定
  - link: /synthetics/api_tests/http_tests
    tag: ドキュメント
    text: HTTP テストを構成する
---
## ブラウザテスト

ブラウザはそれぞれのテスト実行後に終了します。こうすることで、ブラウザテストでクライアントサイドのキャッシュ関連の問題が発生するのを回避することができます。

## API テスト

### HTTP テスト

[ローカル変数][1]を利用し、ランダムな文字列を生成してペイロードを送信したり、[HTTP テスト][2]がキャッシュシステムを使用していないことを確認できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/api_tests/http_tests?tab=requestoptions#create-local-variables
[2]: /ja/synthetics/api_tests/http_tests