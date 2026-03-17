---
aliases:
- /fr/tracing/llm_observability/sdk/python
- /fr/llm_observability/sdk/python
- /fr/llm_observability/setup/sdk/python
- /fr/llm_observability/setup/sdk/nodejs
- /fr/llm_observability/setup/sdk
- /fr/llm_observability/setup/sdk/java
- /fr/llm_observability/sdk/java
- /fr/llm_observability/sdk/
- /fr/llm_observability/instrumentation/custom_instrumentation
- /fr/tracing/llm_observability/trace_an_llm_application
- /fr/llm_observability/setup
further_reading:
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: Blog
  text: Suivez, comparez et optimisez vos invites LLM grâce à Datadog LLM Observability
title: Guide de référence du SDK d'observabilité LLM
---
## Aperçu

Les SDK d'observabilité LLM de Datadog proposent à la fois une instrumentation automatique et des API d'instrumentation manuelle afin d'assurer l'observabilité et de fournir des informations sur vos applications LLM.

## 

### 

- ConfigurationPrérequisUne [clé API Datadog][1].

[1]: https://app.datadoghq.com/organization-settings/api-keys

{{< tabs >}}
{{% tab "Python" %}}
- Le dernier`ddtrace`paquet est installé (Python 3.7 ou version ultérieure requise) :
   ```shell
   pip install ddtrace
   ```
{{% /tab %}}

{{% tab "Node.js" %}}
- La dernière version`dd-trace` du paquet est installée (Node.js 16 ou version ultérieure requise) :
   ```shell
   npm install dd-trace
   ```

{{% /tab %}}

{{% tab "Java" %}}
- Vous avez téléchargé la dernière version [`dd-trace-java` JAR][1]. Le SDK LLM Observability est pris en charge à partir de`dd-trace-java`la version 1.51.0 (Java 8 requis).

[1]: https://github.com/DataDog/dd-trace-java
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="Configuration en ligne de commande" level="h3" expanded=false id="command-line-setup" %}}

{{< tabs >}}
{{% tab "Python" %}}
Activez LLM Observability en exécutant votre application à l'aide de la`ddtrace-run`commande  et en spécifiant les variables d'environnement requises. 

**Remarque **:  active`ddtrace-run` automatiquement toutes les intégrations LLM Observability.

{{< code-block lang="shell">}}
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

#### Variables d'environnement pour la configuration en ligne de commande

`DD_SITE`
: obligatoire  _chaîne de_
<br /> caractères Site Datadog de destination pour l'envoi des données LLM. Votre site est {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: obligatoire  _(entier ou chaîne de caractères_
<br />) ; bascule permettant d'activer l'envoi de données vers LLM Observability. Il faut le régler sur`1`  ou `true`.

`DD_LLMOBS_ML_APP`
: chaîne_
<br /> _facultative. Le nom de votre application, service ou projet LLM, sous lequel toutes les traces et tous les spans sont regroupés. Cela permet de distinguer les différentes applications ou expériences. Consultez les [directives de nommage des applications](#application-naming-guidelines) pour connaître les caractères autorisés et les autres contraintes. Pour remplacer cette valeur pour une section racine donnée, consultez la section[ « Suivi de plusieurs applications ](#tracing-multiple-applications)». Si ce champ n'est pas renseigné, la valeur par défaut est [`DD_SERVICE`][1], ou la valeur transmise`DD_LLMOBS_ML_APP`par un service en amont. 
<br />**Remarque **: avant la version `ddtrace==3.14.0`, ce champ est** obligatoire**.

`DD_LLMOBS_AGENTLESS_ENABLED`
: facultatif  _entier ou chaîne de caractères_  **par défaut **: obligatoire`false`
<br /> uniquement si vous n'utilisez pas l'agent Datadog ; dans ce cas, cette valeur doit être définie sur`1`  ou `true`.

`DD_API_KEY`
: chaîne facultative_
<br />. _Votre clé API Datadog. Ceci n'est requis que si vous n'utilisez pas l'agent Datadog.

[1]: /fr/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}

{{% tab "Node.js" %}}
Activez l'observabilité LLM en exécutant votre application avec`NODE_OPTIONS="--import dd-trace/initialize.mjs"`  et en spécifiant les variables d'environnement requises. 

**Remarque **:  active`dd-trace/initialize.mjs` automatiquement toutes les intégrations APM.

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> NODE_OPTIONS="--import dd-trace/initialize.mjs" node <YOUR_APP_ENTRYPOINT>
```

#### Variables d'environnement pour la configuration en ligne de commande

`DD_SITE`
: obligatoire  _chaîne de_
<br /> caractères Le site Datadog sur lequel envoyer vos données LLM. Votre site est {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: obligatoire  _(entier ou chaîne de caractères_
<br />) ; bascule permettant d'activer l'envoi de données vers LLM Observability. Il faut le régler sur`1`  ou `true`.

`DD_LLMOBS_ML_APP`
: chaîne_
<br /> _facultative. Le nom de votre application, service ou projet LLM, sous lequel toutes les traces et tous les spans sont regroupés. Cela permet de distinguer les différentes applications ou expériences. Consultez les [directives de nommage des applications](#application-naming-guidelines) pour connaître les caractères autorisés et les autres contraintes. Pour remplacer cette valeur pour une section racine donnée, consultez la section[ « Suivi de plusieurs applications ](#tracing-multiple-applications)». Si ce champ n'est pas renseigné, la valeur par défaut est [`DD_SERVICE`][1], ou la valeur transmise`DD_LLMOBS_ML_APP`par un service en amont. 
<br />**Remarque **: avant la version `dd-trace@5.66.0`, ce champ est** obligatoire**.

`DD_LLMOBS_AGENTLESS_ENABLED`
: facultatif  _entier ou chaîne de caractères_  **par défaut **: obligatoire`false`
<br /> uniquement si vous n'utilisez pas l'agent Datadog ; dans ce cas, cette valeur doit être définie sur`1`  ou `true`.

`DD_API_KEY`
: chaîne facultative_
<br />. _Votre clé API Datadog. Ceci n'est requis que si vous n'utilisez pas l'agent Datadog.

[1]: /fr/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}
{{% tab "Java" %}}

Activez l'observabilité LLM en exécutant votre application avec`dd-trace-java`  et en spécifiant les paramètres requis sous forme de variables d'environnement ou de propriétés système.

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> \
java -javaagent:path/to/your/dd-trace-java-jar/dd-java-agent-SNAPSHOT.jar \
-Ddd.service=my-app -Ddd.llmobs.enabled=true -Ddd.llmobs.ml.app=my-ml-app -jar path/to/your/app.jar
```

#### Variables d'environnement et propriétés système

Vous pouvez définir les paramètres suivants sous forme de variables d'environnement (par exemple, `DD_LLMOBS_ENABLED`) ou de propriétés système Java (par exemple, `dd.llmobs_enabled`).

`DD_SITE` ou `dd.site`
: obligatoire  _chaîne de_
<br /> caractères Site Datadog de destination pour l'envoi des données LLM. Votre site est {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED` ou `dd.llmobs.enabled`
: obligatoire  _(entier ou chaîne de caractères_
<br />) ; bascule permettant d'activer l'envoi de données vers LLM Observability. Il faut le régler sur`1`  ou `true`.

`DD_LLMOBS_ML_APP` ou `dd.llmobs.ml.app`
: chaîne_
<br /> _facultative. Le nom de votre application, service ou projet LLM, sous lequel toutes les traces et tous les spans sont regroupés. Cela permet de distinguer les différentes applications ou expériences. Consultez les [directives de nommage des applications](#application-naming-guidelines) pour connaître les caractères autorisés et les autres contraintes. Pour remplacer cette valeur pour une section racine donnée, consultez la section[ « Suivi de plusieurs applications ](#tracing-multiple-applications)». Si ce champ n'est pas renseigné, la valeur par défaut est [`DD_SERVICE`][1], ou la valeur transmise`DD_LLMOBS_ML_APP`par un service en amont. 
<br />**Remarque **: avant la version 1.54.0 de `dd-trace-java`, ce champ est **obligatoire**.

`DD_LLMOBS_AGENTLESS_ENABLED` ou `dd.llmobs.agentless.enabled`
: facultatif  _entier ou chaîne de caractères_  **par défaut **: obligatoire`false`
<br /> uniquement si vous n'utilisez pas l'agent Datadog ; dans ce cas, cette valeur doit être définie sur`1`  ou `true`.

`DD_API_KEY` ou `dd.api.key`
: chaîne facultative_
<br />. _Votre clé API Datadog. Ceci n'est requis que si vous n'utilisez pas l'agent Datadog.

[1]: /fr/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Configuration d'Incode" level="h3" expanded=false id="in-code-setup" %}}

Au lieu d'utiliser la configuration[ en ligne de](#command-line-setup) commande, vous pouvez également activer LLM Observability par programmation.

{{< tabs >}}
{{% tab "Python" %}}

Utilisez la`LLMObs.enable()`fonction pour activer l'observabilité LLM.

<div class="alert alert-info">
N'utilisez pas cette méthode de configuration avec la commande<code> </code>ddtracerun.
</div>

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  api_key="<YOUR_DATADOG_API_KEY>",
  site="<YOUR_DATADOG_SITE>",
  agentless_enabled=True,
)
{{< /code-block >}}

##### Paramètres

`ml_app`
: chaîne_
<br /> _facultative. Le nom de votre application, service ou projet LLM, sous lequel toutes les traces et tous les spans sont regroupés. Cela permet de distinguer les différentes applications ou expériences. Consultez les [directives de nommage des applications](#application-naming-guidelines) pour connaître les caractères autorisés et les autres contraintes. Pour remplacer cette valeur pour une trace donnée, consultez la section[ « Suivi de plusieurs applications ](#tracing-multiple-applications)». Si cette valeur n'est pas fournie, la valeur par `DD_LLMOBS_ML_APP`défaut est .

`integrations_enabled`  **par défaut **: `true`
: _
<br />booléen _facultatif. Un indicateur permettant d'activer le traçage automatique des appels LLM pour les [intégrations LLM][1] prises en charge par Datadog. Si aucune option n'est spécifiée, toutes les intégrations LLM prises en charge sont activées par défaut. Pour ne pas utiliser les intégrations LLM, définissez cette valeur sur `false`.

`agentless_enabled`
: booléen __**facultatif  par défaut **: Obligatoire`false`
<br /> uniquement si vous n'utilisez pas l'agent Datadog ; dans ce cas, cette valeur doit être définie sur `True`. Cela permet de configurer la`ddtrace`bibliothèque de manière à ce qu'elle n'envoie aucune donnée nécessitant l'agent Datadog. Si cette valeur n'est pas fournie, la valeur par `DD_LLMOBS_AGENTLESS_ENABLED`défaut est .

`site`
: chaîne_
<br /> _facultative Le site Datadog sur lequel envoyer vos données LLM. Votre site est {{< region-param key="dd_site" code="true" >}}. Si cette valeur n'est pas fournie, la valeur par `DD_SITE`défaut est .

`api_key`
: chaîne facultative_
<br />. _Votre clé API Datadog. Ceci n'est requis que si vous n'utilisez pas l'agent Datadog. Si cette valeur n'est pas fournie, la valeur par `DD_API_KEY`défaut est .

`env`
: chaîne_
<br /> _facultative. Le nom de l'environnement de votre application (exemples : `prod`, `pre-prod`, `staging`). Si cette valeur n'est pas fournie, la valeur par `DD_ENV`défaut est .

`service`
: chaîne_
<br /> _facultative. Le nom du service utilisé pour votre application. Si cette valeur n'est pas fournie, la valeur par `DD_SERVICE`défaut est .

[1]: /fr/llm_observability/instrumentation/auto_instrumentation/
{{% /tab %}}

{{% tab "Node.js" %}}

<div class="alert alert-info">
N'utilisez pas cette méthode de configuration avec la commande<code> </code>ddtrace/initialize.mjs.
</div>

Utilisez la`init()`fonction pour activer l'observabilité LLM.

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>",
    agentlessEnabled: true,
  },
  site: "<YOUR_DATADOG_SITE>",
  env: "<YOUR_ENV>",
});

const llmobs = tracer.llmobs;
{{< /code-block >}}

**Options de`llmobs`configuration**

