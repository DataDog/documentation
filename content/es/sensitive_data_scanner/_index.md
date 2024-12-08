---
aliases:
- /es/logs/log_configuration/sensitive_data_detection
- /es/account_management/org_settings/sensitive_data_detection
further_reading:
- link: /data_security/
  tag: Documentación
  text: Reducir los riesgos relacionados con los datos
- link: /sensitive_data_scanner/regular_expression_syntax
  tag: Documentación
  text: Sintaxis de expresiones regulares para reglas de escaneo personalizadas
- link: /sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
  tag: Documentación
  text: Prácticas recomendadas para crear reglas personalizadas
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: Blog
  text: Descubre, clasifica y corrige los problemas de datos confidenciales a escala
    con Sensitive Data Scanner.
- link: https://www.datadoghq.com/blog/sensitive-data-scanner/
  tag: Blog
  text: Crea una estrategia moderna de protección de datos con Datadog's Sensitive
    Data Scanner
- link: https://www.datadoghq.com/blog/sensitive-data-management-best-practices/
  tag: Blog
  text: Prácticas recomendadas para la gestión de datos confidenciales
- link: https://www.datadoghq.com/blog/data-security/
  tag: Blog
  text: Descubre datos confidenciales en tus almacenes de datos en la nube con Data
    Security
- link: https://www.datadoghq.com/blog/hipaa-compliance-sensitive-data-scanner/
  tag: Blog
  text: Cómo gestionan los datos confidenciales las empresas sujetas a los requisitos
    de la HIPAA con Datadog
title: Sensitive Data Scanner
---

## Información general

Los datos confidenciales, como números de tarjetas de crédito, números de cuenta bancaria y claves de API, a menudo quedan expuestos involuntariamente en los logs de las aplicaciones, en los tramos (spans) de APM y en los eventos RUM, lo cual puede exponer a tu organización a riesgos financieros y de privacidad.

Sensitive Data Scanner es un servicio de búsqueda de patrones basada en flujos, que se utiliza para identificar, etiquetar y, opcionalmente, redactar o extraer datos confidenciales. Los equipos de seguridad y cumplimiento pueden implementar Sensitive Data Scanner como una nueva línea de defensa, ayudando a prevenir las fugas de datos confidenciales y limitando los riesgos de incumplimiento.

Para utilizar Sensitive Data Scanner, configura un grupo de escaneo para definir qué datos escanear y, a continuación, configura reglas de escaneo para determinar qué información confidencial debe coincidir con los datos.

Este documento te guiará a través de los siguientes pasos:

- Establecer los permisos necesarios para ver y configurar Sensitive Data Scanner.
- Configurar el escaneo de datos confidenciales.
- Utilizar el dashboard predefinido.

**Nota**: Consulta [Cumplimiento de PCI DSS][1] para obtener información sobre la creación de una organización de Datadog que cumpla con PCI.

{{< img src="sensitive_data_scanner/sds_main_12_01_24.png" alt="La página del Sensitive Data Scanner que muestra seis de los 12 grupos de escaneo activos" style="width:90%;">}}

## Configurar Sensitive Data Scanner


Hay dos localizaciones en las que puedes redactar tus datos confidenciales:

**En la nube:**

- Con **Sensitive Data Scanner en la nube**, envías tus logs en el backend de Datadog. Con este método, los logs salen de tus instalaciones antes de ser redactados. Puedes tener varios grupos de escaneo por organización y crear reglas de escaneo personalizadas. También puedes redactar datos confidenciales en etiquetas (tags).

**En tu entorno:**

{{< callout url="https://www.datadoghq.com/private-beta/sensitive-data-scanner-using-Agent-in-your-premises/" >}}
La compatibilidad de Sensitive Data Scanner con el Datadog Agent está en fase de vista previa. Para inscribirte, haz clic en <strong>Request Access</strong> (Solicitar acceso).
{{< /callout >}}

