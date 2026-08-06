---
dependencies: []
disable_edit: true
---
# azure_sql_server

## `active_directory_administrators`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `ServerAzureADAdministrator`<br>
   - `administrator_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.administratorType`<br>
    **説明**: サーバー管理者のタイプ。<br>
   - `azure_ad_only_authentication`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `properties.azureADOnlyAuthentication`<br>
    **説明**: Azure Active Directory 限定認証が有効。<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `id`<br>
    **説明**: リソース ID。<br>
   - `login`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.login`<br>
    **説明**: サーバー管理者のログイン名。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: リソース名。<br>
   - `sid`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.sid`<br>
    **説明**: サーバー管理者の SID (オブジェクト ID)。<br>
   - `tenant_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.tenantId`<br>
    **説明**: 管理者のテナント ID。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: リソースタイプ。<br>
## `administrator_login`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.administratorLogin`<br>
**説明**: サーバーの管理者ユーザー名。一度作成すると変更することはできません。<br>
## `administrator_login_password`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.administratorLoginPassword`<br>
**説明**: 管理者ログインパスワード (サーバー作成時に必要です)。<br>
## `administrators`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.administrators`<br>
**説明**: サーバーの Azure Active Directory の ID。<br>
   - `administrator_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `administratorType`<br>
    **説明**: サーバー管理者のタイプ。<br>
   - `azure_ad_only_authentication`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `azureADOnlyAuthentication`<br>
    **説明**: Azure Active Directory 限定認証が有効。<br>
   - `login`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `login`<br>
    **説明**: サーバー管理者のログイン名。<br>
   - `principal_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `principalType`<br>
    **説明**: サーバー管理者のプリンシパルタイプ。<br>
   - `sid`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `sid`<br>
    **説明**: サーバー管理者の SID (オブジェクト ID)。<br>
   - `tenant_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `tenantId`<br>
    **説明**: 管理者のテナント ID。<br>
## `advanced_threat_protection_setting`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `ServerAdvancedThreatProtection`<br>
   - `creation_time`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.creationTime`<br>
    **説明**: ポリシーの UTC 作成時刻を指定します。<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `id`<br>
    **説明**: リソース ID。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: リソース名。<br>
   - `state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.state`<br>
    **説明**: Advanced Threat Protection の状態を指定します。Advanced Threat Protection が有効か無効か、または特定のデータベースまたはサーバーで状態がまだ適用されていないかどうかを指定します。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: リソースタイプ。<br>
