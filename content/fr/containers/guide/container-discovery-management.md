---
aliases:
- /fr/agent/autodiscovery/management
- /fr/agent/kubernetes/management
- /fr/agent/guide/autodiscovery-management
- /fr/containers/guide/autodiscovery-management
description: Contrôlez quels conteneurs l'Agent Datadog surveille en configurant des
  règles de découverte et des modèles d'inclusion/exclusion
further_reading:
- link: /containers/kubernetes/integrations/
  tag: Documentation
  text: Configurez les intégrations avec Autodiscovery sur Kubernetes
- link: /containers/docker/integrations/
  tag: Documentation
  text: Configurez les intégrations avec Autodiscovery sur Docker
title: Gestion de la découverte de conteneurs
---
Par défaut, l'Agent Datadog découvre automatiquement tous les conteneurs disponibles. Ce document décrit comment restreindre le périmètre de découverte de l'Agent Datadog et limiter la collecte de données à un sous-ensemble de conteneurs.

## Modèles de découverte de conteneurs {#container-discovery-patterns}

Dans un environnement conteneurisé, vous devez déployer l'Agent Datadog une fois par hôte. Chaque Agent Datadog déployé découvre et surveille automatiquement tous les conteneurs sur son hôte respectif. Lorsque l'option [`containerCollectAll`][1] est activée, l'Agent collecte des journaux de tous les conteneurs découverts.

Vous pouvez ajuster les règles de découverte pour l'Agent afin de restreindre la collecte de métriques et de journaux. Tous les conteneurs restreints de la collecte de métriques sont également restreints pour toutes les intégrations d'Agent basées sur [Autodiscovery][2].

Vous pouvez définir des exceptions de deux manières :

- Fournissez des variables d'environnement au conteneur de l'Agent Datadog comme une liste d'autorisation/liste de blocage de conteneurs. Recommandé si vous avez une liste de noms de conteneurs, d'images ou d'espaces de noms à exclure pour l'ensemble du cluster.
- Ajoutez des annotations à vos pods Kubernetes pour bloquer des pods ou conteneurs individuels. Recommandé si vous avez besoin d'exclusions précises.

**Remarque** : Les métriques `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` et `.stopped.total` ne sont pas affectées par ces paramètres et comptent toujours tous les conteneurs.

## Correspondance de motifs simple {#simple-pattern-matching}

Utilisez les variables d'environnement dans le tableau ci-dessous pour configurer le filtrage des conteneurs. Chaque inclusion ou exclusion est définie comme une liste de chaînes regex séparées par des espaces. Vous pouvez inclure ou exclure des conteneurs en fonction de leur :

- nom du conteneur (`name`)
- nom de l'image du conteneur (`image`)
- espace de noms Kubernetes (`kube_namespace`)

<div class="alert alert-danger">

Le paramètre `name` s'applique uniquement aux noms de conteneurs, pas aux noms de pods, même si le conteneur s'exécute dans un pod Kubernetes.

</div>

### Variables d'environnement {#environment-variables}

Dans **Agent v7.20+**, utilisez les variables d'environnement suivantes pour exclure des conteneurs par nom d'image, nom de conteneur ou espace de noms Kubernetes. Les journaux et les métriques ne sont pas collectés à partir des conteneurs exclus.

| Variable d'environnement           | Description                                         |
| ------------------------------ | --------------------------------------------------- |
| `DD_CONTAINER_EXCLUDE`         | Liste de blocage des conteneurs à exclure.                 |
| `DD_CONTAINER_EXCLUDE_METRICS` | Liste de blocage des conteneurs dont les métriques sont exclues. |
| `DD_CONTAINER_EXCLUDE_LOGS`    | Liste de blocage des conteneurs dont les journaux sont exclus.    |
| `DD_CONTAINER_INCLUDE`         | Liste d'autorisation des conteneurs à inclure.                 |
| `DD_CONTAINER_INCLUDE_METRICS` | Liste d'autorisation des conteneurs dont les métriques sont incluses. |
| `DD_CONTAINER_INCLUDE_LOGS`    | Liste d'autorisation des conteneurs dont les journaux sont inclus.|

