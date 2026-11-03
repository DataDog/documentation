---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-security-graph/
  tag: ブログ
  text: Datadog Security Graphでクラウドセキュリティの関連性を可視化します。
- link: https://www.datadoghq.com/blog/security-graph-attack-paths
  tag: ブログ
  text: Datadog Cloud Security でリソース間の露出経路をトレースする
title: Security Graphで関連性を可視化します。
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Security Graphは、選択したサイトでは利用できません ({{< region-param key="dd_site_name" >}}) では利用できません。</div>
{{< /site-region >}}

クラウドセキュリティにおける最も永続的な課題の1つは、コンピューティング、ストレージ、ID、およびネットワークの各コンポーネントがどのように相互作用しているかを理解することです。Security Graphを使用すると、クラウド環境をリレーションシップグラフとしてモデル化できます。AgentlessおよびAgentベースのクラウドスキャンからのデータを組み合わせて、EC2インスタンス、IAMロール、S3バケット、セキュリティグループなどのクラウドリソース間の接続を可視化し、クエリを実行できます。これらの関連性を調査することで、間接的なアクセスパスを明らかにし、IDリスクを評価し、新たな脅威に対してより効果的に対応できます。

**注**: Security GraphはAWSリソースのみをサポートしています。

{{< img src="security/csm/security_graph.png" alt="EC2 インスタンスの例を表示する Security Graph" width="100%">}}

## クエリを選択または作成してください{#select-or-create-a-query}

Security Graphで表示するリソースと関連性の種類を指定するには、2つの方法があります。
<!-- - Write a query in natural language (for example, "Non-admin IAM roles that can assume admin IAM roles") -->
- ホームページから作成済みのクエリを選択してください。
- リソースタイプとその間の関連性を指定して、クエリを自分で作成してください。

<!-- If you use a natural language or pre-made query, the technical details automatically populate in the query. You can modify the query to fine-tune your results. -->

作成済みのクエリを使用すると、技術的な詳細がクエリに自動的に入力されます。クエリを変更して、結果を微調整できます。

### クエリの作成と変更{#create-and-modify-queries}

自動生成されたクエリを使用する場合でも、自分で作成する場合でも、クエリビルダーを使用して結果を絞り込むことができます。

1. **独自のクエリを作成**の下にある**検索対象**の横で、リストからリソースタイプを選択してください。
1. (オプション) 選択したリソースタイプに関する詳細を追加するには、**+**をクリックしてから、**場所**をクリックします。表示されたフィールドで、タグを選択し、そのタグの値を入力してフィルタリングします。
1. (オプション) 追加のリソースタイプでフィルタリングするには、**+**をクリックしてから、**それ**をクリックします。表示されたフィールドで、追加するリソースタイプと上のリソースタイプとの関係を選択します。別の **Where** フィールドが表示された場合は、このリソースタイプの追加のタグ値を指定します。
1. 必要に応じて、リソースタイプとタグ値を追加します。**削除**アイコンをクリックして条件を削除するか、**クエリをクリア**をクリックしてやり直すこともできます。

クエリを変更すると、Security Graphが自動的に更新され、関連するリソースが表示されます。**表示する**の横にある **グラフ** をクリックしてリソースを関係グラフで表示するか、**テーブル** をクリックしてテーブル形式で表示することができます。

## リソースの詳細を確認してください{#learn-more-about-a-resource}

- リソースをグラフで表示しているときにリソースをクリックすると、詳細情報を確認できます。
  - ID、アカウント、チームなど、リソースに関する主要な情報をコピーしてください。
  - 現在のクエリ内のリソースを特定のタグ値でフィルタリングしてください。
  - リソースの詳細を表示してください。
  - リソースに関連付けられたセキュリティ調査結果を表示してください。
- リソースを表形式で表示しているときにリソースをクリックすると、サイドパネルで追加情報を確認できます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}