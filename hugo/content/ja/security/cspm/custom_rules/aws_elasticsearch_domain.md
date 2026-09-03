---
dependencies: []
disable_edit: true
---
# aws_elasticsearch_domain

## `access_policies`
**タイプ**: `STRING`<br>
**プロバイダー名**: `AccessPolicies`<br>
**説明**: IAM アクセスポリシーを JSON 形式の文字列にしたもの。<br>
## `account_id`
**タイプ**: `STRING`<br>
## `advanced_options`
**タイプ**: `MAP_STRING_STRING`<br>
**プロバイダー名**: `AdvancedOptions`<br>
**説明**: <code>AdvancedOptions</code> のステータスを指定します<br>
## `advanced_security_options`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `AdvancedSecurityOptions`<br>
**説明**: Elasticsearch ドメインの高度なセキュリティオプションの現在のステータス。<br>
   - `anonymous_auth_disable_date`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `AnonymousAuthDisableDate`<br>
    **説明**: Anonymous Auth が有効な場合の Anonymous Auth Disable Date を指定します。<br>
   - `anonymous_auth_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `AnonymousAuthEnabled`<br>
    **説明**: Anonymous auth が有効な場合は true。Anonymous auth は、既存のドメインで AdvancedSecurity が有効な場合にのみ有効にすることができます。<br>
   - `enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `Enabled`<br>
    **説明**: 高度なセキュリティが有効な場合は true。<br>
   - `internal_user_database_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `InternalUserDatabaseEnabled`<br>
    **説明**: 内部ユーザーデータベースが有効な場合は true。<br>
   - `saml_options`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `SAMLOptions`<br>
    **説明**: ドメインに構成された SAML アプリケーションを記述します。<br>
       - `enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `Enabled`<br>
        **説明**: SAML が有効な場合は true。<br>
       - `idp`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `Idp`<br>
        **説明**: SAML Identity Provider の情報を記述します。<br>
           - `entity_id`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `EntityId`<br>
            **説明**: SAML Identity Provider におけるアプリケーションの一意のエンティティ ID。<br>
           - `metadata_content`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `MetadataContent`<br>
            **説明**: SAML アプリケーションのメタデータ (xml 形式)。<br>
       - `roles_key`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `RolesKey`<br>
        **説明**: SAML Roles 属性のマッチングに使用されるキー。<br>
       - `session_timeout_minutes`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `SessionTimeoutMinutes`<br>
        **説明**: ユーザーセッションが非アクティブになるまでの時間 (分単位)。<br>
       - `subject_key`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `SubjectKey`<br>
        **説明**: SAML Subject 属性のマッチングに使用されるキー。<br>
## `arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ARN`<br>
**説明**: Elasticsearch ドメインの Amazon Resource Name (ARN)。詳しくは <i>AWS Identity and Access Management の使用</i>の <a href="http://docs.aws.amazon.com/IAM/latest/UserGuide/index.html?Using_Identifiers.html" target="_blank">IAMエンティティの識別子</a>を参照してください。<br>
## `auto_tune_options`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `AutoTuneOptions`<br>
**説明**: Elasticsearch ドメインの Auto-Tune オプションの現在のステータス。<br>
   - `error_message`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ErrorMessage`<br>
    **説明**: Auto-Tune を有効または無効にする際のエラーメッセージを指定します。<br>
   - `state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `State`<br>
    **説明**: Elasticsearch ドメインの <code>AutoTuneState</code> を指定します。<br>
