---
title: Using Filters to Create Better Diagrams
---

大規模な環境図において一度にレンダリングされるコンポーネントの多さは、パフォーマンスと可読性の問題を生じさせ、ユーザー体験を低下させます。

このような問題を回避するため、Cloudcraft では **Filtered layout** 機能を使用してフィルターを適用したり、ライブコンポーネントを配置する際にサービスを除外したりすることを推奨しています。

より小さな図を作成することで、図の管理がより簡単になります。また、これにより閲覧者は情報の取り込み方をよりコントロールしやすくなります。

<div class="alert alert-info">If you are using Cloudcraft's New Live Experience, see this documentation: <a href="https://docs.datadoghq.com/cloudcraft/getting-started/crafting-better-diagrams/" title="Crafting Better Diagrams: Cloudcraft's Live Diagramming and Filtering">Crafting Better Diagrams: Cloudcraft's Live Diagramming and Filtering</a>.</div>

## 検索パターン

{{< img src="cloudcraft/getting-started/use-filters-to-create-better-diagrams/search-patterns.png" alt="Cloudcraft で使用されている検索パターン。" responsive="true" style="width:100%;">}}

**Live** タブの検索ボックスでは、スキャン結果に影響するパターンを入力できます。

アプリケーションがサポートするパターンには次のようなものがあります。

- 一致するコンポーネントの名前または ID。例: `i-052g93wu49qed3hxw`
- 一致するコンポーネントのタイプ。例: `type=ec2`
- 一致するコンポーネントの IP アドレス。例: `172.31.42.142`
- 一致するタグ付きコンポーネント。例: `environment=prod` または `environment`
- VPC、セキュリティグループ、またはサブネット内の一致するコンポーネント。例: `vpc-088c40abeb9ce0c1d`

演算子を使うこともできます。

- AND (`type=ec2 AND env=prod`)
- OR (`type=ec2 OR type=rds`)
- NOT (`NOT platform=linux`)
- (...) (`type=rds AND (env=staging OR env=prod)`)

この 2 つの機能を組み合わせることで、強力なフィルターを構築し、図を 1 つまたは複数のアプリケーションにスコープすることができます。

## サービスの除外

{{< img src="cloudcraft/getting-started/use-filters-to-create-better-diagrams/excluding-services.png" alt="Cloudcraft 図から除外されている AWS サービス" responsive="true" style="width:100%;">}}

数個のサービスを除外したいだけであれば、検索パターンの使用は過剰かもしれません。そのため、Cloudcraftではこの作業をもっと簡単に行える方法を提供しています。

AWS アカウントをスキャンした後、**Live** タブの **Auto Layout** をクリックすると、AWS 環境のサービスが 2 列のリストで表示されます。

サービスをクリックすることで、**Included services** 列から **Excluded services** 列へ、またはその逆へ移動させることができます。

## 検索パターンの使用とフィルターの適用

これらのコンセプトのいくつかを実践してみましょう。

アーキテクチャ図を作成しているときに、`service=wirecraft` のタグが付いた EC2 インスタンスと EBS ボリュームだけを表示したいとします。また、"Stopped" 状態の EC2 インスタンスは無視したいとします。

すでに AWS 環境をスキャンし、Cloudcraft はインベントリにアカウントのコンポーネントのリストを表示しています。次は何をしますか？

1. **Live** タブで、検索ボックスにクエリに対応する検索パターンを入力します。この例では、パターンは `service=wirecraft AND (type=ec2 running OR type=ebs)` です。ボタン **Auto Layout** が **Filtered Layout** と表示されていることに注意してください。
2.  **Filtered Layout** をクリックします。
3. **Layout** をクリックします。図内のコンポーネントが、手順 1 のパターンに一致するようになりました。

その他の選択肢は以下の通りです。

- 別の AWS リージョンで同じクエリを実行します。**Layout** をクリックする前に、**Options** ドロップダウンから **Include existing components** を選択します。そうすることで、現在インベントリにあるセカンダリリージョンのすべてのコンポーネントと、すでに図上にあるすべてのコンポーネントに対して、フィルタリングされたレイアウトが実行されます。
- **Filtered layout** と **Blueprint link** 機能を組み合わせることで、大規模な環境を複数の図に分割し、相互にリンクさせることができます。また、クラウドアーキテクチャ全体を一目で見渡せる概要図を、パフォーマンス上のペナルティなしに作成することもできます。

{{< img src="cloudcraft/getting-started/use-filters-to-create-better-diagrams/filtered-layout-search-patterns-wb5btuyldh4q.mp4" alt="Cloudcraft ユーザーがフィルタリングされた図を作成する 53 秒のビデオ。" video="true">}}

[1]: https://www.cloudcraft.co/request-demo
[2]: https://app.cloudcraft.co/support