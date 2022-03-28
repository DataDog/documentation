---
title: "Premiers pas avec Session\_Replay"
kind: guide
description: "Guide pour l'activation de Session\_Replay et la configuration des options de confidentialité"
further_reading:
  - link: /real_user_monitoring/explorer
    tag: Documentation
    text: Visualiser vos données RUM dans l'Explorer
  - link: https://www.datadoghq.com/blog/session-replay-datadog/
    tag: Blog
    text: Utiliser la solution Session Replay de Datadog pour visualiser en temps réel les parcours utilisateur
---
<div class="alert alert-info"><p>Session Replay est disponible en version bêta ouverte. Durant cette période, les replays n'entraînent aucun coût supplémentaire. Si vous avez la moindre question, contactez-nous à l'adresse <a href="mailto:support@datadoghq.com">support@datadoghq.com</a>.</p><p>Session Replay est disponible sur les <a href="/getting_started/site/">sites US1 et EU Datadog</a>.</p>
</div>

## En quoi consiste la solution Session Replay ?

Session Replay vient renforcer vos capacités de surveillance de l'expérience utilisateur. Cette solution vous permet d'enregistrer et de revoir l'expérience de navigation de vos utilisateurs.

Conjointement aux données de performance RUM, Session Replay facilite l'identification, la reproduction et la résolution des erreurs et vous fournit de précieuses données sur les tendances d'utilisation et les défauts de conception de votre application Web.

## Recueillir des données Session Replay

### Configuration initiale

Pour utiliser Session Replay, configurez la [surveillance Browser RUM Datadog][1]. Suivez les instructions liées à la création de l'application, à la génération du token client et la configuration du SDK RUM.

Session Replay est disponible via un build dédié du SDK Browser RUM. Pour activer Session Replay, modifiez le nom du package npm ou l'URL du CDN, selon la méthode d'installation que vous avez choisie :

#### npm

Remplacez le `@datadog/browser-rum package` par la version 3.0.2 (ou une version ultérieure) de [`@datadog/browser-rum`][2]. Pour commencer l'enregistrement, appelez `datadogRum.startSessionReplayRecording()`.

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<ID_APPLICATION_DATADOG>',
    clientToken: '<TOKEN_CLIENT_DATADOG>',
    site: '<SITE_DATADOG>',
    //  service: 'my-web-application',
    //  env: 'production',
    //  version: '1.0.0',
    sampleRate: 100,
    replaySampleRate: 100,
    trackInteractions: true
});

datadogRum.startSessionReplayRecording();
```

#### CDN

Remplacez l'URL du SDK Browser `https://www.datadoghq-browser-agent.com/datadog-rum.js` par `https://www.datadoghq-browser-agent.com/datadog-rum-v4.js`. Pour que l'enregistrement Session Replay commence, vous devez non seulement appeler `DD_RUM.init()`, mais également `DD_RUM.startSessionReplayRecording()`.

*Navigateurs pris en charge* : l'enregistreur Session Replay prend en charge tous les navigateurs compatibles avec le SDK Browser RUM, à l'exception d'IE11. Consultez le [tableau de compatibilité des navigateurs][3] (en anglais).

#### Configuration

