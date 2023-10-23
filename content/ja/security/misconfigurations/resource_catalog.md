---
aliases:
- /ja/security_platform/cspm/resource_catalog
- /ja/security/cspm/resource_catalog
further_reading:
- link: /security/misconfigurations/custom_rules/schema/
  tag: ドキュメント
  text: Cloud Resource Schema
kind: documentation
title: Datadog Resource Catalog
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Resource Catalog は、現在このサイトでは利用できません。
</div>
{{< /site-region >}}

Datadog Resource Catalog は、クラウドやハイブリッド環境におけるホストやリソースの大まかな概要を提供します。タグ、構成の詳細、アセット間の関係、誤構成、脅威などの情報を表示します。各リソースを担当するチームと、報告されたセキュリティの誤構成を確認できます。ダッシュボードと Datadog ビューにアクセスし、各リソースのテレメトリーとセキュリティデータを受信して監視します。

Resource Catalog は、Datadog のクラウドインテグレーションと Datadog Agent を活用し、データベース、ストレージサービス、ホストなどのクラウドリソースからデータを収集することができます。

{{< img src="security/cspm/resource_catalog/resource_catalog2.png" alt="ホストとクラウドのリソースをカテゴリー別、地域別に分類して表示する Resource Catalog のマップビュー。" style="width:100%;" >}}

## Resource Catalog にリソースを追加する

Resource Catalog にクラウドリソースを表示するには、各クラウドアカウントで [Cloud Security Management][1] を有効にします。

Resource Catalog の利用用途

- すべてのリソースとその関係、セキュリティ状態、担当チームやその上で動作するサービスに関する情報を明確に表示することで、新しいサイトの信頼性とセキュリティエンジニアの育成を実現する。
- 信頼性を高めてアップストリームおよびダウンストリームのリソースの所有者の特定を簡素化することで、インシデント復旧を速める。
- 誤構成が最も発生しやすいリソースや、セキュリティの誤構成を積極的に報告していないリソースを特定し、適切なセキュリティカバレッジを確保する。
- テレメトリー間のインサイトを最適化するために、良いタグ付けの実践を促進する。
- エンジニアリングリーダーシップに、チームやクラウドアカウント全体のセキュリティプラクティスの概要を提供する。

## Resource Catalog の閲覧

[Resource Catalog ページ][2]で、Datadog 組織内のクラウドリソースを検索します。カタログがリソースを検出するのは、そのリソースに Agent がインストールされているか、またはクラウドインテグレーションが構成されているためです。組織内のリソースに関する情報は、ownership と security のタブに表示され、リストとマップの 2 つのビューが用意されています。

**Ownership タブ**:
ownership タブでは、チーム、サービス、オンコール、連絡先などのリソースの所有権情報を理解することができます。このページでは、ユーザーが所有権情報の欠如を積極的に特定し、インシデントが発生する前にこれを解決することが可能です。

**Security タブ**:
Security タブでは、セキュリティリスクのあるリソースを明確に理解することができます。リソースに関連する誤構成と脅威を確認することで、セキュリティコンテキストの収集に時間や労力をかけることなく、問題に対処することができます。

### リストビュー

リソースカタログのリストでは、クラウドプラットフォーム、リソースの種類、アカウント、チーム、地域、誤構成、脅威によってリソースを並べ替えることができます。**Threats** で並べ替えると、過去 4 時間以内に影響を受けたワークロードを特定することができます。誤構成が最も発生しやすいクラウドリソースを特定するには、**Misconfigurations** で並べ替えます。

特定のリソースを見つけるには、その名前で検索します。リストをフィルターして、最も関心のあるリソースのサブセットを表示するには、左のパネルでファセットを選択します。例えば、チーム名でフィルターをかけたり、特定の環境やクラスターに誤構成を絞り込むことができます。

[Datadog Teams][4] を使用している場合、左パネルの **Teams** トグルを選択し、割り当てられたチームのトグルを選択すると、そのチームに割り当てられたリソースのみを表示できます。

### マップビュー

Resource Catalog マップは、組織内のリソースを視覚化したものです。特定のリソースを見つけるには、その名前で検索します。リソースを地域別にグループ化し、クラウドプロバイダーやリソースタイプなどのフィルターを適用して、 一致するリソースのみを表示することもできます。また、`Fill by` セレクターを使用すると、マップ要素を誤構成や脅威で色分けすることができます。

[Datadog Teams][4] を使用している場合、左パネルの **Teams** トグルを選択し、割り当てられたチームのトグルを選択すると、そのチームに割り当てられたリソースのみを表示できます。

#### 誤構成

各色は、リソースで検出された最も重大な誤構成に対応します。緑色は、リソースが正しく構成されていることを示します。白は、Cloud Security Management Misconfigurations が監視していないリソースに表示されます。

#### 脅威

脅威は過去 4 時間のデータを反映しており、Amazon EC2 や Azure VM などのコンピュートインスタンスでのみ利用可能です。白色は、アクティブな脅威が検出されていないことを示します。青から赤の色調は、リソースで検出された最も重大度の高い脅威を反映しています。

## リソースを調査する

リソースをクリックすると、サイドパネルが開き、以下のような詳細が表示されます。

- **Resource information**: リソースの種類、名前、アカウント、リソースに関連するタグなど。
- **Security misconfigurations**: セキュリティに関するルールや最新のステータスなど。
- **Real-time threat signals**: Cloud Security Management Threats がアセット上で検出したもの。
- アセットの完全な構成を示す JSON での **Resource definition**。
- リソースに接続されているアセットを表示する、インタラクティブなアセット関係グラフ。

**Share** ボタンをクリックし、**Share event** を選択すると、現在のリソースへのリンクをメールや Slack などを通じてチームメイトと共有することができます。この機能で利用可能なすべての [Datadog 通知インテグレーション][3]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_security_management
[2]: https://app.datadoghq.com/infrastructure/catalog
[3]: /ja/integrations/#cat-notification
[4]: /ja/account_management/teams