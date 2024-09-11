---
title: How do I pull my EC2 tags without using the AWS integration?

---

To pull custom AWS tags for an EC2 instance through the Datadog Agent without using the AWS integration, follow these steps:

{{< tabs >}}
{{% tab "Agent v6 & v7 with IMDS" %}}

Datadog recommends gathering instance tags through the EC2 Instance Metadata Service.

This mechanism is available in the Datadog Agent v7.35.0.

1. Ensure that the EC2 instance is configured to allow access to tags in the instance metadata. See the [AWS documentation][1].
2. In the `datadog.yaml` file, set `collect_ec2_tags: true` and `collect_ec2_tags_use_imds: true`.
3. [Restart the Agent][2].

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html#allow-access-to-tags-in-IMDS
[2]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Agent v6 & v7 with EC2 API" %}}

If tags are not available through the EC2 Instance Metadata Service, the Datadog Agent uses the EC2 API to gather tags.

1. Make sure an IAM role is assigned to the EC2 **instance**, using the [AWS documentation][1]. Create one if necessary.
2. Attach a policy to the IAM role that includes the permission `ec2:DescribeTags`.
3. In `datadog.yaml`, set `collect_ec2_tags: true`.
4. [Restart the Agent][2].

[1]: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
[2]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Agent v5" %}}

1. Create a IAM role for the **instance** using the [AWS documentation][1].
2. For the policy section, specify the permissions: `"ec2:Describe*"`, `"ec2:Get*"`.
3. In `datadog.conf`, set **collect_ec2_tags: true**.
4. Optional: Add the security-groups tag by enabling `collect_security_groups`.
5. [Restart the Agent][2].

[1]: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
[2]: /agent/guide/agent-commands/?tab=agentv5#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

1. Make sure an IAM role is assigned to the agent task, using the [AWS documentation][1]. Create one if necessary.
2. Attach a policy to the IAM role that includes the permission `ec2:DescribeTags`.
3. Start the Datadog Agent container with the environment variable `DD_COLLECT_EC2_TAGS=true`.

**Note**: For backwards compatibility, the Agent will also try using the EC2 instance role if the ECS task role is unavailable or has insufficient permissions.

[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html
{{% /tab %}}
{{< /tabs >}}

This option only pulls in custom tags set on the EC2 host under the **Tags** tab in your AWS console:

{{< img src="integrations/faq/ec2_tags.png" alt="ec2_tags" >}}

Tags like `availability_zone`, `region`, or `instance_type` are only available by pulling in the EC2 host through the [AWS integration][1].

[1]: /integrations/amazon_web_services/?tab=allpermissions
