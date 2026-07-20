---
aliases:
- /ja/tracing/software_catalog/guides/dependency_management
- /ja/software_catalog/guides/dependency_management
- /ja/tracing/software_catalog/use_cases/dependency_management
- /ja/tracing/service_catalog/guides/dependency_management
- /ja/service_catalog/use_cases/dependency_management
- /ja/service_catalog/guides/dependency_management
- /ja/tracing/service_catalog/use_cases/dependency_management
further_reading:
- link: /tracing/
  tag: ドキュメント
  text: Datadog Application Performance Monitoring
- link: /universal_service_monitoring/
  tag: ドキュメント
  text: Datadog Universal Service Monitoring
- link: /real_user_monitoring
  tag: ドキュメント
  text: Datadog Real User Monitoring
title: 依存関係の管理とマッピング
---

Datadog の Software Catalog は、上流および下流の関係を文書化・追跡・評価するための強力な依存関係マッピング機能を提供します。自動検出と手動定義の両方をサポートしており、システム アーキテクチャを柔軟かつ正確に定義できます。

## 自動依存関係マッピングとエンティティ検出

- **自動検出:** 通常、Software Catalog には APM、USM、RUM から検出されたすべてのサービスが含まれます。環境全体で追加のアプリケーションをインスツルメントすると、その依存関係はカタログに自動的に追加されます。

- **テレメトリの統合:** Software Catalog は、APM、USM、RUM で収集したアプリケーション テレメトリを用いて依存関係を自動検出し、サービス間の関係とパフォーマンスへの影響についてリアル タイムの洞察をチームに提供します。

{{< img src="tracing/software_catalog/dependency-mgmt-use-case-auto-discovery.png" alt="サービスのサイド パネルにある Dependencies タブで、サービスの依存関係のフロー チャートを表示している。" >}}

## Software Catalog スキーマ v3.0 における手動の依存関係定義

[Software Catalog スキーマ v3.0][2] では、自動検出されたトポロジを補完するために、チームが手動で関係を定義できます。この機能は、組織知やチーム間の連携を反映した依存関係の定義に特に有用で、システム関係の全体像をより完全に把握できます。

{{< img src="tracing/software_catalog/dependency-mgmt-use-case-relationship-mapping.png" alt="サービスの依存関係を示す階層的な関係図。" >}}

### 手動の依存関係を構成する

手動の依存関係を定義するには、対象のエンティティ定義の `spec` セクションを次のキーで更新します:

  - `dependsOn`: 依存関係を指定します (例: Service A は Service B に依存する)。
  - `ownedBy`: チームやグループに所有権を割り当てます (例: Service A は Team A が所有する)。
  - `partOf`: コンポーネントをシステムの下にグループ化します (例: Service A は System A の一部である)。

YAML 設定例:

```yaml
apiVersion: v3
kind: service
metadata:
  name: web-store
spec:
  dependsOn: 
    - service: cws-webapp
```

### 手動の依存関係を表示する

Datadog アプリで手動の依存関係を表示するには:

1. [Software Catalog][1] に移動します。
1. 対象のサービスを選択してサイド パネルを開きます。
1. Performance タブを見つけて、Dependencies のサブ タブを選択します。

特定のサービスの Service Page を開き、左側のナビゲーションで Dependencies セクションを選択することもできます。

手動の依存関係を含むすべての依存関係が表示されます。"Include Detected" 機能でビューを切り替えられます:

- **Include Detected** が無効な場合: 手動で定義した依存関係のみが表示されます。
- **Include Detected** が有効な場合: 手動で追加した依存関係が自動検出のものより上に表示され、区別が明確になります。

{{< img src="tracing/software_catalog/dependency-mgmt-use-case-include-detected.png" alt="Include Detected を無効にした状態で、サービスの依存関係を示すダイアグラム。" >}}

### 手動の依存関係定義の利点

- 精度の向上: 手動で依存関係を定義することで、チーム固有の理解と洞察を Software Catalog に取り込み、自動化ツールが見落としがちな実運用のアーキテクチャを正確に表現できます。
- コラボレーションの強化: 手動で定義した依存関係により、関係が明示され、コミュニケーションと調整が円滑になってインシデント対応やアーキテクチャ戦略の策定を支援します。
- 文脈知識の共有: 手動定義を提供することで、開発者や新しいメンバーがシステムの依存関係やアーキテクチャの複雑さを素早く理解でき、オンボーディングや知識移転が円滑になります。


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /ja/software_catalog/service_definitions/v3-0/