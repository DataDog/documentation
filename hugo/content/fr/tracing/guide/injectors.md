---
description: Découvrez comment l'injecteur fonctionne avec Single Step Instrumentation
  pour instrumenter automatiquement les applications au moment de l'exécution sans
  configuration manuelle.
further_reading:
- link: tracing/trace_collection/automatic_instrumentation/single-step-apm
  tag: Documentation
  text: Instrumentation APM en une étape
title: Comprendre le comportement de l'injecteur avec Single Step Instrumentation
---
## Présentation {#overview}

L'injecteur est une bibliothèque partagée qui instrumente automatiquement les applications au moment de l'exécution. Avec [Single Step Instrumentation][1], l'injecteur automatise la configuration de l'environnement et l'initialisation du traceur, éliminant ainsi le besoin de configuration manuelle.

## Comment l'injecteur est chargé {#how-the-injector-is-loaded}

### Linux {#linux}

Sur les systèmes Linux, l'injecteur utilise le mécanisme `LD_PRELOAD` — une fonctionnalité de liaison dynamique dans les environnements de type UNIX — pour se charger dans tous les processus liés dynamiquement. Cela peut se produire de deux manières :
- Explicitement, en définissant la variable d'environnement `LD_PRELOAD`.
- Implicitement, en modifiant le fichier `/etc/ld.so.preload` à l'échelle du système.

### Docker {#docker}

Dans les environnements Docker, l'injecteur utilise le même mécanisme `LD_PRELOAD` que sur les hosts Linux pour se charger dans les processus d'application au moment de l'exécution. Cela lui permet d'initialiser la logique de traçage et de modifier les variables d'environnement avant le démarrage de l'application.

