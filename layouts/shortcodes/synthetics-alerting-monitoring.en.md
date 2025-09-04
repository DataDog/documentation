### Define alert conditions

Set alert conditions to determine the circumstances under which you want a test to fail and trigger an alert.

#### Alerting rule

When you set the alert conditions to: `An alert is triggered if any assertion fails for X minutes from any n of N locations`, an alert is triggered only if these two conditions are true:

* At least one location was in failure (at least one assertion failed) during the last *X* minutes;
* At one moment during the last *X* minutes, at least *n* locations were in failure.

#### Fast retry

Your test can trigger retries `X` times after `Y` ms in case of a failed test result. Customize the retry interval to suit your alerting sensibility.

Location uptime is computed on a per-evaluation basis (whether the last test result before evaluation was up or down). The total uptime is computed based on the configured alert conditions. Notifications sent are based on the total uptime.

### Configure the test monitor

A notification is sent by your test based on the [alerting conditions](#define-alert-conditions) previously defined. Use this section to define how and what to message your team.

1. [Similar to how you configure monitors][101], select **users and/or services** that should receive notifications either by adding an `@notification` to the message or by searching for team members and connected integrations with the dropdown menu.

2. Enter the notification **message** for your test or use pre-filled monitor messages. This field allows standard [Markdown formatting][104] and supports the following [conditional variables][102]:

<table>
  <thead>
    <tr>
      <th>Conditional Variable</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>{{"{{"}}#is_alert{{"}}"}}</code></td>
      <td>Show when the test alerts.</td>
    </tr>
    <tr>
      <td><code>{{"{{"}}^is_alert{{"}}"}}</code></td>
      <td>Show unless the test alerts.</td>
    </tr>
    <tr>
      <td><code>{{"{{"}}#is_recovery{{"}}"}}</code></td>
      <td>Show when the test recovers from alert.</td>
    </tr>
    <tr>
      <td><code>{{"{{"}}^is_recovery{{"}}"}}</code></td>
      <td>Show unless the test recovers from alert.</td>
    </tr>
    <tr>
      <td><code>{{"{{"}}#is_renotify{{"}}"}}</code></td>
      <td>Show when the monitor renotifies.</td>
    </tr>
    <tr>
      <td><code>{{"{{"}}^is_renotify{{"}}"}}</code></td>
      <td>Show unless the monitor renotifies.</td>
    </tr>
    <tr>
      <td><code>{{"{{"}}#is_priority{{"}}"}}</code></td>
      <td>Show when the monitor matches priority (P1 to P5).</td>
    </tr>
    <tr>
      <td><code>{{"{{"}}^is_priority{{"}}"}}</code></td>
      <td>Show unless the monitor matches priority (P1 to P5).</td>
    </tr>
  </tbody>
</table>

Notification messages include the **message** defined in this section and information about the failing locations. Pre-filled monitor messages are included in the message body section:

<figure class="text-center"> 
<img src="{{ .Site.Params.img_url}}images/synthetics/api_tests/synthetics_api_tests_monitor.png" alt="Synthetic Monitoring monitor section for API tests, highlighting the pre-filled monitor messages" width="80%">  
</figure>

3. Specify how often you want your test to **re-send the notification message** in case of test failure. To prevent renotification on failing tests, check the option `Stop re-notifying on X occurrences`.

4. Click **Save & Start Recording** to save your test configuration and monitor.

For more information, see [Synthetic Monitoring notifications][103].

[101]: /monitors/notify/?tab=is_alert#configure-notifications-and-automations
[102]: /monitors/notify/variables/?tab=is_alert#conditional-variables
[103]: /synthetics/notifications/
[104]: http://daringfireball.net/projects/markdown/syntax