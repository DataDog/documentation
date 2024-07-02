---
aliases:
- /ja/synthetics/faq/clone-test/
further_reading:
- link: /synthetics/
  tag: ドキュメント
  text: Synthetic モニタリングについて
title: Synthetic テストの複製
---

## 概要

Synthetics テストを複製するには、UI または API のエンドポイントを使用します。

## UI を使用する

1. Synthetics テストで、右側の **Gear** アイコンをクリックします。
2. ドロップダウンメニューの **Clone** をクリックします。

{{< img src="synthetics/faq/clone-test.mp4" alt="Synthetic テストの複製" video="true" width="90%" >}}

## API を使用する

1. 関連するエンドポイントを使用して、テストの構成を取得します。[API テストの取得][1]または[ブラウザテストの取得][2]を参照してください。
2. 必要に応じて修正 (URL やタグの変更など) を行ってください。
3. 更新したテスト構成と該当するエンドポイントを送信します。[API テストの作成][3]または[ブラウザテストの作成][4]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/synthetics/#get-a-browser-test
[2]: /ja/api/latest/synthetics/#get-an-api-test
[3]: /ja/api/latest/synthetics/#create-an-api-test
[4]: /ja/api/latest/synthetics/#create-a-browser-test