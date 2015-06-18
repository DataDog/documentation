---
title: Screenboards API
kind: documentation
sidebar:
  nav:
    - header: Overview
    - text: Endpoints
      href: "#endpoints"
    - text: General Notes
      href: "#notes"
    - text: API Usage
      href: "#usage"
    - header: Widget Examples
    - text: Timeseries Widget
      href: "#timeseries-widget"
    - text: Event Stream Widget
      href: "#event-stream-widget"
    - text: Query Value Widget
      href: "#query-value-widget"
    - text: Image Widget
      href: "#image-widget"
    - text: Note Widget
      href: "#note-widget"
---
<!--
======================================================
Endpoints
======================================================
-->

## Endpoints

- create: `POST /api/v1/screen`
- read: `GET /api/v1/screen/{board_id}`
- update: `PUT /api/v1/screen/{board_id}`
- delete: `DELETE /api/v1/screen/{board_id}`
- sharing `GET /api/v1/screen/share/{board_id}`
- revoke sharing `DELETE /api/v1/screen/share/{board_id}`

For `create`/`read`/`update` endpoints, the body is one JSON payload describing the Screenboard.

#### Base Payload:

<%= snippet_code_block "sb-payload-example.js" %>


## General Notes
{: #notes}

### Sizing and positioning

For position and sizing Screenboards use a grid system which allows widgets to scale as the size of the window changes. This is currently used when you switch between a fullscreen and windowed view.

Because we use a grid system, all positioning and sizing values (x, y, height, width) are relative to that grid and are not in raw pixels as you might expect. You should note that the default grid size is **12px per 1 "grid length"**.

This means if you give a widget a height and width of 2x2, the actual height will be 24x24px on the windowed view. Widgets will be scaled up/down on the fullscreen view to fit in the viewport given by your monitor.

### Timeframes

Timeframes are all given as short names to represent a value. The available timeframes depend on the widget you're using (in the widget descriptions below) but the overall options for timeframes are:

- `5m`: 5 minutes
- `10m`: 10 minutes
- `1h`: 1 hour
- `4h`: 4 hours
- `1d`: 1 day
- `2d`: 2 days
- `1w`: 1 week

### Templating

If you would like to create or update boards that use templated variables, you must have the following attributes in the base payload:

- `templated`: boolean of `true` or `false`
- `template_variables`: A list of variables you want to be "templateable."  Variables are defined by a name and optional prefix and default parameters, which determine the list of tags associated with the variable and the variable's initial value.

The final "base" payload of a templated board would look like this:

<%= snippet_code_block "sb-payload-tpl-example.js" %>


## API Usage
{: #usage}

The Screenboard API is supported in the Python and Ruby clients as well as with simple `curl` commands.

<!--
======================================================
CREATE SCREENBOARD
======================================================
-->

### Creating Boards

<%= code_tabs("screenboard_create") %>

<div class="tab-content">

  <div class="tab-pane active fade in" id="screenboard_create-python">
<%= python <<EOF
from datadog import initialize, api

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

initialize(**options)

board = {
    "width": 1024,
    "height": 768,
    "board_title": "dogapi test",
    "widgets": [
        {
          "type": "image",
          "height": 20,
          "width": 32,
          "y": 7,
          "x": 32,
          "url": "https://path/to/image.jpg"
        }
    ]
}

result = api.Screenboard.create(**board)
EOF
%>
</div>

  <div class="tab-pane fade in" id="screenboard_create-ruby">
<%= ruby <<EOF
require 'rubygems'
require 'dogapi'

api_key='9775a026f1ca7d1c6c5af9d94d9595a4'
app_key='87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'

dog = Dogapi::Client.new(api_key, app_key)

board = {
    "width" => 1024,
    "height" => 768,
    "board_title" => "dogapi test",
    "widgets" => [
        {
          "type" => "image",
          "height" => 20,
          "width" => 32,
          "y" => 7,
          "x" => 32,
          "url" => "https://path/to/image.jpg"
        }
    ]
}

result = dog.create_screenboard(board)
EOF
%>
  </div>
  <div class="tab-pane fade in" id="screenboard_create-console">
<%= console <<EOF
api_key=9775a026f1ca7d1c6c5af9d94d9595a4
app_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff

curl -X POST -H "Content-type: application/json" \
-d '{
        "width": 1024,
        "height": 768,
        "board_title": "dogapi test",
        "widgets": [
            {
              "type": "image",
              "height": 20,
              "width": 32,
              "y": 7,
              "x": 32,
              "url": "https://path/to/image.jpg"
            }
        ]
    }' \
"https://app.datadoghq.com/api/v1/screen?api_key=${api_key}&application_key=${app_key}"
EOF
%>
  </div>
</div>

<!--
======================================================
UPDATE SCREENBOARD
======================================================
-->

### Updating Boards

<%= code_tabs("screenboard_update") %>

<div class="tab-content">

  <div class="tab-pane active fade in" id="screenboard_update-python">
<%= python <<EOF
from datadog import initialize, api

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

initialize(**options)

board_id = 1234

updated_board = {
    "width": 1024,
    "height": 768,
    "board_title": "dogapi test",
    "widgets": [
        {
          "type": "image",
          "height": 25,
          "width": 35,
          "y": 7,
          "x": 32,
          "url": "https://path/to/new_image.jpg"
        }
    ]
}

result = api.Screenboard.update(board_id, **updated_board)
EOF
%>
</div>

  <div class="tab-pane fade in" id="screenboard_update-ruby">
<%= ruby <<EOF
require 'rubygems'
require 'dogapi'

api_key='9775a026f1ca7d1c6c5af9d94d9595a4'
app_key='87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'
board_id = 1234

dog = Dogapi::Client.new(api_key, app_key)

updated_board = {
    "width" => 1024,
    "height" => 768,
    "board_title" => "dogapi test",
    "widgets" => [
        {
          "type" => "image",
          "height" => 25,
          "width" => 35,
          "y" => 7,
          "x" => 32,
          "url" => "https://path/to/new_image.jpg"
        }
    ]
}

result = dog.update_screenboard(board_id, updated_board)
EOF
%>
  </div>
  <div class="tab-pane fade in" id="screenboard_update-console">
<%= console <<EOF
api_key=9775a026f1ca7d1c6c5af9d94d9595a4
app_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff
board_id=1234

curl -X PUT -H "Content-type: application/json" \
-d '{
        "width": 1024,
        "height": 768,
        "board_title": "dogapi test",
        "widgets": [
            {
              "type": "image",
              "height": 25,
              "width": 35,
              "y": 7,
              "x": 32,
              "url": "https://path/to/new_image.jpg"
            }
        ]
    }' \
"https://app.datadoghq.com/api/v1/screen/${board_id}?api_key=${api_key}&application_key=${app_key}"
EOF
%>
  </div>
