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
  - link: '/agent/proxy/?tab=agentv6#variables-environnement'
    tag: Documentation
    text: Variables d'environnement de proxy
---
<div class="alert alert-warning">
Si vous utilisez l'Agent v5, référez-vous au <a href="https://github.com/DataDog/docker-dd-agent#environment-variables">référentiel GitHub de l'Agent Docker</a>.
</div>

## Présentation

Si vous utilisez l'Agent v6, la plupart des options du [fichier de configuration principal de l'Agent][1] (`datadog.yaml`) peuvent être définies via des variables d'environnement.

## Cas d'utilisation généraux

Dans la plupart des cas, les règles suivantes doivent être respectées :

* Les noms d'option doivent être écrits en majuscules et précédés de `DD_` : `hostname` -> `DD_HOSTNAME`

* Les différentes valeurs doivent être séparées par des espaces :
   ```yaml
      ac_include:
        - "image:cp-kafka"
        - "image:k8szk"
      # DD_AC_INCLUDE="image:cp-kafka image:k8szk"
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

**Remarque** : lorsque vous spécifiez une option imbriquée avec une variable d'environnement, _toutes_ les options imbriquées spécifiées sous l'option de configuration sont ignorées. L'option de configuration `proxy` fait toutefois exception à cette règle. Consultez la [documentation relative au proxy de l'Agent][2] pour en savoir plus.

### Exceptions

* Pour les Agents de collecte (APM, processus et logs), supprimez la partie `_config` du nom de l'option. Exemple :
    ```yaml
      apm_config:
        enabled: true
      # DD_APM_ENABLED=true
    ```

* Toutes les options du fichier `datadog.yaml` ne peuvent pas être définies via des variables d'environnement. Référez-vous au fichier [config.go][3] dans le référentiel GitHub de l'Agent Datadog. Les options disponibles via les variables d'environnement commencent par `config.BindEnv*`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[2]: /fr/agent/proxy/?tab=agentv6#environment-variables
[3]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config.go