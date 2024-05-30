---
code_lang: dotnet
code_lang_weight: 60
further_reading:
- link: /tracing/troubleshooting
  tag: Documentation
  text: Dépannage d'APM
kind: Documentation
title: Dépannage du profileur .NET
type: multi-code-lang
---

## Profils manquants sur la page de recherche de profils

Si vous avez configuré le profileur et ne voyez aucun profil dans la page de recherche de profils, effectuez les vérifications suivantes (selon votre système d'exploitation).

{{< tabs >}}

{{% tab "Linux" %}}

1. Vérifiez que l'Agent a bien été installé et qu'il est en cours d'exécution.

2. Vérifiez que le profileur a été chargé à partir du log loader :

   1. Ouvrez le log `dotnet-native-loader-dotnet-<pid>` dans le dossier `/var/log/datadog`.

   2. Recherchez le message `CorProfiler::Initialize: Continuous Profiler initialized successfully.` vers la fin du log. Si vous ne trouvez pas ce message, activez les logs de debugging en définissant la variable d'environnement `DD_TRACE_DEBUG` pour l'application.

   3. Redémarrez l'application.

   4. Ouvrez le log `dotnet-native-loader-dotnet-<pid>` dans le dossier `/var/log/datadog`.

   5. Recherchez l'entrée `#Profiler`.

   6. Passez en revue les lignes suivantes afin de vérifier que la bibliothèque du profileur a bien été chargée :
      ```
      [...] #Profiler
      [...] PROFILER;{BD1A650D-AC5D-4896-B64F-D6FA25D6B26A};win-x64;.\Datadog.Profiler.Native.dll
      [...] PROFILER;{BD1A650D-AC5D-4896-B64F-D6FA25D6B26A};win-x86;.\Datadog.Profiler.Native.dll
      [...] DynamicDispatcherImpl::LoadConfiguration: [PROFILER] Loading: .\Datadog.Profiler.Native.dll [AbsolutePath=/opt/datadog/linux-x64/./Datadog.Tracer.Native.so]
      [...] [PROFILER] Creating a new DynamicInstance object
      [...] Load: /opt/datadog/linux-x64/./Datadog.Tracer.Native.so
      [...] GetFunction: DllGetClassObject
      [...] GetFunction: DllCanUnloadNow
      ```

3. Vérifiez le résultat de l'exportation de profils en procédant comme suit :

   1. Si vous n'avez pas activé les logs de debugging lors de l'étape 2.2, définissez la variable d'environnement `DD_TRACE_DEBUG` sur `true` pour l'application, puis redémarrez cette dernière.

   2. Ouvrez le log `DD-DotNet-Profiler-Native-<Nom de l'application>-<pid>` dans le dossier `/var/log/datadog`.

   3. Recherchez les entrées `libddprof error: Failed to send profile.` Ce message indique que le profileur ne parvient pas à communiquer avec l'Agent. Vérifiez que la valeur de `DD_TRACE_AGENT_URL` correspond à l'URL de l'Agent. Consultez la documentation relative à [l'activation et à la configuration du profileur .NET][1] pour en savoir plus.

   4. Si vous ne voyez pas de message `Failed to send profile`, recherchez à la place les entrées `The profile was sent. Success?`.

      Le message suivant s'affiche lorsque le profil a bien été envoyé :
      ```
      true, Http code: 200
      ```

   5. Si d'autres codes HTTP sont indiqués, vérifiez les erreurs correspondantes (par exemple, le code 403 signifie que la clé API n'est pas valide).

4. S'il vous manque des profils relatifs au CPU ou au wall time, vérifiez que le gestionnaire de signaux Datadog servant au traitement des stack traces n'a pas été remplacé :

   1. Ouvrez le log `DD-DotNet-Profiler-Native-<Nom de l'application>-<pid>` dans le dossier `/var/log/datadog`.

   2. Recherchez les deux messages suivants :
      - `Profiler signal handler was replaced again. It will not be restored: the profiler is disabled.`
      - `Fail to restore profiler signal handler.`

   3. Si vous trouvez l'un de ces messages, cela signifie que le code de l'application ou du code tiers réinstalle régulièrement son propre gestionnaire de signaux à la place du gestionnaire de signaux Datadog. Pour éviter tout conflit supplémentaire, les profils relatifs au CPU et au wall time sont désactivés.

   Sachez que le message suivant peut également s'afficher : `Profiler signal handler has been replaced. Restoring it.` Celui-ci n'a aucune incidence sur les fonctionnalités de profiling Datadog. Il indique simplement que le gestionnaire de signaux Datadog a été réinstallé après avoir été remplacé.

