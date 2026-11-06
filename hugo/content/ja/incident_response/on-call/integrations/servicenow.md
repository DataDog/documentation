---
description: On-Call 呼び出しから ServiceNow インシデントを作成し、同期を維持し、ServiceNow インシデントから呼び出しをトリガーします。
further_reading:
- link: /integrations/servicenow/
  tag: ドキュメント
  text: ServiceNow インテグレーションのインストール
- link: /integrations/guide/servicenow-itom-itsm-setup
  tag: ドキュメント
  text: ServiceNow ITOM および ITSM のセットアップ
- link: /incident_response/on-call/routing_rules/
  tag: ドキュメント
  text: ルーティングルール
- link: /incident_response/on-call/integrations/
  tag: ドキュメント
  text: On-Call インテグレーション
title: ServiceNow と Datadog On-Call を統合する
---
{{< callout url="https://www.datadoghq.com/product-preview/on-call-integrations/" btn_hidden="false" header="プレビューに参加しましょう">}}
Datadog On-Call 用の ServiceNow インテグレーションはプレビュー版です。
{{< /callout >}}

## 概要{#overview}

Datadog On-Call 用の ServiceNow インテグレーションは、On-Call 呼び出しと ServiceNow インシデントを連携させます。以下の 2 つのフローをサポートしています。

- **[呼び出しを ServiceNow に同期する](#sync-pages-to-servicenow-incidents)**: ルーティングルールによって呼び出しが作成されると、Datadog は ServiceNow インシデントを作成し、呼び出しとの同期を維持します。ステータス、緊急度、コメントが、設定したマッピングに基づいて同期されます。
- **[ServiceNow から呼び出しをトリガーする](#trigger-pages-from-servicenow-incidents)**: ServiceNow レコードがビジネスルールに一致すると、そのルールは Datadog On-Call チームまたはユーザーの呼び出しをトリガーします。

## 前提条件{#prerequisites}

- On-Call 設定で ServiceNow コネクションを作成するために必要な、[On-Call 管理者 (`on_call_admin`)][1]権限があることを確認します。
- 以下のように、[ServiceNow ITOM/ITSM のセットアップ][2]を完了します。
  1. ServiceNow タイルを構成し、Datadog 用 ITOM/ITSM インテグレーションのバージョン 2.9.3 以降をインストールします。
  1. 「[ServiceNow と Datadog 間でデータを双方向に同期する][3]」の手順を完了します。この呼び出しのどちらのフローも、その構成の認証情報を使用します。

## 呼び出しを ServiceNow インシデントに同期する{#sync-pages-to-servicenow-incidents}

### ServiceNow コネクションを作成する{#create-a-servicenow-connection}

コネクションは、どの ServiceNow インスタンスがインシデントを受信するか、および呼び出しとインシデントがどのように同期を維持するかを定義します。コネクションは複数 (たとえば、割り当てグループごとに 1 つずつ) 作成できます。

1. Datadog で、[**[On-Call] > [Settings] > [Integrations]**][4]に移動します。
1. [**ServiceNow**] を選択し、[**Add Connection**] をクリックします。
1. 以下のとおり、コネクションを構成します。
   - **ServiceNow instance**: ServiceNow タイルで構成した ServiceNow インスタンスを選択します。インスタンスを追加するには、[**Manage accounts**] をクリックします。
   - **Assignment group** (オプション): 呼び出しから作成されたインシデントの ServiceNow 割り当てグループを選択します。
   - **Automatically create ServiceNow incidents from Pages**: このトグルを有効にすると、このコネクションを使用するルーティングルールが呼び出しを作成するたびに ServiceNow インシデントが作成されます。
   - **Sync methods and mappings**: 呼び出しと ServiceNow インシデントの間で各フィールドを同期する方法を選択し、その値をマッピングします。呼び出しのステータスをインシデントの **State** に、緊急度をインシデントの **Impact** および **Urgency** に、コメントをインシデントの **Work Notes** に同期できます。
1. コネクションを保存します。

### ルーティングルールから呼び出しを同期する{#sync-pages-from-a-routing-rule}

コネクションを作成した後、以下のとおりチームの[ルーティングルール][5]に ServiceNow 同期を追加します。

1. [**[On-Call] > [Teams]**][6] に移動し、チームを選択します。
1. [**Page Routing**] セクションを見つけて、[**Edit**] をクリックします。
1. ルーティングルールを追加または編集します。
1. [**Set targets**] で、[**Add**] をクリックし、[**Sync with a ServiceNow Incident**] を選択してから、使用するコネクションを選択します。
1. ルーティングルールを保存します。

ルールがアラートに一致すると、Datadog は呼び出しと ServiceNow インシデントを同時に作成します。インシデントは、コネクションの設定に基づいて呼び出しと同期された状態を維持します。

## ServiceNow インシデントから呼び出しをトリガーする{#trigger-pages-from-servicenow-incidents}

Datadog 用 ITOM/ITSM インテグレーションには、`PublishOnCallPage` スクリプトが含まれています。これを ServiceNow ビジネスルールから呼び出して、たとえばインシデントが作成されたときに On-Call 呼び出しをトリガーします。

1. ServiceNow で、**[System Definition] > Business Rules[]** に移動し、[**New**] をクリックします。
1. ビジネスルールのテーブル、実行タイミング、およびフィルター条件を構成して、どのレコードが呼び出しをトリガーするかを定義します。[**Advanced**] チェックボックスを選択して、スクリプトを有効にします。
1. [**Advanced**] タブで、スクリプト内の `PublishOnCallPage` を呼び出します。たとえば、`database` チームに高緊急度で呼び出しを行うには、次のようにします。

   ```javascript
   (function executeRule(current, previous /* null when async */) {
       new PublishOnCallPage("team_handle", "database", "high").execute(current);
   })(current, previous);
   ```

   サポートされているターゲットタイプ、緊急度引数、およびスクリプトが必要とするアプリケーションキーのスコープについては、「[ServiceNow から Datadog On-Call 呼び出しを作成する][7]」を参照してください。
1. [**Submit**] をクリックします。

ビジネスルールが実行されると、Datadog はターゲットチームまたはユーザーに対して呼び出しをトリガーします。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/permissions/#on-call
[2]: /ja/integrations/guide/servicenow-itom-itsm-setup/
[3]: /ja/integrations/guide/servicenow-itom-itsm-setup/#sync-bidirectionally
[4]: https://app.datadoghq.com/on-call/settings/integrations
[5]: /ja/incident_response/on-call/routing_rules/
[6]: https://app.datadoghq.com/on-call/teams
[7]: /ja/integrations/guide/servicenow-itom-itsm-setup/#create-on-call-page