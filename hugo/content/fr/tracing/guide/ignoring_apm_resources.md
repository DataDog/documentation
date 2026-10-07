---
description: Apprenez à exclure les ressources indésirables telles que les vérifications
  de santé des traces en utilisant des règles d'échantillonnage et un filtrage pour
  réduire le bruit et gérer les coûts.
title: Ignorer les ressources non désirées dans APM
---
Les services gèrent souvent des endpoints dont vous ne souhaitez peut-être pas tracer le trafic (par exemple, les vérifications de santé). Ce guide explique les approches suivantes pour exclure ce trafic :

- **Échantillonnage** : Utilisez lorsque vous souhaitez que les requêtes restent visibles dans les métriques de trace, mais réduisez le volume d'ingestion des traces.
- **Filtrage dans l'Agent Datadog** : Utilisez pour exclure complètement les requêtes (y compris des métriques de trace) dans tous les services rapportant à l'Agent.
- **Configuration du traceur** : Utilisez lorsque la logique de filtrage doit être appliquée par service ou dépend du contexte spécifique à l'application (par exemple, les attributs de requête ou l'état d'exécution).

Si vous avez besoin d'aide pour décider quelle option est la plus pertinente pour votre cas d'utilisation, contactez [le support Datadog][1]. 

## Échantillonnage {#sampling}

Si vous souhaitez que le span soit inclus dans les métriques de trace mais que vous ne voulez pas qu'il soit ingéré, utilisez des règles d'échantillonnage. Pour plus d'informations sur l'échantillonnage, consultez [Contrôles d'ingestion][4].

### Utilisation des règles d'échantillonnage {#using-sampling-rules}

L'approche recommandée est d'utiliser des règles d'échantillonnage, qui vous permettent d'échantillonner les traces en fonction des noms de ressources, des noms de services, des balises et des noms d'opération :

```shell
DD_TRACE_SAMPLING_RULES='[{"resource": "GET healthcheck", "sample_rate": 0.0}]'
```

Ou d'échantillonner en fonction des balises d'URL HTTP :

```shell
DD_TRACE_SAMPLING_RULES='[{"tags": {"http.url": "http://.*/healthcheck$"}, "sample_rate": 0.0}]'
```

<div class="alert alert-info">Les décisions d'échantillonnage sont déterminées en utilisant le premier span dans une trace. Si le span contenant la balise sur laquelle vous souhaitez filtrer n'est pas un {{< tooltip glossary="trace_root_span" case="sentence" >}}, cette règle n'est pas appliquée.</div>

## Filtrage dans l'Agent Datadog {#filtering-in-the-datadog-agent}

Si vous ne souhaitez pas que le span soit ingéré ou reflété dans les métriques de trace, utilisez le filtrage dans l'Agent Datadog.

Le composant Trace Agent au sein de l'Agent Datadog dispose de deux méthodes pour empêcher l'envoi de certaines traces : filtrage par balises de span ou filtrage par ressources. Si des traces sont supprimées en raison de ces paramètres, les métriques de trace excluent ces requêtes.

Configurer l'Agent de Trace pour ignorer certaines traces ou ressources s'applique à tous les services qui envoient des traces à cet Agent Datadog. Si vous avez des exigences spécifiques à l'application, utilisez la [configuration du Tracer](#tracer-configuration) à la place.

<div class="alert alert-info">
Si aucune des options de ce guide ne répond à vos exigences, envisagez d'ajouter un <a href="/tracing/trace_collection/custom_instrumentation/otel_instrumentation/">tag de span personnalisé</a> dans votre application et de l'utiliser pour supprimer des traces à l'Agent.
</div>

### Ignorer les traces basées sur des balises de span {#ignoring-traces-based-on-span-tags}

À partir de l'Agent Datadog 6.27.0/7.27.0, l'option **balises de filtre** supprime les traces avec des spans racines qui correspondent aux balises de span spécifiées. Cette option s'applique à tous les services qui envoient des traces à cet Agent Datadog. Les traces qui sont supprimées en raison des balises de filtre ne sont pas incluses dans les métriques de trace.

<div class="alert alert-info">
Des spans individuels au sein d'une trace ne peuvent pas être supprimés sélectivement ; si le span racine correspond aux critères de filtre, la trace complète est rejetée.
</div>

**Comportement de correspondance :**

L'option des balises de filtre nécessite une correspondance exacte de chaîne. Pour le filtrage basé sur des regex, voir [Ignorer en fonction des ressources](#ignoring-traces-based-on-resources).

Lorsque vous spécifiez plusieurs balises, le filtre utilise la **logique OU**: les traces sont supprimées si le span racine correspond à **l'une** des balises. Pour faire correspondre plusieurs conditions simultanément, ajoutez une balise personnalisée qui représente ces critères combinés.

**Configuration :**

Vous pouvez spécifier des balises de span à exiger ou à rejeter en utilisant une liste de clés et de valeurs séparées par des espaces dans les variables d'environnement :

`DD_APM_FILTER_TAGS_REQUIRE`
: Collecte uniquement les traces qui ont des spans racines avec une correspondance exacte pour les balises de span et les valeurs spécifiées. Si cela ne correspond pas à cette règle, la trace est supprimée. Par exemple, `DD_APM_FILTER_TAGS_REQUIRE="key1:value1 key2:value2"`. Dans l'Agent Datadog 7.49+, des expressions régulières peuvent être fournies avec `DD_APM_FILTER_TAGS_REGEX_REQUIRE`.

`DD_APM_FILTER_TAGS_REJECT`
Rejette les traces qui ont des spans racines avec une correspondance exacte pour les balises de span et valeurs spécifiées. Si cela correspond à cette règle, la trace est supprimée. Par exemple, `DD_APM_FILTER_TAGS_REJECT="key1:value1 key2:value2"`. Dans Datadog Agent 7.49+, des expressions régulières peuvent être fournies avec `DD_APM_FILTER_TAGS_REGEX_REJECT`.

{{< tabs >}}

{{% tab "Kubernetes" %}}

#### Opérateur Datadog {#datadog-operator}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      containers:
        trace-agent:
          env:
            - name: DD_APM_FILTER_TAGS_REJECT
              value: tag_key1:tag_val2 tag_key2:tag_val2
{{< /code-block >}}

{{% k8s-operator-redeploy %}}

#### Helm {#helm}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
agents:
  containers:
    traceAgent:
      env:
        - name: DD_APM_FILTER_TAGS_REJECT
          value: tag_key1:tag_val2 tag_key2:tag_val2

{{< /code-block >}}

{{% k8s-helm-redeploy %}}

[1]: /fr/agent/kubernetes/?tab=helm#installation

{{% /tab %}}

{{% tab "datadog.yaml" %}}

Vous pouvez également définir ces valeurs dans le fichier de configuration de l'Agent en utilisant une liste séparée par des virgules :

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  filter_tags:
    require: ["db:sql", "db.instance:mysql"]
    reject: ["outcome:success", "key2:value2"]
{{< /code-block >}}

Par exemple, pour ignorer les vérifications de santé où le `http.url` correspond à ce point de terminaison :

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  filter_tags:
    reject: ["http.url:http://localhost:5050/healthcheck"]
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}


#### Balises de span disponibles {#available-span-tags}

Sur le backend, Datadog crée les balises de span suivantes sur les spans après ingestion. 

**Remarque** : Ces balises ne peuvent pas être utilisées pour supprimer des traces au niveau de l'Agent Datadog. L'agent filtre uniquement en fonction des balises disponibles avant l'ingestion.

| Nom                                    | Description                                      |
|-----------------------------------------|--------------------------------------------------|
| `http.path_group`                       | Le chemin d'URL complet à partir de la balise `http.url`.        |
| `http.url_details.host`                 | La partie nom d'hôte de la balise `http.url`.      |
| `http.url_details.path`                 | La cible de requête complète telle que transmise dans une ligne de requête HTTP ou équivalent. |
| `http.url_details.scheme`               | Le schéma de requête à partir de la balise `http.url`.       |
| `http.url_details.queryString`          | La partie de chaîne de requête à partir de la balise `http.url`. |
| `http.url_details.port`                 | Le port HTTP à partir de la balise `http.url`.            |
| `http.useragent_details.os.family`      | La famille de systèmes d'exploitation rapportée par l'User-Agent.         |
| `http.useragent_details.browser.family` | La famille de navigateurs rapportée par l'User-Agent.    |
| `http.useragent_details.device.family`  | La famille de dispositifs rapportée par l'User-Agent.     |

