---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Delete a key pair by removing the public key from Amazon EC2. If the
  key pair does not exist no key pairs are removed, but the action is still successful.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/DeleteKeyPairInputs'
inputFieldOrder:
- region
- keyName
- keyPairId
keywords:
- delete
- remove
output: '#/$defs/DeleteKeyPairOutputs'
permissions:
- ec2:DeleteKeyPair
source: amazon-ec2
title: Delete key pair
---

Delete a key pair by removing the public key from Amazon EC2. If the key pair does not exist no key pairs are removed, but the action is still successful.

{{< workflows >}}
