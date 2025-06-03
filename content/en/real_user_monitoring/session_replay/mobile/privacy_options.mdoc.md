---
title: Mobile Session Replay Privacy Options
description: Configure privacy options for Mobile Session Replay.
content_filters:
  - trait_id: platform
    option_group_id: rum_sdk_platform_options
    label: "SDK"
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

{% img src="real_user_monitoring/session_replay/mobile/masking-mode-mask-all-2.png" alt="What your application screen may resemble when `mask` is enabled." style="width:50%;" /%}

#### Mask sensitive inputs

With the `mask_sensitive_inputs` setting enabled, all text and inputs are shown except those considered sensitive, such as password fields.

<!-- Android -->
{% if equals($platform, "android") %}
```kotlin {% filename="application.kt" collapsible=true %}
val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
.setTextAndInputPrivacy(TextAndInputPrivacy.MASK_SENSITIVE_INPUTS)
.build()
SessionReplay.enable(sessionReplayConfig)
```
{% /if %}
<!-- end Android -->

<!-- iOS -->
{% if equals($platform, "ios") %}
```swift {% filename="AppDelegate.swift" collapsible=true %}
let sessionReplayConfig = SessionReplay.Configuration(
    replaySampleRate: sampleRate, 
    textAndInputPrivacyLevel: .maskSensitiveInputs,
    imagePrivacyLevel: imagePrivacyLevel,
    touchPrivacyLevel: touchPrivacyLevel
)
SessionReplay.enable(with: sessionReplayConfig)
```
{% /if %}
<!-- end iOS -->

<!-- React Native -->
{% if equals($platform, "react_native") %}
```typescript {% filename="App.tsx" collapsible=true %}
import {
    SessionReplay,
    SessionReplayConfiguration,
    TextAndInputPrivacyLevel,
} from "@datadog/mobile-react-native-session-replay";

const config: SessionReplayConfiguration = {
    replaySampleRate: sampleRate, 
    textAndInputPrivacyLevel: TextAndInputPrivacyLevel.MASK_SENSITIVE_INPUTS,
}

SessionReplay.enable(config)
```
{% /if %}
<!-- end React Native -->

#### Mask all inputs
With the `mask_all_inputs` setting enabled, all inputs fields are masked in the replay.

<!-- Android -->
{% if equals($platform, "android") %}
```kotlin {% filename="application.kt" collapsible=true %}
val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
.setTextAndInputPrivacy(TextAndInputPrivacy.MASK_ALL_INPUTS)
.build()
SessionReplay.enable(sessionReplayConfig)
```
{% /if %}
<!-- end Android -->

<!-- iOS -->
{% if equals($platform, "ios") %}
```swift {% filename="AppDelegate.swift" collapsible=true %}
let sessionReplayConfig = SessionReplay.Configuration(
    replaySampleRate: sampleRate, 
    textAndInputPrivacyLevel: .maskAllInputs,
    imagePrivacyLevel: imagePrivacyLevel,
    touchPrivacyLevel: touchPrivacyLevel
)
SessionReplay.enable(with: sessionReplayConfig)
```
{% /if %}
<!-- end iOS -->

<!-- React Native -->
{% if equals($platform, "react_native") %}
```typescript {% filename="App.tsx" collapsible=true %}
import {
    SessionReplay,
    SessionReplayConfiguration,
    TextAndInputPrivacyLevel,
} from "@datadog/mobile-react-native-session-replay";

const config: SessionReplayConfiguration = {
    replaySampleRate: sampleRate, 
    textAndInputPrivacyLevel: TextAndInputPrivacyLevel.MASK_ALL_INPUTS,
}

SessionReplay.enable(config)
```
{% /if %}
<!-- end React Native -->

#### Mask all
With the `mask_all` setting enabled, all text and input fields are masked in the replay.

