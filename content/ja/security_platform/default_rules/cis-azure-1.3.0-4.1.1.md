---
aliases:
  - /ja/bc4-cbi-lkc
  - /ja/security_monitoring/default_rules/bc4-cbi-lkc
  - /ja/security_monitoring/default_rules/cis-azure-1.3.0-4.1.1
cloud: azure
disable_edit: true
integration_id: ''
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
security: コンプライアンス
title: SQL Server で監査が有効になっている
type: security_rules
---
## 説明

SQL Server で監査を有効にします。

## 根拠

Azure プラットフォームでは、SQL サーバーをサービスとして作成できます。サーバーレベルで監査を有効にすると、SQL サーバーインスタンス上に既存および新しく作成されたすべてのデータベースが確実に監査されます。SQL データベースに適用される監査ポリシーは、データベースがホストされている特定の SQL サーバーに適用される監査ポリシーと設定を上書きしません。監査はデータベースイベントを追跡し、それを Azure ストレージアカウントの監査ログに書き込みます。また、規制コンプライアンスを維持し、データベースアクティビティを理解し、ビジネス上の懸念やセキュリティ違反の疑いを示す可能性のある不一致や異常についての洞察を得るのにも役立ちます。

## 修復

Azure コンソールから

1. SQL サーバーに移動します
2. サーバーインスタンスごとに
3. Auditing をクリックします
4. Azure PowerShell を使用して Auditing を On に設定します。
5. すべての SQL Server のリストを取得します: `Get-AzureRmSqlServer`。サーバーごとに、監査を有効にします。

  ```bash
  Set-AzureRmSqlServerAuditingPolicy -ResourceGroupName <resource group name> -ServerName <server name> -AuditType <audit type> -StorageAccountName <storage account name>
  ```s

## リファレンス

1. https://docs.microsoft.com/en-us/azure/security-center/security-center-enable-auditing-on-sql-servers
2. https://docs.microsoft.com/en-us/powershell/module/azurerm.sql/get-azurermsqlserverauditing?view=azurermps-5.2.0
3. https://docs.microsoft.com/en-us/powershell/module/azurerm.sql/set-azurermsqlserverauditingpolicy?view=azurermps-5.2.0
4. https://docs.microsoft.com/en-us/azure/sql-database/sql-database-auditing
5. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-logging-threat-detection#lt-4-enable-logging-for-azure-resources

**注**: サーバーポリシーは、サーバー上に既存および新しく作成されたすべてのデータベースに適用されます。サーバー Blob 監査が有効になっている場合、それは常にデータベースに適用されます。データベース監査の設定に関係なく、データベースは監査されます。監査タイプテーブルは非推奨になり、タイプ Blob のみが使用可能になります。データベースで Blob 監査を有効にし、サーバーで Blob 監査を有効にしても、サーバーの Blob 監査の設定が上書きまたは変更されることはありません。両方の監査は並んで存在します。したがって、データベースは 2 回並行して (1 回はサーバーポリシーによって、もう 1 回はデータベースポリシーによって) 監査されます。

## CIS コントロール

バージョン 7 6.3 詳細ログの有効化: システムログを有効にして、イベントの送信元、日付、ユーザー、タイムスタンプ、送信元アドレス、宛先アドレス、その他の有用な要素などの詳細情報を含めます。