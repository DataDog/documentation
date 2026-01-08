---
aliases:
- /fr/agent/autodiscovery/management
- /fr/agent/kubernetes/management
- /fr/agent/guide/autodiscovery-management
- /fr/containers/guide/autodiscovery-management
description: Contrôler les conteneurs que l'Agent Datadog surveille en configurant
  des règles de découverte et des modèles d'inclusion/exclusion
further_reading:
- link: /containers/kubernetes/integrations/
  tag: Documentation
  text: Configurer des intégrations avec Autodiscovery sur Kubernetes
- link: /containers/docker/integrations/
  tag: Documentation
  text: Configurer des intégrations avec Autodiscovery sur Docker
title: Gestion de la découverte de conteneurs
---

Par défaut, l'Agent Datadog découvre automatiquement tous les conteneurs disponibles. Ce document décrit comment restreindre le périmètre de découverte de l'Agent Datadog et limiter la collecte de données à un sous-ensemble de conteneurs.

## Modèles de découverte de conteneurs

Dans un environnement conteneurisé, vous devez déployer l'Agent Datadog une fois par host. Chaque Agent Datadog déployé découvre et surveille automatiquement tous les conteneurs sur son host respectif. Lorsque l'option logs [`containerCollectAll`][1] est activée, l'Agent collecte les logs de tous les conteneurs découverts.

Vous pouvez ajuster les règles de découverte de l'Agent pour restreindre la collecte de métriques et de logs. Tous les conteneurs exclus de la collecte de métriques sont également exclus pour toutes les intégrations d'Agent basées sur [Autodiscovery][2].

Vous pouvez définir des exceptions de deux manières :

- Fournir des variables d'environnement au conteneur de l'Agent Datadog sous forme de liste d'autorisation/liste de blocage de conteneurs. Recommandé si vous disposez d'une liste de noms de conteneurs, d'images ou d'espaces de nommage à exclure pour l'ensemble du cluster.
- Ajouter des annotations à vos pods Kubernetes pour bloquer des pods ou des conteneurs individuels. Recommandé si vous avez besoin d'exclusions précises.

**Remarque**: ces paramètres n'ont aucun effet sur les métriques `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` et `.stopped.total`, qui prennent en compte l'ensemble des conteneurs.

## Correspondance de modèles simple

Utilisez les variables d'environnement du tableau ci-dessous pour configurer le filtrage des conteneurs. Chaque inclusion ou exclusion est définie comme une liste de chaînes regex séparées par des espaces. Vous pouvez inclure ou exclure des conteneurs en fonction de leur :

- nom de conteneur (`name`)
- nom d'image de conteneur (`image`)
- espace de nommage Kubernetes (`kube_namespace`)

<div class="alert alert-danger">

Le paramètre `name` s'applique uniquement aux noms de conteneurs, pas aux noms de pods, même si le conteneur s'exécute dans un pod Kubernetes.

</div>

### Variables d'environnement

Dans **Agent v7.20+**, utilisez les variables d'environnement suivantes pour exclure des conteneurs par nom d'image, nom de conteneur ou espace de nommage Kubernetes. Les logs et les métriques ne sont pas collectés à partir des conteneurs exclus.

| Variable d'environnement           | Description                                         |
| ------------------------------ | --------------------------------------------------- |
| `DD_CONTAINER_EXCLUDE`         | Liste de blocage des conteneurs à exclure.                 |
| `DD_CONTAINER_EXCLUDE_METRICS` | Liste de blocage des conteneurs dont les métriques sont exclues. |
| `DD_CONTAINER_EXCLUDE_LOGS`    | Liste de blocage des conteneurs dont les logs sont exclus.    |
| `DD_CONTAINER_INCLUDE`         | Liste d'autorisation des conteneurs à inclure.                 |
| `DD_CONTAINER_INCLUDE_METRICS` | Liste d'autorisation des conteneurs dont les métriques sont incluses. |
| `DD_CONTAINER_INCLUDE_LOGS`    | Liste d'autorisation des conteneurs dont les logs sont inclus.    |

{{% collapse-content title="Définir les variables d'environnement" level="h4" expanded=false id="setting-environment-variables" %}}

{{< tabs >}}
{{% tab "Operator Datadog" %}}

Dans le Datadog Operator, définissez ces variables d'environnement sous `spec.override.nodeAgent.env`.

##### Exemple

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

Dans votre chart Helm, fournissez une chaîne séparée par des espaces à un ou plusieurs des éléments suivants :
- `datadog.containerExclude`
- `datadog.containerInclude`
- `datadog.containerExcludeLogs`
- `datadog.containerIncludeLogs`
- `datadog.containerExcludeMetrics`
- `datadog.containerIncludeMetrics`

