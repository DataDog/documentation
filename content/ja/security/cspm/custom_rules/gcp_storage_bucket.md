---
aliases:
- /ja/security_platform/cspm/custom_rules/gcp_storage_bucket
kind: documentation
title: gcp_storage_bucket
---

## `acl`
  **タイプ**: `UNORDERED_LIST_STRUCT`<br>
  **説明**: バケットへのアクセス制御。<br>
  **GCP 名**: `acl`
   - `bucket`<br>
    **タイプ**: `STRING`<br>
        **説明**: バケットの名前。<br>
        **GCP 名**: `bucket`<br>
   - `domain`<br>
    **タイプ**: `STRING`<br>
        **説明**: もしあれば、そのエンティティに関連するドメイン。<br>
        **GCP 名**: `domain`<br>
   - `email`<br>
    **タイプ**: `STRING`<br>
        **説明**: もしあれば、そのエンティティに関連するメールアドレス。<br>
        **GCP 名**: `email`<br>
   - `entity`<br>
    **タイプ**: `STRING`<br>
    **説明**: 権限を持つエンティティで、以下のいずれかの形式をとります。 <br>
    - `user-<UserId>` <br>
    - `user-<email>` <br>
    - `group-<groupId>` <br>
    - `group-<email>` <br>
    - `domain-<domainName>`<br>
    - `project-<team-projectId>`<br> 
    - `allUsers` - allAuthenticatedUsers <br>
    例: <br>
    - ユーザー `liz@example.com` は `user-liz@example.com` となります。 <br>
    - グループ `example@googlegroups.com` は `group-example@googlegroups.com` となります。 <br>
    - Google Apps for Business ドメイン `example.com` のすべてのメンバーを参照するには、エンティティは `domain-example.com` となります。<br>
        **GCP 名**: `entity`<br>
   - `entity_id`<br>
    **タイプ**: `STRING`<br>
        **説明**: もしあれば、そのエンティティの ID。<br>
        **GCP 名**: `entityId`<br>
   - `etag`<br>
    **タイプ**: `STRING`<br>
        **説明**: アクセス制御エントリーの HTTP 1.1 エンティティタグ。<br>
        **GCP 名**: `etag`<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
        **説明**: アクセス制御エントリーの ID。<br>
        **GCP 名**: `id`<br>
   - `kind`<br>
    **タイプ**: `STRING`<br>
        **説明**: このアイテムの種類。バケットアクセス制御エントリーの場合、これは常に `storage#bucketAccessControl` です。<br>
        **GCP name**: `kind`<br>
   - `project_team`<br>
      **タイプ**: `STRUCT`<br>
      **説明**: もしあれば、そのエンティティに関連するプロジェクトチーム。<br>
      **GCP 名**: `projectTeam`
       - `project_number`<br>
        **タイプ**: `STRING`<br>
            **説明**: プロジェクト番号。<br>
            **GCP 名**: `projectNumber`<br>
       - `team`<br>
        **タイプ**: `STRING`<br>
            **説明**: チーム。<br>
            **GCP 名**: `team`<br>
   - `role`<br>
    **タイプ**: `STRING`<br>
        **説明**: エンティティのアクセス権限。<br>
        **GCP 名**: `role`<br>
   - `self_link`<br>
    **タイプ**: `STRING`<br>
        **説明**: このアクセス制御エントリーへのリンク。<br>
        **GCP 名**: `selfLink`<br>
## `ancestors`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `autoclass`
  **Type**: `STRUCT`<br>
  **説明**: バケットの Autoclass の構成。<br>
  **GCP 名**: `autoclass`
   - `enabled`<br>
    **タイプ**: `BOOLEAN`<br>
        **説明**: このバケットで Autoclass が有効かどうか。<br>
        **GCP 名**: `enabled`<br>
   - `toggle_time`<br>
    **Type**: `TIMESTAMP`<br>
        **説明**: "enabled" が最後にトグルされた瞬間を表す RFC 3339 形式の日付と時刻。<br>
        **GCP 名**: `toggleTime`<br>
