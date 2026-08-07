---
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualiser vos données RUM dans l'Explorer
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: Blog
  text: Utiliser la solution Session Replay de Datadog pour visualiser en temps réel
    les parcours utilisateur

title: Mettre à jour le SDK RUM Browser
---

## Présentation

Suivez les instructions de ce guide pour passer d'une version majeure à une autre des SDK Browser RUM et Browser Logs. Consultez la [documentation relative aux SDK][26] pour obtenir plus d'informations sur ses fonctionnalités.

## De la version 4 à la version 5

La version 5 introduit les changements suivants et bien d'autres encore :

- Nouvelles configurations et réglages de confidentialité par défaut pour Session Replay
- Collecte automatique des signaux de frustration
- Métriques de performances actualisées
- Paramètres et API du SDK mis à jour

Tenez compte des changements importants ci-dessous lors de la mise à jour de votre SDK. Les modifications sont regroupées par domaine d'impact.

### General

#### Paramètres d'initialisation du SDK

**Opération à effectuer** : Remplacer les paramètres obsolètes par les nouveaux paramètres équivalents dans la version 5. Les anciens noms de paramètres ne sont plus disponibles dans la version 5.

| Nom de paramètre obsolète (version 4 ou antérieure) | Nouveau nom de paramètre (version 5) |
|-------------------------------------------|-------------------------|
| proxyUrl | proxy |
| sampleRate | sessionSampleRate |
| allowedTracingOrigins | allowedTracingUrls |
| tracingSampleRate | traceSampleRate |
| trackInteractions | trackUserInteractions |
| premiumSampleRate | sessionReplaySampleRate |
| replaySampleRate | sessionReplaySampleRate |

#### API publiques

**Opération à effectuer** : Remplacer les API obsolètes par les nouvelles API équivalentes. Les anciennes API ne sont plus disponibles dans la version 5.

| Nom de paramètre obsolète (version 4 ou antérieure) | Nouveau nom de paramètre (version 5) |
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

#### Domaines d'admission
La version 5 envoie des données à des domaines d'admission différents de ceux des versions précédentes.

**Opération à effectuer** : Mettre à jour toutes les entrées [Content Security Policy (CSP)][18] `connect-src` pour utiliser le nouveau domaine.

| Site Datadog | Domaine |
|--------------|--------|
| US1 | `connect-src https://browser-intake-datadoghq.com` |
| US3 | `connect-src https://browser-intake-us3-datadoghq.com` |
| US5 | `connect-src https://browser-intake-us5-datadoghq.com` |
| EU1 | `connect-src https://browser-intake-datadoghq.eu` |
| US1-FED | `connect-src https://browser-intake-ddog-gov.com` |
| AP1 | `connect-src https://browser-intake-ap1-datadoghq.com` |

#### Événements de confiance
Pour éviter de recueillir des données incorrectes ou illégitimes, la version 5 n'écoute que les événements générés par des actions de l'utilisateur, et ignore les événements créés par des scripts. Référez-vous à la section [Événements de confiance][19] pour en savoir plus.

**Opération à effectuer** : Si vous dépendez fortement de la programmation événements et si vous souhaitez qu'ils soient pris en compte par le SDK, ajoutez-leur l'attribut `__ddIsTrusted`, comme ci-dessous :

```javascript
const click = new Event('click')
click.__ddIsTrusted = true
document.dispatchEvent(click)
```

**Opération à effectuer** : Si vous dépendez fortement de la programmation événements, comme lors dʼun test d'environnement dʼIU automatisé, vous pouvez autoriser tous les événements non fiables en définissant `allowUntrustedEvents: true`.

#### Type de renvoi `beforeSend`
Les fonctions de rappel `beforeSend` doivent renvoyer une valeur booléenne :

```javascript
beforeSend(event: any, context?: any) => boolean
```

Lʼimplémentation n'a pas changé. Si aucune valeur n'est renvoyée, lʼévénement n'est pas supprimé.

**Opération à effectuer** : Assurez-vous que `beforeSend` renvoie `true` pour conserver lʼévénement et `false` pour le rejeter. Cela résout les erreurs de compilation TypeScript associées.

### Session Replay

#### Masquage de Session Replay

Le paramètre de masquage par défaut `defaultPrivacyLevel` de Session Replay est passé de`mask-user-input` à `mask`. Toutes les données des enregistrements de Session Replay sont ainsi masquées par défaut, ce qui rend la consultation des enregistrements moins sensible. Pour plus d'informations, référez-vous à la section [Session Replay Browser Privacy Options][20] (en anglais).

**Opération à effectuer** : Si vous souhaitez voir davantage de données non masquées dans Session Replay, comme du contenu HTML non sensible ou du texte saisi par l'utilisateur, définissez `defaultPrivacyLevel` sur `mask-user-input` ou `allow`.

