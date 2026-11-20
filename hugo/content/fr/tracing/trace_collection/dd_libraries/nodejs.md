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
- /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs
code_lang: nodejs
code_lang_weight: 30
further_reading:
- link: https://datadog.github.io/dd-trace-js
  tag: Documentation
  text: Documentation sur l'API
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: tracing/
  tag: Documentation
  text: Utilisation avancée
- link: https://learn.datadoghq.com/courses/configure-manage-apm-sdk
  tag: Centre d'apprentissage
  text: Configurez et gérez le SDK APM pour vos applications
- link: https://github.com/DataDog/dd-trace-js
  tag: Code source
  text: Code source
title: Tracer des applications Node.js
type: multi-code-lang
---
## Exigences de compatibilité {#compatibility-requirements}

La dernière version du traceur Node.js prend en charge les versions `>=18` de Node.js. Pour obtenir la liste complète des frameworks et versions Node.js pris en charge par Datadog (y compris les anciennes versions et les versions de maintenance), consultez la page relative aux [exigences de compatibilité][1].

## Mise en route {#getting-started}

Avant de commencer, vérifiez que vous avez bien [installé et configuré l'Agent][13]. Ensuite, suivez les étapes ci-dessous pour ajouter le SDK Datadog à votre application Node.js afin de l'instrumenter.

### Installez le SDK Datadog {#install-the-datadog-sdk}

Pour installer le SDK Datadog via npm pour Node.js 18+, exécutez :

  ```shell
  npm install dd-trace
  ```
Pour installer le SDK Datadog (version 4.x de `dd-trace`) pour la version 16 de Node.js en fin de vie, exécutez :
  ```shell
  npm install dd-trace@latest-node16
  ```
Pour plus d'informations sur les tags de distribution de Datadog et la prise en charge des versions du runtime Node.js, consultez la page relative aux [exigences de compatibilité][1].
Si vous effectuez une mise à niveau depuis une version majeure précédente de la bibliothèque (0.x, 1.x, 2.x, 3.x ou 4.x) vers une autre version majeure, lisez le [Guide de migration][5] pour évaluer les changements incompatibles.

<div class="alert alert-info">Dans les environnements Serverless ou avec Single-Step Instrumentation, la bibliothèque est déjà préinstallée ; vous n'avez donc pas besoin de l'ajouter en tant que dépendance. Ajoutez-la plutôt en tant que dépendance de développement pour obtenir le traçage en local :
  <div class="highlight code-snippet js-appended-copy-btn">
    <pre tabindex="0" class="chroma">
      <code class="language-shell" data-lang="shell"><span class="line"><span class="cl">npm install dd-trace -D <span class="c1"># instead of `npm install dd-trace`</span></span></span></code>
    </pre>
    <div class="code-button-wrapper position-absolute">
      <button class="btn text-primary js-copy-button">Copy</button>
    </div>
  </div>
</div>

### Installez l'API publique Datadog (facultatif) {#install-the-datadog-public-api-optional}

Cette étape n'est requise que pour l'instrumentation personnalisée dans les environnements Serverless ou avec Single-Step Instrumentation. Pour d'autres cas d'utilisation d'instrumentation personnalisée, c'est facultatif. Pour plus d'informations sur le moment où utiliser l'API publique Datadog, consultez [Instrumentation personnalisée à l'aide de la Datadog API][14].

  ```shell
  npm install dd-trace-api
  ```

Vous pouvez ensuite importer `dd-trace-api` au lieu de `dd-trace` dans tout code effectuant une instrumentation personnalisée.

### Importez et initialisez le traceur {#import-and-initialize-the-tracer}

Importez et initialisez le traceur soit dans le code, soit avec des arguments de ligne de commande. Le SDK Node.js doit être importé et initialisé **avant** tout autre module.

<div class="alert alert-info">Avec des frameworks comme <strong>Next.js</strong> et <strong>Nest.js</strong>, vous devez soit fournir une variable d'environnement, soit ajouter un indicateur Node.js supplémentaire. Consultez <a href="/tracing/trace_collection/compatibility/nodejs/#complex-framework-usage">Utilisation de frameworks complexes</a> pour plus d'informations.</div>

Une fois la configuration terminée, si vous ne recevez pas de traces complètes, notamment si les routes URL des requêtes web sont absentes ou si des spans sont déconnectés ou manquants, **vérifiez que le SDK a été importé et initialisé correctement**. Il est nécessaire que le SDK soit initialisé en premier pour qu’il puisse appliquer correctement les correctifs à toutes les bibliothèques nécessaires à l’instrumentation automatique.

Lorsque vous utilisez un transcompilateur tel que TypeScript, Webpack, Babel ou un autre, importez et initialisez le SDK dans un fichier externe, puis importez ce fichier dans son ensemble lors de la compilation de votre application.

#### Ajoutez le SDK avec des arguments de ligne de commande {#add-the-sdk-with-command-line-arguments}

Utilisez l'option `--require` de Node.js pour charger et initialiser le SDK en une seule étape.

```sh
node --require dd-trace/init app.js
```

L'approche ci-dessus nécessite l'utilisation de variables d'environnement pour toute la configuration du SDK. Si vous devez utiliser une configuration programmatique, initialisez `dd-trace` dans un fichier dédié et chargez plutôt ce fichier :

```sh
node --require ./dd-trace.js app.js
```

Le fichier doit contenir ceci :

```js
// ./dd-trace.js
require('dd-trace').init({
  // programmatic config
})
```

Dans les cas où il n’est pas possible de contrôler les arguments de ligne de commande, vous pouvez utiliser une variable d’environnement à la place :

<div class="alert alert-info"><code>DD_TRACE_ENABLED</code> est <code>true</code> par défaut, ce qui signifie qu'une partie de l'instrumentation se produit au moment de l'importation, avant l'initialisation. Pour désactiver complètement l'instrumentation, vous pouvez effectuer l'une des opérations suivantes :
  <ul>
    <li>Importez le module de manière conditionnelle</li>
    <li>Définissez <code>DD_TRACE_ENABLED=false</code> (si, par exemple, des importations ESM statiques ou au niveau supérieur empêchent le chargement conditionnel)</li>
  <ul>
</div>

#### Applications ESM uniquement : Importez le chargeur {#esm-applications-only-import-the-loader}

Les applications ECMAScript Modules (ESM) nécessitent un argument de ligne de commande _supplémentaire_. Ajoutez cet argument indépendamment de la manière dont le SDK est par ailleurs importé et initialisé :

- **Node.js < v20.6 :** `--loader dd-trace/loader-hook.mjs`
- **Node.js >= v20.6 :** `--import dd-trace/register.js`

Par exemple, dans Node.js 22, si vous initialisez le SDK en utilisant la première option ci-dessus, vous le démarreriez comme ceci :

```sh
node --import dd-trace/register.js app.js
```

Cela peut également être combiné avec l'argument de ligne de commande `--require dd-trace/init` :

```sh
node --import dd-trace/register.js --require dd-trace/init app.js
```

Un raccourci existe pour combiner les deux arguments de ligne de commande dans Node.js v20.6 et versions ultérieures :

```sh
node --import dd-trace/initialize.mjs app.js
```

### Regroupement {#bundling}

`dd-trace` fonctionne en interceptant les appels `require()` qu'une application Node.js effectue lors du chargement de modules. Cela inclut les modules intégrés à Node.js, comme le module `fs` pour accéder au système de fichiers, ainsi que les modules installés depuis le registre NPM, comme le module de base de données `pg`.

Les outils de regroupement parcourent tous les appels `require()` qu'une application effectue pour charger des fichiers sur le disque. Il remplace les appels `require()` par du code personnalisé et combine tout le JavaScript résultant en un seul fichier « bundlé ». Lorsqu'un module intégré est chargé, tel que `require('fs')`, cet appel peut alors rester le même dans le bundle résultant.

Les outils APM comme `dd-trace` cessent de fonctionner à ce stade. Ils peuvent continuer à intercepter les appels pour les modules intégrés mais n'interceptent pas les appels vers des bibliothèques tierces. Cela signifie que lorsque vous regroupez une application `dd-trace` à l'aide d'un outil de regroupement, celui-ci est susceptible de capturer des informations sur les accès au disque (via `fs`) et les requêtes HTTP sortantes (via `http`), mais pas les appels aux bibliothèques tierces. Par exemple :
- Extraction des informations de route de requête entrante pour le framework `express`.
- Indique quelle requête est exécutée pour le client de base de données `mysql`.

Une solution de contournement courante consiste à traiter tous les modules tiers que l'APM doit instrumenter comme étant « externes » au bundler. Avec ce paramètre, les modules instrumentés restent sur le disque et continuent d'être chargés avec `require()` tandis que les modules non instrumentés sont bundlés. Cependant, cela produit une version compilée contenant de nombreux fichiers superflus, ce qui commence à aller à l'encontre de l'objectif du regroupement.

Datadog recommande d'utiliser des plugins de bundler personnalisés. Ces plugins sont capables d'indiquer au bundler comment se comporter, d'injecter du code intermédiaire et d'intercepter les appels `require()` « traduits ». En conséquence, davantage de paquets sont inclus dans le fichier JavaScript bundlé.

**Remarque** : Certaines applications peuvent avoir 100 % de leurs modules regroupés dans un bundle ; les modules natifs doivent toutefois rester en dehors du bundle.

#### Création d’un bundle avec esbuild {#bundling-with-esbuild}

Cette bibliothèque fournit une prise en charge d'esbuild sous la forme d'un plugin esbuild et nécessite au moins Node.js v16.17 ou v18.7. Pour utiliser le plugin, assurez-vous d'avoir installé `dd-trace@3+`, puis chargez le module `dd-trace/esbuild` avec require lors de la création de votre bundle.

Voici un exemple de la façon dont on peut utiliser `dd-trace` avec esbuild :

```javascript
const ddPlugin = require('dd-trace/esbuild')
const esbuild = require('esbuild')

esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  outfile: 'out.js',
  plugins: [ddPlugin],
  platform: 'node', // allows built-in modules to be required
  target: ['node16'],
  external: [
    // required if you use native metrics
    '@datadog/native-metrics',

    // required if you use profiling
    '@datadog/pprof',

    // required if you use Datadog security features
    '@datadog/native-appsec',
    '@datadog/native-iast-taint-tracking',
    '@datadog/wasm-js-rewriter',
  ]
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
```

#### Création d’un bundle avec Webpack {#bundling-with-webpack}

Cette bibliothèque fournit une prise en charge expérimentale de Webpack sous la forme d'un plugin Webpack. Pour utiliser le plugin, assurez-vous d’avoir installé `dd-trace@5.94.0+`, puis chargez le module `dd-trace/webpack` avec require lors de la création de votre bundle.

L'exemple suivant montre comment utiliser `dd-trace` avec Webpack :

```javascript
const path = require('path')
const webpack = require('webpack')
const DatadogWebpackPlugin = require('dd-trace/webpack')

const compiler = webpack({
  entry: 'main.js',
  target: 'node',
  externalsType: 'commonjs',
  output: {
    filename: 'out.js',
    path: __dirname,
    hashFunction: 'sha256',
  },
  externals: [
    // Node.js built-in not in Webpack's default list for target: 'node'
    'diagnostics_channel',

    // dead code paths introduced by knex
    'pg',
    'mysql2',
    'better-sqlite3',
    'sqlite3',
    'mysql',
    'oracledb',
    'pg-query-stream',
    'tedious',
    '@yaacovcr/transform',

    // optional native dd-trace modules
    '@datadog/native-appsec',
    '@datadog/native-iast-taint-tracking',
    '@datadog/native-metrics',
    '@datadog/pprof',
    '@datadog/libdatadog',
  ],
  plugins: [
    new DatadogWebpackPlugin(),
  ],
})
```

#### Création d’un bundle avec Next.js {#bundling-with-nextjs}

Si vous utilisez Next.js pour créer un bundle de votre application, ajoutez une déclaration
similaire à celle pour Webpack dans votre fichier de configuration `next.config.js` :

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... non-relevant parts omitted, substitute your own config ...

  // this custom webpack config is required for Datadog tracing to work
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
      '@datadog/wasm-js-rewriter',
    ];
    config.externals.push(...externals);
    return config;
  },
};

