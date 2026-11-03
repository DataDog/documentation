---
description: 'Comprenda cómo Datadog instrumenta instancias de Amazon EC2 y funciones
  de AWS Lambda a través de la integración con AWS: los recursos de AWS creados, el
  mecanismo de instrumentación, el modelo de seguridad y cómo Datadog mantiene la
  instrumentación.'
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/aws-agent-installation/
  tag: Documentación
  text: Instale la instrumentación de Datadog a través de la integración con AWS
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: Documentación
  text: Integración de AWS
- link: https://docs.datadoghq.com/agent/fleet_automation/
  tag: Documentación
  text: Fleet Automation
- link: https://docs.datadoghq.com/account_management/workload_identity_federation/
  tag: Documentación
  text: Federación de identidad de carga de trabajo
private: true
title: Cómo funciona la instrumentación de Datadog a través de la integración con
  AWS
---
Esta página explica cómo Datadog instrumenta y mantiene las cargas de trabajo de AWS a través de la integración con AWS. Para obtener instrucciones de configuración y los permisos que Datadog requiere, consulte [Instalar la instrumentación de Datadog a través de la integración con AWS][1].

Esta página cubre instancias de Amazon EC2 y funciones de AWS Lambda. Amazon EKS no es compatible.

Datadog también ofrece [instrumentación remota][4] para funciones de AWS Lambda. La instrumentación remota implementa una función instrumentadora en su propia cuenta en lugar de realizar los cambios desde Datadog. Para obtener una comparación entre ambas opciones, consulte [Elegir entre la integración con AWS y la instrumentación remota][6] en la guía de configuración.

## Recursos de AWS que crea Datadog {#aws-resources-that-datadog-creates}

### Creado una vez, por la pila de CloudFormation {#created-once-by-the-cloudformation-stack}

La plantilla de CloudFormation que usted inicia crea los siguientes recursos una sola vez, en una única pila:

| Recurso | Nombre | Propósito |
|---|---|---|
| Conexión de EventBridge | `datadog-agent-resource-update-intake-connection` | Almacena sus claves de aplicación y Datadog API para que los eventos puedan enviarse a Datadog |
| Destino de API de EventBridge | `datadog-agent-resource-update-intake-destination` | Envía eventos de cambio de recursos a Datadog |
| Regla de EventBridge | `datadog-agent-resource-update-rule-ec2` | Notifica a Datadog cuando una instancia cubierta cambia. Creado cuando selecciona la carga de trabajo de EC2 |
| Regla de EventBridge | `datadog-agent-resource-update-rule-lambda` | Notifica a Datadog cuando una función cubierta cambia. Creado cuando selecciona la carga de trabajo de Lambda |
| Rol de IAM | con nombre automático | Permite que EventBridge envíe eventos al destino de API `datadog-agent-resource-update-intake-destination` |
| Rol de IAM | `datadog-eventbridge-cross-region-role` | Permite que otras regiones reenvíen eventos a su región principal |

La pila también adjunta los permisos de IAM para las cargas de trabajo que seleccionó a su rol de integración con AWS. Si selecciona solo la carga de trabajo de Lambda, la pila no otorga permisos de EC2.

### Creado según sea necesario, para instancias de EC2 {#created-as-needed-for-ec2-instances}

| Recurso | Nombre | Propósito |
|---|---|---|
| Documento de Systems Manager | `datadog-ec2-instrumenter` | El script de instalación y desinstalación. Un documento por cuenta. |
| Secreto de Secrets Manager | `/datadog/ec2-instrumenter/<ACCOUNT_ID>/<INSTANCE_ID>` | Almacena la clave de Datadog API para que la instancia pueda obtenerla por sí misma. Cifrado con la clave predeterminada administrada por AWS. |
| Rol de IAM y perfil de instancia | `datadog-ssm-<INSTANCE_ID>` y `datadog-ssm-profile-<INSTANCE_ID>` | Creados solo cuando la instancia no tiene un perfil de instancia, bajo la ruta de IAM `/datadog-ec2-instrumenter/` para que sean identificables. Recibe la `AmazonSSMManagedInstanceCore` política administrada por AWS para que Systems Manager pueda acceder a la instancia. |
| Política de IAM en línea | `datadog-ec2-instrumenter-secrets` | Agregada al rol de la instancia. Otorga acceso de solo lectura a los secretos bajo `/datadog/ec2-instrumenter/`. |
| Reglas de EventBridge en sus otras regiones | Mismos nombres que los recursos de la región principal | Reenvían eventos de cambio a su región principal. |

