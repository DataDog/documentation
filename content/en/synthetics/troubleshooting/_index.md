---
title: Synthetic Monitoring Troubleshooting
description: Troubleshoot common Synthetic Monitoring issues.
further_reading:
- link: "/synthetics/"
  tag: "Documentation"
  text: "Manage your Synthetic tests"
- link: "/synthetics/browser_tests/"
  tag: "Documentation"
  text: "Configure a browser test"
- link: "/synthetics/api_tests/"
  tag: "Documentation"
  text: "Configure an API test"
- link: "/synthetics/private_locations/"
  tag: "Documentation"
  text: "Create a private location"
---

## Overview

Use this page to troubleshoot common issues with Datadog Synthetic Monitoring setup and configuration. For additional assistance, contact [Datadog Support][1].

## Common error messages

Use this table to find troubleshooting steps for common errors.

| Error message                                  | See section |
|------------------------------------------------|-------------|
| `self-signed certificate in certificate chain` | [Private Locations → Certificates](?tab=windows#self-signed-certificate-errors) |
| `401 Unauthorized`                           | [API and Browser Tests → Unauthorized](#api-and-browser-tests) |
| `Element not found`                            | [Test execution → Element selection issues](#element-detection-warning-in-browser-test-steps) |
| `Unsupported browser version`                  | [Private Locations → Browser compatibility](?tab=common#requirements-for-browser-tests-running-on-private-location) |


## API tests

### Network timings are varied

If you see a sudden spike or overall increase in your API test [timing metrics][2], this usually indicates a bottleneck or delay in the request. For more information, see [API Test Timings and Variations][3].

## Browser tests

### Recording

#### The website is not loading in the iframe

If your website doesn't appear in the Browser Test recorder's iframe after installing the [Datadog extension][4], you may see the message `Your website does not support being loaded through an iframe`. This indicates that your application's security settings prevent iframe loading.

Similarly, if login attempts fail during iframe recording, your application may be blocking certain requests.

**Solution**: Click **Open in Popup** to record your user journey in a separate window instead of the iframe.  

#### Only certain applications load in the iframe

Different applications and environments have varying security restrictions. Some allow iframe loading while others block it for security reasons.

#### HTTP requests warning banner appears in iframe

This warning appears when attempting to record on an `http` page. The recorder iframe only supports `https` pages. **Solution**: Either open your page in a pop-up window or change your URL to use `https`. 

#### Website fails to load and recording doesn't work in iframe or pop-up

If your website doesn't appear in the Browser test recorder's iframe after installing the [Datadog extension][4], and recording fails in both iframe and pop-up modes:

   {{< img src="synthetics/recording_iframe.mp4" alt="Issues recording Browser test steps" video="true" width="100%" >}}

   **Solution**: Verify that the [Datadog extension][5] has proper permissions by either specifying your website in the `On specific sites` section or enabling `On all sites`:

   {{< img src="synthetics/extension.mp4" alt="Allowing extension to read data on all sites" video="true" width="100%" >}}

#### Recording steps fails on application

Chrome browser policies may prevent the extension from recording properly.

**Solution**: Check `chrome://policy` for extension-related settings such as [`ExtensionSettings`][6] that might be blocking the recorder.

#### Login page not visible in recorder

The recorder iframe/pop-up uses your current browser session by default. If you're already logged into your application, it may skip the login page and go directly to the post-login view, preventing you from recording authentication steps.

**Solution**: Use the recorder's **incognito mode** to record login steps without logging out of your current session:

{{< img src="synthetics/incognito_mode.mp4" alt="Using Incognito Mode Browser Tests" video="true" width="100%" >}}

**Incognito mode** creates an isolated session that ignores your browser history, cookies, and login data. This allows you to record login steps from scratch, as if visiting your website for the first time.

### Test results

#### Mobile and tablet browser tests consistently fail

**Responsive** websites may have significantly different DOM structures across devices. A website's DOM on `Laptop Large` can differ greatly from `Tablet` or `Mobile Small` viewports.

Steps recorded on `Laptop Large` may not work on smaller viewports, causing mobile and tablet tests to fail:

{{< img src="synthetics/device_failures.png" alt="Mobile Tablet Device Failing" style="width:100%;" >}}

**Solution**: Create device-specific tests where recorded steps match the target viewport.

To record for mobile or tablet viewports, select `Mobile Small` or `Tablet` in the recorder dropdown before clicking **Start Recording**.

{{< img src="synthetics/record_device.png" alt="Recording steps on mobile tablet" style="width:100%;" >}}

**Note**: Browser tests run in **headless** mode and don't support certain features like `touch` events for mobile design detection.

#### Element detection warning in browser test steps

Browser Test steps may display a `None or multiple elements detected` warning:

{{< img src="synthetics/step_warning.png" alt="User locator step warning" style="width:100%;" >}}

This indicates the user locator targets multiple elements or none at all, preventing the test from knowing which element to interact with.

**Solution**: Edit your recording, open the problematic step's advanced options, navigate to the test page, and click `Test`. This highlights the located element or shows an error. Adjust your user locator to target a single, unique element:

{{< img src="synthetics/fix_user_locator.mp4" alt="Fixing User Locator error" video="true" width="100%" >}}

#### CSS pointer property limitations

Automated browsers cannot emulate the CSS `pointer` media feature. All browser tests use `pointer: none` regardless of device type (laptop, tablet, or mobile).

### Resource duration

#### Resource duration exceeds step duration

Resources with long load times may span multiple test steps. Datadog returns all resources initiated during a specific step, but allows approximately 20 seconds for critical network calls to complete before proceeding to the next step.

The synthetics worker uses hierarchical timeouts to balance speed and reliability. Therefore, [step duration][14] should not be used to measure web application performance, it reflects the time needed for reliable test execution.

## API and Browser Tests

### Unauthorized errors

A 401 error in Synthetic Monitoring tests typically indicates authentication failure. Use the same authentication method (outside of Datadog) you normally use for the endpoint and replicate it in your Synthetic test configuration.

* Is your endpoint using **header-based authentication**?
  * **Basic Authentication**: Specify the associated credentials in the **Advanced options** of your [HTTP][7] or [Browser Test][8].
  * **Token based authentication**: Extract your token with a first [HTTP test][7], create a [global variable][9] by parsing the response of that first test, and re-inject that variable in a second [HTTP][7] or [Browser Test][10] requiring the authentication token.
  * **Session based authentication**: Add the required headers or cookies in the **Advanced options** of your [HTTP][7] or [Browser Test][8].
  
* Does your endpoint use **query parameter authentication** (such as adding an API key to URL parameters)?

* Does your endpoint use **IP-based authentication**? If so, allow the [Synthetic Monitoring IP ranges][11] in your firewall or security settings.

### Forbidden errors

If you observe `403 Forbidden` errors returned by Synthetic Monitoring tests, it may be the result of your web server blocking or filtering requests that include the `Sec-Datadog` header. This header is added to each Synthetic request Datadog initiates to identify the source of the traffic and assist Datadog support in identifying the specific test execution.  

Additionally, you might also have to ensure [Datadog Synthetic Monitoring IP ranges][11] are allowed as traffic sources by your firewalls.

### Missing notifications

Synthetic tests do not [renotify][12] by default. If you add notification handles (email addresses or Slack handles) after a state transition occurs (such as a test entering alert or recovering), no notification is sent for that transition. Notifications are only sent for subsequent transitions.

## Mobile tests

### Unable to launch a device recording

Applications with startup security checks (such as USB debugging verification) may prevent recording. Upload a version of your application without these security checks for optimal test recording. 

### App functionality issues during recording and execution

IOS app features may not function properly during recording or execution due to the app resigning process. This process, required for device trust, can remove essential iOS entitlements (Contacts, Camera, Keychain, Photos, Health Kit, Home Kit, etc.).

**Solution**: Use Ad Hoc or Development provisioning profiles when distributing your iOS app to minimize entitlement-related issues and improve compatibility.

## Network Path tests

### Datadog Agent not listed as an option in Locations & Agents

If you do not see the Datadog Agent listed as a selectable option during test creation, verify that you meet all prerequisites and completed the setup steps. See [Agent configuration][16] for more information.

### Scheduled tests from the Datadog Agent is not running at the expected schedule

In large or high-volume environments, scheduled tests may not run at the expected intervals if the Datadog Agent does not have enough workers to handle concurrent executions. To optimize performance and maintain consistent scheduling, [increase the number of workers][17] to meet or exceed the total number of tests assigned to the Agent.

### Missing test results executed from the Datadog Agent

If you do not see test results in the Datadog UI, the Datadog Agent is not sending test results to the Synthetics intake (https://http-synthetics.datadoghq.com) that processes test results. Verify that outbound network traffic from the Datadog Agent to this intake is allowed.

If the Datadog Agent is running behind a proxy, make sure the Synthetics forwarder is configured to send traffic through the proxy, for example:
```
synthetics: 
  collector: 
    enabled: true
synthetics.forwarder.dd_url: http://my-proxy.com:<proxy-port>
```
Additionaly, ensure that the proxy itself is configured to allow outboud network traffic to the Synthetics intake.

## Private locations

{{< tabs >}}
{{% tab "Common" %}}

### Private Location unable to fetch tests due to 403 error

A Private Locations displays this error when it is attempting to fetch tests from Datadog:

```
Queue error - onFetchMessagesLongPolling - Got 403 in request - {"errors":["Expired/not yet valid signature"]}
Error: Got 403 in request - {"errors":["Expired/not yet valid signature"]}
    at Function.QueueError.fromHTTPError (dist/build/index.js:259354:12)
    at DatadogQueue.receiveMessages (dist/build/index.js:258914:48)
```

**Cause**: The log shows that the Private Location was able to successfully reach the Synthetics intake to fetch tests, but the request failed with a 403 response from Datadog due to an authentication issue. Specifically, the request signature was considered expired or not yet valid. Communication between the Private Location and Datadog is secured using Datadog Signature v1 (based on the same signing process as [AWS Signature v4][105]) which includes a timestamp in each request, ensuring both authentication and integrity). If the system clock on the server hosting the Private Location is out of sync, the timestamp can fall outside the allowed window, and the signature validation fails.

**Solution**: Ensure the server hosting the Private Location has accurate time synchronization. If NTP (Network Time Protocol) services are in use, verify that these services are correctly configured and functioning properly, and address any misconfigurations that could prevent the system clock from syncing with its time sources.

### Browser tests show `Page crashed` errors

Page crashes typically indicate resource exhaustion on private location workers. Ensure your private location workers have [sufficient memory resources][101].

### Test execution is slower than expected

Slow test execution typically indicates resource exhaustion on private location workers. Ensure your private location workers have [sufficient CPU resources][103].

### My browser tests are taking too long to run

Confirm you are not seeing [out of memory issues][102] with your private location deployments. If you have tried scaling your workers instances following the [dimensioning guidelines][101] already, reach out to [Datadog Support][104].

### Requirements for browser tests running on private location

Browser tests require elevated privileges to spawn (when the test execution starts) and kill (when the test execution ends) the browser process. If your private location is configured with a security context that restricts elevated privileges, the private location emits error logs when the Browser Test is executed. The reported logs vary based on the browser that is selected for test execution. Tests executed on Chrome/Edge report the following error:

```
Critical error in startBrowser: Failed to launch the browser process!
sudo: The "no new privileges" flag is set, which prevents sudo from running as root.
sudo: If sudo is running in a container, you may need to adjust the container configuration to disable the flag.
```

**Firefox error:**
```
Impossible to spawn Firefox: binary is not a Firefox executable
sudo: The "no new privileges" flag is set, which prevents sudo from running as root.
sudo: If sudo is running in a container, you may need to adjust the container configuration to disable the flag.
```

### Requirements for ICMP tests running on private location

ICMP tests use the `ping` command to assess network routes and host connectivity. The `ping` command opens raw sockets to send ICMP packets and requires the `NET_RAW` capability. If your container's security context removes this capability, ICMP tests do not function properly on the private location.

Additionally, `ping` requires elevated privileges to create the raw socket. The private location cannot execute ICMP tests if the private location is configured with a security context that restricts elevated privileges.

### `TIMEOUT` errors in API tests from private locations

`TIMEOUT` errors typically indicate your private location cannot reach the test endpoint. Verify the private location is installed on the same network as your target endpoint. Test different endpoints to determine if the issue is endpoint-specific or network-wide.

{{< img src="synthetics/timeout.png" alt="API test on private location timing out" style="width:70%;" >}}

[101]: /synthetics/private_locations/dimensioning
[102]: https://docs.docker.com/config/containers/resource_constraints/
[103]: /synthetics/private_locations/dimensioning#define-your-total-hardware-requirements
[104]: /help/
[105]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{% /tab %}}
{{% tab "Docker" %}}

### Resolving IPv4 forwarding issues for private location containers

Private locations require access to [Datadog's Synthetic Monitoring intake endpoints][103] to pull test configurations and push test results. If IPv4 forwarding is disabled on a Linux server, the private location may lose access to the public internet and consequently cannot connect to the intake. Docker typically attempts to enable IP forwarding when a container starts, but if it remains disabled, then the container cannot reach external services like the intake. 

If this is the case, the private location reports the following:

```
WARNING: IPv4 forwarding is disabled. Networking will not work.
```
and
```
Queue error - onFetchMessagesLongPolling - getaddrinfo EAI_AGAIN intake.synthetics.datadoghq.com
```

**Solution**: Ensure that `net.ipv4.ip_forward` is enabled on the host. 

### Read-only root file system requirements for private location containers

Private location containers need read-write access to specific folders and files for proper operation. Read-only root file systems prevent startup due to critical operations requiring write access.

During startup, containers set Linux capabilities on binaries whose metadata was stripped during the build process for security. This restricts execution to the `root` user by default. Since private locations run as the `dog` user, containers must reapply permissions for proper execution. Read-only file systems prevent these permission updates, causing startup failures.

### Private location containers killed by `OOM` errors

Private location containers killed by `Out Of Memory` errors indicate resource exhaustion on workers. Ensure your private location containers have [sufficient memory resources][101].

### `Invalid mount config` error when running private locations

This error occurs when attempting to mount a single file in Windows-based containers, which is not supported. **Solution**: Ensure the bind mount source is a local directory. For more information, see the [Docker mount volume][102] documentation.

[101]: /synthetics/private_locations#private-location-total-hardware-requirements
[102]: https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only
[103]: https://docs.datadoghq.com/synthetics/platform/private_locations/?tab=docker#datadog-private-locations-endpoints

{{% /tab %}}
{{% tab "Windows" %}}

### Restarting Synthetics Private Location Worker service

Ensure the private location was installed with a configuration specified at installation time. Restart the service using either GUI or PowerShell methods.

#### GUI method

1. Search for **Services** in the **Start** menu.
1. Open **Services** (works on any user account).
1. Find `Datadog Synthetics Private Location` in **Services (Local)**.
1. Right-click the service and select **Restart**.

The worker runs under the **Local Service** account. Verify this by checking for the `synthetics-pl-worker` process in Task Manager's **Details** tab.

#### PowerShell method

1. Open **Windows PowerShell** with script execution rights.
1. Run: `Restart-Service -Name "Datadog Synthetics Private Location"`

### Maintaining Synthetics Private Location Worker uptime

**Prerequisites**: Log in to the machine with permissions to create scheduled tasks.

**Crash recovery**: Create a Windows scheduled task that runs a PowerShell script to restart the worker if it stops running. This ensures automatic recovery after crashes.

**Automatic startup**: If you provided a configuration file during installation, the `Datadog Synthetics Private Location` Windows service starts automatically. Verify the service is running in the **Services** tool—this service handles automatic restarts.

### Self-signed certificate errors 

Windows Private Locations may display this error immediately after startup:

```
Queue error - onFetchMessagesLongPolling - self-signed certificate in certificate chain
Error: self-signed certificate in certificate chain
    at Function.QueueError.fromHTTPError (dist/build/index.js:272629:12)
    at DatadogQueue.receiveMessages (dist/build/index.js:272186:48)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at Worker.fetchMessagesLongPolling (dist/build/index.js:26244:24)
    at Worker.doOneLoop (dist/build/index.js:25810:45)
```

**Symptoms**:
- Error messages repeat continuously in logs.
- Certificate chains appear modified when browsing from the Windows host (for example, Datadog sites show self-signed intermediaries instead of trusted CAs).

**Cause**: This error occurs when **Deep Packet Inspection (DPI)** or TLS inspection is being performed on your network traffic. DPI intercepts, decrypts, and re-encrypts SSL/TLS traffic. During this process, the private location receives a certificate chain that includes a self-signed certificate.  

**Solution**:

- Upload your custom self-signed [root certificates][101] to your private location.
- Verify that your Windows Private Location logs are no longer reporting the error.
```
"Queue error - onFetchMessagesLongPolling - self-signed certificate in certificate chain
Error: self-signed certificate in certificate chain"
```

Without bypassing TLS inspection, the Windows Private Location cannot retrieve test messages and remains in an error state.

[101]: /synthetics/platform/private_locations?tab=windowsservice#root-certificates

{{% /tab %}}
{{< /tabs >}}

### Password prompts for sudo or dog user

The Private Location user (`dog`) requires `sudo` access for proper operation. This user typically receives permissions during container launch. Verify that no policies restrict the `dog` user's `sudo` access or prevent the container from running as the `dog` user (UID 501).

Additionally, Private Location versions `>v1.27` depend the `clone3` system call. Older container runtime environments (Docker versions <20.10.10) may not support `clone3` in their default `seccomp` policy. 

**Solution**: Ensure your runtime's `seccomp` policy includes `clone3` by updating your runtime version, manually adding `clone3` to your policy, or using an `unconfined` seccomp policy. See [Docker's `seccomp` documentation][13] for details.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /synthetics/metrics/#api-tests
[3]: /synthetics/guide/api_test_timing_variations/
[4]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[5]: chrome://extensions/?id=kkbncfpddhdmkfmalecgnphegacgejoa
[6]: https://chromeenterprise.google/policies/#ExtensionSettings
[7]: /synthetics/api_tests/?tab=httptest#make-a-request
[8]: /synthetics/browser_tests/#test-details
[9]: /synthetics/settings/?tab=createfromhttptest#global-variables
[10]: /synthetics/browser_tests/#use-global-variables
[11]: https://ip-ranges.datadoghq.com/synthetics.json
[12]: /synthetics/api_tests/http_tests/?tab=requestoptions#configure-the-test-monitor
[13]: https://docs.docker.com/engine/security/seccomp/
[14]: /synthetics/guide/step-duration
[16]: /synthetics/network_path_tests/#agent-configuration
[17]: /network_monitoring/network_path/setup/?tab=linux#increase-the-number-of-workers
