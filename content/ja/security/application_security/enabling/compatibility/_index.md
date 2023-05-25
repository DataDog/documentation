---
further_reading:
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Application Security Management のトラブルシューティング
- link: /security/application_security/how-appsec-works/
  tag: Documentation
  text: Datadog における Application Security Management の仕組み
kind: documentation
title: 互換性要件
type: multi-code-lang
---

各言語のトレーシングライブラリに対して、以下の ASM 機能をサポートしています。

| ASM の機能                   | Java | .NET | Node.js | Python | Go | Ruby | PHP |
| -------------------------------- | ----------------------------|----------------------------|----------------------------|----------------------------|----------------------------|----------------------------|----------------------------|
| Threat Detection <br/>  | 1.8.0 <br/>   | 2.23.0 <br/> | 3.31.1 <br/> | 1.9.0<br/>   | 1.47.0 <br/>  | 1.9.0<br/>   | 0.84.0 <br/>   |
| Threat Protection <br/> --> IP ブロッキング <br/> --> 不審リクエストブロッキング <br> --> ユーザーブロッキング   | 1.9.0<br/>    | 2.26.0 <br/> | <br/> --> 3.11.0<br/> --> 3.19.0<br/><br/> --> 3.11.0     | 1.10.0<br/>    |  <br/>--> 1.48.0<br/> --> v1.50.0<br/><br/> --> 1.48.0     |  1.11.0<br/>    | 0.86.0<br/>    |
| Risk Management <br/> --> サードパーティの脆弱性検出 <br/> --> カスタムコードの脆弱性検出 | 1.1.4 <br/> | 2.16.0 <br/> | Node.js 12+ の場合は 2.23.0、Node.js 14+ の場合は 3.10.0 <br/>| 1.5.0 <br/>| 非対応<br/>| 非対応<br/>| 非対応<br/>|

フレームワークの互換性と機能サポートの詳細については、アプリケーションの言語を選択してください。

{{< partial name="security-platform/appsec-languages.html" >}}

<br>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}