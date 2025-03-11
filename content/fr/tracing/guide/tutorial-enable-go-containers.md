---
further_reading:
- link: /tracing/trace_collection/library_config/go/
  tags: Documentation
  text: Autres options de configuration de la bibliothèque de tracing
- link: /tracing/trace_collection/dd_libraries/go/
  tags: Documentation
  text: Instructions détaillées de configuration de la bibliothèque de tracing
- link: /tracing/trace_collection/compatibility/go/
  tags: Documentation
  text: Frameworks Go pris en charge pour l'instrumentation automatique
- link: /tracing/trace_collection/custom_instrumentation/go/
  tags: Documentation
  text: Configurer manuellement les traces et spans
- link: /tracing/trace_pipeline/ingestion_mechanisms/
  tags: Documentation
  text: Mécanismes d'ingestion
- link: https://github.com/DataDog/dd-trace-Go
  tags: GitHub
  text: Référentiel du code open source de la bibliothèque de tracing

title: 'Tutoriel : Activer le tracing pour une application Go et lʼAgent Datadog dans
  des conteneurs'
---

## Présentation

Ce tutoriel détaille les étapes permettant l'activation du tracing sur un exemple d'application Go installée dans un conteneur. Pour cet exemple, l'Agent Datadog est également installé dans le conteneur.

Pour les autres scénarios, y compris lʼapplication et lʼAgent sur un host, lʼapplication et lʼAgent sur une infrastructure dans le cloud, et sur les applications écrites dans dʼautres langages, consultez les autres [tutoriels relatifs à lʼactivation du tracing][1].

Référez-vous à la section [Tracer des applications Go][2] pour consulter la documentation complète relative à la configuration du tracing pour Go.

### Prérequis

- Un compte Datadog et une [clé d'API de l'organisation][3]
- Git
- Docker
- Curl
- Go version 1.18 et ultérieures
- Make et GCC

## Installer lʼexemple dʼapplication Go conteneurisée

L'exemple de code pour ce tutoriel se trouve sur GitHub, à l'adresse suivante : [github.com/DataDog/apm-tutorial-golang.git][9]. Pour commencer, dupliquez le référentiel git :

{{< code-block lang="shell" >}}
git clone https://github.com/DataDog/apm-tutorial-golang.git
{{< /code-block >}}

Ce référentiel contient une application Go dotée de plusieurs services, préconfigurée pour être exécutée au sein des conteneurs de Docker. Dans cet exemple, lʼapp est une app de note basique et une app de calendrier, chacune dotée dʼune API REST pour ajouter et modifier des données. Les fichiers YAML `docker-compose` sont situés dans le répertoire `docker`.

Ce tutoriel utilise le fichier `all-docker-compose.yaml`, qui crée des conteneurs pour les applications de notes et de calendrier, ainsi que pour lʼAgent Datadog.

### Débuter et sʼentraîner avec lʼexemple dʼapplication

1. Créez les conteneurs de lʼapplication en exécutant :
   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml build{{< /code-block >}}

1. Démarrez les conteneurs :

   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml up -d{{< /code-block >}}

1. Vérifiez que les conteneurs s'exécutent correctement avec la commande `docker ps`. La sortie devrait ressembler à ceci :
   {{< code-block lang="shell" disable_copy="true" >}}
   CONTAINER ID   IMAGE                           COMMAND                  CREATED              STATUS                          PORTS                    NAMES
   0a4704ebed09   docker-notes                    "./cmd/notes/notes"      About a minute ago   Up About a minute               0.0.0.0:8080->8080/tcp   notes
   9c428d7f7ad1   docker-calendar                 "./cmd/calendar/cale..."   About a minute ago   Up About a minute               0.0.0.0:9090->9090/tcp   calendar
   b2c2bafa6b36   gcr.io/datadoghq/agent:latest   "/bin/entrypoint.sh"     About a minute ago   Up About a minute (unhealthy)   8125/udp, 8126/tcp       datadog-ag
   {{< /code-block >}}

