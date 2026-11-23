---
aliases:
- /ja/account_management/org_settings/organization_topology/
- /ja/getting_started/organization_topology/
description: 単一組織と複数組織の Datadog デプロイメントを選択し、アクセス制御により分離を実現し、複数組織環境を管理します。
further_reading:
- link: /account_management/multi_organization/
  tag: ドキュメント
  text: マルチオーガニゼーションアカウントの管理
- link: /account_management/organization_groups/
  tag: ドキュメント
  text: 組織グループ
- link: /account_management/org_settings/cross_org_visibility/
  tag: ドキュメント
  text: Cross-Organization Visibility
- link: /account_management/rbac/
  tag: ドキュメント
  text: ロールベースのアクセス制御 (RBAC)
- link: /account_management/rbac/data_access/
  tag: ドキュメント
  text: Data Access Control
- link: /account_management/rbac/granular_access/
  tag: ドキュメント
  text: きめ細かなアクセス制御
- link: /account_management/teams/
  tag: ドキュメント
  text: Teams
- link: /account_management/saml/
  tag: ドキュメント
  text: SAML シングルサインオン
title: 組織トポロジー
---
## 概要{#overview}

Datadog の組織トポロジー (単一組織または複数組織) は、サービスの監視、アクセス制御、ユーザー管理、およびコスト帰属の方法を決定します。

このページでは、以下の内容を説明しています。
- 単一組織トポロジーの機能
- 複数組織トポロジーが必要となるシナリオ
- ニーズに合ったトポロジーの決定方法

## 単一組織から始める {#start-with-a-single-organization}