##### Exemple

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
```

{{% /tab %}}
{{% tab "Agent conteneurisé" %}}

Dans les environnements où vous n'utilisez pas le Datadog Operator ou Helm, les variables d'environnement suivantes peuvent être transmises au conteneur de l'Agent au démarrage.

##### Exemple Docker

```shell
docker run -e DD_CONTAINER_EXCLUDE=image:<IMAGE_NAME> ...
```

##### Exemple ECS

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

Les filtres de nom d'image (`image`) sont mis en correspondance avec le nom d'image complet, y compris le registre et le tag ou le digest de l'image (par exemple, `dockerhub.io/nginx:1.13.1`).

</div>

#### Exemples

Pour exclure le conteneur portant le nom `dd-agent` :

```
DD_CONTAINER_EXCLUDE = "name:^dd-agent$"
```

Pour exclure les conteneurs utilisant l'image `dockercloud/network-daemon`, y compris tous les tags et digests :

```
DD_CONTAINER_EXCLUDE = "image:^dockercloud/network-daemon(@sha256)?:.*
```

Pour exclure les conteneurs utilisant l'image `dockercloud/network-daemon:1.13.0` :

```
DD_CONTAINER_EXCLUDE = "image:^dockercloud/network-daemon:1.13.0$"
```

Pour exclure tout conteneur dont l'image contient le mot `agent` :

```
DD_CONTAINER_EXCLUDE = "image:agent"
```

Pour exclure tout conteneur utilisant l'image `foo` quel que soit le registre :

```
DD_CONTAINER_EXCLUDE = "image:^.*/foo(@sha256)? :.*"
```

Pour exclure tous les conteneurs :

```
DD_CONTAINER_EXCLUDE = "name:.*"
```

Vous pouvez également utiliser `image:.*` ou `kube_namespace:.*`. La configuration de `.*` sans préfixe `name:`, `image:` ou `kube_namespace:` ne fonctionne pas.

### Comportement d'inclusion et d'exclusion

En général, l'inclusion a la priorité sur l'exclusion. Par exemple, pour surveiller uniquement les images `ubuntu` ou `debian`, excluez d'abord toutes les autres images, puis spécifiez les images à inclure :

```
DD_CONTAINER_EXCLUDE = "image:.*"
DD_CONTAINER_INCLUDE = "image:^docker.io/library/ubuntu(@sha256)?:.* image:^docker.io/library/debian(@sha256)?:.*"
```

La seule exception à cette règle concerne les annotations d'exclusion de pod comme `ad.datadoghq.com/exclude`. Lorsqu'une application a une annotation d'exclusion définie sur `true`, cela est prioritaire et le conteneur est exclu de la découverte automatique pour la surveillance. Par exemple, avoir une condition qui inclut tous les conteneurs comme `DD_CONTAINER_INCLUDE = "image:.*"` ne garantit pas qu'un conteneur est inclus s'il a une annotation d'exclusion définie. Consultez la section [Gestion de la découverte de conteneurs - Configuration d'exclusion de pod](#configuration-d-exclusion-de-pod) pour plus d'informations.

Vous ne pouvez pas mélanger les règles d'inclusion/exclusion entre catégories. Par exemple, si vous souhaitez inclure un conteneur avec le nom d'image `foo` et exclure uniquement les métriques d'un conteneur avec le nom d'image `bar`, ce qui suit n'est **pas suffisant** :

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^docker.io/library/bar(@sha256)?:.*"
DD_CONTAINER_INCLUDE = "image:^docker.io/library/foo(@sha256)?:.*"
```

Utilisez plutôt :

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^docker.io/library/bar(@sha256)?:.*"
DD_CONTAINER_INCLUDE_METRICS = "image:^docker.io/library/foo(@sha256)?:.*"
DD_CONTAINER_INCLUDE_LOGS = "image:^docker.io/library/foo(@sha256)?:.*"
```

Il n'y a pas d'interaction entre les listes globales et les listes sélectives (logs et métriques). En d'autres termes, vous ne pouvez pas exclure un conteneur globalement (`DD_CONTAINER_EXCLUDE`), puis l'inclure avec `DD_CONTAINER_INCLUDE_LOGS` et `DD_CONTAINER_INCLUDE_METRICS`.

### Conteneurs pause

L'Agent Datadog exclut par défaut les conteneurs pause de Kubernetes et OpenShift. Cela empêche leur collecte de métriques et leur comptabilisation en tant que conteneurs facturables. Ils sont toujours comptés dans les métriques de nombre de conteneurs telles que `kubernetes.containers.running` et `docker.containers.running`.

Pour désactiver ce comportement et inclure la surveillance des conteneurs pause :

{{< tabs >}}
{{% tab "Operator Datadog" %}}

Dans le Datadog Operator, définissez ces variables d'environnement sous `spec.override.nodeAgent.env`.

##### Exemple

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

##### Exemple

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
  excludePauseContainer: false
```

