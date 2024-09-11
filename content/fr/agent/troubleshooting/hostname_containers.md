---
title: Détection du hostname dans les conteneurs
---

De nombreuses fonctionnalités de Datadog font appel à l'Agent pour obtenir le hostname des hosts surveillés. Bien que le processus soit simple lorsque l'Agent est directement exécuté sur un host, le processus de résolution du hostname diffère lorsque l'Agent est exécuté dans un environnement conteneurisé.

Depuis la version **7.40**, l'Agent identifie correctement les échecs de résolution du hostname dans les environnements conteneurisés. Si le hostname n'est pas résolu, l'Agent se ferme avec une erreur peu de temps après son lancement.

Lorsque cela se produit, le message `ERROR` suivant est consigné dans les logs :
```
Error while getting hostname, exiting: unable to reliably determine the host name. You can define one in the agent config file or in your hosts file
```

Si cette erreur s'affiche, cela signifie généralement qu'une partie de la configuration de l'Agent n'a pas été effectuée correctement. Utilisez les informations ci-après pour corriger les problèmes de configuration courants.

## Erreurs de hostname avec Kubernetes

Sur Kubernetes, une erreur de hostname signifie généralement que l'Agent n'est pas en mesure d'accéder à l'un des éléments suivants :
* L'API Kubelet
* L'endpoint des métadonnées du fournisseur de cloud
* L'API du runtime de conteneur

Certaines distributions Kubernetes nécessitent une configuration dédiée ; aussi, vérifiez que votre configuration respecte notre [configuration Kubernetes recommandée][1].

### Accéder à l'API Kubelet

Assurez-vous que l'Agent peut accéder à l'API Kubelet. Si c'est le cas, l'Agent affiche ce log :
```
Successful configuration found for Kubelet, using URL: ******
```

Les autorisations RBAC Kubernetes sont automatiquement définies par notre [chart Helm][2] officiel, l'[Operator Datadog][3] et nos [manifestes][4] officiels. Si vous utilisez une autre solution pour déployer l'Agent, assurez-vous que les autorisations suivantes sont présentes dans un `Role` ou `ClusterRole` lié au compte de service de l'Agent :

```yaml
rules:
  - apiGroups: # Connectivité Kubelet
      - ""
    resources:
      - nodes/metrics
      - nodes/spec
      - nodes/proxy
      - nodes/stats
    verbs:
      - get
```

Les erreurs de connexion à l'API Kubelet sont généralement causées par un problème de vérification du certificat TLS Kubelet. Dans de nombreuses distributions Kubernetes, le certificat Kubelet  :
* n'est pas signé par l'autorité de certification du cluster ; ou
* ne contient pas un SAN correspondant à l'adresse à laquelle il est accessible.

Dans ces cas de figure, l'Agent n'est pas en mesure de se connecter à l'API Kubelet via HTTPS, car la vérification TLS est activée par défaut.

Vous pouvez la désactiver en utilisant des paramètres dédiés ou en définissant la variable `DD_KUBELET_TLS_VERIFY` pour **tous les conteneurs** dans le manifeste de l'Agent :

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personnalisé :

```yaml
datadog:
  kubelet:
    tlsVerify: false
```

{{% /tab %}}
{{% tab "Operator" %}}

Ressource Kubernetes `DatadogAgent` :

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    kubelet:
      tlsVerify: false
```

{{% /tab %}}
{{% tab "Manifeste" %}}

Manifeste `DaemonSet` :

```yaml
apiVersion: apps/v1
metadata:
  name: datadog
spec:
  template:
    spec:
      containers:
        - name: agent
          env:
            - name: DD_KUBELET_TLS_VERIFY
              value: "false"
