---
description: Explorez des dashboards Synthetic prêts à l'emploi pour en savoir plus
  sur vos tests Synthetic.
further_reading:
- link: /synthetics/
  tag: Documentation
  text: En savoir plus sur la surveillance Synthetic
- link: /continuous_testing/explorer/
  tag: Documentation
  text: En savoir plus sur l'Explorateur de surveillance Synthetic et de tests en
    continu
- link: /continuous_testing/explorer/saved_views
  tag: Documentation
  text: En savoir plus sur les vues enregistrées
kind: documentation
title: Dashboards Synthetic
---

## Présentation

Lorsque vous créez un test Synthetic, Datadog [recueille des données][1] et génère des dashboards sur votre stack, sur les applications Browser ou sur les performances globales, les emplacements privés et les événements relatifs aux tests.

Pour accéder à vos dashboards Synthetic, utilisez le filtre `Synthetics` dans la requête de recherche de la [**liste des dashboards**][2] ou cliquez sur le menu déroulant sous [**Dashboards**][3] sur la [page Synthetic Monitoring & Continuous Testing][4].

{{< img src="synthetics/dashboards/dashboards_homepage_blurred.png" alt="Dashboards Synthetic Monitoring sur la page d'accueil Synthetic Monitoring & Continuous Testing" style="width:100%;">}}

{{< whatsnext desc="Vous pouvez explorer les dashboards Synthetic prêts à l'emploi suivants :" >}}
  {{< nextlink href="/synthetics/dashboards/api_test" >}}<u>Performances des tests API</u> : surveillez vos endpoints et services. {{< /nextlink >}}
  {{< nextlink href="/synthetics/dashboards/browser_test" >}}<u>Performances des tests Browser</u> : consultez les performances Web de vos tests Browser, obtenez des informations utiles sur les fournisseurs tiers et découvrez vos signaux Web essentiels. {{< /nextlink >}}
  {{< nextlink href="/synthetics/dashboards/test_summary" >}}<u>Vue d'ensemble des tests</u> : consultez des informations utiles sur vos tests Synthetic par région, environnement ou équipe. {{< /nextlink >}}
{{< /whatsnext >}}

## Personnaliser vos dashboards Synthetic

Vous pouvez dupliquer des [dashboards][1] et les personnaliser pour chaque équipe, environnement ou région à l'aide de template variables. Il est également possible de personnaliser une vue et de créer une [vue enregistrée][6] de votre dashboard dupliqué.

### Modifier des template variables

Les dashboards Synthetic générés automatiquement contiennent un ensemble de template variables par défaut. Utilisez les menus déroulants des template variables pour réduire le champ des données affichées dans le dashboard. Par exemple, vous pouvez filtrer un type de navigateur spécifique avec le template variable `Browser`. Pour en savoir plus, consultez la section [Template variables][7]. Pour dupliquer votre dashboard Synthetic, cliquez sur le bouton **Clone** en regard de l'icône **Configure**.

{{< img src="synthetics/dashboards/clone.png" alt="Dupliquer un dashboard" style="width:100%;">}}

Le dashboard Synthetic possède une vue par défaut ajustable. Cliquez sur l'icône **Edit** pour personnaliser vos template variables.

{{< img src="synthetics/dashboards/template_variables.png" alt="Modifier des template variables dans un dashboard Synthetic" style="width:80%;">}}

### Créer une vue enregistrée

Une fois que vous avez terminé vos modifications, cliquez sur **Save** et sélectionnez **Save selections as view** à partir du menu déroulant de gauche.

{{< img src="synthetics/dashboards/saved_view.png" alt="Créer une vue enregistrée dans un dashboard Synthetic" style="width:60%;">}}

Nommez votre vue enregistrée et cliquez sur **Save**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/metrics/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: https://app.datadoghq.com/synthetics/tests/
[4]: https://app.datadoghq.com/synthetics/tests
[5]: /fr/dashboards/
[6]: /fr/continuous_testing/explorer/saved_views/
[7]: /fr/dashboards/template_variables/