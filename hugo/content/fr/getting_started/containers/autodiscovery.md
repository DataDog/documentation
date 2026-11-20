---
aliases:
- /fr/agent/autodiscovery/basic_autodiscovery
- /fr/getting_started/agent/autodiscovery
- /fr/agent/autodiscovery
description: Surveillez automatiquement les services conteneurisés avec Datadog Agent
  Autodiscovery. Configurez des modèles pour détecter et surveiller dynamiquement
  les services sur les conteneurs.
further_reading:
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Créer et charger un modèle d'intégration Autodiscovery
- link: /containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/
  tag: Documentation
  text: Configurez Autodiscovery avec la CRD DatadogInstrumentation.
- link: /agent/guide/ad_identifiers/
  tag: Documentation
  text: Associer un conteneur au modèle d'intégration correspondant
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Gérer les conteneurs à inclure dans Autodiscovery avec l'Agent
- link: /agent/kubernetes/tag/
  tag: Documentation
  text: Assigner et recueillir dynamiquement des tags depuis votre application
- link: /integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
  tag: faq
  text: Configuration d'intégration pour ECS Fargate
- link: /agent/configuration/secrets-management/
  tag: Documentation
  text: Gestion des secrets
title: Fonction Autodiscovery de l'Agent
---
## Présentation {#overview}

Lorsque vous surveillez une infrastructure conteneurisée, l'un des défis qui se pose est que les conteneurs peuvent passer d'un host à l'autre. La nature dynamique des systèmes conteneurisés rend leur surveillance manuelle difficile.

Pour résoudre ce problème, vous pouvez utiliser la fonctionnalité Autodiscovery de Datadog afin d'identifier automatiquement les services exécutés sur un conteneur spécifique et de collecter des données à partir de ces services. Chaque fois qu'un conteneur démarre, le Datadog Agent identifie les services s'exécutant sur ce nouveau conteneur, recherche la configuration de surveillance correspondante et commence à collecter des métriques.

La fonction Autodiscovery vous permet de définir des modèles de configuration pour des checks d'Agent et de spécifier les conteneurs sur lesquels chaque check doit s'appliquer.

Datadog Agent surveille les événements tels que la création, la destruction, le démarrage et l'arrêt des conteneurs. Datadog Agent active, désactive et régénère ensuite les configurations de check statiques lors de ces événements. Lorsque Datadog Agent inspecte chaque conteneur en cours d'exécution, il vérifie si le conteneur correspond à l'un des [identifiants de conteneur Autodiscovery][1] issus de modèles chargés. Pour chaque correspondance, Datadog Agent génère une configuration de check statique en remplaçant les [variables de modèle][2] par les valeurs spécifiques du conteneur correspondant. Il active ensuite le check à l'aide de la configuration statique.

## Fonctionnement {#how-it-works}

{{< img src="agent/autodiscovery/ad_1.png" alt="Présentation de l'Autodiscovery" style="width:80%;">}}

Dans la figure ci-dessus, il y a un nœud host avec trois pods, dont un pod Redis et un pod Datadog Agent. Le Kubelet, qui planifie les conteneurs, s'exécute en tant que binaire sur ce nœud et expose les points de terminaison `/metrics` et `/pods`. Toutes les 10 secondes, Datadog Agent interroge `/pods` et trouve la spécification Redis. Il peut également voir des informations sur le pod Redis lui-même.

Dans cet exemple, les spécifications Redis comprennent les annotations suivantes :

{{< tabs >}}

{{% tab "Annotations AD v2 (Datadog Agent 7.36+)" %}}

```yaml
labels:
  tags.datadoghq.com/redis.env: "prod"
  tags.datadoghq.com/redis.service: "my-redis"
  tags.datadoghq.com/redis.version: "6.0.3"
annotations:
  ad.datadoghq.com/redis.checks: |
    {
      "redisdb": {
        "init_config": {},
        "instances": [
          {
            "host": "%%host%%",
            "port":"6379",
            "password":"%%env_REDIS_PASSWORD%%"
          }
        ]
      }
    }
  ad.datadoghq.com/redis.logs: '[{"source":"redis"}]'
```

Dans l'exemple ci-dessus, les étiquettes `tags.datadoghq.com` définissent `env`, `service` et même `version` comme tags pour tous les logs et métriques émis pour le conteneur `redis` du pod. Ces étiquettes standard font partie du [Unified Service Tagging][1]. En guise de bonne pratique, Datadog recommande d'utiliser le Unified Service Tagging lors de la configuration des tags et des variables d'environnement.

La clé d'annotation de configuration de check suit le format `ad.datadoghq.com/<container-name>.checks`.

