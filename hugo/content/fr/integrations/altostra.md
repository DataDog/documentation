---
assets:
  dashboards:
    Altostra: assets/dashboards/altostra.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- automation
- cloud
- configuration & deployment
- log collection
creates_events: false
ddtype: crawler
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/altostra/README.md
display_name: Altostra
draft: false
git_integration_title: altostra
guid: c5b325e5-a55a-4ff2-9c91-3aac9463c6be
integration_id: altostra
integration_title: Altostra
integration_version: ''
is_public: true
custom_kind: integration
maintainer: support@altostra.com
manifest_version: 1.0.0
metric_prefix: altostra.
metric_to_check: ''
name: altostra
public_title: Intégration Datadog/Altostra
short_description: Envoyer automatiquement vos logs d'application cloud depuis Altostra
  vers Datadog
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Altostra est une solution qui s'intègre aux services de cloud computing afin de fournir à vos équipes de développement des workflows de bout en bout.

Grâce à l'intégration Datadog/Altostra, vous pouvez instrumenter automatiquement vos projets Altostra lors du déploiement afin d'envoyer des logs et des métriques à votre compte Datadog. L'intégration se configure pour chaque environnement de déploiement.

## Configuration

### Installation

L'intégration Datadog/Altostra est proposée par défaut. Aucune installation n'est requise.

### Procédure à suivre

L'intégration Datadog est disponible dans la console Web Altostra, dans la section [Integrations][1] des paramètres de votre compte.

1. Accédez à la section [Integrations][1] des paramètres de votre compte Altostra.
2. Cliquez sur l'option **Connect** pour l'intégration **Datadog**.
3. Saisissez un **nom d'affichage** pour l'intégration.
4. Saisissez la **clé d'API** de votre compte Datadog.
5. Cliquez sur **OK** pour terminer la configuration de l'intégration.
6. Accédez à la section [Environments][2] et cliquez sur l'environnement pour lequel vous souhaitez configurer la transmission de logs.
7. Sous _Settings_, sélectionnez dans le menu **Log shipping** l'intégration que vous avez configurée lors des étapes précédentes.
8. Cliquez sur **Save Changes**.

### Validation

1. Déployez un projet Altostra qui contient une fonction Lambda sur l'environnement pour lequel vous avez configuré la transmission de logs à Datadog.
2. Invoquez la fonction Lambda.
3. Les logs de la fonction Lambda devraient s'afficher dans la vue _Logs_ de Datadog.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://app.altostra.com/team/settings/integrations/logging
[2]: https://app.altostra.com/environments
[3]: /fr/help