---
aliases:
- /fr/opentelemetry/collector_exporter/hostname_tagging
description: Configurez une identification et un tagging cohérents des hosts pour
  la télémétrie OpenTelemetry envoyée à Datadog.
further_reading:
- link: /opentelemetry/setup/collector_exporter/
  tag: Documentation
  text: Configurer le Collector OpenTelemetry
- link: /opentelemetry/mapping/hostname/
  tag: Documentation
  text: Mappage des conventions sémantiques OpenTelemetry aux noms de host
title: Nom de host et tagging
---
{{< img src="opentelemetry/collector_exporter/hostname_tagging.png" alt="Informations sur le nom de host collectées à partir d'OpenTelemetry" style="width:100%;" >}}

## Présentation {#overview}

Datadog utilise les attributs de ressource OpenTelemetry pour faire correspondre les métriques, les traces et les logs aux hosts. Lorsque toute la télémétrie provenant d'un host identifie le host de la même manière, vous pouvez corréler les signaux de ce host, et la télémétrie hérite des tags du host.

Pour l'ordre de résolution du nom de host et la liste complète des attributs de ressource pris en charge, consultez [Mappage des conventions sémantiques OpenTelemetry aux noms de host][8].

## Recommandations concernant le nom de host {#hostname-recommendations}

La configuration appropriée dépend de la manière dont vous envoyez la télémétrie à Datadog. Trouvez chaque configuration dans votre chemin de télémétrie et suivez sa section. Par exemple, si un collecteur au niveau du nœud envoie de la télémétrie via une passerelle, suivez les recommandations pour le collecteur au niveau du nœud et pour la passerelle.

