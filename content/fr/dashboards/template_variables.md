---
aliases:
- /fr/graphing/dashboards/template_variables/correlate-metrics-and-events-using-dashboard-template-variables
- /fr/graphing/dashboards/template_variables/how-do-i-overlay-events-onto-my-dashboards
- /fr/graphing/dashboards/template_variables/
further_reading:
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: Blog
  text: Utiliser les template variables associées pour affiner vos dashboards
- link: https://www.datadoghq.com/blog/dynamic-template-variable-syntax-dashboards/
  tag: Blog
  text: Accélérer les workflows de dashboard avec une syntaxe de template variable
    dynamique
- link: https://www.datadoghq.com/blog/template-variable-available-values/
  tag: Blog
  text: Filtrer les dashboards plus rapidement avec les valeurs disponibles pour les
    template variables
- link: /dashboards/
  tag: Documentation
  text: Créer des dashboards dans Datadog
- link: /dashboards/sharing/
  tag: Documentation
  text: Partager vos graphiques en dehors de Datadog
- link: /dashboards/widgets/
  tag: Documentation
  text: Découvrir les widgets disponibles pour votre dashboard
title: Template variables
---

## Présentation

Les template variables vous permettent de filtrer dynamiquement un ou plusieurs widgets dans un dashboard. Vous pouvez créer des vues sauvegardées à partir de vos sélections de template variables afin d'organiser et de parcourir vos visualisations à travers les menus déroulants. 

Une template variable est définie par les éléments suivants :

