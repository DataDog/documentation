---
further_reading:
- link: /security/cloud_security_management/guide/frontier_group/
  tag: Documentación
  text: Cloud Security Frontier Group
- link: /integrations/guide/reference-tables/
  tag: Documentación
  text: Tablas de Referencia
title: Configurar Preferencias de Propiedad
---
## Descripción General {#overview}

El Agente de Propiedad selecciona un subconjunto de recursos en la nube con hallazgos de seguridad e infiere un propietario para cada uno. Por defecto, utiliza etiquetas de recursos en la nube, datos del catálogo de servicios y otras fuentes de datos para inferir la propiedad.

**Las preferencias de propiedad** le permiten personalizar este proceso proporcionando sus propias reglas. Las almacena en una [tabla de referencia de Datadog][1], y el Agente de Propiedad las lee automáticamente para mejorar sus resultados.

## Cree un archivo de preferencias de propiedad {#create-an-ownership-preference-file}

1. Cree un archivo CSV siguiendo el formato descrito a continuación. Opcionalmente, utilice la [habilidad de IA del Agente de Propiedad][5] con su asistente de codificación de IA para generar el CSV de manera interactiva.
2. [Cárguelo](#upload-your-ownership-preferences) como una tabla de referencia llamada `k9_ownership_preferences`. Las preferencias entran en efecto dentro de 24 horas.

### Tipos de preferencias {#preference-types}

Cada fila en su tabla de referencia es una preferencia. La `preference_type` columna determina lo que hace la fila.

| Tipo          | Lo que hace                                                   |
|---------------|----------------------------------------------------------------|
| `tag_mapping` | When a resource has a matching tag, asigne el propietario especificado |
| `exclusion`   | Evite que un identificador específico sea asignado como propietario    |
| `prompt_text` | Proporcione orientación personalizada al motor de inferencia de IA             |

### Mapeo de etiquetas {#tag-mappings}

Un mapeo de etiquetas dice: _"Cuando un recurso tiene la etiqueta `X:Y`, pertenece a este propietario."_

El Agente de Propiedad verifica las etiquetas de recursos en la nube contra sus mapeos. Cuando encuentra una coincidencia, agrega al propietario especificado como candidato. Múltiples mapeos pueden coincidir con el mismo recurso, produciendo múltiples candidatos que el Agente de Propiedad clasifica junto a otras fuentes de datos.

Los mapeos de etiquetas complementan las fuentes de datos de propiedad existentes. No anulan una etiqueta de propiedad directa (como `dd-team`) que ya está presente en el recurso.

#### Columnas {#columns}

| Columna                 | Descripción                                                                |
|------------------------|----------------------------------------------------------------------------|
| `preference_type`      | Debe ser `tag_mapping`                                                      |
| `tag_key`              | Clave de etiqueta para coincidir (por ejemplo, `cost-center`, `project`)                   |
| `tag_value` (opcional) | Valor de etiqueta para coincidir. Deje vacío para coincidir con cualquier valor para esa clave (Wildcard) |
| `owner`                | Propietario a asignar (por ejemplo, `team-platform`, `alice@example.com`)        |
| `owner_type`           | Tipo de propietario: `team`, `user` o `service`                                |
| `confidence`           | Qué tan fuertemente este mapeo indica propiedad: `high`, `medium` o `low`  |

#### Tipo de propietario {#owner-type}

El `owner_type` campo le indica al Agente de Propiedad qué tipo de entidad es el propietario. Esto ayuda al motor de IA a tomar mejores decisiones al clasificar candidatos.

| Valor | Cuándo usar |
| --- | --- |
| `team` | El propietario es un identificador de equipo (por ejemplo, `team-platform`, `sre-team`) |
| `user` | El propietario es un individuo (por ejemplo, `alice@example.com`) |
| `service` | El propietario es una cuenta de servicio o automatización (por ejemplo, `payment-svc`) |

#### Comportamiento de coincidencia {#matching-behavior}

- La coincidencia de clave y valor de etiqueta es **insensible a mayúsculas y minúsculas**. `Cost-Center` coincide con `cost-center`.
- Una etiqueta vacía `tag_value` coincide con **cualquier valor** para esa clave de etiqueta (Wildcard).
- Si múltiples mapeos coinciden, todos producen candidatos. El Agente de Propiedad los clasifica por confianza.

#### Niveles de confianza {#confidence-levels}

| Nivel | Cuándo usar |
| --- | --- |
| `high` | La etiqueta identifica de manera confiable al propietario. Ejemplo: una etiqueta `cost-center` que se mapea 1:1 a un equipo |
| `medium` | La etiqueta es un buen indicador, pero puede no ser siempre correcta. Ejemplo: una etiqueta `project` compartida entre equipos |
| `low` | La etiqueta proporciona una pista pero necesita corroboración. Ejemplo: una etiqueta `env` que se correlaciona de manera laxa con un equipo |

#### Ejemplo: Mapear centros de costo a equipos {#example-map-cost-centers-to-teams}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,tag_mapping,cost-center,CC-100,team-platform,team,high,,,,,
2,tag_mapping,cost-center,CC-200,team-data-eng,team,high,,,,,
3,tag_mapping,cost-center,CC-300,team-security,team,high,,,,,
```

#### Ejemplo: Mapear proyectos a propietarios {#example-map-projects-to-owners}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,tag_mapping,project,atlas,team-atlas,team,medium,,,,,
2,tag_mapping,project,hermes,alice@example.com,user,medium,,,,,
3,tag_mapping,project,payments,team-fintech,team,high,,,,,
```

#### Ejemplo: Coincidencia comodín de cualquier recurso con una etiqueta `managed-by` {#example-wildcard-match-any-resource-with-a-managed-by-tag}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,tag_mapping,managed-by,,team-infra,team,low,,,,,
```

Esto coincide con cualquier valor de la etiqueta `managed-by` y lo asigna a `team-infra` con baja confianza. Debido a que la confianza es baja, las fuentes de datos más sólidas tienen prioridad.

### Exclusiones {#exclusions}

Una exclusión le dice al Agente de Propiedad: "Nunca asignes este identificador como propietario de recurso."

Las cuentas de bot, los ejecutores de CI y las cuentas de servicio compartido a menudo aparecen en los metadatos de recursos en la nube (por ejemplo, como el creador o el último modificador). Las exclusiones eliminan estos de los resultados de propiedad para que solo aparezcan los verdaderos propietarios.

#### Columnas {#columns-1}

| Columna                               | Descripción                                                                                                                  |
|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `preference_type`                    | Debe ser `exclusion`                                                                                                          |
| `handle`                             | Identificador de propietario a excluir (por ejemplo, `deploy-bot`, `ci-runner`)                                                             |
| `exclusion_type` (opcional)          | Limitar la exclusión a un tipo específico de propietario: `team`, `user` o `service`. Deje vacío para excluir para todos los tipos de exclusión       |
| `exclusion_resource_type` (opcional) | Limitar la exclusión a un tipo específico de recurso (por ejemplo, `aws_ec2_instance`). Deje vacío para excluir para todos los tipos de recursos |

#### Comportamiento de coincidencia {#matching-behavior-1}

- El `handle` se compara **sin distinción de mayúsculas y minúsculas**.
- Los filtros opcionales utilizan la lógica **Y**. Todos los campos no vacíos deben coincidir para que se aplique la exclusión.
- Deje `exclusion_type` y `exclusion_resource_type` vacíos para excluir el identificador de todos los resultados (lo más común).

#### Ejemplo: Excluir cuentas de bots comunes de todos los resultados {#example-exclude-common-bot-accounts-from-all-results}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,exclusion,,,,,,deploy-bot,,,,
2,exclusion,,,,,,ci-runner,,,,
3,exclusion,,,,,,github-actions,,,,
4,exclusion,,,,,,terraform-automation,,,,
```

#### Ejemplo: Excluir una cuenta de servicio solo para tipos de recursos específicos {#example-exclude-a-service-account-only-for-specific-resource-types}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,exclusion,,,,,,k8s-node-controller,service,aws_ec2_instance,,
2,exclusion,,,,,,autoscaler-svc,service,aws_ec2_instance,,
```

Estas exclusiones solo se aplican a instancias de EC2. Los mismos identificadores siguen siendo elegibles como propietarios para otros tipos de recursos.

#### Ejemplo: Excluir un identificador de equipo para un tipo de recurso específico {#example-exclude-a-team-handle-for-a-specific-resource-type}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,exclusion,,,,,,legacy-ops,team,aws_ec2_instance,,
```

Esto excluye `legacy-ops` solo cuando aparece como candidato de equipo para instancias de EC2. Todavía se considera para buckets de S3 u otros tipos de recursos.

### Texto de aviso personalizado {#custom-prompt-text}

El texto de aviso personalizado proporciona orientación en formato libre al motor de inferencia de IA. Úselo para compartir contexto organizacional que ayude a la IA a tomar mejores decisiones de propiedad, como convenciones de nombres, estructuras de equipo o qué fuentes de datos priorizar.

Puede proporcionar hasta **tres** entradas de texto de aviso, una para cada nivel de prioridad (`high`, `medium`, `low`). Las entradas con la misma prioridad se concatenan. Utilice la prioridad para controlar qué orientación considera primero el motor de IA.

#### Columnas {#columns-2}

| Columna                | Descripción                                                                                       |
|-----------------------|---------------------------------------------------------------------------------------------------|
| `preference_type`     | Debe ser `prompt_text`                                                                             |
| `prompt_text`         | Su texto de orientación (hasta 4,096 bytes por entrada) |
| `priority` (opcional) | Controla el orden: `high` las entradas se consideran primero, luego `medium`, y después `low`. Predeterminado: `low` |

#### Consejos para escribir orientaciones efectivas {#tips-for-writing-effective-guidance}

- Sea específico y accionable. "La etiqueta `cost-center` es nuestra señal de propiedad más confiable" es mejor que "Usar etiquetas".
- Explique las convenciones de su organización: patrones de nombramiento de equipos, cómo interpretar etiquetas específicas, etc.
- Mencione cuentas que no deberían ser propietarios (también añada estas como filas de exclusión para la aplicación).
- Utilice una entrada por nivel de prioridad para organizar su orientación por importancia.

#### Ejemplo: contexto específico de la organización dividido por prioridad {#example-organization-specific-context-split-by-priority}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,prompt_text,,,,,,,,Our organization assigns ownership by cost center. The cost-center tag is the primary ownership signal for all cloud resources. Team identifiers always use the team- prefix followed by the team name (e.g. team-platform team-data-eng).,high
2,prompt_text,,,,,,,,Shared infrastructure accounts (deploy-bot ci-runner github-actions terraform-automation) are automation accounts and should never be assigned as resource owners. Look for the human or team that configured the automation instead.,medium
3,prompt_text,,,,,,,,For container images the repository owner in our GitHub organization is a reliable secondary signal when cost-center tags are missing.,low
```

### Formato de tabla de referencia {#reference-table-format}

#### Esquema de columna {#column-schema}

Su tabla de referencia debe llamarse `k9_ownership_preferences` y contener estas 12 columnas:

| Columna                    | Tipo   | Descripción                                                                         |
|---------------------------|--------|-------------------------------------------------------------------------------------|
| `id`                      | Cadena | **Requerido para todas las filas.** Identificador único para la fila. Utilizado como la clave principal   |
| `preference_type`         | Cadena | **Requerido para todas las filas.** Tipo de fila: `tag_mapping`, `exclusion`, o `prompt_text`   |
| `tag_key`                 | Cadena | Clave de etiqueta para coincidir (solo mapeos de etiquetas)                                                |
| `tag_value`               | Cadena | Valor de etiqueta para coincidir; dejar vacío como un comodín (solo asignaciones de etiquetas) |
| `owner`                   | Cadena | Manejador del propietario a asignar (solo asignaciones de etiquetas) |
| `owner_type`              | Cadena | Tipo de propietario: `team`, `user` o `service` (solo asignaciones de etiquetas) |
| `confidence`              | Cadena | Nivel de confianza: `high`, `medium` o `low` (solo asignaciones de etiquetas) |
| `handle`                  | Cadena | Manejador del propietario a excluir (solo exclusiones) |
| `exclusion_type`          | Cadena | Filtro de tipo de propietario para exclusión; dejar vacío para excluir todos los tipos (solo exclusiones) |
| `exclusion_resource_type` | Cadena | Filtro de tipo de recurso para exclusión; dejar vacío para excluir todos (solo exclusiones) |
| `prompt_text`             | Cadena | Texto de orientación (solo texto de aviso) |
| `priority`                | Cadena | Prioridad de ordenación: `high`, `medium` o `low` (solo texto de aviso) |

Cada fila utiliza un subconjunto de columnas dependiendo de `preference_type`. Dejar columnas no utilizadas vacías.

#### Uso de columnas por tipo de preferencia {#column-usage-by-preference-type}

| Columna | `tag_mapping` | `exclusion` | `prompt_text` |
| --- | --- | --- | --- |
| `id` | requerido | requerido | requerido |
| `preference_type` | `"tag_mapping"` | `"exclusion"` | `"prompt_text"` |
| `tag_key` | requerido | — | — |
| `tag_value` | opcional (vacío significa comodín) | — | — |
| `owner` | requerido | — | — |
| `owner_type` | requerido | — | — |
| `confidence` | requerido | — | — |
| `handle` | — | requerido | — |
| `exclusion_type` | — | opcional | — |
| `exclusion_resource_type` | — | opcional | — |
| `prompt_text` | — | — | requerido |
| `priority` | — | — | opcional |

### Ejemplo completo {#complete-example}

Un CSV listo para usar con los tres tipos de preferencias:

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,tag_mapping,cost-center,CC-100,team-platform,team,high,,,,,
2,tag_mapping,cost-center,CC-200,team-data-eng,team,high,,,,,
3,tag_mapping,cost-center,CC-300,team-security,team,high,,,,,
4,tag_mapping,project,atlas,team-atlas,team,medium,,,,,
5,tag_mapping,project,hermes,alice@example.com,user,medium,,,,,
6,tag_mapping,env,production,sre-team,team,low,,,,,
7,tag_mapping,managed-by,,team-infra,team,low,,,,,
8,exclusion,,,,,,deploy-bot,,,,
9,exclusion,,,,,,ci-runner,service,,,
10,exclusion,,,,,,github-actions,service,,,
11,exclusion,,,,,,legacy-ops,team,aws_ec2_instance,,
12,prompt_text,,,,,,,,Our organization assigns ownership by cost center. The cost-center tag is the primary ownership signal for all cloud resources. Team identifiers always use the team- prefix followed by the team name (e.g. team-platform team-data-eng).,high
13,prompt_text,,,,,,,,Shared infrastructure accounts (deploy-bot ci-runner github-actions) are automation accounts and should never be assigned as resource owners. Look for the human or team that configured the automation instead.,medium
14,prompt_text,,,,,,,,For container images the repository owner in GitHub is a reliable secondary signal when cost-center tags are missing.,low
```

## Reglas de validación {#validation-rules}

Todos los datos de preferencias son validados cuando el Agente de Propiedad lee su tabla de referencia. **La validación es todo o nada**: si alguna fila falla la validación, el Agente de Propiedad rechaza el **conjunto** de preferencias completo para ese ciclo de sincronización. Cuando esto sucede, las preferencias quedan vacías hasta que se carga un conjunto válido.

Este enfoque estricto ayuda a asegurar que esté trabajando con un conjunto de preferencias consistente y completamente válido.

### Caracteres permitidos {#allowed-characters}

Diferentes campos aceptan diferentes conjuntos de caracteres:

| Tipo de campo | Caracteres permitidos | Aplica a |
| --- | --- | --- |
| Campos estructurados | Letras, dígitos, `-` `_` `.` `:` `/` `@` | `tag_key`, `owner`, `handle`, `exclusion_type`, `exclusion_resource_type`, `owner_type`, `confidence`, `priority` |
| Valores de etiqueta | Iguales a los campos estructurados, más espacios | `tag_value` |
| Texto del aviso | Letras, dígitos, `-` `_` `.` `:` `/` `@` `#` `,` `;` `!` `?` `(` `)` `'` `"` `` ` `` espacios, tabulaciones, saltos de línea | `prompt_text` |

#### Restricciones notables {#notable-restrictions}

- **Los corchetes angulares** (`<`, `>`) no están **permitidos** en ningún campo, incluido el texto del aviso.
- **Las llaves** (`{`, `}`) no están **permitidas** en ningún campo.
- **Los caracteres de barra** (`|`) no están **permitidos** en ningún campo.

Estas restricciones previenen artefactos de formato y ayudan a asegurar un procesamiento limpio por parte del motor de IA.

### Límites de tamaño {#size-limits}

| Límite                               | Valor                                                                              |
|-------------------------------------|------------------------------------------------------------------------------------|
| Máximo de asignaciones de etiquetas                | 50 filas                                                                            |
| Máximo de exclusiones                  | 20 filas                                                                            |
| Máximo de entradas de texto del aviso         | Tres filas (una por nivel de prioridad)                                                |
| Máximo de bytes por campo             | 1,024 bytes (aplica a clave de etiqueta, valores de etiqueta, propietarios, identificadores y campos similares) |
| Máximo de bytes por entrada de texto del aviso | 4,096 bytes                                                                        |

### Detección de duplicados {#duplicate-detection}

El Agente de Propiedad rechaza todo el conjunto de preferencias si contiene entradas conflictivas o duplicadas:

- **Asignaciones de etiquetas**: Dos filas con el mismo `tag_key` y `tag_value` pero diferentes `owner` valores son un conflicto. Dos filas con el mismo `tag_key`, `tag_value`, y `owner` pero diferentes `confidence` niveles también son un conflicto. Se permiten duplicados exactos (todos los campos idénticos).
- **Exclusiones**: Dos filas con el mismo `handle`, `exclusion_type` y `exclusion_resource_type` son un duplicado. Las comparaciones no distinguen entre mayúsculas y minúsculas.

Si el Agente de Propiedad detecta algún conflicto o duplicado, rechaza todo el conjunto de preferencias.

### Directrices de contenido para el texto del aviso {#content-guidelines-for-prompt-text}

El motor de IA procesa el texto del aviso como contexto organizacional. Para ayudar a asegurar que su orientación sea efectiva:

- **Utilice oraciones simples y declarativas**: Describa hechos sobre su organización.
- **Evite el formato especial**: Los encabezados de Markdown, las etiquetas HTML y las etiquetas similares a XML se eliminan durante el procesamiento.
- **Enfócate en las fuentes de datos de propiedad**: Describe qué etiquetas, convenciones de nomenclatura o estructuras de equipo indican propiedad.

#### Ejemplos {#examples}

- "La etiqueta de centro de costos es nuestra señal de propiedad más confiable para todos los recursos en la nube."
- "Los identificadores de equipo siempre utilizan el prefijo de equipo- (por ejemplo, equipo-plataforma, equipo-datos-eng)."
- "Los recursos en la cuenta us-east-1/prod son gestionados por el equipo-sre."

## Cargue sus preferencias de propiedad {#upload-your-ownership-preferences}

Datadog almacena sus preferencias como una [tabla de referencia][1]. La tabla debe llamarse `k9_ownership_preferences` y contener todos los 12 encabezados de columna, incluso si algunas filas los dejan vacíos.

Hay varias formas de crear y actualizar la tabla:

### Opción 1: Carga manual de CSV (interfaz de usuario de Datadog) {#option-1-manual-csv-upload-datadog-ui}

Este enfoque es el mejor para comenzar o hacer actualizaciones ocasionales.

1. Prepare su archivo CSV (vea [Ejemplo completo](#complete-example)).
2. En Datadog, ve a **Integraciones** > [**Tablas de Referencia**][6].
3. Haga clic en **Nueva Tabla de Referencia**.
4. Cargue su archivo CSV.
5. Establece el nombre de la tabla como `k9_ownership_preferences`.
6. Elige `id` como la clave primaria.
7. Haga clic en **Guardar**.

Para actualizar tu tabla de referencia, sube un nuevo CSV a la misma tabla para reemplazar completamente su contenido.

Las cargas manuales admiten archivos de hasta 4 MB.

### Opción 2: Sincronización de almacenamiento en la nube (S3, Azure Blob, GCS) {#option-2-cloud-storage-sync-s3-azure-blob-gcs}

Este enfoque es el mejor para actualizaciones automáticas y recurrentes. Almacena tu CSV en un bucket de almacenamiento en la nube para que Datadog pueda importarlo periódicamente.

1. Sube tu CSV a un **bucket de Amazon S3**, **contenedor de Azure Blob Storage**, o **bucket de Google Cloud Storage**.
2. En Datadog, ve a **Integraciones** > [**Tablas de Referencia**][6].
3. Haz clic en **Nueva Tabla de Referencia** y selecciona **Almacenamiento en la Nube** como la fuente.
4. Proporciona la ruta de almacenamiento y las credenciales (rol IAM para S3, cadena de conexión para Azure, cuenta de servicio para GCS).
5. Establece el nombre de la tabla como `k9_ownership_preferences`.
6. Elige `id` como la clave primaria.
7. Haz clic en **Guardar**.

Datadog reimporta periódicamente el archivo, por lo que detecta automáticamente las actualizaciones del CSV en su bucket.

Las cargas de almacenamiento en la nube admiten archivos de hasta 200 MB.

Consulta la [documentación de tablas de referencia][1] para obtener instrucciones detalladas de configuración por proveedor de nube.

### Opción 3: Terraform {#option-3-terraform}

Este enfoque es el mejor para gestionar preferencias como infraestructura como código junto con sus otros recursos de Datadog.

El [proveedor de Terraform de Datadog][2] admite tablas de referencia. Úselo para crear y actualizar la tabla de manera declarativa.

Para más información, consulte [datadog_reference_table (Recurso)][7] en la documentación del proveedor de Terraform de Datadog.

### API {#api}

También puede gestionar tablas de referencia programáticamente a través de la [API de Tablas de Referencia][3]. Consulta la documentación de la API para los puntos de conexión disponibles.

Reemplace `api.datadoghq.com` con su [URL del sitio de Datadog][4] si corresponde (por ejemplo, `api.datadoghq.eu`, `api.us3.datadoghq.com`).

## Cuando las preferencias entran en vigor {#when-preferences-take-effect}

1. Cargue o actualice su tabla de referencia.
2. El Ownership Agent lee la tabla periódicamente (aproximadamente una vez al día por organización).
3. El Ownership Agent valida las preferencias en su tabla. Si la validación es exitosa, las nuevas preferencias reemplazan el conjunto anterior.
4. En la próxima ejecución de inferencia de propiedad para cada recurso:
   - **Los mapeos de etiquetas** añaden candidatos a la propiedad basados en sus reglas de etiquetas.
   - **Las exclusiones** eliminan manejadores no deseados de los resultados.
   - **El texto de aviso personalizado** guía al motor de inferencia de IA.
5. Los resultados actualizados aparecen en la interfaz de gestión de postura de seguridad en la nube.

Los cambios en su tabla de referencia entran en vigor dentro de **24 horas**.

<div class="alert alert-info">Si elimina todas las filas de la tabla (dejándola vacía), el Ownership Agent elimina activamente sus preferencias anteriores. Eliminar la tabla por completo tiene el mismo efecto: las preferencias en caché expiran y quedan vacías.</div>

## Solución de problemas {#troubleshooting}

La validación es todo o nada. Si alguna fila tiene un problema, el Ownership Agent rechaza toda la preferencia y deja todas las preferencias vacías hasta que cargue un conjunto válido.

| Problema                                  | Causa probable                      | Solución                                                                                                                                                                                                                     |
|------------------------------------------|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Preferencias no entran en vigor después de 24 horas | El nombre de la tabla es incorrecto               | Debe ser exactamente `k9_ownership_preferences`                                                                                                                                                                              |
| Preferencias no entran en vigor después de 24 horas | Faltan encabezados de columna            | Las 12 columnas deben existir como encabezados CSV, incluso si las filas las dejan vacías |
| Preferencias no entran en vigor después de 24 horas | Función no habilitada para su organización  | Contacte a [soporte de Datadog][8] para habilitar las preferencias de propiedad. |
| Todas las preferencias rechazadas                 | Caracteres no válidos en cualquier campo   | Vea [Caracteres permitidos](#allowed-characters). Los signos de menor, llaves y caracteres de tubería no están permitidos.                                                                                                     |
| Todas las preferencias rechazadas                 | Falta un campo requerido en cualquier fila | Verifique que `tag_key`, `owner`, `owner_type` y `confidence` estén poblados para mapeos de etiquetas; `handle` para exclusiones; `prompt_text` para entradas de texto de aviso                                                            |
| Todas las preferencias rechazadas                 | Filas duplicadas o en conflicto     | Dos mapeos de etiquetas con el mismo `tag_key`+`tag_value` pero diferentes `owner` o `confidence` valores causan rechazo. Los duplicados exactos de exclusiones también causan rechazo. Vea [Detección de duplicados](#duplicate-detection) |
| Todas las preferencias rechazadas                 | Valor `confidence` no válido        | Debe ser exactamente `high`, `medium` o `low`                                                                                                                                                                              |
| Todas las preferencias rechazadas                 | Valor `owner_type` no válido        | Debe ser `team`, `user` o `service` (sin distinción entre mayúsculas y minúsculas)                                                                                                                                                                 |
| Todas las preferencias rechazadas                 | Límite de tamaño excedido               | Verifique el conteo de filas (50 mapeos de etiquetas, 20 exclusiones, tres entradas de texto de aviso) y las longitudes de campo (1,024 bytes por campo, 4,096 por entrada de aviso)                                                                          |
| Todas las preferencias rechazadas                 | Formato de texto del aviso            | Los encabezados de Markdown y las etiquetas HTML/XML se eliminan durante el procesamiento. Utilice solo texto plano.                                                                                                                                 |
| El mapeo de etiquetas no coincide con un recurso      | Error ortográfico                 | La coincidencia no distingue entre mayúsculas y minúsculas, pero verifique la clave y el valor exactos de la etiqueta en su recurso |
| Exclusión no aplicada                    | Los filtros de alcance son demasiado restrictivos        | Todos los campos no vacíos deben coincidir (lógica AND). Deje `exclusion_type` y `exclusion_resource_type` vacíos para exclusiones amplias                                                                                            |
| Preferencias borradas inesperadamente         | La tabla fue vaciada o eliminada      | Tanto una tabla vacía como una tabla eliminada hacen que las preferencias en caché expiren. Cargue un CSV válido para restaurar preferencias.                                                                                                  |

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/guide/reference-tables/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[3]: /es/api/latest/reference-tables/
[4]: /es/getting_started/site/
[5]: https://github.com/datadog-labs/agent-skills/tree/main/dd-security/csm/ownership-agent
[6]: https://app.datadoghq.com/reference-tables
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/reference_table
[8]: /es/help