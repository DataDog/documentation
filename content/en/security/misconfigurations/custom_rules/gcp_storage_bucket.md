---
dependencies: []
disable_edit: true
---
# gcp_storage_bucket

## `acl`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `acl`<br>
**Description**: Access controls on the bucket.<br>
   - `bucket`<br>
    **Type**: `STRING`<br>
    **Provider name**: `bucket`<br>
    **Description**: The name of the bucket.<br>
   - `domain`<br>
    **Type**: `STRING`<br>
    **Provider name**: `domain`<br>
    **Description**: The domain associated with the entity, if any.<br>
   - `email`<br>
    **Type**: `STRING`<br>
    **Provider name**: `email`<br>
    **Description**: The email address associated with the entity, if any.<br>
   - `entity`<br>
    **Type**: `STRING`<br>
    **Provider name**: `entity`<br>
    **Description**: The entity holding the permission, in one of the following forms: - user-userId - user-email - group-groupId - group-email - domain-domain - project-team-projectId - allUsers - allAuthenticatedUsers Examples: - The user liz@example.com would be user-liz@example.com. - The group example@googlegroups.com would be group-example@googlegroups.com. - To refer to all members of the Google Apps for Business domain example.com, the entity would be domain-example.com.<br>
   - `entity_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `entityId`<br>
    **Description**: The ID for the entity, if any.<br>
   - `etag`<br>
    **Type**: `STRING`<br>
    **Provider name**: `etag`<br>
    **Description**: HTTP 1.1 Entity tag for the access-control entry.<br>
   - `id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `id`<br>
    **Description**: The ID of the access-control entry.<br>
   - `kind`<br>
    **Type**: `STRING`<br>
    **Provider name**: `kind`<br>
    **Description**: The kind of item this is. For bucket access control entries, this is always storage#bucketAccessControl.<br>
   - `project_team`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `projectTeam`<br>
    **Description**: The project team associated with the entity, if any.<br>
       - `project_number`<br>
        **Type**: `STRING`<br>
        **Provider name**: `projectNumber`<br>
        **Description**: The project number.<br>
       - `team`<br>
        **Type**: `STRING`<br>
        **Provider name**: `team`<br>
        **Description**: The team.<br>
   - `role`<br>
    **Type**: `STRING`<br>
    **Provider name**: `role`<br>
    **Description**: The access permission for the entity.<br>
   - `self_link`<br>
    **Type**: `STRING`<br>
    **Provider name**: `selfLink`<br>
    **Description**: The link to this access-control entry.<br>
## `ancestors`
**Type**: `UNORDERED_LIST_STRING`<br>
## `autoclass`
**Type**: `STRUCT`<br>
**Provider name**: `autoclass`<br>
**Description**: The bucket's Autoclass configuration.<br>
   - `enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `enabled`<br>
    **Description**: Whether or not Autoclass is enabled on this bucket<br>
   - `toggle_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `toggleTime`<br>
    **Description**: A date and time in RFC 3339 format representing the instant at which "enabled" was last toggled.<br>
## `billing`
**Type**: `STRUCT`<br>
**Provider name**: `billing`<br>
**Description**: The bucket's billing configuration.<br>
   - `requester_pays`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `requesterPays`<br>
    **Description**: When set to true, Requester Pays is enabled for this bucket.<br>
## `cors`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `cors`<br>
**Description**: The bucket's Cross-Origin Resource Sharing (CORS) configuration.<br>
   - `max_age_seconds`<br>
    **Type**: `INT32`<br>
    **Provider name**: `maxAgeSeconds`<br>
    **Description**: The value, in seconds, to return in the  Access-Control-Max-Age header used in preflight responses.<br>
   - `method`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `method`<br>
    **Description**: The list of HTTP methods on which to include CORS response headers, (GET, OPTIONS, POST, etc) Note: "*" is permitted in the list of methods, and means "any method".<br>
   - `origin`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `origin`<br>
    **Description**: The list of Origins eligible to receive CORS response headers. Note: "*" is permitted in the list of origins, and means "any Origin".<br>
   - `response_header`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `responseHeader`<br>
    **Description**: The list of HTTP headers other than the simple response headers to give permission for the user-agent to share across domains.<br>
