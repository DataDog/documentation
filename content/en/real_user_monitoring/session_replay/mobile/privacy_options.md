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

## Configuring masking modes

## Fine-Grained Masking
Using the masking modes below, you can override the default setup on a per-application basis. Masking is fine-grained — you can override masking for text and inputs, images, and touches individually to create a custom configuration that suits your needs. 

### Text and input masking

By default, the `mask_all` setting is enabled for all data. With this setting enabled, all text and input content on screen is masked, as shown below.

{{< img src="real_user_monitoring/session_replay/mobile/masking-mode-mask-all-2.png" alt="What your application screen may resemble when `mask` is enabled." style="width:50%;">}}

#### Mask sensitive inputs
With the `mask_sensitive_inputs` setting enabled, all text and inputs are shown except those considered sensitive, such as password fields. 

{{< tabs >}}
{{% tab "Android" %}}
{{< code-block lang="kotlin" filename="applicaton.kt" disable_copy="false" collapsible="true" >}}

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
{{< code-block lang="kotlin" filename="applicaton.kt" disable_copy="false" collapsible="true" >}}

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
{{< code-block lang="kotlin" filename="applicaton.kt" disable_copy="false" collapsible="true" >}}

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
{{< code-block lang="kotlin" filename="applicaton.kt" disable_copy="false" collapsible="true" >}}

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

On Android, users can select the `mask_large_only`  setting, which replaces images whose dimensions exceed 100x100dp with a "Content Image" placeholder. Note that these dimensions refer to the drawable resource, not the view's size.

{{< tabs >}}

{{% tab "Android" %}}
{{< img src="real_user_monitoring/session_replay/mobile/masking-image-mask-large-only.png" alt="What your application screen may resemble when `mask_large_only` is enabled on Android." style="width:50%;">}}


{{< code-block lang="kotlin" filename="applicaton.kt" disable_copy="false" collapsible="true" >}}

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
{{< code-block lang="kotlin" filename="applicaton.kt" disable_copy="false" collapsible="true" >}}

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
With the `hide` setting enabled, all touches that occur during the replay will be hidden. This is the default setting. 

{{< tabs >}}
{{% tab "Android" %}}
{{< code-block lang="kotlin" filename="applicaton.kt" disable_copy="false" collapsible="true" >}}

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
With the `show` setting enabled, all touches that occur during the replay will be shown. 

{{< tabs >}}
{{% tab "Android" %}}
{{< code-block lang="kotlin" filename="applicaton.kt" disable_copy="false" collapsible="true" >}}

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

## Legacy masking - Deprecated
Please note that this masking API is deprecated and will be removed in a future version. Users are encouraged to migrate to the fine-grained masking options described above.

### Mask all text elements

By default, the `mask` setting is enabled for all data. With this setting enabled, all text content on screen is masked, touches are hidden and images are replaced by placeholders, as shown below.

{{< img src="real_user_monitoring/session_replay/mobile/masking-mode-mask-all-2.png" alt="What your application screen may resemble when `mask` is enabled." style="width:50%;">}}

{{< tabs >}}
{{% tab "Android" %}}

   {{< code-block lang="kotlin" filename="applicaton.kt" disable_copy="false" collapsible="true" >}}

   // mask all text elements
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
       .setPrivacy(SessionReplayPrivacy.MASK)
       .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

   {{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

    // mask all text elements
    SessionReplay.enable(
        with: SessionReplay.Configuration(
            replaySampleRate: sampleRate,
            defaultPrivacyLevel: .mask
        )
    )

   {{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Mask only input elements

With the `mask user input` setting enabled, any input field is replaced with anonymized text. Note that in addition to this, touches are hidden, and some images (>100x100dp images on android/non-system images on ios) are replaced with placeholders.

{{< img src="real_user_monitoring/session_replay/mobile/masking-mode-user-input-2.png" alt="What your application screen may resemble when user input fields are masked." style="width:50%;">}}

{{< tabs >}}
{{% tab "Android" %}}

   {{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   // mask only input elements
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
       .setPrivacy(SessionReplayPrivacy.MASK_USER_INPUT)
       .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

   {{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
   
   // mask only input elements
    SessionReplay.enable(
        with: SessionReplay.Configuration(
            replaySampleRate: sampleRate,
            defaultPrivacyLevel: .maskUserInput
        )
    )

   {{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Allow (no masking)

With the `allow` setting enabled, all text is revealed.

{{< img src="real_user_monitoring/session_replay/mobile/masking-mode-allow-all-2.png" alt="What your application screen may resemble when `allow` is enabled." style="width:50%;">}}

**Note**: Even with this option enabled, any sensitive text fields, such as passwords, emails, phone numbers, and addresses are still masked. For more information, see [Text masking definitions](#text-masking-definitions).

{{< tabs >}}
{{% tab "Android" %}}

   {{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   // no masking; all text is revealed
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
      .setPrivacy(SessionReplayPrivacy.ALLOW)
      .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

   {{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
   // no masking; all text is revealed
    SessionReplay.enable(
        with: SessionReplay.Configuration(
            replaySampleRate: sampleRate,
            defaultPrivacyLevel: .allow
        )
    )

   {{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
