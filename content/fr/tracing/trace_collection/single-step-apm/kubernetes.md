---
aliases:
- /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes
code_lang: kubernetes
code_lang_weight: 20
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: Documentation
  text: Activer les métriques runtime
- link: /tracing/guide/init_resource_calc/
  tag: Documentation
  text: Découvrez l'utilisation des ressources des conteneurs init
- link: /tracing/guide/local_sdk_injection
  tag: Documentation
  text: Instrumentez vos applications en utilisant l'injection SDK locale
title: Instrumentation APM en une seule étape sur Kubernetes
type: multi-code-lang
---

## Présentation

Dans un environnement Kubernetes, utilisez l'instrumentation en une seule étape (SSI) pour APM afin d'installer l'Agent Datadog et [instrumenter][3] vos applications avec les SDK APM Datadog en une seule étape.

## Exigences

- Kubernetes v1.20+.
- [`Helm`][1] pour déployer l'Opérateur Datadog.
- [`Kubectl` CLI][2] pour installer l'Agent Datadog.
- Compatibilité de l'environnement confirmée selon le [guide de compatibilité de l'instrumentation en une seule étape][36].


## Activer APM sur vos applications

<div class="alert alert-info">L'instrumentation en une seule étape n'instrumente pas les applications dans l'espace de noms où l'Agent Datadog est installé. Installez l'Agent dans un espace de noms séparé où vous n'exécutez pas vos applications.</div>

Suivez ces étapes pour activer l'instrumentation en une seule étape sur l'ensemble de votre cluster. Cela envoie automatiquement des traces de toutes les applications écrites dans des langages pris en charge.

