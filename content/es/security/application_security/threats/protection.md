---
further_reading:
- link: /security/application_security/
  tag: Documentación
  text: App and API Protection con Datadog
is_beta: true
title: Protección
---

## Información general

Si tu servicio está ejecutando [un Agent con la configuración remota habilitada y una versión de biblioteca de rastreo compatible][2], puedes bloquear ataques y atacantes desde la interfaz de usuario de Datadog sin una configuración adicional del Agent o bibliotecas de rastreo.

App and API Protection (AAP) te permite frenar los ataques y a los atacantes _bloqueándolos_. Las trazas (trace) de seguridad son bloqueadas en tiempo real por las bibliotecas de rastreo de Datadog. Los bloqueos se guardan en la plataforma Datadog, se recuperan de forma automática y segura en el Agent, se despliegan en tu infraestructura y se aplican a tus servicios.

## Requisitos previos 

Para utilizar las funciones de protección con tu servicio:

- [Actualiza tu Datadog Agent][3] al menos a la versión 7.41.1.
- [Activa AAP][1].
- [Activa la configuración remota][2].
- Actualiza tu biblioteca de rastreo al menos a la versión mínima necesaria para activar la protección. Para obtener más información, consulta la sección de compatibilidad con las fiuncionalidades de AAP en [Compatibilidad][12] para el lenguaje de tu servicio.
- Si tienes previsto utilizar el bloqueo de usuarios autenticados, [añade información de usuario a trazas][4].

## Bloqueo de atacantes (IPs y usuarios autenticados)

Puedes bloquear a los atacantes indicados en [Security Signals][5] de AAP de forma temporal o permanente. En Signals Explorer, haz clic en una señal para ver qué usuarios y direcciones IP están generando la señal y, opcionalmente, bloquearlos.

A partir de allí, todos los servicios protegidos por AAP bloquean las solicitudes entrantes realizadas por la IP o el usuario bloqueados, durante el tiempo especificado. Todas las trazas bloqueadas se etiquetan con `security_response.block_ip` o `security_response.block_user` y se muestran en el [Trace Explorer][6]. Los servicios en los que AAP está desactivado no están protegidos. Consulta [Investigar Security Signals][20] para obtener más información.

## Responder a las amenazas en tiempo real automatizando el bloqueo de atacantes

Además de bloquear manualmente a los atacantes, puedes configurar reglas de automatización para que AAP bloquee automáticamente a los atacantes indicados en Security Signals.

Para empezar, ve a **Security > App and API Protection > Protection > [Detection Rules] (Seguridad > App and API Protection > Protección > Reglas de detección)[14]**. Puedes crear una nueva regla o editar una existente con el tipo _App and API Protection_. Por ejemplo, puedes crear una regla para activar señales de gravedad `Critical`, cuando se detectan ataques de Relleno de Credenciales, y bloquear automáticamente las direcciones IP de los atacantes asociados durante 30 minutos.

**Nota**: Debes instrumentar tus servicios para poder bloquear atacantes autenticados. Consulta [Monitorización y protección de usuarios][15] para obtener más detalles.

## Bloquear atacantes en el perímetro: integrar AAP con tus despliegues WAF existentes

Datadog AAP permite a los clientes bloquear a los atacantes en el perímetro, directamente desde la señal de seguridad. AAP se integra con [Workflows][17] para enviar las direcciones IP de los atacantes a Web Application Firewalls perimetrales (AWS WAF, Cloudflare, Fastly) y garantizar que las solicitudes de estos atacantes se bloqueen en el perímetro, incluso antes de que lleguen al entorno del cliente.
Crea flujos de trabajo a partir de los [planos][18] disponibles y ejecútalos directamente desde el panel lateral de señales de AAP.

## Lista de denegados

Las direcciones IP de los atacantes y los usuarios autenticados que se bloquean de forma permanente o temporal se añaden a la _Lista de denegados_. Gestiona la lista en la [página Lista de denegados][7]. Una lista de denegados admite el bloqueo de IPs individuales, así como de un rango de IPs (bloques CIDR).

