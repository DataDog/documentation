---
aliases:
- d17-702-f4a
- /security_monitoring/default_rules/d17-702-f4a
- /security_monitoring/default_rules/cloudtrail-aws-config-disabled
control: '4.9'
disable_edit: true
framework: cis-aws
iaas: aws
integration_id: amazon-config
kind: documentation
requirement: Monitoring
rule_category:
- Cloud SIEM (Log Detection)
scope: amazon-config
security: compliance
source: cloudtrail
title: AWS Config modified
type: security_rules
---

## Goal
Detect when an attacker is trying to evade defenses by disabling or modifying AWS Config.

## Strategy
This rule lets you monitor these AWS Config API calls per [CIS-AWS-4.9: Ensure a log metric filter and alarm exist for AWS Config configuration changes][5]:

* [StopConfigurationRecorder][1] 
* [DeleteDeliveryChannel][2] 
* [PutDeliveryChannel][3]
* [PutConfigurationRecorder][4]

## Triage and response
1. Determine which if {{@userIdentity.arn}} should have done a {{@evt.name}} to AWS Config.
2. If the user did not make the API call:
   * Rotate the credentials.
   * Investigate if the same credentials made other unauthorized API calls.

[1]: https://docs.aws.amazon.com/config/latest/APIReference/API_StopConfigurationRecorder.html
[2]: https://docs.aws.amazon.com/config/latest/APIReference/API_DeleteDeliveryChannel.html
[3]: https://docs.aws.amazon.com/config/latest/APIReference/API_PutDeliveryChannel.html
[4]: https://docs.aws.amazon.com/config/latest/APIReference/API_PutConfigurationRecorder.html
[5]: https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cis_aws_benchmark_level_2.html

## Changelog
* 1 April 2022 - Updated rule and signal message.

* 10 October 2022 - Updated severities.