## `billing`
  **Type**: `STRUCT`<br>
  **説明**: バケットの請求構成。<br>
  **GCP 名**: `billing`
   - `requester_pays`<br>
    **タイプ**: `BOOLEAN`<br>
        **説明**: true に設定すると、このバケットでリクエストペイが有効になります。<br>
        **GCP 名**: `requesterPays`<br>
## `cors`
  **Type**: `UNORDERED_LIST_STRUCT`<br>
  **説明**: バケットの CORS (Cross-Origin Resource Sharing) 構成。<br>
  **GCP 名**: `cors`
   - `max_age_seconds`<br>
    **Type**: `INT32`<br>
        **説明**: プリフライトレスポンスで使用される `Access-Control-Max-Age` ヘッダーに返す値 (秒単位)。<br>
        **GCP 名**: `maxAgeSeconds`<br>
   - `method`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
        **説明**: CORS レスポンスヘッダーを含める HTTP メソッドのリスト (`GET`、`OPTIONS`、`POST`) 注: メソッドのリストには `*` が使用でき、"任意のメソッド" を意味します。<br>
        **GCP 名**: `method`<br>
   - `origin`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
        **説明**: CORS レスポンスヘッダーを受け取る資格のある Origin のリスト。注: `*` は Origin のリストで許可されており、"任意の Origin" を意味します。<br>
        **GCP 名**: `origin`<br>
   - `response_header`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
        **説明**: ユーザー Agent がドメイン間で共有する許可を与えるための、単純なレスポンスヘッダー以外の HTTP ヘッダーのリスト。<br>
        **GCP 名**: `responseHeader`<br>
## `custom_placement_config`
  **Type**: `STRUCT`<br>
  **説明**: Custom Dual Regions のバケットのカスタム配置構成。<br>
  **GCP 名**: `customPlacementConfig`
   - `data_locations`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
        **説明**: データが置かれている地域のリスト。<br>
        **GCP 名**: `dataLocations`<br>
## `default_event_based_hold`
**タイプ**: `BOOLEAN`<br>
    **説明**: このバケット内に新しく作成されたオブジェクトに対するイベントベースの保持のデフォルト値。イベントベースの保持は、あるイベントが発生し保持が解除されるまで、オブジェクトを無期限に保持する方法です。解除された後、そのようなオブジェクトは、バケットレベルの保持に従います。このフラグの使用例としては、銀行がローンの完済後、少なくとも 3 年間はローンドキュメントを保持する場合などがあります。ここでは、バケットレベルの保存期間が 3 年で、イベントがローンの完済であるとします。この例では、これらのオブジェクトは、イベントが発生する (オブジェクトに対するイベントベースの保持が解除される) までは何年でもそのまま保持され、その後さらに 3 年間保持されます。つまり、オブジェクトの保持期間は、イベントベースの保持が `true` から `false` に移行した瞬間から始まります。イベントベースの保持が解除されるまで、イベントベースの保持の下にあるオブジェクトは、削除、上書き、アーカイブすることができません。<br>
    **GCP 名**: `defaultEventBasedHold`<br>
