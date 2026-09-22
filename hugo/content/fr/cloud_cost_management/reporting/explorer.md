---
description: Interrogez et analysez les coûts cloud en temps réel grâce à des filtres
  et des visualisations flexibles.
further_reading:
- link: /cloud_cost_management/reporting/
  tag: Documentation
  text: Créez et enregistrez des rapports de coûts
- link: /cloud_cost_management/tags/multisource_querying
  tag: Documentation
  text: Interrogez les coûts auprès de plusieurs fournisseurs
- link: /monitors/types/cloud_cost/
  tag: Documentation
  text: Créez des monitors de coûts
- link: /cloud_cost_management/
  tag: Documentation
  text: Découvrez Cloud Cost Management.
title: Cost Explorer
---
## Présentation {#overview}

Le [Cloud Cost Explorer][1] fournit une interface interactive basée sur des requêtes pour analyser vos dépenses cloud sur [AWS][2], [Azure][3], [Google Cloud][4], [Oracle][5], [les fournisseurs SaaS][6] et [les coûts Datadog][7]. Contrairement aux rapports enregistrés, l'Explorer vous permet d'effectuer des analyses ad hoc avec des requêtes, des filtres et des visualisations flexibles pour étudier les tendances des coûts, identifier les anomalies et répondre à des questions spécifiques sur vos dépenses cloud.

Utilisez le Cost Explorer pour :
- Créez des requêtes personnalisées auprès de plusieurs fournisseurs à l'aide de tags, de services et de filtres
- Étudiez l'évolution des coûts au fil du temps grâce à des regroupements et des ventilations flexibles
- Téléchargez des données, créez des widgets de dashboard ou configurez des monitors de coûts

## Interrogez vos données de coûts {#query-your-cost-data}

1. Accédez à [**Cloud Cost > Analyze > Explorer**][1] dans Datadog.
2. Créez une requête de recherche à l'aide de l'éditeur de requête ou des filtres déroulants :
   - Utilisez le menu déroulant {{< ui >}}Provider{{< /ui >}} pour sélectionner un ou plusieurs fournisseurs cloud
   - Cliquez sur {{< ui >}}\+ Filter{{< /ui >}} pour ajouter des filtres pour les services, les tags, les régions, les équipes et d'autres attributs
   - Saisissez directement dans la barre de recherche pour des requêtes plus avancées

   {{< img src="cloud_cost/reporting/reporting-overview-1.png" alt="Le générateur de requêtes Cloud Cost Explorer affichant la sélection du fournisseur, les filtres de type de coût, la recherche par tag, les filtres de service et les options de regroupement" style="width:100%;" >}}

3. Regroupez vos données de coûts en cliquant sur {{< ui >}}Group by{{< /ui >}} et en sélectionnant des dimensions telles que :
   - Nom du fournisseur
   - Nom du service
   - Tags de ressource (telles que `team`, `env`, `project`)
   - Région
   - ID de compte

4. Sélectionnez une plage horaire à l'aide du sélecteur de temps pour analyser les coûts sur différentes périodes (heure, jour, semaine, mois ou plage personnalisée).

**Remarque** : lors de l'interrogation des coûts auprès de plusieurs fournisseurs, les tags au niveau de la ressource ne sont pas disponibles. Pour accéder aux tags spécifiques aux ressources, filtrez sur un seul fournisseur dans votre requête.

## Panneau latéral Résumé des variations de coûts {#cost-change-summary-side-panel}

Cliquez sur n'importe quelle ligne du tableau en bas de l'Explorer pour ouvrir le {{< ui >}}Cost Change Summary panel{{< /ui >}} pour ce fournisseur, ce service ou cette ressource spécifique. Le panneau met en évidence ce qui, ou qui, peut être à l'origine des variations de coûts pour la période actuelle par rapport à la période précédente.

Le panneau contient quatre sections générales :
- Résumé des changements de coûts
- Équipes associées
- Détails des variations
- Enquêtez davantage

{{< img src="cloud_cost/reporting/cost-change-sidepanel.png" alt="Le panneau Résumé des changements de coûts met en évidence ce qui, ou qui, peut être à l'origine des variations de coûts pour la période actuelle par rapport à la période précédente." style="width:100%;" >}}

