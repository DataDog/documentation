---
title: gcp_storage_bucket
kind: documentation
---

## `acl`
  **Type**: `UNORDERED_LIST_STRUCT`<br>
  **Description**: Access controls on the bucket.<br>
  **GCP name**: `acl`
   - `bucket`<br>
    **Type**: `STRING`<br>
        **Description**: The name of the bucket.<br>
        **GCP name**: `bucket`<br>
   - `domain`<br>
    **Type**: `STRING`<br>
        **Description**: The domain associated with the entity, if any.<br>
        **GCP name**: `domain`<br>
   - `email`<br>
    **Type**: `STRING`<br>
        **Description**: The email address associated with the entity, if any.<br>
        **GCP name**: `email`<br>
   - `entity`<br>
    **Type**: `STRING`<br>
    **Description**: The entity holding the permission, in one of the following forms: <br>
    - `user-<UserId>` <br>
    - `user-<email>` <br>
    - `group-<groupId>` <br>
    - `group-<email>` <br>
    - `domain-<domainName>`<br>
    - `project-<team-projectId>`<br> 
    - `allUsers` - allAuthenticatedUsers <br>
    Examples: <br>
    - The user `liz@example.com` would be `user-liz@example.com`. <br>
    - The group `example@googlegroups.com` would be `group-example@googlegroups.com`. <br>
    - To refer to all members of the Google Apps for Business domain `example.com`, the entity would be `domain-example.com`.<br>
        **GCP name**: `entity`<br>
   - `entity_id`<br>
    **Type**: `STRING`<br>
        **Description**: The ID for the entity, if any.<br>
        **GCP name**: `entityId`<br>
   - `etag`<br>
    **Type**: `STRING`<br>
        **Description**: HTTP 1.1 Entity tag for the access-control entry.<br>
        **GCP name**: `etag`<br>
   - `id`<br>
    **Type**: `STRING`<br>
        **Description**: The ID of the access-control entry.<br>
        **GCP name**: `id`<br>
   - `kind`<br>
    **Type**: `STRING`<br>
        **Description**: The kind of item this is. For bucket access control entries, this is always `storage#bucketAccessControl`.<br>
        **GCP name**: `kind`<br>
   - `project_team`<br>
      **Type**: `STRUCT`<br>
      **Description**: The project team associated with the entity, if any.<br>
      **GCP name**: `projectTeam`
       - `project_number`<br>
        **Type**: `STRING`<br>
            **Description**: The project number.<br>
            **GCP name**: `projectNumber`<br>
       - `team`<br>
        **Type**: `STRING`<br>
            **Description**: The team.<br>
            **GCP name**: `team`<br>
   - `role`<br>
    **Type**: `STRING`<br>
        **Description**: The access permission for the entity.<br>
        **GCP name**: `role`<br>
   - `self_link`<br>
    **Type**: `STRING`<br>
        **Description**: The link to this access-control entry.<br>
        **GCP name**: `selfLink`<br>
## `ancestors`
**Type**: `UNORDERED_LIST_STRING`<br>
## `autoclass`
  **Type**: `STRUCT`<br>
  **Description**: The bucket's Autoclass configuration.<br>
  **GCP name**: `autoclass`
   - `enabled`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: Whether or not Autoclass is enabled on this bucket.<br>
        **GCP name**: `enabled`<br>
   - `toggle_time`<br>
    **Type**: `TIMESTAMP`<br>
        **Description**: A date and time in RFC 3339 format representing the instant at which "enabled" was last toggled.<br>
        **GCP name**: `toggleTime`<br>
## `billing`
  **Type**: `STRUCT`<br>
  **Description**: The bucket's billing configuration.<br>
  **GCP name**: `billing`
   - `requester_pays`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: When set to true, Requester Pays is enabled for this bucket.<br>
        **GCP name**: `requesterPays`<br>
