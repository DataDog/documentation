---
title: Comment puis-je récupérer mes tags EC2 sans utiliser l'intégration AWS?
kind: faq
---

Pour extraire des tags AWS pour une instance EC2 via l'agent de datadog, procédez comme suit:

* Create a IAM role for the instance using [this documentation][1]
* For the policy section, specify the following permissions:  **ec2:Describe**, **ec2:Get**
* Dans `datadog.yaml` configurez **collect_ec2_tags: true**
* Optional: add the security-groups tag by enabling this option
* [Redémarez votre Agent][2]

Note:  This option sets no tags like availability_zone, region, or instance_type, which are only available by pulling in the EC2 host through the AWS integration. This only pulls in the custom tags that have been set on the EC2 host under the "Tags" tab in your AWS console.

{{< img src="integrations/faq/ec2_tags.png" alt="ec2_tags" responsive="true" popup="true">}}

[1]: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
[2]: /agent/faq/agent-commands/#start-stop-restart-the-agent
