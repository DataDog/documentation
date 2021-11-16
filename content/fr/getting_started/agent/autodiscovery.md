---
title: Fonction Autodiscovery de l'Agent
kind: documentation
aliases:
  - /fr/agent/autodiscovery/basic_autodiscovery
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
    text: "Configuration d'intégration pour ECS\_Fargate"
  - link: /agent/guide/secrets-management/
    tag: Documentation
    text: Gestion des secrets
---
## Présentation

Dans une infrastructure conteneurisée, les conteneurs peuvent basculer d'un host à un autre, ce qui complique leur surveillance. En raison du dynamisme des systèmes conteneurisés, la surveillance manuelle n'est pas une chose aisée.

Pour y remédier, vous pouvez utiliser la fonction Autodiscovery de Datadog afin d'identifier automatiquement les services qui s'exécutent sur un conteneur précis et de rassembler des données sur ces services. Lorsqu'un conteneur se lance, l'Agent Datadog identifie les services qui s'y exécutent, recherche la configuration de surveillance correspondante et initie la collecte de métriques.

La fonction Autodiscovery vous permet de définir des modèles de configuration pour des checks d'Agent et de spécifier les conteneurs sur lesquels chaque check doit s'appliquer.

L'Agent recherche des événements de création, destruction, démarrage ou encore d'arrêt de conteneur avant d'activer, de désactiver et de régénérer les configurations de check statiques lors de ces événements. Lorsque l'Agent inspecte les conteneurs en cours d'exécution, il vérifie si chaque conteneur correspond à l'un des [identifiants de conteneur Autodiscovery][1] présents dans les modèles chargés. À chaque correspondance, l'Agent génère une configuration de check statique en remplaçant les [template variables][2] par les valeurs spécifiques du conteneur correspondant. Il active ensuite le check avec la configuration statique.

## Fonctionnement

{{< img src="agent/autodiscovery/ad_1.png" alt="Présentation d'Autodiscovery"  style="width:80%;">}}

Le schéma ci-dessus représente un nœud de host avec trois pods, notamment un pod Redis et un pod d'Agent. Le Kubelet, qui planifie les conteneurs, s'exécute en tant que binaire sur ce nœud et expose les endpoints `/metrics` et `/pods`. Toutes les 10 secondes, l'Agent interroge `/pods` et trouve les spécifications Redis. Il peut également consulter les informations sur le pod Redis.

Dans cet exemple, les spécifications Redis comprennent les annotations suivantes :

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

Dans l'exemple ci-dessus, les étiquettes `tags.datadoghq.com` sont utilisées pour appliquer les valeurs `env`, `service` et même `version` sous forme de tags à l'ensemble des logs et métriques envoyés par le pod Redis. Ces étiquettes standard font partie du système de [tagging de service unifié][3]. Datadog vous conseille d'utiliser le tagging de service unifié lorsque vous configurez des tags et des variables d'environnement.

`check_names` comprend les noms des checks à exécuter, tandis qu'`init_configs` indique certains paramètres de configuration, comme l'intervalle minimum de collecte. Chaque élément d'`instances` représente la configuration à exécuter sur une instance d'un check. À noter qu'ici, `%%host%%` est une template variable dont la valeur correspond automatiquement à l'adresse IP de votre conteneur.

L'Agent génère ainsi une configuration de check statique.

## Configuration

Il vous suffit de suivre les deux étapes suivantes pour configurer Autodiscovery pour votre infrastructure :

