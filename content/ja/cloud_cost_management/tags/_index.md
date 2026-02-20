---
description: Cloud Cost Management でタグがどのように取得、強化、管理されるかを学びます。
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management について
- link: /cloud_cost_management/tags/tag_pipelines
  tag: ドキュメント
  text: タグパイプライン
- link: /cloud_cost_management/tags/tag_explorer
  tag: ドキュメント
  text: タグエクスプローラー
- link: /getting_started/tagging/
  tag: ドキュメント
  text: タグの使用を開始する
title: タグ
---

## 概要

タグは、クラウドと SaaS のコストをあらゆる観点から調査し、理解するのに役立ちます。タグはタグキーと値で構成されます。たとえば、`aws_product:ec2` の場合、タグキーは `aws_product`、値は `ec2` です。

Cloud Cost Management は、複数のソースから取得したタグでコスト データを自動的に強化し、刻々と変化するクラウド環境においてより適切なコスト配分を実現し、インフラ コストの所有者をより詳細に把握できるようにします。タグを使用することで、共有コストを公平に配分し、正確なレポートを作成し、チーム、サービス、環境ごとにコストを追跡できます。

## タグの収集元

Datadog は、すべてのクラウドおよび SaaS プロバイダーを対象に、以下のソースからタグを収集し (他の Datadog 製品からのデータを使ったコスト データの強化を含みます)、コスト データに追加します。

| ソース | 収集されるタグ | 説明  |
|---|---|---|
| すべてのプロバイダー | 請求関連の列 | AWS Cost and Usage Report (CUR) の列や Google Billing Export の列など。 |
| Datadog エンリッチメント | ホスト Agent | ホスト上で実行されている Datadog Agent によってホストのメタデータに追加されたタグ。 |
| Datadog エンリッチメント | ソフトウェアカタログ | APM Service Catalog でこのサービスに関連するタグ |
| Datadog エンリッチメント | インテグレーション タイル | 特定のクラウド アカウントの Datadog インテグレーション タイルに追加されたタグ。インテグレーション タイルのタグは、そのアカウントのすべてのコストに適用されます。各アカウントでそのプロバイダーのインテグレーションを有効にする必要があります。 |
| Datadog エンリッチメント | Data Observability | Datadog Data Observability のタグで、BigQuery のコスト配分を強化します。BigQuery モニタリングを有効化する必要があります。 |
| Datadog エンリッチメント | クラウドネットワークモニタリング | [Datadog Cloud Network Monitoring][12] から取得する送信元および宛先に関するディメンション。Datadog Agent で Cloud Network Monitoring を有効にする必要があります。詳細は、[データ転送コストの配分][13]を参照してください。 |
| Kubernetes エンリッチメント | Kubernetes ノード | Datadog で監視されている Kubernetes ノードで検出されたユーザー定義のタグ |
| Kubernetes エンリッチメント | Kubernetes ポッド | Datadog で監視されている Kubernetes ポッドで検出されたユーザー定義のタグ |
| Kubernetes エンリッチメント | Kubernetes 永続ボリューム | Datadog で監視されている Kubernetes クラスターの永続ボリュームで検出されたユーザー定義のタグ |
| Kubernetes エンリッチメント | Kubernetes Persistent Volume Claim (PVC) | Datadog で監視されている Kubernetes クラスターの Persistent Volume Claim (PVC) で検出されたユーザー定義のタグ |
| Cloud Cost Management | クラウド コストのエイリアス | `aws_product` (`lineItem/ProductCode` のエイリアス) など、コスト データ モデルを簡素化するためにプロバイダーのコスト データから派生したタグです。コスト データとインテグレーション メトリクスの両方に存在するタグが追加され、カスタム割り当てルール、ダッシュボード、ノートブックでコスト データと使用量データを組み合わせることができます。 |
| Cloud Cost Management | クラウド コスト配分 | [コスト配分][11]の際に作成された、共有リソースの分割を指定するタグ (`allocated_spend_type` など)。 |
| Cloud Cost Management | FOCUS | クラウド ベンダー間でコストと使用量のデータセットを正規化するオープン仕様である [FOCUS][8] に準拠した、プロバイダーに依存しないタグ。 |
| タグパイプライン | ユーザー定義のルール | タグ パイプラインをコスト データに適用して作成されたタグ |
| カスタム割り当てルール | ユーザー定義のルール | カスタム割り当てルールをコスト データに適用して作成されたタグ (SaaS のコストには適用されません) |

また、Datadog はプロバイダー固有のタグも追加します。

