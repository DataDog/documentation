---
aliases:
- lzl-319-p2l
- /security_monitoring/default_rules/lzl-319-p2l
- /security_monitoring/default_rules/cis-gcp-1.3.0-1.11
disable_edit: true
integration_id: google_iam_policy
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_iam_policy
title: Separation of duties is enforced while assigning KMS-related roles to users
type: security_rules
---

## Description
It is recommended that the principle of 'Separation of Duties' is enforced while assigning KMS related roles to users.

## Rationale
The built-in/predefined IAM role `Cloud KMS Admin` allows the user/identity to create, delete, and manage service account(s). 

The built-in/predefined IAM role `Cloud KMS CryptoKey Encrypter/Decrypter` allows the user/identity (with adequate privileges on concerned resources) to encrypt and decrypt data at rest using an encryption key(s).

The built-in/predefined IAM role `Cloud KMS CryptoKey Encrypter` allows the user/identity (with adequate privileges on concerned resources) to encrypt data at rest using an encryption key(s).

The built-in/predefined IAM role `Cloud KMS CryptoKey Decrypter` allows the user/identity (with adequate privileges on concerned resources) to decrypt data at rest using an encryption key(s).

Separation of duties is the concept of ensuring that one individual does not have all necessary permissions to be able to complete a malicious action. In Cloud KMS, this could be an action such as using a key to access and decrypt data a user should not normally have access to. Separation of duties is a business control typically used in larger organizations, meant to help avoid security or privacy incidents and errors. It is considered best practice.

No user(s) should have `Cloud KMS Admin` and any of the `Cloud KMS CryptoKey Encrypter/Decrypter`, `Cloud KMS CryptoKey Encrypter`, `Cloud KMS CryptoKey Decrypter` roles assigned at the same time.

### Impact
Removed roles should be assigned to another user based on business needs.

### Additional Information
Users granted Owner (roles/owner) and Editor (roles/editor) roles have privileges equivalent to `Cloud KMS Admin` and `Cloud KMS CryptoKey Encrypter/Decrypter`. To avoid misuse, Owner and Editor roles should be granted to a very limited group of users. Use of these primitive privileges should be minimal. These requirements are addressed in our other rules.

## Remediation

### From the console
1. Go to **IAM & Admin/IAM** using [https://console.cloud.google.com/iam-admin/iam][1]
2. For any member having `Cloud KMS Admin` and any of the `Cloud KMS CryptoKey Encrypter/Decrypter`, `Cloud KMS CryptoKey Encrypter`, `Cloud KMS CryptoKey Decrypter` roles granted/assigned, click the **Delete Bin** icon to remove the role from the member.

## References
1. [https://cloud.google.com/kms/docs/separation-of-duties][2]

[1]: https://console.cloud.google.com/iam-admin/iam
[2]: https://cloud.google.com/kms/docs/separation-of-duties
