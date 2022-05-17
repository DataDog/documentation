---
aliases:
- /fr/agent/autodiscovery/management
- /fr/agent/kubernetes/management
further_reading:
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Créer et charger un modèle d'intégration Autodiscovery
kind: guide
title: Gestion de la découverte de conteneurs
---

Par défaut, l'Agent Datadog découvre automatiquement tous les conteneurs disponibles. Pour restreindre son périmètre de découverte et limiter la collecte de données uniquement à un sous-ensemble de conteneurs, utilisez une configuration dédiée pour inclure ou exclure des conteneurs.

**Remarque**: ces paramètres n'ont aucun effet sur les métriques `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` et `.stopped.total`, qui prennent en compte l'ensemble des conteneurs.

Si vous exécutez l'Agent en tant que binaire sur un host, configurez votre périmètre Autodiscovery avec les instructions de l'onglet [Agent](?tab=agent). Si vous exécutez l'Agent en tant que conteneur, configurez votre périmètre Autodiscovery avec les instructions de l'onglet [Agent conteneurisé](?tab=Agent-conteneurise).

## Exclure des conteneurs

Excluez des conteneurs du périmètre Autodiscovery de l'Agent avec une règle d'exclusion basée sur leur paramètre `name`, `image` ou `kube_namespace`. Cela vous permet de ne recueillir **AUCUNE DONNÉE** de ces conteneurs. Si un conteneur correspond à l'expression de la règle d'exclusion, il n'est pas inclus, à moins qu'il ne corresponde d'abord à l'expression de la règle d'inclusion.

**Remarque** : les règles d'exclusion prennent en charge les expressions régulières. Celles-ci sont définies sous forme de liste de chaînes séparées par des espaces.

**Remarque** : pour exclure tous les conteneurs, vous pouvez utiliser `name:.*`, `image:.*` ou `kube_namespace:.*`. Il n'est pas possible de configurer `.*` sans un préfixe `name:`, `image:` ou `kube_namespace:`.

{{< tabs >}}
{{% tab "Agent conteneurisé" %}}

Avec les **versions 7.20+ de l'Agent**, pour supprimer un conteneur Docker donné avec l'**image** `<NOM_IMAGE>` d'Autodiscovery et ainsi exclure ses **logs et métriques**, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_CONTAINER_EXCLUDE = "image:<NOM_IMAGE>"
```

À titre d'exemple, la configuration suivante indique à l'Agent d'ignorer certains conteneurs de Docker Cloud :

```shell
DD_CONTAINER_EXCLUDE = "image:dockercloud/network-daemon image:dockercloud/cleanup image:dockercloud/logrotate image:dockercloud/events image:dockercloud/ntpd"
```

Vous pouvez utiliser une expression régulière pour tout ignorer : `DD_CONTAINER_EXCLUDE = "image:dockercloud/.*"`

Avec les **versions <= 7.19 de l'Agent**, pour supprimer un conteneur Docker donné avec l'**image** `<NOM_IMAGE>` d'Autodiscovery, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_AC_EXCLUDE = "image:<NOM_IMAGE>"
```

Comme auparavant, la configuration suivante indique à l'Agent d'ignorer certains conteneurs de Docker Cloud :

```shell
DD_AC_EXCLUDE = "image:dockercloud/network-daemon image:dockercloud/cleanup image:dockercloud/logrotate image:dockercloud/events image:dockercloud/ntpd"
```

**Remarque** : `DD_AC_EXCLUDE` n'est **plus pris en charge depuis les versions 7.20+ de l'Agent**. 

Avec les **versions 7.20+ de l'Agent**, pour supprimer un conteneur Docker donné avec le **nom** `<NOM>` d'Autodiscovery et ainsi exclure ses **logs et métriques**, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_CONTAINER_EXCLUDE = "name:<NOM>"
```

Par exemple, utilisez cette règle d'exclusion pour exclure le conteneur de l'Agent :

```shell
DD_CONTAINER_EXCLUDE = "name:dd-agent"
```

Avec les **versions <= 7.19 de l'Agent**, pour supprimer un conteneur Docker donné avec le **nom** `<NOM_IMAGE>` d'Autodiscovery, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_AC_EXCLUDE = "name:<NOM>"
```

Par exemple, utilisez cette règle d'exclusion pour exclure le conteneur de l'Agent :

```shell
DD_AC_EXCLUDE = "name:dd-agent"
```

