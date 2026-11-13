---
description: Explore e investigue cada identidad de usuario sincronizada con Cloud
  SIEM, incluyendo la configuración de la cuenta, los riesgos asociados y el historial
  de actividad.
further_reading:
- link: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
  tag: Documentación
  text: Riesgos de entidad
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/
  tag: Documentación
  text: Paquetes de entidades
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/
  tag: Documentación
  text: Paquete de entidades de Microsoft Entra ID
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/okta/
  tag: Documentación
  text: Paquete de entidades de identidad de Okta
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/
  tag: Documentación
  text: Paquete de entidades de identidad de Google Workspace
- link: /security/cloud_siem/investigator/
  tag: Documentación
  text: Investigator
- link: /security/cloud_siem/investigate_security_signals/
  tag: Documentación
  text: Investigue las señales de seguridad
- link: /security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
  tag: Documentación
  text: Open Cybersecurity Schema Framework (OCSF)
title: Inventario de usuarios
---
## Descripción general {#overview}

[El Inventario de usuarios de Cloud SIEM][6] es una copia sincronizada y normalizada de su directorio de usuarios dentro de Cloud SIEM. Lista cada identidad de usuario que Cloud SIEM ha sincronizado desde sus proveedores de identidad, independientemente de si ese usuario tiene alguna actividad, señal o riesgo asociado. Cuando necesite saber quién es un usuario, cómo es su cuenta y cómo ha cambiado, puede responder a la pregunta en Cloud SIEM en lugar de tener que cambiar a su proveedor de identidad.

Con el Inventario de usuarios, puede:

- Explorar cada identidad de usuario y cuenta de servicio sincronizada en una sola lista.
- Filtrar usuarios por estado de cuenta, cargo, ubicación de oficina, ID principal, proveedor y tipo de usuario.
- Buscar en el inventario por nombre o ID principal.
- Revisar la configuración actual de un usuario, incluyendo cargo, departamento, ubicación de oficina y estado de la autenticación multifactor (MFA).
- Ver la puntuación de riesgo de cada cuenta asociada a una identidad de usuario, junto con cómo ha cambiado esa puntuación.
- Rastrear las señales, inicios de sesión, cambios de MFA, cambios de contraseña, cambios de configuración y registros de un usuario a lo largo del tiempo.

El Inventario de usuarios y los [Riesgos de entidad][1] responden a preguntas diferentes. El Inventario de usuarios es el directorio completo: cada usuario sincronizado, independientemente de su actividad. Riesgos de entidad es la vista priorizada: identidades de usuario y otras entidades que han sido evaluadas y clasificadas por riesgo. Comience en el Inventario de usuarios cuando sepa qué usuario desea comprender. Comience en Riesgos de entidad cuando desee que Datadog le indique qué usuarios debe revisar primero.

## Requisitos previos {#prerequisites}

### Permisos{#permissions}

Los siguientes permisos de Cloud SIEM se aplican al Inventario de usuarios:

| Permiso | Lo que otorga |
| ---------- | -------------- |
| **Notificación de entidades de SIEM** | Los usuarios con este permiso pueden modificar las notificaciones de Riesgos de entidad. |
| **Lectura de entidades de SIEM** | Visualizar el explorador de inventario de usuarios y buscar en él, abrir el panel lateral de usuario y ver el indicador de usuario correlacionado en el panel lateral de Señales. También otorga acceso de lectura a los paneles laterales de Paquetes de entidades en el explorador de Paquetes de contenido. |
| **Administración de entidades de SIEM** | Todo lo que otorga Lectura de entidades de SIEM, además de la capacidad de configurar Paquetes de entidades y otros ajustes de Riesgos de entidad. Requerido para completar el prerrequisito de Paquetes de entidades a continuación. |

<div class="alert alert-info">Un Inventario de usuarios vacío sin filtros aplicados tiene dos causas posibles: no hay Paquetes de entidades habilitados o usted no tiene el permiso <strong>Lectura de entidades de SIEM</strong>. Confirme primero su configuración de Paquetes de entidades y, luego, confirme sus permisos.</div>

### Paquetes de entidades {#entity-packs}

