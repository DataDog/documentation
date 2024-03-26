---
further_reading:
- link: /tracing/trace_collection/library_config/python/
  tags: Documentation
  text: Autres options de configuration de la bibliothèque de tracing
- link: /tracing/trace_collection/dd_libraries/python/
  tags: Documentation
  text: Instructions détaillées de configuration de la bibliothèque de tracing
- link: /tracing/trace_collection/compatibility/python/
  tags: Documentation
  text: Frameworks Python compatibles avec lʼinstrumentation automatique
- link: tracing/trace_collection/custom_instrumentation/python/
  tags: Documentation
  text: Configurer manuellement les traces et spans
- link: https://github.com/DataDog/dd-trace-php
  tags: GitHub
  text: Référentiel du code open source de la bibliothèque de tracing
kind: guide
title: 'Tutoriel : Activer le tracing pour une application Python et lʼAgent Datadog
  dans des conteneurs'
---

## Présentation

Ce tutoriel détaille les étapes permettant l'activation du tracing sur un exemple d'application Python installée dans un conteneur. Pour cet exemple, l'Agent Datadog est également installé dans le conteneur.

{{< img src="tracing/guide/tutorials/tutorial-python-containers-overview.png" alt="Diagramme illustrant un scénario dʼinstallation pour ce tutoriel" style="width:100%;" >}}

Pour les autres scénarios, y compris lʼapplication et lʼAgent sur un host, lʼapplication dans un conteneur et lʼAgent sur un host, et sur les applications écrites dans dʼautres langages, consultez les autres [tutoriels relatifs à lʼactivation du tracing][1].

Référez-vous à la section [Tracer des applications Python][2] pour consulter la documentation complète relative à la configuration du tracing pour Python.

### Prérequis

- Un compte Datadog et une [clé d'API de l'organisation][3]
- Git
- Python répondant aux [exigences de la bibliothèque de tracing][4]

## Installer lʼexemple dʼapplication Python Dockérisée

L'exemple de code pour ce tutoriel se trouve sur GitHub, à l'adresse suivante : [github.com/Datadog/apm-tutorial-python][9]. Pour commencer, dupliquez le référentiel :

{{< code-block lang="sh" >}}
git clone https://github.com/DataDog/apm-tutorial-python.git
{{< /code-block >}}

Ce référentiel contient une application Python dotée de plusieurs services, préconfigurée pour être exécutée au sein des conteneurs de Docker. Dans cet exemple, lʼapp est une app de note basique avec une API REST pour ajouter et modifier des données.

### Débuter et sʼentraîner avec lʼexemple dʼapplication

1. Créez le conteneur de lʼapplication en exécutant :

   {{< code-block lang="sh" >}}
docker-compose -f docker/containers/exercise/docker-compose.yaml build notes_app
{{< /code-block >}}

2. Démarrez le conteneur :

   {{< code-block lang="sh" >}}
docker-compose -f docker/containers/exercise/docker-compose.yaml up db notes_app
{{< /code-block >}}

   Lʼapplication est prête à être utilisée lorsque le résultat suivant sʼaffiche dans le terminal : 

   ```
   notes          |  * Debug mode: on
   notes          | INFO:werkzeug:WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
   notes          |  * Running on all addresses (0.0.0.0)
   notes          |  * Running on http://127.0.0.1:8080
   notes          |  * Running on http://192.168.32.3:8080
   notes          | INFO:werkzeug:Press CTRL+C to quit
   notes          | INFO:werkzeug: * Restarting with stat
   notes          | WARNING:werkzeug: * Debugger is active!
   notes          | INFO:werkzeug: * Debugger PIN: 143-375-699
   ```

   Vous pouvez également vérifier quʼelle sʼexécute en consultant les conteneurs exécutés avec la commande `docker ps`.

