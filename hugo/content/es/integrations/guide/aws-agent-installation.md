---
description: Instale y administre el Datadog Agent en sus instancias de Amazon EC2
  directamente desde la integración de AWS, sin conectarse a cada servidor ni ejecutar
  scripts por servidor.
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/aws-agent-installation-technical-reference/
  tag: Documentación
  text: Cómo funciona la instalación del Agent a través de la integración de AWS
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
private: true
title: Instale el Datadog Agent a través de la integración de AWS
---
## Descripción general {#overview}

La [integración de AWS][1] recopila métricas, eventos y registros de Amazon CloudWatch sin instalar nada en sus hosts. La instalación del Datadog Agent agrega telemetría desde el interior de sus cargas de trabajo de AWS que CloudWatch por sí solo no puede proporcionar, incluidas las métricas a nivel de servidor, trazas distribuidas (APM), procesos en vivo y registros detallados.

Puede implementar el Datadog Agent en sus instancias de Amazon EC2 directamente desde Datadog, sin conectarse a cada servidor ni ejecutar scripts por servidor. Habilite la instalación del Agent mientras configura la integración de AWS, o en cualquier momento posterior.

Amazon EKS no es compatible.

## Requisitos previos {#prerequisites}

Antes de comenzar, confirme lo siguiente:

