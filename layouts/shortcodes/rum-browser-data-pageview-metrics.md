
| Attribute                       | Type        | Description                                                                                                                                                                                                           |
|---------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`               | number (ns) | Time spent on the current view.                                                                                                                                                                                       |
| `view.largest_contentful_paint` | number (ns) | Moment in the page load timeline in which the largest DOM object in the viewport (i.e. visible on screen) is rendered.                                                                                                |
| `view.first_input_delay`        | number (ns) | Time elapsed between a user’s first interaction with the page and the browser’s response.                                                                                                                             |
| `view.cumulative_layout_shift`  | number      | Quantifies unexpected page movement due to dynamically loaded content (for example, third-party ads) where 0 means no shifts happening.                                                                               |
| `view.loading_time`             | number (ns) | Time until the page is ready and no network request or DOM mutation is currently occurring. [More info][101].                                                                             |
| `view.first_contentful_paint`   | number (ns) | Time when the browser first renders any text, image (including background images), non-white canvas, or SVG. For more information about browser rendering, see the [w3c definition][102].                               |
| `view.dom_interactive`          | number (ns) | The moment when the parser finishes its work on the main document. [More info from the MDN documentation][103]                                                                                                         |
| `view.dom_content_loaded`       | number (ns) | Event fired when the initial HTML document is completely loaded and parsed, without waiting for non-render blocking stylesheets, images, and subframes to finish loading. [More info from the MDN documentation][104]. |
| `view.dom_complete`             | number (ns) | The page and all the subresources are ready. For the user, the loading spinner has stopped spinning. [More info from the MDN documentation][105]                                                                       |
| `view.load_event`               | number (ns) | Event fired when the page is fully loaded. Usually a trigger for additional application logic. [More info from the MDN documentation][106]                                                                             |
| `view.error.count`              | number      | Count of all errors collected for this view.                                                                                                                                                                          |
| `view.long_task.count`          | number      | Count of all long tasks collected for this view.                                                                                                                                                                      |
| `view.resource.count`           | number      | Count of all resources collected for this view.                                                                                                                                                                       |
| `view.action.count`             | number      | Count of all actions collected for this view.                                                                                                                                                                         |

[101]: /real_user_monitoring/browser/monitoring_page_performance/#how-is-loading-time-calculated
[102]: https://www.w3.org/TR/paint-timing/#sec-terminology
[103]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[104]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[105]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[106]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
