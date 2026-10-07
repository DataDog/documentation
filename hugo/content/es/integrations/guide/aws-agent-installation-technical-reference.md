---
description: 'Comprenda cómo Datadog instala y mantiene el Datadog Agent en Amazon
  EC2 a través de la integración con AWS: los recursos de AWS creados, el mecanismo
  de instalación, el modelo de seguridad y el ciclo de vida del Datadog Agent.'
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/aws-agent-installation/
  tag: Documentación
  text: Instale el Datadog Agent a través de la integración de AWS
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: Documentación
  text: Integración de AWS
- link: https://docs.datadoghq.com/agent/fleet_automation/
  tag: Documentación
  text: Fleet Automation
private: true
title: Cómo funciona la instalación del Datadog Agent a través de la integración con
  AWS
---
Esta página explica cómo Datadog instala y mantiene el Datadog Agent en Amazon EC2 a través de la integración con AWS. Para obtener instrucciones de configuración y los permisos que requiere Datadog, consulte [Instalar el Datadog Agent a través de la integración con AWS][1].

<div class="alert alert-info">Esta página cubre únicamente la experiencia en Amazon EC2.</div>

## Recursos de AWS que crea Datadog {#aws-resources-that-datadog-creates}

La plantilla de CloudFormation que usted inicia crea los siguientes recursos una sola vez, en una única pila:

| Recurso | Nombre | Propósito |
|---|---|---|
| Conexión de EventBridge | `datadog-agent-resource-update-intake-connection` | Almacena sus claves de aplicación y Datadog API para que los eventos puedan enviarse a Datadog |
| Destino de API de EventBridge | `datadog-agent-resource-update-intake-destination` | Envía eventos a `https://api.<YOUR_DD_SITE>/api/unstable/instrumenter/events` (limitado a 10 eventos por segundo) |
| Regla de EventBridge | `datadog-agent-resource-update-rule-ec2` | Notifica a Datadog cuando una instancia cubierta cambia |
| Rol de IAM | con nombre automático | Permite que EventBridge envíe eventos al destino de API `datadog-agent-resource-update-intake-destination` |
| Rol de IAM | `datadog-eventbridge-cross-region-role` | Permite que otras regiones reenvíen eventos a su región principal |

Datadog crea los siguientes recursos según sea necesario, en el momento de la instalación:

| Recurso | Nombre | Propósito |
|---|---|---|
| Documento de Systems Manager | `datadog-ec2-instrumenter` | El script de instalación y desinstalación. Un documento por cuenta. |
| Secreto de Secrets Manager | `/datadog/ec2-instrumenter/<ACCOUNT_ID>/<INSTANCE_ID>` | Almacena la clave de Datadog API para que la instancia pueda obtenerla por sí misma. Cifrado con la clave predeterminada administrada por AWS. |
| Rol de IAM y perfil de instancia | `datadog-ssm-<INSTANCE_ID>` y `datadog-ssm-profile-<INSTANCE_ID>` | Creados solo cuando la instancia no tiene un perfil de instancia, bajo la ruta de IAM `/datadog-ec2-instrumenter/` para que sean identificables. Recibe la `AmazonSSMManagedInstanceCore` política administrada por AWS para que Systems Manager pueda acceder a la instancia. |
| Política de IAM en línea | `datadog-ec2-instrumenter-secrets` | Agregada al rol de la instancia. Otorga acceso de solo lectura a los secretos bajo `/datadog/ec2-instrumenter/`. |
| Reglas de EventBridge en sus otras regiones | Mismos nombres que los recursos de la región principal | Reenvían eventos de cambio a su región principal. |

Datadog no crea buckets de S3, buses de eventos, grupos de registros o parámetros de SSM, y no etiqueta sus instancias.

## Cómo funciona la instalación del Datadog Agent {#how-agent-installation-works}

Después de guardar una regla de instalación, Datadog encuentra las instancias que coinciden con ella y sigue buscando nuevas coincidencias con el tiempo. Datadog ejecuta la siguiente secuencia en cada instancia cubierta. Para conocer los requisitos previos, incluidas las plataformas compatibles, consulte [Prerequisites][2] en la guía de configuración.

