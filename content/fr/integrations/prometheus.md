---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/prometheus/README.md'
display_name: Prometheus
draft: false
git_integration_title: prometheus
guid: 58e75868-0933-407b-aaa5-469c252bdb2b
integration_id: prometheus
integration_title: Prometheus
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
name: prometheus
public_title: Intégration Datadog/Prometheus
short_description: Prometheus est un système de surveillance open source pour les données de métriques de séries temporelles
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Connectez-vous à Prometheus pour :
- Extraire des métriques custom depuis des endpoints Prometheus
- Consulter des alertes Prometheus Alertmanager dans votre flux d'événements Datadog

**Remarque :** nous vous conseillons d'utiliser le [check OpenMetrics][1] du fait de son efficacité accrue et de sa prise en charge complète du format texte Prometheus. N'utilisez le check Prometheus que lorsque l'endpoint de métriques ne prend pas en charge un format texte.

<div class="alert alert-warning">
Toutes les métriques récupérées par cette intégration sont considérées comme étant des <a href="https://docs.datadoghq.com/developers/metrics/custom_metrics">métriques custom</a>.
</div>

**Consultez la section [Collecte de métriques Prometheus[2] pour découvrir comment configurer un check Prometheus.**

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][3] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Prometheus est inclus avec l'Agent 6.1.0 et versions supérieures.

### Configuration

Modifiez le fichier `prometheus.d/conf.yaml` pour récupérer des métriques à partir d'applications qui exposent des endpoints OpenMetrics/Prometheus.

Chaque instance est au minimum composée des paramètres suivants :

| Paramètre          | Rôle                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| `prometheus_url` | Une URL qui indique l'itinéraire des métriques (**remarque :** doit être unique)                                                    |
| `namespace`      | Cet espace de nommage est ajouté en préfixe à toutes les métriques (pour éviter les conflits entre les noms de métriques)                                        |
| `metrics`        | Une liste de toutes les métriques à récupérer en tant que métriques custom au format `- <NOM_MÉTRIQUE>` ou `- <NOM_MÉTRIQUE>: <RENOMMER_MÉTRIQUE>` |

Lors de l'établissement de la liste de métriques, il est possible d'utiliser le wildcard `*` comme suit : `- <NOM_MÉTRIQUE>*` pour récupérer toutes les métriques correspondantes. **Remarque :** utilisez prudemment ce wildcard, car il peut entraîner l'envoi de nombreuses métriques custom.

D'autres paramètres plus avancés (ssl, labels joining, tags personnalisés, etc.) sont documentés dans le [fichier d'exemple prometheus.d/conf.yaml][4]

En raison de la nature de cette intégration, il est possible d'envoyer un nombre élevé de métriques custom à Datadog. Pour permettre aux utilisateurs de contrôler le nombre maximal de métriques envoyées en cas d'erreur de configuration ou de changement dans une entrée, le check présente une limite par défaut de 2 000 métriques. Cette limite peut être augmentée en définissant l'option `max_returned_metrics` dans le fichier `prometheus.d/conf.yaml` si vous le souhaitez.

Si `send_monotonic_counter: True`, l'Agent envoie les deltas des valeurs en question, et le type au sein de l'application est défini sur Count (il s'agit du comportement par défaut). Si `send_monotonic_counter: False`, l'Agent envoie la valeur brute, qui augmente de façon monotone, et le type au sein de l'application est défini sur gauge.

### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `prometheus` dans la section Checks.

## Données collectées

### Métriques

Toutes les métriques recueillies par le check Prometheus sont transmises à Datadog en tant que métriques custom.

Remarque : les données de compartiment d'une métrique histogram Prometheus `<NOM_MÉTRIQUE_HISTOGRAM>` sont conservées dans la métrique `<NOM_MÉTRIQUE_HISTOGRAM>.count`, dans Datadog. Les tags `upper_bound` indiquent le nom des compartiments. Pour accéder au compartiment `+Inf`, utilisez `upper_bound:none`.

### Événements

Les alertes Prometheus Alertmanager sont automatiquement envoyées à votre flux d'événements Datadog en tenant compte de la configuration des webhooks.

### Checks de service

Le check Prometheus n'inclut aucun check de service.

## Prometheus Alertmanager
Envoyez des alertes Prometheus Alertmanager dans le flux d'événements.

### Configuration
1. Ajoutez ce qui suit au fichier de configuration Alertmanager `alertmanager.yml` :
```
receivers:
- name: datadog
  webhook_configs: 
  - send_resolved: true
    url: https://app.datadoghq.com/intake/webhook/prometheus?api_key=<CLÉ_API_DATADOG>
```
2. Redémarrez les services Prometheus et Alertmanager.
```
sudo systemctl restart prometheus.service alertmanager.service
```

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

## Pour aller plus loin

- [Prometheus rejoint la liste des services pris en charge par l'Agent Datadog 6][7]
- [Configurer un check Prometheus][8]
- [Écrire un check Prometheus personnalisé][9]
- [Documentation sur Prometheus Alertmanager] [11]

[1]: https://docs.datadoghq.com/fr/integrations/openmetrics/
[2]: https://docs.datadoghq.com/fr/getting_started/integrations/prometheus/
[3]: https://docs.datadoghq.com/fr/getting_started/integrations/prometheus?tab=docker#configuration
[4]: https://github.com/DataDog/integrations-core/blob/master/prometheus/datadog_checks/prometheus/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/fr/help/
[7]: https://www.datadoghq.com/blog/monitor-prometheus-metrics
[8]: https://docs.datadoghq.com/fr/agent/prometheus/
[9]: https://docs.datadoghq.com/fr/developers/prometheus/