## `change_progress_details`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `ChangeProgressDetails`<br>
**説明**: ドメイン構成変更の変更内容を指定します。<br>
   - `change_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ChangeId`<br>
    **説明**: 特定のドメイン構成の変更に関連する一意の変更識別子。<br>
   - `message`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Message`<br>
    **説明**: ドメイン構成変更に関連するオプションのメッセージが含まれます。<br>
## `cognito_options`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `CognitoOptions`<br>
**説明**: 指定したドメインの <code>CognitoOptions</code>。詳細については、<a href="http://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-cognito-auth.html" target="_blank">Amazon Cognito Authentication for Kibana</a> を参照してください。<br>
   - `enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `Enabled`<br>
    **説明**: Cognito for Kibana 認証を有効にするためのオプションを指定します。<br>
   - `identity_pool_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `IdentityPoolId`<br>
    **説明**: Kibana 認証の Cognito アイデンティティプール ID を指定します。<br>
   - `role_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `RoleArn`<br>
    **説明**: Cognito リソースにアクセスするための Elasticsearch 権限を提供するロール ARN を指定します。<br>
   - `user_pool_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `UserPoolId`<br>
    **説明**: Kibana 認証の Cognito ユーザープール ID を指定します。<br>
## `created`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `Created`<br>
**説明**: ドメインの作成ステータス。Elasticsearch ドメインの作成が完了した場合は <code>true</code>。ドメイン作成がまだ進行中の場合は <code>false</code>。<br>
## `deleted`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `Deleted`<br>
**説明**: ドメイン削除のステータス。ドメインの削除リクエストを受信したが、リソースのクリーンアップがまだ進行中である場合は <code>true</code>。ドメインが削除されていない場合は <code>false</code>。ドメインの削除が完了すると、ドメインのステータスは返されなくなります。<br>
## `domain_endpoint_options`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `DomainEndpointOptions`<br>
**説明**: Elasticsearch ドメインのエンドポイントオプションの現在のステータス。<br>
   - `custom_endpoint`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `CustomEndpoint`<br>
    **説明**: カスタムエンドポイントの完全修飾ドメインを指定します。<br>
   - `custom_endpoint_certificate_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `CustomEndpointCertificateArn`<br>
    **説明**: カスタムエンドポイントの ACM 証明書 ARN を指定します。<br>
   - `custom_endpoint_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `CustomEndpointEnabled`<br>
    **説明**: Elasticsearch ドメインでカスタムエンドポイントを有効化するかどうかを指定します。<br>
   - `enforce_https`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `EnforceHTTPS`<br>
    **説明**: Elasticsearch ドメインで HTTPS エンドポイントのみを有効化するかどうかを指定します。<br>
   - `tls_security_policy`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `TLSSecurityPolicy`<br>
    **説明**: Elasticsearch ドメインの HTTPS エンドポイントに適用する必要のある TLS セキュリティポリシーを指定します。 <br/> 以下の値のいずれかを指定することができます。 <ul> <li><b>Policy-Min-TLS-1-0-2019-07: </b> TLSv1.0 以降に対応した TLS セキュリティポリシー。</li> <li><b>Policy-Min-TLS-1-2-2019-07: </b> TLSv1.2 のみをサポートする TLS セキュリティポリシー</li> </ul>
## `domain_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `DomainId`<br>
**説明**: 指定した Elasticsearch ドメインの一意な識別子。<br>
## `domain_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `DomainName`<br>
**説明**: Elasticsearch のドメイン名。ドメイン名は、AWS リージョン内のアカウントが所有するドメイン間で一意です。ドメイン名は文字または数字で始まり、a-z (小文字)、0-9、および - (ハイフン) の文字を含むことができます。<br>
## `ebs_options`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `EBSOptions`<br>
**説明**: 指定されたドメインの <code>EBSOptions</code>。詳細については、<a href="http://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-createupdatedomains.html#es-createdomain-configure-ebs" target="_blank">EBS ベースのストレージの構成</a>を参照してください。<br>
   - `ebs_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `EBSEnabled`<br>
    **説明**: EBS ベースのストレージが有効かどうかを指定します。<br>
   - `iops`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `Iops`<br>
    **説明**: Provisioned IOPS And GP3 EBS ボリューム (SSD) の IOPS を指定します。<br>
   - `throughput`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `Throughput`<br>
    **説明**: GP3 EBS ボリューム (SSD) のスループットを指定します。<br>
   - `volume_size`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `VolumeSize`<br>
    **説明**: EBS ボリュームのサイズを指定するための整数値。<br>
   - `volume_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `VolumeType`<br>
    **説明**: EBS ベースのストレージのボリュームタイプを指定します。<br>
