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
  text: Suivez, comparez et optimisez vos invites LLM avec Datadog LLM Observability
title: Référence SDK LLM Observability
---
## Aperçu

Les SDK LLM Observability de Datadog fournissent une instrumentation automatique ainsi que des API d'instrumentation manuelle afin d'offrir visibilité et informations sur vos applications LLM.

## Configuration

### Exigences

- Une [clé API Datadog][1].

[1]: https://app.datadoghq.com/organization-settings/api-keys

{{< tabs >}}
{{% tab "Python" %}}
- Le dernier package `ddtrace` est installé (Python 3.7+ requis) :
   ```shell
   pip install ddtrace
   ```
{{% /tab %}}

{{% tab "Node.js" %}}
- Le dernier package `dd-trace` est installé (Node.js 16+ requis) :
   ```shell
   npm install dd-trace
   ```

{{% /tab %}}

{{% tab "Java" %}}
- Vous avez téléchargé le dernier [`dd-trace-java` JAR][1]. Le SDK LLM Observability est pris en charge dans `dd-trace-java` v1.51.0+ (Java 8+ requis).

[1]: https://github.com/DataDog/dd-trace-java
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="Configuration en ligne de commande" level="h3" expanded=false id="command-line-setup" %}}

{{< tabs >}}
{{% tab "Python" %}}
Activez LLM Observability en exécutant votre application avec la commande `ddtrace-run` et en spécifiant les variables d'environnement requises.

**Remarque** : `ddtrace-run` active automatiquement toutes les intégrations LLM Observability.

{{< code-block lang="shell">}}
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

#### Variables d'environnement pour la configuration en ligne de commande

