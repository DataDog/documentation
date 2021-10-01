---
categories:
  - monitoring
ddtype: crawler
dependencies: []
description: Envoyez vos alertes Catchpoint à votre flux d'événements Datadog.
doc_link: 'https://docs.datadoghq.com/integrations/catchpoint/'
draft: false
git_integration_title: catchpoint
has_logo: true
integration_title: Catchpoint
is_public: true
kind: integration
manifest_version: '1.0'
name: catchpoint
public_title: Intégration Datadog/Catchpoint
short_description: Envoyez vos alertes Catchpoint à votre flux d'événements Datadog.
version: '1.0'
---
{{< img src="integrations/catchpoint/catchpoint_event.png" alt="événement catchpoint" popup="true">}}

## Présentation

Catchpoint est une plateforme d'analyse des performances numériques vous permettant d'optimiser les expériences client que vous offrez.

Associez Catchpoint à Datadog pour :

- Configurer des alertes exhaustives dans votre flux d'événements
- Créer des liens directs vers des tableaux d'analyse du portail Catchpoint
- Ajouter des tags relatifs au type d'alerte afin de filtrer facilement les données

## Configuration

### Installation

Aucune installation n'est requise.

### Configuration

Pour afficher des alertes Catchpoint dans votre flux, connectez-vous au portail Catchpoint et accédez à _Settings -> API_.

1. Sous Alerts API, sélectionnez Enable.
2. Saisissez l'URL de l'endpoint Datadog.

    ```text
    https://app.datadoghq.com/api/v1/events?api_key=<YOUR_DATADOG_API_KEY>
    ```

    Vous devez également indiquer la clé d'API Datadog. Vous pouvez la créer depuis le portail Datadog.

3. Définissez Status sur Active.
4. Sélectionnez le format Template.
5. Ajoutez un nouveau modèle.
6. Saisissez le nom du modèle, par exemple Datadog, puis définissez son format sur JSON.
7. Utilisez le modèle JSON suivant, puis enregistrez-le :

```json
{
    "title": "${TestName} [${TestId}] - ${switch(${notificationLevelId},'0','WARNING','1','CRITICAL','3','OK')}",
    "text": "${TestName} - http://portal.catchpoint.com/ui/Content/Charts/Performance.aspx?tList=${testId}&uts=${alertProcessingTimestampUtc}&z=&chartView=1",
    "priority": "normal",
    "tags": [
        "alertType:${Switch(${AlertTypeId},'0', 'Inconnu','2', 'Longueur d\'octet','3','Correspondance de contenu','4', 'Échec du host','7', 'Calcul du temps','9', 'Échec du test', '10','Information', '11','Échec JavaScript', '12', 'Ping',13, 'Requête')}"
    ],
    "alert_type": "${switch(${notificationLevelId},'0','warning','1','error','3','success')}",
    "source_type_name": "catchpoint"
}
```

Catcpoint enverra désormais toutes les alertes au flux d'événements dans Datadog.
{{< img src="integrations/catchpoint/catchpoint_configuration.png" alt="Configuration Catchpoint" popup="true">}}

## Données collectées

### Métriques

L'intégration Catchpoint n'inclut aucune métrique.

### Événements

L'intégration Catchpoint enverra les événements Catchpoint à votre flux d'événements Datadog.

### Checks de service

L'intégration Catchpoint n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][1].

[1]: https://docs.datadoghq.com/fr/help/