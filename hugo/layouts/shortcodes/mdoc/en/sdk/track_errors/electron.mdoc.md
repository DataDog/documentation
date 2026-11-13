The Electron SDK collects errors and crashes from the main process. The Browser SDK collects errors from renderer processes. See [Track Errors for the Browser SDK][1].

## Automated error reporting

After the SDK is initialized in the main process, it collects:

- Uncaught errors in the main process.
- Native crashes. The SDK stores a crash report locally and sends it the next time the application launches.

Electron symbols are resolved automatically. You do not need to upload debug symbols for native crashes.

## Manual error reporting

Use `addError` to report an error that your code handles:

```typescript
import { addError } from '@datadog/electron-sdk';

try {
  riskyOperation();
} catch (error) {
  addError(error, { context: { component: 'sync' } });
}
```

## Upload source maps

Upload source maps at build time so Error Tracking can display original source code in stack traces.

Stack traces collected in an Electron app contain the app's install path, which differs on each machine. The SDK rewrites the app path, as returned by `app.getAppPath()`, to `/` before sending events. For example, `/Users/alice/Applications/MyApp.app/Contents/Resources/app.asar/dist/main/index.js` becomes `/dist/main/index.js`. Other local paths are sent unchanged. URLs of renderers loaded from a custom protocol or `http(s)://` contain no install path and are not modified.

### Prepare your source maps

1. Configure your bundler to generate source maps that embed the original code (`sourcesContent`). See [Upload JavaScript source maps][2]. If you compile the main process with `tsc` and no bundler, set both `sourceMap: true` and `inlineSources: true`. Otherwise, stack traces resolve but show no code snippets.
2. Use a different `service` for the main process and for renderers. Datadog looks up source maps by service, version, and path, and the main process and a renderer can report the same path (for example, `/dist/index.js`). The main process reports the `service` passed to the Electron SDK `init()`. Renderers report the `service` passed to the Browser SDK `init()`.
3. Set a `version` in the `init()` of both SDKs. It is not set by default, and the `--release-version` of the upload must match it. See [Initialization parameters][3].

### Upload with `datadog-ci`

Use [`datadog-ci`][4] to upload source maps. The `--service` and `--release-version` values must match your SDK configuration. The `--minified-path-prefix` value must be the path at which the uploaded files appear in stack traces. Run `datadog-ci` from your Git working tree. It sends the repository URL and the commit of the uploaded sources so Error Tracking can link stack frames to your code.

The examples assume an app packaged with its `dist/` folder.

{% tabs %}
{% tab label="Main process" %}

Main process built to `dist/main/`:

```sh
datadog-ci sourcemaps upload ./dist/main \
  --service my-electron-app-main \
  --release-version "$VERSION" \
  --minified-path-prefix /dist/main/
```

{% /tab %}
{% tab label="Renderer (file://)" %}

Renderer loaded from `file://` and built to `dist/renderer/`:

```sh
datadog-ci sourcemaps upload ./dist/renderer \
  --service my-electron-app-renderer \
  --release-version "$VERSION" \
  --minified-path-prefix /dist/renderer/
```

{% /tab %}
{% tab label="Renderer (custom protocol)" %}

Renderer loaded from a custom protocol, for example `app://app/` serving the files of `dist/renderer/`. This requires Browser SDK 7.9.0 or later.

```sh
datadog-ci sourcemaps upload ./dist/renderer \
  --service my-electron-app-renderer \
  --release-version "$VERSION" \
  --minified-path-prefix app://app/
```

{% /tab %}
{% tab label="Renderer (http or https)" %}

Renderer loaded from `http(s)://`, for example a local server serving the files of `dist/renderer/` at its root:

```sh
datadog-ci sourcemaps upload ./dist/renderer \
  --service my-electron-app-renderer \
  --release-version "$VERSION" \
  --minified-path-prefix /
```

{% /tab %}
{% /tabs %}

## Limitations

Symbols of native extensions (native Node.js modules and addons) are not supported, so frames from these modules are not symbolicated in native crash reports.

[1]: /real_user_monitoring/setup/enable_rum/track_errors/?platform=browser
[2]: /real_user_monitoring/guide/upload-javascript-source-maps/
[3]: /real_user_monitoring/setup/enable_rum/advanced_configuration/?platform=electron#initialization-parameters
[4]: https://github.com/DataDog/datadog-ci
