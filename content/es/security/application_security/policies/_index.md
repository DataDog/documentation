---
aliases:
- /es/security/application_security/threats/protection
disable_toc: false
title: Políticas
---

Si tu servicio está ejecutando [un Agent con la configuración remota habilitada y una versión de librería de rastreo compatible][2], puedes bloquear ataques y atacantes desde la interfaz de usuario de Datadog sin una configuración adicional del Agent o bibliotecas de rastreo.

La protección de aplicaciones y API (AAP) Protect permite ralentizar los ataques y a los atacantes _bloqueándolos_. Las traces (trazas) de seguridad se bloquean en tiempo real por las bibliotecas de traces (trazas) de Datadog. Los bloqueos se guardan en la plataforma de Datadog, se recuperan de forma automática y segura por el Datadog Agent, se despliegan en tu infraestructura y se aplican a tus servicios.

## Requisitos previos

Para utilizar las funciones de protección con tu servicio:

- [Actualiza tu Datadog Agent][3] al menos a la versión 7.41.1.
- [Activar la AAP][1].
- [Activa la configuración remota][2].
- Actualiza tu biblioteca de rastreo al menos a la versión mínima necesaria para activar la protección. Para obtener más información, consulta la sección de compatibilidad con las capacidades de AAP de [Compatibilidad][12] para el lenguaje de tu servicio.
- Si tienes previsto utilizar el bloqueo de usuarios autenticados, [añade información de usuario a trazas][4].

## Bloqueo de atacantes (IPs y usuarios autenticados)

Puedes bloquear a los atacantes marcados en [Señales de seguridad][5] de la AAP de forma temporal o permanente. En el Explorer de señales, haz clic en una señal para ver qué usuarios y direcciones IP están generando la señal y, opcionalmente, bloquearlos.

A partir de ahí, todos los servicios protegidos por la AAP bloquean las solicitudes entrantes realizadas por la IP o el usuario bloqueados, durante el tiempo especificado. Todas las traces (trazas) bloqueadas se etiquetan con `security_response.block_ip` o `security_response.block_user` y se muestran en [Explorer de traces (trazas)][6]. Los servicios en los que la AAP está desactivada no están protegidos. Consulta [Investigar señales de seguridad][20] para obtener más información.

## Responder a las amenazas en tiempo real automatizando el bloqueo de atacantes

Además de bloquear manualmente a los atacantes, puedes configurar reglas de automatización para que la AAP bloquee automáticamente a los atacantes marcados en las señales de seguridad.

Para empezar, ve a **Seguridad > Protección de aplicaciones y API > Protección > [Reglas de detección][14]**. Puedes crear una nueva regla o editar una existente con el tipo _Protección de aplicaciones y API_. Por ejemplo, puedes crear una regla para activar señales de gravedad `Critical` cuando se detecten ataques de Relleno de Credenciales y bloquear automáticamente las direcciones IP de los atacantes asociados durante 30 minutos.

**Nota**: Debes instrumentar tus servicios para poder bloquear atacantes autenticados. Consulta [Monitorización y protección de usuarios][15] para obtener más detalles.

## Bloquea a los atacantes en el perímetro: integra la AAP con tus despliegues WAF existentes

La AAP de Datadog permite a los clientes bloquear a los atacantes en el perímetro, directamente desde la Señal de seguridad. La AAP se integra con [Workflows][17] para enviar las direcciones IP de los atacantes a los cortafuegos de aplicaciones web perimetrales (AWS WAF, Cloudflare, Fastly) y garantizar que las solicitudes de estos atacantes se bloquean en el perímetro incluso antes de que entren en el entorno del cliente.
Crea workflows (UI) / procesos a partir de los [blueprints][18] disponibles y ejecútalos directamente desde el panel lateral Signal de la AAP.

## Lista de denegados

