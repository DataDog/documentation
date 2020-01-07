---
"assets":
  "dashboards":
    "Contrast Security Integration Overview": assets/dashboards/contrast_security_protect.json
  "monitors": {}
  "service_checks": assets/service_checks.json
"categories":
- log collection
"creates_events": !!bool "false"
"ddtype": check
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/contrastsecurity/README.md"
"display_name": contrastsecurity
"git_integration_title": contrastsecurity
"guid": 8483bcdc-3d45-48ee-8a73-75511a67ad5f
"integration_id": contrastsecurity
"integration_title": Contrast Security
"is_public": !!bool "false"
"kind": integration
"maintainer": kristiana.mitchell@contrastsecurity.com
"manifest_version": 1.0.0
"metric_prefix": contrastsecurity.
"metric_to_check": ""
"name": contrastsecurity
"public_title": Intégration Datadog/Contrast Security
"short_description": Visualisez sur Datadog les attaques et les vulnérabilités identifiées par Contrast Security
"support": contrib
"supported_os":
- linux
- mac_os
- windows
---



## Présentation

L'intégration Datadog/Contrast Security vous permet de transmettre vos logs Contrast à Datadog.

## Configuration

### Activer la collecte de logs Contrast Security

Sur les plateformes Linux, l'activation de la collecte de logs pour l'Agent Datadog se fait dans `/etc/datadog-agent/datadog.yaml`. Sur les autres plateformes, consultez la [section Fichiers de configuration de l'Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6) pour connaître l'emplacement de votre fichier de configuration :
```
logs_enabled: true
```

* Ajoutez ce bloc de configuration à votre fichier `contrastsecurity.d/conf.yaml` pour commencer à recueillir vos logs Contrast :
* Créez un fichier `conf.yaml`.
* Ajoutez un groupe de configuration de collecte de logs personnalisée.
```
logs:
  - type: file
    path: /path/to/contrast/security.log
    service: contrast
    source: contrastsecurity
```
Pour en savoir plus sur les logs : https://docs.contrastsecurity.com/installation-setupconfig.html#log

* [Redémarrez l'Agent Datadog](https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6#redemarrer-l-agent).

Pour en savoir plus, consultez la [documentation sur la collecte de logs](https://docs.datadoghq.com/logs/log_collection/?tab=tailexistingfiles#debuter-avec-l-agent).

Pour en savoir plus, consultez la [documentation sur l'API Datadog pour la création d'un dashboard](https://docs.datadoghq.com/api/?lang=bash#creer-un-dashboard).

## Données collectées

### Métriques

L'intégration Contrast n'inclut aucune métrique.

### Événements

L'intégration Contrast n'envoie aucun événement.

### Checks de service

L'intégration Contrast n'inclut aucun check de service.


{{< get-dependencies >}}