## `cors`
  **Type**: `UNORDERED_LIST_STRUCT`<br>
  **Description**: The bucket's Cross-Origin Resource Sharing (CORS) configuration.<br>
  **GCP name**: `cors`
   - `max_age_seconds`<br>
    **Type**: `INT32`<br>
        **Description**: The value, in seconds, to return in the `Access-Control-Max-Age` header used in preflight responses.<br>
        **GCP name**: `maxAgeSeconds`<br>
   - `method`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
        **Description**: The list of HTTP methods on which to include CORS response headers, (`GET`, `OPTIONS`, `POST`) Note: `*` is permitted in the list of methods, and means "any method".<br>
        **GCP name**: `method`<br>
   - `origin`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
        **Description**: The list of Origins eligible to receive CORS response headers. Note: `*` is permitted in the list of origins, and means "any Origin".<br>
        **GCP name**: `origin`<br>
   - `response_header`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
        **Description**: The list of HTTP headers other than the simple response headers to give permission for the user-agent to share across domains.<br>
        **GCP name**: `responseHeader`<br>
## `custom_placement_config`
  **Type**: `STRUCT`<br>
  **Description**: The bucket's custom placement configuration for Custom Dual Regions.<br>
  **GCP name**: `customPlacementConfig`
   - `data_locations`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
        **Description**: The list of regional locations in which data is placed.<br>
        **GCP name**: `dataLocations`<br>
## `default_event_based_hold`
**Type**: `BOOLEAN`<br>
    **Description**: The default value for event-based hold on newly created objects in this bucket. Event-based hold is a way to retain objects indefinitely until an event occurs, signified by the hold's release. After being released, such objects will be subject to bucket-level retention (if any). One sample use case of this flag is for banks to hold loan documents for at least 3 years after loan is paid in full. Here, bucket-level retention is 3 years and the event is loan being paid in full. In this example, these objects will be held intact for any number of years until the event has occurred (event-based hold on the object is released) and then 3 more years after that. That means retention duration of the objects begins from the moment event-based hold transitioned from `true` to `false`. Objects under event-based hold cannot be deleted, overwritten or archived until the hold is removed.<br>
    **GCP name**: `defaultEventBasedHold`<br>
## `default_object_acl`
  **Type**: `UNORDERED_LIST_STRUCT`<br>
  **Description**: Default access controls to apply to new objects when no ACL is provided.<br>
  **GCP name**: `defaultObjectAcl`
   - `bucket`<br>
    **Type**: `STRING`<br>
        **Description**: The name of the bucket.<br>
        **GCP name**: `bucket`<br>
   - `domain`<br>
    **Type**: `STRING`<br>
        **Description**: The domain associated with the entity, if any.<br>
        **GCP name**: `domain`<br>
   - `email`<br>
    **Type**: `STRING`<br>
        **Description**: The email address associated with the entity, if any.<br>
        **GCP name**: `email`<br>
   - `entity`<br>
    **Type**: `STRING`<br>
    **Description**: The entity holding the permission, in one of the following forms: <br>
    - `user-<UserId>` <br>
    - `user-<email>` <br>
    - `group-<groupId>` <br>
    - `group-<email>` <br>
    - `domain-<domainName>`<br>
    - `project-<team-projectId>` <br>
    - `allUsers` - allAuthenticatedUsers <br>
    Examples: <br>
    - The user `liz@example.com` would be `user-liz@example.com`. <br>
    - The group `example@googlegroups.com` would be `group-example@googlegroups.com`. <br>
    - To refer to all members of the Google Apps for Business domain `example.com`, the entity would be `domain-example.com`.<br>
        **GCP name**: `entity`<br>
   - `entity_id`<br>
    **Type**: `STRING`<br>
        **Description**: The ID for the entity, if any.<br>
        **GCP name**: `entityId`<br>
   - `etag`<br>
    **Type**: `STRING`<br>
        **Description**: HTTP 1.1 Entity tag for the access-control entry.<br>
        **GCP name**: `etag`<br>
   - `generation`<br>
    **Type**: `STRING`<br>
        **Description**: The content generation of the object, if applied to an object.<br>
        **GCP name**: `generation`<br>
   - `id`<br>
    **Type**: `STRING`<br>
        **Description**: The ID of the access-control entry.<br>
        **GCP name**: `id`<br>
   - `kind`<br>
    **Type**: `STRING`<br>
        **Description**: The kind of item this is. For object access control entries, this is always `storage#objectAccessControl`.<br>
        **GCP name**: `kind`<br>
   - `object`<br>
    **Type**: `STRING`<br>
        **Description**: The name of the object, if applied to an object.<br>
        **GCP name**: `object`<br>
   - `project_team`<br>
      **Type**: `STRUCT`<br>
      **Description**: The project team associated with the entity, if any.<br>
      **GCP name**: `projectTeam`
       - `project_number`<br>
        **Type**: `STRING`<br>
            **Description**: The project number.<br>
            **GCP name**: `projectNumber`<br>
       - `team`<br>
        **Type**: `STRING`<br>
            **Description**: The team.<br>
            **GCP name**: `team`<br>
   - `role`<br>
    **Type**: `STRING`<br>
        **Description**: The access permission for the entity.<br>
        **GCP name**: `role`<br>
   - `self_link`<br>
    **Type**: `STRING`<br>
        **Description**: The link to this access-control entry.<br>
        **GCP name**: `selfLink`<br>
