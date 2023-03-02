---
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-ios/blob/master/docs/rum_collection/web_view_tracking.md
description: Surveillez des vues Web dans vos applications iOS hybrides.
further_reading:
- link: /real_user_monitoring/ios/
  tag: Documentation
  text: Surveillance iOS
- link: /real_user_monitoring/browser/
  tag: Documentation
  text: Surveillance Browser
kind: documentation
title: Suivi des vues Web iOS
---
## Présentation

Grâce à la solution Real User Monitoring, vous pouvez surveiller des vues Web et bénéficier d'une visibilité complète sur vos applications iOS et tvOS hybrides.

Cette fonctionnalité vous permet d'accomplir ce qui suit :

- Surveiller des parcours utilisateur dans les composants Web et natifs de vos applications mobiles
- Identifier les pages Web ou composants natifs à l'origine des problèmes de latence de vos applications mobiles
- Venir en aide aux utilisateurs qui ne parviennent pas à charger des pages Web sur leur appareil mobile

## Configuration

### Prérequis

Commencez par configurer le SDK Browser pour la page Web à afficher sur votre application mobile iOS et tvOS. Pour en savoir plus, consultez la section [Surveillance Browser RUM][1].

### Instrumenter vos vues Web

Le SDK iOS RUM comprend des API vous permettant de configurer le suivi des vues Web. Pour ajouter une fonctionnalité de suivi des vues Web, déclarez ce qui suit en tant qu'extension de `WKUserContentController`.

`trackDatadogEvents(in hosts: Set<String>)`
: Active le suivi des événements RUM dans une vue Web pour des `hosts` spécifiques.

`stopTrackingDatadogEvents()`
: Désactive le suivi des événements RUM dans une vue Web. Lorsque l'allocation d'une vue est sur le point d'expirer, ou lorsque vous n'avez plus besoin de la vue, appelez cette API.

Par exemple :

```
import WebKit
import Datadog

webView.configuration.userContentController.trackDatadogEvents(in: ["example.com"])
```

## Accéder à vos vues Web

Vos vues Web sont affichées sous la forme d'événements et de vues dans le [RUM Explorer][4]. Appliquez un filtre en fonction de vos applications iOS et tvOS, puis cliquez sur une session. Un volet latéral comportant la liste des événements s'affiche alors.

{{< img src="real_user_monitoring/ios/ios-webview-tracking.png" alt="Événements de vues Web enregistrés lors d'une session dans le RUM Explorer" style="width:100%;">}}

Cliquez sur **Open View waterfall** dans l'onglet **Performance** pour passer d'une session à une visualisation en cascade des ressources.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/real_user_monitoring/browser/#npm
[2]: https://github.com/DataDog/dd-sdk-ios/releases/tag/1.10.0-beta1
[3]: https://docs.datadoghq.com/fr/real_user_monitoring/ios/
[4]: https://app.datadoghq.com/rum/explorer