<div class="alert alert-danger">À partir du 1er octobre 2022, le backend de Datadog applique un remappage afin d'appliquer <a href="/tracing/trace_collection/tracing_naming_convention">la sémantique des balises de span.
</a> à travers les traceurs sur tous les spans ingérés. Si vous souhaitez supprimer des traces basées sur les balises de span racine au niveau de l'Agent Datadog, utilisez des balises dans la colonne <strong>Remap from</strong>.</div>

##### Communications réseau {#network-communications}

| **Nom**                   | **Remap from**                                      |
|----------------------------|-----------------------------------------------------|
| `network.host.ip`          | `tcp.local.address` - Node.js                       |
| `network.destination.ip`   | `out.host` - Tous les langages  |
| `network.destination.port` | `grpc.port` - Python<br>`tcp.remote.port` - Node.js<br>`out.port` - Tous les langages  |

##### Requêtes HTTP {#http-requests}

| **Nom**                       | **Remap from**                                                                                        |
|--------------------------------|-------------------------------------------------------------------------------------------------------|
| `http.route`                   | `aspnet_core.route` - .NET<br>`aspnet.route` - .NET<br>`laravel.route` - PHP<br>`symfony.route` - PHP |
| `http.useragent`               | `user_agent` - Java, C++                                                                                   |
| `http.url_details.queryString` | `http.query.string` - Python                                                                          |

##### Base de données {#database}

| **Nom**                         | **Remap from**                                                                                                                                                                                                                  |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `db.system`                      | `db.type` - Java, Python, Node.js, Go<br>`active_record.db.vendor` - Ruby<br>`sequel.db.vendor` - Ruby                                                                                                                          |
| `db.instance`                    | `mongodb.db` - Python<br> `sql.db` - Python<br> `db.name` - Tous les langages                                           |
| `db.statement`                   | `cassandra.query` - Go<br>`consul.command` - Python<br>`memcached.query` - Python<br>`mongodb.query` - Python, .NET, Go<br>`redis.command` - Python<br>`redis.raw_command` - Python<br>`sql.query` - Python, PHP, Node.js, Java |
| `db.row_count`                   | `cassandra.row_count` - Python<br>`db.rowcount` - Python, PHP<br>`mongodb.rows` - Python<br>`sql.rows` - Python                                                                                                                 |
| `db.cassandra.cluster`           | `cassandra.cluster` - Python, Go                                                                                                                                                                                                |
| `db.cassandra.consistency_level` | `cassandra.consistency_level` - Python, Go                                                                                                                                                                                      |
| `db.cassandra.table`             | `cassandra.keyspace` - Python, Go                                                                                                                                                                                               |
| `db.redis.database_index`        | `db.redis.dbIndex` - Java<br>`out.redis_db` - Python, Ruby                                                                                                                                                                      |
| `db.mongodb.collection`          | `mongodb.collection` - Python, .NET, Ruby, PHP                                                                                                                                                                                  |
| `db.cosmosdb.container`          | `cosmosdb.container` - .NET                                                                                                                                                                                                     |

##### File d'attente de messages {#message-queue}

