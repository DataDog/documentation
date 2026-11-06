---
description: Utilice el patrón Multi-Provider de OpenFeature con un proveedor en memoria
  para anular localmente las variantes de Feature Flags durante la prueba.
further_reading:
- link: /feature_flags/server/
  tag: Documentación
  text: Feature Flags del lado del servidor
- link: /feature_flags/client/javascript/
  tag: Documentación
  text: Feature Flags de JavaScript
- link: /feature_flags/browser_developer_extension/
  tag: Documentación
  text: Extensión para desarrolladores de navegador
- link: https://openfeature.dev/specification/appendix-a/#multi-provider
  tag: OpenFeature
  text: Especificación de Multi-Provider
- link: https://openfeature.dev/blog/openfeature-multi-provider-release/
  tag: OpenFeature
  text: Lanzamiento de OpenFeature Multi-Provider
title: Anulaciones locales de marcadores con el patrón de proveedor múltiple
---
## Descripción general {#overview}

Cuando prueba o hace una demostración de una integración de Feature Flags, a menudo necesita forzar una variante específica sin cambiar la configuración de Feature Flags en Datadog. El patrón [OpenFeature Multi-Provider][1] combina un `InMemoryProvider` con su proveedor de Datadog para que las anulaciones locales tengan prioridad mientras todos los demás Feature Flags continúan resolviéndose desde Datadog.

Los casos de uso típicos incluyen:

- Control de calidad y pruebas manuales de variantes de Feature Flags específicas
- Desarrollo local sin editar la configuración de Feature Flags en la interfaz de usuario
- Demostraciones y flujos de trabajo de soporte donde un compañero de equipo necesita una variante predecible bajo demanda de Feature Flags

<div class="alert alert-warning">Utilice anulaciones locales solo en entornos que no sean de producción. Restrinja o deshabilite este patrón en compilaciones de producción para que los usuarios finales no puedan cambiar el comportamiento de los Feature Flags a través de la configuración local.</div>

Si su aplicación se ejecuta en el navegador, la pestaña **Feature Flags** en la [extensión para desarrolladores del SDK de navegador de Datadog][3] proporciona el mismo comportamiento de anulación local a través de un panel de Chrome DevTools, sin la composición de proveedores descrita en esta página.

## Cómo funcionan las anulaciones de Feature Flags locales {#how-local-flag-overrides-work}

El Multi-Provider de OpenFeature envuelve múltiples proveedores detrás de un solo cliente. De forma predeterminada, utiliza la estrategia _First Match_:

1. Si el primer proveedor devuelve un valor para el Feature Flag, se utiliza ese valor y se omiten los proveedores posteriores.
2. Si el primer proveedor devuelve `FLAG_NOT_FOUND`, la evaluación continúa con el siguiente proveedor de Feature Flags.
3. Datadog sirve como respaldo para cualquier Feature Flag que no esté presente en el conjunto de anulaciones en memoria.

Los proveedores se evalúan en el orden en que usted los registra. Coloque el `InMemoryProvider` _primero_ en la lista de proveedores para que las anulaciones tengan prioridad sobre Datadog.

Para obtener más detalles sobre las estrategias de evaluación, consulte [First Match strategy][2] en la especificación de OpenFeature.

## Ejemplos de anulación del cliente {#client-override-examples}

<div class="alert alert-info">El patrón de anulación Multi-Provider es compatible con <a href="/feature_flags/client/javascript/">JavaScript</a>, <a href="/feature_flags/client/react/">React</a>, <a href="/feature_flags/client/angular/">Angular</a>, <a href="/feature_flags/client/reactnative/">React Native</a>, <a href="/feature_flags/client/ios/">iOS</a> y <a href="/feature_flags/client/android/">Android</a>. En los SDK de iOS y Android, <code>MultiProvider</code> está disponible, pero los SDK de OpenFeature no incluyen un proveedor en memoria integrado. Implemente un pequeño proveedor personalizado <code>FeatureProvider</code> en su lugar, como se muestra en la documentación de pruebas de <a href="/feature_flags/client/ios/#testing">iOS</a> y <a href="/feature_flags/client/android/#testing">Android</a>.</div>

Los siguientes ejemplos utilizan JavaScript de navegador y muestran dos formas comunes de completar las anulaciones. Adapte la función `loadOverrides` para que coincida con la forma en que su equipo prefiere establecer las anulaciones, o al mecanismo de almacenamiento disponible en su plataforma (por ejemplo, <code>UserDefaults</code> en iOS o <code>SharedPreferences</code> en Android).

### Parámetros de consulta de URL {#url-query-parameters}

Leer las anulaciones de la URL de la página al iniciar. Este enfoque es útil cuando el equipo de control de calidad o soporte necesita compartir un enlace que fuerce variantes específicas:

{{< code-block lang="javascript" >}}
import { InMemoryProvider, MultiProvider, OpenFeature } from '@openfeature/web-sdk';
import { DatadogProvider } from '@datadog/openfeature-browser';

