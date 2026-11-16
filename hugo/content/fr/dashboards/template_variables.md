---
aliases:
- /fr/graphing/dashboards/template_variables/correlate-metrics-and-events-using-dashboard-template-variables
- /fr/graphing/dashboards/template_variables/how-do-i-overlay-events-onto-my-dashboards
- /fr/graphing/dashboards/template_variables/
description: Utilisez des variables de modèle pour filtrer dynamiquement les widgets
  de dashboard par tags, attributs et facettes pour une exploration flexible des données.
further_reading:
- link: /dashboards/
  tag: Documentation
  text: Créer des dashboards dans Datadog
- link: /dashboards/sharing/
  tag: Documentation
  text: Partager vos graphiques en dehors de Datadog
- link: /dashboards/widgets/
  tag: Documentation
  text: Découvrir les widgets disponibles pour votre Dashboard
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: Blog
  text: Concevez des dashboards exécutifs efficaces avec Datadog
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization
  tag: Blog
  text: 'Optimisation de Datadog à grande échelle : une observabilité économique chez
    Zendesk'
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: Blog
  text: Utiliser les variables de modèle associées pour affiner vos dashboards
- link: https://www.datadoghq.com/blog/dynamic-template-variable-syntax-dashboards/
  tag: Blog
  text: Accélérer les workflows de dashboard avec une syntaxe de variable de modèle
    dynamique
- link: https://www.datadoghq.com/blog/template-variable-available-values/
  tag: Blog
  text: Filtrer les dashboards plus rapidement avec les valeurs disponibles pour les
    variables de modèle
title: Variables de modèle
---
## Présentation {#overview}

Les variables de modèle vous permettent de filtrer ou de regrouper dynamiquement des widgets dans un dashboard. Vous pouvez créer des vues enregistrées à partir de vos sélections de variables de modèle pour organiser et naviguer dans vos visualisations via les sélections du menu déroulant.

Une variable de modèle est définie par les éléments suivants :

* {{< ui >}}Tag or Attribute{{< /ui >}} :
    * Tag : Si vous suivez le [format de tagging][1] recommandé (`<KEY>:<VALUE>`), le *tag* est le `<KEY>`.
    * Attribut : Utilisez une [facette ou une mesure comme variable de modèle](#logs-apm-and-rum-queries).
* {{< ui >}}Name{{< /ui >}} : Un nom unique pour la variable de modèle qui apparaît dans les requêtes sur le dashboard. Les variables de modèle sont automatiquement nommées d'après le tag ou l'attribut sélectionné.
* {{< ui >}}Default Value{{< /ui >}} : La valeur de tag ou d'attribut qui apparaît automatiquement lors du chargement du dashboard. Par défaut sur `*`.
* {{< ui >}}Available Values{{< /ui >}} : Les valeurs de tag ou d'attribut disponibles pour la sélection dans le menu déroulant. Par défaut sur `(all)`. La liste des valeurs disponibles inclut toujours `*`, qui interroge toutes les valeurs du tag ou de l'attribut.

### Valeurs de variable de modèle {#template-variable-values}
Les valeurs de variable de modèle (valeurs disponibles via les menus déroulants de variable de modèle) sont renseignées en fonction des sources utilisées par les widgets du dashboard. Par exemple, si votre dashboard contient des widgets interrogeant des logs, seules les valeurs issues des logs sont affichées. Si votre dashboard contient des widgets interrogeant des logs, des métriques et RUM, les valeurs issues des logs, des métriques et de RUM sont affichées.

Pour la plupart des sources, les valeurs de variable de modèle sont pertinentes par rapport à la période globale de votre dashboard. Exemple :
- Si la période de votre dashboard est définie sur les 15 dernières minutes, seules les valeurs de variable de modèle des 15 dernières minutes sont affichées. 
- Si la période de votre dashboard est définie sur le 15 août dernier de 00h00 à 23h59, seules les valeurs de cette période sont affichées.

| Source de données                                     | Période de requête des données   |
|--------------------------------------           |---------------------|
| Métriques                                         | Maintenant - 48 heures      |
| Coût du cloud                                      | Maintenant - 48 heures      |
| Toutes les autres sources                               | Période du Dashboard |

**Remarque** : Si vous ne voyez pas le tag ou l'attribut que vous recherchez, c'est peut-être parce que ces données n'ont pas été signalées à Datadog récemment. De plus, toutes les données interrogées pour les variables de modèle sont soumises à la politique de rétention des données. Pour plus d'informations, consultez [Données historiques][4].

### Mise en page du Dashboard {#dashboard-layout}
Pour éviter que les variables n'encombrent l'en-tête, le dashboard en affiche un petit sous-ensemble. Vous pouvez cliquer sur le bouton **+ N** pour voir les N variables supplémentaires présentes sur votre dashboard. 


Si vous avez besoin de voir toutes les variables à la fois pendant que vous faites défiler, cliquez sur **Développer les variables de modèle**. 

## Ajouter une variable de modèle {#add-a-template-variable}
Pour ajouter une variable de modèle dans un dashboard :
1. Cliquez sur {{< ui >}}Add Variable{{< /ui >}} (ou {{< ui >}}\+{{< /ui >}} s'il existe déjà des variables de modèle)
2. Sélectionnez dans une liste de variables de modèle recommandées ou recherchez le tag spécifique que vous avez en tête.
4. Sélectionnez les widgets auxquels appliquer cette variable de modèle.
6. Cliquez sur {{< ui >}}Save{{< /ui >}}.


### Configurer la variable de modèle {#configure-template-variable}
Lorsque le panneau latéral des variables de modèle est ouvert, vous pouvez :
* Appliquer (ou supprimer) cette variable aux widgets sélectionnés (notez les options {{< ui >}}Select All{{< /ui >}} ou {{< ui >}}Deselect All{{< /ui >}})
* Basculer entre le filtrage et le regroupement
* Modifier le nom d'affichage de la variable (affiché dans l'en-tête et la requête du widget)
* Sélectionnez une valeur de menu déroulant par défaut
* Prévisualisez les valeurs du menu déroulant et configurez-les davantage avec une requête de recherche

## Filtre d'équipe {#team-filter}

Une variable de modèle dont la clé de tag est `team` s'affiche sous forme de [filtre d'équipe][5] plutôt que comme un sélecteur de valeur de tag simple. Cela s'applique à la fois aux dashboards et aux notebooks.

