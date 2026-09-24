---
aliases:
- /fr/agent/kubernetes/appsec
- /fr/security/application_security/setup/kubernetes/appsec-injector
description: Activez automatiquement la protection des applications et des API pour
  vos proxys d'entrée et passerelles Kubernetes.
further_reading:
- link: /containers/kubernetes/apm/
  tag: Documentation
  text: Recueillir les traces de votre application
- link: /containers/kubernetes/log/
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /security/application_security/setup/kubernetes/envoy-gateway
  tag: Documentation
  text: Protection des applications et des API pour Envoy Gateway
- link: /security/application_security/setup/kubernetes/istio
  tag: Documentation
  text: Protection des applications et des API pour Istio
- link: /security/application_security/setup/nginx/ingress-controller
  tag: Documentation
  text: Protection des applications et des API pour ingress-nginx
- link: /security/default_rules/?category=cat-application-security
  tag: Documentation
  text: Règles de protection des applications et des API prêtes à l'emploi
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Dépannage de la protection des applications et des API
site_support_id: containers_kubernetes_appsec
title: Protection des applications et des API pour Kubernetes
---
Cette page décrit comment configurer la [protection des applications et des API][11] pour Kubernetes afin de configurer automatiquement les proxys d'entrée et les passerelles Kubernetes pris en charge pour exécuter la découverte d'API, la détection des menaces et le blocage en ligne à la périphérie de l'infrastructure.

## Présentation {#overview}

La protection des applications et des API pour Kubernetes configure automatiquement les proxys d'entrée et les passerelles pris en charge dans votre cluster Kubernetes pour activer la surveillance Application Security. Cela élimine le besoin de configuration manuelle des proxys et offre une couverture de sécurité à l'échelle de l'API sans modifier les services individuels ni déployer de traceurs sur l'ensemble de votre parc d'applications.

### Qu'est-ce qui effectue la configuration automatique ? {#what-performs-the-automatic-configuration}

La protection des applications et des API pour Kubernetes utilise un contrôleur Kubernetes (exécuté dans le Datadog Cluster Agent) qui :
- **Détecte automatiquement** les proxys pris en charge dans votre cluster
- **Configure les proxys** pour acheminer le trafic via un processeur Application Security externe
- **Active la détection des menaces** pour tout le trafic passant par votre couche d'entrée
- **Simplifie les opérations** grâce à une configuration centralisée avec Helm

### Proxys pris en charge {#supported-proxies}

Pour obtenir la liste des proxys pris en charge et les étapes de configuration spécifiques aux proxys, consultez la [page de configuration][10].

## Limitations {#limitations}

### Mode sidecar {#sidecar-mode}
- Nécessite le Datadog Cluster Agent 7.80.2 ou une version ultérieure
- Chaque pod de passerelle exécute sa propre instance de processeur, ce qui augmente l'utilisation des ressources par pod

### Mode externe {#external-mode}
- Nécessite le Datadog Cluster Agent 7.80.2 ou une version ultérieure
- Le processeur Security doit être déployé et mis à l'échelle manuellement
- Le service déployé peut nécessiter une politique réseau appropriée :
  - Depuis les pods proxy sur le port de service
  - Vers le Datadog Agent pour les traces

### Compatibilité des proxys {#proxy-compatibility}
- Pour la compatibilité des versions de proxy, consultez la [documentation de compatibilité][8].

## Prérequis {#prerequisites}

Avant d'activer la protection des applications et des API pour Kubernetes, vérifiez que vous disposez de :

- Un cluster Kubernetes en cours d'exécution (version 1.20 ou ultérieure)
- [Datadog Cluster Agent 7.80.2 ou une version ultérieure][1] installé et configuré dans votre cluster
- Un ou plusieurs [proxys pris en charge][10] installés
- [Remote Configuration][4] activé pour permettre le blocage des attaquants via l'interface utilisateur Datadog :

## Fonctionnement {#how-it-works}

La protection des applications et des API pour Kubernetes prend en charge deux modes de déploiement :

- **Mode sidecar** (par défaut) : Le processeur Application Security s'exécute en tant que conteneur sidecar injecté directement dans chaque pod de passerelle. Aucun déploiement de processeur distinct n'est nécessaire, et le processeur évolue automatiquement avec vos pods de passerelle.
- **Mode externe** : Un déploiement de processeur Application Security unique et centralisé dessert tout le trafic de passerelle dans votre cluster. Utilisez ce mode lorsque vous souhaitez gérer un processeur partagé pour l'ensemble du cluster.