## Lista de aprobados

Puedes utilizar la _Lista de aprobados_ para permitir permanentemente el acceso de direcciones IP específicas a tu aplicación. Por ejemplo, puede que desees añadir direcciones IP internas a tu lista de aprobados, o direcciones IP que ejecutan regularmente auditorías de seguridad en tu aplicación. También puedes añadir rutas específicas para garantizar un acceso ininterrumpido. Gestiona la lista desde la [página Lista de aprobados][8].

## Bloqueo de intentos de ataque con WAF en la aplicación

WAF en la aplicación (cortafuegos de aplicaciones web) de AAP combina las técnicas de detección de los WAF basados en perímetro con el contexto enriquecido que proporciona Datadog, lo que ayuda a tus equipos a proteger sus sistemas con confianza.

Dado que AAP conoce las rutas de una aplicación, la protección puede aplicarse de forma granular a servicios específicos y no necesariamente a todas las aplicaciones y al tráfico. Esta eficacia contextual reduce el esfuerzo de inspección y la tasa de falsos positivos en comparación con un WAF perimetral. No hay periodo de aprendizaje, ya que la mayoría de los marcos web proporcionan un mapa estructurado de rutas. AAP puede ayudar a tu equipo a desplegar protecciones contra vulnerabilidades de día cero automáticamente, poco después de que se divulgue la vulnerabilidad, al tiempo que se dirige a las aplicaciones vulnerables, limitando el riesgo de falsos positivos.

### Cómo WAF en la aplicación bloquea las de trazas seguridad

Además de los modos `monitoring` y `disabled` ofrecidos para cada una de las más de 130 reglas WAF en la aplicación, las reglas también tienen el modo `blocking`. Cada regla especifica condiciones sobre la solicitud entrante para definir lo que la biblioteca considera sospechoso. Cuando un patrón de regla determinado coincide con una solicitud HTTP en curso, la solicitud es bloqueada por la biblioteca.

Las políticas gestionadas definen el modo en que cada una de las reglas de WAF en la aplicación se comporta en las coincidencias: `monitoring`, `blocking`, o `disabled`. Dado que dispone del contexto completo de tus aplicaciones, AAP sabe qué reglas aplicar para proteger tus aplicaciones mientras limita el número de falsos positivos.

Para un control más preciso, puedes clonar una política gestionada por Datadog o crear una política personalizada y establecer el modo que mejor se adapte a tus necesidades. Si estableces la política en `auto-updating`, tus aplicaciones estarán protegidas por las últimas detecciones desplegadas por Datadog. También tienes la opción de fijar una política a una versión específica del conjunto de reglas. 

A medida que las reglas de WAF en la aplicación cambian de modo, los cambios se reflejan casi en tiempo real para servicios con la [configuración remota activada][2]. Para otros servicios, puedes actualizar la política en la [página de WAF en la aplicación][9] y luego [definir reglas de WAF en la aplicación][10] para que se aplique el cambio de comportamiento.

Gestiona WAF en la aplicación yendo a Security --> App and API Protection --> Configuration --> [In-App WAF] (Seguridad --> App and API Protection --> Configuración --> WAF en la aplicación)[9].

Ve las trazas de seguridad bloqueadas en el [Trace Explorer][11] filtrando por la faceta `Blocked:true`.

{{< img src="security/application_security/app_sec_blocked.png" alt="AAP Trace Explorer filtrado utilizando la faceta Blocked (Bloqueado) configurada como true (verdadero)." style="width:100%;" >}}

### Configurar WAF en la aplicación

1. [**Habilita la configuración remota**][2] para que tus servicios habilitados por AAP aparezcan en WAF en la aplicación. Esto es necesario para enviar de forma segura la configuración de WAF en la aplicación desde tu backend Datadog a la biblioteca de rastreo de tu infraestructura. 

