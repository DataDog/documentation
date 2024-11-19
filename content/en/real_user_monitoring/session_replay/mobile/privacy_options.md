---
title: Mobile Session Replay Privacy Options
description: Configure privacy options for Mobile Session Replay.
aliases:
further_reading:
    - link: '/real_user_monitoring/session_replay/mobile'
      tag: Documentation
      text: Mobile Session Replay
    - link: '/real_user_monitoring/session_replay/mobile/app_performance'
      tag: Documentation
      text: How Mobile Session Replay Impacts App Performance
    - link: '/real_user_monitoring/session_replay/mobile/setup_and_configuration'
      tag: Documentation
      text: Setup and Configure Mobile Session Replay
    - link: '/real_user_monitoring/session_replay/mobile/troubleshooting'
      tag: Documentation
      text: Troubleshoot Mobile Session Replay
    - link: '/real_user_monitoring/session_replay'
      tag: Documentation
      text: Session Replay
---

## Overview

Session Replay provides privacy controls to ensure organizations of any scale do not expose sensitive or personal data. Data is stored on Datadog-managed cloud instances and encrypted at rest.

Default privacy options for Session Replay protect end user privacy and prevent sensitive organizational information from being collected.

By enabling Mobile Session Replay, you can automatically mask sensitive elements from being recorded through the RUM Mobile SDK. When data is masked, that data is not collected in its original form by Datadog's SDKs and thus is not sent to the backend.

## Fine-grained masking
Using the masking modes below, you can override the default setup on a per-application basis. Masking is fine-grained, which means you can override masking for text and inputs, images, and touches individually to create a custom configuration that suits your needs. 

### Text and input masking

By default, the `mask_all` setting is enabled for all data. With this setting enabled, all text and input content on screen is masked, as shown below.

{{< img src="real_user_monitoring/session_replay/mobile/masking-mode-mask-all-2.png" alt="What your application screen may resemble when `mask` is enabled." style="width:50%;">}}

#### Mask sensitive inputs
With the `mask_sensitive_inputs` setting enabled, all text and inputs are shown except those considered sensitive, such as password fields. 

