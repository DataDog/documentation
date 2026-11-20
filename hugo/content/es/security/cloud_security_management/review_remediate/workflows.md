---
aliases:
- /es/security/cloud_security_management/workflows
further_reading:
- link: /security/cloud_security_management
  tag: Documentación
  text: Cloud Security Management
- link: /service_management/workflows/
  tag: Documentación
  text: Workflow Automation
products:
- icon: cloud-security-management
  name: CSM Threats
  url: /security/threats/
- icon: cloud-security-management
  name: CSM Misconfigurations
  url: /security/cloud_security_management/misconfigurations/
- icon: cloud-security-management
  name: CSM Identity Risks
  url: /security/cloud_security_management/identity_risks/
title: Automatizar los flujos de trabajo de seguridad con Workflow Automation
---

{{< product-availability >}}

[Datadog Workflow Automation][1] te permite orquestar y automatizar tus procesos de extremo a extremo mediante la creación de flujos de trabajo compuestos por acciones que se conectan a tu infraestructura y herramientas.

Utiliza Workflow con [Cloud Security Management (CSM)][2] para automatizar tus flujos de trabajo relacionados con la seguridad. Por ejemplo, puedes crear flujos de trabajo que te permitan [bloquear el acceso a un bucket público de Amazon S3 a través de un mensaje interactivo de Slack] (#block-access-to-aws-s3-bucket-via-slack), o [crear automáticamente un problema de Jira y asignarlo a un equipo] (#automatically-create-and-assign-a-jira-issue).

## Entender cómo funcionan los desencadenantes y las fuentes

Workflow Automation te permite activar un flujo de trabajo manual o automáticamente. En los flujos de trabajo de ejemplo de este artículo, los flujos de trabajo se activan manualmente haciendo clic en el botón **Actions** > **Run Workflow** (Acciones > Ejecutar flujo de trabajo) de los paneles laterales.

Cuando se activa un flujo de trabajo, el ID de origen del evento desencadenante debe pasarse al siguiente paso del flujo de trabajo. En los ejemplos de este artículo, los eventos desencadenantes son un nuevo hallazgo de seguridad. En ambos casos, los ID de origen se especifican en el paso inicial del flujo de trabajo con [variables de objeto de origen][7].

## Crear un flujo de trabajo

Puedes crear un flujo de trabajo utilizando un flujo preconfigurado a partir de un proyecto predefinido o creando un flujo de trabajo personalizado. Para obtener instrucciones detalladas sobre cómo crear un flujo de trabajo, consulta la [documentación sobre Workflow Automation][3].

### Bloquear el acceso al bucket de Amazon S3 a través de Slack

Este ejemplo crea un flujo de trabajo de corrección que envía un mensaje interactivo de Slack cuando se detecta un bucket público de Amazon S3. Al hacer clic en **Approve** o **Reject** (Aprobar o Rechazar), puedes bloquear automáticamente el acceso al bucket de S3 o rechazar la acción.

**Nota**: Para crear este flujo de trabajo, debes configurar la [integraciónde Slack][5].

1. En la página [Workflow Automation][4], haz clic en **New Workflow** (Nuevo flujo de trabajo).
1. Haga clic en **Add Trigger** > **Security** (Agregar desencadenante > Seguridad). Un flujo de trabajo debe tener el desencadenante de seguridad antes de poder ejecutarlo.
1. Introduce un nombre para el flujo de trabajo y haz clic en **Save** (Guardar).

#### Obtener una configuración de seguridad errónea

Para recuperar la configuración errónea de seguridad y pasarla al flujo de trabajo, utiliza la acción **Get security finding** (Obtener hallazgo de seguridad). La acción utiliza la variable de objeto fuente `{{ Source.securityFinding.id }}` para recuperar los detalles de la configuración errónea desde el endpoint de la API [**Obtener un hallazgo**][8].

1. Haz clic en **Add Step** (Añadir paso) para añadir el primer paso a tu flujo de trabajo.
1. Busca la acción **Get security finding** (Obtener hallazgos de seguridad) y selecciónala para añadirla como paso en el lienzo de tu flujo de trabajo.
1. Haz clic en el paso en el lienzo de flujo de trabajo para configurarlo.
1. En **Finding ID** (ID de hallazgo), ingresa `{{ Source.securityFinding.id }}`.
1. Haz clic en **Save** (Guardar) para guardar el flujo de trabajo.

#### Añadir función de JS

A continuación, añade la acción Función de transformación de datos de JavaScript al lienzo y configura para que devuelva el nombre de la región de las etiquetas de configuración errónea.

1. Haz clic en el icono más (`+`) en el lienzo del flujo de trabajo para añadir otro paso.
2. Busca la acción **JS Function** (Función de JS) y selecciónala para añadirla como paso en el lienzo de tu flujo de trabajo.
3. Haz clic en el paso en el lienzo de flujo de trabajo y pega lo siguiente en el editor de script:
   {{< code-block lang="javascript" >}}
    // Obtén la información de la región de la etiqueta de configuración errónea
    // Utiliza `$` para acceder a los datos de desencadenantes o pasos.
    // Utiliza `_` para acceder a Lodash.
    // Consulta https://lodash.com/ como referencia.

    let tags = $.Steps.Get_security_finding.tags

    let region = tags.filter(t => t.includes('region:'))
    if(region.length == 1){
        return region[0].split(':')[1]
    } else {
        return '';
    }
    {{< /code-block >}}

#### Añadir acción de Slack

1. Haz clic en el icono más (`+`) en el lienzo del flujo de trabajo para añadir otro paso.
2. Busca la acción **Make a decision** (Tomar una decisión) y selecciónala para añadirla como paso en el lienzo de tu flujo de trabajo.
3. Haz clic en el paso en el lienzo de flujo de trabajo e introduce la siguiente información:
    - **Espacio de trabajo**: el nombre de tu espacio de trabajo de Slack.
    - **Canal**: el canal al que enviar el mensaje de Slack.
    - **Texto de aviso**: el texto que aparece inmediatamente encima de los botones de elección en el mensaje de Slack, por ejemplo, "Would you like to block public access for `{{ Steps.Get_security_finding.resource }}` in region `{{ Steps.GetRegion.data }}`?"

##### Aprobar flujo de trabajo

1. En **Approve** (Aprobar) en el lienzo del flujo de trabajo, haz clic en el icono más (`+`) para añadir otro paso.
2. Busca la acción **Block Public Access** (Bloquear acceso público) para Amazon S3 y selecciónala para añadirla como paso en el lienzo de tu flujo de trabajo.
3. Haz clic en el paso en el lienzo de flujo de trabajo e introduce la siguiente información:
    - **Conexión**: el nombre de la conexión de flujo de trabajo para la integración de AWS.
    - **Región**: `{{ Steps.GetRegion.data }}`
    - **Nombre del bucket**: `{{ Steps.Get_security_finding.resource }}`
4. En el paso **Block public access** (Bloquear acceso público) en el lienzo del flujo de trabajo, haz clic en el icono más (`+`) para añadir otro paso.
5. Busca la acción **Send message** (Enviar un mensaje) y selecciónala para añadirla como paso en el lienzo de tu flujo de trabajo.
3. Haz clic en el paso en el lienzo de flujo de trabajo e introduce la siguiente información:
    - **Espacio de trabajo**: el nombre de tu espacio de trabajo de Slack.
    - **Canal**: el canal al que enviar el mensaje de Slack.
    - **Texto del mensaje**: el texto que aparece en el mensaje de Slack. Por ejemplo:
    {{< code-block lang="text" >}}
    S3 bucket `{{ Steps.Get_security_finding.resource }}` successfully blocked. AWS API response: 
    ```{{ Steps.Block_public_access }}```

    El problema se marcará como solucionado la próxima vez que se escanee el recurso, lo que puede tardar hasta una hora.
    {{< /code-block >}}

##### Rechazar flujo de trabajo

1. En **Reject** (Rechazar) en el lienzo del flujo de trabajo, haz clic en el icono más (`+`) para añadir otro paso.
2. Busca la acción **Send message** (Enviar un mensaje) y selecciónala para añadirla como paso en el lienzo de tu flujo de trabajo.
3. Haz clic en el paso en el lienzo de flujo de trabajo e introduce la siguiente información:
    - **Espacio de trabajo**: el nombre de tu espacio de trabajo de Slack.
    - **Canal**: el canal al que enviar el mensaje de Slack.
    - **Texto del mensaje**: el texto que aparece en el mensaje de Slack, por ejemplo, "User declined the action".
4. Haz clic en **Save** (Guardar).

### Crear y asignar automáticamente un problema de Jira

Este ejemplo crea un flujo de trabajo automatizado de enrutamiento de tiques que crea y asigna un problema de Jira al equipo adecuado cuando se detecta un hallazgo de seguridad.

**Nota**: Para crear este flujo de trabajo, debes configurar la [integración de Jira][6].

1. En la página [Workflow Automation][4], haz clic en **New Workflow** (Nuevo flujo de trabajo).
1. Haga clic en **Add Trigger** > **Security** (Agregar desencadenante > Seguridad). Un flujo de trabajo debe tener el desencadenante de seguridad antes de poder ejecutarlo.
1. Introduce un nombre para el flujo de trabajo y haz clic en **Save** (Guardar).

#### Obtener el hallazgo de seguridad

Para recuperar el hallazgo y pasarlo al flujo de trabajo, utiliza la acción **Get security finding** (Obtener hallazgo de seguridad). La acción utiliza la variable de objeto fuente `{{ Source.securityFinding.id }}` para recuperar los detalles del hallazgo desde el endpoint de la API [**Obtener un hallazgo**][8].

1. Haz clic en **Add Step** (Añadir paso) para añadir el primer paso a tu flujo de trabajo.
1. Busca la acción **Get security finding** (Obtener hallazgos de seguridad) y selecciónala para añadirla como paso en el lienzo de tu flujo de trabajo.
1. Haz clic en el paso en el lienzo de flujo de trabajo para configurarlo.
1. En **Security ID** (ID de seguridad), ingresa `{{ Source.securityFinding.id }}`.

#### Añadir acción de Jira

1. Haz clic en el icono más (`+`) en el lienzo del flujo de trabajo para añadir otro paso.
2. Busca la acción **Create issue** (Crear problema) y selecciónala para añadirla como paso en el lienzo de tu flujo de trabajo.
3. Haz clic en el paso en el lienzo de flujo de trabajo e introduce la siguiente información:
    - **Cuenta de Jira**: la URL de tu cuenta de Jira.
    - **Proyecto**: `{{ Source.securityFinding.tags_value.team }}`
    - **Resumen**: `{{ Source.securityFinding.rule.name }}`
4. Haz clic en **Save** (Guardar).

## Activar un flujo de trabajo

Puedes activar un flujo de trabajo existente desde los paneles laterales de búsqueda, configuración errónea y recursos.

En el panel lateral, haz clic en **Actions** > **Run Workflow** (Acciones > Ejecutar flujo de trabajo) y selecciona un flujo de trabajo para ejecutarlo. El flujo de trabajo debe tener un desencadenante de seguridad para que aparezca en la lista. En función del flujo de trabajo, es posible que debas introducir parámetros de entrada adicionales, como los detalles y la gravedad de la incidencia, el nombre del bucket de S3 afectado o el canal de Slack al que deseas enviar una alerta.

{{< img src="/security/csm/run_workflow_side_panel.png" alt="El menú de Acciones del panel lateral de configuraciones erróneas que muestra una lista de las acciones a ejecutar" width="100%">}}

Después de ejecutar el flujo de trabajo, se muestra información adicional en el panel lateral. Puedes hacer clic en el enlace para ver el flujo de trabajo.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/workflows
[2]: /es/security/cloud_security_management/
[3]: /es/service_management/workflows/build/
[4]: https://app.datadoghq.com/workflow
[5]: /es/integrations/slack/
[6]: /es/integrations/jira/
[7]: /es/service_management/workflows/build/#source-object-variables
[8]: /es/api/latest/security-monitoring/#get-a-finding