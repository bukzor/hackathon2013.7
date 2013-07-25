#!/not/executable/bash
if [[ ${BASH_SOURCE[0]} == $0 ]]; then
    echo "This file should be sourced, not run." >&2
    exit 1
fi

_SCRIPT=$(readlink -f ${BASH_SOURCE[0]})
_HERE=$(dirname $_SCRIPT)
export PATH=$_HERE/bin:$PATH

unset _SCRIPT _HERE
