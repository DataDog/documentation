---
description: Consultez les coûts Datadog, les tendances d'utilisation et les coûts
  prévisionnels de fin de mois sur une seule page, avec des ventilations quotidiennes,
  des détails par produit et un filtrage multi-organisation.
further_reading:
- link: account_management/plan_and_usage/cost_details/
  tag: Documentation
  text: Détails des coûts
- link: account_management/plan_and_usage/usage_details/
  tag: Documentation
  text: Utilisation détaillée
- link: account_management/billing/usage_attribution/
  tag: Documentation
  text: Usage Attribution
- link: cloud_cost_management/datadog_costs/
  tag: Documentation
  text: Coûts Datadog
- link: account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
  tag: Documentation
  text: Visibilité des coûts pour les clients qui achètent via un partenaire
title: Aperçu de la facturation
---
Consultez les coûts Datadog, les tendances d'utilisation et les coûts prévisionnels de fin de mois sur une seule page, avec des ventilations quotidiennes, des détails par produit et un filtrage multi-organisation.

La page [**Bill Overview**][1] offre aux administrateurs une vue unique des coûts Datadog et de l'utilisation. Elle est automatiquement activée lors du déploiement progressif commençant en mars 2026.

## Filtres globaux {#global-filters}

Les filtres suivants s'appliquent à la page {{< ui >}}Bill Overview{{< /ui >}} :

- {{< ui >}}Product Category{{< /ui >}} : Filtrez toutes les vues par famille de produits plus large, par exemple Infrastructure, APM, Logs, Security ou AI/ML.
- {{< ui >}}Billing Dimension{{< /ui >}} : Filtrez selon une dimension de facturation ou de mesure spécifique (par exemple, Infra Hosts, Indexed Logs ou Synthetic Browser Tests).
- {{< ui >}}Sub-Org{{< /ui >}} : Filtrez selon une organisation enfant spécifique.
- {{< ui >}}Group by Sub-Org{{< /ui >}} : Activez pour regrouper les coûts par sous-organisation.
- {{< ui >}}Time range{{< /ui >}} : Sélectionnez une période de facturation. Utilisez les flèches vers l'arrière et vers l'avant pour naviguer de mois en mois.

## Résumé des coûts {#cost-summary}

En haut de la page, le résumé des coûts affiche :

- {{< ui >}}Estimated cost to date{{< /ui >}} : Coût total estimé pour les jours écoulés de la période de facturation en cours
- {{< ui >}}Projected total{{< /ui >}} : Coût total estimé si les modèles d'utilisation actuels se poursuivent jusqu'à la fin du mois, avec le pourcentage de variation d'un mois à l'autre

## Ventilation quotidienne des coûts {#daily-cost-breakdown}

Sous le résumé des coûts, le {{< ui >}}Daily Cost Breakdown{{< /ui >}} graphique à barres empilées affiche les coûts ventilés par dimension de facturation pour chaque jour de la période sélectionnée. Chaque couleur du graphique représente une dimension de facturation différente. Cliquez sur l'icône d'agrandissement pour afficher le graphique en plein écran.

{{< img src="account_management/plan_and_usage/bill-overview-main-light.png" alt="Page Bill Overview montrant l'en-tête du résumé des coûts, le graphique à barres empilées Ventilation quotidienne des coûts et l'onglet Tendances." >}}

## Trends tab {#trends-tab}

L'onglet {{< ui >}}Trends{{< /ui >}} affiche les produits à examiner en fonction de quatre options de tri :

- {{< ui >}}Highest % Cost Change{{< /ui >}}
- {{< ui >}}Highest Cost Change ($){{< /ui >}}
- {{< ui >}}Highest Total Cost{{< /ui >}}
- {{< ui >}}Highest % Usage Change{{< /ui >}}

Sélectionnez une option de tri pour mettre à jour les cartes affichées. Chaque carte de produit affiche :

- {{< ui >}}Total Cost{{< /ui >}} pour la période
- {{< ui >}}Projected EOM{{< /ui >}} coût
- {{< ui >}}Month-over-month change{{< /ui >}}, affiché sous forme de badge de pourcentage
- {{< ui >}}Daily Cost{{< /ui >}} graphique à barres couvrant le mois précédent et le mois en cours
- {{< ui >}}Usage{{< /ui >}}, affiché en tant qu'unités totales consommées, en unités naturelles ; par exemple, PB (pétaoctets) de données analysées, Custom Metrics ; affiché uniquement sur les cartes liées au coût total et à l'utilisation.