1. Datadog verifica que cada instancia cubierta esté en ejecución, en una plataforma compatible y que sea accesible mediante AWS Systems Manager.
2. Cuando una instancia no tiene un perfil de instancia de IAM, Datadog crea uno para que Systems Manager pueda acceder a ella. Cuando una instancia ya tiene uno, Datadog agrega la política de SSM y la política de lectura de secretos con alcance al rol existente.
3. Datadog verifica si ya hay un Datadog Agent presente. Cuando hay un Datadog Agent presente que Datadog no instaló, Datadog se detiene y deja la instancia intacta.
4. Datadog llama a `ssm:SendCommand`, una instancia a la vez, ejecutando el documento `datadog-ec2-instrumenter`.
5. En la instancia, el documento obtiene la clave de API de Secrets Manager utilizando el propio rol de IAM de la instancia. Luego, ejecuta el instalador estándar del Datadog Agent (`install_script_agent7.sh` en Linux, o el MSI estándar en Windows) con la recopilación de registros y la instrumentación de servidor de APM habilitadas. El comando agota el tiempo de espera después de 6 minutos.

Datadog no reinicia sus instancias. El único servicio que Datadog toca es el propio Datadog Agent, el cual se inicia al instalarse y se detiene al desinstalarse. Sus aplicaciones y otros servicios no se ven afectados.

### Instancias que Datadog excluye {#instances-that-datadog-excludes}

Datadog excluye automáticamente:

- Instancias que no se están ejecutando
- Nodos de trabajo de EKS
- Instancias de contenedor de ECS
- Instancias que ya tienen un Datadog Agent instalado que no fue instalado por Datadog

## Security, auditoría y control de cambios {#security-auditing-and-change-control}

### Cómo obtiene acceso Datadog {#how-datadog-gets-access}

Datadog utiliza el mismo rol IAM entre cuentas que la integración de AWS, autenticado con un ID externo. Datadog recibe credenciales temporales de corta duración, y cada tipo de trabajo (leer EC2, administrar IAM, enviar comandos) utiliza una sesión de credenciales con alcance específico en lugar de una sesión amplia. Datadog no almacena ninguna clave de AWS de larga duración.

### Auditoría de las acciones de Datadog {#auditing-datadogs-actions}

Cada acción que realiza Datadog es una llamada estándar a la API de AWS, por lo que todas las acciones aparecen en AWS CloudTrail. Todo lo que crea Datadog es identificable por nombre: los recursos tienen el prefijo `datadog-`, los secretos se almacenan bajo `/datadog/ec2-instrumenter/` y los roles IAM utilizan la ruta inmutable `/datadog-ec2-instrumenter/`. Debido a que una ruta IAM no se puede editar después de su creación, la ruta no puede cambiarse silenciosamente. Los resultados de los comandos en la instancia aparecen en el historial de Systems Manager Run Command.

### Cómo se maneja la clave de API {#how-the-api-key-is-handled}

La clave de API se almacena en su propio Secrets Manager, cifrada en reposo. Solo se pasa el Amazon Resource Name (ARN) del secreto en el comando SSM; la clave en sí nunca aparece en los parámetros del comando ni en CloudTrail. La instancia lee el secreto con su propio rol de IAM, restringido a una sola ruta. Datadog almacena internamente solo una referencia a la clave, no la clave en sí.

### Quién puede cambiar las instalaciones {#who-can-change-installations}

- **En AWS**: El acceso se rige por sus propias políticas de IAM. Eliminar los permisos entre cuentas detiene a Datadog inmediatamente.
- **En Datadog**: Ver las reglas de instalación requiere el permiso **Hosts Read**. Crear, editar o eliminar reglas requiere el permiso **Agent Install**. Los cambios en las reglas están sujetos a un límite de tasa.

### Barreras de protección {#guardrails}