1. L'exemple d'application `notes` est une API REST standard qui stocke des données dans une base de données en mémoire. Utilisez `curl` pour envoyer quelques requêtes d'API :

   `curl localhost:8080/notes`
   : Renvoie `[]` car il n'y a encore rien dans la base de données.

   `curl -X POST 'localhost:8080/notes?desc=hello'`
   : Ajoute une note avec la description `hello` et une valeur dʼID de `1`. Renvoie `{"id":1,"description":"hello"}`.

   `curl localhost:8080/notes/1`
   : Renvoie la note dont la valeur `id` est `1` : `{"id":1,"description":"hello"}`

   `curl -X POST 'localhost:8080/notes?desc=otherNote'`
   : Ajoute une note avec la description `otherNote` et une valeur dʼID de `2`. Renvoie `{"id":2,"description":"otherNote"}`.

   `curl localhost:8080/notes`
   : Renvoie le contenu de la base de données : `[{"id":1,"description":"hello"},{"id";2,"description":"otherNote"}]`

1. Exécutez d'autres appels API pour voir l'application en action. Lorsque vous avez terminé, arrêtez et retirez les conteneurs et assurez-vous qu'ils ont été retirés :
   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml down
   docker-compose -f all-docker-compose.yaml rm{{< /code-block >}}

## Activer le tracing

Configurez ensuite l'application Go pour activer le traçage. Comme l'Agent s'exécute sur un conteneur, il n'est pas nécessaire d'installer quoi que ce soit.

Pour activer la prise en charge du traçage, supprimez la mise en commentaire l-des importations suivantes dans `apm-tutorial-golang/cmd/notes/main.go`  :

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
chitrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi"
httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
{{< /code-block >}}

Dans la fonction `main()`, supprimez la mise en commentaire des lignes suivantes :

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
tracer.Start()
defer tracer.Stop()
{{< /code-block >}}

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
client = httptrace.WrapClient(client, httptrace.RTWithResourceNamer(func(req *http.Request) string {
   return fmt.Sprintf("%s %s", req.Method, req.URL.Path)
}))
{{< /code-block >}}

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
r.Use(chitrace.Middleware(chitrace.WithServiceName("notes")))
{{< /code-block >}}

Dans `setupDB()`, supprimez la mise en commentaire des lignes suivantes :

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
sqltrace.Register("sqlite3", &sqlite3.SQLiteDriver{}, sqltrace.WithServiceName("db"))
db, err := sqltrace.Open("sqlite3", "file::memory:?cache=shared")
{{< /code-block >}}

Supprimez la mise en commentaire de la ligne suivante :
{{< code-block lang="go" filename="cmd/notes/main.go" >}}
db, err := sql.Open("sqlite3", "file::memory:?cache=shared")
{{< /code-block >}}

## Ajouter le conteneur de l'Agent

Ajoutez lʼAgent Datadog à la section services de votre fichier `all-docker-compose.yaml` pour ajouter lʼAgent à votre build :

1. Supprimez la mise en commentaire de la configuration de l'Agent et indiquez votre propre [clé d'API Datadog][3] :
   {{< code-block lang="yaml" filename="docker/all-docker-compose.yaml">}}
     datadog-agent:
     container_name: datadog-agent
     image: "gcr.io/datadoghq/agent:latest"
     pid: host
     environment:
       - DD_API_KEY=<DD_API_KEY_HERE>
       - DD_APM_ENABLED=true
       - DD_APM_NON_LOCAL_TRAFFIC=true
     volumes:
       - /var/run/docker.sock:/var/run/docker.sock
       - /proc/:/host/proc/:ro
       - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
   {{< /code-block >}}

1. Supprimez la mise en commentaire des champs `depends_on` pour `datadog-agent` dans le conteneur `notes`.

