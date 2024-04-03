---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Create an ED25519 or 2048-bit RSA key pair with a name and in the PEM
  or PPK format. Amazon EC2 stores the public key and displays the private key for
  you to save to a file. The private key is returned as an unencrypted PEM encoded
  PKCS#1 private key, or an unencrypted PPK formatted private key for use with PuTTY.
  If a key with the same name already exists, Amazon EC2 returns an error.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/CreateKeyPairInputs'
inputFieldOrder:
- region
- keyName
- keyType
- keyFormat
- tagSpecifications
output: '#/$defs/CreateKeyPairOutputs'
permissions:
- ec2:CreateKeyPair
source: amazon-ec2
title: Create key pair
---

Create an ED25519 or 2048-bit RSA key pair with a name and in the PEM or PPK format. Amazon EC2 stores the public key and displays the private key for you to save to a file. The private key is returned as an unencrypted PEM encoded PKCS#1 private key, or an unencrypted PPK formatted private key for use with PuTTY. If a key with the same name already exists, Amazon EC2 returns an error.

{{< workflows >}}
