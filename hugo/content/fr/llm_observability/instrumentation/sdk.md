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
description: Documentation de référence pour les SDK Agent Observability pour Python,
  Node.js et Java, couvrant l'instrumentation automatique et manuelle.
further_reading:
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: Blog
  text: Suivez, comparez et optimisez vos prompts LLM avec Datadog LLM Observability.
title: Référence du SDK Agent Observability.
---
## Présentation {#overview}

Les SDK Agent Observability fournissent une instrumentation automatique ainsi que des API d'instrumentation manuelle pour offrir de l'observabilité et des insights sur vos applications LLM.

## Configuration {#setup}

### Prérequis {#requirements}

- Une [clé d'API Datadog][1].

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
- Vous avez téléchargé le dernier [`dd-trace-java` JAR][1]. Le SDK Agent Observability est pris en charge dans `dd-trace-java` v1.51.0+ (Java 8+ requis).

[1]: https://github.com/DataDog/dd-trace-java
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="Configuration en ligne de commande" level="h4" expanded=false id="command-line-setup" %}}

{{< tabs >}}
{{% tab "Python" %}}
Activez Agent Observability en exécutant votre application avec la commande `ddtrace-run` et en spécifiant les variables d'environnement requises.

**Remarque**: `ddtrace-run` active automatiquement toutes les intégrations Agent Observability.

{{< code-block lang="shell">}}
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

#### Variables d'environnement pour la configuration en ligne de commande {#environment-variables-for-command-line-setup}

