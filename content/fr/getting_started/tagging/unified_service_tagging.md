---
further_reading:
- link: /getting_started/tagging/using_tags
  tag: Documentation
  text: Apprendre à utiliser les tags dans l'application Datadog
- link: /tracing/version_tracking
  tag: Documentation
  text: Utiliser des tags version dans l'APM Datadog pour surveiller les déploiements
- link: https://www.datadoghq.com/blog/autodiscovery-docker-monitoring/
  tag: Blog
  text: En savoir plus sur Autodiscovery
title: Tagging de service unifié
---

## Présentation

Le tagging de service unifié permet de lier les données de télémétrie Datadog entre elles via trois [tags réservés][1] : `env`, `service` et `version`.

Avec ces trois tags, vous pouvez :

- Déterminer l'impact d'un déploiement grâce à des métriques de trace et de conteneur filtrées par version
- Explorer facilement vos traces, métriques et logs à l'aide de tags cohérents
- Consulter les données de service en fonction de l'environnement ou de la version de manière unifiée

{{< img src="tagging/unified_service_tagging/overview.mp4" alt="Tagging de service unifié" video=true >}}

**Remarque** : à défaut de configuration de log Autodiscovery, le service officiel d'un log est défini sur le nom raccourci du conteneur. Pour remplacer le service officiel d'un log, ajoutez des [annotations de pod ou étiquettes Docker][2] Autodiscovery. Exemple : `"com.datadoghq.ad.logs"='[{"service": "service-name"}]'`.

### Prérequis

- Vous devez configurer la version 6.19.x/7.19.x ou une version ultérieure de l'[Agent Datadog][3] pour pouvoir utiliser le tagging de service unifié.

- Le tagging de service unifié nécessite une version du traceur qui prend en charge les nouvelles configurations des [tags réservés][1]. Vous trouverez davantage d'informations pour chaque langage dans les [instructions de configuration][4].


| Langage         | Version minimale du traceur |
|--------------|------------|
| .NET    |  1.17.0+       |
| C++    |  1.1.4+       |
| Go         |  1.24.0+       |
| Java   |  0.50.0+      |
| Node    |  0.20.3+       |
| PHP  |  0.47.0+      |
| Python  |  0.38.0+      |
| Ruby  |  0.34.0+      |

- Vous devez maîtriser la configuration de tags pour pouvoir utiliser le tagging de service unifié. En cas de doute, consultez les sections [Débuter avec les tags][1] et [Assigner des tags][5] avant de procéder à la configuration.

## Configuration

Pour commencer la configuration du tagging de service unifié, choisissez votre environnement :

- [Environnement conteneurisé](#environnement-conteneurise)
- [Environnement non conteneurisé](#environnement-non-conteneurise)

### Environnement conteneurisé

Dans les environnements conteneurisés, les tags `env`, `service` et `version` sont définis via les variables d'environnement du service ou à l'aide d'étiquettes (par exemple, les étiquettes de pod et de déploiement Kubernetes ou encore les étiquettes des conteneurs Docker). L'Agent Datadog détecte cette configuration de tagging et l'applique aux données recueillies à partir des conteneurs.

Pour configurer le tagging de service unifié dans un environnement conteneurisé :

1. Activez [Autodiscovery][6] pour permettre à l'Agent Datadog d'identifier automatiquement les services qui s'exécutent sur un conteneur donné et de recueillir des données à partir de ces services afin de mapper les variables d'environnement avec les tags `env`, `service` et `version`.

2. Si vous utilisez [Docker][2], assurez-vous que l'Agent peut accéder au [socket Docker][7] de votre conteneur. Cela permet à l'Agent de détecter les variables d'environnement et de les mapper avec les tags standard.

3. Configurez votre environnement en fonction de votre service d'orchestration de conteneurs en suivant la procédure de configuration complète ou partielle détaillée ci-dessous.

#### Configuration

{{< tabs >}}
{{% tab "Kubernetes" %}}

Si vous avez déployé l'Agent de cluster Datadog avec le [contrôleur d'admission][1] activé, le contrôleur d'admission modifie les manifestes de pod et injecte l'ensemble des variables d'environnement requises (en fonction des conditions configurées). Dans ce cas, vous n'avez pas besoin de configurer manuellement les variables d'environnement `DD_` dans les manifestes de pod. Pour en savoir plus, consultez la [documentation dédiée au contrôleur d'admission][1].

##### Configuration complète

Pour exploiter tout le potentiel du tagging de service unifié lorsque vous utilisez Kubernetes, ajoutez les variables d'environnement au niveau de l'objet de déploiement et au niveau des spécifications du modèle de pod :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    tags.datadoghq.com/env: "<ENV>"
    tags.datadoghq.com/service: "<SERVICE>"
    tags.datadoghq.com/version: "<VERSION>"
