---
dependencies: []
disable_edit: true
---
# aws_iam_role

## `account_id`
**Type**: `STRING`<br>
## `arn`
**Type**: `STRING`<br>
**Provider name**: `Arn`<br>
**Description**: The Amazon Resource Name (ARN) specifying the role. For more information about ARNs and how to use them in policies, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html">IAM identifiers</a> in the <i>IAM User Guide</i> guide.<br>
## `assume_role_policy_document`
**Type**: `STRING`<br>
**Provider name**: `AssumeRolePolicyDocument`<br>
**Description**: The policy that grants an entity permission to assume the role.<br>
## `create_date`
**Type**: `TIMESTAMP`<br>
**Provider name**: `CreateDate`<br>
**Description**: The date and time, in <a href="http://www.iso.org/iso/iso8601">ISO 8601 date-time format</a>, when the role was created.<br>
## `description`
**Type**: `STRING`<br>
**Provider name**: `Description`<br>
**Description**: A description of the role that you provide.<br>
## `max_session_duration`
**Type**: `INT32`<br>
**Provider name**: `MaxSessionDuration`<br>
**Description**: The maximum session duration (in seconds) for the specified role. Anyone who uses the CLI, or API to assume the role can specify the duration using the optional <code>DurationSeconds</code> API parameter or <code>duration-seconds</code> CLI parameter.<br>
## `path`
**Type**: `STRING`<br>
**Provider name**: `Path`<br>
**Description**: The path to the role. For more information about paths, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html">IAM identifiers</a> in the <i>IAM User Guide</i>.<br>
## `permissions_boundary`
**Type**: `STRUCT`<br>
**Provider name**: `PermissionsBoundary`<br>
**Description**: The ARN of the policy used to set the permissions boundary for the role. For more information about permissions boundaries, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html">Permissions boundaries for IAM identities </a> in the <i>IAM User Guide</i>.<br>
   - `permissions_boundary_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `PermissionsBoundaryArn`<br>
    **Description**: The ARN of the policy used to set the permissions boundary for the user or role.<br>
   - `permissions_boundary_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `PermissionsBoundaryType`<br>
    **Description**: The permissions boundary usage type that indicates what type of IAM resource is used as the permissions boundary for an entity. This data type can only have a value of <code>Policy</code>.<br>
## `role_id`
**Type**: `STRING`<br>
**Provider name**: `RoleId`<br>
**Description**: The stable and unique string identifying the role. For more information about IDs, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html">IAM identifiers</a> in the <i>IAM User Guide</i>.<br>
## `role_last_used`
**Type**: `STRUCT`<br>
**Provider name**: `RoleLastUsed`<br>
**Description**: Contains information about the last time that an IAM role was used. This includes the date and time and the Region in which the role was last used. Activity is only reported for the trailing 400 days. This period can be shorter if your Region began supporting these features within the last year. The role might have been used more than 400 days ago. For more information, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_access-advisor.html#access-advisor_tracking-period">Regions where data is tracked</a> in the <i>IAM User Guide</i>.<br>
   - `last_used_date`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `LastUsedDate`<br>
    **Description**: The date and time, in <a href="http://www.iso.org/iso/iso8601">ISO 8601 date-time format</a> that the role was last used. This field is null if the role has not been used within the IAM tracking period. For more information about the tracking period, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_access-advisor.html#access-advisor_tracking-period">Regions where data is tracked</a> in the <i>IAM User Guide</i>.<br>
   - `region`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Region`<br>
    **Description**: The name of the Amazon Web Services Region in which the role was last used.<br>
## `role_name`
**Type**: `STRING`<br>
**Provider name**: `RoleName`<br>
**Description**: The friendly name that identifies the role.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
