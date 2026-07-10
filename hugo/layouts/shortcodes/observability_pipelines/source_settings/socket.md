1. In the **Mode** dropdown menu, select the socket type to use.
1. In the **Framing** dropdown menu, select how to delimit the stream of events.
    <table>
        <colgroup>
            <col style="width:40%">
            <col style="width:60%">
        </colgroup>
        <thead>
            <tr>
                <th>FRAMING METHOD</th>
                <th>DESCRIPTION</th>
            </tr>
        </thead>
        <tr>
            <td><code>newline_delimited</code></td>
            <td>Byte frames are delimited by a newline character.</td>
        </tr>
        <tr>
            <td><code>bytes</code></td>
            <td>Byte frames are passed through as-is according to the underlying I/O boundaries (for example, split between messages or stream segments).</td>
        </tr>
        <tr>
            <td><code>character_delimited</code></td>
            <td>Byte frames are delimited by a chosen character.</td>
        </tr>
        <tr>
            <td><code>chunked_gelf</code></td>
            <td>Byte frames are chunked GELF messages.</td>
        </tr>
        <tr>
            <td><code>octet_counting</code></td>
            <td>Byte frames are delimited according to the octet counting format.</td>
        </tr>
    </table>