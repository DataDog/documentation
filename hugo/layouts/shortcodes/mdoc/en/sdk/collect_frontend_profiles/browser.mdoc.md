{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiling_tab_in_explorer.png" 
alt="Browser profiling tab in the Sessions Explorer." 
style="width:100%;" /%}

Browser profiling provides visibility into how your application behaves in your users' browsers, helping you understand root causes behind unresponsive applications at page load or during the page life cycle. Use profiling data alongside RUM insights to identify which code executes during a [Long Animation Frame (LoAF)][1] and how JavaScript execution and rendering tasks impact user-perceived performance.

To get started, enable browser profiling in your RUM SDK configuration. After enabling it, click on a profiled event sample to see detailed profiling data.

### Setup

#### Step 1 - Set up RUM

{% alert %}
Browser SDK version 6.12 or later is required.
{% /alert %}

To start collecting data, set up [RUM Browser Monitoring][2].

#### Step 2 - Configure the profiling sampling rate

1. Initialize the RUM SDK and configure `profilingSampleRate`, which determines the percentage of sessions that are profiled (for example, 25% means profiling runs on 25 out of 100 ingested sessions).
    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      profilingSampleRate: 25,
      trackLongTasks: true,
      trackUserInteractions: true,
    })
    ```

2. Configure your web servers to serve HTML pages with the HTTP response header `Document-Policy: js-profiling`:
    ```javascript
        app.get("/", (request, response) => {
            … 
            response.set("Document-Policy", "js-profiling");
            …
        });
    ```

3. **Quota check**: Before starting a profiled session, the SDK makes a request to a quota API to determine whether the current RUM session will receive profiling data.

    If you use a [proxy][3] or [CSP][4], you must also allow the `quota.` subdomain of your site's standard intake origin (for example, `https://quota.browser-intake-datadoghq.com` for US1, serving the `/api/v2/profiling/quota` endpoint). See the full list of quota endpoints per site in the [Supported endpoints][5] section, and refer to the [proxy setup documentation][3] for details on routing subdomain-specific requests.