1. Vous noterez que dans la section du service `notes`, la variable dʼenvironnement `DD_AGENT_HOST` est définie sur le hostname du conteneur de lʼAgent. Votre section du conteneur `notes` devrait ressembler à ceci :
   {{< code-block lang="yaml" filename="docker/all-docker-compose.yaml">}}
   notes:
    container_name: notes
    restart: always
    build:
      context: ../
      dockerfile: ../dockerfile.notes
    ports:
      - 8080:8080
    labels:
      - com.datadoghq.tags.service="notes"
      - com.datadoghq.tags.env="dev"
      - com.datadoghq.tags.version="0.0.1"
    environment:
      - DD_SERVICE=notes
      - DD_ENV=dev
      - DD_VERSION=0.0.1
      - DD_AGENT_HOST=datadog-agent
#     - CALENDAR_HOST=calendar
    depends_on:
#     - calendar
      - datadog-agent
   {{< /code-block >}}
   Vous configurerez les sections et les variables de `calendar` plus loin dans ce tutoriel.

## Démarrer les conteneurs pour explorer lʼinstrumentation automatique

Maintenant que la bibliothèque de tracing est installée, lancez les conteneurs de votre application et commencez à recevoir des traces. Exécutez les commandes suivantes :

{{< code-block lang="shell" >}}
docker-compose -f all-docker-compose.yaml build
docker-compose -f all-docker-compose.yaml up -d{{< /code-block >}}

Pour commencer à générer et à collecter des traces, lancez à nouveau l'application avec `make run`.

Vous pouvez savoir si l'Agent fonctionne en observant les sorties en continu du terminal, ou en ouvrant [l'explorateur d'événements][8] dans Datadog et en affichant l'événement de départ de l'Agent :

{{< img src="tracing/guide/tutorials/tutorial-python-container-agent-start-event.png" alt="Événement de départ de l'Agent affiché dans l'Events Explorer" style="width:100%;" >}}

Utilisez `curl` pour envoyer à nouveau des demandes à l'application :

`curl localhost:8080/notes`
: `[]`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes/1`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes`
: `[{"id":1,"description":"hello"}]`

Attendez quelques instants et jetez un coup d'œil à votre IU Datadog. Accédez à [**APM > Traces**][11]. La liste des traces ressemble à ceci :

{{< img src="tracing/guide/tutorials/tutorial-go-host-traces2.png" alt="Traces view shows trace data coming in from host." style="width:100%;" >}}

Il y a des entrées pour la base de données (`db`) et l'application `notes`. La liste des traces montre tous les spans, leur date de début, la ressource suivie avec le span et la durée.

Si aucune trace ne s'affiche, effacez les filtres actifs dans le champ **Traces** Search (il peut arriver qu'une variable d'environnement telle que `ENV` soit filtrée alors que vous ne l'utilisez pas).

### Examiner une trace

Sur la page Traces, cliquez sur une trace `POST /notes`. Cela affiche un flamegraph décrivant la durée de chaque span ainsi que les autres spans présentes avant la finalisation d'une span. La barre située en haut du graphique représente la span que vous avez sélectionnée sur l'écran précédent (dans le cas présent, le point d'entrée initial dans l'application notes).

La largeur d'une barre indique la durée totale de la span. Une barre moins large représente une span finalisée pendant le cycle de vie d'une barre plus large. 

Le flamegraph d'une trace `POST` ressemble à ceci :

{{< img src="tracing/guide/tutorials/tutorial-go-host-post-flame.png" alt="Un flamegraph pour une trace POST." style="width:100%;" >}}

Une trace `GET /notes` ressemble à ceci :

{{< img src="tracing/guide/tutorials/tutorial-go-host-get-flame.png" alt="Un flamegraph pour une trace GET." style="width:100%;" >}}

## Configuration de tracing

Vous pouvez configurer la bibliothèque de traces de façon à ce quʼelle ajoute des tags à la télémétrie qu'elle envoie à Datadog. Les tags permettent de regrouper, filtrer et afficher les données de manière significative dans des dashboards et des graphiques. Pour ajouter des tags, spécifiez les variables dʼenvironnement lors de l'exécution de l'application. Le projet `Makefile` comprend les variables dʼenvironnement `DD_ENV`, `DD_SERVICE` et `DD_VERSION`, qui sont configurées de façon à activer le [tagging de service unifié][17] :