`mlApp`
: chaîne_
<br /> _facultative. Le nom de votre application, service ou projet LLM, sous lequel toutes les traces et tous les spans sont regroupés. Cela permet de distinguer les différentes applications ou expériences. Consultez les [directives de nommage des applications](#application-naming-guidelines) pour connaître les caractères autorisés et les autres contraintes. Pour remplacer cette valeur pour une trace donnée, consultez la section[ « Suivi de plusieurs applications ](#tracing-multiple-applications)». Si cette valeur n'est pas fournie, la valeur par `DD_LLMOBS_ML_APP`défaut est .

`agentlessEnabled`
: booléen __**facultatif  par défaut **: Obligatoire`false`
<br /> uniquement si vous n'utilisez pas l'agent Datadog ; dans ce cas, cette valeur doit être définie sur `true`. Cela permet de configurer la`dd-trace`bibliothèque de manière à ce qu'elle n'envoie aucune donnée nécessitant l'agent Datadog. Si cette valeur n'est pas fournie, la valeur par `DD_LLMOBS_AGENTLESS_ENABLED`défaut est .

**Options pour la configuration générale du** traceur :

`site`
: chaîne_
<br /> _facultative Le site Datadog sur lequel envoyer vos données LLM. Votre site est {{< region-param key="dd_site" code="true" >}}. Si cette valeur n'est pas fournie, la valeur par `DD_SITE`défaut est .

`env`
: chaîne_
<br /> _facultative. Le nom de l'environnement de votre application (exemples : `prod`, `pre-prod`, `staging`). Si cette valeur n'est pas fournie, la valeur par `DD_ENV`défaut est .

`service`
: chaîne_
<br /> _facultative. Le nom du service utilisé pour votre application. Si cette valeur n'est pas fournie, la valeur par défaut correspond à celle des variables d'environnement`DD_SERVICE`

##### .

Définissez les valeurs suivantes en tant que variables d'environnement. Ils ne peuvent pas être configurés par programmation.

`DD_API_KEY`
: chaîne facultative_
<br />. _Votre clé API Datadog. Ceci n'est requis que si vous n'utilisez pas l'agent Datadog.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Configuration d'AWS Lambda" level="h3" expanded=false id="aws-lambda-setup" %}}

Pour intégrer LLM Observability à une fonction AWS Lambda existante, vous pouvez utiliser l'extension Datadog et les couches de langage correspondantes. 

1. Ouvrez une session CloudShell dans la console AWS. 
2. Installez le client CLI Datadog
```shell
npm install -g @datadog/datadog-ci
```
3. Configurez la clé API Datadog et le site
```shell
export DD_API_KEY=<YOUR_DATADOG_API_KEY>
export DD_SITE=<YOUR_DATADOG_SITE>
```
Si vous disposez déjà d'un secret dans Secrets Manager ou si vous préférez l'utiliser, vous pouvez configurer la clé API en utilisant l'ARN du secret :
```shell
export DATADOG_API_KEY_SECRET_ARN=<DATADOG_API_KEY_SECRET_ARN>
```
4. Installez votre fonction Lambda avec LLM Observability (cela nécessite au moins la version 77 de la couche d'extension Datadog)
{{< tabs >}}
{{% tab "Python" %}}
```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="python" >}} e {{< latest-lambda-layer-version layer="extension" >}} llmobs <YOUR_LLMOBS_ML_APP>
```
{{% /tab %}}

{{% tab "Node.js" %}}
```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="node" >}} e {{< latest-lambda-layer-version layer="extension" >}} llmobs <YOUR_LLMOBS_ML_APP>
```
{{% /tab %}}

{{% tab "Java" %}}
```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="dd-trace-java" >}} e {{< latest-lambda-layer-version layer="extension" >}} llmobs <YOUR_LLMOBS_ML_APP>
```
{{% /tab %}}
{{< /tabs >}}

4. Lancez votre fonction Lambda et vérifiez que les traces LLM Observability apparaissent bien dans l'interface utilisateur de Datadog.

Videz manuellement les traces d'observabilité LLM à l'aide de la`flush`méthode avant que la fonction Lambda ne renvoie une valeur.

{{< tabs >}}
{{% tab "Python" %}}
```python
from ddtrace.llmobs import LLMObs
def handler():
  # function body
  LLMObs.flush()
```
{{% /tab %}}

{{% tab "Node.js" %}}
```javascript
import tracer from 'dd-trace';
const llmobs = tracer.llmobs;

export const handler = async (event) => {
  // your function body
  llmobs.flush();
};
```
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}


Une fois le SDK installé et votre application lancée, vous devriez voir apparaître des données dans LLM Observability grâce à l'instrumentation automatique. L'instrumentation manuelle permet de capturer des frameworks personnalisés ou des opérations issues de bibliothèques qui ne sont pas encore prises en charge.

## Instrumentation manuelle

{{< tabs >}}
{{% tab "Python" %}}

Pour enregistrer une opération LLM, on peut utiliser un décorateur de fonction afin d'instrumenter facilement les flux de travail :

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def handle_user_request():
    ...
{{< /code-block >}}

ou une approche basée sur un gestionnaire de contexte pour enregistrer les opérations de manière détaillée :

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

with LLMObs.llm(model="gpt-4o"):
    call_llm()
    LLMObs.annotate(
        metrics={
            "input_tokens": ...,
            "output_tokens": ...,
        },
    )
{{< /code-block >}}


Pour obtenir la liste des types de portée disponibles, consultez la [documentation sur les types de portée][1]. Pour un traçage plus détaillé des opérations au sein des fonctions, consultez la section[ « Traçage des segments à l'aide de méthodes ](#tracing-spans-using-inline-methods)intégrées ».

[1]: /fr/llm_observability/terms/
{{% /tab %}}

{{% tab "Node.js" %}}

Pour tracer l'exécution d'une fonction, utilisez`llmobs.wrap(options, function)`  comme wrapper pour la fonction que vous souhaitez tracer. Pour obtenir la liste des types de portée disponibles, consultez la [documentation sur les types de portée][1]. Pour un traçage plus détaillé des opérations au sein des fonctions, consultez la section[ « Traçage des spans à l'aide de méthodes inline](#tracing-spans-using-inline-methods) ». Types

###  de spans

Les types de portée sont obligatoires et sont spécifiés sur `options`l'objet transmis aux fonctions`llmobs`de traçage (`trace`, `wrap`, et `decorate`). Consultez la [documentation sur les types de span][1] pour obtenir la liste des types de span pris en charge. 

**Remarque :** les spans dont le type n'est pas valide ne sont pas transmis à LLM Observability. La capture

###  automatique des arguments, des sorties

`llmobs.wrap` et du nom de la fonction (ainsi que[`llmobs.decorate`](#function-decorators-in-typescript)pour TypeScript) tente de capturer automatiquement les entrées, les sorties et le nom de la fonction faisant l'objet du traçage. Si vous devez annoter manuellement un élément « span », consultez la section[ « Enrichir les éléments span ](#enriching-spans)». Les entrées et sorties que vous annotez remplaceront la saisie automatique. De plus, pour redéfinir le nom de la fonction, transmettez la`name`propriété de l'objet options à la`llmobs.wrap`fonction :

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'differentFunctionName' }, processMessage)
{{< /code-block >}}

### Les conditions de fin de portée pour une fonction 

`llmobs.wrap`encapsulée étendent le comportement de base décrit dans [`tracer.wrap`][2]. Le segment sous-jacent créé lors de l'appel de la fonction prend fin dans les conditions suivantes : 

- si la fonction renvoie une Promise, le segment prend fin lorsque la Promise est résolue ou rejetée ; 
- si la fonction prend un rappel comme dernier paramètre, le segment prend fin lorsque ce rappel est appelé ; 
- si la fonction n'accepte pas de rappel et ne renvoie pas de Promise, le segment prend fin à la fin de l'exécution de la fonction.

L'exemple suivant illustre le deuxième cas, où le dernier argument est une fonction de rappel :

#### Exemple

{{< code-block lang="javascript" >}}
const express = require('express')
const app = express()

function myAgentMiddleware (req, res, next) {
  const err = ... // user application logic
  // the span for this function is finished when `next` is called
  next(err)
}
myAgentMiddleware = llmobs.wrap({ kind: 'agent' }, myAgentMiddleware)

app.use(myAgentMiddleware)

{{< /code-block >}}

Si l'application n'utilise pas la fonction de rappel, il est recommandé d'utiliser à la place un bloc de traçage en ligne. Pour plus d'informations, consultez la section[](#tracing-spans-using-inline-methods) « Suivi des portées à l'aide de méthodes intégrées ».

{{< code-block lang="javascript" >}}
const express = require('express')
const app = express()

function myAgentMiddleware (req, res) {
  // the `next` callback is not being used here
  return llmobs.trace({ kind: 'agent', name: 'myAgentMiddleware' }, () => {
    return res.status(200).send('Hello World!')
  })
}

app.use(myAgentMiddleware)

{{< /code-block >}}

[1]: /fr/llm_observability/terms/
[2]: /fr/tracing/trace_collection/custom_instrumentation/nodejs/dd-api/?tab=wrapper
{{% /tab %}}
{{% tab "Java" %}}

### Début d'une portée

Il existe plusieurs façons de créer un élément « span », selon le type d'élément « span » que vous souhaitez créer. Consultez la [documentation sur les types de span][1] pour obtenir la liste des types de span pris en charge.

Toutes les portées sont initialisées en tant qu'instance d'objet de `LLMObsSpan`. Chaque segment dispose de méthodes qui vous permettent d'interagir avec lui et d'enregistrer des données.

### Clôture d'un segment

Les segments doivent être finalisés pour que la trace puisse être envoyée et s'affiche dans l'application Datadog.

Pour terminer un span, appelez`finish()`  sur une instance d'objet span. Si possible, placez l'élément `span` à l'intérieur d'un`try/finally`élément `block` afin de garantir que l'élément `span` soit bien envoyé même en cas d'exception. 

#### Exemple
```java
    try {
        LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("my-workflow-span-name", "ml-app-override", "session-141");
        // user logic
        // interact with started span
    } finally {
      workflowSpan.finish();
    }
```

[1]: /fr/llm_observability/terms/#span-kinds
{{% /tab %}}
{{< /tabs >}}

### Appels LLM

<div class="alert alert-info">Si vous utilisez des fournisseurs ou des frameworks LLM pris en charge par les intégrations<a href="/llm_observability/instrumentation/auto_instrumentation/"> LLM de </a>Datadog, vous n'avez pas besoin de lancer manuellement un span LLM pour tracer ces opérations.</div>

{{< tabs >}}
{{% tab "Python" %}}
Pour tracer un appel LLM, utilisez le décorateur de fonction`ddtrace.llmobs.decorators.llm()` .

{{% collapse-content title="Arguments" level="h4" expanded=false id="llm-span-arguments" %}}

`model_name`
: chaîne_
<br/> _obligatoire. Le nom du LLM appelé.

`name`
: chaîne_
<br/> _facultative. Le nom de l'opération. Si ce paramètre n'est pas fourni,`name`la valeur par défaut est le nom de la fonction tracée.

`model_provider`
: chaîne _facultative_**  (**par défaut : `"custom"`
<br />le nom du fournisseur de modèles).
<br />**Remarque **: pour afficher le coût estimé en dollars américains, définissez`model_provider`  sur l'une des valeurs suivantes : `openai`, `azure_openai`, ou `anthropic`.

`session_id`
: chaîne_
<br/> _facultative. L'identifiant de la session utilisateur sous-jacente. Pour plus d'informations, ](#tracking-user-sessions)consultez la section[ « Suivi des sessions utilisateur ».

`ml_app`
: chaîne_
<br/> _facultative. Le nom de l'application ML à laquelle appartient l'opération. Pour plus d'informations, consultez la](#tracing-multiple-applications) section[ « Suivi de plusieurs applications ».

{{% /collapse-content %}}

#### Exemple

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM
    return completion
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
Pour tracer un appel LLM, définissez le type de span sur `llm`, et indiquez éventuellement les arguments suivants dans l'objet options.

{{% collapse-content title="Arguments" level="h4" expanded=false id="llm-span-arguments" %}}

`modelName`
: chaîne _facultative_**  (par défaut**) : `"custom"`
<br/>le nom du LLM appelé.

`name`
: chaîne_
<br/> _facultative. Le nom de l'opération. Si ce paramètre n'est pas fourni,`name`la valeur par défaut est le nom de la fonction tracée.

`modelProvider`
: chaîne _facultative_**  (**par défaut : `"custom"`
<br/>le nom du fournisseur de modèles).
<br />**Remarque **: pour afficher le coût estimé en dollars américains, définissez`modelProvider`  sur l'une des valeurs suivantes : `openai`, `azure_openai`, ou `anthropic`.

`sessionId`
: chaîne_
<br/> _facultative. L'identifiant de la session utilisateur sous-jacente. Pour plus d'informations, ](#tracking-user-sessions)consultez la section[ « Suivi des sessions utilisateur ».

`mlApp`
: chaîne_
<br/> _facultative. Le nom de l'application ML à laquelle appartient l'opération. Pour plus d'informations, consultez la](#tracing-multiple-applications) section[ « Suivi de plusieurs applications ».

{{% /collapse-content %}}

#### Exemple

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // user application logic to invoke LLM
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Pour tracer un appel LLM, importez et appelez la méthode suivante en lui passant les arguments indiqués ci-dessous :

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startLLMSpan(spanName, modelName, modelProvider, mlApp, sessionID);
```

{{% collapse-content title="Arguments" level="h4" expanded=false id="llm-span-arguments" %}}

`spanName`
: facultatif  _Chaîne _
<br/>de caractères Le nom de l'opération. Si ce paramètre n'est pas spécifié,`spanName`la valeur par défaut est le type « span ».

`modelName`
: facultatif  _Chaîne_  **par défaut **: `"custom"`
<br/>le nom du LLM appelé.

`modelProvider`
: facultatif  _Chaîne_  **par défaut **: `"custom"`
<br/>nom du fournisseur de modèles.
<br />**Remarque **: pour afficher le coût estimé en dollars américains, définissez`modelProvider`  sur l'une des valeurs suivantes : `openai`, `azure_openai`, ou `anthropic`.

`mlApp`
: facultatif  _Chaîne _
<br/>de caractères Le nom de l'application ML à laquelle appartient l'opération. Si vous indiquez une valeur non nulle, cela remplace le nom de l'application ML fourni au lancement de l'application. Pour plus d'informations, consultez la](#tracing-multiple-applications) section[ « Suivi de plusieurs applications ».

`sessionId`
: facultatif  _Chaîne _
<br/>de caractères L'identifiant de la session utilisateur sous-jacente. Pour plus d'informations, ](#tracking-user-sessions)consultez la section[ « Suivi des sessions utilisateur ».

{{% /collapse-content %}}

#### Exemple

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeModel() {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String inference = ... // user application logic to invoke LLM
    llmSpan.annotateIO(...); // record the input and output
    llmSpan.finish();
    return inference;
  }
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


### Flux de travail

{{< tabs >}}
{{% tab "Python" %}}
Pour suivre le déroulement d'un workflow, utilisez le décorateur de fonction`ddtrace.llmobs.decorators.workflow()` .

{{% collapse-content title="Arguments" level="h4" expanded=false id="workflow-span-arguments" %}}
`name`
: chaîne_
<br/> _facultative. Le nom de l'opération. Si ce paramètre n'est pas fourni,`name`la valeur par défaut est le nom de la fonction tracée.

`session_id`
: chaîne_
<br/> _facultative. L'identifiant de la session utilisateur sous-jacente. Pour plus d'informations, ](#tracking-user-sessions)consultez la section[ « Suivi des sessions utilisateur ».

`ml_app`
: chaîne_
<br/> _facultative. Le nom de l'application ML à laquelle appartient l'opération. Pour plus d'informations, consultez la](#tracing-multiple-applications) section[ « Suivi de plusieurs applications ».

{{% /collapse-content %}}

#### Exemple

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

Pour suivre une période de workflow, indiquez le type de période comme `workflow`, et précisez éventuellement des arguments dans l'objet options.

{{% collapse-content title="Arguments" level="h4" expanded=false id="workflow-span-arguments" %}}

`name`
: chaîne_
<br/> _facultative. Le nom de l'opération. Si ce paramètre n'est pas fourni,`name`la valeur par défaut est le nom de la fonction tracée.

`sessionId`
: chaîne_
<br/> _facultative. L'identifiant de la session utilisateur sous-jacente. Pour plus d'informations, ](#tracking-user-sessions)consultez la section[ « Suivi des sessions utilisateur ».

`mlApp`
: chaîne_
<br/> _facultative. Le nom de l'application ML à laquelle appartient l'opération. Pour plus d'informations, consultez la](#tracing-multiple-applications) section[ « Suivi de plusieurs applications ».

{{% /collapse-content %}}

#### Exemple

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow' }, processMessage)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Pour suivre le déroulement d'un workflow, importez et appelez la méthode suivante en lui passant les arguments indiqués ci-dessous :

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startWorkflowSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Arguments" level="h4" expanded=false id="workflow-span-arguments" %}}

`spanName`
: facultatif  _Chaîne _
<br/>de caractères Le nom de l'opération. Si ce paramètre n'est pas spécifié,`spanName`la valeur par défaut est le type « span ».

`mlApp`
: facultatif  _Chaîne _
<br/>de caractères Le nom de l'application ML à laquelle appartient l'opération. Si vous indiquez une valeur non nulle, cela remplace le nom de l'application ML fourni au lancement de l'application. Pour plus d'informations, consultez la](#tracing-multiple-applications) section[ « Suivi de plusieurs applications ».

`sessionId`
: facultatif  _Chaîne _
<br/>de caractères L'identifiant de la session utilisateur sous-jacente. Pour plus d'informations, ](#tracking-user-sessions)consultez la section[ « Suivi des sessions utilisateur ».

{{% /collapse-content %}}

#### Exemple

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String executeWorkflow() {
    LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("my-workflow-span-name", null, "session-141");
    String workflowResult = workflowFn(); // user application logic
    workflowSpan.annotateIO(...); // record the input and output
    workflowSpan.finish();
    return workflowResult;
  }
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


### Agents

{{< tabs >}}
{{% tab "Python" %}}
Pour suivre l'exécution d'un agent, utilisez le décorateur de fonction`ddtrace.llmobs.decorators.agent()`.

{{% collapse-content title="Arguments" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
: chaîne_
<br/> _facultative. Le nom de l'opération. Si ce paramètre n'est pas fourni,`name`la valeur par défaut est le nom de la fonction tracée.

`session_id`
: chaîne_
<br/> _facultative. L'identifiant de la session utilisateur sous-jacente. Pour plus d'informations, ](#tracking-user-sessions)consultez la section[ « Suivi des sessions utilisateur ».

`ml_app`
: chaîne_
<br/> _facultative. Le nom de l'application ML à laquelle appartient l'opération. Pour plus d'informations, consultez la](#tracing-multiple-applications) section[ « Suivi de plusieurs applications ».
{{% /collapse-content %}}

#### Exemple

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import agent

@agent
def react_agent():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
Pour suivre l'exécution d'un agent, définissez le type de span sur `agent`, et indiquez éventuellement des arguments dans l'objet options.

{{% collapse-content title="Arguments" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
: chaîne_
<br/> _facultative. Le nom de l'opération. Si ce paramètre n'est pas fourni,`name`la valeur par défaut est le nom de la fonction tracée.

`sessionId`
: chaîne_
<br/> _facultative. L'identifiant de la session utilisateur sous-jacente. Pour plus d'informations, ](#tracking-user-sessions)consultez la section[ « Suivi des sessions utilisateur ».

`mlApp`
: chaîne_
<br/> _facultative. Le nom de l'application ML à laquelle appartient l'opération. Pour plus d'informations, consultez la](#tracing-multiple-applications) section[ « Suivi de plusieurs applications ».

{{% /collapse-content %}}

#### Exemple

{{< code-block lang="javascript" >}}
function reactAgent () {
  ... // user application logic
  return
}
reactAgent = llmobs.wrap({ kind: 'agent' }, reactAgent)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Pour suivre l'exécution d'un agent, importez et appelez la méthode suivante en lui passant les arguments indiqués ci-dessous
```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startAgentSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Arguments" level="h4" expanded=false id="agent-span-arguments" %}}

`spanName`
: facultatif  _Chaîne _
<br/>de caractères Le nom de l'opération. Si ce paramètre n'est pas fourni,`spanName`la valeur par défaut est le nom de la fonction tracée.

`mlApp`
: facultatif  _Chaîne _
<br/>de caractères Le nom de l'application ML à laquelle appartient l'opération. Si vous indiquez une valeur non nulle, cela remplace le nom de l'application ML fourni au lancement de l'application. Pour plus d'informations, consultez la](#tracing-multiple-applications) section[ « Suivi de plusieurs applications ».

`sessionId`
: facultatif  _Chaîne _
<br/>de caractères L'identifiant de la session utilisateur sous-jacente. Pour plus d'informations, ](#tracking-user-sessions)consultez la section[ « Suivi des sessions utilisateur ».

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Appels de fonction

{{< tabs >}}
{{% tab "Python" %}}
Pour tracer l'appel d'un outil, utilisez le décorateur de fonction`ddtrace.llmobs.decorators.tool()`.

{{% collapse-content title="Arguments" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
: chaîne_
<br/> _facultative. Le nom de l'opération. Si ce paramètre n'est pas fourni,`name`la valeur par défaut est le nom de la fonction tracée.

`session_id`
: chaîne_
<br/> _facultative. L'identifiant de la session utilisateur sous-jacente. Pour plus d'informations, ](#tracking-user-sessions)consultez la section[ « Suivi des sessions utilisateur ».

`ml_app`
: chaîne_
<br/> _facultative. Le nom de l'application ML à laquelle appartient l'opération. Pour plus d'informations, consultez la](#tracing-multiple-applications) section[ « Suivi de plusieurs applications ».

{{% /collapse-content %}}

#### Exemple

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import tool

@tool
def call_weather_api():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
Pour tracer un appel d'outil, définissez le type de span sur `tool`, et indiquez éventuellement des arguments dans l'objet options.

{{% collapse-content title="Arguments" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
: chaîne_
<br/> _facultative. Le nom de l'opération. Si ce paramètre n'est pas fourni,`name`la valeur par défaut est le nom de la fonction tracée.

`sessionId`
: chaîne_
<br/> _facultative. L'identifiant de la session utilisateur sous-jacente. Pour plus d'informations, ](#tracking-user-sessions)consultez la section[ « Suivi des sessions utilisateur ».

`mlApp`
: chaîne_
<br/> _facultative. Le nom de l'application ML à laquelle appartient l'opération. Pour plus d'informations, consultez la](#tracing-multiple-applications) section[ « Suivi de plusieurs applications ».

{{% /collapse-content %}}

#### Exemple

{{< code-block lang="javascript" >}}
function callWeatherApi () {
  ... // user application logic
  return
}
callWeatherApi = llmobs.wrap({ kind: 'tool' }, callWeatherApi)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Pour suivre l'exécution d'un outil, importez et appelez la méthode suivante en lui passant les arguments indiqués ci-dessous :

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startToolSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Arguments" level="h4" expanded=false id="tool-span-arguments" %}}

`spanName`
: facultatif  _Chaîne _
<br/>de caractères Le nom de l'opération. Si ce paramètre n'est pas fourni,`spanName`la valeur par défaut est le nom de la fonction tracée.

`mlApp`
: facultatif  _Chaîne _
<br/>de caractères Le nom de l'application ML à laquelle appartient l'opération. Si vous indiquez une valeur non nulle, cela remplace le nom de l'application ML fourni au lancement de l'application. Pour plus d'informations, consultez la](#tracing-multiple-applications) section[ « Suivi de plusieurs applications ».

`sessionId`
: facultatif  _Chaîne _
<br/>de caractères L'identifiant de la session utilisateur sous-jacente. Pour plus d'informations, ](#tracking-user-sessions)consultez la section[ « Suivi des sessions utilisateur ».

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Tâches

{{< tabs >}}
{{% tab "Python" %}}
Pour suivre la durée d'exécution d'une tâche, utilisez le décorateur de fonction`LLMObs.task()` .

{{% collapse-content title="Arguments" level="h4" expanded=false id="task-span-arguments" %}}

`name`
: chaîne_
<br/> _facultative. Le nom de l'opération. Si ce paramètre n'est pas fourni,`name`la valeur par défaut est le nom de la fonction tracée.

`session_id`
: chaîne_
<br/> _facultative. L'identifiant de la session utilisateur sous-jacente. Pour plus d'informations, ](#tracking-user-sessions)consultez la section[ « Suivi des sessions utilisateur ».

`ml_app`
: chaîne_
<br/> _facultative. Le nom de l'application ML à laquelle appartient l'opération. Pour plus d'informations, consultez la](#tracing-multiple-applications) section[ « Suivi de plusieurs applications ».

{{% /collapse-content %}}

#### Exemple

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import task

@task
def sanitize_input():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
Pour suivre la durée d'une tâche, indiquez le type de durée comme `task`, et précisez éventuellement des arguments dans l'objet options.

{{% collapse-content title="Arguments" level="h4" expanded=false id="task-span-arguments" %}}

`name`
: chaîne_
<br/> _facultative. Le nom de l'opération. Si ce paramètre n'est pas fourni,`name`la valeur par défaut est le nom de la fonction tracée.

`sessionId`
: chaîne_
<br/> _facultative. L'identifiant de la session utilisateur sous-jacente. Pour plus d'informations, ](#tracking-user-sessions)consultez la section[ « Suivi des sessions utilisateur ».

`mlApp`
: chaîne_
<br/> _facultative. Le nom de l'application ML à laquelle appartient l'opération. Pour plus d'informations, consultez la](#tracing-multiple-applications) section[ « Suivi de plusieurs applications ».

{{% /collapse-content %}}

#### Exemple

{{< code-block lang="javascript" >}}
function sanitizeInput () {
  ... // user application logic
  return
}
sanitizeInput = llmobs.wrap({ kind: 'task' }, sanitizeInput)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Pour suivre la durée d'exécution d'une tâche, importez et appelez la méthode suivante en lui passant les arguments indiqués ci-dessous :

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startTaskSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Arguments" level="h4" expanded=false id="task-span-arguments" %}}

`spanName`
: facultatif  _Chaîne _
<br/>de caractères Le nom de l'opération. Si ce paramètre n'est pas fourni,`spanName`la valeur par défaut est le nom de la fonction tracée.

`mlApp`
: facultatif  _Chaîne _
<br/>de caractères Le nom de l'application ML à laquelle appartient l'opération. Si vous indiquez une valeur non nulle, cela remplace le nom de l'application ML fourni au lancement de l'application. Pour plus d'informations, consultez la](#tracing-multiple-applications) section[ « Suivi de plusieurs applications ».

`sessionId`
: facultatif  _Chaîne _
<br/>de caractères L'identifiant de la session utilisateur sous-jacente. Pour plus d'informations, ](#tracking-user-sessions)consultez la section[ « Suivi des sessions utilisateur ».


{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Représentations

{{< tabs >}}
{{% tab "Python" %}}
Pour tracer une opération d'intégration, utilisez le décorateur de fonction`LLMObs.embedding()`. 

**Remarque **: l'annotation de l'entrée d'un intervalle d'intégration nécessite un formatage différent de celui des autres types d'intervalles. Pour plus d'informations sur la manière de définir les entrées](#enriching-spans) d'intégration, consultez la section[ « Enrichir les segments ».

{{% collapse-content title="Arguments" level="h4" expanded=false id="embedding-span-arguments" %}}

`model_name`
: chaîne_
<br/> _obligatoire. Le nom du LLM appelé.

`name`
: chaîne_
<br/> _facultative. Le nom de l'opération. Si ce paramètre n'est pas fourni,`name`il prend la valeur du nom de la fonction tracée.

`model_provider`
: chaîne _facultative_**  valeur par défaut **: `"custom"`

`session_id`
: chaîne_
<br/> _facultative. L'identifiant de la session utilisateur sous-jacente. Pour plus d'informations, ](#tracking-user-sessions)consultez la section[ « Suivi des sessions utilisateur ».

`ml_app`
: chaîne_
<br/> _facultative. Le nom de l'application ML à laquelle appartient l'opération. Pour plus d'informations, consultez la](#tracing-multiple-applications) section[ « Suivi de plusieurs applications ».

{{% /collapse-content %}}

#### Exemple

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import embedding

@embedding(model_name="text-embedding-3", model_provider="openai")
def perform_embedding():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
Pour tracer une opération d'intégration, définissez le type de segment sur `embedding`, et précisez éventuellement des arguments dans l'objet options. 

**Remarque **: l'annotation de l'entrée d'un segment d'intégration nécessite un formatage différent de celui des autres types de segments. Pour plus d'informations sur la manière de définir les entrées](#enriching-spans) d'intégration, consultez la section[ « Enrichir les segments ».

{{% collapse-content title="Arguments" level="h4" expanded=false id="embedding-span-arguments" %}}

`modelName`
: chaîne _facultative_**  (par défaut**) : `"custom"`
<br/>le nom du LLM appelé.

`name`
: chaîne_
<br/> _facultative. Le nom de l'opération. Si ce paramètre n'est pas fourni,`name`il prend par défaut le nom de la fonction suivie.

`modelProvider`
: chaîne _facultative_**  valeur par défaut **: `"custom"`
<br/>le nom du fournisseur de modèles.

`sessionId`
: chaîne_
<br/> _facultative. L'identifiant de la session utilisateur sous-jacente. Pour plus d'informations, ](#tracking-user-sessions)consultez la section[ « Suivi des sessions utilisateur ».

`mlApp`
: chaîne_
<br/> _facultative. Le nom de l'application ML à laquelle appartient l'opération. Pour plus d'informations, consultez la](#tracing-multiple-applications) section[ « Suivi de plusieurs applications ».

{{% /collapse-content %}}

#### Exemple

{{< code-block lang="javascript" >}}
function performEmbedding () {
  ... // user application logic
  return
}
performEmbedding = llmobs.wrap({ kind: 'embedding', modelName: 'text-embedding-3', modelProvider: 'openai' }, performEmbedding)
{{< /code-block >}}


{{% /tab %}}
{{< /tabs >}}

### Récupérations

{{< tabs >}}
{{% tab "Python" %}}
Pour tracer un segment de recherche, utilisez le décorateur de fonction`ddtrace.llmobs.decorators.retrieval()`. 

**Remarque **: l'annotation de la sortie d'un segment de recherche nécessite un formatage différent de celui des autres types de segments. Pour plus d'informations sur la manière de définir les résultats](#enriching-spans) de recherche, consultez la section[ « Enrichir les segments ».

{{% collapse-content title="Arguments" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
: chaîne_
<br/> _facultative. Le nom de l'opération. Si ce paramètre n'est pas fourni,`name`la valeur par défaut est le nom de la fonction tracée.

`session_id`
: chaîne_
<br/> _facultative. L'identifiant de la session utilisateur sous-jacente. Pour plus d'informations, ](#tracking-user-sessions)consultez la section[ « Suivi des sessions utilisateur ».

`ml_app`
: chaîne_
<br/> _facultative. Le nom de l'application ML à laquelle appartient l'opération. Pour plus d'informations, consultez la](#tracing-multiple-applications) section[ « Suivi de plusieurs applications ».

{{% /collapse-content %}}

#### Exemple

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import retrieval

@retrieval
def get_relevant_docs(question):
    context_documents = ... # user application logic
    LLMObs.annotate(
        input_data=question,
        output_data = [
            {"id": doc.id, "score": doc.score, "text": doc.text, "name": doc.name} for doc in context_documents
        ]
    )
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

Pour tracer un segment de recherche, définissez le type de segment sur `retrieval`, et précisez éventuellement les arguments suivants dans l'objet options. 

**Remarque **: l'annotation de la sortie d'un segment de recherche nécessite un formatage différent de celui des autres types de segments. Pour plus d'informations sur la manière de définir les résultats](#enriching-spans) de recherche, consultez la section[ « Enrichir les segments ».

{{% collapse-content title="Arguments" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
: chaîne_
<br/> _facultative. Le nom de l'opération. Si ce paramètre n'est pas fourni,`name`la valeur par défaut est le nom de la fonction tracée.

`sessionId`
: chaîne_
<br/> _facultative. L'identifiant de la session utilisateur sous-jacente. Pour plus d'informations, ](#tracking-user-sessions)consultez la section[ « Suivi des sessions utilisateur ».

`mlApp`
: chaîne_
<br/> _facultative. Le nom de l'application ML à laquelle appartient l'opération. Pour plus d'informations, consultez la](#tracing-multiple-applications) section[ « Suivi de plusieurs applications ».

{{% /collapse-content %}}

#### Exemple

Vous trouverez ci-dessous un exemple d'annotation d'un élément « span ». Pour plus d'informations, consultez ](#enriching-spans)la section[ « Enrichir les portées ».

{{< code-block lang="javascript" >}}
function getRelevantDocs (question) {
  const contextDocuments = ... // user application logic
  llmobs.annotate({
    inputData: question,
    outputData: contextDocuments.map(doc => ({
      id: doc.id,
      score: doc.score,
      text: doc.text,
      name: doc.name
    }))
  })
  return
}
getRelevantDocs = llmobs.wrap({ kind: 'retrieval' }, getRelevantDocs)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Portées imbriquées

Le fait de commencer un nouveau segment avant que le segment actuel ne soit terminé établit automatiquement une relation parent-enfant entre les deux segments. La section parente désigne l'opération principale, tandis que la section enfant désigne une sous-opération imbriquée plus petite qui s'y trouve.

{{< tabs >}}
{{% tab "Python" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import task, workflow

@workflow
def extract_data(document):
    preprocess_document(document)
    ... # performs data extraction on the document
    return

@task
def preprocess_document(document):
    ... # preprocesses a document for data extraction
    return
{{< /code-block >}}
{{% /tab %}}
{{% tab "Node.js" %}}
{{< code-block lang="javascript" >}}
function preprocessDocument (document) {
  ... // preprocesses a document for data extraction
  return
}
preprocessDocument = llmobs.wrap({ kind: 'task' }, preprocessDocument)

function extractData (document) {
  preprocessDocument(document)
  ... // performs data extraction on the document
  return
}
extractData = llmobs.wrap({ kind: 'workflow' }, extractData)
{{< /code-block >}}
{{% /tab %}}
{{% tab "Java" %}}
{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;
import datadog.trace.api.llmobs.LLMObsSpan;

public class MyJavaClass {
  public void preprocessDocument(String document) {
  LLMObsSpan taskSpan = LLMObs.startTaskSpan("preprocessDocument", null, "session-141");
   ...   // preprocess document for data extraction
   taskSpan.annotateIO(...); // record the input and output
   taskSpan.finish();
  }

  public String extractData(String document) {
    LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("extractData", null, "session-141");
    preprocessDocument(document);
    ... // perform data extraction on the document
    workflowSpan.annotateIO(...); // record the input and output
    workflowSpan.finish();
  }
}

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}


## Allongement des portées

<div class="alert alert-info">
Le paramètre</code> <code>« metrics » fait ici référence aux valeurs numériques associées en tant qu'attributs à des segments individuels — et non aux métriques de<a href="/llm_observability/monitoring/metrics/"> la plateforme</a> Datadog. Pour certaines clés reconnues telles que <code>`input_tokens</code>`, <code>`output_tokens</code>` et <code>`total_tokens</code>`, Datadog utilise ces attributs de span pour générer les métriques de plateforme correspondantes (telles que <code>`ml_obs.span.llm.input.tokens</code>`) destinées à être utilisées dans les tableaux de bord et les moniteurs.
</div>

{{< tabs >}}
{{% tab "Python" %}}
Le SDK fournit la méthode`LLMObs.annotate()`permettant d'enrichir les segments avec des entrées, des sorties et des métadonnées.

La`LLMObs.annotate()`méthode accepte les arguments suivants :

{{% collapse-content title="Arguments" level="h4" expanded=false id="annotating-span-arguments" %}}

`span`
: facultatif  _Span_  **par défaut** : la section 
<br />actuellement active. La section à annoter. Si`span`  n'est pas fourni (comme c'est le cas lors de l'utilisation de décorateurs de fonction), le SDK annote la portée actuellement active.

`input_data`
: facultatif  Type _sérialisable en JSON ou liste de _
<br />dictionnairesSoit un type sérialisable en JSON (pour les segments non-LLM), soit une liste de dictionnaires au format suivant : `{"content": "...", "role": "...", "tool_calls": ..., "tool_results": ...}`, où`"tool_calls"`  est une liste facultative de dictionnaires d'appel d'outils comportant les clés obligatoires : `"name"`, `"arguments"`, et les clés facultatives : `"tool_id"`,`"type"` , et`"tool_results"`  est une liste facultative de dictionnaires de résultats d'outils comportant la clé obligatoire : `"result"`, et les clés facultatives : `"name"`, `"tool_id"`,`"type"`  pour les scénarios d'appel de fonction. **Remarque **: les balises d'intégration constituent un cas particulier et nécessitent une chaîne de caractères ou un dictionnaire (ou une liste de dictionnaires) au format suivant : `{"text": "..."}`.

`output_data`
: facultatif  Type _sérialisable en JSON ou liste de _
<br />dictionnairesSoit un type sérialisable en JSON (pour les segments non-LLM), soit une liste de dictionnaires au format suivant : `{"content": "...", "role": "...", "tool_calls": ...}`, où`"tool_calls"`  est une liste facultative de dictionnaires d'appel d'outils contenant les clés obligatoires : `"name"`, `"arguments"`, et les clés facultatives : `"tool_id"`,`"type"`  pour les scénarios d'appel de fonction. **Remarque **: les plages de recherche constituent un cas particulier et nécessitent une chaîne de caractères ou un dictionnaire (ou une liste de dictionnaires) au format suivant : `{"text": "...", "name": "...", "score": float, "id": "..."}`.

`tool_definitions`
: liste _facultative de dictionnaires _
<br />Liste des dictionnaires de définition d'outils pour les scénarios d'appel de fonctions. Chaque définition d'outil doit comporter une clé `"name": "..."`obligatoire ainsi que des clés `"schema": {...}`facultatives`"description": "..."`  et .

`metadata`
: facultatif  __
<br />dictionaryUn dictionnaire de paires clé-valeur sérialisables au format JSON que les utilisateurs peuvent ajouter en tant que métadonnées pertinentes pour l'opération d'entrée ou de sortie décrite par le span (`model_temperature`, `max_tokens`, `top_k`, etc.).

`metrics`
: facultatif  __
<br />dictionaryUn dictionnaire contenant des clés sérialisables au format JSON et des valeurs numériques que les utilisateurs peuvent ajouter en tant que métriques pertinentes pour l'opération décrite par le span (`input_tokens`, `output_tokens`,`total_tokens` `time_to_first_token`, , etc.). L'unité utilisée`time_to_first_token`est la seconde, à l'instar de la`duration`mesure qui est affichée par défaut.

`tags`
: facultatif  __
<br />dictionaryUn dictionnaire de paires clé-valeur sérialisables au format JSON que les utilisateurs peuvent ajouter en tant que balises sur l'élément span. Exemples de touches : `session`, `env`, `system`, et `version`. Pour plus d'informations sur les balises, consultez la section[ « Premiers pas avec les balises ](/getting_started/tagging/)».

{{% /collapse-content %}}

#### Exemple

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import embedding, llm, retrieval, workflow

@llm(model_name="model_name", model_provider="model_provider")
def llm_call(prompt):
    resp = ... # llm call here
    LLMObs.annotate(
        span=None,
        input_data=[{"role": "user", "content": "Hello world!"}],
        output_data=[{"role": "assistant", "content": "How can I help?"}],
        metadata={"temperature": 0, "max_tokens": 200},
        metrics={"input_tokens": 4, "output_tokens": 6, "total_tokens": 10},
        tags={"host": "host_name"},
    )
    return resp

@workflow
def extract_data(document):
    resp = llm_call(document)
    LLMObs.annotate(
        input_data=document,
        output_data=resp,
        tags={"host": "host_name"},
    )
    return resp

@embedding(model_name="text-embedding-3", model_provider="openai")
def perform_embedding():
    ... # user application logic
    LLMObs.annotate(
        span=None,
        input_data={"text": "Hello world!"},
        output_data=[0.0023064255, -0.009327292, ...],
        metrics={"input_tokens": 4},
        tags={"host": "host_name"},
    )
    return

@retrieval(name="get_relevant_docs")
def similarity_search():
    ... # user application logic
    LLMObs.annotate(
        span=None,
        input_data="Hello world!",
        output_data=[{"text": "Hello world is ...", "name": "Hello, World! program", "id": "document_id", "score": 0.9893}],
        tags={"host": "host_name"},
    )
    return

{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
Le SDK fournit la méthode`llmobs.annotate()`permettant d'annoter des segments avec des entrées, des sorties et des métadonnées.

La`LLMObs.annotate()`méthode accepte les arguments suivants :

{{% collapse-content title="Arguments" level="h4" expanded=false id="annotating-span-arguments" %}}
`span`
: facultatif  _Span_  **par défaut** : la section 
<br />actuellement active. La section à annoter. Si`span`  n'est pas fourni (comme c'est le cas lors de l'utilisation d'enveloppes de fonction), le SDK annote le segment actif actuel.

`annotationOptions`
: obligatoire  _objetUn_
<br /> objet contenant différents types de données permettant d'annoter la séquence.

L'objet`annotationOptions` peut contenir les éléments suivants :

`inputData`
: facultatif  Type _sérialisable en JSON ou liste _
<br />d'objetsSoit un type sérialisable en JSON (pour les segments non-LLM), soit une liste de dictionnaires au format suivant :`{role: "...", content: "..."}`  (pour les segments LLM).  **Remarque **: les balises d'intégration constituent un cas particulier et nécessitent une chaîne de caractères ou un objet (ou une liste d'objets) au format suivant : `{text: "..."}`.

`outputData`
: facultatif  Type _sérialisable en JSON ou liste _
<br />d'objetsSoit un type sérialisable en JSON (pour les segments non-LLM), soit une liste d'objets au format suivant :`{role: "...", content: "..."}`  (pour les segments LLM). **Remarque **: les plages de récupération constituent un cas particulier et nécessitent une chaîne de caractères ou un objet (ou une liste d'objets) au format suivant : `{text: "...", name: "...", score: number, id: "..."}`.

`metadata`
: facultatif  _objetUn_
<br /> objet composé de paires clé-valeur sérialisables au format JSON que les utilisateurs peuvent ajouter en tant que métadonnées pertinentes pour l'opération d'entrée ou de sortie décrite par le span (`model_temperature`, `max_tokens`, `top_k`, etc.).

`metrics`
: facultatif  __
<br />objetObjet composé de clés sérialisables au format JSON et de valeurs numériques que les utilisateurs peuvent ajouter en tant que métriques pertinentes pour l'opération décrite par le span (`input_tokens`, `output_tokens`, `total_tokens`, etc.).

`tags`
: facultatif  _objetUn_
<br /> objet composé de paires clé-valeur sérialisables au format JSON que les utilisateurs peuvent ajouter en tant que balises relatives au contexte de l'élément span (`session`, `environment`, `system`,`versioning` , etc.). Pour plus d'informations sur les balises, consultez la section[ « Premiers pas avec les balises ](/getting_started/tagging/)».

{{% /collapse-content %}}

#### Exemple

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const completion = ... // user application logic to invoke LLM
  llmobs.annotate({
    inputData: [{ role: "user", content: "Hello world!" }],
    outputData: [{ role: "assistant", content: "How can I help?" }],
    metadata: { temperature: 0, max_tokens: 200 },
    metrics: { input_tokens: 4, output_tokens: 6, total_tokens: 10 },
    tags: { host: "host_name" }
  })
  return completion
}
llmCall = llmobs.wrap({ kind:'llm', modelName: 'modelName', modelProvider: 'modelProvider' }, llmCall)

function extractData (document) {
  const resp = llmCall(document)
  llmobs.annotate({
    inputData: document,
    outputData: resp,
    tags: { host: "host_name" }
  })
  return resp
}
extractData = llmobs.wrap({ kind: 'workflow' }, extractData)

function performEmbedding () {
  ... // user application logic
  llmobs.annotate(
    undefined, { // this can be set to undefined or left out entirely
      inputData: { text: "Hello world!" },
      outputData: [0.0023064255, -0.009327292, ...],
      metrics: { input_tokens: 4 },
      tags: { host: "host_name" }
    }
  )
}
performEmbedding = llmobs.wrap({ kind: 'embedding', modelName: 'text-embedding-3', modelProvider: 'openai' }, performEmbedding)

function similaritySearch () {
  ... // user application logic
  llmobs.annotate(undefined, {
    inputData: "Hello world!",
    outputData: [{ text: "Hello world is ...", name: "Hello, World! program", id: "document_id", score: 0.9893 }],
    tags: { host: "host_name" }
  })
  return
}
similaritySearch = llmobs.wrap({ kind: 'retrieval', name: 'getRelevantDocs' }, similaritySearch)

{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Le SDK propose plusieurs méthodes pour annoter des segments avec des entrées, des sorties, des métriques et des métadonnées.

### Annotation des entrées et des sorties

Utilisez la `annotateIO()`méthode  de `LLMObsSpan`l'interface  pour ajouter des données d'entrée et de sortie structurées à un `LLMObsSpan`. Cela inclut les arguments facultatifs et les objets de message LLM.

#### Arguments

Si un argument est nul ou vide, rien ne se passe. Par exemple, si`inputData`  est une chaîne non vide alors que`outputData`  est nul, seul`inputData`  est enregistré.

`inputData`
: facultatif  _Chaîne_ ou _liste<LLMObs.LLMMessage>_
<br />Soit une chaîne de caractères (pour les segments non-LLM), soit une liste de `LLMObs.LLMMessage`chaînes de caractères pour les segments LLM.

`outputData`
: facultatif  _Chaîne_ ou _liste<LLMObs.LLMMessage>_
<br />Soit une chaîne de caractères (pour les segments non-LLM), soit une liste de `LLMObs.LLMMessage`chaînes de caractères pour les segments LLM. Messages

####  LLM
Les intervalles LLM doivent être annotés avec des messages LLM à l'aide de`LLMObs.LLMMessage`l'objet .

L'objet`LLMObs.LLMMessage` peut être instancié en appelant la fonction`LLMObs.LLMMessage.from()`avec les arguments suivants :

`role`
: obligatoire  _Chaîne de_
<br /> caractèresUne chaîne décrivant le rôle de l'auteur du message.

`content`
: obligatoire  _StringUne_
<br /> chaîne contenant le contenu du message.

#### Exemple

```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String systemMessage = "You are a helpful assistant";
    Response chatResponse = ... // user application logic to invoke LLM
    llmSpan.annotateIO(
      Arrays.asList(
        LLMObs.LLMMessage.from("user", userInput),
        LLMObs.LLMMessage.from("system", systemMessage)
      ),
      Arrays.asList(
        LLMObs.LLMMessage.from(chatResponse.role, chatResponse.content)
      )
    );
    llmSpan.finish();
    return chatResponse;
  }
}
```

### Ajout de 

#### métriquesAjout groupé de métriques La`setMetrics()`méthode  de `LLMObsSpan`l'interface  accepte les arguments suivants pour associer plusieurs métriques en une seule opération :

##### Arguments

`metrics` : obligatoire  _Map&lt;string, number>
_
<br /> Tableau des clés JSONserializable et des valeurs numériques que les utilisateurs peuvent ajouter pour enregistrer des métriques relatives à l'opération décrite par le span (par exemple, `input_tokens`, `output_tokens`, ou `total_tokens`).

#### Ajouter une seule métrique La`setMetric()`méthode  de `LLMObsSpan`l'interface  accepte les arguments suivants pour associer une seule métrique :

##### Arguments

`key` : obligatoire  _CharSequence_
<br /> Le nom de la métrique.

`value` : obligatoire  _int_, _long ou _double_
<br /> La valeur_ de la métrique.

#### Exemples ```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = ... // user application logic to invoke LLM
    llmSpan.setMetrics(Map.of(
      "input_tokens", 617,
      "output_tokens", 338,
      "time_per_output_token", 0.1773
    ));
    llmSpan.setMetric("total_tokens", 955);
    llmSpan.setMetric("time_to_first_token", 0.23);
    llmSpan.finish();
    return chatResponse;
  }
}
```

### Ajouter des balises Pour plus d'informations sur les balises, consultez [Premiers pas avec les balises][1].Ajouter 

#### des balises en masse La`setTags()`méthode  de `LLMObsSpan`l'interface  accepte les arguments suivants pour ajouter plusieurs balises en une seule fois :

##### Arguments

`tags` : obligatoire  _Map&lt;string, object>
_
<br /> Une liste de paires clé-valeur sérialisables au format JSON que les utilisateurs peuvent ajouter sous forme de balises pour décrire le contexte de la balise span (par exemple, `session`, `environment`, `system`, ou `version`).

#### Ajouter une seule balise La`setTag()`méthode  de `LLMObsSpan`l'interface  accepte les arguments suivants pour ajouter une seule balise :

##### Arguments

`key` : obligatoire  _String_
<br /> La clé de la balise.

`value` : obligatoire  _int_, _long_, _double_, _boolean _ou _String_
<br /> La valeur de la balise.

#### Exemples ```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = ... // user application logic to invoke LLM
    llmSpan.setTags(Map.of(
      "chat_source", "web",
      "users_in_chat", 3
    ));
    llmSpan.setTag("is_premium_user", true);
    llmSpan.finish();
    return chatResponse;
  }
}
```

### Annotation des 

#### erreurs : ajout d'un Throwable (recommandé)

La méthode`addThrowable()` de membre de`LLMObsSpan`l'interface accepte l'argument suivant pour associer un objet de type Throwable à une trace de pile : 

##### Arguments

`throwable`
: obligatoire  _Throwable_
<br /> L'exception qui s'est produite.

#### Ajout d'un message d'erreur

La méthode`setErrorMessage()` de membre de`LLMObsSpan`l'interface accepte l'argument suivant pour associer une chaîne d'erreur : 

##### Arguments

`errorMessage`
: obligatoire  _Chaîne de caractères_
<br /> Le message d'erreur. 

#### Définition d'un indicateur d'erreur

La méthode`setError()` de membre de`LLMObsSpan`l'interface accepte l'argument suivant pour signaler une erreur lors de l'opération : 

##### Arguments

`error`
: obligatoire  _booléen`true`_
<br />  si la balise span a généré une erreur.

#### Exemples

```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = "N/A";
    try {
      chatResponse = ... // user application logic to invoke LLM
    } catch (Exception e) {
      llmSpan.addThrowable(e);
      throw new RuntimeException(e);
    } finally {
      llmSpan.finish();
    }
    return chatResponse;
  }
}
```

### Annotation des métadonnées La méthode`setMetadata()` membre de `LLMObsSpan`l'interface accepte les arguments suivants :

`metadata` : obligatoire  _Map&lt;string, object>
_
<br />Une carte de paires clé-valeur sérialisables en JSON contenant des métadonnées relatives à l'opération d'entrée ou de sortie décrite par le span.

#### Exemple ```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    llmSpan.setMetadata(
      Map.of(
        "temperature", 0.5,
        "is_premium_member", true,
        "class", "e1"
      )
    );
    String chatResponse = ... // user application logic to invoke LLM
    return chatResponse;
  }
}
```

[1]: /fr/getting_started/tagging/
{{% /tab %}}
{{< /tabs >}}

### Annotation des segments auto-instrumentés

{{< tabs >}}
{{% tab "Python" %}}

La méthode`LLMObs.annotation_context()` du SDK renvoie un gestionnaire de contexte qui permet de modifier tous les segments d'instrumentation automatique lancés pendant que le contexte d'annotation est actif.

La`LLMObs.annotation_context()`méthode accepte les arguments suivants :

{{% collapse-content title="Arguments" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
: strName_
<br /> (_facultatif) qui remplace le nom de la séquence pour toutes les séquences instrumentées automatiquement qui sont lancées dans le contexte de l'annotation.

`prompt`
: facultatif  __
<br />dictionaryUn dictionnaire représentant la prompt utilisée pour un appel LLM. Consultez la documentation ](#prompt-tracking-arguments)relative[ à l'objet Prompt pour connaître le schéma complet et les clés prises en charge. Vous pouvez également importer `Prompt`l'objet depuis`ddtrace.llmobs.utils`  et le passer en tant `prompt`qu'argument. **Remarque **: cet argument ne s'applique qu'aux segments LLM.

`tags`
: facultatif  __
<br />dictionaryUn dictionnaire de paires clé-valeur sérialisables au format JSON que les utilisateurs peuvent ajouter en tant que balises sur l'élément span. Exemples de touches : `session`, `env`, `system`, et `version`. Pour plus d'informations sur les balises, consultez la section[ « Premiers pas avec les balises ](/getting_started/tagging/)».

{{% /collapse-content %}}

#### Exemple

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import workflow

@workflow
def rag_workflow(user_question):
    context_str = retrieve_documents(user_question).join(" ")

    with LLMObs.annotation_context(
        prompt = Prompt(
            id="chatbot_prompt",
            version="1.0.0",
            template="Please answer the question using the provided context: {{question}}\n\nContext:\n{{context}}",
            variables={
                "question": user_question,
                "context": context_str,
            }
        ),
        tags = {
            "retrieval_strategy": "semantic_similarity"
        },
        name = "augmented_generation"
    ):
        completion = openai_client.chat.completions.create(...)
    return completion.choices[0].message.content

{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

Le SDK`llmobs.annotationContext()`accepte une fonction de rappel qui permet de modifier tous les segments instrumentés automatiquement lancés pendant que l'on se trouve dans le champ d'application de cette fonction.

La`llmobs.annotationContext()`méthode accepte les options suivantes pour le premier argument :

{{% collapse-content title="Options" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
: strName_
<br /> (_facultatif) qui remplace le nom de la séquence pour toutes les séquences instrumentées automatiquement qui sont lancées dans le contexte de l'annotation.

`tags`
: facultatif  _objetUn_
<br /> objet composé de paires clé-valeur sérialisables au format JSON que les utilisateurs peuvent ajouter en tant que balises sur l'élément span. Exemples de touches : `session`, `env`, `system`, et `version`. Pour plus d'informations sur les balises, consultez la section[ « Premiers pas avec les balises ](/getting_started/tagging/)».

{{% /collapse-content %}}

#### Exemple

{{< code-block lang="javascript" >}}
const { llmobs } = require('dd-trace');

function ragWorkflow(userQuestion) {
    const contextStr = retrieveDocuments(userQuestion).join(" ");

    const completion = await llmobs.annotationContext({
      tags: {
        retrieval_strategy: "semantic_similarity"
      },
      name: "augmented_generation"
    }, async () => {
      const completion = await openai_client.chat.completions.create(...);
      return completion.choices[0].message.content;
    });
}

{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Suivi rapide

Ajoutez des métadonnées structurées relatives aux invites à la séquence du LLM afin de pouvoir reproduire les résultats, contrôler les modifications et comparer les performances des invites entre les différentes versions. Lors de l'utilisation de modèles, LLM Observability permet également [de suivre les versions](#version-tracking) en fonction des modifications apportées au contenu des modèles.

{{< tabs >}}
{{% tab "Python" %}}
Utilisez`LLMObs.annotation_context(prompt=...)`  pour ajouter des métadonnées de prompt avant l'appel du LLM. Pour plus d'informations sur l'annotation des segments, consultez la section[ « Enrichissement des segments ](#enriching-spans)». 

#### Arguments

{{% collapse-content title="Arguments" level="h4" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: obligatoire  
<br />dictionaryUn dictionnaire typé qui respecte le schéma Prompt ci-dessous.

{{% /collapse-content %}}

{{% collapse-content title="Structure de l'invite" level="h4" expanded=false id="prompt-structure" %}}

Touches prises en charge :

- `id` (str) : identifiant logique de cette invite. Doit être unique par `ml_app`. Valeur par défaut`{ml_app}-unnamed_prompt`
- `version`: (chaîne) : balise de version pour l'invite (par exemple, « 1.0.0 »). Pour plus d'informations,](#version-tracking) consultez [l'historique des versions.
- `variables` (Dict[str, str]) : Variables utilisées pour remplir les espaces réservés du modèle.
- `template` (str) : Chaîne de modèle contenant des espaces réservés (par exemple, `"Traduire {{text}} vers {{lang}}"`).
- `chat_template` (List[Message]) : Modèle de formulaire pour messages multiples. Fournissez une liste `{ "role": "<role>", "content": "<template string with placeholders>" }`d'objets.
- `tags` (Dict[str, str]) : balises à associer à l'exécution de la prompt.
- `rag_context_variables` (List[str]) : clés de variables contenant le contenu de référence ou de contexte. Utilisé pour détecter[ les ](/llm_observability/evaluations/managed_evaluations/?tab=openai#hallucination)hallucinations.
- `rag_query_variables` (List[str]) : clés variables contenant la requête de l'utilisateur. Utilisé pour détecter[ les ](/llm_observability/evaluations/managed_evaluations/?tab=openai#hallucination)hallucinations.

{{% /collapse-content %}}

#### Exemple : invite de singletemplate

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def answer_question(text):
    # Attach prompt metadata to the upcoming LLM span using LLMObs.annotation_context()
    with LLMObs.annotation_context(prompt={
        "id": "translation-template",
        "version": "1.0.0",
        "chat_template": [{"role": "user", "content": "Translate to {{lang}}: {{text}}"}],
        "variables": {"lang": "fr", "text": text},
        "tags": {"team": "nlp"}
    }):
        # Example provider call (replace with your client)
        completion = openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": f"Translate to fr: {text}"}]
        )
    return completion
{{< /code-block >}}

#### Exemple : modèles de prompt LangChain

Lorsque vous utilisez les modèles de prompt de LangChain avec l'auto-instrumentation, attribuez les modèles à des variables portant des noms significatifs. L'auto-instrumentation utilise ces noms pour identifier les invites.

{{< code-block lang="python" >}}
# "translation_template" will be used to identify the template in Datadog
translation_template = PromptTemplate.from_template("Translate {text} to {language}")
chain = translation_template | llm
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

Utilisez`llmobs.annotationContext({ prompt: ... }, () => { ... })`  pour ajouter des métadonnées de prompt avant l'appel du LLM. Pour plus d'informations sur l'annotation des segments, consultez la section[ « Enrichissement des segments ](#enriching-spans)». 

#### Arguments

{{% collapse-content title="Options" level="h4" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: obligatoire  objetUn
<br /> objet conforme au schéma Prompt ci-dessous.

{{% /collapse-content %}}

{{% collapse-content title="Structure de l'invite" level="h4" expanded=false id="prompt-structure" %}}

Propriétés prises en charge :

- `id` (chaîne de caractères) : identifiant logique de cette invite. Doit être unique par `ml_app`. Valeur par défaut`{ml_app}-unnamed_prompt`
- `version`: (chaîne de caractères) : balise de version pour l'invite (par exemple, « 1.0.0 »). Pour plus d'informations,](#version-tracking) consultez [l'historique des versions.
- `variables` (Record&lt;chaîne, chaîne>
): Variables utilisées pour remplir les espaces réservés du modèle.
- `template` (chaîne | Liste[Message]) : chaîne de modèle contenant des espaces réservés (par exemple, `"Traduire {{text}} vers Objets de type `{{lang}}"`). Alternatively, a list of `{ "role": "<role>", "content": "<template string with placeholders>" }`.
- `tags` (Record&lt;string, string>
): Balises à associer à l'exécution de la prompt.
- `contextVariables` (string[]) : Clés de variables contenant le contenu de référence ou de contexte. Utilisé pour la détection[ des ](/llm_observability/evaluations/managed_evaluations/?tab=openai#hallucination)hallucinations.
- `queryVariables` (chaîne[]) : clés variables contenant la requête de l'utilisateur. Utilisé pour détecter[ les ](/llm_observability/evaluations/managed_evaluations/?tab=openai#hallucination)hallucinations.

{{% /collapse-content %}}

#### Exemple : invite de singletemplate

{{< code-block lang="javascript" >}}
const { llmobs } = require('dd-trace');

function answerQuestion(text) {
    // Attach prompt metadata to the upcoming LLM span using LLMObs.annotation_context()
    return llmobs.annotationContext({
      prompt: {
        id: "translation-template",
        version: "1.0.0",
        chat_template: [{"role": "user", "content": "Translate to {{lang}}: {{text}}"}],
        variables: {"lang": "fr", "text": text},
        tags: {"team": "nlp"}
      }
    }, () => {
      // Example provider call (replace with your client)
      return openaiClient.chat.completions.create({
          model: "gpt-4o",
          messages: [{"role": "user", "content": f"Translate to fr: {text}"}]
        });
    });
}
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

#### Remarques : 
- l'annotation d'une invite n'est disponible que sur les segments LLM. 
- Placez l'annotation immédiatement avant l'appel au fournisseur afin qu'elle s'applique au bon segment LLM. 
- Utilisez une invite unique`id` pour distinguer les différentes invites au sein de votre application. Veillez
-  à ce que les modèles restent statiques en utilisant la syntaxe des espaces réservés (comme `Section « variables » de {{`) and define dynamic content in the `variable_name}}. 
- Pour plusieurs appels LLM auto-instrumentés au sein d'un bloc, utilisez un contexte d'annotation afin d'appliquer les mêmes métadonnées de prompt à tous les appels. Voir «[ Annotation des segments ](#annotating-auto-instrumented-spans)auto-instrumentés ». Suivi

###  des versions

LLM Observability gère automatiquement les versions de vos invites lorsqu'aucune version n'est explicitement spécifiée. Lorsque vous indiquez un`template`  ou un`chat_template`  dans les métadonnées de votre invite sans balise`version` , le système génère automatiquement une version en calculant un hachage du contenu du modèle. Si vous fournissez une`version`balise, LLM Observability utilise l'étiquette de version que vous avez spécifiée au lieu d'en générer une automatiquement.

Le système de gestion des versions fonctionne comme suit : 
- **Gestion automatique des** versions : lorsqu'aucune`version`balise n'est fournie, LLM Observability calcule un hachage du contenu`template`de`chat_template`la balise ou de la balise pour générer automatiquement un identifiant de version numérique. 
- **Gestion **manuelle des versions : lorsqu'une`version`balise est fournie, LLM Observability utilise exactement l'étiquette de version que vous avez spécifiée
- **. Historique des versions** : les versions générées automatiquement et celles créées manuellement sont toutes conservées dans l'historique des versions afin de suivre l'évolution des invites au fil du temps.

Cela vous offre la possibilité soit de vous fier à la gestion automatique des versions en fonction des modifications apportées au contenu des modèles, soit de garder un contrôle total sur la gestion des versions grâce à vos propres étiquettes de version.Suivi

##  des coûts
Associez des métriques de jetons (pour le suivi automatique des coûts) ou des métriques de coûts (pour le suivi manuel des coûts) à vos segments de LLM/d'embedding. Les métriques de jetons permettent à Datadog de calculer les coûts en fonction des tarifs des fournisseurs, tandis que les métriques de coûts vous permettent de définir vos propres tarifs lorsque vous utilisez des modèles personnalisés ou non pris en charge. Pour plus d'informations, consultez la rubrique [Coûts][14].

Si vous utilisez l'instrumentation automatique, les métriques relatives aux jetons et aux coûts s'affichent automatiquement dans vos spans. Si vous effectuez l'instrumentation manuellement, suivez les instructions ci-dessous.

<div class="alert alert-info">Dans ce contexte, les « métriques de jeton » et les « métriques de coût » désignent des paires clé-valeur numériques que vous associez à des segments via le <code>paramètre</code> metrics de la méthode <code></code>LLMObs.annotate(). Ces indicateurs sont distincts des indicateurs d'observabilité<a href="/llm_observability/monitoring/metrics/"> du LLM de</a> la plateforme Datadog. Pour les clés reconnues telles que <code>`input_tokens</code>`, <code>`output_tokens</code>`, <code>`input_cost</code>` et <code>`output_cost</code>`, Datadog utilise ces attributs de span pour générer les métriques de plateforme correspondantes (telles que <code>`ml_obs.span.llm.input.cost</code>`) destinées à être utilisées dans les tableaux de bord et les moniteurs.</div>

{{< tabs >}}
{{% tab "Python" %}}

#### Cas d'utilisation : utilisation d'un fournisseur de modèles commun
Datadog prend en charge les fournisseurs de modèles courants tels qu'OpenAI, Azure OpenAI, Anthropic et Google Gemini. Lorsque vous utilisez ces fournisseurs, il vous suffit d'ajouter à votre requête LLM les balises `model_name`, `model_provider`, et l'utilisation du jeton. Datadog calcule automatiquement le coût estimé en fonction des tarifs du fournisseur.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="gpt-5.1", model_provider="openai")
def llm_call(prompt):
    resp = ... # llm call here
    # Annotate token metrics
    LLMObs.annotate(
        metrics={
          "input_tokens": 50,
          "output_tokens": 120,
          "total_tokens": 170,
          "non_cached_input_tokens": 13,  # optional
          "cache_read_input_tokens": 22,  # optional
          "cache_write_input_tokens": 15, # optional
        },
    )
    return resp
{{< /code-block >}}

#### Cas d'utilisation : utilisation d'un modèle personnalisé
Pour les modèles personnalisés ou non pris en charge, vous devez attribuer manuellement les données de coût à chaque élément.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="custom_model", model_provider="model_provider")
def llm_call(prompt):
    resp = ... # llm call here
    # Annotate cost metrics
    LLMObs.annotate(
        metrics={
          "input_cost": 3,
          "output_cost": 7,
          "total_cost": 10,
          "non_cached_input_cost": 1,    # optional
          "cache_read_input_cost": 0.6,  # optional
          "cache_write_input_cost": 1.4, # optional
        },
    )
    return resp
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


## Évaluations

Le SDK LLM Observability propose des méthodes pour exporter et envoyer vos évaluations vers Datadog.

<div class="alert alert-info">Pour créer des évaluateurs réutilisables basés sur des classes (<code>BaseEvaluator</code>, <code>BaseSummaryEvaluator</code>) avec des métadonnées de résultats détaillées, consultez le Guide du <a href="/llm_observability/guide/evaluation_developer_guide/">développeur sur</a> l'évaluation.</div>

Les évaluations doivent être rattachées à une seule période. Vous pouvez identifier le segment cible à l'aide de l'une de ces deux méthodes : Jointure basée
- _ sur les _balises  Effectuez une jointure d'évaluation à l'aide d'une paire clé-valeur unique définie sur un seul segment. L'évaluation échouera si la paire clé-valeur de la balise correspond à plusieurs segments ou à aucun segment. 
- _Référence directe à un_ segment  Joindre une évaluation à l'aide de la combinaison unique de l'ID de trace et de l'ID de segment. 

### Exportation d'un segment
{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.export_span()` peut être utilisé pour extraire le contexte d'un élément span. Cette méthode permet d'associer votre évaluation à la période correspondante. 

#### Arguments
La`LLMObs.export_span()`méthode accepte l'argument suivant :

`span`
: facultatif  _Span_
<br /> : la balise à partir de laquelle extraire le contexte de la balise (identifiants de balise et de trace). Si cette valeur n'est pas fournie (comme c'est le cas lors de l'utilisation de décorateurs de fonction), le SDK exporte la portée actuellement active.

#### Exemple

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM
    span_context = LLMObs.export_span(span=None)
    return completion
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
`llmobs.exportSpan()` peut être utilisé pour extraire le contexte d'un élément span. Vous devrez utiliser cette méthode pour associer votre évaluation à la balise span correspondante. 

#### Arguments

La`llmobs.exportSpan()`méthode accepte l'argument suivant :

`span`
: facultatif  _Span_
<br /> : la balise à partir de laquelle extraire le contexte de la balise (identifiants de balise et de trace). Si cette valeur n'est pas fournie (comme lors de l'utilisation d'enveloppes de fonction), le SDK exporte la portée actuellement active.

#### Exemple

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // user application logic to invoke LLM
  const spanContext = llmobs.exportSpan()
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Soumettre des évaluations

{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.submit_evaluation()` peut être utilisé pour soumettre votre évaluation personnalisée relative à un intervalle donné.

<div class="alert alert-info"><code>La fonction LLMObs.submit_evaluation_for</code> est obsolète et sera supprimée dans la prochaine version majeure de ddtrace (4.0). Pour effectuer la migration, remplacez vos appels<code> LLMObs.</code>submit_evaluation_for par <code>LLMObs.submit_evaluation</code>.</div>

**Remarque **: les évaluations personnalisées sont des évaluateurs que vous implémentez et hébergez vous-même. Ces évaluations diffèrent des évaluations prêtes à l'emploi, qui sont calculées automatiquement par Datadog à l'aide d'évaluateurs intégrés. Pour configurer les évaluations prêtes à l'emploi pour votre application, accédez à la page [**LLM Observability** > **Paramètres** > **Évaluations**][1] dans Datadog.

La`LLMObs.submit_evaluation()`méthode accepte les arguments suivants :

{{% collapse-content title="Arguments" level="h4" expanded=false id="submit-evals-arguments" %}}
`label`
: chaîne_
<br /> _obligatoire. Le nom de l'évaluation.

`metric_type`
: chaîne __
<br />obligatoire. Le type de l'évaluation. Doit être `categorical`, `score`,`boolean`  ou `json`.

`value`
: chaîne de caractères, type numérique_ ou dictionnaire_
<br /> obligatoire. La valeur du résultat de l'évaluation. Doit être une chaîne de caractères (`metric_type==categorical`), un entier/nombre à virgule flottante (`metric_type==score`), un booléen (`metric_type==boolean`) ou un dictionnaire (`metric_type==json`).

`span`
: facultatif  __
<br />dictionaryUn dictionnaire qui identifie de manière unique la balise « span » associée à cette évaluation. Doit contenir`span_id`  (chaîne) et`trace_id`  (chaîne). Utilisez[`LLMObs.export_span()`](#exporting-a-span)  pour générer ce dictionnaire.

`span_with_tag_value`
: facultatif  __
<br />dictionaryUn dictionnaire qui identifie de manière unique la balise « span » associée à cette évaluation. Doit contenir`tag_key`  (chaîne) et`tag_value`  (chaîne).

   **Remarque **: il faut indiquer exactement l'un`span_with_tag_value` des deux`span`, soit  soit . Si l'on fournit les deux, ou aucun des deux, une erreur « ValueError » est générée.

`ml_app`
: obligatoire  _chaîne de_
<br /> caractères Le nom de l'application ML.

`timestamp_ms`
: entier_
<br /> _facultatif. L'horodatage Unix en millisecondes correspondant au moment où le résultat de la métrique d'évaluation a été généré. Si cette valeur n'est pas fournie, la valeur par défaut est l'heure actuelle.

`tags`
: facultatif  __
<br />dictionaryUn dictionnaire de paires clé-valeur de type chaîne de caractères que les utilisateurs peuvent ajouter sous forme de balises relatives à l'évaluation. Pour plus d'informations sur les balises, consultez la section[ « Premiers pas avec les balises ](/getting_started/tagging/)».

`assessment`
: chaîne_
<br /> _facultative. Une analyse de cette évaluation. Les valeurs admises sont`pass`  et `fail`.

`reasoning`
: facultatif  _chaîne de_
<br /> caractèresUne explication textuelle du résultat de l'évaluation.

`metadata`
: facultatif  __
<br />dictionaryUn dictionnaire contenant des métadonnées structurées de manière arbitraire associées au résultat de l'évaluation.
{{% /collapse-content %}}

#### Exemple

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM

    # joining an evaluation to a span via a tag key-value pair
    msg_id = get_msg_id()
    LLMObs.annotate(
        tags = {'msg_id': msg_id}
    )

    LLMObs.submit_evaluation(
        span_with_tag_value = {
            "tag_key": "msg_id",
            "tag_value": msg_id
        },
        ml_app = "chatbot",
        label="harmfulness",
        metric_type="score",
        value=10,
        tags={"evaluation_provider": "ragas"},
        assessment="fail",
        reasoning="Malicious intent was detected in the user instructions.",
        metadata={"details": ["jailbreak", "SQL injection"]}
    )

    # joining an evaluation to a span via span ID and trace ID
    span_context = LLMObs.export_span(span=None)
    LLMObs.submit_evaluation(
        span_context = span_context,
        ml_app = "chatbot",
        label="harmfulness",
        metric_type="score",
        value=10,
        tags={"evaluation_provider": "ragas"},
        assessment="fail",
        reasoning="Malicious intent was detected in the user instructions.",
        metadata={"details": ["jailbreak", "SQL injection"]}
    )
    return completion
{{< /code-block >}}

[1]: https://app.datadoghq.com/llm/evaluations

{{% /tab %}}

{{% tab "Node.js" %}}

`llmobs.submitEvaluation()` peut être utilisé pour soumettre votre évaluation personnalisée relative à un intervalle donné.

La`llmobs.submitEvaluation()`méthode accepte les arguments suivants :

{{% collapse-content title="Arguments" level="h4" expanded=false id="submit-evals-arguments" %}}

`span_context`
: obligatoire  __
<br />dictionaryLe contexte de la balise span auquel associer l'évaluation. Voici ce que devrait `LLMObs.export_span()`afficher .

`evaluationOptions`
: obligatoire  _objetUn_
<br /> objet contenant les données d'évaluation.

L'objet`evaluationOptions` peut contenir les éléments suivants :

`label`
: chaîne_
<br /> _obligatoire. Le nom de l'évaluation.

`metricType`
: chaîne __
<br />obligatoire. Le type de l'évaluation. Doit être l'une des valeurs suivantes : « categorical », « score », « boolean » ou « json ».

`value`
: obligatoire  _type chaîne ou numériqueLa_
<br /> valeur du résultat. Doit être une chaîne de caractères (pour « categorical `metric_type`»), un nombre (pour « score `metric_type`»), une valeur booléenne (pour « boolean `metric_type`») ou un objet JSON (pour « json `metric_type`»).

`tags`
: facultatif  __
<br />dictionaryUn dictionnaire de paires clé-valeur de type chaîne de caractères que les utilisateurs peuvent ajouter sous forme de balises relatives à l'évaluation. Pour plus d'informations sur les balises, consultez la section[ « Premiers pas avec les balises ](/getting_started/tagging/)».

`assessment`
: chaîne_
<br /> _facultative. Une analyse de cette évaluation. Les valeurs admises sont`pass`  et `fail`.

`reasoning`
: facultatif  _chaîne de_
<br /> caractèresUne explication textuelle du résultat de l'évaluation.

`metadata`
: facultatif  __
<br />dictionaryUn objet JSON contenant des métadonnées structurées de manière arbitraire associées au résultat de l'évaluation.
{{% /collapse-content %}}

#### Exemple

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // user application logic to invoke LLM
  const spanContext = llmobs.exportSpan()
  llmobs.submitEvaluation(spanContext, {
    label: "harmfulness",
    metricType: "score",
    value: 10,
    tags: { evaluationProvider: "ragas" }
  })
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}

[1]: /fr/getting_started/tagging/
{{% /tab %}}
{{% tab "Java" %}}

Utilisez`LLMObs.SubmitEvaluation()`  pour soumettre votre évaluation personnalisée associée à un intervalle donné.

La`LLMObs.SubmitEvaluation()`méthode accepte les arguments suivants :

{{% collapse-content title="Arguments" level="h4" expanded=false id="submit-evals-arguments" %}}

`llmObsSpan` : obligatoire  __
<br />LLMObsSpanLe contexte de portée auquel associer l'évaluation.

`label` : obligatoire  _StringLe_
<br /> nom de l'évaluation.

`categoricalValue` ou`scoreValue`  : obligatoire  _Chaîne de caractères_ ou _nombre à virgule_
<br /> flottante. La valeur du résultat. Doit être une chaîne de caractères (pour les évaluations catégorielles) ou un nombre à virgule flottante (pour les évaluations sous forme de notes).

`tags` : facultatif  _Map&lt;string, object>
_
<br />Un dictionnaire de paires clé-valeur de type chaîne de caractères utilisé pour baliser l'évaluation. Pour plus d'informations sur les balises, consultez la section[ « Premiers pas avec les balises ](/getting_started/tagging/)».
{{% /collapse-content %}}

#### Exemple

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = "N/A";
    try {
      chatResponse = ... // user application logic to invoke LLM
    } catch (Exception e) {
      llmSpan.addThrowable(e);
      throw new RuntimeException(e);
    } finally {
      llmSpan.finish();

      // submit evaluations
      LLMObs.SubmitEvaluation(llmSpan, "toxicity", "toxic", Map.of("language", "english"));
      LLMObs.SubmitEvaluation(llmSpan, "f1-similarity", 0.02, Map.of("provider", "f1-calculator"));
    }
    return chatResponse;
  }
}
{{< /code-block >}}

[1]: /fr/getting_started/tagging/
{{% /tab %}}
{{< /tabs >}}

## Traitement des portées

Pour modifier les données d'entrée et de sortie sur les segments, vous pouvez configurer une fonction de processeur. La fonction du processeur a accès aux balises « span » afin de permettre la modification conditionnelle des entrées et des sorties. Les fonctions du processeur peuvent soit renvoyer le segment modifié pour qu'il soit émis, soit renvoyer `None`« / »`null` pour empêcher complètement l'émission du segment. Cela permet de filtrer les segments qui contiennent des données sensibles ou qui répondent à certains critères.

{{< tabs >}}
{{% tab "Python" %}}

### Exemple

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs import LLMObsSpan

def redact_processor(span: LLMObsSpan) -> LLMObsSpan:
    if span.get_tag("no_output") == "true":
        for message in span.output:
            message["content"] = ""
    return span


# If using LLMObs.enable()
LLMObs.enable(
  ...
  span_processor=redact_processor,
)
# else when using `ddtrace-run`
LLMObs.register_processor(redact_processor)

with LLMObs.llm("invoke_llm_with_no_output"):
    LLMObs.annotate(tags={"no_output": "true"})
{{< /code-block >}}


### Exemple : modification conditionnelle avec auto-instrumentation

Lorsqu'on utilise l'instrumentation automatique, l'intervalle n'est pas toujours accessible dans le contexte. Pour modifier de manière conditionnelle les entrées et les sorties sur des segments auto-instrumentés,`annotation_context()`il est possible d'utiliser en plus d'un processeur de segment.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs import LLMObsSpan

def redact_processor(span: LLMObsSpan) -> LLMObsSpan:
    if span.get_tag("no_input") == "true":
        for message in span.input:
            message["content"] = ""
    return span

LLMObs.register_processor(redact_processor)


def call_openai():
    with LLMObs.annotation_context(tags={"no_input": "true"}):
        # make call to openai
        ...
{{< /code-block >}}

### Exemple : empêcher l'émission de balises `span`

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs import LLMObsSpan
from typing import Optional

def filter_processor(span: LLMObsSpan) -> Optional[LLMObsSpan]:
    # Skip spans that are marked as internal or contain sensitive data
    if span.get_tag("internal") == "true" or span.get_tag("sensitive") == "true":
        return None  # This span will not be emitted

    # Process and return the span normally
    return span

LLMObs.register_processor(filter_processor)

# This span will be filtered out and not sent to Datadog
with LLMObs.workflow("internal_workflow"):
    LLMObs.annotate(tags={"internal": "true"})
    # ... workflow logic
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

### Exemple

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>"
  }
})

const llmobs = tracer.llmobs

function redactProcessor(span) {
  if (span.getTag("no_output") === "true") {
    for (const message of span.output) {
      message.content = ""
    }
  }
  return span
}

llmobs.registerProcessor(redactProcessor)
{{< /code-block >}}

### Exemple : modification conditionnelle avec auto-instrumentation

Lorsqu'on utilise l'instrumentation automatique, l'intervalle n'est pas toujours accessible dans le contexte. Pour modifier de manière conditionnelle les entrées et les sorties sur des segments auto-instrumentés,`llmobs.annotationContext()`il est possible d'utiliser en plus d'un processeur de segment.

{{< code-block lang="javascript" >}}
const { llmobs } = require('dd-trace');

function redactProcessor(span) {
  if (span.getTag("no_input") == "true") {
    for (const message of span.input) {
      message.content = "";
    }
  }

  return span;
}

llmobs.registerProcessor(redactProcessor);

async function callOpenai() {
  await llmobs.annotationContext({ tags: { no_input: "true" } }, async () => {
    // make call to openai
  });
}
{{< /code-block >}}

### Exemple : empêcher l'émission de balises `span`

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>"
  }
})

const llmobs = tracer.llmobs

function filterProcessor(span) {
  // Skip spans that are marked as internal or contain sensitive data
  if (span.getTag("internal") === "true" || span.getTag("sensitive") === "true") {
    return null  // This span will not be emitted
  }

  // Process and return the span normally
  return span
}

llmobs.registerProcessor(filterProcessor)

// This span will be filtered out and not sent to Datadog
function internalWorkflow() {
  return llmobs.trace({ kind: 'workflow', name: 'internalWorkflow' }, (span) => {
    llmobs.annotate({ tags: { internal: "true" } })
    // ... workflow logic
  })
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


## Suivi des sessions utilisateur

Le suivi des sessions vous permet d'associer plusieurs interactions à un utilisateur donné.

{{< tabs >}}
{{% tab "Python" %}}
Lorsque vous lancez un segment racine pour une nouvelle trace ou un nouveau segment dans un nouveau processus, indiquez `session_id`l'argument avec l'identifiant sous forme de chaîne de la session utilisateur sous-jacente, qui est transmis en tant que balise au segment. Vous pouvez également, si vous le souhaitez, spécifier les balises `user_handle``user_id`, `user_name`, et .

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow(session_id="<SESSION_ID>")
def process_user_message():
    LLMObs.annotate(
        ...
        tags = {"user_handle": "poodle@dog.com", "user_id": "1234", "user_name": "poodle"}
    )
    return
{{< /code-block >}}

### Balises 

|  |  |
|---|---|
| `session_id` | de suivi de sessionBaliseDescriptionL'identifiant représentant une session utilisateur unique, par exemple une session de chat. |
| `user_handle` | Le identifiant de l'utilisateur de la session de chat. |
| `user_name` | Le nom de l'utilisateur de la session de chat. |
| `user_id` | L'identifiant de l'utilisateur de la session de chat. |
{{% /tab %}}

{{% tab "Node.js" %}}
Lorsque vous lancez une séquence racine pour une nouvelle trace ou une nouvelle séquence dans un nouveau processus, indiquez `sessionId`l'argument avec l'identifiant sous forme de chaîne de caractères de la session utilisateur sous-jacente :

{{< code-block lang="javascript" >}}
function processMessage() {
    ... # user application logic
    return
}
processMessage = llmobs.wrap({ kind: 'workflow', sessionId: "<SESSION_ID>" }, processMessage)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
Lorsque vous lancez une séquence racine pour une nouvelle trace ou une nouvelle séquence dans un nouveau processus, indiquez `sessionId`l'argument avec l'identifiant sous forme de chaîne de caractères de la session utilisateur sous-jacente :

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String processChat(int userID) {
    LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("incoming-chat", null, "session-" + System.currentTimeMillis() + "-" + userID);
    String chatResponse = answerChat(); // user application logic
    workflowSpan.annotateIO(...); // record the input and output
    workflowSpan.finish();
    return chatResponse;
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Traçage distribué

Le SDK prend en charge le traçage entre les services ou les hôtes distribués. Le traçage distribué fonctionne en transmettant les informations de segment d'une requête Web à l'autre.

{{< tabs >}}
{{% tab "Python" %}}

La`ddtrace`bibliothèque propose des intégrations prêtes à l'emploi qui prennent en charge le traçage distribué pour les [frameworks web][1] et les bibliothèques [HTTP][2] les plus courants. Si votre application effectue des requêtes à l'aide de ces bibliothèques prises en charge, vous pouvez activer le traçage distribué en exécutant la commande suivante :
{{< code-block lang="python">}}
from ddtrace import patch
patch(<INTEGRATION_NAME>=True)
{{< /code-block >}}

Si votre application n'utilise aucune de ces bibliothèques prises en charge, vous pouvez activer le traçage distribué en transmettant manuellement les informations de span vers et depuis les en-têtes HTTP. Le SDK fournit les méthodes d'aide`LLMObs.inject_distributed_headers()`  et`LLMObs.activate_distributed_headers()`  pour injecter et activer des contextes de traçage dans les en-têtes de requête.

### Injection d'en-têtes distribués

Cette`LLMObs.inject_distributed_headers()`méthode prend un span et insère son contexte dans les en-têtes HTTP afin qu'il soit inclus dans la requête. Cette méthode accepte les arguments suivants :

`request_headers`
: obligatoire  __
<br />dictionaryLes en-têtes HTTP à compléter avec les attributs du contexte de traçage.

`span`
: facultatif  _Span_  **par défaut** : `The current active span.`
<br />la balise Span dont le contenu doit être inséré dans les en-têtes de requête fournis. Pour tous les spans (y compris ceux utilisant des décorateurs de fonction), la valeur par défaut est le span actuellement actif.

### Activation des en-têtes distribués

Cette`LLMObs.activate_distributed_headers()`méthode récupère les en-têtes HTTP et extrait les attributs du contexte de traçage à activer dans le nouveau service. 

**Remarque **: vous devez appeler cette méthode`LLMObs.activate_distributed_headers()` avant de lancer toute séquence de traçage dans votre service en aval. Les segments ayant commencé auparavant (y compris ceux des décorateurs de fonction) ne sont pas pris en compte dans la trace distribuée.

Cette méthode accepte l'argument suivant :

`request_headers`
: obligatoire  __
<br />dictionnaireLes en-têtes HTTP à partir desquels extraire les attributs du contexte de traçage.


### Exemple

{{< code-block lang="python" filename="client.py" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import workflow

@workflow
def client_send_request():
    request_headers = {}
    request_headers = LLMObs.inject_distributed_headers(request_headers)
    send_request("<method>", request_headers)  # arbitrary HTTP call
{{< /code-block >}}

{{< code-block lang="python" filename="server.py" >}}
from ddtrace.llmobs import LLMObs

def server_process_request(request):
    LLMObs.activate_distributed_headers(request.headers)
    with LLMObs.task(name="process_request") as span:
        pass  # arbitrary server work
{{< /code-block >}}

[1]: /fr/tracing/trace_collection/compatibility/python/#integrations
[2]: /fr/tracing/trace_collection/compatibility/python/#library-compatibility
{{% /tab %}}
{{% tab "Node.js" %}}

La`dd-trace`bibliothèque propose des intégrations prêtes à l'emploi qui prennent en charge le traçage distribué pour les principaux [frameworks web][1]. Le fait d'exiger le traceur active automatiquement ces intégrations, mais vous pouvez les désactiver si vous le souhaitez à l'aide de :

{{< code-block lang="javascript">}}
const tracer = require('dd-trace').init({
  llmobs: { ... },
})
tracer.use('http', false) // disable the http integration
{{< /code-block >}}

[1]: /fr/tracing/trace_collection/compatibility/nodejs/#web-framework-compatibility
{{% /tab %}}
{{< /tabs >}}


## Tracé avancé

{{< tabs >}}
{{% tab "Python" %}}
### Suivi des portées à l'aide de méthodes intégrées

Pour chaque type de portée, la`ddtrace.llmobs.LLMObs`classe fournit une méthode intégrée correspondante permettant de suivre automatiquement l'exécution d'un bloc de code donné. Ces méthodes ont la même signature d'arguments que leurs équivalents sous forme de décorateurs de fonction, à ceci près que`name`la valeur par défaut est le type de balise (`llm`, `workflow`, etc.) si aucun argument n'est fourni. Ces méthodes peuvent être utilisées comme gestionnaires de contexte pour clôturer automatiquement la balise `span` une fois que le bloc de code qu'elle contient est terminé. 

#### Exemple

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    with LLMObs.workflow(name="process_message", session_id="<SESSION_ID>", ml_app="<ML_APP>") as workflow_span:
        ... # user application logic
    return
{{< /code-block >}}

### Conserver un élément « span » d'un contexte à l'autre

Pour démarrer et arrêter manuellement un span dans différents contextes ou portées : 

1. Démarrez un span manuellement en utilisant les mêmes méthodes (par exemple, la`LLMObs.workflow`méthode pour un span de workflow), mais sous la forme d'un simple appel de fonction plutôt que d'un gestionnaire de contexte. 
2. Transmettez l'objet span en tant qu'argument à d'autres fonctions. 
3. Arrêtez le span manuellement à l'aide de la`span.finish()`méthode. **Remarque **: la balise span doit être complétée manuellement, sinon elle ne sera pas envoyée.

#### Exemple

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    workflow_span = LLMObs.workflow(name="process_message")
    ... # user application logic
    separate_task(workflow_span)
    return

def separate_task(workflow_span):
    ... # user application logic
    workflow_span.finish()
    return
{{< /code-block >}}

#### Le vidage forcé dans les environnements sans serveur

`LLMObs.flush()` est une fonction bloquante qui transmet toutes les données d'observabilité LLM mises en mémoire tampon au backend Datadog. Cela peut s'avérer utile dans les environnements sans serveur pour empêcher une application de se fermer tant que toutes les traces LLM Observability n'ont pas été envoyées. 

### Tracer plusieurs applications

Le SDK permet de tracer plusieurs applications LLM à partir d'un même service.

Vous pouvez définir une variable d'environnement`DD_LLMOBS_ML_APP` avec le nom de votre application LLM, dans laquelle tous les segments générés sont regroupés par défaut.

Pour passer outre cette configuration et utiliser un nom d'application LLM différent pour un intervalle racine donné, transmettez `ml_app`l'argument avec le nom sous forme de chaîne de caractères de l'application LLM sous-jacente lors du lancement d'un intervalle racine pour une nouvelle trace ou d'un intervalle dans un nouveau processus.

{{< code-block lang="python">}}
from ddtrace.llmobs.decorators import workflow

@workflow(name="process_message", ml_app="<NON_DEFAULT_ML_APP_NAME>")
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
### Suivi des portées à l'aide de méthodes intégrées

Le`llmobs`SDK fournit une méthode intégrée permettant de suivre automatiquement l'exécution d'un bloc de code donné. Ces méthodes ont la même signature d'arguments que leurs équivalents sous forme de fonctions d'encapsulation, à ceci près que`name`  est obligatoire, car le nom ne peut pas être déduit d'un callback anonyme. Cette méthode met fin au span dans les conditions suivantes :

- Si la fonction renvoie une Promise, le span prend fin lorsque la Promise est résolue ou rejetée.
- Si la fonction prend un callback comme dernier paramètre, le span prend fin lorsque ce callback est appelé.
- Si la fonction n'accepte pas de callback et ne renvoie pas de Promise, le span prend fin à la fin de l'exécution de la fonction.

#### Exemple sans callback

{{< code-block lang="javascript" >}}
function processMessage () {
  return llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, workflowSpan => {
    ... // user application logic
    return
  })
}
{{< /code-block >}}

#### Exemple avec une fonction de rappel

{{< code-block lang="javascript" >}}
function processMessage () {
  return llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, (workflowSpan, cb) => {
    ... // user application logic
    let maybeError = ...
    cb(maybeError) // the span will finish here, and tag the error if it is not null or undefined
    return
  })
}
{{< /code-block >}}

Le type de retour de cette fonction correspond au type de retour de la fonction tracée :

{{< code-block lang="javascript" >}}
function processMessage () {
  const result = llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, workflowSpan => {
    ... // user application logic
    return 'hello world'
  })

  console.log(result) // 'hello world'
  return result
}
{{< /code-block >}}

### Les décorateurs de fonctions en TypeScript

Le SDK Node.js LLM Observability propose une`llmobs.decorate`fonction qui sert de décorateur de fonction pour les applications TypeScript. Le comportement de traçage de cette fonction est identique à celui de `llmobs.wrap`.

#### Example

{{< code-block lang="javascript" >}}
// index.ts
import tracer from 'dd-trace';
tracer.init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>",
  },
});