<!-- Android -->
{% if equals($platform, "android") %}
```kotlin {% filename="application.kt" collapsible=true %}
val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
.setTextAndInputPrivacy(TextAndInputPrivacy.MASK_ALL)
.build()
SessionReplay.enable(sessionReplayConfig)
```
{% /if %}
<!-- end Android -->

<!-- iOS -->
{% if equals($platform, "ios") %}
```swift {% filename="AppDelegate.swift" collapsible=true %}
let sessionReplayConfig = SessionReplay.Configuration(
    replaySampleRate: sampleRate, 
    textAndInputPrivacyLevel: .maskAll,
    imagePrivacyLevel: imagePrivacyLevel,
    touchPrivacyLevel: touchPrivacyLevel
)
SessionReplay.enable(with: sessionReplayConfig)
```
{% /if %}
<!-- end iOS -->

<!-- React Native -->
{% if equals($platform, "react_native") %}
```typescript {% filename="App.tsx" collapsible=true %}
import {
    SessionReplay,
    SessionReplayConfiguration,
    TextAndInputPrivacyLevel,
} from "@datadog/mobile-react-native-session-replay";

const config: SessionReplayConfiguration = {
    replaySampleRate: sampleRate, 
    textAndInputPrivacyLevel: TextAndInputPrivacyLevel.MASK_ALL,
}

SessionReplay.enable(config)
```
{% /if %}
<!-- end React Native -->

### Image masking

By default, the `mask_all` setting is enabled for all images. With this setting enabled, all images on screen are masked.

#### Mask all images
With the `mask_all` setting enabled, all images are replaced by placeholders labeled 'Image' in the replay.

{% img src="real_user_monitoring/session_replay/mobile/masking-image-mask-all.png" alt="What your application screen may resemble when `mask-all` is enabled." style="width:50%;" /%}

<!-- Android -->
{% if equals($platform, "android") %}
```kotlin {% filename="application.kt" collapsible=true %}
val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
.setImagePrivacy(ImagePrivacy.MASK_ALL)
.build()
SessionReplay.enable(sessionReplayConfig)
```
{% /if %}
<!-- end Android -->

<!-- iOS -->
{% if equals($platform, "ios") %}
```swift {% filename="AppDelegate.swift" collapsible=true %}
let sessionReplayConfig = SessionReplay.Configuration(
    replaySampleRate: sampleRate, 
    textAndInputPrivacyLevel: textAndInputPrivacyLevel,
    imagePrivacyLevel: .maskAll,
    touchPrivacyLevel: touchPrivacyLevel
)
SessionReplay.enable(with: sessionReplayConfig)
```
{% /if %}
<!-- end iOS -->

<!-- React Native -->
{% if equals($platform, "react_native") %}
```typescript {% filename="App.tsx" collapsible=true %}
import {
    SessionReplay,
    SessionReplayConfiguration,
    ImagePrivacyLevel,
} from "@datadog/mobile-react-native-session-replay";

const config: SessionReplayConfiguration = {
    replaySampleRate: sampleRate, 
    imagePrivacyLevel: ImagePrivacyLevel.MASK_ALL,
}

SessionReplay.enable(config)
```
{% /if %}
<!-- end React Native -->

#### Mask content images
To manage content masking while still showing system images, users can choose the following options:

On iOS, users can select the `mask_non_bundled_only` setting, which replaces any image that is not part of the system with a "Content Image" placeholder.

On Android, users can select the `mask_large_only` setting, which replaces images with dimensions that exceed 100x100dp with a "Content Image" placeholder. 

**Note**: These dimensions refer to the drawable resource, not the view's size.

<!-- Android -->
{% if equals($platform, "android") %}
{% img src="real_user_monitoring/session_replay/mobile/masking-image-mask-large-only.png" alt="What your application screen may resemble when `mask_large_only` is enabled on Android." style="width:50%;" /%}

```kotlin {% filename="application.kt" collapsible=true %}
val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
.setImagePrivacy(ImagePrivacy.MASK_LARGE_ONLY)
.build()
SessionReplay.enable(sessionReplayConfig)
```
{% /if %}
<!-- end Android -->

