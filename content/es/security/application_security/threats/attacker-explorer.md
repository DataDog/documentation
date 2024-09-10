---
disable_toc: false
further_reading:
- link: /security/application_security/threats/protection
  tag: Documentación
  text: Protección
title: Attacker Explorer
---

En este tema, se describe cómo utilizar **Attacker Explorer** para investigar y bloquear a los atacantes marcados.

## Información general

Datadog Application Security Management (ASM) identifica a los atacantes como sospechosos y los marca. Con [Attacker Explorer][1], puedes investigar y tomar medidas contra los atacantes. 


### Definiciones

- **Atacantes sospechosos:** direcciones IP que han enviado tráfico de ataque en las últimas 24 horas hasta un umbral máximo.

- **Atacantes marcados:** direcciones IP que han enviado tráfico de ataque, superando el umbral de Atacantes sospechosos, en las últimas 24 horas. Los atacantes marcados deben ser revisados y bloqueados.

<div class="alert alert-info"><strong>Atacantes marcados</strong> y <strong>Atacantes sospechosos</strong> son mutuamente excluyentes. Una IP no puede estar en ambos estados al mismo tiempo.</a></div>

### En qué se diferencia el Attacker Explorer de los exploradores de señales y trazas

Para comprender la diferencia entre los distintos exploradores, repasa estos enfoques:

- **Protección:** bloqueo automatizado mediante la configuración de protección de ASM. La primera acción de bloqueo automatizado de los clientes debería ser bloquear las herramientas de ataque. El bloqueo de herramientas de ataque reduce el descubrimiento de vulnerabilidades comunes para amenazas OWASP como SQLi, inyección de comandos y SSRF.
- **Reactivación:** bloqueo mediante señales o Attackers Explorer en respuesta a amenazas observadas.

