---
code_lang: ruby
code_lang_weight: 30
title: Exigences de compatibilité Ruby
type: multi-code-lang
---
## Prise en charge des fonctionnalités Code Security {#code-security-capabilities-support}

Les fonctionnalités de sécurité du code suivantes sont prises en charge dans la bibliothèque Ruby, pour la version du traceur spécifiée :

| Fonctionnalité Code Security                    | Version minimale du traceur Ruby |
| ------------------------------------------- | ----------------------------|
| Runtime Software Composition Analysis (SCA) | 1.11.0                      |
| Runtime Code Analysis (IAST)                | non pris en charge               |

<div class="alert alert-info">Si vous souhaitez que la prise en charge soit ajoutée pour l'une des fonctionnalités non prises en charge, ou pour votre framework Ruby, faites-le nous savoir ! Remplissez <a href="https://forms.gle/gHrxGQMEnAobukfn7">ce court formulaire pour envoyer les détails</a>.</div>

### Types de déploiement pris en charge {#supported-deployment-types}
| Type              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST)        |
|------------------ | ------------------------------------------- | ----------------------------------- |
| Docker            | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Kubernetes        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Amazon ECS        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| AWS Fargate       | <i class="icon-check-bold"></i>             | Aperçu (1.15.0)                    |
| AWS Lambda        |                                             |                                     |

## Compatibilité avec les langages et frameworks {#language-and-framework-compatibility}

**Interpréteurs Ruby pris en charge**
La bibliothèque Ruby Datadog prend en charge le dernier gem des interpréteurs Ruby suivants :

- [MRI][2] versions 2.5 et ultérieures

Ces versions sont prises en charge sur les architectures suivantes :
- Linux (GNU) x86-64, aarch64
- Alpine Linux (musl) x86-64, aarch64
- macOS (Darwin) x86-64, arm64

### Serveurs web pris en charge {#supported-web-servers}
- Tags pour la requête HTTP (code d'état, méthode, etc.)
- Traçage distribué pour visualiser les flux d'attaque à travers vos applications

##### Notes sur les fonctionnalités Code Security {#code-security-capability-notes}
- **Runtime Software Composition Analysis (SCA)** est pris en charge sur tous les frameworks.
- **Runtime Code Analysis (IAST)** n'est pas pris en charge

### Compatibilité des frameworks réseau {#networking-framework-compatibility}

##### Notes sur les fonctionnalités Code Security {#code-security-capability-notes-1}
- **Runtime Software Composition Analysis (SCA)** est pris en charge sur tous les frameworks.
- **Runtime Code Analysis (IAST)** n'est pas pris en charge

### Compatibilité des magasins de données {#data-store-compatibility}

**Le traçage des datastores fournit :**

- des informations sur les requêtes (par exemple, une chaîne de requête nettoyée)
- la capture des erreurs et des traces de pile

##### Notes sur les fonctionnalités Code Security {#code-security-capability-notes-2}
- **Runtime Software Composition Analysis (SCA)** est pris en charge sur toutes les bases de données.
- **Runtime Code Analysis (IAST)** n'est pas pris en charge

[1]: /fr/tracing/trace_collection/compatibility/ruby/
[2]: https://www.ruby-lang.org/