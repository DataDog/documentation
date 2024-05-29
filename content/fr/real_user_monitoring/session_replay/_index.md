---
aliases:
- /fr/real_user_monitoring/guide/session-replay-getting-started/
description: Apprenez à enregistrer et à revoir l'expérience de navigation de vos
  utilisateurs avec Session Replay.
further_reading:
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: Blog
  text: Utiliser la solution Session Replay de Datadog pour visualiser en temps réel
    les parcours utilisateur
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: Blog
  text: Utiliser l'analyse de l'entonnoir pour comprendre et optimiser vos flux utilisateur
    clés
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualiser vos données RUM dans l'Explorer
- link: /integrations/content_security_policy_logs
  tag: Documentation
  text: Détectez et agrégez les violations de CSP avec Datadog
kind: documentation
title: Session Replay
---

## Présentation

Session Replay vient renforcer vos capacités de surveillance de l'expérience utilisateur en vous permettant d'enregistrer et de revoir l'expérience de navigation de vos utilisateurs. Conjointement aux données de performance RUM, Session Replay facilite l'identification, la reproduction et la résolution des erreurs et vous fournit de précieuses données sur les tendances d'utilisation et les défauts de conception de votre application Web.

Le SDK Browser est [open source][1]. Il tire profit du projet open source [rrweb][2].

## Enregistreur Session Replay

L'enregistreur Session Replay fait partie du SDK RUM Browser. L'enregistreur effectue un snapshot du DOM et du CSS en suivant et en enregistrant les événements qui ont lieu sur la page Web (par exemple, modification du DOM, déplacement de la souris, clics et événements de saisie) tout en prenant note de leur timestamp.

Datadog recrée ensuite la page Web et réapplique les événements enregistrés au moment adéquat dans le replay. Session Replay respecte la même politique de rétention de 30 jours que les sessions RUM standard.

L'enregistreur Session Replay prend en charge tous les navigateurs compatibles avec le SDK RUM Browser, à l'exception d'IE 11. Consultez le [tableau de compatibilité des navigateurs][3] (en anglais) pour en savoir plus.

Pour  réduire l'incidence réseau de Session Replay et minimiser l'incidence de l'enregistreur Session Replay sur les performances de l'application, Datadog compresse les données avant de les envoyer. Datadog réduit également la charge du thread de l'interface du navigateur en déléguant la plupart des tâches gourmandes en CPU (comme la compression) à un worker Web dédié. Cette solution devrait utiliser moins de 100 Ko/min de bande passante réseau.

## Implémentation

Session Replay est disponible dans le SDK RUM Browser. Pour commencer à recueillir des données pour Session Replay, configurez la [surveillance Browser avec RUM de Datadog][4] en créant une application RUM, en générant un token client et en initialisant le SDK RUM Browser. Pour configurer cette fonctionnalité dans les environnements mobiles, consultez la section [Session Replay sur mobile][5].

<div class="alert alert-info">Vous devez utiliser la dernière version du SDK (v3.6.0 ou version ultérieure)</div>

## Utilisation

Depuis la version 5.0.0 du SDK Browser RUM, l'enregistrement Session Replay commence automatiquement après que `init()` a été appelé. Pour démarrer un enregistrement lorsque certaines conditions sont respectées, utilisez le paramètre d'initialisation `startSessionReplayRecordingManually` et appelez `startSessionReplayRecording()`.

Par exemple, pour enregistrer uniquement les sessions utilisateur authentifiées, utilisez ce qui suit :

```javascript
window.DD_RUM.init({
  applicationId: '<ID_APPLICATION_DATADOG>',
  clientToken: '<TOKEN_CLIENT_DATADOG>',
  site: '<SITE_DATADOG>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100,
  startSessionReplayRecordingManually: true,
  ...
});

if (user.isAuthenticated) {
    window.DD_RUM.startSessionReplayRecording();
}
```

Pour arrêter l'enregistrement Session Replay, appelez `stopSessionReplayRecording()`.

<div class="alert alert-warning">Pour les versions du SDK Browser RUM antérieures à la v5.0.0, l'enregistrement Session Replay ne commence pas automatiquement. Appelez `startSessionReplayRecording()` pour débuter l'enregistrement.</div>

## Désactiver Session Replay

Pour arrêter les enregistrements de session, définissez `sessionReplaySampleRate` sur `0`. Cela met fin à la collecte de données pour les [solutions Browser RUM et Session Replay][6].

## Rétention

Par défaut, les données Session Replay sont conservées pendant 30 jours.

Pour prolonger la durée de rétention jusqu'à 15 mois, vous pouvez activer l'option _Extended Retention_ (rétention prolongée) sur des Sessions Replays spécifiques. Ces sessions doivent être inactives (l'utilisateur a terminé son expérience).

La rétention prolongée s'applique uniquement à Session Replay et n'inclut pas les événements associés. Les 15 mois commencent à l'activation de la rétention prolongée, et non à la collecte de la session.

Vous pouvez désactiver la rétention prolongée à tout moment. Si l'enregistrement Session Replay a été recueilli il y a moins de 30 jours, il expire à la fin de la fenêtre initiale de 30 jours. Si vous désactivez la rétention prolongée sur un enregistrement Session Replay de plus de 30 jours, celui-ci expire immédiatement.

{{< img src="real_user_monitoring/session_replay/session-replay-extended-retention.png" alt="Activer la rétention prolongée" style="width:100%;" >}}

Le diagramme ci-dessous décrit les données qui sont conservées pendant une durée prolongée.

{{< img src="real_user_monitoring/session_replay/replay-extended-retention.png" alt="Diagramme des données conservées pendant une durée prolongée" style="width:100%;" >}}



## Session Replay sur mobile

Consultez la section [Session Replay sur mobile][5] pour en savoir plus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk
[2]: https://www.rrweb.io/
[3]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[4]: /fr/real_user_monitoring/session_replay/
[5]: /fr/real_user_monitoring/session_replay/mobile/
[6]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay