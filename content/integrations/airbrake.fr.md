---
categories:
- monitoring
- exceptions
description: Affichez, recherchez et discutez des exceptions Airbrake dans votre flux d'événements.
doc_link: https://docs.datadoghq.com/integrations/airbrake/
git_integration_title: airbrake
has_logo: true
integration_title: Airbrake
is_public: true
kind: integration
manifest_version: '1.0'
name: airbrake
public_title: Intégration Datadog-Airbrake
short_description: Affichez, recherchez et discutez des exceptions Airbrake dans votre flux d'événements.
  stream.
version: '1.0'
---

{{< img src="integrations/airbrake/airbrakeevent.png" alt="airbrake event" responsive="true" >}}

## Aperçu

Connecter Airbrake à Datadog pour:

  * Voir les exceptions en temps réel dans le flux d'événements.
  * Rechercher des exceptions sur vos graphiques.
  * Discuter des exceptions avec votre équipe.

## Implémentation
### Configuration

Implémenter l'intégration Airbrake avec des Webhooks:

1. Allez sur la page Settings dans votre compte Airbrake

2. Pour chaque projet que vous souhaitez activer, cliquez sur "Intégrations"

3. Cliquez sur "WebHooks" et entrez cette URL dans le champ "URL":
4. 
```
https://app.datadoghq.com/intake/webhook/airbrake?api_key=<YOUR_DATADOG_API_KEY>
```

4. Cliquez sur "Save"

## Données collectées

A chaque fois qu'une nouvelle erreur survient, elle apparaitra dans votre [flux d'événements](https://docs.datadoghq.com/graphing/event_stream/).

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

