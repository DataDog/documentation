---
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualiser vos données RUM dans l'Explorer

title: Enrichir et contrôler les données RUM Browser avec beforeSend
---

## Présentation

Le SDK RUM Browser enregistre les événements RUM et renseigne les attributs principaux correspondants. La fonction de rappel `beforeSend` vous permet d'accéder à chaque événement recueilli par le SDK RUM avant qu'il ne soit envoyé à Datadog. L'interception d'événements RUM vous permet d'effectuer les opérations suivantes :
* Enrichir vos événements RUM avec des attributs de contexte supplémentaires
* Modifier vos événements RUM de façon à changer leur contenu ou à censurer les séquences sensibles (consultez la [liste des propriétés modifiables][1])
* Ignorer les événements RUM sélectionnés

## Structure de l'événement et du contexte
La fonction de rappel `beforeSend` vous permet d'utiliser deux objets : `event` et `context`.

```javascript
function beforeSend(event, context)
```

### Événement
L'événement est généré par le SDK RUM. Pour en savoir plus sur les différents types d'événements et sur les attributs recueillis, consultez la section [Données RUM Browser recueillies][2].

La propriété `event.type` vous permet d'identifier le type de l'événement :
```json
{
    ...,
    "event.type": "resource",
    ...
}
```

### Contexte
Le contexte rassemble des informations sur les API Browser qui déclenchent la création de l'événement. Les valeurs de contexte varient en fonction du paramètre `event.type` :
| Type d'événement RUM       | Contexte                                                         |
|----------------------|-----------------------------------------------------------------|
| Vue | [Emplacement][3]                                              |
| Action               | [Événement][4]                                                      |
| Ressource (XHR)       | [XMLHttpRequest][5] et [PerformanceResourceTiming][6]          |
| Ressource (Fetch)     | [Requête][7], [réponse][8] et [PerformanceResourceTiming][6] |
| Ressource (autre)     | [PerformanceResourceTiming][6]                                  |
| Erreur                | [Erreur][9] ou toute autre valeur considérée comme une erreur                |
| Tâche longue            | [PerformanceLongTaskTiming][10]                                 |

Le [référentiel browser-sdk][11] contient plus d'informations sur la structure des objets de contexte.

## Exemples

### Recueillir des en-têtes HTTP depuis une réponse Fetch

Utilisez la configuration `beforeSend` suivante pour recueillir des en-têtes HTTP à partir d'une réponse Fetch. Les attributs de contexte supplémentaires **doivent** être stockés dans l'objet `event.context`.

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    beforeSend: (event, context) => {
        // recueillir des en-têtes de réponse d'une ressource RUM
        if (event.type === 'resource' && event.resource.type === 'fetch') {
            event.context.responseHeaders = Object.fromEntries(context.response.headers)
        }
        return true
    },
    ...
});
```

Les onglets ci-dessous présentent les informations contenues dans l'événement `beforeSend` et les objets de contexte pour cet exemple :

{{< tabs >}}
{{% tab "Événement" %}}

```json
{
    "application": {
        "id": "<VOTRE_ID_APPLICATION>"
    },
    "date": 1623933472075,
    "service": "shopist-web-ui",
    "session": {
        "type": "user",
        "id": "308f14ac-2a27-4b50-945c-be345778994f",
        "has_replay": true
    },
    "view": {
        "id": "768f0eb9-39c5-4a1f-9c13-476bd08166bb",
        "referrer": "http://localhost:3000/",
        "url": "http://localhost:3000/"
    },
    "resource": {
        "id": "e5d1d3a4-7240-4910-bd0a-af253e06d301",
        "type": "fetch",
        "duration": 2577300000,
        "method": "get",
        "status_code": 200,
        "url": "https://api.shopist.io/products.json",
        "size": 10307,
        "download": {
            "duration": 1800000,
            "start": 2575500000
        },
        "first_byte": {
            "duration": 2574600000,
            "start": 900000
        }
    },
    "type": "resource",
    "context": {
        "browser_test": false,
        "usr.email": "jane@doe.com",
        "usr.id": "f57eg30cc9"
    }
}
```
{{% /tab %}}
{{% tab "Contexte" %}}
```json
{
    "performanceEntry": {
        "name": "https://api.shopist.io/products.json",
        "entryType": "resource",
        "startTime": 230,
        "duration": 2577.300000011921,
        "initiatorType": "fetch",
        "nextHopProtocol": "h2",
        "workerStart": 0,
        "redirectStart": 0,
        "redirectEnd": 0,
        "fetchStart": 230,
        "domainLookupStart": 230,
        "domainLookupEnd": 230,
        "connectStart": 230,
        "connectEnd": 230,
        "secureConnectionStart": 230,
        "requestStart": 230.90000000596046,
        "responseStart": 2805.5,
        "responseEnd": 2807.300000011921,
        "transferSize": 10743,
        "encodedBodySize": 10307,
        "decodedBodySize": 10307,
        "serverTiming": [],
        "workerTiming": []
    },
    "response": {
        "body": (...),
        "bodyUsed": true,
        "headers": Headers {},
        "ok": true,
        "redirected": false,
        "status": 200,
        "statusText": "",
        "type": "basic",
        "url": "https://api.shopist.io/products.json"
    },
    "requestInput": "https://api.shopist.io/products.json",
    "requestInit": {
        "headers": [
            [
                "Content-Type",
                "application/json; charset=utf-8"
            ],
            [
                "x-datadog-origin",
                "rum"
            ],
            [
                "x-datadog-parent-id",
                "595857188965892467"
            ],
            [
                "x-datadog-sampled",
                "1"
            ],
            [
                "x-datadog-sampling-priority",
                "1"
            ],
            [
                "x-datadog-trace-id",
                "796856647783126791"
            ]
        ],
        "method": "get",
        "cache": "no-cache"
    }
}
```
{{% /tab %}}
{{< /tabs >}}

### Ignorer une erreur frontend

Ignorez les erreurs frontend si leur message contient la mention « profile is not defined » avec la configuration `beforeSend` suivante :

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    beforeSend: (event, context) => {
        // ignorer une erreur RUM si son message contient la mention « profile is not defined »
        if (event.type === 'error' && event.error.message.includes('profile is not defined')) {
            return false
        }
    },
    ...
});
```

