---
description: Guide de mise à niveau pour la migration entre les versions majeures
  du RUM Browser SDK, comportant des ruptures, de nouvelles fonctionnalités et des
  mises à jour de compatibilité.
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualiser vos données RUM dans l'Explorer
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: Blog
  text: Utiliser Datadog Session Replay pour visualiser en temps réel les parcours
    utilisateur
title: Mettre à jour le SDK RUM Browser
---
## Présentation {#overview}

Suivez ce guide pour migrer entre les versions majeures des SDK Browser RUM et Browser Logs. Consultez [la documentation du SDK][26] pour plus de détails sur ses fonctionnalités et capacités.

## De la v6 à la v7 {#from-v6-to-v7}

Le SDK v7 améliore les paramètres de confidentialité par défaut, supprime les options obsolètes et modernise les composants internes du SDK. La plupart des changements nécessitent des mises à jour de configuration.

Prenez connaissance des ruptures ci-dessous lors de la mise à niveau de votre SDK. Les changements sont regroupés par domaine d'impact.

<div class="alert alert-tip"> Si vous utilisez un assistant de codage IA qui prend en charge les compétences d'agent, vous pouvez appliquer la <a href="https://github.com/datadog-labs/agent-skills/blob/main/dd-browser-sdk/upgrade-v7/SKILL.md"><code>upgrade-browser-sdk-v7</code> compétence</a> pour automatiser la plupart des étapes de migration ci-dessous. </div>

### Core {#core}

#### Réécriture du gestionnaire de session {#session-manager-rewrite}

Le système qui suit les sessions a été réécrit pour améliorer la fiabilité des données et réduire les écarts de facturation. Selon votre configuration, vous pourriez remarquer des changements dans le nombre de sessions.

#### Décisions d'échantillonnage déterministes {#deterministic-sampling-decisions}

Auparavant, la décision d'échantillonnage était prise une fois lors de la création de la session et persistait. Dans la v7, elle est calculée à la demande à partir de l'ID de session et du taux d'échantillonnage, ce qui la rend cohérente quelle que soit la page qui initialise le SDK. Si vous utilisez différents taux d'échantillonnage sur les pages, ces taux sont appliqués de manière cohérente.

<div class="alert alert-warning">La mise à niveau vers la v7 introduit un échantillonnage déterministe pour les traces distribuées basé sur l'ID de session RUM. En conséquence, sous RUM without Limits&trade;, la probabilité d'indexer des sessions ayant échantillonné des traces associées est considérablement augmentée. Davantage de traces sont conservées par vos filtres de rétention inter-produits existants, même sans aucun changement de configuration.<br><br>Si vous avez des filtres de rétention inter-produits (par exemple, des traces APM liées à RUM), vous pourriez constater une <strong>augmentation du volume de spans indexés</strong>, ce qui pourrait entraîner des <strong>coûts plus élevés</strong>. Examinez votre configuration de filtre de rétention et le volume de spans estimé après la mise à niveau.</div>

#### Clé de stockage de session renommée {#session-store-key-renamed}

La clé de stockage de session est passée de `_dd_s` à `_dd_s_v2` car le nouveau gestionnaire de session utilise un format de stockage incompatible. Lors de la mise à niveau, les sessions existantes sont automatiquement migrées depuis `_dd_s`.

**Remarque** : Si vous revenez à la v6 après la mise à niveau, le SDK v6 démarre une nouvelle session car il ne lit pas la clé `_dd_s_v2`. Si vous avez des politiques CSP ou de cookies qui autorisent des noms de cookies spécifiques, ajoutez `_dd_s_v2`.

#### Mettez à jour l'URL du bundle CDN {#update-the-cdn-bundle-url}

Si vous chargez le SDK depuis le CDN Datadog, mettez à jour le segment de version de l'URL du bundle de `v6` à `v7`. Ceci s'applique à tous les bundles :

| Bundle   | URL                                                                     |
| -------- | ----------------------------------------------------------------------- |
| RUM      | `https://www.datadoghq-browser-agent.com/<SITE>/v7/datadog-rum.js`      |
| RUM Slim | `https://www.datadoghq-browser-agent.com/<SITE>/v7/datadog-rum-slim.js` |
| Logs     | `https://www.datadoghq-browser-agent.com/<SITE>/v7/datadog-logs.js`     |

Remplacez `<SITE>` par votre site Datadog (par exemple, `us1`, `us3`, `us5`, `eu1`, `ap1`, `ap2` ou `uk1`). Consultez la [documentation de configuration][26] pour obtenir l'URL de votre site.

#### Les bundles CDN utilisent des importations dynamiques ESM {#cdn-bundles-use-esm-dynamic-imports}

Les bundles CDN utilisent des importations dynamiques ESM au lieu de CommonJS, ce qui réduit la surcharge webpack et la taille globale du bundle. Si vous utilisez l'extrait CDN, ajoutez l'attribut `crossorigin` au tag script :

```html
<script src="https://www.datadoghq-browser-agent.com/..." crossorigin="anonymous"></script>
```

