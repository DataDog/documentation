---
aliases:
- /es/security_platform/guide/setting-up-security-monitoring-for-aws
- /es/security_platform/cloud_siem/guide/setting-up-security-monitoring-for-aws
title: Configuración de Cloud SIEM para AWS
---

## Información general

Con Datadog Cloud SIEM, las reglas de detección se aplican a todos los logs procesados. Los logs de servicio de AWS se recopilan con una función de Datadog Lambda. Esta función Lambda se activa en buckets de S3 y reenvía logs a Datadog. Sigue las siguientes instrucciones de configuración para empezar:

## Configuración

1. Navega a la [página de Configuración de seguridad][1] en la aplicación de Datadog.
2. Selecciona **Cloud SIEM**.
3. En **Secure your cloud environment** (Asegurar tu entorno en la nube), selecciona AWS.
4. Completa la configuración de **Detect threats with cloud logs** (Detectar amenazas con logs en la nube).
5. (Opcional) Completa la configuración de **Secure your hosts and containers** (Asegurar tus hosts y contenedores).
6. (Opcional) Completa la configuración de **Detect threats in additional logging sources** (Detectar amenazas en fuentes de registro adicional).


[1]: https://app.datadoghq.com/security/configuration