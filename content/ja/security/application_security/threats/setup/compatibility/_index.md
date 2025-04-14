---
further_reading:
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: Application Security Management のトラブルシューティング
- link: /security/application_security/how-appsec-works/
  tag: ドキュメント
  text: Datadog における Application Security Management の仕組み
title: 互換性要件
type: multi-code-lang
---

各言語のトレーシングライブラリに対して、以下の ASM 機能をサポートしています。

| ASM の機能                         | Java    | .NET     | Node.js                                          | Python        | Go              | Ruby          | PHP           |
|----------------------------------------|---------|----------|--------------------------------------------------|---------------|-----------------|---------------|---------------|
| Threat Detection                       | 1.8.0   | 2.23.0   | 4.0.0                                            | 1.9.0         | 1.47.0          | 1.9.0         | 0.84.0        |
| API セキュリティ                           | 1.31.0  | 2.42.0   | Node.js 16+ の場合は 4.30.0、Node.js 18+ の場合は 5.6.0 | 2.6.0         | 1.59.0          | 2.4.0        | 0.98.0        |
| Threat Protection                      | 1.9.0   | 2.26.0   | 4.0.0                                            | 1.10.0        | v1.50.0         | 1.11.0        | 0.86.0        |
| ブロックされたリクエストへの対応をカスタマイズする | 1.11.0  | 2.27.0   | 4.1.0                                            | 1.19.0        | v1.53.0         | 1.15.0        | 0.86.0        |
| ユーザーアクティビティイベントの自動追跡 | 1.38.0  | サポート対応予定   | サポート対応予定                                            | 2.11.0        | サポート対応予定   | サポート対応予定        | サポート対応予定        |
| ユーザーアクティビティイベント自動追跡 (非推奨モード) | 1.20.0  | 2.32.0   | 4.4.0                                            | 1.17.0        | 非対応   | 1.14.0        | 0.89.0        |

フレームワークの互換性と機能サポートの詳細については、アプリケーションの言語を選択してください。


{{< partial name="security-platform/appsec-languages.html" >}}

<br>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}