...
template:
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>"
  containers:
  -  ...
     env:
          - name: DD_ENV
            valueFrom:
              fieldRef:
                fieldPath: metadata.labels['tags.datadoghq.com/env']
          - name: DD_SERVICE
            valueFrom:
              fieldRef:
                fieldPath: metadata.labels['tags.datadoghq.com/service']
          - name: DD_VERSION
            valueFrom:
              fieldRef:
                fieldPath: metadata.labels['tags.datadoghq.com/version']
```

##### Configuration partielle

###### Métriques au niveau du pod

Pour configurer les métriques au niveau du pod, ajoutez les étiquettes standard suivantes (`tags.datadoghq.com`) aux spécifications de pod d'un déploiement, d'un StatefulSet ou d'une tâche :

```yaml
template:
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>"
```
Ces étiquettes couvrent les métriques de processeur, de mémoire, de réseau et de disque de Kubernetes au niveau du pod, et peuvent être utilisées pour injecter `DD_ENV`, `DD_SERVICE` et `DD_VERSION` dans le conteneur de votre service via l'[API Downward de Kubernetes][2].

Si vous avez plusieurs conteneurs par pod, vous pouvez spécifier des étiquettes standard par conteneur :

```yaml
tags.datadoghq.com/<nom-conteneur>.env
tags.datadoghq.com/<nom-conteneur>.service
tags.datadoghq.com/<nom-conteneur>.version
```

###### Métriques State

Pour configurer des [métriques Kubernetes State][3], procédez comme suit :

1. Définissez `join_standard_tags` sur `true` dans votre fichier de configuration. Consultez cet [exemple de fichier de configuration][4] pour connaître l'emplacement de la ligne.

2. Ajoutez les mêmes étiquettes standard à l'ensemble d'étiquettes pour la ressource parent, par exemple `Deployment`.

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>"
  spec:
    template:
      metadata:
        labels:
          tags.datadoghq.com/env: "<ENV>"
          tags.datadoghq.com/service: "<SERVICE>"
          tags.datadoghq.com/version: "<VERSION>"
  ```

###### Traceur de l'APM et client StatsD

Pour configurer les variables d'environnement du [traceur APM][5] et du [client StatsD][6], utilisez l'[API Downward de Kubernetes][2] en suivant le format ci-dessous :

```yaml
containers:
-  ...
    env:
        - name: DD_ENV
          valueFrom:
            fieldRef:
              fieldPath: metadata.labels['tags.datadoghq.com/env']
        - name: DD_SERVICE
          valueFrom:
            fieldRef:
              fieldPath: metadata.labels['tags.datadoghq.com/service']
        - name: DD_VERSION
          valueFrom:
            fieldRef:
              fieldPath: metadata.labels['tags.datadoghq.com/version']
```


[1]: /fr/agent/cluster_agent/admission_controller/
[2]: https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/#capabilities-of-the-downward-api
[3]: /fr/agent/kubernetes/data_collected/#kube-state-metrics
[4]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/conf.yaml.example
[5]: /fr/tracing/send_traces/
[6]: /fr/integrations/statsd/
{{% /tab %}}

{{% tab "Docker" %}}
##### Configuration complète

Définissez les variables d'environnement `DD_ENV`, `DD_SERVICE` et `DD_VERSION` ainsi que les étiquettes Docker correspondantes pour votre conteneur afin d'exploiter tout le potentiel du tagging de service unifié.

Les valeurs pour `service` et `version` peuvent être spécifiées dans le Dockerfile :

```yaml
ENV DD_SERVICE <SERVICE>
ENV DD_VERSION <VERSION>

LABEL com.datadoghq.tags.service="<SERVICE>"
LABEL com.datadoghq.tags.version="<VERSION>"
```

Comme `env` est probablement déterminé au moment du déploiement, vous pouvez injecter la variable d'environnement et l'étiquette ultérieurement :

```shell
docker run -e DD_ENV=<ENV> -l com.datadoghq.tags.env=<ENV> ...
```

Si vous préférez, vous pouvez également définir tous les éléments au moment du déploiement :

```shell
docker run -e DD_ENV="<ENV>" \
           -e DD_SERVICE="<SERVICE>" \
           -e DD_VERSION="<VERSION>" \
           -l com.datadoghq.tags.env="<ENV>" \
           -l com.datadoghq.tags.service="<SERVICE>" \
           -l com.datadoghq.tags.version="<VERSION>" \
           ...
```