Le filtre d'équipe ajoute :

- Une liste couvrant à la fois les équipes Datadog de votre organisation et `team` les valeurs de tag qui n'ont pas d'équipe correspondante.
- Sélection hiérarchique. La sélection d'une équipe sélectionne également les équipes situées en dessous. Maj+clic sur une équipe pour la sélectionner sans ses sous-équipes, ou ses sous-équipes sans l'équipe.
- Recherchez à la fois parmi les identifiants d'équipe et les noms d'affichage d'équipe.

{{< img src="/dashboards/template_variables/team-template-variable.png" alt="En-tête de dashboard où les variables cluster, env et region sont des sélecteurs de valeur simples et la variable team est ouverte en tant que filtre d'équipe." style="width:100%;" >}}

La sélection hiérarchique n'apparaît que lorsque la clé de tag de la variable est `team`. Une variable basée sur toute autre clé de tag s'affiche comme un sélecteur de valeur de tag simple sans notion de hiérarchie d'équipe. Si la variable d'équipe sur un dashboard offre une hiérarchie et que celle sur un autre dashboard ne le fait pas, comparez la clé de tag derrière chaque variable.

Pour une `team` variable, le filtre répertorie chaque équipe de votre organisation. Les valeurs définies dans {{< ui >}}Available Values{{< /ui >}} sont ajoutées à cette liste plutôt que de la restreindre.

### Utilisez le filtre d'équipe avec une clé de tag différente {#use-the-team-filter-with-a-different-tag-key}

Certaines données enregistrent la propriété d'équipe sous une clé de tag autre que `team`, telle que `team_attribution`, `attributes.team` ou `usr.team`. Une variable de modèle définie sur l'une de ces clés vous donne une liste plate de chaînes de tag et aucune hiérarchie.

Pour obtenir une sélection d'équipe hiérarchique pour ces données, définissez la variable de modèle sur la clé de tag `team` et référencez la valeur sélectionnée avec `$team.value` dans chaque requête de widget. La clé de tag de la variable détermine le sélecteur que vous obtenez ; la clé de tag sur laquelle une requête de widget filtre est distincte et n'a pas besoin de correspondre.

1. Ajoutez une variable de modèle avec la clé de tag `team`. Elle s'affiche en tant que filtre d'équipe.
1. Dans chaque requête de widget, filtrez sur la clé de tag que vos données utilisent, et mettez `$team.value` là où la valeur doit aller.

La même substitution fonctionne pour n'importe quelle clé de tag. Écrivez la requête comme vous le feriez normalement, puis remplacez l'identifiant d'équipe par `$team.value` :

| Widget | Requête avec un identifiant d'équipe | Requête avec `$team.value` |
|---|---|---|
| Case Management (`attributes.team`) | `attributes.team:payments-platform` | `attributes.team:$team.value` |
| Cloud Cost (`team_attribution`) | `sum:all.cost{team_attribution:payments-platform}` | `sum:all.cost{team_attribution:$team.value}` |

#### Comment les sélections se résolvent {#how-selections-resolve}