| **Nom**                               | **Remap from**                                                                                             |
|----------------------------------------|------------------------------------------------------------------------------------------------------------|
| `messaging.destination`                | `amqp.destination` - Node.js<br>`amqp.queue` - .NET<br>`msmq.queue.path` - .NET<br>`aws.queue.name` - .NET |
| `messaging.url`                        | `aws.queue.url` - .NET, Java                                                                               |
| `messaging.message_id`                 | `server_id` - Go                                                                                           |
| `messaging.message_payload_size`       | `message.size` - .NET, Java                                                                                |
| `messaging.operation`                  | `amqp.command` - .NET<br>`msmq.command` - .NET                                                             |
| `messaging.rabbitmq.routing_key`       | `amqp.routing_key` - Java<br>`amqp.routingKey` - Node.js|
| `messaging.rabbitmq.delivery_mode`     | `messaging.rabbitmq.exchange` - .NET                                                                       |
| `messaging.msmq.message.transactional` | `msmq.message.transactional` - .NET                                                                        |
| `messaging.msmq.queue.transactional`   | `msmq.queue.transactional` - .NET                                                                          |
| `messaging.kafka.consumer_group`       | `kafka.group` - Java                                                                                       |
| `messaging.kafka.tombstone`            | `kafka.tombstone` - .NET<br>`tombstone` - Java                                                             |
| `messaging.kafka.partition`            | `kafka.partition` - .NET<br>`partition` - Node.js, Go, Java                                                |
| `messaging.kafka.offset`               | `kafka.offset` - .NET                                                                                      |
| `messaging.msmq.message.transactional` | `msmq.message.transactional` - .NET                                                                        |


##### Appels de procédure à distance {#remote-procedure-calls}

| **Nom**                       | **Remap from**                                                                                          |
|--------------------------------|---------------------------------------------------------------------------------------------------------|
| `rpc.service`                  | `grpc.method.service` - Python, .NET                                                                    |
| `rpc.method`                   | `grpc.method.name` - Python, .NET, Go                                                                   |
| `rpc.grpc.package`             | `grpc.method.package` - Python, .NET, Go                                                                |
| `rpc.grpc.status_code`         | `grpc.code` - Go<br>`status.code` - Python, .NET, Node.js<br>`grpc.status.code` - Python, .NET, Node.js |
| `rpc.grpc.kind`                | `grpc.method.kind` - Python, Node.js, Go, .NET                                                          |
| `rpc.grpc.path`                | `rpc.grpc.path` - Python, Node.js, Go, .NET                                                             |
| `rpc.grpc.request.metadata.*`  | `grpc.request.metadata.*` - Python, Node.js<br>`rpc.grpc.request.metadata` - Go                         |
| `rpc.grpc.response.metadata.*` | `grpc.response.metadata.*` - Python, Node.js

##### Erreurs {#errors}

| **Nom**                       | **Remappage depuis**                                                                                          |
|--------------------------------|---------------------------------------------------------------------------------------------------------|
| `error.message`                  | `error.msg` - Tous les langages                      |

### Ignorer les traces basées sur les ressources {#ignoring-traces-based-on-resources}

L'option **ignore resources** permet d'exclure les ressources si le span racine global de la trace correspond à certains critères. Voir [Exclure les ressources de la collecte][5]. Cette option s'applique à tous les services qui envoient des traces à cet Agent Datadog particulier. Les traces qui sont ignorées en raison des ressources à ignorer ne sont pas incluses dans les métriques de trace.

Vous pouvez spécifier les ressources à ignorer soit dans le fichier de configuration de l'Agent, `datadog.yaml`, soit avec la variable d'environnement `DD_APM_IGNORE_RESOURCES`. Voir les exemples ci-dessous.

Utilisation de `datadog.yaml` :

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
## @param ignore_resources - list of strings - optional
## A list of regular expressions can be provided to exclude certain traces based on their resource name.
## All entries must be surrounded by double quotes and separated by commas.

  ignore_resources: ["(GET|POST) /healthcheck","API::NotesController#index"]
{{< /code-block >}}

Utilisation de `DD_APM_IGNORE_RESOURCES` :

```shell
DD_APM_IGNORE_RESOURCES="(GET|POST) /healthcheck,API::NotesController#index"
```

