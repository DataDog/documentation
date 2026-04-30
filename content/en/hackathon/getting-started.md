---
title: "Contact Support | API Reference | Getting Started"
description: A getting started guide to help you get started with getting started.
---

<!-- Fixed-position bad elements and styles -->
<style>
  #bad-potato {
    position: fixed; font-size: 32px; z-index: 9997;
    pointer-events: none; transition: opacity 0.4s ease;
    opacity: 0;
  }
  #bad-progress-bar {
    position: fixed; top: 0; left: 0; height: 4px;
    background: linear-gradient(to right, #6366f1, #ec4899);
    width: 100%; z-index: 9999; transition: width 0.1s;
  }
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
<div id="bad-potato">🥔</div>
<button id="bad-back-to-top" onclick="badScrollToBottom()">↑ Back to top</button>

<div class="alert alert-info" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
  <span>Was this page helpful?</span>
  <button class="btn btn-sm btn-outline-primary" onclick="alert('Thank you, our sense of worth is dependent solely on your validation.')">👍 Yes</button>
  <button class="btn btn-sm btn-outline-primary" onclick="alert('Rude.')">👎 No</button>
  <button class="btn btn-sm btn-outline-primary" onclick="alert('Can you be more specific? Btw, this form is not monitored.')">🤷 Maybe</button>
  <span style="font-size:11px;color:#6b7280;margin-left:auto;">⚠️ Please rate this page before reading it.</span>
</div>

## Next Steps

