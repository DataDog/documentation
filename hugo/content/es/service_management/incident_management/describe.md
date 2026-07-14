---
further_reading:
- link: /service_management/incident_management/incident_settings
  tag: Documentación
  text: Personalizar los incidentes en la configuración de incidentes
- link: /service_management/incident_management/notification
  tag: Documentación
  text: Configurar notificaciones de incidentes
title: Describir un incidente
---

## Información general

Independientemente de dónde [declares un incidente][1], es importante describirlo lo más detalladamente posible para compartir la información con otras personas involucradas en el proceso de gestión de incidentes de tu organización. Los detalles del incidente deben dar información sobre:
- ¿Qué ha pasado?
- ¿Por qué ocurrió?
- Atributos asociados al incidente

## Elementos de un incidente

Cuando se declara un incidente, aparece un modal de incidentes. Este modal tiene varios elementos básicos:

| Elementos de un incidente  | Descripción |
| ------------------ | ----------- |
| Título              | (Obligatorio) Da a tu incidente un título descriptivo. |
| Nivel de gravedad     | (Obligatorio) Indica la gravedad del incidente, desde SEV-1 (la gravedad más alta) hasta SEV-5 (la gravedad más baja). Si tu incidente se encuentra en fase de investigación inicial y aún no conoces la gravedad, selecciona UNKNOWN (DESCONOCIDO). <br> **Nota**: Puedes personalizar la descripción de cada nivel de gravedad para que se ajuste a los requisitos de tu organización.|
| Líder del incidente | (Obligatorio) A esta persona se le asigna la dirección de la investigación del incidente. |
| Atributos (Equipos) | Asigna el grupo de usuarios adecuado a un incidente utilizando [Equipos Datadog][2]. Los miembros del equipo asignado son invitados automáticamente a los canales de Slack. |

## Detalles del incidente

El estado y los detalles de un incidente se pueden actualizar en la pestaña Información general del incidente. Dentro de un incidente, rellena la pestaña Información general con los detalles pertinentes —incluida la descripción del incidente, el impacto en el cliente, los servicios afectados, los respondedores en caso de incidentes, la causa raíz, el método de detección y la gravedad— para proporcionar a tus equipos toda la información que necesitan para investigar y resolver un incidente. 

Actualiza la sección de impacto para especificar el impacto en el cliente, la hora de inicio y fin del impacto y si el incidente sigue activo. Esta sección también requiere que se complete una descripción del contexto del impacto.

### Niveles de estado

Los estados por defecto son **Activo**, **Estable** y **Resuelto**. Puedes añadir el estado **Terminado** y personalizar la descripción de cada nivel de estado en la página Configuración de incidentes.

* Activo: incidente que afecta a otros.
* Estable: el incidente ya no afecta a otros, pero las investigaciones están incompletas.
* Resuelto: el incidente ya no afecta a otros y las investigaciones finalizaron.
* Completado: toda la remediación ha sido completada.

A medida que cambia el estado de un incidente, Datadog realiza el seguimiento del tiempo de resolución de la siguiente manera:

| Estado de transición | Marca de tiempo de resolución |
| ------------------ | -----------|
| `Active` a `Resolved`, `Active` a `Completed` | Hora actual |
| `Active` a `Resolved` a `Completed`, `Active` a `Completed` a `Resolved` | Sin cambios |
| `Active` a `Completed` a `Active` a `Resolved` | Anulado en la última transición |

### Equipo de respuesta

Forma tu equipo de respuesta añadiendo otros usuarios y asignándoles funciones para desempeñar en el proceso de resolución de un incidente. Hay dos tipos de respondedores predeterminados proporcionados por Datadog.

<div class="alert alert-info">Los roles de respondedor no están relacionados con el sistema de <a href="/account_management/rbac/?tab=datadogapplication">Control de acceso basado en roles (RBAC)</a>. El tipo de respondedor en Gestión de incidentes no cambia los permisos de un usuario en ninguna capacidad. </a></div>

