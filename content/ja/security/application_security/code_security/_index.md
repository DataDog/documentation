---
further_reading:
- link: /security/application_security/how-appsec-works/
  tag: ドキュメント
  text: Application Security Management の仕組み
- link: https://www.datadoghq.com/blog/iast-datadog-code-security/
  tag: ブログ
  text: Datadog Code Security で本番環境のアプリケーションセキュリティを強化
- link: https://www.datadoghq.com/blog/application-code-vulnerability-detection/
  tag: ブログ
  text: Datadog Code Security でコードの脆弱性を発見
- link: https://www.datadoghq.com/blog/code-security-owasp-benchmark/
  tag: ブログ
  text: Datadog Code Security は IAST アプローチを採用し、OWASP Benchmark で 100% の精度を達成
title: コードセキュリティ
---

## 概要

Datadog Code Security は、サービスのコードレベルの脆弱性を特定し、具体的なインサイトと修正提案を提供します。

サポートされているサービスのリストについては、[ライブラリ互換性要件][5]をご覧ください。

Code Security は、Interactive Application Security Testing (IAST) アプローチを採用し、アプリケーションコード内の脆弱性を検出します。IAST は、アプリケーションパフォーマンスモニタリング (APM) のように、コード内に埋め込まれたインスツルメンテーションを使用します。

Code Security は、ライブラリやインフラストラクチャーなど、スタック内の他のコンポーネントとのコードの相互作用も監視します。

IAST により、Datadog は追加の構成や定期的なスケジューリングを必要とする外部テストに依存せず、正規のアプリケーショントラフィックを使用して脆弱性を特定できます。

Code Security のランタイムアプリケーションモニタリングは、攻撃対象領域の最新の状況を提供し、潜在的な問題を迅速に特定することを可能にします。

## コードレベルの脆弱性リスト

Code Security の検出ルールは、以下の言語に対応しています。

| 重大度 | 検出ルール                        | Java  | .NET  | Node.js | Python |
| -------- | ------------------------------------- | ----- | ----- | ------- |--------|
| クリティカル | NoSQL インジェクション                       | FALSE | TRUE  | TRUE    | FALSE  |
| クリティカル | SQL インジェクション                         | TRUE  | TRUE  | TRUE    | TRUE   |
| クリティカル | サーバーサイドリクエストフォージェリー (SSRF)    | TRUE  | TRUE  | TRUE    | TRUE   |
| クリティカル | Code Injection                        | FALSE | FALSE | TRUE    | FALSE  |
| クリティカル | コマンドインジェクション                     | TRUE  | TRUE  | TRUE    | TRUE   |
| 大     | LDAP インジェクション                        | TRUE  | TRUE  | TRUE    | FALSE  |
| 大     | ハードコードされたシークレット                     | TRUE  | TRUE  | TRUE    | FALSE  |
| 大     | ハードコードされたパスワード                   | FALSE | FALSE | TRUE    | FALSE  |
| 大     | パストラバーサル                        | TRUE  | TRUE  | TRUE    | TRUE   |
| 大     | 信頼境界の違反              | TRUE  | TRUE  | FALSE   | FALSE  |
| 大     | クロスサイトスクリプティング (XSS)            | TRUE  | TRUE  | FALSE   | FALSE  |
| 大     | Untrusted Deserialization             | TRUE  | FALSE | FALSE   | FALSE  |
| 大     | 無効なリダイレクト                  | TRUE  | TRUE  | TRUE    | FALSE  |
| 大     | XPath インジェクション                       | TRUE  | TRUE  | FALSE   | FALSE  |
| 大     | ヘッダーインジェクション                      | TRUE  | TRUE  | TRUE    | TRUE   |
| 大     | ディレクトリリスティングの漏洩                | TRUE  | FALSE | FALSE   | FALSE  |
| 大     | デフォルトの HTML エスケープ無効           | TRUE  | FALSE | FALSE   | FALSE  |
| 大     | 動詞の改ざん                        | TRUE  | FALSE | FALSE   | FALSE  |
| 中   | SameSite クッキーなし                    | TRUE  | TRUE  | TRUE    | TRUE   |
| 中   | 安全でないクッキー                       | TRUE  | TRUE  | TRUE    | TRUE   |
| 中   | HttpOnly クッキーなし                    | TRUE  | TRUE  | TRUE    | TRUE   |
| 中   | 弱いハッシュ化                          | TRUE  | TRUE  | TRUE    | TRUE   |
| 中   | 弱い暗号                           | TRUE  | TRUE  | TRUE    | TRUE   |
| 中   | スタックトレースの漏洩                       | TRUE  | TRUE  | FALSE   | FALSE  |
| 中   | リフレクションインジェクション                  | TRUE  | TRUE  | FALSE   | FALSE  |
| 中   | 安全でない認証プロトコル      | TRUE  | TRUE  | FALSE   | FALSE  |
| 中   | ハードコードされたキー                         | FALSE | TRUE  | FALSE   | FALSE  |
| 中   | 安全でない JSP レイアウト                   | TRUE  | FALSE | FALSE   | FALSE  |
| 小      | HSTS ヘッダーが欠落                   | TRUE  | TRUE  | TRUE    | FALSE  |
| 小      | X-Content-Type-Options ヘッダーが欠落 | TRUE  | TRUE  | TRUE    | FALSE  |
| 小      | Weak Randomness                       | TRUE  | TRUE  | TRUE    | TRUE   |
| 小      | 管理コンソールがアクティブ                  | TRUE  | FALSE | FALSE   | FALSE  |
| 小      | セッションのタイムアウト                       | TRUE  | FALSE | FALSE   | FALSE  |
| 小      | セッションの書き換え                     | TRUE  | FALSE | FALSE   | FALSE  |

