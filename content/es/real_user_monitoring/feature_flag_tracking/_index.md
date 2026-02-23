---
disable_toc: false
further_reading:
- link: /real_user_monitoring/guide/setup-feature-flag-data-collection/
  tag: Documentación
  text: Configurar la recopilación de datos de indicadores de funciones
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Más información sobre el Explorador RUM
- link: https://www.datadoghq.com/blog/feature-flag-tracking/
  tag: Blog
  text: Para garantizar la seguridad de la versión con el seguimiento de los indicadores
    de funciones en Datadog RUM
title: Seguimiento de indicadores de funciones
---

## Información general

Los datos de los indicadores de funciones proporcionan una mayor visibilidad de la experiencia del usuario y de la monitorización del rendimiento. Esto permite determinar a qué usuarios se muestra una función específica y evaluar si los cambios introducidos afectan a la experiencia del usuario o al rendimiento. Puedes utilizar esta información para determinar si debes o no revertir la función.

Si enriqueces tus datos RUM con datos de indicadores de funciones, podrás:

- Tener la seguridad de que tu función se lanzará con éxito sin causar involuntariamente un error o una regresión del rendimiento.
- Correlacionar las versiones de las funciones con el rendimiento, identificar los problemas con versiones específicas y solucionar los problemas con mayor rapidez
- Optimizar la recopilación y el análisis de los datos y centrarte en la resolución de los problemas

## Marcos compatibles

El seguimiento de indicadores de funciones está disponible en navegadores RUM, iOS, Android, Flutter y SDK React Native. Para empezar, [configura la monitorización RUM para navegadores o móviles][1].

Puedes empezar a recopilar datos de indicadores de funciones para [soluciones personalizadas de gestión de indicadores de funciones][2], o utilizando uno de los socios de integraciones Datadog.

Admitimos integraciones con:

{{< partial name="rum/rum-feature-flag-tracking.html" >}}

</br>

## Empezar a utilizar indicadores de funciones

Para empezar a utilizar los indicadores de funciones, configura el seguimiento de indicadores de funciones para el SDK de navegador o el SDK móvil y, a continuación, empieza a recopilar datos utilizando uno de los socios de integraciones Datadog o una solución de gestión de indicadores de funciones personalizada.

{{< whatsnext desc="Esta sección incluye los siguientes temas:">}}
  {{< nextlink href="/real_user_monitoring/feature_flag_tracking/setup">}}<u>Configuración</u>: Aprende a configurar RUM para capturar datos de indicadores de funciones y analizar el rendimiento en Datadog.{{< /nextlink >}} {{ }}
  {{< nextlink href="/real_user_monitoring/feature_flag_tracking/using_feature_flags">}}<u>Utiliza tus indicadores de funciones</u>: Aprende a visualizar y analizar el estado y el uso de tus indicadores de funciones.{{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/es/real_user_monitoring/feature_flag_tracking/setup/
[2]: /es/real_user_monitoring/setup/?tab=npm#custom-feature-flag-management