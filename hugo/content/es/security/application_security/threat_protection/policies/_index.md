---
aliases:
- /es/security/application_security/policies/
- /es/security/application_security/threats/protection
disable_toc: false
title: Políticas
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection se encuentra en versión preliminar en el sitio de Datadog Government US1-FED.
</div>
{{< /site-region >}}

Si su servicio está ejecutando [un Agent con Remote Configuration habilitado y una versión de SDK que lo admita][2], puede bloquear ataques y atacantes desde la Datadog UI sin configuración adicional del Agent o los SDKs.

App and API Protection (AAP) Protect le permite ralentizar los ataques y a los atacantes _bloqueándolos_. Los traces de seguridad son bloqueados en tiempo real por los SDKs de Datadog. Los bloqueos se guardan en la plataforma de Datadog, son recuperados de forma automática y segura por el Datadog Agent, implementados en su infraestructura y aplicados a sus servicios.

## Requisitos previos {#prerequisites}

Para utilizar las capacidades de protección con su servicio:

- [Actualice su Datadog Agent][3] al menos a la versión 7.41.1.
- [Habilite AAP][1].
- [Habilite Remote Configuration][2].
- Actualice su SDK al menos a la versión mínima necesaria para activar la protección. Para obtener más detalles, consulte la sección de soporte de capacidades de AAP en [Compatibility][12] para el lenguaje de su servicio.
- Si planea utilizar el bloqueo de usuarios autenticados, [agregue información de usuario a las trazas][4].

## Bloqueo de atacantes (IPs y usuarios autenticados) {#blocking-attackers-ips-and-authenticated-users}

Puede bloquear temporal o permanentemente a los atacantes marcados en [Security Signals][5] de AAP. En Signals Explorer, haga clic en una señal para ver qué usuarios y direcciones IP la están generando y, opcionalmente, bloquearlos.

A partir de ahí, todos los servicios protegidos por AAP bloquean las solicitudes entrantes realizadas por la IP o el usuario bloqueado, durante la duración especificada. Todos los traces bloqueados se etiquetan con `security_response.block_ip` o `security_response.block_user` y se muestran en el [Trace Explorer][6]. Los servicios donde AAP está deshabilitado no están protegidos. Para obtener más información, consulte [Investigate Security Signals][20].

## Responda a las amenazas en tiempo real automatizando el bloqueo de atacantes {#respond-to-threats-in-real-time-by-automating-attacker-blocking}

Además de bloquear atacantes manualmente, puede configurar reglas de automatización para que AAP bloquee automáticamente a los atacantes marcados en Security Signals.