El Inventario de usuarios se completa mediante Paquetes de entidades, los cuales sincronizan el contexto de usuario e identidad desde su proveedor de identidad. Se debe habilitar al menos un Paquete de entidades antes de que el Inventario de usuarios devuelva resultados.

Los Paquetes de entidades están disponibles para los siguientes proveedores:

- [Microsoft Entra ID][2]
- [Okta][3]
- [Google Workspace][4]

La configuración de un paquete de entidades requiere el permiso `SIEM Entities Admin`. Los paquetes de entidades se configuran desde el explorador de paquetes de contenido. Para obtener instrucciones de configuración, consulte [Paquetes de entidades][5].

### Recomendado: canalizaciones OCSF {#recommended-ocsf-pipelines}

Una canalización activa de Open Cybersecurity Schema Framework (OCSF) es opcional. Cloud SIEM puede correlacionar cierta actividad con una identidad de usuario utilizando solo atributos estándar. Sin embargo, obtiene la correlación más completa de fuentes que tienen una canalización OCSF activa. Si la actividad de un usuario parece más dispersa en Cloud SIEM de lo que espera, verifique si las fuentes relevantes tienen una canalización OCSF configurada.

## Explore el Inventario de usuarios {#explore-the-user-inventory}

Para abrir el Inventario de usuarios, vaya a **Cloud SIEM** > **Investigate** > [**Inventario de usuarios**][6].

{{< img src="security/cloud_siem/user_inventory_explorer.png" alt="El explorador de Inventario de usuarios enumera las identidades de usuario sincronizadas con su ID principal, tipo de usuario, estado de la cuenta y proveedor." style="width:100%;" >}}

### Buscar y filtrar usuarios {#search-and-filter-users}

Para encontrar un usuario por nombre visible o ID principal, escriba su consulta en el cuadro de búsqueda y presione <kbd>Enter</kbd> .

Para limitar la lista por atributo, utilice los menús desplegables de filtro. Cada filtro tiene como valor predeterminado **Todos**.

| Filtro | Lo que coincide |
| ------ | --------------- |
| Estado de la cuenta | El estado de la cuenta en su proveedor de identidad, como `ACTIVE`, `SUSPENDED` o `DELETED`. |
| Título del trabajo | El título del trabajo del usuario, según lo informado por su proveedor de identidad. |
| Ubicación de la oficina | La ubicación de la oficina del usuario, según lo informado por su proveedor de identidad. |
| ID principal | El ID principal del usuario, según lo informado por su proveedor de identidad. |
| Proveedor | El proveedor de identidad desde el cual se sincronizó el usuario. |
| Tipo de usuario | El tipo de cuenta: `human`, `service_account` o `guest`. |

El título del trabajo, la ubicación de la oficina y el ID principal se transmiten desde su proveedor de identidad. Si un valor parece incorrecto o falta en Cloud SIEM, verifique el campo correspondiente en su proveedor de identidad.

### Explorar usuarios en SIEM {#browse-users-in-siem}

- La lista carga más usuarios a medida que se desplaza. El recuento de entidades en la parte superior de la lista muestra cuántos usuarios están cargados y cuántos coinciden con su búsqueda y filtros actuales.
- La columna **Changes Detected** cuenta las actualizaciones de la identidad de un usuario durante los últimos 14 días que incluyeron uno o más cambios de atributos. Cuenta las actualizaciones, no los atributos individuales, por lo que una sola actualización que cambió tres atributos cuenta una vez. Úsela para identificar a los usuarios cuya configuración se ha modificado recientemente, luego abra el usuario y vaya a la pestaña **Cambios de entidad** para ver qué cambió.
- Para exportar la lista como un archivo CSV, haga clic en el icono de exportación sobre la tabla. El archivo CSV contiene solo los usuarios cargados actualmente en la vista, no todos los usuarios sincronizados con Cloud SIEM. Para incluir más usuarios en la exportación, desplácese para cargarlos primero.
- Para cambiar qué columnas aparecen, haga clic en el icono de configuración de columnas.

## Investigar una identidad de usuario {#investigate-a-user-identity}

Haga clic en cualquier fila de la lista de usuarios para abrir el panel lateral del usuario. Para abrir la misma información como una página completa, haga clic en **Open Fullscreen**.

