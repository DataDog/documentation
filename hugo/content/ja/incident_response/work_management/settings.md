---
aliases:
- /ja/service_management/case_management/settings/
- /ja/incident_response/case_management/settings/
further_reading:
- link: /incident_response/work_management/troubleshooting
  tag: ドキュメント
  text: サードパーティインテグレーションのトラブルシューティング
- link: /incident_response/work_management/customization
  tag: ドキュメント
  text: ワークマネジメントのカスタマイズ
title: 設定
---
## 概要{#overview}

プロジェクト設定では、アクセス制御の管理、自動ステータスの遷移の設定、Jira や ServiceNow などのサードパーティ製インテグレーションのセットアップなどを行うことができます。

## きめ細かなアクセス制御 {#granular-access-control}

デフォルトでは、プロジェクトおよび作業項目へのアクセスは制限されていません。[きめ細かなアクセス制御][1]を使用して、プロジェクトレベルでユーザー、チーム、ロール、または組織全体の権限を管理できます。使用できる権限セットは 4 つあります。
- **マネージャー**: ユーザーは、プロジェクトの作業項目、ビュー、設定、および権限を作成および編集でき、プロジェクトを削除することもできます。
- **コントリビューター**: ユーザーは、作業項目の作成、コメントの追加、および編集を行うことができます。設定、権限、またはプロジェクトを変更することはできません。
- **ビューアー**: ユーザーは、プロジェクトのすべての作業項目、ビュー、および設定を表示、ウォッチできます。作業項目を作成、編集、またはコメントすることはできません。
- **アクセスなし**: ユーザーは、プロジェクトの作業項目、ビュー、または設定を一切表示できません。

**注:** モニターなど、Work Management とインテグレーションされる他の Datadog 製品は、プロジェクトのアクセス設定に関係なく、プロジェクト内に作業項目を自動的に作成できます。

## ステータスの遷移 {#status-transitions}

ノイズを減らすには、プロジェクト設定のステータス遷移ページから、7 日、14 日、30 日、90 日、または 180 日間アクティビティがない場合に作業項目が自動的にクローズされるように構成します。アクティビティがないとは、属性の更新やコメントの書き込みなど、人間が開始したアクションがない状態を指します。Datadog は 1 日 1 回、選択した期間以上アクティビティがない作業項目を確認し、それらをクローズします。

## インテグレーションのセットアップ {#set-up-integrations}

Work Management はさまざまなネイティブおよびサードパーティ製インテグレーションを提供しているため、Datadog ソリューションを既存のワークフローやプロセスに組み込むことができます。Jira、ServiceNow、Linear の各インテグレーションを使用すると、Datadog のフルスタックテレメトリを用いて作業項目を解決しながら、これらのサードパーティシステムに調査の記録を保持できます。

### モニター {#monitors}

<div class="alert alert-info">モニターハンドルの使用 <code>@case-&lt;project_handle&gt;</code> 用語であり、これは Work Management の以前の名称である Case Management を反映しています。</div>

[Project Settings ページ][2]に移動し、**Integrations** > **Datadog Monitors** をクリックして、トグルをオンにして @case-<project_handle> を取得します。

プロジェクトハンドルをモニターで使用すると、作業項目を自動的に作成できます。モニターのメッセージ本文に `@case-<project_handle>` を含めます。Datadog は、プロジェクト名に基づいたハンドルを提案します。必要に応じて、そのまま使用するか変更することができます。

### サードパーティインテグレーション{#third-party-integrations}
サードパーティのインテグレーションを構成するには、[通知とチケットの作成][3]に移動します。

## カスタム作業タイプと属性 {#custom-work-types-and-attributes}

組織のニーズに合わせて作業項目を調整できるよう、カスタム作業タイプと属性をプロジェクトに追加します。詳細については、[Work Management のカスタマイズ][4]を参照してください。


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/granular_access
[2]: https://app.datadoghq.com/work/settings
[3]: /ja/incident_response/work_management/notifications_integrations
[4]: /ja/incident_response/work_management/customization