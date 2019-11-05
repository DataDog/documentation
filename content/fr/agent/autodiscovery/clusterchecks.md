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

Pour vérifier qu'une seule instance de chaque check s'exécute, [l'Agent de cluster][2] récupère les configurations et les distribue de façon dynamique aux Agents de nœud. Les Agents se connectent à l'Agent de cluster toutes les 10 secondes et récupèrent les configurations à exécuter. Si un Agent cesse d'envoyer des informations, l'Agent de cluster le supprime du pool actif et distribue les configurations aux autres Agents. De cette façon, seule une instance s'exécute en permanence, même lorsque des nœuds sont ajoutés ou supprimés du cluster.

Les métriques, les événements et les checks de service recueillis par les checks de cluster sont envoyés sans hostname, car cette information n'est pas utile. Un tag `cluster_name` est ajouté pour vous permettre de filtrer vos données et de les visualiser dans un contexte spécifique.

Cette fonction est actuellement prise en charge sur Kubernetes pour les versions 6.9.0+ de l'Agent et les versions 1.2.0+ de l'Agent de cluster.


## Configuration

### Configuration de l'Agent de cluster

Cette fonction requiert un [Agent de cluster][3] en cours d'exécution.

Ensuite, activez la fonction Check de cluster :

Depuis la version 1.2.0 de l'Agent de cluster Datadog, il est possible d'utiliser le système Autodiscovery sur des ressources de cluster non conteneurisées. Pour activer cette fonction, effectuez les modifications suivantes sur le déploiement de l'Agent de cluster :

1. Définissez `DD_CLUSTER_CHECKS_ENABLED` sur `true`.
2. Transmettez le nom de votre cluster avec `DD_CLUSTER_NAME`. Datadog injecte ce nom sous forme d'un tag d'instance `cluster_name` dans toutes les configurations pour vous permettre de filtrer vos métriques.
3. La durée du bail d'élection conseillée est de 15 secondes. Définissez-la avec la variable d'environnement `DD_LEADER_LEASE_DURATION`.
4. Si le nom du service n'est pas identique à la valeur par défaut `datadog-cluster-agent`, assurez-vous que la variable d'environnement `DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME` tient compte de ce nom de service.

Les deux sources de configuration suivantes sont actuellement prises en charge. [Elles sont décrites dans la documentation relative à Autodiscovery][4] :

* Vous pouvez monter les fichiers YAML à partir d'une ConfigMap dans le dossier `/conf.d`. Ils seront automatiquement importés par le point d'entrée de l'image.
* Pour annoter les services Kubernetes, vous devez définir les variables d'environnement `DD_EXTRA_CONFIG_PROVIDERS` et `DD_EXTRA_LISTENERS` sur `kube_services`.

Notez que les hostnames ne sont pas liés aux métriques de checks de cluster, ce qui limite l'utilisation des tags de host et de la variable d'environnement `DD_TAGS`. Pour ajouter des tags aux métriques de checks de cluster, utilisez la variable d'environnement `DD_CLUSTER_CHECKS_EXTRA_TAGS`.

Consultez le [guide relatif à l'exécution de checks de cluster avec Autodiscovery][5] pour obtenir plus d'informations sur la configuration et le dépannage de cette fonctionnalité.


### Configuration de l'Agent

Activez le fournisseur de configuration `clusterchecks` dans l'Agent Datadog exécuté sur le **Host**. Pour ce faire, deux solutions s'offrent à vous :

- Vous pouvez définir la variable d'environnement `DD_EXTRA_CONFIG_PROVIDERS`. Si plusieurs valeurs doivent être définies, séparez-les par des espaces dans la chaîne :

```
DD_EXTRA_CONFIG_PROVIDERS="clusterchecks"
```

- Vous pouvez également l'ajouter dans le fichier de configuration `datadog.yaml` :

```yaml
config_providers:
  - name: clusterchecks
    polling: true
```

[Redémarrez l'Agent][6] pour prendre en compte le changement de configuration.

### Checks custom

L'exécution de [checks custom de l'Agent][7] en tant que checks de cluster est prise en charge, tant que tous les Agents de nœud sont en mesure de l'exécuter. Cela signifie que le code de vos checks :

- Doit être installé sur tous les Agents de nœud où le fournisseur de configuration `clusterchecks` est activé.
- Ne doit **pas** dépendre de ressources locales qui ne sont pas accessibles par tous les Agents.

## Configuration des checks

### Configuration statique dans un fichier

Lorsque l'IP d'une ressource donnée est fixe (endpoint de service externe, URL publique, etc.), une configuration statique peut être passée à l'Agent de cluster sous la forme d'un fichier yaml. La syntaxe et la convention de nommage des fichiers sont les mêmes que pour les configurations statiques sur les Agents de nœud, avec l'ajout de la ligne `cluster_check: true`.

#### Exemple : check MySQL sur une base de données CloudSQL

Après avoir configuré une instance CloudSQL et un [utilisateur Datadog][8], montez un fichier `/conf.d/mysql.yaml` dans le conteneur de l'Agent de cluster avec le contenu suivant :

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

### Source du modèle : Annotations de service Kubernetes

Vous pouvez annoter des services avec la syntaxe suivante, qui est similaire à la syntaxe pour l'[annotation de pods Kubernetes][9] :

```yaml
  ad.datadoghq.com/service.check_names: '[<NOM_CHECK>]'
  ad.datadoghq.com/service.init_configs: '[<CONFIG_INIT>]'
  ad.datadoghq.com/service.instances: '[<CONFIG_INSTANCE>]'
```

La [template variable][10] `%%host%%` est prise en charge et remplacée par l'IP du service. Les tags `kube_namespace` et `kube_service` sont automatiquement ajoutés à l'instance.

#### Exemple : check HTTP sur un service basé sur nginx

La définition de service suivante expose les pods du déploiement `my-nginx` et exécute un [check HTTP][11] pour mesurer la latence du service à charge équilibrée :

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

De plus, chaque pod doit être surveillé avec le [check NGINX][12] pour permettre la surveillance de chaque worker ainsi que du service agrégé.

## Dépannage

Les checks de cluster étant distribués par nature, leur dépannage est un peu plus complexe. Les sections suivantes décrivent le processus de distribution et les commandes de dépannage associées.

### Kubernetes : trouver l'Agent de cluster leader

Lorsque l'élection de leader est activée, seul le leader distribue les configurations de check de cluster aux Agents de nœud. Le nom du leader est disponible dans la ConfigMap `datadog-leader-election` :

```
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

La commande `clusterchecks` vous permet d'inspecter l'état de la logique de distribution, notamment :

- les Agents de nœud qui communiquent activement avec l'Agent de cluster
- les checks distribués sur chaque nœud

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

### Autodiscovery dans l'Agent basé sur les nœuds

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
[4]: /fr/agent/autodiscovery/clusterchecks/#setting-up-check-configurations
[5]: /fr/agent/autodiscovery/clusterchecks
[6]: /fr/agent/guide/agent-commands
[7]: /fr/developers/write_agent_check
[8]: /fr/integrations/mysql
[9]: /fr/agent/autodiscovery/?tab=kubernetes#template-source-kubernetes-pod-annotations
[10]: /fr/agent/autodiscovery/?tab=kubernetes#supported-template-variables
[11]: /fr/integrations/http_check
[12]: /fr/integrations/nginx
[13]: https://github.com/helm/charts/tree/master/stable/datadog
[14]: /fr/agent/autodiscovery/clusterchecks/#cluster-agent-setup