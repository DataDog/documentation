---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/log-pipeline-scanner-datadog/
  tag: Blog
  text: Investigar el procesamiento de tus logs con el analizador de pipelines de
    logs Datadog
- link: /logs/log_configuration/pipelines/
  tag: Documentación
  text: Obtener más información sobre pipelines de logs
- link: /logs/log_configuration/processors/
  tag: Documentación
  text: Obtener más información sobre los procesadores de logs
kind: documentación
title: Analizador de pipelines
---

## Información general

El analizador de pipelines de logs te permite analizar pipelines de logs en tiempo real, rastrear logs específicos e identificar qué pipelines y reglas de procesamiento han realizado cambios en sus campos. Las organizaciones dependen de los pipelines de logs para procesar amplios volúmenes de logs. Cada equipo reestructura y enriquece los logs de forma diferente, según sus casos de uso específicos, como por ejemplo la monitorización de la seguridad, las auditorías de cumplimiento normativo y las operaciones de desarrollo (DevOps).

Utiliza el analizador de pipelines para:

- Solucionar problemas de procesamiento de logs, como logs sin procesar, etiquetas (tags) faltantes o cambios inesperados en la estructura de los logs.
- Determina y elimina las reglas de procesamiento contradictorias o redundantes.
- Asegúrate de que los logs que pasan por los pipelines de logs cumplen los requisitos de seguridad y cumplimiento normativo.

{{< img src="logs/log_configuration/pipeline_scanner/pipeline_scanner.png" alt="Analizador de pipelines que muestra los dos logs que coinciden con la consulta, los detalles del log seleccionado y los dos pipelines que modifican los logs consultados" style="width:80%;" >}}

## Identificar los pipelines y los procesadores que modifican un log

El analizador de pipelines muestrea y anota los logs emparejando la consulta de búsqueda con los diferentes pasos de procesamiento por los que están pasando, lo que te permite identificar todos los cambios en tus logs.

1. Ve a [Log Explorer (Explorador de logs)][1].
1. Haz clic en un log del que quieres averiguar qué pipelines y procesadores lo modifican.
1. Haz clic en el icono del analizador de logs, en la esquina superior derecha del panel. Si te sitúas sobre el icono, aparecerá `View pipelines for similar logs`.
   Haz clic en un atributo en el panel de logs y selecciona **Scan pipelines for** (Analizar pipelines para). 
1. Puedes afinar aún más tu consulta en la página [Analizador de pipelines][2]. Esta consulta no puede modificarse una vez iniciada la sesión.
1. Haga clic en **Launch this session** (Iniciar esta sesión).
   Durante los siguientes 15 minutos, los logs que coinciden con tu consulta se etiquetan con la información de los pipelines y los procesadores que los están modificando. En el analizador, Live Tail muestra cuáles y cuántos pipelines coinciden con cada uno de los logs.
1. Haz clic en un log para ver el lista de pipelines y procesadores que coinciden con ese log. Live Tail se detiene en este punto.

Puedes modificar los pipelines y los procesadores en el panel lateral derecho. Las modificaciones que realices no afectarán a los logs que ya se hayan procesado. Haz clic en **Play** (Reproducir) para ver los nuevos logs que han sido modificados por los pipelines y los procesadores actualizados.

También puedes acceder al analizador de pipelines desde la página Pipelines de logs:

1. Ve a [Pipelines de logs][3]. 
2. Haz clic en **Pipeline Scanner** (Analizador de pipelines).
3. Define la consulta para los logs que quieres inspeccionar.

### Limitaciones

El permiso `logs_write_pipelines` es necesario para utilizar el analizador de pipelines. Para obtener más información, consulta los [permisos de configuración del control de acceso basado en roles (RBAC) en Log Management][4].

El número de sesiones que puedes iniciar es limitado:

- Un máximo de 3 sesiones simultáneas.
- Un máximo de 12 sesiones en un intervalo de 12 horas.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: https://app.datadoghq.com/logs/pipelines?query=source:*
[3]: https://app.datadoghq.com/logs/pipelines
[4]: /es/account_management/rbac/permissions/#log-management