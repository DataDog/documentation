---
further_reading:
- link: /agent/versions/upgrade_to_agent_v7/
  tag: Documentation
  text: Upgrade vers l'Agent v7
title: Gestion des versions de Python
---

Si vous utilisez la version 6 de l'Agent, Datadog vous conseiller de [passer à la version 7][1]. Cette version est la seule à prendre en charge Python 3.

Il est toutefois possible que vous ayez besoin de continuer àutiliser la version 6 de l'Agent tout en passant à Python 3. Depuis la version 6.14.0, l'Agent v6 intègre les runtimes Python 2 et Python 3. En d'autres termes, les checks de l'Agent peuvent être exécutés aussi bien avec Python 2 que Python 3, en fonction de la configuration de l'Agent.

## Utiliser Python 3 avec l'Agent v6 de Datadog

La version 6 de l'Agent utilise par défaut le runtime Python 2. Suivez les instructions ci-dessous pour configurer l'Agent v6 afin d'utiliser le runtime Python 3 :

- [Agent de host](#agent-de-host)
- [Agent de conteneur](#agent-de-conteneur)
  - [Helm](?tab=helm#agent-de-conteneur)
  - [Operator Datadog](?tab=operatordatadog#agent-de-conteneur)
  - [DaemonSet](?tab=daemonset#agent-de-conteneur)
- [Outils de déploiement](#outils-de-deploiement)
  - [Chef](?tab=chef#outils-de-deploiement)
  - [Puppet](?tab=puppet#outils-de-deploiement)
  - [Ansible](?tab=ansible#outils-de-deploiement)

Cette configuration n'est pas compatible avec l'extension VM Azure.

### Agent de host

1. Définissez l'option de configuration `python_version` dans votre fichier de configuration [`datadog.yaml` ][2] :

    ```yaml
    python_version: 3
    ```

2. [Redémarrez l'Agent][3].

Vous pouvez définir la variable d'environnement `DD_PYTHON_VERSION` sur `2` ou `3` pour spécifier le runtime Python à utiliser. Les variables d'environnement sont prioritaires sur les options de configuration du fichier `datadog.yaml`. Ainsi, si vous définissez la variable d'environnement `DD_PYTHON_VERSION`, l'option `python_version` du fichier `datadog.yaml` est ignorée.

Il s'agit d'une option de configuration au niveau de l'Agent. **Tous les checks Python lancés par un Agent utilisent le même runtime Python**.


### Agent de conteneur

Datadog fournit des images de conteneur d'Agent pour Python 2 et 3.

* Les images dont le tag commence par `6.`, par exemple `6.34.0` ou `6.34.0-jmx`, intègrent le runtime Python 2.
* Les images dont le tag commence par `7.`, par exemple `7.34.0` ou `7.34.0-jmx`, intègrent le runtime Python 2.

Pour passer de Python 2 à Python 3, modifiez le tag de l'image servant à déployer l'Agent.

{{< tabs >}}
{{% tab "Helm" %}}
Par défaut, le [chart Helm Datadog][1] utilise l'image de l'Agent 7, qui intègre le runtime Python 3.

Pour que l'Agent Datadog reste à jour, supprimez dans votre fichier `values.yaml` toutes les informations sous les sections `agent.image` et `clusterChecksRunner.image`.

Pour utiliser un registre de conteneur spécifique, définissez-le avec les options `agent.image.repository` et `clusterChecksRunner.image.repository`. Assurez-vous que les options `agents.image.tag` et `clusterChecksRunner.image.tag` ne sont pas définies.

Par défaut, le registre `gcr.io/datadoghq/agent` est utilisé.

```yaml
agent:
  image:
    repository: public.ecr.aws/datadog/agent

clusterChecksRunner:
  image:
    repository: public.ecr.aws/datadog/agent
```

Pour spécifier une version spécifique de l'Agent, définissez `agents.image.tag` et `clusterChecksRunner.image.tag`. Toutes les images dont le tag commence par `7.*` intègrent le runtime Python 3.

```yaml
agent:
  image:
    tag: 7.34.0

clusterChecksRunner:
  image:
    tag: 7.34.0
````

Vous pouvez utiliser simultanément ces deux options.

```yaml
agent:
  image:
    repository: public.ecr.aws/datadog/agent
    tag: 7.34.0

clusterChecksRunner:
  image:
    repository: public.ecr.aws/datadog/agent
    tag: 7.34.0
```

[1]:https://artifacthub.io/packages/helm/datadog/datadog/

{{% /tab %}}
{{% tab "Operator Datadog" %}}
Par défaut, l'[Operator Datadog][1] utilise l'image `agent:7.*.*`, qui intègre le runtime Python 3.

Si les informations de l'image ne sont pas indiquées dans la ressource `DatadogAgent`, l'Operator déploie une image de l'Agent Datadog compatible avec Python 3.

Si vous avez précédemment imposé la version d'une image :

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  override:
    clusterChecksRunner:
      image:
        tag: 6.33.0
    nodeAgent:
      image:
        tag: 6.33.0
```

Ou si vous utilisez `image.name` :

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <CLÉ_API_DATADOG>
      appKey: <CLÉ_APPLICATION_DATADOG>
  override:
    # ...
    nodeAgent:
      image:
        name: gcr.io/datadoghq/agent:6.33.0
    # ...
    clusterChecksRunner:
      image:
        name: gcr.io/datadoghq/agent:6.33.0
```

Utilisez l'option `spec.global.registry` pour modifier le registre par défaut. Par défaut, le registre `gcr.io/datadoghq/agent` est utilisé.

Imposez ensuite le tag de l'image de l'Agent 7 dans `spec.override.nodeAgent.image.tag`.

Si vous avez activé le déploiement d'exécuteurs de checks de cluster, imposez également le tag de l'image de l'Agent 7 dans `spec.override.clusterChecksRunner.image.tag`.

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  # ...
  global:
    registry: public.ecr.aws/datadog
  override:
    # ...
    nodeAgent:
      image:
        tag: 7.33.0
    # ...
    clusterChecksRunner:
      image:
        tag: 7.33.0
```

**Remarque** : Datadog vous recommande de ne pas définir `*.image.tag`. Laissez plutôt l'Operator Datadog mettre automatiquement à jour le tag pour une image de l'Agent 7. 

Si vous devez utiliser une image JMX de l'Agent, vous pouvez la définir sans utiliser `*.image.tag` pour l'Agent :

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  # ...
  global:
    registry: public.ecr.aws/datadog
  override:
    # ...
    nodeAgent:
      image:
        jmxEnabled: true
    clusterChecksRunner:
      image:
        jmxEnabled: true
```

[1]: https://github.com/DataDog/datadog-operator
{{% /tab %}}
{{% tab "DaemonSet" %}}

Dans votre manifeste DaemonSet, modifiez le tag de l'image dans la définition de chaque conteneur :

* Chaque valeur `spec.template.spec.containers[*].image`
* Chaque valeur `spec.template.spec.initContainers[*].image`

Par exemple, si votre ancienne image a pour valeur `gcr.io/datadoghq/agent:6.33.0`, remplacez-la par `gcr.io/datadoghq/agent:7.33.0`.

**Avant** :

```yaml
apiVersion: apps/v1
spec:
  template:
    spec:
      containers:
      - name: agent
        image: gcr.io/datadoghq/agent:6.33.0
        # ...

```

**Après** :

```yaml
apiVersion: apps/v1
spec:
  template:
    spec:
      containers:
      - name: agent
        image: gcr.io/datadoghq/agent:7.33.0
        # ...
```

{{% /tab %}}
{{< /tabs >}}

### Outils de déploiement

{{< tabs >}}
{{% tab "Chef" %}}

Utilisez le champ `extra_config` pour définir le champ `python_version` sur `3` :

```
default_attributes(
   'datadog' => {
     'extra_config' => {
       'python_version' => '3'
     }
   }
 )
```

{{% /tab %}}
{{% tab "Puppet" %}}

Utilisez le champ `agent_extra_config` pour définir le champ `python_version` sur `3` :

```
class { "datadog_agent":
    agent_extra_options => {
        python_version => 3,
    },
}
```

{{% /tab %}}
{{% tab "Ansible" %}}

Définissez `python_version` sur `3` dans votre `datadog_config` :
```
datadog_config:
  python_version: 3
```

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/versions/upgrade_to_agent_v7/?tab=linux
[2]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[3]: /fr/agent/guide/agent-commands/#restart-the-agent