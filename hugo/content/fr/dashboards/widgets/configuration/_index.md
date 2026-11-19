---
description: Découvrez comment configurer les widgets dans les dashboards Datadog,
  notamment les options pour le plein écran, les liens personnalisés, les informations
  sur les métriques et les remplacements d'unités.
further_reading:
- link: /dashboards/widgets/
  tag: Documentation
  text: Vue d'ensemble des widgets
- link: /dashboards/widgets/types
  tag: Documentation
  text: Types de widgets
title: Configuration des widgets
---
## Présentation {#overview}

La configuration des widgets est essentielle pour créer des dashboards efficaces qui fournissent des informations pertinentes sur votre infrastructure et vos applications. Ce guide couvre les principales options de configuration et les points à prendre en compte lors de la configuration des widgets.


## Plein écran {#full-screen}

Le mode plein écran offre des capacités de visualisation et d'analyse améliorées pour vos widgets. Vous pouvez afficher la plupart des widgets en mode plein écran et effectuer les actions suivantes :

* Modifier les plages temporelles
* Avancer ou reculer selon la plage temporelle sélectionnée
* Mettre le graphique en pause à l'heure actuelle ou afficher le graphique en temps réel
* Réinitialiser la plage temporelle
* Exporter le graphique vers un dashboard, un notebook ou copier la requête
* Télécharger les données générant le graphique au format CSV

Pour accéder directement à la vue d'ensemble du widget, cliquez sur le bouton plein écran dans le coin supérieur droit du widget.

Des options supplémentaires sont disponibles pour les [widgets de série temporelle][1].

## Aperçu des données {#data-preview}

Vous pouvez combiner plusieurs sources de données dans l'éditeur de graphique pour enrichir vos visualisations avec du contexte et des métadonnées supplémentaires. Avec Data Preview, vous pouvez voir quelles données vous combinez et vérifier si la requête fonctionne comme prévu. Cette fonctionnalité vous aide à :

- Confirmer la structure des données et les noms des colonnes
- Identifier les clés correspondantes
- Valider les résultats avant d'exécuter la requête complète

{{% collapse-content title="Exemple" level="h3" expanded=false %}}
Vous pouvez joindre vos journaux de paiement à un tableau de référence (tableau de recherche) contenant les détails des produits pour afficher le prix de vente ou la date de sortie à côté des données de transaction. Ou bien, vous pouvez enrichir les données de session RUM en les joignant à des informations client provenant d'une source externe, telle que Salesforce ou Snowflake, pour segmenter les utilisateurs par niveau de client.

