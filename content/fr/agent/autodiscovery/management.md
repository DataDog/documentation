---
title: Gestion de la découverte de conteneurs
kind: documentation
further_reading:
  - link: /agent/autodiscovery/integrations
    tag: Documentation
    text: Créer et charger un modèle d'intégration Autodiscovery
  - link: /agent/autodiscovery/ad_identifiers
    tag: Documentation
    text: Associer un conteneur au modèle d'intégration correspondant
---
Par défaut, l'Agent Datadog découvre automatiquement tous les conteneurs disponibles. Pour restreindre son périmètre de découverte et limiter la collecte de données uniquement à un sous-ensemble de conteneurs, utilisez une configuration dédiée pour inclure ou exclure des conteneurs.

**Remarque** : ces paramètres n'ont aucun effet sur les métriques `docker.containers.running`, `.stopped`, `.running.total` et `.stopped.total`, qui prennent toujours en compte l'ensemble des conteneurs. Cela n'a aucune incidence sur le nombre de conteneurs facturés.

Si vous exécutez l'Agent en tant que binaire sur un host, configurez votre périmètre Autodiscovery avec les instructions de l'onglet [Agent](?tab=agent). Si vous exécutez l'Agent en tant que conteneur, configurez votre périmètre Autodiscovery avec les instructions de l'onglet [Agent conteneurisé](?tab=Agent-conteneurise).

## Exclure des conteneurs

Excluez des conteneurs du périmètre Autodiscovery de l'Agent avec une règle d'exclusion basée sur leur paramètre `name` ou `image`. Cela vous permet de ne recueillir **AUCUNE DONNÉE** de ces conteneurs. Si un conteneur correspond à l'expression de la règle d'exclusion, il n'est pas inclus, à moins qu'il ne corresponde d'abord à l'expression de la règle d'inclusion.

**Remarque** : les règles d'exclusion prennent en charge les expressions régulières et sont définies sous forme de liste de chaînes séparées par des virgules.

{{< tabs >}}
{{% tab "Agent" %}}

Pour supprimer un conteneur Docker donné avec l'image `<NOM_IMAGE>` d'Autodiscovery, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
ac_exclude: [image:<NOM_IMAGE>]
```

Pour supprimer un conteneur Docker donné avec le nom `<NOM>` d'Autodiscovery, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
ac_exclude: [name:<NOM>]
```

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Agent conteneurisé" %}}

Pour supprimer un conteneur Docker donné avec l'image `<NOM_IMAGE>` d'Autodiscovery, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_AC_EXCLUDE = "image:<NOM_IMAGE>"
```

Pour supprimer un conteneur Docker donné avec le nom `<NOM>` d'Autodiscovery, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_AC_EXCLUDE = "name:<NOM>"
```

Par exemple, utilisez cette règle d'exclusion pour exclure le conteneur de l'Agent :

```shell
DD_AC_EXCLUDE = "name:dd-agent"
```

Dans l'exemple suivant, la configuration indique à l'Agent d'ignorer certains conteneurs de Docker Cloud :

```shell
DD_AC_EXCLUDE = "image:dockercloud/network-daemon image:dockercloud/cleanup image:dockercloud/logrotate image:dockercloud/events image:dockercloud/ntpd"
```

Vous pouvez également utiliser une expression régulière pour tout ignorer : `DD_AC_EXCLUDE = "image:dockercloud/*"`.

{{% /tab %}}
{{< /tabs >}}

**Remarque** : si vous utilisez Kubernetes, le conteneur `<NOM>` correspond au `.spec.containers[0].name` dans votre manifeste.

## Inclure des conteneurs

Incluez des conteneurs au périmètre Autodiscovery de l'Agent avec une règle d'inclusion basée sur le paramètre `name` ou `image`. Cela vous permet de recueillir **UNIQUEMENT** les données de ces conteneurs. Si un conteneur correspond à l'expression de la règle d'inclusion, il est toujours inclus au périmètre Autodiscovery.

**Remarque** : les règles d'inclusion prennent en charge les expressions régulières et sont définies sous forme de liste de chaînes séparées par des virgules.

{{< tabs >}}
{{% tab "Agent" %}}

Pour inclure un conteneur Docker donné avec l'image `<NOM_IMAGE>` d'Autodiscovery, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
ac_include: [image:<NOM_IMAGE>]
```

Pour inclure un conteneur Docker donné avec le nom `<NOM>` d'Autodiscovery, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
ac_include: [name:<NOM>]
```

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Agent conteneurisé" %}}

Pour inclure un conteneur Docker donné avec l'image `<NOM_IMAGE>` d'Autodiscovery, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_AC_INCLUDE = "image:<NOM_IMAGE>"
```

Pour inclure un conteneur Docker donné avec le nom `<NOM>` d'Autodiscovery, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_AC_INCLUDE = "name:<NOM>"
```

Par exemple, si vous souhaitez surveiller uniquement les images `ubuntu` ou `debian` et exclure le reste, indiquez ce qui suit :

```
DD_AC_EXCLUDE = "image:.*"
DD_AC_INCLUDE = "image:ubuntu image:debian"
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : si vous utilisez Kubernetes, le conteneur `<NOM>` correspond au `.spec.containers[0].name` dans votre manifeste.

### Conteneurs pause

L'Agent Datadog exclut par défaut les conteneurs pause Kubernetes et OpenShift. Ils rentrent tout de même dans le calcul du total de conteneurs exclus.

Pour désactiver cette fonctionnalité et inclure les conteneurs pause dans le périmètre Autodiscovery, définissez le paramètre `exclude_pause_container` sur `false` dans le [fichier de configuration `datadog.yaml` de l'Agent][1] ou à l'aide de la variable d'environnement `DD_EXCLUDE_PAUSE_CONTAINER="false"` de l'Agent.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file