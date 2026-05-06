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
- link: https://github.com/DataDog/dd-trace-js
  tag: Code source
  text: Code source
- link: https://datadog.github.io/dd-trace-js
  tag: Documentation
  text: Documentation sur l'API
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: tracing/
  tag: Documentation
  text: Utilisation avancée
title: Tracer des applications Node.js
type: multi-code-lang
---
## Exigences de compatibilité {#compatibility-requirements}

Le dernier Tracer Node.js prend en charge les versions Node.js `>=18`. Pour une liste complète des versions et du support des frameworks Node.js de Datadog (y compris les versions héritées et de maintenance), consultez la page [Exigences de compatibilité][1].

## Mise en route {#getting-started}

Avant de commencer, vérifiez que vous avez bien [installé et configuré l'Agent][13]. Ensuite, complétez les étapes suivantes pour ajouter le SDK Datadog à votre application Node.js afin de l'instrumenter.

### Installez le SDK Datadog {#install-the-datadog-sdk}

Pour installer le SDK Datadog en utilisant npm pour Node.js 18+, exécutez :

  ```shell
  npm install dd-trace
  ```
Pour installer le SDK Datadog (version 4.x de `dd-trace`) pour la version Node.js 16 en fin de vie, exécutez :
  ```shell
  npm install dd-trace@latest-node16
  ```
Pour plus d'informations sur les tags de distribution de Datadog et le support des versions d'exécution Node.js, consultez la page [Exigences de compatibilité][1].
Si vous effectuez une mise à niveau d'une version majeure précédente de la bibliothèque (0.x, 1.x, 2.x, 3.x ou 4.x) vers une autre version majeure, lisez le [Guide de migration][5] pour évaluer les changements non rétrocompatibles.

<div class="alert alert-info">Dans les environnements Serverless ou lors de l'utilisation de l'instrumentation en une seule étape, la bibliothèque est déjà pré-installée, donc vous n'avez pas besoin de l'ajouter en tant que dépendance. Au lieu de cela, ajoutez-le en tant que dépendance de développement pour obtenir le traçage localement :
  <div class="highlight code-snippet js-appended-copy-btn">
    <pre tabindex="0" class="chroma">
      <code class="language-shell" data-lang="shell"><span class="line"><span class="cl">npm install dd-trace -D <span class="c1"># au lieu de `npm install dd-trace`</span></span></span></code>
    </pre>
    <div class="code-button-wrapper position-absolute">
      <button class="btn text-primary js-copy-button">Copier</button>
    </div>
  </div>
</div>

### Installer l'API publique Datadog (optionnel) {#install-the-datadog-public-api-optional}

Cette étape est uniquement requise lors de l'instrumentation personnalisée dans Serverless ou avec l'instrumentation en une seule étape. Pour d'autres cas d'utilisation d'instrumentation personnalisée, c'est optionnel. Pour des informations sur quand utiliser l'API publique Datadog, consultez [Instrumentation personnalisée utilisant l'API Datadog][14].

  ```shell
  npm install dd-trace-api
  ```

Vous pouvez alors importer `dd-trace-api` au lieu de `dd-trace` dans tout code effectuant une instrumentation personnalisée.

### Importez et initialisez le traceur {#import-and-initialize-the-tracer}

Importez et initialisez le traceur soit dans le code, soit avec des arguments de ligne de commande. Le SDK Node.js doit être importé et initialisé **avant** tout autre module.

<div class="alert alert-info">Avec des frameworks comme <strong>Next.js</strong> et <strong>Nest.js</strong>, vous devez soit fournir une variable d'environnement, soit ajouter un flag Node.js supplémentaire. Consultez <a href="/tracing/trace_collection/compatibility/nodejs/#complex-framework-usage">l'utilisation complexe des frameworks</a> pour plus d'informations.</div>

Après avoir terminé la configuration, si vous ne recevez pas de traces complètes, y compris des routes URL manquantes pour les requêtes web, ou des spans déconnectés ou manquants, **confirmez que le SDK a été importé et initialisé correctement**. L'initialisation du SDK en premier est nécessaire pour que le SDK puisse correctement patcher toutes les bibliothèques requises pour l'instrumentation automatique.