**Remarques :** Pour instrumenter uniquement des espaces de noms ou des pods spécifiques, consultez le ciblage de charge de travail dans [Options avancées](#advanced-options).

1. Dans Datadog, allez à la page [Installer l'Agent Datadog sur Kubernetes][11].
1. Suivez les instructions à l'écran pour choisir votre méthode d'installation, sélectionner une clé API et configurer l'Opérateur ou le dépôt Helm.
1. Dans la section **Configurer `datadog-agent.yaml`**, allez à **Configuration supplémentaire** > **Observabilité de l'application**, et activez **Instrumentation APM**.

   ...

1. Déployez l'Agent en utilisant le fichier de configuration généré.
1. Redémarrez votre application.

<div class="alert alert-info">SSI ajoute un petit temps de démarrage aux applications instrumentées. Si ce surcoût n'est pas acceptable pour votre cas d'utilisation, contactez <a href="/help/">Support Datadog</a>.</div>

## Configurer les Étiquettes de Service Unifiées

Les Étiquettes de Service Unifiées (UST) appliquent des étiquettes cohérentes à travers les traces, les métriques et les journaux, facilitant la navigation et la corrélation de vos données d'observabilité. Vous pouvez configurer les UST via l'extraction d'étiquettes (recommandé) ou dans les manifestes de déploiement.

### (Recommandé) Configurez les UST via l'extraction d'étiquettes

Avec SSI, vous pouvez automatiquement extraire les valeurs UST des étiquettes et des métadonnées des pods sans modifier les déploiements individuels. Pour ce faire, configurez `kubernetesResourcesLabelsAsTags` pour mapper vos étiquettes Kubernetes existantes aux étiquettes de service Datadog.

#### Prérequis

| Composant | Version minimale  |
|-----------|------------------|
| ... | 7.69        |
| ... | 1.16.0   |
| ... | 3.120.0 |

#### Configuration automatique

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

Avec cette configuration, Datadog définit automatiquement la balise `service` en utilisant la valeur de l'étiquette `app.kubernetes.io/name` pour tout travail instrumenté qui inclut cette étiquette.

#### Contrôle explicite avec ddTraceConfigs

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


### Configurer les UST dans les manifestes de déploiement

Si votre configuration n'utilise pas d'étiquettes adaptées à l'extraction des UST, vous pouvez définir les UST directement dans vos manifestes de déploiement en utilisant des variables d'environnement. Cette approche nécessite de modifier chaque déploiement individuellement, mais offre un contrôle précis.

Pour des instructions complètes, voir [configuration des UST pour les services Kubernetes][5].

## Activer les produits et fonctionnalités dépendants du SDK

Après que SSI a chargé le SDK Datadog dans vos applications et activé le traçage distribué, vous pouvez configurer des produits supplémentaires qui dépendent du SDK. Ceci inclut des capacités telles que [Profiler Continu][37], [Surveillance de la Sécurité des Applications][38], et [contrôles d'ingestion de traces][39].

Utilisez l'une des méthodes de configuration suivantes :

- **[Configurer avec ciblage de charge de travail (recommandé)](#target-specific-workloads)** :

  Par défaut, l'instrumentation par étape unique instrumente tous les services dans tous les espaces de noms. Utilisez le ciblage de charge de travail pour limiter l'instrumentation à des espaces de noms, des pods ou des charges de travail spécifiques, et appliquez des configurations personnalisées.

- **[Définir des variables d'environnement][7]** :

  Activez des produits en définissant des variables d'environnement directement dans la configuration de votre application.

## Options avancées

Utilisez les options avancées suivantes pour personnaliser le comportement de l'instrumentation par étape unique dans votre environnement. Ces paramètres sont optionnels et généralement nécessaires uniquement dans des configurations spécialisées.

### Cibler des charges de travail spécifiques

Par défaut, SSI instrumente tous les services dans tous les espaces de noms de votre cluster. Selon la version de votre Agent, utilisez l'une des méthodes de configuration suivantes pour affiner quels services sont instrumentés et comment.

...

...

Créez des blocs de ciblage avec l'étiquette `targets` pour spécifier quelles charges de travail instrumenter et quelles configurations appliquer.

Chaque bloc cible a les clés suivantes :

| Clé             | Description |
|------------------|-------------|
| ...            | Le nom du bloc cible. Cela n'a aucun effet sur l'état de surveillance et est utilisé uniquement comme métadonnées. |
| ... | L'espace de noms à instrumenter. Spécifiez en utilisant un ou plusieurs de :<br> ... Une liste d'un ou plusieurs noms d'espace de noms. <br> ... Une liste d'une ou plusieurs étiquettes définies dans des paires `{key,value}`. <br> ... Une liste d'exigences de sélecteur d'espace de noms. <br><br> Les espaces de noms doivent répondre à tous les critères pour correspondre. Pour plus de détails, voir la [Kubernetes documentation sur les sélecteurs][10].|
| ...     | Le(s) pod(s) à instrumenter. Spécifiez en utilisant un ou plusieurs de : <br> ... Une liste d'une ou plusieurs étiquettes définies dans des paires `{key,value}`. <br> ... Une liste d'exigences de sélecteur de pod. <br><br> Les pods doivent répondre à tous les critères pour correspondre. Pour plus de détails, voir la [Kubernetes documentation sur les sélecteurs][10]. |
| ... | La version [SDK APM Datadog][9] à utiliser pour chaque langue. |
| ...  | Configurations du SDK APM qui permettent de définir des balises de service unifiées, d'activer les produits Datadog au-delà du traçage et de personnaliser d'autres paramètres APM. [Voir la liste complète des options][8]. |

Le fichier que vous devez configurer dépend de la manière dont vous avez activé l'instrumentation par étape unique :
- Si vous avez activé l'ISI avec Datadog Operator, modifiez `datadog-agent.yaml`.
- Si vous avez activé l'ISI avec Helm, modifiez `datadog-values.yaml`.

note Les cibles sont évaluées dans l'ordre ; la première correspondance a la priorité.

#### Configurations d'exemple

Examinez les exemples suivants montrant comment sélectionner des services spécifiques :

{{< contenu-repli titre="Exemple 1 : Activer tous les espaces de noms sauf un" niveau="h4" >}}

Cette configuration :
- active APM pour tous les espaces de noms sauf le namespace `jenkins`.
  - **Remarque** : utilisez `enabledNamespaces` pour désactiver pour tous les espaces de noms sauf ceux énumérés.
- informe Datadog d'instrumenter les applications Java avec le SDK APM Java par défaut et les applications Python avec `v.3.1.0` du SDK APM Python.

{{< highlight yaml "hl_lines=4-10" >}} apm : instrumentation : activé : vrai namespacesDésactivés : - "jenkins" cibles : - nom : "tous-les-services-restants" versionsDdTrace : java : "par défaut" python : 3.1.0+

...

{{< contenu-repli titre="Exemple 2 : Instrumenter un sous-ensemble d'espaces de noms, correspondant aux noms et étiquettes" niveau="h4" >}}

Cette configuration crée deux blocs cibles :

- Le premier bloc (nommé `login-service_namespace`) :
  - active APM pour les services dans l'espace de noms `login-service`.
  - informe Datadog d'instrumenter les services dans cet espace de noms avec la version par défaut du SDK APM Java.
  - définit la variable d'environnement `DD_PROFILING_ENABLED` pour ce groupe cible
- Le deuxième bloc (nommé `billing-service_apps`)
  - active APM pour les services dans l'espace de noms avec l'étiquette `app:billing-service`.
  - informe Datadog d'instrumenter cet ensemble de services avec `v3.1.0` du SDK APM Python.

{{< highlight yaml "hl_lines=4-28" >}} apm : instrumentation : activé : vrai cibles : - nom : "login-service_namespace" sélecteurNamespace : matchNames : - "login-service" ddTraceVersions : java : "default" ddTraceConfigs : - nom : "DD_PROFILING_ENABLED" ## le profilage est activé pour tous les services dans cet espace de noms valeur : "auto" - nom : "billing-service_apps" sélecteurNamespace : matchLabels : app : "billing-service" ddTraceVersions : python : 3.1.0+

...

{{< collapse-content title="Exemple 3 : Instrumenter différentes charges de travail avec différents traceurs" niveau="h4" >}}

Cette configuration fait ce qui suit :
- active APM pour les pods avec les étiquettes suivantes :
  - `app:db-user`, qui marque les pods exécutant l'application `db-user`.
  - `webserver:routing`, qui marque les pods exécutant l'application `request-router`.
- informe Datadog d'utiliser les versions par défaut des SDK Datadog Tracer.
- définit les variables d'environnement Datadog à appliquer à chaque groupe cible et configure les SDK.

{{< highlight yaml "hl_lines=4-28" >}} apm : instrumentation : activé : vrai cibles : - nom : "db-user" podSelector : matchLabels : app : "db-user" ddTraceVersions : java : "default" ddTraceConfigs : ## configurations de trace définies pour les services dans les pods correspondants - nom : "DD_DATA_STREAMS_ENABLED" valeur : "true" - nom : "user-request-router" podSelector : matchLabels : webserver : "user" ddTraceVersions : php : "default" {{< /highlight >}}

...

{{< collapse-content title="Exemple 4 : Instrumenter un pod dans un espace de noms" level="h4" >}}

Cette configuration :
- active APM pour les pods étiquetés `app:password-resolver` à l'intérieur de l'espace de noms `login-service`.
- informe Datadog d'utiliser la version par défaut du SDK Datadog Java Tracer.
- définit les variables d'environnement Datadog à appliquer à cette cible.

{{< highlight yaml "hl_lines=4-28" >}} apm : instrumentation : activée : vrai cibles : - nom : "login-service-namespace" namespaceSelector : matchNames : - "login-service" podSelector : matchLabels : app : "password-resolver" ddTraceVersions : java : "default" ddTraceConfigs : - nom : "DD_PROFILING_ENABLED" valeur : "auto" {{< /highlight >}}

...

{{< collapse-content title="Exemple 5 : Instrumenter un sous-ensemble de pods en utilisant <code>matchExpressions</code>" level="h4" >}}

Cette configuration active APM pour tous les pods sauf ceux qui ont l'une des étiquettes `app=app1` ou `app=app2`.

{{< highlight yaml "hl_lines=4-28" >}} apm : instrumentation : activée : vrai cibles : - nom : "default-target" podSelector : matchExpressions : - clé : app opérateur : NotIn valeurs : - app1 - app2 {{< /highlight >}}

...

[8]: /fr/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[9]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/#tracer-libraries
[10]: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#resources-that-support-set-based-requirements

...

...

#### Activer ou désactiver l'instrumentation pour les espaces de noms

Vous pouvez choisir d'activer ou de désactiver l'instrumentation pour les applications dans des espaces de noms spécifiques. Vous ne pouvez définir que enabledNamespaces ou disabledNamespaces, pas les deux.

Le fichier que vous devez configurer dépend de si vous avez activé l'instrumentation par étape unique avec Datadog Operator ou Helm :

...

Pour activer l'instrumentation pour des espaces de noms spécifiques, ajoutez `enabledNamespaces` configuration à `datadog-agent.yaml` :

...

Pour désactiver l'instrumentation pour des espaces de noms spécifiques, ajoutez `disabledNamespaces` configuration à `datadog-agent.yaml` :

...

...

...

Pour activer l'instrumentation pour des espaces de noms spécifiques, ajoutez `enabledNamespaces` configuration à `datadog-values.yaml` :

...

Pour désactiver l'instrumentation pour des espaces de noms spécifiques, ajoutez `disabledNamespaces` configuration à `datadog-values.yaml` :

...

...

#### Spécifiez les versions de bibliothèque de traçage

<div class="alert alert-info">À partir de Datadog Cluster Agent v7.52.0+, vous pouvez automatiquement instrumenter un sous-ensemble de vos applications, en fonction des bibliothèques de traçage que vous spécifiez.</div>

Spécifiez les bibliothèques de traçage Datadog et leurs versions pour instrumenter automatiquement les applications écrites dans ces langages. Vous pouvez configurer cela de deux manières, qui sont appliquées dans l'ordre de priorité suivant :

1. [Spécifiez au niveau du service](#specify-at-the-service-level), ou
2. [Spécifiez au niveau du cluster](#specify-at-the-cluster-level).

Par défaut : Si vous ne spécifiez aucune version de bibliothèque, les applications écrites dans des langages pris en charge sont automatiquement instrumentées en utilisant les dernières versions des bibliothèques de traçage.

##### Spécifiez au niveau du service

Pour instrumenter automatiquement les applications dans des pods spécifiques, ajoutez l'annotation de langage appropriée et la version de bibliothèque pour votre application dans votre spécification de pod :

| Langage   | Annotation du pod                                                        |
|------------|-----------------------------------------------------------------------|
| Java       | ...   |
| Node.js    | ...     |
| Python     | ... |
| .NET       | ... |
| Ruby       | ...   |
| PHP        | ...   |

Remplacez `<CONTAINER IMAGE TAG>` par la version de bibliothèque souhaitée. Les versions disponibles sont listées dans les [registres de conteneurs Datadog](#change-the-default-image-registry) et les dépôts de sources de traceurs pour chaque langage :

- [Java][34]
- [Node.js][35]
- [Python][36]
- [.NET][37]
- [Ruby][38]
- [PHP][39]

<div class="alert alert-danger">Faites preuve de prudence lors de l'utilisation de la balise <code>latest</code>, car les versions majeures des bibliothèques peuvent introduire des changements incompatibles.</div>

Par exemple, pour instrumenter automatiquement les applications Java :

{{< highlight yaml "hl_lines=10" >}} apiVersion : apps/v1 kind : Déploiement métadonnées : étiquettes : # ... spéc : modèle : métadonnées : annotations : admission.datadoghq.com/java-lib.version : "<CONTAINER IMAGE TAG>" spéc : conteneurs : - # ... {{< /highlight >}}

##### Spécifiez au niveau du cluster

Si vous n'activez pas l'instrumentation automatique pour des pods spécifiques à l'aide d'annotations, vous pouvez spécifier les langages à instrumenter dans l'ensemble du cluster à l'aide de la configuration SSI. Lorsque `apm.instrumentation.libVersions` est défini, seules les applications écrites dans les langages spécifiés sont instrumentées, en utilisant les versions de bibliothèque spécifiées.

Le fichier que vous devez configurer dépend de si vous avez activé l'instrumentation par étape unique avec Datadog Operator ou Helm :

...

Par exemple, pour instrumenter les applications .NET, Python et Node.js, ajoutez la configuration suivante à votre fichier `datadog-agent.yaml` :

...

...

...

Par exemple, pour instrumenter les applications .NET, Python et Node.js, ajoutez la configuration suivante à votre fichier `datadog-values.yaml` :

...

...


[34]: https://github.com/DataDog/dd-trace-java/releases
[35]: https://github.com/DataDog/dd-trace-js/releases
[36]: https://github.com/DataDog/dd-trace-py/releases
[37]: https://github.com/DataDog/dd-trace-dotnet/releases
[38]: https://github.com/DataDog/dd-trace-rb/releases
[39]: https://github.com/DataDog/dd-trace-php/releases


...

### Changer le registre d'images par défaut

Datadog publie des images de bibliothèques d'instrumentation sur gcr.io, Docker Hub et Amazon ECR :

| Langage   | gcr.io                              | hub.docker.com                              | gallery.ecr.aws                            |
|------------|-------------------------------------|---------------------------------------------|-------------------------------------------|
| Java       | [gcr.io/datadoghq/dd-lib-java-init][15]   | [hub.docker.com/r/datadog/dd-lib-java-init][16]   | [gallery.ecr.aws/datadog/dd-lib-java-init][17]   |
| Node.js    | [gcr.io/datadoghq/dd-lib-js-init][18]     | [hub.docker.com/r/datadog/dd-lib-js-init][19]     | [gallery.ecr.aws/datadog/dd-lib-js-init][20]     |
| Python     | [gcr.io/datadoghq/dd-lib-python-init][21] | [hub.docker.com/r/datadog/dd-lib-python-init][22] | [gallery.ecr.aws/datadog/dd-lib-python-init][23] |
| .NET       | [gcr.io/datadoghq/dd-lib-dotnet-init][24] | [hub.docker.com/r/datadog/dd-lib-dotnet-init][25] | [gallery.ecr.aws/datadog/dd-lib-dotnet-init][26] |
| Ruby       | [gcr.io/datadoghq/dd-lib-ruby-init][27] | [hub.docker.com/r/datadog/dd-lib-ruby-init][28] | [gallery.ecr.aws/datadog/dd-lib-ruby-init][29] |
| PHP        | [gcr.io/datadoghq/dd-lib-php-init][30] | [hub.docker.com/r/datadog/dd-lib-php-init][31] | [gallery.ecr.aws/datadog/dd-lib-php-init][32] |

La variable d'environnement `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` dans la configuration de l'agent de cluster Datadog spécifie le registre utilisé par le contrôleur d'admission. La valeur par défaut est `gcr.io/datadoghq`.

Vous pouvez tirer la bibliothèque de traçage d'un registre différent en la changeant en `docker.io/datadog`, `public.ecr.aws/datadog` ou une autre URL si vous hébergez les images dans un registre de conteneurs local.

Pour des instructions sur la modification de votre registre de conteneurs, voir [Changer votre registre de conteneurs][33].

### Utilisez un registre de conteneurs privé

Si votre organisation n'autorise pas les téléchargements directs depuis des registres publics (comme `gcr.io`, `docker.io` ou `public.ecr.aws`), vous pouvez héberger les images Datadog requises en interne et configurer le contrôleur d'admission pour les utiliser.

Pour utiliser SSI avec un registre de conteneurs privé :

1. Suivez [ces instructions][34] pour refléter les images de conteneurs de Datadog vers votre registre privé.

   Vous n'avez besoin que des images pour les langues que vous instrumentez. Si vous n'êtes pas sûr des images dont vous avez besoin, voici une base qui couvre la plupart des cas d'utilisation :

   - ...
   - ...
   - ...
   - ...
   - ...
   - ...
   - ...

   Vous pouvez trouver ces images sur [gcr.io][12], [Docker Hub][13] ou [Amazon ECR Public Gallery][14].

2. Taguez les images selon votre configuration.

   Les versions que vous reflétez doivent correspondre aux versions configurées dans vos charges de travail, qui peuvent être définies de l'une des manières suivantes :
   - globalement dans la configuration de l'Agent en utilisant `ddTraceVersions`, ou
   - par pod en utilisant des annotations comme `admission.datadoghq.com/java-lib.version`.

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

   Cette configuration nécessite les balises d'image suivantes :
   - ...
   - ...
   - ...

3. Mettez à jour la configuration de l'Agent de Cluster pour utiliser votre registre privé.

   Définissez la variable d'environnement `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` dans la configuration de votre Agent de Cluster pour utiliser votre registre privé.

Pour plus de détails sur le changement de votre registre de conteneurs, voir [Changer votre registre de conteneurs][33].

### Utilisation d'une interface de réseau de conteneurs sur EKS

Lors de l'utilisation d'un CNI comme Calico, les nœuds du plan de contrôle ne peuvent pas initier de connexions réseau au contrôleur d'admission de Datadog et signalent une erreur "L'adresse n'est pas autorisée". Pour utiliser l'instrumentation à étape unique, modifiez l'Agent de Cluster de Datadog avec le paramètre `useHostNetwork: true`.

```
datadog:
  ...

clusterAgent:
  useHostNetwork: true

  admissionController:
    ...
```

## Supprimer l'instrumentation APM à étape unique de votre Agent

Si vous ne souhaitez pas collecter de données de trace pour un service, un hôte, une VM ou un conteneur particulier, suivez les étapes suivantes :

### Supprimer l'instrumentation pour des services spécifiques

Pour supprimer l'instrumentation APM et arrêter l'envoi de traces d'un service spécifique, vous pouvez faire l'une des choses suivantes :

#### Utiliser la sélection de charge de travail (recommandé)

Avec la sélection de charge de travail (disponible pour l'Agent v7.64+), vous pouvez activer et désactiver le traçage pour des applications spécifiques. [Voir les détails de configuration ici](#advanced-options).

#### Utiliser le contrôleur d'admission Datadog

En alternative, ou pour une version de l'agent qui ne prend pas en charge la sélection de charge de travail, vous pouvez également désactiver la mutation de pod en ajoutant une étiquette à votre pod.

<div class="alert alert-danger">En plus de désactiver SSI, les étapes suivantes désactivent d'autres webhooks de mutation. Utiliser avec prudence.</div>

1. Définir l'étiquette `admission.datadoghq.com/enabled:` sur `"false"` pour la spécification du pod :
   ```yaml
   spec:
     template:
       metadata:
         labels:
           admission.datadoghq.com/enabled: "false"
   ```
2. Appliquez la configuration :
   ```shell
   kubectl apply -f /path/to/your/deployment.yaml
   ```
3. Redémarrer les services pour lesquels vous souhaitez supprimer l'instrumentation.

### Supprimer APM pour tous les services sur l'infrastructure

Pour arrêter de produire des traces, désinstallez APM et redémarrez l'infrastructure :

Le fichier que vous devez configurer dépend de si vous avez activé l'instrumentation par étape unique avec Datadog Operator ou Helm :

...

1. Définir `instrumentation.enabled=false` dans `datadog-agent.yaml` :
   ```yaml
   features:
     apm:
       instrumentation:
         enabled: false
   ```

2. Déployer l'Agent Datadog avec le fichier de configuration mis à jour :
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
...

...

1. Définir `instrumentation.enabled=false` dans `datadog-values.yaml` :
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
...

## Meilleures pratiques

Après avoir activé SSI, tous les processus pris en charge dans le cluster sont automatiquement instrumentés et commencent à produire des traces en quelques minutes.

Pour contrôler où APM est activé et réduire la surcharge, envisagez les meilleures pratiques suivantes.

...

#### Instrumentation par défaut vs. opt-in
| `mode`    | Comportement    | Quand utiliser |
| ---  | ----------- | ----------- |
| Par défaut | Tous les processus pris en charge dans le cluster sont instrumentés. | Petits clusters ou prototypes. |
| Opt-in | Utilisez [sélection de charge de travail][4] pour restreindre l'instrumentation à des espaces de noms ou des pods spécifiques. | Clusters de production, déploiements progressifs ou cas d'utilisation sensibles aux coûts. |

#### Exemple : Activer l'instrumentation pour des pods spécifiques

1. Ajoutez une étiquette significative (par exemple, `datadoghq.com/apm-instrumentation: "enabled"`) à la fois aux métadonnées de déploiement et au modèle de pod.

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

2. Dans votre configuration Helm de l'Agent Datadog, activez SSI et utilisez `podSelector` pour injecter uniquement dans les pods avec l'étiquette opt-in correspondante.

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

Voir [sélection de charge de travail][4] pour des exemples supplémentaires.

...


...

Utilisez `ddTraceVersions` dans votre configuration Helm de l'Agent pour contrôler à la fois la langue et la version du SDK APM. Cela empêche le téléchargement de SDK inutiles, ce qui minimise l'empreinte du conteneur d'initialisation, réduit la taille de l'image et permet des mises à niveau de traceur plus délibérées (par exemple, pour répondre aux exigences de conformité ou simplifier le débogage).

#### Exemple : Spécifiez un SDK APM Java pour un espace de noms

Seules les applications Java s'exécutent dans l'espace de noms `login-service`. Pour éviter de télécharger d'autres SDK, configurez l'Agent pour cibler cet espace de noms et injecter uniquement la version 1.48.2 du SDK Java.


```
targets:
  - name: login-service
    namespaceSelector:
      matchNames: ["login-service"]
    ddTraceVersions:
      java: "1.48.2"    # pin version
```

#### Configuration par défaut

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

...

## Dépannage

Si vous rencontrez des problèmes pour activer APM avec SSI, consultez le [guide de dépannage SSI][35].

## Pour aller plus loin

...

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
[37]: /fr/profiler/
[38]: /fr/security/application_security/
[39]: /fr/tracing/trace_pipeline/ingestion_controls/