---
description: Solución de problemas de configuración de la Monitorización de base de
  datos para Oracle
title: Solucionar problemas de configuración de DBM para Oracle
---

En esta página, se detallan los problemas más comunes relacionados con la configuración y el uso de la Monitorización de base de datos con Oracle y se explica cómo resolverlos. Datadog recomienda utilizar la última versión estable del Agent y consultar la última [documentación de configuración][1], ya que puede cambiar según las versiones del Agent.

## Problemas frecuentes

### Error "Conexión rechazada"
Comprueba la conectividad entre el Agent y la base de datos monitorizada ejecutando uno de estos comandos en la máquina en la que se ejecuta el Agent y, a continuación, investigando cualquier error:

- `nc -v <DB_SERVER> <PORT>`
- `curl <DB_SERVER>:<PORT>`
- `telnet <DB_SERVER> <PORT>`

Es importante especificar los valores exactos para `<DB_SERVER>` y `<PORT>` que están configurados para esa instancia en el archivo de configuración de `oracle`.

Con el comando `telnet` como ejemplo, la salida esperada para una conexión correctamente configurada es

{{< code-block lang="text" disable_copy="true" collapsible="true" >}}
Trying <DB_SERVER_IP_ADDRESS>...
Connected to <DB_SERVER_NAME>.
Escape character is '^]'.
{{< /code-block >}}

### Las consultas personalizadas no funcionan correctamente
Asegúrate de que está instalada la [versión recomendada del Agent][2] para tu tipo de alojamiento.

### La consulta del plan de ejecución tarda segundos
Asegúrate de que está instalada la [versión recomendada del Agent][2] para tu tipo de alojamiento.

### Fuga de memoria PGA o espacio de tabla temporal
Asegúrate de que está instalada la [versión recomendada del Agent][2] para tu tipo de alojamiento.

### Error "La tabla o vista no existe" en `agent.log`
Ejecuta las concesiones de permisos indicadas en el paso **Conceder permisos** de las [instrucciones de configuración][3] para tu tipo de alojamiento.

[1]: /es/database_monitoring/setup_oracle/
[2]: /es/database_monitoring/setup_oracle#recommended-agent-version
[3]: /es/database_monitoring/setup_oracle#setup