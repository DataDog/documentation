---
title: Using TV mode for Dashboards
description: Display dashboards on large screens or TVs to showcase key performance metrics for team visibility and monitoring.
further_reading:
- link: "/dashboards/configure/"
  tag: "Documentation"
  text: "Learn about dashboard configuration"
---

## Overview

TV mode is designed to display Datadog dashboards on large screens by ensuring that all widgets are visible without requiring scrolling. This guide provides detailed instructions on setting up a dashboard for TV mode, discusses limitations to be aware of, and offers solutions for optimal display.

## Setting up your dashboard for TV mode

To ensure that your dashboard displays correctly on a TV, follow these steps:  
1. **Design Your Dashboard**: Begin by creating your dashboard in Datadog. Focus on arranging your widgets within the 12-column grid layout that Datadog dashboards utilize. Keep in mind that the aspect ratio of your widgets and the overall dashboard affects how they are displayed in TV mode.  
2. **Enable TV mode**: When your dashboard is ready, enable TV mode. Do this while your screen is connected to the TV and in full-screen mode. This step ensures that the dashboard automatically adjusts to fit the TV screen without the need for manual resizing.  
    {{< img src="/dashboards/guide/tv_mode/tv_mode_config_option.png" alt="Enable the TV mode option through the dashboard Configure menu" style="width:100%;" >}} 
3. **Optimize Display Settings**: If your dashboard content is not filling the screen edges, you can simulate a large screen by zooming in or out. Use keyboard shortcuts to adjust the browser display before re-entering TV mode, `CMD/CTRL + +(plus)` to zoom in and `CMD/CTRL + -(minus)` to zoom out. **Note**: This solution comes with readability downsides; it can make some fonts smaller and difficult to read from a distance.

## Understanding TV mode limitations

While TV mode offers a convenient way to display dashboards, there are certain limitations and considerations:  
- **12-Column Grid Restriction**: Dashboards in TV mode adhere to a fixed 12-column grid. This can limit the flexibility in stretching content to fill the entire screen width. In high-density mode, the dashboard is split into two grids of 12 columns, and more widgets will expand the dashboard vertically.  
- **Aspect Ratio Constraints**: TV mode scales down the dashboard to fit everything on the screen without scrolling, which means an enforced aspect ratio. If the dashboard's height and width are disproportionate, it may result in white spaces on the edges and widgets can appear minimized (zoomed out). To minimize this, design your dashboard with an aspect ratio that closely matches your TV's display.  
- **Content Centering**: Content may be centered on the screen rather than expanding to the edges. This behavior is often due to the fixed grid system and aspect ratio. For a dashboard that fully utilizes screen width, consider switching to a screenboard, which allows finer control over widget positioning.

## Alternative solutions and recommendations

If the constraints of the 12-column grid make it challenging to achieve your desired layout in TV mode, consider the following alternatives:  
- **Screenboards for Greater Flexibility**: Unlike dashboards, screenboards offer pixel precision placement, allowing you to create a layout that better fits your TV's aspect ratio. This can help eliminate edge white spaces and make full use of the screen real estate.  
- **Tracking and Reporting Issues**: If you encounter persistent issues with TV mode, such as content not displaying correctly, report these as bugs within Datadog. This will help in tracking and potentially addressing these limitations in future updates.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
