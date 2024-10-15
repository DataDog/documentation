---
aliases:
- /fr/integrations/faq/i-can-t-filter-out-my-elb-instances-will-i-be-charged-for-them/
title: Facturation des intégrations AWS
---

## Présentation

Datadog facture les hosts AWS qui exécutent l'Agent Datadog et toutes les instances EC2 récupérées par l'intégration Datadog/AWS. **Vous n'êtes pas facturé(e) en double** si vous exécutez l'Agent sur une instance EC2 récupérée par l'intégration d'AWS.

**IMPORTANT** : Datadog analyse les métadonnées des instances EC2 pour veiller à ne facturer qu'une seule fois les hosts qui exécutent l'Agent et sont analysés par l'intégration AWS. Si vous avez configuré vos instances EC2 de façon à utiliser la méthode [Instance Metadata Service Version 2 (IMDSv2)][1], vous devez définir le paramètre `ec2_prefer_imdsv2` sur `true` dans la [configuration de votre Agent][2] pour éviter toute facturation double.


La configuration des carrés d'intégration Fargate et Lambda, ainsi que des métriques custom, a une incidence sur vos coûts Datadog.

Les autres ressources AWS (ELB, RDS, Dynamo, etc.) ne sont pas prises en compte pour les factures mensuelles. Les exclusions de configuration ne s'appliquent pas.


## Exclusion de ressources AWS

Pour certains services, vous avez la possibilité de recueillir uniquement les métriques AWS de certaines ressources. Depuis la [page de l'intégration Datadog/AWS][3], sélectionnez votre compte AWS et cliquez sur l'onglet **Metric Collection**. Depuis la section **Limit Metric Collection to Specific Resources**, vous pouvez ensuite restreindre la collecte d'une ou de plusieurs métriques custom pour EC2, Lambda, ELB, Application ELB, Réseau ELB, RDS, SQS et CloudWatch.

{{< img src="account_management/billing/aws-resource-exclusion.png" alt="L'onglet de collecte de métriques d'un compte AWS dans la page de l'intégration Datadog/AWS, avec l'option permettant de restreindre la collecte de métrique à certaines ressources. Un menu déroulant permet de sélectionner un service AWS, tandis qu'un champ permet d'ajouter des tags au format key:value" >}}

Vous pouvez également utiliser l'[API][4] pour restreindre la collecte de métriques AWS.

**Remarque** : seules les métriques custom EC2 (hosts), Lambda (fonctions actives) et CloudWatch (métriques custom) sont facturables par Datadog. Les métriques intégrées à d'autres services filtrables n'ont aucune incidence sur votre facturation Datadog.

**Remarque** : les paramètres d'exclusion de ressources liées aux métriques EC2 s'appliquent à EC2 et à ses volumes EBS associés.

Lorsque vous appliquez des limites à des comptes AWS existants depuis la page de l'intégration, les instances précédemment identifiées peuvent rester dans la [liste d'infrastructures][5] pendant 2 heures (durée maximale). Durant cette période de transition, les instances EC2 affichent le statut `???`. Elles ne rentrent pas en compte dans le calcul de vos coûts.

Les hosts avec un Agent en cours d'exécution s'affichent toujours et sont inclus dans la facturation. L'utilisation de l'option de limite s'applique uniquement aux instances EC2 sans Agent en cours d'exécution.

## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][6].

Pour toute question concernant la facturation, contactez votre [chargé de compte][7].

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: /fr/api/latest/aws-integration/#set-an-aws-tag-filter
[5]: /fr/infrastructure/
[6]: /fr/help/
[7]: mailto:success@datadoghq.com