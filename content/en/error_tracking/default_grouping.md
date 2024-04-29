---
title: Default Grouping
kind: documentation
description: Understand how errors are grouped into issues.
---

## Overview

Error Tracking intelligently groups similar errors into issues based on their fingerprint.

Each time an error is sent to Datadog, a fingerprint is computed based on the following attributes of the error:
* service
* error type (think *exception class*)
* error message
* stack frame (think *file and line number*)

Variables in the attributes such as usernames or ids are removed to group errors into issues.

The fingerprint is dependent on how the error is captured and the programming language. It is continuously improved to deliver the best user experience.

**Note**: Different attributes lead to different issues - issues cannot be grouped across services or error types.


## Setup
 
### Mobile and frontend applications

Upload your source maps to identify the right stack frame and experience a better grouping.

- Web: [Sourcemaps upload][1]
- Mobile: [Crash reporting][2] 

[1]: /real_user_monitoring/guide/upload-javascript-source-maps
[2]: /real_user_monitoring/mobile_and_tv_monitoring/setup