`$team.value` se développe en chaque identifiant d'équipe sélectionné, combiné avec `OR`, en utilisant la clé de tag que vous avez écrite dans la requête. La sélection des équipes `payments-platform` et `payments-fraud` résout les deux exemples ci-dessus en :

```text
attributes.team:(payments-platform OR payments-fraud)
```

```text
sum:all.cost{team_attribution:payments-platform OR team_attribution:payments-fraud}
```

La sélection d'une équipe parente se développe en l'équipe parente et chaque équipe située en dessous, chacune en tant qu'identifiant propre. Une sélection hiérarchique filtre donc vos données sur le même ensemble d'identifiants qu'un widget tagué `team`. La sélection d'une équipe sans ses sous-équipes, ou de ses sous-équipes sans l'équipe, se développe de la même manière. Seuls les identifiants de cette sélection sont inclus.

L'expansion est une liste d'identifiants d'équipe. Pour qu'un widget renvoie des résultats, vos données doivent être taguées avec ces identifiants.

## Modifier une variable de modèle {#edit-a-template-variable}
1. Survolez la variable de modèle dans l'en-tête du dashboard et cliquez sur **Modifier**. Le panneau latéral des variables de modèle s'affiche.
2. Utilisez les options du panneau pour personnaliser la variable ou appliquer la variable à davantage de widgets.


## Vues enregistrées {#saved-views}

### Créer {#create}

1. Cliquez sur le menu déroulant {{< ui >}}Saved Views{{< /ui >}} à gauche des variables de modèle dans votre dashboard. Lorsque vous mettez à jour une valeur de variable de modèle, la valeur ne s'enregistre pas automatiquement dans une vue.
1. Pour enregistrer les valeurs de vos variables de modèle actuelles dans une vue, sélectionnez {{< ui >}}Save selections as view{{< /ui >}} dans le menu déroulant {{< ui >}}Saved Views{{< /ui >}}.
1. Saisissez un nom unique pour la vue avec une description facultative.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

{{< img src="/dashboards/template_variables/saved_view_create.png" alt="Créez des vues enregistrées en sélectionnant enregistrer les sélections en tant que vue" style="width:100%;" >}}

Votre vue enregistrée apparaît dans le menu déroulant. Cliquez sur la vue pour récupérer les valeurs de variable de modèle précédemment enregistrées.

### Supprimer {#delete}

1. Cliquez sur le menu déroulant des vues enregistrées et survolez la vue enregistrée souhaitée.
1. Cliquez sur {{< ui >}}Delete View{{< /ui >}}.

### Modifier {#modify}

La {{< ui >}}Default view{{< /ui >}} ne peut être modifiée qu'en changeant les valeurs par défaut des variables de modèle. Pour modifier la vue par défaut :
1. Survolez les modèles.
1. Cliquez sur {{< ui >}}Edit{{< /ui >}} lorsque le bouton apparaît.
1. Cliquez sur {{< ui >}}Done{{< /ui >}} pour enregistrer.

Pour modifier les valeurs des variables de modèle pour d'autres vues enregistrées :
1. Sélectionnez la vue enregistrée souhaitée dans le menu déroulant.
1. Modifiez les variables de modèle pour obtenir les nouveaux modèles souhaités.
1. Ouvrez à nouveau le menu déroulant.
1. Cliquez sur {{< ui >}}Save Changes{{< /ui >}}.

{{< img src="/dashboards/template_variables/saved_views_update_template_variable.png" alt="Modifiez les variables de modèle de vos vues enregistrées" style="width:100%;" >}}

Pour modifier le titre et la description :
1. Survolez la vue enregistrée souhaitée dans le menu déroulant.
1. Cliquez sur {{< ui >}}Edit{{< /ui >}}.
1. Modifiez le titre ou la description.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

## Utilisation {#usage}

Les variables de modèle peuvent être utilisées dans les widgets et dans les recherches d'événements à superposer.

### Requêtes de logs, APM et RUM {#logs-apm-and-rum-queries}

Les variables de modèle fonctionnent avec les widgets de logs, APM et RUM car ils partagent les mêmes tags. Vous pouvez définir des variables de modèle de logs, APM et RUM basées sur des facettes. Ces variables commencent par `@`, par exemple : `@http.status_code`.

Sur les widgets de logs, APM et RUM, vous pouvez utiliser des caractères génériques au milieu d'une valeur (par exemple, `eng*@example.com`) ou utiliser plusieurs caractères génériques dans une valeur (par exemple, `*prod*`).

**Remarque** : L'utilisation de {{< ui >}}Add to all{{< /ui >}} pour ce type de variable de modèle ajoute la variable à tous les widgets de logs, APM et RUM.

### Widgets {#widgets}

Lors de la création ou de la modification d'un widget, les variables de modèle de filtre existantes s'affichent en tant qu'options dans le champ `from`, et les variables de modèle de regroupement existantes s'affichent en tant qu'options après le champ `by`. Par exemple, si vous configurez la variable de modèle `environment`, l'option `$environment` est disponible en tant que variable dynamique dans le widget.

