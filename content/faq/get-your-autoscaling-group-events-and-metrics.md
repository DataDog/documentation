---
title: Get your AutoScaling Group events and metrics
kind: faq
customnav: main_references
---

Our autoscaling integration does two things:

* Pulling ec2 metrics for hosts in autoscaling groups, and add the autoscaling_group tag
* Pulling autoscaling metrics (that aren't about specific hosts but about the group itself) and add the group name as autoscaling_group and autoscalinggroupname. Thus, groups have this tag too
To get your Autoscaling events and metrics, you have to follow the next steps:

1. Enable the AWS integration by referencing your account(s) on the tile.
    {{< img src="faq/autoscalling_tile.png" alt="autoscalling_tile" responsive="true" >}}

2. Make sure that you have the correct IAM policy and specifically the following rule:
    `"Action": [ "autoscaling:Describe*"]`

3. Check the Autoscaling box on the AWS Tile 
    {{< img src="faq/autoscalling_checkbox.png" alt="autoscalling_checkbox" responsive="true" >}}


4. Click on update the tile, you should see the Autoscaling Group tile showing up in your integration list.

5. In order to get your ASG metrics, you need to follow the 4 steps [here](http://docs.aws.amazon.com/autoscaling/latest/userguide/as-instance-monitoring.html#enable-detailed-instance-metrics).