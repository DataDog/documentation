---
aliases:
- exe-9ow-gwv
- /security_monitoring/default_rules/exe-9ow-gwv
- /security_monitoring/default_rules/aws_ami_public
disable_edit: true
integration_id: ec2
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: ec2
title: AMI is not publicly shared
type: security_rules
---

## Description

Identify publicly accessible Amazon Machine Images (AMIs).

## Rationale

When an AMI is shared publicly, anyone outside your organization can see it in the [list of public AMIs][1] and create an EC2 instance from it, accessing all the files it contains.

AMIs typically contain source code, configuration files and credentials and should not be shared publicly.

## Remediation

Stop sharing the AMI publicly. AMIs should be shared only with [specific AWS accounts][2] or [your AWS Organization][3].

### From the console

Follow the instructions outlined in the [AWS documentation][4].  Untick the public sharing option.

### From the command line

Use the following command to stop sharing the AMI:

{{< code-block lang="bash">}}
aws ec2 modify-image-attribute \
--image-id ami-xxxx \
--launch-permission "Remove=[{Group=all}]"
{{< /code-block >}}

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/usingsharedamis-finding.html
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sharingamis-explicit.html
[3]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/share-amis-with-organizations-and-OUs.html
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sharingamis-explicit.html