<!-- iOS -->
{% if equals($platform, "ios") %}
{% img src="real_user_monitoring/session_replay/mobile/masking-image-mask-non-bundled-only.png" alt="What your application screen may resemble when `mask_non_bundled_only` is enabled on iOS." style="width:50%;" /%}

```swift {% filename="AppDelegate.swift" collapsible=true %}
let sessionReplayConfig = SessionReplay.Configuration(
    replaySampleRate: sampleRate, 
    textAndInputPrivacyLevel: textAndInputPrivacyLevel,
    imagePrivacyLevel: .maskNonBundledOnly,
    touchPrivacyLevel: touchPrivacyLevel
)
SessionReplay.enable(with: sessionReplayConfig)
```
{% /if %}
<!-- end iOS -->

<!-- React Native -->
{% if equals($platform, "react_native") %}
```typescript {% filename="App.tsx" collapsible=true %}
import {
    SessionReplay,
    SessionReplayConfiguration,
    ImagePrivacyLevel,
} from "@datadog/mobile-react-native-session-replay";

const config: SessionReplayConfiguration = {
    replaySampleRate: sampleRate, 
    imagePrivacyLevel: ImagePrivacyLevel.MASK_NON_BUNDLED_ONLY,
}

SessionReplay.enable(config)
```
{% /if %}
<!-- end React Native -->

#### Show all images
With the `mask_none` setting enabled, all images are shown in the replay.

<!-- Android -->
{% if equals($platform, "android") %}
```kotlin {% filename="application.kt" collapsible=true %}
val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
.setImagePrivacy(ImagePrivacy.MASK_NONE)
.build()
SessionReplay.enable(sessionReplayConfig)
```
{% /if %}
<!-- end Android -->

<!-- iOS -->
{% if equals($platform, "ios") %}
```swift {% filename="AppDelegate.swift" collapsible=true %}
let sessionReplayConfig = SessionReplay.Configuration(
    replaySampleRate: sampleRate, 
    textAndInputPrivacyLevel: textAndInputPrivacyLevel,
    imagePrivacyLevel: .maskNone,
    touchPrivacyLevel: touchPrivacyLevel
)
SessionReplay.enable(with: sessionReplayConfig)
```
{% /if %}
<!-- end iOS -->

<!-- React Native -->
{% if equals($platform, "react_native") %}
```typescript {% filename="App.tsx" collapsible=true %}
import {
    SessionReplay,
    SessionReplayConfiguration,
    ImagePrivacyLevel,
} from "@datadog/mobile-react-native-session-replay";

const config: SessionReplayConfiguration = {
    replaySampleRate: sampleRate, 
    imagePrivacyLevel: ImagePrivacyLevel.MASK_NONE,
}

SessionReplay.enable(config)
```
{% /if %}
<!-- end React Native -->

### Touch masking
By default, the `hide` setting is enabled for all touches. With this setting enabled, all touches on screen are hidden.

#### Hide all touches
With the `hide` setting enabled, all touches that occur during the replay are hidden. This is the default setting. 

<!-- Android -->
{% if equals($platform, "android") %}
```kotlin {% filename="application.kt" collapsible=true %}
val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
.setTouchPrivacy(TouchPrivacy.HIDE)
.build()
SessionReplay.enable(sessionReplayConfig)
```
{% /if %}
<!-- end Android -->

<!-- iOS -->
{% if equals($platform, "ios") %}
```swift {% filename="AppDelegate.swift" collapsible=true %}
let sessionReplayConfig = SessionReplay.Configuration(
    replaySampleRate: sampleRate, 
    textAndInputPrivacyLevel: textAndInputPrivacyLevel,
    imagePrivacyLevel: imagePrivacyLevel,
    touchPrivacyLevel: .hide
)
SessionReplay.enable(with: sessionReplayConfig)
```
{% /if %}
<!-- end iOS -->

