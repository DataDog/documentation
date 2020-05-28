---
title: Tracer des applications Go
kind: documentation
aliases:
  - /fr/tracing/go/
  - /fr/tracing/languages/go
  - /fr/agent/apm/go/
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-go/tree/v1'
    tag: GitHub
    text: Code source
  - link: 'https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace'
    tag: GoDoc
    text: Page sur les packages
  - link: /tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
  - link: /tracing/
    tag: Utilisation avancée
    text: Utilisation avancée
---
## Installation et démarrage

Pour obtenir des instructions de configuration et des détails sur l'utilisation de l'API, consultez la [documentation sur l'API][1] de Datadog. Pour l'instrumentation manuelle, utilisez la [section Intégrations](#integrations) ci-dessous pour en savoir plus sur les bibliothèques Go et les frameworks qui prennent en charge l'instrumentation automatique.

Pour connaître la définition des termes utilisés dans l'APM, consultez la [section Débuter avec l'APM][2]. Pour en savoir plus sur les contributions, consultez le référentiel officiel [README.md][3].

Consultez le [document sur la migration][4] si vous devez migrer d'une ancienne version du traceur (p. ex. v<0.6.x) vers la dernière version.

### Installation

Si vous avez déjà un compte Datadog, vous trouverez des [instructions détaillées][5] dans nos guides intégrés à l'application pour les configurations basées sur un host et les configurations basées sur un conteneur.

Commencez par [installer et configurer l'Agent Datadog][6]. Consultez la documentation supplémentaire relative au [tracing d'applications Docker][7] ou au [tracing d'applications Kubernetes][8].

Installez ensuite le traceur Go depuis son chemin d'importation canonique :

```go
go get gopkg.in/DataDog/dd-trace-go.v1/ddtrace
```

Vous êtes alors prêt à importer le traceur et à commencer l'instrumentation de votre code.

## Instrumentation automatique

Datadog propose un ensemble de paquets prêts à l'emploi qui prennent en charge l'instrumentation d'un certain nombre de bibliothèques et de frameworks. Vous trouverez la liste des [intégrations](#integrations) ci-dessous.

## Compatibilité

Pour commencer à tracer vos applications Go, votre environnement doit :

* Exécuter l'Agent Datadog `>= 5.21.1`.
* Utiliser Go `1.12+`

### Intégrations

#### Compatibilité des frameworks

Intégrez le traceur go avec la liste de frameworks Web ci-dessous via l'un des paquets d'assistance suivants :

| Framework         | Type de prise en charge    | Documentation GoDoc de Datadog                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [Gin][9]          | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin][10]               |
| [Gorilla Mux][11] | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux][12]                |
| [gRPC][13]        | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc][14]     |
| [gRPC v1.2][13]   | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12][15] |
| [chi][16]         | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12][17] |
| [echo][18]        | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo][19]              |

#### Compatibilité des bibliothèques

Le traceur Go prend en charge les datastores et les bibliothèques suivants.

| Bibliothèque                 | Type de prise en charge    | Exemples et documentation                                                      |
|-------------------------|-----------------|---------------------------------------------------------------------------------|
| [AWS SDK][20]           | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws][21]                |
| [Elasticsearch][22]     | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic][23]                   |
| [Cassandra][24]         | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql][25]                       |
| [GraphQL][26]           | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go][27]          |
| [HTTP][28]              | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http][29]                          |
| [HTTP router][30]       | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter][31]          |
| [Redis (go-redis)][32]  | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis][33]                    |
| [Redis (redigo)][34]    | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo][35]                   |
| [Redis (new redigo)][36]| Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gomodule/redigo][37]                   |
| [SQL][38]               | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql][39]                      |
| [SQLx][40]              | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx][41]                      |
| [MongoDB][42]           | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go.mongodb.org/mongo-driver/mongo][43] |
| [MongoDB (mgo)][73]      | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/globalsign/mgo][44]                    |
| [BuntDB][45]            | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/tidwall/buntdb][46]                    |
| [LevelDB][47]           | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/syndtr/goleveldb/leveldb][48]          |
| [miekg/dns][49]         | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/miekg/dns][50]                         |
| [Kafka (confluent)][51] | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go][52]   |
| [Kafka (sarama)][53]    | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama][54]                    |
| [Google API][55]        | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/api][56]             |
| [go-restful][57]        | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful][58]               |
| [Twirp][59]             | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/twitchtv/twirp][60]                    |
| [Vault][61]             | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/vault][62]                   |
| [Consul][63]            | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/consul][64]                  |
| [Gorm][65]              | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jinzhu/gorm][66]                       |
| [Kubernetes][67]        | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/k8s.io/client-go/kubernetes][68]       |
| [Memcache][69]          | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/bradfitz/gomemcache/memcache][70]      |

**Remarque** : la [documentation sur les intégrations][71] contient une description détaillée des paquets pris en charge et de leurs API, ainsi que des exemples d'utilisation.

Les paquets doivent être importés de la façon suivante :

```go
import "gopkg.in/DataDog/dd-trace-go.v1/contrib/<RÉPERTOIRE_PAQUET>/<NOM_PAQUET>"
```

## Configuration

Le traceur est configuré avec des paramètres d'option lorsque la fonction `Start` est appelée. Voici un exemple de configuration permettant de générer une trace via la bibliothèque HTTP :