3. Ouvrez un autre terminal et envoyez des requêtes d'API pour entraîner l'application. L'application notes est une API REST qui stocke les données dans une base de données Postgres exécutée sur un autre conteneur. Envoyez-lui quelques commandes :

`curl -X GET 'localhost:8080/notes'`
: `{}`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `(1, hello)`

`curl -X GET 'localhost:8080/notes?id=1'`
: `(1, hello)`

`curl -X GET 'localhost:8080/notes'`
: `{”1”, "hello"}`

`curl -X PUT 'localhost:8080/notes?id=1&desc=UpdatedNote'`
: `(1, UpdatedNote)`

`curl -X DELETE 'localhost:8080/notes?id=1'`
: `Deleted`

### Arrêter lʼapplication

Une fois que vous avez vu lʼapplication sʼexécuter, arrêtez-la afin de pouvoir activer le tracing dessus.

1. Arrêtez les conteneurs :
   {{< code-block lang="sh" >}}
docker-compose -f docker/containers/exercise/docker-compose.yaml down
{{< /code-block >}}

2. Supprimez les conteneurs :
   {{< code-block lang="sh" >}}
docker-compose -f docker/containers/exercise/docker-compose.yaml rm
{{< /code-block >}}

## Activer le tracing

Maintenant que vous disposez d'une application Python fonctionnelle, configurez-la de façon à activer le tracing.

1. Ajoutez le package de tracing Python à votre projet. Ouvrez le fichier `apm-tutorial-python/requirements.txt` et ajoutez `ddtrace` à la liste sʼil nʼest pas déjà présent :

   ```
   flask==2.2.2
   psycopg2-binary==2.9.3
   requests==2.28.1
   ddtrace
   ```

2. Dans lʼapplication de note Dockerfile, `docker/containers/exercise/Dockerfile.notes`, changez la ligne de commande qui lance lʼapplication afin dʼutiliser le package `ddtrace` :

   ```
   # Run the application with Datadog 
   CMD ["ddtrace-run", "python", "-m", "notes_app.app"]
   ```

   Cela instrumente automatiquement lʼapplication avec les services de Datadog.

3. Appliquez le [tagging de service unifié][10], qui identifie les services tracés sur différentes versions et différents environnements de déploiement. Ainsi, ces services peuvent être mis en corrélation au sein de Datadog, et vous pouvez les rechercher et appliquer des filtres basés sur ces services. Les trois variables d'environnement utilisées pour le tagging de service unifié sont `DD_SERVICE`, `DD_ENV` et `DD_VERSION`. Ajoutez les variables d'environnement suivantes dans le Dockerfile :

   ```
   ENV DD_SERVICE="notes"
   ENV DD_ENV="dev"
   ENV DD_VERSION="0.1.0"
   ```

4. Ajoutez les étiquettes Docker qui correspondent aux tags de service unifié. Cela vous permet également dʼobtenir des métriques Docker une fois que votre application est exécutée. 

   ```
   LABEL com.datadoghq.tags.service="notes"
   LABEL com.datadoghq.tags.env="dev"
   LABEL com.datadoghq.tags.version="0.1.0"
   ```

Pour vérifier que votre configuration est correcte, comparez votre fichier Dockerfile avec celui fourni dans le fichier de solution du référentiel de l'exemple, `docker/containers/solution/Dockerfile.notes`.

## Ajouter le conteneur de l'Agent

Ajoutez le conteneur de l'Agent dans la section services du fichier `docker/containers/exercise/docker-compose.yaml` :

1. Ajoutez la configuration de l'Agent et indiquez votre propre [clé d'API Datadog][3] et [site][6] :
   ```yaml
     datadog:
       container_name: dd-agent
       image: "gcr.io/datadoghq/agent:latest"
       environment:
          - DD_API_KEY=<DD_API_KEY>
          - DD_SITE=datadoghq.com  # Default. Change to eu.datadoghq.com, us3.datadoghq.com, us5.datadoghq.com as appropriate for your org
          - DD_APM_ENABLED=true    # Enable APM
       volumes: 
          - /var/run/docker.sock:/var/run/docker.sock:ro 
          - /proc/:/host/proc/:ro
          - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
   ```