{{% collapse-content title="Configuration des variables d'environnement" level="h4" expanded=false id="setting-environment-variables" %}}

{{< tabs >}}
{{% tab "Operator Datadog" %}}

Dans Datadog Operator, définissez ces variables d'environnement sous `spec.override.nodeAgent.env`.

##### Exemple {#example}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
  override:
    nodeAgent:
      env:
      - name: DD_CONTAINER_EXCLUDE
        value: "image:<IMAGE_NAME>"
```

{{% /tab %}}
{{% tab "Helm" %}}

Dans votre Helm chart, fournissez une chaîne de caractères contenant des éléments séparés par des espaces pour une ou plusieurs des options suivantes :
- `datadog.containerExclude`
- `datadog.containerInclude`
- `datadog.containerExcludeLogs`
- `datadog.containerIncludeLogs`
- `datadog.containerExcludeMetrics`
- `datadog.containerIncludeMetrics`

##### Exemple {#example-1}

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
```

{{% /tab %}}
{{% tab "Agent conteneurisé" %}}

Dans les environnements où vous n'utilisez pas le Datadog Operator ou Helm, les variables d'environnement suivantes peuvent être transmises au conteneur de l'Agent au démarrage.

##### Exemple Docker {#example-docker}

```shell
docker run -e DD_CONTAINER_EXCLUDE=image:<IMAGE_NAME> ...
```

##### Exemple ECS {#example-ecs}

```json
"environment": [
  {
    "name": "DD_CONTAINER_EXCLUDE",
    "value": "image:<IMAGE_NAME>"
  },
  ...
]
```

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

<div class="alert alert-info">

Les filtres de nom d'image (`image`) sont appliqués à l'ensemble du nom d'image, y compris le registre et le tag ou le digest de l'image (par exemple, `dockerhub.io/nginx:1.13.1`).

</div>

#### Exemples {#examples}

Pour exclure le conteneur portant le nom `dd-agent` :

```
DD_CONTAINER_EXCLUDE = "name:^dd-agent$"
```

Pour exclure les conteneurs utilisant l'image `dockercloud/network-daemon`, y compris tous les tags et digests :

```
DD_CONTAINER_EXCLUDE = "image:^dockercloud/network-daemon(@sha256)?:.*
```

Pour exclure les conteneurs utilisant l'image `dockercloud/network-daemon:1.13.0` :

```
DD_CONTAINER_EXCLUDE = "image:^dockercloud/network-daemon:1.13.0$"
```

Pour exclure tout conteneur dont l'image contient le mot `agent` :

```
DD_CONTAINER_EXCLUDE = "image:agent"
```

Pour exclure tout conteneur utilisant l'image `foo` indépendamment du registre :

```
DD_CONTAINER_EXCLUDE = "image:^.*/foo(@sha256)?:.*"
```

Pour exclure chaque conteneur :

```
DD_CONTAINER_EXCLUDE = "name:.*"
```

Alternativement, vous pouvez également utiliser `image:.*` ou `kube_namespace:.*`. Configurer `.*` sans préfixe `name:`, `image:` ou `kube_namespace:` ne fonctionne pas.

### Comportement d'inclusion et d'exclusion {#inclusion-and-exclusion-behavior}

En général, l'inclusion prend le pas sur l'exclusion. Par exemple, pour ne surveiller que les images `ubuntu` ou `debian`, excluez d'abord toutes les autres images puis spécifiez les images à inclure :

```
DD_CONTAINER_EXCLUDE = "image:.*"
DD_CONTAINER_INCLUDE = "image:^docker.io/library/ubuntu(@sha256)?:.* image:^docker.io/library/debian(@sha256)?:.*"
```

