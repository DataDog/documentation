---
title: Agrégation de somme incohérente entre différentes fenêtres temporelles sur le graphique
kind: faq
---

Vous pouvez voir des valeurs contradictoires entre différentes fenêtres temporelles, car nous avons moins de granularité (moins de points de données) sur les graphiques avec des fenêtres temporelles plus longues. Nous faisons cela pour ne pas surcharger nos processus de requête.

Par défaut, la façon dont nous effectuons un 'rollup' sur points de données dans les bins est en prenant les valeurs moyennes. Cependant, pour 'sum', il serait plus logique de faire rouler les bins en utilisant 'sum'. Vous pouvez ajuster ceci avec une fonction .rollup() (malheureusement cela ne peut pas être utilisé dans Metric Explorer, seulement dans les dashboard), en utilisant rollup(sum) (ou max/min) comme paramètre. Voir la [page des fonctions graphiques][1] pour plus d'informations.

[1]: /graphing/miscellaneous/functions
