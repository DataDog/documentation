---
title: Utiliser l'outil de diagnostic .NET pour le dépannage
---

Si vous avez installé le traceur .NET mais que votre application ne génère pas les traces attendues, exécutez l'outil de diagnostic pour effectuer un premier dépannage. Vous pourrez ainsi identifier les problèmes de configuration tels qu'une variable d'environnement manquante, une installation incomplète ou une erreur de connexion à l'Agent.

Installez l'outil via l'une des méthodes suivantes :

- En utilisant le SDK .NET à l'aide de la commande :
   ```
   dotnet tool install -g dd-trace
   ```
- En téléchargeant la version appropriée :
    * Win-x64 : [https://dtdg.co/dd-trace-dotnet-win-x64][1]
    * Linux-x64 : [https://dtdg.co/dd-trace-dotnet-linux-x64][2]
    * Linux-musl-x64 (Alpine) : [https://dtdg.co/dd-trace-dotnet-linux-musl-x64][3]

- Ou en téléchargeant le fichier [depuis la page Releases Github][4].

## Diagnostics de processus

Les diagnostics de processus permettent d'identifier le problème pour la plupart des applications. 

1. Assurez-vous que l'application est en cours d'exécution, puis récupérez son identifiant de processus (pid). 

   Pour récupérer le pid d'un processus Windows, ouvrez le Gestionnaire des tâches, sélectionnez l'onglet **Détails** et repérez la colonne PID. Vous pouvez également exécuter la commande `tasklist /FI "IMAGENAME eq target.exe"`, où `target.exe` correspond au nom du processus.

   Pour récupérer le pid d'un processus Linux, exécutez la commande `ps aux | grep target` où `target` correspond au nom du processus (le pid est généralement `1` en cas d'exécution dans un conteneur Docker).

2. Entrez le pid dans l'outil dd-trace :
   ```
   dd-trace check process <pid>
   ```
   Cette commande exécute des vérifications basiques de la configuration et affiche des recommandations si un problème est détecté.

Exemple de résultat sans aucun problème détecté :
```bash
$ dd-trace check process 16436

Running checks on process 16436
Target process is running with .NET Framework
Detected agent url: http://127.0.0.1:8126/. Note: this url may be incorrect if you configured the application through a configuration file.
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.32.4
No issue found with the target process.
```

Exemple de résultat avec plusieurs problèmes de détectés :
```bash
$ dd-trace check process 35888

Running checks on process 35888
Target process is running with .NET Framework
Profiler is not loaded into the process
Tracer is not loaded into the process
The environment variable COR_ENABLE_PROFILING should be set to '1' (current value: '0')
```


## Diagnostics IIS

Pour une application IIS, vous pouvez effectuer des diagnostics plus avancés en exécutant la commande suivante, où `<NOM COMPLET SITE>` correspond au nom du site dans IIS suivi du nom de l'application :

```
dd-trace check iis "<NOM COMPLET SITE>"
```

Étant donné que les pools d'application ne sont lancés que lorsqu'ils sont utiles, assurez-vous que le site a reçu au moins une requête avant d'exécuter la commande.

**N'oubliez pas de placer des guillemets autour du nom s'il contient des espaces.**

Par exemple, le nom complet du site pour l'application visible ci-dessous est `Default Web Site/WebApplication1` :

{{< img src="tracing/troubleshooting/IISManager.png" alt="IIS manager">}}

La commande à utiliser pour exécuter les diagnostics IIS sur cette application est la suivante :
```
dd-trace check iis "Default Web Site/WebApplication1"
```

Pour instrumenter l'application racine du site, exécutez :
```
dd-trace check iis "Default Web Site"
```

La commande `check iis` effectue également un diagnostic des processus en exécutant des vérifications basiques de la configuration et en affichant des recommandations si un problème est détecté.

Exemple de résultat sans aucun problème détecté :
```bash
$ dd-trace check iis "Default Web Site/WebApplication1"

Fetching application /WebApplication1 from site Default Web Site
Inspecting worker process 47160
Target process is running with .NET Framework
Detected agent url: http://127.0.0.1:8126/. Note: this url may be incorrect if you configured the application through a configuration file.
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.32.4
Found Datadog.Trace version 2.4.0.0 in the GAC
No issue found with the IIS site.
```

Exemple de résultat avec plusieurs problèmes de détectés :
```bash
$ dd-trace check iis "Default Web Site/WebApplication1"

Fetching application /WebApplication1 from site Default Web Site
Inspecting worker process 47160
Target process is running with .NET Framework
Detected agent url: http://127.0.0.1:8126/. Note: this url may be incorrect if you configured the application through a configuration file.
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.32.4
The Datadog.Trace assembly could not be found in the GAC. Make sure the tracer has been properly installed with the MSI.
```

## Diagnostics de connexion avec l'Agent

Si au lieu d'exécuter des diagnostics sur une application vous souhaitez simplement tester la connexion avec l'Agent, utilisez la commande suivante :
```
dd-trace check agent <url>
```

Cette commande envoie une requête à l'Agent et vérifie l'absence d'erreurs. Si le paramètre facultatif `url` est omis, l'emplacement de l'Argent est déterminé à partir des variables d'environnement. Les protocoles pris en charge sont `http://` et `unix://` (pour les sockets de domaine).

Exemple de résultat sans aucun problème détecté :
```bash
$ dd-trace check agent

No Agent URL provided, using environment variables
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.32.4
Connected successfully to the Agent.
```

Exemple de résultat avec plusieurs problèmes de détectés :
```bash
$ dd-trace check agent

No Agent URL provided, using environment variables
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Error connecting to Agent at http://127.0.0.1:8126/: No connection could be made because the target machine actively refused it. (127.0.0.1:8126)
```

Lisez [Erreurs de connexion][5] pour en savoir plus sur les problèmes de connexion avec l'Agent.


[1]: https://dtdg.co/dd-trace-dotnet-win-x64
[2]: https://dtdg.co/dd-trace-dotnet-linux-x64
[3]: https://dtdg.co/dd-trace-dotnet-linux-musl-x64
[4]: https://github.com/DataDog/dd-trace-dotnet/releases
[5]: /fr/tracing/troubleshooting/connection_errors/?code-lang=dotnet#