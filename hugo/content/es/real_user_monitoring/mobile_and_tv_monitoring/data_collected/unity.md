---
aliases:
- /es/real_user_monitoring/unity/data_collected/
code_lang: unity
code_lang_weight: 30
description: Conoce los datos recopilados por la monitorización de Unity.
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: Código fuente
  text: Código fuente de dd-sdk-unity
- link: real_user_monitoring/explorer/
  tag: Documentación
  text: Aprender a explorar tus datos de RUM
title: Datos recopilados de RUM Unity
type: lenguaje de código múltiple
---
## Información general

El SDK de Datadog Unity para RUM genera eventos con métricas y atributos asociados. Las métricas son valores cuantificables que pueden utilizarse para mediciones relacionadas con el evento. Los atributos son valores no cuantificables que se utilizan para dividir los datos de métricas (agrupar por) en el Explorador de RUM.

La mayoría de los datos de monitorización de Unity son recopilados por los SDK nativos de Datadog iOS y Android para RUM, y se conservan durante los mismos periodos.

* Para métricas y atributos específicos de eventos de iOS, consulta [datos recopilados de RUM iOS][1].
* Para conocer los atributos y métricas específicos de eventos de Android, consulta [datos recopilados de RUM Android][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/real_user_monitoring/ios/data_collected/#event-specific-metrics-and-attributes
[2]: /es/real_user_monitoring/android/data_collected/#event-specific-metrics-and-attributes