---
title: Est-il possible d'interroger des données historiques après la destruction d'un host?
kind: faq
---

Si un host arrête de rapporter des données pendant plus de 24 heures, Datadog ne listera plus ses métriques dans les menus déroulants de l'interface utilisateur. Cependant, bien que les métriques ne soient pas répertoriées, vous pouvez toujours interroger ces données avec l'éditeur JSON. Une solution simple consiste à interroger le nom de l'host ou les tags.

{{< img src="graphing/faq/query_post_deletion.png" alt="query post deletion" responsive="true" popup="true">}}

Si vous envisagez de renouveler fréquemment vos hôtes, ajoutez un tag [à l'Agent](/agent) dans le fichier `datadog.yaml` ou dans la [page Infrastructure](/graphing/infrastructure) (user tags), ou apprenez-en plus sur les autres [méthodes ici](/getting_started/tagging).