## `alert_policies`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `ServerSecurityAlertPolicy`<br>
   - `creation_time`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.creationTime`<br>
    **説明**: ポリシーの UTC 作成時刻を指定します。<br>
   - `disabled_alerts`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `properties.disabledAlerts`<br>
    **説明**: 無効にするアラートの配列を指定します。許可される値は、Sql_Injection、Sql_Injection_Vulnerability、Access_Anomaly、Data_Exfiltration、Unsafe_Action、Brute_Force です。<br>
   - `email_account_admins`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `properties.emailAccountAdmins`<br>
    **説明**: アラートがアカウント管理者に送信されることを指定します。<br>
   - `email_addresses`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `properties.emailAddresses`<br>
    **説明**: アラートの送信先となるメールアドレスの配列を指定します。<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `id`<br>
    **説明**: リソース ID。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: リソース名。<br>
   - `state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.state`<br>
    **説明**: ポリシーの状態を指定します。ポリシーが有効か無効か、または特定のデータベースでポリシーがまだ適用されていないかどうかを指定します。<br>
   - `storage_account_access_key`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.storageAccountAccessKey`<br>
    **説明**: Threat Detection 監査ストレージアカウントの識別子キーを指定します。<br>
   - `storage_endpoint`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.storageEndpoint`<br>
    **説明**: Blob ストレージのエンドポイントを指定します (例: https://MyAccount.blob.core.windows.net)。この Blob ストレージはすべての Threat Detection 監査ログを保持します。<br>
   - `system_data`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `systemData`<br>
    **説明**: SecurityAlertPolicyResource の SystemData。<br>
       - `created_at`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `createdAt`<br>
        **説明**: リソース作成時のタイムスタンプ (UTC)。<br>
       - `created_by`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `createdBy`<br>
        **説明**: リソースを作成した ID。<br>
       - `created_by_type`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `createdByType`<br>
        **説明**: リソースを作成した ID の種類。<br>
       - `last_modified_at`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `lastModifiedAt`<br>
        **説明**: リソースの最終更新時刻 (UTC)<br>
       - `last_modified_by`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `lastModifiedBy`<br>
        **説明**: リソースを最後に変更したアイデンティティ。<br>
       - `last_modified_by_type`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `lastModifiedByType`<br>
        **説明**: リソースを最後に変更したアイデンティティの種類。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: リソースタイプ。<br>
## `audit_setting`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `ServerBlobAuditingPolicy`<br>
   - `audit_actions_and_groups`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `properties.auditActionsAndGroups`<br>
    **説明**: 監査するアクショングループとアクションを指定します。使用するアクショングループの推奨セットは、次の組み合わせです。これは、データベースに対して実行されたすべてのクエリとストアドプロシージャ、およびログインの成功と失敗を監査します:BATCH_COMPLETED_GROUP,SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP,FAILED_DATABASE_AUTHENTICATION_GROUP。この上記の組み合わせは、Azure ポータルから監査を有効にしたときにデフォルトで構成されるセットでもあります。監査にサポートされているアクショングループは次のとおりです (注: 監査のニーズをカバーする特定のグループのみを選択してください。不要なグループを使用すると、非常に大量の監査レコードが発生する可能性があります):APPLICATION_ROLE_CHANGE_PASSWORD_GROUPBACKUP_RESTORE_GROUPDATABASE_LOGOUT_GROUPDATABASE_OBJECT_CHANGE_GROUPDATABASE_OBJECT_OWNERSHIP_CHANGE_GROUPDATABASE_OBJECT_PERMISSION_CHANGE_GROUPDATABASE_OPERATION_GROUPDATABASE_PERMISSION_CHANGE_GROUPDATABASE_PRINCIPAL_CHANGE_GROUPDATABASE_PRINCIPAL_IMPERSONATION_GROUPDATABASE_ROLE_MEMBER_CHANGE_GROUPFAILED_DATABASE_AUTHENTICATION_GROUPSCHEMA_OBJECT_ACCESS_GROUPSCHEMA_OBJECT_CHANGE_GROUPSCHEMA_OBJECT_OWNERSHIP_CHANGE_GROUPSCHEMA_OBJECT_PERMISSION_CHANGE_GROUPSUCCESSFUL_DATABASE_AUTHENTICATION_GROUPUSER_CHANGE_PASSWORD_GROUPBATCH_STARTED_GROUPBATCH_COMPLETED_GROUPDBCC_GROUPDATABASE_OWNERSHIP_CHANGE_GROUPDATABASE_CHANGE_GROUP これらは、データベースに対して実行されるすべての SQL ステートメントとストアドプロシージャを対象とするグループで、監査ログが重複するため、他のグループと組み合わせて使用しないでください。詳細については、[データベースレベルの監査アクショングループ](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-action-groups)を参照してください。データベース監査ポリシーでは、特定のアクションも指定できます (ただし、サーバー監査ポリシーではアクションを指定できないことに注意します)。サポートされている監査アクションは次のとおりです:SELECTUPDATEINSERTDELETEEXECUTERECEIVEREFERENCES 監査されるアクションを定義するための一般的な形式は次のとおりです:{action} ON {object} BY {principal} 上記の形式の <object> は、テーブル、ビュー、ストアドプロシージャなどのオブジェクト、またはデータベースやスキーマ全体を参照することができることに注意してください。後者の場合、それぞれ DATABASE::{db_name} と SCHEMA::{schema_name} という形式が使用されます。例:SELECT on dbo.myTable by publicSELECT on DATABASE::myDatabase by publicSELECT on SCHEMA::mySchema by public 詳細は、[データベースレベル監査アクション](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-actions)を参照してください。<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `id`<br>
    **説明**: リソース ID。<br>
   - `is_azure_monitor_target_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `properties.isAzureMonitorTargetEnabled`<br>
    **説明**: 監査イベントを Azure Monitor に送信するかどうかを指定します。REST API を使用して監査を構成する場合、データベース上の 'SQLSecurityAuditEvents' 診断ログカテゴリーを持つ診断設定も作成する必要があります。サーバーレベルの監査では、{databaseName} として 'master' データベースを使用する必要があることに注意してください。診断設定 URI のフォーマット:PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview詳しくは、[診断設定 REST API](https://go.microsoft.com/fwlink/?linkid=2033207) または[診断設定 PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043) をご覧ください。<br>
   - `is_storage_secondary_key_in_use`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `properties.isStorageSecondaryKeyInUse`<br>
    **説明**: storageAccountAccessKey 値がストレージのセカンダリキーであるかどうかを指定します。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: リソース名。<br>
   - `queue_delay_ms`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `properties.queueDelayMs`<br>
    **説明**: 監査アクションが強制的に処理されるまでの経過時間をミリ秒単位で指定します。デフォルトの最小値は 1000 (1秒) です。最大値は 2,147,483,647 です。<br>
   - `retention_days`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `properties.retentionDays`<br>
    **説明**: ストレージアカウントに監査ログを保存する日数を指定します。<br>
   - `state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.state`<br>
    **説明**: ポリシーの状態を指定します。状態が Enabled の場合、storageEndpoint または isAzureMonitorTargetEnabled が必要です。<br>
   - `storage_account_access_key`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.storageAccountAccessKey`<br>
    **説明**: 監査ストレージアカウントの識別子キーを指定します。状態が Enabled で storageEndpoint が指定されている場合、storageAccountAccessKey を指定しないと、SQL Server のシステム割り当て済みマネージド ID を使用してストレージにアクセスします。マネージド ID 認証を使用する前提条件: 1. Azure Active Directory (AAD) で SQL Server にシステム割り当て済みマネージド ID を割り当てます。2. SQL Server ID に対して、サーバー ID に RBAC ロール 'Storage Blob Data Contributor' を追加しストレージアカウントにアクセスを許可します。詳細は、[マネージド ID 認証によるストレージへの監査](https://go.microsoft.com/fwlink/?linkid=2114355)を参照してください。<br>
   - `storage_account_subscription_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.storageAccountSubscriptionId`<br>
    **説明**: Blob ストレージのサブスクリプション ID を指定します。<br>
   - `storage_endpoint`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.storageEndpoint`<br>
    **説明**: Blob ストレージエンドポイントを指定します (例: https://MyAccount.blob.core.windows.net)。状態が Enabled の場合、storageEndpoint または isAzureMonitorTargetEnabled が必要です。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: リソースタイプ。<br>
## `encryption_protector`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `EncryptionProtector`<br>
   - `auto_rotation_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `properties.autoRotationEnabled`<br>
    **説明**: キー自動ローテーションのオプトインフラグ。true または false のどちらかです。<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `id`<br>
    **説明**: リソース ID。<br>
   - `kind`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `kind`<br>
    **説明**: 暗号化プロテクターの種類。Azure ポータルのエクスペリエンスに使用されるメタデータです。<br>
   - `location`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `location`<br>
    **説明**: リソースロケーション。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: リソース名。<br>
   - `server_key_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.serverKeyName`<br>
    **説明**: サーバーキーの名前。<br>
   - `server_key_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.serverKeyType`<br>
    **説明**: 'ServiceManaged'、'AzureKeyVault' などの暗号化プロテクタータイプ。<br>
   - `subregion`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.subregion`<br>
    **説明**: 暗号化プロテクターのサブリージョン。<br>
   - `thumbprint`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.thumbprint`<br>
    **説明**: サーバーキーのサムプリント。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: リソースタイプ。<br>
   - `uri`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.uri`<br>
    **説明**: サーバーキーの URI。<br>
## `firewall_rules`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `FirewallRule`<br>
   - `end_ip_address`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.endIpAddress`<br>
    **説明**: ファイアウォールルールの終了 IP アドレス。IPv4 形式である必要があります。startIpAddress 以上でなければなりません。すべての Azure-internal IP アドレスには、値 '0.0.0.0' を使用します。<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `id`<br>
    **説明**: リソース ID。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: リソース名。<br>
   - `start_ip_address`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.startIpAddress`<br>
    **説明**: ファイアウォールルールの開始 IP アドレス。IPv4 形式である必要があります。すべての Azure-internal IP アドレスには、値 '0.0.0.0' を使用します。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: リソースタイプ。<br>
## `fully_qualified_domain_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.fullyQualifiedDomainName`<br>
**説明**: サーバーの完全修飾ドメイン名。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: リソース ID。<br>
## `identity`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `identity`<br>
**説明**: サーバーの Azure Active Directory の ID。<br>
   - `principal_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `principalId`<br>
    **説明**: Azure Active Directory のプリンシパル ID。<br>
   - `tenant_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `tenantId`<br>
    **説明**: Azure Active Directory のテナント ID。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: ID のタイプ。リソースに対して Azure Active Directory のプリンシパルを自動的に作成し、割り当てるには、これを 'SystemAssigned' に設定します。<br>
## `key_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.keyId`<br>
**説明**: 暗号化に使用するキーの CMK URI。<br>
## `kind`
**タイプ**: `STRING`<br>
**プロバイダー名**: `kind`<br>
**説明**: SQL サーバーの種類。Azure ポータルのエクスペリエンスに使用されるメタデータです。<br>
## `location`
**タイプ**: `STRING`<br>
**プロバイダー名**: `location`<br>
**説明**: リソースロケーション。<br>
## `minimal_tls_version`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.minimalTlsVersion`<br>
**説明**: TLS の最小バージョン。許可された値: '1.0'、'1.1'、'1.2'<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: リソース名。<br>
## `primary_user_assigned_identity_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.primaryUserAssignedIdentityId`<br>
**説明**: デフォルトで使用される、ユーザーに割り当てられた ID のリソース ID。<br>
## `private_endpoint_connections`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `properties.privateEndpointConnections`<br>
**説明**: サーバー上のプライベートエンドポイント接続のリスト<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `id`<br>
    **説明**: リソース ID。<br>
   - `private_endpoint`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `properties.privateEndpoint`<br>
    **説明**: 接続先が属するプライベートエンドポイント。<br>
       - `id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `id`<br>
        **説明**: プライベートエンドポイントのリソース ID。<br>
   - `private_link_service_connection_state`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `properties.privateLinkServiceConnectionState`<br>
    **説明**: プライベートエンドポイント接続の接続状態。<br>
       - `actions_required`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `actionsRequired`<br>
        **説明**: プライベートリンクサービス接続に必要なアクション。<br>
       - `description`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `description`<br>
        **説明**: プライベートリンクサービス接続の説明。<br>
       - `status`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `status`<br>
        **説明**: プライベートリンクサービスの接続ステータス。<br>
   - `provisioning_state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.provisioningState`<br>
    **説明**: プライベートエンドポイント接続の状態。<br>
## `public_network_access`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.publicNetworkAccess`<br>
**説明**: このサーバーでパブリックエンドポイントアクセスを許可するかどうか。値は任意ですが、渡された場合は 'Enabled' または 'Disabled' でなければなりません。<br>
## `resource_group`
**タイプ**: `STRING`<br>
## `state`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.state`<br>
**説明**: サーバーの状態。<br>
## `subscription_id`
**タイプ**: `STRING`<br>
## `subscription_name`
**タイプ**: `STRING`<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `type`<br>
**説明**: リソースタイプ。<br>
## `version`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.version`<br>
**説明**: サーバーのバージョン。<br>
## `vulnerability_assessments`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `ServerVulnerabilityAssessment`<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `id`<br>
    **説明**: リソース ID。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: リソース名。<br>
   - `recurring_scans`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `properties.recurringScans`<br>
    **説明**: 定期スキャンの設定<br>
       - `email_subscription_admins`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `emailSubscriptionAdmins`<br>
        **説明**: スケジュールスキャン通知がサブスクリプション管理者に送信されることを指定します。<br>
       - `emails`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
        **プロバイダー名**: `emails`<br>
        **説明**: スキャン通知の送信先となるメールアドレスの配列を指定します。<br>
       - `is_enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `isEnabled`<br>
        **説明**: 定期スキャンの状態。<br>
   - `storage_account_access_key`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.storageAccountAccessKey`<br>
    **説明**: 脆弱性評価スキャン結果のストレージアカウントの識別子キーを指定します。'StorageContainerSasKey' が指定されていない場合は、storageAccountAccessKey が必要です。ストレージアカウントが Vnet またはファイアウォールの背後にない場合にのみ適用されます。<br>
   - `storage_container_path`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.storageContainerPath`<br>
    **説明**: スキャン結果を格納する Blob ストレージコンテナパス (例: https://myStorage.blob.core.windows.net/VaScans/)。<br>
   - `storage_container_sas_key`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.storageContainerSasKey`<br>
    **説明**: 'storageContainerPath' パラメーターで指定した Blob コンテナへの書き込み権限を持つ共有アクセス署名 (SAS キー)。'storageAccountAccessKey' が指定されていない場合は、StorageContainerSasKey が必要です。ストレージアカウントが Vnet またはファイアウォールの背後にない場合にのみ適用されます。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: リソースタイプ。<br>
## `workspace_feature`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.workspaceFeature`<br>
**説明**: 既存のサーバーにワークスペースが作成されており、ワークスペースからの接続を許可しているかどうか<br>