```go
package main

import (
    "log"
    "net/http"
    "strings"

    httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func sayHello(w http.ResponseWriter, r * http.Request) {
    msg := "Hello " + strings.TrimPrefix(r.URL.Path, "/")
    w.Write([] byte(msg))
}

func main() {
    // démarrer le traceur avec 0 option ou plus
    tracer.Start(tracer.WithServiceName("test-go"))
    defer tracer.Stop()

    mux := httptrace.NewServeMux() // initialiser le traceur http
    mux.HandleFunc("/", sayHello) // utiliser le traceur pour gérer les URL

    err := http.ListenAndServe(":9090", mux) // définir le port d'écoute
    if err != nil {
        log.Fatal("ListenAndServe: ", err)
    }
}
```

Pour découvrir toutes les options disponibles pour le traceur, consultez la [documentation de configuration][72].

### Extraction et injection d'en-têtes B3

Le traceur de l'APM Datadog prend en charge [l'extraction et l'injection d'en-têtes B3][73] pour le tracing distribué.

L'injection et l'extraction distribuées d'en-têtes sont contrôlées en configurant des styles d'injection/extraction. Deux styles sont actuellement pris en charge : `Datadog` et `B3`.

Configurez les styles d'injection via la variable d'environnement `DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

Configurez les styles d'extraction via la variable d'environnement `DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

Ces variables d'environnement prennent comme valeur une liste des styles d'en-tête autorisés pour l'injection ou l'extraction, séparés par des virgules. Par défaut, seul le style d'extraction `Datadog` est activé.

Si plusieurs styles d'extraction sont activés, les tentative d'extraction sont effectuées dans l'ordre selon lequel ces styles ont été configurés, et la première valeur extraite avec succès est utilisée.

## Modifier le hostname de l'Agent

Configurez vos traceurs d'applications de façon à envoyer des traces à un hostname d'Agent personnalisé :

Le module de tracing Go recherche automatiquement les variables d'environnement `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` puis s'initialise avec celles-ci.

```go
package main

import (
    "net"
    "os"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    addr := net.JoinHostPort(
        os.Getenv("DD_AGENT_HOST"),
        os.Getenv("DD_TRACE_AGENT_PORT"),
    )
    tracer.Start(tracer.WithAgentAddr(addr))
    defer tracer.Stop()
}

```

## Configurer le nom de l'environnement APM

Le [nom de l'environnement APM][74] peut être configuré [dans l'Agent][75] ou en utilisant l'option de démarrage [WithEnv][76] du traceur.

```go
package main

import (
    "os"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    tracer.Start(tracer.WithEnv("<ENVIRONNEMENT>"))
    defer tracer.Stop()

    // ...
}
```


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[2]: /fr/tracing/visualization/
[3]: https://github.com/DataDog/dd-trace-go/tree/v1#contributing
[4]: https://github.com/DataDog/dd-trace-go/tree/v1/MIGRATING.md
[5]: https://app.datadoghq.com/apm/install
[6]: /fr/tracing/send_traces/
[7]: /fr/tracing/setup/docker/
[8]: /fr/agent/kubernetes/apm/
[9]: https://gin-gonic.com
[10]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin
[11]: http://www.gorillatoolkit.org/pkg/mux
[12]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux
[13]: https://github.com/grpc/grpc-go
[14]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc
[15]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12
[16]: https://github.com/go-chi/chi
[17]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi
[18]: https://github.com/labstack/echo
[19]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo
[20]: https://aws.amazon.com/sdk-for-go
[21]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws
[22]: https://github.com/olivere/elastic
[23]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic
[24]: https://github.com/gocql/gocql
[25]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql
[26]: https://github.com/graph-gophers/graphql-go
[27]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go
[28]: https://golang.org/pkg/net/http
[29]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http
[30]: https://github.com/julienschmidt/httprouter
[31]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter
[32]: https://github.com/go-redis/redis
[33]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis
[34]: https://github.com/garyburd/redigo
[35]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo
[36]: https://github.com/gomodule/redigo
[37]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gomodule/redigo
[38]: https://golang.org/pkg/database/sql
[39]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql
[40]: https://github.com/jmoiron/sqlx
[41]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx
[42]: https://github.com/mongodb/mongo-go-driver
[43]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/go.mongodb.org/mongo-driver/mongo
[44]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/globalsign/mgo
[45]: https://github.com/tidwall/buntdb
[46]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/tidwall/buntdb
[47]: https://github.com/syndtr/goleveldb
[48]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/syndtr/goleveldb/leveldb
[49]: https://github.com/miekg/dns
[50]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/miekg/dns
[51]: https://github.com/confluentinc/confluent-kafka-go
[52]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go
[53]: https://github.com/Shopify/sarama
[54]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama
[55]: https://github.com/googleapis/google-api-go-client
[56]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/api
[57]: https://github.com/emicklei/go-restful
[58]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful
[59]: https://github.com/twitchtv/twirp
[60]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/twitchtv/twirp
[61]: https://github.com/hashicorp/vault
[62]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/vault
[63]: https://github.com/hashicorp/consul
[64]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/consul
[65]: https://github.com/jinzhu/gorm
[66]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/jinzhu/gorm
[67]: https://github.com/kubernetes/client-go
[68]: https://godoc.org/k8s.io/client-go/kubernetes
[69]: https://github.com/bradfitz/gomemcache/memcache
[70]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/bradfitz/gomemcache/memcache
[71]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib
[72]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartOption
[73]: https://github.com/openzipkin/b3-propagation
[74]: /fr/tracing/advanced/setting_primary_tags_to_scope/#environment
[75]: /fr/getting_started/tracing/#environment-name
[76]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithEnv