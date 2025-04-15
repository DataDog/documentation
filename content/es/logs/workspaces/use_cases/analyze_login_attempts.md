---
further_reading:
- link: /logs/workspaces/
  tag: Documentación
  text: Más información sobre Log Workspaces
title: Analizar los intentos de inicio de sesión para la e-PHI
---

## Caso práctico

Log Workspaces te permite introducir datos de logs para analizar los intentos de inicio de sesión y auditar el acceso a la información electrónica protegida sobre el estado (e-PHI). Para empezar a monitorizar e identificar los intentos fallidos de inicio de sesión, utiliza las opciones flexibles de consulta y visualización de Workspaces siguiendo estos pasos.

## Configuración

Esta guía asume que:
- Estás enviando logs a Datadog para un caso de uso similar.
- Puedes [crear un espacio de trabajo][1] y añadir celdas. 

### 1. Introducir tu fuente de datos

Para empezar, introduce los logs de los servicios que quieres analizar.
1. [Crea un nuevo espacio de trabajo][2].
1. Selecciona **Consulta de logs** como fuente de datos.

### 2. Consultar inicios de sesión fallidos

Para buscar intentos de inicio de sesión fallidos que puedan indicar intentos no autorizados de acceder a la e-PHI, configura tu consulta de logs para filtrar los eventos. Un ejemplo de consulta podría incluir el filtrado utilizando el código de resultado de un evento que significa un fallo.

{{< img src="/logs/workspace/use_cases/query_failed_logs.png" alt="Ejemplo de consulta de un espacio de trabajo para buscar intentos de inicio de sesión" style="width:100%;" >}}

Puedes añadir filtros, facetas o atributos adicionales para delimitar tu búsqueda en función de sus necesidades y de lo que hayat disponible en tus logs.

### 3. Contar los inicios de sesión fallidos por ID de usuario

Para seguir analizando los datos, puedes contar el número de intentos de inicio de sesión fallidos por ID de usuario y ordenar los resultados. Esto es útil para identificar a los usuarios con repetidos intentos de inicio de sesión fallidos, que pueden requerir una mayor investigación.

1. Añade una [celda de análisis][3] a tu espacio de trabajo.
1. Ejecuta una consulta SQL.
    ```
    SELECT * FROM failed_logins
    ```
    {{< img src="/logs/workspace/use_cases/analyze_failed_login_count.png" alt="Celda de análisis con una consulta para contar el número de inicios de sesión fallidos" style="width:100%;" >}}

### 4. Visualizar los inicios de sesión fallidos a lo largo del tiempo

Para obtener una imagen más clara de cuándo se producen los inicios de sesión fallidos, puedes crear una visualización de línea de tiempo o Serie temporal.
1. Añade una [celda de visualización][4].
1. Elige Series temporales en el menú desplegable "Visualizar como".
1. Configura el gráfico para mostrar el número de intentos de inicio de sesión fallidos a lo largo del tiempo, utilizando los resultados de la consulta como fuente de datos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/logs/workspaces/#create-a-workspace-and-add-a-data-source
[2]: /es/logs/workspaces/
[3]: /es/logs/workspaces/#analysis-cell
[4]: /es/logs/workspaces/#visualization-cell