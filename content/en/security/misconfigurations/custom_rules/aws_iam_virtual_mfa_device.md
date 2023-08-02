---
dependencies: []
disable_edit: true
---
# aws_iam_virtual_mfa_device

## `account_id`
**Type**: `STRING`<br>
## `enable_date`
**Type**: `TIMESTAMP`<br>
**Provider name**: `EnableDate`<br>
**Description**: The date and time on which the virtual MFA device was enabled.<br>
## `serial_number`
**Type**: `STRING`<br>
**Provider name**: `SerialNumber`<br>
**Description**: The serial number associated with <code>VirtualMFADevice</code>.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `user`
**Type**: `STRUCT`<br>
**Provider name**: `User`<br>
**Description**: The IAM user associated with this virtual MFA device.<br>
   - `arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Arn`<br>
    **Description**: The Amazon Resource Name (ARN) that identifies the user. For more information about ARNs and how to use ARNs in policies, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html">IAM Identifiers</a> in the <i>IAM User Guide</i>.<br>
   - `create_date`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `CreateDate`<br>
    **Description**: The date and time, in <a href="http://www.iso.org/iso/iso8601">ISO 8601 date-time format</a>, when the user was created.<br>
   - `password_last_used`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `PasswordLastUsed`<br>
    **Description**: The date and time, in <a href="http://www.iso.org/iso/iso8601">ISO 8601 date-time format</a>, when the user's password was last used to sign in to an Amazon Web Services website. For a list of Amazon Web Services websites that capture a user's last sign-in time, see the <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/credential-reports.html">Credential reports</a> topic in the <i>IAM User Guide</i>. If a password is used more than once in a five-minute span, only the first use is returned in this field. If the field is null (no value), then it indicates that they never signed in with a password. This can be because: <ul> <li> The user never had a password. </li> <li> A password exists but has not been used since IAM started tracking this information on October 20, 2014. </li> </ul> A null value does not mean that the user <i>never</i> had a password. Also, if the user does not currently have a password but had one in the past, then this field contains the date and time the most recent password was used. This value is returned only in the GetUser and ListUsers operations.<br>
   - `path`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Path`<br>
    **Description**: The path to the user. For more information about paths, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html">IAM identifiers</a> in the <i>IAM User Guide</i>. The ARN of the policy used to set the permissions boundary for the user.<br>
   - `permissions_boundary`<br>
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
   - `user_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `UserId`<br>
    **Description**: The stable and unique string identifying the user. For more information about IDs, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html">IAM identifiers</a> in the <i>IAM User Guide</i>.<br>
   - `user_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `UserName`<br>
    **Description**: The friendly name identifying the user.<br>
