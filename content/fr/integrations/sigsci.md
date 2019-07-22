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
- "https://github.com/DataDog/integrations-extras/blob/master/sigsci/README.md"
display_name: Signal Sciences
git_integration_title: sigsci
guid: 0c92b7cd-0736-4f9d-82ed-16f1bba8c8d0
integration_id: sigsci
integration_title: Signal Sciences
is_public: true
kind: integration
maintainer: info@signalsciences.com
manifest_version: 1.0.0
metric_prefix: sigsci.
metric_to_check: sigsci.test
name: sigsci
public_title: Intégration Datadog/Signal Sciences
short_description: Recueillez des données de Signal Sciences pour identifier les anomalies et bloquer les attaques
support: contrib
supported_os:
- linux
- mac_os
- windows
---

## Présentation

Envoyez des événements Signal Sciences à Datadog pour surveiller en temps réel les attaques et les abus ciblant vos applications, API et microservices, et pour vous assurer que Signal Sciences fonctionne et inspecte le trafic comme prévu.

![image-datadog-sigsci-securite][1]

Recueillez des événements Signal Sciences en temps réel pour :

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

Dans Datadog, [créez une clé d'API][2].

Dans votre [dashboard Signal Sciences][3] sur la barre de navigation du site, cliquez sur Manage > Integrations puis sur l'option Add à proximité de l'intégration Datadog Event.

Saisissez la clé d'API dans le champ API Key correspondant.

Cliquez sur Add.

## Données collectées
### Métriques

L'intégration Signal Sciences n'inclut aucune métrique.

### Événements

Tous les événements Signal Sciences sont envoyés vers votre [flux d'événements Datadog](https://docs.datadoghq.com/graphing/event_stream/)

### Checks de service

L'intégration Signal Sciences n'inclut aucun check de service.


## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

Pour en savoir plus sur la sécurité des applications, le DevOps, le SecOps et les autres types d'ops, consultez le [blog de Signal Sciences][5].

Pour vous inscrire à la bêta du service de surveillance Datadog/Signal Sciences, un outil gratuit permettant de voir en temps réel les attaques ciblant vos applications, API et micro-services sans abonnement à Signal Sciences, consultez notre [page d'inscription à la version bêta][6].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sigsci/images/datadog-sigsci-security.png
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://dashboard.signalsciences.net
[4]: http://docs.datadoghq.com/help/
[5]: https://labs.signalsciences.com
[6]: https://info.signalsciences.com/datadog-security


{{< get-dependencies >}}
