---
categories:
  - monitoring
  - exceptions
dependencies: []
description: 'Affichez, recherchez et échangez sur des exceptions Airbrake dans votre flux d''événements.'
doc_link: 'https://docs.datadoghq.com/integrations/airbrake/'
draft: false
git_integration_title: airbrake
has_logo: true
integration_title: Airbrake
is_public: true
kind: integration
manifest_version: '1.0'
name: airbrake
public_title: Intégration Datadog/Airbrake
short_description: 'Affichez, recherchez et échangez sur des exceptions Airbrake dans votre flux d''événements.'
version: '1.0'
---
{{< img src="integrations/airbrake/airbrakeevent.png" alt="événement airbrake" popup="true">}}

## Présentation

Associez Airbrake à Datadog pour :

- Visualiser des exceptions en temps réel dans le flux d'événements
- Rechercher des exceptions sur vos graphiques
- Discuter des exceptions avec votre équipe

## Configuration

### Configuration

Pour configurer l'intégration Airbrake à l'aide de Webhooks :

1. Accédez à la page de réglages de votre compte Airbrake.

2. Pour chaque projet que vous souhaitez activer, cliquez sur "Integrations".

3. Cliquez sur WebHooks et saisissez l'URL suivante dans le champ URL :

    ```text
    https://app.datadoghq.com/intake/webhook/airbrake?api_key=<YOUR_DATADOG_API_KEY>
    ```

4. Cliquez sur Save.

## Données collectées

Lorsqu'une nouvelle erreur se produit, elle apparaît dans votre [flux d'événements][1].

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][2].

[1]: https://docs.datadoghq.com/fr/events/
[2]: https://docs.datadoghq.com/fr/help/