{{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_nav.png" alt="Captura de pantalla de la navegación en ASM Attacker Explorer"  >}}

Cada explorador se centra en un caso de uso específico:

- **Explorador de señales**: lista de alertas procesables como Ataque de relleno de credenciales o Inyección de comandos. Las señales tienen capacidades de flujo de trabajo, una descripción, gravedad y correlación de trazas (traces). Las interacciones incluyen flujos de trabajo de asignación de usuarios, protección automatizada, análisis, búsqueda y paso al Trace Explorer.
- **Trace Explorer**: lista de pruebas de eventos de lógica de negocio, como inicios de sesión, o cargas útiles de ataques. Las interacciones incluyen análisis y búsqueda.
- **Attacker Explorer**: lista de atacantes marcados y sospechosos. Las interacciones incluyen: 
  - Acciones masivas de análisis y bloqueo de atacantes
  - Análisis del historial de cualquier atacante
  - Búsqueda
  - Paso a otros exploradores  


### Exploración y filtro de atacantes

Para empezar a revisar atacantes, ve a [Attacker Explorer][1].

{{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_default_view2.png" alt="ASM Attacker Explorer"  >}}

Hay dos secciones en el Attacker Explorer:

1. Facetas y búsqueda. Estos te permiten filtrar el tráfico por servicio o atributos de atacante. 
2. La lista de los atacantes con métricas de seguridad.


### Investigar una IP

Haz clic en cualquier fila para ver el historial y los atributos de la IP.

{{< img src="security/application_security/threats/attacker-explorer/ip_drawer.png" alt="Investigar una dirección IP con ASM Attacker Explorer"  >}}

Las IP pueden bloquearse o añadirse a la Passlist (Lista de aprobados) desde la casilla de IP.

### Prácticas recomendadas para el bloqueo con Attacker Explorer

1. Ataques de toma de control de cuentas: utiliza duraciones cortas para bloquear direcciones IP.
2. Añade escáneres autorizados a las listas de aprobados monitorizadas para observar la actividad, pero evitar el bloqueo.
3. Bloquea los ISP móviles con precaución. Estas redes podrían tener un gran número de usuarios y dispositivos móviles detrás de direcciones IP únicas.

## Bloquear IPs individuales

Para bloquear una IP individual temporal o permanentemente, haz lo siguiente:

{{< img src="security/application_security/threats/attacker-explorer/block_ip_address.png" alt="Bloquear una dirección IP con ASM Attacker Explorer"  >}}

1. Haz clic en `Block` en la fila.
2. Elige una duración de bloqueo.

## Bloquear IPs en bloque

Puedes seleccionar múltiples IPs y bloquearlas temporal o permanentemente usando la opción **Compare and Block** (Comparar y bloquear) del Attacker Explorer.

**Comparar y bloquear** proporciona métricas sobre las IPs para ayudarte a bloquear con seguridad y confianza. Por ejemplo, **Resumen de similitudes** y **Actividad**, descritos más adelante en este tema.

Para comparar y bloquear IPs en bloque, haz lo siguiente:
1. Filtra la lista de Atacantes con una búsqueda o facetas.
2. Selecciona varias IPs.
3. Selecciona la opción **Compare and Block** (Comparar y bloquear).

    En el siguiente ejemplo, las IPs seleccionadas son de la misma localización y parecen estar relacionadas. La opción **Compare and Block** (Comparar y bloquear) abre la vista **Block selected attackers** (Bloquear atacantes seleccionados), que muestra métricas y los atributos de las direcciones IPs seleccionadas.

    {{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_review_groups2.png" alt="Captura de pantalla del bloqueo de grupo del ASM Attacker Explorer"  >}}

4. Para bloquear a los atacantes, haz clic en **Block** (Bloquear).

## Métricas de Bloquear atacantes seleccionados

Al seleccionar la opción **Compare and Block** (Comparar y bloquear), se abre la vista **Block selected attackers** (Bloquear atacantes seleccionados), que muestra métricas y los atributos de las direcciones IPs seleccionadas.

 {{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_review_groups2.png" alt="Captura de pantalla del bloqueo de grupo del ASM Attacker Explorer"  >}}

<div class="alert alert-info">Las métricas para <strong>Resumen de similitudes</strong> y <strong>Actividad</strong> se limitan a los últimos 30 días.</a></div>

Las métricas de la vista **Block selected attackers** (Bloquear atacantes seleccionados) se explica en las siguientes secciones.

### IPs seleccionadas

Contiene las IPs seleccionadas desde el explorador. Al anular la selección de una IP, se elimina de las secciones de métricas y de la acción **Bloquear**.

### Información general de similitudes

Cada columna existe para ayudarte a bloquear con confianza y seguridad. Los atributos proporcionados también son utilizados por la función de Similitud de atacantes de ASM.

ASNs
: números de sistema autónomo. Los ataques con un gran número de direcciones IP podrían originarse en el mismo ASN, en especial cuando los ataques se originan en centros de datos e IPs de nube.

Agentes de usuario
: los atacantes, los escáneres comerciales y tu propio software pueden utilizar agentes de usuario predecibles que pueden ayudar a calificar lo que debe incluirse o excluirse del bloqueo.

Localización
: las empresas pueden tener políticas o mercados de servicio que determinan de qué países permiten el tráfico.

Dominio
: el propietario del ASN. Esto resulta útil cuando una organización posee varios ASNs.

Usuarios por IP
: el número de usuarios que se han autenticado desde la IP. Las IPs con un gran número de inicios de sesión podrían indicar un equilibrador de carga o muchos usuarios de la misma localización, como el sitio de una empresa.

### Actividad

El contexto de tiempo para la actividad es de 30 días.

#### Señales

Las señales asociadas a las direcciones IP durante el tiempo seleccionado.

#### Trazas

Las trazas asociadas a las direcciones IP durante el tiempo seleccionado. 

El tráfico benigno es tráfico de APM muestreado que son trazas sin lógica de negocio o detecciones de tráfico de ataque.

El tráfico de ataque son todas las trazas de ASM, incluida la lógica de negocio.

### Bloque

Esto añade las direcciones IP a la [Denylist][2] (Lista de denegados) durante el tiempo especificado.


[1]: https://app.datadoghq.com/security/appsec/attackers
[2]: https://app.datadoghq.com/security/appsec/denylist
[3]: https://app.datadoghq.com/security/appsec/passlist