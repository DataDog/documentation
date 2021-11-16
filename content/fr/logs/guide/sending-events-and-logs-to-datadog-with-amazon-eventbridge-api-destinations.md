---
title: "Envoyer des événements et des logs à Datadog à l'aide des destinations API d'Amazon\_EventBridge"
kind: guide
further_reading:
  - link: https://aws.amazon.com/blogs/compute/using-api-destinations-with-amazon-eventbridge/#sending-aws-events-to-datadog
    tag: Blog
    text: Blog AWS avec des exemples d'utilisation des destinations API
---
Amazon EventBridge est un bus d'événements sans serveur qui simplifie la création d'applications basées sur les événements. Bien qu'EventBridge puisse s'intégrer à vos services API, la fonctionnalité de destination API vous permet de transmettre et de récupérer des données en dehors d'AWS, grâce à des API. Ce guide présente les différentes étapes à suivre pour envoyer vos événements et logs depuis EventBridge vers Datadog. Pour en savoir plus sur l'envoi d'événements depuis Datadog vers EventBridge, consultez la [documentation relative à l'intégration EventBridge][1].

## Configuration

Avant de commencer, vous avez besoin d'un [compte Datadog][2] doté d'une [clé d'API][3]. Vous devez également avoir accès à la fonctionnalité de [destination API d'Amazon EventBridge][4].

### Configuration

1. Suivez les étapes indiquées dans la [documentation Amazon sur la création d'une destination API][5] pour ajouter Datadog en tant que destination API.
    - Utilisez l'autorisation de la clé d'API, en définissant `DD-API-KEY` en tant que nom de votre clé et votre [clé d'API Datadog][3] en tant que valeur.
    - Définissez votre destination sur `https://http-intake.logs.datadoghq.com/v1/input` pour les logs ou sur `https://api.datadoghq.com/api/v1/events` pour les événements, et choisissez la méthode HTTP `POST`. Pour en savoir plus sur les différences entre les logs et les événements, consultez la [rubrique Logs][6] et la [rubrique Événements et commentaires][7] de la page [Catégories de données][8].
2. Une fois votre destination configurée, vous pouvez suivre les instructions d'Amazon afin de [créer une règle EventBridge][9], en définissant Datadog comme votre destination.
3. Déclenchez ensuite un événement en le publiant sur EventBridge. Pour en savoir plus sur la transmission d'événements depuis EventBridge vers Datadog, consultez la [documentation relative à l'intégration EventBridge][1]. Par exemple, pour déclencher un événement test en [important les objets vers un compartiment S3][10] dans votre compte, utilisez la commande AWS CloudShell suivante :

    ```bash
    echo "test" > testfile.txt
    aws s3 cp testfile.txt s3://YOUR_BUCKET_NAME
    ```
4. Une fois l'envoi des événements et logs initialisé, vous devez patienter environ cinq minutes avant de pouvoir visualiser vos données dans la [console de logs][11] ou le [flux d'événements][12], selon l'endpoint configuré.

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
[9]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html
[10]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html
[11]: https://app.datadoghq.com/logs
[12]: https://app.datadoghq.com/event/stream