2. Ajoutez la variable d'environnement `DD_AGENT_HOST` et indiquez le hostname du conteneur de l'Agent dans la section de chaque conteneur avec le code que vous souhaitez surveiller. Dans cet exemple, il s'agit du conteneur `notes_app` :
   ```yaml
       environment:
        - DD_AGENT_HOST=datadog
   ```

Pour vérifier que votre configuration est correcte, comparez votre fichier `docker-compose.yaml` avec celui fourni dans le fichier de solution du référentiel de l'exemple, `docker/containers/solution/docker-compose.yaml`.

## Démarrer les conteneurs pour afficher le tracing automatique

Maintenant que la bibliothèque de tracing est installée, redémarrez votre application et commencez à recevoir des traces. Exécutez les commandes suivantes :

```
docker-compose -f docker/containers/exercise/docker-compose.yaml build notes_app
docker-compose -f docker/containers/exercise/docker-compose.yaml up db datadog notes_app
```

Vous pouvez savoir si l'Agent fonctionne en observant les sorties en continu du terminal, ou en ouvrant l'[Events Explorer][8] dans Datadog et en affichant l'événement de départ de l'Agent :

{{< img src="tracing/guide/tutorials/tutorial-python-container-agent-start-event.png" alt="Événement de départ de l'Agent affiché dans l'Events Explorer" style="width:100%;" >}}

Lorsque l'application est exécutée, envoyez-lui des requêtes curl   :

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `(1, hello)`

`curl -X GET 'localhost:8080/notes?id=1'`
: `(1, hello)`

`curl -X PUT 'localhost:8080/notes?id=1&desc=UpdatedNote'`
: `(1, UpdatedNote)`

`curl -X DELETE 'localhost:8080/notes?id=1'`
: `Deleted`

Patientez un moment, puis accédez à [**APM > Traces**][11] dans Datadog. Vous y trouverez une liste des traces correspondant à vos appels d'API :

{{< img src="tracing/guide/tutorials/tutorial-python-container-traces.png" alt="Traces de l'exemple d'application dans l'APM Trace Explorer" style="width:100%;" >}}

Si aucune trace ne s'affiche après quelques minutes, effacez les filtres actifs dans le champ Traces Search (il peut arriver qu'une variable d'environnement telle que `ENV` soit filtrée alors que vous ne l'utilisez pas).

### Examiner une trace

Sur la page Traces, cliquez sur une trace `POST /notes`. Vous verrez alors un flamegraph affichant la durée de chaque span ainsi que les autres spans exécutées avant la finalisation d'une span. La barre située en haut du graphique correspond à la span que vous avez sélectionnée sur l'écran précédent (dans le cas présent, le point d'entrée initial dans l'application notes).

La largeur d'une barre indique la durée de finalisation d'une t

Le flamegraph d'une trace `POST` ressemble à ceci :

{{< img src="tracing/guide/tutorials/tutorial-python-container-post-flame.png" alt="Un flamegraph pour une trace POST." style="width:100%;" >}}

Une trace `GET /notes` ressemble à ceci :

{{< img src="tracing/guide/tutorials/tutorial-python-container-get-flame.png" alt="Un flamegraph pour une trace GET." style="width:100%;" >}}


## Ajouter une instrumentation personnalisée à l'application Python

L'instrumentation automatique est une fonctionnalité pratique, mais il se peut que vous ayez besoin de spans plus précises. L'API Python DD Trace de Datadog vous permet de spécifier des spans au sein de votre code à l'aide d'annotations ou de code.

Les étapes suivantes décrivent comment ajouter des annotations au code pour tracer des exemples de méthodes. 

1. Ouvrez `notes_app/notes_helper.py`.
2. Ajoutez l'importation suivante :
   {{< code-block lang="python" >}}