## コードの脆弱性を調査・管理

[Vulnerability Explorer][1] はリアルタイムの脅威データを使用して、システムを危険にさらす脆弱性の把握をサポートします。脆弱性は重大度順に並べられます。

{{< img src="/security/application_security/code_security/vulnerability_explorer_code_vulnerabilities.png" alt="Vulnerability Explorer の Code Security" style="width:100%;" >}}

脆弱性をトリアージするために、各脆弱性には以下の情報が含まれます。

- 影響を受けるサービス
- 脆弱性の種類
- 初回検出
- 脆弱性が発見された正確なファイル名と行番号

{{< img src="/security/application_security/code_security/vulnerability-details.png" alt="Code Security の脆弱性の詳細" style="width:100%;" >}}

各脆弱性の詳細には、リスクスコア (下記スクリーンショット参照) および重大度 (重大、高、中、低) が含まれます。

リスクスコアは、脆弱性がデプロイされた場所や、サービスがアクティブな攻撃の対象かどうかなど、特定のランタイムコンテキストに合わせて調整されます。

{{< img src="/security/application_security/code_security/vulnerability_prioritization.png" alt="Code Security の脆弱性の優先順位付け" style="width:100%;" >}}

## 修復

Datadog Code Security は、影響を受けたファイル名から正確なメソッドや行番号まで、チームがアプリケーション内の脆弱性を特定するために必要な情報を自動的に提供します。

{{< img src="/security/application_security/code_security/code_security_remediation.png" alt="Code Security の脆弱性修復" style="width:100%;" >}}

[GitHub インテグレーション][7]を有効にすると、Code Security は、影響を受けたサービスの最初のバージョン、脆弱性をもたらしたコミット、および脆弱なコードのスニペットを表示します。この情報は、脆弱性がいつ、どこで発生したかを把握し、作業の優先順位付けに役立ちます。

{{< img src="/security/application_security/code_security/vulnerability_code_snippet.png" alt="コード脆弱性スニペット" style="width:100%;" >}}

検出された脆弱性ごとに、詳細な修正手順が提供されます。

{{< img src="/security/application_security/code_security/remediation_recommendations.png" alt="修復の推奨事項" style="width:100%;" >}}

推奨事項により、脆弱性のステータスを変更したり、レビューのためにチームメンバーに割り当てたり、追跡のために Jira 課題を作成したりすることができます。

{{< img src="/security/application_security/code_security/vulnerability_jira_ticket.png" alt="脆弱性から Jira チケットを作成" style="width:100%;" >}}

**注:** 脆弱性に対する Jira 課題を作成するには、Jira インテグレーションを構成し、`manage_integrations` の権限が必要です。詳細な手順は、[Jira インテグレーション][3]および[ロールベースのアクセス制御][4]のドキュメントをご覧ください。

## コードセキュリティの有効化

Code Security を有効にするには、[Datadog Tracing Library][9] を構成します。どちらの方法も、[**Security > Application Security > Settings**][10] セクションに詳しい説明があります。

さらにサポートが必要な場合は、[Datadog サポート][11]にお問い合わせください。

## Code Security の無効化

Code Security を無効化する方法の詳細については、[コードセキュリティの無効化][12]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/vm/code
[2]: /ja/security/application_security/code_security/setup/java/
[3]: /ja/integrations/jira/
[4]: /ja/account_management/rbac/permissions/#integrations
[5]: /ja/security/application_security/code_security/setup/compatibility/
[6]: https://docs.google.com/forms/d/1wsgbd80eImvJSjXe5y5VCjAW0zzn5p3CoCLsOy0vqsk/
[7]: /ja/integrations/github/
[9]: /ja/security/application_security/code_security/setup/
[10]: https://app.datadoghq.com/security/configuration/asm/setup
[11]: https://www.datadoghq.com/support/
[12]: /ja/security/application_security/troubleshooting/#disabling-code-security