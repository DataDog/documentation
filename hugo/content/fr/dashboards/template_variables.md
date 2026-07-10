---
aliases:
- /fr/graphing/dashboards/template_variables/correlate-metrics-and-events-using-dashboard-template-variables
- /fr/graphing/dashboards/template_variables/how-do-i-overlay-events-onto-my-dashboards
- /fr/graphing/dashboards/template_variables/
description: Utilisez des variables de modèle pour filtrer dynamiquement les widgets
  du tableau de bord par tags, attributs et facettes pour une exploration des données
  flexible.
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
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: Blog
  text: Concevez des tableaux de bord exécutifs efficaces avec Datadog.
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization
  tag: Blog
  text: 'Optimisation de Datadog à grande échelle : observabilité rentable chez Zendesk.'
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
title: Template variables
---
## Aperçu {#overview}

Les variables de modèle vous permettent de filtrer ou de regrouper dynamiquement les widgets dans un tableau de bord. Vous pouvez créer des vues enregistrées à partir de vos sélections de variables de modèle pour organiser et naviguer dans vos visualisations via les sélections déroulantes.

Une template variable est définie par les éléments suivants :

* {{< ui >}}Tag or Attribute{{< /ui >}} :
    * Tag : Si vous suivez le format de [tagging recommandé][1] (`<KEY>:<VALUE>`), le *Tag* est le `<KEY>`.
    * Attribut : Utilisez une [facette ou mesure comme variable de modèle](#logs-apm-and-rum-queries).
* {{< ui >}}Name{{< /ui >}} : Un nom unique pour la variable de modèle qui apparaît dans les requêtes sur le tableau de bord. Les variables de modèle sont automatiquement nommées d'après le tag ou l'attribut sélectionné.
* {{< ui >}}Default Value{{< /ui >}} : La valeur du tag ou de l'attribut qui apparaît automatiquement lorsque le tableau de bord est chargé. Par défaut, cela correspond à `*`.
* {{< ui >}}Available Values{{< /ui >}} : Les valeurs de tag ou d'attribut disponibles pour sélection dans le menu déroulant. Par défaut, cela correspond à `(all)`. La liste des valeurs disponibles inclut toujours `*`, qui interroge toutes les valeurs du tag ou de l'attribut.

### Valeurs des variables de modèle {#template-variable-values}
Les valeurs des variables de modèle (valeurs disponibles via les menus déroulants des variables de modèle) sont peuplées en fonction des sources utilisées par les widgets dans le tableau de bord. Par exemple, si votre tableau de bord a des widgets interrogeant des journaux, seules les valeurs des journaux sont affichées. Si votre tableau de bord a des widgets interrogeant des journaux, des métriques et du RUM, les valeurs des journaux, des métriques et du RUM sont affichées.

Pour la plupart des sources, les valeurs des variables de modèle sont pertinentes pour le cadre temporel global de votre tableau de bord. Exemple :
- Si le cadre temporel de votre tableau de bord est réglé sur les 15 dernières minutes, seules les valeurs des variables de modèle des 15 dernières minutes sont affichées. 
- Si le cadre temporel de votre tableau de bord est réglé sur le 15 août dernier de 00h00 à 23h59, seules les valeurs de ce cadre temporel sont affichées.

| Source de données                                     | Période de requête de données   |
|--------------------------------------           |---------------------|
| Métriques                                         | Maintenant - 48 heures      |
| Coût du cloud                                      | Maintenant - 48 heures      |
| Toutes les autres sources                               | Cadre temporel du tableau de bord |

**Remarque** : Si vous ne voyez pas le tag ou l'attribut que vous recherchez, cela peut être dû au fait que ces données n'ont pas été récemment signalées à Datadog. De plus, toutes les données interrogées pour les variables de modèle sont soumises à la politique de conservation des données. Pour plus d'informations, voir [Données historiques][4].

### Disposition du tableau de bord {#dashboard-layout}
Pour éviter que les variables n'encombrent l'en-tête, le tableau de bord affiche un petit sous-ensemble. Vous pouvez cliquer sur le bouton **+ N** pour voir les N variables supplémentaires présentes sur votre tableau de bord. 


Si vous avez besoin de voir toutes les variables en même temps en faisant défiler, cliquez sur **Développer les variables de modèle**. 


## Ajouter une variable de modèle {#add-a-template-variable}
Pour ajouter une template variable dans un dashboard :
1. Cliquez sur {{< ui >}}Add Variable{{< /ui >}} (ou {{< ui >}}+{{< /ui >}} s'il y a des variables de modèle existantes)
2. Sélectionnez dans une liste de variables de modèle recommandées ou recherchez le tag spécifique que vous avez en tête.
4. Sélectionnez les widgets auxquels appliquer cette variable de modèle.
6. Cliquez sur {{< ui >}}Save{{< /ui >}}.


### Configurer la variable de modèle {#configure-template-variable}
Lorsque le panneau latéral de la variable de modèle est ouvert, vous pouvez :
* Appliquer (ou retirer) cette variable aux widgets sélectionnés : notez les options {{< ui >}}Select All{{< /ui >}} ou {{< ui >}}Deselect All{{< /ui >}}
* Basculer entre le filtrage et le regroupement
* Modifier le nom d'affichage de la variable (affiché dans l'en-tête et la requête du widget)
* Sélectionner une valeur par défaut dans le menu déroulant
* Aperçu des valeurs du menu déroulant et configuration supplémentaire avec une requête de recherche


## Modifier une variable de modèle {#edit-a-template-variable}
1. Survolez la variable de modèle dans l'en-tête du tableau de bord et cliquez sur **Modifier**. Le panneau latéral de la variable de modèle apparaît.
2. Utilisez les options dans le panneau pour personnaliser la variable ou appliquer la variable à d'autres widgets.


## Vues enregistrées {#saved-views}

### Créer {#create}

1. Cliquez sur le menu déroulant {{< ui >}}Saved Views{{< /ui >}} à gauche des variables de modèle dans votre tableau de bord. Lorsque vous mettez à jour une valeur de variable de modèle, la valeur ne se sauvegarde pas automatiquement dans une vue.
1. Pour enregistrer les valeurs actuelles de vos variables de modèle dans une vue, sélectionnez {{< ui >}}Save selections as view{{< /ui >}} dans le menu déroulant {{< ui >}}Saved Views{{< /ui >}}.
1. Entrez un nom unique pour la vue avec une description optionnelle.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

{{< img src="/dashboards/template_variables/saved_view_create.png" alt="Créez des vues enregistrées en sélectionnant enregistrer les sélections en tant que vue" style="width:100%;" >}}

Votre vue enregistrée apparaît dans le menu déroulant. Cliquez sur la vue pour récupérer les valeurs de variable de modèle que vous avez précédemment enregistrées.

### Supprimer {#delete}

1. Cliquez sur le menu déroulant des vues enregistrées et survolez la vue enregistrée souhaitée.
1. Cliquez sur {{< ui >}}Delete View{{< /ui >}}.

### Modifier {#modify}

Le {{< ui >}}Default view{{< /ui >}} ne peut être modifié qu'en changeant les valeurs par défaut des variables de modèle. Pour modifier la Vue par Défaut :
1. Survolez les modèles.
1. Cliquez {{< ui >}}Edit{{< /ui >}} lorsque le bouton apparaît.
1. Cliquez {{< ui >}}Done{{< /ui >}} pour enregistrer.

Pour modifier les valeurs des variables de modèle pour d'autres vues enregistrées :
1. Sélectionnez la vue enregistrée souhaitée dans le menu déroulant.
1. Modifiez les variables de modèle pour obtenir les nouveaux modèles souhaités.
1. Ouvrez à nouveau le menu déroulant.
1. Cliquez {{< ui >}}Save Changes{{< /ui >}}.

{{< img src="/dashboards/template_variables/saved_views_update_template_variable.png" alt="Modifiez les variables de modèle de vos vues enregistrées" style="width:100%;" >}}

Pour modifier le titre et la description :
1. Survolez la vue enregistrée souhaitée dans le menu déroulant.
1. Cliquez {{< ui >}}Edit{{< /ui >}}.
1. Modifiez le titre ou la description.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

## Utilisation {#usage}

Les templates variables peuvent être utilisées dans les widgets et dans les recherches d'événements à superposer.

### Journaux, APM et requêtes RUM {#logs-apm-and-rum-queries}

Les variables de modèle fonctionnent avec les widgets de journaux, APM et RUM car elles partagent les mêmes tags. Vous pouvez définir des variables de modèle de journaux, APM et RUM en fonction des facettes. Ces variables commencent par `@`, par exemple : `@http.status_code`.

Sur les widgets de journaux, APM et RUM, vous pouvez utiliser des jokers au milieu d'une valeur (par exemple, `eng*@example.com`) ou utiliser plusieurs jokers dans une valeur (par exemple, `*prod*`).

**Remarque** : L'utilisation de {{< ui >}}Add to all{{< /ui >}} pour ce type de variable de modèle ajoute la variable à tous les widgets de journaux, APM et RUM.

### Widgets {#widgets}

Lors de la création ou de la modification d'un widget, les variables de modèle de filtre existantes s'affichent comme options dans le champ `from`, et les variables de modèle de regroupement existantes s'affichent comme options après le champ `by`. Par exemple, si vous configurez la variable de modèle `environment`, l'option `$environment` est disponible en tant que variable dynamique dans le widget.

{{< img src="dashboards/template_variables/dynamic_template_variable.png" alt="La variable de modèle peut être définie dynamiquement dans les widgets." style="width:100%;">}}

Sélectionner **production** pour la valeur `environment` limite dynamiquement les widgets avec la variable `$environment` à l'environnement de production.

Lorsque vous changez la valeur d'une variable de modèle, l'URL du tableau de bord se met à jour pour refléter la valeur de la variable de modèle au format `&tpl_var_<TEMPLATE_VARIABLE_NAME>=<TEMPLATE_VARIABLE_VALUE>`. Par exemple, un tableau de bord avec la variable de modèle `$env` changée en `prod` aurait le paramètre d'URL `&tpl_var_env=prod`.

Pour inclure la valeur dans la requête, ajoutez-la avec la syntaxe `$<TEMPLATE_VARIABLE_NAME>.value`. Par exemple, avec une variable de modèle nommée `service`, utilisez `env:staging-$service.value`.

Survolez les champs des template variable pour voir d'un coup d'œil les widgets qui utilisent cette variable surlignée sur le dashboard.

#### Variables de modèle associées {#associated-template-variables}

Lors de la sélection d'une valeur de variable de modèle, les valeurs associées s'affichent en haut du sélecteur. Les valeurs associées sont calculées à partir d'autres valeurs de variables de modèle sélectionnées sur la page et identifient de manière transparente les valeurs connexes sans aucune configuration.

#### Texte {#text}

Pour les widgets basés sur du texte, vous pouvez afficher le tag/attribut et la valeur d'une variable de modèle avec `$<TEMPLATE_VARIABLE_NAME>`, sa clé avec `$<TEMPLATE_VARIABLE_NAME>.key`, ou sa valeur avec `$<TEMPLATE_VARIABLE_NAME>.value`. Cela peut venir après tout caractère non alphanumérique et peut être suivi d'un espace ou de l'un des caractères suivants : `#`, `$`, `%`, `=`, `;`, `"`, `(`, `)`, `[`, `]`, `{`, `}`, `^`, `*`, `+`, `|` et `?`.

**Remarque** : La syntaxe des jokers n'est pas prise en charge après une variable de modèle.

Par exemple, avec une variable de modèle nommée `env`, avec le tag/attribut `environment`, et avec une valeur sélectionnée de `dev` :
* `$env` affiche `environment:dev`
* `$env.key` affiche `environment`
* `$env.value` affiche `dev`
* `$env*` recherche la valeur exacte `dev*` PAS `dev{dynamic-wildcard-value}`

### Superposition des événements {#events-overlay}

Utilisez la recherche de superposition des événements avec des variables de modèle pour trouver des événements qui partagent certains tags avec les métriques de votre tableau de bord. La recherche de superposition des événements est appliquée à travers un graphique individuel.

Les valeurs des variables de modèle du tableau de bord peuvent être directement capturées en utilisant la syntaxe `$<TEMPLATE_VARIABLE_KEY>.value` dans le champ de recherche d'événements.

**Remarque** : Les variables de modèle du tableau de bord doivent être des tags de métriques, pas des tags d'événements.

#### Dashboard {#dashboard}

Pour rechercher des événements à l'aide de template variables depuis votre dashboard, utilisez le format suivant :

```text
<TAG_KEY>:$<TEMPLATE_VARIABLE_NAME>.value
```

Par exemple, rechercher `region:$region.value` avec une valeur de `us-east1` pour la variable de modèle `region` affiche des événements avec le tag `region:us-east1`. De plus, le timing des événements est marqué par des barres roses dans les graphiques.

Utilisez des virgules pour rechercher en utilisant plusieurs variables de modèle, par exemple : `role:$role.value,env:$env.value`

**Remarque** : Une fois que vous appuyez sur *enter* pour rechercher, `$region.value` se met à jour avec la valeur dans le menu déroulant de la variable de modèle.

#### Widgets {#widgets-1}

Depuis un widget, utilisez les template variables pour visualiser à quel moment les événements se sont produits. Utilisez le format suivant :

```text
$<TEMPLATE_VARIABLE_NAME>
```

Par exemple, entrez `$region` dans la boîte de recherche des superpositions d'événements. Cela recherche des événements avec la valeur dans le menu déroulant de la variable de modèle `region`.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/#define-tags
[2]: /fr/logs/explorer/facets/
[3]: /fr/real_user_monitoring/explorer/?tab=facets#setup-facets-measures
[4]: /fr/dashboards/faq/historical-data/