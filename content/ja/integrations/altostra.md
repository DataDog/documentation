---
assets:
  dashboards:
    Altostra: assets/dashboards/altostra.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - 自動化
  - AWS
  - cloud
  - 構成 & デプロイ
  - ログの収集
creates_events: false
ddtype: crawler
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/altostra/README.md
display_name: Altostra
draft: false
git_integration_title: altostra
guid: c5b325e5-a55a-4ff2-9c91-3aac9463c6be
integration_id: altostra
integration_title: Altostra
is_public: true
kind: integration
maintainer: support@altostra.com
manifest_version: 1.0.0
metric_prefix: altostra.
metric_to_check: ''
name: altostra
public_title: Datadog-Altostra インテグレーション
short_description: Altostra から Datadog へクラウドアプリケーションログを自動的に送信
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Altostra は、クラウドコンピューティングサービスと統合し、開発チームにエンドツーエンドのワークフローを提供します。

Datadog Altostra インテグレーションにより、Altostra プロジェクトを実装中に自動的にインスツルメントして、Datadog アカウントにログやメトリクスを送信できます。インテグレーションのコンフィギュレーションは、デプロイ環境ごとに制御できます。

## セットアップ

### インストール

Datadog Altostra インテグレーションは組み込まれているため、インストールは必要ありません。

### コンフィギュレーション

Datadog のインテグレーションは、アカウント設定ぺージの[インテグレーション][1]にある Altostra Web Console でご利用いただけます。

1. Altostra アカウント設定の [Integrations][1] セクションにアクセスします。
2. **Datadog** インテグレーションの **Connect** をクリックします。
3. インテグレーションの**表示名**を入力します。
4. Datadog アカウントの **API キー**を入力します。
5. **OK** をクリックしてインテグレーションの構成を完了します。
6. [Environments][2] を開き、ログ送信を構成する環境をクリックします。
7. _Settings_ で、前のステップで構成したインテグレーションを **Log shipping** の選択肢から選択します。
8. **Save Changes** をクリックします。

### 検証

1. Lambda 関数を含む Altostra プロジェクトを、Datadog へのログ送信を構成した任意の環境にデプロイします。
2. Lambda 関数を呼び出します。
3. Datadog の _Logs_ ビューに Lambda 関数のログが表示されます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://app.altostra.com/team/settings/integrations/logging
[2]: https://app.altostra.com/environments
[3]: /ja/help