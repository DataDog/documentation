---
aliases:
- /ja/service_management/incident_management/integrations/servicenow/
- /ja/incident_response/incident_management/integrations/servicenow/
further_reading:
- link: integrations/servicenow/
  tag: ドキュメント
  text: ServiceNow インテグレーションのインストール
- link: /integrations/guide/servicenow-itom-itsm-setup
  tag: ドキュメント
  text: ServiceNow ITOM および ITSM のセットアップ
- link: https://app.datadoghq.com/integrations/servicenow
  tag: App
  text: アプリ内の ServiceNow インテグレーションタイル
title: ServiceNow と Datadog Incident Management のインテグレーション
---
## 概要{#overview}

ServiceNow は、デジタルワークフロー、IT オペレーション、ビジネスプロセスを管理するためのソリューションを提供する IT サービス管理プラットフォームです。Datadog ServiceNow インテグレーションを使用すると、Datadog のインシデントから ServiceNow でインシデントを作成し、2 つのプラットフォーム間でデータを双方向に同期できます。

Datadog Incident Management との ServiceNow インテグレーションには、次のようなメリットがあります。
- **可視性の向上**: すべてのステークホルダーにインシデントを即座に通知し、より迅速な対応を促進します。
- **双方向同期**: インシデントの状態、重大度 (影響度と緊急度)、およびステータスの更新を Datadog と ServiceNow 間で自動的に同期します。
- **既存のワークフローのサポート**: 現在のプロセスとシームレスに統合し、確立された ServiceNow ワークフロー内でインシデントを管理しやすくします。

## 前提条件 {#prerequisites}

ServiceNow で自動インシデント作成と双方向同期を使用するには、

1. ServiceNow インテグレーションタイルから [ServiceNow インテグレーション][1]をインストールし、Datadog で [ServiceNow タイルが構成][2]され、ServiceNow インスタンスが構成されていることを確認します。
2. ServiceNow ストアから [ITOM/ITSM Integration for Datadog][3] をインストールする (推奨) か、最新の Update Set ([Datadog-Snow_Update_Set_v2.8.0.xml][4]) をダウンロードして ServiceNow インスタンスに手動でアップロードします。
3. 安全な認証のために、Datadog で[サービスアカウントアプリケーションキー][5]を作成します。**注**: Datadog では、個人のキーを使用するのではなく、サービスアカウントキーを作成することを推奨しています。個人のキーを使用すると、ユーザーのアカウントが無効化されたり権限が変更されたりした場合に ServiceNow の同期が機能しなくなるリスクがあります。

## セットアップ {#setup}

### 自動インシデント作成の構成 {#configure-automatic-incident-creation}

1. [インテグレーション設定][6] に移動します。
1. 左側のメニューで **Integrations** をクリックします。
1. **ServiceNow** インテグレーションタイルを見つけてクリックし、構成を開きます。
2. **Enable ServiceNow incident creation** のトグルをクリックします。
3. **Automatically create a ServiceNow incident** のトグルをクリックします。
4. ServiceNow インシデントを自動的に作成するタイミングを定義する条件を追加します。この条件を空白のままにすると、Datadog がインシデントを作成したときに、インテグレーションによって ServiceNow インシデントが作成されます。

### 双方向同期の構成 {#configure-bidirectional-sync}

ServiceNow では、Incident Management と状態、影響度、緊急度を双方向に同期できます。

1. ServiceNow で右上隅にある地球アイコンをクリックし、**アプリケーションスコープ**が **ITOM/ITSM Integration for Datadog** に設定されていることを確認します。
2. 左上のナビゲーションメニューで **All** をクリックします。
3. フィルターに **ITOM/ITSM Integration for Datadog** と入力します。
4. 絞り込まれた結果から **Configuration** リンクをクリックし、必要な設定を入力します:
   1. **Datadog Data Center** を選択します。
   2. **Datadog API キー** を貼り付けます。
   3. 作成した**サービスアカウントのアプリケーションキー**を貼り付けます。
   4. **Enabled** チェックボックスをオンにします。
5. [**Save**] (保存) をクリックします。

