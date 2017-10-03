## Screenboards
You can view more detailed documentation on the Screenboard API at http://docs.datadoghq.com/api/screenboards/.

## Create A Screenboard
ARGUMENTS

board_title [required]
The name of the dashboard.
description [optional, default=None]
A description of the dashboard's content.
widgets [required]
A list of widget definitions. See here for more examples.
template_variables [optional, default=None]
A list of template variables for using Dashboard templating.
width [optional, default=None]
Screenboard width in pixels
height [optional, default=None]
Height in pixels.
read_only [optional, default=False]
The read-only status of the screenboard.

## Update A Screenboard
ARGUMENTS

board_title [required]
The name of the dashboard.
description [optional, default=None]
A description of the dashboard's content.
widgets [required]
A list of widget definitions. See here for more examples.
template_variables [optional, default=None]
A list of template variables for using Dashboard templating.
width [optional, default=None]
Screenboard width in pixels
height [optional, default=None]
Height in pixels.
read_only [optional, default=False]
The read-only status of the screenboard.

## Delete A Screenboard
Delete an existing screenboard.

This end point takes no JSON arguments.'

## Get A Screenboard
Fetch an existing screenboard's definition.

ARGUMENTS

This end point takes no JSON arguments.'

## Get All Screenboards
Fetch all of your screenboards' definitions.

ARGUMENTS

This end point takes no JSON arguments.'

## Share A Screenboard
Share an existing screenboard's with a public URL.

ARGUMENTS

This end point takes no JSON arguments.'

## Revoke A Shared A Screenboard
Revoke a currently shared screenboard's.

ARGUMENTS

This end point takes no JSON arguments.'
