---
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Real User Monitoring
- link: /real_user_monitoring/faq/content_security_policy/
  tag: Documentation
  text: Stratégie de sécurité de contenu
title: Dépannage
---

Si la fonctionnalité RUM Browser de Datadog se comporte de manière inattendue, consultez ce guide pour découvrir rapidement des solutions. Si votre problème persiste, contactez l'[assistance Datadog][1] pour obtenir de l'aide. Assurez-vous de mettre régulièrement à jour le [SDK RUM Browser][2], car chaque version contient des améliorations et des correctifs.

## Données manquantes

Si vous ne voyez aucune donnée RUM ou si des données sont manquantes pour certains utilisateurs :

| Causes courantes                                                                                               | Correctif conseillé                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Les bloqueurs de publicités empêchent le téléchargement du SDK RUM Browser ou empêchent ce dernier d'envoyer les données à Datadog.     | Certains bloqueurs de publicités limitent également le chargement des outils de suivi des performances et marketing. Consultez la documentation pour [installer le SDK RUM Browser avec npm][3] et [transférer les données recueillies par l'intermédiaire d'un proxy][4]. |
| Les règles réseau ou les VPN empêchent le téléchargement du SDK RUM Browser ou empêchent ce dernier d'envoyer les données à Datadog. | Accordez l'accès aux endpoints requis pour le téléchargement du SDK RUM Browser ou l'envoi des données. La liste des endpoints est disponible dans la [documentation relative à la stratégie de sécurité de contenu][5].                                        |
| Les scripts, packages et clients initialisés avant le SDK RUM Browser peuvent entraînent la perte de logs, ressources et actions utilisateur. Par exemple, si vous initialisez ApolloClient avant le SDK RUM Browser, il est possible que les requêtes `graphql` ne soient pas enregistrées en tant que ressources XHR dans le RUM Explorer. | Vérifiez à quel moment le SDK RUM Browser est initialisé et, si besoin, déplacez-le à une étape antérieure à l'exécution du code de votre application.                                             |

Consultez les [directives relatives à la stratégie de sécurité de contenu][6] et assurez-vous que votre site Web accorde l'accès au CDN du SDK RUM Browser et à l'endpoint d'admission.

### Initialisation du SDK RUM Browser

Vérifiez si le SDK RUM Browser est initialisé en exécutant la commande `window.DD_RUM.getInternalContext()` dans la console de votre navigateur. Assurez-vous également que les éléments `application_id` et `session_id`, ainsi que l'objet de la vue, sont bien renvoyés :

{{< img src="real_user_monitoring/browser/troubleshooting/success_rum_internal_context.png" alt="Commande getInternalContext réussie">}}

Si le SDK RUM Browser n'est pas installé, ou s'il n'a pas été correctement initialisé, l'erreur `ReferenceError: DD_RUM is not defined` peut s'afficher :

{{< img src="real_user_monitoring/browser/troubleshooting/error_rum_internal_context.png" alt="Erreur de la commande getInternalContext">}}

Vous pouvez également consulter la console d'outils de développement de votre navigateur ou l'onglet Network si vous remarquez des erreurs liées au chargement du SDK RUM Browser.

**Remarque** : pour garantir l'exactitude des résultats, définissez `sessionSampleRate` sur 100. Pour en savoir plus, consultez la section [Mettre à jour votre configuration pour Browser RUM et l'échantillonnage de Browser RUM et Session Replay][8].

### Données vers l'endpoint d'admission Datadog

Le SDK RUM Browser envoie régulièrement des lots de données à l'endpoint d'admission Datadog. Si des données sont envoyées, vous devriez voir des requêtes réseau ciblant `/v1/input` (la partie relative à l'origine de l'URL peut être différente selon votre configuration RUM) dans la section Réseau des outils de développement de votre navigateur :

{{< img src="real_user_monitoring/browser/troubleshooting/network_intake.png" alt="Requêtes RUM vers l'endpoint d'admission Datadog">}}

## Cookies RUM

Le SDK RUM Browser utilise des cookies pour stocker des informations de session et suivre une [session utilisateur][6] sur différentes pages. Les cookies sont internes (c'est-à-dire qu'ils sont définis sur votre domaine) et ne sont pas utilisés pour le suivi intersite. Voici les cookies définis par le SDK RUM Browser :

| Nom du cookie        | Détails                                                                                                                                                                                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_dd_s`             | Cookie utilisé pour regrouper tous les événements générés à partir d'une session utilisateur unique sur plusieurs pages. Il indique l'ID de session en cours, si la session est exclue en raison d'un échantillonnage, et la date d'expiration de la session. Le cookie est prolongé 15 minutes de plus à chaque interaction de l'utilisateur avec le site Web, jusqu'à la durée maximale de session utilisateur (4 heures).|
| `dd_site_test_*`   | Cookie temporaire utilisé pour tester la prise en charge des cookies. Expire instantanément.                                                                                                                                                                                                                                     |
| `dd_cookie_test_*` | Cookie temporaire utilisé pour tester la prise en charge des cookies. Expire instantanément.                                                                                                                                                                                                                                     |

**Remarque** : les cookies `_dd_l`, `_dd_r` et `_dd` ont été remplacés par le cookie `_dd_s` dans les dernières versions du SDK RUM Browser.

## Limites techniques

Chaque événement envoyé par le SDK RUM Browser comporte les éléments suivants :

- Le contexte RUM global
- Le contexte de l'événement (le cas échéant)
- Les attributs propres à l'événement

Exemple :

```javascript
window.DD_RUM && window.DD_RUM.addRumGlobalContext('global', {'foo': 'bar'})
window.DD_RUM && window.DD_RUM.addAction('hello', {'action': 'qux'})
```

Cet exemple de code crée l'événement d'action suivant :

```json
{
  "type": "action",
  "context": {
    "global": {
      "foo": "bar"
    },
    "action": "qux"
  },
  "action": {
    "id": "xxx",
    "target": {
      "name": "hello"
    },
    "type": "custom"
  },
  ...
}
```

Si un événement ou une requête dépasse l'une des limites ci-dessous, il est rejeté par l'admission Datadog.

| Propriété                                 | Limite   |
| ---------------------------------------- | ------------ |
| Nombre maximum d'attributs par événement   | 256          |
| Profondeur maximale des attributs par événement        | 20           |
| Taille maximale des événements                       | 256 Ko       |
| Taille maximale de la charge utile d'admission              | 5 Mo         |

## Avertissement relatif au blocage de la lecture interorigines

Sur les navigateurs basés sur Chromium, lorsque le SDK RUM Browser envoie des données à l'admission Datadog, un avertissement relatif au blocage de la lecture interorigines s'affiche dans la console : `Cross-Origin Read Blocking (CORB) blocked cross-origin response`.

Cet avertissement est généré lorsque l'admission renvoie un objet JSON non vide. Il s'agit d'un [problème Chromium][7] connu. Cela n'a aucune incidence sur le SDK RUM Browser ; vous pouvez ignorer l'avertissement.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help
[2]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md
[3]: /fr/real_user_monitoring/browser/#npm
[4]: /fr/real_user_monitoring/guide/proxy-rum-data/
[5]: /fr/real_user_monitoring/faq/content_security_policy/
[6]: /fr/real_user_monitoring/browser/data_collected/?tab=session
[7]: https://bugs.chromium.org/p/chromium/issues/detail?id=1255707
[8]: /fr/real_user_monitoring/guide/sampling-browser-plans/