Cliquez sur {{< ui >}}View Details{{< /ui >}} sur n'importe quelle carte pour ouvrir la [page de détails du produit][2].

{{< img src="account_management/plan_and_usage/bill-overview-trends-light.png" alt="Onglet Trends affichant les cartes de produits triées par Highest Total Cost." >}}

## Onglet Product List {#product-list-tab}

L'onglet {{< ui >}}Product List{{< /ui >}} affiche toutes les dimensions de facturation dans un tableau avec le coût et l'utilisation côte à côte.

Cliquez n'importe où sur une ligne de produit pour ouvrir la [page de détails du produit][2]. Survolez la fin d'une ligne pour créer rapidement un monitor de coûts pour cette dimension de facturation.

#### Colonnes du tableau {#table-columns}

| Colonne | Description |
|---|---|
| Dimension de facturation | Nom du produit ou de la dimension de facturation |
| Coût — Total | Coût facturé à ce jour pour la période |
| Coût — Prév. EOM | Coûts totaux prévisionnels de fin de mois |
| Coût — Variation | Variation en dollars et en pourcentage par rapport à la période précédente |
| Utilisation — Total | Utilisation totale en unité naturelle |
| Utilisation — Variation | Variation de l'utilisation par rapport à la période précédente |

Basculez entre les vues {{< ui >}}Monthly{{< /ui >}} et {{< ui >}}Daily{{< /ui >}} à l'aide des commandes situées au-dessus du tableau. Téléchargez le tableau complet sous forme de fichier `.csv` à l'aide du bouton {{< ui >}}Download as CSV{{< /ui >}}. Le tableau est paginé et affiche 10 lignes par page par défaut.

{{< img src="account_management/plan_and_usage/bill-overview-product-list-light.png" alt="Onglet Liste des produits affichant le tableau des dimensions de facturation avec les colonnes Coût et Utilisation" >}}

## Page de détails du produit{#product-detail-page}

Cliquez {{< ui >}}View Details{{< /ui >}} sur une carte de tendance ou sur n'importe quelle ligne du tableau {{< ui >}}Product List{{< /ui >}} afin d'ouvrir la page de détails du produit pour une dimension de facturation unique.

{{< img src="account_management/plan_and_usage/bill-overview-detail-light-2.png" alt="Page de détails du produit présentant les sections Aperçu des coûts et Aperçu de l'utilisation, avec notamment le bouton Télécharger les hosts facturables au format CSV" >}}

### Aperçu des coûts {#cost-overview}

- {{< ui >}}Total Cost{{< /ui >}} : Coût total facturé à ce jour pour la période sélectionnée
- {{< ui >}}Projected Cost Change{{< /ui >}} : Variation prévue en dollars et en pourcentage par rapport à la période précédente
- {{< ui >}}Projected EOM{{< /ui >}} : Coût total estimé à la fin du mois
Graphique à barres- {{< ui >}}Daily Cost{{< /ui >}} : Coût journalier pour le mois précédent et le mois en cours, le mois en cours étant mis en évidence. Survolez n'importe quelle barre pour voir le coût pour ce jour. Activez {{< ui >}}Show Usage Charges Only{{< /ui >}} pour isoler les coûts à la demande.
- {{< ui >}}Drilldown in Cloud Cost{{< /ui >}} : Cliquez pour ouvrir Cloud Cost Management, pré-filtré selon la dimension de facturation sélectionnée.

### Aperçu de l'utilisation {#usage-overview}

- {{< ui >}}Total Usage{{< /ui >}} : Total des unités consommées pendant la période sélectionnée
- {{< ui >}}Usage Change{{< /ui >}} : Évolution de l'utilisation par rapport à la période précédente (montant et pourcentage)
- {{< ui >}}Usage breakdown by sub-dimension{{< /ui >}} :Totaux d'utilisation individuels pour chaque sous-dimension. Par exemple, Sensitive Data Scanner répertorie séparément Scanned Events, Scanned Logs, Scanned RUM Sessions et Scanned Spans.
- {{< ui >}}Usage Types{{< /ui >}} Graphique à barres : Utilisation quotidienne agrégée par sous-dimension
- {{< ui >}}Allotment Usage{{< /ui >}} : Barre de progression indiquant la quantité consommé par rapport au quota alloué ; affiche « >100 % » lorsque l'utilisation dépasse le quota
- {{< ui >}}Drilldown in Usage Attribution{{< /ui >}} : cliquez pour ouvrir{{< ui >}}Usage Attribution{{< /ui >}}, pré-filtré selon la dimension de facturation sélectionnée.
- {{< ui >}}Download Billable Hosts as CSV{{< /ui >}} : Pour les hosts d'infrastructure, téléchargez au format CSV la liste des hosts individuels qui composent le montant total facturable.