const OVERRIDE_QUERY_PREFIX = 'ff.';

function buildInMemoryFlags(overrides) {
  return Object.fromEntries(
    Object.entries(overrides).map(([flagKey, value]) => [
      flagKey,
      {
        variants: { forced: value },
        defaultVariant: 'forced',
        disabled: false,
      },
    ]),
  );
}

function loadOverrides() {
  const overrides = {};
  const params = new URLSearchParams(window.location.search);

  for (const [key, value] of params.entries()) {
    if (!key.startsWith(OVERRIDE_QUERY_PREFIX)) continue;
    const flagKey = key.slice(OVERRIDE_QUERY_PREFIX.length);
    if (flagKey) overrides[flagKey] = value;
  }

  return overrides;
}

export async function initializeFeatureFlags({
  clientToken,
  applicationId,
  env,
  service,
}) {
  const datadogProvider = new DatadogProvider({
    clientToken,
    applicationId,
    env,
    service,
  });

  await OpenFeature.setProviderAndWait(
    new MultiProvider([
      { provider: new InMemoryProvider(buildInMemoryFlags(loadOverrides())) },
      { provider: datadogProvider },
    ]),
  );
}
{{< /code-block >}}

Un evaluador podría añadir `?ff.checkout_new=true&ff.ui_theme=dark` a la URL de la página para forzar esas variantes.

### localStorage {#localstorage}

Persistir las anulaciones entre recargas de página leyendo desde `localStorage`. Este enfoque es útil cuando un desarrollador cambia los Feature Flags desde un panel de depuración local:

{{< code-block lang="javascript" >}}
import { InMemoryProvider, MultiProvider, OpenFeature } from '@openfeature/web-sdk';
import { DatadogProvider } from '@datadog/openfeature-browser';

const OVERRIDE_STORAGE_KEY = 'ff_overrides';

function buildInMemoryFlags(overrides) {
  return Object.fromEntries(
    Object.entries(overrides).map(([flagKey, value]) => [
      flagKey,
      {
        variants: { forced: value },
        defaultVariant: 'forced',
        disabled: false,
      },
    ]),
  );
}