Consultez la [documentation de configuration][26] pour des exemples complets d'extraits.

#### Base de référence du navigateur ES2020 {#es2020-browser-baseline}

La prise en charge des navigateurs antérieurs à ES2020 a été abandonnée afin de supprimer les correctifs de compatibilité et les polyfills, ce qui réduit la taille du bundle. Les versions minimales prises en charge sont Chrome 80+, Firefox 78+ et Safari 14+. Impact estimé : ~0,048 % de couverture en moins.

Pour continuer à prendre en charge les navigateurs plus anciens, continuez à utiliser le SDK Browser v6 ou une version antérieure.

#### Options supprimées {#removed-options}

| Option obsolète (v6 ou antérieure) | Remplacement (v7) |
| --------------------------------- | ------------------------------------------------------ |
| `betaEncodeCookieOptions`         | L'encodage des cookies est toujours activé.                     |
| `allowFallbackToLocalStorage`     | Utilisez `sessionPersistence: ['cookie', 'local-storage']`. |

### RUM {#rum}

#### `propagateTraceBaggage` activé par défaut {#propagatetracebaggage-enabled-by-default}

Le `propagateTraceBaggage` [paramètre d'initialisation][28] est défini par défaut sur `true` dans la v7. La propagation du bagage permet l'échantillonnage basé sur la fin de trace (tail) et donne aux traces accès au contexte de l'utilisateur et du compte.

Si vous utilisez le traçage distribué sur des requêtes inter-origines, définissez `propagateTraceBaggage: false` ou ajoutez `baggage` à vos en-têtes de réponse `Access-Control-Allow-Headers` :

```
Access-Control-Allow-Headers: traceparent, tracestate, baggage
```

#### Nouvelle valeur par défaut pour `defaultPrivacyLevel` {#new-default-for-defaultprivacylevel}

`defaultPrivacyLevel` est défini par défaut sur `mask-user-input` dans la v7 (auparavant `mask`). Cela fournit une valeur par défaut de confidentialité qui masque les entrées utilisateur sans les restrictions du masquage complet. La nouvelle valeur par défaut masque les entrées utilisateur pendant que les autres contenus sont collectés.

Pour conserver le masquage complet, définissez explicitement `defaultPrivacyLevel: "mask"`.

#### `enablePrivacyForActionName` activé par défaut {#enableprivacyforactionname-enabled-by-default}

`enablePrivacyForActionName` est défini par défaut sur `true` dans la v7. Les noms d'action de clic suivent le paramètre `defaultPrivacyLevel` par défaut. Définissez `enablePrivacyForActionName: false` pour refuser.

#### `startDurationVital` et `stopDurationVital` changement d'API {#startdurationvital-and-stopdurationvital-api-change}

L'objet `DurationVitalReference` a été remplacé par une option de chaîne `vitalKey`. Cela aligne l'API avec `startResource`/`stopResource` et `startAction`/`stopAction`, ainsi qu'avec le SDK Mobile. Plusieurs signes vitaux simultanés portant le même nom sont toujours pris en charge :

```js
// Before
const ref = datadogRum.startDurationVital('myVital')
datadogRum.stopDurationVital(ref)

// After
datadogRum.startDurationVital('myVital', { vitalKey: 'uniqueKey' })
datadogRum.stopDurationVital('myVital', { vitalKey: 'uniqueKey' })
```

#### Nouveau `session_renewal` type de chargement de vue {#new-session-renewal-view-loading-type}

Lorsqu'une session expire et est renouvelée, la nouvelle vue est créée avec `@view.loading_type:session_renewal` au lieu de `route_change`. Mettez à jour tous les dashboards ou monitors qui filtrent sur `@view.loading_type` s'ils doivent également inclure les vues de session renouvelée.

#### La ressource de document utilise `PerformanceNavigationTiming` {#document-resource-uses-performancenavigationtiming}

L'événement initial de ressource de document utilisait précédemment une entrée de minutage synthétique. Il utilise directement le `PerformanceNavigationTiming` natif du navigateur dans la v7, ce qui peut produire des valeurs `resource.duration` légèrement différentes pour la ressource de document. Le `initiatorType` pour la ressource de document passe de `initial_document` à `navigation`.

Si vous utilisez des plugins ou des gestionnaires de contexte de domaine qui inspectent `performanceEntry` pour les ressources de document, mettez-les à jour pour qu'ils attendent un `PerformanceNavigationTiming` au lieu de `PerformanceResourceTiming`.

#### Délai de première entrée (FID) supprimé {#first-input-delay-fid-removed}

Google a remplacé FID par Interaction to Next Paint (INP) en tant que Core Web Vital. Le FID a été supprimé du SDK pour réduire la taille du bundle. Utilisez INP à la place.

#### API de plugin : `strategy` supprimé {#plugin-api-strategy-removed}

Le champ `strategy` a été supprimé de l'API de plugin. Si vous utilisez `rum-react` ou d'autres intégrations, mettez-les à jour vers la v7 en même temps que le SDK principal.

#### Calcul du nom de l'action amélioré {#improved-action-name-computation}

Dans la v7, le SDK utilise une nouvelle stratégie pour calculer les noms d'action qui prend en compte la structure DOM pour appliquer les niveaux de confidentialité des éléments plus précisément et améliorer la gestion du contenu du shadow DOM. Les noms d'action peuvent changer légèrement. L'option `betaTrackActionsInShadowDom` a été supprimée.

#### Les navigations BFCache toujours suivies {#bfcache-navigations-always-tracked}

Les restaurations du cache avant/arrière sont suivies en tant que vues distinctes avec `@view.loading_type:bf_cache`, incluant un temps de chargement précis et les Core Web Vitals. L'option `trackBfCacheViews` a été supprimée.

#### Les requêtes précoces toujours collectées {#early-requests-always-collected}

Les ressources et les requêtes qui se sont produites avant l'initialisation du SDK sont automatiquement capturées. Certaines de ces ressources précoces peuvent manquer de propriétés telles que le code d'état. L'option `trackEarlyRequests` a été supprimée.

#### Noms de fichiers de morceaux asynchrones préfixés par `datadog` {#async-chunk-file-names-prefixed-with-datadog}

Les noms de fichiers de morceaux asynchrones incluent un préfixe `datadog` (par exemple, `datadog-rum-recorder.js`). Si vous avez des règles de CSP ou de mise en cache correspondant aux anciens noms, mettez-les à jour en conséquence.

### Logs {#logs}

#### Les logs nécessitent un gestionnaire de session {#logs-require-a-session-manager}

Les logs utilisent toujours un gestionnaire de session, de sorte que les événements de logs sont systématiquement associés à un ID de session. Lorsque ni les cookies ni le stockage local ne sont disponibles, le SDK n'envoie pas de données et enregistre un avertissement. Auparavant, les logs démarraient toujours sans stockage.

Pour activer explicitement les sessions basées sur la mémoire, utilisez `sessionPersistence: 'memory'`. Dans les environnements de travail, ce repli est automatique.

#### `forwardErrorsToLogs` et `forwardConsoleLogs` sont indépendants {#forwarderrorstologs-and-forwardconsolelogs-are-independent}

Auparavant, l'activation de `forwardErrorsToLogs` transférait également silencieusement les appels `console.error`. Dans la v7, ces options sont totalement indépendantes. Vous avez un contrôle précis sur ce qui est transféré. `forwardErrorsToLogs` contrôle uniquement les erreurs non gérées.

Pour conserver le comportement précédent, ajoutez `error` à votre tableau `forwardConsoleLogs` :

```js
DD_LOGS.init({
  forwardConsoleLogs: ['error', 'warn'],
})
```

#### Les erreurs réseau pour les requêtes annulées sont ignorées {#network-errors-for-canceled-requests-are-dropped}

Les requêtes annulées par l'application (fetch ou XHR abandonné) ne génèrent plus de logs d'erreurs réseau. Cela réduit le bruit dans le suivi des erreurs.

#### Options supprimées {#removed-options-1}

| Option obsolète (v6 ou antérieure) | Remplacement (v7)                                                           |
| --------------------------------- | -------------------------------------------------------------------------- |
| `usePciIntake`                    | L'ingestion standard est conforme à la norme PCI. Mettez à jour votre [CSP][18] si nécessaire. |

### Session Replay {#session-replay}

#### Nouveau format de données {#new-data-format}

Dans la v7, la relecture de session utilise un nouveau format de données plus compact qui réduit considérablement l'utilisation de la bande passante. Les données de relecture de session ne sont pas exposées directement via les API du SDK du navigateur, aucune action n'est donc requise pour adopter ce changement.

## De la v5 à la v6 {#from-v5-to-v6}

La principale amélioration offerte par la v6 est la réduction de la taille du bundle. En abandonnant la prise en charge d'IE11 et en tirant parti du chargement différé, la taille du bundle RUM a été réduite de 10 % et celle du bundle Logs de près de 9 %.
De plus, nous avons modifié quelques paramètres d'initialisation par défaut et préparé les améliorations futures.

Prenez connaissance des ruptures ci-dessous lors de la mise à niveau de votre SDK.

### Modifications majeures {#breaking-changes}

#### Prise en charge des navigateurs {#browser-support}

La prise en charge d'IE11 et d'autres navigateurs plus anciens a été interrompue. Les navigateurs doivent désormais prendre en charge au moins ES2018.
Pour utiliser Datadog sur des navigateurs plus anciens, vous pouvez continuer à utiliser Browser SDK v5 ou une version antérieure.

#### Ajouter l'en-tête tracestate lors de l'utilisation du propagateur tracecontext {#add-tracestate-header-when-using-tracecontext-propagator}

Le propagateur `tracecontext` par défaut envoie désormais un nouvel en-tête `tracestate` avec des métadonnées supplémentaires qui permettent une meilleure attribution de vos traces. Si vous utilisez ce propagateur, vous devez autoriser ce nouvel en-tête pour tous les endpoints suivis, en plus de l'en-tête `traceparent` existant :

```
Access-Control-Allow-Headers: traceparent, tracestate
```

#### Typage fort de l'option `site` {#strongly-type-site-option}

L'option `site` dispose désormais d'une définition de type plus stricte. Si vous utilisez TypeScript, vous pourriez rencontrer une erreur si vous utilisez une valeur non standard. Nous recommandons d'utiliser [proxy][27] pour envoyer des données RUM vers une URL non standard.

#### Le suivi des actions, des ressources et des tâches longues est désormais activé par défaut {#tracking-actions-resources-and-longtask-are-now-enabled-by-default}

Les interactions utilisateur, les ressources et les tâches longues sont désormais suivies par défaut. Ce changement n'a pas d'impact sur la facturation. Pour désactiver cette option, définissez `trackUserInteractions`, `trackResources` et `trackLongTasks` [paramètres d'initialisation][28] sur `false`.

#### Collecter les longs cadres d'animation en tant que tâches longues {#collect-long-animation-frames-as-long-tasks}

Sur les navigateurs pris en charge, les [Long Animation Frames][35] sont désormais collectées à la place des tâches longues. Le type d'événement dans le RUM Explorer reste `long_task`, mais ils contiendront des informations sur le long cadre d'animation.

#### Date d'expiration des cookies augmentée {#increased-cookies-expiration-date}

Pour prendre en charge le suivi des utilisateurs anonymes, l'expiration du cookie de session (`_dd_s`) est étendue à 1 an. Pour vous désinscrire, définissez `trackAnonymousUser` [paramètres d'initialisation][28] sur `false`.

#### Suppression du paramètre d'initialisation useCrossSiteSessionCookie {#removed-usecrosssitesessioncookie-initialization-parameter}

`useCrossSiteSessionCookie` a été déprécié et n'est désormais plus pris en charge. Utilisez plutôt `usePartitionedCrossSiteSessionCookie` [paramètres d'initialisation][28].

