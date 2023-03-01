---
app_id: rapdev-github
app_uuid: 37a265a0-fb4a-463b-aaea-653f5d950c2c
assets:
  dashboards:
    RapDev GitHub Overview: assets/dashboards/RapDevGitHubDashboard.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.github.users.count
      metadata_path: metadata.csv
      prefix: rapdev.github.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: RapDev GitHub
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- マーケットプレイス
- クラウド
- メトリクス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_github
integration_id: rapdev-github
integration_title: GitHub
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_github
oauth: {}
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.github
  product_id: github
  short_description: リポジトリ 1 個あたりの単価
  tag: repo_name
  unit_label: GitHub リポジトリ
  unit_price: 1
public_title: GitHub インテグレーション
short_description: GitHub の組織やエンタープライズを監視する
supported_os:
- linux
- mac os
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Mac OS
  - Supported OS::Windows
  - Category::Marketplace
  - Category::Cloud
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: GitHub の組織やエンタープライズを監視する
  media:
  - caption: GitHub の組織やエンタープライズに関する一般的なメトリクス
    image_url: images/RapDevGitHub_DB1.jpg
    media_type: image
  - caption: あらゆるランナーに関するメトリクス
    image_url: images/RapDevGitHub_DB2.jpg
    media_type: image
  - caption: 特定のリポジトリに関するメトリクス
    image_url: images/RapDevGitHub_DB3.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: GitHub インテグレーション
  uninstallation: README.md#Uninstallation
---



## 概要
このインテグレーションは、GitHub のメトリクスを収集し、GitHub API の異なるエンドポイントを通じて Datadog にレポートします。送信されるメトリクスは以下の種類です。
+ Organization/Enterprise Stats
+ レポジトリのメトリクス
+ セルフホストランナーとインストール型ランナー
+ GitHub ワークフローモニタリング

### ダッシュボード  
このインテグレーションは、**RapDev GitHub Dashboard** と呼ばれるすぐに使えるダッシュボードを提供します。このダッシュボードは、データが Datadog に送信されるたびにポップアップし、特定のリポジトリや作成者の検索をさらに絞り込むための環境変数が含まれています。

## Linux ##
`sudo -u dd-agent datadog-agent integration install --third-party datadog-rapdev_github==1.0.0`

## Windows ##
`"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" integration install --third-party datadog-rapdev_github==1.0.0` 
```

1. GitHub の[開発者設定ページ](https://github.com/settings/apps)に移動します。プロンプトが表示されたら、ログインして **Settings** > **Developer Settings** > **Github Apps** に移動してください。

2. **New GitHub App** をクリックし、以下のフィールドを適宜設定します。
    - `GitHub App Name` を任意の名前に設定します。
    - `Homepage URL` を `http://127.0.0.1` にします。
    - `Webhook` の下の `Active` のチェックを外します。

3. **Permissions** セクションで、以下の権限を設定します。
    - <b>Repository Permissions:</b> `Actions`、`Issues`、`Metadata`、`Pull Requests` を `Read Only` に設定します。
    - <b>Organization Permissions:</b> `Administration`、`Members`、`Self-hosted Runners` を `Read Only` に設定します。

4. 最後に、`Where can this GitHub App be installed?` を `Any account` に設定し、**Create GitHub App** をクリックします。作成が完了すると、GitHub はアプリの設定にリダイレクトします。アプリ ID はコンフィギュレーションファイルで使用されるので、安全な場所に保存してください。

5. `Private Keys` セクションまでスクロールし、**Generate a private key** をクリックします。自動的に `.pem` ファイルが保存されるはずです。必要であれば、このファイルをより安全な場所に移動することができます。

6. 左側の `Install App` をクリックし、監視したい組織の `Install` を選択します。`All Repositories` が選択されていることを確認し、`Install` を選択します。監視する組織を追加する場合は、この手順を繰り返します。

   &nbsp;これにより、組織でのアプリのインストールにリダイレクトされるはずです。Web アドレスバーで、URL の末尾にある 8 桁の数字を安全な場所に保存してください。

7. `conf.d/rapdev_github.d/conf.yaml.example` [コンフィギュレーションファイル](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory)がある場所を探し、ファイル名から `.example` を削除して、そのファイルを開いて以下のように設定します。
    - `user`: 認証されたユーザーの名前。
    - `org`: 所属する組織や企業の名前。
    - `github_mode`: 所属に応じて `organization` または `enterprise` のどちらか。
    - `key_path`: ステップ 9 で生成した `.pem` ファイルのパス。
    - `org_app_id`: ステップ 13 の URL の末尾にあった 8 桁の ID。
    - `gh_app_id`: ステップ 8 で生成した 6 桁のアプリ ID。
    - `repo_list`: インテグレーションが参照すべき、組織または企業内のリポジトリのリスト。空白にすると、すべてのリポジトリを検索します (<b>注</b>: この場合、40 リポジトリごとに更新までの時間が約 1 分長くなる可能性があります)。

8. 構成が完了したら、[Datadog Agent を起動](https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7)し、インテグレーションの利用を開始します。

## サポート
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。
- サポート: support@rapdev.io
- セールス: sales@rapdev.io
- チャット: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて
*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:support@rapdev.io)から RapDev へメッセージをお送りいただければ、導入をサポートいたします！*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-github" target="_blank">こちらをクリック</a>してください。