<!-- React Native -->
{% if equals($platform, "react_native") %}
```typescript {% filename="App.tsx" collapsible=true %}
import {
    SessionReplay,
    SessionReplayConfiguration,
    TouchPrivacyLevel,
} from "@datadog/mobile-react-native-session-replay";

const config: SessionReplayConfiguration = {
    replaySampleRate: sampleRate, 
    touchPrivacyLevel: TouchPrivacyLevel.HIDE,
}

SessionReplay.enable(config)
```
{% /if %}
<!-- end React Native -->

#### Show all touches
With the `show` setting enabled, all touches that occur during the replay are shown.

<!-- Android -->
{% if equals($platform, "android") %}
```kotlin {% filename="application.kt" collapsible=true %}
val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
.setTouchPrivacy(TouchPrivacy.SHOW)
.build()
SessionReplay.enable(sessionReplayConfig)
```
{% /if %}
<!-- end Android -->

<!-- iOS -->
{% if equals($platform, "ios") %}
```swift {% filename="AppDelegate.swift" collapsible=true %}
let sessionReplayConfig = SessionReplay.Configuration(
    replaySampleRate: sampleRate, 
    textAndInputPrivacyLevel: textAndInputPrivacyLevel,
    imagePrivacyLevel: imagePrivacyLevel,
    touchPrivacyLevel: .show
)
SessionReplay.enable(with: sessionReplayConfig)
```
{% /if %}
<!-- end iOS -->

<!-- React Native -->
{% if equals($platform, "react_native") %}
```typescript {% filename="App.tsx" collapsible=true %}
import {
    SessionReplay,
    SessionReplayConfiguration,
    TouchPrivacyLevel,
} from "@datadog/mobile-react-native-session-replay";

const config: SessionReplayConfiguration = {
    replaySampleRate: sampleRate, 
    touchPrivacyLevel: TouchPrivacyLevel.SHOW,
}

SessionReplay.enable(config)
```
{% /if %}
<!-- end React Native -->

## Privacy overrides

The sections above describe the global masking levels that apply to the entire application. However, it is also possible to override these settings at the view level. The same privacy levels as above are available for text and inputs, images, touches, and an additional setting to completely hide a specific view.

To ensure overrides are recognized properly, they should be applied as early as possible in the view lifecycle. This prevents scenarios where Session Replay might process a view before applying the overrides.

Privacy overrides affect views and their descendants. This means that even if an override is applied to a view where it might have no immediate effect (for example, applying an image override to a text input), the override still applies to all child views. 

Overrides operate using a "nearest parent" principle: if a view has an override, it uses that setting. Otherwise, it inherits the privacy level from the closest parent in the hierarchy with an override. If no parent has an override, the view defaults to the application's general masking level.

{% alert %}
Privacy overrides are not supported in SwiftUI.
{% /alert %}

<!-- Android or iOS -->
{% if or(equals($platform, "android"), equals($platform, "ios")) %}

### Text and input override

<!-- Android -->
{% if equals($platform, "android") %}
To override text and input privacy, use `setSessionReplayTextAndInputPrivacy` on a view instance and pass a value from the `TextAndInputPrivacy` enum. Passing `null` removes the override.

```kotlin {% filename="application.kt" collapsible=true %}
// Set a text and input override on your view
myView.setSessionReplayTextAndInputPrivacy(TextAndInputPrivacy.MASK_SENSITIVE_INPUTS)
// Remove a text and input override from your view
myView.setSessionReplayTextAndInputPrivacy(null)
```
{% /if %}
<!-- end Android -->

<!-- iOS -->
{% if equals($platform, "ios") %}
To override text and input privacy, use `dd.sessionReplayOverrides.textAndInputPrivacy` on a view instance and set a value from the `TextAndInputPrivacyLevel` enum. Setting it to `nil` removes the override.

