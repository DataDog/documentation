---
aliases: null
description: Décrit les options de confidentialité disponibles pour la fonctionnalité
  Session Replay et la procédure à suivre pour les configurer
further_reading:
- link: /real_user_monitoring/session_replay
  tag: Documentation
  text: Session Replay
- link: https://www.datadoghq.com/blog/default-privacy-session-replay/
  tag: Blog
  text: Obfusquer les données utilisateur avec les paramètres de confidentialité par
    défaut de Session Replay
kind: documentation
title: Options de confidentialité de Session Replay
---

## Présentation

Les paramètres de confidentialité de la fonctionnalité Session Replay permettent aux organisations de toute taille de masquer les données personnelles ou sensibles. Les données sont stockées sur des instances cloud gérées par Datadog et sont chiffrées au repos.

Les options de confidentialité par défaut de Session Replay visent à protéger la vie privée des utilisateurs finaux et à empêcher la collecte de données sensibles sur les organisations.

Avec Session Replay, vous pouvez faire en sorte que les éléments sensibles soient automatiquement masqués lors de l'enregistrement par le SDK RUM Browser.

## Configuration

<div class="alert alert-warning"> Les options <code>defaultPrivacyLevel</code> et <code>mask-user-input</code> sont disponibles à partir de la version 3.6.0 du SDK.</div>

Pour activer les paramètres de confidentialité, définissez `defaultPrivacyLevel` sur `mask-user-input`, `mask` ou `allow` dans votre configuration JavaScript.

{{< code-block lang="javascript" filename="package.json" disable_copy="false" collapsible="true" >}}
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
    trackInteractions: true,
    defaultPrivacyLevel: 'mask-user-input' | 'mask' | 'allow' 
});

datadogRum.startSessionReplayRecording();
{{< /code-block >}}

Une fois votre configuration modifiée, vous pouvez contourner les paramètres de certains éléments de vos documents HTML à l'aide des options de confidentialité suivantes :

### Mode ask input mode

Cette option masque la plupart des champs de formulaire, notamment les saisies, les zones de texte et les valeurs des cases, tout en enregistrant tous les autres textes tels quels. Les saisies sont remplacées par trois astérisques (`***`), tandis que les zones de texte sont obfusquées par des caractères `x` qui préservent l'espacement. 

{{< img src="real_user_monitoring/session_replay/mask-user-input.png" alt="Mode mask user input" style="width:70%;">}}

**Remarque** : le paramètre `mask-user-input` est défini par défaut lors de l'activation de Session Replay.

### Mode mask

Cette option masque l'ensemble du texte HTML, des saisies utilisateur, des images et des liens. Le texte de votre application est remplacé par des `X`. Le résultat obtenu ressemble donc à une maquette fonctionnelle.

{{< img src="real_user_monitoring/session_replay/mask.png" alt="Mode mask" style="width:70%;">}}

### Mode allow

Cette option enregistre tous les éléments sans le moindre masque, à l'exception des éléments de saisie HTML, comme `password`, `email` et `tel`, et des éléments avec des attributs `autocomplete`, comme les numéros, les dates d'expiration et les codes de sécurité de cartes bancaires. 

{{< img src="real_user_monitoring/session_replay/allow.png" alt="Mode allow" style="width:70%;">}}

## Options de confidentialité

### Contourner un élément HTML

Vous pouvez définir un paramètre par défaut pour l'ensemble de votre application, puis taguer le niveau de confidentialité d'un élément HTML d'une des deux façons suivantes :

1. Avec un attribut HTML comme `data-dd-privacy="allow" | "mask" | "hidden" | "mask-user-input"`
2. Avec un nom de classe HTML comme `class="dd-privacy-allow" | "dd-privacy-mask-user-input" | "dd-privacy-mask" | "dd-privacy-hidden"`

L'exemple ci-dessous explique comment contourner le paramètre de certains éléments dans votre code HTML, de façon à personnaliser votre stratégie d'obfuscation :

```
<div class="line-item" data-dd-privacy="allow">
    <div class="label">Valeur de la commande</div>
    <div class="value">
        $<span data-dd-privacy="mask">50,00</span>
    </div>
</div>
```

Le montant en dollars du panier est alors remplacé par des astérisques.

{{< img src="real_user_monitoring/session_replay/example-mask.png" alt="Exemple de mode mask obfusquant un montant en dollars" style="width:70%;">}}

## Options de confidentialité avancées

### Masquer entièrement un élément

Le paramètre de confidentialité avancé `hidden` masque entièrement les éléments de votre choix, au lieu de dissimuler le texte associé.

Si vous cherchez à réduire le nombre d'éléments visibles dans les champs sensibles, activez le paramètre ‘hidden’ pour les éléments de votre choix. Ils seront alors remplacés par un bloc gris dans l'enregistrement.

Dans cet exemple de Replay Session, le nom d'utilisateur est obfusqué dans la navigation Datadog.

{{< img src="real_user_monitoring/session_replay/hidden.png" alt="Exemple de mode hidden obfusquant un nom d'utilisateur" style="width:60%;">}}

### Contourner le nom d'action

Pour dissimuler le nom d'action par défaut et modifier la convention de nommage d'actions individuelles, contournez le nom d'actions individuelles.

Vous pouvez renommer le nom d'action par défaut en remplaçant le nom d'un élément HTML spécifique par un nom moins précis. Par défaut, Datadog affiche le nouveau nom personnalisé.

Par exemple, vous pouvez remplacer le nom `<div data-dd-action-name="Address"` par `Action: “Click on Address”`.

Cette solution vous permet également de masquer des données sensibles dans le RUM Explorer et de simplifier vos analyses et recherches grâce à des conventions de nommage personnalisées.

<div class="alert alert-info">

Datadog s'efforce de proposer toujours plus d'options de confidentialité pour les solutions RUM et Session Replay. Si vous avez une idée de nouvelle fonctionnalité, <a href="/help">contactez l'assistance Datadog.</a>

</div>

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}