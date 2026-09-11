---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - notification
  - metrics
  - monitoring
  - slo
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/nobl9/README.md
display_name: Nobl9
draft: false
git_integration_title: nobl9
guid: 15874bd4-abe7-4d6c-bcaf-20d17c160c2b
integration_id: nobl9
integration_title: Nobl9
integration_version: ''
is_public: true
custom_kind: integration
maintainer: support@nobl9.com
manifest_version: 1.0.0
metric_prefix: nobl9.
name: nobl9
public_title: Nobl9
short_description: Utilisez Nobl9 pour recueillir des SLI, calculer des SLO et configurer des alertes de marge d'erreur
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation
Nobl9 est une plateforme de gestion des SLO qui offre des rapports historiques en temps réel sur vos SLO. Nobl9 peut être intégré à Datadog pour recueillir des métriques de SLI et les comparer aux cibles des SLO. Étant donné que Nobl9 calcule les marges d'erreur en fonction des seuils acceptables, il peut déclencher des processus et des alertes lorsque la marge d'erreur est utilisée trop rapidement ou qu'elle a été dépassée.

Utilisez l'intégration Datadog/Nobl9 pour :

- Intégrer votre contexte métier à vos données de surveillance
- Définir et mesurer vos objectifs de fiabilité
- Aligner vos activités sur les priorités fixées par la marge d'erreur

### Vue d'ensemble des SLO
![Vue d'ensemble des SLO][1]

### Détails d'un SLO
![Détails][2]

### Rapport sur un SLO
![Rapport sur un SLO][3]

### Dashboard de santé des services
![Dashboard de santé des services][4]

## Configuration

L'intégralité de la configuration s'effectue depuis la plateforme Nobl9.

1. Ajoutez l'endpoint d'API Datadog à utiliser pour la connexion à la source de données, c'est-à-dire `https://api.datadoghq.com/` ou `https://api.datadoghq.eu/` (obligatoire).
2. Donnez un nom à votre **Projet**. Ce champ est utile dans les cas où plusieurs utilisateurs sont répartis sur plusieurs équipes ou projets. Lorsqu'il est laissé vide, une valeur par défaut apparaît.
3. Le champ **Display Name** apparaît automatiquement lorsqu'un nom est saisi dans le champ **Name**.
4. Donnez un nom à votre source de données (obligatoire). Les noms des métadonnées sont uniques pour chaque projet et sont validés en fonction de certains noms RFC et DNS. Le nom de la source de données doit contenir uniquement des caractères alphanumériques minuscules et des tirets. Par exemple : `my-datadog-data-source`.
5. Saisissez une description (facultatif). Ajoutez les détails de l'équipe ou du propriétaire et expliquez pourquoi vous avez créé la source de données en question. Les descriptions permettent aux membres de l'équipe de comprendre immédiatement de quoi il s'agit.

Pour en savoir plus sur la création de SLO sur la plateforme Nobl9, consultez le [guide dédié de Nobl9][5].

## Dépannage

Besoin d'aide ? Contactez l'[assistance Nobl9][6] ou l'[assistance Datadog][7].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nobl9/images/grid_view.jpg
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nobl9/images/slo_detail.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nobl9/images/slo_report.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nobl9/images/service_health.png
[5]: https://nobl9.github.io/techdocs_User_Guide/#service-level-objectives-38
[6]: https://nobl9.com/about/#contact
[7]: https://docs.datadoghq.com/fr/help/