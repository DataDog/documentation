---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Describes the Availability Zones, Local Zones, and Wavelength Zones that
  are available to you.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/DescribeAvailabilityZoneInputs'
inputFieldOrder:
- region
- allAvailabilityZones
- filter
- zoneID
- zoneName
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeAvailabilityZoneOutputs'
permissions:
- ec2:DescribeAvailabilityZones
source: amazon-ec2
title: Describe availability zones
---

Describes the Availability Zones, Local Zones, and Wavelength Zones that are available to you.

{{< workflows >}}
