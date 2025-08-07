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
- /fr/tracing/trace_collection/dd_libraries/nodejs/
code_lang: nodejs
code_lang_weight: 30
further_reading:
- link: https://github.com/DataDog/dd-trace-js
  tag: Code source
  text: Code source
- link: https://datadog.github.io/dd-trace-js
  tag: Documentation
  text: Documentation sur l'API
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: tracing/trace_collection/trace_context_propagation/
  tag: Documentation
  text: Utilisation avancée
title: Tracer des applications Node.js
type: multi-code-lang
---
## Exigences de compatibilité

La dernière version du traceur Node.js prend en charge les versions `>=18` de Node.js. Pour obtenir la liste complète des frameworks et versions Node.js pris en charge (y compris les anciennes versions et les versions de maintenance), consultez la page relative aux [exigences de compatibilité][1].

## Prise en main

Avant de commencer, assurez-vous d'avoir déjà [installé et configuré l'Agent][13]. Ensuite, suivez les étapes ci-dessous pour ajouter la bibliothèque de traçage Datadog à votre application Node.js afin de l'instrumenter.

### Installez la bibliothèque de traçage de Datadog :

Pour installer la bibliothèque de traçage Datadog avec npm pour Node.js 18+, exécutez :

  ```shell
  npm install dd-trace --save
  ```
Pour installer la bibliothèque de traçage Datadog (version 4.x de dd-trace) pour la version 16 de Node.js (en fin de vie), exécutez :
  ```shell
  npm install dd-trace@latest-node16
  ```
Pour plus d'informations sur les tags de distribution Datadog et la prise en charge des versions de Node.js, consultez la page [Configuration système requise][1]. 
Si vous mettez à jour une ancienne version majeure de la bibliothèque (0.x, 1.x, 2.x, 3.x ou 4.x) vers une nouvelle version majeure, consultez le [Guide de migration][5] pour prendre connaissance des éventuels changements majeurs.

### Importer et initialiser le traceur

Importez et initialisez le traceur dans le code ou via des arguments de ligne de commande. La bibliothèque de tracing Node.js doit être importée et initialisée **avant** tous les autres modules.

<div class="alert alert-info">Avec des frameworks comme <strong>Next.js</strong> et <strong>Nest.js</strong>, vous devez soit définir une variable d'environnement, soit ajouter un indicateur Node.js supplémentaire. Consultez la page <a href="/tracing/trace_collection/compatibility/nodejs/#complex-framework-usage">Utilisation avec des frameworks complexes</a> (en anglais) pour plus d'informations.</div>

Une fois la configuration terminée, si vous ne recevez pas de traces complètes (routes URL manquantes pour les requêtes web, spans manquants ou déconnectés, etc.), **vérifiez que le traceur a bien été importé et initialisé correctement**. La bibliothèque de traçage doit être initialisée en premier pour que le traceur puisse appliquer les patchs nécessaires aux bibliothèques automatiquement instrumentées.

Lorsque vous utilisez un transpileur comme TypeScript, Webpack ou encore Babel, importez et initialisez la bibliothèque du traceur dans un fichier externe, puis importez tout le contenu du fichier pendant la conception de l'application.

#### Option 1 : Ajouter le traceur dans le code

##### JavaScript

```javascript
// Cette ligne doit précéder l'importation des modules instrumentés.
const tracer = require('dd-trace').init();
```

**Remarque** : `DD_TRACE_ENABLED` est défini sur `true` par défaut, ce qui signifie qu'une partie de l'instrumentation a lieu lors de l'importation, avant l'initialisation. Pour désactiver complètement l'instrumentation, vous pouvez soit :
- importer le module de manière conditionnelle
- définir `DD_TRACE_ENABLED=false` (par exemple, si des imports ESM statiques ou de haut niveau empêchent le chargement conditionnel)

##### TypeScript et bundlers

