---
aliases:
- /fr/tracing/nodejs/
- /fr/tracing/languages/nodejs/
- /fr/tracing/languages/javascript/
- /fr/tracing/setup/javascript/
- /fr/agent/apm/nodejs/
- /fr/tracing/setup/nodejs
- /fr/tracing/setup_overview/nodejs
- /fr/tracing/setup_overview/setup/nodejs
code_lang: nodejs
code_lang_weight: 30
further_reading:
- link: https://github.com/DataDog/dd-trace-js
  tag: GitHub
  text: Code source
- link: https://datadog.github.io/dd-trace-js
  tag: Documentation
  text: Documentation sur l'API
- link: tracing/glossary/
  tag: Utiliser l'UI de l'APM
  text: Explorer vos services, ressources et traces
- link: tracing/
  tag: Utilisation avancée
  text: Utilisation avancée
kind: documentation
title: Tracer des applications Node.js
type: multi-code-lang
---
## Exigences de compatibilité

La dernière version du traceur Node.js prend en charge les versions `>=14`. Pour obtenir la liste complète des frameworks et versions Node.js pris en charge (y compris les anciennes versions et les versions de maintenance), consultez la page relative aux [exigences de compatibilité][1].

## Installation et démarrage

### Suivre la documentation dans l'application (conseillé)

Suivez les [instructions de démarrage rapide][2] indiquées dans la plateforme Datadog pour profiter d'une expérience optimale, et notamment :

- Obtenir des instructions détaillées en fonction de la configuration de votre déploiement (hosts, Docker, Kubernetes ou Amazon ECS) ;
- Définir les tags `service`, `env` et `version` de façon dynamique ;
- Activer le profileur en continu, l'ingestion de 100 % des traces et l'injection des ID de trace dans les logs durant la configuration.

### Configurer l'Agent Datadog pour l'APM

Installez et configurez l'Agent Datadog de façon à ce qu'il reçoive des traces à partir de votre application instrumentée. Par défaut, l'Agent Datadog est activé dans votre fichier `datadog.yaml` sous `apm_config` avec `enabled: true`, et écoute les données de tracing sur `http://localhost:8126`. Pour les environnements conteneurisés, suivez les liens ci-dessous afin d'activer la collecte de traces au sein de l'Agent Datadog.

{{< tabs >}}
{{% tab "Conteneurs" %}}

1. Définissez `apm_non_local_traffic: true` dans la section `apm_config` de votre [fichier de configuration principal `datadog.yaml`][1].

2. Consultez les instructions de configuration spécifiques pour vous assurer que l'Agent est configuré de façon à recevoir des traces dans un environnement conteneurisé :

{{< partial name="apm/apm-containers.html" >}}
</br>

3. Le client de tracing envoie par défaut les traces vers `localhost:8126`. S'il ne s'agit pas du host et du port de votre Agent, exécutez ce qui suit pour définir les variables d'environnement `DD_TRACE_AGENT_HOSTNAME` and `DD_TRACE_AGENT_PORT` :

    ```sh
    DD_TRACE_AGENT_HOSTNAME=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> node server
    ```

   Pour utiliser des sockets de domaine Unix, spécifiez l'URL complète en tant que variable d'environnement `DD_TRACE_AGENT_URL` unique.

   Si vous devez utiliser un autre socket, host ou port, définissez la variable d'environnement `DD_TRACE_AGENT_URL` ou les deux variables `DD_TRACE_AGENT_HOST` et `DD_TRACE_AGENT_PORT`. Exemples :

   ```sh
   DD_AGENT_HOST=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> node server
   DD_TRACE_AGENT_URL=http://<HOSTNAME>:<PORT> node server
   DD_TRACE_AGENT_URL=unix:<SOCKET_PATH> node server
   ```

{{< site-region region="us3,us5,eu,gov,ap1" >}}

4. Définissez `DD_SITE` dans l'Agent Datadog sur {{< region-param key="dd_site" code="true" >}} pour vous assurer que l'Agent envoie les données au bon site Datadog.

{{< /site-region >}}

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

Pour configurer l'APM Datadog dans AWS Lambda, consultez la documentation dédiée au [tracing de fonctions sans serveur][1].


[1]: /fr/tracing/serverless_functions/
{{% /tab %}}
{{% tab "Autres environnements" %}}

Le tracing est disponible pour d'autres environnements, tels que [Heroku][1], [Cloud Foundry][2] et [AWS Elastic Beanstalk][3].

Pour les autres environnements, consultez la documentation relative aux [intégrations][5] pour l'environnement pertinent. [Contactez l'assistance][6] si vous rencontrez des problèmes de configuration.

[1]: /fr/agent/basic_agent_usage/heroku/#installation
[2]: /fr/integrations/cloud_foundry/#trace-collection
[3]: /fr/integrations/amazon_elasticbeanstalk/
[5]: /fr/integrations/
[6]: /fr/help/
{{% /tab %}}
{{< /tabs >}}


Consultez les [paramètres du traceur][3] pour obtenir la liste des options d'initialisation.

### Instrumenter votre application

<div class="alert alert-info">Si vous recueillez des traces à partir d'une application Kubernetes ou d'une application exécutée sur un host ou conteneur Linux, plutôt que de suivre les instructions ci-dessous, vous pouvez injecter la bibliothèque de tracing dans votre application. Consultez la section <a href="/tracing/trace_collection/library_injection_local">Injecter des bibliothèques localement</a> pour obtenir des instructions.</div>

