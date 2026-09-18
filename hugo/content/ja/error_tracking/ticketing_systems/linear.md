---
further_reading:
- link: /error_tracking/explorer/
  tag: ドキュメント
  text: Error Tracking エクスプローラー
- link: /error_tracking/issue_states/
  tag: ドキュメント
  text: Error Tracking における問題の状態
- link: /integrations/linear/
  tag: ドキュメント
  text: Linear インテグレーション
is_beta: false
private: false
site_support_id: linear_error_tracking
title: Linear の Error Tracking との統合
---
## 概要 {#overview}

Linear を Error Tracking と統合して、Linear の問題を作成し Error Tracking の問題にリンクします。このインテグレーションで以下が可能になります。

- Error Tracking の問題パネルから Linear の問題の直接作成
- 複数の Error Tracking の問題を 1 つの Linear の問題にグループ化

## 前提条件{#prerequisites}

1. [Linear integration for Datadog][7] をセットアップします。
2. 以下の [権限][1] があることを確認します。
   - Error Tracking Read
   - Error Tracking Issue Write
   - Cases Read
   - Cases Write
   - Integrations Read

## Error Tracking の問題から Linear の問題を作成する{#create-a-linear-issue-from-an-error-tracking-issue}

問題パネルから直接 Linear の問題を作成し、その問題に関する調査作業をグループ化します。

1. [Error Tracking エクスプローラー][2] に移動します。
2. 問題をクリックして、問題パネルを開きます。
3. 問題パネルの [**Actions**] (アクション) ドロップダウンで、[**Add Linear issue**] (Linear の問題の追加) をクリックします。
4. 新しい Linear の問題のための Linear ワークスペースとチームを選択します。
5. 必要に応じて、データ同期設定を開き、Datadog と Linear 間でデータを同期する方法を構成します。
6. [**Create**] (作成) をクリックして、Linear の問題を作成します。

{{< img src="error_tracking/create-linear-issue.png" alt="Error Tracking の問題から Linear の問題を作成する" style="width:100%;" >}}

Linear の問題が作成されると、その問題は Error Tracking の問題にリンクされ、問題パネルに表示されます。Error Tracking の問題ステータスは自動的に **REVIEWED** に変更されます。