* **Tag or Attribute** :
    * Tag : si vos tags respectent le [format recommandé][1] (`<KEY>:<VALUE>`), le *Tag* est la `<KEY>`.
    * Attribute : utilisez une [facette ou une mesure comme template variable](#requetes-rum-d-apm-et-de-log).
* **Name** : nom unique de la template variable qui apparaît dans les requêtes sur le dashboard. Le nom des template variables change automatiquement en fonction du tag ou de l'attribut sélectionné.
* **Default Value** : valeur de tag ou d'attribut qui apparaît automatiquement lorsque le dashboard est chargé. Valeur par défaut : `*`.
* **Available Values** : valeurs de tag ou d'attribut pouvant être sélectionnées dans le menu déroulant. Valeur par défaut : `(all)`. La liste de toutes les valeurs disponibles comprend toujours `*`, ce qui permet d'interroger toutes les valeurs du tag ou de l'attribut.

## Ajouter une template variable

Pour ajouter une template variable dans un dashboard :
1. Cliquez sur **Add Variables**. 
1. Si des template variables sont déjà définies, survolez l'en-tête du dashboard et cliquez sur le bouton **Edit** pour entrer en mode édition.
1. En mode édition, cliquez sur l'icône **+ (plus)** pour créer une nouvelle template variable.
1. (Facultatif) Après avoir sélectionné un tag, cliquez sur le bouton **+ Configure Dropdown Values** pour renommer la variable et définir les valeurs par défaut ou disponibles.
  {{< img src="dashboards/template_variables/add_template_variable_configure_dropdown_values.png" alt="Ajouter un popover Variable affichant le bouton Configure Dropdown Values" style="width:80%;" >}}

## Modifier une template variable

Pour modifier une template variable dans un dashboard :
1. Cliquez sur le bouton **Edit** dans lʼen-tête du dashboard
1. En mode édition, cliquez sur une template variable et apportez des modifications dans le popover.
1. Pour réorganiser les variables dans l'en-tête, survolez une variable, puis cliquez sur la poignée de l'icône de déplacement et faites-la glisser.
  {{< img src="dashboards/template_variables/edit_template_variable_drag.png" alt="Popover du mode édition de la template variable, affichant lʼicône de déplacement qui vous permet de réorganiser les éléments" style="width:100%;" >}}

## Appliquer une template variable à des widgets

Pour ajouter une template variable à des requêtes de widgets :
1. Cliquez sur le bouton **Edit** dans lʼen-tête du dashboard
1. En mode édition, cliquez sur une template variable pour ouvrir son popover.
1. Cliquez sur **Select Widgets** pour ouvrir le mode de sélection de widget.
1. La bannière affiche le nombre de sources utilisant la variable. Dans l'exemple ci-dessous, la template variable `env` est utilisée dans 20 graphiques sur le dashboard :
  {{< img src="dashboards/template_variables/apply_template_variable_to_widgets.png" alt="Exemple de dashboard affichant la confirmation pour lʼapplication de la template variable 'env' à 20 widgets" style="width:100%;" >}}
1. Cliquez sur des widgets individuels pour prévisualiser le graphique avec la template variable interpolée.
1. Pour ajouter ou supprimer des informations de tous les widgets d'un groupe, cochez la case située dans le coin droit du groupe.
1. Pour ajouter ou supprimer des informations de tous les widgets du dashboard, cliquez sur **Select All** ou **Deselect All** dans la bannière de sélection.
1. Cliquez sur **Save** ou **X** dans la bannière pour quitter le mode de sélection du widget.

## Vues enregistrées

### Création

Cliquez sur le menu déroulant **Saved Views** à gauche des template variables dans votre dashboard. Lorsque vous mettez à jour une valeur de template variable, la valeur n'est pas automatiquement enregistrée dans une vue.

{{< img src="dashboards/template_variables/saved_views_dropdown_options.png" alt="Options du menu déroulant des éléments enregistrés pour définir les template variables sélectionnées comme vue par défaut ou vue enregistrée" style="width:90%;" >}}

Pour enregistrer les valeurs actuelles de vos template variables dans une vue, sélectionnez **Save selections as view** dans le menu déroulant **Saved Views**. Saisissez un nom unique pour la vue et cliquez sur **Save**. 

La vue que vous avez enregistrée apparaît dans le menu déroulant. Cliquez sur la vue pour récupérer les valeurs des template variables précédemment enregistrées.

### Supprimer

Pour supprimer une vue, cliquez sur le menu déroulant des vues enregistrées et sélectionnez **Manage views...**. Une fenêtre contenant chacune de vos vues enregistrées avec une icône en forme de corbeille s'affiche alors. Cliquez sur la corbeille appropriée pour supprimer la vue correspondante.

### Modification

Pour modifier la vue **Default view**, cliquez sur l'icône en forme de crayon et modifiez les valeurs de template variable. Cliquez ensuite sur **Done** pour enregistrer vos modifications. Si une ou plusieurs valeurs dans les autres vues ont été modifiées, enregistrez les valeurs dans une nouvelle vue et supprimez la vue initiale.

## API

Les templates variables peuvent être utilisées dans les widgets et dans les recherches d'événements à superposer. 

### Requêtes RUM, d'APM et de log

Étant donné que les métriques, les logs, l'APM et RUM partagent les mêmes tags, les template variables peuvent être utilisées dans les widgets basés sur leurs requêtes.
Il est possible de définir des template variables RUM, de log ou d'APM basées sur vos facettes. Ces variables commencent par le caractère `@`, par exemple : `@http.status_code`.

Sur les widgets basés sur des requêtes RUM, APM ou de log, vous pouvez utiliser un wildcard au milieu d'une valeur (par exemple, `eng*@example.com`) ou en utiliser plusieurs dans une valeur (par exemple, `*prod*`).

**Remarque** : le bouton **Add to all** permet d'ajouter ce type de template variable à l'ensemble des widgets basés sur des requêtes RUM, d'APM et de log.

### Tracing distribué

Lorsque vous créez ou modifiez un widget, les template variables existantes s'affichent en tant qu'options dans le champ `from`. Par exemple, si vous configurez la template variable `environment`, l'option `$environment` est alors disponible dans le widget.

{{< img src="dashboards/template_variables/dynamic_template_variable.png" alt="Les template variables peuvent être définies de façon dynamique dans les widgets" style="width:100%;">}}

La sélection de **production** pour la valeur `environment` limite dynamiquement le contexte des widgets avec la variable `$environment` vers lʼenvironnement de production.

Lorsque vous modifiez la valeur d'une template variable, l'URL du dashboard se met à jour pour refléter la nouvelle valeur selon le format suivant : `&tpl_var_<NOM_TEMPLATE_VARIABLE>=<VALEUR_TEMPLATE_VARIABLE>`. Par exemple, si la template variable `$env` d'un dashboard est modifiée et définie sur `prod`, le paramètre d'URL correspondra à `&tpl_var_env=prod`.

Pour inclure la valeur dans la requête, ajoutez-la avec la syntaxe `$<TEMPLATE_VARIABLE_NAME>.value`. Par exemple, avec une template variable nommée `service`, utilisez `env:staging-$service.value`.

Survolez les champs des template variable pour voir d'un coup d'œil les widgets qui utilisent cette variable surlignée sur le dashboard.

#### Template variables associées

Lorsque vous sélectionnez une template variable, les valeurs associées sont affichées en haut du sélecteur. Les valeurs associées sont calculées à partir d'autres template variable sélectionnées sur la page, ce qui permet d'identifier instantanément les valeurs liées sans aucune configuration.

#### Texte

Pour les widgets à base de texte, vous avez la possibilité d'afficher le tag/attribut et la valeur d'une template variable avec `{TX-PL-LABEL}lt;NOM_TEMPLATE_VARIABLE>`, sa clé avec `{TX-PL-LABEL}lt;NOM_TEMPLATE_VARIABLE>.key` ou sa valeur avec `{TX-PL-LABEL}lt;NOM_TEMPLATE_VARIABLE>.value`. Cette valeur peut être précédée par un caractère non alphanumérique et suivie par une espace ou l'un des caractères suivants : `#`, `$`, `%`, `=`, `;`, `"`, `(`, `)`, `[`, `]`, `{`, `}`, `^`, `*`, `+`, `|` et `?`.

**Remarque ** : La syntaxe des caractères génériques n'est pas prise en charge à la suite d'une template variable.

Par exemple, pour une template variable nommée `env` avec le tag/attribut `environment` et la valeur sélectionnée `dev` :
* `$env` affiche `environment:dev`
* `$env.key` affiche `environment`
* `$env.value` affiche `dev`
* `$env*` recherche la valeur exacte `dev*`, PAS `dev{dynamic-wildcard-value}`

### Superposition d'événements

Les template variables peuvent être utilisées lorsque vous recherchez des événements à superposer afin de trouver des événements qui partagent certains tags avec les métriques de votre dashboard. Les événements à superposer sont appliqués à l'ensemble d'un graphique individuel.

Les valeurs des template variables de dashboard peuvent être directement récupérées en utilisant la syntaxe `$<CLÉ_TEMPLATE_VARIABLE>.value` dans le champ de recherche d'événement.

**Remarque** : les template variables de dashboard doivent être des tags de métrique et non des tags d'événement.

#### Dashboard

Pour rechercher des événements à l'aide de template variables depuis votre dashboard, utilisez le format suivant :

```text
<TAG_KEY>:$<TEMPLATE_VARIABLE_NAME>.value
```

Par exemple, si vous recherchez `region:$region.value` et que la valeur sélectionnée pour la template variable `region` est `us-east1`, vous obtenez les événements associés au tag `region:us-east1`. Les barres roses sur les graphiques indiquent à quel moment les événements se sont produits.

Utilisez des virgules pour effectuer une recherche à partir de plusieurs template variables. Exemple : `role:$role.value,env:$env.value`

**Remarque** : après avoir validé votre recherche avec *Entrée*, `$region.value` est remplacé par la valeur dans le menu déroulant de la template variable.

#### Tracing distribué

Depuis un widget, utilisez les template variables pour visualiser à quel moment les événements se sont produits. Le format à appliquer est le suivant :

```text
$<TEMPLATE_VARIABLE_NAME>
```

Par exemple, essayez d'entrer `$region` dans la barre de recherche d'événements à superposer. Vous obtenez les événements correspondant à la valeur sélectionnée dans le menu déroulant de la template variable `region` :

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/#define-tags
[2]: /fr/logs/explorer/facets/
[3]: /fr/real_user_monitoring/explorer/?tab=facets#setup-facets-measures