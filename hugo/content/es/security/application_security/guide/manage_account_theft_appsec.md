---
disable_toc: false
title: Gestión de la apropiación de cuentas con AAP
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection se encuentra en versión preliminar en el sitio de Datadog Government US1-FED.
</div>
{{< /site-region >}}

Los usuarios son entidades de confianza en sus sistemas con acceso a información confidencial y la capacidad de realizar acciones confidenciales. Los actores maliciosos han identificado a los usuarios como una oportunidad para atacar sitios web y robar datos y recursos valiosos.

Datadog App and API Protection (AAP) proporciona capacidades de detección y protección [integradas][1] para ayudarle a gestionar esta amenaza. 

Esta guía describe cómo utilizar AAP para prepararse y responder a campañas de apropiación de cuentas (ATO). Esta guía se divide en tres fases:

1. [Recopilación de información de inicio de sesión](#phase-1-collecting-login-information):
   - Habilite y verifique la recopilación de actividad de inicio de sesión en Datadog AAP utilizando métodos de instrumentación automáticos o manuales.
   - Utilice opciones de configuración remota si no puede modificar el código de su servicio.
   - Solucione problemas de datos faltantes o incorrectos.
2. [Preparación para campañas de apropiación de cuentas](#phase-2-preparing-for-ato-campaigns):
   - Prepárese para las campañas de ATO detectadas por AAP. 
   - Configure notificaciones para alertas de ataques.
   - Valide la propagación adecuada de datos para una identificación precisa del atacante.
   - Configure el bloqueo automático de IP para una mitigación inmediata.
   - Conozca la importancia del bloqueo temporal debido a las IP dinámicas de los atacantes.
3. [Reacción ante campañas de apropiación de cuentas](#phase-3-reacting-to-ato-campaigns):
   - Aprenda a reaccionar ante las campañas de ATO, incluyendo las estrategias de los atacantes, la clasificación, la respuesta, la investigación, el monitoreo y la limpieza.

## Fase 1: Recopilación de información de inicio de sesión {#phase-1-collecting-login-information}

Para detectar patrones maliciosos, AAP requiere visibilidad de la actividad de inicio de sesión de sus usuarios. Esta fase describe cómo habilitar y validar esta visibilidad. 

### Paso 1.1: Asegúrese de que AAP esté habilitado en su servicio de identidad {#step-11-ensure-aap-is-enabled-on-your-identity-service}

Este paso describe cómo configurar su servicio para usar AAP.

<div class="alert alert-info">Si su servicio ya está usando AAP, puede ir al <a href="#step-1.3:-validating-login-information-is-automatically-collected">Paso 1.3: Validación de si la información de inicio de sesión se recopila automáticamente</a>.</div>

1. Vaya a [{{< ui >}}Catalog{{< /ui >}}][2], haga clic en la lente {{< ui >}}Security{{< /ui >}} y busque el nombre de su servicio de inicio de sesión. 

   {{<img src="security/ato/guide_service_catalog.png" alt="Catálogo con un servicio que gestiona la autenticación" style="width:100%;" >}}

2. Haga clic en el servicio para abrir sus detalles. Si la píldora {{< ui >}}Threat management{{< /ui >}} es verde, AAP está habilitado y puede pasar al [Paso 1.3: Validación de si la información de inicio de sesión se recopila automáticamente](#step-1.3:-validating-login-information-is-automatically-collected).
   
   {{<img src="security/ato/guide_service_catalog_enabled.png" alt="Catálogo con un panel lateral de servicio expandido, que muestra que Threat Management está habilitado" style="width:100%;" >}}

   Si AAP no está habilitado, el panel muestra el botón {{< ui >}}Discover AAP{{< /ui >}}.

   {{<img src="security/ato/guide_service_catalog_disabled.png" alt="Catálogo con un panel lateral de servicio expandido, que muestra que Threat Management no está habilitado y muestra un enlace para obtener más información" style="width:100%;" >}}

   Para configurar AAP, pase al [Paso 1.2: Habilitación de AAP en el servicio de inicio de sesión](#step-12-enabling-aap-on-your-login-service).

### Paso 1.2: Habilitación de AAP en su servicio de inicio de sesión {#step-12-enabling-aap-on-your-login-service}

Para habilitar AAP en su servicio de inicio de sesión, asegúrese de cumplir con los siguientes requisitos:

* De manera similar a Datadog APM, AAP requiere una integración de biblioteca en sus servicios y un Datadog Agent en ejecución.  
* AAP generalmente se beneficia del uso de la biblioteca más nueva posible; sin embargo, las versiones mínimas admitidas están documentadas en [Requisitos de compatibilidad][3].   
* Como mínimo, {{< ui >}}Threat Detection{{< /ui >}} debe estar habilitado. Idealmente, {{< ui >}}Automatic user activity event tracking{{< /ui >}} también debería estar habilitado.

Para habilitar AAP mediante una nueva implementación, utilice la variable de entorno/configuración de biblioteca `APPSEC_ENABLED` o [Remote Configuration][11]. Puede utilizar cualquiera de los dos métodos, pero la Remote Configuration se puede configurar mediante la interfaz de usuario de Datadog.

**Para habilitar AAP mediante Remote Configuration**, y sin tener que reiniciar sus servicios, haga lo siguiente:

1. Vaya a [AAP onboarding][5].  
2. Haga clic en {{< ui >}}Enable App & API Protection{{< /ui >}}.   
3. En {{< ui >}}Activate on your APM services{{< /ui >}}, haga clic en {{< ui >}}Select Services{{< /ui >}}.
4. Seleccione su servicio, luego haga clic en {{< ui >}}Next{{< /ui >}} y continúe con las instrucciones de configuración.

Cuando vea trazas de su servicio en [AAP Traces][6], pase al [Paso 1.3: Validación de que la información de inicio de sesión se recopila automáticamente](#step-1.3:-validating-login-information-is-automatically-collected).

Para obtener instrucciones más detalladas sobre el uso de una nueva implementación, consulte [Habilitación de la detección de amenazas de AAP mediante SDK de Datadog][7].

### Paso 1.3: Validación de que la información de inicio de sesión se recopila automáticamente {#step-13-validating-login-information-is-automatically-collected}

Después de haber habilitado AAP, puede validar que la información de inicio de sesión sea recopilada por Datadog.

**Nota:** Después de habilitar AAP en un servicio, espere unos minutos a que los usuarios inicien sesión en el servicio o inicie sesión usted mismo.

Para validar que la información de inicio de sesión se recopila, haga lo siguiente:

1. Vaya a [Traces][8] en AAP.   
2. Busque trazas etiquetadas con actividad de inicio de sesión desde su servicio de inicio de sesión. Por ejemplo, en {{< ui >}}Search for{{< /ui >}}, es posible que tenga `@appsec.security_activity:business_logic.users.login.*`.  
3. Verifique si todos sus servicios de inicio de sesión están reportando actividad de inicio de sesión. Puede ver esto en la faceta {{< ui >}}Service{{< /ui >}}.

{{<img src="security/ato/guide_trace_explorer.png" alt="Explorador de trazas de AAP que muestra un estado estable de errores y éxitos de inicio de sesión, con algunos picos" style="width:100%;" >}}

**Si no ve actividad de inicio de sesión desde un servicio**, vaya a [Paso 1.5: Instrumentación manual de sus servicios](#step-15-manually-instrumenting-your-services).

### Paso 1.4: Validación de que los metadatos de inicio de sesión se recopilan automáticamente {#step-14-validating-login-metadata-is-automatically-collected}

Para validar que los metadatos de inicio de sesión se recopilan, haga lo siguiente:

1. Vaya a [Traces][8] en AAP.   
2. Busque trazas etiquetadas con actividad de inicio de sesión exitosa y fallida desde su servicio de inicio de sesión. Puede actualizar la consulta de búsqueda en {{< ui >}}Search for{{< /ui >}} para filtrar `business_logic.users.login.success` o `business_logic.users.login.failure`. 
3. Abra una traza.  
4. En la pestaña {{< ui >}}Security{{< /ui >}}, revise el {{< ui >}}Business Logic Event{{< /ui >}}.
5. Verifique si el evento es para un usuario falso.

{{<img src="security/ato/guide_trace_login_fail.png" alt="Traza de inicio de sesión de AAP que muestra un evento de fallo de inicio de sesión y metadatos completos" style="width:100%;" >}}

Revise algunas trazas, tanto de inicios de sesión exitosos como fallidos. Para fallos de inicio de sesión, busque trazas con `usr.exists` como `true` (intento de inicio de sesión fallido por un usuario existente) y `false`.

Las verificaciones deben realizarse independientemente de si el usuario existe o no.

En caso de un usuario **falso** (`usr.exists:false`), busque los siguientes problemas:

- Un solo evento: si la traza contiene múltiples eventos de inicio de sesión, como éxitos y fallos, esto podría deberse a una instrumentación automática incorrecta. Para cambiar la instrumentación automática, vaya a [Paso 1.5: Instrumentación manual de sus servicios](#step-15-manually-instrumenting-your-services).  
- ¿Contiene el evento los metadatos obligatorios? Podría aparecer como una sección de atribución de usuario en caso de un inicio de sesión exitoso. Los metadatos obligatorios son `usr.login` y `usr.exists` en caso de fallo de inicio de sesión, y `usr.login` y `usr.id` en caso de inicio de sesión exitoso. Si faltan algunos metadatos, vaya a [Paso 1.5: Instrumentación manual de sus servicios](#step-15-manually-instrumenting-your-services).

**Si la instrumentación es correcta, vaya a [Fase 2: Preparación para campañas de apropiación de cuentas](#phase-2-preparing-for-ato-campaigns).**

### Paso 1.5: Instrumentación manual de sus servicios {#step-15-manually-instrumenting-your-services}

AAP recopila información de inicio de sesión y metadatos mediante un SDK integrado en las bibliotecas de Datadog. La instrumentación se realiza llamando al SDK cuando el inicio de sesión de un usuario es exitoso o falla, y proporcionando al SDK los metadatos del inicio de sesión. El SDK adjunta el inicio de sesión y los metadatos a la traza y los envía a Datadog, donde se conservan.

<div class="alert alert-info">Para obtener una alternativa a la modificación del código del servicio, vaya al <a href="#step-16-remote-instrumentation-of-your-services">Paso 1.6: Instrumentación remota de sus servicios</a>.</div>

Para instrumentar manualmente sus servicios, haga lo siguiente:

1. Si la instrumentación automática proporciona datos incorrectos (varios eventos en una sola traza), consulte [Deshabilitar la instrumentación automática][9].
2. Para obtener instrucciones detalladas de instrumentación para cada lenguaje, vaya a [Agregar información de lógica de negocio (éxito de inicio de sesión, error de inicio de sesión, cualquier lógica de negocio) a las trazas][10]. Asegúrese de agregar los siguientes metadatos:
   * `usr.login`: **Obligatorio para el éxito y el error de inicio de sesión**. Este campo contiene el *nombre* utilizado para iniciar sesión en la cuenta. El nombre puede ser una dirección de correo electrónico, un número de teléfono, un nombre de usuario o cualquier otra cosa. El propósito de este campo es identificar las cuentas objetivo incluso si no existen en sus sistemas, ya que un usuario podría ser capaz de cambiar esas cuentas. Además, este campo proporciona información sobre la ubicación de la base de datos utilizada por el atacante. Este valor no debe confundirse con `usr.id`.
   * `usr.exists`: **Obligatorio para inicios de sesión fallidos**. Este campo es necesario para algunas detecciones predeterminadas. El campo ayuda a reducir la prioridad de los intentos dirigidos a cuentas que no existen en sus sistemas.  

**Después de implementar el código, valide que la instrumentación sea correcta siguiendo los pasos en** [Paso 1.4: Validar que los metadatos de inicio de sesión se recopilen automáticamente](#step-1.4:-validating-login-metadata-is-automatically-collected).

### Paso 1.6: Instrumentación remota de sus servicios {#step-16-remote-instrumentation-of-your-services}

AAP puede usar reglas personalizadas de WAF en la aplicación para marcar intentos de inicio de sesión y extraer de la solicitud los metadatos necesarios para las reglas de detección.

Este enfoque requiere que [Remote Configuration][11] esté habilitado y funcionando. Verifique que Remote Configuration se esté ejecutando para este servicio en [Remote Configuration][12].

Para usar reglas WAF personalizadas en la aplicación, haga lo siguiente:

1. Abra el [formulario de creación de reglas personalizadas de WAF en la aplicación][24].   
2. Nombre su regla y seleccione la categoría {{< ui >}}Business Logic{{< /ui >}}.   
3. Establezca el tipo de regla como `users.login.failure` para errores de inicio de sesión y `users.login.success` para inicios de sesión exitosos.
   {{<img src="security/ato/guide_waf_instrumentation.png" alt="Formulario de creación de reglas WAF personalizadas completado con una nueva regla de instrumentación de inicio de sesión" style="width:100%;" >}}
4. Seleccione su servicio y escriba la regla para que coincida con los intentos de inicio de sesión. Por lo general, usted hace coincidir el método (`POST`), el URI con una expresión regular (`^/login`) y el código de estado (403 para errores, 302 o 200 para éxito).  
5. Recopile las etiquetas requeridas por las reglas de detección. La etiqueta más importante es `usr.login`. Suponiendo que el inicio de sesión se proporcionó en la solicitud, puede agregar una condición y establecer `store value as tag` como operador.
   {{<img src="security/ato/guide_waf_instrumentation_operator.png" alt="Menú desplegable de operador en el formulario de creación de reglas WAF personalizadas, con el valor de almacenamiento como etiqueta resaltada" style="width:30%;" >}}

6. Seleccione un parámetro de usuario específico como entrada, ya sea en el cuerpo o en la consulta.   
7. Establezca el campo `Tag` en el nombre de la etiqueta donde desea guardar el valor capturado usando `usr.login`.
   {{<img src="security/ato/guide_waf_instrumentation_tagged.png" alt="Formulario de creación de reglas WAF personalizadas, con una condición completa que selecciona un parámetro llamado login y lo almacena en una etiqueta llamada usr.login" style="width:100%;" >}}

8. Haga clic en {{< ui >}}Save{{< /ui >}}. La regla se envía automáticamente a cada instancia del servicio y luego comienza a capturar los errores de inicio de sesión. 

**Para validar que la instrumentación sea correcta**, consulte [Paso 1.4: Validación de que los metadatos de inicio de sesión se recopilan automáticamente](#step-1.4:-validating-login-metadata-is-automatically-collected).

Para obtener más detalles, consulte [Seguimiento de información de lógica de negocio sin modificar el código][13].

## Fase 2: Preparación para campañas de ATO {#phase-2-preparing-for-ato-campaigns}

Después de configurar la instrumentación para sus servicios, AAP monitorea las campañas de ataque. Puede revisar el tráfico en la sección [Attacks overview][14] {{< ui >}}Business logic{{< /ui >}}. 

{{<img src="security/ato/guide_overview_card.png" alt="Descripción general de la actividad de inicio de sesión y de las señales relacionadas con ATO" style="width:100%;" >}}

AAP detecta [múltiples estrategias de atacantes][15]. Al detectar un ataque con un alto nivel de confianza, las [reglas de detección integradas][16] generan una señal. 

La gravedad de la señal se establece según la urgencia de la amenaza: desde {{< ui >}}Low{{< /ui >}} en caso de ataques fallidos hasta {{< ui >}}Critical{{< /ui >}} en caso de compromisos de cuenta exitosos.

Las acciones cubiertas en las siguientes secciones le ayudan a identificar y aprovechar las detecciones más rápidamente.

### Paso 2.1: Configuración de las notificaciones {#step-21-configuring-notifications}

[Notifications][17] proporciona una advertencia en su canal preferido cuando se activa una señal. Para crear una regla de notificación, haga lo siguiente:

1. Abra [Create a new rule][18].  
2. Ingrese un nombre para la regla.
3. Seleccione {{< ui >}}Signal{{< /ui >}} y elimine todas las entradas excepto {{< ui >}}App & API Protection{{< /ui >}}.
4. Restrinja la regla a `category:account_takeover` y expanda las gravedades para incluir `Medium`.
5. Agregue destinatarios de notificaciones (Slack, Teams, PagerDuty).
   Para obtener más información, consulte [Notification channels][19].  
6. Pruebe y luego guarde la regla.
   {{<img src="security/ato/guide_notification_config.png" alt="Formulario de creación de notificaciones completado para notificar sobre las señales de ATO más relevantes" style="width:80%;" >}}
   La notificación se envía la próxima vez que se genera una señal.

### Paso 2.2: Validar la propagación adecuada de datos {#step-22-validate-proper-data-propagation}

En entornos de microservicios, generalmente se accede a los servicios mediante hosts internos que ejecutan otros servicios. Este entorno interno hace que sea difícil identificar los rasgos únicos de la solicitud del atacante original, como la IP, el agente de usuario, la huella digital, etc.

[AAP Traces][20] puede ayudarle a validar que el evento de inicio de sesión esté correctamente etiquetado con las IP de origen, el agente de usuario, etc. Para validar, revise las trazas de inicio de sesión en [Traces][21] y verifique lo siguiente:
 
* Las IP de origen (`@http.client_ip`) son variadas y son IP públicas.  
  * **Problema:** Si los intentos de inicio de sesión provienen solo de unas pocas IP, podría tratarse de un proxy que no puede bloquear sin arriesgar la disponibilidad.  
  * **Solución:** Reenvíe la IP del cliente de la solicitud inicial a través de un encabezado HTTP, como `X-Forwarded-For`. Puede usar un encabezado personalizado para [mejorar la seguridad][22] y configurar el SDK para que lo lea utilizando la variable de entorno `DD_TRACE_CLIENT_IP_HEADER`.  
* El agente de usuario (`@http.user_agent`) es consistente con el tráfico esperado (navegador web, aplicación móvil, etc.)  
  * **Problema:** El agente de usuario podría ser reemplazado por el agente de usuario en la biblioteca de red del microservicio que realiza la llamada.  
  * **Solución:** Utilice el agente de usuario del cliente al llamar a servicios posteriores.
* Se completan múltiples encabezados. Puede ver esto en la {{< ui >}}See more details{{< /ui >}} de una traza en el bloque {{< ui >}}Request{{< /ui >}}.
  * **Problema:** Los encabezados de solicitud normales (por ejemplo, `accept-encoding`) no se reenvían al servicio instrumentado. Esto perjudica la generación de huellas digitales (`@appsec.fingerprint.*`) y degrada la capacidad de la señal para aislar la actividad de un atacante.
  * **Solución:** Reenvíe esos encabezados al llamar a un microservicio posterior.

### Paso 2.3: Configurar el bloqueo automático {#step-23-configure-automatic-blocking}

<div class="alert alert-info">Antes de comenzar: Verifique que las direcciones IP estén configuradas correctamente, como se describe en <a href="#step-22-validate-proper-data-propagation">Paso 2.2: Validar la propagación adecuada de datos</a>.</div>

El bloqueo automático de AAP se puede utilizar para bloquear ataques en cualquier momento del día. El bloqueo automático puede ayudar a bloquear ataques antes de que los miembros de su equipo estén en línea, brindando seguridad durante las horas fuera de servicio. Dentro de un ATO, el bloqueo automático puede ayudar a mitigar los problemas de carga causados por el aumento en los intentos fallidos de inicio de sesión o evitar que el atacante utilice cuentas comprometidas.

Puede configurar el bloqueo automático para bloquear las IP identificadas como parte de un ataque. Esta es solo una corrección parcial porque los atacantes pueden cambiar las IP; sin embargo, puede darle más tiempo para implementar una corrección integral.

Para configurar el bloqueo automático, haga lo siguiente:

1. Vaya a {{< ui >}}AAP{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > [Reglas de detección][23].  
2. En {{< ui >}}Search{{< /ui >}}, ingrese `tag:"category:account_takeover"`.   
3. Abra las reglas donde desea activar el bloqueo. Datadog recomienda activar el bloqueo de IP para una gravedad de {{< ui >}}High{{< /ui >}} o {{< ui >}}Critical{{< /ui >}}.  
4. En la regla, en {{< ui >}}Define Conditions{{< /ui >}}, en {{< ui >}}Security Responses{{< /ui >}}, habilite {{< ui >}}IP automated blocking{{< /ui >}}. También puede habilitar {{< ui >}}User automated blocking{{< /ui >}}.  
   Puede controlar el comportamiento de bloqueo por condición. Cada regla puede tener múltiples condiciones basadas en su confianza y el éxito del ataque. 

**Datadog no recomienda el bloqueo permanente de direcciones IP**. Es poco probable que los atacantes reutilicen las IP y el bloqueo permanente podría resultar en el bloqueo de usuarios. Además, AAP tiene un límite de cuántas IP puede bloquear (`~10000`), y esto podría llenar esta lista con IP innecesarias.

{{<img src="security/ato/guide_blocking_config.png" alt="Sección de condiciones de la página de reglas de detección donde se puede configurar el bloqueo" style="width:100%;" >}}

## Fase 3: Reacción ante campañas de ATO {#phase-3-reacting-to-ato-campaigns}

Esta sección describe el comportamiento común de los hackers en la apropiación de cuentas y cómo clasificar, investigar y hacer un seguimiento de las detecciones.

### Cómo ejecutan los atacantes sus campañas {#how-attackers-run-their-campaigns}

Eventualmente, sus sistemas son atacados. La oleada de intentos de inicio de sesión maliciosos a menudo puede eclipsar el volumen de actividad de inicio de sesión normal que el servicio espera. La carga podría aumentar causando problemas de disponibilidad y el atacante podría iniciar sesión exitosamente en una cuenta en cualquier momento. 

Las acciones que toman los atacantes dependen de su estrategia y de las configuraciones de sus sistemas. Algunos atacantes podrían decidir abusar inmediatamente de su acceso para extraer valor antes de que usted haya tenido tiempo de congelar sus cuentas comprometidas. Otros podrían mantener las cuentas inactivas hasta un momento posterior. 

Hay muchas estrategias disponibles, pero es importante entender que la cadena de valor de los ataques a menudo se divide cuidadosamente:

1. El actor que inicia el ataque a menudo compra una base de datos de credenciales a un proveedor (probablemente adquirida por el compromiso de otro servicio).
2. El actor obtiene un script diseñado para automatizar los intentos de inicio de sesión mientras evade la detección (aleatorizando encabezados, tratando de parecerse lo más posible al tráfico normal).
3. El actor compra acceso a una red de bots, lo que le permite aprovechar muchas IPs diferentes para ejecutar su ataque. Existen casos extremos donde grandes campañas con más de 500 mil intentos estaban tan distribuidas que Datadog vio un promedio de 1.01 solicitudes por IP y un solo intento por cuenta.
4. Cuando se descubren credenciales válidas, podrían venderse a otro actor para que las aproveche con algún fin, como robo financiero, spam, abuso, etc.

Cuando un ataque comienza contra sus sistemas, el sistema genera señales etiquetadas como {{< ui >}}Credential Stuffing{{< /ui >}}, {{< ui >}}Distributed Credential Stuffing{{< /ui >}} o {{< ui >}}Bruteforce{{< /ui >}}, dependiendo de la estrategia del atacante.

### Paso 3.1: Clasificación {#step-31-triage}

El primer paso es confirmar que la detección sea correcta. Ciertos comportamientos, como un escaneo de seguridad en un punto de conexión de inicio de sesión o una gran cantidad de rotación de tokens, podrían parecer un ataque para la detección. El análisis depende de la señal, y los siguientes ejemplos proporcionan una guía general que debe personalizarse para su situación.

{{< tabs >}}
{{% tab "Fuerza bruta" %}}

La señal busca un intento de robar una cuenta de usuario probando muchas contraseñas diferentes para esta cuenta. Generalmente, un pequeño número de cuentas son el objetivo de estas campañas.

{{<img src="security/ato/guide_signal_bruteforce.png" alt="Panel lateral de la señal que muestra una señal de fuerza bruta con un usuario comprometido" style="width:100%;" >}}

Revise las cuentas marcadas como comprometidas. Haga clic en un usuario para abrir un resumen de la actividad reciente.

{{<img src="security/ato/guide_user_menu.png" alt="Menú que se muestra al pasar el cursor sobre una píldora de usuario. Un botón que permite abrir el panel lateral del usuario está resaltado en la parte superior derecha." style="width:50%;" >}}

Preguntas para la clasificación:

* ¿Ha habido un aumento repentino de la actividad?   
* ¿Es la primera vez que esas direcciones IP intentan iniciar sesión?   
* ¿Están marcadas por inteligencia de amenazas?

Si la respuesta a esas preguntas es sí, es probable que la señal sea legítima.

Puede adaptar su respuesta según la sensibilidad de la cuenta. Por ejemplo, una cuenta gratuita con acceso limitado frente a una cuenta de administrador.

{{% /tab %}}

{{% tab "Relleno de credenciales" %}}

Esta señal busca una gran cantidad de cuentas con inicios de sesión fallidos provenientes de una pequeña cantidad de direcciones IP. Esto suele ser causado por atacantes poco sofisticados.

{{<img src="security/ato/guide_signal_credential_stuffing.png" alt="Panel lateral de señales que muestra una señal de relleno de credenciales con un usuario comprometido" style="width:100%;" >}}

Revise las cuentas marcadas como objetivo para encontrar similitudes y establecer la sensibilidad de esos usuarios.

{{<img src="security/ato/guide_user_table.png" alt="Tabla que muestra los usuarios objetivo del ataque. Se muestra un usuario en una píldora de usuario porque tenemos un panel lateral con más actividad sobre él." style="width:100%;" >}}

Si comparten atributos, como provenir todos de una misma institución, verifique si la dirección IP podría ser un proxy para esta institución revisando su actividad pasada al pasar el cursor sobre ella y abrir el panel lateral.

{{<img src="security/ato/guide_ip_menu.png" alt="Menú que se muestra al pasar el cursor sobre una píldora de usuario. Un botón que permite abrir el panel lateral del usuario está resaltado en la parte superior derecha." style="width:100%;" >}}

Preguntas para la clasificación:

* ¿Ha habido un aumento repentino de la actividad?   
* ¿Las cuentas no están correlacionadas?   
* ¿Las direcciones IP están marcadas por inteligencia de amenazas?   
* ¿Hay muchos más inicios de sesión fallidos que exitosos?

Si la respuesta a esas preguntas es sí, es probable que la señal sea legítima.  
Puede adaptar su respuesta según la escala del ataque y si se están comprometiendo cuentas.

{{% /tab %}}

{{% tab "Relleno de credenciales distribuido" %}}

Esta señal busca un gran aumento en el número total de errores de inicio de sesión en un servicio. Esto es causado por atacantes sofisticados que aprovechan una red de bots.

{{<img src="security/ato/guide_signal_distributed_credential_stuffing.png" alt="Panel lateral de señales que muestra una señal de relleno distribuido" style="width:100%;" >}}

Datadog intenta identificar atributos comunes entre los errores de inicio de sesión en su servicio. Esto puede revelar defectos en el script del atacante que pueden usarse para aislar la actividad maliciosa. Cuando se encuentra, se muestra una sección llamada {{< ui >}}Attacker Attributes{{< /ui >}}. Si está presente, revise si se trata de una actividad legítima seleccionando el clúster y haciendo clic en {{< ui >}}Explore clusters{{< /ui >}}.

{{<img src="security/ato/guide_cluster_table.png" alt="Tabla que muestra los clústeres de atributos de usuario detectados durante el ataque. Se pueden seleccionar filas para limitar la investigación a la actividad que coincida con esos atributos." style="width:100%;" >}}

Si es precisa, la actividad del clúster debería coincidir estrechamente con el aumento de errores de inicio de sesión y, al mismo tiempo, ser baja o inexistente antes.  
Si no hay ningún clúster disponible, haga clic en {{< ui >}}Investigate in full screen{{< /ui >}} y revise los usuarios/IP objetivo en busca de valores atípicos. 

Si la lista está truncada, haga clic en {{< ui >}}View in AAP Traces Explorer{{< /ui >}} y ejecute la investigación con el explorador de trazas. Para obtener herramientas adicionales, consulte [Paso 3.3: Investigación](#step-33-investigation).

{{% /tab %}}
{{< /tabs >}}


Si la conclusión del triaje es que la señal es un falso positivo, puede marcarla como falso positivo y cerrarla. 

Si el falso positivo fue causado por una configuración única en su servicio, puede agregar filtros de supresión para silenciar los falsos positivos.

**Si la señal es legítima**, pase al paso [Paso 3.2: Respuesta preliminar](#step-32-disrupting-the-attacker-as-a-preliminary-response).

### Paso 3.2: Interrupción del atacante como respuesta preliminar{#step-32-disrupting-the-attacker-as-a-preliminary-response}

Si el ataque está en curso, es posible que desee interrumpir al atacante mientras investiga más a fondo. Interrumpir al atacante ralentiza el ataque y reduce el número de cuentas comprometidas. 

<div class="alert alert-info">Este es un paso común, aunque es posible que desee omitir este paso en las siguientes circunstancias:

* Las cuentas tienen poco valor inmediato. Puede bloquear estos casos posteriores al compromiso sin causar daños.  
* Desea mantener la máxima visibilidad del ataque evitando cualquier acción que alerte al atacante sobre la investigación y haga que cambie sus tácticas.
</div>

La aplicación de esta respuesta preliminar requiere que [Remote Configuration][11] esté habilitada para sus servicios.

Si desea iniciar una respuesta parcial, haga lo siguiente:

{{< tabs >}}
{{% tab "Fuerza bruta o relleno de credenciales" %}}

Es probable que los atacantes utilicen un pequeño número de IP. Para bloquearlos, abra la señal y utilice los Siguientes pasos. Puede establecer la duración del bloqueo. 

{{<img src="security/ato/guide_next_steps.png" alt="El menú muestra respuestas rápidas a la señal, desde la clasificación de la señal, hasta la respuesta a la señal mediante el bloqueo de IP o usuarios comprometidos, pasando por la habilitación del bloqueo automático" style="width:50%;" >}}

Datadog recomienda **12h**, lo cual es suficiente para que el ataque se detenga y evitar bloquear a usuarios legítimos cuando, después del ataque, esas IPs se reciclan para usuarios legítimos. Datadog no recomienda el bloqueo permanente.  
También puede bloquear a los usuarios comprometidos, aunque un mejor enfoque sería extraerlos y restablecer sus credenciales utilizando sus propios sistemas.

Por último, puede habilitar el bloqueo automático de IP desde la sección de Siguientes pasos para que las nuevas IP se bloqueen automáticamente mientras realiza su investigación.

{{% /tab %}}

{{% tab "Relleno de credenciales distribuido" %}}

Estos ataques suelen utilizar un gran número de IP desechables. Debido a la latencia de Datadog, es poco práctico bloquear los intentos de inicio de sesión bloqueando la IP antes de que el atacante la elimine de su grupo.

En su lugar, bloquee los rasgos de la solicitud que sean exclusivos del intento malicioso (un agente de usuario, un encabezado específico, una huella digital, etc.).

{{<img src="security/ato/guide_cluster_table.png" alt="Tabla que muestra los clústeres de atributos de usuario detectados durante el ataque. Se pueden seleccionar filas para limitar la investigación a la actividad que coincida con esos atributos." style="width:100%;" >}}

En una señal {{< ui >}}Distributed Credential Stuffing campaign{{< /ui >}}, Datadog identifica automáticamente rasgos claros y los presenta como {{< ui >}}Attacker Attributes{{< /ui >}}. 

Antes de bloquear, Datadog recomienda que revise la actividad del clúster para confirmar que la actividad es realmente maliciosa.

Las preguntas que intenta responder son:

- ¿Es el tráfico malicioso? ¿Existía este tráfico antes del inicio del ataque?  
- ¿Se puede capturar un volumen significativo de tráfico legítimo?  
- ¿Puede ser efectivo el bloqueo basado en este clúster?

Para hacerlo, seleccione su clúster y haga clic en {{< ui >}}Explore clusters{{< /ui >}}.

{{<img src="security/ato/guide_cluster_table_select.png" alt="Tabla que muestra los clústeres de atributos de usuario detectados durante el ataque. Se selecciona una fila y el botón Explore clusters está enfocado." style="width:100%;" >}}

Aparece el explorador de {{< ui >}}Investigate{{< /ui >}} y proporciona indicadores de tráfico del clúster: una gran parte del tráfico del ataque y una alta proporción de IPs marcadas por Threat Intelligence. 

Esos son dos indicadores importantes: 

- % de Threat Intel  
- Distribución de tráfico

{{<img src="security/ato/guide_cluster_explorer.png" alt="Explorador de clústeres que muestra el clúster que seleccionamos anteriormente" style="width:100%;" >}}

Haga clic en un indicador para ver más información sobre el tráfico del clúster. 

En {{< ui >}}Cluster Activity{{< /ui >}}, hay una visualización del volumen del tráfico general de APM que coincide con este clúster. Al compararlo con los datos de AAP, tenga cuidado con la escala, ya que los datos de APM pueden estar muestreados mientras que los de AAP no.

En el siguiente ejemplo, gran parte del tráfico proviene de antes del ataque. Esto significa que una actividad legítima coincide con este clúster en el tráfico normal y se bloquearía si usted tomara medidas. No necesita escalar ni hacer clic en {{< ui >}}Block All Attacking IPs{{< /ui >}} en la señal.

{{<img src="security/ato/guide_cluster_explorer_fp.png" alt="Actividad del clúster que muestra una tasa constante de tráfico que coincide con esos atributos, una fuerte indicación de que la mayor parte de este tráfico es legítimo y que el clúster no se puede utilizar para bloquear." style="width:100%;" >}}

En otro ejemplo, la actividad del clúster comenzó con el ataque. Esto significa que no debería haber daños colaterales y puede proceder a bloquear.

{{<img src="security/ato/guide_cluster_explorer_tp.png" alt="Gráfico que muestra en una escala logarítmica muy poco tráfico fuera de los ataques" style="width:70%;" >}}

Después de confirmar que los rasgos coinciden con los atacantes, puede enviar una regla de WAF en la aplicación para bloquear las solicitudes que coincidan con esos rasgos. Esto es compatible solo para rasgos basados en el agente de usuario.

Para crear la regla, haga lo siguiente:

1. Vaya a {{< ui >}}AAP{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}In-App WAF{{< /ui >}} > [Custom Rules][33].
2. Haga clic en {{< ui >}}Create New Rule{{< /ui >}} y complete la configuración. 
3. Siga los pasos en {{< ui >}}Define your custom rule{{< /ui >}}.   
4. En {{< ui >}}Select the services you want this rule to apply to{{< /ui >}}, seleccione su servicio de inicio de sesión o los servicios donde desea bloquear las solicitudes. También puede dirigir el bloqueo a la ruta de inicio de sesión.
   {{<img src="security/ato/guide_waf_blocking.png" alt="Captura de pantalla del modal de creación de reglas de WAF seleccionando una ruta específica en un servicio específico" style="width:100%;" >}}
5. En {{< ui >}}If incoming requests match these conditions{{< /ui >}}, configure las condiciones de la regla. <!-- The following example uses the user agent. -->   
   1. Si desea bloquear un agente de usuario específico, péguelo en {{< ui >}}Values{{< /ui >}}. En {{< ui >}}Operator{{< /ui >}}, puede usar {{< ui >}}matches value in list{{< /ui >}}, o, si desea más flexibilidad, también puede usar {{< ui >}}Matches RegEx{{< /ui >}}.
   {{<img src="security/ato/guide_waf_blocking_ua.png" alt="Una captura de pantalla de un agente de usuario siendo bloqueado" style="width:100%;" >}}
6. Utilice la sección {{< ui >}}Preview matching traces{{< /ui >}} como revisión final del impacto de la regla. Si no se muestran trazas inesperadas, seleccione un modo de bloqueo y guarde la regla. 
   {{<img src="security/ato/guide_waf_blocking_traces.png" alt="Tabla que muestra las trazas que coinciden con sus reglas" style="width:100%;" >}}

Hay múltiples acciones de bloqueo disponibles. Dependiendo de la sofisticación de los atacantes, es posible que desee una respuesta más sigilosa para que no se den cuenta de inmediato de que fueron bloqueados.


{{% /tab %}}
{{< /tabs >}}

### Paso 3.3: Investigación {#step-33-investigation}

Cuando haya [interrumpido al atacante como respuesta preliminar](#step-32-disrupting-the-attacker-as-a-preliminary-response), puede identificar lo siguiente:

- Cuentas comprometidas por los atacantes para que pueda restablecer sus credenciales.  
- Pistas sobre la fuente de las cuentas atacadas, que puede usar para restablecimientos de contraseña proactivos o un mayor escrutinio.
- Datos sobre la infraestructura del atacante, que puede usar para detectar intentos futuros u otra actividad maliciosa (relleno de tarjetas de crédito, abuso, etc.).

El primer paso es aislar la actividad del atacante del tráfico general de la aplicación. 

#### Aislar la actividad del atacante {#isolate-attacker-activity}

Mientras aísla la actividad del atacante, asegúrese de que sus filtros actuales sean exhaustivos mediante dos pruebas:  
 

1. Vaya a [Traces][25] y luego *excluya* las trazas según los filtros que identifique. El objetivo es que el volumen de tráfico restante sea similar al volumen de tráfico normal. Si todavía observa un pico de inicios de sesión durante el ataque, significa que son necesarios más filtros para aislar el ataque de manera integral.
2. Observe el tráfico que coincide con sus filtros durante un período de tiempo extendido (por ejemplo, si el ataque duró una hora, use un día). Cualquier tráfico que coincida antes o después del ataque probablemente sea un falso positivo.

A continuación, comience aislando la actividad del ataque.

{{< tabs >}}
{{% tab "Fuerza bruta" %}}

Extraiga la lista de usuarios atacados yendo a [Signals][1].

Puede consultar las trazas de los usuarios atacados haciendo clic en el enlace {{< ui >}}login attempts{{< /ui >}} en {{< ui >}}Security Traces{{< /ui >}}.

Si desea acceso directo a los usuarios atacados, puede extraer la lista desde el panel lateral de señal.

{{<img src="security/ato/guide_bruteforce_users.png" alt="Tabla que muestra a los usuarios atacados" style="width:100%;" >}}

A partir de esta lista de usuarios, puede crear una consulta de [traza][2] para revisar toda la actividad de los usuarios atacados. Siga esta plantilla: 

`@appsec.security_activity:business_logic.users.login.* @appsec.events_data.usr.login:(<users>)` 

Los inicios de sesión exitosos deben considerarse sospechosos.

[1]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A"Application%20Security"%20category%3Aaccount_takeover&product=appsec
[2]: https://app.datadoghq.com/security/appsec/traces
{{% /tab %}}

{{% tab "Relleno de credenciales" %}}

Esta señal marcó mucha actividad proveniente de unas pocas IP y está estrechamente relacionada con su variante distribuida. Es posible que deba utilizar el método de relleno de credenciales distribuido si la señal omitió partes del ataque.

Puede consultar las trazas que coinciden con las IP atacantes haciendo clic en el enlace {{< ui >}}login attempts{{< /ui >}} en {{< ui >}}Security Traces{{< /ui >}}.

Si desea acceso directo a las IP atacantes, puede extraer la lista del panel lateral de señal.

{{<img src="security/ato/guide_credential_stuffing_ip.png" alt="Tabla que muestra las IP atacantes" style="width:100%;" >}}

A partir de la lista de IPs, puede crear una consulta de [traza][2] para revisar toda la actividad de las IP sospechosas. Siga esta plantilla:

`@appsec.security_activity:business_logic.users.login.* @http.client_ip:(<IPs>)`

Los inicios de sesión exitosos deben considerarse sospechosos.

[2]: https://app.datadoghq.com/security/appsec/traces

{{% /tab %}}

{{% tab "Relleno de credenciales distribuido" %}}

Esta señal marcó un gran aumento en los errores de inicio de sesión en un servicio. Si el ataque es lo suficientemente grande, esta señal también podría activar las señales de Bruteforce o Credential Stuffing. La señal también es capaz de detectar ataques difusos de manera más integral.

En el caso de ataques difusos, los atributos del atacante están disponibles en la señal.

{{<img src="security/ato/guide_signal_distributed_credential_stuffing.png" alt="Captura de pantalla de una señal de relleno de credenciales distribuido" style="width:100%;" >}}

1. Después de abrir la señal en el panel lateral, haga clic en {{< ui >}}Investigate in full screen{{< /ui >}}.   
2. En {{< ui >}}Attacker Attributes{{< /ui >}}, seleccione el clúster y haga clic en {{< ui >}}Filter this signal by selection{{< /ui >}}. A continuación, en {{< ui >}}Traces{{< /ui >}}, haga clic en {{< ui >}}View in AAP Traces Explorer{{< /ui >}}.

Esto lo lleva al explorador de trazas con los filtros configurados en los atributos marcados. Puede comenzar la investigación con la consulta actual, pero debería ampliarla para que también coincida con los inicios de sesión exitosos además de los fallidos. Puede hacerlo reemplazando `@appsec.security_activity:business_logic.users.login.failure` con `@appsec.security_activity:business_logic.users.login.*`. Revise la exhaustividad y precisión del filtro usando [la técnica descrita anteriormente](#isolate-attacker-activity).

{{<img src="security/ato/guide_distributed_credential_stuffing_traces.png" alt="Explorador de trazas filtrado por los atributos del clúster" style="width:100%;" >}}

En caso de que esos atributos sean inexactos o incompletos, puede intentar identificar otros rasgos para aislar la actividad del atacante. Volviendo a la señal de página completa y desplazándose hacia abajo hasta la {{< ui >}}Traces{{< /ui >}} sección, encontrará un botón {{< ui >}}Analysis{{< /ui >}}. Esto abre la opción de visualizar, donde el tráfico del ataque se segmenta por una gran variedad de atributos.

{{<img src="security/ato/guide_investigate_overview.png" alt="Panel lateral de análisis abierto con un ataque y algunos atributos sugeridos en una tabla." style="width:100%;" >}}

Los atributos más comunes se presentan en la parte superior de una tabla, pero puede visualizar su impacto desplazándose hacia abajo. Cada fila muestra la proporción de tráfico que coincide con este atributo y qué tan de cerca coincide este tráfico con la "forma" del aumento en el tráfico. Su objetivo es identificar los atributos que juntos aíslan este aumento en la actividad mientras excluyen el tráfico en estado estable. Tenga en cuenta la escala de los gráficos, ya que no todas las trazas pueden estar etiquetadas con cada atributo (por ejemplo, Inteligencia de amenazas). Además, tenga en cuenta que algunos campos no se pueden usar para bloquear (Inteligencia de amenazas, ASNs y geolocalización de IP).

{{<img src="security/ato/guide_investigate_correlation.png" alt="Algunas series temporales de la pestaña Análisis que demuestran a veces una correlación baja y a veces una correlación alta" style="width:100%;" >}}

Tras identificar los atributos, selecciónelos de la lista y verifique su exhaustividad activando y desactivando el botón {{< ui >}}Filtering enabled{{< /ui >}}. Una vez que esté satisfecho, haga clic en {{< ui >}}View Traces{{< /ui >}} para profundizar en los usuarios afectados.

{{% /tab %}}
{{< /tabs >}}

#### Revisar inicios de sesión exitosos y fallidos {#review-login-successes-and-failures}

Revisar los inicios de sesión exitosos y fallidos ayuda a identificar lo siguiente:

* Qué buscan los atacantes para que pueda bloquearlos.  
* Qué están haciendo los atacantes para que pueda capturarlos, incluso si cambian sus scripts.   
* Qué tan exitosos son los atacantes para que pueda recuperar las cuentas de las que tomaron control y ver cuánto tiempo tiene para reaccionar.

Cuando la actividad del atacante esté aislada, revise los inicios de sesión exitosos y considere las siguientes preguntas: 

* ¿Se ha comprometido alguna cuenta?   
* ¿Están los atacantes haciendo algo con sus cuentas comprometidas o las están dejando inactivas?   
* ¿Son las cuentas accedidas posteriormente por una infraestructura diferente?   
* ¿Existe alguna actividad pasada de esta infraestructura?

Para los errores de inicio de sesión, considere las siguientes preguntas:

* ¿Están los atacantes apuntando a un subconjunto específico de usuarios?  
* ¿Qué tan exitosos son? La precisión de los ataques debería estar en el rango de 1/100-1/1000.   
* ¿Están superando los captchas o la autenticación multifactor?

A medida que avanza su investigación, puede ir y venir entre este paso y el siguiente a medida que esté listo para aplicar una respuesta basada en sus hallazgos.

### Paso 3.4: Respuesta {#step-34-response}

Las capacidades de investigación de Datadog se enriquecen con datos de su backend, los cuales no están disponibles para la biblioteca que ejecuta la respuesta. Debido a eso, no todos los campos son compatibles con la aplicación de una respuesta.

Los atacantes motivados intentan eludir su respuesta tan pronto como se dan cuenta de ella. En previsión de este enfoque, haga lo siguiente:

1. Asegúrese de no perder visibilidad sobre el ataque.  
2. Haga que el bloqueo sea lo más difícil posible de *identificar* por parte del atacante. Por ejemplo, haga que la respuesta de bloqueo sea la misma que la de su error de inicio de sesión. Esto puede confundir a los atacantes y hacerles creer que su ataque sigue siendo exitoso.  
3. Haga que el bloqueo sea lo más difícil posible de *eludir* por parte del atacante. Utilice rasgos sutiles, como valores de encabezado específicos, en lugar de direcciones IP.

Puede utilizar las capacidades de bloqueo integradas de Datadog para denegar cualquier solicitud que cumpla con ciertos criterios, o exportar los datos automáticamente a uno de sus sistemas para realizar una respuesta (restablecimiento de credenciales, simulación de errores de inicio de sesión al bloquear, etc.).

### Bloqueo de Datadog {#datadog-blocking}

Los usuarios que forman parte del tráfico bloqueado por Datadog ven una página {{< ui >}}You're blocked{{< /ui >}}, o reciben un código de estado personalizado, como una redirección. El bloqueo se puede aplicar a través de dos mecanismos, cada uno con diferentes características de rendimiento: la Lista de denegación y las reglas personalizadas de WAF. 

{{<img src="security/ato/guide_blocked.png" alt="Página que se muestra cuando el usuario está bloqueado. Página que dice 'Lo sentimos, no puede acceder a esta página'. Por favor, comuníquese con el equipo de servicio al cliente" style="width:100%;" >}}

#### Lista de denegación {#denylist}

La [Lista de denegación][27] es una forma eficiente de bloquear una gran cantidad de entradas, pero está limitada a direcciones IP y usuarios. Si su investigación descubrió un pequeño conjunto de direcciones IP responsables del ataque (`<1000`), bloquear estas direcciones IP es el mejor curso de acción. 

La Lista de denegación se puede administrar y automatizar utilizando la plataforma de Datadog haciendo clic en {{< ui >}}Automate Attacker Blocking{{< /ui >}} en la señal. 

Utilice las opciones de señal {{< ui >}}Automate Attacker Blocking{{< /ui >}} o {{< ui >}}Block All Attacking IPs{{< /ui >}} para bloquear todas las direcciones IP atacantes durante unas horas, una semana o de forma permanente. De manera similar, puede bloquear a los usuarios comprometidos. Como recordatorio, Datadog no recomienda bloquear direcciones IP de forma permanente debido a los riesgos de bloquear tráfico legítimo después de que las direcciones IP se reciclen en grupos públicos.  

{{<img src="security/ato/guide_next_steps.png" alt="El menú muestra respuestas rápidas a la señal, desde la clasificación de la señal, hasta la respuesta a la señal mediante el bloqueo de IP o usuarios comprometidos, pasando por la habilitación del bloqueo automático" style="width:50%;" >}}

El bloqueo puede ser revocado o extendido desde la [Lista de denegación][27].

{{<img src="security/ato/guide_denylist_menu.png" alt="Menú que le permite acceder a la lista de denegación, Políticas seguidas de la lista de denegación" style="width:100%;" >}}

Si la señal no fue precisa, puede extraer la lista, los usuarios o las direcciones IP y agregarlos a la lista de denegación manualmente.

{{<img src="security/ato/guide_denylist_new.png" alt="Indicación que le permite agregar una nueva IP, usuario o agente de usuario a la lista de denegación" style="width:80%;" >}}

#### Reglas de WAF en la aplicación {#in-app-waf-rules}

Si la lista de denegación no es suficiente, puede crear una regla de WAF. Una regla de WAF se evalúa más lentamente que la lista de denegación, pero es más flexible.

Para crear una nueva regla, haga lo siguiente:

1. Vaya a {{< ui >}}AAP{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}In-App WAF{{< /ui >}} > [Reglas personalizadas][33].
2. Haga clic en {{< ui >}}Create New Rule{{< /ui >}} y complete la configuración. 
3. Siga los pasos en {{< ui >}}Define your custom rule{{< /ui >}}.   
4. En {{< ui >}}Select the services you want this rule to apply to{{< /ui >}}, seleccione su servicio de inicio de sesión o los servicios en los que desee bloquear las solicitudes. También puede dirigir el bloqueo a la ruta de inicio de sesión.
{{<img src="security/ato/guide_waf_blocking.png" alt="Captura de pantalla del modal de creación de reglas de WAF seleccionando una ruta específica en un servicio específico" style="width:100%;" >}}
5. En {{< ui >}}If incoming requests match these conditions{{< /ui >}}, configure las condiciones de la regla. <!-- The following example uses the user agent. -->   
   1. Si desea bloquear un agente de usuario específico, puede pegarlo en {{< ui >}}Values{{< /ui >}}. En {{< ui >}}Operator{{< /ui >}}, puede usar {{< ui >}}matches value in list{{< /ui >}}, o si desea más flexibilidad, también puede usar una {{< ui >}}Matches RegEx{{< /ui >}}.
{{<img src="security/ato/guide_waf_blocking_ua.png" alt="Una captura de pantalla de un agente de usuario siendo bloqueado" style="width:100%;" >}}
6. Utilice la sección {{< ui >}}Preview matching traces{{< /ui >}} como revisión final del impacto de la regla. Si no se muestran trazas inesperadas, seleccione un modo de bloqueo y guarde la regla. 

La respuesta se envía automáticamente a los rastreadores y los rastreos bloqueados aparecen en el [Traces explorer][25].

{{<img src="security/ato/guide_waf_blocking_traces.png" alt="Tabla que muestra las trazas que coinciden con sus reglas" style="width:100%;" >}}

Hay múltiples acciones de bloqueo disponibles. Dependiendo de la sofisticación de los atacantes, es posible que desee una respuesta más sigilosa para que los atacantes no se den cuenta de inmediato de que fueron bloqueados.

Para obtener más información, consulte [Reglas de WAF en la aplicación][34].

#### Exportación de datos automatizada {#automated-data-export}

Puede configurar una señal para enviar cualquier ID de usuario mediante un webhook. Este método se puede utilizar para enviar usuarios comprometidos a sus sistemas y restablecer sus credenciales o restringirlos. El objetivo es hacer que esas cuentas sean inútiles para el atacante.

<div class="alert alert-info">No todas las reglas son compatibles con esta función. De las reglas predeterminadas, las reglas compatibles son:
<ul>
 <li>Campaña distribuida de relleno de credenciales (huella digital del atacante)</li>
 <li>Ataque de fuerza bruta</li>
 <li>Ataque de Credential Stuffing</li>
</ul>
</div>

Para configurar una señal para enviar un ID de usuario mediante un webhook, haga lo siguiente: 
1. Configuración de un [destino de webhook estándar][28]. Para ver cómo funciona esto en Cloud SIEM, vaya a [Automatizar la remediación de amenazas detectadas con Webhooks][29].
2. En [Reglas de detección][30], abra las reglas que desea configurar. 
{{<img src="security/ato/guide_detection_rules.png" alt="Tablas de reglas de detección relacionadas con ATO" style="width:100%;" >}}
3. Vaya a la configuración de notificaciones en una condición de regla de detección. 
4. Agregue un destinatario y active {{< ui >}}Notify{{< /ui >}} para cada `@usr.id` nuevo detectado. Esto le permite exportar la lista cuando ocurren actualizaciones.

{{<img src="security/application_security/threats/notify-on-update.png" alt="Interruptor de notificar al actualizar en el editor de reglas de detección" style="width:100%;">}}

Los destinos de notificación establecidos en la condición de la regla de detección reciben un mensaje cuando se detectan nuevos ID de usuario. Los perfiles de notificación que monitorean estas señales no reciben alertas por nuevos ID de usuario.

Para recibir ID de usuario específicos y comprometidos con un webhook, configure un webhook utilizando la integración de webhook de Datadog. Incluya la variable `$SECURITY_SIGNAL_ATTRIBUTES` en la carga útil del webhook. Los ID de usuario se almacenan bajo la ruta `@usr.id` en la carga útil JSON.

{{<img src="security/application_security/threats/notify-on-update-payload.png" alt="Ejemplo de carga útil de notificación de actualización" style="width:100%;">}}

Al hacer el parseo de la carga útil, puede actuar sobre los ID en sus propios sistemas. 

**Importante:** La lista solo contiene los ID detectados desde la última notificación. Los ID no se desduplican si vuelven a iniciar sesión.

### Paso 3.5: Hacer un seguimiento de {#step-35-monitor}

Después de que el atacante introduce la respuesta, podría suspender o adaptar su ataque. Siga haciendo un seguimiento de la tasa de intentos de inicio de sesión después de introducir la respuesta, especialmente los fallidos. Los ataques podrían disminuir solo para reanudarse después de unos minutos, horas o días. 

Si se reanuda un ataque a gran escala, la señal de Distributed Credential Stuffing debería volver a ejecutarse. En este caso, revise las siguientes consideraciones:

* Los atacantes persistentes a menudo requieren múltiples iteraciones de medidas defensivas antes de rendirse.
* La defensa ideal es una estrategia de bloqueo robusta que el atacante no pueda eludir.
* Los atacantes intentan evadir la detección con frecuencia alterando las IP y los agentes de usuario. Es menos probable que modifiquen profundamente el script que obtuvieron para enviar sus intentos de inicio de sesión, por lo que los encabezados son un objetivo más resistente.
* Las estrategias efectivas incluyen métodos basados en huellas digitales o de correlación que identifican combinaciones de encabezados poco comunes.
* Haga un seguimiento del tráfico bloqueado resultante de respuestas defensivas anteriores.
* Bloquear el tráfico del atacante puede bloquear inadvertidamente el tráfico legítimo. Implemente mecanismos para desbloquear el tráfico legítimo, ya sea adaptando la respuesta de Datadog o asegurándose de que se desbloquee después del ataque.

### Paso 3.6: Limpieza {#step-36-cleanup}

Después de unos días sin actividad significativa del atacante, puede considerar que el ataque terminó y pasar a una fase de limpieza. 

Los objetivos de la fase de limpieza son los siguientes:

- Deshabilite cualquier mitigación que se haya agregado.  
- Asegúrese de que no se bloquee tráfico legítimo.  
- Identifique oportunidades para fortalecer los servicios contra futuros ataques.  
- Identifique la fuente de los datos que el atacante utilizó contra los usuarios.

#### Deshabilitar mitigaciones {#disabling-mitigations}

El bloqueo de usuario debe basarse en el temporizador que configuró cuando seleccionó {{< ui >}}Block All Attacking IPs{{< /ui >}} en la señal. Esta configuración de bloqueo de usuario no requiere ninguna acción adicional.

Si configuró el bloqueo permanente, desbloquee a los usuarios y las IPs de la lista de denegados haciendo lo siguiente: 

1. Abra el [Denylist][27].  
2. Haga clic en {{< ui >}}Blocked IPs{{< /ui >}} o {{< ui >}}Blocked users{{< /ui >}}.  
3. En la lista de entidades, localice la IP o el usuario y, a continuación, haga clic en {{< ui >}}Unblock{{< /ui >}}.

<!-- <insert up to date screenshot\> -->

#### Deshabilite o elimine cualquier regla personalizada de WAF en la aplicación {#disable-or-delete-any-custom-in-app-waf-rules}

Para deshabilitar o eliminar reglas de WAF en la aplicación, vaya a la [página de reglas de WAF en la aplicación personalizadas][33] y deshabilite las reglas haciendo clic en {{< ui >}}Monitoring{{< /ui >}} o {{< ui >}}Blocking{{< /ui >}} y seleccionando {{< ui >}}Disable Rule{{< /ui >}}. 

Si la regla ya no es relevante, puede eliminarla haciendo clic en más opciones ({{< ui >}}...{{< /ui >}}) y seleccionando {{< ui >}}Delete{{< /ui >}}.

#### Valide que no se bloquee tráfico legítimo {#validate-no-legitimate-traffic-is-blocked}

Para validar que no se bloquee tráfico legítimo, el volumen de tráfico debe coincidir estrechamente con el del ataque, sin prácticamente trazas bloqueadas fuera de las oleadas principales.

Para validar que no se bloquee tráfico legítimo, haga lo siguiente:

1. Vaya a [Traces][25] y busque las trazas bloqueadas con la búsqueda `@appsec.blocked:true`.   
2. Si observa un tráfico significativo bloqueado de forma continua, es probable que se trate de usuarios legítimos.
   1. Deshabilite la regla de bloqueo incorrecta para evitar bloquear a más usuarios. 
   2. Priorice el desbloqueo de ese tráfico desde el [Denylist][27].

#### Fortalecimiento de sus servicios {#hardening-your-services}

Las campañas grandes de ATO rara vez son un evento aislado. Es posible que desee aprovechar el tiempo entre ataques para fortalecer sus servicios y establecer configuraciones que pueda utilizar durante ataques posteriores.

Aquí hay algunos ejemplos comunes de fortalecimiento:

* **Limite la tasa de intentos de inicio de sesión por IP/usuario/rango de red/agente de usuario:** Esta función de bloqueo suave le permite reducir agresivamente la escala del ataque en algunas circunstancias con un impacto mínimo en los usuarios normales, incluso si comparten rasgos con el atacante.  
* **Añadir fricción al inicio de sesión:** Para romper la automatización de los atacantes sin afectar significativamente a los usuarios, utilice captchas o modifique el flujo de inicio de sesión durante un ataque (por ejemplo, requiera que se obtenga un token desde un nuevo punto de conexión).
* **Aplique la autenticación de múltiples factores (MFA):** Datadog descubrió que la MFA es extremadamente eficaz para detener el compromiso de cuentas. Podría requerir que sus usuarios con mayores privilegios utilicen MFA, especialmente durante los ataques. 
* **Limitar acciones sensibles para los usuarios:** Si sus servicios permiten a los usuarios realizar acciones sensibles (gastar dinero, acceder a información sensible, cambiar información de contacto, etc.), es posible que desee prohibir a los usuarios de alto riesgo con inicios de sesión sospechosos hasta que sean revisados manualmente o mediante autenticación de múltiples factores. Los inicios de sesión sospechosos pueden ser enviados programáticamente a sus sistemas por Datadog a través de un webhook.  
* **Capacidad para consumir hallazgos de señales programáticamente:** Cree un punto de conexión para consumir webhooks de Datadog y tomar medidas automáticamente contra usuarios/IPs/rasgos sospechosos.

#### Identificación de la fuente de datos del atacante {#identifying-the-attacker-data-source}

Los atacantes adquieren listas de cuentas comprometidas de forma masiva. Al identificar la fuente de su base de datos, puede identificar proactivamente a los usuarios en riesgo. 

Para identificar la fuente de su base de datos, exporte a los usuarios afectados por el ataque utilizando una de estas opciones:

* En los detalles de la señal, en {{< ui >}}Targeted users{{< /ui >}}, haga clic en {{< ui >}}Export to CSV{{< /ui >}}. Esta opción exporta hasta 10k usuarios.   
* Si necesita exportar más de 10k usuarios, pagine su consulta manualmente realizando [API calls][31]. El explorador de Traces realiza llamadas similares, por lo que puede basar sus solicitudes en la llamada que está realizando al agrupar por `@appsec.events_data.usr.login`. Establezca el límite en 10000 y utilice rangos de tiempo más pequeños para evitar el límite del backend.

{{<img src="security/ato/guide_user_table.png" alt="Tabla que muestra los usuarios objetivo del ataque. Se muestra un usuario en una píldora de usuario porque tenemos un panel lateral con más actividad sobre él." style="width:100%;" >}}

Cuando tenga una lista, revísela en busca de atributos comunes: 
- Si todos los usuarios provienen de una región o un cliente. 
- Una gran mayoría de usuarios comparte algún compromiso conocido (utilice la API de [Have I Been Pwned][32]).

Cuando se identifique la fuente de la base de datos, fuerce proactivamente un restablecimiento de contraseña de esos clientes o márquelos como de mayor riesgo. Esto aumenta la confianza de que los futuros inicios de sesión sospechosos fueron realmente comprometidos.

#### Revise la actividad adicional del atacante {#review-additional-attacker-activity}

Aprovechando la firma del atacante, amplíe los filtros para observar qué actividad que no sea de inicio de sesión realizaron. 

Este filtro puede ser menos preciso. Por ejemplo, un filtro que coincide con la firma de una aplicación móvil con tráfico legítimo, pero que fue clonada por el atacante para su ataque. El filtro podría mostrar la investigación realizada por el atacante con antelación y compartir pistas sobre lo que el atacante podría intentar hacer a continuación.

También puede pivotar sobre la infraestructura utilizada por el atacante. ¿Esas IP maliciosas hicieron algo más que inicios de sesión? ¿Están accediendo a otras APIs sensibles?

## Conclusión {#conclusion}

El robo de cuentas es una amenaza común, pero también mucho más compleja que los vulnerabilidades por inyección tradicionales. Detectarlos requiere una integración estrecha con sus sistemas e implica suficiente incertidumbre como para que las respuestas automatizadas no sean posibles para los ataques más avanzados.  

En esta guía, hizo lo siguiente: 
- Aprendió cómo pueden presentarse las campañas de apropiación de cuentas, cómo clasificarlas y cómo contrarrestarlas.
- Instrumentó sus servicios de inicio de sesión para proporcionar a Datadog AAP todo el contexto que necesita.
- Configuró sus servicios de inicio de sesión para proporcionar todas las capacidades en el momento del ataque. 

Esta es una orientación general. Dependiendo de sus aplicaciones y entornos, podría haber una necesidad de estrategias de respuesta adicionales.

[1]: /es/security/application_security/account_takeover_protection/
[2]: https://app.datadoghq.com/services?query=service%3Auser-auth&env=%2A&fromUser=false&hostGroup=%2A&lens=Security&sort=-fave%2C-team&start=1735636008863&end=1735639608863
[3]: /es/security/application_security/setup/compatibility/
[4]: /es/remote_configuration
[5]: https://app.datadoghq.com/security/appsec/onboarding
[6]: https://app.datadoghq.com/security/appsec/traces?query=&agg_m=count&agg_m_source=base&agg_t=count&fromUser=false&track=appsecspan&start=1735036043639&end=1735640843639&paused=false
[7]: /es/security/application_security/setup/threat_detection/
[8]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.security_activity%3Abusiness_logic.users.login.%2A&agg_m=count&agg_m_source=base&agg_t=count&fromUser=false&track=appsecspan&start=1735036164646&end=1735640964646&paused=false
[9]: /es/security/application_security/how-it-works/add-user-info/?tab=set_user#disabling-user-activity-event-tracking
[10]: /es/security/application_security/how-it-works/add-user-info/?tab=set_user#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces
[11]: /es/tracing/guide/remote_config/
[12]: https://app.datadoghq.com/organization-settings/remote-config?resource_type=agents
[13]: /es/security/application_security/how-it-works/add-user-info/?tab=set_user#tracking-business-logic-information-without-modifying-the-code
[14]: https://app.datadoghq.com/security/appsec/threat
[15]: /es/security/application_security/account_takeover_protection/#attacker-strategies
[16]: https://app.datadoghq.com/security/appsec/detection-rules?query=type%3Aapplication_security%20tag%3A%22category%3Aaccount_takeover%22&deprecated=hide&groupBy=none&sort=date&viz=rules
[17]: /es/security/notifications/
[18]: https://app.datadoghq.com/security/configuration/notification-rules/new?notificationData=
[19]: /es/security/notifications/#notification-channels
[20]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.security_activity%3Abusiness_logic.users.login.%2A&agg_m=count&agg_m_source=base&agg_t=count&fromUser=false&track=appsecspan&start=1735222832468&end=1735827632468&paused=false
[21]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.security_activity%3Abusiness_logic.users.login.%2A&agg_m=count&agg_m_source=base&agg_t=count&fromUser=false&track=appsecspan&start=1735222832468&end=1735827632468&paused=false
[22]: https://securitylabs.datadoghq.com/articles/challenges-with-ip-spoofing-in-cloud-environments/#what-should-you-do
[23]: https://app.datadoghq.com/security/appsec/detection-rules?query=type%3Aapplication_security%20tag%3A%22category%3Aaccount_takeover%22&deprecated=hide&groupBy=none&sort=date&viz=rules
[24]: https://app.datadoghq.com/security/appsec/in-app-waf?column=services-count&config_by=custom-rules&ruleId=newRule
[25]: https://app.datadoghq.com/security/appsec/traces
[26]: https://app.datadoghq.com/security
[27]: https://app.datadoghq.com/security/appsec/denylist
[28]: /es/api/latest/webhooks-integration/
[29]: /es/security/cloud_siem/guide/automate-the-remediation-of-detected-threats/
[30]: https://app.datadoghq.com/security/appsec/detection-rules?query=type%3Aapplication_security%20tag%3A%22category%3Aaccount_takeover%22&deprecated=hide&groupBy=none&mitreFilters=%7B%22visualize%22%3A%7B%22value%22%3A%5B%22all%22%5D%2C%22excluded%22%3Afalse%7D%2C%22ruleDensity%22%3A%7B%22value%22%3A%5B%5D%2C%22excluded%22%3Afalse%7D%7D&sort=date&viz=rules
[31]: /es/api/latest/spans/#aggregate-spans
[32]: https://haveibeenpwned.com/
[33]: https://app.datadoghq.com/security/appsec/in-app-waf?column=services-count&config_by=custom-rules
[34]: /es/security/application_security/policies/inapp_waf_rules/