## `encryption`
  **Type**: `STRUCT`<br>
  **Description**: Encryption configuration for a bucket.<br>
  **GCP name**: `encryption`
   - `default_kms_key_name`<br>
    **Type**: `STRING`<br>
        **Description**: A Cloud KMS key that will be used to encrypt objects inserted into this bucket, if no encryption method is specified.<br>
        **GCP name**: `defaultKmsKeyName`<br>
## `etag`
**Type**: `STRING`<br>
    **Description**: HTTP 1.1 Entity tag for the bucket.<br>
    **GCP name**: `etag`<br>
## `iam_configuration`
  **Type**: `STRUCT`<br>
  **Description**: The bucket's IAM configuration.<br>
  **GCP name**: `iamConfiguration`
   - `bucket_policy_only`<br>
      **Type**: `STRUCT`<br>
      **Description**: The bucket's uniform bucket-level access configuration. The feature was formerly known as Bucket Policy Only. For backward compatibility, this field will be populated with identical information as the `uniformBucketLevelAccess` field. We recommend using the `uniformBucketLevelAccess` field to enable and disable the feature.<br>
      **GCP name**: `bucketPolicyOnly`
       - `enabled`<br>
        **Type**: `BOOLEAN`<br>
            **Description**: If set, access is controlled only by bucket-level or above IAM policies.<br>
            **GCP name**: `enabled`<br>
       - `locked_time`<br>
        **Type**: `TIMESTAMP`<br>
            **Description**: The deadline for changing `iamConfiguration.bucketPolicyOnly.enabled` from `true` to `false` in RFC 3339 format. `iamConfiguration.bucketPolicyOnly.enabled` may be changed from `true` to `false` until the locked time, after which the field is immutable.<br>
            **GCP name**: `lockedTime`<br>
   - `public_access_prevention`<br>
    **Type**: `STRING`<br>
        **Description**: The bucket's Public Access Prevention configuration. Currently, `inherited` and `enforced` are supported.<br>
        **GCP name**: `publicAccessPrevention`<br>
   - `uniform_bucket_level_access`<br>
      **Type**: `STRUCT`<br>
      **Description**: The bucket's uniform bucket-level access configuration.<br>
      **GCP name**: `uniformBucketLevelAccess`
       - `enabled`<br>
        **Type**: `BOOLEAN`<br>
            **Description**: If set, access is controlled only by bucket-level or above IAM policies.<br>
            **GCP name**: `enabled`<br>
       - `locked_time`<br>
        **Type**: `TIMESTAMP`<br>
            **Description**: The deadline for changing `iamConfiguration.uniformBucketLevelAccess.enabled` from `true` to `false` in RFC 3339  format. `iamConfiguration.uniformBucketLevelAccess.enabled` may be changed from `true` to `false` until the locked time, after which the field is immutable.<br>
            **GCP name**: `lockedTime`<br>