{{< code-block lang="go" filename="docker/all-docker-compose.yaml" disable_copy="true" >}}
environment:
  - DD_API_KEY=<DD_API_KEY_HERE>
  - DD_APM_ENABLED=true
  - DD_APM_NON_LOCAL_TRAFFIC=true
{{< /code-block >}}

Pour en savoir plus sur les options de configuration disponibles, référez-vous à la section [Configuring the Go Tracing Library][14] (en anglais).

### Utiliser les bibliothèques de tracing automatiques

Datadog propose plusieurs bibliothèques entièrement compatibles pour Go qui permettent un traçage automatique lorsqu'elles sont implémentées dans le code. Dans le fichier `cmd/notes/main.go`, vous pouvez voir les bibliothèques `go-chi`, `sql`, et `http` être aliasés vers les bibliothèques Datadog correspondantes : `chitrace`, `sqltrace` et `httptrace` respectivement :

{{< code-block lang="go" filename="cmd/notes/main.go" disable_copy="true" collapsible="true" >}}
import (
  ...

  sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
  chitrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi"
  httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
  ...
)
{{< /code-block >}}

Dans `cmd/notes/main.go`, les bibliothèques Datadog sont initialisées avec l'option `WithServiceName`. Par exemple, la bibliothèque `chitrace` est initialisée comme suit :

{{< code-block lang="go" filename="cmd/notes/main.go" disable_copy="true" collapsible="true" >}}
r := chi.NewRouter()
r.Use(middleware.Logger)
r.Use(chitrace.Middleware(chitrace.WithServiceName("notes")))
r.Mount("/", nr.Register())
{{< /code-block >}}

L'utilisation de `chitrace.WithServiceName("notes")` garantit que tous les éléments tracés par la bibliothèque relèvent du nom de service `notes`.

Le fichier `main.go` contient d'autres exemples d'implémentation pour chacune de ces bibliothèques. Pour obtenir la liste complète des bibliothèques, référez-vous à la section [Exigences de compatibilité Go][16].

### Utiliser le traçage personnalisé avec du contexte

Lorsque le code ne relève pas d'une bibliothèque prise en charge, vous pouvez créer des spans manuellement.

Supprimez les commentaires autour de la fonction `makeSpanMiddleware` dans `notes/notesController.go`. Il génère un intergiciel qui enveloppe une requête dans un span avec le nom fourni. Pour utiliser cette fonction, commentez les lignes suivantes :

{{< code-block lang="go" filename="notes/notesController.go" disable_copy="true" collapsible="true" >}}
r.Get("/notes", nr.GetAllNotes)                // GET /notes
r.Post("/notes", nr.CreateNote)                // POST /notes
r.Get("/notes/{noteID}", nr.GetNoteByID)       // GET /notes/123
r.Put("/notes/{noteID}", nr.UpdateNoteByID)    // PUT /notes/123
r.Delete("/notes/{noteID}", nr.DeleteNoteByID) // DELETE /notes/123
{{< /code-block >}}

Supprimez les commentaires autour des lignes suivantes :

{{< code-block lang="go" disable_copy="true" filename="notes/notesController.go" collapsible="true" >}}
r.Get("/notes", makeSpanMiddleware("GetAllNotes", nr.GetAllNotes))               // GET /notes
r.Post("/notes", makeSpanMiddleware("CreateNote", nr.CreateNote))                // POST /notes
r.Get("/notes/{noteID}", makeSpanMiddleware("GetNote", nr.GetNoteByID))          // GET /notes/123
r.Put("/notes/{noteID}", makeSpanMiddleware("UpdateNote", nr.UpdateNoteByID))    // PUT /notes/123
r.Delete("/notes/{noteID}", makeSpanMiddleware("DeleteNote", nr.DeleteNoteByID)) // DELETE /notes/123
{{< /code-block >}}

Supprimez également le commentaire autour de l'importation suivante :

