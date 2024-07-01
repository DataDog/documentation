---
code_lang: java
code_lang_weight: 0
title: Exigences de compatibilité Java
type: multi-code-lang
---

## Compatibilité des frameworks et langages

### Versions de Java prises en charge

La bibliothèque Datadog prend en charge l'environnement Java JRE 1.8 et versions ultérieures d'Oracle JDK et d'OpenJDK sur les architectures suivantes :
- Linux (GNU) x86, x86-64
- Alpine Linux (musl) x86, x86-64
- macOS (Darwin) x86, x86-64
- Windows (msvc) x86, x86-64

Datadog ne prend pas officiellement en charge les versions de Java en accès anticipé. 

Vous pouvez surveiller la sécurité de vos applications Java exécutées dans Docker, Kubernetes, AWS ECS et AWS Fargate. 

### Frameworks pris en charge

| Serveur Web du framework    | Version minimale du framework   |
| ----------------------- | --------------------------- |
| Serveur compatible avec les servlets      | 2.3+, 3.0+                  |
| Spring                  | 3.1                         |

**Remarque** : de nombreux serveurs d'applications sont compatibles avec les servlets et sont pris en charge par ASM. C'est notamment le cas de WebSphere, WebLogic et JBoss. En outre, certains frameworks comme Spring Boot sont pris en charge, car ils utilisent un serveur d'application intégré compatible (comme Tomcat, Jetty ou Netty).

<div class="alert alert-info">So votre framework préféré n'est pas dans la liste, dites-le nous ! Remplissez <a href="https://forms.gle/gHrxGQMEnAobukfn7">ce court formulaire pour nous communiquer les détails.</a>.</div>

## Prise en charge des fonctionnalités ASM

Les fonctionnalités ASM suivantes sont prises en charge dans la bibliothèque Java, pour la version du traceur spécifiée :

| Fonctionnalité ASM                   | Version minimale du traceur Java |
| -------------------------------- | ----------------------------|
| Détection des menaces <br/> --> API Business logic  | 1.8.0 <br/>   |
| Protection contre les menaces <br/> --> Blocage d'IP <br/> --> Blocage des requêtes suspectes <br> --> Blocage d'utilisateurs   | 1.9.0<br/><br/><br/>     |
| Gestion des risques <br/> --> Détection des vulnérabilités tierces <br/> --> Détection des vulnérabilités dans le code personnalisé | 1.1.4 <br/><br/> |

La version minimale du traceur pour profiter de toutes les fonctionnalités ASM avec Java est la 1.9.0.

**Remarque** : la protection contre les menaces nécessite d'activer la [Configuration à distance][2], qui est également concernée par la version minimale du traceur indiquée.

[1]: /fr/tracing/trace_collection/compatibility/java/
[2]: /fr/agent/guide/how_remote_config_works/#enabling-remote-configuration