---
app_id: atlassian-audit-records
app_uuid: 05aefffe-837f-414d-a550-b43ed99d24c2
assets:
  dashboards:
    confluence-audit-records: assets/dashboards/confluence_audit_records_overview.json
    jira-audit-records: assets/dashboards/jira_audit_records_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10390
    source_type_name: Atlassian 監査レコード
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- セキュリティ
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: atlassian_audit_records
integration_id: atlassian-audit-records
integration_title: Jira & Confluence 監査レコード
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: atlassian_audit_records
public_title: Jira & Confluence 監査レコード
short_description: Atlassian の Jira および Confluence 環境を監視、保護、最適化します
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Atlassian の Jira および Confluence 環境を監視、保護、最適化します
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Jira & Confluence 監査レコード
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要


Atlassian の [Jira][1] および [Confluence][2] の監査レコードは、ユーザー管理、プロジェクトおよびスペースの設定、システム設定、認証イベントにおける重要なアクティビティを包括的に記録します。これらの製品固有のユーザー イベントに加えて、Atlassian 組織内のすべての製品にわたるイベントを完全に可視化するために **Atlassian Organization Audit Logs** インテグレーションをインストールすることを推奨します。

このインテグレーションは、これらの監査ログを Datadog に取り込み、[Cloud SIEM][3] でリスク管理、運用傾向の把握、Atlassian 環境の保護をより効果的に行えるようにします。さらに、次のことも可能です。
- Jira と Confluence のデータ保持期間を管理する。
- カスタムウィジェットやカスタムダッシュボードを構築する。
- 特定のアクションをトリガーする検出ルールを設定する。
- Jira と Confluence のイベントを他のサービスのデータと相互参照する。

これらのログには、以下に関する情報が含まれます。
- **ユーザー管理**: ユーザーアカウントの作成、削除、変更。これには、パスワードの変更、グループメンバーシップの変更、ユーザー権限の変更が含まれます。
- **プロジェクトの構成**: プロジェクトの作成、削除、更新。これには、プロジェクトのロール、ワークフロー、問題のタイプ、プロジェクト権限の変更が含まれます。
- **空間とページのアクティビティ**: 空間とページの作成、削除、更新。これには、空間の権限変更、ページの編集、移動が含まれる可能性があります。
- **システム構成**: 全般的な構成、グローバル権限、アプリケーションリンク、アドオン設定などの Jira および Confluence の設定の変更。
- **認証と認可**: ログイン試行 (成功と失敗)、ログアウトイベント 、アクセス制御リストの変更。

Jira および Confluence のログをパースした後、Jira 監査レコードおよび Confluence 監査レコードダッシュボードに、セキュリティ関連イベントに関する洞察が Datadog によって入力されます。ウィジェットには、最も頻繁に発生するイベントと頻繁に発生しないイベントを示すトップリストや、サインイン試行の発生国を示すジオロケーションマップが含まれます。

`source:jira-audit-records` を検索して、Datadog の [Logs Management 製品][4] で Jira 監査レコードを表示します。
`source:confluence-audit-records` を検索して、Datadog の [Logs Management 製品][4] で Confluence 監査レコードを表示します。

## セットアップ

1. Atlassian 監査レコードタイルの **Configure** タブから、**Add Atlassian Account** ボタンをクリックします。
2. Atlassian 監査レコードタイルの説明に従って、Atlassian 管理者アカウントで OAuth を使用してインテグレーションを認証します。

### インストール


## 収集データ

### メトリクス

Atlassian 監査レコードには、メトリクスは含まれません。

### サービスチェック

Atlassian 監査レコードには、サービスのチェック機能は含まれません。

### イベント

Atlassian 監査レコードには、イベントは含まれません。

### Logs

Datadog の Atlassian 監査レコードインテグレーションは、ユーザーのアクティビティに関連するログを生成する [Jira の監査レコード API][1]、[Confluence の監査レコード API][2]、またはその両方を使用してログを収集し、以下に関するインサイトが得られます。

- どのユーザーが Jira、Confluence、またはその両方でリクエストを行っているか
- どのタイプのリクエストが行われているのか
- 行われたリクエストの総数

各ログに含まれるプロパティの詳細については、[Confluence 監査レコード API ドキュメントのレスポンスセクション][2] または [Jira 監査レコード API ドキュメントのレスポンスセクション][1]をご覧ください。上記リンク先のドキュメントでこれらのカテゴリーを表示するには、以下の手順を使用します。
1. 監査レコードのリストの **AuditRecords Container** の下の **Response** セクションで、
**Show child properties** ボタンをクリックします。API レスポンスの子プロパティのリストが表示されます。
2. **Records** の隣にある矢印をクリックします。
3. 表示された **Show child properties** ボタンをクリックします。
4. 各ログに含まれる子プロパティの別のリストが表示されます。各ログキーの隣のドロップダウンをクリックすると、詳細を確認することができます。

## トラブルシューティング

#### Authorize をクリックすると、Atlassian からのエラーメッセージが表示される

アカウントがアクセスできないログタイプを選択すると、Atlassian から次のメッセージが記載されたエラー画面が表示されることがあります。

```
Something went wrong 
Close this page and try again, or raise a support request.
```

この場合は、Datadog の Atlassian タイルに戻ります。そして、アカウントがアクセス可能なログタイプを選択して、アカウントを再認証します。


#### アカウントは認証されているが、すべての環境からのログが表示されない。
現在、各サイトごとに個別に認証する必要があります。たとえば、複数のサイトの管理者である場合、各サイトに対して個別に認証する必要があり、これは [Atlassian の既知の問題][5] です。

#### CORS 許可リストはサポートされていますか？ 
はい、詳細については Atlassian Docs の [このセクション][6] を参照してください。


#### このインテグレーションを 2024 年 2 月 7 日よりも前にインストールして、ログが一切見られない。 
このインテグレーションを 2024 年 2 月 7 日よりも前にインストールした場合、既知のバグの影響を受ける可能性があります。これを解決するには、インテグレーションの再インストールが必要になる場合があります。そのためには、Confluence、Jira、またはその両方で現在のアカウントを削除し、管理者権限を持つアカウントを使用して再認証を行います。


お困りですか？
- [Datadog サポート][7] にお問い合わせください。
- Atlassian の[開発者向けリソース][2]を通じて Atlassian にお問い合わせください。



[1]: https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-audit-records/#api-group-audit-records
[2]: https://developer.atlassian.com/cloud/confluence/rest/v1/api-group-audit/#api-group-audit
[3]: https://www.datadoghq.com/product/cloud-siem/
[4]: https://docs.datadoghq.com/ja/logs/
[5]: https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/#known-issues
[6]: https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/#is-cors-whitelisting-supported-
[7]: https://docs.datadoghq.com/ja/help/