El encabezado del panel muestra el estado de la cuenta del usuario, el nombre para mostrar y el rango de tiempo al que está limitado el panel, junto con los siguientes metadatos:

| Campo | Descripción |
| ----- | ----------- |
| ID principal | El ID principal del usuario. Haga clic en el icono de copiar para copiarlo. |
| Tipo | El tipo de cuenta: `human`, `service_account` o `guest`. |
| Creado | Cuándo se creó la cuenta, mostrado como un tiempo relativo. |
| Última actualización | Cuándo Cloud SIEM sincronizó por última vez un cambio en esta identidad de usuario, mostrado como un tiempo relativo. |

Los tiempos relativos se muestran en todo el panel. Para ver la marca de tiempo exacta detrás de un tiempo relativo, pase el cursor sobre él.

{{< img src="security/cloud_siem/user_inventory_side_panel.png" alt="El panel lateral del usuario para una sola identidad de usuario, que muestra el estado actual y los riesgos asociados" style="width:100%;" >}}

### Revisar estado actual {#review-current-state}

La sección **Current state** muestra la configuración del usuario a partir de la sincronización más reciente:

| Campo | Descripción |
| ----- | ----------- |
| Fuente(s) de identidad | Los proveedores de identidad desde los cuales se sincronizó esta identidad de usuario. |
| Correo electrónico | La dirección de correo electrónico del usuario. |
| Nombre | El nombre visible del usuario. |
| Puesto | El cargo, departamento y ubicación de la oficina del usuario. |
| Estado de MFA | Dos estados independientes: si el usuario tiene MFA registrado y si la política lo requiere. |

El estado de MFA se informa como dos valores separados porque pueden diferir. `ENABLED` significa que el usuario ha registrado MFA. `NOT ENFORCED` significa que la política de su proveedor de identidad no requiere que el usuario lo utilice en todas las circunstancias. Revise sus políticas para comprender si existe una brecha.

### Revisar riesgos {#review-risks}

La sección **Riesgos** enumera la puntuación de riesgo para cada cuenta asociada con esta identidad de usuario. Estas son puntuaciones por cuenta, no una puntuación agregada para el usuario.

| Columna | Descripción |
| ------ | ----------- |
| Puntuación de riesgo | La puntuación de riesgo de la cuenta y su gravedad correspondiente. |
| Nombre | La cuenta a la que se aplica la puntuación. |
| Tipo | El tipo de entidad evaluada, como `Email Address`. |
| Fuente | Las fuentes de registro de las cuales se correlacionó la actividad de la cuenta. Haga clic en el indicador de desbordamiento para ver fuentes adicionales. |
| Última vez visto | Cuándo generó una señal la cuenta por última vez, mostrado como un tiempo relativo. Esta no es la última vez que la cuenta tuvo alguna actividad. |
| Cambio de riesgo | Cómo ha cambiado la puntuación de riesgo de la cuenta en los últimos 14 días. |
| Señales | El número de señales que contribuyen a la puntuación de la cuenta. |

<div class="alert alert-info">Última vez visto refleja solo la actividad de señales. Una cuenta con un valor de Última vez visto antiguo aún podría estar generando registros. Consulte la pestaña <strong>Todos los registros</strong> en <strong>Historial de actividad</strong> para ver su actividad más reciente.</div>

El cambio de riesgo siempre refleja un periodo de revisión fijo de 14 días y no sigue el selector de rango de tiempo del panel.

Para saber cómo se calculan las puntuaciones de riesgo y cómo personalizarlas, consulte [Riesgos de entidad][1].

## Explorar historial de actividad {#explore-activity-history}

La sección **Historial de actividad** rastrea lo que ha hecho un usuario y cómo ha cambiado su cuenta. Dos controles definen el contexto de toda la sección:

- **Actividad de**: Seleccione una cuenta para establecer el contexto de la actividad en esa cuenta, o seleccione **Todas** para ver la actividad en todas las cuentas asociadas con esta identidad de usuario.
- **Rango de tiempo**: Establezca la ventana para las vistas de actividad.

Cada pestaña muestra un recuento de resultados y un enlace **Ver todo** que abre los datos subyacentes en su propio explorador, donde puede consultarlos más a fondo.