#### Chargement différé de Session Replay {#lazy-load-session-replay}

Le module Session Replay est désormais chargé de manière différée à l'aide d'[importations dynamiques][30]. Cela charge le module uniquement pour les sessions échantillonnées pour Session Replay, réduisant ainsi la taille du bundle pour les autres.

**Si vous utilisez le SDK via NPM**, assurez-vous que votre bundler prend en charge les importations dynamiques. La plupart des bundlers modernes prennent en charge cette fonctionnalité nativement, mais certains peuvent nécessiter des modifications de configuration. Consultez la documentation de votre bundler pour obtenir des conseils : [Webpack][31], [Esbuild][32], [Rollup][33], [Parcel][34].

**Si vous utilisez le SDK via un CDN**, il n'y a aucun changement cassant. Notez toutefois qu'en plus du chargement du script principal (par exemple, 
`datadog-rum.js`), le SDK chargera dynamiquement un morceau supplémentaire si nécessaire (par exemple, 
`recorder-d7628536637b074ddc3b-datadog-rum.js`).

#### Ne pas injecter de contexte de trace pour les traces non échantillonnées {#do-not-inject-trace-context-for-non-sampled-traces}

La valeur par défaut du paramètre d'initialisation `traceContextInjection` a été mise à jour à `sampled` pour garantir que les décisions d'échantillonnage des services backend sont appliquées lorsque les traces ne sont pas échantillonnées dans le SDK Navigateur. Consultez la [documentation Associer votre RUM à vos traces][29] pour plus d'informations.

