---
title: Obtenez vos événements et métriques de groupes AutoScaling
kind: faq
---

Notre intégration Autoscaling permet deux choses:

* Extraction des métriques ec2 pour les host dans les groupes d'autoscalling, et l'ajout de des tags d'autoscaling_group.
* L'extraction des métriques d'autoscaling (qui ne concernent pas les hosts spécifiques mais le groupe lui-même) et ajoute le nom de groupe comme autoscaling_groupet autoscalinggroupname. Ainsi, les groupes ont aussi cette balise
Pour obtenir vos événements et métriques d'Autoscaling, suivez les étapes suivantes:

1. Activez l'intégration AWS en référençant vos comptes sur la page de l'intégration.
    {{< img src="integrations/faq/autoscalling_tile.png" alt="autoscalling_tile" responsive="true" popup="true">}}

2. Assurez-vous de disposer de la correcte police IAM, en particulier de la règle suivante:
    `"Action": [ "autoscaling:Describe*"]`

3. Cochez la case Autoscaling dans l'intégration AWS
    {{< img src="integrations/faq/autoscalling_checkbox.png" alt="autoscalling_checkbox" responsive="true" popup="true">}}

4. Cliquez sur "update the tile", vous devriez voir la vignette de l'intégration Autoscaling Group apparaître dans votre liste d'intégrations.

5. [Suivez ces 4 étapes pour obtenir vos métriques ASG][1].

[1]: http://docs.aws.amazon.com/autoscaling/latest/userguide/as-instance-monitoring.html#enable-detailed-instance-metrics