La seule exception à cette règle est les annotations d'exclusion de pod comme `ad.datadoghq.com/exclude`. Lorsqu'une application a une annotation d'exclusion définie sur `true`, cela prend le pas, et le conteneur est exclu de la découverte automatique pour la surveillance. Par exemple, avoir une condition qui inclut chaque conteneur comme `DD_CONTAINER_INCLUDE = "image:.*"` ne garantit pas qu'un conteneur soit inclus s'il a une annotation d'exclusion définie dessus. Voir [Gestion de la découverte des conteneurs - Configuration d'exclusion de pod](#pod-exclude-configuration) pour plus d'informations.

Vous ne pouvez pas mélanger les règles d'inclusion/exclusion entre catégories. Par exemple, si vous souhaitez inclure un conteneur avec le nom d'image `foo` et exclure uniquement les métriques d'un conteneur avec le nom d'image `bar`, ce qui suit est **insuffisant** :

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^docker.io/library/bar(@sha256)?:.*"
DD_CONTAINER_INCLUDE = "image:^docker.io/library/foo(@sha256)?:.*"
```

Au lieu de cela, utilisez :

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^docker.io/library/bar(@sha256)?:.*"
DD_CONTAINER_INCLUDE_METRICS = "image:^docker.io/library/foo(@sha256)?:.*"
DD_CONTAINER_INCLUDE_LOGS = "image:^docker.io/library/foo(@sha256)?:.*"
```

Il n'y a aucune interaction entre les listes globales et les listes sélectives (journaux et métriques). En d'autres termes, vous ne pouvez pas exclure un conteneur globalement (`DD_CONTAINER_EXCLUDE`) puis l'inclure avec `DD_CONTAINER_INCLUDE_LOGS` et `DD_CONTAINER_INCLUDE_METRICS`.

### Conteneurs de pause {#pause-containers}

L'Agent Datadog exclut par défaut les conteneurs de pause Kubernetes et OpenShift. Cela empêche leur collecte de métriques et leur comptage en tant que conteneurs facturables. Ils sont toujours comptés dans les métriques de comptage des conteneurs telles que `kubernetes.containers.running` et `docker.containers.running`.

Pour désactiver ce comportement et inclure la surveillance des conteneurs de pause :

{{< tabs >}}
{{% tab "Operator Datadog" %}}

Dans Datadog Operator, définissez ces variables d'environnement sous `spec.override.nodeAgent.env`.

##### Exemple {#example-2}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
  override:
    nodeAgent:
      env:
      - name: DD_EXCLUDE_PAUSE_CONTAINER
        value: "false"
```

{{% /tab %}}
{{% tab "Helm" %}}

Dans votre chart Helm, définissez `datadog.excludePauseContainer` sur `true` ou `false`.

##### Exemple {#example-3}

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
  excludePauseContainer: false
```

{{% /tab %}}
{{% tab "Agent conteneurisé" %}}

Dans les environnements où vous n'utilisez pas Helm ou l'Operator, les variables d'environnement suivantes peuvent être passées au conteneur de l'Agent au démarrage.

Définissez `DD_EXCLUDE_PAUSE_CONTAINER` sur `false`.
{{% /tab %}}
{{< /tabs >}}

## Exclusion CEL avancée {#advanced-cel-exclusion}

Dans **Agent v7.73+**, vous pouvez utiliser l'option de configuration `cel_workload_exclude` pour filtrer les conteneurs d'Autodiscovery. Cette fonctionnalité vous permet de définir des règles [Common Expression Language][3] pour cibler les conteneurs à exclure de la collecte de télémétrie.

Utilisez les attributs suivants pour représenter l'objet conteneur dans vos règles de filtrage :

| Attribut                   | Description                                                             |
|-----------------------------|-------------------------------------------------------------------------|
| `container.name`            | Le nom du conteneur.                                              |
| `container.image.reference` | La référence complète de l'image du conteneur (registre, dépôt, tag/digest). |
| `container.pod.name`        | Le nom du pod exécutant le conteneur.                              |
| `container.pod.namespace`   | L'espace de noms Kubernetes du pod.                                    |
| `container.pod.annotations` | Les annotations appliquées au pod (carte clé-valeur).                     |

### Structure de configuration {#configuration-structure}

L'option de configuration `cel_workload_exclude` est structurée comme une liste d'ensembles de règles évaluées comme des OU logiques, où un conteneur est exclu s'il correspond à une règle. Chaque ensemble de règles définit le `products` à exclure et le CEL correspondant `rules` à comparer aux conteneurs.

Le champ `products` accepte `metrics`, `logs` et `global` (exclure le conteneur de tous les produits listés).

<div class="alert alert-danger">
Si la configuration contient des erreurs structurelles ou des problèmes de syntaxe CEL, l'Agent se termine avec une erreur pour éviter de collecter des télémétries non intentionnelles qui pourraient affecter la facturation.
</div>

Dans l'exemple ci-dessous, les métriques et les journaux sont exclus pour tout conteneur contenant `nginx` dans son nom exécuté dans l'espace de noms `staging`. De plus, les journaux sont exclus pour tout conteneur exécutant l'image `redis`, OU tout conteneur au sein d'un pod ayant l'annotation `low_priority: "true"`. Le [fichier de configuration de l'Agent][4] peut être directement mis à jour comme le montre cet exemple.

