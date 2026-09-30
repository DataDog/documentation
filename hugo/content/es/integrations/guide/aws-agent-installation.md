---
description: Instrumente sus instancias de Amazon EC2 y funciones de AWS Lambda directamente
  desde la integración con AWS, sin conectarse a cada servidor ni volver a implementar
  cada función.
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/aws-agent-installation-technical-reference/
  tag: Documentación
  text: Cómo funciona la instrumentación de Datadog a través de la integración con
    AWS
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: Documentación
  text: Integración de AWS
- link: https://docs.datadoghq.com/integrations/guide/aws-manual-setup/
  tag: Documentación
  text: Guía de configuración manual de AWS
- link: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Documentación
  text: ¿Por qué instalar el Datadog Agent en sus instancias en la nube?
- link: https://docs.datadoghq.com/agent/fleet_automation/
  tag: Documentación
  text: Fleet Automation
- link: https://docs.datadoghq.com/agent/configuration/
  tag: Documentación
  text: Configuración del Agent
- link: https://docs.datadoghq.com/serverless/aws_lambda/
  tag: Documentación
  text: Serverless Monitoring para AWS Lambda
- link: https://docs.datadoghq.com/serverless/aws_lambda/configuration/
  tag: Documentación
  text: Configure Serverless Monitoring para AWS Lambda
- link: https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/
  tag: Documentación
  text: Instrumentación de AWS Lambda
- link: https://docs.datadoghq.com/serverless/aws_lambda/troubleshooting/
  tag: Documentación
  text: Solución de problemas de monitoreo de AWS Lambda
- link: https://docs.datadoghq.com/account_management/workload_identity_federation/
  tag: Documentación
  text: Federación de identidad de carga de trabajo
private: true
title: Instale la instrumentación de Datadog a través de la integración con AWS
---
## Descripción general {#overview}

La [integración de AWS][1] recopila métricas, eventos y registros de Amazon CloudWatch sin instalar nada en sus recursos. La instrumentación de Datadog recopila datos de telemetría desde el interior de sus cargas de trabajo de AWS que CloudWatch por sí solo no puede proporcionar, incluidas las métricas a nivel de servidor, trazas distribuidas (APM), procesos en vivo y registros detallados.

Puede instrumentar sus cargas de trabajo de AWS directamente desde Datadog, sin conectarse a cada servidor ni volver a implementar cada función. Habilite la instrumentación mientras configura la integración con AWS, o en cualquier momento posterior.

## Cargas de trabajo compatibles {#supported-workloads}

| Carga de trabajo | Lo que instala Datadog |
|---|---|
| Instancias de Amazon EC2 | El Datadog Agent |
| Funciones de AWS Lambda | La extensión de Datadog Lambda y, para los entornos de ejecución compatibles, la capa de rastreo de Datadog que coincide con el entorno de ejecución de la función |

Amazon EKS no es compatible. Para las funciones de Lambda, Datadog también ofrece instrumentación remota, un producto independiente. Para decidir cuál usar, consulte la siguiente sección.

<div class="alert alert-warning">Una función de Lambda solo puede ser administrada por un producto de instrumentación de Datadog. Datadog omite cualquier función que ya administre la instrumentación remota y omite cualquier función que usted mismo haya instrumentado.</div>

## Elija entre la integración con AWS y la instrumentación remota {#choose-between-the-aws-integration-and-remote-instrumentation}

Datadog ofrece dos formas de agregar instrumentación a las funciones de Lambda sin tener que volver a implementarlas usted mismo:

- **La instrumentación a través de la integración con AWS**, cubierta por esta guía, se administra completamente desde Datadog. Datadog actualiza sus funciones con el rol de IAM de integración de AWS creado por la pila de CloudFormation y no implementa ningún cómputo en su cuenta.
- **[Instrumentación remota][9]** implementa una función instrumentadora de Datadog, `datadog-remote-instrumenter`, en su propia cuenta. Esa función aplica la instrumentación y la mantiene en su lugar.

Ambos agregan la misma extensión de Datadog Lambda y capas de rastreo, y ambos restauran la instrumentación que se cambia fuera de Datadog. Difieren en dónde se ejecuta el trabajo, cómo se seleccionan las funciones y qué es lo que usted instala.

