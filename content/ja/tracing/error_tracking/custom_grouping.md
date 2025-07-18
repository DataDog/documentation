---
description: エラースパンを問題としてグループ化する方法をカスタマイズします。
further_reading:
- link: /tracing/error_tracking
  tag: Documentation
  text: バックエンドサービスのエラー追跡について
kind: documentation
title: カスタムグループ化
---

## 概要

エラー追跡は、デフォルトの戦略を使って、類似のエラーを問題としてインテリジェントにグループ化します。_カスタムフィンガープリンティング_を使えば、グループ化の決定を完全に制御し、エラースパンに対するグループ化の動作をカスタマイズすることができます。

エラー追跡がエラースパンを問題としてグループ化する際に使用できる`error.fingerprint` スパンタグを指定してください。 `error.fingerprint` 属性の値について特に形式や要件はありませんが、その中身は文字列でなければなりません。

`error.fingerprint` が指定されている場合、グループ化の動作は次のルールに従います。

* カスタムグループ化がデフォルトの戦略よりも優先されます。
* カスタムグループ化はエラースパンのサブセットにのみ適用可能で、デフォルトの戦略と共存できます。
* `error.fingerprint` の内容は、修正なしでそのまま使用されます。
* 同じサービスで発生し、同じ `error.fingerprint` 属性を持つスパンは、同じ問題としてグループ化されます。
* `service` 属性が異なるスパンは、別の問題としてグループ化されます。

## セットアップ

カスタムグループ化に必要なのは、1 つのエラースパンと、文字列で指定された 1 つの `error.fingerprint` スパンタグのみです。

まだ Datadog で APM トレースを収集していない場合は、[APM ドキュメント][1]を参照して APM をセットアップします。

### 例

すでに APM スパンを送信している場合は、エラースパンに新しい `error.fingerprint` タグを追加します。

Python での例を次に示します。

```python
with tracer.trace("throws.an.error") as span:
  span.set_tag('error.fingerprint', 'my-custom-grouping-material')
  raise Exception("Something went wrong")
```

例外発生時点でアクティブなスパンが存在する場合は、例外情報が捕捉され、スパンにアタッチされます。
この場合、エラー追跡でこれらのエラースパンを単一の問題としてグループ化するために `my-custom-grouping-material` が使用されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/