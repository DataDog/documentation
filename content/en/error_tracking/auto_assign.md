---
title: Auto Assign
description: Learn about Auto Assign in Error Tracking.
---

# Auto Assign

## Overview
Auto Assign helps teams quickly resolve issues by automatically assigning them to the most likely responsible developers. This feature analyzes git commit history to identify suspect commits that may have introduced the issue, then assigns the issue directly to the developer who made those commits. This streamlines issue resolution by connecting errors to the developers most familiar with the relevant code changes.

## Getting Started
To enable Auto Assign, follow these steps:

1. **Set Up Source Code Integration**
   - Ensure SCI is enabled and connected to a supported Git provider (e.g., GitHub).

2. **Ensure Email Consistency**
   - Developers must use the same email address in both Git and their Datadog account.
   - This email matching is essential for Auto Assign to correctly identify and assign issues to the right users.

Once configured, issues will automatically be assigned to developers based on suspect commit analysis, and the assigned developer will receive a notification about the issue.

## Benefits
- **Faster Issue Resolution**: Issues are automatically assigned to developers who are most familiar with the relevant code.
- **Direct Accountability**: Individual developers receive clear ownership of issues related to their recent commits.
- **Proactive Notifications**: Assigned developers are immediately notified when issues are detected, enabling quick response times.
- **Reduced Triage Time**: Eliminates manual assignment processes by automatically identifying the most likely responsible developer.

## Managing Auto Assignment

### Configuration
Navigate to the Error Tracking configuration section in Datadog to manage Auto Assign settings. You can enable or disable Auto Assign globally for your entire organization, or configure it on a per-service basis for more granular control.

### How It Works
Auto Assign uses [suspect commits](/error_tracking/suspect_commits/) to identify developers who may have introduced issues. When an issue is automatically assigned to a developer, they receive an immediate notification.

### Assignment Management
You can view assigned developers directly within each issue in Datadog. If needed, manual reassignment is always possible to override the automatic assignment.