---
title: Détection automatique des déploiements défectueux
---

## Présentation

La fonctionnalité de détection automatique des déploiements défectueux vous permet d'identifier en quelques minutes les déploiements de code défectueux, afin de réduire le temps moyen de détection (Mean Time to Detection ou MTTD). Lorsque du code est déployé dans un environnement de production, Watchdog compare les performances de la nouvelle version du code avec celles des versions précédentes, afin de détecter les nouveaux types d'erreurs générées par le déploiement. Si Watchdog estime qu'un déploiement est défectueux, la page des services APM affiche des informations détaillées sur le service concerné. Ces données sont également disponibles sur la page de ressource des endpoints affectés.

Si Watchdog détermine qu'une version actuelle et active est défectueuse, une bannière jaune apparaît en haut de la page des [services APM][1], tel qu'illustré dans la capture d'écran ci-dessous. Le tableau Deployments en bas de l'écran fournit l'historique des déploiements du service et précise quelles anciennes versions sont défectueuses d'après Watchdog.

{{< img src="watchdog/faulty_deployment.png" alt="La page des services APM avec la bannière jaune en haut et le tableau Deployments en bas" >}}

Cliquez sur **View Details** dans la bannière jaune pour ouvrir une fenêtre coulissante contenant des informations sur le déploiement défectueux. Cette vue fournit des détails à propos du déploiement défectueux, notamment le type des nouvelles erreurs détectées, l'endpoint affecté et le code de statut HTTP. Pour accéder à cette vue, vous pouvez également cliquer sur la version de votre choix dans le tableau Deployments. Dans la capture d'écran ci-dessous, la vue détaillée indique que le type d'erreur `db.utils.OperationalError` affecte l'endpoint `/inventory`, ce qui entraîne un code de statut `(500)`.

{{< img src="watchdog/faulty_deployment_details.png" alt="La fenêtre des détails du suivi du déploiement défectueux" >}}

Lorsqu'un déploiement défectueux est détecté, Watchdog l'ajoute en tant qu'événement dans l'[Events Explorer][2]. Vous pouvez configurer un monitor de façon à recevoir automatiquement des notifications à propos de ce type d'événement. Pour cela, accédez à la page [New Monitors][3] et choisissez **Events**, puis ajoutez `tags:deployment_analysis` dans la requête de recherche définissant le monitor.

Vous avez également la possibilité d'activer le monitor en cliquant sur le bouton **Suggested Monitors**, puis sur **Enable**. Le bouton Suggested Monitors est uniquement proposé si le service ne possède pas encore de monitor. Dans le cas contraire, suivez les instructions ci-dessus pour créer le monitor depuis la page [New Monitors][3].

Chaque déploiement est analysé à de multiples reprises. Pour éviter de recevoir plusieurs alertes pour un même déploiement défectueux, Datadog vous conseille de définir une durée de rétablissement de 60 minutes pour le monitor.

{{< img src="watchdog/faulty_deployment_suggested_monitors.png" alt="La page des services APM avec le bouton Suggested Monitors" >}}

### Pourquoi un déploiement n'est-il pas considéré comme défectueux alors qu'il contient des erreurs ?

Watchdog s'efforce de déterminer si le nouveau déploiement est vraisemblablement à l'origine des erreurs. Cette fonctionnalité peut déterminer que ce n'est pas le cas pour une ou plusieurs des raisons suivantes :

- Les erreurs du type pertinent ne semblent pas être nouvelles ; elles se manifestaient déjà dans des versions précédentes ou des déploiements récents.
- Les erreurs du type pertinent sont rares et passagères. Elles disparaissent après quelque temps, même si la nouvelle version continue à être déployée.
- L'historique récent ne contient pas assez d'anciens déploiements pour que Watchdog puisse établir un point de comparaison à des fins d'analyse.

[1]: https://app.datadoghq.com/apm/services
[2]: /fr/events/explorer
[3]: https://app.datadoghq.com/monitors/create