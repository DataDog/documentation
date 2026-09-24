---
description: Analysez les données Datadog dans une interface de feuille de calcul
  familière avec des tableaux, des tableaux croisés dynamiques, des recherches, des
  colonnes calculées et des feuilles de calcul flexibles.
further_reading:
- link: /sheets/functions_operators
  tag: Documentation
  text: Fonctions et opérateurs
- link: https://www.datadoghq.com/blog/flexible-sheets-cloud-cost-management/
  tag: Blog
  text: Analysez les coûts du cloud avec des tableurs flexibles dans Datadog Sheets
- link: https://www.datadoghq.com/blog/datadog-forms-sheets-developer-feedback/
  tag: Blog
  text: Transformez les retours d'expérience des développeurs en informations opérationnelles
    avec Datadog Forms et Sheets
- link: https://www.datadoghq.com/blog/advanced-analysis-tools/
  tag: Blog
  text: Explorez vos données avec Sheets, l'éditeur DDSQL et les Notebooks pour une
    analyse avancée dans Datadog
title: Sheets
---
## Présentation {#overview}

Sheets est un outil de feuille de calcul que vous pouvez alimenter avec des données Datadog, vous permettant d'effectuer des analyses complexes et de créer des rapports sans nécessiter d'expertise technique. Il permet aux équipes d'utiliser des fonctions de feuille de calcul familières comme les recherches, les tableaux croisés dynamiques et les calculs sur les données Datadog, afin que vous n'ayez pas à exporter et à utiliser un autre outil avec des données obsolètes.

Sheets vous permet de manipuler, transformer et analyser les données provenant des logs, du RUM (Real User Monitoring) et du suivi des coûts du cloud dans une interface de tableur familière. Il peut contenir les onglets suivants :