Datadog no crea buckets de S3, buses de eventos, grupos de registros o parámetros de SSM, y no etiqueta sus instancias.

### No se crean recursos adicionales para funciones de AWS Lambda {#no-additional-resources-created-for-lambda-functions}

Aparte de la regla de EventBridge de Lambda que crea la pila de CloudFormation, Datadog no crea recursos de AWS para la instrumentación de Lambda. El único otro cambio es en la configuración de las funciones que cubre su regla. Datadog no crea secretos, roles de IAM ni documentos de SSM para Lambda, y no etiqueta sus funciones.

## Cómo funciona la instrumentación {#how-instrumentation-works}

Después de guardar una regla de instrumentación, Datadog evalúa la consulta que definió en su cuenta para determinar los recursos cubiertos, luego ejecuta la siguiente secuencia en cada uno. Para conocer los requisitos previos, incluidas las plataformas y los tiempos de ejecución compatibles, consulte [Prerequisites][2] en la guía de configuración.

### En Amazon EC2 {#on-amazon-ec2}

1. Datadog verifica que cada instancia cubierta esté en ejecución, en una plataforma compatible y que sea accesible mediante AWS Systems Manager.
2. Cuando una instancia no tiene un perfil de instancia de IAM, Datadog crea uno para que Systems Manager pueda acceder a ella. Cuando una instancia ya tiene uno, Datadog agrega la política de SSM y la política de lectura de secretos con alcance al rol existente.
3. Datadog verifica si ya hay un Datadog Agent presente. Cuando hay un Datadog Agent presente que Datadog no instaló, Datadog se detiene y deja la instancia intacta.
4. Datadog llama a `ssm:SendCommand`, una instancia a la vez, ejecutando el documento `datadog-ec2-instrumenter`.
5. En la instancia, el documento obtiene la clave de API de Secrets Manager utilizando el propio rol de IAM de la instancia. Luego, ejecuta el instalador estándar del Datadog Agent (`install_script_agent7.sh` en Linux, o el MSI estándar en Windows) con la recopilación de registros y la instrumentación de servidor de APM habilitadas.

Datadog no reinicia sus instancias. El único servicio que Datadog toca es el propio Datadog Agent, el cual se inicia al instalarse y se detiene al desinstalarse. Sus aplicaciones y otros servicios no se ven afectados.

### En AWS Lambda {#on-aws-lambda}

La instrumentación de Lambda se ejecuta completamente desde Datadog. Datadog no implementa ningún cómputo, como una función de instrumentación, en su cuenta para instrumentar sus funciones.