**Notes** :
- Lors de l'utilisation du format de variable d'environnement (`DD_APM_IGNORE_RESOURCES`), les valeurs doivent être fournies sous forme de liste de chaînes séparées par des virgules.
- La syntaxe regex que l'Agent de Trace accepte est évaluée par [regexp][6] de Go.
- Selon votre stratégie de déploiement, vous devrez peut-être ajuster la regex en échappant les caractères spéciaux.
- Si vous utilisez des conteneurs dédiés avec Kubernetes, assurez-vous que la variable d'environnement pour l'option de ressource à ignorer est appliquée au conteneur **trace-agent**.

#### Exemple {#example}

Considérez une trace qui contient des appels à `/api/healthcheck` dont vous ne souhaitez pas avoir de traces :

{{< img src="tracing/guide/ignoring_apm_resources/ignoreresources.png" alt="Flame graph d'une ressource que vous souhaitez que le SDK ignore" style="width:90%;">}}

Notez le nom de ressource de la span racine globale.

- Nom de l'opération : `rack.request`
- Nom de la ressource : `Api::HealthchecksController#index`
- Http.url : `/api/healthcheck`

Pour utiliser correctement l'option de ressource à ignorer, la règle regex écrite doit correspondre au nom de la ressource, `Api::HealthchecksController#index`. Quelques options regex sont possibles, mais pour filtrer exactement les traces de cette ressource telles qu'elles sont, une regex potentielle à utiliser est `Api::HealthchecksController#index$`.

La syntaxe peut varier en fonction de votre déploiement 

{{< tabs >}}
{{% tab "datadog.yaml" %}}

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  ignore_resources: Api::HealthchecksController#index$
{{< /code-block >}}

Pour plusieurs valeurs :

{{< code-block lang="yaml" >}}
apm_config:
  ignore_resources: ["value1","Api::HealthchecksController#index$"]
{{< /code-block >}}

{{% /tab %}}
{{% tab "Docker compose" %}}

Dans la liste des variables d'environnement du conteneur de l'Agent Datadog, ajoutez `DD_APM_IGNORE_RESOURCES` avec un modèle comme l'exemple ci-dessous. Docker Compose a sa propre [substitution de variables][1] à prendre en compte lorsque vous utilisez des caractères spéciaux comme `$`.

{{< code-block lang="yaml" >}}
    environment:
      // other Datadog Agent environment variables
      - DD_APM_IGNORE_RESOURCES=Api::HealthchecksController#index$$
{{< /code-block >}}

Pour plusieurs valeurs :

{{< code-block lang="yaml" >}}
    environment:
      // other Datadog Agent environment variables
      - DD_APM_IGNORE_RESOURCES="value1","Api::HealthchecksController#index$$"
{{< /code-block >}}

[1]: https://docs.docker.com/compose/compose-file/compose-file-v3/#variable-substitution
{{% /tab %}}
{{% tab "Docker run" %}}

Dans votre commande docker run pour démarrer l'Agent Datadog, ajoutez `DD_APM_IGNORE_RESOURCES` :

{{< code-block lang="shell" >}}
docker run -d --name datadog-agent \
              --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<> \
              -e DD_APM_IGNORE_RESOURCES="Api::HealthchecksController#index$" \
              -e DD_APM_ENABLED=true \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              registry.datadoghq.com/agent:latest
{{< /code-block >}}

Pour plusieurs valeurs :

{{< code-block lang="yaml" >}}
              -e DD_APM_IGNORE_RESOURCES=["value1","Api::HealthchecksController#index$"] \
{{< /code-block >}}

{{% /tab %}}
{{% tab "DaemonSet Kubernetes" %}}

Dans le conteneur dédié de trace-agent, ajoutez la variable d'environnement `DD_APM_IGNORE_RESOURCES` :

