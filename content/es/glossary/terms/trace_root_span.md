---
core_product:
- apm
title: tramo (span) raíz de la traza (trace)
---
Un [tramo][1] es un tramo raíz de la traza cuando es el primer tramo de una traza. El tramo raíz es el método de punto de entrada de la solicitud rastreada. Su inicio marca el inicio de la traza.

{{< img src="tracing/visualization/toplevelspans.png" alt="Un tramo raíz de la traza" style="width:80%" >}}

En este ejemplo, los **tramos de entrada de servicio** son:

- `rack.request` (que también es el _tramo raíz_)
- `aspnet_coremvc.request`
- El tramo verde más alto debajo de `aspnet_coremvc.request`
- Cada tramo `mongodb` naranja

[1]: /es/glossary/#span