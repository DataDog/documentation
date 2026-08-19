---
algolia:
  tags:
  - unified service tags
  - unified
  - unified service
  - service tags
description: Connectez la télémétrie à travers les traces, les métriques et les journaux
  en utilisant des balises d'environnement, de service et de version standardisées
  pour un suivi cohérent.
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
title: Tagging de serice unifié
---
## Aperçu {#overview}

Le balisage de service unifié relie la télémétrie Datadog en utilisant trois [balises réservées][1] : `env`, `service` et `version`.

Avec ces trois tags, vous pouvez :

- Identifiez l'impact du déploiement avec des métriques de trace et de conteneur filtrées par version
- Naviguez sans effort à travers les traces, les métriques et les journaux avec des balises cohérentes
- Affichez les données de service en fonction de l'environnement ou de la version de manière unifiée

{{< img src="tagging/unified_service_tagging/overview.mp4" alt="Tagging de serice unifié" video=true >}}

**Notes** :

- La balise `version` est censée changer à chaque nouveau déploiement d'application. Deux versions différentes du code de votre application doivent avoir des balises `version` distinctes.
- Le service officiel d’un journal adopte par défaut le short-image du conteneur, en l'absence d'une configuration des journaux Autodiscovery. Pour remplacer le service officiel d'un journal, ajoutez des [étiquettes Docker/annotations de pod][2] d'Autodécouverte. Par exemple : `"com.datadoghq.ad.logs"='[{"service": "service-name"}]'`
- Les informations sur l'hôte sont exclues pour les spans de base de données et de cache, car l'hôte associé au span n'est pas celui de la base de données ou du cache.

### Exigences {#requirements}

- Le balisage de service unifié nécessite la configuration d'un [Agent Datadog][3] qui est 6.19.x/7.19.x ou supérieur.

- Le balisage de service unifié nécessite une version SDK qui prend en charge de nouvelles configurations des [balises réservées][1]. Plus d'informations peuvent être trouvées par langue dans les [instructions d'installation][4].


| Langue         | Version SDK minimale |
|--------------|------------|
| .NET    |  1.17.0+       |
| C++    |  0.1.0+       |
| Go         |  1.24.0+       |
| Java   |  0.50.0+      |
| Node    |  0.20.3+       |
| PHP  |  0.47.0+      |
| Python  |  0.38.0+      |
| Ruby  |  0.34.0+      |

- Le balisage de service unifié nécessite des connaissances sur la configuration des balises. Si vous n’êtes pas certain de la manière de configurer les balises, consultez la documentation [Démarrer avec le balisage][1] et [Attribution des balises][5] avant de procéder à la configuration.

## Configuration {#configuration}

Pour commencer la configuration du tagging de service unifié, choisissez votre environnement :

