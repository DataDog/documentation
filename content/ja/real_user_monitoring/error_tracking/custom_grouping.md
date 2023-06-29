---
description: ブラウザ RUM エラーを問題としてグループ化する方法をカスタマイズします。
further_reading:
- link: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps
  tag: GitHub
  text: datadog-ci ソースコード
- link: /real_user_monitoring/guide/upload-javascript-source-maps
  tag: Documentation
  text: JavaScript ソースマップのアップロード
- link: /real_user_monitoring/error_tracking/
  tag: Documentation
  text: Web アプリケーションとモバイルアプリケーションのエラー追跡について
kind: documentation
title: カスタムグループ化
---

## 概要

[エラー追跡][4]は、デフォルトの戦略を使って、類似のエラーを問題としてインテリジェントにグループ化します。_カスタムフィンガープリンティング_を使えば、グループ化の決定を完全に制御し、リアルユーザーモニタリング (RUM) エラーに対するグループ化の動作をカスタマイズすることができます。

エラー追跡が RUM エラーを問題としてグループ化する際に使用できる`error.fingerprint` 属性を指定してください。 `error.fingerprint` 属性の値について特に形式や要件はありませんが、その中身は文字列でなければなりません。

`error.fingerprint` が指定されている場合、グループ化の動作は次のルールに従います。

* カスタムグループ化がデフォルトの戦略よりも優先されます。
* カスタムグループ化は RUM エラーのサブセットにのみ適用可能で、デフォルトの戦略と共存できます。
* `error.fingerprint` の内容は、修正なしでそのまま使用されます。
* 同じサービスで発生し、同じ `error.fingerprint` 属性を持つ RUM エラーは、同じ問題としてグループ化されます。
* `service` 属性が異なる RUM エラーは、別の問題としてグループ化されます。

## ブラウザエラーの設定

カスタマイズグループ化を使用するには、Datadog ブラウザ SDK [v4.42.0 以降][3]、[ブラウザ RUM エラー][2]、および追加文字列属性が必要です。

まだ Datadog でブラウザ RUM イベントを収集していない場合は、[ブラウザモニタリングのセットアップドキュメント][1]を参照してください。

### 例

すでに[ブラウザエラーを収集][2]している場合は、以下のどちらかで属性を追加することが可能です。

* エラーオブジェクトに `dd_fingerprint` 属性を追加する。

```javascript
import { datadogRum } from '@datadog/browser-rum';
// カスタムエラーをコンテキスト付きで送信する
const error = new Error('Something went wrong');
error.dd_fingerprint = 'my-custom-grouping-fingerprint'
datadogRum.addError(error);
```

* または、`beforeSend` コールバックに `error.fingerprint` 属性を付けて使用する。

```javascript
DD_RUM.init({
  ...
  beforeSend: () => {
    if (event.type === 'error') {
      event.error.fingerprint = 'my-custom-grouping-fingerprint'
    }
  },
})
```

どちらの場合も、`my-custom-grouping-material` を使用して、エラー追跡でブラウザ RUM エラーを 1 つの問題にグループ化します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/
[2]: /ja/real_user_monitoring/browser/collecting_browser_errors/
[3]: https://github.com/DataDog/browser-sdk/releases/tag/v4.42.0
[4]: /ja/real_user_monitoring/error_tracking