[1]: /fr/profiler/enabling/dotnet/?tab=linux#configuration

{{% /tab %}}

{{% tab "Windows" %}}

Le répertoire de logs par défaut du profileur est `%ProgramData%\Datadog .NET Tracer\logs\`. Pour les versions antérieures à la v.2.24, il s'agit plutôt du répertoire `%ProgramData%\Datadog-APM\logs\DotNet`.

1. Assurez-vous que l'Agent est installé, qu'il est en cours d'exécution et qu'il est visible dans le volet Windows Services.

2. Vérifiez que le profileur a été chargé à partir du log loader :

   1. Ouvrez le fichier de log `dotnet-native-loader-<Nom_Application>-<pid>` depuis le dossier de logs par défaut.

   2. Recherchez le message `CorProfiler::Initialize: Continuous Profiler initialized successfully.` vers la fin du log. Si vous ne trouvez pas ce message, activez les logs de debugging en définissant la variable d'environnement `DD_TRACE_DEBUG` pour l'application.

   3. Redémarrez l'application.

   4. Ouvrez le fichier de log `dotnet-native-loader-<Nom_Application>-<pid>` depuis le dossier de logs par défaut.

   5. Recherchez l'entrée `#Profiler`.

   6. Passez en revue les lignes suivantes afin de vérifier que la bibliothèque du profileur a bien été chargée :
      ```
      [...] #Profiler
      [...] PROFILER;{BD1A650D-AC5D-4896-B64F-D6FA25D6B26A};win-x64;.\Datadog.Profiler.Native.dll
      [...] PROFILER;{BD1A650D-AC5D-4896-B64F-D6FA25D6B26A};win-x86;.\Datadog.Profiler.Native.dll
      [...] DynamicDispatcherImpl::LoadConfiguration: [PROFILER] Loading: .\Datadog.Profiler.Native.dll [AbsolutePath=C:\Program Files\Datadog\.NET Tracer\win-x64\Datadog.Profiler.Native.dll]
      [...] [PROFILER] Creating a new DynamicInstance object
      [...] Load: C:\Program Files\Datadog\.NET Tracer\win-x64\Datadog.Profiler.Native.dll
      [...] GetFunction: DllGetClassObject
      [...] GetFunction: DllCanUnloadNow
      ```

3. Vérifiez le résultat de l'exportation de profils en procédant comme suit :

   1. Si vous n'avez pas activé les logs de debugging lors de l'étape 2.2, définissez la variable d'environnement `DD_TRACE_DEBUG` sur `true` pour l'application, puis redémarrez cette dernière.

   2. Ouvrez le log `DD-DotNet-Profiler-Native-<Nom_Application>-<pid>` depuis le dossier de logs de par défaut.

   3. Recherchez les entrées `libddprof error: Failed to send profile.` Ce message indique que le profileur ne parvient pas à communiquer avec l'Agent. Vérifiez que la valeur de `DD_TRACE_AGENT_URL` correspond à l'URL de l'Agent. Consultez la documentation relative à [l'activation et à la configuration du profileur .NET][1] pour en savoir plus.

   4. Si vous ne voyez pas de message `Failed to send profile`, recherchez à la place les entrées `The profile was sent. Success?`.

      Le message suivant s'affiche lorsque le profil a bien été envoyé :
      ```
      true, Http code: 200
      ```

   5. Si d'autres codes HTTP sont indiqués, vérifiez les erreurs correspondantes (par exemple, le code 403 signifie que la clé API n'est pas valide).

[1]: /fr/profiler/enabling/dotnet/?tab=linux#configuration

{{% /tab %}}

{{< /tabs >}}