Líder del incidente
: Persona responsable de dirigir el equipo de respuesta

Respondedor
: Persona que contribuye activamente a la investigación de un incidente y a la resolución del problema subyacente.

Los *Respondedores* son notificados a través del correo electrónico asociado a su cuenta Datadog. Cualquier persona puede cambiar el rol de un respondedor, pero para eliminar a un individuo del Equipo de respuesta de un incidente debe tener asignado el rol general `Responder` y no tener ninguna actividad en el incidente. Si ya hay un `Incident Commander` asignado a un incidente, la asignación de otro individuo como `Incident Commander` le transfiere ese rol. Al anterior `Incident Commander` se le reasigna el rol general `Responder`. Una reasignación similar ocurre cada vez que se reasigna uno de los roles personalizados de una persona.

La pestaña **Equipo de respuesta** guarda la fecha y hora en que un individuo fue agregado originalmente al equipo de respuesta de un incidente, así como la fecha y hora en que contribuyó por última vez con la línea de tiempo del incidente.

#### Rol de respuesta personalizado

Puedes crear roles de respondedor personalizados en la [Configuración de incidentes para tipos de respondedor][3]. Esto te permite crear nuevos tipos de respondedores con nombres y descripciones personalizados. También te permite elegir si un tipo de respondedor debe ser un rol unipersonal o multipersonal.

## Atributos

Los atributos son los metadatos y el contexto que puedes definir para cada incidente. Estos campos son [etiquetas (tags) de métricas clave:valor][4]. Añade estas claves de campo en la página [Campos de propiedad de la configuración del incidente][5]. Los valores que añadas estarán disponibles cuando evalúes el impacto de un incidente en la pestaña Información general. Los siguientes campos están disponibles para su evaluación en todos los incidentes:

Causa raíz
: Este campo de texto te permite introducir la descripción de la causa raíz, los activadores y los factores contribuyentes del incidente.

Método de detección
: Especifica cómo se detectó el incidente con estas opciones predeterminadas: cliente, empleado, monitor, otro o desconocido.

Servicios
: Si tienes configurado APM, tus servicios APM están disponibles para la evaluación de incidentes. Para saber más sobre cómo configurar tus servicios en APM, consulta [los documentos][5].<br><ul><li>Si no estás utilizando Datadog APM , puedes cargar los nombres de servicios como CSV. Cualquier valor cargado a través de CSV sólo está disponible dentro de la Gestión de incidentes para fines de evaluación de incidentes.</li><li>Datadog deduplica los nombres de servicios sin considerar mayúsculas y minúsculas, de modo que si utilizas "Mi servicio" o "mi servicio", sólo se muestra aquel añadido manualmente.</li><li>Datadog sustituye los nombres de servicios APM en favor de la lista cargada manualmente.</li><li>Si el servicio es APM y no se publicó ninguna métrica en los últimos siete días, no aparece en los resultados de búsqueda.</li><li>Intégrate aún más con los productos Datadog y evalúa con precisión el impacto del servicio. El campo de propiedades de servicios se rellena automáticamente con servicios APM para los clientes que utilizan Datadog APM .</li></ul>

Equipos
: Elige entre los [equipos][2] definidos en tu organización. No es necesario cargar una lista de equipos desde un archivo CSV.

## Notificaciones

Configura notificaciones de incidente para compartir las actualizaciones del incidente con todas las partes interesadas y mantener a todos los miembros involucrados al corriente de la investigación en curso. Para obtener más información, consulta la página [Notificaciones][6].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/incident_management/declare
[2]: /es/account_management/teams/
[3]: /es/service_management/incident_management/incident_settings/responder-types
[4]: /es/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments#overview
[5]: https://app.datadoghq.com/incidents/settings#Property-Fields
[6]: /es/service_management/incident_management/notification