- Con **Sensitive Data Scanner que usa el Agent**, Datadog redacta tus logs antes de enviarlos al backend de Datadog, y los logs no redactados nunca tienen que salir de tus instalaciones. Con este método, está limitado a un grupo de escaneo por organización y solo puede utilizar reglas de biblioteca predefinidas.

**Con pipelines de observabilidad:**

 Cuando [configuras un pipeline][2] en pipelines de observabilidad, añade el [procesador Sensitive Data Scanner][3] para redactar datos confidenciales en tus logs antes de que salgan de tu entorno. Consulta [Pipelines de observabilidad][4] para obtener más información.

### Requisitos previos

{{< tabs >}}
{{% tab "En la nube" %}}
Por defecto, los usuarios con el rol de Admin (administrador) de Datadog tienen acceso para ver y configurar reglas de escaneo. Para permitir el acceso a otros usuarios, concede los permisos `data_scanner_read` o `data_scanner_write` en [Cumplimiento][1] a un rol personalizado. Consulta [Control de acceso][2] para obtener más información sobre cómo configurar funciones y permisos.

{{< img src="sensitive_data_scanner/read_write_permissions.png" alt="Las secciones de permiso de cumplimiento que muestran permisos de lectura y escritura del Data Scanner" style="width:80%;">}}

[1]: /es/account_management/rbac/permissions/#compliance
[2]: /es/account_management/rbac/
{{% /tab %}}
{{% tab "Uso del Agent" %}}

1. Concede los permisos adecuados. Por defecto, los usuarios con el rol de Admin (administrador) de Datadog tienen acceso para ver y configurar reglas de escaneo. Para permitir el acceso a otros usuarios, concede los permisos `data_scanner_read` o `data_scanner_write` en [Cumplimiento][1] a un rol personalizado. Consulta [Control de acceso][2] para obtener más información sobre cómo configurar funciones y permisos.

    {{< img src="sensitive_data_scanner/read_write_permissions.png" alt="Las secciones de permiso de cumplimiento que muestran permisos de lectura y escritura del Data Scanner" style="width:80%;">}}
2. Sigue los pasos para [activar la configuración remota][3].
3. Instala la versión 7.54, o una más reciente, del Datadog Agent.

[1]: /es/account_management/rbac/permissions/#compliance
[2]: /es/account_management/rbac/
[3]: /es/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
{{% /tab %}}
{{< /tabs >}}

### Añadir un grupo de escaneo

{{< tabs >}}
{{% tab "En la nube" %}}
Un grupo de escaneo determina qué datos se deben escanear. Consta de un filtro de consulta y un conjunto de opciones para habilitar el escaneo de logs, APM, RUM y eventos. Consulta la documentación de [Sintaxis de búsqueda de logs][1] para obtener más información sobre los filtros de consulta.

Para Terraform, consulta el recurso [grupo de Datadog Sensitive Data Scanner][2].

Para configurar un grupo de escaneo, realiza los siguientes pasos:

1. Ve a la página de configuración [Sensitive Data Scanner][3].
1. Haz clic en **Add scanning group** (Añadir grupo de escaneo). Como alternativa, haz clic en el menú desplegable **Add** (Añadir) situado en la esquina superior derecha de la página y selecciona **Add Scanning Group** (Añadir grupo de escaneo).
1. Introduce un filtro de consulta para los datos que deseas escanear. En la parte superior, haz clic en **APM Spans** (Tramos de APM) para obtener una vista previa de los tramos (spans) filtrados. Haz clic en **Logs** para ver los logs filtrados.
1. Introduce un nombre y una descripción para el grupo.
1. Haz clic en los botones de conmutador para activar el Sensitive Data Scanner para los productos que desees (por ejemplo, logs, tramos de APM, eventos RUM y eventos de Datadog).
1. Haz clic en **Create** (Crear).