- **Acceso a CloudFormation**: Puede aprobar una pila de CloudFormation en la cuenta de AWS de destino. La instalación implementa una pila en su cuenta, por lo que usted (o un compañero de equipo) necesita permiso para revisarla y crearla. Para conocer los permisos necesarios y por qué se requieren, consulte la sección [Permisos de AWS requeridos](#required-aws-permissions).
- **SSM Agent**: El [AWS Systems Manager (SSM) Agent][2] ya debe estar presente en las instancias de destino. Datadog instala el Agent a través de SSM y no puede instalar el SSM Agent por usted, por lo que las instancias creadas a partir de AMI personalizadas sin el SSM Agent no son elegibles. Datadog marca estas instancias para que pueda abordarlas.
- **Plataformas compatibles**: Linux (x86_64 y arm64) y Windows (x86_64). macOS y Windows en arm64 no son compatibles.

## Permisos de AWS requeridos {#required-aws-permissions}

{{% aws-agent-installation %}}

Datadog utiliza cada uno de estos permisos para una tarea específica:

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
| `events:PutRule`, `events:PutTargets`, `events:RemoveTargets`, `events:DeleteRule` | Configure las notificaciones de cambio que permiten a Datadog reaccionar a los cambios en las instancias |

`iam:CreateRole` y `iam:PassRole` son las concesiones más sensibles. `iam:CreateRole` está restringido a los nombres de rol que coinciden con `datadog-ec2-instrumenter/datadog-ssm-*` en su cuenta, y `iam:PassRole` está restringido adicionalmente al servicio Amazon EC2.

## Cómo funciona {#how-it-works}

La instalación del Agent se basa en una **regla de instalación**: una cuenta de AWS vinculada a una consulta que describe qué instancias de EC2 cubrir. Datadog vuelve a verificar la regla con el tiempo e instala el Agent en cada instancia coincidente en su cuenta de AWS:

1. Usted selecciona las instancias de EC2 a cubrir, o elige incluir todas las instancias elegibles.
1. Datadog identifica las instancias que cubre su selección.
1. Datadog instala el Agent en cada instancia cubierta a través de AWS Systems Manager, agregando automáticamente cualquier configuración de IAM faltante.
1. Datadog vuelve a verificar la regla con el tiempo. Las instancias que coincidan más tarde, ya sea que se inicien o se etiqueten recientemente, se instrumentan automáticamente.

Usted aprueba una pila de CloudFormation, una vez, durante la configuración inicial. Después de eso, las instalaciones se ejecutan automáticamente desde Datadog, sin necesidad de lanzar una nueva plantilla de CloudFormation para cada instalación.

Para obtener los detalles técnicos y de seguridad completos, incluidos los recursos de AWS que crea Datadog, el mecanismo de instalación y cómo Datadog mantiene cubiertas las instancias, consulte [Cómo funciona la instalación del Agent a través de la integración de AWS][6].

{{< img src="integrations/amazon_web_services/aws-agent-installation-how-it-works.png" alt="Diagrama de flujo del proceso de instalación del Agent de AWS, que muestra qué pasos ocurren en Datadog y cuáles se ejecutan dentro de su cuenta de AWS." style="width:70%;" >}}

### Elija cómo su regla coincide con las instancias {#choose-how-your-rule-matches-instances}

Debido a que Datadog vuelve a verificar la regla con el tiempo, la consulta que usted escribe determina cómo se comporta la cobertura a medida que cambia su infraestructura.

**Para cubrir las instancias a medida que aparecen**, haga coincidir las etiquetas y los atributos que ya están presentes en su infraestructura, como `env:prod`. Cualquier instancia que coincida se instrumenta, incluidas las instancias iniciadas o reetiquetadas después de guardar la regla. Use esto cuando desee que se haga un seguimiento automático de las nuevas instancias coincidentes sin actualizar la regla.

**Para cubrir un conjunto fijo**, seleccione las instancias individualmente de la lista de recursos. La regla coincide solo con las instancias que seleccionó, por lo que las instancias que aparecen más tarde no se agregan.

**Cuando un conjunto fijo es demasiado grande para seleccionarlo individualmente**, haga coincidir una etiqueta que usted controle, como `datadog:true`. Aplique esa etiqueta solo a las instancias que desea instrumentar. La cobertura cambia entonces solo cuando usted cambia las etiquetas, por lo que su infraestructura como código determina qué instancias están cubiertas.

<div class="alert alert-warning">
La cobertura funciona en ambas direcciones. Cuando una instancia deja de coincidir con la regla, Datadog desinstala el Agent de ella. Por lo tanto, un cambio de etiqueta realizado en AWS puede eliminar el seguimiento de una instancia sin que nadie edite la regla en Datadog.
</div>

### Mejores prácticas para reglas y etiquetas {#best-practices-for-rules-and-tags}

**Haga coincidir las etiquetas que su equipo posee.** Cuando una regla coincide con una etiqueta que otro equipo controla, ese equipo puede agregar o eliminar la supervisión mediante el reetiquetado, sin abrir Datadog. Mantener la etiqueta y la regla bajo la misma propiedad mantiene esa decisión con las personas que la tomaron.

**Evite etiquetas que cambien durante las operaciones normales.** Las etiquetas que cambian con una promoción de entorno, una implementación o una plantilla de escalado automático pueden mover instancias dentro y fuera de la cobertura. Haga coincidir atributos que permanezcan estables durante la vida útil de la instancia.

**Trate la regla como la configuración completa para la cuenta.** Cada cuenta de AWS tiene una regla por tipo de recurso. Cada edición vuelve a definir el alcance de toda la cobertura para ese tipo de recurso en lugar de añadir a la cobertura existente. Revise las instancias coincidentes antes de guardar.

**Establezca excepciones con exclusiones.** Cuando una regla amplia cubra instancias que desea omitir, exclúyalas de la misma regla en lugar de cambiar a una lista seleccionada individualmente. Las exclusiones mantienen la regla legible y preservan la cobertura automática para todo lo demás.

## Instale el Agent {#install-the-agent}

Puede iniciar la instalación del Agent desde dos puntos de entrada, dependiendo de cuánto control desee sobre qué instancias se instrumentan:

- **Configuración de la integración de AWS (instalar en todas las instancias elegibles)**: Cuando [configure la integración de AWS][5], habilite el interruptor de instalación del Agent en la [AWS Install Agents page][7], que se muestra junto a la recopilación de registros y recursos. El Agent se instala en todas las instancias EC2 elegibles.
- **Fleet Automation (instalar en instancias específicas)**: Abra la [AWS Install Agents page][8] en cualquier momento para seleccionar las instancias EC2 específicas que desee.

<!-- TODO(DOCS-14545): per AWS team, surfacing the Agent install flow in the main AWS setup flow for non-first-time users is still rolling out; confirm it's live before publish. -->

El interruptor de instalación del Agent aparece durante la configuración:

{{< img src="integrations/amazon_web_services/aws-agent-installation-setup-toggle.png" alt="El paso Instalar el Datadog Agent en la configuración de AWS, con el interruptor de instalación habilitado y el interruptor de carga de trabajo de Hosts (EC2) activado." style="width:80%;" >}}

Para instalar desde la página de instalación de Agents de AWS:

1. Inscríbase en todas las instancias elegibles o seleccione instancias EC2 específicas de la lista de recursos.
1. Revise la pila de CloudFormation generada, luego continúe a AWS y créela. Datadog le solicita esto solo una vez.
1. Regrese a Datadog. La instalación procede automáticamente y Datadog informa el progreso a medida que los Agents se conectan.

<!-- TODO(DOCS-14545): add resource-selection / Manage Agents page screenshot (AWS Install Agents page) — setup-toggle screenshot added. -->

## Verifique la instalación {#verify-the-installation}

Después de que se complete la instalación:

- Los Agents recién instalados aparecen en la [Lista de infraestructura][3] y en el mapa de servidores.
- Fleet Automation enumera los mismos Agents en la Fleet View.

<!-- TODO(DOCS-14545): add expected time-to-data once confirmed. -->

## Administrar Agents instalados {#manage-installed-agents}

Utilice la [página de instalación de Agents de AWS][8] en Fleet Automation para administrar los Agents que ha instalado a través de la integración de AWS.

Desde esta página, usted puede:

- Visualizar los Agents instalados y su estado.
- Instalar el Agent en nuevas instancias en su entorno de AWS.
- Desinstalar Agents de instancias que ya no desea hacer un seguimiento.

Para detener la cobertura, actualice la regla de modo que las instancias ya no coincidan con ella. Si elimina manualmente el Agent de una instancia cubierta, Datadog lo reinstala. Administre la configuración del Agent y las actualizaciones de versión a través de [Fleet Automation][4].

## Solución de problemas {#troubleshooting}

### El Agent de SSM no está presente en una instancia EC2 {#the-ssm-agent-is-not-present-on-an-ec2-instance}

La instalación del Agent en EC2 depende del AWS Systems Manager (SSM) Agent, el cual Datadog no puede instalar por usted. Datadog marca como no elegible cualquier instancia que carezca del Agent, incluidas aquellas creadas a partir de AMIs personalizadas. Instale el SSM Agent en la instancia y vuelva a intentarlo. Consulte [Working with SSM Agent][2] en la documentación de AWS.

### Se produjo un error de permiso o de IAM {#a-permission-or-iam-error-occurs}

Si la instalación no puede completarse debido a la falta de permisos, Datadog muestra una notificación con un enlace al recurso de CloudFormation que necesita el nuevo permiso. Actualice su stack existente para otorgar los [permisos necesarios](#required-aws-permissions). No necesita crear un nuevo stack.

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