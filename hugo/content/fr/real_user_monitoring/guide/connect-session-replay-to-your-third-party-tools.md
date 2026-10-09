---
description: Intégrez Session Replay à des outils tiers d'expérience client et d'analyse
  en accédant aux URL de relecture depuis le navigateur.
further_reading:
- link: /session_replay/
  tag: Documentation
  text: En savoir plus sur Session Replay
title: Connectez Session Replay à vos outils tiers.
---
## Présentation {#overview}

Session Replay fournit des informations visuelles pour compléter les données d'analyse utilisateur. Si vous utilisez des outils tiers pour l'expérience client, l'analyse de site web, et plus encore, vous pouvez les connecter à Session Replay. Ce guide vous explique comment accéder à l'URL de Session Replay à utiliser dans les intégrations, en direct depuis le navigateur où la session a lieu. 

## Cas d'utilisation {#use-cases}

Vous souhaiterez peut-être connecter un outil tiers à Session Replay pour une vue plus complète des indicateurs d'expérience utilisateur tels que les suivants :

- Résultats du sondage de formulaire
- Outils d'expérience client
- Analyse de données

## Obtenez le lien Session Replay {#get-the-session-replay-link}

Pour récupérer l'URL de l'enregistrement de la session utilisateur actuelle, utilisez l'extrait suivant, selon la méthode d'installation que vous avez utilisée pour configurer RUM :

**Remarque** : Fournir une valeur pour `subdomain` lors de la récupération de l'URL d'enregistrement de la session utilisateur est facultatif, mais doit être fournie si vous accédez à Datadog via un sous-domaine personnalisé et que vous souhaitez voir le domaine personnalisé dans l'URL renvoyée.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    // optional, only needed if using a custom domain name
    subdomain: ''
    ...
});

const url = datadogRum.getSessionReplayLink();
```

{{% /tab %}}

{{% tab "CDN asynchrone" %}}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        // optional, only needed if using a custom domain name
        subdomain: ''
        ...
    })
    const url = DD_RUM.getSessionReplayLink();
})

```

{{% /tab %}}

{{% tab "CDN synchrone" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        ...,
         // optional, only needed if using a custom domain name
        subdomain: ''
        ...
    });
const url = DD_RUM && DD_RUM.getSessionReplayLink();
```

{{% /tab %}}

{{< /tabs >}}

## Envoyez le lien vers un outil tiers {#send-link-to-a-third-party-tool}

Une fois que vous avez récupéré le lien via l'extrait ci-dessus, vous disposez de plusieurs façons de transmettre les données, selon les options offertes par votre outil tiers :

- En tant que champ de formulaire masqué.
- En tant que champ JSON.
- Via un paramètre d'URL.
- Directement dans votre intégration de choix en JavaScript.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}