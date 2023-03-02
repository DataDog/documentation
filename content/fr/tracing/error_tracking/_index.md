---
further_reading:
- link: /tracing/error_tracking/explorer
  tag: Documentation
  text: Explorateur de suivi des erreurs
- link: https://app.datadoghq.com/apm/error-tracking
  tag: Interface
  text: Suivi des erreurs
- link: https://www.datadoghq.com/blog/service-page/
  tag: Blog
  text: Télémétrie sur les services, suivi des erreurs, SLO et plus encore
kind: documentation
title: Suivi des erreurs
---

{{< img src="tracing/error_tracking/explorer_with_backend_issues.png" alt="Page de suivi des erreurs"  >}}


Il est essentiel de surveiller les erreurs recueillies par Datadog pour assurer le bon fonctionnement de votre système. Pourtant, ces événements d'erreur sont parfois si nombreux qu'il peut s'avérer difficile d'identifier ceux qui méritent votre attention et qui doivent être corrigés en priorité. Le suivi des erreurs permet de simplifier la surveillance grâce aux techniques suivantes :

- __Regroupement des erreurs connexes au sein de problèmes__, afin de gérer une liste de quelques problèmes plutôt que des centaines d'erreurs
- __Suivi de l'évolution des erreurs__, afin de visualiser la date de leur apparition, leur statut actuel et leur fréquence, dans le but d'identifier les erreurs les plus importantes 
- __Rassemblement de tous les éléments de contexte__, pour un diagnostic simplifié.

## Fonctionnement du suivi des erreurs Datadog

Les traceurs Datadog recueillent des erreurs par l'intermédiaire des intégrations et de l'instrumentation manuelle du code source. La fonctionnalité de suivi des erreurs traite les spans d'erreur des traces __tant qu'elles se trouvent dans la span de service la plus élevée__, à savoir la __span d'entrée de service__. Pour qu'une erreur puisse être surveillée, la span doit également contenir les [tags de span][1] `error.stack`, `error.msg` et `error.type`.

{{< img src="tracing/error_tracking/flamegraph_with_errors.png" alt="Flamegraph avec des erreurs"  >}}

La fonctionnalité de suivi des erreurs calcule une empreinte pour chaque span d'erreur traitée, à l'aide du type et du message de l'erreur, ainsi que des cadres formant la stack trace. Les erreurs partageant la même empreinte sont regroupées au sein du même _problème_.

<div class="alert alert-info">La fonctionnalité de suivi des erreurs est disponible pour tous les langages pris en charge par l'APM. Elle ne nécessite pas l'utilisation d'un autre SDK.</div>

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/tracing/visualization/trace/?tab=spantags#more-information