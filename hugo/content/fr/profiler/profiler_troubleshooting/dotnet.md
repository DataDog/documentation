---
code_lang: dotnet
code_lang_weight: 60
further_reading:
- link: /tracing/troubleshooting
  tag: Documentation
  text: Dépannage d'APM
title: Dépannage du profileur .NET
type: multi-code-lang
---
## Profils manquants sur la page de recherche de profils {#missing-profiles-in-the-profile-search-page}

Si vous avez configuré le profileur et ne voyez aucun profil dans la page de recherche de profils, effectuez les vérifications suivantes (selon votre système d'exploitation).

{{< tabs >}}

{{% tab "Linux avec instrumentation APM Single Step" %}}

1. Vérifiez que l'Agent est installé et en cours d'exécution.

2. Vérifiez que le profileur a été chargé à partir du log du chargeur :

   1. Ouvrez le fichier log `dotnet-native-loader-dotnet-<pid>` dans le dossier `/var/log/datadog`.

   2. Recherchez `CorProfiler::Initialize: Continuous Profiler initialized successfully.` vers la fin. Si ce message n'est pas présent, activez les logs de débogage en définissant la variable d'environnement `DD_TRACE_DEBUG` pour l'application.

   3. Redémarrez l'application.

   4. Ouvrez le fichier log `dotnet-native-loader-dotnet-<pid>` dans le dossier `/var/log/datadog`.

   5. Recherchez l'entrée `#Profiler`.

   6. Vérifiez les lignes suivantes pour vous assurer que la bibliothèque du profileur a été chargée :
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

3. Vérifiez le résultat de l'exportation des profils :

   1. Si les logs de débogage n'ont pas été activés à l'étape 2.2, définissez la variable d'environnement `DD_TRACE_DEBUG` sur `true` pour l'application et redémarrez-la.

   2. Ouvrez le fichier log `DD-DotNet-Profiler-Native-<Application Name>-<pid>` dans le dossier `/var/log/datadog`.

   3. Recherchez les entrées `libddprof error: Failed to send profile.` : ce message signifie qu'il est impossible de contacter l'agent. Assurez-vous que `DD_TRACE_AGENT_URL` est défini sur l'URL d'Agent correcte. Consultez [Activation de la configuration du profileur .NET][4] pour plus d'informations.

   4. Si le message `Failed to send profile` n'est pas présent, recherchez les entrées `The profile was sent. Success?`.

      Le message suivant s'affiche lorsque le profil a bien été envoyé :
      ```
      true, Http code: 200
      ```

   5. Vérifiez les autres codes HTTP pour détecter d'éventuelles erreurs, telles que 403 pour une clé d'API non valide.

4. Pour les profils CPU ou Wall time manquants uniquement, vérifiez que le gestionnaire de signaux Datadog pour le parcours de pile n'a pas été remplacé :

   1. Ouvrez le fichier log `DD-DotNet-Profiler-Native-<Application Name>-<pid>` dans le dossier `/var/log/datadog`.

   2. Recherchez ces deux messages :
      - `Profiler signal handler was replaced again. It will not be restored: the profiler is disabled.`
      - `Fail to restore profiler signal handler.`

   3. Si l'un de ces messages est présent, cela signifie que le code de l'application ou un code tiers réinstalle de manière répétée son propre gestionnaire de signaux par-dessus le gestionnaire de signaux Datadog. Pour éviter tout conflit supplémentaire, les profileurs CPU et Wall time sont désactivés.

   Notez que le message suivant pourrait apparaître, mais il n'a aucun impact sur le profilage Datadog : `Profiler signal handler has been replaced. Restoring it.` Cela indique seulement que le gestionnaire de signaux Datadog est réinstallé lorsqu'il a été écrasé.

5. Confirmez que les variables d'environnement suivantes ne sont pas définies :
   - `CORECLR_ENABLE_PROFILING`
   - `CORECLR_PROFILER`
   - `CORECLR_PROFILER_PATH`
   - La valeur pointant vers `Datadog.Linux.ApiWrapper.x64.so` dans `LD_PRELOAD`
   
   Si ces variables ont été définies, supprimez-les de vos scripts ou de votre Dockerfile. Sinon, une version précédente du profileur installée manuellement est utilisée.

6. Vérifiez que la valeur de `DD_PROFILING_ENABLED` est définie sur `1` ou `Auto`. Si elle est définie sur `Auto`, le profileur génère des profils uniquement si les deux conditions suivantes sont remplies :
   - Une trace a été créée
   - L'application a été exécutée pendant plus de 30 secondes
Si elle est définie sur une autre valeur ou n'est pas définie du tout, le profileur est désactivé.

[4]: /fr/profiler/enabling/dotnet/?tab=linux#configuration

{{% /tab %}}
{{% tab "Linux" %}}

1. Vérifiez que l'Agent est installé et en cours d'exécution.

2. Vérifiez que le profileur a été chargé à partir du log du chargeur :

   1. Ouvrez le fichier log `dotnet-native-loader-dotnet-<PID>` dans le dossier `/var/log/datadog`.

   2. Recherchez `CorProfiler::Initialize: Continuous Profiler initialized successfully.` vers la fin. Si ce message n'est pas présent, activez les logs de débogage en définissant la variable d'environnement `DD_TRACE_DEBUG` pour l'application.

   3. Redémarrez l'application.

   4. Ouvrez le fichier log `dotnet-native-loader-dotnet-<pid>` dans le dossier `/var/log/datadog`.

   5. Recherchez l'entrée `#Profiler`.

   6. Vérifiez les lignes suivantes pour vous assurer que la bibliothèque du profileur a été chargée :
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

3. Vérifiez que la valeur de `DD_PROFILING_ENABLED` est définie sur `1` ; si elle n'est pas définie ou si elle a une autre valeur, le profileur est désactivé.

4. Vérifiez le résultat de l'exportation des profils :

   1. Si les logs de débogage n'étaient pas activés à l'étape 2.b, définissez la variable d'environnement `DD_TRACE_DEBUG` sur `true` pour l'application et redémarrez-la.

   2. Ouvrez le fichier log `DD-DotNet-Profiler-Native-<Application Name>-<pid>` dans le dossier `/var/log/datadog`.

   3. Recherchez les entrées `libddprof error: Failed to send profile.` : ce message signifie qu'il est impossible de contacter l'agent. Assurez-vous que `DD_TRACE_AGENT_URL` est défini sur l'URL d'Agent correcte. Consultez [Activation de la configuration du profileur .NET][4] pour plus d'informations.

   4. Si le message `Failed to send profile` n'est pas présent, recherchez les entrées `The profile was sent. Success?`.

      Le message suivant s'affiche lorsque le profil a bien été envoyé :
      ```
      true, Http code: 200
      ```

   5. Vérifiez les autres codes HTTP pour détecter d'éventuelles erreurs, telles que 403 pour une clé d'API non valide.

5. Pour les profils CPU ou Wall time manquants uniquement, vérifiez que le gestionnaire de signaux Datadog pour le parcours de pile n'a pas été remplacé :

   1. Ouvrez le fichier log `DD-DotNet-Profiler-Native-<Application Name>-<pid>` dans le dossier `/var/log/datadog`.

   2. Recherchez ces deux messages :
      - `Profiler signal handler was replaced again. It will not be restored: the profiler is disabled.`
      - `Fail to restore profiler signal handler.`

   3. Si l'un de ces messages est présent, cela signifie que le code de l'application ou un code tiers réinstalle de manière répétée son propre gestionnaire de signaux par-dessus le gestionnaire de signaux Datadog. Pour éviter tout conflit supplémentaire, les profileurs CPU et Wall time sont désactivés.

   Notez que le message suivant pourrait apparaître, mais il n'a aucun impact sur le profilage Datadog : `Profiler signal handler has been replaced. Restoring it.` Cela indique seulement que le gestionnaire de signaux Datadog est réinstallé lorsqu'il a été écrasé.

[4]: /fr/profiler/enabling/dotnet/?tab=linux#configuration

{{% /tab %}}

{{% tab "Windows" %}}

Le répertoire par défaut des logs du profileur est `%ProgramData%\Datadog .NET Tracer\logs\`. Avant la v2.24, le répertoire par défaut était `%ProgramData%\Datadog-APM\logs\DotNet`.

1. Vérifiez que l'Agent est installé, en cours d'exécution et visible dans le panneau Services Windows.

2. Vérifiez que le profileur a été chargé à partir du log du chargeur :

   1. Ouvrez le fichier log `dotnet-native-loader-<Application Name>-<pid>` depuis le dossier de logs par défaut.

   2. Recherchez `CorProfiler::Initialize: Continuous Profiler initialized successfully.` vers la fin. Si le message `initialized successfully` n'est pas présent, activez les logs de débogage en définissant la variable d'environnement `DD_TRACE_DEBUG` pour l'application.

   3. Redémarrez l'application.

   4. Ouvrez le fichier log `dotnet-native-loader-<Application Name>-<pid>` depuis le dossier de logs par défaut.

   5. Recherchez l'entrée `#Profiler`.

   6. Vérifiez les lignes suivantes pour vous assurer que la bibliothèque du profileur a été chargée :
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

3. Vérifiez que la valeur de `DD_PROFILING_ENABLED` est définie sur `1` ; si elle n'est pas définie, ou définie avec une autre valeur, le profileur est désactivé.

4. Vérifiez le résultat de l'exportation des profils :

   1. Si les logs de débogage n'étaient pas activés à l'étape 2.b, définissez la variable d'environnement `DD_TRACE_DEBUG` sur `true` pour l'application et redémarrez-la.

   2. Ouvrez le fichier log `DD-DotNet-Profiler-Native-<Application Name>-<pid>` depuis le dossier de logs par défaut.

   3. Recherchez les entrées `libddprof error: Failed to send profile.` : ce message signifie qu'il est impossible de contacter l'agent. Assurez-vous que `DD_TRACE_AGENT_URL` est défini sur l'URL d'Agent correcte. Consultez [Activation de la configuration du profileur .NET][5] pour plus d'informations.

   4. Si le message `Failed to send profile` n'est pas présent, recherchez les entrées `The profile was sent. Success?`.

      Le message suivant s'affiche lorsque le profil a bien été envoyé :
      ```
      true, Http code: 200
      ```

   5. Vérifiez les autres codes HTTP pour détecter d'éventuelles erreurs, telles que 403 pour une clé d'API non valide.

[5]: /fr/profiler/enabling/dotnet/#configuration

{{% /tab %}}

{{< /tabs >}}

Si ce n'est pas le cas, activez le [mode debug][1] et [ouvrez un ticket d'assistance][2] en fournissant les fichiers de débogage et les informations suivantes :
- Type et version du système d'exploitation (par exemple, Windows Server 2019 ou Ubuntu 20.04).
- Type et version du runtime (par exemple, .NET Framework 4.8 ou .NET Core 6.0).
- Type d'application (par exemple, application Web s'exécutant dans IIS).


