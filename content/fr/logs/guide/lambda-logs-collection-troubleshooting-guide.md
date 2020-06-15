---
title: Guide de dépannage pour la collecte de logs de la fonction Lambda
kind: documentation
---
Si vous ne voyez pas de logs transmis depuis une fonction Lambda dans le Log Explorer, consultez l'[intégration Datadog/AWS][1] pour configurer votre environnement. Si vous ne voyez toujours pas vos logs après cela, vérifiez à nouveau les points suivants :

Certains problèmes courants peuvent survenir lorsque vous configurez la fonction Lambda AWS pour la transmission de logs à Datadog. Les étapes de dépannage ci-dessous peuvent vous aider si vous utilisez la fonction Lambda et que vos logs ne sont pas transmis à Datadog. Si vous rencontrez toujours des problèmes après cela, [contactez l'assistance Datadog][2] pour obtenir de l'aide.

## Vos logs sont-ils envoyés à Datadog ?

1. Accédez à la [vue Live Tail du Log Explorer][3].
2. Dans la barre de recherche, utilisez un filtre pour limiter la vue Live Tail aux logs provenant de votre fonction Lambda. Voici des requêtes de recherche courantes :
    * Filtrage par source : la source est souvent définie sur `source:aws` ou `source:cloudwatch`, mais vous pouvez trouver d'autres sources possibles dans la fonction `parse_event_source` de la [fonction Lambda][4]. 
    * Filtrage par nom de transmetteur : la fonction Lambda ajoute un tag forwardername à tous les logs qu'elle renvoie. Vous pouvez filtrer ce tag en recherchant `forwardername:*` ou `forwardername:<NOM_FONCTION>`.
3. Si vous ne voyez pas les logs dans la vue Live Tail, c'est qu'ils ne parviennent pas à Datadog. Cela peut être dû à l'un de ces problèmes de configuration courants :
    * Les logs sont trop anciens : Datadog accepte uniquement les logs avec un timestamp de plus 6 heures avant l'événement et plus d'une heure après celui-ci.
    * Si des [filtres d'exclusion][5] sont appliqués à votre index, il se peut qu'ils excluent vos logs.

## Consulter l'onglet Monitoring de la fonction Lambda

[Depuis la console AWS][6]

1. Ouvrez votre fonction Lambda.

2. Cliquez sur l'onglet Monitoring.

    {{< img src="logs/guide/lambda-monitoring-tab.png" alt="Onglet Monitoring"  style="width:80%;" >}}

3. L'onglet Monitoring comporte une série de graphiques qui indiquent les informations suivantes sur votre fonction Lambda :
    * Les invocations
    * Les erreurs
    * Les logs

4. Si vous ne voyez aucun point de données dans le graphique **Invocations**, il est possible que les déclencheurs que vous avez définis pour votre fonction posent problème. Consultez la section [Gérer vos déclencheurs de fonction](#gerer-vos-declencheurs-de-fonction) un peu plus bas. Pour analyser vos invocations Lambda sans utiliser l'onglet Monitoring, reportez-vous à la section [Visualiser des métriques Lambda dans Datadog](#visualiser-des-metriques-lambda-dans-datadog).
5. Si vous voyez des points de données dans le graphique « Error count and success rate », [consultez les logs de la fonction Lambda](#consulter-les-logs-de-la-fonction-Lambda) pour accéder aux messages d'erreurs signalés.

### Visualiser des métriques Lambda dans Datadog

Si vous avez activé les métriques Lambda AWS, vous pouvez visualiser les métriques relatives aux invocations et aux erreurs Lambda dans Datadog. Les métriques suivantes portent toutes le tag `functionname` :

| Métrique                        | Description                                                                                        |
|-------------------------------|----------------------------------------------------------------------------------------------------|
| `aws.lambda.invocations`     | Nombre de déclenchement ou d'invocation de la fonction Lambda                                    |
| `aws.lambda.errors `          | Nombre d'erreurs générées suite à l'invocation de la fonction                                        |
| `aws.lambda.duration `        | Durée moyenne d'exécution (en millisecondes) de la fonction Lambda  |
| `aws.lambda.duration.maximum` | Durée maximale d'exécution (en millisecondes) de la fonction Lambda  |
| `aws.lambda.throttles`        | Nombre de tentatives d'invocations inachevées en raison d'un taux d'invocation dépassant les limites client |

Pour en savoir plus sur ces métriques AWS Lambda et en découvrir d'autres, consultez la rubrique relative aux [métriques Amazon Lambda][7].

### Gérer vos déclencheurs de fonction

La fonction Lambda doit inclure des déclencheurs pour que les logs soient transmis. Si vous voyez [dans l'onglet Monitoring de votre fonction Lambda](#consulter-l-onglet-monitoring-de-la-fonction-lambda) que celle-ci n'a jamais été invoquée, c'est peut-être qu'aucun déclencheur n'a été configuré. Il existe deux moyens de définir des déclencheurs pour la fonction Lambda : manuellement ou automatiquement.

{{< tabs >}}
{{% tab "Déclencheur manuel" %}}
Vous pouvez voir si des [déclencheurs manuels][1] sont configurés pour votre fonction Lambda en vérifiant directement dans l'onglet de configuration de la fonction Lambda, comme indiqué ci-dessous :

{{< img src="logs/guide/manual-triggers-example.png" alt="Exemple d'emplacement de déclencheurs manuels"  style="width:80%;" >}}

**Remarque** : si votre fonction Lambda possède des déclencheurs, mais si elle n'est tout de même pas invoquée, cela peut-être dû à un conflit avec une autre ressource déjà abonnée à la même source de log. Lorsque vous ajoutez un déclencheur manuel, un message d'erreur vous informe si une ressource est déjà abonnée à la source de log :

{{< img src="logs/guide/creating-trigger-error-example.png" alt="Exemple d'erreur lors de la création d'un déclencheur avec abonnement"  style="width:80%;" >}}

Consultez la section [Vérifier les conflits d'abonnement](#verifier-les-conflits-d-abonnement) pour en savoir plus sur la suppression d'abonnements.

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#manually-setup-triggers
{{% /tab %}}
{{% tab "Déclencheur automatique" %}}

Suivez les étapes suivantes pour vérifier si des [déclencheurs automatiques][1] sont configurés pour votre fonction Lambda :

1. Accédez à la [console Cloudwatch][2].
2. Cliquez sur **Log Groups** dans la barre latérale de gauche pour afficher la liste des groupes de logs. Sur la droite, la colonne **subscriptions** indique quelles ressources (le cas échéant) sont actuellement abonnées à la source de log.

{{< img src="logs/guide/log-group-subscriptions-example.png" alt="Exemple d'abonnement à un groupe de logs"  style="width:80%;" >}}

3. Si votre fonction Lambda ne fait pas partie des ressources abonnées au groupe de logs à surveiller, suivez à nouveau les étapes indiquées dans la [documentation sur la configuration automatique de déclencheurs][1].
4. Si une autre ressource est déjà abonnée au groupe de logs que vous voulez surveiller, consultez la section [Vérifier les conflits d'abonnement](#verifier-les-conflits-d-abonnement) ci-dessous.

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#automatically-setup-triggers
[2]: https://console.aws.amazon.com/cloudwatch/
{{% /tab %}}
{{< /tabs >}}

### Vérifier les conflits d'abonnement

AWS autorise l'abonnement d'une ressource maximum par source de log. Si vous avez des déclencheurs pour votre fonction Lambda, mais qu'elle n'est tout de même pas invoquée, cela peut-être dû à un conflit avec une autre ressource déjà abonnée à la même source de log. La source de log doit être libérée pour permettre à la fonction Lambda de Datadog d'y recueillir des logs.

Si une ressource est déjà abonnée à un groupe de logs que vous souhaitez surveiller à l'aide de la fonction Lambda de Datadog, vous pouvez le supprimer de la manière suivante :

* Sélectionnez la source de log.
* Sélectionner **Remove Subscription Filter** dans le menu déroulant **Actions**.

## Consulter les logs de la fonction Lambda

Depuis l'onglet Monitoring, cliquez sur **View logs in Cloudwatch**.

{{< img src="logs/guide/lambda-logs-cloudwatch.png" alt="Logs Lambda dans Cloudwatch"  style="width:80%;" >}}

### Clé d'API

Si vous voyez l'une des lignes de log suivantes, cela signifie que votre clé d'API n'est pas configurée correctement.

```
module initialization error: Missing Datadog API key
```

Ce message indique que vous n'avez pas configuré la clé d'API. Il existe trois moyens d'y parvenir :

* Directement dans le code Python de votre fonction Lambda
* En tant que variable d'environnement sous le nom `DD_API-KEY`
* En tant que clé chiffrée KMS sous le nom `DD_KMS_API_KEY`

```
module initialization error: The API key is not valid.
```

La clé d'API que vous avez indiquée ne correspond à aucune clé reconnue par Datadog. Vérifiez que vous avez bien saisi la clé et assurez-vous qu'elle correspond à l'organisation à laquelle vous envoyez des données. Si vous êtes sur le site européen de Datadog, vous devez indiquer une variable `DD_SITE` avec la valeur `datadoghq.eu` pour que la clé d'API soit bien associée à votre compte.

```
module initialization error: The API key is not the expected length. Please confirm that your API key is correct
```

La clé d'API est soit trop courte, soit trop longue. Vérifiez que vous l'avez copiée correctement.

[1]: /fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[2]: https://docs.datadoghq.com/fr/help
[3]: https://docs.datadoghq.com/fr/logs/live_tail/#live-tail-view
[4]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/lambda_function.py
[5]: https://docs.datadoghq.com/fr/logs/indexes/#exclusion-filters
[6]: https://console.aws.amazon.com/lambda/home
[7]: https://docs.datadoghq.com/fr/integrations/amazon_lambda/?tab=awsconsole#metrics