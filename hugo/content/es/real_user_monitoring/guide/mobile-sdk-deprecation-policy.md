---
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Visualización de tus datos RUM en el Explorador
- link: /real_user_monitoring/guide/mobile-sdk-upgrade
  tag: Documentación
  text: Actualización de tu SDK móvil de Datadog
title: Política de obsolescencia de los SDK móviles de RUM
---

## Información general

Datadog entiende la importancia de mantener un ecosistema de desarrollo móvil sólido y actualizado para ti. La siguiente política de obsolescencia de productos móviles garantiza la mejora y la estabilidad continuas de los SDK móviles de Datadog. Estas prácticas de obsolescencia se ajustan a las prácticas recomendadas del sector, al tiempo que te garantizan un período de transición razonable.

## Versionado
Los SDK móviles de Datadog siguen el [versionado semántico][1]. Un cambio en la versión principal indica un cambio no retrocompatible en la API pública o en el comportamiento.

Al actualizar de una versión principal a la siguiente, es importante seguir al pie de la letra las [directrices de actualización del SDK][2].

## Ciclo de vida de las principales versiones de SDK

### Lanzamiento de disponibilidad general (GA)

* **Fecha de inicio**: El lanzamiento de GA marca el momento en que una versión principal de un SDK se lanza oficialmente y está disponible.
* **Nivel de soporte**: Durante la fase de GA, la versión principal recibe soporte completo, incluida la incorporación de nuevas funciones y la corrección de errores.

### Fase de obsolescencia

* **Fecha de inicio**: La fase de obsolescencia comienza inmediatamente después del lanzamiento de la siguiente versión principal de GA.
* **Nivel de soporte**: En esta fase, el objetivo principal es solucionar errores críticos y garantizar la estabilidad de la versión principal obsoleta. Aunque no se prevén nuevas funciones, seguimos ofreciendo soporte para problemas críticos.

### Fin del soporte (EOS)

* **Fecha de inicio**: Seis meses después del lanzamiento de la siguiente versión principal de GA, comienza la fase de Fin del soporte (EOS).
* **Nivel de soporte**: En esta fase, dejamos de ofrecer soporte para la versión principal de EOS. No se publican correcciones de errores ni actualizaciones para la versión.

## Duración mínima del soporte
Para garantizar un plazo razonable para las migraciones y permitir la planificación, garantizamos una duración mínima de soporte para cada versión principal. Esto significa que cada versión principal estará totalmente soportada durante al menos seis meses después de su lanzamiento de GA.

Durante este periodo de soporte, proporcionamos nuevas funciones y correcciones de errores, además de solucionar problemas críticos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://semver.org/
[2]: /es/real_user_monitoring/guide/mobile-sdk-upgrade