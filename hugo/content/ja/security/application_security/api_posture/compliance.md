---
description: App and API Protectionを使用して、業界標準のコンプライアンスフレームワークに対するAPIセキュリティ体制を評価します。
further_reading:
- link: security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
  tag: ドキュメント
  text: Cloud Securityのコンプライアンスフレームワークとベンチマーク
- link: https://owasp.org/API-Security/editions/2023/en/0x00-header/
  tag: 外部
  text: OWASP API Security Top 10 2023
title: コンプライアンス
---
## 概要 {#overview}

API Posture Complianceを使用すると、業界標準のフレームワークに対するAPIセキュリティ体制を継続的に評価できます。Datadogの組み込みAPIセキュリティ検出ルールをコンプライアンスフレームワークのコントロールにマッピングし、どのコントロールが合格または不合格であるかをサービス全体で示すリアルタイムの体制スコアを提供します。

Cloud Security compliance[1]はクラウドインフラストラクチャーの誤設定やIDリスクを評価しますが、API Posture Complianceは**APIセキュリティの検出結果**、つまりアプリケーションAPIに到達するトラフィックで検出された脅威と脆弱性にのみ焦点を当てています。

{{< img src="security/application_security/api_posture/aap_compliance_framework_detail.png" alt="OWASP API Security Top 10フレームワークの詳細ページ。体制スコア、不合格となった検出結果、要件ごとの不合格ルールの重大度内訳が表示されます。" style="width:100%;">}}

## 対応フレームワーク {#supported-frameworks}

### OWASP API Security Top 10 (2023) {#owasp-api-security-top-10-2023}

OWASP API Security Top 10は、APIにとって最も重大なセキュリティリスクを特定します。Datadogは、APIセキュリティ検出ルールを以下の10のカテゴリにマッピングしています。

| カテゴリ | 名前 | 説明 |
|----------|------|-------------|
| API1:2023 | Broken Object Level Authorization | APIがユーザーによる特定のオブジェクトへのアクセス権限を検証できず、攻撃者が他のユーザーのデータを読み取ったり操作したりすることを可能にします。|
| API2:2023 | Broken Authentication | 認証メカニズムの欠陥や欠如により、攻撃者がトークンを盗んだり、ユーザーになりすましたり、ログイン制御を完全にバイパスしたりすることが可能になります。|
| API3:2023 | Broken Object Property Level Authorization | APIがユーザーが読み書きすべきではない機密性の高いオブジェクトプロパティを公開し、マスアサインメントやデータ漏洩攻撃を可能にします。|
| API4:2023 | Unrestricted Resource Consumption | APIがリクエストサイズやレートに制限を設けていないため、サービス拒否攻撃やダウンストリームリソースの悪用、サードパーティコストの増大を招く可能性があります。|
| API5:2023 | Broken Function Level Authorization | 不適切なアクセス制御により、権限のないユーザーが自身の役割には意図されていない管理者機能や特権API機能を呼び出すことが可能になります。|
| API6:2023 | Unrestricted Access to Sensitive Business Flows | チェックアウトやログインなどの公開されたビジネスフローが、適切なレート制限や異常検知なしに自動化され、大規模に悪用される可能性があります。|
| API7:2023 | Server Side Request Forgery | APIが攻撃者から提供されたURLに対してサーバーサイドでHTTPリクエストを行い、内部サービス、クラウドメタデータ、その他の機密エンドポイントを公開してしまう可能性があります。|
| API8:2023 | Security Misconfiguration | 安全でないデフォルト設定、冗長なエラーメッセージ、オープンなクラウドストレージ、またはSecurity強化の欠如により、APIが日和見的な攻撃に対して脆弱な状態になります。|
| API9:2023 | 不適切なインベントリ管理 | 古くなった、ドキュメント化されていない、またはシャドウAPIバージョンが監視なしでアクセス可能な状態のままであり、アクティブに管理されている範囲を超えて攻撃対象領域が拡大しています。|
| API10:2023 | APIの安全でない利用 | 適切な検証を行わずにサードパーティのAPIレスポンスを信頼すると、アプリケーションがインジェクション攻撃、予期しないデータ、またはダウンストリームの侵害にさらされる可能性があります。|

## 仕組み {#how-it-works}

- **検知ルール**: 各Datadog APIセキュリティ検知ルールには、それがカバーするOWASPコントロールがタグ付けされています。ルールが実行されて調査結果が生成されると、関連付けられたコントロールは、影響を受けるサービスに対して**不合格**とマークされます。
- **ポスチャスコア**: ポスチャスコアは、完全に合格しているコントロールと、少なくとも1つの不合格の調査結果があるコントロールの比率を反映しています。このスコアは、[Cloud Security posture scores][3]と同じ方法論を使用して計算されます。
- **Compliance Frameworks page**: [Compliance Frameworks page][4]には、APIセキュリティコンテキストで利用可能なすべてのフレームワークのリストが表示されます。各フレームワークについて、コントロールレベルの詳細を確認し、重大度でフィルタリングし、調査結果のサイドパネルを開いて個々のAPIセキュリティイベントを調査できます。

## コンプライアンス状況を表示する {#view-your-compliance-posture}

[{{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Compliance{{< /ui >}}][4]に移動して、Complianceフレームワークページを開きます。以下が可能です。
- フレームワーク（例：OWASP API Security Top 10）を選択して、コントロールごとの合格/不合格ステータスを確認します。
- 不合格のコントロールをクリックして、不合格の原因となったAPIセキュリティ調査結果のリストを表示します。
- 調査結果のサイドパネルを開いて、影響を受けるエンドポイント、重大度、および推奨される修復手順を確認します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/
[2]: https://owasp.org/API-Security/editions/2023/en/0x00-header/
[3]: /ja/glossary/#security-posture-score
[4]: https://app.datadoghq.com/security/compliance/home?context=aap