## `elasticsearch_cluster_config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `ElasticsearchClusterConfig`<br>
**説明**: ドメインクラスター内のインスタンスの種類と数。<br>
   - `cold_storage_options`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `ColdStorageOptions`<br>
    **説明**: Elasticsearch ドメインの <code>ColdStorageOptions</code> 設定を指定します。<br>
       - `enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `Enabled`<br>
        **説明**: コールドストレージのオプションを有効にします。使用可能な値: true または false<br>
   - `dedicated_master_count`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `DedicatedMasterCount`<br>
    **説明**: クラスターのアクティブおよびスタンバイの専用マスターノードの総数。<br>
   - `dedicated_master_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `DedicatedMasterEnabled`<br>
    **説明**: 専用マスターノードが有効かどうかを示すブール値。詳細は、<a href="http://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-managedomains.html#es-managedomains-dedicatedmasternodes" target="_blank">専用マスターノードについて</a>を参照してください。<br>
   - `dedicated_master_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `DedicatedMasterType`<br>
    **説明**: 専用マスターノードのインスタンスタイプ。<br>
   - `instance_count`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `InstanceCount`<br>
    **説明**: 指定されたドメインクラスターのインスタンス数。<br>
   - `instance_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `InstanceType`<br>
    **説明**: Elasticsearch クラスターのインスタンスタイプ。UltraWarm のインスタンスタイプはデータインスタンスではサポートされていません。<br>
   - `warm_count`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `WarmCount`<br>
    **説明**: クラスター内のウォームノードの数。<br>
   - `warm_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `WarmEnabled`<br>
    **説明**: ウォームストレージを有効にする場合は true を指定します。<br>
   - `warm_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `WarmType`<br>
    **説明**: Elasticsearch クラスターのウォームノードのインスタンスタイプ。<br>
   - `zone_awareness_config`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `ZoneAwarenessConfig`<br>
    **説明**: ゾーンアウェアネスが有効な場合に、ドメインのゾーンアウェアネス構成を指定します。<br>
       - `availability_zone_count`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `AvailabilityZoneCount`<br>
        **説明**: ゾーンアウェアネスが有効な場合に、ドメインのアベイラビリティゾーンの数を示す整数値。VPC エンドポイントが有効な場合は、サブネットの数と同じである必要があります。<br>
   - `zone_awareness_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `ZoneAwarenessEnabled`<br>
    **説明**: ゾーンアウェアネスが有効かどうかを示すブール値。詳しくは、<a href="http://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-managedomains.html#es-managedomains-zoneawareness" target="_blank">ゾーンアウェアネスについて</a>を参照してください。<br>
## `elasticsearch_version`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ElasticsearchVersion`<br>
## `encryption_at_rest_options`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `EncryptionAtRestOptions`<br>
**説明**: <code>EncryptionAtRestOptions</code> のステータスを指定します。<br>
   - `enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `Enabled`<br>
    **説明**: Encryption At Rest を有効にするためのオプションを指定します。<br>
   - `kms_key_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `KmsKeyId`<br>
    **説明**: Encryption At Rest オプションの KMS キー ID を指定します。<br>