- Datadog nunca elimina un Datadog Agent que no instaló.
- Datadog rastrea en qué instancias instaló un Datadog Agent, por lo que solo limpia su propio trabajo.
- Cuando algunas regiones no pueden ser listadas, Datadog omite la limpieza para esa pasada en lugar de arriesgarse a desinstalar de forma masiva.

## Ciclo de vida y cobertura del Datadog Agent {#agent-life-cycle-and-coverage}

### La cobertura de las reglas se evalúa con el tiempo {#rule-coverage-is-evaluated-over-time}

Una regla cubre las instancias que coinciden con ella, y Datadog busca nuevas coincidencias con el tiempo. Si una instancia comienza a coincidir más tarde porque fue lanzada después de que guardó la regla o porque sus etiquetas cambiaron, Datadog la instrumenta automáticamente. Datadog no instrumenta instancias que no coinciden con la regla.

Para fijar la cobertura a un conjunto específico de instancias, seleccione esas instancias individualmente. La regla entonces coincide solo con las instancias que seleccionó, por lo que las verificaciones posteriores no agregan nuevas instancias.

Cuando un conjunto fijo es demasiado grande para seleccionarlo individualmente, coincida con una etiqueta que usted controle, como `datadog:true`. Aplique esa etiqueta solo a las instancias que desea instrumentar. La cobertura cambia entonces solo cuando usted cambia las etiquetas.

### Cómo Datadog mantiene sincronizadas las instancias cubiertas {#how-datadog-keeps-covered-instances-in-sync}

Datadog mantiene continuamente el estado que usted define en las instancias cubiertas:

- Datadog verifica sus reglas regularmente e instrumenta las instancias que coinciden.
- Datadog reinstala el Agent si falta, reintenta las instalaciones fallidas y limpia las instancias que ya no existen.
- Las nuevas instancias que coinciden generalmente se instrumentan en una hora, y a menudo en minutos.
- Las instancias que ya tienen el Agent se verifican con menos frecuencia.

### Qué sucede cuando cambia la cobertura {#what-happens-when-coverage-changes}

Cuando la cobertura cambia, Datadog determina qué instancias se agregaron o eliminaron de la cobertura de la regla. La cobertura cambia cuando usted edita la regla o cuando sus instancias cambian. Datadog instala el Agent en las instancias recién cubiertas y lo desinstala de las instancias que ya no están cubiertas. Eliminar una regla desinstala el Agent de todas las instancias que cubría la regla.

<div class="alert alert-warning">
Datadog desinstala el Agent cuando una instancia ya no coincide con la regla, ya sea que el cambio provenga de una edición en Datadog o de volver a etiquetar o reconfigurar la instancia en AWS. Tenga en cuenta este comportamiento cuando escriba una regla basada en etiquetas que otros equipos puedan cambiar.
</div>

### Instancias terminadas o detenidas {#terminated-or-stopped-instances}

Datadog detecta las instancias terminadas y limpia los recursos de IAM que creó para ellas. Datadog deja las instancias detenidas sin cambios hasta que regresan.

### Cuando una instalación falla {#when-an-install-fails}

Datadog vuelve a intentar con un retraso creciente (1 hora, luego 2 horas, hasta una vez por día) y continúa reintentando. Los problemas de permisos faltantes aparecen como un inconveniente en el **mosaico de integración de AWS** y en la página de instalación de Fleet.

<div class="alert alert-warning">
Cuando alguien elimina manualmente el Agent de una instancia cubierta, Datadog lo reinstala. La regla es la fuente de la verdad. Para detener la cobertura, cambie la regla de modo que la instancia ya no coincida con ella.
</div>

## Desinstale el Agent {#uninstall-the-agent}

La desinstalación elimina el Datadog Agent, los directorios `/etc/datadog-agent` y `/opt/datadog-agent` en Linux (o realiza una desinstalación MSI en Windows), y cualquier rol de IAM o perfil de instancia que Datadog haya creado para esa instancia. Para desinstalar, edite la consulta de la regla para que las instancias ya no coincidan, elimine las instancias de una regla o elimine la regla.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/guide/aws-agent-installation/
[2]: https://docs.datadoghq.com/es/integrations/guide/aws-agent-installation/#prerequisites