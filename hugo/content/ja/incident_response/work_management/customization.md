---
aliases:
- /ja/service_management/case_management/customization/
- /ja/incident_response/case_management/customization/
description: カスタムワークタイプ、属性、ステータスを使用して、Datadog Work Management をカスタマイズする
further_reading:
- link: https://www.datadoghq.com/blog/datadog-risk-management
  tag: ブログ
  text: Datadog Case Management でリスクを一元管理して修正する方法
- link: /incident_response/work_management/
  tag: ドキュメント
  text: Work Management の概要
- link: /incident_response/work_management/create_work_item
  tag: ドキュメント
  text: ワークアイテムを作成する
- link: /incident_response/work_management/settings
  tag: ドキュメント
  text: 設定
title: カスタマイズ
---
## 概要 {#overview}

Datadog Work Management では、チーム固有のワークフロー、データキャプチャのニーズ、レポート要件に合わせてカスタマイズできます。

## カスタムワークタイプ {#custom-work-types}

<div class="alert alert-danger">
  ケース共有設定書き込み (<code>cases_shared_settings_write</code>) 権限が必要です。詳しくは、
  <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#case_management">Datadog ロールのアクセス許可</a>を参照してください。
</div>

Datadog は、一般的なワークフロー向けに設計された 5 つの[組み込みワークタイプ][1]を提供しています。チームのニーズに合わせて Work Management をカスタマイズするために、独自のカスタムワークタイプを定義できます。これにより、次のことが可能になります。

* 関連するワークタイプにカスタムデータキャプチャをスコープする
* ターゲットを絞った自動化を有効にする
* より詳細な分析とレポートを実行する

### カスタムワークタイプを作成する {#create-a-custom-work-type}

1. [**設定 > 共有設定 > ワークタイプ**][2]に移動します。
2. **+ ワークタイプを作成する**をクリックします。
3. **名前**を入力し、オプションで**説明**を入力します。
4. 新しいワークタイプを保存します。
5. (オプション) カスタム属性を追加するには、このページの[カスタム属性セクション](#custom-attributes)を参照します。

### カスタムワークタイプを有効にする {#enable-a-custom-work-type}

カスタムワークタイプを作成した後は、それを使用可能にする各プロジェクトに明示的に割り当てる必要があります。特定の Work Management プロジェクト内で新しいワークタイプを有効にするには、以下の手順に従ってください。

1. [**設定**ページ][2]に戻り、**スター付きプロジェクト**または**その他のプロジェクト**の下で対象プロジェクトを見つけます。
2. プロジェクト名をクリックしてプロジェクトメニューを展開します。
3. **一般**をクリックして、プロジェクトの設定パネルを開きます。
4. 設定パネルの**ワークタイプ**セクションまでスクロールダウンします。
5. **組織から**の下でドロップダウンを開き、作成したカスタムワークタイプを選択します。

ワークタイプを追加すると、そのプロジェクト内で新しいワークタイプを作成する際にオプションとして利用できるようになります。

新しいワークタイプは以下で利用可能です。

* 手動でのワークアイテム作成
* API ベースの作成
* ワークフローによる自動化されたワークアイテムの作成

## カスタム属性 {#custom-attributes}

カスタム属性を使用すると、チームが効率的に作業し、効果的にレポートするために必要な構造化データを取得できます。Datadog が提供するものかカスタムかに関わらず、すべての作業タイプには、削除や変更ができない 5 つの予約済み属性が含まれています。

* Teams
* サービス
* 環境
* データセンター
* バージョン

エスカレーションレベル、コンポーネントの所有者、ビジネスへの影響、外部へのリンクなど、チームの特定のニーズを反映した属性を追加できます。カスタム属性を追加するには、以下の手順を実行します。

1. [**設定 > 共有設定 > ワークタイプ**][2]に移動します。
2. 目的のワークタイプをクリックします。
3. **+ 属性を追加**をクリックします。
4. 以下を入力します。
   * 表示名 (「地域」など)
   * キー (プログラムによるアクセスやレポート作成に使用)
   * 説明 (チーム向けのオプションのコンテキスト)
   * データタイプ (次から選択):
     * テキスト
     * URL
     * 数値
   * この属性に対して複数の値を許可するかどうかを選択します。

## カスタムステータス {#custom-statuses}

Work Management は、カスタマイズ可能なワークアイテムステータスをサポートしています。デフォルトでは、ワークアイテムは Open、In Progress、Closed の順に移動します。レビュー、引き継ぎ、その他のワークフローのステップを表すためにステータスを追加できます。カスタムステータスを使用すると、ワークアイテムのワークフローを標準化し、チームのプロセスに合わせてステータスのオプションを調整することで、レポート作成や自動化をサポートできます。

### カスタムステータスの動作を理解する {#understanding-custom-statuses-behavior}
* 各ステータスグループ (Open、In Progress、Closed) には、少なくとも 1 つのステータスが含まれている必要があります。
* 既存のステータスを削除することはできますが、まずそのステータスを現在使用しているワークアイテムを同じグループ内の別のステータスに移行する必要があります。
* カスタムステータスは、Datadog の組み込みステータスとまったく同じように動作します。

### カスタムステータスを作成する {#create-a-custom-status}

1. [**設定 > 共有設定 > ワークタイプ**][2]に移動します。
2. 更新するワークタイプを選択します。
3. **ステータス**セクションまでスクロールします。
4. 3 つの既存のステータスグループ (**Open、In Progress**、**Closed**) のいずれかの下に新しいステータスを追加します。
5. (オプション) 各ステータスグループに新しい**デフォルトステータス**を設定します。デフォルトステータスは、正確なステータス名が指定されていない場合にそのグループの優先ステータスとして自動で使用されます。


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/incident_response/work_management/create_work_item#work-types
[2]: https://app.datadoghq.com/work/settings?type=shared