export default nextConfig;
```

#### Fonctionnalités Datadog non prises en charge {#unsupported-datadog-features}

Les fonctionnalités suivantes sont désactivées par défaut dans le traceur Node.js. Elles ne prennent pas en charge la création de bundles et ne peuvent pas être utilisées si votre application est regroupée dans un bundle.

- APM : Dynamic Instrumentation

#### Remarques générales sur la création de bundles {#general-bundling-remarks}

**Remarque** : en raison de l’utilisation de modules natifs dans le SDK, qui contiennent du code C++ compilé (et dont les fichiers portent généralement l’extension `.node`), vous devez ajouter des entrées à votre liste `external`. Actuellement, les modules natifs utilisés dans le traceur Node.js se trouvent dans des packages préfixés par `@datadog`. Cela nécessite également de fournir un répertoire `node_modules/` avec votre application regroupée dans un bundle. Vous n’avez pas besoin de fournir l’intégralité de votre répertoire `node_modules/`, car il contiendrait de nombreux packages superflus qui devraient déjà se trouver dans votre bundle.

Pour générer un répertoire `node_modules/` plus petit contenant uniquement les modules natifs requis (et leurs dépendances), vous pouvez d’abord déterminer les versions des packages dont vous avez besoin, puis créer un répertoire temporaire dans lequel les installer et enfin copier le répertoire `node_modules/` obtenu. Exemple :

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

**Remarque** : dans le cas de Next.js, le `path/to/bundle` est généralement le répertoire `.next/standalone` de votre application.

À cette phase du processus, vous devriez être en mesure de déployer votre bundle (qui correspond au code de votre application et à la plupart de vos dépendances) avec le répertoire `node_modules/`, qui contient les modules natifs et leurs dépendances.

## Configuration {#configuration}

Si nécessaire, configurez le SDK pour envoyer les données de télémétrie de performance de l'application selon vos besoins, y compris la mise en place du marquage de service unifié (Unified Service Tagging) : Consultez [Configuration de la bibliothèque][4] pour plus de détails.

Consultez [paramètres du traceur][3] pour obtenir une liste des options d'initialisation.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/compatibility_requirements/nodejs
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://datadog.github.io/dd-trace-js/#tracer-settings
[4]: /fr/tracing/trace_collection/library_config/nodejs/
[5]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[6]: /fr/tracing/trace_collection/compatibility/nodejs/#complex-framework-usage
[11]: /fr/tracing/trace_collection/library_injection_local/
[13]: /fr/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[14]: /fr/tracing/trace_collection/custom_instrumentation/server-side/?api_type=dd_api&prog_lang=node_js