---
dependencies: []
disable_edit: true
---
# aws_iam_credential_report
Refer to the AWS documentation for more details [1]

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_getting-report.html#id_credentials_understanding_the_report_format

## `access_key_1_active`
**Type**: `BOOLEAN`<br>
**Description**: When the user has an access key and the access key's status is Active, this value is TRUE. Otherwise it is FALSE.<br>
## `access_key_1_last_rotated`
**Type**: `TIMESTAMP`<br>
**Description**: The date and time, in ISO 8601 date-time format, when the user's access key was created or last changed. If the user does not have an active access key, the value in this field is N/A (not applicable).<br>
## `access_key_1_last_used_date`
**Type**: `TIMESTAMP`<br>
**Description**: The date and time, in ISO 8601 date-time format, when the user's access key was most recently used to sign an AWS API request. When an access key is used more than once in a 15-minute span, only the first use is recorded in this field.<br>
## `access_key_1_last_used_region`
**Type**: `STRING`<br>
**Description**: The <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html">AWS Region</a> in which the access key was most recently used. When an access key is used more than once in a 15-minute span, only the first use is recorded in this field.<br>
## `access_key_1_last_used_service`
**Type**: `STRING`<br>
**Description**: The AWS service that was most recently accessed with the access key. The value in this field uses the service's namespace—for example, s3 for Amazon S3 and ec2 for Amazon EC2. When an access key is used more than once in a 15-minute span, only the first use is recorded in this field.<br>
## `access_key_2_active`
**Type**: `BOOLEAN`<br>
**Description**: When the user has a second access key and the second key's status is Active, this value is TRUE. Otherwise it is FALSE.<br>
## `access_key_2_last_rotated`
**Type**: `TIMESTAMP`<br>
**Description**: The date and time, in ISO 8601 date-time format, when the user's second access key was created or last changed. If the user does not have a second active access key, the value in this field is N/A (not applicable).<br>
## `access_key_2_last_used_date`
**Type**: `TIMESTAMP`<br>
**Description**: The date and time, in ISO 8601 date-time format, when the user's second access key was most recently used to sign an AWS API request. When an access key is used more than once in a 15-minute span, only the first use is recorded in this field.<br>
## `access_key_2_last_used_region`
**Type**: `STRING`<br>
**Description**: The <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html">AWS Region</a> in which the user's second access key was most recently used. When an access key is used more than once in a 15-minute span, only the first use is recorded in this field.<br>
## `access_key_2_last_used_service`
**Type**: `STRING`<br>
**Description**: The AWS service that was most recently accessed with the user's second access key. The value in this field uses the service's namespace—for example, s3 for Amazon S3 and ec2 for Amazon EC2. When an access key is used more than once in a 15-minute span, only the first use is recorded in this field.<br>
## `account_id`
**Type**: `STRING`<br>
## `arn`
**Type**: `STRING`<br>
**Description**: The Amazon Resource Name (ARN) of the user. For more information about ARNs, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html#identifiers-arns">IAM ARNs</a>.<br>
## `cert_1_active`
**Type**: `BOOLEAN`<br>
**Description**: When the user has an X.509 signing certificate and that certificate's status is Active, this value is TRUE. Otherwise it is FALSE.<br>
## `cert_1_last_rotated`
**Type**: `TIMESTAMP`<br>
**Description**: The date and time, in ISO 8601 date-time format, when the user's signing certificate was created or last changed. If the user does not have an active signing certificate, the value in this field is N/A (not applicable).<br>
## `cert_2_active`
**Type**: `BOOLEAN`<br>
**Description**: When the user has a second X.509 signing certificate and that certificate's status is Active, this value is TRUE. Otherwise it is FALSE.<br>
## `cert_2_last_rotated`
**Type**: `TIMESTAMP`<br>
**Description**: The date and time, in ISO 8601 date-time format, when the user's second signing certificate was created or last changed. If the user does not have a second active signing certificate, the value in this field is N/A (not applicable).<br>
## `mfa_active`
**Type**: `BOOLEAN`<br>
**Description**: When a <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html">multi-factor authentication</a> (MFA) device has been enabled for the user, this value is TRUE. Otherwise it is FALSE.<br>
## `password_enabled`
**Type**: `BOOLEAN`<br>
**Description**: When the user has a password, this value is TRUE. Otherwise it is FALSE.The value for the AWS account root user is always not_supported.<br>
## `password_last_changed`
**Type**: `TIMESTAMP`<br>
**Description**: The date and time when the user's password was last set, in <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601 date-time format</a>. If the user does not have a password, the value in this field is N/A (not applicable). The value for the AWS account (root) is always not_supported.<br>
## `password_last_used`
**Type**: `TIMESTAMP`<br>
**Description**: The date and time when the AWS account root user or IAM user's password was last used to sign in to an AWS website, in <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO 8601 date-time format</a>. AWS websites that capture a user's last sign-in time are the AWS Management Console, the AWS Discussion Forums, and the AWS Marketplace. When a password is used more than once in a 5-minute span, only the first use is recorded in this field.<br>
## `password_next_rotation`
**Type**: `TIMESTAMP`<br>
**Description**: When the account has a <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html">password policy</a> that requires password rotation, this field contains the date and time, in <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601 date-time format</a>, when the user is required to set a new password. The value for the AWS account (root) is always not_supported.<br>
## `user`
**Type**: `STRING`<br>
**Description**: The friendly name of the user.<br>
## `user_creation_time`
**Type**: `TIMESTAMP`<br>
**Description**: The date and time when the user was created, in <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601 date-time format</a>.<br>
