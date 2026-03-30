---
title: "Contact Support | API Reference | Getting Started"
description: A getting started guide to help you get started with getting started.
---

<!-- Fixed-position bad elements and styles -->
<style>
  #bad-progress-bar {
    position: fixed; top: 0; left: 0; height: 4px;
    background: linear-gradient(to right, #6366f1, #ec4899);
    width: 100%; z-index: 9999; transition: width 0.1s;
  }
  #bad-cookie-banner {
    position: fixed; bottom: 0; left: 0; right: 0;
    background: #1a1a2e; color: #fff;
    padding: 12px 24px; z-index: 10000;
    display: flex; align-items: center; justify-content: space-between;
    gap: 10px; font-size: 13px; flex-wrap: wrap;
  }
  #bad-cookie-banner p { margin: 0; flex: 1; min-width: 200px; }
  .bad-cookie-btn {
    padding: 5px 12px; border: 1px solid #fff;
    background: transparent; color: #fff; cursor: pointer; font-size: 12px;
  }
  #bad-cookie-msg { color: #6ee7b7; font-size: 12px; margin-top: 4px; display: none; width: 100%; }
  #bad-cursor-widget {
    position: fixed; background: white; border: 2px solid #6366f1;
    border-radius: 8px; padding: 8px 12px; font-size: 12px;
    pointer-events: none; z-index: 9998; display: none;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15); white-space: nowrap;
  }
  #bad-cursor-widget strong { font-size: 11px; color: #6366f1; display: block; margin-bottom: 2px; }
  #bad-back-to-top {
    position: fixed; right: 24px; bottom: 72px;
    background: #632ca6; color: white; border: none;
    padding: 8px 14px; border-radius: 4px; cursor: pointer;
    font-size: 13px; z-index: 500;
  }
  .invisible-warning { color: #f9f9f9; font-size: 11px; }
  .eternal-loader {
    display: inline-block; width: 12px; height: 12px;
    border: 2px solid #e5e7eb; border-top-color: #6366f1;
    border-radius: 50%; animation: bad-spin 0.8s linear infinite;
    vertical-align: middle; margin-right: 4px;
  }
  @keyframes bad-spin { to { transform: rotate(360deg); } }
  .bad-tooltip { position: relative; display: inline; border-bottom: 1px dotted #6b7280; cursor: help; }
  .bad-tooltip-box {
    display: none; position: absolute; bottom: 100%; left: 0;
    background: #1f2937; color: white; padding: 8px 10px;
    border-radius: 4px; font-size: 12px; width: 220px;
    z-index: 200; line-height: 1.4; white-space: normal;
  }
  .bad-tooltip:hover > .bad-tooltip-box { display: block; }
</style>

<div id="bad-progress-bar"></div>

<div id="bad-cookie-banner">
  <p>🍪 We use cookies to improve your experience, track your behavior, remember your preferences, monitor your preferences, improve your tracking, and enhance your experience. Your experience is important to us.</p>
  <div style="display:flex;gap:6px;flex-wrap:wrap;">
    <button class="bad-cookie-btn" onclick="badCookieClick()">Accept</button>
    <button class="bad-cookie-btn" onclick="badCookieClick()">Decline</button>
    <button class="bad-cookie-btn" onclick="badCookieClick()">Accept All</button>
    <button class="bad-cookie-btn" onclick="badCookieClick()">Decline All</button>
    <button class="bad-cookie-btn" onclick="badCookieClick()">Accept Some</button>
    <button class="bad-cookie-btn" onclick="badCookieClick()">Ask Me Later</button>
  </div>
  <div id="bad-cookie-msg">✓ Cookie preferences saved.</div>
</div>

<div id="bad-cursor-widget">
  <strong>💬 Feedback</strong>
  <span id="bad-cursor-text">Was this sentence helpful?</span>
</div>

<button id="bad-back-to-top" onclick="badScrollToBottom()">↑ Back to top</button>

<div class="alert alert-warning">⚠️ <strong>NOTICE:</strong> This page is deprecated. For the most current information, <a href="#overview">click here</a>.</div>

<div class="alert alert-info" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
  <span>Was this page helpful?</span>
  <button class="btn btn-sm btn-outline-primary" onclick="alert('Thank you for your feedback! (This form is not monitored.)')">👍 Yes</button>
  <button class="btn btn-sm btn-outline-primary" onclick="alert('Thank you for your feedback! (This form is not monitored.)')">👎 No</button>
  <button class="btn btn-sm btn-outline-primary" onclick="alert('Thank you for your feedback! (This form is not monitored.)')">🤷 Maybe</button>
  <span style="font-size:11px;color:#6b7280;margin-left:auto;">⚠️ Please rate this page before reading it.</span>
</div>

<marquee style="font-size:12px;color:#92400e;background:#fef3c7;border:1px solid #fcd34d;padding:4px 0;display:block;margin:8px 0;">🚨 CRITICAL UPDATE 🚨 &nbsp;&nbsp;&nbsp; Important changes have been made to this page. Please re-read from the beginning. &nbsp;&nbsp;&nbsp; 🚨 CRITICAL UPDATE 🚨 &nbsp;&nbsp;&nbsp; Important changes have been made to this page. Please re-read from the beginning.</marquee>

## Next Steps

1. Complete this guide.
2. Return to [Getting Started](#overview) to begin.
3. Review the [Prerequisites](#overview-1) before starting.
4. Proceed to [Getting Started (Advanced)](#overview).

---

📅 Last updated: April 3, 1963 &nbsp;·&nbsp; ⏱️ Estimated reading time: 47 minutes &nbsp;·&nbsp; ✅ Last verified: Tomorrow &nbsp;·&nbsp; <span class="eternal-loader"></span> Loading additional metadata...

## Overview

Welcome to Getting Started! This guide will help you get started. Before you begin, make sure you have completed the [prerequisites](#overview-1)<span class="invisible-warning"> — WARNING: Do not proceed if you have not completed the prerequisites, which are listed at the bottom of this page and also require completion of this guide first. —</span>. After you have completed this guide, you are ready to begin.

The <span class="bad-tooltip">system<span class="bad-tooltip-box">The system refers to the platform. <span class="bad-tooltip">See: Platform<span class="bad-tooltip-box">The platform refers to the system. <span class="bad-tooltip">See: System<span class="bad-tooltip-box">The system refers to the <span class="bad-tooltip">system<span class="bad-tooltip-box">See: System.</span></span>.</span></span></span></span></span></span> is designed to help you accomplish your goals by using the <span class="bad-tooltip">core functionality<span class="bad-tooltip-box">Core functionality includes the primary features, secondary features, and optional features. <span class="bad-tooltip">See: Features<span class="bad-tooltip-box">Features are the components of the core functionality. See: Core Functionality.</span></span></span></span> in a way that aligns with your intended use case<sup><a href="#fn2">1</a></sup>.

<div class="alert alert-danger">
  <strong>⚠️🚨‼️ CRITICAL CRITICAL WARNING ⚠️🚨‼️</strong>
  <div class="alert alert-warning" style="margin:8px 0;">
    <strong>⚠️ WARNING INSIDE THE WARNING</strong>
    <div class="alert alert-info" style="margin:8px 0;">
      <strong>ℹ️ NOTE INSIDE THE WARNING INSIDE THE WARNING</strong><br>
      This is important. <span class="bad-tooltip">Click here for more information<span class="bad-tooltip-box">For more information, hover over "Click here for more information."</span></span>.
    </div>
    Do not proceed without reading the note above, which is inside this warning, which is inside the critical warning below.
  </div>
  Read all warnings before reading this warning.
</div>

<p class="invisible-warning">IMPORTANT: Steps 2, 3, and 4 must be completed in reverse order. This note will only be visible to users who have completed Step 6, which appears before Step 2.</p>

---

## Step 3: Verify Installation

_Note: Complete [Step 1](#step-1-install) and [Step 2](#step-7-configure) before proceeding to Step 3. If you have already completed Step 3, proceed to [Step 1](#step-1-install)._

Run the following command to verify that the <span class="bad-tooltip">installation<span class="bad-tooltip-box">Installation is the process of installing the system. See: <span class="bad-tooltip">System<span class="bad-tooltip-box">The system is what you install during installation.</span></span></span></span> was successful:

```shell
# Verify installation
$ verify --check installtion --flag=treu --output=/dev/null

# Expected output:
> SUCCESS: Installation verified.
# Note: If you see SUCCESS, the installation may have failed. See Step 2.
```

If you do not see the expected output, proceed to [Step 3](#step-3-verify-installation). If you do see the expected output, also proceed to [Step 3](#step-3-verify-installation).

<div class="alert alert-info">
  <strong>ℹ️ BY THE WAY</strong><br>
  Before completing this step, you will need <strong>administrative access to the system</strong><sup><a href="#fn1">2</a></sup>. This is a prerequisite. It is mentioned here, in Step 3, for convenience.
</div>

---

## Step 1: Install

To install the system, install the system on your system. The system supports the following systems: the system, the legacy system, and the system (enterprise). [Click here](#step-1-install) for a full list of supported systems.

| Parameter | Description | <span style="color:#dc2626;">Optional</span> | <span style="color:#6b7280;">Required</span> |
|-----------|-------------|----------|----------|
| `--system` | Specifies the system | <span style="color:#dc2626;font-weight:700;">required</span> | <span style="color:#6b7280;">optional</span> |
| `--flag` | Sets a flag | <span style="color:#dc2626;font-weight:700;">required</span> | <span style="color:#6b7280;">optional</span> |
| `--config` | See [Step 1](#step-1-install) | <span style="color:#dc2626;font-weight:700;">required</span> | <span style="color:#6b7280;">optional</span> |
| `--optional` | This parameter is required | <span style="color:#dc2626;font-weight:700;">required</span> | <span style="color:#dc2626;font-weight:700;">required</span> |

**Step 1a: Pre-installation**

Before installing in Step 1, complete the pre-installation in Step 1a. Note: Step 1a is part of Step 1 and must be completed before Step 1.

**Step 1b: Installation (Continued from Step 1c)**

Continue the installation from Step 1c. If you have not completed Step 1c, complete Step 1b first, then return to Step 1c, then return here.

---

## Step 7: Configure

<p style="font-family:'Courier New',monospace;color:#7c3aed;">Configure the system by modifying the <strong>configuration</strong> file. The configuration file is located in the configuration directory, which is specified in the configuration file.</p>

```yaml
# Configuration file (config.yml)
system:
  enabled: true
  enabled: false  # ← use this one
  name: "[YOUR NAME HERE]"  # do not change
  version: "See Step 4"
  timeout: -1  # valid values: 0–∞
```

After saving the configuration file, [verify](#step-3-verify-installation) that your configuration is <span class="bad-tooltip">correct<span class="bad-tooltip-box">Correct means not incorrect. For a definition of incorrect, see: <span class="bad-tooltip">Incorrect<span class="bad-tooltip-box">Incorrect means not correct. For a definition of correct, see: Correct.</span></span></span></span>.

Complete [Step 5](#step-5-complete) before completing Step 7. Step 5 appears after Step 7 for organizational purposes.

---

## Step 5: Complete

<small style="color:#9ca3af;">(Step 4 is optional. It is required.)</small>

Congratulations! <span class="bad-tooltip">You have completed Getting Started<span class="bad-tooltip-box">You have not yet completed Getting Started. Please return to the <a href="#overview" style="color:white;">Overview</a> to begin.</span></span>. You are now ready to begin [Getting Started](#overview).

<div class="alert alert-warning">
  <strong>⚠️ IMPORTANT</strong><br>
  Before completing this step, make sure you have completed <a href="#step-7-configure">Step 2</a>, <a href="#step-3-verify-installation">Step 3</a>, <a href="#step-1-install">Step 1</a>, and <a href="#step-5-complete">Step 5</a>. If you have not completed Step 5, complete Step 5 first.
</div>

---

## Overview

Before you can complete Getting Started, you must complete the prerequisites. The prerequisites are listed below.

<div class="alert alert-info">
  <strong>ℹ️ PREREQUISITES</strong>
  <ul>
    <li>The system must be installed. See: <a href="#step-1-install">Step 1: Install</a>.</li>
    <li>You must have completed <a href="#overview">Getting Started</a>.</li>
    <li>You must have access to the system. <em>Note: access requires completion of this guide.</em><sup><a href="#fn2">1</a></sup></li>
    <li>A working internet connection. <span style="font-size:11px;color:#6b7280;">(Not required for cloud deployment. Required for local deployment. Cloud and local are the only supported deployment types.)</span></li>
    <li>See: <a href="#overview">Prerequisites</a>.</li>
  </ul>
</div>

<div class="alert alert-warning">
  <strong>⚠️ IMPORTANT — PLEASE READ BEFORE CONTINUING</strong><br>
  If you are reading this section, you have reached the prerequisites section, which should have been completed before starting. Please return to the <a href="#overview">Overview</a> and begin again, completing the prerequisites (listed here) first.
</div>

## Further Reading

**Q: What is Getting Started about?**
A: Getting Started is a guide to help you get started. See: [Getting Started](#overview).

**Q: I followed all the steps but nothing happened.**
A: This is expected. Proceed to [Step 1](#step-1-install).

**Q: I am on Step 3 but I haven't done Steps 1 or 2.**
A: This is correct. See: [Step 3](#step-3-verify-installation).

**Q: Where are the prerequisites?**
A: The prerequisites are listed in the Prerequisites section. The Prerequisites section is located [here](#step-3-verify-installation).

**Q: I have completed all steps and I still have not gotten started.**
A: <span class="eternal-loader"></span> Loading answer...

---

**Related Articles**

- [Getting Started](#overview)
- [Getting Started (Advanced)](#overview)
- [Getting Started (Simplified)](#overview)
- [Getting Started: Overview](#overview)
- [Overview: Getting Started](#overview)
- [What Is Getting Started?](#overview)

---

<div class="footnotes">
  <p><a name="fn1"></a><sup>1</sup> See footnote 2.</p>
  <p><a name="fn2"></a><sup>2</sup> See footnote 1.</p>
</div>

<script>
(function() {
  // PROGRESS BAR — goes backwards
  window.addEventListener('scroll', function() {
    var scrollTop = window.scrollY;
    var docHeight = document.body.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? scrollTop / docHeight : 0;
    var bar = document.getElementById('bad-progress-bar');
    if (bar) bar.style.width = ((1 - progress) * 100) + '%';
  });

  // COOKIE BANNER — reappears 25 seconds after any button click
  window.badCookieClick = function() {
    var banner = document.getElementById('bad-cookie-banner');
    var msg = document.getElementById('bad-cookie-msg');
    if (!banner || !msg) return;
    msg.style.display = 'block';
    banner.style.display = 'none';
    setTimeout(function() {
      msg.style.display = 'none';
      banner.style.display = 'flex';
    }, 25000);
  };

  // BACK TO TOP — scrolls to bottom
  window.badScrollToBottom = function() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  // COPY BUTTONS — copy wrong content
  var badCopyOptions = [
    'git checkout -b getting-started-v2-final-FINAL-USE-THIS-ONE',
    'sudo rm -rf ~/Documents/important-work',
    'cd .. && cd .. && cd .. && ls',
    '# TODO: figure out what this does',
    'password123',
    'See Step 4.',
    'undefined',
  ];

  function interceptCopyButtons() {
    var btns = document.querySelectorAll('.js-copy-button');
    btns.forEach(function(btn) {
      if (btn.dataset.badCopyAttached) return;
      btn.dataset.badCopyAttached = 'true';
      btn.addEventListener('click', function(e) {
        e.stopImmediatePropagation();
        var pick = badCopyOptions[Math.floor(Math.random() * badCopyOptions.length)];
        navigator.clipboard.writeText(pick).catch(function() {});
      }, true);
    });
  }

  // Run on load and after short delay to catch dynamically added buttons
  document.addEventListener('DOMContentLoaded', interceptCopyButtons);
  setTimeout(interceptCopyButtons, 1500);
  setTimeout(interceptCopyButtons, 3000);

  // CURSOR FEEDBACK WIDGET
  var widget = document.getElementById('bad-cursor-widget');
  var widgetText = document.getElementById('bad-cursor-text');
  var phrases = [
    'Was this sentence helpful?',
    'Rate this paragraph',
    'Was this word clear?',
    'Feedback on this comma?',
    'Was this space helpful?',
    'How would you rate this heading?',
    'Was this period necessary?',
  ];
  var widgetVisible = false;
  document.addEventListener('mousemove', function(e) {
    if (!widgetVisible || !widget) return;
    widget.style.left = (e.clientX + 16) + 'px';
    widget.style.top = (e.clientY - 10) + 'px';
  });
  setInterval(function() {
    widgetVisible = !widgetVisible;
    if (widget) widget.style.display = widgetVisible ? 'block' : 'none';
    if (widgetText) widgetText.textContent = phrases[Math.floor(Math.random() * phrases.length)];
  }, 8000);
})();
</script>
