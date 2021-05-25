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
  - link: 'https://github.com/DataDog/dd-trace-js'
    tag: GitHub
    text: Code source
  - link: 'https://datadog.github.io/dd-trace-js'
    tag: Documentation
    text: Documentation sur l'API
  - link: tracing/visualization/
    tag: Utiliser l'UI de l'APM
    text: 'Explorer vos services, ressources et traces'
  - link: tracing/
    tag: Utilisation avancée
    text: Utilisation avancée
---
## Exigences de compatibilité

Le traceur NodeJS prend officiellement en charge les versions `>=8`. Seules les versions paires, telles que 8.x et 10.x, sont officiellement prises en charge. Les versions impaires, telles que 9.x et 11.x, devraient fonctionner, mais cela n'a pas été officiellement confirmé. Pour obtenir la liste complète des bibliothèques prises en charge, consultez la page [Exigences de compatibilité][1].

## Installation et démarrage

Pour ajouter la bibliothèque de tracing Datadog à vos applications Node.js, suivez les étapes suivantes :

1. Installez la bibliothèque de tracing Datadog avec npm :

```sh
npm install dd-trace --save 
```

2. Importez et initialisez le traceur dans le code ou via des arguments de ligne de commande. La bibliothèque de tracing Node.js doit être importée et initialisée **avant** tous les autres modules.

   Une fois la bibliothèque configurée, si vous ne recevez pas de traces complètes, par exemple s'il manque les itinéraires des URL ou des spans, ou si des spans sont incomplètes, **vérifiez que vous avez bien suivi les instructions de l'étape 2**. La bibliothèque de tracing doit s'initialiser en premier pour que le traceur patche correctement l'ensemble des bibliothèques requises pour l'instrumentation automatique.

   Lorsque vous utilisez un transpileur comme TypeScript, Webpack ou encore Babel, importez et initialisez la bibliothèque du traceur dans un fichier externe, puis importez tout le contenu du fichier pendant la conception de l'application.

