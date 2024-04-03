---
bundle: com.datadoghq.aws.iam
bundle_title: AWS IAM
description: Disable access for the IAM user by revoking all authentication credentials.
icon:
  integration_id: aws-iam
  type: integration_logo
input: '#/$defs/DisableUserInputs'
inputFieldOrder:
- userName
keywords:
- deactivate
- disable
- cancel
output: '#/$defs/DisableUserOutputs'
permissions:
- iam:DeleteLoginProfile
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
source: aws-iam
title: Disable user
---

Disable access for the IAM user by revoking all authentication credentials.

{{< workflows >}}
