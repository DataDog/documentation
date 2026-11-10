---
aliases:
- /ja/internal_developer_portal/software_catalog/entity_model/custom_entities
description: カタログでカスタムエンティティタイプを定義し、ライブラリ、パイプライン、ML モデルなど、組織固有のコンポーネントを表現します。
disable_toc: false
further_reading:
- link: /internal_developer_portal/catalog/set_up/create_entities
  tag: ドキュメント
  text: カタログでエンティティを作成する
- link: /internal_developer_portal/catalog/entity_model/native_entities/
  tag: ドキュメント
  text: ネイティブエンティティタイプについて学ぶ
title: カスタムエンティティ
---
## 概要{#overview}

[スキーマ定義 v3.0][5] 以降では、[ネイティブタイプ][6] (サービス、データストア、キューなど) に加え、カスタムエンティティタイプを定義できます。

カスタムエンティティを使用すると、組織にとって重要だが標準カテゴリには当てはまらないコンポーネントやリソースを表現できます。たとえば、ライブラリ、パイプライン、ML モデル、インフラストラクチャーコンポーネントのカスタムエンティティタイプを作成できます。

[完全なスキーマ定義][7]については、GitHub を参照してください。

## カスタムエンティティタイプを作成する {#create-a-custom-entity-type}

カスタムエンティティタイプは、Datadog 内で、またはカタログ API を使用して作成できます。タイプを作成したら、Datadog 内、または[カタログ API][2]、[GitHub インテグレーション][4]、[GitLab インテグレーション][9]、[Terraform モジュール][3]を使用してプログラムで、そのタイプのエンティティを追加できます。

### Datadog {#in-datadog}

1. [**APM**] > [**Catalog**] (カタログ) に移動し、[**Manage**][8] (管理) をクリックします。
1. [**Manage Custom Entity Types**] (カスタムエンティティタイプの管理) をクリックします。

   {{< img src="/tracing/internal_developer_portal/manage-entity-types.png" alt="既存のネイティブタイプとカスタムタイプ、およびカスタムエンティティタイプを作成するためのボタンが示されている、[Manage Entity Types] (エンティティタイプの管理) ポップアップウィンドウ" style="width:100%;" >}}

1. [**Add Custom Entity Type**] (カスタムエンティティタイプの追加) をクリックしてタイプを追加します。

ウィンドウを閉じて [**Create New Entry**] (新規エントリの作成) を選択すると、ポップアップウィンドウ上部の [`kind`] (種類) ドロップダウンにカスタムタイプが表示されます。

{{< img src="/tracing/internal_developer_portal/custom-type-in-dropdown.png" alt="カスタムエンティティタイプが含まれる [kind] ドロップダウンが表示されている、[Create New Entry] ポップアップウィンドウ" style="width:60%;" >}}

### API を使用する {#through-the-api}

または、[カタログ API][1] を使用してカスタムタイプを定義します。

### エンティティの例 {#example-entity}

以下の例では、リンク、タグ、所有チームを持つカスタムエンティティタイプ `library` のエンティティを定義しています。

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: library
metadata:
  name: my-library
  displayName: My Library
  tags:
    - tag:value
  links:
    - name: shopping-cart runbook
      type: runbook
      url: https://runbook/shopping-cart
    - name: shopping-cart architecture
      provider: gdoc
      url: https://google.drive/shopping-cart-architecture
      type: doc
    - name: shopping-cart Wiki
      provider: wiki
      url: https://wiki/shopping-cart
      type: doc
    - name: shopping-cart source code
      provider: github
      url: http://github/shopping-cart
      type: repo
  contacts:
    - name: Support Email
      type: email
      contact: team@shopping.com
    - name: Support Slack
      type: slack
      contact: https://www.slack.com/archives/shopping-cart
  owner: myteam
  additionalOwners:
    - name: opsTeam
      type: operator
{{< /code-block >}}

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/software-catalog/#create-or-update-kinds
[2]: /ja/api/latest/software-catalog/#create-or-update-entities
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog
[4]: /ja/integrations/github/
[5]: /ja/internal_developer_portal/catalog/entity_model
[6]: /ja/internal_developer_portal/catalog/entity_model/native_entities
[7]: https://github.com/DataDog/schema/tree/main/service-catalog/v3
[8]: https://app.datadoghq.com/software/settings/get-started
[9]: /ja/integrations/gitlab-source-code/