{{< code-block lang="yaml" >}}
    - name: trace-agent
        image: "registry.datadoghq.com/agent:latest"
        imagePullPolicy: IfNotPresent
        command: ["trace-agent", "-config=/etc/datadog-agent/datadog.yaml"]
        resources: {}
        ports:
        - containerPort: 8126
          hostPort: 8126
          name: traceport
          protocol: TCP
        env:
        - name: DD_API_KEY
          valueFrom:
            secretKeyRef:
              name: "datadog-secret"
              key: api-key
        - name: DD_KUBERNETES_KUBELET_HOST
          valueFrom:
            fieldRef:
              fieldPath: status.hostIP
        - name: KUBERNETES
          value: "yes"
        - name: DOCKER_HOST
          value: unix:///host/var/run/docker.sock
        - name: DD_LOG_LEVEL
          value: "INFO"
        - name: DD_APM_ENABLED
          value: "true"
        - name: DD_APM_NON_LOCAL_TRAFFIC
          value: "true"
        - name: DD_APM_RECEIVER_PORT
          value: "8126"
        - name: DD_KUBELET_TLS_VERIFY
          value: "false"
        - name: DD_APM_IGNORE_RESOURCES
          value: "Api::HealthchecksController#index$"
{{< /code-block >}}

Pour plusieurs valeurs :

{{< code-block lang="yaml" >}}
        - name: DD_APM_IGNORE_RESOURCES
          value: '"value1","Api::HealthchecksController#index$"'
{{< /code-block >}}

{{% /tab %}}
{{% tab "Kubernetes Helm" %}}

