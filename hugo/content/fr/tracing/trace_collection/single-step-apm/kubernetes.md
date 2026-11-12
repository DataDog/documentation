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
  text: En savoir plus sur l'utilisation des ressources des conteneurs d'initialisation
- link: /tracing/guide/local_sdk_injection
  tag: Documentation
  text: Instrumentez vos applications à l'aide de l'injection de SDK locale
- link: https://learn.datadoghq.com/courses/configuring-ssi-k8s
  tag: Centre d'apprentissage
  text: Configuration de l'instrumentation en une seule étape sur Kubernetes
title: Instrumentation APM en une seule étape sur Kubernetes
type: multi-code-lang
---
## Présentation {#overview}

Dans un environnement Kubernetes, utilisez l'instrumentation en une seule étape (SSI) pour APM afin d'installer le Datadog Agent et [instrumenter][3] vos applications avec les SDK Datadog en une seule étape.

{{< skill-callout
    title="Configurer APM avec un agent"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## Prérequis {#requirements}

- Kubernetes v1.20+.
- [`Helm`][1] pour déployer le Datadog Operator.
- [`Kubectl` CLI][2] pour installer le Datadog Agent.
- Compatibilité de l'environnement confirmée selon le [guide de compatibilité de l'instrumentation en une seule étape][36].


## Activez APM sur vos applications {#enable-apm-on-your-applications}

<div class="alert alert-info">L'instrumentation en une seule étape n'instrumente pas les applications dans l'espace de nommage où le Datadog Agent est installé. Installez le Datadog Agent dans un espace de nommage distinct où vous n'exécutez pas vos applications.</div>

L'activation de l'instrumentation en une seule étape sur l'ensemble de votre cluster envoie automatiquement les traces de toutes les applications écrites dans les langages pris en charge.

**Remarque :** Pour instrumenter uniquement des espaces de nommage ou des pods spécifiques, consultez le ciblage de charge de travail dans les [Options avancées](#advanced-options).

Utilisez les commandes suivantes pour activer SSI, en remplaçant :

- `<YOUR_DD_API_KEY>` par votre [clé d'API Datadog][40]
- `<YOUR_CLUSTER_NAME>` par le nom de votre cluster
- `<DATADOG_SITE>` par votre [Datadog site][43] : {{< region-param key="dd_site" code="true" >}}

Les exemples activent SSI avec `apm.instrumentation.enabled: true` et utilisent l'espace de nommage `datadog`. Remplacez l'espace de nommage si le Datadog Agent est installé ailleurs.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Installez le Datadog Operator et créez un secret contenant votre clé d'API :

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   helm install datadog-operator datadog/datadog-operator --namespace datadog --create-namespace
   kubectl create secret generic datadog-secret --from-literal api-key=<YOUR_DD_API_KEY> -n datadog
   ```

1. Créez un fichier `datadog-agent.yaml` qui active l'instrumentation APM :

   ```yaml
   kind: "DatadogAgent"
   apiVersion: "datadoghq.com/v2alpha1"
   metadata:
     name: "datadog"
     namespace: "datadog"
   spec:
     global:
       clusterName: "<YOUR_CLUSTER_NAME>"
       site: "<DATADOG_SITE>"
       credentials:
         apiSecret:
           secretName: "datadog-secret"
           keyName: "api-key"
     features:
       apm:
         instrumentation:
           enabled: true
   ```

   Pour épingler des versions spécifiques du SDK au lieu d'installer la dernière, ajoutez un bloc `targets` avec `ddTraceVersions`. Consultez [Cibler des charges de travail spécifiques](#target-specific-workloads) pour le schéma complet.

1. Déployez le Datadog Agent :

   ```shell
   kubectl apply -f datadog-agent.yaml
   ```

Pour mettre à jour une installation existante du Datadog Operator, ajoutez la configuration SSI à votre `datadog-agent.yaml` et réappliquez-la avec `kubectl -n datadog apply -f datadog-agent.yaml`.

{{% /tab %}}
{{% tab "Helm" %}}

1. Ajoutez le dépôt Helm Datadog, créez l'espace de nommage `datadog`, et créez un secret qui contient votre clé d'API :

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   kubectl create namespace datadog
   kubectl -n datadog create secret generic datadog-secret --from-literal api-key=<YOUR_DD_API_KEY>
   ```

1. Créez un fichier `datadog-values.yaml` qui active l'instrumentation APM :

   ```yaml
   datadog:
     site: "<DATADOG_SITE>"
     clusterName: "<YOUR_CLUSTER_NAME>"
     apiKeyExistingSecret: "datadog-secret"
     apm:
       instrumentation:
         enabled: true
   ```

   Pour épingler des versions spécifiques du SDK au lieu d'installer la dernière, ajoutez un bloc `targets` avec `ddTraceVersions`. Consultez [Cibler des charges de travail spécifiques](#target-specific-workloads) pour le schéma complet.

1. Déployez le Datadog Agent :

   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog --namespace datadog
   ```

Pour mettre à jour une installation Helm existante, ajoutez la configuration SSI à votre `datadog-values.yaml` et exécutez `helm upgrade -n datadog -f datadog-values.yaml <RELEASE_NAME> datadog/datadog`.

{{% /tab %}}
{{< /tabs >}}

Après avoir déployé le Datadog Agent, redémarrez vos applications.

<div class="alert alert-info">Le SSI ajoute un léger délai de démarrage aux applications instrumentées. Si ce surcoût n'est pas acceptable pour votre cas d'utilisation, contactez <a href="/help/">Datadog Support</a>.</div>

### Générez la configuration depuis Datadog {#generate-the-configuration-from-datadog}

Pour générer la configuration via l'interface utilisateur, accédez à la page [Install the Datadog Agent on Kubernetes][11] et suivez les instructions à l'écran pour choisir votre méthode d'installation et votre clé d'API. Dans la section {{< ui >}}Configure `datadog-agent.yaml`{{< /ui >}}, accédez à {{< ui >}}Additional configuration{{< /ui >}} > {{< ui >}}Application Observability{{< /ui >}}, et activez {{< ui >}}APM Instrumentation{{< /ui >}}. Déployez ensuite le Datadog Agent en utilisant le fichier de configuration généré.

{{< img src="tracing/trace_collection/k8s-apm-instrumentation-toggle.jpg" alt="Le bloc de configuration pour installer le Datadog Agent sur Kubernetes via l'application Datadog" style="width:100%;" >}}

## Vérifiez l'installation {#verify-the-installation}

1. Vérifiez que les pods du Datadog Agent sont en cours d'exécution :

   ```shell
   kubectl get pods -n datadog
   ```

1. Vérifiez que le Datadog Agent est sain et que l'APM Agent est en cours d'exécution. Remplacez `<AGENT_POD>` par le nom d'un pod du Datadog Agent sur un nœud :

   ```shell
   kubectl exec <AGENT_POD> -n datadog -- agent status
   ```

   Vérifiez la section **APM Agent** de la sortie.

1. Vérifiez que l'injection a atteint un pod d'application instrumenté. Remplacez `<APP_POD>` et `<APP_NAMESPACE>` par l'un des pods de votre application et son espace de nommage :

   ```shell
   kubectl get pod <APP_POD> -n <APP_NAMESPACE> -o jsonpath='{.spec.initContainers[*].name}'
   ```

   La sortie inclut `datadog-init-apm-inject` et un conteneur `datadog-lib-<language>-init` pour chaque langage instrumenté.

1. Une fois que vos applications reçoivent du trafic, confirmez que vos services apparaissent sur la [APM Services page][42]. S'ils n'apparaissent pas en quelques minutes, suivez le [SSI troubleshooting guide][35].

## Configurez les tags de service unifiés {#configure-unified-service-tags}

Les Unified Service Tags (USTs) appliquent des tags cohérents aux traces, aux métriques et aux logs, facilitant ainsi la navigation et la corrélation de vos données d'observabilité. Vous pouvez configurer les UST via l'extraction automatique des étiquettes (recommandé), via une configuration explicite avec `ddTraceConfigs`, ou dans les manifestes de déploiement.

<div class="alert alert-warning">
Si vous utilisez <a href="/agent/remote_config/">Remote Configuration</a>, <a href="#recommended-configure-usts-through-automatic-label-extraction">l'extraction automatique des étiquettes</a> n'est pas compatible. Vous devez <a href="#configure-usts-explicitly-with-ddtraceconfigs">configurer explicitement les UST</a> en utilisant <code>ddTraceConfigs</code>.
</div>

### (Recommandé) Configurez les UST via l'extraction automatique des étiquettes {#recommended-configure-usts-through-automatic-label-extraction}

Avec SSI, vous pouvez extraire automatiquement les valeurs UST à partir des étiquettes et des métadonnées des pods sans modifier les déploiements individuels. Pour ce faire, configurez `kubernetesResourcesLabelsAsTags` pour faire correspondre vos étiquettes Kubernetes existantes aux tags de service Datadog.

**Remarque :** Cette méthode n'est pas compatible avec Remote Configuration. Si vous utilisez Remote Configuration, consultez [Configurer explicitement les UST avec ddTraceConfigs](#configure-usts-explicitly-with-ddtraceconfigs).

#### Prérequis {#prerequisites}

| Composant | Version minimale  |
|-----------|------------------|
| `datadog-agent` | 7.69        |
| `datadog-operator` | 1.16.0   |
| `datadog-helm-chart` | 3.120.0 |

#### Configuration {#configuration}

Remplacez `app.kubernetes.io/name` dans l'exemple suivant par n'importe quelle étiquette contenant le nom de votre service (par exemple, `service.kubernetes.io/name` ou `component`). Vous pouvez configurer plusieurs étiquettes de cette manière.

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

Avec cette configuration, Datadog définit automatiquement le tag `service` en utilisant la valeur de l'étiquette `app.kubernetes.io/name` pour toute charge de travail instrumentée incluant cette étiquette.

### Configurer explicitement les UST avec ddTraceConfigs {#configure-usts-explicitly-with-ddtraceconfigs}

Dans la plupart des cas, la configuration automatique est suffisante. Cependant, si vous avez besoin d'un contrôle granulaire sur les paramètres pour des charges de travail spécifiques, utilisez `ddTraceConfigs` pour mapper explicitement les étiquettes aux configurations de service :

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


### Configurer les UST dans les manifestes de déploiement {#configure-usts-in-deployment-manifests}

Si votre configuration n'utilise pas d'étiquettes adaptées à l'extraction d'UST, vous pouvez définir les UST directement dans vos manifestes de déploiement à l'aide de variables d'environnement. Cette approche nécessite de modifier chaque déploiement individuellement, mais offre un contrôle précis.

Pour des instructions complètes, consultez [setting USTs for Kubernetes services][5].

## Activer les produits et fonctionnalités dépendants du SDK {#enable-sdk-dependent-products-and-features}

Une fois que SSI a chargé le SDK Datadog dans vos applications et activé le traçage distribué, vous pouvez configurer des produits supplémentaires qui dépendent du SDK :

{{< ssi-products >}}

Utilisez l'une des méthodes de configuration suivantes :

- **[Configurer avec le ciblage de charge de travail (recommandé)](#target-specific-workloads)** :

  Par défaut, l'instrumentation en une seule étape instrumente tous les services dans tous les espaces de nommage. Utilisez le ciblage de charge de travail pour limiter l'instrumentation à des espaces de nommage, des pods ou des charges de travail spécifiques, et appliquez des configurations personnalisées.

- **[Définir des variables d'environnement][7]** :

  Activez des produits en définissant des variables d'environnement directement dans la configuration de votre application.

## Options avancées {#advanced-options}

Utilisez les options avancées suivantes pour personnaliser le comportement de l'instrumentation en une seule étape dans votre environnement. Ces paramètres sont facultatifs et ne sont généralement nécessaires que dans des configurations spécialisées.

### Configurer les modes d'injection {#configure-injection-modes}

SSI prend en charge plusieurs modes d'injection, qui contrôlent la manière dont l'injecteur et les fichiers de bibliothèque APM sont fournis à vos conteneurs d'application. Vous n'avez généralement pas besoin de configurer ce paramètre manuellement. Envisagez de l'ajuster si vous remarquez des délais de démarrage de pod importants ou une utilisation des ressources (CPU, mémoire) plus élevée que prévu lors de l'initialisation du pod. Pour en savoir plus sur le fonctionnement de l'injecteur, consultez [Comportement de l'injecteur avec l'instrumentation en une étape][41].


| Mode | Description | Exigences |
|------|-------------|--------------|
| `init_container` | Utilise des conteneurs d'initialisation pour copier les fichiers de l'injecteur et de la bibliothèque APM dans les conteneurs d'application. | Le Datadog Agent déployé avec Helm Chart ou Datadog Operator |
| `csi` | **En préversion.** Monte les fichiers de l'injecteur et de la bibliothèque APM à l'aide du [Datadog CSI driver][37]. Réduit le temps de démarrage du pod par rapport au mode conteneur d'initialisation. | Agent 7.76.0+, CSI driver 1.2.0+, Helm Chart 3.178.1+ ou Datadog Operator 1.25.0+ |

Avant d'utiliser le mode `csi`, installez et activez le Datadog CSI driver. Si vous effectuez le déploiement avec Helm, définissez également `datadog.csi.enabled: true` dans votre `datadog-values.yaml`. Consultez la [documentation du pilote CSI][37] pour connaître les étapes d'installation et les exigences spécifiques à l'environnement, telles que GKE Autopilot.

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
{{% tab "Datadog Operator" %}}

Pour définir le mode d'injection à l'échelle du cluster, ajoutez `injectionMode` à votre `datadog-agent.yaml` :

```yaml
features:
  apm:
    instrumentation:
      injectionMode: <mode>
```

Valeurs prises en charge : `init_container`, `csi`.

Si vous utilisez une version de Datadog Operator antérieure à 1.25.0, utilisez l'annotation [pod](#configure-injection-mode-per-pod) pour remplacer le mode d'injection pour des pods spécifiques.

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

Par défaut, SSI instrumente tous les services dans tous les espaces de noms de votre cluster. Selon votre version de l'Agent, utilisez l'une des méthodes de configuration suivantes pour affiner les services instrumentés et la manière dont ils le sont.

{{< tabs >}}

{{% tab "Agent v7.64+ (Recommandé)" %}}

Créez des blocs de ciblage avec l'étiquette `targets` pour spécifier les charges de travail à instrumenter et les configurations à appliquer.

Chaque bloc cible possède les clés suivantes :

| Clé             | Description |
|------------------|-------------|
| `name`            | Le nom du bloc cible. Cela n'a aucun effet sur l'état de la surveillance et est utilisé uniquement comme métadonnée. |
| `namespaceSelector` | Le(s) espace(s) de noms à instrumenter. Spécifiez en utilisant un ou plusieurs des éléments suivants :<br> - `matchNames` : Une liste d'un ou plusieurs nom(s) d'espace de noms. <br> - `matchLabels` : Une liste d'une ou plusieurs étiquette(s) définies en `{key,value}` paires. <br> - `matchExpressions` : Une liste d'exigences de sélecteur d'espace de noms. <br><br> Les espaces de noms doivent répondre à tous les critères pour correspondre. Pour plus de détails, consultez la [documentation sur les sélecteurs Kubernetes][10].|
| `podSelector`     | Le(s) pod(s) à instrumenter. Spécifiez en utilisant un ou plusieurs des éléments suivants : <br> - `matchLabels` : Une liste d'une ou plusieurs étiquette(s) définies en `{key,value}` paires. <br> - `matchExpressions` : Une liste d'exigences de sélecteur de pod. <br><br> Les pods doivent répondre à tous les critères pour correspondre. Pour plus de détails, consultez la [documentation sur les sélecteurs Kubernetes][10]. |
| `ddTraceVersions` | La version du Datadog APM SDK [9] à utiliser pour chaque langage. |
| `ddTraceConfigs`  | Configurations du SDK APM qui permettent de définir des [Unified Service Tags][8], d'activer des [produits dépendants du SDK](#enable-sdk-dependent-products-and-features) au-delà du traçage, et de personnaliser d'autres [paramètres APM][14]. |

Le fichier que vous devez configurer dépend de la manière dont vous avez activé l'instrumentation en une étape (Single Step Instrumentation) :
- Si vous avez activé SSI avec Datadog Operator, modifiez `datadog-agent.yaml`.
- Si vous avez activé SSI avec Helm, modifiez `datadog-values.yaml`.

**Remarque** : Les cibles sont évaluées dans l'ordre ; la première correspondance est prioritaire.

#### Exemples de configurations {#example-configurations}

Examinez les exemples suivants démontrant comment sélectionner des services spécifiques :

{{< collapse-content title="Exemple 1 : Activer tous les espaces de noms sauf un" level="h5" >}}

Cette configuration :
- active APM pour tous les espaces de noms sauf l'espace de noms `jenkins`.
  - **Remarque** : utilisez `enabledNamespaces` pour désactiver pour tous les espaces de nom sauf ceux listés.
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

{{< collapse-content title="Exemple 2 : Instrumenter un sous-ensemble d'espaces de noms, en faisant correspondre les noms et les étiquettes" level="h5" >}}

Cette configuration crée deux blocs de cibles :

- Le premier bloc (nommé `login-service_namespace`) :
  - active APM pour les services dans l'espace de noms `login-service`.
  - indique à Datadog d'instrumenter les services dans cet espace de noms avec la version par défaut du SDK Java.
  - définit la variable d'environnement `DD_PROFILING_ENABLED` pour ce groupe de cibles
- Le second bloc (nommé `billing-service_apps`)
  - active APM pour les services dans le ou les espaces de noms avec l'étiquette `app:billing-service`.
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

{{< collapse-content title="Exemple 3 : Instrumenter différentes charges de travail avec différents traceurs" level="h5" >}}

Cette configuration effectue les opérations suivantes :
- active APM pour les pods avec les étiquettes suivantes :
  - `app:db-user`, qui marque les pods exécutant l'application `db-user`.
  - `webserver:routing`, qui marque les pods exécutant l'application `request-router`.
- indique à Datadog d'utiliser les versions par défaut des SDK Datadog Tracer.
- définit les variables d'environnement Datadog à appliquer à chaque groupe cible et à configurer les SDK.

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

{{< collapse-content title="Exemple 4 : Instrumenter un pod au sein d'un espace de noms" level="h5" >}}

Cette configuration :
- active APM pour les pods étiquetés `app:password-resolver` dans l'espace de noms `login-service`.
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

{{< collapse-content title="Exemple 5 : Instrumenter un sous-ensemble de pods en utilisant <code>matchExpressions</code>" level="h5" >}}

Cette configuration active APM pour tous les pods à l'exception de ceux qui possèdent l'une des étiquettes `app=app1` ou `app=app2`.

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

{{< collapse-content title="Exemple 6 : Activer des produits supplémentaires avec <code>ddTraceConfigs</code>" level="h5" >}}

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

Pour une liste complète des produits que vous pouvez activer via SSI, consultez [Activer les produits et fonctionnalités dépendants du SDK](#enable-sdk-dependent-products-and-features).

{{< /collapse-content >}}

[8]: /fr/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[9]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/#tracer-libraries
[10]: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#resources-that-support-set-based-requirements
[11]: /fr/profiler/
[12]: /fr/security/application_security/
[14]: /fr/tracing/trace_collection/library_config/

{{% /tab %}}

{{% tab "Agent <=v7.63 (Legacy)" %}}

#### Activer ou désactiver l'instrumentation pour les espaces de noms {#enable-or-disable-instrumentation-for-namespaces}

Vous pouvez choisir d'activer ou de désactiver l'instrumentation pour les applications dans des espaces de noms spécifiques. Vous pouvez uniquement définir enabledNamespaces ou disabledNamespaces, pas les deux.

Le fichier que vous devez configurer dépend de si vous avez activé l'instrumentation en une étape avec Datadog Operator ou Helm :

{{< collapse-content title="Datadog Operator" level="h5" >}}

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

#### Spécifiez les versions du SDK {#specify-sdk-versions}

<div class="alert alert-info">À partir de Datadog Cluster Agent v7.52.0+, vous pouvez instrumenter automatiquement un sous-ensemble de vos applications, en fonction des SDK que vous spécifiez.</div>

Spécifiez les SDK Datadog et leurs versions pour instrumenter automatiquement les applications écrites dans ces langages. Vous pouvez configurer cela de deux manières, qui sont appliquées dans l'ordre de priorité suivant :

1. [Spécifiez au niveau du service](#specify-at-the-service-level), ou
2. [Spécifiez au niveau du cluster](#specify-at-the-cluster-level).

**Par défaut** : Si vous ne spécifiez aucune version de bibliothèque, les applications écrites dans les langages pris en charge sont automatiquement instrumentées en utilisant les dernières versions du SDK.

##### Spécifiez au niveau du service {#specify-at-the-service-level}

Pour instrumenter automatiquement les applications dans des pods spécifiques, ajoutez l'annotation de langage appropriée et la version de la bibliothèque pour votre application dans votre spécification de pod :

| Langage   | Annotation de pod                                                        |
|------------|-----------------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"`   |
| Node.js    | `admission.datadoghq.com/js-lib.version: "<CONTAINER IMAGE TAG>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<CONTAINER IMAGE TAG>"` |
| .NET       | `admission.datadoghq.com/dotnet-lib.version: "<CONTAINER IMAGE TAG>"` |
| Ruby       | `admission.datadoghq.com/ruby-lib.version: "<CONTAINER IMAGE TAG>"`   |
| PHP        | `admission.datadoghq.com/php-lib.version: "<CONTAINER IMAGE TAG>"`   |

Remplacez `<CONTAINER IMAGE TAG>` par la version de bibliothèque souhaitée. Les versions disponibles sont listées dans les [registres de conteneurs Datadog](#change-the-default-image-registry) et les dépôts de code source du traceur pour chaque langage :

- [Java][34]
- [Node.js][35]
- [Python][36]
- [.NET][37]
- [Ruby][38]
- [PHP][39]

<div class="alert alert-danger">Soyez prudent lors de l'utilisation du tag <code>latest</code> car les versions majeures des bibliothèques peuvent introduire des ruptures de compatibilité.</div>

Par exemple, pour instrumenter automatiquement des applications Java :

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

Si vous n'activez pas l'instrumentation automatique pour des pods spécifiques à l'aide d'annotations, vous pouvez spécifier les langages à instrumenter à l'échelle du cluster via la configuration SSI. Lorsque `apm.instrumentation.libVersions` est défini, seules les applications écrites dans les langages spécifiés sont instrumentées, en utilisant les versions de bibliothèque indiquées.

Le fichier que vous devez configurer dépend de si vous avez activé l'instrumentation en une étape avec Datadog Operator ou Helm :

{{< collapse-content title="Datadog Operator" level="h6" >}}

Par exemple, pour instrumenter des applications .NET, Python et Node.js, ajoutez la configuration suivante à votre fichier `datadog-agent.yaml` :

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

{{< collapse-content title="Helm" level="h6" >}}

Par exemple, pour instrumenter des applications .NET, Python et Node.js, ajoutez la configuration suivante à votre fichier `datadog-values.yaml` :

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

### Modifier le registre d'images par défaut {#change-the-default-image-registry}

Datadog publie les images des bibliothèques d'instrumentation sur gcr.io, Docker Hub et Amazon ECR :

| Langage   | gcr.io                              | hub.docker.com                              | gallery.ecr.aws                            |
|------------|-------------------------------------|---------------------------------------------|-------------------------------------------|
| Java       | [gcr.io/datadoghq/dd-lib-java-init][15]   | [hub.docker.com/r/datadog/dd-lib-java-init][16]   | [gallery.ecr.aws/datadog/dd-lib-java-init][17]   |
| Node.js    | [gcr.io/datadoghq/dd-lib-js-init][18]     | [hub.docker.com/r/datadog/dd-lib-js-init][19]     | [gallery.ecr.aws/datadog/dd-lib-js-init][20]     |
| Python     | [gcr.io/datadoghq/dd-lib-python-init][21] | [hub.docker.com/r/datadog/dd-lib-python-init][22] | [gallery.ecr.aws/datadog/dd-lib-python-init][23] |
| .NET       | [gcr.io/datadoghq/dd-lib-dotnet-init][24] | [hub.docker.com/r/datadog/dd-lib-dotnet-init][25] | [gallery.ecr.aws/datadog/dd-lib-dotnet-init][26] |
| Ruby       | [gcr.io/datadoghq/dd-lib-ruby-init][27] | [hub.docker.com/r/datadog/dd-lib-ruby-init][28] | [gallery.ecr.aws/datadog/dd-lib-ruby-init][29] |
| PHP        | [gcr.io/datadoghq/dd-lib-php-init][30] | [hub.docker.com/r/datadog/dd-lib-php-init][31] | [gallery.ecr.aws/datadog/dd-lib-php-init][32] |

La variable d'environnement `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` dans la configuration du Cluster Agent de Datadog spécifie le registre utilisé par le contrôleur d'admission. La valeur par défaut est `gcr.io/datadoghq`.

Vous pouvez extraire le SDK depuis un registre différent en le remplaçant par `docker.io/datadog`, `public.ecr.aws/datadog` ou une autre URL si vous hébergez les images dans un registre de conteneurs local.

Pour obtenir des instructions sur la modification de votre registre de conteneurs, consultez [Changing Your Container Registry][33].

### Utilisez un registre de conteneurs privé {#use-a-private-container-registry}

Si votre organisation n'autorise pas les extractions directes depuis des registres publics (tels que `gcr.io`, `docker.io` ou `public.ecr.aws`), vous pouvez héberger les images Datadog requises en interne et configurer le contrôleur d'admission pour les utiliser.

Pour utiliser SSI avec un registre de conteneurs privé :

1. Suivez [ces instructions][34] pour mettre en miroir les images de conteneur de Datadog vers votre registre privé.

   Vous avez seulement besoin des images pour les langages que vous instrumentez. Si vous n'êtes pas sûr de celles dont vous avez besoin, voici une base qui couvre la plupart des cas d'utilisation :

   - `apm-inject`
   - `dd-lib-java-init`
   - `dd-lib-python-init`
   - `dd-lib-dotnet-init`
   - `dd-lib-php-init`
   - `dd-lib-ruby-init`
   - `dd-lib-js-init`

   Vous pouvez trouver ces images sur [gcr.io][12], [Docker Hub][13] ou [Amazon ECR Public Gallery][14].

2. Taguez les images selon votre configuration.

   Les versions que vous mettez en miroir doivent correspondre aux versions configurées dans vos charges de travail, qui peuvent être définies de l'une des manières suivantes :
   - globalement dans la configuration de l'Agent en utilisant `ddTraceVersions`, ou
   - par pod en utilisant des annotations comme `admission.datadoghq.com/java-lib.version`.

   Si aucune version n'est explicitement configurée, la version par défaut (`0`) est utilisée.

   Par exemple :

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

   Cette configuration nécessite les tags d'image suivants :
   - `apm-inject:0`
   - `dd-lib-java-init:1`
   - `dd-lib-python-init:3`

3. Mettez à jour la configuration du Cluster Agent pour utiliser votre registre privé.

   Définissez la variable d'environnement `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` dans votre configuration de Cluster Agent pour utiliser votre registre privé.

Pour plus de détails sur le changement de votre registre de conteneurs, consultez [Changing Your Container Registry][33].

### Utilisation d'une interface réseau de conteneur (CNI) sur EKS {#using-a-container-network-interface-on-eks}

Lors de l'utilisation d'un CNI comme Calico, les nœuds du plan de contrôle ne sont pas en mesure d'initier des connexions réseau vers le contrôleur d'admission de Datadog et signalent une erreur « Address is not allowed ».
Pour utiliser l'instrumentation en une étape, modifiez le Cluster Agent de Datadog avec le paramètre `useHostNetwork: true`.

```
datadog:
  ...

clusterAgent:
  useHostNetwork: true

  admissionController:
    ...
```

## Supprimez l'instrumentation APM en une étape de votre Datadog Agent {#remove-single-step-apm-instrumentation-from-your-agent}

Si vous ne souhaitez pas collecter de données de trace pour un service, un host, une VM ou un conteneur particulier, effectuez les étapes suivantes :

### Supprimer l'instrumentation pour des services spécifiques {#remove-instrumentation-for-specific-services}

Pour supprimer l'instrumentation APM et arrêter l'envoi de traces depuis un service spécifique, vous pouvez effectuer l'une des opérations suivantes :

#### Utilisez des règles d'instrumentation pour cibler des charges de travail spécifiques (recommandé) {#use-instrumentation-rules-to-target-specific-workloads-recommended}

Avec les règles d'instrumentation (disponibles à partir de l'Agent v7.64+), vous pouvez activer et désactiver le traçage pour des applications spécifiques. [Consultez les détails de configuration ici](#advanced-options).

#### Utilisez le contrôleur d'admission Datadog {#use-the-datadog-admission-controller}

En guise d'alternative, ou pour une version de l'agent qui ne prend pas en charge les règles d'instrumentation, vous pouvez également désactiver la mutation de pod en ajoutant une étiquette à votre pod.

<div class="alert alert-danger">En plus de désactiver SSI, les étapes suivantes désactivent d'autres webhooks de mutation. À utiliser avec précaution.</div>

1. Définissez le libellé `admission.datadoghq.com/enabled:` sur `"false"` pour la spécification du pod :
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

### Supprimer APM pour tous les services sur l'infrastructure {#remove-apm-for-all-services-on-the-infrastructure}

Pour arrêter la production de traces, désinstallez APM et redémarrez l'infrastructure :

Le fichier que vous devez configurer dépend de si vous avez activé l'instrumentation en une étape avec Datadog Operator ou Helm :

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Définissez `instrumentation.enabled=false` dans `datadog-agent.yaml` :
   ```yaml
   features:
     apm:
       instrumentation:
         enabled: false
   ```

2. Déployez le Datadog Agent avec le fichier de configuration mis à jour :
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
{{% /tab %}}

{{% tab "Helm" %}}

1. Définissez `instrumentation.enabled=false` dans `datadog-values.yaml` :
   ```yaml
   datadog:
     apm:
       instrumentation:
         enabled: false
   ```

2. Exécutez la commande suivante :
   ```shell
   helm upgrade datadog-agent -f datadog-values.yaml datadog/datadog
   ```
{{% /tab %}}
{{< /tabs >}}

## Bonnes pratiques {#best-practices}

Une fois SSI activé, tous les processus pris en charge dans le cluster sont automatiquement instrumentés et commencent à produire des traces en quelques minutes.

Pour contrôler où APM est activé et réduire la surcharge, tenez compte des bonnes pratiques suivantes.

{{% collapse-content title="Utilisez des libellés opt-in pour un déploiement contrôlé d'APM" level="h3" expanded=false id="opt-in-labels-controlled-apm-rollout" %}}

#### Instrumentation par défaut vs opt-in {#default-vs-opt-in-instrumentation}
| Mode    | Comportement    | Quand l'utiliser |
| ---  | ----------- | ----------- |
| Par défaut | Tous les processus pris en charge dans le cluster sont instrumentés. | Petits clusters ou prototypes. |
| Opt-in | Utilisez les [règles d'instrumentation][4] pour limiter l'instrumentation à des espaces de noms ou des pods spécifiques. | Clusters de production, déploiements progressifs ou cas d'utilisation sensibles aux coûts. |

#### Exemple : Activez l'instrumentation pour des pods spécifiques {#example-enable-instrumentation-for-specific-pods}

1. Ajoutez un libellé significatif (par exemple, `datadoghq.com/apm-instrumentation: "enabled"`) à la fois aux métadonnées du déploiement et au modèle de pod.

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

2. Dans votre configuration Helm du Datadog Agent, activez SSI et utilisez `podSelector` pour injecter uniquement dans les pods avec le libellé opt-in correspondant.

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

Consultez les [règles d'instrumentation][4] pour d'autres exemples.

{{% /collapse-content %}}


{{% collapse-content title="Contrôlez les SDK Datadog chargés" level="h3" expanded=false id="control-loaded-datadog-sdks" %}}

Utilisez `ddTraceVersions` dans votre configuration Agent Helm pour contrôler à la fois la langue et la version du SDK Datadog. Cela évite le téléchargement de SDK inutiles, ce qui minimise l'empreinte des conteneurs d'initialisation, réduit la taille de l'image et permet des mises à niveau plus réfléchies du traceur (par exemple, pour répondre aux exigences de conformité ou simplifier le débogage).

#### Exemple : Spécifiez un SDK Java pour un espace de noms {#example-specify-a-java-sdk-for-a-namespace}

Seules les applications Java s'exécutent dans l'espace de noms `login-service`. Pour éviter de télécharger d'autres SDK, configurez l'Agent pour cibler cet espace de noms et n'injecter que la version 1.48.2 du SDK Java.


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

Si vous rencontrez des problèmes lors de l'activation d'APM avec SSI, consultez le [guide de dépannage SSI][35].

## Pour aller plus loin {#further-reading}

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
[40]: https://app.datadoghq.com/organization-settings/api-keys
[42]: https://app.datadoghq.com/apm/services
[41]: /fr/tracing/guide/injectors/
[43]: /fr/getting_started/site/