[1]: /es/logs/explorer/search_syntax/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_group
[3]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
{{% /tab %}}
{{% tab "Uso del Agent" %}}
<div class="alert alert-warning"><strong>Nota</strong>: Sensitive Data Scanner que utiliza el Agent solo admite un grupo de escaneo por organización.</div>

Un grupo de escaneo determina qué logs escanear. Consiste en un filtro de consulta para coincidir agentes elegibles basados en etiquetas de host.

Para configurar un grupo de escaneo, realiza los siguientes pasos:

1. Ve a la página de configuración de [Sensitive Data Scanner que utiliza el Agent][1].
1. Haz clic en **Add scanning group** (Añadir grupo de escaneo). Como alternativa, haz clic en el menú desplegable **Add** (Añadir) situado en la esquina superior derecha de la página y selecciona **Add Scanning Group** (Añadir grupo de escaneo).
1. Introduce un filtro de consulta para los datos que deseas escanear. Solo puedes utilizar etiquetas de nivel de host para los agentes coincidentes. En la parte inferior, se muestra el número de agentes coincidentes y elegibles, incluido el número total de todos los agentes que coinciden con la etiqueta.
1. Introduce un nombre y una descripción para el grupo.
1. Haz clic en **Save** (Guardar).

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/agent
{{% /tab %}}
{{< /tabs >}}

De manera predeterminada, los grupos de escaneo recién creados se encuentran deshabilitados. Para habilitar un grupo de escaneo, haz clic en el botón correspondiente en el lado derecho.

### Añadir reglas de escaneo

{{< tabs >}}
{{% tab "En la nube" %}}
Una regla de escaneo determina qué información confidencial debe coincidir en los datos que define un grupo de escaneo. Puedes añadir reglas de escaneo predefinidas en la biblioteca de reglas de escaneo de Datadog o crear tus propias reglas con patrones de expresión regular. Los datos se escanean en el momento de la ingesta durante el procesamiento. En el caso de los logs, esto significa que el escaneo se realiza antes de la indexación y otras decisiones de enrutamiento.

Para Terraform, consulta el recurso [regla de Datadog Sensitive Data Scanner][1].

Para añadir reglas de escaneo, realiza los siguientes pasos:

1. Ve a la página de configuración [Sensitive Data Scanner][2].
1. Haz clic en el grupo de escaneo en el que deseas añadir las reglas de escaneo.
1. Haz clic en **Add Scanning Rule** (Añadir regla de escaneo). Como alternativa, haz clic en el menú desplegable **Add** (Añadir) situado en la esquina superior derecha de la página y selecciona **Add Scanning Rule** (Añadir regla de escaneo).
1. Selecciona si deseas añadir una regla de biblioteca o crear una regla de escaneo personalizada.

{{< collapse-content title="Añadir regla de escaneo desde las reglas de bibliotecas" level="p" >}}

La biblioteca de reglas de escaneo contiene reglas predefinidas para detectar patrones comunes como direcciones de correo electrónico, números de tarjetas de crédito, claves de API, tokens de autorización, etc.

1. Selecciona un grupo de escaneo si no has creado esta regla dentro de un grupo de escaneo.
1. En la sección **Add library rules to the scanning group** (Añadir reglas de biblioteca al grupo de escaneo), selecciona las reglas de biblioteca que deseas utilizar.
{{% sds-scanning-rule %}}
1. Haz clic en **Add Rules** (Añadir reglas).

#### Añadir palabras clave adicionales

Después de añadir reglas de escaneo OOTB, puedes editar cada regla por separado y añadir palabras clave adicionales al diccionario de palabras clave.

1. Ve a la página de configuración [Sensitive Data Scanner][2].
1. Haz clic en el grupo de escaneo con la regla que deseas editar.
1. Pasa el ratón por encima de la regla y haz clic en el icono del lápiz.
1. Las palabras clave recomendadas se utilizan por defecto. Para añadir palabras clave adicionales, activa **Use recommended keywords** (Utilizar palabras clave recomendadas) y, a continuación, añade tus palabras clave a la lista. También puedes exigir que estas palabras clave estén dentro de un número determinado de caracteres de una coincidencia. Por defecto, las palabras clave deben estar dentro de los 30 caracteres anteriores a un valor coincidente.
1. Haz clic en **Update** (Actualizar).