Lorsque vous utilisez un transpileur tel que TypeScript, Webpack, Babel ou d'autres, importez et initialisez le SDK dans un fichier externe, puis importez ce fichier dans son intégralité lors de la construction de votre application.

#### Ajoutez le SDK avec des arguments de ligne de commande {#add-the-sdk-with-command-line-arguments}.

Utilisez l'option `--require` de Node.js pour charger et initialiser le SDK en une seule étape.

```sh
node --require dd-trace/init app.js
```

L'approche ci-dessus nécessite l'utilisation de variables d'environnement pour toute la configuration du SDK. Si vous devez utiliser une configuration programmatique, initialisez `dd-trace` dans un fichier dédié et requirez-le à la place :

```sh
node --require ./dd-trace.js app.js
```

Le fichier doit contenir ceci :

```js
// ./dd-trace.js
require('dd-trace').init({
  // programmatic config
})
```

Pour les cas où il n'est pas possible de contrôler les arguments CLI, vous pouvez utiliser une variable d'environnement à la place :

<div class="alert alert-info"><code>DD_TRACE_ENABLED</code> est <code>true</code> par défaut, ce qui signifie qu'une certaine instrumentation se produit au moment de l'importation, avant l'initialisation. Pour désactiver complètement l'instrumentation, vous pouvez faire l'une des choses suivantes :
  <ul>
    <li>Importez le module de manière conditionnelle</li>.
    <li>Définissez <code>DD_TRACE_ENABLED=false</code> (si, par exemple, les imports ESM statiques ou de niveau supérieur empêchent le chargement conditionnel)</li>.
  <ul>
</div>

#### Applications ESM uniquement : Importez le chargeur {#esm-applications-only-import-the-loader}.

Les applications ECMAScript Modules (ESM) nécessitent un argument de ligne de commande _supplémentaire_. Ajoutez cet argument, peu importe comment le SDK est autrement importé et initialisé :

- **Node.js < v20.6 :** `--loader dd-trace/loader-hook.mjs`
- **Node.js >= v20.6 :** `--import dd-trace/register.js`

Par exemple, dans Node.js 22, si vous initialisez le SDK en utilisant l'option un ci-dessus, vous le démarrerez comme ceci :

```sh
node --import dd-trace/register.js app.js
```

Cela peut également être combiné avec l'argument de ligne de commande `--require dd-trace/init` :

```sh
node --import dd-trace/register.js --require dd-trace/init app.js
```

Un raccourci existe pour combiner les deux arguments sous Node.js v20.6 et versions ultérieures :

```sh
node --import dd-trace/initialize.mjs app.js
```

### Bundling {#bundling}

`dd-trace` fonctionne en interceptant les appels `require()` qu'une application Node.js effectue lors du chargement des modules. Cela inclut les modules intégrés à Node.js, comme le module `fs` pour accéder au système de fichiers, ainsi que les modules installés depuis le registre NPM, comme le module de base de données `pg`.

Les bundlers explorent tous les appels `require()` qu'une application effectue vers des fichiers sur le disque. Il remplace les appels `require()` par du code personnalisé et combine tout le JavaScript résultant en un seul fichier bundle. Lorsqu'un module intégré est chargé, tel que `require('fs')`, cet appel peut alors rester le même dans le bundle résultant.

Les outils APM comme `dd-trace` cessent de fonctionner à ce stade. Ils peuvent continuer à intercepter les appels pour les modules intégrés mais n'interceptent pas les appels aux bibliothèques tierces. Cela signifie que lorsque vous bundlez une application `dd-trace` avec un bundler, il est probable qu'elle capture des informations sur l'accès au disque (via `fs`) et sur les requêtes HTTP sortantes (via `http`), tout en omettant les appels aux bibliothèques tierces. Exemple :
- Extraction des informations de route des requêtes entrantes pour le framework `express`.
- Affichage de la requête exécutée pour le client de base de données `mysql`.