## `endpoint`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Endpoint`<br>
**説明**: インデックスおよび検索リクエストを送信するために使用する Elasticsearch ドメインのエンドポイント。<br>
## `endpoints`
**タイプ**: `MAP_STRING_STRING`<br>
**プロバイダー名**: `Endpoints`<br>
**説明**: インデックスや検索リクエストの送信に使用される Elasticsearch ドメインのエンドポイントを含むマップ。サンプル <code>key, value</code>: <code>'vpc','vpc-endpoint-h2dsd34efgyghrtguk5gt6j2foh4.us-east-1.es.amazonaws.com'</code><br>
## `node_to_node_encryption_options`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `NodeToNodeEncryptionOptions`<br>
**説明**: <code>NodeToNodeEncryptionOptions</code> のステータスを指定します。<br>
   - `enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `Enabled`<br>
    **説明**: ノード間暗号化を有効にするには、true を指定します。<br>
## `processing`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `Processing`<br>
**説明**: Elasticsearch ドメイン構成のステータス。Amazon Elasticsearch Service が構成変更を処理している場合は <code>true</code>。構成がアクティビティ中であれば <code>false</code>。<br>
## `service_software_options`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `ServiceSoftwareOptions`<br>
**説明**: Elasticsearch ドメインのサービスソフトウェアの現在のステータス。<br>
   - `automated_update_date`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `AutomatedUpdateDate`<br>
    **説明**: サービスソフトウェアのアップデートを手動でリクエストできるまでのタイムスタンプ (エポックタイム単位)。この日付以降は、自動的にサービスソフトウェアが更新されます。<br>
   - `cancellable`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `Cancellable`<br>
    **説明**: サービスソフトウェアのバージョンアップを取り消すことができる場合は <code>true</code>。サービスソフトウェアのバージョンアップを取り消すことができない場合は <code>false</code>。<br>
   - `current_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `CurrentVersion`<br>
    **説明**: ドメイン上に存在する現在のサービスソフトウェアのバージョン。<br>
   - `description`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Description`<br>
    **説明**: <code>UpdateStatus</code> の説明。<br>
   - `new_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `NewVersion`<br>
    **説明**: 新しいサービスソフトウェアのバージョンがある場合、そのバージョン。<br>
   - `optional_deployment`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `OptionalDeployment`<br>
    **説明**: サービスソフトウェアが自動更新されない場合は <code>true</code>。<code>AutomatedUpdateDate</code> 後にサービスソフトウェアが自動更新される場合は <code>false</code>。<br>
   - `update_available`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `UpdateAvailable`<br>
    **説明**: サービスソフトウェアのバージョンアップを更新できる場合は <code>true</code>。サービスソフトウェアのバージョンアップを更新できない場合は <code>false</code>。<br>
   - `update_status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `UpdateStatus`<br>
    **説明**: サービスソフトウェアの更新のステータス。このフィールドは、次の値を取ることができます。 <code>ELIGIBLE</code>、<code>PENDING_UPDATE</code>、<code>IN_PROGRESS</code>、<code>COMPLETED</code>、<code>NOT_ELIGIBLE</code><br>
## `snapshot_options`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `SnapshotOptions`<br>
**説明**: <code>SnapshotOptions</code> のステータスを指定します。<br>
   - `automated_snapshot_start_hour`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `AutomatedSnapshotStartHour`<br>
    **説明**: 指定した Elasticsearch ドメインの自動スナップショットを毎日取得する時刻を UTC フォーマットで指定します。デフォルト値は <code>0</code> 時間です。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `upgrade_processing`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `UpgradeProcessing`<br>
**説明**: Elasticsearch ドメインのバージョンアップのステータス。Amazon Elasticsearch Service がバージョンアップ中であれば <code>true</code>。構成がアクティブな場合は <code>false</code>。<br>
## `vpc_options`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `VPCOptions`<br>
**説明**: 指定したドメインの <code>VPCOptions</code>。詳細については、<a href="http://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-vpc.html" target="_blank">Amazon Elasticsearch サービスドメインの VPC エンドポイント</a>を参照してください。<br>
   - `availability_zones`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `AvailabilityZones`<br>
    **説明**: Elasticsearch ドメインのアベイラビリティゾーン。VPCOptions でドメインが作成された場合のみ存在します。<br>
   - `security_group_ids`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `SecurityGroupIds`<br>
    **説明**: VPC エンドポイントに設定するセキュリティグループを指定します。<br>
   - `subnet_ids`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `SubnetIds`<br>
    **説明**: VPC エンドポイントに設定するサブネットを指定します。<br>
   - `vpc_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `VPCId`<br>
    **説明**: Elasticsearch ドメインの VPC ID。VPCOptions でドメインが作成された場合のみ存在します。<br>