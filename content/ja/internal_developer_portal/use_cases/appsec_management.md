---
aliases:
- /ja/tracing/software_catalog/guides/appsec_management
- /ja/software_catalog/guides/appsec_management
- /ja/tracing/software_catalog/use_cases/appsec_management
- /ja/tracing/service_catalog/guides/appsec_management
- /ja/service_catalog/guides/appsec_management
- /ja/service_catalog/use_cases/appsec_management
- /ja/tracing/service_catalog/use_cases/appsec_management
- /ja/service_catalog/use_cases/application_security
- /ja/software_catalog/use_cases/appsec_management
further_reading:
- link: /security/application_security/
  tag: ドキュメント
  text: Datadog App and API Protection
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: ブログ
  text: APM セキュリティビューでリスク、脆弱性、攻撃を視覚化する
title: 開発チーム全体でアプリと API の保護態勢を管理する
---

Software Catalog を利用することで、開発のすべての段階にセキュリティをシームレスに組み込むことができ、チーム 、アプリケーション、システム全体にわたって強固なセキュリティポスチャーを確保することができます。

Software Catalog がセキュリティシグナルを表面化し、一元化してくれるため、開発者は対処に優先順位をつけ、脆弱性に迅速に対処することができます。一方、管理者はリスクを監督し、改善を推進し、組織的なコンプライアンスを確保することができます。

{{< img src="tracing/software_catalog/appsec-use-case.png" alt="Software Catalog の Security タブ。各サービスの脆弱性リスク、攻撃露出、カバレッジを表示。" >}}

## 安全設計のアプリケーションを構築する

Software Catalog は、チームがセキュアなプロセスを作成、評価、改善するための標準パスと安全対策を提供します。開発者は、自信を持って[新しいサービスのスキャフォールドの作成][1]やクラウドリソースの統合ができ、すべてのステップでセキュリティ基準の適用が保証されます。

APM でインスツルメントされたサービスについては、APM Security Views が SQL インジェクション、SSRF、Log4Shell 攻撃などのアプリケーション攻撃に対して脆弱なサービスを自動的に検出します。APM Security Views を使用することで、各サービスと組織が遭遇する攻撃の種類を調査し、関連するセキュリティリスクを理解し、ランタイム情報を使用してアプリケーションの攻撃対象領域を効果的に管理することができます。

## サードパーティソフトウェアと依存関係を追跡する

Software Catalog は、オープンソースライブラリからプログラミング言語まで、サードパーティの依存関係を整理し、浮き彫りにします。チームは、バージョンを監視し、アップグレードをローンチし、脆弱性に能動的に対処することができます。

- DevSecOps: Software Catalog を使用して依存関係を追跡し、アップグレードの取り組みを主導することができます。
- 管理者: アップグレードの進捗状況やコンプライアンスに関するリアルタイムのレポートにアクセスできます。
- 開発者: 依存関係の更新を日々のワークフローに組み込むことで、障害の発生を最小限に抑えることができます。

## 構成の詳細

1. Software Catalog でサービスをクリックして、サービスのサイドパネルを開きます。
1. パネル上部の **Performance** タブを選択します。
1. **Libraries** サブタブを見つけます。ここには、使用されているすべての外部ライブラリとそのバージョンがリストアップされています。

{{< img src="tracing/software_catalog/appsec-use-case-libraries.png" alt="Software Catalog の Security タブ。各サービスの脆弱性リスク、攻撃露出、カバレッジを表示。" >}}


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=data&showActionCatalog=false&template=scaffolding&viewMode=edit&visibleDataItemId=triggerScaffoldNewServiceWorkflow-action