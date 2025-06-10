---
code_lang: python
code_lang_weight: 50
title: Requisitos de compatibilidad de Python
type: lenguaje de código múltiple
---
## Soporte para funciones de protección de las aplicaciones y las API

Las siguientes funciones de seguridad de las aplicaciones son compatibles con la biblioteca Python para la versión de rastreador especificada:

| Función de protección de las aplicaciones y las API        | Versión mínima de rastreador Python |
|----------------------------------------|-------------------------------|
| Detección de amenazas                       | 1.9.0                         |
| Protección frente a amenazas                      | 1.10.0                        |
| Personalizar la respuesta a las solicitudes bloqueadas | 1.19.0                        |
| Análisis de la composición del software (SCA)    | 1.5.0                         |
| Code Security (Vista previa)                   | 2.9.3                         |
| Seguimiento automático de los eventos de actividades de usuarios | 1.17.0                        |
| Seguridad de la API                           | 2.6.0                         |

**Nota**: La protección frente a amenazas requiere habilitar la [configuración remota][2], que se incluye en la versión mínima de rastreador indicada.

### Tipos de despliegue compatibles
| Tipo        | Compatibilidad con la detección de amenazas | Análisis de composición de software |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| Kubernetes  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate | {{< X >}}                | {{< X >}}                     |
| AWS Lambda  | {{< X >}}                |                               |


## Compatibilidad con lenguajes y marcos

### Versiones compatibles de Python 

La biblioteca cliente de la aplicación Python y de protección de la API sigue una [política de control de versiones][3] en la cual se especifica el nivel de compatibilidad para las diferentes versiones de la biblioteca y el tiempo de ejecución de Python.

Se admiten dos ramificaciones de versiones:

| Versión    | Nivel de compatibilidad        |
|------------|----------------------|
| `<1`       | Mantenimiento           |
| `>=1.0,<2` | Disponibilidad general |

Y la biblioteca es compatible con los siguientes tiempos de ejecución:

| Sistema operativo      | CPU                   | Tiempo de ejecución | Versión de tiempo de ejecución | Versiones de ddtrace compatibles |
|---------|-----------------------|---------|-----------------|--------------------------|
| Linux   | x86-64, i686, AArch64 | CPython | 2.7, 3.5-3.11   | `<2`                     |
| MacOS   | Intel, Apple Silicon  | CPython | 2.7, 3.5-3.11   | `<2`                     |
| Windows | 64 bits, 32 bits          | CPython | 2.7, 3.5-3.11   | `<2`                     |


### Compatibilidad con marcos web

- Detalles de una solicitud HTTP originada por un atacante
- Etiquetas (tags) para la solicitud HTTP (código de estado, método, etc.)
- Rastreo distribuido para visualizar flujos (flows) de ataques en tus aplicaciones

##### Notas sobre la función de protección de las aplicaciones y las API
- **El Análisis de la composición del software** es compatible con todos los marcos.

### Marcos compatibles


| Marco                | Versiones    | ¿Es compatible la detección de amenazas? | ¿Es compatible la protección frente a amenazas? |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- |
| Django    | 2.2   |  {{< X >}} | {{< X >}}  |
| FastAPI   | 0.86  |  {{< X >}} | {{< X >}}  |
| Flask     | 1.1   |  {{< X >}} | {{< X >}}  |


<div class="alert alert-info">Si no encuentras el marco que buscas en la lista, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

### Compatibilidad con almacenes de datos


**El rastreo de almacenes de datos proporciona:**

- temporización de solicitud a respuesta
- información de consulta (por ejemplo, una cadena de consulta desinfectada)
- captura de errores y stacktraces

##### Notas sobre la función de protección de las aplicaciones y las API
- **El Análisis de la composición del software** es compatible con todos los marcos.
- La **Protección frente a amenazas** también funciona en la capa de solicitud HTTP (entrada), por lo que funciona para todas las bases de datos por defecto, incluso aquellas que no aparecen en la siguiente tabla.
La biblioteca Python es compatible con las [especificaciones de API de bases de datos][4] y admite todas las bases de datos SQL genéricas. Esto incluye bases de datos como SQLite, Mysql, Postgres y MariaDB.

### Compatibilidad con marcos de autenticación de usuarios

**Las integraciones con marcos de autenticación de usuarios proporcionan:**

- Eventos de inicio de sesión de usuarios, incluidos los ID de usuarios
- Monitorización de la detección de la apropiación de cuentas para eventos de inicio de sesión de usuarios

| Marco         | Versiones de marcos   |
|-------------------| --------------------------- |
| Django            | 1.11, 2.2, 3.2, igual o anterior a 4.0

[1]: /es/tracing/trace_collection/compatibility/python/
[2]: /es/agent/remote_config/#enabling-remote-configuration
[3]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[4]: https://peps.python.org/pep-0249/