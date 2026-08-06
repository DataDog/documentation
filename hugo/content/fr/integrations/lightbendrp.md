---
categories:
- cloud
ddtype: agent
dependencies: []
description: Surveillez les événements relatifs aux acteurs et au répartiteur pour
  les applications basées sur Akka
doc_link: https://docs.datadoghq.com/integrations/lightbendrp/
draft: false
git_integration_title: lightbendrp
has_logo: true
integration_id: lightbendrp
integration_title: Lightbend
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: lightbendrp
public_title: Intégration Datadog/Lightbend
short_description: Surveillez les événements relatifs aux acteurs et au répartiteur
  pour les applications basées sur Akka
version: '1.0'
---

{{< img src="integrations/lightbendrp/dashboard_lightbendrp.png" alt="Dashboard Lightbend Reactive Platform" popup="true">}}

## Présentation

Recueillez des métriques de votre [application Lightbend Reactive Platform][1] en temps réel pour :

- Visualiser les métriques de performance de vos acteurs.
- Surveiller les événements inattendus (les exceptions, les messages non pris en charge, les lettres mortes, les ASO).
- Plonger au cœur des caractéristiques de remoting de votre application.
- Accéder à des métriques sur le répartiteur pour ajuster les performances de l'application.

## Configuration

### Installation

Cette intégration utilise Lightbend Monitoring, qui nécessite un [abonnement][2].

Utilisez le [plug-in Datadog][3] afin d'intégrer Lightbend Monitoring à Datadog en toute simplicité.

Par défaut, Lightbend Monitoring envoie toutes les métriques sur le réseau, mais il est possible de limiter les champs transmis à l'aide de la configuration (consultez l'exemple ci-dessous).

Le plug-in Datadog utiliser une configuration par défaut, qui peut être ignorée :

```text
cinnamon.datadog {
  statsd {
    host = "192.168.0.1"
    port = 8888
    frequency = 60s
  }

  report {
    histogram = ["min", "max", "p98", "p99", "p999"]
  }
}
```

Voici la description des valeurs de configuration :

- `cinnamon.datadog.statsd.host` : adresse IP de votre instance DogStatsD.
- `cinnamon.datadog.statsd.port` : numéro de port de votre instance DogStatsD.
- `cinnamon.datadog.statsd.frequency` : fréquence à laquelle les données sont envoyées depuis Cinnamon à l'instance DogStatsD.
- `cinnamon.datadog.report.histogram` : instruction décrivant comment filtrer les données histogram envoyées à DogStatsD. Dans l'exemple ci-dessus, seules les valeurs `max` et `p99` sont envoyées.

Consultez la [documentation Lightbend Monitoring][4] (en anglais) pour en savoir plus sur la configuration.

## Données collectées

### Métriques
{{< get-metrics-from-git "lightbendrp" >}}


### Événements

L'intégration Lightbend Reactive Platform n'inclut aucun événement.

### Checks de service

L'intégration Lightbend Reactive Platform n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://www.lightbend.com/platform
[2]: https://www.lightbend.com/platform/subscription
[3]: https://developer.lightbend.com/docs/monitoring/2.3.x/plugins/datadog/datadog.html
[4]: https://developer.lightbend.com/docs/monitoring/2.3.x/home.html
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/lightbendrp/lightbendrp_metadata.csv
[6]: https://docs.datadoghq.com/fr/help/