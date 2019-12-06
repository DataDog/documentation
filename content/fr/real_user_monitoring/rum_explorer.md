---
title: RUM Explorer
kind: documentation
description: ''
further_reading:
  - link: /real_user_monitoring/rum_analytics
    tag: Documentation
    text: Générez des analyses à partir de vos événements.
---
La page Real User Monitoring (RUM) Explorer vous permet d'explorer toutes les vues recueillies à partir de vos différentes applications.

## Contexte

Créez un contexte pour explorer vos vues sur votre page RUM Explorer. Commencez par sélectionner l'[intervalle](#intervalle) approprié, puis utilisez la [barre de recherche](#barre-de-recherche) pour filtrer vos vues et vos analyses.

### Intervalle

L'intervalle est visible juste en dessous de la barre de recherche. Cette fonctionnalité vous permet de limiter votre vue ou votre analyse à une période donnée.

Changez rapidement l'intervalle en sélectionnant une durée prédéfinie dans la liste déroulante :

{{< img src="real_user_monitoring/rum_explorer/rum_time_selector.png" alt="Sélecteur d'intervalle RUM" responsive="true" style="width:40%;">}}

Tous les paramètres de recherche sont contenus dans l'URL. Vous pouvez partager votre vue en partageant l'URL.

### Recherche
#### Syntaxe de recherche

Une requête est composée de termes et d'opérateurs.

Il existe deux types de termes :

* Un **terme unique** est un mot unique comme `test` ou `hello`.

* Une **séquence** est un groupe de mots entre guillemets, comme `hello dolly`.

Pour combiner plusieurs termes dans une requête complexe, vous pouvez utiliser l'un des opérateurs booléens suivants :