```yaml
# datadog.yaml
cel_workload_exclude:
- products: [metrics, logs]
  rules:
    containers:
      - container.name.matches("nginx") && container.pod.namespace == "staging"
- products: [logs]
  rules:
    containers:
      - container.image.reference.matches("redis")
      - container.pod.annotations["low_priority"] == "true"
```

Vous pouvez également configurer l'exclusion de charge de travail basée sur CEL en utilisant l'une des méthodes suivantes :
- Définissez la variable d'environnement `DD_CEL_WORKLOAD_EXCLUDE` avec une chaîne au format JSON contenant vos règles, dans toute configuration d'Agent conteneurisé.
- Pour l'Opérateur Datadog ou le Helm Chart, ajoutez vos règles CEL à l'option de configuration appropriée (comme indiqué dans les exemples ci-dessous).

{{% collapse-content title="Configuration des règles d'exclusion CEL" level="h4" expanded=false id="setting-environment-variables" %}}

{{< tabs >}}
{{% tab "Operator Datadog" %}}

Dans l'Opérateur Datadog (>=v1.23.0), utilisez les options `spec.override.nodeAgent.celWorkloadExclude` et `spec.override.clusterAgent.celWorkloadExclude`.

##### Exemple {#example-4}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
  override:
    nodeAgent:
      celWorkloadExclude:
        - products: [ global ]
          rules:
            containers:
              - container.name == "redis"
    clusterAgent:
      celWorkloadExclude:
        - products: [ global ]
          rules:
            containers:
              - container.name == "redis"
```

{{% /tab %}}
{{% tab "Helm" %}}

Dans votre Helm chart, utilisez l'option de configuration `datadog.celWorkloadExclude`.

##### Exemple {#example-5}

```yaml
datadog:
  celWorkloadExclude:
  - products: [global]
    rules:
      containers:
        - container.name == "redis"
```

{{% /tab %}}
{{% tab "Agent conteneurisé" %}}

Dans les environnements où vous n'utilisez pas Helm ou l'Operator, les variables d'environnement suivantes peuvent être passées au conteneur de l'Agent au démarrage.

##### Exemple Docker {#example-docker-1}

```shell
docker run -e DD_CEL_WORKLOAD_EXCLUDE=<JSON_CEL_RULES> ...
```

##### Exemple ECS {#example-ecs-1}

```json
"environment": [
  {
    "name": "DD_CEL_WORKLOAD_EXCLUDE",
    "value": "<JSON_CEL_RULES>"
  },
  ...
]
```

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Validation de l'option de configuration" level="h4" expanded=false id="validating-configuration-option" %}}

Utilisez la commande `agent workloadfilter verify-cel` pour valider la syntaxe de votre configuration avant le déploiement. Elle accepte les entrées YAML ou JSON via stdin. L'exemple suivant montre comment la validation détecte une erreur de champ non défini :

```json
### cel-config.json
[
  {
    "products": ["metrics"],
    "rules":
      {
        "containers":
          [
            'container.undefined_field == "test"',
            'container.name.startsWith("-agent")',
          ],
      },
  },
]
```

```bash
agent workloadfilter verify-cel < cel-config.json

-> Validating CEL Configuration
    Loading YAML file...
✓ YAML loaded successfully (1 bundle(s))

-> Validating configuration structure...
✓ Configuration structure is valid

