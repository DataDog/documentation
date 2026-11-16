---
description: Configurez les paramètres du Datadog Agent à l'aide de variables d'environnement
  comme alternative à datadog.yaml, y compris les conventions de nommage et l'utilisation
  de systemd.
further_reading:
- link: /agent/docker/#environment-variables
  tag: Documentation
  text: Variables d'environnement de l'Agent Docker
- link: /agent/docker/apm/#docker-apm-agent-environment-variables
  tag: Documentation
  text: Variables d'environnement de l'Agent APM
- link: /logs/log_collection/#container-log-collection
  tag: Documentation
  text: Collecte de logs de conteneur
- link: /agent/configuration/proxy/#environment-variables
  tag: Documentation
  text: Variables d'environnement de proxy
title: Variables d'environnement de l'Agent
---
<div class="alert alert-danger">
Pour l'Agent v5, consultez le <a href="https://github.com/DataDog/docker-dd-agent#environment-variables">dépôt GitHub de l'Agent Docker</a>.
</div>

## Présentation {#overview}

Pour l'Agent v6, la plupart des options de configuration du [fichier de configuration principal de l'Agent][1] (`datadog.yaml`) peuvent être définies via des variables d'environnement. Consultez les [exemples de fichiers de configuration][15] dans le dépôt GitHub du Datadog Agent pour une référence entièrement commentée de tous les paramètres `datadog.yaml` disponibles.

## Recommandations {#recommendations}

En guise de bonne pratique, Datadog recommande d'utiliser le unified service tagging lors de l'attribution de tags. Le unified service tagging relie la télémétrie Datadog grâce à l'utilisation de trois tags standard : `env`, `service` et `version`. Pour savoir comment configurer votre environnement avec le unified service tagging, consultez la [documentation sur le unified service tagging][2].

## Utilisation générale {#general-use}

Dans la plupart des cas, les règles suivantes doivent être respectées :

* Les noms d'options doivent être en majuscules avec le préfixe `DD_` : `hostname` -> `DD_HOSTNAME`

* Les valeurs de liste doivent être séparées par des espaces (les règles d'inclusion prennent en charge les expressions régulières et sont définies sous forme de liste de chaînes séparées par des virgules) :
   ```yaml
      container_include:
        - "image:cp-kafka"
        - "image:k8szk"
      # DD_CONTAINER_INCLUDE="image:cp-kafka image:k8szk"
   ```

* L'imbrication des options de configuration avec des clés **prédéfinies** doit être séparée par un trait de soulignement :
   ```yaml
      cluster_agent:
        cmd_port: 5005
      # DD_CLUSTER_AGENT_CMD_PORT=5005
   ```

* L'imbrication des options de configuration avec des clés **définies par l'utilisateur** doit être au format JSON :
   ```yaml
      container_env_as_tags:
        ENVVAR_NAME: tag_name
      # DD_CONTAINER_ENV_AS_TAGS='{"ENVVAR_NAME": "tag_name"}'
   ```

### Priorité de définition des propriétés {#property-definition-priority}

- Si une propriété est définie à la fois dans le fichier de configuration global (`datadog.yaml`) et en tant que variable d'environnement, la variable d'environnement est prioritaire.
- La spécification d'une option imbriquée avec une variable d'environnement remplace _toutes_ les options imbriquées spécifiées sous l'option de configuration. L'exception à cette règle est l'option de configuration `proxy`. Consultez la [documentation sur le proxy de l'Agent][3] pour plus de détails.

### Exceptions {#exceptions}

- Certaines options `datadog.yaml` ne sont pas disponibles avec les variables d'environnement. Consultez le schéma de configuration [core_schema.yaml][4] dans le dépôt GitHub du Datadog Agent. Les paramètres marqués `no-env` dans le schéma ne prennent pas en charge les variables d'environnement.

  Pour les versions antérieures de l'Agent, la source de configuration a changé d'emplacement :

  | Version de l'Agent       | Source de configuration                                                          |
  | -------------------- | ------------------------------------------------------------------------------ |
  | 7.51 à 7.83    | `*_settings.go` fichiers sous [pkg/config/setup sur la branche 7.83.x][13]        |
  | 7.50 et versions antérieures     | [config.go sur la branche 7.50.x][9]                                            |

