---
title: Configuration avancée du RUM
kind: documentation
further_reading:
  - link: 'https://www.npmjs.com/package/@datadog/browser-rum'
    tag: NPM
    text: Paquet NPM datadog/browser-rum
  - link: /real_user_monitoring/rum_explorer
    tag: Documentation
    text: Explorez vos vues dans Datadog
  - link: /real_user_monitoring/rum_analytics
    tag: Documentation
    text: Générez des analyses à partir de vos événements
---
## Lancement

Vous trouverez ci-dessous les différentes options de lancement disponibles avec le [kit de développement Browser Datadog][1].

### Échantillonnage

Par défaut, aucun échantillonnage n'est appliqué sur le nombre de sessions recueillies. Pour appliquer un échantillonnage relatif (en pourcentage) au nombre de sessions recueillies, utilisez le paramètre `sampleRate` lors du lancement de RUM. L'exemple suivant recueille seulement 90 % de toutes les sessions pour une application RUM donnée :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<ID_APPLICATION_DATADOG>',
    clientToken: '<TOKEN_CLIENT_DATADOG>',
    datacenter: 'us',
    sampleRate: 90,
});
```

{{% /tab %}}
{{% tab "Bundle" %}}

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
{{% tab "Bundle" %}}

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
{{% tab "Bundle" %}}

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

### Actions utilisateur personnalisées

Une fois le Real User Monitoring (RUM) lancé, générez des actions utilisateur lorsque vous souhaitez surveiller des interactions spécifiques sur les pages de votre application ou mesurer des délais personnalisés avec l'API `addAction(name: string, context: Context)` :

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
{{% tab "Bundle" %}}

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
[2]: /fr/logs/processing/attributes_naming_convention/#user-related-attributes