Error Tracking の問題が Linear の問題にリンクされると、状態、担当者、およびコメントが双方向で同期されます。詳細については、『[Error Tracking の問題と Linear の問題の間の状態の双方向同期](#state-two-way-sync-between-error-tracking-issues-and-linear-issues)』を参照してください。

## 複数の Error Tracking の問題を 1 つの Linear の問題にグループ化{#group-multiple-error-tracking-issues-into-a-single-linear-issue}

複数の Error Tracking の問題を 1 つの Linear の問題に関連付けると、関連する問題を 1 つの作業単位にグループ化できます。

1. [Error Tracking エクスプローラー][2] に移動します。
2. 問題をクリックして、問題パネルを開きます。
3. 問題パネルの [**Actions**] (アクション) ドロップダウンで、[**Add Linear issue**] (Linear の問題の追加) をクリックします。
4. [**Add to Existing**] (既存への追加) タブで、Error Tracking の問題をグループ化する対象の Linear の問題の URL を貼り付けます。
5. 必要に応じて、データ同期設定を開き、Datadog と Linear 間でデータを同期する方法を構成します。
6. [**Link to Issue**] (問題にリンク) をクリックして、Error Tracking の問題を Linear の問題に関連付けます。
7. このグループに追加するすべての Error Tracking の問題に対して、これらの操作を繰り返します。

{{< img src="error_tracking/add-to-existing-linear-issue.png" alt="既存の Linear の問題に Error Tracking の問題を追加する" style="height:300px;" >}}

複数の Error Tracking の問題が 1 つの Linear の問題にリンクされると、状態、担当者、およびコメントが双方向で同期されます。詳細については、『[Error Tracking の問題と Linear の問題の間の状態の双方向同期](#state-two-way-sync-between-error-tracking-issues-and-linear-issues)』を参照してください。

Linear の問題と Error Tracking の問題の関係は一対多の関係です。1 つの Linear の問題は複数の Error Tracking の問題にリンクできますが、Error Tracking の問題は 1 つの Linear の問題にしかリンクできません。

## Error Tracking の問題と Linear の問題の間の状態の双方向同期{#state-two-way-sync-between-error-tracking-issues-and-linear-issues}

Datadog と Linear チーム間で双方向同期が有効かつ設定されている場合、Error Tracking の問題と Linear の問題の状態がミラーリングされます。予期しない動作が発生した場合は、『[トラブルシューティング](#troubleshooting)』セクションを参照して設定を修正する方法を確認してください。

### 単一の Error Tracking の問題が単一の Linear の問題にリンクされている{#single-error-tracking-issue-linked-to-single-linear-issue}

単一の Error Tracking の問題が Linear の問題にリンクされている場合、それらの状態は双方向に同期されます。これらの状態間のマッピングは、Linear の問題作成フォームのデータ同期設定で構成できます。

{{< img src="error_tracking/linear-status-mapping.png" alt="Error Tracking の問題の状態を Linear の問題の状態にマッピングする" style="width:100%;" >}}

### 複数の Error Tracking の問題が単一の Linear の問題にリンクされている {#multiple-error-tracking-issues-linked-to-single-linear-issue}

複数の Error Tracking の問題が同じ Linear の問題にリンクされている場合、実行するアクションに応じてそれらの状態は同期されます。Linear の問題の状態を更新すると、リンクされているすべての Error Tracking の問題が、マッピングに従ってこの状態を反映するように更新されます。

マッピングが次のように定義されていると仮定します。

| Work Management 状態グループ | Linear の問題の状態 |
|------------------------------|--------------------|
| `Open`                       | `Todo`             |
| `In Progress`                | `In Progress`      |
| `Closed`                     | `Done`             |

Error Tracking の問題の状態を更新すると、リンクされている他の Error Tracking の問題および Linear の問題の状態は、次のルールに従います。

| 初期状態                                                                  | アクション                                                          | 結果の状態                                                                                       |
|--------------------------------------------------------------------------------|-----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| Linear の問題は `Done` で、リンクされているすべての Error Tracking の問題は `Resolved`。| 1 つの Error Tracking の問題を `For Review` に更新します。               | Linear の問題は `Todo` に変わります。リンクされている他の Error Tracking の問題は `Resolved` のままです。        |
| Linear の問題は `Todo` で、リンクされているすべての Error Tracking の問題は `For Review`。| 1 つの Error Tracking の問題を `Resolved` に更新します。                 | Linear の問題は `Todo` のままです。更新された Error Tracking の問題は `Resolved` で、その他は `For Review` のままです。|
| Linear の問題は `Done` で、リンクされていない Error Tracking の問題は `For Review` です。| `For Review` の Error Tracking の問題を Linear の問題にリンクします。| Linear の問題は `Done` のままです。リンクされているすべての Error Tracking の問題は、新しくリンクされたものを含め `Resolved` です。|
| Linear の問題は `Todo` で、リンクされていない Error Tracking の問題は `Resolved` です。| `Resolved` の Error Tracking の問題を Linear の問題にリンクします。  | Linear の問題は `Todo` のままです。リンクされている他の Error Tracking の問題は `For Review` のままで、新しくリンクされた問題は `Resolved` のままです。|

## トラブルシューティング {#troubleshooting}

Error Tracking でチケットシステムを使用して予期しない動作が発生した場合は、以下のトラブルシューティング手順を参照してください。引き続き問題が解決しない場合は、[Datadog サポート][5] へお問い合わせください。

### Linear と Error Tracking 間の同期が切断されている{#sync-is-broken-between-linear-and-error-tracking}

Linear の問題と対応する Error Tracking の問題の間で同期の問題が発生している場合 (Linear の問題をクローズしても Error Tracking の問題の状態が更新されないなど)、以下の手順がすべて適切に構成されていることを確認してください。

1. 問題パネルで、Error Tracking の問題が Linear の問題に正しくリンクされていることを確認します。
2. Work Management が Linear と同期するように正しく構成されていることを確認します。

   Datadog は、Error Tracking の問題と Linear の問題をリンクするために、Work Management の作業項目を自動的に作成します。構成をチェックするには、以下の手順に従います。
   - 問題パネルから、リンクされている Work Management の作業項目を開き、そのプロジェクトをチェックします。
   - Work Management の設定で、このプロジェクトに対して Linear インテグレーションが有効になっていることをチェックします。
   - 正しい Linear ワークスペースとチームが構成されていることをチェックします。

3. Work Management の設定で、このプロジェクトに対して Work Management と Linear 間の同期が有効になっていることをチェックします。Datadog と Linear の間で双方向同期を行うために、同期したいフィールドが構成されていることをチェックします。

4. Linear の設定で、Datadog と Linear の間で更新を自動的に同期するための Webhook が構成されていることをチェックしてください。Webhook がない場合は、[Linear の Webhook を追加][6] してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/permissions/
[2]: https://app.datadoghq.com/error-tracking/
[5]: /ja/help/
[6]: /ja/integrations/linear/#configure-a-linear-webhook
[7]: /ja/integrations/linear/