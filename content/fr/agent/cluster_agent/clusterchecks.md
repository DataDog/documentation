---
aliases:
- /fr/agent/autodiscovery/clusterchecks
further_reading:
- link: /agent/kubernetes/cluster/
  tag: Documentation
  text: Documentation sur l'Agent de cluster
kind: documentation
title: Exécuter des checks de cluster avec Autodiscovery
---

## Présentation

L'Agent Datadog peut découvrir automatiquement vos conteneurs et créer des configurations de check basées sur ces workloads via [le mécanisme Autodiscovery][1].

Grâce aux checks de cluster, il est possible d'utiliser ce mécanisme pour surveiller des workloads non conteneurisés, notamment :

- Des datastores et des endpoints exécutés en dehors de votre cluster (par exemple, RDS ou CloudSQL)
- Des services de cluster à équilibrage de charge (par exemple, les services Kubernetes)

Cette approche permet de vérifier qu'**une seule** instance de chaque check s'exécute, et ainsi d'éviter que **chaque** pod d'Agent de nœud exécute le check en question. L'[Agent de cluster][2] récupère les configurations et les distribue de façon dynamique aux Agents de nœud. Les Agents se connectent à l'Agent de cluster toutes les 10 secondes et récupèrent les configurations à exécuter. Si un Agent cesse d'envoyer des informations, l'Agent de cluster le supprime du pool actif et distribue les configurations aux autres Agents. De cette façon, seule une instance s'exécute en permanence, même lorsque des nœuds sont ajoutés ou supprimés du cluster.

Les métriques, les événements et les checks de service recueillis par les checks de cluster sont envoyés sans hostname, car cette information n'est pas utile. Un tag `cluster_name` est ajouté pour vous permettre de filtrer vos données et de les visualiser dans un contexte spécifique.

Vous pouvez adopter cette approche si votre infrastructure est configurée de façon à être hautement disponible.

## Configurer la distribution des checks de cluster
Pour configurer la distribution des checks de cluster, vous devez d'abord activer la fonction de distribution de l'Agent de cluster, puis vérifier que les Agents sont prêts de recevoir les configurations provenant du fournisseur `clusterchecks`. Les configurations peuvent alors être transmises à l'Agent de cluster via les fichiers de configuration montés ou les annotations de service Kubernetes.

{{< tabs >}}
{{% tab "Helm" %}}
La distribution des checks de cluster est activée par défaut dans le déploiement Helm de l'Agent de cluster, via la clé de configuration `datadog.clusterChecks.enabled` :
```yaml
datadog:
  clusterChecks:
    enabled: true
  # (...)
clusterAgent:
  enabled: true
  # (...)
```

L'Agent de cluster peut ainsi gérer les checks de cluster et traiter les configurations fournies par les annotations de service Kubernetes (`kube_services`).
{{% /tab %}}
{{% tab "Operator" %}}
Pour activer la distribution des checks de cluster dans le déploiement de l'Operator de l'Agent de cluster, utilisez la clé de configuration `clusterAgent.config.clusterChecksEnabled` :
```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  # (...)
  clusterAgent:
    config:
      clusterChecksEnabled: true
```

L'Agent de cluster peut ainsi gérer les checks de cluster et traiter les configurations fournies par les annotations de service Kubernetes (`kube_services`).

{{% /tab %}}
{{% tab "DaemonSet" %}}
### Agent de cluster

Pour bénéficier de cette fonctionnalité, vous devez exécuter l'[Agent de cluster][1]. Une fois l'Agent de cluster exécuté, apportez les modifications suivantes à son déploiement :

1. Définissez la variable d'environnement `DD_CLUSTER_CHECKS_ENABLED` sur `true`.
2. Transmettez le nom de votre cluster avec `DD_CLUSTER_NAME`. Datadog injecte ce nom sous forme d'un tag d'instance `cluster_name` dans toutes les configurations pour vous permettre de filtrer vos métriques.
3. Si le nom du service n'est pas identique à la valeur par défaut `datadog-cluster-agent`, assurez-vous que la variable d'environnement `DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME` tient compte de ce nom de service.
4. Pour que l'Agent de cluster puisse traiter les configurations fournies par les annotations de service Kubernetes, définissez les **deux** variables d'environnement `DD_EXTRA_CONFIG_PROVIDERS` et `DD_EXTRA_LISTENERS` sur `kube_services`.