4. Set up Cross-Origin Resource Sharing (CORS) if needed.

      This step is required only if your JavaScript files are served from a different origin than your HTML. For example, if your HTML is served from `cdn.com` and JavaScript files from `static.cdn.com`, you must enable CORS to make JavaScript files visible to the profiler. For more information, see the [Browser profiling and CORS](#cors) section.
    
    To enable CORS:

    - Add a `crossorigin="anonymous"` attribute to `<script/>` tags
    - Make sure that JavaScript response includes the `Access-Control-Allow-Origin: *` HTTP header (or the proper origin value)
    
       ```javascript
       app.get("/", (request, response) => {
           … 
           response.header("Access-Control-Allow-Origin", "*");
           response.header("Access-Control-Allow-Headers",
           …
       });
       ```

{% collapse-content title="Browser profiling and CORS" id="cors"%}

##### Requirements for Cross-Origin Scripts (CORS)

If a script's execution or attribution information is to be surfaced in performance entries (and thus captured in browser profiling), the resource (for example, a JavaScript file) needs to be fetched with CORS headers that explicitly allow it to be shared with the origin making the measurement (your application).

To summarize:

- If a script is loaded from a same-origin source, then attribution is allowed, and you can see profiling data attributed to this script.
- If a script is loaded cross-origin _without_ a permissive CORS policy (like `Access-Control-Allow-Origin` allowing the page origin), then attribution is blocked, and you do not see profiling data attributed to this script.

This CORS policy restricts profiling to only scripts that are explicitly intended to be profiled by other origins.

##### How does CORS relate to browser profiling?

When you start Datadog's browser profiler (which uses the [JS Self-Profiling API][6]), the profiler can capture stack traces of JavaScript execution—but it only includes _attribution_ (function names, URLs, etc.) for the following scripts:

- Scripts that have the same origin as the page initiating the profiling
- Cross-origin scripts that explicitly opt-in using CORS

This protects third-party content and users from leaking execution details across security boundaries.

##### Why is the crossorigin="anonymous" attribute needed?

Without the `crossorigin="anonymous"` attribute, the browser does not make a CORS-enabled request for the script. The browser fetches the script without CORS, meaning:

- No CORS policy applies.
- No credentials (cookies, HTTP auth, etc.) are sent.
- The fetched script is not eligible for detailed attribution in performance entries or stack traces. These stack frames are displayed as "(anonymous)" or with no attribution.

To protect cross-origin script privacy, _both_ sides must agree to share information:
- The page must explicitly request a CORS-enabled fetch, with `crossorigin="anonymous"`.
- The server must permit this, with an `Access-Control-Allow-Origin` header in the response.

A script is eligible for attribution in the JS Self-Profiling API only when both of these conditions are met.

{% /collapse-content %}

### Explore profiling

#### Within the Sessions Explorer

Profiling data is captured on long tasks and rolls up to actions, views, vitals, and sessions. Use `@profiling.has_profile` to filter to profiled events and understand what code ran and how it affected the user's experience. This is available for sessions, views, actions, vitals, and long tasks.
- **View panel**: Profiling data in a new tab.
{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_sessions_explorer_view_panel.png" alt="Browser profiling tab in the View panel." style="width:100%;" /%}

- **Long Task panel**: Profiling data in the performance tab.
{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_sessions_explorer.png" alt="Browser profiling troubleshoot section example within the Optimization page." style="width:100%;" /%}

- **Vitals panel**: Profiling data in a new tab.
{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_sessions_explorer_vitals_panel.png" alt="Browser profiling tab in the Vitals panel." style="width:100%;" /%}

- **Action panel**: Profiling data in a new tab.
{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_sessions_explorer_action_panel.png" alt="Browser profiling tab in the Action panel." style="width:100%;" /%}

#### Within the Profiling page
{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_aggregate_experience.png" alt="Browser profiling aggregate experience." style="width:100%;" /%}

The Profiling page, found through the top bar navigation, lets you analyze and compare profiling data across sessions in one place. Use it to spot system level patterns, compare top-consuming functions, and prioritize optimizations instead of inspecting profiled sessions one by one. The guided experience walks you through:

1. **Focus on views**: Choose the views you'd like to analyze.
{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_aggregate_experience_step_1.png" alt="Step 1 of the browser profiling aggregate experience showing which views to select." style="width:100%;" /%}

2. **Select a measurement**: Pick a Core Web Vital, custom vital, or RUM action to dive into. Optionally, filter by RUM attributes such as version or OS, or narrow to a specific distribution such as p95.
{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_aggregate_experience_step_2.png" alt="Step 2 of the browser profiling aggregate experience showing which measurement to focus on." style="width:100%;" /%}

3. **Compare (Optional)**: Define two groups to compare side by side—for example, different versions, OS types, or percentile ranges—to isolate performance differences between them.
{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_aggregate_experience_step_3.png" alt="Step 3 of the browser profiling aggregate experience showing how to compare." style="width:100%;" /%}

4. **Investigate slowest functions**: Review which functions consume the most time in the aggregated profile so you can prioritize what to optimize first. Explore the call hierarchy to see how those functions relate and where time is spent across the stack, or if you chose to compare see the differences between group A and B.
{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_aggregate_experience_step_4a.png" alt="Step 4 of the browser profiling aggregate experience showing results to compare between groups." style="width:100%;" /%}
{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_aggregate_experience_step_4b.png" alt="Step 4 of the browser profiling aggregate experience showing a flamegraph and top methods list." style="width:100%;" /%}


#### Within the Optimization page

The **Optimization page** surfaces profiling data in several contexts:

- In the **Troubleshoot section**, Datadog samples long tasks across multiple views to identify your top contributing functions. Use this overview to find where JavaScript execution time is spent and which functions block the main thread, then optimize those functions to improve responsiveness.

{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_troubleshoot_section.png" alt="Browser profiling troubleshoot section example within the Optimization page." style="width:100%;" /%}

- Within the **Event Waterfall**, any long task that includes profiling data is marked with a yellow profiling icon. Click one of these long task events to open a Long Task view panel with detailed profiling data. Use this panel to identify blocking functions, trace their call stacks, and understand how script execution contributes to poor responsiveness.

{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_event_waterfall.png" alt="Browser profiling event waterfall example within the Optimization page." style="width:100%;" /%}

[1]: /real_user_monitoring/guide/browser-sdk-upgrade/#collect-long-animation-frames-as-long-tasks
[2]: /real_user_monitoring/application_monitoring/browser/setup/
[3]: /real_user_monitoring/guide/proxy-rum-data
[4]: /integrations/content_security_policy_logs
[5]: /real_user_monitoring/#supported-endpoints-for-sdk-domains
[6]: https://developer.mozilla.org/en-US/docs/Web/API/JS_Self-Profiling_API