## `default_object_acl`
  **Type**: `UNORDERED_LIST_STRUCT`<br>
  **説明**: ACL が提供されない場合、新しいオブジェクトに適用されるデフォルトのアクセス制御。<br>
  **GCP 名**: `defaultObjectAcl`
   - `bucket`<br>
    **タイプ**: `STRING`<br>
        **説明**: バケットの名前。<br>
        **GCP 名**: `bucket`<br>
   - `domain`<br>
    **タイプ**: `STRING`<br>
        **説明**: もしあれば、そのエンティティに関連するドメイン。<br>
        **GCP 名**: `domain`<br>
   - `email`<br>
    **タイプ**: `STRING`<br>
        **説明**: もしあれば、そのエンティティに関連するメールアドレス。<br>
        **GCP 名**: `email`<br>
   - `entity`<br>
    **タイプ**: `STRING`<br>
    **説明**: 権限を持つエンティティで、以下のいずれかの形式をとります。 <br>
    - `user-<UserId>` <br>
    - `user-<email>` <br>
    - `group-<groupId>` <br>
    - `group-<email>` <br>
    - `domain-<domainName>`<br>
    - `project-<team-projectId>` <br>
    - `allUsers` - allAuthenticatedUsers <br>
    例: <br>
    - ユーザー `liz@example.com` は `user-liz@example.com` となります。 <br>
    - グループ `example@googlegroups.com` は `group-example@googlegroups.com` となります。 <br>
    - Google Apps for Business ドメイン `example.com` のすべてのメンバーを参照するには、エンティティは `domain-example.com` となります。<br>
        **GCP 名**: `entity`<br>
   - `entity_id`<br>
    **タイプ**: `STRING`<br>
        **説明**: もしあれば、そのエンティティの ID。<br>
        **GCP 名**: `entityId`<br>
   - `etag`<br>
    **タイプ**: `STRING`<br>
        **説明**: アクセス制御エントリーの HTTP 1.1 エンティティタグ。<br>
        **GCP 名**: `etag`<br>
   - `generation`<br>
    **タイプ**: `STRING`<br>
        **説明**: オブジェクトに適用される場合、そのオブジェクトのコンテンツ生成。<br>
        **GCP 名**: `generation`<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
        **説明**: アクセス制御エントリーの ID。<br>
        **GCP 名**: `id`<br>
   - `kind`<br>
    **タイプ**: `STRING`<br>
        **説明**: このアイテムの種類。オブジェクトアクセス制御エントリーの場合、これは常に `storage#objectAccessControl` です。<br>
        **GCP name**: `kind`<br>
   - `object`<br>
    **タイプ**: `STRING`<br>
        **説明**: オブジェクトに適用される場合、そのオブジェクトの名前。<br>
        **GCP 名**: `object`<br>
   - `project_team`<br>
      **タイプ**: `STRUCT`<br>
      **説明**: もしあれば、そのエンティティに関連するプロジェクトチーム。<br>
      **GCP 名**: `projectTeam`
       - `project_number`<br>
        **タイプ**: `STRING`<br>
            **説明**: プロジェクト番号。<br>
            **GCP 名**: `projectNumber`<br>
       - `team`<br>
        **タイプ**: `STRING`<br>
            **説明**: チーム。<br>
            **GCP 名**: `team`<br>
   - `role`<br>
    **タイプ**: `STRING`<br>
        **説明**: エンティティのアクセス権限。<br>
        **GCP 名**: `role`<br>
   - `self_link`<br>
    **タイプ**: `STRING`<br>
        **説明**: このアクセス制御エントリーへのリンク。<br>
        **GCP 名**: `selfLink`<br>
## `encryption`
  **Type**: `STRUCT`<br>
  **説明**: バケットの暗号化構成。<br>
  **GCP 名**: `encryption`
   - `default_kms_key_name`<br>
    **タイプ**: `STRING`<br>
        **説明**: 暗号化方式を指定しない場合、このバケットに挿入されるオブジェクトを暗号化するために使用される Cloud KMS キー。<br>
        **GCP 名**: `defaultKmsKeyName`<br>
## `etag`
**タイプ**: `STRING`<br>
    **説明**: バケットの HTTP 1.1 エンティティタグ。<br>
    **GCP name**: `etag`<br>
