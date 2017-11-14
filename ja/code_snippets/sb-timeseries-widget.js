{
  "type": "timeseries",

  // Title
  "title": true,
  "title_size": 16,
  "title_align": "left",
  "title_text": "My Metric (m/s)",

  // Sizing
  "height": 13,
  "width": 47,

  // Positioning
  "y": 28,
  "x": 32,

  // Widget Parameters
  "timeframe": "1h", // Choose from: [1h, 4h, 1d, 2d, 1w]
  "tile_def": {
    "viz": "timeseries",
    "requests": [
      {
         "q": "sum:my.important.metric{*} by {host}"
      }
    ],
    "events": [
      {
        "q": "tags:release"
      }
    ]
  }
}
