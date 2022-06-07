---
title: Tracer des applications Node.js
kind: documentation
aliases:
  - /fr/tracing/nodejs/
  - /fr/tracing/languages/nodejs/
  - /fr/tracing/languages/javascript/
  - /fr/tracing/setup/javascript/
  - /fr/agent/apm/nodejs/
  - /fr/tracing/setup/nodejs
  - /fr/tracing/setup_overview/nodejs
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 30
further_reading:
  - link: https://github.com/DataDog/dd-trace-js
    tag: GitHub
    text: Code source
  - link: https://datadog.github.io/dd-trace-js
    tag: Documentation
    text: Documentation sur l'API
  - link: tracing/visualization/
    tag: Utiliser l'UI de l'APM
    text: Explorer vos services, ressources et traces
  - link: tracing/
    tag: Utilisation avancée
    text: Utilisation avancée
---
## Exigences de compatibilité

La dernière version du traceur Node.js prend officiellement en charge les versions `>=12`. Les versions `8` et `10` sont prises en charge en mode maintenance avec la version majeure `0.x` de la bibliothèque. Pour en savoir plus sur la compatibilité de Node.js et les versions prises en charge, consultez la page relative aux [exigences de compatibilité][1].

## Installation et démarrage

Pour ajouter la bibliothèque de tracing Datadog à vos applications Node.js, suivez les étapes suivantes :

1. Installez la bibliothèque de tracing Datadog avec npm pour Node.js 12+ :

    ```sh
    npm install dd-trace --save
    ```
    Si vous souhaitez effectuer le tracing des versions 8 ou 10 de Node.js en fin de vie, installez la version 0.x de `dd-trace` en exécutant :
    ```
    npm install dd-trace@latest-node10
    ```
    ou
    ```
    npm install dd-trace@latest-node8
    ```
    Pour en savoir plus sur nos tags de distribution et découvrir les versions du runtime Node.js prises en charge, consultez la page relative aux [exigences de compatibilité][1].

2. Importez et initialisez le traceur dans le code ou via des arguments de ligne de commande. La bibliothèque de tracing Node.js doit être importée et initialisée **avant** tous les autres modules.

   Une fois la bibliothèque configurée, si vous ne recevez pas de traces complètes, par exemple s'il manque les itinéraires des URL ou des spans, ou si des spans sont incomplètes, **vérifiez que vous avez bien suivi les instructions de l'étape 2**. La bibliothèque de tracing doit s'initialiser en premier pour que le traceur patche correctement l'ensemble des bibliothèques requises pour l'instrumentation automatique.

   Lorsque vous utilisez un transpileur comme TypeScript, Webpack ou encore Babel, importez et initialisez la bibliothèque du traceur dans un fichier externe, puis importez tout le contenu du fichier pendant la conception de l'application.

