---
assets:
  dashboards:
    sigsci: assets/dashboards/overview.json
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - security
creates_events: true
ddtype: crawler
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/sigsci/README.md
display_name: "Signal\_Sciences"
draft: false
git_integration_title: sigsci
guid: 0c92b7cd-0736-4f9d-82ed-16f1bba8c8d0
integration_id: sigsci
integration_title: "Signal\_Sciences"
integration_version: ''
is_public: true
custom_kind: integration
maintainer: info@signalsciences.com
manifest_version: 1.0.0
metric_prefix: sigsci.
metric_to_check: sigsci.agent.signal
name: sigsci
public_title: "Intégration Datadog/Signal\_Sciences"
short_description: "Recueillez des données de Signal\_Sciences pour identifier les anomalies et bloquer les attaques"
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Envoyez des événements et métriques Signal Sciences à Datadog pour surveiller en temps réel les attaques et les abus ciblant vos applications, API et microservices, et pour vous assurer que Signal Sciences fonctionne et inspecte le trafic comme prévu.

![image-datadog-sigsci-dashboard][1]

![image-datadog-sigsci-sécurité][2]

Recueillez des événements et métriques Signal Sciences en temps réel pour :

- Visualiser les métriques WAF associées aux :

  - Requêtes totales
  - Principaux types d'attaques potentielles
  - Exécutions de commande
  - Injections SQL
  - Failles XSS (Cross-Site Scripting)
  - Analyses des chemins
  - Anomalies de trafic
  - Sources inconnues
  - Erreurs serveur 400/500

- Voir les adresses IP bloquées et/ou marquées comme malveillantes par Signal Sciences à la suite de l'une des activités suivantes :

  - Attaques par injection OWASP
  - DDoS d'application
  - Attaques par force brute
  - Utilisation abusive ou inappropriée d'une application
  - Limitation du taux de requêtes
  - Piratage de compte
  - Bots malveillants
  - Patching virtuel

- Visualiser des alertes concernant l'état de l'agent Signal Sciences

## Configuration

Pour utiliser l'intégration Datadog/Signal Sciences, vous devez être un client de Signal Sciences. Pour en savoir plus sur Signal Sciences, consultez le site <https://www.signalsciences.com>.

### Configuration

#### Collecte de métriques

1. Installez l'[agent Signal Sciences][3].

2. Configurez l'agent Signal Sciences afin de le faire utiliser DogStatsD :

   Ajoutez la ligne suivante au fichier agent.config de chaque Agent :

   ```shell
   statsd-type = "dogstatsd"
   ```

     Une fois le fichier mis à jour, le client statsd de l'agent prend alors en charge les tags. Des métriques telles que `sigsci.agent.signal.<type_signal>` sont envoyées en tant que `sigsci.agent.signal` et reçoivent le tag `signal_type:<type_signal>`.

   _Exemple : _`sigsci.agent.signal.http404` => `sigsci.agent.signal` avec le tag `signal_type:http404`

    Si vous utilisez Kubernetes pour exécuter l'Agent Datadog, assurez-vous d'activer le trafic DogStatsD non local comme indiqué dans la [documentation relative à DogStatsD pour Kubernetes][4].

3. Configurez l'agent SigSci de façon à envoyer des métriques à l'Agent Datadog :

    Ajoutez la ligne suivante au fichier agent.config de chaque Agent :

   ```shell
   statsd-address="<DATADOG_AGENT_HOSTNAME>:<DATADOG_AGENT_PORT>"
   ```

4. Cliquez sur le bouton pour installer l'intégration.

5. Dans Datadog, vérifiez que le dashboard « Signal Sciences - Overview » a bien été créé et qu'il reçoit des métriques.

#### Collecte d'événements

1. Dans Datadog, [créez une clé d'API][5].

2. Dans votre [dashboard Signal Sciences][6] sur la barre de navigation du site, cliquez sur Manage > Integrations, puis sur l'option Add à proximité de l'intégration Datadog Event.

3. Saisissez la clé d'API dans le champ _API Key_ correspondant.

4. Cliquez sur _Add_.

Pour en savoir plus, consultez la [documentation Signal Sciences sur l'intégration Datadog][7] (en anglais).

## Données collectées

### Métriques
{{< get-metrics-from-git "sigsci" >}}


### Événements

Tous les événements Signal Sciences sont transmis à votre [flux d'événements Datadog][9].

### Checks de service

L'intégration Signal Sciences n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Blog Signal Sciences][11]

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sigsci/images/datadog-sigsci-dashboard.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sigsci/images/datadog-sigsci-security.png
[3]: https://docs.signalsciences.net/install-guides/
[4]: https://docs.datadoghq.com/fr/agent/kubernetes/dogstatsd/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://dashboard.signalsciences.net
[7]: https://docs.signalsciences.net/integrations/datadog/
[8]: https://github.com/DataDog/integrations-extras/blob/master/sigsci/metadata.csv
[9]: https://docs.datadoghq.com/fr/events/
[10]: https://docs.datadoghq.com/fr/help/
[11]: https://www.signalsciences.com/blog/