-> Compiling CEL rules...

  -> metrics
    Resource: container (2 rule(s))
      ✗ Compilation failed: ERROR: <input>:1:10: undefined field 'undefined_field'
 | container.undefined_field == "test" || container.name.startsWith("-agent")
 | .........^
        Rule 1: container.undefined_field == "test"
        Rule 2: container.name.startsWith("-agent")

✗ Validation failed - some rules have errors
Error: CEL compilation failed
```

{{% /collapse-content %}}

#### Exemple de règles {#example-rules}

Pour exclure le conteneur avec une annotation de pod spécifique :

```yaml
container.pod.annotations["monitoring"] == "false"
```

Pour exclure le conteneur dans les espaces de noms sans la sous-chaîne `-dev` :

```yaml
!container.pod.namespace.matches("-dev")
```

Pour exclure le conteneur portant le nom `nginx-server` uniquement dans l'espace de noms `prod` :

```yaml
container.name == "nginx-server" && container.pod.namespace == "prod"
```

Pour exclure le conteneur exécutant une image avec la sous-chaîne `nginx` :

```yaml
container.image.reference.matches("nginx")
```

Pour exclure le conteneur en utilisant une logique groupée (par exemple, un nom de conteneur spécifique dans l'un des deux espaces de noms) :

```yaml
container.name == "redis" && (container.pod.namespace == "production" || container.pod.namespace == "staging")
```

Pour exclure les conteneurs en fonction du nom du propriétaire de leur pod (par exemple, cibler tous les conteneurs créés par un Déploiement ou un CronJob nommé `my-app`) :

```yaml
container.pod.name.startsWith("my-app")
```

Pour **inclure uniquement** les conteneurs dans un ensemble particulier d'espaces de noms :

```yaml
!(container.pod.namespace in ["foo", "bar", "baz"])
```

## Configuration d'exclusion de pod {#pod-exclude-configuration}

Dans **Agent v7.45+**, vous pouvez définir des annotations sur vos pods Kubernetes pour contrôler l'Autodécouverte. Définissez les annotations suivantes avec la valeur `"true"` pour ajouter des règles d'exclusion.

| Annotation                                          | Description                                                                      |
| --------------------------------------------------- | -------------------------------------------------------------------------------- |
| `ad.datadoghq.com/exclude`                          | Exclut l'ensemble du pod                                                          |
| `ad.datadoghq.com/logs_exclude`                     | Exclut la collecte de journaux de l'ensemble du pod                                      |
| `ad.datadoghq.com/metrics_exclude`                  | Exclut la collecte de métriques de l'ensemble du pod                                   |
| `ad.datadoghq.com/<CONTAINER_NAME>.exclude`         | Exclut le conteneur avec `<CONTAINER_NAME>` dans le pod                        |
| `ad.datadoghq.com/<CONTAINER_NAME>.logs_exclude`    | Exclut la collecte de journaux du conteneur avec `<CONTAINER_NAME>` dans le pod |
| `ad.datadoghq.com/<CONTAINER_NAME>.metrics_exclude` | Exclut la collecte de métriques du conteneur avec `<CONTAINER_NAME>` dans le pod |

L'annotation `ad.datadoghq.com/exclude` définie sur le pod de l'application a la plus haute priorité. Cela signifie que même si un conteneur correspond à l'inclusion via `DD_CONTAINER_INCLUDE`, l'Agent ignore toujours la surveillance de ce conteneur. Il en va de même pour les configurations de filtrage respectives spécifiques aux métriques et aux journaux.

Lors de l'application des exclusions basées sur les annotations, l'Agent vérifie toutes les annotations d'exclusion pertinentes sur le conteneur. Par exemple, lors de la configuration des journaux pour un conteneur NGINX, l'Agent recherchera les annotations `ad.datadoghq.com/exclude`, `ad.datadoghq.com/logs_exclude`, `ad.datadoghq.com/nginx.exclude` ou `ad.datadoghq.com/nginx.logs_exclude` devant être `true` sur le pod. Il en va de même pour les métriques.

#### Exclure l'ensemble du pod {#exclude-the-entire-pod}

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example
spec:
  template:
    metadata:
      annotations:
        ad.datadoghq.com/exclude: "true"
    spec:
      containers:
        #(...)
```

