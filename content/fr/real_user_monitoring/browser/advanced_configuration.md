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

### Échantillonnage

Par défaut, aucun échantillonnage n'est appliqué sur le nombre de sessions recueillies. Pour appliquer un échantillonnage relatif (en pourcentage) au nombre de sessions recueillies, utilisez le paramètre `sampleRate` lors du lancement de RUM. L'exemple suivant recueille seulement 90 % de toutes les sessions pour une application RUM donnée :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<ID_APPLICATION_DATADOG>',
    clientToken: '<TOKEN_CLIENT_DATADOG>',
    datacenter: Datacenter.US,
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
{{% tab "CDN asynchrone" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<TOKEN_CLIENT>',
        applicationId: '<ID_APPLICATION>',
        sampleRate: 90,
    });
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : lorsqu'une session n'est pas transmise en raison d'un échantillonnage, toutes les vues de page et la télémétrie associées à cette session ne sont pas recueillies.

## API disponible

### Ajouter un contexte global

Une fois le Real User Monitoring (RUM) lancé, ajoutez des données de contexte supplémentaires à l'ensemble des événements RUM recueillis depuis de votre application avec l'API `addRumGlobalContext(key: string, value: any)` :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.addRumGlobalContext('<CLÉ_CONTEXTE>', <VALEUR_CONTEXTE>);

// Exemple de code
datadogRum.addRumGlobalContext('usr', {
    id: 123,
    plan: 'premium'
});
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.addRumGlobalContext('<CLÉ_CONTEXTE>', <VALEUR_CONTEXTE>);
})

// Exemple de code
DD_RUM.onReady(function() {
    DD_RUM.addRumGlobalContext('usr', {
        id: 123,
        plan: 'premium'
    });
})
```
{{% /tab %}}
{{% tab "CDN asynchrone" %}}

```javascript
window.DD_RUM && window.DD_RUM.addRumGlobalContext('<CLÉ_CONTEXTE>', <VALEUR_CONTEXTE>);

// Exemple de code
window.DD_RUM && window.DD_RUM.addRumGlobalContext('usr', {
    id: 123,
    plan: 'premium'
});
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : respectez la [convention de nommage Datadog][2] pour améliorer la corrélation de vos données sur l'ensemble de la solution.

### Remplacer le contexte global

Une fois le Real User Monitoring (RUM) lancé, remplacez le contexte par défaut de tous vos événements RUM avec l'API `setRumGlobalContext(context: Context)` :

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
{{% tab "CDN asynchrone" %}}

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

**Remarque** : respectez la [convention de nommage Datadog][2] pour améliorer la corrélation de vos données sur l'ensemble de la solution.

### Lire le contexte global

Une fois le Real User Monitoring (RUM) lancé, lisez le contexte global avec l'API `getRumGlobalContext()` :

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

Une fois le Real User Monitoring (RUM) lancé, générez des actions utilisateur lorsque vous souhaitez surveiller des interactions spécifiques sur les pages de votre application ou mesurer des délais personnalisés avec l'API `addUserAction(name: string, context: Context)` :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.addUserAction('<NOM>', '<OBJET_JSON>');

// Exemple de code
datadogRum.addUserAction('checkout', {
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
    DD_RUM.addUserAction('<NOM>', '<OBJET_JSON>');
})

// Code example
DD_RUM.onReady(function() {
    DD_RUM.addUserAction('checkout', {
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
window.DD_RUM && DD_RUM.addUserAction('<NOM>', '<OBJET_JSON>');

// Exemple de code
window.DD_RUM &&
    DD_RUM.addUserAction('checkout', {
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


### Erreurs personnalisées
Surveillez les exceptions gérées, les objets Promise rejetés et les autres erreurs non suivies automatiquement par le SDK RUM avec l'API `addError()` :

```javascript
addError(
    error: unknown,
    context?: Context,
    source: ErrorSource.CUSTOM | ErrorSource.NETWORK | ErrorSource.SOURCE = ErrorSource.CUSTOM
);
```

**Remarque** : la fonctionnalité [Suivi des erreurs][3] traite les erreurs envoyées avec la source définie sur `custom` ou `source` et qui contiennent une stack trace.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

// Envoyer un erreur personnalisée avec contexte
const error = new Error('Something wrong occured.');

datadogRum.addError(error, {
    pageStatus: 'beta',
});

// Envoyer une erreur réseau
fetch('<UNE_URL>').catch(function(error) {
    datadogRum.addError(error, undefined, 'network');
})

// Envoyer une erreur d'exception gérée
try {
    // Logique de code
} catch (error) {
    datadogRum.addError(error, undefined, 'source');
}
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
// Envoyer une erreur personnalisée avec contexte
const error = new Error('Something wrong occured.');

DD_RUM.onReady(function() {
    DD_RUM.addError(error, {
        pageStatus: 'beta',
    });
});

// Envoyer une erreur réseau
fetch('<UNE_URL>').catch(function(error) {
    DD_RUM.onReady(function() {
        DD_RUM.addError(error, undefined, 'network');
    });
})

// Envoyer une erreur d'exception gérée
try {
    // Logique de code
} catch (error) {
    DD_RUM.onReady(function() {
        DD_RUM.addError(error, undefined, 'source');
    })
}
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
// Envoyer une erreur personnalisée avec contexte
const error = new Error('Something wrong occured.');

window.DD_RUM && DD_RUM.addError(error, {
    pageStatus: 'beta',
});

// Envoyer une erreur réseau
fetch('<URL_QUELCONQUE>').catch(function(error) {
    window.DD_RUM && DD_RUM.addError(error, undefined, 'network');
})

// Envoyer une erreur d'exception gérée
try {
    // Logique de code
} catch (error) {
    window.DD_RUM && DD_RUM.addError(error, undefined, 'source');
}
```

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk
[2]: /fr/logs/processing/attributes_naming_convention/#user-related-attributes
[3]: /fr/real_user_monitoring/error_tracking