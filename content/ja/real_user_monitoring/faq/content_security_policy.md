---
further_reading:
- link: /logs/log_collection/javascript/
  tag: 詳細はこちら
  text: ブラウザログ収集
kind: faq
title: コンテンツセキュリティポリシー (CSP)
---

## 概要

Web サイトで[コンテンツセキュリティポリシー (CSP)][1] を使用している場合、リアルユーザーモニタリングまたはブラウザログ収集の設定方法に応じて、既存のディレクティブに以下の URL を追加してください。

## 取込先 URL

リアルユーザーモニタリング][2]または[ブラウザログ収集][3]の初期化に使用した `site` オプションに応じて、適切な `connect-src` エントリを追加してください。

```txt
connect-src https://*.{{< region-param key="browser_sdk_endpoint_domain" >}}
```

## セッションリプレイワーカー

セッションリプレイを使用している場合、以下の `worker-src` エントリを追加して `blob:` URI スキームを持つワーカーを許可するようにしてください。

```txt
worker-src blob:;
```

## CDN バンドル URL

[リアルユーザーモニタリング][4]または[ブラウザログ収集][5]で CDN 非同期または CDN 同期の設定を使用している場合、以下の `script-src` 項目も追加してください。

```txt
script-src https://www.datadoghq-browser-agent.com
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
[2]: /ja/real_user_monitoring/browser/#initialization-parameters
[3]: /ja/logs/log_collection/javascript/#initialization-parameters
[4]: /ja/real_user_monitoring/browser/#setup
[5]: /ja/logs/log_collection/javascript/#setup