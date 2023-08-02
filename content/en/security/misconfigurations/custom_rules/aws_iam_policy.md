---
dependencies: []
disable_edit: true
---
# aws_iam_policy

## `account_id`
**Type**: `STRING`<br>
## `arn`
**Type**: `STRING`<br>
**Provider name**: `Arn`<br>
## `attachment_count`
**Type**: `INT32`<br>
**Provider name**: `AttachmentCount`<br>
**Description**: The number of entities (users, groups, and roles) that the policy is attached to.<br>
## `create_date`
**Type**: `TIMESTAMP`<br>
**Provider name**: `CreateDate`<br>
**Description**: The date and time, in <a href="http://www.iso.org/iso/iso8601">ISO 8601 date-time format</a>, when the policy was created.<br>
## `default_version_id`
**Type**: `STRING`<br>
**Provider name**: `DefaultVersionId`<br>
**Description**: The identifier for the version of the policy that is set as the default version.<br>
## `description`
**Type**: `STRING`<br>
**Provider name**: `Description`<br>
**Description**: A friendly description of the policy. This element is included in the response to the GetPolicy operation. It is not included in the response to the ListPolicies operation.<br>
## `is_attachable`
**Type**: `BOOLEAN`<br>
**Provider name**: `IsAttachable`<br>
**Description**: Specifies whether the policy can be attached to an IAM user, group, or role.<br>
## `path`
**Type**: `STRING`<br>
**Provider name**: `Path`<br>
**Description**: The path to the policy. For more information about paths, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html">IAM identifiers</a> in the <i>IAM User Guide</i>.<br>
## `permissions_boundary_usage_count`
**Type**: `INT32`<br>
**Provider name**: `PermissionsBoundaryUsageCount`<br>
**Description**: The number of entities (users and roles) for which the policy is used to set the permissions boundary.  For more information about permissions boundaries, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html">Permissions boundaries for IAM identities </a> in the <i>IAM User Guide</i>.<br>
## `policy_id`
**Type**: `STRING`<br>
**Provider name**: `PolicyId`<br>
**Description**: The stable and unique string identifying the policy. For more information about IDs, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html">IAM identifiers</a> in the <i>IAM User Guide</i>.<br>
## `policy_name`
**Type**: `STRING`<br>
**Provider name**: `PolicyName`<br>
**Description**: The friendly name (not ARN) identifying the policy.<br>
## `policy_role`
**Type**: `STRUCT`<br>
**Provider name**: `PolicyRole`<br>
   - `role_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `RoleId`<br>
    **Description**: The stable and unique string identifying the role. For more information about IDs, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html">IAM identifiers</a> in the <i>IAM User Guide</i>.<br>
   - `role_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `RoleName`<br>
    **Description**: The name (friendly name, not ARN) identifying the role.<br>
## `policy_version`
**Type**: `STRUCT`<br>
**Provider name**: `PolicyVersion`<br>
   - `create_date`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `CreateDate`<br>
    **Description**: The date and time, in <a href="http://www.iso.org/iso/iso8601">ISO 8601 date-time format</a>, when the policy version was created.<br>
   - `document`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Document`<br>
    **Description**: The policy document. The policy document is returned in the response to the GetPolicyVersion and GetAccountAuthorizationDetails operations. It is not returned in the response to the CreatePolicyVersion or ListPolicyVersions operations.  The policy document returned in this structure is URL-encoded compliant with <a href="https://tools.ietf.org/html/rfc3986">RFC 3986</a>. You can use a URL decoding method to convert the policy back to plain JSON text. For example, if you use Java, you can use the <code>decode</code> method of the <code>java.net.URLDecoder</code> utility class in the Java SDK. Other languages and SDKs provide similar functionality.<br>
   - `is_default_version`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `IsDefaultVersion`<br>
    **Description**: Specifies whether the policy version is set as the policy's default version.<br>
   - `version_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `VersionId`<br>
    **Description**: The identifier for the policy version. Policy version identifiers always begin with <code>v</code> (always lowercase). When a policy is created, the first policy version is <code>v1</code>.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `update_date`
**Type**: `TIMESTAMP`<br>
**Provider name**: `UpdateDate`<br>
**Description**: The date and time, in <a href="http://www.iso.org/iso/iso8601">ISO 8601 date-time format</a>, when the policy was last updated. When a policy has only one version, this field contains the date and time when the policy was created. When a policy has more than one version, this field contains the date and time when the most recent policy version was created.<br>