```swift {% filename="AppDelegate.swift" collapsible=true %}
// Set a text and input override on your view
myView.dd.sessionReplayOverrides.textAndInputPrivacy = .maskSensitiveInputs
// Remove a text and input override from your view
myView.dd.sessionReplayOverrides.textAndInputPrivacy = nil
```
{% /if %}
<!-- end iOS -->

### Image override

<!-- Android -->
{% if equals($platform, "android") %}
To override image privacy, use `setSessionReplayImagePrivacy` on a view instance and pass a value from the `ImagePrivacy` enum. Passing `null` removes the override.

```kotlin {% filename="application.kt" collapsible=true %}
// Set an image override on your view
myView.setSessionReplayImagePrivacy(ImagePrivacy.MASK_ALL)
// Remove an image override from your view
myView.setSessionReplayImagePrivacy(null)
```
{% /if %}
<!-- end Android -->

<!-- iOS -->
{% if equals($platform, "ios") %}
To override image privacy, use `dd.sessionReplayOverrides.imagePrivacy` on a view instance and set a value from the `ImagePrivacyLevel` enum. Setting it to `nil` removes the override.

```swift {% filename="AppDelegate.swift" collapsible=true %}
// Set an image override on your view
myView.dd.sessionReplayOverrides.imagePrivacy = .maskAll
// Remove an image override from your view
myView.dd.sessionReplayOverrides.imagePrivacy = nil
```
{% /if %}
<!-- end iOS -->

### Touch override

<!-- Android -->
{% if equals($platform, "android") %}
To override touch privacy, use `setSessionReplayTouchPrivacy` on a view instance and pass a value from the `TouchPrivacy` enum. Passing `null` removes the override.

```kotlin {% filename="application.kt" collapsible=true %}
// Set a touch override on your view
view.setSessionReplayTouchPrivacy(TouchPrivacy.HIDE)
// Remove a touch override from your view
view.setSessionReplayTouchPrivacy(null)
```
{% /if %}
<!-- end Android -->

<!-- iOS -->
{% if equals($platform, "ios") %}
To override touch privacy, use `dd.sessionReplayOverrides.touchPrivacy` on a view instance and set a value from the `TouchPrivacyLevel` enum. Setting it to `nil` removes the override.

```swift {% filename="AppDelegate.swift" collapsible=true %}
// Set a touch override on your view
myView.dd.sessionReplayOverrides.touchPrivacy = .hide
// Remove a touch override from your view
myView.dd.sessionReplayOverrides.touchPrivacy = nil
```
{% /if %}
<!-- end iOS -->

### Hidden elements override

For sensitive elements that need to be completely hidden, use the `hidden` setting.

When an element is `hidden`, it is replaced by a placeholder labeled as "Hidden" in the replay, and its subviews are not recorded.