**Remarque** : Si vous utilisez un `traceSampleRate` de 100 % (par défaut), ce changement n'a aucun impact pour vous.



### Futurs changements cassants {#future-breaking-changes}

#### Activation de la compression pour les requêtes d'ingestion Datadog {#enabling-compression-for-datadog-intake-requests}

La compression pour les requêtes d'ingestion Datadog sera activée par défaut dans une future version majeure.
Datadog vous recommande d'activer la compression dès maintenant en utilisant le `compressIntakeRequests` [paramètre d'initialisation][28].
Comme la compression est effectuée dans un thread Worker, la configuration de Content Security Policy (CSP) est nécessaire. Consultez les [directives CSP][18] pour plus d'informations.

## De la v4 à la v5 {#from-v4-to-v5}

La version 5 introduit les changements suivants et bien d'autres encore :

- Nouvelles configurations et paramètres de confidentialité par défaut pour Session Replay
- Collecte automatique des signaux de frustration
- Métriques de performance mises à jour
- Paramètres SDK et API mis à jour

Prenez connaissance des ruptures ci-dessous lors de la mise à niveau de votre SDK. Les changements sont regroupés par domaine d'impact.

### Général {#general}

#### Paramètres d'initialisation du SDK {#sdk-initialization-parameters}

**Action à effectuer** : Remplacez les paramètres obsolètes par les nouveaux paramètres équivalents dans la v5. Les anciens noms de paramètres ne sont plus disponibles dans la v5.

