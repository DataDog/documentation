---
title: Template variables
kind: documentation
aliases:
  - /fr/graphing/dashboards/template_variables/correlate-metrics-and-events-using-dashboard-template-variables
  - /fr/graphing/dashboards/template_variables/how-do-i-overlay-events-onto-my-dashboards
  - /fr/graphing/dashboards/template_variables/
further_reading:
  - link: /dashboards/
    tag: Documentation
    text: Créer des dashboards dans Datadog
  - link: /dashboards/sharing/
    tag: Documentation
    text: Partager vos graphiques en dehors de Datadog
  - link: /dashboards/widgets/
    tag: Documentation
    text: Découvrir les widgets disponibles pour votre dashboard
---
Les template variables vous permettent de filtrer un ou plusieurs widgets de façon dynamique dans un dashboard.

## Création

Pour créer votre première template variable dans un dashboard, cliquez sur **Add Template Variables**. Si des template variables ont déjà été définies, cliquez sur l'icône en forme de *crayon* pour ouvrir l'éditeur de template variables. Une fois dans l'éditeur, cliquez sur **Add Variable +** pour ajouter une template variable.

Une template variable est définie par les éléments suivants :

* **Name** : un nom unique pour la template variable. Ce nom est utilisé pour filtrer le contenu de votre dashboard.
* **Tag or Attribute** :
    * Tag : si vos tags respectent le [format recommandé][1] (`<KEY>:<VALUE>`), le *Tag* est la `<KEY>`.
    * Attribute : utilisez une [facette ou une mesure comme template variable](#requetes-rum-d-apm-et-de-log).
* **Default Value** :
    la valeur par défaut pour le tag ou l'attribut de votre template variable.

Une fois votre template variable créée, Datadog affiche le nombre de sources qui utilisent cette variable. Dans l'exemple ci-dessous, la template variable est utilisée dans l'un des deux graphiques :

{{< img src="dashboards/template_variables/stats_tv.png" alt="Utilisation de la TV" style="width:85%;">}}

[Utilisez les template variables](#utilisation) dans des widgets individuels ou cliquez sur l'option **Add to All**. Pour supprimer une template variable de tous les widgets, cliquez sur l'option **Remove From All**.

### Requêtes RUM, d'APM et de log

Étant donné que les métriques, les logs, l'APM et RUM partagent les mêmes tags, les template variables peuvent être utilisées dans les widgets basés sur des requêtes RUM, d'APM et de log.
De plus, il est possible de définir des template variables RUM, de log ou d'APM basées sur vos facettes [RUM][3], de [log][2] ou d'APM. Ces template variables commencent par le caractère `@`, par exemple : `@http.status_code`.

**Remarque** : le bouton **Add to all** permet d'ajouter ce type de template variable à l'ensemble des widgets basés sur des requêtes RUM, d'APM et de log.

### Vues enregistrées

#### Création

{{< img src="dashboards/template_variables/default_view.png" alt="Vue enregistrée par défaut" style="width:85%;">}}

Chaque dashboard affiche un menu déroulant *(Default Value)* à gauche des template variables. Lorsque vous modifiez la valeur d'une template variable, celle-ci n'est pas automatiquement enregistrée en tant que nouvelle vue. 
Pour enregistrer les valeurs actuelles des template variables dans une nouvelle vue, cliquez sur le menu déroulant et sélectionnez *Save selections as view*. Vous serez alors invité à donner un nom unique à votre vue. Une fois enregistrée, la vue est ajoutée au menu déroulant. Cliquez dessus pour rétablir les valeurs de template variables précédemment enregistrées.

#### Delete

Pour supprimer une vue, cliquez sur le menu déroulant des vues enregistrées et sélectionnez *Manage views...*. Une fenêtre contenant chacune de vos vues enregistrées avec une icône en forme de corbeille s'affiche alors. Cliquez sur la corbeille appropriée pour supprimer la vue correspondante.

{{< img src="dashboards/template_variables/manage_views.png" alt="Fenêtre Manage Views" style="width:75%;">}}

#### Modification

Pour modifier la vue *(Default Value)*, cliquez sur l'icône en forme de crayon et modifiez les valeurs de template variable. Cliquez ensuite sur *Done* pour enregistrer vos modifications. Si une ou plusieurs valeurs dans les autres vues ont été modifiées, enregistrez les valeurs dans une nouvelle vue et supprimez la vue initiale.

## Utilisation

Les templates variables peuvent être utilisées dans les widgets et dans les recherches d'événements à superposer.

### Widgets

Lorsque vous créez ou modifiez un widget, les template variables existantes s'affichent en tant qu'options dans le champ `from`. Par exemple, si vous créez la template variable `env`, l'option `$env` est alors disponible.

Une fois le widget enregistré, la valeur de la template variable est sélectionnée en haut de votre dashboard :

{{< img src="dashboards/template_variables/selecting_template_variables.png" alt="Sélection d'une template variable" style="width:75%;">}}

#### Texte

Pour les widgets à base de texte, vous avez la possibilité d'afficher le nom et la valeur d'une template variable avec `$<NOM_TEMPLATE_VARIABLE>`, ou la valeur uniquement avec `$<NOM_TEMPLATE_VARIABLE>.value`. Par exemple, si votre template variable s'intitule `env` et que sa valeur sélectionnée est `dev` :

* `$env` affiche `env:dev`
* `$env.value` affiche `dev`

### Superposition d'événements

Les template variables peuvent être utilisées lorsque vous recherchez des [événements à superposer][4] afin de trouver des événements qui partagent certains tags avec les métriques de votre dashboard. Les événements à superposer sont appliqués à l'ensemble d'un graphique individuel.

Les valeurs des template variables de dashboard peuvent être directement récupérées en utilisant la syntaxe `$<CLÉ_TEMPLATE_VARIABLE>.value` dans le champ de recherche d'événement.

**Remarque** : les template variables de dashboard doivent être des tags de métrique et non des tags d'événement.

#### Dashboard

Pour rechercher des événements à l'aide de template variables depuis votre dashboard, utilisez le format suivant :

```text
tags:<CLÉ_TAG>:$<NOM_TEMPLATE_VARIABLE>.value
```

Par exemple, si vous recherchez `tags:region:$region.value` et que la valeur sélectionnée pour la template variable `region` est `us-east1`, vous obtenez les événements associés au tag `region:us-east1`. Les barres roses sur les graphiques indiquent à quel moment les événements se sont produits.

Utilisez des virgules pour effectuer une recherche à partir de plusieurs template variables. Exemple : `tags:role:$role.value,env:$env.value`

**Remarque** : après avoir validé votre recherche avec *Entrée*, `$region.value` est remplacé par la valeur sélectionnée dans le menu déroulant de la template variable.

#### Widgets

Depuis un widget, utilisez les template variables pour visualiser à quel moment les événements se sont produits. Le format à appliquer est le suivant :

```text
tags:$<NOM_TEMPLATE_VARIABLE>
```

Par exemple, essayez d'entrer `tags:$region` dans la barre de recherche d'événements à superposer. Vous obtenez les événements correspondant à la valeur sélectionnée dans le menu déroulant de la template variable `region`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/#defining-tags
[2]: /fr/logs/explorer/facets/
[3]: /fr/real_user_monitoring/explorer/?tab=facets#setup-facets-measures
[4]: /fr/dashboards/timeboards/#events
