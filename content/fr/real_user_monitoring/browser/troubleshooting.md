---
title: Dépannage
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: Blog
    text: Real User Monitoring
  - link: /real_user_monitoring/faq/content_security_policy/
    tag: Documentation
    text: Stratégie de sécurité de contenu
---
Si la fonctionnalité RUM Browser de Datadog se comporte de manière inattendue, consultez ce guide pour voir les solutions proposées. Si vous ne parvenez pas à résoudre votre problème, contactez l'[assistance Datadog][1] pour obtenir de l'aide. Assurez-vous de mettre régulièrement à jour le [SDK RUM Browser][2], car chaque version contient des améliorations et des correctifs.

## Données manquantes

Si vous ne voyez aucune donnée RUM ou si des données sont manquantes pour certains utilisateurs :

| Causes courantes                                                                                               | Correctif conseillé                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Les bloqueurs de publicités empêchent le téléchargement du SDK RUM Browser ou empêchent ce dernier d'envoyer les données à Datadog.     | Certains bloqueurs de publicités limitent également le chargement des outils de suivi de la performance et marketing. [Installez le SDK RUM Browser avec npm][3] et [transférez les données collectées par l'intermédiaire d'un proxy][4]. |
| Les règles réseau ou les VPN empêchent le téléchargement du SDK RUM Browser ou empêchent ce dernier d'envoyer les données à Datadog. | Accordez l'accès aux endpoints requis pour le téléchargement du SDK ou l'envoi des données. La liste des endpoints est disponible dans la [documentation relative à la stratégie de sécurité de contenu][5].                                        |

Consultez les [directives relatives à la stratégie de sécurité de contenu][6] et assurez-vous que votre site Web accorde l'accès au CDN du SDK RUM Browser et à l'endpoint d'admission.

### Vérifiez que le SDK RUM Browser est initialisé

Lancez la commande `window.DD_RUM.getInternalContext()` dans votre console Browser et vérifiez que les paramètres `application_id`, `session_id`, ainsi que l'objet view sont renvoyés :

{{< img src="real_user_monitoring/browser/troubleshooting/success_rum_internal_context.png" alt="Commande getInternalContext réussie">}}

Si le SDK n'est pas installé, ou s'il n'a pas été correctement initialisé, l'erreur `ReferenceError: DD_RUM is not defined` peut s'afficher :

{{< img src="real_user_monitoring/browser/troubleshooting/error_rum_internal_context.png" alt="Erreur de la commande getInternalContext">}}

Vous pouvez également consulter la console d'outils de développement de votre navigateur ou l'onglet Network si vous remarquez des erreurs liées au chargement du SDK RUM Browser.

### Vérifier que les données sont envoyées à l'endpoint d'admission Datadog

Le SDK RUM Browser envoie régulièrement des lots de données à l'endpoint d'admission Datadog. Vous devriez voir des requêtes réseau ciblant `/v1/input` (la partie relative à l'origine de l'URL peut être différente selon la configuration RUM) dans la section Network des outils de développement de votre navigateur :

{{< img src="real_user_monitoring/browser/troubleshooting/network_intake.png" alt="Requêtes RUM vers l'endpoint d'admission Datadog">}}

## Cookies RUM

Le SDK RUM Browser utilise des cookies pour stocker des informations de session et suivre une [session utilisateur][6] sur différentes pages. Les cookies sont internes (c'est-à-dire qu'ils sont définis sur votre domaine) et ne sont pas utilisés pour le suivi intersite. Voici les cookies définis par le SDK RUM Browser :

| Nom du cookie        | Détails                                                                                                                                                                                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_dd_s`             | Cookie utilisé pour regrouper tous les événements générés à partir d'une session utilisateur unique sur plusieurs pages. Il indique l'ID de session en cours, si la session est exclue en raison d'un échantillonnage, et la date d'expiration de la session. Le cookie est prolongé 15 minutes de plus à chaque interaction de l'utilisateur avec le site Web, jusqu'à la durée maximale de session utilisateur (4 heures).|
| `dd_site_test_*`   | Cookie temporaire utilisé pour tester la prise en charge des cookies. Expire instantanément.                                                                                                                                                                                                                                     |
| `dd_cookie_test_*` | Cookie temporaire utilisé pour tester la prise en charge des cookies. Expire instantanément.                                                                                                                                                                                                                                     |

**Remarque** : les cookies suivants ont été utilisés par le passé : `_dd_l`, `_dd_r` et `_dd`. Ils ont depuis été remplacés par `_dd_s` dans les dernières versions du SDK, mais tous ont la même utilité.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help
[2]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md
[3]: /fr/real_user_monitoring/browser/#npm
[4]: /fr/real_user_monitoring/faq/proxy_rum_data/?tab=npm
[5]: /fr/real_user_monitoring/faq/content_security_policy/
[6]: /fr/real_user_monitoring/browser/data_collected/?tab=session