{{% /tab %}}
{{% tab "Agent conteneurisé" %}}

Dans les environnements où vous n'utilisez pas Helm ou l'opérateur, les variables d'environnement suivantes peuvent être transmises au conteneur de l'Agent au démarrage.

Définissez `DD_EXCLUDE_PAUSE_CONTAINER` sur `false`.
{{% /tab %}}
{{< /tabs >}}

## Exclusion CEL avancée

Dans **Agent v7.73+**, vous pouvez utiliser l'option de configuration `cel_workload_exclude` pour filtrer les conteneurs d'Autodiscovery. Cette fonctionnalité vous permet de définir des règles [Common Expression Language][3] pour cibler les conteneurs à exclure de la collecte de données de télémétrie.

Utilisez les attributs suivants pour représenter l'objet conteneur dans vos règles de filtrage :

| Attribut                   | Description                                                             |
|-----------------------------|-------------------------------------------------------------------------|
| `container.name`            | Nom du conteneur.                                              |
| `container.image.reference` | Référence complète de l'image de conteneur (registre, référentiel, tag/digest). |
| `container.pod.name`        | Nom du pod exécutant le conteneur.                              |
| `container.pod.namespace`   | Espace de nommage Kubernetes du pod.                                    |
| `container.pod.annotations` | Annotations appliquées au pod (mappage clé-valeur).                     |

### Structure de configuration

L'option de configuration `cel_workload_exclude` est structurée comme une liste d'ensembles de règles évalués comme des OU logiques, où un conteneur est exclu s'il correspond à une règle quelconque. Chaque ensemble de règles définit les `products` à exclure et les `rules` CEL correspondantes pour correspondre aux conteneurs.

Le champ `products` accepte `metrics`, `logs` et `global` (exclure le conteneur de tous les produits répertoriés).

<div class="alert alert-danger">
Si la configuration contient des erreurs structurelles ou des problèmes de syntaxe CEL, l'Agent se ferme avec une erreur pour éviter de collecter des données de télémétrie non intentionnelles qui pourraient avoir un impact sur la facturation.
</div>

Dans l'exemple ci-dessous, les métriques et les logs sont exclus pour tout conteneur avec `nginx` dans son nom s'exécutant dans l'espace de nommage `staging`. De plus, les logs sont exclus pour tout conteneur exécutant l'image `redis`, OU tout conteneur dans un pod qui a l'annotation `low_priority: "true"`. Le [fichier de configuration de l'Agent][4] peut être directement mis à jour comme le montre cet exemple.

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

L'exclusion de charge de travail basée sur CEL peut également être configurée en fournissant une valeur d'environnement au format JSON à `DD_CEL_WORKLOAD_EXCLUDE`.

{{% collapse-content title="Définir les variables d'environnement" level="h4" expanded=false id="setting-environment-variables" %}}

{{< tabs >}}
{{% tab "Operator Datadog" %}}

Dans le Datadog Operator, définissez ces variables d'environnement sous `spec.override.nodeAgent.env`.

##### Exemple

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
      - name: DD_CEL_WORKLOAD_EXCLUDE
        value: >
          [{"products":["global"],"rules":{"containers":["container.name == \"redis\""]}}]