`DD_SITE`
: requis - _chaîne_
<br />Site Datadog de destination pour la soumission de vos données LLM. Votre site est {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: requis - _entier ou chaîne_
<br />Utilisez le commutateur pour activer l'envoi des données à LLM Observability. Doit être défini sur `1` ou `true`.

`DD_LLMOBS_ML_APP`
: optionnel - _chaîne_
<br />Le nom de votre application LLM, service ou projet, sous lequel toutes les traces et les spans sont regroupés. Cela aide à distinguer entre différentes applications ou expériences. Voir [Directives de nommage des applications](#application-naming-guidelines) pour les caractères autorisés et d'autres contraintes. Pour remplacer cette valeur pour un span racine donné, voir [Tracer plusieurs applications](#tracing-multiple-applications). Si non fourni, cela prend par défaut la valeur de [`DD_SERVICE`][1], ou la valeur d'un `DD_LLMOBS_ML_APP` propagé d'un service en amont.
<br />**Remarque** : Avant la version `ddtrace==3.14.0`, ceci est un **champ requis**.

`DD_LLMOBS_AGENTLESS_ENABLED`
: optionnel - _entier ou chaîne_ - **par défaut** : `false`
<br />Seulement requis si vous n'utilisez pas l'Agent Datadog, auquel cas cela doit être défini sur `1` ou `true`.

`DD_API_KEY`
: optionnel - _chaîne_
<br />Votre clé API Datadog. Seulement requis si vous n'utilisez pas l'Agent Datadog.

[1]: /fr/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}

{{% tab "Node.js" %}}
Activez LLM Observability en exécutant votre application avec `NODE_OPTIONS="--import dd-trace/initialize.mjs"` et en spécifiant les variables d'environnement requises.

**Remarque** : `dd-trace/initialize.mjs` active automatiquement toutes les intégrations APM.

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> NODE_OPTIONS="--import dd-trace/initialize.mjs" node <YOUR_APP_ENTRYPOINT>
```

#### Variables d'environnement pour la configuration en ligne de commande

`DD_SITE`
: requis - _chaîne_
<br /> Le site Datadog pour soumettre vos données LLM. Votre site est {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: requis - _entier ou chaîne_
<br />Utilisez le commutateur pour activer la soumission des données à LLM Observability. Doit être défini sur `1` ou `true`.

`DD_LLMOBS_ML_APP`
: optionnel - _chaîne_
<br />Le nom de votre application LLM, service ou projet, sous lequel toutes les traces et tous les spans sont regroupés. Cela aide à distinguer entre différentes applications ou expériences. Voir [Directives de nommage des applications](#application-naming-guidelines) pour les caractères autorisés et d'autres contraintes. Pour remplacer cette valeur pour un span racine donné, voir [Tracer plusieurs applications](#tracing-multiple-applications). Si non fourni, cela prend par défaut la valeur de [`DD_SERVICE`][1], ou la valeur d'un `DD_LLMOBS_ML_APP` propagé d'un service en amont.
<br />**Remarque** : Avant la version `dd-trace@5.66.0`, ceci est un **champ requis**.

`DD_LLMOBS_AGENTLESS_ENABLED`
: optionnel - _entier ou chaîne_ - **par défaut** : `false`
<br />Seulement requis si vous n'utilisez pas l'Agent Datadog, auquel cas cela doit être défini sur `1` ou `true`.

`DD_API_KEY`
: optionnel - _chaîne_
<br />Votre clé API Datadog. Seulement requis si vous n'utilisez pas l'Agent Datadog.

[1]: /fr/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}
{{% tab "Java" %}}

Activez LLM Observability en exécutant votre application avec `dd-trace-java` et en spécifiant les paramètres requis en tant que variables d'environnement ou propriétés système.

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> \
java -javaagent:path/to/your/dd-trace-java-jar/dd-java-agent-SNAPSHOT.jar \
-Ddd.service=my-app -Ddd.llmobs.enabled=true -Ddd.llmobs.ml.app=my-ml-app -jar path/to/your/app.jar
```

#### Variables d'environnement et propriétés système

Vous pouvez fournir les paramètres suivants en tant que variables d'environnement (par exemple, `DD_LLMOBS_ENABLED`) ou en tant que propriétés système Java (par exemple, `dd.llmobs_enabled`).

`DD_SITE` ou `dd.site`
: requis - _chaîne_
<br />Site Datadog de destination pour la soumission des données LLM. Votre site est {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED` ou `dd.llmobs.enabled`
: requis - _entier ou chaîne_
<br />Basculer pour activer la soumission des données à l'observabilité LLM. Doit être défini sur `1` ou `true`.

`DD_LLMOBS_ML_APP` ou `dd.llmobs.ml.app`
: optionnel - _chaîne_
<br />Le nom de votre application LLM, service ou projet, sous lequel toutes les traces et spans sont regroupés. Cela aide à distinguer entre différentes applications ou expériences. Voir [les directives de nommage des applications](#application-naming-guidelines) pour les caractères autorisés et d'autres contraintes. Pour remplacer cette valeur pour un span racine donné, voir [Tracer plusieurs applications](#tracing-multiple-applications). Si non fourni, cela par défaut à la valeur de [`DD_SERVICE`][1], ou la valeur d'un `DD_LLMOBS_ML_APP` propagé d'un service en amont.
<br />**Remarque** : Avant la version 1.54.0 de `dd-trace-java`, ceci est un **champ requis**.

`DD_LLMOBS_AGENTLESS_ENABLED` ou `dd.llmobs.agentless.enabled`
: optionnel - _entier ou chaîne_ - **par défaut** : `false`
<br />Seulement requis si vous n'utilisez pas l'Agent Datadog, auquel cas cela doit être défini sur `1` ou `true`.

`DD_API_KEY` ou `dd.api.key`
: optionnel - _chaîne_
<br />Votre clé API Datadog. Seulement requis si vous n'utilisez pas l'Agent Datadog.

[1]: /fr/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Configuration dans le code" level="h3" expanded=false id="in-code-setup" %}}

Au lieu d'utiliser [la configuration en ligne de commande](#command-line-setup), vous pouvez également activer LLM Observability par programmation.

{{< tabs >}}
{{% tab "Python" %}}

Utilisez la `LLMObs.enable()` fonction pour activer LLM Observability.

<div class="alert alert-info">
Ne pas utiliser cette méthode de configuration avec la commande <code>ddtrace-run</code>.
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
: optionnel - _chaîne_
<br />Le nom de votre application, service ou projet LLM, sous lequel toutes les traces et tous les spans sont regroupés. Cela aide à distinguer entre différentes applications ou expériences. Voir [Directives de nommage des applications](#application-naming-guidelines) pour les caractères autorisés et d'autres contraintes. Pour remplacer cette valeur pour une trace donnée, voir [Tracer plusieurs applications](#tracing-multiple-applications). Si non fourni, cette valeur prend par défaut la valeur de `DD_LLMOBS_ML_APP`.

`integrations_enabled` - **par défaut** : `true`
: optionnel - _booléen_
<br />Un indicateur permettant d'activer automatiquement le traçage des appels LLM pour les intégrations [LLM prises en charge par Datadog][1]. Si non fourni, toutes les intégrations LLM prises en charge sont activées par défaut. Pour éviter d'utiliser les intégrations LLM, définissez cette valeur sur `false`.

`agentless_enabled`
: optionnel - _booléen_ - **par défaut** : `false`
<br />Seulement requis si vous n'utilisez pas l'Agent Datadog, auquel cas cela doit être défini sur `True`. Cela configure la bibliothèque `ddtrace` pour ne pas envoyer de données nécessitant l'Agent Datadog. Si non fourni, cette valeur prend par défaut la valeur de `DD_LLMOBS_AGENTLESS_ENABLED`.

`site`
: optionnel - _chaîne_
<br />Site Datadog de destination pour la soumission de vos données LLM. Votre site est {{< region-param key="dd_site" code="true" >}}. Si non fourni, cette valeur prend par défaut la valeur de `DD_SITE`.

`api_key`
: optionnel - _chaîne_
<br />Votre clé API Datadog. Seulement requis si vous n'utilisez pas l'Agent Datadog. Si non fourni, cette valeur prend par défaut la valeur de `DD_API_KEY`.

`env`
: optionnel - _chaîne_
<br />Le nom de l'environnement de votre application (exemples : `prod`, `pre-prod`, `staging`). Si non fourni, cette valeur prend par défaut la valeur de `DD_ENV`.

`service`
: optionnel - _chaîne_
<br />Le nom du service utilisé pour votre application. Si non fourni, cette valeur prend par défaut la valeur de `DD_SERVICE`.

[1]: /fr/llm_observability/instrumentation/auto_instrumentation/
{{% /tab %}}

{{% tab "Node.js" %}}

<div class="alert alert-info">
Ne pas utiliser cette méthode de configuration avec la commande <code>dd-trace/initialize.mjs</code>.
</div>

Utilisez la `init()` fonction pour activer LLM Observability.

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

**Options pour `llmobs` configuration**

`mlApp`
: optionnel - _chaîne_
<br />Le nom de votre application LLM, service ou projet, sous lequel toutes les traces et spans sont regroupés. Cela aide à distinguer entre différentes applications ou expériences. Voir [Directives de nommage des applications](#application-naming-guidelines) pour les caractères autorisés et autres contraintes. Pour remplacer cette valeur pour une trace donnée, voir [Tracer plusieurs applications](#tracing-multiple-applications). Si non fourni, cela prend par défaut la valeur de `DD_LLMOBS_ML_APP`.

`agentlessEnabled`
: optionnel - _booléen_ - **par défaut** : `false`
<br />Uniquement requis si vous n'utilisez pas l'Agent Datadog, auquel cas cela doit être défini sur `true`. Cela configure la bibliothèque `dd-trace` pour ne pas envoyer de données nécessitant l'Agent Datadog. Si non fourni, cela prend par défaut la valeur de `DD_LLMOBS_AGENTLESS_ENABLED`.

**Options pour la configuration générale du traceur** :

`site`
: optionnel - _chaîne_
<br />Le site Datadog pour soumettre vos données LLM. Votre site est {{< region-param key="dd_site" code="true" >}}. Si non fourni, cela prend par défaut la valeur de `DD_SITE`.

`env`
: optionnel - _chaîne_
<br />Le nom de l'environnement de votre application (exemples : `prod`, `pre-prod`, `staging`). Si non fourni, cela prend par défaut la valeur de `DD_ENV`.

`service`
: optionnel - _chaîne_
<br />Le nom du service utilisé pour votre application. Si non fourni, cela prend par défaut la valeur de `DD_SERVICE`.

##### Variables d'environnement

Définissez les valeurs suivantes comme variables d'environnement. Elles ne peuvent pas être configurées par programme.

`DD_API_KEY`
: optionnel - _chaîne_
<br />Votre clé API Datadog. Seulement requis si vous n'utilisez pas l'Agent Datadog.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Configuration AWS Lambda" level="h3" expanded=false id="aws-lambda-setup" %}}

Pour instrumenter une fonction AWS Lambda existante avec LLM Observabilité, vous pouvez utiliser l'Extension Datadog et les couches de langage respectives.

1. Ouvrez un Cloudshell dans la console AWS.
2. Installez le client CLI Datadog

```shell
npm install -g @datadog/datadog-ci
```
3. Configurez la clé API Datadog et le site

```shell
export DD_API_KEY=<YOUR_DATADOG_API_KEY>
export DD_SITE=<YOUR_DATADOG_SITE>
```
Si vous avez déjà ou préférez utiliser un secret dans le Gestionnaire de Secrets, vous pouvez définir la clé API en utilisant l'ARN du secret :

```shell
export DATADOG_API_KEY_SECRET_ARN=<DATADOG_API_KEY_SECRET_ARN>
```
4. Installez votre fonction Lambda avec LLM Observability (cela nécessite au moins la version 77 de la couche d'extension Datadog)
{{< tabs >}}
{{% tab "Python" %}}

```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="python" >}} -e {{< latest-lambda-layer-version layer="extension" >}} --llmobs <YOUR_LLMOBS_ML_APP>
```
{{% /tab %}}

{{% tab "Node.js" %}}

```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="node" >}} -e {{< latest-lambda-layer-version layer="extension" >}} --llmobs <YOUR_LLMOBS_ML_APP>
```
{{% /tab %}}

{{% tab "Java" %}}

```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="dd-trace-java" >}} -e {{< latest-lambda-layer-version layer="extension" >}} --llmobs <YOUR_LLMOBS_ML_APP>
```
{{% /tab %}}
{{< /tabs >}}

4. Invoquez votre fonction Lambda et vérifiez que les traces LLM Observability sont visibles dans l'interface utilisateur Datadog.

Videz manuellement les traces LLM Observability en utilisant la méthode `flush` avant que la fonction Lambda ne retourne.

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


Après avoir installé le SDK et exécuté votre application, vous devriez vous attendre à voir des données dans LLM Observability provenant de l'auto-instrumentation. L'instrumentation manuelle peut être utilisée pour capturer des frameworks personnalisés ou des opérations provenant de bibliothèques qui ne sont pas encore prises en charge.

## Instrumentation manuelle

{{< tabs >}}
{{% tab "Python" %}}

Pour capturer une opération LLM, un décorateur de fonction peut être utilisé pour instrumenter facilement les flux de travail :

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def handle_user_request():
    ...
{{< /code-block >}}

ou une approche basée sur un gestionnaire de contexte pour capturer des opérations détaillées :

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


Pour une liste des types de span disponibles, consultez la [documentation des types de span][1]. Pour un traçage plus granulaire des opérations au sein des fonctions, consultez [Traçage des spans en utilisant des méthodes en ligne](#tracing-spans-using-inline-methods).

[1]: /fr/llm_observability/terms/
{{% /tab %}}

{{% tab "Node.js" %}}

Pour tracer un span, utilisez `llmobs.wrap(options, function)` comme wrapper de fonction pour la fonction que vous souhaitez tracer. Pour une liste des types de span disponibles, consultez la [documentation des types de span][1]. Pour un traçage plus granulaire des opérations au sein des fonctions, consultez [Traçage des spans en utilisant des méthodes en ligne](#tracing-spans-using-inline-methods).

### Types de span

Les types de span sont requis et sont spécifiés sur l'objet `options` passé aux fonctions de traçage `llmobs` (`trace`, `wrap` et `decorate`). Consultez la [documentation des types de span][1] pour une liste des types de span pris en charge.

**Remarque :** Les spans avec un type de span invalide ne sont pas soumis à LLM Observability.

### Capture automatique des arguments/de sortie/du nom de la fonction

`llmobs.wrap` (avec [`llmobs.decorate`](#function-decorators-in-typescript) pour TypeScript) essaie de capturer automatiquement les entrées, les sorties et le nom de la fonction en cours de traçage. Si vous devez annoter manuellement un span, consultez [Enrichir les spans](#enriching-spans). Les entrées et sorties que vous annotez remplaceront la capture automatique. De plus, pour remplacer le nom de la fonction, passez la propriété `name` sur l'objet d'options à la fonction `llmobs.wrap` :

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'differentFunctionName' }, processMessage)
{{< /code-block >}}

### Conditions pour terminer une plage pour une fonction enveloppée

`llmobs.wrap` étend le comportement sous-jacent de [`tracer.wrap`][2]. La span sous-jacente créée lorsque la fonction est appelée se termine dans les conditions suivantes :

- Si la fonction retourne une promesse, alors le span se termine lorsque la promesse est résolue ou rejetée.
- Si la fonction prend un rappel comme dernier paramètre, alors le span se termine lorsque ce rappel est appelé.
- Si la fonction ne prend pas de rappel et ne retourne pas de promesse, alors le span se termine à la fin de l'exécution de la fonction.

L'exemple suivant illustre la deuxième condition, où le dernier argument est un rappel :

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

Si l'application n'utilise pas la fonction de rappel, il est recommandé d'utiliser un bloc tracé en ligne à la place. Consultez [Traçage des plages en utilisant des méthodes en ligne](#tracing-spans-using-inline-methods) pour plus d'informations.

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

### Démarrer un span

Il existe plusieurs méthodes pour démarrer un span, en fonction du type de span que vous démarrez. Consultez la [documentation des types de span][1] pour une liste des types de span pris en charge.

Toutes les spans sont démarrées en tant qu'instance d'objet de `LLMObsSpan`. Chaque span a des méthodes que vous pouvez utiliser pour interagir avec le span et enregistrer des données.

### Finir un span

Les spans doivent être terminés pour que la trace soit soumise et visible dans l'application Datadog.

Pour terminer un span, appelez `finish()` sur une instance d'objet span. Si possible, enveloppez le span dans un bloc `try/finally` pour garantir que le span soit soumis même si une exception se produit.

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

### appels LLM

<div class="alert alert-info">Si vous utilisez des fournisseurs ou des frameworks LLM pris en charge par <a href="/llm_observability/instrumentation/auto_instrumentation/">les intégrations LLM de Datadog</a>, vous n'avez pas besoin de démarrer manuellement un span LLM pour tracer ces opérations.</div>

{{< tabs >}}
{{% tab "Python" %}}
Pour tracer un appel LLM, utilisez le décorateur de fonction `ddtrace.llmobs.decorators.llm()`.

{{% collapse-content title="Arguments" level="h4" expanded=false id="llm-span-arguments" %}}

`model_name`
: requis - _chaîne_
<br/>Le nom du LLM invoqué.

`name`
: optionnel - _chaîne_
<br/>Le nom de l'opération. Si non fourni, `name` par défaut au nom de la fonction tracée.

`model_provider`
: optionnel - _chaîne_ - **par défaut** : `"custom"`
<br />Le nom du fournisseur de modèle.
<br />**Remarque** : Pour afficher le coût estimé en dollars américains, définissez `model_provider` sur l'une des valeurs suivantes : `openai`, `azure_openai` ou `anthropic`.

`session_id`
: optionnel - _chaîne_
<br/>L'ID de la session utilisateur sous-jacente. Voir [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`ml_app`
: optionnel - _chaeene_
<br/>Le nom de l'application ML à laquelle l'opération appartient. Voir [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

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
Pour tracer un appel LLM, spécifiez le type de portée comme `llm`, et optionnellement spécifiez les arguments suivants dans l'objet d'options.

{{% collapse-content title="Arguments" level="h4" expanded=false id="llm-span-arguments" %}}

`modelName`
: optionnel - _chaîne_ - **par défaut** : `"custom"`
<br/>Le nom du LLM invoqué.

`name`
: optionnel - _chaîne_
<br/>Le nom de l'opération. Si non fourni, `name` par défaut au nom de la fonction tracée.

`modelProvider`
: optionnel - _chaîne_ - **par défaut** : `"custom"`
<br/>Le nom du fournisseur de modèle.
<br />**Remarque** : Pour afficher le coût estimé en dollars américains, définissez `modelProvider` sur l'une des valeurs suivantes : `openai`, `azure_openai`, ou `anthropic`.

`sessionId`
: optionnel - _chaîne_
<br/>L'ID de la session utilisateur sous-jacente. Voir [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`mlApp`
: optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle l'opération appartient. Voir [Tracer plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

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
Pour tracer un appel LLM, importez et appelez la méthode suivante avec les arguments listés ci-dessous:

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startLLMSpan(spanName, modelName, modelProvider, mlApp, sessionID);
```