{{< img src="dashboards/template_variables/dynamic_template_variable.png" alt="La variable de modèle peut être définie dynamiquement dans les widgets" style="width:100%;">}}

La sélection de **production** pour la valeur `environment` limite dynamiquement les widgets avec la variable `$environment` à l'environnement de production.

Lorsque vous modifiez la valeur d'une variable de modèle, l'URL du dashboard se met à jour pour refléter la valeur de la variable de modèle avec le format `&tpl_var_<TEMPLATE_VARIABLE_NAME>=<TEMPLATE_VARIABLE_VALUE>`. Par exemple, un dashboard avec la variable de modèle `$env` modifiée en `prod` aurait le paramètre d'URL `&tpl_var_env=prod`.

Pour inclure la valeur dans la requête, ajoutez-la avec la syntaxe `$<TEMPLATE_VARIABLE_NAME>.value`. Par exemple, avec une variable de modèle nommée `service`, utilisez `env:staging-$service.value`.

Survolez les champs des variables de modèle pour voir d'un coup d'œil les widgets qui utilisent cette variable surlignée sur le dashboard.

#### Variables de modèle associées {#associated-template-variables}

Lors de la sélection d'une valeur de variable de modèle, les valeurs associées sont affichées en haut du sélecteur. Les valeurs associées sont calculées à partir d'autres valeurs de variables de modèle sélectionnées sur la page, et identifient de manière transparente les valeurs liées sans aucune configuration.

#### Texte {#text}

Pour les widgets basés sur du texte, vous pouvez afficher le tag/l'attribut et la valeur d'une variable de modèle avec `$<TEMPLATE_VARIABLE_NAME>`, sa clé avec `$<TEMPLATE_VARIABLE_NAME>.key`, ou sa valeur avec `$<TEMPLATE_VARIABLE_NAME>.value`. Cela peut venir après n'importe quel caractère non alphanumérique, et peut être suivi d'un espace ou de l'un des caractères suivants : `#`, `$`, `%`, `=`, `;`, `"`, `(`, `)`, `[`, `]`, `{`, `}`, `^`, `*`, `+`, `|` et `?`.

**Remarque** : La syntaxe de caractère générique n'est pas prise en charge après une variable de modèle.

Par exemple, avec une variable de modèle nommée `env`, avec un tag/un attribut `environment` et avec une valeur sélectionnée de `dev` :
* `$env` affiche `environment:dev`
* `$env.key` affiche `environment`
* `$env.value` affiche `dev`
* `$env*` recherche la valeur exacte `dev*` NON `dev{dynamic-wildcard-value}`

### Superposition d'événements {#events-overlay}

Utilisez la recherche par superposition d'événements avec des variables de modèle pour trouver des événements qui partagent certains tags avec les métriques de votre dashboard. La recherche par superposition d'événements est appliquée via un graphique individuel.

Les valeurs des variables de modèle du dashboard peuvent être directement capturées en utilisant la syntaxe `$<TEMPLATE_VARIABLE_KEY>.value` dans le champ de recherche d'événements.

**Remarque** : Les variables de modèle du dashboard doivent être des tags de métrique, et non des tags d'événement.

#### Dashboard {#dashboard}

Pour rechercher des événements à l'aide de variables de modèle depuis votre dashboard, utilisez le format suivant :

```text
<TAG_KEY>:$<TEMPLATE_VARIABLE_NAME>.value
```

Par exemple, rechercher `region:$region.value` avec une valeur de `us-east1` pour la variable de modèle `region` affiche les événements marqués avec `region:us-east1`. De plus, le minutage des événements est indiqué par des barres roses dans les graphiques.

Utilisez des virgules pour effectuer une recherche à l'aide de plusieurs variables de modèle, par exemple : `role:$role.value,env:$env.value`

**Remarque** : Une fois que vous appuyez sur *entrée* pour effectuer la recherche, `$region.value` se met à jour avec la valeur du menu déroulant de la variable de modèle.

#### Widgets {#widgets-1}

Depuis un widget, utilisez les variables de modèle pour visualiser à quel moment les événements se sont produits. Utilisez le format suivant :

```text
$<TEMPLATE_VARIABLE_NAME>
```

Par exemple, saisissez `$region` dans la zone de recherche des superpositions d'événements. Ceci recherche les événements avec la valeur dans le menu déroulant de la variable de modèle `region`.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/#define-tags
[2]: /fr/logs/explorer/facets/
[3]: /fr/real_user_monitoring/explorer/?tab=facets#setup-facets-measures
[4]: /fr/dashboards/faq/historical-data/
[5]: /fr/account_management/teams/#team-filter