2. **Asocia tus servicios habilitados por la configuración remota de AAP con una política**. Una vez activada la configuración remota en un servicio, ve a **Security --> App and API Protection --> [In-App WAF] (Seguridad --> App and API Protection --> Protección --> WAF en la aplicación)[9]**. El servicio aparece en la política _Solo monitorización Datadog_ de forma predeterminada. La política Solo monitorización Datadog es una política gestionada de solo lectura, lo que significa que no puedes modificar el estado (monitorización, bloqueo o desactivación) de reglas individuales.

   Si necesitas un control detallado, clona una de las políticas disponibles para crear una política personalizada en la que se puedan modificar los estados de las reglas. Asocia uno o varios de tus servicios a esta política personalizada.

   Para cambiar la política aplicada por defecto a tus servicios, puedes actualizar tu política predeterminada. Desde WAF en la aplicación, haz clic en la política que desees establecer como predeterminada y, a continuación, haz clic en **Actions** > **Set this policy as default** (Acciones > Establecer esta política como predeterminada).

## Personalizar el comportamiento de la protección

### Personalizar la respuesta a las solicitudes bloqueadas

{{% asm-protection-page-configuration %}}

{{< img src="/security/application_security/asm-blocking-page-html.png" alt="Página que se muestra como AAP bloquea solicitudes originadas en IP bloqueadas" width="75%" >}}

El código de estado de respuesta HTTP predeterminado al mostrar la página de denegación a los atacantes es `403 FORBIDDEN`. Para personalizar la respuesta, ve a **Security > App and API Protection > Protection > In-App Waf > [Custom Responses] (Seguridad > App and API Protection > Protección > WAF en la aplicación > Respuestas personalizadas)[16]**.

Opcionalmente, puedes enmascarar si el atacante ha sido detectado y bloqueado anulando el código de respuesta para que sea `200 OK` o `404 NOT FOUND` en la página de denegación.

También puedes redirigir opcionalmente a los atacantes a una página de denegación personalizada y alejarlos de tus servicios e infraestructura críticos. Especifica una URL de redirección y el tipo de redirección, por ejemplo, permanente (código de respuesta `301`) o temporal (código de respuesta `302`).

### Desactivar la protección en todos los servicios (Desactivar el modo de protección)

El modo de protección está **activado** por defecto y es un conmutador disponible para desactivar rápidamente el bloqueo en **todos** tus servicios. Se pueden bloquear solicitudes de dos secciones en Datadog: todas las solicitudes de atacantes desde Security Signals y las trazas de seguridad desde WAF en la aplicación.

Por muy importante que sea poder aplicar la protección de forma granular y reducir la probabilidad de que los usuarios legítimos sean bloqueados, a veces necesitas un simple interruptor de apagado para desactivar rápidamente **todos** los bloqueos en **todos** los servicios. Para desactivar la protección, ve a **Security > App and API Protection > Protection > [In-App WAF] (Seguridad > App and API Protection > Protección > WAF en la aplicación)[9]** y desactiva **Allow Request Blocking** (Permitir bloqueo de solicitudes).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/
[2]: /es/agent/remote_config/#enabling-remote-configuration
[3]: /es/agent/versions/upgrade_between_agent_minor_versions
[4]: /es/security/application_security/how-it-works/add-user-info/#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability
[5]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&product=appsec&view=signal
[6]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.blocked%3Atrue
[7]: https://app.datadoghq.com/security/appsec/denylist
[8]: https://app.datadoghq.com/security/appsec/passlist
[9]: https://app.datadoghq.com/security/appsec/in-app-waf
[10]: /es/security/application_security/threats/inapp_waf_rules/
[11]: https://app.datadoghq.com/security/appsec/traces
[12]: /es/security/application_security/setup/compatibility/
[14]: https://app.datadoghq.com/security/appsec/detection-rules
[15]: /es/security/application_security/how-it-works/add-user-info/?tab=set_user#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability
[16]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-responses
[17]: https://docs.datadoghq.com/es/service_management/workflows/
[18]: https://app.datadoghq.com/workflow/blueprints?selected_category=SECURITY
[20]: /es/security/application_security/threats/security_signals/