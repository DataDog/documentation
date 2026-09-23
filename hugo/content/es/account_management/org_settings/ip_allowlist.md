---
description: Controle el acceso a la red de Datadog restringiendo el acceso a la API
  y a la UI a direcciones IP o rangos CIDR específicos para la seguridad empresarial.
title: Lista de permitidos de IP
---
{{< callout url="/help/" header="Comience con la lista de permitidas de IP" >}}
La función de lista de permitidas de IP está disponible para clientes con un plan Pro+ o Enterprise. Para solicitar acceso, comuníquese con el soporte técnico.
{{< /callout >}}

## Descripción general {#overview}

{{< img src="account_management/org_settings/ip_allowlist_list.png" alt="Captura de pantalla que muestra la UI de la lista de permitidas de IP, que contiene cuatro rangos de IP." >}}

La lista de permitidas de IP controla qué redes se pueden utilizar para acceder a sus datos en Datadog. Al limitar las redes permitidas, puede proteger sus recursos contra la filtración de datos y las amenazas internas.

Cuando la lista de permitidas de IP está habilitada, solo las direcciones IP o los rangos CIDR en la lista de permitidas pueden acceder a la API y a la UI de Datadog. 

La lista de permitidas de IP es una configuración para toda la organización. Se aplica de manera uniforme a todo el tráfico enumerado en [Recursos bloqueados y permitidos](#blocked-and-allowed-resources) y no puede limitarse a un token, clave de API, usuario o punto de conexión específico.

### Recursos bloqueados y permitidos {#blocked-and-allowed-resources}

Si la IP de un usuario no está incluida en la lista de permitidas, se le bloquea efectivamente el acceso y el uso de:

- Datadog's web UI
- La [API][1] pública de Datadog, incluidos los puntos de conexión documentados y no publicados
- Las aplicaciones móviles de Datadog (iOS, Android)
- Integraciones y aplicaciones de terceros que acceden a Datadog a través de OAuth
- El [Datadog MCP Server][9], incluidas las conexiones remotas desde agentes de IA y clientes MCP

La función de lista de permitidas de IP no bloquea el acceso a lo siguiente:
- Puntos de conexión de ingesta de datos a los que el Agent envía datos, como métricas, trazas y registros
- El punto de conexión de [validación de clave de API][2], que el Agent utiliza antes de enviar datos
- [Envío de flare del Agent][3]
- [Paneles públicos][4]

Las aplicaciones e integraciones que envían telemetría desde el Agent (métricas, trazas y registros), y aquellas que utilizan una clave de API proporcionada por el usuario, no se ven afectadas por la lista de permitidos de IP. Datadog recomienda utilizar el [Audit Trail][5] para hacer un seguimiento de las direcciones IP de aplicaciones e integraciones de terceros.

Para permitir que los clientes de aplicaciones móviles se conecten a Datadog cuando la función de lista de permitidos de IP está habilitada, Datadog recomienda que los dispositivos móviles se conecten a un rango de red permitido a través de una VPN.

### Funcionalidad {#functionality}

Solo los usuarios con el permiso {{< ui >}}Org Management{{< /ui >}} pueden configurar la lista de permitidos de IP.

Con la API o la UI de la lista de permitidos de IP, usted puede:
- Verifique el estado de la lista de permitidos de IP. El hecho de que la lista de permitidos de IP esté activada o desactivada determina si su organización restringe las solicitudes según la pertenencia a la lista de permitidos de direcciones IP.
- Active y desactive la lista de permitidos de IP.
- Muestre las direcciones IP (como rangos CIDR) que están cubiertas por su lista de permitidos de IP.
- Agregue direcciones IP (IPv4 o IPv6) o rangos CIDR a la lista de permitidos de IP con una nota opcional.
- Edite la nota de una dirección IP que ya se encuentre en la lista de permitidos de IP.
- Elimine una sola entrada de la lista de permitidos de IP.
- Reemplace toda la lista de permitidos de IP con nuevas entradas (solo disponible a través de la API).

### Prevención de bloqueo {#lockout-prevention}

Cuando habilita o modifica la lista de permitidos de IP, el sistema aplica restricciones para asegurarse de que aún pueda acceder a sus datos:
- Al menos una entrada en la lista de permitidos de IP contiene su IP actual
- La lista de permitidos contiene al menos una entrada

## Administración de la lista de permitidos de IP en la UI {#managing-the-ip-allowlist-in-the-ui}

**Nota:** La página de la lista de permitidos de IP solo aparece en la UI si su organización de Datadog tiene la función activada.

Para encontrar la [IU de lista de permitidos de IP][6]:

1. Navegue a {{< ui >}}Organization Settings{{< /ui >}} desde el menú de su cuenta.
1. En {{< ui >}}Security{{< /ui >}}, seleccione {{< ui >}}IP Allowlist{{< /ui >}}.

La tabla enumera los rangos CIDR contenidos en la lista de permitidos de IP.

### Habilitar y deshabilitar la lista de permitidos de IP {#enable-and-disable-the-ip-allowlist}

Un banner en la parte superior de la página muestra el estado habilitado o deshabilitado de la lista de permitidos de IP. También muestra su IP y si esa IP está en la lista de permitidos.

Para alternar el estado de la lista de permitidos de IP, haga clic en el botón {{< ui >}}Enable{{< /ui >}} o {{< ui >}}Disable{{< /ui >}}.

### Agregar direcciones IP o rangos CIDR {#add-ip-addresses-or-cidr-ranges}

{{< img src="account_management/org_settings/add_ip_2.png" alt="Captura de pantalla que muestra un cuadro de diálogo titulado Agregar IP a la lista de permitidos de IP" >}}

1. Haga clic en el botón {{< ui >}}Add IP{{< /ui >}} en la parte superior derecha de la página. 
1. Ingrese una dirección IP o un rango CIDR válido.
1. Opcionalmente, agregue una nota, por ejemplo, para recordar por qué está permitiendo el acceso a ciertas direcciones.
1. Haga clic en {{< ui >}}Confirm{{< /ui >}}.

### Editar direcciones IP o rangos CIDR {#edit-ip-addresses-or-cidr-ranges}

1. En la tabla de la lista de permitidos de IP, pase el cursor sobre la fila que desea editar. 
1. Haga clic en el icono de lápiz ({{< ui >}}Edit{{< /ui >}}). 
1. Cambie el texto descriptivo {{< ui >}}Note{{< /ui >}}.
1. Haga clic en {{< ui >}}Confirm{{< /ui >}}.

### Eliminar direcciones IP o rangos CIDR {#delete-ip-addresses-or-cidr-ranges}

1. En la tabla de la lista de permitidos de IP, pase el cursor sobre la fila que desea eliminar. 
1. Haga clic en el icono de la papelera ({{< ui >}}Delete{{< /ui >}}) y confirme que desea eliminarlo. 

## Administración de la lista de permitidos de IP mediante programación {#managing-the-ip-allowlist-programmatically}

Para administrar la lista de permitidos de IP a través de la API, consulte la [documentación de la API de lista de permitidos de IP][7].

Consulte el recurso [`ip_allowlist`][8] para administrar la lista de permitidos de IP en Terraform.


[1]: /es/api/latest/
[2]: /es/api/latest/authentication/#validate-api-key
[3]: https://docs.datadoghq.com/es/agent/troubleshooting/send_a_flare/
[4]: /es/dashboards/sharing/
[5]: /es/account_management/audit_trail/
[6]: https://app.datadoghq.com/organization-settings/ip-allowlist
[7]: /es/api/latest/ip-allowlist/
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/ip_allowlist
[9]: /es/mcp_server/