```

{{% /tab %}}
{{< /tabs >}}

### Accéder à l'endpoint des métadonnées du fournisseur de cloud

Si vous effectuez l'exécution dans AWS, Google Cloud ou Azure, l'Agent peut utiliser un endpoint de métadonnées pour récupérer le hostname.

L'accès à l'endpoint des métadonnées du fournisseur de cloud permet à Datadog de faire correspondre les données de l'Agent avec celles de l'intégration cloud dans l'application.

SI vous rencontrez une erreur, cela signifie généralement que l'accès à l'endpoint des métadonnées a été restreint.
Sur AWS par exemple, cela peut être dû au [paramètre de limite des hops][5].

### Accéder à l'API du runtime de conteneur

Utilisez cette solution uniquement dans l'éventualité peu probable où vous ne souhaiteriez pas **explicitement** que l'Agent se connecte à l'API Kubelet et où vous n'effectueriez pas l'exécution dans un fournisseur de cloud compatible mentionné ci-dessus.

Auquel cas, vous pouvez utiliser l'API Downward pour définir `DD_HOSTNAME` :

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personnalisé :

```yaml
datadog:
  env:
    - name: DD_HOSTNAME
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
```

{{% /tab %}}
{{% tab "Operator" %}}

Ressource Kubernetes `DatadogAgent` :

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_HOSTNAME
          valueFrom:
            fieldRef:
              fieldPath: spec.nodeName
```

{{% /tab %}}
{{% tab "Manifeste" %}}

Manifeste `DaemonSet`

```yaml
apiVersion: apps/v1
metadata:
  name: datadog
spec:
  template:
    spec:
      containers:
        - name: agent
          env:
            - name: DD_HOSTNAME
              valueFrom:
                fieldRef:
                  fieldPath: spec.nodeName
```

{{% /tab %}}
{{< /tabs >}}

## Erreurs de hostname avec AWS ECS et VM Docker

Lorsque l'Agent est exécuté dans Docker sur un fournisseur de cloud, une erreur de hostname signifie généralement que l'Agent n'est pas en mesure d'accéder à l'un des éléments suivants :
* L'API du runtime de conteneur
* L'endpoint des métadonnées du fournisseur de cloud

### Accéder à l'API du runtime de conteneur

Autorisez l'Agent à se connecter au socket Docker :

{{< tabs >}}
{{% tab "AWS ECS sur EC2" %}}

Assurez-vous que le socket Docker est monté dans la [définition de votre tâche][1].


[1]: /resources/json/datadog-agent-ecs.json
{{% /tab %}}
{{% tab "Docker sur une VM" %}}

Assurez-vous que le socket Docker est monté dans votre commande `docker run` :

```
-v /var/run/docker.sock:/var/run/docker.sock:ro
```

{{% /tab %}}
{{< /tabs >}}

### Accéder à l'endpoint des métadonnées du fournisseur de cloud

Si vous effectuez l'exécution dans AWS, Google Cloud ou Azure, l'Agent peut utiliser un endpoint de métadonnées pour récupérer le hostname.

L'accès à l'endpoint des métadonnées du fournisseur de cloud permet à Datadog de faire correspondre les données de l'Agent avec celles de l'intégration cloud dans l'application.

SI vous rencontrez une erreur, cela signifie généralement que l'accès à l'endpoint des métadonnées a été restreint.
Sur AWS par exemple, cela peut être dû au [paramètre de limite des hops][5].

## Erreurs de hostname dans les environnements CI, les configurations sidecar et les environnements sans accès au runtime de conteneur

Si vous exécutez l'Agent dans un **environnement CI** (une instance éphémère de l'Agent, donc) ou en tant que sidecar sans qu'il n'ait accès aux informations sur le host, il existe deux possibilités. Vous pouvez :

- Définir `DD_HOSTNAME` (`hostname` dans `datadog.yaml`) explicitement sur le hostname :

```
-e DD_HOSTNAME=$(hostname)
```

- Définir `DD_HOSTNAME_TRUST_UTS_NAMESPACE` (`hostname_trust_uts_namespace` dans `datadog.yaml`) :

Cette option est disponible à partir de la version **7.42.0** de l'Agent Datadog.

```
-e DD_HOSTNAME_TRUST_UTS_NAMESPACE=true
```

Si ce paramètre est défini, l'Agent utilisera le hostname propre au conteneur (généralement le nom du conteneur ou le nom du pod).

**Remarque** : cela ne s'applique pas aux solutions sans serveur telles que Fargate.

Si les solutions décrites ci-dessus ne permettent pas de résoudre le problème de configuration de votre Agent, contactez l'[équipe d'assistance Datadog][6].

[1]: /fr/containers/kubernetes/distributions
[2]: https://github.com/DataDog/helm-charts
[3]: https://github.com/DataDog/datadog-operator
[4]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/manifests
[5]: /fr/containers/troubleshooting/duplicate_hosts
[6]: /fr/help/