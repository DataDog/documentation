---
description: Integraciones del sistema de tickets de seguridad
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Protección de la carga de trabajo
  url: /security/workload_protection/
- icon: app-sec
  name: Protección de las aplicaciones y las API
  url: /security/application_security/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
title: Integraciones de tickets
---

{{< product-availability >}}

Puedes utilizar [Datadog Case Management][1] para gestionar tickets en herramientas de terceros como [Jira][2]. Para obtener más información, consulta [Integración de Case Management con herramientas de tickets de terceros][3].

Esta page (página) trata sobre el uso de Datadog Security con Datadog Case Management para la gestión de tickets.


## Productos de gestión de case (incidencias) y seguridad

Case Management es compatible con todos los productos de seguridad que utilizan señales:

- Cloud SIEM (en [Señales][4])
- Code Security (en [Vulnerabilidades][5])
- Protección de aplicaciones y API (en [Señales][6])
- Protección de la carga de trabajo (en [Señales][7])

Abre cualquier señal en estos productos y utiliza el botón **Crear case (incidencia)** para crear una case (incidencia) en Datadog.

## Sincronización bidireccional de tickets con Jira

La sincronización bidireccional te permite actualizar automáticamente los tickets de Jira cuando se produzcan cambios en Datadog y actualizar cierta información de Datadog cuando se producen cambios en Jira.

### Productos compatibles

La sincronización bidireccional es compatible con las siguientes categorías de vulnerabilidades de Code Security:

- Bibliotecas (SCA)
- Código estático (SAST)
- Escaneado secreto (SDS)
- Infraestructura como código (IaC)

### Un único source (fuente) de la verdad

La sincronización bidireccional con Jira te permite sincronizar los tickets de Jira con las cases (incidencias) de Datadog, pero Datadog es el único source (fuente) de la verdad para la resolución de problemas.

El ticket de Jira relacionado con un hallazgo de Datadog puede cerrarse manualmente, pero un hallazgo de Datadog permanece abierto si Datadog no puede confirmar que el problema está solucionado. Esta restricción garantiza que un hallazgo no se cierre y se elimine de la lista de señales cuando alguien cierra un ticket de Jira relacionado.

Cerrar un Datadog case (incidencia) sin corregirlo tampoco cierra el hallazgo.

La corrección del hallazgo en Datadog o la definición de una excepción silenciando el hallazgo son las únicas formas de cerrar un hallazgo. Una vez subsanado el hallazgo, se cierran sus cases (incidencias) y los tickets de Jira relacionados.

### Configurar la sincronización bidireccional

Los siguientes pasos configuran la sincronización bidireccional con Jira y utilizan las vulnerabilidades de Code Security para verificar que la configuración se haya realizado correctamente.

1. Configura los siguientes requisitos previos en tu cuenta de Datadog o comprueba que ya estén configurados. Los requisitos previos se enumeran en su orden de configuración.
   1. La [integración de Datadog y Jira][2].
   2. Un [webhook para la integración con Jira][8]. La configuración de un webhook permite que los cases creados en Case Management creen automáticamente problemas en Jira y mantengan sincronizados ambos recursos.
   3. Un [nuevo project (proyecto) de Case Management][9]. Un project (proyecto) es un objeto contenedor que contiene un conjunto de cases (incidencias).
   4. La [integración con Jira se configura en el project (proyecto)][3].
      1. Activa la opción **Sincronizar datos entre Case Management y Jira**.
      2. En **Título**, selecciona **Sincronización bidireccional**.
      3. Completa los parámetros restantes y, a continuación, haz clic en **Guardar cambios**.
2. Comprueba que la integración bidireccional de Case Management con Jira funcione:
   1. Abre Code Security [Vulnerabilidades][5].
   2. Abre cualquier vulnerabilidad.
   3. Localiza la opción **Crear ticket**. La opción está disponible en **Siguientes pasos** o **Repositorios** (en **Bibliotecas (SCA)**).
   4. Haz clic en la pestaña **Jira**.
   5. Comprueba que exista la sección **Sincronización con Datadog (a través de Case Management)**.

Ya estás listo para empezar a crear tickets de Case Management bidireccional.

