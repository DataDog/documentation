---
categories:
- ソースコントロール
dependencies: []
description: GitHub と Datadog を接続することで、課題やプルリクエストを充実させることができます。
doc_link: https://docs.datadoghq.com/integrations/github_apps/
draft: false
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/source-code-integration/
  tag: ガイド
  text: Datadog ソースコードインテグレーション
git_integration_title: github_apps
has_logo: true
integration_id: ''
integration_title: GitHub アプリ
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: github_apps
public_title: Datadog-GitHub アプリのインテグレーション
short_description: GitHub と Datadog を連携させる
type: ''
version: '1.0'
---

## 概要

Datadog と GitHub アプリを連携させることで、リポジトリのアクセス許可を有効にして、エラーにコードスニペットを表示することができます。また、Datadog のノートブックやインシデントタイムラインに GitHub の PR や課題へのリンクを表示することができます。

## セットアップ

### インストール

[Datadog GitHub アプリインテグレーションタイル][1]を使って、インテグレーションタイルをインストールします。

### コンフィギュレーション

GitHub 組織の管理者であれば、GitHub アプリを構成することができます。

1. GitHub アプリインテグレーションタイルで、**Configuration** タブに移動します。
2. **Link GitHub Account** をクリックして、GitHub アプリを新規に作成します。
3. **Configure** で、**Organization** を選択して組織名を入力するか、**Personal Account** を選択します。
オプションで、GitHub Enterprise Server インスタンス (バージョン 2.22 以上) の URL を指定し、Datadog サーバーが Enterprise インスタンスに接続できることを確認します。サーバー IP は、[IP Ranges][2] の Webhooks セクションで入手できます。

4. **Edit Permissions** で、課題、プルリクエスト、コンテンツに対する Datadog の読み取りアクセス許可を有効にします。少なくとも 1 つのアクセス許可を選択する必要があります。
5. **Create App in GitHub** をクリックすると、GitHub アプリ名を入力する画面が表示されるので、入力します。
6. GitHub アプリ名フィールドに名前を入力し、**Create GitHub App** をクリックします。
7. **Configuration** タブで、**Install GitHub App** と **Install & Authorize** をクリックします。

GitHub アプリがインテグレーションタイルに表示されます。スタックトレースでインラインコードスニペットを有効にするには、[ソースコードインテグレーションの設定][3]を参照してください。

### ノートブック

[ノートブック][4]では、GitHub の課題やプルリクエストは自動的にプレビューホバーボックスを生成し、コミット履歴、著者、日付などの詳細を追加表示します。

1. **Notebooks** > **New Notebook** の順に移動します。
2. **Text** セルを追加し、**Edit** フィールドに GitHub 上の課題またはプルリクエストを記載します (例: `https://github.com/project/repository/pull/#`)。
3. **Done** をクリックすると、リンクされた課題またはプルリクエストの横に GitHub のアイコンが表示されます。
4. **Connect to Preview** と **Authorize** をクリックします。
5. リンク先の課題またはプルリクエストにカーソルを合わせると、説明のプレビューが表示されます。

{{< img src="integrations/guide/github_apps/notebooks-links-to-git.png" alt="Git へのリンク" style="width:100%;">}}

## 収集されるデータ - テレメトリー

### 監査ログ

監査ログは、GitHub の組織全体のすべてのアクティビティとイベントを網羅します。アプリケーションのインストール時に、**Organization Administration** 権限で読み取りアクセスを許可します。 
これにより、アプリケーションは GitHub の監査ストリームを GitHub 組織に代わってログとして収集し始めます。

監査ログの収集を停止するには、GitHub Apps のインテグレーションタイルの **Telemetery** タブで該当する組織を探し、**Audit Log collection** を切り替えてください。

監査ログについては、GitHub のドキュメントの[監査ログアクション][5]と [Datadog へのストリーミングの設定][6]を参照してください。

### メトリクス

GitHub Apps インテグレーションは、コードスキャンアラートとシークレットスキャンアラートのメトリクスを収集します。これらのメトリクスを収集するためには、アプリケーションのインストール時に、それぞれの権限を読み取りアクセスに選択します。

これらのメトリクスは、アラートの状態、リポジトリ、およびシークレットタイプを分類することで、組織のアラート状態の概要を提供します。また、これらのメトリクスは、アラートのトレンドとその全般的な進展に関する長期的な洞察を提供します。

コードスキャンやシークレットスキャンのメトリクスをオプトアウトするには、GitHub Apps のインテグレーションタイルの **Telemetery** タブで対応する Organization を探し、それぞれのセクションをトグルしてください。

詳しくは、GitHub ドキュメントの[コードスキャン][7]、[シークレットスキャン][8]をご覧ください。

### イベント

GitHub アプリインテグレーションには、イベントは含まれません。

### サービスのチェック

GitHub アプリインテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。



{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#integrations/github-apps
[2]: https://docs.datadoghq.com/ja/api/latest/ip-ranges/
[3]: https://docs.datadoghq.com/ja/integrations/guide/source-code-integration
[4]: https://app.datadoghq.com/notebook
[5]: https://docs.github.com/en/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/reviewing-the-audit-log-for-your-organization#audit-log-actions
[6]: https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise#setting-up-streaming-to-datadog
[7]: https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning-alerts
[8]: https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning
[9]: https://docs.datadoghq.com/ja/help/