1. [Activez Autodiscovery](#activer-autodiscovery) sur votre Agent Datadog.
2. Créez des [modèles de configuration spécifiques à chaque intégration](#modeles-d-integration) pour chaque service à surveiller. Sachez que Datadog fournit des modèles de configuration automatique pour [certains services conteneurisés de base][4], tels qu'Apache et Redis.

### Activer Autodiscovery

#### Avec l'Agent exécuté sur un host

{{< tabs >}}
{{% tab "Docker" %}}

Ajoutez le bloc de configuration suivant au [fichier de configuration][1] `datadog.yaml`.

```yaml
listeners:
  - name: docker
config_providers:
  - name: docker
    polling: true
```

[1]: /fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
{{% /tab %}}
{{% tab "Kubernetes" %}}

Ajoutez le bloc de configuration suivant au [fichier de configuration][1] `datadog.yaml`.

```yaml
listeners:
  - name: kubelet
config_providers:
  - name: kubelet
    polling: true
  # nécessaire pour prendre en charge les anciens modèles de configuration d'étiquette docker
  - name: docker
    polling: true
```

[1]: /fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
{{% /tab %}}
{{% tab "ECS Fargate" %}}

ECS Fargate ne peut pas être surveillé lorsque l'Agent Datadog est exécuté en tant que binaire sur un host.

{{% /tab %}}
{{< /tabs >}}

#### Avec l'Agent exécuté en tant que conteneur

{{< tabs >}}
{{% tab "Docker" %}}

Pour activer automatiquement Autodiscovery sur des conteneurs Docker, montez `/var/run/docker.sock` dans l'Agent conteneurisé. Sous Windows, montez `\\.\pipe\docker_engine`.

{{% /tab %}}
{{% tab "Kubernetes" %}}

La fonction Autodiscovery est activée par défaut sur Kubernetes.

Pour vous en assurer, vérifiez que la variable d'environnement suivante est définie :

```shell
KUBERNETES=yes
```

{{% /tab %}}
{{% tab "ECS Fargate" %}}

Pour activer Autodiscovery sur des conteneurs dans Kubernetes, ajoutez la variable d'environnement suivante lors du démarrage de l'Agent conteneurisé :

```shell
ECS_FARGATE=true
```

{{% /tab %}}
{{< /tabs >}}

### Modèles d'intégration

Une fois la fonction Autodiscovery activée, l'Agent Datadog essaie automatiquement de l'utiliser [pour un certain nombre de services][4], notamment Apache et Redis, en se basant sur les fichiers de configuration Autodiscovery par défaut.

Vous pouvez définir un modèle d'intégration de plusieurs façons : avec des annotations de pod Kubernetes, des étiquettes Docker, un fichier de configuration monté sur l'Agent, une ConfigMap ou encore des stockages key-value.

Dans l'exemple suivant, les étiquettes Kubernetes `tags.datadoghq.com` sont utilisées pour appliquer les valeurs `env`, `service` et `version` sous forme de tags aux données du pod.

Le modèle d'intégration Redis est défini via des annotations de pod Kubernetes. Il contient un paramètre `password` personnalisé et tague tous ses logs avec l'attribut `source` adéquat.

```yaml
apiVersion: v1
kind: Pod
metadata:
  ## nom de votre Pod
  name: my-redis
  labels:
    ## définir des étiquettes standard pour le tagging de service unifié
    tags.datadoghq.com/redis.env: prod
    tags.datadoghq.com/redis.service: my-redis
    tags.datadoghq.com/redis.version: "6.0.3"
  annotations:
    ## noms des checks ; correspondent aux noms dans le référentiel integrations_core
    ad.datadoghq.com/redis.check_names: '["redisdb"]'
    ## quelques paramètres de configuration, comme l'intervalle minimum de collecte
    ad.datadoghq.com/redis.init_configs: '[{}]'
    ad.datadoghq.com/redis.instances: |
      [
        ## configuration à exécuter pour une instance du check
        {
          "host": "%%host%%",
          "port":"6379",
          "password":"%%env_REDIS_PASSWORD%%"
        }
      ]
    ## configuration de la collecte de logs
    ad.datadoghq.com/redis.logs: '[{"source":"redis"}]'
spec:
  containers:
    - name: redis
      image: httpd
      ports:
        - containerPort: 80
```

Pour utiliser la fonction Autodiscovery avec d'autres services, définissez des modèles pour les services à surveiller. Consultez la section [Modèles d'intégration Autodiscovery][5] pour en savoir plus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/guide/ad_identifiers/
[2]: /fr/agent/faq/template_variables/
[3]: /fr/getting_started/tagging/unified_service_tagging
[4]: /fr/agent/faq/auto_conf/
[5]: /fr/agent/kubernetes/integrations/