`redisdb` est le nom du check à exécuter. `init_config` contient certains paramètres de configuration, tels que l'intervalle de collecte minimal, et est facultatif. Chaque élément dans `instances` représente la configuration à exécuter pour une instance d'un check. **Note** : Dans cet exemple, `%%host%%` est une variable de modèle qui est remplie dynamiquement avec l'adresse IP de votre conteneur.

[1]: /fr/getting_started/tagging/unified_service_tagging
{{% /tab %}}

{{% tab "Annotations AD v1" %}}

```yaml
labels:
  tags.datadoghq.com/redis.env: "prod"
  tags.datadoghq.com/redis.service: "my-redis"
  tags.datadoghq.com/redis.version: "6.0.3"
annotations:
  ad.datadoghq.com/redis.check_names: '["redisdb"]'
  ad.datadoghq.com/redis.init_configs: '[{}]'
  ad.datadoghq.com/redis.instances: |
    [
      {
        "host": "%%host%%",
        "port":"6379",
        "password":"%%env_REDIS_PASSWORD%%"
      }
    ]
  ad.datadoghq.com/redis.logs: '[{"source":"redis"}]'
```

Dans l'exemple ci-dessus, les étiquettes `tags.datadoghq.com` définissent `env`, `service` et même `version` comme tags pour tous les logs et métriques émis pour le conteneur `redis` du pod. Ces étiquettes standard font partie du [Unified Service Tagging][1]. En guise de bonne pratique, Datadog recommande d'utiliser le Unified Service Tagging lors de la configuration des tags et des variables d'environnement.

Les clés d'annotation de configuration de check suivent le format `ad.datadoghq.com/<container-name>.check_names`, `ad.datadoghq.com/<container-name>.init_configs` et `ad.datadoghq.com/<container-name>.instances`.

`check_names` inclut les noms du check à exécuter, et `init_configs` contient certains paramètres de configuration, tels que l'intervalle de collecte minimal. Chaque élément dans `instances` représente la configuration à exécuter pour une instance d'un check. **Note** : Dans cet exemple, `%%host%%` est une variable de modèle qui est remplie dynamiquement avec l'adresse IP de votre conteneur.

[1]: /fr/getting_started/tagging/unified_service_tagging
{{% /tab %}}

{{< /tabs >}}

L'Agent génère ainsi une configuration de check statique.

## Configuration {#setup}

Il vous suffit de suivre les deux étapes suivantes pour configurer Autodiscovery pour votre infrastructure :

1. [Activez Autodiscovery](#enable-autodiscovery) pour votre Datadog Agent.
2. Créez [des modèles de configuration spécifiques à l'intégration](#integration-templates) pour chaque service que vous souhaitez surveiller. **Note** : Datadog fournit des modèles de configuration automatique pour [certains services conteneurisés courants][3], notamment Apache et Redis.

### Activez Autodiscovery {#enable-autodiscovery}

En plus de détecter les sockets et endpoints d'API disponibles (tels que Docker, containerd et l'API Kubernetes), l'Agent active Autodiscovery automatiquement.

Si l'Autodiscovery ne fonctionne pas, vérifiez les fonctionnalités détectées en exécutant `agent status`.

Si la détection automatique a échoué ou si vous souhaitez désactiver les fonctionnalités détectées automatiquement, utilisez ces paramètres de configuration dans `datadog.yaml` pour inclure/exclure des fonctionnalités :

```yaml
autoconfig_exclude_features:
- docker
autoconfig_include_features:
- containerd
```

La liste complète des fonctionnalités détectées automatiquement est disponible dans le modèle `datadog.yaml`.

### Modèles d'intégration {#integration-templates}

Une fois la fonction Autodiscovery activée, le Datadog Agent essaie automatiquement de l'utiliser pour plusieurs [services][3], notamment Apache et Redis, en se basant sur les fichiers de configuration Autodiscovery par défaut.

Vous pouvez définir un modèle d'intégration de plusieurs façons : avec des annotations de pod Kubernetes, des étiquettes Docker, un fichier de configuration monté sur l'Agent, une ConfigMap ou encore des stockages key/value. Consultez la documentation [Autodiscovery Integration Templates][4] pour plus de détails.

Sur Kubernetes, vous pouvez également configurer des vérifications pour une charge de travail spécifique via la ressource personnalisée `DatadogInstrumentation`, au lieu des annotations de pod. Consultez [Configure Autodiscovery with DatadogInstrumentation CRD][5].

### Remarques {#notes}

Si vous utilisez Autodiscovery et qu'une application est déployée sur un nouveau nœud, vous pourriez constater un certain délai avant que les métriques n'apparaissent dans Datadog. Lorsque vous passez à un nouveau nœud, il faut du temps au Datadog Agent pour collecter les métadonnées de votre application.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/guide/ad_identifiers/
[2]: /fr/agent/faq/template_variables/
[3]: /fr/agent/faq/auto_conf/
[4]: /fr/agent/kubernetes/integrations/
[5]: /fr/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/