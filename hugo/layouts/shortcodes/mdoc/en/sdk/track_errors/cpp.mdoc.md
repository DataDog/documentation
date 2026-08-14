### Automated error reporting

To report crashes (such as `SIGSEGV`/`SIGABRT` on Linux/macOS, or structured exceptions on Windows), register the `CrashReporting` feature before starting the core:

{% tabs %}
{% tab label="C++" %}
```cpp
#include "datadog.hpp"

datadog::CoreConfig config("<client_token>", "<service_name>", "<environment>");
auto core = datadog::Core::Create(config, datadog::TrackingConsent::Granted);
auto crash_reporting = datadog::CrashReporting::Register(core);

datadog::RumConfig rum_config("<rum_application_id>");
auto rum = datadog::Rum::Register(core, rum_config);

core->Start();
```
{% /tab %}
{% tab label="C (FFI)" %}
```c
#include "datadog.h"

dd_core_config_t config;
dd_core_config_init(&config, "<client_token>", "<service_name>", "<environment>");
dd_core_t* core = dd_core_create(&config, DD_TRACKING_CONSENT_GRANTED);
dd_crash_reporting_t* crash_reporting = dd_crash_reporting_init(core, NULL);

dd_rum_config_t rum_config;
dd_rum_config_init(&rum_config, "<rum_application_id>");
dd_rum_t* rum = dd_rum_init(core, &rum_config);

dd_core_start(core);
```
{% /tab %}
{% /tabs %}

By default, crashes are captured in-process. See [C++ Crash Reporting and Error Tracking][1] for the available crash reporting modes and their trade-offs.

### Get symbolicated crash reports

Upload your debug symbols to Datadog so stack traces can be symbolicated. See [Symbolication][2] in the C++ Crash Reporting and Error Tracking guide for the full setup.

[1]: /real_user_monitoring/application_monitoring/cpp/error_tracking/#crash-reporting-modes
[2]: /real_user_monitoring/application_monitoring/cpp/error_tracking/#symbolication
