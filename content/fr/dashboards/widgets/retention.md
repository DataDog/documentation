---
description: Analysez les tendances de rétention et d'engagement des utilisateurs
  dans le temps à l'aide de la visualisation d'analyse de cohortes.
further_reading:
- link: product_analytics/charts/retention_analysis/
  tag: Documentation
  text: Analyse de la rétention
- link: https://www.datadoghq.com/blog/user-engagement-retention-analysis/
  tag: Blog
  text: Mesurez l'engagement des utilisateurs à long terme avec l'analyse de la rétention
    de Datadog
title: Widget Retention
widget_type: cohort
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
Le widget Retention n'est pas disponible sur le <a href="/getting_started/site">site Datadog</a> ({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}

{{< callout url="https://www.datadoghq.com/product-preview/product-analytics/" header="false" >}}
Le widget Retention est disponible en version Preview pour les clients Product Analytics. Pour demander l'accès, remplissez le formulaire.
{{< /callout >}}

{{< img src="/dashboards/widgets/retention/retention_widget_graph.png" alt="Visualisation graphique du widget Retention" style="width:100%;" >}}

L'analyse de la rétention vous permet de mesurer la fréquence à laquelle les utilisateurs reviennent sur une page ou effectuent une action. En suivant la rétention des utilisateurs dans le temps, vous pouvez obtenir des informations sur la satisfaction globale des utilisateurs. Utilisez Retention Analysis pour répondre à des questions telles que :
- Après avoir visité la page de paiement et acheté un article, quel pourcentage de personnes revient et continue à le faire dans les semaines suivantes ?
- Pendant la période des fêtes, combien de personnes consultent la page du catalogue une seule fois et ne reviennent jamais ?
- Sur une application de covoiturage, combien de personnes ouvrent l'application puis commandent un trajet ?

{{< img src="/dashboards/widgets/retention/retention_widget_config.png" alt="Options de configuration du widget Retention" style="width:100%;" >}}

## Configuration

Pour renseigner les données de rétention des utilisateurs, vous devez définir l'attribut `usr.id` dans votre SDK. [Consultez les instructions pour envoyer des attributs d'utilisateur uniques][1].

### Configuration

1. Définissez l'événement initial en sélectionnant **View** ou **Action** et choisissez une requête dans le menu déroulant.
1. (Facultatif) Cliquez sur **+ Add different return step** pour configurer un événement de retour différent de l'événement d'origine.
1. Définissez les utilisateurs en sélectionnant parmi les utilisateurs ou les segments dans le menu déroulant.
1. Personnalisez le graphique pour l'afficher sous forme de pourcentage ou de nombre total, et pour mesurer par jours, semaines ou mois.

### Options

#### Intervalle global

Sur les screenboards et les notebooks, choisissez si votre widget doit utiliser un intervalle personnalisé ou l'intervalle global.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/application_monitoring/browser/advanced_configuration#user-session