---
aliases:
- /fr/product_analytics/experimentation/reading_results/
description: Lisez et comprenez les résultats de vos expériences.
further_reading:
- link: /product_analytics/analytics_explorer/
  tag: Documentation
  text: Analytics Explorer
- link: /experiments/diagnostics/
  tag: Documentation
  text: Diagnostics d'expérience
- link: https://www.datadoghq.com/blog/datadog-product-analytics/
  tag: Blog
  text: Prenez des décisions de conception basées sur les données avec Product Analytics
title: Lecture des résultats d'expérience
---
## Présentation {#overview}

Après avoir [lancé une expérience][1], la page des résultats d'expérience est l'endroit central pour l'analyser. Depuis cette page, vous pouvez :

- **Mesurez les métriques** : Examinez les scorecards qui comparent les performances du contrôle et du traitement sur vos métriques de décision.
- **Analysez davantage les résultats** : Décomposez le lift de la métrique par segments d'utilisateurs ou représentez-le au fil du temps pour comprendre comment votre changement a fonctionné dans les différentes cohortes.
- **Inspectez les replays de session** : Ouvrez les sessions individuelles d'utilisateurs pour voir comment des utilisateurs spécifiques ont expérimenté chaque variante.
- **Documentez les enseignements** : Enregistrez les conclusions et les enseignements clés pour votre équipe.

Les sections suivantes expliquent la scorecard des métriques et comment explorer les résultats.

## Diagnostics d'expérience {#experiment-diagnostics}

