---
description: Controle a qué Datadog Agents puede dirigir su equipo con acciones privadas
  y qué acciones pueden ejecutar, utilizando Políticas de ejecución.
disable_toc: false
further_reading:
- link: /actions/private_actions/
  tag: Documentación
  text: Descripción general de Private Actions
- link: /actions/private_actions/enroll_runner/
  tag: Documentación
  text: Inscripción y propiedad
- link: /actions/private_actions/authorize_private_actions/
  tag: Documentación
  text: Autorizar Private Actions
- link: /actions/connections/
  tag: Documentación
  text: Conexiones
title: Políticas de ejecución
---
## Descripción general {#overview}

Las Políticas de ejecución le permiten controlar quién, dónde y qué acciones puede ejecutar su equipo. Cada Política de ejecución es una regla única de permitir o denegar para un conjunto de acciones, junto con los Agents a los que se aplica. Usted selecciona esos Agents mediante etiquetas de Agent. Las Políticas de ejecución le brindan dos ventajas principales al autorizar Private Actions:

- **Administre el acceso a escala**: Con [Connections][1], usted crea una conexión por integración en cada runner, lo cual se vuelve difícil de administrar en una flota grande. Las Políticas de ejecución le permiten controlar el acceso a muchos runners a la vez seleccionando Agents con etiquetas. Una sola política también puede listar más de un conjunto de Agents de destino, por lo que la misma regla puede cubrir varios equipos o entornos sin duplicarse.
- **Control detallado**: Puede permitir o denegar acciones específicas o conjuntos de acciones, y aplicar contextos específicos de la integración, como limitar una política de Kubernetes a espacios de nombres de destino específicos.

Las Políticas de ejecución se aplican a los runners de Private Actions que se ejecutan **dentro del Datadog Agent** y que se inscribieron como *sin propietario*. Un runner sin propietario se inscribe con una clave de API que tiene la capacidad de Private Action Runner, en lugar de estar vinculado a un usuario específico. Para saber cómo un runner se vuelve sin propietario, consulte [Enrollment and ownership][2].

## Requisitos previos {#prerequisites}