Une solution courante consiste à traiter tous les modules tiers que l'APM doit instrumenter comme étant "externes" au bundler. Avec ce paramètre, les modules instrumentés restent sur le disque et continuent d'être chargés avec `require()`, tandis que les modules non instrumentés sont intégrés dans le bundle. Cependant, cela aboutit à une build contenant de nombreux fichiers superflus et compromet l'objectif du bundling.

Datadog recommande d'utiliser des plugins de bundler personnalisés. Ces plugins peuvent indiquer au bundler comment se comporter, injecter du code intermédiaire et intercepter les appels `require()` « translated ». En conséquence, davantage de paquets sont inclus dans le fichier JavaScript bundle.

**Remarque** : Certaines applications peuvent avoir 100 % des modules bundled, cependant, les modules natifs doivent rester externes au bundle.

#### Bundling avec esbuild {#bundling-with-esbuild}

Cette bibliothèque fournit un support expérimental pour esbuild sous la forme d'un plugin esbuild, et nécessite au moins Node.js v16.17 ou v18.7. Pour utiliser le plugin, assurez-vous d'avoir `dd-trace@3+` installé, puis requérez le module `dd-trace/esbuild` lors de la construction de votre bundle.

Voici un exemple de la façon dont on pourrait utiliser `dd-trace` avec esbuild :

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
    '@datadog/native-iast-rewriter',
  ]
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
```

#### Bundling avec Next.js {#bundling-with-nextjs}

Si vous utilisez Next.js ou un autre framework reposant sur webpack pour bundler votre application, ajoutez une déclaration
similaire à celle pour webpack dans votre fichier de configuration `next.config.js` :

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
      '@datadog/native-iast-rewriter',
    ];
    config.externals.push(...externals);
    return config;
  },
};

export default nextConfig;
```

#### Fonctionnalités non prises en charge par Datadog {#unsupported-datadog-features}

Les fonctionnalités suivantes sont désactivées par défaut dans le traceur Node.js. Elles ne supportent pas le bundling et ne peuvent pas être utilisées si votre application est bundled.

- APM : Dynamic Instrumentation (instrumentation dynamique)

#### Remarques générales sur le bundling {#general-bundling-remarks}

**Remarque** : En raison de l'utilisation de modules natifs dans le SDK, qui sont du code C++ compilé, (se terminant généralement par une extension de fichier `.node`), vous devez ajouter des entrées à votre liste `external`. Actuellement, les modules natifs utilisés dans le traceur Node.js se trouvent dans des paquets préfixés par `@datadog`. Cela nécessitera également que vous expédiez un répertoire `node_modules/` aux côtés de votre application bundled. Vous n'avez pas besoin d'expédier l'intégralité de votre répertoire `node_modules/` car il contiendrait de nombreux paquets superflus qui devraient être contenus dans votre bundle.

Pour générer un répertoire `node_modules/` plus petit avec uniquement les modules natifs requis, (et leurs dépendances), vous pouvez d'abord déterminer les versions des paquets dont vous avez besoin, puis créer un répertoire temporaire pour les installer, et copier le répertoire `node_modules/` résultant à partir de celui-ci. Exemple :

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

**Remarque** : Dans le cas de Next.js, le `path/to/bundle` est généralement le répertoire `.next/standalone` de votre application.

À ce stade, vous devriez être en mesure de déployer votre bundle, (qui est votre code d'application et la plupart de vos dépendances), avec le répertoire `node_modules/`, qui contient les modules natifs et leurs dépendances.

## Configuration {#configuration}

Si nécessaire, configurez le SDK pour envoyer les données de télémétrie de performance de l'application comme vous le souhaitez, y compris la configuration du Unified Service Tagging. Lisez [Configuration de la Bibliothèque][4] pour plus de détails.

Consultez les [paramètres du traceur][3] pour obtenir la liste des options d'initialisation.

## Lectures Complémentaires {#further-reading}

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