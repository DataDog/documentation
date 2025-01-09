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

2. Enter the notification **message** for your test. This field allows standard [Markdown formatting][104] and supports the following [conditional variables][102]:

    | Conditional Variable       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | &#x7b;&#x7b; #is_alert &#x7d;&#x7d;            | Show when the test alerts.                                          |
    | &#x7b;&#x7b; ^is_alert &#x7d;&#x7d;            | Show unless the test alerts.                                        |
    | &#x7b;&#x7b; #is_recovery &#x7d;&#x7d;         | Show when the test recovers from alert.                             |
    | &#x7b;&#x7b; ^is_recovery &#x7d;&#x7d;         | Show unless the test recovers from alert.                           |
    | &#x7b;&#x7b; #is_renotify &#x7d;&#x7d;         | Show when the monitor renotifies.                                   |
    | &#x7b;&#x7b; ^is_renotify &#x7d;&#x7d;         | Show unless the monitor renotifies.                                 |
    | &#x7b;&#x7b; #is_priority &#x7d;&#x7d;         | Show when the monitor matches priority (P1 to P5).                  |
    | &#x7b;&#x7b; ^is_priority &#x7d;&#x7d;         | Show unless the monitor matches priority (P1 to P5).                |

3. Specify how often you want your test to **re-send the notification message** in case of test failure. To prevent renotification on failing tests, leave the option as `Never renotify if the monitor has not been resolved`.

4. Click **Create** to save your test configuration and monitor.

For more information, see [Using Synthetic Test Monitors][103].

[101]: /monitors/notify/?tab=is_alert#configure-notifications-and-automations
[102]: /monitors/notify/variables/?tab=is_alert#conditional-variables
[103]: /synthetics/guide/synthetic-test-monitors/
[104]: http://daringfireball.net/projects/markdown/syntax