| Nom de paramètre obsolète (v4 ou antérieure) | Nouveau nom de paramètre (v5) |
|-------------------------------------------|-------------------------|
| proxyUrl | proxy |
| sampleRate | sessionSampleRate |
| allowedTracingOrigins | allowedTracingUrls |
| tracingSampleRate | traceSampleRate |
| trackInteractions | trackUserInteractions |
| premiumSampleRate | sessionReplaySampleRate |
| replaySampleRate | sessionReplaySampleRate |

#### API publiques {#public-apis}

**Action à entreprendre** : Remplacez les API obsolètes par les nouvelles API équivalentes. Les anciennes API ne sont plus disponibles dans la v5.

| Nom de paramètre obsolète (v4 ou antérieure) | Nouveau nom de paramètre (v5) |
|-------------------------------------------|-------------------------|
| DD_RUM.removeUser | [DD_RUM.clearUser][7] |
| DD_RUM.addRumGlobalContext | [DD_RUM.setGlobalContextProperty][8] |
| DD_RUM.removeRumGlobalContext | [DD_RUM.removeGlobalContextProperty][9] |
| DD_RUM.getRumGlobalContext | [DD_RUM.getGlobalContext][10] |
| DD_RUM.setRumGlobalContext | [DD_RUM.setGlobalContext][11] |
| DD_LOGS.addLoggerGlobalContext | [DD_LOGS.setGlobalContextProperty][8] |
| DD_LOGS.removeLoggerGlobalContext | [DD_LOGS.removeGlobalContextProperty][9] |
| DD_LOGS.getLoggerGlobalContext | [DD_LOGS.getGlobalContext][12] |
| DD_LOGS.setLoggerGlobalContext | [DD_LOGS.setGlobalContext][13] |
| logger.addContext | [logger.setContextProperty][14] |
| logger.removeContext | [logger.removeContextProperty][15] |

#### Domaines d'ingestion {#intake-domains}
La version 5 envoie des données à des domaines d'admission différents de ceux des versions précédentes.

**Action à entreprendre** : Mettez à jour toute entrée [Content Security Policy (CSP)][18] `connect-src` pour utiliser le nouveau domaine.

| Site Datadog | Domaine |
|--------------|--------|
| US1 | `connect-src https://browser-intake-datadoghq.com` |
| US3 | `connect-src https://browser-intake-us3-datadoghq.com` |
| US5 | `connect-src https://browser-intake-us5-datadoghq.com` |
| EU1 | `connect-src https://browser-intake-datadoghq.eu` |
| US1-FED | `connect-src https://browser-intake-ddog-gov.com` |
| US2-FED | `connect-src https://browser-intake-us2-ddog-gov.com` |
| AP1 | `connect-src https://browser-intake-ap1-datadoghq.com` |
| UK1 | `connect-src https://browser-intake-uk1-datadoghq.com` |

#### Événements approuvés {#trusted-events}
Pour éviter de collecter des données incorrectes ou illégitimes, v5 écoute uniquement les événements générés par les actions de l'utilisateur, en ignorant les événements créés par des scripts. Voir [événements approuvés][19] pour plus de détails.

**Action à entreprendre** : Si vous vous appuyez sur des événements programmatiques et souhaitez qu'ils soient pris en compte par le SDK, ajoutez-leur l'attribut `__ddIsTrusted`, comme ci-dessous :

```javascript
const click = new Event('click')
click.__ddIsTrusted = true
document.dispatchEvent(click)
```

**Action à entreprendre** : Si vous vous appuyez fortement sur des événements programmatiques, par exemple dans un environnement de test d'interface utilisateur automatisé, vous pouvez autoriser tous les événements non approuvés en définissant `allowUntrustedEvents: true`.

#### `beforeSend` type de retour {#beforesend-return-type}
`beforeSend` les fonctions de rappel doivent renvoyer une valeur booléenne :

```javascript
beforeSend(event: any, context?: any) => boolean
```

L'implémentation n'a pas changé. Si aucune valeur n'est renvoyée, l'événement n'est pas ignoré.

**Action à entreprendre** : Assurez-vous que `beforeSend` renvoie `true` pour conserver l'événement et `false` pour l'ignorer. Ceci résout les erreurs de compilation TypeScript associées.

### Session Replay {#session-replay-1}

#### Masquage de Session Replay {#session-replay-masking}

Le paramètre de masquage par défaut de Session Replay `defaultPrivacyLevel` a été modifié de `mask-user-input` à `mask`. Ceci masque par défaut toutes les données dans les enregistrements Session Replay, rendant les enregistrements moins sensibles à la consultation. Pour plus d'informations, consultez [Options de confidentialité du navigateur Session Replay][20].

**Action à entreprendre** : Si vous souhaitez voir plus de données non masquées dans Session Replay, comme du contenu HTML non sensible ou du texte saisi par l'utilisateur, réglez `defaultPrivacyLevel` sur `mask-user-input` ou `allow`.