## `id`
**Type**: `STRING`<br>
    **Description**: The ID of the bucket. For buckets, the `id` and `name` properties are the same.<br>
    **GCP name**: `id`<br>
## `kind`
**Type**: `STRING`<br>
    **Description**: The kind of item this is. For buckets, this is always `storage#bucket`.<br>
    **GCP name**: `kind`<br>
## `labels`
**Type**: `UNORDERED_LIST_STRING`<br>
## `lifecycle`
  **Type**: `STRUCT`<br>
  **Description**: The bucket's lifecycle configuration. See lifecycle management for more information.<br>
  **GCP name**: `lifecycle`
   - `rule`<br>
      **Type**: `UNORDERED_LIST_STRUCT`<br>
      **Description**: A lifecycle management rule, which is made of an action to take and the condition(s) under which the action will be taken.<br>
      **GCP name**: `rule`
       - `action`<br>
          **Type**: `STRUCT`<br>
          **Description**: The action to take.<br>
          **GCP name**: `action`
           - `storage_class`<br>
            **Type**: `STRING`<br>
                **Description**: Target storage class. Required if and only if the type of the action is `SetStorageClass`.<br>
                **GCP name**: `storageClass`<br>
           - `type`<br>
            **Type**: `STRING`<br>
                **Description**: Type of the action. Currently, only `Delete`, `SetStorageClass`, and `AbortIncompleteMultipartUpload` are supported.<br>
                **GCP name**: `type`<br>
       - `condition`<br>
          **Type**: `STRUCT`<br>
          **Description**: The condition(s) under which the action will be taken.<br>
          **GCP name**: `condition`
           - `age`<br>
            **Type**: `INT32`<br>
                **Description**: Age of an object (in days). This condition is satisfied when an object reaches the specified age.<br>
                **GCP name**: `age`<br>
           - `created_before`<br>
            **Type**: `TIMESTAMP`<br>
                **Description**: A date in RFC 3339 format with only the date part (for instance, `2013-01-15`). This condition is satisfied when an object is created before midnight of the specified date in UTC.<br>
                **GCP name**: `createdBefore`<br>
           - `custom_time_before`<br>
            **Type**: `TIMESTAMP`<br>
                **Description**: A date in RFC 3339 format with only the date part (for instance, `2013-01-15`). This condition is satisfied when the custom time on an object is before this date in UTC.<br>
                **GCP name**: `customTimeBefore`<br>
           - `days_since_custom_time`<br>
            **Type**: `INT32`<br>
                **Description**: Number of days elapsed since the user-specified timestamp set on an object. The condition is satisfied if the days elapsed is at least this number. If no custom timestamp is specified on an object, the condition does not apply.<br>
                **GCP name**: `daysSinceCustomTime`<br>
           - `days_since_noncurrent_time`<br>
            **Type**: `INT32`<br>
                **Description**: Number of days elapsed since the noncurrent timestamp of an object. The condition is satisfied if the days elapsed is at least this number. This condition is relevant only for versioned objects. The value of the field must be a nonnegative integer. If it's zero, the object version will become eligible for Lifecycle action as soon as it becomes noncurrent.<br>
                **GCP name**: `daysSinceNoncurrentTime`<br>
           - `is_live`<br>
            **Type**: `BOOLEAN`<br>
                **Description**: Relevant only for versioned objects. If the value is true, this condition matches live objects; if the value is false, it matches archived objects.<br>
                **GCP name**: `isLive`<br>
           - `matches_pattern`<br>
            **Type**: `STRING`<br>
                **Description**: A regular expression that satisfies the RE2 syntax. This condition is satisfied when the name of the object matches the RE2 pattern. Note: This feature is currently in the "Early Access" launch stage and is only available to an allow-listed set of users; that means that this feature may be changed in backward-incompatible ways and that it is not guaranteed to be released.<br>
                **GCP name**: `matchesPattern`<br>
           - `matches_prefix`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
                **Description**: List of object name prefixes. This condition will be satisfied when at least one of the prefixes exactly matches the beginning of the object name.<br>
                **GCP name**: `matchesPrefix`<br>
           - `matches_storage_class`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
                **Description**: Objects having any of the storage classes specified by this condition will be matched. Values include `MULTI_REGIONAL`, `REGIONAL`, `NEARLINE`, `COLDLINE`, `ARCHIVE`, `STANDARD`, and `DURABLE_REDUCED_AVAILABILITY`.<br>
                **GCP name**: `matchesStorageClass`<br>
           - `matches_suffix`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
                **Description**: List of object name suffixes. This condition will be satisfied when at least one of the suffixes exactly matches the end of the object name.<br>
                **GCP name**: `matchesSuffix`<br>
           - `noncurrent_time_before`<br>
            **Type**: `TIMESTAMP`<br>
                **Description**: A date in RFC 3339 format with only the date part (for instance, `2013-01-15`). This condition is satisfied when the noncurrent time on an object is before this date in UTC. This condition is relevant only for versioned objects.<br>
                **GCP name**: `noncurrentTimeBefore`<br>
           - `num_newer_versions`<br>
            **Type**: `INT32`<br>
                **Description**: Relevant only for versioned objects. If the value is `N`, this condition is satisfied when there are at least `N` versions (including the live version) newer than this version of the object.<br>
                **GCP name**: `numNewerVersions`<br>