Las direcciones IP de los atacantes y los usuarios autenticados que se bloquean de forma permanente o temporal se añaden a la _Lista de denegados_. Gestiona la lista en la [página Lista de denegados][7]. Una lista de denegados admite el bloqueo de IPs individuales, así como de un rango de IPs (bloques CIDR).

## Lista de aprobados

Puedes utilizar la _Lista de aprobados_ para permitir permanentemente el acceso de direcciones IP específicas a tu aplicación. Por ejemplo, puede que desees añadir direcciones IP internas a tu lista de aprobados, o direcciones IP que ejecutan regularmente auditorías de seguridad en tu aplicación. También puedes añadir rutas específicas para garantizar un acceso ininterrumpido. Gestiona la lista desde la [página Lista de aprobados][8].

## Bloqueo de intentos de ataque con WAF dentro de la aplicación

El WAF (cortafuegos de aplicaciones web) en la aplicación de la AAP combina las técnicas de detección de los WAF basados en perímetro con el contexto enriquecido que proporciona Datadog, ayudando a tu equipos a proteger sus sistemas con confianza.

Dado que la AAP conoce las rutas de una aplicación, la protección puede aplicarse de forma granular a servicios específicos y no necesariamente a todas las aplicaciones y el tráfico. Esta eficacia contextual reduce el esfuerzo de inspección y la tasa de falsos positivos en comparación con un WAF perimetral. No hay periodo de aprendizaje, porque la mayoría de los web frameworks proporcionan un mapa estructurado de rutas. La AAP puede ayudar a tu equipo a desplegar protecciones contra vulnerabilidades de día cero automáticamente poco después de que se divulgue la vulnerabilidad, al tiempo que se dirige a las aplicaciones vulnerables, limitando el riesgo de falsos positivos.

### Cómo WAF en la aplicación bloquea las de trazas seguridad

Además de los modos `monitoring` y `disabled` ofrecidos para cada una de las más de 130 reglas WAF en la aplicación, las reglas también tienen el modo `blocking`. Cada regla especifica condiciones sobre la solicitud entrante para definir lo que la librería considera sospechoso. Cuando un patrón de regla determinado coincide con una solicitud HTTP en curso, la solicitud es bloqueada por la librería.

Las políticas gestionadas definen el modo en que cada una de las reglas de WAF en la aplicación se comporta en coincidencia: `monitoring`, `blocking`, o `disabled`. Dado que dispone del contexto completo de tus aplicaciones, la AAP sabe qué reglas aplicar para proteger tus aplicaciones al tiempo que limita el número de falsos positivos.

Para un control más preciso, puedes clonar una política gestionada por Datadog o crear una política personalizada y establecer el modo que mejor se adapte a tus necesidades. Si estableces la política en `auto-updating`, tus aplicaciones estarán protegidas por las últimas detecciones desplegadas por Datadog. También tienes la opción de fijar una política a una versión específica del conjunto de reglas.

A medida que las reglas de WAF dentro de la aplicación cambian de modo, los cambios se reflejan casi en tiempo real para servicios con la [configuración remota activada][2]. Para otros servicios, puedes actualizar la política en la [página WAF dentro de la aplicación][9] y luego [definir reglas WAF dentro de la aplicación][10] para que se aplique el cambio de comportamiento.

Gestiona el WAF en aplicación accediendo a Seguridad --> Protección de aplicaciones y API --> Configuración --> [WAF en aplicación][9].

Ve las trazas de seguridad bloqueadas en el [Trace Explorer][11] filtrando por la faceta `Blocked:true`.

<!-- {{< img src="security/application_security/app_sec_blocked.png" alt="Explorer de traces (trazas) de la AAP filtrado mediante el uso de la faceta Bloqueado configurada en true." style="width:100%;" >}} -->

### Configurar WAF dentro de la aplicación

1. [Habilita la configuración remota**][2] para que tus servicios habilitados para la AAP aparezcan en el WAF en la aplicación. Esto es necesario para enviar de forma segura la configuración de WAF en la aplicación desde tu backend Datadog a la librería de rastreo de tu infraestructura.

