---
further_reading:
- link: https://aws.amazon.com/blogs/compute/using-api-destinations-with-amazon-eventbridge/#sending-aws-events-to-datadog
  tag: Blog
  text: Blog AWS avec des exemples d'utilisation des destinations API

title: Envoyer des événements et des logs à Datadog à l'aide des destinations API
  d'Amazon EventBridge
---

Amazon EventBridge est un bus d'événements sans serveur qui simplifie la création d'applications basées sur les événements. Bien qu'EventBridge puisse s'intégrer à vos services API, la fonctionnalité de destination API vous permet de transmettre et de récupérer des données en dehors d'AWS, grâce à des API. Ce guide présente les différentes étapes à suivre pour envoyer vos événements et logs depuis EventBridge vers Datadog. Pour en savoir plus sur l'envoi d'événements depuis Datadog vers EventBridge, consultez la [documentation relative à l'intégration EventBridge][1].

## Configuration

Avant de commencer, vous avez besoin d'un [compte Datadog][2] doté d'une [clé d'API][3]. Vous devez également avoir accès à la fonctionnalité de [destination API d'Amazon EventBridge][4].

### Configuration

1. Suivez les étapes indiquées dans la [documentation Amazon sur la création d'une destination API][5] pour ajouter Datadog en tant que destination API.
    - Utilisez l'autorisation de la clé d'API, en définissant `DD-API-KEY` en tant que nom de votre clé et votre [clé d'API Datadog][3] en tant que valeur.
    - Définissez votre endpoint de destination sur `https://{{< region-param key="http_endpoint" code="true" >}}/api/v2/logs` pour les logs et sur `https://api.{{< region-param key="dd_site" code="true" >}}/api/v1/events` pour les événements, et choisissez la méthode HTTP `POST`. Pour en savoir plus sur les différences entre les logs et les événements, consultez la [rubrique Logs][6] et la [rubrique Événements][7] de la section [Catégories de données][8].
    - Si vous utilisez l'endpoint d'événements, vous devez inclure un `title` et un `text` sous forme de paramètres `body.field` dans la connexion de destination de l'API. Ces valeurs sont requises pour utiliser la méthode `POST` et transmettre les événements au endpoint dédié. Pour en savoir plus, consultez la [rubrique Post an event][9].
2. Une fois votre destination configurée, référez-vous à la documentation Amazon afin de [créer une règle EventBridge][10], en définissant Datadog comme votre destination.
3. Déclenchez ensuite un événement en le publiant sur EventBridge. Pour en savoir plus sur la transmission d'événements depuis Datadog vers EventBridge, consultez la [documentation relative à l'intégration EventBridge][1]. Par exemple, pour déclencher un événement test en [important les objets vers un compartiment S3][11] dans votre compte, utilisez la commande AWS CloudShell suivante :

    ```bash
    echo "test" > testfile.txt
    aws s3 cp testfile.txt s3://YOUR_BUCKET_NAME
    ```
4. Une fois l'envoi des événements et logs initialisé, vous devez patienter environ cinq minutes avant de pouvoir visualiser vos données dans la [console de logs][12] ou l'[Events Explorer][13] Datadog, selon l'endpoint configuré.

## Dépannage

Pour afficher plus de détails sur les charges utiles envoyées à Datadog, et pour consulter la réponse des endpoints d'API, configurez une file d'attente Amazon SQS :
1. Créez une file d'attente dans [Amazon SQS][14].
2. Accédez à la [règle EventBridge][15] que vous avez créé en suivant les instructions de la rubrique [Configuration](#configuration).
3. Sélectionnez l'onglet **Targets** et cliquez sur **Edit**.
4. Développez la section **Additional settings**.
4. Dans la section *Dead-letter queue*, choisissez l'option **Select an Amazon SQS queue in the current AWS account to use as the dead-letter queue**.
5. Sélectionnez la file d'attente SQS que vous venez de créer.
6. Mettez à jour la règle.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/integrations/amazon_event_bridge/
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: /fr/account_management/api-app-keys/#api-keys
[4]: https://aws.amazon.com/eventbridge/
[5]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html#eb-api-destination-create
[6]: /fr/security/#logs
[7]: /fr/security/#events-and-comments
[8]: /fr/security/
[9]: https://docs.datadoghq.com/fr/api/latest/events/#post-an-event
[10]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html
[11]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html
[12]: https://app.datadoghq.com/logs
[13]: https://app.datadoghq.com/event/explorer
[14]: https://console.aws.amazon.com/sqs/
[15]: https://console.aws.amazon.com/events/