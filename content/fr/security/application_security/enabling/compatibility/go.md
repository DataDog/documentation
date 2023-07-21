---
code_lang: go
code_lang_weight: 20
kind: documentation
title: Exigences de compatibilité Go
type: multi-code-lang
---

## Compatibilité des frameworks et langages

### Versions de Go prises en charge

La bibliothèque de tracing Go Datadog prend en charge la version 1.14 et les versions ultérieures de Go sur les architectures suivantes :
- Linux (GNU) x86-64
- Alpine Linux (musl) x86-64
- macOS (Darwin) x86-64

Vous pouvez surveiller la sécurité de vos applications Go exécutées dans Docker, Kubernetes et AWS ECS.

### Frameworks pris en charge

Intégrez le traceur aux frameworks Web répertoriés ci-dessous à l'aide de l'une des intégrations de traceur APM correspondantes. Référez-vous à la [documentation de l'intégration][1] pour obtenir une présentation détaillée des packages pris en charge et des API associées, ainsi que des exemples d'utilisation.

- [gRPC][2]
- [net/http][3]
- [Gorilla Mux][4]
- [Echo][5]
- [Chi][6]
- [HttpRouter][7]

### Activer CGO

Pour compiler votre code avec ASM, il est nécessaire d'utiliser [CGO][8]. Pour cette raison, vous devez :

- utiliser le compilateur `gcc` pour les cibles `GOOS` et `GOARCH` ;
- utiliser les en-têtes de la bibliothèque C ;
- activer les liaisons CGO, avec la variable d'environnement `CGO_ENABLED` (activée par défaut lors de la compilation en natif).

Pour respecter ces conditions, utilisez les commandes suivantes :

| Système d'exploitation     | Commande dans la console |
|----------------------|-----------------|
| Debian, Ubuntu       | `$ apt install gcc libc6-dev`   |
| Alpine               | `$ apk add gcc musl-dev`        |
| RHEL, CentOS, Fedora | `$ yum install gcc glibc-devel` |
| macOS                | `$ xcode-select --install`      |

**Remarque** : la chaîne d'outils GO désactive CGO lors de la compilation croisée. CGO doit donc être explicitement activé.


## Prise en charge des fonctionnalités d'ASM

Les fonctionnalités ASM suivantes sont prises en charge dans la bibliothèque Go, pour la version du traceur spécifiée :

| Fonctionnalité ASM                   | Version minimale du traceur Go |
| -------------------------------- | ----------------------------|
| Détection des menaces <br/> --> API Business logic  | 1.47.0 <br/>  |
| Protection contre les menaces <br/> --> Blocage d'IP <br/> --> Blocage des requêtes suspectes <br> --> Blocage d'utilisateurs   |  <br/> --> 1.48.0<br/> --> v1.50.0<br/> --> 1.48.0     |
| Gestion des risques <br/> --> Détection des vulnérabilités tierces <br/> --> Détection des vulnérabilités dans le code personnalisé | non pris en charge<br/><br/> |

La version minimale du traceur pour profiter de toutes les fonctionnalités ASM avec Go est la 1.48.0.

**Remarque** : la protection contre les menaces nécessite d'activer la fonctionnalité [Remote Configuration][10], qui est incluse dans la version minimale du traceur indiquée.  

<div class="alert alert-info">Si vous souhaitez demander la prise en charge d'une fonctionnalité ou d'un framework Go, contactez-nous ! Remplissez <a href="https://forms.gle/gHrxGQMEnAobukfn7">ce court formulaire pour nous communiquer les détails</a>.</div>


[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib
[2]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc#example-package-Server
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http#example-package
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux#example-package
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4#example-package
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi.v5#example-package
[7]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter#example-package
[8]: https://github.com/golang/go/wiki/cgo
[9]: /fr/tracing/trace_collection/compatibility/go/
[10]: /fr/agent/guide/how_remote_config_works/#enabling-remote-configuration