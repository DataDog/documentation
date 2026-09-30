---
description: Depure y desofusque trazas de pila en RUM usando símbolos de depuración
  para investigar errores en aplicaciones móviles y web ofuscadas.
title: Investigue trazas de pila ofuscadas con símbolos de depuración de RUM
---
La [página de Símbolos de Depuración de RUM][1] enumera todos los símbolos de depuración que se cargan para un tipo determinado de aplicación RUM. Puede usar esta página para investigar trazas de pila ofuscadas.

<div class="alert alert-info">Para asociar automáticamente las trazas de pila con su servicio y versión para la resolución del código fuente, use el <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context">complemento de compilación de Contexto de Código Fuente</a>.</div>

El siguiente mensaje de error aparece cuando una traza de pila no se desofusca correctamente en RUM o en Error Tracking: _No se pudo desofuscar la traza de pila porque no se encontraron símbolos de depuración para esta aplicación. Si no está ofuscando su aplicación, ignore este mensaje. De lo contrario, cargue sus símbolos de depuración para ver trazas de pila desofuscadas. Puede ver todos sus símbolos cargados en la página de Símbolos de Depuración de RUM._

{{< img src="real_user_monitoring/guide/debug-symbols/deobfuscation-failed-message.png" alt="Error de desofuscación: No se pudo desofuscar la traza de pila porque no se encontraron archivos de mapeo para esta aplicación. Si no está ofuscando su aplicación, ignore este mensaje. De lo contrario, cargue sus archivos de mapeo para ver trazas de pila desofuscadas. Puede ver todos sus archivos cargados en la página de Símbolos de Depuración de RUM." >}}

Esto puede ocurrir por varias razones:

### La traza de pila no estaba ofuscada {#the-stack-trace-was-not-obfuscated}

Datadog intenta desofuscar todas las trazas de pila, incluidas las que no están ofuscadas (por ejemplo, al ejecutar pruebas locales o para compilaciones que no son de producción).

Puede ignorar esta advertencia. La traza de pila ya es legible.

### No se cargaron símbolos de depuración para esta versión {#no-debug-symbols-uploaded-for-this-version}

Use la [página de Símbolos de Depuración de RUM][1] para ver si hay símbolos de depuración para su aplicación. Esta página está filtrada por {{< ui >}}type{{< /ui >}} (JavaScript, WebAssembly, Android, iOS, React Native, Flutter). Utilice el filtro para encontrar los símbolos de depuración que busca.

Si no hay símbolos de depuración para su aplicación, [cárguelos][2].

<div class="alert alert-danger">
Asegúrese de que el tamaño de cada símbolo de depuración no exceda el límite de **500 MB**; de lo contrario, la carga será rechazada.
Para dSYMs de iOS, se admiten archivos individuales de hasta **2 GB**. 
</div>

### Las etiquetas de los símbolos de depuración no coinciden con {#debug-symbol-tags-do-not-match}

Datadog depende de diferentes etiquetas para hacer coincidir los símbolos de depuración con las trazas de pila. Estas etiquetas varían para cada tipo de aplicación:

| Tipo de aplicación | Combinación de etiquetas utilizada para hacer coincidir |
| ---- | ---- |
| JavaScript | `service`, `version`, `path`|
| WebAssembly | `build_id` |
| Android | v1.13.0+: `build_id`<br/> Versiones anteriores: `service`, `version`, `variant`|
| iOS | `uuid` |
| React Native | `service`, `version`, `bundle_name`, `platform`; si varios mapas de origen coinciden en estos campos, se selecciona el de mayor `build_number` |
| Flutter | `service`, `version`, `variant`, `architecture` |

La [página de símbolos de depuración de RUM][1] muestra los valores de estas etiquetas. Si encuentra una discrepancia, cargue los símbolos de depuración nuevamente con un conjunto de etiquetas corregido.



[1]: https://app.datadoghq.com/source-code/setup/rum
[2]: /es/real_user_monitoring/error_tracking/mobile/android/?tab=us#upload-your-mapping-file