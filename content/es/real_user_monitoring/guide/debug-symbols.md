---
title: Investigar stack traces enmascaradas con RUM Debug Symbols
---

La [página RUM Debug Symbols][1] enumera todos los símbolos de depuración que están cargados para un tipo determinado de aplicación RUM. Puedes usar esta página para investigar stack traces enmascaradas.

El siguiente mensaje de error aparece cuando una stack trace no se desenmascara correctamente en RUM o Error Tracking: _La stack trace no se pudo desenmascarar porque no se encontraron símbolos de depuración para esta aplicación. Si no estás enmascarando tu aplicación, ignora este mensaje. De lo contrario, carga tus símbolos de depuración para ver las stack traces desenmascaradas. Puedes ver todos los símbolos cargados en la página RUM Debug Symbols._

{{< img src="real_user_monitoring/guide/debug-symbols/deobfuscation-failed-message.png" alt="Error de desenmascaramiento: La stack trace no se pudo desenmascarar porque no se encontraron archivos de asignación para esta aplicación. Si no estás enmascarando tu aplicación, ignora este mensaje. De lo contrario, carga tus archivos de asignación para ver las stack traces desenmascaradas. Puedes ver todos los archivos cargados en la página RUM Debug Symbols." >}}

Esto puede ocurrir por varios motivos:

### La stack trace no estaba enmascarada

Datadog intenta desenmascarar todas las stack traces, incluidas las stack traces que no están enmascaradas (por ejemplo, de la ejecución de tests locales o para creaciones que no son de producción).

Puedes ignorar esta advertencia. La stack trace ya es legible.

### No se han cargado símbolos de depuración para esta versión

Utiliza la [página RUM Debug Symbols][1] para ver si hay símbolos de depuración para tu aplicación. Esta página está filtrada por **tipo** (JavaScript, Android, iOS, React Native, Flutter). Utiliza el filtro para encontrar los símbolos de depuración que buscas.

Si no hay símbolos de depuración para tu aplicación, [cárgalos][2].

<div class="alert alert-danger">
Asegúrate de que el tamaño de cada símbolo de depuración no supere el límite de **500 MB**; de lo contrario, se rechazará la carga.
Para los dSYM de iOS, se admiten archivos individuales de hasta **2 GB**. 
</div>

### Las etiquetas (tags) de los símbolos de depuración no coinciden

Datadog se basa en diferentes etiquetas (tags) para hacer coincidir los símbolos de depuración con stack traces. Estas etiquetas (tags) varían para cada tipo de aplicación:

| Tipo de aplicación | Combinación de etiquetas (tags) utilizada para el emparejamiento |
| ---- | ---- |
| JavaScript | `service`, `version`, `path`|
| Android | v1.13.0: `build_id`<br/> Versiones anteriores: `service`, `version`, `variant`|
| iOS | `uuid` |
| React Native | `service`, `version`, `bundle_name`, `platform`; si varios mapas de fuentes coinciden en estos campos, se selecciona el que tenga el `build_number` más alto |
| Flutter | `service`, `version`, `variant`, `architecture` |

La [página RUM Debug Symbols][1] muestra los valores de estas etiquetas (tags). Si encuentras un desajuste, [carga los símbolos de depuración][2] de nuevo con un conjunto corregido de etiquetas (tags).



[1]: https://app.datadoghq.com/source-code/setup/rum
[2]: /es/real_user_monitoring/error_tracking/mobile/android/?tab=us#upload-your-mapping-file