双方向同期を使用すると、Datadog でインシデントが作成されたときに、リンクされた ServiceNow インスタンスでも対応するインシデントが作成されます。この ServiceNow インシデントには Datadog インシデントへの参照が含まれており、定義された[フィールドマッピング](#field-mappings)に基づいて同期が維持されます。

## フィールドマッピング {#field-mappings}

フィールドマッピングは、Datadog インシデントの情報が ServiceNow インシデントのフィールドにどのように転送され、同期されるかを定義します。これにより、ステータス、重大度、説明などの主要なインシデントの詳細が両方のシステムで一貫して最新の状態に保たれます。

以下は、インテグレーションで使用されるデフォルトのフィールドマッピングです。ワークフローで高度なフィールド構成が必要な場合は、ServiceNow の [変換マップ][7] メカニズムを使用してマッピングをカスタマイズできます。

Datadog Incident Management と ServiceNow 間で同期されるフィールドは次のとおりです。

| **Incident Management** | **ServiceNow ケーステーブル** | **ServiceNow インシデント** | **同期ステータス**                         |
| ----------------------- | -------------------------- | ----------------------- | --------------------------------------- |
| タイトル                   | タイトル - 文字列             | 短い説明       | Datadog → ServiceNow への一方向同期 |
| 発生したこと           | 説明 - 文字列       | 説明             | Datadog → ServiceNow への一方向同期 |
| 状態                   | 状態 - 文字列             | 状態                   | 双方向同期                 |
| DD インシデント URL         | インシデント URL - 文字列      | 作業メモ              | Datadog → ServiceNow への一方向同期 |
| 重大度                | インシデント緊急度 (int)     | 緊急度                 | 双方向同期                 |
| 重大度                | インシデント影響度 (int)      | 影響度                  | 双方向同期                 |

### インシデント状態マッピング {#incident-state-mapping}

| **Datadog モニター状態**                    | **ServiceNow インシデント状態** |
|----------------------------------------------|------------------------------|
| アクティブ                                      | 進行中                  |
| 警告                                        | 進行中                  |
| OK                                          | 解決済み                     |
| 完了 _(オプション、設定で構成)_ |  解決済み                  |

### Datadog インシデント重大度から ServiceNow 優先度へのマッピング {#datadog-incident-severity-to-servicenow-priority-mapping}

| **Datadog インシデント重大度** | **ServiceNow 緊急度** | **ServiceNow 影響度** | **ServiceNow 優先度** |
|-------------------------------|------------------------|-----------------------|-------------------------|
| SEV-1                         | 1                      | 1                     | 1 - 重大            |
| SEV-2                         | 1                      | 2                     | 2 - 高                |
| SEV-2                         | 2                      | 1                     | 2 - 高                |
| SEV-3                         | 1                      | 3                     | 3 - 中程度            |
| SEV-3                         | 2                      | 2                     | 3 - 中程度            |
| SEV-3                         | 3                      | 1                     | 3 - 中程度            |
| SEV-4                         | 2                      | 3                     | 4 - 低                 |
| SEV-4                         | 3                      | 2                     | 4 - 低                 |
| SEV-5 (軽微)                 | 3                      | 3                     | 5 - 計画            |
| 不明                       | 3                      | 3                     | 5 - 計画            |

**注**: Incident Management の設定で `Start at SEV-0` が有効になっている場合、`ServiceNow Urgency`、`ServiceNow Impact`、および `ServiceNow Priority` の値はすべて同じままですが、`Datadog Incident Severity` は 1 つ下にシフトします。たとえば、このテーブルの最初の行では、`Datadog Incident Severity` は `0` になりますが、行の残りの値はすべて同じままです。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/servicenow
[2]: /ja/integrations/servicenow/#configure-the-servicenow-tile-in-datadog
[3]: https://store.servicenow.com/store/app/e0e963a21b246a50a85b16db234bcb67
[4]: /ja/resources/xml/Datadog-Snow_Update_Set_v2.8.0.xml
[5]: /ja/account_management/org_settings/service_accounts/#create-or-revoke-application-keys
[6]: https://app.datadoghq.com/incidents/settings#Integrations
[7]: /ja/integrations/guide/servicenow-itom-itsm-setup/#tranform-maps