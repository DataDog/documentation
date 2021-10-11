---
title: Suivi des erreurs RUM
kind: documentation
further_reading:
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: Explorateur de suivi des erreurs
- link: "https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps"
  tag: Documentation
  text: Référentiel officiel de l'interface de ligne de commande Datadog
- link: /real_user_monitoring/guide/upload-javascript-source-maps
  tag: Guide
  text: Importer des source maps JavaScript
- link: "https://app.datadoghq.com/error-tracking"
  tag: IU
  text: Suivi des erreurs
---

{{< img src="real_user_monitoring/error_tracking/page.png" alt="Page de suivi des erreurs"  >}}

## En quoi consiste le suivi des erreurs ?

Datadog recueille un grand nombre d'erreurs, et la surveillance de ces erreurs est essentielle pour assurer le bon fonctionnement de votre système. Pourtant, ces événements d'erreur sont parfois si nombreux qu'il peut s'avérer difficile d'identifier ceux qui méritent votre attention et qui doivent être corrigés en priorité. Le suivi des erreurs permet de simplifier la surveillance grâce aux techniques suivantes :

- __Regroupement des erreurs similaires dans des problèmes__ pour réduire le bruit et aider à identifier celles qui sont les plus importantes.
- __Suivi des problèmes au fil du temps__ pour identifier à quel moment ils sont apparus, s'ils surviennent toujours ainsi que la fréquence à laquelle ils se produisent.
- __Regroupement de l'ensemble du contexte nécessaire au même endroit__ pour faciliter le dépannage du problème.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