##### Configuration partielle

Si votre service n'a pas besoin des variables d'environnement Datadog (par exemple, les logiciels tiers comme Redis, PostgreSQL, NGINX et les applications non tracées par l'APM), vous pouvez simplement utiliser les étiquettes Docker :

```yaml
com.datadoghq.tags.env
com.datadoghq.tags.service
com.datadoghq.tags.version
```

Comme expliqué pour la configuration complète, ces étiquettes peuvent être définies dans un Dockerfile ou comme arguments pour lancer le conteneur.

{{% /tab %}}

{{% tab "ECS" %}}
##### Configuration complète

Définissez les variables d'environnement `DD_ENV`, `DD_SERVICE` et `DD_VERSION` ainsi que les étiquettes Docker correspondantes dans l'environnement runtime du conteneur de chaque service pour exploiter tout le potentiel du tagging de service unifié. Par exemple, vous pouvez définir tous ces éléments au même endroit via la définition de votre tâche ECS :

```
"environment": [
  {
    "name": "DD_ENV",
    "value": "<ENV>"
  },
  {
    "name": "DD_SERVICE",
    "value": "<SERVICE>"
  },
  {
    "name": "DD_VERSION",
    "value": "<VERSION>"
  }
],
"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
}
```

##### Configuration partielle

Si votre service n'a pas besoin des variables d'environnement Datadog (par exemple, les logiciels tiers comme Redis, PostgreSQL, NGINX et les applications non tracées par l'APM), vous pouvez simplement utiliser les étiquettes Docker dans la définition de votre tâche ECS :

```
"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
}
```

{{% /tab %}}
{{< /tabs >}}

### Environnement non conteneurisé

Selon la façon dont vous créez et déployez les binaires ou les exécutables de vos services, plusieurs options peuvent s'offrir à vous pour définir les variables d'environnement. Étant donné que vous pouvez exécuter un ou plusieurs services par host, Datadog vous conseille de limiter ces variables d'environnement à un seul processus.

Afin de former un point de configuration unique pour l'ensemble des données de télémétrie émises directement depuis le runtime de vos services pour les [traces][8], les [logs][9], les [ressources RUM][10], les [tests Synthetic][11], les [métriques StatsD][12] ou les métriques système, vous pouvez :

1. Exporter les variables d'environnement dans la commande de votre exécutable :

   ```
   DD_ENV=<env> DD_SERVICE=<service> DD_VERSION=<version> /bin/my-service
   ```

2. Ou utiliser [Chef][13], [Ansible][14] ou un autre outil d'orchestration pour ajouter les variables d'environnement `DD` au fichier de configuration systemd ou initd d'un service. Le processus du service aura accès à ces variables une fois lancé.

   {{< tabs >}}
   {{% tab "Traces" %}}

   Lors de la configuration de vos traces pour le tagging de service unifié :

   1. Configurez le [Traceur de l'APM][1] avec `DD_ENV` pour que la définition de `env` soit plus proche de l'application qui génère les traces. Cette méthode permet au tag `env` de provenir automatiquement d'un tag dans les métadonnées de span.

   2. Configurez des spans avec `DD_VERSION` pour ajouter un tag version à toutes les spans relevant du service qui appartient au traceur (généralement `DD_SERVICE`). Ainsi, si votre service crée des spans avec le nom d'un service externe, ces spans ne reçoivent pas de tag `version`.

      Tant que le tag version figure dans les spans, il est ajouté aux métriques de trace générées à partir de ces spans. Le tag version peut être ajouté manuellement dans le code ou automatiquement par le traceur APM. Une fois les spans configurées, elles sont utilisées par APM et les [clients DogStatsd][2] pour appliquer les tags `env`, `service` et `version` aux données de trace et aux métriques StatsD. S'il est activé, le traceur APM injecte également les valeurs de ces variables dans vos logs.

      **Remarque** : il ne peut y avoir qu'**un seul service par span**. Les métriques de trace sont généralement associées à un seul service également. Toutefois, si un service différent est défini dans les tags de vos hosts, ce tag service configuré apparaît dans toutes les métriques de trace émises par ce host.

[1]: /fr/tracing/setup/
[2]: /fr/developers/dogstatsd/
   {{% /tab %}}

   {{% tab "Logs" %}}

   Si vous [associez vos logs à vos traces][1], activez l'injection automatique dans les logs si cette fonctionnalité est prise en charge par votre traceur d'APM. Le traceur d'APM injecte alors automatiquement les tags `env`, `service` et `version` dans vos logs, éliminant ainsi le besoin de configurer manuellement ces champs ailleurs. 

   **Remarque** : le traceur PHP ne prend pas actuellement en charge la configuration du tagging de service unifié pour les logs.

[1]: /fr/tracing/other_telemetry/connect_logs_and_traces/
   {{% /tab %}}

   {{% tab "RUM et Session Replay" %}}

   Si vous [associez vos données RUM à vos traces][1], spécifiez l'application Browser dans le champ `service`, définissez l'environnement dans le champ `env` et énumérez les versions dans le champ `version` de votre fichier d'initialisation. 

   Lorsque vous [créez une application RUM][2], confirmez les noms `env` et `service`.


[1]: /fr/real_user_monitoring/connect_rum_and_traces/
[2]: /fr/real_user_monitoring/browser/#setup
   {{% /tab %}}

   {{% tab "Synthetics" %}}

   Si vous [associez vos tests Browser Synthetic à vos traces][1], spécifiez l'URL à laquelle envoyer les en-têtes dans la section **APM Integration for Browser Tests** de la [page Integration Settings][2]. 

   Vous pouvez utiliser le caractère `*` comme wildcard, par exemple : `https://*.datadoghq.com`.

[1]: /fr/synthetics/apm/
[2]: https://app.datadoghq.com/synthetics/settings/integrations
   {{% /tab %}}

   {{% tab "Métriques custom" %}}

   Les tags sont ajoutés en mode append-only pour les [métriques custom StatsD][1]. Par exemple, si vous avez deux valeurs différentes pour `env`, les métriques sont taguées avec les deux environnements. L'ordre dans lequel un tag remplace un autre du même nom est aléatoire.

   Si votre service a accès à `DD_ENV`, `DD_SERVICE` et `DD_VERSION`, alors le client DogStatsD ajoute automatiquement les tags correspondants à vos métriques custom.

   **Remarque** : les clients Datadog DogStatsD pour .NET et PHP ne prennent pas en charge cette fonctionnalité.

[1]: /fr/metrics/
   {{% /tab %}}

   {{% tab "Métriques système" %}}

   Vous pouvez ajouter les tags `env` et `service` à vos métriques d'infrastructure. Dans les environnements non conteneurisés, la configuration du tagging des métriques de service se fait au niveau de l'Agent.

   Étant donné que cette configuration ne change pas à chaque invocation du processus d'un service, l'ajout du tag `version` n'est pas recommandé.

#### Service unique par host

Définissez la configuration suivante dans le [fichier de configuration principal][1] de l'Agent :

```yaml
env: <ENV>
tags:
  - service:<SERVICE>
```

Avec cette configuration, les tags `env` et `service` resteront cohérents pour toutes les données émises par l'Agent.

#### Plusieurs services par host

Définissez la configuration suivante dans le [fichier de configuration principal][1] de l'Agent :

```yaml
env: <ENV>
```

Pour obtenir des tags `service` uniques sur les métriques de processeur, de mémoire et d'E/S disque au niveau du processus, configurez un [check de processus][2] dans le dossier de configuration de l'Agent (par exemple, dans le fichier `process.d/conf.yaml` du dossier `conf.d`) :

```yaml
init_config:
instances:
    - name: web-app
      search_string: ["/bin/web-app"]
      exact_match: false
      service: web-app
    - name: nginx
      search_string: ["nginx"]
      exact_match: false
      service: nginx-web-app
```

**Remarque** : si vous avez déjà un tag `service` défini globalement dans le fichier de configuration principal de votre Agent, les métriques de processus sont taguées avec deux services. Puisque cela peut nuire à l'interprétation des métriques, il est conseillé de configurer le tag `service` uniquement dans la configuration du check de processus.

[1]: /fr/agent/guide/agent-configuration-files
[2]: /fr/integrations/process
    {{% /tab %}}
    {{< /tabs >}}

### Environnement sans serveur

Pour en savoir plus sur les fonctions AWS Lambda, découvrez comment [associer vos données de télémétrie Lambda à l'aide de tags][15].
## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/
[2]: /fr/agent/docker/integrations/?tab=docker
[3]: /fr/getting_started/agent
[4]: /fr/tracing/setup
[5]: /fr/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments
[6]: /fr/getting_started/agent/autodiscovery
[7]: /fr/agent/docker/?tab=standard#optional-collection-agents
[8]: /fr/getting_started/tracing/
[9]: /fr/getting_started/logs/
[10]: /fr/real_user_monitoring/connect_rum_and_traces/
[11]: /fr/getting_started/synthetics/
[12]: /fr/integrations/statsd/
[13]: https://www.chef.io/
[14]: https://www.ansible.com/
[15]: /fr/serverless/configuration/#connect-telemetry-using-tags