---
categories:
- monitoring
- notification
dependencies: []
description: Générez des alertes PagerDuty à partir des métriques et des événements
  Datadog.
doc_link: https://docs.datadoghq.com/integrations/pagerduty/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/mobile-incident-management-datadog/
  tag: Blog
  text: Gérez les incidents où que vous soyez avec l'application mobile Datadog
- link: https://www.datadoghq.com/blog/how-pagerduty-deploys-safely-with-datadog/
  tag: Blog
  text: Comment PagerDuty effectue ses déploiements en toute sécurité avec Datadog
- link: https://docs.datadoghq.com/tracing/service_catalog/integrations/#pagerduty-integration
  tag: Blog
  text: Utiliser les intégrations avec le Service Catalog
git_integration_title: pagerduty
has_logo: true
integration_id: ''
integration_title: PagerDuty
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: pagerduty
public_title: Intégration Datadog/PagerDuty
short_description: Générez des alertes PagerDuty à partir des métriques et des événements
  Datadog.
version: '1.0'
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">L'intégration PagerDuty ne prend pas en charge le site gouvernemental Datadog. <b>Remarque</b> : vous pouvez néanmoins envoyer des notifications de monitor à PagerDuty.</div>
{{< /site-region >}}

## Présentation

Associez PagerDuty à Datadog pour :

- Déclencher et résoudre des incidents depuis votre flux en mentionnant `@pagerduty` dans votre publication
- Visualiser les incidents et actions d'escalade en temps réel depuis votre flux
- Être informé quotidiennement des personnes en service

## Configuration

Consultez le [guide de l'intégration Datadog][1] dans la documentation PagerDuty (en anglais).

{{< site-region region="us" >}}
Une fois l'intégration de PagerDuty configurée, vous pouvez consulter les [tendances des incidents Pagerduty][2] personnalisées de Datadog.
{{< /site-region >}}

## Données collectées

### Métriques

L'intégration PagerDuty n'inclut aucune métrique.

### Événements

Vos événements PagerDuty résolus/déclenchés s'affichent dans l'[Events Explorer][2].

<div class="alert alert-warning">Les Webhooks V3 PagerDuty envoient uniquement les événements à l'application Incidents de Datadog.</div>

### Checks de service

L'intégration PagerDuty n'inclut aucun check de service.

## Dépannage

### Envoyer une notification à un service PagerDuty spécifique

Si vous avez intégré plusieurs services PagerDuty et que vous souhaitez envoyer un message ou une notification à un service spécifique, ajoutez `@pagerduty-[nomDuService]` dans le message de votre monitor. Si vous commencez la saisie dans la section **Say what's happening** de votre monitor, le nom du service est automatiquement complété.

{{< img src="integrations/pagerduty/pagerduty_faq_1.png" alt="faq 1 PagerDuty" popup="true">}}

Pour résoudre automatiquement le service PagerDuty lors du rétablissement d'un monitor, ajoutez la mention de notification dans le message de rétablissement du monitor. Cela ne fonctionnera pas si vous l'ajoutez uniquement dans le contexte `{{#is_alert}}`.

### Correspondances des sévérités des incidents PagerDuty

La sévérité d'un incident PagerDuty est déterminée à partir du statut du monitor qui a déclenché l'alerte. Le tableau suivant présente les correspondances entre les statuts d'alerte et les sévérités des incidents PagerDuty.

| Statut du monitor     | Sévérité de l'incident PagerDuty             |
|--------------------|-----------------------------------------|
| `ALERT`            | `error`                                 |
| `NODATA`           | `error`                                 |
| `WARNING`          | `warning`                               |
| `OK` ou autres     | `info`                                  |

Par exemple, si le statut du monitor passe de `OK` à `WARNING` et notifie `@pagerduty-[NomDuService]`, la sévérité de l'incident PagerDuty créé sera `warning`.

**Remarque** : ces correspondances sont déterminées automatiquement et ne peuvent pas être modifiées.

### Description des alertes tronquée

La longueur des notifications de votre monitor envoyées à PagerDuty est limitée par Datadog. Cette limite est de **1 024 caractères**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://www.pagerduty.com/docs/guides/datadog-integration-guide
[2]: https://docs.datadoghq.com/fr/events/explorer/