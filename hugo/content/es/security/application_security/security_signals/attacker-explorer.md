---
aliases:
- /es/security/application_security/threats/attacker-explorer
disable_toc: false
further_reading:
- link: /security/application_security/policies
  tag: Documentación
  text: Protección
title: Attackers Explorer
---

Este tema describe cómo utilizar **Attackers Explorer** para investigar y bloquear a los atacantes marcados.

## Información general

Datadog App and API Protection (AAP) identifica a los atacantes como sospechosos y los marca. Con [Attackers Explorer][1], puedes investigar y tomar acción contra los atacantes. 


### Definiciones

- **Atacantes sospechosos:** direcciones IP que han enviado tráfico de ataque en las últimas 24 horas hasta un umbral máximo.

- **Atacantes marcados:** direcciones IP que han enviado tráfico de ataque, superando el umbral de Atacantes sospechosos, en las últimas 24 horas. Los atacantes marcados deben ser revisados y bloqueados.

<div class="alert alert-info"><strong>Atacantes marcados</strong> y <strong>Atacantes sospechosos</strong> son mutuamente excluyentes. Una IP no puede estar en ambos estados al mismo tiempo.</a></div>

### En qué se diferencia Attackers Explorer de Signal Explorer and Trace Explorer

Para comprender la diferencia entre los distintos exploradores, repasa estos enfoques:

- **Protección:** bloqueo automatizado mediante la configuración de AAP Protection. Los clientes deben bloquear las herramientas de ataque como su primera acción de bloqueo automatizada. El bloqueo de herramientas de ataque reduce la detección de vulnerabilidades comunes para amenazas OWASP como SQLi, inyección de comandos y SSRF.
- **Reactivación:** bloqueo mediante señales o Attackers Explorer en respuesta a amenazas observadas.

