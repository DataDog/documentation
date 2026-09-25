---
description: Access Controlのための制限付きデータセットを定義する
further_reading:
- link: /data_security/
  tag: ドキュメント
  text: データ関連リスクの低減
is_public: true
title: Data Access Control
---
## 概要 {#overview}

Datadog 内のデータには機密データが含まれている可能性があるため、慎重に取り扱う必要があります。機密データを Datadog に取り込んでいる場合、Data Access Control を使用すると、Datadog 組織内の管理者およびアクセス管理者がこのデータへのアクセスを規制できます。Data Access Control を使用して、クエリで機密データを特定し、特定の [Teams][1] または [Roles][2] のみにアクセスを制限します。

_制限付きデータセット_を定義すると、そのデータセットの境界内にあるデータはすべて制限されます。制限付きデータセットに含まれないデータは制限されず、適切な権限を持つユーザーがアクセスできます。Data Access Control は、アクセス管理者がデータセット内の機密データへのアクセスを許可されたユーザーのみに付与できるようにする直感的なインターフェースを提供します。

## 前提条件{#prerequisites}

### アクセス制御を構成する {#configure-access-controls}

Data Access Control は、組織の既存の Datadog アクセス制御構成に基づいて構築されます。Data Access Control を構成する前に、まず [Access Controls][3] をセットアップしてください。

### 受信データにタグ付けする {#tag-incoming-data}

Data Access Control は、アクセス境界の定義に使用できるデータ内のタグと属性に依存しています。タグが定義されていない場合は、Data Access Control を構成する前に[タグを使い始める][4]を確認することを検討してください。

## データアクセスを構成する {#configure-data-access}

Data Access Control を使用すると、制限付きデータセットを作成し、指定されたチームまたはロールのユーザーのみがアクセスできるデータを指定できます。

制限付きデータセットをすべて表示するには、[Organization Settings][6] に移動し、左側の {{< ui >}}Access{{< /ui >}} 見出しの下にある [Data Access Controls][7] を選択します。

### Datadog サイト {#datadog-site}

Datadog Admin ロールが割り当てられたユーザー、または組織内で [`user_access_manage` 権限][5]を持つロールが割り当てられたユーザーとしてログインします。

1. [Organization Settings][6] に移動します。
1. ページ左側の [Data Access Controls][7] を選択します。
1.  {{< ui >}}New Restricted Dataset{{< /ui >}} をクリックします。

制限付きデータセットを作成するには、クエリを使用して制限するデータを特定します。

{{< img src="/account_management/rbac/restricted_dataset-3.png" alt="[Create a Restricted Dataset] ダイアログタグ [service:hr] に一致する RUM、APM、ログ、およびメトリクスのデータを選択します。特権アクセスチームへのアクセス権を付与します。">}}

データセット名
: データセットに含まれるデータの内容をユーザーが理解しやすくするための説明的な名前です。

このデータセットに含めるデータを選択します。
: 特定のユーザーセットに制限するデータを定義する境界定義です。境界とは、アクセス管理者が保護対象の機密データの範囲を定義できるようにする制限付きのクエリステートメントです。[サポートされているテレメトリタイプ][10]は、カスタムメトリクス、RUM セッション、APM トレース、ログ、クラウドコスト、エラートラッキングの問題、Software Delivery リポジトリ情報 (CI Visibility パイプライン)、Workload Protection Agent Events、およびセキュリティシグナル (Cloud SIEM シグナルのみ) です。

アクセス権を付与する
: 制限付きデータセットにバインドされたコンテンツへのアクセスを許可するチームまたはロールを 1 つ以上選択します。これらのグループのメンバーではないユーザーは、このデータにアクセスできません。

**注:** 1 つの制限付きデータセットに関連付けられるプリンシパル (ロールまたはチーム) は最大 50 までです。

制限付きデータセットごとに、最大 10 個のキーと値のペアを作成できます。ペアを追加する必要がある場合は、制限付きデータセットを追加で定義することを検討してください。

