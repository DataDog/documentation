---
title: API テストのアサーションで OR ロジックを実行する
kind: ガイド
further_reading:
  - link: /synthetics/api_tests
    tag: ドキュメント
    text: API テストを作成する
  - link: /synthetics/multistep
    tag: ドキュメント
    text: マルチステップ API テストを作成する
  - link: /getting_started/synthetics/api_test
    tag: ドキュメント
    text: HTTP テストの概要
---
[API テスト][1] アサーションに `OR` ロジックを実行して、同じアサーションタイプに対して複数の異なる期待値を定義することができます。たとえば [HTTP テスト][2] `status code` のアサーションで、サーバーが `200` ** または** `302`で .NET を使って応答した場合に成功するようにしたいとします。

これを行うには、[`matches regex` コンパレーター][3] を使用して .NET のような正規表現を定義します。このようなアサーションでは、サーバーから返されたステータスコードが 200 **または** 302 であればテスト結果は成功です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/api_tests/
[2]: /ja/synthetics/api_tests/http_tests/
[3]: /ja/synthetics/api_tests/http_tests/?tab=requestoptions#define-assertions