{{% collapse-content title="Arguments" level="h4" expanded=false id="llm-span-arguments" %}}

`spanName`
: optionnel - _Chaîne_
<br/>Le nom de l'opération. Si non fourni, `spanName` prend par défaut le type de span.

`modelName`
: optionnel - _Chaîne_ - **par défaut** : `"custom"`
<br/>Le nom du LLM invoqué.

`modelProvider`
: optionnel - _Chaîne_ - **par défaut** : `"custom"`
<br/>Le nom du fournisseur de modèle.
<br />**Remarque**: Pour afficher le coût estimé en dollars américains, définissez `modelProvider` sur l'une des valeurs suivantes : `openai`, `azure_openai`, ou `anthropic`.

`mlApp`
: optionnel - _Chaîne_
<br/>Le nom de l'application ML à laquelle l'opération appartient. Fournir une valeur non nulle remplace le nom de l'application ML fourni au début de l'application. Voir [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

`sessionId`
: optionnel - _Chaîne_
<br/>L'ID de la session utilisateur sous-jacente. Voir [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

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
Pour tracer une portée de flux de travail, utilisez le décorateur de fonction `ddtrace.llmobs.decorators.workflow()`.

{{% collapse-content title="Arguments" level="h4" expanded=false id="workflow-span-arguments" %}}
`name`
: optionnel - _chaîne_
<br/>Le nom de l'opération. Si non fourni, `name` correspond par défaut au nom de la fonction tracée.

`session_id`
: optionnel - _chaîne_
<br/>L'ID de la session utilisateur sous-jacente. Voir [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`ml_app`
: optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle l'opération appartient. Voir [Suivi de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

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

Pour tracer une portée de flux de travail, précisez le type de span comme `workflow`, et, éventuellement, indiquez des arguments dans l'objet options.

{{% collapse-content title="Arguments" level="h4" expanded=false id="workflow-span-arguments" %}}

`name`
: optionnel - _chaîne_
<br/>Le nom de l'opération. Si non fourni, `name` correspond par défaut au nom de la fonction tracée.

`sessionId`
: optionnel - _chaîne_
<br/>L'ID de la session utilisateur sous-jacente. Voir [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`mlApp`
: optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle l'opération appartient. Voir [Suivi de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

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
Pour suivre un intervalle de flux de travail, importez et appelez la méthode suivante avec les arguments énumérés ci-dessous :

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startWorkflowSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Arguments" level="h4" expanded=false id="workflow-span-arguments" %}}

`spanName`
: optionnel - _Chaîne_
<br/>Le nom de l'opération. Si non fourni, `spanName` correspond par défaut au type de span.

`mlApp`
: optionnel - _Chaîne_
<br/>Le nom de l'application ML à laquelle l'opération appartient. Fournir une valeur non nulle remplace le nom de l'application ML fourni au début de l'application. Voir [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

`sessionId`
: optionnel - _Chaîne_
<br/>L'ID de la session utilisateur sous-jacente. Voir [Traçage des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

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
Pour suivre l'exécution d'un agent, utilisez le décorateur de fonction `ddtrace.llmobs.decorators.agent()`.

{{% collapse-content title="Arguments" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
: optionnel - _chaîne_
<br/>Le nom de l'opération. Si non fourni, `name` correspond par défaut au nom de la fonction tracée.

`session_id`
: optionnel - _chaîne_
<br/>L'ID de la session utilisateur sous-jacente. Voir [Traçage des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`ml_app`
: optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle l'opération appartient. Voir [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.
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
Pour tracer l'exécution d'un agent, spécifiez le type de span comme `agent`, et, éventuellement, indiquez des arguments dans l'objet options.

{{% collapse-content title="Arguments" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
: optionnel - _chaîne_
<br/>Le nom de l'opération. Si non fourni, `name` correspond par défaut au nom de la fonction tracée.

`sessionId`
: optionnel - _chaîne_
<br/>L'ID de la session utilisateur sous-jacente. Voir [Traçage des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`mlApp`
: optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle l'opération appartient. Voir [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

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
Pour tracer l'exécution d'un agent, importez et appelez la méthode suivante avec les arguments énumérés ci-dessous.

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startAgentSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Arguments" level="h4" expanded=false id="agent-span-arguments" %}}

`spanName`
: optionnel - _Chaîne_
<br/>Le nom de l'opération. Si non fourni, `spanName` correspond par défaut au nom de la fonction tracée.

`mlApp`
: optionnel - _Chaîne_
<br/>Le nom de l'application ML à laquelle l'opération appartient. Fournir une valeur non nulle remplace le nom de l'application ML fourni au début de l'application. Voir [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

`sessionId`
: optionnel - _Chaîne_
<br/>L'ID de la session utilisateur sous-jacente. Voir [Traçage des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Appels d'outils

{{< tabs >}}
{{% tab "Python" %}}
Pour tracer un appel d'outil, utilisez le décorateur de fonction `ddtrace.llmobs.decorators.tool()`.

{{% collapse-content title="Arguments" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
: optionnel - _chaîne_
<br/>Le nom de l'opération. Si non fourni, `name` correspond par défaut au nom de la fonction tracée.

`session_id`
: optionnel - _chaîne_
<br/>L'ID de la session utilisateur sous-jacente. Voir [Traçage des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`ml_app`
: optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle l'opération appartient. Voir [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

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
Pour suivre un appel d'outil, spécifiez le type de span comme `tool`, et spécifiez éventuellement des arguments sur l'objet options.

{{% collapse-content title="Arguments" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
: optionnel - _chaîne_
<br/>Le nom de l'opération. Si non fourni, `name` correspond par défaut au nom de la fonction tracée.

`sessionId`
: optionnel - _chaîne_
<br/>L'ID de la session utilisateur sous-jacente. Voir [Traçage des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`mlApp`
: optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle l'opération appartient. Voir [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

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
Pour tracer un appel d'outil, importez et appelez la méthode suivante avec les arguments énumérés ci-dessous :

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startToolSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Arguments" level="h4" expanded=false id="tool-span-arguments" %}}

`spanName`
: optionnel - _chaîne_
<br/>Le nom de l'opération. Si non fourni, `spanName` correspond par défaut au nom de la fonction tracée.

`mlApp`
: optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle l'opération appartient. Fournir une valeur non nulle remplace le nom de l'application ML fourni au début de l'application. Voir [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

`sessionId`
: optionnel - _chaîne_
<br/>L'ID de la session utilisateur sous-jacente. Voir [Traçage des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Tâches

{{< tabs >}}
{{% tab "Python" %}}
Pour tracer une portée de tâche, utilisez le décorateur de fonction `LLMObs.task()`.

{{% collapse-content title="Arguments" level="h4" expanded=false id="task-span-arguments" %}}

`name`
: optionnel - _chaîne_
<br/>Le nom de l'opération. Si non fourni, `name` correspond par défaut au nom de la fonction tracée.

`session_id`
: optionnel - _chaîne_
<br/>L'ID de la session utilisateur sous-jacente. Voir [Traçage des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`ml_app`
: optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle l'opération appartient. Voir [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

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
Pour tracer un span de tâche, spécifiez le type de span comme `task` et, éventuellement, indiquez des arguments dans l'objet options.

{{% collapse-content title="Arguments" level="h4" expanded=false id="task-span-arguments" %}}

`name`
: optionnel - _chaîne_
<br/>Le nom de l'opération. Si non précisé, `name` prend la valeur du nom de la fonction tracée.

`sessionId`
: optionnel - _chaîne_
<br/>L'ID de la session utilisateur sous-jacente. Voir [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`mlApp`
: optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle l'opération appartient. Voir [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

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
Pour tracer un span de tâche, importez et appelez la méthode suivante avec les arguments indiqués ci-dessous :

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startTaskSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Arguments" level="h4" expanded=false id="task-span-arguments" %}}

`spanName`
: optionnel - _chaîne_
<br/>Le nom de l'opération. Si non précisé, `spanName` prend la valeur du nom de la fonction tracée.

`mlApp`
: optionnel - _Chaîne_
<br/>Le nom de l'application ML à laquelle l'opération appartient. Fournir une valeur non nulle remplace le nom de l'application ML fourni au début de l'application. Voir [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

`sessionId`
: optionnel - _Chaîne_
<br/>L'ID de la session utilisateur sous-jacente. Voir [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.


{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Embeddings

{{< tabs >}}
{{% tab "Python" %}}
Pour tracer une opération d'embedding, utilisez le décorateur de fonction `LLMObs.embedding()`.

**Note** : Annoter l'entrée d'un span d'embedding nécessite un formatage différent de celui des autres types de span. Voir [Enrichir les spans](#enriching-spans) pour plus de détails sur la façon de spécifier les entrées d'embedding.

{{% collapse-content title="Arguments" level="h4" expanded=false id="embedding-span-arguments" %}}

`model_name`
: requis - _chaîne_
<br/>Le nom du LLM invoqué.

`name`
: optionnel - _chaîne_
<br/>Le nom de l'opération. Si non fourni, `name` est défini sur le nom de la fonction tracée.

`model_provider`
: optionnel - _chaîne_ - **par défaut** : `"custom"`

`session_id`
: optionnel - _chaîne_
<br/>L'ID de la session utilisateur sous-jacente. Voir [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`ml_app`
: optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle l'opération appartient. Voir [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

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
Pour tracer une opération d'embedding, spécifiez le type de span comme `embedding`, et spécifiez éventuellement des arguments dans l'objet options.

**Note** : Annoter l'entrée d'un span d'embedding nécessite un formatage différent de celui des autres types de span. Voir [Enrichir les spans](#enriching-spans) pour plus de détails sur la façon de spécifier les entrées d'embedding.

{{% collapse-content title="Arguments" level="h4" expanded=false id="embedding-span-arguments" %}}

`modelName`
: optionnel - _chaîne_ - **par défaut**: `"custom"`
<br/>Le nom du LLM invoqué.

`name`
: optionnel - _chaîne_
<br/>Le nom de l'opération. Si non précisé, `name` prend la valeur du nom de la fonction tracée.

`modelProvider`
: optionnel - _chaîne_ - **par défaut**: `"custom"`
<br/>Le nom du fournisseur de modèle.

`sessionId`
: optionnel - _chaîne_
<br/>L'ID de la session utilisateur sous-jacente. Voir [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`mlApp`
: optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle l'opération appartient. Voir [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

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
Pour tracer une période de récupération, utilisez le décorateur de fonction `ddtrace.llmobs.decorators.retrieval()`.

**Remarque** : Annoter la sortie d'une période de récupération nécessite un formatage différent de celui des autres types de périodes. Voir [Enrichissement des périodes](#enriching-spans) pour plus de détails sur la façon de spécifier les sorties de récupération.

{{% collapse-content title="Arguments" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
: optionnel - _chaîne_
<br/>Le nom de l'opération. Si non fourni, `name` est défini par défaut sur le nom de la fonction tracée.

`session_id`
: optionnel - _chaîne_
<br/>L'ID de la session utilisateur sous-jacente. Voir [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`ml_app`
: optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle l'opération appartient. Voir [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

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

Pour tracer un span de récupération, spécifiez le type de span comme `retrieval` et, éventuellement, les arguments suivants dans l'objet options.

**Note** : Annoter la sortie d'un span de récupération nécessite un formatage différent de celui des autres types de span. Voir [Enrichir les spans](#enriching-spans) pour plus de détails sur la façon de spécifier les sorties de récupération.

{{% collapse-content title="Arguments" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
: optionnel - _chaîne_
<br/>Le nom de l'opération. Si non précisé, `name` prend la valeur du nom de la fonction tracée.

`sessionId`
: optionnel - _chaîne_
<br/>L'ID de la session utilisateur sous-jacente. Voir [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`mlApp`
: optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle l'opération appartient. Voir [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

{{% /collapse-content %}}

#### Exemple

L'exemple suivant montre également comment annoter un span. Voir [Enrichir les spans](#enriching-spans) pour plus de détails sur la façon de spécifier les informations.

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

## Imbrication des spans

Commencer un nouveau span avant que le span actuel ne soit terminé trace automatiquement une relation parent-enfant entre les deux spans. Le span parent représente l'opération principale, tandis que le span enfant représente une sous-opération imbriquée plus petite.

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


## Enrichir les spans

<div class="alert alert-info">
Le paramètre <code>métriques</code> ici fait référence à des valeurs numériques attachées en tant qu'attributs sur des spans individuels — pas <a href="/llm_observability/monitoring/metrics/">métriques de plateforme Datadog</a>. Pour certaines clés reconnues telles que <code>input_tokens</code>, <code>output_tokens</code>, et <code>total_tokens</code>, Datadog utilise ces attributs de span pour générer des métriques de plateforme correspondantes (comme <code>ml_obs.span.llm.input.tokens</code>) à utiliser dans des tableaux de bord et des moniteurs.
</div>

{{< tabs >}}
{{% tab "Python" %}}
Le SDK fournit la méthode `LLMObs.annotate()` pour enrichir les spans avec des entrées, des sorties et des métadonnées.

La méthode `LLMObs.annotate()` accepte les arguments suivants :

{{% collapse-content title="Arguments" level="h4" expanded=false id="annotating-span-arguments" %}}

`span`
: optionnel - _span_ - **par défaut** : le span actif actuel.
<br />Le span à annoter. Si `span` n'est pas fourni (comme lors de l'utilisation de décorateurs de fonction), le SDK annotera le span actif actuel.

`input_data`
: optionnel - _type sérialisable en JSON ou liste de dictionnaires_
<br />Soit un type sérialisable en JSON (pour les spans non-LLM) ou une liste de dictionnaires avec ce format : `{"content": "...", "role": "...", "tool_calls": ..., "tool_results": ...}`, où `"tool_calls"` est une liste optionnelle de dictionnaires d'appels d'outils avec les clés requises : `"name"`, `"arguments"`, et les clés optionnelles : `"tool_id"`, `"type"`, et `"tool_results"` est une liste optionnelle de dictionnaires de résultats d'outils avec la clé requise : `"result"`, et les clés optionnelles : `"name"`, `"tool_id"`, `"type"` pour les scénarios d'appel de fonction. **Note** : Les spans d'embedding sont un cas particulier et nécessitent une chaîne ou un dictionnaire (ou une liste de dictionnaires) avec ce format : `{"text": "..."}`.

`output_data`
: optionnel - _type sérialisable en JSON ou liste de dictionnaires_
<br />Soit un type sérialisable en JSON (pour les spans non-LLM) ou une liste de dictionnaires avec ce format : `{"content": "...", "role": "...", "tool_calls": ...}`, où `"tool_calls"` est une liste optionnelle de dictionnaires d'appels d'outils avec les clés requises : `"name"`, `"arguments"`, et les clés optionnelles : `"tool_id"`, `"type"` pour les scénarios d'appel de fonction. **Note** : Les spans de récupération sont un cas particulier et nécessitent une chaîne ou un dictionnaire (ou une liste de dictionnaires) avec ce format : `{"text": "...", "name": "...", "score": float, "id": "..."}`.

`tool_definitions`
: optionnel - _liste de dictionnaires_
<br />Liste de dictionnaires de définition d'outils pour les scénarios d'appel de fonction. Chaque définition d'outil doit avoir une clé `"name": "..."` requise et des clés optionnelles `"description": "..."` et `"schema": {...}`.

`metadata`
: optionnel - _dictionnaire_
<br />Un dictionnaire de paires clé-valeur sérialisables en JSON que les utilisateurs peuvent ajouter comme informations de métadonnées pertinentes à l'opération d'entrée ou de sortie décrite par la portée (`model_temperature`, `max_tokens`, `top_k`, etc.).

`metrics`
: optionnel - _dictionnaire_
<br />Un dictionnaire de clés sérialisables en JSON et de valeurs numériques que les utilisateurs peuvent ajouter comme métriques pertinentes à l'opération décrite par la portée (`input_tokens`, `output_tokens`, `total_tokens`, `time_to_first_token`, etc.). L'unité pour `time_to_first_token` est en secondes, similaire à la métrique `duration` qui est émise par défaut.

`tags`
: optionnel - _dictionnaire_
<br />Un dictionnaire de paires clé-valeur sérialisables en JSON que les utilisateurs peuvent ajouter en tant que tags sur la portée. Exemples de clés : `session`, `env`, `system` et `version`. Pour plus d'informations sur les balises, voir [Commencer avec les balises](/getting_started/tagging/).

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
Le SDK fournit la méthode `llmobs.annotate()` pour annoter les portées avec des entrées, des sorties et des métadonnées.

La méthode `LLMObs.annotate()` accepte les arguments suivants :

{{% collapse-content title="Arguments" level="h4" expanded=false id="annotating-span-arguments" %}}
`span`
: optionnel - _Portée_ - **par défaut&nbsp;: la portée active actuelle
<br />La portée à annoter. Si `span` n'est pas fourni (comme lors de l'utilisation de wrappers de fonction), le SDK annote la portée active actuelle.

`annotationOptions`
: requis - _objet_
<br />Un objet de différents types de données pour annoter la portée.

L'objet `annotationOptions` peut contenir les éléments suivants :

`inputData`
: optionnel - _type sérialisable en JSON ou liste d'objets_
<br />Soit un type sérialisable en JSON (pour les portées non-LLM) ou une liste de dictionnaires avec ce format : `{role: "...", content: "..."}` (pour les portées LLM).  **Remarque** : Les portées d'incorporation sont un cas particulier et nécessitent une chaîne ou un objet (ou une liste d'objets) avec ce format : `{text: "..."}`.

`outputData`
: optionnel - _type sérialisable en JSON ou liste d'objets_
<br />Soit un type sérialisable en JSON (pour les portées non-LLM) ou une liste d'objets avec ce format : `{role: "...", content: "..."}` (pour les portées LLM). **Remarque** : Les portées de récupération sont un cas particulier et nécessitent une chaîne ou un objet (ou une liste d'objets) avec ce format : `{text: "...", name: "...", score: number, id: "..."}`.

`metadata`
: optionnel - _objet_
<br />Un objet de paires clé-valeur sérialisables en JSON que les utilisateurs peuvent ajouter comme informations de métadonnées pertinentes à l'opération d'entrée ou de sortie décrite par la portée (`model_temperature`, `max_tokens`, `top_k`, etc.).

`metrics`
: optionnel - _objet_
<br />Un objet de clés sérialisables en JSON et de valeurs numériques que les utilisateurs peuvent ajouter comme métriques pertinentes à l'opération décrite par la portée (`input_tokens`, `output_tokens`, `total_tokens`, etc.).

`tags`
: optionnel - _objet_
<br />Un objet de paires clé-valeur sérialisables en JSON que les utilisateurs peuvent ajouter comme tags concernant le contexte de la portée (`session`, `environment`, `system`, `versioning`, etc.). Pour plus d'informations sur les tags, voir [Premiers pas avec les tags](/getting_started/tagging/).

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
Le SDK fournit plusieurs méthodes pour annoter les portées avec des entrées, des sorties, des métriques et des métadonnées.

### Annotation des entrées et des sorties

Utilisez la méthode membre `annotateIO()` de l'interface `LLMObsSpan` pour ajouter des données d'entrée et de sortie structurées à une `LLMObsSpan`. Cela inclut des arguments optionnels et des objets de message LLM.

#### Arguments

Si un argument est nul ou vide, rien ne se passe. Par exemple, si `inputData` est une chaîne non vide tandis que `outputData` est nul, alors seule `inputData` est enregistrée.

`inputData`
: optionnel - _Chaîne_ ou _Liste<LLMObs.LLMMessage>_
<br />Soit une chaîne (pour les portées non-LLM) soit une liste de `LLMObs.LLMMessage` pour les portées LLM.

`outputData`
: optionnel - _Chaîne_ ou _Liste<LLMObs.LLMMessage>_
<br />Soit une chaîne (pour les portées non-LLM) soit une liste de `LLMObs.LLMMessage` pour les portées LLM.

#### Messages LLM
Les tranches LLM doivent être annotées avec des messages LLM en utilisant l'objet `LLMObs.LLMMessage`.

L'objet `LLMObs.LLMMessage` peut être instancié en appelant `LLMObs.LLMMessage.from()` avec les arguments suivants :

`role`
: requis - _Chaîne_
<br />Une chaîne décrivant le rôle de l'auteur du message.

`content`
: requis - _Chaîne_
<br />Une chaîne contenant le contenu du message.

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

### Ajout de métriques

#### Ajout en masse de métriques

La méthode membre `setMetrics()` de l'interface `LLMObsSpan` accepte les arguments suivants pour attacher plusieurs métriques en masse :

##### Arguments

`metrics`
: requis - _Map<String, Nombre>_
<br /> Une carte de clés sérialisables en JSON et de valeurs numériques que les utilisateurs peuvent ajouter pour enregistrer des métriques pertinentes pour l'opération décrite par la portée (par exemple, `input_tokens`, `output_tokens` ou `total_tokens`).

#### Ajouter une seule métrique

La méthode membre `setMetric()` de l'interface `LLMObsSpan` accepte les arguments suivants pour attacher une seule métrique :

##### Arguments

`key`
: requis - _Séquence de caractères_
<br /> Le nom de la métrique.

`value`
: requis - _int_, _long_, ou _double_
<br /> La valeur de la métrique.

#### Exemples

```java
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

### Ajout de tags

Pour plus d'informations sur les tags, voir [Premiers pas avec les tags][1].

#### Ajout en masse de tags

La méthode membre `setTags()` de l'interface `LLMObsSpan` accepte les arguments suivants pour attacher plusieurs tags en masse :

##### Arguments

`tags`
: requis - _Map<String, Object>_
<br /> Une carte de paires clé-valeur sérialisables en JSON que les utilisateurs peuvent ajouter comme tags pour décrire le contexte de la portée (par exemple, `session`, `environment`, `system`, ou `version`).

#### Ajouter un seul tag

La méthode membre `setTag()` de l'interface `LLMObsSpan` accepte les arguments suivants pour attacher un seul tag :

##### Arguments

`key`
: requis - _Chaîne_
<br /> La clé du tag.

`value`
: requis - _int_, _long_, _double_, _booléen_, ou _Chaîne_
<br /> La valeur du tag.

#### Exemples

```java
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

### Annotation des erreurs

#### Ajout d'un Throwable (recommandé)

La méthode membre `addThrowable()` de l'interface `LLMObsSpan` accepte l'argument suivant pour attacher un throwable avec une trace de pile :

##### Arguments

`throwable`
: requis - _Throwable_
<br /> Le throwable/l'exception qui s'est produite.

#### Ajout d'un message d'erreur

La méthode membre `setErrorMessage()` de l'interface `LLMObsSpan` accepte l'argument suivant pour attacher une chaîne d'erreur :

##### Arguments

`errorMessage`
: requis - _Chaîne_
<br /> Le message de l'erreur.

#### Définir un indicateur d'erreur

La méthode membre `setError()` de l'interface `LLMObsSpan` accepte l'argument suivant pour indiquer une erreur avec l'opération :

##### Arguments

`error`
: requis - _boolean_
<br /> `true` si la portée a généré une erreur.

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

### Annotation des métadonnées

La méthode membre `setMetadata()` de l'interface `LLMObsSpan` accepte les arguments suivants :

`metadata`
: requis - _Map<String, Object>_
<br />Une carte de paires clé-valeur sérialisables en JSON qui contient des métadonnées pertinentes pour l'opération d'entrée ou de sortie décrite par la portée.

#### Exemple

```java
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

### Annotation des portées auto-instrumentées

{{< tabs >}}
{{% tab "Python" %}}

La méthode `LLMObs.annotation_context()` du SDK renvoie un gestionnaire de contexte qui peut être utilisé pour modifier toutes les portées auto-instrumentées démarrées pendant que le contexte d'annotation est actif.

La méthode `LLMObs.annotation_context()` accepte les arguments suivants :

{{% collapse-content title="Arguments" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
: optionnel - _str_
<br />Nom qui remplace le nom de la portée pour tous les portées auto-instrumentées qui sont démarrées dans le contexte d'annotation.

`prompt`
: optionnel - _dictionnaire_
<br />Un dictionnaire qui représente l'invite utilisée pour un appel LLM. Voir la documentation de l'objet [Prompt](#prompt-tracking-arguments) pour le schéma complet et les clés prises en charge. Vous pouvez également importer l'objet `Prompt` depuis `ddtrace.llmobs.utils` et le passer en tant qu'argument `prompt`. **Remarque** : Cet argument ne s'applique qu'aux portées LLM.

`tags`
: optionnel - _dictionnaire_
<br />Un dictionnaire de paires clé-valeur sérialisables en JSON que les utilisateurs peuvent ajouter en tant qu'étiquettes sur la portée. Exemples de clés : `session`, `env`, `system`, et `version`. Pour plus d'informations sur les étiquettes, voir [Commencer avec les étiquettes](/getting_started/tagging/).

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

Le `llmobs.annotationContext()` du SDK accepte une fonction de rappel qui peut être utilisée pour modifier toutes les portées auto-instrumentées démarrées pendant l'exécution de la fonction de rappel.

La méthode `llmobs.annotationContext()` accepte les options suivantes en premier argument :

{{% collapse-content title="Options" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
: optionnel - _str_
<br />Nom qui remplace le nom de la portée pour toutes les portées auto-instrumentées démarrées dans le contexte d'annotation.

`tags`
: optionnel - _objet_
<br />Un objet de paires clé-valeur sérialisables en JSON que les utilisateurs peuvent ajouter en tant qu'étiquettes sur la portée. Exemples de clés : `session`, `env`, `system` et `version`. Pour plus d'informations sur les étiquettes, consultez [Démarrer avec les étiquettes](/getting_started/tagging/).

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

## Suivi des invites

Attachez des métadonnées d'invite structurées à la portée du LLM afin de pouvoir reproduire les résultats, auditer les modifications et comparer les performances des invites entre les versions. Lors de l'utilisation de modèles, l'observabilité du LLM fournit également [suivi des versions](#version-tracking) basé sur les modifications de contenu des modèles.

{{< tabs >}}
{{% tab "Python" %}}
Utilisez `LLMObs.annotation_context(prompt=...)` pour attacher des métadonnées d'invite avant l'appel au LLM. Pour plus de détails sur l'annotation de portée, consultez [Enrichissement des portées](#enriching-spans).

#### Arguments

{{% collapse-content title="Arguments" level="h4" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: requis - dictionnaire
<br />Un dictionnaire typé qui suit le schéma d'invite ci-dessous.

{{% /collapse-content %}}

{{% collapse-content title="Structure de l'invite" level="h4" expanded=false id="prompt-structure" %}}

Clés prises en charge :

- `id` (str) : Identifiant logique pour cette invite. Doit être unique par rapport à `ml_app`. Par défaut, cela vaut `{ml_app}-unnamed_prompt`
- `version` (str) : Étiquette de version pour l'invite (par exemple, "1.0.0"). Voir [suivi des versions](#version-tracking) pour plus de détails.
- `variables` (Dict[str, str]) : Variables utilisées pour remplir les espaces réservés du modèle.
- `template` (str) : Chaîne de modèle avec des espaces réservés (par exemple, `"Traduire {{text}} en {{lang}}"`).
- `chat_template` (Liste[Message]): Formulaire de modèle multi-message. Fournir une liste de `{ "role": "<role>", "content": "<template string with placeholders>" }` objets.
- `tags` (Dict[str, str]): Étiquettes à attacher à l'exécution de l'invite.
- `rag_context_variables` (Liste[str]): Clés variables contenant le contenu de vérité de base/contexte. Utilisé pour la détection de [hallucinations](/llm_observability/evaluations/managed_evaluations/?tab=openai#hallucination).
- `rag_query_variables` (Liste[str]): Clés variables contenant la requête de l'utilisateur. Utilisé pour la détection de [hallucinations](/llm_observability/evaluations/managed_evaluations/?tab=openai#hallucination).

{{% /collapse-content %}}

#### Exemple : invite à modèle unique

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

Lorsque vous utilisez le modèle de prompt de LangChain avec auto-instrumentation, assignez des modèles à des variables avec des noms significatifs. L'auto-instrumentation utilise ces noms pour identifier les prompts.

{{< code-block lang="python" >}}
# "translation_template" will be used to identify the template in Datadog
translation_template = PromptTemplate.from_template("Translate {text} to {language}")
chain = translation_template | llm
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

Utilisez `llmobs.annotationContext({ prompt: ... }, () => { ... })` pour attacher des métadonnées d'invite avant l'appel au LLM. Pour plus de détails sur l'annotation de portée, consultez [Enrichissement des portées](#enriching-spans).

#### Arguments

{{% collapse-content title="Options" level="h4" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: requis - objet
<br />Un objet qui suit le schéma d'invite ci-dessous.

{{% /collapse-content %}}

{{% collapse-content title="Structure de l'invite" level="h4" expanded=false id="prompt-structure" %}}

Propriétés prises en charge :

- `id` (chaîne) : Identifiant logique pour ce prompt. Doit être unique par rapport à `ml_app`. Par défaut, cela vaut `{ml_app}-unnamed_prompt`
- `version` (chaîne) : Étiquette de version pour le prompt (par exemple, "1.0.0"). Voir [suivi des versions](#version-tracking) pour plus de détails.
- `variables` (Dictionnaire<string, string>) : Variables utilisées pour remplir les espaces réservés du modèle.
- `template` (chaîne | Liste[Message]) : Chaîne de modèle avec espaces réservés (par exemple, `"Traduire {{text}} en {{lang}}"`). Alternatively, a list of `{ "rôle": "<role>", "contenu": "<template string with placeholders>" }` objets.
- `tags` (Enregistrement<string, string>): Étiquettes à attacher à l'exécution de l'invite.
- `contextVariables` (tableau<string>): Clés de variables contenant le contenu de vérité de base/contexte. Utilisé pour la détection de [hallucinations](/llm_observability/evaluations/managed_evaluations/?tab=openai#hallucination).
- `queryVariables` (tableau<string>): Clés de variables contenant la requête de l'utilisateur. Utilisé pour la détection de [hallucinations](/llm_observability/evaluations/managed_evaluations/?tab=openai#hallucination).

{{% /collapse-content %}}

#### Exemple : invite à modèle unique

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

#### Notes
- L'annotation d'une invite n'est disponible que sur les portées LLM.
- Placez l'annotation immédiatement avant l'appel du fournisseur afin qu'elle s'applique à la bonne portée LLM.
- Utilisez une invite unique `id` pour distinguer différentes invites au sein de votre application.
- Gardez les modèles statiques en utilisant la syntaxe de placeholder (comme `{{variable_name}}`) and define dynamic content in the `variables` section.
- Pour plusieurs appels LLM auto-instrumentés dans un bloc, utilisez un contexte d'annotation pour appliquer les mêmes métadonnées d'invite à travers les appels. Voir [Annotation des portées auto-instrumentées](#annotating-auto-instrumented-spans).

### Suivi des versions

L'observabilité LLM fournit un versionnage automatique pour vos prompts lorsque aucune version explicite n'est spécifiée. Lorsque vous fournissez un `template` ou `chat_template` dans vos métadonnées d'invite sans une étiquette `version`, le système génère automatiquement une version en calculant un hachage du contenu du modèle. Si vous fournissez une étiquette `version`, l'observabilité LLM utilise votre étiquette de version spécifiée au lieu de générer automatiquement une.

Le système de versionnage fonctionne comme suit :
- **Versionnage automatique** : Lorsque aucune étiquette `version` n'est fournie, l'observabilité LLM calcule un hachage du contenu `template` ou `chat_template` pour générer automatiquement un identifiant de version numérique.
- **Versionnage manuel** : Lorsqu'une étiquette `version` est fournie, LLM Observability utilise votre étiquette de version spécifiée exactement comme fournie
- **Historique des versions** : Les versions générées automatiquement et manuellement sont conservées dans l'historique des versions pour suivre l'évolution des invites au fil du temps

Cela vous donne la flexibilité de vous fier soit à la gestion automatique des versions basée sur les changements de contenu du modèle, soit de maintenir un contrôle total sur le versionnage avec vos propres étiquettes de version.

## Surveillance des coûts
Attachez des métriques de jetons (pour le suivi automatique des coûts) ou des métriques de coûts (pour le suivi manuel des coûts) à vos portées LLM/embedding. Les métriques de jetons permettent à Datadog de calculer les coûts en utilisant les prix du fournisseur, tandis que les métriques de coûts vous permettent de fournir vos propres prix lors de l'utilisation de modèles personnalisés ou non pris en charge. Pour plus de détails, voir [Coûts][14].

Si vous utilisez une instrumentation automatique, les métriques de jetons et de coûts apparaissent automatiquement sur vos portées. Si vous instrumentez manuellement, suivez les instructions ci-dessous.

<div class="alert alert-info">Dans ce contexte, "métriques de jetons" et "métriques de coûts" se réfèrent à des paires clé-valeur numériques que vous attachez aux portées via le paramètre <code>metrics</code> de la méthode <code>LLMObs.annotate()</code>. Celles-ci sont distinctes des <a href="/llm_observability/monitoring/metrics/">métriques LLM Observability de la plateforme Datadog</a>. Pour les clés reconnues telles que <code>input_tokens</code>, <code>output_tokens</code>, <code>input_cost</code>, et <code>output_cost</code>, Datadog utilise ces attributs d'étendue pour générer des métriques de plateforme correspondantes (telles que <code>ml_obs.span.llm.input.cost</code>) à utiliser dans les tableaux de bord et les moniteurs.</div>

{{< tabs >}}
{{% tab "Python" %}}

#### Cas d'utilisation : Utilisation d'un fournisseur de modèle commun
Datadog prend en charge des fournisseurs de modèles communs tels qu'OpenAI, Azure OpenAI, Anthropic et Google Gemini. Lorsque vous utilisez ces fournisseurs, vous devez simplement annoter votre demande LLM avec `model_name`, `model_provider`, et l'utilisation des jetons. Datadog calcule automatiquement le coût estimé en fonction des prix du fournisseur.

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

#### Cas d'utilisation : Utilisation d'un modèle personnalisé
Pour les modèles personnalisés ou non pris en charge, vous devez annoter la portée manuellement avec les données de coût.

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

Le SDK LLM Observability fournit des méthodes pour exporter et soumettre vos évaluations à Datadog.

<div class="alert alert-info">Pour créer des évaluateurs réutilisables basés sur des classes (<code>BaseEvaluator</code>, <code>BaseSummaryEvaluator</code>) avec des métadonnées de résultats riches, consultez le <a href="/llm_observability/guide/evaluation_developer_guide/">Guide du développeur d'évaluation</a>.</div>

Les évaluations doivent être regroupées en une seule portée. Vous pouvez identifier la portée cible en utilisant l'une de ces deux méthodes :
- _Regroupement basé sur des balises_ - Regroupez une évaluation en utilisant une paire de balises clé-valeur unique qui est définie sur une seule portée. L'évaluation échouera à se regrouper si la paire clé-valeur de balises correspond à plusieurs portées ou à aucune portée.
- _Référence directe à la portée_ - Regroupez une évaluation en utilisant la combinaison unique de l'ID de trace et de l'ID de la portée.

### Exporter une portée.
{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.export_span()` peut être utilisé pour extraire le contexte de la portée. Cette méthode est utile pour associer votre évaluation à l'intervalle correspondant.

#### Arguments
La méthode `LLMObs.export_span()` accepte l'argument suivant :

`span`
: optionnel - _Intervalle_
<br />L'intervalle à partir duquel extraire le contexte de l'intervalle (IDs d'intervalle et de trace). Si non fourni (comme lors de l'utilisation de décorateurs de fonction), le SDK exporte l'intervalle actif actuel.

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
`llmobs.exportSpan()` peut être utilisé pour extraire le contexte de l'intervalle à partir d'un intervalle. Vous devrez utiliser cette méthode pour associer votre évaluation à l'intervalle correspondant.

#### Arguments

La méthode `llmobs.exportSpan()` accepte l'argument suivant :

`span`
: optionnel - _Intervalle_
<br />L'intervalle à partir duquel extraire le contexte de l'intervalle (IDs d'intervalle et de trace). Si non fourni (comme lors de l'utilisation d'enveloppes de fonction), le SDK exporte l'intervalle actif actuel.

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
`LLMObs.submit_evaluation()` peut être utilisé pour soumettre votre évaluation personnalisée associée à un intervalle donné.

<div class="alert alert-info"><code>LLMObs.submit_evaluation_for</code> est obsolète et sera supprimé dans la prochaine version majeure de ddtrace (4.0). Pour migrer, renommez vos appels <code>LLMObs.submit_evaluation_for</code> avec <code>LLMObs.submit_evaluation</code>.</div>

**Remarque** : Les évaluations personnalisées sont des évaluateurs que vous implémentez et hébergez vous-même. Celles-ci diffèrent des évaluations prêtes à l'emploi, qui sont automatiquement calculées par Datadog à l'aide d'évaluateurs intégrés. Pour configurer des évaluations prêtes à l'emploi pour votre application, utilisez la page [**Observabilité LLM** > **Paramètres** > **Évaluations**][1] dans Datadog.

La méthode `LLMObs.submit_evaluation()` accepte les arguments suivants :

{{% collapse-content title="Arguments" level="h4" expanded=false id="submit-evals-arguments" %}}
`label`
: requis - _chaîne_
<br />Le nom de l'évaluation.

`metric_type`
: requis - _chaîne_
<br />Le type de l'évaluation. Doit être `categorical`, `score`, `boolean` ou `json`.

`value`
: requis - _chaîne, type numérique ou dict_
<br />La valeur de l'évaluation. Doit être une chaîne (`metric_type==categorical`), un entier/float (`metric_type==score`), un booléen (`metric_type==boolean`) ou un dict (`metric_type==json`).

`span`
: optionnel - _dictionnaire_
<br />Un dictionnaire qui identifie de manière unique l'intervalle associé à cette évaluation. Doit contenir `span_id` (chaîne) et `trace_id` (chaîne). Utilisez [`LLMObs.export_span()`](#exporting-a-span) pour générer ce dictionnaire.

`span_with_tag_value`
: optionnel - _dictionnaire_
<br />Un dictionnaire qui identifie de manière unique la portée associée à cette évaluation. Doit contenir `tag_key` (chaîne) et `tag_value` (chaîne).

   **Remarque** : Exactement un de `span` ou `span_with_tag_value` est requis. Fournir les deux, ou aucun, soulève une ValueError.

`ml_app`
: requis - _chaîne_
<br />Le nom de l'application ML.

`timestamp_ms`
: optionnel - _entier_
<br />L'horodatage unix en millisecondes lorsque le résultat de la métrique d'évaluation a été généré. S'il n'est pas fourni, la valeur par défaut est l'heure actuelle.

`tags`
: optionnel - _dictionnaire_
<br />Un dictionnaire de paires clé-valeur de chaînes que les utilisateurs peuvent ajouter comme étiquettes concernant l'évaluation. Pour plus d'informations sur les étiquettes, voir [Commencer avec les étiquettes](/getting_started/tagging/).

`assessment`
: optionnel - _chaîne_
<br />Une appréciation de cette évaluation. Les valeurs acceptées sont `pass` et `fail`.

`reasoning`
: optionnel - _chaîne_
<br />Une explication textuelle du résultat de l'évaluation.

`metadata`
: optionnel - _dictionnaire_
<br />Un dictionnaire contenant des métadonnées structurées arbitraires associées au résultat de l'évaluation.
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

`llmobs.submitEvaluation()` peut être utilisé pour soumettre votre évaluation personnalisée associée à une portée donnée.

La méthode `llmobs.submitEvaluation()` accepte les arguments suivants :

{{% collapse-content title="Arguments" level="h4" expanded=false id="submit-evals-arguments" %}}

`span_context`
: requis - _dictionnaire_
<br />Le contexte de la portée à associer à l'évaluation. Ceci devrait être la sortie de `LLMObs.export_span()`.

`evaluationOptions`
: requis - _objet_
<br />Un objet contenant les données de l'évaluation.

L'objet `evaluationOptions` peut contenir les éléments suivants :

`label`
: requis - _chaîne_
<br />Le nom de l'évaluation.

`metricType`
: requis - _chaîne_
<br />Le type de l'évaluation. Doit être l'un des suivants : "catégorique", "score", "booléen" ou "json".

`value`
: requis - _chaîne ou numérique_
<br />La valeur de l'évaluation. Doit être une chaîne (pour catégorique `metric_type`), un nombre (pour score `metric_type`), un booléen (pour booléen `metric_type`), ou un objet JSON (pour json `metric_type`).

`tags`
: optionnel - _dictionnaire_
<br />Un dictionnaire de paires clé-valeur de chaînes que les utilisateurs peuvent ajouter comme étiquettes concernant l'évaluation. Pour plus d'informations sur les étiquettes, voir [Commencer avec les étiquettes](/getting_started/tagging/).

`assessment`
: optionnel - _chaîne_
<br />Une appréciation de cette évaluation. Les valeurs acceptées sont `pass` et `fail`.

`reasoning`
: optionnel - _chaîne_
<br />Une explication textuelle du résultat de l'évaluation.

`metadata`
: optionnel - _dictionnaire_
<br />Un objet JSON contenant des métadonnées structurées arbitraires associées au résultat de l'évaluation.
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

Utilisez `LLMObs.SubmitEvaluation()` pour soumettre votre évaluation personnalisée associée à une portée donnée.

La méthode `LLMObs.SubmitEvaluation()` accepte les arguments suivants :

{{% collapse-content title="Arguments" level="h4" expanded=false id="submit-evals-arguments" %}}

`llmObsSpan`
: requis - _LLMObsSpan_
<br />Le contexte de la portée à associer à l'évaluation.

`label`
: requis - _chaîne_
<br />Le nom de l'évaluation.

`categoricalValue` ou `scoreValue`
: requis - _chaîne_ ou _double_
<br />La valeur de l'évaluation. Doit être une chaîne (pour les évaluations catégorielles) ou un double (pour les évaluations de score).

`tags`
: optionnel - _Map<String, Object>_
<br />Un dictionnaire de paires clé-valeur de chaînes utilisé pour étiqueter l'évaluation. Pour plus d'informations sur les étiquettes, voir [Commencer avec les étiquettes](/getting_started/tagging/).
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

Pour modifier les données d'entrée et de sortie sur les portées, vous pouvez configurer une fonction de traitement. La fonction du processeur a accès aux étiquettes de la portée pour permettre la modification conditionnelle des entrées/sorties. Les fonctions du processeur peuvent soit renvoyer la portée modifiée pour l'émettre, soit renvoyer `None`/`null` pour empêcher la portée d'être entièrement émise. Ceci est utile pour filtrer les portées contenant des données sensibles ou répondant à certains critères.

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

Lors de l'utilisation de l'auto-instrumentation, la portée n'est pas toujours accessible contextuellement. Pour modifier conditionnellement les entrées et sorties sur les portées auto-instrumentées, `annotation_context()` peut être utilisé en plus d'un processeur de portée.

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

### Exemple : empêcher les portées d'être émises

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

Lors de l'utilisation de l'auto-instrumentation, la portée n'est pas toujours accessible contextuellement. Pour modifier conditionnellement les entrées et sorties sur les portées auto-instrumentées, `llmobs.annotationContext()` peut être utilisé en plus d'un processeur de portée.

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

### Exemple : empêcher les portées d'être émises

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

Le suivi des sessions permet d'associer plusieurs interactions à un utilisateur donné.

{{< tabs >}}
{{% tab "Python" %}}
Lors du démarrage d'une portée racine pour un nouveau trace ou une portée dans un nouveau processus, spécifiez l'argument `session_id` avec l'ID de chaîne de la session utilisateur sous-jacente, qui est soumis comme une étiquette sur la portée. En option, vous pouvez également spécifier les étiquettes `user_handle`, `user_name` et `user_id`.

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

### Étiquettes de suivi de session

| Étiquette | Description |
|---|---|
| `session_id` | L'ID représentant une seule session utilisateur, par exemple, une session de chat. |
| `user_handle` | Le pseudonyme de l'utilisateur de la session de chat. |
| `user_name` | Le nom de l'utilisateur de la session de chat. |
| `user_id` | L'ID de l'utilisateur de la session de chat. |
{{% /tab %}}

{{% tab "Node.js" %}}
Lors du démarrage d'une portée racine pour un nouveau trace ou une portée dans un nouveau processus, spécifiez l'argument `sessionId` avec l'ID de chaîne de la session utilisateur sous-jacente :

{{< code-block lang="javascript" >}}
function processMessage() {
    ... # user application logic
    return
}
processMessage = llmobs.wrap({ kind: 'workflow', sessionId: "<SESSION_ID>" }, processMessage)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
Lors du démarrage d'une portée racine pour un nouveau trace ou une portée dans un nouveau processus, spécifiez l'argument `sessionId` avec l'ID de chaîne de la session utilisateur sous-jacente :

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

Le SDK prend en charge le traçage à travers des services ou des hôtes distribués. Le traçage distribué fonctionne en propageant les informations de portée à travers les requêtes web.

{{< tabs >}}
{{% tab "Python" %}}

La bibliothèque `ddtrace` fournit certaines intégrations prêtes à l'emploi qui prennent en charge le traçage distribué pour des bibliothèques de [framework web][1] et [HTTP][2] populaires. Si votre application effectue des requêtes en utilisant ces bibliothèques prises en charge, vous pouvez activer le traçage distribué en exécutant :
{{< code-block lang="python">}}
from ddtrace import patch
patch(<INTEGRATION_NAME>=True)
{{< /code-block >}}

Si votre application n'utilise aucune de ces bibliothèques prises en charge, vous pouvez activer le traçage distribué en propageant manuellement les informations de portée vers et depuis les en-têtes HTTP. Le SDK fournit les méthodes d'aide `LLMObs.inject_distributed_headers()` et `LLMObs.activate_distributed_headers()` pour injecter et activer les contextes de traçage dans les en-têtes de requête.

### Injection des en-têtes distribués

La méthode `LLMObs.inject_distributed_headers()` prend une portée et injecte son contexte dans les en-têtes HTTP à inclure dans la requête. Cette méthode accepte les arguments suivants :

`request_headers`
: requis - _dictionnaire_
<br />Les en-têtes HTTP à étendre avec les attributs de contexte de traçage.

`span`
: optionnel - _Portée_ - **par défaut** : `The current active span.`
<br />La portée à injecter dans les en-têtes de requête fournis. Par défaut, cela correspond à la portée active actuelle.

### Activation des en-têtes distribués

La méthode `LLMObs.activate_distributed_headers()` prend des en-têtes HTTP et extrait les attributs de contexte de traçage à activer dans le nouveau service.

**Remarque** : Vous devez appeler `LLMObs.activate_distributed_headers()` avant de commencer toute portée dans votre service en aval. Les portées commencées auparavant (y compris les portées de décorateur de fonction) ne sont pas capturées dans le traçage distribué.

Cette méthode accepte l'argument suivant :

`request_headers`
: requis - _dictionnaire_
<br />Les en-têtes HTTP pour extraire les attributs de contexte de traçage.


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

La bibliothèque `dd-trace` fournit des intégrations prêtes à l'emploi qui prennent en charge le traçage distribué pour les [frameworks web][1] populaires. L'activation du traceur active automatiquement ces intégrations, mais vous pouvez les désactiver optionnellement avec :

{{< code-block lang="javascript">}}
const tracer = require('dd-trace').init({
  llmobs: { ... },
})
tracer.use('http', false) // disable the http integration
{{< /code-block >}}

[1]: /fr/tracing/trace_collection/compatibility/nodejs/#web-framework-compatibility
{{% /tab %}}
{{< /tabs >}}


## Traçage avancé

{{< tabs >}}
{{% tab "Python" %}}
### Traçage des portées en utilisant des méthodes en ligne

Pour chaque type de portée, la classe `ddtrace.llmobs.LLMObs` fournit une méthode en ligne correspondante pour tracer automatiquement l'opération impliquée par un bloc de code donné. Ces méthodes ont la même signature d'argument que leurs homologues de décorateur de fonction, avec l'ajout que `name` a pour valeur par défaut le type de portée (`llm`, `workflow`, etc.) s'il n'est pas fourni. Ces méthodes peuvent être utilisées comme gestionnaires de contexte pour terminer automatiquement la portée après l'achèvement du bloc de code inclus.

#### Exemple

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    with LLMObs.workflow(name="process_message", session_id="<SESSION_ID>", ml_app="<ML_APP>") as workflow_span:
        ... # user application logic
    return
{{< /code-block >}}

### Faire persister une portée à travers les contextes

Pour démarrer et arrêter manuellement une portée dans différents contextes ou périmètres :

1. Démarrer une portée manuellement en utilisant les mêmes méthodes (par exemple, la méthode `LLMObs.workflow` pour une portée de flux de travail), mais comme un appel de fonction simple plutôt qu'en tant que gestionnaire de contexte.
2. Passer l'objet de la portée comme argument à d'autres fonctions.
3. Arrêter la portée manuellement avec la méthode `span.finish()`. **Remarque** : la portée doit être terminée manuellement, sinon elle n'est pas soumise.

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

#### Forcer le vidage dans des environnements sans serveur

`LLMObs.flush()` est une fonction bloquante qui soumet toutes les données mises en mémoire tampon de LLM Observability au backend Datadog. Cela peut être utile dans des environnements sans serveur pour empêcher une application de se fermer tant que toutes les traces de LLM Observability ne sont pas soumises.

### Traçage de plusieurs applications

Le SDK prend en charge le traçage de plusieurs applications LLM à partir du même service.

Vous pouvez configurer une variable d'environnement `DD_LLMOBS_ML_APP` au nom de votre application LLM, dans laquelle toutes les portées générées sont regroupées par défaut.

Pour remplacer cette configuration et utiliser un nom d'application LLM différent pour une portée racine donnée, passez l'argument `ml_app` avec le nom sous forme de chaîne de l'application LLM sous-jacente lors du démarrage d'une portée racine pour une nouvelle trace ou d'une portée dans un nouveau processus.

{{< code-block lang="python">}}
from ddtrace.llmobs.decorators import workflow

@workflow(name="process_message", ml_app="<NON_DEFAULT_ML_APP_NAME>")
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
### Traçage des portées en utilisant des méthodes en ligne

Le `llmobs` SDK fournit une méthode en ligne correspondante pour tracer automatiquement l'opération qu'implique un bloc de code donné. Ces méthodes ont la même signature d'argument que leurs homologues de fonction, avec l'ajout que `name` est requis, car le nom ne peut pas être déduit d'un rappel anonyme. Cette méthode terminera la portée dans les conditions suivantes :

- Si la fonction retourne une promesse, alors la portée se termine lorsque la promesse est résolue ou rejetée.
- Si la fonction prend un rappel comme dernier paramètre, alors la portée se termine lorsque ce rappel est appelé.
- Si la fonction n'accepte pas de rappel et ne retourne pas de promesse, alors la portée se termine à la fin de l'exécution de la fonction.

#### Exemple sans rappel

{{< code-block lang="javascript" >}}
function processMessage () {
  return llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, workflowSpan => {
    ... // user application logic
    return
  })
}
{{< /code-block >}}

#### Exemple avec un rappel

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

### Décorateurs de fonction en TypeScript

Le SDK LLM Observability de Node.js propose une `llmobs.decorate` fonction qui sert de décorateur de fonction pour les applications TypeScript. Le comportement de traçage de cette fonction est le même que `llmobs.wrap`.

#### Exemple

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

### Forcer le vidage dans des environnements sans serveur

`llmobs.flush()` est une fonction bloquante qui soumet toutes les données mises en mémoire tampon de LLM Observability au backend Datadog. Cela peut être utile dans des environnements sans serveur pour empêcher une application de se fermer tant que toutes les traces de LLM Observability ne sont pas soumises.

### Traçage de plusieurs applications

Le SDK prend en charge le traçage de plusieurs applications LLM à partir du même service.

Vous pouvez configurer une variable d'environnement `DD_LLMOBS_ML_APP` au nom de votre application LLM, dans laquelle toutes les portées générées sont regroupées par défaut.

Pour remplacer cette configuration et utiliser un nom d'application LLM différent pour une portée racine donnée, passez l'argument `mlApp` avec le nom sous forme de chaîne de l'application LLM sous-jacente lors du démarrage d'une portée racine pour une nouvelle trace ou d'une portée dans un nouveau processus.

{{< code-block lang="javascript">}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'processMessage', mlApp: '<NON_DEFAULT_ML_APP_NAME>' }, processMessage)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Directives de nommage des applications

Le nom de votre application (la valeur de `DD_LLMOBS_ML_APP`) doit suivre ces directives :

- Doit être une chaîne Unicode en minuscules
- Peut contenir jusqu'à 193 caractères
- Ne peut pas contenir de traits de soulignement contigus ou en fin de chaîne
- Peut contenir les caractères suivants :
   - Alphanumériques
   - Traits de soulignement
   - Tirets
   - Deux-points
   - Points
   - Barres

## Lectures complémentaires

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