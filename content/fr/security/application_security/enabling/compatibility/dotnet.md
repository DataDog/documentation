---
code_lang: dotnet
code_lang_weight: 10
title: Exigences de compatibilité .NET
type: multi-code-lang
---

## Compatibilité des frameworks et langages

### Versions de .NET prises en charge

Les versions de .NET suivantes sont prises en charge :
- .NET Core 6
- .NET Core 5
- .NET Framework 4.8
- .NET Framework 4.7.2
- .NET Framework 4.7
- .NET Framework 4.6.2
- .NET Framework 4.6.1

Ces versions sont prises en charge sur les architectures suivantes :
- Linux (GNU) x86, x86-64
- Alpine Linux (musl) x86, x86-64
- macOS (Darwin) x86, x86-64
- Windows (msvc) x86, x86-64

Vous pouvez surveiller la sécurité de vos applications .NET exécutées dans Docker, Kubernetes, AWS ECS et AWS Fargate.

### Frameworks pris en charge

Le traceur .NET prend en charge tous les langages basés sur .NET (par exemple, C#, F# et Visual Basic).

| Serveur Web du framework    | Version minimale du framework   |
| ----------------------- | --------------------------- |
| ASP.NET                 | 4.6                         |
| ASP.NET Core            | 2.1                         |

<div class="alert alert-info">Si votre framework préféré n'est pas dans la liste, dites-le nous ! Remplissez <a href="https://forms.gle/gHrxGQMEnAobukfn7">ce court formulaire pour nous communiquer les détails.</a>.</div>

## Prise en charge des fonctionnalités ASM

Les fonctionnalités ASM suivantes sont prises en charge dans la bibliothèque .NET, pour la version du traceur spécifiée :

| Fonctionnalité ASM                   | Version minimale du traceur .NET |
| -------------------------------- | ----------------------------|
| Détection des menaces <br/> --> API Business logic  | 2.23.0 <br/>   |
| Protection contre les menaces <br/> --> Blocage d'IP <br/> --> Blocage des requêtes suspectes <br> --> Blocage d'utilisateurs   | 2.26.0<br/><br/><br/>     |
| Gestion des risques <br/> --> Détection des vulnérabilités tierces <br/> --> Détection des vulnérabilités dans le code personnalisé | 2.16.0 <br/><br/> |

La version minimale du traceur pour profiter de toutes les fonctionnalités ASM avec .NET est la 2.26.0.

**Remarque** : la protection contre les menaces nécessite d'activer la [Configuration à distance][3], qui est incluse dans la version minimale du traceur indiquée.  

[1]: /fr/tracing/trace_collection/compatibility/dotnet-core/
[2]: /fr/tracing/trace_collection/compatibility/dotnet-framework/
[3]: /fr/agent/guide/how_remote_config_works/#enabling-remote-configuration