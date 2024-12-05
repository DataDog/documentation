---
further_reading:
- link: https://www.datadoghq.com/blog/app-builder-remediation/
  tag: ブログ
  text: App Builder でインシデントの解決を迅速化
- link: /service_management/app_builder/
  tag: ドキュメント
  text: App Builder について
- link: /service_management/workflows/
  tag: ドキュメント
  text: ワークフローについて
title: ソフトウェアテンプレート
---


## 一般的なワークフローを自動化する
[Workflow Automation][1] と [App Builder][2] を使用して、エンドツーエンドのプロセスを自動化します。これらを Datadog のサービスカタログと統合して、動的でセルフサービスのワークフローを実現します。

{{< callout url="https://forms.gle/6Er52qd3BCERhotg7" d_target="#signupModal" btn_hidden="false">}}
ソフトウェアテンプレートは非公開ベータ版です。アクセスをリクエストするにはフォームにご記入ください。
{{< /callout >}}

### Cookiecutter を使用してソフトウェアテンプレートのワークフローを作成する
Datadog でソフトウェアテンプレートを使用するには、目的のテンプレートを含む git リポジトリを作成します。その後、[Workflow Automation][3] ページに移動して、Datadog 内でテンプレートを構成します。テンプレート作成に一般的に使用されるのは、プロジェクトテンプレートや新しいプロジェクトの自動生成を行うオープンソースプロジェクトの [Cookiecutter][4] です。クイックスタートガイドは[こちらの gist][5] を参照するか、以下の手順を進めてください。

1. テンプレートの[ワークフローを作成][6]します。
   - [Workflow Automation][3] ページから、**New Workflow** をクリックします。
   - 名前を入力し、関連するタグを追加し、ユーザーから収集したい入力パラメーターを定義します。

2. テンプレート化のワークフローを構成します。
   - GitHub、Gitlab、または HTTP の[ワークフローアクション][7]を使用してテンプレートファイルを取得します。
   - Cookiecutter を使用してテンプレートからプロジェクトファイルを生成します。
     - ヒント: Cookiecutter でプロジェクトを生成するために [AWS lambda 関数][8]を作成して呼び出します。
   - GitHub、Gitlab、または HTTP の[ワークフローアクション][7]を使用してプロジェクトファイルをリポジトリにアップロードします。
   - ワークフローを保存します。

  {{< img src="tracing/service_catalog/templating-workflow.png" alt="ソフトウェアテンプレート自動化の構築ワークフロー" style="width:100%;" >}}

3. テンプレートアプリを作成します。
   - **Service Mgmt** > **App Builder** に移動し、**New App** を選択します。
   - 名前と説明を入力し、ドラッグアンドドロップエディタを使用して、テンプレートに必要なパラメーターを収集するフォームを作成します。
   - **New Query** を選択し、**Trigger workflow** アクションを使用してテンプレート化のワークフローを呼び出し、関連するパラメーターを渡します。
   - フォームを送信し、ワークフローをトリガーし、テンプレートのパラメーターを渡す **Button** を作成します。
   - アプリを保存して公開します。

4. アプリケーションとワークフローを実行します。
   - **View App** をクリックしてアプリをスタンドアロンページで表示するか、**Add to a Dashboard** をクリックしてアプリをダッシュボードに配置します。
   - **Service Mgmt** > **App Builder** に移動し、あなたのアプリを選択します。テンプレートフォームに記入し、送信ボタンをクリックします。
   - [Workflow Automation][3] でワークフローテンプレート化プロセスの成功を追跡します。

  {{< img src="tracing/service_catalog/templating-app.png" alt="App Builder によるソフトウェアテンプレート管理のアプリケーション" style="width:100%;" >}}

### サービスカタログのアクションを検索
サービスカタログに特化したすべてのアクションを確認するには、[Datadog アクションカタログ][7]に移動します。そこで、必要なアクションをフィルタリングしてください。

1. **アクションカタログにアクセス**: Datadog Workflow Automation 環境内でアクションカタログを探します。
2. **検索機能**: 検索バーを使って、"Service Catalog" (サービスカタログ) や "get service dependencies" (サービス依存関係を取得) など、特定のアクションに関連するキーワードを検索します。

### 利用可能なサービスカタログアクション

以下は、Datadog Workflow Automation のサービスカタログで利用可能なアクションの包括的リストです。このリストは、新しいアクションが追加されることで更新される可能性があります。

- **サービス情報の取得**
  - "Get service definition" (サービス定義の取得) で単一のサービスの定義を取得します
  - "List service definitions" (サービス定義の一覧) で Datadog サービスカタログからすべての定義を取得します
  - "Get service dependencies" (サービスの依存関係を取得) でサービスの直接の上流および下流のサービスを取得します
- **インシデントのトリアージ**
  - "Get service PagerDuty on call" (サービスの PagerDuty オンコールを取得)
  - 他のアクションと連携させることで、重大なイベントに基づいたワークフローをトリガーできます (例: ランブックの実行)。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_management/workflows/
[2]: /ja/service_management/app_builder/
[3]: https://app.datadoghq.com/workflow
[4]: https://www.cookiecutter.io/
[5]: https://gist.github.com/enbashi/366c62ee8c5fc350d52ddabc867602d4#file-readme-md
[6]: /ja/service_management/workflows/build/#create-a-custom-workflow
[7]: /ja/service_management/workflows/actions_catalog/
[8]: /ja/service_management/workflows/actions_catalog/aws_lambda_invoke_lambda/