## `location`
**Type**: `STRING`<br>
    **Description**: The location of the bucket. Object data for objects in the bucket resides in physical storage within this region. Defaults to US. See the developer's guide for the authoritative list.<br>
    **GCP name**: `location`<br>
## `location_type`
**Type**: `STRING`<br>
    **Description**: The type of the bucket location.<br>
    **GCP name**: `locationType`<br>
## `logging`
  **Type**: `STRUCT`<br>
  **Description**: The bucket's logging configuration, which defines the destination bucket and optional name prefix for the current bucket's logs.<br>
  **GCP name**: `logging`
   - `log_bucket`<br>
    **Type**: `STRING`<br>
        **Description**: The destination bucket where the current bucket's logs should be placed.<br>
        **GCP name**: `logBucket`<br>
   - `log_object_prefix`<br>
    **Type**: `STRING`<br>
        **Description**: A prefix for log object names.<br>
        **GCP name**: `logObjectPrefix`<br>
## `metageneration`
**Type**: `INT64`<br>
    **Description**: The metadata generation of this bucket.<br>
    **GCP name**: `metageneration`<br>
## `name`
**Type**: `STRING`<br>
    **Description**: The name of the bucket.<br>
    **GCP name**: `name`<br>
## `organization_id`
**Type**: `STRING`<br>
## `owner`
  **Type**: `STRUCT`<br>
  **Description**: The owner of the bucket. This is always the project team's owner group.<br>
  **GCP name**: `owner`
   - `entity`<br>
    **Type**: `STRING`<br>
        **Description**: The entity, in the form `project-owner-projectId`.<br>
        **GCP name**: `entity`<br>
   - `entity_id`<br>
    **Type**: `STRING`<br>
        **Description**: The ID for the entity.<br>
        **GCP name**: `entityId`<br>
