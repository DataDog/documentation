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
  "timeframe": "5m", // Choose from: [5m, 10m, 1h, 4h, 1d, 2d, 1w]
  "text_size": "auto",
  "unit": "/s" // Give a custom unit or use "auto"
}
