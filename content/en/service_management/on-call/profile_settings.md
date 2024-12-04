---
title: Profile Settings
further_reading:
- link: '/service_management/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">On-Call is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

You must [configure your profile settings][1] before you can receive On-Call Pages. Your profile includes settings for contact methods, testing those methods, and notification preferences. These ensure that you receive timely and effective Pages.

## Configure your On-Call profile

Go to [My On-Call Profile][1] to configure your settings.

### Contact methods
{{< img src="service_management/oncall/settings_contact.png" alt="Adding contact methods in On-Call profile settings. A phone number and an email are configured. The phone number is in a hover state, displaying 'Test Call' and 'Test SMS' options." style="width:100%;" >}}
   - You must manually add your email or phone number.
   - If the Datadog [mobile app][2] is installed on your device, your device appears automatically in this list. Check your settings in the mobile app to ensure that your device can receive notifications.
   - Datadog recommends that you test each of your contact methods. Hover over your contact method for test options.

### Notification preferences
{{< img src="service_management/oncall/settings_preferences.png" alt="Configuring notification preferences in On-Call profile settings. Two configurations: 'When a high urgency Page is triggered' set to notify a phone number immediately, and 'When a low urgency Page is triggered' set to notify an email after one minute." style="width:100%;" >}}

Configure **Notification Preferences** to control when and how you receive On-Call related notifications, depending on the urgency of the Page.

### Other notifications
{{< img src="service_management/oncall/settings_shift_reminder.png" alt="Configuring a shift reminder in On-Call profile settings. A shift reminder is configured to notify a phone number 10 minutes before the shift begins." style="width:100%;" >}}

Under **Other Notifications**, you can opt to receive a **Shift reminder** before your On-Call shift begins.

### Supported notification methods

Datadog supports:
- Push notifications through the [Datadog mobile app][3]
- Emails (HTML or text format)
- SMS
- Phone calls

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/profile
[2]: /service_management/mobile/?tab=ios
[3]: /mobile
