---
"app_id": "webassembly-observe-sdk"
"app_uuid": "30eb706f-9143-461e-99af-89015e8493d5"
"assets": {}
"author":
  "homepage": "https://dylibso.com"
  "name": Dylibso
  "sales_email": sales@dylibso.com
  "support_email": support@dylibso.com
"categories":
- developer tools
- languages
- tracing
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/dylibso-webassembly/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "dylibso-webassembly"
"integration_id": "webassembly-observe-sdk"
"integration_title": "WebAssembly Observe SDK"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "dylibso-webassembly"
"public_title": "WebAssembly Observe SDK"
"short_description": "Extract traces from WebAssembly (wasm) code from any runtime"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Developer Tools"
  - "Category::Languages"
  - "Category::Tracing"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Submitted Data Type::Traces"
  "configuration": "README.md#Setup"
  "description": Extract traces from WebAssembly (wasm) code from any runtime
  "media":
  - "caption": Visualize captured traces from WebAssembly code running in your application
    "image_url": images/wasm-observability.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": WebAssembly Observe SDK
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This integration provides function traces from WebAssembly (WASM) code running in your application. Gain insight into WebAssembly code performance as well as the following behavior:
- Function call duration
- Execution tracing
- Memory allocation

Since WebAssembly code is executed in a secure and constrained environment, traditional techniques to monitor code do not work. Our specialized observability stack allows you to continuously monitor WASM modules at the same level you expect of your other applications.

Datadog customers can use our open source SDKs and Adapters to emit full traces from your WASM programs. Please see the [`dylibso/observe-sdk`][1] repository to install the Datadog Adapter for your application.

In addition, Dylibso provides automatic instrumentation tooling which can take any existing WASM module and recompile it to include function and memory allocation tracing. For more information, contact [support@dylibso.com][2] or learn more about [automatic WebAssembly instrumentation][3].


## Setup

### Installation

Depending on the programming language your application is written in, choose one of the appropriate Datadog Adapters from [`dylibso/observe-sdk`][1] on GitHub.


### Configuration

In order to connect the SDK and Adapter to your Datadog Agent, you must have the following information ready:

1. Your Datadog Agent host URL.
2. The service name of the application where the SDK and Adapter are imported.

### Validation

After you have imported and configured your Datadog Adapter from the available options within the Observe SDK:

1. Redeploy your application so the Datadog Adapter is included where you're calling WebAssembly code.
2. Ensure that a WebAssembly module (`.wasm`) has been loaded and you are calling one of its exported functions.
3. Check in your Datadog dashboard for traces sent from your service.

## Data Collected

### Events

WebAssembly Observe SDK collects traces of function execution and memory allocation events from your application.

## Troubleshooting

Need help? Contact [Dylibso support][2].

[1]: https://github.com/dylibso/observe-sdk
[2]: mailto:support@dylibso.com
[3]: https://dylibso.com/products/observe

