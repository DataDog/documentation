---
title: Variables d'environnement de l'Agent
kind: guide
further_reading:
  - link: '/agent/docker/#variables-d-environnement'
    tag: Documentation
    text: Variables d'environnement de l'Agent Docker
  - link: '/agent/docker/apm/#variables-d-environnement-de-l-agent-apm-docker'
    tag: Documentation
    text: Variables d'environnement de l'Agent APM
  - link: '/logs/log_collection/#collecte-de-logs-de-conteneur'
    tag: Documentation
    text: Collecte de logs de conteneur
  - link: '/agent/proxy/#variables-d-environnement'
    tag: Documentation
    text: Variables d'environnement de proxy
---
<div class="alert alert-warning">
Si vous utilisez l'Agent v5, référez-vous au <a href="https://github.com/DataDog/docker-dd-agent#environment-variables">référentiel GitHub de l'Agent Docker</a>.
</div>

## Présentation

Si vous utilisez l'Agent v6, la plupart des options du [fichier de configuration principal de l'Agent][1] (`datadog.yaml`) peuvent être définies via des variables d'environnement.

## Recommandations

Datadog vous conseille d'utiliser le tagging de service unifié lorsque vous assignez des tags. Le tagging de service unifié permet de lier les données de télémétrie Datadog entre elles via trois tags standards : `env`, `service` et `version`. Pour découvrir comment configurer le tagging unifié pour votre environnement, consultez la documentation dédiée au [tagging de service unifié][2].

## Cas d'utilisation généraux

Dans la plupart des cas, les règles suivantes doivent être respectées :

* Les noms d'option doivent être écrits en majuscules et précédés de `DD_` : `hostname` -> `DD_HOSTNAME`

* Les valeurs de la liste doivent être séparées par des espaces. Les règles d'inclusion prennent en charge les expressions régulières et sont définies sous forme de liste de chaînes séparées par des virgules :
   ```yaml
      container_include:
        - "image:cp-kafka"
        - "image:k8szk"
      # DD_CONTAINER_INCLUDE="image:cp-kafka image:k8szk"
   ```

* Les options de configuration imbriquées dont les clés sont **prédéfinies** doivent être séparées par des tirets bas :
   ```yaml
      cluster_agent:
        cmd_port: 5005
      # DD_CLUSTER_AGENT_CMD_PORT=5005
   ```

* Les options de configuration imbriquées dont les clés sont **définies par l'utilisateur** doivent être au format JSON :
   ```yaml
      docker_env_as_tags:
        ENVVAR_NAME: tag_name
      # DD_DOCKER_ENV_AS_TAGS='{"ENVVAR_NAME": "tag_name"}'
   ```

**Remarque** : lorsque vous spécifiez une option imbriquée avec une variable d'environnement, _toutes_ les options imbriquées spécifiées sous l'option de configuration sont ignorées. L'option de configuration `proxy` fait toutefois exception à cette règle. Consultez la [documentation relative au proxy de l'Agent][3] pour en savoir plus.

### Exceptions

- Toutes les options du fichier `datadog.yaml` ne peuvent pas être définies via des variables d'environnement. Référez-vous au fichier [config.go][4] dans le référentiel GitHub de l'Agent Datadog. Les options disponibles via les variables d'environnement commencent par `config.BindEnv*`.

- Les variables d'environnement spécifiques à un composant qui ne sont pas répertoriées dans le fichier [config.go][4] peuvent également être prises en charge.

  - **Agent de trace APM**

      - [Variables d'environnement de l'Agent APM Docker][5]
      - [trace-agent env.go][6]
      - Exemple

          ```yaml
             apm_config:
                 enabled: true
                 env: dev
             # DD_APM_ENABLED=true
             # DD_APM_ENV=dev
          ```

  - **Agent Live Process**

      - [process-agent config.go][7]
      - Exemple

          ```yaml
             process_config:
                 enabled: true
                 process_dd_url: https://process.datadoghq.com
             # DD_PROCESS_AGENT_ENABLED=true
             # DD_PROCESS_AGENT_URL=https://process.datadoghq.com
          ```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /fr/getting_started/tagging/unified_service_tagging
[3]: /fr/agent/proxy/#environment-variables
[4]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config.go
[5]: https://docs.datadoghq.com/fr/agent/docker/apm/#docker-apm-agent-environment-variables
[6]: https://github.com/DataDog/datadog-agent/blob/master/pkg/trace/config/env_test.go
[7]: https://github.com/DataDog/datadog-agent/blob/master/pkg/process/config/config.go