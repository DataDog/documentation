---
description: Scorecard ルールを共通の目標でグループ化し、エンティティとチーム全体での適応状況を追跡することで、期限付きのエンジニアリングイニシアチブを調整します。
further_reading:
- link: /internal_developer_portal/scorecards/
  tag: ドキュメント
  text: Scorecards ドキュメント
- link: https://www.datadoghq.com/blog/idp-campaigns/
  tag: ブログ
  text: IDP キャンペーンで大規模なエンジニアリングイニシアチブを調整
site_support_id: idp
title: キャンペーン
---
{{< img src="/tracing/software_catalog/campaign-manage.png" alt="Internal Developer Portal でのキャンペーン一覧表示" style="width:90%;" >}}

## 概要 {#overview}

キャンペーンでは、[Scorecard][1] ルールを共通の目標でグループ化し、エンティティやチーム全体での適応状況を追跡することで、短期的なエンジニアリングイニシアチブを調整できます。

Scorecards は長期的なベストプラクティスを定義しますが、キャンペーンはランタイムの移行、セキュリティ修正、コスト最適化などの期限付きイニシアチブに集中して取り組むうえで役立ちます。期限を設定し、追跡するルールを選択し、チーム全体の完了状況を監視できます。

Scorecards ページの [[**Campaigns**] (キャンペーン) タブ][2] を称して以下の操作を行います。
- アクティブなキャンペーンと過去のキャンペーンを表示する
- ルール、チーム、またはステータス別に進捗状況を追跡する
- インターフェイスから直接チームをフォローアップする 

サービスがキャンペーンの一部である場合、関連するルールと期限がカタログ内のエンティティの [**Scorecards**] タブとエンティティページの [**Scorecards**] セクションに表示されます。この可視化により、チームは手動のリマインダーや外部ドキュメントに頼ることなく、キャンペーンの目標に基づいて行動できます。

## キャンペーンの作成 {#creating-a-campaign}

Scorecards の [[**Campaigns**] (キャンペーン) タブ][2] でキャンペーンを作成して管理します。

**注:** キャンペーンを作成するには、Service Catalog Write 権限と Work Management Write 権限が必要です。

{{< img src="/tracing/software_catalog/campaign-creation.png" alt="フィールドが入力されたキャンペーン作成ページ" style="width:90%;" >}}

### 1. キャンペーンのメタデータの定義 {#1-define-campaign-metadata}

以下の情報を追加します。
- **Name** (名前): 内容がわかる短いタイトル ("Migrate to GitHub Actions" など)
- **Key** (キー): キャンペーンの一意の識別子 (デフォルトでは自動生成されます)
- **Description** (説明): キャンペーンの目標の短い要約
- **Owner** (オーナー): キャンペーンの推進を担当するチーム
- **Start and end date** (開始日と終了日): キャンペーンのタイムライン (終了日はオプション)
- **Scope** (スコープ): キャンペーンが適用されるエンティティ (例: `kind:service AND tier:1`)

### 2. Scorecard ルールの選択 {#2-select-scorecard-rules}

キャンペーンの目標に沿った [既存の Scorecard ルール][3] を 1 つ以上追加します。

### 3. ガイダンスの定義 {#3-define-guidance}

オプションで、ルールごとに以下を含めます。
- リンクされたドキュメント
- 失敗したルールを自動的に収集するための [Workflow Automation][4] を介したワークフロー
- チームがコンプライアンス遵守のために従うべき手順

## キャンペーンの進捗状況の追跡 {#tracking-campaign-progress}

キャンペーン作成後に、キャンペーンページを使用して適応状況を監視し、必要に応じてフォローアップを行います。

{{< img src="/tracing/software_catalog/campaign-details.png" alt="キャンペーンの詳細、進捗状況、次のステップが強調表示されているキャンペーンページ" style="width:90%;" >}}

キャンペーンページでは以下の操作を実行できます。
- チームまたはルールごとの全体的な完了状況と進捗状況を確認する
- フィルタリングして、依然として失敗しているエンティティ、チーム、またはルールを確認する
- チーム間の適応率を比較する
- 経時的な進捗傾向を表示する
- このページから直接、更新情報を送信し、フォローアップチケットを作成する

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/internal_developer_portal/scorecards/
[2]: https://app.datadoghq.com/software/scorecards?activeTab=campaigns
[3]: /ja/internal_developer_portal/scorecards/custom_rules#create-custom-rules
[4]: /ja/actions/workflows/