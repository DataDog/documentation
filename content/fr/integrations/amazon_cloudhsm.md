---
categories:
- cloud
- aws
- log collection
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/amazon_cloudhsm.md
description: Rassemblez vos logs d'audit de HSM au sein de votre organisation Datadog.
has_logo: true
integration_id: amazon-cloudhsm
integration_title: AWS CloudHSM
is_public: true
custom_kind: integration
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

1. Si ce n'est pas déjà fait, configurez la [fonction Lambda du Forwarder Datadog][1] dans votre compte AWS.
2. Une fois configuré, accédez à la fonction Lambda du Forwarder Datadog. Dans la section Présentation de Functions, cliquez sur **Add Trigger**.
3. Sélectionnez le déclencheur **CloudWatch Logs** pour le champ Trigger Configuration.
4. Sélectionnez le groupe de logs CloudWatch qui contient vos logs CloudHSM.
5. Saisissez un nom pour le filtre.
6. Cliquez sur **Add** pour ajouter le déclencheur à votre fonction Lambda.

Accédez au [Log Explorer][2] pour commencer à explorer vos logs.

Pour en savoir plus sur la collecte de logs de services AWS, consultez la section [Envoyer des logs de services AWS avec la fonction Lambda Datadog][3].

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: /fr/logs/guide/forwarder/
[2]: https://app.datadoghq.com/logs
[3]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[4]: /fr/help/