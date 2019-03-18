---
aliases:
  - /fr/integrations/awslambda/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: 'Mesurez les durées d''exécution des Lambdas, les erreurs, les nombres d''appels, et plus encore.'
doc_link: 'https://docs.datadoghq.com/integrations/amazon_lambda/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/how-to-monitor-lambda-functions/'
    tag: Blog
    text: Comment surveiller des fonctions Lambda
  - link: 'https://www.datadoghq.com/blog/datadog-lambda-layer/'
    tag: Blog
    text: "Couche Lambda de Datadog\_: surveillez les métriques custom sans serveur"
git_integration_title: amazon_lambda
has_logo: true
integration_title: AWS Lambda
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_lambda
public_title: Intégration Datadog/AWS Lambda
short_description: 'Mesurez les durées d''exécution des Lambdas, les erreurs, les nombres d''appels, et plus encore.'
version: '1.0'
---
## Présentation

Amazon Lambda est un service de calcul qui exécute du code en réponse à des événements et qui gère automatiquement les ressources de calcul requises par ce code.

Activez cette intégration pour commencer à recueillir des métriques custom et Cloudwatch depuis vos fonctions Lambda.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Lambda` est cochée dans la section concernant la collecte des métriques.

2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin de recueillir des métriques Amazon Lambda. Pour en savoir plus sur les stratégies Lambda, consultez [la documentation du site Web d'AWS][4].

    | Autorisation AWS              | Description                                                     |
    | ------------------------- | ----------------------------------------------------------- |
    | `lambda:List*`            | Énumère les tags, les métadonnées et les fonctions Lambda.                  |
    | `logs:DescribeLogGroups`  | Énumère les groupes de logs disponibles.                                  |
    | `logs:DescribeLogStreams` | Énumère les flux de logs disponibles pour un groupe.                     |
    | `logs:FilterLogEvents`    | Recueille des événements de log spécifiques pour qu'un flux génère des métriques. |
    | `tag:GetResources`        | Récupère des tags personnalisés appliqués aux fonctions Lambda.                |

3. Installez l'[intégration AWS Lambda/Datadog][5].

Une fois l'installation terminée, vous pouvez consulter toutes vos fonctions Lambda dans l'[IU Cloud Functions de Datadog][14]. Cette IU regroupe en une unique vue les métriques, les traces et les logs de vos fonctions AWS Lambda qui exécutent des applications sans serveur. Pour en savoir plus sur cette fonctionnalité, consultez la [documentation relative aux fonctions cloud de Datadog][15].

### Collecte de logs

1. Configurez [la fonction Lambda de collecte de logs AWS avec Datadog][6] si vous ne l'avez pas déjà fait.
2. Une fois la fonction Lambda installée, vous pouvez transmettre vos logs Lambda à Datadog de deux façons différentes :

    * Solution automatique : nous gérons des déclencheurs Lambda pour la collecte de logs si vous nous accordez les autorisations nécessaires. [Consultez le principal service Web d'Amazon pour configurer la collecte automatique de logs ][20].
    * Solution manuelle : ajoutez manuellement un déclencheur sur le groupe de logs Cloudwatch qui contient vos logs Lambda dans la console AWS. Pour ce faire, suivez [ces étapes][21].

Accédez ensuite à votre [section Log de Datadog][7] pour commencer à explorer vos logs.

### Collecte de traces

Datadog s'intègre à [AWS X-Ray][16] pour recueillir et visualiser vos traces sans serveur à partir d'applications basées sur Lambda dans l'[IU Cloud Functions][14]. Vous pouvez en savoir plus sur la configuration de cette intégration dans la [documentation relative aux fonctions Datadog Cloud][15].

### Métriques custom

Si votre fonction Lambda utilise un runtime Python, installez la couche Lambda de Datadog pour recueillir et envoyer des métriques custom. Si vous utilisez un autre runtime, enregistrez vos métriques custom sous un format spécifique pour qu'elles puissent être recueillies et analysées sous forme de métriques par Datadog.

#### Installer et utiliser la couche Datadog

La couche Lambda de Datadog prend actuellement en charge les versions 2.7, 3.6 et 3.7 de Python. Si vous souhaitez que Datadog prenne en charge un certain runtime, contactez l'[équipe d'assistance Datadog][12].

1.  Naviguez jusqu'à la fonction Lambda à laquelle vous souhaitez ajouter la couche dans votre console AWS.
2.  Cliquez sur **Layers** sur la page principale de votre fonction.
Faites défiler la page et cliquez sur **Provide a layer version ARN**.
4.  Saisissez un ARN au format suivant et choisissez la région et la version Python de votre choix :

    ~~~
    arn:aws:lambda:<YOUR_AWS_REGION>:464622532012:layer:Datadog-Python36-metric:1
    ~~~

5.  Naviguez jusqu'à la section **Environment Variables** de votre fonction et définissez deux variables d'environnement :
      * DATADOG_API_KEY
      * DATADOG_APP_KEY

  Vous trouverez ces valeurs dans la [page API de l'application Datadog][17].

Dans le code de votre fonction, vous devez importer les méthodes nécessaires à partir de la couche et ajouter un wrapper autour du gestionnaire de votre fonction :

```python
from datadog import datadog_lambda_wrapper, lambda_metric

