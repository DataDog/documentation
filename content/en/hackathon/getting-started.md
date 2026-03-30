---
title: "Contact Support | API Reference | Getting Started"
type: hackathon
---

<style>
  /* RESET & BASE */
  * { box-sizing: border-box; }
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    background: #f9f9f9;
    color: #222;
    font-size: 15px;
    line-height: 1.6;
  }

  /* PROGRESS BAR (goes backwards) */
  #progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(to right, #6366f1, #ec4899);
    width: 100%;
    z-index: 9999;
    transition: width 0.1s;
  }

  /* COOKIE BANNER */
  #cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #1a1a2e;
    color: #fff;
    padding: 16px 24px;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-size: 13px;
    flex-wrap: wrap;
  }
  #cookie-banner p { margin: 0; flex: 1; min-width: 200px; }
  .cookie-btn {
    padding: 6px 14px;
    border: 1px solid #fff;
    background: transparent;
    color: #fff;
    cursor: pointer;
    font-size: 12px;
    white-space: nowrap;
  }
  .cookie-btn:hover { background: rgba(255,255,255,0.1); }
  #cookie-msg { color: #6ee7b7; font-size: 12px; margin-top: 4px; display: none; width: 100%; }

  /* TOP NAV */
  .top-nav {
    background: #1e3a5f;
    color: white;
    padding: 10px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    margin-top: 4px;
  }
  .top-nav a { color: #a0c4ff; text-decoration: none; margin: 0 8px; }
  .top-nav a:hover { text-decoration: underline; }
  .search-bar {
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    font-size: 12px;
    width: 180px;
  }

  /* BREADCRUMBS */
  .breadcrumbs {
    padding: 6px 24px;
    font-size: 12px;
    color: #d4d0cc;
    background: #f0eee9;
    border-bottom: 1px solid #e8e4df;
  }
  .breadcrumbs a { color: #d9d5d0; text-decoration: none; }
  .breadcrumbs a:hover { text-decoration: underline; }

  /* DEPRECATED BANNER */
  .deprecated-banner {
    background: #fef3c7;
    border-left: 4px solid #f59e0b;
    padding: 10px 24px;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .deprecated-banner a { color: #b45309; }

  /* HELPFUL WIDGET (top) */
  .helpful-top {
    background: #eff6ff;
    border-bottom: 1px solid #bfdbfe;
    padding: 8px 24px;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .helpful-btn {
    padding: 4px 14px;
    border: 1px solid #93c5fd;
    background: white;
    cursor: pointer;
    border-radius: 3px;
    font-size: 12px;
  }

  /* LAYOUT */
  .layout {
    display: flex;
    min-height: calc(100vh - 120px);
  }

  /* SIDEBAR */
  #sidebar {
    width: 240px;
    min-width: 240px;
    background: white;
    border-right: 1px solid #e5e7eb;
    padding: 16px;
    font-size: 13px;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  #sidebar.collapsed {
    width: 0;
    min-width: 0;
    padding: 0;
    border: none;
  }
  #sidebar h3 {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #6b7280;
    margin: 0 0 8px;
  }
  .toc-link {
    display: block;
    padding: 5px 8px;
    color: #374151;
    text-decoration: none;
    border-radius: 3px;
    margin-bottom: 2px;
    font-size: 13px;
  }
  .toc-link:hover { background: #f3f4f6; }
  .toc-link.active { background: #eff6ff; color: #1d4ed8; font-weight: 600; }
  .toc-link.sub { padding-left: 20px; font-size: 12px; color: #6b7280; }

  .simplified-toggle {
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid #e5e7eb;
  }
  .simplified-toggle label { font-size: 12px; color: #374151; display: flex; align-items: center; gap: 6px; cursor: pointer; }
  .simplified-toggle input { cursor: pointer; }

  .version-select {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #e5e7eb;
  }
  .version-select label { font-size: 11px; color: #6b7280; display: block; margin-bottom: 4px; }
  .version-select select { width: 100%; font-size: 12px; padding: 4px; border: 1px solid #d1d5db; }

  /* MAIN CONTENT */
  .main-content {
    flex: 1;
    padding: 24px 48px 48px;
    max-width: 860px;
  }

  /* HEADINGS */
  h1 { font-family: Georgia, serif; font-size: 28px; margin-bottom: 4px; color: #111; }
  h2 { font-family: 'Courier New', monospace; font-size: 20px; color: #1e3a5f; margin-top: 36px; }
  h3 { font-family: Impact, sans-serif; font-size: 16px; letter-spacing: 0.05em; color: #374151; }
  h4 { font-family: 'Papyrus', fantasy; font-size: 14px; color: #6b7280; }

  /* META LINE */
  .meta-line {
    font-size: 12px;
    color: #9ca3af;
    margin-bottom: 20px;
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
  .meta-line span { display: flex; align-items: center; gap: 4px; }

  /* CALLOUTS */
  .callout {
    border-radius: 4px;
    padding: 12px 16px;
    margin: 16px 0;
    font-size: 13.5px;
  }
  .callout-note { background: #eff6ff; border-left: 4px solid #3b82f6; }
  .callout-warning { background: #fffbeb; border-left: 4px solid #f59e0b; }
  .callout-danger { background: #fef2f2; border-left: 4px solid #ef4444; }
  .callout-title { font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
  .callout-note .callout-title { color: #1d4ed8; }
  .callout-warning .callout-title { color: #b45309; }
  .callout-danger .callout-title { color: #b91c1c; }

  /* STEPS */
  .step {
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 16px;
    margin: 16px 0;
    background: white;
  }
  .step-header {
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 8px;
    color: #111;
  }

  /* CODE */
  .code-block {
    background: #1e1e2e;
    color: #cdd6f4;
    padding: 16px;
    border-radius: 6px;
    font-family: 'Courier New', monospace;
    font-size: 13px;
    position: relative;
    margin: 12px 0;
    line-height: 1.5;
    overflow-x: auto;
  }
  .copy-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    background: #313244;
    color: #cdd6f4;
    border: none;
    padding: 4px 10px;
    font-size: 11px;
    border-radius: 3px;
    cursor: pointer;
  }
  .copy-btn:hover { background: #45475a; }
  .code-comment { color: #6c7086; }
  .code-error { color: #f38ba8; text-decoration: underline wavy #f38ba8; }

  /* TOOLTIPS */
  .tooltip-wrap {
    position: relative;
    display: inline;
    cursor: help;
    border-bottom: 1px dotted #6b7280;
  }
  .tooltip-box {
    display: none;
    position: absolute;
    bottom: 100%;
    left: 0;
    background: #1f2937;
    color: white;
    padding: 8px 10px;
    border-radius: 4px;
    font-size: 12px;
    width: 220px;
    z-index: 200;
    line-height: 1.4;
    white-space: normal;
  }
  .tooltip-wrap:hover > .tooltip-box { display: block; }

  /* NEXT STEPS (at top) */
  .next-steps-box {
    background: #f0fdf4;
    border: 1px solid #86efac;
    border-radius: 6px;
    padding: 14px 16px;
    margin: 16px 0;
    font-size: 13px;
  }
  .next-steps-box h4 { margin: 0 0 8px; color: #15803d; font-family: Arial, sans-serif; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
  .next-steps-box ol { margin: 0; padding-left: 20px; }
  .next-steps-box li { margin-bottom: 4px; }
  .next-steps-box a { color: #15803d; }

  /* PARAMETER TABLE */
  table { width: 100%; border-collapse: collapse; font-size: 13px; margin: 12px 0; }
  th { background: #f3f4f6; border: 1px solid #e5e7eb; padding: 8px 10px; text-align: left; font-size: 12px; }
  td { border: 1px solid #e5e7eb; padding: 8px 10px; vertical-align: top; }
  tr:nth-child(even) { background: #f9fafb; }
  .req { color: #dc2626; font-weight: 600; }
  .opt { color: #6b7280; }

  /* SIMPLIFIED MODE */
  .simplified-content { display: none; }
  .simplified-content.active { display: block; }
  .normal-content.hidden { display: none; }

  /* INVISIBLE TEXT */
  .invisible-warning { color: #f5f5f4; font-size: 11px; }

  /* VISUAL CHAOS */
  .chaos-gif { display: inline-block; width: 24px; height: 24px; background: linear-gradient(45deg, #ff0080, #00ff80, #0080ff, #ff8000); background-size: 200%; animation: chaos 0.3s linear infinite; border-radius: 50%; vertical-align: middle; }
  @keyframes chaos { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }

  .blink { animation: blink 0.7s step-end infinite; }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

  .marquee-wrap { overflow: hidden; background: #fef3c7; border: 1px solid #fcd34d; padding: 4px 0; margin: 8px 0; }
  marquee { font-size: 12px; color: #92400e; }

  /* FEEDBACK CURSOR WIDGET */
  #cursor-widget {
    position: fixed;
    background: white;
    border: 2px solid #6366f1;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 12px;
    pointer-events: none;
    z-index: 9998;
    display: none;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    white-space: nowrap;
  }
  #cursor-widget .widget-title { font-weight: 700; font-size: 11px; color: #6366f1; margin-bottom: 4px; }

  /* BACK TO TOP BUTTON */
  #back-to-top {
    position: fixed;
    right: 24px;
    bottom: 80px;
    background: #1e3a5f;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    z-index: 500;
  }

  /* FOOTNOTES */
  .footnote-ref { vertical-align: super; font-size: 10px; color: #6366f1; text-decoration: none; }
  .footnotes { border-top: 1px solid #e5e7eb; margin-top: 32px; padding-top: 16px; font-size: 12px; color: #6b7280; }
  .footnotes p { margin: 4px 0; }

  /* RELATED ARTICLES */
  .related { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; margin-top: 24px; }
  .related h3 { font-family: Arial, sans-serif; font-size: 13px; margin: 0 0 10px; color: #374151; font-weight: 700; }
  .related ul { margin: 0; padding-left: 18px; font-size: 13px; }
  .related li { margin-bottom: 5px; }
  .related a { color: #1d4ed8; }

  /* FOOTER */
  footer {
    border-top: 1px solid #e5e7eb;
    padding: 16px 48px;
    font-size: 12px;
    color: #9ca3af;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  .print-btn {
    padding: 5px 12px;
    background: white;
    border: 1px solid #d1d5db;
    font-size: 12px;
    cursor: pointer;
    border-radius: 3px;
    color: #374151;
  }

  /* shimmer "loading" blocks */
  .fake-gif {
    width: 100%;
    height: 120px;
    background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
    background-size: 200%;
    animation: shimmer 1.2s infinite;
    border-radius: 4px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    color: #9ca3af;
  }
  @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

  .fake-gif-inline {
    display: inline-block;
    width: 80px;
    height: 20px;
    background: linear-gradient(90deg, #fca5a5 25%, #fecaca 50%, #fca5a5 75%);
    background-size: 200%;
    animation: shimmer 0.4s infinite;
    border-radius: 2px;
    vertical-align: middle;
  }

  /* SPINNING LOADER that never resolves */
  .eternal-loader {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid #e5e7eb;
    border-top-color: #6366f1;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    vertical-align: middle;
    margin-right: 4px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* MISC */
  hr { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
  a { color: #1d4ed8; }
  p { margin: 10px 0; }
  .tag { display: inline-block; background: #eff6ff; color: #1d4ed8; font-size: 10px; padding: 1px 6px; border-radius: 10px; font-weight: 600; letter-spacing: 0.05em; }

  @media print {
    body { font-size: 4pt !important; }
    * { font-size: 4pt !important; }
  }
</style>

<!-- PROGRESS BAR (goes backwards) -->
<div id="progress-bar"></div>

<!-- COOKIE BANNER -->
<div id="cookie-banner">
  <p>🍪 We use cookies to improve your experience, track your behavior, remember your preferences, monitor your preferences, improve your tracking, and enhance your experience. Your experience is important to us.</p>
  <div style="display:flex;gap:6px;flex-wrap:wrap;">
    <button class="cookie-btn" onclick="cookieClick(this)">Accept</button>
    <button class="cookie-btn" onclick="cookieClick(this)">Decline</button>
    <button class="cookie-btn" onclick="cookieClick(this)">Accept All</button>
    <button class="cookie-btn" onclick="cookieClick(this)">Decline All</button>
    <button class="cookie-btn" onclick="cookieClick(this)">Accept Some</button>
    <button class="cookie-btn" onclick="cookieClick(this)">Ask Me Later</button>
  </div>
  <div id="cookie-msg">✓ Cookie preferences saved.</div>
</div>

<!-- TOP NAV -->
<div class="top-nav">
  <div>
    <a href="#prerequisites">Home</a>
    <a href="#step3">Documentation</a>
    <a href="#toc">API Reference</a>
    <a href="#overview">Community</a>
    <a href="#step1">Getting Started</a>
    <a href="#troubleshooting">Blog</a>
  </div>
  <div style="display:flex;align-items:center;gap:8px;">
    <input class="search-bar" type="text" placeholder="Search..." id="search-input" oninput="handleSearch(this)">
    <span id="search-result" style="font-size:12px;color:#a0c4ff;"></span>
  </div>
</div>

<!-- BREADCRUMBS -->
<div class="breadcrumbs">
  <a href="#footer">🍞</a> &rsaquo;
  <a href="#toc">🥖</a> &rsaquo;
  <a href="#overview">🥐</a> &rsaquo;
  <a href="#step5">🫓</a> &rsaquo;
  <a href="#prerequisites">🥨</a> &rsaquo;
  <a href="#toc">🥖</a> &rsaquo;
  <a href="#footer">🍞</a> &rsaquo;
  <span style="color:#bbb;">Getting Started</span>
</div>

<!-- DEPRECATED BANNER -->
<div class="deprecated-banner">
  ⚠️ <strong>NOTICE:</strong> This page is deprecated. For the most current information, <a href="#overview">click here</a>.
</div>

<!-- HELPFUL WIDGET (top) -->
<div class="helpful-top">
  <span>Was this page helpful?</span>
  <button class="helpful-btn" onclick="alert('Thank you for your feedback! (This form is not monitored.)')">👍 Yes</button>
  <button class="helpful-btn" onclick="alert('Thank you for your feedback! (This form is not monitored.)')">👎 No</button>
  <button class="helpful-btn" onclick="alert('Thank you for your feedback! (This form is not monitored.)')">🤷 Maybe</button>
  <span style="font-size:11px;color:#9ca3af;margin-left:auto;">⚠️ Please rate this page before reading it.</span>
</div>

<!-- MAIN LAYOUT -->
<div class="layout">

  <!-- SIDEBAR -->
  <div id="sidebar">
    <h3>On this page</h3>
    <a class="toc-link active" href="#step5" id="toc">Table of Contents</a>
    <a class="toc-link" href="#step5">Overview</a>
    <a class="toc-link sub" href="#step1">What Is It?</a>
    <a class="toc-link" href="#overview">Prerequisites</a>
    <a class="toc-link" href="#step3">Step 1: Install</a>
    <a class="toc-link sub" href="#step1">Step 1a</a>
    <a class="toc-link sub" href="#step3">Step 1b</a>
    <a class="toc-link" href="#step1">Step 2: Configure</a>
    <a class="toc-link" href="#step2">Step 3: Verify</a>
    <a class="toc-link" href="#prerequisites">Step 4: Launch</a>
    <a class="toc-link" href="#step1">Step 5: Complete</a>
    <a class="toc-link" href="#toc">Troubleshooting</a>
    <a class="toc-link" href="#step1">FAQ</a>
    <a class="toc-link sub" href="#step2">Q: What is this?</a>
    <a class="toc-link sub" href="#step3">Q: Am I done?</a>
    <a class="toc-link" href="#toc">Table of Contents</a>

    <div class="simplified-toggle">
      <label>
        <input type="checkbox" id="simplified-toggle"> Simplified Mode
      </label>
    </div>

    <div class="version-select">
      <label>Version</label>
      <select onchange="alert('Documentation for this version is not yet available. Please select a different version.')">
        <option>v1.0</option><option>v2.0</option><option>v3.0</option><option>v4.0</option>
        <option>v5.0</option><option>v6.0</option><option>v7.0</option><option selected>v8.0</option>
        <option>v9.0</option><option>v10.0</option><option>v11.0</option><option>v12.0</option>
        <option>v13.0</option><option>v14.0</option><option>v15.0</option><option>v16.0</option>
        <option>v17.0</option><option>v18.0</option><option>v19.0</option><option>v20.0</option>
        <option>v21.0</option><option>v22.0</option><option>v23.0</option><option>v24.0</option>
        <option>v25.0</option><option>v26.0</option><option>v27.0</option><option>v28.0</option>
        <option>v29.0</option><option>v30.0</option><option>v31.0</option><option>v32.0</option>
        <option>v33.0</option><option>v34.0</option><option>v35.0</option><option>v36.0</option>
        <option>v37.0</option><option>v38.0</option><option>v39.0</option><option>v40.0</option>
        <option>v41.0</option><option>v42.0</option><option>v43.0</option><option>v44.0</option>
        <option>v45.0</option><option>v46.0</option><option>v47.0</option>
      </select>
    </div>
  </div>

  <!-- MAIN CONTENT -->
  <div class="main-content">

    <h1 id="overview">Getting Started</h1>
    <div class="meta-line">
      <span>📅 Last updated: April 3, 1963</span>
      <span>⏱️ Estimated reading time: 47 minutes</span>
      <span>✅ Last verified: Tomorrow</span>
      <span><span class="eternal-loader"></span> Loading additional metadata...</span>
    </div>

    <div class="marquee-wrap">
      <marquee>🚨 CRITICAL UPDATE 🚨 &nbsp;&nbsp;&nbsp; Important changes have been made to this page. Please re-read from the beginning. &nbsp;&nbsp;&nbsp; 🚨 CRITICAL UPDATE 🚨 &nbsp;&nbsp;&nbsp; Important changes have been made to this page. Please re-read from the beginning.</marquee>
    </div>

    <!-- NEXT STEPS (at the top) -->
    <div class="next-steps-box">
      <h4>Next Steps</h4>
      <ol>
        <li>Complete this guide.</li>
        <li>Return to <a href="#overview">Getting Started</a> to begin.</li>
        <li>Review the <a href="#prerequisites">Prerequisites</a> before starting.</li>
        <li>Proceed to <a href="#overview">Getting Started (Advanced)</a>.</li>
      </ol>
    </div>

    <div class="fake-gif">[ Fig. 1: Animated diagram loading... ] <span class="eternal-loader" style="margin-left:8px;"></span></div>

    <p>
      Welcome to Getting Started! This guide will help you get started. Before you begin, make sure you have completed the
      <a href="#prerequisites">prerequisites</a>
      <span class="invisible-warning"> — WARNING: Do not proceed if you have not completed the prerequisites, which are listed at the bottom of this page and also require completion of this guide first. —</span>.
      After you have completed this guide, you are ready to begin.
    </p>

    <p>
      The
      <span class="tooltip-wrap">system<span class="tooltip-box">The system refers to the platform. <span class="tooltip-wrap">See: Platform<span class="tooltip-box">The platform refers to the system. <span class="tooltip-wrap">See: System<span class="tooltip-box">The system refers to the <span class="tooltip-wrap">system<span class="tooltip-box">See: System.</span></span>.</span></span></span></span></span></span>
      is designed to help you accomplish your goals by using the
      <span class="tooltip-wrap">core functionality<span class="tooltip-box">Core functionality includes the primary features, secondary features, and optional features. <span class="tooltip-wrap">See: Features<span class="tooltip-box">Features are the components of the core functionality. See: Core Functionality.</span></span></span></span>
      in a way that aligns with your intended use case<a href="#fn1" class="footnote-ref">1</a>.
    </p>

    <div class="callout callout-danger">
      <div class="callout-title">⚠️🚨‼️ CRITICAL CRITICAL WARNING ⚠️🚨‼️</div>
      <div class="callout callout-warning" style="margin:8px 0;">
        <div class="callout-title">⚠️ WARNING INSIDE THE WARNING</div>
        <div class="callout callout-note" style="margin:8px 0;">
          <div class="callout-title">ℹ️ NOTE INSIDE THE WARNING INSIDE THE WARNING</div>
          This is important. <span class="tooltip-wrap">Click here for more information<span class="tooltip-box">For more information, hover over "Click here for more information."</span></span>.
        </div>
        Do not proceed without reading the note above, which is inside this warning, which is inside the critical warning below.
      </div>
      Read all warnings before reading this warning.
    </div>

    <p class="invisible-warning">IMPORTANT: Steps 2, 3, and 4 must be completed in reverse order. This note will only be visible to users who have completed Step 6, which appears before Step 2.</p>

    <hr>

    <!-- STEP 3 (appears before step 1) -->
    <div class="step" id="step3">
      <div class="step-header">Step 3: Verify Installation</div>
      <p><em>Note: Complete <a href="#step1">Step 1</a> and <a href="#step2">Step 2</a> before proceeding to Step 3. If you have already completed Step 3, proceed to <a href="#step1">Step 1</a>.</em></p>

      <p>Run the following command to verify that the
        <span class="tooltip-wrap">installation<span class="tooltip-box">Installation is the process of installing the system. See: <span class="tooltip-wrap">System<span class="tooltip-box">The system is what you install during installation.</span></span></span></span>
        was successful:
      </p>

      <div class="code-block">
        <button class="copy-btn" onclick="badCopy(event)">Copy</button>
        <span class="code-comment"># Verify installation</span><br>
        <span class="code-error">$ verify --check installtion --flag=treu --output=/<span class="tooltip-wrap">dev<span class="tooltip-box">This directory may or may not exist on your system depending on your system.</span></span>/null</span><br>
        <br>
        <span class="code-comment"># Expected output:</span><br>
        &gt; <span style="color:#a6e3a1;">SUCCESS: Installation verified.</span><br>
        <span class="code-comment"># Note: If you see SUCCESS, the installation may have failed. See Step 2.</span>
      </div>

      <p>If you do not see the expected output, proceed to <a href="#step3">Step 3</a>. If you do see the expected output, also proceed to <a href="#step3">Step 3</a>.</p>

      <div class="callout callout-note">
        <div class="callout-title">ℹ️ BY THE WAY</div>
        Before completing this step, you will need <strong>administrative access to the system</strong><a href="#fn2" class="footnote-ref">2</a>. This is a prerequisite. It is mentioned here, in Step 3, for convenience.
      </div>
    </div>

    <!-- STEP 1 -->
    <div class="step" id="step1">
      <div class="step-header">Step 1: Install <span class="fake-gif-inline"></span></div>

      <p>To install the system, install the system on your system. The system supports the following systems: the system, the legacy system, and the system (enterprise). <a href="#step1">Click here</a> for a full list of supported systems.</p>

      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th style="color:#dc2626;">Optional</th>
            <th style="color:#6b7280;">Required</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>--system</code></td><td>Specifies the system</td><td class="req">required</td><td class="opt">optional</td></tr>
          <tr><td><code>--flag</code></td><td>Sets a flag</td><td class="req">required</td><td class="opt">optional</td></tr>
          <tr><td><code>--config</code></td><td>See <a href="#step1">Step 1</a></td><td class="req">required</td><td class="opt">optional</td></tr>
          <tr><td><code>--optional</code></td><td>This parameter is required</td><td class="req">required</td><td class="req">required</td></tr>
        </tbody>
      </table>

      <div class="step" style="border-color:#fca5a5;">
        <div class="step-header">Step 1a: Pre-installation</div>
        <p>Before installing in Step 1, complete the pre-installation in Step 1a. Note: Step 1a is part of Step 1 and must be completed before Step 1.</p>
      </div>

      <div class="step" style="border-color:#fca5a5;">
        <div class="step-header">Step 1b: Installation (Continued from Step 1c)</div>
        <p>Continue the installation from Step 1c. If you have not completed Step 1c, complete Step 1b first, then return to Step 1c, then return here.</p>
      </div>
    </div>

    <!-- STEP 2 (labeled Step 7) -->
    <div class="step" id="step2">
      <div class="step-header">Step 7: Configure <span class="chaos-gif"></span> <span class="chaos-gif"></span> <span class="chaos-gif"></span></div>

      <p style="font-family: 'Papyrus', fantasy; color: #7c3aed;">Configure the system by modifying the <span class="blink">configuration</span> file. The configuration file is located in the configuration directory, which is specified in the configuration file.</p>

      <div class="fake-gif">[ Fig. 2: Configuration diagram — This image depicts a previous version of the UI ]</div>

      <div class="code-block">
        <button class="copy-btn" onclick="badCopy(event)">Copy</button>
        <span class="code-comment"># Configuration file (config.yml)</span><br>
        system:<br>
        &nbsp;&nbsp;enabled: <span style="color:#a6e3a1;">true</span><br>
        &nbsp;&nbsp;enabled: <span style="color:#f38ba8;">false</span> &nbsp;<span class="code-comment"># ← use this one</span><br>
        &nbsp;&nbsp;name: <span style="color:#f9e2af;">"[YOUR NAME HERE]"</span> &nbsp;<span class="code-comment"># do not change</span><br>
        &nbsp;&nbsp;version: <span style="color:#f9e2af;">"See Step 4"</span><br>
        <span class="code-error">&nbsp;&nbsp;timeout: -1 # valid values: 0–∞</span>
      </div>

      <p>After saving the configuration file, <a href="#step3">verify</a> that your configuration is <span class="tooltip-wrap">correct<span class="tooltip-box">Correct means not incorrect. For a definition of incorrect, see: <span class="tooltip-wrap">Incorrect<span class="tooltip-box">Incorrect means not correct. For a definition of correct, see: Correct.</span></span></span></span>.</p>

      <p>Complete <a href="#prerequisites">Step 5</a> before completing Step 7. Step 5 appears after Step 7 for organizational purposes.</p>
    </div>

    <!-- STEP 5 (skips 4) -->
    <div class="step" id="step5">
      <div class="step-header">Step 5: Complete <span style="font-size:11px;font-weight:400;color:#9ca3af;">(Step 4 is optional. It is required.)</span></div>

      <p>Congratulations! <span class="tooltip-wrap">You have completed Getting Started<span class="tooltip-box">You have not yet completed Getting Started. Please return to the <a href="#overview" style="color:white;">Overview</a> to begin.</span></span>. You are now ready to begin <a href="#overview">Getting Started</a>.</p>

      <div class="callout callout-warning">
        <div class="callout-title">⚠️ IMPORTANT</div>
        Before completing this step, make sure you have completed <a href="#step2">Step 2</a>, <a href="#step3">Step 3</a>, <a href="#step1">Step 1</a>, and <a href="#step5">Step 5</a>. If you have not completed Step 5, complete Step 5 first.
      </div>
    </div>

    <!-- SIMPLIFIED MODE CONTENT -->
    <div id="simplified-content" class="simplified-content">
      <h2>Simplified Version</h2>
      <p style="font-size:13px;">Here is the simplified version of Getting Started. It contains everything from the original version, plus the following additional sections:</p>
      <div class="step"><div class="step-header">Step 1 (Simplified)</div><p>To simplify Step 1, first complete the Simplified Pre-Step, the Simplified Prerequisites, and the Simplified Post-Step (which appears before the Pre-Step). Then complete Step 1 using the simplified method, which is the same as the original method but simpler. Note: the simplified method requires all original prerequisites plus three additional ones. <a href="#prerequisites">See: Prerequisites (Simplified)</a>, which has not yet been written.</p></div>
      <div class="step"><div class="step-header">Step 1a (Simplified): Pre-Simplified Pre-Step</div><p>Complete this step before Step 1 (Simplified). This step is only required in Simplified Mode.</p></div>
      <div class="step"><div class="step-header">Step 1b (Simplified): See Step 1a (Simplified)</div><p>See Step 1a (Simplified).</p></div>
    </div>

    <hr>

    <!-- PREREQUISITES (at the bottom) -->
    <h2 id="prerequisites">Overview</h2>
    <p style="font-family:'Courier New', monospace; font-size:13px;">Before you can complete Getting Started, you must complete the prerequisites. The prerequisites are listed below.</p>

    <div class="callout callout-note">
      <div class="callout-title">ℹ️ PREREQUISITES</div>
      <ul style="margin:0;padding-left:18px;">
        <li>The system must be installed. See: <a href="#step1">Step 1: Install</a>.</li>
        <li>You must have completed <a href="#overview">Getting Started</a>.</li>
        <li>You must have access to the system. <em>Note: access requires completion of this guide.</em><a href="#fn1" class="footnote-ref">1</a></li>
        <li>A working internet connection. <span style="color:#9ca3af;font-size:11px;">(Not required for cloud deployment. Required for local deployment. Cloud and local are the only supported deployment types.)</span></li>
        <li>See: <a href="#prerequisites">Prerequisites</a>.</li>
      </ul>
    </div>

    <div class="callout callout-warning" style="font-size:12px;">
      <div class="callout-title">⚠️ IMPORTANT — PLEASE READ BEFORE CONTINUING</div>
      If you are reading this section, you have reached the prerequisites section, which should have been completed before starting. Please return to the <a href="#overview">Overview</a> and begin again, completing the prerequisites (listed here) first.
    </div>

    <h2 id="troubleshooting">FAQ</h2>
    <p><strong>Q: What is Getting Started about?</strong><br>A: Getting Started is a guide to help you get started. See: <a href="#overview">Getting Started</a>.</p>
    <p><strong>Q: I followed all the steps but nothing happened.</strong><br>A: This is expected. Proceed to <a href="#step1">Step 1</a>.</p>
    <p><strong>Q: I am on Step 3 but I haven't done Steps 1 or 2.</strong><br>A: This is correct. See: <a href="#step3">Step 3</a>.</p>
    <p><strong>Q: Where are the prerequisites?</strong><br>A: The prerequisites are listed in the Prerequisites section. The Prerequisites section is located <a href="#step3">here</a>.</p>
    <p><strong>Q: I have completed all steps and I still have not gotten started.</strong><br>A: <span class="eternal-loader"></span> Loading answer...</p>

    <div class="related">
      <h3>Related Articles</h3>
      <ul>
        <li><a href="#overview">Getting Started</a></li>
        <li><a href="#overview">Getting Started (Advanced)</a></li>
        <li><a href="#overview">Getting Started (Simplified)</a></li>
        <li><a href="#overview">Getting Started: Overview</a></li>
        <li><a href="#overview">Overview: Getting Started</a></li>
        <li><a href="#overview">What Is Getting Started?</a></li>
      </ul>
    </div>

    <!-- FOOTNOTES -->
    <div class="footnotes">
      <p><a name="fn1"></a><sup>1</sup> See footnote 2.</p>
      <p><a name="fn2"></a><sup>2</sup> See footnote 1.</p>
    </div>

  </div><!-- end main-content -->
</div><!-- end layout -->

<!-- FOOTER -->
<footer id="footer">
  <div>
    📅 Last updated: April 3, 1963 &nbsp;·&nbsp;
    © Getting Started Documentation &nbsp;·&nbsp;
    <a href="#overview">Home</a> &nbsp;·&nbsp;
    <a href="#overview">Getting Started</a> &nbsp;·&nbsp;
    <a href="#overview">Contact Support</a>
  </div>
  <div style="display:flex;gap:8px;align-items:center;">
    <button class="print-btn" onclick="window.print()">🖨️ Print this page</button>
    <button id="back-to-top" onclick="scrollToBottom()">↑ Back to top</button>
  </div>
</footer>

<!-- CURSOR FEEDBACK WIDGET -->
<div id="cursor-widget">
  <div class="widget-title">💬 Feedback</div>
  <div id="cursor-text">Was this sentence helpful?</div>
</div>

<script>
  // PROGRESS BAR (goes backwards)
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = scrollTop / docHeight;
    document.getElementById('progress-bar').style.width = ((1 - progress) * 100) + '%';
  });

  // COOKIE BANNER (reappears every 25 seconds regardless of choice)
  function cookieClick(btn) {
    const msg = document.getElementById('cookie-msg');
    msg.style.display = 'block';
    document.getElementById('cookie-banner').style.display = 'none';
    setTimeout(() => {
      msg.style.display = 'none';
      document.getElementById('cookie-banner').style.display = 'flex';
    }, 25000);
  }

  // SIDEBAR (collapses on random timer with no pattern)
  function scheduleSidebarCollapse() {
    const delay = Math.random() * 7000 + 2000;
    setTimeout(() => {
      document.getElementById('sidebar').classList.toggle('collapsed');
      scheduleSidebarCollapse();
    }, delay);
  }
  scheduleSidebarCollapse();

  // COPY BUTTON (copies something random and wrong)
  function badCopy(event) {
    const wrong = [
      'git checkout -b getting-started-v2-final-FINAL-USE-THIS-ONE',
      'sudo rm -rf ~/Documents/important-work',
      'cd .. && cd .. && cd .. && ls',
      '# TODO: figure out what this does',
      'password123',
      'See Step 4.',
      'undefined',
    ];
    const pick = wrong[Math.floor(Math.random() * wrong.length)];
    const btn = event.target;
    navigator.clipboard.writeText(pick).then(() => {
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = 'Copy', 1500);
    }).catch(() => {
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = 'Copy', 1500);
    });
  }

  // BACK TO TOP (scrolls to bottom)
  function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  // SIMPLIFIED MODE (makes it more complex)
  document.getElementById('simplified-toggle').addEventListener('change', function() {
    document.getElementById('simplified-content').classList.toggle('active', this.checked);
  });

  // SEARCH (returns different nonsense each keystroke)
  function handleSearch(input) {
    const result = document.getElementById('search-result');
    if (input.value.length > 0) {
      const nonsense = [
        '3 results found',
        'No results found',
        '47 results found',
        '1 result found (in a different section)',
        '0 results. Did you mean: Getting Started?',
      ];
      result.textContent = nonsense[Math.floor(Math.random() * nonsense.length)];
    } else {
      result.textContent = '';
    }
  }

  // CURSOR FEEDBACK WIDGET (follows your cursor sporadically)
  const widget = document.getElementById('cursor-widget');
  const widgetText = document.getElementById('cursor-text');
  const phrases = [
    'Was this sentence helpful?',
    'Rate this paragraph',
    'Was this word clear?',
    'Feedback on this comma?',
    'Was this space helpful?',
    'How would you rate this heading?',
    'Was this period necessary?',
  ];
  let widgetVisible = false;
  document.addEventListener('mousemove', (e) => {
    if (!widgetVisible) return;
    widget.style.left = (e.clientX + 16) + 'px';
    widget.style.top = (e.clientY - 10) + 'px';
  });
  setInterval(() => {
    widgetVisible = !widgetVisible;
    widget.style.display = widgetVisible ? 'block' : 'none';
    widgetText.textContent = phrases[Math.floor(Math.random() * phrases.length)];
  }, 8000);
</script>
