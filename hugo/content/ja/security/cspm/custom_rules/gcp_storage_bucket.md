---
dependencies: []
disable_edit: true
---
# gcp_storage_bucket

## `acl`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `acl`<br>
**説明**: バケットへのアクセス制御。<br>
   - `bucket`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `bucket`<br>
    **説明**: バケットの名前。<br>
   - `domain`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `domain`<br>
    **説明**: もしあれば、そのエンティティに関連するドメイン。<br>
   - `email`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `email`<br>
    **説明**: もしあれば、そのエンティティに関連するメールアドレス。<br>
   - `entity`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `entity`<br>
    **説明**: 権限を持つエンティティ。以下のいずれかの形式です: - user-userId - user-email - group-groupId - group-email - domain-domain - project-team-projectId - allUsers - allAuthenticatedUsers 例: - ユーザー liz@example.com は、user-liz@example.com となります。- グループ example@googlegroups.com は group-example@googlegroups.com となります。- Google Apps for Business ドメイン example.com の全メンバーを参照するには、エンティティは domain-example.com となります。<br>
   - `entity_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `entityId`<br>
    **説明**: もしあれば、そのエンティティの ID。<br>
   - `etag`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `etag`<br>
    **説明**: アクセス制御エントリーの HTTP 1.1 エンティティタグ。<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `id`<br>
    **説明**: アクセス制御エントリーの ID。<br>
   - `kind`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `kind`<br>
    **説明**: このアイテムの種類。バケットアクセス制御エントリーの場合、これは常に storage#bucketAccessControl です。<br>
   - `project_team`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `projectTeam`<br>
    **説明**: もしあれば、そのエンティティに関連するプロジェクトチーム。<br>
       - `project_number`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `projectNumber`<br>
        **説明**: プロジェクト番号。<br>
       - `team`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `team`<br>
        **説明**: チーム。<br>
   - `role`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `role`<br>
    **説明**: エンティティのアクセス権限。<br>
   - `self_link`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `selfLink`<br>
    **説明**: このアクセス制御エントリーへのリンク。<br>
## `ancestors`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `autoclass`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `autoclass`<br>
**説明**: バケットの Autoclass の構成。<br>
   - `enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `enabled`<br>
    **説明**: このバケットで Autoclass が有効かどうか<br>
   - `toggle_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `toggleTime`<br>
    **説明**: "enabled" が最後にトグルされた瞬間を表す RFC 3339 形式の日付と時刻。<br>
## `billing`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `billing`<br>
**説明**: バケットの請求構成。<br>
   - `requester_pays`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `requesterPays`<br>
    **説明**: true に設定すると、このバケットでリクエストペイが有効になります。<br>
## `cors`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `cors`<br>
**説明**: バケットの CORS (Cross-Origin Resource Sharing) 構成。<br>
   - `max_age_seconds`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `maxAgeSeconds`<br>
    **説明**: プリフライトレスポンスで使用される Access-Control-Max-Age ヘッダーに返す値 (秒単位)。<br>
   - `method`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `method`<br>
    **説明**: CORS レスポンスヘッダーを含める HTTP メソッドのリスト (GET、OPTIONS、POST など) 注: メソッドのリストには "*" が使用でき、"任意のメソッド" を意味します。<br>
   - `origin`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `origin`<br>
    **説明**: CORS レスポンスヘッダーを受け取る資格のある Origin のリスト。注: "*" は Origin のリストで許可されており、"任意の Origin" を意味します。<br>
   - `response_header`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `responseHeader`<br>
    **説明**: ユーザー Agent がドメイン間で共有する許可を与えるための、単純なレスポンスヘッダー以外の HTTP ヘッダーのリスト。<br>
## `custom_placement_config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `customPlacementConfig`<br>
**説明**: Custom Dual Regions のバケットのカスタム配置構成。<br>
   - `data_locations`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `dataLocations`<br>
    **説明**: データが置かれている地域のリスト。<br>