@datadog_lambda_wrapper
def lambda_handler(event, context):

```

Utilisez ensuite la méthode `lambda_metric` pour envoyer des métriques custom depuis votre fonction vers Datadog :

```
lambda_metric(nom_métrique, valeur_métrique, tags=[])
```

Où :

* `<nom_métrique>` identifie de façon unique votre métrique et respecte la [stratégie de nommage des métriques][8].

* `<valeur_métrique>` DOIT être un nombre (c'est-à-dire un nombre entier ou une valeur de type float).

* `<liste_tags>` est facultatif et formaté, par exemple : `['owner:Datadog', 'env:demo', 'cooltag']`.

**Remarque** : à l'heure actuelle, jusqu'à 4 tags peuvent être appliqués à une métrique. Si vous avez besoin de plus de 4 tags sur ces métriques, contactez l'[équipe d'assistance Datadog][12] pour augmenter cette limite pour votre organisation.

Vous trouverez des instructions détaillées pour installer et configurer les couches Lambda dans la [documentation principale d'AWS][18].

#### Utiliser les logs CloudWatch

Pour envoyer des métriques custom à Datadog à partir de vos logs Lambda, affichez une ligne de log Lambda, en utilisant le format suivant :

```
MONITORING|<timestamp_unix_epoch>|<valeur>|<type_métrique>|<nom_métrique>|#<liste_tags>
```

Où :

* `MONITORING` signale à l'intégration Datadog que cette entrée de log doit être recueillie.

* `<timestamp_unix_epoch>` est à définir en secondes, et non en millisecondes.

* `<valeur>` DOIT être un nombre (c'est-à-dire un nombre entier ou une valeur de type float).

* `<type_métrique>` correspond à `count`, `gauge`, `histogram` ou `check`.

* `<nom_métrique>` identifie de façon unique votre métrique et respecte la [stratégie de nommage des métriques][8].

* `<liste_tags>` est facultatif, doit être précédé du caractère `#` et ses valeurs sont séparées par une virgule.
    Le tag `function_name:<nom_de_la_fonction>` est automatiquement appliqué aux métriques custom.

**Remarque** : la somme de chaque timestamp est utilisée pour les counters et la dernière valeur d'un timestamp donné est utilisée pour les gauges. Nous ne conseillons pas d'afficher une déclaration de log chaque fois que vous incrémentez une métrique, car cela augmente la durée d'analyse de vos logs. Mettez à jour de façon continue la valeur de la métrique dans votre code et affichez une déclaration de log pour cette métrique avant la fin de la fonction.

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_lambda" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de la fonction et les groupes de sécurité.

Les métriques custom sont uniquement taguées avec le nom de la fonction.

### Événements
L'intégration AWS Lambda n'inclut aucun événement.

### Checks de service
L'intégration AWS Lambda n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][12].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_lambda.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_lambda
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#set-up-the-datadog-lambda-function
[7]: https://app.datadoghq.com/logs
[8]: https://docs.datadoghq.com/fr/developers/metrics
[9]: https://docs.datadoghq.com/fr/getting_started/tagging/
[10]: https://docs.datadoghq.com/fr/getting_started/custom_metrics/
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_lambda/amazon_lambda_metadata.csv
[12]: https://docs.datadoghq.com/fr/help/
[14]: https://app.datadoghq.com/functions
[15]: https://docs.datadoghq.com/fr/graphing/infrastructure/cloudfunctions/
[16]: https://aws.amazon.com/xray/
[17]: https://app.datadoghq.com/account/settings#api
[18]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[19]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html
[20]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#automatically-setup-triggers
[21]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#manually-setup-triggers


{{< get-dependencies >}}