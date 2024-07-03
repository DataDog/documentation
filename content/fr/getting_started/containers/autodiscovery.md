---
aliases:
- /fr/agent/autodiscovery/basic_autodiscovery
- /fr/getting_started/agent/autodiscovery
- /fr/agent/autodiscovery
further_reading:
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Créer et charger un modèle d'intégration Autodiscovery
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
- link: /agent/guide/secrets-management/
  tag: Documentation
  text: Gestion des secrets
title: Fonction Autodiscovery de l'Agent
---

## Présentation

Dans une infrastructure conteneurisée, les conteneurs peuvent basculer d'un host à un autre, ce qui complique leur surveillance. En raison du dynamisme des systèmes conteneurisés, la surveillance manuelle n'est pas une chose aisée.

Pour y remédier, vous pouvez utiliser la fonction Autodiscovery de Datadog afin d'identifier automatiquement les services qui s'exécutent sur un conteneur précis et de rassembler des données sur ces services. Lorsqu'un conteneur se lance, l'Agent Datadog identifie les services qui s'y exécutent, recherche la configuration de surveillance correspondante et initie la collecte de métriques.

La fonction Autodiscovery vous permet de définir des modèles de configuration pour des checks d'Agent et de spécifier les conteneurs sur lesquels chaque check doit s'appliquer.

L'Agent recherche des événements de création, destruction, démarrage ou encore d'arrêt de conteneur avant d'activer, de désactiver et de régénérer les configurations de check statiques lors de ces événements. Lorsque l'Agent inspecte les conteneurs en cours d'exécution, il vérifie si chaque conteneur correspond à l'un des [identifiants de conteneur Autodiscovery][1] présents dans les modèles chargés. À chaque correspondance, l'Agent génère une configuration de check statique en remplaçant les [template variables][2] par les valeurs spécifiques du conteneur correspondant. Il active ensuite le check avec la configuration statique.

## Fonctionnement

{{< img src="agent/autodiscovery/ad_1.png" alt="Présentation d'Autodiscovery" style="width:80%;">}}

Le schéma ci-dessus représente un nœud de host avec trois pods, notamment un pod Redis et un pod d'Agent. Le Kubelet, qui planifie les conteneurs, s'exécute en tant que binaire sur ce nœud et expose les endpoints `/metrics` et `/pods`. Toutes les 10 secondes, l'Agent interroge `/pods` et trouve les spécifications Redis. Il peut également consulter les informations sur le pod Redis.

Dans cet exemple, les spécifications Redis comprennent les annotations suivantes :

{{< tabs >}}

{{% tab "Annotations AD v2 (Agent 7.36+)" %}}
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

Dans l'exemple ci-dessus, les étiquettes `tags.datadoghq.com` sont utilisées pour appliquer les valeurs `env`, `service` et même `version` sous forme de tags à l'ensemble des logs et métriques envoyés par le pod Redis. Ces étiquettes standard font partie du système de [tagging de service unifié][1]. Datadog vous conseille d'utiliser le tagging de service unifié lorsque vous configurez des tags et des variables d'environnement.

`redisdb` correspond au nom du check à exécuter. `init_config` est facultatif et indique certains paramètres de configuration, comme l'intervalle minimum de collecte. Chaque élément de `instances` représente la configuration à exécuter sur une instance d'un check. **Remarque** : ici, `%%host%%` est une template variable dont la valeur correspond automatiquement à l'adresse IP de votre conteneur.

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

Dans l'exemple ci-dessus, les étiquettes `tags.datadoghq.com` sont utilisées pour appliquer les valeurs `env`, `service` et même `version` sous forme de tags à l'ensemble des logs et métriques envoyés par le pod Redis. Ces étiquettes standard font partie du système de [tagging de service unifié][1]. Datadog vous conseille d'utiliser le tagging de service unifié lorsque vous configurez des tags et des variables d'environnement.

`check_names` comprend les noms des checks à exécuter, tandis qu'`init_configs` indique certains paramètres de configuration, comme l'intervalle minimum de collecte. Chaque élément d'`instances` représente la configuration à exécuter sur une instance d'un check. **Remarque** : ici, `%%host%%` est une template variable dont la valeur correspond automatiquement à l'adresse IP de votre conteneur.

[1]: /fr/getting_started/tagging/unified_service_tagging
{{% /tab %}}

{{< /tabs >}}

L'Agent génère ainsi une configuration de check statique.

## Configuration

Il vous suffit de suivre les deux étapes suivantes pour configurer Autodiscovery pour votre infrastructure :

1. [Activez Autodiscovery](#activer-autodiscovery) sur votre Agent Datadog.
2. Créez des [modèles de configuration spécifiques à chaque intégration](#modeles-d-integration) pour chaque service à surveiller. **Remarque** : Datadog fournit des modèles de configuration automatique pour [certains services conteneurisés populaires][3], comme Apache et Redis.

### Activer Autodiscovery

En plus de détecter les sockets et endpoints d'API disponibles (tels que Docker, containerd et l'API Kubernetes), l'Agent active Autodiscovery automatiquement.

Si Autodiscovery ne fonctionne pas, vérifiez les fonctionnalités détectées en exécutant `agent status`.

Si la détection automatique a échoué ou que vous souhaitez désactiver des fonctionnalités détectées automatiquement, utilisez les paramètres de configuration suivants dans `datadog.yaml` pour inclure ou exclure des fonctionnalités :
```yaml
autoconfig_exclude_features:
- docker
autoconfig_include_features:
- containerd
```

La liste complète des fonctionnalités détectées automatiquement est disponible dans le modèle `datadog.yaml`.

### Modèles d'intégration

Une fois la fonction Autodiscovery activée, l'Agent Datadog essaie automatiquement de l'utiliser pour plusieurs [services][3], notamment Apache et Redis, en se basant sur les fichiers de configuration Autodiscovery par défaut.

Vous pouvez définir un modèle d'intégration de plusieurs façons : avec des annotations de pod Kubernetes, des étiquettes Docker, un fichier de configuration monté sur l'Agent, une ConfigMap ou encore des stockages key/value. Consultez la section [Modèles d'intégration Autodiscovery][4] pour en savoir plus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/guide/ad_identifiers/
[2]: /fr/agent/faq/template_variables/
[3]: /fr/agent/faq/auto_conf/
[4]: /fr/agent/kubernetes/integrations/