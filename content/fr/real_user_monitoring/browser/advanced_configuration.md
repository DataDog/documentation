---
title: Configuration avancée du RUM
kind: documentation
aliases:
  - /fr/real_user_monitoring/installation/advanced_configuration/
further_reading:
  - link: 'https://www.npmjs.com/package/@datadog/browser-rum'
    tag: NPM
    text: Package NPM datadog/browser-rum
  - link: /real_user_monitoring/rum_explorer
    tag: Documentation
    text: Explorer vos vues dans Datadog
  - link: /real_user_monitoring/rum_analytics
    tag: Documentation
    text: Générez des analyses à partir de vos événements
---
## Initialisation

Vous trouverez ci-dessous les différentes options de lancement disponibles avec le [kit de développement Browser Datadog][1].

### Nettoyer les données sensibles de vos données RUM
Si vos données RUM contiennent des informations confidentielles que vous souhaitez effacer, configurez le SDK Browser pour nettoyer les séquences sensibles en utilisant le rappel `beforeSend` au lancement de RUM.

Cette fonction de rappel vous permet d'accéder à tous les événements recueillis par le SDK RUM avant qu'ils ne soient envoyés à Datadog.

Vous pouvez par exemple censurer les adresses e-mail de vos URL d'applications Web :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    beforeSend: (event) => {
        // supprimer l'adresse e-mail de l'url de la vue
        event.view.url = event.view.url.replace(/email=[^&]*/, "email=CENSURÉ")
    },
    ...
});
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.init({
        ...,
        beforeSend: (event) => {
            // supprimer l'adresse e-mail de l'url de la vue
            event.view.url = event.view.url.replace(/email=[^&]*/, "email=CENSURÉ")
        },
        ...
    })
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        ...,
        beforeSend: (event) => {
            // supprimer l'adresse e-mail de l'url de la vue
            event.view.url = event.view.url.replace(/email=[^&]*/, "email=CENSURÉ")
        },
        ...
    });
```

{{% /tab %}}
{{< /tabs >}}

Vous pouvez modifier les propriétés d'événement suivantes :

|   Attribut           |   Type    |   Description                                                                                       |
|-----------------------|-----------|-----------------------------------------------------------------------------------------------------|
|   `view.url`            |   Chaîne  |   L'URL de la page Web active.                                                                   |
|   `view.referrer`       |   Chaîne  |   L'URL de la page Web précédente à partir de laquelle l'utilisateur a accédé à la page actuelle.  |
|   `action.target.name`  |   Chaîne  |   L'élément avec lequel l'utilisateur a interagi. Uniquement pour les actions recueillies automatiquement.              |
|   `error.message`       |   Chaîne  |   Un message d'une ligne lisible et concis décrivant l'erreur.                                 |
|   `error.stack `        |   Chaîne  |   La stack trace ou toutes informations complémentaires relatives à l'erreur.                                     |
|   `error.resource.url`  |   Chaîne  |   L'URL de la ressource qui a déclenché l'erreur.                                                        |
|   `resource.url`        |   Chaîne  |   L'URL de la ressource.                                                                                 |

**Remarque** : le SDK RUM ne tient pas compte des modifications apportées aux propriétés d'événement non répertoriées ci-dessus. Découvrez toutes les propriétés d'événement sur le [référentiel du SDK Browser][2]

### Identifier les sessions utilisateur
L'ajout des informations utilisateur à vos sessions RUM facilite :
* le suivi du parcours d'un utilisateur donné ;
* l'identification des utilisateurs les plus touchés par les erreurs ;
* la surveillance des performances de vos utilisateurs les plus importants.

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API Utilisateur dans l'interface RUM"  >}}

Les attributs suivants sont **facultatifs**, mais nous vous conseillons d'en renseigner **au moins un** :

| Attribut  | Type | Description                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| usr.id    | Chaîne | Identificateur d'utilisateur unique.                                                                                  |
| usr.name  | Chaîne | Nom courant de l'utilisateur, affiché par défaut dans l'interface RUM.                                                  |
| usr.email | Chaîne | Adresse e-mail de l'utilisateur, affichée dans l'interface RUM si le nom de l'utilisateur n'y est pas mentionné. Elle sert également à récupérer des Gravatars. |

Pour identifier les sessions utilisateur, utilisez l'API `setUser` :

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com'
})
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.setUser({
        id: '1234',
        name: 'John Doe',
        email: 'john@doe.com'
    })
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_RUM && window.DD_RUM.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com'
})
```

{{% /tab %}}
{{< /tabs >}}

### Échantillonnage

