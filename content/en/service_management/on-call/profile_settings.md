---
title: Profile Settings
further_reading:
- link: '/service_management/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
---

<div class="alert alert-info">
To use Datadog On-Call on your mobile device, install the <a href="/mobile#installing">Datadog mobile app</a>.
</div>

You must [configure your profile settings][1] before you can receive On-Call Pages. Your profile includes settings for contact methods, testing those methods, and notification preferences. These ensure that you receive timely and effective Pages.

## Configure your On-Call profile

Go to [My On-Call Profile][1] to configure your settings.

### Contact methods
{{< img src="service_management/oncall/contact_methods.png" alt="Adding contact methods in On-Call profile settings. A phone number, an email, and a mobile device are configured. The phone number is in a hover state, displaying 'Test Call' and 'Test SMS' options." style="width:100%;" >}}
   - You must manually add your email or phone number. Afterwards, the screen asks you for consent to reach you through SMS. If you consent, a green badge appears next to your phone number, indicating that it can be used for SMS notification preferences below.
   - If the Datadog [mobile app][2] is installed on your device, your device appears automatically in this list. Check your settings in the mobile app to ensure that your device can receive notifications.
   - Datadog recommends that you test each of your contact methods. Hover over your contact method for test options.

#### Supported contact methods
- Push notifications through the [Datadog mobile app][3]
- Emails (HTML or text format)
- SMS
- Phone calls

To set up your mobile device, including how to **circumvent Do Not Disturb mode**, see [Set Up Your Mobile Device for Datadog On-Call][4].

### Notification preferences
Notification preferences allow you to tailor how and when **you** are alerted for On-Call Pages based on the urgency of the situation. By configuring preferences for low urgency and high urgency, you can ensure that notifications are effective and unobtrusive, depending on the urgency of the Page. The urgency of a Page is determined within your [Routing Rules][5].

The system cycles through your configured notification preferences until you either acknowledge the Page, or the Page is escalated to the next on-call person as defined in the [Escalation Policy][6].

#### High urgency notifications
{{< img src="service_management/oncall/high_urgency_notification_preferences.png" alt="Configuring high urgency notification preferences in On-Call profile settings: 'When a high urgency Page is triggered' set to notify a phone number immediately in order to quickly respond to critical Pages." style="width:100%;" >}}

Configure your high-urgency Pages (P1 monitor alerts, SEV-1 security threats, SEV-1 incidents, etc.), to demand immediate attention and escalation.

For example, you can configure On-Call to start with a push notification, call after one minute, and send a follow-up push notification if unacknowledged after two minutes.

##### Best practices for high urgency
- Use immediate push notifications and phone calls as the primary notification method for critical Pages.
- Keep follow-up intervals short to ensure rapid acknowledgment.
- Plan escalation policies carefully to avoid missed responses during emergencies.

#### Low urgency notifications
{{< img src="service_management/oncall/low_urgency_notification_preferences.png" alt="Configuring low urgency notification preferences in On-Call profile settings: 'When a low urgency Page is triggered' set to notify an email immediately but don't escalate it further." style="width:100%;" >}}

Configure your low-urgency Pages (non-blocking issues, informational signals, etc.), to minimize disruptions while ensuring you stay informed. For example, you can opt to only yourself through email.

### Other notifications
{{< img src="service_management/oncall/settings_shift_reminder.png" alt="Configuring a shift reminder in On-Call profile settings. A shift reminder is configured to notify a phone number 10 minutes before the shift begins." style="width:100%;" >}}

Under **Other Notifications**, you can opt to receive a **Shift reminder** before your On-Call shift begins.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/profile
[2]: /service_management/mobile/?tab=ios
[3]: /mobile
[4]: /service_management/on-call/guides/configure-mobile-device-for-on-call
[5]: /service_management/on-call/routing_rules
[6]: /service_management/on-call/escalation_policies
