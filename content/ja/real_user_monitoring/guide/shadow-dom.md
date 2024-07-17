---
description: Shadow DOM とセッションリプレイの互換性に関するガイド。
further_reading:
- link: /real_user_monitoring/session_replay/browser/
  tag: Documentation
  text: セッションリプレイについて
title: Shadow DOM コンポーネントでセッションリプレイ機能を強化する
---

<div class="alert alert-warning">
Datadog only supports open Shadow DOM.
</div>

## Overview

Shadow DOM helps developers build more modern websites by allowing them to incorporate isolated and reusable components into their code. Often used in order to keep a clean code structure and avoid style clashes, Shadow DOM usage has become more prominent in modern web development practices. 

## Setup

Starting with `v4.31.0` of the [RUM Browser SDK][1], Datadog provides support of open Shadow DOM without requiring additional configuration. Components which are located inside a shadow root are automatically captured by Session Replay. This feature is not supported for the following:
* Closed Shadow DOM
* Dynamic Shadow DOM
* Change in the dynamic CSS style

**Note**: The open Shadow DOM compatibility has been tested on popular frameworks.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/