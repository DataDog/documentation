---
aliases:
- /fr/integrations/awssns/
categories:
- cloud
- notifications
- aws
- log collection
dependencies: []
description: Envoyez des messages Amazon SNS à Datadog ou des alertes Datadog à SNS.
doc_link: https://docs.datadoghq.com/integrations/amazon_sns/
draft: false
git_integration_title: amazon_sns
has_logo: true
integration_id: ''
integration_title: Amazon Simple Notification Service (SNS)
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_sns
public_title: Intégration Datadog/Amazon Simple Notification Service (SNS)
short_description: Envoyez des messages Amazon SNS à Datadog ou des alertes Datadog
  à SNS.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/amazon_sns/snsdashboard.png" alt="SNS Dashboard" popup="true">}}

## Présentation

Associez Amazon Simple Notification Service (SNS) à Datadog pour accomplir ce qui suit :

- Voir les messages SNS sous forme d'événements dans votre flux
- Envoyer des alertes et notifications d'événement à SNS

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Sur la [page de l'intégration AWS][2], vérifiez que `SNS` est activé dans l'onglet `Metric Collection`.

2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin de recueillir des métriques Amazon SNS. Pour en savoir plus, consultez la section relative aux [stratégies SNS][4] de la documentation AWS.

    | Autorisation AWS   | Description                                             |
    | ---------------- | ------------------------------------------------------- |
    | `sns:ListTopics` | Utilisé pour énumérer les rubriques disponibles.                          |
    | `sns:Publish`    | Utilisé pour publier des notifications (flux d'événements ou monitors). |

3. Installez l'[intégration Datadog/Amazon SNS][5].

### Collecte d'événements

#### Recevoir les messages de SNS

Vous pouvez recevoir des messages SNS au sein du flux d'événements Datadog via les protocoles `HTTPS` et `Email`. Le protocole `HTTPS` vous permet de confirmer automatiquement l'abonnement à l'aide d'une URL de webhook.

Le protocole `Email` nécessite la confirmation manuelle de l'adresse e-mail générée automatiquement par Datadog. Consultez le guide [Créer des événements Datadog à partir d'e-mails Amazon SNS][6] pour en savoir plus.

Pour recevoir les messages SNS dans l'Event Explorer Datadog via le protocole `HTTPS`, procédez comme suit :

1. Dans la section **Topics** de la console de gestion SNS, sélectionnez la rubrique souhaitée et cliquez sur **Create subscription**.
2. Sélectionnez le protocole `HTTPS`, puis saisissez l'URL de webhook suivante, en prenant soin de remplacer `<API_KEY>` par la valeur d'une clé d'API Datadog valide :

    ```text
    ## Datadog US site
    https://app.datadoghq.com/intake/webhook/sns?api_key=<API_KEY>

    ## Datadog EU site
    https://app.datadoghq.eu/intake/webhook/sns?api_key=<API_KEY>
    ```

3. Ne cochez pas la case **Enable raw message delivery**.
4. Cliquez sur **Créer un abonnement**.

#### Envoyer des notifications SNS

Pour envoyer des notifications SNS depuis Datadog :

1. Configurez le compte AWS associé à un service SNS sur la page de l'intégration AWS.
2. Installez l'[intégration SNS][5].
3. Datadog détecte alors vos rubriques SNS configurées et active les @notifications, par exemple : `@sns-topic-name`.

### Collecte de logs

SNS ne fournit pas de logs. Traitez les logs et les événements transmis via le service SNS.

#### Envoyer des logs à Datadog

1. Configurez une nouvelle rubrique SNS.
2. Sélectionnez la rubrique d'où proviennent les messages.
3. Pour le protocole, sélectionnez **AWS Lambda**.
4. Pour l'endpoint, saisissez l'ARN de la fonction Lambda du Forwarder Datadog.

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_sns" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration Amazon SNS comprend des événements pour les abonnements aux rubriques. Vous trouverez ci-dessous un exemple d'événement :

{{< img src="integrations/amazon_sns/aws_sns_event.png" alt="Événements Amazon SNS" >}}

### Checks de service

L'intégration Amazon SNS n'inclut aucun check de service.

## Dépannage

Datadog ne prend pas en charge les notifications SNS envoyées depuis Datadog vers des rubriques en Chine.

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/sns/latest/dg/sns-using-identity-based-policies.html
[5]: https://app.datadoghq.com/integrations/amazon-sns
[6]: https://docs.datadoghq.com/fr/integrations/guide/events-from-sns-emails/
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_sns/amazon_sns_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/