## `iam_configuration`
  **Type**: `STRUCT`<br>
  **説明**: バケットの IAM 構成。<br>
  **GCP 名**: `iamConfiguration`
   - `bucket_policy_only`<br>
      **タイプ**: `STRUCT`<br>
      **説明**: バケットのバケットレベルの統一的なアクセス構成。この機能は以前は Bucket Policy Only として知られていました。後方互換性のために、このフィールドには `uniformBucketLevelAccess` フィールドと同じ情報が入力されます。この機能を有効にしたり無効にしたりするには、 `uniformBucketLevelAccess` フィールドを使用することをお勧めします。<br>
      **GCP 名**: `bucketPolicyOnly`
       - `enabled`<br>
        **タイプ**: `BOOLEAN`<br>
            **説明**: 設定すると、バケットレベル以上の IAM ポリシーによってのみアクセスが制御されます。<br>
            **GCP 名**: `enabled`<br>
       - `locked_time`<br>
        **Type**: `TIMESTAMP`<br>
            **説明**: RFC 3339 形式の `iamConfiguration.bucketPolicyOnly.enabled` を `true` から `false` に変更するための期限。`iamConfiguration.bucketPolicyOnly.enabled` はロックされた時間まで `true` から `false` に変更可能で、それ以降はこのフィールドは不変です。<br>
            **GCP 名**: `lockedTime`<br>
   - `public_access_prevention`<br>
    **タイプ**: `STRING`<br>
        **説明**: バケットの Public Access Prevention の構成。現在、`inherited` と `enforced` がサポートされています。<br>
        **GCP 名**: `publicAccessPrevention`<br>
   - `uniform_bucket_level_access`<br>
      **タイプ**: `STRUCT`<br>
      **説明**: バケットの統一的なバケットレベルのアクセス構成。<br>
      **GCP 名**: `uniformBucketLevelAccess`
       - `enabled`<br>
        **タイプ**: `BOOLEAN`<br>
            **説明**: 設定すると、バケットレベル以上の IAM ポリシーによってのみアクセスが制御されます。<br>
            **GCP 名**: `enabled`<br>
       - `locked_time`<br>
        **Type**: `TIMESTAMP`<br>
            **説明**: RFC 3339 形式の `iamConfiguration.uniformBucketLevelAccess.enabled` を `true` から `false` に変更するための期限。`iamConfiguration.uniformBucketLevelAccess.enabled` はロックされた時間まで `true` から `false` に変更可能で、それ以降はこのフィールドは不変です。<br>
            **GCP 名**: `lockedTime`<br>
## `id`
**タイプ**: `STRING`<br>
    **説明**: バケットの ID。バケットの場合、`id` と `name` プロパティは同じものです。<br>
    **GCP name**: `id`<br>
## `kind`
**タイプ**: `STRING`<br>
    **説明**: このアイテムの種類。バケットの場合、これは常に `storage#bucket` です。<br>
    **GCP name**: `kind`<br>
