---
description: アクセス制御のために制限付きデータセットを定義します。
further_reading:
- link: /data_security/
  tag: ドキュメント
  text: データ関連リスクの低減
is_public: true
title: Data Access Control
---
## 概要 {#overview}

Datadog 内のデータには機密データが含まれている可能性があるため、慎重に取り扱う必要があります。Datadog に機密データを取り込んでいる場合、Data Access Control を使用すると、Datadog 組織内の管理者およびアクセス管理者がこのデータへのアクセスを制御できます。Data Access Control を使用してクエリで機密データを特定し、特定の [Teams][1] または [Roles][2] のみにアクセスを制限します。

_Restricted Dataset_ を定義すると、そのデータセットの境界内にあるデータはすべて制限されます。Restricted Dataset に含まれないデータは制限されず、適切な権限を持つユーザーがアクセスできます。Data Access Control は、アクセス管理者がデータセット内に含まれる機密データへのアクセスを許可されたユーザーのみに付与できる直感的なインターフェースを提供します。

## 前提条件 {#prerequisites}

### アクセス制御を構成する {#configure-access-controls}

Data Access Control は、組織の既存の Datadog アクセス制御設定に基づいて構築されます。Data Access Control を構成する前に、まず [アクセス制御][3] をセットアップしてください。

### 受信データにタグを付ける {#tag-incoming-data}

Data Access Control は、アクセス境界の定義に使用できるデータ内のタグと属性に依存します。タグが定義されていない場合は、Data Access Control を構成する前に [タグ入門][4] を参照してください。

## データアクセスを構成する {#configure-data-access}

Data Access Control を使用すると、Restricted Dataset を作成し、指定された Teams または Roles のユーザーのみがアクセスできるデータを指定できます。

すべての Restricted Datasets を表示するには、[組織設定][6] に移動し、左側の {{< ui >}}Access{{< /ui >}} 見出しの下にある [Data Access Controls][7] を選択します。

### Datadog サイト {#datadog-site}

Datadog Admin ロールが割り当てられたユーザー、または組織内で [`user_access_manage` 権限][5] を持つロールが割り当てられたユーザーとしてログインします。

1. [組織設定][6] に移動します。
1. ページの左側で、[Data Access Controls][7] を選択します。
1. [{{< ui >}}New Restricted Dataset{{< /ui >}}] をクリックします。

Restricted Dataset を作成するには、クエリを使用して制限対象のデータを特定します。

{{< img src="/account_management/rbac/restricted_dataset-3.png" alt="Restricted Dataset の作成ダイアログ。タグ service:hr に一致する RUM、APM、ログ、およびメトリクスのデータを選択します。特権アクセスチームへのアクセス権を付与します。">}}

Name Dataset
: データセットに含まれるデータをユーザーが理解しやすくするための説明的な名前。

この Dataset に含めるデータを選択します。
: 特定のユーザーセットへのアクセスを制限するデータを記述する境界定義。境界とは、アクセス管理者が保護対象の機密データの範囲を定義できるようにする、制限付きのクエリステートメントです。[サポートされているテレメトリタイプ][10] は、カスタムメトリクス、RUM セッション、APM トレース、ログ、クラウドコスト、Error Tracking の問題、Software Delivery リポジトリ情報 (CI Visibility pipelines)、および Workload Protection Agent Events です。

アクセス権を付与する
: Restricted Dataset にバインドされたコンテンツへのアクセスを許可する Teams または Roles を 1 つ以上選択します。これらのグループのメンバーではないユーザーは、このデータへのアクセスがブロックされます。

**注:** 1 つの Restricted Dataset に関連付けられるプリンシパル (Roles または Teams) は最大 50 個までです。

1 つの Restricted Dataset につき、最大 10 個の key:value ペアを作成できます。追加のペアが必要な場合は、追加の Restricted Dataset の定義を検討してください。

データセットを定義するためのすべてのフィールドへの入力を完了したら、{{< ui >}}Create Restricted Dataset{{< /ui >}} をクリックして組織に適用します。

