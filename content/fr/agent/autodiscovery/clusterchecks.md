---
title: Exécuter des checks de cluster avec Autodiscovery
kind: documentation
further_reading:
  - link: /agent/autodiscovery
    tag: Documentation
    text: Documentation principale sur Autodiscovery
  - link: /agent/autodiscovery/endpointschecks/
    tag: Documentation
    text: Documentation sur les checks d'endpoints
  - link: /agent/kubernetes/cluster/
    tag: Documentation
    text: Documentation sur l'Agent de cluster
---
## Fonctionnement

L'Agent Datadog est capable d'identifier automatiquement vos conteneurs et de créer des configurations de check via [le système Autodiscovery][1]. Les checks de cluster tirent parti de ce mécanisme pour surveiller les charges de travail non conteneurisées, notamment :

- les datastores et les endpoints hors cluster (p. ex. RDS ou CloudSQL)
- les services de cluster à équilibrage de charge (p. ex. les services Kubernetes)

Pour vérifier qu'une seule instance de chaque check s'exécute, [l'Agent de cluster][2] récupère les configurations et les distribue de façon dynamique aux Agents basés sur des nœuds. Les Agents se connectent à l'Agent de cluster toutes les 10 secondes et récupèrent les configurations à exécuter. Si un Agent cesse d'envoyer des informations, l'Agent de cluster le supprime du pool actif et distribue les configurations aux autres Agents. De cette façon, seule une instance s'exécute en permanence, même lorsque des nœuds sont ajoutés ou supprimés du cluster.

Les métriques, les événements et les checks de service recueillis par les checks de cluster sont envoyés sans hostname, car cette information n'est pas utile. Un tag `cluster_name` est ajouté pour vous permettre de filtrer vos données et de les visualiser dans un contexte spécifique.

Cette fonction est actuellement prise en charge sur Kubernetes pour les versions 6.9.0+ de l'Agent et les versions 1.2.0+ de l'Agent de cluster.


## Configuration

### Configuration de l'Agent de cluster

Cette fonction requiert un [Agent de cluster en cours d'exécution avec la fonction Checks de cluster activée][3].

### Configuration de l'Agent

Activez le fournisseur de configuration `clusterchecks` dans l'Agent Datadog exécuté sur le **Host**. Il existe deux façons de le faire :

- En définissant la variable d'environnement `DD_EXTRA_CONFIG_PROVIDERS` :

```
DD_EXTRA_CONFIG_PROVIDERS="clusterchecks"
```

- Ou en l'ajoutant dans le fichier de configuration `datadog.yaml` :

```yaml
config_providers:
  - name: clusterchecks
    polling: true
```

[Redémarrez l'Agent][4] pour prendre en compte le changement de configuration.

### Checks custom

L'exécution de [checks custom de l'Agent][5] en tant que checks de cluster est prise en charge, tant que tous les Agents basés sur des nœuds sont en mesure de les exécuter. Cela signifie que le code de vos checks :

- doit être installé sur tous les Agents basés sur des nœuds où le fournisseur de configuration `clusterchecks` est activé
- ne doit pas dépendre de ressources locales qui ne sont pas accessibles par tous les Agents

## Implémentation des configurations de check

### Configurations statiques dans les fichiers

Lorsque l'IP d'une ressource donnée est fixe (endpoint de service externe, URL publique, etc.), une configuration statique peut être passée à l'Agent de cluster sous la forme d'un fichier yaml. La syntaxe et la convention de nommage des fichiers sont les mêmes que pour les configurations statiques sur les Agents basés sur des nœuds, avec l'ajout de la ligne `cluster_check: true`.

#### Exemple : check MySQL sur une base de données CloudSQL

Après avoir configuré l'instance CloudSQL et [l'utilisateur datadog][6], montez un fichier `/conf.d/mysql.yaml` dans le conteneur de l'Agent de cluster avec le contenu suivant :

```yaml
cluster_check: true
init_config:
instances:
  - server: '<ADRESSE_IP_PRIVÉE>'
    port: 3306
    user: datadog
    pass: '<MOT_DE_PASSE>'
```

Le champ `cluster_check` informera l'Agent de cluster de déléguer ce check à un Agent basé sur un nœud.

### Source du modèle : Annotations de service Kubernetes

Tout comme [l'annotation de pods Kubernetes][7], les services peuvent être annotés avec la syntaxe suivante :

```yaml
  ad.datadoghq.com/service.check_names: '[<NOM_CHECK>]'
  ad.datadoghq.com/service.init_configs: '[<CONFIG_INIT>]'
  ad.datadoghq.com/service.instances: '[<CONFIG_INSTANCE>]'
```

La [template variable][8] `%%host%%` est prise en charge et remplacée par l'IP du service. Les tags `kube_namespace` et `kube_service` sont automatiquement ajoutés à l'instance.

#### Exemple : check HTTP sur un service basé sur nginx

La définition de service suivante expose les pods du déploiement `my-nginx` et exécute un [check HTTP][9] pour mesurer la latence du service à équilibrage de charge :

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-nginx
  labels:
    run: my-nginx
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

Lorsque l'élection de leader est activée, seul le leader distribue les configurations de check de cluster aux Agents basés sur des nœuds. Le nom du leader est disponible dans la ConfigMap `datadog-leader-election` :

```
# kubectl get cm datadog-leader-election -o yaml
apiVersion: v1
kind: ConfigMap
metadata:
  annotations:
    control-plane.alpha.kubernetes.io/leader: '{"holderIdentity":"cluster-agent-rhttz", ...''
```

Dans ce cas, le pod leader est `cluster-agent-rhttz`. S'il est supprimé ou ne répond pas, un autre pod le remplace automatiquement.

### Autodiscovery dans l'Agent de cluster

Pour garantir la récupération d'une configuration (statique ou identifiée automatiquement) par l'Agent de cluster, utilisez la commande `configcheck` dans l'Agent de cluster leader :

```
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

La commande `clusterchecks` permet d'inspecter l'état de la logique de distribution, notamment :

- quels Agents basés sur des nœuds communiquent activement avec l'Agent de cluster
- quels Checks sont distribués sur chaque nœud

```
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

### Autodiscovery dans l'Agent basé sur un nœud

La commande `configcheck` de l'Agent doit afficher l'instance, avec la source `cluster-checks` :

```
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

### Statut de l'Agent

La commande `status` de l'Agent doit indiquer que l'instance de check est en cours d'exécution et envoie correctement des informations.

```
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

[1]: /fr/agent/autodiscovery
[2]: /fr/agent/kubernetes/cluster
[3]: /fr/agent/kubernetes/cluster/#cluster-checks-autodiscovery
[4]: /fr/agent/guide/agent-commands
[5]: /fr/developers/write_agent_check
[6]: /fr/integrations/mysql
[7]: /fr/agent/autodiscovery/?tab=kubernetes#template-source-kubernetes-pod-annotations
[8]: /fr/agent/autodiscovery/?tab=kubernetes#supported-template-variables
[9]: /fr/integrations/http_check
[10]: /fr/integrations/nginx