from ddtrace import tracer{{< /code-block >}}

3. Dans la classe `NotesHelper`, ajoutez un wrapper de traceur nommé `notes_helper` pour mieux comprendre le fonctionnement de la méthode `notes_helper.long_running_process` :
   {{< code-block lang="python" >}}class NotesHelper:

    @tracer.wrap(service="notes_helper")
    def long_running_process(self):
        time.sleep(.3)
        logging.info("Le processus à longue exécution dit bonjour")
        self.__private_method_1(){{< /code-block >}}

    Désormais, le traceur ajoute automatiquement une étiquette à la ressource avec le nom de la fonction qu'il entoure. Dans cet exemple : `long_running_process`.

4. Recréer les conteneurs en exécutant :
   {{< code-block lang="sh" >}}
docker-compose -f docker/containers/exercise/docker-compose.yaml build notes_app
docker-compose -f docker/containers/exercise/docker-compose.yaml up db datadog notes_app
{{< /code-block >}}
4. Renvoyez des requêtes HTTP, spécifiquement des requêtes `GET`.
5. Dans le Trace Explorer,, cliquez sur l'une des nouvelles requêtes `GET` et le flamegraph s'affiche ainsi :

   {{< img src="tracing/guide/tutorials/tutorial-python-container-custom-flame.png" alt="Un flamegraph pour une trace GET avec une instrumentation personnalisée." style="width:100%;" >}}

   Vous remarquerez que le niveau de détail est plus élevé dans la stack trace, maintenant que la fonction `get_notes` dispose de tracing personnalisé.

Pour ens avoir plus, consultez la section [Instrumentation personnalisée][12].

## Ajouter une deuxième application pour voir ses traces distribuées

Le tracing d'une seule application est un excellent début. Toutefois, le tracing sert surtout à voir la façon dont les requêtes circulent dans vos services. On appelle ceci le _tracing distribué_. 

L'exemple de projet comprend une deuxième application, appelée `calendar_app`, qui renvoie une date aléatoire lorsqu'elle est appelée. L'endpoint `POST` dans l'application Notes possède un deuxième paramètre de requête appelé `add_date`. Lorsque la valeur est `y`, Notes appelle l'application de calendrier pour obtenir une date à ajouter à la note.

1. Configurez l'app de calendrier pour le tracing en ajoutant `dd_trace` à la commande de démarrage dans le Dockerfile, comme vous l'avez déjà fait pour l'app de notes. Ouvrez `docker/containers/exercise/Dockerfile.calendar` et mettez à jour la ligne de commande comme suit :
   ```
   CMD ["ddtrace-run", "python", "-m", "calendar_app.app"] 
   ```

3. Appliquez des tags de service unifié, comme nous l'avons déjà fait pour l'app de notes. Ajoutez les variables d'environnement suivantes dans le fichier `Dockerfile.calendar` :

   ```
   ENV DD_SERVICE="calendar"
   ENV DD_ENV="dev"
   ENV DD_VERSION="0.1.0"
   ```

4. Une fois encore, ajoutez les étiquettes Docker qui correspondent aux tags de service unifié. Cela vous permet également dʼobtenir des métriques Docker une fois que votre application est exécutée. 

   ```
   LABEL com.datadoghq.tags.service="calendar"
   LABEL com.datadoghq.tags.env="dev"
   LABEL com.datadoghq.tags.version="0.1.0"
   ```

2. Ajoutez le hostname du conteneur de l'Agent, `DD_AGENT_HOST`, au conteneur de l'application de calendrier pour envoyer des traces à la bonne destination. Ouvrez `docker/containers/exercise/docker-compose.yaml` et ajoutez les lignes suivantes à la section `calendar_app` :

   ```yaml
       environment:
        - DD_AGENT_HOST=datadog
   ```

   Pour vérifier que votre configuration est correcte, comparez votre configuration avec le fichier Dockerfile et `docker-config.yaml`, dans le répertoire `docker/containers/solution` du référentiel de l'exemple.

