---
dependencies: []
disable_edit: true
---
# aws_iam_user

## `account_id`
**Type**: `STRING`<br>
## `arn`
**Type**: `STRING`<br>
**Provider name**: `Arn`<br>
**Description**: The Amazon Resource Name (ARN) that identifies the user. For more information about ARNs and how to use ARNs in policies, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html">IAM Identifiers</a> in the <i>IAM User Guide</i>.<br>
## `attached_policies`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `AttachedPolicies`<br>
**Description**: A list of the attached policies.<br>
   - `policy_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `PolicyArn`<br>
   - `policy_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `PolicyName`<br>
    **Description**: The friendly name of the attached policy.<br>
## `create_date`
**Type**: `TIMESTAMP`<br>
**Provider name**: `CreateDate`<br>
**Description**: The date and time, in <a href="http://www.iso.org/iso/iso8601">ISO 8601 date-time format</a>, when the user was created.<br>
## `login_profile`
**Type**: `STRUCT`<br>
**Provider name**: `LoginProfile`<br>
   - `create_date`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `CreateDate`<br>
    **Description**: The date when the password for the user was created.<br>
   - `password_reset_required`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `PasswordResetRequired`<br>
    **Description**: Specifies whether the user is required to set a new password on next sign-in.<br>
   - `user_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `UserName`<br>
    **Description**: The name of the user, which can be used for signing in to the Amazon Web Services Management Console.<br>
## `mfa_devices`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `MFADevices`<br>
**Description**: A list of MFA devices.<br>
   - `enable_date`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `EnableDate`<br>
    **Description**: The date when the MFA device was enabled for the user.<br>
   - `serial_number`<br>
    **Type**: `STRING`<br>
    **Provider name**: `SerialNumber`<br>
    **Description**: The serial number that uniquely identifies the MFA device. For virtual MFA devices, the serial number is the device ARN.<br>
   - `user_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `UserName`<br>
    **Description**: The user with whom the MFA device is associated.<br>
## `password_last_used`
**Type**: `TIMESTAMP`<br>
**Provider name**: `PasswordLastUsed`<br>
**Description**: The date and time, in <a href="http://www.iso.org/iso/iso8601">ISO 8601 date-time format</a>, when the user's password was last used to sign in to an Amazon Web Services website. For a list of Amazon Web Services websites that capture a user's last sign-in time, see the <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/credential-reports.html">Credential reports</a> topic in the <i>IAM User Guide</i>. If a password is used more than once in a five-minute span, only the first use is returned in this field. If the field is null (no value), then it indicates that they never signed in with a password. This can be because: <ul> <li> The user never had a password. </li> <li> A password exists but has not been used since IAM started tracking this information on October 20, 2014. </li> </ul> A null value does not mean that the user <i>never</i> had a password. Also, if the user does not currently have a password but had one in the past, then this field contains the date and time the most recent password was used. This value is returned only in the GetUser and ListUsers operations.<br>
## `path`
**Type**: `STRING`<br>
**Provider name**: `Path`<br>
**Description**: The path to the user. For more information about paths, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html">IAM identifiers</a> in the <i>IAM User Guide</i>. The ARN of the policy used to set the permissions boundary for the user.<br>
## `permissions_boundary`
**Type**: `STRUCT`<br>
**Provider name**: `PermissionsBoundary`<br>
**Description**: For more information about permissions boundaries, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html">Permissions boundaries for IAM identities </a> in the <i>IAM User Guide</i>.<br>
   - `permissions_boundary_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `PermissionsBoundaryArn`<br>
    **Description**: The ARN of the policy used to set the permissions boundary for the user or role.<br>
   - `permissions_boundary_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `PermissionsBoundaryType`<br>
    **Description**: The permissions boundary usage type that indicates what type of IAM resource is used as the permissions boundary for an entity. This data type can only have a value of <code>Policy</code>.<br>
## `policy_names`
**Type**: `UNORDERED_LIST_STRING`<br>
**Provider name**: `PolicyNames`<br>
**Description**: A list of policy names.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `user_id`
**Type**: `STRING`<br>
**Provider name**: `UserId`<br>
**Description**: The stable and unique string identifying the user. For more information about IDs, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html">IAM identifiers</a> in the <i>IAM User Guide</i>.<br>
## `user_name`
**Type**: `STRING`<br>
**Provider name**: `UserName`<br>
**Description**: The friendly name identifying the user.<br>
## `virtual_mfa_devices`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `VirtualMFADevices`<br>
**Description**: The list of virtual MFA devices in the current account that match the <code>AssignmentStatus</code> value that was passed in the request.<br>
   - `enable_date`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `EnableDate`<br>
    **Description**: The date and time on which the virtual MFA device was enabled.<br>
   - `serial_number`<br>
    **Type**: `STRING`<br>
    **Provider name**: `SerialNumber`<br>
    **Description**: The serial number associated with <code>VirtualMFADevice</code>.<br>