Si no ves la sección **Sincronización con Datadog (a través de Case Management)**, asegúrate de que hayas configurado los requisitos previos.

### Crea tickets de Case Management bidireccional

Los siguientes pasos crean un ticket de Case Management bidireccional.

1. Abre Code Security [Vulnerabilidades][5].
2. Abre cualquier vulnerabilidad.
3. Localiza la opción **Crear ticket**. La opción está disponible en **Siguientes pasos** o **Repositorios** (en **Bibliotecas (SCA)**).
4. Haz clic en la pestaña **Jira**. Puedes utilizar un ticket nuevo o existente. Veamos cómo crear un nuevo ticket de Jira.
5. En **Sincronización con Datadog (a través de Case Management)**, completa los siguientes parámetros:
   1. **Project (proyecto) de Case Management:** selecciona un project (proyecto) de Case Management que tenga la [integración con Jira habilitada][3].
   2. **Cuenta Jira:** selecciona la cuenta Jira donde desees que se cree el ticket.
   3. **Project (proyecto):** selecciona el project (proyecto) de Jiira a utilizar.
   4. **Tipo de incidencia:** selecciona el tipo de incidencia de Jira que desees crear.
6. Para añadir más campos al ticket de Jira que crea Datadog, utiliza **Añadir campo opcional** para añadir los campos.
7. Haz clic en **Crear ticket**.

Notas:

- Una vez seleccionado un **Project (proyecto) de Case Management**, puedes hacer clic en **Editar integración** para verificar que la integración esté configurada con **Sincronización bidireccional**.
- La sincronización bidireccional con Jira está disponible para determinados atributos de los tickets de Jira, como el estado, la persona asignada y los comentarios, pero no todos los campos de Jira están disponibles.

### Gestión bidireccional de tickets de Case Management

Los tickets bidireccionales de Jira existentes aparecen en las secciones **Tickets** o **Siguientes pasos** de una señal o vulnerabilidad.

He aquí un ejemplo de una vulnerabilidad de código estático (SAST):

{{< img src="security/bidir-jira-existing.png" alt="señal con ticket de Jira existente: en la sección Siguientes Pasos, en Ticket creado, una cápsula con el logotipo de Jira y el texto 'CJT-16'" responsive="true" style="width:100%;">}}

Pasa el ratón sobre el ticket de Jira para ver sus detalles.

{{< img src="security/bidir-jira-existing-hover.png" alt="Pasa el ratón sobre el estado para la cápsula en la imagen previa. Modal con detalles de tickets de Jira." responsive="true" style="width:100%;">}}

Se proporcionan detalles como la persona asignada y el estado, junto con una cronología de la incidencia de Jira y los cambios de case (incidencia) de Datadog.

Los tickets de Jira cerrados son verdes.

En **Datadog Associated Case**, se proporciona la case (incidencia) de Datadog relacionado. Haz clic en el nombre de case (incidencia) para abrirlo en [Case Management][1].

Al eliminar una case (incidencia) no se eliminan los tickets de Jira relacionados, pero al eliminar un project (proyecto) de case (incidencia) se eliminan todos los tickets de las señales relacionadas.

### Facetas bidireccionales de Case Management

Hay varias facetas de gestión de case (incidencia) en **Triage**, entre ellas:

- Clave de case (incidencia)
- Clave de Jira
- Estado de case (incidencia)
- Tiene ticket adjunto

Puedes consultar atributos y crear dashboards utilizando estas facetas.


[1]: /es/service_management/case_management/
[2]: /es/integrations/jira/
[3]: /es/service_management/case_management/notifications_integrations/#third-party-tickets
[4]: https://app.datadoghq.com/security/siem/signals?column=time&order=desc&viz=stream
[5]: https://app.datadoghq.com/security/appsec/vm/library
[6]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22&viz=stream
[7]: https://app.datadoghq.com/security/workload-protection/signals?query=%40workflow.rule.type%3A%22Workload%20Security%22
[8]: /es/integrations/jira/#configure-a-jira-webhook
[9]: /es/service_management/case_management/projects/
[10]: /es/security/ticketing_integrations/#prerequisites
