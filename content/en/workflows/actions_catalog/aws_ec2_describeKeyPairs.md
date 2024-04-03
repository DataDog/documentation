---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Describe the specified key pairs or all of your key pairs.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/DescribeKeyPairsInputs'
inputFieldOrder:
- region
- filters
- keyNames
- keyPairIds
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeKeyPairsOutputs'
permissions:
- ec2:DescribeKeyPairs
source: amazon-ec2
title: List key pairs
---

Describe the specified key pairs or all of your key pairs.

{{< workflows >}}