#### Enregistrement automatique des sessions échantillonnées pour Session Replay {#automatic-recording-of-sessions-sampled-for-session-replay}
Les sessions échantillonnées pour Session Replay à l'aide de [`sessionReplaySampleRate`][21] sont automatiquement enregistrées au début de la session. Cela signifie que vous n'avez pas à appeler la méthode [`startSessionReplayRecording()`][22] pour capturer un enregistrement. En d'autres termes, vous ne manquerez accidentellement aucun enregistrement.

**Action à entreprendre** : Si vous souhaitez continuer à utiliser l'ancien comportement d'enregistrement et personnaliser le moment où votre enregistrement démarre, réglez `startSessionReplayRecordingManually` sur `true`.

#### Ne payez pour Session Replay que lorsque la session capture un enregistrement {#only-pay-for-session-replay-when-the-session-captures-a-recording}
Dans les versions précédentes du SDK, les sessions sont déterminées comme étant des sessions Session Replay via le mécanisme d'échantillonnage. Dans la v5, les sessions ne sont comptabilisées comme sessions Session Replay que si un enregistrement est capturé pendant la session. Cela facilite le suivi de votre utilisation de Session Replay.

**Aucune action requise** : Ce comportement prend automatiquement effet dans la v5.

#### Taux d'échantillonnage par défaut de Session Replay {#default-session-replay-sampling-rate}
Dans la v5, la valeur par défaut de `sessionReplaySampleRate` est 0 au lieu de 100. Si vous n'incluez pas de taux d'échantillonnage, aucun replay n'est enregistré.

**Action à entreprendre** : Pour utiliser Session Replay, définissez explicitement un taux d'échantillonnage avec `sessionReplaySampleRate: 100` (ou un autre taux d'échantillonnage).

### RUM {#rum-1}

### Intégration APM {#apm-integration}

Afin de promouvoir le support et l'utilisation d'OpenTelemetry, les types de propagateurs par défaut ont été modifiés pour inclure `tracecontext` en plus de `datadog`.

**Action à entreprendre** : Si vous ne spécifiez pas déjà le propagateur souhaité sur le paramètre d'initialisation `allowedTracingUrls`, configurez votre en-tête Access-Control-Allow-Headers du serveur pour accepter également l'en-tête `traceparent`. Pour plus d'informations, consultez [Associer votre RUM à vos traces][25].

### Champ de plan de session {#session-plan-field}

En ce qui concerne les modifications de Session Replay, le champ `session.plan` n'est disponible que pour les événements de session.

**Action à entreprendre** : Mettez à jour toutes les requêtes de monitor ou de dashboard que vous avez enregistrées pour exclure le champ `session.plan` pour les événements non liés à une session.

#### Les signaux de frustration sont collectés automatiquement {#frustration-signals-are-collected-automatically}
Il vous suffit de définir `trackUserInteractions: true` pour collecter toutes les interactions des utilisateurs, y compris les signaux de frustration. Vous n'avez plus besoin de définir le paramètre `trackFrustrations` séparément.

**Action à entreprendre** : Pour suivre les signaux de frustration, définissez `trackUserInteractions: true`. Le paramètre `trackFrustrations` peut être supprimé.

#### Les durées des ressources sont omises pour les pages figées {#resource-durations-are-omitted-for-frozen-pages}
La collecte des ressources omet les durées des ressources qui ont été prolongées en raison du passage de la page en arrière-plan, par exemple lorsque l'utilisateur clique sur un onglet distinct pendant le chargement de la page.

**Aucune action requise** : Ce comportement prend automatiquement effet dans la v5.

#### Suivi des ressources et des tâches longues {#resources-and-long-task-tracking}
Lorsque vous utilisez `sessionReplaySampleRate` au lieu de `replaySampleRate` ou `premiumSampleRate` (tous deux obsolètes), vous devez configurer explicitement les ressources et les tâches longues.

**Action à entreprendre** : Pour collecter ces événements, assurez-vous que `trackResources` et `trackLongTasks` sont définis sur `true`.

#### Les noms des méthodes de ressources sont en majuscules {#resource-method-names-are-in-uppercase}
Afin d'éviter d'avoir des valeurs différentes pour le même nom de méthode en fonction de la casse (POST/post), les noms des méthodes sont désormais systématiquement envoyés en majuscules.

**Action à entreprendre** : Mettez à jour les requêtes de monitor ou de dashboard pour utiliser le champ `resource.method` avec des valeurs en majuscules.

#### `beforeSend` événement d'action {#beforesend-action-event}
L'API `beforeSend` permet d'accéder aux informations contextuelles des événements collectés (voir [Enrichir et contrôler les données RUM][23]).

Avec l'introduction des signaux de frustration, un événement dʼaction peut être associé à plusieurs événements DOM.

Parallèlement à cette mise à jour, l'attribut `context.event` a été supprimé au profit de l'attribut `context.events`.

**Action à entreprendre** : Mettez à jour le code `beforeSend` pour utiliser `context.events` au lieu de `context.event`.

```javascript
beforeSend: (event, context) => {
  if (event.type === 'action' && event.action.type === 'click') {
    // accessing browser events related to the action event
    // before, single event: context.event
    // now, multiple events: context.events
  }
}
```

