{
  "type": "query_value",

  // Title
  "title": true,
  "title_size": 16,
  "title_text": "Throughput",
  "title_align": "left",

  // Sizing
  "height": 4,
  "width": 14,

  // Positioning
  "y": 21,
  "x": 65,

  // Widget Parameters
  "aggregator": "avg", // Choose from: [avg, sum, min, max]
  "query": "sum:dd.sobotka.throughput.actual{*}",
  "conditional_formats": [
    {
      "color": "white_on_green",
      "invert": false,
      "comparator": ">", // Choose from: [>, >=, <, <=]
      "value": 20000
    }
  ],
  "text_align": "left",
  "precision": 1,
  "time": {
    "live_span": "1h" // Choose from: [1m, 5m, 10m, 15m, 30m, 1h, 4h, 1d, 2d, 1w, 1mo, 3mo, 6mo, 1y]
  },
  "text_size": "auto",
  "unit": "/s" // Give a custom unit or use "auto"
}
