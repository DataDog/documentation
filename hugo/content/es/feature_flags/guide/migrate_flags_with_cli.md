---
description: Aprenda a usar Datadog Flag Migration CLI para migrar feature flags de
  otros proveedores a Datadog Feature Flags.
further_reading:
- link: /feature_flags/
  tag: Documentación
  text: Descripción general de Feature Flags
- link: /feature_flags/guide/migrate_from_launchdarkly
  tag: Guía
  text: Migre sus Feature Flags desde LaunchDarkly
title: Migre Flags con la CLI de migración de Flags
---
## Descripción general {#overview}

La [Datadog Flag Migration CLI][1] es una herramienta de línea de comandos que le ayuda a migrar feature flags de otros proveedores a [Datadog Feature Flags][2]. La CLI lee las definiciones de flags de un proveedor fuente y las recrea en Datadog, preservando las reglas de segmentación, las variaciones y las configuraciones de despliegue siempre que sea posible.

<div class="alert alert-info">Si migra flags desde Eppo, estos conservan la asignación a grupos compatible con Eppo. Los sujetos existentes siguen recibiendo las mismas variantes después de que usted cambie la evaluación de flags a Datadog.</div>

## Requisitos previos {#prerequisites}

Antes de ejecutar la CLI, asegúrese de que su organización de Datadog esté configurada:

- **Usuarios y Teams**: Su organización de Datadog debe estar aprovisionada con los usuarios y equipos necesarios para administrar flags. La CLI no crea usuarios ni equipos para usted.
- **Feature Flag Environments**: Los [entornos de Feature Flag][3] a los que planea migrar deben crearse antes de ejecutar la CLI. La CLI no crea entornos para usted.

Para obtener detalles sobre cómo funciona la migración y los proveedores que admite, consulte el [repositorio de GitHub][1].

## Ejecute la CLI {#run-the-cli}

Ejecute la migración con `npx`:

```bash
npx @datadog/dd-flag-migration migrate
```

Para conocer todas las opciones de configuración, los proveedores fuente admitidos, la configuración de autenticación y la solución de problemas, consulte el [`dd-flag-migration` README en GitHub][1].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-flag-migration
[2]: /es/feature_flags/
[3]: /es/feature_flags/concepts/environments/