---
aliases:
- /fr/integrations/faq/i-can-t-filter-out-my-elb-instances-will-i-be-charged-for-them/
title: Facturation des intégrations AWS
---

## Présentation

Datadog facture les hosts AWS qui exécutent l'Agent Datadog et toutes les instances EC2 récupérées par l'intégration Datadog/AWS. **Vous n'êtes pas facturé(e) en double** si vous exécutez l'Agent sur une instance EC2 récupérée par l'intégration d'AWS.

**IMPORTANT** : Datadog analyse les métadonnées des instances EC2 pour veiller à ne facturer qu'une seule fois les hosts qui exécutent l'Agent et sont analysés par l'intégration AWS. Si vous avez configuré vos instances EC2 de façon à utiliser la méthode [Instance Metadata Service Version 2 (IMDSv2)][1], vous devez définir le paramètre `ec2_prefer_imdsv2` sur `true` dans la [configuration de votre Agent][2] pour éviter toute facturation double.

La configuration des carrés d'intégration Fargate et Lambda, ainsi que des métriques custom, a une incidence sur vos coûts Datadog.

D'autres ressources AWS comme ELB, RDS et DynamoDB ne font pas partie de la facturation mensuelle de l'infrastructure, et les exclusions de configuration ne s'appliquent pas.

## Exclusion de ressources AWS

Vous pouvez limiter la collecte des métriques AWS pour certains services à des ressources spécifiques. Sur la [page d'intégration Datadog-AWS][3], sélectionnez le compte AWS et cliquez sur l'onglet **Metric Collection**. Sous **Limit Metric Collection to Specific Resources**, vous pouvez ensuite limiter les métriques pour un ou plusieurs services parmi EC2, Lambda, ELB, Application ELB, Network ELB, RDS, SQS, Step Functions et les métriques custom CloudWatch. 
Assurez-vous que les tags ajoutés dans cette section sont attribués aux ressources correspondantes sur AWS.

**Remarque** : si vous utilisez la notation d'exclusion (`!`), assurez-vous que la ressource ne possède pas le tag spécifié.

{{< img src="account_management/billing/aws-resource-exclusion.png" alt="L'onglet de collecte de métriques d'un compte AWS dans la page de l'intégration Datadog/AWS, avec l'option permettant de restreindre la collecte de métrique à certaines ressources. Un menu déroulant permet de sélectionner un service AWS, tandis qu'un champ permet d'ajouter des tags au format key:value" >}}

Vous pouvez également utiliser l'[API][4] pour restreindre la collecte de métriques AWS.

**Remarque** : seules les métriques custom EC2 (hosts), Lambda (fonctions actives), CloudWatch (métriques custom) et [conteneurs][9] sont facturables par Datadog. Les métriques intégrées à d'autres services filtrables n'ont aucune incidence sur votre facturation Datadog.

### EC2

Les paramètres d'exclusion de ressources des métriques EC2 s'appliquent aussi bien aux instances EC2 qu'aux volumes EBS associés. Lors de l'ajout de limites à des comptes AWS existants dans la page d'intégration, les instances précédemment découvertes peuvent rester dans la [liste des infrastructures][5] pendant un maximum de deux heures. Durant cette période de transition, les instances EC2 affichent un statut `???`. Cela n'est pas pris en compte dans votre facturation.

Les hosts avec un Agent en cours d'exécution continuent d'apparaître et sont inclus dans la facturation. Utilisez l'option de limitation pour restreindre la collecte des métriques `aws.ec2.*` depuis AWS et limiter les hosts des instances EC2 en tant que ressources AWS.

#### Exemples

Le filtre suivant exclut toutes les instances EC2 qui contiennent la balise `datadog:no` :

```
!datadog:no
```

Le filtre suivant collecte _uniquement_ les métriques des instances EC2 qui contiennent la balise `datadog:monitored` **ou** la balise `env:production` **ou** une balise `instance-type` avec une valeur `c1.*` **et non** une balise `region:us-east-1` :

```
datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1
```
**Remarque** : dans Datadog, les lettres majuscules sont converties en minuscules et les espaces sont remplacés par des underscores. Par exemple, pour collecter des métriques à partir d'instances EC2 avec le tag `Team:Frontend App`, dans Datadog le tag appliqué doit être `team:frontend_app`.

### Flux de métriques CloudWatch avec Amazon Data Firehose

Vous pouvez éventuellement [envoyer des métriques CloudWatch à Datadog en utilisant CloudWatch Metric Streams et Amazon Data Firehose][8] au lieu de la méthode de sondage d'API par défaut. Si votre organisation utilise la méthode CloudWatch Metric Streams avec Kinesis, les règles d'exclusion des ressources AWS définies dans la page d'intégration AWS de Datadog ne s'appliquent pas. Vous devez gérer toutes les règles d'inclusion et d'exclusion des espaces de nommage de métriques ou des noms de métriques spécifiques dans la configuration de CloudWatch Metric Streams pour chacun de vos comptes AWS depuis la console AWS.

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
[8]: /fr/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/?tab=cloudformation#streaming-vs-polling
[9]: /fr/account_management/billing/containers/