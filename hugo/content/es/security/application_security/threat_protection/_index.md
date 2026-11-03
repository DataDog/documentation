---
description: Detecte, investigue y bloquee ataques a aplicaciones y API en tiempo
  real con Threat Protection en App and API Protection.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-exploit-prevention/
  tag: Blog
  text: Proteja sus aplicaciones contra ataques de día cero con Datadog Exploit Prevention
title: Threat Protection
---
Utilice Threat Protection en [App and API Protection][1] (AAP) para detectar ataques contra sus aplicaciones y API, realizar investigaciones y bloquear tráfico malicioso en tiempo real.

Para comenzar, [configure AAP][2] en sus servicios para que informen trazas de Security. AAP detecta entonces amenazas a partir del tráfico de su aplicación en vivo y le permite responder a ellas.

## Cómo funciona Threat Protection {#how-threat-protection-works}

Threat Protection reúne varias capacidades, todas construidas sobre datos de tráfico de aplicaciones en vivo. Con Threat Protection, usted puede:

- Detecte e investigue amenazas con [Security Signals][3]. Datadog crea una señal de seguridad cuando detecta una amenaza a partir de una regla de detección, para que pueda clasificar, filtrar e investigar ataques en el Explorador de señales.
- Bloquee ataques y atacantes con [Policies][4]. Bloquee direcciones IP y usuarios maliciosos en tiempo real desde la interfaz de usuario de Datadog, de forma manual o mediante reglas automatizadas.
- Detenga intentos de explotación en el código con [Exploit Prevention][5]. Detecte y bloquee intentos de explotar vulnerabilidades, incluidos ataques de día cero, desde dentro de la aplicación en ejecución.
- Extienda la protección al perímetro con [WAF Integrations][6]. Combine la protección dentro de la aplicación con defensas perimetrales como AWS WAF para un enfoque de defensa en profundidad.
- Defienda las cuentas de usuario con [Account Takeover Protection][7]. Detecte y mitigue ataques de apropiación de cuentas, como el relleno de credenciales, y deshabilite a los usuarios comprometidos.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/
[2]: /es/security/application_security/setup/
[3]: /es/security/application_security/threat_protection/security_signals/
[4]: /es/security/application_security/threat_protection/policies/
[5]: /es/security/application_security/threat_protection/exploit-prevention/
[6]: /es/security/application_security/threat_protection/waf-integration/
[7]: /es/security/application_security/threat_protection/account_takeover_protection/