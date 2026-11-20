---
aliases:
- /fr/product_analytics/experimentation/
description: Utilisez Datadog Experiments pour mesurer la relation de causalité que
  les nouvelles expériences ou fonctionnalités ont sur les résultats commerciaux,
  le comportement des utilisateurs et les performances des applications.
further_reading:
- link: https://www.datadoghq.com/blog/experiments
  tag: Blog
  text: Mesurez l'impact commercial de chaque changement de produit avec Datadog Experiments
- link: https://www.datadoghq.com/blog/datadog-product-analytics
  tag: Blog
  text: Prenez des décisions de conception basées sur les données avec Product Analytics
title: Planifier et lancer des expériences
---
## Présentation {#overview}

Planifiez et lancez des [experiments][8] pour mesurer l'impact des nouvelles fonctionnalités sur les résultats commerciaux, le comportement des utilisateurs et les performances des applications.

## Prérequis {#prerequisites}

<div class="alert alert-info">Vous devez disposer des autorisations <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#product-analytics">Product Analytics</a> et <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#feature-flags">Feature Flags</a> appropriées pour créer et lancer des expériences.</div>

Avant de commencer, assurez-vous de disposer des éléments suivants :

- Un [feature flag][4] pour déployer et gérer les variantes d'expérience que vous souhaitez tester.
- Au moins une [métrique d'expérience][2] pour mesurer le résultat de votre expérience.
- Un [type de sujet][6] pour définir le niveau auquel Datadog randomise votre expérience.

## Planifiez votre expérience {#plan-your-experiment}

Donnez un nom et une hypothèse à votre expérience, puis définissez les paramètres.

### Rédigez votre expérience {#draft-your-experiment}

Pour créer une ébauche d'expérience :

1. Accédez à [{{< ui >}}Experiments{{< /ui >}} > {{< ui >}}Experiment List{{< /ui >}}][1] dans Datadog Product Analytics.
1. Cliquez sur {{< ui >}}Create Experiment{{< /ui >}} pour ouvrir la boîte de dialogue, puis saisissez votre {{< ui >}}Experiment name{{< /ui >}} et {{< ui >}}Hypothesis{{< /ui >}}.
1. Cliquez sur {{< ui >}}Create Draft Experiment{{< /ui >}} pour ouvrir la page de configuration de l'expérience et passez à [Configurer votre expérience](#set-up-your-experiment).

{{< img src="/product_analytics/experiment/exp_plan_launch_create_experiment.png" alt="La boîte de dialogue Créer une nouvelle ébauche d'expérience avec un nom d'expérience « New Product Photos Experiment », une hypothèse selon laquelle des photos de produits en plus haute résolution augmentent les conversions d'ajout au panier, et un bouton Créer une ébauche d'expérience mis en surbrillance." style="width:80%;" >}}

Vous pouvez également créer une expérience directement depuis la page de détails d'un feature flag :

1. Accédez à la page [{{< ui >}}Feature Flags{{< /ui >}}][7] et sélectionnez l'onglet {{< ui >}}Overview{{< /ui >}}.
1. Sélectionnez l'indicateur de fonctionnalité que vous souhaitez utiliser pour votre expérience afin d'ouvrir sa page de détails.
1. Dans la section {{< ui >}}Targeting rules & rollouts{{< /ui >}}, cliquez sur {{< ui >}}Create New Experiment{{< /ui >}} pour ouvrir la boîte de dialogue.
1. Dans la boîte de dialogue, cliquez sur {{< ui >}}Create Experiment{{< /ui >}} pour ouvrir la page de configuration de l'expérience.
1. Sur la page de configuration de l'expérience, Datadog préremplit le {{< ui >}}Experiment name{{< /ui >}} avec le nom du feature flag. Modifiez-le si nécessaire.
1. Saisissez votre {{< ui >}}Hypothesis{{< /ui >}} et continuez vers [Configurer votre expérience](#set-up-your-experiment).

{{< img src="/product_analytics/experiment/exp_plan_launch_ff_new_experiment.png" alt="La page de détails du feature flag pour un flag appelé new_product_photos, montrant les règles de ciblage et les déploiements avec une répartition 50/50 entre les variantes de contrôle et de traitement, et un bouton Créer une nouvelle expérience mis en évidence en bas." style="width:80%;" >}}

### Configurer votre expérience {#set-up-your-experiment}

Après avoir créé votre expérience, définissez les métriques, le drapeau de fonctionnalité et les paramètres de randomisation.

#### Définir les métriques de décision {#set-decision-metrics}

Pour définir les métriques qui mesurent le résultat de votre expérience :

1. Utilisez le menu déroulant {{< ui >}}Calculate metrics by{{< /ui >}} pour sélectionner le type de sujet.
   - Pour définir un type de sujet personnalisé, sélectionnez {{< ui >}}Create subject type{{< /ui >}} dans le menu déroulant.
1. Cliquez sur le bouton {{< ui >}}Primary metric{{< /ui >}} pour ouvrir le sélecteur :
   1. Sélectionnez une métrique principale pour le résultat que vous souhaitez mesurer.
   1. (Facultatif) Cliquez sur l'onglet {{< ui >}}Certified{{< /ui >}} ou {{< ui >}}Non-certified{{< /ui >}} pour filtrer la liste.
   1. (Facultatif) Cliquez sur {{< ui >}}Create Metric{{< /ui >}} pour définir une nouvelle métrique. Pour obtenir des instructions de configuration, consultez [Créer des métriques d'expérience][2].
1. (Facultatif) Cliquez sur le bouton {{< ui >}}Secondary metrics{{< /ui >}} pour ajouter des métriques de garde-fou, qui surveillent les effets involontaires de l'expérience sur d'autres domaines tels que les performances, l'engagement ou les revenus.
1. Passez à [Exécuter un calcul de taille d'échantillon (facultatif)](#run-a-sample-size-calculation-optional) ou passez directement à [Ajouter un drapeau de fonctionnalité](#add-a-feature-flag).

{{< img src="/product_analytics/experiment/exp_plan_launch_decision_metric.png" alt="La page de configuration de l'expérience affichant la section Métriques de décision avec un menu déroulant Calculer les métriques par défini sur Utilisateur (@usr.id), une métrique principale définie sur Conversion Ajout au panier, et une section Métriques secondaires." style="width:80%;" >}}

#### Exécuter un calcul de taille d'échantillon (facultatif) {#run-a-sample-size-calculation-optional}

Le calculateur de taille d'échantillon estime le nombre d'utilisateurs et la durée nécessaires pour détecter un effet significatif. Vous choisissez un point d'entrée, l'événement qui affecte les utilisateurs à l'expérience, et Datadog utilise le volume de trafic vers cet événement pour produire l'estimation.

Pour exécuter le calcul :

1. Dans la section {{< ui >}}Run a sample size calculation (optional){{< /ui >}}, cliquez sur le lien **calculateur de taille d'échantillon** pour ouvrir le panneau latéral.
1. Développez {{< ui >}}Calculation details{{< /ui >}}. Vos métriques principales et secondaires apparaissent sous {{< ui >}}Metrics{{< /ui >}}.
1. Utilisez la liste déroulante {{< ui >}}Entry point{{< /ui >}} pour sélectionner l'événement qui affecte les utilisateurs à l'expérience, comme la consultation d'une page de paiement ou le clic sur un bouton d'ajout au panier. Datadog utilise cet événement pour estimer le volume de trafic.
1. (Facultatif) Sous {{< ui >}}Filter entry point{{< /ui >}}, affinez l'audience du point d'entrée :
   1. Cliquez sur {{< ui >}}\+ Filter{{< /ui >}} et sélectionnez une propriété dans le sélecteur. Si vous ne voyez pas la propriété dont vous avez besoin, saisissez le nom de la propriété dans le champ {{< ui >}}Custom property{{< /ui >}} et cliquez sur {{< ui >}}Add{{< /ui >}}.
   1. Dans la ligne de filtre qui apparaît, modifiez l'opérateur si nécessaire et sélectionnez une valeur dans la liste déroulante.
   1. (Facultatif) Cliquez sur {{< ui >}}\+ Filter{{< /ui >}} pour ajouter d'autres lignes. Entre les lignes, utilisez la liste déroulante pour sélectionner {{< ui >}}or{{< /ui >}} ou {{< ui >}}and{{< /ui >}} afin de définir comment les filtres se combinent.
1. Définissez {{< ui >}}Number of variants{{< /ui >}} et {{< ui >}}Traffic exposure{{< /ui >}}.
1. Développez {{< ui >}}Additional inputs{{< /ui >}}, puis choisissez la {{< ui >}}Power{{< /ui >}} statistique et saisissez une {{< ui >}}Target experiment duration{{< /ui >}} en semaines.
   - La valeur {{< ui >}}Target experiment duration{{< /ui >}} doit être 1 ou un nombre pair car le calculateur estime les valeurs MDE et le nombre d'utilisateurs attendus à des intervalles de 1, 2, 4, 6 et 8 semaines.
1. Cliquez sur {{< ui >}}Run Calculation{{< /ui >}} pour voir une estimation de l'**[Effet minimal détectable (MDE)][3] dans le temps** pour vos métriques.
1. Fermez le panneau latéral et passez à [Ajouter un indicateur de fonctionnalité](#add-a-feature-flag).

{{< img src="/product_analytics/experiment/exp_plan_launch_sample_size.png" alt="Le panneau latéral du calculateur de taille d'échantillon affichant les détails du calcul avec la conversion « Ajouter au panier » comme métrique principale et le nombre de vues du panier comme métrique secondaire (garde-fou), un point d'entrée défini sur le clic sur AJOUTER AU PANIER, deux variantes à 100 % d'exposition au trafic, et des entrées supplémentaires pour la puissance et la durée cible de l'expérience." style="width:80%;" >}}

#### Ajouter un indicateur de fonctionnalité {#add-a-feature-flag}

Pour ajouter un indicateur de fonctionnalité afin de contrôler la manière dont Datadog répartit le trafic entre les variantes de l'expérience :

1. Dans la section {{< ui >}}Feature flag{{< /ui >}}, cliquez sur le bouton {{< ui >}}Add a feature flag{{< /ui >}} pour ouvrir le sélecteur.
1. Sélectionnez l'indicateur de fonctionnalité pour votre expérience.
   - Si vous n'avez pas créé d'indicateur de fonctionnalité, cliquez sur {{< ui >}}Create New Feature Flag{{< /ui >}}. Pour obtenir des instructions de configuration, consultez [Créer votre premier indicateur de fonctionnalité][9].
1. Continuez vers [Configurer la randomisation](#configure-randomization).

{{< img src="/product_analytics/experiment/exp_plan_launch_add_ff.png" alt="Le sélecteur de feature flag affichant une liste de feature flags disponibles triés par date de création, avec new_product_photos sélectionné et ses détails affichés, y compris la clé du feature flag new-product-photos, le type Boolean, et un lien Create New Feature Flag en bas." style="width:80%;" >}}

#### Configurer la randomisation {#configure-randomization}

Randomisez vos utilisateurs et répartissez le trafic entre vos variantes d'expérience.

Une fois que vous avez sélectionné un indicateur de fonctionnalité, Datadog pré-remplit les paramètres de randomisation en fonction de la configuration de l'indicateur.

<div class="alert alert-info">Les paramètres de randomisation que vous configurez ici ont l'effet suivant après le lancement de votre expérience : <br><br><ul><li>Datadog ajoute une règle de ciblage à l'indicateur de fonctionnalité sélectionné.</li><li>Si plusieurs expériences partagent le même indicateur, Datadog évalue le trafic en fonction de l'ordre des règles de ciblage de l'indicateur. Vous pouvez réorganiser les règles de ciblage dans la boîte de dialogue de confirmation avant de lancer votre expérience.</li></ul></div>

Pour configurer la randomisation :

1. Sélectionnez le {{< ui >}}Environment{{< /ui >}} pour votre expérience dans la liste déroulante.
1. Sous {{< ui >}}Targeting rules{{< /ui >}}, configurez un filtre pour cibler les utilisateurs en fonction d'attributs personnalisés (par exemple, le rôle de l'utilisateur ou le niveau d'abonnement) que vous avez définis dans votre [contexte d'évaluation][10] :
   1. Cliquez sur {{< ui >}}Add Filter{{< /ui >}}. Pour la ligne `IF`, saisissez un attribut et une valeur, puis sélectionnez un opérateur dans la liste déroulante.
   1. (Facultatif) Affinez votre règle de ciblage :
      - Pour ajouter une ligne `AND` au sein du même filtre, cliquez sur {{< ui >}}Add Condition{{< /ui >}}.
      - Pour ajouter un autre filtre joint par `OR`, cliquez sur {{< ui >}}Add Filter{{< /ui >}}.
1. Sous {{< ui >}}Variants{{< /ui >}}, utilisez le menu déroulant {{< ui >}}Randomize users and split traffic{{< /ui >}} pour choisir {{< ui >}}Equally (recommended){{< /ui >}} ou {{< ui >}}Custom{{< /ui >}}. Cela définit la manière dont Datadog répartit le trafic entre vos variantes. Chaque utilisateur ne voit que sa variante assignée tout au long de l'expérience.
   - Si vous sélectionnez {{< ui >}}Custom{{< /ui >}}, saisissez un pourcentage pour chaque variante. Les pourcentages doivent totaliser 100 %.
1. Sous {{< ui >}}Traffic exposure{{< /ui >}}, définissez le pourcentage d'utilisateurs correspondant à vos règles de ciblage à inclure dans l'expérience.
1. (Facultatif) [Planifiez un déploiement progressif](#schedule-a-staged-rollout), [configurez des paramètres supplémentaires](#additional-configs), ou les deux.
1. Après avoir configuré votre expérience, passez à [Lancer votre expérience](#launch-your-experiment).

{{< img src="/product_analytics/experiment/exp_plan_launch_randomization_section.png" alt="La section Randomisation avec l'environnement défini sur prod, deux filtres de règles de ciblage joints par OR (chacun contenant une condition IF et AND avec un bouton Add Condition), un bouton Add Filter en dessous, une répartition égale 50/50 entre les variantes Control (true) et Treatment (false), et une exposition au trafic définie sur 100 % du trafic ciblé avec une option Add Rollout Steps." style="width:80%;" >}}

{{% collapse-content title="Paramètres de configuration supplémentaires (facultatif)" level="h4" expanded=false id="additional-configs" %}}

##### Planifiez un déploiement progressif {#schedule-a-staged-rollout}

Pour augmenter progressivement le trafic de l'expérience au lieu de la lancer pour tous les utilisateurs à la fois :

1. Dans la section {{< ui >}}Randomization{{< /ui >}}, cliquez sur {{< ui >}}Add Rollout Steps{{< /ui >}} et sélectionnez une configuration d'étape prédéfinie dans le menu déroulant (par exemple, 3 étapes de 5 % à 100 %).
1. Ajustez le pourcentage {{< ui >}}Traffic exposure{{< /ui >}} pour chaque étape selon vos besoins.
1. À côté de {{< ui >}}Scheduled rollout by holding between steps for{{< /ui >}}, utilisez les deux menus déroulants pour sélectionner un nombre et une unité de temps (par exemple, {{< ui >}}1{{< /ui >}} et {{< ui >}}days{{< /ui >}}). Cela définit la durée pendant laquelle chaque étape s'exécute avant de passer à la suivante.

À chaque étape du déploiement, Datadog échantillonne un pourcentage d'utilisateurs éligibles à inclure dans l'expérience. Les utilisateurs en dehors de l'échantillon voient toujours l'expérience par défaut (contrôle), mais Datadog ne les inclut pas dans les résultats de l'expérience.

##### Définissez des notifications {#set-notifications}

Acheminez les notifications vers les bonnes personnes au fur et à mesure de la progression de l'expérience.

Dans la section {{< ui >}}Notifications{{< /ui >}}, utilisez le menu déroulant {{< ui >}}Recipients{{< /ui >}} pour sélectionner qui reçoit les notifications concernant les événements du cycle de vie de l'expérience, comme l'atteinte de la significativité statistique des résultats ou la détection d'un problème par Datadog.

##### Choisissez un plan d'analyse statistique {#choose-a-statistical-analysis-plan}

Configurez la manière dont Datadog calcule la significativité statistique pour votre expérience. Pour obtenir des conseils sur le choix d'une méthode, consultez [Méthodes d'analyse][11].

Datadog copie les paramètres d'analyse statistique par défaut de votre organisation lorsque vous créez une expérience. Si votre organisation a configuré des paramètres par défaut, un badge {{< ui >}}COMPANY DEFAULT{{< /ui >}} apparaît. Les modifications ultérieures apportées aux paramètres par défaut de votre organisation s'appliquent aux expériences nouvellement créées et ne modifient pas les expériences existantes.

Pour modifier le plan d'analyse statistique :

1. Développez la section {{< ui >}}Statistical analysis plan{{< /ui >}}.
1. Sélectionnez une méthode dans le menu déroulant {{< ui >}}Confidence interval method{{< /ui >}}.
   - Si vous sélectionnez {{< ui >}}Bayesian{{< /ui >}}, choisissez un {{< ui >}}Standard Deviation of Prior{{< /ui >}} dans le menu déroulant.
1. Sélectionnez un pourcentage dans le menu déroulant {{< ui >}}Confidence level{{< /ui >}}.
1. Pour désactiver [CUPED][12], désactivez {{< ui >}}CUPED calculation{{< /ui >}}. CUPED est activé par défaut et utilise les données pré-expérience de chaque sujet pour réduire la variance des métriques et améliorer la sensibilité de l'expérience.
1. Pour contrôler le taux d'erreur par famille, activez {{< ui >}}Multiple testing correction{{< /ui >}}. Ce paramètre ajuste les comparaisons multiples de métriques et de variantes de traitement, produisant des résultats plus conservateurs. Pour plus de détails, consultez [Correction des tests multiples][13].
   - Ce paramètre n'est pas disponible lorsque vous utilisez la méthode {{< ui >}}Bayesian{{< /ui >}}.
1. Cliquez sur {{< ui >}}Reset to Default{{< /ui >}} pour restaurer les paramètres par défaut de l'analyse statistique copiés lors de la création de l'expérience, y compris les paramètres par défaut de l'entreprise en vigueur à ce moment-là.

##### Ajoutez des dimensions d'exploration par répartition {#add-split-by-exploration-dimensions}

Segmentez les résultats de votre expérience par propriétés (également appelées attributs) issues de votre [contexte d'évaluation][10].

Pour configurer les dimensions de segmentation :

1. Développez la section {{< ui >}}Split-by exploration dimensions{{< /ui >}}.
1. Sélectionnez des propriétés dans le menu déroulant {{< ui >}}Properties to compute for dimensional analysis{{< /ui >}}. Les propriétés disponibles ont le préfixe `context.`.
1. Si vous ne voyez pas la propriété dont vous avez besoin :
   1. Saisissez le nom de la propriété dans le champ du menu déroulant, précédé de `context.` (par exemple, `context.team`). Ensuite, cliquez sur {{< ui >}}Add custom property{{< /ui >}} pour ouvrir la boîte de dialogue {{< ui >}}Split-by exploration dimensions{{< /ui >}}.
   1. Vérifiez que {{< ui >}}Column Name{{< /ui >}} correspond au nom de la propriété que vous avez saisie.
   1. Sélectionnez la propriété {{< ui >}}Type{{< /ui >}} dans la liste déroulante.
   1. Cliquez sur {{< ui >}}Save{{< /ui >}}. La propriété personnalisée apparaît dans la liste déroulante {{< ui >}}Properties to compute for dimensional analysis{{< /ui >}}.

{{% /collapse-content %}}

## Lancez votre expérience {#launch-your-experiment}

Pour lancer votre expérience :

1. Cliquez sur {{< ui >}}Start Experiment{{< /ui >}} pour ouvrir la boîte de dialogue {{< ui >}}Confirm starting the experiment{{< /ui >}}.
1. Dans la boîte de dialogue, vérifiez l'exactitude de l'environnement, de l'indicateur de fonctionnalité et des règles de ciblage de l'indicateur.
   - Si plusieurs expériences partagent le même indicateur, utilisez les flèches haut et bas sur chaque règle de ciblage pour les réorganiser.
1. Cliquez sur {{< ui >}}Start Experiment & Enable Flag{{< /ui >}} pour lancer l'expérience.

Le lancement de l'expérience ouvre la page {{< ui >}}Flag & Exposures{{< /ui >}}. Vérifiez que votre configuration est active :
- Examinez {{< ui >}}Exposure balance check{{< /ui >}} pour confirmer que vos variantes sont réparties selon les pourcentages que vous avez configurés.
- Cliquez sur {{< ui >}}View Exposures Log{{< /ui >}} pour surveiller l'inscription des utilisateurs en temps réel.

Consultez [Reading Experiment Results][5] pour examiner vos données.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/experiments
[2]: /fr/experiments/defining_metrics
[3]: /fr/experiments/statistics/minimum_detectable_effect
[4]: /fr/getting_started/feature_flags
[5]: /fr/experiments/reading_results
[6]: https://app.datadoghq.com/product-analytics/experiments/settings/subject-types
[7]: https://app.datadoghq.com/feature-flags
[8]: /fr/experiments/
[9]: /fr/getting_started/feature_flags/#create-your-first-feature-flag
[10]: https://docs.datadoghq.com/fr/feature_flags/client#context-attribute-requirements
[11]: /fr/experiments/statistics/analysis_methods
[12]: /fr/experiments/statistics/cuped
[13]: /fr/experiments/statistics/multiple_testing_correction