Datadog では、ほとんどのデプロイメントに対して[単一組織トポロジー](#single-organization-topology-recommended)を推奨しています。Datadog リソースへのアクセスレベルをカスタマイズすることで、単一組織を管理できます。たとえば、数千人のユーザーと複数のビジネスユニットを抱える大企業では、[Teams][7] と [きめ細かなアクセス制御][6]を使用して、厳格なコンプライアンス要件を満たすことができます。

[複数組織トポロジー](#multi-organization-topology)は、単一組織では必須要件を満たせない場合にのみ使用してください。

## 単一組織トポロジー (推奨) {#single-organization-topology-recommended}

単一組織トポロジーでは、ビジネスユニット、チーム、および環境が 1 つの組織を共有します。タグベースの規則 (`team:`、`env:`、`service:`、`cost_center:`) が、アクセスポリシー、ダッシュボード、および請求費用の配賦を支えます。アクセス制御により、必要に応じてグループ間の分離が強制されます。

### 単一組織トポロジーの機能 {#capabilities-of-a-single-org-topology}
単一組織では、以下のことが可能です。

- **接続されたオブザーバビリティ:** 分散トレースがサービス間を途切れることなくエンドツーエンドで流れます。メトリクス、ログ、トレースにわたる相関ビューが、追加のカスタマイズなしで機能します。
- **単一の構成画面:** モニター、ダッシュボード、パイプライン、SLO が 1 か所に集約されるため、重複やドリフトが発生しません。
- **一元化されたユーザー管理:** SSO 設定、[SCIM][11] 統合、ロールとチームのセットはそれぞれ 1 つだけで済みます。
- **チームごとのコスト可視化:** 利用量の割り当てにより、タグを使用してチーム、サービス、またはビジネスユニットごとの支出を把握できるため、請求内容を分けて表示するために組織を分ける必要はありません。
- **低い運用コスト:** 単一組織であれば、組織ごとの Terraform モジュール、組織をまたぐ回避策、重複したアラートルーティングは不要です。

**例:** 12 のビジネスユニットにまたがる 5,000 人の Datadog ユーザーを抱える大手テクノロジー企業は、1 つの組織を使用しています。各ビジネスユニットには、そのテレメトリへのアクセスを任意アクセス制御で制限する Team があります。プラットフォーム管理者はグローバルロールを持っています。ビジネスユニットのエンジニアは、自分のチームのデータのみを参照できます。

### 単一組織内でのアクセス制御 {#access-control-within-a-single-organization}

ほとんどの組織は、単一組織のアクセス制御で要件を満たすことができます。[RBAC][3]、[Data Access Control][4]、[Granular Access Control][6]、[Teams][7]、[IP 許可リスト][10]により、規制の厳しい業界であっても、単一組織内で強力なデータ分離を実現できます。

詳細な実装ガイダンスについては、[アクセス制御のドキュメント][3]を参照してください。

### 制限事項 {#limitations}

組織内のすべてのユーザーは、インフラストラクチャーなどのコア機能を閲覧できます。すべてのテレメトリタイプが行レベルの制限をサポートしているわけではありません。完全なリストについては、[サポートされているテレメトリタイプ][5]を参照してください。

## 複数組織トポロジー {#multi-organization-topology}

アクセス制御を備えた単一組織では必須要件を満たせない場合や、個別の請求主体ごとに独立した請求書が必要な場合は、複数組織を使用してください。以下の 5 つのシナリオが該当します。

### シナリオ 1: 規制または契約上のデータ分離 {#scenario-1-regulatory-or-contractual-data-isolation}

_チームベースのアクセス制限があったとしても、このデータを同じ組織内に配置することが規制や契約に違反しますか?_

一部の規制では、データが同じ論理境界内に決して共存しないことが求められます。要件は、ユーザーがデータを閲覧できないということではなく、データが同じ組織を共有できないということです。コンプライアンスチームや外部監査人が (行レベルの制限ではなく) 物理的な組織レベルの分離を要求する場合は、複数組織が適切な選択肢です。

複数の組織を使用してください: 規制対象のワークロードごとに 1 つ、必要なリージョンごとに 1 つ (例: 欧州リージョン)、そしてその他すべてに対して 1 つです。[Cross-Organization Visibility][2] は、統合されたメトリクスを使用して、運用ダッシュボードのために組織を接続します。規制対象の組織には、より厳格なアクセスポリシー、IP 許可リスト、および監査制御が適用されます。

**例:**金融サービス企業は、取引プラットフォームのテレメトリ (SEC/FINRA のデータ取り扱い要件の対象) を専用の組織に分離しています。ほかのすべてのビジネスユニットは、プライマリ組織を共有します。

### シナリオ 2: データレジデンシー要件への対応 {#scenario-2-meet-data-residency-requirements}

_このデータについて、リージョンをまたぐデータ転送は禁止されていますか?_

規制によりテレメトリを地理的領域外へ持ち出すことが禁止されている場合は、異なる Datadog サイト (例: US1、EU1、AP1) に組織が必要です。

### シナリオ 3: チーム間でのデータファイアウォール構築 {#scenario-3-firewall-data-between-teams}

_あるチームが他のチームのデータの痕跡を少しでも閲覧できることがリスクとなりますか?_

Datadog のアクセス制御は、機密データの最も一般的なソースを制限します。これらのアクセス制御では、すべてのテレメトリデータやアセットメタデータをファイアウォールで完全に分離することはできません。要件としてデータの混在が一切許されない場合は、個別の組織を使用してください。

### シナリオ 4: MSP 顧客の分離 {#scenario-4-isolate-msp-customers}

_顧客ごとに個別の請求、データ境界、ユーザープールが必要ですか?_

複数の外部顧客にサービスを提供するマネージドサービスプロバイダー (MSP) は、通常、独立した請求、データ、ユーザー管理を備えた分離された組織に各顧客を配置する必要があります。Datadog の[親組織・子組織モデル][1]はこのパターンをサポートしています。

MSP の内部運用には親組織を使用し、顧客ごとに子組織を作成します。各子組織は、データ、ユーザー、および請求が分離されています。親組織は、[Cross-Organization Visibility][2] を通じて一元化された運用ビューを提供します。

**例:** 200 社以上の顧客を持つマネージドインフラストラクチャープロバイダーが、顧客ごとに子組織を作成します。親組織の NOC チームは、組織横断型ダッシュボードを使用して、すべての顧客組織のサービス健全性を監視します。

### シナリオ 5: 買収した企業のインテグレーション {#scenario-5-integrate-an-acquired-company}

_すでに独自の Datadog 組織を持つ買収企業をインテグレーションしようとしていますか?_

合併や買収では、一時的に複数組織の状態が発生することがよくあります。インテグレーション中、買収企業の組織はアクティブなまま維持し、その間に適切なアクセス制御、チーム、構成を備えたターゲット組織を準備します。目標は、アクセス制御と移行ツールが整った後に単一の組織へ統合することです。統合に関するガイダンスについては、アカウントチームにお問い合わせください。

**例:**SaaS 企業を買収した後、企業は [Cross-Organization Visibility][2] を使用して両方の組織を接続し、即座に運用状況を把握します。その後、企業は 3～6 か月かけて段階的な統合を実行します。

## トポロジーの決定 {#decide-your-topology}

| シナリオ | 組織トポロジー |
| :---- | :---- |
| 規制や契約により、物理的に分離された組織境界内にデータを存在させることが義務付けられています。| 複数組織 |
| 一部のテレメトリについて、リージョン間データ転送が禁止されています。| 複数組織 |
| セキュリティポリシーにより、[RBAC][3]、[Data Access Control][4]、および [Granular Access Control][6] が導入されていても、チーム間でのデータの混在が一切禁止されています。| 複数組織 |
| 請求、データ、ユーザープールを個別に必要とする外部顧客にサービスを提供しています。| 複数組織 (MSP) |
| すでに独自の Datadog 組織を持つ買収企業をインテグレーションしています。| 一時的な複数組織 |
| 上記以外 | 単一組織 |

### 組織の機能の比較 {#compare-org-capabilities}

以下の表において、「変更なし」は、Organization Groups が新しい機能を追加しないことを示しています。

| 機能 | 単一組織 | 複数組織 | Organization Groups を使用する場合 |
| :---- | :---- | :---- | :---- |
| エンドツーエンドの分散トレース | 完全 | 組織の境界を越えることはできません | 変更なし |
| テレメトリデータ | 完全 | [Cross-Organization Visibility][2] を使用して、メトリクス、ログ、CI データをダッシュボードに共有可能 | 変更なし |
| ダッシュボード (メトリクス、ログ、トレース) | 完全 | 別の組織のメンバーと[招待制の共有ダッシュボード][9]を共有 | 変更なし |
| データソース間のモニターアラート | 完全 | 組織間でのモニター評価は不可 | 変更なし |
| サービス間の SLO | 完全 | 組織にまたがることは不可 | 変更なし |
| ユーザー管理 | 1 つのインテグレーション | 組織ごとに個別の [SCIM][11] | グループから一元管理 |
| RBAC およびカスタムロール | 1 つの構成 | 組織ごとに複製が必要 | グループから一元管理 |
| SSO / SAML | 1 つの構成 ([multi-SAML][8] は複数の IdP をサポート) | 組織ごとに個別の SAML | 変更なし |
| 請求と使用量 | 組織ごとの使用量の割り当て | Datadog はすべての子組織の使用量を集計し、親組織レベルで請求 | 変更なし |
| 機能のロールアウト | 即時 | 組織ごとに有効化が必要 | グループから一元管理 |

複数組織が必要なユースケースについては、組織間の一元的なガバナンスを実現する [Organization Groups][12] を参照してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/multi_organization/
[2]: /ja/account_management/org_settings/cross_org_visibility/
[3]: /ja/account_management/rbac/
[4]: /ja/account_management/rbac/data_access/
[5]: /ja/account_management/rbac/data_access/#supported-telemetry
[6]: /ja/account_management/rbac/granular_access/
[7]: /ja/account_management/teams/
[8]: /ja/account_management/saml/
[9]: /ja/dashboards/sharing/shared_dashboards/#invite-only-shared-dashboards
[10]: /ja/account_management/org_settings/ip_allowlist/
[11]: /ja/account_management/scim/
[12]: /ja/account_management/organization_groups/