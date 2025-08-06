1. In the **Mode** dropdown menu, select the socket type to use.
1. In the **Framing** dropdown menu, select how to delimit the stream of events.
    | Framing method      | Description                                             |
    |---------------------|---------------------------------------------------------|
    | `newline_delimited`   | Byte frames are delimited by a newline character. |
    | `bytes`               | Byte frames are passed through as-is according to the underlying I/O boundaries (for example, split between messages or stream segments).                                     |
    | `character_delimited` | Byte frames are delimited by a chosen character.  |
    | `chunked_gelf`        | Byte frames are chunked GELF messages.            |
    | `octet_counting`      | Byte frames are delimited according to the octet counting format.     |