</div>


<!--
======================================================
GET SCREENBOARD
======================================================
-->

### Get Boards

<%= code_tabs("screenboard_get") %>

<div class="tab-content">

  <div class="tab-pane active fade in" id="screenboard_get-python">
<%= python <<EOF
from datadog import initialize, api

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

initialize(**options)

board_id = 1234

result = api.Screenboard.get(board_id)
EOF
%>
</div>

  <div class="tab-pane fade in" id="screenboard_get-ruby">
<%= ruby <<EOF
require 'rubygems'
require 'dogapi'

api_key='9775a026f1ca7d1c6c5af9d94d9595a4'
app_key='87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'
board_id = 1234

dog = Dogapi::Client.new(api_key, app_key)

result = dog.get_screenboard(board_id)
EOF
%>
  </div>
  <div class="tab-pane fade in" id="screenboard_get-console">
<%= console <<EOF
api_key=9775a026f1ca7d1c6c5af9d94d9595a4
app_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff
board_id=1234

curl -X GET \
"https://app.datadoghq.com/api/v1/screen/${board_id}?api_key=${api_key}&application_key=${app_key}"
EOF
%>
  </div>
</div>

<!--
======================================================
DELETE SCREENBOARD
======================================================
-->

### Deleting Boards

<%= code_tabs("screenboard_delete") %>

<div class="tab-content">

  <div class="tab-pane active fade in" id="screenboard_delete-python">
<%= python <<EOF
from datadog import initialize, api

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

initialize(**options)

board_id = 1234

result = api.Screenboard.delete(board_id)
EOF
%>
</div>

  <div class="tab-pane fade in" id="screenboard_delete-ruby">
<%= ruby <<EOF
require 'rubygems'
require 'dogapi'

api_key='9775a026f1ca7d1c6c5af9d94d9595a4'
app_key='87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'
board_id = 1234

dog = Dogapi::Client.new(api_key, app_key)

result = dog.delete_screenboard(board_id)
EOF
%>
  </div>
  <div class="tab-pane fade in" id="screenboard_delete-console">
<%= console <<EOF
api_key=9775a026f1ca7d1c6c5af9d94d9595a4
app_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff
board_id=1234

curl -X DELETE \
"https://app.datadoghq.com/api/v1/screen/${board_id}?api_key=${api_key}&application_key=${app_key}"
EOF
%>
  </div>
</div>

<!--
======================================================
SHARE SCREENBOARD
======================================================
-->

### Sharing Boards

<%= code_tabs("screenboard_share") %>

<div class="tab-content">

  <div class="tab-pane active fade in" id="screenboard_share-python">
<%= python <<EOF
from datadog import initialize, api

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

initialize(**options)

board_id = 1234

result = api.Screenboard.share(board_id)
EOF
%>
</div>

  <div class="tab-pane fade in" id="screenboard_share-ruby">
<%= ruby <<EOF
require 'rubygems'
require 'dogapi'

api_key='9775a026f1ca7d1c6c5af9d94d9595a4'
app_key='87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'
board_id = 1234

dog = Dogapi::Client.new(api_key, app_key)

result = dog.share_screenboard(board_id)
# result = {"board_id" => board_id, "public_url" => "https://path/to/sb"}
EOF
%>
  </div>
  <div class="tab-pane fade in" id="screenboard_share-console">
<%= console <<EOF
api_key=9775a026f1ca7d1c6c5af9d94d9595a4
app_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff
board_id=1234

curl -X GET \
"https://app.datadoghq.com/api/v1/screen/share/${board_id}?api_key=${api_key}&application_key=${app_key}"
EOF
%>
  </div>
</div>


<h2>Widget Examples</h2>

<h3 id="timeseries-widget">Timeseries Widget</h3>

<%= snippet_code_block "sb-timeseries-widget.js" %>

<h3 id="event-stream-widget">Event Stream Widget</h3>

<%= snippet_code_block "sb-event-stream-widget.js" %>

<h3 id="query-value-widget">Query Value Widget</h3>

<%= snippet_code_block "sb-query-value-widget.js" %>

<h3 id="image-widget">Image Widget</h3>

<%= snippet_code_block "sb-image-widget.js" %>

<h3 id="note-widget">Note Widget</h3>

<%= snippet_code_block "sb-note-widget.js" %>