Enterprise プランでは最大 100 個の Restricted Datasets、それ以外のプランでは最大 10 個の Dataset を作成できます。[Strict Mode](#strict-mode) を使用している Enterprise のお客様は、最大 1,000 個の Restricted Datasets を作成できます。

### サポートされているテレメトリタイプ {#supported-telemetry}

- Agent Observability トレース
- APM トレース
- クラウドコスト
- Error Tracking の問題
- ログ
- RUM セッション
- Software Delivery リポジトリ情報 (CI Visibility pipelines 内)
- Workload Protection Agent Events

以下は、リクエストに応じてプレビューとして利用できます。
- カスタムメトリクス
    - **注:** Standard および OpenTelemetry (OTel) メトリクスはサポートされていません

## 高度な構成 {#advanced-configuration}

### Strict Mode{#strict-mode}

デフォルトでは、Data Access Control は _Standard Mode_ で動作します。これは、Restricted Dataset の範囲外にあるデータは、適切な権限を持つユーザーから引き続き表示されることを意味します。_Strict Mode_ は、特定のテレメトリタイプに対してこの動作を反転させます。有効にすると、そのテレメトリタイプのデータは、Restricted Dataset を通じて明示的にアクセス権を付与されない限り、ユーザーには表示されません。

Strict Mode は、特に機密性の高いデータに対して、以下の場合に有効です。
- テレメトリのタグ付けに一貫性がないため、Standard Mode の境界では機密レコードが保護対象から漏れるリスクがあります。
- 新しいタグ値が頻繁に追加され、すべての新しい値が既存の Restricted Dataset で一致することを保証できない場合。
- コンプライアンス要件により、テレメトリタイプに対してデフォルト拒否の姿勢が必要な場合。

Strict Mode は、テレメトリタイプごとに設定されます。テレメトリタイプを Strict Mode に切り替えるには、少なくとも 1 つの Restricted Dataset が必要です。これにより、意図しないアクセス権の喪失を防ぎます。Strict Mode のテレメトリタイプからすべての Restricted Datasets が後で削除された場合、新しい Dataset が作成されるか、モードが Standard に戻されるまで、アクセスを維持できるのは [Unrestricted User Groups](#unrestricted-user-groups) のみです。

Restricted Datasets は Standard Mode と Strict Mode の間で共有できません (各 Dataset はいずれか一方のモードに属します)。

**Strict Mode を有効にする前に**、そのテレメトリタイプについて、まだ Restricted Dataset に含まれて_いない_データを確認してください。Strict Mode が有効になると、そのデータは非表示になります。[Data Access Controls][7] ページで既存の Restricted Datasets を確認し、カバー範囲を確認してください。

テレメトリタイプの制限モードを変更するには、[Data Access Controls][7] に移動してください。ユーザーが制限モードを変更するには、[`user_access_manage` 権限][5] が必要です。

### Unrestricted User Groups {#unrestricted-user-groups}

高い権限を持つ管理者や、組織全体のデータにアクセスできる中央 Observability チームなど、一部のユーザーは、Restricted Datasets の有無にかかわらず、テレメトリタイプ全体を完全に可視化する必要があります。これらのユーザーを各 Restricted Dataset に個別に追加する代わりに、特定のテレメトリタイプに対して、そのユーザーのチームまたはロールに _Unrestricted Access_ を付与できます。

テレメトリタイプに対して Unrestricted Access を持つチームまたはロールは、Restricted Dataset の境界や制限モードに関係なく、そのテレメトリタイプのすべてのデータを表示できます。Unrestricted Access はチームまたはロール (個々のユーザーではありません) に付与され、テレメトリタイプごとに設定されます。たとえば、あるロールは RUM へのアクセスに影響を与えることなく、Logs に対する Unrestricted Access を持つことができます。

Unrestricted User Groups は Strict Mode と特に相性がよく、指定された管理者をすべての Dataset に追加することなく、引き続き作業できるようにします。

**注:** 他のアクセス制御方法 ([ログ制限クエリ][11] や [権限][3] など) は、Unrestricted User Groups 内のユーザーにも引き続き適用されます。

## 使用上の制約{#usage-constraints}

Data Access Control を有効にすると、Datadog は機密データへのアクセスを制御するために、他の機能を無効化または制限します。影響を受ける機能の一覧を以下で確認し、それらがどのように制限されるかを確認してください。

### Real User Monitoring (RUM) {#real-user-monitoring-rum}

#### Session Replay: Extended Retention {#session-replay-extended-retention}
デフォルトでは、セッションリプレイデータは 30 日間保持されます。保持期間を 15 か月に延長するには、個々の Session Replay で [Extended Retention] を有効にします。RUM 用の Restricted Dataset を作成すると、Datadog は [Extended Retention] のオプションを無効にします。

#### Session Replay: Playlists {#session-replay-playlists}

Playlists は、Session Replay をフォルダーのような構造でまとめられるコレクションです。RUM 用の Restricted Dataset を作成すると、Datadog は [Session Replay Playlists] を無効にします。

### ログ {#logs}
Data Access Control は、ログ制限クエリとしても知られる既存の [Logs RBAC 権限][11] 機能とは別の機能です。Datadog では、ログデータを制限するために単一のソリューションを使用することを推奨しています。Data Access Control とログ制限クエリの両方を使用してユーザーアクセスを制限した場合、両方の制限が適用されます。

### モニター {#monitors}
ユーザーは、アクティブなテレメトリに対してクエリを実行し、アラートを発するモニターを作成できます。ユーザーが直接クエリを実行できるのは、アクセスを許可されたデータのみですが、モニターはデータへのフルアクセス権を持つシステムユーザーとして動作します。

モニターを通じた不正なデータアクセスが懸念される場合、Datadog ではユーザーが作成したモニターを追跡することを推奨しています。その上で、機密データを読み取るモニターの作成へのアクセスを制限してください。

### Software Delivery リポジトリ情報 (CI Visibility パイプライン) {#software-delivery-repository-info-ci-visibility-pipelines}

* **サポートされているテレメトリ**: CI Visibility パイプラインのみがサポートされています。Test Optimizations のテストはサポートされていません。
* **CI Logs**: CI Logs は Log Management 製品に保存されます。CI Logs へのアクセスを制限するには、Logs Dataset を作成します。
* **サポートされている Dataset タグ**: 以下のタグのみがサポートされています。
  * `@git.repository_url`
  * `@git.repository.id`
  * `@git.repository.id_v2`
  * `@gitlab.groups`

### Agent Observability {#agent-observability}

* **サポートされているテレメトリ**: Agent Observability トレースがサポートされています。プロジェクト内の実験に関する実験イベントデータ (スパンおよび評価メトリクス) も、`ml_app` キー付きの Restricted Dataset によって制限されます。制限されるのはイベントデータのみであり、実験リストビューやメタデータは制限されません。Dataset、Annotation Queues、および Managed Prompts はサポートされていません。
* **OpenTelemetry**: [OpenTelemetry Instrumentation][13] を使用する場合、Agent Observability に送信される一部のデータは、APM トレース、メトリクス、およびモニターにも書き込まれる場合があります。Agent Observability で Restricted Dataset を使用して機密データを保護している場合は、APM、メトリクス、またはモニターでも、一致するデータ境界を持つ Restricted Dataset を構成することを検討してください。


## アクセス用のタグを選択 {#select-tags-for-access}

各 Restricted Dataset は、メトリクスなど、複数のタイプのデータへのアクセスを制御できます。複数のタイプのテレメトリ間で、同じタグまたは異なるタグを自由に使用できます。各テレメトリタイプ内では、アクセス戦略を定義するために_単一の_タグまたは属性を使用する必要があります。

タグや属性の組み合わせが多すぎてこれらの制約内に収まらない場合は、アクセス戦略をより適切に反映する新しいタグを定義するために、[タグ付けの見直し][4] を検討してください。

### サポートされている例{#supported-example}

#### Restricted Dataset 1 {#restricted-dataset-1}
- テレメトリタイプ: RUM
   - フィルター: `@application.id:ABCD`

#### Restricted Dataset 2 {#restricted-dataset-2}
* テレメトリタイプ: RUM
    * フィルター: `@application.id:EFGH`
* テレメトリタイプ: Custom Metrics
    * フィルター: `env:prod`

### サポートされていない例 {#not-supported-example}

#### Restricted Dataset 1: {#restricted-dataset-1-1}
* テレメトリタイプ: RUM
    * フィルター: `@application.id:ABCD`

#### Restricted Dataset 2: {#restricted-dataset-2-1}
* テレメトリタイプ: RUM
    * フィルター: `env:prod`

Restricted Dataset 1 は RUM データのタグとして `@application.id` を使用しているため、新しい Restricted Dataset で別のタグに変更することはできません。代わりに、Restricted Dataset 2 を再構成して `@application.id` を使用するか、RUM データを含むすべての Restricted Dataset で別のタグを使用するように変更することを検討してください。

### サポートされていない例 {#not-supported-example-1}

#### Restricted Dataset 1: {#restricted-dataset-1-2}
* テレメトリタイプ: RUM
    * フィルター: `@application.id:ABCD`

#### Restricted Dataset 2: {#restricted-dataset-2-2}
* テレメトリタイプ: RUM
    * フィルター: `@application.id:IJKL` `env:prod`

この例では、Restricted Dataset 1 と同様に、RUM に対して `@application.id` タグが正しく使用されています。ただし、テレメトリタイプごとに使用できるタグは 1 つまでです。代わりに、`application.id` または `env` の_いずれか_を使用する Restricted Dataset を作成するか、これらの属性をより適切に組み合わせる別のタグを特定することを検討してください。

## ベストプラクティス {#best-practices}

### アクセス戦略 {#access-strategy}

Data Access Control を構成する前に、アクセス戦略を評価することが重要です。アクセス戦略を検討する際は、[データ関連リスクの低減][8] を確認することを検討してください。Datadog に到達する前に不要なデータや機密データを削除または削減することで、追加のアクセス設定の必要性を減らせます。

#### 既知の機密データを保護する {#protecting-known-sensitive-data}

保護が必要なデータをすでに特定している場合は、その特定のデータのみを対象として Data Access Control の構成を構築できます。これにより、機密性のないデータは一般的にユーザーが利用できる状態になり、ユーザーは協力して進行中の問題やインシデントを把握できます。

たとえば、Real User Monitoring (RUM) がインスツルメントされており、ユーザーからの機密入力を取得しているアプリケーションが 1 つだけある場合は、そのアプリケーション専用の Restricted Dataset を作成することを検討してください。
* {{< ui >}}Name dataset:{{< /ui >}} Restricted RUM データ
* {{< ui >}}Select data to be included in this Dataset:{{< /ui >}}
    * テレメトリタイプ: RUM
        * フィルター: `@application.id:<rum-app-id>`
* {{< ui >}}Grant access:{{< /ui >}}
    * この RUM データを閲覧できる Teams またはユーザーのロール

この構成例では、このアプリケーションからの RUM データを保護しつつ、このアプリケーションの他のデータを組織内の既存ユーザーが利用できる状態にします。

#### サービスからのすべてのデータを保護する {#protecting-all-data-from-a-service}

特定のサービスからのデータを保護したい場合は、`service:` タグを中心に Data Access Control の構成を構築できます。

たとえば、Real User Monitoring (RUM) がインスツルメントされており、ユーザーからの機密入力を取得しているサービス `NewService` がある場合は、そのサービス専用の Restricted Dataset を作成することを検討してください。

* {{< ui >}}Name Dataset:{{< /ui >}} Restricted NewService データ
* {{< ui >}}Select data to be included in this Dataset:{{< /ui >}}
    * テレメトリタイプ: RUM
        * フィルター: `@service:NewService`
    * テレメトリタイプ: Custom Metrics
        * フィルター: `@service:NewService`
    * テレメトリタイプ: APM
        * フィルター: `@service:NewService`
    * テレメトリタイプ: Logs
        * フィルター: `@service:NewService`
* {{< ui >}}Grant access:{{< /ui >}}
    * サービスを所有する Team

この構成例は、`NewService` からのサポートされているすべてのデータを保護します。

### Teams とロール {#teams-and-roles}

Data Access Control は、Datadog のロールまたは Teams を通じてユーザーにアクセス権を付与することをサポートしています。アクセス権を付与する際は、既存のアクセス制御構成とアクセス戦略を考慮してください。サービスベースのアプローチを採用しており、すでに [カタログのカスタマイズ][9] を行っている場合は、Data Access Control の構成の一部として Teams を使用することで、サービス所有権モデルを活用してください。

**注:** Data Access Control に使用する Teams は、ユーザーの追加や削除を Teams メンバーまたは管理者のみが行えるように構成する必要があります。`Anyone in the organization`では行えません。

## アクセス強制{#access-enforcement}

Data Access Control が有効な Datadog 組織のユーザーは、Dashboard、Explorer、または API を通じて、アクセス権を持つデータのクエリ結果のみを閲覧できます。Restricted Dataset は、許可されていないユーザーに対して、すべての Datadog エクスペリエンスおよびエントリポイントで、Restricted Dataset に定義されたデータへのアクセスを削除します。

### Data Explorer {#data-explorers}

制限が有効な状態で Datadog を探索する場合、権限のないユーザーでもアセット名 (アプリケーションやメトリクス) のリストを閲覧できますが、データセットによって制限されているクエリ結果、トップタグ、またはファセットの詳細を閲覧することはできません。たとえば、制限付きデータを含むメトリクスをクエリすると、グラフが空白で表示され、クエリがどのデータにも一致しないように見えます。

### Dashboards と Notebooks {#dashboards-and-notebooks}

RUM Explorer や Metrics Explorer などの Data Explorer でデータを探索する場合と同様に、Restricted Datasets が有効な組織の Dashboard でデータを閲覧すると、ユーザーがアクセスできるデータのみが表示されます。Dashboards は他のユーザーと共有できるオブジェクトであるため、異なるアクセス権を持つ 2 人のユーザーが同じ Dashboard または Notebook を同時に閲覧し、それぞれ異なるデータを表示する可能性があります。

**注**: [Shared Dashboards][12] の閲覧者は、Dashboard に表示されるすべてのテレメトリデータを、作成者の権限に従って閲覧します。機密情報や秘密情報が公開されないよう、共有前に Dashboard のコンテンツを確認してください。

### APIs {#apis}

制限が有効な状態で Datadog API を通じてデータをクエリする場合、権限のないユーザーには、Restricted Datasets によって制限されたクエリ結果は**表示されません**。

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