Pour TypeScript et les bundlers prenant en charge la syntaxe ECMAScript Module, initialisez le traceur dans un fichier séparé pour garantir un ordre de chargement correct.

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

#### Option 2 : Ajouter le traceur via des arguments en ligne de commande

Utilisez l'option `--require` de Node.js pour charger et initialiser le traceur en une seule étape.

```sh
node --require dd-trace/init app.js
```

**Remarque :** pour procéder ainsi, vous devez utiliser des variables d'environnement pour toutes les configurations du traceur.

#### Applications ESM uniquement : Importer le chargeur

Les applications utilisant les ECMAScript Modules (ESM) nécessitent un argument de ligne de commande _supplémentaire_. Ajoutez cet argument quel que soit le mode d'importation ou d'initialisation du traceur :

- **Node.js < v20.6:** `--loader dd-trace/loader-hook.mjs`
- **Node.js >= v20.6:** `--import dd-trace/register.js`

Par exemple, sous Node.js 22, si vous utilisez l'option 1 vue précédemment pour initialiser le traceur, vous démarrerez ainsi :

```sh
node --import dd-trace/register.js app.js
```

Cela peut également être combiné avec l'argument `--require dd-trace/init` (option 2) :

```sh
node --import dd-trace/register.js --require dd-trace/init app.js
```

Un raccourci existe pour combiner les deux arguments sous Node.js v20.6 et versions ultérieures :

```sh
node --import dd-trace/initialize.mjs app.js
```

### Création du bundle

`dd-trace` fonctionne en interceptant les appels `require()` effectués par l'application Node.js lorsqu'elle charge des modules. Cela inclut les modules intégrés à Node.js, comme le module `fs` pour accéder au système de fichiers, ainsi que les modules installés depuis le registre NPM, comme le module de base de données `pg`.

Les bundlers récupèrent tous les appels `require()` effectués par l'application aux fichiers sur le disque. Ils remplacent les appels `require()` par du code personnalisé et combinent l'intégralité du JavaScript qui en résulte en un seul fichier « bundle ». Lorsqu'un module intégré est chargé, tel que `require('fs')`, l'appel associé peut alors rester identique dans le bundle obtenu.

À ce stade, les outils APM comme `dd-trace` cessent de fonctionner. Ils peuvent continuer à intercepter les appels aux modules intégrés, mais pas les appels aux bibliothèques tierces. Cela signifie que lorsque vous utilisez un bundler sur une application `dd-trace`, le bundler risque de capturer les informations sur l'accès au disque (via `fs`) et les requêtes HTTP sortantes (via `http`), mais pas les appels aux bibliothèques tierces. Par exemple :
- Extraction des informations sur les parcours des requêtes entrantes pour le framework `express`.
- Affichage de la requête exécutée par le client de base de données `mysql`.

Une solution courante consiste à faire en sorte que tous les modules tiers devant être instrumentés par APM soient considérés comme « externes » au bundler. De cette façon, les modules instrumentés restent sur le disque et continuent d'être chargés avec `require()`, tandis que les modules non instrumentés sont inclus dans le bundle. Le build obtenu contient toutefois de nombreux fichiers superflus, ce qui va à l'encontre de l'objectif du bundling.

Datadog vous conseille d'utiliser des plug-ins de bundler personnalisés. Ces plug-ins sont capables d'indiquer au bundler comment se comporter, d'injecter du code intermédiaire et d'intercepter les appels `require()` « traduits ». Le bundle JavaScript inclut ainsi un plus grand nombre de packages.

**Remarque** : pour certaines applications, la totalité des modules peuvent être inclus dans le bundle. Toutefois, les modules natifs devront rester externes au bundle.

