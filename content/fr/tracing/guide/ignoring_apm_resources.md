---
title: Ignorer les ressources non désirées dans l'APM
kind: documentation
---
Un service peut gérer une multitude de requêtes. Il est possible que vous ne souhaitiez pas tracer certaines d'entre elles ni les inclure dans les métriques de trace. Cela peut par exemple être le cas des checks de santé dans une application Web.

Pour éviter qu'un endpoint spécifique soit tracé et inclus dans les métriques de trace, vous pouvez adopter deux approches différentes :

- Utiliser la [configuration de l'Agent de trace](#options-de-configuration-de-l-agent-datadog) (dans l'Agent Datadog) ; ou
- Utiliser la [configuration du traceur](#options-de-configuration-du-traceur)

<div class="alert alert-warning"><strong>Remarque</strong> : le filtrage des traces à l'aide d'une des options suivantes supprime les requêtes concernées des <a href="/tracing/guide/metrics_namespace/">métriques de trace</a>. Pour découvrir comment réduire l'ingestion sans toucher aux métriques de trace, consultez la section relative aux <a href="/tracing/trace_retention_and_ingestion/#controles-de-l-ingestion">contrôles de l'ingestion</a>.</div>

Si vous avez besoin d'aide, contactez l'[assistance Datadog][1].


## Options de configuration de l'Agent de trace

Le composant « Agent de trace » de l'Agent Datadog peut empêcher de deux façons différentes la transmission de certaines traces : en ignorant des tags de span, ou en ignorant des ressources. Si, avec une de ces configurations, des traces sont ignorées, les métriques de trace excluent les requêtes concernées.

Lorsque vous configurez l'Agent de trace de façon à ce qu'il ignore certaines spans ou ressources, ce comportement s'applique à l'ensemble des services qui envoient des traces à cet Agent Datadog spécifique. Si vous devez répondre à certaines exigences spécifiques pour votre application, utilisez plutôt la méthode reposant sur la [configuration du traceur](#options-de-configuration-du-traceur).

### Ignorer des traces en fonction des tags de span

Depuis la version 6.27.0/7.27.0 de l'Agent Datadog, l'option **filter tags** ignore les traces dont les spans racines correspondent aux tags de span spécifiés. Cette option s'applique à l'ensemble des services qui envoient des traces à cet Agent Datadog spécifique. Les traces qui sont ignorées en raison des tags filtrés sont exclues des métriques de trace.

Si vous pouvez identifier par programmation un ensemble de traces que vous ne souhaitez pas envoyer à Datadog, et qu'aucune suggestion de cette page ne répond à vos besoins, envisagez d'ajouter un [tag de span personnalisé][2] afin de pouvoir ignorer les traces. [Contactez l'assistance][1] afin de présenter votre cas d'utilisation. Nous pourrons ainsi continuer à étendre cette fonctionnalité.

Vous devez indiquer une correspondance de chaîne exacte pour le filtrage des tags. Si vous devez ignorer les expressions régulières pour votre cas d'utilisation, consultez la rubrique [Ignorer des traces en fonction des ressources](ignorer-des-traces-en-fonction-des-ressources).

Vous pouvez spécifier les tags de span qui doivent être acceptés ou refusés à l'aide de variables d'environnement :

`DD_APM_FILTER_TAGS_REQUIRE`
: Recueille uniquement les traces qui possèdent des spans racines correspondant exactement aux valeurs et aux tags de span spécifiés. Si la trace ne respecte pas cette règle, elle est ignorée.

`DD_APM_FILTER_TAGS_REJECT`
: Rejette les traces qui possèdent des spans racines correspondant exactement aux valeurs et aux tags de span spécifiés. Si la trace respecte cette règle, elle est ignorée.

Vous pouvez également définir ces tags de span dans le fichier de configuration de l'Agent :

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  filter_tags:
    require: ["db:sql", "db.instance:mysql"]
    reject: ["outcome:success"]
{{< /code-block >}}

Par exemple, pour ignorer les checks de santé lorsque `http.url` correspond à l'endpoint pertinent :

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  filter_tags:
    reject: ["http.url:http://localhost:5050/healthcheck"]
{{< /code-block >}}

<div class="alert alert-warning"><strong>Remarque</strong> : le filtrage des traces à l'aide de cette méthode supprime les requêtes concernées des <a href="/tracing/guide/metrics_namespace/">métriques de trace</a>. Pour découvrir comment réduire l'ingestion sans toucher aux métriques de trace, consultez la section relative aux <a href="/tracing/trace_retention_and_ingestion/#controles-de-l-lingestion">contrôles de l'ingestion</a>.</div>


### Ignorer des traces en fonction des ressources

L'option **ignore resources** permet d'exclure des ressources lorsque la span racine globale de la trace répond à certains critères. Consultez la section [Empêcher la collecte de certaines ressources][3] pour en savoir plus. Cette option s'applique à l'ensemble des services qui envoient des traces à cet Agent Datadog spécifique. Puisque les ressources ignorées sont exclues des métriques de trace, les traces sont également ignorées.

Vous pouvez indiquer les ressources à ignorer dans le fichier de configuration de l'Agent (`datadog.yaml`) ou avec la variable d'environnement `DD_APM_IGNORE_RESOURCES`. Consultez les exemples ci-dessous :

{{< code-block lang="yaml" filename="datadog.yaml" >}}
## @param ignore_resources - liste de chaînes, facultatif
## Vous pouvez fournir une liste d'expressions régulières afin d'exclure certaines traces en fonction du nom de leur ressource.
## Toutes les valeurs doivent être placées entre guillemets et séparées par des virgules.

  ignore_resources: ["(GET|POST) /healthcheck","API::NotesController#index"]
{{< /code-block >}}

**Remarques** :
- La syntaxe acceptée par l'Agent de trace pour les expressions régulières est évaluée par le [système d'expressions régulières][4] Go.
- Selon votre stratégie de déploiement, vous devrez potentiellement modifier vos expressions régulières en échappant les caractères spéciaux.
- Si vous utilisez des conteneurs dédiés avec Kubernetes, vérifiez que la variable d'environnement permettant d'ignorer des ressources est appliquée au conteneur **trace-agent**.

#### Exemple

Imaginons qu'une trace contient des appels vers `/api/healthcheck` que vous ne souhaitez pas tracer :

{{< img src="tracing/guide/ignoring_apm_resources/ignoreresources.png" alt="Flamegraph d'une ressource que le traceur doit ignorer" style="width:90%;">}}

Notez le nom de ressource de la span racine globale.

- Nom de l'opération : `rack.request`
- Nom de la ressource : `Api::HealthchecksController#index`
- Http.url : `/api/healthcheck`

Pour ignorer correctement des ressources, la règle d'expression régulière spécifiée doit correspondre au nom de la ressource, à savoir `Api::HealthchecksController#index`. Plusieurs expressions régulières peuvent être spécifiées. Toutefois, pour exclure les traces de cette ressource précise, vous pouvez utiliser l'expression `Api::HealthchecksController#index$`.

La syntaxe peut varier en fonction de votre déploiement 

{{< tabs >}}
{{% tab "datadog.yaml" %}}

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  ignore_resources: Api::HealthchecksController#index$
{{< /code-block >}}

{{% /tab %}}
{{% tab "Docker Compose" %}}

Ajoutez `DD_APM_IGNORE_RESOURCES` à la liste des variables d'environnement du conteneur de l'Agent Datadog, en indiquant un pattern similaire à celui de l'exemple ci-dessous. Docker Compose utilise sa propre fonctionnalité de [substitution de variables][1]. Vous devez donc en tenir compte lorsque vous indiquez des caractères spéciaux, comme `$`.

{{< code-block lang="yaml" >}}
    environment:
      // autres variables d'environnement de l'Agent Datadog
      - DD_APM_IGNORE_RESOURCES=Api::HealthchecksController#index$$
{{< /code-block >}}

[1]: https://docs.docker.com/compose/compose-file/compose-file-v3/#variable-substitution
{{% /tab %}}
{{% tab "Docker run" %}}

Ajoutez `DD_APM_IGNORE_RESOURCES` à votre commande docker run permettant de lancer l'Agent Datadog :

{{< code-block lang="bash" >}}
docker run -d --name datadog-agent \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<> \
        -e DD_APM_IGNORE_RESOURCES="Api::HealthchecksController#index$" \
              -e DD_APM_ENABLED=true \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              gcr.io/datadoghq/agent:latest
{{< /code-block >}}

{{% /tab %}}
{{% tab "Daemonset Kubernetes" %}}

Dans le conteneur de trace-agent dédié, ajoutez la variable d'environnement `DD_APM_IGNORE_RESOURCES` :

{{< code-block lang="yaml" >}}
    - name: trace-agent
        image: "gcr.io/datadoghq/agent:latest"
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

{{% /tab %}}
{{% tab "Helm Kubernetes" %}}

Dans la section `traceAgent` du fichier `values.yaml`, ajoutez `DD_APM_IGNORE_RESOURCES` sous la section `env`, puis [lancez Helm comme d'habitude][1].

{{< code-block lang="yaml" filename="values.yaml" >}}
    traceAgent:
      # agents.containers.traceAgent.env -- Variables d'environnement supplémentaires pour le conteneur trace-agent
      env:
        - name: DD_APM_IGNORE_RESOURCES
          value: Api::HealthchecksController#index$

{{< /code-block >}}

Vous avez également la possibilité de définir `agents.containers.traceAgent.env` dans la commande `helm install` :

{{< code-block lang="bash" >}}
helm install dd-agent -f values.yaml \
  --set datadog.apiKeyExistingSecret="datadog-secret" \
  --set datadog.apm.enabled=true \
  --set agents.containers.traceAgent.env[0].name=DD_APM_IGNORE_RESOURCES, \
    agents.containers.traceAgent.env[0].value="Api::HealthchecksController#index$" \
  datadog/datadog
{{< /code-block >}}

[1]: /fr/agent/kubernetes/?tab=helm#installation
{{% /tab %}}
{{% tab "Définition de tâche AWS ECS" %}}

Si vous utilisez AWS ECS (par exemple, EC2), dans votre définition du conteneur de l'Agent Datadog, ajoutez la variable d'environnement `DD_APM_IGNORE_RESOURCES` avec des valeurs permettant au JSON d'évaluer un contenu similaire à ce qui suit :

{{< code-block lang="json" >}}
    "environment": [
    // autres variables d'environnement pour l'Agent Datadog
        {
          "name": "DD_APM_IGNORE_RESOURCES",
          "value": "Api::HealthchecksController#index$"
        }
     ]
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning"><strong>Remarque</strong> : le filtrage des traces à l'aide de cette méthode supprime les requêtes concernées des <a href="/tracing/guide/metrics_namespace/">métriques de trace</a>. Pour découvrir comment réduire l'ingestion sans toucher aux métriques de trace, consultez la section relative aux <a href="/tracing/trace_retention_and_ingestion/#controles-de-l-lingestion">contrôles de l'ingestion</a>.</div>

## Options de configuration du traceur

Pour certains langages, les traceurs permettent de modifier les spans avant leur envoi à l'Agent Datadog. Utilisez cette option si vous devez répondre à certaines exigences spécifiques pour votre application dans l'un des langages répertoriés ci-dessous.

<div class="alert alert-danger"><strong>Attention</strong> : si la requête est associée à une trace distribuée, lorsque vous ignorez une partie de la trace obtenue en raison des règles de filtrage, la trace peut inclure des erreurs d'échantillonnage.</div>


{{< programming-lang-wrapper langs="ruby,python,nodeJS,java" >}}

{{< programming-lang lang="ruby" >}}

Le traceur Ruby possède un pipeline de post-traitement qui supprime toutes les traces répondant à certains critères. Pour en savoir plus et obtenir des exemples, consultez la rubrique [Post-traitement des traces][1].

Par exemple, pour le nom de ressource `Api::HealthchecksController#index`, utilisez la méthode `trace.delete_if` afin de supprimer les traces qui contiennent le nom de ressource. Ce filtre peut également être utilisé pour établir une correspondance avec d'autres métadonnées disponibles pour l'[objet span][2].

```
Datadog::Pipeline.before_flush do |trace|
  trace.delete_if { |span| span.resource =~ /Api::HealthchecksController#index/ }
end
```

[1]: /fr/tracing/setup_overview/custom_instrumentation/ruby/?tab=activespan#post-processing-traces
[2]: /fr/tracing/setup_overview/setup/ruby/#manual-instrumentation-2
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Le traceur Python possède un filtre `FilterRequestsOnUrl`, qui peut être configuré de façon à supprimer les traces provenant de certains endpoints. Vous avez également la possibilité de créer un filtre personnalisé. Consultez la section [Filtrage des traces][1] (en anglais) pour en savoir plus.

Imaginons que le tag de span `http.url` de la span racine soit défini sur `http://<domaine>/healthcheck`. Utilisez l'expression régulière suivante pour faire correspondre tous les endpoints se terminant par `healthcheck` :

```
from ddtrace import tracer
from ddtrace.filters import FilterRequestsOnUrl
tracer.configure(settings={
    'FILTERS': [
        FilterRequestsOnUrl(r'http://.*/healthcheck$'),
    ],
})
```

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.filters.FilterRequestsOnUrl
{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

Configurez une liste d'éléments à exclure sur le plug-in [Http][1]. Consultez la documentation sur l'API pour bien comprendre les éléments inclus dans la liste. Par exemple, Http trouve des correspondances dans les URL. Ainsi, si le tag de span `http.url` de la trace a pour valeur `http://<domaine>/healthcheck`, créez une règle qui s'applique à l'URL `healthcheck` :


```
const tracer = require('dd-trace').init();
tracer.use('http', {
  blocklist: ["/healthcheck"]
})

//import http

```
<div class="alert alert-info"><strong>Remarque</strong> : la configuration du traceur pour l'intégration doit être fournie <em>avant</em> l'importation de ce module instrumenté.</div>

[1]: https://datadoghq.dev/dd-trace-js/interfaces/plugins.connect.html#blocklist
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

Le traceur Java possède une option permettant à un `TraceInterceptor` personnalisé de filtrer certaines spans. Consultez la section [Extensions de traceurs][1] pour en savoir plus.

Par exemple, pour la ressource `GET /healthcheck`, créez un intercepteur de traces qui ignore les traces contenant ce nom de ressource. Modifiez la logique pour répondre aux exigences de votre déploiement.

```
public class GreetingController {
   static {
       // Dans un bloc statique de classe, pour éviter de multiples initialisations
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
               return 200;  // Un nombre unique
           }
       });
   }
}
```

[1]: /fr/tracing/setup_overview/custom_instrumentation/java/#extending-tracers
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

<div class="alert alert-warning"><strong>Remarque</strong> : le filtrage des traces à l'aide de cette méthode supprime les requêtes concernées des <a href="/tracing/guide/metrics_namespace/">métriques de trace</a>. Pour découvrir comment réduire l'ingestion sans toucher aux métriques de trace, consultez la section relative aux <a href="/tracing/trace_retention_and_ingestion/#controles-de-l-lingestion">contrôles de l'ingestion</a>.</div>

[1]: /fr/help/
[2]: /fr/tracing/guide/add_span_md_and_graph_it/
[3]: /fr/tracing/setup_overview/configure_data_security/?tab=mongodb#exclude-resources-from-being-collected
[4]: https://golang.org/pkg/regexp/