Pour configurer le mode sidecar par défaut, consultez [Configurer le mode sidecar](#set-up-sidecar-mode). Pour déployer un processeur centralisé à la place, consultez [Configurer le mode externe](#set-up-external-mode).

## Configurer le mode sidecar {#set-up-sidecar-mode}

En mode sidecar, le processeur de sécurité s'exécute en tant que conteneur injecté directement dans chaque pod de passerelle. Le Datadog Cluster Agent gère l'injection automatiquement, vous n'avez donc pas besoin d'un déploiement ou d'un service de processeur distinct.

### Quand utiliser le mode sidecar {#when-to-use-sidecar-mode}

- Vous préférez ne pas gérer un déploiement et un service de processeur distincts
- Vous souhaitez que le processeur soit colocalisé avec chaque pod de passerelle

### Configuration {#setup}

{{< tabs >}}
{{% tab "Helm" %}}

Ajoutez ce qui suit à votre `values.yaml`. Aucune valeur `processor.service.*` n'est nécessaire car l'injecteur gère automatiquement le déploiement du processeur.

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      # mode defaults to "sidecar" when omitted
```

Installez ou mettez à jour le chart Helm Datadog (version 3.153 ou ultérieure) :

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

Cette option nécessite Datadog Operator version 1.27.1 ou ultérieure.

Ajoutez des annotations à votre ressource `DatadogAgent`. Le mode sidecar est le mode par défaut, il suffit donc d'activer l'injecteur :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/appsec.injector.enabled: "true"
```

Appliquez la configuration :

```bash
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{< /tabs >}}

### Référence de configuration sidecar {#sidecar-configuration-reference}

Tous les paramètres sidecar sont disponibles en tant que valeurs Helm imbriquées sous `datadog.appsec.injector.sidecar`, ou en tant qu'annotations `DatadogAgent` (Datadog Operator version 1.27.1 ou ultérieure) :

`sidecar.image`
: **Annotation Datadog Operator**: `agent.datadoghq.com/appsec.sidecar.image`
: **Type**: Chaîne
: **Par défaut**: `ghcr.io/datadog/dd-trace-go/service-extensions-callout`
: **Description**: Image du conteneur sidecar

`sidecar.imageTag`
: **Annotation Datadog Operator**: `agent.datadoghq.com/appsec.sidecar.image_tag`
: **Type**: Chaîne
: **Par défaut**: `v2.6.0`
: **Description**: Tag de l'image du conteneur sidecar

`sidecar.port`
: **Annotation du Datadog Operator**: `agent.datadoghq.com/appsec.sidecar.port`
: **Type**: Entier
: **Par défaut**: `8080`
: **Description**: Port d'écoute gRPC pour le processeur sidecar

`sidecar.healthPort`
: **Annotation du Datadog Operator**: `agent.datadoghq.com/appsec.sidecar.health_port`
: **Type**: Entier
: **Par défaut**: `8081`
: **Description**: Port de check de l'état pour le processeur sidecar

`sidecar.bodyParsingSizeLimit`
: **Annotation du Datadog Operator**: `agent.datadoghq.com/appsec.sidecar.body_parsing_size_limit`
: **Type**: Entier
: **Par défaut**: `0`
: **Description**: Taille maximale du corps de la requête en octets à traiter. `0` désactive le traitement du corps. Utilisez `-1` pour désactiver complètement le parsing du corps.

`sidecar.resources.requests.cpu`
: **Annotation du Datadog Operator**: `agent.datadoghq.com/appsec.sidecar.resources.requests.cpu`
: **Type**: Chaîne
: **Par défaut**: `10m`
: **Description**: Requête CPU pour le conteneur sidecar

`sidecar.resources.requests.memory`
: **Annotation du Datadog Operator**: `agent.datadoghq.com/appsec.sidecar.resources.requests.memory`
: **Type**: Chaîne
: **Par défaut** : `128Mi`
: **Description** : Demande de mémoire pour le conteneur sidecar

`sidecar.resources.limits.cpu`
: **Annotation du Datadog Operator** : `agent.datadoghq.com/appsec.sidecar.resources.limits.cpu`
: **Type**: Chaîne
: **Par défaut** : `""`
: **Description** : Limite de CPU pour le conteneur sidecar (facultatif)

`sidecar.resources.limits.memory`
: **Annotation du Datadog Operator** : `agent.datadoghq.com/appsec.sidecar.resources.limits.memory`
: **Type**: Chaîne
: **Par défaut** : `""`
: **Description** : Limite de mémoire pour le conteneur sidecar (facultatif)

## Configurer le mode externe {#set-up-external-mode}

En mode externe, vous déployez un processeur Application Security unique et centralisé qui dessert tout le trafic de la passerelle dans votre cluster. Le Datadog Cluster Agent configure automatiquement vos proxys pris en charge pour acheminer le trafic vers ce processeur.

### Architecture {#architecture}

-  **Déploiement du processeur de sécurité** : Vous déployez un processeur Application Security centralisé en tant que déploiement Kubernetes avec un service associé.
-  **Détection automatique des proxys** : Le contrôleur surveille les ressources de proxy prises en charge dans votre cluster à l'aide d'informers Kubernetes.
-  **Configuration automatique** : Lorsque des proxys sont détectés, le contrôleur crée les configurations de proxy nécessaires pour acheminer le trafic vers le service du processeur de sécurité.
-  **Traitement du trafic** : Les passerelles acheminent le trafic vers le processeur de sécurité via le service Kubernetes pour l'analyse de sécurité.

### Avantages {#benefits}

- **Efficacité des ressources** : un processeur partagé unique gère le trafic de toutes les passerelles
- **Gestion centralisée** : un seul déploiement à surveiller, mettre à l'échelle et configurer
- **Infrastructure en tant que code** : gérez la configuration via les valeurs Helm
- **Non invasif** : aucune modification du code de l'application requise
- **Évolutif** : ajoutez de nouvelles passerelles sans configuration supplémentaire

### Étape 1 : Déployer le processeur de sécurité {#step-1-deploy-the-security-processor}

Déployez le service de processeur de sécurité, qui analyse le trafic transmis depuis vos passerelles. Pour les détails de déploiement spécifiques au proxy, consultez la [documentation de configuration][10] de votre proxy.

Exemple de déploiement :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: datadog-aap-extproc-deployment
  namespace: datadog
spec:
  replicas: 2
  selector:
    matchLabels:
      app: datadog-aap-extproc
  template:
    metadata:
      labels:
        app: datadog-aap-extproc
    spec:
      containers:
      - name: datadog-aap-extproc-container
        image: ghcr.io/datadog/dd-trace-go/service-extensions-callout:v2.4.0
        ports:
        - name: grpc
          containerPort: 443
        - name: health
          containerPort: 80
        env:
        # Use the address of the datadog agent service in your cluster
        - name: DD_AGENT_HOST
          value: "datadog-agent.datadog.svc.cluster.local"

        - name: DD_SERVICE_EXTENSION_TLS
          value: "false"
        readinessProbe:
          httpGet:
            path: /
            port: health
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /
            port: health
          initialDelaySeconds: 15
          periodSeconds: 20
---
apiVersion: v1
kind: Service
metadata:
  name: datadog-aap-extproc-service
  namespace: datadog
spec:
  ports:
  - name: grpc
    port: 443
    targetPort: grpc
  selector:
    app: datadog-aap-extproc
  type: ClusterIP
```

Appliquez le manifeste :

```bash
kubectl apply -f datadog-aap-extproc-service.yaml
```

### Étape 2 : Activer la configuration automatique {#step-2-enable-automatic-configuration}

Configurez l'Agent de cluster Datadog pour qu'il utilise votre service de processeur de sécurité, en utilisant Helm ou le Datadog Operator.

**Remarque :** Le nom du service de processeur (`datadog-aap-extproc-service`) doit correspondre au service que vous avez déployé à l'étape 1.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Cette option nécessite Datadog Operator version 1.27.1 ou ultérieure.

Ajoutez des annotations à votre ressource `DatadogAgent`. L'annotation du nom de service est requise et doit correspondre à votre service de processeur de sécurité :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/appsec.injector.enabled: "true"
    agent.datadoghq.com/appsec.injector.mode: "external"
    agent.datadoghq.com/appsec.injector.processor.service.name: "datadog-aap-extproc-service"  # Required: must match your security processor service name
    agent.datadoghq.com/appsec.injector.processor.service.namespace: "datadog"
```

Appliquez la configuration :

```bash
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Configurez la protection des applications et des API pour Kubernetes à l'aide des valeurs Helm. Ajoutez ce qui suit à votre `values.yaml` :

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      mode: "external"
      processor:
        service:
          name: datadog-aap-extproc-service  # Required: must match your security processor service name
          namespace: datadog                 # Must match the namespace where the service is deployed
```

Installez ou mettez à jour le chart Helm Datadog (version 3.153 ou ultérieure) :

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

{{% /tab %}}
{{< /tabs >}}

### Étape 3: Vérifiez l'installation {#step-3-verify-the-installation}

Vérifiez que l'Agent de cluster a détecté vos proxys :

```bash
kubectl logs -n datadog deployment/datadog-cluster-agent | grep appsec
```

#### Vérifiez la configuration du proxy {#verify-proxy-configuration}

Vérifiez que le contrôleur a créé les ressources de configuration de proxy pour votre proxy. Pour les commandes de vérification spécifiques au proxy, consultez la [documentation de configuration][10] de votre proxy.

Le Datadog Cluster Agent produit des événements pour chaque opération qui aboutit à un échec ou à un succès dans le cluster.

#### Traitement du trafic de test {#test-traffic-processing}

Envoyez des requêtes via votre passerelle et vérifiez qu'elles apparaissent dans l'interface utilisateur de [App and API Protection][5] de Datadog :

1. Accédez à [Security > Application Security][5] dans Datadog.
2. Recherchez les signaux de sécurité provenant du trafic de votre passerelle.
3. Vérifiez que la détection des menaces est active.

## Référence de configuration {#configuration-reference}

### Options de configuration automatique {#automatic-configuration-options}

`enabled`
: **Annotation du Datadog Operator**: `agent.datadoghq.com/appsec.injector.enabled`
: **Type**: Booléen
: **Par défaut**: `false`
: **Description**: Activer ou désactiver l'intégration

`mode`
: **Annotation du Datadog Operator**: `agent.datadoghq.com/appsec.injector.mode`
: **Type**: Chaîne
: **Par défaut**: `""` ; lorsqu'il est vide, utilise la valeur par défaut sidecar
: **Description**: Mode d'injection: `"sidecar"` ou `"external"`

`autoDetect`
: **Annotation du Datadog Operator**: `agent.datadoghq.com/appsec.injector.autoDetect`
: **Type**: Booléen
: **Par défaut**: `true`
: **Description**: Détecter et configurer automatiquement les proxys pris en charge

`proxies`
: **Annotation du Datadog Operator**: `agent.datadoghq.com/appsec.injector.proxies`
: **Type**: Tableau JSON
: **Par défaut**: `[]`
: **Description**: Liste manuelle des types de proxy à configurer. Pour les valeurs valides, consultez la [page de configuration][10].

`processor.service.name`
: **Annotation du Datadog Operator**: `agent.datadoghq.com/appsec.injector.processor.service.name`
: **Type**: Chaîne
: **Par défaut**: Aucun
: **Description**: **Requis.** Nom du service Kubernetes du processeur de sécurité

`processor.service.namespace`
: **Annotation du Datadog Operator**: `agent.datadoghq.com/appsec.injector.processor.service.namespace`
: **Type**: Chaîne
: **Par défaut**: Par défaut, l'espace de noms où l'Agent de cluster est en cours d'exécution
: **Description**: Espace de noms où le service du processeur de sécurité est déployé

`processor.address`
: **Annotation du Datadog Operator**: `agent.datadoghq.com/appsec.injector.processor.address`
: **Type**: Chaîne
: **Par défaut**: `{service.name}.{service.namespace}.svc`
: **Description**: Remplacement complet de l'adresse du service

`processor.port`
: **Annotation du Datadog Operator**: `agent.datadoghq.com/appsec.injector.processor.port`
: **Type**: Entier
: **Par défaut**: `443`
: **Description** : Port du service du processeur de sécurité

### Mise à niveau depuis le mode externe {#upgrading-from-external-mode}

Si vous effectuez une mise à niveau depuis une version précédente qui utilisait le mode externe, le mode par défaut est passé à sidecar. Pour continuer à utiliser le mode externe, définissez explicitement `mode: "external"` dans vos valeurs Helm :

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      mode: "external"
      processor:
        service:
          name: datadog-aap-extproc-service
          namespace: datadog
```

### Exclusion de ressources spécifiques {#opting-out-specific-resources}

Vous pouvez exclure des ressources Gateway ou GatewayClass spécifiques de la configuration automatique en ajoutant une étiquette :

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: my-gateway
  namespace: my-namespace
  labels:
    appsec.datadoghq.com/enabled: "false"  # Exclude this gateway from automatic configuration
spec:
  # ... gateway configuration
```

Les ressources avec l'étiquette `appsec.datadoghq.com/enabled: "false"` sont ignorées. Ceci est utile lorsque vous souhaitez :
- Configurer manuellement des passerelles spécifiques
- Désactiver temporairement la protection des applications et des API pour les tests
- Exclure certaines passerelles de la surveillance de sécurité

**Remarque** : Par défaut, toutes les ressources sont incluses. Seules les ressources dont l'étiquette est explicitement définie sur `"false"` sont exclues.

## Dépannage {#troubleshooting}

Toutes les erreurs sont consignées en tant qu'événements Kubernetes. Recherchez les événements sur la passerelle ou la GatewayClass que vous souhaitez instrumenter.

### La configuration automatique ne détecte pas les proxys {#automatic-configuration-not-detecting-proxies}

**Symptôme** : Aucune ressource de configuration de proxy n'est créée.

**Solutions** :
- Vérifiez que `autoDetect` est défini sur `true` ou que les proxys sont spécifiés manuellement
- Vérifiez les logs du Cluster Agent pour les messages de détection de proxy
- Vérifiez que vos proxys sont installés et disposent des ressources Kubernetes attendues (Gateway, GatewayClass)
- Essayez de spécifier manuellement les types de proxy en utilisant le paramètre `proxies`

### Configuration de proxy non créée {#proxy-configuration-not-created}

**Symptôme** : Le contrôleur est en cours d'exécution mais les ressources de configuration sont manquantes.

**Solutions** :
- Vérifiez les logs du Cluster Agent pour les erreurs d'autorisation RBAC
- Vérifiez que le compte de service du Cluster Agent dispose des autorisations nécessaires pour créer les ressources de configuration de proxy
- Vérifiez que le service de processeur existe et est accessible
- Recherchez des politiques ou des filtres existants en conflit

### Trafic non traité {#traffic-not-being-processed}

**Symptôme** : Aucun événement de sécurité n'apparaît dans l'interface utilisateur Datadog.

**Solutions** :
- Vérifiez que le déploiement du processeur de sécurité est en cours d'exécution : `kubectl get pods -n datadog -l app=datadog-aap-extproc`
- Recherchez des logs d'avertissement dans vos proxys inverses concernant cette partie de la configuration.
- Vérifiez les logs du processeur pour les erreurs de connexion : `kubectl logs -n datadog -l app=datadog-aap-extproc`
- Vérifiez que le service de processeur est correctement configuré et résolvable
- Testez la connectivité des pods de passerelle vers le service de processeur
- Vérifiez que [Remote Configuration][4] est activé dans votre Datadog Agent

### Problèmes de connexion au processeur Security {#security-processor-connection-issues}

**Symptôme** : Les passerelles ne peuvent pas atteindre le processeur de sécurité.

**Solutions** :
- Vérifiez que le nom du service du processeur et l'espace de noms correspondent à votre configuration
- Recherchez les règles NetworkPolicy bloquant le trafic entre les espaces de noms
- Testez la résolution DNS depuis les pods de passerelle : `nslookup datadog-aap-extproc-service.datadog.svc.cluster.local`
- Vérifiez que la configuration du port du processeur correspond à la définition du service

### Erreurs d'autorisation RBAC {#rbac-permission-errors}

**Symptôme** : Les logs du Cluster Agent indiquent des erreurs d'autorisation refusée.

**Solutions** :
- Vérifiez que le ClusterRole du Cluster Agent inclut les autorisations pour :
  - `gateway.networking.k8s.io/gateways`
  - `gateway.networking.k8s.io/gatewayclasses`
- Vérifiez que le ClusterRoleBinding fait référence au compte de service correct
- Assurez-vous d'utiliser la version la plus récente du chart Helm ou de l'opérateur Datadog.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/containers/kubernetes/installation/
[4]: /fr/agent/remote_config/?tab=helm#enabling-remote-configuration
[5]: https://app.datadoghq.com/security/appsec
[8]: /fr/security/application_security/setup/compatibility/
[10]: /fr/security/application_security/setup/kubernetes/
[11]: /fr/security/application_security/