## `labels`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `lifecycle`
  **Type**: `STRUCT`<br>
  **説明**: バケットのライフサイクル構成。詳しくはライフサイクル管理をご覧ください。<br>
  **GCP 名**: `lifecycle`
   - `rule`<br>
      **タイプ**: `UNORDERED_LIST_STRUCT`<br>
      **説明**: ライフサイクル管理ルール。取るべきアクションと、そのアクションを実行するための条件から構成されます。<br>
      **GCP 名**: `rule`
       - `action`<br>
          **タイプ**: `STRUCT`<br>
          **説明**: 取るべきアクション。<br>
          **GCP 名**: `action`
           - `storage_class`<br>
            **タイプ**: `STRING`<br>
                **説明**: 対象となるストレージクラス。アクションのタイプが `SetStorageClass` である場合にのみ必要です。<br>
                **GCP 名**: `storageClass`<br>
           - `type`<br>
            **タイプ**: `STRING`<br>
                **説明**: アクションの種類。現在のところ、`Delete`、`SetStorageClass`、`AbortIncompleteMultipartUpload` のみがサポートされています。<br>
                **GCP name**: `type`<br>
       - `condition`<br>
          **タイプ**: `STRUCT`<br>
          **説明**: アクションを起こす条件。<br>
          **GCP 名**: `condition`
           - `age`<br>
            **Type**: `INT32`<br>
                **説明**: オブジェクトの年齢 (日数)。この条件は、オブジェクトが指定された年齢に達したときに満たされます。<br>
                **GCP 名**: `age`<br>
           - `created_before`<br>
            **Type**: `TIMESTAMP`<br>
                **説明**: RFC 3339 形式の日付部分のみの日付 (たとえば `2013-01-15` など)。この条件は、オブジェクトが UTC で指定された日付の午前 0 時以前に作成されたときに満たされます。<br>
                **GCP 名**: `createdBefore`<br>
           - `custom_time_before`<br>
            **Type**: `TIMESTAMP`<br>
                **説明**: RFC 3339 形式の日付部分のみの日付 (たとえば `2013-01-15` など)。この条件は、オブジェクトのカスタムタイムが UTC でこの日付より前である場合に満たされます。<br>
                **GCP 名**: `customTimeBefore`<br>
           - `days_since_custom_time`<br>
            **Type**: `INT32`<br>
                **説明**: オブジェクトに設定されたユーザー指定のタイムスタンプからの経過日数。経過日数がこの数値以上であれば、この条件は満たされます。オブジェクトにカスタムタイムスタンプが指定されていない場合、この条件は適用されません。<br>
                **GCP 名**: `daysSinceCustomTime`<br>
           - `days_since_noncurrent_time`<br>
            **Type**: `INT32`<br>
                **説明**: オブジェクトの非現在のタイムスタンプからの経過日数。この条件は、経過日数がこの数以上である場合に満たされます。この条件は、バージョン管理されたオブジェクトにのみ関連します。このフィールドの値は、非負の整数でなければなりません。ゼロの場合、オブジェクトのバージョンは、非現行になると同時にライフサイクルアクションの対象となります。<br>
                **GCP 名**: `daysSinceNoncurrentTime`<br>
           - `is_live`<br>
            **タイプ**: `BOOLEAN`<br>
                **説明**: バージョン管理されたオブジェクトにのみ関連します。値が true の場合、この条件はライブオブジェクトにマッチし、値が false の場合、アーカイブされたオブジェクトにマッチします。<br>
                **GCP 名**: `isLive`<br>
           - `matches_pattern`<br>
            **タイプ**: `STRING`<br>
                **説明**: RE2 構文を満たす正規表現。この条件は、オブジェクトの名前が RE2 パターンに一致するときに満たされます。注: この機能は現在「早期アクセス」の立ち上げ段階にあり、許可されたユーザーセットのみが利用可能です。つまり、この機能は後方互換性のない方法で変更される可能性があり、リリースが保証されているわけではありません。<br>
                **GCP 名**: `matchesPattern`<br>
           - `matches_prefix`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
                **説明**: オブジェクト名のプレフィックスのリスト。この条件は、プレフィックスのうちの少なくともひとつがオブジェクト名の先頭に正確に一致したときに満たされます。<br>
                **GCP 名**: `matchesPrefix`<br>
           - `matches_storage_class`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
                **説明**: この条件で指定されたストレージクラスのいずれかを持つオブジェクトがマッチします。`MULTI_REGIONAL`、`REGIONAL`、`NEARLINE`、`COLDLINE`、`ARCHIVE`、`STANDARD`、`DURABLE_REDUCED_AVAILABILITY` などの値があります。<br>
                **GCP 名**: `matchesStorageClass`<br>
           - `matches_suffix`<br>
            **タイプ**: `UNORDERED_LIST_STRING`<br>
                **説明**: オブジェクト名のサフィックスのリスト。この条件は、サフィックスのうちの少なくともひとつがオブジェクト名の末尾に正確に一致したときに満たされます。<br>
                **GCP 名**: `matchesSuffix`<br>
           - `noncurrent_time_before`<br>
            **Type**: `TIMESTAMP`<br>
                **説明**: RFC 3339 形式の日付部分のみの日付 (たとえば `2013-01-15` など)。この条件は、オブジェクトの非現在時刻が UTC でこの日付より前である場合に満たされます。この条件は、バージョン管理されたオブジェクトにのみ関連します。<br>
                **GCP 名**: `noncurrentTimeBefore`<br>
           - `num_newer_versions`<br>
            **Type**: `INT32`<br>
                **説明**: バージョン管理されたオブジェクトにのみ関連します。この値が `N` である場合、このオブジェクトのこのバージョンよりも新しいバージョン (ライブバージョンを含む) が少なくとも `N` 個存在するときに、この条件が満たされます。<br>
                **GCP 名**: `numNewerVersions`<br>
