---
aliases:
- /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes
code_lang: kubernetes
code_lang_weight: 20
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: Documentation
  text: Activer les métriques d'exécution
- link: /tracing/guide/init_resource_calc/
  tag: Documentation
  text: En savoir plus sur l'utilisation des ressources des conteneurs init
- link: /tracing/guide/local_sdk_injection
  tag: Documentation
  text: Instrumentez vos applications en utilisant l'injection du SDK local
- link: https://learn.datadoghq.com/courses/configuring-ssi-k8s
  tag: Centre d'apprentissage
  text: Configurer l'instrumentation à étape unique sur Kubernetes
title: Instrumentation APM à étape unique sur Kubernetes
type: multi-code-lang
---
## Aperçu {#overview}

Dans un environnement Kubernetes, utilisez l'instrumentation à étape unique (SSI) pour APM afin d'installer l'Agent Datadog et [instrumenter][3] vos applications avec les SDK Datadog en une seule étape.

## Exigences {#requirements}

- Kubernetes v1.20+.
- [`Helm`][1] pour déployer l'Opérateur Datadog.
- [`Kubectl` CLI][2] pour installer l'Agent Datadog.
- Compatibilité de l'environnement confirmée selon le [guide de compatibilité de l'instrumentation à étape unique][36].


## Activer APM sur vos applications {#enable-apm-on-your-applications}

<div class="alert alert-info">L'instrumentation à étape unique n'instrumente pas les applications dans l'espace de noms où l'Agent Datadog est installé. Installez l'Agent dans un espace de noms séparé où vous n'exécutez pas vos applications.</div>

Suivez ces étapes pour activer l'instrumentation à étape unique sur l'ensemble de votre cluster. Cela envoie automatiquement des traces de toutes les applications écrites dans des langages pris en charge.

