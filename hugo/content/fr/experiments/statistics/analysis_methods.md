---
aliases:
- /fr/experiments/analysis_methods
- /fr/experiments/analysis_methods/
description: Choisissez la manière dont Datadog calcule les estimations de lift et
  les intervalles de confiance pour les résultats d'expérience.
further_reading:
- link: /experiments/plan_and_launch_experiments
  tag: Documentation
  text: Planifier et lancer des expériences
- link: /experiments/reading_results
  tag: Documentation
  text: Lecture des résultats d'expérience
- link: /experiments/statistics/minimum_detectable_effect
  tag: Documentation
  text: Effets minimaux détectables
- link: /experiments/statistics/cuped
  tag: Documentation
  text: 'CUPED : technique de réduction de la variance'
- link: /experiments/statistics/multiple_testing_correction
  tag: Documentation
  text: Correction des tests multiples
- link: https://www.datadoghq.com/blog/two-ways-to-measure-cumulative-impact/
  tag: Blog
  text: Deux façons de mesurer l'impact cumulé des expériences
title: Méthodes d'analyse
---
## Présentation {#overview}

Datadog Experiments fournit plusieurs méthodes pour estimer le lift d'une expérience et calculer l'intervalle autour de cette estimation. La meilleure méthode dépend de la flexibilité dont vous avez besoin pendant l'exécution de l'expérience, de la taille d'échantillon attendue et de la manière dont votre équipe souhaite prendre des décisions de lancement.