Les [paramètres d'initialisation de RUM][4] standard sont tous pris en charge.

L'enregistrement Session Replay ne commence pas automatiquement après que `init()` a été appelé. Pour le lancer, appelez `startSessionReplayRecording()`. Cela vous permet de démarrer un enregistrement lorsque certaines conditions sont respectées. Par exemple, pour enregistrer uniquement les sessions d'utilisateurs authentifiés :

```javascript
if (user.isAuthenticated) {
    DD_RUM.startSessionReplayRecording();
}
```

Pour arrêter un enregistrement Session Replay, appelez `stopSessionReplayRecording()`.

### Obfuscation des données sensibles et personnelles

<div class="alert alert-info">
La fonctionnalité de confidentialité par défaut modifie la façon dont le SDK gère la confidentialité.
</div>

Par défaut, le SDK empêche l'enregistrement des données sensibles des organisations et utilisateurs finaux, en masquant automatiquement les champs des formulaires, notamment pour les saisies de mot de passe et les zones de texte.

Vous pouvez configurer le mode de confidentialité par défaut dans votre configuration JavaScript et ajouter des tags à certaines parties de vos documents HTML pour indiquer des contournements explicites.

- Quatre niveaux de confidentialité sont proposés : `allow`, `mask-user-input`, `mask` et `hidden`.
- L'élément HTML à la racine hérite du niveau de confidentialité de la propriété `defaultPrivacyLevel` de la configuration JavaScript. Par défaut, celle-ci a pour valeur `mask-user-input` : `{defaultPrivacyLevel: 'mask-user-input'}`.
- Chaque élément HTML hérite du niveau de confidentialité de son parent, sauf pour la valeur `hidden`, qui ne peut pas être contournée.

Avec ces règles d'héritage, vous pouvez ajouter le niveau de confidentialité d'un élément HTML en tant que tag, à l'aide de l'une des deux méthodes suivantes :

1. Avec un attribut HTML comme `data-dd-privacy="allow" | "mask" | "hidden" | "mask-user-input"`
2. Avec un nom de classe HTML comme `class="dd-privacy-allow" | "dd-privacy-mask-user-input" | "dd-privacy-mask" | "dd-privacy-hidden"`

#### Niveaux de confidentialité

-   `allow` : enregistre toutes les valeurs non masquées, à l'exception des éléments de saisie HTML comme `password`, `email` et `tel`, et des éléments avec des attributs `autocomplete`.
-   `mask-user-input` : masque la plupart des champs de formulaire, notamment les saisies, les zones de texte et les valeurs des cases, tout en enregistrant tels quels tous les autres textes. Les saisies sont remplacées par trois astérisques (`***`), tandis que les zones de texte sont obfusquées par des caractères `x` qui préservent l'espacement.
-   `mask` : masque tous les textes HTML, toutes les saisies des utilisateurs, toutes les images et tous les liens.
-   `hidden` : annule complètement l'enregistrement des éléments. Par défaut, la valeur `hidden` ne peut pas être contournée par un nœud enfant.

Lorsque vous ajoutez des tags à votre application, commencez par appliquer le tag `mask` en haut de votre document HTML. Demandez ensuite à votre équipe de déterminer les pages, fonctionnalités ou composants qui ne doivent pas être masqués (avec le tag `allow`).

#### Exemple

Les valeurs des saisies du formulaire suivant sont remplacées par trois astérisques (`***`).

```html
<form method="post" data-dd-privacy="mask-user-input">
    <input type="text" name="name" id="name" required />
    <input type="number" name="age" id="age" required />
    <input type="email" name="email" id="email" required />
    <input type="submit" value="submit" />
</form>
```

En outre, les éléments HTML avec la valeur `hidden` ne sont pas du tout enregistrés :

```html
<div id="profile-info" data-dd-privacy="hidden">
    <p>Name: John Doe</p>
    <p>Birth date: June 6th, 1987</p>
</div>
```

Ces éléments sont remplacés par un bloc gris au moment de l'enregistrement. Dans cet exemple de Replay Session, la navigation dans Datadog est obfusquée :

{{< img src="real_user_monitoring/guide/replay-hidden.png" alt="Exemple de replay masqué">}}

## Dépannage

### Des éléments HTML ne sont pas visibles au moment du replay

Session Replay ne prend actuellement pas en charge les éléments `iframe`, `video`, `audio` et `canvas`, ainsi que les composants Web.

### Les polices ou images ne s'affichent pas correctement

Un replay n'est pas une vidéo : il s'agit plutôt de la reconstruction d'un iframe basé sur des snapshots du DOM. Il est donc basé sur les différentes ressources de la page, à savoir les polices et les images.

Les ressources peuvent ne pas être disponibles au moment du replay. Cela peut s'expliquer par plusieurs raisons :

1. La ressource n'existe plus : par exemple, elle faisait partie d'un ancien déploiement.
2. La ressource n'est plus accessible : par exemple, une authentification est requise, ou la ressource est uniquement accessible depuis un réseau interne.
3. La ressource est bloquée par le navigateur en raison du mécanisme CORS (généralement les polices Web).
   - Le replay affiché sur le domaine `app.datadoghq.com` et les demandes de ressource font l'objet de checks de sécurité interorigines exécutés par votre navigateur. Si la ressource en question n'est pas autorisée pour le domaine, votre navigateur bloque la requête.
   - Autorisez `app.datadoghq.com` via l'en-tête [`Access-Control-Allow-Origin`][5] pour toutes les ressources de police ou d'image dont dépend votre site Web. Ainsi, ces ressources seront disponibles pour le replay.
   - Pour en savoir plus, consultez la page [Cross Origin Resource Sharing (CORS)][6].

### Les règles CSS ne s'appliquent pas correctement ou le curseur de la souris ne s'affiche pas

Les règles CSS ne sont pas gérées comme les polices et images. En effet, l'enregistreur essaie de rassembler les différentes règles CSS appliquées au sein des données d'enregistrement, en tirant profit de l'interface [CSSStyleSheet][7]. Si ce n'est pas possible, il se contente d'enregistrer les liens dans les fichiers CSS.

**Remarque** : pour pouvoir représenter de façon adéquate le curseur de la souris, les règles CSS doivent être accessibles via l'interface CSSStyleSheet.

Si les feuilles de style sont hébergées sur un autre domaine que celui de la page Web, l'accès aux règles CSS fait l'objet de checks de sécurité interorigines exécutés par le navigateur, et vous devez indiquer à ce dernier de charger la feuille de style utilisant le mécanisme CORS à l'aide de l'attribut [crossorigin][8].

Par exemple, si votre application se trouve sur le domaine `example.com` et qu'elle dépend d'un fichier CSS sur `assets.example.com` via un élément de lien, l'attribut `crossorigin` doit être défini sur `anonymous`, sauf si une identification est requise :

```html
<link rel="stylesheet" crossorigin="anonymous"
      href="https://assets.example.com/style.css”>
```

De plus, vous devez autoriser le domaine `example.com` dans `assets.example.com`. Cela permet de définir l'en-tête [`Access-Control-Allow-Origin`][5] afin que le fichier des ressources puisse charger les ressources.

## Questions fréquentes

### Comment la solution Session Replay fonctionne-t-elle ?

L'enregistreur Session Replay, qui fait partie du SDK Browser RUM, effectue un snapshot du DOM et du CSS. Il suit et enregistre ensuite les événements qui ont lieu sur la page Web (modification du DOM, déplacement de la souris, clics, événements de saisie, etc.) tout en prenant note de leur timestamp.

Dans le replay Datadog, nous recréons la page et réappliquons les événements enregistrés selon la timeline.

Le SDK Browser est [open source][9]. Il tire profit du projet open source [rrweb][10].

### Quelle est l'incidence de Session Replay sur les performances ?

Pour minimiser l'incidence de l'enregistreur Session Replay sur les performances de l'application, Datadog s'efforce de :

-   réduire l'incidence réseau de Session Replay en compressant les données avant leur envoi à Datadog ;
-   réduire la charge du thread de l'interface du navigateur, en déléguant la plupart des tâches gourmandes en CPU (comme la compression) à un worker de service en arrière-plan.

Cette solution devrait utiliser moins de 100 Ko/min de bande passante réseau. Ces estimations pourront être améliorées après que les premiers utilisateurs auront transmis davantage de données.

### Quelle est la durée de disponibilité des replays de Session Replay ?

Session Replay respecte la même politique de rétention que les sessions RUM standard. Les replays sont donc disponibles pendant 30 jours.

[1]: /fr/real_user_monitoring/browser/#setup
[2]: https://www.npmjs.com/package/@datadog/browser-rum
[3]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[4]: /fr/real_user_monitoring/browser/#initialization-parameters
[5]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
[6]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[7]: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
[8]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
[9]: https://github.com/DataDog/browser-sdk
[10]: https://www.rrweb.io/