| プロバイダー | 収集されるタグ | 説明  |
|---|---|---|
| AWS | コスト配分タグ | AWS CUR に表示される [AWS コスト配分][1]タグでユーザーが定義した任意のタグ。 |
| AWS | AWS Resource Groups Tagging API | [Groups Tagging API][10] を使用して Cloud Cost Management によって取得された、AWS のクラウド リソース上のユーザー定義タグ。 |
| AWS | AWS 組織単位 | [AWS Organizations][7] を使用して AWS 組織単位に設定されたユーザー定義タグ |
| AWS | AWS Organizations - アカウント | [AWS Organizations][7] を使用して AWS アカウントに設定されたユーザー定義タグ |
| Amazon ECS | Amazon ECS タスク | ECS タスク定義に設定されたユーザー定義タグ |
| Amazon ECS | Amazon ECS コンテナ | ECS タスクで実行されるコンテナに設定されたユーザー定義タグ |
| Azure | Azure コスト エクスポート - ユーザー リソース タグ | Azure コスト エクスポートの **Tags** 列にある、Azure のクラウド リソースに設定されたユーザー定義タグです。リソース グループのタグは含まれません。 |
| Azure | Azure コスト エクスポート - システム リソース タグ | Azure コスト エクスポートの **AdditionalInfo** 列にある、クラウド リソースに設定された Azure によって定義されたタグです。 |
| Google Cloud | Google Billing Export - プロジェクト ラベル| 課金データ エクスポートの **project.labels** 列にある、Google Cloud のプロジェクトに設定されたユーザー定義ラベルです。 |
| Google Cloud | Google Billing Export - システム リソース ラベル | 課金データ エクスポートの **system_labels** 列にある、Google Cloud のリソースに設定されたシステム生成ラベルです。 |
| Google Cloud | Google Billing Export - ユーザー リソース ラベル | 課金データ エクスポートの **labels** 列にある、Google Cloud のクラウド リソースに設定されたユーザー定義ラベルです。 |
| Google Cloud | Google Billing Export - ユーザー リソース タグ | 課金データ エクスポートの **tags** 列にある、Google Cloud のクラウド リソースに設定されたユーザー定義タグです。`goog-originating-sku-description` タグは、Google の SKU API を活用して追加され、コミットメント ライン項目に対してより詳細な SKU 情報を提供します。 |
| Google Cloud | GKE ポッド | Google Kubernetes Engine で実行されているポッドに設定されたユーザー定義のラベル |
| Oracle Cloud | OCI コスト エクスポート - ユーザー リソース タグ | OCI FOCUS コスト エクスポートの **Tags** 列にある、Oracle Cloud Infrastructure のクラウド リソースに設定されたユーザー定義タグです。 |
| Datadog | Datadog 使用属性 | Datadog Plan and Usage の Usage Attribution で使用するユーザー定義タグ |
| カスタムコスト | コスト ファイル タグ | Cloud Cost Management にアップロードされた [コスト ファイル][9] にある、各プロバイダーに設定されたユーザー定義タグです。 |

## タグの正規化方法

Cloud Cost Management に表示されるタグのキーと値は、タグの正規化が原因で、プロバイダーや Datadog の他の領域における表示と若干異なる場合があります。

Cloud Cost Management では、Datadog メトリクスと似たような方法でタグ **キー** が正規化されます。
- 先頭の英字以外の文字を削除する
- すべての文字を小文字にする
- 特殊文字とスペースをアンダースコア (`_`) に置き換える
- 末尾のアンダースコアを取り除く
- アンダースコアが連続する場合は、1 つを残して削除する
- タグ キーは 5000 文字までサポートされ、先頭の英字以外の文字は削除されるため、タグ キーは英字で始まります (Datadog メトリクスとは異なります)。

Cloud Cost Management ではタグの **値** も正規化されますが、コスト レポートのために人間が読める形のタグ値が維持されます。たとえば、`aws_instance_family:Machine Learning ASIC Instances` は `machine_learning_asic_instances` のような形に変換されるのではなく、可読性が維持されます。正規化は次のロジックに従って行われます。
- 連続する空白文字を 1 つの空白文字に変換する
- 文字、マーク、数字、句読点、記号はすべて残す
- それ以外の文字はアンダースコア (`_`) に置き換える
- タグ値は 5000 文字までサポートされます

Cloud Cost Recommendations は、[標準的な Datadog メトリクスの正規化ルール][14]を使用します。推奨事項内のタグ値は小文字に変換され、200 文字に制限されます。
たとえば、`Team:Engineering-Services` というタグは、推奨事項内では `team:engineering-services` と表示されますが、コスト データでは `team:Engineering-Services` と表示されます。

## タグ値の正規化をオーバーライドする