Avec les **versions 7.20+** de l'Agent, vous pouvez également utiliser des règles d'exclusion pour exclure **uniquement les logs ou uniquement les métriques**. Ainsi, pour exclure les logs d'un conteneur avec l'image `<NOM_IMAGE>`, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_CONTAINER_EXCLUDE_LOGS = "image:<NOM_IMAGE>"
```

De même, pour exclure les métriques :

```shell
DD_CONTAINER_EXCLUDE_METRICS = "image:<NOM_IMAGE>"
```

Sur Kubernetes, pour supprimer tous les conteneurs de pods au sein de l'espace de nommage `<ESPACEDENOMMAGE>` d'Autodiscovery, ajoute la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_CONTAINER_EXCLUDE = "kube_namespace:<ESPACEDENOMMAGE>"
```

{{% /tab %}}
{{% tab "Agent" %}}

Pour supprimer un conteneur Docker donné avec l'image `<NOM_IMAGE>` d'Autodiscovery, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
container_exclude: [image:<NOM_IMAGE>]
```

Pour supprimer un conteneur Docker donné avec le nom `<NOM>` d'Autodiscovery, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
container_exclude: [name:<NOM>]
```

Avec les **versions 7.20+** de l'Agent, vous pouvez également utiliser des règles d'exclusion pour exclure uniquement les logs ou uniquement les métriques. Ainsi, pour exclure les logs d'un conteneur avec l'image `<NOM_IMAGE>`, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
container_exclude_logs: [image:<NOM_IMAGE>]
```

De même, pour exclure les métriques avec l'**Agent v7.20+**:

```shell
container_exclude_metrics: [image:<NOM_IMAGE>]
```

Sur Kubernetes, pour supprimer tous les conteneurs de pods au sein de l'espace de nommage `<ESPACEDENOMMAGE>` d'Autodiscovery, ajoutez le bloc de configuration suivant au [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
container_exclude: [kube_namespace:<ESPACEDENOMMAGE>]
```

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

**Remarque** : si vous utilisez Kubernetes, le conteneur `<NOM>` correspond au `.spec.containers[0].name` dans votre manifeste.

## Inclure des conteneurs

Incluez des conteneurs au périmètre Autodiscovery de l'Agent avec une règle d'inclusion basée sur le paramètre `name` ou `image`. Cela vous permet de recueillir **UNIQUEMENT** les données de ces conteneurs. Si un conteneur correspond à l'expression de la règle d'inclusion, il est toujours inclus au périmètre Autodiscovery.

**Remarque** : les règles d'inclusion prennent en charge les expressions régulières. Celles-ci sont définies sous forme de liste de chaînes séparées par des espaces.

{{< tabs >}}
{{% tab "Agent conteneurisé" %}}

Avec les **versions 7.20+ de l'Agent**, pour inclure un conteneur Docker donné avec l'**image** `<NOM_IMAGE>` d'Autodiscovery, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_CONTAINER_INCLUDE = "image:<NOM_IMAGE>"
```

Avec les **versions <= 7.19+ de l'Agent**, pour inclure un conteneur Docker donné avec l'**image** `<NOM_IMAGE>` d'Autodiscovery, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_AC_INCLUDE = "image:<NOM_IMAGE>"
```

**Remarque** : `DD_AC_INCLUDE` n'est **plus pris en charge depuis les versions 7.20+ de l'Agent**. 

Avec les **versions 7.20+ de l'Agent**, pour inclure un conteneur Docker donné avec le **nom** `<NOM>` d'Autodiscovery, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_CONTAINER_INCLUDE = "name:<NOM>"
```

Par exemple, si vous souhaitez surveiller uniquement les images `ubuntu` ou `debian` et exclure le reste, indiquez ce qui suit :

```shell
DD_CONTAINER_EXCLUDE = "image:.*"
DD_CONTAINER_INCLUDE = "image:ubuntu image:debian"
```

Avec les **versions <= 7.19+ de l'Agent**, pour inclure un conteneur Docker donné avec le **nom** `<NOM_IMAGE>` d'Autodiscovery, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_AC_INCLUDE = "name:<NOM>"
```

Comme auparavant, si vous souhaitez uniquement surveiller les images `ubuntu` ou `debian` et exclure le reste, indiquez ce qui suit :

```shell
DD_AC_EXCLUDE = "image:.*"
DD_AC_INCLUDE = "image:ubuntu image:debian"
```

