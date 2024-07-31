---
aliases:
- /fr/tracing/trace_collection/admission_controller/
- /fr/tracing/trace_collection/library_injection/
description: Injecter des bibliothèques d'instrumentation dans des applications
title: Injecter des bibliothèques localement
---

## Présentation

<div class="alert alert-info"><strong>Bêta</strong> : vous pouvez activer APM lors de l'installation de l'Agent avec l'<a href="/tracing/trace_collection/single-step-apm">instrumentation APM en une seule étape</a>. Exécutez une commande d'installation d'une ligne pour activer automatiquement APM et instrumenter tous vos services sur votre VM, conteneur ou host Linux.</div>

Pour instrumenter votre application, vous pouvez :
* Procéder à l'instrumentation automatique de votre application, à l'aide des instructions figurant sur cette page
* [Procéder à l'instrumentation manuelle de votre application][1]

Le processus d'injection locale de la bibliothèque, sans toucher au code de l'application, varie selon l'emplacement de votre Agent et de votre application, ainsi que sur la façon dont vous les avez installés. Choisissez le scénario qui correspond à votre environnement :

{{< tabs >}}
{{% tab "Kubernetes" %}}

Si vous avez recours à un [contrôleur d'admission][1] Kubernetes, l'Agent s'en sert pour intercepter les requêtes adressées à l'API Kubernetes et modifier de nouveaux pods afin d'injecter la bibliothèque d'instrumentation spécifique.

<div class="alert alert-warning">L'injection de la bibliothèque s'applique aux nouveaux pods uniquement et n'a aucun impact sur les pods en cours d'exécution.</div>

Pour en savoir plus sur le contrôleur d'admission Kubernetes, consultez la [référence relative aux contrôleurs d'admission Kubernetes][2] (en anglais).

## Prérequis

* Kubernetes v1.14+
* [Agent de cluster Datadog v7.40+][3] pour Java, Python, NodeJS ; [Agent de cluster Datadog v7.44+][3] pour .NET et Ruby
* Activation du contrôleur d'admission Datadog. **Remarque** : depuis la version 2.35.0 du chart Helm, le contrôleur d'admission Datadog est activé par défaut dans l'Agent de cluster.
* Pour Python, les applications uWSGI ne sont actuellement pas prises en charge.
* Pour Ruby, l'injection de bibliothèque est disponible en bêta. L'instrumentation fonctionne uniquement pour les applications Ruby on Rails avec une version de Bundler ultérieure à la v2.3 et sans gems fournis (mode déploiement ou `BUNDLE_PATH`).
* Applications en Java, JavaScript, Python, .NET ou Ruby déployées sous Linux avec une architecture prise en charge. Consultez le [registre de conteneurs correspondant](#registres-de-conteneurs) pour obtenir la liste complète des architectures prises en charge par langage.

## Registres de conteneurs

<div class="alert alert-warning">Docker Hub applique des limites de débit à la récupération d'images. Si vous ne disposez d'aucune offre Docker Hub, Datadog vous recommande de mettre à jour la configuration de votre Agent Datadog et de votre Agent de cluster afin de récupérer les images à partir de GCR ou d'ECR. Pour connaître la marche à suivre, consultez la section <a href="/agent/guide/changing_container_registry">Modifier votre registre de conteneurs</a>.</div>

Datadog publie des images de bibliothèques d'instrumentation sur gcr.io, Docker Hub et Amazon ECR :
| Langage   | gcr.io                              | hub.docker.com                              | gallery.ecr.aws                            |
|------------|-------------------------------------|---------------------------------------------|-------------------------------------------|
| Java       | [gcr.io/datadoghq/dd-lib-java-init][4]   | [hub.docker.com/r/datadog/dd-lib-java-init][5]   | [gallery.ecr.aws/datadog/dd-lib-java-init][6]   |
| JavaScript | [gcr.io/datadoghq/dd-lib-js-init][7]     | [hub.docker.com/r/datadog/dd-lib-js-init][8]     | [gallery.ecr.aws/datadog/dd-lib-js-init][9]     |
| Python     | [gcr.io/datadoghq/dd-lib-python-init][10] | [hub.docker.com/r/datadog/dd-lib-python-init][11] | [gallery.ecr.aws/datadog/dd-lib-python-init][12] |
| .NET       | [gcr.io/datadoghq/dd-lib-dotnet-init][13] | [hub.docker.com/r/datadog/dd-lib-dotnet-init][14] | [gallery.ecr.aws/datadog/dd-lib-dotnet-init][15] |
| Ruby       | [gcr.io/datadoghq/dd-lib-ruby-init][23] | [hub.docker.com/r/datadog/dd-lib-ruby-init][24] | [gallery.ecr.aws/datadog/dd-lib-ruby-init][25] |

La variable d'environnement `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` dans la configuration de l'Agent de cluster Datadog spécifie le registre utilisé par le contrôleur d'admission. La valeur par défaut est `gcr.io/datadoghq`.

Pour récupérer la bibliothèque de tracing à partir d'un autre registre, remplacez la valeur par `docker.io/datadog`, par `public.ecr.aws/datadog` ou par une autre URL si vous hébergez des images dans un registre de conteneurs local.

## Configurer l'injection de bibliothèque d'instrumentation

Pour les applications Kubernetes pour lesquelles vous souhaitez envoyer des traces à Datadog, configurez le contrôleur d'admission Datadog afin d'injecter automatiquement les bibliothèques d'instrumentation Java, JavaScript, Python, .NET ou Ruby. Globalement, il suffit de suivre les étapes ci-dessous (décrites en détail par la suite) :

1. Activez le contrôleur d'admission Datadog pour qu'il mute vos pods.
2. Annotez vos pods afin de sélectionner la bibliothèque d'instrumentation à injecter.
3. Taguez vos pods à l'aide de tags de service unifié afin de lier les données de télémétrie Datadog entre elles et d'explorer facilement vos traces, métriques et logs à l'aide de tags cohérents.
4. Appliquez votre nouvelle configuration.

<div class="alert alert-info">Vous n'avez pas besoin de générer une nouvelle image d'application pour injecter la bibliothèque. Comme l'ajout de la bibliothèque d'instrumentation se fait durant l'injection de la bibliothèque, il n'est plus nécessaire de modifier votre image d'application.</div>

### Étape 1 : Activer le contrôleur d'admission Datadog pour qu'il mute vos pods

Par défaut, le contrôleur d'admission Datadog mute uniquement les pods dotés d'une étiquette spécifique. Pour activer la mutation sur vos pods, ajoutez l'étiquette `admission.datadoghq.com/enabled: "true"` aux spécifications de vos pods.

**Remarque** : vous pouvez configurer le contrôleur d'admission Datadog afin qu'il active la configuration d'injection sans cette étiquette de pod. Pour ce faire, définissez `clusterAgent.admissionController.mutateUnlabelled` (ou `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`) sur `true` dans la configuration de l'Agent de cluster.

Pour en savoir plus sur la configuration, consultez la [section Contrôleur d'admission Datadog][1].

Exemple :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    # (...)
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/enabled: "true" # Activer le contrôleur d'admission pour qu'il mute les nouveaux pods faisant partie de ce déploiement
    spec:
      containers:
        - # (...)
```

### Étape 2 : Annoter vos pods pour l'injection de la bibliothèque

Afin de sélectionner vos pods pour l'injection de bibliothèque, utilisez les annotations figurant ci-dessous dans les spécifications de vos pods :

| Langage   | Annotation du pod                                                        |
|------------|-----------------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<TAG_IMAGE_CONTENEUR>"`   |
| JavaScript | `admission.datadoghq.com/js-lib.version: "<TAG_IMAGE_CONTENEUR>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<TAG_IMAGE_CONTENEUR>"` |
| .NET       | `admission.datadoghq.com/dotnet-lib.version: "<TAG_IMAGE_CONTENEUR>"` |
| Ruby       | `admission.datadoghq.com/ruby-lib.version: "<TAG_IMAGE_CONTENEUR>"`   |

Les versions disponibles de la bibliothèque sont répertoriées dans chaque registre de conteneurs, ainsi que dans les référentiels source des traceurs pour chaque langage :
- [Java][16]
- [JavaScript][17]
- [Python][18]
- [.NET][19]
  - **Remarque** : concernant l'injection de la bibliothèque .NET, si le conteneur d'application utilise une distribution Linux basée sur musl (comme Alpine), vous devez ajouter un tag avec le suffixe `-musl` pour annoter le pod. Par exemple, pour utiliser la version `v2.29.0` de la bibliothèque, appliquez le tag de conteneur `v2.29.0-musl`.
- [Ruby][20]

**Remarque** : si vous avez déjà instrumenté une application avec une version de la bibliothèque, puis effectué une autre instrumentation après avoir injecté une nouvelle version de la même bibliothèque, le traceur continue de fonctionner. En effet, la version initiale de la bibliothèque est utilisée. Comme la bibliothèque a été injectée au niveau du contrôleur d'admission avant l'exécution, cette bibliothèque est prioritaire sur toutes les autres bibliothèques configurées manuellement.

<div class="alert alert-warning"><strong>Remarque</strong> : le tag <code>latest</code> est prise en charge, mais utilisez-le prudemment : la publication de nouvelles bibliothèques majeures peut entraîner un dysfonctionnement.</div>

Par exemple, pour injecter une bibliothèque Java :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    # (...)
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/enabled: "true" # Activer le contrôleur d'admission pour qu'il mute les nouveaux pods faisant partie de ce déploiement
      annotations:
        admission.datadoghq.com/java-lib.version: "<TAG_IMAGE_CONTENEUR>"
    spec:
      containers:
        - # (...)
```

### Étape 3 : Taguer vos pods à l'aide de tags de service unifié

Grâce aux [tags de service unifié][21], vous pouvez lier des données de télémétrie Datadog entre elles et explorer facilement vos traces, métriques et logs en appliquant des tags cohérents. Configurez le tagging de service unifié sur l'objet de déploiement et sur les spécifications du modèle de pod. Utilisez les étiquettes suivantes pour configurer les tags de service unifié :

```yaml
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENVIRONNEMENT>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>"
```

**Remarque** : il n'est pas nécessaire de définir les _variables d'environnement_ pour le tagging de service unifié (`DD_ENV`, `DD_SERVICE`, `DD_VERSION`) dans les spécifications du modèle de pod, car le contrôleur d'admission propage les valeurs de tag en tant que variables d'environnement lors de l'injection de la bibliothèque.

Exemple :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    tags.datadoghq.com/env: "prod" # Tag de service unifié : tag env du déploiement
    tags.datadoghq.com/service: "my-service" # Tag de service unifié : tag service du déploiement
    tags.datadoghq.com/version: "1.1" # Tag de service unifié : tag version du déploiement
  # (...)
spec:
  template:
    metadata:
      labels:
        tags.datadoghq.com/env: "prod" # Tag de service unifié : tag env du pod
        tags.datadoghq.com/service: "my-service" # Tag de service unifié : tag service du pod
        tags.datadoghq.com/version: "1.1" # Tag de service unifié : tag version du pod
        admission.datadoghq.com/enabled: "true" # Activer le contrôleur d'admission pour qu'il mute les nouveaux pods faisant partie de ce déploiement
      annotations:
        admission.datadoghq.com/java-lib.version: "<TAG_IMAGE_CONTENEUR>"
    spec:
      containers:
        - # (...)
```

### Étape 4 : Appliquer la configuration

Dès lors que la nouvelle configuration a été appliquée aux pods, ils sont prêts à être instrumentés.

<div class="alert alert-warning">La bibliothèque est injectée uniquement sur les nouveaux pods : l'injection n'a aucune incidence sur les pods en cours d'exécution.</div>

## Vérifier que l'injection de bibliothèque a fonctionné

L'injection de bibliothèque repose sur l'injection d'un conteneur `init` dédié dans les pods. Si l'injection a fonctionné, votre pod devrait contenir un conteneur `init` intitulé `datadog-lib-init` :

{{< img src="tracing/trace_collection/datadog-lib-init-container.jpg" alt="Page de détails d'un environnement Kubernetes avec un conteneur init dans le pod.">}}

Vous pouvez également exécuter `kubectl describe pod <my-pod>` pour afficher le conteneur init `datadog-lib-init`.

L'instrumentation commence également à envoyer des données de télémétrie à Datadog (par exemple, des traces pour [APM][22]).

### Résolution des problèmes d'installation

Si le lancement du pod de l'application échoue, exécutez `kubectl logs <my-pod> --all-containers` pour afficher les logs afin de déterminer si vous rencontrez l'un des problèmes connus ci-dessous. 

#### Problèmes d'installation .NET
##### `dotnet: error while loading shared libraries: libc.musl-x86_64.so.1: cannot open shared object file: No such file or directory`

- **Problème** : l'annotation du pod pour la version de la bibliothèque dotnet inclut un suffixe `-musl`, mais le conteneur d'application s'exécute sur une distribution Linux reposant sur glibc.
- **Solution** : supprimez le suffixe `-musl` de la version de la bibliothèque dotnet.

##### `Error loading shared library ld-linux-x86-64.so.2: No such file or directory (needed by /datadog-lib/continuousprofiler/Datadog.Linux.ApiWrapper.x64.so)`

- **Problème** : le conteneur de l'application s'exécute sur une distribution Linux reposant sur musl-libc (par exemple, Alpine), mais l'annotation du pod ne contient pas le suffixe `-musl`.
- **Solution** : ajoutez le suffixe `-musl` à la version de la bibliothèque dotnet.


#### Problèmes d'installation Python

##### Logs de bibliothèque superflus

Pour les versions `< 1.20.3` de Python, les logs d'injection Python sont enregistrés dans `stderr`. Passez à la version `1.20.3` ou à une version ultérieure pour supprimer par défaut les logs. Pour activer les logs, définissez la variable d'environnement `DD_TRACE_DEBUG` sur `1`.


##### Version de Python incompatible

Le mécanisme d'injection de bibliothèque pour Python prend uniquement en charge l'injection de bibliothèque Python pour Python v3.7+.

##### `user-installed ddtrace found, aborting`

- **Problème** : la bibliothèque `ddtrace` est déjà installée sur le système. Par conséquent, la logique d'injection annule le processus d'injection de bibliothèque afin d'éviter tout dysfonctionnement de l'application.
- **Solution** : si vous souhaitez injecter des bibliothèques, supprimez l'installation de `ddtrace`. Sinon, plutôt que d'injecter des bibliothèques, utilisez la bibliothèque installée ([voir la documentation][26]).


[1]: /fr/containers/cluster_agent/admission_controller/
[2]: https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/
[3]: /fr/containers/kubernetes/installation/?tab=helm
[4]: http://gcr.io/datadoghq/dd-lib-java-init
[5]: http://hub.docker.com/r/datadog/dd-lib-java-init
[6]: http://gallery.ecr.aws/datadog/dd-lib-java-init
[7]: http://gcr.io/datadoghq/dd-lib-js-init
[8]: http://hub.docker.com/r/datadog/dd-lib-js-init
[9]: http://gallery.ecr.aws/datadog/dd-lib-js-init
[10]: http://gcr.io/datadoghq/dd-lib-python-init
[11]: http://hub.docker.com/r/datadog/dd-lib-python-init
[12]: http://gallery.ecr.aws/datadog/dd-lib-python-init
[13]: http://gcr.io/datadoghq/dd-lib-dotnet-init
[14]: http://hub.docker.com/r/datadog/dd-lib-dotnet-init
[15]: http://gallery.ecr.aws/datadog/dd-lib-dotnet-init
[16]: https://github.com/DataDog/dd-trace-java/releases
[17]: https://github.com/DataDog/dd-trace-js/releases
[18]: https://github.com/DataDog/dd-trace-py/releases
[19]: https://github.com/DataDog/dd-trace-dotnet/releases
[20]: https://github.com/DataDog/dd-trace-rb/releases
[21]: /fr/getting_started/tagging/unified_service_tagging/
[22]: https://app.datadoghq.com/apm/traces
[23]: http://gcr.io/datadoghq/dd-lib-ruby-init
[24]: http://hub.docker.com/r/datadog/dd-lib-ruby-init
[25]: http://gallery.ecr.aws/datadog/dd-lib-ruby-init
[26]: /fr/tracing/trace_collection/dd_libraries/python/
{{% /tab %}}

{{% tab "Host" %}}

<div class="alert alert-info">L'injection de bibliothèque de tracing sur un host est disponible en version bêta.</div>

Lorsque l'Agent et vos services s'exécutent sur un host réel ou virtuel, Datadog injecte la bibliothèque de tracing à partir d'une bibliothèque préchargée qui remplace les appels par `execve`. Tous les processus lancés récemment sont interceptés et la bibliothèque d'instrumentation indiquée est injectée dans les services.

**Remarque** : l'injection sous arm64 n'est pas prise en charge.

## Installer à la fois l'injection de bibliothèque et l'Agent Datadog

**Prérequis** : vous devez disposer d'un host exécutant Linux.

Si l'Agent Datadog n'est pas encore installé sur le host, ou si vous souhaitez mettre à niveau votre installation de l'Agent Datadog, utilisez le script d'installation dédié pour installer à la fois les bibliothèques d'injection et l'Agent Datadog :

```shell
DD_APM_INSTRUMENTATION_ENABLED=host DD_API_KEY=<VOTRE_CLÉ> DD_SITE="<VOTRE_SITE>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Par défaut, l'exécution du script entraîne la prise en charge de Java, Node.js, Python, Ruby et .NET. Si vous souhaitez spécifier les langages à prendre en charge, définissez également la variable d'environnement `DD_APM_INSTRUMENTATION_LANGUAGES` (valeurs autorisées : `java`, `js`, `python`, `ruby` et `dotnet`). Pour spécifier plusieurs langages, séparez les valeurs par des virgules :

```shell
DD_APM_INSTRUMENTATION_LANGUAGES=java,js DD_APM_INSTRUMENTATION_ENABLED=host DD_API_KEY=<VOTRE_CLÉ> DD_SITE="<VOTRE_SITE>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Quittez et ouvrez un nouveau shell pour utiliser la bibliothèque d'injection.

## Installer uniquement l'injection de bibliothèque

**Prérequis** :
- Un host exécutant Linux
- Une installation récente de l'[Agent Datadog v7][1].

Si l'Agent Datadog est déjà installé sur le host, vous pouvez installer uniquement les bibliothèques d'injection :

1. Vérifiez que votre [Agent est en cours d'exécution][2].

2. Installez la bibliothèque en utilisant l'un des jeux de commandes suivants, où `<LANG>` correspond à `java`, `js`, `dotnet`, `python`, `ruby` ou `all` :

   **Pour Ubuntu, Debian ou d'autres distributions Linux basées sur Debian :**
   ```sh
   sudo apt-get update
   sudo apt-get install datadog-apm-inject datadog-apm-library-<LANG>
   ```
   **Pour CentOS, RedHat ou d'autres distributions reposant sur yum/RPM :**
   ```sh
   sudo yum makecache
   sudo yum install datadog-apm-inject datadog-apm-library-<LANG>
   ```

3. Exécutez la commande `dd-host-install`.

4. Quittez et ouvrez un nouveau shell pour utiliser la bibliothèque préchargée.

Une fois l'injection du host activée, vérifiez que les lignes suivantes se trouvent à la fin du fichier de configuration `/etc/datadog-agent/datadog.yaml` :

```yaml
# COMMENCER LA CONFIGURATION LD PRELOAD
apm_config:
  receiver_socket: /opt/datadog/apm/inject/run/apm.socket
use_dogstatsd: true
dogstatsd_socket: /opt/datadog/apm/inject/run/dsd.socket
remote_configuration:
  enabled: true
# TERMINER LA CONFIGURATION LD PRELOAD
```

Si ces propriétés sont définies sur d'autres valeurs, remplacez leur valeur afin qu'elles correspondent à celles indiquées ci-dessus. Si vous ne voyez pas ces propriétés, ajoutez-les. Redémarrez ensuite l'Agent Datadog.

## Étapes suivantes

Si vous ne l'avez pas déjà fait, installez votre application ainsi que les langages ou bibliothèques nécessaires.

Lorsque vous lancez une application rédigée dans un autre langage, l'injection s'effectue automatiquement, avec le tracing activé.

## Configurer l'injection

Procédez de l'une des façons suivantes pour configurer l'injection de host :
- Définissez les variables d'environnement sur le processus en cours de lancement.
- Spécifiez la configuration de l'injection de host dans le fichier `/etc/datadog-agent/inject/host_config.yaml`.

Les valeurs des variables d'environnement remplacent les paramètres du fichier de configuration pour les processus concernés.

### Fichier de configuration

| Nom de la propriété | Description | Valeur par défaut | Valeurs valides | 
| --------- | ----------- | ------------- | ----------- | 
|`log_level`  | Le niveau de journalisation|`off`|`off`, `debug`, `info`, `warn`, `error`|
|`output_paths`|L'emplacement où sont enregistrés les logs|`stderr`|`stderr` ou une URL de type `file://`|
|`env`|L'environnement par défaut attribué au processus|aucune|non applicable|
|`config_sources`|La configuration par défaut d'un processus|`BASIC`|Voir les [sources de configuration](#sources-de-configuration)|


#### Exemple

```yaml
---
log_level: debug
output_paths:
  - file:///tmp/host_injection.log
env: dev
config_sources: BASIC
```

### Variables d'environnement

Les variables d'environnement suivantes permettent de configurer l'injection de bibliothèque. Pour les passer, utilisez `export` via la ligne de commande (`export DD_CONFIG_SOURCES=BASIC`), la configuration du shell ou la commande de lancement.

Chacun des champs du fichier de configuration correspond à une variable d'environnement. Les variables d'environnement sont lues à partir de l'environnement du processus en cours de lancement et affectent uniquement ce processus.

|Propriété du fichier de configuration|Variable d'environnement|
| --------- | ----------- |  
|`log_level`|`DD_APM_INSTRUMENTATION_DEBUG`|
|`output_paths`|`DD_APM_INSTRUMENTATION_OUTPUT_PATHS`|
|`env`|`DD_ENV`|
|`config_sources`|`DD_CONFIG_SOURCES`|

La variable d'environnement `DD_APM_INSTRUMENTATION_DEBUG` peut uniquement être définie sur les valeurs `true` et `false` (valeur par défaut : `false`). Si vous la définissez sur `true`, `log_level` a pour valeur `debug`. Si vous la définissez sur `false` (ou ne la définissez pas), la valeur de `log_level` spécifiée dans le fichier de configuration est utilisée. Le niveau de log `debug` est le seul niveau pouvant être défini avec la variable d'environnement.

La variable d'environnement `DD_INSTRUMENT_SERVICE_WITH_APM` détermine si l'injection doit ou non être activée. Par défaut, sa valeur est `TRUE`. Définissez-la sur `FALSE` pour désactiver le processus d'injection de bibliothèque.

### Sources de configuration

Par défaut, les paramètres suivants sont activés au sein d'un processus instrumenté :
- Le tracing
- L'injection de logs, tant que l'application applique une journalisation structurée (généralement, au format JSON). Pour que les traces s'affichent dans des logs non structurés, vous devez modifier la configuration des logs de votre application, afin d'inclure des placeholders pour l'ID de trace et l'ID de span. Consultez la section [Associer les logs aux traces][6] pour en savoir plus.
- Les métriques de santé
- Les métriques runtime

Vous pouvez modifier ces paramètres pour l'ensemble des processus instrumentés. Pour ce faire, définissez la propriété `config_sources` dans le fichier de configuration. Pour modifier les paramètres pour un seul processus, définissez la variable d'environnement `DD_CONFIG_SOURCES` du processus. Voici les paramètres autorisés pour les sources de configuration :

|Nom de la source de configuration|Utilité|
| --------- | ----------- |  
|`BASIC`|Applique la configuration spécifiée plus haut. Si aucune source de configuration n'est spécifiée, celle-ci est utilisée par défaut.|
|`LOCAL:CHEMIN`|Applique la configuration au chemin spécifié dans le système de fichiers local. Le format du fichier de configuration est décrit plus bas. Exemple : `LOCAL:/opt/config/my_process_config.yaml`.|
|`BLOB:URL`| Applique la configuration au chemin spécifié dans un stockage d'objet compatible avec S3. L'URL de connexion et le format du fichier de configuration sont décrits plus bas. Exemple : `BLOB:s3://config_bucket/my_process_config.yaml?region=us-east-1`. |

Les valeurs `BASIC`, `LOCAL` et `BLOB` doivent être écrites en majuscules.

Les valeurs des sources de configuration peuvent être séparées par des points-virgules afin de spécifier plusieurs emplacements possibles. La première configuration qui ne renvoie pas d'erreur est utilisée. Les configurations ne sont pas combinées à partir de plusieurs sources de configuration. L'exemple suivant vérifie si un compartiment S3 comporte une configuration, passe ensuite au système de fichiers local, puis utilise la configuration par défaut intégrée :

```yaml
DD_CONFIG_SOURCES=BLOB:s3://config_bucket/my_process_config.yaml?region=us-east-1;LOCAL:/opt/config/my_process_config.yaml;BASIC
```

#### Prise en charge du stockage de blobs
Voici la liste des solutions de stockage de blobs prises en charge :
- **Amazon S3** : définissez l'URL à l'aide du préfixe `s3://`. Si l'authentification est effectuée via la CLI AWS, ces identifiants sont utilisés.
Consultez la [documentation sur le SDK AWS][7] (en anglais) pour en savoir plus sur la configuration d'identifiants à l'aide de variables d'environnement.
- **GCP GCS** : définissez l'URL avec le préfixe `gs://`. Les identifiants par défaut de l'application sont utilisés. L'authentification s'effectue via la commande gcloud auth application-default login. Consultez la [documentation relative à l'authentification de Google Cloud][8] pour en savoir plus sur la configuration d'identifiants à l'aide de variables d'environnement.
- **Stockage Blob Azure** : définissez l'URL avec le préfixe `azblob://`, et pointez vers un nom de conteneur de stockage. Les identifiants figurant dans `AZURE_STORAGE_ACCOUNT` (à savoir, le nom du compartiment), ainsi que dans `AZURE_STORAGE_KEY` et/ou `AZURE_STORAGE_SAS_TOKEN`, sont utilisés. Pour en savoir plus sur la configuration des paramètres `BLOB` et `LOCAL`, consultez la rubrique [Spécifier la source de configuration](#specifier-la-source-de-configuration).

<a id="supplying-configuration-source-host"></a>

### Spécifier la source de configuration

Le fichier de configuration des paramètres `LOCAL` et `BLOB` peut être converti au format JSON :

```json
{
    "version": 1,
    "service_language": "<LANG>",
    "tracing_enabled": true,
    "log_injection_enabled": true,
    "health_metrics_enabled": true,
    "runtime_metrics_enabled": true,
    "tracing_sampling_rate": 1.0,
    "tracing_rate_limit": 1,
    "tracing_tags": ["a=b", "foo"],
    "tracing_service_mapping": [
        { "from_key": "mysql", "to_name": "super_db"},
        { "from_key": "postgres", "to_name": "my_pg"}
    ],
    "tracing_agent_timeout": 1,
    "tracing_header_tags": [
        {"header": "HEADER", "tag_name":"tag"}
    ],
    "tracing_partial_flush_min_spans": 1,
    "tracing_debug": true,
    "tracing_log_level": "debug",
}
```

Ou au format YAML :

```yaml
---
version: 1
service_language: <LANG>
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
tracing_sampling_rate: 1.0
tracing_rate_limit: 1
tracing_tags:
- a=b
- foo
tracing_service_mapping:
- from_key: mysql
  to_name: super_db
- from_key: postgres
  to_name: my_pg
tracing_agent_timeout: 1
tracing_header_tags:
- header: HEADER
  tag_name: tag
tracing_partial_flush_min_spans: 1
tracing_debug: true
tracing_log_level: debug
```


`version` a toujours pour valeur `1`. Il s'agit de la version du schéma de configuration utilisé, et non de la version du contenu.

Si vous connaissez le langage utilisé, définissez `service_language` sur l'une des valeurs suivantes :

- `java`
- `node`
- `dotnet`
- `python`
- `ruby`

Si plusieurs langages sont utilisés, ne définissez pas `service_language`.

Le tableau suivant répertorie les valeurs de configuration d'injection et les [options de configuration des bibliothèques de tracing][4] correspondantes :

| Injection | Traceur Java | Traceur NodeJS | Tracer .NET | Traceur Python |
| --------- | ----------- | ------------- | ----------- | ------------- |
| `tracing_enabled` | `dd.trace.enabled` | `DD_TRACE_ENABLED` | `DD_TRACE_ENABLED` |  `DD_TRACE_ENABLED` |
| `log_injection_enabled` | `dd.logs.injection` | `DD_LOGS_INJECTION` | `DD_LOGS_INJECTION` |  `DD_LOGS_INJECTION` |
| `health_metrics_enabled` | `dd.trace.health.metrics.enabled` |    S.O.   |    S.O.  | S.O. |
| `runtime_metrics_enabled` | `dd.jmxfetch.enabled` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` |
| `tracing_sampling_rate` | `dd.trace.sample.rate` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE`  |
| `tracing_rate_limit` | `dd.trace.rate.limit`    | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` |
| `tracing_tags` | `dd.tags` | `DD_TAGS` | `DD_TAGS` | `DD_TAGS` |
| `tracing_service_mapping` | `dd.service.mapping` | `DD_SERVICE_MAPPING` | `DD_TRACE_SERVICE_MAPPING` | `DD_SERVICE_MAPPING` |
| `tracing_agent_timeout` | `dd.trace.agent.timeout` |  S.O. | S.O. | S.O. |
| `tracing_header_tags` | `dd.trace.header.tags` |    S.O.    | `DD_TRACE_HEADER_TAGS` | `DD_TRACE_HEADER_TAGS` |
| `tracing_partial_flush_min_spans` | `dd.trace.partial.flush.min.spans` | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS` | `DD_TRACE_PARTIAL_FLUSH_ENABLED ` | S.O. |
| `tracing_debug` | `dd.trace.debug` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` |
| `tracing_log_level` | `datadog.slf4j.simpleLogger.defaultLogLevel` | `DD_TRACE_LOG_LEVEL` |   S.O.    | S.O. |

Les options de configuration des bibliothèques de traceur qui ne sont pas mentionnées dans la configuration de l'injection peuvent tout de même être utilisées normalement dans les propriétés ou les variables d'environnement.

### Paramètres de la configuration BASIC

Les paramètres de configuration `BASIC` correspondent aux paramètres YAML suivants :

```yaml
---
version: 1
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
```

## Lancer vos services

Lancez vos services, en indiquant la configuration de bibliothèque préchargée dans la commande de lancement. Si le paramètre `DD_CONFIG_SOURCES` n'est pas spécifié, la valeur définie pour `config_sources` dans le fichier de configuration `/etc/datadog-agent/inject/host_config.yaml` est utilisée. Si ce paramètre n'est lui-même pas défini, `DD_CONFIG_SOURCES` prend pour valeur `BASIC` :

**Exemple d'application Java** :
```sh
java -jar <SERVICE_1>.jar &
DD_CONFIG_SOURCES=LOCAL:/etc/<SERVICE_2>/config.yaml;BASIC java -jar <SERVICE_2>.jar &
```

**Exemple d'application Node** :
```sh
node index.js &
DD_CONFIG_SOURCES=LOCAL:/etc/<SERVICE_2>/config.yaml;BASIC node index.js &
```

**Exemple d'application .NET** :
```sh
dotnet <SERVICE_1>.dll &
DD_CONFIG_SOURCES=LOCAL:/etc/<SERVICE_2>/config.yaml;BASIC dotnet <SERVICE_2>.dll &
```
**Exemple d'application Python** :
```sh
python <SERVICE_1>.py &
DD_CONFIG_SOURCES=LOCAL:/etc/<SERVICE_2>/config.yaml;BASIC python <SERVICE_2>.py &
```

Entraînez votre application afin qu'elle puisse commencer à générer des données de télémétrie, qui sont représentées sous forme de [traces dans APM][5].


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#start-the-agent
[3]: https://learn.microsoft.com/en-us/dotnet/core/install/linux-ubuntu
[4]: /fr/tracing/trace_collection/library_config/
[5]: https://app.datadoghq.com/apm/traces
[6]: /fr/tracing/other_telemetry/connect_logs_and_traces/
[7]: https://docs.aws.amazon.com/sdk-for-go/api/aws/session/
[8]: https://cloud.google.com/docs/authentication#service-accounts
{{% /tab %}}

{{% tab "Agent sur host, application dans des conteneurs" %}}

<div class="alert alert-info">L'injection de bibliothèque de tracing sur des hosts ou des conteneurs est disponible en version bêta.</a></div>


Lorsque votre Agent s'exécute sur un host et que vos services s'exécutent dans des conteneurs, Datadog injecte la bibliothèque de tracing en interceptant la création de conteneur et en configurant le conteneur Docker.

Tous les processus lancés récemment sont interceptés et la bibliothèque d'instrumentation indiquée est injectée dans les services.

**Remarque** : l'injection sous arm64 n'est pas prise en charge.

## Installer à la fois l'injection de bibliothèque et l'Agent Datadog

**Prérequis** :
- Un host exécutant Linux
- [Docker Engine][2]

Si l'Agent Datadog n'est pas encore installé sur le host, ou si vous souhaitez mettre à niveau votre installation de l'Agent Datadog, utilisez le script d'installation dédié pour installer à la fois les bibliothèques d'injection et l'Agent Datadog :

```shell
DD_APM_INSTRUMENTATION_ENABLED=all DD_API_KEY=<VOTRE_CLÉ> DD_SITE="<VOTRE_SITE>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Par défaut, l'exécution du script entraîne la prise en charge de Java, Node.js, Python, Ruby et .NET. Si vous souhaitez spécifier les langages à prendre en charge, définissez également la variable d'environnement `DD_APM_INSTRUMENTATION_LANGUAGES` (valeurs autorisées : `java`, `js`, `python`, `ruby` et `dotnet`). Pour spécifier plusieurs langages, séparez les valeurs par des virgules :

```shell
DD_APM_INSTRUMENTATION_LANGUAGES=java,js DD_APM_INSTRUMENTATION_ENABLED=all DD_API_KEY=<VOTRE_CLÉ> DD_SITE="<VOTRE_SITE>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

## Installer uniquement l'injection de bibliothèque

**Prérequis** : 
- Un host exécutant Linux
- Une installation récente de l'[Agent Datadog v7][1]
- [Docker Engine][2]

Si l'Agent Datadog est déjà installé sur le host, vous pouvez installer uniquement les bibliothèques d'injection :

1. Vérifiez que votre [Agent est en cours d'exécution][3].

2. Installez la bibliothèque en utilisant l'un des jeux de commandes suivants, où `<LANG>` correspond à `java`, `js`, `dotnet`, `python`, `ruby` ou `all` :

   **Pour Ubuntu, Debian ou d'autres distributions Linux basées sur Debian :**
   ```sh
   sudo apt-get update
   sudo apt-get install datadog-apm-inject datadog-apm-library-<LANG>
   ```
   **Pour CentOS, RedHat ou d'autres distributions reposant sur yum/RPM :**
   ```sh
   sudo yum makecache
   sudo yum install datadog-apm-inject datadog-apm-library-<LANG>
   ```

3. Exécutez la commande `dd-host-container-install`.

Une fois l'injection du host activée, vérifiez que les lignes suivantes se trouvent à la fin du fichier de configuration `/etc/datadog-agent/datadog.yaml` :

```yaml
# COMMENCER LA CONFIGURATION LD PRELOAD
apm_config:
  receiver_socket: /opt/datadog/apm/inject/run/apm.socket
use_dogstatsd: true
dogstatsd_socket: /opt/datadog/apm/inject/run/dsd.socket
remote_configuration:
  enabled: true
# TERMINER LA CONFIGURATION LD PRELOAD
```

Si ces propriétés sont définies sur d'autres valeurs, remplacez leur valeur afin qu'elles correspondent à celles indiquées ci-dessus. Si vous ne voyez pas ces propriétés, ajoutez-les. Redémarrez ensuite l'Agent Datadog.


## Configurer l'injection Docker {#configurer-l-injection-docker-2}

Si la configuration par défaut ne vous convient pas, vous devez modifier `/etc/datadog-agent/inject/docker_config.yaml` et ajoutez la configuration YAML suivante pour l'injection :

```yaml
---
log_level: debug
output_paths:
- stderr
config_sources: BASIC
```

`config_sources`
: Activez ou désactivez l'injection de bibliothèque et spécifiez une liste d'emplacements triée et séparée par des points-virgules où la configuration est stockée. La première valeur renvoyée sans erreur est utilisée. La configuration n'est pas unifiée à partir de toutes les sources de configuration. Voici la liste des valeurs autorisées :
  - `BLOB:<URL>` : chargez la configuration à partir d'un stockage de blobs (compatible avec S3) situé à l'adresse `<URL>`.
  - `LOCAL:<CHEMIN>` : chargez la configuration à partir d'un fichier du système de fichiers local situé à l'emplacement `<CHEMIN>`.
  - `BASIC` : utilisez les valeurs par défaut. Si `config_sources` n'est pas spécifié, cette configuration est utilisée.<br/>

Les valeurs `BASIC`, `LOCAL` et `BLOB` doivent être écrites en majuscules.

Les valeurs des sources de configuration peuvent être séparées par des points-virgules afin de spécifier plusieurs emplacements possibles. La première configuration qui ne renvoie pas d'erreur est utilisée. La configuration n'est pas unifiée à partir de plusieurs sources de configuration. L'exemple suivant vérifie si un compartiment S3 comporte une configuration, passe ensuite au système de fichiers local, puis utilise la configuration par défaut intégrée :

```yaml
config_sources: BLOB:s3://config_bucket/my_process_config.yaml?region=us-east-1;LOCAL:/opt/config/my_process_config.yaml;BASIC
```

Pour en savoir plus sur la configuration des paramètres `BLOB` ou `LOCAL`, consultez la rubrique [Spécifier la source de configuration](#supplying-configuration-source-hc).

`log_level`
: Définissez ce paramètre sur `debug` pour consigner en détail ce qui se passe ou sur `info`, `warn` ou `error` pour écrire moins d'informations.<br>
**Valeur par défaut** : `info`

`output_paths`
: La liste des emplacements dans lesquels les logs sont rédigés.<br>
**Valeur par défaut** : `stderr`

Facultatif : `env`
: Spécifie le tag `DD_ENV` pour les conteneurs exécutés dans Docker. Exemples : `dev`, `prod`, `staging`. <br>
**Valeur par défaut** : aucune.

<a id="supplying-configuration-source-hc"></a>

### Spécifier la source de configuration

Si vous spécifiez la source de configuration `BLOB` ou `LOCAL`, créez un fichier JSON ou YAML et fournissez la configuration au format JSON :

```json
{
    "version": 1,
    "service_language": "<LANG>",
    "tracing_enabled": true,
    "log_injection_enabled": true,
    "health_metrics_enabled": true,
    "runtime_metrics_enabled": true,
    "tracing_sampling_rate": 1.0,
    "tracing_rate_limit": 1,
    "tracing_tags": ["a=b", "foo"],
    "tracing_service_mapping": [
        { "from_key": "mysql", "to_name": "super_db"},
        { "from_key": "postgres", "to_name": "my_pg"}
    ],
    "tracing_agent_timeout": 1,
    "tracing_header_tags": [
        {"header": "HEADER", "tag_name":"tag"}
    ],
    "tracing_partial_flush_min_spans": 1,
    "tracing_debug": true,
    "tracing_log_level": "debug",
}

```

Ou au format YAML :
```yaml
---
version: 1
service_language: <LANGAGE>
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
tracing_sampling_rate: 1.0
tracing_rate_limit: 1
tracing_tags:
- a=b
- foo
tracing_service_mapping:
- from_key: mysql
  to_name: super_db
- from_key: postgres
  to_name: my_pg
tracing_agent_timeout: 1
tracing_header_tags:
- header: HEADER
  tag_name: tag
tracing_partial_flush_min_spans: 1
tracing_debug: true
tracing_log_level: debug
```

Définissez `service_language` sur l'une des valeurs suivantes :
- `java`
- `node`
- `dotnet`
- `python`
- `ruby`

Dans ce fichier de configuration, `version` a toujours pour valeur `1`. Il s'agit de la version du schéma de configuration utilisé, et non de la version du contenu.

Le tableau suivant répertorie les valeurs de configuration d'injection et les [options de configuration des bibliothèques de tracing][4] correspondantes :

| Injection | Traceur Java | Traceur NodeJS | Tracer .NET | Traceur Python |
| --------- | ----------- | ------------- | ----------- | ------------- |
| `tracing_enabled` | `dd.trace.enabled` | `DD_TRACE_ENABLED` | `DD_TRACE_ENABLED` |  `DD_TRACE_ENABLED` |
| `log_injection_enabled` | `dd.logs.injection` | `DD_LOGS_INJECTION` | `DD_LOGS_INJECTION` |  `DD_LOGS_INJECTION` |
| `health_metrics_enabled` | `dd.trace.health.metrics.enabled` |    S.O.   |    S.O.  | S.O. |
| `runtime_metrics_enabled` | `dd.jmxfetch.enabled` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` |
| `tracing_sampling_rate` | `dd.trace.sample.rate` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE`  |
| `tracing_rate_limit` | `dd.trace.rate.limit`       | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` |
| `tracing_tags` | `dd.tags` | `DD_TAGS` | `DD_TAGS` | `DD_TAGS` |
| `tracing_service_mapping` | `dd.service.mapping` | `DD_SERVICE_MAPPING` | `DD_TRACE_SERVICE_MAPPING` | `DD_SERVICE_MAPPING` |
| `tracing_agent_timeout` | `dd.trace.agent.timeout` |  S.O. | S.O. | S.O. |
| `tracing_header_tags` | `dd.trace.header.tags` |    S.O.    | `DD_TRACE_HEADER_TAGS` | `DD_TRACE_HEADER_TAGS` |
| `tracing_partial_flush_min_spans` | `dd.trace.partial.flush.min.spans` | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS` | `DD_TRACE_PARTIAL_FLUSH_ENABLED ` | S.O. |
| `tracing_debug` | `dd.trace.debug` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` |
| `tracing_log_level` | `datadog.slf4j.simpleLogger.defaultLogLevel` | `DD_TRACE_LOG_LEVEL` |   S.O.    | S.O. |

Les options de configuration des bibliothèques de traceur qui ne sont pas mentionnées dans la configuration de l'injection peuvent tout de même être utilisées normalement dans les propriétés ou les variables d'environnement.

#### Prise en charge du stockage de blobs
Voici la liste des solutions de stockage de blobs prises en charge :
- **Amazon S3** : définissez l'URL à l'aide du préfixe `s3://`. Si l'authentification est effectuée via la CLI AWS, ces identifiants sont utilisés.
Consultez la [documentation sur le SDK AWS][7] (en anglais) pour en savoir plus sur la configuration d'identifiants à l'aide de variables d'environnement.
- **GCP GCS** : définissez l'URL avec le préfixe `gs://`. Les identifiants par défaut de l'application sont utilisés. L'authentification s'effectue via la commande gcloud auth application-default login. Consultez la [documentation relative à l'authentification de Google Cloud][8] pour en savoir plus sur la configuration d'identifiants à l'aide de variables d'environnement.
- **Stockage Blob Azure** : définissez l'URL avec le préfixe `azblob://`, et pointez vers un nom de conteneur de stockage. Les identifiants figurant dans `AZURE_STORAGE_ACCOUNT` (à savoir, le nom du compartiment), ainsi que dans `AZURE_STORAGE_KEY` et/ou `AZURE_STORAGE_SAS_TOKEN`, sont utilisés. Pour en savoir plus sur la configuration des paramètres `BLOB` et `LOCAL`, consultez la rubrique [Spécifier la source de configuration](#supplying-configuration-source-hc).

### Paramètres de la configuration BASIC

Les paramètres de configuration `BASIC` correspondent aux paramètres YAML suivants :

```yaml
---
version: 1
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
```

## Spécifier des tags de service unifié sur les conteneurs

Si les variables d'environnement `DD_ENV`, `DD_SERVICE` ou `DD_VERSION` sont spécifiées dans une image de conteneur de service, ces valeurs sont utilisées pour taguer les données de télémétrie du conteneur.

Si ces variables ne sont pas spécifiées, `DD_ENV` utilise, le cas échéant, la valeur `env` définie dans le fichier de configuration `/etc/datadog-agent/inject/docker_config.yaml`. `DD_SERVICE` est récupéré à partir du nom de l'image Docker. Pour une image `my-service:1.0`, le tag `DD_SERVICE` de `my-service` est appliqué.

## Lancer vos services

Lancez votre Agent et vos services conteneurisés comme vous le feriez en temps normal.

Entraînez votre application afin qu'elle puisse commencer à générer des données de télémétrie, qui sont représentées sous forme de [traces dans APM][5].

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: https://docs.docker.com/engine/install/ubuntu/
[3]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#start-the-agent
[4]: /fr/tracing/trace_collection/library_config/
[5]: https://app.datadoghq.com/apm/traces
[7]: https://docs.aws.amazon.com/sdk-for-go/api/aws/session/
[8]: https://cloud.google.com/docs/authentication#service-accounts

{{% /tab %}}

{{% tab "Agent et application dans des conteneurs distincts" %}}

<div class="alert alert-info">L'injection de bibliothèque de tracing dans des conteneurs est disponible en version bêta.</div>

Lorsque votre Agent et vos services s'exécutent dans des conteneurs Docker distincts sur le même host, Datadog injecte la bibliothèque de tracing en interceptant la création du conteneur et en configurant le conteneur Docker.

Tous les processus lancés récemment sont interceptés et la bibliothèque d'instrumentation spécifiée est injectée dans les services.

**Prérequis** :
- [Docker Engine][1]

**Remarque** : l'injection sous arm64 n'est pas prise en charge.

## Installer la bibliothèque préchargée

Utilisez le script shell `install_script_docker_injection` pour installer automatiquement la prise en charge de l'injection Docker. Vous devez au préalable avoir installé Docker sur la machine du host.

```shell
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_docker_injection.sh)"
```

Cela permet d'installer les bibliothèques de tous les langages pris en charge. Pour installer seulement les bibliothèques de certains langages, définissez la variable d'environnement `DD_APM_INSTRUMENTATION_LANGUAGES`. Les valeurs `java`, `js`, `python`, `ruby` et `dotnet` sont autorisées :

```shell
DD_APM_INSTRUMENTATION_LANGUAGES=java,js bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_docker_injection.sh)"
```

## Configurer l'injection Docker

Modifiez `/etc/datadog-agent/inject/docker_config.yaml` et ajoutez la configuration YAML suivante pour l'injection :

```yaml
---
log_level: debug
output_paths:
- stderr
config_sources: BASIC
```

`config_sources`
: Activez ou désactivez l'injection de bibliothèque et spécifiez une liste d'emplacements triée et séparée par des points-virgules où la configuration est stockée. La première valeur renvoyée sans erreur est utilisée. La configuration n'est pas unifiée à partir de toutes les sources de configuration. Voici la liste des valeurs autorisées :
  - `BLOB:<URL>` : chargez la configuration à partir d'un stockage de blobs (compatible avec S3) situé à l'adresse `<URL>`.
  - `LOCAL:<CHEMIN>` : chargez la configuration à partir d'un fichier du système de fichiers local situé à l'emplacement `<CHEMIN>`.
  - `BASIC` : utilisez les valeurs par défaut. Si `config_sources` n'est pas spécifié, cette configuration est utilisée.<br/>

Les valeurs `BASIC`, `LOCAL` et `BLOB` doivent être écrites en majuscules.

Les valeurs des sources de configuration peuvent être séparées par des points-virgules afin de spécifier plusieurs emplacements possibles. La première configuration qui ne renvoie pas d'erreur est utilisée. La configuration n'est pas unifiée à partir de plusieurs sources de configuration. L'exemple suivant vérifie si un compartiment S3 comporte une configuration, passe ensuite au système de fichiers local, puis utilise la configuration par défaut intégrée :

```yaml
config_sources: BLOB:s3://config_bucket/my_process_config.yaml?region=us-east-1;LOCAL:/opt/config/my_process_config.yaml;BASIC
```


Pour en savoir plus sur la configuration des paramètres `BLOB` ou `LOCAL`, consultez la rubrique [Spécifier la source de configuration](#supplying-configuration-source-hc).

`log_level`
: Définissez ce paramètre sur `debug` pour consigner en détail ce qui se passe ou sur `info` pour consigner moins d'informations.

`output_paths`
: La liste des emplacements dans lesquels les logs sont rédigés.<br>
**Valeur par défaut** : `stderr`

Facultatif : `env`
: Spécifie le tag `DD_ENV` pour les conteneurs exécutés dans Docker. Exemples : `dev`, `prod`, `staging`. <br>
**Valeur par défaut** : aucune.

<a id="supplying-configuration-source-c"></a>

### Spécifier la source de configuration

Si vous spécifiez la source de configuration `BLOB` ou `LOCAL`, créez un fichier JSON ou YAML et fournissez la configuration au format JSON :

```json
{
    "version": 1,
    "service_language": "<LANGAGE>",
    "tracing_enabled": true,
    "log_injection_enabled": true,
    "health_metrics_enabled": true,
    "runtime_metrics_enabled": true,
    "tracing_sampling_rate": 1.0,
    "tracing_rate_limit": 1,
    "tracing_tags": ["a=b", "foo"],
    "tracing_service_mapping": [
        { "from_key": "mysql", "to_name": "super_db"},
        { "from_key": "postgres", "to_name": "my_pg"}
    ],
    "tracing_agent_timeout": 1,
    "tracing_header_tags": [
        {"header": "HEADER", "tag_name":"tag"}
    ],
    "tracing_partial_flush_min_spans": 1,
    "tracing_debug": true,
    "tracing_log_level": "debug",
}

```

Ou au format YAML :
```yaml
---
version: 1
service_language: <LANGAGE>
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
tracing_sampling_rate: 1.0
tracing_rate_limit: 1
tracing_tags:
- a=b
- foo
tracing_service_mapping:
- from_key: mysql
  to_name: super_db
- from_key: postgres
  to_name: my_pg
tracing_agent_timeout: 1
tracing_header_tags:
- header: HEADER
  tag_name: tag
tracing_partial_flush_min_spans: 1
tracing_debug: true
tracing_log_level: debug
```

Définissez `service_language` sur l'une des valeurs suivantes :
- `java`
- `node`
- `dotnet`
- `python`
- `ruby`

Dans ce fichier de configuration, `version` a toujours pour valeur `1`. Il s'agit de la version du schéma de configuration utilisé, et non de la version du contenu.

Le tableau suivant répertorie les valeurs de configuration d'injection et les [options de configuration des bibliothèques de tracing][3] correspondantes :

| Injection | Traceur Java | Traceur NodeJS | Tracer .NET | Traceur Python |
| --------- | ----------- | ------------- | ----------- | ------------- |
| `tracing_enabled` | `dd.trace.enabled` | `DD_TRACE_ENABLED` | `DD_TRACE_ENABLED` |  `DD_TRACE_ENABLED` |
| `log_injection_enabled` | `dd.logs.injection` | `DD_LOGS_INJECTION` | `DD_LOGS_INJECTION` |  `DD_LOGS_INJECTION` |
| `health_metrics_enabled` | `dd.trace.health.metrics.enabled` |    S.O.   |    S.O.  | S.O. |
| `runtime_metrics_enabled` | `dd.jmxfetch.enabled` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` |
| `tracing_sampling_rate` | `dd.trace.sample.rate` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE`  |
| `tracing_rate_limit` | `dd.trace.rate.limit`       | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` |
| `tracing_tags` | `dd.tags` | `DD_TAGS` | `DD_TAGS` | `DD_TAGS` |
| `tracing_service_mapping` | `dd.service.mapping` | `DD_SERVICE_MAPPING` | `DD_TRACE_SERVICE_MAPPING` | `DD_SERVICE_MAPPING` |
| `tracing_agent_timeout` | `dd.trace.agent.timeout` |  S.O. | S.O. | S.O. |
| `tracing_header_tags` | `dd.trace.header.tags` |    S.O.    | `DD_TRACE_HEADER_TAGS` | `DD_TRACE_HEADER_TAGS` |
| `tracing_partial_flush_min_spans` | `dd.trace.partial.flush.min.spans` | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS` | `DD_TRACE_PARTIAL_FLUSH_ENABLED ` | S.O. |
| `tracing_debug` | `dd.trace.debug` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` |
| `tracing_log_level` | `datadog.slf4j.simpleLogger.defaultLogLevel` | `DD_TRACE_LOG_LEVEL` |   S.O.    | S.O. |

Les options de configuration des bibliothèques de traceur qui ne sont pas mentionnées dans la configuration de l'injection peuvent tout de même être utilisées normalement dans les propriétés ou les variables d'environnement.

#### Prise en charge du stockage de blobs
Voici la liste des solutions de stockage de blobs prises en charge :
- **Amazon S3** : définissez l'URL à l'aide du préfixe `s3://`. Si l'authentification est effectuée via la CLI AWS, ces identifiants sont utilisés.
Consultez la [documentation sur le SDK AWS][7] (en anglais) pour en savoir plus sur la configuration d'identifiants à l'aide de variables d'environnement.
- **GCP GCS** : définissez l'URL avec le préfixe `gs://`. Les identifiants par défaut de l'application sont utilisés. L'authentification s'effectue via la commande gcloud auth application-default login. Consultez la [documentation relative à l'authentification de Google Cloud][8] pour en savoir plus sur la configuration d'identifiants à l'aide de variables d'environnement.
- **Stockage Blob Azure** : définissez l'URL avec le préfixe `azblob://`, et pointez vers un nom de conteneur de stockage. Les identifiants figurant dans `AZURE_STORAGE_ACCOUNT` (à savoir, le nom du compartiment), ainsi que dans `AZURE_STORAGE_KEY` et/ou `AZURE_STORAGE_SAS_TOKEN`, sont utilisés. Pour en savoir plus sur la configuration des paramètres `BLOB` et `LOCAL`, consultez la rubrique [Spécifier la source de configuration](#supplying-configuration-source-hc).

### Paramètres de la configuration BASIC

Les paramètres de configuration `BASIC` correspondent aux paramètres YAML suivants :

```yaml
---
version: 1
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
```

## Configurer l'Agent

Dans le fichier Docker Compose qui lance vos conteneurs, utilisez les paramètres suivants pour l'Agent., en définissant en toute sécurité votre propre clé d'API Datadog pour `${DD_API_KEY}` 

```yaml
  dd-agent:
    container_name: dd-agent
    image: datadog/agent:7
    environment:
      - DD_API_KEY=${DD_API_KEY}
      - DD_APM_ENABLED=true
      - DD_APM_NON_LOCAL_TRAFFIC=true
      - DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true
      - DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket
      - DD_DOGSTATSD_SOCKET=/opt/datadog/apm/inject/run/dsd.socket
    volumes:
      - /opt/datadog/apm:/opt/datadog/apm
      - /var/run/docker.sock:/var/run/docker.sock:ro
```

## Spécifier des tags de service unifié sur les conteneurs

Si les variables d'environnement `DD_ENV`, `DD_SERVICE` ou `DD_VERSION` sont spécifiées dans une image de conteneur de service, ces valeurs sont utilisées pour taguer les données de télémétrie du conteneur.

Si ces variables ne sont pas spécifiées, `DD_ENV` utilise, le cas échéant, la valeur `env` définie dans le fichier de configuration `/etc/datadog-agent/inject/docker_config.yaml`. `DD_SERVICE` est récupéré à partir du nom de l'image Docker. Pour une image `my-service:1.0`, le tag `DD_SERVICE` de `my-service` est appliqué.

## Lancer l'Agent sur Docker

Le conteneur `dd-agent` doit être lancé avant tout conteneur de service. Exécutez ce qui suit :

```sh
docker-compose up -d dd-agent
```

## Lancer vos services

Lancez vos services conteneurisés comme vous le feriez en temps normal.

Entraînez votre application afin qu'elle puisse commencer à générer des données de télémétrie, qui sont représentées sous forme de [traces dans APM][4].



[1]: https://docs.docker.com/engine/install/ubuntu/
[2]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
[3]: /fr/tracing/trace_collection/library_config/
[4]: https://app.datadoghq.com/apm/traces
[7]: https://docs.aws.amazon.com/sdk-for-go/api/aws/session/
[8]: https://cloud.google.com/docs/authentication#service-accounts
{{% /tab %}}


{{< /tabs >}}

## Désinstaller l'injection de bibliothèque

### Supprimer l'instrumentation de certains services

Pour arrêter de générer des traces pour un service donné, exécutez les commandes suivantes, puis redémarrez le service :

{{< tabs >}}
{{% tab "Host" %}}

1. Ajoutez la variable d'environnement `DD_INSTRUMENT_SERVICE_WITH_APM` à la commande de lancement du service :

   ```shell
   DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Redémarrez le service.

{{% /tab %}}

{{% tab "Agent et application dans des conteneurs distincts" %}}

1. Ajoutez la variable d'environnement `DD_INSTRUMENT_SERVICE_WITH_APM` à la commande de lancement du service :
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false
   ```
2. Redémarrez le service.
{{% /tab %}}

{{< /tabs >}}

### Supprimer APM pour tous les services sur l'infrastructure

Pour arrêter de générer des traces, supprimez les injecteurs de bibliothèque et redémarrez l'infrastructure :


{{< tabs >}}
{{% tab "Host" %}}

1. Exécutez ce qui suit :
   ```shell
   dd-host-install --uninstall
   ```
2. Redémarrez votre host.

{{% /tab %}}

{{% tab "Agent et application dans des conteneurs distincts" %}}

1. Désinstallez l'injection de bibliothèque locale :
   ```shell
   dd-container-install --uninstall
   ```
2. Redémarrez Docker :
   ```shell
   systemctl restart docker
   ```
   Sinon, utilisez une commande équivalente pour votre environnement.

{{% /tab %}}

{{< /tabs >}}

## Configuration de la bibliothèque

Les fonctionnalités et les options de configuration prises en charge pour la bibliothèque de tracing sont les mêmes pour l'injection de bibliothèque, ainsi que pour les autres méthodes d'installation. Elles peuvent être définies à l'aide de variables d'environnement. Consultez la [section relative à la configuration de la bibliothèque Datadog][2] correspondant à votre langage pour en savoir plus.

Par exemple, vous pouvez activer [Application Security Monitoring][3] ou le [profileur en continu][4], ce qui est susceptible d'augmenter vos coûts :

- Pour **Kubernetes**, définissez la variable d'environnement `DD_APPSEC_ENABLED` ou `DD_PROFILING_ENABLED` sur `true` dans le fichier de déploiement du pod de l'application sous-jacent.

- Pour **hosts and containers**, définissez la variable d'environnement de conteneur `DD_APPSEC_ENABLED` ou `DD_PROFILING_ENABLED` sur `true`. Vous pouvez également ajouter une section `additional_environment_variables` dans la [configuration d'injection](#specifier-la-source-de-configuration), comme dans l'exemple YAML suivant :

  ```yaml
  additional_environment_variables:
  - key: DD_PROFILING_ENABLED
    value: true
  - key: DD_APPSEC_ENABLED
    value: true
  ```

  Seules les clés de configuration commençant par `DD_` peuvent être définies à la section `additional_environment_variables` de la source de configuration d'injection.


[1]: /fr/tracing/trace_collection/
[2]: /fr/tracing/trace_collection/library_config/
[3]: /fr/security/application_security/enabling/java/?tab=kubernetes#get-started
[4]: /fr/profiler/enabling/java/?tab=environmentvariables#installation