### Agent

Activez le fournisseur de configuration `clusterchecks` dans l'Agent Datadog exécuté sur le **Node**. Pour ce faire, deux solutions s'offrent à vous :

- **Recommandé** : vous pouvez définir la variable d'environnement `DD_EXTRA_CONFIG_PROVIDERS` dans le DaemonSet de votre Agent. Si plusieurs valeurs doivent être définies, séparez-les par des espaces dans la chaîne :

    ```text
    DD_EXTRA_CONFIG_PROVIDERS="clusterchecks"
    ```

- Vous pouvez également l'ajouter dans le fichier de configuration `datadog.yaml` :

    ```yaml
    config_providers:
        - name: clusterchecks
          polling: true
    ```

[1]: /fr/agent/cluster_agent/setup/
{{% /tab %}}
{{< /tabs >}}


**Remarque** : avec les checks de cluster, les métriques transmises par l'Agent ne sont pas associées à un hostname. En effet, elles servent à fournir des informations sur un cluster, et non sur un host. Ainsi, ces métriques n'héritent d'aucun tag associé au host concerné, même ceux généralement fournis par un fournisseur cloud ou ajoutés par la variable d'environnement `DD_TAGS` de l'Agent. Pour ajouter des tags à des métriques de check de cluster, utilisez la variable d'environnement `DD_CLUSTER_CHECKS_EXTRA_TAGS`.

Le [chart Helm Datadog][3] et l'[Operator Datadog][4] vous permettent également de déployer des exécuteurs de checks de cluster. Cet ensemble limité d'Agents Datadog est spécifiquement configuré de façon à exécuter uniquement les checks de cluster distribués. Ils permettent d'éviter la distribution des checks aux Agents de nœud.

### Distribution avancée

L'Agent de cluster peut être configuré pour utiliser une logique de distribution avancée pour les checks de cluster, qui prend en compte le temps d'exécution et les exemples de métriques des instances de check. Cette logique permet à l'Agent de cluster d'optimiser la répartition et la distribution entre les exécuteurs de checks de cluster.

#### Configuration de l'Agent de cluster

En plus des étapes indiquées dans la section relative à la configuration de l'Agent de cluster, vous devez définir la variable d'environnement `DD_CLUSTER_CHECKS_ADVANCED_DISPATCHING_ENABLED` sur `true`.

#### Configuration de l'Agent

Les variables d'environnement suivantes sont requises pour configurer les Agents de nœud (ou les exécuteurs de checks de cluster) de façon à ce qu'ils exposent les statistiques de leurs checks. Les statistiques sont utilisées par l'Agent de cluster et permettent d'optimiser la logique de distribution des checks de cluster.

```yaml
  env:
    - name: DD_CLC_RUNNER_ENABLED
      value: "true"
    - name: DD_CLC_RUNNER_HOST
      valueFrom:
        fieldRef:
          fieldPath: status.podIP
```
### Checks custom
L'exécution de [checks custom de l'Agent][5] en tant que checks de cluster est prise en charge, tant que tous les Agents de nœud sont en mesure de les exécuter. Cela signifie que le code de vos checks custom :

- doit être installé sur tous les Agents de nœud où le fournisseur de configuration `clusterchecks` est activé ;
- ne doit **pas** dépendre de ressources locales qui ne sont pas accessibles par tous les Agents.

## Configuration des checks

### Configuration à partir de fichiers de configuration statiques
Lorsque l'URL ou l'IP d'une ressource donnée est fixe (par exemple, un endpoint de service externe ou une URL publique), une configuration statique peut être passée à l'Agent de cluster sous la forme de fichiers YAML. La syntaxe et la convention de nommage des fichiers sont identiques à celles des configurations statiques sur les Agents de nœud. Vous devez toutefois **impérativement** ajouter la ligne `cluster_check: true`.

{{< tabs >}}
{{% tab "Helm" %}}
Pour Helm, ces fichiers de configuration peuvent être créés au sein de la section `clusterAgent.confd`. **Remarque** : ne confondez pas cette section avec la section `datadog.confd` où les fichiers sont créés dans les Agents de nœud. Remplacez le placeholder `<NOM_INTÉGRATION>` par le nom précis du check d'intégration que vous souhaitez exécuter.

