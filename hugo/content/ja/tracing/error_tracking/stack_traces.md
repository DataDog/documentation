---
description: Error Tracking がスタックトレースを使用してエラーをフィンガープリントおよびグループ化する方法を学びます。
further_reading:
- link: /tracing/error_tracking/
  tag: ドキュメント
  text: バックエンドサービスの Error Tracking について
- link: /tracing/error_tracking/error_grouping/
  tag: ドキュメント
  text: エラーのグループ化について
title: Error Tracking におけるスタックトレース
---
## 概要 {#overview}

Error Tracking は、エラースパン上のスタックトレースを使用してエラーにフィンガープリントを付与し、問題にグループ化して発生場所を表示します。このページでは、Error Tracking がスタックトレースのためにどのスパン属性を読み取るか、またそれがサービスの言語やトレーサーのバージョンによってどのように異なるかを説明します。

## スタックトレーススパン属性 {#stack-trace-span-attributes}

エラースパンは、そのスタックトレースを `error.stack` [スパン属性][1] で報告します。ほとんどのトレーサーでは、`error.stack` にエラーが処理されたとき (例: `catch` ブロックやミドルウェア) にキャプチャされたスタックトレースが含まれます。これは必ずしもエラーがスローされた場所ではありません。

v2.7.0 以降の `dd-trace-go` でインスツルメントされた Go サービスの場合、ハンドリングスタックは `error.handling_stack` 属性で個別に報告されます。この場合、`error.stack` には、利用可能な場合はエラーがスローされた時点でキャプチャされたスローイングスタックが含まれます。

## Error Tracking で使用されるスタックトレース {#which-stack-trace-is-used-by-error-tracking}

### Go サービスの場合 {#for-go-services}

Go サービスの場合、Error Tracking にはどのスタックトレースを使用するかを決定するためのフォールバックメカニズムがあります。

- Go トレーサー v2.7.0 以降:
  - スローイングスタックは `error.stack` で報告されます。このスタックは、利用可能な場合に使用されます。
  - ハンドリングスタックは `error.handling_stack` で報告されます。このスタックは、スローイングスタックが利用できない場合に使用されます。
- Go トレーサー v2.7.0 より前:
  - スローイングスタックは `error.details` で報告されます。このスタックは、利用可能な場合に使用されます。
  - ハンドリングスタックは `error.stack` で報告されます。このスタックは、スローイングスタックが利用できない場合に使用されます。

### その他のすべての言語 {#for-all-other-languages}

その他のすべての言語については、ハンドリングスタックがキャプチャされ、`error.stack` で報告されます。この属性は、Error Tracking が問題をグループ化し、疑わしいコミットなどの情報を導き出すために使用されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/visualization/trace/?tab=spantags#more-information