| **Opérateur** | **Description**                                                                                       |
|--------------|-------------------------------------------------------------------------------------------------------|
| `AND`        | **Intersection** : les deux termes figurent dans les vues sélectionnées (si aucun opérateur n'est ajouté, AND est utilisé par défaut). |
| `OR`         | **Union** : un des deux termes figure dans les vues sélectionnées.                                             |
| `-`          | **Exclusion** : le terme suivant ne figure PAS dans les vues sélectionnées.                                                  |

#### Recherche à facettes

Pour effectuer une recherche en fonction d'un attribut spécifique, [ajoutez-le comme facette](#facettes-et-mesures) puis utilisez `@` pour indiquer que vous faites une recherche à partir d'une facette.

Par exemple, si le nom de votre facette est **url** et que vous souhaitez filtrer les résultats en fonction de la valeur *www.datadoghq.com*, saisissez :

`@url:www.datadoghq.com`

##### Échappement de caractères spéciaux

**Remarque** : lorsque vous effectuez une recherche en fonction d'une valeur de facette qui contient des caractères spéciaux, vous devez utiliser des caractères d'échappement ou des guillemets. Les caractères suivants sont considérés comme spéciaux : `?`, `>`, `<`, `:`, `=`,`"`, `~`, `/` et `\`. Ils requièrent par conséquent le caractère d'échappement `\`.

La même logique s'applique aux espaces dans les noms des facettes de vues. Les facettes de vues ne sont pas supposées contenir d'espaces, mais si elles en ont, les espaces doivent être précédées d'un caractère d'échappement. Si un attribut est appelé `user.first name`, effectuez une recherche en fonction de cet attribut en ajoutant un caractère d'échappement devant l'espace : `@user.first\ name:mavaleur`

##### Wildcards

Afin d'effectuer une recherche avec un wildcard correspondant à plusieurs caractères, utilisez le symbole `*`. Par exemple, `@http.url:https:\/\/*` renvoie toutes les vues dont l'URL commence par `https://`.

##### Valeurs numériques

Utilisez les caractères `<`,`>`, `<=` ou `>=` pour effectuer une recherche avec des attributs numériques. Par exemple, pour récupérer toutes les vues dont la durée est supérieure à 100 ns :

`@duration:>100`

Vous pouvez effectuer une recherche d'attribut numérique dans un intervalle spécifique. Par exemple, pour récupérer toutes les vues dont la durée est comprise entre 100 ns et 300 ns :

`@duration:[100 TO 300]`

##### Saisie automatique

Utilisez la fonctionnalité de saisie automatique de la barre de recherche pour compléter votre requête en utilisant des valeurs existantes :

{{< img src="real_user_monitoring/rum_explorer/search_bar_autocomplete.png" alt="Saisie automatique dans la barre de recherche" responsive="true" style="width:60%;">}}

#### Exemples

| Requête de recherche                                                 | Description                                                                                                                                         |
|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `@http.url_details.path:"/api/v1/test"`                      | Recherche toutes les vues contenant `/api/v1/test` dans l'attribut `http.url_details.path`.                                                              |
| `@http.url:\/api\/v1\/*`                                     | Recherche toutes les vues dont la valeur de l'attribut `http.url` commence par `/api/v1/`                                                            |
| `@duration:[100 TO 300] @http.url_details.path:\/api\/v1\/*` | Recherche toutes les vues dont la `duration` est comprise entre 100 et 300 ns et dont la valeur de l'attribut `http.url_details.path` commence par `/api/v1/` |

## Visualisation

Cliquez sur une vue pour ouvrir le volet des vues et l'examiner plus en détail (Ressources, Traces, Erreurs, Action utilisateur, Tâche longue, Logs ou Attributs) :

{{< img src="real_user_monitoring/rum_explorer/rum_views.png" alt="Vue RUM" responsive="true" style="width:80%;">}}

## Facettes et mesures

Une fois [recueillis][1], vos attributs de vues peuvent être indexés en tant que facettes ou mesures afin d'être accessibles pour votre création de [contexte](#contexte) et vos [analyses][2].

Remarque : pour tirer le meilleur parti de votre page RUM Explorer, assurez-vous que les attributs de vos vues suivent la [convention de nommage d'attributs Datadog][3].

{{< tabs >}}
{{% tab "Facettes" %}}

Une facette présente tous les membres distincts d'un attribut ou d'un tag, en plus de proposer des analyses de base, comme le nombre de vues représentées. Les facettes vous permettent d'effectuer des pivotements ou de filtrer vos ensembles de données en fonction d'un attribut donné. Pour filtrer vos données, sélectionnez les valeurs que vous souhaitez afficher.

{{< img src="real_user_monitoring/rum_explorer/rum_facet.png" alt="Démonstration facettes" responsive="true" style="width:80%;">}}

**Créer une facette** :

Pour commencer à utiliser un attribut en tant que facette ou dans une recherche, cliquez dessus et ajoutez-le en tant que facette :

{{< img src="real_user_monitoring/rum_explorer/create_facet.png" style="width:50%;" alt="Créer une facette" responsive="true" style="width:30%;">}}

Lorsque vous avez terminé, la valeur de cet attribut est stockée **pour toutes les nouvelles vues** et peut être utilisée dans [la barre de recherche](#recherche), le volet Facettes et dans la [requête RUM Analytics][1].

[1]: /fr/real_user_monitoring/rum_analytics
{{% /tab %}}
{{% tab "Mesures" %}}

Une mesure est un attribut doté d'une valeur numérique contenue dans vos vues.

**Créer une mesure** :

Pour commencer à utiliser un attribut en tant que mesure, cliquez sur un attribut numérique de vos vues :

{{< img src="real_user_monitoring/rum_explorer/create_measure.png" alt="Créer une mesure" responsive="true" style="width:30%;">}}

Lorsque vous avez terminé, la valeur de cet attribut est stockée **pour toutes les nouvelles vues** et peut être utilisée dans [la barre de recherche](#recherche), le volet Facettes et dans la [requête RUM Analytics][1].

**Sélectionner l'unité de mesure** :

Chaque mesure dispose de sa propre unité. Celle-ci est affichée dans les colonnes du RUM Explorer et dans les analyses RUM.

{{< img src="real_user_monitoring/rum_explorer/edit_measure.png" alt="Modifier une mesure" responsive="true" style="width:50%;">}}

[1]: /fr/real_user_monitoring/rum_analytics
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/setup
[2]: /fr/real_user_monitoring/rum_analytics
[3]: /fr/logs/processing/attributes_naming_convention