| Aspecto | Instrumentación a través de la integración con AWS | Instrumentación remota |
|---|---|---|
| Cargas de trabajo | Instancias de Amazon EC2 y funciones de AWS Lambda | Funciones de AWS Lambda |
| Lo que se ejecuta en su cuenta | Ningún cómputo de Datadog. Datadog llama a las API de AWS con el rol de IAM de integración de AWS creado por la pila de CloudFormation | La función Lambda instrumentadora de Datadog |
| Alcance de la configuración | Una pila de CloudFormation por cuenta de AWS | Una pila de CloudFormation por cuenta y región |
| Selección de funciones | Escriba una consulta sobre los atributos de la función, seleccione funciones específicas o agregue todas las funciones elegibles. Datadog muestra el conjunto coincidente antes de que usted guarde | Escriba reglas de segmentación sobre nombres de funciones y etiquetas, con operadores lógicos |
| Funciones que coinciden posteriormente | Instrumentadas automáticamente, ya sea que se hayan creado después de que usted guardó la regla o que hayan comenzado a coincidir después de un cambio de etiqueta | Instrumentadas automáticamente cuando coinciden con sus reglas de segmentación |
| Versiones de capa | Datadog las selecciona y actualiza | Establezca las versiones de capa y permanezcan fijas hasta que usted las cambie |
| Cómo se autentican las funciones instrumentadas | [Workload Identity Federation][16], sin una clave de Datadog API en la función | Una clave de API de Datadog con Remote Configuration habilitada |
| Permisos de Datadog | Lectura de hosts e instalación de Agent | Lectura y escritura de Serverless AWS Instrumentation |
| Eliminación de la instrumentación | Eliminar de Datadog | Eliminar la pila de CloudFormation en esa región |

Ambos productos implementan una pila de CloudFormation en su cuenta. La pila para la instrumentación remota también crea un registro de CloudTrail y recursos de soporte. Para conocer lo que crea la pila en esta guía, incluidos los recursos de EventBridge que envían eventos de cambio a Datadog, consulte [Cómo funciona la instrumentación de Datadog a través de la integración con AWS][6].

Utilice la instrumentación a través de la integración con AWS cuando desee instrumentar tanto instancias EC2 como funciones Lambda desde un solo lugar, o cuando desee limitar la lista de funciones por región, tiempo de ejecución y tamaño de memoria.

Utilice la instrumentación remota cuando desee hacer coincidir las etiquetas en `DD_TAGS`, o cuando desee establecer las versiones de capa aplicadas a sus funciones y mantenerlas fijas. Ambos productos pueden coincidir con etiquetas de recursos de AWS.

## Requisitos previos {#prerequisites}

Para todas las cargas de trabajo, confirme lo siguiente:

