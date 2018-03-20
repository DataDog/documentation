---
title: Je permute entre les agrégateurs sum/min/max/avg mais les valeurs sont identiques?
kind: faq
---

Lorsque vous utilisez l'agrégateur 'sum/min/max/moy`, nous regardons les séries, pas les points d'une même série. Donc, si elle est portée à son niveau le plus granulaire, il est possible que la commutation entre ces agrégateurs ne change pas les valeurs que vous voyez.

Par exemple, disons que vous avez décomposé la mémoire utilisée par hosts, vous obtiendrez donc une série temporelle pour chaque host. Si vous ne décomposé pas par host, vous obtiendrez par défaut la moyenne de tous vos hosts.