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
further_reading:
- link: /security/application_security/
  tag: ドキュメント
  text: Datadog App and API Protection
title: 開発チーム横断でアプリと API の保護態勢を管理する
---

Software Catalog により、組織は開発のあらゆる段階にセキュリティをシームレスに組み込み、チーム、アプリケーション、システム全体で強固なセキュリティ 態勢を確保できます。

Software Catalog はセキュリティ シグナルを可視化して集約するため、開発者は対応の優先順位を付けて脆弱性に迅速に対処できます。一方、管理者はリスクを把握し、改善を推進し、組織としてのコンプライアンスを確保できます。

{{< img src="tracing/software_catalog/appsec-use-case.png" alt="各サービスの脆弱性リスク、攻撃への露出度、カバレッジを示す Software Catalog の Security タブ。" >}}

## 設計段階から安全なアプリケーションを構築する

Software Catalog は、チームが安全なプロセスを作成、評価、改善できるよう、既定の進め方とガード レールを提供します。開発者は、各段階でセキュリティ基準が適用されることを前提に、安心して[新しいサービスのひな形を生成][1]したり、クラウド リソースを統合したりできます。

APM でインスツルメントされたサービスについては、APM Security Views が SQL インジェクション、SSRF、Log4Shell 攻撃などのアプリケーション攻撃に対して脆弱なサービスを自動的に検出します。APM Security Views を使用することで、各サービスと組織が遭遇する攻撃の種類を調査し、関連するセキュリティリスクを理解し、ランタイム情報を使用してアプリケーションの攻撃対象領域を効果的に管理することができます。

## サードパーティソフトウェアと依存関係を追跡する

Software Catalog は、オープン ソース ライブラリからプログラミング言語まで、サード パーティの依存関係を整理して可視化します。チームは、バージョンを監視し、アップグレードを進め、脆弱性に先回りして対処できます。

- DevSecOps: Software Catalog を使用して依存関係を追跡し、アップグレードの取り組みを主導することができます。
- 管理者: アップグレードの進捗状況やコンプライアンスに関するリアルタイムのレポートにアクセスできます。
- 開発者: 日々のワーク フローへの影響を最小限に抑えながら、依存関係の更新を取り込めます。

## 構成の詳細

1. Software Catalog でサービスをクリックして、サービスのサイドパネルを開きます。
1. パネル上部の **Performance** タブを選択します。
1. **Libraries** サブタブを見つけます。ここには、使用されているすべての外部ライブラリとそのバージョンがリストアップされています。

{{< img src="tracing/software_catalog/appsec-use-case-libraries.png" alt="各サービスの脆弱性リスク、攻撃への露出度、カバレッジを示す Software Catalog の Security タブ。" >}}


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=data&showActionCatalog=false&template=scaffolding&viewMode=edit&visibleDataItemId=triggerScaffoldNewServiceWorkflow-action