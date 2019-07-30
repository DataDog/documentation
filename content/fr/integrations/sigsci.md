---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - security
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/sigsci/README.md'
display_name: "Signal\_Sciences"
git_integration_title: sigsci
guid: 0c92b7cd-0736-4f9d-82ed-16f1bba8c8d0
integration_id: sigsci
integration_title: "Signal\_Sciences"
is_public: true
kind: integration
maintainer: info@signalsciences.com
manifest_version: 1.0.0
metric_prefix: sigsci.
metric_to_check: sigsci.test
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

![image-datadog-sigsci-dashboard][11]

![image-datadog-sigsci-securite][1]

Recueillez des événements et métriques Signal Sciences en temps réel pour :

* Visualiser les métriques WAF associées aux :
  - Requêtes totales
  - Principaux types d'attaques potentielles
  - Exécutions de commande
  - Injections SQL
  - Failles XSS (Cross-Site Scripting)
  - Analyses des chemins
  - Anomalies de trafic
  - Sources inconnues
  - Erreurs serveur 400/500

* Voir les adresses IP bloquées et/ou marquées comme malveillantes par Signal Sciences à la suite de l'une des activités suivantes :
  - Attaques par injection OWASP
  - DDoS d'application
  - Attaques par force brute
  - Abus et utilisation inappropriée d'application
  - Limitation du taux de requêtes
  - Piratage de compte
  - Bots malveillants
  - Patching virtuel

* Visualiser des alertes concernant l'état de l'agent Signal Sciences

## Implémentation

Pour utiliser l'intégration Datadog/Signal Sciences, vous devez être un client de Signal Sciences. Pour en savoir plus sur Signal Sciences, consultez le site <https://www.signalsciences.com>.

### Configuration

**Intégration des métriques**

- Installez l'[agent Signal Sciences][8]

- Configurez l'agent Signal Sciences afin de le faire utiliser DogStatsD :

  Ajoutez la ligne suivante au fichier agent.config de chaque agent :
    ```
    statsd-type = "dogstatsd"
    ```

    Une fois le fichier mis à jour, le client statsd de l'agent prend alors en charge les tags. Des métriques telles que `sigsci.agent.signal.<type_signal>` sont envoyées en tant que `sigsci.agent.signal` et reçoivent le tag `signal_type:<type_signal>`.

    *Exemple :* `sigsci.agent.signal.http404` => `sigsci.agent.signal` avec le tag `signal_type:http404`

- Configurez l'agent SigSci de façon à envoyer des métriques à l'Agent Datadog :

  Ajoutez la ligne suivante au fichier agent.config de chaque agent :
  ```
  statsd-address=<datadog agent hostname:port>
  ```

- Dans Datadog, vérifiez que le dashboard « Signal Sciences - Overview » a bien été créé et qu'il reçoit des métriques.

**Intégration des événements**

- Dans Datadog, [créez une clé d'API][2].

- Dans votre [dashboard Signal Sciences][3] sur la barre de navigation du site, cliquez sur Manage > Integrations puis sur l'option Add à proximité de l'intégration Datadog Event.

- Saisissez la clé d'API dans le champ API Key correspondant.

- Cliquez sur Add.


**Besoin d'informations supplémentaires ?**

- [Visionnez cette vidéo][9] (en anglais) pour en savoir plus sur la configuration de l'agent et de Datadog.
- Consultez la [documentation complète de Signal Sciences][10] (en anglais)

## Données collectées
### Métriques

```
sigsci.agent.waf.total
sigsci.agent.waf.error
sigsci.agent.waf.allow
sigsci.agent.waf.block
sigsci.agent.waf.perf.decision_time
sigsci.agent.waf.perf.queue_time
sigsci.agent.rpc.connections.open
sigsci.agent.runtime.cpu_pct
sigsci.agent.runtime.mem.sys_bytes
sigsci.agent.runtime.uptime
sigsci.agent.signal
```

### Événements

Tous les événements Signal Sciences sont transmis à votre [flux d'événements Datadog][4].

### Checks de service

L'intégration Signal Sciences n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

## Pour aller plus loin

Pour en savoir plus sur la sécurité des applications, le DevOps, le SecOps et les autres types d'ops, consultez le [blog de Signal Sciences][6] (en anglais).

Pour vous inscrire au service de surveillance Datadog/Signal Sciences, un outil gratuit permettant de voir en temps réel les attaques ciblant vos applications, API et microservices sans abonnement à Signal Sciences, consultez notre [page d'inscription][7].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sigsci/images/datadog-sigsci-security.png
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://dashboard.signalsciences.net
[4]: https://docs.datadoghq.com/fr/graphing/event_stream
[5]: https://docs.datadoghq.com/fr/help
[6]: https://labs.signalsciences.com
[7]: https://info.signalsciences.com/datadog-security
[8]: https://docs.signalsciences.net/install-guides/
[9]: https://player.vimeo.com/video/347360711
[10]: https://docs.signalsciences.net/integrations/datadog/
[11]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sigsci/images/datadog-sigsci-dashboard.png


{{< get-dependencies >}}