Les sources de données prises en charge pour les jointures incluent (sans s'y limiter) :

- Logs
- Métriques
- RUM
- Cloud Cost Recommendations
- Netflow
- APM Spans
- APM Traces
- Profiles
- Synthetics CI Batches
- Synthetics Run
- Static Analysis
- Tests CI
- Compliance Findings
- Product Analytics
- Tableaux de référence

L'utilisation de jointures et d'aperçus de données facilite la sélection des champs appropriés et l'enrichissement de vos graphiques avec des détails pertinents, améliorant ainsi la qualité et l'utilité de vos dashboards.


{{% /collapse-content %}}

## Liens personnalisés {#custom-links}

Les liens personnalisés améliorent l'interaction avec les données en connectant les valeurs des données des widgets à des URL pertinentes, telles que les pages Datadog ou votre console AWS.

Pour personnaliser les interactions avec les données dans vos widgets génériques, consultez [Context Links][2].

## Descriptions de widget {#widget-descriptions}

Les descriptions de widget vous permettent d'ajouter une description textuelle à n'importe quel widget de dashboard. Utilisez des descriptions pour fournir du contexte sur une métrique, comme ce qu'elle représente, comment l'interpréter ou quelle action entreprendre.

Pour ajouter une description :
1. Ouvrez l'éditeur de graphique pour le widget.
2. Saisissez une **Description** en bas de l'éditeur.
3. Cliquez sur **Save**.

Après l'enregistrement, survolez l'icône de description dans le coin supérieur gauche du widget pour afficher la description.

{{< img src="dashboards/widgets/configuration/widget-description-hover.png" alt="Un widget de graphique à barres intitulé « Avg CPU User % by Service (Top 10) » avec le curseur survolant l'icône de description dans le coin supérieur gauche, affichant l'infobulle de description au-dessus du widget." >}}

## Informations sur les métriques {#metrics-info}

Sur un graphique de métriques, cliquez sur le menu contextuel (trois points verticaux) pour trouver l'option {{< ui >}}Metrics Info{{< /ui >}}. Cela ouvre un panneau avec une description de la métrique. Cliquez sur le nom de la métrique dans ce panneau pour l'ouvrir sur la page Metrics Catalog afin de l'analyser ou de la modifier.

## Remplacement d'unité {#unit-override}

Les remplacements d'unité sont une option d'affichage clé qui vous permet de personnaliser la façon dont les valeurs de données sont présentées sur les widgets, ajoutant un contexte significatif à vos données. Pour plus de cas d'utilisation et d'informations, consultez la section [Personnalisez vos visualisations avec des remplacements d'unité][3].
- {{< ui >}}Unit override{{< /ui >}} : choisissez d'afficher les unités dans la famille « mémoire » et laissez Datadog se charger d'afficher l'échelle appropriée en fonction des données (comme les mégaoctets ou les gigaoctets).
- {{< ui >}}Unit and scale override{{< /ui >}} : fixez les unités à une seule échelle (affichez les données en mégaoctets quelle que soit la valeur).
- {{< ui >}}Define custom units{{< /ui >}} : définissez des unités entièrement personnalisées (comme « tests » au lieu d'une unité de comptage générique).

Ce n'est pas une alternative à l'attribution d'unités à vos données.
{{< whatsnext desc="Définissez les unités au niveau de l'organisation : ">}}
    {{< nextlink href="/metrics/units/">}} Définir les unités des métriques{{< /nextlink >}}
    {{< nextlink href="/logs/explorer/facets/#units">}} Définir les unités pour les requêtes basées sur les événements{{< /nextlink >}}
{{< /whatsnext >}}

## Sélecteur de temps global {#global-time-selector}

Le sélecteur de temps global est une option de configuration temporelle fondamentale qui synchronise tous les widgets d'un dashboard pour utiliser la même période. Pour utiliser le sélecteur de temps global, au moins un widget basé sur le temps doit être configuré pour utiliser `Global Time`. Effectuez la sélection dans l'éditeur de widget, sous {{< ui >}}Set display preferences{{< /ui >}}, ou ajoutez un widget (le temps global est le paramètre temporel par défaut).

Le sélecteur de temps global définit la même période pour tous les widgets utilisant l'option `Global Time` sur le même dashboard. Sélectionnez une fenêtre mobile dans le passé (par exemple, `Past 1 Hour` ou `Past 1 Day`) ou une période fixe avec l'option `Select from calendar…` ou [saisissez une période personnalisée][8]. Si une fenêtre mobile est choisie, les widgets sont mis à jour au fur et à mesure que la fenêtre temporelle avance.

Les widgets non liés au temps global affichent les données correspondant à leur période locale, appliquée à la fenêtre globale. Par exemple, si le sélecteur de temps global est réglé sur la période allant du 2019-01-01 au 2019-01-02, un widget réglé sur la période locale `Past 1 Minute` affiche la dernière minute du 2019-01-02, à partir de 23 h 59.

## Copier et coller des widgets {#copy-and-paste-widgets}

La fonctionnalité de copier-coller est une fonction clé de partage et de collaboration qui vous permet de réutiliser des widgets dans différents contextes Datadog et outils externes.

<div class="alert alert-info">Pour partager des widgets en dehors de Datadog avec des aperçus de liens, un administrateur doit définir <a href="https://app.datadoghq.com/organization-settings/public-sharing/settings"><strong>Widget Share URLs</strong></a> sur Public ou Private dans Organization Settings. Les administrateurs peuvent désactiver ce paramètre pour empêcher les utilisateurs de générer des liens de partage et des aperçus de widgets.</div>

Les widgets peuvent être copiés depuis les [Dashboards][4], les [Notebooks][5], la page [APM Service][6] et la page [APM resource][7] à l'aide de <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>C</kbd>, ou en sélectionnant l'icône de partage et en choisissant « Copy ».

Les widgets copiés peuvent être collés dans Datadog en utilisant <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd> :

* **Dashboards** : Ajoute un nouveau widget positionné sous le curseur de votre souris.
* **Notebooks** : Ajoute une nouvelle cellule à la fin du notebook.

Vous pouvez également coller le widget dans votre programme de chat favori qui affiche des aperçus de liens (comme Slack ou Microsoft Teams). Selon le mode Widget Share URLs de votre organisation, une image d'aperçu publique de votre graphique ou une image d'aperçu privée dans Slack s'affiche, accompagnée d'un lien direct vers votre widget. Pour plus d'informations, consultez [Widget Share URLs][11].

## Groupes de widgets {#groups-of-widgets}

Copiez les widgets de groupe de Timeboard en survolant la zone du widget de groupe et en utilisant <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>C</kbd> ou en sélectionnant l'icône de partage et en choisissant « Copy ».

**Remarque** : Lorsque vous collez des graphiques dans un screenboard ou un notebook, Datadog colle chaque widget du groupe individuellement.

Pour copier plusieurs widgets de screenboard (mode édition uniquement), maintenez <kbd>Shift</kbd> enfoncée et cliquez sur les widgets, puis utilisez <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>C</kbd>.

**Remarque** : Cela ne fonctionne que lors d'un partage au sein de Datadog. Cela ne génère pas d'image d'aperçu.

## Menus des graphiques de widget {#widget-graph-menus}

Les menus des graphiques de widget offrent des options essentielles d'interaction avec les données. Survolez un graphique avec votre curseur pour accéder aux options de menu suivantes.

### View in full screen {#view-in-full-screen}

Affichez le graphique en [mode plein écran](#full-screen).

### Exporter {#export}

Cliquez sur l'icône d'exportation de n'importe quel graphique de dashboard pour ouvrir un menu d'options :

| Option         | Description                               |
|----------------|-------------------------------------------|
| Copy           | Créez une copie du graphique du dashboard.     |
| Share snapshot | Créez et envoyez une capture de votre graphique. |

#### Use within Datadog {#use-within-datadog}

| Option           | Description                                        |
|------------------|----------------------------------------------------|
| Declare incident | Déclarez un incident à partir du graphique.                |
| Add to incident  | Ajoutez le graphique à un incident existant.             |
| Create case      | Créez un cas à partir du graphique.                      |
| Save to notebook | Enregistrez le graphique dans un notebook.                      |
| Link to widget   | Copiez un lien vers le widget dans votre presse-papiers. |

#### Share externally {#share-externally}

| Format          | Description                        |
|-----------------|------------------------------------|
| Download as PNG | Téléchargez le widget au format PNG. |
| Download as SVG | Téléchargez le widget au format SVG. |
| Download as CSV | Téléchargez le widget au format CSV. Consultez la section [Exporter les données du widget au format CSV](#export-widget-data-to-csv). |

### Edit {#edit}

Cliquez sur l'icône en forme de crayon de n'importe quel graphique du dashboard pour effectuer des modifications.

### Options supplémentaires {#additional-options}

Cliquez sur le menu contextuel (trois points verticaux) de n'importe quel graphique du dashboard pour ouvrir un menu d'options :

| Option                            | Description                                                                                                                |
|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| Edit                              | Modifiez le graphique.                                                                                                            |
| Clone                             | Créez une copie du graphique à côté de celui-ci.                                                                                      |
| Graphique scindé                       | Créez un [graphique scindé][10].                                                                                                |
| Create custom links               | Créez des [liens personnalisés](#custom-links).                                                                                      |
| Create monitor                    | Créez un monitor préconfiguré avec la requête du graphique.                                                                     |
| Metrics info (metric graphs only) | Obtenez une description des métriques de ce graphique. Vous pouvez cliquer sur les noms des métriques pour les ouvrir sur la page Metrics Catalog. |
| Delete                            | Supprimez le graphique.                                                                                                          |

## Exporter les données du widget au format CSV {#export-widget-data-to-csv}

Pour télécharger les données sous-jacentes à un seul widget sous forme de fichier CSV, cliquez sur l'icône d'exportation du widget et sélectionnez {{< ui >}}Download as CSV{{< /ui >}}. Vous pouvez également télécharger les données CSV lorsque vous affichez le widget en [mode plein écran](#full-screen).

L'export CSV est disponible pour les types de widgets suivants :

* Bar Chart
* List
* Pie Chart
* Scatter Plot
* Tableau
* Série temporelle
* Top list
* Treemap

**Remarque** : l'export CSV fonctionne sur un widget à la fois. Vous ne pouvez pas exporter les données de tous les widgets d'un dashboard dans un seul fichier.

L'export CSV est activé par défaut. Si {{< ui >}}Download as CSV{{< /ui >}} n'apparaît pas pour un widget pris en charge, Datadog Support a peut-être désactivé l'export CSV pour votre organisation. Cette restriction s'applique à tous les utilisateurs de l'organisation, ainsi qu'à l'export CSV dans les autres produits Datadog et dans les widgets des dashboards. Vous ne pouvez pas modifier ce paramètre depuis l'interface utilisateur de Datadog. Pour désactiver ou réactiver l'export CSV, contactez [Datadog Support][12].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/widgets/timeseries/#full-screen
[2]: /fr/dashboards/guide/context-links/
[3]: /fr/dashboards/guide/unit-override
[4]: /fr/dashboards/
[5]: /fr/notebooks/
[6]: /fr/tracing/services/service_page/
[7]: /fr/tracing/services/resource_page/
[8]: /fr/dashboards/guide/custom_time_frames/
[10]: /fr/dashboards/widgets/split_graph/
[11]: /fr/dashboards/sharing/widget_public_urls/
[12]: /fr/help/