- [Conteneurisé](#containerized-environment)
- [Non conteneurisé](#non-containerized-environment)
- [Sans serveur](#serverless-environment)
- [OpenTelemetry](#opentelemetry)

### Environnement conteneurisé {#containerized-environment}

Dans les environnements conteneurisés, `env`, `service` et `version` sont définis par les variables d'environnement ou les étiquettes du service (par exemple, les étiquettes de déploiement et de pod Kubernetes, les étiquettes de conteneur Docker). L’Agent Datadog détecte cette configuration de balisage et l’applique aux données qu’il collecte à partir des conteneurs.

Pour configurer le tagging de service unifié dans un environnement conteneurisé :

1. Activer [Autodécouverte][6]. Cela permet à l'Agent Datadog d'identifier automatiquement les services fonctionnant sur un conteneur spécifique et de collecter des données à partir de ces services pour associer les variables d'environnement aux balises `env`, `service,` et `version`.

2. Si vous utilisez [Docker][2], assurez-vous que l'Agent peut accéder à la [socket Docker][7] de votre conteneur. Cela permet à l'Agent de détecter les variables d'environnement et de les associer aux balises standard.

3. Configurez votre environnement en fonction de votre service d'orchestration de conteneurs, que ce soit par une configuration complète ou partielle comme détaillé ci-dessous.

#### Configuration {#configuration-1}

{{< tabs >}}
{{% tab "Kubernetes" %}}

Si vous avez déployé le Datadog Cluster Agent avec l'[Admission Controller][1] activé, ce dernier modifie les manifestes de pod et injecte toutes les variables d'environnement requises (en fonction des conditions de mutation configurées). Dans ce cas, la configuration manuelle des `DD_` variables d'environnement dans les manifestes de pod n'est pas nécessaire. Pour plus d'informations, consultez la [documentation de l'Admission Controller][1].

##### Configuration complète {#full-configuration}

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

Vous pouvez également utiliser les variables d'environnement des Attributs de Ressource OpenTelemetry pour définir les balises `env`, `service` et `version` :

```yaml
  containers:
  -  ...
     env:
         - name: OTEL_RESOURCE_ATTRIBUTES
           value: "service.name=<SERVICE>,service.version=<VERSION>,deployment.environment=<ENV>"
         - name: OTEL_SERVICE_NAME
           value: "<SERVICE>"
```
<div class="alert alert-danger">Le <code>OTEL_SERVICE_NAME</code> la variable d'environnement a la priorité sur le <code>service.name</code> attribut dans le <code>OTEL_RESOURCE_ATTRIBUTES</code> variable d'environnement.</div>

##### Configuration partielle {#partial-configuration}

###### Métriques au niveau du pod {#pod-level-metrics}

Pour configurer les métriques au niveau du pod, ajoutez les étiquettes standard suivantes (`tags.datadoghq.com`) à la spécification du pod d'un Déploiement, StatefulSet ou Job :

```yaml
template:
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>" 
```
Ces étiquettes couvrent les métriques Kubernetes de CPU, mémoire, réseau et disque au niveau du pod, et peuvent être utilisées pour injecter `DD_ENV`, `DD_SERVICE` et `DD_VERSION` dans le conteneur de votre service via l'[API descendante de Kubernetes][2].

Si vous avez plusieurs conteneurs par pod, vous pouvez spécifier des étiquettes standard par conteneur :

```yaml
tags.datadoghq.com/<container-name>.env
tags.datadoghq.com/<container-name>.service
tags.datadoghq.com/<container-name>.version 
```

###### Métriques d'état {#state-metrics}

Pour configurer des [métriques Kubernetes State][3], procédez comme suit :

1. Définissez `join_standard_tags` sur `true` dans votre fichier de configuration. Consultez cet [exemple de fichier de configuration][4] pour l'emplacement du paramètre.

2. Ajoutez les mêmes étiquettes standard à la collection d'étiquettes pour la ressource parente, par exemple : `Deployment`.

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

###### SDK Datadog et client StatsD {#datadog-sdk-and-statsd-client}

Pour configurer les variables d'environnement du [SDK Datadog][5] et du [client StatsD][6], utilisez l'[API descendante de Kubernetes][2] dans le format ci-dessous :

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

##### Étiquetage automatique des versions pour les données APM dans des environnements conteneurisés {#automatic-version-tagging-for-apm-data-in-containerized-environments}

<div class="alert alert-info">Cette fonctionnalité est uniquement activée pour les données <a href="https://docs.datadoghq.com/tracing/">d'Application Performance Monitoring (APM)</a>.</div>

Vous pouvez utiliser la balise `version` dans APM pour [surveiller les déploiements][7] et pour identifier les déploiements de code défectueux grâce à la [Détection automatique des déploiements défectueux][8].

Pour les données APM, Datadog définit la balise `version` pour vous dans l'ordre de priorité suivant. Si vous définissez manuellement `version`, Datadog ne remplace pas votre valeur `version`.

| Priorité         | Valeur de version |
|--------------|------------|
| 1    |  {votre valeur de version}       |
| 2   | {image_tag}_{premiers_7_chiffres_du_git_commit_sha}       |
| 3         |  {image_tag} ou {premiers_7_chiffres_du_git_commit_sha} si un seul est disponible      |

Exigences : 
- Version de l'Agent Datadog 7.52.0 ou supérieure
- Si vos services s'exécutent dans un environnement conteneurisé et que `image_tag` est suffisant pour suivre les nouveaux déploiements de versions, aucune configuration supplémentaire n'est nécessaire.
- Si vos services ne s'exécutent pas dans un environnement conteneurisé, ou si vous souhaitez également inclure le SHA Git, [intégrez les informations Git dans vos artefacts de construction][9].


[1]: /fr/agent/cluster_agent/admission_controller/
[2]: https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/#capabilities-of-the-downward-api
[3]: /fr/agent/kubernetes/data_collected/#kube-state-metrics
[4]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/conf.yaml.example
[5]: /fr/tracing/send_traces/
[6]: /fr/integrations/statsd/
[7]: /fr/tracing/services/deployment_tracking/
[8]: /fr/watchdog/faulty_deployment_detection/
[9]: /fr/integrations/guide/source-code-integration/?tab=go#embed-git-information-in-your-build-artifacts

{{% /tab %}}

{{% tab "Docker" %}}
##### Configuration complète {#full-configuration-1}

Définissez les variables d'environnement `DD_ENV`, `DD_SERVICE` et `DD_VERSION` ainsi que les étiquettes Docker correspondantes pour votre conteneur afin d'obtenir l'ensemble complet d'étiquetage de service unifié.

Les valeurs pour `service` et `version` peuvent être fournies dans le Dockerfile :

```yaml
ENV DD_SERVICE <SERVICE>
ENV DD_VERSION <VERSION> 

LABEL com.datadoghq.tags.service="<SERVICE>"
LABEL com.datadoghq.tags.version="<VERSION>" 
```

Puisque `env` est probablement déterminé au moment du déploiement, vous pouvez injecter la variable d'environnement et l'étiquette ultérieurement :

```shell
docker run -e DD_ENV=<ENV> -l com.datadoghq.tags.env=<ENV> ...
```

Vous pouvez également préférer définir tous les éléments au moment du déploiement :

```shell
docker run -e DD_ENV="<ENV>" \
           -e DD_SERVICE="<SERVICE>" \
           -e DD_VERSION="<VERSION>" \ 
           -l com.datadoghq.tags.env="<ENV>" \
           -l com.datadoghq.tags.service="<SERVICE>" \
           -l com.datadoghq.tags.version="<VERSION>" \ 
           ...
```

##### Configuration partielle {#partial-configuration-1}

Si votre service n'a pas besoin des variables d'environnement Datadog (par exemple, les logiciels tiers comme Redis, PostgreSQL, NGINX et les applications non tracées par l'APM), vous pouvez utiliser les étiquettes Docker :

```yaml
com.datadoghq.tags.env
com.datadoghq.tags.service
com.datadoghq.tags.version 
```

Comme expliqué pour la configuration complète, ces étiquettes peuvent être définies dans un Dockerfile ou comme arguments pour lancer le conteneur.

##### Étiquetage automatique des versions pour les données APM dans des environnements conteneurisés {#automatic-version-tagging-for-apm-data-in-containerized-environments-1}

<div class="alert alert-info">Cette fonctionnalité est uniquement activée pour les données <a href="/tracing/">d'Application Performance Monitoring (APM)</a>.</div>

Vous pouvez utiliser la balise `version` dans APM pour [surveiller les déploiements][1] et pour identifier les déploiements de code défectueux grâce à la [Détection automatique des déploiements défectueux][2].

Pour les données APM, Datadog définit la balise `version` pour vous dans l'ordre de priorité suivant. Si vous définissez manuellement `version`, Datadog ne remplace pas votre valeur `version`.

| Priorité         | Valeur de version |
|--------------|------------|
| 1    |  {votre valeur de version}       |
| 2   | {image_tag}_{premiers_7_chiffres_du_git_commit_sha}       |
| 3         |  {image_tag} ou {premiers_7_chiffres_du_git_commit_sha} si un seul est disponible      |

Exigences : 
- Version de l'Agent Datadog 7.52.0 ou supérieure
- Si vos services s'exécutent dans un environnement conteneurisé et que `image_tag` est suffisant pour suivre les nouveaux déploiements de versions, aucune configuration supplémentaire n'est nécessaire.
- Si vos services ne s'exécutent pas dans un environnement conteneurisé, ou si vous souhaitez également inclure le SHA Git, [intégrez les informations Git dans vos artefacts de construction][3].
 

[1]: /fr/tracing/services/deployment_tracking/
[2]: /fr/watchdog/faulty_deployment_detection/
[3]: /fr/integrations/guide/source-code-integration/?tab=go#embed-git-information-in-your-build-artifacts

{{% /tab %}}

{{% tab "ECS" %}}

<div class="alert alert-danger">
Sur ECS Fargate utilisant Fluent Bit ou FireLens, l'étiquetage de service unifié n'est disponible que pour les métriques et les traces, pas pour la collecte de journaux.
</div>

##### Configuration complète {#full-configuration-2}

Définissez les variables d'environnement `DD_ENV`, `DD_SERVICE` et `DD_VERSION` (optionnelles avec étiquetage automatique de version) et les étiquettes Docker correspondantes dans l'environnement d'exécution de chaque conteneur de service pour obtenir l'ensemble complet d'étiquetage de service unifié. Par exemple, vous pouvez définir toute cette configuration à un seul endroit dans la définition de votre tâche ECS :

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
<div class="alert alert-danger">
Sur ECS Fargate, vous devez ajouter ces étiquettes à votre conteneur d'application, <strong>pas</strong> au conteneur de l'Agent Datadog.
</div>

##### Configuration partielle {#partial-configuration-2}

Si votre service n'utilise pas les variables d'environnement Datadog (par exemple, des logiciels tiers comme Redis, PostgreSQL, NGINX, ou des applications non tracées par la solution APM), vous pouvez utiliser les étiquettes Docker dans votre définition de tâche ECS :

```
"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
}
```

##### Étiquetage automatique des versions pour les données APM dans des environnements conteneurisés {#automatic-version-tagging-for-apm-data-in-containerized-environments-2}

Cette fonctionnalité est activée uniquement pour les données APM (Application Performance Monitoring).

Vous pouvez utiliser la balise `version` dans APM pour [surveiller les déploiements][1] et pour identifier les déploiements de code défectueux grâce à la [Détection automatique des déploiements défectueux][2].

Pour les données APM, Datadog définit la balise `version` pour vous dans l'ordre de priorité suivant. Si vous définissez manuellement `version`, Datadog ne remplace pas votre valeur `version`.

| Priorité         | Valeur de version |
|--------------|------------|
| 1    |  {votre valeur de version}       |
| 2   | {image_tag}_{premiers_7_chiffres_du_git_commit_sha}       |
| 3         |  {image_tag} ou {premiers_7_chiffres_du_git_commit_sha} si un seul est disponible      |

Exigences : 
- Version de l'Agent Datadog 7.52.0 ou supérieure
- Si vos services s'exécutent dans un environnement conteneurisé et que `image_tag` est suffisant pour suivre les nouveaux déploiements de versions, aucune configuration supplémentaire n'est nécessaire.
- Si vos services ne s'exécutent pas dans un environnement conteneurisé, ou si vous souhaitez également inclure le SHA Git, [intégrez les informations Git dans vos artefacts de construction][3].

[1]: /fr/tracing/services/deployment_tracking/
[2]: /fr/watchdog/faulty_deployment_detection/
[3]: /fr/integrations/guide/source-code-integration/?tab=go#embed-git-information-in-your-build-artifacts

{{% /tab %}}
{{% /tabs %}}

### Environnement non conteneurisé {#non-containerized-environment}

En fonction de la manière dont vous construisez et déployez les binaires ou exécutables de vos services, vous pouvez avoir plusieurs options disponibles pour définir des variables d'environnement. Puisque vous pouvez exécuter un ou plusieurs services par hôte, Datadog recommande de limiter ces variables d'environnement à un seul processus.

Afin de former un point de configuration unique pour l'ensemble des données de télémétrie émises directement depuis le runtime de vos services pour les [traces][8], les [logs][9], les [ressources RUM][10], les [tests Synthetic][11], les [métriques StatsD][12] ou les métriques système, vous pouvez :

1. Exportez les variables d'environnement dans la commande pour votre exécutable :

   ```
   DD_ENV=<env> DD_SERVICE=<service> DD_VERSION=<version> /bin/my-service
   ```

2. Ou utilisez [Chef][13], [Ansible][14] ou un autre outil d'orchestration pour peupler le fichier de configuration systemd ou initd d'un service avec les variables d'environnement `DD`. Lorsque le processus de service démarre, il a accès à ces variables.

   {{< tabs >}}
   {{% tab "Traces" %}}

   Lors de la configuration de vos traces pour le tagging de service unifié :

   1. Configurez le [SDK Datadog][1] avec `DD_ENV` pour garder la définition de `env` plus proche de l'application qui génère les traces. Cette méthode permet au tag `env` d'être automatiquement dérivé d'un tag dans les métadonnées du span.

   2. Configurez les spans avec `DD_VERSION` pour ajouter la version à tous les spans qui relèvent du service appartenant au SDK (généralement `DD_SERVICE`). Cela signifie que si votre service crée des spans avec le nom d'un service externe, ces spans ne reçoivent pas `version` comme tag.

      Tant que la version est présente dans les spans, elle est ajoutée aux métriques de trace générées à partir de ces spans. La version peut être ajoutée manuellement dans le code ou automatiquement par le SDK Datadog. Lorsqu'elles sont configurées, celles-ci sont utilisées par les clients APM et [DogStatsD][2] pour étiqueter les données de trace et les métriques StatsD avec `env`, `service` et `version`. Si activé, le SDK Datadog injecte également les valeurs de ces variables dans vos journaux.

      **Remarque** : Il ne peut y avoir qu'**un service par span**. Les métriques de trace ont généralement également un seul service. Cependant, si vous avez un service différent défini dans les étiquettes de vos hôtes, cette étiquette de service configurée apparaît sur toutes les métriques de trace émises depuis cet hôte.

[1]: /fr/tracing/setup/
[2]: /fr/extend/dogstatsd/
   {{% /tab %}}

   {{% tab "Logs" %}}

   Si vous utilisez [des journaux et des traces connectés][1], activez l'injection automatique des journaux si cela est pris en charge par votre SDK Datadog. Ensuite, le SDK Datadog injecte automatiquement `env`, `service` et `version` dans vos journaux, éliminant ainsi la configuration manuelle pour ces champs ailleurs.

[1]: /fr/tracing/other_telemetry/connect_logs_and_traces/
   {{% /tab %}}

   {{% tab "RUM et Session Replay" %}}

   Si vous utilisez [des RUM et des traces connectés][1], spécifiez l'application du navigateur dans le champ `service`, définissez l'environnement dans le champ `env` et listez les versions dans le champ `version` de votre fichier d'initialisation.

   Lorsque vous [créez une application RUM][2], confirmez les noms `env` et `service`.


[1]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm/
[2]: /fr/real_user_monitoring/application_monitoring/browser/setup/
   {{% /tab %}}

   {{% tab "Modifier une variable globale" %}}

   Si vous utilisez [des tests de navigateur synthétiques connectés et des traces][1], spécifiez une URL pour envoyer des en-têtes dans la section **Intégration APM pour les tests de navigateur** de la [page des paramètres d'intégration][2].

   Vous pouvez utiliser `*` pour des caractères génériques, par exemple : `https://*.datadoghq.com`.

[1]: /fr/synthetics/apm/
[2]: https://app.datadoghq.com/synthetics/settings/integrations
   {{% /tab %}}

   {{% tab "Collecte de traces" %}}

   Les balises sont ajoutées en mode append-only pour [des métriques StatsD personnalisées][1]. Par exemple, si vous avez deux valeurs différentes pour `env`, les métriques sont étiquetées avec les deux environnements. Il n'y a pas d'ordre dans lequel une balise remplace une autre du même nom.

   Si votre service a accès à `DD_ENV`, `DD_SERVICE` et `DD_VERSION`, alors le client DogStatsD ajoute automatiquement les balises correspondantes à vos métriques personnalisées.

   **Remarque** : Les clients Datadog DogStatsD pour .NET et PHP ne prennent pas en charge cette fonctionnalité.

[1]: /fr/metrics/
   {{% /tab %}}

   {{% tab "Métriques système" %}}

   Vous pouvez ajouter des balises `env` et `service` à vos métriques d'infrastructure. Dans des contextes non conteneurisés, le balisage pour les métriques de service est configuré au niveau de l'Agent.

   Parce que cette configuration ne change pas pour chaque invocation du processus d'un service, l'ajout de `version` n'est pas recommandé.

#### Un service par hôte {#single-service-per-host}

Définissez la configuration suivante dans le [fichier de configuration principal][1] de l'Agent :

```yaml
env: <ENV>
tags:
  - service:<SERVICE>
```

Cette configuration garantit un balisage cohérent de `env` et `service` pour toutes les données émises par l'Agent.

#### Plusieurs services par hôte {#multiple-services-per-host}

Définissez la configuration suivante dans le [fichier de configuration principal][1] de l'Agent :

```yaml
env: <ENV>
```

Pour obtenir des balises `service` uniques sur les métriques CPU, mémoire et I/O disque au niveau du processus, configurez un [contrôle de processus][2] dans le dossier de configuration de l'Agent (par exemple, dans le dossier `conf.d` sous `process.d/conf.yaml`) :

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

**Remarque** : Si vous avez déjà une balise `service` définie globalement dans le fichier de configuration principal de votre Agent, les métriques de processus sont étiquetées avec deux services. Étant donné que cela peut prêter à confusion lors de l'interprétation des métriques, il est recommandé de configurer la balise `service` uniquement dans la configuration de la vérification du processus.

[1]: /fr/agent/configuration/agent-configuration-files
[2]: /fr/integrations/process
    {{% /tab %}}
    {{< /tabs >}}

### Environnement sans serveur {#serverless-environment}

Pour en savoir plus sur les fonctions AWS Lambda, découvrez comment [associer vos données de télémétrie Lambda à l'aide de tags][15].

### OpenTelemetry {#opentelemetry}

Lorsque vous utilisez OpenTelemetry, mappez les [attributs de ressource][16] suivants à leurs conventions correspondantes dans Datadog :

| Convention OpenTelemetry | Convention Datadog |
| --- | --- |
| `deployment.environment` <sup>1</sup>  | `env` |
| `deployment.environment.name` <sup>2</sup> | `env` |
| `service.name` | `service` |
| `service.version` | `version` |

1 : `deployment.environment` est obsolète au profit de `deployment.environment.name` dans [les conventions sémantiques OpenTelemetry v1.27.0][17].  
2 : `deployment.environment.name` est pris en charge dans Datadog Agent 7.58.0+ et Datadog Exporter v0.110.0+.

<div class="alert alert-danger">Variables d'environnement spécifiques à Datadog comme <code>DD_SERVICE</code>, <code>DD_ENV</code> ou <code>DD_VERSION</code> ne sont pas prises en charge par défaut dans votre configuration OpenTelemetry.</div>

{{< tabs >}}
{{% tab "Avec des variables d'environnement" %}}

Pour définir des attributs de ressource à l'aide de variables d'environnement, définissez `OTEL_RESOURCE_ATTRIBUTES` avec les valeurs appropriées :

```shell
export OTEL_RESOURCE_ATTRIBUTES="service.name=my-service,deployment.environment=production,service.version=1.2.3"
```

{{% /tab %}}

{{% tab "SDK" %}}

Pour définir des attributs de ressource dans le code de votre application, créez un `Resource` avec les attributs souhaités et associez-le à votre `TracerProvider`.

Voici un exemple en Python :

```python
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider

resource = Resource(attributes={
   "service.name": "<SERVICE>",
   "deployment.environment": "<ENV>",
   "service.version": "<VERSION>"
})
tracer_provider = TracerProvider(resource=resource)
```

{{% /tab %}}

{{% tab "Collecteur" %}}

Pour définir des attributs de ressource à partir de l'OpenTelemetry Collector, utilisez le [processeur de transformation][100] dans votre fichier de configuration Collector. Le processeur de transformation vous permet de modifier les attributs des données de télémétrie collectées avant de les envoyer à l'exportateur Datadog :

```yaml
processors:
  transform:
    trace_statements:
      - context: resource
        statements:
          - set(attributes["service.name"], "my-service")
          - set(attributes["deployment.environment"], "production")
          - set(attributes["service.version"], "1.2.3")
...
```

[100]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor

{{% /tab %}}
{{< /tabs >}}

## Lectures complémentaires {#further-reading}

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
[10]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm/
[11]: /fr/getting_started/synthetics/
[12]: /fr/integrations/statsd/
[13]: https://www.chef.io/
[14]: https://www.ansible.com/
[15]: /fr/serverless/configuration/#connect-telemetry-using-tags
[16]: https://opentelemetry.io/docs/languages/js/resources/
[17]: https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.27.0