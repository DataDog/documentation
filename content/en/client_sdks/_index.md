---
title: Client SDKs
description: "Visualize, observe, and analyze the performance of your front-end applications as seen by your users."
disable_sidebar: true
aliases:
  - /real_user_monitoring/installation
  - /real_user_monitoring/faq/
further_reading:
- link: "https://app.datadoghq.com/release-notes?category=Real%20User%20Monitoring"
  tag: "Release Notes"
  text: "Check out the latest Datadog RUM releases! (App login required)"
- link: "https://dtdg.co/fe"
  tag: "Foundation Enablement"
  text: "Join an interactive session to gain insights through Real User Monitoring"
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: "Blog"
  text: "Introducing Datadog Real User Monitoring"
- link: "https://www.datadoghq.com/blog/datadog-mobile-rum/"
  tag: "Blog"
  text: "Improve mobile user experience with Datadog Mobile Real User Monitoring"
- link: "https://www.datadoghq.com/blog/mobile-monitoring-best-practices/"
  tag: "Blog"
  text: "Best practices for monitoring mobile app performance"
- link: "https://www.datadoghq.com/blog/error-tracking/"
  tag: "Blog"
  text: "Make sense of application issues with Datadog Error Tracking"
- link: "https://www.datadoghq.com/blog/unify-apm-rum-datadog/"
  tag: "Blog"
  text: "Unify APM and RUM data for full-stack visibility"
- link: "https://www.datadoghq.com/blog/datadog-geomaps/"
  tag: "Blog"
  text: "Use geomaps to visualize your app data by location"
- link: "https://www.datadoghq.com/blog/datadog-rum-react-components/#tune-up-your-react-data-collection"
  tag: "Blog"
  text: "Get better RUM data with our custom React components"
- link: "https://www.datadoghq.com/blog/hybrid-app-monitoring/"
  tag: "Blog"
  text: "Monitor your hybrid mobile applications with Datadog"
- link: "https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/"
  tag: "Blog"
  text: "How Datadog's Technical Solutions team uses RUM, Session Replay, and Error Tracking to resolve customer issues"
- link: "https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/"
  tag: "Blog"
  text: "Best practices for monitoring static web applications"
- link: "/real_user_monitoring/browser/data_collected/"
  tag: "Documentation"
  text: "RUM Browser Data Collected"
- link: "https://www.datadoghq.com/blog/progressive-web-application-monitoring/"
  tag: "Blog"
  text: "Best practices for monitoring progressive web applications"
algolia:
  tags: ['rum', 'real user monitoring']
cascade:
    algolia:
        rank: 70
---

{{ $dot := . }}
<div class="rum-platforms">
  <div class="container cards-dd">
    <div class="row row-cols-2 row-cols-sm-4 g-2 g-xl-3 justify-content-sm-center">
      <div class="col">
        <a class="card h-100" href="/real_user_monitoring/browser/">
          <div class="card-body text-center py-2 px-1">
            {{ partial "img.html" (dict "root" . "src" "integrations_logos/javascript_large.svg" "class" "img-fluid" "alt" "browser" "width" "200") }}
          </div>
        </a>
      </div>
      <div class="col">
        <a class="card h-100" href="/real_user_monitoring/mobile_and_tv_monitoring/android/setup">
          <div class="card-body text-center py-2 px-1">
            {{ partial "img.html" (dict "root" . "src" "integrations_logos/android_large.svg" "class" "img-fluid" "alt" "android" "width" "200") }}
          </div>
        </a>
      </div>
      <div class="col">
        <a class="card h-100" href="/real_user_monitoring/mobile_and_tv_monitoring/ios/setup">
          <div class="card-body text-center py-2 px-1">
            {{ partial "img.html" (dict "root" . "src" "integrations_logos/ios_large.svg" "class" "img-fluid" "alt" "ios" "width" "200") }}
          </div>
        </a>
      </div>
      <div class="col">
        <a class="card h-100" href="/real_user_monitoring/mobile_and_tv_monitoring/react_native/setup">
          <div class="card-body text-center py-2 px-1">
            {{ partial "img.html" (dict "root" . "src" "integrations_logos/react-native_large.svg" "class" "img-fluid" "alt" "react native" "width" "200") }}
          </div>
        </a>
      </div>
      {{/*  <br>  */}}
      <div class="col">
        <a class="card h-100" href="/real_user_monitoring/mobile_and_tv_monitoring/flutter/setup">
          <div class="card-body text-center py-2 px-1">
            {{ partial "img.html" (dict "root" . "src" "integrations_logos/flutter_large.svg" "class" "img-fluid" "alt" "flutter" "width" "200") }}
          </div>
        </a>
      </div>
      <div class="col">
        <a class="card h-100" href="/real_user_monitoring/mobile_and_tv_monitoring/android/setup">
          <div class="card-body text-center py-2 px-1">
            {{ partial "img.html" (dict "root" . "src" "integrations_logos/android_tv_large.svg" "class" "img-fluid" "alt" "android tv" "width" "200") }}
          </div>
        </a>
      </div>
      <div class="col">
        <a class="card h-100" href="/real_user_monitoring/mobile_and_tv_monitoring/ios/setup">
          <div class="card-body text-center py-2 px-1">
            {{ partial "img.html" (dict "root" . "src" "integrations_logos/tv_os_large.svg" "class" "img-fluid" "alt" "tv OS" "width" "180") }}
          </div>
        </a>
      </div>
      <div class="col">
        <a class="card h-100" href="/real_user_monitoring/mobile_and_tv_monitoring/roku/setup">
          <div class="card-body text-center py-2 px-1">
            {{ partial "img.html" (dict "root" . "src" "integrations_logos/roku_large.svg" "class" "img-fluid" "alt" "Roku" "width" "200") }}
          </div>
        </a>
      </div>
      <div class="col">
        <a class="card h-100" href="/real_user_monitoring/mobile_and_tv_monitoring/setup/unity/">
          <div class="card-body text-center py-2 px-1">
            {{ partial "img.html" (dict "root" . "src" "integrations_logos/rum-unity_large.svg" "class" "img-fluid" "alt" "rum-unity" "width" "200") }}
          </div>
        </a>
      </div>
      <div class="col">
        <a class="card h-100" href="/real_user_monitoring/mobile_and_tv_monitoring/setup/kotlin_multiplatform/">
          <div class="card-body text-center py-2 px-1">
            {{ partial "img.html" (dict "root" . "src" "integrations_logos/kotlin-multiplatform_large.svg" "class" "img-fluid" "alt" "Kotlin Multiplatform" "width" "200") }}
          </div>
        </a>
      </div>
    </div>
  </div>
</div>
