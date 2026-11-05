---
aliases:
- /ja/software_catalog/developer_homepage
- /ja/internal_developer_portal/developer_homepage
description: Internal Developer Portal Homepage では、チームのエンティティ、GitHub プルリクエスト、GitLab
  マージリクエスト、Jira および Linear チケット、Datadog Work Items を一元的に表示します。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-idp-homepage/
  tag: ブログ
  text: IDP Homepage で 1 日を始めましょう
- link: /integrations/github/
  tag: ドキュメント
  text: GitHub インテグレーションについて
- link: /integrations/gitlab-source-code/
  tag: ドキュメント
  text: GitLab Source Code インテグレーションについて
- link: /integrations/jira/#configure-a-jira-webhook
  tag: ドキュメント
  text: Jira インテグレーションについて
- link: /integrations/linear/#configure-a-linear-webhook
  tag: ドキュメント
  text: Linear インテグレーションについて
site_support_id: idp
title: ホームページ
---
{{< img src="tracing/software_catalog/idp_homepage_2.png" alt="レビュー待ちのプルリクエストと割り当てられたチケットが表示されている IDP Homepage。" style="width:100%;" >}}

## 概要 {#overview}

[IDP Homepage][5] では、チームのエンティティと毎日のタスクを一元的に表示します。 

このビューで、以下のことができます。
- スコアカード、最近のデプロイ、モニター、問題、インシデント、ダッシュボード、オンコールステータスなど、チームのエンティティに関する主要な情報を表示します。
- GitHub、GitLab、Jira、Linear で自分に割り当てられたタスクを追跡します。
- アラートが発生しているモニターや失敗したデプロイを特定します。

## 前提条件 {#prerequisites}

ホームページは、Datadog インテグレーションからデータを集計します。ホームページを使用する前に、以下を設定してください。

- **GitHub**: **Your PRs** の **GitHub** タブに必要です。管理者が [GitHub インテグレーション][1] と Webhook を設定し、各ユーザーが自分の GitHub アカウントでサインインします。
- **GitLab Source Code**: **Your PRs** の **GitLab** タブに必要です。管理者が [GitLab Source Code インテグレーション][2] と Webhook を設定し、各ユーザーが自分の GitLab アカウントでサインインします。
- **Jira**: **Your Tickets** の **Jira** タブに必要です。管理者が [Jira Webhook を設定します][3]。
- **Linear**: **Your Tickets** の **Linear** タブに必要です。管理者が [Linear Webhook を設定します][4]。

## ホームページを構成する {#configure-the-homepage}

ページをパーソナライズするには、[IDP Homepage][5] の上部にある**構成**をクリックします。**ホームページ設定**パネルが開き、**セクションレイアウト**と **Integrations** の 2 つのタブが表示されます。変更を行った後、**保存**をクリックして適用するか、**キャンセル**をクリックして破棄します。

### セクションレイアウト {#section-layout}

**セクションレイアウト**タブでは、ホームページに表示するセクションとその表示順序を管理できます。利用可能なセクション: **Your PRs**、**Your Tickets**、**Services & Entities**、**Apps**。

- セクションの順序を変更するには、ハンドルをドラッグして新しい位置に移動します。
- セクションを表示または非表示にするには、その横にある表示アイコンをクリックします。
- デフォルトのセクションと順序に戻すには、**レイアウトをリセット**をクリックします。

### Integrations {#integrations}

**Integrations** タブでは、どのインテグレーションを有効にするか、またそれぞれがホームページに何を表示するかを管理できます。Integrations は、**PR** や **Work Items** など、それらが反映されるセクションごとにグループ化されています。

各インテグレーションには、有効または無効にするためのトグルがあります。インテグレーションを無効にすると、そのデータはホームページに表示されなくなります。インテグレーションによっては、以下も可能です。

- 表示する接続済みアカウント、インスタンス、または組織を選択します。たとえば、GitLab インテグレーションには**インスタンス**セレクターが含まれています。
- インテグレーションの構成を開いて、コネクションを管理します。たとえば、GitHub インテグレーションには**構成**オプションが含まれています。

## Your PRs {#your-prs}

**Your PRs** セクションでは、ソース管理からの個人のアクションアイテムが集約されるため、ホームページを離れることなく、自分に割り当てられたプルリクエストやマージリクエストを追跡できます。**GitHub** タブと **GitLab** タブを切り替えて、各ソースを表示します。

{{< img src="tracing/software_catalog/your_prs_table.png" alt="ステータスごとにグループ化された GitHub プルリクエストが表示されている Your PRs セクション。" style="width:100%;" >}}

### GitHub {#github}

**GitHub** タブでは、レビュー状態ごとにグループ化された、対応が必要なプルリクエストが表示されるため、ホームページを離れることなく対処できます。

GitHub アカウントでサインインすると、ステータスごとにグループ化されたプルリクエストがタブに読み込まれます。組織が GitHub インテグレーションを構成していない場合、このタブには空の状態が表示され、[GitHub インテグレーションタイル][1] から有効にするよう促すメッセージが表示されます。GitHub からプルリクエストを読み取るには、このインテグレーションに以下の権限が必要です。

