---
categories:
- cloud
- aws
- log collection
ddtype: crawler
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/amazon_cloudhsm.md
description: Rassemblez vos logs d'audit de HSM au sein de votre organisation Datadog.
has_logo: true
integration_id: amazon-cloudhsm
integration_title: AWS CloudHSM
is_public: true
kind: integration
name: amazon_cloudhsm
public_title: Intégration Datadog/AWS CloudHSM
short_description: Rassemblez vos logs d'audit de HSM au sein de votre organisation
  Datadog.
---

## Présentation

Lorsqu'un HSM de votre compte reçoit une commande à partir des outils de ligne de commande AWS CloudHSM ou de bibliothèques logicielles, il enregistre son exécution de la commande sous la forme d'un log d'audit. Les logs d'audit de HSM comprennent toutes les commandes de gestion initiées par les clients, y compris celles qui créent et suppriment le HSM, se connectent ou se déconnectent du HSM, et gèrent les utilisateurs et les clés. Ces logs fournissent un enregistrement fiable des actions à l'origine de la modification de l'état du HSM.

Datadog s'intègre à AWS CloudHSM par l'intermédiaire d'une fonction Lambda qui transmet les logs CloudHSM à la solution Log Management de Datadog.

## Configuration

### Collecte de logs

#### Activer les logs

Les logs d'audit sont activés par défaut pour CloudHSM.

#### Envoyer vos logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][1].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur dans la console AWS sur le groupe de logs CloudWatch qui contient vos logs CloudHSM :
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="groupes de logs cloudwatch" popup="true" style="width:70%;">}}
   Sélectionnez le groupe de logs CloudWatch correspondant, ajoutez un nom de filtre (vous pouvez toutefois laisser le filtre vide) et ajoutez le déclencheur.
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="déclencheur cloudwatch" popup="true" style="width:70%;">}}

Accédez ensuite à la [section Log de Datadog][2] pour commencer à explorer vos logs !

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: /fr/integrations/amazon_web_services/#create-a-new-lambda-function
[2]: https://app.datadoghq.com/logs
[3]: /fr/help/