#!/usr/bin/env -S awk -f
# SPDX-License-Identifier: Apache-2.0 OR MIT
# Based on https://codereview.stackexchange.com/questions/194986/print-code-fenced-sections-of-a-markdown-document/195030#195030
BEGIN {
    in_code_block = 0;
    tag = "";
    operation_id = "";
}

function slug(value) {
    head = "";
    tail = value;
    while ( match(tail,/[[:upper:]][[:lower:]]/) ) {
        tgt = substr(tail,RSTART,1);
        if ( substr(tail,RSTART-1,1) ~ /[[:lower:]]/ || RSTART > 1 ) {
            tgt = "-" tolower(tgt);
        }
        head = head substr(tail,1,RSTART-1) tgt;
        tail = substr(tail,RSTART+1);
    }
    return tolower(head) tail;
}

/^# .+Api/ {
    tag = slug(substr($2, 0, length($2)-3));
}
/^## / {
    operation_id = toupper( substr( $2, 1, 1 ) ) substr( $2, 2 );
}
/^```java/ {
    if (in_code_block == 0) {
        in_code_block = 1;
        if (out_file) {
            close(out_file);
        }
        system("mkdir -p " output "/" tag);
        out_file=output "/" tag "/" operation_id ".java";
        print out_file;
    } else {
        print "Can't parse " FILENAME > "/dev/stderr"
        exit 1
    }
    next;
}
/^```/ {
    in_code_block = 0;
}
in_code_block {
    # Make sure that the file is newly created
    if (in_code_block == 1) {
        in_code_block = 2;
        print > out_file;
    } else {
        print >> out_file;
    }
}