## `default_event_based_hold`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `defaultEventBasedHold`<br>
**説明**: このバケット内に新しく作成されたオブジェクトに対するイベントベースの保持のデフォルト値。イベントベースの保持は、あるイベントが発生し保持が解除されるまで、オブジェクトを無期限に保持する方法です。解除された後、そのようなオブジェクトは、バケットレベルの保持に従います。このフラグの使用例としては、銀行がローンの完済後、少なくとも 3 年間はローンドキュメントを保持する場合などがあります。ここでは、バケットレベルの保存期間が 3 年で、イベントがローンの完済であるとします。この例では、これらのオブジェクトは、イベントが発生する (オブジェクトに対するイベントベースの保持が解除される) までは何年でもそのまま保持され、その後さらに 3 年間保持されます。つまり、オブジェクトの保持期間は、イベントベースの保持が true から false に移行した瞬間から始まります。イベントベースの保持が解除されるまで、イベントベースの保持の下にあるオブジェクトは、削除、上書き、アーカイブすることができません。<br>
## `default_object_acl`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `defaultObjectAcl`<br>
**説明**: ACL が提供されない場合、新しいオブジェクトに適用されるデフォルトのアクセス制御。<br>
   - `bucket`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `bucket`<br>
    **説明**: バケットの名前。<br>
   - `domain`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `domain`<br>
    **説明**: もしあれば、そのエンティティに関連するドメイン。<br>
   - `email`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `email`<br>
    **説明**: もしあれば、そのエンティティに関連するメールアドレス。<br>
   - `entity`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `entity`<br>
    **説明**: 権限を持つエンティティ。以下のいずれかの形式です: - user-userId - user-email - group-groupId - group-email - domain-domain - project-team-projectId - allUsers - allAuthenticatedUsers 例: - ユーザー liz@example.com は、user-liz@example.com となります。- グループ example@googlegroups.com は group-example@googlegroups.com となります。- Google Apps for Business ドメイン example.com の全メンバーを参照するには、エンティティは domain-example.com となります。<br>
   - `entity_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `entityId`<br>
    **説明**: もしあれば、そのエンティティの ID。<br>
   - `etag`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `etag`<br>
    **説明**: アクセス制御エントリーの HTTP 1.1 エンティティタグ。<br>
   - `generation`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `generation`<br>
    **説明**: オブジェクトに適用される場合、そのオブジェクトのコンテンツ生成。<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `id`<br>
    **説明**: アクセス制御エントリーの ID。<br>
   - `kind`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `kind`<br>
    **説明**: このアイテムの種類。オブジェクトアクセス制御エントリーの場合、これは常に storage#objectAccessControl です。<br>
   - `object`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `object`<br>
    **説明**: オブジェクトに適用される場合、そのオブジェクトの名前。<br>
   - `project_team`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `projectTeam`<br>
    **説明**: もしあれば、そのエンティティに関連するプロジェクトチーム。<br>
       - `project_number`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `projectNumber`<br>
        **説明**: プロジェクト番号。<br>
       - `team`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `team`<br>
        **説明**: チーム。<br>
   - `role`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `role`<br>
    **説明**: エンティティのアクセス権限。<br>
   - `self_link`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `selfLink`<br>
    **説明**: このアクセス制御エントリーへのリンク。<br>
## `encryption`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `encryption`<br>
**説明**: バケットの暗号化構成。<br>
   - `default_kms_key_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `defaultKmsKeyName`<br>
    **説明**: 暗号化方式を指定しない場合、このバケットに挿入されるオブジェクトを暗号化するために使用される Cloud KMS キー。<br>
