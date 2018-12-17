---
title: How do I pull my EC2 tags without using the AWS integration ?
kind: faq
---

To pull custom AWS tags for an EC2 instance through the Datadog Agent without using the AWS integration, follow these steps:

{{< tabs >}}
{{% tab "Agent v6" %}}

1. Create a IAM role for the instance using [this documentation][1]
2. For the policy section, specify the following permissions:  `"ec2:Describe*"`, `"ec2:Get*"`
3. In `datadog.yaml` set **collect_ec2_tags: true**
4. Optional: add the security-groups tag by enabling this option
5. [Restart the Agent][2]


[1]: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
[2]: /agent/faq/agent-commands/?tab=agentv6#restart-the-agent
{{% /tab %}}
{{% tab "Agent v5" %}}

1. Create a IAM role for the instance using [this documentation][1]
2. For the policy section, specify the following permissions:  `"ec2:Describe*"`, `"ec2:Get*"`
3. In `datadog.conf` set **collect_ec2_tags: true**
4. Optional: add the security-groups tag by enabling this option
5. [Restart the Agent][2]


[1]: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
[2]: /agent/faq/agent-commands/?tab=agentv5#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

1. Create a IAM role for the instance using [this documentation][1]
2. For the policy section, specify the following permissions:  `"ec2:Describe*"`, `"ec2:Get*"`
3. Start the Datadog Agent container using the environment variable `DD_COLLECT_EC2_TAGS`.


[1]: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
{{% /tab %}}
{{< /tabs >}}

**Note**: This option only pulls in custom tags set on the EC2 host under the **Tags** tab in your AWS console:

{{< img src="integrations/faq/ec2_tags.png" alt="ec2_tags" responsive="true" >}}

Tags like `availability_zone`, `region`, or `instance_type` are only available by pulling in the EC2 host through the [AWS integration][1].

[1]: /agent/faq/agent-commands/?tab=agentv5#restart-the-agent