- **Acceso a CloudFormation**: Puede aprobar una pila de CloudFormation en la cuenta de AWS de destino. La instrumentación implementa una pila en su cuenta, por lo que usted (o un compañero de equipo) necesita permiso para revisarla y crearla. Para conocer los permisos necesarios y por qué se requieren, consulte la sección [Permisos de AWS requeridos](#required-aws-permissions).
- **Permisos de Datadog**: Ver las reglas de instrumentación requiere el permiso **Hosts Read**. Crear, editar o eliminar reglas requiere el permiso **Agent Install**.

### Instancias de Amazon EC2 {#amazon-ec2-instances}

- **SSM Agent**: El [AWS Systems Manager (SSM) Agent][2] ya debe estar presente en las instancias de destino. Datadog instala el Agent a través de SSM y no puede instalar el SSM Agent por usted, por lo que las instancias creadas a partir de AMI personalizadas sin el SSM Agent no son elegibles. Datadog marca estas instancias para que pueda abordarlas.
- **Plataformas compatibles**: Linux (x86_64 y arm64) y Windows (x86_64). macOS y Windows en arm64 no son compatibles.

### Funciones de AWS Lambda {#aws-lambda-functions}

- **Recopilación de recursos**: [Resource collection][10] debe estar habilitada en la integración de AWS. Datadog la utiliza para listar sus funciones y obtener una vista previa de cuáles coinciden con una regla.
- **Partición de AWS**: La función debe estar en la partición `aws` comercial. Las funciones en las particiones AWS GovCloud o AWS China no son compatibles, debido a que la instrumentación de Lambda se autentica a través de [Workload Identity Federation][16], la cual no es compatible con esas particiones.
- **Tipo de paquete**: La función debe utilizar el tipo de paquete Zip. Las funciones de imagen de contenedor no son compatibles, debido a que la instrumentación de Datadog se distribuye como capas de Lambda, las cuales las funciones de imagen de contenedor no pueden utilizar.
- **Arquitectura**: La función debe utilizar una arquitectura única, ya sea `x86_64` o `arm64`.
- **Lambda@Edge**: La función no debe ser una función Lambda@Edge. Datadog excluye tanto las réplicas como las funciones que estas replican.
- **Recuento de capas**: AWS limita una función a cinco capas. Datadog añade dos capas, o una para tiempos de ejecución solo de SO, por lo que la función debe tener espacio para ellas después de sus capas existentes.
- **Tiempos de ejecución compatibles**:

  | Versiones | de tiempo de ejecución |
  |---|---|
  | Node.js | 16.x, 18.x, 20.x, 22.x, 24.x, 26.x |
  | Python | 3.8, 3.9, 3.10, 3.11, 3.12, 3.13, 3.14 |
  | Ruby | 3.2, 3.3, 3.4, 4.0 |
  | Java | 8 (`java8` y `java8.al2`), 11, 17, 21, 25 |
  | .NET | 6, 8, 10 |
  | Solo SO | `provided.al2` y `provided.al2023` (solo capa de extensión, sin capa de rastreo) |

Datadog marca cualquier función que no cumpla con estas condiciones como no elegible en la vista previa de la regla, para que pueda ver qué está excluido antes de aplicar una regla.

## Permisos de AWS requeridos {#required-aws-permissions}

{{% aws-agent-installation %}}

Las siguientes secciones listan los permisos que comparten todas las cargas de trabajo, seguidos de los permisos específicos para cada carga de trabajo.

### Permisos de notificación de cambios {#change-notification-permissions}

Estos permisos permiten a Datadog reaccionar a los cambios en sus recursos de AWS. Se aplican a cada carga de trabajo:

| Permiso | Por qué Datadog lo necesita |
|---|---|
| `events:PutRule`, `events:PutTargets`, `events:DescribeRule`, `events:ListTargetsByRule`, `events:RemoveTargets`, `events:DeleteRule` | Configure las notificaciones de cambio que permiten a Datadog reaccionar a los cambios en los recursos |
| `iam:GetRole`, `iam:PassRole` | Leer y pasar el rol de EventBridge entre regiones. Ambos están restringidos al rol `datadog-eventbridge-cross-region-role`, y `iam:PassRole` está restringido además al servicio EventBridge |

### Permisos de Amazon EC2 {#amazon-ec2-permissions}

| Permiso | Por qué Datadog lo necesita |
|---|---|
| `ec2:DescribeInstances` | Encuentre sus instancias y verifique cuáles coinciden con su regla (estado, etiquetas, SO, arquitectura) |
| `ssm:DescribeInstanceInformation` | Confirme que el SSM Agent se esté ejecutando antes de que Datadog intente cualquier cosa |
| `ssm:GetDocument`, `ssm:CreateDocument`, `ssm:UpdateDocument`, `ssm:UpdateDocumentDefaultVersion` | Publique el script de instalación en su cuenta y manténgalo actualizado |
| `ssm:SendCommand`, `ssm:ListCommandInvocations` | Ejecute la instalación y confirme cuando finalice |
| `secretsmanager:DescribeSecret`, `secretsmanager:CreateSecret` | Almacene la clave de API para que nunca se pase en un comando |
| `iam:CreateRole`, `iam:CreateInstanceProfile`, `iam:AddRoleToInstanceProfile`, `iam:AttachRolePolicy`, `iam:PutRolePolicy`, `iam:PassRole`, `ec2:AssociateIamInstanceProfile`, y las lecturas coincidentes `Get` y `List` | Otorgue a una instancia el acceso mínimo que necesita en incidencia de que no tenga un rol de IAM: accesible por Systems Manager, y capaz de leer su propio secreto de clave de API |
| `iam:Detach*`, `iam:Delete*`, `iam:RemoveRoleFromInstanceProfile`, `ec2:Disassociate*`, `ec2:DescribeIamInstanceProfileAssociations` | Elimine de forma limpia los recursos anteriores al desinstalar |
| `ecs:ListClusters`, `ecs:ListContainerInstances` | Reconozca las instancias de contenedor de Amazon Elastic Container Service (ECS) para que Datadog las omita (se gestionan a nivel de clúster) |

`iam:CreateRole` y `iam:PassRole` son las concesiones más sensibles. `iam:CreateRole` está restringido a los nombres de rol que coinciden con `datadog-ec2-instrumenter/datadog-ssm-*` en su cuenta, y `iam:PassRole` está restringido adicionalmente al servicio Amazon EC2.

### Permisos de AWS Lambda {#aws-lambda-permissions}

| Permiso | Por qué Datadog lo necesita |
|---|---|
| `lambda:ListFunctions` | Encuentre las funciones en su cuenta y región |
| `cloudfront:ListDistributions` | Identifique las funciones de Lambda@Edge para que Datadog las omita |
| `lambda:GetFunctionConfiguration`, `lambda:ListTags` | Lea la configuración y las etiquetas de una función para verificar qué funciones coinciden con su regla |
| `lambda:UpdateFunctionConfiguration` | Agregue las capas y las variables de entorno de Datadog, y elimínelas al desinstalar |
| `lambda:GetLayerVersion` | Cumpla con el requisito de AWS de que cada capa enviada durante una actualización de función esté autorizada, incluidas sus propias capas sin cambios |

La instrumentación de Lambda no necesita permisos de escritura de Secrets Manager, Systems Manager o IAM. Las lecturas y actualizaciones de funciones están restringidas a las funciones de Lambda en su propia cuenta.

## Cómo funciona {#how-it-works}

La instrumentación se basa en una **regla de instrumentación**: una cuenta de AWS vinculada a una consulta que describe qué recursos cubrir. Datadog evalúa la consulta, instrumenta cada recurso cubierto dentro de su propia cuenta y lo mantiene instrumentado:

1. Usted escribe una consulta que describe los recursos a cubrir, selecciona recursos específicos o agrega todos los recursos elegibles.
1. Datadog evalúa la regla con respecto a su cuenta y registra qué recursos cubre.
1. Datadog instrumenta cada recurso cubierto: en EC2, instalando el Agent a través de AWS Systems Manager; en Lambda, agregando las capas de Datadog y las variables de entorno a la función.
1. Datadog mantiene instrumentados los recursos cubiertos, reinstalando la instrumentación que falta y reintentando cualquier acción que haya fallado.

Usted aprueba una pila de CloudFormation, una vez, durante la configuración inicial. Después de eso, la instrumentación se ejecuta automáticamente desde Datadog, sin necesidad de lanzar una nueva plantilla de CloudFormation.

Para obtener los detalles técnicos y de seguridad completos, incluidos los recursos de AWS que crea Datadog, el mecanismo de instrumentación y cómo Datadog mantiene la instrumentación en su lugar, consulte [Cómo funciona la instrumentación de Datadog a través de la integración de AWS][6].

{{< img src="integrations/amazon_web_services/aws-agent-installation-how-it-works.png" alt="Diagrama de flujo del proceso de instalación del Agent de AWS, que muestra qué pasos ocurren en Datadog y cuáles se ejecutan dentro de su cuenta de AWS." style="width:70%;" >}}

<!-- TODO(DOCS-14545): the "How it works" diagram shows the EC2 flow only. Add a Lambda equivalent (or a workload-agnostic version) before publish. -->

### Elija cómo su regla coincide con los recursos {#choose-how-your-rule-matches-resources}

Debido a que Datadog vuelve a evaluar la regla con el tiempo, la consulta que usted escribe determina cómo se comporta la cobertura a medida que cambia su infraestructura.

**Para cubrir los recursos a medida que aparecen**, haga coincidir las etiquetas y los atributos que ya están presentes en su infraestructura, como `env:prod`. Cualquier recurso que coincida se instrumenta, incluidos los recursos creados o reetiquetados después de guardar la regla. Use esto cuando desee que se haga un seguimiento automático de los nuevos recursos coincidentes sin actualizar la regla.

**Para cubrir un conjunto fijo**, seleccione los recursos individualmente de la lista de recursos. La regla coincide solo con los recursos que seleccionó, por lo que los recursos que aparecen más tarde no se agregan.

**Cuando un conjunto fijo es demasiado grande para seleccionarlo individualmente**, haga coincidir una etiqueta que usted controle, como `datadog:true`. Aplique esa etiqueta solo a los recursos que desea instrumentar. La cobertura cambia entonces solo cuando usted cambia las etiquetas, por lo que su infraestructura como código determina qué recursos están cubiertos.

<div class="alert alert-warning">
La cobertura funciona en ambas direcciones. Cuando un recurso deja de coincidir con la regla, Datadog elimina la instrumentación del mismo. Por lo tanto, un cambio de etiqueta realizado en AWS puede eliminar el seguimiento de un recurso sin que nadie edite la regla en Datadog.
</div>

### Mejores prácticas para reglas y etiquetas {#best-practices-for-rules-and-tags}

**Haga coincidir las etiquetas que su equipo posee.** Cuando una regla coincide con una etiqueta que otro equipo controla, ese equipo puede agregar o eliminar la supervisión mediante el reetiquetado, sin abrir Datadog. Mantener la etiqueta y la regla bajo la misma propiedad mantiene esa decisión con las personas que la tomaron.

**Evite etiquetas que cambien durante las operaciones normales.** Las etiquetas que cambian con una promoción de entorno, una implementación o una plantilla de escalado automático pueden mover recursos dentro y fuera de la cobertura. Haga coincidir atributos que permanezcan estables durante la vida útil del recurso.

**Trate la regla como la configuración completa para la cuenta.** Cada cuenta de AWS tiene una regla por tipo de recurso. Cada edición vuelve a definir el alcance de toda la cobertura para ese tipo de recurso en lugar de añadir a la cobertura existente. Revise los recursos coincidentes antes de guardar.

**Establezca excepciones con exclusiones.** Cuando una regla amplia cubra recursos que desea omitir, exclúyalos de la misma regla en lugar de cambiar a una lista seleccionada individualmente. Las exclusiones mantienen la regla legible y preservan la cobertura automática para todo lo demás.

## Lo que Datadog cambia en una función Lambda {#what-datadog-changes-on-a-lambda-function}

Datadog conserva sus capas y variables de entorno existentes. Para funciones de Node.js y Python, Datadog redirige el handler al handler de Datadog y mantiene el handler original en una variable de entorno. Datadog registra exactamente lo que cambió, por lo que la desinstalación restaura su configuración original. Para conocer los cambios específicos en capas, variables de entorno y en el handler que realiza Datadog, consulte [What Datadog changes on a function][17] en la referencia técnica.

**No se escribe ninguna clave de Datadog API en su función.** La extensión se autentica con el propio rol de ejecución de la función a través de [Workload Identity Federation][16], por lo que no se almacena ninguna credencial de Datadog en su cuenta para la instrumentación de Lambda. Datadog configura esta autenticación para usted, por lo que no hay nada que configurar.

Para ajustar lo que recopila la extensión, establezca las variables de entorno estándar de Datadog en la función. Para obtener la lista completa, consulte [Configure Serverless Monitoring for AWS Lambda][14]. Para saber qué recopila la instrumentación y qué funciones de monitoreo de Lambda habilita, consulte [Serverless Monitoring for AWS Lambda][13].

## Instalar la instrumentación de Datadog {#install-datadog-instrumentation}

Puede iniciar la instrumentación desde dos puntos de entrada, dependiendo de cuánto control desee sobre qué recursos se instrumentan:

- **Configuración de la integración de AWS (instrumentar todos los recursos elegibles)**: Cuando [configure la integración de AWS][5], habilite el interruptor de instrumentación en la [AWS integration page][7], junto a la recopilación de registros y recursos. Luego, seleccione las cargas de trabajo que desee. Datadog instrumenta todos los recursos elegibles para esas cargas de trabajo y continúa instrumentando los recursos elegibles a medida que aparecen.
- **Fleet Automation (instrumentar recursos específicos)**: Abra la [AWS Install Agents page][8] en cualquier momento para seleccionar los recursos específicos que desee.

<!-- TODO(DOCS-14545): per AWS team, surfacing the install flow in the main AWS setup flow for non-first-time users is still rolling out; confirm it's live before publish. -->

El interruptor de instrumentación aparece durante la configuración, con un selector de carga de trabajo que enumera **Instancias EC2**, **Funciones Lambda** y **Clústeres EKS**. Solo se pueden seleccionar **Instancias EC2** y **Funciones Lambda**:

{{< img src="integrations/amazon_web_services/aws-agent-installation-setup-toggle.png" alt="El paso Instalar el Datadog Agent en la configuración de AWS, con el interruptor de instalación habilitado y el interruptor de carga de trabajo de Hosts (EC2) activado." style="width:80%;" >}}

<!-- TODO(DOCS-14545): the setup-toggle screenshot predates the Lambda workload. Recapture it showing EC2 Instances, Lambda Functions, and EKS Clusters (Coming Soon) before publish. -->

Para instalar desde la página de instalación de Agents de AWS:

1. Seleccione la carga de trabajo que desea instrumentar: **Instancias EC2** o **Funciones Lambda**.
1. Escriba una consulta que describa los recursos a cubrir, seleccione recursos específicos de la lista o agregue todos los recursos elegibles. Para Lambda, puede limitar la lista por región, tiempo de ejecución y tamaño de memoria.
1. Revise la vista previa de los recursos coincidentes. Los recursos que Datadog no puede instrumentar aparecen como no elegibles, junto con el motivo.
1. Revise la pila de CloudFormation generada, luego continúe a AWS y créela. Datadog le solicita esto solo una vez.
1. Regrese a Datadog. La instrumentación procede automáticamente y Datadog informa el progreso a medida que se instrumentan los recursos.

<!-- TODO(DOCS-14545): add resource-selection / Manage Agents page screenshot (AWS Install Agents page) — setup-toggle screenshot added. -->

## Verifique la instrumentación {#verify-instrumentation}

Una vez completada la instrumentación:

- **EC2**: Los Agents recién instalados aparecen en la [Lista de infraestructura][3] y en el mapa de servidores. Fleet Automation enumera los mismos Agents en la Fleet View.
- **Lambda**: Las funciones instrumentadas aparecen en la página [Serverless][11] y sus trazas aparecen en [APM][12]. Si una función está instrumentada pero su telemetría no llega, consulte [Solución de problemas de monitoreo de AWS Lambda][15].

<!-- TODO(DOCS-14545): add expected time-to-data once confirmed. -->

## Administre los recursos instrumentados {#manage-instrumented-resources}

Utilice la [página de instalación de Agents de AWS][8] en Fleet Automation para administrar los recursos que ha instrumentado a través de la integración de AWS.

Desde esta página, usted puede:

- Vea los recursos instrumentados y su estado.
- Instrumente nuevos recursos en su entorno de AWS.
- Elimine la instrumentación de los recursos que ya no desea hacer un seguimiento.

La regla es la fuente de la verdad. Para detener la cobertura, actualice la regla. Si usted mismo elimina la instrumentación de un recurso cubierto, Datadog la restaura. Para EC2, administre la configuración del Agent y las actualizaciones de versión a través de [Fleet Automation][4]. Para Lambda, Datadog actualiza las versiones de las capas automáticamente.

## Eliminar la instrumentación de Datadog {#remove-datadog-instrumentation}

Para eliminar la instrumentación, elimine los recursos de una regla, edite la consulta de la regla o elimine la regla. Eliminar una regla quita la instrumentación de todo lo que la regla cubría.

- **EC2**: Datadog elimina el Datadog Agent y cualquier rol de IAM o perfil de instancia que haya creado para cada instancia.
- **Lambda**: Datadog elimina las capas que agregó y restaura las variables de entorno y el handler que la función tenía anteriormente. Las capas y variables de entorno que usted mismo agregó se mantienen en su lugar.

## Solución de problemas {#troubleshooting}

### El Agent de SSM no está presente en una instancia EC2 {#the-ssm-agent-is-not-present-on-an-ec2-instance}

La instalación del Agent en EC2 depende del AWS Systems Manager (SSM) Agent, el cual Datadog no puede instalar por usted. Datadog marca como no elegible cualquier instancia que carezca del Agent, incluidas aquellas creadas a partir de AMIs personalizadas. Instale el SSM Agent en la instancia y vuelva a intentarlo. Consulte [Working with SSM Agent][2] en la documentación de AWS.

### Se produjo un error de permiso o de IAM {#a-permission-or-iam-error-occurs}

Si la instrumentación no puede completarse debido a la falta de permisos, Datadog muestra una notificación con un enlace al recurso de CloudFormation que necesita el nuevo permiso. Actualice su stack existente para otorgar los [permisos necesarios](#required-aws-permissions). No necesita crear un nuevo stack.

### Se omite una función Lambda por estar ya instrumentada {#a-lambda-function-is-skipped-as-already-instrumented}

Datadog omite cualquier función que contenga capas de Datadog, un controlador de Datadog o variables de entorno de Datadog que Datadog no aplicó. Omitir estas funciones evita conflictos de capas y configuración. Para administrar la función desde la integración de AWS en su lugar, elimine su instrumentación de Datadog existente de ella. Datadog entonces instrumenta la función automáticamente.

Las funciones administradas por [instrumentación remota][9] también se omiten, y Datadog le indica cuál de las dos opciones aplica. Una función solo puede ser administrada por un único producto de instrumentación de Datadog.

### Una función Lambda excede el límite de capas {#a-lambda-function-exceeds-the-layer-limit}

AWS limita una función a cinco capas, y Datadog agrega dos capas, o una para entornos de ejecución solo de SO. Cuando una función ya tiene suficientes capas como para que la instrumentación exceda el límite, Datadog lo informa y se detiene en lugar de reintentar. Elimine una capa de la función para liberar espacio. Datadog entonces instrumenta la función automáticamente.

### Una función Lambda utiliza un envoltorio de ejecución que no es de Datadog {#a-lambda-function-uses-a-non-datadog-execution-wrapper}

Conjuntos de instrumentación de Java y .NET `AWS_LAMBDA_EXEC_WRAPPER`. Cuando una función ya establece esa variable en algo distinto al envoltorio de Datadog, Datadog omite la función en lugar de sobrescribir su envoltorio. Para instrumentar la función a través de la integración de AWS, elimine el envoltorio personalizado de la función. Si la función necesita su propio envoltorio, instruméntela usted mismo; consulte [Instrumenting AWS Lambda][18].

### Una función Lambda aparece como no elegible {#a-lambda-function-appears-as-ineligible}

Datadog marca una función como no elegible cuando no cumple con los [requisitos previos de Lambda](#aws-lambda-functions). Las razones más comunes son un tipo de paquete de imagen de contenedor, un tiempo de ejecución o arquitectura no compatible, una función fuera de la partición comercial `aws` y las funciones de Lambda@Edge. Réplicas de Lambda@Edge y las funciones que replican están ambas excluidas.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent.html
[3]: https://app.datadoghq.com/infrastructure
[4]: https://docs.datadoghq.com/es/agent/fleet_automation/
[5]: https://docs.datadoghq.com/es/getting_started/integrations/aws/
[6]: https://docs.datadoghq.com/es/integrations/guide/aws-agent-installation-technical-reference/
[7]: https://app.datadoghq.com/integrations/amazon-web-services
[8]: https://app.datadoghq.com/fleet/install-agent/latest?platform=aws
[9]: https://docs.datadoghq.com/es/serverless/aws_lambda/remote_instrumentation/
[10]: https://docs.datadoghq.com/es/integrations/amazon_web_services/#resource-collection
[11]: https://app.datadoghq.com/functions
[12]: https://app.datadoghq.com/apm/traces
[13]: https://docs.datadoghq.com/es/serverless/aws_lambda/
[14]: https://docs.datadoghq.com/es/serverless/aws_lambda/configuration/
[15]: https://docs.datadoghq.com/es/serverless/aws_lambda/troubleshooting/
[16]: https://docs.datadoghq.com/es/account_management/workload_identity_federation/
[17]: https://docs.datadoghq.com/es/integrations/guide/aws-agent-installation-technical-reference/#what-datadog-changes-on-a-function
[18]: https://docs.datadoghq.com/es/serverless/aws_lambda/instrumentation/