<!-- {{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_nav.png" alt="Captura de pantalla de la navegación de AAP Attackers Explorer"  >}} -->

Cada explorador se centra en un caso de uso específico:

- **Explorador de señales**: lista de alertas procesables como Ataque de relleno de credenciales o Inyección de comandos. Las señales tienen capacidades de flujo de trabajo, una descripción, gravedad y correlación de trazas (traces). Las interacciones incluyen flujos de trabajo de asignación de usuarios, protección automatizada, análisis, búsqueda y paso al Trace Explorer.
- **Trace Explorer**: lista de pruebas de eventos de lógica de negocio, como inicios de sesión, o cargas útiles de ataques. Las interacciones incluyen análisis y búsqueda.
- **Users Explorer**: enumera los usuarios autenticados asociados a una o más trazas. Las interacciones incluyen: 
  - Acciones masivas de análisis y bloqueo de usuarios
  - Detalle del historial de cualquier usuario
  - Búsqueda
  - Dirección hacia otros exploradores
- **Attackers Explorer**: lista de atacantes marcados y sospechosos. Las interacciones incluyen: 
  - Acciones masivas de análisis y bloqueo de atacantes
  - Análisis del historial de cualquier atacante
  - Búsqueda
  - Paso a otros exploradores  


### Exploración y filtro de atacantes

Para empezar a revisar los atacantes, ve a [Attackers Explorer][1].

<!-- {{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_default_view2.png" alt="AAP Attackers Explorer"  >}} -->

Hay dos secciones en Attackers Explorer:

1. Facetas y búsqueda. Estos te permiten filtrar el tráfico por servicio o atributos de atacante. 
2. La lista de los atacantes con métricas de seguridad.


### Investigar a un atacante

1. En **View by** (Ver por), haz clic en **IP**, **User Agent** (Agent de usuario), **ASN**, o **Cluster** (Clúster).
2. Haz clic en cualquier fila para ver el panel de detalles del atacante.

<!-- {{< img src="security/application_security/threats/attacker-explorer/ip_drawer.png" alt="Investigar y dirección IP con AAP Attackers Explorer"  >}} -->

Un atacante puede ser bloqueado o añadido a la lista de permitios desde sus detalles.

### Detalles del atacante

Detalles comunes a todas las vistas de los atacantes:

- **Estado de bloqueo:** indica si la IP atacante está siendo bloqueada activamente, ayudándote a confirmar si es necesario una acción inmediata.
- **Inteligencia sobre amenazas:** muestra definiciones definiciones de Datadog **Sospechoso** o **Bloqueado**.
- **Última información:** proporciona el origen contextual de la red (por ejemplo, ruta, estado público/privado, geolocalización), lo que te ayuda a comprender la infraestructura y el alcance del atacante.
- **Usuarios asociados:** muestra qué cuentas de usuario (si las hay) se vieron afectadas o vinculadas a la IP, ayudando al seguimiento de movimientos laterales y a la identificación de posibles cuentas comprometidas.
- **Trazas de seguridad:** visualiza la cronología y el volumen de actividad sospechosa (por ejemplo, **151k trazas de AAP**), ayudando a los equipos de SOC a correlacionar eventos e identificar picos en el comportamiento de los ataques.

Ver detalles específicos:

- IP:
  - **Inteligencia sobre amenazas:** consulta [Inteligencia sobre amenazas][4].
  - **Historial:** muestra la actividad pasada para detectar patrones o ataques repetidos.
  - **Usuarios asociados:** identifica las cuentas de usuario asociadas a la IP.
  - **Solicitudes de endpoint:** enumera las solicitudes HTTP para revelar métodos u objetivos de ataque.
  - **Señales:** muestra las detecciones activadas para evaluar la gravedad de la amenaza.
  - **Clústeres:** señala los clústeres de aplicaciones afectados para medir el alcance del impacto.
  - **Agents de usuario principal:** enumera los agents de usuario más frecuentemente utilizados por el atacante (por ejemplo, scripts, escáneres o navegadores), ayudando a identificar herramientas de automatización o clientes personalizados implicados en el ataque.
- Agent de usuario:
  - **IPs asociadas**: muestra las IPs que utilizan el mismo Agent de usuario, con recuentos de traza y barras de actividad reciente por IP.
  - **Usuarios asociados**: enumera las cuentas de usuario vinculadas a este Agent de usuario, ayudando a detectar un posible compromiso en la cuenta.
  - **Historial de bloqueos**: muestra los bloqueos anteriores en el Agent de usuario, útil para detectar infracciones repetidas.
  - **Solicitudes de endpoints**: detalla qué endpoints fueron atacados y con qué frecuencia.
  - **Señales**: muestra las alertas activadas desde este Agent de usuario, marcando infracciones de reglas o comportamientos sospechosos.
- ASN:
  - **AS:** identifica el Sistema Autónomo, ayudando a rastrear el tráfico malicioso de vuelta a su propietario de red o proveedor de alojamiento.
  - **Señales:** muestra el volumen y la gravedad de las alertas de seguridad (por ejemplo, CRÍTICA, ALTA), indicando lo activo o amenazante que es el tráfico de la ASN.
  - **Servicios:** enumera los servicios y entornos afectados, que te ayudan a entender qué partes de la infraestructura están siendo atacadas.
  - **Última actividad:** indica la última vez que se observó actividad maliciosa desde esta ASN, lo que ayuda a priorizar la investigación de las amenazas actuales.
  - **Distribución del tráfico:** visualiza la proporción de tráfico normal frente al sospechoso, lo que ayuda a los analistas a evaluar si una ASN se utiliza principalmente para ataques o para un uso mixto.
- Clúster:
  - **Resumen de similitudes:** muestra los atributos compartidos entre IP, agents de usuario, ubicaciones y dominios.
    - **IPs por ASN:** identifica los sistemas autónomos utilizados por los atacantes.
    - **IPs por Agent de usuario:** detecta la automatización, la suplantación de identidad o la reutilización en las campañas.
    - **IPs por Localización:** identifica la distribución geográfica de las IPs atacantes.
    - **IPs por dominio:** rastrea la infraestructura del atacante y detecta dominios sospechosos.
  - **Categoría de la amenaza:** clasifica el tipo de amenaza.
  - **Intención de la amenaza:** indica el propósito probable de la actividad maliciosa.
  - **Usuarios por IP:** mide la amplitud del compromiso o la suplantación de identidad.
  - **Servicios:** identifica los servicios y entornos afectados.
  - **Actividad del clúster:** muestra las tendencias de comportamiento y permite la inspección de la traza.


### Buenas prácticas para bloquear con Attackers Explorer

1. Ataques de toma de control de cuentas: utiliza duraciones cortas para bloquear direcciones IP.
2. Añade escáneres autorizados a las listas de aprobados monitorizadas para observar la actividad, pero evitar el bloqueo.
3. Bloquea los ISP móviles con precaución. Estas redes podrían tener un gran número de usuarios y dispositivos móviles detrás de direcciones IP únicas.

## Bloquear IPs individuales

Para bloquear una IP individual temporal o permanentemente, haz lo siguiente:

{{< img src="security/application_security/threats/attacker-explorer/block_ip_address.png" alt="Bloquear una dirección IP con AAP Attackers Explorer"  >}}

1. Haz clic en `Block` en la fila.
2. Elige una duración de bloqueo.

## Bloquear IPs en bloque

Puedes seleccionar múltiples IPs y bloquearlas temporal o permanentemente usando la opción **Compare and Block** (Comparar y bloquear) de Attackers Explorer. 

**Comparar y bloquear** proporciona métricas sobre las IPs para ayudarte a bloquear con seguridad y confianza. Por ejemplo, **Resumen de similitudes** y **Actividad**, descritos más adelante en este tema.

Para comparar y bloquear IPs en bloque, haz lo siguiente:
1. Filtra la lista de Atacantes con una búsqueda o facetas.
2. Selecciona varias IPs.
3. Selecciona la opción **Compare and Block** (Comparar y bloquear).

    En el siguiente ejemplo, las IPs seleccionadas son de la misma localización y parecen estar relacionadas. La opción **Compare and Block** (Comparar y bloquear) abre la vista **Block selected attackers** (Bloquear atacantes seleccionados), que muestra métricas y los atributos de las direcciones IPs seleccionadas.

    {{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_review_groups2.png" alt="Captura de pantalla del bloqueo de grupo en AAP Attackers Explorer"  >}}

4. Para bloquear a los atacantes, haz clic en **Block** (Bloquear).

## Métricas de Bloquear atacantes seleccionados

Al seleccionar la opción **Compare and Block** (Comparar y bloquear), se abre la vista **Block selected attackers** (Bloquear atacantes seleccionados), que muestra métricas y los atributos de las direcciones IPs seleccionadas.

{{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_review_groups2.png" alt="Captura de pantalla del bloqueo de grupo en AAP Attackers Explorer"  >}}

<div class="alert alert-info">Las métricas para <strong>Resumen de similitudes</strong> y <strong>Actividad</strong> se limitan a los últimos 30 días.</a></div>

Las métricas de la vista **Block selected attackers** (Bloquear atacantes seleccionados) se explica en las siguientes secciones.

### IPs seleccionadas

Contiene las IPs seleccionadas desde el explorador. Al anular la selección de una IP, se elimina de las secciones de métricas y de la acción **Bloquear**.

### Información general de similitudes

Cada columna existe para ayudar a bloquear con confianza y seguridad. Los atributos proporcionados también son utilizados por la función Attacker Similarity de AAP.

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

El tráfico de ataque son todas las trazas de AAP, incluida la lógica empresarial.

### Bloque

Esto añade las direcciones IP a la [Denylist][2] (Lista de denegados) durante el tiempo especificado.


[1]: https://app.datadoghq.com/security/appsec/attackers
[2]: https://app.datadoghq.com/security/appsec/denylist
[3]: https://app.datadoghq.com/security/appsec/passlist
[4]: /es/security/threat_intelligence