## `etag`
**タイプ**: `STRING`<br>
**Provider name**: `etag`<br>
**説明**: バケットの HTTP 1.1 エンティティタグ。<br>
## `iam_configuration`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `iamConfiguration`<br>
**説明**: バケットの IAM 構成。<br>
   - `bucket_policy_only`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `bucketPolicyOnly`<br>
    **説明**: バケットのバケットレベルの統一的なアクセス構成。この機能は以前は Bucket Policy Only として知られていました。後方互換性のために、このフィールドには uniformBucketLevelAccess フィールドと同じ情報が入力されます。この機能を有効にしたり無効にしたりするには、 uniformBucketLevelAccess フィールドを使用することをお勧めします。<br>
       - `enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `enabled`<br>
        **説明**: 設定すると、バケットレベル以上の IAM ポリシーによってのみアクセスが制御されます。<br>
       - `locked_time`<br>
        **タイプ**: `TIMESTAMP`<br>
        **プロバイダー名**: `lockedTime`<br>
        **説明**: RFC 3339 形式の iamConfiguration.bucketPolicyOnly.enabled を true から false に変更するための期限。iamConfiguration.bucketPolicyOnly.enabled はロックされた時間まで true から false に変更可能で、それ以降はこのフィールドは不変です。<br>
   - `public_access_prevention`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `publicAccessPrevention`<br>
    **説明**: バケットの Public Access Prevention の構成。現在、'inherited' と 'enforced' がサポートされています。<br>
   - `uniform_bucket_level_access`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `uniformBucketLevelAccess`<br>
    **説明**: バケットの統一的なバケットレベルのアクセス構成。<br>
       - `enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `enabled`<br>
        **説明**: 設定すると、バケットレベル以上の IAM ポリシーによってのみアクセスが制御されます。<br>
       - `locked_time`<br>
        **タイプ**: `TIMESTAMP`<br>
        **プロバイダー名**: `lockedTime`<br>
        **説明**: RFC 3339 形式の iamConfiguration.uniformBucketLevelAccess.enabled を true から false に変更するための期限。iamConfiguration.uniformBucketLevelAccess.enabled はロックされた時間まで true から false に変更可能で、それ以降はこのフィールドは不変です。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: バケットの ID。バケットの場合、id と name プロパティは同じものです。<br>
## `kind`
**タイプ**: `STRING`<br>
**Provider name**: `kind`<br>
**説明**: このアイテムの種類。バケットの場合、これは常に storage#bucket です。<br>
## `labels`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `lifecycle`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `lifecycle`<br>
**説明**: バケットのライフサイクル構成。詳しくはライフサイクル管理をご覧ください。<br>
   - `rule`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `rule`<br>
    **説明**: ライフサイクル管理ルール。取るべきアクションと、そのアクションを実行するための条件から構成されます。<br>
       - `action`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `action`<br>
        **説明**: 取るべきアクション。<br>
           - `storage_class`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `storageClass`<br>
            **説明**: 対象となるストレージクラス。アクションのタイプが SetStorageClass である場合に必要です。<br>
           - `type`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `type`<br>
            **説明**: アクションの種類。現在のところ、Delete、SetStorageClass、AbortIncompleteMultipartUpload のみがサポートされています。<br>
       - `condition`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `condition`<br>
        **説明**: アクションを起こす条件。<br>
           - `age`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `age`<br>
            **説明**: オブジェクトの年齢 (日数)。この条件は、オブジェクトが指定された年齢に達したときに満たされます。<br>
           - `created_before`<br>
            **タイプ**: `TIMESTAMP`<br>
            **プロバイダー名**: `createdBefore`<br>
            **説明**: RFC 3339 形式の日付部分のみの日付 (たとえば "2013-01-15" など)。この条件は、オブジェクトが UTC で指定された日付の午前 0 時以前に作成されたときに満たされます。<br>
           - `custom_time_before`<br>
            **タイプ**: `TIMESTAMP`<br>
            **プロバイダー名**: `customTimeBefore`<br>
            **説明**: RFC 3339 形式の日付部分のみの日付 (たとえば "2013-01-15" など)。この条件は、オブジェクトのカスタムタイムが UTC でこの日付より前である場合に満たされます。<br>
           - `days_since_custom_time`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `daysSinceCustomTime`<br>
            **説明**: オブジェクトに設定されたユーザー指定のタイムスタンプからの経過日数。経過日数がこの数値以上であれば、この条件は満たされます。オブジェクトにカスタムタイムスタンプが指定されていない場合、この条件は適用されません。<br>
           - `days_since_noncurrent_time`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `daysSinceNoncurrentTime`<br>
            **説明**: オブジェクトの非現在のタイムスタンプからの経過日数。この条件は、経過日数がこの数以上である場合に満たされます。この条件は、バージョン管理されたオブジェクトにのみ関連します。このフィールドの値は、非負の整数でなければなりません。ゼロの場合、オブジェクトのバージョンは、非現行になると同時にライフサイクルアクションの対象となります。<br>
           - `is_live`<br>
            **タイプ**: `BOOLEAN`<br>
            **プロバイダー名**: `isLive`<br>
            **説明**: バージョン管理されたオブジェクトにのみ関連します。値が true の場合、この条件はライブオブジェクトにマッチし、値が false の場合、アーカイブされたオブジェクトにマッチします。<br>
           - `matches_pattern`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `matchesPattern`<br>
            **説明**: RE2 構文を満たす正規表現。この条件は、オブジェクトの名前が RE2 パターンに一致するときに満たされます。注: この機能は現在「早期アクセス」の立ち上げ段階にあり、ホワイトリストに登録されたユーザーセットのみが利用可能です。つまり、この機能は後方互換性のない方法で変更される可能性があり、リリースが保証されているわけではありません。<br>
           - `matches_prefix`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
            **プロバイダー名**: `matchesPrefix`<br>
            **説明**: オブジェクト名のプレフィックスのリスト。この条件は、プレフィックスのうちの少なくともひとつがオブジェクト名の先頭に正確に一致したときに満たされます。<br>
           - `matches_storage_class`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
            **プロバイダー名**: `matchesStorageClass`<br>
            **説明**: この条件で指定されたストレージクラスのいずれかを持つオブジェクトがマッチします。MULTI_REGIONAL、REGIONAL、NEARLINE、COLDLINE、ARCHIVE、STANDARD、DURABLE_REDUCED_AVAILABILITY などの値があります。<br>
           - `matches_suffix`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
            **プロバイダー名**: `matchesSuffix`<br>
            **説明**: オブジェクト名のサフィックスのリスト。この条件は、サフィックスのうちの少なくともひとつがオブジェクト名の末尾に正確に一致したときに満たされます。<br>
           - `noncurrent_time_before`<br>
            **タイプ**: `TIMESTAMP`<br>
            **プロバイダー名**: `noncurrentTimeBefore`<br>
            **説明**: RFC 3339 形式の日付部分のみの日付 (たとえば "2013-01-15" など)。この条件は、オブジェクトの非現在時刻が UTC でこの日付より前である場合に満たされます。この条件は、バージョン管理されたオブジェクトにのみ関連します。<br>
           - `num_newer_versions`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `numNewerVersions`<br>
            **説明**: バージョン管理されたオブジェクトにのみ関連します。この値が N である場合、このオブジェクトのこのバージョンよりも新しいバージョン (ライブバージョンを含む) が少なくとも N 個存在するときに、この条件が満たされます。<br>