## `parent`
**Type**: `STRING`<br>
## `project_id`
**Type**: `STRING`<br>
## `project_number`
**Type**: `STRING`<br>
## `resource_name`
**Type**: `STRING`<br>
## `retention_policy`
  **Type**: `STRUCT`<br>
  **Description**: The bucket's retention policy. The retention policy enforces a minimum retention time for all objects contained in the bucket, based on their creation time. Any attempt to overwrite or delete objects younger than the retention period will result in a `PERMISSION_DENIED` error. An unlocked retention policy can be modified or removed from the bucket via a `storage.buckets.update operation`. A locked retention policy cannot be removed or shortened in duration for the lifetime of the bucket. Attempting to remove or decrease period of a locked retention policy will result in a `PERMISSION_DENIED` error.<br>
  **GCP name**: `retentionPolicy`
   - `effective_time`<br>
    **Type**: `TIMESTAMP`<br>
        **Description**: Server-determined value that indicates the time from which policy was enforced and effective. This value is in RFC 3339 format.<br>
        **GCP name**: `effectiveTime`<br>
   - `is_locked`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: Once locked, an object retention policy cannot be modified.<br>
        **GCP name**: `isLocked`<br>
   - `retention_period`<br>
    **Type**: `INT64`<br>
        **Description**: The duration in seconds that objects need to be retained. Retention duration must be greater than zero and less than 100 years. Note that enforcement of retention periods less than a day is not guaranteed. Such periods should only be used for testing purposes.<br>
        **GCP name**: `retentionPeriod`<br>
## `rpo`
**Type**: `STRING`<br>
    **Description**: The Recovery Point Objective (RPO) of this bucket. Set to `ASYNC_TURBO` to turn on Turbo Replication on a bucket.<br>
    **GCP name**: `rpo`<br>
## `satisfies_pzs`
**Type**: `BOOLEAN`<br>
    **Description**: Reserved for future use.<br>
    **GCP name**: `satisfiesPZS`<br>
## `self_link`
**Type**: `STRING`<br>
    **Description**: The URI of this bucket.<br>
    **GCP name**: `selfLink`<br>
## `storage_class`
**Type**: `STRING`<br>
    **Description**: The bucket's default storage class, used whenever no `storageClass` is specified for a newly-created object. This defines how objects in the bucket are stored and determines the SLA and the cost of storage. Values include `MULTI_REGIONAL`, `REGIONAL`, `STANDARD`, `NEARLINE`, `COLDLINE`, `ARCHIVE`, and `DURABLE_REDUCED_AVAILABILITY`. If this value is not specified when the bucket is created, it will default to `STANDARD`. For more information, see storage classes.<br>
    **GCP name**: `storageClass`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `time_created`
**Type**: `TIMESTAMP`<br>
    **Description**: The creation time of the bucket in RFC 3339 format.<br>
    **GCP name**: `timeCreated`<br>
## `updated`
**Type**: `TIMESTAMP`<br>
    **Description**: The modification time of the bucket in RFC 3339 format.<br>
    **GCP name**: `updated`<br>
## `versioning`
  **Type**: `STRUCT`<br>
  **Description**: The bucket's versioning configuration.<br>
  **GCP name**: `versioning`
   - `enabled`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: While set to true, versioning is fully enabled for this bucket.<br>
        **GCP name**: `enabled`<br>
## `website`
  **Type**: `STRUCT`<br>
  **Description**: The bucket's website configuration, controlling how the service behaves when accessing bucket contents as a web site. See the Static Website Examples for more information.<br>
  **GCP name**: `website`
   - `main_page_suffix`<br>
    **Type**: `STRING`<br>
        **Description**: If the requested object path is missing, the service will ensure the path has a trailing `/`, append this suffix, and attempt to retrieve the resulting object. This allows the creation of `index.html` objects to represent directory pages.<br>
        **GCP name**: `mainPageSuffix`<br>
   - `not_found_page`<br>
    **Type**: `STRING`<br>
        **Description**: If the requested object path is missing, and any `mainPageSuffix` object is missing, if applicable, the service will return the named object from this bucket as the content for a 404 Not Found result.<br>
        **GCP name**: `notFoundPage`<br>