## `location`
**タイプ**: `STRING`<br>
    **説明**: バケットの場所。バケットに含まれるオブジェクトのデータは、この地域内の物理ストレージに存在します。デフォルトは US です。正式な一覧は開発者向けガイドをご覧ください。<br>
    **GCP name**: `location`<br>
## `location_type`
**タイプ**: `STRING`<br>
    **説明**: バケットの場所の種類。<br>
    **GCP 名**: `locationType`<br>
## `logging`
  **Type**: `STRUCT`<br>
  **説明**: バケットのロギング構成。現在のバケットのログの宛先バケットとオプションの名前プレフィックスを定義します。<br>
  **GCP 名**: `logging`
   - `log_bucket`<br>
    **タイプ**: `STRING`<br>
        **説明**: 現在のバケットのログが置かれる宛先バケット。<br>
        **GCP 名**: `logBucket`<br>
   - `log_object_prefix`<br>
    **タイプ**: `STRING`<br>
        **説明**: ログオブジェクト名のプレフィックス。<br>
        **GCP 名**: `logObjectPrefix`<br>
## `metageneration`
**Type**: `INT64`<br>
    **説明**: このバケットのメタデータ生成。<br>
    **GCP 名**: `metageneration`<br>
## `name`
**タイプ**: `STRING`<br>
    **説明**: バケットの名前。<br>
    **GCP name**: `name`<br>
## `organization_id`
**タイプ**: `STRING`<br>
## `owner`
  **Type**: `STRUCT`<br>
  **説明**: バケットの所有者。これは常にプロジェクトチームのオーナーグループとなります。<br>
  **GCP 名**: `owner`
   - `entity`<br>
    **タイプ**: `STRING`<br>
        **説明**: `project-owner-projectId` という形式のエンティティ。<br>
        **GCP 名**: `entity`<br>
   - `entity_id`<br>
    **タイプ**: `STRING`<br>
        **説明**: そのエンティティの ID。<br>
        **GCP 名**: `entityId`<br>
## `parent`
**タイプ**: `STRING`<br>
## `project_id`
**タイプ**: `STRING`<br>
## `project_number`
**タイプ**: `STRING`<br>
## `resource_name`
**タイプ**: `STRING`<br>
## `retention_policy`
  **Type**: `STRUCT`<br>
  **説明**: バケットの保持ポリシー。保持ポリシーは、バケットに含まれるすべてのオブジェクトに対して、その作成時刻を基準とした最小限の保持期間を強制的に設定します。この保持期限を過ぎたオブジェクトを上書きしたり削除しようとすると、`PERMISSION_DENIED` エラーが発生します。ロックされていない保持ポリシーは、`storage.buckets.update operation` によってバケットから変更したり削除したりすることができます。ロックされた保持ポリシーは、バケットのライフタイム中、削除したり期間を短縮したりすることができません。ロックされた保持ポリシーを削除または期間を短縮しようとすると、`PERMISSION_DENIED` エラーが発生します。<br>
  **GCP 名**: `retentionPolicy`
   - `effective_time`<br>
    **Type**: `TIMESTAMP`<br>
        **説明**: ポリシーが適用され、有効になった時刻を示す、サーバーで決定された値。この値は RFC3339 形式です。<br>
        **GCP 名**: `effectiveTime`<br>
   - `is_locked`<br>
    **タイプ**: `BOOLEAN`<br>
        **説明**: 一度ロックされたオブジェクト保持ポリシーは、変更することができません。<br>
        **GCP 名**: `isLocked`<br>
   - `retention_period`<br>
    **Type**: `INT64`<br>
        **説明**: オブジェクトを保持する必要がある期間 (秒単位)。保持期間は 0 より大きく、100 年未満でなければなりません。1 日未満の保持期間の実施は保証されないことに注意してください。このような期間は、テスト目的でのみ使用されるべきです。<br>
        **GCP 名**: `retentionPeriod`<br>