- Un runner de Private Actions que se ejecuta **en el Datadog Agent** inscrito como sin propietario (usando una clave de API con la capacidad de Private Action Runner).
- El `ExecutionGroupWrite` permiso, que le permite crear, actualizar y eliminar Políticas de ejecución. Consulte [Permisos](#permissions).

## Permisos {#permissions}

La creación, actualización y eliminación de Políticas de ejecución requieren el permiso `ExecutionGroupWrite`.

- El rol predeterminado **Datadog Admin** incluye este permiso.
- Para otorgarlo a otros usuarios, agréguelo a un [rol personalizado][3] y asigne ese rol a los usuarios o equipos que administran las Políticas de ejecución.

Este permiso controla quién puede **administrar** las Políticas de ejecución. Para controlar quién puede **usar** una Política de ejecución específica para ejecutar acciones privadas, consulte la configuración de [Acceso](#access) de esa política.

## Estructura de la política {#policy-structure}

Una Política de ejecución es una regla única de permitir o denegar para un conjunto de acciones privadas. Está compuesta por componentes, que incluyen las acciones que cubre y los Agentes de destino a los que se aplica.

Las secciones [Destinos](#targets) y [Acceso](#access) describen esos componentes en detalle. Para crear una Política de ejecución con todos sus componentes, consulte la sección [Crear una Política de ejecución](#create-an-execution-policy).

{{% collapse-content title="Destinos" level="h3" id="targets" %}}

Los Destinos son los selectores de etiquetas que eligen a qué Agent (que ejecuta un runner de acciones privadas) se aplica una Política de ejecución. Una política puede definir más de un destino, por lo que la misma regla puede cubrir más de un conjunto de Agentes sin duplicar la política. Por ejemplo, puede definir un destino por equipo o por entorno.

Cada destino es un conjunto de etiquetas:

- Las etiquetas se comparan con semántica **AND**. Un Agent debe tener **todas** las etiquetas de un destino para coincidir con él.
- Para coincidir con cada Agent que tenga habilitado un ejecutor de acciones privadas, utilice un comodín `*` por sí solo como destino.
- Los comodines parciales o con patrones como `env:*` o `*:prod`, y la combinación de `*` con otras etiquetas, **no son compatibles**.
- Opcionalmente, asigne un nombre a un destino para ayudar a distinguir varios destinos en la misma política.

A medida que edita las etiquetas de un destino, Datadog muestra un conteo en tiempo real de cuántos Agents coinciden con él.

Una política de ejecución sin destinos es válida, pero no tiene efecto. Nunca coincide con un Agent, por lo que nunca autoriza nada. Datadog etiqueta estas políticas como "no tiene destinos" para que sepa que debe completarlas o eliminarlas.

{{% /collapse-content %}}

{{% collapse-content title="Acceso" level="h3" id="access" %}}

Las políticas de ejecución tienen configuraciones de **Acceso** que controlan quién puede verlas y administrarlas, y a quién se aplica una política. El acceso funciona junto con el permiso [`ExecutionGroupWrite` ](#permissions). El permiso decide quién puede administrar las políticas de ejecución en absoluto, mientras que el acceso decide qué políticas específicas puede ver, editar o por cuáles puede ser regido cada usuario.

Las políticas de ejecución no almacenan credenciales. El acceso controla únicamente la segmentación y la autorización.

| Nivel de acceso | Puede ver | Puede editar | La política se les aplica |
|---|:---:|:---:|:---:|
| **Visualizador** | Sí | No | No |
| **Resolutor** | Sí | No | Sí |
| **Editor** | Sí | Sí | Sí |

Si una política "se aplica a" un usuario es lo que conecta Access con la autorización. Una política de **Permitir** otorga sus acciones solo a los usuarios a los que se aplica, y una política de **Denegar** restringe solo a los usuarios a los que se aplica. Un **Visualizador** puede ver la política, pero nunca se le otorgan ni se le restringen permisos mediante ella.

Cuando crea una política de ejecución, usted se convierte en su editor. Si una política no tiene configuraciones de acceso, se aplica a todos en su organización.

{{% /collapse-content %}}

## Cree una política de ejecución {#create-an-execution-policy}

1. Vaya a [**Actions > Execution Policies**][4] y haga clic en **Create Execution Policy**.
2. Ingrese un **Name** (por ejemplo, `Read-only Kubernetes`) o use el generado automáticamente.
3. Establezca el **Effect** en **Allow** o **Deny**.
4. En **Actions**, elija una integración y las acciones a incluir. Puede seleccionar acciones específicas, seleccionar paquetes completos o usar los selectores especiales **All actions** / **All read-only**.
5. Opcionalmente, establezca un contexto. Por ejemplo, para Kubernetes, establezca **Espacios de nombres de destino** para limitar la política a espacios de nombres específicos.
6. En **Destinos**, agregue una o más etiquetas para seleccionar los Agents a los que se aplica esta política. Un Agent debe tener todas las etiquetas en un destino para coincidir con él. Para apuntar a cada Agent que tenga habilitado un ejecutor de acciones privadas sin propietario, use un comodín `*` por sí solo. Agregue más de un destino para aplicar la misma política a más de un conjunto de Agents. Para obtener más información, consulte la sección [Destinos](#targets).
7. En **Acceso**, establezca quién puede visualizar, editar y a quién se aplica la política. Para obtener más información, consulte la sección [Acceso](#access).
8. Haga clic en **Create**.

## Utilice una política de ejecución en un flujo de trabajo {#use-an-execution-policy-in-a-workflow}

Cuando configure un paso de acción privada en un flujo de trabajo, puede apuntar a un Agent directamente en lugar de seleccionar una conexión:

1. En el selector de conexiones del paso, elija **Target** en lugar de **Connection**.
2. Seleccione cómo identificar al Agent:
    - **Hostname**: para un ejecutor de acciones privado en un host específico del Datadog Agent.
    - **Orch Cluster ID**: para un ejecutor de acciones privado en un Kubernetes Cluster Agent.
3. Ingrese el Hostname o el Orch Cluster ID del Agent de destino.

Esto crea una conexión virtual para el paso, identificada solo por el Agent de destino; no conlleva credenciales. Cuando se ejecuta el flujo de trabajo, la acción se ejecuta solo si una política de ejecución la autoriza para ese destino y el usuario que la solicita.

## Integraciones admitidas {#supported-integrations}

Las políticas de ejecución autorizan acciones para las siguientes integraciones:

- **Kubernetes** (`com.datadoghq.kubernetes.*`)
- **Remote Action** (`com.datadoghq.remoteaction.*`), que incluye el rshell bundle (la `runCommand` action) y acciones de ruta de red.
- **Script** (`com.datadoghq.script.*`).

La [Referencia del ejecutor de acciones privado][5] muestra qué acciones admite cada tipo de ejecutor. Si su integración no se puede autorizar mediante políticas de ejecución, utilice [Conexiones][1] en su lugar.

## Políticas de ejecución predeterminadas {#default-execution-policies}

Datadog aprovisiona políticas de ejecución predeterminadas en su organización para que las acciones de solo lectura funcionen tan pronto como se registre un ejecutor. No se requiere ninguna configuración propia. Estas:

- Apunte a cada Agent que ejecute un Private Action Runner (target selector `*`).
- Otorgan **Kubernetes de solo lectura** y **Acción remota de solo lectura** acciones.
- Permiten que **todos en su organización** ejecuten esas acciones de solo lectura. Los usuarios que tienen el permiso `ExecutionGroupWrite`, que el rol de Datadog Admin incluye de forma predeterminada, también pueden editarlas.

Las políticas de ejecución predeterminadas cubren solo acciones de solo lectura. Para ejecutar acciones con capacidad de escritura, o para limitar el acceso a Agents, espacios de nombres, equipos o usuarios específicos, consulte [Crear una política de ejecución](#create-an-execution-policy).

## Flujo de trabajo de autorización {#authorization-workflow}

Debido a que la autorización ocurre en Datadog antes de que se envíe una tarea, el ejecutor solo realiza acciones que ya han sido autorizadas. Cuando se solicita una acción privada contra un Private Action Runner en el Datadog Agent:

1. Datadog identifica el **target Agent** (por nombre de host o ID de clúster de orquestación) y sus etiquetas.
2. Datadog encuentra las políticas de ejecución cuyos **Targets** coinciden con esas etiquetas.
3. Datadog evalúa las **Políticas** coincidentes para la acción solicitada y el usuario que la solicita.
4. Si una política permite la acción y ninguna política la deniega, la tarea se envía al Agent, el cual la ejecuta. De lo contrario, la acción se deniega y nunca llega al Agent.

La evaluación sigue dos reglas:

- **Denegación predeterminada**: Si ninguna política permite explícitamente la acción, esta se deniega.
- **La denegación prevalece sobre la autorización**: Si alguna política coincidente deniega la acción, esta se deniega, incluso si otra política la permite.

Las políticas de ejecución no almacenan credenciales. Responden *dónde* pueden ejecutarse las acciones, *qué* se puede ejecutar y *quién* puede ejecutarlo.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/actions/connections/
[2]: /es/actions/private_actions/enroll_runner/
[3]: /es/account_management/rbac/
[4]: https://app.datadoghq.com/actions/execution-policies
[5]: /es/actions/private_actions/reference/