Tag Pipelines ページの **Tag Normalization** をオンにすると、コスト関連のすべてのタグ値がメトリクスの正規化と一致するように正規化されます。上記の例では、あらゆる場所で `team:engineering-services` の形で表示されます。現時点では、タグの正規化はクラウド コストから取得したユーザー定義タグにのみ適用され、タグ パイプラインから出力されたタグには適用されません。Tag Normalization のトグルは、すべての新規ユーザーに対してデフォルトで有効になっており、過去 3 か月分のタグ値が自動的に正規化されてバックフィルされます。正規化されたタグのバックフィル期間を最大 15 か月まで延長するには、[Datadog サポート][13]にお問い合わせください。

タグの正規化により、以下のことが可能になります。
- コストの推奨事項とコスト データを同じタグ値を使って表示、フィルタリング、グループ化する
- コスト データと可観測性データを同じタグ値を使って相関付ける
- 大文字・小文字の違いがあるタグ値を自動的に結合する (例: `env:Engineering-Prod` と `env:engineering-Prod` は、タグ パイプラインを手動で設定しなくても `env:engineering-prod` に正規化されます)。

{{< img src="cloud_cost/tag_normalization_toggle.png" alt="コスト データのすべてのタグを正規化するオプションのトグルが表示された、タグ パイプラインのインターフェイス" style="width:80%;" >}}

## タグの優先順位

複数のソースからのタグ値が組み合わされ、いずれのソースも他のソースより優先されない場合、コスト データの 1 行が同じタグ キーに対して複数の値を持つ可能性があります。

競合を解消し、この問題を軽減するために、Cloud Cost Management では重複したタグを追加する代わりに、各タグ キーに対して最も具体的なソースを使用して既存のタグを置き換えます。たとえば、Kubernetes ポッドのタグ `team:shopping` が優先され、Kubernetes ノードのタグ `team:compute` は置き換えられます。

競合が発生する場合、次のリストの上位のソースによって、下位のソースのタグ値が置き換えられます。
- カスタム割り当てルール
- FOCUS
- サービスカタログ
- Amazon ECS コンテナ
- Amazon ECS タスク
- Kubernetes ポッド
- Kubernetes 永続ボリューム
- Kubernetes ノード
- ホスト Agent

その他のタグ ソース (AWS 組織タグ、インテグレーション タイル タグ、その他これらに類するソース) は、上記のソースによって上書きされる可能性があります。請求関連の列と FOCUS の列は予約済みで、どのソースによっても上書きできません。タグ パイプラインは新しいタグを追加しますが、既存のタグを上書きすることはありません。

## タグ付けの改善

1. **どのタグが存在するかを理解する** - [タグ エクスプローラー][5] を使用して、コスト データですでに利用可能なタグを確認します。
2. **コスト配分のギャップを特定する** - エクスプローラーで、任意のタグでグループ化し、そのタグに割り当てられたコスト、または未割り当てのコスト (`N/A` と表示されます) を確認します。ポッドのタグが含まれたコスト配分を確認するために、"Container Allocated" が有効になっていることを確認してください。
3. **共有コストを分割する** - [カスタム割り当てルール][6] を使用して、共有コストを分割し、チームやサービスなどに割り当て直すことができます。観測可能性データを使用することで、インフラストラクチャーの使用状況に基づいてコストを正確に分割できます。
4. **タグの欠落や誤りに対処する** - 誤ったタグ付けに対処するために、[タグ パイプライン][4] を使用してタグにエイリアスを付けたり、新しいタグを作成したりすることができます。たとえば、組織で標準の `application` タグ キーを使用したいにもかかわらず、各チームがバリエーション (app、webapp、apps など) を使用している場合、これらのタグを統合して `application` にすることで、より正確なコスト 報告を行うことができます。
5. **新しいタグを追加する** - [タグ パイプライン][4] を使用することで、チーム構成に基づく `business-unit` タグなど、特定のビジネス ロジックに沿った新しい推論タグを自動的に作成できます。

{{< img src="cloud_cost/tag_explorer/aws_1.png" alt="利用可能な AWS タグとその使用状況が表示されたタグ エクスプローラー インターフェイス" style="width:80%;" >}}
## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html
[2]: /ja/cloud_cost_management/container_cost_allocation
[3]: /ja/cloud_cost_management/setup/aws/#aws-resource-tags
[4]: /ja/cloud_cost_management/tags/tag_pipelines
[5]: /ja/cloud_cost_management/tags/tag_explorer
[6]: /ja/cloud_cost_management/allocation/custom_allocation_rules
[7]: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html
[8]: https://focus.finops.org/
[9]: /ja/cloud_cost_management/setup/custom?tab=csv
[10]: https://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/overview.html
[11]: /ja/cloud_cost_management/allocation/container_cost_allocation/
[12]: /ja/network_monitoring/cloud_network_monitoring/
[13]: /ja/cloud_cost_management/allocation/container_cost_allocation/?tab=aws#data-transfer
[14]: /ja/getting_started/tagging/#define-tags
[15]: /ja/help/