```

{{% /tab %}}
{{% tab "Helm" %}}

Dans votre chart Helm, utilisez l'option de configuration `datadog.celWorkloadExclude`.

##### Exemple

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

Dans les environnements où vous n'utilisez pas Helm ou l'opérateur, les variables d'environnement suivantes peuvent être transmises au conteneur de l'Agent au démarrage.

##### Exemple Docker

```shell
docker run -e DD_CEL_WORKLOAD_EXCLUDE=<JSON_CEL_RULES>...
```

##### Example ECS

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

{{% collapse-content title="Valider l'option de configuration" level="h4" expanded=false id="validating-configuration-option" %}}

Utilisez la commande `agent workloadfilter verify-cel` pour valider la syntaxe de votre configuration avant le déploiement. Elle accepte une entrée YAML ou JSON via stdin. L'exemple suivant montre la validation détectant une erreur de champ non défini :

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

#### Exemples de règles

Pour exclure le conteneur avec une annotation de pod spécifique :

```yaml
container.pod.annotations["monitoring"] == "false"
```

Pour exclure le conteneur dans des espaces de nommage sans la sous-chaîne `-dev` :

```yaml
!container.pod.namespace.matches("-dev")
```

Pour exclure le conteneur avec le nom `nginx-server` uniquement dans l'espace de nommage `prod` :

```yaml
container.name == "nginx-server" && container.pod.namespace == "prod"
```

Pour exclure le conteneur exécutant une image avec la sous-chaîne `nginx` :

```yaml
container.image.reference.matches("nginx")
```

Pour exclure le conteneur à l'aide d'une logique groupée (par exemple, un nom de conteneur spécifique dans l'un des deux espaces de nommage) :

```yaml
container.name == "redis" && (container.pod.namespace == "production" || container.pod.namespace == "staging")
```

Pour exclure des conteneurs en fonction du nom du propriétaire de leur pod (par exemple, cibler tous les conteneurs créés par un Deployment ou un CronJob nommé `my-app`) :

```yaml
container.pod.name.startsWith("my-app")
```

## Configuration d'exclusion de pod

Dans **Agent v7.45+**, vous pouvez définir des annotations sur vos pods Kubernetes pour contrôler Autodiscovery. Définissez les annotations suivantes avec la valeur `"true"` pour ajouter des règles d'exclusion.

| Annotation                                          | Description                                                                      |
| --------------------------------------------------- | -------------------------------------------------------------------------------- |
| `ad.datadoghq.com/exclude`                          | Exclure l'ensemble du pod                                                          |
| `ad.datadoghq.com/logs_exclude`                     | Exclure la collecte de logs de l'ensemble du pod                                      |
| `ad.datadoghq.com/metrics_exclude`                  | Exclure la collecte de métriques de l'ensemble du pod                                   |
| `ad.datadoghq.com/<CONTAINER_NAME>.exclude`         | Exclure le conteneur avec `<CONTAINER_NAME>` dans le pod                        |
| `ad.datadoghq.com/<CONTAINER_NAME>.logs_exclude`    | Exclure la collecte de logs du conteneur avec `<CONTAINER_NAME>` dans le pod    |
| `ad.datadoghq.com/<CONTAINER_NAME>.metrics_exclude` | Exclure la collecte de métriques du conteneur avec `<CONTAINER_NAME>` dans le pod |

L'annotation `ad.datadoghq.com/exclude` définie sur le pod d'application a la priorité la plus élevée. Cela signifie que même si un conteneur correspond à l'inclusion via `DD_CONTAINER_INCLUDE`, l'Agent ignore toujours la surveillance de ce conteneur. Il en va de même pour les configurations de filtrage respectives spécifiques aux métriques et aux logs.

Lors de l'application d'exclusions basées sur des annotations, l'Agent vérifie toutes les annotations d'exclusion pertinentes sur le conteneur. Par exemple, lors de la configuration des logs pour un conteneur NGINX, l'Agent recherchera les annotations `ad.datadoghq.com/exclude`, `ad.datadoghq.com/logs_exclude`, `ad.datadoghq.com/nginx.exclude` ou `ad.datadoghq.com/nginx.logs_exclude` définies sur `true` sur le pod. Il en va de même pour les métriques.

#### Exclure l'ensemble du pod

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

#### Exclure la collecte de logs d'un conteneur

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

### Tolérer les pods « unready »

Par défaut, les pods `unready` sont ignorés lorsque l'Agent Datadog planifie des checks. Par conséquent, les métriques, les checks de service et les logs ne sont pas collectés à partir de ces pods. Pour remplacer ce comportement, définissez l'annotation `ad.datadoghq.com/tolerate-unready` sur `"true"`. Par exemple :

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

## Configuration de sécurité

Dans **Agent v7.70+**, vous pouvez restreindre la surveillance de sécurité pour des conteneurs spécifiques, de sorte que vous ne soyez facturé que pour les conteneurs que vous souhaitez surveiller. Cette fonctionnalité n'est pas prise en charge pour le Datadog Operator.

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
Pour [Cloud Security Vulnerabilities][1], vous pouvez utiliser le format suivant dans votre fichier de configuration pour inclure ou exclure des conteneurs :

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
Dans les environnements où vous n'utilisez pas Helm ou l'opérateur, les variables d'environnement suivantes peuvent être transmises au conteneur de l'Agent au démarrage.

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

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/containers/kubernetes/log/?tab=helm#log-collection
[2]: /fr/getting_started/containers/autodiscovery
[3]: https://github.com/google/cel-spec/blob/master/doc/langdef.md
[4]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file