- メンバー: 読み取り
- メタデータ: 読み取り
- プルリクエスト: 読み取り
- コンテンツ: 読み取り
- ステータス: 読み取り
- チェック: 読み取り

Datadog で複数の GitHub 組織が接続されている場合、それらを切り替えるには Integrations の読み取り権限が必要です。

### GitLab {#gitlab}

**GitLab** タブには、レビュー状態ごとにグループ化された、対応が必要なマージリクエストが表示されます。それぞれについて、レビューと承認のステータス、パイプラインのステータスとマージのブロック要因、解決済みおよび未解決のディスカッション数が表示されます。

GitLab アカウントでサインインすると、ステータスごとにグループ化されたマージリクエストがタブに読み込まれます。組織が GitLab ソースコードインテグレーションを構成していない場合、このタブには空の状態が表示され、[GitLab ソースコードインテグレーションタイル][2] から有効にするよう促すメッセージが表示されます。

Datadog 内に複数の GitLab インスタンスが接続されている場合は、**インスタンス**セレクターを使用して、表示するインスタンスを選択します。

## チケット {#your-tickets}

**Your Tickets** セクションでは、Jira、Linear、Datadog Work Management 全体で自分に割り当てられた項目が集約されるため、ホームページを離れることなく未完了の作業を追跡できます。**Jira**、**Linear**、**Work Items** タブを切り替えて各ソースを表示し、**Display** を使用して項目の表示方法を変更します。

{{< img src="tracing/software_catalog/your_tickets_table.png" alt="ステータス別にグループ化された Jira チケットが表示されている Your Tickets セクション。" style="width:100%;" >}}

### Jira {#jira}

**Jira** タブには、自分に割り当てられた Jira チケットがステータス別にグループ化されて表示されます。設定後、割り当てられたチケットが自動的に表示されます。

### Linear {#linear}

**Linear** タブには、自分に割り当てられた Linear の問題がステータス別にグループ化されて表示されます。設定後、割り当てられた問題が自動的に表示されます。

### Work Items {#work-items}

**Work Items** タブには、自分に割り当てられた Datadog Work Management の作業項目がステータス別にグループ化されて表示されます。作業項目は、自分に割り当てられると自動的に表示されます。詳細については、[Work Management][6] を参照してください。

## サービスおよびエンティティ {#services-and-entities}

{{< img src="tracing/software_catalog/services_entities_table_2.png" alt="チームのサービスがスコアカード、モニター、オンコール情報とともに表示されている、サービスおよびエンティティセクション。" style="width:100%;" >}}

**サービスおよびエンティティ**セクションには、リンクされた Datadog 製品および統合から自動的に集約された、チームの主要なサービスとエンティティが表示されます。各エントリーは、スコアカードの健全性、最近のデプロイ、モニターやインシデントのステータス、リンクされたダッシュボード、現在のオンコールなど、エンティティの運用コンテキストを要約します。最近表示したエンティティ、チームが所有するエンティティ、またはお気に入りに追加したエンティティでフィルタリングできます。

## カスタムアプリでホームページを拡張する {#extend-the-homepage-with-custom-apps}

組み込みセクションに加えて、**Apps** セクションではホームページにカスタムアプリを追加できるため、Datadog、社内ツール、サードパーティのサービスのいずれから取得したデータやアクションであっても、最も役立つものを集約できます。Datadog は、これらのアプリを構築するための 2 つの方法を提供しています。

- **App Builder**: 社内ツール向けのローコードのドラッグアンドドロップビルダー。アプリは、構築済みの UI コンポーネント、Datadog データソース (メトリクス、ログ、モニターなど)、および GitHub や AWS などのサービス向けのすぐに使えるアクションを組み合わせたものです。詳細については、[App Builder][7] を参照してください。
- **Datadog Apps**: CLI と標準の開発ワークフローを使用して、React および TypeScript (または JavaScript) でローカルに構築するアプリ向けのコードベースのパス。ソース管理と CI/CD によるチームコラボレーション、AI アシストによるローカル開発、Action Catalog 以外のサービスとの統合、またはアプリの UI とロジックに対する完全な制御が必要な場合は、Datadog Apps を選択してください。詳細については、[Datadog Apps][8] を参照してください。

カスタムアプリをここで利用できるようにするには、まずアプリを公開し、チームが閲覧および使用できるように権限を定義します。

ホームページにアプリを追加するには、以下の手順を実行します。

1. **Apps** セクションで、**Add App** をクリックします。
2. **ブループリント**を選択して構築済みのアプリから開始するか、組織がすでに構築した**カスタムアプリ**を選択します。
3. アプリを構成し、ホームページに追加します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}  

[1]: /ja/integrations/github/  
[2]: /ja/integrations/gitlab-source-code/
[3]: /ja/integrations/jira/#configure-a-jira-webhook
[4]: /ja/integrations/linear/#configure-a-linear-webhook
[5]: https://app.datadoghq.com/idp/home
[6]: /ja/service_management/case_management
[7]: /ja/actions/app_builder/
[8]: /ja/actions/datadog_apps