Une fois l'Agent installé, suivez les étapes ci-dessous afin d'ajouter la bibliothèque de tracing Datadog à vos applications Node.js :

1. Installez la bibliothèque de tracing Datadog avec npm pour Node.js 14+ :

    ```sh
    npm install dd-trace --save
    ```
    Si vous souhaitez effectuer le tracing de la version 12 de Node.js en fin de vie, installez la version 2.x de `dd-trace` en exécutant ce qui suit :
    ```
    npm install dd-trace@latest-node12
    ```
    Pour en savoir plus sur nos tags de distribution et découvrir les versions du runtime Node.js prises en charge, consultez la page relative aux [exigences de compatibilité][1].
    Si vous effectuez une mise à niveau depuis une version majeure de la bibliothèque (0.x, 1.x ou 2.x) vers une autre version majeure (2.x ou 3.x), consultez le [guide de migration][5] pour identifier les changements majeurs susceptibles de poser problème.

2. Importez et initialisez le traceur dans le code ou via des arguments de ligne de commande. La bibliothèque de tracing Node.js doit être importée et initialisée **avant** tous les autres modules.

   Une fois la bibliothèque configurée, si vous ne recevez pas de traces complètes, par exemple s'il manque les itinéraires des URL ou des spans, ou si des spans sont incomplètes, **vérifiez que vous avez bien suivi les instructions de l'étape 2**. La bibliothèque de tracing doit s'initialiser en premier pour que le traceur patche correctement l'ensemble des bibliothèques requises pour l'instrumentation automatique.

   Lorsque vous utilisez un transpileur comme TypeScript, Webpack ou encore Babel, importez et initialisez la bibliothèque du traceur dans un fichier externe, puis importez tout le contenu du fichier pendant la conception de l'application.

### Ajout du traceur dans le code

#### JavaScript

```javascript
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

### Création du bundle

`dd-trace` fonctionne en interceptant les appels `require()` effectués par l'application Node.js lorsqu'elle charge des modules. Cela inclut les modules intégrés à Node.js, comme le module `fs` pour accéder au système de fichiers, ainsi que les modules installés depuis le registre NPM, comme le module de base de données `pg`.

Les bundlers récupèrent tous les appels `require()` effectués par l'application aux fichiers sur le disque. Ils remplacent les appels `require()` par du code personnalisé et combinent l'intégralité du JavaScript qui en résulte en un seul fichier « bundle ». Lorsqu'un module intégré est chargé, tel que `require('fs')`, l'appel associé peut alors rester identique dans le bundle obtenu.

À ce stade, les outils APM comme `dd-trace` cessent de fonctionner. Ils peuvent continuer à intercepter les appels aux modules intégrés, mais pas les appels aux bibliothèques tierces. Cela signifie que lorsque vous utilisez un bundler sur une application `dd-trace`, le bundler risque de capturer les informations sur l'accès au disque (via `fs`) et les requêtes HTTP sortantes (via `http`), mais pas les appels aux bibliothèques tierces. Par exemple :
- Extraction des informations sur les parcours des requêtes entrantes pour le framework `express`.
- Affichage de la requête exécutée par le client de base de données `mysql`.

Une solution courante consiste à faire en sorte que tous les modules tiers devant être instrumentés par APM soient considérés comme « externes » au bundler. De cette façon, les modules instrumentés restent sur le disque et continuent d'être chargés avec `require()`, tandis que les modules non instrumentés sont inclus dans le bundle. Le build obtenu contient toutefois de nombreux fichiers superflus, ce qui va à l'encontre de l'objectif du bundling.

Datadog vous conseille d'utiliser des plug-ins de bundler personnalisés. Ces plug-ins sont capables d'indiquer au bundler comment se comporter, d'injecter du code intermédiaire et d'intercepter les appels `require()` « traduits ». Le bundle JavaScript inclut ainsi un plus grand nombre de packages.

**Remarque** : pour certaines applications, la totalité des modules peuvent être inclus dans le bundle. Toutefois, les modules natifs devront rester externes au bundle.

#### Prise en charge d'esbuild

Cette bibliothèque intègre une prise en charge expérimentale d'esbuild sous la forme d'un plug-in esbuild. Elle nécessite la version 16.17 ou 18.7 de Node.js au minimum. Pour utiliser le plug-in, assurez-vous d'avoir installé `dd-trace@3+`, puis utilisez require sur le module `dd-trace/esbuild` lors de la création de votre bundle.

Voici un exemple d'utilisation de `dd-trace` avec esbuild :

```javascript
const ddPlugin = require('dd-trace/esbuild')
const esbuild = require('esbuild')

esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  outfile: 'out.js',
  plugins: [ddPlugin],
  platform: 'node', // permet d'utiliser require sur les modules intégrés
  target: ['node16']
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
```

## Configuration

Au besoin, configurez la bibliothèque de tracing pour envoyer les données de télémétrie relatives aux performances de l'application, notamment en configurant le tagging de service unifié. Consultez la section relative à la [configuration de la bibliothèque][4] pour en savoir plus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/compatibility_requirements/nodejs
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://datadog.github.io/dd-trace-js/#tracer-settings
[4]: /fr/tracing/trace_collection/library_config/nodejs/
[5]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md