Les onglets ci-dessous présentent les informations contenues dans l'événement `beforeSend` et les objets de contexte pour cet exemple :

{{< tabs >}}
{{% tab "Événement" %}}

```json
{
    "application": {
        "id": "75d50c62-8b66-403c-a453-aaa1c44d64bd"
    },
    "date": 1623941859639,
    "service": "shopist-web-ui",
    "session": {
        "type": "user",
        "id": "4203a142-1e3c-41b0-822d-316705d98f19",
        "has_replay": true
    },
    "view": {
        "id": "0a771c95-9bc4-4640-978e-ad28da64da45",
        "referrer": "http://localhost:3000/profile",
        "url": "http://localhost:3000/profile-edit"
    },
    "action": {
        "id": "7b30e681-ce5c-47a8-ac22-6aff8be59744"
    },
    "error": {
        "id": "3c0295b1-da48-4827-93c9-ea06be4aafd9",
        "message": "profile is not defined",
        "source": "source",
        "stack": "ReferenceError: profile is not defined\n  at VueComponent.discardEdit @ http://localhost:3000/_nuxt/pages/profile-edit.js:911:41\n  at invokeWithErrorHandling @ http://localhost:3000/_nuxt/commons.app.js:12167:26\n  at VueComponent.invoker @ http://localhost:3000/_nuxt/commons.app.js:12492:14\n  at invokeWithErrorHandling @ http://localhost:3000/_nuxt/commons.app.js:12167:26\n  at VueComponent.Vue.$emit @ http://localhost:3000/_nuxt/commons.app.js:14196:9\n  at VueComponent.cancelDraft @ http://localhost:3000/_nuxt/pages/profile-edit.js:828:12\n  at invokeWithErrorHandling @ http://localhost:3000/_nuxt/commons.app.js:12167:26\n  at HTMLButtonElement.invoker @ http://localhost:3000/_nuxt/commons.app.js:12492:14\n  at HTMLButtonElement.original._wrapper @ http://localhost:3000/_nuxt/commons.app.js:17221:25",
        "type": "ReferenceError",
        "handling": "unhandled"
    },
    "type": "error",
    "context": {
        "browser_test": false,
        "usr.email": "jane@doe.com",
        "usr.id": "f57eg30cc9"
    }
}
```
{{% /tab %}}
{{% tab "Contexte" %}}
```json
{
    "error": {
        "message": "profile is not defined",
        "stack": "ReferenceError: profile is not defined\n  at VueComponent.discardEdit @ http://localhost:3000/_nuxt/pages/profile-edit.js:911:41\n  at invokeWithErrorHandling @ http://localhost:3000/_nuxt/commons.app.js:12167:26\n  at VueComponent.invoker @ http://localhost:3000/_nuxt/commons.app.js:12492:14\n  at invokeWithErrorHandling @ http://localhost:3000/_nuxt/commons.app.js:12167:26\n  at VueComponent.Vue.$emit @ http://localhost:3000/_nuxt/commons.app.js:14196:9\n  at VueComponent.cancelDraft @ http://localhost:3000/_nuxt/pages/profile-edit.js:828:12\n  at invokeWithErrorHandling @ http://localhost:3000/_nuxt/commons.app.js:12167:26\n  at HTMLButtonElement.invoker @ http://localhost:3000/_nuxt/commons.app.js:12492:14\n  at HTMLButtonElement.original._wrapper @ http://localhost:3000/_nuxt/commons.app.js:17221:25"
    }
}
```
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#modify-the-content-of-a-rum-event
[2]: /fr/real_user_monitoring/browser/data_collected/
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Location
[4]: https://developer.mozilla.org/en-US/docs/Web/API/Event
[5]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[6]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[9]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[10]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming
[11]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum-core/src/domainContext.types.ts
