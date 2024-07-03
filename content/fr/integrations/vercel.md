---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Vercel: assets/dashboards/vercel_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- ''
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/vercel/README.md
display_name: Vercel
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-vercel-serverless-functions-with-datadog/
  tag: Blog
  text: Surveiller les fonctions sans serveur Vercel avec Datadog
git_integration_title: vercel
guid: cf0daf64-9c85-43b1-8b6b-7d08f8d31b0f
integration_id: vercel
integration_title: Vercel
integration_version: ''
is_public: true
custom_kind: integration
maintainer: https://docs.datadoghq.com/help/
manifest_version: 1.0.0
metric_prefix: vercel.
metric_to_check: ''
name: vercel
public_title: Vercel
short_description: Surveiller vos application sans serveur exécutées sur Vercel
support: contrib
supported_os:
- linux
- mac_os
- windows
---



![integration-datadog][1]

## Présentation

[Vercel][2] est une plateforme de déploiement et de collaboration qui permet aux développeurs frontend de créer des sites Web et applications hautes performances. Vercel est également à l'origine de Next.js, un framework React développé en partenariat avec des ingénieurs de Google et Facebook en 2016. Les utilisateurs de Vercel peuvent tirer parti d'un outil de déploiement intégré qui gère le processus de build et de rendu, ainsi que d'un [réseau Edge][3] propriétaire qui met en cache leurs sites pour une récupération rapide des données. Par ailleurs, Vercel offre des [fonctions sans serveur][4] qui permettent aux utilisateurs de déployer du code sans serveur pour exécuter des processus backend essentiels tels que l'authentification des utilisateurs, l'envoi de formulaires et les requêtes de base de données.

Intégrez Vercel à Datadog pour :

- Consulter et parser les logs de votre application à l'aide de la solution [Log Management de Datadog][5]
- Consulter le nombre de requêtes et d'erreurs HTTP 4xx/5xx présentes sur vos applications sans serveur et API exécutés sur Vercel
- Surveiller les performances frontend grâce à [Datadog Synthetics][6]

## Configuration

- Générez une [clé d'API Datadog][7]
- Configurez l'intégration des logs par le biais du [Marketplace Vercel][8]

## Données collectées

### Métriques

L'intégration Vercel n'inclut aucune métrique.

### Checks de service

L'intégration Vercel n'inclut aucun check de service.

### Événements

L'intégration Vercel n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vercel/images/logo-full-black.png
[2]: https://vercel.com/
[3]: https://vercel.com/docs/edge-network/overview
[4]: https://vercel.com/docs/serverless-functions/introduction
[5]: /fr/logs/
[6]: /fr/synthetics/
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: https://vercel.com/integrations/datadog-logs