- [{{< ui >}}Table{{< /ui >}}](#table) : Interrogez des données en temps réel à partir d'une source de données Datadog et enrichissez-les avec des colonnes calculées, des recherches et des filtres.
- [{{< ui >}}Pivot{{< /ui >}}](#pivot) : Résumez et agrégez les données d'un tableau avec des dimensions et des calculs personnalisés.
- [{{< ui >}}Sheet{{< /ui >}}](#sheet-preview) (Aperçu) : Un tableur flexible, vierge et personnalisable où vous pouvez écrire des formules référençant directement les données d'un tableau pour créer des modèles, des rapports ou suivre des opérations.

## Tableau {#table}

Commencez par créer un tableau de données, soit en créant une nouvelle requête depuis Sheets, soit en transférant une requête depuis les pages d'exploration, telles que Logs, RUM, Metrics ou Cloud Cost.

### Ajouter un nouveau tableau dans Sheets {#add-a-new-table-in-sheets}

{{< img src="/sheets/create_table.png" alt="Modale pour créer un tableau à partir de Sheets, affichant une requête Logs avec status:error." style="width:90%;" >}}

1. Sur la [page Datadog Sheets][1], cliquez sur {{< ui >}}New Spreadsheet{{< /ui >}}.
1. Cliquez sur {{< ui >}}Add Data{{< /ui >}}.<br/>
**Remarque** : si une source de données que vous souhaitez n'est pas disponible, demandez-la [ici][19].
1. Commencez à créer votre requête en sélectionnant votre source de données et en ajoutant des paramètres de filtrage.
1. Sélectionnez les colonnes que vous souhaitez afficher et prévisualisez le tableau résultant.
1. Cliquez sur {{< ui >}}Create Table{{< /ui >}}.

### Transférez votre requête vers un tableur {#transfer-your-query-to-a-spreadsheet}

1. Sur la page d'un produit pris en charge (tel que [Log Explorer][2]), créez la requête des données que vous souhaitez analyser, par exemple en filtrant votre vue Logs sur celles qui contiennent `status:error`.
1. Cliquez sur {{< ui >}}Open in Sheets{{< /ui >}}. Pour obtenir une liste des pages de produits à partir desquelles vous pouvez créer un tableau, consultez la section [Sources de données prises en charge](#supported-data-sources).
1. Vous pouvez créer un {{< ui >}}New Spreadsheet{{< /ui >}} ou ajouter ce tableau de données à un {{< ui >}}Existing Spreadsheet{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save and Open{{< /ui >}}.

### Colonnes calculées {#calculated-columns}

Vous pouvez utiliser une colonne calculée pour ajouter une formule, analyser un message de log, extraire une expression régulière ou ajouter une logique métier à vos données. Vos colonnes calculées peuvent être utilisées dans le tableau croisé dynamique que vous créerez ultérieurement.

Depuis l'en-tête de la colonne située tout à droite de votre tableau, cliquez sur l'icône Plus pour {{< ui >}}Add calculated column{{< /ui >}}. Saisissez une fonction pour afficher la syntaxe et la description de la fonction. Pour obtenir une liste complète des fonctions prises en charge, consultez la documentation [Functions and Operators][3].

{{< img src="/sheets/calculated_columns.png" alt="Colonne calculée ajoutée avec l'icône Plus, et exemple de fonction IFS" style="width:90%;" >}}

### Recherche{#lookup}

La recherche enrichit vos données existantes et ajoute plus de contexte à votre tableau. Cliquez sur {{< ui >}}Add Lookup{{< /ui >}} en haut de la page pour ajouter des colonnes à partir d'un autre tableau ou source de données, telle que [Reference Tables][4], des logs ou des données RUM. La recherche est similaire à une jointure gauche ou à une fonction RECHERCHEV dans Excel ou Google Sheets ; elle fait correspondre les enregistrements sur une colonne commune et renvoie des colonnes de données supplémentaires pour enrichir votre tableau Sheets existant.

{{< img src="/sheets/lookup.png" alt="Exemple de recherche qui ajoute les métadonnées de l'équipe d'un utilisateur provenant d'une Reference Table" style="width:90%;" >}}

Par exemple, vous disposez d'un tableau de données RUM contenant les adresses e-mail des utilisateurs et vous souhaitez savoir à quelles équipes ces utilisateurs appartiennent. Vous pouvez ajouter une recherche qui compare la colonne d'e-mail utilisateur de votre tableau avec la colonne d'e-mail professionnel d'une Reference Table. La recherche extrait l'équipe de la Reference Table et l'ajoute en tant que nouvelle colonne à votre feuille de calcul.

## Tableau croisé dynamique {#pivot}

Après avoir ajouté une table de données à une feuille de calcul, analysez et ajoutez du contexte à vos données brutes à l'aide d'un tableau croisé dynamique. Utilisez les tableaux croisés dynamiques pour résumer et organiser de grandes quantités de données dans des tableaux personnalisés. Cela vous aide à analyser les données pour identifier des modèles et des tendances, et à effectuer des comparaisons. Par exemple, vous pouvez avoir une table de cent lignes, mais avec un tableau croisé dynamique, vous pouvez décomposer ces données en un tableau récapitulatif qui compte vos données par méthode ou par région. Pour créer un tableau croisé dynamique :
1. Depuis une feuille de calcul existante contenant déjà un tableau de données, cliquez sur {{< ui >}}Add Pivot Table{{< /ui >}}.
1. Dans la section {{< ui >}}Rows{{< /ui >}} et {{< ui >}}Columns{{< /ui >}}, sélectionnez les dimensions que vous souhaitez analyser, comme le statut des logs.
1. Dans la section {{< ui >}}Calculations{{< /ui >}}, sélectionnez les dimensions que vous souhaitez utiliser dans les calculs, notamment la somme, la moyenne, le nombre, le minimum et le maximum.

{{< img src="/sheets/example_pivot_table.png" alt="Exemple de panneau de configuration de tableau croisé dynamique" style="width:90%;" >}}

### Visualisations {#visualizations}

Une fois votre tableau croisé dynamique créé, vous pouvez cliquer sur {{< ui >}}Show Graphs{{< /ui >}} et ajouter jusqu'à six widgets pour représenter vos données sous forme de graphique. Les types de widgets pris en charge incluent les widgets {{< ui >}}Top List{{< /ui >}}, {{< ui >}}Treemap{{< /ui >}} et {{< ui >}}Pie Chart{{< /ui >}}. Survolez le titre du widget pour supprimer, dupliquer, agrandir, exporter et repositionner les widgets. Pour modifier un widget, cliquez sur l'icône en forme de crayon. Les options de modification vous permettent de sélectionner le type de widget, de choisir quel calcul du tableau croisé dynamique représenter graphiquement (s'il y en a plus d'un) et de spécifier les lignes, les colonnes ainsi que le nombre de regroupements affichés par ligne ou par colonne.

## Feuille (Aperçu) {#sheet-preview}

{{< callout url="https://www.datadoghq.com/product-preview/flexible-spreadsheets-in-datadog-sheets/">}}
Créez des feuilles de calcul flexibles : conçues pour vous permettre de partir de zéro, de créer des modèles, de suivre des opérations, et plus encore.
{{< /callout >}}

Une feuille est un tableur flexible, tel une toile vierge, doté d'un moteur de calcul complet. Utilisez-la pour créer des modèles financiers, des outils de suivi opérationnel, des modèles de planification ou tout calcul libre qui ne correspond pas à un workflow basé sur des requêtes.

Pour ajouter une feuille, cliquez sur l'onglet {{< ui >}}\+{{< /ui >}} en bas de votre tableur et sélectionnez {{< ui >}}Add Sheet{{< /ui >}}.

{{< img src="/sheets/flexible_spreadsheet.png" alt="Une feuille flexible affichant un modèle de dépenses cloud 2025 par fournisseur, avec des formules SUMIFS et VLOOKUP faisant référence aux onglets Coût cloud et Tableau de conversion de devises" style="width:90%;" >}}

### Références de cellule {#cell-references}

Les cellules sont référencées en utilisant la notation standard A1, où la colonne est une lettre et la ligne un nombre. Par exemple, `A1` est la première cellule, `B3` est la troisième ligne de la colonne B, et `A1:C5` est une plage couvrant les colonnes A à C et les lignes 1 à 5.

| Type de référence | Syntaxe | Description |
| -------------- | ------ | ----------- |
| Cellule relative | `A1` | S'ajuste lorsque la formule est copiée vers une autre cellule |
| Cellule absolue | `$A$1` | Fait toujours référence à la même cellule |
| Colonne absolue, ligne relative | `$A1` | La colonne reste fixe ; la ligne s'ajuste |
| Colonne relative, ligne absolue | `A$1` | La ligne reste fixe ; la colonne s'ajuste |
| Plage | `A1:C5` | Toutes les cellules de A1 à C5 |

### Références entre feuilles {#cross-sheet-references}

Vous pouvez référencer directement des données provenant d'autres onglets du même tableur dans vos formules. Utilisez le nom de la feuille suivi d'un point d'exclamation et de la cellule ou de la plage :

```
='My Table'!A1
='Summary'!B2:B20
```

Pour référencer une colonne spécifique d'un onglet **Tableau** par son nom, utilisez la notation `#` :

```
='Error Logs'#"duration_ms"
='Table 1'#"status"
```

Par exemple, `=SUM('Error Logs'#"duration_ms")` additionne chaque valeur de la colonne `duration_ms` de votre tableau Error Logs.

### Formules {#formulas}

Les formules de feuille prennent en charge toutes les fonctions répertoriées sur la page [Fonctions et opérateurs][3], ainsi que des fonctions de recherche, statistiques, financières et autres disponibles uniquement dans les feuilles. Consultez la section [Fonctions de feuille][21] pour obtenir la liste complète.

#### Exemples {#examples}

**Agréger une colonne de tableau dans une feuille**

Additionnez toutes les valeurs de la colonne `duration_ms` d'un onglet de tableau appelé « Error Logs » :

```
=SUM('Error Logs'#"duration_ms")
```

Comptez combien de lignes dans ce tableau contiennent `status = "error"` :

```
=COUNTIF('Error Logs'#"status","error")
```

**Recherche sécurisée avec une valeur de repli**

Recherchez l'équipe d'un utilisateur à partir d'une Reference Table, en renvoyant « unknown » s'il n'est pas trouvé :

```
=IFNA(VLOOKUP(A2,'User Directory'!A:B,2,0),"unknown")
```

**Jours depuis un incident**

Calculez depuis combien de temps un incident a été ouvert, étant donné un horodatage en A2 :

```
=DATEDIF(A2,TODAY(),"D")&" days ago"
```

**Latence p95 à partir d'un tableau**

Extrayez le 95e centile des temps de réponse à partir d'un tableau connecté :

```
=PERCENTILE('APM Data'#"duration",0.95)
```

**Classez une valeur en différentes catégories de gravité.**

```
=IFS(A2>500,"critical",A2>200,"warn",A2>0,"ok",TRUE,"no data")
```

**Mensualité de prêt**

Calculez la mensualité d'un prêt de 50 000 $ à un taux d'intérêt annuel de 6 % sur 3 ans :

```
=PMT(0.06/12,36,-50000)
```

### Valeurs d'erreur {#error-values}

| <span style="min-width:80px;display:block">Erreur</span> | Cause | Comment gérer |
| -------------------- | ----- | ------------- |
| `#DIV/0!` | Division par zéro | `=IFERROR(A1/B1,0)` |
| `#VALUE!` | Type d'argument incorrect ; par exemple, du texte transmis à une fonction mathématique | Vérifiez les types d'entrée |
| `#NUM!` | Valeur numérique non valide ; par exemple, `SQRT(-1)` | Validez les entrées avec `IF` |
| `#N/A` | Valeur introuvable ; par exemple, un échec `VLOOKUP` | `=IFNA(VLOOKUP(...),"not found")` |
| `#REF!` | Référence à une cellule qui n'existe plus | Mettez à jour la formule |
| `#NAME?` | Nom de fonction non reconnu | Vérifiez l'orthographe |
| `#ERROR!` | La formule n'a pas pu être analysée | Vérifiez la syntaxe |

### Formatage des cellules {#cell-formatting}

Les cellules peuvent être formatées en texte brut, nombre, pourcentage, devise (USD ou EUR) ou date/heure. Le formatage affecte la façon dont les valeurs sont affichées, mais pas la valeur sous-jacente utilisée dans les calculs.

### Limites {#limits}

Sheets présente des limites suivantes concernant le nombre de lignes et de colonnes :

| Dimension | Par défaut | Maximum |
| --------- | ------- | ------- |
| Lignes | 1 000 | 2 000 |
| Colonnes | 26 | 52 |

## Sources de données prises en charge {#supported-data-sources}

{{< callout url="https://www.datadoghq.com/product-preview/additional-advanced-querying-data-sources/" header="Sources de données avancées">}}
Si vous souhaitez interroger des sources de données non encore disponibles, utilisez ce formulaire pour soumettre votre demande.
{{< /callout >}}

Créez des tableaux et analysez les données extraites des sources de données suivantes :

| Source de données          | Page produit       |
| -------------------- | -----------        |
| APM Spans            | [APM Explorer][18] |
| Audit Trail          | [Audit Trail][15] |
| CI Pipelines         | [CI Visibility][17] |
| Cloud Cost           | [Cloud Cost Analytics][5] |
| Database Queries     | [Database Monitoring][16] |
| Events               | [Event Management][14] |
| Infrastructure       | [Host List][6] |
| Agent Observability    | [Agent Observability][13] |
| Logs                 | [Logs Explorer][2] |
| Métriques              | [Metrics Explorer][7] |
| Product Analytics    | [Product Analytics Events][20] |
| Real User Monitoring | [RUM Explorer][8]  |
| Reference Tables     | [Reference Tables][9] |
| Security Findings    | [Cloud Security][12] |
| Security Signals     | [Security][11] |

## Configuration d'une feuille de calcul {#configuring-a-spreadsheet}

### Autorisations{#permissions}

Par défaut, tous les utilisateurs ont un accès complet aux feuilles de calcul.

Utilisez des contrôles d'accès granulaires pour limiter les [roles][10] pouvant modifier une feuille de calcul particulière :
1. Lors de la consultation d'une feuille de calcul, cliquez sur la roue dentée en haut à droite. Le menu des paramètres s'ouvre.
1. Sélectionnez {{< ui >}}Permissions{{< /ui >}}.
1. Cliquez sur {{< ui >}}Restrict Access{{< /ui >}}. La boîte de dialogue se met à jour pour indiquer que les membres de votre organisation ont un accès {{< ui >}}Viewer{{< /ui >}} par défaut.
1. Utilisez le menu déroulant pour sélectionner un ou plusieurs rôles, équipes ou utilisateurs pouvant modifier la feuille de calcul.
2. Cliquez sur {{< ui >}}Add{{< /ui >}}. La boîte de dialogue se met à jour pour indiquer que le rôle que vous avez sélectionné dispose de l'autorisation {{< ui >}}Editor{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

**Remarque :** Pour conserver votre accès en modification à la feuille de calcul, vous devez inclure au moins un rôle dont vous êtes membre avant d'enregistrer.

Vous devez disposer d'un accès en modification pour rétablir l'accès général à une feuille de calcul restreinte. Effectuez les étapes suivantes :
1. Pendant que vous consultez la feuille de calcul, cliquez sur la roue dentée en haut à droite. Le menu des paramètres s'ouvre.
1. Sélectionnez {{< ui >}}Permissions{{< /ui >}}.
1. Cliquez sur {{< ui >}}Restore Full Access{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/sheets
[2]: https://app.datadoghq.com/logs
[3]: /fr/sheets/functions_operators
[4]: https://docs.datadoghq.com/fr/integrations/guide/reference-tables/?tab=manualupload
[5]: https://app.datadoghq.com/cost
[6]: https://app.datadoghq.com/infrastructure/
[7]: https://app.datadoghq.com/metric/explorer
[8]: https://app.datadoghq.com/rum/sessions
[9]: https://app.datadoghq.com/reference-tables
[10]: /fr/account_management/rbac/
[11]: https://app.datadoghq.com/security
[12]: https://app.datadoghq.com/security/compliance
[13]: https://app.datadoghq.com/llm/applications
[14]: https://app.datadoghq.com/event/explorer
[15]: https://app.datadoghq.com/audit-trail
[16]: https://app.datadoghq.com/databases/queries
[17]: https://app.datadoghq.com/ci/pipelines
[18]: https://app.datadoghq.com/apm/traces
[19]: https://www.datadoghq.com/product-preview/additional-advanced-querying-data-sources/
[20]: https://app.datadoghq.com/product-analytics/events
[21]: /fr/sheets/functions_operators#functions