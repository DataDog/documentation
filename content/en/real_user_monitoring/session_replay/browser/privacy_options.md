---
title: Session Replay Browser Privacy Options
kind: documentation
description: Describes privacy controls available in Session Replay and how to set privacy options
aliases:
- /real_user_monitoring/session_replay/privacy_options
further_reading:
    - link: '/real_user_monitoring/session_replay'
      tag: Documentation
      text: Session Replay
    - link: "https://www.datadoghq.com/blog/default-privacy-session-replay/"
      tag: "Blog"
      text: "Obfuscate user data with Session Replay default privacy settings"
---

## Overview

Session Replay provides privacy controls to ensure organizations of any scale do not expose sensitive or personal data. Data is stored on Datadog-managed cloud instances and encrypted at rest.

Default privacy options for Session Replay are designed to protect end user privacy and prevent sensitive organizational information from being collected.

By enabling Session Replay, you can automatically mask sensitive elements from being recorded through the RUM Browser SDK. When data is masked, that data is not collected in its original form by Datadog's SDKs and thus is not sent to the backend.

## Configuration

<div class="alert alert-warning"><code>defaultPrivacyLevel</code> and <code>mask-user-input</code> are available in the SDK v3.6.0+.</div>

To enable your privacy settings, set `defaultPrivacyLevel` to `mask`, `mask-user-input`, or `allow` in your JavaScript configuration.

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    //  service: 'my-web-application',
    //  env: 'production',
    //  version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackResources: true,
    trackLongTasks: true,
    trackUserInteractions: true,
    defaultPrivacyLevel: 'mask' | 'mask-user-input' | 'allow'
});
```

After updating your configuration, you can override elements of your HTML documents with the below privacy options.

### Mask mode

Setting `defaultPrivacyLevel` to `mask` mode masks all HTML text, user input, images, links and [`data-*` attributes][1]. Text on your application is replaced with `X`, rendering the page into a wireframe.

{{< img src="real_user_monitoring/session_replay/mask-mode-fixed.png" alt="Mask mode" style="width:70%;">}}

**Note:** By default, `mask` is the privacy setting when you enable Session Replay.
**Note**: Masked data is not stored on Datadog servers.

### Mask user input mode

Masks most form fields such as inputs, text areas, and checkbox values while recording all other text as is. Inputs are replaced with three asterisks (`***`) and text areas are obfuscated with space-preserving `x` characters.

{{< img src="real_user_monitoring/session_replay/mask-user-input-v2.png" alt="Mask user input mode" style="width:70%;">}}

### Allow mode

Records everything unmasked.

{{< img src="real_user_monitoring/session_replay/allow.png" alt="Allow mode" style="width:70%;">}}

## Privacy options

### Override an HTML element

You can set an application-wide default and tag the privacy level of an individual HTML element using one of two methods:

1. An HTML attribute such as `data-dd-privacy="allow" | "mask" | "hidden" | "mask-user-input"` or
2. An HTML class name such as `class="dd-privacy-allow" | "dd-privacy-mask-user-input" | "dd-privacy-mask" | "dd-privacy-hidden"`.

The example below demonstrates how you can override certain elements in your HTML to customize your obfuscation:

```
<div class="line-item" data-dd-privacy="allow">
    <div class="label">Order Value</div>
    <div class="value">
        $<span data-dd-privacy="mask">50.00</span>
    </div>
</div>
```

The dollar amount in the cart is replaced with asterisks.

{{< img src="real_user_monitoring/session_replay/example-mask.png" alt="Example of mask mode obfuscating dollar amount" style="width:70%;">}}

## Privacy restrictions

In order to protect end-user privacy, regardless of your privacy configuration, the following HTML elements are **always masked**:
- Input elements of type `password`, `email`, and `tel`
- Elements with `autocomplete` attributes such as credit card numbers, expiration dates, and security codes

## Advanced privacy options

### Completely hide an element


`hidden` is an advanced privacy setting that completely hides specific elements instead of obscuring the text.

If you are concerned about the number of visible elements in sensitive fields, enable `hidden` for your specific elements. These HTML elements are replaced with a gray block at the time of recording.

In this example replay session, the username in the Datadog navigation is obfuscated.

{{< img src="real_user_monitoring/session_replay/hidden.png" alt="Example of hidden mode obfuscating a username" style="width:60%;">}}



### Override the action name

To obscure the default action name and update the naming convention for individual actions, set the override for your individual action names.

You can rename the default action name by overriding the name of a specific HTML element with a more general name. By default, Datadog displays the custom override name.

For example, override the following name with `<div data-dd-action-name="Address" > → Action: "Click on Address"`.

Additional use cases to override the default action name include masking sensitive data in the RUM Explorer and streamlining your analytics and search with custom naming conventions.

### Mask action names
By default, if you wish to mask all action names, you can use the `enablePrivacyForActionName` option in conjunction with the `mask` privacy setting. This operation will automatically substitute all non-overridden action names with the placeholder `Masked Element`.

<div class="alert alert-info">

Datadog is working to add more privacy features to RUM & Session Replay. Have something in mind that you would like to see? <a href="/help">Contact Datadog support.</a>

</div>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