Par défaut, aucun échantillonnage n'est appliqué au nombre de sessions recueillies. Pour appliquer un échantillonnage relatif (en pourcentage), utilisez le paramètre `sampleRate` lors de l'initialisation de RUM. L'exemple suivant recueille seulement 90 % de toutes les sessions pour une application RUM donnée :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<ID_APPLICATION_DATADOG>',
    clientToken: '<TOKEN_CLIENT_DATADOG>',
    site: '<SITE_DATADOG>',
    sampleRate: 90,
});
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```html
<script>
 (function(h,o,u,n,d) {
   h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
   d=o.createElement(u);d.async=1;d.src=n
   n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
})(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum.js','DD_RUM')
  DD_RUM.onReady(function() {
    DD_RUM.init({
        clientToken: '<TOKEN_CLIENT>',
        applicationId: '<ID_APPLICATION>',
        site: '<SITE_DATADOG>',
        sampleRate: 90,
    })
  })
</script>
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<TOKEN_CLIENT>',
        applicationId: '<ID_APPLICATION>',
        site: '<SITE_DATADOG>',
        sampleRate: 90,
    });
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : lorsqu'une session est exclue en raison d'un échantillonnage, toutes les vues de page et la télémétrie associées à cette session ne sont pas recueillies.

## API disponible

### Ajouter un contexte global

Une fois la fonctionnalité Real User Monitoring (RUM) initialisée, ajoutez du contexte supplémentaire à l'ensemble des événements RUM recueillis depuis votre application avec l'API `addRumGlobalContext(key: string, value: any)` :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.addRumGlobalContext('<CLÉ_CONTEXTE>', <VALEUR_CONTEXTE>);

// Exemple de code
datadogRum.addRumGlobalContext('activity', {
    hasPaid: true,
    amount: 23.42
});
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.addRumGlobalContext('<CLÉ_CONTEXTE>', '<VALEUR_CONTEXTE>');
})

// Exemple de code
DD_RUM.onReady(function() {
    DD_RUM.addRumGlobalContext('activity', {
        hasPaid: true,
        amount: 23.42
    });
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_RUM && window.DD_RUM.addRumGlobalContext('<CLÉ_CONTEXTE>', '<VALEUR_CONTEXTE>');

// Exemple de code
window.DD_RUM && window.DD_RUM.addRumGlobalContext('activity', {
    hasPaid: true,
    amount: 23.42
});
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : respectez la [convention de nommage Datadog][3] pour améliorer la corrélation de vos données sur l'ensemble de la solution.

### Remplacer le contexte global

Une fois la fonctionnalité Real User Monitoring (RUM) initialisée, remplacez le contexte par défaut de tous vos événements RUM avec l'API `setRumGlobalContext(context: Context)` :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setRumGlobalContext({ '<CLÉ_CONTEXTE>': '<VALEUR_CONTEXTE>' });

// Exemple de code
datadogRum.setRumGlobalContext({
    codeVersion: 34,
});
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.setRumGlobalContext({ '<CLÉ_CONTEXTE>': '<VALEUR_CONTEXTE>' });
})

// Exemple de code
DD_RUM.onReady(function() {
    DD_RUM.setRumGlobalContext({
        codeVersion: 34,
    })
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_RUM &&
    DD_RUM.setRumGlobalContext({ '<CLÉ_CONTEXTE>': '<VALEUR_CONTEXTE>' });

// Exemple de code
window.DD_RUM &&
    DD_RUM.setRumGlobalContext({
        codeVersion: 34,
    });
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : respectez la [convention de nommage Datadog][3] pour améliorer la corrélation de vos données sur l'ensemble de la solution.

### Lire le contexte global

Une fois la fonctionnalité Real User Monitoring (RUM) initialisée, lisez le contexte global avec l'API `getRumGlobalContext()` :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

const context = datadogRum.getRumGlobalContext();
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
  var context = DD_RUM.getRumGlobalContext();
});
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
var context = window.DD_RUM && DD_RUM.getRumGlobalContext();
```

{{% /tab %}}
{{< /tabs >}}

### Actions utilisateur personnalisées

Une fois la fonctionnalité Real User Monitoring (RUM) initialisée, générez des actions utilisateur lorsque vous souhaitez surveiller des interactions spécifiques sur les pages de votre application ou mesurer des délais personnalisés avec l'API `addAction(name: string, context: Context)` :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.addAction('<NOM>', '<OBJET_JSON>');

// Exemple de code
datadogRum.addAction('checkout', {
    cart: {
        amount: 42,
        currency: '$',
        nb_items: 2,
        items: ['socks', 't-shirt'],
    },
});
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.addAction('<NOM>', '<OBJET_JSON>');
})

// Exemple de code
DD_RUM.onReady(function() {
    DD_RUM.addAction('checkout', {
        cart: {
            amount: 42,
            currency: '$',
            nb_items: 2,
            items: ['socks', 't-shirt'],
        },
    });
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_RUM && DD_RUM.addAction('<NOM>', '<OBJET_JSON>');

// Exemple de code
window.DD_RUM &&
    DD_RUM.addAction('checkout', {
        cart: {
            amount: 42,
            currency: '$',
            nb_items: 2,
            items: ['socks', 't-shirt'],
        },
    });
```

{{% /tab %}}
{{< /tabs >}}

Dans l'exemple ci-dessus, le SDK RUM recueille le nombre d'articles dans un panier, la nature de ces articles, ainsi que le montant total du panier.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/browser-sdk
[2]: https://github.com/DataDog/browser-sdk/blob/master/packages/rum/src/rumEvent.types.ts
[3]: /fr/logs/processing/attributes_naming_convention/#user-related-attributes