#### Enregistrement automatique des sessions échantillonnées pour Session Replay
Les sessions échantillonnées pour Session Replay à l'aide de [`sessionReplaySampleRate`][21] sont automatiquement enregistrées au début de la session. Cela signifie que vous n'avez pas besoin d'appeler la méthode [`startSessionReplayRecording()`][22] pour capturer un enregistrement. En d'autres termes, vous ne raterez aucun enregistrement par accident.

**Opération à effectuer** : Si vous souhaitez continuer à utiliser l'ancienne méthode d'enregistrement et modifier le moment où l'enregistrement commence, définissez `startSessionReplayRecordingManually` sur `true`.

#### Ne payer pour Session Replay que lorsque la session effectue un enregistrement
Dans les versions précédentes du SDK, les sessions sont déterminées comme étant des sessions Session Replay par le biais du mécanisme d'échantillonnage. Dans la version 5, les sessions ne sont considérées comme des sessions Session Replay que si un enregistrement est effectué au cours de la session. Il est ainsi plus facile de suivre votre utilisation de Session Replay.

**Aucune action nécessaire** : Ce comportement prend automatiquement effet dans la version 5.

#### Taux d'échantillonnage par défaut de Session Replay
Dans la version 5, la valeur par défaut de `sessionReplaySampleRate` est 0 au lieu de 100. Si vous n'indiquez pas de taux d'échantillonnage, aucune relecture n'est enregistrée.