## `location`
**タイプ**: `STRING`<br>
**プロバイダー名**: `location`<br>
**説明**: バケットの場所。バケットに含まれるオブジェクトのデータは、この地域内の物理ストレージに存在します。デフォルトは US です。正式な一覧は開発者向けガイドをご覧ください。<br>
## `location_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `locationType`<br>
**説明**: バケットの場所の種類。<br>
## `logging`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `logging`<br>
**説明**: バケットのロギング構成。現在のバケットのログの宛先バケットとオプションの名前プレフィックスを定義します。<br>
   - `log_bucket`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `logBucket`<br>
    **説明**: 現在のバケットのログが置かれる宛先バケット。<br>
   - `log_object_prefix`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `logObjectPrefix`<br>
    **説明**: ログオブジェクト名のプレフィックス。<br>
## `metageneration`
**タイプ**: `INT64`<br>
**プロバイダー名**: `metageneration`<br>
**説明**: このバケットのメタデータ生成。<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: バケットの名前。<br>
## `organization_id`
**タイプ**: `STRING`<br>
## `owner`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `owner`<br>
**説明**: バケットの所有者。これは常にプロジェクトチームのオーナーグループとなります。<br>
   - `entity`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `entity`<br>
    **説明**: project-owner-projectId という形式のエンティティ。<br>
   - `entity_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `entityId`<br>
    **説明**: そのエンティティの ID。<br>
## `parent`
**タイプ**: `STRING`<br>
## `project_id`
**タイプ**: `STRING`<br>
## `project_number`
**タイプ**: `STRING`<br>
## `resource_name`
**タイプ**: `STRING`<br>
## `retention_policy`
**タイプ**: `STRUCT`<br>
**Provider name**: `retentionPolicy`<br>
**説明**: バケットの保持ポリシー。保持ポリシーは、バケットに含まれるすべてのオブジェクトに対して、その作成時刻を基準とした最小限の保持期間を強制的に設定します。この保持期限を過ぎたオブジェクトを上書きしたり削除しようとすると、PERMISSION_DENIED エラーが発生します。ロックされていない保持ポリシーは、storage.buckets.update operation によってバケットから変更したり削除したりすることができます。ロックされた保持ポリシーは、バケットのライフタイム中、削除したり期間を短縮したりすることができません。ロックされた保持ポリシーを削除または期間を短縮しようとすると、PERMISSION_DENIED エラーが発生します。<br>
   - `effective_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `effectiveTime`<br>
    **説明**: ポリシーが適用され、有効になった時刻を示す、サーバーで決定された値。この値は RFC3339 形式です。<br>
   - `is_locked`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `isLocked`<br>
    **説明**: 一度ロックされたオブジェクト保持ポリシーは、変更することができません。<br>
   - `retention_period`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `retentionPeriod`<br>
    **説明**: オブジェクトを保持する必要がある期間 (秒単位)。保持期間は 0 より大きく、100 年未満でなければなりません。1 日未満の保持期間の実施は保証されないことに注意してください。このような期間は、テスト目的でのみ使用されるべきです。<br>