Avec les **versions 7.20+** de l'Agent, vous pouvez également utiliser des règles d'inclusion pour inclure uniquement les logs ou uniquement les métriques. Ainsi, pour inclure les logs d'un conteneur avec l'image `<NOM_IMAGE>`, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_CONTAINER_INCLUDE_LOGS = "image:<NOM_IMAGE>"
```

De même, pour inclure les métriques :

```shell
DD_CONTAINER_INCLUDE_METRICS = "image:<NOM_IMAGE>"
```

Sur Kubernetes, pour inclure tous les conteneurs de pods au sein de l'espace de nommage `<ESPACEDENOMMAGE>` d'Autodiscovery, ajoute la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_CONTAINER_INCLUDE = "kube_namespace:<ESPACEDENOMMAGE>"
```

{{% /tab %}}
{{% tab "Agent" %}}

Pour inclure un conteneur Docker donné avec l'image `<NOM_IMAGE>` à Autodiscovery, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
container_include: [image:<NOM_IMAGE>]
```

Pour inclure un conteneur Docker donné avec le nom `<NOM>` d'Autodiscovery, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
container_include: [name:<NOM>]
```

Avec les **versions 7.20+** de l'Agent, vous pouvez également utiliser des règles d'inclusion pour inclure uniquement les logs ou uniquement les métriques. Ainsi, pour inclure les logs d'un conteneur avec l'image `<NOM_IMAGE>`, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
container_include_logs: [image:<NOM_IMAGE>]
```

De même, pour inclure les métriques :

```shell
container_include_metrics: [image:<NOM_IMAGE>]
```

Sur Kubernetes, pour inclure tous les conteneurs de pods au sein de l'espace de nommage <ESPACEDENOMMAGE> d'Autodiscovery, ajoutez le bloc de configuration suivant au [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
container_include: [kube_namespace:<ESPACEDENOMMAGE>]
```

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

**Remarque** : si vous utilisez Kubernetes, le conteneur `<NOM>` correspond au `.spec.containers[0].name` dans votre manifeste.

## Comportement d'inclusion et d'exclusion

Les règles d'inclusion sont toujours prioritaires, qu'elles s'appliquent de façon globale ou uniquement aux métriques ou logs.

Vous ne pouvez pas mélanger plusieurs catégories pour vos règles d'inclusion et d'exclusion. Par exemple, pour inclure un conteneur avec le nom d'image `<NOM_IMAGE_1>` et exclure uniquement les métriques d'un conteneur avec le nom d'image `<NOM_IMAGE_2>`, utilisez ce qui suit :

{{< tabs >}}
{{% tab "Agent conteneurisé" %}}
```shell
DD_CONTAINER_INCLUDE_METRICS = "image:<NOM_IMAGE_1>"
DD_CONTAINER_INCLUDE_LOGS = "image:<NOM_IMAGE_1>"
DD_CONTAINER_EXCLUDE_METRICS = "image:<NOM_IMAGE_2>"
```

En effet, `DD_CONTAINER_INCLUDE = "image:<IMAGE_NAME_1>"` ne suffit pas.

{{% /tab %}}
{{% tab "Agent" %}}
```yaml
container_include_metrics: [image:<NOM_IMAGE_1>]
container_include_logs: [image:<NOM_IMAGE_1>]
container_exclude_metrics: [image:<NOM_IMAGE_2>]
```

En effet, `container_include: [image:<IMAGE_NAME_1>]` ne suffit pas.
{{% /tab %}}
{{< /tabs >}}

Les listes globales et sélectives (pour les logs et les métriques) n'interagissent pas entre elles. En d'autres termes, vous pouvez exclure de façon globale un conteneur, puis l'inclure avec `container_include_logs` et `container_include_metrics`.

## Conteneurs pause

L'Agent Datadog exclut par défaut les conteneurs pause Kubernetes et OpenShift. Ils rentrent tout de même dans le calcul du total de conteneurs exclus.

Pour désactiver cette fonctionnalité et inclure les conteneurs pause dans le périmètre Autodiscovery, définissez le paramètre `exclude_pause_container` sur `false` dans le [fichier de configuration `datadog.yaml` de l'Agent][1] ou à l'aide de la variable d'environnement `DD_EXCLUDE_PAUSE_CONTAINER="false"` de l'Agent.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file