### Télécharger les hosts facturables au format CSV {#download-billable-hosts-as-csv}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">Le téléchargement des hosts facturables au format CSV n'est pas pris en charge pour le <a href="/getting_started/site">site Datadog</a> que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Téléchargez un fichier CSV répertoriant les hosts individuels qui composent le total des hosts d'infrastructures facturables pour un mois donné. Utilisez-le pour vérifier la cohérence du total affiché sur la page Aperçu des factures, identifier les hosts qui génèrent la plus grande part de votre volume, attribuer l'utilisation aux équipes par tag, ou comparer les mois afin de repérer les changements inattendus.

Pour exporter la liste :

1. Dans le panneau latéral, utilisez le sélecteur de mois en haut à droite pour choisir un mois. Vous pouvez uniquement exporter des données pour des mois civils complets.
2. Sous {{< ui >}}Usage Overview{{< /ui >}}, cliquez sur {{< ui >}}Download Billable Hosts as CSV{{< /ui >}}.

Le CSV contient une ligne par host avec les colonnes suivantes :

| Colonne | Description |
|---|---|
| `Org Name` | Nom de l'organisation. |
| `Public ID` | L'identifiant public de l'organisation. |
| `Timestamp` | Pour les organisations facturées selon le 99e percentile, l'heure du mois à laquelle l'utilisation mesurée a atteint le 99e percentile. Pour les organisation facturées sur la base d'une somme, le premier jour du mois. |
| `Resource Type` | Le type de ressource, par exemple `agent`, `aws`, ou `vsphere`. |
| `Resource Name` | Le nom ou l'identifiant du host, par exemple un nom de host ou un identifiant d'instance. |
| `Usage Value` | Pour les organisations facturées selon le 99e percentile, `1` par host. Pour les organisations facturées sur la base d'une somme, le nombre d'heures d'utilisation du host sur le mois, par exemple `720` pour un host présent pendant un mois complet de 30 jours. |
| `Tags` | Un objet JSON contenant les tags clé-valeur du host. Vide (`{}`) quand le host n'a pas de tag. |

La somme de`Usage Value` sur l'ensemble des lignes correspond au total de hosts d'infrastructures affiché sur la page Aperçu des coûts : il s'agit du nombre de hosts pour les organisations facturées selon le 99e percentile, et du nombre d'heures d'utilisation des hosts pour les organisations facturées sur la base d'une somme.

## Revenir à la mise en page précédente{#revert-to-the-previous-layout}

Si votre organisation utilise la nouvelle mise en page {{< ui >}}Bill Overview{{< /ui >}} et que vous préférez l'ancienne, cliquez sur {{< ui >}}Disable Preview{{< /ui >}} dans l'en-tête de page. Ce bouton est accessible à toutes les organisations et reste actif pendant toute la durée de votre session.

{{< img src="account_management/plan_and_usage/toggle-back-header.png" alt="En-tête de la page Aperçu des coûts avec le bouton Désactiver l'aperçu" >}}

Pour revenir à {{< ui >}}Bill Overview{{< /ui >}}, cliquez sur {{< ui >}}Enable Preview{{< /ui >}} dans l'en-tête.

## Autorisations {#permissions}

Les autorisations suivantes sont requises pour accéder à chaque section de la page Aperçu des coûts :

| Section | Autorisation requise |
|---|---|
| Aperçu de la facture (données de coût) | `BILLING_READ` |
| Onglet Utilisation | `USAGE_READ` |
| Détails du forfait | `BILLING_READ` |
| Historique de facturation | `BILLING_READ` |
| Attribution de l'utilisation | `USAGE_READ` + forfait Enterprise ou Pro |
| Tendances des coûts des sous-organisations | L'organisation parente doit avoir `suborg_cost_trends` activé |

Pour plus d'informations sur la gestion des autorisations, consultez [Contrôle d'accès basé sur les rôles][3].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/billing/bill-overview
[2]: /fr/account_management/plan_and_usage/bill_overview/#product-detail-page
[3]: /fr/account_management/rbac/