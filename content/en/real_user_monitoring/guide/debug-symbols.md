---
title: Investigate Obfuscated Stack Traces with RUM Debug Symbols
description: "Debug and deobfuscate stack traces in RUM using debug symbols to investigate errors in obfuscated mobile and web applications."
---

The [RUM Debug Symbols page][1] lists all the debug symbols that are uploaded for a given type of RUM application. You can use this page to investigate obfuscated stack traces.

The following error message appears when a stack trace is not properly deobfuscated in RUM or Error Tracking: _The stack trace could not be deobfuscated because no debug symbols could be found for this application. If you are not obfuscating your application, ignore this message. Otherwise, upload your debug symbols to see deobfuscated stack traces. You can view all your uploaded symbols on the RUM Debug Symbols page._

{{< img src="real_user_monitoring/guide/debug-symbols/deobfuscation-failed-message.png" alt="Deobfuscation failed: The stack trace could not be deobfuscated because no mapping files could be found for this application. If you are not obfuscating your application, ignore this message. Otherwise, upload your mapping files to see deobfuscated stack traces. You can view all your uploaded files on the RUM Debug Symbols page." >}}

This can occur for a number of reasons:

### The stack trace was not obfuscated

Datadog tries to deobfuscate all stack traces, including stack traces that are not obfuscated (for example, from running local tests or for non-production builds).

You can ignore this warning. The stack trace is already readable.

### No debug symbols uploaded for this version

Use the [RUM Debug Symbols page][1] to see if there are debug symbols for your application. This page is filtered by **type** (JavaScript, Android, iOS, React Native, Flutter). Use the filter to find the debug symbols you are looking for.

If there are no debug symbols for your application, [upload them][2].

<div class="alert alert-danger">
Ensure that the size of each debug symbol does not exceed the limit of **500 MB**, otherwise the upload is rejected.
For iOS dSYMs, individual files up to **2 GB** are supported. 
</div>

### Debug symbol tags do not match

Datadog relies on different tags to match debug symbols with stack traces. These tags vary for each type of application:

| Application type | Tag combination used for matching |
| ---- | ---- |
| JavaScript | `service`, `version`, `path`|
| Android | v1.13.0+: `build_id`<br/> Older versions: `service`, `version`, `variant`|
| iOS | `uuid` |
| React Native | `service`, `version`, `bundle_name`, `platform`; if multiple source maps match on these fields, the one with the highest `build_number` is selected |
| Flutter | `service`, `version`, `variant`, `architecture` |

The [RUM Debug Symbols page][1] displays the values of these tags. If you find a mismatch, [upload the debug symbols][2] again with a corrected set of tags.



[1]: https://app.datadoghq.com/source-code/setup/rum
[2]: /real_user_monitoring/error_tracking/mobile/android/?tab=us#upload-your-mapping-file
