---
description: Découvrez comment Error Tracking utilise les traces de pile pour identifier
  et regrouper les erreurs.
further_reading:
- link: /tracing/error_tracking/
  tag: Documentation
  text: En savoir plus sur Error Tracking pour les services backend
- link: /tracing/error_tracking/error_grouping/
  tag: Documentation
  text: Découvrez Error Grouping.
title: Traces de pile dans Error Tracking.
---
## Présentation {#overview}

Error Tracking utilise les traces de pile sur les spans d'erreur pour identifier les erreurs, les regrouper en issues et indiquer où elles se sont produites. Cette page décrit quel attribut de span Error Tracking lit pour la trace de pile, et comment cela varie selon le langage de votre service et la version du tracer.

## Attributs de span de trace de pile {#stack-trace-span-attributes}

Un span d'erreur signale sa trace de pile dans l'[attribut de span][1] `error.stack`. Pour la plupart des traceurs, `error.stack` contient la trace de pile capturée lorsque l'erreur a été gérée (par exemple, dans un bloc `catch` ou dans un middleware). Ce n'est pas toujours à l'endroit où l'erreur a été lancée.

Pour les services Go instrumentés avec `dd-trace-go` v2.7.0 ou version ultérieure, la trace de pile de gestion est signalée séparément, dans l'attribut `error.handling_stack`. Dans ce cas, `error.stack` contient plutôt la trace de pile capturée au moment où l'erreur a été lancée, si elle est disponible.

## Quelle trace de pile est utilisée par Error Tracking {#which-stack-trace-is-used-by-error-tracking}

### Pour les services Go {#for-go-services}

Pour les services Go, Error Tracking dispose d'un mécanisme de secours pour décider quelle trace de pile utiliser :

- Go tracer v2.7.0 et versions ultérieures :
  - La pile d'exception est signalée dans `error.stack`. Cette pile est utilisée si elle est disponible.
  - La pile de gestion est signalée dans `error.handling_stack`. Cette pile est utilisée si la pile d'exception n'est pas disponible.
- Go tracer antérieur à v2.7.0 :
  - La pile d'exception est signalée dans `error.details`. Cette pile est utilisée si elle est disponible.
  - La pile de gestion est signalée dans `error.stack`. Cette pile est utilisée si la pile d'exception n'est pas disponible.

### Pour toutes les autres langues {#for-all-other-languages}

Pour toutes les autres langues, la pile de gestion est capturée et signalée dans `error.stack`. Cet attribut est utilisé par Error Tracking pour regrouper les issues et obtenir des informations telles que le commit suspect.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/trace/?tab=spantags#more-information