2. **Asocia tus servicios habilitados para AAP/Configuración remota con una política**. Una vez activada la configuración remota en un servicio, ve a **Seguridad > Protección de aplicaciones y API > Protección > [WAF en la aplicación][9]**. El servicio aparece en la política _Sólo monitorización de Datadog_ en forma predeterminada. Sólo monitorización de Datadog es una política gestionada y es de sólo lectura, lo que significa que no puedes modificar el estado (monitorización, bloqueo o desactivación) de reglas individuales.

   Si necesitas un control detallado, clona una de las políticas disponibles para crear una política personalizada en la que se puedan modificar los estados de las reglas. Asocia uno o varios de tus servicios a esta política personalizada.

   Para cambiar la política aplicada por defecto a tus servicios, puedes actualizar tu política predeterminada. Desde el WAF dentro de la aplicación, haz clic en la política que desees establecer como predeterminada y, a continuación, haz clic en **Actions** > **Set this policy as default** (Acciones > Establecer esta política como predeterminada).

## Personalizar el comportamiento de la protección

### Personalizar la respuesta a las solicitudes bloqueadas

{{% asm-protection-page-configuration %}}

El código de estado de respuesta HTTP predeterminado al servir la page (página) de denegación a los atacantes es `403 FORBIDDEN`. Para personalizar la respuesta, ve a **Seguridad > Protección de aplicaciones y API > Protección > Waf en la aplicación > [Respuestas personalizadas][16]**.

Opcionalmente, puedes enmascarar si el atacante ha sido detectado y bloqueado anulando el código de respuesta para que sea `200 OK` o `404 NOT FOUND` en la página de denegación.

También puedes redirigir opcionalmente a los atacantes a una página de denegación personalizada y alejarlos de tus servicios e infraestructura críticos. Especifica una URL de redirección y el tipo de redirección, por ejemplo, permanente (código de respuesta `301`) o temporal (código de respuesta `302`).

### Desactivar la protección en todos los servicios (Desactivar el modo de protección)

El modo de protección está **activado** por defecto y es un conmutador disponible para desactivar rápidamente el bloqueo en **todos** tus servicios. Se pueden bloquear solicitudes de dos secciones en Datadog: todas las solicitudes de atacantes desde señales de seguridad y las trazas de seguridad desde WAF dentro de la aplicación.

Por muy importante que sea para ti poder aplicar la protección de forma granular y reducir la probabilidad de que se bloquee a usuarios legítimos, a veces necesitas un simple interruptor de apagado para detener rápidamente **todos** los bloqueos en **todos** los servicios. Para desactivar la protección, ve a **Seguridad > Protección de aplicaciones y API > Protección > [WAF en la aplicación][9]** y desactiva **Permitir bloqueo de solicitudes**.

[1]: /es/security/application_security/setup/
[2]: /es/tracing/guide/remote_config
[3]: /es/agent/versions/upgrade_between_agent_minor_versions
[4]: /es/security/application_security/how-it-works/add-user-info/#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability
[5]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&product=appsec&view=signal
[6]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.blocked%3Atrue
[7]: https://app.datadoghq.com/security/appsec/denylist
[8]: https://app.datadoghq.com/security/appsec/passlist
[9]: https://app.datadoghq.com/security/appsec/in-app-waf
[10]: /es/security/application_security/policies/inapp_waf_rules/
[11]: https://app.datadoghq.com/security/appsec/traces
[12]: /es/security/application_security/setup/compatibility/
[14]: https://app.datadoghq.com/security/appsec/detection-rules
[15]: /es/security/application_security/how-it-works/add-user-info/?tab=set_user#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability
[16]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-responses
[17]: https://docs.datadoghq.com/es/service_management/workflows/
[18]: https://app.datadoghq.com/workflow/blueprints?selected_category=SECURITY
[20]: /es/security/application_security/security_signals/