{{< code-block lang="go" filename="notes/notesController.go" disable_copy="true" collapsible="true" >}}
"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
{{< /code-block >}}

L'exemple d'application contient plusieurs exemples de traçage personnalisé. En voici quelques autres. Supprimez les commentaires pour activer ces spans :

La fonction `doLongRunningProcess` crée des spans enfant à partir d'un contexte parent :

{{< code-block lang="go" filename="notes/notesHelper.go" disable_copy="true" collapsible="true" >}}
func doLongRunningProcess(ctx context.Context) {
    childSpan, ctx := tracer.StartSpanFromContext(ctx, "traceMethod1")
    childSpan.SetTag(ext.ResourceName, "NotesHelper.doLongRunningProcess")
    defer childSpan.Finish()

    time.Sleep(300 * time.Millisecond)
    log.Println("Bonjour depuis le processus au long cours dans Notes")
    privateMethod1(ctx)
}
{{< /code-block >}}

La fonction `privateMethod1` illustre la création d'un service totalement distinct d'un contexte :

{{< code-block lang="go" filename="notes/notesHelper.go" disable_copy="true" collapsible="true" >}}
func privateMethod1(ctx context.Context) {
    childSpan, _ := tracer.StartSpanFromContext(ctx, "manualSpan1",
        tracer.SpanType("web"),
        tracer.ServiceName("noteshelper"),
    )
    childSpan.SetTag(ext.ResourceName, "privateMethod1")
    defer childSpan.Finish()

    time.Sleep(30 * time.Millisecond)
    log.Println("Bonjour depuis la méthode personnalisée privateMethod1 dans Notes")
}
{{< /code-block >}}

Pour en savoir plus sur les traces personnalisées, consultez la section [Go Custom Instrumentation][12] (en anglais).

## Ajouter une deuxième application pour voir ses traces distribuées

Le tracing d'une seule application est un excellent début. Toutefois, le tracing sert surtout à voir la façon dont les requêtes circulent dans vos services. On appelle ceci le _tracing distribué_.

L'exemple de projet comprend une deuxième application, appelée `calendar`, qui renvoie une date aléatoire lorsqu'elle est appelée. L'endpoint `POST` dans l'application Notes possède un deuxième paramètre de requête appelé `add_date`. Lorsque la valeur est `y`, lʼapplication de notes appelle l'application de calendrier pour obtenir une date à ajouter à la note.

Pour activer le tracing dans l'application de calendrier :

1. Supprimez la mise en commentaire des lignes suivantes dans `cmd/calendar/main.go` :
   {{< code-block lang="go" filename="cmd/calendar/main.go" disable_copy="true" collapsible="true" >}}
   chitrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi"
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
   {{< /code-block >}}

   {{< code-block lang="go" filename="cmd/calendar/main.go" disable_copy="true" collapsible="true" >}}
   tracer.Start()
   defer tracer.Stop()
   {{< /code-block >}}

   {{< code-block lang="go" filename="cmd/calendar/main.go" disable_copy="true" collapsible="true" >}}
   r.Use(chitrace.Middleware(chitrace.WithServiceName("calendar")))
   {{< /code-block >}}

1. Ouvrez `docker/all-docker-compose.yaml` et supprimez la mise en commentaire du service `calendar` pour configurer le host de lʼAgent et les tags de service unifié pour l'application et pour Docker :
   {{< code-block lang="yaml" filename="docker/all-docker-compose.yaml" >}}
   calendar:
     container_name: calendar
     restart: always
     build:
       context: ../
       dockerfile: ../dockerfile.calendar
     labels:
       - com.datadoghq.tags.service="calendar"
       - com.datadoghq.tags.env="dev"
       - com.datadoghq.tags.version="0.0.1"
     environment:
       - DD_SERVICE=calendar
       - DD_ENV=dev
       - DD_VERSION=0.0.1
       - DD_AGENT_HOST=datadog-agent
     ports:
       - 9090:9090
     depends_on:
       - datadog-agent
   {{< /code-block >}}