#### `beforeSend` pendant les périodes au premier plan {#beforesend-in-foreground-periods}
L'attribut `view.in_foreground_periods` est calculé directement depuis le backend, et non envoyé par le SDK.

**Action à entreprendre** : Supprimez `view.in_foreground_periods` du code `beforeSend`. Si vous utilisiez cet attribut pour un cas d'utilisation spécifique, contactez le [Support][24] pour obtenir de l'aide.

#### `beforeSend` entrée de performance {#beforesend-performance-entry}
L'attribut de contexte `beforeSend` `performanceEntry` a été mis à jour depuis la représentation JSON pour inclure directement l'objet d'entrée de performance.

Le type `PerformanceEntryRepresentation` exporté a été supprimé au profit du type `PerformanceEntry` standard.

**Action à entreprendre** : Dans le code `beforeSend`, utilisez directement le type `PerformanceEntry` au lieu du type `PerformanceEntryRepresentation`.

### Logs {#logs-1}
#### Supprimer le préfixe d'erreur de console {#remove-console-error-prefix}
Le préfixe « `console error:` » dans les messages de logs a été supprimé. Ces informations se trouvent dans l'attribut `origin`.

**Action à entreprendre** : Mettez à jour les requêtes de monitor ou de dashboard utilisant le préfixe `"console error:"` pour utiliser `@origin:console` à la place.

#### Supprimer `error.origin` {#remove-errororigin}

Depuis l'introduction de l'attribut `origin` sur tous les logs, `error.origin` était redondant et a été supprimé.

**Action à entreprendre** : Mettez à jour les requêtes de monitor ou de dashboard utilisant `error.origin` pour utiliser `origin` à la place.

#### Découpler le logger principal {#decouple-main-logger}
Lorsque le SDK collecte des erreurs d'exécution ou des logs réseau, de rapport ou de console, il n'ajoute pas le contexte spécifique au logger principal (`DD_LOGS.logger`), et il n'utilise pas le niveau ou le gestionnaire défini pour ce logger.

**Action à entreprendre** : Si vous vous appuyiez sur le niveau du logger principal pour exclure les logs non liés au logger, utilisez plutôt des paramètres d'initialisation dédiés.

**Action à entreprendre** : Si vous vous appuyiez sur le contexte du logger principal pour ajouter du contexte aux logs non liés au logger, utilisez plutôt le contexte global.

## De la v3 à la v4 {#from-v3-to-v4}

La version 4 des SDK RUM et Logs Browser inclut plusieurs changements majeurs.

### Modifications {#changes}

#### URLs d'ingestion {#intake-urls}

Les URLs vers lesquelles les données du SDK RUM Browser sont envoyées ont changé. Assurez-vous que votre [Content Security Policy est à jour][1].

#### Version minimale de Typescript prise en charge {#minimal-typescript-version-support}

La version 4 du SDK RUM Browser ne prend pas en charge les versions de TypeScript antérieures à la v3.8.2. Si vous utilisez TypeScript, veillez donc à utiliser au minimum la version 3.8.2.

#### Syntaxe des tags {#tags-syntax}

Les paramètres d'initialisation `version`, `env` et `service` sont envoyés en tant que tags à Datadog. Le SDK RUM Browser les nettoie légèrement pour s'assurer qu'ils ne génèrent pas plusieurs tags, et affiche un avertissement si ces valeurs ne respectent pas la syntaxe requise pour les tags.

#### Typage plus strict des paramètres d'initialisation{#stricter-initialization-parameters-typing}

Les types TypeScript représentant les paramètres d'initialisation sont plus stricts et peuvent rejeter des paramètres non pris en charge qui étaient précédemment acceptés. Si vous obtenez des erreurs de vérification de type, assurez-vous de fournir des paramètres d'initialisation pris en charge.

#### Priorité des options de confidentialité{#privacy-options-precedence}

Lorsque plusieurs options de confidentialité sont spécifiées sur le même élément, Datadog applique l'option la plus restrictive pour éviter toute fuite inattendue de données sensibles. Par exemple, si les classes `dd-privacy-allow` et `dd-privacy-hidden` sont toutes deux spécifiées sur le même élément, celui-ci est masqué au lieu d'être autorisé.

#### Calcul des noms d'action{#action-names-computation}

Lors du calcul des noms d'action, le SDK RUM Browser supprime le texte des éléments enfants dotés de l'attribut `data-dd-action-name` du texte interne.

Par exemple, pour l'élément `container` suivant, alors qu'auparavant le nom d'action calculé aurait été `Container sensitive data`, dans la v4, le nom d'action calculé est `Container` :

```html
<div id="container">
  Container
  <div data-dd-action-name="sensitive">sensitive data</div>
</div>
```

### Suppressions {#removals}

#### Champ `_datadog_xhr` XHR {#xhr-datadog-xhr-field}