| Comment vous envoyez la télémétrie | Recommandation |
|---|---|
| [Ingestion OTLP par le Datadog Agent](#otlp-ingestion-by-the-datadog-agent) | Exécutez un Agent sur chaque host qui génère de la télémétrie. Omettez les attributs de nom de host ou définissez-les sur le nom de host de l'Agent. |
| [Exportation du collecteur DDOT directement vers Datadog](#ddot-collector-exporting-directly-to-datadog) | DDOT ajoute le processeur `infraattributes` aux pipelines de l'exportateur Datadog par défaut. Sur les hosts, activez `allow_hostname_override`. Sur Fargate, fournissez les attributs de ressource de la plateforme. |
| [Exportation du collecteur OpenTelemetry vers Datadog via OTLP](#opentelemetry-collector-exporting-to-datadog-over-otlp) | Exécutez un collecteur sur chaque host ou nœud Kubernetes. Conservez le processeur `resource_detection` de la configuration recommandée et, sur Kubernetes, son processeur `k8s_attributes`. |
| [Ingestion OTLP directe sans collecteur](#direct-otlp-intake-without-a-collector) | Définissez les attributs de ressource du host ou de la plateforme dans votre SDK ou votre plateforme gérée avant l'exportation. |
| [Exportation du Collector via une passerelle](#collector-exporting-through-a-gateway) | Associez les informations du host dans le Collector au niveau du nœud et conservez ces attributs de ressource via la passerelle. |
| [Configurations existantes utilisant l'exportateur Datadog](#existing-configurations-using-the-datadog-exporter) | Exécutez un Collector sur chaque host ou nœud Kubernetes, et configurez les mêmes processeurs que dans la configuration recommandée. |

### Ingestion OTLP par le Datadog Agent {#otlp-ingestion-by-the-datadog-agent}

Déployez le Datadog Agent sur chaque host qui génère de la télémétrie OTLP. Datadog ne prend pas en charge l'envoi de télémétrie depuis un host vers un Agent sur un autre host. Pour obtenir des instructions de configuration, consultez [Ingestion OTLP par le Datadog Agent][11].

Si la télémétrie entrante ne contient pas d'[attributs de nom de host][8] valides, Datadog utilise le nom de host de l'Agent. Si vous définissez `host.name`, `host.id` ou un autre attribut de nom de host, définissez-le sur le nom de host de l'Agent pour éviter les hosts en double. Pour remplacer la résolution du nom de host, définissez l'attribut de ressource `datadog.host.name` sur le nom de host de l'Agent.

### Exportation du Collector DDOT directement vers Datadog {#ddot-collector-exporting-directly-to-datadog}

Le processeur `infraattributes` du Collector DDOT ajoute des attributs d'infrastructure et des tags à la télémétrie OTLP. Par défaut, DDOT ajoute ce processeur aux pipelines qui utilisent l'exportateur Datadog. Le processeur a besoin d'attributs de ressource qui identifient le conteneur source afin de pouvoir rechercher les tags d'infrastructure. Pour les attributs pris en charge et les étapes de dépannage, consultez [Les tags d'infrastructure sont manquants dans la télémétrie][10].

Le reste de la configuration dépend du fait que le Collector DDOT s'exécute ou non sur un host.

#### Déploiements basés sur le host {#host-based-deployments}

Cela s'applique au Collector DDOT en tant que [DaemonSet Kubernetes][9] et sur les hosts [Linux][14] et [Windows][15].

Comme le Collector DDOT s'exécute à l'intérieur du Datadog Agent, les attributs de nom de host sur la télémétrie entrante peuvent correspondre à un nom différent de celui du nom de host de l'Agent. Un seul nœud apparaît alors comme deux hosts. Pour utiliser le nom de host de l'Agent à la place, activez `allow_hostname_override` :

```yaml
processors:
  infraattributes:
    allow_hostname_override: true
```

Ajoutez `infraattributes` à la liste `processors` de chaque pipeline si ce n'est pas déjà fait. DDOT ajoute automatiquement sa propre copie aux pipelines qui ne listent pas le processeur, et cette copie utilise les paramètres par défaut.

#### Déploiements sidecar Fargate {#fargate-sidecar-deployments}

Cela s'applique au Collector DDOT sur [ECS Fargate][16] et [EKS Fargate][17], où le Datadog Agent s'exécute en tant que conteneur sidecar dans la même tâche ou le même pod que votre application.

Fargate ne prend pas en charge les déploiements basés sur le host, donc les [conseils basés sur le host](#host-based-deployments) ne s'appliquent pas. À la place, fournissez les attributs de ressource de plateforme dont `infraattributes` a besoin :

- Sur ECS Fargate, ajoutez le détecteur de ressources ECS à votre SDK OpenTelemetry pour fournir l'attribut `aws.ecs.task.arn` .
- Sur EKS Fargate, ajoutez le détecteur de ressources EKS à votre SDK, ou ajoutez le processeur de détection de ressources avec les détecteurs `[env, eks]` à votre configuration de collecteur DDOT . Pour un exemple, consultez le [guide d'installation EKS Fargate][17].

### Collecteur OpenTelemetry exportant vers Datadog via OTLP {#opentelemetry-collector-exporting-to-datadog-over-otlp}

Ceci s'applique à la [configuration recommandée du collecteur OpenTelemetry][21], où le collecteur envoie la télémétrie à Datadog avec l'exportateur OTLP HTTP.

Exécutez un collecteur sur chaque host ou nœud Kubernetes, et envoyez la télémétrie au collecteur sur le même host ou nœud. Les configurations recommandées configurent déjà la détection de host pour chaque environnement. Si vous les adaptez, conservez ces paramètres :

- **Hosts et VM** : Le processeur `resource_detection` avec le détecteur `system`. Sur un fournisseur cloud, ajoutez son détecteur.
- **Docker** : Le collecteur ne peut pas détecter le host depuis l'intérieur de son conteneur. Définissez `host.name` dans la variable d'environnement `OTEL_RESOURCE_ATTRIBUTES` du collecteur.
- **Kubernetes** : Les processeurs `k8s_attributes` et `resource_detection`. Sur Kubernetes hors cloud, définissez `k8s.node.name` dans la variable d'environnement `OTEL_RESOURCE_ATTRIBUTES` du collecteur. Sur Kubernetes cloud, utilisez le détecteur de votre fournisseur cloud au lieu de la variable d'environnement.

Pour ajouter la détection de host à une configuration de Collector qui ne l'inclut pas, consultez [Configurer les processeurs de nom de host dans le Collector](#collector-configuration).

Le `span_metrics` connecteur de la configuration recommandée utilise les attributs de host comme dimensions, afin que les métriques de trace APM conservent leurs tags de host. Si vous adaptez la configuration, conservez toutes ses dimensions. Pour plus de détails, consultez [Connecteur de métriques de span][24].

La configuration recommandée ne prend pas en charge les runtimes serverless ou basés sur des tâches tels qu'AWS Lambda, ECS Fargate et EKS Fargate. Pour ceux-ci, consultez [Ingestion OTLP directe sans Collector](#direct-otlp-intake-without-a-collector).

<div class="alert alert-info">Les attributs de ressource de nom de host identifient la télémétrie, mais ils n'ajoutent pas de hosts à la <a href="/infrastructure/list/">Liste des hosts d'infrastructure</a>. La configuration recommandée inclut le <a href="/opentelemetry/integrations/host_metrics/">récepteur de métriques de host</a>, qui alimente la Liste des hosts d'infrastructure. Si vous le supprimez, les hosts n'y apparaîtront pas. Les configurations d'exemple GKE Autopilot et AKS Automatic l'omettent.</div>

### Ingestion OTLP directe sans Collector {#direct-otlp-intake-without-a-collector}

Cela s'applique lorsque la télémétrie est envoyée directement à [l'ingestion OTLP Datadog][22], sans Datadog Agent ni OpenTelemetry Collector. Par exemple :

- Applications sur des hosts exportant avec un SDK OpenTelemetry
- [Plateformes Serverless][12] telles qu'AWS Lambda, ECS Fargate, Azure Functions et Cloud Run
- [Plateformes gérées][13]

Définissez les attributs de ressource pour votre environnement avant d'exporter la télémétrie. Activez les détecteurs de ressources intégrés de votre SDK lorsqu'ils sont disponibles, ou définissez vous-même les attributs. Sur les plateformes serverless et gérées, identifiez les charges de travail avec des attributs de ressource de plateforme au lieu de `host.name`.

Si vous exécutez le DDOT Collector en tant que sidecar sur ECS Fargate ou EKS Fargate, consultez plutôt [Déploiements sidecar Fargate](#fargate-sidecar-deployments).

### Exportation du Collector via une passerelle {#collector-exporting-through-a-gateway}

Ceci s'applique aux déploiements de passerelles OpenTelemetry Collector et au [DDOT Collector en tant que passerelle sur Kubernetes][18].

Dans un déploiement de passerelle, le collecteur qui exporte vers Datadog ne s'exécute pas sur le host qui a produit la télémétrie. Si la télémétrie atteint la passerelle sans informations sur le host, la télémétrie provenant de nombreux hosts peut se regrouper sur le nom de host de la passerelle, ou chaque pod de passerelle peut s'enregistrer comme son propre host.

Attachez les informations de host dans le collecteur au niveau du nœud. Configurez ensuite la passerelle pour conserver ces attributs de ressource au lieu de les détecter à nouveau.

- **OpenTelemetry Collector** : Sur Kubernetes, ajoutez le processeur `k8s_attributes` en mode passthrough et le processeur `resource_detection` au collecteur au niveau du nœud. Sur Kubernetes dans le cloud, utilisez le détecteur pour votre fournisseur cloud. Consultez l'exemple **Kubernetes DaemonSet -> Gateway** dans [Configurer les processeurs de nom de host dans le collecteur](#collector-configuration).
- **DDOT Collector** : Conservez le processeur `infraattributes` dans la configuration du DaemonSet, comme indiqué dans le [guide d'installation de la passerelle DDOT][18].

Si un déploiement de passerelle signale le mauvais host, consultez [Le collecteur de passerelle ne transmet pas les métadonnées de host][19].

### Configurations existantes utilisant l'exportateur Datadog {#existing-configurations-using-the-datadog-exporter}

Ceci s'applique aux [configurations OpenTelemetry Collector existantes avec l'exportateur Datadog][20]. Pour les nouvelles configurations de collecteur, utilisez la [configuration OpenTelemetry Collector recommandée][21].

Exécutez un collecteur sur chaque host ou nœud Kubernetes, et configurez la détection de host de la même manière que la [configuration recommandée](#opentelemetry-collector-exporting-to-datadog-over-otlp). Les [exemples de processeurs](#collector-configuration) sur cette page fonctionnent avec l'exportateur Datadog. Pour un exemple complet d'exportateur Datadog sur Amazon EKS, consultez [`k8s-values.yaml`][4].

Si votre collecteur transfère vers une passerelle, suivez également les [recommandations pour les passerelles](#collector-exporting-through-a-gateway).

## Diagnostiquer les problèmes de nom de host {#diagnose-hostname-issues}

Datadog émet la jauge `datadog.apm.hostname_issue` lorsqu'un nom de host de trace APM est manquant, ressemble à un pod Kubernetes éphémère ou diffère du nom de host signalé par le Datadog Agent. La métrique n'affecte pas la facturation.

<div class="alert alert-info">Le <code>issue_type</code> Les valeurs proviennent d'heuristiques, donc une configuration correcte peut les produire. Utilisez cette métrique pour enquêter sur un problème de nom de host que vous avez déjà constaté, tel qu'un nœud apparaissant comme deux hosts, des traces qui ne sont pas liées à leur host, ou des tags de host manquants.</div>

Une trace a au plus un `issue_type`. Utilisez le tableau suivant pour trouver la cause probable et la solution :

| `issue_type` | Ce qu'il indique | Action recommandée |
|---|---|---|
| `pod_like_gateway_mismatch` | Le nom de host de la trace diffère du nom de host de l'Agent et ressemble à un nom de pod Kubernetes. | Suivez les [recommandations de la passerelle](#collector-exporting-through-a-gateway). Attachez le nœud Kubernetes dans le Collector au niveau du nœud, et conservez ces attributs de ressource via la passerelle. |
| `gateway_hostname_mismatch` | Le nom de host de la trace diffère du nom de host de l'Agent. | Suivez les [recommandations de la passerelle](#collector-exporting-through-a-gateway) et conservez les attributs de ressource du nom de host via la passerelle. |
| `empty_hostname` | Datadog n'a pas reçu de nom de host utilisable pour la trace. | Suivez la [recommandation pour votre configuration](#hostname-recommendations) et fournissez les attributs de ressource de host ou de plateforme requis. |
| `pod_like_hostname` | Le nom de host de la trace ressemble à un nom de pod Kubernetes éphémère. | Configurez la détection de host pour [votre configuration](#hostname-recommendations) afin que la télémétrie identifie le nœud, le host ou la plateforme au lieu du pod. |

Les tags de métrique disponibles incluent `issue_type`, `host`, `env`, `service`, `version` et `span_source`. Les spans affectés reçoivent le même tag `issue_type`, que vous pouvez utiliser pour trouver des traces d'exemple et inspecter leurs attributs de ressource.

Les types de problèmes de type pod utilisent des modèles de nommage de pod Kubernetes courants comme heuristique. Après avoir mis à jour votre configuration, inspectez les nouvelles traces pour confirmer qu'elles n'ont plus le type de problème.

## Configurez les processeurs de nom de host dans le Collector {#collector-configuration}

Utilisez le [processeur de détection de ressources][2] pour détecter les attributs de host et de cloud, et le [processeur d'attributs Kubernetes][3] pour ajouter des métadonnées Kubernetes. Ajoutez les processeurs à vos pipelines de traces, de métriques et de logs. Sur Kubernetes, listez `k8s_attributes` avant `resource_detection`. Ces exemples fonctionnent à la fois avec l'exportateur HTTP OTLP et l'exportateur Datadog.

Les configurations recommandées pour le host, Docker et Kubernetes incluent déjà ces processeurs. Ne les remplacez pas par ces exemples : le processeur `k8s_attributes` recommandé définit également `service.name` et d'autres attributs de service à partir des métadonnées du pod. Utilisez ces exemples pour les passerelles, les configurations existantes de l'exportateur Datadog et d'autres configurations de collecteur sans détection de host.

Les noms de composants `resource_detection` et `k8s_attributes` nécessitent OpenTelemetry Collector Contrib v0.153.0 ou une version ultérieure. Les versions antérieures utilisent `resourcedetection` et `k8sattributes`. Les versions ultérieures acceptent les deux noms.

Pour des configurations complètes et testées, consultez la [configuration recommandée du collecteur OpenTelemetry][21].

{{< tabs >}}
{{% tab "Host" %}}

Ajoutez ce qui suit à votre configuration de collecteur :

```yaml
processors:
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
    system:
      resource_attributes:
        # Optional: send CPU and OS details to the Infrastructure Host List
        os.description:
          enabled: true
        host.arch:
          enabled: true
        host.cpu.vendor.id:
          enabled: true
        host.cpu.family:
          enabled: true
        host.cpu.model.id:
          enabled: true
        host.cpu.model.name:
          enabled: true
        host.cpu.stepping:
          enabled: true
        host.cpu.cache.l2.size:
          enabled: true
```

Sur un fournisseur cloud, ajoutez son détecteur au début de la liste `detectors` :

- Amazon EC2 : `[ec2, env, system]`
- Google Cloud : `[gcp, env, system]`
- Azure : `[azure, env, system]`

{{% /tab %}}

{{% tab "Docker" %}}

Le collecteur ne peut pas détecter les informations de host depuis l'intérieur de son conteneur. Définissez `host.name` dans la variable d'environnement `OTEL_RESOURCE_ATTRIBUTES` du conteneur du collecteur (par exemple, `OTEL_RESOURCE_ATTRIBUTES=host.name=<YOUR_HOST_NAME>`). Utilisez ensuite le détecteur `env` pour la lire :

```yaml
processors:
  resource_detection:
    detectors: [env]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
```

{{% /tab %}}

{{% tab "Kubernetes DaemonSet" %}}

Ces exemples utilisent le [chart Helm du collecteur OpenTelemetry][101].

Ajoutez ce qui suit à `values.yaml`. Le compte de service et le rôle de cluster donnent au processeur `k8s_attributes` un accès en lecture aux métadonnées des pods. Sur Kubernetes hors cloud, `OTEL_RESOURCE_ATTRIBUTES` définit le nom du nœud comme host. Le chart Helm définit `OTEL_K8S_NODE_NAME`.

```yaml
extraEnvs:
  # Non-cloud Kubernetes only
  - name: OTEL_RESOURCE_ATTRIBUTES
    value: "k8s.node.name=$(OTEL_K8S_NODE_NAME)"
serviceAccount:
  create: true
clusterRole:
  create: true
  rules:
    - apiGroups: [""]
      resources: ["pods", "namespaces", "nodes"]
      verbs: ["get", "watch", "list"]
    - apiGroups: ["apps"]
      resources: ["replicasets"]
      verbs: ["get", "list", "watch"]
    - apiGroups: ["extensions"]
      resources: ["replicasets"]
      verbs: ["get", "list", "watch"]
```

N'activez pas le préréglage `kubernetesAttributes` du chart avec cette configuration. Le préréglage ajoute un second processeur nommé `k8sattributes`.

Ajoutez ce qui suit à la configuration du collecteur :

```yaml
processors:
  k8s_attributes:
    passthrough: false
    auth_type: "serviceAccount"
    pod_association:
      - sources:
          - from: resource_attribute
            name: k8s.pod.uid
      - sources:
          - from: resource_attribute
            name: k8s.pod.ip
      - sources:
          - from: resource_attribute
            name: k8s.pod.name
          - from: resource_attribute
            name: k8s.namespace.name
      - sources:
          - from: connection
    extract:
      metadata:
        - k8s.pod.name
        - k8s.pod.uid
        - k8s.deployment.name
        - k8s.node.name
        - k8s.namespace.name
        - k8s.pod.start_time
        - k8s.replicaset.name
        - k8s.replicaset.uid
        - k8s.daemonset.name
        - k8s.daemonset.uid
        - k8s.job.name
        - k8s.job.uid
        - k8s.cronjob.name
        - k8s.statefulset.name
        - k8s.statefulset.uid
        - container.image.name
        - container.image.tag
        - container.id
        - k8s.container.name
      labels:
        - tag_name: kube_app_name
          key: app.kubernetes.io/name
          from: pod
        - tag_name: kube_app_instance
          key: app.kubernetes.io/instance
          from: pod
        - tag_name: kube_app_version
          key: app.kubernetes.io/version
          from: pod
        - tag_name: kube_app_component
          key: app.kubernetes.io/component
          from: pod
        - tag_name: kube_app_part_of
          key: app.kubernetes.io/part-of
          from: pod
        - tag_name: kube_app_managed_by
          key: app.kubernetes.io/managed-by
          from: pod
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
    system:
      resource_attributes:
        host.name:
          enabled: false # Containers report inaccurate host names
```

Sur une distribution Kubernetes gérée, remplacez le processeur `resource_detection` par la variante correspondant à votre environnement, et omettez `OTEL_RESOURCE_ATTRIBUTES`. Pour les variantes Amazon EKS, EKS Auto Mode, Google GKE et Azure AKS, consultez [Distributions Kubernetes gérées][102].

[101]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector
[102]: /fr/opentelemetry/setup/collector_exporter/#managed-kubernetes-distributions
{{% /tab %}}

{{% tab "Kubernetes DaemonSet -> Gateway" %}}

Dans les fichiers `values.yaml` pour le DaemonSet et la passerelle, ajoutez le compte de service et le rôle de cluster indiqués dans l'onglet **Kubernetes DaemonSet**. N'activez pas le préréglage `kubernetesAttributes` du chart.

DaemonSet :

```yaml
processors:
  k8s_attributes:
    passthrough: true
    auth_type: "serviceAccount"
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
    system:
      resource_attributes:
        host.name:
          enabled: false # Containers report inaccurate host names
```

Sur Kubernetes hors cloud, définissez `OTEL_RESOURCE_ATTRIBUTES` dans le DaemonSet comme indiqué dans l'onglet **Kubernetes DaemonSet**. Sur une distribution Kubernetes gérée, remplacez le processeur `resource_detection` par la variante adaptée à votre environnement à partir de [Distributions Kubernetes gérées][201].

En mode passthrough, le processeur `k8s_attributes` du DaemonSet ajoute uniquement l'adresse IP du pod. Le processeur `k8s_attributes` de la passerelle utilise cette adresse pour rechercher les métadonnées du pod à partir de l'API Kubernetes.

Passerelle :

```yaml
processors:
  k8s_attributes:
    passthrough: false
    auth_type: "serviceAccount"
    pod_association:
      - sources:
          - from: resource_attribute
            name: k8s.pod.ip
    extract:
      metadata:
        - k8s.pod.name
        - k8s.pod.uid
        - k8s.deployment.name
        - k8s.node.name
        - k8s.namespace.name
        - k8s.pod.start_time
        - k8s.replicaset.name
        - k8s.replicaset.uid
        - k8s.daemonset.name
        - k8s.daemonset.uid
        - k8s.job.name
        - k8s.job.uid
        - k8s.cronjob.name
        - k8s.statefulset.name
        - k8s.statefulset.uid
        - container.image.name
        - container.image.tag
        - container.id
        - k8s.container.name
      labels:
        - tag_name: kube_app_name
          key: app.kubernetes.io/name
          from: pod
        - tag_name: kube_app_instance
          key: app.kubernetes.io/instance
          from: pod
        - tag_name: kube_app_version
          key: app.kubernetes.io/version
          from: pod
        - tag_name: kube_app_component
          key: app.kubernetes.io/component
          from: pod
        - tag_name: kube_app_part_of
          key: app.kubernetes.io/part-of
          from: pod
        - tag_name: kube_app_managed_by
          key: app.kubernetes.io/managed-by
          from: pod
```

[201]: /fr/opentelemetry/setup/collector_exporter/#managed-kubernetes-distributions
{{% /tab %}}

{{% tab "Passerelle Kubernetes" %}}

Utilisez cette configuration lorsque les applications envoient la télémétrie directement à une passerelle, sans DaemonSet Collector. Dans le `values.yaml` de la passerelle, ajoutez le compte de service et le rôle de cluster indiqués dans l'onglet **Kubernetes DaemonSet**. N'activez pas le préréglage `kubernetesAttributes` du chart.

Ajoutez ce qui suit à la configuration du collecteur :

```yaml
processors:
  k8s_attributes:
    passthrough: false
    auth_type: "serviceAccount"
    pod_association:
      - sources:
          - from: resource_attribute
            name: k8s.pod.ip
    extract:
      metadata:
        - k8s.pod.name
        - k8s.pod.uid
        - k8s.deployment.name
        - k8s.node.name
        - k8s.namespace.name
        - k8s.pod.start_time
        - k8s.replicaset.name
        - k8s.replicaset.uid
        - k8s.daemonset.name
        - k8s.daemonset.uid
        - k8s.job.name
        - k8s.job.uid
        - k8s.cronjob.name
        - k8s.statefulset.name
        - k8s.statefulset.uid
        - container.image.name
        - container.image.tag
        - container.id
        - k8s.container.name
      labels:
        - tag_name: kube_app_name
          key: app.kubernetes.io/name
          from: pod
        - tag_name: kube_app_instance
          key: app.kubernetes.io/instance
          from: pod
        - tag_name: kube_app_version
          key: app.kubernetes.io/version
          from: pod
        - tag_name: kube_app_component
          key: app.kubernetes.io/component
          from: pod
        - tag_name: kube_app_part_of
          key: app.kubernetes.io/part-of
          from: pod
        - tag_name: kube_app_managed_by
          key: app.kubernetes.io/managed-by
          from: pod
```

{{% /tab %}}
{{< /tabs >}}

### Données collectées {#data-collected}

Le tableau suivant répertorie les attributs de ressource que ces processeurs peuvent ajouter. La colonne **Tag Datadog** indique le tag que Datadog crée à partir de l'attribut, lorsqu'il en existe un.

{{% collapse-content title="Attributs de ressource et tags Datadog" level="p" %}}

| Attribut OpenTelemetry | Tag Datadog | Processeur |
|---|---|---|
| `host.arch` |  | `resource_detection` (`system`) |
| `host.name` |  | `resource_detection` (`system` ou détecteur cloud) |
| `host.id` |  | `resource_detection` (détecteur cloud) |
| `host.cpu.vendor.id` |  | `resource_detection` (`system`) |
| `host.cpu.family` |  | `resource_detection` (`system`) |
| `host.cpu.model.id` |  | `resource_detection` (`system`) |
| `host.cpu.model.name` |  | `resource_detection` (`system`) |
| `host.cpu.stepping` |  | `resource_detection` (`system`) |
| `host.cpu.cache.l2.size` |  | `resource_detection` (`system`) |
| `os.description` |  | `resource_detection` (`system`) |
| `os.type` |  | `resource_detection` (`system`) |
| `cloud.provider` | `cloud_provider` | `resource_detection` (détecteur cloud) |
| `cloud.platform` |  | `resource_detection` (détecteur cloud) |
| `cloud.account.id` |  | `resource_detection` (détecteur cloud) |
| `cloud.region` | `region` | `resource_detection` (détecteur cloud) |
| `cloud.availability_zone` | `zone` | `resource_detection` (détecteur cloud) |
| `host.type` |  | `resource_detection` (détecteur cloud) |
| `gcp.gce.instance.hostname` |  | `resource_detection` (`gcp`) |
| `gcp.gce.instance.name` |  | `resource_detection` (`gcp`) |
| `k8s.cluster.name` | `kube_cluster_name` | `resource_detection` (détecteur de cloud Kubernetes) |
| `host.image.id` |  | `resource_detection` (`ec2`) |
| `aws.ecs.cluster.arn` | `ecs_cluster_name` | `resource_detection` (`ecs`) |
| `aws.ecs.task.arn` | `task_arn` | `resource_detection` (`ecs`) |
| `aws.ecs.task.family` | `task_family` | `resource_detection` (`ecs`) |
| `aws.ecs.task.revision` | `task_version` | `resource_detection` (`ecs`) |
| `aws.ecs.launchtype` |  | `resource_detection` (`ecs`) |
| `aws.log.group.names` |  | `resource_detection` (`ecs`) |
| `aws.log.group.arns` |  | `resource_detection` (`ecs`) |
| `aws.log.stream.names` |  | `resource_detection` (`ecs`) |
| `aws.log.stream.arns` |  | `resource_detection` (`ecs`) |
| `azure.vm.name` |  | `resource_detection` (`azure`) |
| `azure.vm.size` |  | `resource_detection` (`azure`) |
| `azure.vm.scaleset.name` |  | `resource_detection` (`azure`) |
| `azure.resourcegroup.name` |  | `resource_detection` (`azure`) |
| `k8s.namespace.name` | `kube_namespace` | `k8s_attributes` |
| `k8s.pod.name` | `pod_name` | `k8s_attributes` |
| `k8s.pod.uid` |  | `k8s_attributes` |
| `k8s.pod.start_time` |  | `k8s_attributes` |
| `k8s.deployment.name` | `kube_deployment` | `k8s_attributes` |
| `k8s.replicaset.name` | `kube_replica_set` | `k8s_attributes` |
| `k8s.replicaset.uid` |  | `k8s_attributes` |
| `k8s.daemonset.name` | `kube_daemon_set` | `k8s_attributes` |
| `k8s.daemonset.uid` |  | `k8s_attributes` |
| `k8s.statefulset.name` | `kube_stateful_set` | `k8s_attributes` |
| `k8s.statefulset.uid` |  | `k8s_attributes` |
| `k8s.container.name` | `kube_container_name` | `k8s_attributes` |
| `k8s.job.name` | `kube_job` | `k8s_attributes` |
| `k8s.job.uid` |  | `k8s_attributes` |
| `k8s.cronjob.name` | `kube_cronjob` | `k8s_attributes` |
| `k8s.node.name` |  | `k8s_attributes` |
| `container.id` | `container_id` | `k8s_attributes` |
| `container.image.name` | `image_name` | `k8s_attributes` |
| `container.image.tag` | `image_tag` | `k8s_attributes` |

{{% /collapse-content %}}

## Tagging personnalisé {#custom-tagging}

### Tags de host personnalisés {#custom-host-tags}

#### En tant qu'attributs de ressource OTLP {#as-otlp-resource-attributes}

Pour ajouter des tags de host personnalisés, définissez des attributs de ressource avec le préfixe `datadog.host.tag.`.

Dans un [SDK OpenTelemetry][5], définissez-les avec la variable d'environnement `OTEL_RESOURCE_ATTRIBUTES` :

```shell
OTEL_RESOURCE_ATTRIBUTES=datadog.host.tag.<CUSTOM_TAG_NAME>=<CUSTOM_TAG_VALUE>
```

Dans le collecteur, définissez-les avec le processeur de ressources :

```yaml
processors:
  resource:
    attributes:
    - key: datadog.host.tag.<CUSTOM_TAG_NAME>
      action: upsert
      from_attribute: <SOURCE_ATTRIBUTE>
```

**Remarque** : Avec l'exportateur Datadog, les tags de host personnalisés nécessitent l'activation décrite dans [Informations sur le host de la liste d'infrastructure][7].

#### Dans l'exportateur Datadog {#in-the-datadog-exporter}

Pour les configurations existantes avec l'[exportateur Datadog][20], vous pouvez également définir des tags de host personnalisés dans la section `host_metadata` de l'exportateur :

```yaml
exporters:
  datadog:
    host_metadata:
      tags: ["team:infra", "<TAG_KEY>:<TAG_VALUE>"]
```

Ces tags s'appliquent uniquement à la télémétrie dont le nom de host correspond au nom de host dans les métadonnées de host de l'exportateur. Pour taguer la télémétrie depuis n'importe quel host, utilisez un processeur. Pour toutes les options, consultez l'[exemple de configuration de l'exportateur Datadog][6].

### Alias de host{#host-aliases}

Pour définir des alias de host, définissez l'attribut de ressource `datadog.host.aliases`. Par exemple, utilisez le processeur de transformation :

```yaml
processors:
  transform:
    trace_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.aliases"], ["alias1", "alias2", "alias3"])
```

**Remarque** : Avec l'exportateur Datadog, les alias de host nécessitent l'activation décrite dans [Informations sur le host de la liste d'infrastructure][7].

### Tags de conteneur personnalisés {#custom-container-tags}

Pour ajouter des tags de conteneur personnalisés, définissez des attributs de ressource avec le préfixe `datadog.container.tag.`.

Dans un [SDK OpenTelemetry][5], définissez-les avec la variable d'environnement `OTEL_RESOURCE_ATTRIBUTES` :

```shell
OTEL_RESOURCE_ATTRIBUTES=datadog.container.tag.<CUSTOM_TAG_NAME>=<CUSTOM_TAG_VALUE>
```

Dans le collecteur, définissez-les avec le processeur de ressources :

```yaml
processors:
  resource:
    attributes:
    - key: datadog.container.tag.<CUSTOM_TAG_NAME>
      action: upsert
      from_attribute: <SOURCE_ATTRIBUTE>
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/README.md
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/k8sattributesprocessor/README.md
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/k8s-values.yaml
[5]: https://opentelemetry.io/docs/languages/js/resources/
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml
[7]: /fr/opentelemetry/mapping/host_metadata/
[8]: /fr/opentelemetry/mapping/hostname/
[9]: /fr/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/
[10]: /fr/opentelemetry/troubleshooting/#infrastructure-tags-are-missing-from-telemetry
[11]: /fr/opentelemetry/setup/otlp_ingest_in_the_agent/
[12]: /fr/opentelemetry/setup/otlp_ingest/serverless/
[13]: /fr/opentelemetry/setup/otlp_ingest/managed_platforms/
[14]: /fr/opentelemetry/setup/ddot_collector/install/linux/
[15]: /fr/opentelemetry/setup/ddot_collector/install/windows/
[16]: /fr/opentelemetry/setup/ddot_collector/install/ecs_fargate/
[17]: /fr/opentelemetry/setup/ddot_collector/install/eks_fargate/
[18]: /fr/opentelemetry/setup/ddot_collector/install/kubernetes_gateway/
[19]: /fr/opentelemetry/troubleshooting/#gateway-collector-not-forwarding-host-metadata
[20]: /fr/opentelemetry/setup/collector_exporter/datadog_exporter/
[21]: /fr/opentelemetry/setup/collector_exporter/
[22]: /fr/opentelemetry/setup/otlp_ingest/
[24]: /fr/opentelemetry/setup/collector_exporter/#span-metrics-connector