## `rpo`
**タイプ**: `STRING`<br>
    **説明**: このバケットの RPO (Recovery Point Objective) を指定します。`ASYNC_TURBO` に設定すると、バケットで Turbo Replication が有効になります。<br>
    **GCP 名**: `rpo`<br>
## `satisfies_pzs`
**タイプ**: `BOOLEAN`<br>
    **説明**: 将来の使用に備えた予約。<br>
    **GCP 名**: `satisfiesPZS`<br>
## `self_link`
**タイプ**: `STRING`<br>
    **説明**: このバケットの URI。<br>
    **GCP name**: `selfLink`<br>
## `storage_class`
**タイプ**: `STRING`<br>
    **説明**: バケットのデフォルトのストレージクラスで、新しく作成されるオブジェクトに `storageClass` が指定されない場合に使用されます。これはバケット内のオブジェクトがどのように保存されるかを定義し、SLA や保存にかかるコストを決定します。値としては、`MULTI_REGIONAL`、`REGIONAL`、`STANDARD`、`NEARLINE`、`COLDLINE`、`ARCHIVE`、`DURABLE_REDUCED_AVAILABILITY` があります。バケットの作成時にこの値を指定しなかった場合、デフォルトで `STANDARD` が使用されます。詳しくは、ストレージクラスを参照してください。<br>
    **GCP 名**: `storageClass`<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `time_created`
**Type**: `TIMESTAMP`<br>
    **説明**: RFC3339 形式のバケットの作成時刻。<br>
    **GCP 名**: `timeCreated`<br>
## `updated`
**Type**: `TIMESTAMP`<br>
    **説明**: RFC3339 形式のバケットの変更時刻。<br>
    **GCP 名**: `updated`<br>
## `versioning`
  **Type**: `STRUCT`<br>
  **説明**: バケットのバージョン管理構成。<br>
  **GCP 名**: `versioning`
   - `enabled`<br>
    **タイプ**: `BOOLEAN`<br>
        **説明**: true に設定すると、このバケットでバージョン管理が完全に有効になります。<br>
        **GCP 名**: `enabled`<br>
## `website`
  **Type**: `STRUCT`<br>
  **説明**: バケットの Web サイト構成。バケットのコンテンツに Web サイトとしてアクセスする際のサービスの振る舞いを制御します。詳しくは「静的 Web サイトの例」をご覧ください。<br>
  **GCP 名**: `website`
   - `main_page_suffix`<br>
    **タイプ**: `STRING`<br>
        **説明**: リクエストされたオブジェクトのパスがない場合、サービスはパスの末尾に `/` があることを確認し、このサフィックスを付加し、結果のオブジェクトの取得を試みます。これにより、ディレクトリページを表す `index.html` オブジェクトを作成することができます。<br>
        **GCP 名**: `mainPageSuffix`<br>
   - `not_found_page`<br>
    **タイプ**: `STRING`<br>
        **説明**: リクエストされたオブジェクトのパスが見つからない場合、また `mainPageSuffix` オブジェクトが見つからない場合、サービスはこのバケットから指定されたオブジェクトを 404 Not Found 結果のコンテンツとして返します。<br>
        **GCP 名**: `notFoundPage`<br>