**Note**: Marking a view as `hidden` does not prevent touch interactions from being recorded on that element. To hide touch interactions as well, use the [touch override](#touch-override) in addition to marking the element as hidden.

<!-- Android -->
{% if equals($platform, "android") %}
Use `setSessionReplayHidden(hide = true)` to hide the element. Setting `hide` to `false` removes the override.

```kotlin {% filename="application.kt" collapsible=true %}
// Mark a view as hidden
myView.setSessionReplayHidden(hide = true)
// Remove the override from the view
myView.setSessionReplayHidden(hide = false)
```
{% /if %}
<!-- end Android -->

<!-- iOS -->
{% if equals($platform, "ios") %}

```swift {% filename="AppDelegate.swift" collapsible=true %}
// Mark a view as hidden
myView.dd.sessionReplayOverrides.hide = true
// Remove the override from the view
myView.dd.sessionReplayOverrides.hide = false
```

**Note**: Setting the `hidden` override to `nil` has the same effect as setting it to `false`—it disables the override.
{% /if %}
<!-- end iOS -->

{% /if %}
<!-- end iOS or Android -->

<!-- React Native -->
{% if equals($platform, "react_native") %}
Privacy overrides are fully supported in React Native starting from version `2.8.0` of the Datadog [React Native SDK][2]. Although the underlying functionality is shared with native Android and iOS platforms, the integration in React Native is designed to align with common React patterns.

### Behavior consistency

React Native's implementation is built on the same foundation as the native Android and iOS SDKs. As a result, you can rely on the privacy features behaving the same way across all three platforms.

### Usage with `SessionReplayView`

The SDK provides a set of React components under the `SessionReplayView` namespace, which are used to configure privacy settings within your React Native application.

To use them, import `SessionReplayView` as follows:

```typescript {% filename="App.tsx" %}
import { SessionReplayView } from "@datadog/mobile-react-native-session-replay";
```

This import provides access to four privacy-focused components.

Each of these components behaves like a regular React Native View, meaning they can be used anywhere you would typically use a View, with the addition of privacy-related behavior.

{% table %}
- Component
- Description
- Properties
---
- `SessionReplayView.Privacy`
- Adds support for customizing text, image, and touch privacy settings for its children.
- 
    - `textAndInputPrivacy?`: [TextAndInputPrivacyLevel](https://github.com/DataDog/dd-sdk-reactnative/blob/develop/packages/react-native-session-replay/src/SessionReplay.ts#L43)
    - `imagePrivacy?`: [ImagePrivacyLevel](https://github.com/DataDog/dd-sdk-reactnative/blob/develop/packages/react-native-session-replay/src/SessionReplay.ts#L15)
    - `touchPrivacy?`: [TouchPrivacyLevel](https://github.com/DataDog/dd-sdk-reactnative/blob/develop/packages/react-native-session-replay/src/SessionReplay.ts#L32)
    - `hide?`: `boolean`
---
- `SessionReplayView.MaskAll`
- Applies the most restrictive privacy settings (`MaskAll` or platform equivalent) to all children.
- 
    - `showTouch?`: `boolean`
---
- `SessionReplayView.MaskNone`
- Applies the least restrictive settings (`MaskNone` or platform equivalent). All child components are visible.
- _(No additional properties)_
---
- `SessionReplayView.Hide`
- Completely hides all child components from session replay.
- _(No additional properties)_
{% /table %}

### Integration approaches

There are two ways to apply privacy overrides in React Native:
- Wrap specific components with a privacy-focused `SessionReplayView` to target only certain elements, or
- Replace an entire `<View>` with a `SessionReplayView` to apply privacy settings to a whole section of your UI.

This flexibility lets you control which parts of your app are masked or visible in session replays.

{% tabs %}

{% tab label="As wrappers" %}
Use `SessionReplayView` components to wrap specific parts of your UI where you want to override privacy settings.

For example, going from:

```typescript {% filename="App.tsx" %}
const App = () => {
    return (
        <View>
            {/_ content _/}
            <TextInput placeholder="First Name" value="Data" />
            <TextInput placeholder="Last Name" value="Dog" />
            {/* content */}
        </View>
    );
}
```

To:

```typescript {% filename="App.tsx" %}
const App = () => {
    return (
        <View>
            {/_ content _/}
            <SessionReplayView.MaskAll showTouch={true}>
                <TextInput placeholder="First Name" value="Data" />
                <TextInput placeholder="Last Name" value="Dog" />
            </SessionReplayView.MaskAll>
            {/* content */}
        </View>
    );
}
```
{% /tab %}

{% tab label="As replacements" %}
Replace an existing `<View>` with a `SessionReplayView` component directly. This is ideal when a view already encapsulates the section of the UI that needs modified privacy behavior.

For example, instead of:

```typescript {% filename="App.tsx" %}
const App = () => {
    return (
        <View>
        {/_ content _/}
        </View>
    );
}
```

You can use:

```typescript {% filename="App.tsx" %}
const App = () => {
    return (
        <SessionReplayView.MaskNone>
        {/_ content _/}
        </SessionReplayView.MaskNone>
    );
}
```
{% /tab %}
{% /tabs %}

### Combining privacy components

You can freely combine the `SessionReplayView` components to apply different privacy settings to distinct sections of your UI. This is especially useful when you need a mix of hidden elements, masked input fields, and visible content within the same screen.

For example:

```typescript {% filename="App.tsx" %}
import { ImagePrivacyLevel, SessionReplayView, TextAndInputPrivacyLevel, TouchPrivacyLevel } from "@datadog/mobile-react-native-session-replay";

const App = () => {
    return (
        <SessionReplayView.Privacy
            textAndInputPrivacy={TextAndInputPrivacyLevel.MASK_SENSITIVE_INPUTS}
            imagePrivacy={ImagePrivacyLevel.MASK_NONE}
            touchPrivacy={TouchPrivacyLevel.SHOW}>
            {/_ content _/}
            <SessionReplayView.MaskAll showTouch={true}>
                {/* content */}
                <SessionReplayView.MaskNone>
                    {/* content */}
                </SessionReplayView.MaskNone>
                {/* content */}
            </SessionReplayView.MaskAll>
            {/* content */}
            <SessionReplayView.Hide>
                {/* content */}
            </SessionReplayView.Hide>
        </SessionReplayView.Privacy>
    );
}
```
{% /if %}
<!-- end React Native -->

### Notes on WebViews

- Privacy overrides, aside from the `hidden` and `touch` options, are not supported for WebViews. You can primarily manage their privacy using the [browser SDK privacy settings][1].
- When a WebView is marked as `hidden`, it is replaced by a placeholder in the replay. However, the WebView itself continues to collect and send data. To avoid this, it is recommended to use [browser SDK privacy settings][1] for managing WebView privacy, as they provide more targeted control.

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

<!-- Android -->
{% if equals($platform, "android") %}
Sensitive text can be detected in:

- Edit Text
- Address information
{% /if %}

<!-- iOS -->
{% if equals($platform, "iOS") %}
Sensitive text can be detected in:

- Text Field
- Text View
- Credit card numbers
- One-time codes
{% /if %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
Sensitive text can be detected in the following components.

{% table %}
- Component
- Platform(s)
---
- Text Field
- iOS
---
- Text View
- iOS
---
- Edit Text
- Android
---
- Address information
- iOS, Android
---
- Credit card numbers
- iOS
---
- One-time codes
- iOS
{% /table %}
{% /if %}

#### Input and option text

Input and option text is text entered by the user with a keyboard or other text-input device, or a custom (non-generic) value in selection elements.

This includes the below.

<!-- iOS -->
{% if equals($platform, "ios") %}
- User-entered text in:
  - Text Field
  - Text View
- User-selected options in:
  - Value Picker
  - Segment
- Notable exclusions:
  - Placeholder (hint) texts in Text Field and Text View (not entered by the user)
  - Non-editable texts in Text View
  - Month, day, and year labels in Date Picker (generic values)
{% /if %}

<!-- Android -->
{% if equals($platform, "android") %}
- User-entered text in:
  - Edit Text
- User-selected options in:
  - Drop Down List
- Notable exclusions:
  - Placeholder (hint) texts in Edit Text (not entered by the user)
  - Month, day, and year labels in Date Picker (generic values)
{% /if %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
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
{% /if %}

#### Static text
Static text is any text that is not directly entered by the user. This includes the below.

All texts in:

<!-- iOS -->
{% if equals($platform, "ios") %}
- Texts in non-editable Text View
- Month, day, and year labels in the date and time picker
- Values updated in response to gesture interaction with input elements, such as the current value of the Slider
- Other controls, not considered as "user input elements", such as Labels, Tab Bar, and Navigation Bar
{% /if %}

<!-- Android -->
{% if equals($platform, "android") %}
- Checkbox and Radio Button titles
- Month, day, and year labels in the date and time picker
- Values updated in response to gesture interaction with input elements, such as the current value of the Slider
- Other controls, not considered as "user input elements", such as Tabs
{% /if %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
- Checkbox and Radio Button titles (Android)
- Texts in non-editable Text View (iOS)
- Month, day and year labels in the date and time picker
- Values updated in response to gesture interaction with input elements, such as the current value of the Slider
- Other controls, not considered as "user input elements", such as Labels, Tab Bar, and Navigation Bar (iOS), or Tabs (Android)
{% /if %}

#### Hint text
Hint text is static text in editable text elements or option selectors that is displayed when no value is given. This includes:

<!-- iOS -->
{% if equals($platform, "ios") %}
- Placeholders in Text Field
- Placeholders in Text View
{% /if %}

<!-- Android -->
{% if equals($platform, "android") %}
- Hints in Edit Text
- Prompts in Drop Down lists
{% /if %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
- Placeholders in Text Field (iOS), Text View (iOS)
- Hints in Edit Text (Android)
- Prompts in Drop Down lists (Android)
{% /if %}

### Appearance masking

The following chart shows how we apply different appearance masking strategies, using the rules you set up in your configuration, to the below text types.

| Type | Allow all | Mask all | Mask user input |
|------|-------------|------------|-------------------|
| [Revealing attributes](#revealing-attributes) |  | {% x/ %}  | {% x/ %}  |
| [Other attributes](#other-attributes) |  |  |  |

#### Revealing attributes
Revealing attributes are attributes that can reveal or suggest the value of input elements and can be used to infer a user's input or selection.

This includes:

<!-- iOS -->
{% if equals($platform, "ios") %}
**Shapes**
- Background of selected option in Segment
- Circle surrounding the selected date in a Date Picker
- Thumb of a Slider

**Text attributes**
- The color of a label rendering the selected date in Date Picker
- The position of the first and last option in Value Picker
{% /if %}

<!-- Android -->
{% if equals($platform, "android") %}
**Shapes**
- Selection mark in Checkbox
- Thumb of a Slider

**Text attributes**
- The position of the first and last option in Value Picker
{% /if %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
**Shapes**

{% table %}
- Type
- Platform(s)
---
- Background of selected option in Segment
- iOS
---
- Circle surrounding the selected date in Date Picker
- iOS
---
- Selection mark in Checkbox
- Android
---
- Thumb of a Slider
- iOS, Android
{% /table %}

**Text attributes**

{% table %}
- Type
- Platform(s)
---
- The color of a label rendering the selected date in Date Picker
- iOS
---
- The position of the first and last option in Value Picker
- iOS, Android
{% /table %}
{% /if %}
<!-- end React Native -->

### Touch interactions

The following chart shows how we apply different touch interaction strategies, using the rules you set up in your configuration, to the below text types. While any interaction that happens on an on-screen keyboard is masked, interactions with other elements are not masked.

| Type | Allow all | Mask all | Mask user input |
|------|-------------|------------|-------------------|
| [Other attributes](#other-attributes) |  |  |  |
| [On-screen keyboard](#on-screen-keyboard) | {% x/ %}  | {% x/ %}  | {% x/ %}  |

### Image masking {% #image-masking-definition %}

The following chart shows how we apply different image masking strategies:

{% table %}
- Type
- Mask None
- 
  {% if equals($platform, "android") %}Mark Large Only{% /if %}
  {% if equals($platform, "ios") %}Mask Non Bundled Only{% /if %}
  {% if equals($platform, "react_native") %}Mark Large Only (Android) / Mask Non Bundled Only (iOS){% /if %}
- Mask All
---
- Content Image
- Shown
- Masked
- Masked
---
- System Image
- Shown
- Shown
- Masked
{% /table %}

[1]: /real_user_monitoring/session_replay/privacy_options
[2]: https://github.com/DataDog/dd-sdk-reactnative