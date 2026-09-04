---
description: Découvrez comment relier les données APM aux données de télémétrie collectées
  par d'autres produits Datadog.
further_reading:
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Documentation
  text: Diagnostics simplifiés grâce à la mise en corrélation entre produits
- link: https://www.datadoghq.com/blog/link-dbm-and-apm/
  tag: Blog
  text: Faites corréler en un instant les données de télémétrie de DBM et d'APM afin
    de comprendre les performances des requêtes de bout en bout
title: Corréler les données APM avec d'autres données de télémétrie
---

La corrélation des données entre les différents produits Datadog fournit un contexte utile pour estimer l'impact métier et identifier la cause racine d'un problème en quelques clics. Configurez les connexions entre les données entrantes afin de faciliter les transitions rapides dans vos explorers et dashboards.

## Corréler Database Monitoring et les traces

Injectez des identifiants de trace dans la collecte de données DBM pour corréler les deux sources. Affichez les informations de base de données dans APM, et les données APM dans DBM, afin d'obtenir une vue complète et unifiée des performances de votre système. Consultez [Connecter DBM et les traces][4] pour la configuration.

{{< img src="database_monitoring/dbm_filter_by_calling_service.png" alt="Filtrer les hosts de base de données en fonction des services APM les appelant">}}


## Corréler les logs et les traces

Injectez des identifiants de trace dans les logs, et exploitez le tagging de service unifié pour retrouver les logs associés à un service et une version spécifiques, ou tous les logs corrélés à une trace donnée. Consultez [Connecter les logs et les traces][1] pour la configuration.

{{< img src="tracing/connect_logs_and_traces/logs-trace-correlation.png" alt="Connecter les logs et les traces" style="width:100%;">}}

## Corréler le RUM et les traces

Corrélez les données collectées côté front-end avec les traces et spans côté back-end en [connectant le RUM et les traces][2]. Identifiez les problèmes à tous les niveaux de votre stack et comprenez ce que vivent réellement vos utilisateurs. 

{{< img src="tracing/index/RumTraces.png" alt="Associer les sessions RUM aux traces" style="width:100%;">}}

## Corréler les tests Synthetics et les traces

Suivez les données issues de tests Synthetics en échec jusqu'à leurs causes profondes en explorant les traces associées. [Connectez Synthetics et les traces][3] pour accélérer le diagnostic de votre code.

{{< img src="tracing/index/Synthetics.png" alt="Tests Synthetic" style="width:100%;">}}

## Corréler les profils et les traces

Les données de performance du code applicatif pour lequel le tracing et le profiling sont activés sont automatiquement corrélées, ce qui vous permet de naviguer entre les deux types d'analyse pour investiguer et résoudre des problèmes. Vous pouvez passer directement des informations d'une span aux données de profiling via l'onglet **Profiles**, et identifier les lignes de code précises liées à des problèmes de performance. De même, vous pouvez diagnostiquer des endpoints lents ou gourmands en ressources directement depuis l'interface de Profiling. 

Pour en savoir plus, consultez la section[Investigation des traces ou endpoints lents][5].

{{< img src="profiler/profiles_tab.png" alt="L'onglet Profiles affiche les informations de profiling pour une span de trace APM" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/other_telemetry/connect_logs_and_traces/
[2]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm/
[3]: /fr/synthetics/apm/
[4]: /fr/database_monitoring/connect_dbm_and_apm/
[5]: /fr/profiler/connect_traces_and_profiles/