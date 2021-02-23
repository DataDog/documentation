---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/buddy/README.md'
display_name: Buddy
draft: false
git_integration_title: buddy
guid: 7b131269-e2ba-4279-b9dd-82e85764d389
integration_id: buddy
integration_title: Buddy
is_public: true
kind: integration
maintainer: support@buddy.works
manifest_version: 1.0.2
name: buddy
public_title: Intégration Datadog/Buddy
short_description: Automatisation de la livraison en un seul clic grâce à des aperçus de sites Web actifs pour les développeurs Web.
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Grâce à cette intégration, vous pouvez :

- Envoyer des événements sur des déploiements à Datadog
- Corréler les détails de vos déploiements avec vos métriques Datadog
- Détecter les sources de pics de performance

![integration-datadog][1]

## Configuration

- Dans les réglages de votre compte Datadog, accédez à [Integrations -> APIs][2] et copiez le token **API Key**.

- [Connectez-vous à votre compte Buddy][3] et accédez au pipeline contenant l'action de déploiement que vous souhaitez surveiller.

- Cliquez sur le signe « plus » à la fin du pipeline et sélectionnez **Datadog** dans la section **Notifications**.

- Saisissez le nom de votre compte Datadog et collez la clé d'API que vous avez copiée.

- Utilisez les [paramètres Buddy][4] pour définir le titre de l'événement et le contenu transmis. Par exemple :

```text
# Titre de l'événement
${'${execution.pipeline.name} execution #${execution.id}'}

# Contenu
${'${execution.to_revision.revision} - ${execution.to_revision.message}'}
```

- Une fois vos réglages effectués, cliquez sur **Add action** et exécutez le pipeline. Pour chaque déploiement réussi, Buddy enverra un événement à Datadog :

![snapshot][5]

## Données collectées

### Métriques

Le check Buddy n'inclut aucune métrique.

### Événements

Tous les événements de déploiement Buddy sont transmis à votre [flux d'événements Datadog][6].

### Checks de service

Le check Buddy n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/buddy/images/datadog-integration.png
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://app.buddy.works/login
[4]: https://buddy.works/knowledge/deployments/what-parameters-buddy-use
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/buddy/images/snapshot.png
[6]: https://docs.datadoghq.com/fr/events/
[7]: https://docs.datadoghq.com/fr/help/