`DD_SITE`
: requis - _chaîne_
<br />Site Datadog de destination pour la soumission de données LLM. Votre site est {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: requis - _entier ou chaîne_
<br />Basculez pour activer la soumission de données à Agent Observability. Doit être défini sur `1` ou `true`.

`DD_LLMOBS_ML_APP`
:  optionnel - _chaîne_
<br />Le nom de votre application, service ou projet LLM, sous lequel toutes les traces et tous les spans sont regroupés. Cela permet de distinguer les différentes applications ou expériences. Consultez [les directives de nommage des applications](#application-naming-guidelines) pour connaître les caractères autorisés et les autres contraintes. Pour remplacer cette valeur pour un span racine donné, consultez [Tracer plusieurs applications](#tracing-multiple-applications). Si elle n'est pas fournie, cette valeur prend par défaut celle de [`DD_SERVICE`][1], ou la valeur d'un `DD_LLMOBS_ML_APP` propagé depuis un service en amont.
<br />**Remarque**: Avant la version `ddtrace==3.14.0`, il s'agit d'un **champ obligatoire**.

`DD_LLMOBS_AGENTLESS_ENABLED`
: facultatif - _entier ou chaîne_ - **par défaut**: `false`
<br />Requis uniquement si vous n'utilisez pas le Datadog Agent, auquel cas cela doit être défini sur `1` ou `true`.

`DD_LLMOBS_SAMPLE_RATE`
: facultatif - _nombre à virgule flottante_ - **par défaut** : `1.0`
<br />La fraction de traces conservée par Agent Observability. Voir [Échantillonnage de traces](#trace-sampling).

`DD_API_KEY`
: optionnel - _ chaîne_
<br />Votre clé d'API Datadog. Requis uniquement si vous n'utilisez pas le Datadog Agent.

`DD_MCP_CAPTURE_INTENT`
: facultatif - _entier ou chaîne_ - **par défaut** : `false`
<br />Lorsqu'il est défini sur `1` ou `true`, ajoute un argument à chaque outil de serveur MCP demandant au modèle appelant de décrire pourquoi il a choisi d'appeler l'outil. L'intention est enregistrée sur le span de l'outil.

[1]: /fr/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}


{{% tab "Node.js" %}}
Activez Agent Observability en exécutant votre application avec `NODE_OPTIONS="--import dd-trace/initialize.mjs"` et en spécifiant les variables d'environnement requises.

**Remarque**: `dd-trace/initialize.mjs` active automatiquement toutes les intégrations APM.

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> NODE_OPTIONS="--import dd-trace/initialize.mjs" node <YOUR_APP_ENTRYPOINT>
```

#### Variables d'environnement pour la configuration en ligne de commande {#environment-variables-for-command-line-setup-1}

`DD_SITE`
: requis - _chaîne_
<br />Le site Datadog vers lequel soumettre vos données LLM. Votre site est {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: requis - _entier ou chaîne_
<br />Basculez pour activer la soumission de données à Agent Observability. Doit être défini sur `1` ou `true`.

`DD_LLMOBS_ML_APP`
:  optionnel - _chaîne_
<br />Le nom de votre application, service ou projet LLM, sous lequel toutes les traces et tous les spans sont regroupés. Cela permet de distinguer les différentes applications ou expériences. Consultez [les directives de nommage des applications](#application-naming-guidelines) pour connaître les caractères autorisés et les autres contraintes. Pour remplacer cette valeur pour un span racine donné, consultez [Tracer plusieurs applications](#tracing-multiple-applications). Si elle n'est pas fournie, cette valeur prend par défaut celle de [`DD_SERVICE`][1], ou la valeur d'un `DD_LLMOBS_ML_APP` propagé depuis un service en amont.
<br />**Remarque**: Avant la version `dd-trace@5.66.0`, il s'agit d'un **champ obligatoire**.

`DD_LLMOBS_AGENTLESS_ENABLED`
: facultatif - _entier ou chaîne_ - **par défaut**: `false`
<br />Requis uniquement si vous n'utilisez pas le Datadog Agent, auquel cas cela doit être défini sur `1` ou `true`.

`DD_LLMOBS_SAMPLE_RATE`
: facultatif - _nombre à virgule flottante_ - **par défaut** : `1.0`
<br />La fraction de traces conservée par Agent Observability. Voir [Échantillonnage de traces](#trace-sampling).

`DD_API_KEY`
: optionnel - _ chaîne_
<br />Votre clé d'API Datadog. Requis uniquement si vous n'utilisez pas le Datadog Agent.

[1]: /fr/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}
{{% tab "Java" %}}

Activez Agent Observability en exécutant votre application avec `dd-trace-java` et en spécifiant les paramètres requis sous forme de variables d'environnement ou de propriétés système.

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> \
java -javaagent:path/to/your/dd-trace-java-jar/dd-java-agent-SNAPSHOT.jar \
-Ddd.service=my-app -Ddd.llmobs.enabled=true -Ddd.llmobs.ml.app=my-ml-app -jar path/to/your/app.jar
```

#### Variables d'environnement et propriétés système {#environment-variables-and-system-properties}

Vous pouvez fournir les paramètres suivants sous forme de variables d'environnement (par exemple, `DD_LLMOBS_ENABLED`) ou de propriétés système Java (par exemple, `dd.llmobs_enabled`).

`DD_SITE` ou `dd.site`
:  requis - _chaîne_
<br />Site Datadog de destination pour la soumission de données LLM. Votre site est {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED` ou `dd.llmobs.enabled`
: requis - _entier ou chaîne_
<br />Basculez pour activer la soumission de données à Agent Observability. Doit être défini sur `1` ou `true`.

`DD_LLMOBS_ML_APP` ou `dd.llmobs.ml.app`
:  optionnel - _chaîne_
<br />Le nom de votre application, service ou projet LLM, sous lequel toutes les traces et tous les spans sont regroupés. Cela permet de distinguer les différentes applications ou expériences. Consultez [les directives de nommage des applications](#application-naming-guidelines) pour connaître les caractères autorisés et les autres contraintes. Pour remplacer cette valeur pour un span racine donné, consultez [Tracer plusieurs applications](#tracing-multiple-applications). Si elle n'est pas fournie, cette valeur prend par défaut celle de [`DD_SERVICE`][1], ou la valeur d'un `DD_LLMOBS_ML_APP` propagé depuis un service en amont.
<br />**Remarque**: Avant la version 1.54.0 de `dd-trace-java`, il s'agit d'un **champ obligatoire**.

`DD_LLMOBS_AGENTLESS_ENABLED` ou `dd.llmobs.agentless.enabled`
: facultatif - _entier ou chaîne de caractères_ - **par défaut** : `false`
<br />Requis uniquement si vous n'utilisez pas le Datadog Agent, auquel cas cela doit être défini sur `1` ou `true`.

`DD_API_KEY` ou `dd.api.key`
: optionnel - _ chaîne_
<br />Votre clé d'API Datadog. Requis uniquement si vous n'utilisez pas le Datadog Agent.

[1]: /fr/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Configuration dans le code" level="h4" expanded=false id="in-code-setup" %}}

Au lieu d'utiliser la configuration en ligne de commande [](#command-line-setup), vous pouvez également activer Agent Observability par programmation.

{{< tabs >}}
{{% tab "Python" %}}

Utilisez la fonction `LLMObs.enable()` pour activer Agent Observability.

<div class="alert alert-info">
N'utilisez pas cette méthode de configuration avec la commande. <code>ddtrace-run</code> N'utilisez pas cette méthode de configuration avec la commande.
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

##### Paramètres {#parameters}

`ml_app`
:  optionnel - _chaîne_
<br />Le nom de votre application, service ou projet LLM, sous lequel toutes les traces et tous les spans sont regroupés. Cela permet de distinguer les différentes applications ou expériences. Consultez [les directives de nommage des applications](#application-naming-guidelines) pour connaître les caractères autorisés et les autres contraintes. Pour remplacer cette valeur pour une trace donnée, consultez [Tracer plusieurs applications](#tracing-multiple-applications). Si aucune valeur n'est fournie, la valeur par défaut est `DD_LLMOBS_ML_APP`.

`integrations_enabled` - **par défaut**: `true`
: optionnel - _booléen_
<br />Un indicateur pour activer automatiquement le traçage des appels LLM pour les [intégrations LLM][1] prises en charge par Datadog. Si aucune valeur n'est fournie, toutes les intégrations LLM prises en charge sont activées par défaut. Pour éviter d'utiliser les intégrations LLM, définissez cette valeur sur `false`.

`agentless_enabled`
: optionnel - _booléen_ - **par défaut** : `false`
<br />Requis uniquement si vous n'utilisez pas le Datadog Agent, auquel cas cela doit être défini sur `True`. Ceci configure la bibliothèque `ddtrace` pour ne pas envoyer de données nécessitant le Datadog Agent. S'il n'est pas fourni, la valeur par défaut est celle de `DD_LLMOBS_AGENTLESS_ENABLED`.

`site`
: optionnel - _ chaîne_
<br />Le site Datadog vers lequel soumettre vos données LLM. Votre site est {{< region-param key="dd_site" code="true" >}}. S'il n'est pas fourni, la valeur par défaut est celle de `DD_SITE`.

`api_key`
:  optionnel - _chaîne_
<br />Votre clé d'API Datadog. Requis uniquement si vous n'utilisez pas le Datadog Agent. S'il n'est pas fourni, la valeur par défaut est celle de `DD_API_KEY`.

`env`
:  optionnel - _chaîne_
<br />Le nom de l'environnement de votre application (exemples: `prod`, `pre-prod`, `staging`). S'il n'est pas fourni, la valeur par défaut est celle de `DD_ENV`.

`service`
:  optionnel - _chaîne_
<br />Le nom du service utilisé pour votre application. S'il n'est pas fourni, la valeur par défaut est celle de `DD_SERVICE`.

`sample_rate`
: optionnel - _float_
<br />La fraction de traces conservée par Agent Observability. Nécessite `ddtrace` 4.12.0 ou une version ultérieure. Lorsqu'il est défini, ceci prévaut sur `DD_LLMOBS_SAMPLE_RATE`. Voir [Échantillonnage de traces](#trace-sampling).

`capture_intent`
: optionnel - _booléen_ - **par défaut** : `false`
<br />Lorsqu'il est défini sur `True`, ajoute un argument à chaque outil de serveur MCP demandant au modèle appelant de décrire pourquoi il a choisi d'appeler l'outil. L'intention est enregistrée sur le span de l'outil. S'il n'est pas fourni, la valeur par défaut est celle de `DD_MCP_CAPTURE_INTENT`.

[1]: /fr/llm_observability/instrumentation/auto_instrumentation/
{{% /tab %}}

{{% tab "Node.js" %}}

<div class="alert alert-info">
N'utilisez pas cette méthode de configuration avec la <code>dd-trace/initialize.mjs</code> commande.
</div>

Utilisez la fonction `init()` pour activer Agent Observability.

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

**Options pour la configuration `llmobs`**

`mlApp`
:  optionnel - _chaîne_
<br />Le nom de votre application, service ou projet LLM, sous lequel toutes les traces et tous les spans sont regroupés. Cela permet de distinguer les différentes applications ou expériences. Consultez [les directives de nommage des applications](#application-naming-guidelines) pour connaître les caractères autorisés et les autres contraintes. Pour remplacer cette valeur pour une trace donnée, consultez [le traçage de plusieurs applications](#tracing-multiple-applications). S'il n'est pas fourni, la valeur par défaut est `DD_LLMOBS_ML_APP`.

`agentlessEnabled`
: optionnel - _booléen_ - **par défaut**: `false`
<br />Uniquement requis si vous n'utilisez pas le Datadog Agent, auquel cas il doit être défini sur `true`. Ceci configure la bibliothèque `dd-trace` pour ne pas envoyer de données nécessitant le Datadog Agent. S'il n'est pas fourni, la valeur par défaut est `DD_LLMOBS_AGENTLESS_ENABLED`.

`sampleRate`
: optionnel - _nombre_
<br />La fraction de traces conservée par Agent Observability. Nécessite `dd-trace` 5.110.0 ou une version ultérieure. Lorsqu'il est défini, ceci prévaut sur `DD_LLMOBS_SAMPLE_RATE`. Voir [Échantillonnage de traces](#trace-sampling).

**Options de configuration générale du traceur** :

`site`
: optionnel - _ chaîne_
<br />Le site Datadog vers lequel soumettre vos données LLM. Votre site est {{< region-param key="dd_site" code="true" >}}. S'il n'est pas fourni, la valeur par défaut est celle de `DD_SITE`.

`env`
:  optionnel - _chaîne_
<br />Le nom de l'environnement de votre application (exemples: `prod`, `pre-prod`, `staging`). S'il n'est pas fourni, la valeur par défaut est `DD_ENV`.

`service`
:  optionnel - _chaîne_
<br />Le nom du service utilisé pour votre application. S'il n'est pas fourni, la valeur par défaut est celle de `DD_SERVICE`.

##### Variables d'environnement {#environment-variables}

Définissez les valeurs suivantes en tant que variables d'environnement. Elles ne peuvent pas être configurées par programmation.

`DD_API_KEY`
: optionnel - _ chaîne_
<br />Votre clé d'API Datadog. Requis uniquement si vous n'utilisez pas le Datadog Agent.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Configuration d'AWS Lambda" level="h4" expanded=false id="aws-lambda-setup" %}}

Pour instrumenter une fonction AWS Lambda existante avec Agent Observability, vous pouvez utiliser l'extension Datadog et les couches de langage respectives.

1. Ouvrez un Cloudshell dans la console AWS.
2. Installez le client CLI Datadog

```shell
npm install -g @datadog/datadog-ci
```
3. Définissez la clé d'API et le site Datadog

```shell
export DD_API_KEY=<YOUR_DATADOG_API_KEY>
export DD_SITE=<YOUR_DATADOG_SITE>
```
Si vous possédez déjà ou préférez utiliser un secret dans Secrets Manager, vous pouvez définir la clé d'API en utilisant l'ARN du secret :

```shell
export DATADOG_API_KEY_SECRET_ARN=<DATADOG_API_KEY_SECRET_ARN>
```
4. Installez votre fonction Lambda avec Agent Observability (cela nécessite au moins la version 77 de la couche d'extension Datadog)
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

4. Appelez votre fonction Lambda et vérifiez que les traces Agent Observability sont visibles dans l'interface utilisateur Datadog.

Videz manuellement les traces Agent Observability en utilisant la méthode `flush` avant que la fonction Lambda ne renvoie une valeur.

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


Après avoir installé le SDK et exécuté votre application, vous devriez voir des données dans Agent Observability provenant de l'auto-instrumentation. L'instrumentation manuelle peut être utilisée pour capturer des frameworks personnalisés ou des opérations provenant de bibliothèques qui ne sont pas encore prises en charge.

## Échantillonnage des traces {#trace-sampling}

<div class="alert alert-info">L'échantillonnage des traces est disponible dans le SDK Python (<code>ddtrace</code> 4.12.0 ou version ultérieure) et le SDK Node.js (<code>dd-trace</code> 5.110.0 ou version ultérieure). Le SDK Java ne prend pas en charge l'échantillonnage des traces.</div>

L'échantillonnage des traces définit la fraction de traces qu'Agent Observability conserve. Comme la facturation d'Agent Observability est basée sur le volume de spans que vous envoyez, définir un taux d'échantillonnage est un moyen de contrôler vos coûts liés à Agent Observability. Le SDK prend la décision d'échantillonnage sur le span racine et l'applique à tous les spans enfants de ce span racine, y compris les spans créés dans les services en aval via le [distributed tracing](#distributed-tracing).

L'échantillonnage n'affecte pas vos [métriques d'Agent Observability](/llm_observability/monitoring/metrics/), y compris les [métriques de token et de coût](/llm_observability/monitoring/cost/). Comme les spans non échantillonnés sont supprimés après que Datadog a ingéré vos traces, ces métriques restent basées sur 100 % du trafic instrumenté de votre application, quel que soit le taux d'échantillonnage spécifié. L'échantillonnage des traces est également indépendant des contrôles intégrés à l'application tels que les [règles d'automatisation](/llm_observability/monitoring/automation_rules/) et l'[échantillonnage des traces APM](/tracing/trace_pipeline/ingestion_mechanisms/), qui s'appliquent après l'ingestion.

Configurez le taux d'échantillonnage via l'un des deux mécanismes suivants :

- **Variable d'environnement** (`DD_LLMOBS_SAMPLE_RATE`) : s'applique à la fois à la [configuration en ligne de commande](#command-line-setup) et à la [configuration dans le code](#in-code-setup).
- **Paramètre dans le code** (`sample_rate` en Python, `sampleRate` en Node.js) : transmis à `LLMObs.enable()` en Python, ou sous `llmobs` en Node.js, lorsque vous activez le SDK avec la [configuration dans le code](#in-code-setup). Lorsqu'il est défini, il prévaut sur `DD_LLMOBS_SAMPLE_RATE`.

Le taux d'échantillonnage est un nombre à virgule flottante compris entre `0.0` (aucune trace conservée) et `1.0` (toutes les traces conservées). La valeur par défaut est `1.0`. Les valeurs hors plage sont ignorées.

{{< tabs >}}
{{% tab "Python" %}}
Définissez le taux d'échantillonnage avec la variable d'environnement :

{{< code-block lang="shell" >}}
DD_LLMOBS_SAMPLE_RATE=0.5 ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

Ou passez `sample_rate` à `LLMObs.enable()`, qui prévaut sur la variable d'environnement :

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  sample_rate=0.5,
)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
Définissez le taux d'échantillonnage avec la variable d'environnement :

{{< code-block lang="shell" >}}
DD_LLMOBS_SAMPLE_RATE=0.5 NODE_OPTIONS="--import dd-trace/initialize.mjs" <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

Ou passez `sampleRate` sous `llmobs` à `init()`, qui prévaut sur la variable d'environnement :

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>",
    sampleRate: 0.5,
  },
});

const llmobs = tracer.llmobs;
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Instrumentation manuelle {#manual-instrumentation}

{{< tabs >}}
{{% tab "Python" %}}

Pour capturer une opération LLM, un décorateur de fonction peut être utilisé pour instrumenter facilement les flux de travail :

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def handle_user_request():
    ...
{{< /code-block >}}

ou une approche basée sur un gestionnaire de contexte pour capturer des opérations précises :

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


Pour obtenir une liste des types de spans disponibles, consultez la [documentation sur les types de spans][1]. Pour un traçage plus granulaire des opérations au sein des fonctions, consultez [Traçage des spans à l'aide de méthodes en ligne](#tracing-spans-using-inline-methods).

[1]: /fr/llm_observability/terms/
{{% /tab %}}

{{% tab "Node.js" %}}

Pour tracer un span, utilisez `llmobs.wrap(options, function)` comme wrapper de fonction pour la fonction que vous souhaitez tracer. Pour obtenir une liste des types de spans disponibles, consultez la [documentation sur les types de spans][1]. Pour un traçage plus granulaire des opérations au sein des fonctions, consultez [Traçage des spans à l'aide de méthodes en ligne](#tracing-spans-using-inline-methods).

### Types de span {#span-kinds}

Les types de span sont requis et sont spécifiés sur l'objet `options` passé aux fonctions de traçage `llmobs` (`trace`, `wrap` et `decorate`). Consultez la [documentation sur les types de span][1] pour obtenir une liste des types de span pris en charge.

**Remarque :** Les spans avec un type de span non valide ne sont pas soumis à Agent Observability.

### Capture automatique des arguments/sorties/noms de fonction {#automatic-function-argumentoutputname-capturing}

`llmobs.wrap` (ainsi que [`llmobs.decorate`](#function-decorators-in-typescript) pour TypeScript) tente de capturer automatiquement les entrées, les sorties et le nom de la fonction en cours de traçage. Si vous devez annoter manuellement un span, consultez [Enrichissement des spans](#enriching-spans). Les entrées et sorties que vous annotez remplaceront la capture automatique. De plus, pour remplacer le nom de la fonction, passez la propriété `name` sur l'objet d'options à la fonction `llmobs.wrap` :

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'differentFunctionName' }, processMessage)
{{< /code-block >}}

### Conditions de fin d'un span pour une fonction enveloppée {#conditions-for-finishing-a-span-for-a-wrapped-function}

`llmobs.wrap` étend le comportement sous-jacent de [`tracer.wrap`][2]. Le span sous-jacent créé lors de l'appel de la fonction est terminé dans les conditions suivantes :

- Si la fonction renvoie une promesse, le span se termine lorsque la promesse est résolue ou rejetée.
- Si la fonction prend une fonction de rappel comme dernier paramètre, le span se termine lorsque cette fonction de rappel est appelée.
- Si la fonction n'accepte pas de fonction de rappel et ne renvoie pas de promesse, le span se termine à la fin de l'exécution de la fonction.

L'exemple suivant illustre la deuxième condition, où le dernier argument est une fonction de rappel :

#### Exemple {#example}

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

Si l'application n'utilise pas la fonction de rappel, il est recommandé d'utiliser un bloc tracé en ligne à la place. Consultez [Traçage des spans à l'aide de méthodes en ligne](#tracing-spans-using-inline-methods) pour plus d'informations.

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

### Démarrage d'un span {#starting-a-span}

Il existe plusieurs méthodes pour démarrer un span, selon le type de span que vous démarrez. Consultez la [documentation sur les types de span][1] pour obtenir une liste des types de span pris en charge.

Tous les spans sont démarrés en tant qu'instance d'objet de `LLMObsSpan`. Chaque span possède des méthodes que vous pouvez utiliser pour interagir avec le span et enregistrer des données.

### Terminer un span {#finishing-a-span}

Les spans doivent être terminés pour que la trace soit soumise et visible dans l'application Datadog.

Pour terminer un span, appelez `finish()` sur une instance d'objet de span. Si possible, enveloppez le span dans un bloc `try/finally` pour vous assurer que le span est soumis même si une exception se produit.

#### Exemple {#example-1}

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

### Appels LLM {#llm-calls}

<div class="alert alert-info">Si vous utilisez des fournisseurs ou des frameworks LLM pris en charge par <a href="/llm_observability/instrumentation/auto_instrumentation/">les intégrations LLM de Datadog</a>, vous n'avez pas besoin de démarrer manuellement un span LLM pour tracer ces opérations.</div>

<div class="alert alert-info">Si vous instrumentez manuellement un span LLM, vous devez enregistrer les nombres de jetons (tels que <code>input_tokens</code>, <code>output_tokens</code>, et <code>total_tokens</code>) en annotant le span. Consultez <a href="#enriching-spans">Enrichissement des spans</a> pour plus d'informations.</div>

{{< tabs >}}
{{% tab "Python" %}}
Pour tracer un appel LLM, utilisez le décorateur de fonction `ddtrace.llmobs.decorators.llm()`.

{{% collapse-content title="Arguments" level="h4" expanded=false id="llm-span-arguments" %}}

`model_name`
:  requis - _chaîne_
<br/>Le nom du LLM appelé.

`name`
:  optionnel - _chaîne_
<br/>Le nom de l'opération. S'il n'est pas fourni, `name` prend par défaut le nom de la fonction tracée.

`model_provider`
: optionnel - _chaîne_ - **par défaut**: `"custom"`
<br />Le nom du fournisseur de modèle.
<br />**Remarque**: Pour afficher le coût estimé en dollars américains, définissez `model_provider` sur l'une des valeurs suivantes : `openai`, `azure_openai` ou `anthropic`.

`session_id`
: optionnel - _ chaîne_
<br/>L'identifiant de la session utilisateur sous-jacente. Consultez [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`ml_app`
: optionnel - _ chaîne_
<br/>Le nom de l'application ML à laquelle appartient l'opération. Consultez [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

{{% /collapse-content %}}

#### Exemple {#example-2}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call(prompt):
    completion = ... # user application logic to invoke LLM
    LLMObs.annotate(
        input_data=[{"role": "user", "content": prompt}],
        output_data=[{"role": "assistant", "content": completion}],
        metrics={"input_tokens": 4, "output_tokens": 6, "total_tokens": 10},
    )
    return completion
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
Pour tracer un appel LLM, spécifiez le type de span comme `llm`, et spécifiez éventuellement les arguments suivants sur l'objet options.

{{% collapse-content title="Arguments" level="h4" expanded=false id="llm-span-arguments" %}}

`modelName`
: optionnel - _chaîne_ - **par défaut**: `"custom"`
<br/>Le nom du LLM appelé.

`name`
:  optionnel - _chaîne_
<br/>Le nom de l'opération. S'il n'est pas fourni, `name` prend par défaut le nom de la fonction tracée.

`modelProvider`
: optionnel - _chaîne_ - **par défaut**: `"custom"`
<br/>Le nom du fournisseur de modèle.
<br />**Remarque** : Pour afficher le coût estimé en dollars américains, définissez `modelProvider` sur l'une des valeurs suivantes : `openai`, `azure_openai` ou `anthropic`.

`sessionId`
: optionnel - _ chaîne_
<br/>L'identifiant de la session utilisateur sous-jacente. Consultez [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`mlApp`
: optionnel - _ chaîne_
<br/>Le nom de l'application ML à laquelle appartient l'opération. Consultez [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

{{% /collapse-content %}}

#### Exemple {#example-3}

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const completion = ... // user application logic to invoke LLM
  llmobs.annotate({
    inputData: [{ role: "user", content: prompt }],
    outputData: [{ role: "assistant", content: completion }],
    metrics: { input_tokens: 4, output_tokens: 6, total_tokens: 10 }
  })
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Pour tracer un appel LLM, importez et appelez la méthode suivante avec les arguments listés ci-dessous :

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startLLMSpan(spanName, modelName, modelProvider, mlApp, sessionID);
```

{{% collapse-content title="Arguments" level="h4" expanded=false id="llm-span-arguments" %}}

`spanName`
: optionnel - _chaîne_
<br/>Le nom de l'opération. S'il n'est pas fourni, `spanName` prend par défaut le type de span.

`modelName`
: optionnel - _chaîne_ - **par défaut**: `"custom"`
<br/>Le nom du LLM appelé.

`modelProvider`
: optionnel - _chaîne_ - **par défaut**: `"custom"`
<br/>Le nom du fournisseur de modèle.
<br />**Remarque** : Pour afficher le coût estimé en dollars américains, définissez `modelProvider` sur l'une des valeurs suivantes : `openai`, `azure_openai` ou `anthropic`.

`mlApp`
: optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle appartient l'opération. La fourniture d'une valeur non nulle remplace le nom de l'application ML fourni au démarrage de l'application. Consultez [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

`sessionId`
: optionnel - _chaîne_
<br/>L'identifiant de la session utilisateur sous-jacente. Consultez [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

{{% /collapse-content %}}

#### Exemple {#example-4}

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeModel() {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String inference = ... // user application logic to invoke LLM
    llmSpan.annotateIO(...); // record the input and output
    llmSpan.setMetrics(Map.of(
      "input_tokens", 617,
      "output_tokens", 338,
      "total_tokens", 955
    ));
    llmSpan.finish();
    return inference;
  }
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


### Workflows {#workflows}

{{< tabs >}}
{{% tab "Python" %}}
Pour tracer un span de workflow, utilisez le décorateur de fonction `ddtrace.llmobs.decorators.workflow()`.

{{% collapse-content title="Arguments" level="h4" expanded=false id="workflow-span-arguments" %}}
`name`
:  optionnel - _chaîne_
<br/>Le nom de l'opération. S'il n'est pas fourni, `name` prend par défaut le nom de la fonction tracée.

`session_id`
:  optionnel - _chaîne_
<br/>L'identifiant de la session utilisateur sous-jacente. Consultez [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`ml_app`
:  optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle appartient l'opération. Consultez [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

{{% /collapse-content %}}

#### Exemple {#example-5}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

Pour tracer un span de workflow, spécifiez le type de span comme `workflow` et spécifiez éventuellement des arguments sur l'objet options.

{{% collapse-content title="Arguments" level="h4" expanded=false id="workflow-span-arguments" %}}

`name`
:  optionnel - _chaîne_
<br/>Le nom de l'opération. S'il n'est pas fourni, `name` prend par défaut le nom de la fonction tracée.

`sessionId`
:  optionnel - _chaîne_
<br/>L'identifiant de la session utilisateur sous-jacente. Consultez [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`mlApp`
:  optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle appartient l'opération. Consultez [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

{{% /collapse-content %}}

#### Exemple {#example-6}

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow' }, processMessage)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Pour tracer un span de workflow, importez et appelez la méthode suivante avec les arguments listés ci-dessous :

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startWorkflowSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Arguments" level="h4" expanded=false id="workflow-span-arguments" %}}

`spanName`
: optionnel - _chaîne_
<br/>Le nom de l'opération. S'il n'est pas fourni, `spanName` prend par défaut le type de span.

`mlApp`
: optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle appartient l'opération. La fourniture d'une valeur non nulle remplace le nom de l'application ML fourni au démarrage de l'application. Consultez [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

`sessionId`
: optionnel - _chaîne_
<br/>L'identifiant de la session utilisateur sous-jacente. Consultez [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

{{% /collapse-content %}}

#### Exemple {#example-7}

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


### Agents {#agents}

{{< tabs >}}
{{% tab "Python" %}}
Pour tracer l'exécution d'un agent, utilisez le décorateur de fonction `ddtrace.llmobs.decorators.agent()`.

{{% collapse-content title="Arguments" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
:  optionnel - _chaîne_
<br/>Le nom de l'opération. S'il n'est pas fourni, `name` prend par défaut le nom de la fonction tracée.

`session_id`
:  optionnel - _chaîne_
<br/>L'identifiant de la session utilisateur sous-jacente. Consultez [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`ml_app`
:  optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle appartient l'opération. Consultez [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.
{{% /collapse-content %}}

#### Exemple {#example-8}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import agent

@agent
def react_agent():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
Pour tracer l'exécution d'un agent, spécifiez le type de span comme `agent` et spécifiez éventuellement des arguments sur l'objet options.

{{% collapse-content title="Arguments" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
:  optionnel - _chaîne_
<br/>Le nom de l'opération. S'il n'est pas fourni, `name` prend par défaut le nom de la fonction tracée.

`sessionId`
:  optionnel - _chaîne_
<br/>L'identifiant de la session utilisateur sous-jacente. Consultez [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`mlApp`
:  optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle appartient l'opération. Consultez [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

{{% /collapse-content %}}

#### Exemple {#example-9}

{{< code-block lang="javascript" >}}
function reactAgent () {
  ... // user application logic
  return
}
reactAgent = llmobs.wrap({ kind: 'agent' }, reactAgent)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Pour tracer l'exécution d'un agent, importez et appelez la méthode suivante avec les arguments listés ci-dessous

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startAgentSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Arguments" level="h4" expanded=false id="agent-span-arguments" %}}

`spanName`
: optionnel - _chaîne_
<br/>Le nom de l'opération. S'il n'est pas fourni, `spanName` prend par défaut le nom de la fonction tracée.

`mlApp`
: optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle appartient l'opération. La fourniture d'une valeur non nulle remplace le nom de l'application ML fourni au démarrage de l'application. Consultez [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

`sessionId`
: optionnel - _chaîne_
<br/>L'identifiant de la session utilisateur sous-jacente. Consultez [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Appels d'outils {#tool-calls}

{{< tabs >}}
{{% tab "Python" %}}
Pour tracer un appel d'outil, utilisez le décorateur de fonction `ddtrace.llmobs.decorators.tool()`.

{{% collapse-content title="Arguments" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
:  optionnel - _chaîne_
<br/>Le nom de l'opération. S'il n'est pas fourni, `name` prend par défaut le nom de la fonction tracée.

`session_id`
:  optionnel - _chaîne_
<br/>L'identifiant de la session utilisateur sous-jacente. Consultez [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`ml_app`
:  optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle appartient l'opération. Consultez [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

{{% /collapse-content %}}

#### Exemple {#example-10}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import tool

@tool
def call_weather_api():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
Pour tracer un appel d'outil, spécifiez le type de span comme `tool` et, éventuellement, spécifiez des arguments sur l'objet options.

{{% collapse-content title="Arguments" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
:  optionnel - _chaîne_
<br/>Le nom de l'opération. S'il n'est pas fourni, `name` prend par défaut le nom de la fonction tracée.

`sessionId`
:  optionnel - _chaîne_
<br/>L'identifiant de la session utilisateur sous-jacente. Consultez [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`mlApp`
:  optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle appartient l'opération. Consultez [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

{{% /collapse-content %}}

#### Exemple {#example-11}

{{< code-block lang="javascript" >}}
function callWeatherApi () {
  ... // user application logic
  return
}
callWeatherApi = llmobs.wrap({ kind: 'tool' }, callWeatherApi)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Pour tracer un appel d'outil, importez et appelez la méthode suivante avec les arguments listés ci-dessous :

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startToolSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Arguments" level="h4" expanded=false id="tool-span-arguments" %}}

`spanName`
: optionnel - _chaîne_
<br/>Le nom de l'opération. S'il n'est pas fourni, `spanName` prend par défaut le nom de la fonction tracée.

`mlApp`
: optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle appartient l'opération. La fourniture d'une valeur non nulle remplace le nom de l'application ML fourni au démarrage de l'application. Consultez [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

`sessionId`
: optionnel - _chaîne_
<br/>L'identifiant de la session utilisateur sous-jacente. Consultez [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Tâches {#tasks}

{{< tabs >}}
{{% tab "Python" %}}
Pour tracer un span de tâche, utilisez le décorateur de fonction `LLMObs.task()`.

{{% collapse-content title="Arguments" level="h4" expanded=false id="task-span-arguments" %}}

`name`
:  optionnel - _chaîne_
<br/>Le nom de l'opération. S'il n'est pas fourni, `name` prend par défaut le nom de la fonction tracée.

`session_id`
:  optionnel - _chaîne_
<br/>L'identifiant de la session utilisateur sous-jacente. Consultez [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`ml_app`
:  optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle appartient l'opération. Consultez [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

{{% /collapse-content %}}

#### Exemple {#example-12}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import task

@task
def sanitize_input():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
Pour tracer un span de tâche, spécifiez le span kind comme `task` et, éventuellement, spécifiez des arguments sur l'objet options.

{{% collapse-content title="Arguments" level="h4" expanded=false id="task-span-arguments" %}}

`name`
:  optionnel - _chaîne_
<br/>Le nom de l'opération. S'il n'est pas fourni, `name` prend par défaut le nom de la fonction tracée.

`sessionId`
:  optionnel - _chaîne_
<br/>L'identifiant de la session utilisateur sous-jacente. Consultez [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`mlApp`
:  optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle appartient l'opération. Consultez [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

{{% /collapse-content %}}

#### Exemple {#example-13}

{{< code-block lang="javascript" >}}
function sanitizeInput () {
  ... // user application logic
  return
}
sanitizeInput = llmobs.wrap({ kind: 'task' }, sanitizeInput)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Pour tracer un task span, importez et appelez la méthode suivante avec les arguments listés ci-dessous :

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startTaskSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Arguments" level="h4" expanded=false id="task-span-arguments" %}}

`spanName`
: optionnel - _chaîne_
<br/>Le nom de l'opération. S'il n'est pas fourni, `spanName` prend par défaut le nom de la fonction tracée.

`mlApp`
: optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle appartient l'opération. La fourniture d'une valeur non nulle remplace le nom de l'application ML fourni au démarrage de l'application. Consultez [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

`sessionId`
: optionnel - _chaîne_
<br/>L'identifiant de la session utilisateur sous-jacente. Consultez [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.


{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Embeddings {#embeddings}

{{< tabs >}}
{{% tab "Python" %}}
Pour tracer une embedding operation, utilisez le décorateur de fonction `LLMObs.embedding()`.

**Remarque** : L'annotation de l'entrée d'un span embedding nécessite un formatage différent de celui des autres types de span. Consultez [Enrichissement des spans](#enriching-spans) pour plus de détails sur la façon de spécifier les entrées d'embedding.

{{% collapse-content title="Arguments" level="h4" expanded=false id="embedding-span-arguments" %}}

`model_name`
:  requis - _chaîne_
<br/>Le nom du LLM appelé.

`name`
:  optionnel - _chaîne_
<br/>Le nom de l'opération. S'il n'est pas fourni, `name` est défini sur le nom de la fonction tracée.

`model_provider`
: optionnel - _chaîne_ - **par défaut**: `"custom"`

`session_id`
:  optionnel - _chaîne_
<br/>L'identifiant de la session utilisateur sous-jacente. Consultez [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`ml_app`
: optionnel - _ chaîne_
<br/>Le nom de l'application ML à laquelle appartient l'opération. Consultez [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

{{% /collapse-content %}}

#### Exemple {#example-14}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import embedding

@embedding(model_name="text-embedding-3", model_provider="openai")
def perform_embedding():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
Pour tracer une embedding operation, spécifiez le span kind comme `embedding`, et spécifiez éventuellement des arguments sur l'objet options.

**Remarque** : L'annotation de l'entrée d'un span embedding nécessite un formatage différent de celui des autres types de span. Consultez [Enrichissement des spans](#enriching-spans) pour plus de détails sur la façon de spécifier les entrées d'embedding.

{{% collapse-content title="Arguments" level="h4" expanded=false id="embedding-span-arguments" %}}

`modelName`
: optionnel - _String_ - **par défaut**: `"custom"`
<br/>Le nom du LLM invoqué.

`name`
:  optionnel - _chaîne_
<br/>Le nom de l'opération. S'il n'est pas fourni, `name` est défini sur le nom de la fonction tracée.

`modelProvider`
: optionnel - _String_ - **par défaut**: `"custom"`
<br/>Le nom du fournisseur de modèle.

`sessionId`
: optionnel - _ chaîne_
<br/>L'identifiant de la session utilisateur sous-jacente. Consultez [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`mlApp`
: optionnel - _ chaîne_
<br/>Le nom de l'application ML à laquelle appartient l'opération. Consultez [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

{{% /collapse-content %}}

#### Exemple {#example-15}

{{< code-block lang="javascript" >}}
function performEmbedding () {
  ... // user application logic
  return
}
performEmbedding = llmobs.wrap({ kind: 'embedding', modelName: 'text-embedding-3', modelProvider: 'openai' }, performEmbedding)
{{< /code-block >}}


{{% /tab %}}
{{< /tabs >}}

### Retrievals {#retrievals}

{{< tabs >}}
{{% tab "Python" %}}
Pour tracer un span de récupération, utilisez le décorateur de fonction `ddtrace.llmobs.decorators.retrieval()`.

**Remarque** : L'annotation de la sortie d'un retrieval span nécessite un formatage différent de celui des autres types de span. Consultez [Enrichissement des spans](#enriching-spans) pour plus de détails sur la façon de spécifier les sorties de récupération.

{{% collapse-content title="Arguments" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
:  optionnel - _chaîne_
<br/>Le nom de l'opération. S'il n'est pas fourni, `name` prend par défaut le nom de la fonction tracée.

`session_id`
:  optionnel - _chaîne_
<br/>L'identifiant de la session utilisateur sous-jacente. Consultez [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`ml_app`
:  optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle appartient l'opération. Consultez [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

{{% /collapse-content %}}

#### Exemple {#example-16}

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

Pour tracer un span de récupération, spécifiez le type de span comme `retrieval`, et spécifiez éventuellement les arguments suivants sur l'objet options.

**Remarque** : L'annotation de la sortie d'un retrieval span nécessite un formatage différent de celui des autres types de span. Consultez [Enrichissement des spans](#enriching-spans) pour plus de détails sur la façon de spécifier les sorties de récupération.

{{% collapse-content title="Arguments" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
:  optionnel - _chaîne_
<br/>Le nom de l'opération. S'il n'est pas fourni, `name` prend par défaut le nom de la fonction tracée.

`sessionId`
:  optionnel - _chaîne_
<br/>L'identifiant de la session utilisateur sous-jacente. Consultez [Suivi des sessions utilisateur](#tracking-user-sessions) pour plus d'informations.

`mlApp`
:  optionnel - _chaîne_
<br/>Le nom de l'application ML à laquelle appartient l'opération. Consultez [Traçage de plusieurs applications](#tracing-multiple-applications) pour plus d'informations.

{{% /collapse-content %}}

#### Exemple {#example-17}

Ce qui suit inclut également un exemple d'annotation d'un span. Consultez [Enrichissement des spans](#enriching-spans) pour plus d'informations.

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

## Imbrication des spans {#nesting-spans}

Le démarrage d'un nouveau span avant que le span actuel ne soit terminé trace automatiquement une relation parent-enfant entre les deux spans. Le span parent représente l'opération plus large, tandis que le span enfant représente une sous-opération imbriquée plus petite au sein de celui-ci.

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


## Enrichissement des spans {#enriching-spans}

<div class="alert alert-info">
Le <code>metrics</code> Le paramètre ici fait référence aux valeurs numériques jointes en tant qu'attributs sur des spans individuels — et non aux <a href="/llm_observability/monitoring/metrics/">métriques de la plateforme Datadog</a>. Pour certaines clés reconnues telles que <code>input_tokens</code>, <code>output_tokens</code>, et <code>total_tokens</code>, Datadog utilise ces attributs de span pour générer les métriques de plateforme correspondantes (telles que <code>ml_obs.span.llm.input.tokens</code>) pour une utilisation dans les dashboards et les moniteurs.
</div>

{{< tabs >}}
{{% tab "Python" %}}
Le SDK fournit la méthode `LLMObs.annotate()` pour enrichir les spans avec des entrées, des sorties et des métadonnées.

La méthode `LLMObs.annotate()` accepte les arguments suivants :

{{% collapse-content title="Arguments" level="h3" expanded=false id="annotating-span-arguments" %}}

`span`
: optionnel - _Span_ - **par défaut**: le span actif actuel
<br />Le span à annoter. Si `span` n'est pas fourni (comme lors de l'utilisation de décorateurs de fonction), le SDK annote le span actif actuel.

`input_data`
: optionnel - _JSON serializable type or list of dictionaries_
<br />Either a JSON serializable type (for non-LLM spans) or a list of dictionaries with this format: `{"content": \"...\", \"role\": \"...\", \"tool_calls\": ..., \"tool_results\": ..., \"audio_parts\": ..., \"image_parts\": ...}`, où `"tool_calls"` est une liste optionnelle de dictionnaires d'appels d'outils avec les clés requises : `"name"`, `"arguments"`, et `"tool_id"` , `"type"` et `"tool_results"` est une liste optionnelle de dictionnaires de résultats d'outils avec la clé requise : `"result"`, et les clés optionnelles : `"name"`, `"tool_id"`, `"type"` pour les scénarios d'appel de fonction. `"audio_parts"` et `"image_parts"` sont des listes facultatives de dictionnaires de médias pour les spans multimodaux, chacun avec un `"mime_type"` requis et exactement l'un des suivants : `"content"` (média encodé en base64, inclus en ligne) ou `"attachment_key"`. **Note** : Les spans d'embedding sont un cas particulier et nécessitent une chaîne ou un dictionnaire (ou une liste de dictionnaires) avec ce format : `{"text": "..."}`.

`output_data`
a: facultatif - _type sérialisable en JSON ou liste de dictionnaires_
<br />Soit un type sérialisable en JSON (pour les spans non-LLM), soit une liste de dictionnaires avec ce format : `{"content": "...", "role": "...", "tool_calls": ..., "audio_parts": ..., "image_parts": ...}`, où `"tool_calls"` est une liste facultative de dictionnaires d'appels d'outils avec les clés requises : `"name"`, `"arguments"`, et les clés facultatives : `"tool_id"`, `"type"` pour les scénarios d'appel de fonction. `"audio_parts"` et `"image_parts"` sont des listes facultatives de dictionnaires de médias pour les spans multimodaux, chacun avec un `"mime_type"` requis et exactement l'un des suivants : `"content"` (média encodé en base64, inclus en ligne) ou `"attachment_key"`. **Note** : Les spans de récupération sont un cas particulier et nécessitent une chaîne ou un dictionnaire (ou une liste de dictionnaires) avec ce format : `{"text": "...", "name": "...", "score": float, "id": "..."}`.

`tool_definitions`
a: facultatif - _liste de dictionnaires_
<br />Liste de dictionnaires de définition d'outils pour les scénarios d'appel de fonction. Chaque définition d'outil doit avoir une clé `"name": "..."` requise et des clés `"description": "..."` et `"schema": {...}` facultatives.

`metadata`
a: facultatif - _dictionnaire_
<br />Un dictionnaire de paires clé-valeur sérialisables en JSON que les utilisateurs peuvent ajouter en tant qu'informations de métadonnées pertinentes pour l'opération d'entrée ou de sortie décrite par le span (`model_temperature`, `max_tokens`, `top_k`, etc.).

`metrics`
a: facultatif - _dictionnaire_
<br />Un dictionnaire de clés sérialisables en JSON et de valeurs numériques que les utilisateurs peuvent ajouter en tant que métriques pertinentes pour l'opération décrite par le span (`input_tokens`, `output_tokens`, `total_tokens`, `time_to_first_token`, etc.). L'unité pour `time_to_first_token` est en secondes, similaire à la métrique `duration` qui est émise par défaut.

`tags`
a: facultatif - _dictionnaire_
<br />Un dictionnaire de paires clé-valeur sérialisables en JSON que les utilisateurs peuvent ajouter en tant que tags sur le span. Exemples de clés : `session`, `env`, `system` et `version`. Pour plus d'informations sur les tags, consultez [Getting Started with Tags](/getting_started/tagging/).

`cost_tags`
a: facultatif - _liste de chaînes_
<br />Une liste de clés de tag (déjà définies avec `tags` ou annotées précédemment sur le même span) à propager en tant que tags personnalisés sur les métriques de coût et de jeton LLM générées. Les entrées qui ne font pas référence à une clé de tag existante sont ignorées. Voir [Suivi des coûts](#cost-monitoring) pour plus de détails.

{{% /collapse-content %}}

#### Exemple {#example-18}

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

@llm(model_name="gpt-realtime", model_provider="openai")
def voice_turn(user_audio_bytes):
    import base64
    resp = ... # multimodal (audio) llm call here
    LLMObs.annotate(
        span=None,
        input_data=[
            {
                "role": "user",
                "content": "Hey, how are you?",  # transcript of the input audio
                "audio_parts": [
                    {"mime_type": "audio/wav", "content": base64.b64encode(user_audio_bytes).decode("utf-8")}
                ],
            }
        ],
        output_data=[
            {
                "role": "assistant",
                "content": "Hey! I'm doing great, thanks for asking. How about you?",
                "audio_parts": [
                    {"mime_type": "audio/wav", "content": base64.b64encode(resp.audio_bytes).decode("utf-8")}
                ],
            }
        ],
    )
    return resp

@llm(model_name="gpt-4o", model_provider="openai")
def describe_image(image_bytes):
    import base64
    resp = ... # multimodal (vision) llm call here
    LLMObs.annotate(
        span=None,
        input_data=[
            {
                "role": "user",
                "content": "What is in this image?",
                "image_parts": [
                    {"mime_type": "image/png", "content": base64.b64encode(image_bytes).decode("utf-8")}
                ],
            }
        ],
        output_data=[{"role": "assistant", "content": "The image shows a golden retriever puppy."}],
    )
    return resp

{{< /code-block >}}

Les messages annotés avec `audio_parts` ou `image_parts` s'affichent sous forme de lecteurs audio et d'images intégrés dans la vue de trace :

{{< img src="llm_observability/instrumentation/audio_example.png" alt="Un span LLM dans la vue de trace Agent Observability. Le message d'entrée de l'UTILISATEUR affiche un lecteur audio intégré avec la transcription « Hey, how are you? », et le message de sortie de l'ASSISTANT affiche une commande « Click to play audio » avec la transcription « Hey! ». Je vais très bien, merci de demander. « How about you? »." style="width:100%;" >}}

{{< img src="llm_observability/instrumentation/image_example.png" alt="Un span LLM dans la vue de trace Agent Observability. Le message d'entrée de l'UTILISATEUR affiche l'invite « What is in this image? ». avec une photo intégrée d'un chiot noir, et le message de sortie de l'ASSISTANT le décrit comme un chiot Labrador Retriever noir sur une surface en bois." style="width:100%;" >}}

{{% /tab %}}

{{% tab "Node.js" %}}
Le SDK fournit la méthode `llmobs.annotate()` pour annoter les spans avec des entrées, des sorties et des métadonnées.

La méthode `LLMObs.annotate()` accepte les arguments suivants :

{{% collapse-content title="Arguments" level="h3" expanded=false id="annotating-span-arguments" %}}
`span`
: optionnel - _Span_ - **par défaut**: le span actif actuel
<br />Le span à annoter. Si `span` n'est pas fourni (comme lors de l'utilisation de wrappers de fonction), le SDK annote le span actif.

`annotationOptions`
: requis - _objet_
<br />Un objet de différents types de données pour annoter le span.

L'objet `annotationOptions` peut contenir les éléments suivants :

`inputData`
: facultatif - _type sérialisable en JSON ou liste d'objets_
<br />Soit un type sérialisable en JSON (pour les spans non-LLM), soit une liste de dictionnaires avec ce format: `{role: \"...\", content: \"...\", audioParts: [...], imageParts: [...]}` (pour les spans LLM). `audioParts` et `imageParts` sont des listes facultatives d'objets multimédias pour les spans multimodaux, chacun avec un `mimeType` requis et exactement un élément parmi `content` (média encodé en base64, transporté en ligne) ou `attachmentKey`. **Remarque** : Les spans d'embedding sont un cas particulier et nécessitent une chaîne ou un objet (ou une liste d'objets) avec ce format : `{text: "..."}`.

`outputData`
: facultatif - _type sérialisable en JSON ou liste d'objets_
<br />Soit un type sérialisable en JSON (pour les spans non-LLM), soit une liste d'objets avec ce format : `{role: "...", content: "...", audioParts: [...], imageParts: [...]}` (pour les spans LLM). `audioParts` et `imageParts` sont des listes facultatives d'objets multimédias pour les spans multimodaux, chacun avec un `mimeType` requis et exactement un élément parmi `content` (média encodé en base64, transporté en ligne) ou `attachmentKey`. **Remarque** : Les spans de récupération sont un cas particulier et nécessitent une chaîne ou un objet (ou une liste d'objets) avec ce format : `{text: "...", name: "...", score: number, id: "..."}`.

`metadata`
: facultatif - _objet_
<br />Un objet de paires clé-valeur sérialisables en JSON que les utilisateurs peuvent ajouter en tant qu'informations de métadonnées pertinentes pour l'opération d'entrée ou de sortie décrite par le span (`model_temperature`, `max_tokens`, `top_k`, etc.).

`metrics`
: facultatif - _objet_
<br />Un objet de clés sérialisables en JSON et de valeurs numériques que les utilisateurs peuvent ajouter en tant que métriques pertinentes pour l'opération décrite par le span (`input_tokens`, `output_tokens`, `total_tokens`, etc.).

`tags`
: facultatif - _objet_
<br />Un objet de paires clé-valeur sérialisables en JSON que les utilisateurs peuvent ajouter en tant que tags concernant le contexte du span (`session`, `environment`, `system`, `versioning`, etc.). Pour plus d'informations sur les tags, consultez [Getting Started with Tags](/getting_started/tagging/).

`costTags`
: facultatif - _tableau de chaînes_
<br />Une liste de clés de tag (déjà définies avec `tags` ou annotées précédemment sur le même span) à propager en tant que tags personnalisés sur les métriques de coût et de jeton LLM générées. Les entrées qui ne font pas référence à une clé de tag existante sont ignorées. Voir [Suivi des coûts](#cost-monitoring) pour plus de détails.

{{% /collapse-content %}}

#### Exemple {#example-19}

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

function voiceTurn (userAudioBytes) {
  const resp = ... // multimodal (audio) llm call here
  llmobs.annotate({
    inputData: [
      {
        role: "user",
        content: "Hey, how are you?", // transcript of the input audio
        audioParts: [{ mimeType: "audio/wav", content: userAudioBytes.toString("base64") }]
      }
    ],
    outputData: [
      {
        role: "assistant",
        content: "Hey! I'm doing great, thanks for asking. How about you?",
        audioParts: [{ mimeType: "audio/wav", content: resp.audioBuffer.toString("base64") }]
      }
    ]
  })
  return resp
}
voiceTurn = llmobs.wrap({ kind: 'llm', modelName: 'gpt-audio', modelProvider: 'openai' }, voiceTurn)

function describeImage (imageBytes) {
  const resp = ... // multimodal (vision) llm call here
  llmobs.annotate({
    inputData: [
      {
        role: "user",
        content: "What is in this image?",
        imageParts: [{ mimeType: "image/png", content: imageBytes.toString("base64") }]
      }
    ],
    outputData: [{ role: "assistant", content: "The image shows a golden retriever puppy." }]
  })
  return resp
}
describeImage = llmobs.wrap({ kind: 'llm', modelName: 'gpt-4o', modelProvider: 'openai' }, describeImage)

{{< /code-block >}}

Les messages annotés avec `audioParts` ou `imageParts` s'affichent sous forme de lecteurs audio et d'images intégrés dans la vue de trace :

{{< img src="llm_observability/instrumentation/audio_example.png" alt="Un span LLM dans la vue de trace Agent Observability. Le message d'entrée de l'UTILISATEUR affiche un lecteur audio intégré avec la transcription « Hey, how are you? », et le message de sortie de l'ASSISTANT affiche une commande « Click to play audio » avec la transcription « Hey! ». Je vais très bien, merci de demander. « How about you? »." style="width:100%;" >}}

{{< img src="llm_observability/instrumentation/image_example.png" alt="Un span LLM dans la vue de trace Agent Observability. Le message d'entrée de l'UTILISATEUR affiche l'invite « What is in this image? ». avec une photo intégrée d'un chiot noir, et le message de sortie de l'ASSISTANT le décrit comme un chiot Labrador Retriever noir sur une surface en bois." style="width:100%;" >}}

Pour les complétions de chat audio OpenAI, `audioParts` sont également capturés automatiquement par [les intégrations LLM de Datadog](/llm_observability/instrumentation/auto_instrumentation/)—aucune annotation manuelle n'est requise. Contrairement à `audioParts`, `imageParts` ne sont actuellement pas capturés automatiquement et doivent être annotés manuellement ; une capture automatique est prévue pour une version ultérieure.

{{% /tab %}}
{{% tab "Java" %}}
Le SDK fournit plusieurs méthodes pour annoter les spans avec des entrées, des sorties, des métriques et des métadonnées.

### Annotation des entrées et des sorties {#annotating-inputs-and-outputs}

Utilisez la méthode membre `annotateIO()` de l'interface `LLMObsSpan` pour ajouter des données d'entrée et de sortie structurées à un `LLMObsSpan`. Cela inclut les arguments optionnels et les objets de message LLM.

#### Arguments {#arguments}

Si un argument est nul ou vide, rien ne se passe. Par exemple, si `inputData` est une chaîne non vide alors que `outputData` est nul, seul `inputData` est enregistré.

`inputData`
: optionnel - _Chaîne_ ou _Liste<LLMObs.LLMMessage>_
<br />Soit une chaîne (pour les spans non-LLM), soit une liste de `LLMObs.LLMMessage` pour les spans LLM.

`outputData`
: optionnel - _Chaîne_ ou _Liste<LLMObs.LLMMessage>_
<br />Soit une chaîne (pour les spans non-LLM), soit une liste de `LLMObs.LLMMessage` pour les spans LLM.

#### Messages LLM {#llm-messages}
Les spans LLM doivent être annotés avec des messages LLM en utilisant l'objet `LLMObs.LLMMessage`.

L'objet `LLMObs.LLMMessage` peut être instancié en appelant `LLMObs.LLMMessage.from()` avec les arguments suivants :

`role`
: requis - _String_
<br />Une chaîne décrivant le rôle de l'auteur du message.

`content`
: requis - _String_
<br />Une chaîne contenant le contenu du message.

#### Exemple {#example-20}

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

### Attacher des métriques {#adding-metrics}

#### Attacher plusieurs métriques en masse {#bulk-add-metrics}

La méthode membre `setMetrics()` de l'interface `LLMObsSpan` accepte les arguments suivants pour attacher plusieurs métriques en masse :

##### Arguments {#arguments-1}

`metrics`
: requis - _Map<String, Number>_
<br /> Une carte de clés sérialisables en JSON et de valeurs numériques que les utilisateurs peuvent ajouter pour enregistrer des métriques pertinentes pour l'opération décrite par le span (par exemple, `input_tokens`, `output_tokens` ou `total_tokens`).

#### Attacher une seule métrique {#add-a-single-metric}

La méthode membre `setMetric()` de l'interface `LLMObsSpan` accepte les arguments suivants pour attacher une métrique unique :

##### Arguments {#arguments-2}

`key`
: requis - _CharSequence_
<br /> Le nom de la métrique.

`value`
: requis - _int_, _long_ ou _double_
<br /> La valeur de la métrique.

#### Exemples {#examples}

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

### Attacher des tags {#adding-tags}

Pour plus d'informations sur les tags, consultez [Getting Started with Tags][1].

#### Attacher plusieurs tags en masse {#bulk-add-tags}

La méthode membre `setTags()` de l'interface `LLMObsSpan` accepte les arguments suivants pour attacher plusieurs tags en masse :

##### Arguments {#arguments-3}

`tags`
: requis - _Map<String, Object>_
<br /> Une carte de paires clé-valeur sérialisables en JSON que les utilisateurs peuvent attacher en tant que tags pour décrire le contexte du span (par exemple, `session`, `environment`, `system`, ou `version`).

#### Attacher un seul tag {#add-a-single-tag}

La méthode membre `setTag()` de l'interface `LLMObsSpan` accepte les arguments suivants pour attacher un seul tag :

##### Arguments {#arguments-4}

`key`
: requis - _String_
<br /> La clé du tag.

`value`
: requis - _int_, _long_, _double_, _booléen_ ou _String_
<br /> La valeur du tag.

#### Exemples {#examples-1}

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

### Annotation des erreurs {#annotating-errors}

#### Attacher un Throwable (recommandé) {#adding-a-throwable-recommended}

La méthode membre `addThrowable()` de l'interface `LLMObsSpan` accepte l'argument suivant pour attacher un throwable avec une trace de pile :

##### Arguments {#arguments-5}

`throwable`
: requis - _Throwable_
<br /> Le throwable/l'exception qui s'est produit.

#### Attacher un message d'erreur {#adding-an-error-message}

La méthode membre `setErrorMessage()` de l'interface `LLMObsSpan` accepte l'argument suivant pour attacher une chaîne d'erreur :

##### Arguments {#arguments-6}

`errorMessage`
: requis - _String_
<br /> Le message de l'erreur.

#### Définir un indicateur d'erreur {#setting-an-error-flag}

La méthode membre `setError()` de l'interface `LLMObsSpan` accepte l'argument suivant pour indiquer une erreur lors de l'opération :

##### Arguments {#arguments-7}

`error`
: requis - _booléen_
<br /> `true` si le span a rencontré une erreur.

#### Exemples {#examples-2}

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

### Annotation des métadonnées {#annotating-metadata}

La méthode membre `setMetadata()` de l'interface `LLMObsSpan` accepte les arguments suivants :

`metadata`
: requis - _Map<String, Object>_
<br />Une map de paires clé-valeur sérialisables en JSON qui contient des métadonnées pertinentes pour l'opération d'entrée ou de sortie décrite par le span.

#### Exemple {#example-21}

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

### Annotation des spans auto-instrumentés {#annotating-auto-instrumented-spans}

{{< tabs >}}
{{% tab "Python" %}}

La méthode `LLMObs.annotation_context()` du SDK renvoie un gestionnaire de contexte qui peut être utilisé pour modifier tous les spans auto-instrumentés démarrés pendant que le contexte d'annotation est actif.

La méthode `LLMObs.annotation_context()` accepte les arguments suivants :

{{% collapse-content title="Arguments" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
: optionnel - _str_
<br />Nom qui remplace le nom du span pour tous les spans auto-instrumentés démarrés dans le contexte d'annotation.

`prompt`
: optionnel - _dictionnaire_
<br />Un dictionnaire qui représente le prompt utilisé pour un appel LLM. Consultez la documentation de l'objet [Prompt](#prompt-tracking-arguments) pour obtenir le schéma complet et les clés prises en charge. Vous pouvez également importer l'objet `Prompt` depuis `ddtrace.llmobs.utils` et le transmettre en tant qu'argument `prompt`. **Remarque**: Cet argument s'applique uniquement aux spans LLM.

`tags`
: optionnel - _dictionnaire_
<br />Un dictionnaire de paires clé-valeur sérialisables en JSON que les utilisateurs peuvent ajouter en tant que tags sur le span. Exemples de clés : `session`, `env`, `system` et `version`. Pour plus d'informations sur les tags, consultez [Getting Started with Tags](/getting_started/tagging/).

`cost_tags`
a: facultatif - _liste de chaînes_
<br />Une liste de clés de tag à propager en tant que tags personnalisés sur les métriques de coût et de jetons LLM générées. Chaque entrée doit faire référence à une clé présente dans `tags` au début du span (fournie au même contexte ou à un contexte parent); les clés de tag ajoutées ultérieurement avec `LLMObs.annotate()` ne sont pas conservées. Voir [Suivi des coûts](#cost-monitoring) pour plus de détails.

{{% /collapse-content %}}

#### Exemple {#example-22}

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

Le `llmobs.annotationContext()` du SDK accepte une fonction de rappel qui peut être utilisée pour modifier tous les spans auto-instrumentés démarrés dans le périmètre de la fonction de rappel.

La méthode `llmobs.annotationContext()` accepte les options suivantes sur le premier argument:

{{% collapse-content title="Options" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
: optionnel - _str_
<br />Nom qui remplace le nom du span pour tous les spans auto-instrumentés démarrés dans le contexte d'annotation.

`tags`
: optionnel - _object_
<br />Un objet de paires clé-valeur sérialisables en JSON que les utilisateurs peuvent attacher en tant que tags sur le span. Exemples de clés: `session`, `env`, `system` et `version`. Pour plus d'informations sur les tags, consultez [Getting Started with Tags](/getting_started/tagging/).

`costTags`
: facultatif - _tableau de chaînes_
<br />Une liste de clés de tag à propager en tant que tags personnalisés sur les métriques de coût et de jetons LLM générées. Chaque entrée doit faire référence à une clé présente dans `tags` au début du span (fournie au même contexte ou à un contexte parent); les clés de tag ajoutées ultérieurement avec `llmobs.annotate()` ne sont pas conservées. Voir [Suivi des coûts](#cost-monitoring) pour plus de détails.

{{% /collapse-content %}}

#### Exemple {#example-23}

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

## Prompt tracking {#prompt-tracking}

Attachez des métadonnées de prompt structurées au span LLM afin de pouvoir reproduire les résultats, auditer les modifications et comparer les performances du prompt entre les versions. Lors de l'utilisation de templates, Agent Observability fournit également un [version tracking](#version-tracking) basé sur les modifications du contenu du template.

{{< tabs >}}
{{% tab "Python" %}}
Utilisez `LLMObs.annotation_context(prompt=...)` pour attacher des métadonnées de prompt avant l'appel LLM. Pour plus de détails sur l'annotation des spans, voir [Enriching spans](#enriching-spans).

#### Arguments {#arguments-8}

{{% collapse-content title="Arguments" level="h5" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: requis - dictionary
<br />Un typed dictionary qui suit le schéma de Prompt ci-dessous.

{{% /collapse-content %}}

{{% collapse-content title="Prompt structure" level="h5" expanded=false id="prompt-structure" %}}

Clés prises en charge :

- `id` (str) : Identifiant logique pour ce prompt. Doit être unique par `ml_app`. Par défaut à `{ml_app}-unnamed_prompt`
- `version` (str) : Tag de version pour le prompt (par exemple, « 1.0.0 »). Voir [version tracking](#version-tracking) pour plus de détails.
- `variables` (Dict[str, str]) : Variables utilisées pour remplir les template placeholders.
- `template` (str) : Template string with placeholders (for example, `"Translate {{text}} to {{lang}}"`).
- `chat_template` (List[Message]) : Multi-message template form. Fournissez une liste d'objets `{ "role": "<role>", "content": "<template string with placeholders>" }`.
- `tags` (Dict[str, str]) : Tags à attacher à l'exécution du prompt.
- `rag_context_variables` (List[str]) : Clés de variables contenant le contenu ground-truth/context. Utilisé pour [hallucination detection](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination).
- `rag_query_variables` (List[str]) : Clés de variable contenant la requête de l'utilisateur. Utilisé pour [hallucination detection](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination).

{{% /collapse-content %}}

#### Exemple : invite à modèle unique {#example-single-template-prompt}

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

#### Exemple : modèles d'invite LangChain {#example-langchain-prompt-templates}

Lorsque vous utilisez le modèle d'invite de LangChain avec l'auto-instrumentation, assignez des modèles aux variables avec des noms significatifs. L'auto-instrumentation utilise ces noms pour identifier les invites.

{{< code-block lang="python" >}}
# "translation_template" will be used to identify the template in Datadog
translation_template = PromptTemplate.from_template("Translate {text} to {language}")
chain = translation_template | llm
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

Utilisez `llmobs.annotationContext({ prompt: ... }, () => { ... })` pour joindre des métadonnées de prompt avant l'appel LLM. Pour plus de détails sur l'annotation des spans, voir [Enriching spans](#enriching-spans).

#### Arguments {#arguments-9}

{{% collapse-content title="Options" level="h5" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: requis - objet
<br />Un objet qui suit le schéma d'invite ci-dessous.

{{% /collapse-content %}}

{{% collapse-content title="Prompt structure" level="h5" expanded=false id="prompt-structure" %}}

Propriétés prises en charge :

- `id` (chaîne) : Identifiant logique pour cette invite. Doit être unique par `ml_app`. Par défaut à `{ml_app}-unnamed_prompt`
- `version` (chaîne) : Tag de version pour l'invite (par exemple, « 1.0.0 »). Voir [version tracking](#version-tracking) pour plus de détails.
- `variables` (Record<string, string>) : Variables utilisées pour remplir les espaces réservés du modèle.
- `template` (chaîne | List[Message]) : Chaîne de modèle avec des espaces réservés (par exemple, `"Translate` {{text}} to {{lang}}"`). Alternatively, a list of `{ "role": "<role>", "content": "<template string with placeholders>" }` objets.
- `tags` (Record<string, string>) : Tags à joindre à l'exécution de l'invite.
- `contextVariables` (string[]) : Clés de variable contenant le contenu de référence/contexte. Utilisé pour [hallucination detection](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination).
- `queryVariables` (string[]) : Clés de variable contenant la requête de l'utilisateur. Utilisé pour [hallucination detection](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination).

{{% /collapse-content %}}

#### Exemple : invite à modèle unique {#example-single-template-prompt-1}

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

#### Notes {#notes}
- L'annotation d'un prompt n'est disponible que sur les spans LLM.
- Placez l'annotation immédiatement avant l'appel au fournisseur afin qu'elle s'applique au span LLM correct.
- Utilisez un prompt unique `id` pour distinguer les différents prompts au sein de votre application.
- Gardez les modèles statiques en utilisant la syntaxe d'espace réservé (comme `{{variable_name}}`) and define dynamic content in the `section `variables`.
- Pour plusieurs appels LLM auto-instrumentés au sein d'un bloc, utilisez un contexte d'annotation pour appliquer les mêmes métadonnées de prompt à tous les appels. Voir [Annotation des spans auto-instrumentés](#annotating-auto-instrumented-spans).

### Suivi de version {#version-tracking}

Agent Observability fournit un versionnage automatique pour vos prompts lorsqu'aucune version explicite n'est spécifiée. Lorsque vous fournissez un `template` ou `chat_template` dans les métadonnées de votre prompt sans tag `version`, le système génère automatiquement une version en calculant un hash du contenu du modèle. Si vous fournissez un tag `version`, Agent Observability utilise l'étiquette de version que vous avez spécifiée au lieu d'en générer une automatiquement.

Le système de versionnage fonctionne comme suit :
- **Versionnage automatique** : Lorsqu'aucun tag `version` n'est fourni, Agent Observability calcule un hash du contenu `template` ou `chat_template` pour générer automatiquement un identifiant de version numérique
- **Versionnage manuel** : Lorsqu'un tag `version` est fourni, Agent Observability utilise l'étiquette de version que vous avez spécifiée exactement telle qu'elle a été fournie
- **Historique des versions** : Les versions générées automatiquement et manuelles sont conservées dans l'historique des versions pour suivre l'évolution du prompt au fil du temps

Cela vous donne la flexibilité de vous appuyer sur une gestion automatique des versions basée sur les modifications du contenu du modèle, ou de garder un contrôle total sur le versionnage avec vos propres étiquettes de version.

## Capture d'intention MCP {#mcp-intent-capture}

Pour comprendre pourquoi vos outils MCP ont été appelés, activez la capture d'intention sur votre serveur MCP. Une fois activé, le SDK ajoute un argument à chaque outil de serveur MCP demandant au modèle appelant de décrire pourquoi il a choisi d'appeler l'outil. L'intention est enregistrée sur le span de l'outil, ce qui vous aide à améliorer vos définitions et descriptions d'outils.

{{< tabs >}}
{{% tab "Python" %}}

Activez la capture d'intention MCP avec la variable d'environnement `DD_MCP_CAPTURE_INTENT` :

{{< code-block lang="shell" >}}
DD_MCP_CAPTURE_INTENT=1 DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

Ou activez-la par programmation avec le paramètre `capture_intent` sur `LLMObs.enable()` :

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  capture_intent=True,
)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Surveillance des coûts {#cost-monitoring}
Attachez des métriques de jetons (pour le suivi automatique des coûts) ou des métriques de coûts (pour le suivi manuel des coûts) à vos spans LLM/d'embedding. Les métriques de jetons permettent à Datadog de calculer les coûts en utilisant la tarification du fournisseur, tandis que les métriques de coûts vous permettent de fournir votre propre tarification lors de l'utilisation de modèles personnalisés ou non pris en charge. Pour plus de détails, consultez [Coûts][14].

Si vous utilisez l'instrumentation automatique, les métriques de jetons et de coûts apparaissent automatiquement sur vos spans. Si vous effectuez une instrumentation manuelle, suivez les conseils ci-dessous.

<div class="alert alert-info">Dans ce contexte, « métriques de jetons » et « métriques de coûts » font référence à des paires clé-valeur numériques que vous attachez aux spans via le <code>metrics</code> paramètre du <code>LLMObs.annotate()</code> méthode. Ceux-ci sont distincts des <a href="/llm_observability/monitoring/metrics/">métriques d'Agent Observability de la plateforme Datadog</a>. Pour les clés reconnues telles que <code>input_tokens</code>, <code>output_tokens</code>, <code>input_cost</code>, et <code>output_cost</code>, Datadog utilise ces attributs de span pour générer les métriques de plateforme correspondantes (telles que <code>ml_obs.span.llm.input.cost</code>) pour une utilisation dans les dashboards et les moniteurs.</div>

### Cas d'utilisation : Utilisation d'un fournisseur de modèles courant {#use-case-using-a-common-model-provider}
Datadog prend en charge les fournisseurs de modèles courants tels qu'OpenAI, Azure OpenAI, Anthropic et Google Gemini. Lorsque vous utilisez ces fournisseurs, il vous suffit d'annoter votre requête LLM avec le nom du modèle, le fournisseur du modèle et l'utilisation des jetons. Datadog calcule automatiquement le coût estimé en fonction de la tarification du fournisseur.

Pour en savoir plus sur ce que représente chaque jeton et comment Datadog les calcule, consultez [Comment les nombres de jetons sont calculés][16].

{{< tabs >}}
{{% tab "Python" %}}

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

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const resp = ... // llm call here
  llmobs.annotate({
    metrics: {
      input_tokens: 50,
      output_tokens: 120,
      total_tokens: 170,
      non_cached_input_tokens: 13,  // optional
      cache_read_input_tokens: 22,  // optional
      cache_write_input_tokens: 15  // optional
    }
  })
  return resp
}
llmCall = llmobs.wrap({ kind: 'llm', modelName: 'gpt-5.1', modelProvider: 'openai' }, llmCall)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;
import datadog.trace.api.llmobs.LLMObsSpan;
import java.util.Map;

public class MyJavaClass {
  public String llmCall(String prompt) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("llm-call", "gpt-5.1", "openai", null, null);
    String resp = ... // llm call here
    llmSpan.setMetrics(Map.of(
      "input_tokens", 50,
      "output_tokens", 120,
      "total_tokens", 170,
      "non_cached_input_tokens", 13,  // optional
      "cache_read_input_tokens", 22,  // optional
      "cache_write_input_tokens", 15  // optional
    ));
    llmSpan.finish();
    return resp;
  }
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Cas d'utilisation : Utilisation d'un modèle personnalisé {#use-case-using-a-custom-model}
Pour les modèles personnalisés ou non pris en charge, vous devez annoter manuellement le span avec les données de coût en dollars.

{{< tabs >}}
{{% tab "Python" %}}

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
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const resp = ... // llm call here
  llmobs.annotate({
    metrics: {
      input_cost: 3,
      output_cost: 7,
      total_cost: 10,
      non_cached_input_cost: 1,    // optional
      cache_read_input_cost: 0.6,  // optional
      cache_write_input_cost: 1.4  // optional
    }
  })
  return resp
}
llmCall = llmobs.wrap({ kind: 'llm', modelName: 'custom_model', modelProvider: 'model_provider' }, llmCall)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;
import datadog.trace.api.llmobs.LLMObsSpan;
import java.util.Map;

public class MyJavaClass {
  public String llmCall(String prompt) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("llm-call", "custom_model", "model_provider", null, null);
    String resp = ... // llm call here
    llmSpan.setMetrics(Map.of(
      "input_cost", 3,
      "output_cost", 7,
      "total_cost", 10,
      "non_cached_input_cost", 1,    // optional
      "cache_read_input_cost", 0.6,  // optional
      "cache_write_input_cost", 1.4  // optional
    ));
    llmSpan.finish();
    return resp;
  }
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Ajout de tags personnalisés aux métriques de coût et de jetons {#adding-custom-tags-to-cost-and-tokens-metrics}
Par défaut, les métriques de coût et de jetons LLM comportent un ensemble fixe de tags OOTB tels que `model_name`, `model_provider` et `ml_app`. Pour ventiler les dépenses LLM par attributs spécifiques à votre application — tels que l'équipe, le client ou la fonctionnalité — marquez un sous-ensemble des clés de tag existantes du span pour les propager à ces métriques en tant que tags personnalisés. Pour des exemples de cas d'utilisation comme les dashboards et les moniteurs personnalisés, consultez [Tags personnalisés sur les métriques de coût et de jetons][15].

Chaque entrée doit être une chaîne de caractères et doit faire référence à une clé déjà fournie via le paramètre `tags` du span au moment où l'annotation est appliquée. Lors de l'annotation d'un seul span, la clé peut être fournie via `tags` dans le même appel d'annotation ou dans une annotation antérieure sur le même span. Lors de l'utilisation d'un contexte d'annotation, seules les clés présentes dans `tags` au début du span sont qualifiées — les clés ajoutées ultérieurement via des annotations de span individuelles ne sont pas conservées. Les entrées qui ne font pas référence à une clé de tag existante sont ignorées.

{{< tabs >}}
{{% tab "Python" %}}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="gpt-5.1", model_provider="openai")
def llm_call(prompt):
    resp = ... # llm call here
    LLMObs.annotate(
        metrics={"input_tokens": 50, "output_tokens": 120, "total_tokens": 170},
        tags={"team": "nlp", "customer_tier": "enterprise", "host": "host_name"},
        cost_tags=["team", "customer_tier"],
    )
    return resp
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const resp = ... // llm call here
  llmobs.annotate({
    metrics: { input_tokens: 50, output_tokens: 120, total_tokens: 170 },
    tags: { team: 'nlp', customer_tier: 'enterprise', host: 'host_name' },
    costTags: ['team', 'customer_tier']
  })
  return resp
}
llmCall = llmobs.wrap({ kind: 'llm', modelName: 'gpt-5.1', modelProvider: 'openai' }, llmCall)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

Vous pouvez également propager des tags de cette manière via un contexte d'annotation pour les appliquer à tous les spans auto-instrumentés démarrés à l'intérieur du contexte.

{{< tabs >}}
{{% tab "Python" %}}

{{< code-block lang="python" >}}
with LLMObs.annotation_context(
    tags={"team": "nlp", "customer_tier": "enterprise"},
    cost_tags=["team", "customer_tier"],
):
    resp = ... # llm call here
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
llmobs.annotationContext({
  tags: { team: 'nlp', customer_tier: 'enterprise' },
  costTags: ['team', 'customer_tier']
}, () => {
  const resp = ... // llm call here
})
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


## Évaluations {#evaluations}

Le Agent Observability SDK fournit des méthodes pour exporter et soumettre vos évaluations à Datadog.

<div class="alert alert-info">Pour créer des évaluateurs réutilisables basés sur des classes (<code>BaseEvaluator</code>, <code>BaseSummaryEvaluator</code>) avec des métadonnées de résultat enrichies, consultez le <a href="/llm_observability/guide/evaluation_developer_guide/">Guide du développeur d'évaluations</a>.</div>

Les évaluations doivent être jointes à un seul span. Vous pouvez identifier le span cible en utilisant l'une de ces deux méthodes :
- _Jointure basée sur des tags_ - Joignez une évaluation en utilisant une paire clé-valeur de tag unique définie sur un seul span. L'évaluation ne pourra pas être jointe si la paire clé-valeur du tag correspond à plusieurs spans ou à aucun span.
- _Référence directe au span_ - Joignez une évaluation en utilisant la combinaison de l'ID de trace et de l'ID de span uniques du span.

### Exportation d'un span {#exporting-a-span}
{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.export_span()` peut être utilisé pour extraire le contexte de span à partir d'un span. Cette méthode est utile pour associer votre évaluation au span correspondant.

#### Arguments {#arguments-10}
La méthode `LLMObs.export_span()` accepte l'argument suivant :

`span`
: optionnel - _Span_
<br />Le span à partir duquel extraire le contexte de span (ID de span et de trace). S'il n'est pas fourni (comme lors de l'utilisation de décorateurs de fonction), le SDK exporte le span actif actuel.

#### Exemple {#example-24}

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
`llmobs.exportSpan()` peut être utilisé pour extraire le contexte de span à partir d'un span. Vous devrez utiliser cette méthode pour associer votre évaluation au span correspondant.

#### Arguments {#arguments-11}

La méthode `llmobs.exportSpan()` accepte l'argument suivant :

`span`
: optionnel - _Span_
<br />Le span à partir duquel extraire le contexte de span (ID de span et de trace). S'il n'est pas fourni (comme lors de l'utilisation de wrappers de fonction), le SDK exporte le span actif actuel.

#### Exemple {#example-25}

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

### Soumission des évaluations {#submitting-evaluations}

{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.submit_evaluation()` peut être utilisé pour soumettre votre évaluation personnalisée associée à un span donné.

<div class="alert alert-info"><code>LLMObs.submit_evaluation_for</code> est obsolète et sera supprimé dans la prochaine version majeure de ddtrace (4.0). Pour migrer, renommez votre <code>LLMObs.submit_evaluation_for</code> appels avec <code>LLMObs.submit_evaluation</code>.</div>

**Remarque** : Les évaluations personnalisées sont des évaluateurs que vous implémentez et hébergez vous-même. Celles-ci diffèrent des évaluations prêtes à l'emploi, qui sont automatiquement calculées par Datadog à l'aide d'évaluateurs intégrés. Pour configurer les évaluations prêtes à l'emploi pour votre application, utilisez la page [**Agent Observability** > **Settings** > **Evaluations**][1] dans Datadog.

La méthode `LLMObs.submit_evaluation()` accepte les arguments suivants :

{{% collapse-content title="Arguments" level="h4" expanded=false id="submit-evals-arguments" %}}
`label`
:  requis - _chaîne_
<br />Le nom de l'évaluation.

`metric_type`
:  requis - _chaîne_
<br />Le type de l'évaluation. Doit être `categorical`, `score`, `boolean` ou `json`.

`value`
: requis - _chaîne, type numérique ou dict_
<br />La valeur de l'évaluation. Doit être une chaîne (`metric_type==categorical`), un entier/flottant (`metric_type==score`), un booléen (`metric_type==boolean`) ou un dictionnaire (`metric_type==json`).

`span`
: optionnel - _dictionnaire_
<br />Un dictionnaire qui identifie de manière unique le span associé à cette évaluation. Doit contenir `span_id` (chaîne) et `trace_id` (chaîne). Utilisez [`LLMObs.export_span()`](#exporting-a-span) pour générer ce dictionnaire.

`span_with_tag_value`
: optionnel - _dictionnaire_
<br />Un dictionnaire qui identifie de manière unique le span associé à cette évaluation. Doit contenir `tag_key` (chaîne) et `tag_value` (chaîne).

   **Remarque**: Exactement l'un des éléments `span` ou `span_with_tag_value` est requis. Fournir les deux, ou aucun des deux, déclenche une ValueError.

`ml_app`
:  requis - _chaîne_
<br />Le nom de l'application ML.

`timestamp_ms`
: facultatif - _entier_
<br />L'horodatage unix en millisecondes au moment où le résultat de la métrique d'évaluation a été généré. S'il n'est pas fourni, la valeur par défaut est l'heure actuelle.

`tags`
: optionnel - _dictionnaire_
<br />Un dictionnaire de paires clé-valeur de type chaîne que les utilisateurs peuvent ajouter en tant que tags concernant l'évaluation. Pour plus d'informations sur les tags, consultez [Getting Started with Tags](/getting_started/tagging/).

`assessment`
:  optionnel - _chaîne_
<br />Une évaluation de cette évaluation. Les valeurs acceptées sont `pass` et `fail`.

`reasoning`
:  optionnel - _chaîne_
<br />Une explication textuelle du résultat de l'évaluation.

`metadata`
a: facultatif - _dictionnaire_
<br />Un dictionnaire contenant des métadonnées structurées arbitraires associées au résultat de l'évaluation.
{{% /collapse-content %}}

#### Exemple {#example-26}

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

`llmobs.submitEvaluation()` peut être utilisé pour soumettre votre évaluation personnalisée associée à un span donné.

La méthode `llmobs.submitEvaluation()` accepte les arguments suivants :

{{% collapse-content title="Arguments" level="h4" expanded=false id="submit-evals-arguments" %}}

`span_context`
: requis - _dictionnaire_
<br />Le contexte du span à associer à l'évaluation. Il doit s'agir de la sortie de `LLMObs.export_span()`.

`evaluationOptions`
: requis - _objet_
<br />Un objet des données d'évaluation.

L'objet `evaluationOptions` peut contenir les éléments suivants :

`label`
:  requis - _chaîne_
<br />Le nom de l'évaluation.

`metricType`
:  requis - _chaîne_
<br />Le type de l'évaluation. Doit être l'une des valeurs suivantes : « categorical », « score », « boolean » ou « json ».

`value`
: requis - _type chaîne ou numérique_
<br />La valeur de l'évaluation. Doit être une chaîne (pour categorical `metric_type`), un nombre (pour score `metric_type`), un booléen (pour boolean `metric_type`) ou un objet JSON (pour json `metric_type`).

`tags`
: optionnel - _dictionnaire_
<br />Un dictionnaire de paires clé-valeur de type chaîne que les utilisateurs peuvent ajouter en tant que tags concernant l'évaluation. Pour plus d'informations sur les tags, consultez [Getting Started with Tags](/getting_started/tagging/).

`assessment`
:  optionnel - _chaîne_
<br />Une évaluation de cette évaluation. Les valeurs acceptées sont `pass` et `fail`.

`reasoning`
:  optionnel - _chaîne_
<br />Une explication textuelle du résultat de l'évaluation.

`metadata`
: optionnel - _dictionnaire_
<br />Un objet JSON contenant des métadonnées structurées arbitraires associées au résultat de l'évaluation.
{{% /collapse-content %}}

#### Exemple {#example-27}

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

Utilisez `LLMObs.SubmitEvaluation()` pour soumettre votre évaluation personnalisée associée à un span donné.

La méthode `LLMObs.SubmitEvaluation()` accepte les arguments suivants :

{{% collapse-content title="Arguments" level="h4" expanded=false id="submit-evals-arguments" %}}

`llmObsSpan`
: requis - _LLMObsSpan_
<br />Le contexte du span à associer à l'évaluation.

`label`
: requis - _String_
<br />Le nom de l'évaluation.

`categoricalValue` ou `scoreValue`
: requis - _Chaîne_ ou _double_
<br />La valeur de l'évaluation. Doit être une chaîne (pour les évaluations catégorielles) ou un double (pour les évaluations de score).

`tags`
: optionnel - _Map<String, Object>_
<br />Un dictionnaire de paires clé-valeur sous forme de chaînes utilisé pour ajouter des tags à l'évaluation. Pour plus d'informations sur les tags, consultez [Getting Started with Tags](/getting_started/tagging/).
{{% /collapse-content %}}

#### Exemple {#example-28}

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

### Soumission du feedback de l'utilisateur final {#submitting-end-user-feedback}

Le feedback de l'utilisateur final recueille les retours des utilisateurs de votre application LLM, tels que des évaluations par pouce levé ou pouce baissé, si un utilisateur a accepté le changement d'un agent, et des commentaires en texte libre. Contrairement à une évaluation, le feedback porte l'identité du soumetteur et peut cibler un span, une trace, une session ou une entité définie par le client. Pour plus d'informations, consultez [Feedback de l'utilisateur final](/llm_observability/evaluations/end_user_feedback/).

{{< tabs >}}
{{% tab "Python" %}}
Utilisez `LLMObs.submit_feedback()` pour soumettre un feedback de l'utilisateur final associé à un span, une trace, une session ou une entité définie par le client.

La méthode `LLMObs.submit_feedback()` accepte les arguments suivants :

{{% collapse-content title="Arguments" level="h4" expanded=false id="submit-feedback-arguments" %}}
`label`
:  requis - _chaîne_
<br />Le nom de la métrique de feedback. Ne doit pas contenir de `.`.

`metric_type`
:  requis - _chaîne_
<br />Le type de feedback. Doit être `categorical`, `score`, `boolean`, `json` ou `text`.

`value`
: requis - _chaîne, type numérique, booléen ou dict_
<br />La valeur du feedback. Doit être une chaîne (`metric_type==categorical` ou `metric_type==text`), un entier ou un nombre à virgule flottante (`metric_type==score`), un booléen (`metric_type==boolean`) ou dict (`metric_type==json`).

`submitter`
: requis - _dictionnaire_
<br />Un dictionnaire qui identifie qui a soumis le feedback. Doit contenir un `id` non vide (chaîne), et peut contenir un `type` optionnel (chaîne), tel que `user`.

`span`
: optionnel - _dictionnaire_
<br />Un dictionnaire qui identifie le span associé à ce feedback. Utilisez [`LLMObs.export_span()`](#exporting-a-span) pour générer ce dictionnaire.

`span_id`
:  optionnel - _chaîne_
<br />L'identifiant du span associé à ce feedback.

`trace_id`
:  optionnel - _chaîne_
<br />L'identifiant de la trace associée à ce retour d'information.

`session_id`
:  optionnel - _chaîne_
<br />L'identifiant de la session associée à ce retour d'information.

`feedback_join_key`
:  optionnel - _chaîne_
<br />Une clé définie par le client associée à ce feedback, telle qu'un incident ID ou un ticket ID. Pour connecter le feedback à vos spans, annotez-les d'abord avec un tag `feedback_join_key` contenant la même valeur. Voir [Enriching spans](#enriching-spans).

   **Remarque**: Exactement l'un des éléments `span`, `span_id`, `trace_id`, `session_id` ou `feedback_join_key` est requis. En fournir plus d'un, ou aucun, déclenche une `ValueError`.

`ml_app`
:  optionnel - _chaîne_
<br />Le nom de l'application ML. S'il n'est pas fourni, il prend par défaut la valeur de l'application ML configurée pour le SDK.

`timestamp_ms`
: facultatif - _entier_
<br />L'horodatage Unix en millisecondes au moment où le feedback a été généré. S'il n'est pas fourni, la valeur par défaut est l'heure actuelle.

`tags`
: optionnel - _dictionnaire_
<br />Un dictionnaire de paires clé-valeur sous forme de chaînes que les utilisateurs peuvent ajouter en tant que tags concernant le feedback. Pour plus d'informations sur les tags, consultez [Getting Started with Tags](/getting_started/tagging/).

`assessment`
:  optionnel - _chaîne_
<br />Une appréciation de ce feedback. Les valeurs acceptées sont `pass` et `fail`.

`reasoning`
: optionnel - _ chaîne_
<br />Une explication textuelle du feedback.
{{% /collapse-content %}}

#### Exemple {#example-29}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM
    span_context = LLMObs.export_span(span=None)

    # submitting feedback for a trace
    LLMObs.submit_feedback(
        label="thumbs",
        metric_type="categorical",
        value="down",
        submitter={"id": "user-123", "type": "user"},
        trace_id=span_context["trace_id"],
        assessment="fail",
    )

    # connecting the span to a customer-defined entity
    LLMObs.annotate(tags={"feedback_join_key": "incident-123"})

    # submitting feedback for that entity
    LLMObs.submit_feedback(
        label="user_comment",
        metric_type="text",
        value="The investigation missed the customer impact.",
        submitter={"id": "user-123", "type": "user"},
        feedback_join_key="incident-123",
    )
    return completion
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
Utilisez `llmobs.submitFeedback()` pour soumettre un feedback de l'utilisateur final associé à un span, une trace, une session ou une entité définie par le client.

La méthode `llmobs.submitFeedback()` accepte un objet d'options avec les propriétés suivantes :

{{% collapse-content title="Arguments" level="h4" expanded=false id="submit-feedback-arguments" %}}
`label`
:  requis - _chaîne_
<br />Le nom de la métrique de feedback. Ne doit pas contenir de `.`.

`metricType`
:  requis - _chaîne_
<br />Le type de feedback. Doit être l'un des `categorical`, `score`, `boolean`, `json` ou `text`.

`value`
: requis - _chaîne, nombre, booléen ou objet_
<br />La valeur du feedback. Doit être une chaîne (pour les types de métriques `categorical` et `text`), un nombre (pour `score`), un booléen (pour `boolean`) ou un objet JSON (pour `json`).

`submitter`
: requis - _objet_
<br />Un objet qui identifie qui a soumis le retour d'information. Doit contenir un `id` non vide (chaîne), et peut contenir un `type` optionnel (chaîne), tel que `user`.

`span`
: optionnel - _object_
<br />Le contexte de span du span auquel associer le feedback. Ceci doit être la sortie de [`llmobs.exportSpan()`](#exporting-a-span).

`spanId`
:  optionnel - _chaîne_
<br />L'ID du span auquel associer le feedback.

`traceId`
:  optionnel - _chaîne_
<br />L'ID de la trace à laquelle associer le feedback.

`sessionId`
:  optionnel - _chaîne_
<br />L'ID de la session à laquelle associer le feedback.

`feedbackJoinKey`
:  optionnel - _chaîne_
<br />Une clé définie par le client à laquelle associer le feedback, telle qu'un incident ID ou un ticket ID. Définissez la même clé sur vos spans pour y associer le feedback.

   **Remarque**: Exactement un des éléments `span`, `spanId`, `traceId`, `sessionId` ou `feedbackJoinKey` est requis. En fournir plus d'un, ou aucun, génère une erreur.

`mlApp`
:  optionnel - _chaîne_
<br />Le nom de l'application ML. S'il n'est pas fourni, il prend par défaut la valeur de l'application ML configurée pour le SDK.

`timestampMs`
: optionnel - _nombre_
<br />L'horodatage Unix en millisecondes au moment où le feedback a été généré. S'il n'est pas fourni, la valeur par défaut est l'heure actuelle.

`tags`
: optionnel - _object_
<br />Un objet de paires clé-valeur sous forme de chaîne que les utilisateurs peuvent ajouter en tant que tags concernant le feedback. Pour plus d'informations sur les tags, consultez [Getting Started with Tags](/getting_started/tagging/).

`assessment`
:  optionnel - _chaîne_
<br />Une appréciation de ce feedback. Les valeurs acceptées sont `pass` et `fail`.

`reasoning`
: optionnel - _ chaîne_
<br />Une explication textuelle du feedback.
{{% /collapse-content %}}

#### Exemple {#example-30}

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // user application logic to invoke LLM
  const spanContext = llmobs.exportSpan()

  // submitting feedback for a trace
  llmobs.submitFeedback({
    label: 'thumbs',
    metricType: 'boolean',
    value: true,
    submitter: { id: 'user-123', type: 'user' },
    traceId: spanContext.traceId,
    assessment: 'pass'
  })

  // connecting the span to a customer-defined entity
  llmobs.annotate({
    tags: { feedback_join_key: 'incident-123' }
  })

  // submitting feedback for that entity
  llmobs.submitFeedback({
    label: 'user_comment',
    metricType: 'text',
    value: 'This answer was helpful.',
    submitter: { id: 'user-123', type: 'user' },
    feedbackJoinKey: 'incident-123'
  })
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
Utilisez `LLMObs.submitFeedback()` pour soumettre un feedback de l'utilisateur final associé à un span, une trace, une session ou une entité définie par le client. Construisez le feedback avec `LLMObs.Feedback.builder()`.

Le constructeur accepte les méthodes suivantes :

{{% collapse-content title="Arguments" level="h4" expanded=false id="submit-feedback-arguments" %}}
`label(String label)`
: requis
<br />Le nom de la métrique de feedback. Ne doit pas contenir de `.`.

`categoricalValue(String)`, `scoreValue(double)`, `booleanValue(boolean)`, `jsonValue(Map<String, Object>)` ou `textValue(String)`
: requis
<br />La valeur du feedback. Définissez exactement l'une de ces méthodes, ce qui détermine également le type de métrique.

`submitter(String id, String type)` ou `submitter(Submitter submitter)`
: requis
<br />Identifie qui a soumis le feedback. Le `id` doit être une chaîne non vide. Le `type` est un qualificateur optionnel, tel que `user`.

`span(LLMObsSpan span)`, `spanId(String)`, `traceId(String)`, `sessionId(String)` ou `feedbackJoinKey(String)`
: requis
<br />L'entité à laquelle rattacher le feedback. Définissez exactement l'une de ces méthodes. Utilisez `feedbackJoinKey` pour une entité définie par le client, telle qu'un ID d'incident ou un ID de ticket, et définissez la même clé sur vos spans pour y connecter le feedback.

`mlApp(String mlApp)`
: facultatif
<br />Le nom de l'application ML. S'il n'est pas fourni, la valeur par défaut est l'application ML configurée pour le traceur.

`timestampMs(long timestampMs)`
: facultatif
<br />L'horodatage Unix en millisecondes au moment où le feedback a été généré. S'il n'est pas fourni, la valeur par défaut est l'heure actuelle.

`tags(Map<String, Object> tags)` ou `tag(String key, Object value)`
: facultatif
<br />Paires clé-valeur utilisées pour taguer les commentaires. Pour plus d'informations sur les tags, consultez [Getting Started with Tags](/getting_started/tagging/).

`assessment(Assessment assessment)`
: facultatif
<br />Une appréciation de ce feedback. Les valeurs acceptées sont `LLMObs.Feedback.Assessment.PASS` et `LLMObs.Feedback.Assessment.FAIL`.

`reasoning(String reasoning)`
: facultatif
<br />Une explication textuelle du feedback.
{{% /collapse-content %}}

**Note**: `LLMObs.submitFeedback()` valide le commentaire et génère une `IllegalArgumentException` lorsque l'Agent Observability est activé et que le commentaire est invalide, par exemple lorsque la cible, la valeur ou l'expéditeur est manquant. Lorsque l'Agent Observability est désactivé, ou que l'Agent n'est pas attaché, l'appel est un no-op.

#### Exemple {#example-31}

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
      // connecting the span to a customer-defined entity
      llmSpan.setTag("feedback_join_key", "incident-123");
      llmSpan.finish();

      // submitting feedback for a trace
      LLMObs.submitFeedback(
          LLMObs.Feedback.builder()
              .traceId(llmSpan.getTraceId().toString())
              .label("thumbs")
              .booleanValue(true)
              .submitter("user-123", "end_user")
              .assessment(LLMObs.Feedback.Assessment.PASS)
              .reasoning("answered the question")
              .build());

      // submitting feedback for that entity
      LLMObs.submitFeedback(
          LLMObs.Feedback.builder()
              .feedbackJoinKey("incident-123")
              .label("user_comment")
              .textValue("The answer missed the customer impact.")
              .submitter("user-123", "end_user")
              .assessment(LLMObs.Feedback.Assessment.FAIL)
              .build());
    }
    return chatResponse;
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Traitement des spans {#span-processing}

Pour modifier les données d'entrée et de sortie sur les spans, vous pouvez configurer une fonction de processeur. La fonction de processeur a accès aux tags span pour permettre la modification conditionnelle des entrées/sorties. Les fonctions de processeur peuvent soit renvoyer le span modifié pour l'émettre, soit renvoyer `None`/`null` pour empêcher totalement l'émission du span. Ceci est utile pour filtrer les spans qui contiennent des données sensibles ou qui répondent à certains critères.

{{< tabs >}}
{{% tab "Python" %}}

### Exemple {#example-32}

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


### Exemple : modification conditionnelle avec auto-instrumentation {#example-conditional-modification-with-auto-instrumentation}

Lors de l'utilisation de l'auto-instrumentation, le span n'est pas toujours accessible contextuellement. Pour modifier conditionnellement les entrées et les sorties sur des spans auto-instrumentés, `annotation_context()` peut être utilisé en plus d'un processeur de span.

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

### Exemple : empêcher l'émission de spans {#example-preventing-spans-from-being-emitted}

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

### Exemple {#example-33}

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

### Exemple : modification conditionnelle avec auto-instrumentation {#example-conditional-modification-with-auto-instrumentation-1}

Lors de l'utilisation de l'auto-instrumentation, le span n'est pas toujours accessible contextuellement. Pour modifier conditionnellement les entrées et les sorties sur des spans auto-instrumentés, `llmobs.annotationContext()` peut être utilisé en plus d'un processeur de span.

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

### Exemple : empêcher l'émission de spans {#example-preventing-spans-from-being-emitted-1}

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


## Suivi des sessions utilisateur {#tracking-user-sessions}

Le suivi des sessions vous permet d'associer plusieurs interactions à un utilisateur donné.

{{< tabs >}}
{{% tab "Python" %}}
Lors du démarrage d'un span racine pour une nouvelle trace ou un nouveau span dans un nouveau processus, spécifiez l'argument `session_id` avec l'ID de chaîne de la session utilisateur sous-jacente, qui est soumis en tant que tag sur le span. En option, vous pouvez également spécifier les tags `user_handle`, `user_name` et `user_id`.

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

### Tags de suivi des sessions {#session-tracking-tags}

| Tag | Description |
|---|---|
| `session_id` | L'ID représentant une session utilisateur unique, par exemple, une session de chat. |
| `user_handle` | L'handle de l'utilisateur de la session de chat. |
| `user_name` | Le nom de l'utilisateur de la session de chat. |
| `user_id` | L'ID de l'utilisateur de la session de chat. |
{{% /tab %}}

{{% tab "Node.js" %}}
Lors du démarrage d'un span racine pour une nouvelle trace ou un nouveau span dans un nouveau processus, spécifiez l'argument `sessionId` avec l'ID de chaîne de la session utilisateur sous-jacente :

{{< code-block lang="javascript" >}}
function processMessage() {
    ... # user application logic
    return
}
processMessage = llmobs.wrap({ kind: 'workflow', sessionId: "<SESSION_ID>" }, processMessage)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
Lors du démarrage d'un span racine pour une nouvelle trace ou un nouveau span dans un nouveau processus, spécifiez l'argument `sessionId` avec l'ID de chaîne de la session utilisateur sous-jacente :

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

## Traçage distribué {#distributed-tracing}

Le SDK prend en charge le traçage entre des services ou des hosts distribués. Le traçage distribué fonctionne en propageant les informations de span à travers les requêtes web.

{{< tabs >}}
{{% tab "Python" %}}

La bibliothèque `ddtrace` fournit des intégrations prêtes à l'emploi qui prennent en charge le traçage distribué pour les frameworks web [1] et les bibliothèques [HTTP][2] populaires. Si votre application effectue des requêtes en utilisant ces bibliothèques prises en charge, vous pouvez activer le traçage distribué en exécutant :
{{< code-block lang="python">}}
from ddtrace import patch
patch(<INTEGRATION_NAME>=True)
{{< /code-block >}}

Si votre application n'utilise aucune de ces bibliothèques prises en charge, vous pouvez activer le traçage distribué en propageant manuellement les informations de span vers et depuis les en-têtes HTTP. Le SDK fournit les méthodes d'assistance `LLMObs.inject_distributed_headers()` et `LLMObs.activate_distributed_headers()` pour injecter et activer les contextes de traçage dans les en-têtes de requête.

### Injection des en-têtes distribués {#injecting-distributed-headers}

La méthode `LLMObs.inject_distributed_headers()` prend un span et injecte son contexte dans les en-têtes HTTP pour qu'ils soient inclus dans la requête. Cette méthode accepte les arguments suivants :

`request_headers`
: requis - _dictionnaire_
<br />Les en-têtes HTTP à étendre avec les attributs de contexte de traçage.

`span`
: optionnel - _Span_ - **par défaut**: `The current active span.`
<br />Le span dont le contexte doit être injecté dans les en-têtes de requête fournis. Pour tout span (y compris ceux utilisant des décorateurs de fonction), par défaut le span actif est utilisé.

### Activation des en-têtes distribués {#activating-distributed-headers}

La méthode `LLMObs.activate_distributed_headers()` prend des en-têtes HTTP et extrait les attributs de contexte de traçage pour les activer dans le nouveau service.

**Remarque** : Vous devez appeler `LLMObs.activate_distributed_headers()` avant de démarrer tout span dans votre service en aval. Les spans démarrés auparavant (y compris les spans de décorateur de fonction) ne sont pas capturés dans la trace distribuée.

Cette méthode accepte l'argument suivant :

`request_headers`
: requis - _dictionnaire_
<br />Les en-têtes HTTP à partir desquels extraire les attributs de contexte de traçage.


### Exemple {#example-34}

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

La bibliothèque `dd-trace` fournit des intégrations prêtes à l'emploi qui prennent en charge le traçage distribué pour les [frameworks web][1] populaires. L'importation du traceur active automatiquement ces intégrations, mais vous pouvez les désactiver en option avec :

{{< code-block lang="javascript">}}
const tracer = require('dd-trace').init({
  llmobs: { ... },
})
tracer.use('http', false) // disable the http integration
{{< /code-block >}}

[1]: /fr/tracing/trace_collection/compatibility/nodejs/#web-framework-compatibility
{{% /tab %}}
{{< /tabs >}}


## Traçage avancé {#advanced-tracing}

{{< tabs >}}
{{% tab "Python" %}}
### Traçage des spans à l'aide de méthodes en ligne {#tracing-spans-using-inline-methods}

Pour chaque type de span, la classe `ddtrace.llmobs.LLMObs` fournit une méthode en ligne correspondante pour tracer automatiquement l'opération qu'implique un bloc de code donné. Ces méthodes ont la même signature d'argument que leurs homologues décorateurs de fonction, avec l'ajout que `name` prend par défaut le type de span (`llm`, `workflow`, etc.) s'il n'est pas fourni. Ces méthodes peuvent être utilisées comme gestionnaires de contexte pour terminer automatiquement le span une fois le bloc de code inclus terminé.

#### Exemple {#example-35}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    with LLMObs.workflow(name="process_message", session_id="<SESSION_ID>", ml_app="<ML_APP>") as workflow_span:
        ... # user application logic
    return
{{< /code-block >}}

### Persistance d'un span entre les contextes {#persisting-a-span-across-contexts}

Pour démarrer et arrêter manuellement un span entre différents contextes ou périmètres :

1. Démarrez un span manuellement en utilisant les mêmes méthodes (par exemple, la méthode `LLMObs.workflow` pour un span de workflow), mais en tant qu'appel de fonction simple plutôt qu'en tant que gestionnaire de contexte.
2. Passez l'objet span en tant qu'argument à d'autres fonctions.
3. Arrêtez le span manuellement avec la méthode `span.finish()`. **Remarque** : le span doit être terminé manuellement, sinon il n'est pas soumis.

#### Exemple {#example-36}

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

#### Forcer le vidage dans les environnements sans serveur {#force-flushing-in-serverless-environments}

`LLMObs.flush()` est une fonction bloquante qui soumet toutes les données d'Agent Observability mises en mémoire tampon au backend Datadog. Cela peut être utile dans les environnements sans serveur pour empêcher une application de quitter avant que toutes les traces Agent Observability ne soient soumises.

### Traçage de plusieurs applications {#tracing-multiple-applications}

Le SDK prend en charge le traçage de plusieurs applications LLM à partir du même service.

Vous pouvez configurer une variable d'environnement `DD_LLMOBS_ML_APP` sur le nom de votre application LLM, dans laquelle tous les spans générés sont regroupés par défaut.

Pour remplacer cette configuration et utiliser un nom d'application LLM différent pour un span racine donné, transmettez l'argument `ml_app` avec le nom sous forme de chaîne de l'application LLM sous-jacente lors du démarrage d'un span racine pour une nouvelle trace ou d'un span dans un nouveau processus.

{{< code-block lang="python">}}
from ddtrace.llmobs.decorators import workflow

@workflow(name="process_message", ml_app="<NON_DEFAULT_ML_APP_NAME>")
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
### Traçage des spans à l'aide de méthodes en ligne {#tracing-spans-using-inline-methods-1}

Le SDK `llmobs` fournit une méthode en ligne correspondante pour tracer automatiquement l'opération qu'implique un bloc de code donné. Ces méthodes ont la même signature d'argument que leurs équivalents wrapper de fonction, avec l'ajout que `name` est requis, car le nom ne peut pas être déduit d'un rappel anonyme. Cette méthode terminera le span dans les conditions suivantes :

- Si la fonction renvoie une promesse, le span se termine lorsque la promesse est résolue ou rejetée.
- Si la fonction prend une fonction de rappel comme dernier paramètre, le span se termine lorsque cette fonction de rappel est appelée.
- Si la fonction n'accepte pas de rappel et ne renvoie pas de promesse, le span se termine à la fin de l'exécution de la fonction.

#### Exemple sans rappel {#example-without-a-callback}

{{< code-block lang="javascript" >}}
function processMessage () {
  return llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, workflowSpan => {
    ... // user application logic
    return
  })
}
{{< /code-block >}}

#### Exemple avec un rappel {#example-with-a-callback}

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

### Décorateurs de fonction en TypeScript {#function-decorators-in-typescript}

Le SDK Agent Observability Node.js propose une fonction `llmobs.decorate` qui sert de décorateur de fonction pour les applications TypeScript. Le comportement de traçage de cette fonction est identique à `llmobs.wrap`.

#### Exemple {#example-37}

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

### Forcer le vidage dans les environnements sans serveur {#force-flushing-in-serverless-environments-1}

`llmobs.flush()` est une fonction bloquante qui soumet toutes les données d'Agent Observability mises en mémoire tampon au backend Datadog. Cela peut être utile dans les environnements sans serveur pour empêcher une application de quitter avant que toutes les traces Agent Observability ne soient soumises.

### Traçage de plusieurs applications {#tracing-multiple-applications-1}

Le SDK prend en charge le traçage de plusieurs applications LLM à partir du même service.

Vous pouvez configurer une variable d'environnement `DD_LLMOBS_ML_APP` sur le nom de votre application LLM, dans laquelle tous les spans générés sont regroupés par défaut.

Pour remplacer cette configuration et utiliser un nom d'application LLM différent pour un span racine donné, transmettez l'argument `mlApp` avec le nom sous forme de chaîne de l'application LLM sous-jacente lors du démarrage d'un span racine pour une nouvelle trace ou d'un span dans un nouveau processus.

{{< code-block lang="javascript">}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'processMessage', mlApp: '<NON_DEFAULT_ML_APP_NAME>' }, processMessage)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Directives de nommage des applications {#application-naming-guidelines}

Le nom de votre application (la valeur de `DD_LLMOBS_ML_APP`) doit respecter ces directives :

- Doit être une chaîne Unicode en minuscules
- Peut comporter jusqu'à 193 caractères
- Ne peut pas contenir de traits de soulignement contigus ou finaux
- Peut contenir les caractères suivants :
   - Alphanumériques
   - Traits de soulignement
   - Tirets
   - Deux-points
   - Points
   - Barres obliques

## Pour aller plus loin {#further-reading}

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
[15]: /fr/llm_observability/monitoring/cost/#custom-tags-on-cost-and-tokens-metrics
[16]: /fr/llm_observability/monitoring/cost/#how-token-counts-are-calculated