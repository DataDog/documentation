---
description: Apprenez à gérer les performances et le statut de vos programmes de remise
  cloud.
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Découvrez Cloud Cost Management.
title: Programmes d'engagement
---
<div class="alert alert-info">CCM Commitment Programs prend en charge les instances réservées et les Savings Plans pour EC2, RDS et ElastiCache sur AWS, ainsi que les machines virtuelles sur Azure.</div>

## Présentation {#overview}

Les fournisseurs cloud proposent des programmes de remise basés sur l'engagement, tels que {{< tooltip text="Reserved Instance (RI)" tooltip="Une remise sur facture pour l'engagement à utiliser une configuration d'instance spécifique pendant une durée d'un ou trois ans." >}} et {{< tooltip text="Savings Plans" tooltip="Des programmes de remise cloud flexibles qui offrent des prix plus bas en échange d'un engagement sur un montant d'utilisation constant (mesuré en $/heure) sur une période donnée." >}}, pour vous aider à économiser sur une utilisation prévisible. La fonctionnalité Programmes d'engagement de Datadog vous aide à surveiller, optimiser et maximiser la valeur de ces remises dans vos environnements cloud.

Avec les programmes d'engagement, vous pouvez :
- Suivez et gérez les engagements inutilisés ou sous-utilisés
- Ciblez les dépenses élevées {{< tooltip text="on-demand" tooltip="Ressources cloud facturées aux tarifs standard, sans aucun engagement ni programme de remise." >}} avec des engagements supplémentaires
- Surveillez les expirations et planifiez les renouvellements en temps opportun

## Mise en route {#getting-started}

Utilisez les programmes d'engagement pour comprendre et optimiser vos engagements cloud.