Si ce n'est pas le cas, activez le [mode debugging][1] et [ouvrez un ticket d'assistance][2] en fournissant les fichiers de debugging et les informations suivantes :
- Type et version du système d'exploitation (par exemple, Windows Server 2019 ou Ubuntu 20.04)
- Type et version du runtime (par exemple, .NET Framework 4.8 ou .NET Core 6.0)
- Type d'application (par exemple, application Web exécutée dans IIS)


## Réduire la charge du profileur

Chaque [type de profil][3] est caractérisé par une utilisation fixe de la mémoire et du CPU. Pour cette raison, *plus vous cumulez les applications profilées, plus votre charge augmente*.

### Éviter d'activer le profileur sur l'intégralité d'une machine

Datadog vous déconseille d'activer le profileur sur l'ensemble d'une machine ou pour tous les pools d'application IIS. Procédez comme suit pour réduire la quantité de ressources utilisées par le profileur :
- Augmentez la quantité de ressources allouées, par exemple le nombre de cœurs CPU.
- Au lieu d'exécuter directement l'application, configurez le profiling sur des lots de fichiers, afin de limiter sa portée.
- Réduisez le nombre de pools IIS profilés (uniquement possible avec IIS 10+).
- Désactivez le profiling du wall time grâce au paramètre `DD_PROFILING_WALLTIME_ENABLED=0`.

### Conteneurs Linux

Bien qu'elle puisse varier, la charge est fixe : ainsi, cela peut donner lieu à une charge relative importante pour les conteneurs de très petite taille. Pour y remédier, le profileur est désactivé dans les conteneurs comportant moins d'un cœur. Si vous souhaitez contourner cette limite, définissez la variable d'environnement `DD_PROFILING_MIN_CORES_THRESHOLD` sur une valeur inférieure à 1. Par exemple, la valeur `0.5` permet au profileur de s'exécuter dans un conteneur comportant au minimum 0,5 cœur. Sachez que ce paramètre entraîne toutefois une augmentation de la charge CPU, même pour les services en attente, car les threads du profileur analyse en continu les threads de l'application. Plus vous réduisez cette limite, plus la charge CPU augmente.

Lorsque vous désactivez le profiling du wall time avec `DD_PROFILING_WALLTIME_ENABLED=0`, cela a pour incidence de réduire la charge CPU du profileur. Si cela ne suffit pas, augmentez le nombre de cœurs CPU alloués à vos conteneurs.

### Désactiver le profileur

Le tracing APM repose également sur l'API de profiling CLR. Ainsi, si vous ne voulez plus recueillir de profils .NET, mais souhaitez tout de même continuer à recevoir des traces .NET, vous devez définir les variables d'environnement suivantes afin de désactiver uniquement le profiling.

```
 DD_PROFILING_ENABLED=0 
 CORECLR_ENABLE_PROFILING=1
```

## Aucun profil sur le CPU ou le wall time en raison d'un blocage de l'application sous Linux

Si l'application est bloquée ou ne répond pas sous Linux, les échantillons relatifs au CPU et au wall time ne sont pas disponibles. Pour corriger ce problème, procédez comme suit :

1. Ouvrez le log `DD-DotNet-Profiler-Native-<Nom de l'application>-<pid>` dans le dossier `/var/log/datadog/dotnet`.

2. Recherchez le message `StackSamplerLoopManager::WatcherLoopIteration - Deadlock intervention still in progress for thread ...`. Si vous ne le trouvez pas, ignorez les étapes suivantes.

3. Si ce message figure dans votre log, cela signifie que le mécanisme de traitement des stack traces est potentiellement bloqué. Pour tenter de corriger ce problème, supprimez les call stacks de tous les threads dans l'application. Par exemple, avec l'outil de debugging gdb, procédez comme suit :

   1. Installez gdb.

   2. Exécutez la commande suivante :
      ```
      gdb -p <process id> -batch -ex "thread apply all bt full" -ex "detach" -ex "quit"
      ```

   3. Envoyez la sortie générée à l'[assistance Datadog][2].


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/tracing/troubleshooting/#tracer-debug-logs
[2]: /fr/help/
[3]: /fr/profiler/profile_types/?code-lang=dotnet