#### Bundling avec esbuild

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
  platform: 'node', // permet d'importer les modules intégrés
  target: ['node16'],
  external: [
    // requis si vous utilisez les métriques natives
    '@datadog/native-metrics',

    // requis si vous utilisez le profiling
    '@datadog/pprof',

    // requis si vous utilisez les fonctionnalités de sécurité Datadog
    '@datadog/native-appsec',
    '@datadog/native-iast-taint-tracking',
    '@datadog/native-iast-rewriter',

    // requis si vous rencontrez des erreurs graphql pendant la compilation
    'graphql/language/visitor',
    'graphql/language/printer',
    'graphql/utilities'
  ]
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
```

#### Bundling avec Next.js

Si vous utilisez Next.js ou un autre framework reposant sur webpack pour le bundling, ajoutez une déclaration
similaire à celle-ci dans votre fichier `next.config.js` :

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... autres parties non pertinentes ...

  // cette configuration webpack personnalisée est requise pour le traçage Datadog
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    const externals = [
      // required if you use native metrics
      '@datadog/native-metrics',

      // required if you use profiling
      '@datadog/pprof',

      // required if you use Datadog security features
      '@datadog/native-appsec',
      '@datadog/native-iast-taint-tracking',
      '@datadog/native-iast-rewriter',

      // required if you encounter graphql errors during the build step
      'graphql/language/visitor',
      'graphql/language/printer',
      'graphql/utilities'
    ];
    config.externals.push(...externals);
    return config;
  },
};

export default nextConfig;
```

#### Fonctionnalités de Datadog non prises en charge

Les fonctionnalités suivantes sont désactivées par défaut dans le traceur Node.js. Elles ne sont pas compatibles avec le bundling et ne peuvent pas être utilisées si votre application est bundlée :

- APM : Dynamic Instrumentation (instrumentation dynamique)

#### Remarques générales sur le bundling

**Remarque** : en raison de l’utilisation de modules natifs dans le traceur (fichiers compilés en C++ se terminant souvent par `.node`), vous devez ajouter des entrées à votre liste `external`. Actuellement, les modules natifs utilisés par le traceur Node.js sont inclus dans des packages commençant par `@datadog`. Vous devrez également fournir un répertoire `node_modules/` avec votre application bundlée. Vous n’avez pas besoin d’inclure tout votre `node_modules/`, cela inclurait des dépendances superflues déjà présentes dans le bundle.

Pour générer un répertoire `node_modules/` plus petit contenant uniquement les modules natifs requis (et leurs dépendances), commencez par déterminer les versions des packages dont vous avez besoin, puis créez un répertoire temporaire pour les installer, et copiez le répertoire `node_modules/` obtenu à partir de ce dernier. Par exemple :

```sh
cd path/to/project
npm ls @datadog/native-metrics
# dd-trace@5.4.3-pre ./dd-trace-js
# └── @datadog/native-metrics@2.0.0
$ npm ls @datadog/pprof
# dd-trace@5.4.3-pre ./dd-trace-js
# └── @datadog/pprof@5.0.0
mkdir temp && cd temp
npm init -y
npm install @datadog/native-metrics@2.0.0 @datadog/pprof@5.0.0
cp -R ./node_modules path/to/bundle
```

**Remarque** : dans le cas de Next.js, `path/to/bundle` correspond généralement au répertoire `.next/standalone` de votre application.

À ce stade, vous devriez pouvoir déployer votre bundle (votre code d’application + la plupart de vos dépendances), accompagné du répertoire `node_modules/` contenant les modules natifs nécessaires.

## Configuration

Au besoin, configurez la bibliothèque de tracing pour envoyer les données de télémétrie relatives aux performances de l'application, notamment en configurant le tagging de service unifié. Consultez la section relative à la [configuration de la bibliothèque][4] pour en savoir plus.

Consultez les [paramètres du traceur][3] pour obtenir la liste des options d'initialisation.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/compatibility_requirements/nodejs
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://datadog.github.io/dd-trace-js/#tracer-settings
[4]: /fr/tracing/trace_collection/library_config/nodejs/
[5]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[6]: /fr/tracing/trace_collection/compatibility/nodejs/#complex-framework-usage
[11]: /fr/tracing/trace_collection/library_injection_local/
[13]: /fr/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent