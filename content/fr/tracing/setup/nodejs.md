---
title: Tracer des applications Node.js
kind: documentation
aliases:
  - /fr/tracing/nodejs/
  - /fr/tracing/languages/nodejs/
  - /fr/tracing/languages/javascript/
  - /fr/tracing/setup/javascript/
  - /fr/agent/apm/nodejs/
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
## Installation et démarrage

Si vous avez déjà un compte Datadog, vous trouverez des [instructions détaillées][1] dans nos guides intégrés à l'application pour les configurations basées sur un host et les configurations basées sur un conteneur.

Pour connaître la définition des termes utilisés dans l'APM, consultez la [documentation officielle][2].

Pour en savoir plus sur la configuration et l'utilisation de l'API, consultez la [documentation relative à l'API][3] de Datadog.

Pour en savoir plus sur les contributions, consultez le [guide de développement][4].

### Prise en main

<div class="alert alert-warning">
Cette bibliothèque <strong>DOIT</strong> être importée et initialisée avant tous les autres modules instrumentés. Lors de l'utilisation d'un transcompilateur, vous <strong>DEVEZ</strong> importer et initialiser la bibliothèque de tracing dans un fichier externe, puis importer ce fichier en entier pendant la compilation de votre application. Cela empêche l'accès aux variables avant leur définition et garantit que la bibliothèque de tracing est importée et initialisée avant l'importation des autres modules instrumentés.
</div>

Pour commencer le tracing d'applications Node.js, commencez par [installer et configurer l'Agent Datadog][5], puis consultez la documentation supplémentaire relative au [tracing d'applications Docker][6] ou au tracing d'[applications Kubernetes][7].

Installez ensuite la bibliothèque de tracing Datadog avec npm :

```sh
npm install --save dd-trace
```

Enfin, importez et initialisez le traceur :

##### JavaScript

```js
// Cette ligne doit précéder l'importation des modules instrumentés.
const tracer = require('dd-trace').init();
```

##### TypeScript

```typescript
// server.ts
import './tracer'; // doit précéder l'importation des modules instrumentés.

// tracer.ts
import tracer from 'dd-trace';
tracer.init(); // initialisé dans un fichier différent pour empêcher l'accès aux variables avant leur définition.
export default tracer;
```

Consultez les [paramètres du traceur][8] pour obtenir la liste des options d'initialisation.

## Configuration

Les réglages du traceur peuvent être configurés en tant que paramètre de la méthode `init()` ou en tant que variables d'environnement.

### Tagging

| Configuration         | Variable d'environnement         | Valeur par défaut     | Description                                                                                                                                                                                                                                                                |
| -------------- | ---------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| env            | `DD_ENV`                     | `null`      | Définit l'environnement de l'application, p. ex. `prod`, `pre-prod` ou encore `stage`.                                                                                                                                                                                                    |
| service        | `DD_SERVICE`            | `null`      | Le nom du service à utiliser pour ce programme.                                                                                                                                                                                                                              |
| version        | `DD_VERSION`            | `null`      | Le numéro de version de l'application. Par défaut, correspond à la valeur du champ version dans package.json.
| tags           | `DD_TAGS`                    | `{}`        | Définit des tags globaux qui doivent être appliqués à l'ensemble des spans et métriques. Lorsque ce paramètre est transmis en tant que variable d'environnement, son format correspond à `key:value, key:value`.                                                                                                                             |

Nous vous conseillons d'utiliser `DD_ENV`, `DD_SERVICE` et `DD_VERSION` pour définir les paramètres `env`, `service` et `version` pour vos services. Consultez la documentation sur le [Tagging de service unifié][9] pour en savoir plus sur la configuration de ces variables d'environnement.

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
| reportHostname | `DD_TRACE_REPORT_HOSTNAME`   | `false`     | Indique si le hostname du système doit être transmis pour chaque trace. Lorsque cette option est désactivée, le hostname de l'Agent est transmis à la place.                                                                                                                                                          |
| experimental   | -                            | `{}`        | Les fonctionnalités expérimentales peuvent toutes être activées simultanément à l'aide de la valeur booléenne « true », ou individuellement à l'aide de paires key/value. [Contactez l'assistance][10] pour en savoir plus sur les fonctionnalités expérimentales disponibles.                                                                                   |
| plugins        | -                            | `true`      | Indique si l'instrumentation automatique des bibliothèques externes à l'aide des plug-ins intégrés doit être activée.                                                                                                                                                                       |
| - | `DD_TRACE_DISABLED_PLUGINS` | - | Une chaîne de noms d'intégration, séparés par des virgules, désactivées automatiquement à l'initialisation du traceur. Variable d'environnement uniquement. Exemple : `DD_TRACE_DISABLED_PLUGINS=express,dns`. |
| clientToken    | `DD_CLIENT_TOKEN`            | `null`      | Token client pour le tracing sur navigateur. Peut être généré dans Datadog en accédant à **Integrations** -> **APIs**.                                                                                                                                                                             |
| logLevel       | `DD_TRACE_LOG_LEVEL`         | `debug`     | Chaîne de caractères indiquant le niveau minimum des logs du traceur à utiliser lorsque la journalisation de debugging est activée. Exemple : `error` ou `debug`.                                                                                                                                                             |

## Modifier le hostname de l'Agent

Configurez vos traceurs d'applications de façon à envoyer des traces à un hostname d'Agent personnalisé :

Le module de tracing NodeJS recherche automatiquement les variables ENV `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` et s'initialise avec celles-ci.

```sh
DD_AGENT_HOST=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> node server
```

Pour utiliser un autre protocole (tel qu'UDS), spécifiez l'URL complète en tant que variable d'environnement `DD_TRACE_AGENT_URL` unique.

```sh
DD_TRACE_AGENT_URL=unix:<CHEMIN_SOCKET> node server
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/install
[2]: /fr/tracing/visualization/
[3]: https://datadog.github.io/dd-trace-js
[4]: https://github.com/DataDog/dd-trace-js/blob/master/README.md#development
[5]: /fr/tracing/send_traces/
[6]: /fr/tracing/setup/docker/
[7]: /fr/agent/kubernetes/apm/
[8]: https://datadog.github.io/dd-trace-js/#tracer-settings