Pour activer cela, Datadog fournit un shim `runc` personnalisé qui remplace le runtime de conteneur par défaut de Docker. L'objectif du shim est de :
1. Injecter la bibliothèque partagée (l'injecteur) dans le conteneur.
1. Définir la variable d'environnement `LD_PRELOAD`, garantissant que l'injecteur est chargé dans tous les processus liés dynamiquement à l'intérieur du conteneur.

### Kubernetes {#kubernetes}

Dans les environnements Kubernetes, l'injection est gérée par le Datadog Admission Controller, qui utilise un webhook d'admission mutant. Lorsqu'un pod est planifié, le contrôleur :

1. Évalue si le pod doit être instrumenté en fonction des sélecteurs configurés (tels que les espaces de noms, les étiquettes ou des propriétés de pod spécifiques).
1. Modifie la spécification du pod pour :
   - Fournir l'injecteur et les SDK à l'aide d'init containers ou du Datadog CSI driver
   - Définir les variables d'environnement (telles que `LD_PRELOAD`)
   - Monter des volumes pour conserver les bibliothèques injectées

Par défaut, SSI sélectionne la méthode de livraison la mieux adaptée à votre cluster. Vous pouvez également choisir explicitement un [mode d'injection][2].

Les deux méthodes de livraison fonctionnent comme suit :

- **Conteneurs d'initialisation** : Un conteneur d'initialisation s'exécute dans chaque pod avant le démarrage de l'application et copie les fichiers de l'injecteur et du SDK dans le conteneur d'application.
- **Datadog CSI driver** : Un DaemonSet s'exécute sur chaque nœud. Le pilote monte les fichiers de l'injecteur et du SDK directement depuis le système de fichiers du nœud dans le conteneur, de sorte qu'aucun conteneur d'initialisation n'est créé. La première fois qu'un nœud utilise un SDK, le pilote le télécharge et le met en cache. Les pods ultérieurs sur ce nœud montent le SDK depuis le cache, ce qui réduit la surcharge des ressources et diminue le temps de démarrage des pods à grande échelle.

### Windows {#windows}

Sous Windows, l'injecteur est fourni sous forme de DLL. Un pilote de noyau Datadog charge la DLL de l'injecteur dans chaque nouveau processus, et la fonction `DllMain` de la DLL s'exécute avant le point d'entrée de l'application. Après le chargement, l'injecteur suit le même flux que celui décrit dans [Comportement de l'injecteur](#injector-behavior). Windows prend uniquement en charge Java et .NET. La détection de l'environnement d'exécution sous Windows diffère de celle sous Linux en termes d'implémentation, mais le comportement d'instrumentation qui en résulte est identique.

## Comportement de l'injecteur {#injector-behavior}

Une fois l'injecteur chargé dans l'espace mémoire d'un processus, quelle que soit la plateforme, il effectue les opérations suivantes :
- Détecte l'environnement d'exécution de l'application (tel que Python, Node.js, PHP, Java, .NET, Ruby ou NGINX).
- Évalue si le processus doit être instrumenté. Certains processus sont exclus par défaut. Vous pouvez également définir des règles d'instrumentation pour autoriser ou refuser l'injection par charge de travail sur [Linux][3], [Kubernetes][4] et [Windows][5].
- Modifie les variables d'environnement ou les arguments de ligne de commande pour charger le SDK de traçage approprié.
- Émet des données de télémétrie pour signaler l'état et faciliter le débogage.

Si l'injection échoue ou si aucun environnement d'exécution pris en charge n'est détecté, l'application continue de s'exécuter sans instrumentation. Il en va de même si un processus est exclu par la configuration.

**Remarque** : Étant donné que l'injecteur s'exécute avant que le SDK n'évalue ses variables d'environnement, la définition de `DD_TRACE_ENABLED=false` n'empêche pas SSI de charger le SDK. Pour désactiver ou supprimer SSI, consultez la page de configuration [Single Step APM Instrumentation][1] pour votre plateforme.

## Cycle de vie de l'injecteur {#injector-life-cycle}

L'injecteur termine son travail avant l'exécution de la fonction `main` de l'application. Il ne s'agit pas d'un processus ou d'un thread d'arrière-plan qui s'exécute parallèlement à l'application.

Une fois que l'injecteur a défini les variables d'environnement ou les arguments de ligne de commande nécessaires, l'application continue de s'exécuter normalement. À partir de ce moment, le seul code Datadog présent dans le processus est le SDK de traçage que l'application elle-même charge en utilisant cette configuration.

## Instrumentation par environnement d'exécution {#per-runtime-instrumentation}

L'injecteur charge le SDK de traçage approprié en définissant des variables d'environnement ou en modifiant les arguments de ligne de commande pour le processus de l'application. Le mécanisme varie selon l'environnement d'exécution :

| Environnement d'exécution  | Mécanisme |
|----------|-----------|
| Java     | Définit `JAVA_TOOL_OPTIONS` avec `-javaagent:<path-to-dd-java-agent.jar>`. |
| Python   | Définit `PYTHONPATH` avec le chemin du répertoire d'installation du traceur. |
| Node.js  | Définit `NODE_OPTIONS` avec `--require` (CommonJS) ou `--import` (modules ECMAScript). |
| Ruby     | Définit `RUBYOPT` avec `-r <path-to-Datadog-host-inject-script>`. |
| .NET     | Définit les variables d'environnement du profileur CLR .NET (`CORECLR_ENABLE_PROFILING`, `CORECLR_PROFILER`, `CORECLR_PROFILER_PATH` et les variables associées). |
| PHP      | Définit `PHP_INI_SCAN_DIR` avec le chemin d'un répertoire de chargement fourni par Datadog. |
| NGINX    | Réexécute le binaire NGINX avec des arguments de ligne de commande ajoutés pour charger le module Datadog (par exemple, `-g "load_module <path-to-Datadog-module>;"`). |

## Privilèges et périmètre {#privileges-and-scope}

### Périmètre de l'injection {#injection-scope}

SSI instrumente les applications en chargeant un traceur ou un profileur dans leur processus au moyen de la liaison dynamique en espace utilisateur (par exemple, `LD_PRELOAD` sous Linux ou l'injection de DLL sous Windows). Il n'installe pas de modules de noyau, n'applique pas de correctifs au noyau, n'intercepte pas les appels système et n'utilise pas eBPF. L'injecteur et le traceur ou le profileur s'exécutent avec les mêmes privilèges de système d'exploitation que le processus de l'application — voir [Privilèges d'exécution](#runtime-privileges).

Bien que le code injecté s'exécute à l'intérieur du processus de l'application, certains modes de déploiement mettent à jour la configuration du système d'exploitation ou de l'environnement d'exécution afin que l'injecteur se charge automatiquement :

- **Injection par contrôleur d'admission Kubernetes** : Modifie les spécifications des pods pour monter l'injecteur (à l'aide d'un init container ou du [Datadog CSI driver][2]) et définir des variables d'environnement. Il s'agit d'une action de l'API Kubernetes, et non d'une modification du système d'exploitation du host.
- **Injection sur host Linux** : Configure le chargeur dynamique (généralement via `/etc/ld.so.preload`) afin que chaque nouveau processus lié dynamiquement charge le lanceur d'injection. Il s'agit d'un changement de configuration au niveau du système d'exploitation, mais cela reste de la liaison dynamique en espace utilisateur, et non du code de noyau.
- **Injection via le runtime Docker** : Configure Docker pour utiliser un runtime wrapper afin que les conteneurs démarrent avec le traceur monté et configuré (généralement en injectant une variable d'environnement `LD_PRELOAD` dans le conteneur). Cela modifie la configuration du démon Docker.
- **Injection Windows** : Installe un pilote de noyau qui charge la DLL de l'injecteur dans les nouveaux processus. Le pilote s'exécute au niveau du système d'exploitation. Le code injecté qui s'exécute à l'intérieur de chaque processus d'application reste en espace utilisateur.

### Privilèges d'exécution {#runtime-privileges}

L'injecteur, le traceur et le profileur s'exécutent tous à l'intérieur du processus de l'application et héritent des mêmes autorisations du système d'exploitation que ce processus. Ils n'obtiennent pas de privilèges supplémentaires. Si l'application s'exécute en tant qu'utilisateur restreint, l'injecteur, le traceur et le profileur sont également limités aux autorisations de cet utilisateur.

### Privilèges d'installation {#installation-privileges}

Les exigences de privilèges au moment de l'installation dépendent du mode de déploiement :

#### Contrôleur d'admission Kubernetes {#kubernetes-admission-controller}

- **Les composants côté cluster** (le Datadog Cluster Agent et le contrôleur d'admission) nécessitent généralement des autorisations au niveau du cluster pour enregistrer des webhooks et modifier des pods.
- **Les pods d'application** ne nécessitent pas de privilèges élevés au niveau du système d'exploitation de la part de Datadog, mais les clusters renforcés peuvent avoir besoin d'autoriser :
  - Les montages de volumes utilisés pour communiquer avec l'Agent (généralement un montage `hostPath` vers un répertoire de sockets).
  - Des autorisations spécifiques pour `SecurityContext` ou les SCC.

  Vous pouvez maintenir le conteneur d'application soumis à des restrictions (exécution sans droits root, capacités supprimées, aucune élévation de privilèges) tant que vos politiques autorisent les montages requis. Si SSI utilise des conteneurs d'initialisation, il en va de même pour le conteneur d'initialisation injecté.

#### Host Linux {#linux-host}

- L'installation nécessite généralement les privilèges root (ou équivalents), car elle installe des paquets et peut modifier la configuration du chargeur à l'échelle du système ainsi que la configuration des services.
- Après l'installation, le service Datadog Agent s'exécute en tant que son propre utilisateur de service (généralement `dd-agent`), et le code injecté s'exécute avec les privilèges de l'utilisateur de l'application.

#### Environnement d'exécution Docker sur un host {#docker-runtime-on-a-host}

- L'installation et la configuration nécessitent généralement les privilèges root, car elles modifient la configuration du démon Docker.
- Au moment de l'exécution, l'injecteur et le traceur s'exécutent dans le processus d'application du conteneur en tant qu'utilisateur de ce conteneur.

#### Windows {#windows-1}

- L'installation du Datadog Agent sur Windows nécessite des privilèges d'administrateur (installation du service et configuration à l'échelle du système).
- Pour l'instrumentation d'application (par exemple, .NET), le profileur s'exécute dans le contexte du processus cible. Les modifications de configuration à l'échelle du système activent le profileur pour les processus et les services, mais elles n'accordent pas de privilèges supplémentaires au profileur.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm
[2]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes/#configure-injection-modes
[3]: /fr/tracing/trace_collection/single-step-apm/linux/#define-instrumentation-rules
[4]: /fr/tracing/trace_collection/single-step-apm/kubernetes/#target-specific-workloads
[5]: /fr/tracing/trace_collection/single-step-apm/windows/#define-instrumentation-rules