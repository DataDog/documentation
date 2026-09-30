---
description: Configurar la resolución de problemas de monitorización de bases de datos
title: Solucionar problemas de monitorización de bases de datos
---

Esta página detalla los problemas comunes de configuración y uso de la monitorización de bases de datos y cómo resolverlos. Datadog recomienda permanecer en la última versión estable del Agent y adherirse a la última [documentación de configuración][1], ya que puede cambiar con las versiones del Agent.

Para solucionar los problemas de configuración de bases de datos, utiliza la página de resolución de problemas correspondiente:

* [Solucionar problemas de configuración de MySQL][2]
* [Solucionar problemas de configuración de Oracle][8]
* [Solucionar problemas de configuración de Postgres][3]
* [Solucionar problemas de configuración de SQL Server][4]
* [Solucionar problemas de configuración de MongoDB][9]

## Diagnóstico de problemas comunes
### No se pueden visualizar los parámetros de Bind Query

En este momento, los parámetros de Bind Query sin procesar están ofuscados para Query Samples y Explain Plans, y se sustituyen por un carácter `?`.


### Límite de instancia de DBM

Dependiendo de lo complejas que sean las bases de datos que se están monitorizando, la presencia de demasiados hosts de DBM en un Agent podría sobrecargar el Agent y provocar retrasos en la recopilación de datos. Si el Agent se sobrecarga, es posible que aparezcan advertencias como `Job loop stopping due to check inactivity in the Agent logs`.

Se recomienda tener un único monitor del Datadog Agent con 30 instancias de base de datos como máxico. Si tienes más de 30 instancias de bases de datos, deberías repartirlas entre varios Datadog Agents.


### No hay datos de DBM visibles en Datadog: ¿Problemas de conexión?

Si crees que tu configuración es correcta, pero no estás viendo datos en tus páginas de DBM, es posible que tu Agent no pueda enviar datos a los endpoints de recopilación de datos de Datadog. Para diagnosticar problemas de conexión, realiza los siguientes pasos para solucionar problemas de conexión desde la localización donde se ejecuta el Agent.

1. Prueba la conectividad TCP en los endpoints de recopilación de DBM:

```
telnet dbm-metrics-intake.{{< region-param key="dd_site" code="true" >}} 443
telnet dbquery-intake.{{< region-param key="dd_site" code="true" >}} 443
```

2. Prueba publicar una carga útil vacía con una clave de API no válida en ambos endpoints de DBM.
Estos comandos deberían fallar con el código HTTP `403: Forbidden`.

```
curl -vvv -X POST "https://dbm-metrics-intake.{{< region-param key="dd_site" code="true" >}}/api/v2/databasequery" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: NONE" \
-d "[{}]"

curl -vvv -X POST "https://dbquery-intake.{{< region-param key="dd_site" code="true" >}}/api/v2/databasequery" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: NONE" \
-d "[{}]"
```

Las respuestas deben contener `{"status":"error","code":403,"errors":["Forbidden"],...}` si las solicitudes se enviaron correctamente y se recibió una respuesta.

Algunas causas comunes de fallos de conexión incluyen las [configuraciones de proxy][7] y los cortafuegos, que envían el tráfico saliente a endpoints de Datadog. Si tienes un proxy o un cortafuegos, asegúrate de que las direcciones IP de los endpoints de DBM estén autorizadas. Estas direcciones se encuentran en el bloque APM en `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}}.

## ¿Necesitas más ayuda?

Si sigues teniendo problemas, ponte en contacto con el [servicio de asistencia de Datadog][5] para recibir ayuda.


[1]: /es/database_monitoring/#getting-started
[2]: /es/database_monitoring/setup_mysql/troubleshooting/
[3]: /es/database_monitoring/setup_postgres/troubleshooting/
[4]: /es/database_monitoring/setup_sql_server/troubleshooting/
[5]: /es/help/
[7]: /es/agent/configuration/proxy/?tab=linux
[8]: /es/database_monitoring/setup_oracle/troubleshooting/
[9]: /es/database_monitoring/setup_mongodb/troubleshooting/