{{< /collapse-content >}}
{{< collapse-content title="Añadir una regla de escaneo personalizada" level="p" >}}
Puedes crear reglas de escaneo personalizadas mediante patrones de expresiones regulares para analizar datos confidenciales.

1. Selecciona un grupo de escaneo si no has creado esta regla dentro de un grupo de escaneo.
1. En la sección **Definir condiciones de coincidencia**, especifica el patrón de expresiones regulares que se utilizará para la coincidencia con eventos en el campo **Definir la expresión regular**. Introduce datos de ejemplo en el campo **Añadir datos de ejemplo** para comprobar que el patrón de expresiones regulares es válido.
   Sensitive Data Scanner admite Perl Compatible Regular Expressions (PCRE) (Expresiones regulares compatibles con Perl), pero los siguientes patrones no son compatibles:
    - Referencias pasadas y captura de subexpresiones (lookarounds)
    - Aserciones arbitrarias de ancho cero
    - Referencias a subrutinas y patrones recursivos
    - Patrones condicionales
    - Verbos de control de rastreo retrospectivo
    - La directiva `\C` "single-byte" (que rompe las secuencias UTF-8)
    - La coincidencia de nueva línea `\R` 
    - La directiva de reinicio de la coincidencia `\K` 
    - Llamadas y código integrado
    - Agrupación atómica y cuantificadores posesivos
1. En **Create keyword dictionary** (Crear diccionario de palabras clave), añade palabras clave para mejorar la precisión de la detección cuando coincida con condiciones de expresión regular. Por ejemplo, si estás buscando un número de tarjeta de crédito Visa de dieciséis dígitos, puedes añadir palabras clave como `visa`, `credit` y `card`. También puedes exigir que estas palabras clave estén dentro de un número especificado de caracteres de una coincidencia. Por defecto, las palabras clave deben estar dentro de los 30 caracteres anteriores a un valor coincidente.
{{% sds-scanning-rule %}}
1. Haz clic en **Add Rule** (Añadir regla).
{{< /collapse-content >}}

**Notas**:

- Cualquier regla que añadas o actualices solo afectará a los datos que ingresen a Datadog después de que se haya definido la regla.
- Sensitive Data Scanner no afecta a ninguna regla que definas directamente en el Datadog Agent.
- Una vez que se añadan las reglas, asegúrate de que se hayan habilitado los botones de los grupos de escaneo para comenzar a escanear.

Consulta [Investigar problemas de datos confidenciales][3] para obtener más información sobre cómo utilizar la página [Resumen][4] para clasificar los problemas de datos confidenciales.


