---
aliases:
- /fr/real_user_monitoring/error_tracking/browser_errors
- /fr/error_tracking/standalone_frontend/browser
further_reading:
- link: https://learn.datadoghq.com/courses/tracking-errors-rum-javascript
  tag: Centre d'apprentissage
  text: Suivi des erreurs avec RUM pour les applications Web JavaScript
- link: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps
  tag: Code source
  text: Code source datadog-ci
- link: /real_user_monitoring/guide/upload-javascript-source-maps
  tag: Documentation
  text: Téléverser des maps source JavaScript
- link: /real_user_monitoring/guide/upload-webassembly-symbols
  tag: Documentation
  text: Téléverser des symboles WebAssembly
- link: /error_tracking/explorer
  tag: Documentation
  text: En savoir plus sur l'Error Tracking Explorer
title: Browser Error Tracking
---
## Présentation {#overview}

[Error Tracking][1] traite les erreurs collectées depuis le navigateur par le Browser SDK. Chaque fois qu'une erreur [source][2], [custom][3], [report][4] ou [console][4] contenant une trace de pile est collectée, Error Tracking la traite et la regroupe sous un problème, ou groupe d'erreurs similaires à retrouver dans l'[Error Tracking Explorer][16].

## Prérequis {#prerequisites}

Téléchargez la dernière version du [Browser SDK][5].

## Configuration {#setup}

Pour commencer à envoyer des données d'Error Tracking depuis votre application de navigateur vers Datadog, suivez les [instructions de configuration dans l'application][6] ou suivez les étapes ci-dessous.

### Étape 1 - Créer l'application {#step-1-create-the-application}

1. Dans Datadog, accédez à la page [{{< ui >}}Errors{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Browser and Mobile{{< /ui >}} > {{< ui >}}Add an Application{{< /ui >}}][6] et sélectionnez le type d'application JavaScript (JS).
2. Saisissez un nom pour votre application, puis cliquez sur {{< ui >}}Create Application{{< /ui >}}. Cela génère une `clientToken` et une `applicationId` pour votre application.

### Étape 2 - Choisir la méthode d'installation appropriée {#step-2-choose-the-right-installation-method}

Choisissez le type d'installation pour le Browser SDK.

{{< tabs >}}
{{% tab "npm" %}}

L'installation via npm (Node Package Manager) est recommandée pour les applications Web modernes. Le Browser SDK est packagé avec le reste de votre code JavaScript frontend. Il n'a aucun impact sur les performances de chargement des pages. Cependant, le SDK peut manquer des erreurs, des ressources et des actions utilisateur déclenchées avant l'initialisation du SDK. Datadog recommande d'utiliser une version correspondante avec le Browser Logs SDK.

Ajoutez [`@datadog/browser-rum`][1] à votre fichier `package.json`, puis initialisez-le avec :

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({

   applicationId: '<APP_ID>',
   clientToken: '<CLIENT_TOKEN>',
   service: '<SERVICE>',
   env: '<ENV_NAME>',
   // site: '<SITE>',
   // version: '1.0.0',
   trackUserInteractions: true,
   trackResources: true
});

```

Le paramètre `trackUserInteractions` permet la collecte automatique des clics utilisateur dans votre application. **Les données sensibles et privées** contenues dans vos pages peuvent être incluses pour identifier les éléments avec lesquels une interaction a eu lieu.

[1]: https://www.npmjs.com/package/@datadog/browser-rum

{{% /tab %}}
{{% tab "CDN async" %}}

L'installation via CDN asynchrone est recommandée pour les applications web ayant des objectifs de performance. Le Browser SDK se charge depuis le CDN de Datadog de manière asynchrone, garantissant que le téléchargement du Browser SDK n'impacte pas les performances de chargement de la page. Cependant, le SDK peut manquer des erreurs, des ressources et des actions utilisateur déclenchées avant l'initialisation du SDK.

Ajoutez l'extrait de code généré dans le tag head de toutes les pages HTML que vous souhaitez surveiller dans votre application. Pour le **{{<region-param key="dd_site_name">}}** [site][1] :

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v7/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APP_ID>',
      // site: '<SITE>',
      service: '<APP_ID>',
      env: '<ENV_NAME>',
      // version: '1.0.0'
    });
  })
</script>
```

Le paramètre `trackUserInteractions` permet la collecte automatique des clics utilisateur dans votre application. **Les données sensibles et privées** contenues dans vos pages peuvent être incluses pour identifier les éléments avec lesquels une interaction a eu lieu.

[1]: /fr/getting_started/site/

{{% /tab %}}
{{% tab "CDN sync" %}}

L'installation via CDN synchrone est recommandée pour collecter tous les événements. Le Browser SDK se charge depuis le CDN de Datadog de manière synchrone, garantissant que le Browser SDK se charge en premier et collecte toutes les erreurs, ressources et actions utilisateur. Cette méthode peut impacter les performances de chargement de la page.

Ajoutez l'extrait de code généré au tag head (avant tout autre tag script) de chaque page HTML que vous souhaitez surveiller dans votre application. Placer le tag script plus haut et la charger de manière synchrone garantit que Datadog RUM peut collecter toutes les données de performance et les erreurs. Pour le **{{<region-param key="dd_site_name">}}** [site][1] :

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us1/v7/datadog-rum.js"
    type="text/javascript"
    crossorigin>
</script>
<script>
    window.DD_RUM && window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APP_ID>',
      // site: '<SITE>',
      service: '<APP_ID>',
      env: '<ENV_NAME>',
      // version: '1.0.0'
    });