Dans la section `traceAgent` du fichier `values.yaml`, ajoutez `DD_APM_IGNORE_RESOURCES` dans la section `env`, puis [démarrez helm comme d'habitude][1].

{{< code-block lang="yaml" filename="values.yaml" >}}
    traceAgent:
      # agents.containers.traceAgent.env -- Additional environment variables for the trace-agent container
      env:
        - name: DD_APM_IGNORE_RESOURCES
          value: Api::HealthchecksController#index$

{{< /code-block >}}

Pour plusieurs valeurs :

{{< code-block lang="yaml" >}}
        - name: DD_APM_IGNORE_RESOURCES
          value: value1, Api::HealthchecksController#index$
{{< /code-block >}}

Alternativement, vous pouvez définir `agents.containers.traceAgent.env` dans la commande `helm install` :

{{< code-block lang="shell" >}}
helm install dd-agent -f values.yaml \
  --set datadog.apiKeyExistingSecret="datadog-secret" \
  --set agents.containers.traceAgent.env[0].name=DD_APM_IGNORE_RESOURCES, \
    agents.containers.traceAgent.env[0].value="Api::HealthchecksController#index$" \
  datadog/datadog
{{< /code-block >}}

[1]: /fr/agent/kubernetes/?tab=helm#installation
{{% /tab %}}
{{% tab "Définition de tâche Amazon ECS" %}}

Si vous utilisez Amazon ECS (comme sur EC2), dans la définition de votre conteneur Agent Datadog, ajoutez la variable d'environnement `DD_APM_IGNORE_RESOURCES` avec des valeurs telles que le JSON évalue à quelque chose comme ceci :

{{< code-block lang="json" >}}
    "environment": [
	// other environment variables for the Datadog Agent
        {
          "name": "DD_APM_IGNORE_RESOURCES",
          "value": "Api::HealthchecksController#index$"
        }
     ]
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger">Filtrer les traces de cette manière supprime ces requêtes des <a href="/tracing/guide/metrics_namespace/">métriques de trace</a>. Pour des informations sur la façon de réduire l'ingestion sans affecter les métriques de trace, voir <a href="/tracing/trace_ingestion/ingestion_controls">contrôles d'ingestion</a>.</div>

## Configuration du traceur {#tracer-configuration}

Certains traceurs de langage peuvent supprimer des traces avant qu'elles ne soient envoyées à l'Agent Datadog. Utilisez cette option si vous avez des exigences spécifiques à l'application.

<div class="alert alert-warning">
1. Si la requête est associée à une trace distribuée, la trace résultante peut avoir une inexactitude d'échantillonnage si vous supprimez des portions de celle-ci en raison de ces règles de filtrage.<br> 
2. Filtrer les traces de cette manière supprime ces requêtes des <a href="/tracing/guide/metrics_namespace/">métriques de trace</a>. Pour des informations sur la façon de réduire l'ingestion sans affecter les métriques de trace, voir <a href="/tracing/trace_ingestion/ingestion_controls">contrôles d'ingestion</a>.</div>


{{< programming-lang-wrapper langs="ruby,python,nodeJS,java" >}}

{{< programming-lang lang="ruby" >}}

Le traceur Ruby dispose d'un pipeline de post-traitement qui supprime les traces qui répondent à certains critères. Plus d'informations et d'exemples peuvent être trouvés dans [Post-traitement des traces][1].

Par exemple, si le nom de la ressource est `Api::HealthchecksController#index`, utilisez la classe `Datadog::Tracing::Pipeline::SpanFilter` pour supprimer les traces contenant le nom de la ressource. Ce filtre peut également être utilisé pour correspondre à d'autres métadonnées disponibles pour l'[objet span][2].

```
Datadog::Tracing.before_flush(
   Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.resource =~ /Api::HealthchecksController#index/ }
)
```

[1]: /fr/tracing/trace_collection/custom_instrumentation/ruby/?tab=activespan#post-processing-traces
[2]: /fr/tracing/trace_collection/dd_libraries/ruby/#manual-instrumentation
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Le traceur Python offre une option pour filtrer les traces indésirables :

### Utilisation de filtres personnalisés {#using-custom-filters}

Pour des cas d'utilisation avancés, vous pouvez créer des filtres personnalisés :

```py
from ddtrace.trace import tracer
from ddtrace.trace import TraceFilter
import re

class CustomFilter(TraceFilter):
    def __init__(self, pattern):
        self.pattern = re.compile(pattern)

    def process_trace(self, trace):
        for span in trace:
            if span.get_tag('http.url') and self.pattern.match(span.get_tag('http.url')):
                return None  # Drop the trace
        return trace  # Keep the trace

# Configure the SDK with your custom filter
tracer.configure(trace_processors=[CustomFilter(r'http://.*/healthcheck$')])
```

{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

Configurez une liste de blocage sur le plugin [Http][1]. Prenez note de ce sur quoi la liste de blocage correspond dans la documentation de l'API. Par exemple, les requêtes Http entrantes correspondent aux chemins d'URL, donc si le tag span `http.url` de la trace est `http://<domain>/healthcheck`, écrivez une règle qui correspond à l'URL `healthcheck` :


```
const tracer = require('dd-trace').init();
tracer.use('http', {
  // incoming http requests match on the path
  server: {
    blocklist: ['/healthcheck']
  },
  // outgoing http requests match on a full URL
  client: {
    blocklist: ['https://telemetry.example.org/api/v1/record']
  }
})

//import http

```
<div class="alert alert-info">La configuration du SDK pour l'intégration doit venir <em>avant</em> que ce module instrumenté soit importé.</div>

[1]: https://datadoghq.dev/dd-trace-js/interfaces/export_.plugins.connect.html#blocklist
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

Le traceur Java a une option pour un `TraceInterceptor` personnalisé afin de filtrer certains spans. Voir [Étendre les traceurs][1].

Par exemple, si votre nom de ressource est `GET /healthcheck`, écrivez un intercepteur de trace qui supprime les traces contenant ce nom de ressource. Ajustez la logique pour répondre à votre cas d'utilisation.

```
public class GreetingController {
   static {
       // In a class static block to avoid initializing multiple times.
       GlobalTracer.get().addTraceInterceptor(new TraceInterceptor() {
           @Override
           public Collection<? extends MutableSpan> onTraceComplete(Collection<? extends MutableSpan> trace) {
               for (MutableSpan span : trace) {
                   if ("GET /healthcheck".contentEquals(span.getResourceName())) {
                       return Collections.emptyList();
                   }
               }
               return trace;
           }
           @Override
           public int priority() {
               return 200;  // Some unique number
           }
       });
   }
}
```

[1]: /fr/tracing/trace_collection/custom_instrumentation/java/#extending-tracers
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}


[1]: /fr/help/
[2]: /fr/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[3]: /fr/tracing/guide/metrics_namespace/
[4]: /fr/tracing/trace_ingestion/ingestion_controls
[5]: /fr/tracing/configure_data_security/?tab=mongodb#exclude-resources-from-being-collected
[6]: https://golang.org/pkg/regexp/