---
core_product:
- apm
title: span racine de trace
---
Une [span][1] est dite « racine de trace » lorsqu'elle représente la première span d'une trace. La span racine constitue le point d'entrée de la requête tracée. Sa création marque le début de la trace.

{{< img src="tracing/visualization/toplevelspans.png" alt="span racine de trace" style="width:80%" >}}

Dans cet exemple, les **spans d'entrée de service** sont :

- `rack.request` (qui est également la _span racine_)
- `aspnet_coremvc.request`
- La span verte tout en haut, sous `aspnet_coremvc.request`
- Chaque span `mongodb` orange

[1]: /fr/glossary/#span