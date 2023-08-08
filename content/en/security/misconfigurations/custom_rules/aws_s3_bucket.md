---
dependencies: []
disable_edit: true
---
# aws_s3_bucket

## `account_id`
**Type**: `STRING`<br>
## `bucket_arn`
**Type**: `STRING`<br>
## `bucket_versioning`
**Type**: `STRUCT`<br>
**Provider name**: `GetBucketVersioningOutput`<br>
   - `mfa_delete`<br>
    **Type**: `STRING`<br>
    **Provider name**: `MFADelete`<br>
    **Description**: Specifies whether MFA delete is enabled in the bucket versioning configuration. This element is only returned if the bucket has been configured with MFA delete. If the bucket has never been so configured, this element is not returned.<br>
   - `status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Status`<br>
    **Description**: The versioning state of the bucket.<br>
## `bucket_website`
**Type**: `STRUCT`<br>
**Provider name**: `GetBucketWebsiteOutput`<br>
   - `error_document`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `ErrorDocument`<br>
    **Description**: The object key name of the website error document to use for 4XX class errors.<br>
       - `key`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Key`<br>
        **Description**: The object key name to use when a 4XX class error occurs. <important> Replacement must be made for object keys containing special characters (such as carriage returns) when using XML requests. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html#object-key-xml-related-constraints"> XML related object key constraints</a>. </important><br>
   - `index_document`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `IndexDocument`<br>
    **Description**: The name of the index document for the website (for example <code>index.html</code>).<br>
       - `suffix`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Suffix`<br>
        **Description**: A suffix that is appended to a request that is for a directory on the website endpoint (for example,if the suffix is index.html and you make a request to samplebucket/images/ the data that is returned will be for the object with the key name images/index.html) The suffix must not be empty and must not include a slash character. <important> Replacement must be made for object keys containing special characters (such as carriage returns) when using XML requests. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html#object-key-xml-related-constraints"> XML related object key constraints</a>. </important><br>
   - `redirect_all_requests_to`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `RedirectAllRequestsTo`<br>
    **Description**: Specifies the redirect behavior of all requests to a website endpoint of an Amazon S3 bucket.<br>
       - `host_name`<br>
        **Type**: `STRING`<br>
        **Provider name**: `HostName`<br>
        **Description**: Name of the host where requests are redirected.<br>
       - `protocol`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Protocol`<br>
        **Description**: Protocol to use when redirecting requests. The default is the protocol that is used in the original request.<br>
   - `routing_rules`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `RoutingRules`<br>
    **Description**: Rules that define when a redirect is applied and the redirect behavior.<br>
       - `condition`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `Condition`<br>
        **Description**: A container for describing a condition that must be met for the specified redirect to apply. For example, 1. If request is for pages in the <code>/docs</code> folder, redirect to the <code>/documents</code> folder. 2. If request results in HTTP error 4xx, redirect request to another host where you might process the error.<br>
           - `http_error_code_returned_equals`<br>
            **Type**: `STRING`<br>
            **Provider name**: `HttpErrorCodeReturnedEquals`<br>
            **Description**: The HTTP error code when the redirect is applied. In the event of an error, if the error code equals this value, then the specified redirect is applied. Required when parent element <code>Condition</code> is specified and sibling <code>KeyPrefixEquals</code> is not specified. If both are specified, then both must be true for the redirect to be applied.<br>
           - `key_prefix_equals`<br>
            **Type**: `STRING`<br>
            **Provider name**: `KeyPrefixEquals`<br>
            **Description**: The object key name prefix when the redirect is applied. For example, to redirect requests for <code>ExamplePage.html</code>, the key prefix will be <code>ExamplePage.html</code>. To redirect request for all pages with the prefix <code>docs/</code>, the key prefix will be <code>/docs</code>, which identifies all objects in the <code>docs/</code> folder. Required when the parent element <code>Condition</code> is specified and sibling <code>HttpErrorCodeReturnedEquals</code> is not specified. If both conditions are specified, both must be true for the redirect to be applied. <important> Replacement must be made for object keys containing special characters (such as carriage returns) when using XML requests. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html#object-key-xml-related-constraints"> XML related object key constraints</a>. </important><br>
       - `redirect`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `Redirect`<br>
        **Description**: Container for redirect information. You can redirect requests to another host, to another page, or with another protocol. In the event of an error, you can specify a different error code to return.<br>
           - `host_name`<br>
            **Type**: `STRING`<br>
            **Provider name**: `HostName`<br>
            **Description**: The host name to use in the redirect request.<br>
           - `http_redirect_code`<br>
            **Type**: `STRING`<br>
            **Provider name**: `HttpRedirectCode`<br>
            **Description**: The HTTP redirect code to use on the response. Not required if one of the siblings is present.<br>
           - `protocol`<br>
            **Type**: `STRING`<br>
            **Provider name**: `Protocol`<br>
            **Description**: Protocol to use when redirecting requests. The default is the protocol that is used in the original request.<br>
           - `replace_key_prefix_with`<br>
            **Type**: `STRING`<br>
            **Provider name**: `ReplaceKeyPrefixWith`<br>
            **Description**: The object key prefix to use in the redirect request. For example, to redirect requests for all pages with prefix <code>docs/</code> (objects in the <code>docs/</code> folder) to <code>documents/</code>, you can set a condition block with <code>KeyPrefixEquals</code> set to <code>docs/</code> and in the Redirect set <code>ReplaceKeyPrefixWith</code> to <code>/documents</code>. Not required if one of the siblings is present. Can be present only if <code>ReplaceKeyWith</code> is not provided. <important> Replacement must be made for object keys containing special characters (such as carriage returns) when using XML requests. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html#object-key-xml-related-constraints"> XML related object key constraints</a>. </important><br>
           - `replace_key_with`<br>
            **Type**: `STRING`<br>
            **Provider name**: `ReplaceKeyWith`<br>
            **Description**: The specific object key to use in the redirect request. For example, redirect request to <code>error.html</code>. Not required if one of the siblings is present. Can be present only if <code>ReplaceKeyPrefixWith</code> is not provided. <important> Replacement must be made for object keys containing special characters (such as carriage returns) when using XML requests. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html#object-key-xml-related-constraints"> XML related object key constraints</a>. </important><br>
## `creation_date`
**Type**: `TIMESTAMP`<br>
**Provider name**: `CreationDate`<br>
**Description**: Date the bucket was created. This date can change when making changes to your bucket, such as editing its bucket policy.<br>
## `grants`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `Grants`<br>
**Description**: A list of grants.<br>
   - `grantee`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `Grantee`<br>
    **Description**: The person being granted permissions.<br>
       - `display_name`<br>
        **Type**: `STRING`<br>
        **Provider name**: `DisplayName`<br>
        **Description**: Screen name of the grantee.<br>
       - `email_address`<br>
        **Type**: `STRING`<br>
        **Provider name**: `EmailAddress`<br>
        **Description**: Email address of the grantee. <note> Using email addresses to specify a grantee is only supported in the following Amazon Web Services Regions:  <ul> <li> US East (N. Virginia) </li> <li> US West (N. California) </li> <li>  US West (Oregon) </li> <li>  Asia Pacific (Singapore) </li> <li> Asia Pacific (Sydney) </li> <li> Asia Pacific (Tokyo) </li> <li> Europe (Ireland) </li> <li> South America (São Paulo) </li> </ul> For a list of all the Amazon S3 supported Regions and endpoints, see <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region">Regions and Endpoints</a> in the Amazon Web Services General Reference. </note><br>
       - `id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `ID`<br>
        **Description**: The canonical user ID of the grantee.<br>
       - `type`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Type`<br>
        **Description**: Type of grantee<br>
       - `uri`<br>
        **Type**: `STRING`<br>
        **Provider name**: `URI`<br>
        **Description**: URI of the grantee group.<br>
   - `permission`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Permission`<br>
    **Description**: Specifies the permission given to the grantee.<br>