{{< tabs >}}
{{% tab "Android" %}}
{{< code-block lang="kotlin" filename="application.kt" disable_copy="false" collapsible="true" >}}

    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    .setTextAndInputPrivacy(TextAndInputPrivacy.MASK_SENSITIVE_INPUTS)
    .build()
    SessionReplay.enable(sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "iOS" %}}
{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

    let sessionReplayConfig = SessionReplay.Configuration(
        replaySampleRate: sampleRate, 
        textAndInputPrivacyLevel: .maskSensitiveInputs,
        imagePrivacyLevel: imagePrivacyLevel,
        touchPrivacyLevel: touchPrivacyLevel
    )
    SessionReplay.enable(with: sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### Mask all inputs
With the `mask_all_inputs` setting enabled, all inputs fields are masked in the replay.

{{< tabs >}}
{{% tab "Android" %}}
{{< code-block lang="kotlin" filename="application.kt" disable_copy="false" collapsible="true" >}}

    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    .setTextAndInputPrivacy(TextAndInputPrivacy.MASK_ALL_INPUTS)
    .build()
    SessionReplay.enable(sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "iOS" %}}
{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

    let sessionReplayConfig = SessionReplay.Configuration(
        replaySampleRate: sampleRate, 
        textAndInputPrivacyLevel: .maskAllInputs,
        imagePrivacyLevel: imagePrivacyLevel,
        touchPrivacyLevel: touchPrivacyLevel
    )
    SessionReplay.enable(with: sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### Mask all
With the `mask_all` setting enabled, all text and input fields are masked in the replay.

{{< tabs >}}
{{% tab "Android" %}}
{{< code-block lang="kotlin" filename="application.kt" disable_copy="false" collapsible="true" >}}

    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    .setTextAndInputPrivacy(TextAndInputPrivacy.MASK_ALL)
    .build()
    SessionReplay.enable(sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "iOS" %}}
{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

    let sessionReplayConfig = SessionReplay.Configuration(
        replaySampleRate: sampleRate, 
        textAndInputPrivacyLevel: .maskAll,
        imagePrivacyLevel: imagePrivacyLevel,
        touchPrivacyLevel: touchPrivacyLevel
    )
    SessionReplay.enable(with: sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Image masking

By default, the `mask_all` setting is enabled for all images. With this setting enabled, all images on screen are masked.

#### Mask all images
With the `mask_all` setting enabled, all images are replaced by placeholders labeled 'Image' in the replay.

{{< img src="real_user_monitoring/session_replay/mobile/masking-image-mask-all.png" alt="What your application screen may resemble when `mask-all` is enabled." style="width:50%;">}}

{{< tabs >}}
{{% tab "Android" %}}
{{< code-block lang="kotlin" filename="application.kt" disable_copy="false" collapsible="true" >}}

    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    .setImagePrivacy(ImagePrivacy.MASK_ALL)
    .build()
    SessionReplay.enable(sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "iOS" %}}
{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

    let sessionReplayConfig = SessionReplay.Configuration(
        replaySampleRate: sampleRate, 
        textAndInputPrivacyLevel: textAndInputPrivacyLevel,
        imagePrivacyLevel: .maskAll,
        touchPrivacyLevel: touchPrivacyLevel
    )
    SessionReplay.enable(with: sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### Mask content images
To manage content masking while still showing system images, users can choose the following options:

On iOS, users can select the `mask_non_bundled_only` setting, which replaces any image that is not part of the system with a "Content Image" placeholder.

On Android, users can select the `mask_large_only` setting, which replaces images with dimensions that exceed 100x100dp with a "Content Image" placeholder. 

**Note**: These dimensions refer to the drawable resource, not the view's size.

{{< tabs >}}

{{% tab "Android" %}}
{{< img src="real_user_monitoring/session_replay/mobile/masking-image-mask-large-only.png" alt="What your application screen may resemble when `mask_large_only` is enabled on Android." style="width:50%;">}}


{{< code-block lang="kotlin" filename="application.kt" disable_copy="false" collapsible="true" >}}

    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    .setImagePrivacy(ImagePrivacy.MASK_LARGE_ONLY)
    .build()
    SessionReplay.enable(sessionReplayConfig)

{{< /code-block >}}

{{< /tab >}}


{{% tab "iOS" %}}

{{< img src="real_user_monitoring/session_replay/mobile/masking-image-mask-non-bundled-only.png" alt="What your application screen may resemble when `mask_non_bundled_only` is enabled on iOS." style="width:50%;">}}

{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

    let sessionReplayConfig = SessionReplay.Configuration(
        replaySampleRate: sampleRate, 
        textAndInputPrivacyLevel: textAndInputPrivacyLevel,
        imagePrivacyLevel: .maskNonBundledOnly,
        touchPrivacyLevel: touchPrivacyLevel
    )
    SessionReplay.enable(with: sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### Show all images
With the `mask_none` setting enabled, all images are shown in the replay.

{{< tabs >}}
{{% tab "Android" %}}
{{< code-block lang="kotlin" filename="application.kt" disable_copy="false" collapsible="true" >}}

    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    .setImagePrivacy(ImagePrivacy.MASK_NONE)
    .build()
    SessionReplay.enable(sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "iOS" %}}
{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

    let sessionReplayConfig = SessionReplay.Configuration(
        replaySampleRate: sampleRate, 
        textAndInputPrivacyLevel: textAndInputPrivacyLevel,
        imagePrivacyLevel: .maskNone,
        touchPrivacyLevel: touchPrivacyLevel
    )
    SessionReplay.enable(with: sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Touch masking
By default, the `hide` setting is enabled for all touches. With this setting enabled, all touches on screen are hidden.

#### Hide all touches
With the `hide` setting enabled, all touches that occur during the replay are hidden. This is the default setting. 

{{< tabs >}}
{{% tab "Android" %}}
{{< code-block lang="kotlin" filename="application.kt" disable_copy="false" collapsible="true" >}}

    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    .setTouchPrivacy(TouchPrivacy.HIDE)
    .build()
    SessionReplay.enable(sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "iOS" %}}
{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

    let sessionReplayConfig = SessionReplay.Configuration(
        replaySampleRate: sampleRate, 
        textAndInputPrivacyLevel: textAndInputPrivacyLevel,
        imagePrivacyLevel: imagePrivacyLevel,
        touchPrivacyLevel: .hide
    )
    SessionReplay.enable(with: sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### Show all touches
With the `show` setting enabled, all touches that occur during the replay are shown. 

{{< tabs >}}
{{% tab "Android" %}}
{{< code-block lang="kotlin" filename="application.kt" disable_copy="false" collapsible="true" >}}

    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    .setTouchPrivacy(TouchPrivacy.SHOW)
    .build()
    SessionReplay.enable(sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "iOS" %}}
{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

    let sessionReplayConfig = SessionReplay.Configuration(
        replaySampleRate: sampleRate, 
        textAndInputPrivacyLevel: textAndInputPrivacyLevel,
        imagePrivacyLevel: imagePrivacyLevel,
        touchPrivacyLevel: .show
    )
    SessionReplay.enable(with: sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Privacy overrides

The sections above describe the global masking levels that apply to the entire application. However, it is also possible to override these settings at the view level. The same privacy levels as above are available for text and inputs, images, touches, and an additional setting to completely hide a specific view.

To ensure overrides are recognized properly, they should be applied as early as possible in the view lifecycle. This prevents scenarios where Session Replay might process a view before applying the overrides.

Privacy overrides affect views and their descendants. This means that even if an override is applied to a view where it might have no immediate effect (for example, applying an image override to a text input), the override still applies to all child views. 

Overrides operate using a "nearest parent" principle: if a view has an override, it uses that setting. Otherwise, it inherits the privacy level from the closest parent in the hierarchy with an override. If no parent has an override, the view defaults to the application's general masking level.


### Text and input override

{{< tabs >}}
{{% tab "Android" %}}

To override text and input privacy, use `setSessionReplayTextAndInputPrivacy` on a view instance and pass a value from the `TextAndInputPrivacy` enum. Passing `null` removes the override.

{{< code-block lang="kotlin" filename="build.gradle" disable_copy="false" collapsible="true" >}}
    // Set an text and input override on your view
    myView.setSessionReplayTextAndInputPrivacy(TextAndInputPrivacy.MASK_SENSITIVE_INPUTS)
    // Remove an image override from your view
    myView.setSessionReplayTextAndInputPrivacy(null)
{{< /code-block >}}
{{% /tab %}}

{{% tab "iOS" %}}

To override text and input privacy, use `dd.sessionReplayOverrides.textAndInputPrivacy` on a view instance and set a value from the `TextAndInputPrivacyLevel` enum. Setting it to `nil` removes the override.

{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
    // Set an text and input override on your view
    myView.dd.sessionReplayOverrides.textAndInputPrivacy = .maskSensitiveInputs
    // Remove an image override from your view
    myView.dd.sessionReplayOverrides.textAndInputPrivacy = nil
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Image override

{{< tabs >}}
{{% tab "Android" %}}

To override image privacy, use `setSessionReplayImagePrivacy` on a view instance and pass a value from the `ImagePrivacy` enum. Passing `null` removes the override.

{{< code-block lang="kotlin" filename="build.gradle" disable_copy="false" collapsible="true" >}}
    // Set an image override on your view
    myView.setSessionReplayImagePrivacy(ImagePrivacy.MASK_ALL)
    // Remove an image override from your view
    myView.setSessionReplayImagePrivacy(null)
{{< /code-block >}}
{{% /tab %}}

{{% tab "iOS" %}}

To override image privacy, use `dd.sessionReplayOverrides.imagePrivacy` on a view instance and set a value from the `ImagePrivacyLevel` enum. Setting it to `nil` removes the override.

{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
    // Set an image override on your view
    myView.dd.sessionReplayOverrides.imagePrivacy = .maskAll
    // Remove an image override from your view
    myView.dd.sessionReplayOverrides.imagePrivacy = nil
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Touch override

{{< tabs >}}
{{% tab "Android" %}}

To override touch privacy, use `setSessionReplayTouchPrivacy` on a view instance and pass a value from the `TouchPrivacy` enum. Passing `null` removes the override.

{{< code-block lang="kotlin" filename="build.gradle" disable_copy="false" collapsible="true" >}}
    // Set a touch override on your view
    view.setSessionReplayTouchPrivacy(TouchPrivacy.HIDE)
    // Remove a touch override from your view
    view.setSessionReplayTouchPrivacy(null)
{{< /code-block >}}
{{% /tab %}}

{{% tab "iOS" %}}

To override touch privacy, use `dd.sessionReplayOverrides.touchPrivacy` on a view instance and set a value from the `TouchPrivacyLevel` enum. Setting it to `nil` removes the override.

{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
    // Set a touch override on your view
    myView.dd.sessionReplayOverrides.touchPrivacy = .hide
    // Remove a touch override from your view
    myView.dd.sessionReplayOverrides.touchPrivacy = nil
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Hidden elements override

For sensitive elements that need to be completely hidden, use the `hidden` setting.

When an element is `hidden`, it is replaced by a placeholder labeled as "Hidden" in the replay, and its subviews are not recorded.

**Note**: Marking a view as `hidden` does not prevent touch interactions from being recorded on that element. To hide touch interactions as well, use the [touch override](#touch-override) in addition to marking the element as hidden.

{{< tabs >}}
{{% tab "Android" %}}

Use `setSessionReplayHidden(hide = true)` to hide the element. Setting `hide` to `false` removes the override.

{{< code-block lang="kotlin" filename="build.gradle" disable_copy="false" collapsible="true" >}}
    // Mark a view as hidden
    myView.setSessionReplayHidden(hide = true)
    // Remove the override from the view
    myView.setSessionReplayHidden(hide = false)
{{< /code-block >}}

{{% /tab %}}

{{% tab "iOS" %}}
{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
    // Mark a view as hidden
    myView.dd.sessionReplayOverrides.hide = true
    // Remove the override from the view
    myView.dd.sessionReplayOverrides.hide = false
{{< /code-block >}}

**Note**: Setting the `hidden` override to `nil` has the same effect as setting it to `false`—it disables the override.

{{% /tab %}}
{{< /tabs >}}

### Notes on WebViews

• Privacy overrides, aside from the `hidden` and `touch` options, are not supported for WebViews. You can primarily manage their privacy using the [browser SDK privacy settings][1].

• When a WebView is marked as `hidden`, it is replaced by a placeholder in the replay. However, the WebView itself continues to collect and send data. To avoid this, it is recommended to use [browser SDK privacy settings][1] for managing WebView privacy, as they provide more targeted control.


## How and what data is masked

This section describes how the Datadog recorder handles masking based on data type and how that data is defined.

### Text masking strategies

Depending on how you've configured your privacy settings, the type of text, and sensitivity of data, Datadog's masking rules apply different strategies to different types of text fields.

| Text masking strategy | Description | Example |
|-----------------------|-------------|---------|
| No mask | The text is revealed in the session replay | `"Hello world"` → `"Hello world"` |
| Space-preserving mask | Each visible character is replaced with a lowercase "x" | `"Hello world"` → `"xxxxx xxxxx"` |
| Fixed-length mask | The entire text field is replaced with a constant of three asterisks (***) | `"Hello world"` → `"***"`

With the above text strategies in mind, you have a few different options if you want to override the default privacy rule of `mask` in your configuration.

The following chart shows how Datadog applies different text masking strategies, using the rules you set up in your configuration, to the below text types.

| Type | Allow all | Mask all | Mask user input |
|------|-------------|------------|-------------------|
| [Sensitive text](#sensitive-text) | Fixed-length mask | Fixed-length mask | Fixed-length mask |
| [Input and option text](#input-and-option-text) | No mask | Fixed-length mask | Fixed-length mask |
| [Static text](#static-text) | No mask | Space-preserving mask | No mask |
| [Hint text](#hint-text) | No mask | Fixed-length mask | No mask |

### Text masking definitions

Find below a description of how Datadog's recorder treats each text type.

#### Sensitive text
Sensitive text includes passwords, e-mails, and phone numbers marked in a platform-specific way,
and other forms of sensitivity in text available to each platform.

This includes passwords, e-mails and phone numbers in:

- Text Field (iOS)
- Text View (iOS)
- Edit Text (Android)
- Address information (iOS + Android)
- Credit card numbers (iOS)
- One-time codes (iOS)

#### Input and option text

Input and option text is text entered by the user with a keyboard or other text-input device, or a custom (non-generic) value in selection elements.

This includes the below.

- User-entered text in:
  - Text Field (iOS)
  - Text View (iOS)
  - Edit Text (Android)
- User-selected options in:
  - Value Picker (iOS + Android)
  - Segment (iOS)
  - Drop Down List (Android)
- Notable exclusions:
  - Placeholder (hint) texts in Text Field, Text View and Edit Text (not entered by the user)
  - Non-editable texts in Text View (iOS).
  - Month, day, and year labels in Date Picker (generic values)

#### Static text
Static text is any text that is not directly entered by the user. This includes the below.

All texts in:

- Checkbox and Radio Button titles (Android)
- Texts in non-editable Text View (iOS)
- Month, day and year labels in the date and time picker
- Values updated in response to gesture interaction with input elements, such as the current value of the Slider
- Other controls, not considered as "user input elements", such as Labels, Tab Bar, and Navigation Bar (iOS), or Tabs (Android)

#### Hint text
Hint text is static text in editable text elements or option selectors that is displayed when no value is given. This includes:

- Placeholders in Text Field (iOS), Text View (iOS)
- Hints in Edit Text (Android)
- Prompts in Drop Down lists (Android)

### Appearance masking

The following chart shows how we apply different appearance masking strategies, using the rules you set up in your configuration, to the below text types.

| Type | Allow all | Mask all | Mask user input |
|------|-------------|------------|-------------------|
| [Revealing attributes](#revealing-attributes) |  | {{< X >}} | {{< X >}} |
| [Other attributes](#other-attributes) |  |  |  |

#### Revealing attributes
Revealing attributes are attributes that can reveal or suggest the value of input elements and can be used to infer a user's input or selection.

This includes:

**Shapes**
- Background of selected option in Segment (iOS)
- Circle surrounding the selected date in a Date Picker (iOS)
- Selection mark in Checkbox (Android)
- Thumb of a Slider (iOS and Android)

**Text attributes**
- The color of a label rendering the selected date in Date Picker (iOS)
- The position of the first and last option in Value Picker (iOS and Android)

### Touch interactions

The following chart shows how we apply different touch interaction strategies, using the rules you set up in your configuration, to the below text types. While any interaction that happens on an on-screen keyboard is masked, interactions with other elements are not masked.

| Type | Allow all | Mask all | Mask user input |
|------|-------------|------------|-------------------|
| [Other attributes](#other-attributes) |  |  |  |
| [On-screen keyboard](#on-screen-keyboard) | {{< X >}} | {{< X >}} | {{< X >}} |

### Image masking

The following chart shows how we apply different image masking strategies:

| Type           | Mask None | Mark Large Only (Android) <br/> / Mask Non Bundled Only (iOS) | Mask All 
|----------------|-----------|---------------------------------------------------------------|---------|
| Content Image  | Shown     | Masked                                                        | Masked |
| System Image   | Shown     | Shown                                                         | Masked |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/session_replay/privacy_options