**Opération à effectuer** : Pour utiliser Session Replay, définissez explicitement un taux d'échantillonnage à l'aide de `sessionReplaySampleRate: 100` (ou un autre taux d'échantillonnage).

### RUM

### Intégration de la solution APM 

Pour promouvoir le soutien et l'utilisation d'OpenTelemetry, les types de propagateurs par défaut ont été modifiés pour inclure `tracecontext` en plus de `datadog`.

**Opération à effectuer** : Si vous ne spécifiez pas déjà le propagateur souhaité dans le paramètre d'initialisation `allowedTracingUrls`, configurez votre serveur Access-Control-Allow-Headers pour qu'il accepte également l'en-tête `traceparent`. Pour plus d'informations, référez-vous à la section [connect RUM and Traces][25] (en anglais).

### Champ du plan de session

En ce qui concerne les modifications apportées à Session Replay, le champ `session.plan` n'est disponible que pour les événements de session.

**Opération à effectuer** : Mettre à jour toutes les requêtes monitor ou dashboard que vous avez enregistrées afin d'exclure le champ `session.plan` pour les événements hors session.

#### Les signaux de frustration sont recueillis automatiquement
Il vous suffit de définir `trackUserInteractions: true` pour recueillir toutes les interactions des utilisateurs, y compris les signaux de frustration. Il n'est plus nécessaire de définir le paramètre `trackFrustrations` séparément.

**Opération à effectuer** : Pour suivre les signaux de frustration, définissez `trackUserInteractions: true`. Le paramètre `trackFrustrations` peut être supprimé.

#### La durée des ressources est omise pour les pages gelées
La collecte des ressources omet les durées des ressources qui ont été prolongées en raison du passage de la page en arrière-plan, par exemple lorsque l'utilisateur clique sur un onglet distinct pendant le chargement de la page.

**Aucune action nécessaire** : Ce comportement prend automatiquement effet dans la version 5.

#### Suivi des ressources et des tâches longues
Lorsque vous utilisez `sessionReplaySampleRate` au lieu de `replaySampleRate` ou `premiumSampleRate` (tous deux obsolètes), vous devez configurer les ressources et les tâches longues de manière explicite.

**Opération à effectuer** : Pour recueillir ces événements, assurez-vous que `trackResources` et `trackLongTasks` sont définis sur `true`.

#### Les noms des méthodes des ressources sont en majuscules
Afin d'éviter d'avoir des valeurs différentes pour le même nom de méthode en fonction de la casse (POST/post), les noms des méthodes sont désormais systématiquement envoyés en majuscules.

**Opération à effectuer** : Mettre à jour les requêtes monitor ou dashboard pour utiliser le champ `resource.method` avec des valeurs en majuscules.

#### Événement dʼaction `beforeSend`
L'API `beforeSend` permet d'accéder aux informations contextuelles des événements recueillis (référez-vous à la section [Enrichir et contrôler les données RUM][23]).

Avec l'introduction des signaux de frustration, un événement dʼaction peut être associé à plusieurs événements DOM.

Avec cette mise à jour, l'attribut `context.event` a été supprimé au profit de l'attribut `context.events`.

**Opération à effectuer** : Mettre à jour le code `beforeSend` pour utiliser `context.events` au lieu de `context.event`.

```javascript
beforeSend: (event, context) => {
  if (event.type === 'action' && event.action.type === 'click') {
    // accéder aux événements du navigateur associés à lʼévénement dʼaction
    // avant, événement unique : context.event
    // maintenant, plusieurs événements : context.events
  }
}
```

#### `beforeSend` dans les périodes de premier plan
L'attribut `view.in_foreground_periods` est calculé directement à partir du backend et n'est pas envoyé par le SDK.

**Opération à effectuer** : Supprimer `view.in_foreground_periods` du code `beforeSend`. Si vous comptiez sur cet attribut pour un cas d'utilisation spécifique, contactez [lʼassistance][24] pour obtenir de l'aide.

#### Entrée de la performances `beforeSend`
L'attribut `performanceEntry` du contexte `beforeSend` a été mis à jour à partir de la représentation JSON pour inclure directement l'objet d'entrée de la performance.

Le type `PerformanceEntryRepresentation` exporté a été supprimé en faveur du type `PerformanceEntry` standard.

**Opération à effectuer** : Dans le code `beforeSend`, utilisez directement le type `PerformanceEntry` au lieu du type `PerformanceEntryRepresentation`.

### Logs
#### Supprimer le préfixe d'erreur de la console
Le préfixe « `console error:` » dans les messages de logs a été supprimé. Cette information se trouve dans l'attribut `origin`.

**Opération à effectuer** : Mettre à jour les requêtes monitor ou dashboard utilisant le préfixe `"console error:"` pour utiliser `@origin:console` à la place.

#### Supprimer `error.origin`

`error.origin` est devenu redondant avec l'introduction de l'attribut `origin` sur tous les logs et a été supprimé.

**Opération à effectuer** : Mettre à jour les requêtes monitor ou dashboard utilisant `error.origin` pour utiliser `origin` à la place.

#### Découpler l'enregistreur principal
Lorsque le SDK collecte des erreurs d'exécution ou de réseau, des rapports ou des logs de console, il n'ajoute pas le contexte spécifique au logger principal (`DD_LOGS.logger`), et il n'utilise pas le niveau ou le gestionnaire défini pour ce logger.

**Opération à effectuer** : Si vous dépendiez du niveau du logger principal pour exclure les logs non logger, utilisez plutôt des paramètres d'initialisation dédiés.

**Opération à effectuer** : Si vous dépendiez du contexte du logger principal pour ajouter du contexte à des logs non logger, utilisez plutôt le contexte global.

## De la version 3 à la version 4

La version 4 des SDK RUM et Logs Browser inclut plusieurs changements majeurs.

### Changements

#### URL d'admission

Les URL vers lesquelles le SDK RUM Browser envoie des données ont été modifiées. Vérifiez que votre [stratégie de sécurité de contenu a bien été modifiée en conséquence][1].

#### Version minimale de Typescript compatible

La version 4 du SDK RUM Browser ne prend pas en charge les versions de TypeScript antérieures à la v3.8.2. Si vous utilisez TypeScript, veillez donc à utiliser au minimum la version 3.8.2.

#### Syntaxe des tags

Les paramètres d'initialisation `version`, `env` et `service` sont envoyés à Datadog sous la forme de tags. Le SDK Browser RUM les nettoie légèrement, pour s'assurer qu'ils ne génèrent pas plusieurs tags, et affiche un avertissement si ces valeurs ne répondent pas aux exigences de la syntaxe des tags.

#### Typage plus strict des paramètres d'initialisation

Les types TypeScript représentant des paramètres d'initialisation sont désormais plus stricts et peuvent rejeter certains paramètres non compatibles qui étaient auparavant acceptés. Si vous rencontrez des erreurs de vérification des types, assurez-vous que vous fournissez des paramètres d'initialisation pris en charge.

#### Priorité des options de confidentialité

Lorsque plusieurs options de confidentialité sont définies pour un seul élément, Datadog applique l'option la plus restrictive, afin d'éviter toute fuite de données sensibles. Par exemple, si les classes `dd-privacy-allow` et `dd-privacy-hidden` sont toutes les deux spécifiées pour un seul élément, celui-ci est masqué et non autorisé.

#### Calcul des noms d'action

Lors du calcul des noms d'action, le SDK RUM Browser supprime le texte des éléments enfant avec l'attribut `data-dd-action-name` provenant du texte interne.

Par exemple, pour l'élément `container` suivant, la version 3 calculait le nom d'action `Container sensitive data`, tandis que la version 4 calcule le nom `Container` :
```html
<div id="container">
  Container
  <div data-dd-action-name="sensitive">sensitive data</div>
</div>
```

### Suppressions

#### Champ XHR `_datadog_xhr`

Le SDK Browser RUM utilisait auparavant une propriété `_datadog_xhr` sur les objets `XMLHttpRequest` afin de représenter son état interne. Cette propriété a été supprimée et n'est pas remplacée, car elle était uniquement destinée à un usage interne.

#### Paramètre d'initialisation `proxyHost`

Le paramètre d'initialisation `proxyHost` a été supprimé. Utilisez à la place le paramètre d'initialisation `proxyUrl`.

#### Prise en charge des options de confidentialité

Les options de confidentialité `input-ignored` et `input-masked` ne sont plus acceptées. Utilisez à la place l'option de confidentialité `mask-user-input`.

Vous devez donc remplacer :

* les noms de classe `dd-privacy-input-ignored` et `dd-privacy-input-masked` par `dd-privacy-mask-user-input` ;
* les valeurs d'attribut `dd-privacy="input-masked"` et `dd-privacy="input-ignored"` par `dd-privacy="mask-user-input"`.

## De la version 2 à la version 3

La version 3 du SDK Browser propose une nouvelle fonctionnalité : [Session Replay][2]. Cette mise à jour modifie également de façon considérable le fonctionnement des SDK RUM et Logs Browser.

### Changements
#### Erreurs RUM

Le SDK RUM Browser ne génère plus d'[erreurs RUM][3] pour les appels Fetch et XHR échoués. Les échecs de ces requêtes réseau sont toujours recueillis sous la forme de [ressources RUM][4], avec l'attribut du code de statut.

Pour continuer à visualiser les échecs de requêtes réseau sous la forme d'erreurs RUM, Datadog recommande d'intercepter la ressource avec l'[API beforeSend][5], de vérifier la propriété `status_code`, puis d'envoyer manuellement une erreur grâce à l'[API addError][6].

```javascript
beforeSend: (event) => {
    if (event.type === 'resource' && event.resource.status_code >= 500) {
        datadogRum.addError(`${event.resource.method} ${event.resource.url} ${event.resource.status_code}`); // "GET https://www.example.com/ 504"
    }
}
```

#### Attribut source des erreurs RUM

Le SDK RUM Browser ne vous permet plus de spécifier la source d'une erreur recueillie avec l'[API addError][6]. L'attribut source de toutes les erreurs recueillies avec cette API est défini sur `custom`. L'[API addError][6] accepte un objet de contexte comme deuxième paramètre, afin de transmettre plus de contexte sur l'erreur.

### Suppressions
#### API RUM

| Ancienne API       | Nouvelle API   |
| ------------- | --------- |
| addUserAction | addAction |

#### Options d'initialisation

| Anciennes options        | Nouvelles options |
| ------------------ | ----------- |
| publicApiKey       | clientToken |
| datacenter         | site        |
| resourceSampleRate | AUCUNE        |

#### Types TypeScript

| Anciens types                    | Nouveaux types                    |
| ---------------------------- | ---------------------------- |
| RumUserConfiguration         | RumInitConfiguration         |
| RumRecorderUserConfiguration | RumRecorderInitConfiguration |
| LogsUserConfiguration        | LogsInitConfiguration        |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/faq/content_security_policy
[2]: /fr/real_user_monitoring/session_replay
[3]: /fr/real_user_monitoring/browser/collecting_browser_errors/
[4]: /fr/real_user_monitoring/browser/monitoring_resource_performance/
[5]: /fr/real_user_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[6]: /fr/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[7]: /fr/real_user_monitoring/browser/advanced_configuration/?tab=npm#clear-user-session-property
[8]: /fr/real_user_monitoring/browser/advanced_configuration/?tab=npm#add-global-context-property
[9]: /fr/real_user_monitoring/browser/advanced_configuration/?tab=npm#remove-global-context-property
[10]: /fr/real_user_monitoring/browser/advanced_configuration/?tab=npm#read-global-context
[11]: /fr/real_user_monitoring/browser/advanced_configuration/?tab=npm#replace-global-context
[12]: /fr/api/latest/rum/
[13]: /fr/api/latest/rum/
[14]: /fr/api/latest/rum/
[15]: /fr/api/latest/rum/
[16]: /fr/api/latest/rum/
[17]: /fr/api/latest/rum/
[18]: /fr/integrations/content_security_policy_logs/?tab=firefox#use-csp-with-real-user-monitoring-and-session-replay
[19]: https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
[20]: /fr/real_user_monitoring/session_replay/browser/privacy_options/#configuration
[21]: /fr/real_user_monitoring/guide/sampling-browser-plans/#setup
[22]: /fr/real_user_monitoring/session_replay/browser/#usage
[23]: /fr/real_user_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[24]: /fr/help/
[26]: /fr/real_user_monitoring/browser/
[25]: /fr/real_user_monitoring/platform/connect_rum_and_traces#opentelemetry-support