Los datos en el Historial de actividad se asignan a atributos estándar de Datadog o a campos de OCSF, por lo que puede consultarlos en los exploradores usando los mismos nombres de atributos que usa en otras partes de Cloud SIEM.

### Señales {#signals}

Muestra las señales de seguridad asociadas con esta identidad de usuario. La vista de gráfico desglosa las señales por gravedad a lo largo del tiempo; la vista de lista muestra las señales individuales. Use esta pestaña para ver si se han activado detecciones en el usuario y qué tan recientemente.

### Cambios de inicio de sesión y MFA {#login-and-mfa-changes}

Muestra la actividad de inicio de sesión y cambios de MFA a lo largo del tiempo como un gráfico de barras. Use esta pestaña para detectar cambios en el comportamiento de autenticación, como un cambio en el patrón de inicio de sesión de un usuario o cambios en la configuración de MFA.

### Cambios de contraseña {#password-changes}

Muestra una secuencia de marcas de tiempo que registran cuándo se modificó la contraseña del usuario. Use esta sección para ver si hay cambios de contraseña cerca del momento de una actividad de cuenta inusual o sospechosa.

### Cambios de entidad {#entity-changes}

Muestra cómo ha cambiado la configuración del usuario a lo largo del tiempo. Cloud SIEM guarda cada versión de una identidad de usuario, por lo que puede comparar dos versiones cualesquiera y ver exactamente qué atributos cambiaron.

El encabezado de la pestaña muestra la cantidad de cambios realizados durante el período de tiempo seleccionado. Hay dos vistas disponibles:

- **JSON**: Una comparación lado a lado de dos versiones. Los valores eliminados están marcados en rojo; los valores agregados están marcados en verde.
- **Línea de tiempo**: Una vista cronológica de los cambios.

{{< img src="security/cloud_siem/user_inventory_entity_changes.png" alt="Una comparación JSON lado a lado que compara dos versiones de una identidad de usuario, resaltando los cambios en la aplicación de MFA" style="width:100%;" >}}

En la vista JSON, seleccione las versiones a comparar usando el menú desplegable de versiones sobre cada panel. El número de cambios entre las dos versiones seleccionadas aparece al lado del segundo panel. Para reducir el ruido, los atributos sin cambios están contraídos; haga clic en el indicador de líneas ocultas para expandirlos.

Los atributos rastreados en la comparación incluyen el correo electrónico del usuario, nombre y apellido, cargo, ubicación de la oficina, ID principal, proveedor y tipo de usuario, junto con el estado de autenticación como `mfaEnrolled`, `mfaEnforced` y `lastPasswordChange`.

<div class="alert alert-info">Solo los cambios de entidad realizados en los últimos 14 días aparecen en esta pestaña, independientemente del rango de tiempo seleccionado.</div>

### Todos los registros {#all-logs}

Muestra cada registro que Cloud SIEM ha correlacionado con esta identidad de usuario. Hay tres vistas disponibles:

- **Gráfico**: Un gráfico de barras del volumen de registros a lo largo del tiempo, desglosado por fuente de registro. Un gráfico de anillo al lado muestra la proporción de actividad aportada por cada cuenta asociada con la identidad del usuario.
- **Mapa**: Un mapa mundial con los países sombreados donde se ha encontrado actividad.
- **Listar**: Los registros individuales.

Use esta pestaña para ver qué sistemas ha tocado un usuario y cuál de sus cuentas está generando la mayor actividad.

### Rango de tiempo {#time-range}

El historial de actividad utiliza una retrospectiva de 14 días de forma predeterminada. Puede extender el rango a 30 días o más.

Dos vistas no siguen el selector de rango de tiempo:

- **Cambios en la entidad** están limitados a los últimos 14 días.
- **Cambio de riesgo** en la sección de Riesgos siempre refleja un periodo de revisión fijo de 14 días.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[2]: /es/security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/
[3]: /es/security/cloud_siem/ingest_and_enrich/entity_packs/okta/
[4]: /es/security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/
[5]: /es/security/cloud_siem/ingest_and_enrich/entity_packs/
[6]: https://app.datadoghq.com/security/siem/user-inventory