</script>
```

Le paramètre `trackUserInteractions` permet la collecte automatique des clics utilisateur dans votre application. **Les données sensibles et privées** contenues dans vos pages peuvent être incluses pour identifier les éléments avec lesquels une interaction a eu lieu.

[1]: /fr/getting_started/site/

{{% /tab %}}
{{< /tabs >}}

#### TypeScript (facultatif) {#typescript-optional}

Si vous initialisez le SDK dans un projet TypeScript, utilisez l'extrait de code ci-dessous. Les types sont compatibles avec TypeScript >= 3.8.2.

<div class="alert alert-info">Pour les versions antérieures de TypeScript, importez les sources JavaScript et utilisez des variables globales pour éviter tout problème de compilation.</div>

```javascript
import '@datadog/browser-rum/bundle/datadog-rum'

window.DD_RUM.init({
  applicationId: 'XXX',
  clientToken: 'XXX',
  site: 'datadoghq.com',
  trackUserInteractions: true,
  trackResources: true,
  ...
})
```

### Étape 3 - Configurer l'environnement et les paramètres {#step-3-configure-environment-and-settings}

1. Dans le champ Environnement, définissez l'environnement (`env`) pour que votre application utilise le [unified service tagging][18].
2. Dans le champ Service, définissez le service (`service`) pour que votre application utilise le [unified service tagging][18].
3. Définissez le niveau de confidentialité pour les saisies utilisateur. Consultez [Options de confidentialité du navigateur pour Session Replay][10] pour plus de détails.
4. Définissez un numéro de version (`version`) pour votre application déployée dans l'extrait d'initialisation. Pour plus d'informations, consultez [Tagging](#tagging-for-error-tracking).
5. Configurez des paramètres supplémentaires si nécessaire. Consultez la section [Référence de configuration](#configuration-reference) ci-dessous pour toutes les options disponibles.

### Étape 4 - Déployez votre application {#step-4-deploy-your-application}

Déployez les modifications sur votre application. Une fois votre déploiement en ligne, Datadog collecte les événements depuis les navigateurs de vos utilisateurs.

### Étape 5 - Téléchargez les maps source et les symboles WebAssembly (facultatif mais recommandé) {#step-5-upload-source-maps-and-webassembly-symbols-optional-but-recommended}

Téléchargez vos maps source JavaScript pour accéder aux stack traces non minifiées. Consultez le [guide de téléchargement des maps source][17].

Si votre application de navigateur utilise WebAssembly, [configurez le Browser SDK WASM plugin][20] et [téléchargez les symboles de débogage du module][21].

### Étape 6 - Visualisez vos données {#step-6-visualize-your-data}

Maintenant que vous avez terminé la configuration de base du Browser Error Tracking, votre application collecte les erreurs de navigateur et vous pouvez commencer à surveiller et à déboguer les problèmes en temps réel.

Visualisez les [données collectées][7] dans des [dashboards][8] ou créez une requête de recherche dans Error Tracking.

Tant que Datadog ne reçoit pas de données, votre application apparaît comme `pending` sur la page {{< ui >}}Applications{{< /ui >}}.

### Étape 7 - Liez les erreurs à votre code source (facultatif) {#step-7-link-errors-with-your-source-code-optional}

En plus d'envoyer des maps source, le [Datadog CLI][11] rapporte des informations Git telles que le hash du commit, l'URL du dépôt et une liste des chemins de fichiers suivis dans le dépôt de code.

Error Tracking peut utiliser ces informations pour corréler les erreurs avec votre [code source][15], vous permettant de passer de n'importe quelle trame de trace de pile à la ligne de code associée dans [GitHub][12], [GitLab][13] et [Bitbucket][14].

<div class="alert alert-info">La liaison des trames de stack trace au code source est prise en charge dans la version <a href="https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps#sourcemaps-command">Datadog CLI</a> <code>0.12.0</code> et ultérieure.</div>

Pour plus d'informations, consultez l'[intégration du code source Datadog][15].

## Tagging for Error Tracking {#tagging-for-error-tracking}

Ces tags (configurés à l'étape 3 ci-dessus) alimentent la fonctionnalité d'Error Tracking :

- Filtrage et facettage des problèmes par `service` et `env`
- Corrélation inter-produits avec RUM, Logs et APM pour le même `service`/`env`
- Correspondance des maps source téléchargées via les mêmes `service` et `version` que vous configurez lors du téléchargement

Un service est un dépôt de code indépendant et déployable qui correspond à un ensemble de pages :

- Si votre application de navigateur a été construite comme un monolithe, votre application Datadog possède un nom de service pour l'application.
- Si votre application de navigateur a été construite sous forme de dépôts séparés pour plusieurs pages, modifiez les noms de service par défaut tout au long du cycle de vie de votre application.

En savoir plus sur le [tagging][19] dans Datadog.

## Référence de configuration {#configuration-reference}

Consultez la [Browser SDK API Reference][9] pour obtenir la liste complète des options de configuration disponibles.

## Étapes suivantes {#next-steps}

Vous pouvez surveiller les exceptions non gérées, les rejets de promesses non gérés, les exceptions gérées, les rejets de promesses gérés et d'autres erreurs que le Browser SDK ne suit pas automatiquement. En savoir plus sur [Collecting Browser Errors][3].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/error_tracking/
[2]: /fr/real_user_monitoring/application_monitoring/browser/data_collected/?tab=error#source-errors
[3]: /fr/error_tracking/frontend/collecting_browser_errors/
[4]: /fr/error_tracking/frontend/collecting_browser_errors/?tab=npm#error-sources
[5]: https://www.npmjs.com/package/@datadog/browser-rum
[6]: https://app.datadoghq.com/error-tracking/settings/setup/client
[7]: /fr/real_user_monitoring/application_monitoring/browser/data_collected/
[8]: /fr/real_user_monitoring/platform/dashboards/errors/
[9]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html
[10]: /fr/session_replay/privacy_options?platform=browser#mask-action-names
[11]: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps#sourcemaps-command
[12]: https://github.com
[13]: https://about.gitlab.com
[14]: https://bitbucket.org/product
[15]: /fr/integrations/guide/source-code-integration/
[16]: /fr/error_tracking/explorer
[17]: /fr/real_user_monitoring/guide/upload-javascript-source-maps
[18]: /fr/getting_started/tagging/unified_service_tagging/
[19]: /fr/getting_started/tagging/
[20]: /fr/real_user_monitoring/application_monitoring/browser/collecting_browser_errors/#configure-webassembly-error-tracking
[21]: /fr/real_user_monitoring/guide/upload-webassembly-symbols/#upload-your-symbols