#### Exclure la collecte de journaux d'un conteneur {#exclude-log-collection-from-a-container}

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example
spec:
  template:
    metadata:
      annotations:
        ad.datadoghq.com/helper.logs_exclude: "true"
    spec:
      containers:
        - name: app
          #(...)
        - name: helper
          #(...)
```

### Tolérer les pods non prêts {#tolerate-unready-pods}

Par défaut, `unready` les pods sont ignorés lorsque l'Agent Datadog planifie des vérifications. Par conséquent, les métriques, les vérifications de service et les journaux ne sont pas collectés à partir de ces pods. Pour remplacer ce comportement, définissez l'annotation `ad.datadoghq.com/tolerate-unready` sur `"true"`. Exemple :

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/tolerate-unready: "true"
  ...
```

## Configuration de sécurité {#security-configuration}

Dans **Agent v7.70+**, vous pouvez restreindre la surveillance de la sécurité pour des conteneurs spécifiques, afin que vous ne soyez facturé que pour les conteneurs que vous souhaitez surveiller. Cette fonctionnalité n'est pas prise en charge pour l'Opérateur Datadog.

{{< tabs >}}
{{% tab "Helm" %}}

| Fonctionnalité                               | Inclure le conteneur                                   | Exclure le conteneur                                   |
|---------------------------------------|-----------------------------------------------------|-----------------------------------------------------|
| [Cloud Security Misconfigurations][1] | `datadog.securityAgent.compliance.containerInclude` | `datadog.securityAgent.compliance.containerExclude` |
| [Cloud Security Vulnerabilities][2]   | `datadog.sbom.containerImage.containerInclude`      | `datadog.sbom.containerImage.containerExclude`      |
| [Workload Protection][3]              | `datadog.securityAgent.runtime.containerInclude`    | `datadog.securityAgent.runtime.containerExclude`    |

[1]: /fr/security/cloud_security_management/misconfigurations/
[2]: /fr/security/cloud_security_management/vulnerabilities
[3]: /fr/security/workload_protection/
{{% /tab %}}
{{% tab "Fichier de configuration" %}}
Pour [Cloud Security Vulnerabilities][1], vous pouvez utiliser le format suivant dans votre fichier de configuration pour inclure ou exclure des conteneurs :

```
---
sbom:
  container_image:
    container_include: ...
    container_exclude: ...
```
[1]: /fr/security/cloud_security_management/vulnerabilities
{{% /tab %}}
{{% tab "Agent conteneurisé" %}}
Dans les environnements où vous n'utilisez pas Helm ou l'Operator, les variables d'environnement suivantes peuvent être passées au conteneur Agent au démarrage.

| Fonctionnalité                               | Inclure le conteneur                              | Exclure le conteneur                              |
|---------------------------------------|------------------------------------------------|------------------------------------------------|
| [Cloud Security Misconfigurations][1] | `DD_COMPLIANCE_CONFIG_CONTAINER_INCLUDE`       | `DD_COMPLIANCE_CONFIG_CONTAINER_EXCLUDE`       |
| [Cloud Security Vulnerabilities][2]   | `DD_SBOM_CONTAINER_IMAGE_CONTAINER_INCLUDE`    | `DD_SBOM_CONTAINER_IMAGE_CONTAINER_EXCLUDE`    |
| [Workload Protection][3]              | `DD_RUNTIME_SECURITY_CONFIG_CONTAINER_INCLUDE` | `DD_RUNTIME_SECURITY_CONFIG_CONTAINER_EXCLUDE` |

[1]: /fr/security/cloud_security_management/misconfigurations/
[2]: /fr/security/cloud_security_management/vulnerabilities
[3]: /fr/security/workload_protection/
{{% /tab %}}
{{< /tabs >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/containers/kubernetes/log/?tab=helm#log-collection
[2]: /fr/getting_started/containers/autodiscovery
[3]: https://github.com/google/cel-spec/blob/master/doc/langdef.md
[4]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file