## `custom_placement_config`
**Type**: `STRUCT`<br>
**Provider name**: `customPlacementConfig`<br>
**Description**: The bucket's custom placement configuration for Custom Dual Regions.<br>
   - `data_locations`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `dataLocations`<br>
    **Description**: The list of regional locations in which data is placed.<br>
## `default_event_based_hold`
**Type**: `BOOLEAN`<br>
**Provider name**: `defaultEventBasedHold`<br>
**Description**: The default value for event-based hold on newly created objects in this bucket. Event-based hold is a way to retain objects indefinitely until an event occurs, signified by the hold's release. After being released, such objects will be subject to bucket-level retention (if any). One sample use case of this flag is for banks to hold loan documents for at least 3 years after loan is paid in full. Here, bucket-level retention is 3 years and the event is loan being paid in full. In this example, these objects will be held intact for any number of years until the event has occurred (event-based hold on the object is released) and then 3 more years after that. That means retention duration of the objects begins from the moment event-based hold transitioned from true to false. Objects under event-based hold cannot be deleted, overwritten or archived until the hold is removed.<br>
## `default_object_acl`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `defaultObjectAcl`<br>
**Description**: Default access controls to apply to new objects when no ACL is provided.<br>
   - `bucket`<br>
    **Type**: `STRING`<br>
    **Provider name**: `bucket`<br>
    **Description**: The name of the bucket.<br>
   - `domain`<br>
    **Type**: `STRING`<br>
    **Provider name**: `domain`<br>
    **Description**: The domain associated with the entity, if any.<br>
   - `email`<br>
    **Type**: `STRING`<br>
    **Provider name**: `email`<br>
    **Description**: The email address associated with the entity, if any.<br>
   - `entity`<br>
    **Type**: `STRING`<br>
    **Provider name**: `entity`<br>
    **Description**: The entity holding the permission, in one of the following forms: - user-userId - user-email - group-groupId - group-email - domain-domain - project-team-projectId - allUsers - allAuthenticatedUsers Examples: - The user liz@example.com would be user-liz@example.com. - The group example@googlegroups.com would be group-example@googlegroups.com. - To refer to all members of the Google Apps for Business domain example.com, the entity would be domain-example.com.<br>
   - `entity_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `entityId`<br>
    **Description**: The ID for the entity, if any.<br>
   - `etag`<br>
    **Type**: `STRING`<br>
    **Provider name**: `etag`<br>
    **Description**: HTTP 1.1 Entity tag for the access-control entry.<br>
   - `generation`<br>
    **Type**: `STRING`<br>
    **Provider name**: `generation`<br>
    **Description**: The content generation of the object, if applied to an object.<br>
   - `id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `id`<br>
    **Description**: The ID of the access-control entry.<br>
   - `kind`<br>
    **Type**: `STRING`<br>
    **Provider name**: `kind`<br>
    **Description**: The kind of item this is. For object access control entries, this is always storage#objectAccessControl.<br>
   - `object`<br>
    **Type**: `STRING`<br>
    **Provider name**: `object`<br>
    **Description**: The name of the object, if applied to an object.<br>
   - `project_team`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `projectTeam`<br>
    **Description**: The project team associated with the entity, if any.<br>
       - `project_number`<br>
        **Type**: `STRING`<br>
        **Provider name**: `projectNumber`<br>
        **Description**: The project number.<br>
       - `team`<br>
        **Type**: `STRING`<br>
        **Provider name**: `team`<br>
        **Description**: The team.<br>
   - `role`<br>
    **Type**: `STRING`<br>
    **Provider name**: `role`<br>
    **Description**: The access permission for the entity.<br>
   - `self_link`<br>
    **Type**: `STRING`<br>
    **Provider name**: `selfLink`<br>
    **Description**: The link to this access-control entry.<br>
