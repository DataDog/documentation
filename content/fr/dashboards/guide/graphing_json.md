---
aliases:
- /fr/graphingjson/
- /fr/graphing/miscellaneous/graphingjson
- /fr/graphing/graphing_json/
- /fr/dashboards/graphing_json/
- /fr/dashboards/graphing_json/request_json/
- /fr/dashboards/graphing_json/widget_json/
further_reading:
- link: https://docs.datadoghq.com/api/latest/dashboards/
  tag: API
  text: API Dashboards
- link: /dashboards/widgets/
  tag: Documentation
  text: Widgets
kind: documentation
title: Graphiques JSON
---

## Présentation

{{< img src="/dashboards/graphing_json/json_editor.png" alt="Configurer un widget de série temporelle avec lʼéditeur JSON" style="width:100%;" >}}

Outre l'[éditeur graphique GUI][6], vous pouvez aussi configurer vos visualisations à lʼaide de l'éditeur JSON dans vos widgets de dashboards. Le schéma affiché dans l'éditeur JSON reflète celui du corps de la requête de l'API Dashboard. Pour plus d'informations sur les paramètres JSON et les champs obligatoires, consultez la[ documentation relative à l'API Dashboard][2]. 

## Schéma JSON des widgets

Recherchez le type de widget que vous souhaitez ajouter à votre dashboard et appliquez les champs JSON indiqués dans la documentation correspondante. Pour une liste complète des types de widgets, consultez [l'index des widgets][7].

### Schéma de l'axe des ordonnées

Grâce aux commandes de l'axe des ordonnées de Datadog, vous pouvez :

*   Régler l'axe des ordonnées sur un intervalle donné
*   Filtrer les séries en spécifiant un pourcentage ou une valeur absolue
*   Changer l'échelle de l'axe des ordonnées afin de passer d'une échelle linéaire à une échelle logarithmique, racine carrée ou puissance

### Schéma des marqueurs

Les marqueurs vous permettent d'ajouter une mise en forme conditionnelle visuelle pour vos graphiques. Par exemple, ALERTE, AVERTISSEMENT ou OK.

{{< img src="dashboards/graphing_json/markers.png" alt="Marqueurs" style="width:80%;">}}

## Schéma des template variables

Les template variables de dashboard servent à appliquer un nouveau contexte à un ou plusieurs graphiques dans votre dashboard, vous permettant ainsi d'explorer de façon dynamique les métriques associées à différents ensembles de tags en utilisant des variables au lieu de tags spécifiques. Vous pouvez obtenir plus dʼinformations sur les [template variables dans lʼIU de Datadog][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/#timeboards
[2]: /fr/api/v1/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/
[4]: /fr/dashboards/template_variables/
[6]: /fr/dashboards/querying/#graphing-editor
[7]: /fr/dashboards/widgets/