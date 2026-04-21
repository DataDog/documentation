---
title: Dynamic Options
draft: true
content_filters:
  - trait_id: platform
    option_group_id: dd_e2e_platform_options
  - trait_id: prog_lang
    option_group_id: dd_e2e_<PLATFORM>_prog_lang_options
---

## Overview

The second filter on this page shows different options depending on the selection made in the first filter. 

Select a platform to see the available programming languages for that platform.

## Currently selected filters

{% if equals($platform, "ios") %}
The selected platform is **iOS**.
{% /if %}

{% if equals($platform, "android") %}
The selected platform is **Android**.
{% /if %}

{% if equals($prog_lang, "swift") %}
The selected programming language is **Swift**.
{% /if %}

{% if equals($prog_lang, "objective_c") %}
The selected programming language is **Objective-C**.
{% /if %}

{% if equals($prog_lang, "kotlin") %}
The selected programming language is **Kotlin**.
{% /if %}

{% if equals($prog_lang, "java") %}
The selected programming language is **Java**.
{% /if %}

## Installation

{% if and(equals($platform, "ios"), equals($prog_lang, "swift")) %}
Add the Datadog SDK to your project using Swift Package Manager:

```swift
dependencies: [
    .package(url: "https://github.com/DataDog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
]
```
{% /if %}

{% if and(equals($platform, "ios"), equals($prog_lang, "objective_c")) %}
Add the Datadog SDK to your project using CocoaPods:

```ruby
pod 'DatadogSDK'
```
{% /if %}

{% if and(equals($platform, "android"), equals($prog_lang, "kotlin")) %}
Add the Datadog SDK to your `build.gradle.kts`:

```kotlin
dependencies {
    implementation("com.datadoghq:dd-sdk-android:2.0.0")
}
```
{% /if %}

{% if and(equals($platform, "android"), equals($prog_lang, "java")) %}
Add the Datadog SDK to your `build.gradle`:

```groovy
dependencies {
    implementation 'com.datadoghq:dd-sdk-android:2.0.0'
}
```
{% /if %}