データセットを定義するためのすべてのフィールドへの入力を完了したら、{{< ui >}}Create Restricted Dataset{{< /ui >}} をクリックして組織に適用します。

Enterprise プランでは最大 100 個の制限付きデータセットを作成でき、それ以外の場合は最大 10 個まで作成できます。[Strict Mode](#strict-mode) を使用している Enterprise のお客様は、最大 1,000 個の制限付きデータセットを作成できます。

### サポートされているテレメトリタイプ {#supported-telemetry}

- Agent Observability トレース
- APM トレース
- クラウドコスト
- Error Tracking の問題
- ログ
- RUM セッション
- セキュリティシグナル (Cloud SIEM シグナルのみ)
- Software Delivery リポジトリ情報 (CI Visibility パイプライン)
- Workload Protection Agent Events

以下は、リクエストに応じてプレビュー版として利用可能です。
- カスタムメトリクス
    - **注:**標準メトリクスおよび OpenTelemetry (OTel) メトリクスはサポートされていません
- Database Monitoring
- Hosts
- Processes
- Containers

## 高度な構成 {#advanced-configuration}

### Strict Mode {#strict-mode}

デフォルトでは、Data Access Control は _Standard Mode_ で動作します。これは、制限付きデータセット外のデータが、適切な権限を持つユーザーに対して表示されたままになることを意味します。_Strict Mode_ では、特定のテレメトリタイプに対してこれが逆転します。有効にすると、制限付きデータセットを通じて明示的にアクセス権が付与されない限り、ユーザーはそのテレメトリタイプのデータを一切閲覧できなくなります。

Strict Mode は、特に機密性の高いデータに対して、以下のような場合に役立ちます。
- テレメトリのタグ付けが一貫しておらず、Standard Mode の境界では機密レコードが保護されないリスクがある場合。
- 新しいタグ値が頻繁に追加され、すべての新しい値が既存の制限付きデータセットと一致することを保証できない場合。
- コンプライアンス体制において、テレメトリタイプに対してデフォルトで拒否する姿勢が求められる場合。

Strict Mode は、テレメトリタイプごとに設定されます。テレメトリタイプを Strict Mode に切り替えるには、少なくとも 1 つの制限付きデータセットが必要です。これにより、意図しないアクセス権の喪失を防ぎます。Strict Mode のテレメトリタイプからすべての制限付きデータセットが後で削除された場合、新しいデータセットが作成されるか、モードが Standard に戻されるまで、[Unrestricted User Groups](#unrestricted-user-groups) のみがアクセス権を保持します。

制限付きデータセットは、Standard モードと Strict モードの間で共有することはできません (各データセットは 1 つのモードに属します)。

**Strict Mode を有効にする前に**、そのテレメトリタイプにおいて、どのデータが制限付きデータセットに_含まれていない_かを確認してください。Strict Mode を有効にすると、そのデータは非表示になります。[Data Access Controls][7] ページで既存の制限付きデータセットを確認し、網羅されていることを確かめてください。

テレメトリタイプの制限モードを変更するには、[Data Access Controls][7] に移動してください。制限モードを変更するには、[`user_access_manage` permission][5] が必要です。

### 無制限ユーザーグループ {#unrestricted-user-groups}

高権限を持つ管理者や、組織全体のデータにアクセスできる中央オブザーバビリティチームなど、一部のユーザーは、制限付きデータセットに関係なく、テレメトリタイプ全体を完全に可視化する必要があります。これらのユーザーをすべての制限付きデータセットに個別に追加する代わりに、特定のテレメトリタイプに対して、チームまたはロールに_無制限アクセス_を付与できます。

テレメトリタイプに対して無制限アクセスを持つチームまたはロールは、制限付きデータセットの境界や制限モードに関係なく、そのテレメトリタイプのすべてのデータを表示できます。無制限アクセスは (個々のユーザーではなく) チームまたはロールに付与され、テレメトリタイプごとに構成されます。たとえば、ロールは RUM へのアクセスに影響を与えることなく、Logs への無制限アクセスを持つことができます。

無制限ユーザーグループは、指定された管理者がすべてのデータセットに追加されることなく作業を継続できるため、Strict Mode と特に相性が良いです。

**注:** 他のアクセス制御方法 ([Logs Restriction Queries][11]や[Permissions][3]など) は、無制限ユーザーグループのユーザーにも引き続き適用されます。

## 使用上の制約 {#usage-constraints}

Data Access Control を有効にすると、Datadog は機密データへのアクセスを制御するために他の機能を無効化または制限します。影響を受ける機能のリストについては、以下を参照して制限内容を確認してください。

### Real User Monitoring (RUM) {#real-user-monitoring-rum}

#### セッションリプレイ: 長期保存 {#session-replay-extended-retention}
デフォルトでは、Session Replay データは 30 日間保持されます。保持期間を 15 か月に延長するには、個々のセッションリプレイで Extended Retention を有効にできます。RUM の制限付きデータセットを作成すると、Datadog は Extended Retention のオプションを無効にします。

#### Session Replay: Playlists {#session-replay-playlists}

Playlists は、フォルダーのような構造で集約できる Session Replay のコレクションです。RUM の制限付きデータセットを作成すると、Datadog は Session Replay Playlists を無効にします。

### Logs {#logs}
Data Access Control は、[Logs RBAC permissions][11] 機能 (別名 log restriction queries) とは別個のものです。Datadog では、Logs データを制限するために単一のソリューションを使用することを推奨しています。Data Access Control と [Logs Restriction Queries] を使用してユーザーアクセスを制限する場合、両方の制限が適用されます。

### Monitors {#monitors}
ユーザーは、アクティブなテレメトリに対してクエリを実行し、アラートを送信する Monitors を作成できます。ユーザーは、自分がアクセスを許可されたデータのみを直接クエリできる一方で、Monitors はシステムユーザーとして動作し、データへのフルアクセス権を有します。

Monitors を通じた不正なデータアクセスが懸念される場合、Datadog ではユーザーが作成した Monitors を追跡することを推奨しています。その上で、機密データを読み取る Monitors の作成へのアクセスを制限してください。

### Software Delivery リポジトリ情報 (CI Visibility パイプライン) {#software-delivery-repository-info-ci-visibility-pipelines}

* **サポートされているテレメトリ**: CI Visibility パイプラインのみがサポートされています。Test Optimizations のテストはサポートされていません。
* **CI Logs**: CI Logs は Log Management 製品に保存されます。CI Logs へのアクセスを制限するには、Logs データセットを作成してください。
* **サポートされているデータセットタグ**: 以下のタグのみがサポートされています。
  * `@git.repository_url`
  * `@git.repository.id`
  * `@git.repository.id_v2`
  * `@gitlab.groups`

### Agent Observability {#agent-observability}

* **サポートされているテレメトリ**: Agent Observability トレースがサポートされています。プロジェクト内の実験に関する実験イベントデータ (スパンおよび評価メトリクス) も、`ml_app` キーの制限付きデータセットによって制限されます。制限されるのはイベントデータのみであり、実験一覧表示やメタデータは制限されません。データセット、アノテーションキュー、および管理されたプロンプトはサポートされていません。
* **OpenTelemetry**: [OpenTelemetry インスツルメンテーション][13]を使用すると、Agent Observability に送信された一部のデータが、APM トレース、メトリクス、および Monitors にも書き込まれる場合があります。Agent Observability の制限付きデータセットで機密データを保護している場合は、APM、メトリクス、または Monitors でも、データ境界を一致させた制限付きデータセットを構成することを検討してください。


## アクセス用のタグを選択 {#select-tags-for-access}

各制限付きデータセットは、メトリクスなど、複数のタイプのデータへのアクセスを制御できます。複数のタイプのテレメトリ全体で、同じタグを使用することも、異なるタグを使用することも可能です。各テレメトリタイプ内で、アクセス戦略を定義するには_単一の_タグまたは属性を使用する必要があります。

これらの制約に収まらないほどタグや属性の組み合わせが多い場合は、[タグ付けを見直して][4]、アクセス戦略をより適切に反映する新しいタグを定義することを検討してください。

### サポートされている例 {#supported-example}

#### 制限付きデータセット 1 {#restricted-dataset-1}
- テレメトリタイプ: RUM
   - フィルター: `@application.id:ABCD`

#### 制限付きデータセット 2 {#restricted-dataset-2}
* テレメトリタイプ: RUM
    * フィルター: `@application.id:EFGH`
* テレメトリタイプ: カスタムメトリクス
    * フィルター: `env:prod`

### サポートされていない例 {#not-supported-example}

#### 制限付きデータセット 1: {#restricted-dataset-1-1}
* テレメトリタイプ: RUM
    * フィルター: `@application.id:ABCD`

#### 制限付きデータセット 2: {#restricted-dataset-2-1}
* テレメトリタイプ: RUM
    * フィルター: `env:prod`

Restricted Dataset 1 は RUM データのタグとして `@application.id` を使用しているため、新しい Restricted Dataset では別のタグに変更することはできません。代わりに、Restricted Dataset 2 を再構成して `@application.id` を使用するか、RUM データを含むすべての Restricted Dataset を別のタグを使用するよう変更することを検討してください。

### サポートされていない例 {#not-supported-example-1}

#### 制限付きデータセット 1: {#restricted-dataset-1-2}
* テレメトリタイプ: RUM
    * フィルター: `@application.id:ABCD`

#### 制限付きデータセット 2: {#restricted-dataset-2-2}
* テレメトリタイプ: RUM
    * フィルター: `@application.id:IJKL` `env:prod`

この例では、Restricted Dataset 1 と同様に、RUM 用のタグとして `@application.id` が正しく使用されています。ただし、テレメトリタイプごとに使用できるタグは 1 つだけです。代わりに、_いずれか_の `application.id` または `env` を使用して Restricted Dataset を作成するか、これらの属性をより適切に組み合わせる別のタグを特定することを検討してください。

## ベストプラクティス {#best-practices}

### アクセス戦略 {#access-strategy}

Data Access Control を構成する前に、アクセス戦略を評価することが重要です。アクセス戦略を検討する際は、[データ関連リスクの低減][8]を確認することをお勧めします。Datadog に到達する前に不要なデータや機密データを削除または削減することで、追加のアクセス設定の必要性が軽減されます。

#### 既知の機密データの保護 {#protecting-known-sensitive-data}

すでに保護すべきデータを特定している場合は、その特定のデータのみを対象として Data Access Control の構成を構築できます。これにより、機密性のないデータがユーザーに広く利用可能になるため、ユーザーは協力して進行中の問題やインシデントを把握できるようになります。

たとえば、Real User Monitoring (RUM) が組み込まれており、ユーザーからの機密入力を取得する単一のアプリケーションがある場合は、そのアプリケーション専用の制限付きデータセットを作成することを検討してください。
* {{< ui >}}Name dataset:{{< /ui >}} 制限付き RUM データ
* {{< ui >}}Select data to be included in this Dataset:{{< /ui >}}
    * テレメトリタイプ: RUM
        * フィルター: `@application.id:<rum-app-id>`
* {{< ui >}}Grant access:{{< /ui >}}
    * この RUM データを閲覧できるユーザーのチームまたはロール

この構成例では、このアプリケーションからの RUM データが保護され、このアプリケーションからの他のデータは組織内の既存のユーザーが引き続き利用できるようになります。

#### サービスからのすべてのデータを保護する {#protecting-all-data-from-a-service}

特定のサービスからのデータを保護したい場合は、`service:` タグを中心に Data Access Control の構成を構築できます。

たとえば、Real User Monitoring (RUM) が組み込まれており、ユーザーからの機密入力を取得するサービス `NewService` がある場合は、そのサービス専用の制限付きデータセットを作成することを検討してください。

* {{< ui >}}Name Dataset:{{< /ui >}} 制限付き NewService データ
* {{< ui >}}Select data to be included in this Dataset:{{< /ui >}}
    * テレメトリタイプ: RUM
        * フィルター: `@service:NewService`
    * テレメトリタイプ: カスタムメトリクス
        * フィルター: `@service:NewService`
    * テレメトリタイプ: APM
        * フィルター: `@service:NewService`
    * テレメトリタイプ: ログ
        * フィルター: `@service:NewService`
* {{< ui >}}Grant access:{{< /ui >}}
    * サービスを所有するチーム

この構成例では、`NewService` からサポートされているすべてのデータを保護します。

### チームとロール {#teams-and-roles}

Data Access Control は、Datadog のロールまたはチームを通じてユーザーにアクセス権を付与することをサポートしています。アクセス権を付与する際は、既存の Access Control の構成とアクセス戦略を考慮してください。サービスベースのアプローチを採用しており、すでに[カタログのカスタマイズ][9]を行っている場合は、Data Access Control の構成の一部としてチームを使用し、サービスオーナーシップモデルを活用してください。

**注:** Data Access Control に使用されるチームは、ユーザーの追加や削除をチームメンバーまたは管理者のみが行えるように構成されている必要があります。`Anyone in the organization`

## アクセス制御{#access-enforcement}

Data Access Control が有効な Datadog 組織のユーザーは、Dashboard、Explorer、または API を通じて、自身がアクセス権を持つデータのクエリ結果のみを閲覧できます。制限付きデータセットは、許可されていないユーザーによる、すべての Datadog エクスペリエンスおよびエントリーポイントからの、制限付きデータセットで定義されたデータへのアクセスを制限します。

### データエクスプローラー{#data-explorers}

制限が有効な状態で Datadog を探索する場合、権限のないユーザーでもアセット名 (アプリケーションやメトリクス) のリストを閲覧できますが、データセットによって制限されているクエリ結果、上位タグ、ファセットの詳細は表示できません。たとえば、制限されたデータを含むメトリクスをクエリすると、グラフは空白になり、クエリがどのデータにも一致しないかのように表示されます。

### ダッシュボードとノートブック{#dashboards-and-notebooks}

RUM エクスプローラーやメトリクスエクスプローラーなどのデータエクスプローラーでデータを探索する場合と同様に、制限付きデータセットが有効な組織のダッシュボードでは、ユーザーがアクセス権を持つデータのみが表示されます。ダッシュボードは他のユーザーと共有できるオブジェクトであるため、アクセス権の異なる2人のユーザーが同じダッシュボードまたはノートブックを同時に表示し、それぞれ異なるデータを見る可能性があります。

**注**: [共有ダッシュボード][12]の閲覧者は、作成者の権限に従って Dashboard に表示されるすべてのテレメトリーデータを閲覧します。機密データや秘密情報が公開されないよう、共有する前にダッシュボードの内容を確認してください。

### API{#apis}

制限が有効な状態で Datadog API を通じてデータをクエリする場合、権限のないユーザーには、制限付きデータセットによって制限されたクエリ結果は**表示されません**。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/teams/
[2]: /ja/account_management/rbac/?tab=datadogapplication#role-based-access-control
[3]: /ja/account_management/rbac/
[4]: /ja/getting_started/tagging/
[5]: /ja/account_management/rbac/permissions/#access-management
[6]: https://app.datadoghq.com/organization-settings/
[7]: https://app.datadoghq.com/organization-settings/data-access-controls/
[8]: /ja/data_security/
[9]: /ja/internal_developer_portal/catalog/set_up/
[10]: /ja/account_management/rbac/data_access/#supported-telemetry
[11]: /ja/logs/guide/logs-rbac/?tab=ui#restrict-access-to-logs
[12]: /ja/dashboards/sharing/shared_dashboards/
[13]: /ja/llm_observability/instrumentation/otel_instrumentation/