Para comenzar, navegue a {{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > [{{< ui >}}Detection Rules{{< /ui >}}][14]. Puede crear una regla o editar una regla existente. Por ejemplo, puede crear una regla para activar señales de gravedad `Critical` cuando se detecten ataques de Credential Stuffing y bloquear automáticamente las direcciones IP de los atacantes asociados durante 30 minutos.

**Nota**: Debe instrumentar sus servicios para poder bloquear a los atacantes autenticados. Consulte [Protección y seguimiento del usuario][15] para obtener más detalles.

## Bloquee atacantes en el perímetro: integre AAP con sus implementaciones de WAF existentes {#block-attackers-at-the-perimeter-integrate-aap-with-your-existing-waf-deployments}

Datadog AAP permite a los clientes bloquear atacantes en el perímetro, directamente desde la Señal de seguridad. AAP se integra con [Workflows][17] para enviar las direcciones IP de los atacantes a los Web Application Firewalls de perímetro (AWS WAF, Cloudflare, Fastly) y garantizar que las solicitudes de estos atacantes se bloqueen en el borde incluso antes de que ingresen al entorno del cliente.
Cree workflows a partir de los [blueprints][18] disponibles y ejecútelos directamente desde el panel lateral de Signal de AAP.

## Denylist {#denylist}

Las direcciones IP de los atacantes y los usuarios autenticados que están bloqueados de forma permanente o temporal se agregan a la _Denylist_. Administre la lista en la [Denylist page][7]. Una denylist admite el bloqueo de IP individuales, así como de un rango de IP (bloques CIDR).

**Nota**: De forma predeterminada, su Denylist puede contener hasta 2,500 entradas (direcciones IP, rangos CIDR y usuarios autenticados combinados). Las entradas agregadas que superan este límite se aceptan en la Datadog UI, pero no se incluyen en la configuración de la Denylist aplicada, por lo que el bloqueo no surte efecto para ellas. Si necesita bloquear más entradas de las que permite este límite, comuníquese con el [Datadog Support][21] para solicitar un aumento.

## Passlist {#passlist}

Puede usar la _Passlist_ para permitir permanentemente que direcciones IP específicas accedan a su aplicación. Por ejemplo, es posible que desee agregar direcciones IP internas a su passlist, o direcciones IP que ejecutan auditorías de seguridad en su aplicación regularmente. También puede agregar rutas específicas para garantizar un acceso ininterrumpido. Administre la lista desde la [Passlist page][8].

## Bloqueo de intentos de ataque con In-App WAF {#blocking-attack-attempts-with-in-app-waf}

AAP In-App WAF (Web Application Firewall) combina las técnicas de detección de los WAF basados en perímetro con el contexto enriquecido proporcionado por Datadog, ayudando a sus equipos a proteger sus sistemas con confianza.

Debido a que AAP conoce las rutas de una aplicación, la protección se puede aplicar de forma granular a servicios específicos, y no necesariamente en todas las aplicaciones y el tráfico. Esta eficiencia contextual reduce su esfuerzo de inspección y reduce la tasa de falsos positivos en comparación con un WAF de perímetro. No hay período de aprendizaje, porque la mayoría de los web frameworks proporcionan un mapa estructurado de rutas. AAP puede ayudar a su equipo a implementar protecciones contra vulnerabilidades de día cero automáticamente poco después de que se divulgue la vulnerabilidad, mientras se dirige a las aplicaciones vulnerables, limitando el riesgo de falsos positivos.

### Cómo In-App WAF bloquea los traces de seguridad {#how-in-app-waf-blocks-security-traces}

Además de los modos `monitoring` y `disabled` ofrecidos para cada una de las más de 130 reglas de In-App WAF, las reglas también tienen el modo `blocking`. Cada regla especifica condiciones en la solicitud entrante para definir lo que la biblioteca considera sospechoso. Cuando un patrón de regla determinado coincide con una solicitud HTTP en curso, la solicitud es bloqueada por la biblioteca.

Las políticas administradas definen el modo en el que se comporta cada una de las reglas de In-App WAF al coincidir: `monitoring`, `blocking` o `disabled`. Debido a que tiene el contexto completo de sus aplicaciones, AAP sabe qué reglas aplicar para proteger sus aplicaciones mientras limita la cantidad de falsos positivos.

Para un control detallado, puede clonar una política administrada de Datadog o crear una política personalizada y establecer el modo para satisfacer sus necesidades. Si establece la política en `auto-updating`, sus aplicaciones estarán protegidas por las detecciones más recientes implementadas por Datadog. También tiene la opción de fijar una política a una versión específica del conjunto de reglas.

A medida que las reglas de In-App WAF se alternan entre modos, los cambios se reflejan casi en tiempo real para los servicios con [Remote Configuration enabled][2]. Para otros servicios, puede actualizar la política en la [In-App WAF page][9] y luego [define In-App WAF rules][10] para que se aplique el cambio de comportamiento.

Administre In-App WAF navegando a {{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > [{{< ui >}}In-App WAF{{< /ui >}}][9].

Visualizar los traces de seguridad bloqueados en el [Trace Explorer][11] filtrando por la faceta `Blocked:true`.

<!-- {{< img src="security/application_security/app_sec_blocked.png" alt="AAP Trace Explorer filtrado usando la faceta Blocked establecida en true." style="width:100%;" >}} -->

### Configure In-App WAF {#configure-in-app-waf}

1. [**Habilite Remote Configuration**][2] para que sus servicios habilitados para AAP aparezcan en In-App WAF. Esto es necesario para enviar de forma segura la configuración de In-App WAF desde su backend de Datadog al SDK en su infraestructura.

2. **Asocie sus servicios habilitados para AAP/Remote Configuration con una política**. Después de habilitar Remote Configuration en un servicio, navegue a {{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > [{{< ui >}}In-App WAF{{< /ui >}}][9]. El servicio aparece bajo la política _Datadog Monitoring-only_ de forma predeterminada. Datadog Monitoring-only es una política administrada y es de solo lectura, lo que significa que no puede modificar el estado (monitoreo, bloqueo o deshabilitado) de las reglas individuales.

   Si necesita un control granular, clone una de las políticas disponibles para crear una política personalizada donde se puedan modificar los estados de las reglas. Asocie uno o más de sus servicios con esta política personalizada.

   Para cambiar la política aplicada de forma predeterminada a sus servicios, puede actualizar su política predeterminada. Desde In-App-WAF, haga clic en la política que desea establecer como predeterminada y luego haga clic en **Actions** > **Set this policy as default**.

## Personalice el comportamiento de protección {#customize-protection-behavior}

### Personalice la respuesta a las solicitudes bloqueadas {#customize-response-to-blocked-requests}

{{% asm-protection-page-configuration %}}

El código de estado de respuesta HTTP predeterminado al servir la página de denegación a los atacantes es `403 FORBIDDEN`. Para personalizar la respuesta, navegue a {{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}In-App Waf{{< /ui >}} > [{{< ui >}}Custom Responses{{< /ui >}}][16].

Opcionalmente, puede ocultar el hecho de que el atacante ha sido detectado y bloqueado anulando el código de respuesta para que sea `200 OK` o `404 NOT FOUND` cuando se sirve la página de denegación.

También puede, opcionalmente, redirigir a los atacantes a una página de denegación personalizada y alejarlos de sus servicios e infraestructura críticos. Especifique una URL de redireccionamiento y el tipo de redireccionamiento, por ejemplo, permanente (`301` código de respuesta) o temporal (`302` código de respuesta).

### Deshabilitar la protección en todos los servicios (Deshabilitar el modo de protección) {#disable-protection-across-all-services-disabling-protection-mode}

El modo de protección está **activado** de forma predeterminada y es un interruptor disponible para deshabilitar rápidamente el bloqueo en **todos** sus servicios. Las solicitudes pueden bloquearse desde dos secciones en Datadog: todas las solicitudes de atacantes desde Security Signals y los seguimientos de seguridad desde In-App WAF.

Por muy importante que sea para usted poder aplicar la protección de forma granular y reducir la probabilidad de que se bloquee a usuarios legítimos, a veces necesita un interruptor simple para detener rápidamente **todo el bloqueo** en **todos los servicios**. Para desactivar la protección, navegue a {{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > [{{< ui >}}In-App WAF{{< /ui >}}][9] y cambie **Allow Request Blocking** a desactivado.

[1]: /es/security/application_security/setup/
[2]: /es/tracing/guide/remote_config
[3]: /es/agent/versions/upgrade_between_agent_minor_versions
[4]: /es/security/application_security/how-it-works/add-user-info/#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability
[5]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&view=signal
[6]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.blocked%3Atrue
[7]: https://app.datadoghq.com/security/appsec/denylist
[8]: https://app.datadoghq.com/security/appsec/passlist
[9]: https://app.datadoghq.com/security/appsec/in-app-waf
[10]: /es/security/application_security/threat_protection/policies/inapp_waf_rules/
[11]: https://app.datadoghq.com/security/appsec/traces
[12]: /es/security/application_security/setup/compatibility/
[14]: https://app.datadoghq.com/security/appsec/detection-rules
[15]: /es/security/application_security/how-it-works/add-user-info/?tab=set_user#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability
[16]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-responses
[17]: https://docs.datadoghq.com/es/actions/workflows/
[18]: https://app.datadoghq.com/workflow/blueprints?selected_category=SECURITY
[20]: /es/security/application_security/threat_protection/security_signals/
[21]: /es/help/