function loadOverrides() {
  const raw = localStorage.getItem(OVERRIDE_STORAGE_KEY);
  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function initializeFeatureFlags({
  clientToken,
  applicationId,
  env,
  service,
}) {
  const datadogProvider = new DatadogProvider({
    clientToken,
    applicationId,
    env,
    service,
  });

  await OpenFeature.setProviderAndWait(
    new MultiProvider([
      { provider: new InMemoryProvider(buildInMemoryFlags(loadOverrides())) },
      { provider: datadogProvider },
    ]),
  );
}
{{< /code-block >}}

Establezca las anulaciones desde un panel de depuración o la consola del navegador, luego recargue la página:

{{< code-block lang="javascript" >}}
localStorage.setItem('ff_overrides', JSON.stringify({
  checkout_new: true,
  ui_theme: 'dark',
}));
{{< /code-block >}}

## Ejemplos de anulación del servidor {#server-override-examples}

En el servidor, complete el proveedor en memoria al iniciar el proceso desde cualquier fuente local. Las variables de entorno y los mapas de configuración estática son dos enfoques comunes.

<div class="alert alert-info">La utilidad Multi-Provider está disponible en los SDK de OpenFeature para <a href="/feature_flags/server/nodejs/">Node.js</a>, <a href="/feature_flags/server/go/">Go</a>, <a href="/feature_flags/server/java/">Java</a>, <a href="/feature_flags/server/php/">PHP</a> y <a href="/feature_flags/server/dotnet/">.NET</a>.</div>

### Variables de entorno {#environment-variables}

Lea las anulaciones de las variables de entorno al iniciar. Este enfoque es útil para ejecuciones locales únicas o trabajos de CI que necesitan una variante específica:

{{< tabs >}}
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
import { MultiProvider, OpenFeature, TypedInMemoryProvider } from '@openfeature/server-sdk';
import tracer from 'dd-trace';

const OVERRIDE_ENV_PREFIX = 'FF_';

function buildInMemoryFlags(overrides) {
  return Object.fromEntries(
    Object.entries(overrides).map(([flagKey, value]) => [
      flagKey,
      {
        variants: { forced: value },
        defaultVariant: 'forced',
        disabled: false,
      },
    ]),
  );
}

function loadOverrides() {
  const overrides = {};

  for (const [key, value] of Object.entries(process.env)) {
    if (!key.startsWith(OVERRIDE_ENV_PREFIX) || value === undefined) continue;
    const flagKey = key.slice(OVERRIDE_ENV_PREFIX.length);
    if (flagKey) overrides[flagKey] = value;
  }

  return overrides;
}

export async function initializeFeatureFlags() {
  tracer.init();

  const overrideProvider = new TypedInMemoryProvider(
    buildInMemoryFlags(loadOverrides()),
  );

  await OpenFeature.setProviderAndWait(
    new MultiProvider([
      { provider: overrideProvider },
      { provider: tracer.openfeature },
    ]),
  );
}
{{< /code-block >}}
{{% /tab %}}
{{% tab "Go" %}}

<div class="alert alert-info">El paquete Multi-Provider de Go es experimental y puede cambiar en futuras versiones.</div>

{{< code-block lang="go" >}}
const overrideEnvPrefix = "FF_"

func loadOverrides() map[string]any {
    overrides := make(map[string]any)

    for _, entry := range os.Environ() {
        parts := strings.SplitN(entry, "=", 2)
        if len(parts) != 2 || !strings.HasPrefix(parts[0], overrideEnvPrefix) {
            continue
        }
        flagKey := strings.TrimPrefix(parts[0], overrideEnvPrefix)
        if flagKey != "" {
            overrides[flagKey] = parts[1]
        }
    }

    return overrides
}

func buildInMemoryFlags(overrides map[string]any) map[string]memprovider.InMemoryFlag {
    flags := make(map[string]memprovider.InMemoryFlag, len(overrides))

    for flagKey, value := range overrides {
        flags[flagKey] = memprovider.InMemoryFlag{
            State:          memprovider.Enabled,
            DefaultVariant: "forced",
            Variants:       map[string]any{"forced": value},
        }
    }

    return flags
}

func initializeFeatureFlags() error {
    tracer.Start()
    defer tracer.Stop()

    datadogProvider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        return err
    }
    defer datadogProvider.Shutdown()

    overrideProvider := memprovider.NewInMemoryProvider(buildInMemoryFlags(loadOverrides()))

    multiProvider, err := multi.NewProvider(
        multi.StrategyFirstMatch,
        multi.WithProvider("overrides", overrideProvider),
        multi.WithProvider("datadog", datadogProvider),
    )
    if err != nil {
        return err
    }

    return openfeature.SetProviderAndWait(multiProvider)
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

<div class="alert alert-info">La API Multi-Provider de Java es experimental y puede cambiar en futuras versiones.</div>

{{< code-block lang="java" >}}
private static final String OVERRIDE_ENV_PREFIX = "FF_";

private static Map<String, Object> loadOverrides() {
    Map<String, Object> overrides = new HashMap<>();

    for (Map.Entry<String, String> entry : System.getenv().entrySet()) {
        String key = entry.getKey();
        if (!key.startsWith(OVERRIDE_ENV_PREFIX)) {
            continue;
        }
        String flagKey = key.substring(OVERRIDE_ENV_PREFIX.length());
        if (!flagKey.isEmpty()) {
            overrides.put(flagKey, entry.getValue());
        }
    }

    return overrides;
}

private static Map<String, Flag<?>> buildInMemoryFlags(Map<String, Object> overrides) {
    Map<String, Flag<?>> flags = new HashMap<>();

    for (Map.Entry<String, Object> entry : overrides.entrySet()) {
        Object value = entry.getValue();
        Flag.Builder<?> builder = Flag.builder().defaultVariant("forced");

        if (value instanceof Boolean boolValue) {
            builder.variant("forced", boolValue);
        } else if (value instanceof Number numberValue) {
            builder.variant("forced", numberValue.doubleValue());
        } else {
            builder.variant("forced", value.toString());
        }

        flags.put(entry.getKey(), builder.build());
    }

    return flags;
}

public static void initializeFeatureFlags() throws Exception {
    InMemoryProvider overrideProvider = new InMemoryProvider(buildInMemoryFlags(loadOverrides()));
    Provider datadogProvider = new Provider();

    MultiProvider multiProvider = new MultiProvider(
        List.of(overrideProvider, datadogProvider)
    );

    OpenFeatureAPI api = OpenFeatureAPI.getInstance();
    api.setProviderAndWait(multiProvider);
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

Establezca `FF_checkout_new=true` y `FF_ui_theme=dark` en el entorno antes de iniciar el proceso para forzar esas variantes.

## Evalúe marcadores {#evaluate-flags}

Después de la inicialización, evalúe los Feature Flags a través del cliente de OpenFeature como de costumbre. Los Feature Flags sobrescritos devuelven el valor forzado; todas las demás Feature Flags se resuelven desde Datadog.

{{< tabs >}}
{{% tab "Navegador" %}}

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
const isEnabled = client.getBooleanValue('checkout_new', false);
{{< /code-block >}}

{{% /tab %}}
{{% tab "Servidor" %}}

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
const isEnabled = await client.getBooleanValue('checkout_new', false, {
  targetingKey: req.session?.userID ?? 'unknown',
});
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/specification/appendix-a/#multi-provider
[2]: https://openfeature.dev/specification/appendix-a/#first-match-strategy
[3]: /es/feature_flags/browser_developer_extension/