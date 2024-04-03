---
bundle: com.datadoghq.aws.iam
bundle_title: AWS IAM
description: Delete all items attached to the IAM user; then delete the user.
icon:
  integration_id: aws-iam
  type: integration_logo
input: '#/$defs/DeleteUserInputs'
inputFieldOrder:
- userName
keywords:
- delete
- remove
output: '#/$defs/DeleteUserOutputs'
permissions:
- iam:DeleteUser
- iam:DeleteLoginProfile
- iam:ListGroupsForUser
- iam:RemoveUserFromGroup
- iam:ListAccessKeys
- iam:DeleteAccessKey
- iam:ListSigningCertificates
- iam:DeleteSigningCertificate
- iam:ListSSHPublicKeys
- iam:DeleteSSHPublicKey
- iam:ListServiceSpecificCredentials
- iam:DeleteServiceSpecificCredential
- iam:ListMFADevices
- iam:DeactivateMFADevice
- iam:DeleteVirtualMFADevice
- iam:ListUserPolicies
- iam:DeleteUserPolicy
- iam:ListAttachedUserPolicies
- iam:DetachUserPolicy
source: aws-iam
title: Delete user
---

Delete all items attached to the IAM user; then delete the user.

{{< workflows >}}