5. Créez l'application dotée de plusieurs services en redémarrant les conteneurs. Commencez par arrêter l'exécution de tous les conteneurs :
   ```
   docker-compose -f docker/containers/exercise/docker-compose.yaml down
   ```

   Exécutez ensuite les commandes suivantes pour les lancer :
   ```
   docker-compose -f docker/containers/exercise/docker-compose.yaml build
   docker-compose -f docker/containers/exercise/docker-compose.yaml up
   ```

6. Envoyez une requête POST avec le paramètre `add_date` :

`curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'`
: `(2, hello_again with date 2022-11-06)`


7. Dans le Trace Explorer, cliquez sur la dernière trace pour afficher une trace distribuée entre les deux services :

   {{< img src="tracing/guide/tutorials/tutorial-python-container-distributed.png" alt="Un flamegraph pour une trace distribuée." style="width:100%;" >}}

## Ajouter davantage d'instrumentation personnalisée

Vous pouvez ajouter de l'instrumentation personnalisée à l'aide de code. Imaginons que vous souhaitiez instrumenter davantage le service de calendrier pour mieux voir la trace :

1. Ouvrez `notes_app/notes_logic.py`. 
2. Ajoutez l'importation suivante

   ```python
   from ddtrace import tracer
   ```
3. Dans le bloc `try`, au niveau de la ligne 28, ajoutez l'instruction `with` suivante :

   ```python
   with tracer.trace(name="notes_helper", service="notes_helper", resource="another_process") as span:
   ```
   Voici le résultat :
   {{< code-block lang="python" >}}
def create_note(self, desc, add_date=None):
        if (add_date):
            if (add_date.lower() == "y"):
                try:
                    with tracer.trace(name="notes_helper", service="notes_helper", resource="another_process") as span:
                        self.nh.another_process()
                    note_date = requests.get(f"http://localhost:9090/calendar")
                    note_date = note_date.text
                    desc = desc + " with date " + note_date
                    print(desc)
                except Exception as e:
                    print(e)
                    raise IOError("Cannot reach calendar service.")
        note = Note(description=desc, id=None)
        note.id = self.db.create_note(note){{< /code-block >}}

4. Recréez les conteneurs :
   ```
   docker-compose -f docker/containers/exercise/docker-compose.yaml build notes_app
   docker-compose -f docker/containers/exercise/docker-compose.yaml up
   ```

5. Envoyez d'autres requêtes HTTP, spécifiquement des requêtes `POST`, avec l'argument `add_date`.
6. Dans le Trace Explorer, cliquez sur une de ces nouvelles traces `POST` pour voir une trace personnalisée dans plusieurs services :
   {{< img src="tracing/guide/tutorials/tutorial-python-container-cust-dist.png" alt="Un flamegraph pour une trace distribuée avec une instrumentation personnalisée." style="width:100%;" >}}
   Notez la nouvelle span portant l'étiquette `notes_helper.another_process`.

Si vous ne recevez pas les traces comme prévu, configurez le mode debugging dans le package Python `ddtrace`. Consultez la rubrique [Activer le mode debugging][13] pour en savoir plus.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/guide/#enabling-tracing-tutorials
[2]: /fr/tracing/trace_collection/dd_libraries/python/
[3]: /fr/account_management/api-app-keys/
[4]: /fr/tracing/trace_collection/compatibility/python/
[6]: /fr/getting_started/site/
[8]: https://app.datadoghq.com/event/explorer
[9]: https://github.com/DataDog/apm-tutorial-python
[10]: /fr/getting_started/tagging/unified_service_tagging/
[11]: https://app.datadoghq.com/apm/traces
[12]: /fr/tracing/trace_collection/custom_instrumentation/python/
[13]: /fr/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode