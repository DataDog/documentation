---
title: Exécuter des checks de cluster avec Autodiscovery
kind: documentation
aliases:
  - /fr/agent/autodiscovery/clusterchecks
further_reading:
  - link: /agent/kubernetes/cluster/
    tag: Documentation
    text: Documentation sur l'Agent de cluster
---
## Présentation

L'Agent Datadog est capable d'identifier automatiquement vos conteneurs et de créer des configurations de check via [le système Autodiscovery][1].

Grâce aux checks de cluster, il est possible d'utiliser ce mécanisme pour surveiller des charges de travail non conteneurisées, y compris les suivantes :

- Datastores et endpoints hors cluster (par exemple, RDS ou CloudSQL).
- Services de cluster à équilibrage de charge (par exemple, les services Kubernetes).

Pour vérifier qu'une seule instance de chaque check s'exécute, [l'Agent de cluster][2] récupère les configurations et les distribue de façon dynamique aux Agents de nœud. Les Agents se connectent à l'Agent de cluster toutes les 10 secondes et récupèrent les configurations à exécuter. Si un Agent cesse d'envoyer des informations, l'Agent de cluster le supprime du pool actif et distribue les configurations aux autres Agents. De cette façon, seule une instance s'exécute en permanence, même lorsque des nœuds sont ajoutés ou supprimés du cluster.

Les métriques, les événements et les checks de service recueillis par les checks de cluster sont envoyés sans hostname, car cette information n'est pas utile. Un tag `cluster_name` est ajouté pour vous permettre de filtrer vos données et de les visualiser dans un contexte spécifique.

Cette fonction est prise en charge par Kubernetes pour les versions 6.9.0 et ultérieures de l'Agent et les versions 1.2.0 et ultérieures de l'Agent de cluster.

## Configurer des checks de cluster

### Agent de cluster

Cette fonction requiert un [Agent de cluster][3] en cours d'exécution.

Ensuite, activez la fonction Check de cluster :

Depuis la version 1.2.0 de l'Agent de cluster Datadog, il est possible d'utiliser le système Autodiscovery sur des ressources de cluster non conteneurisées. Pour activer cette fonction, effectuez les modifications suivantes sur le déploiement de l'Agent de cluster :

1. Définissez `DD_CLUSTER_CHECKS_ENABLED` sur `true`.
2. Transmettez le nom de votre cluster avec `DD_CLUSTER_NAME`. Datadog injecte ce nom sous forme d'un tag d'instance `cluster_name` dans toutes les configurations pour vous permettre de filtrer vos métriques.
3. La durée du bail d'élection conseillée est de 15 secondes. Définissez-la avec la variable d'environnement `DD_LEADER_LEASE_DURATION`.
4. Si le nom du service n'est pas identique à la valeur par défaut `datadog-cluster-agent`, assurez-vous que la variable d'environnement `DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME` tient compte de ce nom de service.

Les deux sources de configuration suivantes sont prises en charge. [Elles sont décrites dans la documentation relative à Autodiscovery][1] :

- Vous pouvez monter les fichiers YAML à partir d'une ConfigMap dans le dossier `/conf.d`. Ils seront automatiquement importés par le point d'entrée de l'image.
- Pour annoter les services Kubernetes, vous devez définir les variables d'environnement `DD_EXTRA_CONFIG_PROVIDERS` et `DD_EXTRA_LISTENERS` sur `kube_services`.

Notez que les hostnames ne sont pas liés aux métriques de checks de cluster, ce qui limite l'utilisation des tags de host et de la variable d'environnement `DD_TAGS`. Pour ajouter des tags aux métriques de checks de cluster, utilisez la variable d'environnement `DD_CLUSTER_CHECKS_EXTRA_TAGS`.

### Agent

Activez le fournisseur de configuration `clusterchecks` dans l'Agent Datadog exécuté sur le **Node**. Pour ce faire, deux solutions s'offrent à vous :

- Vous pouvez définir la variable d'environnement `DD_EXTRA_CONFIG_PROVIDERS`. Si plusieurs valeurs doivent être définies, séparez-les par des espaces dans la chaîne :

    ```text
    DD_EXTRA_CONFIG_PROVIDERS="clusterchecks"
    ```

- Vous pouvez également l'ajouter dans le fichier de configuration `datadog.yaml` :

    ```yaml
    config_providers:
        - name: clusterchecks
          polling: true
    ```

[Redémarrez l'Agent][11] pour prendre en compte le changement de configuration.

**Remarque** : le [chart Helm Datadog][4] offre la possibilité de déployer, via le champ `clusterChecksRunner`, un ensemble d'Agents Datadog configurés pour exécuter des checks de cluster uniquement.

### Checks custom

L'exécution de [checks custom de l'Agent][5] en tant que checks de cluster est prise en charge, tant que tous les Agents de nœud sont en mesure de les exécuter. Cela signifie que le code de vos checks :

- Doit être installé sur tous les Agents de nœud où le fournisseur de configuration `clusterchecks` est activé.
- Ne doit **pas** dépendre de ressources locales qui ne sont pas accessibles par tous les Agents.

### Distribution avancée

L'Agent de cluster peut être configuré pour utiliser une logique de distribution avancée pour les checks de cluster, qui prend en compte le temps d'exécution et les exemples de métriques des instances de check. Cette logique permet à l'Agent de cluster d'optimiser la répartition et la distribution entre les exécuteurs de checks de cluster.

#### Configuration de l'Agent de cluster

En plus des étapes mentionnées dans la section [Configuration de l'Agent de cluster][3], vous devez définir `DD_CLUSTER_CHECKS_ADVANCED_DISPATCHING_ENABLED` sur `true`.

#### Configuration de l'exécuteur de checks de cluster

Les variables d'environnement suivantes sont requises pour configurer les exécuteurs de checks de cluster (ou Agents de nœud) de façon à ce qu'ils exposent les statistiques de leurs checks. Les statistiques sont utilisées par l'Agent de cluster et permettent d'optimiser la logique de distribution des checks.

```
  env:
    - name: DD_CLC_RUNNER_ENABLED
      value: "true"
    - name: DD_CLC_RUNNER_HOST
      valueFrom:
        fieldRef:
          fieldPath: status.podIP
```

## Configuration des checks

### Configuration statique dans un fichier

Lorsque l'IP d'une ressource donnée est fixe (endpoint de service externe, URL publique, etc.), une configuration statique peut être passée à l'Agent de cluster sous la forme d'un fichier YAML. La syntaxe et la convention de nommage des fichiers sont les mêmes que pour les configurations statiques sur les Agents de nœud, avec l'ajout de la ligne `cluster_check: true`.

#### Check MySQL sur une base de données CloudSQL

Après avoir configuré une instance CloudSQL et un [utilisateur Datadog][6], montez un fichier `/conf.d/mysql.yaml` dans le conteneur de l'Agent de cluster avec le contenu suivant :

```yaml
cluster_check: true
init_config:
instances:
    - server: '<ADRESSE_IP_PRIVÉE>'
      port: 3306
      user: datadog
      pass: '<MOT_DE_PASSE>'
```

Le champ `cluster_check` informe l'Agent de cluster qu'il doit déléguer ce check à un Agent de nœud.

### Source du modèle : annotations de service Kubernetes

Vous pouvez annoter des services avec la syntaxe suivante, similaire à celle utilisée pour l'[annotation de pods Kubernetes][1] :

```yaml
ad.datadoghq.com/service.check_names: '[<NOM_INTÉGRATION>]'
ad.datadoghq.com/service.init_configs: '[<CONFIG_INIT>]'
ad.datadoghq.com/service.instances: '[<CONFIG_INSTANCE>]'
```

La [template variable][7] `%%host%%` est prise en charge et remplacée par l'IP du service. Les tags `kube_namespace` et `kube_service` sont automatiquement ajoutés à l'instance.

### Source du modèle : étiquettes standard

```yaml
tags.datadoghq.com/env: "<ENV>"
tags.datadoghq.com/service: "<SERVICE>"
tags.datadoghq.com/version: "<VERSION>"
```

Les étiquettes `tags.datadoghq.com` définissent `env`, `service` et même `version` en tant que tags sur les données générées par le check.
Ces étiquettes standard font partie du [tagging de service unifié][8].

#### Exemple : check HTTP sur un service basé sur NGINX

La définition de service suivante expose les pods du déploiement `my-nginx` et exécute un [check HTTP][9] pour mesurer la latence du service à équilibrage de charge :

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

De plus, chaque pod doit être surveillé avec le [check NGINX][10] pour permettre la surveillance de chaque worker ainsi que du service agrégé.

## Dépannage

Les checks de cluster étant distribués par nature, leur dépannage est un peu plus complexe. Les sections suivantes décrivent le processus de distribution et les commandes de dépannage associées.

### Kubernetes : trouver l'Agent de cluster leader

Lorsque l'élection de leader est activée, seul le leader distribue les configurations de check de cluster aux Agents de nœud. Le nom du leader est disponible dans la ConfigMap `datadog-leader-election` :

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
# kubectl exec <NOM_POD_AGENT_CLUSTER> agent clusterchecks

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
- cluster_name:ccheck_testing
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
===
```

**Remarque** : l'ID d'instance est différent de celui de la commande `configcheck`, car l'instance est modifiée pour ajouter des tags et des options.

Dans le cas présent, cette configuration est distribuée au nœud `default-pool-bce5cd34-ttw6`. Le dépannage peut continuer à partir de là.

### Autodiscovery dans l'Agent de nœud

La commande `configcheck` de l'Agent doit afficher l'instance, avec la source `cluster-checks` :

```text
# kubectl exec <NOM_POD_AGENT_NOEUD> agent configcheck
...
=== http_check check ===
Source: cluster-checks
Instance ID: http_check:My service:5b948dee172af830
empty_default_hostname: true
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
- cluster_name:ccheck_testing
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
===
```

L'ID d'instance correspond à l'ID précédent.

### Commande status de l'Agent

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
[3]: /fr/agent/cluster_agent/setup/
[4]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog
[5]: /fr/developers/write_agent_check/
[6]: /fr/integrations/mysql/
[7]: /fr/agent/faq/template_variables/
[8]: /fr/getting_started/tagging/unified_service_tagging
[9]: /fr/integrations/http_check/
[10]: /fr/integrations/nginx/