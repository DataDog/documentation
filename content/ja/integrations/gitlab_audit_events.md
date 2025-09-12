---
app_id: gitlab-audit-events
app_uuid: 4a1f22c0-6085-491b-a903-b202fd9f3f88
assets:
  dashboards:
    GitLab Audit Events: assets/dashboards/gitlab_audit_events_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 11648998
    source_type_name: GitLab Audit Events
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- security
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: gitlab_audit_events
integration_id: gitlab-audit-events
integration_title: GitLab 監査イベント
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: gitlab_audit_events
public_title: GitLab 監査イベント
short_description: リスク、セキュリティ、コンプライアンスを評価するために GitLab Audit Events を収集します
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: リスク、セキュリティ、コンプライアンスを評価するために GitLab 監査イベントを収集します
  media:
  - caption: GitLab Audit Events ダッシュボード
    image_url: images/overview-dashboard.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: documentation
    url: https://docs.datadoghq.com/integrations/gitlab_audit_events
  support: README.md#Support
  title: GitLab 監査イベント
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

GitLab は、企業によるソフトウェアの作成、セキュリティ保護、デプロイを支援するソースコード管理および DevOps プラットフォームです。[GitLab Audit Events][1] と連携して、セキュリティ対策を強化し、インシデントに対応し、コンプライアンス基準を遵守できます。Datadog は GitLab Audit Events をログとして自動で解析するため、ユーザー ID、IP アドレス、イベント名でフィルタリングできます。これにより、不審なログイン試行や通常と異なるアクティビティなどの異常を特定しやすくなります。このインテグレーションには、アクティビティ監視のためのすぐに使える Dashboard も含まれており、ニーズに合わせてカスタマイズできます。

日々のユーザーアクションからコンプライアンスレポートまで、すべての GitLab Audit Events を追跡することで、セキュリティとコンプライアンスを強化しましょう。例:
 - ユーザー別・プロジェクト別の Merge request アクティビティを追跡します (bot アクションや、プロジェクトの merge ポリシーの変更を含む)。
 - GPG keys、Personal Access Tokens、Deploy Tokens の作成から削除までのレポートを作成します。

[`source:gitlab-audit-events`][2] を検索すると、Datadog の [Logs Management][3] で GitLab Audit Events を表示でき、Datadog の分析ツールを活用してセキュリティ、パフォーマンス、運用のインサイトを向上できます。

## セットアップ

GitLab Audit Events を Datadog と統合するために、Datadog は OAuth を使用して GitLab に接続します。このインテグレーションを設定するには、認証ユーザーに管理者権限が必要です。このインテグレーションを認証するユーザーの要件は次のとおりです。

- GitLab の Premium または Ultimate プラン
- アカウントオーナーであること、またはすべてのグループ、プロジェクト、ユーザーの監査イベントにアクセスするための管理者権限を有すること

### インストール

1. [Integrations ページ][4]に移動して、「GitLab Audit Events」インテグレーションを検索します。 
2. タイルをクリックします。
3. インテグレーションをインストールするためにアカウントを追加するには、**Add GitLab Account** ボタンをクリックします。 
4. モーダルに表示された手順を確認したら、**Authorize** ボタンをクリックします。GitLab のログインページにリダイレクトされます。
5. GitLab の管理者アカウントを使用して GitLab にログインします。
6. `api` スコープへのアクセスを求める画面で **Authorize** をクリックします。これにより、Datadog が監査イベントを参照できるようになります。
7. 新しいアカウントが追加された状態で、Datadog の GitLab Audit Events タイルにリダイレクトされます。「Account Name」を覚えやすい名称に変更することをおすすめします。

## 収集データ

### ログ

GitLab Audit Events は、GitLab のすべての[監査イベントの種類][5]をログとして収集します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。


[1]: https://docs.gitlab.com/ee/administration/audit_event_reports.html
[2]: https://app.datadoghq.com/logs?query=source%3Agitlab-audit-events
[3]: https://docs.datadoghq.com/ja/logs/
[4]: https://app.datadoghq.com/integrations?search=GitLab%20Audit%20Events
[5]: https://docs.gitlab.com/ee/user/compliance/audit_event_types.html
[6]: https://docs.datadoghq.com/ja/help