## `logging_enabled`
**Type**: `STRUCT`<br>
**Provider name**: `LoggingEnabled`<br>
   - `target_bucket`<br>
    **Type**: `STRING`<br>
    **Provider name**: `TargetBucket`<br>
    **Description**: Specifies the bucket where you want Amazon S3 to store server access logs. You can have your logs delivered to any bucket that you own, including the same bucket that is being logged. You can also configure multiple buckets to deliver their logs to the same target bucket. In this case, you should choose a different <code>TargetPrefix</code> for each source bucket so that the delivered log files can be distinguished by key.<br>
   - `target_grants`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `TargetGrants`<br>
    **Description**: Container for granting information. Buckets that use the bucket owner enforced setting for Object Ownership don't support target grants. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/enable-server-access-logging.html#grant-log-delivery-permissions-general">Permissions for server access log delivery</a> in the <i>Amazon S3 User Guide</i>.<br>
       - `grantee`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `Grantee`<br>
        **Description**: Container for the person being granted permissions.<br>
           - `display_name`<br>
            **Type**: `STRING`<br>
            **Provider name**: `DisplayName`<br>
            **Description**: Screen name of the grantee.<br>
           - `email_address`<br>
            **Type**: `STRING`<br>
            **Provider name**: `EmailAddress`<br>
            **Description**: Email address of the grantee. <note> Using email addresses to specify a grantee is only supported in the following Amazon Web Services Regions:  <ul> <li> US East (N. Virginia) </li> <li> US West (N. California) </li> <li>  US West (Oregon) </li> <li>  Asia Pacific (Singapore) </li> <li> Asia Pacific (Sydney) </li> <li> Asia Pacific (Tokyo) </li> <li> Europe (Ireland) </li> <li> South America (São Paulo) </li> </ul> For a list of all the Amazon S3 supported Regions and endpoints, see <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region">Regions and Endpoints</a> in the Amazon Web Services General Reference. </note><br>
           - `id`<br>
            **Type**: `STRING`<br>
            **Provider name**: `ID`<br>
            **Description**: The canonical user ID of the grantee.<br>
           - `type`<br>
            **Type**: `STRING`<br>
            **Provider name**: `Type`<br>
            **Description**: Type of grantee<br>
           - `uri`<br>
            **Type**: `STRING`<br>
            **Provider name**: `URI`<br>
            **Description**: URI of the grantee group.<br>
       - `permission`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Permission`<br>
        **Description**: Logging permissions assigned to the grantee for the bucket.<br>
   - `target_prefix`<br>
    **Type**: `STRING`<br>
    **Provider name**: `TargetPrefix`<br>
    **Description**: A prefix for all log object keys. If you store log files from multiple Amazon S3 buckets in a single bucket, you can use a prefix to distinguish which log files came from which bucket.<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `Name`<br>
**Description**: The name of the bucket.<br>
## `owner`
**Type**: `STRUCT`<br>
**Provider name**: `Owner`<br>
**Description**: Container for the bucket owner's display name and ID.<br>
   - `display_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DisplayName`<br>
    **Description**: Container for the display name of the owner.<br>
   - `id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ID`<br>
    **Description**: Container for the ID of the owner.<br>
## `policy_status`
**Type**: `STRUCT`<br>
**Provider name**: `PolicyStatus`<br>
   - `is_public`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `IsPublic`<br>
    **Description**: The policy status for this bucket. <code>TRUE</code> indicates that this bucket is public. <code>FALSE</code> indicates that the bucket is not public.<br>
## `public_access_block_configuration`
**Type**: `STRUCT`<br>
**Provider name**: `PublicAccessBlockConfiguration`<br>
   - `block_public_acls`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `BlockPublicAcls`<br>
    **Description**: Specifies whether Amazon S3 should block public access control lists (ACLs) for this bucket and objects in this bucket. Setting this element to <code>TRUE</code> causes the following behavior: <ul> <li> PUT Bucket ACL and PUT Object ACL calls fail if the specified ACL is public. </li> <li> PUT Object calls fail if the request includes a public ACL. </li> <li> PUT Bucket calls fail if the request includes a public ACL. </li> </ul> Enabling this setting doesn't affect existing policies or ACLs.<br>
   - `block_public_policy`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `BlockPublicPolicy`<br>
    **Description**: Specifies whether Amazon S3 should block public bucket policies for this bucket. Setting this element to <code>TRUE</code> causes Amazon S3 to reject calls to PUT Bucket policy if the specified bucket policy allows public access.  Enabling this setting doesn't affect existing bucket policies.<br>
   - `ignore_public_acls`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `IgnorePublicAcls`<br>
    **Description**: Specifies whether Amazon S3 should ignore public ACLs for this bucket and objects in this bucket. Setting this element to <code>TRUE</code> causes Amazon S3 to ignore all public ACLs on this bucket and objects in this bucket. Enabling this setting doesn't affect the persistence of any existing ACLs and doesn't prevent new public ACLs from being set.<br>
   - `restrict_public_buckets`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `RestrictPublicBuckets`<br>
    **Description**: Specifies whether Amazon S3 should restrict public bucket policies for this bucket. Setting this element to <code>TRUE</code> restricts access to this bucket to only Amazon Web Service principals and authorized users within this account if the bucket has a public policy. Enabling this setting doesn't affect previously stored bucket policies, except that public and cross-account access within any public bucket policy, including non-public delegation to specific accounts, is blocked.<br>
## `server_side_encryption_configuration`
**Type**: `STRUCT`<br>
**Provider name**: `ServerSideEncryptionConfiguration`<br>
   - `rules`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `Rules`<br>
    **Description**: Container for information about a particular server-side encryption configuration rule.<br>
       - `apply_server_side_encryption_by_default`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `ApplyServerSideEncryptionByDefault`<br>
        **Description**: Specifies the default server-side encryption to apply to new objects in the bucket. If a PUT Object request doesn't specify any server-side encryption, this default encryption will be applied.<br>
           - `kms_master_key_id`<br>
            **Type**: `STRING`<br>
            **Provider name**: `KMSMasterKeyID`<br>
            **Description**: Amazon Web Services Key Management Service (KMS) customer Amazon Web Services KMS key ID to use for the default encryption. This parameter is allowed if and only if <code>SSEAlgorithm</code> is set to <code>aws:kms</code>. You can specify the key ID or the Amazon Resource Name (ARN) of the KMS key. However, if you are using encryption with cross-account or Amazon Web Services service operations you must use a fully qualified KMS key ARN. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html#bucket-encryption-update-bucket-policy">Using encryption for cross-account operations</a>.   <b>For example:</b>  <ul> <li> Key ID: <code>1234abcd-12ab-34cd-56ef-1234567890ab</code>  </li> <li> Key ARN: <code>arn:aws:kms:us-east-2:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab</code>  </li> </ul> <important> Amazon S3 only supports symmetric KMS keys and not asymmetric KMS keys. For more information, see <a href="https://docs.aws.amazon.com/kms/latest/developerguide/symmetric-asymmetric.html">Using symmetric and asymmetric keys</a> in the <i>Amazon Web Services Key Management Service Developer Guide</i>. </important><br>
           - `sse_algorithm`<br>
            **Type**: `STRING`<br>
            **Provider name**: `SSEAlgorithm`<br>
            **Description**: Server-side encryption algorithm to use for the default encryption.<br>
       - `bucket_key_enabled`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `BucketKeyEnabled`<br>
        **Description**: Specifies whether Amazon S3 should use an S3 Bucket Key with server-side encryption using KMS (SSE-KMS) for new objects in the bucket. Existing objects are not affected. Setting the <code>BucketKeyEnabled</code> element to <code>true</code> causes Amazon S3 to use an S3 Bucket Key. By default, S3 Bucket Key is not enabled. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-key.html">Amazon S3 Bucket Keys</a> in the <i>Amazon S3 User Guide</i>.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