## `encryption`
**Type**: `STRUCT`<br>
**Provider name**: `encryption`<br>
**Description**: Encryption configuration for a bucket.<br>
   - `default_kms_key_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `defaultKmsKeyName`<br>
    **Description**: A Cloud KMS key that will be used to encrypt objects inserted into this bucket, if no encryption method is specified.<br>
## `etag`
**Type**: `STRING`<br>
**Provider name**: `etag`<br>
**Description**: HTTP 1.1 Entity tag for the bucket.<br>
## `iam_configuration`
**Type**: `STRUCT`<br>
**Provider name**: `iamConfiguration`<br>
**Description**: The bucket's IAM configuration.<br>
   - `bucket_policy_only`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `bucketPolicyOnly`<br>
    **Description**: The bucket's uniform bucket-level access configuration. The feature was formerly known as Bucket Policy Only. For backward compatibility, this field will be populated with identical information as the uniformBucketLevelAccess field. We recommend using the uniformBucketLevelAccess field to enable and disable the feature.<br>
       - `enabled`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `enabled`<br>
        **Description**: If set, access is controlled only by bucket-level or above IAM policies.<br>
       - `locked_time`<br>
        **Type**: `TIMESTAMP`<br>
        **Provider name**: `lockedTime`<br>
        **Description**: The deadline for changing iamConfiguration.bucketPolicyOnly.enabled from true to false in RFC 3339 format. iamConfiguration.bucketPolicyOnly.enabled may be changed from true to false until the locked time, after which the field is immutable.<br>
   - `public_access_prevention`<br>
    **Type**: `STRING`<br>
    **Provider name**: `publicAccessPrevention`<br>
    **Description**: The bucket's Public Access Prevention configuration. Currently, 'inherited' and 'enforced' are supported.<br>
   - `uniform_bucket_level_access`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `uniformBucketLevelAccess`<br>
    **Description**: The bucket's uniform bucket-level access configuration.<br>
       - `enabled`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `enabled`<br>
        **Description**: If set, access is controlled only by bucket-level or above IAM policies.<br>
       - `locked_time`<br>
        **Type**: `TIMESTAMP`<br>
        **Provider name**: `lockedTime`<br>
        **Description**: The deadline for changing iamConfiguration.uniformBucketLevelAccess.enabled from true to false in RFC 3339  format. iamConfiguration.uniformBucketLevelAccess.enabled may be changed from true to false until the locked time, after which the field is immutable.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `id`<br>
**Description**: The ID of the bucket. For buckets, the id and name properties are the same.<br>
## `kind`
**Type**: `STRING`<br>
**Provider name**: `kind`<br>
**Description**: The kind of item this is. For buckets, this is always storage#bucket.<br>
## `labels`
**Type**: `UNORDERED_LIST_STRING`<br>
## `lifecycle`
**Type**: `STRUCT`<br>
**Provider name**: `lifecycle`<br>
**Description**: The bucket's lifecycle configuration. See lifecycle management for more information.<br>
   - `rule`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `rule`<br>
    **Description**: A lifecycle management rule, which is made of an action to take and the condition(s) under which the action will be taken.<br>
       - `action`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `action`<br>
        **Description**: The action to take.<br>
           - `storage_class`<br>
            **Type**: `STRING`<br>
            **Provider name**: `storageClass`<br>
            **Description**: Target storage class. Required iff the type of the action is SetStorageClass.<br>
           - `type`<br>
            **Type**: `STRING`<br>
            **Provider name**: `type`<br>
            **Description**: Type of the action. Currently, only Delete, SetStorageClass, and AbortIncompleteMultipartUpload are supported.<br>
       - `condition`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `condition`<br>
        **Description**: The condition(s) under which the action will be taken.<br>
           - `age`<br>
            **Type**: `INT32`<br>
            **Provider name**: `age`<br>
            **Description**: Age of an object (in days). This condition is satisfied when an object reaches the specified age.<br>
           - `created_before`<br>
            **Type**: `TIMESTAMP`<br>
            **Provider name**: `createdBefore`<br>
            **Description**: A date in RFC 3339 format with only the date part (for instance, "2013-01-15"). This condition is satisfied when an object is created before midnight of the specified date in UTC.<br>
           - `custom_time_before`<br>
            **Type**: `TIMESTAMP`<br>
            **Provider name**: `customTimeBefore`<br>
            **Description**: A date in RFC 3339 format with only the date part (for instance, "2013-01-15"). This condition is satisfied when the custom time on an object is before this date in UTC.<br>
           - `days_since_custom_time`<br>
            **Type**: `INT32`<br>
            **Provider name**: `daysSinceCustomTime`<br>
            **Description**: Number of days elapsed since the user-specified timestamp set on an object. The condition is satisfied if the days elapsed is at least this number. If no custom timestamp is specified on an object, the condition does not apply.<br>
           - `days_since_noncurrent_time`<br>
            **Type**: `INT32`<br>
            **Provider name**: `daysSinceNoncurrentTime`<br>
            **Description**: Number of days elapsed since the noncurrent timestamp of an object. The condition is satisfied if the days elapsed is at least this number. This condition is relevant only for versioned objects. The value of the field must be a nonnegative integer. If it's zero, the object version will become eligible for Lifecycle action as soon as it becomes noncurrent.<br>
           - `is_live`<br>
            **Type**: `BOOLEAN`<br>
            **Provider name**: `isLive`<br>
            **Description**: Relevant only for versioned objects. If the value is true, this condition matches live objects; if the value is false, it matches archived objects.<br>
           - `matches_pattern`<br>
            **Type**: `STRING`<br>
            **Provider name**: `matchesPattern`<br>
            **Description**: A regular expression that satisfies the RE2 syntax. This condition is satisfied when the name of the object matches the RE2 pattern. Note: This feature is currently in the "Early Access" launch stage and is only available to a whitelisted set of users; that means that this feature may be changed in backward-incompatible ways and that it is not guaranteed to be released.<br>
           - `matches_prefix`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
            **Provider name**: `matchesPrefix`<br>
            **Description**: List of object name prefixes. This condition will be satisfied when at least one of the prefixes exactly matches the beginning of the object name.<br>
           - `matches_storage_class`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
            **Provider name**: `matchesStorageClass`<br>
            **Description**: Objects having any of the storage classes specified by this condition will be matched. Values include MULTI_REGIONAL, REGIONAL, NEARLINE, COLDLINE, ARCHIVE, STANDARD, and DURABLE_REDUCED_AVAILABILITY.<br>
           - `matches_suffix`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
            **Provider name**: `matchesSuffix`<br>
            **Description**: List of object name suffixes. This condition will be satisfied when at least one of the suffixes exactly matches the end of the object name.<br>
           - `noncurrent_time_before`<br>
            **Type**: `TIMESTAMP`<br>
            **Provider name**: `noncurrentTimeBefore`<br>
            **Description**: A date in RFC 3339 format with only the date part (for instance, "2013-01-15"). This condition is satisfied when the noncurrent time on an object is before this date in UTC. This condition is relevant only for versioned objects.<br>
           - `num_newer_versions`<br>
            **Type**: `INT32`<br>
            **Provider name**: `numNewerVersions`<br>
            **Description**: Relevant only for versioned objects. If the value is N, this condition is satisfied when there are at least N versions (including the live version) newer than this version of the object.<br>
## `location`
**Type**: `STRING`<br>
**Provider name**: `location`<br>
**Description**: The location of the bucket. Object data for objects in the bucket resides in physical storage within this region. Defaults to US. See the developer's guide for the authoritative list.<br>
## `location_type`
**Type**: `STRING`<br>
**Provider name**: `locationType`<br>
**Description**: The type of the bucket location.<br>
## `logging`
**Type**: `STRUCT`<br>
**Provider name**: `logging`<br>
**Description**: The bucket's logging configuration, which defines the destination bucket and optional name prefix for the current bucket's logs.<br>
   - `log_bucket`<br>
    **Type**: `STRING`<br>
    **Provider name**: `logBucket`<br>
    **Description**: The destination bucket where the current bucket's logs should be placed.<br>
   - `log_object_prefix`<br>
    **Type**: `STRING`<br>
    **Provider name**: `logObjectPrefix`<br>
    **Description**: A prefix for log object names.<br>
## `metageneration`
**Type**: `INT64`<br>
**Provider name**: `metageneration`<br>
**Description**: The metadata generation of this bucket.<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: The name of the bucket.<br>
## `organization_id`
**Type**: `STRING`<br>
## `owner`
**Type**: `STRUCT`<br>
**Provider name**: `owner`<br>
**Description**: The owner of the bucket. This is always the project team's owner group.<br>
   - `entity`<br>
    **Type**: `STRING`<br>
    **Provider name**: `entity`<br>
    **Description**: The entity, in the form project-owner-projectId.<br>
   - `entity_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `entityId`<br>
    **Description**: The ID for the entity.<br>
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
**Provider name**: `retentionPolicy`<br>
**Description**: The bucket's retention policy. The retention policy enforces a minimum retention time for all objects contained in the bucket, based on their creation time. Any attempt to overwrite or delete objects younger than the retention period will result in a PERMISSION_DENIED error. An unlocked retention policy can be modified or removed from the bucket via a storage.buckets.update operation. A locked retention policy cannot be removed or shortened in duration for the lifetime of the bucket. Attempting to remove or decrease period of a locked retention policy will result in a PERMISSION_DENIED error.<br>
   - `effective_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `effectiveTime`<br>
    **Description**: Server-determined value that indicates the time from which policy was enforced and effective. This value is in RFC 3339 format.<br>
   - `is_locked`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `isLocked`<br>
    **Description**: Once locked, an object retention policy cannot be modified.<br>
   - `retention_period`<br>
    **Type**: `INT64`<br>
    **Provider name**: `retentionPeriod`<br>
    **Description**: The duration in seconds that objects need to be retained. Retention duration must be greater than zero and less than 100 years. Note that enforcement of retention periods less than a day is not guaranteed. Such periods should only be used for testing purposes.<br>
## `rpo`
**Type**: `STRING`<br>
**Provider name**: `rpo`<br>
**Description**: The Recovery Point Objective (RPO) of this bucket. Set to ASYNC_TURBO to turn on Turbo Replication on a bucket.<br>
## `satisfies_pzs`
**Type**: `BOOLEAN`<br>
**Provider name**: `satisfiesPZS`<br>
**Description**: Reserved for future use.<br>
## `self_link`
**Type**: `STRING`<br>
**Provider name**: `selfLink`<br>
**Description**: The URI of this bucket.<br>
## `storage_class`
**Type**: `STRING`<br>
**Provider name**: `storageClass`<br>
**Description**: The bucket's default storage class, used whenever no storageClass is specified for a newly-created object. This defines how objects in the bucket are stored and determines the SLA and the cost of storage. Values include MULTI_REGIONAL, REGIONAL, STANDARD, NEARLINE, COLDLINE, ARCHIVE, and DURABLE_REDUCED_AVAILABILITY. If this value is not specified when the bucket is created, it will default to STANDARD. For more information, see storage classes.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `time_created`
**Type**: `TIMESTAMP`<br>
**Provider name**: `timeCreated`<br>
**Description**: The creation time of the bucket in RFC 3339 format.<br>
## `updated`
**Type**: `TIMESTAMP`<br>
**Provider name**: `updated`<br>
**Description**: The modification time of the bucket in RFC 3339 format.<br>
## `versioning`
**Type**: `STRUCT`<br>
**Provider name**: `versioning`<br>
**Description**: The bucket's versioning configuration.<br>
   - `enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `enabled`<br>
    **Description**: While set to true, versioning is fully enabled for this bucket.<br>
## `website`
**Type**: `STRUCT`<br>
**Provider name**: `website`<br>
**Description**: The bucket's website configuration, controlling how the service behaves when accessing bucket contents as a web site. See the Static Website Examples for more information.<br>
   - `main_page_suffix`<br>
    **Type**: `STRING`<br>
    **Provider name**: `mainPageSuffix`<br>
    **Description**: If the requested object path is missing, the service will ensure the path has a trailing '/', append this suffix, and attempt to retrieve the resulting object. This allows the creation of index.html objects to represent directory pages.<br>
   - `not_found_page`<br>
    **Type**: `STRING`<br>
    **Provider name**: `notFoundPage`<br>
    **Description**: If the requested object path is missing, and any mainPageSuffix object is missing, if applicable, the service will return the named object from this bucket as the content for a 404 Not Found result.<br>