En haut, vous pouvez voir le **coût total** pour la période actuelle ainsi que la variation des coûts en dollars et en pourcentage par rapport à la période précédente (**ce qui s'est passé**). 

### Enquêtez sur le changement {#investigate-the-change}

Utilisez les sections {{< ui >}}Change Details{{< /ui >}} et {{< ui >}}Investigate Further{{< /ui >}} pour :

- **Identifiez instantanément les anomalies de coûts** : les écarts de coûts inattendus, calculés par rapport aux données historiques, sont automatiquement mis en évidence en rouge, ce qui vous permet de concentrer votre enquête sur les tendances critiques.  
     
- **Analysez les facteurs de changement** : Déterminez facilement la cause d'une variation de coût, qu'elle soit due à un changement d'**utilisation** (le nombre de ressources) ou à un changement de **prix unitaire** (le coût par ressource). Par exemple, dans la capture d'écran ci-dessous, la variation des dépenses est due à un changement du prix unitaire plutôt qu'à l'utilisation : le nombre de ressources reste stable tandis que le coût par ressource augmente et diminue, provoquant la variation globale des coûts.

{{< img src="cloud_cost/reporting/cloud-cost-spend-summary.png" alt="La variation des dépenses est due à un changement du prix unitaire plutôt qu'à l'utilisation : le nombre de ressources reste stable tandis que le coût par ressource augmente et diminue, provoquant la variation globale des coûts." style="width:100%;" >}}

### Collaborez et surveillez {#collaborate-and-monitor}

- **Contactez l'équipe responsable** :
  - Consultez la section {{< ui >}}Associated Team(s){{< /ui >}} pour identifier quelles équipes possèdent les ressources à l'origine de la variation des coûts (déduites à partir de tags tels que `team:shopist`). Faites un suivi auprès des équipes listées (par exemple, Shopist, Platform, Cloud-Networks) pour obtenir le contexte complet du changement.
  - Cliquez sur {{< ui >}}Send Notebook{{< /ui >}} pour partager directement le contexte complet de l'enquête sur les coûts avec l'équipe, leur permettant de consigner les conclusions, d'ajouter des annotations et de suivre le fil de l'enquête.

- **Filtrez par tags** :
  - Utilisez {{< ui >}}Associated Tags{{< /ui >}} pour voir tous les tags contribuant au poste de coût.
  - Cliquez sur n'importe quelle valeur de tag (comme `account:demo` ou une `aws_account` spécifique) pour affiner votre recherche et filtrer l'ensemble de l'Explorer afin de n'afficher que les ressources possédant ce tag.

- **Créez un monitor** :
  - Configurez un monitor Cloud Cost pour être alerté la prochaine fois qu'un changement similaire se produira. En savoir plus sur les [monitors Cloud Cost][8].

## Affiner vos résultats {#refine-your-results}

Cliquez sur {{< ui >}}Refine Results{{< /ui >}} pour accéder aux options de filtrage avancées qui vous aident à vous concentrer sur des modèles de coûts spécifiques.

   {{< img src="cloud_cost/reporting/refine-results.png" alt="Le panneau Affiner les résultats affiche des options de filtrage, notamment Frais d'utilisation uniquement, Jours complets uniquement, Coût total, Variation en dollars et Variation en pourcentage." style="width:100%;" >}}

{{< ui >}}Complete Days Only{{< /ui >}}
: Excluez les données de coût des deux derniers jours, qui peuvent être incomplètes. Utilisez cette option pour une analyse historique précise.

{{< ui >}}Total Cost{{< /ui >}}
: Filtrez les données pour afficher les coûts dans une plage de dollars spécifique (par exemple, n'afficher que les ressources coûtant plus de 1 000 $).

{{< ui >}}Dollar Change{{< /ui >}}
: Affichez uniquement les variations de coût dans une plage de montant spécifiée (par exemple, affichez les services avec une augmentation de 500 $ ou plus).

{{< ui >}}Percent Change{{< /ui >}}
: Affichez uniquement les variations de coût dans une plage de pourcentage spécifiée (par exemple, affichez les ressources avec une augmentation de coût de 20 % ou plus).

## Modifier les vues de données {#change-data-views}

Le Cost Explorer affiche vos données de coût sous forme de série temporelle avec une ventilation en tableau. Vous pouvez modifier la façon dont le graphique affiche les données en sélectionnant l'une des vues suivantes :

- {{< ui >}}Costs ($){{< /ui >}} : Affichez les coûts totaux en dollars au fil du temps
- {{< ui >}}Change trends (%){{< /ui >}} : Affichez les variations de coût sous forme d'augmentations ou de diminutions en pourcentage
- {{< ui >}}Change trends ($){{< /ui >}} : Affichez les variations de coût en montants monétaires

{{< img src="cloud_cost/reporting/change-view.png" alt="Menu déroulant affichant trois options de vue : Coûts en $, Tendances de changement en % et Tendances de changement en $" style="width:100%;" >}}

Passez d'une vue à l'autre pour déterminer si vous suivez les coûts absolus ou si vous analysez les variations de coûts.

### Options d'affichage du tableau {#table-display-options}

Sous le graphique, le tableau affiche les coûts ventilés selon le regroupement sélectionné (tel que le fournisseur, le nom du service ou les tags). Vous pouvez personnaliser la façon dont ces données sont affichées.

{{< img src="cloud_cost/reporting/table-display-options.png" alt="Options d'affichage du tableau montrant les modes de vue Résumé et Ventilation, les bascules de visibilité des colonnes et le filtre Top changements uniquement" style="width:100%;" >}}

**Modes de vue**
- {{< ui >}}Summary{{< /ui >}} : Affichez les coûts agrégés sur toutes les périodes pour une vue d'ensemble de haut niveau
- {{< ui >}}Breakdown{{< /ui >}} : Consultez les coûts ventilés par période (quotidienne, hebdomadaire ou mensuelle selon la plage temporelle sélectionnée)

**Filtres**
- {{< ui >}}Top changes only{{< /ui >}} : Cochez cette case pour filtrer le tableau et afficher uniquement les ressources ou services présentant les plus fortes augmentations ou diminutions de coûts

**Visibilité des colonnes**

Affichez ou masquez des colonnes dans le tableau pour vous concentrer sur les métriques importantes :
- {{< ui >}}Total{{< /ui >}}: Coûts totaux agrégés pour chaque ressource ou service
- {{< ui >}}Dollar change trends{{< /ui >}}: Variations des coûts en montants monétaires au fil du temps
- {{< ui >}}Change trends{{< /ui >}}: Variations des coûts en pourcentage au fil du temps

## Exporter et partager {#export-and-share}

Après avoir analysé les coûts dans l'Explorer, vous pouvez :

### Exporter au format csv {#export-to-csv}
Téléchargez vos données de coûts pour une analyse hors ligne, pour établir des rapports ou pour les partager avec les parties prenantes. Cliquez sur le bouton {{< ui >}}Export{{< /ui >}} et sélectionnez {{< ui >}}Download as CSV{{< /ui >}}.

### Créez un widget de dashboard {#create-a-dashboard-widget}
Enregistrez votre requête actuelle en tant que widget de dashboard pour surveiller les coûts parallèlement à d'autres métriques :
1. Cliquez sur {{< ui >}}Export{{< /ui >}} et sélectionnez {{< ui >}}Export to Dashboard{{< /ui >}}.
2. Choisissez un dashboard existant ou créez-en un.
3. Personnalisez le titre et les paramètres du widget.

### Créer un monitor de coûts {#create-a-cost-monitor}
Configurez des alertes basées sur votre requête actuelle pour être avertis lorsque les coûts dépassent les seuils ou changent de manière inattendue :
1. Cliquez sur {{< ui >}}Export{{< /ui >}} et sélectionnez {{< ui >}}Create Monitor{{< /ui >}}.
2. Configurez les conditions d'alerte (par exemple, lorsque les coûts dépassent 10 000 $ ou augmentent de 20 %).
3. Définissez les canaux de notification (e-mail, Slack, PagerDuty).

En savoir plus sur les [monitors Cloud Cost][8].

### Partager votre requête {#share-your-query}
Copiez l'URL depuis votre navigateur pour partager votre requête de coûts actuelle avec les membres de l'équipe. L'URL inclut tous les filtres, regroupements et paramètres de plage de temps.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analyze/explorer
[2]: /fr/cloud_cost_management/aws/
[3]: /fr/cloud_cost_management/azure/
[4]: /fr/cloud_cost_management/google_cloud/
[5]: /fr/cloud_cost_management/oracle/
[6]: /fr/cloud_cost_management/saas_costs/
[7]: /fr/cloud_cost_management/datadog_costs/
[8]: /fr/monitors/types/cloud_cost/
[9]: /fr/cloud_cost_management/reporting/