**Remarque :** Pour instrumenter uniquement des espaces de noms ou des pods spécifiques, consultez le ciblage des charges de travail dans [Options avancées](#advanced-options).

1. Dans Datadog, allez à la page [Installer l'Agent Datadog sur Kubernetes][11].
1. Suivez les instructions à l'écran pour choisir votre méthode d'installation, sélectionner une clé API et configurer l'Opérateur ou le dépôt Helm.
1. Dans la section **Configurer `datadog-agent.yaml`**, allez à **Configuration supplémentaire** > **Observabilité de l'application**, et activez **Instrumentation APM**.

   {{< img src="tracing/trace_collection/k8s-apm-instrumentation-toggle.jpg" alt="Le bloc de configuration pour installer l'Agent Datadog sur Kubernetes via l'application Datadog." style="width:100%;" >}}

1. Déployez l'Agent en utilisant le fichier de configuration généré.
1. Redémarrez vos applications.

<div class="alert alert-info">SSI ajoute un petit temps de démarrage aux applications instrumentées. Si ce surcoût n'est pas acceptable pour votre cas d'utilisation, contactez <a href="/help/">le support Datadog</a>.</div>

## Configurez les étiquettes de service unifiées {#configure-unified-service-tags}

Les étiquettes de service unifiées (UST) appliquent des étiquettes cohérentes à travers les traces, les métriques et les journaux, facilitant la navigation et la corrélation de vos données d'observabilité. Vous pouvez configurer les UST via l'extraction automatique d'étiquettes (recommandé), par configuration explicite avec `ddTraceConfigs`, ou dans les manifestes de déploiement.

<div class="alert alert-warning">
Si vous utilisez <a href="/agent/remote_config/">la configuration distante</a>, <a href="#recommended-configure-usts-through-automatic-label-extraction">l'extraction automatique d'étiquettes</a> n'est pas compatible. Vous devez <a href="#configure-usts-explicitly-with-ddtraceconfigs">configurer les UST explicitement</a> en utilisant <code>ddTraceConfigs</code>.
</div>

### (Recommandé) Configurez les UST via l'extraction automatique d'étiquettes {#recommended-configure-usts-through-automatic-label-extraction}

Avec SSI, vous pouvez extraire automatiquement les valeurs UST des étiquettes et des métadonnées des pods sans modifier les déploiements individuels. Pour ce faire, configurez `kubernetesResourcesLabelsAsTags` pour mapper vos étiquettes Kubernetes existantes aux étiquettes de service Datadog.

**Remarque :** Cette méthode n'est pas compatible avec la configuration distante. Si vous utilisez la configuration distante, consultez [Configurer les UST explicitement avec ddTraceConfigs](#configure-usts-explicitly-with-ddtraceconfigs).

#### Prérequis {#prerequisites}

| Composant | Version minimale  |
|-----------|------------------|
| `datadog-agent` | 7.69        |
| `datadog-operator` | 1.16.0   |
| `datadog-helm-chart` | 3.120.0 |

#### Configuration {#configuration}

Remplacez `app.kubernetes.io/name` dans l'exemple suivant par toute étiquette contenant le nom de votre service (par exemple, `service.kubernetes.io/name` ou `component`). Vous pouvez configurer plusieurs étiquettes de cette manière.

```yaml
datadog:
  # Automatically extract service names from Kubernetes labels
  kubernetesResourcesLabelsAsTags:
    pods:
      app.kubernetes.io/name: service     # Modern Kubernetes label
    deployments.apps:
      app.kubernetes.io/name: service
    replicasets.apps:
      app.kubernetes.io/name: service

  # Set environment globally for the entire cluster
  tags:
    - "env:production"

  apm:
    instrumentation:
      enabled: true
```

Avec cette configuration, Datadog définit automatiquement le tag `service` en utilisant la valeur de l'étiquette `app.kubernetes.io/name` pour toute charge de travail instrumentée qui inclut cette étiquette.

### Configurez les UST explicitement avec ddTraceConfigs {#configure-usts-explicitly-with-ddtraceconfigs}

Dans la plupart des cas, la configuration automatique est suffisante. Cependant, si vous avez besoin d'un contrôle granulaire sur les paramètres pour des charges de travail spécifiques, utilisez `ddTraceConfigs` pour mapper explicitement les étiquettes aux configurations de service:

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    pods:
      app.kubernetes.io/name: service
    deployments.apps:
      app.kubernetes.io/name: service

  # Set environment globally for the entire cluster
  tags:
    - "env:production"

  apm:
    instrumentation:
      enabled: true
      targets:
        - name: frontend-services
          podSelector:
            matchLabels:
              tier: frontend
          ddTraceConfigs:
            - name: DD_SERVICE       # Explicitly override service name
              valueFrom:
                fieldRef:
                  fieldPath: metadata.labels['app.kubernetes.io/name']
            # DD_ENV inherited from cluster-level tags above
            # DD_VERSION automatically extracted from image tags
```


### Configurez les UST dans les manifestes de déploiement {#configure-usts-in-deployment-manifests}

Si votre configuration n'utilise pas d'étiquettes adaptées à l'extraction des UST, vous pouvez définir les UST directement dans vos manifestes de déploiement en utilisant des variables d'environnement. Cette approche nécessite de modifier chaque déploiement individuellement, mais offre un contrôle précis.

Pour des instructions complètes, voir [configuration des UST pour les services Kubernetes][5].

## Activez les produits et fonctionnalités dépendants du SDK {#enable-sdk-dependent-products-and-features}

Après que SSI a chargé le SDK Datadog dans vos applications et activé le traçage distribué, vous pouvez configurer des produits supplémentaires qui dépendent du SDK :

{{< ssi-products >}}

Utilisez l'une des méthodes de configuration suivantes :

- **[Configurez avec le ciblage des workloads (recommandé)](#target-specific-workloads)** :

  Par défaut, l'instrumentation par étape unique instrumente tous les services dans tous les espaces de noms. Utilisez le ciblage des charges de travail pour limiter l'instrumentation à des espaces de noms, pods ou charges de travail spécifiques, et appliquez des configurations personnalisées.

- **[Définir des variables d'environnement][7]** :

  Activez les produits en définissant des variables d'environnement directement dans la configuration de votre application.

## Options avancées {#advanced-options}

Utilisez les options avancées suivantes pour personnaliser le comportement de l'instrumentation à étape unique dans votre environnement. Ces paramètres sont optionnels et généralement nécessaires uniquement dans des configurations spécialisées.

### Configurer les modes d'injection {#configure-injection-modes}

SSI prend en charge plusieurs modes d'injection, qui contrôlent la manière dont les fichiers de l'injecteur et de la bibliothèque APM sont livrés à vos conteneurs d'application. Vous n'avez généralement pas besoin de configurer ce paramètre manuellement. Envisagez de l'ajuster si vous remarquez des délais de démarrage de pod significatifs ou une utilisation des ressources (CPU, mémoire) plus élevée que prévu lors de l'initialisation du pod. Pour en savoir plus sur le fonctionnement de l'injecteur, consultez [Comportement de l'injecteur avec l'instrumentation à étape unique][41].


| Mode | Description | Exigences : |
|------|-------------|--------------|
| `init_container` | Utilise des conteneurs d'initialisation pour copier les fichiers de l'injecteur et de la bibliothèque APM dans les conteneurs d'application. | Agent déployé avec Helm Chart ou Datadog Operator |
| `csi` | **En avant-première.** Monte les fichiers de l'injecteur et de la bibliothèque APM en utilisant le [driver CSI Datadog][37]. Réduit le temps de démarrage du pod par rapport au mode conteneur d'initialisation. | Agent 7.76.0+, driver CSI 1.2.0+, Helm Chart 3.178.1+ ou Datadog Operator 1.25.0+ |

Avant d'utiliser le mode `csi`, installez et activez le driver CSI Datadog. Si vous déployez avec Helm, définissez également `datadog.csi.enabled: true` dans votre `datadog-values.yaml`. Consultez la [documentation du driver CSI][37] pour les étapes d'installation et les exigences spécifiques à l'environnement, telles que GKE Autopilot.

#### Configurer le mode d'injection globalement {#configure-injection-mode-globally}

{{< tabs >}}
{{% tab "Helm" %}}

Pour définir le mode d'injection à l'échelle du cluster, ajoutez `injectionMode` à votre `datadog-values.yaml` :

```yaml
datadog:
  apm:
    instrumentation:
      injectionMode: <mode>
```

Valeurs prises en charge : `init_container`, `csi`.

{{% /tab %}}
{{% tab "Operator Datadog" %}}

Pour définir le mode d'injection à l'échelle du cluster, ajoutez `injectionMode` à votre `datadog-agent.yaml` :

```yaml
features:
  apm:
    instrumentation:
      injectionMode: <mode>
```

Valeurs prises en charge : `init_container`, `csi`.

Si vous utilisez Datadog Operator antérieur à 1.25.0, utilisez l'annotation [pod](#configure-injection-mode-per-pod) pour remplacer le mode d'injection pour des pods spécifiques.

{{% /tab %}}
{{< /tabs >}}

#### Configurer le mode d'injection par pod {#configure-injection-mode-per-pod}

Pour remplacer le mode d'injection pour un pod spécifique, ajoutez l'annotation suivante à la spécification du pod :

```yaml
metadata:
  annotations:
    admission.datadoghq.com/apm-inject.injection-mode: "<mode>"
```

Valeurs prises en charge : `init_container`, `csi`.

### Cibler des charges de travail spécifiques {#target-specific-workloads}

Par défaut, SSI instrumente tous les services dans tous les espaces de noms de votre cluster. Selon la version de votre Agent, utilisez l'une des méthodes de configuration suivantes pour affiner quels services sont instrumentés et comment.

{{< tabs >}}

{{% tab "Agent v7.64+ (Recommandé)" %}}

Créez des blocs de ciblage en utilisant l'étiquette `targets` pour préciser quelles charges de travail doivent être instrumentées et quelles configurations appliquer.

Chaque bloc cible a les clés suivantes :

| Clé             | Description |
|------------------|-------------|
| `name`            | Le nom du bloc cible. Cela n'a aucun effet sur l'état de surveillance et est utilisé uniquement comme métadonnées. |
| `namespaceSelector` | Les espaces de noms à instrumenter. Spécifiez en utilisant un ou plusieurs de :<br> - `matchNames` : Une liste d'un ou plusieurs noms d'espace de noms. <br> - `matchLabels` : Une liste d'une ou plusieurs étiquettes définies dans des paires `{key,value}`. <br> - `matchExpressions` : Une liste d'exigences de sélection d'espace de noms. <br><br> Les espaces de noms doivent répondre à tous les critères pour correspondre. Pour plus de détails, voir la [documentation du sélecteur Kubernetes][10].|
| `podSelector`     | Les pod(s) à instrumenter. Spécifiez en utilisant un ou plusieurs de : <br> - `matchLabels` : Une liste d'une ou plusieurs étiquettes définies dans des paires `{key,value}`. <br> - `matchExpressions` : Une liste d'exigences de sélection de pod. <br><br> Les pods doivent répondre à tous les critères pour correspondre. Pour plus de détails, consultez la [documentation des sélecteurs Kubernetes][10]. |
| `ddTraceVersions` | La version du [Datadog APM SDK][9] à utiliser pour chaque langage. |
| `ddTraceConfigs`  | Configurations du SDK APM qui permettent de définir des [tags de service unifiés][8], activant [des produits dépendants du SDK](#enable-sdk-dependent-products-and-features) au-delà du traçage, et personnalisant d'autres [paramètres APM][14]. |

Le fichier que vous devez configurer dépend de la manière dont vous avez activé l'instrumentation par étape unique :
- Si vous avez activé le SSI avec Datadog Operator, modifiez `datadog-agent.yaml`.
- Si vous avez activé le SSI avec Helm, modifiez `datadog-values.yaml`.

**Remarque** : Les cibles sont évaluées dans l'ordre ; la première correspondance a la priorité.

#### Configurations d'exemple {#example-configurations}

Examinez les exemples suivants démontrant comment sélectionner des services spécifiques :

{{< collapse-content title="Exemple 1 : Activer tous les espaces de noms sauf un" level="h4" >}}

Cette configuration :
- active l'APM pour tous les espaces de noms sauf le `jenkins` espace de noms.
  - **Remarque** : utilisez `enabledNamespaces` pour désactiver pour tous les espaces de noms sauf ceux listés.
- indique à Datadog d'instrumenter les applications Java avec le SDK Java par défaut et les applications Python avec `v.3.1.0` du SDK Python.

{{< highlight yaml "hl_lines=4-10" >}}
   apm:
     instrumentation:
       enabled: true
       disabledNamespaces:
         - "jenkins"
       targets:
         - name: "all-remaining-services"
           ddTraceVersions:
             java: "default"
             python: "3.1.0"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Exemple 2 : Instrumenter un sous-ensemble d'espaces de noms, en fonction des noms et des étiquettes" level="h4" >}}

Cette configuration crée deux blocs de cibles :

- Le premier bloc (nommé `login-service_namespace`) :
  - active l'APM pour les services dans l'espace de noms `login-service`.
  - indique à Datadog d'instrumenter les services dans cet espace de noms avec la version par défaut du SDK Java.
  - définit la variable d'environnement `DD_PROFILING_ENABLED` pour ce groupe cible.
- Le deuxième bloc (nommé `billing-service_apps`)
  - active l'APM pour les services dans le(s) espace(s) de noms avec l'étiquette `app:billing-service`.
  - indique à Datadog d'instrumenter cet ensemble de services avec `v3.1.0` du SDK Python.

{{< highlight yaml "hl_lines=4-28" >}}
  apm:
    instrumentation:
      enabled: true
      targets:
        - name: "login-service_namespace"
          namespaceSelector:
            matchNames:
              - "login-service"
          ddTraceVersions:
            java: "default"
          ddTraceConfigs:
            - name: "DD_PROFILING_ENABLED"  ## profiling is enabled for all services in this namespace
              value: "auto"
        - name: "billing-service_apps"
          namespaceSelector:
            matchLabels:
              app: "billing-service"
          ddTraceVersions:
            python: "3.1.0"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Exemple 3 : Instrumenter différentes charges de travail avec différents traceurs" level="h4" >}}

Cette configuration effectue les actions suivantes :
- active APM pour les pods avec les étiquettes suivantes :
  - `app:db-user`, qui marque les pods exécutant l'application `db-user`.
  - `webserver:routing`, qui marque les pods exécutant l'application `request-router`.
- indique à Datadog d'utiliser les versions par défaut des SDK Datadog Tracer.
- définit les variables d'environnement Datadog à appliquer à chaque groupe cible et configure les SDKs.

{{< highlight yaml "hl_lines=4-28" >}}
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "db-user"
           podSelector:
             matchLabels:
               app: "db-user"
           ddTraceVersions:
             java: "default"
           ddTraceConfigs:   ## trace configs set for services in matching pods
             - name: "DD_DATA_STREAMS_ENABLED"
               value: "true"
         - name: "user-request-router"
           podSelector:
             matchLabels:
               webserver: "user"
           ddTraceVersions:
             php: "default"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Exemple 4 : Instrumenter un pod dans un espace de noms" level="h4" >}}

Cette configuration :
- active l'APM pour les pods étiquetés `app:password-resolver` à l'intérieur de l'espace de noms `login-service`.
- indique à Datadog d'utiliser la version par défaut du SDK Datadog Java Tracer.
- définit les variables d'environnement Datadog à appliquer à cette cible.

{{< highlight yaml "hl_lines=4-28" >}}
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "login-service-namespace"
           namespaceSelector:
             matchNames:
               - "login-service"
           podSelector:
             matchLabels:
               app: "password-resolver"
           ddTraceVersions:
             java: "default"
           ddTraceConfigs:
             - name: "DD_PROFILING_ENABLED"
               value: "auto"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Exemple 5 : Instrumenter un sous-ensemble de pods utilisant <code>matchExpressions</code>" level="h4" >}}

Cette configuration active APM pour tous les pods sauf ceux qui ont l'une des étiquettes `app=app1` ou `app=app2`.

{{< highlight yaml "hl_lines=4-28" >}}
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "default-target"
           podSelector:
               matchExpressions:
                 - key: app
                   operator: NotIn
                   values:
                   - app1
                   - app2
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Exemple 6 : Activer des produits supplémentaires avec <code>ddTraceConfigs</code>" level="h4" >}}

Cette configuration active [App and API Protection (AAP)][12] et [Continuous Profiler][11] pour les services dans l'espace de noms `web-apps`, en utilisant `ddTraceConfigs` pour définir les variables d'environnement requises :

{{< highlight yaml "hl_lines=4-20" >}}
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "web-apps-with-security"
           namespaceSelector:
             matchNames:
               - "web-apps"
           ddTraceVersions:
             java: "default"
             python: "default"
           ddTraceConfigs:
             - name: "DD_APPSEC_ENABLED"
               value: "true"
             - name: "DD_PROFILING_ENABLED"
               value: "auto"
{{< /highlight >}}

Pour une liste complète des produits que vous pouvez activer via SSI, voir [Activer des produits et fonctionnalités dépendants du SDK](#enable-sdk-dependent-products-and-features).

{{< /collapse-content >}}

[8]: /fr/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[9]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/#tracer-libraries
[10]: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#resources-that-support-set-based-requirements
[11]: /fr/profiler/
[12]: /fr/security/application_security/
[14]: /fr/tracing/trace_collection/library_config/

{{% /tab %}}

{{% tab "Agent <=v7.63 (Legacy)" %}}

#### Activez ou désactivez l'instrumentation pour les espaces de noms {#enable-or-disable-instrumentation-for-namespaces}

Vous pouvez choisir d'activer ou de désactiver l'instrumentation pour les applications dans des espaces de noms spécifiques. Vous ne pouvez définir que enabledNamespaces ou disabledNamespaces, pas les deux.

Le fichier que vous devez configurer dépend de si vous avez activé l'instrumentation par étape unique avec Datadog Operator ou Helm :

{{< collapse-content title="Operator Datadog" level="h5" >}}

Pour activer l'instrumentation pour des espaces de noms spécifiques, ajoutez la configuration `enabledNamespaces` à `datadog-agent.yaml` :

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         enabledNamespaces: # Add namespaces to instrument
           - default
           - applications
{{< /highlight >}}

Pour désactiver l'instrumentation pour des espaces de noms spécifiques, ajoutez la configuration `disabledNamespaces` à `datadog-agent.yaml` :

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         disabledNamespaces: # Add namespaces to not instrument
           - default
           - applications
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h5" >}}

Pour activer l'instrumentation pour des espaces de noms spécifiques, ajoutez la configuration `enabledNamespaces` à `datadog-values.yaml` :

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          enabledNamespaces: # Add namespaces to instrument
             - namespace_1
             - namespace_2
{{< /highlight >}}

Pour désactiver l'instrumentation pour des espaces de noms spécifiques, ajoutez la configuration `disabledNamespaces` à `datadog-values.yaml` :

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          disabledNamespaces: # Add namespaces to not instrument
            - namespace_1
            - namespace_2
{{< /highlight >}}

{{< /collapse-content >}}

#### Spécifiez les versions SDK {#specify-sdk-versions}

<div class="alert alert-info">À partir de Datadog Cluster Agent v7.52.0+, vous pouvez instrumenter automatiquement un sous-ensemble de vos applications, en fonction des SDK que vous spécifiez.</div>

Spécifiez les SDK Datadog et leurs versions pour instrumenter automatiquement les applications écrites dans ces langages. Vous pouvez configurer cela de deux manières, qui sont appliquées dans l'ordre de priorité suivant :

1. [Spécifiez au niveau du service ](#specify-at-the-service-level), ou
2. [Spécifiez au niveau du cluster ](#specify-at-the-cluster-level).

**Par défaut** : Si vous ne spécifiez aucune version de bibliothèque, les applications écrites dans des langages pris en charge sont automatiquement instrumentées en utilisant les dernières versions SDK.

##### Spécifiez au niveau du service {#specify-at-the-service-level}

Pour instrumenter automatiquement les applications dans des pods spécifiques, ajoutez l'annotation de langue appropriée et la version de la bibliothèque pour votre application dans votre spécification de pod :

| Langue   | Annotation de pod                                                        |
|------------|-----------------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"`   |
| Node.js    | `admission.datadoghq.com/js-lib.version: "<CONTAINER IMAGE TAG>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<CONTAINER IMAGE TAG>"` |
| .NET       | `admission.datadoghq.com/dotnet-lib.version: "<CONTAINER IMAGE TAG>"` |
| Ruby       | `admission.datadoghq.com/ruby-lib.version: "<CONTAINER IMAGE TAG>"`   |
| PHP        | `admission.datadoghq.com/php-lib.version: "<CONTAINER IMAGE TAG>"`   |

Remplacez `<CONTAINER IMAGE TAG>` par la version de bibliothèque souhaitée. Les versions disponibles sont listées dans les [registres de conteneurs Datadog](#change-the-default-image-registry) et les dépôts de code source des traceurs pour chaque langage :

- [Java][34]
- [Node.js][35]
- [Python][36]
- [.NET][37]
- [Ruby][38]
- [PHP][39]

<div class="alert alert-danger">Faites preuve de prudence lors de l'utilisation du <code>latest</code> tag, car les versions majeures des bibliothèques peuvent introduire des changements incompatibles.</div>

Par exemple, pour instrumenter automatiquement les applications Java :

{{< highlight yaml "hl_lines=10" >}}
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    # ...
spec:
  template:
    metadata:
      annotations:
        admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"
    spec:
      containers:
        - # ...
{{< /highlight >}}

##### Spécifiez au niveau du cluster {#specify-at-the-cluster-level}

Si vous n'activez pas l'instrumentation automatique pour des pods spécifiques à l'aide d'annotations, vous pouvez spécifier les langages à instrumenter dans l'ensemble du cluster en utilisant la configuration SSI. Lorsque `apm.instrumentation.libVersions` est défini, seules les applications écrites dans les langages spécifiés sont instrumentées, en utilisant les versions de bibliothèque spécifiées.

Le fichier que vous devez configurer dépend de si vous avez activé l'instrumentation par étape unique avec Datadog Operator ou Helm :

{{< collapse-content title="Operator Datadog" level="h5" >}}

Par exemple, pour instrumenter les applications .NET, Python et Node.js, ajoutez la configuration suivante à votre fichier `datadog-agent.yaml` :

{{< highlight yaml "hl_lines=5-8" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         libVersions: # Add any libraries and versions you want to set
            dotnet: "x.x.x"
            python: "x.x.x"
            js: "x.x.x"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h5" >}}

Par exemple, pour instrumenter les applications .NET, Python et Node.js, ajoutez la configuration suivante à votre fichier `datadog-values.yaml` :

{{< highlight yaml "hl_lines=5-8" >}}
   datadog:
     apm:
       instrumentation:
         enabled: true
         libVersions: # Add any libraries and versions you want to set
            dotnet: "x.x.x"
            python: "x.x.x"
            js: "x.x.x"
{{< /highlight >}}

{{< /collapse-content >}}


[34]: https://github.com/DataDog/dd-trace-java/releases
[35]: https://github.com/DataDog/dd-trace-js/releases
[36]: https://github.com/DataDog/dd-trace-py/releases
[37]: https://github.com/DataDog/dd-trace-dotnet/releases
[38]: https://github.com/DataDog/dd-trace-rb/releases
[39]: https://github.com/DataDog/dd-trace-php/releases


{{% /tab %}}
{{< /tabs >}}

### Changez le registre d'images par défaut {#change-the-default-image-registry}

Datadog publie des images de bibliothèques d'instrumentation sur gcr.io, Docker Hub et Amazon ECR :

| Langage   | gcr.io                              | hub.docker.com                              | gallery.ecr.aws                            |
|------------|-------------------------------------|---------------------------------------------|-------------------------------------------|
| Java       | [gcr.io/datadoghq/dd-lib-java-init][15]   | [hub.docker.com/r/datadog/dd-lib-java-init][16]   | [gallery.ecr.aws/datadog/dd-lib-java-init][17]   |
| Node.js    | [gcr.io/datadoghq/dd-lib-js-init][18]     | [hub.docker.com/r/datadog/dd-lib-js-init][19]     | [gallery.ecr.aws/datadog/dd-lib-js-init][20]     |
| Python     | [gcr.io/datadoghq/dd-lib-python-init][21] | [hub.docker.com/r/datadog/dd-lib-python-init][22] | [gallery.ecr.aws/datadog/dd-lib-python-init][23] |
| .NET       | [gcr.io/datadoghq/dd-lib-dotnet-init][24] | [hub.docker.com/r/datadog/dd-lib-dotnet-init][25] | [gallery.ecr.aws/datadog/dd-lib-dotnet-init][26] |
| Ruby       | [gcr.io/datadoghq/dd-lib-ruby-init][27] | [hub.docker.com/r/datadog/dd-lib-ruby-init][28] | [gallery.ecr.aws/datadog/dd-lib-ruby-init][29] |
| PHP        | [gcr.io/datadoghq/dd-lib-php-init][30] | [hub.docker.com/r/datadog/dd-lib-php-init][31] | [gallery.ecr.aws/datadog/dd-lib-php-init][32] |

La variable d'environnement `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` dans la configuration du Datadog Cluster Agent spécifie le registre utilisé par le Contrôleur d'Admission. La valeur par défaut est `gcr.io/datadoghq`.

Vous pouvez récupérer le SDK depuis un registre différent en le changeant pour `docker.io/datadog`, `public.ecr.aws/datadog`, ou une autre URL si vous hébergez les images dans un registre de conteneurs local.

Pour obtenir des instructions sur la modification de votre registre de conteneurs, consultez [Changing Your Container Registry][33].

### Utilisez un registre de conteneurs privé {#use-a-private-container-registry}

Si votre organisation n'autorise pas les récupérations directes depuis des registres publics (comme `gcr.io`, `docker.io`, ou `public.ecr.aws`), vous pouvez héberger les images Datadog requises en interne et configurer le Contrôleur d'Admission pour les utiliser.

Pour utiliser SSI avec un registre de conteneurs privé :

1. Suivez [ces instructions][34] pour mettre en miroir les images de conteneurs de Datadog sur votre registre privé.

   Vous n'avez besoin que des images pour les langages que vous instrumentez. Si vous n'êtes pas certain de celles dont vous avez besoin, voici une configuration de base couvrant la plupart des cas d'utilisation :

   - `apm-inject`
   - `dd-lib-java-init`
   - `dd-lib-python-init`
   - `dd-lib-dotnet-init`
   - `dd-lib-php-init`
   - `dd-lib-ruby-init`
   - `dd-lib-js-init`

   Vous pouvez trouver ces images sur [gcr.io][12], [Docker Hub][13], ou [Amazon ECR Public Gallery][14].

2. Taguez les images selon votre configuration.

   Les versions que vous reflétez doivent correspondre aux versions configurées dans vos charges de travail, qui peuvent être définies de l'une des manières suivantes :
   - globalement dans la configuration de l'Agent en utilisant `ddTraceVersions`, ou
   - per-pod utilisant des annotations comme `admission.datadoghq.com/java-lib.version`.

   Si aucune version n'est explicitement configurée, la version par défaut (`0`) est utilisée.

   Exemple :

   ```
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "default-target"
           ddTraceVersions:
             java: "1"
             python: "3"
   ```

   Cette configuration nécessite les tags d'image suivantes :
   - `apm-inject:0`
   - `dd-lib-java-init:1`
   - `dd-lib-python-init:3`

3. Mettez à jour la configuration de l'Agent de Cluster pour utiliser votre registre privé.

   Définissez la variable d'environnement `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` dans la configuration de votre Agent de Cluster pour utiliser votre registre privé.

Pour obtenir plus de détails sur la modification de votre registre de conteneurs, consultez [Changing Your Container Registry][33].

### Utilisation d'une Interface de Réseau de Conteneurs sur EKS {#using-a-container-network-interface-on-eks}

Lors de l'utilisation d'un CNI comme Calico, les nœuds du plan de contrôle ne peuvent pas initier de connexions réseau au Contrôleur d'Admission de Datadog et signalent une erreur "L'adresse n'est pas autorisée".
Pour utiliser l'instrumentation à Étape Unique, modifiez l'Agent de Cluster de Datadog avec le paramètre `useHostNetwork: true`.

```
datadog:
  ...

clusterAgent:
  useHostNetwork: true

  admissionController:
    ...
```

## Supprimez l'instrumentation APM à Étape Unique de votre Agent {#remove-single-step-apm-instrumentation-from-your-agent}

Si vous ne souhaitez pas collecter de données de trace pour un service, un hôte, une VM ou un conteneur particulier, complétez les étapes suivantes :

### Supprimez l'instrumentation pour des services spécifiques {#remove-instrumentation-for-specific-services}

Pour supprimer l'instrumentation APM et arrêter l'envoi de traces d'un service spécifique, vous pouvez faire l'une des choses suivantes :

#### Utilisez des règles d'instrumentation pour cibler des charges de travail spécifiques (recommandé) {#use-instrumentation-rules-to-target-specific-workloads-recommended}

Avec les règles d'instrumentation (disponibles pour l'Agent v7.64+), vous pouvez activer et désactiver le traçage pour des applications spécifiques. [Voir les détails de configuration ici](#advanced-options).

#### Utilisez le Contrôleur d'Admission de Datadog {#use-the-datadog-admission-controller}

En alternative, ou pour une version de l'agent qui ne prend pas en charge les règles d'instrumentation, vous pouvez également désactiver la mutation de pod en ajoutant une étiquette à votre pod.

<div class="alert alert-danger">En plus de désactiver SSI, les étapes suivantes désactivent d'autres webhooks de mutation. Utilisez avec précaution.</div>

1. Définissez l'étiquette `admission.datadoghq.com/enabled:` sur `"false"` pour la spécification du pod :
   ```yaml
   spec:
     template:
       metadata:
         labels:
           admission.datadoghq.com/enabled: "false"
   ```
2. Appliquez la configuration :
   ```shell
   kubectl apply -f /path/to/your/deployment.yaml
   ```
3. Redémarrez les services pour lesquels vous souhaitez supprimer l'instrumentation.

### Supprimez APM pour tous les services sur l'infrastructure {#remove-apm-for-all-services-on-the-infrastructure}

Pour arrêter la production de traces, désinstallez APM et redémarrez l'infrastructure :

Le fichier que vous devez configurer dépend de si vous avez activé l'instrumentation par étape unique avec Datadog Operator ou Helm :

{{< tabs >}}
{{% tab "Operator Datadog" %}}

1. Définissez `instrumentation.enabled=false` dans `datadog-agent.yaml` :
   ```yaml
   features:
     apm:
       instrumentation:
         enabled: false
   ```

2. Déployez l'Agent Datadog avec le fichier de configuration mis à jour :
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
{{% /tab %}}

{{% tab "Helm" %}}

1. Définissez `instrumentation.enabled=false` dans `datadog-values.yaml` :
   ```yaml
   datadog:
     apm:
       instrumentation:
         enabled: false
   ```

2. Exécutez la commande suivante :
   ```shell
   helm upgrade datadog-agent -f datadog-values.yaml datadog/datadog
   ```
{{% /tab %}}
{{< /tabs >}}

## Meilleures pratiques {#best-practices}

Après avoir activé SSI, tous les processus pris en charge dans le cluster sont automatiquement instrumentés et commencent à produire des traces en quelques minutes.

Pour contrôler où APM est activé et réduire la surcharge, envisagez les meilleures pratiques suivantes.

{{% collapse-content title="Utilisez des étiquettes opt-in pour un déploiement contrôlé d'APM" level="h3" expanded=false id="id-for-anchoring" %}}

#### Instrumentation par défaut vs. opt-in {#default-vs-opt-in-instrumentation}
| Mode    | Comportement    | Quand utiliser |
| ---  | ----------- | ----------- |
| Par défaut | Tous les processus pris en charge dans le cluster sont instrumentés. | Petits clusters ou prototypes. |
| Opt-in | Utilisez [les règles d'instrumentation][4] pour restreindre l'instrumentation à des espaces de noms ou des pods spécifiques. | Clusters de production, déploiements progressifs ou cas d'utilisation sensibles aux coûts. |

#### Exemple : Activez l'instrumentation pour des pods spécifiques {#example-enable-instrumentation-for-specific-pods}

1. Ajoutez une étiquette significative (par exemple, `datadoghq.com/apm-instrumentation: "enabled"`) aux métadonnées de déploiement et au modèle de pod.

   ```
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: checkout-api
     labels:
       app: checkout-api
       datadoghq.com/apm-instrumentation: "enabled"   # opt-in label (cluster-wide)
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: checkout-api
     template:
       metadata:
         labels:
           app: checkout-api
           datadoghq.com/apm-instrumentation: "enabled"   # opt-in label must be on *template*, too
           # Unified Service Tags (recommended)
           tags.datadoghq.com/service: "checkout-api"
           tags.datadoghq.com/env:     "prod"
           tags.datadoghq.com/version: "2025-06-10"
       spec:
         containers:
           - name: api
             image: my-registry/checkout:latest
             ports:
               - containerPort: 8080
   ```

2. Dans votre configuration Helm de l'Agent Datadog, activez SSI et utilisez `podSelector` pour injecter uniquement dans les pods avec l'étiquette d'opt-in correspondante.

   ```
     apm:
       instrumentation:
         enabled: true
         targets:
           - name: apm-instrumented
             podSelector:
               matchLabels:
                 datadoghq.com/apm-instrumentation: "enabled"
   ```

Voir les [règles d'instrumentation][4] pour des exemples supplémentaires.

{{% /collapse-content %}}


{{% collapse-content title="Contrôlez quels SDK Datadog sont chargés" level="h3" expanded=false id="id-for-anchoring" %}}

Utilisez `ddTraceVersions` dans votre configuration Helm de l'Agent pour contrôler à la fois la langue et la version du SDK Datadog. Cela empêche le téléchargement de SDK inutiles, ce qui minimise l'empreinte du conteneur d'initialisation, réduit la taille de l'image et permet des mises à niveau de traceurs plus délibérées (par exemple, pour répondre aux exigences de conformité ou simplifier le débogage).

#### Exemple : Spécifiez un SDK Java pour un espace de noms {#example-specify-a-java-sdk-for-a-namespace}

Seules les applications Java s'exécutent dans l'espace de noms `login-service`. Pour éviter de télécharger d'autres SDK, configurez l'Agent pour cibler cet espace de noms et injecter uniquement la version 1.48.2 du SDK Java.


```
targets:
  - name: login-service
    namespaceSelector:
      matchNames: ["login-service"]
    ddTraceVersions:
      java: "1.48.2"    # pin version
```

#### Configuration par défaut {#default-configuration}

Si un pod ne correspond à aucune règle `ddTraceVersions`, la cible par défaut s'applique.

```
targets:
  - name: default-target          # tag any pod *without* an override
    ddTraceVersions:
      java:   "1"   # stay on latest v1.x
      python: "3"   # stay on latest v3.x
      js:     "5"   # NodeJS
      php:    "1"
      dotnet: "3"
```

{{% /collapse-content %}}

## Dépannage {#troubleshooting}

Si vous rencontrez des problèmes pour activer APM avec SSI, consultez le [guide de dépannage SSI][35].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: /fr/tracing/glossary/#instrumentation
[4]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes/?tab=agentv764recommended#configure-instrumentation-for-namespaces-and-pods
[5]: /fr/getting_started/tagging/unified_service_tagging/?tab=kubernetes#containerized-environment
[7]: /fr/tracing/trace_collection/library_config/
[11]: https://app.datadoghq.com/fleet/install-agent/latest?platform=kubernetes
[12]: https://gcr.io/datadoghq
[13]: https://hub.docker.com/u/datadog
[14]: https://gallery.ecr.aws/datadog
[15]: http://gcr.io/datadoghq/dd-lib-java-init
[16]: http://hub.docker.com/r/datadog/dd-lib-java-init
[17]: http://gallery.ecr.aws/datadog/dd-lib-java-init
[18]: http://gcr.io/datadoghq/dd-lib-js-init
[19]: http://hub.docker.com/r/datadog/dd-lib-js-init
[20]: http://gallery.ecr.aws/datadog/dd-lib-js-init
[21]: http://gcr.io/datadoghq/dd-lib-python-init
[22]: http://hub.docker.com/r/datadog/dd-lib-python-init
[23]: http://gallery.ecr.aws/datadog/dd-lib-python-init
[24]: http://gcr.io/datadoghq/dd-lib-dotnet-init
[25]: http://hub.docker.com/r/datadog/dd-lib-dotnet-init
[26]: http://gallery.ecr.aws/datadog/dd-lib-dotnet-init
[27]: http://gcr.io/datadoghq/dd-lib-ruby-init
[28]: http://hub.docker.com/r/datadog/dd-lib-ruby-init
[29]: http://gallery.ecr.aws/datadog/dd-lib-ruby-init
[30]: http://gcr.io/datadoghq/dd-lib-php-init
[31]: http://hub.docker.com/r/datadog/dd-lib-php-init
[32]: http://gallery.ecr.aws/datadog/dd-lib-php-init
[33]: /fr/containers/guide/changing_container_registry/
[34]: /fr/containers/guide/sync_container_images/#copy-an-image-to-another-registry-using-crane
[35]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[36]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/
[37]: /fr/containers/kubernetes/csi_driver/
[41]: /fr/tracing/guide/injectors/