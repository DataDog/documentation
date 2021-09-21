---
aliases:
  - /fr/integrations/awssns/
categories:
  - cloud
  - notification
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Envoyez des messages Amazon\_SNS à Datadog ou des alertes Datadog à SNS."
doc_link: https://docs.datadoghq.com/integrations/amazon_sns/
draft: false
git_integration_title: amazon_sns
has_logo: true
integration_id: amazon-sns
integration_title: Amazon SNS
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_sns
public_title: "Intégration Datadog/Amazon\_SNS"
short_description: "Envoyez des messages Amazon\_SNS à Datadog ou des alertes Datadog à SNS."
version: '1.0'
---
{{< img src="integrations/amazon_sns/snsdashboard.png" alt="Dashboard SNS" popup="true">}}

## Présentation

Associez SNS à Datadog pour :

- Voir les messages SNS sous forme d'événements dans votre flux
- Envoyer des alertes et notifications d'événement à SNS

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `SNS` est cochée dans la section concernant la collecte des métriques.

2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin de recueillir des métriques Amazon SNS. Pour en savoir plus sur les stratégies SNS, consultez [la documentation du site Web d'AWS][4].

    | Autorisation AWS   | Description                                             |
    | ---------------- | ------------------------------------------------------- |
    | `sns:ListTopics` | Utilisé pour énumérer les rubriques disponibles.                          |
    | `sns:Publish`    | Utilisé pour publier des notifications (flux d'événements ou monitors). |

3. Installez l'[intégration Datadog/AWS SNS][5].

### Collecte d'événements

#### Recevoir les messages de SNS

Pour recevoir les messages de SNS dans le flux d'événements Datadog :

1. Dans la section Topics de la console de gestion SNS, sélectionnez la rubrique souhaitée et cliquez sur **Create subscription**.
2. Sélectionnez https et saisissez l'URL Webhook suivante :

    ```text
    ## Datadog US site
    https://app.datadoghq.com/intake/webhook/sns?api_key=<API KEY>

    ## Datadog EU site
    https://app.datadoghq.eu/intake/webhook/sns?api_key=<API KEY>
    ```

3. N'activez pas l'option « raw message delivery ».

#### Envoyer des notifications SNS

Pour envoyer des notifications SNS depuis Datadog :

1. Configurez le compte AWS associé à un service SNS sur le carré d'intégration AWS.
2. [Installez l'intégration SNS][5].
3. Datadog détecte alors vos rubriques SNS configurées et met en évidence les notifications « @ » (par ex., « @nom-rubrique-sns »).

### Collecte de logs

SNS ne fournit pas de logs. Traitez les logs et les événements transmis via le service SNS.

#### Envoyer des logs à Datadog

1. Configurez un nouvel abonnement SNS
2. Sélectionnez la rubrique d'où proviennent les messages
3. Choisissez « Lambda » comme protocole et l'ARN de la fonction Lambda du Forwarder Datadog

{{< img src="integrations/amazon_sns/aws_sns_log_collection_1.png" alt="Collecte de logs AWS sns" popup="true" style="width:70%;">}}

{{< img src="integrations/amazon_sns/aws_sns_log_collection_2.png" alt="Collecte de logs AWS sns 2" popup="true" style="width:70%;">}}

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_sns" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS SNS comprend des événements pour les abonnements aux rubriques. Vous trouverez ci-dessous un exemple d'événement :

{{< img src="integrations/amazon_sns/aws_sns_event.png" alt="Événements AWS SNS" >}}

### Checks de service

L'intégration AWS SNS n'inclut aucun check de service.

## Dépannage

Datadog ne prend pas en charge les notifications SNS envoyées depuis Datadog vers des rubriques dans les régions GovCloud ou Chine.

Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_sns.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_sns
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_sns/amazon_sns_metadata.csv
[7]: https://docs.datadoghq.com/fr/help/