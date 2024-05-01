---
aliases:
- /es/ec2-use-win-prefix-detection
kind: faq
title: Nombres de host de Windows EC2 que comienzan por EC2AMAZ-
---

## Problema

En el Agent de Datadog v6 y v7, el nombre de host por defecto dentro de la aplicación para el Agent de plataformas UNIX en EC2 es `instance-id`. 
Para hosts de Windows, el nombre de host por defecto dentro de la aplicación para el Agent es el nombre de host del sistema operativo que empieza por `EC2AMAZ-`.

Para v6.18.0+ y v7.18.0+, el Agent registra la siguiente advertencia para hosts de Windows en EC2 donde el nombre de host comienza con `EC2AMAZ-`:

```
Es posible que desees utilizar el ID de instancia de EC2 para el nombre de host en la aplicación. Para obtener más información: https://docs.datadoghq.com/ec2-use-win-prefix-detection
```

## Resolución

Si ves el mensaje de advertencia anterior, tus opciones son:

* Seguir utilizando el nombre de host dentro de la aplicación (no hacer nada)
* Utilizar el identificador de instancia siguiendo las instrucciones siguientes

### ID de instancia de EC2 para el host de Windows en EC2

Para v6.15.0+ y v7.15.0+, Agent admite la opción de configuración `ec2_use_windows_prefix_detection` (por defecto: `false`). Cuando se establece en `true`, el nombre de host dentro de la aplicación para un host de Windows EC2 es el ID de instancia de:

* Nuevos hosts (activar esta opción funciona inmediatamente)
* Los hosts ya informan a Datadog. Tras la activación, envía un mensaje al [soporte de Datadog][1] para cambiar el nombre de host dentro de la aplicación por el ID de instancia de EC2.

[1]: /es/help/