1. Dans la section du service `notes`, décommentez la variable dʼenvironnement `CALENDAR_HOST` et l'entrée `calendar` dans `depends_on` pour établir les connexions nécessaires entre les deux applications. Votre service de notes devrait ressembler à ceci :
   {{< code-block lang="yaml" filename="docker/all-docker-compose.yaml" >}}
   notes:
     container_name: notes
     restart: always
     build:
       context: ../
       dockerfile: ../dockerfile.notes
     ports:
       - 8080:8080
     labels:
       - com.datadoghq.tags.service="notes"
       - com.datadoghq.tags.env="dev"
       - com.datadoghq.tags.version="0.0.1"
     environment:
       - DD_SERVICE=notes
       - DD_ENV=dev
       - DD_VERSION=0.0.1
       - DD_AGENT_HOST=datadog-agent
       - CALENDAR_HOST=calendar
     depends_on:
       - calendar
       - datadog-agent
   {{< /code-block >}}

1. Arrêter tous les conteneurs en cours d'exécution :
   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml down{{< /code-block >}}

1. Mettre en service vos conteneurs d'application :
   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml build
   docker-compose -f all-docker-compose.yaml up -d{{< /code-block >}}

1. Envoyez une requête POST avec le paramètre `add_date` :
   {{< code-block lang="go">}}curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'{{< /code-block >}}

1. Dans le Trace Explorer, cliquez sur la dernière trace `notes` pour afficher une trace distribuée entre les deux services :
   {{< img src="tracing/guide/tutorials/tutorial-go-host-distributed.png" alt="Un flamegraph pour une trace distribuée." style="width:100%;" >}}

Ce flamegraph combine les interactions de plusieurs applications :
- La première span est une requête POST envoyée par l'utilisateur et traitée par le routeur `chi` par l'intermédiaire de la bibliothèque `go-chi` compatible.
- Le deuxième span est une fonction `createNote` qui a été tracée manuellement par la fonction `makeSpanMiddleware`. La fonction a créé un span à partir du contexte de la requête HTTP.
- Le span suivant est la requête envoyée par l'application de notes utilisant la bibliothèque `http` compatible et le client initialisé dans le fichier `main.go`. Cette requête GET est envoyée à l'application de calendrier. Les spans de l'application de calendrier apparaissent en bleu parce qu'il s'agit de deux services distincts.
- Dans l'application de calendrier, un routeur `go-chi` traite la requête GET et la fonction `GetDate` est tracée manuellement avec son propre span sous la requête GET.
- Enfin, l'appel `db` violet est un service à part entière à partir de la bibliothèque `sql` compatible. Il apparaît au même niveau que la requête `GET /Calendar` car ils sont tous deux appelés par le span parent `CreateNote`.

## Dépannage

Si vous ne recevez pas les traces comme prévu, configurez le mode debugging pour le traceur Go. Consultez la rubrique [Activer le mode debugging][13] pour en savoir plus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/guide/#enabling-tracing-tutorials
[2]: /fr/tracing/trace_collection/dd_libraries/go/
[3]: /fr/account_management/api-app-keys/
[4]: /fr/tracing/trace_collection/compatibility/go/
[5]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[6]: /fr/getting_started/site/
[7]: https://www.baeldung.com/go-instrumentation
[8]: https://app.datadoghq.com/event/explorer
[9]: https://github.com/DataDog/apm-tutorial-golang
[10]: /fr/getting_started/tagging/unified_service_tagging/#non-containerized-environment
[11]: https://app.datadoghq.com/apm/traces
[12]: /fr/tracing/trace_collection/custom_instrumentation/go/
[13]: /fr/tracing/troubleshooting/tracer_debug_logs/?code-lang=go
[14]: /fr/tracing/trace_collection/library_config/go/
[15]: /fr/tracing/trace_pipeline/ingestion_mechanisms/?tab=Go
[16]: /fr/tracing/trace_collection/compatibility/go/#library-compatibility
[17]: /fr/getting_started/tagging/unified_service_tagging/