3. [Configurer l'Agent Datadog pour l'APM](#configurer-l-agent-datadog-pour-l-apm)

4. Ajoutez la [configuration](#configuration) de votre choix au traceur, par exemple les tags `service`, `env` et `version` pour bénéficier du [tagging de service unifié][2].

### Ajout du traceur dans le code

##### JavaScript

```js
// Cette ligne doit précéder l'importation des modules instrumentés.
const tracer = require('dd-trace').init();
```

#### TypeScript et bundlers

Pour TypeScript et les bundlers qui prennent en charge la syntaxe ECMAScript Module, initialisez le traceur dans un fichier distinct, afin de veiller à ce que les ressources se chargent dans le bon ordre.

```typescript
// server.ts
import './tracer'; // doit précéder l'importation des modules instrumentés.

// tracer.ts
import tracer from 'dd-trace';
tracer.init(); // initialisé dans un fichier différent pour empêcher l'accès aux variables avant leur définition.
export default tracer;
```

Si la configuration par défaut vous suffit, ou si toutes les configurations sont réalisées à l'aide de variables d'environnement, vous pouvez également utiliser `dd-trace/init` afin d'effectuer le chargement et l'initialisation durant une seule étape.

```typescript
import 'dd-trace/init';
```

### Ajout du traceur via des arguments de ligne de commande

Utilisez l'option `--require` à Node.js pour charger et initialiser le traceur en une seule étape.

```sh
node --require dd-trace/init app.js
```

**Remarque :** pour procéder ainsi, vous devez utiliser des variables d'environnement pour toutes les configurations du traceur.

### Configurer l'Agent Datadog pour l'APM

Installez et configurez l'Agent Datadog pour recevoir des traces de votre application désormais instrumentalisée. Par défaut, l'Agent Datadog est activé dans votre fichier `datadog.yaml` sous `apm_config` avec `enabled: true` et écoute le trafic de trace à `localhost:8126`. Pour les environnements coneteneurisés, suivez les liens ci-dessous pour activer la collecte de trace dans l'Agent Datadog.

{{< tabs >}}
{{% tab "Conteneurs" %}}

1. Positionnez `apm_non_local_traffic: true` dans la section `apm_config` de votre [fichier de configuration `datadog.yaml`][1] principal.

2. Consultez les instructions de configuration spécifiques pour vous assurer que l'Agent est configuré de façon à recevoir des traces dans un environnement conteneurisé :

{{< partial name="apm/apm-containers.html" >}}
</br>

3. Après avoir instrumenté votre application, le client de tracing envoie, par défaut, les traces à `localhost:8126`. S'il ne s'agit pas du host et du port adéquats, modifiez-les en définissant les variables d'environnement ci-dessous :

    `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT`

    ```sh
    DD_AGENT_HOST=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> node server
    ```

    Pour utiliser un autre protocole (tel qu'UDS), spécifiez l'URL complète en tant que variable d'environnement `DD_TRACE_AGENT_URL` unique.

    ```sh
    DD_TRACE_AGENT_URL=unix:<SOCKET_PATH> node server
    ```

{{< site-region region="us3,us5,eu,gov" >}}

4. Définissez `DD_SITE` dans l'Agent Datadog sur {{< region-param key="dd_site" code="true" >}} pour vous assurer que l'Agent envoie les données au bon site Datadog.

{{< /site-region >}}

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

Pour configurer l'APM Datadog dans AWS Lambda, consultez la documentation dédiée au [tracing de fonctions sans serveur][1].


[1]: /fr/tracing/serverless_functions/
{{% /tab %}}
{{% tab "Autres environnements" %}}

La trace est disponible pour un certain nombre d'autres environnements, comme [Heroku][1], [Cloud Foundry][2], [AWS Elastic Beanstalk][3], et [Azure App Service][4].

Pour les autres environnements, veuillez consulter la documentation relative aux [intégrations][5] pour l'environnement qui vous intéresse. [Contactez l'assistance][6] si vous rencontrez des problèmes de configuration.

[1]: /fr/agent/basic_agent_usage/heroku/#installation
[2]: /fr/integrations/cloud_foundry/#trace-collection
[3]: /fr/integrations/amazon_elasticbeanstalk/
[4]: /fr/infrastructure/serverless/azure_app_services/#overview
[5]: /fr/integrations/
[6]: /fr/help/
{{% /tab %}}
{{< /tabs >}}


Consultez les [paramètres du traceur][3] pour obtenir la liste des options d'initialisation.

## Configuration

Les paramètres du traceur peuvent être configurés avec les variables d'environnement suivantes :

### Tags

`DD_ENV`
: Définit l'environnement de l'application (par exemple, `prod`, `pre-prod` et `stage`). Par défaut, sa valeur correspond à l'environnement configuré dans l'Agent Datadog.

`DD_SERVICE`
: Le nom du service utilisé pour ce programme. Par défaut, sa valeur correspond à la valeur du champ name dans `package.json`.

`DD_VERSION`
: Le numéro de version de l'application. Par défaut, sa valeur correspond à la valeur du champ version dans `package.json`.

`DD_TAGS`
: Définit les tags globaux qui sont appliqués à l'ensemble des spans et métriques runtime. Si ce paramètre est passé en tant que variable d'environnement, respectez le format `key:value,key:value`. S'il est défini dans le code, respectez le format `tracer.init({ tags: { foo: 'bar' } })`.

Nous vous conseillons d'utiliser `DD_ENV`, `DD_SERVICE` et `DD_VERSION` afin de définir les tags `env`, `service` et `version` pour vos services. Consultez la documentation sur le [tagging de service unifié][2] pour en savoir plus sur la configuration de ces variables d'environnement.

### Instrumentation

`DD_TRACE_ENABLED`
: **Valeur par défaut** : `true`<br>
Indique si le traceur doit être activé.

`DD_TRACE_DEBUG`
: **Valeur par défaut** : `false`<br>
Active les logs de debugging dans le traceur.

`DD_TRACE_AGENT_URL`
: **Valeur par défaut** : `http://localhost:8126`<br>
L'URL de l'Agent de trace auquel le traceur transmet des données. Lorsque ce paramètre est défini, il est utilisé à la place du hostname et du port. Prend en charge les sockets de domaine Unix grâce au paramètre `apm_config.receiver_socket` de votre fichier `datadog.yaml` ou à la variable d'environnement `DD_APM_RECEIVER_SOCKET`.

`DD_TRACE_AGENT_HOSTNAME`
: **Valeur par défaut** : `localhost`<br>
L'adresse de l'Agent auquel le traceur transmet des données.

`DD_TRACE_AGENT_PORT`
: **Valeur par défaut** : `8126`<br>
Le port de l'Agent auquel le traceur transmet des données.

`DD_DOGSTATSD_PORT`
: **Valeur par défaut** : `8125`<br>
Le port de l'Agent DogStatsD auquel les métriques sont transmises.

`DD_LOGS_INJECTION`
: **Valeur par défaut** : `false`<br>
Active l'injection automatique d'ID de trace dans les logs, pour les bibliothèques de journalisation prises en charge.

`DD_TRACE_SAMPLE_RATE`
: Le pourcentage de spans à échantillonner. Valeur flottante comprise entre `0` et `1`. Par défaut, sa valeur correspond au débit renvoyé par l'Agent Datadog.

`DD_TRACE_RATE_LIMIT`
: Le pourcentage de spans à échantillonner. Valeur flottante comprise entre `0` et `1`. Par défaut, sa valeur correspond à `100` lorsque `DD_TRACE_SAMPLE_RATE` est défini. Si ce n'est pas le cas, c'est l'Agent Datadog qui doit définir les limites de débit.

`DD_RUNTIME_METRICS_ENABLED`
: **Valeur par défaut** :  `false`<br>
Indique si l'enregistrement des métriques runtime doit être activé. Le port `8125` (ou le port configuré avec `DD_DOGSTATSD_PORT`) doit être ouvert sur l'Agent pour le transport UDP.

`DD_SERVICE_MAPPING`
: **Exemple** : `mysql:my-mysql-service-name-db,pg:my-pg-service-name-db`<br>
Indique des noms de service pour chaque plug-in. Valeurs acceptées : paires `plugin:service-name` séparées par des virgules, avec ou sans espaces.

`DD_TRACE_DISABLED_PLUGINS`
: Une chaîne de noms d'intégration, séparés par des virgules. Ces intégrations sont automatiquement désactivées à l'initialisation du traceur. Variable d'environnement uniquement. Exemple : `DD_TRACE_DISABLED_PLUGINS=express,dns`.

`DD_TRACE_LOG_LEVEL`
: **Valeur par défaut** : `debug`<br>
Une chaîne de caractères indiquant le niveau minimum des logs du traceur à utiliser lorsque les logs de debugging sont activés. Exemple : `error`, `debug`.


Pour découvrir d'autres options, y compris l'API de configuration par programmation, consultez la [documentation relative à l'API][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/compatibility_requirements/nodejs
[2]: /fr/getting_started/tagging/unified_service_tagging/
[3]: https://datadog.github.io/dd-trace-js/#tracer-settings
[4]: /fr/help/