## Réduisez la surcharge lors de l'utilisation du profileur {#reduce-overhead-when-using-the-profiler}

### Évitez d'activer le profileur à l'échelle de la machine {#avoid-enabling-the-profiler-machine-wide}

Les [différents types de profilage][3] ont une surcharge fixe en termes de CPU et de mémoire par application. Le profilage de chaque processus sur un host augmente l'utilisation totale des ressources. Pour réduire la surcharge sur toutes les plateformes, augmentez les ressources allouées (telles que les cœurs CPU) ou définissez `DD_PROFILING_WALLTIME_ENABLED=0`.

{{< tabs >}}

{{% tab "Linux avec instrumentation APM Single Step" %}}

Pour réduire la surcharge lors du profilage de plusieurs processus :

- Utilisez `DD_PROFILING_ENABLED=auto` au lieu de `true` lors de l'activation du profilage à l'échelle du host. Avec `auto`, le profilage ne démarre que lorsque l'application a fonctionné pendant plus de 30 secondes **et** qu'au moins une trace a été créée.
- Utilisez les [règles d'instrumentation][6] pour limiter les processus recevant SSI.
- Définissez `DD_PROFILING_ENABLED=false` dans un environnement de processus spécifique pour exclure ce processus du profilage. Le traçage n'est pas affecté.

[6]: /fr/tracing/trace_collection/single-step-apm/linux/#define-instrumentation-rules

{{% /tab %}}
{{% tab "Linux" %}}

Pour réduire la surcharge lors du profilage de plusieurs processus :

- Définissez les variables d'environnement du profileur uniquement dans le script de démarrage ou l'unité systemd de l'application que vous souhaitez profiler. Ne les définissez pas dans la configuration du host partagé telle que `/etc/environment` ou avec `systemctl set-environment`.
- Dans Docker, définissez les variables du profileur dans la définition du conteneur pour l'application spécifique (Dockerfile ou fichier compose). Évitez les images de base à l'échelle de l'entreprise ou les profils shell qui exportent des variables de profileur vers des services non liés.

{{% /tab %}}
{{% tab "Windows" %}}

Pour réduire la surcharge lors du profilage de plusieurs processus :

- Profilez uniquement des applications spécifiques en définissant des variables d'environnement dans des fichiers batch au lieu du niveau machine.
- Réduisez le nombre de pools IIS profilés (possible uniquement dans IIS 10 ou version ultérieure).

{{% /tab %}}

{{< /tabs >}}

### Conteneurs Linux {#linux-containers}

La valeur exacte peut varier, mais le coût fixe signifie que la surcharge relative du profileur peut être significative dans les petits conteneurs. Pour éviter cette situation, le profileur est désactivé dans les conteneurs avec moins d'un cœur. Vous pouvez remplacer le seuil d'un cœur en définissant la variable d'environnement `DD_PROFILING_MIN_CORES_THRESHOLD` sur une valeur inférieure à un. Par exemple, une valeur de `0.5` permet au profileur de s'exécuter dans un conteneur avec au moins 0,5 cœur. Cependant, dans ce cas, il y aura une augmentation de la consommation CPU, même pour les services inactifs, car les threads du profileur scannent toujours les threads de l'application. Moins il y a de cœurs disponibles, plus la consommation CPU augmente.

La désactivation du wall time profiler avec le paramètre `DD_PROFILING_WALLTIME_ENABLED=0` réduit la consommation CPU du profileur. Si cela ne suffit pas, augmentez le nombre de cœurs CPU disponibles pour vos conteneurs.

### Désactivation du profileur {#disabling-the-profiler}

Le tracing APM repose également sur l'API de profiling CLR. Ainsi, si vous ne voulez plus recueillir de profils .NET, mais souhaitez tout de même continuer à recevoir des traces .NET, vous devez définir les variables d'environnement suivantes afin de désactiver uniquement le profiling.

```
 DD_PROFILING_ENABLED=0 
 CORECLR_ENABLE_PROFILING=1
```

## Pas de CPU ni de wall time car l'application sous Linux est bloquée {#no-cpu-or-wall-time-because-the-application-on-linux-is-hung}

Si l'application est bloquée ou ne répond pas sous Linux, les échantillons relatifs au CPU et au wall time ne sont pas disponibles. Pour corriger ce problème, procédez comme suit :

1. Ouvrez le fichier log `DD-DotNet-Profiler-Native-<Application Name>-<pid>` dans le dossier `/var/log/datadog/dotnet`.

2. Recherchez `StackSamplerLoopManager::WatcherLoopIteration - Deadlock intervention still in progress for thread ...`. Si ce message n'est pas présent, le reste ne s'applique pas.

3. Si le message est trouvé, cela signifie que le mécanisme de parcours de pile pourrait être bloqué. Pour étudier le problème, videz les piles d'appels de tous les threads de l'application. Par exemple, pour effectuer cette opération avec le débogueur gdb :

   1. Installez gdb.

   2. Exécutez la commande suivante :
      ```
      gdb -p <process id> -batch -ex "thread apply all bt full" -ex "detach" -ex "quit"
      ```

   3. Envoyez le résultat obtenu au [Datadog Support][2].


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/tracing/troubleshooting/#debugging-and-logging
[2]: /fr/help/
[3]: /fr/profiler/profile_types/?code-lang=dotnet