const { llmobs } = tracer;

class MyAgent {
  @llmobs.decorate({ kind: 'agent' })
  async runChain () {
    ... // user application logic
    return
  }
}

{{< /code-block >}}

### Le vidage forcé dans les environnements sans serveur

`llmobs.flush()` est une fonction bloquante qui transmet toutes les données d'observabilité LLM mises en mémoire tampon au backend Datadog. Cela peut s'avérer utile dans les environnements sans serveur pour empêcher une application de se fermer tant que toutes les traces LLM Observability n'ont pas été envoyées. 

### Tracer plusieurs applications

Le SDK permet de tracer plusieurs applications LLM à partir d'un même service.

Vous pouvez définir une variable d'environnement`DD_LLMOBS_ML_APP` avec le nom de votre application LLM, dans laquelle tous les segments générés sont regroupés par défaut.

Pour passer outre cette configuration et utiliser un nom d'application LLM différent pour un intervalle racine donné, transmettez `mlApp`l'argument avec le nom sous forme de chaîne de caractères de l'application LLM sous-jacente lors du lancement d'un intervalle racine pour une nouvelle trace ou d'un intervalle dans un nouveau processus.

{{< code-block lang="javascript">}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'processMessage', mlApp: '<NON_DEFAULT_ML_APP_NAME>' }, processMessage)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Directives relatives à la dénomination des applications

Le nom de votre application (la valeur de `DD_LLMOBS_ML_APP`) doit respecter les consignes suivantes :

- Il doit s'agir d'une chaîne Unicode en minuscules.
- Sa longueur ne doit pas dépasser 193 caractères.
- Il ne doit pas contenir de
-  traits de soulignement consécutifs ni en fin de chaîne.Il peut contenir les caractères suivants :
   - lettres et chiffres

## 
   - 
   - 
   - 
   - 
   - , traits de soulignement, tirets, deux-points, points et barres obliques.Pour en savoir plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/openai/openai-python
[2]: https://boto3.amazonaws.com/v1/documentation/api/latest/index.html
[3]: https://botocore.amazonaws.com/v1/documentation/api/latest/tutorial/index.html
[4]: https://github.com/langchain-ai/langchain
[7]: /fr/account_management/api-app-keys/#add-an-api-key-or-client-token
[8]: /fr/llm_observability/terms/
[9]: /fr/getting_started/tagging/
[10]: https://github.com/DataDog/llm-observability
[11]: /fr/tracing/trace_collection/compatibility/python/#integrations
[12]: /fr/tracing/trace_collection/compatibility/python/#library-compatibility
[13]: /fr/llm_observability/instrumentation/auto_instrumentation/
[14]: /fr/llm_observability/monitoring/cost