```yaml
#(...)
clusterAgent:
  confd:
    <NOM_INTÉGRATION>.yaml: |-
      cluster_check: true
      init_config:
        - <CONFIG_INIT>
      instances:
        - <CONFIG_INSTANCES>
```
{{% /tab %}}
{{% tab "Daemonset" %}}
Pour cette approche manuelle, vous devez créer une `ConfigMap` afin de stocker les fichiers de configuration statiques de votre choix, puis la monter sur le fichier `/conf.d` correspondant du conteneur de l'Agent de cluster. Il s'agit de la même logique que pour le [montage de ConfigMaps sur l'Agent de conteneur][1]. Exemple :

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: "<NOM>-config-map"
data:
  <NOM_INTÉGRATION>-config: |-
    cluster_check: true
    init_config:
      <CONFIG_INIT>
    instances:
      <CONFIG_INSTANCES>
```

Définissez ensuite dans le manifeste du déploiement de l'Agent de cluster les paramètres `volumeMounts` et `volumes` s'appliquant à votre `ConfigMap`, ainsi que la clé correspondant à vos données.

```yaml
        volumeMounts:
          - name: <NOM>-config-map
            mountPath: /conf.d/
            # (...)
      volumes:
        - name: <NOM>-config-map
          configMap:
            name: <NOM>-config-map
            items:
              - key: <NOM_INTÉGRATION>-config
                path: <NOM_INTÉGRATION>.yaml
          #(...)
```
Cela entraîne la création d'un fichier dans le répertoire `/conf.d/` de l'Agent de cluster correspondant à l'intégration. Exemples : `/conf.d/mysql.yaml` ou `/conf.d/http_check.yaml`.


[1]: /fr/agent/kubernetes/integrations/?tab=configmap#configuration
{{% /tab %}}
{{< /tabs >}}

#### Exemple : check MySQL sur une base de données hébergée en externe

Configure une base de données hébergée en externe, comme CloudSQL ou RDS, ainsi qu'un [utilisateur Datadog][6] pouvant y accéder. Montez ensuite un fichier `/conf.d/mysql.yaml` dans le conteneur de l'Agent de cluster avec le contenu suivant :

```yaml
cluster_check: true
init_config:
instances:
    - server: "<ADRESSE_IP_PRIVÉE>"
      port: 3306
      user: datadog
      pass: "<VOTRE_MOT_DE_PASSE>"
```

#### Exemple : check HTTP sur une URL externe

Si vous souhaitez exécuter une fois par cluster un [check HTTP][7] sur une URL, montez un fichier `/conf.d/http_check.yaml` dans le conteneur de l'Agent de cluster avec le contenu suivant :

```yaml
cluster_check: true
init_config:
instances:
    - name: "<NOM_EXEMPLE>"
      url: "<URL_EXEMPLE>"
```

### Configuration à partir d'annotations de service Kubernetes

Vous pouvez annoter des services avec la syntaxe suivante, similaire à celle utilisée pour l'[annotation de pods Kubernetes][1] :

```yaml
ad.datadoghq.com/service.check_names: '[<NOM_INTÉGRATION>]'
ad.datadoghq.com/service.init_configs: '[<CONFIG_INIT>]'
ad.datadoghq.com/service.instances: '[<CONFIG_INSTANCE>]'
```

La [template variable][8] `%%host%%` est prise en charge et remplacée par l'IP du service. Les tags `kube_namespace` et `kube_service` sont automatiquement ajoutés à l'instance.

#### Exemple : check HTTP sur un service basé sur NGINX

La définition de service suivante expose les pods du déploiement `my-nginx` et exécute un [check HTTP][7] pour mesurer la latence du service à équilibrage de charge :

```yaml
apiVersion: v1
kind: Service
metadata:
    name: my-nginx
    labels:
        run: my-nginx
        tags.datadoghq.com/env: "prod"
        tags.datadoghq.com/service: "my-nginx"
        tags.datadoghq.com/version: "1.19.0"
    annotations:
        ad.datadoghq.com/service.check_names: '["http_check"]'
        ad.datadoghq.com/service.init_configs: '[{}]'
        ad.datadoghq.com/service.instances: |
            [
              {
                "name": "My Nginx",
                "url": "http://%%host%%",
                "timeout": 1
              }
            ]
spec:
    ports:
        - port: 80
          protocol: TCP
    selector:
        run: my-nginx
```

De plus, chaque pod doit être surveillé avec le [check NGINX][9] pour permettre la surveillance de chaque worker ainsi que du service agrégé.

## Dépannage

Les checks de cluster étant distribués par nature, leur dépannage est un peu plus complexe. Les sections suivantes décrivent le processus de distribution et les commandes de dépannage associées.

### Kubernetes : trouver l'Agent de cluster leader

Lorsque l'élection de leader est activée, seul le leader distribue les configurations de check de cluster aux Agents de nœud. Si un seul réplica du pod de l'Agent de cluster est exécuté, il s'agit du leader. Si vous exécutez plusieurs réplicas, vous pouvez identifier le nom du leader dans la `ConfigMap` de `datadog-leader-election` :

```yaml
# kubectl get cm datadog-leader-election -o yaml
apiVersion: v1
kind: ConfigMap
metadata:
  annotations:
    control-plane.alpha.kubernetes.io/leader: '{"holderIdentity":"cluster-agent-rhttz", ...''
```

Ici, le pod leader est `cluster-agent-rhttz`. S'il est supprimé ou ne répond pas, un autre pod le remplace automatiquement.

### Autodiscovery dans l'Agent de cluster

Pour garantir la récupération d'une configuration (statique ou identifiée avec Autodiscovery) par l'Agent de cluster, utilisez la commande `configcheck` dans l'Agent de cluster leader :

```text
# kubectl exec <NOM_POD_AGENT_CLUSTER> agent configcheck
...
=== http_check cluster check ===
Source: kubernetes-services
Instance ID: http_check:My service:6e5f4b16b4b433cc
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
Auto-discovery IDs:
* kube_service://751adfe4-1280-11e9-a26b-42010a9c00c8
===
```

### Logique de distribution dans l'Agent de cluster

La commande `clusterchecks` vous permet d'inspecter l'état de la logique de distribution, notamment :

- les Agents de nœud qui communiquent activement avec l'Agent de cluster ; et
- les checks qui sont distribués sur chaque nœud.

```text
# kubectl exec <NOM_POD_CLUSTER_AGENT> agent clusterchecks

=== 3 node-agents reporting ===
Name                                            Running checks
default-pool-bce5cd34-7g24.c.sandbox.internal   0
default-pool-bce5cd34-slx3.c.sandbox.internal   2
default-pool-bce5cd34-ttw6.c.sandbox.internal   1
...

===== Checks on default-pool-bce5cd34-ttw6.c.sandbox.internal =====

=== http_check check ===
Source: kubernetes-services
Instance ID: http_check:My service:5b948dee172af830
empty_default_hostname: true
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
- cluster_name:example
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
===
```

**Remarque** : l'ID d'instance est différent de celui de la commande `configcheck`, car l'instance est modifiée pour ajouter des tags et des options.

Dans le cas présent, cette configuration est distribuée au nœud `default-pool-bce5cd34-ttw6`. Le dépannage du pod de l'Agent se poursuit sur le nœud correspondant.

### Autodiscovery dans l'Agent de nœud

La commande `configcheck` de l'Agent doit afficher l'instance, avec la source `cluster-checks` :

```text
# kubectl exec <NOM_POD_AGENT_NŒUD> agent configcheck
...
=== http_check check ===
Source: cluster-checks
Instance ID: http_check:My service:5b948dee172af830
empty_default_hostname: true
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
- cluster_name:example
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
===
```

L'ID d'instance correspond à l'ID précédent.

### Agent status

La commande `status` de l'Agent devrait indiquer que l'instance de check est en cours d'exécution et qu'elle envoie correctement des informations.

```text
# kubectl exec <NOM_POD_AGENT_NOEUD> agent status
...
    http_check (3.1.1)
    ------------------
      Instance ID: http_check:My service:5b948dee172af830 [OK]
      Total Runs: 234
      Metric Samples: Last Run: 3, Total: 702
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 234
      Average Execution Time : 90ms
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/kubernetes/integrations/
[2]: /fr/agent/cluster_agent/
[3]: /fr/agent/cluster_agent/clusterchecksrunner?tab=helm
[4]: /fr/agent/cluster_agent/clusterchecksrunner?tab=operator
[5]: /fr/developers/custom_checks/write_agent_check/
[6]: /fr/integrations/mysql/
[7]: /fr/integrations/http_check/
[8]: /fr/agent/faq/template_variables/
[9]: /fr/integrations/nginx/