---
categories:
- collaboration
- log collection
- provisioning
dependencies: []
description: Effectuez un suivi des logs Netlify.
doc_link: https://docs.datadoghq.com/integrations/netlify/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-netlify-with-datadog/
  tag: Blog
  text: Surveiller vos sites Netlify avec Datadog
git_integration_title: netlify
has_logo: true
integration_id: netlify
integration_title: Netlify
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: netlify
public_title: Intégration Datadog/Netlify
short_description: Effectuez un suivi des logs Netlify.
team: web-integrations
type: ''
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

[Netlify][1] est une plateforme de développement Web Jamstack qui vous permet de développer et de déployer des applications Web dynamiques et extrêmement performantes.

Intégrez Netlify à Datadog pour :

* Consulter et parser les logs de votre fonction et de trafic à l'aide de la solution [Log Management de Datadog][2]
* Consulter le nombre de requêtes de vos applications pour chaque code de statut HTTP
* Visualiser la durée de votre fonction et consulter les logs correspondants pour chaque requête
* Surveiller les performances frontend grâce à la [surveillance Synthetic Datadog][3]

## Formule et utilisation

1. Générez une [clé d'API Datadog][4].
2. Configuez vos [drains de logs Netlify][5] de façon à envoyer les logs à Datadog.

## Real User Monitoring

### Analyse d'entonnoirs

L'intégration Netlify n'inclut aucune métrique.

### Aide

L'intégration Netlify n'inclut aucun check de service.

### Aide

L'intégration Netlify n'inclut aucun événement.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.netlify.com/
[2]: https://docs.datadoghq.com/fr/logs/
[3]: https://docs.datadoghq.com/fr/synthetics/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.netlify.com/monitor-sites/log-drains/
[6]: https://docs.datadoghq.com/fr/help/