3. [Configurer l'Agent Datadog pour l'APM](#configure-the-datadog-agent-for-apm)

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
import `dd-trace/init`;
```

### Ajout du traceur via des arguments de ligne de commande

Utilisez l'option `--require` à Node.js pour charger et initialiser le traceur en une seule étape.

```sh
node --require dd-trace/init app.js
```

**Remarque :** pour procéder ainsi, vous devez utiliser des variables d'environnement pour toutes les configurations du traceur.

### Configurer l'Agent Datadog pour l'APM

Installez et configurez l'Agent Datadog de façon à ce qu'il reçoive des traces à partir de votre application instrumentée. Par défaut, l'Agent Datadog est activé dans votre fichier `datadog.yaml`, sous `apm_enabled: true`, et écoute le trafic des traces sur `localhost:8126`. Pour les environnements conteneurisés, suivez les liens ci-dessous afin d'activer la collecte de traces au sein de l'Agent Datadog.

{{< tabs >}}
{{% tab "Conteneurs" %}}

1. Définissez `apm_non_local_traffic: true` dans votre [fichier de configuration principal `datadog.yaml`][1].

2. Consultez les instructions de configuration spécifiques pour vous assurer que l'Agent est configuré de façon à recevoir des traces dans un environnement conteneurisé :

{{< partial name="apm/apm-containers.html" >}}
</br>

3. Après avoir instrumenté votre application, le client de tracing envoie, par défaut, les traces à `localhost:8126`. S'il ne s'agit pas du host et du port adéquats, modifiez-les en définissant les variables d'environnement ci-dessous :

`DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT`.

```sh
DD_AGENT_HOST=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> node server
```

Pour utiliser un autre protocole (tel qu'UDS), spécifiez l'URL complète en tant que variable d'environnement `DD_TRACE_AGENT_URL` unique.

```sh
DD_TRACE_AGENT_URL=unix:<CHEMIN_SOCKET> node server
```


[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

Pour configurer l'APM Datadog dans AWS Lambda, consultez la documentation dédiée au [tracing de fonctions sans serveur][1].


[1]: /fr/tracing/serverless_functions/
{{% /tab %}}
{{% tab "Autres environnements" %}}

Le tracing est disponible pour un certain nombre d'environnements, tels que [Heroku][1], [Cloud Foundry][2], [AWS Elastic Beanstalk][3] et l'[extension Azure App Services][4].

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

Les réglages du traceur peuvent être configurés en tant que paramètre de la méthode `init()` ou en tant que variables d'environnement.

### Tagging

| Configuration         | Variable d'environnement         | Valeur par défaut     | Description                                                                                                                                                                                                                                                                |
| -------------- | ---------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| env            | `DD_ENV`                     | `null`      | Définit l'environnement de l'application, p. ex. `prod`, `pre-prod` ou encore `stage`. Disponible à partir de la version 0.20.                                                                                                                                                                                                     |
| service        | `DD_SERVICE`            | `null`      | Le nom de service à utiliser pour ce programme. Disponible pour les versions 0.20+                                                                                                                                                                                                                              |
| version        | `DD_VERSION`            | `null`      | Le numéro de version de l'application. Par défaut, correspond à la valeur du champ version dans package.json. Disponible à partir de la version 0.20.
| tags           | `DD_TAGS`                    | `{}`        | Définit des tags globaux qui doivent être appliqués à l'ensemble des spans et métriques runtime. Lorsque ce paramètre est passé en tant que variable d'environnement, son format correspond à `key:value,key:value`. Lorsqu'il est défini dans le code : `tracer.init({ tags: { foo: 'bar' } })`. Disponible à partir de la version 0.20.                                                                                                                            |

Nous vous conseillons d'utiliser `DD_ENV`, `DD_SERVICE` et `DD_VERSION` afin de définir les tags `env`, `service` et `version` pour vos services. Consultez la documentation sur le [tagging de service unifié][2] pour en savoir plus sur la configuration de ces variables d'environnement.

### Instrumentation

| Configuration         | Variable d'environnement         | Valeur par défaut     | Description                                                                                                                                                                                                                                                                |
| -------------- | ---------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enabled        | `DD_TRACE_ENABLED`           | `true`      | Indique si le traceur doit être activé.                                                                                                                                                                                                                                              |
| debug          | `DD_TRACE_DEBUG`             | `false`     | Active la journalisation de debugging dans le traceur.                                                                                                                                                                                                                                        |
| url            | `DD_TRACE_AGENT_URL`         | `null`      | L'URL de l'Agent de trace auquel le traceur transmet des données. Lorsque ce paramètre est défini, il est utilisé à la place du hostname et du port. Prend en charge les sockets de domaine Unix grâce au paramètre `apm_config.receiver_socket` de votre fichier `datadog.yaml` ou à la variable d'environnement `DD_APM_RECEIVER_SOCKET`. |
| hostname       | `DD_TRACE_AGENT_HOSTNAME`    | `localhost` | L'adresse de l'Agent auquel le traceur transmet des données.                                                                                                                                                                                                                       |
| port           | `DD_TRACE_AGENT_PORT`        | `8126`      | Le port de l'Agent de trace auquel le traceur transmet des données.                                                                                                                                                                                                                    |
| dogstatsd.port | `DD_DOGSTATSD_PORT`          | `8125`      | Le port de l'Agent DogStatsD auquel les métriques sont transmises.                                                                                                                                                                                                             |
| logInjection   | `DD_LOGS_INJECTION`          | `false`     | Active l'injection automatique d'ID de trace dans les logs, pour les bibliothèques de journalisation prises en charge.                                                                                                                                                                                           |
| sampleRate     | -                            | `1`         | Pourcentage de spans à échantillonner. Valeur flottante comprise entre `0` et `1`.                                                                                                                                                                                                              |
| flushInterval  | -                            | `2000`      | Intervalle (en millisecondes) de transmission par le traceur des traces à l'Agent.                                                                                                                                                                                                |
| runtimeMetrics | `DD_RUNTIME_METRICS_ENABLED` | `false`     | Indique si l'enregistrement des métriques runtime doit être activé. Le port `8125` (ou le port configuré avec `dogstatsd.port`) doit être ouvert sur l'Agent pour le transport UDP.                                                                                                                                        |
| experimental   | -                            | `{}`        | Les fonctionnalités expérimentales peuvent toutes être activées simultanément à l'aide de la valeur booléenne « true », ou individuellement à l'aide de paires key/value. [Contactez l'assistance][4] pour en savoir plus sur les fonctionnalités expérimentales disponibles.                                                                                   |
| plugins        | -                            | `true`      | Indique si l'instrumentation automatique des bibliothèques externes à l'aide des plug-ins intégrés doit être activée.                                                                                                                                                                       |
| - | `DD_TRACE_DISABLED_PLUGINS` | - | Une chaîne de noms d'intégration, séparés par des virgules, désactivées automatiquement à l'initialisation du traceur. Variable d'environnement uniquement. Exemple : `DD_TRACE_DISABLED_PLUGINS=express,dns`. |
| clientToken    | `DD_CLIENT_TOKEN`            | `null`      | Token client pour le tracing sur navigateur. Peut être généré dans Datadog en accédant à **Integrations** -> **APIs**.                                                                                                                                                                             |
| logLevel       | `DD_TRACE_LOG_LEVEL`         | `debug`     | Chaîne de caractères indiquant le niveau minimum des logs du traceur à utiliser lorsque la journalisation de debugging est activée. Exemple : `error` ou `debug`.                                                                                                                                                             |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/compatibility_requirements/nodejs
[2]: /fr/getting_started/tagging/unified_service_tagging/
[3]: https://datadog.github.io/dd-trace-js/#tracer-settings
[4]: /fr/help/