Datadog exécute des [diagnostics d'expérience][9] avec l'analyse d'expérience pour vérifier les données d'exposition, les données de métriques, la randomisation et la santé de l'analyse. Examinez les avertissements de diagnostic avant d'interpréter les résultats, surtout lorsqu'une métrique est manquante, de manière inattendue à zéro ou marquée d'un avertissement.

## Scorecard des métriques {#metric-scorecard}

La page des résultats d'expérience affiche une scorecard pour chaque métrique de décision. Chaque ligne résume la comparaison d'une métrique entre les variantes de traitement et de contrôle.

{{< img src="/product_analytics/experiment/exp_reading_exps_scorecard.png" alt="L'aperçu des résultats d'expérience montrant un tableau des métriques de décision avec les valeurs de contrôle et de traitement, l'écart relatif et les barres d'intervalle de confiance pour trois métriques." style="width:90%;" >}}

### Ce que montre la scorecard {#what-the-scorecard-shows}

Pour chaque métrique, la scorecard affiche :

- **Valeurs du groupe de contrôle et du groupe de traitement** : La valeur moyenne de la métrique par sujet dans chaque variante.
- **Lift relatif** : Le pourcentage de variation de cette moyenne entre le groupe de traitement et le groupe de contrôle.
- **Intervalle de confiance** : Une plage de valeurs de lift compatibles avec les données observées, représentée sous forme de barre centrée sur l'estimation du lift relatif.

La largeur et l'interprétation de l'intervalle de confiance dépendent de la [méthode d'analyse][2] configurée pour l'expérience.

{{% collapse-content title="Comment les métriques sont calculées" level="h4" expanded=false id="how-metrics-are-calculated" %}}

Datadog analyse les expériences au niveau du **sujet** — l'unité que vous avez configurée lors de la mise en place de l'expérience, généralement un utilisateur. Datadog calcule une valeur de métrique pour chaque sujet inscrit (par exemple, le revenu par utilisateur ou si l'utilisateur a complété son inscription). Ces valeurs par sujet forment une distribution pour chaque variante. Le moteur statistique de Datadog compare ensuite ces distributions entre le groupe de contrôle et le groupe de traitement.

**Le lift relatif** mesure dans quelle mesure le traitement a modifié la valeur moyenne de la métrique par sujet par rapport au groupe de contrôle :

```
Relative lift = (Treatment − Control) / Control
```

Un lift relatif de 10 % signifie que la valeur moyenne par sujet du groupe de traitement est 10 % plus élevée que celle du groupe de contrôle. Un lift négatif signifie que le traitement a obtenu de moins bons résultats en moyenne.

{{% /collapse-content %}}

### Intervalles de confiance {#confidence-intervals}

L'intervalle de confiance est une plage de valeurs de lift cohérentes avec les données observées. Le lift réel pourrait se situer en dehors de cette plage, mais les valeurs à l'intérieur de l'intervalle sont plus cohérentes avec ce que l'expérience a mesuré.

- Si **l'intervalle entier est supérieur à zéro**, le résultat est statistiquement significatif dans le sens positif. Une amélioration au moins aussi importante est peu susceptible de se produire s'il n'y a pas d'effet réel.
- Si **l'intervalle entier est inférieur à zéro**, le résultat est statistiquement significatif dans le sens négatif. Le traitement a probablement réduit la métrique.
- Si **l'intervalle croise zéro**, le résultat n'est pas statistiquement significatif. Le résultat est cohérent avec un effet réel nul.

Utilisez la largeur de l'intervalle comme indicateur de précision : un intervalle plus étroit signifie une estimation plus précise du lift ; un intervalle plus large indique une incertitude plus importante, souvent parce que l'échantillon est plus réduit ou parce que la métrique est bruitée.

Si la [correction des tests multiples][8] est activée, les intervalles de confiance sont plus larges car Datadog contrôle le taux d'erreur par famille sur l'ensemble des comparaisons de métriques et de variantes de traitement de l'expérience.

### Lift global {#global-lift}

Les expériences n'incluent généralement qu'un sous-ensemble d'utilisateurs éligibles. Passez à l'onglet {{< ui >}}Global lift{{< /ui >}} sur la scorecard des métriques pour estimer comment le déploiement du traitement auprès de tous les utilisateurs éligibles affecterait vos totaux métriques globaux. Consultez [Lift global][7] pour la méthodologie complète.

{{< img src="/product_analytics/experiment/exp_reading_global_lift.png" alt="L'onglet Lift global de la scorecard de l'expérience montrant les valeurs métriques moyennes de contrôle et de traitement, la couverture et le lift global pour chaque métrique de décision." style="width:90%;" >}}

Pour chaque métrique, l'onglet {{< ui >}}Global lift{{< /ui >}} affiche :

- **Valeurs de contrôle et de traitement** : La valeur métrique moyenne par sujet dans chaque variante — les mêmes valeurs que celles affichées sur l'onglet principal de la scorecard.
- **Couverture** : La proportion estimée de votre total métrique global associée à la population éligible de l'expérience (en excluant l'effet de l'expérience).
- **Lift global** : Le changement estimé de vos totaux globaux de métriques si le traitement était déployé auprès de tous les utilisateurs éligibles. Datadog calcule le lift global comme le produit de la couverture et du lift local (relatif) de l'expérience.

## Explorer les résultats {#exploring-results}

Depuis la scorecard des métriques, survolez le nom d'une métrique pour afficher les options d'exploration. Les options disponibles dépendent de la source de données de votre métrique.

### Graphique {#chart}

Cliquez sur {{< ui >}}Chart{{< /ui >}} sur n'importe quelle métrique pour ouvrir une visualisation interactive de la performance d'une métrique pendant l'expérience. Dans le graphique, vous pouvez :

- **Fractionner par propriétés de segmentation** : Comparez l'incrément entre les cohortes telles que le type d'appareil ou le niveau d'utilisateur. Les propriétés reflètent les attributs du sujet au moment initial de l'exposition.
- **Évolution du lift dans le temps** : Observez les tendances du lift au cours de l'expérience, représentées par date calendaire ou par le nombre de jours écoulés depuis la première exposition de chaque sujet à l'expérience.
- **Ajouter des filtres** : restreignez le graphique à un sous-ensemble spécifique de sujets.
- **Changer de type de lift** : Basculez entre le lift relatif et le lift absolu (Traitement − Contrôle).

L'exemple ci-dessous montre une ventilation par segment selon le pays. Utilisez cette vue pour comprendre quand certaines cohortes ont réagi différemment à la nouvelle expérience.

{{< img src="/product_analytics/experiment/exp_segment_view.png" alt="Vue par segment d'une métrique ventilée par code ISO de pays, affichant un graphique à barres du lift relatif et un tableau de données avec les valeurs de contrôle et de traitement par pays." style="width:90%;" >}}

### Copier le SQL{#copy-sql}

Pour les [métriques natives de l'entrepôt][3], cliquez sur {{< ui >}}Copy SQL{{< /ui >}} pour copier une version simplifiée de la logique de pipeline utilisée par Datadog pour calculer le résultat. Collez la requête dans votre entrepôt pour auditer le résultat ou effectuer une analyse complémentaire.

{{< img src="/product_analytics/experiment/exposure-sql/copy-sql.png" alt="La page des résultats de l'expérience avec le bouton Copier le SQL mis en évidence sur une métrique d'entrepôt." style="width:90%;" >}}

### Replays{#replays}

Pour les métriques basées sur des données [RUM][4] ou [Product Analytics][5], cliquez sur {{< ui >}}Replays{{< /ui >}} pour regarder les [replays de session][6] des utilisateurs inscrits à l'expérience. Examinez la façon dont les sujets de chaque variante ont utilisé le produit.

## Pour aller plus loin {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/experiments/plan_and_launch_experiments
[2]: /fr/experiments/statistics/analysis_methods
[3]: /fr/experiments/guide/connecting_a_data_warehouse/
[4]: /fr/real_user_monitoring/
[5]: /fr/product_analytics/
[6]: /fr/session_replay/
[7]: /fr/experiments/global_lift/
[8]: /fr/experiments/statistics/multiple_testing_correction
[9]: /fr/experiments/diagnostics/