1. Accédez à [**Cloud Cost > Planning > Commitment Programs**][1] dans Cloud Cost Management.
2. Utilisez le sélecteur de produit pour choisir un type d'engagement et le sélecteur de période pour définir la période de reporting.
3. Obtenez des informations sur vos KPI, vos coûts d'engagement et vos recommandations de renouvellement :
   - Examinez les KPI dans la section [Commitments overview](#commitments-overview).
   - Analysez les zones de dépenses à la demande pour comprendre comment améliorer votre couverture dans la section [On-demand hot-spots](#on-demand-hot-spots).
   - Affichez les engagements actifs par type dans le tableau [Inventaire des engagements](#commitments-inventory)
   - Identifiez les Savings Plans générant le plus de gaspillage dans [Least used savings plans](#least-used-savings-plans)
4. Prenez des mesures basées sur ces informations :
   - Ajustez les charges de travail pour mieux utiliser vos engagements et éviter des frais à la demande supplémentaires.
   - Mettez à jour les engagements en les achetant ou en les modifiant en fonction de vos données d'utilisation.
   - Planifiez les renouvellements ou retirez les engagements avant leur expiration.
   - Optimisez vos dépenses en utilisant les recommandations de Datadog pour économiser davantage et réduire le gaspillage.

## Vue d'ensemble des engagements {#commitments-overview}

Examinez ces indicateurs clés de performance (KPI) pour vos fournisseurs et services cloud :

{{< img src="cloud_cost/planning/commitments-inventory.png" alt="Dashboard Commitments Overview affichant les métriques d'économies clés et un graphique à barres comparant les coûts des engagements aux coûts à la demande équivalents au fil du temps." style="width:100%;" >}}

- {{< ui >}}Effective Savings Rate (ESR){{< /ui >}} : Pourcentage d'économies réalisées par vos programmes de remise par rapport aux tarifs à la demande, en tenant compte des engagements utilisés et sous-utilisés.
  - _Exemple : Vos RI peuvent offrir une remise de 62 %, mais si votre taux d'économies effectif (ESR) n'est que de 45 %, les engagements sous-utilisés réduisent vos économies réelles._
- {{< ui >}}Realized Savings{{< /ui >}} : Montant total en dollars économisé grâce à l'utilisation de programmes d'engagement par rapport aux tarifs à la demande.
  - _Exemple : Vous avez dépensé 10 000 $ en services cloud le mois dernier, mais auriez dépensé 14 000 $ aux tarifs à la demande ; vos économies absolues sont donc de 4 000 $._

## Points chauds à la demande {#on-demand-hot-spots}

Les points chauds à la demande mettent en évidence les zones présentant des coûts à la demande élevés, ce qui peut indiquer des opportunités d'achat d'engagements supplémentaires.

{{< img src="cloud_cost/planning/commitments-on-demand-2.png" alt="Tableau des points chauds à la demande pour AWS RDS affichant la région, la famille d'instances, le moteur de base de données, le pourcentage de couverture et le coût à la demande." style="width:100%;" >}}

Utilisez les onglets {{< ui >}}Cost{{< /ui >}} et {{< ui >}}Hours{{< /ui >}} pour basculer entre les dépenses à la demande en dollars ou l'utilisation en heures. Utilisez les filtres disponibles pour affiner les résultats ; les filtres varient en fonction du produit sélectionné.

Les colonnes du tableau correspondent aux filtres du produit sélectionné, affichant les dimensions qui caractérisent l'utilisation à la demande (telles que la région, la famille d'instances ou le moteur de base de données), ainsi que {{< ui >}}Coverage{{< /ui >}} (pourcentage d'utilisation couvert par des engagements) et {{< ui >}}On-Demand Cost{{< /ui >}} (trié par ordre décroissant pour faire apparaître les points chauds les plus coûteux en premier).

## Inventaire des engagements {#commitments-inventory}

L'Inventaire des engagements fournit une vue détaillée des engagements actifs au cours de la période sélectionnée, organisée par type d'engagement. Cela inclut les engagements expirant bientôt (dans les 30 jours) et les engagements déjà expirés au moment de la consultation.

{{< img src="cloud_cost/planning/commitments-inventory-1.png" alt="Section Inventaire des engagements affichant l'onglet Savings Plans avec un graphique d'utilisation et un tableau des engagements de Savings Plans EC2." style="width:100%;" >}}

Utilisez les onglets {{< ui >}}Savings Plans{{< /ui >}} et {{< ui >}}Reserved Instances{{< /ui >}} pour basculer entre les types d'engagement. Chaque onglet affiche :

- {{< ui >}}Utilization{{< /ui >}} : Pourcentage du type d'engagement utilisé au cours de la période sélectionnée.
- {{< ui >}}Unused spend{{< /ui >}} : Dépenses totales liées aux engagements inutilisés.
- {{< ui >}}Daily chart{{< /ui >}} : Suit les dépenses d'engagement utilisées et inutilisées ainsi que le taux d'utilisation au fil du temps.

Utilisez la case à cocher {{< ui >}}Only show Expiring{{< /ui >}} pour filtrer le tableau afin d'afficher les engagements dont la date de fin approche.

Le tableau répertorie vos engagements actifs. Les colonnes varient en fonction du produit et du type d'engagement, mais les colonnes courantes incluent :

| Colonne | Description |
|---|---|
| ARN du Savings Plan, ARN de la réservation ou ID d'engagement | Identifiant unique de l'engagement (ID d'engagement pour Azure). |
| Nom de l'avantage | Nom de l'avantage de type Savings Plan ou réservation Azure. |
| Modèle de paiement | Option de paiement (par exemple, Aucun paiement initial, Paiement initial partiel, Paiement initial total). |
| Durée | Durée de l'engagement (par exemple, 1 an, 3 ans). |
| Type | Le type d'engagement (par exemple, `ComputeSavingsPlans`). |
| Dépenses engagées/heure | Dépenses horaires engagées dans le cadre du plan. |
| Date de fin | Date à laquelle l'engagement expire. |
| Utilisation | Pourcentage de l'engagement utilisé au cours de la période sélectionnée. |

Utilisez le bouton {{< ui >}}Columns{{< /ui >}} pour afficher ou masquer des colonnes supplémentaires.

## Savings Plans les moins utilisés {#least-used-savings-plans}

Savings Plans les moins utilisés vous aide à identifier quels Savings Plans génèrent le plus de gaspillage. Utilisez cette section pour déterminer quand ce gaspillage se produit et prendre des mesures pour améliorer l'utilisation.

{{< img src="cloud_cost/planning/commitment-programs-least-used-savings-plans-1.png" alt="Section Savings Plan les moins utilisés affichant un graphique à barres des dépenses moyennes quotidiennes inutilisées des Savings Plan par jour de la semaine, un tableau des Savings Plan les plus gaspilleurs avec le montant du gaspillage, l'utilisation et l'ARN, ainsi qu'une carte thermique du pourcentage de dépenses engagées inutilisées par heure et par jour de la semaine." style="width:100%;" >}}

{{< ui >}}Daily average unused Savings Plans{{< /ui >}} : Un graphique à barres montrant le coût quotidien moyen des dépenses inutilisées des Savings Plan pour chaque jour de la semaine. Utilisez ceci pour repérer des tendances, comme un gaspillage plus élevé le week-end lorsque les charges de travail peuvent être plus faibles.

{{< ui >}}Savings Plans with most waste{{< /ui >}} : Un tableau listant les Savings Plan sous-utilisés, triés par gaspillage total. Les colonnes incluent :

- {{< ui >}}Waste{{< /ui >}} : Montant total en dollars des dépenses engagées inutilisées au cours de la période sélectionnée.
- {{< ui >}}Utilization{{< /ui >}} : Pourcentage du Savings Plan utilisé, affiché sous forme de pourcentage et de barre de progression.
- {{< ui >}}Savings Plan ARN{{< /ui >}} : Identifiant unique du Savings Plan.

{{< ui >}}Hourly unused committed spend percentage{{< /ui >}} : Une carte thermique montrant le pourcentage de dépenses engagées qui n'a pas été utilisé, ventilé par heure (UTC) et par jour de la semaine. Les cellules plus sombres indiquent des pourcentages inutilisés plus élevés, ce qui permet d'identifier des fenêtres temporelles spécifiques où les engagements sont systématiquement sous-utilisés.

## Simulation de Savings Plan {#savings-plan-simulation}

<div class="alert alert-info">La simulation de Savings Plan est en préversion. Elle prend en charge les AWS Savings Plans et s'exécute au niveau du <a href="https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#management-account">compte de gestion AWS</a>.</div>

La simulation de Savings Plan vous permet d'estimer l'impact d'un nouveau Savings Plan sur votre facture avant de l'acheter. Au lieu de combiner des exportations de Cost Explorer et des feuilles de calcul, vous pouvez modéliser un engagement par rapport à votre utilisation historique. Les résultats montrent la couverture, l'utilisation et les économies projetées.

La simulation est rétrospective. Il recalcule le prix de votre utilisation à la demande sur la période sélectionnée comme si le Savings Plan avait été actif. Les résultats montrent ce que vos coûts et économies _auraient été_, et non une prévision de l'utilisation future.

{{< img src="cloud_cost/planning/commitment-simulation.png" alt="Simulation de Savings Plan affichant les paramètres d'entrée, un résumé de l'impact estimé avec un tableau des métriques avant et après, et un graphique chronologique du coût simulé." style="width:100%;" >}}

### Exécuter une simulation {#run-a-simulation}

1. Accédez à l'onglet [**Simulator**][2] dans **Cloud Cost > Planning > Commitment Programs**.
2. Choisissez le type de Savings Plan, puis définissez vos préférences d'engagement : le compte propriétaire, la durée et le modèle de paiement.
3. Saisissez un engagement horaire supplémentaire et choisissez la période d'utilisation à simuler, jusqu'aux 3 derniers mois. La période est définie par défaut sur les 30 derniers jours.
4. Examinez les résultats projetés dans les sections {{< ui >}}Estimated Impact{{< /ui >}} et {{< ui >}}Estimated Service Breakdown{{< /ui >}}.

Si [AWS Cost Optimization Hub][3] propose une recommandation de Savings Plan pour votre organisation, elle apparaît dans un encart. L'encart indique l'engagement horaire, la durée et l'option de paiement suggérés. Cliquez dessus pour appliquer ces paramètres à la simulation. Cost Optimization Hub génère ces recommandations uniquement pour les Compute Savings Plans.

Pour recevoir ces recommandations, assurez-vous que votre rôle IAM d'intégration AWS inclut les autorisations `cost-optimization-hub:GetRecommendation` et `cost-optimization-hub:ListRecommendations`. Pour les étapes de configuration, consultez [Permissions for AWS Cost Optimization Hub recommendations][4].

### Interprétez les résultats {#interpret-the-results}

Tous les résultats sont des estimations basées sur votre utilisation au cours de la période sélectionnée, et les économies réelles dépendent de votre utilisation future. Comme les Savings Plans sont partagés au sein d'une [Consolidated Billing Family][5], un engagement peut s'appliquer à l'utilisation dans plusieurs comptes. Si Datadog ne dispose pas des données de coût pour la période, le simulateur signale les résultats comme incomplets.

Les résultats apparaissent dans deux sections :

- {{< ui >}}Estimated Impact{{< /ui >}} : Compare vos métriques clés avant et après l'engagement simulé, parallèlement à un graphique {{< ui >}}Simulated Cost{{< /ui >}} sur la période sélectionnée.
- {{< ui >}}Estimated Service Breakdown{{< /ui >}} : Détaille le coût estimé et la couverture par service AWS.

## Exemples de cas d'utilisation {#example-use-cases}

### Identifiez les engagements sous-utilisés {#identify-underutilized-commitments}

**Scénario** : Votre taux d'économies effectif (ESR) est inférieur aux attentes, même si votre couverture est élevée.

**Comment utiliser les programmes d'engagement** :  
1. Accédez au {{< ui >}}Commitments Overview{{< /ui >}} et vérifiez l'indicateur clé de performance (KPI) d'utilisation.
2. Dans le {{< ui >}}Commitments inventory{{< /ui >}}, triez par utilisation par ordre croissant pour identifier les engagements les moins utilisés. Pour les Savings Plans, vérifiez également le tableau {{< ui >}}Savings Plans with most waste{{< /ui >}} dans la section [Savings Plans les moins utilisés](#least-used-savings-plans).
3. Réallouez les charges de travail pour utiliser ces engagements plus efficacement, ou envisagez de modifier ou de vendre les engagements inutilisés si votre fournisseur cloud le permet.

### Planifiez les engagements arrivant à expiration {#plan-for-expiring-commitments}

**Scénario** : Plusieurs instances réservées expirent bientôt et vous souhaitez éviter des frais à la demande imprévus.

**Comment utiliser les programmes d'engagement** : 
1. Dans le {{< ui >}}Commitments Explorer{{< /ui >}}, examinez la liste des engagements et leurs dates d'expiration.
2. Utilisez les filtres pour vous concentrer sur les engagements arrivant bientôt à expiration.
3. Planifiez les renouvellements ou les remplacements à l'avance pour maintenir la couverture et maximiser les économies.

### Ciblez les dépenses à la demande élevées {#target-high-on-demand-spend}

**Scénario** : Vos coûts cloud montrent une utilisation à la demande systématiquement élevée pour un service ou une région spécifique.

**Comment utiliser les programmes d'engagement** :
1. Utilisez {{< ui >}}On-demand hot-spots{{< /ui >}} pour identifier les services, régions ou comptes qui présentent des coûts à la demande importants et stables.
2. Analysez les modèles d'utilisation pour confirmer qu'ils sont prévisibles.
3. Achetez de nouveaux engagements pour couvrir l'utilisation constante et réduire les coûts.

### Réduisez le gaspillage en déplaçant les charges de travail pour couvrir les Savings Plans inutilisés {#reduce-waste-by-shifting-workloads-to-cover-unused-savings-plans}

**Scénario** : Vous avez des Savings Plans sous-utilisés et des coûts à la demande élevés qui s'exécutent en parallèle.

**Comment utiliser les programmes d'engagement** :
1. Utilisez la section {{< ui >}}Least used savings plans{{< /ui >}} pour identifier les modèles récurrents de faible utilisation, par exemple, une capacité constamment inutilisée certains jours ou certaines heures.
2. Identifiez les charges de travail à la demande qui pourraient être planifiées pendant ces fenêtres de faible utilisation pour tirer parti de la couverture inutilisée des Savings Plans.
3. Déplacez ou replanifiez ces charges de travail pour réduire les dépenses à la demande et améliorer l'utilisation des Savings Plans.

## Pour aller plus loin {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/commitment-programs
[2]: https://app.datadoghq.com/cost/plan/commitment-programs/simulator
[3]: https://docs.aws.amazon.com/cost-management/latest/userguide/cost-optimization-hub.html
[4]: /fr/cloud_cost_management/setup/aws/#permissions-for-aws-cost-optimization-hub-recommendations
[5]: https://docs.aws.amazon.com/savingsplans/latest/userguide/sp-applying.html