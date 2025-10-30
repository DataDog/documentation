---
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: En savoir plus Cloud Cost Management
- link: /cloud_cost_management/monitors
  tag: Monitors
  text: Créer des moniteurs de coûts
title: Page Anomalies
---

## Présentation

La solution Cloud Cost Management (CCM) de Datadog surveille en permanence votre environnement afin de détecter et de hiérarchiser les changements de coûts inattendus, ce qui vous permet de partager, d'étudier et de résoudre ces anomalies. Les anomalies de coûts sont disponibles pour AWS, Azure et Google Cloud et ne nécessitent aucun paramétrage supplémentaire après la configuration de CCM.

{{< img src="cloud_cost/anomalies/anomalies-overview.png" alt="Liste des anomalies de coûts, avec les noms de service, types d'utilisation et incidences sur les coûts" style="width:80;" >}}

Voici un exemple de workflow typique :

1. **Consulter** les anomalies dans l'onglet Anomalies
2. **Étudier** les anomalies à l'aide de Watchdog Explains pour mieux comprendre ce qui a entraîné les changements de coûts
3. **Partager vos découvertes avec les équipes d'ingénierie**, qui pourront analyser des informations détaillées, approfondir l'analyse ou implémenter un processus de surveillance.
4. **Résoudre** les anomalies attendues ou non significatives

## Définition des anomalies

Les anomalies sont des changements significatifs et inattendus qui vont à l'encontre des tendances habituelles. Datadog identifie automatiquement les anomalies à l'aide de techniques d'apprentissage automatique qui s'adaptent à vos schémas d'utilisation spécifiques.

Pour ne pas confondre une anomalie avec une simple fluctuation attendue, l'algorithme de Datadog :
- tient compte des hausses et des baisses de coûts récurrentes (par exemple, une augmentation des coûts chaque lundi, ou un pic le 4e jour de chaque mois) ;
- se concentre sur l'utilisation liée à l'ingénierie (ce qui exclut les taxes, crédits, remboursements et frais des instances réservées) ;
- filtre les anomalies à faible impact pour se focaliser sur l'essentiel.

## Visualiser les anomalies de coûts

Depuis l'onglet [Anomalies de la page Cloud Cost de la plateforme Datadog][1], vous pouvez visualiser différentes anomalies grâce aux filtres suivants :

- **Active** : il s'agit des anomalies détectées lors de la dernière journée complète de données sur les coûts (généralement, 2 à 3 jours auparavant).
- **Past** : il s'agit des anomalies qui ont duré plus de 7 jours ou qui ne sont plus considérées comme anormales. Il peut être utile d'étudier les anomalies passées, mais elles sont généralement moins urgentes et moins faciles à traiter.
- **Resolved** : il s'agit des anomalies qui ont été signalées comme résolues avec des informations de contexte.

Chaque fiche d'anomalie comporte les informations suivantes :
- Nom du service (`rds`, par exemple)
- Type d'utilisation
- Comptes cloud concernés
- Comparaison entre les coûts attendus et réels
- Graphique de l'évolution des coûts (dernier mois)

Les anomalies sont classées selon leur impact sur les coûts : les changements les plus importants figurent en tête de liste.

## Enquêter sur les anomalies

### Comprendre les causes des anomalies

CCM utilise automatiquement [Watchdog Explains][2], un assistant d'investigation, pour vous aider à identifier les causes des anomalies de coûts. Watchdog Explains analyse et identifie des informations spécifiques, à savoir :

- les comptes
- les équipes
- les services
- les clusters Kubernetes ou ECS
- les régions

concernés par l'anomalie. Cela permet de réduire les opérations d'analyse manuelles. Si vous passez le curseur sur le graphique des anomalies, deux graphiques s'affichent, le premier avec les tags identifiés par Watchdog Explains, et le deuxième sans. Vous pouvez ainsi voir que la suppression des tags permet d'atténuer le pic, ce qui confirme l'incidence sur les coûts.

### Prendre des mesures à partir des anomalies

Suivez les étapes ci-dessous pour analyser et résoudre des anomalies :

1. **Passez le curseur** sur une anomalie pour afficher ses facteurs ou cliquez sur **See more** pour ouvrir le volet latéral.

   {{< img src="cloud_cost/anomalies/anomalies-watchdog.png" alt="Cliquez sur See More pour afficher le volet latéral comportant des détails sur les anomalies, les options d'analyse et les boutons d'action" style="width:80;" >}}

1.  **Examinez des détails** à propos des services concernés, des équipes impliquées, des environnements touchés, des ID des ressources ou de l'incidence potentielle de l'utilisation et du tarif unitaire sur l'anomalie de coûts.
1. **Approfondissez votre analyse** : visualisez l'anomalie dans le Cost Explorer ou dans un notebook Datadog pour obtenir plus d'informations sur des anomalies à l'aide de dimensions supplémentaires. Vous pouvez ensuite envoyer l'anomalie, le lien de l'Explorer ou le notebook aux responsables du service ou aux équipes identifiées par Watchdog Explains. Cela permet aux équipes de résoudre des anomalies en s'appuyant sur leurs causes sous-jacentes et sur le fait qu'elles sont ou non attendues.

   {{< img src="cloud_cost/anomalies/anomalies-take-action.png" alt="Cliquez sur Take Action pour afficher l'anomalie dans le Cost Explorer ou l'ajouter à un notebook" style="width:80;" >}}
1. **Implémentez un processus de surveillance** : créez un monitor d'anomalie de coûts pour identifier les tendances similaires ou configurer des alertes pour les prochaines anomalies.
   {{< img src="cloud_cost/anomalies/anomalies-create-Monitor.png" alt="Créer un monitor d'anomalie de coûts" style="width:80;" >}}

## Résoudre des anomalies

Lors de votre analyse, vous pouvez identifier des anomalies qui sont peu importantes, qui correspondent à des coûts attendus ou qui ne sont pas réellement des anomalies.

Pour résoudre une anomalie, procédez comme suit :

1. Cliquez sur **Resolve Anomaly** pour ouvrir la fenêtre contextuelle de résolution.
1. Sélectionnez l'une des résolutions suivantes pour améliorer l'algorithme :
   - The anomaly amount was too small (le montant de l'anomalie était trop faible)
   - This is an unexpected increase (Cette augmentation est inattendue)
   - This is an expected increase (Cette augmentation est attendue)
1. **Ajoutez des informations de contexte** pour expliquer pourquoi il s'agit ou non d'une anomalie.
1. Cliquez sur **Resolve** pour déplacer l'anomalie vers l'onglet Resolved.

L'exemple suivant décrit comment indiquer qu'une anomalie de coûts est significative et comment expliquer qu'il s'agit bien d'une anomalie :

{{< img src="cloud_cost/anomalies/cost_anomalies_side-panel_is-unexpected-1.png" alt="Formulaire permettant d'indiquer qu'une anomalie est inattendue, avec un champ d'explication" style="width:80;" >}}

## Dépannage

Si vous ne voyez pas les anomalies attendues :
- Vérifiez que la solution CCM est [configurée correctement][3].
- Vérifiez que vous disposez des autorisations nécessaires pour AWS, Azure ou Google Cloud.
- Examinez la période couverte par la vue de l'anomalie.

Pour obtenir de l'aide supplémentaire, contactez l'[assistance Datadog][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analyze/anomalies
[2]: /fr/dashboards/graph_insights/watchdog_explains
[3]: /fr/cloud_cost_management/setup/
[4]: /fr/help/