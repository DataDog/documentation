---
title: Obtenez vos événements et métriques de groupes AutoScaling
kind: faq
---

Notre intégration Autoscaling permet deux choses:

* Extraction des métriques ec2 pour les hosts des groupes d'autoscaling et ajout du tag autoscaling_group
* Pulling autoscaling metrics (that aren't about specific hosts but about the group itself) and add the group name as autoscaling_group and autoscalinggroupname. Thus, groups have this tag too
Pour obtenir vos événements et métriques d'Autoscaling, suivez les étapes suivantes:

1. Enable the AWS integration by referencing your account(s) on the tile.
    {{< img src="integrations/faq/autoscalling_tile.png" alt="autoscalling_tile" responsive="true" popup="true">}}

2. Make sure that you have the correct IAM policy and specifically the following rule:
    `"Action": [ "autoscaling:Describe*"]`

3. Cochez la case Autoscaling dans l'intégration AWS
    {{< img src="integrations/faq/autoscalling_checkbox.png" alt="autoscalling_checkbox" responsive="true" popup="true">}}

4. Cliquez sur "update the tile", vous devriez voir la vignette de l'intégration Autoscaling Group apparaître dans votre liste d'intégrations.

5. [Follow those 4 steps to get your ASG metrics][1].

[1]: http://docs.aws.amazon.com/autoscaling/latest/userguide/as-instance-monitoring.html#enable-detailed-instance-metrics
