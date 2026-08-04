---
app_id: github-copilot
app_uuid: b976afbb-2433-4bd9-b33d-5b9856114285
assets:
  dashboards:
    Copilot Overview: assets/dashboards/github_copilot_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - github_copilot.organizations.billing.seats.total
      metadata_path: metadata.csv
      prefix: github_copilot
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 31503641
    source_type_name: GitHub Copilot
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ai/ml
- コラボレーション
- 開発ツール
- モニター
- ソースコントロール
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: github_copilot
integration_id: github-copilot
integration_title: GitHub Copilot
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: github_copilot
public_title: GitHub Copilot
short_description: ライセンスの配布状況を追跡し、採用傾向を監視し、Copilot の各種機能に対する開発者のエンゲージメントを分析します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Category::Collaboration
  - Category::Developer Tools
  - Category::Metrics
  - カテゴリ::ソースコントロール
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: ライセンスの配布状況を追跡し、採用傾向を監視し、Copilot の各種機能に対する開発者のエンゲージメントを分析します。
  media:
  - caption: GitHub Copilot 概要ダッシュボード
    image_url: images/overview-dashboard.png
    media_type: image
  - caption: GitHub Copilot Code Completion
    image_url: images/copilot_dashb_code-completion.png
    media_type: image
  - caption: GitHub Copilot Languages Breakdown
    image_url: images/copilot_dsh_languages-breakdown.png
    media_type: image
  - caption: GitHub Copilot IDE Chat
    image_url: images/copilot_dash_ide-chat.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: documentation
    url: https://docs.datadoghq.com/integrations/github_copilot
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-github-copilot-with-datadog/
  support: README.md#Support
  title: GitHub Copilot
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Datadog の [GitHub Copilot][1] インテグレーションを利用すると、組織全体の Copilot の使用状況が詳細に可視化され、採用状況の測定、チーム パフォーマンスの最適化、AI によるコード提案が開発ワークフローに与える影響の把握が可能になります。
このインテグレーションにより、次のことができます。
- **Copilot の採用状況の分析** - 開発者が Copilot のコード提案を受け入れる頻度を測定し、開発プロセスのどの段階で Copilot の機能が活用されているかを把握できます。
- **ライセンス配布状況の追跡** - 組織内で割り当てられた Copilot ライセンスのステータスを監視し、ライセンスの利用を最適化できます。
- **ユーザー エンゲージメントの把握** - 開発者が Copilot とどのようにやり取りしているかを理解し、以下の区別を行うことができます。
  - **アクティブ ユーザー**: 受動的にコード提案を受け取る、Copilot チャットで対話するなど、Copilot に関連する何らかのアクティビティがある開発者。
  - **エンゲージド ユーザー**: 提案を受け入れる、プル リクエストのサマリーを生成するなど、Copilot の機能を積極的に利用している開発者。エンゲージド ユーザーは全員アクティブ ユーザーでもあります。

### 収集されるメトリクス
Datadog は、Copilot の採用状況・使用状況を詳細に可視化し、チーム、プログラミング言語、IDE、リポジトリごとに粒度の高いインサイトを提供します。具体的には、次のような情報が含まれます。
- **Copilot の使用状況に関するメトリクス** - IDE でのコード補完、チャット アクティビティ (IDE と GitHub.com の両方)、プル リクエストのサマリーなど、Copilot との主なやり取りを追跡できます。これらのメトリクスは日単位で利用できますが、社内で有効な Copilot ライセンスが 5 つ以上必要です。
  - **IDE Code Completion & Chat** - IDE 内での使用状況を収集します (テレメトリーが有効になっている場合)。
  - **GitHub.com Chat** - GitHub.com の Copilot チャットとのインタラクションを測定します。
  - **Pull Request Usage** - 自動サマリーなど、Copilot が支援するプル リクエスト アクティビティを追跡します。
- **請求に関するメトリクス** - 現在の請求サイクルにおける Copilot のシート割り当て状況をリアルタイムで確認できます。Datadog はこのデータを継続的に更新し、正確かつ最新のライセンス利用状況を表示します。
Datadog の GitHub Copilot インテグレーションを利用することで、AI 支援開発の効率化を図るとともに、全チームを対象にその採用状況や効果を完全に可視化することができます。


## セットアップ

GitHub Copilot を Datadog に統合するにあたり、Datadog は OAuth を使用して GitHub に接続します。認証済みユーザーは、統合対象の組織でオーナー権限を持っている必要があります。

### インストール

1. [Integrations ページ][2]に移動して、「GitHub Copilot」インテグレーションを検索します。 
2. タイルをクリックします。
3. インテグレーションをインストールするためにアカウントを追加するには、**Add GitHub Account** ボタンをクリックします。 
4. モーダルに表示された手順を確認したら、**Authorize** ボタンをクリックします。GitHub のログイン ページにリダイレクトされます。
5. ログイン後、ユーザー アカウントがアクセス権を持つ組織に応じて、アクセス権を付与する GitHub 組織を選択するよう求められます。
6. 組織にアクセス制限がかかっている場合:
   - 組織名の横にある **Request** をクリックします。
   - 組織の管理者: **Organization settings > Third-party Access > OAuth app policy** で承認します。
   ![GH のアクセス承認][3]
7. **Authorize datadog-integrations** をクリックします。
8. 新しいアカウントが追加された状態で、Datadog の GitHub Copilot タイルにリダイレクトされます。アカウント名を覚えやすい名称に変更することをおすすめします。異なる組織へのアクセス権を持つ複数のアカウントを追加できます。

**注**: GitHub はこの選択された承認内容を保存します。再度プロンプトを表示させたり、新しい組織を追加したりする場合は、GitHub (`Integrations > Applications > Authorized OAuth Apps > Datadog - GitHub Copilot OAuth App`) でアプリのアクセス権を取り消し、セットアップ プロセスをやり直してください。
![GH のアクセス取り消し][4]

## 検証

インストール後、`github_copilot` という接頭辞の付いたメトリクスが利用可能になります。

## 収集データ

### メトリクス
{{< get-metrics-from-git "github_copilot" >}}


### サービスチェック

GitHub Copilot には、サービス チェックは含まれません。

### イベント

GitHub Copilot には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した GitHub Copilot の監視][7]

[1]: https://github.com/features/copilot
[2]: https://app.datadoghq.com/integrations/github-copilot
[3]: images/gh_approved_access.png
[4]: images/revoke_access_gh.png
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/github_copilot/metadata.csv
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://www.datadoghq.com/blog/monitor-github-copilot-with-datadog/