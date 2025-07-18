---
description: エラーログを問題としてグループ化する方法をカスタマイズします。
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: ブログ
  text: Datadog Error Tracking で、アプリケーションの問題を解明
- link: /logs/error_tracking/
  tag: ドキュメント
  text: ログのエラー追跡について
kind: documentation
title: カスタムグループ化
---

## 概要

エラー追跡は、デフォルトの戦略を使って、類似のエラーを問題としてインテリジェントにグループ化します。_カスタムフィンガープリンティング_を使えば、グループ化の決定を完全に制御し、エラーログに対するグループ化の動作をカスタマイズすることができます。

エラー追跡がエラーログを問題としてグループ化する際に使用できる`error.fingerprint` 属性を指定してください。 `error.fingerprint` 属性の値について特に形式や要件はありませんが、その中身は文字列でなければなりません。

`error.fingerprint` が指定されている場合、グループ化の動作は次のルールに従います。

* カスタムグループ化がデフォルトの戦略よりも優先されます。
* カスタムグループ化はエラーログのサブセットにのみ適用可能で、デフォルトの戦略と共存できます。
* `error.fingerprint`の内容は、修正なしでそのまま使用されます。
* 同じサービスで発生し、同じ `error.fingerprint` 属性を持つログは、同じ問題としてグループ化されます。
* `service` 属性が異なるログは、別の問題としてグループ化されます。

## セットアップ

カスタムグループ化に必要なのは、1 つのエラーログと、文字列で指定された 1 つの `error.fingerprint` 属性のみです。

Datadog でまだログを収集していない場合は、[ログドキュメント][1]を参照してログを設定してください。
`source` タグ (言語指定) が適切に構成されていることを確認してください。

### 例

すでに JSON 形式でログを記録している場合は、エラーログに新しい `error.fingerprint` 属性を追加してください。

Python で JSON 形式のロガーを作成する例を示します。

```python
import logging
import json_log_formatter

formatter = json_log_formatter.JSONFormatter()

json_handler = logging.FileHandler(filename='/var/log/my-log.json')
json_handler.setFormatter(formatter)

logger = logging.getLogger('my_json')
logger.addHandler(json_handler)
logger.setLevel(logging.INFO)

logger.error('Error processing request', extra={'error.fingerprint': 'my-custom-grouping-material'})
```

この場合、`my-custom-grouping-material` を使用して、エラー追跡でこれらのエラーログを 1 つの問題にグループ化します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_collection/