1. Datadog lee la configuración y las etiquetas actuales de la función, y verifica que cumpla con los [Lambda prerequisites][3].
2. Datadog verifica si la función ya está instrumentada. Datadog omite una función que contiene capas de Datadog, un controlador de Datadog o variables de entorno de Datadog que Datadog no aplicó. Datadog también omite una función administrada por [remote instrumentation][4] e informa cuál de las dos razones aplica.
3. Datadog resuelve las versiones de capa de Datadog para el tiempo de ejecución, la arquitectura, la región y la partición de AWS de la función. Datadog aplica las versiones de capa que ha validado en lugar de lo que sea más nuevo en ese momento, por lo que una instalación es reproducible.
4. Datadog calcula la configuración deseada completa y registra exactamente lo que está a punto de cambiar, antes de cambiar nada.
5. Datadog autoriza al rol de ejecución de la función a enviar telemetría a su organización de Datadog. Consulte la sección [Cómo se autentica la telemetría de Lambda](#how-lambda-telemetry-is-authenticated).
6. Datadog llama a `lambda:UpdateFunctionConfiguration` una vez, enviando la lista completa y el mapa de entorno. Datadog marca el cambio como aplicado solo después de que AWS informa el éxito.

Una actualización de Lambda es una operación de tipo reemplazo: la lista de capas enviada y el mapa de entorno se convierten en la nueva configuración. Por lo tanto, Datadog calcula el estado deseado completo en lugar de añadirlo, lo que preserva sus capas y variables de entorno existentes. La actualización lleva el ID de revisión de la función, por lo que un cambio realizado en su cuenta entre la lectura y la escritura de Datadog hace que la actualización falle en lugar de sobrescribir el cambio.

### Lo que Datadog cambia en una función {#what-datadog-changes-on-a-function}

| Cambio | Se aplica a |
|---|---|
| Agrega la capa de extensión de Datadog (`Datadog-Extension` o `Datadog-Extension-ARM`) | Todos los tiempos de ejecución compatibles |
| Agrega la capa de rastreo de Datadog correspondiente | Node.js, Python, Ruby, Java y .NET |
| Establece `DD_SITE` y `DD_ORG_UUID` | Todos los tiempos de ejecución compatibles |
| Redirige el controlador al controlador de Datadog y mueve el original a `DD_LAMBDA_HANDLER` | Node.js y Python |
| Establece `AWS_LAMBDA_EXEC_WRAPPER` en `/opt/datadog_wrapper` | Java y .NET |

Datadog no cambia el código de la función, el tamaño de la memoria, el tiempo de espera, la configuración de VPC, la concurrencia ni ninguna otra configuración de la función.

### Recursos que Datadog excluye {#resources-that-datadog-excludes}

En EC2, Datadog excluye:

- Instancias que no se están ejecutando
- Nodos de trabajo de EKS
- Instancias de contenedor de ECS
- Instancias que ya tienen un Datadog Agent instalado que no fue instalado por Datadog

En Lambda, Datadog excluye:

- Funciones de imagen de contenedor y funciones en un tiempo de ejecución o arquitectura no compatibles
- Funciones fuera de la partición `aws` comercial
- Réplicas de Lambda@Edge y las funciones que replican
- Funciones ya instrumentadas por usted o mediante instrumentación remota
- Funciones que ya establecen `AWS_LAMBDA_EXEC_WRAPPER` en un envoltorio que no es de Datadog
- Funciones donde agregar las capas de Datadog excedería el límite de cinco capas de AWS

## Security, auditoría y control de cambios {#security-auditing-and-change-control}

### Cómo obtiene acceso Datadog {#how-datadog-gets-access}

Datadog utiliza el mismo rol IAM entre cuentas que la integración de AWS, autenticado con un ID externo. Datadog recibe credenciales temporales de corta duración, y cada tipo de trabajo (leer EC2, administrar IAM, enviar comandos, actualizar funciones) utiliza una sesión de credenciales con alcance específico en lugar de una sesión amplia. Datadog no almacena ninguna clave de AWS de larga duración.

### Auditoría de las acciones de Datadog {#auditing-datadogs-actions}

Cada acción que realiza Datadog es una llamada estándar a la API de AWS, por lo que todas las acciones aparecen en AWS CloudTrail. Todo lo que crea Datadog es identificable por nombre: los recursos tienen el prefijo `datadog-`, los secretos se almacenan bajo `/datadog/ec2-instrumenter/` y los roles IAM utilizan la ruta inmutable `/datadog-ec2-instrumenter/`. Debido a que una ruta IAM no se puede editar después de su creación, la ruta no puede cambiarse silenciosamente. Los resultados de los comandos en la instancia aparecen en el historial de Systems Manager Run Command. Los cambios en la configuración de Lambda aparecen como eventos `UpdateFunctionConfiguration` atribuidos a su rol de integración de AWS.

### Cómo se maneja la clave de API en EC2 {#how-the-api-key-is-handled-on-ec2}

La clave de API se almacena en su propio Secrets Manager, cifrada en reposo. Solo se pasa el Amazon Resource Name (ARN) del secreto en el comando SSM; la clave en sí nunca aparece en los parámetros del comando ni en CloudTrail. La instancia lee el secreto con su propio rol de IAM, restringido a una sola ruta. Datadog almacena internamente solo una referencia a la clave, no la clave en sí.

### Cómo se autentica la telemetría de Lambda {#how-lambda-telemetry-is-authenticated}

La instrumentación de Lambda no almacena ninguna credencial de Datadog en su cuenta. La extensión de Datadog se autentica con la identidad de ejecución de AWS de la función a través de [Workload Identity Federation][5], utilizando los valores `DD_ORG_UUID` y `DD_SITE` que Datadog establece en la función. No se escribe ninguna clave de API de Datadog, ARN secreto o clave cifrada con KMS en la configuración de la función.

Para que esa autenticación tenga éxito, Datadog autoriza al rol de ejecución de la función a enviar telemetría a su organización de Datadog. Datadog configura esta autorización antes de actualizar una función y coincide exactamente con el rol de ejecución, en lugar de hacerlo mediante un patrón más amplio.

Debido a que un solo rol de ejecución a menudo se comparte entre funciones, Datadog crea estas autorizaciones pero no las elimina al desinstalar. Eliminar la autorización para un rol compartido podría romper otra función que aún dependa de él.

### Quién puede cambiar la instrumentación {#who-can-change-instrumentation}

- **En AWS**: El acceso se rige por sus propias políticas de IAM. Eliminar los permisos entre cuentas detiene a Datadog inmediatamente.
- **En Datadog**: Ver las reglas de instrumentación requiere el permiso **Hosts Read**. Crear, editar o eliminar reglas requiere el permiso **Agent Install**. Los cambios en las reglas están sujetos a un límite de tasa.

### Barreras de protección {#guardrails}

- Datadog nunca elimina la instrumentación que no instaló.
- Datadog rastrea qué recursos instrumentó, por lo que solo limpia su propio trabajo.
- En EC2, cuando no se pueden listar algunas regiones, Datadog omite la limpieza en lugar de arriesgarse a eliminar la instrumentación de forma masiva.
- En Lambda, Datadog restaura una función a partir de la configuración que registró antes de instrumentarla, por lo que una desinstalación revierte exactamente el cambio que realizó Datadog.
- Un fallo se encuentra en el contexto del recurso individual. Un recurso que falla no afecta a los recursos que ya están instrumentados.

## Cómo mantiene Datadog la instrumentación {#how-datadog-maintains-instrumentation}

### Reconciliación continua {#continuous-reconciliation}

Datadog mantiene continuamente el estado que usted define en los recursos cubiertos:

- Datadog vuelve a verificar los recursos cubiertos de forma regular, restaurando la instrumentación que falta, reintentando cualquier cosa que falle y limpiando los recursos que ya no existen.
- Los eventos de cambio enviados desde su cuenta permiten que Datadog reaccione en cuestión de minutos, en lugar de esperar a la siguiente verificación programada. Datadog reacciona tanto ante un recurso cubierto que cambió como ante un recurso recién creado que coincide con una regla basada en consultas:
  - **EC2**: Los eventos provienen de la regla de EventBridge de la pila de CloudFormation.
  - **Lambda**: La regla `datadog-agent-resource-update-rule-lambda` envía eventos de creación de función, actualización de configuración, etiquetado y eliminación de etiquetas.
- En EC2, las instancias que ya tienen el Agent se vuelven a verificar con menos frecuencia, para evitar actividades innecesarias.
- En Lambda, Datadog llama a la API de Lambda en su cuenta solo para las funciones que necesitan un cambio. Una flota que ya cuenta con las versiones de capa actuales no genera actividad por función.

### Cómo las funciones Lambda obtienen nuevas versiones de capa {#how-lambda-functions-pick-up-new-layer-versions}

Datadog compara las capas de una función cubierta con las versiones que Datadog implementa, en lugar de compararlas con las versiones aplicadas en la instrumentación inicial. Cuando Datadog lanza nuevas versiones de capa, las funciones cubiertas se actualizan a ellas. Por lo tanto, sus funciones avanzan con los lanzamientos de capa de Datadog sin que usted tenga que realizar ninguna acción.

Una actualización de configuración de Lambda que aún está en curso se deja intacta y se reintenta poco después, por lo que Datadog no compite con un cambio que ya se está aplicando.

### Cómo determina la cobertura una regla {#how-a-rule-determines-coverage}

Una regla no es una selección única. Datadog reevalúa su consulta con el tiempo y reacciona a los eventos de cambio enviados desde su cuenta. Datadog instrumenta un recurso tan pronto como detecta una coincidencia, en cualquiera de los siguientes casos:

- **Se creó después de que usted guardó la regla.** `RunInstances` y `CreateFunction` eventos se reenvían, por lo que un nuevo recurso se detecta en cuestión de minutos.
- **Ya existía y comenzó a coincidir.** Etiquetar un recurso para incluirlo en el contexto es el caso común, por lo que los eventos de etiqueta también se reenvían: `CreateTags` y `DeleteTags` en EC2, `TagResource` y `UntagResource` en Lambda. Esto permite escribir una regla como `@Tags:datadog:true` primero y, luego, etiquetar los recursos a medida que avanza.

Una regla que creó seleccionando recursos específicos contiene una consulta que nombra esos recursos, por lo que nada más coincide con ella.

Para obtener orientación sobre cómo escribir una consulta, incluido cuándo hacer coincidir una etiqueta fija, consulte [Elija cómo su regla coincide con los recursos][7] en la guía de configuración.

### Qué sucede cuando cambia la cobertura {#what-happens-when-coverage-changes}

Datadog vuelve a evaluar la regla y compara los recursos cubiertos con el conjunto anterior. A los recursos que ya no están cubiertos se les elimina la instrumentación. Los recursos recién cubiertos se instrumentan. Eliminar una regla quita la instrumentación de todo lo que la regla cubría.

<div class="alert alert-warning">
Datadog elimina la instrumentación cuando un recurso ya no coincide con la regla, ya sea que el cambio provenga de una edición en Datadog o de volver a etiquetar o reconfigurar el recurso en AWS. Tenga en cuenta este comportamiento cuando escriba una regla basada en etiquetas que otros equipos puedan cambiar.
</div>

### Recursos terminados, detenidos o eliminados {#terminated-stopped-or-deleted-resources}

En EC2, Datadog detecta las instancias terminadas y limpia los recursos de IAM que creó para ellas. Datadog deja las instancias detenidas sin cambios hasta que regresan. En Lambda, una función eliminada deja de estar cubierta.

### Cuando la instrumentación falla {#when-instrumentation-fails}

Datadog vuelve a intentar automáticamente, con un retraso creciente entre intentos. Los problemas que requieren su acción, como un permiso faltante o una función en el límite de capas, se reportan y ya no se reintentan hasta que usted los resuelva. Los problemas de permisos faltantes aparecen como un inconveniente en el **mosaico de integración de AWS** y en la página de instalación de Fleet.

<div class="alert alert-warning">
Cuando alguien elimina manualmente la instrumentación de un recurso cubierto, Datadog la restaura. La regla es la fuente de la verdad. Para detener la cobertura, cambie la regla.
</div>

## Eliminar la instrumentación de Datadog {#remove-datadog-instrumentation}

Para eliminar la instrumentación, elimine los recursos de una regla, edite la consulta de la regla o elimine la regla.

- **EC2**: Datadog elimina el Datadog Agent, los directorios `/etc/datadog-agent` y `/opt/datadog-agent` en Linux (o realiza una desinstalación MSI en Windows), y cualquier rol de IAM o perfil de instancia que Datadog haya creado para cada instancia.
- **Lambda**: Datadog elimina las capas que agregó y restaura las variables de entorno y el handler que la función tenía anteriormente. Datadog primero compara su registro de la configuración original con la configuración actual de la función, por lo que no elimina una capa o variable que no agregó. La autorización de telemetría para el rol de ejecución se deja en su lugar, porque el rol puede compartirse con otras funciones.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/guide/aws-agent-installation/
[2]: https://docs.datadoghq.com/es/integrations/guide/aws-agent-installation/#prerequisites
[3]: https://docs.datadoghq.com/es/integrations/guide/aws-agent-installation/#aws-lambda-functions
[4]: https://docs.datadoghq.com/es/serverless/aws_lambda/remote_instrumentation/
[5]: https://docs.datadoghq.com/es/account_management/workload_identity_federation/
[6]: https://docs.datadoghq.com/es/integrations/guide/aws-agent-installation/#choose-between-the-aws-integration-and-remote-instrumentation
[7]: https://docs.datadoghq.com/es/integrations/guide/aws-agent-installation/#choose-how-your-rule-matches-resources