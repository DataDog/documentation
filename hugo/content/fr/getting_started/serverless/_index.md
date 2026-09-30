---
further_reading:
- link: /agent/basic_agent_usage/
  tag: Documentation
  text: Utilisation de base de l'Agent
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour en savoir plus sur la surveillance
    sans serveur
title: Débuter avec la surveillance sans serveur AWS Lambda
---

## Présentation

Le _serverless_ est un modèle dans lequel les développeurs créent et exécutent des applications et des services via un fournisseur de cloud. Ils n'ont ainsi plus besoin de gérer eux-mêmes l'infrastructure. La [surveillance sans serveur][10] Datadog recueille des métriques, des logs et des traces à partir de votre infrastructure sans serveur, vous permettant ainsi de surveiller l'intégrité et les performances de votre application.

Dans ce guide, nous vous présentons un [prototype d'application][2] sans serveur que vous pouvez lancer en un clic. Une surveillance sans serveur est déjà configurée dans cette application. Suivez les instructions de ce guide pour découvrir comment résoudre les problèmes pouvant affecter votre application et prendre connaissance des types de visibilité offerts par la surveillance sans serveur.

### Installer le prototype d'application

1. [Lancez la stack CloudFormation][3]. Ce lien vous redirige vers la page **Create stack** dans CloudFormation.
2. Ajoutez votre [clé d'API Datadog][4] et votre [site Datadog][5] ({{< region-param key="dd_site" code="true" >}}). 

  {{< img src="getting_started/serverless/aws_create_stack.png" alt="Gros plan sur deux fonctions" style="width:80%;">}}

   Ensuite, acceptez les fonctionnalités IAM et cliquez sur **Create Stack**.

3. Une fois la stack créée, ouvrez l'onglet Outputs.

  {{< img src="getting_started/serverless/aws_outputs.png" alt="Gros plan sur deux fonctions" style="width:80%;">}}

  Appelez plusieurs fois votre prototype d'application en accédant à la `ApiGatewayInvokeURL`. Vous recevrez ensuite le message de confirmation « Sent message to SNS ».

Chaque appel exécute les lignes suivantes :

```python
import boto3, os

def handler(event, context):
    sns = boto3.client('sns')

    sns.publish(
        TopicArn=os.environ.get("SNS_TOPIC_ARN"),
        Message='Message sent to SNS'
        )

    return {
        "body": "Sent message to SNS",
        "statusCode": 200
    }
```

Vous pouvez [voir les fonctions de votre prototype d'application dans la vue Serverless][6].

{{< img src="getting_started/serverless/serverless_view_2024.png" alt="Surveillance sans serveur : vue Serverless, une page de l'explorer" style="width:80%;">}}

## Vue Serverless

La vue Serverless affiche les données de télémétrie de toutes les ressources sans serveur de votre environnement AWS. Vous pouvez utiliser cette page comme point de départ pour surveiller, débugger et optimiser vos applications.

Si vous avez appelé votre prototype d'application au moins une fois, les fonctions `datadog-sample-entry-function` et `datadog-sample-sqs-consumer-function` seront affichées :

{{< img src="getting_started/serverless/functions_view.png" alt="Gros plan sur deux fonctions" style="width:80%;">}}

### Insights Serverless
Dans la vue Serverless, la colonne la plus à droite est intitulée **Insights**. Datadog met automatiquement en avant les problèmes potentiels détectés dans vos applications sans serveur, tels qu'un [taux d'erreurs élevé][7] ou une [durée élevée][8]. Ces problèmes figurent dans la colonne Insights.

Concernant votre prototype d'application sans serveur, Datadog a probablement détecté un [démarrage à froid][9]. Cela se produit lorsque votre application sans serveur voit son trafic augmenter soudainement. La cause peut être une hausse soudaine du nombre de requêtes reçues par la fonction par rapport à la normale ou, comme c'est le cas ici, un premier appel d'une fonction auparavant inactive.

## Créer une erreur pour enquêter

Vous pouvez provoquer une erreur en modifiant la `datadog-sample-entry-function` dans le stack du prototype d'application.

```python
  # Code de la fonction Lambda entry
  def handler(event, context):

    raise Exception('Throw an error.')
```

{{< img src="getting_started/serverless/aws_error.png" alt="Gros plan sur deux fonctions" style="width:80%;">}}


Déployez ce changement et appelez à nouveau votre prototype d'application pour découvrir comment enquêter sur cette erreur dans Datadog.

{{< img src="getting_started/serverless/dd_serverless_view_error.png" alt="Gros plan sur deux fonctions" style="width:80%;">}}

Notez que la fonction `datadog-sample-entry-function` présente cinq erreurs.

## Détails de la fonction
Cliquez sur votre fonction pour afficher les appels et les déploiements récents en détail.

{{< img src="getting_started/serverless/details_error.png" alt="Gros plan sur deux fonctions" style="width:80%;">}}

La vue détaillée, telle qu'illustrée ci-dessus, contient trois graphiques. Vous pouvez les configurer pour qu'ils affichent n'importe quelle métrique disponible. Par défaut, trois [métriques Lambda optimisées][10] sont affichées : les appels, les erreurs et la durée.

Datadog génère des métriques Lambda optimisées prêtes à l'emploi qui offrent une faible latence, une granularité de plusieurs secondes et des métadonnées détaillées pour les démarrages à froid et les tags personnalisés. Vous pouvez également afficher le [dashboard des métriques Lambda optimisées][11] par défaut.


### Appels
L'onglet **Invocations** affiche les appels récents de votre fonction.

Chaque appel est associé à une trace. Cliquez sur **Open Trace*** pour afficher la trace de chaque appel :

{{< img src="getting_started/serverless/dd_flame_graph.png" alt="Gros plan sur deux fonctions" style="width:80%;">}}

L'onglet **Flame Graph** affiche les événements survenus durant cet appel, notamment les services ayant enregistré le pourcentage le plus élevé du temps d'exécution total. Le flamegraph affiche le transit de la requête depuis APIGateway via votre `datadog-sample-sqs-function`, via SNS et SQS, et enfin via votre `datadog-sample-entry-function`.

{{< img src="getting_started/serverless/trace_map.png" alt="Gros plan sur deux fonctions" style="width:80%;">}}

L'onglet **Trace Map** vous permet de visualiser le cheminement de vos services et leurs interactions.

La moitié inférieure de la vue Trace détaillée affiche une stack trace, qui indique la ligne de code à l'origine de l'erreur :

```
Traceback (most recent call last):
  File /opt/python/lib/python3.9/site-packages/datadog_lambda/wrapper.py, line 142, in __call__
    self.response = self.func(event, context, **kwargs)
File /var/task/index.py, line 17, in handler
    raise Exception('Throw an error.')
Exception: Throw an error.
```

En dessous, vous pouvez également examiner les charges utiles des requêtes et des réponses Lambda. Datadog recueille les charges utiles des événements pour chaque appel Lambda.

### Logs

Les logs du prototype d'application sans serveur sont activés par défaut. Vous pouvez consulter les logs de chaque fonction via son onglet **Logs**.

{{< img src="getting_started/serverless/dd_logs_view.png" alt="Gros plan sur deux fonctions" style="width:80%;">}}

Vous pouvez filtrer ces logs pour n'afficher que les erreurs, mais aussi les consulter dans le [Log Explorer][12].


[1]: /fr/serverless
[2]: https://github.com/DataDog/serverless-sample-app
[3]: https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-serverless-sample-app&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-sample-app/latest.yaml
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.datadoghq.com/fr/getting_started/site
[6]: https://app.datadoghq.com/functions?cloud=aws&text_search=datadog-serverless-sample-app
[7]: https://docs.datadoghq.com/fr/serverless/guide/insights/#high-errors
[8]: https://docs.datadoghq.com/fr/serverless/guide/insights/#high-duration
[9]: https://docs.datadoghq.com/fr/serverless/guide/insights/#cold-starts
[10]: https://docs.datadoghq.com/fr/serverless/enhanced_lambda_metrics
[11]: https://app.datadoghq.com/screen/integration/30306?_gl=1*19700i3*_ga*OTk0Mjg4Njg4LjE2NDIwOTM2OTY.*_ga_KN80RDFSQK*MTY0OTI3NzAyMC4xNTAuMS4xNjQ5MjgzMjI1LjA.
[12]: https://docs.datadoghq.com/fr/logs/explorer/