## `rpo`
**タイプ**: `STRING`<br>
**プロバイダー名**: `rpo`<br>
**説明**: このバケットの RPO (Recovery Point Objective) を指定します。ASYNC_TURBO に設定すると、バケットで Turbo Replication が有効になります。<br>
## `satisfies_pzs`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `satisfiesPZS`<br>
**説明**: 将来の使用に備えた予約。<br>
## `self_link`
**タイプ**: `STRING`<br>
**Provider name**: `selfLink`<br>
**説明**: このバケットの URI。<br>
## `storage_class`
**タイプ**: `STRING`<br>
**プロバイダー名**: `storageClass`<br>
**説明**: バケットのデフォルトのストレージクラスで、新しく作成されるオブジェクトに storageClass が指定されない場合に使用されます。これはバケット内のオブジェクトがどのように保存されるかを定義し、SLA や保存にかかるコストを決定します。値としては、MULTI_REGIONAL、REGIONAL、STANDARD、NEARLINE、COLDLINE、ARCHIVE、DURABLE_REDUCED_AVAILABILITY があります。バケットの作成時にこの値を指定しなかった場合、デフォルトで STANDARD が使用されます。詳しくは、ストレージクラスを参照してください。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `time_created`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `timeCreated`<br>
**説明**: RFC3339 形式のバケットの作成時刻。<br>
## `updated`
**タイプ**: `TIMESTAMP`<br>
**Provider name**: `updated`<br>
**説明**: RFC3339 形式のバケットの変更時刻。<br>
## `versioning`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `versioning`<br>
**説明**: バケットのバージョン管理構成。<br>
   - `enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `enabled`<br>
    **説明**: true に設定すると、このバケットでバージョン管理が完全に有効になります。<br>
## `website`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `website`<br>
**説明**: バケットの Web サイト構成。バケットのコンテンツに Web サイトとしてアクセスする際のサービスの振る舞いを制御します。詳しくは「静的 Web サイトの例」をご覧ください。<br>
   - `main_page_suffix`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `mainPageSuffix`<br>
    **説明**: リクエストされたオブジェクトのパスがない場合、サービスはパスの末尾に '/' があることを確認し、このサフィックスを付加し、結果のオブジェクトの取得を試みます。これにより、ディレクトリページを表す index.html オブジェクトを作成することができます。<br>
   - `not_found_page`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `notFoundPage`<br>
    **説明**: リクエストされたオブジェクトのパスが見つからない場合、また mainPageSuffix オブジェクトが見つからない場合、サービスはこのバケットから指定されたオブジェクトを 404 Not Found 結果のコンテンツとして返します。<br>