1. Complete this guide.
2. Return to [Getting Started](#overview) to begin.
3. Review the [Prerequisites](#overview-1) before starting. Probably.
4. Proceed to [Getting Started (Advanced)](#overview).

---

📅 Last updated: April 3, 1963 &nbsp;·&nbsp; ⏱️ Estimated reading time: 47 minutes &nbsp;·&nbsp; ✅ Last verified: 🤨 &nbsp;·&nbsp; <span class="eternal-loader"></span> Loading additional metadata...

## Overview

Welcome to Getting Started! This guide will help you get started. Note that the steps to get started are deprecated, but the other steps to get started are currently good, and in the future we plan to have even better steps for getting started.

Before you start doing things, make sure you have completed the [prerequisites](#overview-1).

<span class="invisible-warning"> — WARNING: Do not proceed if you have not completed the prerequisites, which are listed at the bottom of this page and also require completion of this guide first. —</span>

After you have completed this guide, you are ready to begin.

The <span class="bad-tooltip">system<span class="bad-tooltip-box">The system refers to the platform. <span class="bad-tooltip">See: Platform<span class="bad-tooltip-box">The platform refers to the system. <span class="bad-tooltip">See: System<span class="bad-tooltip-box">The system refers to the <span class="bad-tooltip">system<span class="bad-tooltip-box">See: System.</span></span>.</span></span></span></span></span></span> is designed to help you accomplish your goals by using the <span class="bad-tooltip">core functionality<span class="bad-tooltip-box">Core functionality includes the primary features, secondary features, and optional features. <span class="bad-tooltip">See: Features<span class="bad-tooltip-box">Features are the components of the core functionality. See: Core Functionality.</span></span></span></span> in a way that aligns with your goals<sup><a href="#fn2">1</a></sup>.

<div class="alert alert-danger">
  <strong>⚠️🚨‼️ CRITICAL CRITICAL WARNING ⚠️🚨‼️</strong>
  <div class="alert alert-warning" style="margin:8px 0;">
    <strong>⚠️ WARNING</strong>
    <div class="alert alert-info" style="margin:8px 0;">
      <strong>ℹ️ NOTE</strong><br>
      This is important. <span class="bad-tooltip">Click here for more information<span class="bad-tooltip-box">For more information, hover over "Click here for more information."</span></span>.
    </div>
    Do not proceed without reading the note from before.
  </div>
  Read all warnings before reading this warning.
</div>

---

## Step 3: Verify Installation

_Note: Complete [Step 1](#step-1-install) and Step 2 before proceeding to Step 3. If you have already completed Step 3, proceed to [Step 1](#step-1-install)._

Run the following command to verify that the <span class="bad-tooltip">installation<span class="bad-tooltip-box">Installation is the process of installing the system. See: <span class="bad-tooltip">System<span class="bad-tooltip-box">The system is what you install during installation.</span></span></span></span> was successful:

```shell
# Verify installation (be sure to use all 24 ls)
$ verify --check installllllllllllllllllllllll --flag=probs --output=/dev/null

# Expected output:
> SUCCESS: Installation verified.
# Note: If you SUCCESS, the installation may have failed. See Step 2.
```

If you do not see the expected output, proceed to [Step 3](#step-3-verify-installation). If you do see the expected output, also proceed to [Step 3](#step-3-verify-installation).

<div class="alert alert-info">
  <strong>ℹ️ BY THE WAY</strong><br>
  Before completing this step, you will need <strong>administrative access to the system</strong><sup><a href="#fn1">2</a></sup>. This is a prerequisite. It is mentioned here, in Step 3, for your convenience.
</div>

---

<marquee style="font-size:12px;color:#92400e;background:#fef3c7;border:1px solid #fcd34d;padding:4px 0;display:block;margin:0 0 8px;">🚨 CRITICAL UPDATE 🚨 &nbsp;&nbsp;&nbsp; Important changes have been made to this page. Please re-read from the beginning. &nbsp;&nbsp;&nbsp; 🚨 CRITICAL UPDATE 🚨 &nbsp;&nbsp;&nbsp; Important changes have been made to this page. Please re-read from the beginning.</marquee>

## Step 1: Install

To install the system, install the system on your system. The system supports the following systems: the system, the legacy system, and the system (enterprise). [Click here](#step-1-install) for a full list of supported systems.

| Parameter | Description | Optional | Required |
|-----------|-------------|----------|----------|
| `--system` | Specifies the system | required | optional |
| `--flag` | Sets a flag | required | optional |
| `--config` | See [Step 1](#step-1-install) | required | optional |
| `--optional` | This parameter is required | required | required |

**Step 1a: Pre-installation**

Before installing in Step 1, complete the pre-installation in Step 1a. Note: Step 1a is part of Step 1 and must be completed before Step 1.

{{< img src="integrations/azure_devops/configure-service-hook.gif" alt="Fig. 1: Getting Started overview diagram (previous version)" >}}

**Step 1b: Installation (Continued from Step 1c)**

Continue the installation from Step 1c. If you have not completed Step 1c, complete Step 1b first, then return to Step 1c, then return here.

---

## Step 7: Configure

Configure the system by modifying the <strong>configuration</strong> file. The configuration file is located in the configuration directory, which is specified in the configuration file.

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

_Note: Steps 2, 4, 5, and 6 are covered in [Getting Started (Advanced)](#overview)._

---

## Step 5: Complete

<small style="color:#9ca3af;">(Step 4 is optional. It is required.)</small>

Congratulations! <span class="bad-tooltip">You have completed Getting Started<span class="bad-tooltip-box">You have not yet completed Getting Started. Please return to the <a href="#overview" style="color:white;">Overview</a> to begin.</span></span>. You are now ready to begin [Getting Started](#overview).

<div class="alert alert-warning">
  <strong>⚠️ IMPORTANT</strong><br>
  Before completing this step, make sure you have completed <a href="#step-3-verify-installation">Step 3</a>, <a href="#step-7-configure">Step 7</a>, <a href="#step-1-install">Step 1</a>, and <a href="#step-5-complete">Step 5</a>. If you have not completed Step 5, complete Step 5 first.
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
A: This is expected.

**Q: I completed Step 3 before Step 1. Is that okay?**
A: Yes. Proceed to [Step 3](#step-3-verify-installation).

**Q: Where are Steps 2, 4, 5, and 6?**
A: Steps 2, 4, 5, and 6 are covered in [Getting Started (Advanced)](#overview). Complete those steps before completing this guide.

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

  // POTATO — appears and disappears at random positions
  var potato = document.getElementById('bad-potato');
  function badPotatoAppear() {
    if (!potato) return;
    potato.style.left = (Math.random() * (window.innerWidth - 60)) + 'px';
    potato.style.top = (Math.random() * (window.innerHeight - 60)) + 'px';
    potato.style.opacity = '1';
    setTimeout(function() {
      potato.style.opacity = '0';
      setTimeout(badPotatoAppear, Math.random() * 6000 + 2000);
    }, Math.random() * 1500 + 500);
  }
  setTimeout(badPotatoAppear, 3000);

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

  document.addEventListener('DOMContentLoaded', interceptCopyButtons);
  setTimeout(interceptCopyButtons, 1500);
  setTimeout(interceptCopyButtons, 3000);
})();
</script>