Le SDK Navigateur RUM utilisait précédemment une propriété `_datadog_xhr` sur les objets `XMLHttpRequest` représentant son état interne. Cette propriété a été supprimée sans remplacement car elle n'était pas destinée à être utilisée en externe.

#### `proxyHost` paramètre d'initialisation {#proxyhost-initialization-parameter}

Le paramètre d'initialisation `proxyHost` a été supprimé. Utilisez plutôt le paramètre d'initialisation `proxyUrl`.

#### Prise en charge des options de confidentialité {#privacy-options-support}

Les options de confidentialité `input-ignored` et `input-masked` ne sont plus valides. Utilisez plutôt l'option de confidentialité `mask-user-input`.

Vous devez donc remplacer :

* `dd-privacy-input-ignored` et `dd-privacy-input-masked` noms de classe avec `dd-privacy-mask-user-input`
* `dd-privacy="input-masked"` et `dd-privacy="input-ignored"` valeurs d'attribut avec `dd-privacy="mask-user-input"`

## De la v2 à la v3 {#from-v2-to-v3}

Le SDK Navigateur v3 introduit [Session Replay][2]. Avec cette mise à jour majeure, plusieurs modifications incompatibles ont été apportées aux SDK Navigateur RUM et Logs.

### Modifications {#changes-1}
#### Erreurs RUM {#rum-errors}

Le SDK Navigateur RUM n'émet plus d'[erreurs RUM][3] pour les appels XHR et Fetch ayant échoué. Ces requêtes réseau ayant échoué sont toujours collectées en tant que [ressources RUM][4], qui contiennent l'attribut de code de statut.

Pour continuer à voir les requêtes réseau ayant échoué en tant qu'erreurs RUM, Datadog recommande d'intercepter la ressource avec l'[API beforeSend][5], de vérifier la propriété `status_code` et d'envoyer manuellement une erreur avec l'[API addError][6].

```javascript
beforeSend: (event) => {
    if (event.type === 'resource' && event.resource.status_code >= 500) {
        datadogRum.addError(`${event.resource.method} ${event.resource.url} ${event.resource.status_code}`); // "GET https://www.example.com/ 504"
    }
}
```

#### Attribut de source d'erreur RUM {#rum-error-source-attribute}

Le SDK RUM Browser ne vous permet plus de spécifier la source d'une erreur collectée avec l'[API addError][6]. Toutes les erreurs collectées avec cette API ont leur attribut source défini sur `custom`. L'[API addError][6] accepte un objet de contexte comme second paramètre, qui doit être utilisé pour transmettre un contexte supplémentaire concernant l'erreur.

### Suppressions {#removals-1}
#### API RUM {#rum-api}

| Ancienne API     | Nouvelle API |
| ------------- | --------- |
| addUserAction | addAction |

#### Options d'initialisation {#initialization-options}

| Anciennes options        | Nouvelles options |
| ------------------ | ----------- |
| publicApiKey       | clientToken |
| datacenter         | site        |
| resourceSampleRate | NONE        |

#### Types TypeScript {#typescript-types}

| Anciens types                    | Nouveaux types                    |
| ---------------------------- | ---------------------------- |
| RumUserConfiguration         | RumInitConfiguration         |
| RumRecorderUserConfiguration | RumRecorderInitConfiguration |
| LogsUserConfiguration        | LogsInitConfiguration        |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/faq/content_security_policy
[2]: /fr/session_replay/
[3]: /fr/real_user_monitoring/application_monitoring/browser/collecting_browser_errors/
[4]: /fr/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance/
[5]: /fr/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[6]: /fr/real_user_monitoring/application_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[7]: /fr/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#clear-user-session-property
[8]: /fr/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#add-global-context-property
[9]: /fr/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#remove-global-context-property
[10]: /fr/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#read-global-context
[11]: /fr/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#replace-global-context
[12]: /fr/api/latest/rum/
[13]: /fr/api/latest/rum/
[14]: /fr/api/latest/rum/
[15]: /fr/api/latest/rum/
[16]: /fr/api/latest/rum/
[17]: /fr/api/latest/rum/
[18]: /fr/integrations/content_security_policy_logs/?tab=firefox#use-csp-with-real-user-monitoring-and-session-replay
[19]: https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
[20]: /fr/session_replay/privacy_options?platform=browser#configuration
[21]: /fr/real_user_monitoring/guide/sampling-browser-plans/#setup
[22]: /fr/session_replay/
[23]: /fr/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[24]: /fr/help/
[26]: /fr/real_user_monitoring/application_monitoring/browser/
[25]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm#opentelemetry-support
[27]: /fr/real_user_monitoring/guide/proxy-rum-data
[28]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html
[29]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum#:~:text=configure%20the%20traceContextInjection
[30]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
[31]: https://webpack.js.org/guides/code-splitting/#dynamic-imports
[32]: https://esbuild.github.io/api/#splitting
[33]: https://rollupjs.org/tutorial/#code-splitting
[34]: https://parceljs.org/features/code-splitting
[35]: https://developer.chrome.com/docs/web-platform/long-animation-frames#long-frames-api