| Méthode | Description | Points forts | Compromis |
| --- | --- | --- | --- |
| [**Fréquentiste à échantillon fixe**](#fixed-sample-frequentist-analysis) | Choisissez une taille d'échantillon ou une durée avant de lancer l'expérience, attendez ce moment, puis prenez une décision. | Offre la plus grande puissance pour une taille d'échantillon fixe. | Nécessite un plan préalable et peut perdre ses garanties statistiques si vous arrêtez prématurément ou prolongez l'expérience en fonction des résultats observés. |
| [**Fréquentiste séquentiel**](#sequential-frequentist-analysis) | Surveillez les résultats pendant l'exécution de l'expérience et prenez une décision lorsque vous êtes prêts. | Prend en charge une prise de décision flexible tout en contrôlant le taux de faux positifs. | A moins de puissance qu'une analyse à échantillon fixe, elle peut donc nécessiter plus d'échantillons pour détecter le même effet. |
| [**Bayésien ;**](#bayesian-analysis) | Combinez les données d'expérience avec une croyance préalable sur les lifts plausibles, puis prenez des décisions à partir de la distribution a posteriori. | Prend en charge des décisions nuancées, en particulier lorsque les tailles d'échantillon sont petites. | Nécessite une confiance dans la croyance préalable et un alignement sur la manière d'interpréter les probabilités. |

L'analyse fréquentiste séquentielle est la méthode par défaut car elle vous permet de surveiller les résultats et de prendre des décisions de déploiement ou d'annulation sans augmenter le taux de faux positifs. L'analyse à échantillon fixe peut être plus puissante lorsque tout se déroule comme prévu, mais elle nécessite un processus de décision plus strict. L'analyse bayésienne prend en charge des workflows décisionnels plus spécialisés.

Configurez la méthode d'analyse dans le [plan d'analyse statistique][1] de l'expérience.

## Analyse fréquentiste à échantillon fixe {#fixed-sample-frequentist-analysis}

L'analyse fréquentiste à échantillon fixe est le moyen le plus direct d'analyser les résultats d'une expérience. Avant de lancer l'expérience, choisissez le moment où vous évaluerez les résultats. Ce point de décision peut correspondre à une durée fixe ou à une taille d'échantillon cible. Lorsque l'expérience atteint ce point, comparez chaque variante de traitement au groupe témoin et décidez s'il faut déployer, annuler ou poursuivre avec une nouvelle expérience.

Utilisez l'analyse à échantillon fixe lorsque la taille de l'échantillon est limitée et que votre équipe peut s'engager sur les critères de décision avant le début de l'expérience.

Le principal défi consiste à choisir le point de décision. Si vous évaluez trop tôt, l'expérience pourrait ne pas avoir une puissance suffisante pour détecter un effet réel. Si vous évaluez trop tard, vous risquez d'exposer les utilisateurs à une expérience inférieure plus longtemps que nécessaire. Le point de décision doit être fondé sur une analyse de puissance, qui aide les équipes d'expérimentation à choisir une durée conférant à l'expérience une puissance suffisante pour détecter un [effet détectable minimum][2] donné tout en respectant les contraintes liées au produit, à l'activité ou aux opérations.

<div class="alert alert-warning">Pour l'analyse à échantillon fixe, évitez de modifier la durée ou la taille de l'échantillon en fonction des résultats intermédiaires. Arrêter prématurément parce que les résultats semblent inhabituellement bons ou mauvais, ou prolonger l'expérience parce que les résultats sont proches du seuil de significativité, peut biaiser l'estimation du lift et augmenter le taux de faux positifs.</div>

## Analyse fréquentiste séquentielle {#sequential-frequentist-analysis}

L'analyse fréquentiste séquentielle vous permet de surveiller les résultats de l'expérience en continu et de prendre une décision sans présélectionner une taille d'échantillon finale. Ceci est utile lorsque vous devez réagir à des résultats fortement positifs ou négatifs, ou lorsque les hypothèses sous-jacentes à un plan à échantillon fixe peuvent changer pendant le déroulement de l'expérience.

L'analyse séquentielle contrôle le taux de faux positifs tout en permettant des checks répétés des résultats. Le compromis est la puissance : pour un même nombre de sujets, l'analyse séquentielle est moins susceptible que l'analyse à échantillon fixe de détecter un lift réel. Pour atteindre la même puissance, l'expérience peut avoir besoin de durer plus longtemps.

Utilisez l'analyse séquentielle lorsque la flexibilité compte plus que la maximisation de la puissance pour une taille d'échantillon prédéterminée. C'est une bonne option par défaut pour de nombreuses expériences car elle vous permet de :

- Surveiller les résultats pendant que l'expérience est en cours.
- Arrêter prématurément en cas d'améliorations ou de dégradations importantes.
- Continuer à collecter des données sans invalider l'analyse.
- Éviter de redémarrer l'expérience lorsque les hypothèses initiales sur la taille de l'échantillon étaient erronées.

## Analyse bayésienne {#bayesian-analysis}

L'analyse bayésienne utilise les données de l'expérience pour mettre à jour une croyance a priori sur les valeurs de lift plausibles. Le résultat est une distribution a posteriori qui décrit quelles valeurs de lift sont les plus compatibles avec l'a priori et les données observées.

Les méthodes fréquentistes demandent quelle serait la probabilité des données observées si le traitement et le témoin n'avaient aucune différence réelle. Les méthodes bayésiennes prennent plutôt les données observées et l'a priori comme acquis, puis estiment la probabilité de différentes valeurs de lift. Cela peut rendre les résultats plus faciles à discuter avec les parties prenantes, car des déclarations telles que « le traitement est susceptible d'être meilleur que le témoin » correspondent plus directement au résultat de l'analyse.

Utilisez l'analyse bayésienne lorsque :

- Vous devez prendre une décision avec des données limitées.
- La décision dépend de la probabilité qu'un lift dépasse un seuil commercial, et non pas seulement du fait que l'intervalle exclut zéro.
- Les parties prenantes préfèrent penser en termes de probabilités de succès plutôt qu'en termes de valeurs p fréquentistes.

L'a priori compte le plus lorsque les tailles d'échantillon sont petites. Avec suffisamment de données, la distribution a posteriori est principalement déterminée par le comportement observé de l'expérience, mais des a priori fondés empiriquement sont souvent assez forts pour affecter les résultats même avec de grandes tailles d'échantillon. Une loi a priori mal spécifiée peut influencer l'estimation du lift et l'intervalle suffisamment pour modifier la décision.

### Choisir une loi a priori {#choosing-a-prior}

Les deux lois a priori réduisent les estimations de lift bruitées vers la moyenne a priori. Chaque loi a priori exerce une réduction de manière différente :
une réduction de manière différente :

- **Loi normale a priori** : Pour une loi a priori fixe, le facteur de réduction dépend de l'erreur type de l'estimation du lift, et non de son ampleur. Les estimations très certaines sont moins réduites, tandis que les estimations très incertaines sont davantage réduites. La moyenne et la variance a posteriori possèdent des expressions analytiques, ce qui rend cette loi a priori simple à utiliser.
- **Loi de Student a priori** : La réduction dépend à la fois de l'erreur type de l'estimation du lift et de son ampleur. Les petits lifts sont réduits de manière similaire au modèle normal, tandis que les grands lifts sont réduits moins agressivement. Cette approche est motivée par la possibilité de lifts rares et importants, comme discuté dans [A/B Testing with Fat Tails][5].

<div class="alert alert-info">Les intervalles bayésiens sont techniquement des intervalles de crédibilité, bien que Datadog puisse les présenter aux côtés d'intervalles de confiance dans l'interface utilisateur des résultats d'expérience. Contrairement aux intervalles fréquentistes, les intervalles bayésiens ne fournissent pas la même garantie de taux de faux positifs.</div>

## Paramètres associés {#related-settings}

Les méthodes d'analyse ne constituent qu'une partie du plan d'analyse statistique. Les expériences Datadog permettent également de modifier les [paramètres][1] suivants :

[CUPED][4]
: Utilise les données pré-expérience de chaque sujet pour réduire la variance des métriques et améliorer la sensibilité de l'expérience. Lorsque CUPED est activé, les valeurs de lift et de métrique affichées peuvent différer des estimations naïves calculées à partir des données brutes.

Correction des tests multiples
: Corrige le taux d'erreur par famille accru résultant de l'évaluation de multiples métriques et comparaisons de variantes de traitement. Cela produit des résultats plus conservateurs et n'est pas disponible avec l'analyse bayésienne. Pour plus d'informations, consultez [Multiple Testing Correction][3].

Niveau de confiance
: Contrôle la largeur de l'intervalle autour de l'estimation du lift. Des niveaux de confiance plus élevés produisent des intervalles plus larges et nécessitent davantage de données pour atteindre une signification statistique.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/experiments/plan_and_launch_experiments/#choose-a-statistical-analysis-plan
[2]: /fr/experiments/statistics/minimum_detectable_effect
[3]: /fr/experiments/statistics/multiple_testing_correction
[4]: /fr/experiments/statistics/cuped
[5]: https://doi.org/10.1086/710607