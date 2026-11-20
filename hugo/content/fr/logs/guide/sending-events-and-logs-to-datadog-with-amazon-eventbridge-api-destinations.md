---
further_reading:
- link: https://aws.amazon.com/blogs/compute/using-api-destinations-with-amazon-eventbridge/#sending-aws-events-to-datadog
  tag: Blog
  text: Blog AWS avec des exemples d'utilisation des destinations API
- link: /logs/guide/reduce_data_transfer_fees
  tag: Guide
  text: Comment envoyer des logs à Datadog tout en réduisant les frais de transfert
    de données
site_support_id: amazon-event-bridge
title: Envoyer des événements et des logs à Datadog à l'aide des destinations API
  d'Amazon EventBridge
---
Amazon EventBridge est un bus d'événements sans serveur qui vous permet de créer des applications pilotées par les événements. EventBridge peut s'intégrer à vos services AWS, mais la fonctionnalité API destinations vous permet d'envoyer des données vers des services externes à AWS et d'en récupérer au moyen d'API. Ce guide présente les étapes à suivre pour envoyer vos événements et logs depuis EventBridge vers Datadog. Pour plus d'informations sur l'envoi de vos événements depuis Datadog vers EventBridge, [consultez la documentation de l'intégration EventBridge][1].

## Configuration {#setup}

Avant de commencer, vous avez besoin d'un [compte Datadog][2] doté d'une [clé d'API][3]. Vous devez également avoir accès à la fonctionnalité de [destination API d'Amazon EventBridge][4].

### Configuration {#configuration}

1. Suivez les étapes de la [documentation Amazon sur la création d'une API destination][5] pour ajouter Datadog en tant qu'API destination.
    - Utilisez l'autorisation par clé d'API, avec `DD-API-KEY` comme nom de clé et votre [clé d'API Datadog][3] comme valeur.
    - Pour votre endpoint de destination, utilisez `https://{{< region-param key="http_endpoint" code="true" >}}/api/v2/logs` for logs and `https://event-management-intake.{{< region-param key="dd_site" code="true" >}}/api/v2/events` for events, and set `POST` comme méthode HTTP. Pour plus d'informations sur les différences entre les logs et les événements, consultez [Réduire les risques liés aux données][8].
2. Une fois la destination configurée, consultez la documentation Amazon pour [créer une règle EventBridge][10] et définir Datadog comme destination.

    If you're using the events endpoint, configure an [input transformer][16] on the target so the rule sends events in the format the endpoint expects. Use the following input path to extract values from the original event:

    ```json
    {
      "detailType": "$.detail-type",
      "source": "$.source",
      "time": "$.time"
    }
    ```

    Then, use the following input template to build the request body:

    ```json
    {
      "data": {
        "type": "event",
        "attributes": {
          "title": <detailType>,
          "message": "<detailType> from <source>",
          "category": "alert",
          "timestamp": <time>,
          "tags": ["source:<source>"],
          "attributes": {
            "status": "ok"
          }
        }
      }
    }
    ```

    Set `status` to `warn` or `error` for events that represent a problem. For AWS events that represent a configuration change, you can instead send `"category": "change"` with a `changed_resource` object. For the full list of accepted fields, see [Post an event][9].
3. Une fois la règle configurée avec Datadog comme destination, déclenchez un événement en publiant un événement sur EventBridge. Pour plus d'informations sur l'envoi d'événements vers EventBridge depuis Datadog, consultez la [documentation de l'intégration EventBridge][1]. Par exemple, pour déclencher un événement de test en [chargeant les objets dans un compartiment S3][11] de votre compte, utilisez cette commande AWS CloudShell :

    ```bash
    echo "test" > testfile.txt
    aws s3 cp testfile.txt s3://YOUR_BUCKET_NAME
    ```
4. Une fois l'envoi des événements et des logs lancé, les données sont disponibles après environ cinq minutes dans la [Logs Console][12] ou l'[Events Explorer][13] de Datadog, selon l'endpoint auquel vous les envoyez.

## Dépannage {#troubleshooting}

Pour afficher plus de détails sur les charges utiles envoyées à Datadog, et pour consulter la réponse des endpoints d'API, configurez une file d'attente Amazon SQS :  
1. Créez une file d'attente dans [Amazon SQS][14].
2. Accédez à la [règle EventBridge][15] que vous avez créée dans la section [Configuration](#configuration).
3. Sélectionnez l'onglet {{< ui >}}Targets{{< /ui >}} et cliquez sur {{< ui >}}Edit{{< /ui >}}.
4. Développez la section {{< ui >}}Additional settings{{< /ui >}}. 
4. Dans la section {{< ui >}}Dead-letter queue{{< /ui >}}, choisissez {{< ui >}}Select an Amazon SQS queue in the current AWS account to use as the dead-letter queue{{< /ui >}}.
5. Sélectionnez la file d'attente SQS que vous venez de créer.
6. Mettez à jour la règle.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/integrations/amazon_event_bridge/
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: /fr/account_management/api-app-keys/#api-keys
[4]: https://aws.amazon.com/eventbridge/
[5]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html#eb-api-destination-create
[8]: /fr/data_security/#other-sources-of-potentially-sensitive-data/
[9]: https://docs.datadoghq.com/fr/api/latest/events/#post-an-event
[10]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html
[11]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html
[12]: https://app.datadoghq.com/logs
[13]: https://app.datadoghq.com/event/explorer
[14]: https://console.aws.amazon.com/sqs/
[15]: https://console.aws.amazon.com/events/
[16]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-transform-target-input.html