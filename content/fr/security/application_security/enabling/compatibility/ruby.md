---
code_lang: ruby
code_lang_weight: 30
title: Exigences de compatibilité Ruby
type: multi-code-lang
---

## Compatibilité des frameworks et langages

### Versions de Ruby prises en charge

La bibliothèque Ruby Datadog prend en charge le dernier gem des interpréteurs Ruby suivants :

- [MRI][2], de la version 2.1 à la version 3.1

Ces versions sont prises en charge sur les architectures suivantes :
- Linux (GNU) x86-64, aarch64
- Alpine Linux (musl) x86-64, aarch64
- macOS (Darwin) x86-64, arm64

Vous pouvez surveiller la sécurité de vos applications Ruby exécutées dans Docker, Kubernetes, AWS ECS et AWS Fargate. 

### Frameworks pris en charge

| Serveur Web du framework    | Version minimale du framework   |
| ----------------------- | --------------------------- |
| Rack                    | 1.1                         |
| Rails                   | 3.2 (varie également en fonction de la version de Ruby) |
| Sinatra                 | 1.4                         |

## Prise en charge des fonctionnalités d'ASM

Les fonctionnalités ASM suivantes sont prises en charge dans la bibliothèque Ruby, pour la version du traceur spécifiée :

| Fonctionnalité ASM                   | Version minimale du traceur Ruby |
| -------------------------------- | ----------------------------|
| Détection des menaces <br/> --> API Business logic  | 1.9.0<br/>   |
| Protection contre les menaces <br/> --> Blocage d'IP <br/> --> Blocage des requêtes suspectes <br> --> Blocage d'utilisateurs   | 1.11.0<br/><br/><br/>     |
| Gestion des risques <br/> --> Détection des vulnérabilités tierces <br/> --> Détection des vulnérabilités dans le code personnalisé | non pris en charge<br/><br/> |

La version minimale du traceur pour profiter de toutes les fonctionnalités ASM avec Ruby est la 1.11.0.

<div class="alert alert-info">Si vous souhaitez demander la prise en charge d'une fonctionnalité ou d'un framework Ruby, contactez-nous ! Remplissez <a href="https://forms.gle/gHrxGQMEnAobukfn7">ce court formulaire pour nous communiquer les détails</a>.</div>

[1]: /fr/tracing/trace_collection/compatibility/ruby/
[2]: https://www.ruby-lang.org/