- Les variables d'environnement spécifiques aux composants non listées dans [core_schema.yaml][4] peuvent également être prises en charge :

  | Composant              | Source de configuration                        | Agent 7.51-7.83                                                | Agent 7.50 et versions antérieures                              |
  | ----------------------- | -------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------- |
  | Agent de trace APM          | [apm_config.yaml][6], [Variables d'environnement de l'Agent APM Docker][5] | `apm_settings.go` dans [pkg/config/setup sur la branche 7.83.x][13] | `apm.go` dans [pkg/config sur la branche 7.50.x][14]    |
  | Agent de processus en direct       | [process_config.yaml][7]                     | `process_settings.go` dans [pkg/config/setup sur la branche 7.83.x][13] | `process.go` dans [pkg/config sur la branche 7.50.x][14] |
  | Ingestion OTLP              | [core_schema.yaml (otlp_config)][4]          | `otlp_settings.go` dans [pkg/config/setup sur la branche 7.83.x][13] | `otlp.go` dans [pkg/config sur la branche 7.50.x][14]   |
  | System Probe             | [system-probe_schema.yaml][10]               | `system_probe_settings.go` dans [pkg/config/setup sur la branche 7.83.x][13] | `system_probe.go` dans [pkg/config sur la branche 7.50.x][14] |
  | Private Action Runner    | [private_action_runner.yaml][11]             | `privateactionrunner_settings.go` dans [pkg/config/setup sur la branche 7.83.x][13] | Non disponible                                       |
  | Multi-Region Failover    | [multi_region_failover.yaml][12]             | `multi_region_failover_settings.go` dans [pkg/config/setup sur la branche 7.83.x][13] | Non disponible                                       |

  Exemple d'APM Trace Agent :

  ```yaml
     apm_config:
         enabled: true
         env: dev
     # DD_APM_ENABLED=true
     # DD_APM_ENV=dev
  ```

  Exemple de Live Process Agent :

  ```yaml
     process_config:
         process_collection:
             enabled: true
         process_dd_url: https://process.datadoghq.com
     # DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED=true
     # DD_PROCESS_AGENT_URL=https://process.datadoghq.com
  ```

## Utilisation des variables d'environnement dans les unités systemd {#using-environment-variables-in-systemd-units}

Dans les systèmes d'exploitation qui utilisent systemd pour gérer les services, les variables d'environnement — globales (par exemple, `/etc/environment`) ou basées sur la session (par exemple, `export VAR=value`) — ne sont généralement pas mises à la disposition des services, sauf si elles sont configurées pour l'être. Consultez la [page de manuel systemd Exec][8] pour plus de détails.

À partir de Datadog Agent 7.45, le service Datadog Agent (`datadog-agent.service` unit) peut éventuellement charger des affectations de variables d'environnement à partir d'un fichier (`<ETC_DIR>/environment`).

1. Créez `/etc/datadog-agent/environment` s'il n'existe pas.
2. Définissez les affectations de variables d'environnement séparées par des retours à la ligne. Exemple :
  ```
  GODEBUG=x509ignoreCN=0,x509sha1=1
  DD_HOSTNAME=myhost.local
  DD_TAGS=env:dev service:foo
  ```
3. Redémarrez le service pour que les modifications prennent effet

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /fr/getting_started/tagging/unified_service_tagging
[3]: /fr/agent/configuration/proxy/#environment-variables
[4]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/core_schema.yaml
[5]: https://docs.datadoghq.com/fr/agent/docker/apm/#docker-apm-agent-environment-variables
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/apm_config.yaml
[7]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/process_config.yaml
[8]: https://www.freedesktop.org/software/systemd/man/systemd.exec.html#Environment
[9]: https://github.com/DataDog/datadog-agent/blob/7.50.x/pkg/config/config.go
[10]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/system-probe_schema.yaml
[11]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/private_action_runner.yaml
[12]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/multi_region_failover.yaml
[13]: https://github.com/DataDog/datadog-agent/tree/7.83.x/pkg/config/setup
[14]: https://github.com/DataDog/datadog-agent/tree/7.50.x/pkg/config
[15]: https://github.com/DataDog/datadog-agent/tree/main/pkg/config/example