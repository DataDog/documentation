---
title: Default Grouping
kind: documentation
description: Understand how errors are grouped into issues.
---

## Overview

Error Tracking intelligently groups similar errors into issues based on their fingerprint. 

Each time an error is sent to Datadog, a fingerprint is calculated using information available on the error.

Four attributes are extracted to compute the fingerprint:
* service
* error type (think *exception class*)
* error message
* stack frame (think *file and line number*)

Variable parts such as usernames or ids are removed from attributes in order to group errors into issues.

The fingerprint is highly dependent on how the error is captured and the programming language. We constantly iterate to deliver the best user experience.

**Note**: Different attributes will lead to different issues - there is currently no way to group issues across several services or error types.



## Setup
 
### Mobile and frontend applications

Uploading your source maps will allow us to get the right stack frame and deliver a better grouping.

- Web: [Sourcemaps upload][1]
- Mobile: [Crash reporting][2] 

[1]: /real_user_monitoring/guide/upload-javascript-source-maps
[2]: /real_user_monitoring/mobile_and_tv_monitoring/setup