[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_rule
[2]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[3]: /es/sensitive_data_scanner/investigate_sensitive_data_issues/
[4]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary
{{% /tab %}}
{{% tab "Uso del Agent" %}}

Una regla de escaneo determina qué información confidencial debe coincidir dentro de los datos definidos por un grupo de escaneo. El Datadog Agent escanea tus datos en tu entorno local durante la recopilación de logs, antes de que los logs se envíen a la plataforma de Datadog.

<div class="alert alert-warning"><strong>Nota</strong>: Sensitive Data Scanner que utiliza el Agent solo admite reglas de escaneo predefinidas de la biblioteca de reglas de escaneo de Datadog. El número total de reglas de escaneo está limitado a 20.</div>

Para añadir reglas de escaneo, realiza los siguientes pasos:

1. Ve a la página de configuración de [Sensitive Data Scanner que utiliza el Agent][1].
1. Haz clic en **Add Scanning Rule** (Añadir regla de escaneo). Como alternativa, haz clic en el menú desplegable **Add** (Añadir) situado en la esquina superior derecha de la página y selecciona **Add Scanning Rule** (Añadir regla de escaneo).
1. En la sección **Add library rules to the scanning group** (Añadir reglas de biblioteca al grupo de escaneo), selecciona las reglas de biblioteca que deseas utilizar. Utiliza la entrada **Filter library rules** (Filtrar reglas de biblioteca) para buscar reglas de biblioteca existentes. Junto al nombre de la regla puedes encontrar la lista de etiquetas predefinidas para cada regla.
1. En la sección **Define rule target and action** (Definir objetivo y acción de la regla), selecciona la acción que deseas llevar a cabo para la información confidencial coincidente. **Nota**: La redacción, la redacción parcial y el hashing son acciones irreversibles.
    - **Redact** (Redactar): sustituye todos los valores coincidentes por el texto que especifiques en el campo **Replacement text** (Texto de sustitución).
    - **Partially Redact** (Redactar parcialmente): sustituye una parte especificada de todos los datos coincidentes. En la sección **Redact** (Redactar), especifica el número de caracteres que deseas redactar y qué parte de los datos coincidentes deseas redactar.
    - **Hash**: sustituye todos los datos coincidentes por un identificador único. Los bytes UTF-8 de la coincidencia reciben un hash con la huella digital de 64 bits de FarmHash.
1. Opcionalmente, añade etiquetas adicionales que desees asociar con eventos cuyos valores coincidan con el patrón regex especificado. Datadog añade etiquetas `sensitive_data` y `sensitive_data_category` por defecto. Estas etiquetas pueden utilizarse en búsquedas, dashboardsy monitores. Consulta [Control de acceso a logs con datos confidenciales](#control-access-to-logs-with-sensitive-data) para obtener información sobre cómo utilizar etiquetas para determinar quién puede acceder a logs que contienen información confidencial.
1. Haz clic en **Save** (Guardar).

**Notas**:

- Cualquier regla que añadas o actualices solo afectará a los datos que ingresen a Datadog después de que se haya definido la regla.
- Una vez que se añadan las reglas, asegúrate de que se hayan habilitado los botones de los grupos de escaneo para comenzar a escanear.

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/agent
{{% /tab %}}
{{< /tabs >}}

#### Espacios de nombres excluidos

Existen palabras clave reservadas que la plataforma de Datadog requiere para su funcionamiento. Si alguna de estas palabras se encuentra en un log que está siendo escaneado, los 30 caracteres posteriores a la palabra coincidente se ignoran y no se redactan. Por ejemplo, lo que aparece después de la palabra `date` en un log suele ser la marca temporal del evento. Si la marca temporal se redacta accidentalmente, se producirían problemas con el procesamiento del log y se lo podría consultar más tarde. Por lo tanto, el comportamiento de los espacios de nombres excluidos es evitar la redacción involuntaria de información importante para la funcionalidad del producto.

Los espacios de nombres excluidos son:

- `host`
- `hostname`
- `syslog.hostname`
- `service`
- `status`
- `env`
- `dd.trace_id`
- `trace_id`
- `trace id`
- `dd.span_id`
- `span_id`
- `span id`
- `@timestamp`
- `timestamp`
- `_timestamp`
- `Timestamp`
- `date`
- `published_date`
- `syslog.timestamp`
- `error.fingerprint`
- `x-datadog-parent-id`

### Pasa el ratón por encima de la regla de escaneo que desees editar y haz clic en el icono **Edit** (Editar) (lápiz).

{{< tabs >}}
{{% tab "In the Cloud" %}}

1. Ve a la página de configuración de [Sensitive Data Scanner][1].
1. Pasa el ratón por encima de la regla de escaneo que desees editar y haz clic en el icono **Edit** (Editar) (lápiz).

   La sección **Define match conditions** (Definir condiciones de coincidencia) muestra la expresión regular que escribiste para tu regla personalizada o una explicación de la regla de escaneo de biblioteca que elegiste junto con ejemplos de información confidencial coincidente.
1. Para asegurarte de que una regla coincide con tus datos, puedes proporcionar una muestra en la sección **Add sample data** (Añadir datos de muestra). Si la regla encuentra coincidencias en los datos de muestra, aparecerá una etiqueta verde **Match** (Coincidencia) junto al campo de entrada.
1. En **Create keyword dictionary** (Crear diccionario de palabras clave), puedes añadir palabras clave para mejorar la precisión de la detección. Por ejemplo, si buscas un número de tarjeta de crédito Visa de dieciséis dígitos, puedes añadir palabras clave como `visa`, `credit` y `card`.
1. Elige el número de caracteres antes de una coincidencia en los que debe aparecer la palabra clave. Por defecto, las palabras clave deben estar dentro de los 30 caracteres anteriores a una coincidencia.
1. Opcionalmente, en **Define rule target and action** (Definir objetivo y acción de la regla), edita las etiquetas que deseas asociar con eventos donde los valores coincidan con la regla. Datadog recomienda utilizar etiquetas `sensitive_data` y `sensitive_data_category`, que pueden utilizarse en búsquedas, dashboards y monitores. Consulta [Control de acceso a logs con datos confidenciales](#control-access-to-logs-with-sensitive-data) para obtener información sobre cómo utilizar etiquetas para determinar quién puede acceder a logs que contengan datos confidenciales.
1. En **Set priority level** (Establecer nivel de prioridad), elige un valor basado en las necesidades de tu empresa.
1. Haz clic en **Update** (Actualizar).

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
{{% /tab %}}
{{% tab "Uso del Agent" %}}

1. Ve a la página de configuración de [Sensitive Data Scanner que utiliza el Agent][1].
1. Pasa el ratón por encima de la regla de escaneo que desees editar y haz clic en el icono **Edit** (Editar) (lápiz).

   La sección **Define match conditions** (Definir condiciones de coincidencia) muestra una explicación de la regla de escaneo de biblioteca que elegiste junto con ejemplos de información confidencial coincidente.
1. En **Create keyword dictionary** (Crear diccionario de palabras clave), puedes añadir palabras clave para mejorar la precisión de la detección. Por ejemplo, si buscas un número de tarjeta de crédito Visa de dieciséis dígitos, puedes añadir palabras clave como `visa`, `credit` y `card`.
1. Elige el número de caracteres antes de una coincidencia en los que debe aparecer la palabra clave. Por defecto, las palabras clave deben estar dentro de los 30 caracteres anteriores a una coincidencia.
1. Haz clic en **Save** (Guardar).

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/agent
{{% /tab %}}
{{< /tabs >}}


### Controlar el acceso a logs con datos confidenciales

Para controlar quién puede acceder a los logs que contienen datos confidenciales, utiliza etiquetas añadidas por el Sensitive Data Scanner para crear consultas con control de acceso basado en roles (RBAC). Puedes restringir el acceso a personas o equipos específicos hasta que los datos caduquen tras el periodo de retención. Consulta [Cómo configurar RBAC para logs][5] para obtener más información.

### Redactar datos confidenciales en etiquetas

{{< tabs >}}
{{% tab "En la nube" %}}
Para redactar datos confidenciales contenidos en etiquetas, debes [reasignar][1] la etiqueta a un atributo y, a continuación, redactar el atributo. Desmarca `Preserve source attribute` en el procesador de reasignación para que la etiqueta no se conserve durante la reasignación.

Para reasignar la etiqueta a un atributo:

1. Navega hasta tu [pipeline de log][2].
2. Haz clic en **Add Processor** (Agregar procesador).
3. Selecciona **Remapper** (Reasignador) en el menú desplegable de tipo de procesador.
4. Nombra el procesador.
5. Selecciona **Tag key(s)** (Claves de etiqueta).
6. Introduce la clave de etiqueta.
7. Introduce un nombre para el atributo al que se reasigna la clave de etiqueta.
8. Deshabilita **Preserve source attribute** (Preservar atributo de fuente).
9. Haz clic en **Create** (Crear).

Para redactar el atributo:

1. Navega hasta tu [grupo de escaneo][3].
2. Haz clic en **Add Scanning Rule** (Añadir regla de escaneo).
3. Comprueba las reglas de biblioteca que deseas utilizar.
4. Selecciona **Specific Attributes** (Atributos específicos) en **Scan entire event or portion of it** (Escanear el evento completo o una parte).
5. Introduce el nombre del atributo que creaste anteriormente para especificar que deseas que se escanee.
6. Selecciona la acción que desees cuando haya una coincidencia.
7. Si lo deseas, añade etiquetas.
8. Haz clic en **Add Rules** (Añadir reglas).

[1]: /es/logs/log_configuration/processors/?tab=ui#remapper
[2]: https://app.datadoghq.com/logs/pipelines
[3]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
{{% /tab %}}
{{% tab "Uso del Agent" %}}
Esta funcionalidad no se encuentra disponible para Sensitive Data Scanner cuando se usa el Agent.
{{% /tab %}}
{{< /tabs >}}

## Escaneo del almacenamiento en la nube

{{< callout header="Disponibilidad limitada" url="https://www.datadoghq.com/private-beta/data-security" >}}
La compatibilidad del análisis de buckets de Amazon S3 e instancias RDS está en Disponibilidad limitada. Para inscribirte, haz clic en <strong>Request Access</strong> (Solicitar acceso).
{{< /callout >}}

Si tienes activado [Sensitive Data Scanner][6], puedes catalogar y clasificar los datos confidenciales en tus buckets de Amazon S3 e instancias RDS.

Sensitive Data Scanner analiza datos confidenciales desplegando [analizadores sin Agent][8] en tus entornos de nube. Estas instancias de análisis recuperan una lista de todos los buckets de S3 e instancias RDS mediante [configuración remota][9] y tienen instrucciones definidas para analizar archivos de texto, como CSV y JSON, y tablas en cada almacén de datos a lo largo del tiempo. Sensitive Data Scanner aprovecha la totalidad de tus [bibliotecas de reglas][11] para encontrar coincidencias. Cuando se encuentra una coincidencia, la instancia de análisis envía la localización de la coincidencia a Datadog. Los almacenes de datos y sus archivos sólo se leen en tus entornos. No se reenvía ningún dato confidencial a Datadog.

Además de mostrar las coincidencias de datos confidenciales, Cloud Storage muestra cualquier problema de seguridad detectado por [Cloud Security Management][7] que afecte a los almacenes de datos confidenciales. Puedes hacer clic en cualquier problema para continuar con la clasificación y la corrección en Cloud Security Management.

## Dashboard predefinido

Cuando se activa Sensitive Data Scanner, se instala automáticamente en tu cuenta un [dashboard predefinido][10] que resume los hallazgos de datos confidenciales. Para acceder a este dashboard, ve a **Dashboards > Lista de dashboards** y busca "Resumen de Sensitive Data Scanner".

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:80%;">}}

## Desactivar Sensitive Data Scanner

Para desactivar por completo el Sensitive Data Scanner, pon el conmutador en **off** (desactivado) para cada grupo de escaneo, de modo que queden desactivados.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/data_security/pci_compliance/
[2]: /es/observability_pipelines/set_up_pipelines/
[3]: /es/observability_pipelines/processors/#sensitive-data-scanner
[4]: /es/observability_pipelines/
[5]: /es/logs/guide/logs-rbac/
[6]: /es/sensitive_data_scanner/
[7]: /es/security/cloud_security_management
[8]: /es/security/cloud_security_management/setup/agentless_scanning
[9]: /es/agent/remote_config
[10]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner
[11]: /es/sensitive_data_scanner/library_rules/